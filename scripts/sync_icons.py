"""
Figma → Git 아이콘 동기화 스크립트
- Figma ICON 페이지의 컴포넌트를 SVG로 추출
- width/height 제거, fill → currentColor 정규화
- icons/{name}.svg 저장
- icons/sprite.svg 재생성
"""

import os
import re
import json
import requests

FIGMA_TOKEN = os.environ["FIGMA_TOKEN"]
# 아이콘이 있는 곳. `파일키` 또는 `파일키/페이지`를 쉼표로 나열한다.
# 페이지는 이름도 되고 노드 id도 된다(Figma 주소의 `node-id=132-13`을 그대로).
#
# 두 곳인 이유: 라이브러리 파일의 아이콘 페이지에는 **단색 아이콘만** 있고,
# 다색 아이콘(메뉴 진입 6종·excel·pdf·file-drop·new)은 아이콘 파일에만 있다.
# 한쪽만 읽으면 나머지가 sprite에서 사라진다(실제로 삭제 가드에 걸려 확인됐다).
# 이름이 겹치면 **앞의 소스가 이긴다** — 새 아이콘이 만들어지는 라이브러리를 앞에 둔다.
SOURCES = os.environ.get(
    "FIGMA_SOURCES",
    "JI2JfgqCQ8vCDRCSNtNQt4/132-13,NIechyVGJuzroGt5UdFFOR",
).strip()

# 단일 소스로 시험할 때의 덮어쓰기 — 둘 중 하나라도 있으면 SOURCES 대신 이것만 쓴다.
FILE_KEY_OVERRIDE = os.environ.get("FIGMA_FILE_KEY", "").strip()
PAGE_OVERRIDE = os.environ.get("FIGMA_ICON_PAGE", "").strip()

DRY_RUN = os.environ.get("FIGMA_DRY_RUN", "").strip() in ("1", "true", "True")
# 이번 동기화가 **기존 아이콘을 지우려 할 때** 그냥 진행할지. 기본은 멈춘다.
# 대상을 잘못 짚으면 sprite가 통째로 그 파일 내용으로 바뀌는데,
# 그 사고는 "있던 아이콘이 없어진다"는 형태로 나타난다. 의도한 삭제일 때만 1로 둔다.
ALLOW_REMOVALS = os.environ.get("FIGMA_ALLOW_REMOVALS", "").strip() in ("1", "true", "True")


def parse_sources():
    """SOURCES 문자열 → [(file_key, page), ...]. page는 없으면 빈 문자열."""
    if FILE_KEY_OVERRIDE or PAGE_OVERRIDE:
        return [(FILE_KEY_OVERRIDE or "NIechyVGJuzroGt5UdFFOR", PAGE_OVERRIDE)]
    out = []
    for item in SOURCES.split(","):
        item = item.strip()
        if not item:
            continue
        key, _, page = item.partition("/")
        out.append((key.strip(), page.strip()))
    return out
ICONS_DIR = os.path.join(os.path.dirname(__file__), "..", "icons")

HEADERS = {"X-Figma-Token": FIGMA_TOKEN}

# 피그마 컴포넌트 이름 → 코드 아이콘 이름 변환 맵.
# 피그마 파일의 이름을 바꾸지 않고도 코드 쪽 이름을 유지할 수 있다.
RENAME_MAP = {
    "icon-arrow-down":  "icon-chevron-down",
    "icon-arrow-up":    "icon-chevron-up",
    "icon-shift":       "icon-chevron-double-right",
    "icon-shift-left":  "icon-chevron-double-left",
    "icon-pull up":     "icon-file-drop",  # Figma 이름 → 표준 UX 용어
    "icon-pull-up":     "icon-file-drop",  # 이전 이름 대응
}

# Figma에 아직 없어 코드에서 직접 관리하는 아이콘.
# sync는 Figma에서 받은 것만으로 sprite를 다시 만들기 때문에, 이 목록에 없으면
# icons/{name}.svg 파일은 남아도 sprite에서 조용히 사라진다(참조가 빈 칸이 된다).
# Figma에 정식 버전이 올라오면 같은 이름으로 내려받아 덮어쓰고 이 목록에서 지운다.
# 값은 categories.json에서 들어갈 그룹 이름 — 그룹은 매 sync마다 Figma 프레임에서
# 새로 만들어지므로, 분류를 코드에 적어두지 않으면 한 번 sync한 뒤 "기타"로 흘러간다.
LOCAL_ICONS = {
    "icon-pin": "정보·상태",  # 고정 항목 표시 (ContentList). 임시 — Figma에 icon-pin 추가되면 제거
}

# 조합형 아이콘 중 CSS 변수로 fill을 고정해야 하는 아이콘.
# 피그마 sync 후 fill 값을 순서대로 교체한다 (첫 번째 fill → index 0).
CUSTOM_FILLS = {
    "icon-new": [
        "var(--icon-new-bg, var(--color-text-caution))",  # 바탕 원
        "var(--icon-new-n, var(--color-text-inverse))",   # N 글자
    ],
    "icon-file-drop": [
        "currentColor",                                                   # Exclude — 화살표
        "var(--icon-file-drop-bg, var(--color-action-neutral-selected))", # Subtract — 배경 문서
    ],
    "icon-pdf": [
        "var(--icon-pdf-fg, #ffffff)",   # 문서 테두리
        "var(--icon-pdf-bg, #B82E2E)",   # 빨간 배경
        "var(--icon-pdf-fg, #F1F1F1)",   # PDF 글씨
    ],
    "icon-excel": [
        "var(--icon-excel-ml, #249F61)",  # 상단 좌측 셀 (중밝음)
        "var(--icon-excel-dk, #1E4B2F)",  # 하단 좌측 셀 (어두운)
        "var(--icon-excel-md, #0C8045)",  # 중간 좌측 셀 (중간)
        "var(--icon-excel-dk, #0B6B3A)",  # 하중간 좌측 셀 (어두운)
        "var(--icon-excel-lt, #29C27F)",  # 상단 우측 셀 (밝음)
        "var(--icon-excel-dk, #27663F)",  # 하단 우측 셀 (어두운)
        "var(--icon-excel-ml, #19AC65)",  # 중간 우측 셀 (중밝음)
        "var(--icon-excel-md, #129652)",  # 하중간 우측 셀 (중간)
        "var(--icon-excel-md, #07AF5E)",  # X 오버레이 박스 (중간)
        "var(--icon-excel-x,  #ffffff)",  # X 글자
    ],
}

# 메뉴 진입 아이콘 — 공통 4색을 CSS 변수로 교체
MENU_ICON_NAMES = {
    "icon-machinery", "icon-employee", "icon-daily-worker",
    "icon-helpdesk", "icon-company", "icon-construction",
}

MENU_ICON_COLOR_MAP = {
    "#166dee": "var(--icon-menu-vivid, #166DEE)",
    "#114797": "var(--icon-menu-deep, #114797)",
    "#1e2124": "var(--icon-menu-dark, #1E2124)",
    "#f4f5f6": "var(--icon-menu-light, #F4F5F6)",
}


def apply_menu_icon_colors(svg_content):
    for hex_color, css_var in MENU_ICON_COLOR_MAP.items():
        svg_content = re.sub(
            rf'fill="{re.escape(hex_color)}"',
            f'fill="{css_var}"',
            svg_content,
            flags=re.IGNORECASE,
        )
    return svg_content


PAGE_ID_RE = re.compile(r"^\d+[:-]\d+$")


def to_icon_name(raw):
    """Figma 컴포넌트 이름 → 코드 아이콘 이름. 아이콘이 아니면 None.

    파일마다 표기가 다르다. 아이콘 파일은 `icon-collapse`처럼 쓰지만,
    디자인 시스템 라이브러리는 `Icon/collapse`처럼 슬래시로 묶는다
    (Figma에서 슬래시는 컴포넌트 목록을 폴더처럼 접어 보여주는 표기다).
    같은 아이콘이 파일에 따라 다른 이름으로 들어오면 안 되므로 여기서 하나로 맞춘다.

    `icon-`으로 시작하는 이름은 손대지 않는다 — 기존 파일의 이름을 그대로 지켜야
    RENAME_MAP·CUSTOM_FILLS 같은 이름 기반 규칙이 어긋나지 않는다.
    """
    name = raw.strip()
    low = name.lower()
    if low.startswith("icon-"):
        return name
    if low.startswith("icon/"):
        rest = re.sub(r"[\s/]+", "-", low[len("icon/"):]).strip("-")
        return f"icon-{rest}" if rest else None
    return None


def resolve_page_id(file_key, page):
    """아이콘 페이지의 node id. page가 비면 첫 페이지(0:1)."""
    if not page:
        return "0:1"

    # 노드 id를 직접 준 경우 — Figma 주소의 `132-13` 형태를 그대로 받는다.
    if PAGE_ID_RE.match(page):
        page_id = page.replace("-", ":")
        print(f"  페이지 id 지정: {page_id}")
        return page_id

    url = f"https://api.figma.com/v1/files/{file_key}?depth=1"
    res = requests.get(url, headers=HEADERS)
    res.raise_for_status()
    pages = res.json().get("document", {}).get("children", [])
    for node in pages:
        if node.get("name") == page:
            print(f"  페이지 '{page}' → {node['id']}")
            return node["id"]
    raise SystemExit(
        f"페이지 '{page}'를 찾지 못했다. 이 파일의 페이지: "
        f"{[(p.get('name'), p.get('id')) for p in pages]}"
    )


def get_components(file_key, page):
    """아이콘 페이지의 컴포넌트 목록을 가져온다.

    프레임/섹션 안에 있으면 프레임 이름을 category로 기록한다.
    평면 나열된 컴포넌트는 category=None.
    **한 겹까지만 본다** — 프레임 안의 프레임 안에 든 컴포넌트는 찾지 못한다.
    """
    page_id = resolve_page_id(file_key, page)
    url = f"https://api.figma.com/v1/files/{file_key}/nodes?ids={page_id}"
    res = requests.get(url, headers=HEADERS)
    res.raise_for_status()
    data = res.json()

    page_doc = data.get("nodes", {}).get(page_id, {}).get("document", {})
    components = []
    for node in page_doc.get("children", []):
        name = to_icon_name(node["name"]) if node.get("type") == "COMPONENT" else None
        if name:
            components.append({"node_id": node["id"], "name": name, "category": None})
        elif node.get("type") in ("FRAME", "SECTION", "GROUP"):
            category = node["name"]
            for child in node.get("children", []):
                if child.get("type") != "COMPONENT":
                    continue
                name = to_icon_name(child["name"])
                if name:
                    components.append({"node_id": child["id"], "name": name, "category": category})

    if not components:
        describe(page_doc)
    return components


def describe(node, depth=0, limit=40):
    """조건에 맞는 컴포넌트가 없을 때, 그 자리에 무엇이 있는지 그대로 보여준다.

    "0개 발견"만으로는 원인을 구분할 수 없다 — 노드가 페이지가 아닌 것인지,
    타입이 COMPONENT가 아닌 것인지(라이브러리에서는 변형이 묶인 COMPONENT_SET인
    경우가 많다), 이름이 'icon-'으로 시작하지 않는 것인지, 한 겹보다 깊은 것인지.
    두 겹까지 타입·이름을 찍으면 그 자리에서 판별된다.
    """
    if depth == 0:
        print(f"\n--- 진단: '{node.get('name')}' ({node.get('type')}) 안에 있는 것 ---")
    children = node.get("children", [])
    if not children:
        print("  " * (depth + 1) + "(비어 있음 — 이 노드가 페이지·프레임이 맞는지 확인)")
        return
    for child in children[:limit]:
        print("  " * (depth + 1) + f"{child.get('type'):14} {child.get('name')}")
        if depth < 1 and child.get("type") in ("FRAME", "SECTION", "GROUP", "COMPONENT_SET"):
            describe(child, depth + 1, limit)
    if len(children) > limit:
        print("  " * (depth + 1) + f"... 외 {len(children) - limit}개")


def export_svgs(file_key, node_ids):
    """노드 ID 목록을 SVG로 내보낸다."""
    ids = ",".join(node_ids)
    url = f"https://api.figma.com/v1/images/{file_key}?ids={ids}&format=svg"
    res = requests.get(url, headers=HEADERS)
    res.raise_for_status()
    return res.json()["images"]  # {node_id: url}


def download_svg(url):
    """SVG URL에서 내용을 다운로드한다."""
    res = requests.get(url)
    res.raise_for_status()
    return res.text


def _round_coord(m):
    """SVG 경로/좌표 숫자를 소수점 1자리로 반올림한다."""
    return str(round(float(m.group(0)), 1))


def round_svg_coords(svg_content):
    """SVG 내 소수점 좌표를 1자리로 정규화해 비레티나 렌더링 노이즈를 줄인다."""
    # path d="...", points="...", cx/cy/r/rx/ry/x/y/x1/y1/x2/y2 속성 내 숫자
    def round_attr(m):
        return re.sub(r'-?\d+\.\d{2,}', _round_coord, m.group(0))
    svg_content = re.sub(r'\bd="[^"]*"', round_attr, svg_content)
    svg_content = re.sub(r'\bpoints="[^"]*"', round_attr, svg_content)
    for attr in ('cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'y1', 'x2', 'y2'):
        svg_content = re.sub(
            rf'\b{attr}="(-?\d+\.\d{{2,}})"',
            lambda m, a=attr: f'{a}="{round(float(m.group(1)), 1)}"',
            svg_content
        )
    return svg_content


def normalize_fills(svg_content):
    """단색형 / 조합형을 자동 판별해 fill을 정규화한다.

    fill="none" 을 제외한 실제 색상이 1종류 → 단색형: 모두 currentColor로 교체
    2종류 이상 → 조합형: 색상 값 그대로 유지
    """
    SKIP = {'none', 'currentcolor', 'inherit', 'transparent'}

    def extract_colors(svg):
        colors = set()
        for m in re.finditer(r'fill="([^"]+)"', svg):
            v = m.group(1).strip().lower()
            if v not in SKIP:
                colors.add(v)
        return colors

    colors = extract_colors(svg_content)

    if len(colors) <= 1:
        # 단색형 — 모든 fill 색상을 currentColor로
        svg_content = re.sub(
            r'fill="(?!none"|currentColor"|inherit"|transparent")[^"]*"',
            'fill="currentColor"',
            svg_content
        )

    return svg_content


def clean_svg(svg_content):
    """SVG를 정규화한다: width/height 제거, fill 정규화, 좌표 반올림."""
    # width, height 속성 제거 (svg 루트에서만)
    svg_content = re.sub(r'(<svg[^>]*?)\s+width="[^"]*"', r'\1', svg_content)
    svg_content = re.sub(r'(<svg[^>]*?)\s+height="[^"]*"', r'\1', svg_content)
    # svg 루트의 fill="none" 제거
    svg_content = re.sub(r'(<svg[^>]*?)\s+fill="none"', r'\1', svg_content)
    # class, id 속성 제거 (루트 svg 제외)
    svg_content = re.sub(r'(<(?!svg)[^>]+?)\s+class="[^"]*"', r'\1', svg_content)
    # 단색형/조합형 판별 후 fill 정규화
    svg_content = normalize_fills(svg_content)
    # 소수점 좌표 반올림 (렌더링 노이즈 감소)
    svg_content = round_svg_coords(svg_content)
    return svg_content.strip()


def apply_custom_fills(svg_content, fills):
    """fill 속성을 순서대로 지정한 값으로 교체한다 (CUSTOM_FILLS 전용)."""
    idx = 0
    def replacer(m):
        nonlocal idx
        if idx < len(fills):
            result = f'fill="{fills[idx]}"'
            idx += 1
            return result
        return m.group(0)
    return re.sub(r'fill="[^"]*"', replacer, svg_content)


def extract_inner_svg(svg_content):
    """SVG 내부 콘텐츠(viewBox 포함)를 추출한다."""
    viewbox_match = re.search(r'viewBox="([^"]+)"', svg_content)
    viewbox = viewbox_match.group(1) if viewbox_match else "0 0 24 24"
    inner = re.sub(r'^<svg[^>]*>', '', svg_content, count=1)
    inner = re.sub(r'</svg>\s*$', '', inner)
    return viewbox, inner.strip()


def build_sprite(icons):
    """icons 딕셔너리 {name: svg_content}로 sprite.svg를 생성한다."""
    symbols = []
    for name in sorted(icons.keys()):
        svg = icons[name]
        viewbox, inner = extract_inner_svg(svg)
        symbols.append(
            f'  <!-- {name} -->\n'
            f'  <symbol id="{name}" viewBox="{viewbox}">\n'
            f'    {inner}\n'
            f'  </symbol>'
        )
    sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n'
    sprite += '\n'.join(symbols)
    sprite += '\n</svg>\n'
    return sprite


def main():
    os.makedirs(ICONS_DIR, exist_ok=True)

    sources = parse_sources()
    icons = {}
    icon_categories = {}  # name → category label (또는 None)
    found_any = False

    for file_key, page in sources:
        print(f"\nFigma 컴포넌트 목록 가져오는 중... "
              f"(file={file_key}, page={page or '첫 페이지'})")
        components = get_components(file_key, page)
        # 앞 소스가 이긴다 — 이미 받은 이름은 건너뛴다.
        components = [
            c for c in components
            if RENAME_MAP.get(c["name"], c["name"]) not in icons
        ]
        print(f"  {len(components)}개 컴포넌트 발견: {[c['name'] for c in components]}")
        if not components:
            continue
        found_any = True

        if DRY_RUN:
            # 무엇을 찾았는지만 보고한다 — 파일은 건드리지 않는다.
            by_cat = {}
            for c in components:
                by_cat.setdefault(c["category"] or "(프레임 없음)", []).append(c["name"])
            print(f"--- DRY RUN: 이 소스에서 아래를 가져왔을 것이다 ---")
            for cat, names in by_cat.items():
                print(f"  [{cat}] {len(names)}개")
                for n in sorted(names):
                    print(f"    - {n}")
            for c in components:  # 다음 소스의 중복 판정을 위해 이름만 채워둔다
                icons[RENAME_MAP.get(c["name"], c["name"])] = ""
            continue

        # 배치로 나눠서 export (Figma API 제한: 한 번에 최대 100개)
        BATCH = 100
        node_ids = [c["node_id"] for c in components]
        name_map  = {c["node_id"]: c["name"]     for c in components}
        cat_map   = {c["node_id"]: c["category"] for c in components}

        image_urls = {}
        for i in range(0, len(node_ids), BATCH):
            batch = node_ids[i:i + BATCH]
            print(f"SVG 내보내기 중... ({i+1}~{i+len(batch)})")
            image_urls.update(export_svgs(file_key, batch))

        for node_id, url in image_urls.items():
            figma_name = name_map.get(node_id)
            if not figma_name or not url:
                continue
            # RENAME_MAP 적용: 피그마 이름 → 코드 이름
            name = RENAME_MAP.get(figma_name, figma_name)
            icon_categories[name] = cat_map.get(node_id)
            if name != figma_name:
                print(f"  다운로드: {figma_name} → {name}")
            else:
                print(f"  다운로드: {name}")
            raw = download_svg(url)
            cleaned = clean_svg(raw)
            if name in CUSTOM_FILLS:
                cleaned = apply_custom_fills(cleaned, CUSTOM_FILLS[name])
                print(f"    → 커스텀 fill 적용: {name}")
            if name in MENU_ICON_NAMES:
                cleaned = apply_menu_icon_colors(cleaned)
                print(f"    → 메뉴 아이콘 CSS 변수 적용: {name}")
            icons[name] = cleaned

    if not found_any:
        print("아이콘 컴포넌트 없음. 종료. — 이름이 'icon-' 또는 'Icon/'으로 시작하는"
              " COMPONENT를, 페이지 바로 아래나 프레임 한 겹 안에 둬야 찾는다.")
        return
    if DRY_RUN:
        print(f"\nDRY RUN 합계: {len(icons)}개 (파일은 쓰지 않았다)")
        return

    print(f"\n총 {len(icons)}개 아이콘을 {len(sources)}개 소스에서 받았다.")

    # Figma에 없는 로컬 아이콘 병합 — Figma가 같은 이름을 내려줬으면 그쪽이 이긴다
    for name in sorted(LOCAL_ICONS):
        if name in icons:
            print(f"  로컬 아이콘 {name}: Figma에도 있어 Figma 버전을 쓴다 "
                  f"(LOCAL_ICONS에서 지워도 된다)")
            continue
        local_path = os.path.join(ICONS_DIR, f"{name}.svg")
        if os.path.exists(local_path):
            with open(local_path, encoding="utf-8") as f:
                icons[name] = f.read().strip()
            print(f"  로컬 아이콘 유지: {name}")
        else:
            print(f"  ⚠ 로컬 아이콘 {name} 파일 없음 — sprite에서 빠진다")

    # 기존 아이콘이 사라지지 않는지 확인한다.
    # 대상 파일·페이지를 잘못 짚으면 sprite가 통째로 다른 파일 내용으로 바뀌는데,
    # 그 사고는 항상 "있던 아이콘이 없어진다"는 형태로 나타난다. 그래서 삭제만 막으면
    # 대상을 잘못 짚은 경우를 전부 걸러낼 수 있다(추가·변경은 정상이라 통과시킨다).
    # RENAME_MAP의 구 이름은 사라지는 게 정상이라 제외한다.
    existing = {
        f[:-4] for f in os.listdir(ICONS_DIR)
        if f.endswith(".svg") and f != "sprite.svg"
    } - set(RENAME_MAP) - set(LOCAL_ICONS)
    removed = sorted(existing - set(icons))
    if removed and not ALLOW_REMOVALS:
        raise SystemExit(
            f"\n중단: 이번 동기화로 아이콘 {len(removed)}개가 sprite에서 사라진다.\n"
            f"  {removed}\n"
            f"  (소스 {[f'{k}/{p}' if p else k for k, p in sources]}에서 "
            f"{len(icons)}개를 받았다)\n"
            "대상 파일·페이지를 잘못 짚었을 가능성이 높다. 의도한 삭제라면"
            " FIGMA_ALLOW_REMOVALS=1로 다시 실행한다."
        )
    if removed:
        print(f"  아이콘 {len(removed)}개 삭제 (FIGMA_ALLOW_REMOVALS): {removed}")

    # ── 여기부터 파일을 쓴다. 삭제 가드를 통과한 뒤여야 한다 ──
    # 개별 SVG를 가드보다 먼저 쓰면, 대상을 잘못 짚은 실행이 멈추더라도
    # icons/*.svg 는 이미 덮어써진 뒤가 된다(테스트에서 실제로 걸렸다).
    for name, svg in icons.items():
        with open(os.path.join(ICONS_DIR, f"{name}.svg"), "w", encoding="utf-8") as f:
            f.write(svg + "\n")

    # sprite.svg 재생성
    sprite_path = os.path.join(ICONS_DIR, "sprite.svg")
    sprite = build_sprite(icons)
    with open(sprite_path, "w", encoding="utf-8") as f:
        f.write(sprite)

    # categories.json 저장 — Figma 프레임 구조 반영
    # 카테고리 없는 아이콘(평면 나열)은 기존 파일의 그룹을 유지한다.
    categories_path = os.path.join(ICONS_DIR, "categories.json")
    # 분류는 **모든 아이콘에 프레임이 있을 때만** 다시 쓴다.
    # 소스가 여럿이면 한쪽은 프레임으로 묶여 있고 다른 쪽은 평면일 수 있는데,
    # 그때 any로 판정하면 평면 쪽 수십 개가 통째로 "기타"로 쓸려 들어간다.
    # 일부만 분류된 상태면 기존 categories.json을 그대로 둔다.
    has_categories = bool(icon_categories) and all(icon_categories.values())

    if has_categories:
        # Figma 프레임 → 그룹 순서 결정 (프레임 등장 순서 유지)
        ordered_labels = []
        for c in components:
            label = c["category"]
            if label and label not in ordered_labels:
                ordered_labels.append(label)

        groups = []
        for label in ordered_labels:
            ids = sorted(
                name for name, cat in icon_categories.items() if cat == label
            )
            if ids:
                groups.append({"label": label, "ids": ids})

        # 카테고리 미지정 아이콘은 기타로
        uncategorized = sorted(
            name for name, cat in icon_categories.items() if not cat
        )
        if uncategorized:
            groups.append({"label": "기타", "ids": uncategorized})

        # 로컬 아이콘(LOCAL_ICONS)을 선언된 그룹에 되돌린다.
        # 그룹은 Figma 프레임에서 매번 새로 만들어지므로, Figma에 없는 아이콘은
        # 여기서 그냥 사라진다 — sprite에는 남는데 categories.json에는 없어
        # planner의 아이콘 표에서만 빠지는 어긋난 상태가 된다.
        # 분류를 이전 파일에서 읽지 않고 LOCAL_ICONS에 적어둔 값을 쓰는 이유:
        # 한 번이라도 이 복구 없이 sync가 돌면 이전 파일에서 분류가 사라져
        # 그다음부터는 되돌릴 근거가 없어진다.
        for name, label in sorted(LOCAL_ICONS.items()):
            if name not in icons or any(name in g["ids"] for g in groups):
                continue
            target = next((g for g in groups if g["label"] == label), None)
            if target is None:
                target = {"label": label, "ids": []}
                groups.append(target)
            target["ids"] = sorted(target["ids"] + [name])
            print(f"  로컬 아이콘 분류 유지: {name} → {label}")

        with open(categories_path, "w", encoding="utf-8") as f:
            json.dump(groups, f, ensure_ascii=False, indent=2)
        print(f"  categories.json 저장 ({len(groups)}개 그룹, Figma 프레임 기준)")
    else:
        # 평면 나열 — categories.json 이 이미 있으면 건드리지 않는다
        if not os.path.exists(categories_path):
            print("  ⚠ Figma에 카테고리 프레임 없음 — categories.json 생성 안 함")
        else:
            print("  Figma 프레임 없음 — 기존 categories.json 유지")

    print(f"\n완료: {len(icons)}개 아이콘 동기화, sprite.svg 재생성")


if __name__ == "__main__":
    main()
