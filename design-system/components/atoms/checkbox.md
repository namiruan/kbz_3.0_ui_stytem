---
file: components/atoms/checkbox.md
version: 2.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md
---

# Checkbox

## 개요

단일 또는 복수 항목 선택. 그룹으로 사용할 때는 `<fieldset>` + `<legend>`로 묶는다. Radio와의 차이 — 여러 항목을 동시에 선택할 수 있다. Indeterminate 상태는 하위 항목 중 일부만 선택된 경우에 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | md (기본, 클래스 없음) · sm → `checkbox--sm` | md |
| state | disabled → `checkbox--disabled` · error → `checkbox--error` | — |

Indeterminate는 CSS 클래스가 아닌 JS 프로퍼티로 설정한다: `input.indeterminate = true`. 체크된 상태와 별개로 표현되며, 하위 항목 중 일부만 선택된 그룹 체크박스에 사용한다.

---

## Anatomy

<!-- AI:
- root = label.checkbox. 크기·상태 클래스를 root에 조합.
- input: 네이티브 <input type="checkbox">. 숨기거나 대체하지 않는다.
- label text: span.checkbox__label.
- indeterminate: CSS 클래스 없음. JS로 input.indeterminate = true 설정.
- 그룹: <fieldset> + <legend>로 묶는다. label.checkbox를 하위에 나열.
- disabled: input에 disabled + aria-disabled="true" + tabindex="-1". root에 checkbox--disabled.
- error: root에 checkbox--error. input에 aria-invalid="true" + aria-describedby.
-->

### 기본

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">unchecked</span>
  <div class="btn-group">
    <label data-component class="checkbox checkbox--sm"><input type="checkbox" /><span class="checkbox__label">항목</span></label>
    <label data-component class="checkbox"><input type="checkbox" /><span class="checkbox__label">항목</span></label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">checked</span>
  <div class="btn-group">
    <label data-component class="checkbox checkbox--sm"><input type="checkbox" checked /><span class="checkbox__label">항목</span></label>
    <label data-component class="checkbox"><input type="checkbox" checked /><span class="checkbox__label">항목</span></label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">indeterminate</span>
  <div class="btn-group">
    <label data-component class="checkbox checkbox--sm"><input type="checkbox" id="indet-sm" /><span class="checkbox__label">항목</span></label>
    <label data-component class="checkbox"><input type="checkbox" id="indet-md" /><span class="checkbox__label">항목</span></label>
  </div>
</div>
</div>
<script>
stage.querySelector('#indet-sm').indeterminate = true;
stage.querySelector('#indet-md').indeterminate = true;
</script>
:::

### 상태

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div class="btn-group">
    <label data-component class="checkbox checkbox--sm checkbox--error"><input type="checkbox" aria-invalid="true" /><span class="checkbox__label">항목</span></label>
    <label data-component class="checkbox checkbox--error"><input type="checkbox" aria-invalid="true" /><span class="checkbox__label">항목</span></label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div class="btn-group">
    <label data-component class="checkbox checkbox--sm checkbox--disabled"><input type="checkbox" disabled aria-disabled="true" tabindex="-1" /><span class="checkbox__label">항목</span></label>
    <label data-component class="checkbox checkbox--disabled"><input type="checkbox" disabled aria-disabled="true" tabindex="-1" /><span class="checkbox__label">항목</span></label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled checked</span>
  <div class="btn-group">
    <label data-component class="checkbox checkbox--sm checkbox--disabled"><input type="checkbox" checked disabled aria-disabled="true" tabindex="-1" /><span class="checkbox__label">항목</span></label>
    <label data-component class="checkbox checkbox--disabled"><input type="checkbox" checked disabled aria-disabled="true" tabindex="-1" /><span class="checkbox__label">항목</span></label>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
  cursor: pointer;
  position: relative;
}
/* 호버 배경 레이어 — input 영역에만 표시. top 50% + translateY로 수직 중앙 정렬 */
.checkbox::before {
  content: '';
  position: absolute;
  left: calc(-1 * var(--space-4));
  top: 50%;
  transform: translateY(-50%);
  width: calc(var(--space-20) + 2 * var(--space-4));
  height: calc(var(--space-20) + 2 * var(--space-4));
  border-radius: var(--radius-sm);
  pointer-events: none;
}

/* ── Control & Label ── */
/* accent-color: 브라우저 네이티브 체크마크 색상. --color-button-brand(Primary fill)을 사용한다. */
.checkbox input[type="checkbox"] {
  width: var(--space-20);
  height: var(--space-20);
  accent-color: var(--color-button-brand);
  cursor: pointer;
  flex-shrink: 0;
}
.checkbox__label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
}

/* ── Size ── */
.checkbox--sm input[type="checkbox"] { width: var(--space-16); height: var(--space-16); }
.checkbox--sm .checkbox__label { font-size: var(--font-size-sm); }
.checkbox--sm::before {
  width: calc(var(--space-16) + 2 * var(--space-4));
  height: calc(var(--space-16) + 2 * var(--space-4));
}

/* ── Hover ── */
.checkbox:hover:not(.checkbox--disabled)::before { background: var(--color-action-brand-hover); }
.checkbox--error:hover:not(.checkbox--disabled)::before { background: var(--color-action-error-hover); }

/* ── State ── */
/* error: 체크 시 빨간 체크마크 오해 방지 — accent-color는 변경하지 않는다 */
.checkbox--error .checkbox__label { color: var(--color-text-error); }
.checkbox--disabled { pointer-events: none; }
.checkbox--disabled .checkbox__label { color: var(--color-text-disabled); }
```

---

## 접근성

체크박스·라디오 그룹 유형 (`accessibility.md` 체크박스·라디오 그룹 행 적용).

| 상황 | 마크업 |
|------|--------|
| 단일 | `<label class="checkbox"><input type="checkbox" /><span class="checkbox__label">항목</span></label>` |
| 그룹 | `<fieldset>` + `<legend>` 필수 — 스크린리더가 그룹 맥락을 각 항목 읽기 전에 함께 읽는다 |
| 에러 | `aria-invalid="true"` + `aria-describedby="[error-id]"` |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| indeterminate | `input.indeterminate = true` (JS만 가능 — HTML 속성으로 설정 불가) |

---

## Do / Don't

> ✅ DO — 그룹에 fieldset + legend 사용
> `<fieldset><legend>카테고리 선택</legend><label class="checkbox">...</label></fieldset>`

> ❌ DON'T — CSS로만 체크 표시 구현 후 네이티브 input 숨김
> 스크린리더·키보드 접근 불가. 네이티브 `<input type="checkbox">` 유지 필수

> ❌ DON'T — indeterminate를 HTML 속성으로 설정
> `<input indeterminate>` — 동작하지 않는다. `input.indeterminate = true` (JS)로만 설정 가능
