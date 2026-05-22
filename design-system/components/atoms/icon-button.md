---
file: components/atoms/icon-button.md
version: 1.0.0
updated: 2026-05-22
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/radius.md, tokens/motion.md, tokens/icon.md, components/atoms/icon.md
---

# Icon Button

## 개요

아이콘 단독으로 구성되는 인터랙티브 버튼. 입력 필드 지우기·태그 삭제·팝업 닫기처럼 **컴포넌트 내부에 임베드되는 소형 액션**에 사용한다. 레이아웃 레벨의 툴바·헤더 액션은 `btn--icon-only`를 사용한다.

| 패턴 | 클래스 | 사용처 |
|------|--------|--------|
| Icon Button | `icon-on--badge` · `icon-on--sm` | 컴포넌트 내부 임베드 (입력 필드, 태그 등) |
| btn--icon-only | `btn btn--ghost btn--icon-only btn--{size}` | 툴바, 헤더, 독립 액션 영역 |

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | badge · sm | badge |
| state | default · hover · active · focus · disabled | default |

color는 부모 컨텍스트에서 상속한다. 입력 필드 에러 상태처럼 컨텍스트가 색상을 결정할 때 별도 클래스를 추가하지 않는다.

---

## 사용 지침

### btn--icon-only와의 구분

| | Icon Button | btn--icon-only |
|---|---|---|
| 크기 | badge(12px) · sm(16px) | sm(16px) · md(20px) · lg(24px) |
| 스타일 | 배경 없음 → hover tint | btn style(primary·ghost 등) 상속 |
| 위치 | 컴포넌트 내부 절대 배치 | 레이아웃 흐름 내 배치 |
| 예시 | 입력 지우기, 태그 삭제 | 헤더 메뉴, 툴바 액션 |

---

## Anatomy

<!-- AI: button이 root. icon-on--{size} 단독으로 크기 제어. icon--{size}와 혼용 금지.
  color는 부모에서 상속. disabled 시 pointer-events:none + color-text-disabled. -->

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">badge</span>
  <div class="btn-group">
    <button data-component class="icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    <button data-component class="icon-on--badge" type="button" aria-label="지우기" style="background:var(--color-action-neutral-hover)"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    <button data-component class="icon-on--badge" type="button" aria-label="지우기" style="background:var(--color-action-neutral-pressed)"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    <button data-component class="icon-on--badge" type="button" aria-label="지우기" disabled style="color:var(--color-text-disabled)"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sm</span>
  <div class="btn-group">
    <button data-component class="icon-on--sm" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    <button data-component class="icon-on--sm" type="button" aria-label="지우기" style="background:var(--color-action-neutral-hover)"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    <button data-component class="icon-on--sm" type="button" aria-label="지우기" style="background:var(--color-action-neutral-pressed)"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    <button data-component class="icon-on--sm" type="button" aria-label="지우기" disabled style="color:var(--color-text-disabled)"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>
</div>
<script>
var labels = ['default','hover','active','disabled'];
stage.querySelectorAll('.btn-group').forEach(function(g) {
  g.querySelectorAll('[data-component]').forEach(function(btn, i) {
    var lbl = document.createElement('div');
    lbl.textContent = labels[i] || '';
    lbl.style.cssText = 'font-family:var(--font-family-base);font-size:var(--font-size-label);color:var(--color-text-subtle);text-align:center;margin-top:var(--space-4)';
    var wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center';
    btn.parentNode.insertBefore(wrap, btn);
    wrap.appendChild(btn);
    wrap.appendChild(lbl);
  });
});
</script>
:::

---

## CSS

```css
/* ── Icon Button: 인터랙션 상태 ── */
/* icon-on--{size}를 button 요소에 사용할 때 hover·active·disabled 적용 */
button.icon-on--badge,
button.icon-on--sm {
  transition: background var(--duration-fast) var(--easing-base);
}
button.icon-on--badge:hover,
button.icon-on--sm:hover {
  background: var(--color-action-neutral-hover);
}
button.icon-on--badge:active,
button.icon-on--sm:active {
  background: var(--color-action-neutral-pressed);
}
button.icon-on--badge:disabled,
button.icon-on--sm:disabled {
  color: var(--color-text-disabled);
  pointer-events: none;
}
```

---

## 접근성

| 항목 | 규칙 |
|------|------|
| 레이블 | `aria-label` 필수. 아이콘만으로 의미를 알 수 없으므로 액션명을 명시한다 |
| SVG | 내부 svg에 `aria-hidden="true"` 적용 |
| 비활성 | `disabled` 속성 사용. `aria-disabled`는 포커스 유지가 필요한 경우에만 병행 사용 |
| 터치 영역 | badge(12px) 사이즈는 패딩 포함 최소 24px 확보 (`space-inset-xs` × 2 + 12px = 24px) |

---

## Do / Don't

> ✅ DO — `<button>` root에 `aria-label` 필수
> `<button class="icon-on--badge" aria-label="지우기"><svg aria-hidden="true">...</svg></button>`

> ✅ DO — color는 부모 컨텍스트에서 상속
> 입력 필드 에러 상태의 지우기 버튼 색상은 `.input-wrap:has(.input--error) .input-clear` 로 제어

> ❌ DON'T — `icon-on--{size}`와 `icon--{size}` 혼용
> `<button class="icon-on--badge icon--badge">` — `icon-on--{size}` 단독으로 크기 제어

> ❌ DON'T — 레이아웃 레벨 액션에 Icon Button 사용
> 툴바·헤더 액션은 `btn btn--ghost btn--icon-only` 사용

> ❌ DON'T — `<div>` · `<span>` 등 비버튼 요소에 인터랙션 기대
> `icon-on--{size}` 인터랙션 CSS는 `button` 요소에만 스코프됨
