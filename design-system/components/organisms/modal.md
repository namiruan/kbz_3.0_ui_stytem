---
file: components/organisms/modal.md
version: 0.1.9
status: draft
updated: 2026-06-24
depends-on: components/_index.md, components/atoms/button.md, components/atoms/icon-button.md, components/atoms/badge.md, components/atoms/input.md, components/atoms/segment.md, components/atoms/checkbox.md, components/molecules/form-field.md, components/molecules/tab.md, components/molecules/dropdown.md, components/molecules/accordion.md, components/molecules/date-picker.md, components/organisms/form.md, components/organisms/table/index.md, components/organisms/table/data.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/elevation.md, tokens/typography.md
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
| 좌측 패널 | 없음 · 내비 → `tab-group--vertical` · 정보 → `modal__aside` | 없음 |
| footer | 없음 · 있음 → `modal__footer` | 없음 |

- `modal--lg`에는 `tab-group tab-group--vertical`(tab.md 패턴) 세로 탭 내비게이션을 사용한다. 소제목 모달에서 좌측 고정 정보 패널이 필요하면 `modal__aside`를 사용한다.
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
      [modal--lg 유형은 text-modal-title 사용]
      <button class="icon-on--lg" type="button" aria-label="닫기">
        <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
      </button>
    </div>

    <div class="modal__body">

      [대제목 모달 전용: 세로 탭 내비게이션 — tab.md tab-group--vertical 패턴]
      <div class="tab-group tab-group--vertical" role="tablist" aria-label="[모달명] 섹션" aria-orientation="vertical">
        <span class="tab-group__slider" aria-hidden="true"></span>
        <button class="tab" role="tab" aria-selected="false" id="[tab-id-N]" aria-controls="[panel-id-N]" tabindex="-1"><span class="tab__label">섹션명</span></button>
        <button class="tab tab--selected" role="tab" aria-selected="true" id="[tab-id-M]" aria-controls="[panel-id-M]" tabindex="0"><span class="tab__label">선택된 섹션</span></button>
      </div>

      [소제목 모달 전용: 읽기 전용 정보 패널]
      <aside class="modal__aside">
        [이름·소속·날짜 등 컨텍스트 정보만. 인터랙티브 컨트롤 배치 금지]
      </aside>

      <div class="modal__content">
        [본문. 콘텐츠가 길면 내부 스크롤(overflow-y:auto)]
      </div>

    </div>

    [소제목 모달 전용]
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
    <button class="segment__item segment__item--selected" role="radio" aria-checked="true" data-target="modal-sm">소제목 모달</button>
    <button class="segment__item" role="radio" aria-checked="false" data-target="modal-lg">대제목 모달</button>
  </div>

  <div class="pattern-explorer__panel">

    <!-- 소제목 모달 -->
    <div data-panel="modal-sm">
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
                <div class="form-field__body">
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
              </div>
              <div class="form-field">
                <label class="form-field__label text-form-label" for="sm-basepay">기본급</label>
                <div class="form-field__body">
                  <div class="input-wrap input-wrap--suffix">
                    <input class="input" type="text" id="sm-basepay" value="3,000,000">
                    <span class="input__suffix">원</span>
                  </div>
                </div>
              </div>
              <div class="form-field">
                <label class="form-field__label text-form-label" for="sm-hourly">통상시급</label>
                <div class="form-field__body">
                  <div class="input-wrap input-wrap--suffix">
                    <input class="input input--readonly" type="text" id="sm-hourly" value="10,300" readonly>
                    <span class="input__suffix">원</span>
                  </div>
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
                    <td class="table__cell--edit"><div class="input-wrap input-wrap--suffix"><input class="input input--xs" type="text" value="100,000" aria-label="육아수당 금액"><span class="input__suffix input__suffix--xs">원</span></div></td>
                  </tr>
                  <tr class="table__row">
                    <td class="table__cell"><span class="badge badge--neutral">비과세</span></td>
                    <td class="table__cell">식대</td>
                    <td class="table__cell--edit"><div class="input-wrap input-wrap--suffix"><input class="input input--xs" type="text" value="100,000" aria-label="식대 금액"><span class="input__suffix input__suffix--xs">원</span></div></td>
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
          <button class="btn btn--ghost btn--md" type="button">저장 안 함</button>
          <button class="btn btn--primary btn--md" type="button">저장하기</button>
        </div>
      </div>
    </div>

    <!-- 대제목 모달 -->
    <div data-panel="modal-lg" style="display:none">
      <div data-component class="modal modal--lg" role="dialog" aria-modal="true" aria-labelledby="demo-lg-title" style="width:1040px;max-width:100%">
        <div class="modal__header">
          <h2 class="modal__title text-modal-title" id="demo-lg-title">근로자 정보</h2>
          <button class="icon-on--lg" type="button" aria-label="닫기">
            <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
          </button>
        </div>
        <div class="modal__body">
          <div class="tab-group tab-group--vertical" role="tablist" aria-label="근로자 정보 섹션" aria-orientation="vertical">
            <span class="tab-group__slider" aria-hidden="true"></span>
            <button class="tab tab--selected" role="tab" aria-selected="true" id="modal-nav-1" aria-controls="modal-panel-1" tabindex="0"><span class="tab__label">인사정보</span></button>
            <button class="tab" role="tab" aria-selected="false" id="modal-nav-2" aria-controls="modal-panel-2" tabindex="-1"><span class="tab__label">학력·자격·경력</span></button>
            <button class="tab" role="tab" aria-selected="false" id="modal-nav-3" aria-controls="modal-panel-3" tabindex="-1"><span class="tab__label">급여 정보</span></button>
            <button class="tab" role="tab" aria-selected="false" id="modal-nav-4" aria-controls="modal-panel-4" tabindex="-1"><span class="tab__label">근무 정보</span></button>
            <button class="tab" role="tab" aria-selected="false" id="modal-nav-5" aria-controls="modal-panel-5" tabindex="-1"><span class="tab__label">등록·발급 서류</span></button>
          </div>

          <!-- Panel 1: 인사정보 — form-section + form-row 패턴(form.md) -->
          <div class="modal__content" id="modal-panel-1" role="tabpanel" aria-labelledby="modal-nav-1">
            <!-- 패널 액션 바: 저장은 이 화면의 최종 결정 → btn--primary(fill). 변경 전 disabled 처리 -->
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-stack-lg)">
              <div class="segment" role="radiogroup" aria-label="인사정보 탭">
                <span class="segment__slider" aria-hidden="true"></span>
                <button class="segment__item segment__item--selected" role="radio" aria-checked="true">인사정보</button>
                <button class="segment__item" role="radio" aria-checked="false">인사노트</button>
              </div>
              <button class="btn btn--primary btn--md btn--disabled" type="button" disabled>변경내용 저장</button>
            </div>

            <!-- 기본정보 섹션 -->
            <div class="form-section" style="margin-bottom:var(--space-stack-2xl)">
              <div class="form-section__header">
                <h3 class="form-section__title">기본정보</h3>
                <label class="checkbox checkbox--sm">
                  <input type="checkbox" id="p1-nationality-chk">
                  <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
                  <span class="checkbox__label">국적/거주국가 변경하기</span>
                </label>
              </div>
              <div class="form-section__body">
                <!-- 이름 / 영문명 / 장애인·국가유공자 -->
                <div class="form-row">
                  <div class="form-field">
                    <label class="form-field__label text-form-label" for="p1-name">이름 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
                    <input class="input" type="text" id="p1-name" value="오만원" aria-required="true">
                  </div>
                  <div class="form-field">
                    <label class="form-field__label text-form-label" for="p1-ename">영문명</label>
                    <input class="input" type="text" id="p1-ename" placeholder="영문 이름을 입력하세요">
                  </div>
                  <div class="form-field">
                    <label class="form-field__label text-form-label" id="p1-dis-label">장애인/국가유공자</label>
                    <div class="dropdown dropdown--button" style="width:100%">
                      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="p1-dis-label">
                        <span class="dropdown__value">해당없음</span>
                        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      </button>
                      <div class="dropdown__panel">
                        <ul class="dropdown__list" role="listbox" aria-labelledby="p1-dis-label">
                          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">해당없음</span></li>
                          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">장애인</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 주민등록번호 / 핸드폰번호 / 개인 메일 -->
                <div class="form-row">
                  <div class="form-field">
                    <label class="form-field__label text-form-label" for="p1-ssn">주민등록번호 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
                    <input class="input" type="text" id="p1-ssn" value="1111111 - 1111111" aria-required="true">
                  </div>
                  <div class="form-field">
                    <label class="form-field__label text-form-label" for="p1-phone">핸드폰번호</label>
                    <input class="input" type="text" id="p1-phone" placeholder="">
                  </div>
                  <div class="form-field">
                    <label class="form-field__label text-form-label" for="p1-email">개인 메일</label>
                    <input class="input" type="text" id="p1-email" placeholder="">
                  </div>
                </div>
                <!-- 국적 / 거주국가 / 체류자격 -->
                <div class="form-row">
                  <div class="form-field">
                    <label class="form-field__label text-form-label" id="p1-nation-label">국적</label>
                    <div class="dropdown dropdown--button" style="width:100%">
                      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="p1-nation-label">
                        <span class="dropdown__value">대한민국</span>
                        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      </button>
                      <div class="dropdown__panel">
                        <ul class="dropdown__list" role="listbox" aria-labelledby="p1-nation-label">
                          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">대한민국</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="form-field">
                    <label class="form-field__label text-form-label" id="p1-reside-label">거주국가</label>
                    <div class="dropdown dropdown--button" style="width:100%">
                      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="p1-reside-label">
                        <span class="dropdown__value">대한민국</span>
                        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      </button>
                      <div class="dropdown__panel">
                        <ul class="dropdown__list" role="listbox" aria-labelledby="p1-reside-label">
                          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">대한민국</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="form-field">
                    <label class="form-field__label text-form-label" id="p1-visa-label">체류자격</label>
                    <div class="dropdown dropdown--button" style="width:100%">
                      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="p1-visa-label">
                        <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
                        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      </button>
                      <div class="dropdown__panel">
                        <ul class="dropdown__list" role="listbox" aria-labelledby="p1-visa-label"></ul>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 집 주소 — 우편번호 + 주소 검색 + 상세주소 -->
                <!-- 주소 검색: 폼 인라인 트리거 → btn--secondary btn--solid (button.md) -->
                <div class="form-field">
                  <label class="form-field__label text-form-label">집 주소</label>
                  <div style="display:flex;gap:var(--space-gap-sm);margin-bottom:var(--space-gap-xs)">
                    <input class="input input--readonly" type="text" style="flex:0 0 90px" placeholder="우편번호" aria-label="우편번호" readonly>
                    <input class="input input--readonly" type="text" style="flex:1" placeholder="주소를 검색해 주세요" aria-label="주소" readonly>
                    <button class="btn btn--secondary btn--solid btn--md" type="button">주소 검색</button>
                  </div>
                  <input class="input" type="text" placeholder="상세주소를 입력해 주세요" aria-label="상세주소">
                </div>
              </div>
            </div>

            <!-- 인사정보 섹션 -->
            <div class="form-section">
              <h3 class="form-section__title">인사정보</h3>
              <div class="form-section__body">
                <!-- 입사일 / 퇴사일 / 근무유형 / 급여유형 — 4열 -->
                <div class="form-row">
                  <div class="form-field">
                    <label class="form-field__label text-form-label" id="p1-join-label">입사일 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
                    <div class="dp" style="width:100%">
                      <div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="p1-join-label">
                        <div class="dp__value-group">
                          <input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" value="2020" maxlength="4" aria-label="입사 연도" autocomplete="off">
                          <span class="dp__value-sep" aria-hidden="true">.</span>
                          <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" value="11" maxlength="2" aria-label="입사 월" autocomplete="off">
                          <span class="dp__value-sep" aria-hidden="true">.</span>
                          <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" value="30" maxlength="2" aria-label="입사 일" autocomplete="off">
                        </div>
                        <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
                      </div>
                    </div>
                  </div>
                  <div class="form-field">
                    <label class="form-field__label text-form-label" id="p1-leave-label">퇴사일</label>
                    <div class="dp" style="width:100%">
                      <div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="p1-leave-label">
                        <div class="dp__value-group">
                          <input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="퇴사 연도" autocomplete="off">
                          <span class="dp__value-sep" aria-hidden="true">.</span>
                          <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="퇴사 월" autocomplete="off">
                          <span class="dp__value-sep" aria-hidden="true">.</span>
                          <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="퇴사 일" autocomplete="off">
                        </div>
                        <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
                      </div>
                    </div>
                  </div>
                  <div class="form-field">
                    <label class="form-field__label text-form-label" id="p1-jobtype-label">근무유형 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
                    <div class="dropdown dropdown--button" style="width:100%">
                      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="p1-jobtype-label" aria-required="true">
                        <span class="dropdown__value">계약직</span>
                        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      </button>
                      <div class="dropdown__panel">
                        <ul class="dropdown__list" role="listbox" aria-labelledby="p1-jobtype-label">
                          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">계약직</span></li>
                          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">정규직</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="form-field">
                    <label class="form-field__label text-form-label" id="p1-paytype-label">급여유형 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
                    <div class="dropdown dropdown--button" style="width:100%">
                      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="p1-paytype-label" aria-required="true">
                        <span class="dropdown__value">포괄임금</span>
                        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      </button>
                      <div class="dropdown__panel">
                        <ul class="dropdown__list" role="listbox" aria-labelledby="p1-paytype-label">
                          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">포괄임금</span></li>
                          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">시간급</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 급여계좌: 은행명 / 입금자명 / 계좌번호 -->
                <div class="form-row">
                  <div class="form-field">
                    <label class="form-field__label text-form-label" id="p1-bank-label">은행명</label>
                    <div class="dropdown dropdown--button" style="width:100%">
                      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="p1-bank-label">
                        <span class="dropdown__value dropdown__value--placeholder">은행명</span>
                        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      </button>
                      <div class="dropdown__panel">
                        <ul class="dropdown__list" role="listbox" aria-labelledby="p1-bank-label">
                          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">국민은행</span></li>
                          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">신한은행</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="form-field">
                    <label class="form-field__label text-form-label" for="p1-acct-name">입금자명</label>
                    <input class="input" type="text" id="p1-acct-name" placeholder="">
                  </div>
                  <div class="form-field">
                    <label class="form-field__label text-form-label" for="p1-acct-num">계좌번호</label>
                    <input class="input" type="text" id="p1-acct-num" placeholder="">
                  </div>
                </div>
                <!-- 사번 / 회사 메일 -->
                <div class="form-row">
                  <div class="form-field">
                    <label class="form-field__label text-form-label" for="p1-empno">사번</label>
                    <input class="input" type="text" id="p1-empno" placeholder="">
                  </div>
                  <div class="form-field">
                    <label class="form-field__label text-form-label" for="p1-work-email">회사 메일</label>
                    <input class="input" type="text" id="p1-work-email" placeholder="">
                  </div>
                  <div class="form-field" aria-hidden="true"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Panel 2: 학력·자격·경력 — accordion.md 패턴 사용 -->
          <!-- 추가(primary fill)는 최종 결정 → 오른쪽. 삭제(ghost)는 흐름 밖 경로 → 왼쪽 -->
          <div class="modal__content" id="modal-panel-2" role="tabpanel" aria-labelledby="modal-nav-2" hidden>
            <div class="accordion">

              <!-- 학력 사항 -->
              <div class="accordion__item accordion__item--expanded">
                <div class="accordion__header-row">
                  <button class="accordion__header" type="button" aria-expanded="true" aria-controls="acc-edu-body" id="acc-edu-h">
                    <span class="accordion__toggle" aria-hidden="true">
                      <span class="icon icon--sm accordion__icon--collapsed"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      <span class="icon icon--sm accordion__icon--expanded"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-collapse"/></svg></span>
                    </span>
                    <span class="accordion__title">학력 사항</span>
                    <span class="badge badge--brand badge--pill badge--line" aria-label="0건">0</span>
                  </button>
                  <div class="accordion__actions">
                    <button class="btn btn--ghost btn--sm" type="button">삭제</button>
                    <button class="btn btn--primary btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>추가</button>
                  </div>
                </div>
                <div class="accordion__body" id="acc-edu-body" role="region" aria-labelledby="acc-edu-h">
                  <div class="accordion__content">
                    <div class="table-container">
                      <table class="table table--dense" aria-label="학력사항">
                        <thead class="table__head">
                          <tr>
                            <th class="table__head-cell" style="width:2.5rem" scope="col"><input type="checkbox" aria-label="전체 선택"></th>
                            <th class="table__head-cell" scope="col">학교명</th>
                            <th class="table__head-cell" scope="col">졸업구분</th>
                            <th class="table__head-cell" scope="col">학과(전공)</th>
                            <th class="table__head-cell" scope="col">학위</th>
                            <th class="table__head-cell" scope="col">입학월</th>
                            <th class="table__head-cell" scope="col">졸업월</th>
                          </tr>
                        </thead>
                        <tbody class="table__body">
                          <tr class="table__row"><td class="table__cell" colspan="7" style="text-align:center;color:var(--color-text-subtle)">등록된 데이터가 없습니다</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 자격 사항 -->
              <div class="accordion__item accordion__item--expanded">
                <div class="accordion__header-row">
                  <button class="accordion__header" type="button" aria-expanded="true" aria-controls="acc-cert-body" id="acc-cert-h">
                    <span class="accordion__toggle" aria-hidden="true">
                      <span class="icon icon--sm accordion__icon--collapsed"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      <span class="icon icon--sm accordion__icon--expanded"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-collapse"/></svg></span>
                    </span>
                    <span class="accordion__title">자격 사항</span>
                    <span class="badge badge--brand badge--pill badge--line" aria-label="0건">0</span>
                  </button>
                  <div class="accordion__actions">
                    <button class="btn btn--ghost btn--sm" type="button">삭제</button>
                    <button class="btn btn--primary btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>추가</button>
                  </div>
                </div>
                <div class="accordion__body" id="acc-cert-body" role="region" aria-labelledby="acc-cert-h">
                  <div class="accordion__content">
                    <div class="table-container">
                      <table class="table table--dense" aria-label="자격사항">
                        <thead class="table__head">
                          <tr>
                            <th class="table__head-cell" style="width:2.5rem" scope="col"><input type="checkbox" aria-label="전체 선택"></th>
                            <th class="table__head-cell" scope="col">자격증</th>
                            <th class="table__head-cell" scope="col">등록번호</th>
                            <th class="table__head-cell" scope="col">합격일</th>
                            <th class="table__head-cell" scope="col">첨부파일</th>
                          </tr>
                        </thead>
                        <tbody class="table__body">
                          <tr class="table__row"><td class="table__cell" colspan="5" style="text-align:center;color:var(--color-text-subtle)">등록된 데이터가 없습니다</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 경력 사항 -->
              <div class="accordion__item accordion__item--expanded">
                <div class="accordion__header-row">
                  <button class="accordion__header" type="button" aria-expanded="true" aria-controls="acc-career-body" id="acc-career-h">
                    <span class="accordion__toggle" aria-hidden="true">
                      <span class="icon icon--sm accordion__icon--collapsed"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      <span class="icon icon--sm accordion__icon--expanded"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-collapse"/></svg></span>
                    </span>
                    <span class="accordion__title">경력 사항</span>
                    <span class="badge badge--brand badge--pill badge--line" aria-label="0건">0</span>
                  </button>
                  <div class="accordion__actions">
                    <button class="btn btn--ghost btn--sm" type="button">삭제</button>
                    <button class="btn btn--primary btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>추가</button>
                  </div>
                </div>
                <div class="accordion__body" id="acc-career-body" role="region" aria-labelledby="acc-career-h">
                  <div class="accordion__content">
                    <div class="table-container">
                      <table class="table table--dense" aria-label="경력사항">
                        <thead class="table__head">
                          <tr>
                            <th class="table__head-cell" style="width:2.5rem" scope="col"><input type="checkbox" aria-label="전체 선택"></th>
                            <th class="table__head-cell" scope="col">회사명</th>
                            <th class="table__head-cell" scope="col">계약유형</th>
                            <th class="table__head-cell" scope="col">부서</th>
                            <th class="table__head-cell" scope="col">직책/직급</th>
                            <th class="table__head-cell" scope="col">직무</th>
                            <th class="table__head-cell" scope="col">입사월</th>
                            <th class="table__head-cell" scope="col">퇴사월</th>
                          </tr>
                        </thead>
                        <tbody class="table__body">
                          <tr class="table__row"><td class="table__cell" colspan="8" style="text-align:center;color:var(--color-text-subtle)">등록된 데이터가 없습니다</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Panel 3: 급여 정보 — 서브 세그먼트 + 설정 버튼 -->
          <!-- 설정/이력은 화면 전환 액션(최종 결정 아님) → btn--secondary btn--solid -->
          <div class="modal__content" id="modal-panel-3" role="tabpanel" aria-labelledby="modal-nav-3" hidden>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-stack-lg)">
              <div class="segment" role="radiogroup" aria-label="급여 정보 탭">
                <span class="segment__slider" aria-hidden="true"></span>
                <button class="segment__item segment__item--selected" role="radio" aria-checked="true">급여정보</button>
                <button class="segment__item" role="radio" aria-checked="false">급여명세서</button>
              </div>
              <div style="display:flex;gap:var(--space-gap-xs)">
                <button class="btn btn--secondary btn--solid btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-settings"/></svg></span>급여설정</button>
                <button class="btn btn--secondary btn--solid btn--sm" type="button">급여 이력</button>
              </div>
            </div>
            <div class="form-field-group form-field-group--horizontal" style="margin-bottom:var(--space-stack-lg)">
              <div class="form-field">
                <label class="form-field__label text-form-label" id="lg-paytype-label">급여유형</label>
                <div class="form-field__body">
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
              </div>
              <div class="form-field">
                <label class="form-field__label text-form-label" for="lg-basepay">기본급</label>
                <div class="form-field__body">
                  <div class="input-wrap input-wrap--suffix">
                    <input class="input" type="text" id="lg-basepay" placeholder="기본급 입력">
                    <span class="input__suffix">원</span>
                  </div>
                </div>
              </div>
              <div class="form-field">
                <label class="form-field__label text-form-label" for="lg-hourly">통상시급</label>
                <div class="form-field__body">
                  <div class="input-wrap input-wrap--suffix">
                    <input class="input input--readonly" type="text" id="lg-hourly" placeholder="자동 계산" readonly>
                    <span class="input__suffix">원</span>
                  </div>
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

          <!-- Panel 4: 근무 정보 -->
          <div class="modal__content" id="modal-panel-4" role="tabpanel" aria-labelledby="modal-nav-4" hidden>
            <div class="text-card-title" style="color:var(--color-text-brand);margin-bottom:var(--space-stack-sm)">근무 정보</div>
            <div class="form-field-group form-field-group--horizontal">
              <div class="form-field">
                <label class="form-field__label text-form-label" id="p4-worktype-label">근무패턴</label>
                <div class="form-field__body">
                  <div class="dropdown dropdown--button" style="width:100%">
                    <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="p4-worktype-label">
                      <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
                      <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                    </button>
                    <div class="dropdown__panel">
                      <ul class="dropdown__list" role="listbox" aria-labelledby="p4-worktype-label">
                        <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">주 5일</span></li>
                        <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">격주</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-field">
                <label class="form-field__label text-form-label" for="p4-workhour">소정근로시간</label>
                <div class="form-field__body">
                  <div class="input-wrap input-wrap--suffix">
                    <input class="input" type="text" id="p4-workhour" placeholder="0">
                    <span class="input__suffix">시간</span>
                  </div>
                </div>
              </div>
              <div class="form-field">
                <label class="form-field__label text-form-label" for="p4-breaktime">휴게시간</label>
                <div class="form-field__body">
                  <div class="input-wrap input-wrap--suffix">
                    <input class="input" type="text" id="p4-breaktime" placeholder="0">
                    <span class="input__suffix">분</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Panel 5: 등록·발급 서류 — 서브 세그먼트 + CRUD -->
          <div class="modal__content" id="modal-panel-5" role="tabpanel" aria-labelledby="modal-nav-5" hidden>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-stack-lg)">
              <div class="segment" role="radiogroup" aria-label="서류 탭">
                <span class="segment__slider" aria-hidden="true"></span>
                <button class="segment__item segment__item--selected" role="radio" aria-checked="true">발급</button>
                <button class="segment__item" role="radio" aria-checked="false">등록</button>
              </div>
              <div style="display:flex;gap:var(--space-gap-xs)">
                <button class="btn btn--ghost btn--sm" type="button">삭제</button>
                <button class="btn btn--primary btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>추가</button>
              </div>
            </div>
            <div class="table-container">
              <table class="table table--dense" aria-label="발급 서류">
                <thead class="table__head">
                  <tr>
                    <th class="table__head-cell" style="width:2.5rem" scope="col"><input type="checkbox" aria-label="전체 선택"></th>
                    <th class="table__head-cell" scope="col">번호</th>
                    <th class="table__head-cell" scope="col">발행 번호</th>
                    <th class="table__head-cell" scope="col">문서 종류</th>
                    <th class="table__head-cell" scope="col">발급일</th>
                    <th class="table__head-cell" scope="col">처리자</th>
                    <th class="table__head-cell" scope="col">첨부파일</th>
                  </tr>
                </thead>
                <tbody class="table__body">
                  <tr class="table__row"><td class="table__cell" colspan="7" style="text-align:center;color:var(--color-text-subtle)">등록된 데이터가 없습니다</td></tr>
                </tbody>
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
  var codeItems = [];

  if (typeof initSegment        === 'function') initSegment(stage);
  if (typeof initDropdown       === 'function') initDropdown(stage);
  if (typeof initAccordion      === 'function') initAccordion(stage);
  if (typeof initInputContainer === 'function') initInputContainer(stage);
  // initTab: modal-lg가 display:none이라 slider offset=0이 되지만, visible 후 재초기화
  if (typeof initTab            === 'function') initTab(stage);

  // 탭 패널 visible 시 내부 segment 슬라이더 재초기화 (hidden 상태에서 init → offsetWidth=0 보정)
  function reinitPanelSegments(lgPanel, panelId) {
    setTimeout(function() {
      var panel = lgPanel.querySelector('#' + panelId);
      if (!panel || panel.hidden) return;
      if (typeof initSegment !== 'function') return;
      panel.querySelectorAll('.segment').forEach(function(s) { delete s.dataset.initSegment; });
      initSegment(panel);
    }, 0);
  }

  // initSegment 리스너 이후에 등록 → switchPanel 완료 후 실행됨
  seg.addEventListener('click', function(e) {
    var btn = e.target.closest('.segment__item');
    if (!btn) return;
    stage.querySelectorAll('[data-panel]').forEach(function(p, i) {
      if (codeItems[i]) codeItems[i].style.display = p.style.display;
    });
    if (btn.getAttribute('data-target') === 'modal-lg') {
      var lgPanel = stage.querySelector('[data-panel="modal-lg"]');
      lgPanel.querySelectorAll('.tab-group').forEach(function(g) { delete g.dataset.initTab; });
      if (typeof initTab === 'function') initTab(lgPanel);
      // 현재 선택된 탭 패널의 segment 재초기화
      var selTab = lgPanel.querySelector('[role="tab"][aria-selected="true"]');
      if (selTab) reinitPanelSegments(lgPanel, selTab.getAttribute('aria-controls'));
      // 이후 탭 클릭 시 segment 재초기화 — 중복 등록 방지
      if (!lgPanel.dataset.tabSegmentReinit) {
        lgPanel.dataset.tabSegmentReinit = '1';
        lgPanel.querySelectorAll('[role="tab"]').forEach(function(tab) {
          tab.addEventListener('click', function() {
            reinitPanelSegments(lgPanel, tab.getAttribute('aria-controls'));
          });
        });
      }
    }
  });

  var pe = stage.querySelector('.pattern-explorer');
  if (pe) pe.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:var(--space-gap-sm);width:100%';
  var panel = stage.querySelector('.pattern-explorer__panel');
  if (panel) panel.style.cssText = 'width:100%;min-width:0';
  seg.style.cssText = 'width:max-content';

  setTimeout(function() {
    var codeList = stage.parentNode.querySelector('.component-code-list');
    if (codeList) {
      codeItems = Array.from(codeList.querySelectorAll('.component-code-item'));
      stage.querySelectorAll('[data-panel]').forEach(function(p, i) {
        if (codeItems[i]) codeItems[i].style.display = p.style.display;
      });
    }
  }, 0);
})();
</script>
:::

### 대제목 모달 제약

- 좌측 탭 내비게이션은 `tab-group--vertical` (tab.md) 을 사용한다.
- 탭 패널은 `modal__content` 안에 `div[role="tabpanel"]`로 배치. `.tab-panel` 클래스 사용 금지 (padding 중복).
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
  padding: var(--space-gap-lg) var(--space-inset-3xl) var(--space-gap-sm);
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

/* ── Nav (대제목 모달 전용) — tab.md tab-group--vertical 사용 ── */
/* 탭 스타일은 tab.md에서 상속. 모달 레이아웃에 맞는 크기·border만 오버라이드 */
.modal--lg .modal__body > .tab-group--vertical {
  width: 180px;
  flex-shrink: 0;
  overflow-y: auto;
  padding: var(--space-inset-squish-2xl); /* modal__content와 동일 — 12px 24px */
  border-right: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* 슬라이더는 position:absolute width:100%라 컨테이너 패딩을 무시 → 패딩만큼 보정 */
.modal--lg .modal__body > .tab-group--vertical .tab-group__slider {
  left: var(--space-inset-3xl);
  width: calc(100% - 2 * var(--space-inset-3xl));
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
| 세로 탭 내비 | `tab-group--vertical` + `role="tablist"` + `aria-orientation="vertical"`. 각 탭은 `role="tab"` + `aria-selected` + `aria-controls="[panel-id]"`. 패널은 `role="tabpanel"` + `aria-labelledby="[tab-id]"` |

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
| 폼 필드 라벨에 `form-field__label text-form-label` | 인라인 `<div style="font-size:">` 로 라벨 대체 |
| 선택 컨트롤에 `dropdown--button` 구조 (dropdown.md) | `<select class="input">` 네이티브 요소 사용 |
| 대제목 모달은 각 섹션 내부에서 액션 처리 | 대제목 모달에 `modal__footer` 추가 |
| footer 버튼: 보조 → 주요 순서 (주요 액션이 오른쪽 끝) | 주요 액션을 왼쪽에 배치 |
| `modal__aside`는 읽기 전용 컨텍스트 정보만 | `modal__aside` 안에 폼 입력 배치 |
| 중첩 모달: `z-index: calc(var(--z-modal) + var(--z-above))` | 중첩 모달에 동일 z-index 사용 |
| 모달 열릴 때 `trapFocus()` 호출, 닫힐 때 원래 포커스 복원 | 모달 열려도 포커스 이동 없음 |
