---
file: components/atoms/input.md
version: 1.2.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/typography.md, tokens/icon.md, components/atoms/icon.md
---

# Input

## 개요

단일 줄 텍스트 입력 필드. style은 box(기본)와 ghost 두 가지를 지원한다. icon·지우기 버튼 같은 addon은 `input-wrap` 래퍼로 구성한다. Label·HelpText·에러 메시지를 포함한 완성된 입력 단위는 FormField(Molecule)를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | box (기본, 클래스 없음) · ghost → `input--ghost` | box |
| size | md (기본, 클래스 없음) · sm → `input--sm` | md |
| state | readonly → `input--readonly` · disabled → `input--disabled` · error → `input--error` | — |
| addon | none (기본) · icon-left · icon-right · clearable | none |

addon은 `input-wrap` 래퍼에 수식자 클래스로 제어한다. `input-wrap--icon-right`와 `input-wrap--clearable`은 함께 쓸 수 있다 — 값 없을 때 icon 표시, 값 있을 때 X 표시(JS 제어).

---

## 사용 지침

### 선택 기준

| 상황 | 선택 |
|------|------|
| 일반 폼 (레이블 위) | box (기본) |
| 입력 전 상태를 최소화해야 하는 인라인 컨텍스트 | ghost |
| 날짜·검색 등 선택 유도 | icon-right (calendar 또는 search) |
| 입력 값 지우기가 필요한 필드 | clearable |

### 상태 완전성

| 상태 | 클래스 · 속성 | 설명 |
|------|-------------|------|
| 기본 | — | 플레이스홀더 표시 |
| 포커스 | `:focus-visible` (CSS) | 브랜드 테두리 + 포커스 링 |
| 입력 중 | — (value 있는 상태) | 별도 클래스 없음 |
| 읽기 전용 | `input--readonly` + `readonly` 속성 | 포커스·복사 가능, 테두리 없음 |
| 비활성 | `input--disabled` + `disabled` + `aria-disabled="true"` + `tabindex="-1"` | 인터랙션 불가 |
| 에러 | `input--error` + `aria-invalid="true"` | 빨간 테두리 |

---

## Anatomy

<!-- AI:
- addon 없는 경우: root = input.input. 크기·스타일·상태 클래스를 root에 조합.
- addon 있는 경우: root = div.input-wrap + 수식자(input-wrap--icon-left, input-wrap--icon-right, input-wrap--clearable). 수식자 복수 사용 가능.
- ghost 스타일: 기본 border 없음(transparent). hover 시 border-default 노출, focus 시 border-brand. error 상태 클래스와 함께 사용 가능.
- readonly: border 없음, background subtle. 포커스 가능, tab 순서 유지.
- disabled: pointer-events: none, tabindex="-1", aria-disabled="true" 셋 모두 필수.
- clearable: button.input-clear는 값 없을 때 hidden. 값 있을 때 hidden 제거 (JS 제어).
- icon-right + clearable 동시 사용 시: 값 없으면 icon 표시, 값 있으면 icon hidden + clear 버튼 표시 (JS).
-->

### Box

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <input data-component class="input" type="text" placeholder="입력 전 상태" />
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sm</span>
  <input data-component class="input input--sm" type="text" placeholder="입력 전 상태" />
</div>
<div class="anatomy-row">
  <span class="anatomy-label">readonly</span>
  <input data-component class="input input--readonly" type="text" value="읽기 전용 값" readonly />
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <input data-component class="input input--disabled" type="text" placeholder="입력 전 상태" disabled aria-disabled="true" tabindex="-1" />
</div>
<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <input data-component class="input input--error" type="text" placeholder="입력 전 상태" aria-invalid="true" aria-describedby="ex-box-err" />
</div>
</div>
:::

### Ghost

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <input data-component class="input input--ghost" type="text" placeholder="입력 전 상태" />
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <input data-component class="input input--ghost input--disabled" type="text" placeholder="입력 전 상태" disabled aria-disabled="true" tabindex="-1" />
</div>
<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <input data-component class="input input--ghost input--error" type="text" placeholder="입력 전 상태" aria-invalid="true" aria-describedby="ex-ghost-err" />
</div>
</div>
:::

### Addon

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">icon-right</span>
  <div data-component class="input-wrap input-wrap--icon-right">
    <input class="input" type="text" placeholder="입력 전 상태" />
    <span class="input-icon icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">icon-left</span>
  <div data-component class="input-wrap input-wrap--icon-left">
    <span class="input-icon icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg></span>
    <input class="input" type="text" placeholder="입력 전 상태" />
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">clearable</span>
  <div data-component class="input-wrap input-wrap--clearable">
    <input class="input" type="text" value="입력된 값" />
    <button class="input-clear" type="button" aria-label="지우기">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
    </button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">icon-right + clearable (값 있음)</span>
  <div data-component class="input-wrap input-wrap--icon-right input-wrap--clearable">
    <input class="input" type="text" value="선택된 값" />
    <button class="input-clear" type="button" aria-label="지우기">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
    </button>
    <span class="input-icon icon icon--md" aria-hidden="true" hidden><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.input {
  display: block;
  width: 100%;
  height: var(--height-base);
  padding: var(--space-inset-squish-xl);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
  color: var(--color-text-body);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  outline: none;
}
.input::placeholder { color: var(--color-text-subtle); }

/* ── Size ── */
.input--sm { height: var(--height-compact); padding: var(--space-inset-squish-lg); font-size: var(--font-size-sm); }

/* ── Style: ghost ── */
.input--ghost {
  border-color: transparent;
  background: transparent;
}

/* ── Hover ── */
.input:hover:not(.input--disabled):not(.input--readonly) { border-color: var(--color-border-selected); }
.input--ghost:hover:not(.input--disabled):not(.input--readonly) { border-color: var(--color-border-default); }

/* ── Focus ── */
.input:focus-visible {
  border-color: var(--color-border-brand);
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── State ── */
.input--readonly {
  background: var(--color-surface-subtle);
  border-color: transparent;
  cursor: default;
}
.input--disabled {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  color: var(--color-text-disabled);
  pointer-events: none;
}
.input--error { border-color: var(--color-border-error); }

/* ── Addon: wrapper ── */
.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

/* 아이콘/버튼 폭(20px) + 좌우 오프셋(12px) + 텍스트 간격(8px) */
.input-wrap--icon-left  .input { padding-left:  calc(var(--space-12) + var(--icon-md) + var(--space-8)); }
.input-wrap--icon-right .input { padding-right: calc(var(--space-12) + var(--icon-md) + var(--space-8)); }
.input-wrap--clearable  .input { padding-right: calc(var(--space-12) + var(--icon-md) + var(--space-8)); }

/* icon-right + clearable 동시: 우측에 버튼 + 아이콘 공간 확보 */
.input-wrap--icon-right.input-wrap--clearable .input {
  padding-right: calc(var(--space-12) + var(--icon-md) + var(--space-8) + var(--icon-sm) + var(--space-8));
}

.input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-subtle);
  pointer-events: none;
}
.input-wrap--icon-left  .input-icon { left:  var(--space-12); }
.input-wrap--icon-right .input-icon { right: var(--space-12); }

/* ── Addon: clear button ── */
.input-clear {
  position: absolute;
  right: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-text-subtle);
  padding: var(--space-inset-xs);
  border-radius: var(--icon-radius-xs);
}
.input-clear:hover { color: var(--color-text-body); background: var(--color-surface-subtle); }

/* icon-right + clearable: 아이콘 왼쪽에 X 버튼 배치 */
.input-wrap--icon-right .input-clear {
  right: calc(var(--space-12) + var(--icon-md));
}
```

---

## 접근성

텍스트 인풋 유형 (`accessibility.md` 텍스트 인풋 행 적용).

| 상황 | 마크업 |
|------|--------|
| 기본 | `<label for="id">` + `<input id="id" class="input">` |
| 에러 | `aria-invalid="true"` + `aria-describedby="[error-id]"`. 에러 span에 `role="alert"` |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| readonly | `readonly` 속성 — 포커스 가능, tab 순서 유지 |
| 지우기 버튼 | `<button type="button" aria-label="지우기">`. 값 없을 때 `hidden` 처리 |
| 아이콘 (장식) | `aria-hidden="true"` |

에러 마크업 예시:

```html
<input class="input input--error" aria-invalid="true" aria-describedby="name-error" />
<span id="name-error" role="alert">필수 정보를 입력해 주세요.</span>
```

---

## Do / Don't

> ✅ DO — addon은 input-wrap으로 감쌈
> `<div class="input-wrap input-wrap--icon-right"><input class="input" /><span class="input-icon icon icon--md" aria-hidden="true">...</span></div>`

> ❌ DON'T — placeholder를 label 대용으로 사용
> 입력 시 사라지므로 레이블 역할 불가. 항상 `<label>`과 연결

> ✅ DO — 에러 메시지를 aria-describedby + role="alert"로 연결
> `<input class="input input--error" aria-invalid="true" aria-describedby="name-error" />`

> ❌ DON'T — ghost 상태에서 error 시 border가 보이지 않을 것이라 가정
> `input--ghost.input--error`는 `border-color: var(--color-border-error)`가 그대로 적용되어 테두리가 나타난다

> ❌ DON'T — data-component 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용. 실제 구현 코드에서는 제거한다.
