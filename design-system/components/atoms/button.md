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

:::preview
<style>
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
  .btn--sm { height: var(--height-compact); padding: var(--space-inset-squish-sm); }
  .btn--md { height: var(--height-base); padding: var(--space-inset-squish-md); }
  .btn--lg { height: var(--height-spacious); padding: var(--space-inset-squish-lg); }

  .btn--primary {
    background: var(--color-background-brand);
    color: var(--color-text-inverse);
    border-color: var(--color-background-brand);
  }
  .btn--primary:hover { box-shadow: 0 0 0 4px var(--color-action-brand-hover); }
  .btn--primary:focus-visible { outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px; }

  .btn--secondary {
    background: var(--color-background-neutral);
    color: var(--color-text-inverse);
    border-color: var(--color-background-neutral);
  }
  .btn--secondary:hover { box-shadow: 0 0 0 4px var(--color-action-neutral-hover); }
  .btn--secondary:focus-visible { outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px; }

  .btn--ghost {
    background: transparent;
    color: var(--color-text-body);
    border-color: transparent;
  }
  .btn--ghost:hover { box-shadow: 0 0 0 4px var(--color-action-neutral-hover); }
  .btn--ghost:focus-visible { outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px; }

  .btn--danger {
    background: var(--color-background-error);
    color: var(--color-text-inverse);
    border-color: var(--color-background-error);
  }
  .btn--danger:hover { box-shadow: 0 0 0 4px var(--color-action-error-hover); }
  .btn--danger:focus-visible { outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px; }

  .btn--primary.btn--solid { background: transparent; color: var(--color-background-brand); border-color: var(--color-background-brand); }
  .btn--secondary.btn--solid { background: transparent; color: var(--color-background-neutral); border-color: var(--color-background-neutral); }
  .btn--danger.btn--solid { background: transparent; color: var(--color-background-error); border-color: var(--color-background-error); }

  .btn--disabled, .btn--loading { pointer-events: none; }
  .btn--disabled { color: var(--color-text-disabled); background: var(--color-surface-disabled); border-color: var(--color-border-disabled); }
</style>
<div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin-bottom:8px;">
  <button class="btn btn--primary btn--md text-button-md">저장</button>
  <button class="btn btn--secondary btn--md text-button-md">취소</button>
  <button class="btn btn--ghost btn--md text-button-md">더보기</button>
  <button class="btn btn--danger btn--md text-button-md">삭제</button>
  <button class="btn btn--primary btn--md text-button-md btn--disabled" disabled aria-disabled="true" tabindex="-1">저장</button>
</div>
<div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
  <button class="btn btn--primary btn--solid btn--md text-button-md">저장</button>
  <button class="btn btn--secondary btn--solid btn--md text-button-md">취소</button>
  <button class="btn btn--danger btn--solid btn--md text-button-md">삭제</button>
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
