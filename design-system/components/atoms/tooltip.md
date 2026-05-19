---
file: components/atoms/tooltip.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/elevation.md
---

# Tooltip

## 개요

트리거 요소에 hover 또는 focus 시 보조 설명을 표시한다. 인터랙션에 필수적인 정보는 Tooltip에 두지 않는다 — 키보드 사용자도 접근할 수 있어야 하며, 모바일에서는 hover가 없다.

---

## Anatomy

<!-- AI: trigger(.tooltip-trigger), panel(.tooltip-panel). panel의 위치는 JS로 동적 계산하고 placement 클래스로 방향을 지정한다. -->

```html
<!-- hover·focus 시 표시 -->
<span class="tooltip-wrapper">
  <button class="tooltip-trigger btn btn--ghost btn--md btn--icon-only" aria-label="도움말" aria-describedby="tip-1">
    <span aria-hidden="true"><!-- icon --></span>
  </button>
  <div class="tooltip-panel tooltip-panel--top" id="tip-1" role="tooltip">
    최대 100자까지 입력할 수 있어요
  </div>
</span>
```

:::preview
<style>
  .tooltip-wrapper { position: relative; display: inline-block; }
  .tooltip-trigger { all: unset; cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: var(--radius-sm);
    background: var(--color-surface-neutral); color: var(--color-text-label); font-family: var(--font-family-base); }
  .tooltip-trigger:focus-visible { outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px; }
  .tooltip-panel {
    position: absolute; z-index: 100;
    padding: var(--space-inset-sm);
    background: var(--color-surface-dark);
    color: var(--color-text-inverse);
    border-radius: var(--radius-sm);
    font-family: var(--font-family-base);
    font-size: var(--font-size-label);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.1s;
  }
  .tooltip-panel--top { bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%); }
  .tooltip-panel--bottom { top: calc(100% + 6px); left: 50%; transform: translateX(-50%); }
  .tooltip-wrapper:hover .tooltip-panel,
  .tooltip-trigger:focus-visible ~ .tooltip-panel { opacity: 1; }
</style>
<div style="display:flex; gap:32px; align-items:center; padding: 32px 16px;">
  <span class="tooltip-wrapper">
    <button class="tooltip-trigger" aria-describedby="tip-top">?</button>
    <div class="tooltip-panel tooltip-panel--top" id="tip-top" role="tooltip">위쪽 툴팁</div>
  </span>
  <span class="tooltip-wrapper">
    <button class="tooltip-trigger" aria-describedby="tip-bottom">?</button>
    <div class="tooltip-panel tooltip-panel--bottom" id="tip-bottom" role="tooltip">아래쪽 툴팁</div>
  </span>
</div>
:::

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| placement | top · bottom · left · right | top |

---

## 접근성

비인터랙티브 패널 + 인터랙티브 트리거 구조.

트리거에 `aria-describedby`로 패널 연결. 패널에 `role="tooltip"` + `id` 필수.

hover와 focus 양쪽에서 표시. 키보드 `Esc`로 닫기.

```js
trigger.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideTooltip();
});
```

---

## Do / Don't

> ✅ DO — 트리거에 `aria-describedby`로 패널 연결
> `<button aria-describedby="tip-1">` + `<div id="tip-1" role="tooltip">`

> ❌ DON'T — 필수 정보를 Tooltip에만 표시
> 모바일·키보드 사용자가 접근 못할 수 있다. 필수 정보는 항상 노출 상태로 유지

> ❌ DON'T — 긴 텍스트나 인터랙티브 요소를 Tooltip 안에 배치
> Tooltip은 간단한 보조 설명용. 복잡한 내용은 Popover 또는 Modal 사용
