---
file: components/atoms/divider.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md
---

# Divider

## 개요

콘텐츠 영역을 시각적으로 구분하는 선. 비인터랙티브 컴포넌트. 의미 있는 섹션 구분에는 `<hr>`을, 장식용으로만 쓰일 때는 CSS border를 직접 사용한다.

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
  <span>또는</span>
  <hr />
</div>
```

:::preview
<style>
  .divider {
    border: none;
    border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
    margin: 0;
  }
  .divider--vertical {
    display: inline-block;
    width: 0;
    border-top: none;
    border-left: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
    align-self: stretch;
    margin: 0 var(--space-generic-sm);
  }
  .divider--labeled {
    display: flex; align-items: center; gap: var(--space-gap-sm);
  }
  .divider--labeled hr {
    flex: 1; border: none;
    border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
    margin: 0;
  }
  .divider--labeled span {
    font-family: var(--font-family-base);
    font-size: var(--font-size-label);
    color: var(--color-text-subtle);
    white-space: nowrap;
  }
</style>
<div style="display:flex; flex-direction:column; gap:16px; max-width:320px;">
  <hr class="divider" />
  <div style="display:flex; align-items:center; height:24px;">
    <span>텍스트</span>
    <span class="divider divider--vertical" role="separator" aria-orientation="vertical"></span>
    <span>텍스트</span>
  </div>
  <div class="divider divider--labeled">
    <hr /><span>또는</span><hr />
  </div>
</div>
:::

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| orientation | horizontal · vertical | horizontal |

---

## 접근성

비인터랙티브 컴포넌트. 키보드 접근·focus·disabled 불해당.

의미 있는 구분선: `<hr>` 사용 — 스크린리더가 섹션 구분으로 읽는다.
수직 구분선 또는 장식용: `role="separator"` + `aria-orientation` 또는 `aria-hidden="true"`.

---

## Do / Don't

> ✅ DO — 의미 있는 섹션 구분에 `<hr>` 사용
> `<hr class="divider" />`

> ❌ DON'T — 레이아웃 간격 조절용으로 Divider 사용
> 여백에는 space 토큰 사용

> ✅ DO — 수직 구분선에 `aria-orientation="vertical"` 명시
> `<span class="divider divider--vertical" role="separator" aria-orientation="vertical">`
