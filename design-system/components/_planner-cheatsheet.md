---
auto-generated: true
source: components/**/*.md (## 플래너 패턴 섹션)
---

# 플래너 치트시트

> ⚠️ **자동 생성 파일 — 직접 편집하지 말 것.**
> 각 컴포넌트 `.md`의 `## 플래너 패턴` 섹션을 편집하면 다음 빌드 시 반영됩니다.
> 클래스명·구조는 **고정**입니다. `{중괄호}` 안의 내용은 컨텍스트에 맞게 교체하세요.

---

## Atoms

### Button

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<button class="btn btn--primary btn--md">{레이블}</button>
```

변형: `btn--primary` · `btn--secondary` · `btn--danger` · `btn--ghost` · `btn--ghost-inverse` / `btn--solid` (fill 제외) / `btn--xs` · `btn--sm` · `btn--md` · `btn--lg` · `btn--micro` (icon-only 전용) / `btn--icon-left` · `btn--icon-right` · `btn--icon-only`
상태: `btn--disabled` (+ `disabled` + `aria-disabled="true"` + `tabindex="-1"`) · `btn--loading` (+ `tabindex="-1"` + `aria-label="{액션} 중..."`)
JS init: 없음

### ActionGroup

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="action-group" role="toolbar" aria-label="{그룹 목적}">
  <button class="action-btn action-btn--sm text-button-sm">{액션명}</button>
  <button class="action-btn action-btn--sm text-button-sm">{액션명}</button>
</div>
```

변형: `action-btn--xs` · `action-btn--md` / `action-btn--icon-only` · `action-btn--icon-left` · `action-btn--icon-right` / 라벨 있음 → `action-group-labeled` 래퍼 + `action-group-label text-form-label`
상태: `action-btn--disabled` (disabled + aria-disabled="true" + tabindex="-1" 동반)
JS init: 없음

### Icon

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<span class="icon icon--md" aria-hidden="true">
  <svg aria-hidden="true"><use href="icons/sprite.svg#{icon-id}"/></svg>
</span>
```

변형: `icon--badge` · `icon--sm` · `icon--lg` · `icon--xl`
색상 (단색형 전용): `icon--brand` · `icon--dark` · `icon--white` · `icon--disabled`
단독 의미 전달: `role="img"` + `aria-label="{액션명}"` (aria-hidden 제거)
JS init: 없음

### Icon Button

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<button class="icon-on--md" type="button" aria-label="{액션명}">
  <svg aria-hidden="true"><use href="icons/sprite.svg#{icon-id}"/></svg>
</button>
```

변형: `icon-on--badge` · `icon-on--sm` · `icon-on--lg` · `icon-on--xl`
색상: `icon-on--brand` (brand 컨텍스트 임베드 시 추가)
상태: `disabled` 속성 (포커스 유지 필요 시 `aria-disabled="true"` 병행)
JS init: 없음

### Input

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<input class="input" type="text" placeholder="{placeholder}" />
```

변형: `input--sm` · `input--xs` (size) / `input--ghost` (테두리 없음) / `input--readonly` · `input--disabled` · `input--error` · `input--success` · `input--complete` (state)
clearable addon: `div.input-wrap.input-wrap--clearable > input.input + button.input-clear.icon-on--badge`
suffix addon: `div.input-wrap.input-wrap--suffix > input.input + span.input__suffix`
JS init: `initInput(el)` (조건 없는 필드 complete 전환) / 조건부 필드는 별도 blur 핸들러로 `input--error` · `input--success` 전환

### Textarea

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<textarea class="textarea" rows="{rows}" placeholder="{placeholder}"></textarea>
```

변형: `textarea--sm`
상태: `textarea--complete` (blur 시 값 있음) · `textarea--error` + `aria-invalid="true"` (조건 실패) · `textarea--readonly` + `readonly` · `textarea--disabled` + `disabled` + `aria-disabled="true"` + `tabindex="-1"`
JS init: `initTextarea(el)`

### Checkbox

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<label class="checkbox">
  <input type="checkbox" />
  <span class="checkbox__control" aria-hidden="true">
    <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
  </span>
  <span class="checkbox__label">{레이블}</span>
</label>
```

변형: `checkbox--sm` (size)
상태: `checkbox--error` (root) + `aria-invalid="true"` (input) / `checkbox--disabled` (root) + `disabled` + `aria-disabled="true"` + `tabindex="-1"` (input)
indeterminate: JS `input.indeterminate = true` 전용 (HTML 속성 불가)
그룹: `fieldset.checkbox-group` (세로형 기본) · `checkbox-group--horizontal` (가로형)
JS init: 없음 (indeterminate·error 전환은 별도 이벤트 핸들러로 처리)

### Radio

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<fieldset class="radio-group">
  <legend>{그룹 레이블}</legend>
  <label class="radio">
    <input type="radio" name="{group-name}" checked />
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">{옵션}</span>
  </label>
  <label class="radio">
    <input type="radio" name="{group-name}" />
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">{옵션}</span>
  </label>
</fieldset>
```

변형: `radio--sm` (size) / `radio-group--horizontal` (가로형 그룹)
상태: `radio--disabled` (root) + `disabled` + `aria-disabled="true"` + `tabindex="-1"` (input)
JS init: 없음

### Toggle

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<label class="toggle">
  <input type="checkbox" role="switch" />
  <span class="toggle__track"><span class="toggle__thumb"></span></span>
  <span class="toggle__label">{레이블}</span>
</label>
```

변형: `toggle--sm` (size)
상태: `toggle--disabled` (root) + `disabled` + `aria-disabled="true"` + `tabindex="-1"` (input)
레이블 없을 때: `toggle__label` 생략 + input에 `aria-label="{설명}"` 필수
JS init: 없음

### Badge

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<span class="badge badge--{style}">{label}</span>
```

변형: `badge--fill` · `badge--line` · `badge--pill` · `badge--md` · `badge--pulse`
JS init: 없음

### Tag

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<button class="tag" aria-pressed="false">{label}</button>
```

변형: `tag--pill` · `tag--md` · `tag--selected` · `tag--disabled`
removable 패턴:
```html
<span class="tag tag--removable">
  {label}
  <button class="icon-on--badge icon-on--brand" aria-label="{label} 제거">
    <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
  </button>
</span>
```
JS init: `initTag(container)`

### Segment

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="segment" role="radiogroup" aria-label="{그룹명}">
  <span class="segment__slider" aria-hidden="true"></span>
  <button class="segment__item segment__item--selected" role="radio" aria-checked="true">{옵션 1}</button>
  <button class="segment__item" role="radio" aria-checked="false">{옵션 2}</button>
</div>
```

변형: `segment--md` · `segment--lg`
상태: `segment--disabled` (각 아이템에 disabled + aria-disabled="true" + tabindex="-1" 동반, 컨테이너에 aria-disabled="true")
JS init: `initSegment(el)`

### Spinner

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="spinner" role="status" aria-live="polite">
  <span aria-hidden="true"></span>
  <span class="sr-only">{불러오는 중...}</span>
</div>
```

변형: `spinner--sm` · `spinner--lg` · `spinner--inverse`
JS init: 없음

### Skeleton

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="skeleton" style="width: {100%}; height: {160px};" aria-hidden="true"></div>
```

변형: `skeleton--text` · `skeleton--circle`
JS init: 없음

### Tooltip

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<span class="tooltip-wrapper">
  <button class="tooltip-trigger" aria-label="{버튼 레이블}" aria-describedby="{tip-id}">
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#{icon-name}"/></svg></span>
  </button>
  <div class="tooltip-panel elevation-tooltip tooltip-panel--top" id="{tip-id}" role="tooltip">{툴팁 텍스트}</div>
</span>
```

변형: `tooltip-panel--bottom` · `tooltip-panel--left` · `tooltip-panel--right` / pinned → `tooltip-panel--pinned tooltip-panel--visible` + 내부에 `span.tooltip-panel-text` + `button.tooltip-dismiss`
상태: `tooltip-panel--visible` (JS로 hover/focus 시 추가)
JS init: `initTooltip(el)` (pinned 타입에만 필요, default 타입은 mouseenter/focus 이벤트 직접 바인딩)

### Divider

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<hr class="divider" />
```

변형: `divider--vertical` · `divider--labeled`
JS init: 없음

### Link

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<a class="link" href="{url}">{링크 텍스트}</a>
```

변형: `link--disabled`
상태: disabled — `aria-disabled="true"` + `tabindex="-1"` 추가, `href` 생략
JS init: 없음

### Disclosure

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<span class="disclosure" id="{disc-id}">
  <button class="disclosure__trigger" type="button" aria-expanded="false" aria-controls="{body-id}">
    <span class="disclosure__label">더 보기</span><span class="icon-on--sm disclosure__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
  </button>
  <span class="disclosure__body" id="{body-id}">{보조 설명 텍스트}</span>
</span>
```

변형: `disclosure--label-only` · `disclosure--icon-only`
상태: `disclosure--expanded` (JS 토글, aria-expanded="true" 동반)
JS init: `initDisclosure(el)`

### Progress

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="progress"
  role="progressbar"
  aria-valuenow="{50}"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="{파일 업로드 진행률}"
>
  <div class="progress__track">
    <div class="progress__fill" style="width: {50}%"></div>
  </div>
  <span class="progress__label text-helper">{50}%</span>
</div>
```

변형: `progress--indeterminate`
상태: indeterminate — `aria-valuenow` 생략, `aria-busy="true"` 추가, `progress__label` 생략
JS init: `setProgress(el, value)` — `aria-valuenow` · `fill` width · `label` 텍스트 동기화

### Calendar

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="cal">
  <div class="cal__grid" role="grid" aria-label="{YYYY}년 {M}월">
    <div class="cal__weekdays" role="row">
      <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span>
      <span class="cal__weekday" role="columnheader" aria-label="월요일">월</span>
      <span class="cal__weekday" role="columnheader" aria-label="화요일">화</span>
      <span class="cal__weekday" role="columnheader" aria-label="수요일">수</span>
      <span class="cal__weekday" role="columnheader" aria-label="목요일">목</span>
      <span class="cal__weekday" role="columnheader" aria-label="금요일">금</span>
      <span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
    </div>
    <div class="cal__week" role="row">
      <button class="cal__day" role="gridcell" aria-label="{YYYY}년 {M}월 {D}일" tabindex="-1">{D}</button>
      <!-- … 7개 × N주 반복 -->
    </div>
  </div>
</div>
```

변형: range 모드 → `cal--range` (그리드에 aria-multiselectable="true")
상태: `cal__day--today` · `cal__day--selected` · `cal__day--outside` · `cal__day--disabled` · `cal__day--marked` · `cal__day--range-start` · `cal__day--range-end` · `cal__day--in-range`
JS init: `initCalendar(el)`

---

## Molecules

### DatePicker

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="dp" id="{id}">
  <div class="dp__trigger" aria-haspopup="dialog" aria-label="{날짜 선택 목적}">
    <div class="dp__value-group">
      <input class="dp__value-part dp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="연도" autocomplete="off">
      <span class="dp__value-sep" aria-hidden="true">.</span>
      <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="월" autocomplete="off">
      <span class="dp__value-sep" aria-hidden="true">.</span>
      <input class="dp__value-part dp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="일" autocomplete="off">
    </div>
    <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
  </div>
  <div class="form-field__footer"><p class="form-field__error text-helper" role="alert"></p></div>
  <div class="dp__panel" role="dialog" aria-label="{날짜 선택 목적}" hidden>
    <div class="dp__header">
      <button class="dp__nav-btn" type="button" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>
      <div class="dp__select-group" aria-live="polite" aria-atomic="true">
        <input class="dp__select-input" type="number" min="1990" aria-label="연도">
        <span class="dp__select-label">년</span>
        <input class="dp__select-input dp__select-input--month" type="number" min="1" max="12" aria-label="월">
        <span class="dp__select-label">월</span>
        <button class="btn btn--secondary btn--solid btn--sm" type="button">오늘</button>
      </div>
      <button class="dp__nav-btn" type="button" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
    </div>
    <!-- calendar grid: calendar.md 패턴 참조 -->
  </div>
</div>
```

변형: `dp--has-value` (값 선택 완료 시 루트에 추가)
상태: 트리거 `aria-invalid="true"` (에러) · `dp--disabled`
JS init: `initDatePicker(el)`

### Pagination

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<nav class="pagination" aria-label="페이지 탐색">
  <button class="pagination__arrow" type="button" aria-label="이전 페이지">
    <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)">
      <use href="icons/sprite.svg#icon-chevron-left"/>
    </svg>
  </button>
  <button class="pagination__page pagination__page--current"
          type="button" aria-current="page">{현재 페이지}</button>
  <button class="pagination__page" type="button">{페이지 번호}</button>
  <span class="pagination__ellipsis" aria-hidden="true">…</span>
  <button class="pagination__page" type="button">{마지막 페이지}</button>
  <button class="pagination__arrow" type="button" aria-label="다음 페이지">
    <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)">
      <use href="icons/sprite.svg#icon-chevron-right"/>
    </svg>
  </button>
</nav>
```

변형: `pagination--sm` (소형) · `pagination--simple` (이전/다음 + 텍스트만 — `span.pagination__simple-text` 사용)
상태: 첫 페이지에서 이전 `pagination__arrow`에 `disabled` / 마지막 페이지에서 다음에 `disabled`
JS init: `initPagination(container)`

### FormField

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="form-field">
  <label class="form-field__label text-form-label" for="{input-id}">{레이블} <span class="form-field__required" aria-hidden="true">(필수)</span></label>
  <input class="input input--sm" type="text" id="{input-id}" placeholder="{안내문}" aria-required="true" aria-describedby="{footer-id}" />
  <div class="form-field__footer" id="{footer-id}">
    <p class="form-field__help text-helper">{부수 안내}</p>
    <p class="form-field__error text-helper" id="{error-id}" role="alert">{에러 메시지}</p>
  </div>
</div>
```

변형: `form-field--horizontal` (가로형, control+footer를 `form-field__body`로 묶음) / 그룹 → `form-field-group` (세로) · `form-field-group--horizontal` (가로 자동 정렬)
상태: `form-field--error` (control에 에러 클래스 + aria-invalid="true" + aria-describedby를 error-id로 교체 동반) · `form-field--disabled`
JS init: 없음 (유효성 검사·카운트는 소비 측 JS가 직접 제어)

### Dropdown

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="dropdown dropdown--button dropdown--sm">
  <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="{선택 목적}">
    <span class="dropdown__value dropdown__value--placeholder">{플레이스홀더}</span>
    <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
  </button>
  <div class="dropdown__panel">
    <ul class="dropdown__list" role="listbox" aria-label="{선택 목적}">
      <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">{옵션명}</span></li>
    </ul>
  </div>
</div>
```

변형: `dropdown--pill` · `dropdown--ghost` · `dropdown--multi` (트리거에 `span.dropdown__count` 추가, listbox에 aria-multiselectable="true") · `dropdown--menu` (옵션에서 dropdown__option-checkbox 제거)
상태: `dropdown--open` · `dropdown--error` · `dropdown--disabled`
JS init: `initDropdown(el)`

### Combobox

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="combobox" id="{id}">
  <div class="combobox__trigger">
    <input class="combobox__input" type="text"
      role="combobox" aria-haspopup="listbox" aria-expanded="false"
      aria-autocomplete="list" aria-controls="{listbox-id}"
      id="{input-id}" placeholder="{플레이스홀더}" autocomplete="off">
    <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화" hidden>
      <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
    </button>
    <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
  </div>
  <div class="combobox__panel">
    <ul class="combobox__list" role="listbox" id="{listbox-id}" aria-label="{선택 목적}">
      <li class="combobox__option" role="option" aria-selected="false" tabindex="-1">
        <span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
        <span class="combobox__option-label">{옵션명}</span>
      </li>
    </ul>
    <div class="combobox__empty" aria-live="polite" hidden>검색 결과가 없어요.</div>
  </div>
</div>
```

변형: `combobox--multi` (트리거를 `div.combobox__trigger[tabindex="0"]`로, `span.combobox__tags` 삽입, listbox에 `aria-multiselectable="true"`)
상태: `combobox--open` · `combobox--error` · `combobox--disabled`
JS init: `initCombobox(el)`

### Tab

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="tab-group" role="tablist" aria-label="{그룹 레이블}">
  <span class="tab-group__slider" aria-hidden="true"></span>
  <button class="tab tab--selected" role="tab"
          aria-selected="true" id="{tab-id-1}" aria-controls="{panel-id-1}" tabindex="0">
    <span class="tab__label">{탭 레이블}</span>
  </button>
  <button class="tab" role="tab"
          aria-selected="false" id="{tab-id-2}" aria-controls="{panel-id-2}" tabindex="-1">
    <span class="tab__label">{탭 레이블}</span>
  </button>
</div>
<div class="tab-panel" id="{panel-id-1}" role="tabpanel" aria-labelledby="{tab-id-1}">{콘텐츠}</div>
<div class="tab-panel" id="{panel-id-2}" role="tabpanel" aria-labelledby="{tab-id-2}" hidden>{콘텐츠}</div>
```

변형: `tab-group--vertical` + `aria-orientation="vertical"` (세로 탭)
badge: `tab__label` 뒤에 `span.badge.badge--brand.badge--pill.badge--line[aria-hidden="true"]` 추가
overflow: `div.tab-scroller > button.tab-scroller__btn--prev + div.tab-scroller__track > div.tab-group + button.tab-scroller__btn--next`
액션 버튼: `div.tab-header > div.tab-group + div.tab-header__actions`
상태: `tab--disabled` + `disabled` + `aria-disabled="true"` + `tabindex="-1"`
JS init: `initTab(container)`

### Accordion

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="accordion__item">
  <div class="accordion__header-row">
    <button class="accordion__header" type="button"
            aria-expanded="false" aria-controls="{body-id}" id="{header-id}">
      <span class="accordion__toggle" aria-hidden="true">
        <span class="icon icon--sm accordion__icon--collapsed">
          <svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg>
        </span>
        <span class="icon icon--sm accordion__icon--expanded">
          <svg aria-hidden="true"><use href="icons/sprite.svg#icon-collapse"/></svg>
        </span>
      </span>
      <span class="accordion__title">{섹션 제목}</span>
    </button>
  </div>
  <div class="accordion__body" id="{body-id}" role="region" aria-labelledby="{header-id}">
    <div class="accordion__content">{콘텐츠}</div>
  </div>
</div>
```

변형: `accordion__item--expanded` (펼친 상태 — JS 토글)
카운트: `accordion__header` 안에 `span.badge.badge--brand.badge--pill.badge--line[aria-label="{N}건"]` 추가
액션: `accordion__header-row` 안에 `div.accordion__actions` 형제로 배치
그룹 사용 시: `div.accordion`으로 여러 `accordion__item` 감싸기
JS init: `initAccordion(container)`

### Toast

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<!-- 스택 컨테이너 (전역 1회, body 직속) -->
<div class="toast-stack" aria-live="polite" aria-atomic="false"></div>

<!-- 개별 토스트 (JS로 prepend) -->
<div class="toast toast--visible">
  <span class="icon--md toast__icon" aria-hidden="true">
    <svg aria-hidden="true"><use href="icons/sprite.svg#icon-info"/></svg>
  </span>
  <div class="text-description toast__body">
    <p class="toast__message">{메시지}</p>
  </div>
  <button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기">
    <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
  </button>
</div>
```

변형: `toast--success` · `toast--caution` · `toast--error` (error에는 `role="alert"` 추가)
아이콘: info → `icon-info` · success → `icon-circle-check` · caution → `icon-triangle-alert` · error → `icon-circle-x`
title 슬롯: `p.toast__title` (body 안, message 앞)
action 슬롯: `div.toast__action > a.link.toast__action-link`
상태: `toast--visible` (진입 animation) · `toast--hidden` (퇴장 animation → animationend 후 DOM 제거)
JS init: `initToast(container)` (또는 직접 `makeToast()` / `dismissToast()` 호출)

### Alert

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="alert-overlay" role="presentation">
  <div class="alert" role="alertdialog" aria-modal="true"
       aria-labelledby="{title-id}" aria-describedby="{body-id}">
    <div class="alert__header">
      <p class="text-card-title alert__title" id="{title-id}">{제목}</p>
      <button class="icon-on--sm alert__close" type="button" aria-label="닫기">
        <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
      </button>
    </div>
    <div class="alert__body" id="{body-id}">
      <p class="text-description alert__description">{본문 설명}</p>
    </div>
    <div class="alert__footer">
      <button class="btn btn--ghost btn--md" type="button">{취소 레이블}</button>
      <button class="btn btn--secondary btn--md" type="button">{확인 레이블}</button>
    </div>
  </div>
</div>
```

변형: `alert--danger` (되돌릴 수 없는 삭제·해제 — CTA는 `btn--danger`)
body 슬롯: `alert__description` · `alert__list` · `alert__change` · `alert__option` (조합 가능)
JS init: `initAlert(container)`

### FileUpload

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="file-upload" id="{id}">
  <div class="file-upload__header">
    <span class="text-form-label file-upload__label">{레이블}</span>
    <span class="text-form-label file-upload__usage" id="{usage-id}">{0MB} / {2MB}</span>
  </div>
  <div class="file-upload__meta">
    <p class="text-body file-upload__description">{안내 문구}</p>
    <p class="text-body file-upload__constraint">*파일당 {10}MB 이하 업로드 가능</p>
  </div>
  <div class="file-upload__dropzone" id="{dropzone-id}">
    <input type="file" hidden accept="{image/*}" multiple>
    <button class="btn btn--secondary btn--sm btn--icon-left" type="button">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span>추가하기
    </button>
    <div class="file-upload__grid" id="{grid-id}"></div>
  </div>
</div>
```

파일 카드 구조(JS 생성): `div.file-upload-item` > `p.text-form-label.file-upload-item__name` + `div.file-upload-item__preview` > `img.file-upload-item__thumb[alt=""]` + `div.file-upload-item__overlay[aria-hidden]` + `div.file-upload-item__actions` > `btn[aria-label="다운로드"]` + `btn[aria-label="삭제"]`
상태: `file-upload--drag-over` · `file-upload--capacity-full` (추가하기 버튼에 `disabled` 추가)
JS init: `initFileUpload(el)`

### ImagePreview

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="image-preview" id="{id}" role="dialog" aria-modal="true" aria-label="이미지 미리보기">
  <div class="image-preview__scrim" aria-hidden="true"></div>
  <div class="image-preview__topbar">
    <span class="text-body image-preview__filename">{파일명}</span>
    <div class="image-preview__topbar-actions">
      <button class="btn btn--secondary btn--sm btn--icon-left" type="button">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></span>다운로드
      </button>
      <button class="btn btn--secondary btn--sm btn--icon-left" type="button">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span>삭제
      </button>
      <button class="btn btn--ghost-inverse btn--sm btn--icon-only" type="button" aria-label="닫기">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
      </button>
    </div>
  </div>
  <div class="image-preview__card">
    <div class="image-preview__body">
      <img class="image-preview__img" src="{이미지 URL}" alt="확대 이미지">
    </div>
  </div>
  <div class="image-preview__toolbar">
    <button class="btn btn--ghost-inverse btn--sm btn--icon-only" type="button" aria-label="축소"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg></span></button>
    <span class="text-body image-preview__zoom-label">100%</span>
    <button class="btn btn--ghost-inverse btn--sm btn--icon-only" type="button" aria-label="확대"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
  </div>
</div>
```

변형: `image-preview--visible` (열린 상태)
JS init: `initImagePreview(el)` — `openImagePreview(el, { src, filename })` / `closeImagePreview(el)` 으로 열고 닫음

### Breadcrumb

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<nav class="breadcrumb" aria-label="경로">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item">
      <a class="breadcrumb__link text-breadcrumb" href="{url}">{경로명}</a>
      <span class="breadcrumb__sep" aria-hidden="true">
        <svg aria-hidden="true" style="width:14px;height:14px">
          <use href="icons/sprite.svg#icon-chevron-right"/>
        </svg>
      </span>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__current text-breadcrumb" aria-current="page">{현재 페이지}</span>
    </li>
  </ol>
</nav>
```

변형: 없음 (Variant 없는 컴포넌트)
중간 항목 축약 시: `button.breadcrumb__ellipsis[aria-label="숨겨진 경로 보기"][aria-expanded="false"]` + 숨길 항목에 `breadcrumb__item--hidden`
JS init: `initBreadcrumb(container)` (축약 버튼 사용 시)

### Steps

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<ol class="steps" aria-label="진행 단계">
  <li class="steps__item steps__item--complete">
    <div class="steps__node">
      <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)">
        <use href="icons/sprite.svg#icon-check"/>
      </svg>
    </div>
    <span class="steps__label text-form-label">{완료 단계 레이블}</span>
  </li>
  <li class="steps__item steps__item--current" aria-current="step">
    <div class="steps__node"><span aria-hidden="true">{현재 번호}</span></div>
    <span class="steps__label text-form-label">{현재 단계 레이블}</span>
  </li>
  <li class="steps__item">
    <div class="steps__node"><span aria-hidden="true">{미완료 번호}</span></div>
    <span class="steps__label text-form-label">{미완료 단계 레이블}</span>
  </li>
</ol>
```

변형: `steps--vertical` (세로형 — `ol.steps.steps--vertical`)
단계 상태: `steps__item--complete` (완료, 체크 아이콘) · `steps__item--current` + `aria-current="step"` (현재) · 클래스 없음 (미완료)
JS init: `initSteps(container)`

### Table Cell

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<!-- 일반 헤더 셀 -->
<th class="table__head-cell" scope="col">{컬럼명}</th>

<!-- 정렬 가능 헤더 셀 -->
<th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none">
  <button class="table__sort-btn" aria-label="{컬럼명} 정렬">{컬럼명}
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span>
  </button>
</th>

<!-- 체크 헤더 셀 -->
<th class="table__cell table__cell--check" scope="col">
  <label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label>
</th>

<!-- 텍스트 데이터 셀 -->
<td class="table__cell">{텍스트}</td>

<!-- 숫자 데이터 셀 (금액·수량) -->
<td class="table__cell table__cell--number">{금액}</td>

<!-- 날짜·코드 등 고정 너비 셀 -->
<td class="table__cell table__cell--fit">{날짜}</td>

<!-- 체크 데이터 셀 -->
<td class="table__cell table__cell--check">
  <label class="checkbox checkbox--sm"><input type="checkbox" aria-label="{행 식별값} 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label>
</td>
```

헤더 정렬 상태: `table__head-cell--sort-asc` · `table__head-cell--sort-desc` + `aria-sort="ascending|descending"`
편집 셀: `td.table__cell--edit` > `div.input-wrap` > `input.input.input--sm`
뱃지·버튼: `td.table__cell` 안에 직접 삽입
JS init: 없음 (정렬 버튼 click → aria-sort 동기화는 직접 구현)

### DateRangePicker

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="drp" id="{id}" data-placeholder="{기간 선택}" data-max-date="today">
  <button class="drp__trigger" aria-haspopup="dialog" aria-expanded="false" aria-label="{기간 선택 목적}">
    <span class="drp__trigger-label">{기간 선택}</span>
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
  </button>
  <div class="drp__panel" role="dialog" aria-label="{기간 선택 목적}" aria-modal="true" hidden>
    <div class="drp__inputs">
      <button class="drp__nav-btn" type="button" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>
      <div class="drp__date-group">
        <input class="drp__value-part drp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="시작 연도" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="시작 월" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="시작 일" autocomplete="off">
      </div>
      <span class="drp__input-sep" aria-hidden="true">~</span>
      <div class="drp__date-group">
        <input class="drp__value-part drp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="종료 연도" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="종료 월" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="종료 일" autocomplete="off">
      </div>
      <button class="drp__nav-btn" type="button" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
    </div>
    <div class="drp__body">
      <ul class="drp__shortcuts" role="listbox" aria-label="기간 단축 선택">
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="0" data-shortcut="all">전체</li>
      </ul>
      <!-- calendar grids: calendar.md 패턴 참조 -->
    </div>
    <div class="drp__footer">
      <button class="btn btn--ghost btn--sm" type="button">초기화</button>
      <button class="btn btn--primary btn--solid btn--sm" type="button">확인</button>
    </div>
  </div>
</div>
```

변형: `drp__trigger--ghost` (FilterBar 내 배치 시 트리거에 적용)
상태: `drp--has-value` (시작·종료 모두 확정 시 루트에 추가)
JS init: `initDateRangePicker(el)`

---

## Organisms

### Form

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<form class="form" novalidate>
  <div class="form-section">
    <h3 class="form-section__title">{섹션 제목}</h3>
    <div class="form-section__body">
      <div class="form-row">
        <div class="form-field form-field--half">
          <label class="form-field__label" for="{id}">{레이블}</label>
          <div class="input-wrap"><input class="input" id="{id}" type="{text}" placeholder="{입력}"></div>
        </div>
        <div class="form-field form-field--half">
          <label class="form-field__label" for="{id2}">{레이블}</label>
          <div class="input-wrap"><input class="input" id="{id2}" type="{text}" placeholder="{입력}"></div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-field">
          <label class="form-field__label" for="{id3}">{레이블}</label>
          <div class="input-wrap"><input class="input" id="{id3}" type="{text}" placeholder="{입력}"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="form__footer">
    <button class="btn btn--secondary btn--solid btn--md" type="button">{취소 레이블}</button>
    <button class="btn btn--primary btn--solid btn--md" type="submit">{저장 레이블}</button>
  </div>
</form>
```

필드 너비: `form-field--half` · `form-field--auto` (나머지 채우기) · 기본(full)
섹션 헤더 옵션: `div.form-section__header` > `h3.form-section__title` + 우측 컨트롤(Toggle 등)
조건부 섹션 숨김: `form-section--hidden` + 내부 input에 `disabled` 추가
JS init: 없음 (유효성 검사는 직접 구현)

### Table

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="table-container">
  <div class="table__toolbar">
    <div class="table__title" id="{title-id}">{테이블 제목}</div>
    <div class="table__toolbar-actions">
      <!-- icon-on--lg 버튼 등 -->
    </div>
  </div>
  <table class="table table--dense" aria-labelledby="{title-id}">
    <thead class="table__head">
      <tr>
        <th class="table__cell table__cell--check" scope="col">
          <label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label>
        </th>
        <th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none">
          <button class="table__sort-btn" aria-label="{컬럼명} 정렬">{컬럼명}<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span></button>
        </th>
        <th class="table__head-cell" scope="col">{컬럼명}</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr class="table__row">
        <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="{행 식별값} 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
        <td class="table__cell">{텍스트}</td>
        <td class="table__cell">{텍스트}</td>
      </tr>
    </tbody>
  </table>
</div>
```

크기: `table--dense` · `table--compact` · (base) · `table--spacious` — `<table>` 루트에만 적용
Toolbar 없이 단독 사용 시: `<table aria-label="{용도}">`
빈 상태: `tbody` 내 `tr > td[colspan="N"]` > `div.empty-state.empty-state--compact`
JS init: 없음 (정렬·선택 이벤트 직접 구현)

### Table — 데이터

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="table-container">
  <div class="table__toolbar">
    <div class="table__title" id="{title-id}">{테이블 제목}</div>
    <div class="table__toolbar-actions"><!-- 액션 버튼 --></div>
  </div>
  <table class="table table--dense" aria-labelledby="{title-id}">
    <thead class="table__head">
      <tr>
        <th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th>
        <th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none"><button class="table__sort-btn" aria-label="{컬럼명} 정렬">{컬럼명}</button></th>
        <th class="table__head-cell table__cell--fit" scope="col">{날짜/코드 컬럼}</th>
        <th class="table__head-cell" scope="col">{컬럼명}</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr class="table__row">
        <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="{행 식별값} 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
        <td class="table__cell">{텍스트}</td>
        <td class="table__cell table__cell--fit">{날짜}</td>
        <td class="table__cell table__cell--number">{금액}</td>
      </tr>
    </tbody>
    <tfoot class="table__foot">
      <tr class="table__row table__row--total">
        <td class="table__cell" colspan="{N}">합계</td>
        <td class="table__cell table__cell--number">{합계 금액}</td>
      </tr>
    </tfoot>
  </table>
</div>
```

행 변형: `table__row--selected` (선택) · `table__row--sub` (서브 행, 대응 행 바로 다음) · `table__row--total` (합계)
편집 셀: `td.table__cell--edit` > `div.input-wrap` > `input.input.input--sm`
펼침 버튼: `button[aria-expanded][aria-controls]` — 접힘 아이콘 `accordion__icon--collapsed` + 펼침 아이콘 `accordion__icon--expanded`
JS init: 없음 (정렬·선택·펼침 이벤트 직접 구현)

### Table — 정보

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="table-container">
  <div class="table__toolbar">
    <div class="table__title" id="{title-id}">{테이블 제목}</div>
  </div>
  <table class="table table--info table--dense" aria-labelledby="{title-id}">
    <thead class="table__head">
      <tr>
        <th class="table__head-cell" scope="col">{항목}</th>
        <th class="table__head-cell" scope="col">{내용}</th>
        <th class="table__head-cell" scope="col">{비고}</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr class="table__row">
        <td class="table__cell">{항목명}</td>
        <td class="table__cell">{내용값}</td>
        <td class="table__cell">{비고}</td>
      </tr>
    </tbody>
  </table>
</div>
```

항상 `table--info table--dense` 함께 사용
행 헤더가 있는 경우: `th.table__head-cell.table__row-header[scope="row"]`
복잡 병합 테이블: 각 헤더 셀에 `id`, 데이터 셀에 `headers="[id목록]"`으로 연결
JS init: 없음

### Modal

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="modal-overlay">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="{title-id}">
    <div class="modal__header">
      <h2 class="modal__title text-modal-title-sm" id="{title-id}">{제목}</h2>
      <button class="icon-on--lg" type="button" aria-label="닫기">
        <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
      </button>
    </div>
    <div class="modal__body">
      <div class="modal__content">
        <!-- 폼 필드 또는 콘텐츠 -->
      </div>
    </div>
    <div class="modal__footer">
      <button class="btn btn--secondary btn--solid btn--md" type="button">{취소 레이블}</button>
      <button class="btn btn--primary btn--solid btn--md" type="submit">{확인 레이블}</button>
    </div>
  </div>
</div>
```

변형: `modal--lg` (대제목 모달 — `modal__title`에 `text-modal-title`, `modal__nav` + `modal__aside` + `modal__content` 3단 구조, `modal__footer` 없음)
삭제·위험 CTA: `btn--danger btn--solid btn--md`
JS init: `trapFocus(modal)` — 열릴 때 호출, 닫힐 때 트리거 요소로 포커스 복원

### EmptyState

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="empty-state">
  <div class="empty-state__icon" aria-hidden="true">
    <svg aria-hidden="true"><use href="icons/sprite.svg#{icon-name}"/></svg>
  </div>
  <div class="empty-state__body">
    <p class="empty-state__title text-body">{상태 제목}</p>
    <p class="empty-state__description text-body">{보조 설명}</p>
  </div>
  <div class="empty-state__actions">
    <button class="btn btn--primary btn--md btn--icon-left" type="button">
      <span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>{액션 레이블}
    </button>
  </div>
</div>
```

변형: `empty-state--compact` (테이블 셀·카드 인라인 — 단일 행 `td[colspan="N"]` 안에 배치)
슬롯 생략 가능: `empty-state__icon` · `empty-state__description` · `empty-state__actions` — `empty-state__title`은 항상 포함
동적 표시 시: 루트에 `role="status" aria-live="polite"` 추가
JS init: 없음

### FilterBar

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="filter-bar" id="{id}">
  <div class="filter-bar__bar" role="toolbar" aria-label="데이터 필터">
    <!-- 드롭다운 필터 (1개 이상 필수) -->
    <div class="dropdown dropdown--button dropdown--ghost dropdown--multi">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="{필터명} 선택">
        <span class="dropdown__value dropdown__value--placeholder">{필터명}</span>
        <span class="dropdown__count" hidden aria-hidden="true"></span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="{필터명}">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">{옵션명}</span></li>
        </ul>
      </div>
    </div>
    <!-- 기간 필터 (선택) -->
    <div class="drp" data-placeholder="{전체기간}" data-max-date="today">
      <button class="drp__trigger drp__trigger--ghost" aria-haspopup="dialog" aria-expanded="false" aria-label="{기간} 선택">
        <span class="drp__trigger-label">{전체기간}</span>
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
      </button>
      <!-- drp panel: date-range-picker.md 패턴 참조 -->
    </div>
    <!-- 검색 인풋 (선택) -->
    <div class="filter-bar__search">
      <div class="input-wrap input-wrap--prefix">
        <span class="input__prefix" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg></span>
        <input class="input" type="search" aria-label="{검색 대상} 검색" placeholder="{검색어 입력}">
      </div>
    </div>
    <!-- 초기화 -->
    <div class="filter-bar__reset-wrap">
      <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="초기화">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-reset"/></svg></span>
      </button>
    </div>
  </div>
</div>
```

구성 규칙: 드롭다운 필터 1개 이상 필수. 날짜·검색은 선택적 추가. 데이터 조작 버튼(추가·삭제)은 FilterBar 밖 ActionGroup으로
JS init: `initFilterBar(el)` — 내부 Dropdown·DRP 자동 초기화

---

