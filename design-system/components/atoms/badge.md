---
file: components/atoms/badge.md
version: 4.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/motion.md
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
| shape | rect (기본, 클래스 없음) · pill → `badge--pill` | rect |
| line | (없음, 기본) · line → `badge--line` | (없음) |
| size | sm (기본, 클래스 없음) · md → `badge--md` | sm |
| animation | (없음, 기본) · pulse → `badge--pulse` | (없음) |

> 숫자 카운트는 `badge--pill`에 숫자를 넣어 표현한다. 짧은 콘텐츠 + pill shape로 자연스럽게 원형이 된다.

> `badge--pulse`는 `badge--fill`과 함께 사용한다. tint·line 타입에는 효과가 미약하다.


---

## Anatomy

<!-- AI:
- root = span.badge. style · type · shape · line · size 클래스를 root에 조합.
- 아이콘: span.icon.icon--sm + svg > use — currentColor를 자동 상속하므로 스타일별 색 별도 지정 불필요. aria-hidden="true" 필수.
- shape 기본값 rect: border-radius radius-xs(4px). pill → badge--pill: border-radius pill. rect와 패딩·line-height 동일(squish-xs 수직, 1.5) — min-width: calc(1.5em + 4px)로 한 자리 숫자 정방형 보장.
- line: 배경 color-surface-base(흰색) override + inset box-shadow로 테두리. 라인색 스타일별 border-*-subtle 토큰 적용.
- fill: 진한 배경 + 흰 텍스트. 각 스타일의 text 토큰을 배경으로 사용 — 버튼과 색 분리.
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
    <span data-component class="badge badge--info badge--fill">정보</span>
    <span data-component class="badge badge--success badge--fill">성공</span>
    <span data-component class="badge badge--caution badge--fill">주의</span>
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
  <span class="anatomy-label">pill · 숫자</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span data-component class="badge badge--neutral badge--pill badge--line">10</span>
    <span data-component class="badge badge--caution badge--pill">10</span>
    <span data-component class="badge badge--brand badge--pill badge--fill">5</span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">md</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span data-component class="badge badge--neutral badge--md">중립</span>
    <span data-component class="badge badge--brand badge--md badge--fill">브랜드</span>
    <span data-component class="badge badge--neutral badge--md badge--line">라인</span>
    <span data-component class="badge badge--caution badge--pill badge--md">3</span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">pulse</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span data-component class="badge badge--caution badge--fill badge--pulse">주의</span>
    <span data-component class="badge badge--error badge--fill badge--pulse">오류</span>
    <span data-component class="badge badge--brand badge--pill badge--fill badge--pulse">3</span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">아이콘</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span data-component class="badge badge--success"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>완료</span>
    <span data-component class="badge badge--error"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-warning"/></svg></span>오류</span>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
/* height 고정 없음 — padding + line-height로 자연 결정 */
/* shape 기본값 rect(radius-xs). size 기본값 sm — 클래스 없음. md는 badge--md로 명시 */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-2xs);
  padding: var(--space-inset-squish-xs);
  border-radius: var(--radius-xs);
  font-family: var(--font-family-base);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-heading);
  line-height: var(--line-height-reading);
  white-space: nowrap;
}

/* ── Size: md ── */
.badge--md { font-size: var(--font-size-sm); }

/* ── Style: tint (기본) ── */
.badge--neutral { background: var(--color-surface-neutral);        color: var(--color-text-label); }
.badge--brand   { background: var(--color-surface-brand-subtle);   color: var(--color-text-brand-vivid); }
.badge--info    { background: var(--color-surface-info-subtle);    color: var(--color-text-info); }
.badge--success { background: var(--color-surface-success-subtle); color: var(--color-text-success); }
.badge--caution { background: var(--color-surface-caution-subtle); color: var(--color-text-caution); }
.badge--error   { background: var(--color-surface-error-subtle);   color: var(--color-text-error); }

/* ── Type: fill ── */
/* 버튼 색과 분리 — 각 스타일의 text 토큰(상태 색)을 fill 배경으로 사용 */
.badge--fill.badge--neutral { background: var(--color-text-label);   color: var(--color-text-inverse); }
.badge--fill.badge--brand   { background: var(--color-text-brand);   color: var(--color-text-inverse); }
.badge--fill.badge--info    { background: var(--color-text-info);    color: var(--color-text-inverse); }
.badge--fill.badge--success { background: var(--color-text-success); color: var(--color-text-inverse); }
.badge--fill.badge--caution { background: var(--color-text-caution); color: var(--color-text-inverse); }
.badge--fill.badge--error   { background: var(--color-text-error);   color: var(--color-text-inverse); }

/* ── Shape: pill ── */
/* 수직 2px(rect와 동일) + 가로 8px. height = 1.5em + 4px(2+2)
   min-width: calc(1.5em + 4px) = height와 동일 → 한 자리 숫자 정방형 보장
   두 자리 이상은 콘텐츠 너비가 height를 초과하므로 자연스럽게 타원형 */
/* 수직 2px(squish-xs 기준)로 rect와 높이 통일. 가로는 8px로 여유 확보 */
.badge--pill {
  border-radius: var(--radius-pill);
  padding-block: var(--space-2);
  padding-inline: var(--space-8);
  min-width: calc(1.5em + 4px);
  justify-content: center;
}

/* ── Line ── */
/* 배경 흰색 override. 라인색은 스타일별 border 토큰 적용 */
.badge--line { background: var(--color-surface-base); }
.badge--line.badge--neutral { box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-neutral-subtle); }
.badge--line.badge--brand   { box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-brand-subtle); }
.badge--line.badge--info    { box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-info-subtle); }
.badge--line.badge--success { box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-success-subtle); }
.badge--line.badge--caution { box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-caution-subtle); }
.badge--line.badge--error   { box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-error-subtle); }

/* ── Animation: pulse ── */
/* fill 강조 뱃지 전용 — 밝기를 높였다가 줄이는 방식으로 시선 유도 */
@keyframes badge-pulse {
  0%, 100% { filter: brightness(1); }
  50%       { filter: brightness(1.3); }
}
.badge--pulse { animation: badge-pulse var(--duration-pulse) var(--easing-move) infinite; }
@media (prefers-reduced-motion: reduce) {
  .badge--pulse { animation: none; }
}

```

---

## 접근성

비인터랙티브 컴포넌트. 키보드 접근·focus·disabled 불해당.

| 상황 | 마크업 |
|------|--------|
| 색상 대비 | 배경과 텍스트 4.5:1 이상 유지 |
| 색상만으로 의미 전달 금지 | 아이콘 단독 사용 불가 — 반드시 텍스트 레이블 병행 |
| 스크린리더 보조 | 아이콘 span에 `aria-hidden="true"` |
| pulse 애니메이션 | `prefers-reduced-motion` 환경에서 애니메이션 중단 필요 — 구현 시 미디어 쿼리 적용 |

---

## Do / Don't

> ✅ DO — 텍스트 레이블과 함께 사용
> `<span class="badge badge--error">오류</span>`

> ✅ DO — 아이콘 사용 시 aria-hidden 추가
> `<span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>`

> ❌ DON'T — 아이콘만 단독 사용
> 색상만으로 상태 전달 금지 — 텍스트 레이블 필수

> ❌ DON'T — 클릭 가능한 필터에 Badge 사용
> 인터랙티브 용도에는 Tag 사용

> ❌ DON'T — badge fill에 버튼 색 토큰 사용
> `--color-button-brand` 등 버튼 전용 토큰은 badge fill에 사용 금지 — `--color-text-*` 토큰 사용
