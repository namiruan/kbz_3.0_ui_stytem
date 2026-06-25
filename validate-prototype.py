#!/usr/bin/env python3
"""
validate-prototype.py — KBZ 3.0 Design System 프로토타입 HTML 검사

사용법:  python3 validate-prototype.py <prototype.html>
종료 코드:  0 = 이상 없음  /  1 = 오류 발견
"""

import sys, re, json, os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ICONS_JSON  = os.path.join(SCRIPT_DIR, 'icons', 'categories.json')
TOKENS_DIR  = os.path.join(SCRIPT_DIR, 'tokens')
UTIL_DIR    = os.path.join(SCRIPT_DIR, 'utilities')

REQUIRED_RESOURCES = [
    ('pretendardvariable-dynamic-subset.min.css', 'Pretendard 폰트 CSS'),
    ('tokens.css',                                'tokens.css'),
    ('components.css',                            'components.css'),
    ('components.js',                             'components.js'),
]

SPRITE_PATTERN = 'kbz_3.0_ui_stytem/icons/sprite.svg'

# 존재하지 않는 토큰 → 올바른 대체 토큰
KNOWN_BAD_TOKENS = {
    '--radius-full':      '--radius-pill (--radius-full 은 없음)',
    '--radius-circle':    '--radius-pill',
    '--color-surface-overlay': '--color-surface-dim',
    '--color-dim':        '--color-surface-dim',
    '--z-overlay':        '--z-backdrop',
}


# ── 토큰·아이콘 목록 로드 ──────────────────────────────────────────

def load_icon_ids():
    with open(ICONS_JSON, encoding='utf-8') as f:
        cats = json.load(f)
    ids = set()
    for cat in cats:
        ids.update(cat['ids'])
    return ids


def load_valid_tokens():
    tokens = set()
    for d in [TOKENS_DIR, UTIL_DIR]:
        if not os.path.isdir(d):
            continue
        for fname in os.listdir(d):
            if not fname.endswith('.css'):
                continue
            text = open(os.path.join(d, fname), encoding='utf-8').read()
            for m in re.finditer(r'--([a-z][a-z0-9-]+)\s*:', text):
                tokens.add('--' + m.group(1))
    return tokens


# ── 검사 로직 ─────────────────────────────────────────────

def check(html, icon_ids, valid_tokens):
    errors   = []
    warnings = []
    err  = errors.append
    warn = warnings.append

    # ── 1. 필수 외부 리소스 ────────────────────────────────────
    for pattern, label in REQUIRED_RESOURCES:
        if pattern not in html:
            err(f'[CDN] 필수 리소스 누락: {label}')

    # ── 2. 아이콘 스프라이트 fetch 주입 ────────────────────────────
    if SPRITE_PATTERN not in html:
        err('[Sprite] 아이콘 스프라이트 fetch 주입 누락 — icons/sprite.svg fetch 패턴이 없음')

    # ── 3. 아이콘 ID 유효성 ──────────────────────────────────────
    used_icons = set(re.findall(r'href="#(icon-[a-z0-9-]+)"', html))
    for icon_id in sorted(used_icons):
        if icon_id not in icon_ids:
            err(f'[Icon] 존재하지 않는 icon ID: #{icon_id}  (icons/categories.json 에 없음)')

    # ── 4. 하드코딩 색상 — inline style 속성 ───────────────────────
    for m in re.finditer(r'style="([^"]+)"', html):
        val = m.group(1)
        if re.search(r'#[0-9a-fA-F]{3,8}\b', val):
            err(f'[Color] style 속성에 hex 하드코딩: style="{val[:70]}"')
        if re.search(r'rgba?\s*\(', val):
            err(f'[Color] style 속성에 rgba() 하드코딩: style="{val[:70]}"')

    # ── 5. 하드코딩 색상 — <style> 블록 ───────────────────────────
    for style_m in re.finditer(r'<style[^>]*>(.*?)</style>', html, re.DOTALL):
        block = re.sub(r'/\*.*?\*/', '', style_m.group(1), flags=re.DOTALL)  # 주석 제거
        for line in block.splitlines():
            stripped = line.strip()
            if not stripped or stripped.startswith('//'):
                continue
            # CSS 변수 정의 행은 허용 (--foo: #xxx)
            if re.match(r'--[a-z]', stripped):
                continue
            if re.search(r'#[0-9a-fA-F]{3,8}\b', stripped):
                err(f'[Color] <style> 블록에 hex 하드코딩: {stripped[:80]}')
            if re.search(r'rgba?\s*\(', stripped):
                err(f'[Color] <style> 블록에 rgba() 하드코딩: {stripped[:80]}')

    # ── 6. 알려진 잘못된 토큰 ────────────────────────────────────
    for bad, fix in KNOWN_BAD_TOKENS.items():
        if bad in html:
            err(f'[Token] 잘못된 토큰: {bad}  →  {fix}')

    # ── 7. 존재하지 않는 디자인 시스템 토큰 참조 ─────────────────
    # 디자인 시스템 패턴의 var() 참조만 검사 (prototype-layout 전용 변수 제외)
    DS_PREFIXES = (
        '--color-', '--space-', '--radius-', '--font-', '--z-',
        '--stroke-', '--shadow-', '--motion-', '--icon-', '--height-',
    )
    used_tokens = set(re.findall(r'var\((--[a-z][a-z0-9-]+)\)', html))
    for token in sorted(used_tokens):
        if token in KNOWN_BAD_TOKENS:
            continue  # 이미 #6 에서 보고
        if not any(token.startswith(p) for p in DS_PREFIXES):
            continue  # 디자인 시스템 토큰이 아니면 skip
        if token not in valid_tokens:
            err(f'[Token] 존재하지 않는 토큰: {token}  (tokens/*.css 에 없음)')

    # ── 8. aria-label 누락 — icon-only 버튼 ────────────────────────
    # btn--icon 클래스 + aria-label 없음 + 텍스트 없음
    for m in re.finditer(r'<button([^>]*)>(.*?)</button>', html, re.DOTALL):
        attrs   = m.group(1)
        inner   = m.group(2)
        classes = re.search(r'class="([^"]*)"', attrs)
        cls     = classes.group(1) if classes else ''
        # btn--icon 은 icon-only 전용. btn--icon-left/right 는 텍스트 병행이므로 제외
        is_icon_only = ('btn--icon' in cls
                        and 'btn--icon-left' not in cls
                        and 'btn--icon-right' not in cls)
        if not is_icon_only:
            continue
        has_aria = 'aria-label' in attrs
        inner_text = re.sub(r'<[^>]+>', '', inner).strip()
        if not has_aria and not inner_text:
            snippet = attrs[:60].strip()
            err(f'[a11y] icon-only 버튼(btn--icon)에 aria-label 누락: <button {snippet}…>')

    # ── 9. 인터랙티브 보기 — 검증 헬퍼 존재 여부 ─────────────────
    has_interactive_pane = bool(re.search(r'id=["\']pane-interactive["\']', html))
    interactive_has_inputs = False

    iv_match = re.search(
        r'id=["\']pane-interactive["\'][^>]*>(.*?)(?=<div\s+id=|$)',
        html, re.DOTALL
    )
    if iv_match and re.search(r'<(?:input|textarea|select)\b', iv_match.group(1)):
        interactive_has_inputs = True

    if has_interactive_pane and interactive_has_inputs:
        if 'function setFieldError' not in html:
            err('[Interactive] 인터랙티브 폼에 setFieldError 함수 없음 — 출력 형식 스캐폴드가 누락됨')
        if 'function setButtonLoading' not in html:
            err('[Interactive] 인터랙티브 폼에 setButtonLoading 함수 없음 — 출력 형식 스캐폴드가 누락됨')
        has_blur = ("addEventListener('blur'" in html or 'addEventListener("blur"' in html)
        if not has_blur:
            err('[Interactive] 인터랙티브 폼에 blur 이벤트 리스너 없음 — 필드 검증이 동작하지 않음')

    # ── 10. setButtonLoading 에 실제 spinner HTML 있는지 ────────────────
    if 'function setButtonLoading' in html:
        fn_m = re.search(r'function setButtonLoading\b[^}]*\{[^}]*\}', html, re.DOTALL)
        if fn_m:
            fn_body = fn_m.group(0)
            # placeholder 주석이 innerHTML 에 그대로 들어간 경우
            if re.search(r'''innerHTML\s*=\s*['"]?\s*/\*''', fn_body):
                err('[Button] setButtonLoading innerHTML 이 주석 placeholder 상태 — 실제 spinner HTML 필요')
            elif 'spinner' not in fn_body:
                err('[Button] setButtonLoading 에 spinner 마크업 없음 — btn--loading 만으로는 스피너가 표시되지 않음')

    # ── 11. design-system 버전 주석 ────────────────────────────────
    if '<!-- design-system:' not in html:
        warn('[Meta] design-system 버전 주석 누락: <!-- design-system: vX.X.X -->')

    # ── 12. submit 버튼에 data-step-next 혼용 금지 ────────────────────
    bad_submits = re.findall(
        r'<button[^>]*(?:type=["\']submit["\'][^>]*data-step-next|data-step-next[^>]*type=["\']submit["\'])[^>]*>',
        html
    )
    for b in bad_submits:
        err(f'[Interactive] submit 버튼에 data-step-next 사용 — 검증 없이 전환됨: {b[:80]}')

    return errors, warnings


# ── 실행 ───────────────────────────────────────────────────

def main():
    if len(sys.argv) < 2:
        print('사용법: python3 validate-prototype.py <prototype.html>')
        sys.exit(1)

    path = sys.argv[1]
    if not os.path.isfile(path):
        print(f'오류: 파일을 찾을 수 없음: {path}')
        sys.exit(1)

    html        = open(path, encoding='utf-8').read()
    icon_ids    = load_icon_ids()
    valid_tokens= load_valid_tokens()

    errors, warnings = check(html, icon_ids, valid_tokens)

    if warnings:
        print(f'⚠️  경고 {len(warnings)}건')
        for w in warnings:
            print(f'   {w}')
        print()

    if errors:
        print(f'❌ 오류 {len(errors)}건')
        for e in errors:
            print(f'   {e}')
        print()
        print('검사 실패 — 위 항목을 수정한 후 다시 실행하세요.')
        sys.exit(1)

    if not warnings:
        print('✅ 검사 통과')
    else:
        print('✅ 오류 없음 (경고는 위 목록 확인)')
    sys.exit(0)


if __name__ == '__main__':
    main()
