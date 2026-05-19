---
file: components/atoms/toggle.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/motion.md
---

# Toggle

## 개요

즉시 적용되는 이진 설정(on/off)을 전환한다. Checkbox와의 차이 — 저장 액션 없이 변경이 즉시 반영될 때 사용한다. 폼 제출이 필요한 경우 Checkbox를 사용한다.

---

## Anatomy

<!-- AI: root(.toggle), input(네이티브 <input type="checkbox">로 상태 관리), track(.toggle__track), thumb(.toggle__thumb), label(.toggle__label, optional) -->

```html
<!-- 기본 (레이블 없음) -->
<label class="toggle toggle--md" aria-label="알림 활성화">
  <input type="checkbox" role="switch" />
  <span class="toggle__track">
    <span class="toggle__thumb"></span>
  </span>
</label>

<!-- 레이블 포함 -->
<label class="toggle toggle--md">
  <input type="checkbox" role="switch" />
  <span class="toggle__track">
    <span class="toggle__thumb"></span>
  </span>
  <span class="toggle__label">이메일 알림</span>
</label>

<!-- disabled -->
<label class="toggle toggle--md toggle--disabled">
  <input type="checkbox" role="switch" disabled aria-disabled="true" tabindex="-1" />
  <span class="toggle__track">
    <span class="toggle__thumb"></span>
  </span>
  <span class="toggle__label">이메일 알림</span>
</label>
```

:::preview
<style>
  .toggle { display: inline-flex; align-items: center; gap: var(--space-gap-sm); cursor: pointer; }
  .toggle input { position: absolute; opacity: 0; width: 0; height: 0; }
  .toggle__track {
    position: relative; display: inline-block;
    background: var(--color-surface-neutral);
    border-radius: var(--radius-pill);
    transition: background 0.15s;
  }
  .toggle--md .toggle__track { width: 36px; height: 20px; }
  .toggle__thumb {
    position: absolute; top: 2px; left: 2px;
    background: var(--color-text-inverse);
    border-radius: 50%;
    transition: transform 0.15s;
  }
  .toggle--md .toggle__thumb { width: 16px; height: 16px; }
  .toggle input:checked ~ .toggle__track { background: var(--color-button-brand); }
  .toggle--md input:checked ~ .toggle__track .toggle__thumb { transform: translateX(16px); }
  .toggle input:focus-visible ~ .toggle__track { outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px; }
  .toggle__label { font-family: var(--font-family-base); font-size: var(--font-size-base); color: var(--color-text-body); }
  .toggle--disabled { pointer-events: none; opacity: 0.4; }
</style>
<div style="display:flex; flex-direction:column; gap:12px;">
  <label class="toggle toggle--md">
    <input type="checkbox" role="switch" />
    <span class="toggle__track"><span class="toggle__thumb"></span></span>
    <span class="toggle__label">꺼짐</span>
  </label>
  <label class="toggle toggle--md">
    <input type="checkbox" role="switch" checked />
    <span class="toggle__track"><span class="toggle__thumb"></span></span>
    <span class="toggle__label">켜짐</span>
  </label>
  <label class="toggle toggle--md toggle--disabled">
    <input type="checkbox" role="switch" disabled />
    <span class="toggle__track"><span class="toggle__thumb"></span></span>
    <span class="toggle__label">비활성</span>
  </label>
</div>
:::

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | sm · md | md |

---

## 접근성

토글·스위치 유형 (`design-system/accessibility.md` 토글·스위치 행 적용).

키보드 접근·focus·disabled 해당.

`role="switch"` + `aria-checked`는 네이티브 `<input type="checkbox">`가 자동 처리. 레이블 없는 경우 `aria-label` 필수.

---

## Do / Don't

> ✅ DO — 즉시 반영되는 설정에만 사용
> 알림 on/off, 테마 전환 등 저장 없이 즉시 적용되는 경우

> ❌ DON'T — 폼 내 선택지에 Toggle 사용
> 저장 버튼이 있는 폼에서는 Checkbox 사용

> ✅ DO — 레이블 없는 Toggle에 `aria-label` 제공
> `<label class="toggle" aria-label="다크모드 활성화">`
