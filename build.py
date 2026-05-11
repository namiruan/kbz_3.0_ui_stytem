"""
v2 빌드: 단일 파일 뷰 + 사이드바 라우팅
- 한 번에 한 파일만 본문에 렌더링
- URL hash 라우팅 (공유·북마크 가능)
- 페이지 하단 prev/next
- 우측 TOC (h2/h3 점프)
- 키보드 ← → 단축키
- 부드러운 페이지 전환
"""
import os, json, re

# 스크립트 위치 기준 — 어디서 실행하든 동일하게 작동
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.join(SCRIPT_DIR, 'design-system')
OUTPUT_HTML = os.path.join(SCRIPT_DIR, 'design-system.html')

FILE_ORDER = [
    ('README.md',                'Overview',     'overview'),
    ('workflow/designer.md',     '🎨 Designer',   'workflow'),
    ('workflow/planner.md',      '🧭 Planner',    'workflow'),
    ('governance.md',            '문서 규칙·버전',  'governance'),
    ('tokens/_index.md',         '아키텍처',       'tokens'),
    ('tokens/_spec.md',          '문서 규칙',      'tokens'),
    ('tokens/color.md',          '색상',           'tokens'),
    ('tokens/space.md',          '공간',           'tokens'),
    ('tokens/typography.md',     '타이포그래피',    'tokens'),
    ('tokens/radius.md',         'Radius',        'tokens'),
    ('tokens/elevation.md',      'Elevation',      'tokens'),
    ('tokens/motion.md',         '모션',           'tokens'),
    ('tokens/icon.md',           '아이콘',         'tokens'),
    ('interaction.md',           '인터랙션',        'interaction'),
    ('adaptation.md',            '반응형·다크모드', 'adaptation'),
    ('product.md',               '제품 패턴',      'product'),
    ('accessibility.md',         '접근성',         'accessibility'),
    ('architecture.md',          '컴포넌트 구조',   'architecture'),
]

files_data = []
for path, label, group in FILE_ORDER:
    full = os.path.join(BASE, path)
    with open(full, 'r', encoding='utf-8') as f:
        raw = f.read()
    raw = re.sub(r'^:::palette (\w+)', r'<div class="palette-placeholder" data-palette="\1"></div>', raw, flags=re.MULTILINE)
    raw = re.sub(r'^:::scale ([\w-]+)', r'<div class="scale-placeholder" data-scale="\1"></div>', raw, flags=re.MULTILINE)
    raw = re.sub(r'^:::example ([\w-]+)', r'<div class="example-placeholder" data-example="\1"></div>', raw, flags=re.MULTILINE)
    slug = path.replace('/', '--').replace('.md', '').replace('_', '')
    files_data.append({
        'path': path,
        'label': label,
        'group': group,
        'slug': slug,
        'raw': raw,
    })

files_json = json.dumps(files_data, ensure_ascii=False).replace('</', '<\/')

# ─── 토큰 소스 파일 (타입별 분리, 빌드 시 합침) ───
TOKEN_FILES = [
    'tokens/color.css',
    'tokens/space.css',
    'tokens/typography.css',
    'tokens/radius.css',
    'tokens/height.css',
    'tokens/shadow.css',
    'tokens/z-index.css',
    'tokens/layout.css',
    'tokens/motion.css',
]

def read_tokens_concat():
    parts = []
    for rel in TOKEN_FILES:
        p = os.path.join(SCRIPT_DIR, rel)
        if not os.path.exists(p):
            continue
        with open(p, 'r', encoding='utf-8') as f:
            parts.append(f.read())
    return '\n\n'.join(parts)

# ─── 토큰 맵 빌드 (tokens/*.css 파싱) ───
def build_token_map(content):
    raw = {}
    for m in re.finditer(r'(--[\w-]+)\s*:\s*([^;]+);', content):
        raw[m.group(1).strip()] = m.group(2).strip()
    def resolve(val, visited=None):
        if visited is None: visited = set()
        vm = re.match(r'^\s*var\((--[\w-]+)\)\s*$', val)
        if vm:
            ref = vm.group(1)
            if ref not in visited and ref in raw:
                visited.add(ref)
                return resolve(raw[ref], visited)
        return val.strip()
    desc = {}
    for m in re.finditer(r'(--[\w-]+)\s*:[^;]+;[ \t]*/\*[ \t]*([^*\n]+?)[ \t]*\*/', content):
        desc[m.group(1).strip()] = m.group(2).strip()
    return {k: resolve(v) for k, v in raw.items()}, {k: v for k, v in raw.items()}, desc

tokens_css_raw = read_tokens_concat()
token_map, raw_token_map, desc_map = build_token_map(tokens_css_raw)

# ─── 유틸리티 클래스 맵 빌드 (.text-* 등 4축 묶음) ───
def build_utility_map(content, tmap, dmap):
    utilities = {}
    for m in re.finditer(r'\.([ \w-]+)\s*\{([^}]+)\}', content):
        name = '.' + m.group(1).strip()
        if not name.startswith('.text-'):
            continue
        body = m.group(2)
        props = []
        for pm in re.finditer(r'([\w-]+)\s*:\s*([^;]+);', body):
            prop = pm.group(1).strip()
            val = pm.group(2).strip()
            tm = re.match(r'^var\((--[\w-]+)\)$', val)
            if tm:
                token_name = tm.group(1)
                resolved = tmap.get(token_name, val)
                desc = dmap.get(token_name, '')
                props.append({'prop': prop, 'raw': val, 'token': token_name, 'value': resolved, 'desc': desc})
            else:
                props.append({'prop': prop, 'raw': val, 'token': None, 'value': val, 'desc': ''})
        utilities[name] = props
    return utilities

utility_map = build_utility_map(tokens_css_raw, token_map, desc_map)
tokens_json_str = json.dumps(token_map, ensure_ascii=False).replace('</', '<\/')
tokens_raw_json_str = json.dumps(raw_token_map, ensure_ascii=False).replace('</', '<\/')
tokens_desc_json_str = json.dumps(desc_map, ensure_ascii=False).replace('</', '<\/')
utilities_json_str = json.dumps(utility_map, ensure_ascii=False).replace('</', '<\/')

# ─── 빌드 산출물: 단일 tokens.css (외부 소비자용) ───
_bundled_path = os.path.join(SCRIPT_DIR, 'tokens.css')
with open(_bundled_path, 'w', encoding='utf-8') as _f:
    _f.write(
        '/*\n'
        ' * Design Tokens — Bundled (auto-generated)\n'
        ' * ─────────────────────────────────────────────\n'
        ' * 이 파일은 build.py가 tokens/*.css를 합쳐서 생성한다.\n'
        ' * 직접 수정하지 말고 tokens/ 아래 개별 파일을 편집하라.\n'
        ' */\n\n'
    )
    _f.write(tokens_css_raw)

html = '''<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>김반장 3.0 Design System</title>
<style>
__TOKENS_CSS__
</style>
<style>
  /* ── 뷰어 전용 override (tokens.css에 없는 값) ── */
  :root {
    --font-family-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
    --layout-sidebar-width: 280px;
    --layout-toc-width: 220px;
    --layout-content-max: 740px;
  }
'''

final_html = (html
    .replace('__TOKENS_CSS__', tokens_css_raw)
    .replace('__FILES_JSON__', files_json)
    .replace('__TOKENS_JSON__', tokens_json_str)
    .replace('__TOKENS_RAW_JSON__', tokens_raw_json_str)
    .replace('__TOKENS_DESC_JSON__', tokens_desc_json_str)
    .replace('__UTILITIES_JSON__', utilities_json_str)
)

with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
    f.write(final_html)

print(f"✓ HTML 빌드 완료: {len(final_html):,} chars")
print(f"  파일 {len(files_data)}개 임베드 (단일 파일 뷰 + 라우팅)")
