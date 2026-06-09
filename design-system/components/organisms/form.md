---
file: components/organisms/form.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, tokens/radius.md, components/atoms/input.md, components/atoms/textarea.md, components/atoms/button.md, components/atoms/toggle.md, components/molecules/form-field.md, components/molecules/date-picker.md, components/atoms/icon.md
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
| FormSection 조건부 | 기본 표시 · form-section--hidden | 기본 표시 |

- **full** — 행 전체 너비. 메모·주소처럼 넓은 입력.
- **half** — 행을 균등 분할. 이름 + 주민등록번호처럼 나란히 배치.
- **auto** — 컨텐츠에 맞는 최소 너비. 단위(원, %, 일) 붙는 짧은 필드.
- **form-section--hidden** — Toggle 등 외부 조건에 따라 섹션 전체를 숨길 때.

---

## 사용 지침

### 구성 규칙

- `form-row`는 항상 `form-section__body` 안에 배치한다.
- `form-row` 안의 `form-field`는 너비 클래스(`form-field--half`, `form-field--auto`)로 비율을 지정한다. 너비 클래스가 없으면 `flex: 1`로 나머지 공간을 채운다.
- `form-section__title`은 선택 요소다. 섹션 구분이 필요 없으면 생략한다.
- 제출 버튼 영역은 `form__footer`에 배치한다. 폼 오른쪽 정렬이 기본.

### 제약

- Form 안에서 FormField의 `layout` variant는 항상 `vertical`(기본)을 사용한다. `form-field--horizontal`은 Form 바깥 단독 필드에서만 사용한다.
- `form-field--auto`는 단독 행에 두지 않는다. 반드시 `full` 또는 `half` 필드와 함께 같은 `form-row`에 배치한다.
- 조건부 섹션(`form-section--hidden`)의 표시/숨김은 외부 컴포넌트(Toggle, Segment 등)가 제어한다. Form 자체는 상태를 관리하지 않는다.

---

## 동작

<!-- AI:
- 조건부 섹션: Toggle·Segment 등 외부 컨트롤의 change 이벤트에서 form-section--hidden 클래스를 토글한다.
  - 표시: section.classList.remove('form-section--hidden')
  - 숨김: section.classList.add('form-section--hidden')
- 폼 제출: form의 submit 이벤트에서 각 FormField의 유효성을 검사하고 실패한 필드에 form-field--error를 추가한다.
- 조건부 섹션이 숨겨진 상태에서는 해당 섹션 내 input에 disabled 또는 aria-hidden을 적용해 스크린리더·탭 탐색에서 제외한다.
-->

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl)">

<p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">기본 — 섹션 + 조건부 영역</p>
<form data-component class="form" novalidate>

  <div class="form-section">
    <h3 class="form-section__title">기본 정보</h3>
    <div class="form-section__body">

      <div class="form-row">
        <div class="form-field form-field--half">
          <label class="form-field__label" for="f-name">이름 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
          <div class="input-wrap"><input class="input" id="f-name" type="text" placeholder="이름" aria-required="true"></div>
        </div>
        <div class="form-field form-field--half">
          <label class="form-field__label" for="f-email">이메일</label>
          <div class="input-wrap"><input class="input" id="f-email" type="email" placeholder="example@email.com"></div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label class="form-field__label" for="f-memo">메모</label>
          <div class="textarea-wrap"><textarea class="textarea" id="f-memo" rows="3" placeholder="내용을 입력하세요"></textarea></div>
        </div>
      </div>

    </div>
  </div>

  <div class="form-section">
    <div class="form-section__header">
      <h3 class="form-section__title">추가 옵션</h3>
      <label class="toggle" id="sec-toggle-label">
        <input id="sec-toggle" type="checkbox" role="switch">
        <span class="toggle__track"><span class="toggle__thumb"></span></span>
      </label>
    </div>
    <div id="sec-conditional" class="form-section__body form-section--hidden">
      <div class="form-row">
        <div class="form-field">
          <div class="form-field__label" id="lbl-f-period">기간</div>
          <div class="dp dp--range" id="dp-f-period"><div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="lbl-f-period"><div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="시작 연도" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="시작 월" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="시작 일" autocomplete="off"><span class="dp__value-sep dp__value-sep--range" aria-hidden="true">~</span><input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="종료 연도" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="종료 월" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="종료 일" autocomplete="off"></div><span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span></div></div>
        </div>
      </div>
    </div>
  </div>

  <div class="form__footer">
    <button class="btn btn--ghost btn--md text-button-md" type="button">취소</button>
    <button class="btn btn--primary btn--md text-button-md" type="submit">저장하기</button>
  </div>

</form>
</div>
<script>
(function() {
  stage.querySelectorAll('.input').forEach(initInput);
  stage.querySelectorAll('.textarea').forEach(initTextarea);
  stage.querySelectorAll('.dp').forEach(initDP);

  var toggleInput = stage.querySelector('#sec-toggle');
  var section = stage.querySelector('#sec-conditional');
  toggleInput.addEventListener('change', function() {
    section.classList.toggle('form-section--hidden', !toggleInput.checked);
  });

  stage.querySelector('form').addEventListener('submit', function(e) { e.preventDefault(); });
})();
</script>
:::

---

## 구조

<!-- AI:
Form — 레이아웃 루트
  └─ FormSection — 주제별 필드 그룹 (optional)
       ├─ FormSection Header — 제목+컨트롤 행. 컨트롤 없으면 Title 직접 배치 (optional)
       │    ├─ FormSection Title — 섹션 제목 (optional)
       │    └─ 섹션 컨트롤 — Toggle·Segment 등 (optional)
       └─ FormSection Body — FormRow들의 세로 스택
            └─ FormRow — 한 줄 필드 묶음
                 └─ FormField — 너비 variant 지정 (full · half · auto)
  └─ Form Footer — 제출 버튼 영역. 취소 → 저장 순서 (optional)

조건부 섹션:
- FormSection Body를 숨길 때 form-section--hidden 적용
- 표시/숨김은 외부 컨트롤의 change 이벤트에서 제어. Form 자체는 상태 관리 안 함
- 숨겨진 섹션 내 input에 disabled + tabindex="-1" 적용 → 탭 탐색·스크린리더 제외
-->

:::preview
<div style="width:100%;max-width:640px">
  <form class="form" novalidate>

    <div class="form-section an-box">
      <span class="an-label">div.form-section</span>

      <div class="form-section__header an-box">
        <span class="an-label">div.form-section__header</span>
        <h3 class="form-section__title">기본 정보</h3>
      </div>

      <div class="form-section__body an-box">
        <span class="an-label">div.form-section__body</span>

        <div class="form-row an-box">
          <span class="an-label">div.form-row</span>
          <div class="form-field form-field--half an-box">
            <span class="an-label">form-field--half</span>
            <label class="form-field__label" for="an-name">이름</label>
            <div class="input-wrap"><input class="input" id="an-name" type="text" placeholder="이름"></div>
          </div>
          <div class="form-field form-field--half an-box">
            <span class="an-label">form-field--half</span>
            <label class="form-field__label" for="an-email">이메일</label>
            <div class="input-wrap"><input class="input" id="an-email" type="email" placeholder="example@email.com"></div>
          </div>
        </div>

        <div class="form-row an-box">
          <span class="an-label">div.form-row</span>
          <div class="form-field an-box">
            <span class="an-label">form-field (full, 기본)</span>
            <label class="form-field__label" for="an-memo">메모</label>
            <div class="textarea-wrap"><textarea class="textarea" id="an-memo" rows="2" placeholder="내용을 입력하세요"></textarea></div>
          </div>
        </div>

      </div>
    </div>

    <div class="form__footer an-box">
      <span class="an-label">div.form__footer</span>
      <button class="btn btn--ghost btn--md text-button-md" type="button">취소</button>
      <button class="btn btn--primary btn--md text-button-md" type="submit">저장</button>
    </div>

  </form>
</div>
:::

---

## CSS

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

/* half: 균등 분할 — 두 개 나란히 배치 시 각 50% */
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
  padding-top: var(--space-gap-md);
  border-top: var(--stroke-sm) solid var(--color-border-subtle);
}
```

---

## 접근성

폼 랜드마크 유형 (`accessibility.md` 폼 행 적용).

| 상황 | 마크업 |
|------|--------|
| 루트 | `<form novalidate>` — 브라우저 기본 유효성 UI 비활성화, JS로 직접 제어 |
| 섹션 제목 | `<h3 class="form-section__title">` — 스크린리더가 섹션 구조 파악 |
| 조건부 섹션 숨김 | `form-section--hidden` 적용 시 해당 섹션 내 input에 `disabled` 추가 — 탭 탐색·스크린리더에서 제외 |
| 필수 필드 | `<span aria-hidden="true">(필수)</span>` + control에 `aria-required="true"` |
| 키보드 | Tab으로 필드 간 이동. 제출은 Enter 또는 버튼 클릭 |

---

## Do / Don't

> ✅ DO — `form-field--auto`는 다른 필드와 함께 같은 행에 배치
> 단독 full 행에 auto 필드를 두면 레이아웃이 어색하다

> ❌ DON'T — Form 안에서 `form-field--horizontal` 사용
> horizontal은 Form 바깥 단독 필드 전용. Form 안에서는 항상 vertical(기본)

> ✅ DO — 조건부 섹션 숨김 시 내부 input에 `disabled` 추가
> `display:none`만으로는 Tab 탐색에서 제외되지만, JS 폼 제출 로직에서 값을 읽을 수 있으므로 disabled도 함께 처리

> ❌ DON'T — `form__footer`를 form 바깥에 배치
> 버튼이 form 요소 밖에 있으면 `type="submit"`이 동작하지 않는다. `form` 속성을 추가하거나 form 안으로 이동
