---
file: components/atoms/icon.md
version: 1.2.0
updated: 2026-05-21
status: draft
depends-on: components/_index.md, accessibility.md, tokens/icon.md, tokens/color.md
---

# Icon

## 개요

SVG 아이콘 래퍼. 크기·색상은 `tokens/icon.md`에 정의된 유틸리티 클래스로 제어한다. 단색형(`fill="currentColor"`)과 조합형(path별 시멘틱 토큰 직접 지정) 두 방식을 모두 수용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | badge · sm · md · lg · xl | md |
| padding | off (기본, 클래스 없음) · on → `icon-on--{size}` | off |
| color | brand · dark · white · disabled | — (currentColor 상속) |

`icon-on--{size}`는 `icon--{size}`와 함께 사용하지 않는다. padding on 시 `icon-on--{size}` 단독으로 크기를 제어한다.

color 차원은 단색형(`fill="currentColor"`) 아이콘에만 적용한다. 조합형은 SVG path에 시멘틱 토큰을 직접 지정하므로 color 유틸리티 클래스를 사용하지 않는다.

---

## 사용 지침

### 선택 기준

| 상황 | 처리 방식 |
|------|-----------|
| 텍스트와 함께 — 아이콘이 보조 장식 | root에 `aria-hidden="true"`. color는 부모에서 상속하거나 color 클래스 적용 |
| 아이콘 단독 — 의미 전달 | root에 `role="img"` + `aria-label` 필수. svg에도 `aria-hidden="true"` |
| 아이콘이 버튼 역할 — 클릭 가능 | `<button>`을 root로, `icon-on--{size}` 적용, `aria-label` 필수 |

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
/* icon-new 조합형: disabled 상태에서 바탕색 override */
.icon--disabled,
:disabled .icon,
[disabled] .icon,
.btn--disabled .icon {
  --icon-new-bg:    var(--color-text-disabled);
  --icon-new-n:     var(--color-surface-disabled);
  --icon-pdf-bg: var(--color-text-disabled);
  --icon-pdf-fg: var(--color-surface-disabled);
  --icon-excel-lt: var(--color-border-subtle);   /* gray-200 — 밝은 셀 */
  --icon-excel-ml: var(--color-border-default);  /* gray-300 — 중밝은 셀 */
  --icon-excel-md: var(--color-text-disabled);   /* gray-400 — 중간 셀·오버레이 */
  --icon-excel-dk: var(--color-text-subtle);     /* gray-500 — 어두운 셀 */
  --icon-excel-x:  var(--color-surface-disabled); /* gray-100 — X 글자 */
}

/* icon-file-drop 조합형: 컨텍스트별 배경 selected 색상 */
/* 기본(중립): var(--icon-file-drop-bg) 미지정 시 SVG 기본값 --color-action-neutral-selected 사용 */
.icon--brand    { --icon-file-drop-bg: var(--color-action-brand-selected); }
.icon--white    { --icon-file-drop-bg: var(--color-action-light-selected); }
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
