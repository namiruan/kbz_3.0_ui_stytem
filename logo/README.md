# logo/

김반장 로고 **원본 자산**을 두는 곳. 아이콘이 아니다 — `icons/`는 `sync_icons.py`가 Figma에서 통째로 덮어쓰는 영역이고, 단색 `currentColor` 24×24 규격이다. 로고는 고유 색을 가진 브랜드 자산이라 그 규칙 밖에 둔다.

## 넣는 파일

| 파일 | 필수 | 규격 |
|---|---|---|
| `logo-kbz.svg` | 있으면 우선 | 정사각 `viewBox`. 색은 그대로 둔다(`currentColor`로 바꾸지 않는다) |
| `logo-kbz.png` | svg가 없을 때 | **정사각 · 192px 이상 · 배경 투명** |

**이름은 안 맞춰도 된다.** svg나 png를 하나만 넣으면 `embed_logo.py`가 위 이름으로 바꾼다. 자산을 넣는 사람이 파일명 규칙까지 외울 이유가 없다. 같은 확장자가 둘 이상이면 어느 것이 로고인지 알 수 없으므로 멈춘다.

192px인 이유 — Avatar의 가장 큰 크기가 48px이고 3배 화면에서 144px로 그려진다. 그보다 작으면 프로필 화면에서 흐려진다.

두 파일이 다 있으면 **svg를 쓴다.** 벡터가 어느 크기에서도 선명하고 용량도 작다.

## 넣은 다음

```bash
python3 scripts/embed_logo.py   # 자산 → avatar.md의 --avatar-logo 갱신
python3 build.py                # components.css · design-system.html 재생성
```

`embed_logo.py`가 자산을 data URI로 인코딩해
`design-system/components/atoms/avatar.md`의 `--avatar-logo` 한 줄을 바꿔 쓴다.

## 왜 CSS가 이 파일을 직접 가리키지 않고 data URI로 박는가

상대 경로(`url("logo/logo-kbz.png")`)는 **문서 위치에 따라 깨진다.** 컴포넌트 CSS는 `components.css`로도 번들되고 `design-system.html`에 인라인으로도 주입되며, 프로토타입 HTML은 아무 폴더에나 놓인다. 그때마다 기준 경로가 달라진다.

시스템의 다른 자산도 같은 이유로 인라인이다 — `build.py`가 파일 68개를 `design-system.html` 안에 임베드한다. 로고만 예외로 둘 이유가 없다.

이 폴더는 그래서 **빌드 입력**이지 배포 산출물이 아니다. 원본을 잃지 않기 위해 커밋한다.
