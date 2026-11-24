# logo/

김반장 로고 **원본 자산**을 두는 곳. 아이콘이 아니다 — `icons/`는 `sync_icons.py`가 Figma에서 통째로 덮어쓰는 영역이고, 단색 `currentColor` 24×24 규격이다. 로고는 고유 색을 가진 브랜드 자산이라 그 규칙 밖에 둔다.

## 들어 있는 자산

Figma 로고 컴포넌트 세트를 내보낸 것이다. 축이 둘 — **layout**(심볼만 / 이름까지) × **배경**(밝은 면 / 어두운 면 / 단색). svg·png가 짝으로 있다.

| 파일 | 무엇 | 쓰는 곳 |
|---|---|---|
| `logo-kbz.svg` · `.png` | **심볼만**, 컬러 | **Avatar 기본값의 원본.** 좁은 자리에 로고를 넣을 때 |
| `logo-kbz-mono.svg` · `.png` | 심볼만, 단색 | 색을 못 쓰는 인쇄·워터마크 |
| `logo-kbz-full.svg` · `.png` | 심볼 + 이름, 이름이 남색 | **밝은 면** 위 — 상단바·문서 머리 |
| `logo-kbz-full-inverse.svg` · `.png` | 심볼 + 이름, 이름이 흰색 | **어두운 면** 위 (`--color-surface-brand` 등) |
| `logo-kbz-full-mono.svg` · `.png` | 심볼 + 이름, 단색 | 색을 못 쓰는 인쇄·워터마크 |

Figma의 `background=light`/`dark`는 **자산 자신의 색이 아니라 놓일 배경**을 뜻한다(`dark`가 흰 글씨다). 헷갈리기 쉬워 시스템의 어휘(`--color-text-inverse` = 어두운 배경 위 텍스트)에 맞춰 `-inverse`로 바꿔 두었다.

`layout=only symbol`의 `light`와 `dark`는 **시각적으로 같았다** — 심볼에는 글자가 없어 배경별 변형이 생기지 않는다(그라디언트 id만 달랐다). 같은 그림을 두 이름으로 두면 갈라지므로 하나만 남겼다.

### Avatar가 쓰는 것은 `logo-kbz.svg` 하나다

심볼만 쓴다 — 이름까지 든 `full`은 가로로 길어 24~48px 원 안에서 글자가 뭉갠다. `embed_logo.py`가 이 이름을 먼저 찾는다.

### 자산을 갈아끼울 때

- **이름은 안 맞춰도 된다.** `logo/`에 svg나 png가 **하나만** 있으면 `embed_logo.py`가 `logo-kbz.{확장자}`로 바꾼다. 지금처럼 여러 개가 있을 때는 정식 이름으로 넣는다.
- png로 대체한다면 **짧은 변 192px 이상 · 배경 투명.** Avatar 최대 48px × 3배 화면 = 144px이라 그보다 작으면 프로필 화면에서 흐려진다. **정사각일 필요는 없다** — 심볼 자체가 49:37이고, CSS가 너비만 잡고 높이는 비율대로 둔다. 다만 자산 안쪽에 여백을 구워 넣지 않는다(여백은 CSS의 `background-size`가 정한다).
- 지금 들어 있는 png는 Figma 내보내기 그대로다(심볼 193×148). Avatar는 svg를 쓰므로 이 크기는 영향이 없고, png는 웹 밖(문서·인쇄)용으로 남겨 둔 것이다.
- svg와 png가 다 있으면 **svg를 쓴다.** 벡터가 어느 크기에서도 선명하고 용량도 작다.

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
