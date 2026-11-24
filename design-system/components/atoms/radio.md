---
file: components/atoms/radio.md
version: 1.1.1
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/icon.md
---

# Radio

## 개요

그룹 내 단일 항목 선택. 항상 기본 선택값이 존재하며 미선택 상태를 허용하지 않는다. Checkbox와의 차이 — 하나만 선택 가능하며 단독으로 사용하지 않는다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | md (기본, 클래스 없음) · sm → `radio--sm` | md |
| state | disabled → `radio--disabled` | — |
| group direction | vertical (기본, 클래스 없음) · horizontal → `radio-group--horizontal` | vertical |

---

## Anatomy

<!-- AI:
- root = label.radio. 크기·상태 클래스를 root에 조합.
- input: 네이티브 <input type="radio">. appearance: none으로 시각적으로만 제거하고 control 위에 절대 위치. 접근성 트리 유지 필수 — display:none / visibility:hidden 금지.
- control: span.radio__control. 시각적 원형 박스. aria-hidden="true".
  - selected: CSS :checked로 background brand-selected + border brand + ::after dot 표시.
- dot: radio__control::after. inset:0 + margin:auto로 정중앙 고정, px 고정 크기로 정원 보장 (md=12px, sm=10px). display:none → block으로 전환.
- label text: span.radio__label.
- 그룹: <fieldset class="radio-group"> + <legend> + 동일 name 속성 필수. label.radio를 하위에 나열. gap은 --space-stack-sm.
  - 세로형 (기본, 클래스 없음): flex-direction column.
  - 가로형: radio-group--horizontal 추가 → flex-direction row, gap --space-gap-md.
  - form-field 안에서는 legend 대신 div.form-field__label(id) + aria-labelledby 패턴 사용 — form-field.md 참조.
- disabled: input에 disabled + aria-disabled="true" + tabindex="-1". root에 radio--disabled.
- Radio는 단독으로 사용하지 않는다 — 항상 fieldset.radio-group 안에 배치.
- 그룹에는 반드시 기본 선택값을 지정한다 — 미선택 상태를 허용하지 않으므로 error 상태가 존재하지 않는다.
-->

### 그룹

:::preview
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap">
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로형</p>
  <fieldset data-component class="radio-group">
    <legend class="text-form-label" style="float:none;margin-bottom:var(--space-stack-xs)">성별</legend>
    <label class="radio radio--sm"><input type="radio" name="rg-v" checked /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">남성</span></label>
    <label class="radio radio--sm"><input type="radio" name="rg-v" /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">여성</span></label>
    <label class="radio radio--sm"><input type="radio" name="rg-v" /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">선택 안 함</span></label>
  </fieldset>
</div>
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로형</p>
  <fieldset data-component class="radio-group radio-group--horizontal">
    <legend class="text-form-label" style="float:none;margin-bottom:var(--space-stack-xs)">성별</legend>
    <label class="radio radio--sm"><input type="radio" name="rg-h" checked /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">남성</span></label>
    <label class="radio radio--sm"><input type="radio" name="rg-h" /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">여성</span></label>
    <label class="radio radio--sm"><input type="radio" name="rg-h" /><span class="radio__control" aria-hidden="true"></span><span class="radio__label">선택 안 함</span></label>
  </fieldset>
</div>
</div>
:::

### 기본

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">unselected</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="radio radio--sm">
      <input type="radio" name="ex-sm-a" />
      <span class="radio__control" aria-hidden="true"></span>
      <span class="radio__label">선택 안 함</span>
    </label>
    <label data-component class="radio">
      <input type="radio" name="ex-md-a" />
      <span class="radio__control" aria-hidden="true"></span>
      <span class="radio__label">선택 안 함</span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">selected</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="radio radio--sm">
      <input type="radio" name="ex-sm-b" checked />
      <span class="radio__control" aria-hidden="true"></span>
      <span class="radio__label">선택함</span>
    </label>
    <label data-component class="radio">
      <input type="radio" name="ex-md-b" checked />
      <span class="radio__control" aria-hidden="true"></span>
      <span class="radio__label">선택함</span>
    </label>
  </div>
</div>
</div>
:::

### 상태

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="radio radio--sm radio--disabled">
      <input type="radio" name="ex-sm-dis" disabled aria-disabled="true" tabindex="-1" />
      <span class="radio__control" aria-hidden="true"></span>
      <span class="radio__label">현재 선택 불가</span>
    </label>
    <label data-component class="radio radio--disabled">
      <input type="radio" name="ex-md-dis" disabled aria-disabled="true" tabindex="-1" />
      <span class="radio__control" aria-hidden="true"></span>
      <span class="radio__label">현재 선택 불가</span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled selected</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="radio radio--sm radio--disabled">
      <input type="radio" name="ex-sm-disc" checked disabled aria-disabled="true" tabindex="-1" />
      <span class="radio__control" aria-hidden="true"></span>
      <span class="radio__label">변경할 수 없는 선택</span>
    </label>
    <label data-component class="radio radio--disabled">
      <input type="radio" name="ex-md-disc" checked disabled aria-disabled="true" tabindex="-1" />
      <span class="radio__control" aria-hidden="true"></span>
      <span class="radio__label">변경할 수 없는 선택</span>
    </label>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Group ── */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
  border: none;
  padding: 0;
  margin: 0;
}
.radio-group--horizontal {
  flex-direction: row;
  gap: var(--space-gap-md);
}

/* ── Base ── */
.radio {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
  cursor: pointer;
  position: relative;
}

/* input: 시각적으로만 제거. control 위에 위치해 포커스 링이 control에 정렬된다 */
.radio input[type="radio"] {
  appearance: none;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: var(--icon-md);
  height: var(--icon-md);
  margin: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1;
}

/* ── Control ── */
.radio__control {
  width: var(--icon-md);
  height: var(--icon-md);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: 50%;
  background: var(--color-surface-base);
  flex-shrink: 0;
  position: relative;
}

/* dot: inset:0 + margin:auto — px 고정으로 정원 보장, 브라우저 렌더링 오차 없음 */
.radio__control::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 12px; /* control 파생 크기 — 토큰화 불가 */
  height: 12px; /* control 파생 크기 — 토큰화 불가 */
  border-radius: 50%;
  background: var(--color-fill-brand);
  display: none;
}
.radio--sm .radio__control::after {
  width: 10px; /* control 파생 크기 — 토큰화 불가 */
  height: 10px; /* control 파생 크기 — 토큰화 불가 */
}

.radio input:checked ~ .radio__control {
  background: var(--color-action-brand-selected);
  border-color: var(--color-border-brand);
}
.radio input:checked ~ .radio__control::after { display: block; }

/* ── Label ── */
.radio__label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
}

/* ── Size ── */
/* input 크기 = control 크기 — 포커스 링이 control에 정렬되도록 일치시킨다 */
.radio--sm input[type="radio"] { width: var(--icon-sm); height: var(--icon-sm); }
.radio--sm .radio__control { width: var(--icon-sm); height: var(--icon-sm); }
.radio--sm .radio__label { font-size: var(--font-size-sm); }

/* ── Hover ── */
.radio:hover:not(.radio--disabled) .radio__control {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}

/* ── State ── */
/* disabled: selected color 오버라이드 포함 */
.radio--disabled { pointer-events: none; }
.radio--disabled .radio__control {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
}
.radio--disabled input:checked ~ .radio__control {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
}
.radio--disabled input:checked ~ .radio__control::after {
  background: var(--color-text-disabled);
}
.radio--disabled .radio__label { color: var(--color-text-disabled); }
```

---

## 접근성

체크박스·라디오 그룹 유형 (`accessibility.md` 체크박스·라디오 그룹 행 적용).

| 상황 | 마크업 |
|------|--------|
| 그룹 | `<fieldset class="radio-group">` + `<legend>` + 동일 `name` 속성 필수 — 스크린리더가 그룹 맥락을 각 항목 읽기 전에 함께 읽는다 |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| 키보드 | `↑↓` 또는 `←→`로 같은 `name` 그룹 내 이동. 포커스 링은 전역 `*:focus-visible` 규칙으로 input 위에 표시 — 별도 CSS 불필요 |

---

## Do / Don't

> ✅ DO — 같은 그룹은 `<fieldset class="radio-group">` + `<legend>` + 동일 `name` 속성 사용
> `<fieldset class="radio-group"><legend>결제 수단</legend><label class="radio">...</label></fieldset>`

> ✅ DO — 그룹에 항상 기본 선택값 지정
> 미선택 상태는 사용자에게 혼란을 준다. `checked` 속성으로 초기값을 반드시 설정한다

> ❌ DON'T — 기본 선택값 없이 Radio 그룹 제공
> 미선택 상태는 허용하지 않는다. 의식적 선택을 유도하고 싶다면 Select를 사용한다

> ❌ DON'T — Radio를 단독으로 사용
> 단일 on/off에는 Checkbox 또는 Toggle 사용

> ❌ DON'T — 모드·뷰 전환에 사용
> 판정 질문 "이 선택을 바꾸면 저장되는 데이터가 달라지나?"가 아니오면(입력칸·뷰만 바뀌면) Segment 사용 — segment.md 선택 기준 참조

> ❌ DON'T — input에 `display:none` 또는 `visibility:hidden` 적용
> 접근성 트리에서 제거된다. `appearance: none`으로 시각적으로만 제거해야 한다
