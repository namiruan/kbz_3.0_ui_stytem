---
file: components/molecules/date-picker.md
version: 0.1.0
status: draft
depends-on: components/atoms/calendar.md, components/atoms/button.md, components/atoms/icon.md
---

# DatePicker

## 개요

트리거 행(연도·월 select + 일·요일 텍스트 + 오늘 버튼 + 토글)과 Calendar Atom 그리드를 결합한 Molecule. 트리거를 클릭해 패널을 열고 날짜를 선택한다. 헤더(월 이동 내비게이션)는 이 컴포넌트가 제공하며, Calendar Atom은 그리드만 담당한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| state | default · open · disabled | default |
| mode | single (추후 range 확장 예정) | single |

---

## Anatomy

<!-- AI: .dp(root) > .dp__trigger + .dp__panel. trigger: .dp__date(select×2 + sep + day + weekday) + .dp__actions(today btn + toggle btn). panel: .dp__nav(prev/next btn) + .cal__grid(Calendar Atom). 패널은 기본 표시(display:block), JS로 hidden 토글. -->

:::preview
<div data-component class="dp" style="width:280px;">
  <!-- 트리거 행 -->
  <div class="dp__trigger">
    <div class="dp__date">
      <select class="dp__select" aria-label="연도">
        <option>2025</option>
        <option>2026</option>
      </select>
      <span class="dp__sep" aria-hidden="true">.</span>
      <select class="dp__select" aria-label="월">
        <option>11</option>
        <option>12</option>
      </select>
      <span class="dp__sep" aria-hidden="true">.</span>
      <span class="dp__day">25</span>
      <span class="dp__weekday">목</span>
    </div>
    <div class="dp__actions">
      <button class="dp__today" type="button">오늘</button>
      <button class="dp__toggle" type="button" aria-expanded="true" aria-label="캘린더 열기/닫기">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
  <!-- 패널 -->
  <div class="dp__panel">
    <div class="dp__nav">
      <button class="dp__nav-btn" type="button" aria-label="이전 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <button class="dp__nav-btn" type="button" aria-label="다음 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
    </div>
    <!-- Calendar Atom 그리드 -->
    <div class="cal__grid" role="grid" aria-label="2025년 11월">
      <div class="cal__weekdays" role="row">
        <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span>
        <span class="cal__weekday" role="columnheader" aria-label="월요일">월</span>
        <span class="cal__weekday" role="columnheader" aria-label="화요일">화</span>
        <span class="cal__weekday" role="columnheader" aria-label="수요일">수</span>
        <span class="cal__weekday" role="columnheader" aria-label="목요일">목</span>
        <span class="cal__weekday" role="columnheader" aria-label="금요일">금</span>
        <span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
      </div>
      <!-- 2025년 11월: 토요일 시작 -->
      <div class="cal__week" role="row">
        <button class="cal__day cal__day--outside" role="gridcell" aria-label="2025년 10월 26일" tabindex="-1">26</button>
        <button class="cal__day cal__day--outside" role="gridcell" aria-label="2025년 10월 27일" tabindex="-1">27</button>
        <button class="cal__day cal__day--outside" role="gridcell" aria-label="2025년 10월 28일" tabindex="-1">28</button>
        <button class="cal__day cal__day--outside" role="gridcell" aria-label="2025년 10월 29일" tabindex="-1">29</button>
        <button class="cal__day cal__day--outside" role="gridcell" aria-label="2025년 10월 30일" tabindex="-1">30</button>
        <button class="cal__day cal__day--outside" role="gridcell" aria-label="2025년 10월 31일" tabindex="-1">31</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 1일" tabindex="-1">1</button>
      </div>
      <div class="cal__week" role="row">
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 2일" tabindex="-1">2</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 3일" tabindex="-1">3</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 4일" tabindex="-1">4</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 5일" tabindex="-1">5</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 6일" tabindex="-1">6</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 7일" tabindex="-1">7</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 8일" tabindex="-1">8</button>
      </div>
      <div class="cal__week" role="row">
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 9일" tabindex="-1">9</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 10일" tabindex="-1">10</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 11일" tabindex="-1">11</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 12일" tabindex="-1">12</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 13일" tabindex="-1">13</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 14일" tabindex="-1">14</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 15일" tabindex="-1">15</button>
      </div>
      <div class="cal__week" role="row">
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 16일" tabindex="-1">16</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 17일" tabindex="-1">17</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 18일" tabindex="-1">18</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 19일" tabindex="-1">19</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 20일" tabindex="-1">20</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 21일" tabindex="-1">21</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 22일" tabindex="-1">22</button>
      </div>
      <div class="cal__week" role="row">
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 23일" tabindex="-1">23</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 24일" tabindex="-1">24</button>
        <button class="cal__day cal__day--selected" role="gridcell" aria-label="2025년 11월 25일, 선택됨" aria-selected="true" tabindex="0">25</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 26일" tabindex="-1">26</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 27일" tabindex="-1">27</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 28일" tabindex="-1">28</button>
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 29일" tabindex="-1">29</button>
      </div>
      <div class="cal__week" role="row">
        <button class="cal__day" role="gridcell" aria-label="2025년 11월 30일" tabindex="-1">30</button>
        <button class="cal__day cal__day--outside" role="gridcell" aria-label="2025년 12월 1일" tabindex="-1">1</button>
        <button class="cal__day cal__day--outside" role="gridcell" aria-label="2025년 12월 2일" tabindex="-1">2</button>
        <button class="cal__day cal__day--outside" role="gridcell" aria-label="2025년 12월 3일" tabindex="-1">3</button>
        <button class="cal__day cal__day--outside" role="gridcell" aria-label="2025년 12월 4일" tabindex="-1">4</button>
        <button class="cal__day cal__day--outside" role="gridcell" aria-label="2025년 12월 5일" tabindex="-1">5</button>
        <button class="cal__day cal__day--outside" role="gridcell" aria-label="2025년 12월 6일" tabindex="-1">6</button>
      </div>
    </div>
  </div>
</div>
:::

---

## CSS

```css
/* ── Root ── */
.dp {
  display: inline-flex;
  flex-direction: column;
  width: 280px;
  background: var(--color-surface-base);
  user-select: none;
}

/* ── Trigger row ── */
.dp__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--height-base);
  padding: 0 var(--space-gap-xs);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  gap: var(--space-gap-sm);
}

/* 날짜 영역: select + sep + day + weekday */
.dp__date {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  flex: 1;
  min-width: 0;
}

/* 연도·월 select — native appearance 제거 후 스타일링 */
.dp__select {
  appearance: none;
  -webkit-appearance: none;
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-surface-base);
  color: var(--color-text-display);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-ui);
  letter-spacing: var(--letter-spacing-normal);
  padding: 0 var(--space-gap-xs);
  height: var(--height-compact);
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--easing-base);
}
.dp__select:hover {
  border-color: var(--color-fill-brand);
}
.dp__select:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: 2px;
  border-color: var(--color-border-focus);
}

/* 구분자 */
.dp__sep {
  color: var(--color-text-subtle);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  flex-shrink: 0;
}

/* 일 텍스트 */
.dp__day {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-display);
  line-height: var(--line-height-ui);
  flex-shrink: 0;
}

/* 요일 텍스트 */
.dp__weekday {
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-body);
  color: var(--color-text-subtle);
  line-height: var(--line-height-ui);
  flex-shrink: 0;
}

/* 액션 영역: 오늘 버튼 + 토글 버튼 */
.dp__actions {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  flex-shrink: 0;
}

/* 오늘 버튼 — ghost 소형 */
.dp__today {
  display: inline-flex;
  align-items: center;
  height: var(--height-compact);
  padding: 0 var(--space-gap-sm);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text-body);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-body);
  line-height: var(--line-height-ui);
  cursor: pointer;
  transition: background var(--duration-fast) var(--easing-base),
              border-color var(--duration-fast) var(--easing-base);
}
.dp__today:hover {
  background: var(--color-action-neutral-hover);
  border-color: var(--color-fill-brand);
}
.dp__today:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: 2px;
}

/* 토글 버튼 */
.dp__toggle {
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
.dp__toggle:hover {
  background: var(--color-action-neutral-hover);
  color: var(--color-text-body);
}
.dp__toggle:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: 2px;
}
/* 열린 상태 — 아이콘 회전은 JS로 클래스 토글 */
.dp__toggle[aria-expanded="true"] {
  color: var(--color-fill-brand);
}

/* ── Panel ── */
/* 기본 표시. 패널 숨길 때는 JS로 hidden 속성 추가 */
.dp__panel {
  display: block;
  padding-top: var(--space-gap-sm);
}
.dp__panel[hidden] {
  display: none;
}

/* ── Month nav ── */
/* nav 버튼 두 개를 패널 우측에 나란히 배치 */
.dp__nav {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-gap-xs);
  margin-bottom: var(--space-gap-xs);
}

.dp__nav-btn {
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
.dp__nav-btn:hover {
  background: var(--color-action-neutral-hover);
  color: var(--color-text-body);
}
.dp__nav-btn:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: 2px;
}
```

---

## 접근성

| 요소 | 마크업 |
|------|--------|
| 연도 select | `aria-label="연도"` |
| 월 select | `aria-label="월"` |
| 토글 버튼 | `aria-expanded="true|false"` + `aria-label="캘린더 열기/닫기"` |
| 이전 달 버튼 | `aria-label="이전 달"` |
| 다음 달 버튼 | `aria-label="다음 달"` |
| 캘린더 그리드 | Calendar Atom의 `role="grid"` + `aria-label="YYYY년 M월"` 패턴 그대로 사용 |

패널이 닫힐 때 `hidden` 속성을 추가해 스크린 리더에서도 접근 불가 처리한다. `display:none`을 직접 쓰는 대신 `hidden` 속성을 토글해 HTML 시맨틱을 유지한다.

### 키보드 내비게이션

| 키 | 동작 |
|----|------|
| `Tab` | 트리거 요소(select, 오늘 버튼, 토글) → 패널(이전/다음 달 버튼, 캘린더 그리드) 순환 |
| `Enter` / `Space` | 토글 버튼으로 패널 열기/닫기 |
| 그리드 내 키 | Calendar Atom 문서의 키보드 내비게이션 규칙을 따름 |
| `Esc` | 패널 닫기 (JS 구현) |

---

## Do / Don't

> ✅ DO — 패널 토글에 `hidden` 속성 사용
> `dp__panel.hidden = true` / `dp__panel.removeAttribute('hidden')`

> ❌ DON'T — `display:none`을 인라인으로 직접 조작
> `hidden` 속성이 있으면 CSS의 `[hidden] { display:none }` 규칙이 적용되어 시맨틱이 유지된다

> ✅ DO — 연도·월 변경 시 캘린더 그리드의 `aria-label`도 함께 업데이트
> `calGrid.setAttribute('aria-label', '2025년 12월')`

> ❌ DON'T — `data-component` 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용. 실제 구현 코드에서는 제거한다.

> ✅ DO — 오늘 버튼 클릭 시 select 값과 그리드를 오늘 날짜로 동기화
> select + 그리드 + trigger 텍스트를 모두 함께 업데이트해야 일관성이 유지된다

> ❌ DON'T — Calendar Atom의 `.cal__header`를 DatePicker와 함께 사용
> 헤더(이전/다음 달 nav)는 DatePicker Molecule의 `.dp__nav`가 담당한다. Calendar Atom은 그리드(`.cal__grid`)만 포함한다.
