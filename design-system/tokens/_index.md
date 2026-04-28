---
file: tokens/_index.md
version: 0.4.2
---

# 토큰 아키텍처 (3-tier)


Primitive(원시값) → Semantic(용도 부여) → Component(컴포넌트 전용) 순으로 참조한다.

| Tier | 위치 | 컴포넌트에서 직접 사용 |
|------|------|----------------------|
| Primitive | `tokens.css` 상단 | ❌ 금지 |
| Semantic | `tokens.css` 중단 | ✅ 사용 |
| Component | 각 `.md` 스펙 섹션 | ✅ 사용 |

## 네이밍 규칙

| 토큰 | Primitive | Semantic |
|------|-----------|----------|
| color | `--color-brand-500`<br>`--color-gray-100` | `--color-text-primary`<br>`--color-surface-base`<br>`--color-border-default` |
| space | `--space-8`<br>`--space-16` | `--space-inset-md`<br>`--space-gap-sm`<br>`--space-stack-sm` |
| font-size | `--font-size-15` | `--font-size-body`<br>`--font-size-caption` |
| font-weight | `--font-weight-semibold` | Primitive 그대로 사용 |
| radius | `--radius-4`<br>`--radius-1000` | `--radius-sm`<br>`--radius-pill` |
| height | `--height-36` | 컴포넌트에서 직접 사용 |
| shadow | — | `--shadow-md`<br>`--shadow-lg` |
| z-index | — | `--z-modal`<br>`--z-toast` |
| duration | — | `--duration-fast`<br>`--duration-base` |

## Do / Don't

> ✅ DO — Semantic을 통해 참조
> `background: var(--color-button-primary-fill);`

> ❌ DON'T — Primitive 직접 사용
> `background: var(--color-brand-600);`

> ❌ DON'T — hex 직접 사용
> `background: #115ac6;`

Component 토큰은 복잡한 컴포넌트(Modal, Table)의 고유값에만 사용한다.<br>
Button·Badge처럼 단순한 컴포넌트는 Semantic만으로 충분하다.
