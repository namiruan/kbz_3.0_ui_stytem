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
| color | `--color-[팔레트]-[50–900]`<br>`--color-brand-500`, `--color-gray-100` | `--color-[맥락]-[변형]`<br>`--color-text-primary`, `--color-surface-base` |
| space | `--space-[px값]`<br>`--space-8`, `--space-16` | `--space-[유형]-[크기]`<br>`--space-inset-md`, `--space-gap-sm` |
| font-size | `--font-size-[px값]`<br>`--font-size-15` | `--font-size-[역할]`<br>`--font-size-body`, `--font-size-caption` |
| font-weight | `--font-weight-[weight명]`<br>`--font-weight-semibold` | Primitive 그대로 사용 |
| radius | `--radius-[px값]`<br>`--radius-4`, `--radius-1000` | `--radius-[크기]`<br>`--radius-sm`, `--radius-pill` |
| height | `--height-[px값]`<br>`--height-36` | 컴포넌트에서 직접 사용 |
| shadow | — | `--shadow-[크기]`<br>`--shadow-md`, `--shadow-lg` |
| z-index | — | `--z-[맥락]`<br>`--z-modal`, `--z-toast` |
| duration | — | `--duration-[속도]`<br>`--duration-fast`, `--duration-base` |

**Component** (color만 해당): `--color-[컴포넌트]-[변형]-[역할]` → `--color-button-primary-fill`

## Do / Don't

> ✅ DO — Semantic을 통해 참조
> `background: var(--color-button-primary-fill);`

> ❌ DON'T — Primitive 직접 사용
> `background: var(--color-brand-600);`

> ❌ DON'T — hex 직접 사용
> `background: #115ac6;`

Component 토큰은 복잡한 컴포넌트(Modal, Table)의 고유값에만 사용한다.<br>
Button·Badge처럼 단순한 컴포넌트는 Semantic만으로 충분하다.
