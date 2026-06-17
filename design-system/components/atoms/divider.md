---
file: components/atoms/divider.md
version: 1.0.1
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md
---

# Divider

## 개요

콘텐츠 영역을 시각적으로 구분하는 선. 비인터랙티브 컴포넌트. 의미 있는 섹션 구분에는 `<hr>`을, 장식용으로만 쓰일 때는 CSS border를 직접 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| orientation | horizontal · vertical | horizontal (기본, 클래스 없음) |
| labeled | — | — (텍스트 포함 시 `divider--labeled` 래퍼 사용) |

---

## Anatomy

<!-- AI: root(.divider). 수평이 기본. 수직은 인라인 요소 사이 구분에 사용한다. -->

```html
<!-- 수평 (기본) -->
<hr class="divider" />

<!-- 수직 -->
<span class="divider divider--vertical" role="separator" aria-orientation="vertical"></span>

<!-- 텍스트 포함 (섹션 구분) -->
<div class="divider divider--labeled">
  <hr />
  <span class="text-helper">또는</span>
  <hr />
</div>
```

:::preview
<div style="display:flex; flex-direction:column; gap: var(--space-gap-lg); max-width:320px;">
  <hr data-component class="divider" />
  <div style="display:flex; align-items:center;">
    <span>텍스트</span>
    <span data-component class="divider divider--vertical" role="separator" aria-orientation="vertical"></span>
    <span>텍스트</span>
  </div>
  <div data-component class="divider divider--labeled">
    <hr /><span class="text-helper">또는</span><hr />
  </div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
/* 수평 구분선. <hr> 기본 border를 제거하고 border-top으로 단일 선을 그린다.
   <hr>의 기본 margin을 0으로 초기화해 레이아웃 제어를 부모에 위임한다. */
.divider {
  border: none;
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  margin: 0;
}

/* ── Vertical ── */
/* 수직 구분선. inline-block + align-self:stretch로 부모 높이에 맞게 늘어난다.
   border-top을 none으로 덮어쓰고 border-left로 수직선을 그린다. */
.divider--vertical {
  display: inline-block;
  width: 0;
  border-top: none;
  border-left: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  border-radius: 0;
  align-self: stretch;
  margin: 0 var(--space-generic-sm);
}

/* ── Labeled ── */
/* 텍스트를 중앙에 두고 양쪽에 선을 그리는 레이아웃.
   내부 <hr>은 flex:1로 남은 공간을 채운다. */
.divider--labeled {
  display: flex;
  align-items: center;
  gap: var(--space-gap-sm);
}

.divider--labeled hr {
  flex: 1;
  border: none;
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  margin: 0;
}
/* .divider--labeled span: text-helper 유틸리티 클래스(typography.css)로 타이포 처리.
   CSS에서 별도 font 속성 선언 불필요. */
```

---

## 접근성

비인터랙티브 컴포넌트. 키보드 접근·focus·disabled 불해당.

| 항목 | 내용 |
|------|------|
| 의미 있는 구분선 | `<hr>` 사용 — 스크린리더가 섹션 구분으로 읽음 |
| 수직 구분선 | `role="separator"` + `aria-orientation="vertical"` |
| 장식용 구분선 | `aria-hidden="true"` 추가 권장 |

---

## Do / Don't

> ✅ DO — 의미 있는 섹션 구분에 `<hr>` 사용
> `<hr class="divider" />`

> ❌ DON'T — 레이아웃 간격 조절용으로 Divider 사용
> 여백에는 space 토큰 사용

> ✅ DO — 상하 여백은 부모에서 stack 토큰으로 제어
> `margin-block: var(--space-stack-md);` (또는 부모 flex의 `gap: var(--space-gap-lg)`)

> ❌ DON'T — 컴포넌트에 margin 직접 부여
> `.divider { margin: 16px 0; }` — 맥락마다 여백 크기가 달라 부모에 위임한다

> ✅ DO — 수직 구분선에 `aria-orientation="vertical"` 명시
> `<span class="divider divider--vertical" role="separator" aria-orientation="vertical">`

> ❌ DON'T — labeled 텍스트에 유틸리티 클래스 없이 font 속성 직접 선언
> `font-family: var(--font-family-base); font-size: var(--font-size-label);` 대신 `class="text-helper"` 사용
