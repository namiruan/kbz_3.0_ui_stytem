---
file: components/atoms/badge.md
version: 2.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/height.md
---

# Badge

## 개요

상태·분류·수량을 나타내는 인라인 레이블. 비인터랙티브 컴포넌트이며 클릭·선택 가능한 분류 필터에는 Tag를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | neutral · brand · info · success · caution · error | neutral |
| type | tint (기본, 클래스 없음) · fill → `badge--fill` | tint |
| shape | rect (기본, 클래스 없음) · pill → `badge--pill` · count → `badge--count` | rect |
| line | (없음, 기본) · line → `badge--line` | (없음) |
| size | sm (기본, 클래스 없음) · md → `badge--md` | sm |

> fill은 neutral · brand · error에만 정의한다. info · success · caution은 tint로만 사용한다.

---

## Anatomy

<!-- AI:
- root = span.badge. style · type · shape · line · size 클래스를 root에 조합.
- dot: span.badge__dot (optional). background: currentColor — 스타일 클래스의 텍스트 색을 자동 상속.
- shape 기본값 rect: border-radius radius-xs(4px). pill → badge--pill: border-radius pill. count → badge--count: aspect-ratio:1 + justify-content:center로 정사각형 확보, border-radius pill이 원형으로 렌더링. 1~2자리 숫자 콘텐츠에 사용.
- line: inset box-shadow로 테두리 표현. currentColor 사용 → 스타일별 텍스트 색과 자동 일치. box model 영향 없음.
- fill: 진한 배경 + 흰 텍스트. neutral · brand · error만 지원 — 각각 button 토큰 보유. info · success · caution은 fill 배경 토큰 없어 tint 전용.
- size 기본값은 sm (클래스 없음). md는 badge--md로 명시.
-->

### 기본

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">tint</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm);flex-wrap:wrap">
    <span data-component class="badge badge--neutral">중립</span>
    <span data-component class="badge badge--brand">브랜드</span>
    <span data-component class="badge badge--info">정보</span>
    <span data-component class="badge badge--success">성공</span>
    <span data-component class="badge badge--caution">주의</span>
    <span data-component class="badge badge--error">오류</span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm);flex-wrap:wrap">
    <span data-component class="badge badge--neutral badge--fill">중립</span>
    <span data-component class="badge badge--brand badge--fill">브랜드</span>
    <span data-component class="badge badge--error badge--fill">오류</span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">tint · line</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm);flex-wrap:wrap">
    <span data-component class="badge badge--neutral badge--line">중립</span>
    <span data-component class="badge badge--brand badge--line">브랜드</span>
    <span data-component class="badge badge--error badge--line">오류</span>
  </div>
</div>
</div>
:::

### shape · size

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">pill</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span data-component class="badge badge--neutral badge--pill">중립</span>
    <span data-component class="badge badge--brand badge--pill badge--fill">브랜드</span>
    <span data-component class="badge badge--neutral badge--pill badge--line">퇴근</span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">count</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span data-component class="badge badge--neutral badge--count badge--line">10</span>
    <span data-component class="badge badge--caution badge--count">10</span>
    <span data-component class="badge badge--brand badge--count badge--fill">5</span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">md</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span data-component class="badge badge--neutral badge--md">중립</span>
    <span data-component class="badge badge--brand badge--md badge--fill">브랜드</span>
    <span data-component class="badge badge--neutral badge--md badge--line">라인</span>
    <span data-component class="badge badge--caution badge--count badge--md">3</span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">dot</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span data-component class="badge badge--success"><span class="badge__dot" aria-hidden="true"></span>완료</span>
    <span data-component class="badge badge--error"><span class="badge__dot" aria-hidden="true"></span>오류</span>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
/* shape 기본값 rect(radius-xs). size 기본값 sm — 클래스 없음. md는 badge--md로 명시 */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-2xs);
  height: var(--height-tight);
  padding: var(--space-inset-squish-xs);
  border-radius: var(--radius-xs);
  font-family: var(--font-family-base);
  font-size: var(--font-size-meta);
  font-weight: var(--font-weight-heading);
  white-space: nowrap;
}

/* ── Size: md ── */
.badge--md {
  height: var(--height-dense);
  padding: var(--space-inset-squish-sm);
  font-size: var(--font-size-label);
}

/* ── Style: tint (기본) ── */
.badge--neutral { background: var(--color-surface-neutral);        color: var(--color-text-label); }
.badge--brand   { background: var(--color-surface-brand-subtle);   color: var(--color-text-brand-vivid); }
.badge--info    { background: var(--color-surface-info-subtle);    color: var(--color-text-info); }
.badge--success { background: var(--color-surface-success-subtle); color: var(--color-text-success); }
.badge--caution { background: var(--color-surface-caution-subtle); color: var(--color-text-caution); }
.badge--error   { background: var(--color-surface-error-subtle);   color: var(--color-text-error); }

/* ── Type: fill ── */
/* info · success · caution은 fill 배경 토큰 없어 미지원 */
.badge--fill.badge--neutral { background: var(--color-button-neutral); color: var(--color-text-inverse); }
.badge--fill.badge--brand   { background: var(--color-button-brand);   color: var(--color-text-inverse); }
.badge--fill.badge--error   { background: var(--color-button-error);   color: var(--color-text-inverse); }

/* ── Shape: pill ── */
.badge--pill { border-radius: var(--radius-pill); }

/* ── Shape: count ── */
/* aspect-ratio:1으로 정사각형 확보 → border-radius pill이 원형으로 처리 */
.badge--count {
  padding-inline: 0;
  aspect-ratio: 1;
  justify-content: center;
  border-radius: var(--radius-pill);
}

/* ── Line ── */
/* inset box-shadow로 테두리 — box model 영향 없음. currentColor = 스타일별 텍스트 색 자동 일치 */
.badge--line {
  box-shadow: inset 0 0 0 var(--stroke-sm) currentColor;
}

/* ── Dot ── */
.badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}
```

---

## 접근성

비인터랙티브 컴포넌트. 키보드 접근·focus·disabled 불해당.

| 상황 | 마크업 |
|------|--------|
| 색상 대비 | 배경과 텍스트 4.5:1 이상 유지 |
| 색상만으로 의미 전달 금지 | dot 단독 사용 불가 — 반드시 텍스트 레이블 병행 |
| 스크린리더 보조 | dot span에 `aria-hidden="true"` |

---

## Do / Don't

> ✅ DO — 텍스트 레이블과 함께 사용
> `<span class="badge badge--error">오류</span>`

> ✅ DO — dot 사용 시 aria-hidden 추가
> `<span class="badge__dot" aria-hidden="true"></span>`

> ❌ DON'T — dot만 단독 사용
> 색상만으로 상태 전달 금지 — 텍스트 레이블 필수

> ❌ DON'T — 클릭 가능한 필터에 Badge 사용
> 인터랙티브 용도에는 Tag 사용

> ❌ DON'T — info · success · caution에 fill 적용
> 해당 스타일은 fill 배경 토큰이 없어 tint만 사용
