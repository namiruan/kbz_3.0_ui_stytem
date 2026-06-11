---
file: components/organisms/modal.md
version: 0.1.0
status: draft
updated: 2026-06-11
depends-on: components/_index.md, components/atoms/button.md, components/atoms/icon-button.md, components/atoms/badge.md, components/atoms/input.md, components/atoms/segment.md, components/molecules/form-field.md, components/molecules/dropdown.md, components/organisms/table/index.md, components/organisms/table/data.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/shadow.md, tokens/z-index.md, tokens/typography.md
---

# Modal

## 개요

화면 위에 레이어로 올라와 특정 작업을 수행하는 대화 상자.  
두 가지 유형으로 구분한다.

- **대제목 모달 (`modal--lg`)** — 여러 섹션을 사이드 내비게이션으로 전환하는 복합 목적 모달. 하나의 대상(근로자·계약 등)에 대한 다수 섹션을 한 화면에서 다룰 때 사용한다. 제목이 크고 `modal__footer` 없이 각 섹션 안에서 액션을 처리한다.
- **소제목 모달 (기본)** — 단일 목적을 가진 모달. 폼·테이블·안내 등 다양한 레이아웃이 올 수 있으며, 대부분 `modal__footer`의 확인/취소 버튼으로 작업을 완료한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| 유형 | 소제목(기본) · 대제목 → `modal--lg` | 소제목 |
| 좌측 패널 | 없음 · 내비 → `modal__nav` · 정보 → `modal__aside` | 없음 |
| footer | 없음 · 있음 → `modal__footer` | 없음 |

- `modal--lg`에는 `modal__nav`를 사용한다. 소제목 모달에서 좌측 고정 정보 패널이 필요하면 `modal__aside`를 사용한다.
- `modal--lg`에는 `modal__footer`를 두지 않는다.

---

<!-- AI:
모달 구조:

<div class="modal-overlay">
  <div class="modal [modal--lg]"
       role="dialog" aria-modal="true"
       aria-labelledby="[title-id]">

    <div class="modal__header">
      <h2 class="modal__title text-modal-title-sm" id="[title-id]">제목</h2>
      (modal--lg 유형은 text-modal-title 사용)
      <button class="icon-on--lg" type="button" aria-label="닫기">
        <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
      </button>
    </div>

    <div class="modal__body">

      (대제목 모달 전용: 섹션 내비게이션)
      <nav class="modal__nav" aria-label="[모달명] 섹션">
        <button class="modal__nav-item" type="button">섹션명</button>
        <button class="modal__nav-item modal__nav-item--selected" type="button">선택된 섹션</button>
      </nav>

      (소제목 모달 전용: 읽기 전용 정보 패널. 이름·소속·날짜 등 컨텍스트 정보만. 인터랙티브 컨트롤 배치 금지)
      <aside class="modal__aside"></aside>

      <div class="modal__content">
        (본문. 콘텐츠가 길면 내부 스크롤: overflow-y:auto)
      </div>

    </div>

    (소제목 모달 전용)
    <div class="modal__footer">
      <button class="btn btn--secondary btn--solid btn--md" type="button">저장 안 함</button>
      <button class="btn btn--primary btn--solid btn--md" type="submit">저장하기</button>
    </div>

  </div>
</div>

구조 규칙:
- modal-overlay: 항상 감싸야 함. fixed 포지셔닝, z-index var(--z-modal), 화면 중앙 배치
- modal 너비: 인라인 style="width:Npx" 또는 페이지 전용 클래스 (소제목 600–900px, 대제목 1000–1200px)
- modal__body: flex row. nav/aside 없으면 modal__content가 전체 너비 차지
- modal__content: overflow-y:auto — 콘텐츠가 길면 내부 스크롤
- min-height:0 on modal__body: flex 자식의 overflow 스크롤 활성화에 필요
- 대제목 모달: modal__header border-bottom 없음 / 소제목 모달: 있음
- 닫기 버튼: icon-button.md 패턴 — button.icon-on--lg > svg icon-close. btn--* 컴포넌트 아님

하위 컴포넌트 사용 규칙:
- 닫기 버튼: icon-button.md. button.icon-on--lg > svg. btn--* 사용 금지.
- 버튼 (footer): button.md. btn btn--primary|secondary btn--solid btn--md. btn--[size]가 폰트 포함 — text-button-* 중복 사용 금지.
- 제목 타이포그래피: typography.css 유틸 클래스 사용.
  소제목 모달: h2.modal__title.text-modal-title-sm (font-size-h4, font-weight-display)
  대제목 모달: h2.modal__title.text-modal-title (font-size-h2, font-weight-display)
- 섹션 소제목: div 또는 span + text-card-title 클래스. 인라인 style="font-size:..." 금지.
- 폼 필드: form-field.md. 라벨은 반드시 label.form-field__label.text-form-label 구조 사용.
  인라인 div+style로 라벨 대체 금지.
- 인풋: input.md. 유효 크기 = 기본(클래스 없음, height-base) · input--sm · input--xs(테이블 셀 전용).
  input--md는 존재하지 않음.
- 드롭다운: dropdown.md. div.dropdown.dropdown--button 구조 사용.
  네이티브 <select class="input"> 사용 금지.
  폼 필드 내 선택은 라벨 id + trigger aria-labelledby로 연결.
- 테이블: table/index.md + data.md 구조 그대로 사용. 편집형 셀은 table__cell--edit + input--xs.
- 뱃지: badge.md. style 클래스(badge--neutral 등) 필수. sm이 기본(클래스 없음), md는 badge--md 명시.
-->

---

## 사용 지침

:::preview
<div class="pattern-explorer">
  <div id="modal-segment" class="segment" role="radiogroup" aria-label="모달 유형">
    <span class="segment__slider" aria-hidden="true"></span>
    <button class="segment__item segment__item--selected" role="radio" aria-checked="true" data-region="modal-sm">소제목 모달</button>
    <button class="segment__item" role="radio" aria-checked="false" data-region="modal-lg">대제목 모달</button>
  </div>

  <div class="pattern-explorer__panel">

    <!-- 소제목 모달 -->
    <div data-region="modal-sm">
      <div data-component class="modal" role="dialog" aria-modal="true" aria-labelledby="demo-sm-title" style="width:720px;max-width:100%">
        <div class="modal__header">
          <h2 class="modal__title text-modal-title-sm" id="demo-sm-title">급여 설정</h2>
          <button class="icon-on--lg" type="button" aria-label="닫기">
            <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
          </button>
        </div>
        <div class="modal__body">
          <div class="modal__content">
            <div class="form-field-group form-field-group--horizontal" style="margin-bottom:var(--space-stack-lg)">
              <div class="form-field">
                <label class="form-field__label text-form-label" id="sm-paytype-label">급여유형</label>
                <div class="dropdown dropdown--button" style="width:100%">
                  <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="sm-paytype-label">
                    <span class="dropdown__value">포괄임금_본사</span>
                    <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                  </button>
                  <div class="dropdown__panel">
                    <ul class="dropdown__list" role="listbox" aria-labelledby="sm-paytype-label">
                      <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">포괄임금_본사</span></li>
                      <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">포괄임금_지사</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-field">
                <label class="form-field__label text-form-label" for="sm-basepay">기본급</label>
                <div class="input-wrap input-wrap--suffix">
                  <input class="input" type="text" id="sm-basepay" value="3,000,000">
                  <span class="input__suffix">원</span>
                </div>
              </div>
              <div class="form-field">
                <label class="form-field__label text-form-label" for="sm-hourly">통상시급</label>
                <div class="input-wrap input-wrap--suffix">
                  <input class="input input--readonly" type="text" id="sm-hourly" value="10,300" readonly>
                  <span class="input__suffix">원</span>
                </div>
              </div>
            </div>
            <div class="text-card-title" style="margin-bottom:var(--space-stack-sm)">고정급여</div>
            <div class="table-container">
              <table class="table table--dense" aria-label="고정급여">
                <thead class="table__head">
                  <tr>
                    <th class="table__head-cell table__head-cell--input" scope="col">과세</th>
                    <th class="table__head-cell table__head-cell--input" scope="col">항목</th>
                    <th class="table__head-cell table__head-cell--input table__cell--number" scope="col">금액</th>
                  </tr>
                </thead>
                <tbody class="table__body">
                  <tr class="table__row">
                    <td class="table__cell"><span class="badge badge--neutral">비과세</span></td>
                    <td class="table__cell">육아수당</td>
                    <td class="table__cell--edit"><div class="input-wrap input-wrap--suffix"><input class="input input--xs" type="text" value="100,000" aria-label="육아수당 금액"><span class="input__suffix input__suffix--sm">원</span></div></td>
                  </tr>
                  <tr class="table__row">
                    <td class="table__cell"><span class="badge badge--neutral">비과세</span></td>
                    <td class="table__cell">식대</td>
                    <td class="table__cell--edit"><div class="input-wrap input-wrap--suffix"><input class="input input--xs" type="text" value="100,000" aria-label="식대 금액"><span class="input__suffix input__suffix--sm">원</span></div></td>
                  </tr>
                </tbody>
                <tfoot class="table__foot">
                  <tr class="table__row">
                    <td class="table__cell" colspan="2">합계(기본급 포함)</td>
                    <td class="table__cell table__cell--number">3,200,000</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div class="modal__footer">
          <button class="btn btn--secondary btn--solid btn--md" type="button">저장 안 함</button>
          <button class="btn btn--primary btn--solid btn--md" type="button">저장하기</button>
        </div>
      </div>
    </div>

    <!-- 대제목 모달 -->
    <div data-region="modal-lg" style="display:none">
      <div data-component class="modal modal--lg" role="dialog" aria-modal="true" aria-labelledby="demo-lg-title" style="width:900px;max-width:100%">
        <div class="modal__header">
          <h2 class="modal__title text-modal-title" id="demo-lg-title">근로자 정보</h2>
          <button class="icon-on--lg" type="button" aria-label="닫기">
            <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
          </button>
        </div>
        <div class="modal__body">
          <nav class="modal__nav" aria-label="근로자 정보 섹션">
            <button class="modal__nav-item" type="button">인사정보</button>
            <button class="modal__nav-item" type="button">학력·자격·경력</button>
            <button class="modal__nav-item modal__nav-item--selected" type="button">급여 정보</button>
            <button class="modal__nav-item" type="button">근무 정보</button>
            <button class="modal__nav-item" type="button">등록·발급 서류</button>
          </nav>
          <div class="modal__content">
            <div class="form-field-group form-field-group--horizontal" style="margin-bottom:var(--space-stack-lg)">
              <div class="form-field">
                <label class="form-field__label text-form-label" id="lg-paytype-label">급여유형</label>
                <div class="dropdown dropdown--button" style="width:100%">
                  <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="lg-paytype-label">
                    <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
                    <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                  </button>
                  <div class="dropdown__panel">
                    <ul class="dropdown__list" role="listbox" aria-labelledby="lg-paytype-label">
                      <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">포괄임금_본사</span></li>
                      <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">포괄임금_지사</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-field">
                <label class="form-field__label text-form-label" for="lg-basepay">기본급</label>
                <div class="input-wrap input-wrap--suffix">
                  <input class="input" type="text" id="lg-basepay" placeholder="기본급 입력">
                  <span class="input__suffix">원</span>
                </div>
              </div>
              <div class="form-field">
                <label class="form-field__label text-form-label" for="lg-hourly">통상시급</label>
                <div class="input-wrap input-wrap--suffix">
                  <input class="input input--readonly" type="text" id="lg-hourly" placeholder="자동 계산" readonly>
                  <span class="input__suffix">원</span>
                </div>
              </div>
            </div>
            <div class="text-card-title" style="margin-bottom:var(--space-stack-sm)">고정급여</div>
            <div class="table-container">
              <table class="table table--dense" aria-label="고정급여">
                <thead class="table__head">
                  <tr>
                    <th class="table__head-cell table__head-cell--input" scope="col">과세</th>
                    <th class="table__head-cell table__head-cell--input" scope="col">항목</th>
                    <th class="table__head-cell table__head-cell--input table__cell--number" scope="col">금액</th>
                  </tr>
                </thead>
                <tbody class="table__body">
                  <tr class="table__row">
                    <td class="table__cell"><span class="badge badge--neutral">비과세</span></td>
                    <td class="table__cell">육아수당</td>
                    <td class="table__cell table__cell--number">20,000</td>
                  </tr>
                  <tr class="table__row">
                    <td class="table__cell"><span class="badge badge--neutral">비과세</span></td>
                    <td class="table__cell">식대</td>
                    <td class="table__cell table__cell--number">100,000</td>
                  </tr>
                </tbody>
                <tfoot class="table__foot">
                  <tr class="table__row">
                    <td class="table__cell" colspan="2">합계(기본급 포함)</td>
                    <td class="table__cell table__cell--number">3,400,000</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
<script>
(function() {
  var seg = stage.querySelector('#modal-segment');
  var items = seg.querySelectorAll('.segment__item');
  var panels = stage.querySelectorAll('[data-region]');

  function updateSlider() {
    var slider = seg.querySelector('.segment__slider');
    var sel = seg.querySelector('.segment__item--selected');
    if (!slider || !sel) return;
    slider.style.width = sel.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + sel.offsetLeft + 'px)';
  }

  items.forEach(function(btn) {
    btn.addEventListener('click', function() {
      items.forEach(function(b) {
        b.classList.remove('segment__item--selected');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('segment__item--selected');
      btn.setAttribute('aria-checked', 'true');
      var key = btn.getAttribute('data-region');
      panels.forEach(function(p) {
        p.style.display = p.getAttribute('data-region') === key ? '' : 'none';
      });
      updateSlider();
    });
  });

  var pe = stage.querySelector('.pattern-explorer');
  if (pe) pe.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:var(--space-gap-sm);width:100%';
  var panel = stage.querySelector('.pattern-explorer__panel');
  if (panel) panel.style.cssText = 'width:100%;min-width:0';
  seg.style.cssText = 'width:max-content';

  requestAnimationFrame(function() { requestAnimationFrame(updateSlider); });
})();
</script>
:::

### 대제목 모달 제약

- `modal__nav`는 섹션 전환 전용. 폼 입력·선택 컨트롤로 사용하지 않는다.
- 각 섹션 내에서 액션을 처리하므로 `modal__footer`를 두지 않는다.
- 중첩 모달(소제목 모달)은 `modal-overlay` 위에 다시 `modal-overlay`를 쌓아 `z-index: calc(var(--z-modal) + var(--z-above))`로 표시한다.

### 소제목 모달 제약

- `modal__aside`는 읽기 전용 컨텍스트 정보(이름·소속·날짜 등)만 표시한다. 인터랙티브 컨트롤은 `modal__content` 안에 둔다.
- `modal__footer` 버튼 순서: 보조 액션(저장 안 함·취소) → 주요 액션(저장하기·확인). 주요 액션이 항상 오른쪽 끝.
- 모달 너비는 콘텐츠에 따라 인라인 `style="width:Npx"` 또는 페이지 전용 클래스로 지정한다.

---

## CSS

```css
/* ── Overlay ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-action-neutral-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
}

/* ── Modal shell ── */
.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-surface-base);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-height: 90vh;
  overflow: hidden;
}

/* ── Header ── */
.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-inset-3xl);
  height: var(--height-spacious);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  flex-shrink: 0;
}

.modal--lg .modal__header {
  height: auto;
  padding: var(--space-gap-xl) var(--space-inset-3xl) var(--space-gap-md);
  border-bottom: none;
}

/* ── Title — font은 text-modal-title-sm / text-modal-title 유틸 클래스로 처리 ── */
.modal__title {
  margin: 0;
  color: var(--color-text-body);
}

/* ── Body ── */
.modal__body {
  display: flex;
  flex: 1 1 auto; /* flex-basis:auto — 콘텐츠 높이를 기준으로 늘어남. 0%이면 overlay 없는 인라인 컨텍스트에서 높이 collapse */
  min-height: 0;  /* overflow 스크롤 활성화에 필요 */
  overflow: hidden;
}

/* ── Nav (대제목 모달 전용) ── */
.modal__nav {
  display: flex;
  flex-direction: column;
  width: 180px;
  padding: var(--space-gap-sm) 0;
  border-right: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  flex-shrink: 0;
  overflow-y: auto;
}

.modal__nav-item {
  display: block;
  width: 100%;
  padding: var(--space-inset-md) var(--space-inset-3xl);
  text-align: left;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-body);
  color: var(--color-text-body);
  line-height: var(--line-height-ui);
  background: none;
  border: none;
  cursor: pointer;
}

.modal__nav-item:hover {
  background: var(--color-action-neutral-hover);
}

.modal__nav-item--selected {
  background: var(--color-fill-brand);
  color: var(--color-text-inverse);
  font-weight: var(--font-weight-heading);
}

/* ── Aside (소제목 모달 정보 패널) ── */
.modal__aside {
  width: 200px;
  padding: var(--space-inset-3xl);
  background: var(--color-surface-subtle);
  border-right: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  flex-shrink: 0;
  overflow-y: auto;
  font-size: var(--font-size-sm);
  color: var(--color-text-body);
  line-height: var(--line-height-base);
}

/* ── Content ── */
.modal__content {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: var(--space-inset-3xl);
}

/* ── Footer ── */
.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-gap-sm);
  padding: var(--space-inset-md) var(--space-inset-3xl);
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  flex-shrink: 0;
}
```

---

## 접근성

dialog 유형.

| 상황 | 마크업 |
|------|--------|
| 모달 루트 | `role="dialog"` + `aria-modal="true"` |
| 제목 연결 | `aria-labelledby="[modal__title id]"` |
| 닫기 버튼 | `aria-label="닫기"` (icon-button.md 패턴) |
| 포커스 트랩 | 모달 열리면 첫 번째 포커스 가능 요소로 이동. Tab 순환이 모달 안에 갇힘 |
| 닫기 키 | `Escape` 키로 닫기 |
| nav 항목 | `<button type="button">` — `aria-pressed` 없이 선택 상태는 시각적으로만 표현 (섹션 전환 목적) |

```js
// 포커스 트랩 + Escape 닫기
function trapFocus(modal) {
  const focusable = modal.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  first.focus();

  modal.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });
}
```

---

## Do / Don't

| Do | Don't |
|----|-------|
| `modal-overlay`로 항상 감싸기 | `modal`을 overlay 없이 직접 DOM에 배치 |
| 닫기 버튼에 `button.icon-on--lg` (icon-button.md 패턴) | `btn--primary btn--solid btn--micro btn--icon-only` 오용 |
| 제목에 `text-modal-title-sm` / `text-modal-title` 유틸 클래스 | `modal__title`에 인라인 `style="font-size:..."` 직접 지정 |
| 폼 필드 라벨에 `form-field__label text-form-label` | 인라인 `<div style="font-size:...">` 로 라벨 대체 |
| 선택 컨트롤에 `dropdown--button` 구조 (dropdown.md) | `<select class="input">` 네이티브 요소 사용 |
| 대제목 모달은 각 섹션 내부에서 액션 처리 | 대제목 모달에 `modal__footer` 추가 |
| footer 버튼: 보조 → 주요 순서 (주요 액션이 오른쪽 끝) | 주요 액션을 왼쪽에 배치 |
| `modal__aside`는 읽기 전용 컨텍스트 정보만 | `modal__aside` 안에 폼 입력 배치 |
| 중첩 모달: `z-index: calc(var(--z-modal) + var(--z-above))` | 중첩 모달에 동일 z-index 사용 |
| 모달 열릴 때 `trapFocus()` 호출, 닫힐 때 원래 포커스 복원 | 모달 열려도 포커스 이동 없음 |
