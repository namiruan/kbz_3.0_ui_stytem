---
file: components/atoms/tag.md
version: 3.0.3
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/motion.md, tokens/icon.md, components/atoms/icon-button.md, utilities/icon.css
---

# Tag

## 개요

분류·필터·속성을 표시하는 인라인 레이블. 선택(selectable)·제거(removable) 인터랙션이 가능하다.

Badge와의 차이 — Badge는 비인터랙티브 상태 표시 전용이고, Tag는 사용자가 선택하거나 제거할 수 있는 인터랙티브 레이블이다. 단순 상태·분류 표시에는 Badge를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| shape | rect(기본, 클래스 없음) · pill → `tag--pill` | rect |
| size | sm(기본, 클래스 없음) · md → `tag--md` | sm |
| interaction | selectable · removable | — |
| state | default · selected → `tag--selected` · disabled → `tag--disabled` | default |

state는 selectable에만 적용된다. selectable과 removable은 동시에 사용하지 않는다. removable은 항상 selected 스타일로 표시된다 — 선택된 항목을 제거하는 용도이기 때문이다.

---

## 사용 지침

### 선택 기준

| 상황 | 사용 |
|------|------|
| 필터 선택·해제 | `selectable` — 전체 태그가 버튼 |
| 선택된 항목 제거 (태그 입력 필드 등) | `removable` — X 버튼으로 개별 제거. selected 스타일 고정 |
| 고정된 선택값 (제거 불가) | `selectable` + `tag--selected` (removable 없음) |
| 비인터랙티브 상태 레이블 | Badge 사용 |

### shape 선택 기준

| 상황 | shape |
|------|-------|
| 일반 필터·분류 태그 | rect (기본) — ActionGroup과 시각 계층 통일 |
| 사람 이름·해시태그 등 소형 인라인 레이블 | pill |

---

## Anatomy

<!-- AI:
- root = span.tag (removable) 또는 button.tag (selectable).
- shape 기본값 rect(radius-xs). pill → tag--pill.
- size 기본값 sm(height-dense 28px). md → tag--md(height-compact 32px).
- selectable: button.tag. JS가 tag--selected 토글. aria-pressed 필수.
- disabled: button.tag.tag--disabled + disabled + aria-disabled="true" + tabindex="-1". selected 동시 가능(tag--selected tag--disabled).
- removable: root는 span.tag.tag--removable. selected 스타일 자동 적용(CSS). 자식으로 텍스트 노드 + icon-button. sm → icon-on--badge icon-on--brand, md → icon-on--sm icon-on--brand. icon-button aria-label="[태그명] 제거" 필수.
- selectable과 removable 동시 사용 금지.
- 제거 버튼 색은 부모 .tag의 color를 currentColor로 상속 — 별도 color 클래스 추가 불필요.
-->

### selectable

`<button class="tag">` — 전체 태그가 버튼. JS로 `tag--selected` 토글.

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <button data-component class="tag" aria-pressed="false">미선택</button>
  <button data-component class="tag tag--selected" aria-pressed="true">선택됨</button>
  <button data-component class="tag tag--md" aria-pressed="false">미선택</button>
  <button data-component class="tag tag--selected tag--md" aria-pressed="true">선택됨</button>
  <button data-component class="tag tag--pill" aria-pressed="false" style="margin-inline-start: var(--space-16);">미선택</button>
  <button data-component class="tag tag--selected tag--pill" aria-pressed="true">선택됨</button>
  <button data-component class="tag tag--pill tag--md" aria-pressed="false">미선택</button>
  <button data-component class="tag tag--selected tag--pill tag--md" aria-pressed="true">선택됨</button>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <button data-component class="tag tag--disabled" disabled aria-disabled="true" tabindex="-1">미선택</button>
  <button data-component class="tag tag--selected tag--disabled" disabled aria-disabled="true" tabindex="-1">선택됨</button>
  <button data-component class="tag tag--md tag--disabled" disabled aria-disabled="true" tabindex="-1">미선택</button>
  <button data-component class="tag tag--selected tag--md tag--disabled" disabled aria-disabled="true" tabindex="-1">선택됨</button>
  <button data-component class="tag tag--pill tag--disabled" disabled aria-disabled="true" tabindex="-1" style="margin-inline-start: var(--space-16);">미선택</button>
  <button data-component class="tag tag--selected tag--pill tag--disabled" disabled aria-disabled="true" tabindex="-1">선택됨</button>
  <button data-component class="tag tag--pill tag--md tag--disabled" disabled aria-disabled="true" tabindex="-1">미선택</button>
  <button data-component class="tag tag--selected tag--pill tag--md tag--disabled" disabled aria-disabled="true" tabindex="-1">선택됨</button>
</div>
</div>
:::

### removable

`<span class="tag tag--removable">` + icon-button. selected 스타일 고정. sm → `icon-on--badge icon-on--brand`, md → `icon-on--sm icon-on--brand`.

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">shape · size</span>
  <span data-component class="tag tag--removable">
    디자인
    <button class="icon-on--badge icon-on--brand" aria-label="디자인 제거">
      <span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
    </button>
  </span>
  <span data-component class="tag tag--md tag--removable">
    디자인
    <button class="icon-on--sm icon-on--brand" aria-label="디자인 제거">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
    </button>
  </span>
  <span data-component class="tag tag--pill tag--removable">
    디자인
    <button class="icon-on--badge icon-on--brand" aria-label="디자인 제거">
      <span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
    </button>
  </span>
  <span data-component class="tag tag--pill tag--md tag--removable">
    디자인
    <button class="icon-on--sm icon-on--brand" aria-label="디자인 제거">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
    </button>
  </span>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
  height: var(--height-dense);
  padding: var(--space-inset-squish-sm);
  border-radius: var(--radius-xs);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  background: var(--color-surface-base);
  color: var(--color-text-label);
  font-family: var(--font-family-base);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-body);
  line-height: var(--line-height-ui);
  white-space: nowrap;
  cursor: default;
  transition: background var(--duration-fast) var(--easing-base),
              border-color var(--duration-fast) var(--easing-base),
              color var(--duration-fast) var(--easing-base);
}

/* ── Shape: pill ── */
.tag--pill { border-radius: var(--radius-pill); }

/* ── Size: md ── */
.tag--md {
  height: var(--height-compact);
  padding: var(--space-inset-squish-md);
  font-size: var(--font-size-sm);
}

/* ── Selectable ── */
button.tag { cursor: pointer; }
/* 선택 시 브랜드 색으로 전환되므로 hover도 브랜드로 예고 */
button.tag:hover {
  background: var(--color-action-brand-hover);
  border-color: var(--color-border-brand-subtle);
  color: var(--color-text-brand-vivid);
}

/* ── Selected ── */
.tag--selected {
  background: var(--color-action-brand-subtle);
  border-color: var(--color-border-brand);
  color: var(--color-text-brand-vivid);
}

/* ── Disabled ── */
/* 미선택: 연한 회색 fill + text-disabled(gray-400) */
/* 선택됨: surface-disabled-strong(gray-200) — 배경이 진해지므로 text-subtle(gray-500)로 가독성 확보 */
.tag--disabled {
  pointer-events: none;
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  color: var(--color-text-disabled);
}
.tag--selected.tag--disabled {
  background: var(--color-surface-disabled-strong);
  color: var(--color-text-subtle);
}

/* ── Removable ── */
/* 선택된 항목을 제거하는 용도이므로 selected 스타일 고정 */
.tag--removable {
  background: var(--color-action-brand-subtle);
  border-color: var(--color-border-brand);
  color: var(--color-text-brand-vivid);
  padding-inline-end: var(--space-inset-xs);
}
/* 제거 버튼 색은 부모 color 상속 (icon-on--badge / icon-on--sm 기반 스타일은 utilities/icon.css 참조) */
```

---

## 접근성

버튼 유형 (`accessibility.md` 버튼 행 적용). 인터랙션 유무에 따라 요소를 다르게 사용한다.

| 상황 | 마크업 |
|------|--------|
| selectable | `<button class="tag" aria-pressed="false/true">` |
| disabled | `<button>` + `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| removable 제거 버튼 | `<button class="icon-on--badge" aria-label="[태그명] 제거">` |

포커스 링은 전역 `*:focus-visible` 규칙으로 처리된다.

---

## Do / Don't

> ✅ DO — selectable Tag는 `<button>` 사용, aria-pressed로 상태 표현
> `<button class="tag tag--pill" aria-pressed="true">디자인</button>`

> ✅ DO — removable 제거 버튼에 태그명 포함한 aria-label 제공
> `<button class="icon-on--badge icon-on--brand" aria-label="디자인 제거">…</button>`

> ✅ DO — removable의 root는 `<span>`, selectable의 root는 `<button>`
> `<span class="tag tag--removable">텍스트 <button class="icon-on--badge" …>…</button></span>`

> ✅ DO — 고정된 선택값은 selected + removable 없음으로 표현
> `<button class="tag tag--selected" aria-pressed="true">디자인</button>`

> ❌ DON'T — 비인터랙티브 상태 레이블에 Tag 사용
> 색상·아이콘으로 상태를 전달하는 레이블에는 Badge 사용

> ❌ DON'T — selectable과 removable 동시 사용
> 전체 버튼(selectable)과 내부 버튼(removable 제거)이 충돌 — 두 인터랙션을 하나의 태그에 두지 않는다

> ❌ DON'T — icon-on 크기와 size 불일치
> sm에는 `icon-on--badge icon-on--brand`, md에는 `icon-on--sm icon-on--brand` 사용 — 크기 혼용 금지
