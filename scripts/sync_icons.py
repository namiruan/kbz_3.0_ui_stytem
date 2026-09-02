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
FILE_KEY = os.environ.get("FIGMA_FILE_KEY", "NIechyVGJuzroGt5UdFFOR")
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


def get_components():
    """ICON 페이지의 컴포넌트 목록을 가져온다.

    프레임/섹션 안에 있으면 프레임 이름을 category로 기록한다.
    평면 나열된 컴포넌트는 category=None.
    """
    url = f"https://api.figma.com/v1/files/{FILE_KEY}/nodes?ids=0:1"
    res = requests.get(url, headers=HEADERS)
    res.raise_for_status()
    data = res.json()

    page_doc = data.get("nodes", {}).get("0:1", {}).get("document", {})
    components = []
    for node in page_doc.get("children", []):
        if node.get("type") == "COMPONENT" and node["name"].startswith("icon-"):
            components.append({"node_id": node["id"], "name": node["name"], "category": None})
        elif node.get("type") in ("FRAME", "SECTION", "GROUP"):
            category = node["name"]
            for child in node.get("children", []):
                if child.get("type") == "COMPONENT" and child["name"].startswith("icon-"):
                    components.append({"node_id": child["id"], "name": child["name"], "category": category})
    return components


def export_svgs(node_ids):
    """노드 ID 목록을 SVG로 내보낸다."""
    ids = ",".join(node_ids)
    url = f"https://api.figma.com/v1/images/{FILE_KEY}?ids={ids}&format=svg"
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

    print("Figma 컴포넌트 목록 가져오는 중...")
    components = get_components()
    print(f"  {len(components)}개 컴포넌트 발견: {[c['name'] for c in components]}")

    if not components:
        print("아이콘 컴포넌트 없음. 종료.")
        return

    # 배치로 나눠서 export (Figma API 제한: 한 번에 최대 100개)
    BATCH = 100
    node_ids = [c["node_id"] for c in components]
    name_map  = {c["node_id"]: c["name"]     for c in components}
    cat_map   = {c["node_id"]: c["category"] for c in components}

    image_urls = {}
    for i in range(0, len(node_ids), BATCH):
        batch = node_ids[i:i + BATCH]
        print(f"SVG 내보내기 중... ({i+1}~{i+len(batch)})")
        image_urls.update(export_svgs(batch))

    icons = {}
    icon_categories = {}  # name → category label (또는 None)
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

        # 개별 SVG 파일 저장
        filepath = os.path.join(ICONS_DIR, f"{name}.svg")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(cleaned + "\n")

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

    # sprite.svg 재생성
    sprite_path = os.path.join(ICONS_DIR, "sprite.svg")
    sprite = build_sprite(icons)
    with open(sprite_path, "w", encoding="utf-8") as f:
        f.write(sprite)

    # categories.json 저장 — Figma 프레임 구조 반영
    # 카테고리 없는 아이콘(평면 나열)은 기존 파일의 그룹을 유지한다.
    categories_path = os.path.join(ICONS_DIR, "categories.json")
    has_categories = any(v for v in icon_categories.values())

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
