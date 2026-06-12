---
file: components/organisms/filter-bar.md
version: 0.2.0
status: draft
depends-on: components/_index.md, accessibility.md, components/atoms/button.md, components/atoms/icon.md, components/atoms/input.md, components/atoms/tag.md, components/molecules/dropdown.md, tokens/color.md, tokens/radius.md, tokens/space.md
---

# FilterBar

## 개요

테이블·목록 상단에 배치하는 검색·필터 도구 모음. 검색 인풋과 복수 선택 드롭다운 필터를 하나의 바로 연결해 표시하고, 활성 필터는 하단 태그 행에 요약 표시한다.

ActionGroup과의 차이 — ActionGroup은 버튼 기반 액션 모음. FilterBar는 검색 인풋과 드롭다운 필터를 포함한 데이터 쿼리 전용 영역.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| search | 없음 (기본) · 있음 — `.filter-bar__search` 슬롯 | 없음 |
| tags | 숨김 (기본, `filter-bar__tags[hidden]`) · 표시 — JS로 `hidden` 제거 | 숨김 |

- 검색·필터·초기화는 하나의 `filter-bar__bar` 컨테이너에 수평 연결된다.
- 각 섹션 사이에 구분선(`border-left`)이 자동 적용된다.
- 활성 필터 태그 행은 드롭다운에서 선택값이 생길 때 표시된다.
- 초기화 버튼은 검색어나 필터 선택값이 하나라도 있을 때만 표시한다.

---

## 사용 지침

<!-- AI:
레이어 계층: FilterBar — 레이아웃 루트 (div.filter-bar)
  ├─ .filter-bar__bar — div. 외곽 테두리·radius·overflow 컨테이너. 직접 자식끼리 border-left 구분선.
  │    ├─ .filter-bar__search — div (optional). 검색 인풋 영역. flex: 1.
  │    │    ├─ span.icon.icon--md[aria-hidden="true"] — 검색 아이콘 (장식용, 버튼 아님).
  │    │    ├─ input.input.input--ghost[type="search"][aria-label="검색어 입력"] — ghost 인풋.
  │    │    └─ button.input-clear.icon-on--badge[aria-label="지우기"][hidden] — 값 있을 때만 표시 (JS 제어).
  │    ├─ div.dropdown.dropdown--button.dropdown--ghost.dropdown--multi — dropdown.md 참조. 필터마다 1개.
  │    │    bar 안에서 dropdown--ghost 사용: trigger border·background 제거. bar가 시각 프레임 제공.
  │    └─ button.btn.btn--ghost.btn--sm[hidden] — 초기화 버튼. 검색어·선택값이 있을 때 표시 (JS 제어). bar 안에서 border-radius: 0 오버라이드.
  └─ .filter-bar__tags — div[hidden]. 활성 필터 요약 태그 행.
       └─ span.tag.tag--removable × N — tag.md 참조. 클릭 시 해당 필터 해제.

동작:
- 검색: 입력 시 clearable X 표시/숨김. Enter로 검색 실행.
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
    <div class="filter-bar__bar">
      <div class="filter-bar__search">
        <span class="icon icon--md" aria-hidden="true">
          <svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg>
        </span>
        <input class="input input--ghost" type="search" placeholder="이름으로 검색" aria-label="검색어 입력" id="fb1-input">
        <button class="input-clear icon-on--badge" type="button" aria-label="지우기" hidden id="fb1-clear">
          <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
        </button>
      </div>
      <div class="dropdown dropdown--button dropdown--ghost dropdown--multi" id="fb1-dd-dept">
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
      <div class="dropdown dropdown--button dropdown--ghost dropdown--multi" id="fb1-dd-status">
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
    <div class="filter-bar__bar">
      <div class="dropdown dropdown--button dropdown--ghost dropdown--multi" id="fb2-dd-dept">
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
      <div class="dropdown dropdown--button dropdown--ghost dropdown--multi" id="fb2-dd-role">
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

- 검색 인풋은 ghost 스타일만 사용한다. 바 컨테이너가 시각 프레임을 제공한다.
- 드롭다운 필터는 `dropdown--ghost` + `dropdown--multi` 조합만 사용한다. 바 안에서 `dropdown--pill`은 사용하지 않는다.
- 활성 태그 행은 드롭다운 선택값만 표시한다. 검색어는 태그로 표시하지 않는다.
- 초기화 버튼은 바 맨 끝에 배치한다.

---

## CSS

```css
/* ── Base ── */
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
}

/* ── Bar (통합 컨테이너) ── */
.filter-bar__bar {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
  overflow: hidden;
}

/* 섹션 구분선 — 첫 자식 제외 */
.filter-bar__bar > * + * {
  border-left: 1px solid var(--color-border-subtle);
}

/* ── Search section ── */
.filter-bar__search {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  flex: 1;
  min-width: 180px;
  max-width: 320px;
  padding: 0 var(--space-inset-md);
}
.filter-bar__search .input {
  flex: 1;
  min-width: 0;
}

/* ── Dropdown trigger 보정 — bar 안에서 개별 radius 제거 ── */
.filter-bar__bar .dropdown__trigger {
  height: 100%;
  border-radius: 0;
}

/* ── Reset button 보정 — bar 안에서 개별 radius 제거 ── */
.filter-bar__bar > .btn {
  height: 100%;
  border-radius: 0;
  padding-inline: var(--space-inset-md);
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
| 검색 아이콘 | `aria-hidden="true"` — 장식용, 스크린리더 무시 |
| 지우기 버튼 | `aria-label="지우기"` |
| 태그 제거 버튼 | `aria-label="[태그명] 제거"` — 태그명 포함 필수 |
| 드롭다운 트리거 | `aria-label="[필터명] 선택"` — dropdown.md 참조 |

---

## Do / Don't

| Do | Don't |
|----|-------|
| 검색 인풋에 `aria-label="검색어 입력"` 명시 | 레이블 없이 검색 인풋 배치 |
| 바 안 드롭다운은 `dropdown--ghost` 사용 | 바 안에 `dropdown--pill` 또는 `dropdown--button`(기본 border) 사용 |
| 활성 태그는 드롭다운 선택값만 표시 | 검색어를 태그 행에 중복 표시 |
| 초기화 버튼은 바 맨 끝 배치 | 초기화 버튼을 드롭다운보다 앞에 배치 |
