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

## Do / Don't

> ✅ DO — Semantic을 통해 참조
> `background: var(--color-button-primary-fill);`

> ❌ DON'T — Primitive 직접 사용
> `background: var(--color-brand-600);`

> ❌ DON'T — hex 직접 사용
> `background: #115ac6;`

> 💡 Primitive = Global = Base  /  Semantic = Alias = Decision
> 업계마다 이름이 다르지만 같은 개념이다.

Component 토큰은 복잡한 컴포넌트(Modal, Table)의 고유값에만 사용한다.
Button·Badge처럼 단순한 컴포넌트는 Semantic만으로 충분하다.

## 관련 문서
- `tokens/space.md` — 공간 토큰
- `tokens/color.md` — 색상 토큰
- `tokens/typography.md` — 타이포 토큰
- `tokens/radius.md` · `tokens/elevation.md` · `tokens/motion.md` · `tokens/icon.md`
