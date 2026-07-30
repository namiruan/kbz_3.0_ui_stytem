---
file: components/organisms/modal.md
version: 0.5.4
status: draft
updated: 2026-07-30
depends-on: components/_index.md, components/atoms/button.md, components/atoms/icon-button.md, components/atoms/badge.md, components/atoms/input.md, components/atoms/segment.md, components/atoms/checkbox.md, components/atoms/toggle.md, components/atoms/textarea.md, components/atoms/tooltip.md, components/molecules/form-field.md, components/molecules/tab.md, components/molecules/dropdown.md, components/molecules/accordion.md, components/molecules/date-picker.md, components/organisms/form.md, components/organisms/table/index.md, components/organisms/table/data.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/elevation.md, tokens/typography.md
---

# Modal

## 개요

화면 위에 레이어로 올라와 특정 작업을 수행하는 대화 상자.  
두 가지 유형으로 구분한다.

- **대제목 모달 (`modal--lg`)** — 여러 섹션을 사이드 내비게이션으로 전환하는 복합 목적 모달. 하나의 대상(근로자·계약 등)에 대한 다수 섹션을 한 화면에서 다룰 때 사용한다. 제목이 크고 `modal__footer` 없이 각 섹션 안에서 액션을 처리한다.
- **소제목 모달 (기본)** — 단일 목적을 가진 모달. 폼·테이블·안내 등 다양한 레이아웃이 올 수 있으며, 대부분 `modal__footer`의 확인/취소 버튼으로 작업을 완료한다.

Alert와의 차이 — 입력 없이 **메시지와 확인/취소만** 묻는 다이얼로그(삭제·비가역 확인·경고)는 Modal이 아니라 **Alert**(molecule, 삭제는 `alert--danger`)를 쓴다. Modal은 폼·테이블·다중 입력·다중 섹션처럼 **작업 공간**이 필요할 때만 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| 유형 | 소제목(기본) · 대제목 → `modal--lg` | 소제목 |
| 좌측 패널 | 없음 · 내비 → `tab-group--vertical` · 정보 → `modal__aside` | 없음 |
| 우측 패널 | 없음 · 설정/액션 → `modal__detail` | 없음 |
| footer | 없음 · 있음 → `modal__footer` | 없음 |

- `modal--lg`에는 `tab-group tab-group--vertical`(tab.md 패턴) 세로 탭 내비게이션을 사용한다. 소제목 모달에서 좌측 고정 정보 패널이 필요하면 `modal__aside`를 사용한다.
- `modal__detail`은 우측에 플로팅 카드 형태로 배치되는 설정·액션 패널이다. `modal__aside`(좌측·읽기 전용)와 달리 인터랙티브 컨트롤을 포함할 수 있다.
- `modal--lg`에는 `modal__footer`를 두지 않는다.

---

<!-- AI:
모달 구조:

<div class="modal-overlay">
  <div class="modal [modal--lg]"
       role="dialog" aria-modal="true"
       aria-labelledby="[title-id]">

    <div class="modal__header">
      [설명문 없을 때 — 제목을 헤더 직속에 둔다]
      <h2 class="modal__title text-modal-title-sm" id="[title-id]">제목</h2>
      [modal--lg 유형은 text-modal-title 사용]

      [설명문 있을 때 — 모달 전체에 대한 보조 설명은 제목과 함께 modal__header-text로 묶어
       세로로 쌓는다 (alert 헤더 패턴). 위 단독 제목 대신 아래 블록을 사용:
      <div class="modal__header-text">
        <h2 class="modal__title text-modal-title-sm" id="[title-id]">제목</h2>
        <p class="modal__description text-description" id="[desc-id]">모달 전체에 대한 보조 설명</p>
      </div>
      ]
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

      [소제목 모달 전용: 좌측 읽기 전용 정보 패널]
      <aside class="modal__aside">
        [이름·소속·날짜 등 컨텍스트 정보만. 인터랙티브 컨트롤 배치 금지]
      </aside>

      <div class="modal__content">
        [본문. 콘텐츠가 길면 내부 스크롤(overflow-y:auto)]
      </div>

      [우측 설정·액션 패널 — modal__aside와 달리 인터랙티브 컨트롤 포함 가능]
      <aside class="modal__detail">
        [항목 설정 토글·검색 입력·버튼 등. 선택한 항목에 대한 상세 액션 영역]
      </aside>

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
- ⚠️ modal 너비: .modal에 반드시 style="width:Npx" 또는 페이지 전용 클래스를 지정해야 함. 너비 미지정 시 flex 오버레이 안에서 전체 너비로 늘어남 (소제목 600–900px, 대제목 1000–1200px)
- modal__body: flex row. nav/aside 없으면 modal__content가 전체 너비 차지
- ⚠️ modal__body의 직접 자식은 반드시 modal__content (또는 tab-group--vertical · modal__aside)여야 함. p·div·form-field 등을 modal__body에 직접 넣으면 레이아웃이 무너짐 — modal__content 생략 금지. (유일한 예외: 헤더 아래 **고정 안내 밴드** — modal__body를 flex-column화하고 밴드를 modal__content 앞 직속 자식으로 둔다. 아래 "모달 내 배너 사용" 참고)
- modal__content: overflow-y:auto — 콘텐츠가 길면 내부 스크롤
- min-height:0 on modal__body: flex 자식의 overflow 스크롤 활성화에 필요
- modal__header · modal__footer: border 없음 (소제목·대제목 공통)
- modal__header 보조 설명(선택): 모달 전체에 대한 안내가 필요하면 제목과 설명을 modal__header-text로 묶고 p.modal__description.text-description을 둔다 (제목 아래, alert 헤더 패턴). ⚠️ 설명 <p>를 modal__content 최상단이나 modal__body에 직접 넣지 말 것 — 헤더와 떨어져 보이고 modal__content 생략 규칙도 위반. 특정 입력 필드 설명은 이 슬롯이 아니라 form-field 헬퍼(form-field.md)를 사용.
- ⚠️ 닫기 버튼: modal__close 클래스는 이 디자인 시스템에 존재하지 않음 — 발명·사용 금지. 반드시 button.icon-on--lg > svg icon-close 구조만 사용 (icon-button.md 패턴)

하위 컴포넌트 사용 규칙:
- ⚠️ 제목 요소: 반드시 h2 사용. p·div·span 사용 금지. 요소 타입 오류 시 접근성 트리 깨짐.
  소제목 모달: h2.modal__title.text-modal-title-sm (font-size-h4, font-weight-display)
  대제목 모달: h2.modal__title.text-modal-title (font-size-h3, font-weight-display)
- ⚠️ 버튼 (footer): btn btn--primary|secondary btn--solid btn--md 만 사용. btn--[size]가 폰트 포함 — text-button-* 클래스 추가 금지 (타이포그래피 중복으로 스타일 깨짐)
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
      <div data-component class="modal" role="dialog" aria-modal="true" aria-labelledby="demo-sm-title" style="width:360px;max-width:100%">
        <div class="modal__header">
          <div class="modal__header-text">
            <h2 class="modal__title text-modal-title-sm" id="demo-sm-title">휴가 유형 추가</h2>
            <p class="modal__description text-description" id="demo-sm-desc">휴가 유형의 기본 정보와 사용 조건을 설정하세요.</p>
          </div>
          <button class="icon-on--lg" type="button" aria-label="닫기">
            <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
          </button>
        </div>
        <div class="modal__body">
          <div class="modal__content">
            <div class="form-field-group">

              <!-- 휴가 유형 사용하기 — 마스터 토글: 전체 on/off -->
              <div class="modal__setting-row modal__setting-row--master">
                <span>휴가 유형 사용하기</span>
                <label class="toggle">
                  <input type="checkbox" role="switch" checked aria-label="휴가 유형 사용하기">
                  <span class="toggle__track"><span class="toggle__thumb"></span></span>
                </label>
              </div>

              <!-- 휴가명 -->
              <div class="form-field">
                <label class="form-field__label text-form-label" for="sm-vac-name">휴가명 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
                <div class="form-field__body">
                  <input class="input input--complete" type="text" id="sm-vac-name" value="포상 휴가" aria-required="true">
                </div>
              </div>

              <!-- 휴가 부여 단위 -->
              <div class="form-field">
                <div class="form-field__label text-form-label" id="sm-unit-label">휴가 부여 단위</div>
                <div class="form-field__body">
                  <div class="segment" role="radiogroup" aria-labelledby="sm-unit-label">
                    <span class="segment__slider" aria-hidden="true"></span>
                    <button class="segment__item" role="radio" aria-checked="false">시간</button>
                    <button class="segment__item segment__item--selected" role="radio" aria-checked="true">일수</button>
                  </div>
                </div>
              </div>

              <!-- 휴가 부여 + 분리 사용 가능 -->
              <div class="form-field">
                <div class="form-field__label-row">
                  <label class="form-field__label text-form-label" for="sm-vac-days">휴가 부여 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
                  <label class="checkbox checkbox--sm">
                    <input type="checkbox">
                    <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
                    <span class="checkbox__label">분리 사용 가능</span>
                  </label>
                </div>
                <div class="form-field__body">
                  <div class="input-wrap input-wrap--suffix">
                    <input class="input input--complete" type="text" id="sm-vac-days" value="3" aria-required="true">
                    <span class="input__suffix">일</span>
                  </div>
                </div>
              </div>

              <!-- 부여 대상 + 급여 지급 -->
              <div class="modal__field-cols">
                <div class="form-field">
                  <div class="form-field__label text-form-label" id="sm-target-label">부여 대상</div>
                  <div class="form-field__body">
                    <div class="segment" role="radiogroup" aria-labelledby="sm-target-label">
                      <span class="segment__slider" aria-hidden="true"></span>
                      <button class="segment__item segment__item--selected" role="radio" aria-checked="true">전체 근로자</button>
                      <button class="segment__item" role="radio" aria-checked="false">개별 근로자</button>
                    </div>
                  </div>
                </div>
                <div class="form-field">
                  <div class="form-field__label text-form-label" id="sm-pay-label">급여 지급</div>
                  <div class="form-field__body">
                    <div class="segment" role="radiogroup" aria-labelledby="sm-pay-label">
                      <span class="segment__slider" aria-hidden="true"></span>
                      <button class="segment__item segment__item--selected" role="radio" aria-checked="true">무급</button>
                      <button class="segment__item" role="radio" aria-checked="false">유급</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 사용기간 제한하기 + 날짜 범위 — 마스터 토글 하위 종속 섹션 -->
              <div class="modal__sub-group">

                <div class="modal__setting-row">
                  <span>사용기간 제한하기</span>
                  <label class="toggle">
                    <input type="checkbox" role="switch" checked aria-label="사용기간 제한하기">
                    <span class="toggle__track"><span class="toggle__thumb"></span></span>
                  </label>
                </div>

                <!-- 시작일 ~ 종료일 (사용기간 제한 ON일 때 노출) -->
                <div class="modal__date-range">
                <div class="form-field">
                  <label class="form-field__label text-form-label" id="sm-start-label">시작일</label>
                  <div class="form-field__body">
                    <div class="dp" id="dp-sm-start">
                      <div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="sm-start-label">
                        <div class="dp__value-group">
                          <input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="시작 연도" autocomplete="off">
                          <span class="dp__value-sep" aria-hidden="true">.</span>
                          <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="시작 월" autocomplete="off">
                          <span class="dp__value-sep" aria-hidden="true">.</span>
                          <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="시작 일" autocomplete="off">
                        </div>
                        <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
                      </div>
                      <div class="form-field__footer"><p class="form-field__error text-helper" role="alert"></p></div>
                      <div class="dp__panel" id="dp-sm-start-panel" role="dialog" aria-label="시작일 선택" hidden>
                        <div class="dp__header">
                          <button class="dp__nav-btn" id="dp-sm-start-prev" type="button" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>
                          <div class="dp__select-group" aria-live="polite" aria-atomic="true">
                            <input class="dp__select-input" id="dp-sm-start-yr" type="number" min="1990" aria-label="연도">
                            <span class="dp__select-label">년</span>
                            <input class="dp__select-input dp__select-input--month" id="dp-sm-start-mo" type="number" min="1" max="12" aria-label="월">
                            <span class="dp__select-label">월</span>
                            <button class="btn btn--secondary btn--solid btn--sm" id="dp-sm-start-today" type="button">오늘</button>
                          </div>
                          <button class="dp__nav-btn" id="dp-sm-start-next" type="button" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
                        </div>
                        <div class="dp__weekday-bar">
                          <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span><span class="cal__weekday" role="columnheader" aria-label="월요일">월</span><span class="cal__weekday" role="columnheader" aria-label="화요일">화</span><span class="cal__weekday" role="columnheader" aria-label="수요일">수</span><span class="cal__weekday" role="columnheader" aria-label="목요일">목</span><span class="cal__weekday" role="columnheader" aria-label="금요일">금</span><span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
                        </div>
                        <div class="cal"><div class="cal__grid" role="grid" id="dp-sm-start-grid"><div id="dp-sm-start-weeks"></div></div></div>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="modal__date-range__sep">~</span>
                <div class="form-field">
                  <label class="form-field__label text-form-label" id="sm-end-label">종료일</label>
                  <div class="form-field__body">
                    <div class="dp" id="dp-sm-end">
                      <div class="dp__trigger" aria-haspopup="dialog" aria-labelledby="sm-end-label">
                        <div class="dp__value-group">
                          <input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="종료 연도" autocomplete="off">
                          <span class="dp__value-sep" aria-hidden="true">.</span>
                          <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="종료 월" autocomplete="off">
                          <span class="dp__value-sep" aria-hidden="true">.</span>
                          <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="종료 일" autocomplete="off">
                        </div>
                        <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
                      </div>
                      <div class="form-field__footer"><p class="form-field__error text-helper" role="alert"></p></div>
                      <div class="dp__panel" id="dp-sm-end-panel" role="dialog" aria-label="종료일 선택" hidden>
                        <div class="dp__header">
                          <button class="dp__nav-btn" id="dp-sm-end-prev" type="button" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>
                          <div class="dp__select-group" aria-live="polite" aria-atomic="true">
                            <input class="dp__select-input" id="dp-sm-end-yr" type="number" min="1990" aria-label="연도">
                            <span class="dp__select-label">년</span>
                            <input class="dp__select-input dp__select-input--month" id="dp-sm-end-mo" type="number" min="1" max="12" aria-label="월">
                            <span class="dp__select-label">월</span>
                            <button class="btn btn--secondary btn--solid btn--sm" id="dp-sm-end-today" type="button">오늘</button>
                          </div>
                          <button class="dp__nav-btn" id="dp-sm-end-next" type="button" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
                        </div>
                        <div class="dp__weekday-bar">
                          <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span><span class="cal__weekday" role="columnheader" aria-label="월요일">월</span><span class="cal__weekday" role="columnheader" aria-label="화요일">화</span><span class="cal__weekday" role="columnheader" aria-label="수요일">수</span><span class="cal__weekday" role="columnheader" aria-label="목요일">목</span><span class="cal__weekday" role="columnheader" aria-label="금요일">금</span><span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
                        </div>
                        <div class="cal"><div class="cal__grid" role="grid" id="dp-sm-end-grid"><div id="dp-sm-end-weeks"></div></div></div>
                      </div>
                    </div>
                  </div>
                </div>
                </div><!-- /modal__date-range -->

              </div><!-- /modal__sub-group -->

              <!-- 지급사유 -->
              <div class="form-field">
                <label class="form-field__label text-form-label" for="sm-reason">지급사유</label>
                <div class="form-field__body">
                  <div class="textarea-wrap textarea-wrap--char-count">
                    <textarea class="textarea" id="sm-reason" rows="4" maxlength="100"></textarea>
                    <span class="textarea-char-count" aria-hidden="true" id="sm-reason-count">0/100</span>
                  </div>
                </div>
              </div>

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
            <!-- 패널 액션 바: 저장은 이 화면의 최종 결정 → btn--primary(fill). 변경 전까지 조건부 비활성 → btn--inactive + aria-disabled="true" + tooltip (button.md 조건 미충족 비활성 패턴) -->
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-stack-lg)">
              <div class="segment segment--md" role="radiogroup" aria-label="인사정보 탭">
                <span class="segment__slider" aria-hidden="true"></span>
                <button class="segment__item segment__item--selected" role="radio" aria-checked="true">인사정보</button>
                <button class="segment__item" role="radio" aria-checked="false">인사노트</button>
              </div>
              <span class="tooltip-wrapper"
                    onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')"
                    onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">
                <button class="btn btn--primary btn--md btn--inactive" type="button"
                        aria-disabled="true" aria-describedby="tip-modal-save"
                        onfocus="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')"
                        onblur="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">변경내용 저장</button>
                <!-- AI: tooltip-panel--bottom 사용 — modal__content(overflow-y:auto) 최상단에 위치하므로 --top은 overflow 경계 밖으로 나가 클리핑됨. 스크롤 컨테이너 상단 버튼은 항상 --bottom으로 -->
                <div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" id="tip-modal-save" role="tooltip">변경 사항이 없습니다</div>
              </span>
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
                <!-- 입사일 / 퇴사일 — dp 열: flex:0 0 168px 고정 -->
                <div class="form-row">
                  <div class="form-field" style="flex: 0 0 168px">
                    <label class="form-field__label text-form-label" id="p1-join-label">입사일 <span class="form-field__required" aria-hidden="true">(필수)</span></label>
                    <div class="dp dp--has-value" style="width:100%">
                      <div class="dp__trigger" aria-haspopup="dialog" aria-expanded="false" aria-labelledby="p1-join-label">
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
                  <div class="form-field" style="flex: 0 0 168px">
                    <label class="form-field__label text-form-label" id="p1-leave-label">퇴사일</label>
                    <div class="dp" style="width:100%">
                      <div class="dp__trigger" aria-haspopup="dialog" aria-expanded="false" aria-labelledby="p1-leave-label">
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
                </div>
                <!-- 근무유형 / 급여유형 -->
                <div class="form-row">
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
  if (typeof initDatePicker     === 'function') initDatePicker(stage);

  // 조건부 비활성(btn--inactive) 클릭 차단 — button.md 패턴
  stage.querySelectorAll('.btn--inactive').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (btn.getAttribute('aria-disabled') === 'true') e.preventDefault();
    });
  });

  // 변경내용 저장: 패널 내 폼 컨트롤 변경 감지 → btn--inactive 해제
  var saveBtn = stage.querySelector('#tip-modal-save')
    ? stage.querySelector('[aria-describedby="tip-modal-save"]') : null;
  if (saveBtn) {
    var panel1 = stage.querySelector('#modal-panel-1');
    if (panel1) {
      function activateSaveBtn() {
        if (!saveBtn.classList.contains('btn--inactive')) return;
        saveBtn.classList.remove('btn--inactive');
        saveBtn.removeAttribute('aria-disabled');
        // tooltip cleanup — button.md 조건 충족 전환 패턴
        var wrapper = saveBtn.closest('.tooltip-wrapper');
        if (wrapper) {
          var panel = wrapper.querySelector('.tooltip-panel');
          if (panel) panel.classList.remove('tooltip-panel--visible');
          wrapper.onmouseenter = null;
          wrapper.onmouseleave = null;
          saveBtn.onfocus = null;
          saveBtn.onblur = null;
        }
      }
      panel1.addEventListener('input', activateSaveBtn);
      panel1.addEventListener('change', activateSaveBtn);
    }
  }

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

  // ── 소제목 모달 toggle 위계 ──
  // masterInput(ON/OFF): form-field-group 전체 활성/비활성 제어
  // periodInput(ON/OFF): modal__date-range만 활성/비활성 제어 (master가 ON일 때만)
  (function() {
    var smModal   = stage.querySelector('[data-panel="modal-sm"] .modal');
    if (!smModal) return;
    var masterInput = smModal.querySelector('input[aria-label="휴가 유형 사용하기"]');
    var periodInput = smModal.querySelector('input[aria-label="사용기간 제한하기"]');
    var dateRange   = smModal.querySelector('.modal__date-range');
    var formGroup   = smModal.querySelector('.form-field-group');
    if (!masterInput || !periodInput || !dateRange || !formGroup) return;

    function setDisabled(root, disabled, skipInput) {
      root.querySelectorAll('input, textarea, button').forEach(function(el) {
        if (el === skipInput) return;
        el.disabled = disabled;
      });
      root.querySelectorAll('.toggle').forEach(function(t) {
        if (t.querySelector('input') === skipInput) return;
        t.classList.toggle('toggle--disabled', disabled);
      });
      root.querySelectorAll('.segment').forEach(function(s) {
        s.classList.toggle('segment--disabled', disabled);
      });
      // dp__trigger는 div라 disabled 속성 불가 — dp--disabled(pointer-events:none)로 클릭 차단
      root.querySelectorAll('.dp').forEach(function(dp) {
        dp.classList.toggle('dp--disabled', disabled);
      });
      root.querySelectorAll('.input').forEach(function(el) {
        el.classList.toggle('input--disabled', disabled);
      });
      root.querySelectorAll('.textarea').forEach(function(el) {
        el.classList.toggle('textarea--disabled', disabled);
      });
    }

    function applyPeriod() {
      if (!masterInput.checked) return; // master가 OFF면 period 개별 제어 불필요
      setDisabled(dateRange, !periodInput.checked, null);
    }

    function applyMaster() {
      setDisabled(formGroup, !masterInput.checked, masterInput);
      if (masterInput.checked) applyPeriod(); // master ON 복구 시 period 상태 재반영
    }

    masterInput.addEventListener('change', applyMaster);
    periodInput.addEventListener('change', applyPeriod);
    applyMaster(); // 초기 상태 적용
  })();

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

### 설정 토글 위계 패턴

`modal__body` 안에 "기능 on/off" 성격의 토글이 있을 때 사용한다. 소제목·대제목 모달 모두 적용 가능하다.

**3단계 타이포그래피 위계**

| 레벨 | 역할 | 클래스 | 크기·굵기 |
|------|------|--------|-----------|
| 1 (마스터) | 섹션 전체 on/off | `modal__setting-row modal__setting-row--master` | 14px semibold |
| 2 (서브) | 특정 기능 on/off | `modal__setting-row` | 13px semibold |
| 3 (폼 라벨) | 개별 입력 필드 | `form-field__label text-form-label` | 13px regular |

- 마스터 토글이 off이면 레벨 2·3 전체가 disabled 상태가 된다.
- 서브 토글이 off이면 해당 서브 토글에 종속된 레벨 3만 disabled 상태가 된다.

**종속 섹션 그룹핑**

서브 토글과 그에 종속된 폼 필드들은 `modal__sub-group`으로 묶는다. `form-field-group`의 직접 자식이 되어야 gap이 정상 적용되므로, `modal__sub-group` 자체도 `flex-direction:column; gap:space-gap-md`로 정의되어 있다.

```html
<!-- 마스터 토글 -->
<div class="modal__setting-row modal__setting-row--master">
  <span>기능 사용하기</span>
  <label class="toggle">...</label>
</div>

<!-- 종속 폼 필드들 (마스터 on일 때 활성) -->
<div class="form-field">...</div>

<!-- 서브 토글 + 그 종속 필드 묶음 -->
<div class="modal__sub-group">
  <div class="modal__setting-row">
    <span>세부 옵션 제한하기</span>
    <label class="toggle">...</label>
  </div>
  <!-- 서브 토글 종속 필드 -->
  <div class="form-field">...</div>
</div>
```

### 대제목 모달 제약

- 좌측 탭 내비게이션은 `tab-group--vertical` (tab.md) 을 사용한다.
- 탭 패널은 `modal__content` 안에 `div[role="tabpanel"]`로 배치. `.tab-panel` 클래스 사용 금지 (padding 중복).
- 각 섹션 내에서 액션을 처리하므로 `modal__footer`를 두지 않는다.
- `modal__content` 안 패널 액션 바의 툴팁은 반드시 `tooltip-panel--bottom`을 사용한다. `modal__content`가 `overflow-y:auto` 스크롤 컨테이너이므로 `--top` 방향은 상단 overflow 경계에서 잘린다.
- 중첩 모달(소제목 모달)은 `modal-overlay` 위에 다시 `modal-overlay`를 쌓아 `z-index: calc(var(--z-modal) + var(--z-above))`로 표시한다.

### 소제목 모달 제약

- `modal__aside`는 읽기 전용 컨텍스트 정보(이름·소속·날짜 등)만 표시한다. 인터랙티브 컨트롤은 `modal__content` 안에 둔다.
- `modal__detail`은 우측에 배치되는 설정·액션 패널이다. 인터랙티브 컨트롤을 포함할 수 있다. `modal__body` 안에서 `modal__content` 다음에 위치시킨다. `modal__aside`와 `modal__detail`을 동시에 사용하면 양쪽 패널이 모두 표시된다.
- `modal__footer` 버튼 순서: 보조 액션(저장 안 함·취소) → 주요 액션(저장하기·확인). 주요 액션이 항상 오른쪽 끝.
- 모달 너비는 콘텐츠에 따라 인라인 `style="width:Npx"` 또는 페이지 전용 클래스로 지정한다.

### 첨부·조회 사이드 + 폼 2열 본문 레이아웃

소제목 모달에서 좌측에 첨부파일(FileUpload)이나 조회 정보를 두고 우측에 입력 폼을 배치하는 본문 패턴. 신고 계열 모달(취득·상실·보수변경·정정 등)에서 사용한다. `modal__content` 안에 좌 사이드(고정 폭, 예: 314px) + 우 폼(`1fr`)의 2열 그리드를 둔다.

- **내용이 적으면 모달이 내용만큼만 줄어들고, 많으면 보이는 영역까지만** 노출된다. 그리드에 `align-items: stretch`를 주면 두 열 높이가 맞춰지고, 사이드에 `max-height`로 보이는 영역 상한을 둔다.
  - **권장(견고)**: 사이드 `max-height`를 JS로 **실측**해 설정한다 — `modal__content`는 flex로 크기가 정해지고 내부에서 스크롤되므로 `clientHeight − 세로패딩`이 곧 '보이는 영역'이다. `ResizeObserver`로 `modal__content`를 관찰해 크기가 바뀔 때마다 갱신하면(밴드 접기·펼치기, 리사이즈, 시나리오 전환 포함) 어떤 상태에서도 정확히 꽉 찬다. `content`는 자식 높이에 영향받지 않아 피드백 루프가 없다.
  - **간이(CSS만)**: `max-height: calc(90vh - <모달 크롬 높이>)`. `<모달 크롬 높이>` = 헤더+푸터+`modal__content` 패딩 합(소제목 모달 ≈ 172px). ⚠️ **헤더 고정 안내 밴드처럼 높이가 가변인 요소가 있으면 이 매직넘버는 어떤 상태에선 넘쳐 잘리고 어떤 상태에선 짧아져 빈다** — 이 경우 위의 JS 실측을 쓴다.
- **좌측 사이드는 `position: sticky; top: 0`으로 화면에 고정**한다. 모달 전체는 평소처럼 `modal__content`가 스크롤되므로(헤더·푸터는 고정) 폼이 길어져도 상단이 본문 중간에서 잘리지 않는다.
- 사이드가 넘칠 땐 사이드에 `overflow: hidden` + `min-height: 0`을 주고 **내부 리스트만 스크롤**한다(예: `.file-upload__grid { overflow-y: auto }`). 이렇게 해야 긴 리스트가 행 높이를 밀어 모달을 무한정 키우지 않는다.
- `modal__content` 자체를 `overflow: hidden`으로 바꿔 좌우 열을 독립 스크롤 컨테이너로 만들지 않는다 — 폼이 자기 박스 안에서 스크롤되며 **상단이 잘려 보이고**, 우측 폼의 Dropdown·DatePicker 팝오버가 폼 경계에서 잘린다. 사이드만 sticky로 고정하고 모달 전체 스크롤을 유지한다.

### 모달 내 배너 사용

모달 안에서 Banner(안내·제약·경고)를 쓸 때는 **안내의 성격**에 따라 세 가지 위치 중 하나를 고른다. 성격과 위치를 섞지 않는다.

| 성격 | 위치 | 스크롤 동작 | 예 |
|---|---|---|---|
| **전반 안내·제약** — 신고 전체에 적용되고 입력 중에도 계속 보여야 함 | **헤더 아래 고정 밴드** (`modal__body` 직속, `modal__content` 앞) | 헤더처럼 고정, 본문만 스크롤 | 보수변경 "자진신고 사업장 제약 / 국민연금 변경신고 자격" |
| **전반 안내** — 신고 전체에 적용되나 스크롤되어 사라져도 무방 | **본문 최상단 인라인** (`modal__content` 안, 그리드 앞) | 본문과 함께 스크롤 | 취득 "피부양자 취득신고 미지원" |
| **조건부·맥락 안내** — 특정 입력의 상태에 종속 | **폼 내부 인라인** (관련 필드 근처) | 본문과 함께 스크롤, 상태에 따라 토글 | 상실 "일부 상실 / 전체 퇴사" (상실 보험 선택에 종속) |

**고정 밴드(1행) 구현**
- 래퍼(`.acq-intro-banners`)를 `modal__content` **앞**, `modal__body`의 직속 자식으로 둔다. 이 한 경우만 위의 "modal__content 직속 자식" 규칙의 예외다.
- `modal__body:has(> .acq-intro-banners) { flex-direction: column }`로 body를 세로 배치하고, 밴드에 `flex-shrink: 0`을 줘 눌리지 않게 한다.
- 밴드 좌우 패딩은 `modal__content`와 같은 인셋(예: `var(--space-inset-3xl)`), **상하 패딩은 0**으로 둔다 — 타이틀과의 간격은 헤더 `padding-bottom`(≈16px), 본문과의 간격은 `modal__content` `padding-top`(≈16px)이 담당하므로 균형이 맞는다.
- 밴드가 본문 세로 공간을 차지하고 그 높이가 가변(디스클로저 접기·펼치기, 텍스트 줄바꿈)이므로, 2열 사이드 높이는 **JS 실측**으로 맞춘다(→ "첨부·조회 사이드 + 폼 2열 본문 레이아웃"의 권장 방식). `calc(90vh - N)` 매직넘버는 밴드가 있는 모달에선 상태에 따라 잘리거나 비므로 권장하지 않는다.

**스택(복수 배너)**
- 성격이 **서로 다른 독립 안내**(예: 제약 + 자격 조건)는 밴드 안에 세로로 쌓을 수 있다. 조건 목록이 길면 두 번째 배너 안에 Disclosure(`disclosure--icon-only`)를 넣어 접는다.
- 단 **같은 대상**에 대한 중복 메시지나 심각도가 다른 메시지는 쌓지 말고 하나로 합친다(banner.md 원칙). 조건부 배너(폼 내부)는 상태에 따라 **한 번에 하나만** 보이게 토글한다.

**톤**
- 단순 안내·자격 조건은 기본(info). "할 수 없음"·되돌릴 수 없는 처리 등 **주의가 필요한 제약**은 `banner--caution` + 경고 아이콘(`#icon-triangle-alert`)을 고려한다(예: 상실 "전체 퇴사 처리").

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
  padding: var(--space-inset-2xl) var(--space-inset-3xl);
  flex-shrink: 0;
}

.modal--lg .modal__header {
  padding: var(--space-inset-2xl);
}

/* ── Title — font은 text-modal-title-sm / text-modal-title 유틸 클래스로 처리 ── */
.modal__title {
  margin: 0;
  color: var(--color-text-body);
}

/* ── Header 설명문 (선택) — 모달 전체에 대한 보조 설명을 제목 아래에 묶는다 (alert 헤더 패턴).
   modal__header-text가 있으면 제목+설명이 세로로 쌓이므로, 닫기 버튼이 상단에 오도록
   헤더 교차축을 flex-start로 전환한다. font은 text-description 유틸로 처리. ── */
.modal__header:has(.modal__header-text) {
  align-items: flex-start;
  gap: var(--space-gap-lg);
}
.modal__header-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);   /* 제목 ↔ 설명 간격 */
  min-width: 0;                 /* flex 자식 텍스트 말줄임/줄바꿈 보장 */
}
.modal__description {
  margin: 0;
  color: var(--color-text-subtle);
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
  flex-shrink: 0;
  overflow-y: auto;
  margin: var(--space-inset-xl);
  padding: var(--space-inset-xl);
  background: var(--color-surface-subtle);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text-body);
  line-height: var(--line-height-base);
}

/* ── Detail Panel (우측 설정·액션 패널) ── */
.modal__detail {
  flex-shrink: 0;
  width: 280px;
  overflow-y: auto;
  margin: var(--space-inset-xl);   /* modal__body 내부 여백으로 floating 카드 형태 */
  padding: var(--space-inset-xl);
  background: var(--color-surface-subtle);
  border-radius: var(--radius-lg);
}

/* ── Content ── */
.modal__content {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: var(--space-inset-3xl);
}
/* 소제목 모달: 헤더와 본문(데이터) 사이 여백을 한 단계 축소 — content 상단 패딩만
   inset-3xl(24) → inset-2xl(16). 대제목(modal--lg)은 탭 패널 레이아웃이라 제외한다. */
.modal:not(.modal--lg) .modal__content {
  padding-top: var(--space-inset-2xl);
}

/* ── Footer ── */
.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-gap-sm);
  padding: var(--space-inset-2xl) var(--space-inset-3xl);
  flex-shrink: 0;
}

/* ── 소제목 모달 컨텐츠 레이아웃 패턴 ── */
/* form-field-group 중간에 끼는 래퍼 — 자식 간 gap을 동일하게 유지 */
.modal__sub-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-md);
}
/* 좌측 레이블 + 우측 toggle 한 행 배치 */
.modal__setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/* 두 필드를 동등한 너비로 나란히 배치 */
.modal__field-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-gap-md);
}
/* 날짜 범위 — form-field 두 개 + ~ 구분자 */
.modal__date-range {
  display: flex;
  align-items: flex-end;
  gap: var(--space-gap-sm);
}
.modal__date-range .form-field { flex: 1; }
/* 설정 토글 라벨 — form-label(13px regular)보다 semibold로 구분 */
.modal__setting-row span {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-ui);
  letter-spacing: var(--letter-spacing-default);
  font-weight: var(--font-weight-heading); /* semibold — 서브 토글 라벨 */
}
/* 마스터 토글 라벨 — 14px로 서브 토글(13px)보다 한 단계 더 */
.modal__setting-row--master span {
  font-size: var(--font-size-base);
}
/* ~ 구분자: 인풋 높이(height-base)에서 세로 중앙 정렬 */
.modal__date-range__sep {
  flex-shrink: 0;
  height: var(--height-base);
  display: flex;
  align-items: center;
  color: var(--color-text-subtle);
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
| 입력 없는 확인·삭제·경고 다이얼로그는 Alert 사용 | 삭제 확인 등 입력 없는 확인창을 Modal로 구현 (→ `alert.md`) |
| `modal-overlay`로 항상 감싸기 | `modal`을 overlay 없이 직접 DOM에 배치 |
| `.modal`에 `style="width:Npx"` 또는 페이지 전용 클래스로 너비 지정 | 너비 미지정 → flex 오버레이 안에서 전체 너비로 늘어남 |
| `modal__body` 콘텐츠를 `modal__content`로 감싸기 | `p`·`div`·`form-field` 등을 `modal__body`에 직접 배치 |
| 닫기 버튼: `button.icon-on--lg` (icon-button.md 패턴) | `modal__close` 클래스 사용 — 이 시스템에 존재하지 않음 |
| 제목에 `h2.modal__title.text-modal-title-sm` | `p.modal__title` 또는 `div.modal__title` 사용 — 요소 타입 금지 |
| 모달 전체 설명은 `modal__header-text` + `p.modal__description`으로 헤더 제목 아래 배치 | 설명 `<p>`를 `modal__content` 최상단·`modal__body`에 직접 배치 (제목과 떨어져 보임) |
| footer 버튼: `btn btn--primary btn--md` (타이포그래피 포함) | `btn btn--primary btn--md text-button-md` — text-button-* 중복 금지 |
| 제목에 `text-modal-title-sm` / `text-modal-title` 유틸 클래스 | `modal__title`에 인라인 `style="font-size:..."` 직접 지정 |
| 폼 필드 라벨에 `form-field__label text-form-label` | 인라인 `<div style="font-size:">` 로 라벨 대체 |
| 선택 컨트롤에 `dropdown--button` 구조 (dropdown.md) | `<select class="input">` 네이티브 요소 사용 |
| 대제목 모달은 각 섹션 내부에서 액션 처리 | 대제목 모달에 `modal__footer` 추가 |
| footer 버튼: 보조 → 주요 순서 (주요 액션이 오른쪽 끝) | 주요 액션을 왼쪽에 배치 |
| `modal__aside`는 읽기 전용 컨텍스트 정보만 | `modal__aside` 안에 폼 입력 배치 |
| 중첩 모달: `z-index: calc(var(--z-modal) + var(--z-above))` | 중첩 모달에 동일 z-index 사용 |
| 모달 열릴 때 `trapFocus()` 호출, 닫힐 때 원래 포커스 복원 | 모달 열려도 포커스 이동 없음 |
