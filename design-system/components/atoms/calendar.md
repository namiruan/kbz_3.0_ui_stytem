---
file: components/atoms/calendar.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, tokens/typography.md, tokens/icon.md, components/atoms/icon.md
---

# Calendar

## 개요

날짜를 선택하기 위한 월별 캘린더 그리드 컴포넌트. 단독으로 사용하거나 DatePicker · DateRangePicker Molecule의 패널로 내장된다. 날짜 표시·선택 UI만 담당하며, 시간 선택·입력 필드는 포함하지 않는다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| mode | single · range | single |
| dot | marked (기본, 클래스 없음) · `cal__day--marked` | — |

---

## 사용 지침

<!-- AI: Calendar는 날짜 그리드 자체이고, DatePicker/DateRangePicker는 입력 트리거 + Calendar 패널 조합의 Molecule이다. Calendar를 직접 페이지에 임베드할 때는 단독 사용, 입력 필드와 연결할 때는 DatePicker를 사용한다. -->

### 선택 기준

| 상황 | 사용 컴포넌트 |
|------|--------------|
| 페이지에 캘린더를 항상 노출해야 할 때 | Calendar (단독) |
| 입력 필드 클릭 시 팝오버로 날짜 선택 | DatePicker (Molecule) |
| 시작일~종료일 범위 선택 | DateRangePicker (Molecule) |

### 제약

- **오늘 이전 날짜를 선택 불가** 처리할 때는 `cal__day--disabled`를 사용하고 `aria-disabled="true"`를 함께 지정한다.
- **range mode**에서 시작일 선택 후 종료일 선택 전까지 hover 중인 날짜까지 `cal__day--in-range-preview` 클래스를 동적으로 적용한다.
- 한 Calendar 인스턴스에서 **두 달 이상 동시에 표시하지 않는다** — 멀티 패널이 필요하면 Calendar 두 개를 나란히 배치한다.

---

## Anatomy

<!-- AI: .cal(root) > .cal__header + .cal__grid. header: 이전/다음 달 이동 버튼 + 월·년 레이블. grid: 요일 헤더 행(.cal__weekdays) + 날짜 행들(.cal__week > .cal__day). -->

### Single

:::preview
<div style="display:flex;gap:var(--space-gap-xl);flex-wrap:wrap;align-items:flex-start;">
<div data-component class="cal">
  <!-- Header -->
  <div class="cal__header">
    <button class="cal__nav" aria-label="이전 달">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
    </button>
    <span class="cal__title">2026년 6월</span>
    <button class="cal__nav" aria-label="다음 달">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
    </button>
  </div>
  <!-- Weekday headers -->
  <div class="cal__grid" role="grid" aria-label="2026년 6월">
    <div class="cal__weekdays" role="row">
      <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span>
      <span class="cal__weekday" role="columnheader" aria-label="월요일">월</span>
      <span class="cal__weekday" role="columnheader" aria-label="화요일">화</span>
      <span class="cal__weekday" role="columnheader" aria-label="수요일">수</span>
      <span class="cal__weekday" role="columnheader" aria-label="목요일">목</span>
      <span class="cal__weekday" role="columnheader" aria-label="금요일">금</span>
      <span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
    </div>
    <!-- Week rows -->
    <div class="cal__week" role="row">
      <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 5월 31일" tabindex="-1">31</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 1일" tabindex="-1">1</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 2일" tabindex="-1">2</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 3일" tabindex="-1">3</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 4일" tabindex="-1">4</button>
      <button class="cal__day cal__day--today" role="gridcell" aria-label="2026년 6월 5일, 오늘" aria-current="date" tabindex="0">5</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 6일" tabindex="-1">6</button>
    </div>
    <div class="cal__week" role="row">
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 7일" tabindex="-1">7</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 8일" tabindex="-1">8</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 9일" tabindex="-1">9</button>
      <button class="cal__day cal__day--selected" role="gridcell" aria-label="2026년 6월 10일, 선택됨" aria-selected="true" tabindex="0">10</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 11일" tabindex="-1">11</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 12일" tabindex="-1">12</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 13일" tabindex="-1">13</button>
    </div>
    <div class="cal__week" role="row">
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 14일" tabindex="-1">14</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 15일" tabindex="-1">15</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 16일" tabindex="-1">16</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 17일" tabindex="-1">17</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 18일" tabindex="-1">18</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 19일" tabindex="-1">19</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 20일" tabindex="-1">20</button>
    </div>
    <div class="cal__week" role="row">
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 21일" tabindex="-1">21</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 22일" tabindex="-1">22</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 23일" tabindex="-1">23</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 24일" tabindex="-1">24</button>
      <button class="cal__day" role="gridcell" aria-label="2026년 6월 25일" tabindex="-1">25</button>
      <button class="cal__day cal__day--disabled" role="gridcell" aria-label="2026년 6월 26일, 선택 불가" aria-disabled="true" tabindex="-1">26</button>
      <button class="cal__day cal__day--disabled" role="gridcell" aria-label="2026년 6월 27일, 선택 불가" aria-disabled="true" tabindex="-1">27</button>
    </div>
    <div class="cal__week" role="row">
      <button class="cal__day cal__day--disabled" role="gridcell" aria-label="2026년 6월 28일, 선택 불가" aria-disabled="true" tabindex="-1">28</button>
      <button class="cal__day cal__day--disabled" role="gridcell" aria-label="2026년 6월 29일, 선택 불가" aria-disabled="true" tabindex="-1">29</button>
      <button class="cal__day cal__day--disabled" role="gridcell" aria-label="2026년 6월 30일, 선택 불가" aria-disabled="true" tabindex="-1">30</button>
      <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 1일" tabindex="-1">1</button>
      <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 2일" tabindex="-1">2</button>
      <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 3일" tabindex="-1">3</button>
      <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 4일" tabindex="-1">4</button>
    </div>
  </div>
</div>
</div>
:::

### Range

범위 선택 모드. 시작일(`cal__day--range-start`)·종료일(`cal__day--range-end`) 사이 날짜에 `cal__day--in-range`를 적용한다.

:::preview
<div data-component class="cal cal--range">
  <div class="cal__header">
    <button class="cal__nav" aria-label="이전 달">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
    </button>
    <span class="cal__title">2026년 6월</span>
    <button class="cal__nav" aria-label="다음 달">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
    </button>
  </div>
  <div class="cal__grid" role="grid" aria-label="2026년 6월" aria-multiselectable="true">
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
      <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">31</button>
      <button class="cal__day" role="gridcell" tabindex="-1">1</button>
      <button class="cal__day" role="gridcell" tabindex="-1">2</button>
      <button class="cal__day" role="gridcell" tabindex="-1">3</button>
      <button class="cal__day" role="gridcell" tabindex="-1">4</button>
      <button class="cal__day cal__day--today" role="gridcell" aria-current="date" tabindex="0">5</button>
      <button class="cal__day" role="gridcell" tabindex="-1">6</button>
    </div>
    <div class="cal__week" role="row">
      <button class="cal__day" role="gridcell" tabindex="-1">7</button>
      <button class="cal__day" role="gridcell" tabindex="-1">8</button>
      <button class="cal__day cal__day--range-start" role="gridcell" aria-selected="true" tabindex="-1">9</button>
      <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">10</button>
      <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">11</button>
      <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">12</button>
      <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">13</button>
    </div>
    <div class="cal__week" role="row">
      <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">14</button>
      <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">15</button>
      <button class="cal__day cal__day--range-end" role="gridcell" aria-selected="true" tabindex="-1">16</button>
      <button class="cal__day" role="gridcell" tabindex="-1">17</button>
      <button class="cal__day" role="gridcell" tabindex="-1">18</button>
      <button class="cal__day" role="gridcell" tabindex="-1">19</button>
      <button class="cal__day" role="gridcell" tabindex="-1">20</button>
    </div>
    <div class="cal__week" role="row">
      <button class="cal__day" role="gridcell" tabindex="-1">21</button>
      <button class="cal__day" role="gridcell" tabindex="-1">22</button>
      <button class="cal__day" role="gridcell" tabindex="-1">23</button>
      <button class="cal__day" role="gridcell" tabindex="-1">24</button>
      <button class="cal__day" role="gridcell" tabindex="-1">25</button>
      <button class="cal__day" role="gridcell" tabindex="-1">26</button>
      <button class="cal__day" role="gridcell" tabindex="-1">27</button>
    </div>
    <div class="cal__week" role="row">
      <button class="cal__day" role="gridcell" tabindex="-1">28</button>
      <button class="cal__day" role="gridcell" tabindex="-1">29</button>
      <button class="cal__day" role="gridcell" tabindex="-1">30</button>
      <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">1</button>
      <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">2</button>
      <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">3</button>
      <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">4</button>
    </div>
  </div>
</div>
:::

### Dot (marked)

해당 날짜에 데이터가 있을 때 `cal__day--marked`를 추가한다. 어느 날짜에 dot를 표시할지는 소비하는 쪽(DatePicker 등)이 결정한다.

:::preview
<div data-component class="cal">
  <div class="cal__header">
    <button class="cal__nav" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>
    <span class="cal__title">2026년 6월</span>
    <button class="cal__nav" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
  </div>
  <div class="cal__grid" role="grid" aria-label="2026년 6월">
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
      <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">31</button>
      <button class="cal__day cal__day--marked" role="gridcell" aria-label="2026년 6월 1일, 일정 있음" tabindex="-1">1</button>
      <button class="cal__day" role="gridcell" tabindex="-1">2</button>
      <button class="cal__day cal__day--marked" role="gridcell" aria-label="2026년 6월 3일, 일정 있음" tabindex="-1">3</button>
      <button class="cal__day" role="gridcell" tabindex="-1">4</button>
      <button class="cal__day cal__day--today cal__day--marked" role="gridcell" aria-label="2026년 6월 5일, 오늘, 일정 있음" aria-current="date" tabindex="0">5</button>
      <button class="cal__day" role="gridcell" tabindex="-1">6</button>
    </div>
    <div class="cal__week" role="row">
      <button class="cal__day" role="gridcell" tabindex="-1">7</button>
      <button class="cal__day cal__day--marked" role="gridcell" aria-label="2026년 6월 8일, 일정 있음" tabindex="-1">8</button>
      <button class="cal__day" role="gridcell" tabindex="-1">9</button>
      <button class="cal__day cal__day--selected cal__day--marked" role="gridcell" aria-label="2026년 6월 10일, 선택됨, 일정 있음" aria-selected="true" tabindex="0">10</button>
      <button class="cal__day" role="gridcell" tabindex="-1">11</button>
      <button class="cal__day cal__day--disabled cal__day--marked" role="gridcell" aria-label="2026년 6월 12일, 선택 불가" aria-disabled="true" tabindex="-1">12</button>
      <button class="cal__day" role="gridcell" tabindex="-1">13</button>
    </div>
  </div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.cal {
  display: inline-flex;
  flex-direction: column;
  gap: var(--space-gap-md);
  background: var(--color-surface-base);
  width: 280px;
  user-select: none;
}

/* ── Header ── */
.cal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cal__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-ui);
  color: var(--color-text-display);
}

.cal__nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--height-compact);
  height: var(--height-compact);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-subtle);
  cursor: pointer;
  transition: background var(--duration-fast) var(--easing-base),
              color var(--duration-fast) var(--easing-base);
}
.cal__nav:hover {
  background: var(--color-action-neutral-hover);
  color: var(--color-text-body);
}
.cal__nav:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Grid ── */
/* gap 없음 — range 배경이 행 사이에서 시각적으로 끊기지 않도록.
   셀 높이(height-compact + 10px)가 행 간 여백을 대신한다. */
.cal__grid {
  display: flex;
  flex-direction: column;
}

/* ── Weekday headers ── */
.cal__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.cal__weekday {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--height-compact);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-subtle);
  letter-spacing: var(--letter-spacing-normal);
}
/* 일요일·토요일 헤더 색상 */
.cal__weekdays > .cal__weekday:first-child { color: var(--color-fill-error); }
.cal__weekdays > .cal__weekday:last-child  { color: var(--color-fill-brand); }

/* ── Week row ── */
.cal__week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

/* ── Day cell ── */
/* height-compact(32px) + 10px으로 dot 공간 확보.
   hover·today·selected 원형은 ::before(absolute, top:0)로 상단에만 렌더링.
   range 배경은 background-size로 상단 height-compact 영역만 채워 dot 공간과 분리.
   z-index: 0으로 stacking context 생성 → ::before z-index:-1이 텍스트 뒤에 위치. */
.cal__day {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 9px;
  gap: 9px;
  position: relative;
  z-index: 0;
  width: 100%;
  height: calc(var(--height-compact) + 10px);
  border: none;
  border-radius: 0;
  background: transparent;
  color: var(--color-text-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-body);
  line-height: var(--line-height-ui);
  cursor: pointer;
  transition: color var(--duration-fast) var(--easing-base);
}
/* 원형 hover — top:0에서 height-compact 크기로 */
.cal__day:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: var(--height-compact);
  height: var(--height-compact);
  border-radius: var(--radius-pill);
  background: var(--color-action-brand-hover);
  z-index: -1;
}
.cal__day:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* 일요일·토요일 날짜 색상 — outside·disabled는 회색 우선 */
.cal__week > .cal__day:first-child:not(.cal__day--outside):not(.cal__day--disabled) { color: var(--color-fill-error); }
.cal__week > .cal__day:last-child:not(.cal__day--outside):not(.cal__day--disabled)  { color: var(--color-fill-brand); }

/* ── Day states ── */
.cal__day--today {
  font-weight: var(--font-weight-bold);
  color: var(--color-fill-brand);
}
.cal__day--today::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: var(--height-compact);
  height: var(--height-compact);
  border-radius: var(--radius-pill);
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-fill-brand);
  z-index: -1;
}

.cal__day--selected {
  color: var(--color-text-inverse);
  font-weight: var(--font-weight-bold);
}
.cal__day--selected::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: var(--height-compact);
  height: var(--height-compact);
  border-radius: var(--radius-pill);
  background: var(--color-fill-brand);
  z-index: -1;
}
/* 오늘 날짜가 선택된 경우 흰색 ring */
.cal__day--selected.cal__day--today::before {
  background: var(--color-fill-brand);
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-text-inverse);
}

.cal__day--outside {
  color: var(--color-text-disabled);
  cursor: default;
  pointer-events: none;
}

.cal__day--disabled {
  color: var(--color-text-disabled);
  pointer-events: none;
}

/* ── Range mode ── */
/* range 배경을 background-size로 상단 height-compact 영역에만 그림.
   radial-gradient 중심을 at 50% calc(height-compact/2)로 지정해 원형이 셀 상단에 정렬.
   모든 range 셀에서 ::before 억제 — background가 원형·띠를 직접 처리. */
.cal__day--in-range::before,
.cal__day--range-start::before,
.cal__day--range-end::before { display: none; }

/* in-range: 상단 height-compact 영역을 꽉 채우는 연한 배경 */
.cal__day--in-range {
  color: var(--color-text-body);
  background:
    linear-gradient(var(--color-action-brand-hover), var(--color-action-brand-hover))
    0 0 / 100% var(--height-compact) no-repeat;
}

/* range-start: 원형 + 오른쪽 절반 띠 — 둘 다 상단 height-compact 영역에만 */
.cal__day--range-start {
  color: var(--color-text-inverse);
  font-weight: var(--font-weight-bold);
  background:
    radial-gradient(
      circle calc(var(--height-compact) / 2)
      at 50% calc(var(--height-compact) / 2),
      var(--color-fill-brand) 100%, transparent 100%
    ) 0 0 / 100% var(--height-compact) no-repeat,
    linear-gradient(to left, var(--color-action-brand-hover) 50%, transparent 50%)
    0 0 / 100% var(--height-compact) no-repeat;
}

/* range-end: 원형 + 왼쪽 절반 띠 — 둘 다 상단 height-compact 영역에만 */
.cal__day--range-end {
  color: var(--color-text-inverse);
  font-weight: var(--font-weight-bold);
  background:
    radial-gradient(
      circle calc(var(--height-compact) / 2)
      at 50% calc(var(--height-compact) / 2),
      var(--color-fill-brand) 100%, transparent 100%
    ) 0 0 / 100% var(--height-compact) no-repeat,
    linear-gradient(to right, var(--color-action-brand-hover) 50%, transparent 50%)
    0 0 / 100% var(--height-compact) no-repeat;
}

/* 시작일과 종료일이 같은 날 — 띠 없이 원형만 */
.cal__day--range-start.cal__day--range-end {
  background:
    radial-gradient(
      circle calc(var(--height-compact) / 2)
      at 50% calc(var(--height-compact) / 2),
      var(--color-fill-brand) 100%, transparent 100%
    ) 0 0 / 100% var(--height-compact) no-repeat;
}

/* ── Dot (marked) ── */
/* ::after가 flex 자식으로 참여해 숫자 아래에 자연스럽게 위치.
   position: absolute 불필요 — stacking 문제 없음. */
.cal__day--marked::after {
  content: '';
  display: block;
  width: 4px;
  height: 4px;
  border-radius: var(--radius-pill);
  background: var(--color-fill-brand);
  flex-shrink: 0;
}
/* selected·range: 어두운 배경 위에서 dot를 흰색으로 반전 */
.cal__day--marked.cal__day--selected::after,
.cal__day--marked.cal__day--range-start::after,
.cal__day--marked.cal__day--range-end::after {
  background: var(--color-text-inverse);
}
/* disabled: 날짜 자체가 비활성이므로 dot 숨김 */
.cal__day--marked.cal__day--disabled::after {
  display: none;
}

/* hover preview — JS로 동적 적용 */
.cal__day--in-range-preview {
  background:
    linear-gradient(var(--color-action-neutral-hover), var(--color-action-neutral-hover))
    0 0 / 100% var(--height-compact) no-repeat;
}
```

---

## 접근성

캘린더 그리드는 `role="grid"` + `role="gridcell"` 패턴을 사용한다. 키보드 내비게이션은 구현체(JS)가 담당한다.

| 상황 | 마크업 |
|------|--------|
| 그리드 컨테이너 | `role="grid"` + `aria-label="YYYY년 M월"` |
| 요일 헤더 | `role="columnheader"` + `aria-label="월요일"` (약자 표시 시 full name) |
| 날짜 셀 | `role="gridcell"` + `aria-label="YYYY년 M월 D일"` |
| 오늘 | `aria-current="date"` 추가 |
| 선택됨 (single) | `aria-selected="true"` |
| 범위 내 날짜 (range) | `aria-selected="true"` |
| disabled 날짜 | `aria-disabled="true"` + `tabindex="-1"` + `pointer-events: none` |
| 데이터 있는 날짜 (marked) | `aria-label`에 ", 일정 있음" 등 데이터 의미를 텍스트로 병기 — dot는 시각적 표현이므로 단독으로 상태 전달 불가 |
| 범위 모드 그리드 | `aria-multiselectable="true"` 추가 |

### 키보드 내비게이션 (JS 구현 필수)

| 키 | 동작 |
|----|------|
| `←` / `→` | 이전/다음 날 |
| `↑` / `↓` | 이전/다음 주 같은 요일 |
| `Home` / `End` | 해당 주 일요일/토요일 |
| `Page Up` / `Page Down` | 이전/다음 달 같은 날 |
| `Enter` / `Space` | 날짜 선택 |
| `Tab` | 날짜 그리드 ↔ 헤더 이동 버튼 순환 |

포커스는 roving tabindex 패턴으로 관리한다. 그리드 안에서는 포커스된 날짜만 `tabindex="0"`, 나머지는 `tabindex="-1"`.

---

## Do / Don't

> ✅ DO — `role="grid"` 패턴으로 마크업하고 키보드 내비게이션 구현
> `<div role="grid" aria-label="2026년 6월">...</div>`

> ❌ DON'T — `<table>` 태그로 캘린더를 구현
> grid role을 table로 대체하면 스크린 리더가 날짜 셀을 잘못 읽는다

> ✅ DO — 날짜 셀에 전체 날짜를 `aria-label`로 명시
> `aria-label="2026년 6월 5일"`

> ❌ DON'T — 숫자만 표시하고 aria-label 생략
> 스크린 리더가 "5"만 읽어 날짜 맥락을 잃는다

> ✅ DO — `outside` 날짜(전·후월)에 `pointer-events: none`으로 클릭 차단하거나 월 이동 처리
> 현재 월 맥락에서 다른 달 날짜를 선택하면 혼란을 줄 수 있다

> ❌ DON'T — `data-component` 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용. 실제 구현 코드에서는 제거한다.
