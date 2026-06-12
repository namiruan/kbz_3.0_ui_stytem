---
file: components/organisms/modal.md
version: 0.1.0
status: draft
updated: 2026-06-11
depends-on: components/_index.md, components/atoms/button.md, components/atoms/icon-button.md, components/atoms/badge.md, components/atoms/input.md, components/atoms/segment.md, components/molecules/form-field.md, components/molecules/tab.md, components/molecules/dropdown.md, components/organisms/form.md, components/organisms/table/index.md, components/organisms/table/data.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/shadow.md, tokens/z-index.md, tokens/typography.md
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
       aria-label="[제목 텍스트]">

    <div class="modal__header">
      <p class="modal__title text-modal-title-sm">제목</p>
      (modal--lg 유형은 text-modal-title 사용)
      <button class="icon-on--lg" type="button" aria-label="닫기">
        <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
      </button>
    </div>

    <div class="modal__body">

      (대제목 모달 전용: 세로 탭 내비게이션 — tab.md tab-group--vertical 패턴)
      <div class="tab-group tab-group--vertical" role="tablist" aria-label="[모달명] 섹션" aria-orientation="vertical">
        <span class="tab-group__slider" aria-hidden="true"></span>
        <button class="tab" role="tab" aria-selected="false" id="[tab-id-N]" aria-controls="[panel-id-N]" tabindex="-1"><span class="tab__label">섹션명</span></button>
        <button class="tab tab--selected" role="tab" aria-selected="true" id="[tab-id-M]" aria-controls="[panel-id-M]" tabindex="0"><span class="tab__label">선택된 섹션</span></button>
      </div>

      (소제목 모달 전용: 읽기 전용 정보 패널. 이름·소속·날짜 등 컨텍스트 정보만. 인터랙티브 컨트롤 배치 금지)
      <aside class="modal__aside"></aside>

      <div class="modal__content">
        (패널별로 div[id][role="tabpanel"][aria-labelledby="[tab-id]"] 배치. 비활성 패널은 hidden 속성.
        .tab-panel 클래스 사용 금지 — modal__content가 padding 담당)
        <div id="[panel-id-M]" role="tabpanel" aria-labelledby="[tab-id-M]">...콘텐츠...</div>
        <div id="[panel-id-N]" role="tabpanel" aria-labelledby="[tab-id-N]" hidden>...</div>
      </div>

    </div>

    (소제목 모달 전용)
    <div class="modal__footer">
      <button class="btn btn--ghost btn--md" type="button">저장 안 함</button>
      <button class="btn btn--primary btn--md" type="submit">저장하기</button>
    </div>

  </div>
</div>

구조 규칙:
- modal-overlay: 항상 감싸야 함. fixed 포지셔닝, z-index var(--z-modal), 화면 중앙 배치
- modal 너비: 인라인 style="width:Npx" 또는 페이지 전용 클래스 (소제목 600–900px, 대제목 1000–1200px)
- modal__body: flex row. nav/aside 없으면 modal__content가 전체 너비 차지
- modal__content: overflow-y:auto — 콘텐츠가 길면 내부 스크롤
- min-height:0 on modal__body: flex 자식의 overflow 스크롤 활성화에 필요
- modal__header · modal__footer border 없음 (모든 유형 동일)
- 닫기 버튼: icon-button.md 패턴 — button.icon-on--lg > svg icon-close. btn--* 컴포넌트 아님

하위 컴포넌트 사용 규칙:
- 닫기 버튼: icon-button.md. button.icon-on--lg > svg. btn--* 사용 금지.
- 버튼 (footer): button.md. btn btn--primary|secondary btn--solid btn--md. btn--[size]가 폰트 포함 — text-button-* 중복 사용 금지.
- 모달 제목: p.modal__title + text-modal-title-sm (소제목) / text-modal-title (대제목). h2 사용 금지.
  접근성은 dialog에 aria-label="[제목 텍스트]"로 연결.
- 섹션 소제목: div 또는 span + text-table-header-md 클래스 (font-size-lg/15px, semibold).
  text-card-title (font-size-h4/17px, semibold) 사용 금지.
- 폼 필드: form.md 기준으로 트리를 구성한다.
  다열 배치: div.form-row > div.form-field.form-field--half (2열) / .form-field--auto (고정 너비).
  단열 배치: div.form-field 단독. 라벨은 label.form-field__label 만 사용 — text-form-label 중복 추가 금지.
  form-field-group / form-field-group--horizontal 사용 금지 (분자 수준 패턴, 모달에 적용 안 함).
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
      <div data-component class="modal" role="dialog" aria-modal="true" aria-label="급여 설정" style="width:720px;max-width:100%">
        <div class="modal__header">
          <p class="modal__title text-modal-title-sm">급여 설정</p>
          <button class="icon-on--lg" type="button" aria-label="닫기">
            <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
          </button>
        </div>
        <div class="modal__body">
          <div class="modal__content">
            <div class="form-row" style="margin-bottom:var(--space-stack-lg)">
              <div class="form-field form-field--half">
                <label class="form-field__label" id="sm-paytype-label">급여유형</label>
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
              <div class="form-field form-field--half">
                <label class="form-field__label" for="sm-basepay">기본급</label>
                <div class="input-wrap input-wrap--suffix">
                  <input class="input" type="text" id="sm-basepay" value="3,000,000">
                  <span class="input__suffix">원</span>
                </div>
              </div>
              <div class="form-field form-field--half">
                <label class="form-field__label" for="sm-hourly">통상시급</label>
                <div class="input-wrap input-wrap--suffix">
                  <input class="input input--readonly" type="text" id="sm-hourly" value="10,300" readonly>
                  <span class="input__suffix">원</span>
                </div>
              </div>
            </div>
            <div class="text-table-header-md" style="margin-bottom:var(--space-stack-sm)">고정급여</div>
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
          <button class="btn btn--primary btn--md" type="submit">저장하기</button>
        </div>
      </div>
    </div>

    <!-- 대제목 모달 -->
    <div data-panel="modal-lg" style="display:none">
      <div data-component class="modal modal--lg" role="dialog" aria-modal="true" aria-label="근로자 정보" style="width:900px;max-width:100%">
        <div class="modal__header">
          <p class="modal__title text-modal-title">근로자 정보</p>
          <button class="icon-on--lg" type="button" aria-label="닫기">
            <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
          </button>
        </div>
        <div class="modal__body">
          <div class="tab-group tab-group--vertical" role="tablist" aria-label="근로자 정보 섹션" aria-orientation="vertical">
            <span class="tab-group__slider" aria-hidden="true"></span>
            <button class="tab" role="tab" aria-selected="false" id="modal-nav-1" aria-controls="modal-panel-1" tabindex="-1"><span class="tab__label">인사정보</span></button>
            <button class="tab" role="tab" aria-selected="false" id="modal-nav-2" aria-controls="modal-panel-2" tabindex="-1"><span class="tab__label">학력·자격·경력</span></button>
            <button class="tab tab--selected" role="tab" aria-selected="true" id="modal-nav-3" aria-controls="modal-panel-3" tabindex="0"><span class="tab__label">급여 정보</span></button>
            <button class="tab" role="tab" aria-selected="false" id="modal-nav-4" aria-controls="modal-panel-4" tabindex="-1"><span class="tab__label">근무 정보</span></button>
            <button class="tab" role="tab" aria-selected="false" id="modal-nav-5" aria-controls="modal-panel-5" tabindex="-1"><span class="tab__label">등록·발급 서류</span></button>
          </div>
          <div class="modal__content">

            <!-- ── 패널 1: 인사정보 ── -->
            <div id="modal-panel-1" role="tabpanel" aria-labelledby="modal-nav-1" hidden>
              <div class="tab-header">
                <div class="tab-group" role="tablist" aria-label="인사정보 탭">
                  <span class="tab-group__slider" aria-hidden="true"></span>
                  <button class="tab tab--selected" role="tab" aria-selected="true" id="p1-tab-1" aria-controls="p1-sub-1" tabindex="0"><span class="tab__label">인사정보</span></button>
                  <button class="tab" role="tab" aria-selected="false" id="p1-tab-2" aria-controls="p1-sub-2" tabindex="-1"><span class="tab__label">인사노트</span></button>
                </div>
                <div class="tab-header__actions">
                  <button class="btn btn--secondary btn--md btn--icon-left" type="button">
                    <span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-settings"/></svg></span>
                    근로자 추가
                  </button>
                </div>
              </div>
              <div class="tab-panel" id="p1-sub-1" role="tabpanel" aria-labelledby="p1-tab-1">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-stack-md)">
                  <div class="text-table-header-md" style="color:var(--color-text-brand)">기본정보</div>
                  <label style="display:flex;align-items:center;gap:var(--space-gap-xs);font-size:var(--font-size-sm);color:var(--color-text-body)">
                    <input type="checkbox" style="margin:0"> 국적/거주국가 변경하기
                  </label>
                </div>
                <div class="form-row" style="margin-bottom:var(--space-stack-md)">
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" for="p1-name">이름 <span style="color:var(--color-text-error)">(필수)</span></label>
                    <input class="input" type="text" id="p1-name" placeholder="한글 이름을 입력하세요">
                  </div>
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" for="p1-ename">영문명</label>
                    <input class="input" type="text" id="p1-ename" placeholder="영문 이름을 입력하세요">
                  </div>
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" id="p1-disability-label">장애인/국가유공자</label>
                    <div class="dropdown dropdown--button" style="width:100%">
                      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="p1-disability-label">
                        <span class="dropdown__value">해당없음</span>
                        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      </button>
                      <div class="dropdown__panel">
                        <ul class="dropdown__list" role="listbox" aria-labelledby="p1-disability-label">
                          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">해당없음</span></li>
                          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">장애인</span></li>
                          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">국가유공자</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-row" style="margin-bottom:var(--space-stack-md)">
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" for="p1-ssn">주민등록번호 <span style="color:var(--color-text-error)">(필수)</span></label>
                    <input class="input" type="text" id="p1-ssn" placeholder="(-)없이 입력하세요">
                  </div>
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" for="p1-phone">핸드폰번호</label>
                    <input class="input" type="text" id="p1-phone" placeholder="(-)없이 입력하세요">
                  </div>
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" for="p1-personal-email">개인 메일</label>
                    <input class="input" type="text" id="p1-personal-email" placeholder="">
                  </div>
                </div>
                <div style="margin-bottom:var(--space-stack-md)">
                  <label class="form-field__label">집 주소</label>
                  <div style="display:flex;gap:var(--space-gap-sm);margin-bottom:var(--space-gap-sm)">
                    <input class="input" type="text" placeholder="우편번호" style="width:100px;flex-shrink:0">
                    <input class="input input--readonly" type="text" readonly style="flex:1">
                    <button class="btn btn--secondary btn--solid btn--md" type="button">주소 검색</button>
                  </div>
                  <input class="input" type="text" placeholder="상세주소를 입력해 주세요" style="width:100%">
                </div>
                <div class="text-table-header-md" style="color:var(--color-text-brand);margin-bottom:var(--space-stack-md)">인사정보</div>
                <div class="form-row" style="margin-bottom:var(--space-stack-md)">
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" for="p1-joindate">입사일 <span style="color:var(--color-text-error)">(필수)</span></label>
                    <div class="input-wrap input-wrap--suffix">
                      <input class="input input--complete" type="text" id="p1-joindate" value="2020-11-30">
                      <span class="input__suffix"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
                    </div>
                  </div>
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" for="p1-leavedate">퇴사일</label>
                    <div class="input-wrap input-wrap--suffix">
                      <input class="input" type="text" id="p1-leavedate" placeholder="YYYY-MM-DD">
                      <span class="input__suffix"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
                    </div>
                  </div>
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" id="p1-worktype-label">근무유형 <span style="color:var(--color-text-error)">(필수)</span></label>
                    <div class="dropdown dropdown--button" style="width:100%">
                      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="p1-worktype-label">
                        <span class="dropdown__value">계약직</span>
                        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      </button>
                      <div class="dropdown__panel">
                        <ul class="dropdown__list" role="listbox" aria-labelledby="p1-worktype-label">
                          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">계약직</span></li>
                          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">정규직</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" id="p1-paytype-label">급여유형 <span style="color:var(--color-text-error)">(필수)</span></label>
                    <div class="dropdown dropdown--button" style="width:100%">
                      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="p1-paytype-label">
                        <span class="dropdown__value">포괄임금</span>
                        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      </button>
                      <div class="dropdown__panel">
                        <ul class="dropdown__list" role="listbox" aria-labelledby="p1-paytype-label">
                          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">포괄임금</span></li>
                          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">시급제</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-row" style="margin-bottom:var(--space-stack-md)">
                  <div class="form-field" style="flex:0 0 160px">
                    <label class="form-field__label" id="p1-bank-label">급여계좌</label>
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
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" for="p1-depositor">임금자명</label>
                    <input class="input" type="text" id="p1-depositor" placeholder="임금자명">
                  </div>
                  <div class="form-field" style="flex:2">
                    <label class="form-field__label" for="p1-account">계좌번호</label>
                    <input class="input" type="text" id="p1-account" placeholder="계좌번호">
                  </div>
                </div>
                <div class="form-row" style="margin-bottom:var(--space-stack-md)">
                  <div class="form-field form-field--half">
                    <label class="form-field__label" for="p1-empno">사번</label>
                    <input class="input" type="text" id="p1-empno">
                  </div>
                  <div class="form-field form-field--half">
                    <label class="form-field__label" for="p1-workemail">회사 메일</label>
                    <input class="input" type="text" id="p1-workemail">
                  </div>
                </div>
              </div>
              <div class="tab-panel" id="p1-sub-2" role="tabpanel" aria-labelledby="p1-tab-2" hidden>
                <p class="text-body" style="color:var(--color-text-subtle)">인사노트 내용이 없습니다.</p>
              </div>
            </div>

            <!-- ── 패널 2: 학력·자격·경력 ── -->
            <div id="modal-panel-2" role="tabpanel" aria-labelledby="modal-nav-2" hidden>
              <!-- 학력 사항 -->
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-stack-sm)">
                <div style="display:flex;align-items:center;gap:var(--space-gap-xs)">
                  <span style="color:var(--color-text-brand);font-weight:var(--font-weight-bold)">—</span>
                  <span class="text-table-header-md" style="color:var(--color-text-brand)">학력 사항</span>
                  <span class="badge badge--neutral">0</span>
                </div>
                <div style="display:flex;gap:var(--space-gap-xs)">
                  <button class="btn btn--primary btn--sm" type="button">+ 추가</button>
                  <button class="btn btn--ghost btn--sm btn--icon-left" type="button">
                    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span>
                    삭제
                  </button>
                </div>
              </div>
              <div class="table-container" style="margin-bottom:var(--space-stack-lg)">
                <table class="table table--dense" aria-label="학력 사항">
                  <thead class="table__head">
                    <tr>
                      <th class="table__head-cell" scope="col" style="width:40px"><input type="checkbox" aria-label="전체 선택"></th>
                      <th class="table__head-cell" scope="col">학교명</th>
                      <th class="table__head-cell" scope="col">졸업구분</th>
                      <th class="table__head-cell" scope="col">학과(전공)</th>
                      <th class="table__head-cell" scope="col">학위</th>
                      <th class="table__head-cell" scope="col">입학월</th>
                      <th class="table__head-cell" scope="col">졸업월</th>
                    </tr>
                  </thead>
                  <tbody class="table__body">
                    <tr class="table__row">
                      <td class="table__cell" colspan="7" style="text-align:center;color:var(--color-text-subtle)">등록된 데이터가 없습니다</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 자격 사항 -->
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-stack-sm)">
                <div style="display:flex;align-items:center;gap:var(--space-gap-xs)">
                  <span style="color:var(--color-text-brand);font-weight:var(--font-weight-bold)">—</span>
                  <span class="text-table-header-md" style="color:var(--color-text-brand)">자격 사항</span>
                  <span class="badge badge--neutral">0</span>
                </div>
                <div style="display:flex;gap:var(--space-gap-xs)">
                  <button class="btn btn--primary btn--sm" type="button">+ 추가</button>
                  <button class="btn btn--ghost btn--sm btn--icon-left" type="button">
                    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span>
                    삭제
                  </button>
                </div>
              </div>
              <div class="table-container" style="margin-bottom:var(--space-stack-lg)">
                <table class="table table--dense" aria-label="자격 사항">
                  <thead class="table__head">
                    <tr>
                      <th class="table__head-cell" scope="col" style="width:40px"><input type="checkbox" aria-label="전체 선택"></th>
                      <th class="table__head-cell" scope="col">자격증</th>
                      <th class="table__head-cell" scope="col">등록번호</th>
                      <th class="table__head-cell" scope="col">합격일</th>
                      <th class="table__head-cell" scope="col">첨부파일</th>
                    </tr>
                  </thead>
                  <tbody class="table__body">
                    <tr class="table__row">
                      <td class="table__cell" colspan="5" style="text-align:center;color:var(--color-text-subtle)">등록된 데이터가 없습니다</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 경력 사항 -->
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-stack-sm)">
                <div style="display:flex;align-items:center;gap:var(--space-gap-xs)">
                  <span style="color:var(--color-text-brand);font-weight:var(--font-weight-bold)">—</span>
                  <span class="text-table-header-md" style="color:var(--color-text-brand)">경력 사항</span>
                  <span class="badge badge--neutral">0</span>
                </div>
                <div style="display:flex;gap:var(--space-gap-xs)">
                  <button class="btn btn--primary btn--sm" type="button">+ 추가</button>
                  <button class="btn btn--ghost btn--sm btn--icon-left" type="button">
                    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span>
                    삭제
                  </button>
                </div>
              </div>
              <div class="table-container">
                <table class="table table--dense" aria-label="경력 사항">
                  <thead class="table__head">
                    <tr>
                      <th class="table__head-cell" scope="col" style="width:40px"><input type="checkbox" aria-label="전체 선택"></th>
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
                    <tr class="table__row">
                      <td class="table__cell" colspan="8" style="text-align:center;color:var(--color-text-subtle)">등록된 데이터가 없습니다</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- ── 패널 3: 급여 정보 ── -->
            <div id="modal-panel-3" role="tabpanel" aria-labelledby="modal-nav-3">
              <div class="tab-header">
                <div class="tab-group" role="tablist" aria-label="급여 탭">
                  <span class="tab-group__slider" aria-hidden="true"></span>
                  <button class="tab tab--selected" role="tab" aria-selected="true" id="p3-tab-1" aria-controls="p3-sub-1" tabindex="0"><span class="tab__label">급여정보</span></button>
                  <button class="tab" role="tab" aria-selected="false" id="p3-tab-2" aria-controls="p3-sub-2" tabindex="-1"><span class="tab__label">급여명세서</span></button>
                </div>
                <div class="tab-header__actions">
                  <button class="btn btn--primary btn--md" type="button">급여설정</button>
                  <button class="btn btn--secondary btn--md" type="button">급여 이력</button>
                </div>
              </div>
              <div class="tab-panel" id="p3-sub-1" role="tabpanel" aria-labelledby="p3-tab-1">
                <div class="form-row" style="margin-bottom:var(--space-stack-lg)">
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" id="p3-paytype-label">급여유형</label>
                    <div class="dropdown dropdown--button" style="width:100%">
                      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="p3-paytype-label">
                        <span class="dropdown__value">포괄임금_본사</span>
                        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
                      </button>
                      <div class="dropdown__panel">
                        <ul class="dropdown__list" role="listbox" aria-labelledby="p3-paytype-label">
                          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">포괄임금_본사</span></li>
                          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">포괄임금_지사</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" for="p3-basepay">기본급</label>
                    <input class="input input--readonly" type="text" id="p3-basepay" readonly placeholder="기본급">
                  </div>
                  <div class="form-field" style="flex:1">
                    <label class="form-field__label" for="p3-hourly">통상시급</label>
                    <input class="input input--readonly" type="text" id="p3-hourly" readonly placeholder="통상시급">
                  </div>
                </div>
                <div style="display:flex;gap:var(--space-gap-lg)">
                  <div style="flex:1;min-width:0">
                    <div class="text-table-header-md" style="margin-bottom:var(--space-stack-sm)">고정급여</div>
                    <div class="table-container" style="margin-bottom:var(--space-stack-lg)">
                      <table class="table table--dense" aria-label="고정급여">
                        <thead class="table__head">
                          <tr>
                            <th class="table__head-cell" scope="col">과세</th>
                            <th class="table__head-cell" scope="col">항목</th>
                            <th class="table__head-cell table__cell--number" scope="col">금액</th>
                          </tr>
                        </thead>
                        <tbody class="table__body">
                          <tr class="table__row"><td class="table__cell"><span class="badge badge--neutral">비과세</span></td><td class="table__cell">육아수당</td><td class="table__cell table__cell--number">—</td></tr>
                          <tr class="table__row"><td class="table__cell"><span class="badge badge--neutral">비과세</span></td><td class="table__cell">식대</td><td class="table__cell table__cell--number">—</td></tr>
                          <tr class="table__row"><td class="table__cell"><span class="badge badge--neutral">비과세</span></td><td class="table__cell">성과수당</td><td class="table__cell table__cell--number">—</td></tr>
                          <tr class="table__row"><td class="table__cell"><span class="badge badge--neutral">비과세</span></td><td class="table__cell">차량유지비</td><td class="table__cell table__cell--number">—</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="text-table-header-md" style="margin-bottom:var(--space-stack-sm)">변동급여</div>
                    <div class="table-container">
                      <table class="table table--dense" aria-label="변동급여">
                        <thead class="table__head">
                          <tr>
                            <th class="table__head-cell" scope="col">항목</th>
                            <th class="table__head-cell table__cell--number" scope="col">가산율</th>
                          </tr>
                        </thead>
                        <tbody class="table__body">
                          <tr class="table__row"><td class="table__cell">야간수당</td><td class="table__cell table__cell--number">50%</td></tr>
                          <tr class="table__row"><td class="table__cell">휴일야간연장수당</td><td class="table__cell table__cell--number">50%</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div style="flex:1;min-width:0">
                    <div class="text-table-header-md" style="margin-bottom:var(--space-stack-sm)">공제</div>
                    <div class="table-container" style="margin-bottom:var(--space-stack-md)">
                      <table class="table table--dense" aria-label="4대보험">
                        <thead class="table__head">
                          <tr>
                            <th class="table__head-cell" scope="col">4대보험</th>
                            <th class="table__head-cell table__cell--number" scope="col">기준보수</th>
                            <th class="table__head-cell table__cell--number" scope="col">요율</th>
                          </tr>
                        </thead>
                        <tbody class="table__body">
                          <tr class="table__row"><td class="table__cell">노인장기요양보험</td><td class="table__cell table__cell--number">—</td><td class="table__cell table__cell--number">12.95%</td></tr>
                          <tr class="table__row"><td class="table__cell">국민연금</td><td class="table__cell table__cell--number">—</td><td class="table__cell table__cell--number">4.5%</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="table-container" style="margin-bottom:var(--space-stack-md)">
                      <table class="table table--dense" aria-label="추가공제">
                        <thead class="table__head">
                          <tr>
                            <th class="table__head-cell" scope="col">추가공제</th>
                            <th class="table__head-cell table__cell--number" scope="col">고정금액</th>
                            <th class="table__head-cell table__cell--number" scope="col">요율</th>
                          </tr>
                        </thead>
                        <tbody class="table__body">
                          <tr class="table__row"><td class="table__cell">기타</td><td class="table__cell table__cell--number">—</td><td class="table__cell table__cell--number">—</td></tr>
                          <tr class="table__row"><td class="table__cell">기타2</td><td class="table__cell table__cell--number">30,000</td><td class="table__cell table__cell--number">—</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="table-container">
                      <table class="table table--dense" aria-label="원천징수세액">
                        <thead class="table__head">
                          <tr>
                            <th class="table__head-cell" scope="col">원천징수세액</th>
                            <th class="table__head-cell" scope="col">공제여부</th>
                          </tr>
                        </thead>
                        <tbody class="table__body">
                          <tr class="table__row"><td class="table__cell">소득세</td><td class="table__cell">—</td></tr>
                          <tr class="table__row"><td class="table__cell">지방소득세</td><td class="table__cell">공제</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-panel" id="p3-sub-2" role="tabpanel" aria-labelledby="p3-tab-2" hidden>
                <p class="text-body" style="color:var(--color-text-subtle)">급여명세서 데이터가 없습니다.</p>
              </div>
            </div>

            <!-- ── 패널 4: 근무 정보 ── -->
            <div id="modal-panel-4" role="tabpanel" aria-labelledby="modal-nav-4" hidden>
              <!-- 통계 헤더 -->
              <div style="display:flex;align-items:center;gap:var(--space-gap-lg);margin-bottom:var(--space-stack-md);flex-wrap:wrap">
                <div style="display:flex;align-items:center;gap:var(--space-gap-sm)">
                  <button class="btn btn--ghost btn--md btn--icon-only" type="button" aria-label="이전 달">
                    <span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
                  </button>
                  <span class="text-table-header-md">2025 - 01</span>
                  <button class="btn btn--ghost btn--md btn--icon-only" type="button" aria-label="다음 달">
                    <span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
                  </button>
                  <button class="btn btn--secondary btn--sm" type="button">오늘</button>
                </div>
                <div style="display:flex;gap:var(--space-gap-lg);font-size:var(--font-size-sm);flex-wrap:wrap">
                  <div><span style="color:var(--color-text-subtle)">정상근무</span> <strong>176h</strong></div>
                  <div><span style="color:var(--color-text-brand)">실근무</span> <strong style="color:var(--color-text-brand)">101h 46m</strong></div>
                  <div><span style="color:var(--color-text-brand)">(초과)</span> <strong style="color:var(--color-text-brand)">18h 30m</strong></div>
                  <div><span style="color:var(--color-text-error)">결근/지각/조퇴/외출</span> <strong style="color:var(--color-text-error)">12h 16m</strong></div>
                  <div><span style="color:var(--color-text-subtle)">연차</span> <strong>3/15</strong></div>
                </div>
                <div style="margin-left:auto;display:flex;gap:var(--space-gap-sm)">
                  <button class="btn btn--secondary btn--sm" type="button">근무 유형 변경</button>
                  <button class="btn btn--secondary btn--sm" type="button">휴가 설정</button>
                </div>
              </div>
              <!-- 달력 -->
              <div class="table-container">
                <table class="table" aria-label="2025년 1월 근무 달력" style="table-layout:fixed">
                  <thead class="table__head">
                    <tr>
                      <th class="table__head-cell" scope="col">월</th>
                      <th class="table__head-cell" scope="col">화</th>
                      <th class="table__head-cell" scope="col">수</th>
                      <th class="table__head-cell" scope="col">목</th>
                      <th class="table__head-cell" scope="col">금</th>
                      <th class="table__head-cell" scope="col" style="color:var(--color-text-subtle)">토</th>
                      <th class="table__head-cell" scope="col" style="color:var(--color-text-error)">일</th>
                    </tr>
                  </thead>
                  <tbody class="table__body">
                    <tr class="table__row" style="height:64px;vertical-align:top">
                      <td class="table__cell" style="color:var(--color-text-subtle);font-size:var(--font-size-sm)">30</td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>1</div><div style="color:var(--color-text-brand)">● 연차</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>2</div><div style="color:var(--color-text-brand)">● 8h</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>3</div><div style="color:var(--color-text-brand)">● 7h 14m</div><div style="color:var(--color-text-error)">● 46m</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>4</div><div style="color:var(--color-text-brand)">● 9h(1h 초과)</div><div style="color:var(--color-text-error)">● 30m</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)">5</td>
                      <td class="table__cell" style="font-size:var(--font-size-sm);color:var(--color-text-error)">6</td>
                    </tr>
                    <tr class="table__row" style="height:64px;vertical-align:top">
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>7</div><div style="color:var(--color-text-brand)">● 4h</div><div style="color:var(--color-text-subtle)">● 반차</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>8</div><div style="color:var(--color-text-brand)">● 8h</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>9</div><div style="color:var(--color-text-brand)">● 8h</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>10</div><div style="color:var(--color-text-brand)">● 8h</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>11</div><div style="color:var(--color-text-brand)">● 6h</div><div style="color:var(--color-text-subtle)">● 반반차</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)">12</td>
                      <td class="table__cell" style="font-size:var(--font-size-sm);color:var(--color-text-error)">13</td>
                    </tr>
                    <tr class="table__row" style="height:64px;vertical-align:top">
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>14</div><div style="color:var(--color-text-error)">● 결근</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>15</div><div style="color:var(--color-text-subtle)">● 기타휴가</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>16</div><div style="color:var(--color-text-subtle)">● 기타휴가</div></td>
                      <td class="table__cell" style="background:var(--color-surface-subtle);font-size:var(--font-size-sm)"><div>17</div><div style="color:var(--color-text-brand)">● 6h(2h 초과)</div><div style="color:var(--color-text-error)">● 2h 30m</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>18</div><div style="color:var(--color-text-brand)">● 12h 30m</div><div style="color:var(--color-text-error)">● 30m</div><div style="color:var(--color-text-subtle)">● 반반차</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)">19</td>
                      <td class="table__cell" style="font-size:var(--font-size-sm);color:var(--color-text-error)">20</td>
                    </tr>
                    <tr class="table__row" style="height:64px;vertical-align:top">
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>21</div><div style="color:var(--color-text-brand)">● 8h</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>22</div><div style="color:var(--color-text-brand)">● 8h</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>23</div><div style="color:var(--color-text-brand)">● 4h</div><div style="color:var(--color-text-subtle)">● 반차</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)">24</td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>25</div><div style="color:var(--color-text-brand)">● 8h</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>26</div><div style="color:var(--color-text-brand)">● 4h(4h 초과)</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div style="color:var(--color-text-error)">27</div><div style="color:var(--color-text-brand)">● 8h(8h 초과)</div></td>
                    </tr>
                    <tr class="table__row" style="height:64px;vertical-align:top">
                      <td class="table__cell" style="font-size:var(--font-size-sm)"><div>28</div><div style="color:var(--color-text-brand)">● 8h(1h 초과)</div><div style="color:var(--color-text-error)">● 30m</div><div style="color:var(--color-text-subtle)">● 반차</div></td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)">29</td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)">30</td>
                      <td class="table__cell" style="font-size:var(--font-size-sm)">31</td>
                      <td class="table__cell" style="color:var(--color-text-subtle);font-size:var(--font-size-sm)">1</td>
                      <td class="table__cell" style="color:var(--color-text-subtle);font-size:var(--font-size-sm)">2</td>
                      <td class="table__cell" style="color:var(--color-text-subtle);font-size:var(--font-size-sm)">3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- ── 패널 5: 등록·발급 서류 ── -->
            <div id="modal-panel-5" role="tabpanel" aria-labelledby="modal-nav-5" hidden>
              <div style="margin-bottom:var(--space-stack-lg)">
                <div class="segment" role="radiogroup" aria-label="서류 유형" id="p5-segment">
                  <span class="segment__slider" aria-hidden="true"></span>
                  <button class="segment__item" role="radio" aria-checked="false" data-target="p5-issue">발급</button>
                  <button class="segment__item segment__item--selected" role="radio" aria-checked="true" data-target="p5-register">등록</button>
                </div>
              </div>
              <div data-panel="p5-issue" style="display:none">
                <p class="text-body" style="color:var(--color-text-subtle)">발급 서류 내역이 없습니다.</p>
              </div>
              <div data-panel="p5-register">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-stack-sm)">
                  <div style="display:flex;align-items:center;gap:var(--space-gap-xs)">
                    <span class="text-table-header-md" style="color:var(--color-text-brand)">가족사항</span>
                    <span class="badge badge--neutral">0</span>
                  </div>
                  <div style="display:flex;gap:var(--space-gap-xs)">
                    <button class="btn btn--primary btn--sm" type="button">+ 추가</button>
                    <button class="btn btn--ghost btn--sm btn--icon-left" type="button">
                      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span>
                      삭제
                    </button>
                  </div>
                </div>
                <div class="table-container">
                  <table class="table table--dense" aria-label="가족사항">
                    <thead class="table__head">
                      <tr>
                        <th class="table__head-cell" scope="col" style="width:40px"><input type="checkbox" aria-label="전체 선택"></th>
                        <th class="table__head-cell" scope="col">번호</th>
                        <th class="table__head-cell" scope="col">문서 종류</th>
                        <th class="table__head-cell" scope="col">등록일</th>
                        <th class="table__head-cell" scope="col">처리자</th>
                        <th class="table__head-cell" scope="col">첨부파일</th>
                      </tr>
                    </thead>
                    <tbody class="table__body">
                      <tr class="table__row">
                        <td class="table__cell"><input type="checkbox" aria-label="선택"></td>
                        <td class="table__cell">1</td>
                        <td class="table__cell">재직증명서</td>
                        <td class="table__cell">2012-11-30</td>
                        <td class="table__cell">김아무개</td>
                        <td class="table__cell"><button class="btn btn--ghost btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg></span> 상세보기</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</div>
<script>
(function() {
  initSegment(stage);

  var lgPanel = stage.querySelector('[data-panel="modal-lg"]');
  var lgBtn   = stage.querySelector('[data-target="modal-lg"]');
  if (lgBtn && lgPanel) {
    lgBtn.addEventListener('click', function() {
      lgPanel.querySelectorAll('.tab-group').forEach(function(g) { delete g.dataset.initTab; });
      initTab(lgPanel);
      initSegment(lgPanel);
    });
  }

  initTab(stage); /* hidden 컨테이너 초기화 순서 규칙은 tab.md § 동작 참조 */

  /* 세로 탭 nav 클릭 시 → 해당 패널 안의 중첩 탭·세그먼트 재초기화 */
  stage.querySelectorAll('.tab-group--vertical [role="tab"]').forEach(function(navTab) {
    navTab.addEventListener('click', function() {
      var panelId = navTab.getAttribute('aria-controls');
      var panel = panelId && stage.querySelector('#' + panelId);
      if (!panel) return;
      panel.querySelectorAll('.tab-group').forEach(function(g) { delete g.dataset.initTab; });
      initTab(panel);
      initSegment(panel);
    });
  });

  var pe = stage.querySelector('.pattern-explorer');
  if (pe) pe.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:var(--space-gap-sm);width:100%';
  var panel = stage.querySelector('.pattern-explorer__panel');
  if (panel) panel.style.cssText = 'width:100%;min-width:0';
  var seg = stage.querySelector('#modal-segment');
  if (seg) seg.style.cssText = 'width:max-content';
})();
</script>
:::

### 대제목 모달 제약

- 좌측 탭 내비게이션은 `tab-group--vertical` (tab.md) 을 사용한다. `modal__nav` 패턴 사용 금지.
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
  padding: var(--space-inset-2xl) var(--space-inset-3xl) 0;
  height: var(--height-spacious);
  flex-shrink: 0;
}

.modal--lg .modal__header {
  height: auto;
  padding: var(--space-inset-2xl) var(--space-inset-3xl) 0;
}

/* ── Title — p 태그 사용. font은 text-modal-title-sm / text-modal-title 유틸 클래스로 처리 ── */
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

/* 대제목 모달: overlay 없이 렌더링될 때(preview 등) body가 collapse하지 않도록 최소 높이 지정 */
.modal--lg .modal__body {
  min-height: 400px;
}

/* ── Nav (대제목 모달 전용) — tab.md tab-group--vertical 사용 ── */
/* 탭 스타일은 tab.md에서 상속. 여기서는 모달 레이아웃에 맞는 크기·border만 오버라이드 */
.modal--lg .modal__body > .tab-group--vertical {
  width: 180px;
  flex-shrink: 0;
  overflow-y: auto;
  padding: var(--space-inset-squish-2xl); /* modal__content와 동일 — 12px 24px */
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
  padding: var(--space-inset-squish-2xl);
}

/* ── Footer ── */
.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-gap-sm);
  padding: 0 var(--space-inset-3xl) var(--space-inset-2xl);
  flex-shrink: 0;
}
```

---

## 접근성

dialog 유형.

| 상황 | 마크업 |
|------|--------|
| 모달 루트 | `role="dialog"` + `aria-modal="true"` |
| 제목 연결 | dialog 엘리먼트에 `aria-label="[제목 텍스트]"` — h2 없음 |
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
| 제목에 `p.modal__title` + `text-modal-title-sm` / `text-modal-title` | `h2.modal__title` 헤딩 태그 사용 |
| 폼 필드 라벨에 `form-field__label text-form-label` | 인라인 `<div style="font-size:...">` 로 라벨 대체 |
| 선택 컨트롤에 `dropdown--button` 구조 (dropdown.md) | `<select class="input">` 네이티브 요소 사용 |
| 대제목 모달은 각 섹션 내부에서 액션 처리 | 대제목 모달에 `modal__footer` 추가 |
| footer 버튼: 보조 → 주요 순서 (주요 액션이 오른쪽 끝) | 주요 액션을 왼쪽에 배치 |
| `modal__aside`는 읽기 전용 컨텍스트 정보만 | `modal__aside` 안에 폼 입력 배치 |
| 중첩 모달: `z-index: calc(var(--z-modal) + var(--z-above))` | 중첩 모달에 동일 z-index 사용 |
| 모달 열릴 때 `trapFocus()` 호출, 닫힐 때 원래 포커스 복원 | 모달 열려도 포커스 이동 없음 |
