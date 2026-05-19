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
<style>
  .anatomy-row { display: flex; align-items: center; gap: var(--space-gap-sm); margin-bottom: var(--space-generic-sm); }
  .anatomy-row:last-child { margin-bottom: 0; }
  .anatomy-label { font-family: var(--font-family-base); font-size: var(--font-size-label); color: var(--color-text-subtle); width: 60px; flex-shrink: 0; }
</style>

<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <button class="btn btn--primary btn--sm text-button-sm">버튼</button>
  <button class="btn btn--primary btn--md text-button-md">버튼</button>
  <button class="btn btn--primary btn--lg text-button-lg">버튼</button>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">solid</span>
  <button class="btn btn--primary btn--solid btn--sm text-button-sm">버튼</button>
  <button class="btn btn--primary btn--solid btn--md text-button-md">버튼</button>
  <button class="btn btn--primary btn--solid btn--lg text-button-lg">버튼</button>
</div>
:::

### Secondary

:::preview
<style>
  .anatomy-row { display: flex; align-items: center; gap: var(--space-gap-sm); margin-bottom: var(--space-generic-sm); }
  .anatomy-row:last-child { margin-bottom: 0; }
  .anatomy-label { font-family: var(--font-family-base); font-size: var(--font-size-label); color: var(--color-text-subtle); width: 60px; flex-shrink: 0; }
</style>

<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <button class="btn btn--secondary btn--sm text-button-sm">버튼</button>
  <button class="btn btn--secondary btn--md text-button-md">버튼</button>
  <button class="btn btn--secondary btn--lg text-button-lg">버튼</button>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">solid</span>
  <button class="btn btn--secondary btn--solid btn--sm text-button-sm">버튼</button>
  <button class="btn btn--secondary btn--solid btn--md text-button-md">버튼</button>
  <button class="btn btn--secondary btn--solid btn--lg text-button-lg">버튼</button>
</div>
:::

### Danger

:::preview
<style>
  .anatomy-row { display: flex; align-items: center; gap: var(--space-gap-sm); margin-bottom: var(--space-generic-sm); }
  .anatomy-row:last-child { margin-bottom: 0; }
  .anatomy-label { font-family: var(--font-family-base); font-size: var(--font-size-label); color: var(--color-text-subtle); width: 60px; flex-shrink: 0; }
</style>

<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <button class="btn btn--danger btn--sm text-button-sm">버튼</button>
  <button class="btn btn--danger btn--md text-button-md">버튼</button>
  <button class="btn btn--danger btn--lg text-button-lg">버튼</button>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">solid</span>
  <button class="btn btn--danger btn--solid btn--sm text-button-sm">버튼</button>
  <button class="btn btn--danger btn--solid btn--md text-button-md">버튼</button>
  <button class="btn btn--danger btn--solid btn--lg text-button-lg">버튼</button>
</div>
:::

### Ghost

:::preview
<div style="display: flex; align-items: center; gap: var(--space-gap-sm);">
  <button class="btn btn--ghost btn--sm text-button-sm">버튼</button>
  <button class="btn btn--ghost btn--md text-button-md">버튼</button>
  <button class="btn btn--ghost btn--lg text-button-lg">버튼</button>
</div>
:::

### Disabled

:::preview
<div style="display: flex; align-items: center; gap: var(--space-gap-sm);">
  <button class="btn btn--primary btn--sm text-button-sm btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
  <button class="btn btn--primary btn--md text-button-md btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
  <button class="btn btn--primary btn--lg text-button-lg btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
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

## 접근성

버튼 유형 (`design-system/accessibility.md` 버튼 행 적용).

키보드 접근·focus·disabled·loading 해당.

loading 상태 `.sr-only` 문구 예시: `저장 중...` / 완료 시: `저장 완료`

---

## Do / Don't

> ✅ DO — 동작 실행에 `<button>` 사용
> `<button class="btn btn--primary btn--md text-button-md">저장</button>`

> ❌ DON'T — 페이지 이동에 Button 사용
> `<button onclick="location.href='/home'">홈으로</button>` → `<a>` 사용

> ✅ DO — icon-only에 `aria-label` 명시
> `<button class="btn btn--icon-only" aria-label="삭제">`

> ❌ DON'T — loading 중 중복 제출 허용
> loading 클래스 없이 비동기 처리 → `btn--loading` + `tabindex="-1"` 필수
