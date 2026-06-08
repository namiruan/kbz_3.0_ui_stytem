---
file: components/molecules/pagination.md
version: 0.4.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, tokens/radius.md, tokens/height.md, tokens/motion.md, components/atoms/icon.md
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

### 제약

- 총 페이지가 1개이면 Pagination을 표시하지 않는다.
- number type: 항상 첫 페이지·마지막 페이지 버튼을 노출하고, 현재 페이지 주변 1개씩만 표시한다. 나머지는 `…`로 축약한다.
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

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl)">

<p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-xs)">number (md)</p>
<nav data-component id="pg-demo" class="pagination" aria-label="페이지 탐색">
  <button id="pg-prev" class="pagination__arrow" type="button" aria-label="이전 페이지">
    <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-left"/></svg>
  </button>
  <ol id="pg-list" class="pagination__list" role="list"></ol>
  <button id="pg-next" class="pagination__arrow" type="button" aria-label="다음 페이지">
    <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-right"/></svg>
  </button>
</nav>

<p class="text-helper" style="color:var(--color-text-subtle);margin:var(--space-gap-md) 0 var(--space-gap-xs)">simple (md)</p>
<nav data-component class="pagination pagination--simple" aria-label="페이지 탐색">
  <button class="pagination__arrow" type="button" aria-label="이전 페이지">
    <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-left"/></svg>
  </button>
  <span class="pagination__simple-text text-body">3 / 12</span>
  <button class="pagination__arrow" type="button" aria-label="다음 페이지">
    <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-right"/></svg>
  </button>
</nav>

</div>
<script>
(function() {
  var TOTAL = 12;
  var current = 3;
  var prevBtn = stage.querySelector('#pg-prev');
  var nextBtn = stage.querySelector('#pg-next');
  var list = stage.querySelector('#pg-list');

  function pages(cur, total) {
    /* 항상 표시: 1, last. 현재 주변 ±1. 나머지 ellipsis */
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
    list.innerHTML = '';
    pages(current, TOTAL).forEach(function(p) {
      var li = document.createElement('li');
      if (p === '…') {
        li.className = 'pagination__ellipsis';
        li.setAttribute('aria-hidden', 'true');
        li.textContent = '…';
      } else {
        var btn = document.createElement('button');
        btn.className = 'pagination__page';
        btn.type = 'button';
        btn.textContent = p;
        if (p === current) {
          btn.classList.add('pagination__page--current');
          btn.setAttribute('aria-current', 'page');
        } else {
          btn.addEventListener('click', function() { current = p; render(); });
        }
        li.appendChild(btn);
      }
      list.appendChild(li);
    });
    prevBtn.disabled = current === 1;
    nextBtn.disabled = current === TOTAL;
  }

  prevBtn.addEventListener('click', function() { if (current > 1) { current--; render(); } });
  nextBtn.addEventListener('click', function() { if (current < TOTAL) { current++; render(); } });
  render();
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = nav.pagination[aria-label="페이지 탐색"].
  - number type: 기본 클래스 없음. simple type: nav.pagination.pagination--simple
  - size: md — 클래스 없음(기본). sm — pagination--sm 추가.
- .pagination__arrow: 이전/다음 아이콘 버튼. 첫/마지막 페이지에서 disabled 속성 추가.
- ol.pagination__list[role="list"]: 페이지 번호 목록 (number type 전용).
  - li > button.pagination__page.text-body: 페이지 번호 버튼.
    - 현재 페이지: pagination__page--current + aria-current="page". 클릭 불가.
  - li.pagination__ellipsis[aria-hidden="true"]: 축약 구분자 "…".
- span.pagination__simple-text.text-body: "현재 / 전체" 텍스트 (simple type 전용).
-->

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl)">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">number — md</p>
  <nav data-component class="pagination" aria-label="페이지 탐색">
    <button class="pagination__arrow" type="button" aria-label="이전 페이지" disabled>
      <svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="icons/sprite.svg#icon-chevron-left"/></svg>
    </button>
    <ol class="pagination__list" role="list">
      <li><button class="pagination__page pagination__page--current" type="button" aria-current="page">1</button></li>
      <li><button class="pagination__page" type="button">2</button></li>
      <li><button class="pagination__page" type="button">3</button></li>
      <li class="pagination__ellipsis" aria-hidden="true">…</li>
      <li><button class="pagination__page" type="button">12</button></li>
    </ol>
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
    <ol class="pagination__list" role="list">
      <li><button class="pagination__page pagination__page--current" type="button" aria-current="page">1</button></li>
      <li><button class="pagination__page" type="button">2</button></li>
      <li><button class="pagination__page" type="button">3</button></li>
      <li class="pagination__ellipsis" aria-hidden="true">…</li>
      <li><button class="pagination__page" type="button">12</button></li>
    </ol>
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
    <span class="pagination__simple-text text-body">3 / 12</span>
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
  outline-offset: 2px;
}

/* ── Disabled — btn--disabled 패턴과 동일 ── */
.pagination__arrow:disabled {
  background: var(--color-surface-disabled);
  color: var(--color-text-disabled);
  border-color: var(--color-border-disabled);
  cursor: default;
  pointer-events: none;
}

/* ── Page: current ── */
.pagination__page--current {
  border-color: var(--color-border-brand);
  color: var(--color-text-brand);
  font-weight: var(--font-weight-heading);
  cursor: default;
  pointer-events: none;
}

/* ── Page list ── */
.pagination__list {
  display: flex;
  align-items: center;
  gap: var(--space-gap-2xs);
  list-style: none;
  margin: 0;
  padding: 0;
}

.pagination__list > li {
  display: flex;
  align-items: center;
}

/* ── Ellipsis ── */
.pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--height-compact);
  height: var(--height-compact);
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
.pagination--sm .pagination__arrow,
.pagination--sm .pagination__page,
.pagination--sm .pagination__ellipsis {
  height: var(--height-dense);
  min-width: var(--height-dense);
}
.pagination--sm .pagination__arrow { width: var(--height-dense); }
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
