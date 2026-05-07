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

files_json = json.dumps(files_data, ensure_ascii=False).replace('</', '<\\/')

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
tokens_json_str = json.dumps(token_map, ensure_ascii=False).replace('</', '<\\/')
tokens_raw_json_str = json.dumps(raw_token_map, ensure_ascii=False).replace('</', '<\\/')
tokens_desc_json_str = json.dumps(desc_map, ensure_ascii=False).replace('</', '<\\/')

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
  html { font-size: 16px; scroll-behavior: smooth; }
  body {
    font-family: var(--font-family-base);
    font-size: var(--text-body-md-font-size);
    line-height: 1.6;
    color: var(--color-text-body);
    background: var(--color-surface-base);
    -webkit-font-smoothing: antialiased;
  }

  .topbar {
    position: sticky; top: 0; z-index: 50;
    height: var(--layout-topbar-height);
    background: rgba(255,255,255,.85);
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
    font-size: var(--text-heading-xs-font-size);
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
    font-size: var(--text-body-sm-font-size);
    font-weight: var(--font-weight-bold);
  }
  .version-pill {
    font-family: var(--font-family-mono);
    font-size: var(--text-label-xs-font-size);
    color: var(--color-text-label);
    background: var(--color-surface-subtle);
    padding: 4px 10px;
    border-radius: var(--radius-pill);
    border: 1px solid var(--color-border-subtle);
  }
  .topbar-actions { margin-left: auto; display: flex; gap: var(--space-8); }

  .btn {
    height: var(--height-32);
    padding: 0 var(--space-12);
    border-radius: var(--radius-md);
    font-family: var(--font-family-base);
    font-size: var(--text-body-sm-font-size);
    font-weight: var(--font-weight-medium);
    border: 1px solid var(--color-border-default);
    background: var(--color-surface-base);
    color: var(--color-text-body);
    cursor: pointer;
    display: inline-flex; align-items: center; gap: 6px;
    transition: all var(--duration-fast) ease;
    white-space: nowrap;
    text-decoration: none;
  }
  .btn:hover { background: var(--color-surface-subtle); border-color: var(--color-border-default); }
  .btn:active { background: var(--color-gray-100); }
  .btn:focus-visible { outline: 2px solid var(--color-blue-500); outline-offset: 2px; }
  .btn--primary {
    background: var(--color-blue-600);
    color: var(--color-gray-0);
    border-color: var(--color-blue-600);
  }
  .btn--primary:hover { background: var(--color-blue-700); border-color: var(--color-blue-700); }
  .btn--xs {
    height: 24px;
    padding: 0 8px;
    font-size: var(--text-label-xs-font-size);
  }

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
  }
  .sidebar-group { margin-bottom: var(--space-24); }
  .sidebar-label {
    font-size: var(--text-label-xs-font-size);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-subtle);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0 var(--space-12) var(--space-8);
  }
  .sidebar-nav { list-style: none; }
  .sidebar-nav a {
    display: flex; align-items: center; gap: 8px;
    padding: 7px var(--space-12);
    color: var(--color-text-label);
    text-decoration: none;
    font-size: var(--text-body-sm-font-size);
    border-radius: var(--radius-md);
    transition: all var(--duration-fast) ease;
    line-height: 1.4;
  }
  .sidebar-nav a:hover { background: var(--color-surface-subtle); color: var(--color-text-body); }
  .sidebar-nav a.active {
    background: var(--color-blue-50);
    color: var(--color-blue-700);
    font-weight: var(--font-weight-medium);
  }
  .sidebar-version {
    font-family: var(--font-family-mono);
    font-size: 10px;
    color: var(--color-text-subtle);
    margin-left: auto;
    flex-shrink: 0;
  }
  .sidebar-nav a.active .sidebar-version { color: var(--color-blue-600); }
  .sidebar-deprecated-tag {
    font-family: var(--font-family-mono);
    font-size: 9px;
    color: var(--color-orange-500);
    background: var(--color-orange-50);
    border: 1px solid rgba(217,119,6,.2);
    padding: 1px 5px;
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

  .content {
    padding: var(--space-32) var(--space-48);
    min-width: 0;
    overflow-x: hidden;
  }
  .content-inner {
    max-width: var(--layout-content-max);
    margin: 0 auto;
    animation: fadeIn 200ms ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .file-meta {
    display: flex; align-items: center; gap: var(--space-12);
    padding: 10px 14px;
    background: var(--color-surface-subtle);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-24);
    font-family: var(--font-family-mono);
    font-size: var(--text-label-xs-font-size);
    color: var(--color-text-label);
    flex-wrap: wrap;
  }
  .file-meta-path {
    color: var(--color-text-body);
    font-weight: var(--font-weight-medium);
    font-size: var(--text-body-sm-font-size);
  }
  .file-meta-depends {
    display: flex; align-items: center; gap: 6px;
    font-size: var(--text-label-xs-font-size);
    color: var(--color-text-subtle);
  }
  .file-meta-depends-label { color: var(--color-text-subtle); margin-right: 2px; }
  .file-meta-link {
    text-decoration: none;
    border-bottom: 0 !important;
  }
  .file-meta-link > code {
    font-size: 10px;
    padding: 2px 6px;
    color: var(--color-text-label);
    cursor: pointer;
    transition: all var(--duration-fast) ease;
  }
  .file-meta-link:hover > code {
    color: var(--color-blue-700);
    background: var(--color-blue-50);
    border-color: var(--color-blue-500);
  }
  .file-meta-actions { margin-left: auto; }

  /* 본문에서 자동 변환된 .md 파일 링크 */
  .md a.md-file-link {
    border-bottom: 0;
    text-decoration: none;
  }
  .md a.md-file-link > code {
    color: var(--color-text-brand);
    border-color: var(--color-blue-100);
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
    background: var(--color-blue-50);
    border-color: var(--color-blue-500);
    color: var(--color-blue-700);
  }
  .md a.md-file-link:hover > code::after { opacity: 1; }

  .md h1 {
    font-size: var(--text-heading-md-font-size);
    font-weight: var(--font-weight-bold);
    letter-spacing: -0.015em;
    line-height: 1.2;
    margin-bottom: var(--space-16);
  }
  .md h2 {
    font-size: var(--text-heading-xs-font-size);
    font-weight: var(--font-weight-semibold);
    letter-spacing: -0.01em;
    margin-top: var(--space-32);
    margin-bottom: var(--space-12);
    scroll-margin-top: calc(var(--layout-topbar-height) + 16px);
  }
  .md h3 {
    font-size: var(--text-body-md-font-size);
    font-weight: var(--font-weight-semibold);
    margin-top: var(--space-24);
    margin-bottom: var(--space-8);
    scroll-margin-top: calc(var(--layout-topbar-height) + 16px);
  }
  .md p { margin-bottom: var(--space-12); }
  .md hr { border: 0; height: 1px; background: var(--color-border-subtle); margin: var(--space-32) 0; }
  .md ul, .md ol { padding-left: var(--space-24); margin-bottom: var(--space-12); }
  .md li { margin-bottom: 4px; }
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
    margin-bottom: var(--space-12);
    font-size: var(--text-body-sm-font-size);
    line-height: 1.6;
  }
  .md pre code { background: transparent; border: 0; color: inherit; padding: 0; font-size: inherit; }
  .md table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: var(--space-12);
    font-size: var(--text-body-sm-font-size);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .md thead { background: var(--color-surface-subtle); }
  .md th, .md td { padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--color-border-subtle); }
  .md tr:last-child td { border-bottom: 0; }
  .md tr.group-member > td { border-bottom-color: transparent; }
  .md th {
    font-weight: var(--font-weight-semibold);
    font-size: var(--text-body-sm-font-size);
    color: var(--color-text-label);
  }
  .md td code { font-size: 0.85em; }

  .md blockquote {
    margin: var(--space-12) 0;
    padding: var(--space-12) var(--space-16);
    background: var(--color-orange-50);
    border-left: 3px solid var(--color-orange-500);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    color: var(--color-gray-800);
  }
  .md blockquote p { margin-bottom: 0; }
  .md blockquote p + p { margin-top: 4px; }
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
    border: 1px solid rgba(22,163,74,0.2);
  }
  .md blockquote.dont {
    background: var(--color-red-50);
    border: 1px solid rgba(220,38,38,0.2);
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
    line-height: 1.5;
  }
  .md blockquote.do .card-body code,
  .md blockquote.dont .card-body code {
    display: block;
    background: rgba(0,0,0,0.06);
    border: none;
    padding: 5px 8px;
    border-radius: var(--radius-sm);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
    color: var(--color-text-body);
  }
  .md blockquote.do .card-body code + code,
  .md blockquote.dont .card-body code + code {
    margin-top: 4px;
  }
  .md blockquote.do .card-sep,
  .md blockquote.dont .card-sep {
    height: 1px;
    margin: var(--space-8) 0;
  }
  .md blockquote.do .card-sep { background: rgba(22,163,74,0.2); }
  .md blockquote.dont .card-sep { background: rgba(220,38,38,0.2); }
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
    gap: 4px;
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
    font-size: 14px;
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
    font-size: 10px;
    color: var(--color-text-subtle);
    font-style: italic;
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px dashed var(--color-border-subtle);
    line-height: 1.4;
  }
  /* 비활성 카드로 향하는 화살표 dim */
  .md .flow-arrow--dim {
    opacity: 0.4;
  }
  .md .actor-emoji {
    font-size: 22px;
    line-height: 1;
    margin-bottom: 4px;
  }
  .md .actor-role {
    font-size: var(--text-heading-xs-font-size);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-body);
    letter-spacing: -0.01em;
    line-height: 1.3;
  }
  .md .actor-label {
    font-family: var(--font-family-mono);
    font-size: 9px;
    color: var(--color-text-subtle);
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }
  .md .actor-action {
    font-size: var(--text-body-sm-font-size);
    color: var(--color-text-label);
    line-height: 1.4;
  }
  .md .actor-output {
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px dashed var(--color-border-subtle);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .md .output-item {
    font-family: var(--font-family-mono);
    font-size: 10px;
    color: var(--color-text-label);
    background: var(--color-surface-subtle);
    padding: 3px 8px;
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
    gap: 6px;
  }
  .md .arrow-label-top {
    font-size: 10px;
    color: var(--color-text-subtle);
    text-align: center;
    line-height: 1.3;
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
    display: flex; flex-direction: column; gap: 4px;
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
    font-size: var(--text-label-xs-font-size);
    color: var(--color-text-subtle);
    display: flex; align-items: center; gap: 4px;
  }
  .pager-link.next .pager-direction { justify-content: flex-end; }
  .pager-link.next { text-align: right; }
  .pager-label {
    font-size: var(--text-body-md-font-size);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-body);
  }
  .pager-path {
    font-family: var(--font-family-mono);
    font-size: var(--text-label-xs-font-size);
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
    font-size: var(--text-label-xs-font-size);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-subtle);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0 var(--space-8) var(--space-8);
  }
  .toc ul { list-style: none; }
  .toc a {
    display: block;
    padding: 4px var(--space-8);
    color: var(--color-text-subtle);
    text-decoration: none;
    font-size: var(--text-label-xs-font-size);
    line-height: 1.5;
    border-left: 2px solid transparent;
    margin-left: -2px;
    transition: all var(--duration-fast) ease;
  }
  .toc a:hover { color: var(--color-text-body); }
  .toc a.active {
    color: var(--color-text-brand);
    border-left-color: var(--color-blue-500);
    font-weight: var(--font-weight-medium);
  }
  .toc a.h3-link { padding-left: var(--space-16); font-size: 10px; }
  .toc-empty {
    padding: var(--space-8);
    color: var(--color-text-subtle);
    font-size: var(--text-label-xs-font-size);
    font-style: italic;
  }

  .toast {
    position: fixed;
    bottom: var(--space-32);
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: var(--color-gray-900);
    color: var(--color-gray-0);
    padding: 10px 16px;
    border-radius: var(--radius-pill);
    font-size: var(--text-body-sm-font-size);
    box-shadow: var(--shadow-lg);
    opacity: 0;
    pointer-events: none;
    transition: all var(--duration-base) ease;
    z-index: 100;
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

  .kbd-hint {
    position: fixed;
    bottom: var(--space-16);
    right: var(--space-16);
    font-size: var(--text-label-xs-font-size);
    color: var(--color-text-subtle);
    background: var(--color-surface-base);
    padding: 6px 10px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border-subtle);
    display: flex; align-items: center; gap: 8px;
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
    padding: 1px 5px;
    font-size: 10px;
  }

  @media (max-width: 1100px) {
    .layout { grid-template-columns: var(--layout-sidebar-width) 1fr; }
    .toc { display: none; }
  }
  @media (max-width: 900px) {
    .layout { grid-template-columns: 1fr; }
    .sidebar { display: none; }
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
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,0.12);
    margin-right: 6px;
    vertical-align: middle;
    flex-shrink: 0;
  }
  .md code[data-token-value] {
    transition: background var(--duration-fast) ease, border-color var(--duration-fast) ease, color var(--duration-fast) ease;
  }
  .md code[data-token-value]:hover {
    background: var(--color-blue-50);
    border-color: var(--color-blue-200);
    color: var(--color-blue-700);
  }
  .token-tooltip {
    position: fixed;
    background: var(--color-gray-900);
    color: var(--color-gray-0);
    font-family: var(--font-family-mono);
    font-size: 11px;
    padding: 7px 10px;
    border-radius: var(--radius-sm);
    white-space: nowrap;
    z-index: 500;
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--duration-fast) ease;
    box-shadow: var(--shadow-md);
  }
  .token-tooltip.show { opacity: 1; }
  .token-tooltip .token-swatch { margin-right: 0; width: 14px; height: 14px; border-radius: 3px; }

  /* ─── 팔레트 스트립 ─── */
  .palette-strip { margin: var(--space-8) 0 var(--space-24); }
  .palette-strip-label {
    font-size: var(--text-label-xs-font-size);
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
    padding: 8px 5px;
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
    font-size: 10px;
    font-weight: 700;
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

  /* ─── 스페이스 스케일 ─── */
  .scale-strip { margin: var(--space-8) 0 var(--space-24); display: flex; flex-direction: column; gap: 10px; }
  .scale-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-12);
    font-family: var(--font-family-mono);
    font-size: var(--text-label-xs-font-size);
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

  /* ─── 하이트 스케일 ─── */
  .height-strip { margin: var(--space-8) 0 var(--space-24); display: flex; align-items: flex-end; justify-content: center; gap: var(--space-24); font-family: var(--font-family-mono); font-size: var(--text-label-xs-font-size); }
  .height-col { display: flex; flex-direction: column; align-items: center; gap: var(--space-6); cursor: default; transition: transform var(--duration-fast) ease; }
  .height-col:hover { transform: translateY(-2px); }
  .height-bar { width: 48px; background: var(--color-surface-brand-tint); border-radius: var(--radius-sm); position: relative; }
  .height-arrow { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; }
  .height-arrow-head { font-size: 7px; line-height: 1; flex-shrink: 0; color: var(--color-text-brand); }
  .height-arrow-line { flex: 1; width: 1px; background: var(--color-border-brand); }
  .height-val { color: var(--color-text-subtle); }

  /* ─── 폰트 사이즈 스케일 ─── */
  .font-size-strip { margin: var(--space-8) 0 var(--space-24); display: flex; flex-direction: column; gap: var(--space-12); }
  .font-size-item { display: flex; align-items: baseline; gap: var(--space-16); cursor: default; transition: opacity var(--duration-fast) ease; }
  .font-size-item:hover { opacity: 0.7; }
  .font-size-val { width: 40px; flex-shrink: 0; font-family: var(--font-family-mono); font-size: 11px; color: var(--color-text-subtle); text-align: right; }
  .font-size-sample { color: var(--color-text-body); font-family: var(--font-family-base); line-height: 1.3; font-weight: var(--font-weight-regular); }

  /* ─── 시맨틱 예시 다이어그램 ─── */
  .ex-diagram { margin: var(--space-8) 0 var(--space-24); font-family: var(--font-family-mono); font-size: var(--text-label-xs-font-size); color: var(--color-text-subtle); }
  .ex-row { display: flex; gap: var(--space-16); align-items: flex-end; flex-wrap: wrap; }
  .ex-item { display: flex; flex-direction: column; align-items: center; gap: var(--space-4); }
  .ex-inset-box { background: var(--color-surface-brand-tint); border: 1px solid var(--color-border-brand); border-radius: var(--radius-sm); }
  .ex-squish-box { background: var(--color-surface-brand-tint); border: 1px solid var(--color-border-brand); border-radius: 100px; }
  .ex-inner { background: var(--color-surface-base); border-radius: 2px; width: 24px; height: 10px; }
  .ex-block { background: var(--color-surface-neutral); border-radius: var(--radius-sm); height: 16px; width: 80px; }
  .ex-spacer { background: var(--color-surface-brand-tint); width: 80px; border-left: 2px solid var(--color-border-brand); border-right: 2px solid var(--color-border-brand); }
  .ex-gap-row { display: flex; align-items: stretch; }
  .ex-gap-block { background: var(--color-surface-neutral); border-radius: var(--radius-sm); width: 24px; height: 24px; flex-shrink: 0; }
  .ex-gap-space { background: var(--color-surface-brand-tint); border-top: 1px solid var(--color-border-brand); border-bottom: 1px solid var(--color-border-brand); }
  .ex-surface-chips { display: flex; gap: var(--space-6); flex-wrap: wrap; margin-bottom: var(--space-8); }
  .ex-surface-chip { height: 40px; min-width: 64px; padding: 0 var(--space-8); border-radius: var(--radius-sm); border: 1px solid var(--color-border-subtle); display: flex; align-items: flex-end; padding-bottom: 4px; }
  .ex-surface-chip-name { font-size: 9px; color: var(--color-text-subtle); }
  .ex-surface-chip--dark .ex-surface-chip-name { color: rgba(255,255,255,0.6); }
  .ex-text-col { display: flex; flex-direction: column; gap: var(--space-6); }
  .ex-text-row { display: flex; align-items: baseline; gap: var(--space-8); }
  .ex-text-key { width: 148px; flex-shrink: 0; color: var(--color-text-subtle); }
  .ex-text-sample { font-size: var(--text-label-sm-font-size); font-family: var(--font-family-base); }
  .ex-border-col { display: flex; flex-direction: column; gap: var(--space-8); }
  .ex-border-row { display: flex; align-items: center; gap: var(--space-12); }
  .ex-border-key { width: 148px; flex-shrink: 0; }
  .ex-border-line { flex: 1; height: 0; }
  .ex-action-chips { display: flex; gap: var(--space-8); flex-wrap: wrap; margin-bottom: var(--space-8); }
  .ex-action-chip { width: 72px; height: 32px; border-radius: var(--radius-sm); border: 1px solid var(--color-border-default); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .ex-action-overlay { position: absolute; inset: 0; }
  .ex-action-label { font-size: 9px; color: var(--color-text-subtle); position: relative; }
</style>
</head>
<body>

<header class="topbar">
  <a class="brand" href="#" id="brand-link">
    <span class="brand-mark">3</span>
    <span class="brand-text">김반장 3.0 Design System</span>
  </a>
  <span class="version-pill">v0.5.0</span>
  <div class="topbar-actions">
    <button class="btn" id="btn-copy-all" title="모든 파일을 합쳐서 마크다운 복사">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      전체 복사
    </button>
    <button class="btn btn--primary" id="btn-zip" title="ZIP 다운로드">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
      ZIP
    </button>
  </div>
</header>

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
      'interaction': 'INTERACTION',
      'adaptation': 'ADAPTATION',
      'product': 'PRODUCT',
      'accessibility': 'ACCESSIBILITY',
      'architecture': 'ARCHITECTURE',
    };

    Object.keys(groupLabels).forEach(function(groupKey) {
      var items = groups[groupKey];
      if (!items) return;
      var section = document.createElement('div');
      section.className = 'sidebar-group';
      section.innerHTML = '<div class="sidebar-label">' + groupLabels[groupKey] + '</div>';
      var ul = document.createElement('ul');
      ul.className = 'sidebar-nav';
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
      section.appendChild(ul);
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

      sidebarLinks.forEach(function(link) {
        link.classList.toggle('active', link.dataset.slug === file.slug);
      });

      var inner = document.createElement('div');
      inner.className = 'content-inner';

      // 파일 메타
      var meta = document.createElement('div');
      meta.className = 'file-meta';

      // depends-on 파싱 → 다른 파일 매칭 시 링크화
      var dependsRaw = parsed.meta['depends-on'] || '';
      var dependsList = dependsRaw.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
      var dependsHTML = '';
      if (dependsList.length > 0) {
        dependsHTML = '<span class="file-meta-depends"><span class="file-meta-depends-label">참조</span>' +
          dependsList.map(function(p) {
            var target = FILES.find(function(f) { return f.path === p; });
            if (target) {
              return '<a href="#' + target.slug + '" class="file-meta-link"><code>' + p + '</code></a>';
            }
            return '<code style="font-size:10px;padding:2px 6px;">' + p + '</code>';
          }).join(' · ') + '</span>';
      }

      meta.innerHTML =
        '<span class="file-meta-path">' + file.path + '</span>' +
        '<span>v' + (parsed.meta.version || '?') + '</span>' +
        dependsHTML +
        '<span class="file-meta-actions"></span>';

      var copyBtn = document.createElement('button');
      copyBtn.className = 'btn btn--xs';
      copyBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> 이 파일 복사';
      copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(file.raw).then(function() {
          showToast(file.path + ' 복사됨');
        });
      });
      meta.querySelector('.file-meta-actions').appendChild(copyBtn);
      inner.appendChild(meta);

      // 본문
      var bodyEl = document.createElement('div');
      bodyEl.className = 'md';
      bodyEl.innerHTML = marked.parse(parsed.body);

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
      function exDiagram(content) {
        var d = document.createElement('div');
        d.className = 'ex-diagram';
        d.appendChild(content);
        return d;
      }
      function exItem(box, label) {
        var item = document.createElement('div'); item.className = 'ex-item';
        item.appendChild(box);
        var lbl = document.createElement('span'); lbl.textContent = label; item.appendChild(lbl);
        return item;
      }
      var exRenderers = {
        'space-inset': function(el) {
          var row = document.createElement('div'); row.className = 'ex-row';
          ['xs','sm','md','lg','xl'].forEach(function(s) {
            var box = document.createElement('div'); box.className = 'ex-inset-box';
            box.style.padding = 'var(--space-inset-' + s + ')';
            var inner = document.createElement('div'); inner.className = 'ex-inner';
            box.appendChild(inner);
            row.appendChild(exItem(box, s));
          });
          el.replaceWith(exDiagram(row));
        },
        'space-inset-squish': function(el) {
          var row = document.createElement('div'); row.className = 'ex-row'; row.style.alignItems = 'center';
          ['xs','sm','md','lg'].forEach(function(s) {
            var box = document.createElement('div'); box.className = 'ex-squish-box';
            box.style.padding = 'var(--space-inset-squish-' + s + ')';
            var inner = document.createElement('div'); inner.className = 'ex-inner';
            box.appendChild(inner);
            row.appendChild(exItem(box, s));
          });
          el.replaceWith(exDiagram(row));
        },
        'space-stack': function(el) {
          var row = document.createElement('div'); row.className = 'ex-row'; row.style.alignItems = 'flex-start';
          ['sm','md','lg'].forEach(function(s) {
            var col = document.createElement('div');
            col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:var(--space-4);';
            var wrap = document.createElement('div');
            ['A','B','C'].forEach(function(t, i) {
              if (i > 0) {
                var sp = document.createElement('div'); sp.className = 'ex-spacer';
                sp.style.height = 'var(--space-stack-' + s + ')';
                wrap.appendChild(sp);
              }
              var b = document.createElement('div'); b.className = 'ex-block';
              wrap.appendChild(b);
            });
            col.appendChild(wrap);
            var lbl = document.createElement('span'); lbl.textContent = s; col.appendChild(lbl);
            row.appendChild(col);
          });
          el.replaceWith(exDiagram(row));
        },
        'space-gap': function(el) {
          var row = document.createElement('div'); row.className = 'ex-row'; row.style.alignItems = 'center';
          ['sm','md','lg'].forEach(function(s) {
            var col = document.createElement('div');
            col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:var(--space-4);';
            var wrap = document.createElement('div'); wrap.className = 'ex-gap-row';
            [0,1,2,3].forEach(function(i) {
              if (i > 0) {
                var sp = document.createElement('div'); sp.className = 'ex-gap-space';
                sp.style.width = 'var(--space-gap-' + s + ')';
                wrap.appendChild(sp);
              }
              var b = document.createElement('div'); b.className = 'ex-gap-block'; wrap.appendChild(b);
            });
            col.appendChild(wrap);
            var lbl = document.createElement('span'); lbl.textContent = s; col.appendChild(lbl);
            row.appendChild(col);
          });
          el.replaceWith(exDiagram(row));
        },
        'color-surface': function(el) {
          var wrap = document.createElement('div');
          var groups = [
            { label: '중립', tokens: ['base','subtle','neutral','disabled','dark','dim'] },
            { label: '브랜드', tokens: ['brand','brand-subtle','brand-tint','info-subtle','info-tint'] },
            { label: '상태', tokens: ['success-subtle','caution-subtle','error-subtle'] }
          ];
          groups.forEach(function(g) {
            var row = document.createElement('div'); row.className = 'ex-surface-chips';
            g.tokens.forEach(function(t) {
              var chip = document.createElement('div'); chip.className = 'ex-surface-chip';
              chip.style.background = 'var(--color-surface-' + t + ')';
              if (t === 'dark' || t === 'dim') chip.classList.add('ex-surface-chip--dark');
              var nm = document.createElement('span'); nm.className = 'ex-surface-chip-name';
              nm.textContent = t;
              chip.appendChild(nm);
              row.appendChild(chip);
            });
            wrap.appendChild(row);
          });
          el.replaceWith(exDiagram(wrap));
        },
        'color-text': function(el) {
          var col = document.createElement('div'); col.className = 'ex-text-col';
          var tokens = [
            ['body','본문 텍스트'],['display','강조 제목'],['label','UI 레이블'],
            ['subtle','보조 설명'],['disabled','비활성'],['inverse','반전(어두운 배경)'],
            ['brand-vivid','브랜드 강조'],['brand','브랜드'],['brand-muted','브랜드 흐림'],
            ['info','정보'],['caution','경고'],['error','오류']
          ];
          tokens.forEach(function(t) {
            var row = document.createElement('div'); row.className = 'ex-text-row';
            var key = document.createElement('span'); key.className = 'ex-text-key';
            key.textContent = t[0];
            var sample = document.createElement('span'); sample.className = 'ex-text-sample';
            sample.style.color = 'var(--color-text-' + t[0] + ')';
            if (t[0] === 'inverse') sample.style.background = 'var(--color-surface-dark)';
            sample.textContent = t[1];
            row.appendChild(key); row.appendChild(sample);
            col.appendChild(row);
          });
          el.replaceWith(exDiagram(col));
        },
        'color-border': function(el) {
          var col = document.createElement('div'); col.className = 'ex-border-col';
          var tokens = ['subtle','default','disabled','selected','brand','focus','error'];
          tokens.forEach(function(t) {
            var row = document.createElement('div'); row.className = 'ex-border-row';
            var key = document.createElement('span'); key.className = 'ex-border-key';
            key.textContent = t;
            var line = document.createElement('div'); line.className = 'ex-border-line';
            line.style.borderTop = '1px solid var(--color-border-' + t + ')';
            row.appendChild(key); row.appendChild(line);
            col.appendChild(row);
          });
          el.replaceWith(exDiagram(col));
        },
        'color-action': function(el) {
          var wrap = document.createElement('div');
          var groups = [
            { name: 'neutral', states: ['hover','pressed','selected','overlay'] },
            { name: 'brand',   states: ['hover','pressed','selected','overlay'] },
            { name: 'info',    states: ['hover','pressed','selected','overlay'] },
            { name: 'error',   states: ['hover','pressed','selected','overlay'] }
          ];
          groups.forEach(function(g) {
            var row = document.createElement('div'); row.className = 'ex-action-chips';
            g.states.forEach(function(s) {
              var chip = document.createElement('div'); chip.className = 'ex-action-chip';
              var overlay = document.createElement('div'); overlay.className = 'ex-action-overlay';
              overlay.style.background = 'var(--color-action-' + g.name + '-' + s + ')';
              chip.appendChild(overlay);
              var lbl = document.createElement('span'); lbl.className = 'ex-action-label';
              lbl.textContent = g.name + '/' + s;
              chip.appendChild(lbl);
              row.appendChild(chip);
            });
            wrap.appendChild(row);
          });
          el.replaceWith(exDiagram(wrap));
        }
      };
      bodyEl.querySelectorAll('.example-placeholder').forEach(function(el) {
        var type = el.getAttribute('data-example');
        if (exRenderers[type]) exRenderers[type](el);
      });

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

      // ─── 표 셀 안의 code 사이 ", " → 줄바꿈 ───
      bodyEl.querySelectorAll('td').forEach(function(td) {
        if (td.querySelectorAll('code').length < 2) return;
        Array.from(td.childNodes).forEach(function(node) {
          if (node.nodeType === 3 && /^,\\s*$/.test(node.textContent)) {
            td.replaceChild(document.createElement('br'), node);
          }
        });
      });

      // ─── 같은 그룹 행 사이 구분선 제거 ───
      bodyEl.querySelectorAll('table').forEach(function(table) {
        var rows = Array.from(table.querySelectorAll('tbody tr'));
        rows.forEach(function(row, i) {
          var next = rows[i + 1];
          if (!next) return;
          var a = row.querySelector('td:first-child');
          var b = next.querySelector('td:first-child');
          if (a && b && a.textContent.trim() === b.textContent.trim()) {
            row.classList.add('group-member');
          }
        });
      });

      // ─── 토큰 스와치 (색상 미리보기) & 값 툴팁 ───
      bodyEl.querySelectorAll('code').forEach(function(code) {
        if (code.closest('pre')) return;
        var name = code.textContent.trim();
        if (name.slice(0, 2) !== '--') return;
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
      if (e.key === 'ArrowLeft' && currentIdx > 0) {
        e.preventDefault();
        location.hash = FILES[currentIdx - 1].slug;
      } else if (e.key === 'ArrowRight' && currentIdx < FILES.length - 1) {
        e.preventDefault();
        location.hash = FILES[currentIdx + 1].slug;
      }
    });

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
      // ★ 규칙: primitive 토큰 시각화 요소는 반드시 data-token-value 속성을 갖고 이 셀렉터에 추가한다.
      //   hover 시 translateY(-2px) + 툴팁으로 토큰명 표시 — 팔레트·스페이스·하이트 모두 동일.
      var code = e.target && e.target.closest
        ? (e.target.closest('code[data-token-value]') || e.target.closest('.palette-chip[data-token-value]') || e.target.closest('.scale-unit[data-token-value]') || e.target.closest('.height-col[data-token-value]') || e.target.closest('.font-size-item[data-token-value]'))
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
      var rawVal = tokenName && TOKENS_RAW && TOKENS_RAW[tokenName];
      var primMatch = rawVal && rawVal.match(/var\\((--[\\w-]+)\\)/);
      var primName = primMatch ? primMatch[1] : null;
      tooltipEl.innerHTML = '';
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
    });
    document.addEventListener('mousemove', function(e) {
      if (!tooltipTarget) return;
      tooltipEl.style.left = (e.clientX + 14) + 'px';
      tooltipEl.style.top = (e.clientY - 36) + 'px';
    });
  })();
</script>

</body>
</html>'''

final_html = (html
    .replace('__TOKENS_CSS__', tokens_css_raw)
    .replace('__FILES_JSON__', files_json)
    .replace('__TOKENS_JSON__', tokens_json_str)
    .replace('__TOKENS_RAW_JSON__', tokens_raw_json_str)
    .replace('__TOKENS_DESC_JSON__', tokens_desc_json_str)
)

with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
    f.write(final_html)

print(f"✓ HTML 빌드 완료: {len(final_html):,} chars")
print(f"  파일 {len(files_data)}개 임베드 (단일 파일 뷰 + 라우팅)")
