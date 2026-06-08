---
file: components/molecules/form-field.md
version: 0.12.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md, components/atoms/input.md, components/atoms/textarea.md, components/atoms/checkbox.md, components/atoms/radio.md, components/atoms/toggle.md, components/atoms/calendar.md, components/molecules/dropdown.md, components/molecules/combobox.md, components/molecules/date-picker.md
---

# FormField

## 개요

Label + Control + Footer(선택) 조합의 완성된 입력 단위.

기본 입력 안내는 placeholder로 처리한다. 글자 수 카운트는 항상 컨트롤 내부(인라인)에 표시한다. `form-field__footer`는 아래 두 경우에만 추가한다.

- **에러 메시지**: 유효성 검사 실패 시 표시
- **부수 안내**: placeholder만으로 전달할 수 없는 추가 정보

Control로 사용할 수 있는 컴포넌트: Input · Textarea · Checkbox 그룹 · Radio 그룹 · Toggle · Dropdown · Combobox · DatePicker.

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
| 여러 항목 중 단일 선택 (선택지 ≤ 5개, 모두 한눈에 보여야 함) | Radio 그룹 |
| 선택지가 많거나 화면 공간이 제한될 때 단일·복수 선택 | Dropdown |
| 검색·타이핑으로 좁혀서 선택하거나 복수 선택이 필요할 때 | Combobox |
| 날짜 또는 날짜 범위 선택 | DatePicker |
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
- `type="date"` input을 직접 사용하지 않는다. 날짜 입력은 반드시 DatePicker를 사용한다.
- 모든 FormField는 label → control → footer 3-flex 구조를 따른다. Control 유형별 라벨 구성:
  - Input · Textarea: `<label class="form-field__label" for="id">`
  - Checkbox · Radio 그룹: `<div class="form-field__label" id="...">` + `<fieldset aria-labelledby="...">`
  - Toggle 그룹: `<div class="form-field__label">` + `<div class="form-field__toggles">`
  - Dropdown: `<label class="form-field__label" id="...">` (for 생략) + trigger `aria-labelledby="[label-id]"` — `<button>`은 `for` 연결이 동작하지 않으므로 id/aria-labelledby로 연결
  - Combobox: `<label class="form-field__label" for="[combobox__input id]">` — input이 있으므로 for 직접 연결 가능
  - DatePicker: `<label class="form-field__label" id="...">` (for 생략) + `dp__trigger`에 `aria-labelledby="[label-id]"` — trigger가 div이므로 aria-labelledby로 연결. dp 자체 `aria-label`은 제거하고 `aria-labelledby`로 대체한다
- Toggle은 설정 즉시 반영이 원칙이다. 폼 제출이 필요한 경우 Checkbox를 사용한다.
- horizontal 레이아웃에서 control + footer는 `form-field__body`로 묶는다.
- 여러 form-field를 묶을 때는 `form-field-group` (세로) 또는 `form-field-group--horizontal` (가로) 래퍼를 사용한다. 개별 `form-field`는 그대로 유지하고 래퍼만 추가한다.

---

## 동작

error 상태와 글자 수 카운트는 JS로 제어한다. disabled는 마크업으로 처리한다.

| 이벤트 | 동작 |
|--------|------|
| 유효성 검사 실패 | `form-field--error` 추가, control에 `aria-invalid="true"`, `aria-describedby`를 `[error-id]`로 교체, `.form-field__error` 표시. Checkbox·Radio 그룹은 그룹 내 각 `<input>`에 개별 적용 |
| 유효성 검사 통과 | `form-field--error` 제거, `aria-invalid` 제거, `aria-describedby` 복원 |
| `input` 이벤트 | 인라인 카운트 텍스트 갱신. 최대치 도달 시 `--full` 클래스 추가 |
| disabled + error 동시 | disabled 상태의 control은 사용자 입력이 불가하므로 error 상태가 발생하지 않는다. JS에서 disabled control에 대한 유효성 검사를 생략해 이 조합을 방지한다 |

:::preview
<div class="form-field-group" style="max-width:320px;width:100%;padding-bottom:440px">

  <!-- 이름 -->
  <div class="form-field" id="df-name-field">
    <label class="form-field__label text-form-label" for="df-name">이름 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
    <input class="input input--sm" type="text" id="df-name" placeholder="홍길동" aria-required="true" aria-describedby="df-name-footer" />
    <div class="form-field__footer" id="df-name-footer">
      <p class="form-field__error text-helper" id="df-name-err" role="alert">이름을 입력해 주세요.</p>
    </div>
  </div>

  <!-- 이메일 -->
  <div class="form-field" id="df-email-field">
    <label class="form-field__label text-form-label" for="df-email">이메일 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
    <div class="input-wrap input-wrap--char-count">
      <input class="input input--sm" type="email" id="df-email" placeholder="name@company.com" aria-required="true" aria-describedby="df-email-help" maxlength="80" />
      <span class="input-char-count" aria-hidden="true" id="df-email-cnt">0/80</span>
    </div>
    <div class="form-field__footer">
      <p class="form-field__help text-helper" id="df-email-help">업무용 이메일을 입력해 주세요.</p>
      <p class="form-field__error text-helper" id="df-email-err" role="alert">이메일 형식이 올바르지 않아요.</p>
    </div>
  </div>

  <!-- 자기소개 -->
  <div class="form-field">
    <label class="form-field__label text-form-label" for="df-bio">자기소개</label>
    <div class="textarea-wrap textarea-wrap--char-count">
      <textarea class="textarea textarea--sm" id="df-bio" rows="3" placeholder="간단하게 소개해 주세요." maxlength="200"></textarea>
      <span class="textarea-char-count" aria-hidden="true" id="df-bio-cnt">0/200</span>
    </div>
  </div>

  <!-- 알림 수신 checkbox -->
  <div class="form-field" id="df-cb-field">
    <div class="form-field__label text-form-label" id="df-cb-label">알림 수신 <span class="form-field__required" aria-hidden="true">(필수)</span></div>
    <fieldset class="checkbox-group" aria-labelledby="df-cb-label">
      <label class="checkbox checkbox--sm"><input type="checkbox" name="df-noti" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">이메일</span></label>
      <label class="checkbox checkbox--sm"><input type="checkbox" name="df-noti" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">SMS</span></label>
      <label class="checkbox checkbox--sm"><input type="checkbox" name="df-noti" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">앱 푸시</span></label>
    </fieldset>
    <div class="form-field__footer">
      <p class="form-field__error text-helper" id="df-cb-err" role="alert">최소 1개 이상 선택해 주세요.</p>
    </div>
  </div>

  <!-- 성별 radio -->
  <div class="form-field">
    <div class="form-field__label text-form-label" id="df-gender-label">성별</div>
    <fieldset class="radio-group radio-group--horizontal" aria-labelledby="df-gender-label">
      <label class="radio radio--sm"><input type="radio" name="df-gender" checked /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">남성</span></label>
      <label class="radio radio--sm"><input type="radio" name="df-gender" /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">여성</span></label>
      <label class="radio radio--sm"><input type="radio" name="df-gender" /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">선택 안 함</span></label>
    </fieldset>
  </div>

  <!-- 부서 dropdown -->
  <div class="form-field" id="df-dept-field">
    <label class="form-field__label text-form-label" id="df-dept-label">부서 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
    <div class="dropdown dropdown--button dropdown--sm" id="df-dept-dd" style="width:100%">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="df-dept-label" aria-required="true">
        <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-labelledby="df-dept-label">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">개발팀</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">디자인팀</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">마케팅팀</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">운영팀</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">인사팀</span></li>
        </ul>
      </div>
    </div>
    <div class="form-field__footer" id="df-dept-footer">
      <p class="form-field__error text-helper" id="df-dept-err" role="alert">부서를 선택해 주세요.</p>
    </div>
  </div>

  <!-- 담당자 combobox -->
  <div class="form-field" id="df-assign-field">
    <label class="form-field__label text-form-label" for="df-assign-input">담당자 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
    <div class="combobox combobox--sm" id="df-assign-cb" style="width:100%">
      <div class="combobox__trigger">
        <input class="combobox__input" id="df-assign-input" type="text" role="combobox"
               aria-haspopup="listbox" aria-expanded="false" aria-autocomplete="list"
               aria-controls="df-assign-list" aria-required="true" placeholder="이름으로 검색" />
        <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
        <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </div>
      <div class="combobox__panel">
        <ul class="combobox__list" role="listbox" id="df-assign-list" aria-label="담당자">
          <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">김철수</span></li>
          <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">이영희</span></li>
          <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">박민준</span></li>
          <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">정수빈</span></li>
        </ul>
      </div>
    </div>
    <div class="form-field__footer" id="df-assign-footer">
      <p class="form-field__error text-helper" id="df-assign-err" role="alert">담당자를 선택해 주세요.</p>
    </div>
  </div>

  <!-- 마케팅 수신 toggle -->
  <div class="form-field">
    <div class="form-field__label text-form-label">마케팅 수신</div>
    <div class="form-field__toggles">
      <label class="toggle toggle--sm"><input type="checkbox" role="switch" checked /><span class="toggle__track"><span class="toggle__thumb"></span></span><span class="toggle__label text-form-label">이메일 마케팅</span></label>
      <label class="toggle toggle--sm"><input type="checkbox" role="switch" /><span class="toggle__track"><span class="toggle__thumb"></span></span><span class="toggle__label text-form-label">SMS 마케팅</span></label>
    </div>
    <div class="form-field__footer">
      <p class="form-field__help text-helper">수신 동의 시 혜택·이벤트 정보를 받아볼 수 있어요.</p>
    </div>
  </div>

  <!-- 출장일 single datepicker -->
  <div class="form-field" id="df-dps-field">
    <label class="form-field__label text-form-label" id="df-dps-label">출장일 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
    <div class="dp" id="df-dps">
      <div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="df-dps-label">
        <div class="dp__value-group">
          <input class="dp__value-part dp__value-part--year" id="df-dps-yr" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="연도" autocomplete="off">
          <span class="dp__value-sep" aria-hidden="true">.</span>
          <input class="dp__value-part dp__value-part--md" id="df-dps-mo" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="월" autocomplete="off">
          <span class="dp__value-sep" aria-hidden="true">.</span>
          <input class="dp__value-part dp__value-part--md" id="df-dps-dy" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="일" autocomplete="off">
        </div>
        <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
      </div>
      <div class="form-field__footer"><p class="form-field__error text-helper" role="alert"></p></div>
    </div>
    <div class="form-field__footer" id="df-dps-footer">
      <p class="form-field__error text-helper" id="df-dps-err" role="alert">날짜를 선택해 주세요.</p>
    </div>
  </div>

  <!-- 출장 기간 range datepicker -->
  <div class="form-field" id="df-dpr-field">
    <label class="form-field__label text-form-label" id="df-dpr-label">출장 기간 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
    <div class="dp dp--range" id="df-dpr">
      <div class="dp__trigger" id="df-dpr-btn" aria-haspopup="dialog" aria-labelledby="df-dpr-label">
        <div class="dp__value-group">
          <input class="dp__value-part dp__value-part--year" id="df-dpr-s-yr" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="시작 연도" autocomplete="off">
          <span class="dp__value-sep" aria-hidden="true">.</span>
          <input class="dp__value-part dp__value-part--md" id="df-dpr-s-mo" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="시작 월" autocomplete="off">
          <span class="dp__value-sep" aria-hidden="true">.</span>
          <input class="dp__value-part dp__value-part--md" id="df-dpr-s-dy" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="시작 일" autocomplete="off">
          <span class="dp__value-sep dp__value-sep--range" aria-hidden="true">~</span>
          <input class="dp__value-part dp__value-part--year" id="df-dpr-e-yr" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="종료 연도" autocomplete="off">
          <span class="dp__value-sep" aria-hidden="true">.</span>
          <input class="dp__value-part dp__value-part--md" id="df-dpr-e-mo" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="종료 월" autocomplete="off">
          <span class="dp__value-sep" aria-hidden="true">.</span>
          <input class="dp__value-part dp__value-part--md" id="df-dpr-e-dy" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="종료 일" autocomplete="off">
        </div>
        <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
      </div>
      <div class="form-field__footer"><p class="form-field__error text-helper" role="alert"></p></div>
    </div>
    <div class="form-field__footer" id="df-dpr-footer">
      <p class="form-field__error text-helper" id="df-dpr-err" role="alert">기간을 선택해 주세요.</p>
    </div>
  </div>

</div>
<script>
(function() {
  /* 이름 */
  var nameField = stage.querySelector('#df-name-field');
  var nameInput = stage.querySelector('#df-name');
  nameInput.addEventListener('blur', function() {
    var empty = !nameInput.value.trim();
    nameField.classList.toggle('form-field--error', empty);
    nameInput.classList.toggle('input--error', empty);
    nameInput.classList.toggle('input--complete', !empty);
    if (empty) {
      nameInput.setAttribute('aria-invalid', 'true');
      nameInput.setAttribute('aria-describedby', 'df-name-err');
    } else {
      nameInput.removeAttribute('aria-invalid');
      nameInput.setAttribute('aria-describedby', 'df-name-footer');
    }
  });
  nameInput.addEventListener('input', function() {
    if (nameInput.value.trim()) {
      nameField.classList.remove('form-field--error');
      nameInput.classList.remove('input--error');
      nameInput.removeAttribute('aria-invalid');
      nameInput.setAttribute('aria-describedby', 'df-name-footer');
    } else {
      nameInput.classList.remove('input--complete');
    }
  });

  /* 이메일 */
  var emailField = stage.querySelector('#df-email-field');
  var emailInput = stage.querySelector('#df-email');
  var emailCnt   = stage.querySelector('#df-email-cnt');
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  emailInput.addEventListener('input', function() {
    emailCnt.textContent = emailInput.value.length + '/80';
    emailCnt.classList.toggle('input-char-count--full', emailInput.value.length >= 80);
    if (emailField.classList.contains('form-field--error') && isEmail(emailInput.value)) {
      emailField.classList.remove('form-field--error');
      emailInput.classList.remove('input--error');
      emailInput.removeAttribute('aria-invalid');
      emailInput.setAttribute('aria-describedby', 'df-email-help');
    }
    if (!emailInput.value) emailInput.classList.remove('input--complete');
  });
  emailInput.addEventListener('blur', function() {
    var invalid = emailInput.value && !isEmail(emailInput.value);
    var complete = emailInput.value && isEmail(emailInput.value);
    emailField.classList.toggle('form-field--error', invalid);
    emailInput.classList.toggle('input--error', invalid);
    emailInput.classList.toggle('input--complete', !!complete);
    if (invalid) {
      emailInput.setAttribute('aria-invalid', 'true');
      emailInput.setAttribute('aria-describedby', 'df-email-err');
    } else {
      emailInput.removeAttribute('aria-invalid');
      emailInput.setAttribute('aria-describedby', 'df-email-help');
    }
  });

  /* 자기소개 카운트 + complete */
  var bioTa = stage.querySelector('#df-bio');
  bioTa.addEventListener('input', function() {
    stage.querySelector('#df-bio-cnt').textContent = bioTa.value.length + '/200';
    if (!bioTa.value) bioTa.classList.remove('textarea--complete');
  });
  bioTa.addEventListener('blur', function() {
    bioTa.classList.toggle('textarea--complete', !!bioTa.value.trim());
  });

  /* 부서 dropdown */
  var deptField = stage.querySelector('#df-dept-field');
  var deptDD    = stage.querySelector('#df-dept-dd');
  var deptTrig  = deptDD.querySelector('.dropdown__trigger');
  var deptVal   = deptDD.querySelector('.dropdown__value');
  var deptOpts  = Array.from(deptDD.querySelectorAll('.dropdown__option'));
  function openDeptDD() {
    deptDD.classList.add('dropdown--open');
    deptTrig.setAttribute('aria-expanded', 'true');
  }
  function closeDeptDD() {
    deptDD.classList.remove('dropdown--open');
    deptTrig.setAttribute('aria-expanded', 'false');
    /* 패널이 닫힐 때 선택값 없으면 에러 */
    var hasValue = !deptVal.classList.contains('dropdown__value--placeholder');
    deptField.classList.toggle('form-field--error', !hasValue);
    deptDD.classList.toggle('dropdown--error', !hasValue);
    if (!hasValue) {
      deptTrig.setAttribute('aria-invalid', 'true');
      deptTrig.setAttribute('aria-describedby', 'df-dept-err');
    } else {
      deptTrig.removeAttribute('aria-invalid');
      deptTrig.setAttribute('aria-describedby', 'df-dept-footer');
    }
  }
  deptTrig.addEventListener('click', function() {
    deptDD.classList.contains('dropdown--open') ? closeDeptDD() : openDeptDD();
  });
  deptOpts.forEach(function(opt) {
    opt.addEventListener('click', function() {
      deptOpts.forEach(function(o) { o.classList.remove('dropdown__option--selected'); o.setAttribute('aria-selected', 'false'); });
      opt.classList.add('dropdown__option--selected');
      opt.setAttribute('aria-selected', 'true');
      deptVal.textContent = opt.querySelector('.dropdown__option-label').textContent;
      deptVal.classList.remove('dropdown__value--placeholder');
      deptField.classList.remove('form-field--error');
      deptDD.classList.remove('dropdown--error');
      deptTrig.removeAttribute('aria-invalid');
      deptTrig.setAttribute('aria-describedby', 'df-dept-footer');
      closeDeptDD();
    });
  });
  document.addEventListener('click', function(e) {
    if (deptDD.classList.contains('dropdown--open') && !deptDD.contains(e.target)) closeDeptDD();
  });

  /* 담당자 combobox */
  var assignField    = stage.querySelector('#df-assign-field');
  var assignCB       = stage.querySelector('#df-assign-cb');
  var assignInput    = stage.querySelector('#df-assign-input');
  var assignClear    = assignCB.querySelector('.combobox__clear');
  var assignChevron  = assignCB.querySelector('.combobox__chevron');
  var assignPanel    = assignCB.querySelector('.combobox__panel');
  var assignOpts     = Array.from(assignCB.querySelectorAll('.combobox__option'));
  var assignSelected = null;
  function openAssignCB() {
    assignCB.classList.add('combobox--open');
    assignInput.setAttribute('aria-expanded', 'true');
  }
  function closeAssignCB() {
    assignCB.classList.remove('combobox--open');
    assignInput.setAttribute('aria-expanded', 'false');
    assignInput.value = assignSelected || '';
    assignOpts.forEach(function(o) { o.style.display = ''; });
    /* 포커스 잃을 때 미선택이면 에러 */
    var hasValue = !!assignSelected;
    assignField.classList.toggle('form-field--error', !hasValue);
    assignCB.classList.toggle('combobox--error', !hasValue);
    if (!hasValue) {
      assignInput.setAttribute('aria-invalid', 'true');
      assignInput.setAttribute('aria-describedby', 'df-assign-err');
    } else {
      assignInput.removeAttribute('aria-invalid');
      assignInput.setAttribute('aria-describedby', 'df-assign-footer');
      assignCB.classList.add('combobox--has-value');
    }
  }
  assignChevron.addEventListener('mousedown', function(e) { e.preventDefault(); });
  assignChevron.addEventListener('click', function() {
    assignCB.classList.contains('combobox--open') ? (assignInput.blur(), closeAssignCB()) : (assignInput.focus(), openAssignCB());
  });
  assignInput.addEventListener('focus', openAssignCB);
  assignInput.addEventListener('blur', function(e) {
    if (!assignCB.contains(e.relatedTarget)) closeAssignCB();
  });
  assignInput.addEventListener('input', function() {
    var q = assignInput.value.toLowerCase();
    assignOpts.forEach(function(o) {
      o.style.display = o.querySelector('.combobox__option-label').textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
  assignOpts.forEach(function(opt) {
    opt.addEventListener('mousedown', function(e) { e.preventDefault(); });
    opt.addEventListener('click', function() {
      assignSelected = opt.querySelector('.combobox__option-label').textContent;
      assignOpts.forEach(function(o) { o.classList.remove('combobox__option--selected'); o.setAttribute('aria-selected', 'false'); });
      opt.classList.add('combobox__option--selected');
      opt.setAttribute('aria-selected', 'true');
      assignInput.value = assignSelected;
      assignCB.classList.add('combobox--has-value');
      assignField.classList.remove('form-field--error');
      assignCB.classList.remove('combobox--error');
      assignInput.removeAttribute('aria-invalid');
      assignInput.setAttribute('aria-describedby', 'df-assign-footer');
      closeAssignCB();
    });
  });
  assignClear.addEventListener('mousedown', function(e) { e.preventDefault(); });
  assignClear.addEventListener('click', function() {
    assignSelected = null;
    assignInput.value = '';
    assignCB.classList.remove('combobox--has-value');
    assignOpts.forEach(function(o) { o.classList.remove('combobox__option--selected'); o.setAttribute('aria-selected', 'false'); o.style.display = ''; });
    assignInput.focus();
  });

  /* 알림 수신 checkbox */
  var cbField  = stage.querySelector('#df-cb-field');
  var cbInputs = Array.from(stage.querySelectorAll('input[name="df-noti"]'));
  cbInputs.forEach(function(cb) {
    cb.addEventListener('change', function() {
      var any = cbInputs.some(function(c) { return c.checked; });
      cbField.classList.toggle('form-field--error', !any);
      cbInputs.forEach(function(c) {
        c.closest('.checkbox').classList.toggle('checkbox--error', !any);
      });
    });
  });

  /* 출장일 single datepicker */
  (function() {
    var today = new Date(); today.setHours(0,0,0,0);
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function isSame(a,b) { return a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
    function fromKey(k) { var p=k.split(','); return new Date(+p[0],+p[1],+p[2]); }
    var dpField  = stage.querySelector('#df-dps-field');
    var dp       = stage.querySelector('#df-dps');
    var trigger  = dp.querySelector('.dp__trigger');
    var yrEl = stage.querySelector('#df-dps-yr');
    var moEl = stage.querySelector('#df-dps-mo');
    var dyEl = stage.querySelector('#df-dps-dy');
    var vy = today.getFullYear(), vm = today.getMonth();
    var selected = null;
    var errorInner = dp.querySelector('.form-field__error');
    var errorOuter = stage.querySelector('#df-dps-err');
    /* panel 생성 */
    var panel = document.createElement('div');
    panel.className = 'dp__panel'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','날짜 선택'); panel.setAttribute('hidden','');
    panel.style.position = 'absolute'; panel.style.zIndex = '1000';
    panel.innerHTML = '<div class="dp__header">'
      + '<button class="dp__nav-btn" type="button" id="df-dps-prev" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>'
      + '<div class="dp__select-group" aria-live="polite" aria-atomic="true">'
      + '<input class="dp__select-input" id="df-dps-yi" type="number" min="1990" max="' + (today.getFullYear()+10) + '" aria-label="연도">'
      + '<span class="dp__select-label">년</span>'
      + '<input class="dp__select-input dp__select-input--month" id="df-dps-mi" type="number" min="1" max="12" aria-label="월">'
      + '<span class="dp__select-label">월</span>'
      + '<button class="btn btn--secondary btn--solid btn--sm" id="df-dps-today" type="button">오늘</button>'
      + '</div>'
      + '<button class="dp__nav-btn" type="button" id="df-dps-next" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>'
      + '</div>'
      + '<div class="dp__weekday-bar">'
      + '<span class="cal__weekday" role="columnheader" aria-label="일요일">일</span><span class="cal__weekday" role="columnheader" aria-label="월요일">월</span><span class="cal__weekday" role="columnheader" aria-label="화요일">화</span><span class="cal__weekday" role="columnheader" aria-label="수요일">수</span><span class="cal__weekday" role="columnheader" aria-label="목요일">목</span><span class="cal__weekday" role="columnheader" aria-label="금요일">금</span><span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>'
      + '</div>'
      + '<div class="cal"><div class="cal__grid" role="grid" id="df-dps-grid"><div id="df-dps-weeks"></div></div></div>';
    document.body.appendChild(panel);
    var weeksEl    = panel.querySelector('#df-dps-weeks');
    var gridEl     = panel.querySelector('#df-dps-grid');
    var yearInput  = panel.querySelector('#df-dps-yi');
    var monthInput = panel.querySelector('#df-dps-mi');
    function positionPanel() {
      var r = trigger.getBoundingClientRect();
      var panelH = panel.offsetHeight;
      var spaceBelow = window.innerHeight - r.bottom;
      if (panelH > spaceBelow && r.top > panelH) panel.style.top = (r.top + (window.pageYOffset||0) - panelH - 4) + 'px';
      else panel.style.top = (r.bottom + (window.pageYOffset||0) + 4) + 'px';
      panel.style.left = (r.left + (window.pageXOffset||0)) + 'px';
    }
    function render() {
      weeksEl.innerHTML = '';
      yearInput.value = vy; monthInput.value = vm + 1;
      gridEl.setAttribute('aria-label', vy + '년 ' + (vm+1) + '월');
      var first = new Date(vy, vm, 1), last = new Date(vy, vm+1, 0);
      var cur = new Date(first); cur.setDate(cur.getDate() - cur.getDay());
      while (cur <= last || cur.getDay() !== 0) {
        var row = document.createElement('div'); row.className='cal__week'; row.setAttribute('role','row');
        for (var i=0;i<7;i++) {
          var d=new Date(cur), outside=d.getMonth()!==vm;
          var btn=document.createElement('button'); btn.setAttribute('role','gridcell'); btn.setAttribute('type','button');
          btn.dataset.date=d.getFullYear()+','+d.getMonth()+','+d.getDate();
          if (outside) btn.dataset.inactive='true';
          var cls=['cal__day'];
          if (outside) cls.push('cal__day--outside');
          if (!outside&&isSame(d,today)) { cls.push('cal__day--today'); btn.setAttribute('aria-current','date'); }
          if (isSame(d,selected)) { cls.push('cal__day--selected'); btn.setAttribute('aria-selected','true'); }
          btn.className=cls.join(' ');
          btn.setAttribute('tabindex',(isSame(d,selected)||(!selected&&isSame(d,today)))&&!outside?'0':'-1');
          btn.textContent=d.getDate();
          row.appendChild(btn); cur.setDate(cur.getDate()+1);
        }
        weeksEl.appendChild(row);
        if (cur>last&&cur.getDay()===0) break;
      }
    }
    function setOuterError(show) {
      dpField.classList.toggle('form-field--error', show);
      if (show) { trigger.setAttribute('aria-invalid','true'); trigger.setAttribute('aria-describedby','df-dps-err'); }
      else { trigger.removeAttribute('aria-invalid'); trigger.removeAttribute('aria-describedby'); }
    }
    function setInnerError(msg) { dp.classList.add('dp--error'); if (errorInner) errorInner.textContent = msg; }
    function clearInnerError() { dp.classList.remove('dp--error'); if (errorInner) errorInner.textContent = ''; }
    function open() {
      if (dp.classList.contains('dp--has-value')) { var y=parseInt(yrEl.value,10),m=parseInt(moEl.value,10),d=parseInt(dyEl.value,10); if(!isNaN(y)&&!isNaN(m)&&!isNaN(d)){vy=y;vm=m-1;} }
      panel.removeAttribute('hidden'); dp.classList.add('dp--open'); render(); positionPanel();
    }
    function close() {
      panel.setAttribute('hidden',''); dp.classList.remove('dp--open');
      setOuterError(!dp.classList.contains('dp--has-value'));
    }
    function isOpen() { return !panel.hasAttribute('hidden'); }
    function setPartsFromDate(d) {
      yrEl.value=String(d.getFullYear()); moEl.value=pad(d.getMonth()+1); dyEl.value=pad(d.getDate());
      dp.classList.add('dp--has-value'); clearInnerError(); setOuterError(false);
    }
    function applyPartsToDate(writeBack) {
      var y=parseInt(yrEl.value,10),m=parseInt(moEl.value,10),d=parseInt(dyEl.value,10);
      if (isNaN(y)||isNaN(m)||isNaN(d)) { if (writeBack) setInnerError('유효하지 않은 날짜입니다.'); return false; }
      var dt=new Date(y,m-1,d);
      if (isNaN(dt.getTime())||dt.getMonth()!==m-1||dt.getDate()!==d) { if (writeBack) setInnerError('유효하지 않은 날짜입니다.'); return false; }
      clearInnerError(); selected=dt; vy=y; vm=m-1;
      if (writeBack) setPartsFromDate(dt); else dp.classList.add('dp--has-value');
      return true;
    }
    function advancePart(el, maxLen, nextEl) {
      el.addEventListener('input', function() { el.value=el.value.replace(/\D/g,'').slice(0,maxLen); if(nextEl&&el.value.length===maxLen) nextEl.focus(); });
    }
    advancePart(yrEl,4,moEl); advancePart(moEl,2,dyEl); advancePart(dyEl,2,null);
    [yrEl,moEl,dyEl].forEach(function(el) {
      el.addEventListener('input', function() { clearInnerError(); if (isOpen()) { var y=parseInt(yrEl.value,10),m=parseInt(moEl.value,10); if(yrEl.value.length===4&&!isNaN(y))vy=y; if(moEl.value.length>=1&&!isNaN(m)&&m>=1&&m<=12)vm=m-1; if(yrEl.value.length===4&&moEl.value.length>=1&&dyEl.value.length>=1)applyPartsToDate(); else render(); } });
      el.addEventListener('blur', function() { setTimeout(function() { if(dp.contains(document.activeElement)||panel.contains(document.activeElement)) return; var has=yrEl.value||moEl.value||dyEl.value; if(has) applyPartsToDate(true); if(isOpen()) close(); },0); });
      el.addEventListener('keydown', function(e) { if(e.key==='Escape'){close();e.target.blur();} if(e.key==='Enter'){e.preventDefault();e.target.blur();} });
    });
    trigger.addEventListener('click', function() { if (!isOpen()) open(); });
    trigger.querySelector('.dp__chevron').addEventListener('click', function(e) { e.stopPropagation(); isOpen()?close():open(); });
    weeksEl.addEventListener('click', function(e) {
      var btn=e.target.closest?e.target.closest('.cal__day'):e.target;
      if (!btn||btn.dataset.inactive) return;
      e.stopPropagation(); selected=fromKey(btn.dataset.date); setPartsFromDate(selected); close();
    });
    panel.querySelector('#df-dps-prev').addEventListener('click', function() { vm--; if(vm<0){vm=11;vy--;} render(); });
    panel.querySelector('#df-dps-next').addEventListener('click', function() { vm++; if(vm>11){vm=0;vy++;} render(); });
    panel.querySelector('#df-dps-today').addEventListener('click', function() { vy=today.getFullYear(); vm=today.getMonth(); render(); positionPanel(); });
    yearInput.addEventListener('click', function(e){e.stopPropagation();});
    monthInput.addEventListener('click', function(e){e.stopPropagation();});
    yearInput.addEventListener('blur', function() { var y=parseInt(yearInput.value,10); if(!isNaN(y)&&y>=1990&&y<=today.getFullYear()+10){vy=y;render();} else yearInput.value=vy; });
    monthInput.addEventListener('blur', function() { var m=parseInt(monthInput.value,10); if(!isNaN(m)&&m>=1&&m<=12){vm=m-1;render();} else monthInput.value=vm+1; });
    document.addEventListener('click', function(e) { if(!dp.contains(e.target)&&!panel.contains(e.target)) { if(isOpen()) close(); } });
    document.addEventListener('keydown', function(e) { if(e.key==='Escape') { if(isOpen()) close(); } });
  })();

  /* 출장 기간 range datepicker */
  (function() {
    var today = new Date(); today.setHours(0,0,0,0);
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function isSame(a,b) { return a&&b&&a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate(); }
    function isBetween(d,s,e) { if(!s||!e) return false; var lo=s<e?s:e,hi=s<e?e:s; return d>lo&&d<hi; }
    function fromKey(k) { var p=k.split(','); return new Date(+p[0],+p[1],+p[2]); }
    function isValidDate(y,m,d) { if(isNaN(y)||isNaN(m)||isNaN(d)) return false; var dt=new Date(y,m-1,d); return !isNaN(dt.getTime())&&dt.getMonth()===m-1&&dt.getDate()===d; }
    var dpField   = stage.querySelector('#df-dpr-field');
    var dp        = stage.querySelector('#df-dpr');
    var trigger   = stage.querySelector('#df-dpr-btn');
    var sYrEl=stage.querySelector('#df-dpr-s-yr'), sMoEl=stage.querySelector('#df-dpr-s-mo'), sDyEl=stage.querySelector('#df-dpr-s-dy');
    var eYrEl=stage.querySelector('#df-dpr-e-yr'), eMoEl=stage.querySelector('#df-dpr-e-mo'), eDyEl=stage.querySelector('#df-dpr-e-dy');
    var rangeStart=null, rangeEnd=null, hoverDate=null;
    var baseYear=today.getFullYear(), baseMonth=today.getMonth();
    var errorInner = dp.querySelector('.form-field__error');
    /* panel 생성 */
    var panel = document.createElement('div');
    panel.className = 'dp__panel dp__panel--scroll'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','기간 선택'); panel.setAttribute('aria-multiselectable','true'); panel.setAttribute('hidden','');
    panel.style.position='absolute'; panel.style.zIndex='1000';
    panel.innerHTML = '<div class="dp__sticky-header"><div class="dp__header">'
      + '<button class="dp__nav-btn" type="button" id="df-dpr-prev" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>'
      + '<div class="dp__select-group" aria-live="polite" aria-atomic="true">'
      + '<input class="dp__select-input" id="df-dpr-yi" type="number" min="1990" max="' + (today.getFullYear()+10) + '" aria-label="연도">'
      + '<span class="dp__select-label">년</span>'
      + '<input class="dp__select-input dp__select-input--month" id="df-dpr-mi" type="number" min="1" max="12" aria-label="월">'
      + '<span class="dp__select-label">월</span>'
      + '<button class="btn btn--secondary btn--solid btn--sm" id="df-dpr-today" type="button">오늘</button>'
      + '</div>'
      + '<button class="dp__nav-btn" type="button" id="df-dpr-next" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>'
      + '</div>'
      + '<div class="dp__weekday-bar"><span class="cal__weekday" role="columnheader">일</span><span class="cal__weekday" role="columnheader">월</span><span class="cal__weekday" role="columnheader">화</span><span class="cal__weekday" role="columnheader">수</span><span class="cal__weekday" role="columnheader">목</span><span class="cal__weekday" role="columnheader">금</span><span class="cal__weekday" role="columnheader">토</span></div>'
      + '</div>'
      + '<div class="dp__scroll-inner" id="df-dpr-si"><div class="dp__scroll-body" id="df-dpr-sb"></div></div>';
    document.body.appendChild(panel);
    var scrollInner = panel.querySelector('#df-dpr-si');
    var scrollBody  = panel.querySelector('#df-dpr-sb');
    var yearInput   = panel.querySelector('#df-dpr-yi');
    var monthInput  = panel.querySelector('#df-dpr-mi');
    function firstSection() { return scrollBody.querySelector('.dp__month-section'); }
    function lastSection()  { var all=scrollBody.querySelectorAll('.dp__month-section'); return all[all.length-1]; }
    function prependMonth() {
      var f=firstSection(), y=+f.dataset.year, m=+f.dataset.month-1;
      if(m<0){m=11;y--;} var prevH=scrollBody.offsetHeight;
      scrollBody.insertBefore(renderSection(y,m),f); scrollInner.scrollTop+=scrollBody.offsetHeight-prevH;
    }
    function appendMonth() { var l=lastSection(), y=+l.dataset.year, m=+l.dataset.month+1; if(m>11){m=0;y++;} scrollBody.appendChild(renderSection(y,m)); }
    function positionPanel() {
      var r=trigger.getBoundingClientRect(), panelH=panel.offsetHeight, spaceBelow=window.innerHeight-r.bottom;
      if(panelH>spaceBelow&&r.top>panelH) panel.style.top=(r.top+(window.pageYOffset||0)-panelH-4)+'px';
      else panel.style.top=(r.bottom+(window.pageYOffset||0)+4)+'px';
      panel.style.left=(r.left+(window.pageXOffset||0))+'px';
    }
    function makeBtn(d, mm) {
      var outside=d.getMonth()!==mm;
      var awaitingEnd=rangeStart&&!rangeEnd;
      var disabled=!outside&&awaitingEnd&&!isSame(d,rangeStart)&&d<rangeStart;
      var inactive=outside||disabled;
      var isStart=isSame(d,rangeStart), isEnd=isSame(d,rangeEnd), inRange=isBetween(d,rangeStart,rangeEnd);
      var effectiveEnd=rangeEnd||hoverDate, goLeft=effectiveEnd&&effectiveEnd<rangeStart;
      var isPreview=!rangeEnd&&rangeStart&&hoverDate&&isBetween(d,rangeStart,hoverDate);
      var isHoverEnd=!rangeEnd&&rangeStart&&hoverDate&&!isStart&&isSame(d,hoverDate);
      var btn=document.createElement('button'); btn.setAttribute('role','gridcell'); btn.setAttribute('type','button');
      btn.dataset.date=d.getFullYear()+','+d.getMonth()+','+d.getDate();
      if(inactive) btn.dataset.inactive='true';
      var cls=['cal__day'];
      if(outside) cls.push('cal__day--outside');
      if(disabled) cls.push('cal__day--disabled');
      if(!outside&&isSame(d,today)){cls.push('cal__day--today');btn.setAttribute('aria-current','date');}
      if(isStart){if(!effectiveEnd)cls.push('cal__day--range-solo');else if(rangeEnd)cls.push(goLeft?'cal__day--range-start-left':'cal__day--range-start');else cls.push(goLeft?'cal__day--range-start-left-pre':'cal__day--range-start-pre');}
      if(isEnd) cls.push('cal__day--range-end');
      if(inRange) cls.push('cal__day--in-range');
      if(isPreview) cls.push('cal__day--in-range-preview');
      if(isHoverEnd) cls.push(goLeft?'cal__day--hover-end-left':'cal__day--hover-end');
      if(isStart||isEnd||inRange) btn.setAttribute('aria-selected','true');
      btn.className=cls.join(' '); btn.setAttribute('tabindex',(isStart||isEnd)&&!inactive?'0':'-1'); btn.textContent=d.getDate(); return btn;
    }
    function renderSection(my, mm) {
      var section=document.createElement('div'); section.className='dp__month-section'; section.dataset.year=my; section.dataset.month=mm;
      var header=document.createElement('div'); header.className='dp__month-divider'; header.textContent=my+'년 '+(mm+1)+'월'; section.appendChild(header);
      var calDiv=document.createElement('div'); calDiv.className='cal';
      var gridDiv=document.createElement('div'); gridDiv.className='cal__grid'; gridDiv.setAttribute('role','grid'); gridDiv.setAttribute('aria-label',my+'년 '+(mm+1)+'월'); gridDiv.setAttribute('aria-multiselectable','true');
      var weeksDiv=document.createElement('div');
      var first=new Date(my,mm,1), last=new Date(my,mm+1,0), cur=new Date(first); cur.setDate(cur.getDate()-cur.getDay());
      while(cur<=last||cur.getDay()!==0){
        var row=document.createElement('div'); row.className='cal__week'; row.setAttribute('role','row');
        for(var i=0;i<7;i++){row.appendChild(makeBtn(new Date(cur),mm));cur.setDate(cur.getDate()+1);}
        weeksDiv.appendChild(row); if(cur>last&&cur.getDay()===0) break;
      }
      gridDiv.appendChild(weeksDiv); calDiv.appendChild(gridDiv); section.appendChild(calDiv); return section;
    }
    function updateClasses() {
      var btns=Array.prototype.slice.call(scrollBody.querySelectorAll('.cal__day'));
      var awaitingEnd=rangeStart&&!rangeEnd;
      var rangeCls=['cal__day--range-solo','cal__day--range-start','cal__day--range-start-left','cal__day--range-start-pre','cal__day--range-start-left-pre','cal__day--range-end','cal__day--in-range','cal__day--in-range-preview','cal__day--hover-end','cal__day--hover-end-left'];
      btns.forEach(function(btn) {
        rangeCls.forEach(function(c){btn.classList.remove(c);}); btn.removeAttribute('aria-selected');
        var d=fromKey(btn.dataset.date), outside=btn.classList.contains('cal__day--outside');
        var beforeStart=!outside&&awaitingEnd&&!isSame(d,rangeStart)&&d<rangeStart;
        btn.classList.toggle('cal__day--disabled',!outside&&!!beforeStart);
        if(!outside){if(beforeStart)btn.dataset.inactive='true';else delete btn.dataset.inactive;}
        if(btn.dataset.inactive) return;
        var isStart=isSame(d,rangeStart),isEnd=isSame(d,rangeEnd),inRange=isBetween(d,rangeStart,rangeEnd);
        var effectiveEnd=rangeEnd||hoverDate,goLeft=effectiveEnd&&effectiveEnd<rangeStart;
        var isPreview=!rangeEnd&&rangeStart&&hoverDate&&isBetween(d,rangeStart,hoverDate);
        var isHoverEnd=!rangeEnd&&rangeStart&&hoverDate&&!isStart&&isSame(d,hoverDate);
        if(isStart){if(!effectiveEnd)btn.classList.add('cal__day--range-solo');else if(rangeEnd)btn.classList.add(goLeft?'cal__day--range-start-left':'cal__day--range-start');else btn.classList.add(goLeft?'cal__day--range-start-left-pre':'cal__day--range-start-pre');}
        if(isEnd) btn.classList.add('cal__day--range-end');
        if(inRange) btn.classList.add('cal__day--in-range');
        if(isPreview) btn.classList.add('cal__day--in-range-preview');
        if(isHoverEnd) btn.classList.add(goLeft?'cal__day--hover-end-left':'cal__day--hover-end');
        if(isStart||isEnd||inRange) btn.setAttribute('aria-selected','true');
      });
    }
    function updateValue() {
      if(rangeStart){sYrEl.value=String(rangeStart.getFullYear());sMoEl.value=pad(rangeStart.getMonth()+1);sDyEl.value=pad(rangeStart.getDate());}
      else{sYrEl.value=sMoEl.value=sDyEl.value='';}
      if(rangeEnd){eYrEl.value=String(rangeEnd.getFullYear());eMoEl.value=pad(rangeEnd.getMonth()+1);eDyEl.value=pad(rangeEnd.getDate());dp.classList.add('dp--has-value');}
      else{eYrEl.value=eMoEl.value=eDyEl.value='';dp.classList.remove('dp--has-value');}
    }
    function setOuterError(show) {
      dpField.classList.toggle('form-field--error', show);
      if(show){trigger.setAttribute('aria-invalid','true');trigger.setAttribute('aria-describedby','df-dpr-err');}
      else{trigger.removeAttribute('aria-invalid');trigger.removeAttribute('aria-describedby');}
    }
    function setInnerError(msg) { dp.classList.add('dp--error'); if(errorInner) errorInner.textContent=msg; }
    function clearInnerError() { dp.classList.remove('dp--error'); if(errorInner) errorInner.textContent=''; }
    function updateActive() {
      var sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section')), active=sections[0];
      sections.forEach(function(s){if(s.offsetTop-scrollInner.offsetTop<=scrollInner.scrollTop+40) active=s;});
      sections.forEach(function(s){s.classList.toggle('dp__month-section--active',s===active);});
      if(active){yearInput.value=active.dataset.year; monthInput.value=+active.dataset.month+1;}
    }
    function jumpTo(y,m) {
      scrollBody.innerHTML='';
      for(var i=-3;i<13;i++){var mm=m+i,my=y; while(mm<0){mm+=12;my--;} while(mm>11){mm-=12;my++;} scrollBody.appendChild(renderSection(my,mm));}
      requestAnimationFrame(function(){var secs=scrollBody.querySelectorAll('.dp__month-section'); scrollInner.scrollTop=secs[3]?secs[3].offsetTop-scrollInner.offsetTop:0; updateActive();});
    }
    function applyRangeParts(writeBack) {
      var sy=parseInt(sYrEl.value,10),sm=parseInt(sMoEl.value,10),sd=parseInt(sDyEl.value,10);
      var ey=parseInt(eYrEl.value,10),em=parseInt(eMoEl.value,10),ed=parseInt(eDyEl.value,10);
      var hasStart=sYrEl.value||sMoEl.value||sDyEl.value, hasEnd=eYrEl.value||eMoEl.value||eDyEl.value;
      clearInnerError();
      if(hasStart){if(!isValidDate(sy,sm,sd)){if(writeBack)setInnerError('시작 날짜가 유효하지 않습니다.');rangeStart=null;updateClasses();return false;} rangeStart=new Date(sy,sm-1,sd);}else rangeStart=null;
      if(hasEnd){if(!isValidDate(ey,em,ed)){if(writeBack)setInnerError('종료 날짜가 유효하지 않습니다.');rangeEnd=null;updateClasses();return false;} rangeEnd=new Date(ey,em-1,ed);}else rangeEnd=null;
      if(rangeStart&&rangeEnd&&rangeEnd<rangeStart){var t=rangeStart;rangeStart=rangeEnd;rangeEnd=t;}
      if(writeBack) updateValue();
      updateClasses();
      return !!(rangeStart&&rangeEnd);
    }
    function pickDate(date) {
      if(!rangeStart||rangeEnd){rangeStart=date;rangeEnd=null;hoverDate=null;}
      else if(isSame(rangeStart,date)){rangeStart=null;hoverDate=null;}
      else{rangeEnd=date;if(rangeEnd<rangeStart){var t=rangeStart;rangeStart=rangeEnd;rangeEnd=t;} hoverDate=null;updateValue();updateClasses();setOuterError(false);close();return;}
      updateValue();updateClasses();
    }
    function scrollToSection(offset) {
      var sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section')), activeIdx=0;
      sections.forEach(function(s,i){if(s.classList.contains('dp__month-section--active'))activeIdx=i;});
      if(offset===-1&&activeIdx===0){prependMonth();sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section'));activeIdx=1;}
      if(offset===1&&activeIdx===sections.length-1){appendMonth();sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section'));}
      var target=sections[activeIdx+offset]; if(target) scrollInner.scrollTop=target.offsetTop-scrollInner.offsetTop;
    }
    function open() {
      applyRangeParts();
      var ay=rangeStart?rangeStart.getFullYear():baseYear, am=rangeStart?rangeStart.getMonth():baseMonth;
      if(!scrollBody.children.length){
        for(var i=-3;i<13;i++){var mm=am+i,my=ay; while(mm<0){mm+=12;my--;} while(mm>11){mm-=12;my++;} scrollBody.appendChild(renderSection(my,mm));}
      }
      panel.removeAttribute('hidden'); dp.classList.add('dp--open'); positionPanel();
      requestAnimationFrame(function(){
        var sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section')), cur=null;
        sections.forEach(function(s){if(+s.dataset.year===ay&&+s.dataset.month===am)cur=s;});
        if(cur) scrollInner.scrollTop=cur.offsetTop-scrollInner.offsetTop; else jumpTo(ay,am);
        updateActive();
      });
    }
    function close() {
      panel.setAttribute('hidden',''); dp.classList.remove('dp--open'); hoverDate=null;
      setOuterError(!dp.classList.contains('dp--has-value'));
    }
    function isOpen() { return !panel.hasAttribute('hidden'); }
    trigger.addEventListener('click', function(){if(!isOpen())open();});
    trigger.querySelector('.dp__chevron').addEventListener('click', function(e){e.stopPropagation();isOpen()?close():open();});
    function makeAdvance(el,maxLen,nextEl){el.addEventListener('input',function(){el.value=el.value.replace(/\D/g,'').slice(0,maxLen);if(nextEl&&el.value.length===maxLen)nextEl.focus();});}
    makeAdvance(sYrEl,4,sMoEl);makeAdvance(sMoEl,2,sDyEl);makeAdvance(sDyEl,2,eYrEl);makeAdvance(eYrEl,4,eMoEl);makeAdvance(eMoEl,2,eDyEl);makeAdvance(eDyEl,2,null);
    [sYrEl,sMoEl,sDyEl,eYrEl,eMoEl,eDyEl].forEach(function(el){
      el.addEventListener('input',function(){clearInnerError();if(isOpen()){applyRangeParts();var y=parseInt(sYrEl.value,10),m=parseInt(sMoEl.value,10);if(sYrEl.value.length===4&&!isNaN(y)&&sMoEl.value.length>=1&&!isNaN(m)&&m>=1&&m<=12)jumpTo(y,m-1);}});
      el.addEventListener('blur',function(){setTimeout(function(){if(dp.contains(document.activeElement)||panel.contains(document.activeElement))return;applyRangeParts(true);if(isOpen())close();},0);});
      el.addEventListener('keydown',function(e){if(e.key==='Escape'){close();el.blur();}if(e.key==='Enter'){e.preventDefault();el.blur();}});
    });
    scrollBody.addEventListener('click',function(e){var btn=e.target.closest?e.target.closest('.cal__day'):e.target;if(!btn||btn.dataset.inactive)return;e.stopPropagation();pickDate(fromKey(btn.dataset.date));});
    scrollBody.addEventListener('mouseover',function(e){var btn=e.target.closest?e.target.closest('.cal__day'):e.target;if(!btn||btn.dataset.inactive||!rangeStart||rangeEnd)return;var d=fromKey(btn.dataset.date);if(!isSame(d,hoverDate)){hoverDate=d;updateClasses();}});
    scrollInner.addEventListener('scroll',function(){updateActive();if(scrollInner.scrollTop<120)prependMonth();if(scrollInner.scrollTop+scrollInner.clientHeight>scrollInner.scrollHeight-120)appendMonth();});
    panel.querySelector('#df-dpr-prev').addEventListener('click',function(e){e.stopPropagation();scrollToSection(-1);});
    panel.querySelector('#df-dpr-next').addEventListener('click',function(e){e.stopPropagation();scrollToSection(1);});
    panel.querySelector('#df-dpr-today').addEventListener('click',function(e){e.stopPropagation();jumpTo(today.getFullYear(),today.getMonth());});
    yearInput.addEventListener('click',function(e){e.stopPropagation();}); monthInput.addEventListener('click',function(e){e.stopPropagation();});
    yearInput.addEventListener('blur',function(){var y=parseInt(yearInput.value,10);var active=scrollBody.querySelector('.dp__month-section--active');var curM=active?+active.dataset.month:baseMonth;if(!isNaN(y)&&y>=1990&&y<=today.getFullYear()+10)jumpTo(y,curM);else yearInput.value=active?active.dataset.year:baseYear;});
    monthInput.addEventListener('blur',function(){var m=parseInt(monthInput.value,10);var active=scrollBody.querySelector('.dp__month-section--active');var curY=active?+active.dataset.year:baseYear;if(!isNaN(m)&&m>=1&&m<=12)jumpTo(curY,m-1);else monthInput.value=active?+active.dataset.month+1:baseMonth+1;});
    document.addEventListener('click',function(e){if(!dp.contains(e.target)&&!panel.contains(e.target)){if(isOpen())close();}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(isOpen())close();}});
  })();
})();
</script>
:::

---

## Anatomy

<!-- AI:
form-field 구조:
- root = div.form-field. layout·state 클래스를 root에 조합.
- label: label.form-field__label.text-form-label + for/id 연결. required 표시는 span.form-field__required(aria-hidden).
- control: Atom 그대로 배치.
  - Input/Textarea: label.form-field__label(for/id) + control.
  - Checkbox/Radio: div.form-field__label(id) + fieldset.checkbox-group(aria-labelledby) — legend를 fieldset 밖으로 분리해 input과 동일한 3-flex 구조 확보.
  - Toggle (단독): label.toggle만. toggle__label이 시각 레이블 역할이므로 form-field__label 불필요.
  - Toggle (복수 그룹): div.form-field__label(그룹 라벨) + div.form-field__toggles > label.toggle들.
  - Dropdown: label.form-field__label(id=..., for 생략) + div.dropdown > button.dropdown__trigger[aria-labelledby="label-id"] — <button>은 for 연결 불가, aria-labelledby 필수.
  - Combobox: label.form-field__label(for="combobox__input id") + div.combobox > input.combobox__input[id="..."] — input이 있으므로 for 직접 연결 가능.
  - DatePicker: label.form-field__label(id="lbl-id", for 생략) + div.dp > div.dp__trigger[aria-labelledby="lbl-id"]. dp 자체 aria-label 제거하고 aria-labelledby로 대체. dp 내부 form-field__footer는 날짜 유효성 오류 전용이고, 필수 선택 여부 에러는 form-field 외부 footer로 처리한다. range는 dp--range 추가.
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

Toggle 그룹 접근성:
- div.form-field__toggles에 role="group" aria-labelledby="[form-field__label id]" 추가 — 스크린리더가 그룹 라벨을 toggle 목록과 연결.

DatePicker footer 이중 구조:
- dp 내부 div.form-field__footer: 날짜 유효성 오류(dp JS 제어) 전용.
- form-field 외부 div.form-field__footer: 필수 선택 여부 에러(form-field JS 제어) 전용.
- 두 footer가 동시에 보이지 않도록 JS에서 조율한다.

Combobox clear 버튼:
- combobox__clear 버튼에 icon-on--badge 유틸리티 사용 → utilities/icon.css 참조.

preview script:
- stage = 뷰어가 주입하는 preview 컨테이너 DOM 참조. 실제 구현 시 document.querySelector('#...')로 대체한다.
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
      <div class="form-field__label text-form-label" id="ff-cbv1-label">알림 수신 <span class="form-field__required" aria-hidden="true">(필수)</span></div>
      <fieldset class="checkbox-group" aria-labelledby="ff-cbv1-label">
        <label class="checkbox checkbox--sm"><input type="checkbox" checked /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">이메일</span></label>
        <label class="checkbox checkbox--sm"><input type="checkbox" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">SMS</span></label>
      </fieldset>
    </div>
    <div data-component class="form-field form-field--error">
      <div class="form-field__label text-form-label" id="ff-cbv2-label">알림 수신 <span class="form-field__required" aria-hidden="true">(필수)</span></div>
      <fieldset class="checkbox-group" aria-labelledby="ff-cbv2-label">
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
  <div class="form-field-group--horizontal">
    <div data-component class="form-field">
      <div class="form-field__label text-form-label" id="ff-cbh-label">알림 수신</div>
      <div class="form-field__body">
        <fieldset class="checkbox-group checkbox-group--horizontal" aria-labelledby="ff-cbh-label">
          <label class="checkbox checkbox--sm"><input type="checkbox" checked /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">이메일</span></label>
          <label class="checkbox checkbox--sm"><input type="checkbox" /><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">SMS</span></label>
        </fieldset>
      </div>
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
    <div class="form-field__label text-form-label" id="ff-rv-label">성별</div>
    <fieldset class="radio-group" aria-labelledby="ff-rv-label">
      <label class="radio radio--sm"><input type="radio" name="ff-rv" checked /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">남성</span></label>
      <label class="radio radio--sm"><input type="radio" name="ff-rv" /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">여성</span></label>
    </fieldset>
  </div>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형</p>
  <div class="form-field-group--horizontal">
    <div data-component class="form-field">
      <div class="form-field__label text-form-label" id="ff-rh-label">성별</div>
      <div class="form-field__body">
        <fieldset class="radio-group radio-group--horizontal" aria-labelledby="ff-rh-label">
          <label class="radio radio--sm"><input type="radio" name="ff-rh" checked /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">남성</span></label>
          <label class="radio radio--sm"><input type="radio" name="ff-rh" /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">여성</span></label>
        </fieldset>
      </div>
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
  <div style="width:200px">
    <div data-component class="form-field">
      <div class="form-field__label text-form-label" id="ff-tgv-label">알림 설정</div>
      <div class="form-field__toggles" role="group" aria-labelledby="ff-tgv-label">
        <label class="toggle toggle--sm">
          <input type="checkbox" role="switch" checked />
          <span class="toggle__track"><span class="toggle__thumb"></span></span>
          <span class="toggle__label text-form-label">마케팅 알림</span>
        </label>
        <label class="toggle toggle--sm">
          <input type="checkbox" role="switch" />
          <span class="toggle__track"><span class="toggle__thumb"></span></span>
          <span class="toggle__label text-form-label">푸시 알림</span>
        </label>
      </div>
      <div class="form-field__footer">
        <p class="form-field__help text-helper">이벤트·프로모션 정보를 받아볼 수 있어요.</p>
      </div>
    </div>
  </div>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형</p>
  <div class="form-field-group--horizontal">
    <div data-component class="form-field">
      <div class="form-field__label text-form-label">알림 설정</div>
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
</div>
:::

### Dropdown 기반

:::preview
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap;justify-content:center;padding-bottom:200px">
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형 — 기본</p>
  <div style="width:200px">
    <div data-component class="form-field">
      <label class="form-field__label text-form-label" id="ff-dd-dept-label">부서</label>
      <div class="dropdown dropdown--button dropdown--sm" style="width:100%">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="ff-dd-dept-label">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-labelledby="ff-dd-dept-label">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">개발팀</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">디자인팀</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">마케팅팀</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">운영팀</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형 — 에러</p>
  <div style="width:200px">
    <div data-component class="form-field form-field--error">
      <label class="form-field__label text-form-label" id="ff-dd-dept-err-label">부서 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
      <div class="dropdown dropdown--button dropdown--sm dropdown--error" style="width:100%">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="ff-dd-dept-err-label" aria-invalid="true" aria-describedby="ff-dd-dept-err">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-labelledby="ff-dd-dept-err-label">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">개발팀</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">디자인팀</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">마케팅팀</span></li>
          </ul>
        </div>
      </div>
      <div class="form-field__footer" id="ff-dd-dept-err">
        <p class="form-field__error text-helper" role="alert">부서를 선택해주세요.</p>
      </div>
    </div>
  </div>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형</p>
  <div class="form-field-group--horizontal" style="width:320px">
    <div data-component class="form-field">
      <label class="form-field__label text-form-label" id="ff-dd-h-label">부서</label>
      <div class="form-field__body">
        <div class="dropdown dropdown--button dropdown--sm" style="width:100%">
          <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="ff-dd-h-label">
            <span class="dropdown__value">디자인팀</span>
            <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
          </button>
          <div class="dropdown__panel">
            <ul class="dropdown__list" role="listbox" aria-labelledby="ff-dd-h-label">
              <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">디자인팀</span></li>
              <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">개발팀</span></li>
              <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">마케팅팀</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
:::

### Combobox 기반

:::preview
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap;justify-content:center;padding-bottom:200px">
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형 — 기본</p>
  <div style="width:200px">
    <div data-component class="form-field">
      <label class="form-field__label text-form-label" for="ff-cb-assign">담당자</label>
      <div class="combobox combobox--sm" style="width:100%">
        <div class="combobox__trigger">
          <input class="combobox__input" id="ff-cb-assign" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false" aria-autocomplete="list"
                 aria-controls="ff-cb-assign-list" placeholder="검색" />
          <!-- 닫힌 상태 프리뷰 — 실제 구현 시 aria-controls가 가리키는 ul[role="listbox"]가 필요 -->
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
  </div>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형 — 에러</p>
  <div style="width:200px">
    <div data-component class="form-field form-field--error">
      <label class="form-field__label text-form-label" for="ff-cb-assign-err">담당자 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
      <div class="combobox combobox--sm combobox--error" style="width:100%">
        <div class="combobox__trigger">
          <input class="combobox__input" id="ff-cb-assign-err" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false" aria-autocomplete="list"
                 aria-invalid="true" aria-describedby="ff-cb-assign-err-msg"
                 aria-controls="ff-cb-assign-err-list" placeholder="검색" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
      <div class="form-field__footer" id="ff-cb-assign-err-msg">
        <p class="form-field__error text-helper" role="alert">담당자를 선택해주세요.</p>
      </div>
    </div>
  </div>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형</p>
  <div class="form-field-group--horizontal" style="width:320px">
    <div data-component class="form-field">
      <label class="form-field__label text-form-label" for="ff-cb-h-assign">담당자</label>
      <div class="form-field__body">
        <div class="combobox combobox--sm combobox--has-value" style="width:100%">
          <div class="combobox__trigger">
            <input class="combobox__input" id="ff-cb-h-assign" type="text" role="combobox"
                   aria-haspopup="listbox" aria-expanded="false" aria-autocomplete="list"
                   aria-controls="ff-cb-h-assign-list" value="이영희" />
            <!-- 닫힌 상태 프리뷰 — 실제 구현 시 aria-controls가 가리키는 ul[role="listbox"]가 필요 -->
            <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
            <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
:::

### DatePicker 기반

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl)">

  <div>
    <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형</p>
    <div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap">
      <div data-component class="form-field" style="width:220px">
        <label class="form-field__label text-form-label" id="ff-dp-v-s-label">날짜</label>
        <div class="dp">
          <div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="ff-dp-v-s-label">
            <div class="dp__value-group">
              <input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="연도" autocomplete="off">
              <span class="dp__value-sep" aria-hidden="true">.</span>
              <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="월" autocomplete="off">
              <span class="dp__value-sep" aria-hidden="true">.</span>
              <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="일" autocomplete="off">
            </div>
            <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
          </div>
        </div>
      </div>
      <div data-component class="form-field" style="width:300px">
        <label class="form-field__label text-form-label" id="ff-dp-v-r-label">기간</label>
        <div class="dp dp--range">
          <div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="ff-dp-v-r-label">
            <div class="dp__value-group">
              <input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="시작 연도" autocomplete="off">
              <span class="dp__value-sep" aria-hidden="true">.</span>
              <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="시작 월" autocomplete="off">
              <span class="dp__value-sep" aria-hidden="true">.</span>
              <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="시작 일" autocomplete="off">
              <span class="dp__value-sep dp__value-sep--range" aria-hidden="true">~</span>
              <input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="종료 연도" autocomplete="off">
              <span class="dp__value-sep" aria-hidden="true">.</span>
              <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="종료 월" autocomplete="off">
              <span class="dp__value-sep" aria-hidden="true">.</span>
              <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="종료 일" autocomplete="off">
            </div>
            <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형</p>
    <div class="form-field-group--horizontal" style="width:460px">
      <div data-component class="form-field">
        <label class="form-field__label text-form-label" id="ff-dp-h-s-label">날짜</label>
        <div class="form-field__body">
          <div class="dp">
            <div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="ff-dp-h-s-label">
              <div class="dp__value-group">
                <input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="연도" autocomplete="off">
                <span class="dp__value-sep" aria-hidden="true">.</span>
                <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="월" autocomplete="off">
                <span class="dp__value-sep" aria-hidden="true">.</span>
                <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="일" autocomplete="off">
              </div>
              <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
            </div>
          </div>
        </div>
      </div>
      <div data-component class="form-field">
        <label class="form-field__label text-form-label" id="ff-dp-h-r-label">기간</label>
        <div class="form-field__body">
          <div class="dp dp--range">
            <div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="ff-dp-h-r-label">
              <div class="dp__value-group">
                <input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="시작 연도" autocomplete="off">
                <span class="dp__value-sep" aria-hidden="true">.</span>
                <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="시작 월" autocomplete="off">
                <span class="dp__value-sep" aria-hidden="true">.</span>
                <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="시작 일" autocomplete="off">
                <span class="dp__value-sep dp__value-sep--range" aria-hidden="true">~</span>
                <input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="종료 연도" autocomplete="off">
                <span class="dp__value-sep" aria-hidden="true">.</span>
                <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="종료 월" autocomplete="off">
                <span class="dp__value-sep" aria-hidden="true">.</span>
                <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="종료 일" autocomplete="off">
              </div>
              <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
            </div>
          </div>
        </div>
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
  margin-left: var(--space-2); /* space-inset-xs(4px)보다 작은 2px — Semantic 미정의, 의도적 Primitive 참조 */
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
/* input-wrap은 atoms/input.md에서 position: relative 정의 → .input-char-count의 position: absolute 기준점 */
/* right(space-8) + 카운터 표기폭(space-32) = 40px — space-32는 Semantic 미정의, 의도적 Primitive 참조 */
.input-wrap--char-count .input {
  padding-right: calc(var(--space-8) + var(--space-32));
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
/* 하단 여백: 카운트 줄 높이(font-size-meta) + 위아래 간격(space-4 × 2) — space-4 = Primitive, Semantic 매핑 없음 */
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
  width: 120px; /* horizontal 레이아웃 전용 고정 레이블 너비. form-field-group--horizontal에서는 subgrid가 자동 정렬하므로 이 값 미사용 */
  padding-top: var(--space-8); /* space-8 = Primitive 8px, Semantic 미정의 */
}
.form-field__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-xs);
}


/* checkbox-group·radio-group·standalone toggle: input 상하 내부 여백(6px)과 맞춤 — space-6은 Semantic 미정의, input padding-top과 시각 정렬을 위한 의도적 Primitive 참조 */
.form-field .checkbox-group,
.form-field .radio-group,
.form-field .toggle {
  padding: var(--space-6) 0;
}
/* toggle 그룹 래퍼: checkbox-group·radio-group과 동일한 수직 간격 */
.form-field__toggles {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
  padding: var(--space-6) 0; /* space-6 = Primitive, input padding-top과 시각 정렬용 */
}
/* 그룹 안 개별 toggle은 래퍼가 padding을 담당 */
.form-field__toggles .toggle {
  padding: 0;
}

/* ── Dropdown · Combobox: form-field 너비에 맞게 확장 ── */
.form-field .dropdown,
.form-field .combobox {
  width: 100%;
}

/* ── Group wrapper (세로) ── */
.form-field-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-md);
}

/* ── Group wrapper (가로) : 라벨 열 자동 정렬 ── */
/* 내부 .form-field가 subgrid로 부모 컬럼을 공유 → 가장 긴 라벨 기준 정렬 */
/* subgrid 지원: Chrome 117+, Safari 16+, Firefox 71+. 구형 환경이 필요하면 form-field--horizontal 단독 사용으로 대체 */
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
  padding-top: var(--space-8); /* space-8 = Primitive 8px, form-field--horizontal 라벨과 동일 이유로 Semantic 미정의, 의도적 Primitive 참조 */
}
/* checkbox·radio·toggle: 아이콘 컨트롤은 padding-top(6px)과 같은 높이에서 시작 */
.form-field-group--horizontal:has(.checkbox-group) .form-field__label,
.form-field-group--horizontal:has(.radio-group) .form-field__label,
.form-field-group--horizontal:has(.toggle) .form-field__label {
  padding-top: var(--space-6);
}
```

---

## 접근성

폼 입력·드롭다운 혼합 유형 (`accessibility.md` 텍스트 인풋 행·드롭다운 행 적용).

| 상황 | 마크업 |
|------|--------|
| Input · Textarea | `<label for="id">` + `<[control] id="id">` |
| Checkbox · Radio 그룹 | `<div class="form-field__label" id="...">` + `<fieldset aria-labelledby="...">` — legend를 분리해 input과 동일한 3-flex 구조 유지 |
| Toggle | `<input type="checkbox" role="switch">` — toggle__label이 시각 레이블 역할 |
| Dropdown | `<label id="lbl-id">` (for 생략) + `<button aria-labelledby="lbl-id">` + `<ul role="listbox" aria-labelledby="lbl-id">` |
| Combobox | `<label for="input-id">` + `<input id="input-id" role="combobox">` |
| DatePicker | `<label id="lbl-id">` (for 생략) + `<div class="dp__trigger" aria-labelledby="lbl-id" aria-haspopup="dialog">` — trigger가 div이므로 aria-labelledby 필수. dp 자체 aria-label 제거 |
| 필수 필드 | control에 `aria-required="true"`. `(필수)` 표시는 `aria-hidden="true"` |
| 에러 | control에 `aria-invalid="true"` + `aria-describedby="[error-id]"`. 에러 요소에 `role="alert"` |
| footer 연결 | footer가 있으면 control에 `aria-describedby="[footer-id]"` 기본 지정. 에러 상태에서 `[error-id]`로 교체 |
| footer 없음 | `aria-describedby` 생략 |
| 인라인 카운트 | `aria-hidden="true"` — 시각적 보조 전용. 스크린리더에 전달하지 않는다 |
| 키보드 조작 | Tab으로 control 간 이동. 에러 발생 후 focus는 현재 control 유지. Dropdown·Combobox·DatePicker 내부 키보드 조작은 각 컴포넌트 문서 참조 |
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

> ❌ DON'T — Toggle에 폼 제출 흐름 적용
> 저장 액션이 필요한 경우 Checkbox를 사용한다

> ❌ DON'T — Label 없이 FormField 사용
> Label이 불필요하면 FormField로 감싸지 않고 Control 단독 + `aria-label`로 처리한다

> ✅ DO — DatePicker를 FormField에 넣을 때 footer 역할을 분리
> dp 내부 `form-field__footer`(날짜 유효성 오류)와 dp 외부 `form-field__footer`(필수 선택 에러)를 따로 관리. JS에서 두 에러가 동시에 노출되지 않도록 조율한다

> ❌ DON'T — disabled 상태의 control에 에러 처리 적용
> disabled control은 사용자 입력이 불가하므로 유효성 검사에서 제외한다
