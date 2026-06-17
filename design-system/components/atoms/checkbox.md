---
file: components/atoms/checkbox.md
version: 1.1.1
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/typography.md, tokens/icon.md
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
| group direction | vertical (기본, 클래스 없음) · horizontal → `checkbox-group--horizontal` | vertical |

Indeterminate는 CSS 클래스가 아닌 JS 프로퍼티로 설정한다: `input.indeterminate = true`. 체크된 상태와 별개로 표현되며, 하위 항목 중 일부만 선택된 그룹 체크박스에 사용한다.

---

## 동작

비활성·필수·선택 항목이 혼합된 그룹에서의 동작을 보여준다. 부모 체크박스는 비활성 항목을 제외한 하위 선택 상태를 반영한다.

| 이벤트 | 동작 |
|--------|------|
| 폼 제출 (필수 항목 unchecked) | `checkbox--error` + `aria-invalid="true"` + 버튼 옆 단일 에러 메시지 표시 |
| `change` (필수 항목 모두 checked) | `checkbox--error` 제거 + `aria-invalid` 제거 + 에러 메시지 숨김 |
| 하위 일부 checked (비활성 제외) | 부모 indeterminate |
| 하위 전체 checked (비활성 제외) | 부모 checked |
| 부모 toggle | 비활성 제외 하위 일괄 checked / unchecked |

:::preview
<div style="max-width:360px">
  <form id="demo-form" novalidate>
    <fieldset class="checkbox-group" style="border:none;padding:0;margin:0 0 var(--space-stack-md)">
      <legend style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);margin-bottom:var(--space-stack-xs)">알림 설정</legend>
      <label class="checkbox" style="margin-bottom:var(--space-stack-xs)">
        <input type="checkbox" id="parent-cb" />
        <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
        <span class="checkbox__label" style="font-weight:600">전체 선택</span>
      </label>
      <div style="padding-left:var(--space-inset-3xl);display:flex;flex-direction:column;gap:var(--space-stack-sm)">
        <label class="checkbox" id="label-email">
          <input type="checkbox" id="cb-email" aria-describedby="form-error" />
          <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
          <span class="checkbox__label">이메일 알림 <span style="color:var(--color-text-error);font-size:var(--font-size-xs)">(필수)</span></span>
        </label>
        <label class="checkbox checkbox--disabled">
          <input type="checkbox" disabled aria-disabled="true" tabindex="-1" />
          <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
          <span class="checkbox__label">SMS 알림 <span style="font-size:var(--font-size-xs);color:var(--color-text-disabled)">(서비스 준비 중)</span></span>
        </label>
        <label class="checkbox" id="label-push">
          <input type="checkbox" id="cb-push" aria-describedby="form-error" />
          <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
          <span class="checkbox__label">앱 푸시 알림 <span style="color:var(--color-text-error);font-size:var(--font-size-xs)">(필수)</span></span>
        </label>
      </div>
    </fieldset>
    <div style="display:flex;align-items:center;justify-content:flex-end;gap:var(--space-gap-sm)">
      <p id="form-error" role="alert" style="display:none;font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-error);margin:0">필수 항목을 모두 선택해 주세요.</p>
      <button type="submit" class="btn btn--primary btn--sm text-button-sm">저장</button>
    </div>
  </form>
</div>
<script>
(function() {
  var form = stage.querySelector('#demo-form');
  var parent = stage.querySelector('#parent-cb');
  var formErr = stage.querySelector('#form-error');
  var required = [
    { cb: stage.querySelector('#cb-email'), label: stage.querySelector('#label-email') },
    { cb: stage.querySelector('#cb-push'),  label: stage.querySelector('#label-push')  }
  ];
  var all = required.map(function(r) { return r.cb; });

  function setError(item, on) {
    item.label.classList.toggle('checkbox--error', on);
    item.cb.setAttribute('aria-invalid', on ? 'true' : 'false');
  }
  function clearFormError() {
    formErr.style.display = 'none';
  }
  function syncParent() {
    var checked = all.filter(function(c) { return c.checked; }).length;
    parent.indeterminate = checked > 0 && checked < all.length;
    parent.checked = checked === all.length;
  }
  parent.addEventListener('change', function() {
    all.forEach(function(c) { c.checked = parent.checked; });
    parent.indeterminate = false;
    required.forEach(function(item) { if (item.cb.checked) setError(item, false); });
    if (parent.checked) clearFormError();
  });
  all.forEach(function(c) {
    c.addEventListener('change', function() {
      syncParent();
      required.forEach(function(item) { if (item.cb === c && c.checked) setError(item, false); });
      if (required.every(function(item) { return item.cb.checked; })) clearFormError();
    });
  });
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var unchecked = required.filter(function(item) { return !item.cb.checked; });
    if (unchecked.length) {
      unchecked.forEach(function(item) { setError(item, true); });
      formErr.style.display = '';
      unchecked[0].cb.focus();
    }
  });
  syncParent();
})();
</script>
:::

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
  - 세로형 (기본, 클래스 없음): flex-direction column.
  - 가로형: checkbox-group--horizontal 추가 → flex-direction row, gap --space-gap-md.
  - form-field 안에서는 legend 대신 div.form-field__label(id) + aria-labelledby 패턴 사용 — form-field.md 참조.
- disabled: input에 disabled + aria-disabled="true" + tabindex="-1". root에 checkbox--disabled.
- error: root에 checkbox--error. input에 aria-invalid="true" + aria-describedby.
-->

### 기본

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">unchecked</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
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
    <label data-component class="checkbox checkbox--sm">
      <input type="checkbox" aria-label="행 선택" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
    </label>
    <label data-component class="checkbox">
      <input type="checkbox" aria-label="행 선택" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">checked</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
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
    <label data-component class="checkbox checkbox--sm">
      <input type="checkbox" checked aria-label="행 선택" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
    </label>
    <label data-component class="checkbox">
      <input type="checkbox" checked aria-label="행 선택" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">indeterminate</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
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
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap">
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형</p>
  <fieldset data-component class="checkbox-group">
    <legend class="text-form-label" style="float:none;margin-bottom:var(--space-stack-xs)">알림 수신</legend>
    <label class="checkbox checkbox--sm"><input type="checkbox" checked /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">이메일</span></label>
    <label class="checkbox checkbox--sm"><input type="checkbox" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">SMS</span></label>
    <label class="checkbox checkbox--sm"><input type="checkbox" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">앱 푸시</span></label>
  </fieldset>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형</p>
  <fieldset data-component class="checkbox-group checkbox-group--horizontal">
    <legend class="text-form-label" style="float:none;margin-bottom:var(--space-stack-xs)">알림 수신</legend>
    <label class="checkbox checkbox--sm"><input type="checkbox" checked /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">이메일</span></label>
    <label class="checkbox checkbox--sm"><input type="checkbox" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">SMS</span></label>
    <label class="checkbox checkbox--sm"><input type="checkbox" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">앱 푸시</span></label>
  </fieldset>
</div>
</div>
:::

### 상태

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
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
    <label data-component class="checkbox checkbox--sm checkbox--error">
      <input type="checkbox" aria-invalid="true" aria-label="행 선택" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
    </label>
    <label data-component class="checkbox checkbox--error">
      <input type="checkbox" aria-invalid="true" aria-label="행 선택" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
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
    <label data-component class="checkbox checkbox--sm checkbox--disabled">
      <input type="checkbox" disabled aria-disabled="true" tabindex="-1" aria-label="행 선택" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
    </label>
    <label data-component class="checkbox checkbox--disabled">
      <input type="checkbox" disabled aria-disabled="true" tabindex="-1" aria-label="행 선택" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled checked</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
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
    <label data-component class="checkbox checkbox--sm checkbox--disabled">
      <input type="checkbox" checked disabled aria-disabled="true" tabindex="-1" aria-label="행 선택" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
    </label>
    <label data-component class="checkbox checkbox--disabled">
      <input type="checkbox" checked disabled aria-disabled="true" tabindex="-1" aria-label="행 선택" />
      <span class="checkbox__control" aria-hidden="true">
        <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
      </span>
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
.checkbox-group--horizontal {
  flex-direction: row;
  gap: var(--space-gap-md);
}

/* ── Base ── */
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
  cursor: pointer;
  position: relative;
}

/* input: 시각적으로만 제거. control 위에 위치해 포커스 링이 control에 정렬된다 */
.checkbox input[type="checkbox"] {
  appearance: none;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: var(--icon-md);
  height: var(--icon-md);
  margin: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1;
}

/* ── Control ── */
.checkbox__control {
  width: var(--icon-md);
  height: var(--icon-md);
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  flex-shrink: 0;
}

/* checked: 체크 아이콘. indeterminate는 :checked가 아니므로 icon-check가 display:none 유지 — 의도적 */
.checkbox__icon-check { display: none; }
.checkbox__icon-check svg { width: var(--icon-sm); height: var(--icon-sm); display: block; }
.checkbox input:checked ~ .checkbox__control .checkbox__icon-check { display: flex; }

.checkbox input:checked ~ .checkbox__control,
.checkbox input:indeterminate ~ .checkbox__control {
  background: var(--color-action-brand-selected);
  border-color: var(--color-border-brand-subtle);
  color: var(--color-fill-brand);
}

/* ── Label ── */
.checkbox__label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
}

/* ── Size ── */
.checkbox--sm input[type="checkbox"] { width: var(--icon-sm); height: var(--icon-sm); }
.checkbox--sm .checkbox__control { width: var(--icon-sm); height: var(--icon-sm); }
.checkbox--sm .checkbox__icon-check svg { width: var(--icon-badge); height: var(--icon-badge); }
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
  background: var(--color-surface-disabled);
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
| 라벨 없음 | `checkbox__label` 생략 시 input에 `aria-label` 필수 |
| 그룹 | `<fieldset class="checkbox-group">` + `<legend>` 필수 — 스크린리더가 그룹 맥락을 각 항목 읽기 전에 함께 읽는다 |
| 에러 | `aria-invalid="true"` + `aria-describedby="[error-id]"` |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| indeterminate | `input.indeterminate = true` (JS만 가능 — HTML 속성으로 설정 불가) |
| 키보드 | `Space`로 checked/unchecked 전환. 포커스 링은 전역 `*:focus-visible` 규칙으로 input 위에 표시 — 별도 CSS 불필요 |

---

## Do / Don't

> ✅ DO — 그룹에 fieldset.checkbox-group + legend 사용
> `<fieldset class="checkbox-group"><legend>카테고리 선택</legend><label class="checkbox">...</label></fieldset>`

> ✅ DO — 라벨 텍스트 없이 단독 사용 시 aria-label 추가
> `<input type="checkbox" aria-label="첫 번째 행 선택" />`

> ❌ DON'T — input에 `display:none` 또는 `visibility:hidden` 적용
> 접근성 트리에서 제거된다. `appearance: none`으로 시각적으로만 제거해야 한다

> ❌ DON'T — indeterminate를 HTML 속성으로 설정
> `<input indeterminate>` — 동작하지 않는다. `input.indeterminate = true` (JS)로만 설정 가능

## 플래너 패턴

```html
<label class="checkbox checkbox--{sm|md|lg}">
  <input type="checkbox" {checked} {disabled}>
  <span class="checkbox__control" aria-hidden="true">
    <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
  </span>
  <span class="checkbox__label">{레이블}</span>
</label>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 크기 | `checkbox--sm` / `--md` / `--lg` |
| checked | `checked` 속성 |
| indeterminate | JS: `el.indeterminate = true` |
| disabled | `disabled` 속성 |
| 에러 상태 | `checkbox--error` |
| 레이블 없음 | `aria-label` 속성 필수 |

JS init: 없음

> `icons/sprite.svg` 경로는 HTML 파일 기준 상대경로다. 단독 HTML 파일 배포 시 sprite.svg가 같은 위치에 없으면 체크 아이콘이 렌더링되지 않는다.
