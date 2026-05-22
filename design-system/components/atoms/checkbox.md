---
file: components/atoms/checkbox.md
version: 3.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/typography.md
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
- input: 네이티브 <input type="checkbox">. appearance: none으로 시각적으로만 제거하고 control 위에 절대 위치. 접근성 트리 유지 필수 — display:none / visibility:hidden 금지.
- control: span.checkbox__control. 시각적 체크박스 박스. aria-hidden="true".
  - checked: CSS :checked로 background brand-selected + border brand + checkbox__icon-check 표시.
  - indeterminate: CSS :indeterminate로 background brand-selected + border brand만 적용. 아이콘 없음. JS input.indeterminate = true 필요.
- check icon: span.checkbox__icon-check. CSS :checked 의사클래스로 display: flex 전환.
- label text: span.checkbox__label.
- 그룹: <fieldset class="checkbox-group"> + <legend>로 묶는다. label.checkbox를 하위에 나열. gap은 --space-stack-sm.
- disabled: input에 disabled + aria-disabled="true" + tabindex="-1". root에 checkbox--disabled.
- error: root에 checkbox--error. input에 aria-invalid="true" + aria-describedby.
-->

### 기본

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">unchecked</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-xl)">
    <label data-component class="checkbox checkbox--sm">
      <input type="checkbox" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
      <span class="checkbox__label">선택 안 함</span>
    </label>
    <label data-component class="checkbox">
      <input type="checkbox" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
      <span class="checkbox__label">선택 안 함</span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">checked</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-xl)">
    <label data-component class="checkbox checkbox--sm">
      <input type="checkbox" checked />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
      <span class="checkbox__label">선택함</span>
    </label>
    <label data-component class="checkbox">
      <input type="checkbox" checked />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
      <span class="checkbox__label">선택함</span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">indeterminate</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-xl)">
    <label data-component class="checkbox checkbox--sm">
      <input type="checkbox" id="indet-sm" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
      <span class="checkbox__label">일부 선택됨</span>
    </label>
    <label data-component class="checkbox">
      <input type="checkbox" id="indet-md" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
      <span class="checkbox__label">일부 선택됨</span>
    </label>
  </div>
</div>
</div>
<script>
stage.querySelector('#indet-sm').indeterminate = true;
stage.querySelector('#indet-md').indeterminate = true;
</script>
:::

### 그룹

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">vertical</span>
  <fieldset data-component class="checkbox-group">
    <legend style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);margin-bottom:var(--space-stack-xs);">알림 설정</legend>
    <label class="checkbox"><input type="checkbox" checked /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">이메일 알림</span></label>
    <label class="checkbox"><input type="checkbox" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">SMS 알림</span></label>
    <label class="checkbox"><input type="checkbox" checked /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">푸시 알림</span></label>
  </fieldset>
</div>
</div>
:::

### 상태

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-xl)">
    <label data-component class="checkbox checkbox--sm checkbox--error">
      <input type="checkbox" aria-invalid="true" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
      <span class="checkbox__label">선택 필요</span>
    </label>
    <label data-component class="checkbox checkbox--error">
      <input type="checkbox" aria-invalid="true" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
      <span class="checkbox__label">선택 필요</span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-xl)">
    <label data-component class="checkbox checkbox--sm checkbox--disabled">
      <input type="checkbox" disabled aria-disabled="true" tabindex="-1" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
      <span class="checkbox__label">현재 선택 불가</span>
    </label>
    <label data-component class="checkbox checkbox--disabled">
      <input type="checkbox" disabled aria-disabled="true" tabindex="-1" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
      <span class="checkbox__label">현재 선택 불가</span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled checked</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-xl)">
    <label data-component class="checkbox checkbox--sm checkbox--disabled">
      <input type="checkbox" checked disabled aria-disabled="true" tabindex="-1" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
      <span class="checkbox__label">변경할 수 없는 선택</span>
    </label>
    <label data-component class="checkbox checkbox--disabled">
      <input type="checkbox" checked disabled aria-disabled="true" tabindex="-1" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
      <span class="checkbox__label">변경할 수 없는 선택</span>
    </label>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Group ── */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
  border: none;
  padding: 0;
  margin: 0;
}

/* ── Base ── */
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
  cursor: pointer;
}

/* input: 시각적으로만 제거. control 위에 위치해 포커스 링이 control에 정렬된다 */
.checkbox input[type="checkbox"] {
  appearance: none;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: var(--space-20);
  height: var(--space-20);
  margin: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1;
}

/* ── Control ── */
.checkbox__control {
  width: var(--space-20);
  height: var(--space-20);
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  flex-shrink: 0;
}

/* checked: 체크 아이콘 */
.checkbox__icon-check { display: none; }
.checkbox__icon-check svg { width: var(--icon-sm); height: var(--icon-sm); display: block; }
.checkbox input:checked ~ .checkbox__control .checkbox__icon-check { display: flex; }


.checkbox input:checked ~ .checkbox__control,
.checkbox input:indeterminate ~ .checkbox__control {
  background: var(--color-action-brand-selected);
  border-color: var(--color-border-focus);
  color: var(--color-button-brand);
}

/* ── Label ── */
.checkbox__label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
}

/* ── Size ── */
.checkbox--sm input[type="checkbox"] { width: var(--space-16); height: var(--space-16); }
.checkbox--sm .checkbox__control { width: var(--space-16); height: var(--space-16); }
.checkbox--sm .checkbox__icon-check svg { width: var(--space-12); height: var(--space-12); }
.checkbox--sm .checkbox__label { font-size: var(--font-size-sm); }

/* ── Hover ── */
.checkbox:hover:not(.checkbox--disabled) .checkbox__control {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}

/* ── State ── */
.checkbox--error .checkbox__control { border-color: var(--color-border-error); }
.checkbox--error .checkbox__label { color: var(--color-text-error); }

/* disabled: checked·indeterminate color 오버라이드 포함 */
.checkbox--disabled { pointer-events: none; }
.checkbox--disabled .checkbox__control {
  border-color: var(--color-border-disabled);
}
.checkbox--disabled input:checked ~ .checkbox__control,
.checkbox--disabled input:indeterminate ~ .checkbox__control {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  color: var(--color-text-disabled);
}
.checkbox--disabled .checkbox__label { color: var(--color-text-disabled); }
```

---

## 접근성

체크박스·라디오 그룹 유형 (`accessibility.md` 체크박스·라디오 그룹 행 적용).

| 상황 | 마크업 |
|------|--------|
| 단일 | `<label class="checkbox"><input type="checkbox" />...</label>` |
| 그룹 | `<fieldset class="checkbox-group">` + `<legend>` 필수 — 스크린리더가 그룹 맥락을 각 항목 읽기 전에 함께 읽는다 |
| 에러 | `aria-invalid="true"` + `aria-describedby="[error-id]"` |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| indeterminate | `input.indeterminate = true` (JS만 가능 — HTML 속성으로 설정 불가) |

---

## Do / Don't

> ✅ DO — 그룹에 fieldset.checkbox-group + legend 사용
> `<fieldset class="checkbox-group"><legend>카테고리 선택</legend><label class="checkbox">...</label></fieldset>`

> ❌ DON'T — input에 `display:none` 또는 `visibility:hidden` 적용
> 접근성 트리에서 제거된다. `appearance: none`으로 시각적으로만 제거해야 한다

> ❌ DON'T — indeterminate를 HTML 속성으로 설정
> `<input indeterminate>` — 동작하지 않는다. `input.indeterminate = true` (JS)로만 설정 가능
