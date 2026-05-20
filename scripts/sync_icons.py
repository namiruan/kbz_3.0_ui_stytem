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


def clean_svg(svg_content):
    """SVG를 정규화한다: width/height 제거, fill → currentColor."""
    # width, height 속성 제거 (svg 루트에서만)
    svg_content = re.sub(r'(<svg[^>]*?)\s+width="[^"]*"', r'\1', svg_content)
    svg_content = re.sub(r'(<svg[^>]*?)\s+height="[^"]*"', r'\1', svg_content)
    # svg 루트의 fill="none" 제거
    svg_content = re.sub(r'(<svg[^>]*?)\s+fill="none"', r'\1', svg_content)
    # 하드코딩된 hex fill → currentColor
    svg_content = re.sub(r'fill="#[0-9a-fA-F]{3,8}"', 'fill="currentColor"', svg_content)
    # class, id 속성 제거 (루트 svg 제외)
    svg_content = re.sub(r'(<(?!svg)[^>]+?)\s+class="[^"]*"', r'\1', svg_content)
    return svg_content.strip()


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
        name = name_map.get(node_id)
        if not name or not url:
            continue
        print(f"  다운로드: {name}")
        raw = download_svg(url)
        cleaned = clean_svg(raw)
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
