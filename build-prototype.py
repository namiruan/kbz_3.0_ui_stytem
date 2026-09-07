#!/usr/bin/env python3
"""
build-prototype.py — 프로토타입 공용 파셜 주입(빌드 시 include)

사용법:  python3 build-prototype.py <prototype.src.html> [more.src.html ...]

동작:
  소스 파일 안의  <!-- @include: <path> -->  마커를 찾아 그 자리에 파셜 파일
  내용을 주입한 "서빙용" HTML을 생성한다. 공용 오버레이(예: 사업장 선택 Modal)를
  파셜 한 벌로 두고 여러 프로토타입이 같은 파셜을 include → 수정 시 파셜만 고치고
  재빌드하면 모든 프로토타입에 반영된다(복제·수동 동기화 제거).

  include 경로는 그 파일이 있는 디렉터리 기준 상대 경로다(예: _shared/site-select.html).
  파셜 안에서도 @include를 쓸 수 있다(중첩, 순환·깊이 가드 있음).

출력 파일명:
  foo.src.html  →  foo.html         (.src 제거)
  foo.html      →  foo.built.html   (소스가 .src가 아니면 .built 접미사)

종료 코드:  0 = 성공 / 1 = 오류(파일·파셜 없음, 순환 include, 깊이 초과 등)
"""

import sys, os, re

MAX_DEPTH = 10
INCLUDE_RE = re.compile(r'[ \t]*<!--\s*@include:\s*(\S+?)\s*-->')


def out_path(src):
    if src.endswith('.src.html'):
        return src[:-len('.src.html')] + '.html'
    if src.endswith('.html'):
        return src[:-len('.html')] + '.built.html'
    return src + '.built.html'


def expand(html, base_dir, chain):
    """base_dir 기준으로 @include 마커를 파셜 내용으로 치환. chain = 순환 감지용 절대경로 목록."""
    def repl(m):
        rel = m.group(1)
        full = os.path.normpath(os.path.join(base_dir, rel))
        if not os.path.exists(full):
            raise ValueError(f'파셜을 찾을 수 없음: {rel} (기준: {base_dir})')
        if full in chain:
            raise ValueError(f'순환 include 감지: {rel}')
        if len(chain) >= MAX_DEPTH:
            raise ValueError(f'include 깊이 초과(>{MAX_DEPTH}): {rel}')
        with open(full, encoding='utf-8') as f:
            content = f.read()
        # 파셜 안의 include는 그 파셜 위치 기준으로 중첩 확장
        return expand(content, os.path.dirname(full), chain + [full])
    return INCLUDE_RE.sub(repl, html)


def build(src):
    if not os.path.exists(src):
        raise ValueError(f'소스 파일을 찾을 수 없음: {src}')
    with open(src, encoding='utf-8') as f:
        html = f.read()
    result = expand(html, os.path.dirname(os.path.abspath(src)), [os.path.abspath(src)])
    dst = out_path(src)
    with open(dst, 'w', encoding='utf-8') as f:
        f.write(result)
    n = len(INCLUDE_RE.findall(html))
    return dst, n


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    had_error = False
    for src in sys.argv[1:]:
        try:
            dst, n = build(src)
            print(f'✓ {src} → {dst}  (@include {n}개 주입)')
        except ValueError as e:
            print(f'✗ {src}: {e}')
            had_error = True
    sys.exit(1 if had_error else 0)


if __name__ == '__main__':
    main()
