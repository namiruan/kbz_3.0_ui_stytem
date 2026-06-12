---
file: components/molecules/tab.md
version: 0.8.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/typography.md, tokens/motion.md, components/atoms/badge.md, components/atoms/button.md
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
| overflow | false (기본) · true (`tab-scroller` 래퍼 사용) | false |
| actions | 없음 (기본) · 있음 (`tab-header` 래퍼 사용) | 없음 |

---

## 사용 지침

| 상황 | 방향 |
|------|------|
| 콘텐츠 영역 위에 탭 배치 | horizontal (기본) |
| 사이드·좌측 내비게이션에 탭 배치 | vertical (`tab-group--vertical`) |

**제약**
- `tab-group`은 탭 버튼만 포함. `tab-panel`은 `tab-group`(또는 `tab-header`) 밖 형제 요소로 배치한다.
- 탭은 반드시 2개 이상. 전환 대상이 없으면 단독 제목·헤더로 처리한다.
- 즉시 반영되는 모드·단위 전환(예: 조회 기간, 차트 단위)에는 Segment를 사용한다.
- 탭이 많아 컨테이너를 넘칠 가능성이 있으면 `tab-scroller` 래퍼로 감싼다.
- 탭 바 오른쪽에 액션 버튼이 필요하면 `tab-header` 래퍼를 사용한다. `tab-group`과 `tab-header__actions`를 감싸며, `tab-panel`은 `tab-header` 밖 형제로 배치한다. flex div로 임시 래핑하지 않는다.

---

## 동작

항상 하나의 탭만 선택 상태를 유지한다. 선택된 탭의 `tab-panel`만 표시되고 나머지는 `hidden` 처리된다. 키보드 방향키로 탭 이동, `Enter`/`Space`로 선택한다.

**hidden 컨테이너 안의 탭 초기화**
`tab-group`이 `hidden` 상태인 컨테이너 안에 있을 때 `initTab`을 호출하면 `offsetWidth / offsetLeft = 0`이 되어 슬라이더가 0으로 고정된다. 컨테이너가 visible 된 뒤 `dataset.initTab`을 삭제하고 `initTab`을 다시 호출해야 한다.

재초기화 리스너는 반드시 `initTab()` **이후**에 등록해야 한다. 먼저 등록하면 패널 show 로직보다 재초기화가 먼저 실행되어 같은 문제가 반복된다.

```js
// 올바른 순서 — initTab 먼저, 커스텀 리스너 나중
initTab(container);
trigger.addEventListener('click', function() {
  group.dataset.initTab = undefined; // 또는 delete group.dataset.initTab
  initTab(group.closest('[hidden]') || container);
});
```

| 이벤트 | 동작 |
|--------|------|
| 미선택 탭 클릭 | 기존 선택 해제 + 클릭 탭에 `tab--selected` + `aria-selected="true"` + 대응 panel 표시 |
| 선택된 탭 클릭 | 무시 |
| `←` · `→` (수평 탭 포커스 중) | 이전·다음 탭으로 포커스 이동 (방향 순환) |
| `↑` · `↓` (세로 탭 포커스 중) | 이전·다음 탭으로 포커스 이동 (방향 순환) |
| `Enter` · `Space` (포커스된 탭) | 해당 탭 선택 + panel 전환 |
| `Home` | 첫 번째 탭으로 이동 |
| `End` | 마지막 탭으로 이동 |
| 화살표 버튼 클릭 | track을 해당 방향으로 반 화면 스크롤 — `tab-scroller` 사용 시 |
| track 양 끝 도달 | 해당 방향 `tab-scroller__btn` 자동 `tab-scroller__btn--hidden` 토글 — overflow 없으면 양쪽 모두 숨김 |
| 탭 선택·포커스 이동 | 선택·포커스된 탭이 track 밖이면 보이도록 스크롤 보정 |

```js init
/* Tab — slider 위치·키보드 내비게이션·overflow scroller 초기화 */
function initTab(container) {
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

  /* tab-scroller__track 안에 있을 때 선택·포커스된 탭이 보이도록 track 스크롤 보정 */
  function scrollTabIntoView(tab) {
    var track = tab.closest('.tab-scroller__track');
    if (!track) return;
    var isVertical = tab.closest('.tab-group').classList.contains('tab-group--vertical');
    if (isVertical) {
      if (tab.offsetTop < track.scrollTop) {
        track.scrollTo({ top: tab.offsetTop, behavior: 'smooth' });
      } else if (tab.offsetTop + tab.offsetHeight > track.scrollTop + track.clientHeight) {
        track.scrollTo({ top: tab.offsetTop + tab.offsetHeight - track.clientHeight, behavior: 'smooth' });
      }
    } else {
      if (tab.offsetLeft < track.scrollLeft) {
        track.scrollTo({ left: tab.offsetLeft, behavior: 'smooth' });
      } else if (tab.offsetLeft + tab.offsetWidth > track.scrollLeft + track.clientWidth) {
        track.scrollTo({ left: tab.offsetLeft + tab.offsetWidth - track.clientWidth, behavior: 'smooth' });
      }
    }
  }

  function initTabGroup(group) {
    var tabs = Array.from(group.querySelectorAll('[role="tab"]:not([disabled])'));
    var isVertical = group.classList.contains('tab-group--vertical');

    function selectTab(tab) {
      var allTabs = Array.from(group.querySelectorAll('[role="tab"]'));
      allTabs.forEach(function(t) {
        t.classList.remove('tab--selected');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        var panelId = t.getAttribute('aria-controls');
        if (panelId) {
          var panel = container.querySelector('#' + panelId);
          if (panel) panel.hidden = true;
        }
      });
      tab.classList.add('tab--selected');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      var panelId = tab.getAttribute('aria-controls');
      if (panelId) {
        var panel = container.querySelector('#' + panelId);
        if (panel) panel.hidden = false;
      }
      updateSlider(group, true);
      scrollTabIntoView(tab);
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
        scrollTabIntoView(tabs[next]);
      });
    });
  }

  function initTabScroller(scroller) {
    if (scroller.dataset.initTab) return;
    scroller.dataset.initTab = '1';
    var track = scroller.querySelector('.tab-scroller__track');
    var prevBtn = scroller.querySelector('.tab-scroller__btn--prev');
    var nextBtn = scroller.querySelector('.tab-scroller__btn--next');
    var isVertical = scroller.classList.contains('tab-scroller--vertical');

    function updateArrows() {
      var pos    = isVertical ? track.scrollTop  : track.scrollLeft;
      var maxPos = isVertical
        ? track.scrollHeight - track.clientHeight
        : track.scrollWidth  - track.clientWidth;
      prevBtn.classList.toggle('tab-scroller__btn--hidden', pos <= 0);
      nextBtn.classList.toggle('tab-scroller__btn--hidden', maxPos <= 0 || pos >= maxPos - 1);
    }

    prevBtn.addEventListener('click', function() {
      var amount = (isVertical ? track.clientHeight : track.clientWidth) * 0.5;
      track.scrollBy(isVertical ? { top: -amount, behavior: 'smooth' } : { left: -amount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function() {
      var amount = (isVertical ? track.clientHeight : track.clientWidth) * 0.5;
      track.scrollBy(isVertical ? { top: amount, behavior: 'smooth' } : { left: amount, behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateArrows);
    new ResizeObserver(updateArrows).observe(track);
    updateArrows();
  }

  /* 1) 모든 tab-group의 슬라이더 초기 위치 설정 (static·interactive 공통) */
  container.querySelectorAll('.tab-group').forEach(function(group) {
    if (group.dataset.initTab) return;
    group.dataset.initTab = '1';
    updateSlider(group, false);
  });
  /* 2) interactive tablist에만 핸들러 부착 */
  container.querySelectorAll('.tab-group[role="tablist"]').forEach(initTabGroup);
  /* 3) overflow scroller 초기화 */
  container.querySelectorAll('.tab-scroller').forEach(initTabScroller);
}
if (window.__componentInits && !window.__componentInits.initTab) window.__componentInits.initTab = initTab;
```

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-3xl)">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">가로</p>
  <div class="tab-scroller" style="max-width:280px">
    <button class="tab-scroller__btn tab-scroller__btn--hidden tab-scroller__btn--prev" aria-label="이전 탭 보기" aria-hidden="true" tabindex="-1">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 12 6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <div class="tab-scroller__track">
      <div id="demo-scroll-h" class="tab-group" role="tablist" aria-label="주요 메뉴">
        <span class="tab-group__slider" aria-hidden="true"></span>
        <button class="tab tab--selected" role="tab" aria-selected="true" id="demo-sh-1" aria-controls="demo-sp-1" tabindex="0"><span class="tab__label">대시보드</span></button>
        <button class="tab" role="tab" aria-selected="false" id="demo-sh-2" aria-controls="demo-sp-2" tabindex="-1"><span class="tab__label">업무 현황</span></button>
        <button class="tab" role="tab" aria-selected="false" id="demo-sh-3" aria-controls="demo-sp-3" tabindex="-1"><span class="tab__label">보고서 관리</span></button>
        <button class="tab" role="tab" aria-selected="false" id="demo-sh-4" aria-controls="demo-sp-4" tabindex="-1"><span class="tab__label">팀 현황</span></button>
        <button class="tab" role="tab" aria-selected="false" id="demo-sh-5" aria-controls="demo-sp-5" tabindex="-1"><span class="tab__label">설정</span></button>
      </div>
    </div>
    <button class="tab-scroller__btn tab-scroller__btn--next" aria-label="다음 탭 보기" aria-hidden="true" tabindex="-1">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </div>
  <div class="tab-panel" id="demo-sp-1" role="tabpanel" aria-labelledby="demo-sh-1"><p class="text-helper" style="color:var(--color-text-subtle)">대시보드 패널</p></div>
  <div class="tab-panel" id="demo-sp-2" role="tabpanel" aria-labelledby="demo-sh-2" hidden><p class="text-helper" style="color:var(--color-text-subtle)">업무 현황 패널</p></div>
  <div class="tab-panel" id="demo-sp-3" role="tabpanel" aria-labelledby="demo-sh-3" hidden><p class="text-helper" style="color:var(--color-text-subtle)">보고서 관리 패널</p></div>
  <div class="tab-panel" id="demo-sp-4" role="tabpanel" aria-labelledby="demo-sh-4" hidden><p class="text-helper" style="color:var(--color-text-subtle)">팀 현황 패널</p></div>
  <div class="tab-panel" id="demo-sp-5" role="tabpanel" aria-labelledby="demo-sh-5" hidden><p class="text-helper" style="color:var(--color-text-subtle)">설정 패널</p></div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">세로</p>
  <div style="display:flex;gap:var(--space-gap-xl)">
    <div class="tab-scroller tab-scroller--vertical" style="width:180px;max-height:160px">
      <button class="tab-scroller__btn tab-scroller__btn--hidden tab-scroller__btn--prev" aria-label="이전 탭 보기" aria-hidden="true" tabindex="-1">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 10l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="tab-scroller__track">
        <div id="demo-scroll-v" class="tab-group tab-group--vertical" role="tablist" aria-label="설정 메뉴" aria-orientation="vertical">
          <span class="tab-group__slider" aria-hidden="true"></span>
          <button class="tab tab--selected" role="tab" aria-selected="true" id="demo-sv-1" aria-controls="demo-svp-1" tabindex="0"><span class="tab__label">기본 정보</span></button>
          <button class="tab" role="tab" aria-selected="false" id="demo-sv-2" aria-controls="demo-svp-2" tabindex="-1"><span class="tab__label">보안 설정</span></button>
          <button class="tab" role="tab" aria-selected="false" id="demo-sv-3" aria-controls="demo-svp-3" tabindex="-1"><span class="tab__label">알림 설정</span></button>
          <button class="tab" role="tab" aria-selected="false" id="demo-sv-4" aria-controls="demo-svp-4" tabindex="-1"><span class="tab__label">권한 관리</span></button>
          <button class="tab" role="tab" aria-selected="false" id="demo-sv-5" aria-controls="demo-svp-5" tabindex="-1"><span class="tab__label">연동 서비스</span></button>
          <button class="tab" role="tab" aria-selected="false" id="demo-sv-6" aria-controls="demo-svp-6" tabindex="-1"><span class="tab__label">로그 기록</span></button>
        </div>
      </div>
      <button class="tab-scroller__btn tab-scroller__btn--next" aria-label="다음 탭 보기" aria-hidden="true" tabindex="-1">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <div style="flex:1;align-self:center">
      <div class="tab-panel" id="demo-svp-1" role="tabpanel" aria-labelledby="demo-sv-1"><p class="text-helper" style="color:var(--color-text-subtle)">기본 정보 패널</p></div>
      <div class="tab-panel" id="demo-svp-2" role="tabpanel" aria-labelledby="demo-sv-2" hidden><p class="text-helper" style="color:var(--color-text-subtle)">보안 설정 패널</p></div>
      <div class="tab-panel" id="demo-svp-3" role="tabpanel" aria-labelledby="demo-sv-3" hidden><p class="text-helper" style="color:var(--color-text-subtle)">알림 설정 패널</p></div>
      <div class="tab-panel" id="demo-svp-4" role="tabpanel" aria-labelledby="demo-sv-4" hidden><p class="text-helper" style="color:var(--color-text-subtle)">권한 관리 패널</p></div>
      <div class="tab-panel" id="demo-svp-5" role="tabpanel" aria-labelledby="demo-sv-5" hidden><p class="text-helper" style="color:var(--color-text-subtle)">연동 서비스 패널</p></div>
      <div class="tab-panel" id="demo-svp-6" role="tabpanel" aria-labelledby="demo-sv-6" hidden><p class="text-helper" style="color:var(--color-text-subtle)">로그 기록 패널</p></div>
    </div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">탭 바 + 액션 버튼 (tab-header)</p>
  <div class="tab-header">
    <div class="tab-group" role="tablist" aria-label="인사정보">
      <span class="tab-group__slider" aria-hidden="true"></span>
      <button class="tab tab--selected" role="tab" aria-selected="true" id="demo-ha-1" aria-controls="demo-hap-1" tabindex="0"><span class="tab__label">인사정보</span></button>
      <button class="tab" role="tab" aria-selected="false" id="demo-ha-2" aria-controls="demo-hap-2" tabindex="-1"><span class="tab__label">인사노트</span></button>
    </div>
    <div class="tab-header__actions">
      <button class="btn btn--secondary btn--sm">액션 버튼</button>
    </div>
  </div>
  <div class="tab-panel" id="demo-hap-1" role="tabpanel" aria-labelledby="demo-ha-1"><p class="text-helper" style="color:var(--color-text-subtle)">인사정보 패널</p></div>
  <div class="tab-panel" id="demo-hap-2" role="tabpanel" aria-labelledby="demo-ha-2" hidden><p class="text-helper" style="color:var(--color-text-subtle)">인사노트 패널</p></div>
</div>

</div>
<script>
initTab(stage);
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
- overflow = div.tab-scroller > button.tab-scroller__btn--prev + div.tab-scroller__track > div.tab-group + button.tab-scroller__btn--next. 탭 목록 overflow 시 사용하는 선택적 래퍼. tab-scroller__btn에 aria-hidden="true" + tabindex="-1" 필수(포인터 전용). prev 버튼은 초기 scrollLeft/scrollTop=0이므로 tab-scroller__btn--hidden 클래스를 초기에 부여. JS initTabScroller가 updateArrows()를 즉시 호출해 화살표 가시 상태를 갱신. 세로 overflow: tab-scroller에 tab-scroller--vertical 추가.
- tab-header = div.tab-header — 탭 바 오른쪽에 액션 버튼이 필요할 때 사용하는 선택적 래퍼. tab-group + tab-header__actions를 flex 행으로 배치. tab-panel은 반드시 tab-header 밖 형제 요소로 배치. tab-header__actions = div.tab-header__actions — 우측 버튼 그룹. 직접 flex div + inline style로 대체하지 않는다.
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

<div class="anatomy-row">
  <span class="anatomy-label">overflow</span>
  <div style="max-width:280px">
    <div class="tab-scroller">
      <button class="tab-scroller__btn tab-scroller__btn--hidden tab-scroller__btn--prev" aria-label="이전 탭 보기" aria-hidden="true" tabindex="-1">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 12 6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="tab-scroller__track">
        <div class="tab-group" role="tablist" aria-label="overflow 예시" style="pointer-events:none">
          <span class="tab-group__slider" aria-hidden="true"></span>
          <button class="tab tab--selected" role="tab" aria-selected="true" tabindex="0"><span class="tab__label">첫 번째 탭</span></button>
          <button class="tab" role="tab" aria-selected="false" tabindex="-1"><span class="tab__label">두 번째 탭</span></button>
          <button class="tab" role="tab" aria-selected="false" tabindex="-1"><span class="tab__label">세 번째 탭</span></button>
          <button class="tab" role="tab" aria-selected="false" tabindex="-1"><span class="tab__label">네 번째 탭</span></button>
        </div>
      </div>
      <button class="tab-scroller__btn tab-scroller__btn--next" aria-label="다음 탭 보기" aria-hidden="true" tabindex="-1">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
  </div>
</div>

</div>
<script>
initTab(stage);
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
  .tab-scroller__btn { transition: none; }
}

/* ── Tab Scroller — overflow 시 tab-group을 감싸는 선택적 래퍼 ── */
/* tab-scroller__btn은 role="tablist" 밖에 배치 — 스크린리더 tablist 오염 없음 */
.tab-scroller {
  display: flex;
  align-items: stretch;
}

/* 탭 목록 클리핑 영역. tab-group이 이 안에서 스크롤 */
.tab-scroller__track {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox */
}
.tab-scroller__track::-webkit-scrollbar { display: none; }

/* 화살표 버튼 — icon-button neutral 패턴 참고.
   border 없음 — hover tint만으로 구분. overflow:hidden으로 숨김 전환 중 아이콘 클리핑 */
.tab-scroller__btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--height-compact);
  overflow: hidden;
  border: none;
  background: transparent;
  color: var(--color-text-label);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background var(--duration-fast) var(--easing-base),
              opacity var(--duration-base) var(--easing-symmetric),
              width var(--duration-base) var(--easing-symmetric);
}
.tab-scroller__btn:hover  { background: var(--color-action-neutral-hover); }
.tab-scroller__btn:active { background: var(--color-action-neutral-pressed); }

/* 숨김 상태 — width 축소 + opacity 페이드 동시 전환. JS가 클래스로 토글 */
.tab-scroller__btn--hidden {
  opacity: 0;
  width: 0;
  pointer-events: none;
}

/* ── Tab Header — tab-group + 우측 액션 버튼을 같은 행에 배치하는 선택적 래퍼 ── */
/* tab-panel은 tab-header 밖 형제 요소로 배치. tab-group 안에 버튼을 넣거나
   inline flex div로 대체하면 tab-panel 형제 관계가 깨진다 */
.tab-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 우측 액션 버튼 그룹 */
.tab-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-gap-sm);
  flex-shrink: 0;
}

/* ── 세로 scroller ── */
.tab-scroller--vertical {
  flex-direction: column;
}
.tab-scroller--vertical .tab-scroller__track {
  overflow-x: hidden;
  overflow-y: auto;
}
.tab-scroller--vertical .tab-scroller__btn {
  width: 100%;
  height: var(--height-compact);
  transition: background var(--duration-fast) var(--easing-base),
              opacity var(--duration-base) var(--easing-symmetric),
              height var(--duration-base) var(--easing-symmetric);
}
/* 세로 숨김 — height 축소. width는 100%로 유지 */
.tab-scroller--vertical .tab-scroller__btn--hidden {
  opacity: 0;
  height: 0;
  width: 100%;
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
| 화살표 버튼 | `aria-hidden="true"` + `tabindex="-1"` — 포인터 전용. 키보드 사용자는 방향키 탭 이동 시 자동으로 scroll 보정됨 |
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
    scrollTabIntoView(tabs[next]); /* tab-scroller 사용 시 포커스된 탭이 track 밖이면 보이도록 스크롤 보정 */
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

> ✅ DO — overflow 가능성이 있으면 `tab-scroller` 래퍼 사용
> 화살표 버튼으로 숨겨진 탭에 접근할 수 있다

> ❌ DON'T — `tab-scroller__btn`을 `role="tablist"` 안에 배치
> 화살표 버튼은 tablist 밖에서 scroll 보조만 담당한다

> ✅ DO — 탭 바 옆 액션 버튼이 필요하면 `tab-header` 래퍼 사용
> `div.tab-header > div.tab-group + div.tab-header__actions`. `tab-panel`은 `tab-header` 밖 형제로 배치

> ❌ DON'T — inline `div style="display:flex"` 로 `tab-group`과 버튼을 임시 래핑
> `tab-panel`이 `tab-group`의 형제 관계에서 벗어나고 패턴이 추적 불가능해진다. `tab-header` 패턴을 사용한다
