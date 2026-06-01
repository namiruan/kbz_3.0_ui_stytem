---
file: components/molecules/combobox.md
version: 0.2.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/shadow.md, tokens/z-index.md, tokens/height.md, tokens/typography.md, tokens/icon.md, components/atoms/input.md, components/atoms/icon.md, components/atoms/tag.md
---

# Combobox

## 개요

검색·입력과 선택을 결합한 목록 선택기. 트리거는 `<input role="combobox">`로, 타이핑하면 목록이 실시간으로 필터링된다. **폼 필드 내 단일·복수 선택에 항상 사용한다** — 검색이 필요 없는 폼 필드에도 Combobox를 사용한다(사용자는 input 요소에서 타이핑을 기대한다).

Dropdown과의 구별 — Combobox는 `<input>`이 트리거이므로 검색이 기본 동작이다. 필터·정렬·액션 컨텍스트에서 검색이 필요 없으면 Dropdown(`dropdown--button`)을 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| shape | rect (기본, 클래스 없음) · pill → `combobox--pill` | rect |
| selection | single (기본, 클래스 없음) · multi → `combobox--multi` | single |
| size | sm → `combobox--sm` · md (기본, 클래스 없음) | md |
| state | error → `combobox--error` · disabled → `combobox--disabled` | — |
| open | `combobox--open` (JS 제어) | — |

선택값이 있을 때 `combobox--has-value`가 추가된다 (single). clear 버튼 표시 여부를 CSS로 제어하는 데 사용한다.

---

## 사용 지침

### selection 선택 기준

| 상황 | selection |
|------|-----------|
| 옵션 중 하나만 선택 | single (기본) |
| 여러 항목 동시 선택 | multi — 선택된 값은 태그로 표시 |

### 제약

- `combobox--disabled`와 `combobox--error`는 함께 사용하지 않는다.
- 선택값은 트리거 내부에만 표시한다. 별도 영역에 중복 표시하지 않는다.
- 옵션이 3개 이하이고 검색이 필요 없으며 항상 표시되어야 한다면 Radio 그룹을 사용한다.
- `combobox--multi`는 내부에 `<button>` 요소(태그 제거 버튼)를 포함하므로 트리거를 `<div tabindex="0">`으로 사용한다 — button 내 button 불가.

---

## 동작

| 이벤트 | 동작 |
|--------|------|
| 트리거 클릭 / input focus (single) | 패널 열림. input value 초기화 → 전체 옵션 표시. **선택된 옵션 패널 상단 정렬** |
| 트리거 클릭 / input focus (multi) | 패널 열림. 태그 숨김 · 검색 input 표시. **선택된 옵션 패널 상단 정렬** |
| 타이핑 | 패널 열림 + 검색어로 옵션 실시간 필터링. 결과 없음 시 `combobox__empty` 표시 |
| 외부 클릭 / blur (single) | 패널 닫힘. input value를 선택된 레이블로 복원 (선택 없으면 빈 값) |
| 외부 클릭 / blur (multi) | 패널 닫힘. 검색 input 초기화 (선택된 태그는 유지) |
| 옵션 클릭 (single) | `combobox__option--selected` 교체 → input value 갱신 → `combobox--has-value` 추가 → 패널 닫힘 |
| 옵션 클릭 (multi) | `combobox__option--selected` 토글 → `span.tag.tag--removable` 추가/제거. 검색어 초기화. 패널 유지 |
| 태그 × 클릭 (multi) | 해당 태그 제거 + 옵션 선택 해제. 패널 미열림 |
| `Backspace` (multi, 검색어 비어있을 때) | 마지막 태그 제거 + 옵션 선택 해제 |
| clear 클릭 (single) | 선택 초기화, input value 비움, `combobox--has-value` 제거, 전체 옵션 표시, 패널 열림 |
| `Escape` | 패널 닫힘. input value를 선택된 레이블로 복원 (multi: 검색어 초기화) |
| `↑` / `↓` | 패널 내 옵션 포커스 이동 |
| `Enter` (옵션 포커스 시) | 옵션 선택 |

옵션 클릭 시 blur 발생 전에 선택해야 하므로 `mousedown` + `e.preventDefault()` 패턴을 반드시 사용한다.

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xl);padding-bottom:200px">

<div>
<p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm);font-weight:var(--font-weight-semibold)">단일 선택 + 검색</p>
<div style="width:220px">
  <div class="combobox" id="demo-cb-single">
    <div class="combobox__trigger">
      <input class="combobox__input" type="text"
             role="combobox" aria-haspopup="listbox" aria-expanded="false"
             aria-autocomplete="list" aria-controls="demo-cb-single-list"
             placeholder="담당자 검색" />
      <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
      <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
    </div>
    <div class="combobox__panel">
      <ul class="combobox__list" role="listbox" id="demo-cb-single-list" aria-label="담당자">
        <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">김철수</span></li>
        <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">이영희</span></li>
        <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">박민준</span></li>
        <li class="combobox__option combobox__option--disabled" role="option" aria-selected="false" aria-disabled="true"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">최지은 (휴직)</span></li>
        <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">정수빈</span></li>
      </ul>
      <div class="combobox__empty" hidden>검색 결과가 없어요.</div>
    </div>
  </div>
</div>
</div>

<div>
<p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm);font-weight:var(--font-weight-semibold)">복수 선택 + 검색</p>
<div style="width:240px">
  <div class="combobox combobox--multi" id="demo-cb-multi">
    <div class="combobox__trigger" tabindex="0">
      <span class="combobox__tags"></span>
      <input class="combobox__input" type="text"
             role="combobox" aria-haspopup="listbox" aria-expanded="false"
             aria-autocomplete="list" aria-controls="demo-cb-multi-list"
             placeholder="담당자 선택" />
      <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
    </div>
    <div class="combobox__panel">
      <ul class="combobox__list" role="listbox" aria-multiselectable="true" id="demo-cb-multi-list" aria-label="담당자">
        <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">김철수</span></li>
        <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">이영희</span></li>
        <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">박민준</span></li>
        <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">정수빈</span></li>
      </ul>
      <div class="combobox__empty" hidden>검색 결과가 없어요.</div>
    </div>
  </div>
</div>
</div>

</div><!-- /column wrapper -->
<script>
(function() {
  /* 선택된 옵션을 목록 상단으로 정렬 */
  function sortOpts(cb) {
    var list = cb.querySelector('.combobox__list');
    if (!list) return;
    Array.from(list.querySelectorAll('.combobox__option'))
      .sort(function(a, b) {
        return (a.classList.contains('combobox__option--selected') ? 0 : 1) -
               (b.classList.contains('combobox__option--selected') ? 0 : 1);
      }).forEach(function(o) { list.appendChild(o); });
  }
  function openCB(cb) {
    cb.classList.add('combobox--open');
    var input = cb.querySelector('.combobox__input');
    if (input) input.setAttribute('aria-expanded', 'true');
  }
  function closeCB(cb) {
    cb.classList.remove('combobox--open');
    var input = cb.querySelector('.combobox__input');
    if (input) input.setAttribute('aria-expanded', 'false');
  }

  /* ── 단일 선택 + 검색 ── */
  var cbS    = stage.querySelector('#demo-cb-single');
  var trigS  = cbS.querySelector('.combobox__trigger');
  var inputS = cbS.querySelector('.combobox__input');
  var clearS = cbS.querySelector('.combobox__clear');
  var optsS  = Array.from(cbS.querySelectorAll('.combobox__option'));
  var emptyS = cbS.querySelector('.combobox__empty');
  var selectedLabelS = null;

  function filterS(q) {
    var any = false;
    optsS.forEach(function(o) {
      var show = !q || o.querySelector('.combobox__option-label').textContent.toLowerCase().includes(q);
      o.hidden = !show;
      if (show) any = true;
    });
    emptyS.hidden = any;
  }

  trigS.addEventListener('click', function(e) {
    if (e.target === inputS) return;
    if (!cbS.classList.contains('combobox--open')) {
      sortOpts(cbS); openCB(cbS);
      inputS.value = ''; inputS.style.width = ''; inputS.style.flex = '';
      filterS(''); inputS.focus();
    }
  });
  inputS.addEventListener('focus', function() {
    if (!cbS.classList.contains('combobox--open')) {
      sortOpts(cbS); openCB(cbS);
      inputS.value = ''; inputS.style.width = ''; inputS.style.flex = '';
      filterS('');
    }
  });
  inputS.addEventListener('input', function() {
    if (!cbS.classList.contains('combobox--open')) openCB(cbS);
    inputS.style.width = ''; inputS.style.flex = '';
    filterS(inputS.value.toLowerCase());
  });

  optsS.forEach(function(opt) {
    opt.addEventListener('mousedown', function(e) { e.preventDefault(); });
    opt.addEventListener('click', function() {
      if (opt.classList.contains('combobox__option--disabled')) return;
      optsS.forEach(function(o) { o.classList.remove('combobox__option--selected'); o.setAttribute('aria-selected', 'false'); });
      opt.classList.add('combobox__option--selected');
      opt.setAttribute('aria-selected', 'true');
      selectedLabelS = opt.querySelector('.combobox__option-label').textContent;
      inputS.value = selectedLabelS;
      cbS.classList.add('combobox--has-value');
      closeCB(cbS);
      setInputWidthS(); inputS.focus();
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
      inputS.style.width = Math.ceil(getTextWidthS()) + 'px';
      inputS.style.flex = '0 0 auto';
    } else {
      inputS.style.width = ''; inputS.style.flex = '';
    }
  }

  clearS.addEventListener('mousedown', function(e) { e.preventDefault(); });
  clearS.addEventListener('click', function(e) {
    e.stopPropagation();
    selectedLabelS = null;
    inputS.value = ''; inputS.style.width = ''; inputS.style.flex = '';
    cbS.classList.remove('combobox--has-value');
    optsS.forEach(function(o) { o.classList.remove('combobox__option--selected'); o.setAttribute('aria-selected', 'false'); });
    filterS(''); openCB(cbS); inputS.focus();
  });

  inputS.addEventListener('blur', function() {
    setTimeout(function() {
      if (!cbS.contains(document.activeElement)) {
        closeCB(cbS);
        inputS.value = selectedLabelS || '';
        filterS(''); setInputWidthS();
      }
    }, 150);
  });

  cbS.addEventListener('keydown', function(e) {
    if (!cbS.classList.contains('combobox--open')) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCB(cbS); filterS(''); inputS.focus(); }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault(); closeCB(cbS);
      inputS.value = selectedLabelS || ''; setInputWidthS(); inputS.focus();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var vis = optsS.filter(function(o) { return !o.hidden; });
      var idx = vis.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, vis.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (vis[idx]) vis[idx].focus();
    } else if (e.key === 'Enter') {
      if (document.activeElement.classList.contains('combobox__option')) document.activeElement.click();
    }
  });

  /* ── 복수 선택 + 검색 ── */
  var cbM    = stage.querySelector('#demo-cb-multi');
  var trigM  = cbM.querySelector('.combobox__trigger');
  var tagsM  = cbM.querySelector('.combobox__tags');
  var inputM = cbM.querySelector('.combobox__input');
  var optsM  = Array.from(cbM.querySelectorAll('.combobox__option'));
  var emptyM = cbM.querySelector('.combobox__empty');

  function filterM(q) {
    var any = false;
    optsM.forEach(function(o) {
      var show = !q || o.querySelector('.combobox__option-label').textContent.toLowerCase().includes(q);
      o.hidden = !show;
      if (show) any = true;
    });
    emptyM.hidden = any;
  }
  function addTagM(label, opt) {
    var tag = document.createElement('span');
    tag.className = 'tag tag--removable';
    tag.dataset.value = label;
    tag.innerHTML = label + '<button class="icon-on--badge icon-on--brand" type="button" aria-label="' + label + ' 제거"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>';
    tag.querySelector('button').addEventListener('click', function(e) {
      e.stopPropagation();
      tag.remove();
      opt.classList.remove('combobox__option--selected');
      opt.setAttribute('aria-selected', 'false');
    });
    tagsM.appendChild(tag);
  }

  trigM.addEventListener('click', function(e) {
    if (e.target.closest('button')) return; /* 태그 제거 버튼 클릭 무시 */
    if (!cbM.classList.contains('combobox--open')) {
      sortOpts(cbM); openCB(cbM); filterM('');
    }
    inputM.focus();
  });
  inputM.addEventListener('focus', function() {
    if (!cbM.classList.contains('combobox--open')) { sortOpts(cbM); openCB(cbM); filterM(''); }
  });
  inputM.addEventListener('input', function() {
    if (!cbM.classList.contains('combobox--open')) openCB(cbM);
    filterM(inputM.value.toLowerCase());
  });
  optsM.forEach(function(opt) {
    opt.addEventListener('mousedown', function(e) { e.preventDefault(); });
    opt.addEventListener('click', function() {
      var sel = opt.classList.toggle('combobox__option--selected');
      opt.setAttribute('aria-selected', sel.toString());
      var label = opt.querySelector('.combobox__option-label').textContent;
      if (sel) {
        addTagM(label, opt);
      } else {
        var tag = tagsM.querySelector('[data-value="' + label + '"]');
        if (tag) tag.remove();
      }
      inputM.value = ''; filterM(''); inputM.focus();
    });
  });
  inputM.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace' && inputM.value === '') {
      var lastTag = tagsM.lastElementChild;
      if (lastTag) {
        var val = lastTag.dataset.value;
        lastTag.remove();
        var opt = optsM.find(function(o) { return o.querySelector('.combobox__option-label').textContent === val; });
        if (opt) { opt.classList.remove('combobox__option--selected'); opt.setAttribute('aria-selected', 'false'); }
      }
    }
  });
  cbM.addEventListener('keydown', function(e) {
    if (!cbM.classList.contains('combobox--open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeCB(cbM); inputM.value = ''; inputM.focus(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var vis = optsM.filter(function(o) { return !o.hidden; });
      var idx = vis.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, vis.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (vis[idx]) vis[idx].focus();
    } else if (e.key === 'Enter') {
      if (document.activeElement.classList.contains('combobox__option')) { e.preventDefault(); document.activeElement.click(); }
    }
  });
  inputM.addEventListener('blur', function() {
    setTimeout(function() {
      if (!cbM.contains(document.activeElement)) { closeCB(cbM); inputM.value = ''; filterM(''); }
    }, 150);
  });

  /* ── 외부 클릭 닫기 ── */
  document.addEventListener('click', function(e) {
    if (!cbS.contains(e.target)) { closeCB(cbS); inputS.value = selectedLabelS || ''; setInputWidthS(); filterS(''); }
    if (!cbM.contains(e.target)) { closeCB(cbM); inputM.value = ''; filterM(''); }
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.combobox. shape·selection·size·state·open·has-value 클래스를 root에 조합.
- trigger (single): div.combobox__trigger (flex 래퍼, Input과 동일한 height·border·radius). cursor: text.
  - input.combobox__input[type="text"][role="combobox"][aria-haspopup="listbox"][aria-expanded][aria-autocomplete="list"][aria-controls="listbox-id"]
    - placeholder 속성 사용. 선택 시 input.value에 레이블 기입. 선택+닫힘 시 텍스트 너비만큼 width 축소.
  - button.combobox__clear.icon-on--badge: 선택값 초기화. combobox--has-value 시 표시, 패널 열림 시 숨김.
  - span.combobox__chevron: 체브론 아이콘. 패널 열릴 때 180도 회전.
  - focus ring: .combobox__trigger:focus-within 으로 처리.
- trigger (multi): div.combobox__trigger[tabindex="0"] (div + tabindex — button 내 button 불가).
  - 내부: span.combobox__tags(flex 래퍼) + input.combobox__input[role="combobox"] + span.combobox__chevron.
  - 닫힘+태그 없음: input이 전체 행 차지.
  - 닫힘+태그 있음: 태그만 표시(input 숨김).
  - 열림: 태그 숨김 — 검색 input이 단독으로 전체 행 차지. 선택 항목은 패널 상단 정렬로 확인.
  - 태그: span.tag.tag--removable. 내부 button.icon-on--badge.icon-on--brand에 aria-label="[레이블] 제거" 필수.
  - 태그 × 버튼 click에 e.stopPropagation() — trigger click 핸들러로 버블링 방지.
- combobox--has-value (single): 선택값이 있을 때 root에 추가. clear 버튼 표시. chevron이 오른쪽 끝으로.
- combobox--pill: trigger border-radius를 radius-pill로 변경.
- panel: div.combobox__panel. combobox--open 시 표시.
  - combobox__list: ul[role="listbox"]. multi일 때 aria-multiselectable="true".
  - combobox__option: li[role="option"][aria-selected][tabindex="-1"].
    - combobox__option-checkbox: span[aria-hidden="true"] > span.combobox__option-checkbox__icon > svg icon-check. 항상 DOM에 표시(외곽선). 선택 시 채워짐.
    - combobox__option-label: span. JS에서 textContent로 input value 갱신에 사용.
    - 비활성: combobox__option--disabled + aria-disabled="true". tabindex 생략.
    - 선택됨: combobox__option--selected + aria-selected="true".
  - combobox__empty: div[hidden]. 검색 결과 없을 때 hidden 제거.
- disabled: input에 disabled+aria-disabled="true"+tabindex="-1". root에 combobox--disabled.
- searchable 옵션 mousedown에 preventDefault — blur 발생 전 click을 처리하기 위한 필수 패턴.
-->

### 트리거 — 단일 선택

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">기본</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="combobox combobox--sm">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false" aria-autocomplete="list"
                 placeholder="검색" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="combobox">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false" aria-autocomplete="list"
                 placeholder="담당자 검색" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">선택됨</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="combobox combobox--sm combobox--has-value">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false" aria-autocomplete="list"
                 value="이영희" style="width:39px;flex:0 0 auto" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="combobox combobox--has-value">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false" aria-autocomplete="list"
                 value="이영희" style="width:42px;flex:0 0 auto" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">에러</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="combobox combobox--sm combobox--error">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false" aria-autocomplete="list"
                 aria-invalid="true" placeholder="검색" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="combobox combobox--error">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false" aria-autocomplete="list"
                 aria-invalid="true" placeholder="담당자 검색" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">비활성</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="combobox combobox--sm combobox--disabled">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false" placeholder="검색"
                 disabled aria-disabled="true" tabindex="-1" />
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="combobox combobox--disabled">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false" placeholder="담당자 검색"
                 disabled aria-disabled="true" tabindex="-1" />
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
:::

### 트리거 — 복수 선택

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">닫힘 (태그 없음)</span>
  <div class="btn-group">
    <div style="width:200px">
      <div data-component class="combobox combobox--multi">
        <div class="combobox__trigger" tabindex="0">
          <span class="combobox__tags"></span>
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false"
                 aria-autocomplete="list" aria-controls="anat-ms-list"
                 placeholder="담당자 선택" />
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">닫힘 (태그 있음)</span>
  <div class="btn-group">
    <div style="width:240px">
      <div data-component class="combobox combobox--multi">
        <div class="combobox__trigger" tabindex="0">
          <span class="combobox__tags">
            <span class="tag tag--removable">이영희<button class="icon-on--badge icon-on--brand" type="button" aria-label="이영희 제거"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button></span>
            <span class="tag tag--removable">박민준<button class="icon-on--badge icon-on--brand" type="button" aria-label="박민준 제거"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button></span>
          </span>
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="false"
                 aria-autocomplete="list" aria-controls="anat-ms-list2"
                 placeholder="담당자 선택" />
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">열림</span>
  <div class="btn-group">
    <div style="width:240px">
      <!-- 열린 상태: 태그는 CSS로 숨겨지고 검색 input이 단독으로 전체 행 차지 -->
      <div data-component class="combobox combobox--multi combobox--open">
        <div class="combobox__trigger" tabindex="0">
          <span class="combobox__tags">
            <span class="tag tag--removable">이영희<button class="icon-on--badge icon-on--brand" type="button" aria-label="이영희 제거"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button></span>
            <span class="tag tag--removable">박민준<button class="icon-on--badge icon-on--brand" type="button" aria-label="박민준 제거"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button></span>
          </span>
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="true"
                 aria-autocomplete="list" aria-controls="anat-ms-list3"
                 placeholder="담당자 선택" />
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
:::

### 패널

:::preview
<div class="anatomy-grid" style="padding-top:32px;padding-bottom:120px">
<div class="anatomy-row" style="padding-bottom:80px">
  <span class="anatomy-label">검색 결과</span>
  <div class="btn-group" style="align-items:flex-start">
    <div style="width:160px">
      <div data-component class="combobox combobox--sm combobox--open">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="true" aria-autocomplete="list"
                 aria-controls="p-sm-cb" value="이" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
        <div class="combobox__panel">
          <ul class="combobox__list" role="listbox" id="p-sm-cb">
            <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">이영희</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="width:200px">
      <div data-component class="combobox combobox--open">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="true" aria-autocomplete="list"
                 aria-controls="p-md-cb" value="이" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
        <div class="combobox__panel">
          <ul class="combobox__list" role="listbox" id="p-md-cb">
            <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-checkbox" aria-hidden="true"><span class="combobox__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="combobox__option-label">이영희</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">결과 없음</span>
  <div class="btn-group" style="align-items:flex-start">
    <div style="width:160px">
      <div data-component class="combobox combobox--sm combobox--open">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="true" aria-autocomplete="list" value="zzz" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
        <div class="combobox__panel">
          <div class="combobox__empty">검색 결과가 없어요.</div>
        </div>
      </div>
    </div>
    <div style="width:200px">
      <div data-component class="combobox combobox--open">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-haspopup="listbox" aria-expanded="true" aria-autocomplete="list" value="zzz" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
        <div class="combobox__panel">
          <div class="combobox__empty">검색 결과가 없어요.</div>
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
.combobox {
  position: relative;
  display: block;
}

/* ── Trigger (div 래퍼 + input) ── */
.combobox__trigger {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--height-base);
  padding: 0 var(--space-inset-lg);
  gap: var(--space-gap-xs);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  cursor: text;
}
.combobox__trigger:hover { border-color: var(--color-border-brand-subtle); }
.combobox--open .combobox__trigger { border-color: var(--color-border-brand-subtle); }
.combobox__trigger:focus-within {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
  border-color: var(--color-border-brand-subtle);
}

/* 선택됨 — 브랜드 테두리 */
.combobox--has-value .combobox__trigger { border-color: var(--color-border-brand); }

/* ── Shape: pill ── */
.combobox--pill .combobox__trigger { border-radius: var(--radius-pill); }

/* ── Input ── */
.combobox__input {
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
.combobox__input::placeholder { color: var(--color-text-subtle); }
/* 선택됨 — 브랜드 색상 */
.combobox--has-value .combobox__input { color: var(--color-text-brand); }

/* ── Clear button (단일 선택 초기화) ── */
.combobox__clear {
  display: none;
  flex-shrink: 0;
  color: var(--color-text-subtle);
  border: none;
  background: none;
  cursor: pointer;
}
.combobox--has-value .combobox__clear { display: inline-flex; }
/* 패널 열린 상태에서는 숨김 */
.combobox--open .combobox__clear { display: none; }
/* 선택됨 + 닫힘: chevron을 오른쪽 끝으로 밀기 */
.combobox--has-value:not(.combobox--open) .combobox__chevron { margin-left: auto; }

/* ── Chevron ── */
.combobox__chevron {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: var(--icon-sm);
  height: var(--icon-sm);
  color: var(--color-text-subtle);
  transition: transform 0.15s ease;
}
.combobox__chevron svg { width: 100%; height: 100%; display: block; }
.combobox--open .combobox__chevron { transform: rotate(180deg); }

/* ── Panel ── */
.combobox__panel {
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
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0s linear 0.15s;
}
.combobox--open .combobox__panel {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

/* ── List ── */
/* ul.combobox__list — 명시도(0,1,1)로 .md ul의 padding-left:24px 오버라이드 */
ul.combobox__list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 220px;
  overflow-y: auto;
}

/* ── Option ── */
/* li.combobox__option — 명시도(0,1,1)로 .md li의 margin-bottom:4px 오버라이드 */
li.combobox__option {
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
.combobox__option:hover:not(.combobox__option--disabled),
.combobox__option:focus:not(.combobox__option--disabled) {
  background: var(--color-action-brand-hover);
}
.combobox__option--selected {
  color: var(--color-text-brand);
  background: var(--color-action-brand-selected);
}
.combobox__option--selected:hover:not(.combobox__option--disabled),
.combobox__option--selected:focus:not(.combobox__option--disabled) {
  background: var(--color-action-brand-hover);
}
li.combobox__option--disabled {
  color: var(--color-text-disabled);
  pointer-events: none;
  cursor: default;
}

/* ── Option checkbox (선택 상태 시각 표시 — 항상 표시) ── */
.combobox__option-checkbox {
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
.combobox__option-checkbox__icon { display: none; }
.combobox__option-checkbox__icon svg { width: var(--icon-badge); height: var(--icon-badge); display: block; }
.combobox__option--selected .combobox__option-checkbox {
  background: var(--color-action-brand-selected);
  border-color: var(--color-border-brand-subtle);
  color: var(--color-fill-brand);
}
.combobox__option--selected .combobox__option-checkbox__icon { display: flex; }
.combobox__option--disabled .combobox__option-checkbox {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
}

/* ── Empty state ── */
.combobox__empty {
  padding: var(--space-inset-squish-lg);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  text-align: center;
}

/* ── Multi: 태그 트리거 ── */
/* chevron을 position:absolute로 빼고 padding-right으로 공간 확보.
   flex-wrap:wrap 환경에서 chevron이 다음 줄로 밀리는 현상 방지. */
.combobox--multi .combobox__trigger {
  position: relative;
  height: auto;
  min-height: var(--height-base);
  padding: var(--space-gap-xs) calc(var(--space-inset-lg) + var(--icon-sm) + var(--space-gap-xs)) var(--space-gap-xs) var(--space-inset-lg);
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;
}
/* chevron: flex 흐름 제외 → 항상 우측 상단에 고정 */
.combobox--multi .combobox__chevron {
  position: absolute;
  right: var(--space-inset-lg);
  top: calc((var(--height-base) - var(--icon-sm)) / 2);
}
/* 태그 래퍼 */
.combobox__tags {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-gap-xs);
  align-items: center;
  min-width: 0;
}
.combobox--multi .combobox__tags:empty { display: none; }
.combobox--multi .combobox__input { flex: 1; min-width: 0; }

/* 닫힘 + 태그 있음: input 숨김 */
.combobox--multi:not(.combobox--open) .combobox__trigger:has(.tag) .combobox__input {
  display: none;
}
/* 열림: 태그 숨김 — 검색 input이 단독으로 전체 행 차지 */
.combobox--multi.combobox--open .combobox__tags {
  display: none;
}

/* ── Size: sm ── */
.combobox--sm .combobox__trigger { height: var(--height-compact); font-size: var(--font-size-sm); }
.combobox--sm .combobox__input   { font-size: var(--font-size-sm); }
.combobox--sm li.combobox__option { height: var(--height-compact); font-size: var(--font-size-sm); }
.combobox--sm.combobox--multi .combobox__trigger {
  min-height: var(--height-compact);
}
.combobox--sm.combobox--multi .combobox__chevron {
  top: calc((var(--height-compact) - var(--icon-sm)) / 2);
}

/* ── State: error ── */
.combobox--error .combobox__trigger { border-color: var(--color-border-error); }
.combobox--error .combobox__trigger:hover { border-color: var(--color-border-error); }

/* ── State: disabled ── */
.combobox--disabled .combobox__trigger {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  pointer-events: none;
  cursor: default;
}
.combobox--disabled .combobox__input    { color: var(--color-text-disabled); }
.combobox--disabled .combobox__chevron  { color: var(--color-text-disabled); }
```

---

## 접근성

콤보박스 유형 (WAI-ARIA Combobox Pattern 적용).

| 상황 | 마크업 |
|------|--------|
| input | `role="combobox"` + `aria-haspopup="listbox"` + `aria-expanded` + `aria-autocomplete="list"` + `aria-controls="listbox-id"` |
| 패널 (single) | `<ul role="listbox" id="listbox-id">` |
| 패널 (multi) | `<ul role="listbox" aria-multiselectable="true">` |
| 옵션 | `<li role="option" aria-selected="true/false" tabindex="-1">` |
| 비활성 옵션 | `aria-disabled="true"`. tabindex 생략 |
| 트리거 레이블 | 연결된 `<label for>` 또는 `aria-label` |
| 에러 연결 | input에 `aria-invalid="true"` + `aria-describedby="[error-id]"` |
| disabled | input에 `disabled` + `aria-disabled="true"` + `tabindex="-1"`. root에 `combobox--disabled` |
| 결과 없음 | `combobox__empty`는 `role="option"` 없음. `aria-live="polite"` 영역으로 별도 안내 권장 |
| 태그 제거 | 태그 내 button에 `aria-label="[레이블] 제거"` |

```js
// 옵션 mousedown — blur 발생 전 선택 처리를 위한 필수 패턴
option.addEventListener('mousedown', (e) => e.preventDefault());

root.addEventListener('keydown', (e) => {
  if (e.key === 'Escape')    { close(); input.focus(); }
  if (e.key === 'ArrowDown') focusNext();
  if (e.key === 'ArrowUp')   focusPrev();
  if (e.key === 'Enter')     selectFocused();
});
```

---

## Do / Don't

> ✅ DO — input에 `role="combobox"` + `aria-autocomplete="list"` 명시
> `<input type="text" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-autocomplete="list" aria-controls="listbox-id">`

> ❌ DON'T — 옵션 선택에 `click` 이벤트 단독 사용
> `click` 전에 input이 blur되어 패널이 닫힌다. `mousedown` + `e.preventDefault()` 사용

> ✅ DO — 폼 필드 내 선택에 항상 Combobox 사용
> 검색이 필요 없는 폼 드롭다운도 Combobox를 사용한다 — 사용자는 input 요소에서 타이핑을 기대한다

> ✅ DO — 검색 결과가 없으면 빈 상태 텍스트 표시
> `<div class="combobox__empty">검색 결과가 없어요.</div>` — `hidden` 제거로 표시

> ❌ DON'T — 트리거를 `<button>`으로 구현
> 텍스트 입력이 없고 선택만 필요한 필터·정렬 컨텍스트는 Dropdown(`dropdown--button`)을 사용한다

> ❌ DON'T — `combobox--disabled`와 `combobox--error` 동시 적용
> 비활성 상태에서는 에러를 표시하지 않는다

> ✅ DO — multi 트리거 DIV에 `tabindex="0"` 적용
> `<div class="combobox__trigger" tabindex="0">` — button 내 button 불가 구조이므로 div로 대체
