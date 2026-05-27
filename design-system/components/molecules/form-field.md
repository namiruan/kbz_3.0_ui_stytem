---
file: components/molecules/form-field.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, components/atoms/input.md, components/atoms/textarea.md, components/atoms/checkbox.md, components/atoms/radio.md, components/atoms/toggle.md
---

# FormField

## 개요

Label + Control + HelpText 조합의 완성된 입력 단위. Input·Textarea 단독과의 차이 — 라벨·도움말·에러 메시지를 포함해 하나의 의미 있는 입력 단위를 구성한다.

Control로 사용할 수 있는 Atom: Input · Textarea · Checkbox 그룹 · Radio 그룹 · Toggle.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| state | error → `form-field--error` · disabled → `form-field--disabled` | — |

**필수 표시**: Variant 클래스가 아닌 구조로 처리한다. `<span class="form-field__required" aria-hidden="true">(필수)</span>`을 label 안에 추가하고, control에 `aria-required="true"`를 붙인다.

---

## 사용 지침

### Control 선택 기준

| 상황 | Control |
|------|---------|
| 단일 줄 텍스트 입력 | Input |
| 여러 줄 텍스트 입력 | Textarea |
| 여러 항목 중 복수 선택 | Checkbox 그룹 |
| 여러 항목 중 단일 선택 | Radio 그룹 |
| 저장 없이 즉시 반영되는 on/off | Toggle |

### 제약

- Label이 없는 FormField는 만들지 않는다. Label이 불필요하면 Control 단독 + `aria-label`로 처리한다.
- Checkbox·Radio 그룹은 반드시 `<fieldset>` + `<legend>` 구조를 사용한다. `<legend>`가 FormField 라벨 역할을 한다.
- Toggle은 설정 즉시 반영이 원칙이다. 폼 제출이 필요한 경우 Checkbox를 사용한다.

---

## 동작

error 상태는 JS로 클래스를 전환한다. disabled는 마크업으로 처리한다.

| 이벤트 | 동작 |
|--------|------|
| 유효성 검사 실패 | `form-field--error` 추가, control에 `aria-invalid="true"` + `aria-describedby="[error-id]"`, `.form-field__error` CSS로 표시 |
| 유효성 검사 통과 | `form-field--error` 제거, `aria-invalid` 제거, `.form-field__error` CSS로 숨김 |

:::preview
<div style="max-width:360px;width:100%">
  <div class="form-field" id="demo-field">
    <label class="form-field__label text-form-label" for="demo-input">이메일 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
    <input class="input" type="email" id="demo-input" aria-required="true" placeholder="name@company.com" />
    <p class="form-field__help text-helper" id="demo-help">업무용 이메일을 입력해 주세요.</p>
    <p class="form-field__error text-helper" id="demo-error" role="alert">이메일 형식이 올바르지 않아요. 예: name@company.com</p>
  </div>
</div>
<script>
(function() {
  var field = stage.querySelector('#demo-field');
  var input = stage.querySelector('#demo-input');
  function isValid(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function setError() {
    field.classList.add('form-field--error');
    input.classList.add('input--error');
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', 'demo-error');
  }
  function clearError() {
    field.classList.remove('form-field--error');
    input.classList.remove('input--error');
    input.removeAttribute('aria-invalid');
    input.setAttribute('aria-describedby', 'demo-help');
  }
  input.addEventListener('blur', function() {
    if (!input.value) { clearError(); return; }
    if (!isValid(input.value)) { setError(); } else { clearError(); }
  });
  input.addEventListener('input', function() {
    if (field.classList.contains('form-field--error') && isValid(input.value)) { clearError(); }
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
form-field 구조:
- root = div.form-field. state 클래스를 root에 조합.
- label: label.form-field__label.text-form-label. Input·Textarea 기반에서 for/id로 control에 연결.
  - required 표시: span.form-field__required(aria-hidden="true") + control에 aria-required="true".
- control: 자식 Atom. Input·Textarea는 단독 태그, Checkbox/Radio 그룹은 fieldset 래퍼 포함, Toggle은 label.toggle 전체.
- Checkbox·Radio 기반에서는 fieldset 안의 legend가 form-field__label 역할을 한다. 별도 label.form-field__label 사용 금지.
- help: p.form-field__help.text-helper. error 상태에서 CSS로 숨김.
- error: p.form-field__error.text-helper + role="alert". 기본 숨김, form-field--error에서 CSS로 표시. id로 control의 aria-describedby에 연결.
- disabled: control 각각에 disabled + aria-disabled="true" + tabindex="-1". root에 form-field--disabled 추가.
-->

### Input 기반

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <div data-component class="form-field" style="width:240px">
    <label class="form-field__label text-form-label" for="ff-input-default">이름</label>
    <input class="input" type="text" id="ff-input-default" placeholder="홍길동" />
    <p class="form-field__help text-helper">실명을 입력해 주세요.</p>
    <p class="form-field__error text-helper" role="alert">이름을 입력해 주세요.</p>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">required</span>
  <div data-component class="form-field" style="width:240px">
    <label class="form-field__label text-form-label" for="ff-input-req">이메일 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
    <input class="input" type="email" id="ff-input-req" placeholder="name@company.com" aria-required="true" />
    <p class="form-field__help text-helper">업무용 이메일을 입력해 주세요.</p>
    <p class="form-field__error text-helper" role="alert">이메일 형식이 올바르지 않아요.</p>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div data-component class="form-field form-field--error" style="width:240px">
    <label class="form-field__label text-form-label" for="ff-input-error">이메일 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
    <input class="input input--error" type="email" id="ff-input-error" value="잘못된형식" aria-required="true" aria-invalid="true" aria-describedby="ff-input-err-msg" />
    <p class="form-field__help text-helper">업무용 이메일을 입력해 주세요.</p>
    <p class="form-field__error text-helper" id="ff-input-err-msg" role="alert">이메일 형식이 올바르지 않아요. 예: name@company.com</p>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div data-component class="form-field form-field--disabled" style="width:240px">
    <label class="form-field__label text-form-label" for="ff-input-dis">이름</label>
    <input class="input input--disabled" type="text" id="ff-input-dis" value="홍길동" disabled aria-disabled="true" tabindex="-1" />
    <p class="form-field__help text-helper">실명을 입력해 주세요.</p>
    <p class="form-field__error text-helper" role="alert">이름을 입력해 주세요.</p>
  </div>
</div>
</div>
:::

### Textarea 기반

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <div data-component class="form-field" style="width:240px">
    <label class="form-field__label text-form-label" for="ff-ta-default">자기소개</label>
    <textarea class="textarea" id="ff-ta-default" rows="3" placeholder="간단하게 소개해 주세요."></textarea>
    <p class="form-field__help text-helper">300자 이내로 작성해 주세요.</p>
    <p class="form-field__error text-helper" role="alert">내용을 입력해 주세요.</p>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div data-component class="form-field form-field--error" style="width:240px">
    <label class="form-field__label text-form-label" for="ff-ta-error">자기소개 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
    <textarea class="textarea textarea--error" id="ff-ta-error" rows="3" aria-required="true" aria-invalid="true" aria-describedby="ff-ta-err-msg">짧음</textarea>
    <p class="form-field__help text-helper">300자 이내로 작성해 주세요.</p>
    <p class="form-field__error text-helper" id="ff-ta-err-msg" role="alert">10자 이상 입력해 주세요.</p>
  </div>
</div>
</div>
:::

### Checkbox 그룹 기반

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <div data-component class="form-field" style="width:240px">
    <fieldset class="checkbox-group" style="border:none;padding:0;margin:0">
      <legend class="form-field__label text-form-label">알림 수신 <span class="form-field__required" aria-hidden="true">(필수)</span></legend>
      <label class="checkbox">
        <input type="checkbox" />
        <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
        <span class="checkbox__label">이메일</span>
      </label>
      <label class="checkbox">
        <input type="checkbox" checked />
        <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
        <span class="checkbox__label">SMS</span>
      </label>
      <label class="checkbox">
        <input type="checkbox" />
        <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
        <span class="checkbox__label">앱 푸시</span>
      </label>
    </fieldset>
    <p class="form-field__help text-helper">최소 1개 이상 선택해 주세요.</p>
    <p class="form-field__error text-helper" role="alert">최소 1개 이상 선택해 주세요.</p>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div data-component class="form-field form-field--error" style="width:240px">
    <fieldset class="checkbox-group" style="border:none;padding:0;margin:0">
      <legend class="form-field__label text-form-label">알림 수신 <span class="form-field__required" aria-hidden="true">(필수)</span></legend>
      <label class="checkbox checkbox--error">
        <input type="checkbox" aria-invalid="true" aria-describedby="ff-cb-err-msg" />
        <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
        <span class="checkbox__label">이메일</span>
      </label>
      <label class="checkbox checkbox--error">
        <input type="checkbox" aria-invalid="true" aria-describedby="ff-cb-err-msg" />
        <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
        <span class="checkbox__label">SMS</span>
      </label>
      <label class="checkbox checkbox--error">
        <input type="checkbox" aria-invalid="true" aria-describedby="ff-cb-err-msg" />
        <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
        <span class="checkbox__label">앱 푸시</span>
      </label>
    </fieldset>
    <p class="form-field__help text-helper">최소 1개 이상 선택해 주세요.</p>
    <p class="form-field__error text-helper" id="ff-cb-err-msg" role="alert">최소 1개 이상 선택해 주세요.</p>
  </div>
</div>
</div>
:::

### Radio 그룹 기반

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <div data-component class="form-field" style="width:240px">
    <fieldset class="radio-group" style="border:none;padding:0;margin:0">
      <legend class="form-field__label text-form-label">성별</legend>
      <label class="radio">
        <input type="radio" name="ff-gender" checked />
        <span class="radio__control" aria-hidden="true"></span>
        <span class="radio__label">남성</span>
      </label>
      <label class="radio">
        <input type="radio" name="ff-gender" />
        <span class="radio__control" aria-hidden="true"></span>
        <span class="radio__label">여성</span>
      </label>
    </fieldset>
    <p class="form-field__help text-helper">해당되는 항목을 선택해 주세요.</p>
    <p class="form-field__error text-helper" role="alert">항목을 선택해 주세요.</p>
  </div>
</div>
</div>
:::

### Toggle 기반

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <div data-component class="form-field" style="width:240px">
    <label class="toggle">
      <input type="checkbox" role="switch" checked />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label text-form-label">마케팅 알림 수신</span>
    </label>
    <p class="form-field__help text-helper">이벤트·프로모션 정보를 받아볼 수 있어요.</p>
    <p class="form-field__error text-helper" role="alert"></p>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div data-component class="form-field form-field--disabled" style="width:240px">
    <label class="toggle toggle--disabled">
      <input type="checkbox" role="switch" disabled aria-disabled="true" tabindex="-1" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label text-form-label">마케팅 알림 수신</span>
    </label>
    <p class="form-field__help text-helper">이벤트·프로모션 정보를 받아볼 수 있어요.</p>
    <p class="form-field__error text-helper" role="alert"></p>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-xs);
}

/* ── Label ── */
.form-field__label {
  color: var(--color-text-body);
}

/* ── Required mark ── */
.form-field__required {
  color: var(--color-text-error);
  margin-left: var(--space-2);
}

/* ── Help text ── */
.form-field__help {
  color: var(--color-text-subtle);
}

/* ── Error message ── */
.form-field__error {
  display: none;
  color: var(--color-text-error);
}

/* ── State: error ── */
.form-field--error .form-field__error { display: block; }
.form-field--error .form-field__help  { display: none; }

/* ── State: disabled ── */
.form-field--disabled .form-field__label { color: var(--color-text-disabled); }
.form-field--disabled .form-field__help  { color: var(--color-text-disabled); }
```

---

## 접근성

폼 입력 유형 (`accessibility.md` 텍스트 인풋 행 적용).

| 상황 | 마크업 |
|------|--------|
| Input · Textarea | `<label for="id">` + `<[control] id="id">` |
| Checkbox · Radio 그룹 | `<fieldset>` + `<legend>` — legend가 라벨 역할 |
| Toggle | `<input type="checkbox" role="switch">` — toggle__label이 시각 레이블 역할 |
| 필수 필드 | control에 `aria-required="true"`. `*` 표시는 `aria-hidden="true"` |
| 에러 | control에 `aria-invalid="true"` + `aria-describedby="[error-id]"`. 에러 요소에 `role="alert"` |
| 도움말 연결 | 기본 상태에서 control에 `aria-describedby="[help-id]"`. 에러 상태에서 `[error-id]`로 교체 |
| disabled | control에 `disabled` + `aria-disabled="true"` + `tabindex="-1"`. root에 `form-field--disabled` |

에러 마크업 예시:

```html
<input class="input input--error"
       aria-required="true"
       aria-invalid="true"
       aria-describedby="email-error" />
<p class="form-field__error text-helper" id="email-error" role="alert">
  이메일 형식이 올바르지 않아요. 예: name@company.com
</p>
```

---

## Do / Don't

> ✅ DO — 에러 메시지를 role="alert"와 aria-describedby로 연결
> `<p class="form-field__error text-helper" id="field-error" role="alert">...</p>` + `<input aria-invalid="true" aria-describedby="field-error" />`

> ❌ DON'T — Label 없이 FormField 사용
> Label이 불필요하면 Control 단독 + `aria-label`로 처리한다

> ✅ DO — Checkbox·Radio 그룹은 fieldset + legend
> `<fieldset class="checkbox-group"><legend class="form-field__label text-form-label">...</legend>...</fieldset>`

> ❌ DON'T — 필수 표시를 시각적으로만 처리
> `(필수)` 표시와 함께 반드시 control에 `aria-required="true"` 추가

> ❌ DON'T — Toggle에 폼 제출 흐름 적용
> 저장 액션이 필요한 경우 Checkbox를 사용한다
