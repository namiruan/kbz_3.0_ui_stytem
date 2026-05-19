---
file: components/atoms/button.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md
---

# Button

## 개요

사용자의 단일 액션을 트리거하는 컴포넌트. 페이지 이동에는 `<a>`를 사용하고, 동작 실행에는 Button을 사용한다.

---

## Anatomy

<!-- AI: root(.btn), label(텍스트, optional), icon(아이콘 span, optional), spinner(로딩 아이콘 span, optional) -->

### Primary

:::preview
<!-- fill: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <button data-component class="btn btn--primary btn--sm text-button-sm">버튼</button>
  <button data-component class="btn btn--primary btn--md text-button-md">버튼</button>
  <button data-component class="btn btn--primary btn--lg text-button-lg">버튼</button>
</div>
<!-- solid: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">solid</span>
  <button data-component class="btn btn--primary btn--solid btn--sm text-button-sm">버튼</button>
  <button data-component class="btn btn--primary btn--solid btn--md text-button-md">버튼</button>
  <button data-component class="btn btn--primary btn--solid btn--lg text-button-lg">버튼</button>
</div>
:::

### Secondary

:::preview
<!-- fill: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <button data-component class="btn btn--secondary btn--sm text-button-sm">버튼</button>
  <button data-component class="btn btn--secondary btn--md text-button-md">버튼</button>
  <button data-component class="btn btn--secondary btn--lg text-button-lg">버튼</button>
</div>
<!-- solid: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">solid</span>
  <button data-component class="btn btn--secondary btn--solid btn--sm text-button-sm">버튼</button>
  <button data-component class="btn btn--secondary btn--solid btn--md text-button-md">버튼</button>
  <button data-component class="btn btn--secondary btn--solid btn--lg text-button-lg">버튼</button>
</div>
:::

### Danger

:::preview
<!-- fill: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <button data-component class="btn btn--danger btn--sm text-button-sm">버튼</button>
  <button data-component class="btn btn--danger btn--md text-button-md">버튼</button>
  <button data-component class="btn btn--danger btn--lg text-button-lg">버튼</button>
</div>
<!-- solid: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">solid</span>
  <button data-component class="btn btn--danger btn--solid btn--sm text-button-sm">버튼</button>
  <button data-component class="btn btn--danger btn--solid btn--md text-button-md">버튼</button>
  <button data-component class="btn btn--danger btn--solid btn--lg text-button-lg">버튼</button>
</div>
:::

### Ghost

:::preview
<!-- fill: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <button data-component class="btn btn--ghost btn--sm text-button-sm">버튼</button>
  <button data-component class="btn btn--ghost btn--md text-button-md">버튼</button>
  <button data-component class="btn btn--ghost btn--lg text-button-lg">버튼</button>
</div>
<hr class="anatomy-divider">
<!-- icon-left: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-left</span>
  <button data-component class="btn btn--ghost btn--sm text-button-sm btn--icon-left"><span class="btn-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>버튼</button>
  <button data-component class="btn btn--ghost btn--md text-button-md btn--icon-left"><span class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>버튼</button>
  <button data-component class="btn btn--ghost btn--lg text-button-lg btn--icon-left"><span class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>버튼</button>
</div>
<!-- icon-right: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-right</span>
  <button data-component class="btn btn--ghost btn--sm text-button-sm btn--icon-right">버튼<span class="btn-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span></button>
  <button data-component class="btn btn--ghost btn--md text-button-md btn--icon-right">버튼<span class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span></button>
  <button data-component class="btn btn--ghost btn--lg text-button-lg btn--icon-right">버튼<span class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span></button>
</div>
<!-- icon-only: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-only</span>
  <button data-component class="btn btn--ghost btn--sm btn--icon-only" aria-label="메뉴"><span class="btn-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>
  <button data-component class="btn btn--ghost btn--md btn--icon-only" aria-label="메뉴"><span class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>
  <button data-component class="btn btn--ghost btn--lg btn--icon-only" aria-label="메뉴"><span class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>
</div>
:::

### Disabled

:::preview
<!-- disabled: sm / md / lg — pointer-events: none, aria-disabled -->
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <button data-component class="btn btn--primary btn--sm text-button-sm btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
  <button data-component class="btn btn--primary btn--md text-button-md btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
  <button data-component class="btn btn--primary btn--lg text-button-lg btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
</div>
<!-- icon-only disabled -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-only</span>
  <button data-component class="btn btn--primary btn--sm btn--icon-only btn--disabled" disabled aria-disabled="true" tabindex="-1" aria-label="추가"><span class="btn-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>
  <button data-component class="btn btn--primary btn--md btn--icon-only btn--disabled" disabled aria-disabled="true" tabindex="-1" aria-label="추가"><span class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>
  <button data-component class="btn btn--primary btn--lg btn--icon-only btn--disabled" disabled aria-disabled="true" tabindex="-1" aria-label="추가"><span class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>
</div>
:::

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | primary · secondary · danger · ghost | primary |
| type | fill · solid (ghost 제외) | fill |
| size | sm · md · lg | md |
| icon | icon-left · icon-right · icon-only | — |

---

## CSS

```css
/* ── Base ── */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--space-gap-xs);
  border: var(--stroke-sm) var(--stroke-solid) transparent;
  border-radius: var(--radius-pill);
  cursor: pointer;
  white-space: nowrap;
  transition: transform var(--duration-fast) var(--easing-base);
}
.btn:hover { transform: scale(var(--scale-interactive-hover)); }

/* ── Size ── */
.btn--sm { height: var(--height-compact);   padding: var(--space-inset-squish-sm); }
.btn--md { height: var(--height-base);      padding: var(--space-inset-squish-md); }
.btn--lg { height: var(--height-spacious);  padding: var(--space-inset-squish-lg); }

/* ── Style: fill (default) ── */
.btn--primary   { background: var(--color-background-brand);   color: var(--color-text-inverse); border-color: var(--color-background-brand); }
.btn--secondary { background: var(--color-background-neutral); color: var(--color-text-inverse); border-color: var(--color-background-neutral); }
.btn--danger    { background: var(--color-background-error);   color: var(--color-text-inverse); border-color: var(--color-background-error); }
.btn--ghost     { background: transparent; color: var(--color-text-body); border-color: transparent; }

/* ── Style: solid ── */
.btn--primary.btn--solid   { background: transparent; color: var(--color-background-brand);   border-color: var(--color-background-brand); }
.btn--secondary.btn--solid { background: transparent; color: var(--color-background-neutral); border-color: var(--color-background-neutral); }
.btn--danger.btn--solid    { background: transparent; color: var(--color-background-error);   border-color: var(--color-background-error); }

/* ── Hover ── */
.btn--primary:hover   { box-shadow: 0 0 0 4px var(--color-action-brand-hover); }
.btn--secondary:hover { box-shadow: 0 0 0 4px var(--color-action-neutral-hover); }
.btn--danger:hover    { box-shadow: 0 0 0 4px var(--color-action-error-hover); }
.btn--ghost:hover     { box-shadow: 0 0 0 4px var(--color-action-neutral-hover); }

/* ── Focus ── */
.btn--primary:focus-visible,
.btn--secondary:focus-visible,
.btn--danger:focus-visible,
.btn--ghost:focus-visible { outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px; }

/* ── State ── */
.btn--disabled, .btn--loading { pointer-events: none; }
.btn--disabled { color: var(--color-text-disabled); background: var(--color-surface-disabled); border-color: var(--color-border-disabled); }

/* ── Icon ── */
.btn-icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
.btn--icon-only { padding: 0; }
.btn--icon-only.btn--sm { width: var(--height-compact); }
.btn--icon-only.btn--md { width: var(--height-base); }
.btn--icon-only.btn--lg { width: var(--height-spacious); }
```

---

## 접근성

버튼 유형 (`design-system/accessibility.md` 버튼 행 적용).

키보드 접근·focus·disabled·loading 해당.

loading 상태 `.sr-only` 문구 예시: `저장 중...` / 완료 시: `저장 완료`

---

## Do / Don't

> ✅ DO — 동작 실행에 `<button>` 사용
> `<button data-component class="btn btn--primary btn--md text-button-md">저장</button>`

> ❌ DON'T — 페이지 이동에 Button 사용
> `<button onclick="location.href='/home'">홈으로</button>` → `<a>` 사용

> ✅ DO — icon-only에 `aria-label` 명시
> `<button class="btn btn--icon-only" aria-label="삭제">`

> ❌ DON'T — loading 중 중복 제출 허용
> loading 클래스 없이 비동기 처리 → `btn--loading` + `tabindex="-1"` 필수
