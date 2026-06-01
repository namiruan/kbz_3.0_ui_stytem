---
file: components/molecules/dropdown.md
version: 0.3.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/shadow.md, tokens/z-index.md, tokens/height.md, tokens/typography.md, tokens/icon.md, components/atoms/button.md, components/atoms/icon.md
---

# Dropdown

## 개요

트리거를 클릭하면 옵션 패널이 열리는 선택 컴포넌트. 필터·정렬 등 액션 컨텍스트에서 ActionGroup 안에 배치하며 검색이 없다. 폼 필드 내 단일·복수 선택이 필요하면 Combobox를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| shape | rect (기본, 클래스 없음) · pill → `dropdown--pill` | rect |
| appearance | default (기본, 클래스 없음) · ghost → `dropdown--ghost` | default |
| selection | single (기본, 클래스 없음) · multi → `dropdown--multi` | single |
| size | sm → `dropdown--sm` · md (기본, 클래스 없음) | md |
| option style | checkbox (기본, 클래스 없음) · menu → `dropdown--menu` | checkbox |
| state | error → `dropdown--error` · disabled → `dropdown--disabled` | — |
| open | `dropdown--open` (JS 제어) | — |

---

## 사용 지침

### shape 선택 기준

`dropdown--pill`은 서비스 내 버튼·칩 스타일과 맞춰 선택한다.

| 상황 | shape |
|------|-------|
| 테이블 인라인 필터, 폼과 유사한 컨텍스트 | rect (기본) — 다른 input 요소와 시각 계층 통일 |
| 페이지 상단 필터바, 툴바, ActionGroup | pill — 버튼·칩과 일관된 곡선감 |

### selection 선택 기준

| 상황 | selection |
|------|-----------|
| 옵션 중 하나만 선택 | single (기본) |
| 여러 항목 동시 선택 | multi |

### appearance 선택 기준

| 상황 | appearance |
|------|------------|
| 필터·속성 선택 — 선택 상태를 트리거에 명시적으로 표시해야 할 때 | default (기본) |
| 툴바·테이블 헤더·인라인 — 주변 컨텍스트에 녹아드는 컨트롤이 필요할 때 | ghost — `dropdown--ghost` |

`dropdown--ghost`는 기본 상태에서 border와 background가 없다. 선택된 값 자체가 시각적 피드백이 되므로 선택됨 상태에서도 브랜드 색 처리를 하지 않는다.

### option style 선택 기준

| 상황 | option style |
|------|-------------|
| 필터·속성 선택 — 선택 여부를 명확히 시각화해야 할 때 | checkbox (기본) |
| 버튼 모음 역할 — 값 설정보다 액션/뷰 전환에 가까울 때 | menu — `dropdown--menu` |

`dropdown--menu`는 단일 선택과 함께 주로 사용한다. 옵션 왼쪽에 아이콘을 넣으려면 `.dropdown__option-icon`을 추가한다 (선택적). `dropdown--multi`와 함께 사용하지 않는다.

### 제약

- 옵션이 3개 이하이고 모두 항상 표시되어야 한다면 Radio 그룹을 사용한다.
- `dropdown--disabled`와 `dropdown--error`는 함께 사용하지 않는다.
- `dropdown--menu`는 `dropdown--multi`와 함께 사용하지 않는다.
- 폼 필드 내 선택에는 Combobox를 사용한다. Dropdown은 필터·정렬·액션 컨텍스트 전용이다.
- 선택값은 트리거 내부에만 표시한다. 별도 영역에 중복 표시하지 않는다.

---

## 동작

패널 열기/닫기·옵션 선택은 JS로 제어한다.

| 이벤트 | 동작 |
|--------|------|
| 트리거 클릭 | `dropdown--open` 토글. `aria-expanded` 갱신. **선택된 옵션 패널 상단 정렬** |
| 외부 클릭 | 패널 닫힘 |
| 옵션 클릭 (single) | `dropdown__option--selected` 교체 → 트리거 텍스트 갱신 → 패널 닫힘 |
| 옵션 클릭 (multi) | `dropdown__option--selected` 토글 → 트리거 카운트 갱신. 패널 유지 |
| `Escape` | 패널 닫힘. 트리거에 포커스 복귀 |
| `↑` / `↓` | 패널 내 옵션 포커스 이동 |
| `Enter` / `Space` | 포커스된 옵션 선택 (또는 트리거에서 패널 열기) |

:::preview
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;padding-bottom:240px;width:fit-content;margin:0 auto">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">단일 선택</p>
  <div style="width:160px">
    <div class="dropdown dropdown--button dropdown--pill" id="demo-dd-single">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
        <span class="dropdown__value dropdown__value--placeholder">담당자</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-label="담당자">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">김철수</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">이영희</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">박민준</span></li>
          <li class="dropdown__option dropdown__option--disabled" role="option" aria-selected="false" aria-disabled="true"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">최지은 (휴직)</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">정수빈</span></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">정렬 — Menu + 아이콘</p>
  <div style="width:120px">
    <div class="dropdown dropdown--button dropdown--pill dropdown--menu" id="demo-dd-menu-icon">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="정렬 선택">
        <span class="dropdown__trigger-icon" aria-hidden="true" hidden></span>
        <span class="dropdown__value dropdown__value--placeholder">정렬</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-label="정렬">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><span class="dropdown__option-label">오름차순</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-desc"/></svg></span><span class="dropdown__option-label">내림차순</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span><span class="dropdown__option-label">날짜순</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-time"/></svg></span><span class="dropdown__option-label">최신순</span></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">더 보기 — Menu</p>
  <div style="width:120px">
    <div class="dropdown dropdown--button dropdown--pill dropdown--menu" id="demo-dd-menu-plain">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="작업 선택">
        <span class="dropdown__value dropdown__value--placeholder">작업</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-label="작업">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-label">수정</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-label">복사</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-label">다운로드</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-label">삭제</span></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">복수 선택</p>
  <div style="width:180px">
    <div class="dropdown dropdown--button dropdown--pill dropdown--multi" id="demo-dd-multi">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태</span>
        <span class="dropdown__count" hidden aria-hidden="true"></span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="상태">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">진행 중</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">완료</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">검토 중</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">보류</span></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">ghost 정렬</p>
  <div class="dropdown dropdown--button dropdown--ghost dropdown--menu dropdown--pill" id="demo-dd-ghost">
    <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="정렬 선택">
      <span class="dropdown__trigger-icon" aria-hidden="true" hidden></span>
      <span class="dropdown__value dropdown__value--placeholder">정렬</span>
      <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
    </button>
    <div class="dropdown__panel">
      <ul class="dropdown__list" role="listbox" aria-label="정렬">
        <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><span class="dropdown__option-label">오름차순</span></li>
        <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-desc"/></svg></span><span class="dropdown__option-label">내림차순</span></li>
        <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-time"/></svg></span><span class="dropdown__option-label">최신순</span></li>
      </ul>
    </div>
  </div>
</div>

</div>
<script>
(function() {
  function openDD(dd) {
    dd.classList.add('dropdown--open');
    dd.querySelector('button.dropdown__trigger').setAttribute('aria-expanded', 'true');
  }
  function closeDD(dd) {
    dd.classList.remove('dropdown--open');
    dd.querySelector('button.dropdown__trigger').setAttribute('aria-expanded', 'false');
  }
  /* 선택된 옵션을 목록 상단으로 정렬 — 열릴 때 호출 */
  function sortOpts(dd) {
    var list = dd.querySelector('.dropdown__list');
    if (!list) return;
    Array.from(list.querySelectorAll('.dropdown__option'))
      .sort(function(a, b) {
        return (a.classList.contains('dropdown__option--selected') ? 0 : 1) -
               (b.classList.contains('dropdown__option--selected') ? 0 : 1);
      }).forEach(function(o) { list.appendChild(o); });
  }

  /* ── 단일 선택 — checkbox ── */
  var ddS   = stage.querySelector('#demo-dd-single');
  var trigS = ddS.querySelector('.dropdown__trigger');
  var valS  = ddS.querySelector('.dropdown__value');
  var optsS = Array.from(ddS.querySelectorAll('.dropdown__option'));

  trigS.addEventListener('click', function() {
    if (ddS.classList.contains('dropdown--open')) { closeDD(ddS); }
    else { sortOpts(ddS); openDD(ddS); }
  });
  optsS.forEach(function(opt) {
    opt.addEventListener('click', function() {
      if (opt.classList.contains('dropdown__option--disabled')) return;
      optsS.forEach(function(o) { o.classList.remove('dropdown__option--selected'); o.setAttribute('aria-selected', 'false'); });
      opt.classList.add('dropdown__option--selected');
      opt.setAttribute('aria-selected', 'true');
      valS.textContent = opt.querySelector('.dropdown__option-label').textContent;
      valS.classList.remove('dropdown__value--placeholder');
      closeDD(ddS);
    });
  });
  ddS.addEventListener('keydown', function(e) {
    if (!ddS.classList.contains('dropdown--open')) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigS.click(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); closeDD(ddS); trigS.focus(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var idx = optsS.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, optsS.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (optsS[idx]) optsS[idx].focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (document.activeElement.classList.contains('dropdown__option')) { e.preventDefault(); document.activeElement.click(); }
    }
  });

  /* ── 복수 선택 ── */
  var ddM   = stage.querySelector('#demo-dd-multi');
  var trigM = ddM.querySelector('.dropdown__trigger');
  var valM  = ddM.querySelector('.dropdown__value');
  var cntM  = ddM.querySelector('.dropdown__count');
  var optsM = Array.from(ddM.querySelectorAll('.dropdown__option'));

  function syncMultiVal() {
    var sel = optsM.filter(function(o) { return o.classList.contains('dropdown__option--selected'); });
    if (!sel.length) {
      valM.classList.add('dropdown__value--placeholder');
      cntM.hidden = true;
      return;
    }
    valM.classList.remove('dropdown__value--placeholder');
    cntM.textContent = sel.length;
    cntM.hidden = false;
  }
  trigM.addEventListener('click', function() {
    if (ddM.classList.contains('dropdown--open')) { closeDD(ddM); }
    else { sortOpts(ddM); openDD(ddM); }
  });
  optsM.forEach(function(opt) {
    opt.addEventListener('click', function() {
      var s = opt.classList.toggle('dropdown__option--selected');
      opt.setAttribute('aria-selected', s.toString());
      syncMultiVal();
    });
  });
  ddM.addEventListener('keydown', function(e) {
    if (!ddM.classList.contains('dropdown--open')) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigM.click(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); closeDD(ddM); trigM.focus(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var idx = optsM.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, optsM.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (optsM[idx]) optsM[idx].focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (document.activeElement.classList.contains('dropdown__option')) { e.preventDefault(); document.activeElement.click(); }
    }
  });

  /* ── Menu 단일 선택 — 아이콘 있음 ── */
  var ddMenuI   = stage.querySelector('#demo-dd-menu-icon');
  var trigMenuI = ddMenuI.querySelector('.dropdown__trigger');
  var valMenuI  = ddMenuI.querySelector('.dropdown__value');
  var trigIconI = ddMenuI.querySelector('.dropdown__trigger-icon');
  var optsMenuI = Array.from(ddMenuI.querySelectorAll('.dropdown__option'));

  trigMenuI.addEventListener('click', function() {
    if (ddMenuI.classList.contains('dropdown--open')) { closeDD(ddMenuI); }
    else { sortOpts(ddMenuI); openDD(ddMenuI); }
  });
  optsMenuI.forEach(function(opt) {
    opt.addEventListener('click', function() {
      optsMenuI.forEach(function(o) { o.classList.remove('dropdown__option--selected'); o.setAttribute('aria-selected', 'false'); });
      opt.classList.add('dropdown__option--selected');
      opt.setAttribute('aria-selected', 'true');
      valMenuI.textContent = opt.querySelector('.dropdown__option-label').textContent;
      valMenuI.classList.remove('dropdown__value--placeholder');
      var optIcon = opt.querySelector('.dropdown__option-icon');
      if (optIcon && trigIconI) { trigIconI.innerHTML = optIcon.innerHTML; trigIconI.hidden = false; }
      closeDD(ddMenuI);
    });
  });
  ddMenuI.addEventListener('keydown', function(e) {
    if (!ddMenuI.classList.contains('dropdown--open')) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigMenuI.click(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); closeDD(ddMenuI); trigMenuI.focus(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var idx = optsMenuI.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, optsMenuI.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (optsMenuI[idx]) optsMenuI[idx].focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (document.activeElement.classList.contains('dropdown__option')) { e.preventDefault(); document.activeElement.click(); }
    }
  });

  /* ── Menu 단일 선택 — 아이콘 없음 ── */
  var ddMenuP   = stage.querySelector('#demo-dd-menu-plain');
  var trigMenuP = ddMenuP.querySelector('.dropdown__trigger');
  var valMenuP  = ddMenuP.querySelector('.dropdown__value');
  var optsMenuP = Array.from(ddMenuP.querySelectorAll('.dropdown__option'));

  trigMenuP.addEventListener('click', function() {
    if (ddMenuP.classList.contains('dropdown--open')) { closeDD(ddMenuP); }
    else { sortOpts(ddMenuP); openDD(ddMenuP); }
  });
  optsMenuP.forEach(function(opt) {
    opt.addEventListener('click', function() {
      optsMenuP.forEach(function(o) { o.classList.remove('dropdown__option--selected'); o.setAttribute('aria-selected', 'false'); });
      opt.classList.add('dropdown__option--selected');
      opt.setAttribute('aria-selected', 'true');
      valMenuP.textContent = opt.querySelector('.dropdown__option-label').textContent;
      valMenuP.classList.remove('dropdown__value--placeholder');
      closeDD(ddMenuP);
    });
  });
  ddMenuP.addEventListener('keydown', function(e) {
    if (!ddMenuP.classList.contains('dropdown--open')) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigMenuP.click(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); closeDD(ddMenuP); trigMenuP.focus(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var idx = optsMenuP.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, optsMenuP.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (optsMenuP[idx]) optsMenuP[idx].focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (document.activeElement.classList.contains('dropdown__option')) { e.preventDefault(); document.activeElement.click(); }
    }
  });

  /* ── Ghost 단일 선택 — Menu + 아이콘 ── */
  var ddG     = stage.querySelector('#demo-dd-ghost');
  var trigG   = ddG.querySelector('.dropdown__trigger');
  var valG    = ddG.querySelector('.dropdown__value');
  var trigIconG = ddG.querySelector('.dropdown__trigger-icon');
  var optsG   = Array.from(ddG.querySelectorAll('.dropdown__option'));

  trigG.addEventListener('click', function() {
    if (ddG.classList.contains('dropdown--open')) { closeDD(ddG); }
    else { sortOpts(ddG); openDD(ddG); }
  });
  optsG.forEach(function(opt) {
    opt.addEventListener('click', function() {
      optsG.forEach(function(o) { o.classList.remove('dropdown__option--selected'); o.setAttribute('aria-selected', 'false'); });
      opt.classList.add('dropdown__option--selected');
      opt.setAttribute('aria-selected', 'true');
      valG.textContent = opt.querySelector('.dropdown__option-label').textContent;
      valG.classList.remove('dropdown__value--placeholder');
      var optIcon = opt.querySelector('.dropdown__option-icon');
      if (optIcon && trigIconG) { trigIconG.innerHTML = optIcon.innerHTML; trigIconG.hidden = false; }
      closeDD(ddG);
    });
  });
  ddG.addEventListener('keydown', function(e) {
    if (!ddG.classList.contains('dropdown--open')) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigG.click(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); closeDD(ddG); trigG.focus(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var idx = optsG.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, optsG.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (optsG[idx]) optsG[idx].focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (document.activeElement.classList.contains('dropdown__option')) { e.preventDefault(); document.activeElement.click(); }
    }
  });

  /* ── 외부 클릭 닫기 ── */
  document.addEventListener('click', function(e) {
    if (!ddS.contains(e.target)) closeDD(ddS);
    if (!ddM.contains(e.target)) closeDD(ddM);
    if (!ddMenuI.contains(e.target)) closeDD(ddMenuI);
    if (!ddMenuP.contains(e.target)) closeDD(ddMenuP);
    if (!ddG.contains(e.target)) closeDD(ddG);
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.dropdown.dropdown--button. shape·selection·size·state·open 클래스를 root에 조합.
- trigger: button.dropdown__trigger[type="button"][aria-haspopup="listbox"][aria-expanded]
  - 내부: span.dropdown__value (선택값 또는 placeholder) + span.dropdown__chevron (icon-chevron-down)
  - placeholder일 때 dropdown__value--placeholder 추가.
- dropdown--button: 트리거 스타일 기반 클래스. border-radius는 dropdown--pill로 별도 제어.
- dropdown--pill: trigger shape를 pill(radius-pill)로 변경.
- dropdown--ghost: border·background 없는 ghost 스타일. 툴바·인라인 컨텍스트 전용. dropdown--button과 함께 사용. 선택됨 상태에서 브랜드 색 없음 — 값 텍스트가 body color 유지.
- dropdown--multi: button.dropdown__trigger 유지. span.dropdown__value + span.dropdown__count(선택 수, hidden 기본) + chevron 구조.
- dropdown--menu: 체크박스 없는 옵션 스타일. 단일 선택에 주로 사용. dropdown--multi와 함께 사용 불가.
  - 옵션 HTML에서 .dropdown__option-checkbox 제외. 아이콘이 필요하면 span.dropdown__option-icon[aria-hidden="true"] > svg 추가 (선택적).
  - 아이콘 없는 옵션: li.dropdown__option > span.dropdown__option-label 만 포함.
  - 아이콘 있는 옵션: li.dropdown__option > span.dropdown__option-icon[aria-hidden="true"] + span.dropdown__option-label.
  - 선택 상태는 배경색(dropdown__option--selected)만으로 표시 — 체크박스·체크아이콘 없음.
  - 아이콘 있는 메뉴: 트리거에 span.dropdown__trigger-icon[aria-hidden="true"][hidden] 포함. 옵션 선택 시 JS가 해당 아이콘을 복사해 삽입 + hidden 제거.
  - span.dropdown__trigger-icon은 아이콘 없는 메뉴 트리거에는 포함하지 않는다.
- dropdown--open: 패널 표시 + chevron 180도 회전. JS로 토글.
- panel: div.dropdown__panel. 항상 DOM에 존재.
  - dropdown__list: ul[role="listbox"]. multi일 때 aria-multiselectable="true".
  - dropdown__option: li[role="option"][aria-selected][tabindex="-1"].
    - dropdown__option-checkbox: span[aria-hidden="true"] > span.dropdown__option-checkbox__icon > svg icon-check. 항상 DOM에 표시(외곽선). 선택 시 채워짐.
    - dropdown__option-label: span. JS에서 textContent로 트리거 텍스트 갱신에 사용.
    - 비활성: dropdown__option--disabled + aria-disabled="true". tabindex 제거.
    - 선택됨: dropdown__option--selected + aria-selected="true".
- keyboard: Enter/Space → 패널 열기/옵션 선택. ↑↓ → 옵션 이동. Escape → 닫기 + 트리거 포커스.
- disabled: button에 disabled+aria-disabled. root에 dropdown--disabled.
-->

### 트리거

:::preview
<div class="anatomy-grid">
<!-- 기본 (rect + ghost): sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">기본 (rect)</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div style="width:1px;background:var(--color-border-subtle);align-self:stretch;margin:0 4px" aria-hidden="true"></div>
    <div data-component class="dropdown dropdown--button dropdown--ghost dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="정렬 선택">
        <span class="dropdown__value dropdown__value--placeholder">정렬</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--ghost" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="정렬 선택">
        <span class="dropdown__value dropdown__value--placeholder">정렬</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
<!-- 선택됨 (rect + ghost): sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">선택됨 (rect)</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">진행 중</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">진행 중</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div style="width:1px;background:var(--color-border-subtle);align-self:stretch;margin:0 4px" aria-hidden="true"></div>
    <div data-component class="dropdown dropdown--button dropdown--ghost dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="정렬 선택">
        <span class="dropdown__value">오름차순</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--ghost" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="정렬 선택">
        <span class="dropdown__value">오름차순</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
<!-- 기본 (pill): sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">기본 (pill)</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--pill dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--pill" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
<!-- 선택됨 (pill): sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">선택됨 (pill)</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--pill dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">진행 중</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--pill" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">진행 중</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
<!-- 복수 선택됨: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">복수 선택됨</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--pill dropdown--multi dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">상태</span>
        <span class="dropdown__count" aria-hidden="true">2</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--pill dropdown--multi" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">상태</span>
        <span class="dropdown__count" aria-hidden="true">2</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
<!-- 열림: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">열림</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--pill dropdown--sm dropdown--open" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--pill dropdown--open" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
<!-- 에러: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">에러</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--sm dropdown--error" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--error" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
<!-- 비활성: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">비활성</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--sm dropdown--disabled" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택" disabled aria-disabled="true">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--disabled" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택" disabled aria-disabled="true">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
</div>
:::

### 패널

:::preview
<div class="anatomy-grid" style="padding-top:32px;padding-bottom:220px">
<div class="anatomy-row">
  <span class="anatomy-label">단일 선택</span>
  <div class="btn-group" style="align-items:flex-start">
    <div style="width:180px">
      <div data-component class="dropdown dropdown--button dropdown--sm dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="담당자">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-label="담당자">
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">이영희</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">김철수</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">박민준</span></li>
            <li class="dropdown__option dropdown__option--disabled" role="option" aria-selected="false" aria-disabled="true"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">최지은 (휴직)</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown dropdown--button dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="담당자">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-label="담당자">
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">이영희</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">김철수</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">박민준</span></li>
            <li class="dropdown__option dropdown__option--disabled" role="option" aria-selected="false" aria-disabled="true"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">최지은 (휴직)</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="width:140px">
      <div data-component class="dropdown dropdown--button dropdown--ghost dropdown--sm dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="정렬">
          <span class="dropdown__value dropdown__value--placeholder">정렬</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-label="정렬">
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">최신순</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">오름차순</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">내림차순</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="width:140px">
      <div data-component class="dropdown dropdown--button dropdown--ghost dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="정렬">
          <span class="dropdown__value dropdown__value--placeholder">정렬</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-label="정렬">
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">최신순</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">오름차순</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">내림차순</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
:::

:::preview
<div class="anatomy-grid" style="padding-top:32px;padding-bottom:220px">
<div class="anatomy-row">
  <span class="anatomy-label">복수 선택</span>
  <div class="btn-group" style="align-items:flex-start">
    <div data-component class="dropdown dropdown--button dropdown--pill dropdown--multi dropdown--sm dropdown--open">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="상태 선택">
        <span class="dropdown__value">상태</span>
        <span class="dropdown__count" aria-hidden="true">2</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="상태">
          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">진행 중</span></li>
          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">검토 중</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">완료</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">보류</span></li>
        </ul>
      </div>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--pill dropdown--multi dropdown--open">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="상태 선택">
        <span class="dropdown__value">상태</span>
        <span class="dropdown__count" aria-hidden="true">2</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="상태">
          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">진행 중</span></li>
          <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">검토 중</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">완료</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">보류</span></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
:::

:::preview
<div class="anatomy-grid" style="padding-top:32px;padding-bottom:200px">
<div class="anatomy-row">
  <span class="anatomy-label">Menu</span>
  <div class="btn-group" style="align-items:flex-start">
    <div style="min-width:160px">
      <div data-component class="dropdown dropdown--button dropdown--pill dropdown--menu dropdown--sm dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="정렬">
          <span class="dropdown__value dropdown__value--placeholder">정렬</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-label="정렬">
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><span class="dropdown__option-label">오름차순</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-desc"/></svg></span><span class="dropdown__option-label">내림차순</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span><span class="dropdown__option-label">날짜순</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-time"/></svg></span><span class="dropdown__option-label">최신순</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="min-width:160px">
      <div data-component class="dropdown dropdown--button dropdown--pill dropdown--menu dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="정렬">
          <span class="dropdown__value dropdown__value--placeholder">정렬</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-label="정렬">
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-asc"/></svg></span><span class="dropdown__option-label">오름차순</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-sort-desc"/></svg></span><span class="dropdown__option-label">내림차순</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span><span class="dropdown__option-label">날짜순</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-time"/></svg></span><span class="dropdown__option-label">최신순</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Root ── */
.dropdown {
  position: relative;
  display: block;
}

/* ── Trigger — secondary solid 버튼 패턴 ── */
/* root를 inline-block으로 전환 — 버튼처럼 콘텐츠 너비에 맞게 */
.dropdown--button {
  display: inline-block;
}
.dropdown__trigger {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--height-base);
  padding: 0 var(--space-inset-lg);
  gap: var(--space-gap-xs);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
}
/* 기본 (placeholder) */
.dropdown--button .dropdown__value--placeholder { color: var(--color-fill-neutral); }
.dropdown--button .dropdown__chevron { color: var(--color-fill-neutral); margin-left: auto; }
/* value가 flex-grow하지 않도록 — count badge가 바로 옆에 붙게 */
.dropdown--button .dropdown__value { flex: 0 1 auto; }
/* 선택됨 — 라인 브랜드, 배경 브랜드 계열, 텍스트 브랜드 */
.dropdown--button .dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) {
  border-color: var(--color-border-brand-subtle);
  background: var(--color-action-brand-selected);
}
.dropdown--button .dropdown__value:not(.dropdown__value--placeholder) { color: var(--color-text-brand); }
.dropdown--button .dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) .dropdown__chevron {
  color: var(--color-text-brand);
}
/* hover */
.dropdown--button .dropdown__trigger:hover:not(:disabled) {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
/* open */
.dropdown--button.dropdown--open .dropdown__trigger,
.dropdown--button.dropdown--open .dropdown__trigger:hover:not(:disabled) {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
.dropdown__trigger:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Shape: pill ── */
.dropdown--pill .dropdown__trigger { border-radius: var(--radius-pill); }

/* ── Count badge (multi 선택 수) ── */
.dropdown__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--space-16);
  height: var(--space-16);
  padding: 0 var(--space-4);
  border-radius: var(--radius-pill);
  background: var(--color-fill-brand);
  color: var(--color-text-inverse);
  font-family: var(--font-family-base);
  font-size: var(--font-size-meta);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  flex-shrink: 0;
}

/* ── Value (트리거 텍스트) ── */
.dropdown__value {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--color-text-body);
  text-align: left;
}
.dropdown__value--placeholder { color: var(--color-text-subtle); }

/* ── Chevron ── */
.dropdown__chevron {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: var(--icon-sm);
  height: var(--icon-sm);
  color: var(--color-text-subtle);
  transition: transform 0.15s ease;
}
.dropdown__chevron svg { width: 100%; height: 100%; display: block; }
.dropdown--open .dropdown__chevron { transform: rotate(180deg); }

/* ── Panel ── */
.dropdown__panel {
  position: absolute;
  top: calc(100% + var(--space-4));
  left: 0;
  width: max-content;
  min-width: 100%;
  background: var(--color-surface-base);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-dropdown);
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  transform: translateY(calc(-1 * var(--space-4)));
  pointer-events: none;
  /* 닫힐 때: opacity+transform 먼저, visibility는 지연 */
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0s linear 0.15s;
}
.dropdown--open .dropdown__panel {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

/* ── List ── */
/* ul.dropdown__list — 명시도(0,1,1)로 .md ul의 padding-left:24px 오버라이드 */
ul.dropdown__list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 220px;
  overflow-y: auto;
}

/* ── Option ── */
/* li.dropdown__option — 명시도(0,1,1)로 .md li의 margin-bottom:4px 오버라이드 */
li.dropdown__option {
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  height: var(--height-base);
  padding: 0 var(--space-inset-lg);
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
  outline: none;
}
.dropdown__option:hover:not(.dropdown__option--disabled),
.dropdown__option:focus:not(.dropdown__option--disabled) {
  background: var(--color-action-brand-hover);
}
.dropdown__option--selected {
  color: var(--color-text-brand);
  background: var(--color-action-brand-selected);
}
.dropdown__option--selected:hover:not(.dropdown__option--disabled),
.dropdown__option--selected:focus:not(.dropdown__option--disabled) {
  background: var(--color-action-brand-hover);
}
li.dropdown__option--disabled {
  color: var(--color-text-disabled);
  pointer-events: none;
  cursor: default;
}

/* ── Option checkbox (선택 상태 시각 표시 — 항상 표시) ── */
.dropdown__option-checkbox {
  width: var(--icon-sm);
  height: var(--icon-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  flex-shrink: 0;
}
.dropdown__option-checkbox__icon { display: none; }
.dropdown__option-checkbox__icon svg { width: var(--icon-badge); height: var(--icon-badge); display: block; }
.dropdown__option--selected .dropdown__option-checkbox {
  background: var(--color-action-brand-selected);
  border-color: var(--color-border-brand-subtle);
  color: var(--color-fill-brand);
}
.dropdown__option--selected .dropdown__option-checkbox__icon { display: flex; }
.dropdown__option--disabled .dropdown__option-checkbox {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
}

/* ── Menu variant (체크박스 없음) ── */
/* 옵션 HTML에서 .dropdown__option-checkbox 제거. 아이콘은 .dropdown__option-icon으로 선택적 추가 */
.dropdown--menu .dropdown__option-checkbox { display: none; }

/* ── Option icon (menu variant 전용, 선택적) ── */
.dropdown__option-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: var(--icon-sm);
  height: var(--icon-sm);
  color: currentColor;
}
.dropdown__option-icon svg { width: 100%; height: 100%; display: block; }

/* ── Trigger icon (menu + icon 선택 시 트리거에 아이콘 표시) ── */
/* JS가 선택된 옵션의 .dropdown__option-icon 내용을 복사해 삽입. [hidden]으로 초기 숨김 */
.dropdown__trigger-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: var(--icon-sm);
  height: var(--icon-sm);
  color: var(--color-fill-neutral);
}
.dropdown__trigger-icon svg { width: 100%; height: 100%; display: block; }
/* 선택됨 — 트리거가 브랜드 색으로 전환되므로 아이콘도 동일하게 */
.dropdown--button .dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) .dropdown__trigger-icon {
  color: var(--color-text-brand);
}

/* ── Empty state ── */
.dropdown__empty {
  padding: var(--space-inset-squish-lg);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  text-align: center;
}

/* ── Size: sm ── */
.dropdown--sm .dropdown__trigger {
  height: var(--height-compact);
  padding: 0 var(--space-inset-lg);
  font-size: var(--font-size-sm);
}
.dropdown--sm li.dropdown__option {
  height: var(--height-compact);
  padding: 0 var(--space-inset-lg);
  font-size: var(--font-size-sm);
}

/* ── State: error ── */
.dropdown--error .dropdown__trigger { border-color: var(--color-border-error); }
.dropdown--error .dropdown__trigger:hover:not(:disabled) { border-color: var(--color-border-error); }

/* ── State: disabled ── */
.dropdown--disabled .dropdown__trigger {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  pointer-events: none;
  cursor: default;
}
.dropdown--disabled .dropdown__value { color: var(--color-text-disabled); }
.dropdown--disabled .dropdown__chevron { color: var(--color-text-disabled); }

/* ── Appearance: ghost — 툴바·인라인·테이블 헤더 컨텍스트 ── */
/* 선택됨에서도 브랜드 색 없음 — 값 자체가 선택 피드백 */
.dropdown--button.dropdown--ghost .dropdown__trigger {
  border-color: transparent;
  background: transparent;
  box-shadow: none;
}
.dropdown--button.dropdown--ghost .dropdown__value--placeholder { color: var(--color-text-subtle); }
.dropdown--button.dropdown--ghost .dropdown__chevron { color: var(--color-text-subtle); }
.dropdown--button.dropdown--ghost .dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) {
  border-color: transparent;
  background: transparent;
}
/* ghost 선택됨 — 색 피드백 없으므로 굵기로 선택 상태 표시 */
.dropdown--button.dropdown--ghost .dropdown__value:not(.dropdown__value--placeholder) {
  color: var(--color-text-body);
  font-weight: var(--font-weight-semibold);
}
.dropdown--button.dropdown--ghost .dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) .dropdown__chevron {
  color: var(--color-text-subtle);
}
.dropdown--button.dropdown--ghost .dropdown__trigger:hover:not(:disabled) {
  border-color: transparent;
  background: var(--color-action-neutral-hover);
  box-shadow: none;
}
.dropdown--button.dropdown--ghost.dropdown--open .dropdown__trigger,
.dropdown--button.dropdown--ghost.dropdown--open .dropdown__trigger:hover:not(:disabled) {
  border-color: transparent;
  background: var(--color-action-neutral-hover);
  box-shadow: none;
}
```

---

## 접근성

드롭다운 유형 (`accessibility.md` 드롭다운 행 적용).

| 상황 | 마크업 |
|------|--------|
| 트리거 | `<button aria-haspopup="listbox" aria-expanded="false/true">` |
| 패널 (single) | `<ul role="listbox">` |
| 패널 (multi) | `<ul role="listbox" aria-multiselectable="true">` |
| 옵션 | `<li role="option" aria-selected="true/false" tabindex="-1">` |
| 비활성 옵션 | `aria-disabled="true"`. tabindex 생략 |
| 트리거 레이블 | `aria-label` 또는 `aria-labelledby` |
| 에러 연결 | 트리거에 `aria-invalid="true"` + `aria-describedby="[error-id]"` |
| 키보드 | `Enter`/`Space`: 열기·선택. `↑↓`: 옵션 이동. `Escape`: 닫기 + 트리거 포커스 복귀 |
| disabled | button에 `disabled`+`aria-disabled`. root에 `dropdown--disabled` |

```js
// 키보드 핸들러 예시
trigger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') open();
});
panel.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { close(); trigger.focus(); }
  if (e.key === 'ArrowDown') focusNext();
  if (e.key === 'ArrowUp')   focusPrev();
  if (e.key === 'Enter' || e.key === ' ') selectFocused();
});
```

---

## Do / Don't

> ✅ DO — 트리거에 항상 접근 가능한 레이블 제공
> `<button aria-label="담당자 선택">` 또는 외부 레이블과 `aria-labelledby` 연결

> ❌ DON'T — 트리거를 `<div>` 또는 `<span>`으로 구현
> `<button>` 사용. 폼 필드 선택에는 Combobox(`<input role="combobox">`)를 사용한다

> ❌ DON'T — 옵션이 3개 이하일 때 Dropdown 사용
> 모두 항상 보여야 한다면 Radio 그룹을 사용한다. Dropdown은 항목이 많아 공간이 제한될 때 사용한다

> ✅ DO — multi 선택 카운트를 트리거에 표시
> 선택 수 표시: `<span class="dropdown__count" aria-hidden="true">N</span>`

> ✅ DO — `dropdown--menu`는 단일 선택에 사용
> `<div class="dropdown dropdown--button dropdown--menu">` — 버튼 모음·정렬·액션 선택 컨텍스트

> ❌ DON'T — `dropdown--menu`를 `dropdown--multi`와 함께 사용
> 체크박스 없이 복수 선택 상태를 시각화할 수 없다 — 복수 선택에는 checkbox(기본) 사용

> ❌ DON'T — menu variant에서 `.dropdown__option-checkbox`를 HTML에 포함
> menu variant는 checkbox 요소 자체를 제외한다. CSS로 숨기는 대신 HTML에서 아예 빼야 한다

> ✅ DO — `dropdown--ghost`는 주변 콘텐츠에 녹아드는 컨텍스트에 사용
> 툴바·테이블 헤더·인라인 프로퍼티 등 컨트롤이 콘텐츠처럼 보여야 할 때

> ❌ DON'T — 폼 필드 영역에서 `dropdown--ghost` 사용
> 입력 가능한 영역임을 시각적으로 명확히 해야 하는 곳에는 default(border 있음) 사용

> ❌ DON'T — `dropdown--disabled`와 `dropdown--error` 동시 적용
> 비활성 상태에서는 에러를 표시하지 않는다

> ❌ DON'T — 폼 필드에 Dropdown 사용
> 폼 필드 내 선택에는 항상 Combobox를 사용한다. Dropdown은 필터·정렬·액션 컨텍스트 전용이다
