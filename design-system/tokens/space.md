---
file: tokens/space.md
version: 1.0.0
depends-on: tokens/_index.md
---

# 공간 시스템

Primitive는 px 고정값 스케일로 구성된다.
Semantic은 용도를 이름에 담아 Primitive를 참조한다.

## Primitive

### Space

:::scale space

### Height

컴포넌트 클릭 영역 고정 높이. padding으로 높이를 만들지 않는다.

:::scale height

## Semantic

| 그룹 | 사용처 | 예시 |
|------|--------|------|
| `inset` | 컨테이너 사방 padding | `--space-inset-xs`, `--space-inset-sm`, `--space-inset-md`, `--space-inset-lg`, `--space-inset-xl` |
| `inset-squish` | 좌우가 상하의 2배인 padding — 버튼·태그·pill | `--space-inset-squish-xs`, `--space-inset-squish-sm`, `--space-inset-squish-md`, `--space-inset-squish-lg` |
| `stack` | 요소 아래 세로 margin | `--space-stack-xs`, `--space-stack-sm`, `--space-stack-md`, `--space-stack-lg`, `--space-stack-xl`, `--space-stack-2xl` |
| `gap` | flex·grid 자식 간격 — 부모에 적용 | `--space-gap-xs`, `--space-gap-sm`, `--space-gap-md`, `--space-gap-lg`, `--space-gap-xl` |
| `generic` | 단방향 margin 등 위 4가지로 안 되는 예외 | `--space-generic-xs`, `--space-generic-sm`, `--space-generic-md`, `--space-generic-lg`, `--space-generic-xl` |
| `height` | 컴포넌트 클릭 영역 고정 높이 | `--height-compact`, `--height-base`, `--height-spacious` |

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
