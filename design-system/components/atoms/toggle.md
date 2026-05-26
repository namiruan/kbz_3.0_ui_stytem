---
file: components/atoms/toggle.md
version: 1.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/motion.md
---

# Toggle

## 개요

즉시 적용되는 이진 설정(on/off)을 전환한다. Checkbox와의 차이 — 저장 액션 없이 변경이 즉시 반영될 때 사용한다. 폼 제출이 필요한 경우 Checkbox를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | md (기본, 클래스 없음) · sm → `toggle--sm` | md |
| state | disabled → `toggle--disabled` | — |

---

## Anatomy

<!-- AI:
- root = label.toggle. 크기·상태 클래스를 root에 조합.
- input: 네이티브 <input type="checkbox" role="switch">. position: absolute; opacity: 0; width: 0; height: 0으로 시각적으로 제거하되 접근성 트리는 유지 — display:none / visibility:hidden 금지.
- track: span.toggle__track. 시각적 트랙(pill 형태). on 상태에서 배경색 전환. focus ring은 input:focus-visible ~ .toggle__track 셀렉터로 track에 표시 — input이 0×0이므로 sibling 셀렉터 활용, input 자체의 focus outline은 나타나지 않는다.
- thumb: span.toggle__thumb. 트랙 내 슬라이딩 원형 핸들. top/left 고정 offset + input:checked 시 translateX로 이동. 트랙 크기에서 offset 2곳을 뺀 값만큼 이동 (md: 36-16-2-2=16px, sm: 28-12-2-2=12px).
- label text: span.toggle__label (optional). 레이블 없는 경우 input에 aria-label 필수.
- disabled: input에 disabled + aria-disabled="true" + tabindex="-1". root에 toggle--disabled. opacity 단독 처리 금지 — track/label에 각각 disabled 토큰 적용.
-->

### 기본

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">off</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="toggle toggle--sm">
      <input type="checkbox" role="switch" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">꺼짐</span>
    </label>
    <label data-component class="toggle">
      <input type="checkbox" role="switch" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">꺼짐</span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">on</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="toggle toggle--sm">
      <input type="checkbox" role="switch" checked />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">켜짐</span>
    </label>
    <label data-component class="toggle">
      <input type="checkbox" role="switch" checked />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">켜짐</span>
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
    <label data-component class="toggle toggle--sm toggle--disabled">
      <input type="checkbox" role="switch" disabled aria-disabled="true" tabindex="-1" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">비활성</span>
    </label>
    <label data-component class="toggle toggle--disabled">
      <input type="checkbox" role="switch" disabled aria-disabled="true" tabindex="-1" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">비활성</span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled on</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="toggle toggle--sm toggle--disabled">
      <input type="checkbox" role="switch" checked disabled aria-disabled="true" tabindex="-1" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">비활성 켜짐</span>
    </label>
    <label data-component class="toggle toggle--disabled">
      <input type="checkbox" role="switch" checked disabled aria-disabled="true" tabindex="-1" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">비활성 켜짐</span>
    </label>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
  cursor: pointer;
  position: relative;
}

/* input: 시각적으로만 제거. focus-visible은 sibling .toggle__track에 표시 */
.toggle input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
}

/* ── Track ── */
/* track 너비(36px/28px)는 space 토큰에 대응값이 없어 px 고정 */
.toggle__track {
  position: relative;
  display: inline-block;
  width: 36px;
  height: var(--space-20);
  background: var(--color-surface-neutral);
  border-radius: var(--radius-pill);
  flex-shrink: 0;
  transition: background var(--duration-base) var(--easing-base);
}

/* ── Thumb ── */
.toggle__thumb {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  width: var(--space-16);
  height: var(--space-16);
  background: var(--color-text-inverse);
  border-radius: 50%;
  transition: transform var(--duration-base) var(--easing-move);
}

/* ── Label ── */
.toggle__label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
}

/* ── Size: sm ── */
/* sm thumb(12px)·translateX(12px)도 space 토큰 없어 px 고정 */
.toggle--sm .toggle__track { width: 28px; height: var(--space-16); }
.toggle--sm .toggle__thumb { width: 12px; height: 12px; }
.toggle--sm .toggle__label { font-size: var(--font-size-sm); }

/* ── On ── */
.toggle input:checked ~ .toggle__track { background: var(--color-button-brand); }
.toggle input:checked ~ .toggle__track .toggle__thumb { transform: translateX(var(--space-16)); }
.toggle--sm input:checked ~ .toggle__track .toggle__thumb { transform: translateX(12px); }

/* ── Hover ── */
.toggle:hover:not(.toggle--disabled) .toggle__track {
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}

/* ── Focus ── */
.toggle input:focus-visible ~ .toggle__track {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── State: disabled ── */
.toggle--disabled { pointer-events: none; }
.toggle--disabled .toggle__track { background: var(--color-surface-disabled); }
.toggle--disabled input:checked ~ .toggle__track { background: var(--color-surface-disabled); }
.toggle--disabled .toggle__label { color: var(--color-text-disabled); }
```

---

## 접근성

토글·스위치 유형 (`accessibility.md` 토글·스위치 행 적용).

| 상황 | 마크업 |
|------|--------|
| on/off 상태 | `role="switch"` + 네이티브 `<input type="checkbox">` 조합으로 `aria-checked` 자동 처리 |
| 레이블 없음 | input에 `aria-label` 필수 — `<input type="checkbox" role="switch" aria-label="다크모드 활성화" />` |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| 키보드 | `Space`로 on/off 전환. 포커스 링은 `input:focus-visible ~ .toggle__track` 셀렉터로 track에 표시 — 별도 CSS 불필요 |

---

## Do / Don't

> ✅ DO — 즉시 반영되는 설정에만 사용
> 알림 on/off, 테마 전환 등 저장 없이 즉시 적용되는 경우

> ✅ DO — 레이블 없는 Toggle에 `aria-label` 제공
> `<input type="checkbox" role="switch" aria-label="다크모드 활성화" />`

> ❌ DON'T — 폼 내 선택지에 Toggle 사용
> 저장 버튼이 있는 폼에서는 Checkbox 사용

> ❌ DON'T — input에 `display:none` 또는 `visibility:hidden` 적용
> 접근성 트리에서 제거된다. `opacity: 0; width: 0; height: 0`으로 시각적으로만 제거해야 한다
