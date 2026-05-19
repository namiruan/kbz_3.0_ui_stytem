---
file: components/atoms/checkbox.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md
---

# Checkbox

## 개요

단일 또는 복수 항목 선택. 그룹으로 사용할 때는 `<fieldset>` + `<legend>`로 묶는다. Radio와의 차이 — 여러 항목을 동시에 선택할 수 있다.

---

## Anatomy

<!-- AI: root(.checkbox), input(네이티브 <input type="checkbox">), label(.checkbox__label) -->

```html
<!-- 단일 -->
<label class="checkbox checkbox--md">
  <input type="checkbox" />
  <span class="checkbox__label">항목 이름</span>
</label>

<!-- 그룹 -->
<fieldset>
  <legend>카테고리 선택</legend>
  <label class="checkbox checkbox--md">
    <input type="checkbox" />
    <span class="checkbox__label">옵션 A</span>
  </label>
  <label class="checkbox checkbox--md">
    <input type="checkbox" />
    <span class="checkbox__label">옵션 B</span>
  </label>
</fieldset>

<!-- 에러 -->
<label class="checkbox checkbox--md checkbox--error">
  <input type="checkbox" aria-invalid="true" aria-describedby="field-error" />
  <span class="checkbox__label">항목 이름</span>
</label>

<!-- disabled -->
<label class="checkbox checkbox--md checkbox--disabled">
  <input type="checkbox" disabled aria-disabled="true" tabindex="-1" />
  <span class="checkbox__label">항목 이름</span>
</label>
```

:::preview
<style>
  .checkbox { display: inline-flex; align-items: center; gap: var(--space-gap-xs); cursor: pointer; }
  .checkbox--md input { width: 16px; height: 16px; accent-color: var(--color-button-brand); cursor: pointer; }
  .checkbox--md .checkbox__label { font-family: var(--font-family-base); font-size: var(--font-size-base); color: var(--color-text-body); }
  .checkbox--md input:focus-visible { outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px; }
  .checkbox--error input { accent-color: var(--color-button-error); }
  .checkbox--error .checkbox__label { color: var(--color-text-error); }
  .checkbox--disabled { pointer-events: none; }
  .checkbox--disabled .checkbox__label { color: var(--color-text-disabled); }
</style>
<div style="display:flex; flex-direction:column; gap:8px;">
  <label class="checkbox checkbox--md"><input type="checkbox" /><span class="checkbox__label">기본</span></label>
  <label class="checkbox checkbox--md"><input type="checkbox" checked /><span class="checkbox__label">선택됨</span></label>
  <label class="checkbox checkbox--md checkbox--error"><input type="checkbox" /><span class="checkbox__label">에러</span></label>
  <label class="checkbox checkbox--md checkbox--disabled"><input type="checkbox" disabled /><span class="checkbox__label">비활성</span></label>
</div>
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

그룹 사용 시 `<fieldset>` + `<legend>` 필수.

---

## Do / Don't

> ✅ DO — 그룹에 `<fieldset>` + `<legend>` 사용
> 스크린리더가 그룹 맥락을 각 항목 읽기 전에 함께 읽는다

> ❌ DON'T — CSS로만 체크 표시 구현 후 네이티브 input 숨김
> 스크린리더·키보드 접근 불가. 네이티브 `<input type="checkbox">` 유지 필수

> ✅ DO — indeterminate 상태는 JS로 `input.indeterminate = true` 설정
