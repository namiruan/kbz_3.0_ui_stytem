---
file: components/atoms/badge.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/radius.md
---

# Badge

## 개요

상태·분류·수량을 나타내는 인라인 레이블. 비인터랙티브 컴포넌트이며 클릭 가능한 분류 필터에는 Tag를 사용한다.

---

## Anatomy

<!-- AI: root(.badge). 텍스트만 포함하거나 앞에 dot indicator를 추가할 수 있다. -->

```html
<!-- 기본 -->
<span class="badge badge--neutral badge--md">진행 중</span>

<!-- dot indicator 포함 -->
<span class="badge badge--success badge--md">
  <span class="badge__dot" aria-hidden="true"></span>
  완료
</span>
```

:::preview
<style>
  .badge {
    display: inline-flex; align-items: center; gap: var(--space-gap-2xs);
    border-radius: var(--radius-pill);
    font-family: var(--font-family-base);
    font-weight: var(--font-weight-heading);
    white-space: nowrap;
  }
  .badge--sm { height: var(--height-tight); padding: var(--space-inset-squish-xs); font-size: var(--font-size-meta); }
  .badge--md { height: var(--height-dense); padding: var(--space-inset-squish-sm); font-size: var(--font-size-label); }
  .badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }

  .badge--neutral { background: var(--color-surface-neutral); color: var(--color-text-label); }
  .badge--brand   { background: var(--color-surface-brand-subtle); color: var(--color-text-brand-vivid); }
  .badge--info    { background: var(--color-surface-info-subtle); color: var(--color-text-info); }
  .badge--success { background: var(--color-surface-success-subtle); color: var(--color-text-success, var(--color-text-brand)); }
  .badge--caution { background: var(--color-surface-caution-subtle); color: var(--color-text-caution); }
  .badge--error   { background: var(--color-surface-error-subtle); color: var(--color-text-error); }
</style>
<div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
  <span class="badge badge--neutral badge--md">중립</span>
  <span class="badge badge--brand badge--md">브랜드</span>
  <span class="badge badge--info badge--md">정보</span>
  <span class="badge badge--success badge--md"><span class="badge__dot" aria-hidden="true"></span>성공</span>
  <span class="badge badge--caution badge--md">주의</span>
  <span class="badge badge--error badge--md">오류</span>
</div>
:::

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | neutral · brand · info · success · caution · error | neutral |
| size | sm · md | md |

---

## 접근성

비인터랙티브 컴포넌트. 키보드 접근·focus·disabled 불해당.

색상 대비 해당 — 배경과 텍스트 색상 4.5:1 이상 유지.

색상만으로 의미를 전달하지 않는다. 텍스트 레이블이 항상 포함되어야 한다.

---

## Do / Don't

> ✅ DO — 텍스트 레이블과 함께 사용
> `<span class="badge badge--error badge--md">오류</span>`

> ❌ DON'T — 색상만으로 상태 전달
> 빨간 dot만 표시하고 텍스트 없이 사용 금지

> ❌ DON'T — 클릭 가능한 필터에 Badge 사용
> 인터랙티브 용도에는 Tag 사용
