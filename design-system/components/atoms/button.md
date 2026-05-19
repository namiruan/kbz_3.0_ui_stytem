---
file: components/atoms/button.md
version: 1.3.0
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
| style | primary · secondary · danger · ghost | primary |
| type | fill · solid (ghost 제외) | fill |
| size | sm · md · lg | md |
| typography | text-button-sm · text-button-md · text-button-lg | size에 맞춰 사용 |
| icon | icon-left · icon-right · icon-only | — |

size와 typography는 항상 짝을 맞춘다. `btn--sm` → `text-button-sm`, `btn--md` → `text-button-md`, `btn--lg` → `text-button-lg`. icon-only는 텍스트가 없으므로 typography 클래스를 사용하지 않는다.

---

## 사용 지침

<!-- AI: variant 선택 기준 — 결정 계층(primary > secondary > ghost)과 최종성(fill = 최종, solid = 중간·보조) 두 축으로 결정한다. danger는 primary와 동급이나 되돌릴 수 없는 파괴적 액션에만 적용한다. 도구 버튼(필터·내보내기 등)은 ActionGroup 컴포넌트를 사용한다. -->

### 선택 기준

| variant | type | 사용 조건 |
|---------|------|-----------|
| primary | fill | 해당 화면·플로우의 **유일한 최종 결정** |
| primary | solid | primary fill과 같은 플로우 안에서 그 다음으로 중요한 **중간 결정** (예: 다단계 선택 과정) |
| secondary | fill | 최종 결정이 **두 선택지**로 나뉠 때 primary fill의 대안 |
| secondary | solid | 주요 결정 영역 안에 있어야 하지만 fill보다 **낮은 우선순위**인 보조 액션. ghost와 달리 액션 자체가 보조적 중요도를 가질 때 사용한다 |
| ghost | fill | 결정의 핵심 흐름에서 **벗어나는 경로**(취소·이전 등). 전진 액션이 아니므로 시각적 무게를 줄인다. secondary solid와 달리 액션 자체의 우선순위를 낮추는 게 아니라 흐름 밖에 있음을 나타낸다 |
| danger | fill | 되돌릴 수 없는 파괴적 액션이 **해당 화면의 최종 결정**일 때 |
| danger | solid | 파괴적 요소가 포함되어 있음을 **경고**해야 하나, 더 중요한 최종 결정이 따로 있을 때. danger fill보다 왼쪽에 배치한다 |

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
- 버튼 **2개 이상 배치 시** `gap: var(--space-gap-xs)`, 중요도가 높은 버튼일수록 오른쪽에 배치한다
- **도구 버튼**(필터·내보내기·컬럼 설정 등 페이지 핵심 목표와 무관한 보조 작업)은 이 컴포넌트가 아닌 `ActionGroup`을 사용한다

---

## Anatomy

<!-- AI: root(.btn), 텍스트 노드(레이블, optional), icon span(.btn-icon, optional). 아이콘은 항상 DOM 첫 번째에 배치한다. icon-right는 CSS row-reverse로 시각적으로만 오른쪽에 표시된다. -->

### Ghost

아이콘 variant(icon-only · icon-left · icon-right)는 모든 style(primary · secondary · danger · ghost)에서 동일하게 동작한다. ghost에서만 예시를 제공하고 다른 style에서는 생략한다.

:::preview
<div class="anatomy-grid">
<!-- text: sm / md / lg — ghost는 fill/solid type 구분 없음 -->
<div class="anatomy-row">
  <span class="anatomy-label">text</span>
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
<!-- icon-left: sm / md / lg — 아이콘 span 항상 DOM 첫 번째 -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-left</span>
  <button data-component class="btn btn--ghost btn--sm text-button-sm btn--icon-left"><span class="btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span>버튼</button>
  <button data-component class="btn btn--ghost btn--md text-button-md btn--icon-left"><span class="btn-icon icon--md"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span>버튼</button>
  <button data-component class="btn btn--ghost btn--lg text-button-lg btn--icon-left"><span class="btn-icon icon--lg"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span>버튼</button>
</div>
<!-- icon-right: sm / md / lg — DOM은 동일하게 아이콘 먼저, CSS row-reverse로 시각 위치만 오른쪽으로 -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-right</span>
  <button data-component class="btn btn--ghost btn--sm text-button-sm btn--icon-right"><span class="btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>버튼</button>
  <button data-component class="btn btn--ghost btn--md text-button-md btn--icon-right"><span class="btn-icon icon--md"><svg><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>버튼</button>
  <button data-component class="btn btn--ghost btn--lg text-button-lg btn--icon-right"><span class="btn-icon icon--lg"><svg><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>버튼</button>
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

disabled 상태는 모든 variant(primary · secondary · danger · ghost)에 동일하게 적용된다. 아래는 primary 기준 예시이며, 다른 variant도 `btn--disabled`를 추가하면 동일한 회색 처리가 된다.

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

### Loading

비동기 처리 중 중복 제출 방지. `btn--loading`은 variant 색상을 덮어씌우는 스켈레톤 shimmer로 표시된다. 내부 콘텐츠는 숨겨지고 버튼 형태(크기·radius)만 유지된다.

:::preview
<style>
@keyframes btn-skeleton-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.btn--loading {
  pointer-events: none;
  color: transparent !important;
  border-color: transparent !important;
  background-color: var(--color-surface-neutral) !important;
  background-image: linear-gradient(90deg, transparent, var(--color-surface-base), transparent) !important;
  background-size: 300% 100% !important;
  background-repeat: no-repeat !important;
  animation: btn-skeleton-shimmer 1.4s ease-in-out infinite;
}
</style>
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">loading</span>
  <button data-component class="btn btn--primary btn--sm btn--loading" aria-label="저장 중..." tabindex="-1">저장</button>
  <button data-component class="btn btn--primary btn--md btn--loading" aria-label="저장 중..." tabindex="-1">저장</button>
  <button data-component class="btn btn--primary btn--lg btn--loading" aria-label="저장 중..." tabindex="-1">저장</button>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">icon-only</span>
  <button data-component class="btn btn--primary btn--sm btn--icon-only btn--loading" aria-label="저장 중..." tabindex="-1"><span class="btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
  <button data-component class="btn btn--primary btn--md btn--icon-only btn--loading" aria-label="저장 중..." tabindex="-1"><span class="btn-icon icon--md"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
  <button data-component class="btn btn--primary btn--lg btn--icon-only btn--loading" aria-label="저장 중..." tabindex="-1"><span class="btn-icon icon--lg"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
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

/* icon-left/right: 아이콘 span은 항상 DOM 첫 번째에 둔다.
   icon-right만 row-reverse로 시각 순서를 역전시킨다. icon-left는 기본 row라 선언 불필요. */
.btn--icon-right { flex-direction: row-reverse; }

/* ── Loading (skeleton shimmer) ── */
/* variant 색상을 덮어씌우고 버튼 형태만 유지. 내부 콘텐츠는 color: transparent로 숨긴다.
   background 단축 속성 대신 background-image/color를 분리해야 background-position 애니메이션이 동작한다. */
@keyframes btn-skeleton-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.btn--loading {
  color: transparent;
  border-color: transparent;
  background-color: var(--color-surface-neutral);
  background-image: linear-gradient(90deg, transparent, var(--color-surface-base), transparent);
  background-size: 300% 100%;
  background-repeat: no-repeat;
  animation: btn-skeleton-shimmer 1.4s ease-in-out infinite;
}
```

---

## 접근성

전체 규칙은 `accessibility.md` 버튼 행을 따른다. 이 컴포넌트에 적용되는 핵심 사항:

| 상황 | 마크업 |
|------|--------|
| icon-only | `aria-label="액션명"` 필수 |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| loading | `btn--loading` + `tabindex="-1"` + `aria-label`을 액션에 맞게 동적 업데이트 |
| loading 완료 | `aria-live="polite"` 영역에 완료 문구 출력 후 버튼 원상 복구 |

loading 구현 예시:

```js
// 시작
btn.classList.add('btn--loading');
btn.setAttribute('tabindex', '-1');
btn.setAttribute('aria-label', '저장 중...');

// 완료
btn.classList.remove('btn--loading');
btn.removeAttribute('tabindex');
btn.setAttribute('aria-label', '저장');         // 원래 레이블로 복구
liveRegion.textContent = '저장 완료';            // aria-live="polite" 영역
```

포커스 링은 `:focus-visible`로 처리되어 마우스 클릭 시에는 표시되지 않는다.

---

## Do / Don't

> ✅ DO — 동작 실행에 button 태그 사용
> `<button class="btn btn--primary btn--md text-button-md">저장</button>`

> ❌ DON'T — 페이지 이동에 Button 사용
> `<button onclick="location.href='/home'">홈으로</button>` → `<a>` 사용

> ✅ DO — icon-only에 aria-label 명시
> `<button class="btn btn--icon-only" aria-label="삭제">`

> ❌ DON'T — loading 중 중복 제출 허용
> loading 클래스 없이 비동기 처리 → `btn--loading` + `tabindex="-1"` 필수

> ✅ DO — danger solid는 최종 결정(primary fill) 왼쪽에 배치
> `[danger solid: 삭제 포함 초기화]  [ghost: 취소]  [primary fill: 계속 진행]`

> ❌ DON'T — danger solid를 가장 오른쪽에 배치
> danger solid는 경고 역할이지 최종 결정이 아니다. 오른쪽은 더 중요한 버튼 자리.

> ✅ DO — secondary solid: 같은 결정 단계에서 우선순위를 낮춰야 할 때
> `[secondary solid: 초안 저장]  [primary fill: 게시]`

> ✅ DO — ghost: 현재 결정 흐름의 취소·이탈 경로
> `[ghost: 취소]  [primary fill: 저장]`

> ❌ DON'T — 도구 버튼에 이 컴포넌트 사용
> 필터·내보내기·컬럼 설정 등 → `ActionGroup` 컴포넌트 사용

> ❌ DON'T — data-component 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용. 실제 구현 코드에서는 제거한다.
