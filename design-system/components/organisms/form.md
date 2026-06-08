---
file: components/organisms/form.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, tokens/radius.md, components/atoms/input.md, components/atoms/textarea.md, components/atoms/button.md, components/atoms/toggle.md, components/molecules/form-field.md, components/molecules/date-picker.md
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
        <div class="form-field form-field--half">
          <div class="form-field__label" id="lbl-f-start">시작일</div>
          <div class="dp" id="dp-f-start"><div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="lbl-f-start"><div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="연도" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="월" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="일" autocomplete="off"></div><span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span></div></div>
        </div>
        <div class="form-field form-field--half">
          <div class="form-field__label" id="lbl-f-end">종료일</div>
          <div class="dp" id="dp-f-end"><div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="lbl-f-end"><div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="연도" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="월" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="일" autocomplete="off"></div><span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span></div></div>
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

## Anatomy

<!-- AI:
- root = form.form[novalidate]. novalidate로 브라우저 기본 유효성 UI 비활성화, JS로 제어.
- div.form-section: 주제별 필드 그룹. 선택 요소.
  - div.form-section__header: 제목 + 토글 같은 섹션 컨트롤이 나란히 있을 때 사용. 없으면 form-section__title 직접 배치.
  - h3.form-section__title: 섹션 제목. 선택 요소.
  - div.form-section__body: 필드 행들의 컨테이너. display:flex; flex-direction:column; gap:space-gap-lg.
    - form-section--hidden을 body에 적용하면 섹션 내용 전체 숨김.
- div.form-row: 한 줄의 필드 묶음. display:flex; gap:space-gap-md. 기본값은 form-field가 flex:1.
  - div.form-field--half: 균등 분할 (flex:1). 두 개 나란히 → 각 50%.
  - div.form-field--auto: 컨텐츠 최소 너비 (flex:0 0 auto). 단위 붙는 짧은 필드.
  - 너비 클래스 없는 form-field: flex:1 — 나머지 공간 채움.
- div.form__footer: 제출 버튼 영역. display:flex; justify-content:flex-end; gap:space-gap-sm.
-->

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-3xl)">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">form-row — full (기본)</p>
  <div class="form-row">
    <div class="form-field">
      <label class="form-field__label" for="a-full">메모</label>
      <div class="textarea-wrap"><textarea class="textarea" id="a-full" rows="2" placeholder="내용을 입력하세요"></textarea></div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">form-row — half + half</p>
  <div class="form-row">
    <div class="form-field form-field--half">
      <label class="form-field__label" for="a-h1">이름</label>
      <div class="input-wrap"><input class="input" id="a-h1" type="text" placeholder="이름"></div>
    </div>
    <div class="form-field form-field--half">
      <label class="form-field__label" for="a-h2">주민등록번호</label>
      <div class="input-wrap"><input class="input" id="a-h2" type="text" placeholder="000000-0000000"></div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">form-row — half + auto (단위 필드)</p>
  <div class="form-row">
    <div class="form-field form-field--half">
      <label class="form-field__label" for="a-salary">월급여</label>
      <div class="input-wrap input-wrap--suffix"><input class="input" id="a-salary" type="text" placeholder="0"><span class="input__suffix">원</span></div>
    </div>
    <div class="form-field form-field--auto">
      <label class="form-field__label" for="a-rate">변동율</label>
      <div class="input-wrap input-wrap--suffix" style="width:96px"><input class="input" id="a-rate" type="text" placeholder="0"><span class="input__suffix">%</span></div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">form-section — 제목 + 조건부 body</p>
  <div data-component class="form-section">
    <h3 class="form-section__title">추가 옵션</h3>
    <div class="form-section__body">
      <div class="form-row">
        <div class="form-field form-field--half">
          <div class="form-field__label" id="lbl-a-s1">시작일</div>
          <div class="dp" id="dp-a-s1"><div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="lbl-a-s1"><div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="연도" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="월" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="일" autocomplete="off"></div><span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span></div></div>
        </div>
        <div class="form-field form-field--half">
          <div class="form-field__label" id="lbl-a-s2">종료일</div>
          <div class="dp" id="dp-a-s2"><div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="lbl-a-s2"><div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="연도" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="월" autocomplete="off"><span class="dp__value-sep" aria-hidden="true">.</span><input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="일" autocomplete="off"></div><span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span></div></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">form__footer</p>
  <div data-component class="form__footer">
    <button class="btn btn--ghost btn--md text-button-md" type="button">취소</button>
    <button class="btn btn--primary btn--md text-button-md" type="submit">저장하기</button>
  </div>
</div>

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
}

.form-section__title {
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
