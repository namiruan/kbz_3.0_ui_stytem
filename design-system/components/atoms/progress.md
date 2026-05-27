---
file: components/atoms/progress.md
version: 0.3.2
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
fill 너비는 inline style(width: N%)로만 제어 — JavaScript가 담당한다. -->

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
  background: var(--color-text-brand-vivid);    /* blue-500 vivid */
  border-radius: var(--radius-pill);
  transition: width var(--duration-base) var(--easing-symmetric);
}

/* ── Label ── */
.progress__label {
  flex-shrink: 0;
  color: var(--color-text-brand-vivid);
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
  /* calc() — duration-pulse(750ms) 단일 토큰으로는 속도가 빨라 2배로 늦춤 */
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
