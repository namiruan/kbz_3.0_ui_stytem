---
file: components/atoms/input.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/typography.md
---

# Input

## 개요

단일 줄 텍스트 입력 필드. Label·HelpText와 함께 쓰일 때는 FormField(Molecule)를 사용한다. Input은 입력 영역 단독 컴포넌트다.

---

## Anatomy

<!-- AI: root(.input), 선택적으로 앞뒤에 아이콘 래퍼(.input--icon-left, .input--icon-right) 추가 가능 -->

```html
<!-- 기본 -->
<input class="input input--md" type="text" placeholder="입력하세요" />

<!-- 에러 -->
<input class="input input--md input--error" type="text" aria-invalid="true" aria-describedby="field-error" />

<!-- disabled -->
<input class="input input--md input--disabled" type="text" disabled aria-disabled="true" tabindex="-1" />

<!-- 아이콘 포함 (래퍼 필요) -->
<div class="input-wrapper input-wrapper--icon-left">
  <span class="input-icon" aria-hidden="true"><!-- icon --></span>
  <input class="input input--md" type="text" />
</div>
```

:::preview
<style>
  .input {
    display: block; width: 100%;
    border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
    border-radius: var(--radius-md);
    background: var(--color-surface-base);
    color: var(--color-text-body);
    font-family: var(--font-family-base);
    outline: none;
  }
  .input--sm { height: var(--height-compact); padding: var(--space-inset-squish-sm); font-size: var(--font-size-sm); }
  .input--md { height: var(--height-base); padding: var(--space-inset-squish-md); font-size: var(--font-size-base); }
  .input:hover { border-color: var(--color-border-selected); }
  .input:focus-visible { border-color: var(--color-border-brand); outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px; }
  .input::placeholder { color: var(--color-text-subtle); }
  .input--error { border-color: var(--color-border-error); }
  .input--error:focus-visible { outline-color: var(--color-border-focus); }
  .input--disabled { background: var(--color-surface-disabled); color: var(--color-text-disabled); border-color: var(--color-border-disabled); pointer-events: none; }
</style>
<div style="display:flex; flex-direction:column; gap:8px; max-width:320px;">
  <input class="input input--md" type="text" placeholder="기본" />
  <input class="input input--md input--error" type="text" value="오류 상태" aria-invalid="true" />
  <input class="input input--md input--disabled" type="text" placeholder="비활성" disabled />
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

> ✅ DO — FormField와 함께 Label을 항상 연결
> `<label for="name">이름</label><input id="name" class="input input--md" />`

> ❌ DON'T — placeholder를 label 대용으로 사용
> 입력 시 placeholder가 사라지면 레이블 역할 불가

> ✅ DO — 에러 시 `aria-invalid` + `aria-describedby` 함께 적용
> `<input aria-invalid="true" aria-describedby="name-error" />`

> ❌ DON'T — padding으로 높이 조절
> height 토큰으로 높이를 고정한다
