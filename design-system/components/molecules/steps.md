---
file: components/molecules/steps.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, components/atoms/icon.md
---

# Steps

## 개요

다단계 프로세스(마법사·폼 분기)에서 현재 위치와 전체 진행 상태를 표시하는 네비게이션 보조 컴포넌트. 각 단계를 번호 또는 아이콘 + 레이블로 표현하고, 완료·현재·미완료 세 가지 상태를 구분한다.

Pagination과의 차이 — 페이지 넘김이 아닌 **프로세스 완료 흐름**을 표현한다. 단계는 앞/뒤가 아닌 선형으로 진행되며 상태가 유지된다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| orientation | horizontal · vertical | horizontal |
| step state | complete · current · upcoming | — |

---

## 사용 지침

### 제약

- 최소 2단계, 권장 최대 7단계. 단계가 많으면 가로형 레이블이 겹치므로 세로형을 사용한다.
- 각 단계는 반드시 레이블(`.steps__label`)을 포함한다. 레이블 없이 번호만 사용하면 맥락을 잃는다.
- 완료 단계(`.steps__node--complete`)에는 체크 아이콘을 표시한다.
- Steps 자체를 클릭 가능한 네비게이션으로 만들려면 `.steps__node`를 `<button>` 또는 `<a>`로 렌더링하고 disabled 처리한다. 단순 진행 표시자로 쓸 때는 인터랙션 없는 `<div>`를 사용한다.

---

## Anatomy

<!-- AI:
- root = ol.steps. 순서가 있는 단계 목록.
  - orientation: 기본(horizontal) — 클래스 없음. 세로: ol.steps.steps--vertical
- li.steps__item: 각 단계 항목. 상태 클래스를 추가한다.
  - 완료: li.steps__item.steps__item--complete
  - 현재: li.steps__item.steps__item--current
  - 미완료: li.steps__item (클래스 없음)
- .steps__node: 단계 번호/아이콘 원형 인디케이터.
  - 완료: 번호 대신 체크 아이콘(icon-check) 표시
  - 현재·미완료: 번호 텍스트
- .steps__label: 단계 텍스트 레이블.
- .steps__connector: 단계 간 연결선. 마지막 li에는 포함하지 않는다.
  - 완료 단계의 connector: background color가 브랜드색
  - 가로형: 수평선(flex-grow). 세로형: 수직선(height 고정)
-->

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl)">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형 — 3단계 (2번째 진행 중)</p>
  <ol data-component class="steps" aria-label="진행 단계">
    <li class="steps__item steps__item--complete">
      <div class="steps__node">
        <svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-check"/></svg>
      </div>
      <span class="steps__label text-form-label">기본 정보</span>
      <div class="steps__connector" aria-hidden="true"></div>
    </li>
    <li class="steps__item steps__item--current" aria-current="step">
      <div class="steps__node"><span aria-hidden="true">2</span></div>
      <span class="steps__label text-form-label">상세 정보</span>
      <div class="steps__connector" aria-hidden="true"></div>
    </li>
    <li class="steps__item">
      <div class="steps__node"><span aria-hidden="true">3</span></div>
      <span class="steps__label text-form-label">검토 및 제출</span>
    </li>
  </ol>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형 — 4단계 (3번째 진행 중)</p>
  <ol data-component class="steps steps--vertical" aria-label="진행 단계">
    <li class="steps__item steps__item--complete">
      <div class="steps__node">
        <svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-check"/></svg>
      </div>
      <div class="steps__content">
        <span class="steps__label text-form-label">계정 생성</span>
      </div>
      <div class="steps__connector" aria-hidden="true"></div>
    </li>
    <li class="steps__item steps__item--complete">
      <div class="steps__node">
        <svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-check"/></svg>
      </div>
      <div class="steps__content">
        <span class="steps__label text-form-label">프로필 설정</span>
      </div>
      <div class="steps__connector" aria-hidden="true"></div>
    </li>
    <li class="steps__item steps__item--current" aria-current="step">
      <div class="steps__node"><span aria-hidden="true">3</span></div>
      <div class="steps__content">
        <span class="steps__label text-form-label">권한 설정</span>
      </div>
      <div class="steps__connector" aria-hidden="true"></div>
    </li>
    <li class="steps__item">
      <div class="steps__node"><span aria-hidden="true">4</span></div>
      <div class="steps__content">
        <span class="steps__label text-form-label">완료</span>
      </div>
    </li>
  </ol>
</div>

</div>
:::

---

## CSS

```css
/* ── Base (가로형) ── */
.steps {
  display: flex;
  align-items: flex-start;
  list-style: none;
  margin: 0;
  padding: 0;
}

.steps__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}

/* 마지막 항목은 flex grow 없음 */
.steps__item:last-child {
  flex: 0 0 auto;
}

/* ── Node (번호/아이콘 원형) ── */
.steps__node {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--height-compact);
  height: var(--height-compact);
  border-radius: var(--radius-pill);
  border: var(--stroke-md) solid var(--color-border-default);
  background: var(--color-surface-base);
  color: var(--color-text-subtle);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-heading);
  line-height: var(--line-height-ui);
  flex-shrink: 0;
  z-index: 1;
}

/* ── Node: complete ── */
.steps__item--complete .steps__node {
  border-color: var(--color-fill-brand);
  background: var(--color-fill-brand);
  color: var(--color-text-inverse);
}

/* ── Node: current ── */
.steps__item--current .steps__node {
  border-color: var(--color-border-brand);
  background: var(--color-surface-base);
  color: var(--color-text-brand);
  box-shadow: 0 0 0 3px var(--color-action-brand-subtle);
}

/* ── Label ── */
.steps__label {
  margin-top: var(--space-gap-xs);
  color: var(--color-text-subtle);
  text-align: center;
  white-space: nowrap;
}

.steps__item--complete .steps__label {
  color: var(--color-text-label);
}

.steps__item--current .steps__label {
  color: var(--color-text-brand);
  font-weight: var(--font-weight-heading);
}

/* ── Connector (가로형) ── */
.steps__connector {
  position: absolute;
  top: calc(var(--height-compact) / 2);
  left: calc(50% + var(--height-compact) / 2 + var(--space-gap-xs));
  right: calc(-50% + var(--height-compact) / 2 + var(--space-gap-xs));
  height: var(--stroke-sm);
  background: var(--color-border-subtle);
}

/* 완료 단계의 connector는 브랜드색 */
.steps__item--complete .steps__connector {
  background: var(--color-fill-brand);
}

/* ── Vertical ── */
.steps--vertical {
  flex-direction: column;
  align-items: stretch;
}

.steps--vertical .steps__item {
  flex-direction: row;
  align-items: flex-start;
  flex: 0 0 auto;
  gap: var(--space-gap-sm);
  padding-bottom: var(--space-gap-xl);
  position: relative;
}

.steps--vertical .steps__item:last-child {
  padding-bottom: 0;
}

.steps--vertical .steps__content {
  display: flex;
  flex-direction: column;
  padding-top: var(--space-gap-2xs);
}

.steps--vertical .steps__label {
  margin-top: 0;
  text-align: left;
  white-space: normal;
}

/* vertical connector: 세로 선 */
.steps--vertical .steps__connector {
  position: absolute;
  top: calc(var(--height-compact) + var(--space-gap-xs));
  left: calc(var(--height-compact) / 2 - var(--stroke-sm) / 2);
  right: auto;
  width: var(--stroke-sm);
  height: calc(100% - var(--height-compact) - var(--space-gap-xs));
}
```

---

## 접근성

순서 목록 유형 (`design-system/accessibility.md` 네비게이션 행 적용).

| 상황 | 마크업 |
|------|--------|
| 루트 | `<ol aria-label="진행 단계">` — 순서 있는 목록으로 단계 순서 전달 |
| 현재 단계 | `<li aria-current="step">` — 스크린리더에 현재 위치 전달 |
| 완료 단계 체크 아이콘 | `<svg aria-hidden="true">` — 시각적 장식, 텍스트 레이블로 상태 전달 |
| 단계 번호 | `<span aria-hidden="true">` — 번호는 장식, 순서는 `<ol>` 구조로 전달 |
| 연결선 | `aria-hidden="true"` — 스크린리더에 전달하지 않는다 |
| 키보드 | 인터랙티브 없는 표시 컴포넌트 — 탭 정지 없음. 클릭 가능 버전은 Tab으로 포커스 |

---

## Do / Don't

> ✅ DO — 현재 단계에 `aria-current="step"` 명시
> `<li class="steps__item steps__item--current" aria-current="step">`

> ❌ DON'T — 단계 수가 7개를 넘는 가로형 사용
> 레이블이 겹치고 가독성이 떨어진다. 세로형(`steps--vertical`)을 사용하거나 단계를 그룹화한다

> ✅ DO — 완료 단계에 체크 아이콘 + 브랜드 배경
> 번호만 남기면 완료 여부를 색상만으로 구분해야 한다

> ❌ DON'T — 레이블 없이 번호 인디케이터만 표시
> `.steps__label`을 생략하면 단계 맥락을 알 수 없다. 공간이 부족하면 세로형 전환

> ❌ DON'T — Steps를 페이지 내 목차로 사용
> 섹션 이동 네비게이션에는 `SidebarNav` 또는 `Tab`을 사용한다
