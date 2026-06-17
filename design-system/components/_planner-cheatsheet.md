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
<button class="btn btn--{primary|secondary|ghost|danger} btn--{sm|md|lg}" type="button">{레이블}</button>
```

| 선택 | 클래스 |
|---|---|
| 주요 액션 | `btn--primary` |
| 보조 액션 | `btn--secondary` |
| 최하위·취소 | `btn--ghost` |
| 비가역 삭제 | `btn--danger` |
| 반전 배경 위 | `btn--ghost-inverse` |
| 아이콘 포함 | `btn--icon-left` / `btn--icon-right` + `span.icon.icon--{sm|md}` |
| 아이콘 전용 | `btn--micro btn--icon-only` + `aria-label` 필수 |
| disabled | `btn--disabled` + `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| loading | `btn--loading` + `tabindex="-1"` + `aria-label="{액션} 중..."` |

JS init: 없음

### ActionGroup

```html
<div class="action-group action-group--{start|center|end} action-group--{sm|md|lg}">
  <button class="btn btn--secondary btn--{sm|md|lg}" type="button">취소</button>
  <button class="btn btn--primary btn--{sm|md|lg}" type="button">확인</button>
</div>
```

| 선택 | 클래스 |
|---|---|
| 정렬: 시작 | `action-group--start` |
| 정렬: 가운데 | `action-group--center` |
| 정렬: 끝 | `action-group--end` |
| 크기 동기화 | `action-group--sm` / `--md` / `--lg` (버튼과 동일 크기) |
| 전체 폭 버튼 | `action-group--full` |

JS init: 없음

### Icon

<!-- AI: 아이콘은 반드시 sprite를 통해 사용한다. emoji·유니코드·외부 아이콘 폰트 사용 금지. -->
<!-- AI: 아이콘 ID는 아래 목록에서 선택. 목록에 없는 이름은 존재하지 않으므로 사용하지 않는다. -->

```html
<span class="icon icon--{badge|sm|md|lg|xl}" aria-hidden="true">
  <svg aria-hidden="true"><use href="icons/sprite.svg#{icon-id}"/></svg>
</span>
```

| 선택 | 클래스 |
|---|---|
| 뱃지 크기 | `icon--badge` |
| 소형 | `icon--sm` |
| 표준 (기본) | `icon--md` |
| 대형 | `icon--lg` |
| 특대형 | `icon--xl` |
| 브랜드 색 (단색 전용) | `icon--brand` 추가 |
| 반전 (어두운 배경) | `icon--white` 추가 |
| 비활성 | `icon--disabled` 추가 |
| 단독 의미 전달 | `role="img"` + `aria-label="{액션명}"` (aria-hidden 제거) |

### 사용 가능한 아이콘 ID

| 카테고리 | ID 목록 |
|---|---|
| 탐색 | `icon-chevron-double-left` · `icon-chevron-double-right` · `icon-chevron-down` · `icon-chevron-left` · `icon-chevron-right` · `icon-chevron-up` · `icon-collapse` · `icon-home` · `icon-menu` · `icon-sidebar-collapse` · `icon-sidebar-expand` |
| 액션 | `icon-add` · `icon-close` · `icon-copy` · `icon-delete` · `icon-download` · `icon-edit` · `icon-file-drop` · `icon-minus` · `icon-plus` · `icon-print` · `icon-refresh` · `icon-search` · `icon-settings` · `icon-upload` |
| 정보·상태 | `icon-calendar` · `icon-check` · `icon-circle-check` · `icon-circle-x` · `icon-current-location` · `icon-dot` · `icon-help` · `icon-info` · `icon-new` · `icon-time` · `icon-triangle-alert` · `icon-warning` |
| 뷰·데이터 | `icon-camera` · `icon-handle` · `icon-hide` · `icon-multi-sort` · `icon-show` · `icon-sort-asc` · `icon-sort-desc` |
| 서비스 | `icon-company` · `icon-connect` · `icon-construction` · `icon-daily-worker` · `icon-disconnect` · `icon-employee` · `icon-excel` · `icon-helpdesk` · `icon-machinery` · `icon-manager` · `icon-pdf` · `icon-remote-support` · `icon-seminar` · `icon-unit-price` |

> 목록에 없는 아이콘이 필요하면 `icons/categories.json`을 확인한다. 유사한 시스템 아이콘이 없을 경우에만 대체 표현(텍스트·레이블)을 사용한다.

JS init: 없음

### Icon Button

```html
<button class="icon-on--{badge|sm|md|lg|xl}" type="button" aria-label="{액션명}">
  <svg aria-hidden="true"><use href="icons/sprite.svg#{icon-id}"/></svg>
</button>
```

| 선택 | 클래스 |
|---|---|
| 뱃지 크기 | `icon-on--badge` |
| 소형 | `icon-on--sm` |
| 표준 (기본) | `icon-on--md` |
| 대형 | `icon-on--lg` |
| 특대형 | `icon-on--xl` |
| 브랜드 컨텍스트 | `icon-on--brand` 추가 |
| disabled | `disabled` (포커스 유지 필요 시 `aria-disabled="true"` 병행) |

JS init: 없음

### Input

```html
<!-- 기본 / complete 가능 필드: clearable 버튼은 초기 hidden, JS가 blur 후 wrap에 input-wrap--clearable 추가 -->
<div class="input-wrap" id="wrap">
  <input class="input {input--sm}" type="{text|email|password|tel|number}" id="inp" placeholder="{플레이스홀더}">
  <button class="input-clear icon-on--badge" type="button" aria-label="지우기" hidden><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
</div>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 기본 크기(md) | 클래스 없음 (기본값) |
| 소형(sm) | `input--sm` (input 요소에 적용, 래퍼 아님) |
| complete | blur + 값 있음 → `input--complete` + wrap에 `input-wrap--clearable` (JS 필수) |
| error | blur → `input--error` + `aria-invalid="true"` (JS 필수) |
| success | blur → `input--success` (JS 필수) |
| ghost(무테두리) | `input--ghost` |
| disabled | `input--disabled` + `disabled aria-disabled="true" tabindex="-1"` |
| readonly | `input--readonly` + `readonly` |
| 오른쪽 suffix | `input-wrap--suffix` + `span.input__suffix` (텍스트·아이콘 모두 가능, 두 요소 필수) |
| 앞 아이콘 addon | 미구현 — ghost Input + IconButton 나란히 배치 사용 (Do/Don't 참조) |

> ⚠️ `input-wrap--suffix`는 CSS에서 input의 `border-right: none`을 적용한다. `span.input__suffix`(언더스코어 2개)가 없으면 suffix 박스가 없고 오른쪽 테두리만 사라져 input이 열린 것처럼 보인다. `input-wrap--suffix`와 `span.input__suffix`는 반드시 함께 사용한다.
>
> ⚠️ `input-wrap--clearable`은 초기 HTML에 넣지 않는다. JS blur 핸들러가 동적으로 추가/제거한다.

JS: complete 상태 — `initInput(el)` (CSS 섹션 `js init` 참조). clearable 버튼 연동이 필요한 경우 `## 동작` 데모 코드 참조.

`input-wrap--icon-right`는 JS 내부 전용(초기 마크업 사용 금지).

### Textarea

```html
<div class="textarea-wrap">
  <textarea class="textarea" rows="{rows}" placeholder="{placeholder}"></textarea>
</div>
```

| 선택 | 클래스 |
|---|---|
| 소형 | `textarea--sm` |
| 에러 | `textarea--error` + `aria-invalid="true"` |
| 완성 (blur 후 값 있음) | `textarea--complete` |
| readonly | `textarea--readonly` + `readonly` |
| disabled | `textarea--disabled` + `disabled` + `aria-disabled="true"` + `tabindex="-1"` |

JS init: `initTextarea(el)`

### Checkbox

```html
<label class="checkbox checkbox--{sm|md|lg}">
  <input type="checkbox" {checked} {disabled}>
  <span class="checkbox__control" aria-hidden="true">
    <span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
  </span>
  <span class="checkbox__label">{레이블}</span>
</label>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 크기 | `checkbox--sm` / `--md` / `--lg` |
| checked | `checked` 속성 |
| indeterminate | JS: `el.indeterminate = true` |
| disabled | `disabled` 속성 |
| 에러 상태 | `checkbox--error` |
| 레이블 없음 | `aria-label` 속성 필수 |

JS init: 없음

> `icons/sprite.svg` 경로는 HTML 파일 기준 상대경로다. 단독 HTML 파일 배포 시 sprite.svg가 같은 위치에 없으면 체크 아이콘이 렌더링되지 않는다.

### Radio

```html
<fieldset class="radio-group radio-group--{vertical|horizontal}">
  <legend class="sr-only">{그룹명}</legend>
  <label class="radio radio--{sm|md|lg}">
    <input type="radio" name="{name}" value="{value}" {checked} {disabled}>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">{레이블}</span>
  </label>
</fieldset>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 크기 | `radio--sm` / `--md` / `--lg` |
| 방향 | `radio-group--vertical` / `--horizontal` |
| 선택됨 | `checked` 속성 |
| disabled | `disabled` 속성 |
| 에러 상태 | `radio--error` |

JS init: 없음

### Toggle

```html
<label class="toggle {toggle--sm}">
  <input type="checkbox" role="switch" {checked} {disabled} {aria-disabled} {tabindex}>
  <span class="toggle__track"><span class="toggle__thumb"></span></span>
  <span class="toggle__label">{레이블}</span>
</label>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 소형 | `toggle--sm` (기본은 md — 클래스 없음) |
| 켜짐 | `checked` 속성 |
| disabled | `toggle--disabled` + `disabled aria-disabled="true" tabindex="-1"` |
| 레이블 없음 | input에 `aria-label` 필수 |

JS init: 없음

### Badge

```html
<span class="badge badge--{fill|line|pill} badge--{md}">{레이블}</span>
```

| 선택 | 클래스 |
|---|---|
| 현재 상태 표시 | `badge--fill` |
| 라벨·분류 | `badge--line` |
| 숫자 카운트 | `badge--pill` |
| 표준 크기 (기본) | `badge--md` |
| 활성 펄스 표시 | `badge--pulse` |

JS init: 없음

### Tag

```html
<!-- 선택형 -->
<button class="tag" type="button" aria-pressed="false">{레이블}</button>

<!-- 제거 가능형 -->
<span class="tag tag--removable">
  {레이블}
  <button class="icon-on--badge icon-on--brand" type="button" aria-label="{레이블} 제거">
    <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
  </button>
</span>
```

| 선택 | 클래스 |
|---|---|
| 원형 | `tag--pill` |
| 표준 크기 | `tag--md` |
| 선택됨 | `tag--selected` + `aria-pressed="true"` |
| disabled | `tag--disabled` + `disabled` + `aria-disabled="true"` |

JS init: `initTag(container)`

### Segment

```html
<div class="segment {segment--md}" role="radiogroup" aria-label="{그룹명}">
  <span class="segment__slider" aria-hidden="true"></span>
  <button class="segment__item segment__item--selected" type="button" role="radio" aria-checked="true">{레이블}</button>
  <button class="segment__item" type="button" role="radio" aria-checked="false">{레이블}</button>
</div>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 기본 크기(sm) | 클래스 없음 |
| 중형(md) | `segment--md` |
| 선택된 항목 | `segment__item--selected` + `aria-checked="true"` |
| 비선택 항목 | `aria-checked="false"` |
| disabled 항목 | `disabled` + `aria-disabled="true"` |

JS init: `initSegment(el)` (슬라이더 위치 갱신)

### Spinner

```html
<span class="spinner spinner--{sm|md|lg}" role="status" aria-label="{로딩 중}"></span>
```

| 선택 | 클래스 |
|---|---|
| 크기 소 | `spinner--sm` |
| 크기 중 | `spinner--md` |
| 크기 대 | `spinner--lg` |
| 반전 색상 | `spinner--inverse` |

JS init: 없음

### Skeleton

```html
<span class="skeleton skeleton--{text|circle|rect}" style="width:{w}; height:{h};"></span>
```

| 선택 | 클래스 |
|---|---|
| 텍스트 줄 | `skeleton--text` |
| 원형 (아바타) | `skeleton--circle` |
| 직사각형 | `skeleton--rect` |
| 너비·높이 | `style="width:…; height:…;"` |

JS init: 없음

### Tooltip

```html
<span class="tooltip-wrapper">
  <button class="tooltip-trigger" type="button" aria-label="{도움말}" aria-describedby="{tip-id}">
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
  </button>
  <div class="tooltip-panel elevation-tooltip tooltip-panel--{top|bottom|left|right}" id="{tip-id}" role="tooltip">{내용}</div>
</span>
```

| 선택 | 클래스 |
|---|---|
| 위 | `tooltip-panel--top` |
| 아래 | `tooltip-panel--bottom` |
| 왼쪽 | `tooltip-panel--left` |
| 오른쪽 | `tooltip-panel--right` |
| 표시 | `tooltip-panel--visible` |
| 클릭 고정형 | `tooltip-panel--pinned tooltip-panel--visible` + 내부 `span.tooltip-panel-text` + `button.tooltip-dismiss` |

JS init: `initTooltip(el)`

### Divider

```html
<hr class="divider divider--{horizontal|vertical}">
```

| 선택 | 클래스 |
|---|---|
| 가로 | `divider--horizontal` (기본) |
| 세로 | `divider--vertical` |
| 여백 축소 | `divider--compact` |

JS init: 없음

### Link

```html
<a class="link link--{sm|md|lg}" href="{url}">{레이블}</a>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 크기 | `link--sm` / `--md` / `--lg` |
| 외부 링크 | `target="_blank"` + `rel="noopener noreferrer"` |
| 방문함 | `:visited` (CSS 자동) |
| 비활성 | `aria-disabled="true"` + `tabindex="-1"` |
| 아이콘 포함 | `link--icon` + `span.icon` |

JS init: 없음

### Disclosure

```html
<span class="disclosure {disclosure--expanded}">
  <button class="disclosure__trigger" type="button" aria-expanded="{true|false}" aria-controls="{body-id}">
    <span class="disclosure__label">{레이블}</span>
    <span class="icon-on--sm disclosure__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
  </button>
  <span class="disclosure__body" id="{body-id}">{내용}</span>
</span>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 펼침 상태 | `disclosure--expanded` + `aria-expanded="true"` |
| 접힘 상태 | `aria-expanded="false"` (body는 JS가 hidden 처리) |
| 레이블 커스텀 | `data-label-expand` / `data-label-collapse` 속성 |
| 레이블만 | `disclosure--label-only` |
| 아이콘만 | `disclosure--icon-only` + `disclosure__header` 래퍼 + `aria-label` 필수 |

JS init: `initDisclosure(el)`

### Progress

```html
<div class="progress {progress--indeterminate}" role="progressbar"
     aria-valuenow="{0-100}" aria-valuemin="0" aria-valuemax="100" aria-label="{진행률}">
  <div class="progress__track">
    <div class="progress__fill" style="width:{value}%"></div>
  </div>
</div>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 현재 값 | `aria-valuenow` + `style="width:X%"` |
| 불확정 | `progress--indeterminate` + `aria-busy="true"` (`aria-valuenow` 제거) |
| 레이블 표시 | `div` 다음에 `span.progress__label.text-helper` |

JS init: 없음

### Calendar

```html
<div class="calendar" data-calendar data-year="{YYYY}" data-month="{M}">
  <div class="calendar__header">…</div>
  <div class="calendar__grid">…</div>
</div>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 연·월 지정 | `data-year` / `data-month` |
| 선택된 날 | `cal__day--selected` |
| 범위 시작 | `cal__day--range-start` |
| 범위 끝 | `cal__day--range-end` |
| 범위 내 | `cal__day--in-range` |
| 비활성 날 | `cal__day--disabled` |
| 오늘 | `cal__day--today` |

JS init: `initCalendar(el)`

---

## Molecules

### DatePicker

```html
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

| 선택 | 클래스 / 구조 |
|---|---|
| 기본 | `dp` |
| 선택 완료 | `dp--has-value` 루트에 추가 |
| 에러 | 트리거에 `aria-invalid="true"` |
| disabled | `dp--disabled` |

JS init: `initDatePicker(el)`

### Pagination

```html
<nav class="pagination" aria-label="페이지 탐색">
  <button class="pagination__prev btn btn--micro btn--icon-only" type="button" aria-label="이전 페이지" {disabled}>
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
  </button>
  <ul class="pagination__list">
    <li><button class="pagination__item {pagination__item--active}" type="button" aria-current="{page|false}" aria-label="{n}페이지">{n}</button></li>
  </ul>
  <button class="pagination__next btn btn--micro btn--icon-only" type="button" aria-label="다음 페이지" {disabled}>
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
  </button>
</nav>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 현재 페이지 | `pagination__item--active` + `aria-current="page"` |
| 처음/끝 버튼 | `pagination__first` / `pagination__last` |
| 생략 부호 | `pagination__ellipsis` (`aria-hidden="true"`) |
| disabled | `disabled` + `aria-disabled="true"` |

JS init: `initPagination(el, {total, current, onChange})`

### FormField

```html
<div class="form-field {form-field--error}">
  <label class="form-field__label" for="{input-id}">{레이블}<span class="form-field__required" aria-hidden="true">*</span></label>
  <!-- 입력 컴포넌트 (input-wrap, select-wrap, textarea-wrap 등) -->
  <p class="form-field__helper">{도움말}</p>
  <p class="form-field__error" role="alert">{오류 메시지}</p>
</div>
```

| 선택 | 클래스 / 구조 |
|---|---|
| 에러 상태 | `form-field--error` + `form-field__error` 표시 |
| 필수 표시 | `form-field__required` (스크린리더 숨김) |
| 도움말 | `form-field__helper` |
| disabled | 내부 입력에 `disabled` |
| 입력 유형 | `input-wrap` / `select-wrap` / `textarea-wrap` / `combobox` 등 |

JS init: 없음

### Dropdown

```html
<div class="dropdown" data-dropdown>
  <button class="btn btn--secondary btn--md dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
    {트리거 레이블} <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
  </button>
  <ul class="dropdown__menu" role="listbox">
    <li class="dropdown__item {dropdown__item--selected}" role="option" aria-selected="{true|false}" data-value="{value}">{항목}</li>
  </ul>
</div>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 열림 | `dropdown--open` + `aria-expanded="true"` |
| 선택된 항목 | `dropdown__item--selected` + `aria-selected="true"` |
| disabled 항목 | `dropdown__item--disabled` + `aria-disabled="true"` |
| 구분선 | `dropdown__divider` |
| 헤더 | `dropdown__header` |
| 정렬: 오른쪽 | `dropdown__menu--right` |

JS init: `initDropdown(el)`

### Combobox

```html
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

| 선택 | 클래스 / 구조 |
|---|---|
| 단일 선택 (기본) | `combobox` |
| 다중 선택 | `combobox combobox--multi` + 트리거를 `div.combobox__trigger[tabindex="0"]`로 + `span.combobox__tags` 삽입 + listbox에 `aria-multiselectable="true"` |
| 에러 | `combobox--error` |
| disabled | `combobox--disabled` |

JS init: `initCombobox(el)`

### Tab

```html
<div class="tab-wrap">
  <div class="tab tab--{line|pill} tab--{sm|md|lg}" role="tablist" aria-label="{탭 그룹명}">
    <button class="tab__item {tab__item--active}" type="button" role="tab" id="{tab-id}" aria-controls="{panel-id}" aria-selected="{true|false}">{레이블}</button>
  </div>
  <div class="tab__panel" id="{panel-id}" role="tabpanel" aria-labelledby="{tab-id}">{내용}</div>
</div>
```

| 선택 | 클래스 |
|---|---|
| 스타일: 선 | `tab--line` |
| 스타일: 알약 | `tab--pill` |
| 크기 | `tab--sm` / `--md` / `--lg` |
| 활성 탭 | `tab__item--active` + `aria-selected="true"` |
| 전체 폭 | `tab--full` |
| 배지 포함 | 탭 레이블 내 `span.badge` |

JS init: `initTab(el)`

### Accordion

```html
<div class="accordion {accordion--bordered}">
  <div class="accordion__item {accordion__item--open}">
    <button class="accordion__trigger" type="button" aria-expanded="{true|false}" aria-controls="{panel-id}">{제목}</button>
    <div class="accordion__panel" id="{panel-id}" role="region">{내용}</div>
  </div>
</div>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 테두리형 | `accordion--bordered` |
| 열린 항목 | `accordion__item--open` + `aria-expanded="true"` |
| 닫힌 항목 | `aria-expanded="false"` + panel `hidden` |
| 단일 열림 | `data-single` 속성 |
| 아이콘 커스텀 | trigger 내 `span.icon` |

JS init: `initAccordion(el)`

### Toast

```html
<!-- toast--info: icon-info / toast--success: icon-circle-check / toast--warning: icon-warning / toast--error: icon-circle-x -->
<div class="toast toast--{info|success|warning|error}" role="alert" aria-live="polite">
  <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#{icon-id}"/></svg></span>
  <p class="toast__message">{메시지}</p>
  <button class="toast__close btn btn--micro btn--icon-only" type="button" aria-label="닫기">
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
  </button>
</div>
```

| 선택 | 클래스 |
|---|---|
| 정보 | `toast--info` |
| 성공 | `toast--success` |
| 경고 | `toast--warning` |
| 오류 | `toast--error` |
| 자동 닫힘 | `data-duration="{ms}"` |
| 위치 | JS `showToast({position: 'top|bottom'})` |

JS init: `showToast({message, type, duration})`

### Alert

```html
<!-- alert--info: icon-info / alert--success: icon-circle-check / alert--warning: icon-warning / alert--error: icon-circle-x -->
<div class="alert alert--{info|success|warning|error}" role="alert">
  <span class="icon icon--md alert__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#{icon-id}"/></svg></span>
  <div class="alert__body">
    <p class="alert__title">{제목}</p>
    <p class="alert__desc">{설명}</p>
  </div>
  <button class="alert__close btn btn--micro btn--icon-only" type="button" aria-label="닫기">
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
  </button>
</div>
```

| 선택 | 클래스 |
|---|---|
| 정보 | `alert--info` |
| 성공 | `alert--success` |
| 경고 | `alert--warning` |
| 오류 | `alert--error` |
| 제목만 | `alert__desc` 생략 |
| 닫기 없음 | `alert__close` 생략 |
| 인라인 배치 | `alert--inline` |

JS init: 없음

### FileUpload

```html
<div class="file-upload" id="{id}">
  <div class="file-upload__header">
    <span class="text-form-label file-upload__label">{레이블}</span>
    <span class="text-form-label file-upload__usage">{0MB} / {2MB}</span>
  </div>
  <div class="file-upload__meta">
    <p class="text-body file-upload__description">{안내 문구}</p>
    <p class="text-body file-upload__constraint">*파일당 {10}MB 이하 업로드 가능</p>
  </div>
  <div class="file-upload__dropzone">
    <input type="file" hidden accept="{image/*}" multiple>
    <button class="btn btn--secondary btn--sm btn--icon-left" type="button">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span>추가하기
    </button>
    <div class="file-upload__grid"></div>
  </div>
</div>
```

파일 카드 (JS 생성): `div.file-upload-item` > `p.text-form-label.file-upload-item__name` + `div.file-upload-item__preview` > `img.file-upload-item__thumb[alt=""]` + `div.file-upload-item__overlay[aria-hidden]` + `div.file-upload-item__actions` > `btn[aria-label="다운로드"]` + `btn[aria-label="삭제"]`

| 선택 | 클래스 / 구조 |
|---|---|
| 드래그 오버 | `file-upload--drag-over` |
| 용량 초과 | `file-upload--capacity-full` + 추가하기 버튼에 `disabled` |

JS init: `initFileUpload(el)`

### ImagePreview

```html
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

| 선택 | 클래스 |
|---|---|
| 닫힘 (기본) | `image-preview` (숨겨진 상태) |
| 열림 | `image-preview--visible` |

JS init: `initImagePreview(el)` — `openImagePreview(el, { src, filename })` / `closeImagePreview(el)` 으로 열고 닫음

### Breadcrumb

```html
<nav class="breadcrumb" aria-label="breadcrumb">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item">
      <a class="breadcrumb__link" href="{url}">{레이블}</a>
    </li>
    <li class="breadcrumb__item breadcrumb__item--current" aria-current="page">{현재 페이지}</li>
  </ol>
</nav>
```

| 선택 | 클래스 / 속성 |
|---|---|
| 현재 페이지 | `breadcrumb__item--current` + `aria-current="page"` |
| 구분자 | CSS `::after` 자동 (변경 불가) |
| 말줄임 | `breadcrumb--truncate` + 중간 항목 숨김 |

JS init: 없음

### Steps

```html
<ol class="steps steps--{horizontal|vertical}">
  <li class="steps__item steps__item--{done|active|pending}">
    <span class="steps__indicator" aria-hidden="true">{번호 또는 아이콘}</span>
    <span class="steps__label">{단계명}</span>
  </li>
</ol>
```

| 선택 | 클래스 |
|---|---|
| 방향: 가로 | `steps--horizontal` |
| 방향: 세로 | `steps--vertical` |
| 완료 단계 | `steps__item--done` |
| 현재 단계 | `steps__item--active` + `aria-current="step"` |
| 미완료 단계 | `steps__item--pending` |
| 클릭 가능 | `steps__item--clickable` + `button` 내부 사용 |

JS init: 없음

### Table Cell

```html
<!-- 헤더 셀 -->
<th class="table__head-cell" scope="col">{컬럼명}</th>

<!-- 정렬 가능 헤더 -->
<th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none">
  <button class="table__sort-btn" aria-label="{컬럼명} 정렬">
    {컬럼명}<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span>
  </button>
</th>

<!-- 체크 헤더 -->
<th class="table__cell table__cell--check" scope="col">
  <label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label>
</th>
```

| 데이터 셀 선택 | 클래스 / 구조 |
|---|---|
| 텍스트·이름 | `td.table__cell` |
| 금액·수량 (우측 정렬) | `td.table__cell.table__cell--number` |
| 날짜·코드·고정형식 (너비 수축) | `td.table__cell.table__cell--fit` |
| 체크박스 | `td.table__cell.table__cell--check` > `label.checkbox.checkbox--sm` |
| 인라인 입력 | `td.table__cell--edit` > `div.input-wrap` > `input.input.input--sm` |
| 뱃지·버튼 | `td.table__cell` 안에 직접 삽입 |

| 정렬 상태 | 클래스 + aria |
|---|---|
| 오름차순 | `table__head-cell--sort-asc` + `aria-sort="ascending"` |
| 내림차순 | `table__head-cell--sort-desc` + `aria-sort="descending"` |
| 미정렬 | `aria-sort="none"` |

JS init: 없음 (정렬 버튼 click → aria-sort 동기화 직접 구현)

### DateRangePicker

```html
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

| 선택 | 클래스 / 구조 |
|---|---|
| 기본 | `drp` |
| 필터바 내 배치 | 트리거에 `drp__trigger--ghost` 추가 |
| 선택 완료 | `drp--has-value` 루트에 추가 |

JS init: `initDateRangePicker(el)`

---

## Organisms

### Form

```html
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
    </div>
  </div>
  <div class="form__footer">
    <button class="btn btn--secondary btn--solid btn--md" type="button">{취소 레이블}</button>
    <button class="btn btn--primary btn--solid btn--md" type="submit">{저장 레이블}</button>
  </div>
</form>
```

| 선택 | 클래스 / 구조 |
|---|---|
| full 행 | `form-row` > `form-field` (기본) |
| half+half 행 | `form-row` > `form-field--half` + `form-field--half` |
| half+auto 행 | `form-row` > `form-field--half` + `form-field--auto` |
| 섹션 제목만 | `form-section` > `h3.form-section__title` |
| 섹션 제목+컨트롤 | `div.form-section__header` > `h3.form-section__title` + 우측 컨트롤 |
| 조건부 섹션 숨김 | `form-section--hidden` + 내부 input에 `disabled` 추가 |

JS init: 없음

### Table

```html
<div class="table-container">
  <div class="table__toolbar">
    <div class="table__title" id="{title-id}">{테이블 제목}</div>
    <div class="table__toolbar-actions"><!-- icon-on--lg 버튼 등 --></div>
  </div>
  <table class="table table--dense" aria-labelledby="{title-id}">
    <thead class="table__head">
      <tr>
        <th class="table__cell table__cell--check" scope="col">
          <label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label>
        </th>
        <th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none">
          <button class="table__sort-btn" aria-label="{컬럼명} 정렬">{컬럼명}</button>
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

| 선택 | 클래스 / 구조 |
|---|---|
| dense (기본) | `table--dense` |
| compact | `table--compact` |
| base | (modifier 없음) |
| spacious | `table--spacious` |
| Toolbar 없음 | `<table aria-label="{용도}">` |
| 빈 상태 | `tbody > tr > td[colspan="N"]` > `div.empty-state.empty-state--compact` |

JS init: 없음 (정렬·선택 이벤트 직접 구현)

### Table — 데이터

```html
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
    <tfoot class="table__foot">
      <tr class="table__row table__row--total">
        <td class="table__cell" colspan="{N}">합계</td>
        <td class="table__cell table__cell--number">{합계}</td>
      </tr>
    </tfoot>
  </table>
</div>
```

| 선택 | 클래스 / 구조 |
|---|---|
| 선택된 행 | `table__row--selected` |
| 서브 행 | `table__row--sub` (대응 행 바로 다음 형제) |
| 합계 행 | `table__row--total` + `tfoot` 안에 배치 |
| 편집 셀 | `td.table__cell--edit` > `div.input-wrap` > `input.input.input--sm` |
| 펼침 버튼 | `button[aria-expanded][aria-controls]` + `span.accordion__icon--collapsed` / `span.accordion__icon--expanded` |

JS init: 없음 (정렬·선택·펼침 이벤트 직접 구현)

### Table — 정보

```html
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

| 선택 | 클래스 / 구조 |
|---|---|
| 항상 | `table--info table--dense` 함께 사용 |
| 행 헤더 | `th.table__head-cell.table__row-header[scope="row"]` |
| 복잡 병합 테이블 | 각 헤더 셀에 `id`, 데이터 셀에 `headers="[id목록]"` |

JS init: 없음

### Modal

```html
<div class="modal-overlay">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="{title-id}">
    <div class="modal__header">
      <h2 class="modal__title text-modal-title-sm" id="{title-id}">{제목}</h2>
      <button class="icon-on--lg" type="button" aria-label="닫기">
        <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
      </button>
    </div>
    <div class="modal__body">
      <div class="modal__content">{콘텐츠}</div>
    </div>
    <div class="modal__footer">
      <button class="btn btn--secondary btn--solid btn--md" type="button">{취소 레이블}</button>
      <button class="btn btn--primary btn--solid btn--md" type="submit">{확인 레이블}</button>
    </div>
  </div>
</div>
```

| 선택 | 클래스 / 구조 |
|---|---|
| 소제목 모달 (기본) | `modal` + `text-modal-title-sm` + `modal__footer` 포함 |
| 대제목 모달 | `modal modal--lg` + `text-modal-title` + `modal__nav` + `modal__aside` + `modal__content` 3단 구조, `modal__footer` 없음 |
| 비가역 삭제 CTA | `btn--danger btn--solid btn--md` |

JS init: `trapFocus(modal)` — 열릴 때 호출, 닫힐 때 트리거 요소로 포커스 복원

### EmptyState

```html
<div class="empty-state">
  <div class="empty-state__icon" aria-hidden="true">
    <svg aria-hidden="true"><use href="icons/sprite.svg#{icon-id}"/></svg>
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

| 선택 | 클래스 / 구조 |
|---|---|
| 표준 | `empty-state` |
| 테이블 셀 인라인 | `empty-state--compact` + `td[colspan="N"]` 안에 배치 |
| 슬롯 생략 | `empty-state__icon` · `empty-state__description` · `empty-state__actions` 선택 생략 가능 (`empty-state__title`은 항상 포함) |
| 동적 표시 | 루트에 `role="status"` + `aria-live="polite"` 추가 |

JS init: 없음

### FilterBar

```html
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

| 선택 | 구성 규칙 |
|---|---|
| 드롭다운 필터 | `dropdown--ghost dropdown--multi` — 1개 이상 필수 |
| 기간 필터 | `drp` + 트리거에 `drp__trigger--ghost` — 선택적 |
| 검색 인풋 | `filter-bar__search` — 선택적 |
| 초기화 버튼 | `filter-bar__reset-wrap` — 선택적 |
| 데이터 조작 버튼 | FilterBar 밖 ActionGroup으로 (추가·수정·삭제 포함 금지) |

JS init: `initFilterBar(el)` — 내부 Dropdown·DRP 자동 초기화

---

