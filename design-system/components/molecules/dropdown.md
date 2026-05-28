---
file: components/molecules/dropdown.md
version: 0.2.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/shadow.md, tokens/z-index.md, tokens/height.md, tokens/typography.md, tokens/icon.md, components/atoms/input.md, components/atoms/button.md, components/atoms/icon.md, components/atoms/tag.md
---

# Dropdown

## 개요

트리거를 클릭하면 옵션 패널이 열리는 선택 컴포넌트. 네이티브 `<select>`를 대체하며 검색·복수 선택을 지원한다.

트리거 스타일은 두 가지다. **Input형**(기본)은 폼 내 단일·복수 선택에 사용하며 FormField(Molecule)와 함께 사용한다. **Button형**(`dropdown--button`)은 필터·정렬 등 액션 컨텍스트에서 ActionGroup 안에 배치한다.

`dropdown--searchable`은 **Input형 전용** 옵션이다. 트리거가 `<button>` 대신 `<input role="combobox">`로 교체되어 트리거 입력란에서 직접 타이핑하면 옵션이 실시간으로 필터링된다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| trigger | input (기본, 클래스 없음) · button → `dropdown--button` | input |
| selection | single (기본, 클래스 없음) · multi → `dropdown--multi` | single |
| size | sm → `dropdown--sm` · md (기본, 클래스 없음) | md |
| searchable | 없음 (기본, 클래스 없음) · 있음 → `dropdown--searchable` (input형 전용) | 없음 |
| state | error → `dropdown--error` · disabled → `dropdown--disabled` | — |
| open | `dropdown--open` (JS 제어) | — |

---

## 사용 지침

### trigger 선택 기준

| 상황 | trigger |
|------|---------|
| 폼 필드 내 선택 | input (기본) — FormField와 함께 사용 |
| 페이지 상단 필터·정렬 | button — ActionGroup 또는 독립 배치 |

### selection 선택 기준

| 상황 | selection |
|------|-----------|
| 옵션 중 하나만 선택 | single (기본) |
| 여러 항목 동시 선택 | multi |

### searchable 추가 기준

다음 중 하나 이상 해당하면 `dropdown--searchable`을 추가한다. input형 전용이며, 트리거 자체가 combobox input으로 전환된다.

| 조건 | 이유 |
|------|------|
| 패널에 스크롤이 발생하는 항목 수 (현재 CSS 기준 6개 초과) | 스캔보다 타이핑이 빠름 |
| 항목이 고유명사·코드류 (사람 이름, 파일명, 태그 등) | 사용자가 이미 항목명을 알고 있어 타이핑이 유리 |
| 멀티 선택 (`dropdown--multi`) | 패널을 오래 열어두며 반복 선택하므로 검색으로 빠른 접근 권장 |

스크롤이 생겨도 항목이 시각적으로 구분 가능하거나(색상·아이콘) 순서가 자명한 경우(날짜 범위·심각도 단계 등)는 검색 없이 사용한다.

### 제약

- 옵션이 3개 이하이고 모두 항상 표시되어야 한다면 Radio 그룹을 사용한다.
- `dropdown--disabled`와 `dropdown--error`는 함께 사용하지 않는다.
- `dropdown--searchable`은 `dropdown--button`과 함께 사용하지 않는다.
- 선택값은 트리거 내부에만 표시한다. 별도 영역에 중복 표시하지 않는다.

---

## 동작

패널 열기/닫기·옵션 선택·검색은 JS로 제어한다.

| 이벤트 | 동작 |
|--------|------|
| 트리거 클릭 (비searchable) | `dropdown--open` 토글. `aria-expanded` 갱신 |
| 트리거 클릭 / 포커스 (searchable) | 패널 열림. 입력값 초기화 → 전체 옵션 표시 |
| 트리거 타이핑 (searchable) | 패널 열림 + 검색어로 옵션 실시간 필터링 |
| 외부 클릭 / blur (searchable, single) | 패널 닫힘. 입력값을 선택된 레이블로 복원 |
| 외부 클릭 / blur (searchable, multi) | 패널 닫힘. 검색 입력값 초기화 (선택된 태그는 유지) |
| 옵션 클릭 (single) | `dropdown__option--selected` 교체 → 트리거 텍스트(또는 입력값) 갱신 → 패널 닫힘 |
| 옵션 클릭 (multi, input형) | `dropdown__option--selected` 토글 → `span.tag.tag--removable` 추가/제거. 패널 유지 |
| 옵션 클릭 (multi, input형 + searchable) | `dropdown__option--selected` 토글 → 태그 추가/제거. 검색어 초기화 + 전체 목록 복원. 패널 유지 |
| 옵션 클릭 (multi, button형) | `dropdown__option--selected` 토글 → 트리거 카운트 갱신. 패널 유지 |
| 태그 × 클릭 (multi, input형) | 해당 태그 제거 + 옵션 선택 해제. 패널 미열림 |
| `Backspace` (searchable, multi) | 검색어가 비어 있을 때 마지막 태그 제거 + 옵션 선택 해제 |
| 검색 결과 없음 | `dropdown__empty` `hidden` 제거 |
| `Escape` | 패널 닫힘. 트리거(또는 입력)에 포커스 복귀 |
| `↑` / `↓` | 패널 내 옵션 포커스 이동 |
| `Enter` / `Space` | 포커스된 옵션 선택 (또는 트리거에서 패널 열기) |

:::preview
<div style="display:flex;gap:var(--space-gap-3xl);align-items:flex-start;flex-wrap:wrap;padding-bottom:260px">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">단일 선택 + 검색 (Input형)</p>
  <div style="width:200px">
    <div class="dropdown dropdown--searchable" id="demo-dd-single">
      <div class="dropdown__trigger">
        <input class="dropdown__input" type="text" role="combobox"
               aria-haspopup="listbox" aria-expanded="false"
               aria-autocomplete="list" aria-controls="dd-single-list"
               placeholder="담당자 선택" />
        <button class="dropdown__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </div>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" id="dd-single-list" aria-label="담당자">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">김철수</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">이영희</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">박민준</span></li>
          <li class="dropdown__option dropdown__option--disabled" role="option" aria-selected="false" aria-disabled="true"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">최지은 (휴직)</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">정수빈</span></li>
        </ul>
        <div class="dropdown__empty" hidden>검색 결과가 없어요.</div>
      </div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">복수 선택 (Input형, 태그)</p>
  <div style="width:220px">
    <div class="dropdown dropdown--multi" id="demo-dd-input-multi">
      <div class="dropdown__trigger" tabindex="0"
           aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
        <span class="dropdown__tags"></span>
        <span class="dropdown__value dropdown__value--placeholder">담당자 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </div>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="담당자">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">김철수</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">이영희</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">박민준</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">정수빈</span></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">복수 선택 + 검색 (Input형)</p>
  <div style="width:220px">
    <div class="dropdown dropdown--multi dropdown--searchable" id="demo-dd-multi-search">
      <div class="dropdown__trigger" tabindex="0">
        <span class="dropdown__tags"></span>
        <input class="dropdown__input" type="text" role="combobox"
               aria-haspopup="listbox" aria-expanded="false"
               aria-autocomplete="list" aria-controls="dd-ms-list"
               placeholder="담당자 선택" />
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </div>
      <div class="dropdown__panel">
        <ul class="dropdown__list" role="listbox" aria-multiselectable="true" id="dd-ms-list" aria-label="담당자">
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">김철수</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">이영희</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">박민준</span></li>
          <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">정수빈</span></li>
        </ul>
        <div class="dropdown__empty" hidden>검색 결과가 없어요.</div>
      </div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">복수 선택 (Button형)</p>
  <div style="width:180px">
    <div class="dropdown dropdown--button dropdown--multi" id="demo-dd-multi">
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

</div>
<script>
(function() {
  function getCtrl(dd) {
    return dd.querySelector('.dropdown__input') ||
           dd.querySelector('button.dropdown__trigger') ||
           dd.querySelector('div.dropdown__trigger');
  }
  function openDD(dd) {
    dd.classList.add('dropdown--open');
    getCtrl(dd).setAttribute('aria-expanded', 'true');
  }
  function closeDD(dd) {
    dd.classList.remove('dropdown--open');
    getCtrl(dd).setAttribute('aria-expanded', 'false');
  }

  /* ── 단일 선택 + 검색 (combobox) ── */
  var ddS    = stage.querySelector('#demo-dd-single');
  var trigS  = ddS.querySelector('.dropdown__trigger');
  var inputS = ddS.querySelector('.dropdown__input');
  var clearS = ddS.querySelector('.dropdown__clear');
  var optsS  = Array.from(ddS.querySelectorAll('.dropdown__option:not(.dropdown__option--disabled)'));
  var emptyS = ddS.querySelector('.dropdown__empty');
  var selectedLabelS = null;

  function filterS(q) {
    var any = false;
    optsS.forEach(function(o) {
      var show = !q || o.querySelector('.dropdown__option-label').textContent.toLowerCase().includes(q);
      o.hidden = !show;
      if (show) any = true;
    });
    emptyS.hidden = any;
  }

  trigS.addEventListener('click', function(e) {
    if (e.target === inputS) return; /* input 클릭은 input 이벤트로 처리 */
    if (!ddS.classList.contains('dropdown--open')) {
      openDD(ddS);
      inputS.value = '';
      inputS.style.width = ''; inputS.style.flex = '';
      filterS('');
      inputS.focus();
    }
  });

  inputS.addEventListener('focus', function() {
    if (!ddS.classList.contains('dropdown--open')) {
      openDD(ddS);
      inputS.value = '';
      inputS.style.width = ''; inputS.style.flex = '';
      filterS('');
    }
  });

  inputS.addEventListener('input', function() {
    if (!ddS.classList.contains('dropdown--open')) openDD(ddS);
    filterS(inputS.value.toLowerCase());
  });

  /* mousedown preventDefault: 옵션 클릭 시 input blur 방지 */
  optsS.forEach(function(opt) {
    opt.addEventListener('mousedown', function(e) { e.preventDefault(); });
    opt.addEventListener('click', function() {
      optsS.forEach(function(o) { o.classList.remove('dropdown__option--selected'); o.setAttribute('aria-selected', 'false'); });
      opt.classList.add('dropdown__option--selected');
      opt.setAttribute('aria-selected', 'true');
      selectedLabelS = opt.querySelector('.dropdown__option-label').textContent;
      inputS.value = selectedLabelS;
      ddS.classList.add('dropdown--has-value');
      closeDD(ddS);
      setInputWidthS();
      inputS.focus();
    });
  });

  function getTextWidthS() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var cs = getComputedStyle(inputS);
    ctx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    return ctx.measureText(inputS.value).width;
  }
  function setInputWidthS() {
    if (selectedLabelS) {
      inputS.style.width = getTextWidthS() + 'px';
      inputS.style.flex = '0 0 auto';
    } else {
      inputS.style.width = '';
      inputS.style.flex = '';
    }
  }

  clearS.addEventListener('mousedown', function(e) { e.preventDefault(); });
  clearS.addEventListener('click', function(e) {
    e.stopPropagation(); /* trigS click 핸들러로 버블링 방지 */
    selectedLabelS = null;
    inputS.value = '';
    inputS.style.width = ''; inputS.style.flex = '';
    ddS.classList.remove('dropdown--has-value');
    optsS.forEach(function(o) {
      o.classList.remove('dropdown__option--selected');
      o.setAttribute('aria-selected', 'false');
    });
    filterS('');
    openDD(ddS);
    inputS.focus();
  });

  inputS.addEventListener('blur', function() {
    setTimeout(function() {
      if (!ddS.contains(document.activeElement)) {
        closeDD(ddS);
        inputS.value = selectedLabelS || '';
        filterS('');
        setInputWidthS();
      }
    }, 150);
  });

  ddS.addEventListener('keydown', function(e) {
    if (!ddS.classList.contains('dropdown--open')) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDD(ddS); filterS(''); inputS.focus(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); closeDD(ddS); inputS.value = selectedLabelS || ''; inputS.focus(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var vis = optsS.filter(function(o) { return !o.hidden; });
      var idx = vis.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, vis.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (vis[idx]) vis[idx].focus();
    } else if (e.key === 'Enter') {
      if (document.activeElement.classList.contains('dropdown__option')) document.activeElement.click();
    }
  });

  /* ── 복수 선택 Input형 (태그) ── */
  var ddIM   = stage.querySelector('#demo-dd-input-multi');
  var trigIM = ddIM.querySelector('.dropdown__trigger');
  var tagsIM = ddIM.querySelector('.dropdown__tags');
  var phIM   = ddIM.querySelector('.dropdown__value');
  var optsIM = Array.from(ddIM.querySelectorAll('.dropdown__option'));

  function updatePhIM() {
    phIM.style.display = tagsIM.children.length ? 'none' : '';
  }
  function addTagIM(label, opt) {
    var tag = document.createElement('span');
    tag.className = 'tag tag--removable';
    tag.dataset.value = label;
    tag.innerHTML = label + '<button class="icon-on--badge icon-on--brand" type="button" aria-label="' + label + ' 제거"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>';
    tag.querySelector('button').addEventListener('click', function(e) {
      e.stopPropagation();
      tag.remove();
      opt.classList.remove('dropdown__option--selected');
      opt.setAttribute('aria-selected', 'false');
      updatePhIM();
    });
    tagsIM.appendChild(tag);
    updatePhIM();
  }
  trigIM.addEventListener('click', function(e) {
    if (e.target.closest('button')) return;
    ddIM.classList.contains('dropdown--open') ? closeDD(ddIM) : openDD(ddIM);
  });
  trigIM.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigIM.click(); }
    if (e.key === 'Escape') { closeDD(ddIM); trigIM.focus(); }
  });
  optsIM.forEach(function(opt) {
    opt.addEventListener('mousedown', function(e) { e.preventDefault(); });
    opt.addEventListener('click', function() {
      var sel = opt.classList.toggle('dropdown__option--selected');
      opt.setAttribute('aria-selected', sel.toString());
      var label = opt.querySelector('.dropdown__option-label').textContent;
      if (sel) {
        addTagIM(label, opt);
      } else {
        var tag = tagsIM.querySelector('[data-value="' + label + '"]');
        if (tag) { tag.remove(); updatePhIM(); }
      }
    });
  });
  ddIM.addEventListener('keydown', function(e) {
    if (!ddIM.classList.contains('dropdown--open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeDD(ddIM); trigIM.focus(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var idx = optsIM.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, optsIM.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (optsIM[idx]) optsIM[idx].focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (document.activeElement.classList.contains('dropdown__option')) { e.preventDefault(); document.activeElement.click(); }
    }
  });

  /* ── 복수 선택 Input형 + 검색 (combobox) ── */
  var ddMS    = stage.querySelector('#demo-dd-multi-search');
  var trigMS  = ddMS.querySelector('.dropdown__trigger');
  var tagsMS  = ddMS.querySelector('.dropdown__tags');
  var inputMS = ddMS.querySelector('.dropdown__input');
  var optsMS  = Array.from(ddMS.querySelectorAll('.dropdown__option'));
  var emptyMS = ddMS.querySelector('.dropdown__empty');

  function filterMS(q) {
    var any = false;
    optsMS.forEach(function(o) {
      var show = !q || o.querySelector('.dropdown__option-label').textContent.toLowerCase().includes(q);
      o.hidden = !show;
      if (show) any = true;
    });
    emptyMS.hidden = any;
  }
  function addTagMS(label, opt) {
    var tag = document.createElement('span');
    tag.className = 'tag tag--removable';
    tag.dataset.value = label;
    tag.innerHTML = label + '<button class="icon-on--badge icon-on--brand" type="button" aria-label="' + label + ' 제거"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>';
    tag.querySelector('button').addEventListener('click', function(e) {
      e.stopPropagation();
      tag.remove();
      opt.classList.remove('dropdown__option--selected');
      opt.setAttribute('aria-selected', 'false');
    });
    tagsMS.appendChild(tag);
  }

  trigMS.addEventListener('click', function(e) {
    if (e.target.closest('button')) return; /* 태그 제거 버튼 클릭 무시 */
    if (!ddMS.classList.contains('dropdown--open')) {
      openDD(ddMS);
      filterMS('');
    }
    inputMS.focus();
  });
  inputMS.addEventListener('focus', function() {
    if (!ddMS.classList.contains('dropdown--open')) { openDD(ddMS); filterMS(''); }
  });
  inputMS.addEventListener('input', function() {
    if (!ddMS.classList.contains('dropdown--open')) openDD(ddMS);
    filterMS(inputMS.value.toLowerCase());
  });
  optsMS.forEach(function(opt) {
    opt.addEventListener('mousedown', function(e) { e.preventDefault(); });
    opt.addEventListener('click', function() {
      var sel = opt.classList.toggle('dropdown__option--selected');
      opt.setAttribute('aria-selected', sel.toString());
      var label = opt.querySelector('.dropdown__option-label').textContent;
      if (sel) {
        addTagMS(label, opt);
      } else {
        var tag = tagsMS.querySelector('[data-value="' + label + '"]');
        if (tag) tag.remove();
      }
      inputMS.value = '';
      filterMS('');
      inputMS.focus();
    });
  });
  inputMS.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace' && inputMS.value === '') {
      /* 검색어 없을 때 마지막 태그 제거 */
      var lastTag = tagsMS.lastElementChild;
      if (lastTag) {
        var val = lastTag.dataset.value;
        lastTag.remove();
        var opt = optsMS.find(function(o) { return o.querySelector('.dropdown__option-label').textContent === val; });
        if (opt) { opt.classList.remove('dropdown__option--selected'); opt.setAttribute('aria-selected', 'false'); }
      }
    }
  });
  ddMS.addEventListener('keydown', function(e) {
    if (!ddMS.classList.contains('dropdown--open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeDD(ddMS); inputMS.value = ''; inputMS.focus(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var vis = optsMS.filter(function(o) { return !o.hidden; });
      var idx = vis.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, vis.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (vis[idx]) vis[idx].focus();
    } else if (e.key === 'Enter') {
      if (document.activeElement.classList.contains('dropdown__option')) { e.preventDefault(); document.activeElement.click(); }
    }
  });
  inputMS.addEventListener('blur', function() {
    setTimeout(function() {
      if (!ddMS.contains(document.activeElement)) { closeDD(ddMS); inputMS.value = ''; filterMS(''); }
    }, 150);
  });

  /* ── 복수 선택 Button형 ── */
  var ddM    = stage.querySelector('#demo-dd-multi');
  var trigM  = ddM.querySelector('.dropdown__trigger');
  var valM   = ddM.querySelector('.dropdown__value');
  var cntM   = ddM.querySelector('.dropdown__count');
  var optsM  = Array.from(ddM.querySelectorAll('.dropdown__option'));

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
    ddM.classList.contains('dropdown--open') ? closeDD(ddM) : openDD(ddM);
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

  /* ── 외부 클릭 닫기 ── */
  document.addEventListener('click', function(e) {
    if (!ddIM.contains(e.target)) closeDD(ddIM);
    if (!ddMS.contains(e.target)) closeDD(ddMS);
    if (!ddM.contains(e.target)) closeDD(ddM);
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.dropdown. trigger·selection·size·searchable·state·open 클래스를 root에 조합.
- trigger 구조는 searchable 여부에 따라 달라진다:
  - 비searchable (input형·button형): button.dropdown__trigger[type="button"][aria-haspopup="listbox"][aria-expanded]
    - 내부: span.dropdown__value (선택값 또는 placeholder) + span.dropdown__chevron (icon-chevron-down)
    - placeholder일 때 dropdown__value--placeholder 추가.
  - searchable (input형 전용): div.dropdown__trigger (시각적 래퍼)
    - 내부: input.dropdown__input[type="text"][role="combobox"][aria-haspopup="listbox"][aria-expanded][aria-autocomplete="list"][aria-controls="listbox-id"] + span.dropdown__chevron
    - placeholder는 input의 placeholder 속성. 선택 시 input.value에 레이블 기입.
    - aria-expanded는 button이 아닌 input에 설정.
- dropdown--button: button형 trigger. border-radius-pill + fill-neutral 스타일. searchable과 함께 사용 불가.
- dropdown--multi (input형): trigger가 div로 바뀜. 내부에 span.dropdown__tags(flex 래퍼) + span.dropdown__value(placeholder) + span.dropdown__chevron.
  - 선택 시 span.tag.tag--removable을 dropdown__tags에 추가. tag--removable 안 button.icon-on--badge에 aria-label="[레이블] 제거" 필수.
  - button 요소를 trigger 내에 포함해야 하므로 button.dropdown__trigger 사용 불가 — div + tabindex="0".
  - 태그 × 버튼 click에 e.stopPropagation() — trigger click 핸들러로 버블링 방지.
  - 옵션 mousedown에 preventDefault — 태그 제거 클릭 시 패널 닫힘 방지.
- dropdown--multi.dropdown--searchable (input형): dropdown__value 없음. 대신 span.dropdown__tags + input.dropdown__input[role="combobox"] + span.dropdown__chevron.
  - dropdown__tags는 선택된 태그를 포함. 비어있으면 display:none(CSS)으로 숨겨지고 input이 flex:1로 좌측 정렬.
  - aria-expanded·aria-autocomplete·aria-controls는 input에만 설정 — trigger div에 aria-* 불필요.
  - 옵션 선택 시 검색어 초기화 + filterMS('') 호출로 전체 목록 복원. 패널 유지.
  - Backspace(입력값 비어있을 때) → 마지막 태그 제거.
  - blur 시 검색어 초기화 (단일 searchable과 달리 선택값 복원 없음).
- dropdown--multi (button형): button.dropdown__trigger 유지. span.dropdown__value + span.dropdown__count(선택 수) + chevron 구조.
- dropdown--open: 패널 표시 + chevron 180도 회전. JS로 토글.
- panel: div.dropdown__panel. root에 dropdown--open 추가 시 표시. 항상 DOM에 존재.
  - searchable일 때 panel 안에 별도 검색 input 없음 — 트리거 input이 검색창 역할.
  - dropdown__list: ul[role="listbox"]. multi일 때 aria-multiselectable="true".
  - dropdown__option: li[role="option"][aria-selected][tabindex="-1"].
    - dropdown__option-checkbox: span[aria-hidden="true"] > span.dropdown__option-checkbox__icon > svg icon-check. 항상 DOM에 표시(체크박스 외곽선). 선택 시 채워짐.
    - dropdown__option-label: span. JS에서 textContent로 트리거 입력값 갱신에 사용.
    - 비활성: dropdown__option--disabled + aria-disabled="true". tabindex 제거.
    - 선택됨: dropdown__option--selected + aria-selected="true".
  - dropdown__empty: div[hidden]. 검색 결과 없을 때 hidden 제거.
- keyboard: Enter/Space → 패널 열기/옵션 선택. ↑↓ → 옵션 이동. Escape → 닫기 + 트리거(또는 input) 포커스.
- searchable 옵션 mousedown에 preventDefault — blur 발생 전 click을 처리하기 위한 필수 패턴.
- disabled: 비searchable은 button에 disabled+aria-disabled. searchable은 input에 disabled+aria-disabled. root에 dropdown--disabled.
-->

### 트리거 — Input형

:::preview
<div class="anatomy-grid">
<!-- 기본 (placeholder): sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">기본</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
  </div>
</div>
<!-- 선택됨: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">선택됨</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
          <span class="dropdown__value">김철수</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택">
          <span class="dropdown__value">김철수</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
  </div>
</div>
<!-- 검색 가능 (combobox): sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">검색 가능</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm dropdown--searchable">
        <div class="dropdown__trigger">
          <input class="dropdown__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false"
                 aria-autocomplete="list" aria-controls="anat-sm-list-s"
                 placeholder="선택하세요" />
          <button class="dropdown__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown dropdown--searchable">
        <div class="dropdown__trigger">
          <input class="dropdown__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false"
                 aria-autocomplete="list" aria-controls="anat-md-list-s"
                 placeholder="선택하세요" />
          <button class="dropdown__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- 검색 가능 — 선택됨: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">검색 가능 — 선택됨</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm dropdown--searchable dropdown--has-value">
        <div class="dropdown__trigger">
          <input class="dropdown__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false"
                 aria-autocomplete="list" aria-controls="anat-sm-list-sv"
                 value="이영희" />
          <button class="dropdown__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown dropdown--searchable dropdown--has-value">
        <div class="dropdown__trigger">
          <input class="dropdown__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false"
                 aria-autocomplete="list" aria-controls="anat-md-list-sv"
                 value="이영희" />
          <button class="dropdown__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- 복수 선택 + 검색 — 기본 / 태그 있음 -->
<div class="anatomy-row">
  <span class="anatomy-label">복수 + 검색</span>
  <div class="btn-group">
    <div style="width:200px">
      <div data-component class="dropdown dropdown--multi dropdown--searchable">
        <div class="dropdown__trigger" tabindex="0">
          <span class="dropdown__tags"></span>
          <input class="dropdown__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false"
                 aria-autocomplete="list" aria-controls="anat-ms-list"
                 placeholder="담당자 선택" />
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
    <div style="width:240px">
      <div data-component class="dropdown dropdown--multi dropdown--searchable">
        <div class="dropdown__trigger" tabindex="0">
          <span class="dropdown__tags" id="anat-ms-tags">
            <span class="tag tag--removable">이영희<button class="icon-on--badge icon-on--brand" type="button" aria-label="이영희 제거"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button></span>
            <span class="tag tag--removable">박민준<button class="icon-on--badge icon-on--brand" type="button" aria-label="박민준 제거"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button></span>
          </span>
          <input class="dropdown__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false"
                 aria-autocomplete="list" aria-controls="anat-ms-list2"
                 placeholder="" />
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- 에러: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">에러</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm dropdown--error">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택" aria-invalid="true">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown dropdown--error">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택" aria-invalid="true">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
  </div>
</div>
<!-- 비활성: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">비활성</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="dropdown dropdown--sm dropdown--disabled">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택" disabled aria-disabled="true">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="dropdown dropdown--disabled">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="담당자 선택" disabled aria-disabled="true">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
      </div>
    </div>
  </div>
</div>
</div>
<script>
(function() {
  /* 선택됨 상태의 combobox input 너비를 실제 텍스트 너비에 맞게 설정.
     flex gap(--space-gap-xs)이 clear button과의 유일한 간격이 되도록 input은 정확한 텍스트 너비를 가져야 한다. */
  stage.querySelectorAll('.dropdown--has-value .dropdown__input').forEach(function(input) {
    if (!input.value) return;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var cs = getComputedStyle(input);
    ctx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    input.style.width = Math.ceil(ctx.measureText(input.value).width) + 'px';
    input.style.flex = '0 0 auto';
  });
})();
</script>
:::

### 트리거 — Button형

:::preview
<div class="anatomy-grid">
<!-- 기본: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">기본</span>
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
  </div>
</div>
<!-- 선택됨: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">선택됨</span>
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
  </div>
</div>
<!-- 복수 선택됨: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">복수 선택됨</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--multi dropdown--sm" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">상태</span>
        <span class="dropdown__count" aria-hidden="true">2</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--multi" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
        <span class="dropdown__value">상태</span>
        <span class="dropdown__count" aria-hidden="true">2</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
<!-- 열림 (pressed): sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">열림</span>
  <div class="btn-group">
    <div data-component class="dropdown dropdown--button dropdown--sm dropdown--open" style="width:120px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
    <div data-component class="dropdown dropdown--button dropdown--open" style="width:140px">
      <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="상태 선택">
        <span class="dropdown__value dropdown__value--placeholder">상태 선택</span>
        <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
    </div>
  </div>
</div>
</div>
:::

### 패널 — 단일 선택

:::preview
<div class="anatomy-grid" style="padding-bottom:220px">
<!-- 기본: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">기본</span>
  <div class="btn-group" style="align-items:flex-start">
    <div style="width:160px">
      <div data-component class="dropdown dropdown--sm dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="담당자">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-label="담당자">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">김철수</span></li>
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">이영희</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">박민준</span></li>
            <li class="dropdown__option dropdown__option--disabled" role="option" aria-selected="false" aria-disabled="true"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">최지은 (휴직)</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="width:200px">
      <div data-component class="dropdown dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="담당자">
          <span class="dropdown__value dropdown__value--placeholder">선택하세요</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-label="담당자">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">김철수</span></li>
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">이영희</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">박민준</span></li>
            <li class="dropdown__option dropdown__option--disabled" role="option" aria-selected="false" aria-disabled="true"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">최지은 (휴직)</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- 검색 (combobox): sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">검색</span>
  <div class="btn-group" style="align-items:flex-start">
    <div style="width:160px">
      <div data-component class="dropdown dropdown--sm dropdown--open dropdown--searchable">
        <div class="dropdown__trigger">
          <input class="dropdown__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="true"
                 aria-autocomplete="list" aria-controls="p-sm-search"
                 placeholder="검색" value="이" />
          <button class="dropdown__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" id="p-sm-search" aria-label="담당자">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">이영희</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="width:200px">
      <div data-component class="dropdown dropdown--open dropdown--searchable">
        <div class="dropdown__trigger">
          <input class="dropdown__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="true"
                 aria-autocomplete="list" aria-controls="p-md-search"
                 placeholder="검색" value="이" />
          <button class="dropdown__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" id="p-md-search" aria-label="담당자">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">이영희</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
:::

### 패널 — 복수 선택

:::preview
<div class="anatomy-grid" style="padding-bottom:200px">
<!-- 복수 선택: sm / md -->
<div class="anatomy-row">
  <span class="anatomy-label">복수 선택</span>
  <div class="btn-group" style="align-items:flex-start">
    <div style="width:160px">
      <div data-component class="dropdown dropdown--multi dropdown--sm dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="상태 선택">
          <span class="dropdown__value">2개 선택</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="상태">
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">진행 중</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">완료</span></li>
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">검토 중</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">보류</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="width:200px">
      <div data-component class="dropdown dropdown--multi dropdown--open">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="true" aria-label="상태 선택">
          <span class="dropdown__value">2개 선택</span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="상태">
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="0"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">진행 중</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">완료</span></li>
            <li class="dropdown__option dropdown__option--selected" role="option" aria-selected="true" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">검토 중</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">보류</span></li>
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

/* ── Trigger: Input형 (기본, 비searchable) ── */
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
.dropdown__trigger:hover:not(:disabled) {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
/* 선택됨 — 브랜드 테두리 + 글자색 */
.dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) {
  border-color: var(--color-border-brand);
}
.dropdown__trigger:has(.dropdown__value:not(.dropdown__value--placeholder)) .dropdown__value {
  color: var(--color-text-brand);
}
/* searchable 선택됨 — dropdown--has-value 클래스로 제어 */
.dropdown--has-value.dropdown--searchable .dropdown__trigger {
  border-color: var(--color-border-brand);
}
.dropdown--has-value .dropdown__input {
  color: var(--color-text-brand);
}
.dropdown--open .dropdown__trigger {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
.dropdown__trigger:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Trigger: Button형 — secondary solid 버튼 패턴 적용 ── */
/* root를 inline-block으로 전환 — 버튼처럼 콘텐츠 너비에 맞게 */
.dropdown--button {
  display: inline-block;
}
.dropdown--button .dropdown__trigger {
  border-radius: var(--radius-pill);
  background: var(--color-surface-base);
  border-color: var(--color-border-default);   /* 기본: 그레이 라인 */
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
/* hover — open 상태와 동일한 브랜드 스타일 */
.dropdown--button .dropdown__trigger:hover:not(:disabled) {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
/* open — hover 스타일 유지 (input형 hover와 동일) */
.dropdown--button.dropdown--open .dropdown__trigger,
.dropdown--button.dropdown--open .dropdown__trigger:hover:not(:disabled) {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}

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

/* ── Trigger: Searchable (combobox) — div 래퍼 + input ── */
/* button 대신 div를 래퍼로 사용. focus ring은 :focus-within으로 처리 */
.dropdown--searchable .dropdown__trigger {
  cursor: text;
}
.dropdown--searchable .dropdown__trigger:hover {
  border-color: var(--color-border-brand-subtle);
}
.dropdown--open.dropdown--searchable .dropdown__trigger {
  border-color: var(--color-border-brand-subtle);
}
.dropdown--searchable .dropdown__trigger:focus-within {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
  border-color: var(--color-border-brand-subtle);
}

.dropdown__input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
  padding: 0;
}
.dropdown__input::placeholder { color: var(--color-text-subtle); }

/* ── Clear button (searchable 선택 해제) — icon-on--badge 스타일 공유 ── */
/* flex 아이템으로 배치. input 너비를 JS로 텍스트 너비에 맞게 줄여 바로 옆에 위치 */
.dropdown__clear {
  display: none;
  flex-shrink: 0;
  color: var(--color-text-subtle);
  border: none;
  background: none;
  cursor: pointer;
}
.dropdown--has-value .dropdown__clear { display: inline-flex; }
/* 패널 열린 상태에서는 숨김 — placeholder 겹침 방지 */
.dropdown--open .dropdown__clear { display: none; }
/* 선택됨 + 닫힌 상태: chevron을 오른쪽 끝으로 밀기 */
.dropdown--searchable.dropdown--has-value:not(.dropdown--open) .dropdown__chevron { margin-left: auto; }

/* ── Value (비searchable 트리거 텍스트) ── */
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
  padding: var(--space-inset-xs) 0;
  max-height: 220px;
  overflow-y: auto;
}

/* ── Option ── */
.dropdown__option {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  height: var(--height-base);
  padding: 0 var(--space-inset-lg) 0 var(--space-inset-sm);
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
  outline: none;
}
.dropdown__option:hover:not(.dropdown__option--disabled),
.dropdown__option:focus:not(.dropdown__option--disabled) {
  background: var(--color-action-neutral-hover);
}
.dropdown__option--selected {
  color: var(--color-text-brand);
  background: var(--color-action-brand-selected);
}
.dropdown__option--selected:hover:not(.dropdown__option--disabled),
.dropdown__option--selected:focus:not(.dropdown__option--disabled) {
  background: var(--color-action-brand-hover);
}
.dropdown__option--disabled {
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
  border-color: var(--color-border-brand);
  color: var(--color-fill-brand);
}
.dropdown__option--selected .dropdown__option-checkbox__icon { display: flex; }
.dropdown__option--disabled .dropdown__option-checkbox {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
}

/* ── Multi: Input형 — 태그 트리거 ── */
/* height: auto + min-height으로 태그 줄바꿈 허용.
   가로 padding은 싱글 트리거(--space-inset-lg)와 동일하게 유지 */
.dropdown--multi:not(.dropdown--button) .dropdown__trigger {
  height: auto;
  min-height: var(--height-base);
  padding: var(--space-gap-xs) var(--space-inset-lg);
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;
}
/* 태그 래퍼: flex:1로 chevron을 오른쪽에 고정.
   태그 없을 땐 display:none — placeholder가 flex:1로 왼쪽 정렬되도록 */
.dropdown__tags {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-gap-xs);
  align-items: center;
  min-width: 0;
}
.dropdown__tags:empty { display: none; }
/* multi + searchable: tags는 내용물 너비만 차지 — input이 남은 공간을 점유 */
.dropdown--multi.dropdown--searchable .dropdown__tags { flex: 0 1 auto; }
.dropdown--multi.dropdown--searchable .dropdown__input { min-width: 60px; }

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
.dropdown--sm .dropdown__input { font-size: var(--font-size-sm); }
.dropdown--sm .dropdown__option {
  height: var(--height-compact);
  padding: 0 var(--space-inset-lg) 0 var(--space-inset-sm);
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
.dropdown--disabled .dropdown__input { color: var(--color-text-disabled); }
.dropdown--disabled .dropdown__chevron { color: var(--color-text-disabled); }
```

---

## 접근성

드롭다운·컴보박스 유형 (`accessibility.md` 드롭다운 행 적용).

| 상황 | 마크업 |
|------|--------|
| 트리거 (비searchable) | `<button aria-haspopup="listbox" aria-expanded="false/true">` |
| 트리거 (searchable) | `<input role="combobox" aria-haspopup="listbox" aria-expanded aria-autocomplete="list" aria-controls="listbox-id">` |
| 패널 (single) | `<ul role="listbox">` |
| 패널 (multi) | `<ul role="listbox" aria-multiselectable="true">` |
| 옵션 | `<li role="option" aria-selected="true/false" tabindex="-1">` |
| 비활성 옵션 | `aria-disabled="true"`. tabindex 생략 |
| 트리거 레이블 | 비searchable: `aria-label` 또는 `aria-labelledby`. searchable: `aria-label` 또는 연결된 `<label for>` |
| 에러 연결 | 트리거에 `aria-invalid="true"` + `aria-describedby="[error-id]"` |
| 키보드 | `Enter`/`Space`: 열기·선택. `↑↓`: 옵션 이동. `Escape`: 닫기 + 트리거 포커스 복귀 |
| disabled | 비searchable: button에 `disabled`+`aria-disabled`. searchable: input에 `disabled`+`aria-disabled`. root에 `dropdown--disabled` |

```js
// 키보드 핸들러 예시 (panel 내부)
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

> ❌ DON'T — 트리거를 `<div>` 또는 `<span>`으로 구현 (비searchable)
> 비searchable은 `<button>` 사용. searchable은 `<input role="combobox">` 사용

> ✅ DO — 검색 결과가 없으면 빈 상태 텍스트 표시
> `<div class="dropdown__empty">검색 결과가 없어요.</div>` — `hidden` 제거로 표시

> ❌ DON'T — 옵션이 3개 이하일 때 Dropdown 사용
> 모두 항상 보여야 한다면 Radio 그룹을 사용한다. Dropdown은 항목이 많아 공간이 제한될 때 사용한다

> ✅ DO — multi 선택 카운트를 트리거에 표시
> 1개 선택: 해당 레이블. 2개 이상: "N개 선택"

> ❌ DON'T — `dropdown--searchable`을 `dropdown--button`과 함께 사용
> searchable은 input형 전용이다. button형에는 검색 기능을 추가하지 않는다

> ❌ DON'T — `dropdown--disabled`와 `dropdown--error` 동시 적용
> 비활성 상태에서는 에러를 표시하지 않는다
