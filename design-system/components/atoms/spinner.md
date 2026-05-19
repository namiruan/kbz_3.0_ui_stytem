---
file: components/atoms/spinner.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/motion.md
---

# Spinner

## 개요

비동기 작업 진행 중임을 나타내는 로딩 인디케이터. 1–3초의 예측 불가한 짧은 작업에 사용한다. 레이아웃을 예측할 수 있는 긴 로딩에는 Skeleton을 사용한다. (`product.md` Loading State 참조)

---

## Anatomy

<!-- AI: root(.spinner). 항상 .sr-only 텍스트를 함께 제공한다. 단독으로 쓰일 때는 래퍼에 aria-busy="true"와 aria-live="polite"를 적용한다. -->

```html
<!-- 단독 사용 -->
<div class="spinner spinner--md" role="status" aria-live="polite">
  <span aria-hidden="true"></span>
  <span class="sr-only">불러오는 중...</span>
</div>

<!-- 버튼 내부 (버튼에 aria-busy 적용) -->
<button class="btn btn--primary btn--md btn--loading" aria-busy="true" tabindex="-1">
  <span class="spinner spinner--sm" aria-hidden="true"></span>
  <span class="sr-only">저장 중...</span>
</button>
```

:::preview
<style>
  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner { display: inline-flex; align-items: center; justify-content: center; }
  .spinner span:first-child {
    display: block; border-radius: 50%;
    border: var(--stroke-md) solid var(--color-border-subtle);
    border-top-color: var(--color-button-brand);
    animation: spin 0.75s linear infinite;
  }
  .spinner--sm span:first-child { width: 14px; height: 14px; }
  .spinner--md span:first-child { width: 20px; height: 20px; }
  .spinner--lg span:first-child { width: 28px; height: 28px; }
</style>
<div style="display:flex; gap:24px; align-items:center;">
  <div class="spinner spinner--sm" role="status"><span></span><span class="sr-only">로딩 중</span></div>
  <div class="spinner spinner--md" role="status"><span></span><span class="sr-only">로딩 중</span></div>
  <div class="spinner spinner--lg" role="status"><span></span><span class="sr-only">로딩 중</span></div>
</div>
:::

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | sm · md · lg | md |

---

## 접근성

비인터랙티브 컴포넌트. 키보드 접근·focus·disabled 불해당.

loading 상태 규칙 적용. `role="status"` + `aria-live="polite"` + `.sr-only` 텍스트 필수.

버튼 내부에 사용 시 Spinner 자체에는 `aria-hidden="true"` 적용. 버튼에 `aria-busy="true"` 적용.

`prefers-reduced-motion: reduce` 대응 필수 — 애니메이션 중단 또는 opacity 변화로 대체.

`.sr-only` 문구: `불러오는 중...` · `저장 중...` 등 (`product.md` 로딩 메시지 참조)

---

## Do / Don't

> ✅ DO — 단독 사용 시 `role="status"` + `.sr-only` 텍스트 제공
> `<div class="spinner spinner--md" role="status"><span class="sr-only">불러오는 중...</span></div>`

> ❌ DON'T — 1초 미만 작업에 Spinner 표시
> 깜빡임 방지를 위해 최소 1초 이상 지속될 작업에만 표시 (`product.md` 참조)

> ❌ DON'T — Spinner 표시 중 레이아웃 변경
> 컴포넌트 크기 고정 유지 필수
