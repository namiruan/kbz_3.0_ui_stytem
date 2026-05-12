---
file: tokens/elevation.md
version: 0.5.0
depends-on: tokens/_index.md
---

# Elevation

## Semantic

z축(깊이)을 shadow와 z-index 두 가지로 표현한다. 둘은 항상 같은 계층을 참조한다.

| 계층 | 사용처 | shadow | z-index |
|------|--------|--------|---------|
| `base` | 카드, hover 강조 | `--shadow-sm` | — |
| `dropdown` | 드롭다운, 팝오버 | `--shadow-md` | `--z-dropdown` |
| `sticky` | 고정 헤더, 컬럼 | — | `--z-sticky` |
| `backdrop` | 모달 배경막 | — | `--z-backdrop` |
| `modal` | 모달, 사이드 패널 | `--shadow-lg` | `--z-modal` |
| `toast` | Toast, 최상위 알림 | `--shadow-xl` | `--z-toast` |
| `tooltip` | 툴팁 | `--shadow-md` | `--z-tooltip` |

## Do / Don't

> ✅ DO — shadow와 z-index 같은 계층 사용
> `.modal { box-shadow: var(--shadow-lg); z-index: var(--z-modal); }`
> `.toast { box-shadow: var(--shadow-xl); z-index: var(--z-toast); }`

> ❌ DON'T — 임의 정수
> `.modal { z-index: 9999; }`

> ❌ DON'T — 계층 불일치 (드롭다운에 모달 그림자)
> `.dropdown { box-shadow: var(--shadow-lg); }`

> ⚠️ 하위 elevation에 상위 shadow 사용 금지(시각적 계층 오류).
> ⚠️ 같은 레벨 컴포넌트는 같은 shadow 토큰 사용.
