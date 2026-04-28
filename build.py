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
    slug = path.replace('/', '--').replace('.md', '').replace('_', '')
    files_data.append({
        'path': path,
        'label': label,
        'group': group,
        'slug': slug,
        'raw': raw,
    })

files_json = json.dumps(files_data, ensure_ascii=False).replace('</', '<\\/')

# ─── 토큰 맵 빌드 (tokens.css 파싱) ───
def build_token_map():
    css_path = os.path.join(SCRIPT_DIR, 'tokens.css')
    if not os.path.exists(css_path):
        return {}
    with open(css_path, 'r', encoding='utf-8') as f:
        content = f.read()
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
    return {k: resolve(v) for k, v in raw.items()}

token_map = build_token_map()
tokens_json_str = json.dumps(token_map, ensure_ascii=False).replace('</', '<\\/')

html = '''<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>김반장 3.0 Design System</title>
<style>
  :root {
    --space-2: 2px; --space-4: 4px; --space-8: 8px; --space-12: 12px;
    --space-16: 16px; --space-24: 24px; --space-32: 32px; --space-48: 48px;
    --height-32: 32px; --height-36: 36px;
    --font-size-11: 11px; --font-size-13: 13px; --font-size-15: 15px;
    --font-size-17: 17px; --font-size-20: 20px; --font-size-24: 24px;
    --font-weight-regular: 400; --font-weight-medium: 500;
    --font-weight-semibold: 600; --font-weight-bold: 700;

    --color-brand-50: #eef4fc; --color-brand-100: #dce8f9; --color-brand-500: #166dee;
    --color-brand-600: #115ac6; --color-brand-700: #114797;
    --color-gray-0: #ffffff; --color-gray-50: #f4f5f6; --color-gray-100: #e6e8ea;
    --color-gray-200: #cdd1d5; --color-gray-300: #b1b8be; --color-gray-400: #8a949e;
    --color-gray-500: #6d7882; --color-gray-600: #58616a; --color-gray-700: #464c53;
    --color-gray-800: #33363d; --color-gray-900: #1e2124; --color-gray-950: #131416;
    --color-warning-50: #fff8ef; --color-warning-500: #e76400;
    --color-success-50: #f2fcf5; --color-success-500: #0f8a38; --color-success-700: #0b5c26;
    --color-error-50: #fceeee; --color-error-500: #ea1a1a; --color-error-700: #971111;

    --color-surface-base: var(--color-gray-0);
    --color-surface-sunken: var(--color-gray-50);
    --color-text-primary: var(--color-gray-950);
    --color-text-secondary: var(--color-gray-700);
    --color-text-tertiary: var(--color-gray-400);
    --color-text-brand: var(--color-brand-600);
    --color-border-default: var(--color-gray-100);
    --color-border-emphasis: var(--color-gray-300);

    --font-family-base: 'Pretendard', -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
    --font-family-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;

    --font-size-label-xs: var(--font-size-11);
    --font-size-label-md: var(--font-size-13);
    --font-size-body-sm: var(--font-size-13);
    --font-size-body-md: var(--font-size-15);
    --font-size-heading-xs: var(--font-size-17);
    --font-size-heading-md: var(--font-size-24);

    --radius-sm: 4px; --radius-md: 6px; --radius-lg: 8px; --radius-pill: 1000px;

    --shadow-md: 0 2px 8px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
    --shadow-lg: 0 4px 16px rgba(0,0,0,.10), 0 2px 4px rgba(0,0,0,.06);

    --layout-sidebar-width: 280px;
    --layout-toc-width: 220px;
    --layout-content-max: 740px;
    --layout-topbar-height: 56px;

    --duration-fast: 100ms;
    --duration-base: 150ms;
  }

  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; scroll-behavior: smooth; }
  body {
    font-family: var(--font-family-base);
    font-size: var(--font-size-body-md);
    line-height: 1.6;
    color: var(--color-text-primary);
    background: var(--color-surface-base);
    -webkit-font-smoothing: antialiased;
  }

  .topbar {
    position: sticky; top: 0; z-index: 50;
    height: var(--layout-topbar-height);
    background: rgba(255,255,255,.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--color-border-default);
    display: flex; align-items: center;
    padding: 0 var(--space-24);
    gap: var(--space-16);
  }
  .brand { display: flex; align-items: center; gap: var(--space-8); cursor: pointer; text-decoration: none; }
  .brand-text {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-heading-xs);
    letter-spacing: -0.01em;
    color: var(--color-text-primary);
  }
  .brand-mark {
    width: 28px; height: 28px;
    border-radius: var(--radius-md);
    background: var(--color-brand-600);
    display: flex; align-items: center; justify-content: center;
    color: var(--color-gray-0);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-label-md);
    font-weight: var(--font-weight-bold);
  }
  .version-pill {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-label-xs);
    color: var(--color-text-secondary);
    background: var(--color-surface-sunken);
    padding: 4px 10px;
    border-radius: var(--radius-pill);
    border: 1px solid var(--color-border-default);
  }
  .topbar-actions { margin-left: auto; display: flex; gap: var(--space-8); }

  .btn {
    height: var(--height-32);
    padding: 0 var(--space-12);
    border-radius: var(--radius-md);
    font-family: var(--font-family-base);
    font-size: var(--font-size-label-md);
    font-weight: var(--font-weight-medium);
    border: 1px solid var(--color-border-default);
    background: var(--color-surface-base);
    color: var(--color-text-primary);
    cursor: pointer;
    display: inline-flex; align-items: center; gap: 6px;
    transition: all var(--duration-fast) ease;
    white-space: nowrap;
    text-decoration: none;
  }
  .btn:hover { background: var(--color-surface-sunken); border-color: var(--color-border-emphasis); }
  .btn:active { background: var(--color-gray-100); }
  .btn:focus-visible { outline: 2px solid var(--color-brand-500); outline-offset: 2px; }
  .btn--primary {
    background: var(--color-brand-600);
    color: var(--color-gray-0);
    border-color: var(--color-brand-600);
  }
  .btn--primary:hover { background: var(--color-brand-700); border-color: var(--color-brand-700); }
  .btn--xs {
    height: 24px;
    padding: 0 8px;
    font-size: var(--font-size-label-xs);
  }

  .layout {
    display: grid;
    grid-template-columns: var(--layout-sidebar-width) 1fr var(--layout-toc-width);
    max-width: 1440px;
    margin: 0 auto;
  }

  .sidebar {
    border-right: 1px solid var(--color-border-default);
    padding: var(--space-24) var(--space-16);
    position: sticky;
    top: var(--layout-topbar-height);
    height: calc(100vh - var(--layout-topbar-height));
    overflow-y: auto;
  }
  .sidebar-group { margin-bottom: var(--space-24); }
  .sidebar-label {
    font-size: var(--font-size-label-xs);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0 var(--space-12) var(--space-8);
  }
  .sidebar-nav { list-style: none; }
  .sidebar-nav a {
    display: flex; align-items: center; gap: 8px;
    padding: 7px var(--space-12);
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--font-size-label-md);
    border-radius: var(--radius-md);
    transition: all var(--duration-fast) ease;
    line-height: 1.4;
  }
  .sidebar-nav a:hover { background: var(--color-surface-sunken); color: var(--color-text-primary); }
  .sidebar-nav a.active {
    background: var(--color-brand-50);
    color: var(--color-brand-700);
    font-weight: var(--font-weight-medium);
  }
  .sidebar-version {
    font-family: var(--font-family-mono);
    font-size: 10px;
    color: var(--color-text-tertiary);
    margin-left: auto;
    flex-shrink: 0;
  }
  .sidebar-nav a.active .sidebar-version { color: var(--color-brand-600); }
  .sidebar-deprecated-tag {
    font-family: var(--font-family-mono);
    font-size: 9px;
    color: var(--color-warning-500);
    background: var(--color-warning-50);
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
    background: var(--color-surface-sunken);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-24);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-label-xs);
    color: var(--color-text-secondary);
    flex-wrap: wrap;
  }
  .file-meta-path {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-label-md);
  }
  .file-meta-depends {
    display: flex; align-items: center; gap: 6px;
    font-size: var(--font-size-label-xs);
    color: var(--color-text-tertiary);
  }
  .file-meta-depends-label { color: var(--color-text-tertiary); margin-right: 2px; }
  .file-meta-link {
    text-decoration: none;
    border-bottom: 0 !important;
  }
  .file-meta-link > code {
    font-size: 10px;
    padding: 2px 6px;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--duration-fast) ease;
  }
  .file-meta-link:hover > code {
    color: var(--color-brand-700);
    background: var(--color-brand-50);
    border-color: var(--color-brand-500);
  }
  .file-meta-actions { margin-left: auto; }

  /* 본문에서 자동 변환된 .md 파일 링크 */
  .md a.md-file-link {
    border-bottom: 0;
    text-decoration: none;
  }
  .md a.md-file-link > code {
    color: var(--color-text-brand);
    border-color: var(--color-brand-100);
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
    background: var(--color-brand-50);
    border-color: var(--color-brand-500);
    color: var(--color-brand-700);
  }
  .md a.md-file-link:hover > code::after { opacity: 1; }

  .md h1 {
    font-size: var(--font-size-heading-md);
    font-weight: var(--font-weight-bold);
    letter-spacing: -0.015em;
    line-height: 1.2;
    margin-bottom: var(--space-16);
  }
  .md h2 {
    font-size: var(--font-size-heading-xs);
    font-weight: var(--font-weight-semibold);
    letter-spacing: -0.01em;
    margin-top: var(--space-32);
    margin-bottom: var(--space-12);
    scroll-margin-top: calc(var(--layout-topbar-height) + 16px);
  }
  .md h3 {
    font-size: var(--font-size-body-md);
    font-weight: var(--font-weight-semibold);
    margin-top: var(--space-24);
    margin-bottom: var(--space-8);
    scroll-margin-top: calc(var(--layout-topbar-height) + 16px);
  }
  .md p { margin-bottom: var(--space-12); }
  .md hr { border: 0; height: 1px; background: var(--color-border-default); margin: var(--space-32) 0; }
  .md ul, .md ol { padding-left: var(--space-24); margin-bottom: var(--space-12); }
  .md li { margin-bottom: 4px; }
  .md li::marker { color: var(--color-text-tertiary); }
  .md a {
    color: var(--color-text-brand);
    text-decoration: none;
    border-bottom: 1px solid var(--color-brand-100);
  }
  .md a:hover { border-bottom-color: var(--color-brand-500); }
  .md strong { font-weight: var(--font-weight-semibold); }
  .md em { font-style: normal; font-weight: var(--font-weight-medium); color: var(--color-text-brand); }

  .md code {
    font-family: var(--font-family-mono);
    font-size: 0.92em;
    background: var(--color-surface-sunken);
    color: var(--color-gray-800);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border-default);
  }
  .md pre {
    font-family: var(--font-family-mono);
    background: var(--color-gray-900);
    color: var(--color-gray-100);
    padding: var(--space-16);
    border-radius: var(--radius-lg);
    overflow-x: auto;
    margin-bottom: var(--space-12);
    font-size: var(--font-size-label-md);
    line-height: 1.6;
  }
  .md pre code { background: transparent; border: 0; color: inherit; padding: 0; font-size: inherit; }
  .md table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: var(--space-12);
    font-size: var(--font-size-label-md);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .md thead { background: var(--color-surface-sunken); }
  .md th, .md td { padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--color-border-default); }
  .md tr:last-child td { border-bottom: 0; }
  .md th {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-label-md);
    color: var(--color-text-secondary);
  }
  .md td code { font-size: 0.85em; }

  .md blockquote {
    margin: var(--space-12) 0;
    padding: var(--space-12) var(--space-16);
    background: var(--color-warning-50);
    border-left: 3px solid var(--color-warning-500);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    color: var(--color-gray-800);
  }
  .md blockquote p { margin-bottom: 0; }
  .md blockquote p + p { margin-top: 4px; }
  .md blockquote.tip {
    background: var(--color-brand-50);
    border-left-color: var(--color-brand-500);
  }
  .md blockquote.do,
  .md blockquote.dont {
    margin: var(--space-12) 0;
    padding: var(--space-8) var(--space-16);
    border-radius: var(--radius-md);
    overflow: hidden;
    color: var(--color-text-primary);
  }
  .md blockquote.do {
    background: var(--color-success-50);
    border: 1px solid rgba(22,163,74,0.2);
  }
  .md blockquote.dont {
    background: var(--color-error-50);
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
  .md blockquote.do .card-title { color: var(--color-success-700); }
  .md blockquote.dont .card-title { color: var(--color-error-700); }
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
    color: var(--color-text-primary);
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
    border-color: var(--color-brand-500);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  .md a.actor-card-link:hover .actor-card-corner {
    color: var(--color-brand-600);
  }
  /* 카드 우상단 코너 (→ 또는 — 표시) */
  .md .actor-card-corner {
    position: absolute;
    top: 12px;
    right: 14px;
    font-size: 14px;
    color: var(--color-text-tertiary);
    transition: color var(--duration-fast) ease;
    font-family: var(--font-family-mono);
    line-height: 1;
  }
  /* 비활성 카드 (개발자) */
  .md .actor-card--disabled {
    opacity: 0.55;
    background: var(--color-surface-sunken);
  }
  .md .actor-card--disabled .actor-emoji {
    filter: grayscale(1);
  }
  .md .actor-card-note {
    font-size: 10px;
    color: var(--color-text-tertiary);
    font-style: italic;
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px dashed var(--color-border-default);
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
    font-size: var(--font-size-heading-xs);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    letter-spacing: -0.01em;
    line-height: 1.3;
  }
  .md .actor-label {
    font-family: var(--font-family-mono);
    font-size: 9px;
    color: var(--color-text-tertiary);
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }
  .md .actor-action {
    font-size: var(--font-size-label-md);
    color: var(--color-text-secondary);
    line-height: 1.4;
  }
  .md .actor-output {
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px dashed var(--color-border-default);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .md .output-item {
    font-family: var(--font-family-mono);
    font-size: 10px;
    color: var(--color-text-secondary);
    background: var(--color-surface-sunken);
    padding: 3px 8px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border-default);
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
    color: var(--color-text-tertiary);
    text-align: center;
    line-height: 1.3;
    font-weight: var(--font-weight-medium);
  }
  .md .arrow-line {
    width: 32px;
    height: 1px;
    background: var(--color-border-emphasis);
    position: relative;
  }
  .md .arrow-line::after {
    content: '';
    position: absolute;
    right: -1px;
    top: -3px;
    border: 4px solid transparent;
    border-left-color: var(--color-border-emphasis);
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
      border-top-color: var(--color-border-emphasis);
      border-bottom-width: 0;
    }
  }

  .pager {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    margin-top: var(--space-48);
    padding-top: var(--space-24);
    border-top: 1px solid var(--color-border-default);
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
    border-color: var(--color-brand-500);
    background: var(--color-brand-50);
  }
  .pager-link[data-disabled="true"] { opacity: 0.4; pointer-events: none; }
  .pager-direction {
    font-size: var(--font-size-label-xs);
    color: var(--color-text-tertiary);
    display: flex; align-items: center; gap: 4px;
  }
  .pager-link.next .pager-direction { justify-content: flex-end; }
  .pager-link.next { text-align: right; }
  .pager-label {
    font-size: var(--font-size-body-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
  }
  .pager-path {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-label-xs);
    color: var(--color-text-tertiary);
  }

  .toc {
    padding: var(--space-24) var(--space-16);
    position: sticky;
    top: var(--layout-topbar-height);
    height: calc(100vh - var(--layout-topbar-height));
    overflow-y: auto;
    border-left: 1px solid var(--color-border-default);
  }
  .toc-label {
    font-size: var(--font-size-label-xs);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0 var(--space-8) var(--space-8);
  }
  .toc ul { list-style: none; }
  .toc a {
    display: block;
    padding: 4px var(--space-8);
    color: var(--color-text-tertiary);
    text-decoration: none;
    font-size: var(--font-size-label-xs);
    line-height: 1.5;
    border-left: 2px solid transparent;
    margin-left: -2px;
    transition: all var(--duration-fast) ease;
  }
  .toc a:hover { color: var(--color-text-primary); }
  .toc a.active {
    color: var(--color-text-brand);
    border-left-color: var(--color-brand-500);
    font-weight: var(--font-weight-medium);
  }
  .toc a.h3-link { padding-left: var(--space-16); font-size: 10px; }
  .toc-empty {
    padding: var(--space-8);
    color: var(--color-text-tertiary);
    font-size: var(--font-size-label-xs);
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
    font-size: var(--font-size-label-md);
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
    font-size: var(--font-size-label-xs);
    color: var(--color-text-tertiary);
    background: var(--color-surface-base);
    padding: 6px 10px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border-default);
    display: flex; align-items: center; gap: 8px;
    box-shadow: var(--shadow-md);
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--duration-base) ease;
  }
  .kbd-hint.show { opacity: 1; }
  .kbd {
    font-family: var(--font-family-mono);
    background: var(--color-surface-sunken);
    border: 1px solid var(--color-border-default);
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
    background: var(--color-brand-50);
    border-color: var(--color-brand-200);
    color: var(--color-brand-700);
  }
  .token-tooltip {
    position: fixed;
    background: var(--color-gray-900);
    color: var(--color-gray-0);
    font-family: var(--font-family-mono);
    font-size: 11px;
    padding: 4px 10px;
    border-radius: var(--radius-sm);
    white-space: nowrap;
    z-index: 500;
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--duration-fast) ease;
    box-shadow: var(--shadow-md);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .token-tooltip.show { opacity: 1; }
  .token-tooltip .token-swatch { margin-right: 0; width: 14px; height: 14px; border-radius: 3px; }

  /* ─── 팔레트 스트립 ─── */
  .palette-strip { margin: var(--space-8) 0 var(--space-24); }
  .palette-strip-label {
    font-size: var(--font-size-label-xs);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-tertiary);
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
        brand: 'Brand · Primary', secondary: 'Brand · Secondary',
        gray: 'Gray', success: 'Success', warning: 'Warning', error: 'Error'
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
        var lbl = document.createElement('div');
        lbl.className = 'palette-strip-label';
        lbl.textContent = paletteLabels[name] || name;
        strip.appendChild(lbl);

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

      // ─── 표 셀 안의 code 사이 ", " → 줄바꿈 ───
      bodyEl.querySelectorAll('td').forEach(function(td) {
        if (td.querySelectorAll('code').length < 2) return;
        Array.from(td.childNodes).forEach(function(node) {
          if (node.nodeType === 3 && /^,\\s*$/.test(node.textContent)) {
            td.replaceChild(document.createElement('br'), node);
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
      var code = e.target && e.target.closest
        ? (e.target.closest('code[data-token-value]') || e.target.closest('.palette-chip[data-token-value]'))
        : null;
      if (!code) {
        if (tooltipTarget) { tooltipEl.classList.remove('show'); tooltipTarget = null; }
        return;
      }
      if (code === tooltipTarget) return;
      tooltipTarget = code;
      var val = code.getAttribute('data-token-value');
      var color = code.getAttribute('data-token-color');
      tooltipEl.innerHTML = '';
      if (color) {
        var tsw = document.createElement('span');
        tsw.className = 'token-swatch';
        tsw.style.background = color;
        tooltipEl.appendChild(tsw);
      }
      tooltipEl.appendChild(document.createTextNode(val));
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

final_html = html.replace('__FILES_JSON__', files_json).replace('__TOKENS_JSON__', tokens_json_str)

with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
    f.write(final_html)

print(f"✓ HTML 빌드 완료: {len(final_html):,} chars")
print(f"  파일 {len(files_data)}개 임베드 (단일 파일 뷰 + 라우팅)")
