---
file: components/atoms/spinner.md
version: 1.6.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/motion.md, tokens/color.md, tokens/stroke.md, tokens/space.md, tokens/icon.md, tokens/typography.md
---

# Spinner

## 개요

비동기 작업 진행 중임을 나타내는 로딩 인디케이터. 완료 시점을 예측할 수 없는 짧은 작업에 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | sm · md(기본, 클래스 없음) · lg | md |
| color | (기본) · inverse | (기본) |

---

## 사용 지침

### 선택 기준

| 상황 | 사용 |
|------|------|
| 1–3초, 완료 시점 예측 불가 | Spinner |
| 3초 이상, 레이아웃 예측 가능 | Skeleton |
| 진행률 수치 표시 가능 | ProgressBar |
| 1초 미만 즉각 응답 | 표시 안 함 — 깜빡임 유발 |

### 사용 패턴

| 패턴 | 방법 |
|------|------|
| 단독 | `div.spinner` + `role="status"` + `aria-live="polite"` |
| 버튼 내 삽입 (밝은 배경) | `span.spinner` + `aria-hidden="true"` — ghost·solid 버튼에서 기본 색상 유지 |
| 버튼 내 삽입 (어두운 배경) | `span.spinner.spinner--inverse` + `aria-hidden="true"` — primary·secondary·danger fill 버튼 필수 |
| 문구 동반 | 외부 `flex-column` 래퍼로 감싸 스피너 아래 텍스트 배치 |

---

## 동작

배경 밝기에 따라 color variant를 구분한다. 배경이 어두운 fill 버튼에서는 기본 트랙·아크가 배경색과 겹치므로 `spinner--inverse`를 적용한다.

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">밝은 배경</span>
  <div class="btn-group">
    <button class="btn btn--ghost btn--md" aria-busy="true" tabindex="-1">
      <span class="spinner spinner--sm" aria-hidden="true">
        <span aria-hidden="true"></span>
      </span>
      불러오는 중
    </button>
    <button class="btn btn--primary btn--solid btn--md" aria-busy="true" tabindex="-1">
      <span class="spinner spinner--sm" aria-hidden="true">
        <span aria-hidden="true"></span>
      </span>
      불러오는 중
    </button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">어두운 배경</span>
  <div class="btn-group">
    <button class="btn btn--primary btn--md" aria-busy="true" tabindex="-1">
      <span class="spinner spinner--sm spinner--inverse" aria-hidden="true">
        <span aria-hidden="true"></span>
      </span>
      불러오는 중
    </button>
    <button class="btn btn--secondary btn--md" aria-busy="true" tabindex="-1">
      <span class="spinner spinner--sm spinner--inverse" aria-hidden="true">
        <span aria-hidden="true"></span>
      </span>
      불러오는 중
    </button>
    <button class="btn btn--danger btn--md" aria-busy="true" tabindex="-1">
      <span class="spinner spinner--sm spinner--inverse" aria-hidden="true">
        <span aria-hidden="true"></span>
      </span>
      불러오는 중
    </button>
  </div>
</div>
</div>
:::

---

## Anatomy

<!-- AI:
- root 단독 사용 시 div.spinner, 버튼 내 삽입 시 span.spinner — inline 흐름 유지를 위해 span 사용.
- 단독 사용 시 role="status" + aria-live="polite" 필수. 버튼 내 사용 시 root에 aria-hidden="true".
- 첫 번째 자식 span[aria-hidden="true"] — 회전하는 원형 아크. border-top-color가 강조 아크. JS 불필요.
- 두 번째 자식 span.sr-only — 스크린리더 전용 텍스트. "불러오는 중..." 등 문맥에 맞는 문구 필수.
- size 기본값 md — 클래스 없음. sm → spinner--sm, lg → spinner--lg.
- color 기본값 — 클래스 없음. fill 버튼(primary·secondary·danger) 위에서 spinner--inverse 추가.
- root는 아이콘 토큰 크기로 고정(bounding box). 내부 원은 상하좌우 2px 인세트 — 아이콘 내부 여백 기준과 맞춤.
- 문구와 함께 쓸 때는 외부 래퍼(flex-direction:column + align-items:center + gap:space-stack-sm)로 감싼다. 텍스트는 spinner 하단에 배치.
- Anatomy preview의 외부 flex 래퍼·btn-group은 뷰어 레이아웃 전용. 실제 컴포넌트 루트는 .spinner.
-->

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">size</span>
  <div class="btn-group" style="align-items:flex-end;gap:var(--space-gap-xl)">
    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-stack-sm)">
      <div data-component class="spinner spinner--sm" role="status" aria-live="polite">
        <span aria-hidden="true"></span>
        <span class="sr-only">불러오는 중...</span>
      </div>
      <span style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);line-height:var(--line-height-ui)">불러오는 중...</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-stack-sm)">
      <div data-component class="spinner" role="status" aria-live="polite">
        <span aria-hidden="true"></span>
        <span class="sr-only">불러오는 중...</span>
      </div>
      <span style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);line-height:var(--line-height-ui)">불러오는 중...</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-stack-sm)">
      <div data-component class="spinner spinner--lg" role="status" aria-live="polite">
        <span aria-hidden="true"></span>
        <span class="sr-only">불러오는 중...</span>
      </div>
      <span style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);line-height:var(--line-height-ui)">불러오는 중...</span>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">색상</span>
  <div class="btn-group" style="align-items:center;gap:var(--space-gap-xl)">
    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-stack-sm)">
      <div data-component class="spinner" role="status" aria-live="polite">
        <span aria-hidden="true"></span>
        <span class="sr-only">불러오는 중...</span>
      </div>
      <span style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);line-height:var(--line-height-ui)">기본</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-stack-sm);background:var(--color-surface-dark);padding:var(--space-inset-squish-md);border-radius:var(--radius-sm)">
      <div data-component class="spinner spinner--inverse" role="status" aria-live="polite">
        <span aria-hidden="true"></span>
        <span class="sr-only">불러오는 중...</span>
      </div>
      <span style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-inverse);line-height:var(--line-height-ui)">inverse</span>
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
/* root는 아이콘 토큰 크기로 고정 — 아이콘과 동일한 상하좌우 2px 내부 여백 기준 유지 */
.spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-xl);
  height: var(--icon-xl);
}

/* 회전하는 원형 아크. border-top-color로 브랜드 아크, 나머지 3면은 subtle 트랙 */
/* calc()로 상하좌우 2px 인세트 — root bounding box 대비 아이콘 내부 여백 기준 */
.spinner > span:first-child {
  display: block;
  width: calc(var(--icon-xl) - 4px);
  height: calc(var(--icon-xl) - 4px);
  border-radius: 50%;
  border: var(--stroke-lg) solid var(--color-border-subtle);
  border-top-color: var(--color-border-brand);
  /* linear: 등속 회전 — 가속·감속이 없어야 자연스러운 무한 반복 */
  animation: spinner-rotate var(--duration-pulse) linear infinite;
}

/* ── Size: sm ── */
.spinner--sm {
  width: var(--icon-sm);
  height: var(--icon-sm);
}

/* 16px 원에 stroke-lg(4px)는 시각 비율 과대 — stroke-md(2px)로 조정 */
.spinner--sm > span:first-child {
  width: calc(var(--icon-sm) - 4px);
  height: calc(var(--icon-sm) - 4px);
  border-width: var(--stroke-md);
}

/* ── Size: lg ── */
.spinner--lg {
  width: var(--icon-2xl);
  height: var(--icon-2xl);
}

.spinner--lg > span:first-child {
  width: calc(var(--icon-2xl) - 4px);
  height: calc(var(--icon-2xl) - 4px);
}

/* ── Inverse (채도 높은 fill 배경 위) ── */
/* currentColor로 부모의 color를 계승 — btn--primary 등의 color:white를 트랙·아크 모두에 적용 */
.spinner--inverse > span:first-child {
  border-color: color-mix(in srgb, currentColor 30%, transparent);
  border-top-color: currentColor;
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

> ✅ DO — fill 버튼 내 사용 시 `span` 태그 + `spinner--inverse` 적용
> `<button class="btn btn--primary" aria-busy="true" tabindex="-1"><span class="spinner spinner--sm spinner--inverse" aria-hidden="true"><span aria-hidden="true"></span></span></button>`

> ❌ DON'T — fill 버튼 내에서 `spinner--inverse` 생략
> 기본 트랙(gray-200)·아크(blue-500)는 파란 배경 위에서 구분 불가 — fill 버튼에는 반드시 `spinner--inverse` 적용

> ❌ DON'T — 1초 미만 작업에 Spinner 표시
> 깜빡임 방지를 위해 최소 1초 이상 지속될 작업에만 표시 (`product.md` 참조)

> ❌ DON'T — Spinner 표시 중 레이아웃 변경
> 컴포넌트 크기 고정 유지 필수 — 로딩 전후 동일한 공간 확보

> ❌ DON'T — 3초 이상 예측 가능한 로딩에 Spinner 사용
> 레이아웃을 예측할 수 있는 긴 로딩에는 Skeleton 사용
