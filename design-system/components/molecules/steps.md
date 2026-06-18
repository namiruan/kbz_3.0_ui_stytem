---
file: components/molecules/steps.md
version: 0.10.1
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, tokens/height.md, tokens/radius.md, tokens/icon.md, components/atoms/icon.md, components/atoms/action-group.md, components/atoms/button.md
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
| step state | complete · current · upcoming | upcoming (기본, 클래스 없음) |

---

## 사용 지침

### 제약

- 최소 2단계, 권장 최대 7단계. 단계가 많으면 가로형 레이블이 겹치므로 세로형을 사용한다.
- 각 단계는 반드시 레이블(`.steps__label`)을 포함한다. 레이블 없이 번호만 사용하면 맥락을 잃는다.
- 완료 단계에는 번호 대신 체크 아이콘을 표시한다.

---

## 동작

<!-- AI:
- goToStep(n): steps__item 상태 클래스를 일괄 재계산한다.
  - index < n → steps__item--complete
  - index === n → steps__item--current + aria-current="step"
  - index > n → 클래스 없음(upcoming)
- connector는 ::after pseudo-element로 렌더링되므로 JS에서 별도 조작 없이 클래스만 갱신하면 된다.
- 이전/다음 버튼은 Steps 외부 컴포넌트(Form, Modal 등)가 제어한다.
-->

```js init
function initSteps(container) {
  var list = container.querySelector('#st-demo');
  if (!list || list.hasAttribute('data-init-steps')) return;
  list.setAttribute('data-init-steps', '');

  var items = container.querySelectorAll('#st-demo .steps__item');
  var prevBtn = container.querySelector('#st-prev');
  var nextBtn = container.querySelector('#st-next');
  var current = 1;
  var CHECK = '<svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="#icon-check"/></svg>';

  function update() {
    items.forEach(function(item, i) {
      item.classList.remove('steps__item--complete', 'steps__item--current');
      item.removeAttribute('aria-current');
      var node = item.querySelector('.steps__node');
      if (i < current) {
        item.classList.add('steps__item--complete');
        node.innerHTML = CHECK;
      } else if (i === current) {
        item.classList.add('steps__item--current');
        item.setAttribute('aria-current', 'step');
        node.innerHTML = '<span aria-hidden="true">' + (i + 1) + '</span>';
      } else {
        node.innerHTML = '<span aria-hidden="true">' + (i + 1) + '</span>';
      }
    });
    prevBtn.disabled = current === 0;
    nextBtn.textContent = current === items.length - 1 ? '완료' : '다음';
  }

  prevBtn.addEventListener('click', function() { if (current > 0) { current--; update(); } });
  nextBtn.addEventListener('click', function() { if (current < items.length - 1) { current++; update(); } });
  update();
}

if (window.__componentInits && !window.__componentInits.initSteps) window.__componentInits.initSteps = initSteps;
```

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xl)">
  <ol id="st-demo" class="steps" aria-label="진행 단계">
    <li class="steps__item steps__item--complete">
      <div class="steps__node"><svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-check"/></svg></div>
      <span class="steps__label text-form-label">기본 정보</span>
    </li>
    <li class="steps__item steps__item--current" aria-current="step">
      <div class="steps__node"><span aria-hidden="true">2</span></div>
      <span class="steps__label text-form-label">상세 정보</span>
    </li>
    <li class="steps__item">
      <div class="steps__node"><span aria-hidden="true">3</span></div>
      <span class="steps__label text-form-label">검토 및 제출</span>
    </li>
  </ol>
  <div style="display:flex;justify-content:center">
    <div class="action-group" role="toolbar" aria-label="단계 탐색">
      <button id="st-prev" class="action-btn action-btn--md text-button-md" type="button">이전</button>
      <button id="st-next" class="action-btn action-btn--md text-button-md" type="button">다음</button>
    </div>
  </div>
</div>
<script>
initSteps(stage);
</script>
:::

---

## Anatomy

<!-- AI:
- root = ol.steps. 순서가 있는 단계 목록.
  - orientation: 기본(horizontal) — 클래스 없음. 세로: ol.steps.steps--vertical
- li.steps__item: 각 단계 항목. flex: 1로 모든 항목이 동일 너비를 가지며 노드가 중앙 정렬된다.
  - 완료: li.steps__item.steps__item--complete
  - 현재: li.steps__item.steps__item--current + aria-current="step"
  - upcoming: li.steps__item (클래스 없음, 기본값)
- .steps__node: 단계 번호/아이콘 원형 인디케이터. flex-shrink: 0.
  - 완료: 번호 대신 체크 아이콘(icon-check)
  - 현재·미완료: 번호 span[aria-hidden="true"]
- .steps__label: node 아래 단계 텍스트 레이블.
- connector: steps__item::after pseudo-element로 렌더링. HTML에 별도 요소 없음.
  - 가로형: 현재 노드 오른쪽 끝 → 다음 노드 왼쪽 끝 수평선
  - 세로형: 현재 노드 아래쪽 끝 → 다음 항목 상단 수직선
  - 완료 항목의 connector: 브랜드색. 미완료: subtle border색.
-->

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl)">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형 — 3단계 (2번째 진행 중)</p>
  <ol data-component class="steps" aria-label="진행 단계">
    <li class="steps__item steps__item--complete">
      <div class="steps__node"><svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-check"/></svg></div>
      <span class="steps__label text-form-label">기본 정보</span>
    </li>
    <li class="steps__item steps__item--current" aria-current="step">
      <div class="steps__node"><span aria-hidden="true">2</span></div>
      <span class="steps__label text-form-label">상세 정보</span>
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
      <div class="steps__node"><svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-check"/></svg></div>
      <span class="steps__label text-form-label">계정 생성</span>
    </li>
    <li class="steps__item steps__item--complete">
      <div class="steps__node"><svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-check"/></svg></div>
      <span class="steps__label text-form-label">프로필 설정</span>
    </li>
    <li class="steps__item steps__item--current" aria-current="step">
      <div class="steps__node"><span aria-hidden="true">3</span></div>
      <span class="steps__label text-form-label">권한 설정</span>
    </li>
    <li class="steps__item">
      <div class="steps__node"><span aria-hidden="true">4</span></div>
      <span class="steps__label text-form-label">완료</span>
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
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 모든 항목 flex: 1 — 동일 너비로 노드가 각 영역 중앙에 위치 */
/* padding은 노드 양쪽 여백 확보용. 50% 기준점은 padding 포함 전체 너비 기준이므로 connector 수식과 정합성 유지됨 */
.steps__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 var(--space-gap-xl);
}

/* ── Connector (가로형) — ::after pseudo-element ── */
/* 노드 끝에서 space-gap-xs(4px) 띄워 다음 노드까지 대칭 간격 */
.steps__item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: calc(var(--height-compact) / 2);
  left: calc(50% + var(--height-compact) / 2 + var(--space-gap-xs));
  right: calc(-50% + var(--height-compact) / 2 + var(--space-gap-xs));
  height: var(--stroke-sm);
  background: var(--color-border-subtle);
}

.steps__item--complete:not(:last-child)::after {
  background: var(--color-fill-brand);
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
  position: relative; /* connector(::after)가 노드 위로 겹치지 않도록 z-index 격리 */
  z-index: 1;
}

/* ── Node: complete ── */
/* border-color를 background와 동일하게 설정해 테두리 시각적으로 제거 */
.steps__item--complete .steps__node {
  border-color: var(--color-fill-brand);
  background: var(--color-fill-brand);
  color: var(--color-text-inverse);
}

/* ── Node: current ── */
/* box-shadow ring: stroke-md(2px) — connector gap(space-gap-xs=4px)보다 작게 유지해야 시각적 분리 유지됨 */
.steps__item--current .steps__node {
  border-color: var(--color-border-brand);
  background: var(--color-surface-base);
  color: var(--color-text-brand);
  box-shadow: 0 0 0 var(--stroke-md) var(--color-action-brand-subtle);
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

/* ── Vertical ── */
.steps--vertical {
  flex-direction: column;
  align-items: stretch;
}

.steps--vertical .steps__item {
  flex: 0 0 auto;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-gap-sm);
  padding: 0 0 var(--space-gap-xl) 0;
}

.steps--vertical .steps__item:last-child {
  padding-bottom: 0;
}

/* 세로형 connector: 노드 하단·다음 노드 상단 모두 space-gap-xs(4px) 대칭 간격 */
.steps--vertical .steps__item:not(:last-child)::after {
  top: calc(var(--height-compact) + var(--space-gap-xs));
  left: calc(var(--height-compact) / 2);
  right: auto;
  transform: translateX(-50%);
  width: var(--stroke-sm);
  height: calc(100% - var(--height-compact) - var(--space-gap-xs) * 2);
}

/* 세로형 label: node 중심에 수직 맞춤 */
.steps--vertical .steps__label {
  margin-top: calc((var(--height-compact) - var(--font-size-sm)) / 2);
  text-align: left;
  white-space: normal;
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
| connector | `::after` pseudo-element — CSS 생성 콘텐츠는 접근성 트리에서 자동 제외 |
| 키보드 | 인터랙티브 없는 표시 컴포넌트 — 탭 정지 없음. 이전/다음 버튼은 외부 컨텍스트가 제공한다 |

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
