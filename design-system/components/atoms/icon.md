---
file: components/atoms/icon.md
version: 1.0.0
updated: 2026-05-21
status: draft
depends-on: components/_index.md, accessibility.md, tokens/icon.md, tokens/color.md
---

# Icon

## 개요

SVG 아이콘 래퍼. 크기·색상은 `tokens/icon.md`에 정의된 유틸리티 클래스로 제어한다. 단색형(`fill="currentColor"`)과 조합형(path별 시멘틱 토큰 직접 지정) 두 방식을 모두 수용한다.

---

## Variant

| 차원 | 허용값 | 기본값 | 적용 대상 |
|------|--------|--------|----------|
| size | badge · sm · md · lg · xl | md | 모든 아이콘 |
| padding | off (기본, 클래스 없음) · on → `icon-on--{size}` | off | 모든 아이콘 |
| color | brand · dark · white · disabled | — (currentColor 상속) | 단색형 + 진입 메뉴 6종 |

`icon-on--{size}`는 `icon--{size}`와 함께 사용하지 않는다. padding on 시 `icon-on--{size}` 단독으로 크기를 제어한다.

color 차원은 단색형과 진입 메뉴 아이콘 6종에만 적용한다. 그 외 조합형은 color 클래스를 사용하지 않는다. 예외 메커니즘은 `tokens/icon.md § 조합형 CSS 변수` 참조.

---

## 단색형 vs 조합형

**정의:** SVG path의 `fill` 속성으로 결정된다. `fill="currentColor"`이면 단색형, `fill="var(--icon-...)"` 변수이면 조합형.
**검증:** 갤러리에서 color 필터 전환 시 전체 색상이 바뀌면 단색형, 바뀌지 않으면 조합형.

변수 목록·네이밍 규칙·color 모드 override 표는 `tokens/icon.md § 조합형 CSS 변수` 참조.

### 단색형 (Monochrome)

모든 path가 `fill="currentColor"`. `.icon--{color}` 유틸리티 클래스로 색상을 제어한다.

```html
<span class="icon icon--md icon--brand" aria-hidden="true">
  <svg aria-hidden="true">
    <path fill="currentColor" d="..." />
  </svg>
</span>
```

### 조합형 (Composite)

path마다 `fill="var(--icon-[이름]-[부분])"` CSS 변수로 색상을 지정하며, 기본적으로 시멘틱 토큰을 참조한다. `.icon--{color}` 클래스를 적용하지 않는다. `icon-pdf`·`icon-excel`은 제품 고유 색상이므로 예외적으로 hex 값을 fallback으로 직접 지정한다.

```html
<span class="icon icon--md" aria-hidden="true">
  <svg aria-hidden="true">
    <rect fill="var(--icon-new-bg, var(--color-text-caution))" />
    <path fill="var(--icon-new-n,  var(--color-text-inverse))" />
  </svg>
</span>
```

---

## 사용 지침

### 선택 기준

| 상황 | 처리 방식 |
|------|----------|
| 텍스트와 함께 — 아이콘이 보조 장식 | root에 `aria-hidden="true"`. color는 부모에서 상속하거나 color 클래스 적용 |
| 아이콘 단독 — 의미 전달 | root에 `role="img"` + `aria-label` 필수. svg에도 `aria-hidden="true"` |
| 아이콘이 버튼 역할 — 클릭 가능 | `<button>`을 root로, `icon-on--{size}` 적용, `aria-label` 필수 |
| 접기/펼치기 상태 표시 | 열린 상태: `icon-chevron-down` / 닫힌 상태: `icon-collapse` |

---

## Anatomy

<!-- AI: root(.icon + size class), svg(aria-hidden="true" 항상).
  - 장식(decoration): root에 aria-hidden="true". color 클래스 또는 부모 color 상속.
  - 단독(standalone): root에 role="img" + aria-label. svg에도 aria-hidden="true".
  - 단독 버튼: button이 root, icon-on--{size} 적용, aria-label 필수. icon--{size}와 혼용 금지.
  - 단색형/조합형 구분은 sprite.svg symbol 내부 path fill 방식으로 결정된다. 아이콘 목록은 아래 갤러리 참조. -->

### 아이콘 목록

아이콘 이름을 클릭하면 ID가 복사됩니다. size · color 필터를 조합해 실제 적용 모습을 확인할 수 있습니다. color 필터 전환 시 색이 바뀌면 단색형, 바뀌지 않으면 조합형입니다.

:::icon-gallery
:::

---

## CSS

```css
/* ── Base ── */
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
  flex-shrink: 0;
  /* 진입 메뉴 아이콘 변수 기본값 (brand 모드) — 변수 정의는 tokens/icon.md § 진입 메뉴 아이콘 참조 */
  --icon-menu-vivid: var(--color-text-brand-vivid);
  --icon-menu-deep:  var(--color-text-brand-muted);
  --icon-menu-dark:  var(--color-text-body);
  --icon-menu-light: var(--color-text-inverse);
}
.icon svg { width: 100%; height: 100%; shape-rendering: geometricPrecision; }

/* ── Size ── */
.icon--badge { width: var(--icon-badge); height: var(--icon-badge); }
.icon--sm    { width: var(--icon-sm);    height: var(--icon-sm); }
.icon--md    { width: var(--icon-md);    height: var(--icon-md); }
.icon--lg    { width: var(--icon-lg);    height: var(--icon-lg); }
.icon--xl    { width: var(--icon-xl);    height: var(--icon-xl); }

/* ── Color (단색형 전용) ── */
.icon--brand    { color: var(--color-text-brand-vivid); }
.icon--dark     { color: var(--color-text-body); }
.icon--white    { color: var(--color-text-inverse); }
.icon--disabled { color: var(--color-text-disabled); }

/* ── 조합형 disabled override ── */
.icon--disabled,
:disabled .icon,
[disabled] .icon,
.btn--disabled .icon {
  --icon-new-bg:    var(--color-text-disabled);
  --icon-new-n:     var(--color-surface-disabled);
  --icon-pdf-bg:    var(--color-text-disabled);
  --icon-pdf-fg:    var(--color-surface-disabled);
  --icon-excel-lt:  var(--color-border-subtle);
  --icon-excel-ml:  var(--color-border-default);
  --icon-excel-md:  var(--color-text-disabled);
  --icon-excel-dk:  var(--color-text-subtle);
  --icon-excel-x:   var(--color-surface-disabled);
  --icon-menu-vivid: var(--color-text-disabled);
  --icon-menu-deep:  var(--color-text-subtle);
  --icon-menu-dark:  var(--color-text-subtle);
  --icon-menu-light: var(--color-surface-disabled);
}

/* ── icon-file-drop: color 컨텍스트별 배경 ── */
/* 기본(중립): SVG fallback --color-action-neutral-selected 사용 */
.icon--brand { --icon-file-drop-bg: var(--color-action-brand-selected); }
.icon--white { --icon-file-drop-bg: var(--color-action-light-selected); }

/* ── 진입 메뉴 아이콘: color 모드 override ── */
.icon--dark {
  --icon-menu-vivid: var(--color-text-label);
  --icon-menu-deep:  var(--color-text-display);
  --icon-menu-dark:  var(--color-text-body);
  --icon-menu-light: var(--color-text-inverse);
}
.icon--white {
  --icon-menu-vivid: var(--color-border-subtle);
  --icon-menu-deep:  var(--color-border-default);
  --icon-menu-dark:  var(--color-text-inverse);
  --icon-menu-light: var(--color-text-body);
}
```

---

## 접근성

비인터랙티브 SVG 유형 (`accessibility.md` 아이콘 행 적용).

| 상황 | 마크업 |
|------|--------|
| 장식 (텍스트와 함께) | root에 `aria-hidden="true"` |
| 단독 의미 전달 | root에 `role="img"` + `aria-label="액션명"`, svg에 `aria-hidden="true"` |
| 단독 버튼 | `<button aria-label="액션명">` root, 내부 svg에 `aria-hidden="true"` |

색상 대비: lg(24px) 이상은 3:1 이상, sm(16px) 이하는 텍스트 기준(4.5:1) 권장.

---

## Do / Don't

> ✅ DO — 장식 아이콘에 `aria-hidden="true"` 적용
> `<span class="icon icon--md icon--brand" aria-hidden="true"><svg>...</svg></span>`

> ✅ DO — 단독 의미 전달 시 `role="img"` + `aria-label` 부여
> `<span class="icon icon--md" role="img" aria-label="설정"><svg aria-hidden="true">...</svg></span>`

> ✅ DO — 단독 버튼은 `<button>`을 root로
> `<button class="icon-on--md icon--brand" aria-label="삭제"><svg aria-hidden="true">...</svg></button>`

> ❌ DON'T — `icon-on--{size}`와 `icon--{size}` 함께 사용
> `<div class="icon-on--md icon--md">` — `icon-on--{size}` 단독으로 크기를 제어한다

> ❌ DON'T — SVG에 직접 크기 속성 지정
> `<svg width="20" height="20">` → `.icon--md` 클래스로 제어

> ❌ DON'T — 아이콘 색상에 Primitive 토큰 직접 참조
> `color: var(--color-blue-500)` → 단색형은 `.icon--brand` 등 color 유틸리티 클래스 사용

> ❌ DON'T — data-component 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용. 실제 구현 코드에서는 제거한다.

---

## 플래너 패턴

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<span class="icon icon--md" aria-hidden="true">
  <svg aria-hidden="true"><use href="icons/sprite.svg#{icon-id}"/></svg>
</span>
```

변형: `icon--badge` · `icon--sm` · `icon--lg` · `icon--xl`
색상 (단색형 전용): `icon--brand` · `icon--dark` · `icon--white` · `icon--disabled`
단독 의미 전달: `role="img"` + `aria-label="{액션명}"` (aria-hidden 제거)
JS init: 없음
