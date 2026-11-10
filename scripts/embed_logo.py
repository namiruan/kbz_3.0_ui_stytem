"""
로고 자산 → Avatar CSS 임베드 스크립트
- logo/logo-kbz.svg 를 우선, 없으면 logo/logo-kbz.png 를 읽는다
- 이름이 다르면 logo/ 안의 이미지를 찾아 정식 이름으로 바꾼 뒤 진행한다
- data URI로 인코딩한다 (svg는 URL 인코딩, png는 base64)
- design-system/components/atoms/avatar.md 의 --avatar-logo 한 줄을 바꿔 쓴다

실행 후 `python3 build.py`로 components.css·design-system.html을 재생성한다.
경로를 CSS에 직접 쓰지 않고 인라인하는 이유는 logo/README.md 참조.
"""

import base64
import glob
import os
import re
import sys
from urllib.parse import quote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO_DIR = os.path.join(ROOT, "logo")
AVATAR_MD = os.path.join(ROOT, "design-system", "components", "atoms", "avatar.md")

# 우선순위대로. 벡터가 어느 크기에서도 선명하고 용량도 작다.
CANDIDATES = ["logo-kbz.svg", "logo-kbz.png"]

MIN_PNG_PX = 192  # Avatar 최대 48px × 3배 화면 = 144px. 그보다 작으면 프로필 화면에서 흐려진다.


def pick_source():
    """정식 이름을 먼저 찾고, 없으면 logo/ 안의 이미지를 정식 이름으로 바꿔 쓴다.

    이름을 맞추라고 사람에게 되묻는 대신 스크립트가 정규화한다 — 자산을 넣는 사람이
    파일명 규칙까지 외울 이유가 없다. 여러 개면 고르지 않는다(무엇이 로고인지 모른다).

    반환 — 경로 · False(여러 개라 못 고름, 사유는 이미 출력) · None(아무것도 없음)
    """
    for name in CANDIDATES:
        path = os.path.join(LOGO_DIR, name)
        if os.path.isfile(path):
            return path

    for ext in ("svg", "png"):
        found = sorted(glob.glob(os.path.join(LOGO_DIR, "*." + ext)))
        if not found:
            continue
        if len(found) > 1:
            names = ", ".join(os.path.basename(f) for f in found)
            print(f"❌ logo/ 에 {ext} 가 여러 개다({names}). 어느 것이 로고인지 알 수 없다.")
            print(f"   쓸 것 하나만 남기거나 logo-kbz.{ext} 로 이름을 바꾼다.")
            return False
        canonical = os.path.join(LOGO_DIR, "logo-kbz." + ext)
        os.rename(found[0], canonical)
        print(f"  이름 정규화: {os.path.basename(found[0])} → logo-kbz.{ext}")
        return canonical

    return None


def png_size(data):
    """PNG 헤더에서 width·height를 읽는다. IHDR은 항상 첫 청크다."""
    if data[:8] != b"\x89PNG\r\n\x1a\n" or data[12:16] != b"IHDR":
        return None
    return (
        int.from_bytes(data[16:20], "big"),
        int.from_bytes(data[20:24], "big"),
    )


def svg_data_uri(raw):
    text = raw.decode("utf-8")
    # 주석·XML 선언·개행을 걷어내 한 줄로 만든다. CSS 한 줄에 들어가야 한다.
    text = re.sub(r"<\?xml[^>]*\?>", "", text)
    text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)
    text = re.sub(r"\s+", " ", text).strip()
    if "viewBox" not in text:
        print("  ⚠️  svg에 viewBox가 없다 — 크기가 아바타를 따라가지 않는다.")
    # base64보다 URL 인코딩이 짧고, 디프에서 사람이 읽을 수 있다.
    # 큰따옴표는 CSS url("...") 밖으로 새지 않게 반드시 인코딩한다.
    return "data:image/svg+xml," + quote(text, safe="~!$*()-_.,:;=@/'[]<>+ ")


def png_data_uri(raw):
    size = png_size(raw)
    if size is None:
        print("  ⚠️  PNG 헤더를 읽지 못했다. 확장자만 png인 파일일 수 있다.")
    else:
        w, h = size
        print(f"  크기 {w}×{h}")
        if w != h:
            print(f"  ⚠️  정사각이 아니다({w}×{h}). 아바타 원 안에서 한쪽이 잘리거나 남는다.")
        if min(w, h) < MIN_PNG_PX:
            print(f"  ⚠️  {MIN_PNG_PX}px 미만이다. 48px 아바타의 3배 화면에서 흐려진다.")
    return "data:image/png;base64," + base64.b64encode(raw).decode("ascii")


def main():
    src = pick_source()
    if src is False:
        return 1
    if src is None:
        print(f"❌ logo/ 에 자산이 없다. {' 또는 '.join(CANDIDATES)} 를 넣고 다시 실행한다.")
        print("   (이름은 아무거나 좋다 — svg·png 하나만 넣으면 이 스크립트가 정식 이름으로 바꾼다.)")
        return 1

    raw = open(src, "rb").read()
    print(f"로고 자산: {os.path.relpath(src, ROOT)} ({len(raw):,} bytes)")

    uri = svg_data_uri(raw) if src.endswith(".svg") else png_data_uri(raw)

    md = open(AVATAR_MD, encoding="utf-8").read()
    pattern = re.compile(r'(  --avatar-logo: )url\("[^"]*"\)(;)')
    if not pattern.search(md):
        print("❌ avatar.md에서 --avatar-logo 선언을 찾지 못했다. 선언 형태가 바뀌었는지 확인한다.")
        return 1

    new_md = pattern.sub(lambda m: m.group(1) + 'url("' + uri + '")' + m.group(2), md, count=1)
    if new_md == md:
        print("✓ 이미 같은 자산이 들어 있다. 바뀐 것 없음.")
        return 0

    open(AVATAR_MD, "w", encoding="utf-8").write(new_md)
    print(f"✓ avatar.md --avatar-logo 갱신 (data URI {len(uri):,}자)")
    print("  이어서 `python3 build.py`를 실행한다.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
