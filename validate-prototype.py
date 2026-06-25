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

KNOWN_BAD_TOKENS = {
    '--radius-full':           '--radius-pill (--radius-full 은 없음)',
    '--radius-circle':         '--radius-pill',
    '--color-surface-overlay': '--color-surface-dim',
    '--color-dim':             '--color-surface-dim',
    '--z-overlay':             '--z-backdrop',
}


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


def check(html, icon_ids, valid_tokens):
    errors   = []
    warnings = []
    err  = errors.append
    warn = warnings.append

    for pattern, label in REQUIRED_RESOURCES:
        if pattern not in html:
            err(f'[CDN] 필수 리소스 누락: {label}')

    if SPRITE_PATTERN not in html:
        err('[Sprite] 아이콘 스프라이트 fetch 주입 누락')

    used_icons = set(re.findall(r'href="#(icon-[a-z0-9-]+)"', html))
    for icon_id in sorted(used_icons):
        if icon_id not in icon_ids:
            err(f'[Icon] 존재하지 않는 icon ID: #{icon_id}')

    for m in re.finditer(r'style="([^"]+)"', html):
        val = m.group(1)
        if re.search(r'#[0-9a-fA-F]{3,8}\b', val):
            err(f'[Color] style 속성에 hex 하드코딩: style="{val[:70]}"')
        if re.search(r'rgba?\s*\(', val):
            err(f'[Color] style 속성에 rgba() 하드코딩: style="{val[:70]}"')

    for style_m in re.finditer(r'<style[^>]*>(.*?)</style>', html, re.DOTALL):
        block = re.sub(r'/\*.*?\*/', '', style_m.group(1), flags=re.DOTALL)
        for line in block.splitlines():
            s = line.strip()
            if not s or s.startswith('//') or re.match(r'--[a-z]', s):
                continue
            if re.search(r'#[0-9a-fA-F]{3,8}\b', s):
                err(f'[Color] <style> 블록에 hex 하드코딩: {s[:80]}')
            if re.search(r'rgba?\s*\(', s):
                err(f'[Color] <style> 블록에 rgba() 하드코딩: {s[:80]}')

    for bad, fix in KNOWN_BAD_TOKENS.items():
        if bad in html:
            err(f'[Token] 잘못된 토큰: {bad}  →  {fix}')

    DS_PREFIXES = ('--color-', '--space-', '--radius-', '--font-', '--z-',
                   '--stroke-', '--shadow-', '--motion-', '--icon-', '--height-')
    for token in sorted(set(re.findall(r'var\((--[a-z][a-z0-9-]+)\)', html))):
        if token in KNOWN_BAD_TOKENS:
            continue
        if not any(token.startswith(p) for p in DS_PREFIXES):
            continue
        if token not in valid_tokens:
            err(f'[Token] 존재하지 않는 토큰: {token}')

    for m in re.finditer(r'<button([^>]*)>(.*?)</button>', html, re.DOTALL):
        attrs = m.group(1)
        cls   = (re.search(r'class="([^"]*)"', attrs) or type('', (), {'group': lambda s,i: ''})()).group(1)
        if ('btn--icon' in cls and 'btn--icon-left' not in cls and 'btn--icon-right' not in cls
                and 'aria-label' not in attrs
                and not re.sub(r'<[^>]+>', '', m.group(2)).strip()):
            err(f'[a11y] icon-only 버튼(btn--icon)에 aria-label 누락: <button {attrs[:60].strip()}…>')

    iv_match = re.search(r'id=["\']pane-interactive["\'][^>]*>(.*?)(?=<div\s+id=|$)', html, re.DOTALL)
    if iv_match and re.search(r'<(?:input|textarea|select)\b', iv_match.group(1)):
        if 'function setFieldError' not in html:
            err('[Interactive] setFieldError 함수 없음 — 스캐폴드 누락')
        if 'function setButtonLoading' not in html:
            err('[Interactive] setButtonLoading 함수 없음 — 스캐폴드 누락')
        if "addEventListener('blur'" not in html and 'addEventListener("blur"' not in html:
            err('[Interactive] blur 이벤트 리스너 없음')

    fn_m = re.search(r'function setButtonLoading\b[^}]*\{[^}]*\}', html, re.DOTALL)
    if fn_m:
        body = fn_m.group(0)
        if re.search(r'innerHTML\s*=\s*["\']?\s*/\*', body):
            err('[Button] setButtonLoading innerHTML 이 placeholder 상태')
        elif 'spinner' not in body:
            err('[Button] setButtonLoading 에 spinner 마크업 없음')

    if '<!-- design-system:' not in html:
        warn('[Meta] design-system 버전 주석 누락')

    for b in re.findall(
        r'<button[^>]*(?:type=["\']submit["\'][^>]*data-step-next|data-step-next[^>]*type=["\']submit["\'])[^>]*>',
        html
    ):
        err(f'[Interactive] submit 버튼에 data-step-next 사용: {b[:80]}')

    return errors, warnings


def main():
    if len(sys.argv) < 2:
        print('사용법: python3 validate-prototype.py <prototype.html>')
        sys.exit(1)
    path = sys.argv[1]
    if not os.path.isfile(path):
        print(f'오류: 파일 없음: {path}')
        sys.exit(1)
    html         = open(path, encoding='utf-8').read()
    errors, warnings = check(html, load_icon_ids(), load_valid_tokens())
    if warnings:
        print(f'⚠️  경고 {len(warnings)}건')
        for w in warnings: print(f'   {w}')
        print()
    if errors:
        print(f'❌ 오류 {len(errors)}건')
        for e in errors: print(f'   {e}')
        print()
        print('검사 실패 — 위 항목 수정 후 다시 실행하세요.')
        sys.exit(1)
    print('✅ 검사 통과' if not warnings else '✅ 오류 없음 (경고 확인)')
    sys.exit(0)


if __name__ == '__main__':
    main()
