#!/usr/bin/env python3
"""
build-flow-hub.py — 프로토타입 플로우 허브 생성 (화면 관계도 + 진입)

사용법:  python3 build-flow-hub.py <prototype-dir> [--title "기능명"] [-o flow-hub.html]

동작:
  <dir> 안의 *.html 프로토타입에서 @flow 메타 주석을 읽어 화면 관계 허브를 만든다.
  각 프로토타입에 아래 주석을 임베드해 둔다(위치 무관, 보통 <body> 상단):

    <!-- @flow
    title: 취득 신고
    exits: 6-2-detail.html, 6-1-list.html
    -->

  - title : 화면 이름(허브 카드 제목). 없으면 파일명.
  - exits : 이 화면에서 이동하는 목적지 파일(쉼표 구분). 쿼리(?...)·라벨(| ...)·괄호주석은 무시하고 파일명만.
  진입(들어오는 화면)은 다른 화면들의 exits를 역참조해 자동 계산한다.

  결과: <dir>/flow-hub.html — 화면별 카드(열기 링크 + 나가는/들어오는 화면 링크).
  flow-hub.html 자신, _shared/**, *.src.html 은 스캔에서 제외한다.

종료 코드: 0 성공 / 1 오류(디렉터리 없음, @flow 없는 파일만 존재 등)
"""

import sys, os, re, html as _html

FLOW_RE = re.compile(r'<!--\s*@flow\b(.*?)-->', re.S)
CSS = [
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
    'https://namiruan.github.io/kbz_3.0_ui_stytem/tokens.css',
    'https://namiruan.github.io/kbz_3.0_ui_stytem/components.css',
]


def norm_target(raw):
    """'6-2-detail.html?worker | 상세' → '6-2-detail.html'"""
    t = raw.split('|')[0].split('(')[0].strip()
    t = t.split('?')[0].strip()
    return os.path.basename(t)


def parse_flow(text):
    m = FLOW_RE.search(text)
    if not m:
        return None
    meta = {'title': None, 'exits': []}
    for line in m.group(1).splitlines():
        line = line.strip()
        if ':' not in line:
            continue
        key, _, val = line.partition(':')
        key = key.strip().lower()
        if key == 'title':
            meta['title'] = val.strip()
        elif key == 'exits':
            meta['exits'] = [norm_target(x) for x in val.split(',') if x.strip()]
    return meta


def collect(dir_path):
    screens = {}
    for name in sorted(os.listdir(dir_path)):
        if not name.endswith('.html') or name == 'flow-hub.html' or name.endswith('.src.html'):
            continue
        full = os.path.join(dir_path, name)
        if not os.path.isfile(full):
            continue
        with open(full, encoding='utf-8') as f:
            meta = parse_flow(f.read())
        if meta is None:
            continue  # @flow 없는 파일은 화면 노드가 아님
        screens[name] = {'title': meta['title'] or name, 'exits': meta['exits']}
    # 역참조로 진입(entry) 계산
    for name in screens:
        screens[name]['entries'] = []
    for name, s in screens.items():
        for tgt in s['exits']:
            if tgt in screens and name not in screens[tgt]['entries']:
                screens[tgt]['entries'].append(name)
    return screens


def render(screens, title):
    esc = _html.escape
    def link(target):
        label = screens[target]['title'] if target in screens else target
        cls = '' if target in screens else ' style="opacity:.5"'  # 미정의 목적지 흐리게
        return f'<a href="{esc(target)}"{cls}>{esc(label)}</a>'

    cards = []
    for name in sorted(screens):
        s = screens[name]
        exits = ' · '.join(link(t) for t in s['exits']) or '<span class="flow-none">—</span>'
        entries = ' · '.join(link(e) for e in s['entries']) or '<span class="flow-none">—</span>'
        cards.append(f'''    <div class="flow-card">
      <div class="flow-card__head">
        <h2 class="flow-card__title">{esc(s['title'])}</h2>
        <a class="btn btn--secondary btn--solid btn--xs" href="{esc(name)}">열기</a>
      </div>
      <p class="flow-card__file">{esc(name)}</p>
      <dl class="flow-card__rel">
        <dt>← 들어오는 화면</dt><dd>{entries}</dd>
        <dt>→ 나가는 화면</dt><dd>{exits}</dd>
      </dl>
    </div>''')

    links = '\n'.join(f'  <link rel="stylesheet" href="{u}">' for u in CSS)
    return f'''<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(title)} — 플로우 허브</title>
{links}
  <style>
    body {{ margin: 0; padding: var(--space-24); background: var(--color-surface-subtle); font-family: var(--font-family-base); color: var(--color-text-body); }}
    .flow-hub__title {{ font-size: var(--font-size-title); font-weight: var(--font-weight-heading); margin: 0 0 var(--space-24); }}
    .flow-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-16); }}
    .flow-card {{ background: var(--color-surface-base); border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle); border-radius: var(--radius-lg); padding: var(--space-16); }}
    .flow-card__head {{ display: flex; align-items: center; justify-content: space-between; gap: var(--space-8); }}
    .flow-card__title {{ font-size: var(--font-size-lg); font-weight: var(--font-weight-heading); margin: 0; }}
    .flow-card__file {{ font-size: var(--font-size-sm); color: var(--color-text-subtle); margin: var(--space-4) 0 var(--space-12); }}
    .flow-card__rel {{ margin: 0; display: grid; grid-template-columns: auto 1fr; gap: var(--space-4) var(--space-8); font-size: var(--font-size-sm); }}
    .flow-card__rel dt {{ color: var(--color-text-subtle); white-space: nowrap; }}
    .flow-card__rel dd {{ margin: 0; }}
    .flow-card__rel a {{ color: var(--color-text-brand); text-decoration: none; }}
    .flow-card__rel a:hover {{ text-decoration: underline; }}
    .flow-none {{ color: var(--color-text-disabled); }}
  </style>
</head>
<body>
  <h1 class="flow-hub__title">{esc(title)} — 플로우 허브</h1>
  <div class="flow-grid">
{chr(10).join(cards)}
  </div>
</body>
</html>
'''


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__); sys.exit(1)
    dir_path = None; out = None; title = None
    i = 0
    while i < len(args):
        a = args[i]
        if a in ('-o', '--out'): out = args[i + 1]; i += 2
        elif a == '--title': title = args[i + 1]; i += 2
        else: dir_path = a; i += 1
    if not dir_path or not os.path.isdir(dir_path):
        print(f'오류: 디렉터리를 찾을 수 없음: {dir_path}'); sys.exit(1)
    screens = collect(dir_path)
    if not screens:
        print(f'오류: {dir_path} 안에 @flow 메타를 가진 프로토타입이 없습니다.'); sys.exit(1)
    title = title or os.path.basename(os.path.abspath(dir_path))
    out = out or os.path.join(dir_path, 'flow-hub.html')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(render(screens, title))
    print(f'✓ 플로우 허브 생성: {out}  (화면 {len(screens)}개)')
    for name in sorted(screens):
        s = screens[name]
        print(f'   - {name}: {s["title"]}  →[{", ".join(s["exits"]) or "-"}]  ←[{", ".join(s["entries"]) or "-"}]')


if __name__ == '__main__':
    main()
