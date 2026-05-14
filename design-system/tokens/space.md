---
file: tokens/space.md
version: 1.0.0
depends-on: tokens/_index.md
---

# 공간 시스템

## Primitive

4px 기반 스케일로 구성된다. 소형(2–8px)은 컴포넌트 내부 여백에서 세밀하게, 중형(8–24px)은 4px 배수, 대형(24px~)은 8px 이상으로 점프한다.

### Space

<!-- AI: :::scale space renders primitive space tokens (4px base):
--space-2: 2px  --space-4: 4px  --space-6: 6px   --space-8: 8px
--space-12: 12px  --space-16: 16px  --space-20: 20px  --space-24: 24px
--space-32: 32px  --space-48: 48px  --space-64: 64px
-->
:::scale space

### Height

컴포넌트 클릭 영역 고정 높이. padding으로 높이를 만들지 않는다.

<!-- AI: :::scale height renders primitive height tokens (component click area):
--height-24: 24px  --height-28: 28px  --height-32: 32px
--height-36: 36px  --height-40: 40px  --height-48: 48px
-->
:::scale height

## Semantic

| 그룹 | 사용처 | 예시 |
|------|--------|------|
| `inset` | <div data-ex="space-inset"></div> 컨테이너 사방 padding | `--space-inset-xs`<br>`--space-inset-sm`<br>`--space-inset-md`<br>`--space-inset-lg`<br>`--space-inset-xl`<br>`--space-inset-2xl` |
| `inset-squish` | <div data-ex="space-inset-squish"></div> 좌우가 상하의 2배인 padding — 버튼·태그·pill | `--space-inset-squish-xs`<br>`--space-inset-squish-sm`<br>`--space-inset-squish-md`<br>`--space-inset-squish-lg`<br>`--space-inset-squish-xl`<br>`--space-inset-squish-2xl` |
| `stack` | <div data-ex="space-stack"></div> 요소 아래 세로 margin | `--space-stack-xs`<br>`--space-stack-sm`<br>`--space-stack-md`<br>`--space-stack-lg`<br>`--space-stack-xl`<br>`--space-stack-2xl` |
| `gap` | <div data-ex="space-gap"></div> flex·grid 자식 간격 — 부모에 적용 | `--space-gap-2xs`<br>`--space-gap-xs`<br>`--space-gap-sm`<br>`--space-gap-md`<br>`--space-gap-lg`<br>`--space-gap-xl`<br>`--space-gap-2xl`<br>`--space-gap-3xl` |
| `generic` | 단방향 margin 등 위 4가지로 안 되는 예외 | `--space-generic-xs`<br>`--space-generic-sm`<br>`--space-generic-md`<br>`--space-generic-lg`<br>`--space-generic-xl`<br>`--space-generic-2xl` |
| `height` | 컴포넌트 클릭 영역 고정 높이 | `--height-tight`<br>`--height-dense`<br>`--height-compact`<br>`--height-base`<br>`--height-spacious`<br>`--height-loose` |

## Do / Don't

> ✅ DO — 용도에 맞는 Semantic 사용
> `padding: var(--space-inset-md);`
> `padding: var(--space-inset-squish-md);`
> `margin-bottom: var(--space-stack-sm);`
> `gap: var(--space-gap-sm);`

> ❌ DON'T — 임의값 직접 사용
> `padding: 16px;`
> `margin-bottom: 8px;`

> ✅ DO — height 토큰으로 높이 고정
> `.btn { height: var(--height-base); display: flex; align-items: center; }`

> ❌ DON'T — padding으로 높이 조절
> `.btn { padding: 8px 16px; }`

> ✅ DO — 단방향 margin은 generic으로 값을 가져오고 방향은 CSS로 지정
> `margin-inline-end: var(--space-generic-sm);`

> ❌ DON'T — Primitive 직접 참조
> `padding: var(--space-16);`
