---
file: components/atoms/radio.md
version: 2.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md
---

# Radio

## 개요

그룹 내 단일 항목 선택. 반드시 2개 이상의 항목을 `<fieldset>` + `<legend>`로 묶어 그룹으로 제공한다. Checkbox와의 차이 — 하나만 선택 가능하며 단독으로 사용하지 않는다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | md (기본, 클래스 없음) · sm → `radio--sm` | md |
| state | disabled → `radio--disabled` · error → `radio--error` | — |

---

## Anatomy

<!-- AI:
- root = label.radio. 크기·상태 클래스를 root에 조합.
- input: 네이티브 <input type="radio">. 숨기거나 대체하지 않는다.
- label text: span.radio__label.
- 그룹: <fieldset> + <legend> + 동일 name 속성 필수. label.radio를 하위에 나열.
- disabled: input에 disabled + aria-disabled="true" + tabindex="-1". root에 radio--disabled.
- error: root에 radio--error. input에 aria-invalid="true" + aria-describedby.
-->

### 기본

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">unselected</span>
  <div class="btn-group">
    <label data-component class="radio radio--sm"><input type="radio" name="ex-sm-a" /><span class="radio__label">항목</span></label>
    <label data-component class="radio"><input type="radio" name="ex-md-a" /><span class="radio__label">항목</span></label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">selected</span>
  <div class="btn-group">
    <label data-component class="radio radio--sm"><input type="radio" name="ex-sm-b" checked /><span class="radio__label">항목</span></label>
    <label data-component class="radio"><input type="radio" name="ex-md-b" checked /><span class="radio__label">항목</span></label>
  </div>
</div>
</div>
:::

### 상태

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div class="btn-group">
    <label data-component class="radio radio--sm radio--error"><input type="radio" name="ex-sm-err" aria-invalid="true" /><span class="radio__label">항목</span></label>
    <label data-component class="radio radio--error"><input type="radio" name="ex-md-err" aria-invalid="true" /><span class="radio__label">항목</span></label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div class="btn-group">
    <label data-component class="radio radio--sm radio--disabled"><input type="radio" name="ex-sm-dis" disabled aria-disabled="true" tabindex="-1" /><span class="radio__label">항목</span></label>
    <label data-component class="radio radio--disabled"><input type="radio" name="ex-md-dis" disabled aria-disabled="true" tabindex="-1" /><span class="radio__label">항목</span></label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled selected</span>
  <div class="btn-group">
    <label data-component class="radio radio--sm radio--disabled"><input type="radio" name="ex-sm-disc" checked disabled aria-disabled="true" tabindex="-1" /><span class="radio__label">항목</span></label>
    <label data-component class="radio radio--disabled"><input type="radio" name="ex-md-disc" checked disabled aria-disabled="true" tabindex="-1" /><span class="radio__label">항목</span></label>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.radio {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
  cursor: pointer;
}

/* ── Control & Label ── */
/* accent-color: 브라우저 네이티브 라디오 색상. --color-button-brand(Primary fill)을 사용한다. */
.radio input[type="radio"] {
  width: var(--space-16);
  height: var(--space-16);
  accent-color: var(--color-button-brand);
  cursor: pointer;
  flex-shrink: 0;
}
.radio__label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
}

/* ── Size ── */
.radio--sm input[type="radio"] { width: var(--space-12); height: var(--space-12); }
.radio--sm .radio__label { font-size: var(--font-size-sm); }

/* ── State ── */
.radio--error input[type="radio"] { accent-color: var(--color-border-error); }
.radio--error .radio__label { color: var(--color-text-error); }
.radio--disabled { pointer-events: none; }
.radio--disabled .radio__label { color: var(--color-text-disabled); }
```

---

## 접근성

체크박스·라디오 그룹 유형 (`accessibility.md` 체크박스·라디오 그룹 행 적용).

| 상황 | 마크업 |
|------|--------|
| 그룹 | `<fieldset>` + `<legend>` + 동일 `name` 속성 필수 — 스크린리더가 그룹 맥락을 각 항목 읽기 전에 함께 읽는다 |
| 에러 | `aria-invalid="true"` + `aria-describedby="[error-id]"` |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |

키보드 `↑↓` 또는 `←→`로 같은 `name` 그룹 내 이동.

---

## Do / Don't

> ✅ DO — 같은 그룹은 `<fieldset>` + `<legend>` + 동일 `name` 속성 사용
> `<fieldset><legend>결제 수단</legend><label class="radio">...</label></fieldset>`

> ❌ DON'T — Radio를 단독으로 사용
> 단일 on/off에는 Checkbox 또는 Toggle 사용

> ❌ DON'T — CSS로만 선택 표시 구현 후 네이티브 input 숨김
> 스크린리더·키보드 접근 불가. 네이티브 `<input type="radio">` 유지 필수
