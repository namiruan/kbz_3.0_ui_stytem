---
file: components/atoms/spinner.md
version: 1.3.3
status: draft
depends-on: components/_index.md, accessibility.md, tokens/motion.md, tokens/color.md, tokens/stroke.md, tokens/space.md, tokens/icon.md, tokens/typography.md
---

# Spinner

## 개요

비동기 작업 진행 중임을 나타내는 로딩 인디케이터. 1–3초의 예측 불가한 짧은 작업에 사용한다. 레이아웃을 예측할 수 있는 긴 로딩에는 Skeleton을 사용한다. (`product.md` Loading State 참조)

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | sm · md(기본, 클래스 없음) · lg | md |

---

## Anatomy

<!-- AI:
- root = div.spinner. 단독 사용 시 role="status" + aria-live="polite" 필수. 버튼 내 사용 시 root에 aria-hidden="true".
- 첫 번째 자식 span[aria-hidden="true"] — 회전하는 원형 아크. border-top-color가 강조 아크. JS 불필요.
- 두 번째 자식 span.sr-only — 스크린리더 전용 텍스트. "불러오는 중..." 등 문맥에 맞는 문구 필수.
- size 기본값 md — 클래스 없음. sm → spinner--sm, lg → spinner--lg.
- 문구와 함께 쓸 때는 외부 래퍼(flex-direction:column + align-items:center + gap:space-stack-xs)로 감싼다. 텍스트는 spinner 하단에 배치. spinner 자체 구조는 변경하지 않는다.
-->

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">size</span>
  <div class="btn-group" style="align-items:flex-end;gap:var(--space-gap-xl)">
    <div data-component style="display:flex;flex-direction:column;align-items:center;gap:var(--space-stack-sm)">
      <div class="spinner spinner--sm" role="status" aria-live="polite">
        <span aria-hidden="true"></span>
        <span class="sr-only">불러오는 중...</span>
      </div>
      <span style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);line-height:var(--line-height-ui)">불러오는 중...</span>
    </div>
    <div data-component style="display:flex;flex-direction:column;align-items:center;gap:var(--space-stack-sm)">
      <div class="spinner" role="status" aria-live="polite">
        <span aria-hidden="true"></span>
        <span class="sr-only">불러오는 중...</span>
      </div>
      <span style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);line-height:var(--line-height-ui)">불러오는 중...</span>
    </div>
    <div data-component style="display:flex;flex-direction:column;align-items:center;gap:var(--space-stack-sm)">
      <div class="spinner spinner--lg" role="status" aria-live="polite">
        <span aria-hidden="true"></span>
        <span class="sr-only">불러오는 중...</span>
      </div>
      <span style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);line-height:var(--line-height-ui)">불러오는 중...</span>
    </div>
  </div>
</div>
</div>
:::

---

## CSS

```css
@keyframes spinner-rotate {
  to { transform: rotate(360deg); }
}

/* ── Base ── */
/* display:inline-flex — 아이콘처럼 inline 흐름에 자연스럽게 배치 */
.spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 회전하는 원형 아크. border-top-color로 브랜드 아크, 나머지 3면은 subtle 트랙 */
.spinner > span:first-child {
  display: block;
  width: var(--icon-xl);
  height: var(--icon-xl);
  border-radius: 50%;
  border: var(--stroke-lg) solid var(--color-border-subtle);
  border-top-color: var(--color-border-brand);
  /* linear: 등속 회전 — 가속·감속이 없어야 자연스러운 무한 반복 */
  animation: spinner-rotate var(--duration-pulse) linear infinite;
}

/* ── Size: sm ── */
.spinner--sm > span:first-child {
  width: var(--icon-sm);
  height: var(--icon-sm);
}

/* ── Size: lg ── */
.spinner--lg > span:first-child {
  width: var(--icon-2xl);
  height: var(--icon-2xl);
  border-width: var(--stroke-lg);
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .spinner > span:first-child {
    animation: none;
    opacity: 0.4;
  }
}
```

---

## 접근성

비인터랙티브 컴포넌트. 키보드 접근·focus·disabled 불해당.

| 상황 | 마크업 |
|------|--------|
| 단독 사용 | `role="status"` + `aria-live="polite"` + `.sr-only` 텍스트 필수 |
| 버튼 내 사용 | Spinner에 `aria-hidden="true"` — 버튼에 `aria-busy="true"` + `tabindex="-1"` 적용 |
| `.sr-only` 문구 | `불러오는 중...` · `저장 중...` 등 동작 맥락에 맞게 작성 (`product.md` 참조) |
| prefers-reduced-motion | 애니메이션 중단 + opacity 0.4 — CSS `@media` 로 대응 (CSS 섹션 포함) |

---

## Do / Don't

> ✅ DO — 단독 사용 시 `role="status"` + `.sr-only` 텍스트 제공
> `<div class="spinner" role="status" aria-live="polite"><span aria-hidden="true"></span><span class="sr-only">불러오는 중...</span></div>`

> ✅ DO — 문구와 함께 쓸 때 외부 래퍼로 상하 정렬
> `<div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-stack-sm)">` 로 spinner + 텍스트를 감싸 스피너 아래 문구를 배치한다

> ✅ DO — 버튼 내 사용 시 Spinner에 `aria-hidden="true"`, 버튼에 `aria-busy="true"`
> `<button aria-busy="true" tabindex="-1"><span class="spinner spinner--sm" aria-hidden="true">…</span></button>`

> ❌ DON'T — 1초 미만 작업에 Spinner 표시
> 깜빡임 방지를 위해 최소 1초 이상 지속될 작업에만 표시 (`product.md` 참조)

> ❌ DON'T — Spinner 표시 중 레이아웃 변경
> 컴포넌트 크기 고정 유지 필수 — 로딩 전후 동일한 공간 확보
