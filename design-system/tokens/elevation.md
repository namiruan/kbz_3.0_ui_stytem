---
file: tokens/elevation.md
version: 0.4.1
depends-on: tokens/_index.md
---

# Elevation & 그림자


그림자는 z축 거리감과 z-index 계층을 시각화한다.
Shadow 레벨과 z-index는 1:1로 매칭한다. 충돌 시 토큰값만 사용한다.

| 토큰 | 사용처 | z-index 매칭 |
|------|--------|-------------|
| `--shadow-sm` | 카드 기본, hover 강조 | base |
| `--shadow-md` | 드롭다운, 팝오버, 툴팁 | `--z-dropdown` / `--z-tooltip` |
| `--shadow-lg` | 모달, 사이드 패널 | `--z-modal` |
| `--shadow-xl` | Toast, 최상위 알림 | `--z-toast` |

## Do / Don't

```css
/* ✅ DO */
.modal { box-shadow: var(--shadow-lg); z-index: var(--z-modal); }
.toast { box-shadow: var(--shadow-xl); z-index: var(--z-toast); }

/* ❌ DON'T — 임의 정수 */
.modal { z-index: 9999; }

/* ❌ DON'T — 계층 불일치 (드롭다운에 모달 그림자) */
.dropdown { box-shadow: var(--shadow-lg); }
```

> ⚠️ 하위 elevation에 상위 shadow 사용 금지(시각적 계층 오류).
> ⚠️ 같은 레벨 컴포넌트는 같은 shadow 토큰 사용.
