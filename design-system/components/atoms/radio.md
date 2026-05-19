---
file: components/atoms/radio.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md
---

# Radio

## 개요

그룹 내 단일 항목 선택. 반드시 2개 이상의 항목을 `<fieldset>` + `<legend>`로 묶어 그룹으로 제공한다. Checkbox와의 차이 — 하나만 선택 가능하며 단독으로 사용하지 않는다.

---

## Anatomy

<!-- AI: root(.radio), input(네이티브 <input type="radio">), label(.radio__label). 항상 name 속성으로 같은 그룹임을 명시한다. -->

```html
<fieldset>
  <legend>결제 수단</legend>
  <label class="radio radio--md">
    <input type="radio" name="payment" value="card" />
    <span class="radio__label">신용카드</span>
  </label>
  <label class="radio radio--md">
    <input type="radio" name="payment" value="transfer" />
    <span class="radio__label">계좌이체</span>
  </label>
</fieldset>

<!-- 에러 -->
<label class="radio radio--md radio--error">
  <input type="radio" name="payment" aria-invalid="true" aria-describedby="field-error" />
  <span class="radio__label">신용카드</span>
</label>

<!-- disabled -->
<label class="radio radio--md radio--disabled">
  <input type="radio" name="payment" disabled aria-disabled="true" tabindex="-1" />
  <span class="radio__label">신용카드</span>
</label>
```

:::preview
<style>
  .radio { display: inline-flex; align-items: center; gap: var(--space-gap-xs); cursor: pointer; }
  .radio--md input { width: 16px; height: 16px; accent-color: var(--color-button-brand); cursor: pointer; }
  .radio--md .radio__label { font-family: var(--font-family-base); font-size: var(--font-size-base); color: var(--color-text-body); }
  .radio--md input:focus-visible { outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px; }
  .radio--error input { accent-color: var(--color-button-error); }
  .radio--error .radio__label { color: var(--color-text-error); }
  .radio--disabled { pointer-events: none; }
  .radio--disabled .radio__label { color: var(--color-text-disabled); }
</style>
<fieldset style="border:none; padding:0; display:flex; flex-direction:column; gap:8px;">
  <legend style="font-family:var(--font-family-base); font-size:var(--font-size-sm); color:var(--color-text-subtle); margin-bottom:4px;">결제 수단</legend>
  <label class="radio radio--md"><input type="radio" name="ex" value="a" /><span class="radio__label">신용카드</span></label>
  <label class="radio radio--md"><input type="radio" name="ex" value="b" checked /><span class="radio__label">계좌이체 (선택됨)</span></label>
  <label class="radio radio--md radio--disabled"><input type="radio" name="ex" value="c" disabled /><span class="radio__label">비활성</span></label>
</fieldset>
:::

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | sm · md | md |

---

## 접근성

체크박스·라디오 그룹 유형 (`design-system/accessibility.md` 체크박스·라디오 그룹 행 적용).

키보드 접근·focus·disabled·색상 대비·에러 메시지 해당.

`<fieldset>` + `<legend>` + 동일 `name` 속성 필수. 키보드 `↑↓` 또는 `←→`로 그룹 내 이동.

---

## Do / Don't

> ✅ DO — 같은 그룹은 동일한 `name` 속성 사용
> `<input type="radio" name="payment" value="card">`

> ❌ DON'T — Radio를 단독으로 사용
> 단일 on/off에는 Checkbox 또는 Toggle 사용

> ❌ DON'T — `<fieldset>` 없이 그룹 제공
> 스크린리더가 그룹 맥락 없이 각 항목만 읽는다
