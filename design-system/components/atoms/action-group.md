---
file: components/atoms/action-group.md
version: 0.2.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, tokens/icon.md, tokens/typography.md
---

# ActionGroup

## 개요

페이지 핵심 목표와 무관한 보조 도구 버튼을 묶는 컨테이너. 필터·내보내기·컬럼 설정·새로 고침 등 결정 계층이 없는 동등한 도구 액션에 사용한다. 버튼이 1개뿐이어도 도구 영역임을 시각적으로 나타내야 할 때 ActionGroup을 사용한다.

Button과의 차이 — ActionGroup은 결정 계층이 없는 도구 영역에 사용하고, 결정을 트리거하는 버튼은 Button 컴포넌트를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | sm · md | sm |
| typography | text-button-sm · text-button-md | size에 맞춰 사용 |
| icon | icon-left · icon-right · icon-only | — |
| label | 있음 · 없음 | 없음 |

size와 typography는 항상 짝을 맞춘다. `action-btn--sm` → `text-button-sm`, `action-btn--md` → `text-button-md`. icon-only는 텍스트가 없으므로 typography 클래스를 사용하지 않는다.

---

## 사용 지침

### 선택 기준

ActionGroup은 결정 계층이 필요 없는 도구 버튼 모음에 사용한다. 특정 버튼이 다른 버튼보다 중요하거나 결정을 트리거해야 한다면 Button 컴포넌트를 사용한다.

### 화면 내 구성 패턴

```
페이지 상단 도구 영역 — 복수 도구
[action-group: 시간변경  퇴근시간  단가]           [primary fill: 새 항목 추가]

페이지 상단 도구 영역 — 라벨 있는 그룹
일괄변경 [action-group: 퇴근시간  단가]            [primary fill: 새 항목 추가]

페이지 상단 도구 영역 — 단일 도구
[action-group: 실시간 위치요청]                    [primary fill: 새 항목 추가]

테이블 행 인라인 도구 — 행별 퀵 액션
[action-group: 승인  반려]
```

### 제약

- ActionGroup 내 버튼은 **결정 계층이 없는 동등한 도구 액션**만 배치한다. 중요도 차이가 생기면 Button 컴포넌트로 분리한다.
- 버튼 수는 **최대 5개**를 권장한다. 그 이상은 드롭다운으로 묶는다.
- ActionGroup 내 `.action-btn`은 **항상 같은 size**를 사용한다. 혼용 금지.
- **icon 유형은 그룹 안에서 통일**한다 — icon-only·icon-left·icon-right·텍스트 단독을 혼용하지 않는다.
- **라벨은 버튼명만으로 그룹 목적을 파악하기 어려울 때만** 붙인다. 버튼명이 이미 명확하면 생략한다. 라벨을 붙일 때는 `.action-group-labeled` wrapper를 사용하고, 라벨을 `.action-group` 안에 넣지 않는다.

---

## Anatomy

<!-- AI: root(.action-group), label(.action-group-label, optional), item(.action-btn), icon span(.action-btn-icon, optional).
  - 라벨이 있을 때는 .action-group-labeled wrapper로 감싸고, 라벨은 .action-group 밖에 위치한다. 라벨은 bordered box 안에 들어가지 않는다.
  - 아이콘 span은 항상 DOM 첫 번째에 배치한다. icon-right는 CSS row-reverse로 시각적으로만 오른쪽에 표시된다.
  - 라벨 있음: aria-labelledby로 label id 참조. 라벨 없음: aria-label 직접 명시. -->

### 기본

버튼 1개 단독 또는 여러 개 조합 모두 `.action-group` 컨테이너를 그대로 사용한다. 단일일 때는 구분선 없이 외곽 테두리만 표시된다.

:::preview
<div class="anatomy-grid">
<!-- single: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">single</span>
  <div data-component class="action-group" role="toolbar" aria-label="근태 도구">
    <button class="action-btn action-btn--sm text-button-sm">퇴근시간</button>
  </div>
  <div data-component class="action-group" role="toolbar" aria-label="근태 도구">
    <button class="action-btn action-btn--md text-button-md">퇴근시간</button>
  </div>
</div>
<!-- multi: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">multi</span>
  <div data-component class="action-group" role="toolbar" aria-label="근태 관리 도구">
    <button class="action-btn action-btn--sm text-button-sm">시간변경</button>
    <button class="action-btn action-btn--sm text-button-sm">퇴근시간</button>
    <button class="action-btn action-btn--sm text-button-sm">단가</button>
  </div>
  <div data-component class="action-group" role="toolbar" aria-label="근태 관리 도구">
    <button class="action-btn action-btn--md text-button-md">시간변경</button>
    <button class="action-btn action-btn--md text-button-md">퇴근시간</button>
    <button class="action-btn action-btn--md text-button-md">단가</button>
  </div>
</div>
</div>
:::

### 아이콘

:::preview
<div class="anatomy-grid">
<!-- icon-only: sm (기본값) — aria-label 필수 -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-only</span>
  <div data-component class="action-group" role="toolbar" aria-label="위치 도구">
    <button class="action-btn action-btn--sm action-btn--icon-only" aria-label="실시간 위치요청"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
    <button class="action-btn action-btn--sm action-btn--icon-only" aria-label="승인"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
  </div>
</div>
<!-- icon-left: sm (기본값) — 아이콘 span 항상 DOM 첫 번째 -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-left</span>
  <div data-component class="action-group" role="toolbar" aria-label="시간 관리 도구">
    <button class="action-btn action-btn--sm text-button-sm action-btn--icon-left"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span>시간변경</button>
    <button class="action-btn action-btn--sm text-button-sm action-btn--icon-left"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-plus"/></svg></span>퇴근시간</button>
  </div>
</div>
<!-- icon-right: sm (기본값) — DOM은 동일하게 아이콘 먼저, CSS row-reverse로 시각 위치만 오른쪽으로 -->
<div class="anatomy-row">
  <span class="anatomy-label">icon-right</span>
  <div data-component class="action-group" role="toolbar" aria-label="승인 도구">
    <button class="action-btn action-btn--sm text-button-sm action-btn--icon-right"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>승인</button>
    <button class="action-btn action-btn--sm text-button-sm action-btn--icon-right"><span class="action-btn-icon icon--sm"><svg><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>반려</button>
  </div>
</div>
</div>
:::

### Disabled

:::preview
<div class="anatomy-grid">
<!-- single disabled -->
<div class="anatomy-row">
  <span class="anatomy-label">single</span>
  <div data-component class="action-group" role="toolbar" aria-label="근태 도구">
    <button class="action-btn action-btn--sm text-button-sm action-btn--disabled" disabled aria-disabled="true" tabindex="-1">퇴근시간</button>
  </div>
  <div data-component class="action-group" role="toolbar" aria-label="근태 도구">
    <button class="action-btn action-btn--md text-button-md action-btn--disabled" disabled aria-disabled="true" tabindex="-1">퇴근시간</button>
  </div>
</div>
<!-- multi: 일부 disabled -->
<div class="anatomy-row">
  <span class="anatomy-label">multi</span>
  <div data-component class="action-group" role="toolbar" aria-label="근태 관리 도구">
    <button class="action-btn action-btn--sm text-button-sm">시간변경</button>
    <button class="action-btn action-btn--sm text-button-sm action-btn--disabled" disabled aria-disabled="true" tabindex="-1">퇴근시간</button>
    <button class="action-btn action-btn--sm text-button-sm">단가</button>
  </div>
  <div data-component class="action-group" role="toolbar" aria-label="근태 관리 도구">
    <button class="action-btn action-btn--md text-button-md">시간변경</button>
    <button class="action-btn action-btn--md text-button-md action-btn--disabled" disabled aria-disabled="true" tabindex="-1">퇴근시간</button>
    <button class="action-btn action-btn--md text-button-md">단가</button>
  </div>
</div>
</div>
:::

### 라벨

버튼명만으로 그룹 목적을 파악하기 어려울 때 `.action-group-labeled` wrapper로 감싸고 라벨을 `.action-group` 앞에 배치한다. 라벨은 bordered box 바깥에 위치하며 버튼명이 충분히 명확하면 생략한다. 라벨 텍스트 스타일은 `.text-form-label` 유틸리티를 사용한다.

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">label</span>
  <div data-component class="action-group-labeled">
    <span class="action-group-label text-form-label" id="ag-ex-1">일괄변경</span>
    <div class="action-group" role="toolbar" aria-labelledby="ag-ex-1">
      <button class="action-btn action-btn--sm text-button-sm">퇴근시간</button>
      <button class="action-btn action-btn--sm text-button-sm">단가</button>
    </div>
  </div>
  <div data-component class="action-group-labeled">
    <span class="action-group-label text-form-label" id="ag-ex-2">일괄변경</span>
    <div class="action-group" role="toolbar" aria-labelledby="ag-ex-2">
      <button class="action-btn action-btn--md text-button-md">퇴근시간</button>
      <button class="action-btn action-btn--md text-button-md">단가</button>
    </div>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Container ── */
.action-group {
  display: inline-flex;
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-brand);
  border-radius: var(--radius-xs);
  /* overflow: hidden 사용 금지 — focus outline이 잘린다.
     대신 첫·마지막 버튼에 border-radius를 직접 적용해 모서리를 처리한다. */
}
/* 활성 버튼이 하나도 없으면(단일 disabled 포함) 컨테이너 테두리도 disabled 색으로 자동 전환 */
.action-group:not(:has(.action-btn:not(.action-btn--disabled))) {
  border-color: var(--color-border-disabled);
}

/* ── Corner radius (overflow: hidden 대신) ── */
/* 내부 radius = 컨테이너 radius - 테두리 두께(1px) */
.action-group > .action-btn:first-child { border-radius: calc(var(--radius-xs) - var(--stroke-sm)) 0 0 calc(var(--radius-xs) - var(--stroke-sm)); }
.action-group > .action-btn:last-child  { border-radius: 0 calc(var(--radius-xs) - var(--stroke-sm)) calc(var(--radius-xs) - var(--stroke-sm)) 0; }
.action-group > .action-btn:only-child  { border-radius: calc(var(--radius-xs) - var(--stroke-sm)); }

/* ── Item Base ── */
.action-btn {
  position: relative;
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--space-gap-xs);
  background: var(--color-surface-base);
  color: var(--color-text-brand);
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--duration-fast) var(--easing-base);
}
/* 구분선을 ::before 가상 요소로 분리 — 버튼 상태(disabled 등)가 구분선 색에 영향을 주지 않는다 */
.action-btn + .action-btn::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: var(--stroke-sm);
  background: var(--color-border-brand);
}
.action-btn:hover { background: var(--color-action-brand-hover); }

/* ── Size ── */
.action-btn--sm { height: var(--height-compact);  padding: var(--space-inset-squish-sm); }
.action-btn--md { height: var(--height-base);     padding: var(--space-inset-squish-sm); }

/* ── State ── */
.action-btn--disabled { pointer-events: none; color: var(--color-text-disabled); background: var(--color-surface-disabled); }

/* ── Icon ── */
.action-btn-icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
.action-btn--icon-only { padding: 0; }
.action-btn--icon-only.action-btn--sm { width: var(--height-compact); }
.action-btn--icon-only.action-btn--md { width: var(--height-base); }

/* icon-left/right: 아이콘 span은 항상 DOM 첫 번째에 둔다.
   icon-right만 row-reverse로 시각 순서를 역전시킨다. icon-left는 기본 row라 선언 불필요. */
.action-btn--icon-right { flex-direction: row-reverse; }

/* ── Labeled wrapper ── */
/* 라벨과 .action-group을 가로로 묶는 컨테이너. 라벨은 bordered box 밖에 위치한다. */
.action-group-labeled {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
}
/* 텍스트 스타일은 .text-form-label 유틸리티에서 가져온다. */
.action-group-label { white-space: nowrap; color: var(--color-text-brand-muted); }
```

---

## 접근성

버튼 유형 (`accessibility.md` 버튼 행 적용). 키보드 접근·focus·disabled 해당.

| 상황 | 마크업 |
|------|--------|
| 컨테이너 (라벨 없음) | `role="toolbar"` + `aria-label="그룹 목적"` |
| 컨테이너 (라벨 있음) | `role="toolbar"` + `aria-labelledby="label-id"` — visible label이 있으므로 aria-label 대신 참조 |
| icon-only | `aria-label="액션명"` 필수 |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |

```html
<!-- 라벨 없음 -->
<div class="action-group" role="toolbar" aria-label="근태 관리 도구">
  <button class="action-btn action-btn--sm text-button-sm">시간변경</button>
  <button class="action-btn action-btn--sm text-button-sm">퇴근시간</button>
</div>

<!-- 라벨 있음 -->
<div class="action-group-labeled">
  <span class="action-group-label text-form-label" id="ag-label">일괄변경</span>
  <div class="action-group" role="toolbar" aria-labelledby="ag-label">
    <button class="action-btn action-btn--sm text-button-sm">퇴근시간</button>
    <button class="action-btn action-btn--sm text-button-sm">단가</button>
  </div>
</div>
```

포커스 링은 `:focus-visible`로 처리되어 마우스 클릭 시에는 표시되지 않는다.

---

## Do / Don't

> ✅ DO — 컨테이너에 role="toolbar" + aria-label 명시
> `<div class="action-group" role="toolbar" aria-label="근태 관리 도구">`

> ✅ DO — 라벨 있을 때 .action-group-labeled wrapper + aria-labelledby 사용
> `<div class="action-group-labeled"><span class="action-group-label text-form-label" id="lbl">일괄변경</span><div class="action-group" role="toolbar" aria-labelledby="lbl">...</div></div>`

> ❌ DON'T — 라벨을 .action-group 안에 넣기
> 라벨은 bordered box 밖에 위치해야 한다. `.action-group` 첫 자식으로 넣으면 라벨에 테두리가 씌워진다.

> ❌ DON'T — action-btn에 button 태그 대신 div·span 사용
> `<div class="action-btn">시간변경</div>` → `<button class="action-btn ...">시간변경</button>`

> ❌ DON'T — data-component 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용. 실제 구현 코드에서는 제거한다.
