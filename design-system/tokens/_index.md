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

| Tier | 패턴 | 규칙 & 예시 |
|------|------|------------|
| Primitive | `--[속성]-[값]` | `space`·`height`·`radius` → px값 → `--space-8`, `--height-36`<br>`color` → 밝기 스케일 50–900 → `--color-brand-500`<br>`font-weight` → CSS weight값 → `--font-weight-medium` |
| Semantic | `--[속성]-[맥락]-[변형]` | 크기: `xs`·`sm`·`md`·`lg`·`xl` → `--space-inset-md`, `--radius-sm`<br>강도: `default`·`emphasis`·`strong` → `--color-border-default`<br>중요도: `primary`·`secondary`·`tertiary` → `--color-text-primary` |
| Component | `--[속성]-[컴포넌트]-[변형]-[역할]` | `--color-button-primary-fill` |

## Do / Don't

> ✅ DO — Semantic을 통해 참조
> `background: var(--color-button-primary-fill);`

> ❌ DON'T — Primitive 직접 사용
> `background: var(--color-brand-600);`

> ❌ DON'T — hex 직접 사용
> `background: #115ac6;`

Component 토큰은 복잡한 컴포넌트(Modal, Table)의 고유값에만 사용한다.<br>
Button·Badge처럼 단순한 컴포넌트는 Semantic만으로 충분하다.
