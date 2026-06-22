---
file: components/atoms/button.md
version: 2.2.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, tokens/typography.md, tokens/icon.md, components/atoms/icon.md, components/atoms/tooltip.md, components/atoms/spinner.md
---

# Button

## 개요

사용자의 단일 액션을 트리거하는 컴포넌트. 페이지 이동에는 `<a>`를 사용하고, 동작 실행에는 Button을 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | primary · secondary · danger · ghost · ghost-inverse | primary |
| type | fill (기본, 클래스 없음) · solid → `btn--solid` (ghost 제외) | fill |
| size | micro (icon-only 전용) · xs · sm · md · lg | md |
| icon | icon-left · icon-right · icon-only | — |

---

## 사용 지침

<!-- AI: variant 선택 기준 — 결정 계층(primary > secondary > ghost)과 최종성(fill = 최종, solid = 중간·보조) 두 축으로 결정한다. danger는 primary와 동급이나 되돌릴 수 없는 파괴적 액션에만 적용한다. 도구 버튼(필터·내보내기 등)은 ActionGroup 컴포넌트를 사용한다. size: micro(18px, icon-only 전용 — 툴바 보조 액션 등 밀도 최고 상황) · sm · md(기본) · lg -->

### 선택 기준

| variant | type | 사용 조건 |
|---------|------|-----------|
| primary | fill | 해당 화면·플로우의 **유일한 최종 결정** |
| primary | solid | primary fill과 같은 플로우 안에서 그 다음으로 중요한 **중간 결정** (예: 다단계 선택 과정) |
| secondary | fill | 최종 결정이 **두 선택지**로 나뉠 때 primary fill의 대안. 또는 패널·섹션 단위에서 **그 영역의 메인 전진 액션**이지만 화면 전체의 최종 결정(예: modal footer 저장하기)과 계층을 공유하지 않을 때. **단, 화면에 footer primary fill이 없으면(예: 대제목 모달) 탭 헤더 메인 액션도 primary fill을 사용한다** |
| secondary | solid | 주요 결정 영역 안에 있어야 하지만 fill보다 **낮은 우선순위**인 보조 액션. ghost와 달리 액션 자체가 보조적 중요도를 가질 때 사용한다. **폼 인라인 트리거**(주소 검색·중복 확인·계좌 인증 등 입력 과정의 중간 도우미 액션)에도 사용한다 |
| ghost | — | 결정의 핵심 흐름에서 **벗어나는 경로**(취소·이전 등). 전진 액션이 아니므로 시각적 무게를 줄인다. secondary solid와 달리 액션 자체의 우선순위를 낮추는 게 아니라 흐름 밖에 있음을 나타낸다. **확인 다이얼로그를 거치는 삭제·제거** 버튼에도 사용한다 |
| ghost-inverse | — | 어두운 배경(dim·오버레이·이미지) 위에서 사용하는 ghost 변형. 배경 없음, 텍스트·아이콘은 `color-text-inverse`(흰색). |
| danger | fill | 되돌릴 수 없는 파괴적 액션이 **해당 화면의 최종 결정**일 때 |
| danger | solid | 파괴적 요소가 포함되어 있음을 **경고**해야 하나, 더 중요한 최종 결정이 따로 있을 때 |

### 화면 내 구성 패턴

```
단일 최종 결정
[ghost: 취소]  [primary fill: 저장]

다단계 플로우 — 중간 결정 → 최종 결정
[ghost: 이전]  [primary solid: 선택 확인]   ···   [ghost: 취소]  [primary fill: 제출]

최종 결정이 두 갈래
[ghost: 취소]  [secondary fill: 임시저장]  [primary fill: 게시]

파괴적 액션이 최종 결정
[ghost: 취소]  [danger fill: 영구 삭제]

파괴적 요소 경고 + 별도 최종 결정
[danger solid: 삭제 포함 초기화]  [ghost: 취소]  [primary fill: 계속 진행]

보조 액션이 있는 최종 결정
[ghost: 취소]  [secondary solid: 미리보기]  [primary fill: 게시]

대제목 모달(modal__footer 없음) — 탭 헤더가 사실상 화면의 최종 액션
[primary fill: 근로자 추가]   ← footer primary가 없으므로 탭 헤더에서 primary 사용
```

### 제약

- 한 화면에 **fill 버튼은 최대 2개** — primary fill + secondary fill 조합, 또는 danger fill 단독. 단, 아코디언 섹션·반복 카드처럼 **독립적으로 기능하는 반복 단위**는 각각이 별도 스코프를 가지므로 같은 fill 버튼이 여러 개 있어도 이 규칙을 위반하지 않는다
- **primary fill과 danger fill을 동시에 사용하지 않는다** — 둘 다 해당 계층의 최종 결정이므로 충돌
- **ghost는 단독으로 쓰지 않는다** — 항상 fill 또는 solid 버튼과 함께 배치
- 버튼 **2개 이상 배치 시** `gap: var(--space-gap-xs)`, 중요도가 높은 버튼일수록 오른쪽에 배치한다
- **danger solid는 항상 왼쪽 끝**에 배치한다 — 경고 역할이지 최종 결정이 아니므로
- **도구 버튼**(필터·내보내기·컬럼 설정 등 페이지 핵심 목표와 무관한 보조 작업)은 이 컴포넌트가 아닌 `ActionGroup`을 사용한다
- **disabled vs 조건 미충족 비활성 구분**: `btn--disabled`는 권한·기능 미지원 등 영구·컨텍스트 불가 상태; `btn--inactive`는 필수 입력 미완료 등 조건 충족 시 활성화되는 일시 상태 — hover·focus 유지로 Tooltip 조건 안내 가능

---

## Anatomy

<!-- AI: root(.btn), 텍스트 노드(레이블, optional), icon span(.icon.icon--{size}, optional). 아이콘은 항상 DOM 첫 번째에 배치한다. icon-right는 CSS row-reverse로 시각적으로만 오른쪽에 표시된다. -->

### Ghost

아이콘 variant(icon-only · icon-left · icon-right)는 모든 style(primary · secondary · danger · ghost)에서 동일하게 동작한다. ghost에서만 예시를 제공하고 다른 style에서는 생략한다.

:::preview
<div class="anatomy-grid">
<!-- text: sm / md / lg — ghost는 fill/solid type 구분 없음 -->
<div class="anatomy-row">
  <span class="anatomy-label">text</span>
  <div class="btn-group">
    <button data-component class="btn btn--ghost btn--sm">버튼</button>
    <button data-component class="btn btn--ghost btn--md">버튼</button>
    <button data-component class="btn btn--ghost btn--lg">버튼</button>
  </div>
</div>
<!-- icon-only: micro / sm / md / lg — aria-label 필수. micro는 icon-only 전용 -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-only</span>
  <div class="btn-group">
    <button data-component class="btn btn--ghost btn--micro btn--icon-only" aria-label="메뉴"><span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span></button>
    <button data-component class="btn btn--ghost btn--sm btn--icon-only" aria-label="메뉴"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span></button>
    <button data-component class="btn btn--ghost btn--md btn--icon-only" aria-label="메뉴"><span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span></button>
    <button data-component class="btn btn--ghost btn--lg btn--icon-only" aria-label="메뉴"><span class="icon icon--lg" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span></button>
  </div>
</div>
<!-- icon-left: sm / md / lg — 아이콘 span 항상 DOM 첫 번째 -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-left</span>
  <div class="btn-group">
    <button data-component class="btn btn--ghost btn--sm btn--icon-left"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>버튼</button>
    <button data-component class="btn btn--ghost btn--md btn--icon-left"><span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>버튼</button>
    <button data-component class="btn btn--ghost btn--lg btn--icon-left"><span class="icon icon--lg" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>버튼</button>
  </div>
</div>
<!-- icon-right: sm / md / lg — DOM은 동일하게 아이콘 먼저, CSS row-reverse로 시각 위치만 오른쪽으로 -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-right</span>
  <div class="btn-group">
    <button data-component class="btn btn--ghost btn--sm btn--icon-right"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>버튼</button>
    <button data-component class="btn btn--ghost btn--md btn--icon-right"><span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>버튼</button>
    <button data-component class="btn btn--ghost btn--lg btn--icon-right"><span class="icon icon--lg" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>버튼</button>
  </div>
</div>
</div>
:::

### Ghost-inverse

어두운 배경(dim·오버레이·이미지 위) 전용. 배경 없음, 텍스트·아이콘 흰색(`color-text-inverse`). icon-only와 함께 사용하는 경우가 대부분이다.

**동작:** hover 시 `color-action-light-overlay` 배경이 적용된다. 오버레이 위에 떠 있는 특성상 `translateY` 이동은 없다.

:::preview
<div class="anatomy-grid" style="background:var(--color-surface-dark);padding:var(--space-inset-xl);border-radius:var(--radius-md);">
<div class="anatomy-row">
  <span class="anatomy-label" style="color:var(--color-text-inverse);">icon-only</span>
  <div class="btn-group">
    <button data-component class="btn btn--ghost-inverse btn--micro btn--icon-only" aria-label="닫기"><span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span></button>
    <button data-component class="btn btn--ghost-inverse btn--sm btn--icon-only" aria-label="닫기"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span></button>
    <button data-component class="btn btn--ghost-inverse btn--md btn--icon-only" aria-label="닫기"><span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span></button>
    <button data-component class="btn btn--ghost-inverse btn--lg btn--icon-only" aria-label="닫기"><span class="icon icon--lg" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span></button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label" style="color:var(--color-text-inverse);">text</span>
  <div class="btn-group">
    <button data-component class="btn btn--ghost-inverse btn--sm">버튼</button>
    <button data-component class="btn btn--ghost-inverse btn--md">버튼</button>
    <button data-component class="btn btn--ghost-inverse btn--lg">버튼</button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label" style="color:var(--color-text-inverse);">icon-left</span>
  <div class="btn-group">
    <button data-component class="btn btn--ghost-inverse btn--sm btn--icon-left"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>버튼</button>
    <button data-component class="btn btn--ghost-inverse btn--md btn--icon-left"><span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>버튼</button>
    <button data-component class="btn btn--ghost-inverse btn--lg btn--icon-left"><span class="icon icon--lg" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>버튼</button>
  </div>
</div>
</div>
:::

### Primary

:::preview
<div class="anatomy-grid">
<!-- fill: xs / sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <div class="btn-group">
    <button data-component class="btn btn--primary btn--xs">버튼</button>
    <button data-component class="btn btn--primary btn--sm">버튼</button>
    <button data-component class="btn btn--primary btn--md">버튼</button>
    <button data-component class="btn btn--primary btn--lg">버튼</button>
  </div>
</div>
<!-- solid: xs / sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">solid</span>
  <div class="btn-group">
    <button data-component class="btn btn--primary btn--solid btn--xs">버튼</button>
    <button data-component class="btn btn--primary btn--solid btn--sm">버튼</button>
    <button data-component class="btn btn--primary btn--solid btn--md">버튼</button>
    <button data-component class="btn btn--primary btn--solid btn--lg">버튼</button>
  </div>
</div>
</div>
:::

### Secondary

:::preview
<div class="anatomy-grid">
<!-- fill: xs / sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <div class="btn-group">
    <button data-component class="btn btn--secondary btn--xs">버튼</button>
    <button data-component class="btn btn--secondary btn--sm">버튼</button>
    <button data-component class="btn btn--secondary btn--md">버튼</button>
    <button data-component class="btn btn--secondary btn--lg">버튼</button>
  </div>
</div>
<!-- solid: xs / sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">solid</span>
  <div class="btn-group">
    <button data-component class="btn btn--secondary btn--solid btn--xs">버튼</button>
    <button data-component class="btn btn--secondary btn--solid btn--sm">버튼</button>
    <button data-component class="btn btn--secondary btn--solid btn--md">버튼</button>
    <button data-component class="btn btn--secondary btn--solid btn--lg">버튼</button>
  </div>
</div>
</div>
:::

### Danger

:::preview
<div class="anatomy-grid">
<!-- fill: xs / sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <div class="btn-group">
    <button data-component class="btn btn--danger btn--xs">버튼</button>
    <button data-component class="btn btn--danger btn--sm">버튼</button>
    <button data-component class="btn btn--danger btn--md">버튼</button>
    <button data-component class="btn btn--danger btn--lg">버튼</button>
  </div>
</div>
<!-- solid: xs / sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">solid</span>
  <div class="btn-group">
    <button data-component class="btn btn--danger btn--solid btn--xs">버튼</button>
    <button data-component class="btn btn--danger btn--solid btn--sm">버튼</button>
    <button data-component class="btn btn--danger btn--solid btn--md">버튼</button>
    <button data-component class="btn btn--danger btn--solid btn--lg">버튼</button>
  </div>
</div>
</div>
:::

### Disabled

disabled 상태는 모든 variant(primary · secondary · danger · ghost)에 동일하게 적용된다. 아래는 primary 기준 예시이며, 다른 variant도 `btn--disabled`를 추가하면 동일한 회색 처리가 된다.

:::preview
<div class="anatomy-grid">
<!-- fill disabled: xs / sm / md / lg — pointer-events: none, aria-disabled="true", tabindex="-1" 셋 모두 필수 -->
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <div class="btn-group">
    <button data-component class="btn btn--primary btn--xs btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
    <button data-component class="btn btn--primary btn--sm btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
    <button data-component class="btn btn--primary btn--md btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
    <button data-component class="btn btn--primary btn--lg btn--disabled" disabled aria-disabled="true" tabindex="-1">버튼</button>
  </div>
</div>
<!-- icon-only disabled: micro / sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-only</span>
  <div class="btn-group">
    <button data-component class="btn btn--primary btn--micro btn--icon-only btn--disabled" disabled aria-disabled="true" tabindex="-1" aria-label="추가"><span class="icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span></button>
    <button data-component class="btn btn--primary btn--sm btn--icon-only btn--disabled" disabled aria-disabled="true" tabindex="-1" aria-label="추가"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span></button>
    <button data-component class="btn btn--primary btn--md btn--icon-only btn--disabled" disabled aria-disabled="true" tabindex="-1" aria-label="추가"><span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span></button>
    <button data-component class="btn btn--primary btn--lg btn--icon-only btn--disabled" disabled aria-disabled="true" tabindex="-1" aria-label="추가"><span class="icon icon--lg" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span></button>
  </div>
</div>
</div>
:::

### 조건 미충족 비활성

조건이 충족되면 활성으로 전환되는 일시적 비활성 상태. `btn--disabled`(영구 비활성)와 달리 hover·focus를 유지해 Tooltip으로 미충족 조건을 안내할 수 있다.

<!-- AI:
조건 미충족 비활성 패턴:
- button: btn--inactive + aria-disabled="true". disabled 속성·tabindex="-1"·pointer-events:none 사용 금지.
- 구조: span.tooltip-wrapper > button.btn.btn--[style].btn--[size].btn--inactive[aria-disabled="true"][aria-describedby] + div.tooltip-panel.elevation-tooltip.tooltip-panel--top[id][role="tooltip"].
- click 차단: btn.addEventListener('click', e => { if (btn.getAttribute('aria-disabled') === 'true') e.preventDefault(); })
- 조건 충족 시: btn--inactive 제거 + aria-disabled 제거 → 활성 버튼.
- 조건 감시 예시: form 내 필수 input/textarea/checkbox 값 변화(input·change 이벤트) 구독 후 모든 조건 달성 시 토글.
-->

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">inactive</span>
  <!-- tooltip-panel--visible은 md 1개에만 적용 — 여러 툴팁 동시 표시 시 겹침 발생 -->
  <div class="btn-group" style="padding-top:52px">
    <span class="tooltip-wrapper">
      <button data-component class="btn btn--primary btn--sm btn--inactive"
              aria-disabled="true" aria-describedby="tip-inactive-sm">버튼</button>
      <div class="tooltip-panel elevation-tooltip tooltip-panel--top" id="tip-inactive-sm" role="tooltip">필수 항목을 모두 입력해 주세요</div>
    </span>
    <span class="tooltip-wrapper">
      <button data-component class="btn btn--primary btn--md btn--inactive"
              aria-disabled="true" aria-describedby="tip-inactive-md">버튼</button>
      <div class="tooltip-panel elevation-tooltip tooltip-panel--top tooltip-panel--visible" id="tip-inactive-md" role="tooltip">필수 항목을 모두 입력해 주세요</div>
    </span>
    <span class="tooltip-wrapper">
      <button data-component class="btn btn--primary btn--lg btn--inactive"
              aria-disabled="true" aria-describedby="tip-inactive-lg">버튼</button>
      <div class="tooltip-panel elevation-tooltip tooltip-panel--top" id="tip-inactive-lg" role="tooltip">필수 항목을 모두 입력해 주세요</div>
    </span>
  </div>
</div>
</div>
:::

### Loading

비동기 처리 중 중복 제출 방지. 클릭 후 처리 대기 중임을 Spinner + 레이블로 표시한다. 버튼 너비 고정을 위해 JS에서 `min-width`를 설정한다.

<!-- AI:
loading 마크업 규칙:
- 구조: span.spinner.spinner--sm[aria-hidden="true"] > span[aria-hidden="true"] (내부 span이 회전 아크. 필수)
- fill 버튼(primary·secondary·danger): spinner--inverse 추가 — fill 배경이 어두우므로 흰색 스피너 필수
- ghost·solid 버튼: spinner--sm만 — 밝은 배경이므로 기본(어두운) 스피너
- 버튼에 tabindex="-1" 추가, aria-label을 "저장 중..." 형태로 업데이트.
-->

:::preview
<div class="anatomy-grid">
<!-- fill: primary — spinner--inverse(흰색) + 레이블. sm / md / lg -->
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <div class="btn-group">
    <button data-component class="btn btn--primary btn--sm btn--loading" tabindex="-1" aria-label="저장 중..."><span class="spinner spinner--sm spinner--inverse" aria-hidden="true"><span aria-hidden="true"></span></span>저장 중...</button>
    <button data-component class="btn btn--primary btn--md btn--loading" tabindex="-1" aria-label="저장 중..."><span class="spinner spinner--sm spinner--inverse" aria-hidden="true"><span aria-hidden="true"></span></span>저장 중...</button>
    <button data-component class="btn btn--primary btn--lg btn--loading" tabindex="-1" aria-label="저장 중..."><span class="spinner spinner--sm spinner--inverse" aria-hidden="true"><span aria-hidden="true"></span></span>저장 중...</button>
  </div>
</div>
<!-- ghost: spinner 기본(어두운) + 레이블 -->
<div class="anatomy-row">
  <span class="anatomy-label">ghost</span>
  <div class="btn-group">
    <button data-component class="btn btn--ghost btn--sm btn--loading" tabindex="-1" aria-label="저장 중..."><span class="spinner spinner--sm" aria-hidden="true"><span aria-hidden="true"></span></span>저장 중...</button>
    <button data-component class="btn btn--ghost btn--md btn--loading" tabindex="-1" aria-label="저장 중..."><span class="spinner spinner--sm" aria-hidden="true"><span aria-hidden="true"></span></span>저장 중...</button>
    <button data-component class="btn btn--ghost btn--lg btn--loading" tabindex="-1" aria-label="저장 중..."><span class="spinner spinner--sm" aria-hidden="true"><span aria-hidden="true"></span></span>저장 중...</button>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--space-gap-xs);
  border: var(--stroke-sm) var(--stroke-solid) transparent;
  border-radius: var(--radius-pill);
  cursor: pointer;
  white-space: nowrap;
  transition: transform var(--duration-fast) var(--easing-base);
}
.btn:hover { transform: translateY(var(--translate-interactive-hover)); }

/* ── Size ── */
/* micro: height-micro(18px) — icon-only 전용. 밀도 최고 인라인 액션 */
.btn--micro { height: var(--height-micro);   font-size: var(--font-size-sm); line-height: var(--line-height-ui); }
/* xs: height-tight(24px) — 데이터 테이블 셀 액션 전용 */
.btn--xs  { height: var(--height-tight);   padding: var(--space-inset-squish-xs); font-size: var(--font-size-sm);  line-height: var(--line-height-ui); letter-spacing: var(--letter-spacing-default); font-weight: var(--font-weight-body); }
.btn--sm  { height: var(--height-compact);  padding: var(--space-inset-squish-sm); font-size: var(--font-size-sm);  line-height: var(--line-height-ui); letter-spacing: var(--letter-spacing-default); font-weight: var(--font-weight-body); }
.btn--md  { height: var(--height-base);     padding: var(--space-inset-squish-md); font-size: var(--font-size-lg);  line-height: var(--line-height-ui); letter-spacing: var(--letter-spacing-default); font-weight: var(--font-weight-body); }
.btn--lg  { height: var(--height-spacious); padding: var(--space-inset-squish-lg); font-size: var(--font-size-h4); line-height: var(--line-height-ui); letter-spacing: var(--letter-spacing-default); font-weight: var(--font-weight-body); }

/* ── Style: fill (default) ── */
.btn--primary   { background: var(--color-fill-brand);   color: var(--color-text-inverse); border-color: var(--color-fill-brand); }
.btn--secondary { background: var(--color-fill-neutral); color: var(--color-text-inverse); border-color: var(--color-fill-neutral); }
.btn--danger    { background: var(--color-fill-error);   color: var(--color-text-inverse); border-color: var(--color-fill-error); }
.btn--ghost         { background: var(--color-surface-base); color: var(--color-text-body);    border-color: transparent; }
.btn--ghost-inverse { background: transparent;             color: var(--color-text-inverse); border-color: transparent; }

/* ── Style: solid ── */
.btn--primary.btn--solid   { background: var(--color-surface-base); color: var(--color-fill-brand);   border-color: var(--color-fill-brand); }
.btn--secondary.btn--solid { background: var(--color-surface-base); color: var(--color-fill-neutral); border-color: var(--color-fill-neutral); }
.btn--danger.btn--solid    { background: var(--color-surface-base); color: var(--color-fill-error);   border-color: var(--color-fill-error); }

/* ── Hover ── */
.btn--primary:hover   { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover); }
.btn--secondary:hover { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-neutral-hover); }
.btn--danger:hover    { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-error-hover); }
.btn--ghost:hover         { box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-neutral-hover); }
.btn--ghost-inverse:hover { background: var(--color-action-light-overlay); }

/* ── State ── */
/* 포커스 링은 전역 *:focus-visible 규칙으로 처리된다 */
.btn--disabled { pointer-events: none; color: var(--color-text-disabled); background: var(--color-surface-disabled); border-color: var(--color-border-disabled); }

/* 조건 미충족 비활성: 조건 충족 시 활성으로 전환되는 일시적 상태
   btn--disabled(pointer-events:none, disabled 속성)와 달리 hover·focus 유지 — Tooltip 조건 안내 가능 */
.btn--inactive {
  color: var(--color-text-disabled);
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  cursor: not-allowed;
}
/* btn:hover transform·btn--[style]:hover box-shadow override — 비활성 상태에서 hover 피드백 제거 */
.btn.btn--inactive:hover {
  transform: none;
  box-shadow: none;
}

/* ── Icon (utilities/icon.css → .icon--{size} · components/atoms/icon.md) ── */
.btn--icon-only { padding: 0; }
.btn--icon-only.btn--micro { width: var(--height-micro); }
.btn--icon-only.btn--xs   { width: var(--height-tight); }
.btn--icon-only.btn--sm   { width: var(--height-compact); }
.btn--icon-only.btn--md   { width: var(--height-base); }
.btn--icon-only.btn--lg   { width: var(--height-spacious); }

/* icon-left/right: 아이콘 span은 항상 DOM 첫 번째에 둔다.
   icon-right만 row-reverse로 시각 순서를 역전시킨다. icon-left는 기본 row라 선언 불필요. */
.btn--icon-right { flex-direction: row-reverse; }

/* ── Button Group (2개 이상 배치 시 간격 규칙) ── */
.btn-group { display: flex; align-items: center; gap: var(--space-gap-xs); }

/* ── Loading ── */
/* 클릭 후 처리 대기. variant 색상·레이블 유지, 상호작용만 차단.
   내부에 span.spinner 삽입 — fill 버튼은 spinner--inverse, ghost·solid는 기본 스피너. */
.btn--loading { pointer-events: none; opacity: 0.75; cursor: default; }
/* hover override — loading 중 translateY·box-shadow 피드백 제거 */
.btn.btn--loading:hover { transform: none; box-shadow: none; }
```

---

## 접근성

전체 규칙은 `accessibility.md` 버튼 행을 따른다. 이 컴포넌트에 적용되는 핵심 사항:

| 상황 | 마크업 |
|------|--------|
| icon-only | `aria-label="액션명"` 필수 |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| loading | `btn--loading` + `tabindex="-1"` + 내부에 `span.spinner.spinner--sm[aria-hidden]` 삽입 + 레이블 "○○ 중..." 업데이트 |
| loading 완료 | `aria-live="polite"` 영역에 완료 문구 출력 후 버튼 원상 복구 (spinner 제거·레이블 복구·min-width 해제) |
| 조건 미충족 비활성 | `btn--inactive` + `aria-disabled="true"` — `disabled` 속성·`tabindex="-1"` 사용 금지. `tooltip-wrapper`로 감싸고 `tooltip-panel`에 조건 안내. click은 JS에서 `aria-disabled` 체크 후 `event.preventDefault()` |

loading 구현 예시:

```js
// fill 버튼은 spinner--inverse, ghost·solid는 spinner--sm만 사용
const isFill = !btn.classList.contains('btn--solid') &&
               !btn.classList.contains('btn--ghost') &&
               !btn.classList.contains('btn--ghost-inverse');
const spinnerClass = isFill ? 'spinner spinner--sm spinner--inverse' : 'spinner spinner--sm';

// 시작
const originalLabel = btn.textContent.trim();
btn.style.minWidth = btn.offsetWidth + 'px';     // 너비 고정 — 레이블 변경 시 layout shift 방지
btn.classList.add('btn--loading');
btn.setAttribute('tabindex', '-1');
btn.innerHTML = `<span class="${spinnerClass}" aria-hidden="true"><span aria-hidden="true"></span></span>${originalLabel} 중...`;

// 완료
btn.classList.remove('btn--loading');
btn.removeAttribute('tabindex');
btn.style.minWidth = '';
btn.textContent = originalLabel;                 // spinner 제거 + 레이블 복구
liveRegion.textContent = originalLabel + ' 완료'; // aria-live="polite" 영역
```

포커스 링은 `:focus-visible`로 처리되어 마우스 클릭 시에는 표시되지 않는다.

---

## Do / Don't

> ✅ DO — 동작 실행에 button 태그 사용
> `<button class="btn btn--primary btn--md">저장</button>`

> ❌ DON'T — 페이지 이동에 Button 사용
> `<button onclick="location.href='/home'">홈으로</button>` → `<a>` 사용

> ✅ DO — icon-only에 aria-label 명시
> `<button class="btn btn--icon-only" aria-label="삭제">`

> ❌ DON'T — loading 중 중복 제출 허용
> loading 클래스 없이 비동기 처리 → `btn--loading` + `tabindex="-1"` 필수

> ❌ DON'T — data-component 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용. 실제 구현 코드에서는 제거한다.

> ✅ DO — 조건 미충족 비활성은 `btn--inactive` + `aria-disabled="true"` + Tooltip 조합 사용
> hover·focus가 살아있어 사용자가 Tooltip으로 미충족 조건을 확인할 수 있다

> ❌ DON'T — 조건 미충족 버튼에 `disabled` 속성 사용
> `disabled`는 pointer-events를 차단해 Tooltip이 표시되지 않는다. `btn--inactive` + `aria-disabled="true"` 사용

> ❌ DON'T — `btn--inactive`에 Tooltip 없이 단독 사용
> 왜 비활성인지 안내 없이 시각적으로만 막으면 사용자가 원인을 알 수 없다. Tooltip 연결 필수
