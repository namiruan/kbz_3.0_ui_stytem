"""
v2 빌드: 단일 파일 뷰 + 사이드바 라우팅
- 한 번에 한 파일만 본문에 렌더링
- URL hash 라우팅 (공유·북마크 가능)
- 페이지 하단 prev/next
- 우측 TOC (h2/h3 점프)
- 키보드 ← → 단축키
- 부드러운 페이지 전환
"""
import os, json, re, glob
from urllib.parse import quote

# 스크립트 위치 기준 — 어디서 실행하든 동일하게 작동
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.join(SCRIPT_DIR, 'design-system')
OUTPUT_HTML = os.path.join(SCRIPT_DIR, 'design-system.html')

FILE_ORDER = [
    ('README.md',                'Overview',     'overview'),
    ('workflow/designer.md',     '🎨 Designer',   'workflow'),
    ('workflow/planner.md',      '🧭 Planner',    'workflow'),
    ('governance/versioning.md', '버전 관리',       'governance'),
    ('governance/_spec.md',      '문서 작성 규칙',  'governance'),
    ('tokens/_index.md',         '아키텍처',       'tokens'),
    ('tokens/_spec.md',          '문서 규칙',      'tokens'),
    ('tokens/color.md',          '색상',           'tokens'),
    ('tokens/space.md',          '공간',           'tokens'),
    ('tokens/typography.md',     '타이포그래피',    'tokens'),
    ('tokens/radius.md',         'Radius',        'tokens'),
    ('tokens/elevation.md',      'Elevation',      'tokens'),
    ('tokens/motion.md',         '모션',           'tokens'),
    ('tokens/stroke.md',         '스트로크',        'tokens'),
    ('tokens/icon.md',           '아이콘',         'tokens'),
    ('tokens/layout.md',         '레이아웃',        'tokens'),
    ('interaction.md',           '인터랙션',        'interaction'),
    ('adaptation.md',            '반응형·다크모드', 'adaptation'),
    ('product.md',               '제품 패턴',      'product'),
    ('accessibility.md',         '접근성',         'accessibility'),
    ('components/_index.md',                '아키텍처',       'components'),
    ('components/_spec.md',               '문서 규칙',      'components'),
    ('components/atoms/button.md',        'Button',         'atoms'),
    ('components/atoms/action-group.md', 'ActionGroup',    'atoms'),
    ('components/atoms/icon.md',          'Icon',           'atoms'),
    ('components/atoms/icon-button.md',   'Icon Button',    'atoms'),
    ('components/atoms/input.md',         'Input',          'atoms'),
    ('components/atoms/textarea.md',      'Textarea',       'atoms'),
    ('components/atoms/checkbox.md',      'Checkbox',       'atoms'),
    ('components/atoms/radio.md',         'Radio',          'atoms'),
    ('components/atoms/toggle.md',        'Toggle',         'atoms'),
    ('components/atoms/badge.md',         'Badge',          'atoms'),
    ('components/atoms/tag.md',           'Tag',            'atoms'),
    ('components/atoms/spinner.md',       'Spinner',        'atoms'),
    ('components/atoms/tooltip.md',       'Tooltip',        'atoms'),
    ('components/atoms/divider.md',       'Divider',        'atoms'),
]

files_data = []
for path, label, group in FILE_ORDER:
    full = os.path.join(BASE, path)
    with open(full, 'r', encoding='utf-8') as f:
        raw = f.read()
    # 문서 내 ```css 블록을 미리 추출 — :::preview 렌더링 시 자동 주입
    _preview_css_parts = re.findall(r'^```css\n([\s\S]*?)^```', raw, flags=re.MULTILINE)
    _preview_css = '\n'.join(_preview_css_parts)
    raw = re.sub(r'^:::palette (\w+)', r'<div class="palette-placeholder" data-palette="\1"></div>', raw, flags=re.MULTILINE)
    raw = re.sub(r'^:::scale ([\w-]+)', r'<div class="scale-placeholder" data-scale="\1"></div>', raw, flags=re.MULTILINE)
    raw = re.sub(r'^:::shadow', r'<div class="shadow-placeholder"></div>', raw, flags=re.MULTILINE)
    raw = re.sub(r'^:::z-index', r'<div class="zindex-placeholder"></div>', raw, flags=re.MULTILINE)
    raw = re.sub(r'^:::icon-gallery\n?:::', r'<div class="icon-gallery-placeholder"></div>', raw, flags=re.MULTILINE)
    # fenced code block 안의 :::preview는 건드리지 않도록 임시 마스킹
    _fences = []
    def _mask_fence(m):
        _fences.append(m.group(0))
        return f'\x00FENCE{len(_fences)-1}\x00'
    raw = re.sub(r'^`{3,}[^\n]*\n[\s\S]*?^`{3,}', _mask_fence, raw, flags=re.MULTILINE)
    def encode_preview(m):
        content = m.group(1).strip().replace('href="icons/sprite.svg#', 'href="#')
        encoded = quote(content, safe='')
        return f'<div class="component-preview-placeholder" data-content="{encoded}"></div>'
    raw = re.sub(r'^:::preview\n([\s\S]*?)\n^:::', encode_preview, raw, flags=re.MULTILINE)
    for i, block in enumerate(_fences):
        raw = raw.replace(f'\x00FENCE{i}\x00', block)
    slug = path.replace('/', '--').replace('.md', '').replace('_', '')
    files_data.append({
        'path': path,
        'label': label,
        'group': group,
        'slug': slug,
        'raw': raw,
        'previewCSS': _preview_css,
    })

# ─── 백링크: 컴포넌트 → 토큰/유틸리티 역방향 인덱스 ───

COMPONENT_GROUPS = {'atoms', 'molecules', 'organisms'}
UTILITY_PREFIXES = ('text-', 'icon--', 'icon-on--', 'elevation-', 'layout-', 'stroke-')

# label → slug 맵
label_to_slug = {entry['label']: entry['slug'] for entry in files_data}

# 1. 컴포넌트 파일에서 토큰·유틸리티 참조 수집
token_usage   = {}  # '--token-name' → set(label)
utility_usage = {}  # 'class-name'   → set(label)

for entry in files_data:
    if entry['group'] not in COMPONENT_GROUPS:
        continue
    label = entry['label']
    raw   = entry['raw']
    for token in re.findall(r'var\(--([a-z][a-z0-9-]+)\)', raw):
        token_usage.setdefault(f'--{token}', set()).add(label)
    for cls_str in re.findall(r'class="([^"]*)"', raw):
        for cls in cls_str.split():
            if any(cls.startswith(p) for p in UTILITY_PREFIXES):
                utility_usage.setdefault(cls, set()).add(label)

# 2. 토큰 문서에 "사용 컴포넌트" 섹션 추가
for entry in files_data:
    if entry['group'] != 'tokens':
        continue
    raw = entry['raw']
    doc_tokens = set(re.findall(r'--([a-z][a-z0-9-]+)', raw))
    doc_utilities = set()
    for m in re.findall(r'`\.([a-z][a-z0-9-]+)`|^\.([a-z][a-z0-9-]+)', raw, re.MULTILINE):
        name = m[0] or m[1]
        if any(name.startswith(p) for p in UTILITY_PREFIXES):
            doc_utilities.add(name)
    using = set()
    for t in doc_tokens:
        using.update(token_usage.get(f'--{t}', set()))
    for c in doc_utilities:
        using.update(utility_usage.get(c, set()))
    entry['usedBy'] = [
        {'label': label, 'slug': label_to_slug[label]}
        for label in sorted(using) if label in label_to_slug
    ]

files_json = json.dumps(files_data, ensure_ascii=False).replace('</', '<\\/')

# ─── 토큰 소스 파일 (자동 탐색: tokens/*.css + utilities/*.css) ───
TOKEN_FILES = (
    sorted(glob.glob(os.path.join(SCRIPT_DIR, 'tokens', '*.css'))) +
    sorted(glob.glob(os.path.join(SCRIPT_DIR, 'utilities', '*.css')))
)
TOKEN_FILES = [os.path.relpath(f, SCRIPT_DIR) for f in TOKEN_FILES]

# ─── 미등록 토큰 MD 파일 경고 ───
_registered_paths = {path for path, _, _ in FILE_ORDER}
for _f in sorted(glob.glob(os.path.join(BASE, 'tokens', '*.md'))):
    _rel = os.path.relpath(_f, BASE)
    if not os.path.basename(_rel).startswith('_') and _rel not in _registered_paths:
        print(f'⚠️  미등록 파일: tokens/{os.path.basename(_rel)} — FILE_ORDER에 추가 필요')
for _f in sorted(glob.glob(os.path.join(BASE, 'components', '**', '*.md'), recursive=True)):
    _rel = os.path.relpath(_f, BASE)
    if not os.path.basename(_rel).startswith('_') and _rel not in _registered_paths:
        print(f'⚠️  미등록 파일: {_rel} — FILE_ORDER에 추가 필요')

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
    def parse_props(body):
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
        return props

    utilities = {}
    # 단일 클래스 규칙: .classname { ... } /* combine: .other */
    for m in re.finditer(r'\.([\w-]+)\s*\{([^}]+)\}(?:\s*/\*\s*combine:\s*([\w. -]+?)\s*\*/)?', content):
        name = '.' + m.group(1).strip()
        if name in ('.md', '.active', '.show', '.hidden'):
            continue
        utilities.setdefault(name, []).extend(parse_props(m.group(2)))
        if m.group(3):
            utilities[name].append({'prop': '__combine__', 'raw': m.group(3).strip(), 'token': None, 'value': m.group(3).strip(), 'desc': ''})
    # 자식 셀렉터 규칙: .classname > tag { ... } → 부모 클래스에 child 컨텍스트로 병합
    for m in re.finditer(r'\.([\w-]+)\s*>\s*([\w]+)\s*\{([^}]+)\}', content):
        name = '.' + m.group(1).strip()
        child_tag = m.group(2).strip()
        if name not in utilities:
            continue
        for p in parse_props(m.group(3)):
            p['child'] = child_tag
            utilities[name].append(p)
    return utilities

utility_map = build_utility_map(tokens_css_raw, token_map, desc_map)
tokens_json_str = json.dumps(token_map, ensure_ascii=False).replace('</', '<\\/')
tokens_raw_json_str = json.dumps(raw_token_map, ensure_ascii=False).replace('</', '<\\/')
tokens_desc_json_str = json.dumps(desc_map, ensure_ascii=False).replace('</', '<\\/')
utilities_json_str = json.dumps(utility_map, ensure_ascii=False).replace('</', '<\\/')

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

  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  [hidden] { display: none !important; }
  *:focus-visible { outline: var(--stroke-md) var(--stroke-solid) var(--color-border-focus); outline-offset: var(--space-offset-focus); z-index: var(--z-above); }
  button { appearance: none; background: transparent; border: none; padding: 0; cursor: pointer; }
  html { font-size: 16px; scroll-behavior: smooth; }
  body {
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-body);
    background: var(--color-surface-base);
    -webkit-font-smoothing: antialiased;
  }

  .topbar {
    position: sticky; top: 0; z-index: var(--z-sticky);
    height: var(--layout-topbar-height);
    background: color-mix(in srgb, var(--color-gray-0) 85%, transparent);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--color-border-subtle);
    display: flex; align-items: center;
    padding: 0 var(--space-24);
    gap: var(--space-16);
  }
  .brand { display: flex; align-items: center; gap: var(--space-8); cursor: pointer; text-decoration: none; }
  .brand-text {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-h4);
    letter-spacing: -0.01em;
    color: var(--color-text-body);
  }
  .brand-mark {
    width: 28px; height: 28px;
    border-radius: var(--radius-md);
    background: var(--color-blue-600);
    display: flex; align-items: center; justify-content: center;
    color: var(--color-gray-0);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
  }
  .version-pill {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-meta);
    color: var(--color-text-label);
    background: var(--color-surface-subtle);
    padding: var(--space-inset-squish-sm);
    border-radius: var(--radius-pill);
    border: 1px solid var(--color-border-subtle);
  }
  .topbar-actions { margin-left: auto; display: flex; gap: var(--space-8); }

  /* ── Button component (design system) ── */
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--space-gap-xs);
    border: var(--stroke-sm) var(--stroke-solid) transparent;
    border-radius: var(--radius-pill);
    cursor: pointer;
    white-space: nowrap;
    transition: transform var(--duration-fast) var(--easing-base);
  }
  .btn:hover { transform: translateY(var(--translate-interactive-hover)); }
  .btn--sm { height: var(--height-compact); padding: var(--space-inset-squish-sm); }
  .btn--md { height: var(--height-base);    padding: var(--space-inset-squish-md); }
  .btn--lg { height: var(--height-spacious); padding: var(--space-inset-squish-lg); }

  .btn--primary   { background: var(--color-button-brand);   color: var(--color-text-inverse); border-color: var(--color-button-brand); }
  .btn--secondary { background: var(--color-button-neutral); color: var(--color-text-inverse); border-color: var(--color-button-neutral); }
  .btn--danger    { background: var(--color-button-error);   color: var(--color-text-inverse); border-color: var(--color-button-error); }
  .btn--ghost     { background: var(--color-surface-base);   color: var(--color-text-body);    border-color: transparent; }

  .btn--primary:hover   { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover); }
  .btn--secondary:hover { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-neutral-hover); }
  .btn--danger:hover    { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-error-hover); }
  .btn--ghost:hover     { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-neutral-hover); }

  .btn--primary.btn--solid   { background: var(--color-surface-base); color: var(--color-button-brand);   border-color: var(--color-button-brand); }
  .btn--secondary.btn--solid { background: var(--color-surface-base); color: var(--color-button-neutral); border-color: var(--color-button-neutral); }
  .btn--danger.btn--solid    { background: var(--color-surface-base); color: var(--color-button-error);   border-color: var(--color-button-error); }

  .btn--disabled { pointer-events: none; color: var(--color-text-disabled); background: var(--color-surface-disabled); border-color: var(--color-border-disabled); }

  .btn-icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .btn--icon-only { padding: 0; }
  .btn--icon-only.btn--sm { width: var(--height-compact); }
  .btn--icon-only.btn--md { width: var(--height-base); }
  .btn--icon-only.btn--lg { width: var(--height-spacious); }
  .btn--icon-right { flex-direction: row-reverse; }

  .layout {
    display: grid;
    grid-template-columns: var(--layout-sidebar-width) 1fr var(--layout-toc-width);
    max-width: 1440px;
    margin: 0 auto;
  }

  .sidebar {
    border-right: 1px solid var(--color-border-subtle);
    padding: var(--space-24) var(--space-16);
    position: sticky;
    top: var(--layout-topbar-height);
    height: calc(100vh - var(--layout-topbar-height));
    overflow-y: auto;
    background: var(--color-surface-base);
  }
  .sidebar-group { margin-bottom: var(--space-24); }
  .sidebar-label {
    font-size: var(--font-size-meta);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-subtle);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0 var(--space-12) var(--space-8);
  }
  .sidebar-group.collapsible .sidebar-label {
    display: flex; align-items: center; justify-content: space-between;
    cursor: pointer;
    border-radius: var(--radius-sm);
    padding: var(--space-4) var(--space-12) var(--space-8);
    user-select: none;
    transition: color var(--duration-fast) ease;
  }
  .sidebar-group.collapsible .sidebar-label:hover { color: var(--color-text-body); }
  .sidebar-chevron {
    color: var(--color-text-subtle);
  }
  .sidebar-nav {
    list-style: none;
    overflow: hidden;
    max-height: 2000px;
    transition: max-height var(--duration-slow) var(--easing-exit), opacity var(--duration-fast) var(--easing-base);
    opacity: 1;
  }
  .sidebar-group.is-collapsed .sidebar-nav {
    max-height: 0;
    opacity: 0;
  }
  .sidebar-group.is-collapsed .sidebar-subgroup { display: none; }
  .sidebar-nav a {
    display: flex; align-items: center; gap: var(--space-8);
    padding: var(--space-8) var(--space-12);
    color: var(--color-text-label);
    text-decoration: none;
    font-size: var(--font-size-sm);
    border-radius: var(--radius-md);
    transition: all var(--duration-fast) ease;
    line-height: var(--line-height-base);
  }
  .sidebar-nav a:hover { background: var(--color-surface-subtle); color: var(--color-text-body); }
  .sidebar-nav a.active {
    background: var(--color-blue-50);
    color: var(--color-blue-700);
    font-weight: var(--font-weight-medium);
  }
  .sidebar-version {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-meta);
    color: var(--color-text-subtle);
    margin-left: auto;
    flex-shrink: 0;
  }
  .sidebar-nav a.active .sidebar-version { color: var(--color-blue-600); }
  .sidebar-deprecated-tag {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-meta);
    color: var(--color-orange-500);
    background: var(--color-orange-50);
    border: 1px solid color-mix(in srgb, var(--color-orange-500) 20%, transparent);
    padding: var(--space-inset-squish-xs);
    border-radius: var(--radius-sm);
    margin-left: auto;
    flex-shrink: 0;
  }
  .sidebar-nav a.deprecated {
    opacity: 0.45;
  }
  .sidebar-nav a.deprecated:hover {
    opacity: 0.7;
  }
  .sidebar-subgroup { margin-top: var(--space-8); }
  .sidebar-sublabel {
    display: flex; align-items: center; justify-content: space-between;
    padding: 4px var(--space-16);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--color-text-subtle);
    text-transform: uppercase;
  }
  .sidebar-subgroup.collapsible .sidebar-sublabel { cursor: pointer; }
  .sidebar-subgroup.collapsible .sidebar-sublabel:hover { color: var(--color-text-body); }
  .sidebar-subgroup.is-collapsed .sidebar-nav { max-height: 0; opacity: 0; }
  .sidebar-nav--sub a { padding-left: var(--space-24); }

  .content {
    padding: var(--space-32) var(--space-48);
    min-width: 0;
    overflow-x: clip;
  }
  .content-inner {
    max-width: var(--layout-content-max);
    margin: 0 auto;
    animation: fadeIn var(--duration-slow) var(--easing-enter);
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes duration-dot {
    0%   { left: 0%; }
    50%  { left: calc(100% - 10px); }
    100% { left: 0%; }
  }
  @keyframes easing-demo {
    0%  { left: 0%; opacity: 1; }
    80% { left: calc(100% - 10px); opacity: 1; }
    88% { left: calc(100% - 10px); opacity: 0; }
    89% { left: 0%; opacity: 0; }
    100%{ left: 0%; opacity: 1; }
  }

  /* breadcrumb: path + 복사 버튼 */
  .file-breadcrumb {
    display: flex; align-items: center; justify-content: space-between;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-meta);
    color: var(--color-text-subtle);
    margin-bottom: var(--space-8);
  }

  /* h1 아래 메타 rows */
  .file-meta-inline {
    display: flex; flex-direction: column; gap: var(--space-4);
    margin-top: var(--space-8);
    margin-bottom: var(--space-32);
    padding-bottom: var(--space-24);
    border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  }
  .fmi-row {
    display: flex; align-items: baseline; gap: var(--space-8);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-meta);
    color: var(--color-text-subtle);
  }
  .fmi-label {
    color: var(--color-text-disabled);
    min-width: 36px;
    flex-shrink: 0;
    align-self: flex-start;
  }
  .fmi-links {
    display: flex; flex-wrap: wrap; gap: var(--space-4) var(--space-8);
    flex: 1;
  }
  .file-meta-link {
    text-decoration: none;
    border-bottom: 0 !important;
  }
  .file-meta-link > code {
    font-size: var(--font-size-meta);
    padding: var(--space-2) var(--space-6);
    color: var(--color-text-label);
    cursor: pointer;
    transition: all var(--duration-fast) ease;
  }
  .file-meta-link:hover > code {
    color: var(--color-text-brand-muted);
    background: var(--color-surface-brand-subtle);
    border-color: var(--color-border-brand);
  }
  .file-meta-actions { margin-left: auto; }

  /* 본문에서 자동 변환된 .md 파일 링크 */
  .md a.md-file-link {
    border-bottom: 0;
    text-decoration: none;
  }
  .md a.md-file-link > code {
    color: var(--color-text-brand);
    border-color: var(--color-surface-brand-tint);
    cursor: pointer;
    transition: all var(--duration-fast) ease;
    position: relative;
    padding-right: 18px;
  }
  .md a.md-file-link > code::after {
    content: '↗';
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.85em;
    opacity: 0.6;
  }
  .md a.md-file-link:hover > code {
    background: var(--color-surface-brand-subtle);
    border-color: var(--color-border-brand);
    color: var(--color-text-brand-muted);
  }
  .md a.md-file-link:hover > code::after { opacity: 1; }

  .md h1 {
    font-size: var(--font-size-h2);
    font-weight: var(--font-weight-bold);
    letter-spacing: -0.015em;
    line-height: var(--line-height-tight);
    margin-bottom: var(--space-16);
  }
  .md h2 {
    font-size: var(--font-size-h4);
    font-weight: var(--font-weight-semibold);
    letter-spacing: -0.01em;
    margin-top: var(--space-32);
    margin-bottom: var(--space-12);
    scroll-margin-top: calc(var(--layout-topbar-height) + 16px);
  }
  .md h3 {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    margin-top: var(--space-24);
    margin-bottom: var(--space-8);
    scroll-margin-top: calc(var(--layout-topbar-height) + 16px);
  }
  .md p { margin-bottom: var(--space-12); }
  .md hr { border: 0; height: 1px; background: var(--color-border-subtle); margin: var(--space-32) 0; }
  .md ul, .md ol { padding-left: var(--space-24); margin-bottom: var(--space-12); }
  .md li { margin-bottom: var(--space-4); }
  .md li::marker { color: var(--color-text-subtle); }
  .md a {
    color: var(--color-text-brand);
    text-decoration: none;
    border-bottom: 1px solid var(--color-blue-100);
  }
  .md a:hover { border-bottom-color: var(--color-blue-500); }
  .md strong { font-weight: var(--font-weight-semibold); }
  .md em { font-style: normal; font-weight: var(--font-weight-medium); color: var(--color-text-brand); }

  .md code {
    font-family: var(--font-family-mono);
    font-size: 0.92em;
    background: var(--color-surface-subtle);
    color: var(--color-gray-800);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border-subtle);
  }
  .md pre {
    font-family: var(--font-family-mono);
    background: var(--color-gray-900);
    color: var(--color-gray-100);
    padding: var(--space-16);
    border-radius: var(--radius-lg);
    overflow-x: auto;
    margin-bottom: 0;
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
  }
  .md pre code { background: transparent; border: 0; color: inherit; padding: 0; font-size: inherit; white-space: pre-wrap; word-break: break-all; }
  .code-block-wrap { position: relative; margin-bottom: var(--space-12); border-radius: var(--radius-lg); overflow: hidden; }
  .code-block-wrap .md pre { border-radius: 0; margin-bottom: 0; max-height: 240px; overflow-y: hidden; transition: max-height var(--duration-slow) var(--easing-enter); }
  .code-block-wrap.is-expanded .md pre,
  .code-block-wrap.code-block-short .md pre { max-height: none; }
  .code-block-wrap.code-block-short .code-block-expand { display: none; }
  .code-block-expand { display: flex; align-items: center; justify-content: center; gap: var(--space-4); width: 100%; padding: var(--space-8) var(--space-16); background: linear-gradient(to bottom, transparent, var(--color-gray-900) 60%); color: var(--color-gray-400); font-family: var(--font-family-base); font-size: var(--font-size-sm); cursor: pointer; border: none; position: absolute; bottom: 0; left: 0; transition: color var(--duration-fast) var(--easing-base); }
  .code-block-expand:hover { color: var(--color-gray-100); }
  .code-block-expand svg { transition: transform var(--duration-fast) var(--easing-base); }
  .code-block-wrap.is-expanded .code-block-expand { position: static; background: var(--color-gray-900); border-top: 1px solid rgba(255,255,255,0.06); }
  .code-block-wrap.is-expanded .code-block-expand svg { transform: rotate(180deg); }
  .hl-css-comment  { color: #6a9955; font-style: italic; }
  .hl-css-selector { color: #d7ba7d; }
  .hl-css-prop     { color: #9cdcfe; }
  .hl-css-value    { color: #ce9178; }
  .hl-css-brace    { color: #808080; }
  .md table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: var(--space-12);
    font-size: var(--font-size-sm);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .md thead { background: var(--color-surface-subtle); }
  .md th, .md td { padding: var(--space-inset-squish-lg); text-align: left; border-bottom: 1px solid var(--color-border-subtle); }
  .md tr:last-child td { border-bottom: 0; }
  .md td[rowspan] { border-right: none; }
  .md tr.group-inner td:not([rowspan]) { border-bottom: none; }
  .md th {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-sm);
    color: var(--color-text-label);
  }
  .md td code { font-size: 0.85em; white-space: nowrap; }
  .md td code.code-label {
    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    background: none;
    border: none;
    color: var(--color-text-body);
    padding: 0;
    border-radius: 0;
  }

  .md blockquote {
    margin: var(--space-12) 0;
    padding: var(--space-12) var(--space-16);
    background: var(--color-orange-50);
    border-left: 3px solid var(--color-orange-500);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    color: var(--color-gray-800);
  }
  .md blockquote p { margin-bottom: 0; }
  .md blockquote p + p { margin-top: var(--space-4); }
  .md blockquote.tip {
    background: var(--color-blue-50);
    border-left-color: var(--color-blue-500);
  }
  .md blockquote.do,
  .md blockquote.dont {
    margin: var(--space-12) 0;
    padding: var(--space-8) var(--space-16);
    border-radius: var(--radius-md);
    overflow: hidden;
    color: var(--color-text-body);
  }
  .md blockquote.do {
    background: var(--color-green-50);
    border: 1px solid color-mix(in srgb, var(--color-green-500) 20%, transparent);
  }
  .md blockquote.dont {
    background: var(--color-red-50);
    border: 1px solid color-mix(in srgb, var(--color-red-500) 20%, transparent);
  }
  .md blockquote.do .card-title,
  .md blockquote.dont .card-title {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-13);
    margin-bottom: var(--space-8);
  }
  .md blockquote.do .card-title:last-child,
  .md blockquote.dont .card-title:last-child { margin-bottom: 0; }
  .md blockquote.do .card-title { color: var(--color-green-700); }
  .md blockquote.dont .card-title { color: var(--color-red-700); }
  .md blockquote.do .card-body,
  .md blockquote.dont .card-body {
    font-size: var(--font-size-13);
    line-height: var(--line-height-base);
  }
  .md blockquote.do .card-body code,
  .md blockquote.dont .card-body code {
    display: block;
    background: color-mix(in srgb, var(--color-gray-1000) 6%, transparent);
    border: none;
    padding: var(--space-inset-squish-sm);
    border-radius: var(--radius-sm);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: var(--font-size-label);
    line-height: var(--line-height-base);
    white-space: pre-wrap;
    word-break: break-word;
    color: var(--color-text-body);
  }
  .md blockquote.do .card-body code + code,
  .md blockquote.dont .card-body code + code {
    margin-top: var(--space-4);
  }
  .md blockquote.do .card-sep,
  .md blockquote.dont .card-sep {
    height: 1px;
    margin: var(--space-8) 0;
  }
  .md blockquote.do .card-sep { background: color-mix(in srgb, var(--color-green-500) 20%, transparent); }
  .md blockquote.dont .card-sep { background: color-mix(in srgb, var(--color-red-500) 20%, transparent); }
  .md .do-dont-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    margin: var(--space-12) 0;
    align-items: stretch;
  }
  .md .do-dont-pair blockquote { margin: 0; height: 100%; display: flex; flex-direction: column; }
  .md .do-dont-pair blockquote .card-body { flex: 1; }
  @media (max-width: 720px) {
    .md .do-dont-pair { grid-template-columns: 1fr; }
  }

  /* ═══ 3-Actor Flow Diagram ═══ */
  .md .actor-flow {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr;
    gap: 0;
    align-items: stretch;
    margin: var(--space-24) 0 var(--space-32);
  }
  .md .actor-card {
    padding: var(--space-16);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-default);
    background: var(--color-surface-base);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 0;
    transition: all var(--duration-fast) ease;
    position: relative;
  }
  /* 클릭 가능한 카드 (a 태그로 감싸진 카드) */
  .md a.actor-card-link {
    text-decoration: none !important;
    border-bottom: 0 !important;
    display: block;
  }
  .md a.actor-card-link .actor-card {
    cursor: pointer;
  }
  .md a.actor-card-link:hover .actor-card {
    border-color: var(--color-blue-500);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  .md a.actor-card-link:hover .actor-card-corner {
    color: var(--color-blue-600);
  }
  /* 카드 우상단 코너 (→ 또는 — 표시) */
  .md .actor-card-corner {
    position: absolute;
    top: 12px;
    right: 14px;
    font-size: var(--font-size-base);
    color: var(--color-text-subtle);
    transition: color var(--duration-fast) ease;
    font-family: var(--font-family-mono);
    line-height: 1;
  }
  /* 비활성 카드 (개발자) */
  .md .actor-card--disabled {
    opacity: 0.55;
    background: var(--color-surface-subtle);
  }
  .md .actor-card--disabled .actor-emoji {
    filter: grayscale(1);
  }
  .md .actor-card-note {
    font-size: var(--font-size-meta);
    color: var(--color-text-subtle);
    font-style: italic;
    margin-top: var(--space-6);
    padding-top: var(--space-6);
    border-top: 1px dashed var(--color-border-subtle);
    line-height: var(--line-height-base);
  }
  /* 비활성 카드로 향하는 화살표 dim */
  .md .flow-arrow--dim {
    opacity: 0.4;
  }
  .md .actor-emoji {
    font-size: 22px;
    line-height: 1;
    margin-bottom: var(--space-4);
  }
  .md .actor-role {
    font-size: var(--font-size-h4);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-body);
    letter-spacing: -0.01em;
    line-height: 1.3;
  }
  .md .actor-label {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-meta);
    color: var(--color-text-subtle);
    letter-spacing: 0.06em;
    margin-bottom: var(--space-6);
  }
  .md .actor-action {
    font-size: var(--font-size-sm);
    color: var(--color-text-label);
    line-height: var(--line-height-base);
  }
  .md .actor-output {
    margin-top: auto;
    padding-top: var(--space-12);
    border-top: 1px dashed var(--color-border-subtle);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  .md .output-item {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-meta);
    color: var(--color-text-label);
    background: var(--color-surface-subtle);
    padding: var(--space-inset-squish-sm);
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border-subtle);
    width: fit-content;
  }
  .md .flow-arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 var(--space-12);
    gap: var(--space-6);
  }
  .md .arrow-label-top {
    font-size: var(--font-size-meta);
    color: var(--color-text-subtle);
    text-align: center;
    line-height: var(--line-height-tight);
    font-weight: var(--font-weight-medium);
  }
  .md .arrow-line {
    width: 32px;
    height: 1px;
    background: var(--color-border-subtle);
    position: relative;
  }
  .md .arrow-line::after {
    content: '';
    position: absolute;
    right: -1px;
    top: -3px;
    border: 4px solid transparent;
    border-left-color: var(--color-border-subtle);
    border-right-width: 0;
  }
  /* 좁은 화면: 세로로 떨어지게 */
  @media (max-width: 700px) {
    .md .actor-flow {
      grid-template-columns: 1fr;
    }
    .md .flow-arrow {
      padding: var(--space-8) 0;
    }
    .md .arrow-line {
      width: 1px;
      height: 20px;
    }
    .md .arrow-line::after {
      right: -3px;
      top: auto;
      bottom: -1px;
      border: 4px solid transparent;
      border-top-color: var(--color-border-subtle);
      border-bottom-width: 0;
    }
  }

  .pager {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    margin-top: var(--space-48);
    padding-top: var(--space-24);
    border-top: 1px solid var(--color-border-subtle);
  }
  .pager-link {
    display: flex; flex-direction: column; gap: var(--space-4);
    padding: var(--space-16);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: all var(--duration-fast) ease;
  }
  .pager-link:hover {
    border-color: var(--color-blue-500);
    background: var(--color-blue-50);
  }
  .pager-link[data-disabled="true"] { opacity: 0.4; pointer-events: none; }
  .pager-direction {
    font-size: var(--font-size-meta);
    color: var(--color-text-subtle);
    display: flex; align-items: center; gap: var(--space-4);
  }
  .pager-link.next .pager-direction { justify-content: flex-end; }
  .pager-link.next { text-align: right; }
  .pager-label {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-body);
  }
  .pager-path {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-meta);
    color: var(--color-text-subtle);
  }

  .toc {
    padding: var(--space-24) var(--space-16);
    position: sticky;
    top: var(--layout-topbar-height);
    height: calc(100vh - var(--layout-topbar-height));
    overflow-y: auto;
    border-left: 1px solid var(--color-border-subtle);
  }
  .toc-label {
    font-size: var(--font-size-meta);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-subtle);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0 var(--space-8) var(--space-8);
  }
  .toc ul { list-style: none; }
  .toc a {
    display: block;
    padding: var(--space-4) var(--space-8);
    color: var(--color-text-subtle);
    text-decoration: none;
    font-size: var(--font-size-meta);
    line-height: var(--line-height-base);
    border-left: 2px solid transparent;
    margin-left: -2px;
    transition: all var(--duration-fast) ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .toc a:hover { color: var(--color-text-body); }
  .toc a.active {
    color: var(--color-text-brand);
    border-left-color: var(--color-blue-500);
    font-weight: var(--font-weight-medium);
  }
  .toc a.h3-link { padding-left: var(--space-16); font-size: var(--font-size-meta); }
  .toc-empty {
    padding: var(--space-8);
    color: var(--color-text-subtle);
    font-size: var(--font-size-meta);
    font-style: italic;
  }

  .toast {
    position: fixed;
    bottom: var(--space-32);
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: var(--color-gray-900);
    color: var(--color-gray-0);
    padding: var(--space-inset-squish-lg);
    border-radius: var(--radius-pill);
    font-size: var(--font-size-sm);
    box-shadow: var(--shadow-lg);
    opacity: 0;
    pointer-events: none;
    transition: all var(--duration-base) ease;
    z-index: var(--z-toast);
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

  .kbd-hint {
    position: fixed;
    bottom: var(--space-16);
    right: var(--space-16);
    font-size: var(--font-size-meta);
    color: var(--color-text-subtle);
    background: var(--color-surface-base);
    padding: var(--space-inset-squish-md);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border-subtle);
    display: flex; align-items: center; gap: var(--space-8);
    box-shadow: var(--shadow-md);
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--duration-base) ease;
  }
  .kbd-hint.show { opacity: 1; }
  .kbd {
    font-family: var(--font-family-mono);
    background: var(--color-surface-subtle);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-sm);
    padding: var(--space-inset-squish-xs);
    font-size: var(--font-size-meta);
  }

  /* ── 오버레이 버튼 (기본 숨김) ── */
  .btn-sidebar-toggle, .btn-toc-toggle {
    display: none;
    width: var(--height-base); height: var(--height-base); padding: 0;
    flex-shrink: 0;
  }

  /* ── 오버레이 백드롭 ── */
  .overlay-backdrop {
    display: none;
    position: fixed; top: var(--layout-topbar-height); bottom: 0; left: 0; right: 0;
    background: var(--color-surface-dim);
    z-index: var(--z-backdrop);
  }
  .overlay-backdrop.show { display: block; }

  @media (max-width: 1100px) {
    .layout { grid-template-columns: var(--layout-sidebar-width) 1fr; }
    .btn-toc-toggle { display: inline-flex; }
    .toc {
      display: block;
      position: fixed; top: var(--layout-topbar-height); right: 0;
      height: calc(100vh - var(--layout-topbar-height)); width: var(--layout-toc-width);
      z-index: var(--z-modal);
      transform: translateX(100%);
      transition: transform var(--duration-slow) var(--easing-enter);
      background: var(--color-surface-base);
      border-left: 1px solid var(--color-border-subtle);
      overflow-y: auto;
    }
    .toc.is-open { transform: translateX(0); }
  }
  @media (max-width: 900px) {
    .layout { grid-template-columns: 1fr; }
    .btn-sidebar-toggle { display: inline-flex; }
    .sidebar {
      display: block;
      position: fixed; top: var(--layout-topbar-height); left: 0;
      height: calc(100vh - var(--layout-topbar-height));
      z-index: var(--z-modal);
      transform: translateX(-100%);
      transition: transform var(--duration-slow) var(--easing-enter);
    }
    .sidebar.is-open { transform: translateX(0); }
    .content { padding: var(--space-24) var(--space-16); }
    .pager { grid-template-columns: 1fr; }
    .kbd-hint { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
    html { scroll-behavior: auto; }
  }

  #files-source { display: none; }

  /* ─── 토큰 스와치 & 툴팁 ─── */
  .token-swatch {
    display: inline-block;
    width: 20px; height: 20px;
    border-radius: var(--radius-xs);
    border: 1px solid color-mix(in srgb, var(--color-gray-1000) 12%, transparent);
    margin-right: var(--space-6);
    vertical-align: middle;
    flex-shrink: 0;
  }
  .md code[data-token-value] {
    cursor: pointer;
    transition: background var(--duration-fast) ease, border-color var(--duration-fast) ease, color var(--duration-fast) ease;
  }
  .md code[data-token-value]:hover {
    background: var(--color-blue-50);
    border-color: var(--color-blue-200);
    color: var(--color-blue-700);
  }
  .md code[data-token-value].copied {
    background: var(--color-green-50);
    border-color: var(--color-green-300);
    color: var(--color-green-700);
  }
  /* 코드 블록 안의 var(--token) hover */
  .hl-token-var {
    border-radius: 2px;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-style: dotted;
    text-underline-offset: 2px;
  }
  .hl-token-var:hover {
    background: color-mix(in srgb, var(--color-blue-500) 12%, transparent);
  }
  .token-tooltip {
    position: fixed;
    background: var(--color-gray-900);
    color: var(--color-gray-0);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-meta);
    padding: var(--space-8) var(--space-12);
    border-radius: var(--radius-sm);
    white-space: nowrap;
    z-index: var(--z-tooltip);
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--duration-fast) ease;
    box-shadow: var(--shadow-md);
  }
  .token-tooltip.show { opacity: 1; }
  .token-tooltip .token-swatch { margin-right: 0; width: 14px; height: 14px; border-radius: var(--radius-xs); }

  /* ─── 팔레트 스트립 ─── */
  .palette-strip { margin: var(--space-8) 0 var(--space-24); }
  .palette-strip-label {
    font-size: var(--font-size-meta);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-subtle);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: var(--space-8);
  }
  .palette-strip-chips {
    display: flex;
    gap: 1px;
    border-radius: var(--radius-md);
    overflow: hidden;
  }
  .palette-chip {
    flex: 1;
    min-width: 0;
    height: 88px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--space-8) var(--space-4);
    cursor: default;
    position: relative;
    transition: filter var(--duration-fast) ease, transform var(--duration-fast) ease;
  }
  .palette-chip:hover {
    transform: translateY(-2px);
  }
  .palette-chip--base::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 2px;
    border-radius: 1px;
    background: currentColor;
    opacity: 0.5;
  }
  .chip-scale {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-meta);
    font-weight: var(--font-weight-bold);
    line-height: 1;
  }
  .chip-hex {
    font-family: var(--font-family-mono);
    font-size: 9px;
    opacity: 0.8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ─── 섀도우 스케일 ─── */
  .shadow-wrap { margin: var(--space-8) 0 var(--space-24); background: var(--color-surface-subtle); border-radius: var(--radius-lg); padding: var(--space-20); display: flex; flex-direction: column; gap: var(--space-6); }
  .shadow-grid-row { display: grid; grid-template-columns: 52px repeat(4, 1fr); gap: var(--space-12); align-items: center; }
  .shadow-row-label { font-family: var(--font-family-mono); font-size: var(--font-size-meta); color: var(--color-text-subtle); text-align: right; padding-right: var(--space-8); white-space: nowrap; }
  .shadow-preview { width: 100%; height: 72px; background: var(--color-surface-base); border-radius: var(--radius-md); cursor: default; transition: transform var(--duration-fast) ease; }
  .shadow-preview:hover { transform: translateY(-2px); }
  .shadow-cell-group { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px; }
  .shadow-cell { font-family: var(--font-family-mono); font-size: var(--font-size-meta); color: var(--color-text-subtle); text-align: center; background: color-mix(in srgb, var(--color-gray-1000) 5%, transparent); border-radius: var(--radius-xs); padding: 2px 3px; }
  .shadow-cell-header { font-family: var(--font-family-mono); font-size: var(--font-size-meta); color: var(--color-text-disabled); text-align: center; }
  .shadow-cell-empty { font-family: var(--font-family-mono); font-size: var(--font-size-meta); color: var(--color-text-disabled); text-align: center; }

  /* ─── z-index 비례 스택 뷰 ─── */
  .zindex-iso-wrap { margin: var(--space-8) 0 var(--space-24); background: var(--color-surface-subtle); border-radius: var(--radius-lg); padding: var(--space-24) var(--space-32); display: flex; justify-content: center; align-items: flex-start; }
  .zindex-iso-scene { position: relative; margin: 0 auto; }
  .zindex-iso-top { position: absolute; border-radius: var(--radius-xs); transform: skewX(-18deg); transform-origin: left center; cursor: default; transition: filter var(--duration-fast) ease; }
  .zindex-iso-top:hover { filter: brightness(1.06); }
  .zindex-iso-legend-val { position: absolute; font-family: var(--font-family-mono); font-size: var(--font-size-meta); color: var(--color-text-subtle); text-align: right; }
  .zindex-iso-legend-dash { position: absolute; border-top: 1.5px dashed color-mix(in srgb, var(--color-gray-1000) 20%, transparent); }


  /* ─── 스페이스 스케일 ─── */
  .scale-strip { margin: var(--space-8) 0 var(--space-24); display: flex; flex-direction: column; gap: var(--space-12); }
  .scale-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-12);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-meta);
  }
  .scale-unit {
    display: flex;
    align-items: stretch;
    height: 20px;
    border: 1px solid var(--color-border-brand);
    border-radius: var(--radius-sm);
    overflow: hidden;
    flex-shrink: 0;
    cursor: default;
    transition: transform var(--duration-fast) ease;
  }
  .scale-unit:hover { transform: translateY(-2px); }
  .scale-space { background: var(--color-surface-brand-tint); flex-shrink: 0; }
  .scale-content { width: 20px; background: var(--color-surface-base); flex-shrink: 0; }
  .scale-val { color: var(--color-text-subtle); width: 36px; flex-shrink: 0; text-align: right; }
  .scale-note { color: var(--color-text-brand); font-size: 9px; }

  /* Duration 스케일 */
  .duration-wrap { display: flex; flex-direction: column; gap: var(--space-12); padding: var(--space-16) 0 var(--space-24); }
  .duration-row { display: flex; align-items: center; gap: var(--space-12); cursor: default; }
  .duration-row:hover .duration-track { background: var(--color-border-brand); }
  .duration-val { width: 48px; color: var(--color-text-subtle); font-family: var(--font-family-mono); font-size: var(--font-size-meta); text-align: right; flex-shrink: 0; }
  .duration-track { flex: 1; max-width: 220px; height: 4px; background: var(--color-border-subtle); border-radius: 2px; position: relative; }
  .duration-dot { position: absolute; top: 50%; transform: translateY(-50%); width: 10px; height: 10px; border-radius: 50%; background: var(--color-surface-brand); animation-name: duration-dot; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-duration: var(--_dot-dur, 300ms); }
  @media (prefers-reduced-motion: reduce) { .duration-dot { animation: none; left: 0 !important; } }

  /* Easing 스케일 */
  .easing-wrap { display: flex; flex-direction: column; gap: var(--space-12); padding: var(--space-16) 0 var(--space-24); }
  .easing-row { display: flex; align-items: center; gap: var(--space-12); cursor: default; }
  .easing-val { width: 80px; color: var(--color-text-subtle); font-family: var(--font-family-mono); font-size: var(--font-size-meta); text-align: right; flex-shrink: 0; }
  .easing-track { flex: 1; max-width: 220px; height: 4px; background: var(--color-border-subtle); border-radius: 2px; position: relative; }
  .easing-dot { position: absolute; top: 50%; transform: translateY(-50%); width: 10px; height: 10px; border-radius: 50%; background: var(--color-surface-brand); animation: easing-demo 1.8s var(--_ease, ease) infinite; }
  @media (prefers-reduced-motion: reduce) { .easing-dot { animation: none; left: calc(50% - 5px); } }

  /* Stroke 스케일 */
  .stroke-wrap { display: flex; flex-direction: column; gap: var(--space-20); padding: var(--space-16) 0 var(--space-24); }
  .stroke-row  { display: flex; align-items: center; gap: var(--space-12); cursor: default; border-radius: var(--radius-xs); padding: var(--space-4) var(--space-6); transition: background var(--duration-fast) ease; }
  .stroke-row:hover { background: var(--color-surface-brand-subtle); }
  .stroke-val  { width: 48px; font-family: var(--font-family-mono); font-size: var(--font-size-meta); color: var(--color-text-subtle); flex-shrink: 0; text-align: right; }
  .stroke-line { flex: 1; max-width: 220px; border: none; border-top-style: solid; border-top-color: var(--color-text-default); }
  .stroke-svg  { flex: 1; max-width: 220px; display: block; overflow: visible; }

  /* ─── 하이트 스케일 ─── */
  .height-strip { margin: var(--space-8) 0 var(--space-24); display: flex; align-items: flex-end; justify-content: center; gap: var(--space-24); font-family: var(--font-family-mono); font-size: var(--font-size-meta); }
  .height-col { display: flex; flex-direction: column; align-items: center; gap: var(--space-6); cursor: default; transition: transform var(--duration-fast) ease; }
  .height-col:hover { transform: translateY(-2px); }
  .layout-dim[data-token-value] { cursor: pointer; transition: filter var(--duration-fast) ease; }
  .layout-dim[data-token-value]:hover { filter: brightness(0.93); }
  .height-bar { width: 48px; background: var(--color-surface-brand-tint); border-radius: var(--radius-sm); position: relative; }
  .height-arrow { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; }
  .height-arrow-head { font-size: 7px; line-height: 1; flex-shrink: 0; color: var(--color-text-brand); }
  .height-arrow-line { flex: 1; width: 1px; background: var(--color-border-brand); }
  .height-val { color: var(--color-text-subtle); }

  /* ─── 아이콘 스케일 ─── */
  .icon-wrap { margin: var(--space-8) 0 var(--space-24); background: var(--color-surface-subtle); border-radius: var(--radius-lg); padding: var(--space-20); display: flex; flex-direction: column; gap: var(--space-6); }
  .icon-grid-row { display: grid; grid-template-columns: 52px repeat(6, 1fr); gap: var(--space-12); align-items: center; }
  .icon-row-label { font-family: var(--font-family-mono); font-size: var(--font-size-meta); color: var(--color-text-subtle); text-align: right; padding-right: var(--space-8); white-space: nowrap; }
  .icon-preview-cell { width: 100%; height: 80px; display: flex; align-items: center; justify-content: center; background: var(--color-surface-neutral); border-radius: var(--radius-md); cursor: default; transition: transform var(--duration-fast) ease; }
  .icon-preview-cell:hover { transform: translateY(-2px); }
  .icon-pair { display: flex; gap: var(--space-6); align-items: center; justify-content: center; }
  .icon-bound { position: relative; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; background: var(--color-surface-base); }
  .icon-guide-inset { position: absolute; pointer-events: none; border-color: var(--color-blue-500); }
  .icon-pair svg { display: block; color: var(--color-text-brand-vivid); }
  .icon-cell { font-family: var(--font-family-mono); font-size: var(--font-size-meta); color: var(--color-text-subtle); text-align: center; background: color-mix(in srgb, var(--color-gray-1000) 5%, transparent); border-radius: var(--radius-xs); padding: 2px 3px; }
  .icon-cell--token { color: var(--color-text-brand); background: var(--color-surface-brand-tint); }

  /* ─── 라디우스 스케일 ─── */
  .radius-strip { margin: var(--space-8) 0 var(--space-24); display: flex; gap: var(--space-20); flex-wrap: wrap; align-items: flex-end; justify-content: center; }
  .radius-col { display: flex; flex-direction: column; align-items: center; gap: var(--space-6); cursor: default; transition: transform var(--duration-fast) ease; font-family: var(--font-family-mono); font-size: var(--font-size-meta); }
  .radius-col:hover { transform: translateY(-2px); }
  .radius-preview { width: 72px; height: 96px; background: var(--color-surface-base); border: 1px solid var(--color-border-brand); position: relative; flex-shrink: 0; }
  .radius-arc { position: absolute; background: var(--color-surface-brand-tint); border-radius: 50%; pointer-events: none; }
  .radius-val { color: var(--color-text-subtle); }
  .radius-base-badge { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: var(--font-family-mono); font-size: 9px; color: var(--color-text-brand); letter-spacing: 0.05em; pointer-events: none; }

  /* ─── 폰트 사이즈 스케일 ─── */
  .font-size-strip { margin: var(--space-8) 0 var(--space-24); display: flex; flex-direction: column; gap: var(--space-12); }
  .font-size-item { display: flex; align-items: baseline; gap: var(--space-16); cursor: default; transition: opacity var(--duration-fast) ease; }
  .font-size-item:hover { opacity: 0.7; }
  .font-size-val { width: 40px; flex-shrink: 0; font-family: var(--font-family-mono); font-size: var(--font-size-meta); color: var(--color-text-subtle); text-align: right; }
  .font-size-sample { color: var(--color-text-body); font-family: var(--font-family-base); line-height: 1.3; font-weight: var(--font-weight-regular); }

  /* ─── 타이포 props (font-weight·line-height·letter-spacing) ─── */
  .typo-props-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-24); margin: var(--space-8) 0 var(--space-24); }
  .typo-props-col { display: flex; flex-direction: column; }
  .typo-props-header { font-family: var(--font-family-mono); font-size: 10px; color: var(--color-text-subtle); font-weight: var(--font-weight-semibold); text-transform: uppercase; letter-spacing: 0.06em; padding-bottom: var(--space-8); border-bottom: 1px solid var(--color-border-subtle); margin-bottom: var(--space-8); }
  .typo-props-item { display: flex; align-items: flex-start; gap: var(--space-12); padding: var(--space-4) 0; cursor: default; transition: opacity var(--duration-fast) ease; }
  .typo-props-item:hover { opacity: 0.7; }
  .typo-props-val { width: 52px; flex-shrink: 0; font-family: var(--font-family-mono); font-size: var(--font-size-meta); color: var(--color-text-subtle); text-align: right; padding-top: 2px; }
  .typo-props-sample { font-family: var(--font-family-base); color: var(--color-text-body); }

  /* ─── 컴포넌트 Anatomy 프리뷰 ─── */
  .component-preview { margin: var(--space-16) 0 var(--space-24); border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden; }
  .component-preview-stage { padding: var(--space-24) var(--space-32); background: var(--color-surface-subtle); display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: var(--space-16); min-height: 80px; }
  .anatomy-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-generic-md); width: 100%; }
  .anatomy-row { display: flex; align-items: center; justify-content: center; gap: var(--space-gap-sm); border-radius: 6px; margin: 0 calc(-1 * var(--space-8)); padding: var(--space-4) var(--space-8); cursor: pointer; transition: background 0.12s; }
  .anatomy-row:hover { background: rgba(0,0,0,0.04); }
  .anatomy-row--active { background: var(--color-surface-brand-subtle, rgba(99,102,241,0.08)); }
  .btn-group { display: flex; align-items: center; gap: var(--space-gap-xs); }
  .anatomy-row::after { content: ''; width: 72px; flex-shrink: 0; }
  .diff-add { background: rgba(34,197,94,0.25); border-radius: 2px; outline: 1px solid rgba(34,197,94,0.4); padding: 0 1px; }
  .anatomy-label { font-family: var(--font-family-base); font-size: var(--font-size-label); color: var(--color-text-subtle); width: 72px; flex-shrink: 0; text-align: right; }
  .anatomy-divider { grid-column: 1 / -1; border: none; border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle); margin: 0; }
  .component-preview-code { border-top: 1px solid var(--color-border-default); background: var(--color-gray-900); }
  .component-code-list { list-style: none; margin: 0; padding: 0; }
  .component-code-item { display: flex; align-items: flex-start; gap: var(--space-gap-sm); padding: var(--space-generic-sm); border-bottom: var(--stroke-sm) var(--stroke-solid) rgba(255,255,255,0.06); }
  .component-code-item:last-child { border-bottom: none; }
  .component-code-labels { display: flex; flex-direction: column; gap: var(--space-gap-xs); flex-shrink: 0; }
  .component-code-tag { font-family: var(--font-family-mono); font-size: var(--font-size-11); line-height: 1; padding: var(--space-2) var(--space-6); border-radius: var(--radius-xs); background: rgba(255,255,255,0.08); color: var(--color-gray-300); white-space: nowrap; }
  .component-code-snippet { flex: 1; font-family: var(--font-family-mono); font-size: var(--font-size-sm); line-height: var(--line-height-relaxed); color: var(--color-gray-100); white-space: pre-wrap; word-break: break-all; min-width: 0; }
  .component-code-copy { flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: var(--height-28); height: var(--height-28); border-radius: var(--radius-xs); background: transparent; border: var(--stroke-sm) var(--stroke-solid) rgba(255,255,255,0.12); color: var(--color-gray-400); cursor: pointer; transition: background var(--duration-fast) var(--easing-base), color var(--duration-fast) var(--easing-base); }
  .component-code-copy:hover { background: rgba(255,255,255,0.10); color: var(--color-gray-100); }
  .component-code-copy.copied { background: var(--color-action-brand-selected); color: #4ec9b0; border-color: var(--color-action-brand-overlay); }
  .hl-comment { color: #6a9955; font-style: italic; }
  .hl-tag     { color: #4ec9b0; }
  .hl-attr    { color: #9cdcfe; }
  .hl-string  { color: #ce9178; }
  .hl-bracket { color: #808080; }

  /* ── Icon Gallery ── */
  .icon-gallery { display: flex; flex-direction: column; gap: var(--space-16); padding: var(--space-24) 0; }
  .icon-gallery-toolbar { display: flex; align-items: center; gap: var(--space-8); }
  .icon-gallery-search {
    flex: 1;
    height: var(--height-compact);
    padding: 0 var(--space-12);
    border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
    border-radius: var(--radius-sm);
    background: var(--color-surface-base);
    color: var(--color-text-body);
    font-size: var(--font-size-sm);
    outline: none;
  }
  .icon-gallery-search:focus { border-color: var(--color-border-focus); box-shadow: 0 0 0 var(--stroke-sm) var(--color-border-focus); }
  .icon-gallery-count { font-size: var(--font-size-meta); color: var(--color-text-subtle); white-space: nowrap; }
  /* ── 좌우 분할 레이아웃 ── */
  .icon-gallery-body { display: flex; gap: var(--space-24); align-items: flex-start; }
  .icon-gallery-nav {
    flex-shrink: 0; width: 128px;
    position: sticky; top: calc(var(--layout-topbar-height) + var(--space-24));
    max-height: calc(100vh - var(--layout-topbar-height) - var(--space-48)); overflow-y: auto;
    display: flex; flex-direction: column; gap: var(--space-16);
  }
  /* 필터 섹션 */
  .icon-gallery-nav-section { display: flex; flex-direction: column; gap: var(--space-4); }
  .icon-gallery-nav-label {
    font-size: var(--font-size-meta); color: var(--color-text-disabled);
    font-weight: var(--font-weight-medium); letter-spacing: 0.04em;
    padding: 0 var(--space-8); text-transform: uppercase;
  }
  .icon-gallery-filter-group { display: flex; flex-direction: column; gap: var(--space-2); }
  .icon-gallery-filter-btn {
    display: block; width: 100%;
    height: var(--height-compact);
    padding: 0 var(--space-8);
    border: none; border-radius: var(--radius-xs);
    background: none;
    color: var(--color-text-subtle);
    font-size: var(--font-size-sm);
    cursor: pointer; text-align: left;
    transition: background var(--duration-fast) var(--easing-base), color var(--duration-fast) var(--easing-base);
    white-space: nowrap;
  }
  .icon-gallery-filter-btn:hover { background: var(--color-surface-subtle); color: var(--color-text-body); }
  .icon-gallery-filter-btn.active { background: var(--color-action-brand-selected); color: var(--color-text-brand); font-weight: var(--font-weight-medium); }
  /* 구분선 */
  .icon-gallery-nav-divider { height: 1px; background: var(--color-border-subtle); margin: 0 var(--space-8); }
  /* 카테고리 네비 */
  .icon-gallery-nav-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: var(--space-4) var(--space-8);
    border-radius: var(--radius-xs);
    font-size: var(--font-size-sm); color: var(--color-text-subtle);
    cursor: pointer; background: none; border: none; text-align: left; width: 100%;
    transition: background var(--duration-fast) var(--easing-base), color var(--duration-fast) var(--easing-base);
  }
  .icon-gallery-nav-item:hover { background: var(--color-surface-subtle); color: var(--color-text-body); }
  .icon-gallery-nav-item.active { background: var(--color-action-brand-selected); color: var(--color-text-brand); font-weight: var(--font-weight-medium); }
  .icon-gallery-nav-count { font-size: var(--font-size-meta); color: var(--color-text-disabled); }
  .icon-gallery-nav-item.active .icon-gallery-nav-count { color: var(--color-text-brand); }
  .icon-gallery-content { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: var(--space-24); }
  .icon-gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: var(--space-8);
  }
  .icon-card {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--space-8);
    padding: var(--space-16) var(--space-8);
    border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
    border-radius: var(--radius-sm);
    background: var(--color-surface-base);
    cursor: pointer;
    transition: border-color var(--duration-fast) var(--easing-base), background var(--duration-fast) var(--easing-base);
    min-height: 80px;
    position: relative;
  }
  .icon-card:hover { border-color: var(--color-border-brand); background: var(--color-action-brand-selected); }
  .icon-card.copied { border-color: var(--color-border-brand); }
  .icon-card--bg-dark { background: var(--color-gray-800); border-color: var(--color-gray-700); }
  .icon-card--bg-dark:hover { background: var(--color-gray-700); border-color: var(--color-border-brand); }
  .icon-card--bg-dark .icon-card-name { color: var(--color-gray-400); }
  .icon-card--bg-disabled { background: var(--color-surface-disabled); border-color: var(--color-border-disabled); }
  .icon-card--bg-disabled:hover { background: var(--color-surface-disabled); border-color: var(--color-border-disabled); cursor: default; }
  .icon-card--bg-disabled .icon-card-name { color: var(--color-text-disabled); }
  .icon-card-icon { display: flex; align-items: center; justify-content: center; color: var(--color-text-body); }
  .icon-card-icon.icon--brand    { color: var(--color-text-brand-vivid); }
  .icon-card-icon.icon--dark     { color: var(--color-text-body); }
  .icon-card-icon.icon--white    { color: var(--color-text-inverse); }
  .icon-card-icon.icon--disabled { color: var(--color-text-disabled); }
  .icon-card-name { font-size: var(--font-size-meta); color: var(--color-text-subtle); text-align: center; word-break: break-all; line-height: var(--line-height-tight); }
  .icon-card-copied-badge { position: absolute; top: 4px; right: 4px; font-size: 10px; background: var(--color-text-brand); color: var(--color-text-inverse); padding: 1px 5px; border-radius: var(--radius-xs); opacity: 0; transition: opacity var(--duration-fast) var(--easing-base); pointer-events: none; }
  .icon-card.copied .icon-card-copied-badge { opacity: 1; }
  .icon-gallery-empty { text-align: center; padding: var(--space-48) 0; color: var(--color-text-subtle); font-size: var(--font-size-sm); }
  .icon-gallery-group { display: flex; flex-direction: column; gap: var(--space-12); scroll-margin-top: calc(var(--layout-topbar-height) + var(--space-24)); }
  .icon-gallery-group-header { display: flex; align-items: center; gap: var(--space-8); }
  .icon-gallery-group-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--color-text-label); white-space: nowrap; }
  .icon-gallery-group-count { font-size: var(--font-size-meta); color: var(--color-text-subtle); }
  .icon-gallery-group-line { flex: 1; height: 1px; background: var(--color-border-subtle); }

</style>
</head>
<body>
__SPRITE_SVG__

<header class="topbar">
  <button class="btn btn--ghost btn--sm btn-sidebar-toggle" id="btn-sidebar-toggle" aria-label="메뉴">
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-sidebar-collapse"/></svg></span>
  </button>
  <a class="brand" href="#" id="brand-link">
    <span class="brand-mark">3</span>
    <span class="brand-text">김반장 3.0 Design System</span>
  </a>
  <span class="version-pill">v0.5.0</span>
  <div class="topbar-actions">
    <button class="btn btn--ghost btn--sm btn-toc-toggle" id="btn-toc-toggle" aria-label="목차">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-multi-sort"/></svg></span>
    </button>
    <button class="btn btn--ghost btn--sm text-button-sm" id="btn-copy-all" title="모든 파일을 합쳐서 마크다운 복사">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-copy"/></svg></span>
      전체 복사
    </button>
    <button class="btn btn--primary btn--sm text-button-sm" id="btn-zip" title="ZIP 다운로드">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-download"/></svg></span>
      ZIP
    </button>
  </div>
</header>
<div class="overlay-backdrop" id="overlay-backdrop"></div>

<div class="layout">
  <aside class="sidebar" id="sidebar"></aside>
  <main class="content">
    <article id="content"></article>
  </main>
  <aside class="toc" id="toc">
    <div class="toc-label">On this page</div>
    <ul id="toc-list"></ul>
  </aside>
</div>

<div class="token-tooltip" id="token-tooltip"></div>
<div class="toast" id="toast">복사됨</div>
<div class="kbd-hint" id="kbd-hint">
  <span><span class="kbd">←</span> <span class="kbd">→</span> 페이지 이동</span>
</div>

<script id="files-source" type="application/json">__FILES_JSON__</script>
<script src="https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script>

<script>
  (function() {
    var FILES = JSON.parse(document.getElementById('files-source').textContent);
    var TOKENS = __TOKENS_JSON__;
    var TOKENS_RAW = __TOKENS_RAW_JSON__;
    var TOKENS_DESC = __TOKENS_DESC_JSON__;
    var UTILITIES = __UTILITIES_JSON__;
    var ICON_IDS = __ICON_IDS_JSON__;
    var contentEl = document.getElementById('content');
    var sidebarEl = document.getElementById('sidebar');
    var tocListEl = document.getElementById('toc-list');

    marked.setOptions({ gfm: true, breaks: false });

    function parseFrontmatter(raw) {
      var m = raw.match(/^---\\n([\\s\\S]*?)\\n---\\n([\\s\\S]*)$/);
      if (!m) return { meta: {}, body: raw };
      var meta = {};
      m[1].split('\\n').forEach(function(line) {
        var idx = line.indexOf(':');
        if (idx > -1) {
          var key = line.slice(0, idx).trim();
          var val = line.slice(idx + 1).trim();
          if (key) meta[key] = val;
        }
      });
      return { meta: meta, body: m[2] };
    }

    function slugify(text) {
      return text.toLowerCase().trim()
        .replace(/[^\\w\\s\\u3131-\\uD79D-]/g, '')
        .replace(/\\s+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // ─── 사이드바 빌드 ───
    var groups = {};
    FILES.forEach(function(file) {
      if (!groups[file.group]) groups[file.group] = [];
      groups[file.group].push(file);
    });

    var groupLabels = {
      'overview': 'OVERVIEW',
      'workflow': 'WORKFLOW',
      'governance': 'GOVERNANCE',
      'tokens': 'TOKENS',
      'components': 'COMPONENTS',
      'interaction': 'INTERACTION',
      'adaptation': 'ADAPTATION',
      'product': 'PRODUCT',
      'accessibility': 'ACCESSIBILITY',
    };

    // components 하위 계층 (순서 고정)
    var componentSubgroups = [
      { key: 'atoms',     label: 'Atoms' },
      { key: 'molecules', label: 'Molecules' },
      { key: 'organisms', label: 'Organisms' },
      { key: 'patterns',  label: 'Patterns' },
    ];

    function buildNavItems(ul, items) {
      items.forEach(function(file) {
        var meta = parseFrontmatter(file.raw).meta;
        var isDeprecated = meta.status === 'deprecated';
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + file.slug;
        a.dataset.slug = file.slug;
        if (isDeprecated) a.classList.add('deprecated');
        var labelSpan = document.createElement('span');
        labelSpan.textContent = file.label;
        a.appendChild(labelSpan);
        if (isDeprecated) {
          var badge = document.createElement('span');
          badge.className = 'sidebar-deprecated-tag';
          badge.textContent = '사용 중단';
          a.appendChild(badge);
        } else if (meta.version) {
          var vSpan = document.createElement('span');
          vSpan.className = 'sidebar-version';
          vSpan.textContent = 'v' + meta.version;
          a.appendChild(vSpan);
        }
        li.appendChild(a);
        ul.appendChild(li);
      });
    }

    Object.keys(groupLabels).forEach(function(groupKey) {
      var items = groups[groupKey] || [];
      var subgroupItems = groupKey === 'components'
        ? componentSubgroups.reduce(function(acc, sg) { return acc.concat(groups[sg.key] || []); }, [])
        : [];
      if (!items.length && !subgroupItems.length) return;

      var totalItems = items.length + subgroupItems.length;
      var isCollapsible = totalItems >= 5;
      var section = document.createElement('div');
      section.className = 'sidebar-group' + (isCollapsible ? ' collapsible is-collapsed' : '');
      section.dataset.group = groupKey;

      var labelEl = document.createElement('div');
      labelEl.className = 'sidebar-label';
      labelEl.innerHTML = '<span>' + groupLabels[groupKey] + '</span>';
      if (isCollapsible) {
        var chevron = document.createElement('span');
        chevron.className = 'sidebar-chevron';
        chevron.setAttribute('aria-hidden', 'true');
        chevron.innerHTML = '<svg style="width:14px;height:14px"><use href="#icon-collapse"/></svg>';
        labelEl.appendChild(chevron);
        labelEl.addEventListener('click', function() {
          section.classList.toggle('is-collapsed');
          chevron.innerHTML = '<svg style="width:14px;height:14px"><use href="#icon-' + (section.classList.contains('is-collapsed') ? 'collapse' : 'chevron-down') + '"/></svg>';
        });
      }
      section.appendChild(labelEl);

      if (items.length) {
        var ul = document.createElement('ul');
        ul.className = 'sidebar-nav';
        buildNavItems(ul, items);
        section.appendChild(ul);
      }

      if (groupKey === 'components') {
        componentSubgroups.forEach(function(sg) {
          var sgItems = groups[sg.key];
          if (!sgItems || !sgItems.length) return;
          var sgCollapsible = sgItems.length >= 5;
          var subgroup = document.createElement('div');
          subgroup.className = 'sidebar-subgroup' + (sgCollapsible ? ' collapsible is-collapsed' : '');
          var sublabel = document.createElement('div');
          sublabel.className = 'sidebar-sublabel';
          sublabel.innerHTML = '<span>' + sg.label + '</span>';
          if (sgCollapsible) {
            var sgChevron = document.createElement('span');
            sgChevron.className = 'sidebar-chevron';
            sgChevron.setAttribute('aria-hidden', 'true');
            sgChevron.innerHTML = '<svg style="width:14px;height:14px"><use href="#icon-collapse"/></svg>';
            sublabel.appendChild(sgChevron);
            sublabel.addEventListener('click', function() {
              subgroup.classList.toggle('is-collapsed');
              sgChevron.innerHTML = '<svg style="width:14px;height:14px"><use href="#icon-' + (subgroup.classList.contains('is-collapsed') ? 'collapse' : 'chevron-down') + '"/></svg>';
            });
          }
          subgroup.appendChild(sublabel);
          var ul = document.createElement('ul');
          ul.className = 'sidebar-nav sidebar-nav--sub';
          buildNavItems(ul, sgItems);
          subgroup.appendChild(ul);
          section.appendChild(subgroup);
        });
      }

      sidebarEl.appendChild(section);
    });

    var sidebarLinks = sidebarEl.querySelectorAll('a[data-slug]');
    var currentIdx = 0;
    var tocObserver = null;

    function renderPage(slug) {
      var idx = FILES.findIndex(function(f) { return f.slug === slug; });
      if (idx === -1) idx = 0;
      var file = FILES[idx];
      var parsed = parseFrontmatter(file.raw);

      // 이전 페이지의 컴포넌트 CSS 제거 후 현재 페이지 CSS 주입
      var prevCSS = document.getElementById('doc-component-css');
      if (prevCSS) prevCSS.remove();

      // 현재 파일 + depends-on 파일의 CSS를 모두 합쳐 주입
      var dependsRaw = parsed.meta['depends-on'] || '';
      var dependsList = dependsRaw.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
      var allCSS = '';
      dependsList.forEach(function(p) {
        var dep = FILES.find(function(f) { return f.path === p; });
        if (dep && dep.previewCSS) allCSS += dep.previewCSS + ' ';
      });
      if (file.previewCSS) allCSS += file.previewCSS;
      if (allCSS) {
        var docStyle = document.createElement('style');
        docStyle.id = 'doc-component-css';
        docStyle.textContent = allCSS;
        document.head.appendChild(docStyle);
      }

      sidebarLinks.forEach(function(link) {
        link.classList.toggle('active', link.dataset.slug === file.slug);
      });

      // active 항목이 있는 그룹·서브그룹은 자동으로 펼침
      sidebarEl.querySelectorAll('.sidebar-group.collapsible, .sidebar-subgroup.collapsible').forEach(function(grp) {
        var hasActive = grp.querySelector('a.active');
        if (hasActive) {
          grp.classList.remove('is-collapsed');
          var ch = grp.firstElementChild && grp.firstElementChild.querySelector('.sidebar-chevron');
          if (ch) ch.innerHTML = '<svg style="width:14px;height:14px"><use href="#icon-chevron-down"/></svg>';
        }
      });

      var inner = document.createElement('div');
      inner.className = 'content-inner';



      // breadcrumb: path + 복사 버튼
      var breadcrumb = document.createElement('div');
      breadcrumb.className = 'file-breadcrumb';
      breadcrumb.innerHTML = '<span>' + file.path + '</span>';
      var copyBtn = document.createElement('button');
      copyBtn.className = 'btn btn--ghost btn--sm text-button-sm';
      copyBtn.innerHTML = '<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-copy"/></svg></span> 마크다운 복사';
      copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(file.raw).then(function() {
          showToast(file.path + ' 복사됨');
        });
      });
      breadcrumb.appendChild(copyBtn);
      inner.appendChild(breadcrumb);

      // 본문
      var bodyEl = document.createElement('div');
      bodyEl.className = 'md';
      bodyEl.innerHTML = marked.parse(parsed.body);

      // h1 아래에 버전·참조·사용 rows 주입
      var h1 = bodyEl.querySelector('h1');
      if (h1) {
        var inlineMeta = document.createElement('div');
        inlineMeta.className = 'file-meta-inline';
        var rows = '';
        // version
        var ver = 'v' + (parsed.meta.version || '?');
        if (parsed.meta.status) ver += ' · ' + parsed.meta.status;
        rows += '<span class="fmi-row"><span class="fmi-label">버전</span><span>' + ver + '</span></span>';
        // ↑ 참조
        if (dependsList.length > 0) {
          rows += '<span class="fmi-row"><span class="fmi-label">참조</span><span class="fmi-links">' +
            dependsList.map(function(p) {
              var target = FILES.find(function(f) { return f.path === p; });
              if (target) return '<a href="#' + target.slug + '" class="md-file-link"><code>' + p + '</code></a>';
              return '<code style="font-size:10px;padding:var(--space-2) var(--space-6);">' + p + '</code>';
            }).join('') + '</span></span>';
        }
        // ↓ 사용
        if (file.usedBy && file.usedBy.length > 0) {
          rows += '<span class="fmi-row"><span class="fmi-label">사용</span><span class="fmi-links">' +
            file.usedBy.map(function(u) {
              return '<a href="#' + u.slug + '" class="md-file-link"><code>' + u.label + '</code></a>';
            }).join('') + '</span></span>';
        }
        inlineMeta.innerHTML = rows;
        h1.parentNode.insertBefore(inlineMeta, h1.nextSibling);
      }

      var headings = bodyEl.querySelectorAll('h2, h3');
      var tocItems = [];
      var seen = {};
      headings.forEach(function(h, i) {
        var id = slugify(h.textContent) || ('h-' + i);
        if (seen[id]) { id = id + '-' + (++seen[id]); } else { seen[id] = 1; }
        h.id = id;
        tocItems.push({ level: h.tagName === 'H2' ? 2 : 3, id: id, text: h.textContent });
      });

      // ─── 팔레트 스트립 렌더링 ───
      var paletteLabels = {
        blue: 'Blue', cyan: 'Cyan',
        gray: 'Gray', green: 'Green', orange: 'Orange', red: 'Red'
      };
      function chipLuminance(hex) {
        if (!hex || hex[0] !== '#') return 0.5;
        var h = hex.replace('#', '');
        if (h.length === 8) h = h.slice(0, 6);
        if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
        var r=parseInt(h.slice(0,2),16)/255, g=parseInt(h.slice(2,4),16)/255, b=parseInt(h.slice(4,6),16)/255;
        var f=function(c){return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);};
        return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);
      }
      bodyEl.querySelectorAll('.palette-placeholder').forEach(function(el) {
        var name = el.getAttribute('data-palette');
        var prefix = '--color-' + name + '-';
        var chips = [];
        Object.keys(TOKENS).forEach(function(key) {
          if (key.slice(0, prefix.length) === prefix) {
            var scale = key.slice(prefix.length);
            if (/^\\d+$/.test(scale)) chips.push({ scale: parseInt(scale), key: key, val: TOKENS[key] });
          }
        });
        chips.sort(function(a,b){ return a.scale - b.scale; });
        if (!chips.length) return;

        var strip = document.createElement('div');
        strip.className = 'palette-strip';

        var row = document.createElement('div');
        row.className = 'palette-strip-chips';
        chips.forEach(function(chip) {
          var div = document.createElement('div');
          div.className = 'palette-chip' + (chip.scale === 500 ? ' palette-chip--base' : '');
          div.style.background = chip.val;
          var lum = chipLuminance(chip.val);
          div.style.color = lum > 0.35 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)';
          div.setAttribute('data-token-value', chip.key);
          div.setAttribute('data-token-color', chip.val);
          var sc = document.createElement('span');
          sc.className = 'chip-scale';
          sc.textContent = chip.scale;
          var hx = document.createElement('span');
          hx.className = 'chip-hex';
          hx.textContent = chip.val;
          div.appendChild(sc);
          div.appendChild(hx);
          row.appendChild(div);
        });
        strip.appendChild(row);
        el.parentNode.replaceChild(strip, el);
      });

      bodyEl.querySelectorAll('blockquote').forEach(function(bq) {
        var text = bq.textContent.trim();
        if (text.indexOf('💡') !== -1) bq.classList.add('tip');
        else if (text.charAt(0) === '✅') bq.classList.add('do');
        else if (text.charAt(0) === '❌') bq.classList.add('dont');
      });

      bodyEl.querySelectorAll('blockquote.do, blockquote.dont').forEach(function(bq) {
        var firstP = bq.firstElementChild;
        if (!firstP || firstP.tagName !== 'P') return;

        var firstCode = null;
        for (var i = 0; i < firstP.childNodes.length; i++) {
          var n = firstP.childNodes[i];
          if (n.nodeType === 1 && n.tagName === 'CODE') { firstCode = n; break; }
        }

        var title = document.createElement('div');
        title.className = 'card-title';
        var body = document.createElement('div');
        body.className = 'card-body';

        if (firstCode) {
          while (firstP.firstChild && firstP.firstChild !== firstCode) {
            title.appendChild(firstP.firstChild);
          }
          while (firstP.firstChild) {
            body.appendChild(firstP.firstChild);
          }
        } else {
          while (firstP.firstChild) {
            title.appendChild(firstP.firstChild);
          }
        }

        bq.replaceChild(title, firstP);
        if (body.childNodes.length > 0) {
          title.parentNode.insertBefore(body, title.nextSibling);
          var sibling = body.nextElementSibling;
          while (sibling && sibling.tagName === 'P') {
            var nextSib = sibling.nextElementSibling;
            body.appendChild(sibling);
            sibling = nextSib;
          }
        }
      });

      bodyEl.querySelectorAll('blockquote.dont + blockquote.dont, blockquote.do + blockquote.do').forEach(function(bq) {
        var prev = bq.previousElementSibling;
        var sep = document.createElement('div');
        sep.className = 'card-sep';
        prev.appendChild(sep);
        while (bq.firstChild) { prev.appendChild(bq.firstChild); }
        bq.parentNode.removeChild(bq);
      });

      bodyEl.querySelectorAll('blockquote.do').forEach(function(doBq) {
        var next = doBq.nextElementSibling;
        if (next && next.tagName === 'BLOCKQUOTE' && next.classList.contains('dont')) {
          var wrap = document.createElement('div');
          wrap.className = 'do-dont-pair';
          doBq.parentNode.insertBefore(wrap, doBq);
          wrap.appendChild(doBq);
          wrap.appendChild(next);
        }
      });

      // ─── 스페이스·하이트 스케일 렌더 ───
      bodyEl.querySelectorAll('.scale-placeholder').forEach(function(el) {
        var type = el.getAttribute('data-scale');

        // ─── 폰트 사이즈 스케일 ───
        if (type === 'font-size') {
          var prefix = '--font-size-';
          var entries = [];
          Object.keys(TOKENS_RAW).forEach(function(key) {
            if (key.slice(0, prefix.length) !== prefix) return;
            var suffix = key.slice(prefix.length);
            if (!/^\d+$/.test(suffix)) return;
            var px = parseInt(TOKENS_RAW[key]);
            if (!isNaN(px)) entries.push({ key: key, px: px });
          });
          entries.sort(function(a, b) { return b.px - a.px; });
          var strip = document.createElement('div');
          strip.className = 'font-size-strip';
          entries.forEach(function(e) {
            var item = document.createElement('div');
            item.className = 'font-size-item';
            item.setAttribute('data-token-value', e.key);
            var val = document.createElement('span');
            val.className = 'font-size-val';
            val.textContent = e.px + 'px';
            var sample = document.createElement('span');
            sample.className = 'font-size-sample';
            sample.style.fontSize = e.px + 'px';
            sample.textContent = '디자인 시스템 Aa 123';
            item.appendChild(val);
            item.appendChild(sample);
            strip.appendChild(item);
          });
          el.replaceWith(strip);
          return;
        }

        // ─── 타이포 props (font-weight·line-height·letter-spacing) ───
        if (type === 'typography-props') {
          var grid = document.createElement('div');
          grid.className = 'typo-props-grid';
          var colDefs = [
            {
              label: 'Font Weight',
              items: [
                { key: '--font-weight-regular',  display: '400', fw: '400' },
                { key: '--font-weight-medium',   display: '500', fw: '500' },
                { key: '--font-weight-semibold', display: '600', fw: '600' },
                { key: '--font-weight-bold',     display: '700', fw: '700' }
              ],
              buildSample: function(item) {
                var s = document.createElement('span');
                s.className = 'typo-props-sample';
                s.textContent = '가나다 Abc 123';
                s.style.fontWeight = item.fw;
                s.style.fontSize = '15px';
                return s;
              }
            },
            {
              label: 'Line Height',
              items: [
                { key: '--line-height-none',    display: '1',     lh: '1' },
                { key: '--line-height-tight',   display: '1.25',  lh: '1.25' },
                { key: '--line-height-base',    display: '1.5',   lh: '1.5' },
                { key: '--line-height-relaxed', display: '1.625', lh: '1.625' }
              ],
              buildSample: function(item) {
                var s = document.createElement('span');
                s.className = 'typo-props-sample';
                s.style.whiteSpace = 'pre-line';
                s.textContent = '가나다 라마바\\n사아자 카타파';
                s.style.lineHeight = item.lh;
                s.style.fontSize = '13px';
                s.style.display = 'inline-block';
                return s;
              }
            },
            {
              label: 'Letter Spacing',
              items: [
                { key: '--letter-spacing-tight',  display: '-0.02em', ls: '-0.02em' },
                { key: '--letter-spacing-normal', display: '0em',     ls: '0em' },
                { key: '--letter-spacing-wide',   display: '0.05em',  ls: '0.05em' }
              ],
              buildSample: function(item) {
                var s = document.createElement('span');
                s.className = 'typo-props-sample';
                s.textContent = '가나다 Abc 123';
                s.style.letterSpacing = item.ls;
                s.style.fontSize = '15px';
                return s;
              }
            }
          ];
          colDefs.forEach(function(colDef) {
            var col = document.createElement('div');
            col.className = 'typo-props-col';
            var hdr = document.createElement('div');
            hdr.className = 'typo-props-header';
            hdr.textContent = colDef.label;
            col.appendChild(hdr);
            colDef.items.forEach(function(item) {
              var row = document.createElement('div');
              row.className = 'typo-props-item';
              row.setAttribute('data-token-value', item.key);
              var valEl = document.createElement('span');
              valEl.className = 'typo-props-val';
              valEl.textContent = item.display;
              var sampleEl = colDef.buildSample(item);
              row.appendChild(valEl);
              row.appendChild(sampleEl);
              col.appendChild(row);
            });
            grid.appendChild(col);
          });
          el.replaceWith(grid);
          return;
        }

        // ─── 라디우스 스케일 ───
        if (type === 'radius') {
          var rentries = [];
          Object.keys(TOKENS_RAW).forEach(function(key) {
            if (key.slice(0, 9) !== '--radius-') return;
            var suffix = key.slice(9);
            if (!/^\d+$/.test(suffix)) return;
            var px = parseInt(TOKENS_RAW[key]);
            if (!isNaN(px)) rentries.push({ key: key, px: px, note: TOKENS_DESC[key] || '' });
          });
          rentries.sort(function(a, b) { return a.px - b.px; });
          var rstrip = document.createElement('div');
          rstrip.className = 'radius-strip';
          rentries.forEach(function(e) {
            var col = document.createElement('div');
            col.className = 'radius-col' + (e.px === 8 ? ' radius-col--base' : '');
            col.setAttribute('data-token-value', e.key);
            var preview = document.createElement('div');
            preview.className = 'radius-preview';
            preview.style.borderRadius = e.px + 'px';
            if (e.px < 1000) {
              var d = e.px * 2;
              [
                { top: '0', left: '0' },
                { top: '0', right: '0' },
                { bottom: '0', left: '0' },
                { bottom: '0', right: '0' }
              ].forEach(function(pos) {
                var arc = document.createElement('div');
                arc.className = 'radius-arc';
                arc.style.width = d + 'px';
                arc.style.height = d + 'px';
                Object.keys(pos).forEach(function(k) { arc.style[k] = pos[k]; });
                preview.appendChild(arc);
              });
            }
            if (e.px === 8) {
              var badge = document.createElement('span');
              badge.className = 'radius-base-badge';
              badge.textContent = 'base';
              preview.appendChild(badge);
            }
            var val = document.createElement('span');
            val.className = 'radius-val';
            val.textContent = e.px >= 1000 ? '50%' : e.px + 'px';
            col.appendChild(preview);
            col.appendChild(val);
            rstrip.appendChild(col);
          });
          el.replaceWith(rstrip);
          return;
        }

        // ─── Duration 스케일 ───
        if (type === 'duration') {
          var dorder = ['--duration-fast', '--duration-base', '--duration-slow'];
          var dwrap = document.createElement('div');
          dwrap.className = 'duration-wrap';
          dorder.forEach(function(key) {
            var raw = TOKENS_RAW[key];
            if (!raw) return;
            var ms = parseInt(raw);
            var row = document.createElement('div');
            row.className = 'duration-row';
            row.setAttribute('data-token-value', key);
            var valEl = document.createElement('span');
            valEl.className = 'duration-val';
            valEl.textContent = raw;
            var track = document.createElement('div');
            track.className = 'duration-track';
            var dot = document.createElement('div');
            dot.className = 'duration-dot';
            dot.style.setProperty('--_dot-dur', (ms * 2) + 'ms');
            track.appendChild(dot);
            row.appendChild(valEl);
            row.appendChild(track);
            dwrap.appendChild(row);
          });
          el.replaceWith(dwrap);
          return;
        }

        // ─── Stroke-width 스케일 ───
        if (type === 'stroke-width') {
          var sorder = ['--stroke-sm', '--stroke-md', '--stroke-lg'];
          var swrap = document.createElement('div');
          swrap.className = 'stroke-wrap';
          sorder.forEach(function(key) {
            var raw = TOKENS_RAW[key];
            if (!raw) return;
            var row = document.createElement('div');
            row.className = 'stroke-row';
            row.setAttribute('data-token-value', key);
            var valEl = document.createElement('span');
            valEl.className = 'stroke-val';
            valEl.textContent = raw;
            var line = document.createElement('div');
            line.className = 'stroke-line';
            line.style.borderTopWidth = raw;
            row.appendChild(valEl);
            row.appendChild(line);
            swrap.appendChild(row);
          });
          el.replaceWith(swrap);
          return;
        }

        // ─── Stroke-style 스케일 ───
        if (type === 'stroke-style') {
          var ssorder = [
            { key: '--stroke-solid',  val: TOKENS_RAW['--stroke-solid']  || 'solid'  },
            { key: '--stroke-dashed', val: TOKENS_RAW['--stroke-dashed'] || 'dashed' },
            { key: '--stroke-dotted', val: TOKENS_RAW['--stroke-dotted'] || 'dotted' }
          ];
          var sswrap = document.createElement('div');
          sswrap.className = 'stroke-wrap';
          ssorder.forEach(function(item) {
            var row = document.createElement('div');
            row.className = 'stroke-row';
            row.setAttribute('data-token-value', item.key);
            var valEl = document.createElement('span');
            valEl.className = 'stroke-val';
            valEl.textContent = item.val;
            var line = document.createElement('div');
            line.className = 'stroke-line';
            line.style.borderTopWidth = TOKENS_RAW['--stroke-md'] || '2px';
            line.style.borderTopStyle = item.val;
            row.appendChild(valEl);
            row.appendChild(line);
            sswrap.appendChild(row);
          });
          el.replaceWith(sswrap);
          return;
        }

        // ─── Stroke-pattern 스케일 (SVG dasharray) ───
        if (type === 'stroke-pattern') {
          var sporder = [
            { key: '--stroke-pattern-dot',  val: TOKENS_RAW['--stroke-pattern-dot']  || '0.3 10', sw: 1,  linecap: 'round' },
            { key: '--stroke-pattern-dash', val: TOKENS_RAW['--stroke-pattern-dash'] || '2 2',    sw: 5,  linecap: 'butt'  }
          ];
          var spwrap = document.createElement('div');
          spwrap.className = 'stroke-wrap';
          sporder.forEach(function(item) {
            var row = document.createElement('div');
            row.className = 'stroke-row';
            row.setAttribute('data-token-value', item.key);
            var valEl = document.createElement('span');
            valEl.className = 'stroke-val';
            valEl.textContent = item.val;
            var ns = 'http://www.w3.org/2000/svg';
            var svgH = Math.max(14, item.sw + 8);
            var svg = document.createElementNS(ns, 'svg');
            svg.setAttribute('width', '220');
            svg.setAttribute('height', String(svgH));
            svg.setAttribute('viewBox', '0 0 220 ' + svgH);
            svg.className = 'stroke-svg';
            var line = document.createElementNS(ns, 'line');
            line.setAttribute('x1', '4');
            line.setAttribute('y1', String(svgH / 2));
            line.setAttribute('x2', '216');
            line.setAttribute('y2', String(svgH / 2));
            line.setAttribute('stroke', 'currentColor');
            line.setAttribute('stroke-width', String(item.sw));
            line.setAttribute('stroke-dasharray', item.val);
            line.setAttribute('stroke-linecap', item.linecap);
            svg.appendChild(line);
            row.appendChild(valEl);
            row.appendChild(svg);
            spwrap.appendChild(row);
          });
          el.replaceWith(spwrap);
          return;
        }

        // ─── Easing 스케일 ───
        if (type === 'easing') {
          var eorder = [
            { key: '--easing-enter', val: TOKENS_RAW['--easing-enter'] || 'ease-out'   },
            { key: '--easing-exit',  val: TOKENS_RAW['--easing-exit']  || 'ease-in'    },
            { key: '--easing-move',  val: TOKENS_RAW['--easing-move']  || 'ease-in-out'},
            { key: '--easing-base',  val: TOKENS_RAW['--easing-base']  || 'ease'       }
          ];
          var ewrap = document.createElement('div');
          ewrap.className = 'easing-wrap';
          eorder.forEach(function(item) {
            var row = document.createElement('div');
            row.className = 'easing-row';
            row.setAttribute('data-token-value', item.key);
            var valEl = document.createElement('span');
            valEl.className = 'easing-val';
            valEl.textContent = item.val;
            var track = document.createElement('div');
            track.className = 'easing-track';
            var dot = document.createElement('div');
            dot.className = 'easing-dot';
            dot.style.setProperty('--_ease', item.val);
            track.appendChild(dot);
            row.appendChild(valEl);
            row.appendChild(track);
            ewrap.appendChild(row);
          });
          el.replaceWith(ewrap);
          return;
        }

        // ─── 아이콘 스케일 ───
        if (type === 'icon') {
          var iorder = ['--icon-12','--icon-16','--icon-20','--icon-24','--icon-30'];
          var iRadiusXs = TOKENS['--icon-radius-xs'] || '4px';
          var iRadiusSm = TOKENS['--icon-radius-sm'] || '8px';
          var iRadiusMap = { '--icon-12': iRadiusXs, '--icon-16': iRadiusXs, '--icon-20': iRadiusSm, '--icon-24': iRadiusSm, '--icon-30': iRadiusSm };
          var iSemanticMap = { '--icon-12': '--icon-badge', '--icon-16': '--icon-sm', '--icon-20': '--icon-md', '--icon-24': '--icon-lg', '--icon-30': '--icon-xl' };
          var ns = 'http://www.w3.org/2000/svg';
          // 데이터 수집
          var idata = [];
          iorder.forEach(function(key) {
            var raw = TOKENS_RAW[key]; if (!raw) return;
            var px = parseInt(raw); if (isNaN(px)) return;
            var radius = iRadiusMap[key] || iRadiusSm;
            idata.push({ key: key, px: px, radius: radius });
          });
          // 가이드용 60px 열 — 토큰이 아닌 시각 확인용
          idata.unshift({ key: null, px: 60, radius: iRadiusSm, isGuide: true });
          function makeRow(labelText, cellFn) {
            var row = document.createElement('div');
            row.className = 'icon-grid-row';
            var lbl = document.createElement('div');
            lbl.className = 'icon-row-label';
            lbl.textContent = labelText;
            row.appendChild(lbl);
            idata.forEach(function(d) { row.appendChild(cellFn(d)); });
            return row;
          }
          function makePair(d) {
            var cell = document.createElement('div');
            cell.className = 'icon-preview-cell';
            if (!d.isGuide) cell.setAttribute('data-token-value', d.key);
            var pair = document.createElement('div');
            pair.className = 'icon-pair';
            var bound = document.createElement('div');
            bound.className = 'icon-bound';
            bound.style.width = d.px + 'px'; bound.style.height = d.px + 'px';
            bound.style.borderRadius = d.radius;
            var svg = document.createElementNS(ns, 'svg');
            svg.setAttribute('width', String(d.px)); svg.setAttribute('height', String(d.px));
            svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('fill', 'currentColor');
            // fill 방식 예시: 링(원형 외곽선) + 십자선을 채운 사각형으로 표현
            // 2px 여백 기준 — 외곽 r=10(경계 2~22), 내곽 r=8 → 2유닛 두께
            var ring = document.createElementNS(ns, 'path');
            ring.setAttribute('fill-rule', 'evenodd');
            // 외곽(sweep=0 반시계), 내곽(sweep=1 시계) → evenodd로 도넛 컷아웃
            ring.setAttribute('d', 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2a8 8 0 1 1 0 16A8 8 0 0 1 12 4z');
            ring.setAttribute('fill', 'currentColor');
            // 십자선: 내곽 r=8 경계에서 2유닛 안쪽(6~18)까지 → 링과 분리
            var hBar = document.createElementNS(ns, 'rect');
            hBar.setAttribute('x','6'); hBar.setAttribute('y','11'); hBar.setAttribute('width','12'); hBar.setAttribute('height','2');
            var vBar = document.createElementNS(ns, 'rect');
            vBar.setAttribute('x','11'); vBar.setAttribute('y','6'); vBar.setAttribute('width','2'); vBar.setAttribute('height','12');
            svg.appendChild(ring); svg.appendChild(hBar); svg.appendChild(vBar);
            bound.appendChild(svg);
            // 4px 내부 여백 경계 — 가이드 열에만 표시
            if (d.isGuide) {
              var guideEl = document.createElement('div');
              guideEl.className = 'stroke-dash icon-guide-inset';
              guideEl.style.inset = Math.round(2 / 24 * d.px) + 'px';
              bound.appendChild(guideEl);
            }
            pair.appendChild(bound);
            cell.appendChild(pair);
            return cell;
          }
          function makeCell(text, extra) {
            return function(d) {
              var c = document.createElement('div');
              c.className = 'icon-cell' + (extra ? ' ' + extra : '');
              c.textContent = typeof text === 'function' ? text(d) : text;
              return c;
            };
          }
          var wrap = document.createElement('div');
          wrap.className = 'icon-wrap';
          wrap.appendChild(makeRow('', makePair));
          wrap.appendChild(makeRow('크기', makeCell(function(d){ return d.isGuide ? '가이드' : d.px + 'px'; })));
          wrap.appendChild(makeRow('radius', makeCell(function(d){ return 'r' + d.radius; })));
          el.replaceWith(wrap);
          return;
        }

      });

      // ─── 섀도우 스케일 ───
      bodyEl.querySelectorAll('.shadow-placeholder').forEach(function(el) {
        var order = ['--shadow-sm', '--shadow-md', '--shadow-lg', '--shadow-xl'];

        // color-mix 포함 shadow 값 파싱
        function parseShadowLayers(val) {
          var layers = [];
          var depth = 0, cur = '';
          for (var i = 0; i < val.length; i++) {
            var c = val[i];
            if (c === '(') depth++;
            else if (c === ')') depth--;
            if (c === ',' && depth === 0) { layers.push(cur.trim()); cur = ''; }
            else cur += c;
          }
          if (cur.trim()) layers.push(cur.trim());
          return layers.map(function(layer) {
            var cm = layer.match(/([\d.]+)%,?\s*transparent/);
            var alpha = cm ? cm[1] + '%' : '?';
            var geom = layer.replace(/color-mix\([^)]+\)/, '').trim().split(/\s+/);
            return { offsetY: geom[1] || '0', blur: geom[2] || '0', alpha: alpha };
          });
        }

        var wrap = document.createElement('div');
        wrap.className = 'shadow-wrap';

        // 파싱 결과 미리 수집
        var parsed = order.map(function(key) {
          return { key: key, layers: TOKENS_RAW[key] ? parseShadowLayers(TOKENS_RAW[key]) : [] };
        });

        function makeRow(labelText, rowItems) {
          var row = document.createElement('div');
          row.className = 'shadow-grid-row';
          var lbl = document.createElement('div');
          lbl.className = 'shadow-row-label';
          lbl.textContent = labelText;
          row.appendChild(lbl);
          rowItems.forEach(function(item) { row.appendChild(item); });
          return row;
        }

        // 행 1: 프리뷰
        var previews = parsed.map(function(p) {
          var preview = document.createElement('div');
          preview.className = 'shadow-preview';
          preview.setAttribute('data-token-value', p.key);
          preview.style.boxShadow = TOKENS[p.key] || TOKENS_RAW[p.key];
          return preview;
        });
        wrap.appendChild(makeRow('', previews));

        // 행 2: 컬럼 헤더 (Y / blur / alpha)
        var headers = parsed.map(function() {
          var g = document.createElement('div');
          g.className = 'shadow-cell-group';
          ['Y', 'blur', 'alpha'].forEach(function(h) {
            var hc = document.createElement('span');
            hc.className = 'shadow-cell-header';
            hc.textContent = h;
            g.appendChild(hc);
          });
          return g;
        });
        wrap.appendChild(makeRow('', headers));

        // 행 3: 주 그림자
        var mainCells = parsed.map(function(p) {
          var layer = p.layers[0];
          if (!layer) { var e = document.createElement('div'); return e; }
          var g = document.createElement('div');
          g.className = 'shadow-cell-group';
          [layer.offsetY, layer.blur, layer.alpha].forEach(function(v) {
            var c = document.createElement('span'); c.className = 'shadow-cell'; c.textContent = v; g.appendChild(c);
          });
          return g;
        });
        wrap.appendChild(makeRow('주 그림자', mainCells));

        // 행 4: 보조 그림자
        var subCells = parsed.map(function(p) {
          var layer = p.layers[1];
          var g = document.createElement('div');
          g.className = 'shadow-cell-group';
          if (!layer) {
            var e = document.createElement('span'); e.className = 'shadow-cell-empty'; e.textContent = '—';
            g.appendChild(e);
          } else {
            [layer.offsetY, layer.blur, layer.alpha].forEach(function(v) {
              var c = document.createElement('span'); c.className = 'shadow-cell'; c.textContent = v; g.appendChild(c);
            });
          }
          return g;
        });
        wrap.appendChild(makeRow('보조 그림자', subCells));

        el.replaceWith(wrap);
      });

      // ─── z-index 비례 스택 뷰 ───
      bodyEl.querySelectorAll('.zindex-placeholder').forEach(function(el) {
        var order = ['--z-dropdown','--z-sticky','--z-backdrop','--z-modal','--z-dialog','--z-toast','--z-tooltip'];
        // 낮은 z → 밝은 색, 높은 z → 진한 색
        var bgColors = ['#e8eaed','#d8dee6','#c6cedb','#b6c0d0','#a6b2c5','#96a4b8','#8a94a8'];
        var layerH  = 18;
        var layerW  = 160;
        var legendW = 44;
        var gap     = 10;
        var scale   = 0.9;

        var vals   = order.map(function(k) { return parseInt(TOKENS_RAW[k] || '0'); });
        var minVal = Math.min.apply(null, vals);
        var maxVal = Math.max.apply(null, vals);

        // 비례 배치 후 겹침 해소: 가까운 레이어끼리만 최소 간격 강제
        var topPxArr = vals.map(function(v) { return (maxVal - v) * scale; });
        var sortedIdx = vals.map(function(_,i){ return i; }).sort(function(a,b){ return topPxArr[a]-topPxArr[b]; });
        for (var si = 1; si < sortedIdx.length; si++) {
          var prev = sortedIdx[si-1], curr = sortedIdx[si];
          if (topPxArr[curr] < topPxArr[prev] + layerH + 2) topPxArr[curr] = topPxArr[prev] + layerH + 2;
        }

        var sceneH = Math.max.apply(null, topPxArr) + layerH + 4;
        var sceneW = legendW + gap + layerW;

        var wrap = document.createElement('div');
        wrap.className = 'zindex-iso-wrap';
        var scene = document.createElement('div');
        scene.className = 'zindex-iso-scene';
        scene.style.cssText = 'height:' + sceneH + 'px;width:' + sceneW + 'px;';

        order.forEach(function(key, i) {
          if (!TOKENS_RAW[key]) return;
          var val     = vals[i];
          var topPx   = topPxArr[i];
          var centerY = topPx + layerH / 2;

          // 레이어 (skewX: 수평 기울기로 플레이트 느낌)
          var layer = document.createElement('div');
          layer.className = 'zindex-iso-top';
          layer.setAttribute('data-token-value', key);
          layer.style.cssText = [
            'top:'          + topPx + 'px',
            'left:'         + (legendW + gap) + 'px',
            'width:'        + layerW + 'px',
            'height:'       + layerH + 'px',
            'background:'   + bgColors[i],
            'border-bottom: 3px solid rgba(0,0,0,0.15)'
          ].join(';');
          scene.appendChild(layer);

          // 값 레이블 (왼쪽)
          var valEl = document.createElement('div');
          valEl.className = 'zindex-iso-legend-val';
          valEl.textContent = val;
          valEl.style.cssText = 'top:' + (centerY - 7) + 'px;left:0;width:' + legendW + 'px;';
          scene.appendChild(valEl);

          // 점선 (값→레이어)
          var dash = document.createElement('div');
          dash.className = 'zindex-iso-legend-dash';
          dash.style.cssText = 'top:' + centerY + 'px;left:' + legendW + 'px;width:' + gap + 'px;';
          scene.appendChild(dash);

        });

        wrap.appendChild(scene);
        el.replaceWith(wrap);
      });

      bodyEl.querySelectorAll('.scale-placeholder').forEach(function(el) {
        var type = el.getAttribute('data-scale');

        if (type === 'layout') {
          var PREVIEW_W = 480;
          var PREVIEW_H = 160;
          var lTokens = {
            sidebarWidth:          TOKENS_RAW['--layout-sidebar-width']          ? parseInt(TOKENS_RAW['--layout-sidebar-width'])          : 304,
            sidebarWidthCollapsed: TOKENS_RAW['--layout-sidebar-width-collapsed'] ? parseInt(TOKENS_RAW['--layout-sidebar-width-collapsed']) : 76,
            topbarHeight:          TOKENS_RAW['--layout-topbar-height']          ? parseInt(TOKENS_RAW['--layout-topbar-height'])          : 56
          };
          var sidebarScaled = Math.round(lTokens.sidebarWidth / 1440 * PREVIEW_W);
          var topbarScaled  = Math.round(lTokens.topbarHeight / 800 * PREVIEW_H);

          var wrap = document.createElement('div');
          wrap.style.cssText = 'margin:var(--space-12) 0 var(--space-24);display:flex;flex-direction:column;align-items:center;gap:12px;';

          var frame = document.createElement('div');
          frame.style.cssText = 'position:relative;width:' + PREVIEW_W + 'px;border:1.5px solid var(--color-border-default);background:var(--color-surface-base);border-radius:4px;overflow:hidden;';

          var topbar = document.createElement('div');
          topbar.className = 'layout-dim';
          topbar.setAttribute('data-token-value', '--layout-topbar-height');
          topbar.style.cssText = 'height:' + topbarScaled + 'px;background:var(--color-surface-subtle);border-bottom:1px solid var(--color-border-default);display:flex;align-items:center;padding:0 10px;gap:8px;';
          var topbarLabel = document.createElement('span');
          topbarLabel.style.cssText = 'font-size:10px;color:var(--color-text-subtle);font-family:var(--font-family-mono);';
          topbarLabel.textContent = '--layout-topbar-height: ' + lTokens.topbarHeight + 'px';
          topbar.appendChild(topbarLabel);

          var body = document.createElement('div');
          body.style.cssText = 'display:flex;height:' + (PREVIEW_H - topbarScaled) + 'px;';

          var sidebar = document.createElement('div');
          sidebar.className = 'layout-dim';
          sidebar.setAttribute('data-token-value', '--layout-sidebar-width');
          sidebar.style.cssText = 'width:' + sidebarScaled + 'px;flex-shrink:0;background:var(--color-surface-subtle);border-right:1px solid var(--color-border-default);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;';
          var swLabel = document.createElement('span');
          swLabel.style.cssText = 'font-size:9px;color:var(--color-text-subtle);font-family:var(--font-family-mono);writing-mode:vertical-rl;';
          swLabel.textContent = lTokens.sidebarWidth + 'px';
          sidebar.appendChild(swLabel);

          var content = document.createElement('div');
          content.style.cssText = 'flex:1;background:var(--color-surface-base);display:flex;align-items:center;justify-content:center;';
          var contentLabel = document.createElement('span');
          contentLabel.style.cssText = 'font-size:11px;color:var(--color-text-subtle);';
          contentLabel.textContent = 'content (full width)';
          content.appendChild(contentLabel);

          body.appendChild(sidebar);
          body.appendChild(content);
          frame.appendChild(topbar);
          frame.appendChild(body);

          wrap.appendChild(frame);
          el.replaceWith(wrap);
          return;
        }

        var prefix = (type === 'height' || type === 'height-semantic') ? '--height-' : '--space-';
        var entries = [];
        Object.keys(TOKENS_RAW).forEach(function(key) {
          if (key.slice(0, prefix.length) !== prefix) return;
          var suffix = key.slice(prefix.length);
          var isNumeric = /^\d+$/.test(suffix);
          if (type === 'height-semantic' ? isNumeric : !isNumeric) return;
          var px = parseInt(type === 'height-semantic' ? TOKENS[key] : TOKENS_RAW[key]);
          if (!isNaN(px)) entries.push({ key: key, px: px, note: TOKENS_DESC[key] || '' });
        });
        entries.sort(function(a, b) { return a.px - b.px; });

        if (type === 'height' || type === 'height-semantic') {
          // 면색 막대 + 아래 px값
          var hstrip = document.createElement('div');
          hstrip.className = 'height-strip';
          entries.forEach(function(e) {
            var col = document.createElement('div');
            col.className = 'height-col';
            col.setAttribute('data-token-value', e.key);

            var bar = document.createElement('div');
            bar.className = 'height-bar';
            bar.style.height = e.px + 'px';

            var arrow = document.createElement('div');
            arrow.className = 'height-arrow';
            var aTop = document.createElement('span');
            aTop.className = 'height-arrow-head';
            aTop.textContent = '▲';
            var aLine = document.createElement('div');
            aLine.className = 'height-arrow-line';
            var aBot = document.createElement('span');
            aBot.className = 'height-arrow-head';
            aBot.textContent = '▼';
            arrow.appendChild(aTop);
            arrow.appendChild(aLine);
            arrow.appendChild(aBot);
            bar.appendChild(arrow);

            var val = document.createElement('span');
            val.className = 'height-val';
            val.textContent = e.px + 'px';

            col.appendChild(bar);
            col.appendChild(val);
            hstrip.appendChild(col);
          });
          el.replaceWith(hstrip);
        } else {
          // [space | content | space] — 하나의 박스, 색으로만 구분
          var SCALE = 2.5;
          var strip = document.createElement('div');
          strip.className = 'scale-strip';
          entries.forEach(function(e) {
            var row = document.createElement('div');
            row.className = 'scale-row';

            var unit = document.createElement('div');
            unit.className = 'scale-unit';
            unit.setAttribute('data-token-value', e.key);

            var spaceW = Math.max(1, Math.round(e.px * SCALE)) + 'px';
            var spaceL = document.createElement('div');
            spaceL.className = 'scale-space';
            spaceL.style.width = spaceW;

            var content = document.createElement('div');
            content.className = 'scale-content';

            var spaceR = document.createElement('div');
            spaceR.className = 'scale-space';
            spaceR.style.width = spaceW;

            unit.appendChild(spaceL);
            unit.appendChild(content);
            unit.appendChild(spaceR);

            var val = document.createElement('span');
            val.className = 'scale-val';
            val.textContent = e.px + 'px';

            row.appendChild(val);
            row.appendChild(unit);
            if (e.note) {
              var note = document.createElement('span');
              note.className = 'scale-note';
              note.textContent = '[base]';
              row.appendChild(note);
            }
            strip.appendChild(row);
          });
          el.replaceWith(strip);
        }
      });

      // ─── 시맨틱 예시 다이어그램 렌더 ───
      // ─── 테이블 인라인 예시 (data-ex) ───
      var inlineRenderers = {
        'space-inset': function() {
          var box = document.createElement('div');
          box.style.cssText = 'display:inline-flex;vertical-align:middle;margin-right:8px;background:var(--color-surface-brand-tint);border:1px solid var(--color-border-brand);border-radius:var(--radius-sm);padding:var(--space-inset-sm);';
          var inner = document.createElement('div');
          inner.style.cssText = 'background:var(--color-surface-base);border-radius:2px;width:28px;height:10px;';
          box.appendChild(inner); return box;
        },
        'space-inset-squish': function() {
          var box = document.createElement('div');
          box.style.cssText = 'display:inline-flex;vertical-align:middle;margin-right:8px;background:var(--color-surface-brand-tint);border:1px solid var(--color-border-brand);border-radius:100px;padding:var(--space-inset-squish-sm);';
          var inner = document.createElement('div');
          inner.style.cssText = 'background:var(--color-surface-base);border-radius:2px;width:28px;height:10px;';
          box.appendChild(inner); return box;
        },
        'space-stack': function() {
          var wrap = document.createElement('div');
          wrap.style.cssText = 'display:inline-flex;vertical-align:middle;margin-right:8px;flex-direction:column;width:48px;';
          ['A','B'].forEach(function(_, i) {
            if (i > 0) {
              var sp = document.createElement('div');
              sp.style.cssText = 'background:var(--color-surface-brand-tint);border-left:2px solid var(--color-border-brand);border-right:2px solid var(--color-border-brand);height:var(--space-stack-sm);';
              wrap.appendChild(sp);
            }
            var b = document.createElement('div');
            b.style.cssText = 'background:var(--color-surface-base);border:1px solid var(--color-border-default);border-radius:var(--radius-sm);height:12px;';
            wrap.appendChild(b);
          });
          return wrap;
        },
        'space-gap': function() {
          var wrap = document.createElement('div');
          wrap.style.cssText = 'display:inline-flex;vertical-align:middle;margin-right:8px;align-items:stretch;height:24px;';
          [0,1,2].forEach(function(i) {
            if (i > 0) {
              var sp = document.createElement('div');
              sp.style.cssText = 'background:var(--color-surface-brand-tint);border-top:1px solid var(--color-border-brand);border-bottom:1px solid var(--color-border-brand);width:var(--space-gap-sm);';
              wrap.appendChild(sp);
            }
            var b = document.createElement('div');
            b.style.cssText = 'background:var(--color-surface-base);border:1px solid var(--color-border-default);border-radius:var(--radius-sm);width:20px;';
            wrap.appendChild(b);
          });
          return wrap;
        }
      };
      bodyEl.querySelectorAll('[data-ex]').forEach(function(el) {
        var type = el.getAttribute('data-ex');
        if (!inlineRenderers[type]) return;
        var rendered = inlineRenderers[type]();
        el.replaceWith(rendered);
        var td = rendered.parentElement;
        if (td && td.tagName === 'TD') {
          var wrap = document.createElement('div');
          wrap.style.cssText = 'display:flex;flex-direction:column;align-items:flex-start;gap:6px;';
          while (td.firstChild) wrap.appendChild(td.firstChild);
          td.appendChild(wrap);
          var row = td.parentElement;
          if (row) Array.from(row.cells).forEach(function(cell) {
            cell.style.verticalAlign = 'middle';
          });
        }
      });

      // ─── CSS 문법 하이라이터 ───
      function syntaxHighlightCSS(raw) {
        var s = raw.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        // 주석
        s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-css-comment">$1</span>');
        // 선택자 (중괄호 앞)
        s = s.replace(/^([^{}\\n\\r][^{}]*?)(\s*\{)/gm,
          '<span class="hl-css-selector">$1</span>$2');
        // 속성: 값
        s = s.replace(/^(\s*)([\w-]+)(\s*:\s*)([^;{}]+)(;?)/gm,
          '$1<span class="hl-css-prop">$2</span>$3<span class="hl-css-value">$4</span>$5');
        // var(--token) → hover 가능한 span으로 감싸기
        s = s.replace(/var\((--[\w-]+)\)/g, function(match, name) {
          var val = TOKENS[name] || '';
          if (!val) return match;
          return '<span class="hl-token-var" data-token-value="' + val + '" data-token-name="' + name + '">' + match + '</span>';
        });
        return s;
      }

      // ─── HTML 문법 하이라이터 ───
      function syntaxHighlightHTML(raw) {
        var s = raw
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');

        // HTML 주석
        s = s.replace(/(&lt;!--)([\s\S]*?)(--&gt;)/g,
          '<span class="hl-comment">$1$2$3</span>');

        // 닫는 태그
        s = s.replace(/(&lt;\/)([a-zA-Z][\w-]*)(\s*&gt;)/g,
          '<span class="hl-bracket">$1</span><span class="hl-tag">$2</span><span class="hl-bracket">$3</span>');

        // 여는 태그 / 자기닫힘 태그
        s = s.replace(/(&lt;)([a-zA-Z][\w-]*)((?:\s[\s\S]*?)?)(\s*\/&gt;|\s*&gt;)/g,
          function(_, lt, tag, body, gt) {
            var b = body
              .replace(/([\w-]+)(=)(&quot;[^]*?&quot;)/g,
                '<span class="hl-attr">$1</span>$2<span class="hl-string">$3</span>');
            return '<span class="hl-bracket">' + lt + '</span>'
                 + '<span class="hl-tag">' + tag + '</span>'
                 + b
                 + '<span class="hl-bracket">' + gt + '</span>';
          });

        return s;
      }

      // ─── 아이콘 갤러리 (:::icon-gallery) ───
      bodyEl.querySelectorAll('.icon-gallery-placeholder').forEach(function(el) {
        var sizeOptions = [
          { label: 'badge', val: 'badge', px: 12 },
          { label: 'sm',    val: 'sm',    px: 16 },
          { label: 'md',    val: 'md',    px: 20 },
          { label: 'lg',    val: 'lg',    px: 24 },
          { label: 'xl',    val: 'xl',    px: 30 }
        ];
        var colorOptions = [
          { label: 'brand',    val: 'brand',    bg: null        },
          { label: 'dark',     val: 'dark',     bg: null        },
          { label: 'light',    val: 'white',    bg: 'dark'      },
          { label: 'disabled', val: 'disabled', bg: 'disabled'  }
        ];

        var currentSize  = 'md';
        var currentColor = 'dark';
        var currentQuery = '';

        var gallery = document.createElement('div');
        gallery.className = 'icon-gallery';

        // ── toolbar ──
        var toolbar = document.createElement('div');
        toolbar.className = 'icon-gallery-toolbar';

        // search
        var search = document.createElement('input');
        search.type = 'text';
        search.className = 'icon-gallery-search';
        search.placeholder = '아이콘 이름 검색…';
        toolbar.appendChild(search);

        // count
        var countEl = document.createElement('span');
        countEl.className = 'icon-gallery-count';
        toolbar.appendChild(countEl);

        gallery.appendChild(toolbar);

        // ── body (nav + content) ──
        var body = document.createElement('div');
        body.className = 'icon-gallery-body';

        // left nav
        var nav = document.createElement('div');
        nav.className = 'icon-gallery-nav';

        // size filter section in nav
        var sizeBtns = {};
        (function() {
          var section = document.createElement('div');
          section.className = 'icon-gallery-nav-section';
          var label = document.createElement('span');
          label.className = 'icon-gallery-nav-label';
          label.textContent = 'SIZE';
          section.appendChild(label);
          var group = document.createElement('div');
          group.className = 'icon-gallery-filter-group';
          sizeOptions.forEach(function(opt) {
            var btn = document.createElement('button');
            btn.className = 'icon-gallery-filter-btn' + (opt.val === currentSize ? ' active' : '');
            btn.textContent = opt.label;
            btn.dataset.val = opt.val;
            btn.dataset.px  = opt.px;
            btn.addEventListener('click', function() {
              currentSize = opt.val;
              Object.values(sizeBtns).forEach(function(b) { b.classList.remove('active'); });
              btn.classList.add('active');
              render();
            });
            sizeBtns[opt.val] = btn;
            group.appendChild(btn);
          });
          section.appendChild(group);
          nav.appendChild(section);
        })();

        // color filter section in nav
        var colorBtns = {};
        (function() {
          var section = document.createElement('div');
          section.className = 'icon-gallery-nav-section';
          var label = document.createElement('span');
          label.className = 'icon-gallery-nav-label';
          label.textContent = 'COLOR';
          section.appendChild(label);
          var group = document.createElement('div');
          group.className = 'icon-gallery-filter-group';
          colorOptions.forEach(function(opt) {
            var btn = document.createElement('button');
            btn.className = 'icon-gallery-filter-btn' + (opt.val === currentColor ? ' active' : '');
            btn.textContent = opt.label;
            btn.dataset.val = opt.val;
            btn.addEventListener('click', function() {
              currentColor = opt.val;
              Object.values(colorBtns).forEach(function(b) { b.classList.remove('active'); });
              btn.classList.add('active');
              render();
            });
            colorBtns[opt.val] = btn;
            group.appendChild(btn);
          });
          section.appendChild(group);
          nav.appendChild(section);
        })();

        // divider before category list
        var navDivider = document.createElement('div');
        navDivider.className = 'icon-gallery-nav-divider';
        nav.appendChild(navDivider);

        body.appendChild(nav);

        // right content
        var content = document.createElement('div');
        content.className = 'icon-gallery-content';
        body.appendChild(content);

        gallery.appendChild(body);

        // flat grid (search mode)
        var grid = document.createElement('div');
        grid.className = 'icon-gallery-grid';
        content.appendChild(grid);

        // ── empty state ──
        var emptyEl = document.createElement('div');
        emptyEl.className = 'icon-gallery-empty';
        emptyEl.textContent = '검색 결과가 없습니다';
        emptyEl.style.display = 'none';
        content.appendChild(emptyEl);

        search.addEventListener('input', function() {
          currentQuery = search.value.trim().toLowerCase();
          render();
        });

        function copyText(text, card) {
          var fn = (navigator.clipboard && navigator.clipboard.writeText)
            ? navigator.clipboard.writeText.bind(navigator.clipboard)
            : function(t) {
                var ta = document.createElement('textarea');
                ta.value = t; ta.style.cssText = 'position:fixed;opacity:0';
                document.body.appendChild(ta); ta.select();
                try { document.execCommand('copy'); } catch(e) {}
                document.body.removeChild(ta);
                return Promise.resolve();
              };
          fn(text).then(function() {
            card.classList.add('copied');
            setTimeout(function() { card.classList.remove('copied'); }, 1200);
          });
        }

        var ICON_GROUPS = __ICON_GROUPS_JSON__;

        function makeCard(id, sizePx, cardBg) {
          var shortName = id.replace(/^icon-/, '');
          var card = document.createElement('div');
          card.className = 'icon-card' + (cardBg ? ' icon-card--bg-' + cardBg : '');
          card.title = id + ' — 클릭하여 이름 복사';

          var iconWrap = document.createElement('div');
          iconWrap.className = 'icon-card-icon icon icon--' + currentColor;
          iconWrap.style.width  = sizePx + 'px';
          iconWrap.style.height = sizePx + 'px';
          iconWrap.innerHTML = '<svg width="' + sizePx + '" height="' + sizePx + '" style="display:block"><use href="#' + id + '"/></svg>';

          var nameEl = document.createElement('div');
          nameEl.className = 'icon-card-name';
          nameEl.textContent = shortName;

          var badge = document.createElement('span');
          badge.className = 'icon-card-copied-badge';
          badge.textContent = '복사됨';

          card.appendChild(iconWrap);
          card.appendChild(nameEl);
          card.appendChild(badge);
          card.addEventListener('click', function() { copyText(id, card); });
          return card;
        }

        var observer = null;
        var navItems = {};

        function buildNav(groups) {
          nav.querySelectorAll('.icon-gallery-nav-item').forEach(function(el) { el.remove(); });
          navItems = {};
          groups.forEach(function(g) {
            var btn = document.createElement('button');
            btn.className = 'icon-gallery-nav-item';
            var labelSpan = document.createElement('span');
            labelSpan.textContent = g.label;
            var cntSpan = document.createElement('span');
            cntSpan.className = 'icon-gallery-nav-count';
            cntSpan.textContent = g.count;
            btn.appendChild(labelSpan);
            btn.appendChild(cntSpan);
            btn.addEventListener('click', function() {
              var target = content.querySelector('#icon-group-' + g.key);
              if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            nav.appendChild(btn);
            navItems[g.key] = btn;
          });
        }

        function setActiveNav(key) {
          Object.keys(navItems).forEach(function(k) {
            navItems[k].classList.toggle('active', k === key);
          });
        }

        function render() {
          var sizeOpt  = sizeOptions.find(function(o) { return o.val === currentSize; }) || sizeOptions[2];
          var sizePx   = sizeOpt.px;
          var colorOpt = colorOptions.find(function(o) { return o.val === currentColor; }) || colorOptions[0];
          var cardBg   = colorOpt.bg;
          var total    = ICON_IDS.length;

          // 이전 observer 해제
          if (observer) { observer.disconnect(); observer = null; }
          grid.innerHTML = '';
          // content에서 group 섹션만 제거 (grid/empty는 유지)
          content.querySelectorAll('.icon-gallery-group').forEach(function(el) { el.remove(); });

          if (currentQuery) {
            // ── 검색 중: 카테고리 항목 숨김 + flat 결과 ──
            nav.querySelectorAll('.icon-gallery-nav-item').forEach(function(el) { el.style.display = 'none'; });
            navDivider.style.display = 'none';
            var filtered = ICON_IDS.filter(function(id) {
              return id.toLowerCase().indexOf(currentQuery) !== -1;
            });
            filtered.forEach(function(id) { grid.appendChild(makeCard(id, sizePx, cardBg)); });
            countEl.textContent = filtered.length + ' / ' + total;
            emptyEl.style.display = filtered.length === 0 ? '' : 'none';
            grid.style.display    = filtered.length === 0 ? 'none' : '';
          } else {
            // ── 전체: 카테고리 네비 + 섹션 ──
            nav.querySelectorAll('.icon-gallery-nav-item').forEach(function(el) { el.style.display = ''; });
            navDivider.style.display = '';
            grid.style.display = 'none';
            emptyEl.style.display = 'none';

            var navGroups = [];
            var known = {};

            ICON_GROUPS.forEach(function(group) {
              var present = group.ids.filter(function(id) { return ICON_IDS.indexOf(id) !== -1; });
              if (present.length === 0) return;
              present.forEach(function(id) { known[id] = true; });

              var key = group.label.replace(/[^a-zA-Z0-9가-힣]/g, '-');
              navGroups.push({ label: group.label, key: key, count: present.length });

              var section = document.createElement('div');
              section.className = 'icon-gallery-group';
              section.id = 'icon-group-' + key;

              var header = document.createElement('div');
              header.className = 'icon-gallery-group-header';
              var title = document.createElement('span');
              title.className = 'icon-gallery-group-title';
              title.textContent = group.label;
              var cnt = document.createElement('span');
              cnt.className = 'icon-gallery-group-count';
              cnt.textContent = present.length;
              var line = document.createElement('div');
              line.className = 'icon-gallery-group-line';
              header.appendChild(title); header.appendChild(cnt); header.appendChild(line);

              var groupGrid = document.createElement('div');
              groupGrid.className = 'icon-gallery-grid';
              present.forEach(function(id) { groupGrid.appendChild(makeCard(id, sizePx, cardBg)); });

              section.appendChild(header);
              section.appendChild(groupGrid);
              content.appendChild(section);
            });

            // 기타 그룹
            var others = ICON_IDS.filter(function(id) { return !known[id]; });
            if (others.length > 0) {
              var key = '기타';
              navGroups.push({ label: '기타', key: key, count: others.length });
              var section = document.createElement('div');
              section.className = 'icon-gallery-group';
              section.id = 'icon-group-' + key;
              var header = document.createElement('div');
              header.className = 'icon-gallery-group-header';
              var title = document.createElement('span');
              title.className = 'icon-gallery-group-title';
              title.textContent = '기타';
              var cnt = document.createElement('span');
              cnt.className = 'icon-gallery-group-count';
              cnt.textContent = others.length;
              var line = document.createElement('div');
              line.className = 'icon-gallery-group-line';
              header.appendChild(title); header.appendChild(cnt); header.appendChild(line);
              var groupGrid = document.createElement('div');
              groupGrid.className = 'icon-gallery-grid';
              others.forEach(function(id) { groupGrid.appendChild(makeCard(id, sizePx, cardBg)); });
              section.appendChild(header); section.appendChild(groupGrid);
              content.appendChild(section);
            }

            buildNav(navGroups);
            if (navGroups.length > 0) setActiveNav(navGroups[0].key);

            // IntersectionObserver로 스크롤 위치 → 네비 활성화
            observer = new IntersectionObserver(function(entries) {
              entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                  setActiveNav(entry.target.id.replace('icon-group-', ''));
                }
              });
            }, { threshold: 0.2 });
            content.querySelectorAll('.icon-gallery-group').forEach(function(el) {
              observer.observe(el);
            });

            countEl.textContent = total + '개';
          }
        }

        render();
        el.replaceWith(gallery);
      });

      // ─── 컴포넌트 Anatomy 프리뷰 (:::preview) ───
      bodyEl.querySelectorAll('.component-preview-placeholder').forEach(function(el) {
        var encoded = el.getAttribute('data-content') || '';
        var raw;
        try { raw = decodeURIComponent(encoded); } catch(e) { return; }

        var wrap = document.createElement('div');
        wrap.className = 'component-preview';

        // inject <style> block into page
        var styleMatch = raw.match(/<style>([\s\S]*?)<\/style>/i);
        var scriptMatch = raw.match(/<script>([\s\S]*?)<\/script>/i);
        var htmlOnly = raw;
        if (styleMatch) {
          var styleEl = document.createElement('style');
          styleEl.textContent = styleMatch[1];
          wrap.appendChild(styleEl);
          htmlOnly = htmlOnly.replace(/<style>[\s\S]*?<\/style>/i, '').trim();
        }
        if (scriptMatch) {
          htmlOnly = htmlOnly.replace(/<script>[\s\S]*?<\/script>/i, '').trim();
        }

        // visual preview stage
        var stage = document.createElement('div');
        stage.className = 'component-preview-stage';
        var stageId = 'preview-stage-' + Math.random().toString(36).slice(2);
        stage.id = stageId;
        stage.innerHTML = htmlOnly;
        wrap.appendChild(stage);

        // execute <script> block with stage reference after DOM insertion
        if (scriptMatch) {
          var scriptEl = document.createElement('script');
          scriptEl.textContent = '(function(){var stage=document.getElementById("' + stageId + '");' + scriptMatch[1] + '})();';
          wrap.appendChild(scriptEl);
        }

        // HTML code block — [data-component] 요소마다 레이블 + 코드 + 복사 버튼 행
        var codeWrap = document.createElement('div');
        codeWrap.className = 'component-preview-code';
        var components = stage.querySelectorAll('[data-component]');

        function parseBtnLabels(el) {
          var cls = el.className || '';
          var tags = [];

          // ── ActionGroup ──
          if (cls.indexOf('action-group') !== -1) {
            var btns = Array.from(el.querySelectorAll('.action-btn'));
            tags.push(btns.length === 1 ? 'single' : 'multi');
            var firstCls = btns.length ? (btns[0].className || '') : '';
            if (firstCls.indexOf('action-btn--md') !== -1) tags.push('md');
            else tags.push('sm');
            var hasIconOnly  = btns.some(function(b) { return b.className.indexOf('action-btn--icon-only')  !== -1; });
            var hasIconLeft  = btns.some(function(b) { return b.className.indexOf('action-btn--icon-left')  !== -1; });
            var hasIconRight = btns.some(function(b) { return b.className.indexOf('action-btn--icon-right') !== -1; });
            if (hasIconOnly) tags.push('icon-only');
            else if (hasIconLeft) tags.push('icon-left');
            else if (hasIconRight) tags.push('icon-right');
            if (btns.some(function(b) { return b.className.indexOf('action-btn--disabled') !== -1; })) tags.push('disabled');
            return tags;
          }

          // ── Button ──
          var styleMap = { 'btn--primary':'primary', 'btn--secondary':'secondary', 'btn--danger':'danger', 'btn--ghost':'ghost' };
          Object.keys(styleMap).forEach(function(k) { if (cls.indexOf(k) !== -1) tags.push(styleMap[k]); });
          if (cls.indexOf('btn--solid') !== -1) tags.push('solid');
          else if (cls.indexOf('btn--ghost') === -1) tags.push('fill');
          if (cls.indexOf('btn--icon-only') !== -1) tags.push('icon-only');
          else if (cls.indexOf('btn--icon-left') !== -1) tags.push('icon-left');
          else if (cls.indexOf('btn--icon-right') !== -1) tags.push('icon-right');
          if (cls.indexOf('btn--disabled') !== -1) tags.push('disabled');
          else if (cls.indexOf('btn--loading') !== -1) tags.push('loading');
          if (cls.indexOf('btn--sm') !== -1) tags.push('sm');
          else if (cls.indexOf('btn--md') !== -1) tags.push('md');
          else if (cls.indexOf('btn--lg') !== -1) tags.push('lg');
          return tags;
        }

        function copyText(text, btn) {
          var fn = (navigator.clipboard && navigator.clipboard.writeText)
            ? navigator.clipboard.writeText.bind(navigator.clipboard)
            : function(t) {
                var ta = document.createElement('textarea');
                ta.value = t; ta.style.cssText = 'position:fixed;opacity:0';
                document.body.appendChild(ta); ta.select();
                try { document.execCommand('copy'); } catch(e) {}
                document.body.removeChild(ta);
                return Promise.resolve();
              };
          fn(text).then(function() {
            btn.classList.add('copied');
            setTimeout(function() { btn.classList.remove('copied'); }, 1000);
          });
        }

        if (components.length > 0) {
          var list = document.createElement('ul');
          list.className = 'component-code-list';
          Array.from(components).forEach(function(el) {
            var clone = el.cloneNode(true);
            clone.removeAttribute('data-component');
            var html = clone.outerHTML;

            var item = document.createElement('li');
            item.className = 'component-code-item';

            // 레이블 태그들
            var labelsEl = document.createElement('div');
            labelsEl.className = 'component-code-labels';
            parseBtnLabels(el).forEach(function(tag) {
              var span = document.createElement('span');
              span.className = 'component-code-tag';
              span.textContent = tag;
              labelsEl.appendChild(span);
            });

            // 코드 스니펫
            var snippet = document.createElement('div');
            snippet.className = 'component-code-snippet';
            var syntaxHtml = syntaxHighlightHTML(html);
            snippet.innerHTML = syntaxHtml;
            item._rawHtml = html;
            item._syntaxHtml = syntaxHtml;

            // 복사 버튼
            var copyBtn = document.createElement('button');
            copyBtn.className = 'component-code-copy';
            copyBtn.title = '복사';
            copyBtn.innerHTML = '<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-copy"/></svg></span>';
            copyBtn.addEventListener('click', function() { copyText(html, copyBtn); });

            item.appendChild(labelsEl);
            item.appendChild(snippet);
            item.appendChild(copyBtn);
            list.appendChild(item);
          });
          codeWrap.appendChild(list);

          // ── Anatomy row 선택 + diff 강조 ──────────────────
          (function() {
            var rows  = Array.from(wrap.querySelectorAll('.anatomy-row'));
            var items = Array.from(list.querySelectorAll('.component-code-item'));
            if (rows.length < 2 || items.length === 0) return;

            // row별 아이템 인덱스 매핑
            var rowMap = [];
            var idx = 0;
            rows.forEach(function(row) {
              var cnt = Math.max(row.querySelectorAll('[data-component]').length, 1);
              var end = Math.min(idx + cnt, items.length);
              rowMap.push([idx, end]);
              idx = end;
            });

            // base: 첫 번째 row 의 rawHtml 목록
            var baseRange = rowMap[0];
            var baseHtmls = items.slice(baseRange[0], baseRange[1]).map(function(it) { return it._rawHtml || ''; });

            function escRe(s) { return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); }

            function getClasses(html) {
              var set = new Set(), re = /class="([^"]*)"/g, m;
              while ((m = re.exec(html)) !== null)
                m[1].split(/\s+/).forEach(function(c) { if (c) set.add(c); });
              return set;
            }
            function getAttrs(html) {
              var set = new Set(), re = /\\b(aria-\\w+|disabled|readonly|hidden|tabindex)(?:="[^"]*")?/g, m;
              while ((m = re.exec(html)) !== null) set.add(m[1]);
              return set;
            }

            function applyDiff(syntaxHtml, baseRaw, newRaw) {
              var baseCls = getClasses(baseRaw), newCls = getClasses(newRaw);
              var baseAt  = getAttrs(baseRaw),  newAt  = getAttrs(newRaw);
              var addCls  = Array.from(newCls).filter(function(c) { return !baseCls.has(c); });
              var addAt   = Array.from(newAt).filter(function(a)  { return !baseAt.has(a);  });
              var result  = syntaxHtml;
              // 클래스 강조: hl-string 안에서 추가된 클래스명만 (공백 split으로 정확 매칭)
              if (addCls.length) {
                result = result.replace(/(<span class="hl-string">&quot;)(.*?)(&quot;<\/span>)/g,
                  function(_, open, body, close) {
                    var parts = body.split(/(\\s+)/);
                    var out = parts.map(function(tok) {
                      return addCls.indexOf(tok) !== -1
                        ? '<span class="diff-add">' + tok + '</span>'
                        : tok;
                    }).join('');
                    return open + out + close;
                  });
              }
              // 속성명 강조: hl-attr 스팬
              if (addAt.length) {
                addAt.forEach(function(attr) {
                  result = result.replace(
                    new RegExp('(<span class="hl-attr">)(' + escRe(attr) + ')(<\\/span>)', 'g'),
                    '$1<span class="diff-add">$2</span>$3'
                  );
                });
              }
              return result;
            }

            function selectRow(i) {
              rows.forEach(function(r, ri) { r.classList.toggle('anatomy-row--active', ri === i); });
              var range = rowMap[i] || [0, 1];
              items.forEach(function(item, ii) {
                var visible = ii >= range[0] && ii < range[1];
                item.style.display = visible ? '' : 'none';
                if (!visible) return;
                var snippet = item.querySelector('.component-code-snippet');
                if (!snippet) return;
                if (i === 0) {
                  snippet.innerHTML = item._syntaxHtml;
                } else {
                  var relIdx = ii - range[0];
                  var baseRaw = baseHtmls[relIdx] || baseHtmls[0] || '';
                  snippet.innerHTML = applyDiff(item._syntaxHtml, baseRaw, item._rawHtml || '');
                }
              });
            }

            selectRow(0);
            rows.forEach(function(row, i) {
              row.addEventListener('click', function() { selectRow(i); });
            });
          })();
          // ────────────────────────────────────────────────

        } else {
          var pre = document.createElement('pre');
          var code = document.createElement('code');
          code.innerHTML = syntaxHighlightHTML(htmlOnly);
          pre.appendChild(code);
          codeWrap.appendChild(pre);
        }
        wrap.appendChild(codeWrap);

        el.replaceWith(wrap);
      });

      // ─── 표 셀 안의 code 사이 ", " → 줄바꿈 ───
      bodyEl.querySelectorAll('td').forEach(function(td) {
        if (td.querySelectorAll('code').length < 2) return;
        Array.from(td.childNodes).forEach(function(node) {
          if (node.nodeType === 3 && /^,\\s*$/.test(node.textContent)) {
            td.replaceChild(document.createElement('br'), node);
          }
        });
      });

      // ─── 같은 그룹 첫 번째 열 rowspan 병합 ───
      bodyEl.querySelectorAll('table').forEach(function(table) {
        var rows = Array.from(table.querySelectorAll('tbody tr'));
        var i = 0;
        while (i < rows.length) {
          var firstCell = rows[i].querySelector('td:first-child');
          if (!firstCell) { i++; continue; }
          var groupText = firstCell.textContent.trim();
          var span = 1;
          while (i + span < rows.length) {
            var nextCell = rows[i + span].querySelector('td:first-child');
            if (nextCell && nextCell.textContent.trim() === groupText) {
              span++;
            } else {
              break;
            }
          }
          if (span > 1) {
            firstCell.rowSpan = span;
            firstCell.style.verticalAlign = 'middle';
            rows[i].classList.add('group-inner');
            for (var j = 1; j < span; j++) {
              var dup = rows[i + j].querySelector('td:first-child');
              if (dup) dup.parentNode.removeChild(dup);
              if (j < span - 1) rows[i + j].classList.add('group-inner');
            }
          }
          i += span;
        }
      });

      // ─── td 안의 비-토큰/비-유틸리티/비-.md파일 code에 code-label 클래스 ───
      bodyEl.querySelectorAll('td code').forEach(function(code) {
        var t = code.textContent.trim();
        if (t.slice(0, 2) === '--' || t.charAt(0) === '.') return;
        if (FILES.find(function(f) { return f.path === t; })) return;
        code.classList.add('code-label');
      });

      // ─── 토큰 스와치 (색상 미리보기) & 값 툴팁 ───
      bodyEl.querySelectorAll('code').forEach(function(code) {
        if (code.closest('pre')) return;
        var name = code.textContent.trim();
        if (name.slice(0, 2) === '--') {
          var val = TOKENS[name];
          if (!val) return;
          code.setAttribute('data-token-value', val);
          code.setAttribute('data-token-name', name);
          if (/^#[0-9a-fA-F]{3,8}$/.test(val) || /^rgba?\\(/.test(val) || /^hsla?\\(/.test(val) || /^color-mix\\(/.test(val)) {
            code.setAttribute('data-token-color', val);
            var sw = document.createElement('span');
            sw.className = 'token-swatch';
            sw.style.background = val;
            code.parentNode.insertBefore(sw, code);
          }
        } else if (name.charAt(0) === '.' && UTILITIES[name]) {
          code.setAttribute('data-token-value', name);
          code.setAttribute('data-token-name', name);
        }
      });

      // ─── 코드 블록 하이라이팅 + 접기/펼치기 ───
      bodyEl.querySelectorAll('pre').forEach(function(pre) {
        var code = pre.querySelector('code');
        if (!code) return;
        var lang = (code.className.match(/language-(\w+)/) || [])[1] || '';
        if (lang === 'css') {
          code.innerHTML = syntaxHighlightCSS(code.textContent);
        } else if (lang === 'html') {
          code.innerHTML = syntaxHighlightHTML(code.textContent);
        }

        // 접기/펼치기 래퍼
        var wrap = document.createElement('div');
        wrap.className = 'code-block-wrap';
        // pre를 .md div 안에 두기 위해 부모를 확인
        var mdWrap = document.createElement('div');
        mdWrap.className = 'md';
        mdWrap.style.cssText = 'margin:0;padding:0;';
        mdWrap.appendChild(pre.cloneNode(true));
        wrap.appendChild(mdWrap);

        var expandBtn = document.createElement('button');
        expandBtn.className = 'code-block-expand';
        var iconSpan = '<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-chevron-down"/></svg></span>';
        expandBtn.innerHTML = '더 보기 ' + iconSpan;
        expandBtn.addEventListener('click', function() {
          var expanded = wrap.classList.toggle('is-expanded');
          expandBtn.innerHTML = (expanded ? '접기' : '더 보기') + ' ' + iconSpan;
        });
        wrap.appendChild(expandBtn);
        pre.replaceWith(wrap);
      });

      // ─── inline code의 .md 파일명을 자동 링크화 ───
      bodyEl.querySelectorAll('code').forEach(function(code) {
        if (code.closest('pre')) return;  // 코드 블록 안은 스킵
        var text = code.textContent.trim();
        // 정확히 파일 경로와 매치되는 경우만 링크화 (오탐 방지)
        var matched = FILES.find(function(f) { return f.path === text; });
        if (matched) {
          var a = document.createElement('a');
          a.href = '#' + matched.slug;
          a.className = 'md-file-link';
          a.title = matched.label + ' 문서로 이동';
          code.parentNode.insertBefore(a, code);
          a.appendChild(code);
        }
      });

      inner.appendChild(bodyEl);

      // prev/next
      var pager = document.createElement('nav');
      pager.className = 'pager';
      var prev = idx > 0 ? FILES[idx - 1] : null;
      var next = idx < FILES.length - 1 ? FILES[idx + 1] : null;

      var prevLink = document.createElement('a');
      prevLink.className = 'pager-link prev';
      prevLink.href = prev ? '#' + prev.slug : '#';
      prevLink.dataset.disabled = !prev;
      prevLink.innerHTML =
        '<span class="pager-direction">← 이전</span>' +
        '<span class="pager-label">' + (prev ? prev.label : '—') + '</span>' +
        '<span class="pager-path">' + (prev ? prev.path : '') + '</span>';
      pager.appendChild(prevLink);

      var nextLink = document.createElement('a');
      nextLink.className = 'pager-link next';
      nextLink.href = next ? '#' + next.slug : '#';
      nextLink.dataset.disabled = !next;
      nextLink.innerHTML =
        '<span class="pager-direction">다음 →</span>' +
        '<span class="pager-label">' + (next ? next.label : '—') + '</span>' +
        '<span class="pager-path">' + (next ? next.path : '') + '</span>';
      pager.appendChild(nextLink);

      inner.appendChild(pager);

      contentEl.innerHTML = '';
      contentEl.appendChild(inner);
      window.scrollTo({ top: 0, behavior: 'instant' });

      // 실제 overflow 없는 코드 블록은 더보기 버튼 숨김
      requestAnimationFrame(function() {
        inner.querySelectorAll('.code-block-wrap').forEach(function(wrap) {
          var pre = wrap.querySelector('pre');
          if (!pre) return;
          if (pre.scrollHeight <= pre.clientHeight) {
            wrap.classList.add('code-block-short');
          }
        });
      });

      // TOC
      tocListEl.innerHTML = '';
      if (tocItems.length === 0) {
        tocListEl.innerHTML = '<li class="toc-empty">목차 없음</li>';
        if (tocObserver) tocObserver.disconnect();
      } else {
        tocItems.forEach(function(item) {
          var li = document.createElement('li');
          var a = document.createElement('a');
          a.href = '#' + item.id;
          a.textContent = item.text;
          a.title = item.text;
          a.dataset.target = item.id;
          if (item.level === 3) a.classList.add('h3-link');
          a.addEventListener('click', function(e) {
            e.preventDefault();
            var el = document.getElementById(item.id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
          li.appendChild(a);
          tocListEl.appendChild(li);
        });

        if (tocObserver) tocObserver.disconnect();
        var tocLinks = tocListEl.querySelectorAll('a');
        tocObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              tocLinks.forEach(function(link) {
                link.classList.toggle('active', link.dataset.target === entry.target.id);
              });
            }
          });
        }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });
        headings.forEach(function(h) { tocObserver.observe(h); });
      }

      currentIdx = idx;
      document.title = file.label + ' · 김반장 3.0 Design System';
    }

    function getSlugFromHash() {
      return decodeURIComponent(location.hash.slice(1));
    }
    function navigate() {
      var slug = getSlugFromHash();
      var isFileSlug = FILES.some(function(f) { return f.slug === slug; });
      if (!slug || isFileSlug) {
        renderPage(slug || FILES[0].slug);
      } else {
        var el = document.getElementById(slug);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    window.addEventListener('hashchange', navigate);
    navigate();

    document.addEventListener('keydown', function(e) {
      if (e.target.matches('input, textarea')) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Escape') { closeOverlays(); return; }
      if (e.key === 'ArrowLeft' && currentIdx > 0) {
        e.preventDefault();
        location.hash = FILES[currentIdx - 1].slug;
      } else if (e.key === 'ArrowRight' && currentIdx < FILES.length - 1) {
        e.preventDefault();
        location.hash = FILES[currentIdx + 1].slug;
      }
    });

    var backdropEl = document.getElementById('overlay-backdrop');
    var sidebarEl2 = document.getElementById('sidebar');
    var tocEl = document.getElementById('toc');

    function closeOverlays() {
      sidebarEl2.classList.remove('is-open');
      tocEl.classList.remove('is-open');
      backdropEl.classList.remove('show');
    }

    document.getElementById('btn-sidebar-toggle').addEventListener('click', function() {
      var isOpen = sidebarEl2.classList.toggle('is-open');
      tocEl.classList.remove('is-open');
      backdropEl.classList.toggle('show', isOpen);
    });

    document.getElementById('btn-toc-toggle').addEventListener('click', function() {
      var isOpen = tocEl.classList.toggle('is-open');
      sidebarEl2.classList.remove('is-open');
      backdropEl.classList.toggle('show', isOpen);
    });

    backdropEl.addEventListener('click', closeOverlays);

    var hintEl = document.getElementById('kbd-hint');
    setTimeout(function() {
      hintEl.classList.add('show');
      setTimeout(function() { hintEl.classList.remove('show'); }, 3500);
    }, 800);

    var toast = document.getElementById('toast');
    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(function() { toast.classList.remove('show'); }, 1800);
    }

    document.getElementById('btn-copy-all').addEventListener('click', function() {
      var combined = FILES.map(function(f) {
        return '// ===== ' + f.path + ' =====\\n\\n' + f.raw;
      }).join('\\n\\n');
      navigator.clipboard.writeText(combined).then(function() {
        showToast(FILES.length + '개 파일을 합쳐서 복사됨');
      });
    });

    document.getElementById('btn-zip').addEventListener('click', function() {
      var zip = new JSZip();
      var folder = zip.folder('design-system');
      FILES.forEach(function(f) { folder.file(f.path, f.raw); });
      zip.generateAsync({ type: 'blob' }).then(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = 'design-system.zip';
        document.body.appendChild(a); a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('design-system.zip 다운로드됨');
      });
    });

    document.getElementById('brand-link').addEventListener('click', function(e) {
      e.preventDefault();
      location.hash = FILES[0].slug;
    });

    // ─── 토큰 값 툴팁 (전역) ───
    var tooltipEl = document.getElementById('token-tooltip');
    var tooltipTarget = null;
    document.addEventListener('mouseover', function(e) {
      // ★ 규칙: 시각화 요소(Primitive·Semantic 섹션 무관)는 반드시 data-token-value 속성을 갖고 이 셀렉터에 추가한다.
      //   hover 시 툴팁으로 토큰명 표시. 새 디렉티브 추가 시 아래 목록에 클래스를 추가한다.
      var code = e.target && e.target.closest
        ? (e.target.closest('code[data-token-value]') || e.target.closest('.hl-token-var[data-token-value]') || e.target.closest('.palette-chip[data-token-value]') || e.target.closest('.scale-unit[data-token-value]') || e.target.closest('.height-col[data-token-value]') || e.target.closest('.radius-col[data-token-value]') || e.target.closest('.font-size-item[data-token-value]') || e.target.closest('.typo-props-item[data-token-value]') || e.target.closest('.shadow-preview[data-token-value]') || e.target.closest('.zindex-iso-top[data-token-value]') || e.target.closest('.duration-row[data-token-value]') || e.target.closest('.easing-row[data-token-value]') || e.target.closest('.stroke-row[data-token-value]') || e.target.closest('.icon-preview-cell[data-token-value]') || e.target.closest('.layout-dim[data-token-value]'))
        : null;
      if (!code) {
        if (tooltipTarget) { tooltipEl.classList.remove('show'); tooltipTarget = null; }
        return;
      }
      if (code === tooltipTarget) return;
      tooltipTarget = code;
      var val = code.getAttribute('data-token-value');
      var color = code.getAttribute('data-token-color');
      var tokenName = code.getAttribute('data-token-name');
      tooltipEl.innerHTML = '';
      if (tokenName && tokenName.charAt(0) === '.' && UTILITIES[tokenName]) {
        var props = UTILITIES[tokenName];
        var currentChild = null;
        var parentOpen = false;
        function addRow(text, commentParts, indent) {
          var row = document.createElement('div');
          row.style.cssText = 'margin-top:2px;';
          row.appendChild(document.createTextNode(indent + text));
          if (commentParts && commentParts.length) {
            var cmt = document.createElement('span');
            cmt.style.cssText = 'opacity:0.55; margin-left:8px;';
            cmt.textContent = '/* ' + commentParts.join(' · ') + ' */';
            row.appendChild(cmt);
          }
          tooltipEl.appendChild(row);
        }
        function addLine(text, mt) {
          var el = document.createElement('div');
          el.style.cssText = 'opacity:0.55;' + (mt ? ' margin-top:' + mt + ';' : '');
          el.textContent = text;
          tooltipEl.appendChild(el);
        }
        props.forEach(function(p) {
          if (p.prop === '__combine__') return;
          var commentParts = [];
          if (p.value && p.value !== p.raw) commentParts.push(p.value);
          if (p.desc) commentParts.push(p.desc);
          if (!p.child) {
            if (!parentOpen) { addLine('{'); parentOpen = true; }
            addRow(p.prop + ': ' + p.raw + ';', commentParts, '  ');
          } else {
            if (parentOpen && !currentChild) { addLine('}', '2px'); }
            if (p.child !== currentChild) {
              if (currentChild) addLine('}');
              currentChild = p.child;
              addLine('> ' + p.child + ' {', currentChild ? '4px' : '');
            }
            addRow(p.prop + ': ' + p.raw + ';', commentParts, '  ');
          }
        });
        addLine('}');
        var combine = props.find(function(p) { return p.prop === '__combine__'; });
        if (combine) {
          var cmb = document.createElement('div');
          cmb.style.cssText = 'margin-top:6px; opacity:0.7;';
          cmb.textContent = '/* combine: ' + combine.raw + ' */';
          tooltipEl.appendChild(cmb);
        }
        tooltipEl.classList.add('show');
        positionTooltip();
        return;
      }
      var rawVal = tokenName && TOKENS_RAW && TOKENS_RAW[tokenName];
      var primMatch = rawVal && rawVal.match(/var\\((--[\\w-]+)\\)/);
      var primName = primMatch ? primMatch[1] : null;
      var row1 = document.createElement('div');
      row1.style.cssText = 'display:flex; align-items:center; gap:6px;';
      if (color) {
        var tsw = document.createElement('span');
        tsw.className = 'token-swatch';
        tsw.style.background = color;
        row1.appendChild(tsw);
      }
      row1.appendChild(document.createTextNode(val));
      tooltipEl.appendChild(row1);
      if (primName) {
        var row2 = document.createElement('div');
        row2.style.cssText = 'opacity:0.75; margin-top:3px;';
        row2.textContent = primName;
        tooltipEl.appendChild(row2);
      }
      var desc = tokenName && TOKENS_DESC && TOKENS_DESC[tokenName];
      if (desc) {
        var row3 = document.createElement('div');
        row3.style.cssText = 'opacity:0.85; font-size:10px; margin-top:3px;';
        row3.textContent = desc;
        tooltipEl.appendChild(row3);
      }
      tooltipEl.classList.add('show');
      positionTooltip();
    });
    document.addEventListener('click', function(e) {
      var code = e.target && e.target.closest ? e.target.closest('code[data-token-value]') : null;
      if (!code) return;
      var text = code.textContent.trim();
      var copyFn = (navigator.clipboard && navigator.clipboard.writeText)
        ? navigator.clipboard.writeText.bind(navigator.clipboard)
        : function(t) {
            var ta = document.createElement('textarea');
            ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); } catch (err) {}
            document.body.removeChild(ta);
            return Promise.resolve();
          };
      copyFn(text).then(function() {
        code.classList.add('copied');
        setTimeout(function() { code.classList.remove('copied'); }, 700);
        if (tooltipTarget === code) {
          tooltipEl.innerHTML = '';
          var msg = document.createElement('div');
          msg.style.cssText = 'font-weight:600;';
          msg.textContent = '✓ 복사됨: ' + text;
          tooltipEl.appendChild(msg);
          positionTooltip();
        }
      });
    });
    function positionTooltip() {
      if (!tooltipTarget) return;
      var rect = tooltipTarget.getBoundingClientRect();
      var w = tooltipEl.offsetWidth;
      var h = tooltipEl.offsetHeight;
      var x = rect.left + rect.width / 2 - w / 2;
      if (x < 8) x = 8;
      if (x + w > window.innerWidth - 8) x = window.innerWidth - w - 8;
      var y = rect.bottom + 8;
      if (y + h > window.innerHeight - 8) y = rect.top - h - 8;
      tooltipEl.style.left = x + 'px';
      tooltipEl.style.top = y + 'px';
    }
    window.addEventListener('scroll', positionTooltip, true);
    window.addEventListener('resize', positionTooltip);
  })();
</script>

</body>
</html>'''

sprite_svg = open('icons/sprite.svg', encoding='utf-8').read().strip()

import re as _re_icon
_icon_ids = _re_icon.findall(r'<symbol[^>]+id="([^"]+)"', sprite_svg)
icon_ids_json = json.dumps(_icon_ids)

_categories_path = os.path.join('icons', 'categories.json')
if os.path.exists(_categories_path):
    with open(_categories_path, encoding='utf-8') as _f:
        icon_groups_json = json.dumps(json.load(_f), ensure_ascii=False)
else:
    icon_groups_json = '[]'

final_html = (html
    .replace('__SPRITE_SVG__', sprite_svg)
    .replace('__TOKENS_CSS__', tokens_css_raw)
    .replace('__FILES_JSON__', files_json)
    .replace('__TOKENS_JSON__', tokens_json_str)
    .replace('__TOKENS_RAW_JSON__', tokens_raw_json_str)
    .replace('__TOKENS_DESC_JSON__', tokens_desc_json_str)
    .replace('__UTILITIES_JSON__', utilities_json_str)
    .replace('__ICON_IDS_JSON__', icon_ids_json)
    .replace('__ICON_GROUPS_JSON__', icon_groups_json)
    .replace('href="icons/sprite.svg#', 'href="#')
)

with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
    f.write(final_html)

print(f"✓ HTML 빌드 완료: {len(final_html):,} chars")
print(f"  파일 {len(files_data)}개 임베드 (단일 파일 뷰 + 라우팅)")
