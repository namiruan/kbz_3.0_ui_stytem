---
file: components/molecules/combobox.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/shadow.md, tokens/z-index.md, tokens/height.md, tokens/typography.md, tokens/icon.md, components/atoms/input.md, components/atoms/icon.md, components/atoms/icon-button.md
---

# Combobox

## 개요

검색·입력과 선택을 결합한 목록 선택기. 트리거는 `<input role="combobox">`로, 타이핑하면 목록이 실시간으로 필터링된다. 옵션이 많거나 직접 검색이 필요한 경우에 사용한다.

Dropdown과의 구별 — Combobox는 `<input>`이 트리거이므로 검색이 기본 동작이다. 텍스트 입력이 없고 목록에서만 고를 수 있으면 Dropdown을 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | md (기본, 클래스 없음) · sm → `combobox--sm` | md |
| state | error → `combobox--error` · disabled → `combobox--disabled` | — |
| open | `combobox--open` (JS 제어) | — |

선택값이 있을 때 `combobox--has-value`가 추가된다. clear 버튼 표시 여부를 CSS로 제어하는 데 사용한다.

---

## 사용 지침

### 제약

- `combobox--disabled`와 `combobox--error`는 함께 사용하지 않는다.
- 선택값은 input value에만 표시한다. 별도 영역에 중복 표시하지 않는다.
- 옵션이 3개 이하이고 검색이 필요 없다면 Dropdown을 사용한다.

---

## 동작

| 이벤트 | 동작 |
|--------|------|
| input focus | 패널 열림, input value 초기화 → 전체 옵션 표시 |
| 타이핑 | 패널 열림 + 검색어로 옵션 실시간 필터링. 결과 없음 시 `combobox__empty` 표시 |
| 옵션 클릭 | 선택 — `combobox__option--selected` + `aria-selected="true"`, input value 업데이트, `combobox--has-value` 추가, 패널 닫힘 |
| input blur | 패널 닫힘. input value를 선택된 레이블로 복원 (선택 없으면 빈 값) |
| clear 클릭 | 선택 초기화, input value 비움, `combobox--has-value` 제거, 전체 옵션 표시, 패널 열림 |
| `Escape` | 패널 닫힘. input value를 선택된 레이블로 복원 |
| `↑` / `↓` | 패널 열림 + 옵션 포커스 이동 |
| `Enter` (옵션 포커스 시) | 옵션 선택 |

옵션 클릭 시 blur 발생 전에 선택해야 하므로 `mousedown` + `e.preventDefault()` 패턴을 사용한다.

:::preview
<div style="padding-bottom:240px">
  <div style="width:220px">
    <div class="combobox" id="demo-cb">
      <div class="combobox__trigger">
        <input class="combobox__input" type="text"
               role="combobox" aria-expanded="false"
               aria-autocomplete="list" aria-controls="demo-cb-list"
               placeholder="담당자 검색" />
        <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
        <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </div>
      <div class="combobox__panel">
        <ul class="combobox__list" role="listbox" id="demo-cb-list" aria-label="담당자">
          <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="combobox__option-label">김철수</span></li>
          <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="combobox__option-label">이영희</span></li>
          <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="combobox__option-label">박민준</span></li>
          <li class="combobox__option combobox__option--disabled" role="option" aria-selected="false" aria-disabled="true"><span class="combobox__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="combobox__option-label">최지은 (휴직)</span></li>
          <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="combobox__option-label">정수빈</span></li>
        </ul>
        <div class="combobox__empty" hidden>검색 결과가 없어요.</div>
      </div>
    </div>
  </div>
</div>
<script>
(function() {
  var root   = stage.querySelector('#demo-cb');
  var input  = root.querySelector('.combobox__input');
  var clear  = root.querySelector('.combobox__clear');
  var opts   = Array.from(root.querySelectorAll('.combobox__option:not(.combobox__option--disabled)'));
  var empty  = root.querySelector('.combobox__empty');
  var selectedLabel = null;

  function filter(q) {
    var any = false;
    opts.forEach(function(o) {
      var show = !q || o.querySelector('.combobox__option-label').textContent.toLowerCase().includes(q);
      o.hidden = !show;
      if (show) any = true;
    });
    empty.hidden = any;
  }
  function open() {
    root.classList.add('combobox--open');
    input.setAttribute('aria-expanded', 'true');
  }
  function close() {
    root.classList.remove('combobox--open');
    input.setAttribute('aria-expanded', 'false');
  }

  input.addEventListener('focus', function() {
    if (!root.classList.contains('combobox--open')) {
      open();
      input.value = '';
      filter('');
    }
  });
  input.addEventListener('input', function() {
    if (!root.classList.contains('combobox--open')) open();
    filter(input.value.toLowerCase());
  });

  opts.forEach(function(opt) {
    opt.addEventListener('mousedown', function(e) { e.preventDefault(); }); // blur 방지
    opt.addEventListener('click', function() {
      opts.forEach(function(o) { o.classList.remove('combobox__option--selected'); o.setAttribute('aria-selected', 'false'); });
      opt.classList.add('combobox__option--selected');
      opt.setAttribute('aria-selected', 'true');
      selectedLabel = opt.querySelector('.combobox__option-label').textContent;
      input.value = selectedLabel;
      root.classList.add('combobox--has-value');
      close();
      setInputWidth();
      input.focus();
    });
  });

  function getTextWidth() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var cs = getComputedStyle(input);
    ctx.font = cs.fontSize + ' ' + cs.fontFamily;
    return ctx.measureText(input.value).width;
  }
  function setInputWidth() {
    if (selectedLabel) {
      input.style.width = getTextWidth() + 'px';
      input.style.flex = '0 0 auto';
    } else {
      input.style.width = '';
      input.style.flex = '';
    }
  }

  clear.addEventListener('mousedown', function(e) { e.preventDefault(); });
  clear.addEventListener('click', function(e) {
    e.stopPropagation();
    selectedLabel = null;
    input.value = '';
    input.style.width = ''; input.style.flex = '';
    root.classList.remove('combobox--has-value');
    opts.forEach(function(o) { o.classList.remove('combobox__option--selected'); o.setAttribute('aria-selected', 'false'); });
    filter('');
    open();
    input.focus();
  });

  input.addEventListener('blur', function() {
    setTimeout(function() {
      if (!root.contains(document.activeElement)) {
        close();
        input.value = selectedLabel || '';
        filter('');
        setInputWidth();
      }
    }, 150);
  });

  root.addEventListener('keydown', function(e) {
    if (!root.classList.contains('combobox--open')) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); filter(''); input.focus(); }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault(); close();
      input.value = selectedLabel || '';
      setInputWidth();
      input.focus();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var vis = opts.filter(function(o) { return !o.hidden; });
      var idx = vis.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, vis.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (vis[idx]) vis[idx].focus();
    } else if (e.key === 'Enter') {
      if (document.activeElement.classList.contains('combobox__option')) document.activeElement.click();
    }
  });

  document.addEventListener('click', function(e) {
    if (!root.contains(e.target)) close();
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.combobox. size·state·open·has-value 클래스를 root에 조합.
- trigger: div.combobox__trigger (flex 래퍼, Input과 동일한 height·border·radius).
  - input.combobox__input[type="text"][role="combobox"][aria-expanded][aria-autocomplete="list"][aria-controls="listbox-id"]
    - placeholder 속성 사용. 선택 시 input.value에 레이블 기입. 선택+닫힘 시 텍스트 너비만큼 width 축소.
  - button.combobox__clear.icon-on--badge: 선택값 초기화. combobox--has-value 시 표시, 패널 열림 시 숨김.
  - span.combobox__chevron: 체브론 아이콘. 패널 열릴 때 180도 회전.
  - focus ring: .combobox__trigger:focus-within 으로 처리.
- combobox--has-value: 선택값이 있을 때 root에 추가. clear 버튼 표시/숨김 CSS 제어.
- panel: div.combobox__panel. combobox--open 시 표시.
  - combobox__list: ul[role="listbox"].
  - combobox__option: li[role="option"][aria-selected][tabindex="-1"].
    - combobox__option-check: 선택 표시 아이콘. 항상 DOM에 존재, 선택 시 visible.
    - combobox__option-label: span. JS에서 textContent로 input value 갱신에 사용.
    - 비활성: combobox__option--disabled + aria-disabled="true". tabindex 생략.
    - 선택됨: combobox__option--selected + aria-selected="true".
  - combobox__empty: div[hidden]. 검색 결과 없을 때 hidden 제거. role 없음.
- disabled: input에 disabled+aria-disabled="true"+tabindex="-1". root에 combobox--disabled.
-->

### 트리거

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">기본</span>
  <div class="btn-group">
    <div style="width:140px">
      <div data-component class="combobox combobox--sm">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-expanded="false" aria-autocomplete="list"
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
                 aria-expanded="false" aria-autocomplete="list"
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
                 aria-expanded="false" aria-autocomplete="list"
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
                 aria-expanded="false" aria-autocomplete="list"
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
                 aria-expanded="false" aria-autocomplete="list"
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
                 aria-expanded="false" aria-autocomplete="list"
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
                 aria-expanded="false" placeholder="검색"
                 disabled aria-disabled="true" tabindex="-1" />
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
      </div>
    </div>
    <div style="width:180px">
      <div data-component class="combobox combobox--disabled">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-expanded="false" placeholder="담당자 검색"
                 disabled aria-disabled="true" tabindex="-1" />
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
<div class="anatomy-grid" style="padding-bottom:220px">
<div class="anatomy-row">
  <span class="anatomy-label">검색</span>
  <div class="btn-group" style="align-items:flex-start">
    <div style="width:160px">
      <div data-component class="combobox combobox--sm combobox--open">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-expanded="true" aria-autocomplete="list"
                 aria-controls="p-sm-cb" value="이" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
        <div class="combobox__panel">
          <ul class="combobox__list" role="listbox" id="p-sm-cb">
            <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="combobox__option-label">이영희</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="width:200px">
      <div data-component class="combobox combobox--open">
        <div class="combobox__trigger">
          <input class="combobox__input" type="text" role="combobox"
                 aria-expanded="true" aria-autocomplete="list"
                 aria-controls="p-md-cb" value="이" />
          <button class="combobox__clear icon-on--badge" type="button" aria-label="선택 초기화"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
          <span class="combobox__chevron" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
        </div>
        <div class="combobox__panel">
          <ul class="combobox__list" role="listbox" id="p-md-cb">
            <li class="combobox__option" role="option" aria-selected="false" tabindex="-1"><span class="combobox__option-check" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span><span class="combobox__option-label">이영희</span></li>
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
                 aria-expanded="true" aria-autocomplete="list" value="zzz" />
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
                 aria-expanded="true" aria-autocomplete="list" value="zzz" />
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

/* ── Clear button ── */
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

/* ── Size: sm ── */
.combobox--sm .combobox__trigger { height: var(--height-compact); font-size: var(--font-size-sm); }
.combobox--sm .combobox__input   { font-size: var(--font-size-sm); }

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

/* ── Panel ── */
.combobox__panel {
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
.combobox__list {
  list-style: none;
  margin: 0;
  padding: var(--space-inset-xs) 0;
  max-height: 220px;
  overflow-y: auto;
}

/* ── Option ── */
.combobox__option {
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
  background: var(--color-action-neutral-hover);
}
.combobox__option--selected {
  color: var(--color-text-brand);
  background: var(--color-action-brand-selected);
}
.combobox__option--selected:hover:not(.combobox__option--disabled),
.combobox__option--selected:focus:not(.combobox__option--disabled) {
  background: var(--color-action-brand-hover);
}
.combobox__option--disabled {
  color: var(--color-text-disabled);
  pointer-events: none;
  cursor: default;
}

/* ── Option check ── */
.combobox__option-check {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--icon-sm);
  height: var(--icon-sm);
  color: var(--color-fill-brand);
  visibility: hidden;
}
.combobox__option-check svg { width: 100%; height: 100%; display: block; }
.combobox__option--selected .combobox__option-check { visibility: visible; }
.combobox__option--disabled .combobox__option-check { color: var(--color-text-disabled); }

/* ── Size: sm (option) ── */
.combobox--sm .combobox__option { height: var(--height-compact); font-size: var(--font-size-sm); }

/* ── Empty state ── */
.combobox__empty {
  padding: var(--space-inset-squish-lg);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  text-align: center;
}
```

---

## 접근성

콤보박스 유형 (WAI-ARIA Combobox Pattern 적용).

| 상황 | 마크업 |
|------|--------|
| input | `role="combobox"` + `aria-expanded` + `aria-autocomplete="list"` + `aria-controls="listbox-id"` |
| 패널 | `<ul role="listbox" id="listbox-id">` |
| 옵션 | `<li role="option" aria-selected="true/false" tabindex="-1">` |
| 비활성 옵션 | `aria-disabled="true"`. tabindex 생략 |
| 트리거 레이블 | 연결된 `<label for>` 또는 `aria-label` |
| 에러 연결 | input에 `aria-invalid="true"` + `aria-describedby="[error-id]"` |
| disabled | input에 `disabled` + `aria-disabled="true"` + `tabindex="-1"`. root에 `combobox--disabled` |
| 결과 없음 | `combobox__empty`는 `role="option"` 없음. `aria-live="polite"` 영역으로 별도 안내 권장 |

```js
// 옵션 mousedown — blur 발생 전 선택 처리를 위한 필수 패턴
option.addEventListener('mousedown', (e) => e.preventDefault());

root.addEventListener('keydown', (e) => {
  if (e.key === 'Escape')    close();
  if (e.key === 'ArrowDown') focusNext();
  if (e.key === 'ArrowUp')   focusPrev();
  if (e.key === 'Enter')     selectFocused();
});
```

---

## Do / Don't

> ✅ DO — input에 `role="combobox"` + `aria-autocomplete="list"` 명시
> `<input type="text" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="listbox-id">`

> ❌ DON'T — 옵션 선택에 `click` 이벤트 단독 사용
> `click` 전에 input이 blur되어 패널이 닫힌다. `mousedown` + `e.preventDefault()` 사용

> ✅ DO — 검색 결과가 없으면 빈 상태 텍스트 표시
> `<div class="combobox__empty">검색 결과가 없어요.</div>` — `hidden` 제거로 표시

> ❌ DON'T — 트리거를 `<button>`으로 변경
> 텍스트 입력이 없고 선택만 필요하면 이 컴포넌트가 아닌 Dropdown을 사용한다

> ❌ DON'T — `combobox--disabled`와 `combobox--error` 동시 적용
> 비활성 상태에서는 에러를 표시하지 않는다
