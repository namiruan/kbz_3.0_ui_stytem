---
file: tokens/radius.md
version: 1.0.0
depends-on: tokens/_index.md
---

# Radius 시스템

## Primitive

<!-- AI: :::scale radius renders primitive radius tokens:
--radius-4:    4px    (Figma: radius/small1)
--radius-6:    6px
--radius-8:    8px
--radius-12:  12px
--radius-16:  16px
--radius-1000: 1000px (Figma: radius/max — pill)
-->
:::scale radius

## Semantic

컴포넌트 shape 변형에 따라 radius 토큰이 결정된다. sharp는 radius 미적용(`border-radius: 0`), rounded는 `size` 그룹, pill은 `--radius-pill`.

| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| `size` | 크기별 border-radius — 컴포넌트 기본 shape | `--radius-xs`<br>`--radius-sm`<br>`--radius-md`<br>`--radius-lg`<br>`--radius-xl` |
| `pill` | shape: round — 태그·배지·pill 버튼 | `--radius-pill` |

## Do / Don't

> ✅ DO — Semantic 토큰 사용
> `border-radius: var(--radius-pill);`
> `border-radius: var(--radius-sm);`

> ❌ DON'T — 임의값 직접 사용
> `border-radius: 1000px;`
> `border-radius: 4px;`

> ⚠️ Figma에 없는 radius 값을 임의로 추가하지 않는다. 새 값이 필요하면 Figma에 먼저 정의한 후 추출한다.
