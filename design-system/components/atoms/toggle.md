---
file: components/atoms/toggle.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/motion.md, tokens/elevation.md, tokens/icon.md
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
- track: span.toggle__track. 시각적 트랙(pill 형태). off/disabled 상태는 배경색이 페이지 배경과 동일할 수 있으므로 inset box-shadow로 테두리를 표시 — CSS border 대신 box-shadow를 사용해 box model 변화 없이 thumb 오프셋을 유지. on 상태는 파란 배경이 형태를 자체 정의하므로 inset 제거. focus ring은 input:focus-visible ~ .toggle__track 셀렉터로 track에 표시 — input이 0×0이므로 sibling 셀렉터 활용, input 자체의 focus outline은 나타나지 않는다.
- thumb: span.toggle__thumb. 트랙 내 슬라이딩 원형 핸들. top:50%+translateY(-50%)로 수직 중앙 고정. input:checked 시 translateY(-50%) translateX로 이동 — translateX = track너비 - thumb너비 - left간격 - right간격 (md: 36-12-4-4=16px, sm: 28-10-2-2=14px). md left:--space-4(4px)로 1px inset 테두리와 3px 시각 여백 확보.
- label text: span.toggle__label (optional). 레이블 없는 경우 input에 aria-label 필수.
- disabled: input에 disabled + aria-disabled="true" + tabindex="-1". root에 toggle--disabled. opacity 단독 처리 금지 — track/label에 각각 disabled 토큰 적용.
- disabled off/on 구분: input:not(:checked) ~ .toggle__track .toggle__thumb 셀렉터로 disabled-off thumb만 회색 처리 — disabled-on은 흰 thumb 유지해 켜짐을 표현.
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
/* inset box-shadow로 테두리 — box model 영향 없어 thumb 오프셋 재계산 불필요 */
.toggle__track {
  position: relative;
  display: inline-block;
  width: 36px;
  height: var(--icon-md);
  background: var(--color-action-brand-idle);
  border-radius: var(--radius-pill);
  flex-shrink: 0;
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-brand-subtle);
  transition: background var(--duration-base) var(--easing-base),
              box-shadow var(--duration-base) var(--easing-base);
}

/* ── Thumb ── */
/* top:50%+translateY(-50%)로 수직 중앙 정렬 — track 높이 변경에 무관 */
.toggle__thumb {
  position: absolute;
  top: 50%;
  left: var(--space-4); /* 대응 Semantic 토큰 없어 Primitive 직접 참조 */
  width: 12px;
  height: 12px;
  background: var(--color-text-inverse);
  border-radius: 50%;
  box-shadow: var(--shadow-sm), 0 0 0 var(--stroke-sm) var(--color-border-brand-subtle);
  transform: translateY(-50%);
  transition: transform var(--duration-base) var(--easing-symmetric);
}

/* ── Label ── */
.toggle__label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
}

/* ── Size: sm ── */
/* sm thumb(10px)·translateX(14px) space 토큰 없어 px 고정 */
.toggle--sm .toggle__track { width: 28px; height: var(--icon-sm); }
.toggle--sm .toggle__thumb { left: var(--space-2); /* 대응 Semantic 토큰 없어 Primitive 직접 참조 */ width: 10px; height: 10px; }
.toggle--sm .toggle__label { font-size: var(--font-size-sm); }

/* ── On ── */
/* 파란 배경이 형태를 자체 정의하므로 inset 불필요 */
.toggle input:checked ~ .toggle__track {
  background: var(--color-fill-brand);
  box-shadow: none;
}
/* translateX: track(36) - thumb(12) - left(4) - right(4) = 16px */
.toggle input:checked ~ .toggle__track .toggle__thumb { transform: translateY(-50%) translateX(var(--space-16)); /* 대응 Semantic 토큰 없어 Primitive 직접 참조 */ }
/* sm translateX: track(28) - thumb(10) - left(2) - right(2) = 14px */
.toggle--sm input:checked ~ .toggle__track .toggle__thumb { transform: translateY(-50%) translateX(14px); }

/* ── Hover ── */
/* hover off: inset 유지 + 외곽 ring */
.toggle:hover:not(.toggle--disabled) .toggle__track {
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-brand-subtle),
              0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
/* hover on: 외곽 ring만 */
.toggle:hover:not(.toggle--disabled) input:checked ~ .toggle__track {
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}

/* ── Focus ── */
.toggle input:focus-visible ~ .toggle__track {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── State: disabled ── */
/* off: surface-disabled(연한 회색) — border-disabled로 비활성 신호 */
/* on: surface-disabled-strong(진한 회색) — off보다 진해 켜짐 상태 구분 유지 */
.toggle--disabled { pointer-events: none; }
.toggle--disabled .toggle__track {
  background: var(--color-surface-disabled);
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-disabled);
}
.toggle--disabled input:checked ~ .toggle__track {
  background: var(--color-surface-disabled-strong);
  /* border-disabled(gray-200)와 배경(gray-200)이 동색이므로 border-default(gray-300)으로 명시 */
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-default);
}
.toggle--disabled input:not(:checked) ~ .toggle__track .toggle__thumb {
  background: var(--color-surface-base);
  box-shadow: none;
}
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
