---
file: components/atoms/skeleton.md
version: 0.1.2
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/radius.md, tokens/motion.md
---

# Skeleton

## 개요

콘텐츠 로딩 중 레이아웃을 선점하는 플레이스홀더. 데이터가 준비되면 실제 콘텐츠로 교체한다. 버튼·입력 필드 자체의 비동기 대기 상태는 각 컴포넌트의 loading 상태를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| shape | block · text · circle | block (기본, 클래스 없음) |

---

## 사용 지침

| 상황 | 컴포넌트 |
|------|----------|
| 카드·이미지·콘텐츠 영역 로딩 | Skeleton (block) |
| 텍스트 한 줄·여러 줄 로딩 | Skeleton (text) — 여러 줄은 width를 달리해 자연스럽게 |
| 아바타·프로필 이미지 로딩 | Skeleton (circle) |
| 버튼 클릭 후 응답 대기 | Button loading 상태 (Spinner 내장) |
| 전체 페이지 초기 로딩 | Spinner (전체 화면 오버레이) |

---

## Anatomy

<!-- AI: root(.skeleton). shape 클래스로 형태를 지정한다.
block: 카드·이미지 크기. 너비·높이는 인라인 style 또는 부모 layout으로 지정.
text: 텍스트 한 줄 높이(--space-generic-md=12px). 너비는 inline style로 지정해 여러 줄 패턴 구현.
circle: 원형. 너비·높이 동일하게 지정. border-radius: 50%로 완전한 원.
모두 aria-hidden="true" — 스크린리더에 콘텐츠 없음을 숨긴다. -->

```html
<!-- Block (카드·이미지) -->
<div data-component class="skeleton" style="width: 100%; height: 160px;" aria-hidden="true"></div>

<!-- Text (한 줄) -->
<div data-component class="skeleton skeleton--text" style="width: 80%;" aria-hidden="true"></div>

<!-- Text (여러 줄) -->
<div style="display:flex; flex-direction:column; gap: var(--space-gap-xs);" aria-hidden="true">
  <div data-component class="skeleton skeleton--text" style="width: 100%;"></div>
  <div data-component class="skeleton skeleton--text" style="width: 85%;"></div>
  <div data-component class="skeleton skeleton--text" style="width: 60%;"></div>
</div>

<!-- Circle (아바타) -->
<div data-component class="skeleton skeleton--circle" style="width: 40px; height: 40px;" aria-hidden="true"></div>
```

:::preview
<div style="display:flex; flex-direction:column; gap: var(--space-gap-2xl); max-width: 360px;">

  <div style="display:flex; flex-direction:column; gap: var(--space-gap-xs);">
    <span class="text-helper">Block</span>
    <div data-component class="skeleton" style="width:100%; height:120px;" aria-hidden="true"></div>
  </div>

  <div style="display:flex; flex-direction:column; gap: var(--space-gap-xs);">
    <span class="text-helper">Text (여러 줄)</span>
    <div style="display:flex; flex-direction:column; gap: var(--space-gap-xs);" aria-hidden="true">
      <div data-component class="skeleton skeleton--text" style="width:100%;"></div>
      <div data-component class="skeleton skeleton--text" style="width:80%;"></div>
      <div data-component class="skeleton skeleton--text" style="width:55%;"></div>
    </div>
  </div>

  <div style="display:flex; flex-direction:column; gap: var(--space-gap-xs);">
    <span class="text-helper">Circle</span>
    <div data-component class="skeleton skeleton--circle" style="width:40px; height:40px;" aria-hidden="true"></div>
  </div>

  <div style="display:flex; flex-direction:column; gap: var(--space-gap-xs);">
    <span class="text-helper">카드 패턴 조합</span>
    <div style="display:flex; gap: var(--space-gap-md); align-items:flex-start;" aria-hidden="true">
      <div data-component class="skeleton skeleton--circle" style="width:40px; height:40px; flex-shrink:0;"></div>
      <div style="flex:1; display:flex; flex-direction:column; gap: var(--space-gap-xs);">
        <div data-component class="skeleton skeleton--text" style="width:60%;"></div>
        <div data-component class="skeleton skeleton--text" style="width:90%;"></div>
        <div data-component class="skeleton skeleton--text" style="width:75%;"></div>
      </div>
    </div>
  </div>

</div>
:::

---

## CSS

```css
/* ── Shimmer 애니메이션 ── */
/* background-size: 200% — gradient 2배 폭으로 확장. position 100%→-100%로 한 사이클 완성.
   밝은 구간(30%–70%)을 넓게 잡아 하이라이트가 화면에 오래 머물게 함. */
@keyframes skeleton-shimmer {
  0%   { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

/* ── Base ── */
.skeleton {
  display: block;
  background: linear-gradient(
    90deg,
    var(--color-surface-neutral) 0%,
    var(--color-surface-subtle)  30%,
    var(--color-surface-subtle)  70%,
    var(--color-surface-neutral) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer calc(var(--duration-pulse) * 2) linear infinite;
  /* linear — loop 경계 pause 방지. calc() — duration-pulse 2배로 속도 확보 */
  border-radius: var(--radius-xs);
}

/* ── Text ── */
/* 텍스트 한 줄 높이. 너비는 inline style로 지정해 다양한 줄 길이 표현. */
.skeleton--text {
  height: var(--space-generic-md);   /* 12px — 본문 텍스트 한 줄 높이 근사값 */
  border-radius: var(--radius-xs);
}

/* ── Circle ── */
/* 아바타·프로필 이미지 플레이스홀더. 너비·높이를 같게 지정해야 원이 된다. */
.skeleton--circle {
  border-radius: 50%;
}
```

---

## 접근성

로딩 플레이스홀더. 스크린리더에 숨김 처리.

| 항목 | 내용 |
|------|------|
| aria-hidden | 모든 skeleton 요소에 `aria-hidden="true"` — 의미 없는 빈 요소를 스크린리더에 노출하지 않음 |
| 로딩 공지 | skeleton을 감싸는 부모 또는 페이지 레벨에서 `aria-live="polite"` + sr-only 문구로 로딩 상태 안내 |
| 콘텐츠 교체 | 실제 콘텐츠로 교체 시 skeleton 제거 — `aria-hidden` 상태를 남기지 않음 |

```html
<!-- 로딩 중 상태 공지 예시 -->
<div aria-live="polite" class="sr-only">콘텐츠를 불러오는 중입니다.</div>
```

---

## Do / Don't

> ✅ DO — 실제 레이아웃 크기와 동일하게
> skeleton 크기가 실제 콘텐츠 크기와 같아야 교체 시 레이아웃 이동(CLS)이 없음

> ❌ DON'T — 버튼·입력 필드 로딩에 Skeleton 사용
> 컴포넌트 자체 loading 상태(Spinner 내장) 사용

> ✅ DO — 여러 줄 텍스트는 width를 다르게
> 마지막 줄을 50~70%로 줄여 실제 문장처럼 보이게

> ❌ DON'T — aria-hidden 생략
> 빈 skeleton div를 스크린리더가 읽으면 불필요한 노이즈 발생
