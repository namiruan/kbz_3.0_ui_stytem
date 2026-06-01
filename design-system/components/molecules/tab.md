---
file: components/molecules/tab.md
version: 0.2.1
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/height.md, tokens/typography.md, tokens/motion.md
---

# Tab

## 개요

콘텐츠 영역을 전환하는 수평 탭 내비게이션. `tab-group`(tablist) + 하나 이상의 `tab`(tab) + 대응하는 `tab-panel`(tabpanel)로 구성한다.

Segment와의 차이 — Segment는 즉시 반영되는 단일 선택 컨트롤(모드·단위 전환)이고, Tab은 콘텐츠 영역 전환을 위한 내비게이션이다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| badge | badge 없음 · badge 있음 (`tab__badge` 추가) | badge 없음 |
| state | default · hover · selected(`tab--selected`) · disabled(`tab--disabled`) | default |

---

## 동작

항상 하나의 탭만 선택 상태를 유지한다. 선택된 탭의 `tab-panel`만 표시되고 나머지는 `hidden` 처리된다. 키보드 방향키로 탭 이동, `Enter`/`Space`로 선택한다.

| 이벤트 | 동작 |
|--------|------|
| 미선택 탭 클릭 | 기존 선택 해제 + 클릭 탭에 `tab--selected` + `aria-selected="true"` + 대응 panel 표시 |
| 선택된 탭 클릭 | 무시 |
| `←` · `→` (탭 포커스 중) | 이전·다음 탭으로 포커스 이동 (방향 순환) |
| `Enter` · `Space` (포커스된 탭) | 해당 탭 선택 + panel 전환 |
| `Home` | 첫 번째 탭으로 이동 |
| `End` | 마지막 탭으로 이동 |

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-3xl)">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">badge 없음</p>
  <div id="demo-tab-1" class="tab-group" role="tablist" aria-label="업무 현황">
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
    <button class="tab tab--selected" role="tab" aria-selected="true" aria-controls="demo-panel-2a" id="demo-tab-2a" tabindex="0">
      <span class="tab__label">신고 대상자</span>
      <span class="tab__badge" aria-hidden="true">10</span>
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

</div>
<script>
(function() {
  function initTabGroup(group) {
    var tabs = Array.from(group.querySelectorAll('[role="tab"]:not([disabled])'));

    function selectTab(tab) {
      var allTabs = Array.from(group.querySelectorAll('[role="tab"]'));
      allTabs.forEach(function(t) {
        t.classList.remove('tab--selected');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        var panelId = t.getAttribute('aria-controls');
        if (panelId) {
          var panel = document.getElementById(panelId);
          if (panel) panel.hidden = true;
        }
      });
      tab.classList.add('tab--selected');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      var panelId = tab.getAttribute('aria-controls');
      if (panelId) {
        var panel = document.getElementById(panelId);
        if (panel) panel.hidden = false;
      }
    }

    tabs.forEach(function(tab, idx) {
      tab.addEventListener('click', function() {
        selectTab(tab);
        tab.focus();
      });
      tab.addEventListener('keydown', function(e) {
        var cur = tabs.indexOf(tab);
        var next = -1;
        if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
        if (e.key === 'ArrowLeft')  next = (cur - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home')       next = 0;
        if (e.key === 'End')        next = tabs.length - 1;
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
- root = div.tab-group[role="tablist"][aria-label="..."] — tablist 역할, 레이블 필수.
- tab = button.tab[role="tab"][aria-selected="true/false"][tabindex="0/-1"][aria-controls="panel-id"][id="tab-id"] — 선택된 탭만 tabindex="0", 나머지는 -1.
- tab__label = span.tab__label — 탭 텍스트.
- tab__badge = span.tab__badge[aria-hidden="true"] — 선택적 카운트. 시각 전용, aria-hidden 필수. badge.md pill--neutral(기본)/pill--brand(선택됨) 패턴과 동일한 색상 사용.
- 선택 상태: tab--selected + aria-selected="true" + tabindex="0". underline 라인 없음 — 배경 채움(fill)으로 선택 표시.
- 비활성: tab--disabled + disabled + aria-disabled="true" + tabindex="-1".
- panel = div.tab-panel[role="tabpanel"][aria-labelledby="tab-id"][id="panel-id"] — 대응 탭이 선택된 경우만 표시. 나머지는 hidden.
- 키보드 로빙 tabindex 패턴: 선택된 탭만 tabindex="0", 방향키로 포커스·선택 이동.
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">상태</span>
  <div class="tab-group" role="tablist" aria-label="상태 예시" style="pointer-events:none">
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
    <button class="tab" role="tab" aria-selected="false" tabindex="-1">
      <span class="tab__label">기본</span>
      <span class="tab__badge" aria-hidden="true">5</span>
    </button>
    <button class="tab tab--selected" role="tab" aria-selected="true" tabindex="0">
      <span class="tab__label">선택됨</span>
      <span class="tab__badge" aria-hidden="true">10</span>
    </button>
    <button class="tab tab--disabled" role="tab" aria-selected="false" tabindex="-1" disabled aria-disabled="true">
      <span class="tab__label">비활성</span>
      <span class="tab__badge" aria-hidden="true">2</span>
    </button>
  </div>
</div>

</div>
:::

---

## CSS

```css
/* ── Tab Group (tablist) ── */
/* tab-group은 탭 아이템만 포함. panel은 tab-group 밖 별도 형제 요소로 배치 */
/* padding-block: 탭 배경이 그룹 상하 경계에 딱 붙지 않도록 2px 여유 */
.tab-group {
  display: flex;
  align-items: center;
  gap: var(--space-gap-2xs);
  padding-block: var(--space-inset-xs);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* ── Tab Item ── */
/* 선택 인디케이터: ::after 라인 없음 — 배경 채움(fill)으로 선택 상태 표시 */
.tab {
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
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-none);
  color: var(--color-text-label);
  white-space: nowrap;
  transition: color var(--duration-fast) var(--easing-base),
              background var(--duration-fast) var(--easing-base);
}

/* ── Hover (미선택 탭만) ── */
.tab:hover:not(:disabled):not(.tab--selected) {
  color: var(--color-text-body);
  background: var(--color-action-brand-selected);
}

/* ── Focus ── */
.tab:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Selected — 배경 채움으로 선택 표시 ── */
.tab--selected {
  background: var(--color-action-brand-selected);
  color: var(--color-text-brand);
  font-weight: var(--font-weight-semibold);
}

/* ── Disabled ── */
.tab--disabled,
.tab:disabled {
  color: var(--color-text-disabled);
  cursor: default;
  pointer-events: none;
}

/* ── Badge — badge.md pill--neutral/brand 패턴 일치 ── */
.tab__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* badge--pill min-width 공식: 1.5em(line-height-base × font-size) + inset-xs×2 */
  min-width: calc(1.5em + var(--space-inset-xs) * 2);
  padding-block: var(--space-inset-xs);
  padding-inline: var(--space-inset-lg);
  border-radius: var(--radius-pill);
  background: var(--color-surface-neutral); /* badge--neutral */
  color: var(--color-text-label);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-base);
  flex-shrink: 0;
}
.tab--selected .tab__badge {
  background: var(--color-surface-brand-subtle); /* badge--brand */
  color: var(--color-text-brand);
}
.tab--disabled .tab__badge,
.tab:disabled .tab__badge {
  background: var(--color-surface-disabled);
  color: var(--color-text-disabled);
}

/* ── Tab Panel ── */
.tab-panel {
  padding: var(--space-inset-2xl) 0;
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
| badge | `aria-hidden="true"` — 카운트는 시각 전용. 필요 시 탭 레이블에 포함: `aria-label="신고 대상자, 10건"` |
| 패널 | `<div role="tabpanel" id="panel-id" aria-labelledby="tab-id">`. 비활성 패널은 `hidden` |
| 키보드 | `←` · `→`: 탭 이동. `Home`/`End`: 첫·마지막 탭. `Enter`/`Space`: 선택 |

```js
// Tab 키보드 핸들러 예시 (roving tabindex)
tabs.forEach(function(tab, idx) {
  tab.addEventListener('keydown', function(e) {
    var cur = tabs.indexOf(tab);
    var next = -1;
    if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
    if (e.key === 'ArrowLeft')  next = (cur - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home')       next = 0;
    if (e.key === 'End')        next = tabs.length - 1;
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

> ✅ DO — `tab__badge`에 `aria-hidden="true"` 적용
> 카운트는 시각 전용. 수량 정보가 중요하면 탭 버튼에 `aria-label="신고 대상자, 10건"` 추가

> ❌ DON'T — Tab을 Segment 대신 사용
> 즉시 반영되는 모드·단위 전환에는 Segment 사용. Tab은 반드시 콘텐츠 영역(tabpanel) 전환에만 사용한다

> ❌ DON'T — 탭이 1개뿐인 tab-group 사용
> 전환 대상이 없으면 탭 컴포넌트가 아닌 단독 제목·헤더로 처리한다
