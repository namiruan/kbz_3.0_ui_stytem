---
file: components/atoms/progress.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/radius.md, tokens/motion.md
---

# Progress

## 개요

작업 진행률을 시각적으로 표시하는 수평 바. 진행률을 알 수 있는 경우 determinate, 소요 시간을 알 수 없는 경우 indeterminate를 사용한다. 순환형 로딩 표시는 Spinner를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| type | determinate · indeterminate | determinate (기본, 클래스 없음) |
| size | sm · md | md (기본, 클래스 없음) |

---

## Anatomy

<!-- AI: root(.progress). 내부 구조: .progress__track(배경 트랙) > .progress__fill(채워지는 바).
determinate: aria-valuenow를 JS로 업데이트하고 .progress__fill의 width를 동기화한다.
indeterminate: .progress--indeterminate 클래스 추가, aria-valuenow 생략, aria-busy="true".
fill 너비는 inline style(width: N%)로만 제어 — JavaScript가 담당한다. -->

```html
<!-- Determinate — 60% -->
<div data-component
  class="progress"
  role="progressbar"
  aria-valuenow="60"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="파일 업로드 진행률"
>
  <div class="progress__track">
    <div class="progress__fill" style="width: 60%"></div>
  </div>
</div>

<!-- Indeterminate -->
<div data-component
  class="progress progress--indeterminate"
  role="progressbar"
  aria-busy="true"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="데이터 로딩 중"
>
  <div class="progress__track">
    <div class="progress__fill"></div>
  </div>
</div>

<!-- sm -->
<div data-component
  class="progress progress--sm"
  role="progressbar"
  aria-valuenow="40"
  aria-valuemin="0"
  aria-valuemax="100"
>
  <div class="progress__track">
    <div class="progress__fill" style="width: 40%"></div>
  </div>
</div>
```

:::preview
<div style="display:flex; flex-direction:column; gap: var(--space-gap-xl); max-width: 400px;">

  <div style="display:flex; flex-direction:column; gap: var(--space-gap-xs);">
    <span class="text-helper">Determinate (60%)</span>
    <div data-component class="progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" aria-label="진행률">
      <div class="progress__track"><div class="progress__fill" style="width:60%"></div></div>
    </div>
  </div>

  <div style="display:flex; flex-direction:column; gap: var(--space-gap-xs);">
    <span class="text-helper">Indeterminate</span>
    <div data-component class="progress progress--indeterminate" role="progressbar" aria-busy="true" aria-valuemin="0" aria-valuemax="100" aria-label="로딩 중">
      <div class="progress__track"><div class="progress__fill"></div></div>
    </div>
  </div>

  <div style="display:flex; flex-direction:column; gap: var(--space-gap-xs);">
    <span class="text-helper">sm</span>
    <div data-component class="progress progress--sm" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
      <div class="progress__track"><div class="progress__fill" style="width:40%"></div></div>
    </div>
  </div>

</div>
:::

---

## CSS

```css
/* ── Base ── */
.progress {
  display: block;
  width: 100%;
}

.progress__track {
  width: 100%;
  height: var(--space-generic-xs);   /* 4px 트랙 높이 — inset/gap 범주 외 예외 */
  background: var(--color-surface-neutral);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.progress__fill {
  height: 100%;
  background: var(--color-button-brand);
  border-radius: var(--radius-pill);
  transition: width var(--duration-base) var(--easing-symmetric);
}

/* ── Size: sm ── */
.progress--sm .progress__track {
  height: var(--space-inset-xs);    /* 2px — 좁은 레이아웃·테이블 인라인 용 */
}

/* ── Type: Indeterminate ── */
/* 진행률 미확정. fill이 트랙 위를 좌→우 반복 이동한다. */
@keyframes progress-indeterminate {
  0%   { transform: translateX(-100%); width: 40%; }
  50%  { width: 60%; }
  100% { transform: translateX(300%); width: 40%; }
}

.progress--indeterminate .progress__fill {
  width: 40%;
  animation: progress-indeterminate calc(var(--duration-pulse) * 2) var(--easing-symmetric) infinite;
  /* calc() — duration-pulse(750ms) 단일 토큰으로는 shimmer 속도가 빨라 2배로 늦춤 */
}
```

---

## 접근성

비인터랙티브 상태 표시 컴포넌트. 키보드 포커스 불해당.

| 항목 | 내용 |
|------|------|
| role | `role="progressbar"` 필수 |
| determinate | `aria-valuenow` (현재값) · `aria-valuemin` · `aria-valuemax` 명시. JS로 aria-valuenow와 fill width를 동기화 |
| indeterminate | `aria-valuenow` 생략, `aria-busy="true"` 추가 |
| label | `aria-label` 또는 연결된 `<label>`로 목적 설명 |

---

## Do / Don't

> ✅ DO — determinate에 aria-valuenow 동기화
> JS: `el.setAttribute('aria-valuenow', value); fill.style.width = value + '%';`

> ❌ DON'T — indeterminate에 aria-valuenow 명시
> `aria-valuenow`가 있으면 스크린리더가 진행률이 있는 것으로 읽음

> ✅ DO — 진행률 미확정 시 indeterminate
> `<div class="progress progress--indeterminate" role="progressbar" aria-busy="true">`

> ❌ DON'T — 순환형 로딩에 Progress 사용
> 소요 시간 미확정 전체 화면 로딩에는 Spinner 사용
