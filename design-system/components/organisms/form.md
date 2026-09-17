---
file: components/organisms/form.md
version: 0.4.2
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, tokens/radius.md, components/atoms/input.md, components/atoms/textarea.md, components/atoms/button.md, components/atoms/toggle.md, components/molecules/form-field.md, components/molecules/date-picker.md, components/atoms/calendar.md, components/atoms/icon.md
---

# Form

## 개요

여러 FormField를 레이아웃에 따라 배치하고 제출 흐름을 갖춘 입력 Organism. FormSection으로 필드를 주제별로 묶고, FormRow로 한 줄 내 필드 너비를 지정한다.

FormField와의 차이 — FormField는 단일 입력 단위(Label + Control + Footer)를 다루고, Form은 여러 FormField의 **배치·섹션 구분·조건부 표시·제출**을 담당한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| FormRow 너비 | full · half · auto | full (기본, 클래스 없음) |
| FormSection 조건부 | 기본 (클래스 없음) · `form-section--hidden` | 기본 (클래스 없음) |

- **full** — 행 전체 너비. 메모·주소처럼 넓은 입력.
- **half** — 행을 균등 분할. 이름 + 주민등록번호처럼 나란히 배치.
- **auto** — 컨텐츠에 맞는 최소 너비. 단위(원, %, 일) 붙는 짧은 필드.
- **form-section--hidden** — Toggle 등 외부 조건에 따라 섹션 전체를 숨길 때.

---

<!-- AI:
레이어 계층:
Form — 레이아웃 루트
  └─ FormSection — 주제별 필드 그룹 (optional)
       ├─ FormSection Header — 제목+컨트롤 행. 컨트롤 없으면 Title 직접 배치 (optional)
       │    ├─ FormSection Title — 섹션 제목 (optional)
       │    └─ 섹션 컨트롤 — Toggle·Segment 등 (optional)
       └─ FormSection Body — FormRow들의 세로 스택
            └─ FormRow — 한 줄 필드 묶음
                 └─ FormField — 너비 variant 지정 (full · half · auto)
  └─ Form Footer — 제출 버튼 영역. 취소 → 저장 순서 (optional)

섹션 간 간격:
- `.form` 루트 안에서는 `gap: var(--space-gap-2xl)`이 자동으로 섹션을 분리한다.
- `.form` 루트 없이 탭 패널·모달 패널 등 외부 컨테이너에 FormSection을 배치할 때는 각 그룹을 `<div>`로 감싸고 마지막 그룹을 제외한 나머지에 `margin-bottom: var(--space-stack-2xl)`을 명시한다.
  - 이렇게 하면 `.form`의 gap과 동일한 시각적 계층을 유지할 수 있다.

동작:
- 조건부 섹션: Toggle·Segment 등 외부 컨트롤의 change 이벤트에서 form-section--hidden 클래스를 토글한다.
  - 표시: section.classList.remove('form-section--hidden')
  - 숨김: section.classList.add('form-section--hidden')
- 폼 제출: form의 submit 이벤트에서 각 FormField의 유효성을 검사하고 실패한 필드에 form-field--error를 추가한다.
- 조건부 섹션이 숨겨진 상태에서는 해당 섹션 내 input에 disabled + tabindex="-1"을 적용해 탭 탐색·스크린리더에서 제외한다.

하위 컴포넌트 사용 규칙 (반드시 각 컴포넌트 문서의 마크업을 따를 것):
- 폼 필드(라벨+컨트롤): form-field.md. label에 form-field__label text-form-label 클래스 필수.
- 입력: input.md. 유효 크기 = 기본(클래스 없음) · input--sm · input--xs. input--md는 존재하지 않음.
- 드롭다운: dropdown.md. dropdown--button 커스텀 구조 사용. 네이티브 <select class="input"> 사용 금지.
  폼 내 선택이 검색·복수선택 불필요하면 Dropdown, 그 외엔 Combobox 사용.
- 버튼: button.md. **btn--sm·md·lg는 높이와 padding만 정하고 폰트는 정하지 않는다** — 타이포는 HTML에서
  text-button-{size}를 함께 붙인다(`btn btn--md text-button-md`). 폰트를 갖는 크기는 btn--xs·btn--micro뿐이고,
  이 둘에는 대응하는 유틸 클래스가 없어 함께 쓰지 않는다.
- 도움말 버튼(폼 필드 힌트): tooltip.md의 `button.tooltip-trigger` 패턴을 사용한다. `.tooltip-wrapper`로 감싸고 트리거에 `aria-label`(icon-only)·`aria-describedby`(패널 id)를 달아 `.tooltip-panel`을 연결한다. 아이콘은 `svg > use #icon-help`. icon-on--*·btn--* 버튼 컴포넌트가 아니다(tooltip.md 트리거 선택 기준 참조).
-->

## 사용 지침

:::preview
<div class="pattern-explorer">

  <nav class="pattern-explorer__tree" aria-label="레이아웃 패턴">
    <span class="pattern-explorer__group-label" style="margin-top:0">FormRow</span>
    <button class="pattern-explorer__item active" data-region="row-full">full</button>
    <button class="pattern-explorer__item" data-region="row-half">half + half</button>
    <button class="pattern-explorer__item" data-region="row-half-auto">half + auto</button>
    <span class="pattern-explorer__group-label">FormSection</span>
    <button class="pattern-explorer__item" data-region="section-title">제목</button>
    <button class="pattern-explorer__item" data-region="section-header">제목 + 컨트롤</button>
    <span class="pattern-explorer__group-label">기타</span>
    <button class="pattern-explorer__item" data-region="form-footer">Form Footer</button>
  </nav>

  <div class="pattern-explorer__panel">
    <form data-component class="form" novalidate>

      <div class="form-section" data-region="section-title">
        <h3 class="form-section__title">기본 정보</h3>
        <div class="form-section__body">

          <div class="form-row" data-region="row-half">
            <div class="form-field form-field--half">
              <label class="form-field__label" for="p-name">이름 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
              <div class="input-wrap"><input class="input" id="p-name" type="text" placeholder="이름" aria-required="true"></div>
            </div>
            <div class="form-field form-field--half">
              <label class="form-field__label" for="p-email">이메일</label>
              <div class="input-wrap"><input class="input" id="p-email" type="email" placeholder="example@email.com"></div>
            </div>
          </div>

          <div class="form-row" data-region="row-half-auto">
            <div class="form-field form-field--half">
              <label class="form-field__label" for="p-salary">월급여</label>
              <div class="input-wrap input-wrap--suffix"><input class="input" id="p-salary" type="text" placeholder="0"><span class="input__suffix">원</span></div>
            </div>
            <div class="form-field form-field--auto">
              <label class="form-field__label" for="p-rate">변동율</label>
              <div class="input-wrap input-wrap--suffix" style="width:96px"><input class="input" id="p-rate" type="text" placeholder="0"><span class="input__suffix">%</span></div>
            </div>
          </div>

          <div class="form-row" data-region="row-full">
            <div class="form-field">
              <label class="form-field__label" for="p-memo">메모</label>
              <div class="textarea-wrap"><textarea class="textarea" id="p-memo" rows="3" placeholder="내용을 입력하세요"></textarea></div>
            </div>
          </div>

        </div>
      </div>

      <div class="form-section">
        <div class="form-section__header" data-region="section-header">
          <h3 class="form-section__title">추가 옵션</h3>
          <label class="toggle" id="p-toggle-label">
            <input id="p-toggle" type="checkbox" role="switch">
            <span class="toggle__track"><span class="toggle__thumb"></span></span>
          </label>
        </div>
        <div id="p-conditional" class="form-section__body form-section--hidden">
          <div class="form-row">
            <div class="form-field">
              <div class="form-field__label" id="lbl-p-period">기간</div>
              <div class="dp dp--range" id="dp-p-period"><div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="lbl-p-period"><div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="시작 연도" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="시작 월" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="시작 일" autocomplete="off"><span class="dp__value-sep dp__value-sep--range" aria-hidden="true">~</span><input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="종료 연도" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="종료 월" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="종료 일" autocomplete="off"></div><span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span></div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="form__footer" data-region="form-footer">
        <button class="btn btn--ghost btn--md" type="button">취소</button>
        <button class="btn btn--primary btn--md" type="submit">저장하기</button>
      </div>

    </form>
  </div>
</div>
<script>
(function() {
  // initInput · initTextarea · initDP는 뷰어 전역 함수. 실제 구현 시 각 컴포넌트(input.md, textarea.md, date-picker.md)의 JS 문서 참조
  stage.querySelectorAll('.input').forEach(initInput);
  stage.querySelectorAll('.textarea').forEach(initTextarea);
  stage.querySelectorAll('.dp').forEach(initDP);

  var toggle = stage.querySelector('#p-toggle');
  var conditional = stage.querySelector('#p-conditional');
  toggle.addEventListener('change', function() {
    conditional.classList.toggle('form-section--hidden', !toggle.checked);
  });
  stage.querySelector('form').addEventListener('submit', function(e) { e.preventDefault(); });

  var navItems = stage.querySelectorAll('.pattern-explorer__item[data-region]');
  var codeLines = [];

  function getRegionRange(key) {
    var start = -1, indent = 0;
    for (var i = 0; i < codeLines.length; i++) {
      if (codeLines[i].textContent.indexOf('data-region="' + key + '"') !== -1) {
        start = i;
        var m = codeLines[i].textContent.match(/^(\s*)/);
        indent = m ? m[1].length : 0;
        break;
      }
    }
    if (start === -1) return [0, 0];
    for (var j = start + 1; j < codeLines.length; j++) {
      var t = codeLines[j].textContent;
      var ind = t.search(/\S/);
      if (ind >= 0 && ind <= indent && t.trimLeft().indexOf('</') === 0) return [start, j];
    }
    return [start, codeLines.length - 1];
  }

  function highlightCode(key) {
    codeLines.forEach(function(l) { l.classList.remove('code-region-active'); });
    var r = getRegionRange(key);
    for (var i = r[0]; i <= r[1]; i++) codeLines[i].classList.add('code-region-active');
  }

  navItems.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var key = btn.getAttribute('data-region');
      navItems.forEach(function(b) { b.classList.remove('active'); b.classList.remove('region-active'); });
      stage.querySelectorAll('[data-region]').forEach(function(el) { el.classList.remove('region-active'); });
      btn.classList.add('active');
      stage.querySelectorAll('[data-region="' + key + '"]').forEach(function(el) { el.classList.add('region-active'); });
      if (codeLines.length) highlightCode(key);
    });
  });

  setTimeout(function() {
    // 트리를 .component-preview 박스 밖으로 이동, flex 레이아웃으로 감싸기
    var previewBox = stage.parentNode; // .component-preview
    var tree = stage.querySelector('.pattern-explorer__tree');
    if (previewBox && tree && previewBox.parentNode) {
      var layout = document.createElement('div');
      layout.style.cssText = 'display:flex;gap:var(--space-gap-xl);align-items:flex-start;';
      previewBox.parentNode.insertBefore(layout, previewBox);
      layout.appendChild(tree);
      layout.appendChild(previewBox);
    }

    // 트리 이동 후 초기 클릭 — 이 시점에는 nav 버튼이 stage 밖에 있으므로 region-active 오염 없음
    navItems[0].click();

    // 코드 패널 라인 하이라이트
    var snippet = previewBox && previewBox.querySelector('.component-code-snippet');
    if (!snippet) return;
    snippet.innerHTML = snippet.innerHTML.split('\n').map(function(l) {
      return '<span class="code-line">' + l + '</span>';
    }).join('');
    codeLines = Array.from(snippet.querySelectorAll('.code-line'));
    var active = stage.querySelector('.pattern-explorer__item.active');
    if (active) highlightCode(active.getAttribute('data-region'));
  }, 0);
})();
</script>
:::

### 필드 너비 · 행 정렬 (여백 최소화)

너비 variant는 **필드 폭이 예상 입력 길이를 암시**하도록 고른다. 필요한 것보다 넓은 필드는 공간을 낭비하고 "긴 값이 들어가나?"라는 오해를 준다.

| 입력의 성격 | variant | 예 |
|------------|---------|-----|
| 자릿수·상한·형식이 정해짐 (수량·단위·코드·날짜·번호) | `form-field--auto` + 내부 `.input-wrap` `style="width:Npx"` | 근로시간(≤100), 비율(%), 우편번호, 생년월일 |
| 대략 절반 폭이면 충분한 가변 길이 | `form-field--half` | 이름, 전화번호 |
| 길거나 예측 불가 (문장·주소·메모) | `full` (기본, 클래스 없음) | 상세주소, 사유, 메모 |

**여백 최소화 정렬:**
- 길이가 정해진(auto) 필드는 **각각 full 행으로 세로로 쌓지 말고 같은 `form-row`에 가로로 묶는다.** 짧은 필드를 한 줄씩 두면 오른쪽에 큰 빈 공간이 남는다.
- **가로로 묶는 조건**: 각 필드가 예상 최대 입력값을 **잘림 없이** 보여줄 폭을 확보할 수 있을 때만 한 줄에 둔다. `form-field--auto`는 `flex: 0 0 auto`라 폭이 고정되어 좁은 컨테이너에서도 잘리지 않으므로 가로 묶음에 적합하다. 폭 확보가 어려우면 필드 수를 줄이거나 행을 나눈다.
- 한 `form-row`에는 성격이 이어지는 필드끼리 묶는다(예: 근로시간·월급여액). 여백을 채우려고 관련 없는 필드를 끼워 넣지 않는다.

### 제약

- Form 안에서 FormField의 `layout` variant는 항상 `vertical`(기본)을 사용한다. `form-field--horizontal`은 Form 바깥 단독 필드에서만 사용한다.
- `form-field--auto`는 단독 행에 두지 않는다. 반드시 `full` 또는 `half` 필드와 함께 같은 `form-row`에 배치한다. 실제 너비는 내부 `.input-wrap`에 `style="width:Npx"` 인라인 width로 지정한다.
- 조건부 섹션(`form-section--hidden`)의 표시/숨김은 외부 컴포넌트(Toggle, Segment 등)가 제어한다. Form 자체는 상태를 관리하지 않는다.
- **`.form` 루트 없이 탭 패널·모달 패널에 FormSection을 배치할 때**: 각 섹션 그룹을 `<div>`로 감싸고 `margin-bottom: var(--space-stack-2xl)`을 적용한다. `.form { gap: var(--space-gap-2xl) }`과 동일한 시각적 계층을 유지하기 위함.
- **`form-field--error`와 control 에러 클래스는 반드시 쌍으로 토글**한다. `input--error`, `dp--error` 등 control별 에러 클래스를 단독으로 사용하면 에러 메시지가 표시되지 않는다.

---

## 동작

### 유효성 검사 (submit-time)

제출 시점에 필수 필드(`data-required` 속성이 있는 `.form-field`)를 순회해 값이 비어 있으면 에러 상태를 설정하고, 첫 번째 오류 컨트롤로 포커스를 이동한다.

**필수 필드 마킹** — 필수인 `.form-field`에 `data-required` 속성을 추가한다.

```html
<div class="form-field" data-required>
  <label class="form-field__label" for="name">이름 <span aria-hidden="true">(필수)</span></label>
  <input class="input" id="name" type="text" aria-required="true">
  <div class="form-field__footer"><p class="form-field__error text-helper" role="alert"></p></div>
</div>
```

**control 유형별 "값 있음" 판단 기준**

| control | 비어 있음 조건 |
|---------|-------------|
| `input` / `textarea` | `el.value.trim() === ''` |
| `dropdown--button` | `.dropdown__value`에 `dropdown__value--placeholder` 클래스 있음 |
| `dp` (DatePicker single · range) | `.dp`에 `dp--has-value` 클래스 없음 |
| `checkbox` 그룹 | 그룹 내 체크된 `input[type=checkbox]` 0개 |
| `radio` 그룹 | 그룹 내 체크된 `input[type=radio]` 0개 |

**에러 설정 규칙**

- `form-field--error`와 control 에러 클래스(`input--error`, `dp--error`)를 **동시에 토글**한다.
- `.form-field__error` 요소에 `textContent`로 메시지를 설정하고, control에 `aria-invalid="true"`를 추가한다.
- 에러 해제: control의 `input` 또는 `change` 이벤트에서 값이 채워지면 즉시 두 클래스를 함께 제거한다.
- `hidden` 속성 또는 `form-section--hidden` 클래스가 적용된 컨테이너 안의 필드는 검사에서 제외한다.

**`<form>` submit 이벤트 컨텍스트**

```js
form.addEventListener('submit', function(e) {
  e.preventDefault();
  var firstError = validateFields(form);
  if (firstError) { firstError.focus(); return; }
  /* 제출 처리 */
});
```

**`.form` 루트 없는 컨텍스트 — modal · 탭 패널 버튼 클릭**

```js
saveBtn.addEventListener('click', function() {
  var firstError = validateFields(container);
  if (firstError) { firstError.focus(); return; }
  /* 저장 처리 */
});
```

**validateFields 헬퍼**

```js
function validateFields(container) {
  var firstErrorControl = null;
  container.querySelectorAll('.form-field[data-required]').forEach(function(field) {
    /* 숨겨진 섹션 내 필드는 건너뜀 */
    if (field.closest('[hidden]') || field.closest('.form-section--hidden')) return;

    var input    = field.querySelector('.input, .textarea');
    var dp       = field.querySelector('.dp');
    var dropdown = field.querySelector('.dropdown--button');
    var isEmpty  = false;
    var control  = null;

    if (input) {
      isEmpty = input.value.trim() === '';
      control = input;
      input.classList.toggle('input--error', isEmpty);
    } else if (dp) {
      isEmpty = !dp.classList.contains('dp--has-value');
      control = dp.querySelector('.dp__trigger');
      dp.classList.toggle('dp--error', isEmpty);
    } else if (dropdown) {
      var val = dropdown.querySelector('.dropdown__value');
      isEmpty = val ? val.classList.contains('dropdown__value--placeholder') : true;
      control = dropdown.querySelector('.dropdown__trigger');
    }

    field.classList.toggle('form-field--error', isEmpty);
    if (control) control.setAttribute('aria-invalid', isEmpty ? 'true' : 'false');

    var errorEl = field.querySelector('.form-field__error');
    if (errorEl) errorEl.textContent = isEmpty ? '필수 항목입니다.' : '';

    if (isEmpty && control && !firstErrorControl) firstErrorControl = control;
  });
  return firstErrorControl;
}
```



```css
/* ── Form root ── */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-2xl);
}

/* ── FormSection ── */
.form-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-md);
}

.form-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--icon-md); /* 인라인 컨트롤(토글 등) 높이 기준으로 컨테이너 최소 높이 고정 */
}

.form-section__header > * {
  align-self: center; /* inline-flex 자식(label.toggle 등)의 외부 정렬을 명시적으로 고정 */
}

/* .md h3 (specificity 0,1,1)의 margin override를 위해 specificity 상향 */
h3.form-section__title {
  margin: 0;
  padding: 0;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-heading);
  line-height: var(--line-height-ui);
  color: var(--color-text-brand);
}

.form-section__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-lg);
}

/* 조건부 섹션 — JS가 클래스를 토글하여 표시/숨김 */
.form-section--hidden {
  display: none;
}

/* ── FormRow ── */
.form-row {
  display: flex;
  align-items: flex-start;
  gap: var(--space-gap-md);
}

/* ── FormField 너비 variant (Form 전용) ── */
/* 클래스 없음: flex:1 — form-row 내 나머지 공간 채움 */
.form-row .form-field {
  flex: 1;
  min-width: 0; /* flex 자식의 텍스트 오버플로 방지 */
}

/* half: 균등 분할 — 두 개 나란히 배치 시 각 50%.
   기본(.form-row .form-field)과 동일한 flex:1이지만 '절반 의도'를 명시하기 위해 클래스를 유지한다 */
.form-row .form-field--half {
  flex: 1;
}

/* auto: 컨텐츠 너비 고정 — 단위 붙는 짧은 필드 */
.form-row .form-field--auto {
  flex: 0 0 auto;
}

/* ── Form footer ── */
.form__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-gap-sm);
}
```

---

## 접근성

폼 랜드마크 유형 (`accessibility.md` 폼 행 적용).

| 상황 | 마크업 |
|------|--------|
| 루트 | `<form novalidate>` — 브라우저 기본 유효성 UI 비활성화, JS로 직접 제어 |
| 섹션 제목 | `<h3 class="form-section__title">` — 스크린리더가 섹션 구조 파악 |
| 조건부 섹션 숨김 | `form-section--hidden` 적용 시 해당 섹션 내 native input·select·textarea에 `disabled` 추가 — 브라우저가 탭 탐색에서 자동 제외. 커스텀 컨트롤(dp, toggle 등)은 추가로 `tabindex="-1"`도 필요 |
| 필수 필드 | `<span aria-hidden="true">(필수)</span>` + control에 `aria-required="true"` |
| 제출 실패 | 오류 필드가 있으면 첫 번째 오류 필드로 포커스 이동 또는 `aria-live="polite"` 영역으로 오류 요약 전달 |
| 키보드 | Tab으로 필드 간 이동. 제출은 Enter 또는 버튼 클릭 |

---

## Do / Don't

> ✅ DO — `form-field--auto`는 다른 필드와 함께 같은 행에 배치
> 단독 full 행에 auto 필드를 두면 레이아웃이 어색하다

> ✅ DO — 길이가 정해진 짧은 필드는 한 `form-row`에 가로로 묶어 여백을 줄인다
> 근로시간·월급여액처럼 폭이 유추되는 필드는 각각 full 행에 두지 말고 `auto`로 한 줄에 나란히 배치

> ❌ DON'T — 짧은 고정폭 필드를 각각 full 행에 두어 오른쪽에 큰 여백을 남긴다
> 3자리(≤100) 필드에 행 전체폭은 과하다. `auto`로 폭을 맞추고 다른 짧은 필드와 한 줄에 묶는다

> ❌ DON'T — 폭이 부족한데 억지로 한 줄에 몰아 값이 잘리게 한다
> 가로 배치는 각 필드가 예상 최대값을 잘림 없이 보여줄 수 있을 때만. 잘릴 것 같으면 행을 나눈다

> ❌ DON'T — Form 안에서 `form-field--horizontal` 사용
> horizontal은 Form 바깥 단독 필드 전용. Form 안에서는 항상 vertical(기본)

> ✅ DO — 조건부 섹션 숨김 시 내부 input에 `disabled` 추가
> `display:none`만으로는 Tab 탐색에서 제외되지만, JS 폼 제출 로직에서 값을 읽을 수 있으므로 disabled도 함께 처리

> ❌ DON'T — `form__footer`를 form 바깥에 배치
> 버튼이 form 요소 밖에 있으면 `type="submit"`이 동작하지 않는다. `form` 속성을 추가하거나 form 안으로 이동

> ✅ DO — `.form` 루트 없이 탭 패널 안에 여러 FormSection 배치 시 `margin-bottom: var(--space-stack-2xl)` 사용
> ```html
> <div style="margin-bottom:var(--space-stack-2xl)">
>   <h3 class="form-section__title">기본정보</h3>
>   <!-- form rows -->
> </div>
> <div>
>   <h3 class="form-section__title">인사정보</h3>
>   <!-- form rows -->
> </div>
> ```

> ❌ DON'T — `.form` 루트 없는 컨텍스트에서 FormSection 간 간격을 `--space-stack-md`(행 간격)와 동일하게 두기
> 섹션 간 간격이 행 간격과 같으면 그룹 경계가 보이지 않는다
