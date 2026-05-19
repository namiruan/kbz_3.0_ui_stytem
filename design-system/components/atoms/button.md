---
file: components/atoms/button.md
version: 1.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, tokens/icon.md
---

# Button

## 개요

사용자의 단일 액션을 트리거하는 컴포넌트. 페이지 이동에는 `<a>`를 사용하고, 동작 실행에는 Button을 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | primary · secondary · danger · ghost · neutral | primary |
| type | fill · solid (ghost·neutral 제외) | fill |
| size | sm · md · lg | md |
| typography | text-button-sm · text-button-md · text-button-lg | size에 맞춰 사용 |
| icon | icon-left · icon-right · icon-only | — |

size와 typography는 항상 짝을 맞춘다. `btn--sm` → `text-button-sm`, `btn--md` → `text-button-md`, `btn--lg` → `text-button-lg`. icon-only는 텍스트가 없으므로 typography 클래스를 사용하지 않는다.

---

## 사용 지침

<!-- AI: variant 선택 기준 — 결정 계층(primary > secondary > ghost)과 최종성(fill = 최종, solid = 중간·보조) 두 축으로 결정한다. danger는 primary와 동급이나 되돌릴 수 없는 파괴적 액션에만 적용한다. -->

### 선택 기준

| variant | type | 사용 조건 |
|---------|------|-----------|
| primary | fill | 해당 화면·플로우의 **유일한 최종 결정** |
| primary | solid | primary fill과 같은 플로우 안에서 그 다음으로 중요한 **중간 결정** (예: 다단계 선택 과정) |
| secondary | fill | 최종 결정이 **두 선택지**로 나뉠 때 primary fill의 대안 |
| secondary | solid | 주요 결정 영역 안에 있어야 하지만 fill보다 **낮은 우선순위**인 보조 액션 |
| ghost | fill | 결정의 핵심 흐름 밖이지만 **같은 영역에 버튼으로 있어야** 할 때 |
| neutral | fill | 페이지 핵심 목표와 무관하지만 **보조 정보를 띄우거나 설정을 트리거**하는 도구 버튼 (필터·내보내기·컬럼 설정 등). 주로 툴바·테이블 헤더 등 도구 영역에 배치 |
| danger | fill | 되돌릴 수 없는 파괴적 액션이 **해당 화면의 최종 결정**일 때 |
| danger | solid | 파괴적 요소가 포함되어 있음을 **경고**해야 하나, 더 중요한 최종 결정이 따로 있을 때 |

### 화면 내 구성 패턴

```
단일 최종 결정
[ghost: 취소]  [primary fill: 저장]

다단계 플로우 — 중간 결정 → 최종 결정
[ghost: 이전]  [primary solid: 선택 확인]   ···   [ghost: 취소]  [primary fill: 제출]

최종 결정이 두 갈래
[ghost: 취소]  [secondary fill: 임시저장]  [primary fill: 게시]

파괴적 액션이 최종 결정
[ghost: 취소]  [danger fill: 영구 삭제]

파괴적 요소 경고 + 별도 최종 결정
[danger solid: 삭제 포함 초기화]  [ghost: 취소]  [primary fill: 계속 진행]
```

### 제약

- 한 화면에 **fill 버튼은 최대 2개** — primary fill + secondary fill 조합, 또는 danger fill 단독
- **primary fill과 danger fill을 동시에 사용하지 않는다** — 둘 다 해당 계층의 최종 결정이므로 충돌
- **ghost는 단독으로 쓰지 않는다** — 항상 fill 또는 solid 버튼과 함께 배치

---

## Anatomy

<!-- AI: root(.btn), label(텍스트, optional), icon(아이콘 span, optional), spinner(로딩 아이콘 span, optional) -->

### Ghost

:::preview
<div class="anatomy-grid">
<!-- fill: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <button data-component class="btn btn--ghost btn--sm text-button-sm">버튼</button>
  <button data-component class="btn btn--ghost btn--md text-button-md">버튼</button>
  <button data-component class="btn btn--ghost btn--lg text-button-lg">버튼</button>
</div>
<!-- icon-only: sm / md / lg — aria-label 필수 -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-only</span>
  <button data-component class="btn btn--ghost btn--sm btn--icon-only" aria-label="메뉴"><span class="btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
  <button data-component class="btn btn--ghost btn--md btn--icon-only" aria-label="메뉴"><span class="btn-icon icon--md"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
  <button data-component class="btn btn--ghost btn--lg btn--icon-only" aria-label="메뉴"><span class="btn-icon icon--lg"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
</div>
<!-- icon-left: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-left</span>
  <button data-component class="btn btn--ghost btn--sm text-button-sm btn--icon-left"><span class="btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span>버튼</button>
  <button data-component class="btn btn--ghost btn--md text-button-md btn--icon-left"><span class="btn-icon icon--md"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span>버튼</button>
  <button data-component class="btn btn--ghost btn--lg text-button-lg btn--icon-left"><span class="btn-icon icon--lg"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span>버튼</button>
</div>
<!-- icon-right: sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-right</span>
  <button data-component class="btn btn--ghost btn--sm text-button-sm btn--icon-right">버튼<span class="btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
  <button data-component class="btn btn--ghost btn--md text-button-md btn--icon-right">버튼<span class="btn-icon icon--md"><svg><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
  <button data-component class="btn btn--ghost btn--lg text-button-lg btn--icon-right">버튼<span class="btn-icon icon--lg"><svg><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
</div>
</div>
:::

### Primary

:::preview
<div class="anatomy-grid">
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
</div>
:::

### Secondary

:::preview
<div class="anatomy-grid">
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
</div>
:::

### Danger

:::preview
<div class="anatomy-grid">
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
</div>
:::

### Disabled

:::preview
<div class="anatomy-grid">
<!-- fill disabled: sm / md / lg — pointer-events: none, aria-disabled -->
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <button data-component class="btn btn--primary btn--sm text-button-sm btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
  <button data-component class="btn btn--primary btn--md text-button-md btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
  <button data-component class="btn btn--primary btn--lg text-button-lg btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
</div>
<!-- icon-only disabled -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-only</span>
  <button data-component class="btn btn--primary btn--sm btn--icon-only btn--disabled" disabled aria-disabled="true" tabindex="-1" aria-label="추가"><span class="btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
  <button data-component class="btn btn--primary btn--md btn--icon-only btn--disabled" disabled aria-disabled="true" tabindex="-1" aria-label="추가"><span class="btn-icon icon--md"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
  <button data-component class="btn btn--primary btn--lg btn--icon-only btn--disabled" disabled aria-disabled="true" tabindex="-1" aria-label="추가"><span class="btn-icon icon--lg"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
</div>
</div>
:::

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
.btn--primary   { background: var(--color-button-brand);   color: var(--color-text-inverse); border-color: var(--color-button-brand); }
.btn--secondary { background: var(--color-button-neutral); color: var(--color-text-inverse); border-color: var(--color-button-neutral); }
.btn--danger    { background: var(--color-button-error);   color: var(--color-text-inverse); border-color: var(--color-button-error); }
.btn--ghost     { background: transparent; color: var(--color-text-body); border-color: transparent; }

/* ── Style: solid ── */
.btn--primary.btn--solid   { background: transparent; color: var(--color-button-brand);   border-color: var(--color-button-brand); }
.btn--secondary.btn--solid { background: transparent; color: var(--color-button-neutral); border-color: var(--color-button-neutral); }
.btn--danger.btn--solid    { background: transparent; color: var(--color-button-error);   border-color: var(--color-button-error); }

/* ── Hover ── */
.btn--primary:hover   { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover); }
.btn--secondary:hover { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-neutral-hover); }
.btn--danger:hover    { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-error-hover); }
.btn--ghost:hover     { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-neutral-hover); }

/* ── Focus ── */
.btn--primary:focus-visible,
.btn--secondary:focus-visible,
.btn--danger:focus-visible,
.btn--ghost:focus-visible { outline: var(--stroke-md) var(--stroke-solid) var(--color-border-focus); outline-offset: var(--space-offset-focus); }

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

> ❌ DON'T — `data-component` 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용. 실제 구현 코드에서는 제거한다.
