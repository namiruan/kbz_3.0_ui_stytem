---
file: components/organisms/empty-state.md
version: 0.2.0
status: draft
depends-on: components/_index.md, accessibility.md, components/atoms/button.md, components/atoms/icon.md, tokens/color.md, tokens/icon.md, tokens/radius.md, tokens/space.md, tokens/typography.md
---

# EmptyState

## 개요

데이터나 콘텐츠가 없는 상태를 표시하는 컨테이너. 빈 테이블, 검색 결과 없음, 미등록 데이터 등 데이터 부재 상황에서 사용자에게 현재 상황을 안내하고 다음 행동을 유도한다.

Spinner·Skeleton과의 차이 — Spinner·Skeleton은 콘텐츠를 불러오는 중임을 나타내고, EmptyState는 불러온 결과가 비어 있음을 나타낸다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | default (클래스 없음) · compact → `empty-state--compact` | default |
| icon | 없음 (기본) · 있음 — `.empty-state__icon` 슬롯 | 없음 |
| description | 없음 (기본) · 있음 — `.empty-state__description` 슬롯 | 없음 |
| actions | 없음 (기본) · 있음 — `.empty-state__actions` 슬롯 | 없음 |

- **default** — 패널·페이지 전체를 채우는 빈 상태. 상단 여백이 넓다.
- **compact** — 테이블·카드 안 인라인 빈 상태. 여백이 좁다.
- 아이콘은 variant에 관계없이 64px 원형 컨테이너 안 `--icon-xl`(30px) 고정. `filter: grayscale(1)`으로 무채색 처리.

---

## 사용 지침

<!-- AI:
레이어 계층: EmptyState — 레이아웃 루트 (div.empty-state)
  ├─ .empty-state__icon — div (원형 컨테이너). aria-hidden="true" 필수. optional.
  │    └─ svg > use[href="icons/sprite.svg#icon-*"] — 아이콘 SVG. aria-hidden="true".
  ├─ .empty-state__body — div. 제목+설명을 묶는 래퍼. 설명이 있을 때만 사용. 제목만 있으면 생략하고 .empty-state__title 직접 배치.
  │    ├─ .empty-state__title — p 태그 + text-body 클래스. 필수.
  │    └─ .empty-state__description — p 태그 + text-body 클래스. optional.
  └─ .empty-state__actions — div. 버튼은 button.md 참조. optional.

아이콘 선택 기준: 맥락을 대표하는 서비스 아이콘(icon-employee, icon-company 등) 또는 상태 아이콘(icon-search, icon-info). 아이콘 이름은 icons/categories.json에서 확인한다.
원형 컨테이너(.empty-state__icon)는 64px×64px 고정, CSS가 SVG 크기를 --icon-xl(30px)로 제어한다.
컨테이너 배경: --color-action-neutral-subtle (중립 반투명) — 어떤 배경에서도 면으로 원이 구분됨. border 없음.
아이콘 무채색 처리: CSS filter: grayscale(1)로 서비스 아이콘(자체 색상 변수)·currentColor 아이콘 모두 처리. 별도 color 인라인 스타일 추가 금지.
compact/default 모두 동일한 아이콘 크기를 사용한다. icon--xl / icon--2xl 클래스 불필요.
-->

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-3xl)">

<!-- default: 아이콘 + 제목 + 설명 + CTA -->
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">default — 아이콘 + 설명 + 액션</p>
  <div data-component class="empty-state">
    <div class="empty-state__icon" aria-hidden="true">
      <svg aria-hidden="true"><use href="icons/sprite.svg#icon-employee"/></svg>
    </div>
    <div class="empty-state__body">
      <p class="empty-state__title text-body">등록된 근로자가 없습니다</p>
      <p class="empty-state__description text-body">근로자를 추가하면 여기에 목록이 표시됩니다.</p>
    </div>
    <div class="empty-state__actions">
      <button class="btn btn--primary btn--md btn--icon-left" type="button">
        <span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-add"/></svg></span>
        근로자 추가
      </button>
    </div>
  </div>
</div>

<!-- default: 제목만 -->
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">default — 제목만</p>
  <div data-component class="empty-state">
    <p class="empty-state__title text-body">데이터가 없습니다</p>
  </div>
</div>

<!-- compact: 테이블 인라인 -->
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">compact — 테이블 인라인</p>
  <div style="border:1px solid var(--color-border-subtle);border-radius:var(--radius-md);overflow:hidden">
    <table class="table table--dense" aria-label="결과 없음 예시">
      <thead class="table__head">
        <tr>
          <th class="table__head-cell" scope="col">이름</th>
          <th class="table__head-cell" scope="col">입사일</th>
          <th class="table__head-cell" scope="col">부서</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr class="table__row">
          <td class="table__cell" colspan="3">
            <div data-component class="empty-state empty-state--compact">
              <div class="empty-state__icon" aria-hidden="true">
                <svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg>
              </div>
              <div class="empty-state__body">
                <p class="empty-state__title text-body">검색 결과가 없습니다</p>
                <p class="empty-state__description text-body">검색어를 변경하거나 필터를 초기화해 보세요.</p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</div>
:::

### 제약

- `empty-state__title`은 항상 필수. 아이콘·설명·액션은 선택.
- 아이콘은 맥락을 보조하는 역할. 장식용 삽화가 필요한 경우 별도 이미지 슬롯을 구현하되 `empty-state__icon`을 대체하지 않는다.
- `empty-state__actions`의 버튼이 2개 이상일 경우 button.md 배치 규칙(중요도 높은 버튼 → 오른쪽)을 따른다.
- compact는 테이블 셀(`td[colspan]`) 또는 카드 안 단독 사용. 패널·페이지 수준 공간에는 default를 사용한다.
- 아코디언 안 테이블은 섹션 제목이 이미 맥락을 전달하므로 아이콘 없이 제목만 사용한다.

---

## CSS

```css
/* ── Base ── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-stack-md);
  padding: var(--space-inset-3xl);
}

/* ── Icon ── */
/* EmptyState 전용 원형 일러스트 컨테이너 — 64px 고정(의미 토큰 없음) */
.empty-state__icon {
  width: 64px;
  height: 64px;
  border-radius: 50%; /* 원형 — radius 토큰으로 대체 불가 */
  background: var(--color-action-neutral-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.empty-state__icon svg {
  width: var(--icon-xl);
  height: var(--icon-xl);
  /* 서비스 아이콘(자체 색상 변수)·currentColor 아이콘 모두 무채색·반투명 처리 */
  filter: grayscale(1);
  opacity: 0.5;
}

/* ── Body (제목 + 설명 묶음) ── */
.empty-state__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-stack-xs);
}

/* ── Title ── */
.empty-state__title {
  margin: 0;
  color: var(--color-text-body);
}

/* ── Description ── */
.empty-state__description {
  margin: 0;
  color: var(--color-text-subtle);
  max-width: 360px;
}

/* ── Actions ── */
.empty-state__actions {
  display: flex;
  gap: var(--space-gap-xs);
  justify-content: center;
}

/* ── Compact ── */
.empty-state--compact {
  padding: var(--space-inset-2xl);
  gap: var(--space-stack-sm);
}
```

---

## 접근성

상태 표시 유형.

| 상황 | 마크업 |
|------|--------|
| 동적으로 empty state가 나타나는 경우 | root에 `role="status"` + `aria-live="polite"` — 스크린 리더에 변경 알림 |
| 정적 초기 렌더링 | role 생략 가능 |
| 아이콘 | `aria-hidden="true"` — 제목이 이미 상태를 전달하므로 이중 읽기 방지 |

---

## Do / Don't

| Do | Don't |
|----|-------|
| `empty-state__title`을 항상 포함 | 아이콘만 배치하고 텍스트 생략 |
| 맥락에 맞는 서비스 아이콘 사용 (icon-employee, icon-search 등) | 모든 empty state에 동일한 아이콘 사용 |
| compact는 테이블 셀·카드 안 인라인 용도에 사용 | 패널·페이지 수준 공간에 compact 사용 |
| 다음 행동이 명확할 때만 `empty-state__actions` 추가 | 불필요한 CTA 버튼 남발 |
