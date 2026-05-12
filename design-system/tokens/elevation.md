---
file: tokens/elevation.md
version: 0.8.0
depends-on: tokens/_index.md
---

# Elevation

## Primitive

### Shadow

:::shadow

### Z-Index

레이어 맥락별로 100 단위로 점프한다. backdrop(200)과 modal(210)은 같은 맥락이므로 10 단위 차이로 유지된다.

:::z-index

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

## Local Layer (Modifier)

전역 레이어 내부에서 요소 간 순서 조정이 필요할 때 `--z-above` / `--z-below` modifier를 사용한다. 새로운 전역 토큰을 추가하지 않는다.

| 토큰 | 값 | 용도 |
|------|----|------|
| `--z-above` | `1` | stacking context 내부에서 한 단계 위 |
| `--z-below` | `-1` | stacking context 내부에서 한 단계 아래 |

**사용 패턴:**

```css
/* 모달 내부 드롭다운이 모달 위에 올라와야 할 때 */
.modal-dropdown {
  z-index: calc(var(--z-modal) + var(--z-above));
}

/* 카드 내부 배지가 이미지 위에 떠야 할 때 */
.card-badge {
  z-index: calc(1 + var(--z-above));
}
```

> ⚠️ modifier는 같은 stacking context 내부에서만 사용한다. 전역 레이어 간 순서를 바꾸려면 semantic 토큰 구조를 재검토한다.

## Do / Don't

> ✅ DO — shadow와 z-index 같은 계층 사용
> `.modal { box-shadow: var(--shadow-lg); z-index: var(--z-modal); }`
> `.toast { box-shadow: var(--shadow-xl); z-index: var(--z-toast); }`

> ✅ DO — 내부 요소 순서 조정에 modifier 사용
> `.modal-select { z-index: calc(var(--z-modal) + var(--z-above)); }`

> ❌ DON'T — 임의 정수
> `.modal { z-index: 9999; }`

> ❌ DON'T — 계층 불일치 (드롭다운에 모달 그림자)
> `.dropdown { box-shadow: var(--shadow-lg); }`

> ❌ DON'T — modifier로 전역 레이어 넘기
> `.dropdown { z-index: calc(var(--z-dropdown) + var(--z-above)); }` — 결과가 sticky 범위에 들어오면 안 됨

> ⚠️ 하위 elevation에 상위 shadow 사용 금지(시각적 계층 오류).
> ⚠️ 같은 레벨 컴포넌트는 같은 shadow 토큰 사용.
