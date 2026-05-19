---
file: components/atoms/action-group.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, tokens/icon.md
---

# ActionGroup

## 개요

페이지 핵심 목표와 무관한 보조 도구 버튼을 묶는 컨테이너. 필터·내보내기·컬럼 설정·새로 고침 등 결정 계층이 없는 동등한 도구 액션에 사용한다. 버튼이 1개뿐이어도 도구 영역임을 시각적으로 나타내야 할 때 ActionGroup을 사용한다.

Button과의 차이 — ActionGroup은 결정 계층이 없는 도구 영역에 사용하고, 결정을 트리거하는 버튼은 Button 컴포넌트를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | sm · md | sm |
| typography | text-button-sm · text-button-md | size에 맞춰 사용 |
| icon | icon-left · icon-right · icon-only | — |

size와 typography는 항상 짝을 맞춘다. `action-btn--sm` → `text-button-sm`, `action-btn--md` → `text-button-md`. icon-only는 텍스트가 없으므로 typography 클래스를 사용하지 않는다.

---

## 사용 지침

### 선택 기준

ActionGroup은 결정 계층이 필요 없는 도구 버튼 모음에 사용한다. 특정 버튼이 다른 버튼보다 중요하거나 결정을 트리거해야 한다면 Button 컴포넌트를 사용한다.

### 화면 내 구성 패턴

```
페이지 상단 도구 영역 — 복수 도구
[action-group: 필터  내보내기  컬럼 설정]          [primary fill: 새 항목 추가]

페이지 상단 도구 영역 — 단일 도구
[action-group: 내보내기]                           [primary fill: 새 항목 추가]

테이블 행 인라인 도구 — 행별 퀵 액션
[action-group: 편집  복제  삭제]
```

### 제약

- ActionGroup 내 버튼은 **결정 계층이 없는 동등한 도구 액션**만 배치한다. 중요도 차이가 생기면 Button 컴포넌트로 분리한다.
- 버튼 수는 **최대 5개**를 권장한다. 그 이상은 드롭다운으로 묶는다.
- ActionGroup 내 `.action-btn`은 **항상 같은 size**를 사용한다. 혼용 금지.

---

## Anatomy

<!-- AI: root(.action-group), item(.action-btn), icon span(.action-btn-icon, optional). 아이콘은 항상 DOM 첫 번째에 배치한다. icon-right는 CSS row-reverse로 시각적으로만 오른쪽에 표시된다. -->

### 기본

버튼 1개 단독 또는 여러 개 조합 모두 `.action-group` 컨테이너를 그대로 사용한다. 단일일 때는 구분선 없이 외곽 테두리만 표시된다.

:::preview
<div class="anatomy-grid">
<!-- single: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">single</span>
  <div data-component class="action-group">
    <button class="action-btn action-btn--sm text-button-sm">내보내기</button>
  </div>
  <div data-component class="action-group">
    <button class="action-btn action-btn--md text-button-md">내보내기</button>
  </div>
</div>
<!-- multi: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">multi</span>
  <div data-component class="action-group">
    <button class="action-btn action-btn--sm text-button-sm">필터</button>
    <button class="action-btn action-btn--sm text-button-sm">내보내기</button>
    <button class="action-btn action-btn--sm text-button-sm">컬럼 설정</button>
  </div>
  <div data-component class="action-group">
    <button class="action-btn action-btn--md text-button-md">필터</button>
    <button class="action-btn action-btn--md text-button-md">내보내기</button>
    <button class="action-btn action-btn--md text-button-md">컬럼 설정</button>
  </div>
</div>
</div>
:::

### 아이콘

:::preview
<div class="anatomy-grid">
<!-- icon-only: sm (기본값) — aria-label 필수 -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-only</span>
  <div data-component class="action-group">
    <button class="action-btn action-btn--sm action-btn--icon-only" aria-label="추가"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
    <button class="action-btn action-btn--sm action-btn--icon-only" aria-label="다음"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
    <button class="action-btn action-btn--sm action-btn--icon-only" aria-label="추가 2"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
  </div>
</div>
<!-- icon-left: sm (기본값) — 아이콘 span 항상 DOM 첫 번째 -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-left</span>
  <div data-component class="action-group">
    <button class="action-btn action-btn--sm text-button-sm action-btn--icon-left"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span>추가</button>
    <button class="action-btn action-btn--sm text-button-sm action-btn--icon-left"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span>복제</button>
  </div>
</div>
<!-- icon-right: sm (기본값) — DOM은 동일하게 아이콘 먼저, CSS row-reverse로 시각 위치만 오른쪽으로 -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-right</span>
  <div data-component class="action-group">
    <button class="action-btn action-btn--sm text-button-sm action-btn--icon-right"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>다음</button>
    <button class="action-btn action-btn--sm text-button-sm action-btn--icon-right"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>이동</button>
  </div>
</div>
</div>
:::

### Disabled

:::preview
<div class="anatomy-grid">
<!-- single disabled -->
<div class="anatomy-row">
  <span class="anatomy-label">single</span>
  <div data-component class="action-group">
    <button class="action-btn action-btn--sm text-button-sm action-btn--disabled" disabled aria-disabled="true" tabindex="-1">내보내기</button>
  </div>
  <div data-component class="action-group">
    <button class="action-btn action-btn--md text-button-md action-btn--disabled" disabled aria-disabled="true" tabindex="-1">내보내기</button>
  </div>
</div>
<!-- multi: 일부 disabled -->
<div class="anatomy-row">
  <span class="anatomy-label">multi</span>
  <div data-component class="action-group">
    <button class="action-btn action-btn--sm text-button-sm">필터</button>
    <button class="action-btn action-btn--sm text-button-sm action-btn--disabled" disabled aria-disabled="true" tabindex="-1">내보내기</button>
    <button class="action-btn action-btn--sm text-button-sm">컬럼 설정</button>
  </div>
  <div data-component class="action-group">
    <button class="action-btn action-btn--md text-button-md">필터</button>
    <button class="action-btn action-btn--md text-button-md action-btn--disabled" disabled aria-disabled="true" tabindex="-1">내보내기</button>
    <button class="action-btn action-btn--md text-button-md">컬럼 설정</button>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Container ── */
.action-group {
  display: inline-flex;
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-brand);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
/* 활성 버튼이 하나도 없으면(단일 disabled 포함) 컨테이너 테두리도 disabled 색으로 자동 전환 */
.action-group:not(:has(.action-btn:not(.action-btn--disabled))) {
  border-color: var(--color-border-disabled);
}

/* ── Item Base ── */
.action-btn {
  position: relative;
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--space-gap-xs);
  background: var(--color-surface-base);
  color: var(--color-text-brand);
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--duration-fast) var(--easing-base);
}
/* 구분선을 ::before 가상 요소로 분리 — 버튼 상태(disabled 등)가 구분선 색에 영향을 주지 않는다 */
.action-btn + .action-btn::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: var(--stroke-sm);
  background: var(--color-border-brand);
}
.action-btn:hover { background: var(--color-action-brand-hover); }

/* ── Size ── */
.action-btn--sm { height: var(--height-compact);  padding: var(--space-inset-squish-sm); }
.action-btn--md { height: var(--height-base);     padding: var(--space-inset-squish-md); }

/* ── Focus ── */
.action-btn:focus-visible { outline: var(--stroke-md) var(--stroke-solid) var(--color-border-focus); outline-offset: var(--space-offset-focus); }

/* ── State ── */
.action-btn--disabled { pointer-events: none; color: var(--color-text-disabled); background: var(--color-surface-disabled); }

/* ── Icon ── */
.action-btn-icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
.action-btn--icon-only { padding: 0; }
.action-btn--icon-only.action-btn--sm { width: var(--height-compact); }
.action-btn--icon-only.action-btn--md { width: var(--height-base); }

/* icon-left/right: 아이콘 span은 항상 DOM 첫 번째에 둔다.
   icon-right만 row-reverse로 시각 순서를 역전시킨다. icon-left는 기본 row라 선언 불필요. */
.action-btn--icon-right { flex-direction: row-reverse; }
```

---

## 접근성

버튼 유형 (`accessibility.md` 버튼 행 적용). 키보드 접근·focus·disabled 해당.

| 상황 | 마크업 |
|------|--------|
| icon-only | `aria-label="액션명"` 필수 |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |

포커스 링은 `:focus-visible`로 처리되어 마우스 클릭 시에는 표시되지 않는다.

---

## Do / Don't

> ✅ DO — 결정 계층 없는 도구 버튼에 ActionGroup 사용
> `<div class="action-group"><button class="action-btn ...">필터</button>...</div>`

> ❌ DON'T — 결정을 트리거하는 버튼에 ActionGroup 사용
> 저장·제출·삭제 등 결정 버튼은 Button 컴포넌트를 사용한다

> ✅ DO — icon-only에 aria-label 명시
> `<button class="action-btn action-btn--icon-only" aria-label="필터">`

> ❌ DON'T — data-component 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용. 실제 구현 코드에서는 제거한다.
