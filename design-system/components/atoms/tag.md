---
file: components/atoms/tag.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/motion.md
---

# Tag

## 개요

분류·필터·속성을 표시하는 인라인 레이블. Badge와의 차이 — 선택/제거 인터랙션이 가능하다. 비인터랙티브 단순 레이블에는 Badge를 사용한다.

---

## Anatomy

<!-- AI: root(.tag), label(.tag__label), remove button(.tag__remove, optional). 인터랙티브 여부에 따라 <span> 또는 <button> 사용. -->

```html
<!-- 읽기 전용 (비인터랙티브) -->
<span class="tag tag--neutral">디자인</span>

<!-- 선택 가능 -->
<button class="tag tag--neutral tag--selectable">디자인</button>

<!-- 선택됨 -->
<button class="tag tag--brand tag--selected" aria-pressed="true">디자인</button>

<!-- 제거 가능 -->
<span class="tag tag--neutral tag--removable">
  <span class="tag__label">디자인</span>
  <button class="tag__remove" aria-label="디자인 제거">
    <span aria-hidden="true"><!-- icon close --></span>
  </button>
</span>
```

:::preview
<style>
  .tag {
    display: inline-flex; align-items: center; gap: var(--space-gap-xs);
    height: var(--height-dense);
    padding: var(--space-inset-squish-sm);
    border-radius: var(--radius-pill);
    border: var(--stroke-sm) var(--stroke-solid) transparent;
    font-family: var(--font-family-base);
    font-size: var(--font-size-label);
    white-space: nowrap;
    cursor: default;
  }
  .tag--selectable, .tag__remove { cursor: pointer; }
  .tag--neutral { background: var(--color-surface-neutral); color: var(--color-text-label); border-color: var(--color-border-subtle); }
  .tag--brand, .tag--selected { background: var(--color-surface-brand-subtle); color: var(--color-text-brand-vivid); border-color: var(--color-border-brand); }
  .tag--selectable:hover { background: var(--color-action-neutral-hover); }
  .tag--selectable:focus-visible, .tag__remove:focus-visible { outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px; }
  .tag__remove { display: inline-flex; align-items: center; background: none; border: none; padding: 0; color: inherit; }
</style>
<div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
  <span class="tag tag--neutral">읽기 전용</span>
  <button class="tag tag--neutral tag--selectable">선택 가능</button>
  <button class="tag tag--brand tag--selected" aria-pressed="true">선택됨</button>
  <span class="tag tag--neutral tag--removable">
    <span class="tag__label">제거 가능</span>
    <button class="tag__remove" aria-label="제거 가능 제거">✕</button>
  </span>
</div>
:::

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | neutral · brand | neutral |
| 인터랙션 | (없음) · selectable · removable | (없음) |

---

## 접근성

버튼 유형 (선택/제거 인터랙션이 있는 경우, `design-system/accessibility.md` 버튼 행 적용).

- 선택 가능한 Tag: `<button>` 사용. 선택 상태는 `aria-pressed="true/false"`.
- 제거 버튼: `aria-label="[태그명] 제거"` 필수.
- 읽기 전용 Tag: `<span>` 사용. 인터랙션 없음.

---

## Do / Don't

> ✅ DO — 선택 가능한 Tag는 `<button>` 사용
> `<button class="tag tag--selectable" aria-pressed="false">디자인</button>`

> ❌ DON'T — 상태 표시용 레이블에 Tag 사용
> 비인터랙티브 상태 레이블에는 Badge 사용

> ✅ DO — 제거 버튼에 태그명 포함한 `aria-label` 제공
> `<button aria-label="디자인 제거">`
