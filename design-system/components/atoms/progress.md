---
file: components/atoms/progress.md
version: 0.3.10
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/radius.md, tokens/motion.md, tokens/typography.md
---

# Progress

## 개요

작업 진행률을 시각적으로 표시하는 수평 바. 진행률을 알 수 있는 경우 determinate, 소요 시간을 알 수 없는 경우 indeterminate를 사용한다. 순환형 로딩 표시는 Spinner를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| type | determinate · indeterminate | determinate (기본, 클래스 없음) |

---

## Anatomy

<!-- AI: root(.progress) = display:flex 행. 내부 구조: .progress__track(flex:1 트랙) > .progress__fill(채워지는 바) + .progress__label(퍼센트 텍스트, optional).
determinate: JS로 aria-valuenow, fill width, label 텍스트를 동기화한다.
indeterminate: .progress--indeterminate 클래스 추가, aria-valuenow 생략, aria-busy="true", label 생략.
fill 너비는 inline style(width: N%)로만 제어 — JavaScript가 담당한다.
progress__label에는 text-helper(tokens/typography.css) 유틸리티 클래스를 병용해 텍스트 크기·행간을 적용한다. -->

```html
<!-- Determinate — 50% -->
<div data-component
  class="progress"
  role="progressbar"
  aria-valuenow="50"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="파일 업로드 진행률"
>
  <div class="progress__track">
    <div class="progress__fill" style="width: 50%"></div>
  </div>
  <span class="progress__label text-helper">50%</span>
</div>

<!-- Indeterminate — label 생략 -->
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
```

:::preview
<div style="display:flex; flex-direction:column; gap: var(--space-gap-xl); max-width: 400px;">

  <div style="display:flex; flex-direction:column; gap: var(--space-gap-xs);">
    <span class="text-helper">Determinate (50%)</span>
    <div data-component class="progress" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" aria-label="진행률">
      <div class="progress__track"><div class="progress__fill" style="width:50%"></div></div>
      <span class="progress__label text-helper">50%</span>
    </div>
  </div>

  <div style="display:flex; flex-direction:column; gap: var(--space-gap-xs);">
    <span class="text-helper">Indeterminate</span>
    <div data-component class="progress progress--indeterminate" role="progressbar" aria-busy="true" aria-valuemin="0" aria-valuemax="100" aria-label="로딩 중">
      <div class="progress__track"><div class="progress__fill"></div></div>
    </div>
  </div>

</div>
:::

---

## CSS

```css
/* ── Base ── */
/* .progress: 트랙과 레이블을 가로로 배치하는 flex 행 */
.progress {
  display: flex;
  align-items: center;
  gap: var(--space-gap-sm);
  width: 100%;
}

.progress__track {
  flex: 1;
  height: var(--space-generic-sm);              /* 8px 트랙 높이 — inset/gap 범주 외 예외 */
  background: var(--color-surface-brand-tint);  /* blue-100 — 연한 브랜드 배경 */
  border-radius: var(--radius-pill);
  overflow: hidden;                             /* indeterminate 애니메이션이 트랙 밖으로 나가지 않도록 */
}

.progress__fill {
  height: 100%;
  background: var(--color-fill-brand-vivid);    /* blue-500 — 범용 브랜드 solid fill 토큰 */
  border-radius: var(--radius-pill);
  transition: width var(--duration-base) var(--easing-symmetric);
}

/* ── Label ── */
.progress__label {
  flex-shrink: 0;
  color: var(--color-fill-brand-vivid);
}

/* ── Type: Indeterminate ── */
/* 진행률 미확정 = 로딩 상태. Skeleton과 동일한 neutral shimmer 스타일을 적용해 의미 일관성 유지.
   shimmer 패턴은 skeleton.md · button.md(btn--loading)와 동일하게 유지한다.
   이 패턴을 수정할 때 나머지 두 파일도 함께 업데이트할 것.
   track: surface-subtle(gray-50) — 중립 컨테이너. fill: surface-neutral(gray-100) + 흰색 shimmer 오버레이 */
/* background-size: 200% — gradient 폭을 2배로 확장해 위치 이동 시 자연스럽게 순환 */
@keyframes progress-indeterminate {
  0%   { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.progress--indeterminate .progress__track {
  background: var(--color-surface-subtle);   /* gray-50 — 중립 로딩 컨테이너 */
}

.progress--indeterminate .progress__fill {
  width: 100%;
  background-color: var(--color-surface-neutral);
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-action-light-pressed) 30%,
    var(--color-action-light-pressed) 70%,
    transparent 100%
  );
  /* Skeleton과 동일한 overlay 패턴. background-color: neutral 베이스 고정.
     background-image: 흰색 오버레이(rgba 0.20)만 이동 — 은은한 shimmer.
     color-action-light-pressed는 어두운 배경 전용 토큰이나, Skeleton과 동일한 shimmer 강도를
     유지하기 위해 의도적으로 동일 토큰 사용. */
  background-size: 200% 100%;
  animation: progress-indeterminate calc(var(--duration-pulse) * 2) linear infinite;
  /* linear — loop 경계에서 ease-in-out의 느린 끝+느린 시작이 겹쳐 정지처럼 느껴지는 것을 방지.
     calc() — duration-pulse(750ms) 단일 적용 시 shimmer가 빠름. 2배로 자연스러운 속도 확보 */
}
```

---

## 접근성

비인터랙티브 상태 표시 컴포넌트. 키보드 포커스 불해당.

| 항목 | 내용 |
|------|------|
| role | `role="progressbar"` 필수 |
| determinate | `aria-valuenow` (현재값) · `aria-valuemin` · `aria-valuemax` 명시. JS로 aria-valuenow, fill width, label 텍스트를 동기화 |
| indeterminate | `aria-valuenow` 생략, `aria-busy="true"` 추가, label 생략 |
| label | `aria-label` 또는 연결된 `<label>`로 목적 설명 |

```js
function setProgress(el, value) {
  el.setAttribute('aria-valuenow', value);
  el.querySelector('.progress__fill').style.width = value + '%';
  const label = el.querySelector('.progress__label');
  if (label) label.textContent = value + '%';
}
```

---

## Do / Don't

> ✅ DO — JS로 aria-valuenow, fill width, label 세 가지 동기화
> `el.setAttribute('aria-valuenow', v); fill.style.width = v+'%'; label.textContent = v+'%';`

> ❌ DON'T — indeterminate에 aria-valuenow 명시
> `aria-valuenow`가 있으면 스크린리더가 진행률이 있는 것으로 읽음

> ✅ DO — 진행률 미확정 시 indeterminate
> `<div class="progress progress--indeterminate" role="progressbar" aria-busy="true">`

> ❌ DON'T — 순환형 로딩에 Progress 사용
> 소요 시간 미확정 전체 화면 로딩에는 Spinner 사용
