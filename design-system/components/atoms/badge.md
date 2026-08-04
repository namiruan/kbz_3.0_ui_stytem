---
file: components/atoms/badge.md
version: 1.1.0
status: stable
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/motion.md, tokens/icon.md
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
| state | (기본) · disabled → `badge--disabled` | (기본) |

---

## Anatomy

<!-- AI:
- root = span.badge. style · type · shape · line · size 클래스를 root에 조합.
- style 클래스(badge--neutral, badge--brand 등)는 항상 필수 — 생략 시 배경·색상 없음.
- 아이콘: span.icon.icon--badge + svg > use — 12px, currentColor 자동 상속, inline-flex 정렬 내장(utilities/icon.css 제공). aria-hidden="true" 필수.
- shape 기본값 rect: border-radius radius-xs(4px). pill → badge--pill: border-radius pill. 수직 inset-xs(2px)·line-height 1.5 — min-width: calc(1.5em + inset-xs×2)로 한 자리 숫자 정방형 보장.
- line: 배경 color-surface-base(흰색) override + inset box-shadow로 테두리. 라인색 스타일별 border-*-subtle 토큰 적용.
- fill: 진한 배경 + 흰 텍스트. 각 스타일의 text 토큰을 배경으로 사용 — 버튼과 색 분리.
- size 기본값은 sm (클래스 없음). md는 badge--md로 명시.
-->

### style × type

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
    <span style="width:var(--space-gap-sm)"></span>
    <span data-component class="badge badge--neutral badge--pill">5</span>
    <span data-component class="badge badge--brand badge--pill">10</span>
    <span style="width:var(--space-gap-sm)"></span>
    <span data-component class="badge badge--brand badge--disabled">비활성</span>
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
    <span style="width:var(--space-gap-sm)"></span>
    <span data-component class="badge badge--neutral badge--pill badge--fill">5</span>
    <span data-component class="badge badge--brand badge--pill badge--fill">10</span>
    <span style="width:var(--space-gap-sm)"></span>
    <span data-component class="badge badge--brand badge--fill badge--disabled">비활성</span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">line</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm);flex-wrap:wrap">
    <span data-component class="badge badge--neutral badge--line">중립</span>
    <span data-component class="badge badge--brand badge--line">브랜드</span>
    <span data-component class="badge badge--info badge--line">정보</span>
    <span data-component class="badge badge--success badge--line">성공</span>
    <span data-component class="badge badge--caution badge--line">주의</span>
    <span data-component class="badge badge--error badge--line">오류</span>
    <span style="width:var(--space-gap-sm)"></span>
    <span data-component class="badge badge--neutral badge--pill badge--line">5</span>
    <span data-component class="badge badge--brand badge--pill badge--line">10</span>
    <span style="width:var(--space-gap-sm)"></span>
    <span data-component class="badge badge--brand badge--line badge--disabled">비활성</span>
  </div>
</div>
</div>
:::

### size · animation · 아이콘

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">sm</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span data-component class="badge badge--caution badge--fill badge--pulse">주의</span>
    <span data-component class="badge badge--success"><span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>완료</span>
    <span data-component class="badge badge--error"><span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-warning"/></svg></span>오류</span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">md</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span data-component class="badge badge--caution badge--fill badge--pulse badge--md">주의</span>
    <span data-component class="badge badge--success badge--md"><span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>완료</span>
    <span data-component class="badge badge--error badge--md"><span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-warning"/></svg></span>오류</span>
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
/* line-height: 1.5(--line-height-reading) 의도적 선택 — rect와 pill 세로 높이를 통일하기 위함.
   pill의 padding-block: inset-xs(2px)가 rect의 squish-xs 수직값과 동일해야 높이가 맞음 */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-2xs);
  padding: var(--space-inset-squish-2xs);
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
.badge--brand   { background: var(--color-surface-brand-subtle);   color: var(--color-text-brand); }
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
/* 수직 inset-xs(2px)로 rect와 높이 통일. 가로 inset-lg(8px)로 여유 확보.
   height = 1.5em + inset-xs×2. min-width = height → 한 자리 숫자 정방형 보장
   두 자리 이상은 콘텐츠 너비가 height를 초과하므로 자연스럽게 타원형 */
.badge--pill {
  border-radius: var(--radius-pill);
  padding-block: var(--space-inset-xs);
  padding-inline: var(--space-inset-lg);
  min-width: calc(1.5em + var(--space-inset-xs) * 2);
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

/* ── State: disabled — 비활성·비적용 상태 시각 표현 ── */
/* 비인터랙티브 컴포넌트이므로 상호작용 차단이 아니라 시각적 de-emphasis 전용.
   (예: 비활성 Tab 안의 카운트 badge, 적용되지 않는 항목 표시)
   뱃지 중 가장 낮은 시각 우선순위 — 배경을 surface-subtle(gray-50)로 낮춰 뒤로 보내고,
   무채색이라 흰 배경에서 형태가 사라지지 않도록 옅은 테두리로 칩 윤곽만 남긴다.
   (같은 회색인 neutral(surface-neutral, gray-100)보다 한 단계 더 가라앉아, 조치가 필요한
   neutral 정보가 상대적으로 도드라진다.)
   style 색을 disabled 색으로 덮어써야 하므로 fill·line 조합과 같은/높은 명시도로 style 규칙 뒤에 둔다. */
.badge--disabled { background: var(--color-surface-subtle); color: var(--color-text-disabled); box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-disabled); }
.badge--fill.badge--disabled { background: var(--color-text-disabled); color: var(--color-text-inverse); box-shadow: none; }
.badge--line.badge--disabled { background: var(--color-surface-base); box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-disabled); }

/* ── Animation: pulse ── */
/* fill 강조 뱃지 전용 — 밝기를 높였다가 줄이는 방식으로 시선 유도 */
@keyframes badge-pulse {
  0%, 100% { filter: brightness(1); }
  50%       { filter: brightness(1.3); }
}
.badge--pulse { animation: badge-pulse var(--duration-pulse) var(--easing-symmetric) infinite; }
@media (prefers-reduced-motion: reduce) {
  .badge--pulse { animation: none; }
}

```

---

## 접근성

비인터랙티브 컴포넌트. 키보드 접근·focus 불해당. `badge--disabled`는 상호작용을 차단하는 상태가 아니라 **비활성·비적용을 나타내는 시각 스타일**이다 — `disabled` 속성·`aria-disabled`를 부여하지 않으며, 의미 전달이 색에만 의존하지 않도록 텍스트 레이블로도 비활성 맥락을 전한다.

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
> `<span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>`

> ❌ DON'T — 아이콘만 단독 사용
> 색상만으로 상태 전달 금지 — 텍스트 레이블 필수

> ❌ DON'T — 클릭 가능한 필터에 Badge 사용
> 인터랙티브 용도에는 Tag 사용

> ❌ DON'T — badge fill에 버튼 색 토큰 사용
> `--color-fill-brand` 등 버튼 전용 토큰은 badge fill에 사용 금지 — `--color-text-*` 토큰 사용

> ❌ DON'T — `badge--fill`과 `badge--line` 동시 사용
> fill은 진한 배경, line은 흰 배경 override — 함께 쓰면 배경 충돌로 의도한 색상이 나오지 않음

> ❌ DON'T — pulse를 tint·line에 사용
> 밝기 변화 효과가 미약하다 — pulse는 `badge--fill`과 함께 사용
