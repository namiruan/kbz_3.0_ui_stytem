---
file: components/atoms/textarea.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md
---

# Textarea

## 개요

여러 줄 텍스트 입력 필드. Input과의 차이 — 줄바꿈이 필요한 긴 텍스트 입력에 사용한다. 높이는 고정하지 않고 콘텐츠에 따라 조정할 수 있다.

---

## Anatomy

<!-- AI: root(.textarea). height 토큰을 사용하지 않고 rows 속성 또는 min-height로 최소 높이를 지정한다. -->

```html
<!-- 기본 -->
<textarea class="textarea textarea--md" rows="4" placeholder="내용을 입력하세요"></textarea>

<!-- 에러 -->
<textarea class="textarea textarea--md textarea--error" rows="4" aria-invalid="true" aria-describedby="field-error"></textarea>

<!-- disabled -->
<textarea class="textarea textarea--md textarea--disabled" rows="4" disabled aria-disabled="true" tabindex="-1"></textarea>
```

:::preview
<style>
  .textarea {
    display: block; width: 100%;
    border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
    border-radius: var(--radius-md);
    background: var(--color-surface-base);
    color: var(--color-text-body);
    font-family: var(--font-family-base);
    resize: vertical;
    outline: none;
  }
  .textarea--sm { padding: var(--space-inset-sm); font-size: var(--font-size-sm); }
  .textarea--md { padding: var(--space-inset-md); font-size: var(--font-size-base); }
  .textarea:hover { border-color: var(--color-border-selected); }
  .textarea:focus-visible { border-color: var(--color-border-brand); outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px; }
  .textarea::placeholder { color: var(--color-text-subtle); }
  .textarea--error { border-color: var(--color-border-error); }
  .textarea--disabled { background: var(--color-surface-disabled); color: var(--color-text-disabled); border-color: var(--color-border-disabled); pointer-events: none; }
</style>
<div style="display:flex; flex-direction:column; gap:8px; max-width:320px;">
  <textarea class="textarea textarea--md" rows="3" placeholder="기본"></textarea>
  <textarea class="textarea textarea--md textarea--error" rows="3" aria-invalid="true">오류 상태</textarea>
  <textarea class="textarea textarea--md textarea--disabled" rows="3" disabled>비활성</textarea>
</div>
:::

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | sm · md | md |

---

## 접근성

텍스트 인풋 유형 (`design-system/accessibility.md` 텍스트 인풋 행 적용).

키보드 접근·focus·disabled·색상 대비·에러 메시지 해당.

에러 상태: `aria-invalid="true"` + `aria-describedby`로 에러 메시지 연결.

---

## Do / Don't

> ✅ DO — 최소 높이를 `rows` 속성으로 지정
> `<textarea rows="4">` — 내용이 늘어나면 자동 확장

> ❌ DON'T — height 토큰으로 높이 고정
> Textarea는 멀티라인이므로 height 고정 금지

> ✅ DO — resize: vertical 허용 (기본값)
> 수평 resize만 금지: `resize: horizontal` → 레이아웃 깨짐
