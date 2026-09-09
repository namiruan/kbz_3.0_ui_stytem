---
file: components/atoms/icon-button.md
version: 1.0.0
updated: 2026-05-22
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/radius.md, tokens/motion.md, tokens/icon.md, components/atoms/icon.md
---

# Icon Button

## 개요

아이콘 단독으로 구성되는 **neutral appearance** 인터랙티브 버튼. 결정 계층이 없는 유틸리티 액션에 사용하며, 컴포넌트 내부 임베드와 독립 배치 모두 동일한 컴포넌트를 사용한다.

`btn--icon-only`와의 차이는 **배치 위치나 크기가 아닌 appearance**다. Icon Button은 항상 neutral(중립) 스타일이고, `btn--icon-only`는 `btn` style 변수(primary·ghost 등)를 상속해 결정 계층을 표현한다.

| | Icon Button | btn--icon-only |
|---|---|---|
| appearance | 항상 neutral — hover tint만 | btn style 상속 (primary·ghost 등) |
| 결정 계층 | 없음 — 유틸리티 액션 | 있음 — 결정·주요 액션 |
| 사용 예 | 닫기, 지우기, 펼치기, 인라인 퀵액션 | 저장, 추가, 삭제 확인 |

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | badge · sm · md · lg · xl | md |
| color | neutral(기본, 클래스 없음) · brand → `icon-on--brand` | neutral |
| state | default · hover · active · focus · disabled | default |

color는 기본적으로 부모 컨텍스트에서 상속한다. brand 컨텍스트(removable Tag 등)에 임베드될 때는 `icon-on--brand`를 추가해 hover·active 색상을 brand로 오버라이드한다.

---

## 사용 지침

### 언제 Icon Button을 쓰는가

- 아이콘 하나로 액션 의미가 충분히 전달될 때
- 텍스트 레이블 없이도 맥락상 명확한 반복 액션 (닫기, 지우기, 새로고침 등)
- 공간이 제한적이거나 레이블이 레이아웃을 방해할 때

### 언제 btn--icon-only를 쓰는가

- 해당 액션이 페이지·플로우의 주요 결정을 트리거할 때
- primary·secondary·danger 등 결정 계층의 시각적 표현이 필요할 때

---

## Anatomy

<!-- AI: button이 root. icon-on--{size} 단독으로 크기 제어. icon--{size}와 혼용 금지.
  color 기본은 부모에서 상속(neutral). brand 컨텍스트에서는 icon-on--brand를 함께 추가 — hover·active background를 brand로 오버라이드.
  disabled 시 pointer-events:none + color-text-disabled.
  appearance는 neutral 또는 brand만 허용 — btn style 클래스(btn--primary 등) 추가 금지. -->

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">neutral</span>
  <div class="btn-group">
    <button data-component class="icon-on--badge" type="button" aria-label="닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    <button data-component class="icon-on--sm" type="button" aria-label="새로고침"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-refresh"/></svg></button>
    <button data-component class="icon-on--md" type="button" aria-label="설정"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-settings"/></svg></button>
    <button data-component class="icon-on--lg" type="button" aria-label="검색"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg></button>
    <button data-component class="icon-on--xl" type="button" aria-label="메뉴"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-menu"/></svg></button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">brand</span>
  <div class="btn-group">
    <button data-component class="icon-on--badge icon-on--brand" type="button" aria-label="닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    <button data-component class="icon-on--sm icon-on--brand" type="button" aria-label="새로고침"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-refresh"/></svg></button>
    <button data-component class="icon-on--md icon-on--brand" type="button" aria-label="설정"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-settings"/></svg></button>
    <button data-component class="icon-on--lg icon-on--brand" type="button" aria-label="검색"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg></button>
    <button data-component class="icon-on--xl icon-on--brand" type="button" aria-label="메뉴"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-menu"/></svg></button>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── 기반 스타일 ──────────────────────────────
   utilities/icon.css → .icon-on--{size}
   display:inline-flex · align-items/justify-content:center
   padding · border-radius · SVG 크기(width·height) 정의
   이 블록은 button 요소에서의 인터랙션 상태만 추가한다.
─────────────────────────────────────────────── */

/* ── 그룹 배치 ── */
/* btn-group 컨테이너 안에 나열하면 gap: space-gap-xs(4px) 자동 적용 */
/* .btn-group 정의: components/atoms/button.md → ## CSS */

/* ── 인터랙션 상태 ── */
/* icon-on--{size}를 button 요소에 사용할 때 hover·active·disabled 적용 */
/* 포커스 링은 전역 *:focus-visible 규칙으로 처리된다 */
button.icon-on--badge,
button.icon-on--sm,
button.icon-on--md,
button.icon-on--lg,
button.icon-on--xl {
  transition: background var(--duration-fast) var(--easing-base);
}
button.icon-on--badge:hover,
button.icon-on--sm:hover,
button.icon-on--md:hover,
button.icon-on--lg:hover,
button.icon-on--xl:hover {
  background: var(--color-action-neutral-hover);
}
button.icon-on--badge:active,
button.icon-on--sm:active,
button.icon-on--md:active,
button.icon-on--lg:active,
button.icon-on--xl:active {
  background: var(--color-action-neutral-pressed);
}
button.icon-on--badge:disabled,
button.icon-on--sm:disabled,
button.icon-on--md:disabled,
button.icon-on--lg:disabled,
button.icon-on--xl:disabled {
  color: var(--color-text-disabled);
  pointer-events: none;
}

/* ── 브랜드 색상 modifier ── */
/* brand 컨텍스트(removable Tag 등) 임베드 시 추가 — hover·active를 brand로 오버라이드 */
button.icon-on--brand { color: var(--color-text-brand-vivid); }
button.icon-on--badge.icon-on--brand:hover,
button.icon-on--sm.icon-on--brand:hover,
button.icon-on--md.icon-on--brand:hover,
button.icon-on--lg.icon-on--brand:hover,
button.icon-on--xl.icon-on--brand:hover { background: var(--color-action-brand-hover); }
button.icon-on--badge.icon-on--brand:active,
button.icon-on--sm.icon-on--brand:active,
button.icon-on--md.icon-on--brand:active,
button.icon-on--lg.icon-on--brand:active,
button.icon-on--xl.icon-on--brand:active { background: var(--color-action-brand-pressed); }
```

---

## 접근성

| 항목 | 규칙 |
|------|------|
| 레이블 | `aria-label` 필수. 아이콘만으로 의미를 알 수 없으므로 액션명을 명시한다 |
| SVG | 내부 svg에 `aria-hidden="true"` 적용 |
| 비활성 | `disabled` 속성 사용. `aria-disabled`는 포커스 유지가 필요한 경우에만 병행 사용 |
| 터치 영역 | badge(12px) 사이즈는 패딩 포함 최소 24px 확보 (`space-inset-xs` × 2 + 12px = 24px) |
| focus ring | 전역 `*:focus-visible` 규칙으로 처리 — 마우스 클릭 시 표시 안 됨 |

---

## Do / Don't

> ✅ DO — `<button>` root에 `aria-label` 필수
> `<button class="icon-on--md" aria-label="닫기"><svg aria-hidden="true">...</svg></button>`

> ✅ DO — color는 부모 컨텍스트에서 상속
> 에러 상태 입력 필드의 지우기 버튼 색상은 `.input-wrap:has(.input--error) .input-clear`로 제어

> ✅ DO — 결정 계층이 필요한 아이콘 액션은 btn--icon-only 사용
> `<button class="btn btn--primary btn--icon-only btn--md" aria-label="저장">...</button>`

> ❌ DON'T — `icon-on--{size}`와 `icon--{size}` 혼용
> `<button class="icon-on--md icon--md">` — `icon-on--{size}` 단독으로 크기 제어

> ❌ DON'T — btn style 클래스 추가
> `<button class="icon-on--md btn--primary">` — Icon Button은 항상 neutral. 결정 계층이 필요하면 btn--icon-only를 사용한다

> ❌ DON'T — `<div>` · `<span>` 등 비버튼 요소에 인터랙션 기대
> `icon-on--{size}` 인터랙션 CSS는 `button` 요소에만 스코프됨

> ❌ DON'T — 커스텀 아이콘 버튼 내부에 `span.icon` 래퍼 사용
> `<button class="icon-on--md"><span class="icon icon--sm"><svg>...</svg></span></button>` — `icon--sm`의 `display: inline`이 SVG를 텍스트 베이스라인에 정렬시켜 아이콘이 위쪽에 치우쳐 보인다. SVG를 버튼에 직접 삽입하고 CSS로 크기를 지정한다
> `<button class="icon-on--md"><svg aria-hidden="true"><use href="..."/></svg></button>` — `icon-on--{size}`가 `display: inline-flex; align-items: center`를 제공하므로 span 래퍼 없이도 SVG가 정중앙 정렬된다

> ❌ DON'T — `padding`만으로 크기 설정
> `button` 요소의 브라우저 기본 `line-height`가 세로를 늘려 비정방형이 된다. `icon-on--{size}` 사용이 불가능한 커스텀 케이스(컴포넌트 내부 임베드 등)는 반드시 `width: X; height: X; padding: 0` 패턴으로 정방형을 명시한다
> `width: calc(var(--icon-sm) + var(--space-2) * 2); height: calc(var(--icon-sm) + var(--space-2) * 2); padding: 0;`
