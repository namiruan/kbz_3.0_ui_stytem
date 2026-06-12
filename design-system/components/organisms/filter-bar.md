---
file: components/organisms/filter-bar.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, components/atoms/button.md, components/atoms/input.md, components/atoms/tag.md, components/molecules/dropdown.md, tokens/color.md, tokens/space.md
---

# FilterBar

## 개요

테이블·목록 상단에 배치하는 검색·필터 도구 모음. 검색 인풋과 복수 선택 드롭다운 필터를 수평으로 나열하고, 활성 필터는 하단 태그 행에 요약 표시한다.

ActionGroup과의 차이 — ActionGroup은 버튼 기반 액션 모음. FilterBar는 검색 인풋과 드롭다운 필터를 포함한 데이터 쿼리 전용 영역.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| search | 없음 (기본) · 있음 — `.filter-bar__search` 슬롯 | 없음 |
| tags | 숨김 (기본, `filter-bar__tags[hidden]`) · 표시 — JS로 `hidden` 제거 | 숨김 |

- 검색 인풋은 ghost 스타일로 주변 컨트롤에 녹아든다.
- 활성 필터 태그 행은 드롭다운에서 선택값이 생길 때 표시된다.
- 초기화 버튼은 검색어나 필터 선택값이 하나라도 있을 때만 표시한다.

---

## 사용 지침

<!-- AI:
레이어 계층: FilterBar — 레이아웃 루트 (div.filter-bar)
  ├─ .filter-bar__controls — div. 검색·필터·초기화를 수평 나열.
  │    ├─ .filter-bar__search — div (optional). 검색 인풋 영역.
  │    │    ├─ div.input-wrap.input-wrap--clearable — input.md 참조.
  │    │    │    ├─ input.input.input--ghost[type="search"][aria-label="검색어 입력"]
  │    │    │    └─ button.input-clear.icon-on--badge[aria-label="지우기"][hidden] — 값 있을 때만 표시 (JS 제어).
  │    │    └─ button.icon-on--md[type="button"][aria-label="검색"] — 검색 제출 버튼. Enter 또는 클릭으로 검색.
  │    ├─ div.dropdown.dropdown--button.dropdown--pill.dropdown--multi — dropdown.md 참조. 필터마다 1개.
  │    └─ button.btn.btn--ghost.btn--sm[hidden] — 초기화 버튼. 검색어·선택값이 있을 때 표시 (JS 제어).
  └─ .filter-bar__tags — div[hidden]. 활성 필터 요약 태그 행.
       └─ span.tag.tag--removable × N — tag.md 참조. 클릭 시 해당 필터 해제.

동작:
- 검색: Enter 또는 검색 버튼 클릭 → 검색 실행. 값 있으면 clearable X 표시.
- 드롭다운 옵션 선택/해제 → filter-bar__tags에 선택값마다 removable tag 추가 + tags 행 표시 + 초기화 버튼 표시.
- tag 제거 버튼 클릭 → 해당 dropdown__option--selected 제거 + dropdown__count 갱신 + tag 제거 → 나머지 없으면 tags 행 hidden.
- 초기화 버튼 클릭 → 모든 드롭다운 선택 초기화 + 검색어 초기화 + tags 행 hidden + 초기화 버튼 hidden.
- 초기화 버튼 가시성: 검색어 또는 드롭다운 선택이 하나라도 있으면 표시. 모두 비었으면 hidden.
-->

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-3xl)">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">검색 + 필터 드롭다운</p>
  <div data-component class="filter-bar" id="fb-demo-1">
    <div class="filter-bar__controls">
      <div class="filter-bar__search">
        <div class="input-wrap input-wrap--clearable">
          <input class="input input--ghost" type="search" placeholder="이름으로 검색" aria-label="검색어 입력" id="fb1-input">
          <button class="input-clear icon-on--badge" type="button" aria-label="지우기" hidden id="fb1-clear">
            <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
          </button>
        </div>
        <button class="icon-on--md" type="button" aria-label="검색" id="fb1-search-btn">
          <svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg>
        </button>
      </div>
      <div class="dropdown dropdown--button dropdown--pill dropdown--multi" id="fb1-dd-dept">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="부서 선택">
          <span class="dropdown__value dropdown__value--placeholder">부서</span>
          <span class="dropdown__count" hidden aria-hidden="true"></span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="부서">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">개발팀</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">디자인팀</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">마케팅팀</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">영업팀</span></li>
          </ul>
        </div>
      </div>
      <div class="dropdown dropdown--button dropdown--pill dropdown--multi" id="fb1-dd-status">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="상태 선택">
          <span class="dropdown__value dropdown__value--placeholder">상태</span>
          <span class="dropdown__count" hidden aria-hidden="true"></span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="상태">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">재직</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">휴직</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">퇴직</span></li>
          </ul>
        </div>
      </div>
      <button class="btn btn--ghost btn--sm" type="button" id="fb1-reset" hidden>초기화</button>
    </div>
    <div class="filter-bar__tags" hidden id="fb1-tags"></div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">필터만 (검색 없음)</p>
  <div data-component class="filter-bar" id="fb-demo-2">
    <div class="filter-bar__controls">
      <div class="dropdown dropdown--button dropdown--pill dropdown--multi" id="fb2-dd-dept">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="부서 선택">
          <span class="dropdown__value dropdown__value--placeholder">부서</span>
          <span class="dropdown__count" hidden aria-hidden="true"></span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="부서">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">개발팀</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">디자인팀</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">마케팅팀</span></li>
          </ul>
        </div>
      </div>
      <div class="dropdown dropdown--button dropdown--pill dropdown--multi" id="fb2-dd-role">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="직책 선택">
          <span class="dropdown__value dropdown__value--placeholder">직책</span>
          <span class="dropdown__count" hidden aria-hidden="true"></span>
          <span class="dropdown__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </button>
        <div class="dropdown__panel">
          <ul class="dropdown__list" role="listbox" aria-multiselectable="true" aria-label="직책">
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">사원</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">대리</span></li>
            <li class="dropdown__option" role="option" aria-selected="false" tabindex="-1"><span class="dropdown__option-checkbox" aria-hidden="true"><span class="dropdown__option-checkbox__icon"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="dropdown__option-label">과장</span></li>
          </ul>
        </div>
      </div>
      <button class="btn btn--ghost btn--sm" type="button" id="fb2-reset" hidden>초기화</button>
    </div>
    <div class="filter-bar__tags" hidden id="fb2-tags"></div>
  </div>
</div>

</div>
<script>
(function() {
  function syncReset(fb) {
    var resetBtn = fb.querySelector('.btn--ghost');
    if (!resetBtn) return;
    var searchInput = fb.querySelector('input[type="search"]');
    var hasSearch = searchInput && searchInput.value.trim().length > 0;
    var hasFilter = !!fb.querySelector('.dropdown__option--selected');
    resetBtn.hidden = !(hasSearch || hasFilter);
  }

  function syncTags(fb) {
    var tagsEl = fb.querySelector('.filter-bar__tags');
    if (!tagsEl) return;
    tagsEl.innerHTML = '';
    fb.querySelectorAll('.dropdown__option--selected').forEach(function(opt) {
      var label = opt.querySelector('.dropdown__option-label').textContent;
      var dd = opt.closest('.dropdown');
      var tag = document.createElement('span');
      tag.className = 'tag tag--removable';
      tag.appendChild(document.createTextNode(label + ' '));
      var removeBtn = document.createElement('button');
      removeBtn.className = 'icon-on--badge icon-on--brand';
      removeBtn.setAttribute('aria-label', label + ' 제거');
      removeBtn.innerHTML = '<svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>';
      removeBtn.addEventListener('click', function() {
        opt.classList.remove('dropdown__option--selected');
        opt.setAttribute('aria-selected', 'false');
        var cnt = dd.querySelector('.dropdown__count');
        var val = dd.querySelector('.dropdown__value');
        var remaining = dd.querySelectorAll('.dropdown__option--selected').length;
        if (cnt) { cnt.hidden = remaining === 0; if (remaining) cnt.textContent = remaining; }
        if (val && remaining === 0) val.classList.add('dropdown__value--placeholder');
        syncTags(fb);
        syncReset(fb);
      });
      tag.appendChild(removeBtn);
      tagsEl.appendChild(tag);
    });
    tagsEl.hidden = tagsEl.children.length === 0;
  }

  stage.querySelectorAll('.filter-bar').forEach(function(fb) {
    initDropdown(fb);

    fb.querySelectorAll('.dropdown__option').forEach(function(opt) {
      opt.addEventListener('click', function() {
        setTimeout(function() { syncTags(fb); syncReset(fb); }, 0);
      });
    });

    var searchInput = fb.querySelector('input[type="search"]');
    var clearBtn = fb.querySelector('.input-clear');

    if (searchInput) {
      searchInput.addEventListener('input', function() {
        if (clearBtn) clearBtn.hidden = !searchInput.value;
        syncReset(fb);
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        clearBtn.hidden = true;
        syncReset(fb);
      });
    }

    var resetBtn = fb.querySelector('.btn--ghost');
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        if (searchInput) { searchInput.value = ''; if (clearBtn) clearBtn.hidden = true; }
        fb.querySelectorAll('.dropdown__option--selected').forEach(function(o) {
          o.classList.remove('dropdown__option--selected');
          o.setAttribute('aria-selected', 'false');
        });
        fb.querySelectorAll('.dropdown__count').forEach(function(c) { c.hidden = true; });
        fb.querySelectorAll('.dropdown__value').forEach(function(v) { v.classList.add('dropdown__value--placeholder'); });
        syncTags(fb);
        syncReset(fb);
      });
    }
  });
})();
</script>
:::

### 제약

- 검색 인풋은 ghost 스타일만 사용한다. box 스타일은 FilterBar 맥락에 적합하지 않다.
- 드롭다운 필터는 `dropdown--pill` + `dropdown--multi` 조합만 사용한다. rect 또는 single 드롭다운은 FilterBar에 사용하지 않는다.
- 활성 태그 행은 드롭다운 선택값만 표시한다. 검색어는 태그로 표시하지 않는다.
- 초기화 버튼은 컨트롤 행 맨 끝에 배치한다.

---

## CSS

```css
/* ── Base ── */
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
}

/* ── Controls row ── */
.filter-bar__controls {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  flex-wrap: wrap;
}

/* ── Search area ── */
.filter-bar__search {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 180px;
  max-width: 320px;
}
.filter-bar__search .input-wrap {
  flex: 1;
}

/* ── Active tags row ── */
.filter-bar__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-gap-xs);
}
.filter-bar__tags[hidden] {
  display: none;
}
```

---

## 접근성

도구 모음 유형.

| 상황 | 마크업 |
|------|--------|
| 검색 인풋 | `aria-label="검색어 입력"` — 레이블 없이 배치하므로 필수 |
| 검색 버튼 | `aria-label="검색"` |
| 지우기 버튼 | `aria-label="지우기"` |
| 태그 제거 버튼 | `aria-label="[태그명] 제거"` — 태그명 포함 필수 |
| 드롭다운 트리거 | `aria-label="[필터명] 선택"` — dropdown.md 참조 |

---

## Do / Don't

| Do | Don't |
|----|-------|
| 검색 인풋에 `aria-label="검색어 입력"` 명시 | 레이블 없이 검색 인풋 배치 |
| 드롭다운 필터는 pill + multi 조합 사용 | FilterBar 안에 rect 또는 single 드롭다운 사용 |
| 활성 태그는 드롭다운 선택값만 표시 | 검색어를 태그 행에 중복 표시 |
| 초기화 버튼은 컨트롤 행 맨 끝 배치 | 초기화 버튼을 드롭다운보다 앞에 배치 |
