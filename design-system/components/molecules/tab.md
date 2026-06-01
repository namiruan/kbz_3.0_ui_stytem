---
file: components/molecules/tab.md
version: 0.6.1
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/typography.md, tokens/motion.md, components/atoms/badge.md
---

# Tab

## 개요

콘텐츠 영역을 전환하는 탭 내비게이션. `tab-group`(tablist) + 하나 이상의 `tab`(tab) + 대응하는 `tab-panel`(tabpanel)로 구성한다. 수평(`기본`)과 세로(`tab-group--vertical`) 두 방향을 지원한다.

Segment와의 차이 — Segment는 즉시 반영되는 단일 선택 컨트롤(모드·단위 전환)이고, Tab은 콘텐츠 영역 전환을 위한 내비게이션이다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| direction | horizontal (기본) · vertical (`tab-group--vertical`) | horizontal |
| badge | badge 없음 · badge 있음 (`badge badge--brand badge--pill badge--line` 추가) | badge 없음 |
| state | default · hover · selected(`tab--selected`) · disabled(`tab--disabled`) | default |

---

## 사용 지침

| 상황 | 방향 |
|------|------|
| 콘텐츠 영역 위에 탭 배치 | horizontal (기본) |
| 사이드·좌측 내비게이션에 탭 배치 | vertical (`tab-group--vertical`) |

**제약**
- `tab-group`은 탭 버튼만 포함. `tab-panel`은 `tab-group` 밖 형제 요소로 배치한다.
- 탭은 반드시 2개 이상. 전환 대상이 없으면 단독 제목·헤더로 처리한다.
- 즉시 반영되는 모드·단위 전환(예: 조회 기간, 차트 단위)에는 Segment를 사용한다.

---

## 동작

항상 하나의 탭만 선택 상태를 유지한다. 선택된 탭의 `tab-panel`만 표시되고 나머지는 `hidden` 처리된다. 키보드 방향키로 탭 이동, `Enter`/`Space`로 선택한다.

| 이벤트 | 동작 |
|--------|------|
| 미선택 탭 클릭 | 기존 선택 해제 + 클릭 탭에 `tab--selected` + `aria-selected="true"` + 대응 panel 표시 |
| 선택된 탭 클릭 | 무시 |
| `←` · `→` (수평 탭 포커스 중) | 이전·다음 탭으로 포커스 이동 (방향 순환) |
| `↑` · `↓` (세로 탭 포커스 중) | 이전·다음 탭으로 포커스 이동 (방향 순환) |
| `Enter` · `Space` (포커스된 탭) | 해당 탭 선택 + panel 전환 |
| `Home` | 첫 번째 탭으로 이동 |
| `End` | 마지막 탭으로 이동 |

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-3xl)">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">badge 없음</p>
  <div id="demo-tab-1" class="tab-group" role="tablist" aria-label="업무 현황">
    <span class="tab-group__slider" aria-hidden="true"></span>
    <button class="tab tab--selected" role="tab" aria-selected="true" aria-controls="demo-panel-1a" id="demo-tab-1a" tabindex="0">
      <span class="tab__label">전체</span>
    </button>
    <button class="tab" role="tab" aria-selected="false" aria-controls="demo-panel-1b" id="demo-tab-1b" tabindex="-1">
      <span class="tab__label">진행 중</span>
    </button>
    <button class="tab" role="tab" aria-selected="false" aria-controls="demo-panel-1c" id="demo-tab-1c" tabindex="-1">
      <span class="tab__label">완료</span>
    </button>
    <button class="tab tab--disabled" role="tab" aria-selected="false" aria-controls="demo-panel-1d" id="demo-tab-1d" tabindex="-1" disabled aria-disabled="true">
      <span class="tab__label">보관됨</span>
    </button>
  </div>
  <div class="tab-panel" id="demo-panel-1a" role="tabpanel" aria-labelledby="demo-tab-1a">
    <p class="text-helper" style="color:var(--color-text-subtle)">전체 패널 콘텐츠</p>
  </div>
  <div class="tab-panel" id="demo-panel-1b" role="tabpanel" aria-labelledby="demo-tab-1b" hidden>
    <p class="text-helper" style="color:var(--color-text-subtle)">진행 중 패널 콘텐츠</p>
  </div>
  <div class="tab-panel" id="demo-panel-1c" role="tabpanel" aria-labelledby="demo-tab-1c" hidden>
    <p class="text-helper" style="color:var(--color-text-subtle)">완료 패널 콘텐츠</p>
  </div>
  <div class="tab-panel" id="demo-panel-1d" role="tabpanel" aria-labelledby="demo-tab-1d" hidden>
    <p class="text-helper" style="color:var(--color-text-subtle)">보관됨 패널 콘텐츠</p>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">badge 있음</p>
  <div id="demo-tab-2" class="tab-group" role="tablist" aria-label="신고 현황">
    <span class="tab-group__slider" aria-hidden="true"></span>
    <button class="tab tab--selected" role="tab" aria-selected="true" aria-controls="demo-panel-2a" id="demo-tab-2a" tabindex="0">
      <span class="tab__label">신고 대상자</span>
      <span class="badge badge--brand badge--pill badge--line" aria-hidden="true">10</span>
    </button>
    <button class="tab" role="tab" aria-selected="false" aria-controls="demo-panel-2b" id="demo-tab-2b" tabindex="-1">
      <span class="tab__label">피부양자 등록 대상자</span>
    </button>
    <button class="tab" role="tab" aria-selected="false" aria-controls="demo-panel-2c" id="demo-tab-2c" tabindex="-1">
      <span class="tab__label">임시저장&amp;신고이력</span>
    </button>
  </div>
  <div class="tab-panel" id="demo-panel-2a" role="tabpanel" aria-labelledby="demo-tab-2a">
    <p class="text-helper" style="color:var(--color-text-subtle)">신고 대상자 패널</p>
  </div>
  <div class="tab-panel" id="demo-panel-2b" role="tabpanel" aria-labelledby="demo-tab-2b" hidden>
    <p class="text-helper" style="color:var(--color-text-subtle)">피부양자 등록 대상자 패널</p>
  </div>
  <div class="tab-panel" id="demo-panel-2c" role="tabpanel" aria-labelledby="demo-tab-2c" hidden>
    <p class="text-helper" style="color:var(--color-text-subtle)">임시저장&신고이력 패널</p>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로 (vertical)</p>
  <div style="display:flex;gap:var(--space-gap-xl)">
    <div id="demo-vtab" class="tab-group tab-group--vertical" role="tablist" aria-label="인사 메뉴" aria-orientation="vertical" style="width:200px">
      <span class="tab-group__slider" aria-hidden="true"></span>
      <button class="tab tab--selected" role="tab" aria-selected="true" aria-controls="demo-vpanel-1" id="demo-vtab-1" tabindex="0"><span class="tab__label">인사정보</span></button>
      <button class="tab" role="tab" aria-selected="false" aria-controls="demo-vpanel-2" id="demo-vtab-2" tabindex="-1"><span class="tab__label">학력·자격·경력</span></button>
      <button class="tab" role="tab" aria-selected="false" aria-controls="demo-vpanel-3" id="demo-vtab-3" tabindex="-1"><span class="tab__label">급여 정보</span></button>
      <button class="tab" role="tab" aria-selected="false" aria-controls="demo-vpanel-4" id="demo-vtab-4" tabindex="-1"><span class="tab__label">근무 정보</span></button>
      <button class="tab" role="tab" aria-selected="false" aria-controls="demo-vpanel-5" id="demo-vtab-5" tabindex="-1"><span class="tab__label">등록·발급 서류</span></button>
    </div>
    <div style="flex:1;align-self:center">
      <div class="tab-panel" id="demo-vpanel-1" role="tabpanel" aria-labelledby="demo-vtab-1">
        <p class="text-helper" style="color:var(--color-text-subtle)">인사정보 패널</p>
      </div>
      <div class="tab-panel" id="demo-vpanel-2" role="tabpanel" aria-labelledby="demo-vtab-2" hidden>
        <p class="text-helper" style="color:var(--color-text-subtle)">학력·자격·경력 패널</p>
      </div>
      <div class="tab-panel" id="demo-vpanel-3" role="tabpanel" aria-labelledby="demo-vtab-3" hidden>
        <p class="text-helper" style="color:var(--color-text-subtle)">급여 정보 패널</p>
      </div>
      <div class="tab-panel" id="demo-vpanel-4" role="tabpanel" aria-labelledby="demo-vtab-4" hidden>
        <p class="text-helper" style="color:var(--color-text-subtle)">근무 정보 패널</p>
      </div>
      <div class="tab-panel" id="demo-vpanel-5" role="tabpanel" aria-labelledby="demo-vtab-5" hidden>
        <p class="text-helper" style="color:var(--color-text-subtle)">등록·발급 서류 패널</p>
      </div>
    </div>
  </div>
</div>

</div>
<script>
(function() {
  function updateSlider(group, animate) {
    var slider = group.querySelector('.tab-group__slider');
    var selected = group.querySelector('.tab--selected');
    if (!slider || !selected) return;
    var isVertical = group.classList.contains('tab-group--vertical');
    if (!animate) slider.style.transition = 'none';
    if (isVertical) {
      slider.style.height = selected.offsetHeight + 'px';
      slider.style.transform = 'translateY(' + selected.offsetTop + 'px)';
    } else {
      slider.style.width = selected.offsetWidth + 'px';
      slider.style.transform = 'translateX(' + selected.offsetLeft + 'px)';
    }
    if (!animate) { slider.offsetWidth; slider.style.transition = ''; }
  }

  function initTabGroup(group) {
    var tabs = Array.from(group.querySelectorAll('[role="tab"]:not([disabled])'));
    var isVertical = group.classList.contains('tab-group--vertical');
    updateSlider(group, false);

    function selectTab(tab) {
      var allTabs = Array.from(group.querySelectorAll('[role="tab"]'));
      allTabs.forEach(function(t) {
        t.classList.remove('tab--selected');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        var panelId = t.getAttribute('aria-controls');
        if (panelId) {
          var panel = stage.querySelector('#' + panelId);
          if (panel) panel.hidden = true;
        }
      });
      tab.classList.add('tab--selected');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      var panelId = tab.getAttribute('aria-controls');
      if (panelId) {
        var panel = stage.querySelector('#' + panelId);
        if (panel) panel.hidden = false;
      }
      updateSlider(group, true);
    }

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        selectTab(tab);
      });
      tab.addEventListener('keydown', function(e) {
        var cur = tabs.indexOf(tab);
        var next = -1;
        if (isVertical) {
          if (e.key === 'ArrowDown') next = (cur + 1) % tabs.length;
          if (e.key === 'ArrowUp')   next = (cur - 1 + tabs.length) % tabs.length;
        } else {
          if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
          if (e.key === 'ArrowLeft')  next = (cur - 1 + tabs.length) % tabs.length;
        }
        if (e.key === 'Home') next = 0;
        if (e.key === 'End')  next = tabs.length - 1;
        if (next < 0) return;
        e.preventDefault();
        tabs[next].focus();
      });
    });
  }

  stage.querySelectorAll('.tab-group[role="tablist"]').forEach(initTabGroup);
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.tab-group[role="tablist"][aria-label="..."] — position:relative 필수. tablist 역할, 레이블 필수.
- slider = span.tab-group__slider[aria-hidden="true"] — 첫 번째 자식. JS가 width·translateX를 갱신해 선택 탭 아래로 이동. Segment 슬라이더와 동일한 패턴.
- tab = button.tab[role="tab"][aria-selected="true/false"][tabindex="0/-1"][aria-controls="panel-id"][id="tab-id"] — 선택된 탭만 tabindex="0", 나머지는 -1. position:relative + z-index:1 로 slider 위에 렌더.
- tab__label = span.tab__label — 탭 텍스트.
- badge = span.badge.badge--brand.badge--pill.badge--line[aria-hidden="true"] — 선택적 카운트. badge 컴포넌트 직접 사용. 시각 전용, aria-hidden 필수.
- 선택 상태: tab--selected + aria-selected="true" + tabindex="0". 수평: slider 배경(10% brand) + 테두리 라인. 세로: slider 배경(solid brand fill) + 흰 텍스트.
- vertical = tab-group--vertical + aria-orientation="vertical". JS가 translateY·height로 slider 갱신. 키보드는 ↑↓ 방향키.
- 비활성: tab--disabled + disabled + aria-disabled="true" + tabindex="-1".
- panel = div.tab-panel[role="tabpanel"][aria-labelledby="tab-id"][id="panel-id"] — 대응 탭이 선택된 경우만 표시. 나머지는 hidden.
- 키보드 로빙 tabindex 패턴: 선택된 탭만 tabindex="0", 방향키로 포커스·선택 이동.
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">상태</span>
  <div class="tab-group" role="tablist" aria-label="상태 예시" style="pointer-events:none">
    <span class="tab-group__slider" aria-hidden="true"></span>
    <button class="tab" role="tab" aria-selected="false" tabindex="-1">
      <span class="tab__label">기본</span>
    </button>
    <button class="tab tab--selected" role="tab" aria-selected="true" tabindex="0">
      <span class="tab__label">선택됨</span>
    </button>
    <button class="tab tab--disabled" role="tab" aria-selected="false" tabindex="-1" disabled aria-disabled="true">
      <span class="tab__label">비활성</span>
    </button>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">badge</span>
  <div class="tab-group" role="tablist" aria-label="badge 예시" style="pointer-events:none">
    <span class="tab-group__slider" aria-hidden="true"></span>
    <button class="tab" role="tab" aria-selected="false" tabindex="-1">
      <span class="tab__label">기본</span>
      <span class="badge badge--brand badge--pill badge--line" aria-hidden="true">5</span>
    </button>
    <button class="tab tab--selected" role="tab" aria-selected="true" tabindex="0">
      <span class="tab__label">선택됨</span>
      <span class="badge badge--brand badge--pill badge--line" aria-hidden="true">10</span>
    </button>
    <button class="tab tab--disabled" role="tab" aria-selected="false" tabindex="-1" disabled aria-disabled="true">
      <span class="tab__label">비활성</span>
      <span class="badge badge--brand badge--pill badge--line" aria-hidden="true">2</span>
    </button>
  </div>
</div>


<div class="anatomy-row">
  <span class="anatomy-label">vertical</span>
  <div class="tab-group tab-group--vertical" role="tablist" aria-label="세로 탭 예시" aria-orientation="vertical" style="pointer-events:none;width:160px">
    <span class="tab-group__slider" aria-hidden="true"></span>
    <button class="tab tab--selected" role="tab" aria-selected="true" tabindex="0">
      <span class="tab__label">선택됨</span>
    </button>
    <button class="tab" role="tab" aria-selected="false" tabindex="-1">
      <span class="tab__label">기본</span>
    </button>
    <button class="tab tab--disabled" role="tab" aria-selected="false" tabindex="-1" disabled aria-disabled="true">
      <span class="tab__label">비활성</span>
    </button>
  </div>
</div>

</div>
<script>
(function() {
  stage.querySelectorAll('.tab-group').forEach(function(group) {
    var slider = group.querySelector('.tab-group__slider');
    var selected = group.querySelector('.tab--selected');
    if (!slider || !selected) return;
    var isVertical = group.classList.contains('tab-group--vertical');
    slider.style.transition = 'none';
    if (isVertical) {
      slider.style.height = selected.offsetHeight + 'px';
      slider.style.transform = 'translateY(' + selected.offsetTop + 'px)';
    } else {
      slider.style.width = selected.offsetWidth + 'px';
      slider.style.transform = 'translateX(' + selected.offsetLeft + 'px)';
    }
    slider.offsetWidth;
    slider.style.transition = '';
  });
})();
</script>
:::

---

## CSS

```css
/* ── Tab Group (tablist) ── */
/* tab-group은 탭 아이템만 포함. panel은 tab-group 밖 별도 형제 요소로 배치 */
/* position:relative — slider 기준점 */
.tab-group {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-gap-2xs);
  padding-block: var(--space-inset-xs);
}

/* ── Slider — 선택 탭 배경. JS가 width·translateX 갱신 ── */
.tab-group__slider {
  position: absolute;
  top: var(--space-inset-xs); /* padding-block과 동일 — 탭 상단에 정렬 */
  left: 0;
  height: var(--height-spacious);
  border-radius: var(--radius-md);
  background: var(--color-action-brand-selected);
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-brand-subtle);
  pointer-events: none;
  transition: width var(--duration-base) var(--easing-symmetric),
              transform var(--duration-base) var(--easing-symmetric);
}

/* ── Tab Item ── */
.tab {
  position: relative;
  z-index: 1; /* slider 위에 텍스트 렌더 */
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
  padding: 0 var(--space-inset-xl);
  height: var(--height-spacious);
  border: none;
  border-radius: var(--radius-md);
  background: none;
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-body);
  line-height: var(--line-height-ui);
  color: var(--color-text-label);
  white-space: nowrap;
  /* color 전환을 slider duration-base와 맞춤 — 텍스트가 먼저 파랗게 변하는 flash 방지 */
  transition: color var(--duration-base) var(--easing-symmetric);
}

/* ── Hover (미선택 탭만) ── */
/* background 없음 — slider가 배경을 담당. 버튼에 배경을 주면 클릭 순간 즉시 사라지며 flash 발생 */
.tab:hover:not(:disabled):not(.tab--selected) {
  color: var(--color-text-brand);
}

/* ── Focus ── */
.tab:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Selected — slider가 배경 담당, 탭은 color·weight만 변경 ── */
.tab--selected {
  color: var(--color-text-brand);
  font-weight: var(--font-weight-heading);
}

/* ── Disabled ── */
.tab--disabled,
.tab:disabled {
  color: var(--color-text-disabled);
  cursor: default;
  pointer-events: none;
}

/* ── Badge — badge.badge--brand.badge--pill.badge--line 컴포넌트 직접 사용 ── */
/* disabled 탭 내 badge: 테두리·텍스트 disabled 색으로 오버라이드 */
.tab--disabled .badge,
.tab:disabled .badge {
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-disabled);
  color: var(--color-text-disabled);
}

/* ── Vertical variant ── */
/* tab-group--vertical: 세로 배치. aria-orientation="vertical" 필수 */
.tab-group--vertical {
  flex-direction: column;
  gap: 0;
  padding-block: 0;
  align-items: stretch;
}

/* 세로 slider — width는 항상 100%, JS가 height·translateY 갱신 */
.tab-group--vertical .tab-group__slider {
  top: 0;
  width: 100%;
  background: var(--color-fill-brand); /* solid fill — 수평(10% brand)과 다름 */
  box-shadow: none;
  transition: height var(--duration-base) var(--easing-symmetric),
              transform var(--duration-base) var(--easing-symmetric);
}

.tab-group--vertical .tab {
  width: 100%;
  height: var(--height-loose);
  justify-content: flex-start;
  white-space: normal;
  border-radius: 0;
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

.tab-group--vertical .tab:first-of-type {
  border-top: none;
}

/* 선택 탭 위·아래 구분선 제거 — 슬라이더 영역 침범 방지 */
.tab-group--vertical .tab--selected,
.tab-group--vertical .tab--selected + .tab {
  border-top: none;
}

/* 선택됨: solid fill 위 흰 텍스트 */
.tab-group--vertical .tab--selected {
  color: var(--color-text-inverse);
}

/* ── Tab Panel ── */
/* hidden 제거 시 animation 자동 재생 — display:none에서 복귀할 때마다 트리거 */
@keyframes tab-panel-enter {
  from { opacity: 0; transform: translateY(var(--space-inset-xs)); }
  to   { opacity: 1; transform: translateY(0); }
}
.tab-panel {
  padding: var(--space-inset-2xl) 0;
  animation: tab-panel-enter var(--duration-base) var(--easing-enter);
}
@media (prefers-reduced-motion: reduce) {
  .tab-panel { animation: none; }
}
```

---

## 접근성

드롭다운 유형이 아닌 tablist/tabpanel 패턴 (`accessibility.md` 탭 행 적용).

| 상황 | 마크업 |
|------|--------|
| 탭 그룹 | `<div role="tablist" aria-label="그룹 이름">` |
| 탭 | `<button role="tab" aria-selected="true/false" aria-controls="panel-id" id="tab-id">` |
| 선택된 탭 | `tabindex="0"`. 나머지 탭은 `tabindex="-1"` (roving tabindex 패턴) |
| 비활성 탭 | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| badge | `span.badge.badge--brand.badge--pill.badge--line[aria-hidden="true"]` — 카운트는 시각 전용. 필요 시 탭 레이블에 포함: `aria-label="신고 대상자, 10건"` |
| 패널 | `<div role="tabpanel" id="panel-id" aria-labelledby="tab-id">`. 비활성 패널은 `hidden` |
| 세로 탭 그룹 | `aria-orientation="vertical"` 추가 — 스크린 리더가 ↑↓ 키 안내 |
| 키보드 (수평) | `←` · `→`: 탭 이동. `Home`/`End`: 첫·마지막 탭. `Enter`/`Space`: 선택 |
| 키보드 (세로) | `↑` · `↓`: 탭 이동. `Home`/`End`: 첫·마지막 탭. `Enter`/`Space`: 선택 |

```js
// Tab 키보드 핸들러 예시 (roving tabindex)
// Enter·Space는 <button> 기본 동작으로 클릭 이벤트가 자동 발생 — keydown 처리 불필요
var isVertical = group.classList.contains('tab-group--vertical');
tabs.forEach(function(tab) {
  tab.addEventListener('keydown', function(e) {
    var cur = tabs.indexOf(tab);
    var next = -1;
    if (isVertical) {
      if (e.key === 'ArrowDown') next = (cur + 1) % tabs.length;
      if (e.key === 'ArrowUp')   next = (cur - 1 + tabs.length) % tabs.length;
    } else {
      if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
      if (e.key === 'ArrowLeft')  next = (cur - 1 + tabs.length) % tabs.length;
    }
    if (e.key === 'Home') next = 0;
    if (e.key === 'End')  next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    tabs[next].focus();
  });
});
```

---

## Do / Don't

> ✅ DO — `tab-group`에 `aria-label` 또는 `aria-labelledby` 제공
> 화면 낭독기가 어떤 탭 그룹인지 알 수 있도록 레이블 필수

> ❌ DON'T — tab-group 안에 panel 포함
> `tab-group`은 탭 버튼만 포함. panel은 `tab-group` 밖 형제 요소로 배치

> ✅ DO — badge에 `aria-hidden="true"` 적용
> 카운트는 시각 전용. 수량 정보가 중요하면 탭 버튼에 `aria-label="신고 대상자, 10건"` 추가

> ❌ DON'T — Tab을 Segment 대신 사용
> 즉시 반영되는 모드·단위 전환에는 Segment 사용. Tab은 반드시 콘텐츠 영역(tabpanel) 전환에만 사용한다

> ❌ DON'T — 탭이 1개뿐인 tab-group 사용
> 전환 대상이 없으면 탭 컴포넌트가 아닌 단독 제목·헤더로 처리한다
