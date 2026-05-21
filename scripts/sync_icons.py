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
}

# 조합형 아이콘 중 CSS 변수로 fill을 고정해야 하는 아이콘.
# 피그마 sync 후 fill 값을 순서대로 교체한다 (첫 번째 fill → index 0).
CUSTOM_FILLS = {
    "icon-new": [
        "var(--icon-new-bg, var(--color-text-caution))",  # 바탕 원
        "var(--icon-new-n, var(--color-text-inverse))",   # N 글자
    ],
}


def get_components():
    """ICON 페이지의 컴포넌트 목록을 가져온다 (로컬 컴포넌트 포함)."""
    url = f"https://api.figma.com/v1/files/{FILE_KEY}/nodes?ids=0:1"
    res = requests.get(url, headers=HEADERS)
    res.raise_for_status()
    data = res.json()

    page_doc = data.get("nodes", {}).get("0:1", {}).get("document", {})
    components = []
    for node in page_doc.get("children", []):
        if node.get("type") == "COMPONENT" and node["name"].startswith("icon-"):
            components.append({"node_id": node["id"], "name": node["name"]})
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
    name_map = {c["node_id"]: c["name"] for c in components}

    image_urls = {}
    for i in range(0, len(node_ids), BATCH):
        batch = node_ids[i:i + BATCH]
        print(f"SVG 내보내기 중... ({i+1}~{i+len(batch)})")
        image_urls.update(export_svgs(batch))

    icons = {}
    for node_id, url in image_urls.items():
        figma_name = name_map.get(node_id)
        if not figma_name or not url:
            continue
        # RENAME_MAP 적용: 피그마 이름 → 코드 이름
        name = RENAME_MAP.get(figma_name, figma_name)
        if name != figma_name:
            print(f"  다운로드: {figma_name} → {name}")
        else:
            print(f"  다운로드: {name}")
        raw = download_svg(url)
        cleaned = clean_svg(raw)
        if name in CUSTOM_FILLS:
            cleaned = apply_custom_fills(cleaned, CUSTOM_FILLS[name])
            print(f"    → 커스텀 fill 적용: {name}")
        icons[name] = cleaned

        # 개별 SVG 파일 저장
        filepath = os.path.join(ICONS_DIR, f"{name}.svg")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(cleaned + "\n")

    # sprite.svg 재생성
    sprite_path = os.path.join(ICONS_DIR, "sprite.svg")
    sprite = build_sprite(icons)
    with open(sprite_path, "w", encoding="utf-8") as f:
        f.write(sprite)

    print(f"\n완료: {len(icons)}개 아이콘 동기화, sprite.svg 재생성")


if __name__ == "__main__":
    main()
