---
file: components/molecules/table-cell.md
version: 0.2.8
status: draft
updated: 2026-06-23
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, components/atoms/checkbox.md, components/atoms/badge.md, components/atoms/button.md, components/atoms/input.md, components/atoms/segment.md, components/atoms/action-group.md, components/atoms/tooltip.md, components/molecules/toast.md
---

# Table Cell

## 개요

`<table>` 요소와 그 안을 구성하는 헤더 셀·데이터 셀·행의 기본 스타일 Molecule.  
데이터 테이블([organisms/table/data.md](../organisms/table/data.md))과 정보 테이블([organisms/table/info.md](../organisms/table/info.md)) 두 Organism이 이 Molecule을 공유한다.

셀에 삽입되는 Checkbox·Badge·Input·Button 등의 스타일은 각 Atom 컴포넌트가 담당하며, 이 Molecule은 셀 컨테이너의 크기·배경·구분선만 정의한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | dense · compact · base · spacious | base (클래스 없음) |
| 헤더 유형 | plain · check (`table__cell--check`) · sort (`table__head-cell--sort`) | plain |
| 헤더 색상 | 기본 · input (`table__head-cell--input`, 검정) · caution (`table__head-cell--caution`, 주황) · total (`table__head-cell--total`, 파랑) | 기본 |
| 정렬 상태 | asc (`table__head-cell--sort-asc`) · desc (`table__head-cell--sort-desc`) | asc |
| 다중 정렬 순서 | `.table__sort-order` 숫자 텍스트 (아이콘 앞) | — |
| 데이터 내용 | text · number · button · input · checkbox · badge · 조합 | text |
| 열 너비 | 자동(기본) · 콘텐츠 맞춤 (`table__cell--fit`) | 자동 |

- **dense** `28px` — 급여·회계 등 고밀도 화면
- **compact** `32px` — 사이드바·패널 내 보조 테이블
- **base** `36px` — 일반 목록 화면 (기본)
- **spacious** `40px` — 터치 환경, 여유로운 레이아웃

---

## 사용 지침

### size 선택 기준

| size | 사용 상황 |
|------|----------|
| dense | 급여·회계·전표 등 한 화면에 최대한 많은 행을 표시해야 하는 고밀도 업무 화면 |
| compact | 사이드바·패널·모달 내 보조 테이블 — 주요 콘텐츠와 공존하는 좁은 영역 |
| base | 일반 목록 화면. 명시적 이유 없으면 base 사용 |
| spacious | 터치 친화 환경, 또는 여유로운 레이아웃이 필요한 경우 |

### 헤더 색상 variant 선택 기준

| variant | 클래스 | 사용 조건 |
|---------|--------|----------|
| 기본 | (없음) | 일반 테이블 헤더 — 대부분의 경우 |
| input | `table__head-cell--input` | 입력이 주 목적인 테이블 전체 헤더. 단순히 인풋 셀이 있다는 이유만으로 사용하지 않는다. 반드시 **total 열과 함께** 구성되어 입력 맥락 전체를 나타내야 사용한다 (예: 급여 입력, 회계 전표) |
| caution | `table__head-cell--caution` | 차감·손해·감소 등 주의가 필요한 값을 담는 열 |
| total | `table__head-cell--total` | 집계·합산 결과를 담는 열 |

> input 단독 사용 금지 — total 열 없이 input 헤더만 쓰면 입력 맥락이 불명확하다.  
> 색상 variant는 반드시 의미 있는 텍스트 레이블과 함께 사용한다. 색상만으로 열의 의미를 구분하지 않는다.

---

<!-- AI:
헤더 셀 조합 규칙:
- plain:   <th class="table__head-cell" scope="col">
- check:   <th class="table__cell table__cell--check" scope="col"> + checkbox atom
- sort:    <th class="table__head-cell table__head-cell--sort" scope="col">
             <button class="table__sort-btn">레이블 + tooltip-wrapper(.table__sort-order? + .icon)</button>
           정렬 상태는 th에 클래스 토글:
             오름차순(기본): .table__head-cell--sort-asc
             내림차순: .table__head-cell--sort-desc
           다중 정렬: 아이콘 앞에 <span class="table__sort-order icon--brand">N</span> 삽입
             aria-label에 "N번째 기준" 병기 (예: aria-label="컬럼명 오름차순 정렬됨, 1번째 기준")

헤더 색상 variant — 사용 조건:
- 기본(클래스 없음): 일반 테이블 헤더 (대부분의 경우)
- input (table__head-cell--input, 검정 배경): 단순히 인풋 셀이 포함된 테이블이 아니라,
    "데이터 입력이 주 목적인 테이블" 전체에 적용한다.
    급여 입력·회계 전표처럼 합계(total) 열이 함께 등장하는 입력형 데이터 테이블에서 사용.
    → input + total이 함께 쓰이는 컨텍스트가 이 variant의 전형적인 사용 시나리오.
- caution (table__head-cell--caution, 주황 배경): 해당 열이 손해·차감 등 주의가 필요한 값임을 시각적으로 경고.
    반드시 입력형 테이블일 필요는 없으나, input/total 열과 함께 쓰이는 경우가 많다.
- total (table__head-cell--total, 파란 배경): 집계·합산 열. 입력된 값의 계산 결과를 나타냄.
    input + total 조합이 전형적이다.

데이터 셀 내용:
- text:    <td class="table__cell">
- number:  <td class="table__cell table__cell--number"> — 금액·수량 열, 우측 정렬. organisms/table/data.md에 정의
- fit:     <td class="table__cell table__cell--fit"> — 날짜·코드 등 포맷 고정 열, 콘텐츠 최대 길이에 맞게 열 너비 수축
- button:  <td class="table__cell"> + <button class="btn btn--secondary btn--solid btn--xs">
- input:   <td class="table__cell--edit"> + <div class="input-wrap"><input class="input input--sm"></div> — xs 행에는 input--xs. organisms/table/data.md에 정의
- check:   <td class="table__cell table__cell--check"> + checkbox atom
- badge:   <td class="table__cell"> + <span class="badge ...">
- 조합:    <td class="table__cell" style="display:flex;align-items:center;gap:var(--space-6)"> + text + badge

size: <table class="table [table--dense|table--compact|table--spacious]">에 적용.
--table-row-height 변수가 cascade로 하위 셀에 전달됨.

[뷰어 데모 전용] makeToast / dismissToast 함수는 toast.md(depends-on)에서 allDepsJS로 주입됨.
실제 구현에서는 toast.md 의존 불필요 — 이 함수들은 동작 데모 스크립트에서만 사용.
-->

<!-- AI: initTableSort(container) — container는 <table>을 감싸는 래퍼 요소. 내부에서 querySelectorAll('table')을 실행하므로 <table> 요소를 직접 전달하면 초기화 실패. -->

```js init
function initTableSort(container) {
  container.querySelectorAll('table').forEach(function(table) {
    if (table.dataset.initTableSort) return;
    table.dataset.initTableSort = '1';

    var sortThs = table.querySelectorAll('.table__head-cell--sort');
    if (!sortThs.length) return;

    // global 기본 sort가 중복 부착하지 않도록 마킹
    sortThs.forEach(function(th) {
      var b = th.querySelector('.table__sort-btn');
      if (b) b.dataset.initSort = '1';
    });

    // toast stack: 없으면 컨테이너에 동적 생성
    var stage = table.closest('.component-preview-stage') || container;
    stage.style.position = 'relative'; // position:absolute 토스트 스택의 컨테이닝 블록 보장
    var toastStack = stage.querySelector('[id$="-toast-stack"]');
    if (!toastStack) {
      toastStack = document.createElement('div');
      toastStack.setAttribute('aria-live', 'polite');
      toastStack.setAttribute('aria-atomic', 'false');
      toastStack.style.cssText = 'position:absolute;bottom:var(--space-16);left:50%;transform:translateX(-50%);pointer-events:none;display:flex;flex-direction:column;gap:var(--space-gap-sm);z-index:100;';
      stage.appendChild(toastStack);
    }

    var activeUndoToast = null;
    var savedChain = null;

    function applySort(th, dir) {
      var btn = th.querySelector('.table__sort-btn');
      th.classList.remove('table__head-cell--sort-asc', 'table__head-cell--sort-desc');
      th.classList.add(dir === 'asc' ? 'table__head-cell--sort-asc' : 'table__head-cell--sort-desc');
      th.setAttribute('aria-sort', dir === 'asc' ? 'ascending' : 'descending');
      var use = btn.querySelector('.icon use');
      if (use) use.setAttribute('href', '#icon-sort-' + dir);
      var iconEl = btn.querySelector('.icon');
      if (iconEl) iconEl.classList.add('icon--brand');
    }

    function clearSort(th) {
      var btn = th.querySelector('.table__sort-btn');
      th.classList.remove('table__head-cell--sort-asc', 'table__head-cell--sort-desc');
      th.setAttribute('aria-sort', 'none');
      var use = btn.querySelector('.icon use');
      if (use) use.setAttribute('href', '#icon-sort-asc');
      var iconEl = btn.querySelector('.icon');
      if (iconEl) iconEl.classList.remove('icon--brand');
      var orderEl = btn.querySelector('.table__sort-order');
      if (orderEl) orderEl.remove();
      var tip = btn.querySelector('.tooltip-panel');
      if (tip) tip.textContent = '오름차순';
    }

    function updateOrderNumbers() {
      var chain = [];
      sortThs.forEach(function(t) {
        if (t.classList.contains('table__head-cell--sort-asc') || t.classList.contains('table__head-cell--sort-desc')) {
          var orderEl = t.querySelector('.table__sort-order');
          if (orderEl) chain.push({ th: t, order: parseInt(orderEl.textContent) });
        }
      });
      chain.sort(function(a, b) { return a.order - b.order; });
      chain.forEach(function(item, i) { item.th.querySelector('.table__sort-order').textContent = i + 1; });
    }

    function getNextOrder() {
      var max = 0;
      sortThs.forEach(function(t) {
        var el = t.querySelector('.table__sort-order');
        if (el) max = Math.max(max, parseInt(el.textContent));
      });
      return max + 1;
    }

    function attachOrderHandler(orderEl, th) {
      orderEl.addEventListener('click', function(e) {
        e.stopPropagation();
        clearSort(th);
        updateOrderNumbers();
      });
    }

    function saveChain() {
      savedChain = [];
      sortThs.forEach(function(t) {
        var isAsc = t.classList.contains('table__head-cell--sort-asc');
        var isDesc = t.classList.contains('table__head-cell--sort-desc');
        if (isAsc || isDesc) {
          var orderEl = t.querySelector('.table__sort-order');
          savedChain.push({ th: t, dir: isAsc ? 'asc' : 'desc', order: orderEl ? parseInt(orderEl.textContent) : null });
        }
      });
      savedChain.sort(function(a, b) { return (a.order || 0) - (b.order || 0); });
    }

    function restoreChain() {
      sortThs.forEach(function(t) { clearSort(t); });
      savedChain.forEach(function(item) {
        var btn = item.th.querySelector('.table__sort-btn');
        applySort(item.th, item.dir);
        if (item.order !== null) {
          var orderEl = document.createElement('span');
          orderEl.className = 'table__sort-order icon--brand';
          orderEl.textContent = item.order;
          orderEl.setAttribute('title', '클릭하여 정렬 해제');
          attachOrderHandler(orderEl, item.th);
          btn.querySelector('.tooltip-wrapper').insertBefore(orderEl, btn.querySelector('.tooltip-wrapper').firstChild);
        }
        var orderText = item.order !== null ? (' · ' + item.order + '번째 기준') : '';
        btn.querySelector('.tooltip-panel').textContent = (item.dir === 'asc' ? '오름차순' : '내림차순') + orderText;
      });
    }

    function showUndoToast() {
      if (activeUndoToast && typeof dismissToast === 'function') { dismissToast(activeUndoToast); activeUndoToast = null; }
      if (typeof makeToast !== 'function') return;
      var t = makeToast('info', '', '다중 정렬이 초기화되었습니다', '되돌리기');
      var actionLink = t.querySelector('.toast__action-link');
      if (actionLink) {
        actionLink.addEventListener('click', function(e) {
          e.preventDefault();
          restoreChain();
          if (typeof dismissToast === 'function') dismissToast(t);
          activeUndoToast = null;
        });
      }
      toastStack.appendChild(t);
      activeUndoToast = t;
    }

    // 기존 HTML의 순서 번호 뱃지 핸들러 초기화
    sortThs.forEach(function(th) {
      var existing = th.querySelector('.table__sort-order');
      if (existing) attachOrderHandler(existing, th);
    });

    sortThs.forEach(function(th) {
      var btn = th.querySelector('.table__sort-btn');
      if (!btn) return;
      btn.addEventListener('click', function(e) {
        var isAsc = th.classList.contains('table__head-cell--sort-asc');
        var isDesc = th.classList.contains('table__head-cell--sort-desc');
        var isMulti = e.shiftKey;

        if (!isMulti) {
          var chainCount = Array.from(sortThs).filter(function(t) {
            return t.classList.contains('table__head-cell--sort-asc') || t.classList.contains('table__head-cell--sort-desc');
          }).length;
          if (chainCount >= 2) { saveChain(); showUndoToast(); }
          sortThs.forEach(function(t) { if (t !== th) clearSort(t); });
          var orderEl = btn.querySelector('.table__sort-order');
          if (orderEl) orderEl.remove();
          if (isDesc) { applySort(th, 'asc'); btn.querySelector('.tooltip-panel').textContent = '오름차순'; }
          else if (isAsc) { applySort(th, 'desc'); btn.querySelector('.tooltip-panel').textContent = '내림차순'; }
          else { applySort(th, 'asc'); btn.querySelector('.tooltip-panel').textContent = '오름차순'; }
        } else {
          sortThs.forEach(function(t) {
            if (t === th) return;
            var sorted = t.classList.contains('table__head-cell--sort-asc') || t.classList.contains('table__head-cell--sort-desc');
            if (sorted && !t.querySelector('.table__sort-order')) {
              var b = t.querySelector('.table__sort-btn');
              var newOrder = document.createElement('span');
              newOrder.className = 'table__sort-order icon--brand';
              newOrder.textContent = getNextOrder();
              newOrder.setAttribute('title', '클릭하여 정렬 해제');
              attachOrderHandler(newOrder, t);
              var w = b.querySelector('.tooltip-wrapper');
              w.insertBefore(newOrder, w.firstChild);
              var dir = t.classList.contains('table__head-cell--sort-asc') ? '오름차순' : '내림차순';
              b.querySelector('.tooltip-panel').textContent = dir + ' · ' + newOrder.textContent + '번째 기준';
            }
          });
          if (!isAsc && !isDesc) {
            var order = getNextOrder();
            var orderEl = document.createElement('span');
            orderEl.className = 'table__sort-order icon--brand';
            orderEl.textContent = order;
            orderEl.setAttribute('title', '클릭하여 정렬 해제');
            attachOrderHandler(orderEl, th);
            btn.querySelector('.tooltip-wrapper').insertBefore(orderEl, btn.querySelector('.tooltip-wrapper').firstChild);
            applySort(th, 'asc');
            btn.querySelector('.tooltip-panel').textContent = '오름차순 · ' + order + '번째 기준';
          } else {
            var currentOrderEl = btn.querySelector('.table__sort-order');
            if (!currentOrderEl) {
              // 단일 정렬(순서 번호 없음) → 체인에 추가, 현재 방향 유지
              var order = getNextOrder();
              var newOrderEl = document.createElement('span');
              newOrderEl.className = 'table__sort-order icon--brand';
              newOrderEl.textContent = order;
              newOrderEl.setAttribute('title', '클릭하여 정렬 해제');
              attachOrderHandler(newOrderEl, th);
              btn.querySelector('.tooltip-wrapper').insertBefore(newOrderEl, btn.querySelector('.tooltip-wrapper').firstChild);
              var dir = isAsc ? '오름차순' : '내림차순';
              btn.querySelector('.tooltip-panel').textContent = dir + ' · ' + order + '번째 기준';
            } else if (isAsc) {
              applySort(th, 'desc');
              btn.querySelector('.tooltip-panel').textContent = '내림차순 · ' + currentOrderEl.textContent + '번째 기준';
            } else {
              clearSort(th);
              updateOrderNumbers();
            }
          }
        }
      });
    });
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initTableSort) window.__componentInits.initTableSort = initTableSort;
```

---

## 동작

sort 버튼 클릭으로 정렬 상태를 순환한다. Shift+클릭으로 다중 정렬을 구성할 수 있다. size 토글로 행 높이 변화를 확인할 수 있다.

| 이벤트 | 동작 |
|--------|------|
| 클릭 (기본) | 해당 열 오름차순 단일 정렬, 나머지 초기화 |
| 클릭 (오름차순) | 내림차순으로 토글 |
| 클릭 (내림차순) | 오름차순으로 토글 |
| Shift+클릭 (기본) | 다중 정렬 체인에 추가, 다음 순서 번호 부여 |
| Shift+클릭 (오름차순) | 내림차순으로 토글 (순서 번호 유지) |
| Shift+클릭 (내림차순) | 체인에서 제거, 이후 순서 번호 당겨짐 |
| 순서 번호 hover | 취소선 + brand hover 배경 — 제거될 것임을 시각적으로 안내 |
| 순서 번호 클릭 | 해당 열을 체인에서 즉시 제거, 이후 번호 당겨짐 |

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-12)">
  <div style="display:flex;justify-content:center">
    <div id="size-segment" class="segment" role="radiogroup" aria-label="테이블 사이즈">
      <span class="segment__slider" aria-hidden="true"></span>
      <button class="segment__item" role="radio" aria-checked="false" data-size="table--dense">dense</button>
      <button class="segment__item" role="radio" aria-checked="false" data-size="table--compact">compact</button>
      <button class="segment__item segment__item--selected" role="radio" aria-checked="true" data-size="">base</button>
      <button class="segment__item" role="radio" aria-checked="false" data-size="table--spacious">spacious</button>
    </div>
  </div>
  <div style="border-radius:var(--radius-md);overflow:hidden;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);background:var(--color-surface-base)">
  <table data-component id="demo-table" class="table" aria-label="정렬·사이즈 동작 예시">
    <thead class="table__head">
      <tr>
        <th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th>
        <th class="table__head-cell table__head-cell--sort table__head-cell--sort-asc" scope="col" aria-sort="ascending"><button class="table__sort-btn" aria-label="이름 오름차순, 1번째 기준">이름<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="table__sort-order icon--brand">1</span><span class="icon icon--sm icon--brand" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순 · 1번째 기준</div></span></button></th>
        <th class="table__head-cell table__head-cell--sort table__head-cell--sort-desc" scope="col" aria-sort="descending"><button class="table__sort-btn" aria-label="금액 내림차순, 2번째 기준">금액<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="table__sort-order icon--brand">2</span><span class="icon icon--sm icon--brand" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-desc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">내림차순 · 2번째 기준</div></span></button></th>
        <th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none"><button class="table__sort-btn" aria-label="상태 정렬">상태<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button></th>
        <th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none"><button class="table__sort-btn" aria-label="메모 정렬">메모<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button></th>
        <th class="table__head-cell" scope="col">액션</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr class="table__row table__row--selected">
        <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" checked aria-label="홍길동 선택됨"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
        <td class="table__cell">홍길동</td>
        <td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="3,200,000" aria-label="금액 입력"></div></td>
        <td class="table__cell"><span class="badge badge--success">재직</span></td>
        <td class="table__cell">팀장 · 수석</td>
        <td class="table__cell"><button class="btn btn--secondary btn--solid btn--xs">상세보기</button></td>
      </tr>
      <tr class="table__row">
        <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="김철수 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
        <td class="table__cell">김철수</td>
        <td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="2,800,000" aria-label="금액 입력"></div></td>
        <td class="table__cell"><span class="badge badge--neutral">휴직</span></td>
        <td class="table__cell">팀원</td>
        <td class="table__cell"><button class="btn btn--secondary btn--solid btn--xs">상세보기</button></td>
      </tr>
      <tr class="table__row">
        <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="이영희 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
        <td class="table__cell">이영희</td>
        <td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="3,000,000" aria-label="금액 입력"></div></td>
        <td class="table__cell"><span class="badge badge--error">퇴직</span></td>
        <td class="table__cell">팀원</td>
        <td class="table__cell"><button class="btn btn--secondary btn--solid btn--xs">상세보기</button></td>
      </tr>
    </tbody>
  </table>
  </div>
</div>
<div id="demo-toast-stack" aria-live="polite" aria-atomic="false" style="position:absolute;bottom:var(--space-16);left:50%;transform:translateX(-50%);pointer-events:none;display:flex;flex-direction:column;gap:var(--space-gap-sm);"></div>
<script>
(function() {
  var table = stage.querySelector('#demo-table');
  var sizeClasses = ['table--dense', 'table--compact', 'table--spacious'];

  // segment 슬라이더 초기화
  function updateSlider(group) {
    var slider = group.querySelector('.segment__slider');
    var selected = group.querySelector('.segment__item--selected');
    if (!slider || !selected) return;
    slider.style.width = selected.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + selected.offsetLeft + 'px)';
  }
  var seg = stage.querySelector('#size-segment');
  updateSlider(seg);

  // size 토글
  seg.querySelectorAll('.segment__item').forEach(function(btn) {
    btn.addEventListener('click', function() {
      seg.querySelectorAll('.segment__item').forEach(function(b) {
        b.classList.remove('segment__item--selected');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('segment__item--selected');
      btn.setAttribute('aria-checked', 'true');
      updateSlider(seg);
      sizeClasses.forEach(function(c) { table.classList.remove(c); });
      if (btn.dataset.size) table.classList.add(btn.dataset.size);
    });
  });

  // global init 중복 방지
  stage.querySelectorAll('table').forEach(function(t) { t.dataset.initCheckbox = '1'; });

  // 전체 선택
  var allCb = stage.querySelector('.table__head .table__cell--check input[type="checkbox"]');
  var rowCbs = stage.querySelectorAll('.table__body .table__cell--check input[type="checkbox"]');
  if (allCb) {
    allCb.addEventListener('change', function() {
      rowCbs.forEach(function(cb) {
        cb.checked = allCb.checked;
        cb.closest('.table__row').classList.toggle('table__row--selected', allCb.checked);
      });
    });
  }
  rowCbs.forEach(function(cb) {
    cb.addEventListener('change', function() {
      cb.closest('.table__row').classList.toggle('table__row--selected', cb.checked);
      if (allCb) {
        var allChecked = Array.from(rowCbs).every(function(c) { return c.checked; });
        var anyChecked = Array.from(rowCbs).some(function(c) { return c.checked; });
        allCb.checked = allChecked;
        allCb.indeterminate = anyChecked && !allChecked;
      }
    });
  });

  initTableSort(stage);
})();
</script>
:::

### 헤더 색상 배리에이션

입력이 주 목적인 데이터 테이블에서 사용한다. input(검정) 헤더는 단순히 인풋 셀이 있는 테이블이 아니라, 합계(total) 열과 함께 구성되어 입력 맥락 전체를 나타내는 경우에만 사용한다. caution(주황)은 차감·손해 등 주의 값 열, total(파랑)은 집계·합산 열에 적용한다.

:::preview
<div style="border-radius:var(--radius-md);overflow:hidden;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);background:var(--color-surface-base)">
<table data-component class="table table--dense" aria-label="헤더 색상 배리에이션 예시">
  <thead class="table__head">
    <tr>
      <th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" id="hv-all" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th>
      <th class="table__head-cell" scope="col">이름</th>
      <th class="table__head-cell table__head-cell--input table__head-cell--sort" scope="col" aria-sort="none"><button class="table__sort-btn" aria-label="기본급 정렬">기본급<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button></th>
      <th class="table__head-cell table__head-cell--caution table__head-cell--sort" scope="col" aria-sort="none"><button class="table__sort-btn" aria-label="차감 정렬">차감<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button></th>
      <th class="table__head-cell table__head-cell--total table__head-cell--sort" scope="col" aria-sort="none"><button class="table__sort-btn" aria-label="합계 정렬">합계<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button></th>
    </tr>
  </thead>
  <tbody class="table__body">
    <tr class="table__row">
      <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="홍길동 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
      <td class="table__cell">홍길동</td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="3,200,000" aria-label="기본급 입력"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="50,000" aria-label="차감 입력"></div></td>
      <td class="table__cell">3,150,000</td>
    </tr>
    <tr class="table__row">
      <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="김철수 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
      <td class="table__cell">김철수</td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="2,800,000" aria-label="기본급 입력"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="0" aria-label="차감 입력"></div></td>
      <td class="table__cell">2,800,000</td>
    </tr>
    <tr class="table__row">
      <td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="이영희 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td>
      <td class="table__cell">이영희</td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="3,000,000" aria-label="기본급 입력"></div></td>
      <td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="100,000" aria-label="차감 입력"></div></td>
      <td class="table__cell">2,900,000</td>
    </tr>
  </tbody>
</table>
</div>
<script>
(function() {
  // 전체 선택
  var allCb = stage.querySelector('#hv-all');
  var rowCbs = stage.querySelectorAll('.table__body .table__cell--check input[type="checkbox"]');
  allCb.addEventListener('change', function() {
    rowCbs.forEach(function(cb) {
      cb.checked = allCb.checked;
      cb.closest('.table__row').classList.toggle('table__row--selected', allCb.checked);
    });
  });
  rowCbs.forEach(function(cb) {
    cb.addEventListener('change', function() {
      cb.closest('.table__row').classList.toggle('table__row--selected', cb.checked);
      var allChecked = Array.from(rowCbs).every(function(c) { return c.checked; });
      var anyChecked = Array.from(rowCbs).some(function(c) { return c.checked; });
      allCb.checked = allChecked;
      allCb.indeterminate = anyChecked && !allChecked;
    });
  });
  // edit cell — 초기값 있으면 complete, blur 시 상태 전환
  stage.querySelectorAll('.table__cell--edit .input').forEach(function(input) {
    if (input.value) input.classList.add('input--complete');
    input.addEventListener('blur', function() {
      input.classList.toggle('input--complete', !!input.value);
    });
    input.addEventListener('input', function() {
      if (!input.value) input.classList.remove('input--complete');
    });
  });

  // sort 토글
  stage.querySelectorAll('.table__head-cell--sort .table__sort-btn').forEach(function(btn) {
    var th = btn.closest('th');
    btn.addEventListener('click', function() {
      var isAsc = th.classList.contains('table__head-cell--sort-asc');
      var isDesc = th.classList.contains('table__head-cell--sort-desc');
      // 다른 컬럼 초기화
      stage.querySelectorAll('.table__head-cell--sort').forEach(function(t) {
        if (t !== th) {
          t.classList.remove('table__head-cell--sort-asc', 'table__head-cell--sort-desc');
          t.setAttribute('aria-sort', 'none');
          var u = t.querySelector('.icon use');
          if (u) u.setAttribute('href', '#icon-sort-asc');
          var ic = t.querySelector('.icon');
          if (ic) ic.classList.remove('icon--brand');
          var tp = t.querySelector('.tooltip-panel');
          if (tp) tp.textContent = '오름차순';
        }
      });
      var use = btn.querySelector('.icon use');
      var icon = btn.querySelector('.icon');
      var tip = btn.querySelector('.tooltip-panel');
      if (isDesc) {
        th.classList.remove('table__head-cell--sort-desc'); th.classList.add('table__head-cell--sort-asc');
        th.setAttribute('aria-sort', 'ascending');
        if (use) use.setAttribute('href', '#icon-sort-asc');
        if (icon) icon.classList.add('icon--brand');
        if (tip) tip.textContent = '오름차순';
      } else if (isAsc) {
        th.classList.remove('table__head-cell--sort-asc'); th.classList.add('table__head-cell--sort-desc');
        th.setAttribute('aria-sort', 'descending');
        if (use) use.setAttribute('href', '#icon-sort-desc');
        if (icon) icon.classList.add('icon--brand');
        if (tip) tip.textContent = '내림차순';
      } else {
        th.classList.add('table__head-cell--sort-asc');
        th.setAttribute('aria-sort', 'ascending');
        if (use) use.setAttribute('href', '#icon-sort-asc');
        if (icon) icon.classList.add('icon--brand');
        if (tip) tip.textContent = '오름차순';
      }
    });
  });
})();
</script>
:::

---

## Anatomy

### 헤더 셀

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">color variants</span>
  <div style="display:flex;gap:var(--space-gap-xs)">
    <table data-component class="table table--dense" style="width:100px"><thead class="table__head"><tr><th class="table__head-cell" scope="col">기본</th></tr></thead></table>
    <table data-component class="table table--dense" style="width:100px"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--input" scope="col">입력</th></tr></thead></table>
    <table data-component class="table table--dense" style="width:100px"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--caution" scope="col">차감</th></tr></thead></table>
    <table data-component class="table table--dense" style="width:100px"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--total" scope="col">합계</th></tr></thead></table>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">check</span>
  <table data-component class="table table--dense" style="width:44px"><thead class="table__head"><tr><th class="table__cell table__cell--check" scope="col"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="전체 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></th></tr></thead></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sort · 기본(오름차순)</span>
  <table data-component class="table table--dense" style="width:160px"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort" scope="col" aria-sort="none"><button class="table__sort-btn" aria-label="컬럼명 정렬">컬럼명<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순</div></span></button></th></tr></thead></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sort · 오름차순</span>
  <table data-component class="table table--dense" style="width:160px"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-asc" scope="col" aria-sort="ascending"><button class="table__sort-btn" aria-label="컬럼명 오름차순 정렬됨">컬럼명<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm icon--brand" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">내림차순으로 정렬</div></span></button></th></tr></thead></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sort · 내림차순</span>
  <table data-component class="table table--dense" style="width:160px"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-desc" scope="col" aria-sort="descending"><button class="table__sort-btn" aria-label="컬럼명 내림차순 정렬됨">컬럼명<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="icon icon--sm icon--brand" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-desc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">내림차순</div></span></button></th></tr></thead></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sort · 다중 정렬 (1번째)</span>
  <table data-component class="table table--dense" style="width:160px"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-asc" scope="col" aria-sort="ascending"><button class="table__sort-btn" aria-label="컬럼명 오름차순 정렬됨, 1번째 기준">컬럼명<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="table__sort-order icon--brand">1</span><span class="icon icon--sm icon--brand" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">오름차순 · 1번째 기준</div></span></button></th></tr></thead></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sort · 다중 정렬 (2번째)</span>
  <table data-component class="table table--dense" style="width:160px"><thead class="table__head"><tr><th class="table__head-cell table__head-cell--sort table__head-cell--sort-desc" scope="col" aria-sort="descending"><button class="table__sort-btn" aria-label="컬럼명 내림차순 정렬됨, 2번째 기준">컬럼명<span class="tooltip-wrapper" onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')" onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"><span class="table__sort-order icon--brand">2</span><span class="icon icon--sm icon--brand" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-desc"/></svg></span><div class="tooltip-panel elevation-tooltip tooltip-panel--bottom" role="tooltip">내림차순 · 2번째 기준</div></span></button></th></tr></thead></table>
</div>
</div>
:::

### 데이터 셀

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">text</span>
  <table data-component class="table table--dense" style="width:160px"><tbody class="table__body"><tr class="table__row"><td class="table__cell">텍스트 데이터</td></tr></tbody></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">button</span>
  <table data-component class="table table--dense" style="width:160px"><tbody class="table__body"><tr class="table__row"><td class="table__cell"><button class="btn btn--secondary btn--solid btn--xs">상세보기</button></td></tr></tbody></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">input · xs</span>
  <table data-component class="table table--dense" style="width:160px"><tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input input--xs" type="text" value="3,000,000" aria-label="입력"></div></td></tr></tbody></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">input · sm</span>
  <table data-component class="table" style="width:160px"><tbody class="table__body"><tr class="table__row"><td class="table__cell--edit"><div class="input-wrap"><input class="input input--sm" type="text" value="3,000,000" aria-label="입력"></div></td></tr></tbody></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">check</span>
  <table data-component class="table table--dense" style="width:44px"><tbody class="table__body"><tr class="table__row"><td class="table__cell table__cell--check"><label class="checkbox checkbox--sm"><input type="checkbox" aria-label="행 선택"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span></label></td></tr></tbody></table>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">badge</span>
  <table data-component class="table table--dense" style="width:160px"><tbody class="table__body"><tr class="table__row"><td class="table__cell"><span class="badge badge--success">활성</span></td></tr></tbody></table>
</div>
</div>
:::

---

## CSS

```css
/* ── Size 토큰 (CSS 변수 cascade) ── */
/* --table-cell-py: tr height보다 작게 유지 → tr height가 단일행 높이를 결정, 멀티라인은 padding이 여백 확보 */
.table            { --table-row-height: var(--height-base);     --table-cell-py: var(--space-8); }
.table--dense     { --table-row-height: var(--height-dense);    --table-cell-py: var(--space-2); }
.table--compact   { --table-row-height: var(--height-compact);  --table-cell-py: var(--space-6); }
.table--spacious  { --table-row-height: var(--height-spacious); --table-cell-py: var(--space-12); }

/* ── Base ── */
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: var(--font-size-base);
  line-height: 1;
  color: var(--color-text-body);
}

/* ── Row height — td/th의 height는 min-height처럼 동작하므로 tr에 지정 ── */
.table__head tr,
.table__body .table__row,
.table__foot .table__row {
  height: var(--table-row-height);
}

/* ── Head ── */
.table thead {
  background: var(--color-surface-neutral);
}

.table__head .table__cell {
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

.table__head-cell {
  padding: var(--table-cell-py) var(--space-inset-xl);
  text-align: left;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-subtle);
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* ── Head cell color variants ── */
/* hover는 sort 버튼이 있을 때만 — plain·input·caution·total 헤더는 인터랙션 없으므로 hover 없음 */
/* color-mix(in srgb, token 80%, black): 어두운 solid 배경 위 hover를 같은 계열색으로 처리.
   action-neutral-hover(10% 오버레이)는 어두운 배경에서 시각적으로 구분 불가. */

/* 입력 테이블: 어두운 배경 + 흰 텍스트 */
.table__head-cell--input {
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
}
.table__head-cell--input.table__head-cell--sort .table__sort-btn {
  background: none;
  color: var(--color-text-inverse);
}
.table__head-cell--input.table__head-cell--sort .table__sort-btn:hover {
  background: color-mix(in srgb, var(--color-surface-dark) 80%, black);
}
.table__head-cell--input .icon { color: var(--color-text-inverse); }

/* 차감·주의 항목 */
.table__head-cell--caution {
  background: var(--color-fill-caution);
  color: var(--color-text-inverse);
}
.table__head-cell--caution.table__head-cell--sort .table__sort-btn {
  background: none;
  color: var(--color-text-inverse);
}
.table__head-cell--caution.table__head-cell--sort .table__sort-btn:hover {
  background: color-mix(in srgb, var(--color-fill-caution) 80%, black);
}
.table__head-cell--caution .icon { color: var(--color-text-inverse); }

/* 합계 */
.table__head-cell--total {
  background: var(--color-fill-brand);
  color: var(--color-text-inverse);
}
.table__head-cell--total.table__head-cell--sort .table__sort-btn {
  background: none;
  color: var(--color-text-inverse);
}
.table__head-cell--total.table__head-cell--sort .table__sort-btn:hover {
  background: color-mix(in srgb, var(--color-fill-brand) 80%, black);
}
.table__head-cell--total .icon { color: var(--color-text-inverse); }

/* sort 셀 자체 padding 제거 — 버튼이 셀 전체를 채워 hover 영역이 plain과 동일하게 */
.table__head-cell--sort {
  padding: 0;
  overflow: visible;
}

/* ── Sort button — 셀 전체 채움, 아이콘 우측 끝 정렬 ── */
.table__sort-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--table-row-height);
  padding: var(--table-cell-py) var(--space-inset-xl);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-subtle);
  text-align: left;
}

.table__sort-btn:hover {
  background: var(--color-action-neutral-hover);
}

.table__sort-btn:active {
  background: var(--color-action-neutral-active);
}

/* focus-visible: 전역 *:focus-visible 규칙이 없으므로 컴포넌트에서 직접 선언 */
.table__sort-btn:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── sort 버튼 내 아이콘 래퍼 — 숫자+아이콘 수직 중앙 정렬 ── */
.table__sort-btn .tooltip-wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-2xs);
}

/* ── 다중 정렬 순서 번호 ── */
/* min-width·height: 16px 고정 크기 — Semantic 크기 토큰이 없으므로 --space-generic-lg(16px) 사용 */
.table__sort-order {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--space-generic-lg);
  height: var(--space-generic-lg);
  padding: 0 var(--space-inset-xs);
  border-radius: var(--radius-xs);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-heading);
  line-height: 1;
  cursor: pointer;
  transition: background 0.1s;
}

.table__sort-order:hover {
  background: var(--color-action-brand-hover);
  text-decoration: line-through;
}

/* ── Edit cell ── */
.table__cell--edit {
  padding: var(--table-cell-py) var(--space-inset-xl);
  vertical-align: middle;
  box-sizing: border-box;
}

/* dense·compact → input--xs(height-tight), base·spacious → input--sm(height-compact) */
/* base 규칙이 먼저, dense·compact가 나중에 와야 .table 클래스 중복 적용 시 덮어씌워짐 */
.table .table__cell--edit .input,
.table--spacious .table__cell--edit .input {
  height: var(--height-compact);
  font-size: var(--font-size-sm);
}

.table--dense .table__cell--edit .input,
.table--compact .table__cell--edit .input {
  height: var(--height-tight);
  font-size: var(--font-size-sm);
}


/* ── Cell border-bottom (border-collapse에서 tr border 미적용 우회) ── */
.table__body .table__row .table__cell,
.table__body .table__row .table__cell--edit {
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

.table__body .table__row:last-child .table__cell,
.table__body .table__row:last-child .table__cell--edit {
  border-bottom: none;
}

/* ── Row interaction ── */
.table__body .table__row:hover {
  background: var(--color-action-brand-subtle);
}

.table__body .table__row--selected {
  background: var(--color-action-brand-subtle);
}

.table__body .table__row--selected:hover {
  background: var(--color-action-brand-hover);
}

/* ── Cell ── */
.table__cell {
  padding: var(--table-cell-py) var(--space-inset-xl);
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}

/* 버튼이 포함된 셀은 hover 효과(box-shadow)가 잘리지 않도록 overflow 해제 */
.table__cell:has(.btn) {
  overflow: visible;
}

/* ── Fit cell — 콘텐츠 최대 길이에 맞게 열 너비 고정 ── */
/* white-space:nowrap으로 줄바꿈을 막아 포맷이 고정된 열(날짜·코드 등)이
   가장 긴 콘텐츠 너비에 딱 맞게 유지되도록 함 */
.table__cell--fit {
  white-space: nowrap;
}

/* ── Check cell ── */
/* position:relative로 td를 기준점 삼아 자식을 절대 중앙 정렬 —
   vertical-align:middle은 x-height 기준이라 기하학적 중앙이 아님 */
.table__cell--check {
  width: calc(var(--icon-sm) + var(--space-inset-md) * 2); /* 16px + 6px*2 = 28px */
  padding: 0;
  overflow: visible;
  position: relative;
}

.table__cell--check > .checkbox,
.table__cell--check > input[type="checkbox"] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.table__head .table__cell--check {
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}
```

---

## 접근성

테이블 데이터 유형 (`accessibility.md` 테이블 행 적용).

| 상황 | 마크업 |
|------|--------|
| 열 헤더 | `<th scope="col" class="table__head-cell">` |
| 테이블 설명 | `<table aria-label="…">` 또는 `<caption>` |
| 정렬 상태 | 정렬 중인 `<th>`에 `aria-sort="ascending"` 또는 `aria-sort="descending"` |
| 미정렬 sort 열 | `aria-sort="none"` 명시 — 정렬 가능한 열임을 스크린리더에 알림 (속성 생략 시 정렬 불가로 오인될 수 있음) |
| 체크 셀 레이블 | 헤더 `aria-label="전체 선택"`, 데이터 행 `aria-label="[행 식별값] 선택"` |
| 헤더 색상 variant | 색상만으로 열 의미를 구분하지 않는다. 반드시 의미 있는 텍스트 레이블과 함께 사용 |

### 키보드 조작

| 키 | 동작 |
|----|------|
| `Tab` | sort 버튼 간 이동 |
| `Enter` / `Space` | 단일 정렬 토글 (오름차순 → 내림차순 → 오름차순) |
| `Shift` + `Enter` / `Space` | 다중 정렬 체인에 추가 또는 토글 |

```js
// sort 버튼 키보드 이벤트 예시
sortBtn.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleSort(th, e.shiftKey); // shiftKey = 다중 정렬
  }
});
```

---

## Do / Don't

> ✅ DO — size modifier는 `<table>` 루트에만 적용
> `<table class="table table--dense">`

> ❌ DON'T — 개별 `<td>` · `<th>`에 size 클래스 추가
> size는 `--table-row-height` 변수로 cascade 전달되므로 루트 하나에만 적용

> ✅ DO — 정렬 상태를 클래스와 `aria-sort` 두 곳에 동시 반영
> `<th class="table__head-cell--sort-asc" aria-sort="ascending">`

> ❌ DON'T — 이 Molecule을 페이지에 직접 단독 사용
> 항상 Organism(`data.md` 또는 `info.md`)을 통해 `.table-container`로 감싸서 사용

> ✅ DO — `input` 헤더는 `total` 열과 함께 구성된 입력형 테이블에서만 사용
> 급여 입력·회계 전표처럼 입력이 주 목적이고 합산 열이 존재하는 경우

> ❌ DON'T — 인풋 셀이 하나라도 있으면 `table__head-cell--input` 적용
> 단순히 인풋 셀이 포함된 테이블 전체에 input 헤더를 적용하면 의미가 과장됨

> ✅ DO — `caution` · `total`은 해당 열의 데이터 성격에만 적용
> caution = 차감·손해·감소, total = 집계·합산 결과

> ❌ DON'T — 헤더 색상 variant를 강조 목적으로 임의 사용
> 색상 variant는 데이터 의미(주의/합계)를 전달하는 시맨틱 마커이며 시각적 강조 수단이 아님
