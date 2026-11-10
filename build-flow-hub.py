#!/usr/bin/env python3
"""
build-flow-hub.py — 프로토타입 색인(index.html) 생성

사용법:  python3 build-flow-hub.py <prototype-dir> [--title "기능명"] [-o index.html]

동작:
  <dir> 안의 *.html 프로토타입에서 @flow 메타 주석을 읽어 화면 색인을 만든다.
  각 프로토타입에 아래 주석을 임베드해 둔다(위치 무관, 보통 <body> 상단):

    <!-- @flow
    title: 취득 신고
    scenarios: 데이터있음, 빈 상태, 로딩, 오류
    exits: 6-2-detail.html, 6-1-list.html
    -->

  - title     : 화면 이름(표의 첫 칸). 없으면 파일명.
  - scenarios : 그 화면에 담긴 시나리오(쉼표 구분). 없으면 "—".
  - exits     : 이 화면에서 이동하는 목적지 파일(쉼표 구분). 쿼리(?...)·라벨(| ...)·괄호주석은 무시하고 파일명만.
  진입(들어오는 화면)은 다른 화면들의 exits를 역참조해 자동 계산한다.

  결과: <dir>/index.html — 화면 표(화면 · 파일 · 담기는 시나리오 · 들어오는/나가는 화면 · 열기)
        + 손으로 쓰는 두 절(구성 원칙 · 확인 필요 사항).

  ⚠️ 손으로 쓴 절은 재생성해도 **보존된다.** @keep 마커 사이의 내용을 읽어 그대로 옮긴다:

    <!-- @keep:principles --> … 구성 원칙 … <!-- /@keep -->
    <!-- @keep:todo -->       … 확인 필요 사항 … <!-- /@keep -->

  마커 밖을 손으로 고치면 다음 재생성에서 지워진다. 표는 @flow가 소스다.
  index.html 자신, flow-hub.html(구 이름), _shared/**, *.src.html 은 스캔에서 제외한다.

종료 코드: 0 성공 / 1 오류(디렉터리 없음, @flow 없는 파일만 존재 등)
"""

import sys, os, re, html as _html

FLOW_RE = re.compile(r'<!--\s*@flow\b(.*?)-->', re.S)

# 색인 자신과 구 이름(flow-hub.html)은 화면 노드가 아니다
SKIP_FILES = {'index.html', 'flow-hub.html'}

# 손으로 쓰는 절 — 재생성해도 마커 사이 내용을 그대로 옮긴다
KEEP_DEFAULTS = {
    'principles': '    <li>이 프로토타입이 무엇을 확인하려는 것인지, 화면을 왜 이렇게 나눴는지 적는다.</li>',
    'todo':       '    <li>시스템에 없어서 우회한 것·판단이 필요한 것을 적는다. 이 목록이 디자이너 요청서의 초안이 된다.</li>',
}


def read_kept(out_path):
    """기존 산출물에서 @keep 블록을 읽어온다. 없으면 기본 문구."""
    kept = dict(KEEP_DEFAULTS)
    if not os.path.isfile(out_path):
        return kept
    try:
        prev = open(out_path, encoding='utf-8').read()
    except OSError:
        return kept
    for key in KEEP_DEFAULTS:
        m = re.search(r'<!--\s*@keep:%s\s*-->(.*?)<!--\s*/@keep\s*-->' % key, prev, re.S)
        if m and m.group(1).strip():
            kept[key] = m.group(1).rstrip('\n')
    return kept
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
    meta = {'title': None, 'exits': [], 'scenarios': []}
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
        elif key == 'scenarios':
            meta['scenarios'] = [x.strip() for x in val.split(',') if x.strip()]
    return meta


def collect(dir_path):
    screens = {}
    for name in sorted(os.listdir(dir_path)):
        if not name.endswith('.html') or name in SKIP_FILES or name.endswith('.src.html'):
            continue
        full = os.path.join(dir_path, name)
        if not os.path.isfile(full):
            continue
        with open(full, encoding='utf-8') as f:
            meta = parse_flow(f.read())
        if meta is None:
            continue  # @flow 없는 파일은 화면 노드가 아님
        screens[name] = {'title': meta['title'] or name,
                         'exits': meta['exits'],
                         'scenarios': meta['scenarios']}
    # 역참조로 진입(entry) 계산
    for name in screens:
        screens[name]['entries'] = []
    for name, s in screens.items():
        for tgt in s['exits']:
            if tgt in screens and name not in screens[tgt]['entries']:
                screens[tgt]['entries'].append(name)
    return screens


def render(screens, title, kept):
    esc = _html.escape

    def link(target):
        label = screens[target]['title'] if target in screens else target
        cls = '' if target in screens else ' class="flow-missing"'  # 폴더에 없는 목적지
        return f'<a href="{esc(target)}"{cls}>{esc(label)}</a>'

    def cell(items):
        return ' · '.join(items) if items else '<span class="flow-none">—</span>'

    rows = []
    for name in sorted(screens):
        s_ = screens[name]
        rows.append(f"""        <tr class="table__row">
          <th class="table__head-cell table__row-header" scope="row">{esc(s_['title'])}</th>
          <td class="table__cell"><code class="flow-file">{esc(name)}</code></td>
          <td class="table__cell">{cell([esc(x) for x in s_['scenarios']])}</td>
          <td class="table__cell">{cell([link(e) for e in s_['entries']])}</td>
          <td class="table__cell">{cell([link(t) for t in s_['exits']])}</td>
          <td class="table__cell table__cell--fit"><a class="btn btn--secondary btn--solid btn--xs text-button-sm" href="{esc(name)}">열기</a></td>
        </tr>""")

    orphans = [n for n in sorted(screens) if not screens[n]['entries']]
    orphan_note = ''
    if len(orphans) > 1 or (orphans and len(screens) > 1):
        listed = ', '.join(esc(screens[n]['title']) for n in orphans)
        orphan_note = (f'\n  <p class="flow-note">들어오는 화면이 없는 항목: <b>{listed}</b> — '
                       '시작 화면이 아니라면 어딘가의 <code>@flow exits</code>가 빠진 것이다.</p>')

    links = '\n'.join(f'  <link rel="stylesheet" href="{u}">' for u in CSS)
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(title)} — 화면 색인</title>
{links}
  <style>
    body {{ margin: 0; padding: var(--space-32) var(--space-24); background: var(--color-surface-subtle); font-family: var(--font-family-base); color: var(--color-text-body); }}
    .flow-wrap {{ max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: var(--space-32); }}
    .flow-title {{ font-size: var(--font-size-h1); font-weight: var(--font-weight-heading); letter-spacing: var(--letter-spacing-tight); margin: 0; }}
    .flow-section__title {{ font-size: var(--font-size-h3); font-weight: var(--font-weight-heading); margin: 0 0 var(--space-12); }}
    .flow-file {{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: var(--font-size-sm); color: var(--color-text-subtle); }}
    .flow-none {{ color: var(--color-text-disabled); }}
    .flow-missing {{ color: var(--color-text-error); }}
    .flow-note {{ margin: var(--space-12) 0 0; font-size: var(--font-size-sm); color: var(--color-text-caution); }}
    .flow-list {{ margin: 0; padding-left: var(--space-20); display: flex; flex-direction: column; gap: var(--space-8); font-size: var(--font-size-sm); line-height: var(--line-height-reading); }}
    .flow-panel {{ background: var(--color-surface-base); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); padding: var(--space-20) var(--space-24); }}
    .flow-hint {{ font-size: var(--font-size-sm); color: var(--color-text-subtle); margin: var(--space-12) 0 0; }}
  </style>
</head>
<body>
<div class="flow-wrap">
  <h1 class="flow-title">{esc(title)} — 화면 색인</h1>

  <section>
    <h2 class="flow-section__title">화면</h2>
    <div class="table-container">
      <table class="table table--dense" aria-label="화면 목록">
        <thead class="table__head">
          <tr>
            <th class="table__head-cell" scope="col">화면</th>
            <th class="table__head-cell" scope="col">파일</th>
            <th class="table__head-cell" scope="col">담기는 시나리오</th>
            <th class="table__head-cell" scope="col">← 들어오는 화면</th>
            <th class="table__head-cell" scope="col">→ 나가는 화면</th>
            <th class="table__head-cell table__cell--fit" scope="col">열기</th>
          </tr>
        </thead>
        <tbody class="table__body">
{chr(10).join(rows)}
        </tbody>
      </table>
    </div>{orphan_note}
  </section>

  <section class="flow-panel">
    <h2 class="flow-section__title">구성 원칙</h2>
    <ul class="flow-list">
<!-- @keep:principles -->
{kept['principles']}
<!-- /@keep -->
    </ul>
  </section>

  <section class="flow-panel">
    <h2 class="flow-section__title">확인 필요 사항</h2>
    <ul class="flow-list">
<!-- @keep:todo -->
{kept['todo']}
<!-- /@keep -->
    </ul>
    <p class="flow-hint">작업 중 마주친 시스템의 한계를 여기에 적는다 — 채팅에만 남기면 다음 세션이 같은 것을 다시 발견한다.</p>
  </section>
</div>
</body>
</html>
"""


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
    out = out or os.path.join(dir_path, 'index.html')
    kept = read_kept(out)
    with open(out, 'w', encoding='utf-8') as f:
        f.write(render(screens, title, kept))
    print(f'✓ 화면 색인 생성: {out}  (화면 {len(screens)}개)')
    for name in sorted(screens):
        s = screens[name]
        print(f'   - {name}: {s["title"]}  →[{", ".join(s["exits"]) or "-"}]  ←[{", ".join(s["entries"]) or "-"}]')


if __name__ == '__main__':
    main()
