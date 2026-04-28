---
file: tokens/elevation.md
version: 0.4.3
depends-on: tokens/_index.md
---

# Elevation

z축(깊이)을 shadow와 z-index 두 가지로 표현한다. 둘은 항상 같은 계층을 참조한다.

| 계층 | shadow | z-index | 사용처 |
|------|--------|---------|--------|
| base | `--shadow-sm` | — | 카드, hover 강조 |
| dropdown | `--shadow-md` | `--z-dropdown` (100) | 드롭다운, 팝오버 |
| sticky | — | `--z-sticky` (150) | 고정 헤더, 컬럼 |
| backdrop | — | `--z-backdrop` (200) | 모달 배경막 |
| modal | `--shadow-lg` | `--z-modal` (210) | 모달, 사이드 패널 |
| toast | `--shadow-xl` | `--z-toast` (300) | Toast, 최상위 알림 |
| tooltip | `--shadow-md` | `--z-tooltip` (400) | 툴팁 |

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
