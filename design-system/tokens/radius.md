---
file: tokens/radius.md
version: 1.0.0
depends-on: tokens/_index.md
---

# Radius 시스템

## Primitive

:::scale radius

## Semantic

Variant 모델의 `shape` 차원이 radius 토큰에 직접 대응한다.

| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| `size` | 크기별 border-radius — 컴포넌트 기본 shape | `--radius-sm`(4px), `--radius-md`(8px, base), `--radius-lg`(12px), `--radius-xl`(16px) |
| `pill` | shape: round — 태그·배지·pill 버튼 | `--radius-pill` |

## Do / Don't

> ✅ DO — Semantic 토큰 사용
> `border-radius: var(--radius-pill);`
> `border-radius: var(--radius-sm);`

> ❌ DON'T — 임의값 직접 사용
> `border-radius: 1000px;`
> `border-radius: 4px;`

> ⚠️ Figma에 없는 radius 값을 임의로 추가하지 않는다. 새 값이 필요하면 Figma에 먼저 정의한 후 추출한다.
