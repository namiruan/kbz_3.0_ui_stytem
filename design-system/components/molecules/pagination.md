---
file: components/molecules/pagination.md
version: 1.3.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, components/atoms/icon.md
---

# Pagination

## 개요

데이터 테이블·목록의 페이지 단위 탐색 컨트롤. 현재 페이지·전체 페이지 수를 표시하고 이전·다음·특정 페이지로 이동한다.

무한 스크롤과의 차이 — 전체 데이터 양과 현재 위치를 명확히 파악해야 하는 업무용 테이블에 사용한다. URL 파라미터와 연동해 공유·북마크를 지원한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | sm · md | md |
| type | number · simple | number |

- **number** — 페이지 번호 버튼을 나열한다. 페이지 수가 많으면 `…`(ellipsis)로 중간을 축약한다.
- **simple** — 이전·다음 버튼과 "N / 전체N" 텍스트만 표시한다. 공간이 협소하거나 페이지 수가 불필요할 때 사용한다.

---

## 사용 지침

### 선택 기준

| 상황 | 권장 type |
|------|-----------|
| 데이터 테이블, 검색 결과 | number |
| 모달·사이드패널 내 목록, 공간 협소 | simple |

### Pagination이 아닌 화면

번호가 아니라 **이어 붙이는** 편이 맞는 목록이 있다(훑어 내려가며 찾는 공지·자료·후기, 상세 왕복이 잦은 목록). 그때는 ContentList의 목록 끝 슬롯에 「더 보기」 버튼을 둔다 — → `content-list.md` 「목록 끝 — 페이지네이션이냐 「더 보기」냐」.

**폭에 따라 바꾸지 않는다.** 번호와 「더 보기」는 모양이 아니라 데이터 모델이 다르다 — 번호는 페이지를 갈아 끼우고 「더 보기」는 쌓는다. 한 화면이 폭에 따라 둘 다이면 창을 줄이는 순간 지금 상태의 뜻이 바뀌고, 뒤로 왔을 때의 복귀 규칙도 두 벌이 된다. **고르는 것은 화면이다.**

`sm`이 좁아서 번호가 불편한 것뿐이라면 **`pagination--simple`이 먼저다** — 모델을 그대로 두고 좁은 자리만 푼다.

---

### 제약

- 총 페이지가 1개이면 Pagination을 표시하지 않는다.
- number type: 항상 첫 페이지·마지막 페이지 버튼을 노출하고, 현재 페이지 주변 1개씩만 표시한다. 나머지는 `…`로 축약한다.
  - **주변 1개씩이다.** 첫 페이지에서는 `1 2 … 12`이지 `1 2 3 … 12`가 아니다. 문서의 정적 예시가 오래 이 규칙을 어기고 있었고, 그걸 보고 만든 프로토타입도 같이 어긋났다 — 예시는 규칙의 그림이라 예시가 틀리면 규칙이 아니라 예시가 퍼진다.
- 현재 페이지 버튼은 클릭 불가 상태로 렌더링한다(`aria-current="page"` + `.pagination__page--current`).
- 첫 페이지에서 이전 버튼, 마지막 페이지에서 다음 버튼은 disabled 처리한다.

---

## 동작

<!-- AI:
- goToPage(n): 현재 페이지를 n으로 갱신하고 버튼 상태를 재계산한다.
  - 이전/다음 버튼: 첫/마지막 페이지에서 disabled
  - 페이지 번호 버튼: 현재 페이지에 pagination__page--current + aria-current="page"
  - ellipsis 위치: 현재 페이지가 4 이상이면 앞쪽 축약, 마지막-3 이하이면 뒤쪽 축약
- simple type은 JS 없이 텍스트만 갱신하면 된다.
-->

```js init
function initPagination(container) {
  var nav = container.querySelector('#pg-demo');
  if (!nav || nav.hasAttribute('data-init-pagination')) return;
  nav.setAttribute('data-init-pagination', '');

  var TOTAL = 12;
  var current = 3;
  var prevBtn = container.querySelector('#pg-prev');
  var nextBtn = container.querySelector('#pg-next');

  /* simple */
  var spPrev = container.querySelector('#sp-prev');
  var spNext = container.querySelector('#sp-next');
  var spText = container.querySelector('#sp-text');
  var spCurrent = 1;

  function renderSimple() {
    spText.textContent = spCurrent + ' / ' + TOTAL;
    spPrev.disabled = spCurrent === 1;
    spNext.disabled = spCurrent === TOTAL;
  }

  spPrev.addEventListener('click', function() { if (spCurrent > 1) { spCurrent--; renderSimple(); } });
  spNext.addEventListener('click', function() { if (spCurrent < TOTAL) { spCurrent++; renderSimple(); } });
  renderSimple();

  function pages(cur, total) {
    var show = new Set([1, total, cur - 1, cur, cur + 1].filter(function(p) { return p >= 1 && p <= total; }));
    var sorted = Array.from(show).sort(function(a, b) { return a - b; });
    var result = [];
    sorted.forEach(function(p, i) {
      if (i > 0 && p - sorted[i - 1] > 1) result.push('…');
      result.push(p);
    });
    return result;
  }

  function render() {
    /* 이전·다음 버튼 사이의 페이지 버튼만 제거 */
    nav.querySelectorAll('.pagination__page, .pagination__ellipsis').forEach(function(el) { el.remove(); });
    pages(current, TOTAL).forEach(function(p) {
      var el;
      if (p === '…') {
        el = document.createElement('span');
        el.className = 'pagination__ellipsis';
        el.setAttribute('aria-hidden', 'true');
        el.textContent = '…';
      } else {
        el = document.createElement('button');
        el.className = 'pagination__page';
        el.type = 'button';
        el.textContent = p;
        if (p === current) {
          el.classList.add('pagination__page--current');
          el.setAttribute('aria-current', 'page');
        } else {
          el.addEventListener('click', function() { current = p; render(); });
        }
      }
      nav.insertBefore(el, nextBtn);
    });
    prevBtn.disabled = current === 1;
    nextBtn.disabled = current === TOTAL;
  }

  prevBtn.addEventListener('click', function() { if (current > 1) { current--; render(); } });
  nextBtn.addEventListener('click', function() { if (current < TOTAL) { current++; render(); } });
  render();
}

if (window.__componentInits && !window.__componentInits.initPagination) window.__componentInits.initPagination = initPagination;
```

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl)">

<p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-xs)">number (md)</p>
<nav data-component id="pg-demo" class="pagination" aria-label="페이지 탐색">
  <button id="pg-prev" class="pagination__arrow" type="button" aria-label="이전 페이지">
    <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-left"/></svg>
  </button>
  <button id="pg-next" class="pagination__arrow" type="button" aria-label="다음 페이지">
    <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-right"/></svg>
  </button>
</nav>

<p class="text-helper" style="color:var(--color-text-subtle);margin:var(--space-gap-md) 0 var(--space-gap-xs)">simple (md)</p>
<nav class="pagination pagination--simple" aria-label="페이지 탐색">
  <button id="sp-prev" class="pagination__arrow" type="button" aria-label="이전 페이지">
    <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-left"/></svg>
  </button>
  <span id="sp-text" class="pagination__simple-text">1 / 12</span>
  <button id="sp-next" class="pagination__arrow" type="button" aria-label="다음 페이지">
    <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-right"/></svg>
  </button>
</nav>

</div>
<script>
initPagination(stage);
</script>
:::

---

## Anatomy

<!-- AI:
- root = nav.pagination[aria-label="페이지 탐색"].
  - number type: 기본 클래스 없음. simple type: nav.pagination.pagination--simple
  - size: md — 클래스 없음(기본). sm — pagination--sm 추가.
- 모든 자식 요소는 nav의 직접 자식으로 배치 — ol/li 래퍼 없음. nav가 단일 flex row.
- button.pagination__arrow: 이전/다음 아이콘 버튼. 첫/마지막 페이지에서 disabled 속성 추가.
- button.pagination__page: 페이지 번호 버튼.
  - 현재 페이지: pagination__page--current + aria-current="page". disabled 속성은 사용하지 않음 — pointer-events: none을 CSS로 처리하여 포커스는 허용.
- span.pagination__ellipsis[aria-hidden="true"]: 축약 구분자 "…".
- span.pagination__simple-text: "현재 / 전체" 텍스트 (simple type 전용).
-->

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl)">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">number — md</p>
  <nav data-component class="pagination" aria-label="페이지 탐색">
    <button class="pagination__arrow" type="button" aria-label="이전 페이지">
      <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-left"/></svg>
    </button>
    <button class="pagination__page" type="button">1</button>
    <span class="pagination__ellipsis" aria-hidden="true">…</span>
    <button class="pagination__page" type="button">4</button>
    <button class="pagination__page pagination__page--current" type="button" aria-current="page">5</button>
    <button class="pagination__page" type="button">6</button>
    <span class="pagination__ellipsis" aria-hidden="true">…</span>
    <button class="pagination__page" type="button">12</button>
    <button class="pagination__arrow" type="button" aria-label="다음 페이지">
      <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-right"/></svg>
    </button>
  </nav>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">number — sm</p>
  <nav data-component class="pagination pagination--sm" aria-label="페이지 탐색">
    <button class="pagination__arrow" type="button" aria-label="이전 페이지" disabled>
      <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-left"/></svg>
    </button>
    <button class="pagination__page pagination__page--current" type="button" aria-current="page">1</button>
    <button class="pagination__page" type="button">2</button>
    <span class="pagination__ellipsis" aria-hidden="true">…</span>
    <button class="pagination__page" type="button">12</button>
    <button class="pagination__arrow" type="button" aria-label="다음 페이지">
      <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-right"/></svg>
    </button>
  </nav>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">simple — md</p>
  <nav data-component class="pagination pagination--simple" aria-label="페이지 탐색">
    <button class="pagination__arrow" type="button" aria-label="이전 페이지">
      <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-left"/></svg>
    </button>
    <span class="pagination__simple-text">3 / 12</span>
    <button class="pagination__arrow" type="button" aria-label="다음 페이지">
      <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-right"/></svg>
    </button>
  </nav>
</div>

</div>
:::

---

## CSS

```css
/* ── Base ── */
.pagination {
  display: inline-flex;
  align-items: center;
  height: var(--height-compact);
  gap: var(--space-gap-2xs);
}

/* ── 공통 버튼 베이스 (arrow · page 공유) ── */
/* box-sizing·padding 리셋 — 전역 리셋 없는 환경에서 버튼 기본 padding이 content-box에 쌓여 height가 어긋남 */
.pagination__arrow,
.pagination__page {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--height-compact);
  padding: 0;
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  border: var(--stroke-sm) solid transparent;
  border-radius: var(--radius-xs);
  background: transparent;
  color: var(--color-text-label);
  cursor: pointer;
  transition: background var(--duration-fast) var(--easing-base),
              color var(--duration-fast) var(--easing-base),
              border-color var(--duration-fast) var(--easing-base);
}
/* 화살표는 숫자와 **같은 정사각**이다. 높이는 위 공통 베이스가 이미 잡으므로 폭만 맞춘다.

   처음엔 아이콘 크기 그대로(16×24) 뒀다 — 투명 배경일 때 화살표 좌우 여백이 숫자 사이
   간격에 더해져 보이지 않게 하려던 것이다. 그런데 그 최적화가 두 가지를 깼다:
   ① 누를 수 있는 넓이가 숫자의 **1/6**(16×24 vs 32×32)이라 같은 줄에서 화살표만 맞히기 어렵다.
   ② hover·disabled의 배경이 칠해지는 순간 얇은 조각으로 드러나 숫자와 리듬이 어긋난다.
   덜어낸 여백은 실제로는 문제가 아니었다 — 셰브런 아이콘이 24 viewBox 안에 이미 여백을
   갖고 있어, 32px 상자로 키워도 눈에 보이는 간격이 벌어지지 않는다(16·24·28·32을 나란히 렌더해 확인). */
.pagination__arrow { width: var(--height-compact); }
.pagination__page  { min-width: var(--height-compact); padding: 0 var(--space-gap-xs); }

/* ── Hover ── */
.pagination__arrow:hover,
.pagination__page:hover {
  background: var(--color-action-neutral-hover);
  color: var(--color-text-body);
}

/* ── Focus ── */
.pagination__arrow:focus-visible,
.pagination__page:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Disabled — 면을 **더하지 않는다** ── */
/* 한때 btn--disabled를 그대로 베꼈다(회색 면 + 회색 테두리). 패턴은 같은데 **출발점이 달랐다.**
   버튼은 원래 칠해져 있어서 disabled의 회색 면이 primary의 진한 면을 **대신하며 물러난다.**
   여기 컨트롤은 바탕이 투명하다(ghost) — 그 위에 회색 면을 얹으면 없던 상자가 새로 생기고,
   한 줄에서 **유일하게 칠해진 것이 못 누르는 화살표**가 된다. 실제로 그렇게 보였다:
   현재 페이지(브랜드 틴트 칩)보다 비활성 화살표가 먼저 눈에 들어왔다.

   **투명한 컨트롤의 disabled는 빼는 것으로 표시한다** — 면을 더하지 않고 글자·아이콘 색만
   한 단계 내린다(--color-text-disabled, gray-400). 그러면 한 줄에서 칠해진 것은
   현재 페이지 하나가 되고, 그게 이 컴포넌트에서 유일하게 칠해질 이유가 있는 것이다.
   gray-300까지 내리는 안도 나란히 렌더해 봤는데 화살표가 사라지다시피 해서
   "여기 컨트롤이 있다"는 사실 자체가 지워진다 — 비활성이지 부재가 아니다. */
.pagination__arrow:disabled,
.pagination__page:disabled {
  background: transparent;
  color: var(--color-text-disabled);
  border-color: transparent;
  cursor: default;
  pointer-events: none;
}

/* ── Page: current ── */
.pagination__page--current {
  background: var(--color-action-brand-selected);
  border-color: var(--color-border-brand-subtle);
  color: var(--color-text-brand);
  font-weight: var(--font-weight-heading);
  cursor: default;
  pointer-events: none;
}

/* pagination__page, pagination__ellipsis는 nav의 직접 자식 — 별도 list 래퍼 없음 */

/* ── Ellipsis ── */
.pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--height-compact);
  color: var(--color-text-subtle);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  user-select: none;
}

/* ── Simple type ── */
.pagination--simple { gap: var(--space-gap-xs); }

.pagination__simple-text {
  min-width: var(--space-gap-3xl);
  text-align: center;
  color: var(--color-text-body);
}

/* ── Size: sm ── */
/* md와 같은 규칙 — 화살표도 숫자와 같은 정사각이다. 셋이 같은 높이를 받아야
   화살표만 줄에서 떠 보이지 않는다. */
.pagination--sm { height: var(--height-dense); }
.pagination--sm .pagination__arrow,
.pagination--sm .pagination__page,
.pagination--sm .pagination__ellipsis {
  height: var(--height-dense);
}
.pagination--sm .pagination__arrow { width: var(--height-dense); }
.pagination--sm .pagination__page,
.pagination--sm .pagination__ellipsis { min-width: var(--height-dense); }
```

---

## 접근성

네비게이션 랜드마크 유형 (`accessibility.md` 네비게이션 행 적용).

| 상황 | 마크업 |
|------|--------|
| 루트 | `<nav aria-label="페이지 탐색">` — 페이지에 nav가 여러 개일 때 구분하는 레이블 |
| 현재 페이지 | `<button aria-current="page">` — 스크린리더에 현재 위치 전달 |
| 이전/다음 버튼 | `<button aria-label="이전 페이지">` / `<button aria-label="다음 페이지">` — 아이콘 전용이므로 레이블 필수 |
| 비활성 이전/다음 | `disabled` 속성 — 스크린리더에 비활성 상태 전달 |
| ellipsis | `aria-hidden="true"` — 스크린리더에 전달하지 않는다 |
| 키보드 | Tab으로 버튼 간 이동. 현재 페이지 버튼은 `pointer-events: none`으로 클릭 차단, 포커스는 허용 |

---

## Do / Don't

> ✅ DO — 총 페이지 1개이면 렌더링하지 않음
> 페이지가 1개뿐이면 탐색할 이유가 없다

> ❌ DON'T — 현재 페이지를 링크로 처리
> `<a href="?page=3" aria-current="page">3</a>` → 현재 페이지 이동은 의미 없음. `<button>` + `pointer-events: none` 사용

> ✅ DO — 이전/다음 버튼에 `aria-label` 명시
> 아이콘만 있는 버튼은 레이블 없이는 스크린리더가 목적을 알 수 없다

> ❌ DON'T — 공간이 부족한 영역에 number type 사용
> 모달·사이드패널·테이블 하단 좁은 영역에는 `pagination--simple` 사용
