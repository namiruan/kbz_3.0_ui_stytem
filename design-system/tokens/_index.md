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
> Semantic 패턴은 최대 3단계([속성]-[맥락]-[변형])이며, 맥락 차원이 의미 없는 토큰은 2단계도 유효하다.
> `radius`(코너 크기만 존재), `height`(density가 맥락), `shadow`·`duration`·`z-index` 등이 해당한다.
> typography는 4축(font-size·line-height·letter-spacing·font-weight)을 각각 독립적인 Semantic으로 정의하고,
> use case별 묶음은 `.text-*` 유틸 클래스로 제공한다 (자세한 내용은 typography.md).

| 토큰 | Primitive | Semantic |
|------|-----------|----------|
| **패턴** | --[속성]-[값] | --[속성]-[맥락]-[변형] |
| color | --color-[팔레트]-[50–900]<br>`--color-brand-500`<br>`--color-gray-100` | --color-[맥락]-[변형]<br>`--color-text-body`<br>`--color-surface-base` |
| space | --space-[px값]<br>`--space-8`<br>`--space-16` | --space-[유형]-[크기]<br>`--space-inset-md`<br>`--space-gap-sm` |
| font-size | --font-size-[px값]<br>`--font-size-11`<br>`--font-size-14` | --font-size-[역할]<br>`--font-size-base`<br>`--font-size-h1` |
| font-weight | --font-weight-[weight명]<br>`--font-weight-semibold` | --font-weight-[강조]<br>`--font-weight-body`<br>`--font-weight-heading`<br>`--font-weight-display` |
| line-height | --line-height-[밀도]<br>`--line-height-tight`<br>`--line-height-base`<br>`--line-height-relaxed` | --line-height-[성질]<br>`--line-height-ui`<br>`--line-height-reading`<br>`--line-height-prose` |
| letter-spacing | --letter-spacing-[크기]<br>`--letter-spacing-tight`<br>`--letter-spacing-normal`<br>`--letter-spacing-wide` | --letter-spacing-[계층]<br>`--letter-spacing-default`<br>`--letter-spacing-display` |
| font-family | — | --font-family-[유형]<br>`--font-family-base` |
| text utility | — | .text-[use case]<br>`.text-button-md`<br>`.text-body`<br>`.text-page-title` |
| radius | --radius-[px값]<br>`--radius-4`<br>`--radius-1000` | --radius-[크기]<br>`--radius-sm`<br>`--radius-pill` |
| height | --height-[px값]<br>`--height-32`<br>`--height-36` | --height-[density]<br>`--height-compact`<br>`--height-base`<br>`--height-spacious` |
| shadow | — | --shadow-[크기]<br>`--shadow-md`<br>`--shadow-lg` |
| z-index | — | --z-[맥락]<br>`--z-modal`<br>`--z-toast` |
| duration | — | --duration-[속도]<br>`--duration-fast`<br>`--duration-base` |

> Component 토큰은 복잡한 컴포넌트(Modal, Table)의 고유값에만 사용한다.<br>
> Button·Badge처럼 단순한 컴포넌트는 Semantic만으로 충분하다.


| 토큰 | Component |
|------|-----------|
| **패턴** | --[속성]-[컴포넌트]-[변형]-[역할] |
| color | `--color-button-primary-fill` |



## Do / Don't

> ✅ DO — Semantic을 통해 참조
> `background: var(--color-button-primary-fill);`

> ❌ DON'T — Primitive 직접 사용
> `background: var(--color-brand-600);`

> ❌ DON'T — hex 직접 사용
> `background: #115ac6;`

