---
file: components/atoms/tooltip.md
version: 1.2.1
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/shadow.md, tokens/height.md, tokens/z-index.md
---

# Tooltip

## 개요

트리거 요소에 hover 또는 focus 시 보조 설명을 표시하는 비인터랙티브 패널. 인터랙션에 필수적인 정보는 Tooltip에 두지 않는다 — 키보드 사용자도 접근할 수 있어야 하며, 모바일에서는 hover가 없다.

Button, Input 등 다른 컴포넌트와의 구별 — Tooltip은 단독으로 존재하지 않으며 반드시 트리거 요소 위에 오버레이된다. 긴 설명이나 인터랙티브 요소가 필요하면 Popover 또는 Modal을 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| placement | top · bottom · left · right | top (기본, 클래스 없음) |

**max-width 240px** — 텍스트가 240px을 초과하면 자동 줄바꿈. 100자 이내 권장.

<!-- AI: placement는 JS가 뷰포트 경계 감지 후 동적으로 변경한다. CSS는 방향별 위치만 정의한다. -->

---

## 사용 지침

### 트리거 요소 선택 기준

| 상황 | 트리거 |
|------|--------|
| 아이콘 버튼(icon-only) 레이블 보조 | `<button>` + `aria-label` + `aria-describedby` |
| 텍스트 잘림(truncate) 전체 내용 표시 | 잘린 요소 자체를 트리거로 사용 |
| 폼 필드 힌트 | Input 옆 도움말 아이콘 버튼 — FormField 내부에서 사용 |

### 제약

- Tooltip 내부에 인터랙티브 요소(버튼, 링크) 금지 — Popover 사용
- 100자 이상 긴 텍스트 금지
- 모바일 환경에서는 hover 없음 — 필수 정보는 항상 노출 상태로 유지

---

## 동작

<!-- AI: hover·focus 진입 시 .tooltip-panel에 .tooltip-panel--visible 클래스를 추가해 opacity: 1로 전환한다. Escape 키로 닫는다. -->

| 이벤트 | 클래스 변화 | aria 변화 |
|--------|------------|-----------|
| `mouseenter` / `focus` | `.tooltip-panel--visible` 추가 | — |
| `mouseleave` / `blur` | `.tooltip-panel--visible` 제거 | — |
| `Escape` keydown | `.tooltip-panel--visible` 제거 | — |

```js
// tooltip 표시
function showTooltip(wrapper) {
  wrapper.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible');
}
// tooltip 숨김
function hideTooltip(wrapper) {
  wrapper.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible');
}

wrapper.addEventListener('mouseenter', () => showTooltip(wrapper));
wrapper.addEventListener('mouseleave', () => hideTooltip(wrapper));
trigger.addEventListener('focus',      () => showTooltip(wrapper));
trigger.addEventListener('blur',       () => hideTooltip(wrapper));
trigger.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideTooltip(wrapper);
});
```

---

## Anatomy

<!-- AI:
- root = span.tooltip-wrapper — position: relative 부모. display: inline-block으로 트리거 크기에 맞춤.
- trigger = button.tooltip-trigger — 인터랙티브 요소. hover·focus 이벤트 수신. aria-label(icon-only)과 aria-describedby(패널 id) 필수.
- panel = div.tooltip-panel — role="tooltip" + id 필수. pointer-events: none으로 패널 자체는 인터랙션 받지 않음.
- placement 클래스(tooltip-panel--top 등)로 방향 결정. 기본값 top은 클래스 없음. JS가 뷰포트 경계 감지 후 동적 변경 가능.
- 표시 상태: .tooltip-panel--visible 클래스 추가 시 opacity: 1.
- 화살표: placement 클래스에 따라 ::after 가상 요소로 자동 생성. HTML 추가 불필요.
- max-width: 240px. 텍스트 초과 시 word-break: keep-all 기준으로 줄바꿈.
- 트리거는 icon-only 버튼이 일반적이나, 텍스트 잘림 요소 등 다른 요소도 가능 — 이 경우 tooltip-trigger 클래스만 추가하고 btn 클래스는 생략.
-->

:::preview
<div style="display:grid; grid-template-columns: repeat(3, auto); gap: var(--space-48); justify-content:center; align-items:center; padding: var(--space-48);">

  <div></div>
  <span data-component class="tooltip-wrapper">
    <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-top-demo">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
    </button>
    <div class="tooltip-panel tooltip-panel--top tooltip-panel--visible" id="tip-top-demo" role="tooltip">위쪽 툴팁</div>
  </span>
  <div></div>

  <span data-component class="tooltip-wrapper">
    <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-left-demo">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
    </button>
    <div class="tooltip-panel tooltip-panel--left tooltip-panel--visible" id="tip-left-demo" role="tooltip">왼쪽 툴팁</div>
  </span>
  <div></div>
  <span data-component class="tooltip-wrapper">
    <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-right-demo">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
    </button>
    <div class="tooltip-panel tooltip-panel--right tooltip-panel--visible" id="tip-right-demo" role="tooltip">오른쪽 툴팁</div>
  </span>

  <div></div>
  <span data-component class="tooltip-wrapper">
    <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-bottom-demo">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
    </button>
    <div class="tooltip-panel tooltip-panel--bottom tooltip-panel--visible" id="tip-bottom-demo" role="tooltip">아래쪽 툴팁</div>
  </span>
  <div></div>

</div>
:::

:::preview
<div style="display:flex; justify-content:center; padding: var(--space-48);">
  <span data-component class="tooltip-wrapper">
    <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-wrap-demo">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
    </button>
    <div class="tooltip-panel tooltip-panel--top tooltip-panel--visible" id="tip-wrap-demo" role="tooltip">최대 100자까지 입력할 수 있어요. 특수문자와 공백도 모두 포함됩니다.</div>
  </span>
</div>
:::

```html
<!-- 기본 사용 — icon-only 버튼 트리거 -->
<span class="tooltip-wrapper">
  <button class="tooltip-trigger"
          aria-label="도움말"
          aria-describedby="tip-1">
    <span class="icon icon--sm" aria-hidden="true">
      <svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg>
    </span>
  </button>
  <div class="tooltip-panel tooltip-panel--top" id="tip-1" role="tooltip">
    최대 100자까지 입력할 수 있어요
  </div>
</span>
```

---

## CSS

```css
/* ── Base ── */
/* tooltip-wrapper: position: relative로 panel의 absolute 기준점 역할 */
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

/* ── Trigger ── */
/* icon-only 버튼을 기본 트리거로 사용 — .btn 클래스 없이 단독 정의 (height-dense/radius-xs는 .btn 기본값과 충돌) */
/* height · width: height-dense(28px) — 인라인 밀도 영역 기준 */
.tooltip-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--height-dense);
  width: var(--height-dense);
  border-radius: var(--radius-xs);
  border: none;
  background: transparent;
  color: var(--color-text-subtle);
  cursor: pointer;
  padding: 0;
  transition: background var(--duration-fast) var(--easing-base);
}

/* ── Trigger: 상태 ── */
.tooltip-trigger:hover {
  background: var(--color-action-neutral-hover);
  color: var(--color-text-label);
}

/* focus-visible 전용 — :focus 단독 사용 금지 (비키보드 클릭 시 outline 미표시) */
.tooltip-trigger:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* disabled trigger는 pointer-events: none + tabindex="-1"로 차단 — CSS 클래스 단독 금지 */
.tooltip-trigger:disabled,
.tooltip-trigger[aria-disabled="true"] {
  pointer-events: none;
  color: var(--color-text-disabled);
}

/* ── Panel: Base ── */
/* position: absolute — 부모 tooltip-wrapper의 position: relative 기준 */
/* pointer-events: none — 패널 자체에 마우스 이벤트 금지. 트리거 hover가 해제되지 않도록 함 */
/* text-tooltip 유틸리티 클래스 대신 개별 속성 직접 지정 — panel은 div 요소이므로 font-family 상속이 보장되지 않을 수 있어 명시 */
/* max-width: 240px — 직접 토큰 없음. 100자 이내 텍스트 기준 줄바꿈 임계값 */
.tooltip-panel {
  position: absolute;
  z-index: var(--z-tooltip);
  max-width: 240px;
  padding: var(--space-inset-squish-sm);
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-ui);
  letter-spacing: var(--letter-spacing-default);
  font-weight: var(--font-weight-body);
  white-space: normal;
  word-break: keep-all;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.1s ease;
}

/* ── Panel: 표시 상태 ── */
/* JS가 .tooltip-panel--visible 클래스 추가 시 표시. CSS :hover 대신 클래스 제어를 원칙으로 함 */
.tooltip-panel--visible {
  opacity: 1;
}

/* ── Panel: Placement ── */
/* gap = space-gap-xs(4px) — 트리거와 패널 사이 간격. ::after 화살표가 이 gap을 채운다 */
/* transform: translateX/Y(-50%)로 트리거 중앙 정렬 */
/* placement 기본값 top — 클래스 없음. 나머지 방향은 명시적 클래스 필요 */
.tooltip-panel--top {
  bottom: calc(100% + var(--space-gap-xs));
  left: 50%;
  transform: translateX(-50%);
}
.tooltip-panel--bottom {
  top: calc(100% + var(--space-gap-xs));
  left: 50%;
  transform: translateX(-50%);
}
.tooltip-panel--left {
  right: calc(100% + var(--space-gap-xs));
  top: 50%;
  transform: translateY(-50%);
}
.tooltip-panel--right {
  left: calc(100% + var(--space-gap-xs));
  top: 50%;
  transform: translateY(-50%);
}

/* ── Panel: Arrow ── */
/* CSS border 삼각형. 크기 = space-gap-xs(4px) — 패널 offset과 일치해 gap을 정확히 채움 */
/* HTML 추가 없이 ::after로 자동 생성 */
.tooltip-panel--top::after,
.tooltip-panel--bottom::after,
.tooltip-panel--left::after,
.tooltip-panel--right::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: var(--space-gap-xs) solid transparent;
}
/* top → 아래 방향 화살표 */
.tooltip-panel--top::after {
  bottom: calc(-1 * var(--space-gap-xs));
  left: 50%;
  transform: translateX(-50%);
  border-top-color: var(--color-surface-dark);
  border-bottom-width: 0;
}
/* bottom → 위 방향 화살표 */
.tooltip-panel--bottom::after {
  top: calc(-1 * var(--space-gap-xs));
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: var(--color-surface-dark);
  border-top-width: 0;
}
/* left → 오른쪽 방향 화살표 */
.tooltip-panel--left::after {
  right: calc(-1 * var(--space-gap-xs));
  top: 50%;
  transform: translateY(-50%);
  border-left-color: var(--color-surface-dark);
  border-right-width: 0;
}
/* right → 왼쪽 방향 화살표 */
.tooltip-panel--right::after {
  left: calc(-1 * var(--space-gap-xs));
  top: 50%;
  transform: translateY(-50%);
  border-right-color: var(--color-surface-dark);
  border-left-width: 0;
}
```

---

## 접근성

비인터랙티브 패널 + 인터랙티브 트리거 구조.

| 항목 | 마크업 |
|------|--------|
| 패널 역할 | `role="tooltip"` + `id` 필수 |
| 트리거-패널 연결 | 트리거에 `aria-describedby="[패널 id]"` |
| icon-only 트리거 레이블 | 트리거에 `aria-label` 필수 — 아이콘만으로 용도 식별 불가 |
| 키보드 접근 | hover와 `focus` 양쪽에서 표시 — Tab으로 트리거 포커스 시 자동 노출 |
| 키보드 닫기 | `Escape` 키로 닫기 |
| focus ring | `:focus-visible` 전용. `outline` 사용 — `box-shadow` 대체 금지 |
| 색상만으로 상태 구분 금지 | tooltip 내용은 텍스트로만 전달 |

```js
trigger.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideTooltip(wrapper);
});
```

---

## Do / Don't

> ✅ DO — 트리거에 `aria-describedby`로 패널 연결, 패널에 `id`와 `role="tooltip"` 명시
> `<button aria-describedby="tip-1">` + `<div id="tip-1" role="tooltip">`

> ✅ DO — icon-only 트리거에 `aria-label` 추가
> `<button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-1">`

> ✅ DO — 대체 컴포넌트 선택: 인터랙티브 요소가 필요하면 Popover, 중요 정보는 Modal 사용

> ❌ DON'T — 필수 정보를 Tooltip에만 표시
> 모바일·키보드 사용자가 접근 못할 수 있다. 필수 정보는 항상 노출 상태로 유지

> ❌ DON'T — 긴 텍스트(100자 초과)나 인터랙티브 요소를 Tooltip 안에 배치
> 간단한 보조 설명 전용. 복잡한 내용은 Popover 또는 Modal 사용. 100자 이내 텍스트는 max-width(240px) 내에서 자동 줄바꿈됨

> ❌ DON'T — `<style>` 블록을 preview 안에 직접 작성
> CSS는 `## CSS` 섹션에 작성하면 뷰어가 자동 주입한다

> ❌ DON'T — 패널 gap에 px 하드코딩
> `bottom: calc(100% + 6px)` 대신 `bottom: calc(100% + var(--space-gap-xs))` 사용

> ❌ DON'T — `:focus` 단독 사용
> `tooltip-trigger:focus { outline: ... }` 대신 `:focus-visible` 사용 — 마우스 클릭 시 outline 미표시

> ❌ DON'T — preview 컨테이너 여백에 px 하드코딩
> `padding: 48px 24px` 대신 `padding: var(--space-inset-3xl) var(--space-inset-2xl)` 사용
