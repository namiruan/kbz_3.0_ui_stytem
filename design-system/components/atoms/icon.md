---
file: components/atoms/icon.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/icon.md
---

# Icon

## 개요

SVG 아이콘 래퍼. 크기·색상을 토큰으로 제어한다. 아이콘 단독으로 의미를 전달할 때는 반드시 `aria-label`을 제공한다. 텍스트와 함께 사용할 때는 장식으로 처리한다.

---

## Anatomy

<!-- AI: root(.icon). SVG는 aria-hidden="true"로 항상 숨긴다. 의미가 있는 경우 감싸는 요소에 aria-label을 부여한다. 아이콘 목록은 tokens/icon.md 참조. -->

```html
<!-- 장식 (텍스트와 함께) -->
<span class="icon icon--md" aria-hidden="true">
  <svg>...</svg>
</span>

<!-- 단독 (의미 있음) -->
<span class="icon icon--md" role="img" aria-label="설정">
  <svg aria-hidden="true">...</svg>
</span>
```

:::preview
<style>
  .icon { display: inline-flex; align-items: center; justify-content: center; color: currentColor; flex-shrink: 0; }
  .icon--sm  { width: 16px; height: 16px; }
  .icon--md  { width: 20px; height: 20px; }
  .icon--lg  { width: 24px; height: 24px; }
  .icon--xl  { width: 32px; height: 32px; }
  .icon svg  { width: 100%; height: 100%; }
</style>
<div style="display:flex; gap:16px; align-items:center; color:var(--color-text-body);">
  <span class="icon icon--sm" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8"/></svg></span>
  <span class="icon icon--md" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8"/></svg></span>
  <span class="icon icon--lg" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8"/></svg></span>
  <span class="icon icon--xl" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8"/></svg></span>
</div>
:::

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | sm · md · lg · xl | md |

---

## 접근성

아이콘 전용 규칙 (`design-system/accessibility.md` 아이콘 전용 항목 적용).

SVG에 `aria-hidden="true"` 항상 적용. 의미가 있는 경우 감싸는 요소에 `role="img"` + `aria-label` 부여.

색상 대비: 대형 아이콘(24px+) 3:1 이상, 소형 아이콘은 텍스트 기준(4.5:1) 권장.

---

## Do / Don't

> ✅ DO — 장식 아이콘에 `aria-hidden="true"` 적용
> `<span class="icon icon--md" aria-hidden="true"><svg>...</svg></span>`

> ✅ DO — 단독 아이콘에 `aria-label` 제공
> `<span class="icon icon--md" role="img" aria-label="닫기">`

> ❌ DON'T — 색상만으로 아이콘 의미 전달
> 색상 변경 시 `aria-label`도 함께 업데이트

> ❌ DON'T — SVG에 직접 크기 속성 지정
> `<svg width="20" height="20">` → CSS 클래스로 제어
