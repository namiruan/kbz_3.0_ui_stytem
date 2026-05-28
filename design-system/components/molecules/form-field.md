---
file: components/molecules/form-field.md
version: 0.8.1
status: draft
depends-on: components/_index.md, accessibility.md, components/atoms/input.md, components/atoms/textarea.md, components/atoms/checkbox.md, components/atoms/radio.md, components/atoms/toggle.md
---

# FormField

## 개요

Label + Control + Footer(선택) 조합의 완성된 입력 단위.

기본 입력 안내는 placeholder로 처리한다. 글자 수 카운트는 항상 컨트롤 내부(인라인)에 표시한다. `form-field__footer`는 아래 두 경우에만 추가한다.

- **에러 메시지**: 유효성 검사 실패 시 표시
- **부수 안내**: placeholder만으로 전달할 수 없는 추가 정보

Control로 사용할 수 있는 Atom: Input · Textarea · Checkbox 그룹 · Radio 그룹 · Toggle.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| layout | vertical (기본, 클래스 없음) · horizontal → `form-field--horizontal` | vertical |
| group | 세로 → `form-field-group` · 가로 정렬 → `form-field-group--horizontal` | — |
| state | error → `form-field--error` · disabled → `form-field--disabled` | — |

**필수 표시**: `<span class="form-field__required" aria-hidden="true">(필수)</span>`을 label 안에 추가하고, control에 `aria-required="true"`를 붙인다.

**글자 수 카운트**: Input은 `input-wrap--char-count`, Textarea는 `textarea-wrap--char-count`를 사용해 항상 컨트롤 내부에 표시한다.

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

### Layout 선택 기준

| 상황 | 사용 |
|------|------|
| 일반 입력 폼, 충분한 세로 공간 | vertical (기본) |
| 레이블·컨트롤을 한 줄로 정렬 (단독 필드) | form-field--horizontal |
| 여러 필드를 세로로 묶기 | form-field-group |
| 여러 가로형 필드를 라벨 기준으로 자동 정렬 | form-field-group--horizontal |

### Footer 사용 기준

| 상황 | 구조 |
|------|------|
| 기본 입력 안내만 필요 | placeholder만 사용, footer 생략 |
| placeholder 외 추가 안내 필요 | footer + `form-field__help` |
| 유효성 검사 있음 | footer + `form-field__error` (기본 숨김, 에러 시 표시) |

### 제약

- Label이 없는 FormField는 만들지 않는다. Label이 불필요하면 Control 단독 + `aria-label`로 처리한다.
- Checkbox·Radio 그룹은 반드시 `<fieldset>` + `<legend>` 구조를 사용한다. `<legend>`가 FormField 라벨 역할을 한다.
- Toggle은 설정 즉시 반영이 원칙이다. 폼 제출이 필요한 경우 Checkbox를 사용한다.
- horizontal 레이아웃에서 control + footer는 `form-field__body`로 묶는다.
- 여러 form-field를 묶을 때는 `form-field-group` (세로) 또는 `form-field-group--horizontal` (가로) 래퍼를 사용한다. 개별 `form-field`는 그대로 유지하고 래퍼만 추가한다.

---

## 동작

error 상태와 글자 수 카운트는 JS로 제어한다. disabled는 마크업으로 처리한다.

| 이벤트 | 동작 |
|--------|------|
| 유효성 검사 실패 | `form-field--error` 추가, control에 `aria-invalid="true"`, `aria-describedby`를 `[error-id]`로 교체, `.form-field__error` 표시 |
| 유효성 검사 통과 | `form-field--error` 제거, `aria-invalid` 제거, `aria-describedby` 복원 |
| `input` 이벤트 | 인라인 카운트 텍스트 갱신. 최대치 도달 시 `--full` 클래스 추가 |

:::preview
<div style="max-width:400px;width:100%">
  <div class="form-field" id="demo-field">
    <label class="form-field__label text-form-label" for="demo-input">이메일 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
    <div class="input-wrap input-wrap--char-count">
      <input class="input input--sm" type="email" id="demo-input" placeholder="name@company.com" aria-required="true" aria-describedby="demo-footer" maxlength="80" />
      <span class="input-char-count" aria-hidden="true" id="demo-cnt">0/80</span>
    </div>
    <div class="form-field__footer" id="demo-footer">
      <p class="form-field__help text-helper">업무용 이메일을 입력해 주세요.</p>
      <p class="form-field__error text-helper" id="demo-error" role="alert">이메일 형식이 올바르지 않아요. 예: name@company.com</p>
    </div>
  </div>
</div>
<script>
(function() {
  var field  = stage.querySelector('#demo-field');
  var input  = stage.querySelector('#demo-input');
  var cnt    = stage.querySelector('#demo-cnt');
  function isValid(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function updateCount() {
    var n = input.value.length;
    cnt.textContent = n + '/80';
    cnt.classList.toggle('input-char-count--full', n >= 80);
  }
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
    input.setAttribute('aria-describedby', 'demo-footer');
  }
  input.addEventListener('input', function() {
    updateCount();
    if (field.classList.contains('form-field--error') && isValid(input.value)) clearError();
  });
  input.addEventListener('blur', function() {
    if (!input.value) { clearError(); return; }
    if (!isValid(input.value)) setError(); else clearError();
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
form-field 구조:
- root = div.form-field. layout·state 클래스를 root에 조합.
- label: label.form-field__label.text-form-label + for/id 연결. required 표시는 span.form-field__required(aria-hidden).
- control: Atom 그대로 배치. Checkbox/Radio는 fieldset 래퍼 포함(legend가 라벨 역할). Toggle은 label.toggle 전체.
- 글자 수 카운트 (Input): div.input-wrap.input-wrap--char-count > input.input + span.input-char-count(aria-hidden="true").
- 글자 수 카운트 (Textarea): div.textarea-wrap.textarea-wrap--char-count > textarea.textarea + span.textarea-char-count(aria-hidden="true"). 카운트는 textarea 하단 우측 절대 위치.
- footer (선택): div.form-field__footer. 필요한 요소만 포함.
  - form-field__help (선택): placeholder 외 부수 안내가 있을 때만 추가.
  - form-field__error: 유효성 검사가 있으면 추가(기본 숨김). id로 aria-describedby 연결.
  - footer 자체가 불필요하면(placeholder + 인라인 카운트만으로 충분하고 유효성 검사도 없음) 생략.
- aria-describedby: footer id를 기본값으로 지정. 에러 상태에서 error id로 교체.
- disabled: control에 disabled + aria-disabled="true" + tabindex="-1". root에 form-field--disabled.

horizontal 레이아웃:
- root에 form-field--horizontal 추가.
- label은 직접 자식. control + footer는 div.form-field__body로 묶음.
-->

### Input 기반

:::preview
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap">
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형</p>
  <div class="form-field-group" style="width:200px">
    <div data-component class="form-field">
      <label class="form-field__label text-form-label" for="ff-iv1">이름 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
      <input class="input input--sm" type="text" id="ff-iv1" placeholder="홍길동" aria-required="true" />
    </div>
    <div data-component class="form-field">
      <label class="form-field__label text-form-label" for="ff-iv2">이메일 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
      <div class="input-wrap input-wrap--char-count">
        <input class="input input--sm" type="email" id="ff-iv2" placeholder="name@company.com" aria-required="true" maxlength="80" />
        <span class="input-char-count" aria-hidden="true">0/80</span>
      </div>
    </div>
    <div data-component class="form-field form-field--disabled">
      <label class="form-field__label text-form-label" for="ff-iv3">이름</label>
      <input class="input input--sm input--disabled" type="text" id="ff-iv3" value="홍길동" disabled aria-disabled="true" tabindex="-1" />
    </div>
  </div>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형</p>
  <div data-component class="form-field-group--horizontal">
    <div class="form-field">
      <label class="form-field__label text-form-label" for="ff-ih1">이름 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
      <div class="form-field__body">
        <input class="input input--sm" type="text" id="ff-ih1" placeholder="홍길동" aria-required="true" />
      </div>
    </div>
    <div class="form-field">
      <label class="form-field__label text-form-label" for="ff-ih2">이메일 주소 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
      <div class="form-field__body">
        <div class="input-wrap input-wrap--char-count">
          <input class="input input--sm" type="email" id="ff-ih2" placeholder="name@company.com" aria-required="true" aria-describedby="ff-ih2-footer" maxlength="80" />
          <span class="input-char-count" aria-hidden="true">0/80</span>
        </div>
        <div class="form-field__footer" id="ff-ih2-footer">
          <p class="form-field__help text-helper">업무용 이메일만 허용됩니다.</p>
          <p class="form-field__error text-helper" role="alert">이메일 형식이 올바르지 않아요.</p>
        </div>
      </div>
    </div>
    <div class="form-field form-field--error">
      <label class="form-field__label text-form-label" for="ff-ih3">이메일 주소 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
      <div class="form-field__body">
        <div class="input-wrap input-wrap--char-count">
          <input class="input input--sm input--error" type="email" id="ff-ih3" value="wrong" aria-required="true" aria-invalid="true" aria-describedby="ff-ih3-err" maxlength="80" />
          <span class="input-char-count" aria-hidden="true">5/80</span>
        </div>
        <div class="form-field__footer">
          <p class="form-field__error text-helper" id="ff-ih3-err" role="alert">이메일 형식이 올바르지 않아요.</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
:::

### Textarea 기반

:::preview
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap">
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형</p>
  <div class="form-field-group" style="width:200px">
    <div data-component class="form-field">
      <label class="form-field__label text-form-label" for="ff-tav1">메모</label>
      <textarea class="textarea textarea--sm" id="ff-tav1" rows="3" placeholder="내용을 입력해 주세요."></textarea>
    </div>
    <div data-component class="form-field">
      <label class="form-field__label text-form-label" for="ff-tav2">자기소개 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
      <div class="textarea-wrap textarea-wrap--char-count">
        <textarea class="textarea textarea--sm" id="ff-tav2" rows="3" placeholder="간단하게 소개해 주세요." aria-required="true" maxlength="300"></textarea>
        <span class="textarea-char-count" aria-hidden="true">0/300</span>
      </div>
    </div>
  </div>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형</p>
  <div data-component class="form-field-group--horizontal">
    <div class="form-field">
      <label class="form-field__label text-form-label" for="ff-tah1">메모</label>
      <div class="form-field__body">
        <textarea class="textarea textarea--sm" id="ff-tah1" rows="3" placeholder="내용을 입력해 주세요."></textarea>
      </div>
    </div>
    <div class="form-field">
      <label class="form-field__label text-form-label" for="ff-tah2">자기소개 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
      <div class="form-field__body">
        <div class="textarea-wrap textarea-wrap--char-count">
          <textarea class="textarea textarea--sm" id="ff-tah2" rows="3" placeholder="간단하게 소개해 주세요." aria-required="true" maxlength="300"></textarea>
          <span class="textarea-char-count" aria-hidden="true">0/300</span>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
:::

### Checkbox 그룹 기반

:::preview
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap">
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형</p>
  <div class="form-field-group" style="width:200px">
    <div data-component class="form-field">
      <fieldset class="checkbox-group">
        <legend class="form-field__label text-form-label">알림 수신 <span class="form-field__required" aria-hidden="true">(필수)</span></legend>
        <label class="checkbox checkbox--sm"><input type="checkbox" checked /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">이메일</span></label>
        <label class="checkbox checkbox--sm"><input type="checkbox" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">SMS</span></label>
      </fieldset>
    </div>
    <div data-component class="form-field form-field--error">
      <fieldset class="checkbox-group">
        <legend class="form-field__label text-form-label">알림 수신 <span class="form-field__required" aria-hidden="true">(필수)</span></legend>
        <label class="checkbox checkbox--sm checkbox--error"><input type="checkbox" aria-invalid="true" aria-describedby="ff-cbv-err" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">이메일</span></label>
        <label class="checkbox checkbox--sm checkbox--error"><input type="checkbox" aria-invalid="true" aria-describedby="ff-cbv-err" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">SMS</span></label>
      </fieldset>
      <div class="form-field__footer">
        <p class="form-field__error text-helper" id="ff-cbv-err" role="alert">최소 1개 이상 선택해 주세요.</p>
      </div>
    </div>
  </div>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형</p>
  <div data-component class="form-field form-field--horizontal">
    <legend class="form-field__label text-form-label" style="display:block">알림 수신</legend>
    <div class="form-field__body">
      <fieldset class="checkbox-group">
        <label class="checkbox checkbox--sm"><input type="checkbox" checked /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">이메일</span></label>
        <label class="checkbox checkbox--sm"><input type="checkbox" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">SMS</span></label>
      </fieldset>
    </div>
  </div>
</div>
</div>
:::

### Radio 그룹 기반

:::preview
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap">
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형</p>
  <div data-component class="form-field" style="width:200px">
    <fieldset class="radio-group">
      <legend class="form-field__label text-form-label">성별</legend>
      <label class="radio radio--sm"><input type="radio" name="ff-rv" checked /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">남성</span></label>
      <label class="radio radio--sm"><input type="radio" name="ff-rv" /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">여성</span></label>
    </fieldset>
  </div>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형</p>
  <div data-component class="form-field form-field--horizontal">
    <legend class="form-field__label text-form-label" style="display:block">성별</legend>
    <div class="form-field__body">
      <fieldset class="radio-group" style="flex-direction:row;display:flex;gap:var(--space-gap-md)">
        <label class="radio radio--sm"><input type="radio" name="ff-rh" checked /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">남성</span></label>
        <label class="radio radio--sm"><input type="radio" name="ff-rh" /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">여성</span></label>
      </fieldset>
    </div>
  </div>
</div>
</div>
:::

### Toggle 기반

:::preview
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap">
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형</p>
  <div class="form-field-group" style="width:200px">
    <div data-component class="form-field">
      <label class="toggle toggle--sm">
        <input type="checkbox" role="switch" checked />
        <span class="toggle__track"><span class="toggle__thumb"></span></span>
        <span class="toggle__label text-form-label">마케팅 알림</span>
      </label>
    </div>
    <div data-component class="form-field">
      <label class="toggle toggle--sm">
        <input type="checkbox" role="switch" />
        <span class="toggle__track"><span class="toggle__thumb"></span></span>
        <span class="toggle__label text-form-label">마케팅 알림</span>
      </label>
      <div class="form-field__footer">
        <p class="form-field__help text-helper">이벤트·프로모션 정보를 받아볼 수 있어요.</p>
      </div>
    </div>
  </div>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형</p>
  <div data-component class="form-field form-field--horizontal">
    <span class="form-field__label text-form-label">알림 설정</span>
    <div class="form-field__body">
      <label class="toggle toggle--sm">
        <input type="checkbox" role="switch" checked />
        <span class="toggle__track"><span class="toggle__thumb"></span></span>
        <span class="toggle__label text-form-label">마케팅 알림</span>
      </label>
    </div>
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

/* ── Footer: help·error 행 ── */
.form-field__footer {
  display: flex;
  align-items: flex-start;
}
.form-field__help,
.form-field__error {
  flex: 1;
  min-width: 0;
  margin: 0;
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

/* ── Inline char count: Input ── */
/* input-wrap은 Input atom의 기존 패턴 사용 */
/* right(space-8) + 최대 표기폭(space-48) = 56px */
.input-wrap--char-count .input {
  padding-right: calc(var(--space-8) + var(--space-48));
}
.input-char-count {
  position: absolute;
  right: var(--space-8);
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  font-size: var(--font-size-meta);
  line-height: var(--line-height-ui);
  letter-spacing: var(--letter-spacing-default);
  color: var(--color-text-subtle);
  pointer-events: none;
  white-space: nowrap;
}
.input-char-count--full { color: var(--color-text-error); }

/* ── Inline char count: Textarea ── */
.textarea-wrap {
  position: relative;
  display: flex;
  width: 100%;
}
/* 하단 여백: 카운트 줄 높이(font-size-meta) + 위아래 간격(space-4 × 2) */
.textarea-wrap--char-count .textarea {
  padding-bottom: calc((var(--space-4) * 2) + var(--font-size-meta));
}
.textarea-char-count {
  position: absolute;
  right: var(--space-8);
  bottom: var(--space-4);
  z-index: 1;
  font-size: var(--font-size-meta);
  line-height: var(--line-height-ui);
  letter-spacing: var(--letter-spacing-default);
  color: var(--color-text-subtle);
  pointer-events: none;
  white-space: nowrap;
}
.textarea-char-count--full { color: var(--color-text-error); }

/* ── Layout: horizontal (단독) ── */
.form-field--horizontal {
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-gap-md);
}
.form-field--horizontal .form-field__label {
  flex-shrink: 0;
  width: 120px;
  padding-top: var(--space-8);
}
.form-field__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-xs);
}

/* checkbox-group·radio-group·toggle: input 상하 내부 여백(6px)과 맞춤 */
.form-field .checkbox-group,
.form-field .radio-group {
  padding-top: var(--space-6);
  padding-bottom: var(--space-6);
}
.form-field .toggle {
  padding-top: var(--space-6);
  padding-bottom: var(--space-6);
}

/* ── Group wrapper (세로) ── */
.form-field-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-md);
}

/* ── Group wrapper (가로) : 라벨 열 자동 정렬 ── */
/* 내부 .form-field가 subgrid로 부모 컬럼을 공유 → 가장 긴 라벨 기준 정렬 */
.form-field-group--horizontal {
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: var(--space-gap-md);
  align-items: start;
}
.form-field-group--horizontal .form-field {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  column-gap: var(--space-gap-sm);
  align-items: start;
}
.form-field-group--horizontal .form-field__label {
  width: auto;
  padding-top: var(--space-8);
}
```

---

## 접근성

폼 입력 유형 (`accessibility.md` 텍스트 인풋 행 적용).

| 상황 | 마크업 |
|------|--------|
| Input · Textarea | `<label for="id">` + `<[control] id="id">` |
| Checkbox · Radio 그룹 | `<fieldset>` + `<legend>` — legend가 라벨 역할 |
| Toggle | `<input type="checkbox" role="switch">` — toggle__label이 시각 레이블 역할 |
| 필수 필드 | control에 `aria-required="true"`. `(필수)` 표시는 `aria-hidden="true"` |
| 에러 | control에 `aria-invalid="true"` + `aria-describedby="[error-id]"`. 에러 요소에 `role="alert"` |
| footer 연결 | footer가 있으면 control에 `aria-describedby="[footer-id]"` 기본 지정. 에러 상태에서 `[error-id]`로 교체 |
| footer 없음 | `aria-describedby` 생략 |
| 인라인 카운트 | `aria-hidden="true"` — 시각적 보조 전용. 스크린리더에 전달하지 않는다 |
| disabled | control에 `disabled` + `aria-disabled="true"` + `tabindex="-1"`. root에 `form-field--disabled` |

---

## Do / Don't

> ✅ DO — 기본 입력 안내는 placeholder로 처리, footer는 필요할 때만 추가
> `<input placeholder="name@company.com" />` — 형식을 플레이스홀더로 전달

> ❌ DON'T — 플레이스홀더로 충분한 안내를 help 텍스트로 중복 표기
> placeholder와 동일한 내용을 `form-field__help`에 반복 작성 금지

> ✅ DO — 글자 수 카운트는 항상 컨트롤 내부(인라인)에 표시
> `<div class="input-wrap input-wrap--char-count"><input /><span class="input-char-count" aria-hidden="true">0/80</span></div>`

> ✅ DO — 에러 메시지를 role="alert"와 aria-describedby로 연결
> `<p class="form-field__error text-helper" id="field-error" role="alert">...</p>` + `<input aria-invalid="true" aria-describedby="field-error" />`

> ✅ DO — 가로형에서 control + footer를 form-field__body로 묶음
> `<div class="form-field form-field--horizontal"><label ...></label><div class="form-field__body">...</div></div>`

> ✅ DO — 여러 form-field를 묶을 때 form-field-group / form-field-group--horizontal 래퍼 사용
> 개별 form-field 구조는 그대로 유지하고 래퍼만 추가. 가로형에서 라벨 열이 subgrid로 자동 정렬됨

> ❌ DON'T — 여러 가로형 필드에 고정 width를 직접 지정해 정렬 시도
> 라벨 텍스트가 바뀌면 즉시 어긋남. form-field-group--horizontal 사용

> ❌ DON'T — Checkbox·Radio 그룹을 fieldset 없이 label만으로 나열
> 반드시 `<fieldset>` + `<legend>` 구조 사용

> ❌ DON'T — Toggle에 폼 제출 흐름 적용
> 저장 액션이 필요한 경우 Checkbox를 사용한다
