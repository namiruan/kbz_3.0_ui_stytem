---
file: components/atoms/tooltip.md
version: 1.5.3
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/shadow.md, tokens/height.md, tokens/z-index.md, components/atoms/button.md, components/atoms/action-group.md
---

# Tooltip

## 개요

트리거 요소에 hover 또는 focus 시 보조 설명을 표시하는 비인터랙티브 패널. 인터랙션에 필수적인 정보는 Tooltip에 두지 않는다 — 키보드 사용자도 접근할 수 있어야 하며, 모바일에서는 hover가 없다.

Button, Input 등 다른 컴포넌트와의 구별 — Tooltip은 단독으로 존재하지 않으며 반드시 트리거 요소 위에 오버레이된다. 긴 설명이나 인터랙티브 요소가 필요하면 Popover 또는 Modal을 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| placement | top · bottom · left · right | top (기본, 클래스 없음) |
| type | default · pinned | default |

**max-width 300px** — 텍스트가 짧으면 텍스트 너비만큼, 300px 초과 시 자동 줄바꿈. 100자 이내 권장.

**pinned** — 처음부터 패널이 노출된 상태로 시작한다. dismiss 버튼(×) 클릭 시 default 타입으로 전환되어 이후 hover/focus 시 툴팁이 표시된다. 명시적 해제가 필요한 안내 텍스트에 사용한다.

<!-- AI: placement는 JS가 뷰포트 경계 감지 후 동적으로 변경한다. CSS는 방향별 위치만 정의한다.
pinned 타입: HTML에서 panel에 tooltip-panel--pinned + tooltip-panel--visible 클래스를 초기 적용. pointer-events: auto. 내부에 .tooltip-panel-text + .tooltip-dismiss 버튼.
dismiss 클릭 시: --pinned·--visible 클래스 제거 + mouseenter/mouseleave/focus/blur 리스너 등록 → default 타입으로 전환. -->

---

## 사용 지침

### 트리거 요소 선택 기준

어떤 인터랙티브 요소든 트리거가 될 수 있다. `.tooltip-wrapper`로 감싸고 트리거에 `aria-describedby`만 추가하면 된다.

| 상황 | 트리거 | `.tooltip-trigger` 사용 |
|------|--------|------------------------|
| 독립형 icon-only 버튼 | `<button>` + `aria-label` | ✅ 필요 — 자체 스타일 없음 |
| `.btn` 버튼 | `.btn.btn--*` 그대로 + `aria-describedby` 추가 | ❌ 불필요 — `.btn`이 스타일 담당 |
| ActionGroup 버튼 | `.action-btn` 안에 `.tooltip-panel` 직접 삽입 — `.action-btn`이 이미 `position: relative`이므로 `.tooltip-wrapper` 불필요 | ❌ 불필요 |
| Tag | `.tag` 그대로 + `aria-describedby` 추가 | ❌ 불필요 |
| 텍스트 잘림(truncate) | 잘린 요소 자체 + `aria-describedby` 추가 | ❌ 불필요 |
| 폼 필드 힌트 | Input 옆 도움말 아이콘 버튼 — FormField 내부 | ✅ 필요 |

### 제약

- Tooltip 내부에 인터랙티브 요소(버튼, 링크) 금지 — Popover 사용
- 100자 이상 긴 텍스트 금지
- 모바일 환경에서는 hover 없음 — 필수 정보는 항상 노출 상태로 유지

---

## 동작

<!-- AI: hover·focus 진입 시 .tooltip-panel에 .tooltip-panel--visible 클래스를 추가해 opacity: 1로 전환한다. Escape 키로 닫는다.
pinned 타입은 HTML에서 이미 --visible 상태. dismiss 클릭 시 --pinned·--visible 제거 후 hover/focus 리스너 등록 → default 타입으로 전환. -->

### default

| 이벤트 | 클래스 변화 |
|--------|------------|
| `mouseenter` / `focus` | `.tooltip-panel--visible` 추가 |
| `mouseleave` / `blur` | `.tooltip-panel--visible` 제거 |
| `Escape` keydown | `.tooltip-panel--visible` 제거 |

### pinned

| 이벤트 | 동작 |
|--------|------|
| 초기 렌더 | `tooltip-panel--pinned` + `tooltip-panel--visible` 클래스가 HTML에 이미 적용 — 패널 즉시 노출 |
| `.tooltip-dismiss` `click` | `--pinned`·`--visible` 제거 + hover/focus 리스너 등록 → default 타입으로 전환 |
| `Escape` keydown | `--pinned`·`--visible` 제거 → default 타입으로 전환 |

hover·focus 진입 시 툴팁이 나타난다. `.btn`은 `.tooltip-wrapper`로 감싸고 `aria-describedby`만 추가한다. `.action-btn`은 이미 `position: relative`이므로 `.tooltip-panel`을 버튼 안에 직접 넣는다.

:::preview
<div style="display:flex; justify-content:center; align-items:center; gap: var(--space-48); padding: var(--space-64) var(--space-48) var(--space-48); flex-wrap: wrap;">

  <!-- Primary 버튼 -->
  <span data-component class="tooltip-wrapper"
        onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')"
        onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">
    <button class="btn btn--primary btn--md" aria-describedby="tip-btn-demo"
            onfocus="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')"
            onblur="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">
      저장
    </button>
    <div class="tooltip-panel tooltip-panel--top" id="tip-btn-demo" role="tooltip">변경된 내용을 저장합니다</div>
  </span>

  <!-- ActionGroup -->
  <div data-component class="action-group-labeled">
    <span class="action-group-label text-form-label" id="tip-ag-label">근태 관리</span>
    <div class="action-group" role="toolbar" aria-labelledby="tip-ag-label">
      <button class="action-btn action-btn--sm text-button-sm" aria-describedby="tip-ag-1"
              onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')"
              onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"
              onfocus="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')"
              onblur="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">
        시간변경
        <div class="tooltip-panel tooltip-panel--top" id="tip-ag-1" role="tooltip">출퇴근 시간을 수정합니다</div>
      </button>
      <button class="action-btn action-btn--sm text-button-sm" aria-describedby="tip-ag-2"
              onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')"
              onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"
              onfocus="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')"
              onblur="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">
        퇴근시간
        <div class="tooltip-panel tooltip-panel--top" id="tip-ag-2" role="tooltip">퇴근 시간을 일괄 변경합니다</div>
      </button>
      <button class="action-btn action-btn--sm text-button-sm" aria-describedby="tip-ag-3"
              onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')"
              onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')"
              onfocus="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')"
              onblur="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">
        단가
        <div class="tooltip-panel tooltip-panel--top" id="tip-ag-3" role="tooltip">시간당 단가를 수정합니다</div>
      </button>
    </div>
  </div>

  <!-- Icon-only + 긴 텍스트 -->
  <span data-component class="tooltip-wrapper"
        onmouseenter="this.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')"
        onmouseleave="this.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">
    <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-wrap-demo"
            onfocus="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.add('tooltip-panel--visible')"
            onblur="this.closest('.tooltip-wrapper').querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible')">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
    </button>
    <div class="tooltip-panel tooltip-panel--top" id="tip-wrap-demo" role="tooltip">최대 100자까지 입력할 수 있어요. 특수문자와 공백도 모두 포함됩니다.</div>
  </span>

</div>
:::

### pinned

처음부터 패널이 노출된 상태로 시작하며, × 버튼으로 닫으면 default 타입으로 전환된다.

:::preview
<div style="display:flex; justify-content:center; align-items:flex-start; gap: var(--space-48); padding: var(--space-64) var(--space-48) var(--space-48); flex-wrap: wrap;">

  <!-- 짧은 텍스트 -->
  <div style="display:flex; flex-direction:column; align-items:center; gap: var(--space-gap-sm);">
    <span style="font-size:var(--font-size-sm); color:var(--color-text-subtle);">짧은 텍스트</span>
    <span data-component class="tooltip-wrapper">
      <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-pinned-short">
        <svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg>
      </button>
      <div class="tooltip-panel tooltip-panel--top tooltip-panel--pinned tooltip-panel--visible" id="tip-pinned-short" role="tooltip">
        <span class="tooltip-panel-text">저장하면 이전 내용으로 되돌릴 수 없어요.</span>
        <button class="tooltip-dismiss" aria-label="툴팁 닫기" onclick="
          var wrapper = this.closest('.tooltip-wrapper');
          var panel = this.closest('.tooltip-panel');
          var trigger = wrapper.querySelector('.tooltip-trigger');
          panel.classList.remove('tooltip-panel--pinned', 'tooltip-panel--visible');
          wrapper.addEventListener('mouseenter', function() { panel.classList.add('tooltip-panel--visible'); });
          wrapper.addEventListener('mouseleave', function() { panel.classList.remove('tooltip-panel--visible'); });
          trigger.addEventListener('focus', function() { panel.classList.add('tooltip-panel--visible'); });
          trigger.addEventListener('blur', function() { panel.classList.remove('tooltip-panel--visible'); });
        ">
          <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
        </button>
      </div>
    </span>
  </div>

  <!-- 긴 텍스트 -->
  <div style="display:flex; flex-direction:column; align-items:center; gap: var(--space-gap-sm);">
    <span style="font-size:var(--font-size-sm); color:var(--color-text-subtle);">긴 텍스트</span>
    <span data-component class="tooltip-wrapper">
      <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-pinned-long">
        <svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg>
      </button>
      <div class="tooltip-panel tooltip-panel--top tooltip-panel--pinned tooltip-panel--visible" id="tip-pinned-long" role="tooltip">
        <span class="tooltip-panel-text">매월 25일 급여 지급 기준으로 근태 데이터가 자동 반영됩니다. 변경 사항은 익월부터 적용되며, 이전 내역은 수정되지 않아요.</span>
        <button class="tooltip-dismiss" aria-label="툴팁 닫기" onclick="
          var wrapper = this.closest('.tooltip-wrapper');
          var panel = this.closest('.tooltip-panel');
          var trigger = wrapper.querySelector('.tooltip-trigger');
          panel.classList.remove('tooltip-panel--pinned', 'tooltip-panel--visible');
          wrapper.addEventListener('mouseenter', function() { panel.classList.add('tooltip-panel--visible'); });
          wrapper.addEventListener('mouseleave', function() { panel.classList.remove('tooltip-panel--visible'); });
          trigger.addEventListener('focus', function() { panel.classList.add('tooltip-panel--visible'); });
          trigger.addEventListener('blur', function() { panel.classList.remove('tooltip-panel--visible'); });
        ">
          <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
        </button>
      </div>
    </span>
  </div>

</div>
:::

```js
// default tooltip
function showTooltip(wrapper) {
  wrapper.querySelector('.tooltip-panel').classList.add('tooltip-panel--visible');
}
function hideTooltip(wrapper) {
  wrapper.querySelector('.tooltip-panel').classList.remove('tooltip-panel--visible');
}

wrapper.addEventListener('mouseenter', () => showTooltip(wrapper));
wrapper.addEventListener('mouseleave', () => hideTooltip(wrapper));
trigger.addEventListener('focus',      () => showTooltip(wrapper));
trigger.addEventListener('blur',       () => hideTooltip(wrapper));
trigger.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideTooltip(wrapper);
});

// pinned tooltip — HTML에서 panel에 tooltip-panel--pinned + tooltip-panel--visible 초기 적용
// dismiss 클릭 시 default 타입으로 전환
function convertToDefault(wrapper, panel, trigger) {
  panel.classList.remove('tooltip-panel--pinned', 'tooltip-panel--visible');
  wrapper.addEventListener('mouseenter', () => panel.classList.add('tooltip-panel--visible'));
  wrapper.addEventListener('mouseleave', () => panel.classList.remove('tooltip-panel--visible'));
  trigger.addEventListener('focus', () => panel.classList.add('tooltip-panel--visible'));
  trigger.addEventListener('blur',  () => panel.classList.remove('tooltip-panel--visible'));
}
dismissBtn.addEventListener('click', () => convertToDefault(wrapper, panel, trigger));
trigger.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') convertToDefault(wrapper, panel, trigger);
});
```

---

## Anatomy

<!-- AI:
- root = span.tooltip-wrapper — position: relative 부모. display: inline-block으로 트리거 크기에 맞춤.
- trigger = button.tooltip-trigger — 인터랙티브 요소. hover·focus 이벤트 수신. aria-label(icon-only)과 aria-describedby(패널 id) 필수.
- panel = div.tooltip-panel — role="tooltip" + id 필수. pointer-events: none으로 패널 자체는 인터랙션 받지 않음.
- placement 클래스(tooltip-panel--top 등)로 방향 결정. 기본값 top은 클래스 없음. JS가 뷰포트 경계 감지 후 동적 변경 가능.
- 표시 상태: .tooltip-panel--visible 클래스 추가 시 opacity: 1.
- 화살표: placement 클래스에 따라 ::after 가상 요소로 자동 생성. HTML 추가 불필요.
- width: max-content + max-width: 300px. 짧은 텍스트는 텍스트 너비, 300px 초과 시 word-break: keep-all 기준으로 줄바꿈.
- .tooltip-trigger는 독립형 icon-only 버튼 전용. .btn/.tag 등 자체 스타일 요소는 tooltip-wrapper로 감싸고 aria-describedby만 추가한다.
- .action-btn은 이미 position: relative이므로 예외 — tooltip-wrapper 없이 .tooltip-panel을 .action-btn 안에 직접 삽입한다. .action-group > .action-btn:first-child 등 내부 CSS 선택자가 그대로 유지된다.
-->

:::preview
<div style="display:grid; grid-template-columns: repeat(3, auto); gap: var(--space-48); justify-content:center; align-items:center; padding: var(--space-48);">

  <div></div>
  <span data-component class="tooltip-wrapper">
    <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-top-demo">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
    </button>
    <div class="tooltip-panel tooltip-panel--top tooltip-panel--visible" id="tip-top-demo" role="tooltip">위쪽 툴팁</div>
  </span>
  <div></div>

  <span data-component class="tooltip-wrapper">
    <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-left-demo">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
    </button>
    <div class="tooltip-panel tooltip-panel--left tooltip-panel--visible" id="tip-left-demo" role="tooltip">왼쪽 툴팁</div>
  </span>
  <div></div>
  <span data-component class="tooltip-wrapper">
    <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-right-demo">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
    </button>
    <div class="tooltip-panel tooltip-panel--right tooltip-panel--visible" id="tip-right-demo" role="tooltip">오른쪽 툴팁</div>
  </span>

  <div></div>
  <span data-component class="tooltip-wrapper">
    <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-bottom-demo">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
    </button>
    <div class="tooltip-panel tooltip-panel--bottom tooltip-panel--visible" id="tip-bottom-demo" role="tooltip">아래쪽 툴팁</div>
  </span>
  <div></div>

</div>
:::

```html
<!-- icon-only 독립형 버튼 — .tooltip-trigger로 스타일 정의 -->
<span class="tooltip-wrapper">
  <button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-1">
    <span class="icon icon--sm" aria-hidden="true">
      <svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg>
    </span>
  </button>
  <div class="tooltip-panel tooltip-panel--top" id="tip-1" role="tooltip">최대 100자까지 입력할 수 있어요</div>
</span>

<!-- .btn 버튼 — .tooltip-trigger 없이 aria-describedby만 추가 -->
<span class="tooltip-wrapper">
  <button class="btn btn--ghost btn--sm" aria-describedby="tip-2">삭제</button>
  <div class="tooltip-panel tooltip-panel--top" id="tip-2" role="tooltip">선택한 항목을 삭제합니다</div>
</span>

<!-- Tag — .tooltip-trigger 없이 aria-describedby만 추가 -->
<span class="tooltip-wrapper">
  <span class="tag" tabindex="0" aria-describedby="tip-3">기간 만료</span>
  <div class="tooltip-panel tooltip-panel--top" id="tip-3" role="tooltip">2024-01-31에 만료됩니다</div>
</span>

<!-- ActionGroup — .action-btn이 position:relative이므로 .tooltip-wrapper 없이 패널을 직접 삽입 -->
<div class="action-group-labeled">
  <span class="action-group-label text-form-label" id="ag-label">근태 관리</span>
  <div class="action-group" role="toolbar" aria-labelledby="ag-label">
    <button class="action-btn action-btn--sm text-button-sm" aria-describedby="tip-4">
      시간변경
      <div class="tooltip-panel tooltip-panel--top" id="tip-4" role="tooltip">출퇴근 시간을 수정합니다</div>
    </button>
    <button class="action-btn action-btn--sm text-button-sm" aria-describedby="tip-5">
      퇴근시간
      <div class="tooltip-panel tooltip-panel--top" id="tip-5" role="tooltip">퇴근 시간을 일괄 변경합니다</div>
    </button>
    <button class="action-btn action-btn--sm text-button-sm" aria-describedby="tip-6">
      단가
      <div class="tooltip-panel tooltip-panel--top" id="tip-6" role="tooltip">시간당 단가를 수정합니다</div>
    </button>
  </div>
</div>
```

---

## CSS

```css
/* ── Base ── */
/* tooltip-wrapper: position: relative로 panel의 absolute 기준점 역할 */
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

/* ── Trigger ── */
/* 독립형 icon-only 버튼 전용. .btn/.action-btn/.tag 등 자체 스타일을 가진 요소에는 사용하지 않는다 */
/* .btn 클래스 없이 단독 정의 — height-dense/radius-xs가 .btn 기본값과 충돌하므로 */
/* height · width: height-dense(28px) — 인라인 밀도 영역 기준 */
.tooltip-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--height-dense);
  width: var(--height-dense);
  border-radius: var(--radius-xs);
  border: none;
  background: transparent;
  color: var(--color-text-subtle);
  cursor: pointer;
  padding: 0;
  transition: background var(--duration-fast) var(--easing-base);
}

/* ── Trigger: 상태 ── */
.tooltip-trigger:hover {
  background: var(--color-action-neutral-hover);
  color: var(--color-text-label);
}

/* focus-visible 전용 — :focus 단독 사용 금지 (비키보드 클릭 시 outline 미표시) */
.tooltip-trigger:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* disabled trigger는 pointer-events: none + tabindex="-1"로 차단 — CSS 클래스 단독 금지 */
.tooltip-trigger:disabled,
.tooltip-trigger[aria-disabled="true"] {
  pointer-events: none;
  color: var(--color-text-disabled);
}

/* ── Panel: Base ── */
/* position: absolute — 부모 tooltip-wrapper의 position: relative 기준 */
/* z-index: --z-tooltip(= --z-above = 1) — 전역 레이어 아님. 트리거의 stacking context 기준 로컬 +1.
   헤더 안 트리거 → 헤더 위, 본문 안 트리거 → 본문 위. 배치 위치가 z-index를 결정한다 */
/* pointer-events: none — 패널 자체에 마우스 이벤트 금지. 트리거 hover가 해제되지 않도록 함 */
/* text-tooltip 유틸리티 클래스 대신 개별 속성 직접 지정 — panel은 div 요소이므로 font-family 상속이 보장되지 않을 수 있어 명시 */
/* width: max-content — position:absolute 요소는 containing block(28px 트리거)에 수축하려 함.
   max-content로 "한 줄에 다 쓴 너비"를 먼저 확보하고, max-width: 300px로 상한 제어.
   fit-content(300px)는 absolute 컨텍스트에서 브라우저별 동작 차이가 있어 사용하지 않는다. 직접 매핑 토큰 없음 */
.tooltip-panel {
  position: absolute;
  z-index: var(--z-tooltip);
  width: max-content;
  max-width: 300px;
  padding: var(--space-inset-squish-sm);
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-reading);
  letter-spacing: var(--letter-spacing-default);
  font-weight: var(--font-weight-body);
  white-space: normal;
  word-break: keep-all;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.1s ease;
}

/* ── Panel: 표시 상태 ── */
/* JS가 .tooltip-panel--visible 클래스 추가 시 표시. CSS :hover 대신 클래스 제어를 원칙으로 함 */
.tooltip-panel--visible {
  opacity: 1;
}

/* ── Panel: Placement ── */
/* gap = space-gap-md(12px) — 트리거와 패널 사이 간격 */
/* transform: translateX/Y(-50%)로 트리거 중앙 정렬 */
/* placement 기본값 top — 클래스 없음. 나머지 방향은 명시적 클래스 필요 */
.tooltip-panel--top {
  bottom: calc(100% + var(--space-gap-md));
  left: 50%;
  transform: translateX(-50%);
}
.tooltip-panel--bottom {
  top: calc(100% + var(--space-gap-md));
  left: 50%;
  transform: translateX(-50%);
}
.tooltip-panel--left {
  right: calc(100% + var(--space-gap-md));
  top: 50%;
  transform: translateY(-50%);
}
.tooltip-panel--right {
  left: calc(100% + var(--space-gap-md));
  top: 50%;
  transform: translateY(-50%);
}

/* ── Panel: Pinned variant ── */
/* pointer-events: auto — dismiss 버튼 클릭을 받아야 하므로 base의 none을 해제 */
/* display: flex — 텍스트와 dismiss 버튼을 가로로 배치 */
.tooltip-panel--pinned {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: var(--space-gap-xs);
}
.tooltip-panel-text {
  flex: 1;
}
/* dismiss 버튼은 pinned 상태에서만 표시 — default 전환 후 hover 시 일반 툴팁 스타일로 노출 */
.tooltip-panel:not(.tooltip-panel--pinned) .tooltip-dismiss {
  display: none;
}

/* ── Dismiss button ── */
/* 어두운 패널 위 — color-text-inverse, hover는 color-action-light-hover(흰색 15%) */
.tooltip-dismiss {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--icon-sm) + var(--space-2) * 2);
  height: calc(var(--icon-sm) + var(--space-2) * 2);
  padding: 0;
  border: none;
  border-radius: var(--radius-xs);
  background: transparent;
  color: var(--color-text-inverse);
  cursor: pointer;
  transition: background var(--duration-fast) var(--easing-base);
}
.tooltip-dismiss:hover {
  background: var(--color-action-light-hover);
}
.tooltip-dismiss:focus-visible {
  outline: var(--stroke-md) solid var(--color-text-inverse);
  outline-offset: var(--space-offset-focus);
}
.tooltip-dismiss > svg {
  width: var(--icon-sm);
  height: var(--icon-sm);
  display: block;
}

/* ── Panel: Arrow ── */
/* CSS border 삼각형. 크기 = space-gap-xs(4px) — gap(12px)과 독립적으로 설정. 패널 가장자리에서 시작 */
/* HTML 추가 없이 ::after로 자동 생성 */
.tooltip-panel--top::after,
.tooltip-panel--bottom::after,
.tooltip-panel--left::after,
.tooltip-panel--right::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: var(--space-gap-xs) solid transparent;
}
/* top → 아래 방향 화살표 */
.tooltip-panel--top::after {
  bottom: calc(-1 * var(--space-gap-xs));
  left: 50%;
  transform: translateX(-50%);
  border-top-color: var(--color-surface-dark);
  border-bottom-width: 0;
}
/* bottom → 위 방향 화살표 */
.tooltip-panel--bottom::after {
  top: calc(-1 * var(--space-gap-xs));
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: var(--color-surface-dark);
  border-top-width: 0;
}
/* left → 오른쪽 방향 화살표 */
.tooltip-panel--left::after {
  right: calc(-1 * var(--space-gap-xs));
  top: 50%;
  transform: translateY(-50%);
  border-left-color: var(--color-surface-dark);
  border-right-width: 0;
}
/* right → 왼쪽 방향 화살표 */
.tooltip-panel--right::after {
  left: calc(-1 * var(--space-gap-xs));
  top: 50%;
  transform: translateY(-50%);
  border-right-color: var(--color-surface-dark);
  border-left-width: 0;
}
```

---

## 접근성

비인터랙티브 패널 + 인터랙티브 트리거 구조.

| 항목 | 마크업 |
|------|--------|
| 패널 역할 | `role="tooltip"` + `id` 필수 |
| 트리거-패널 연결 | 트리거에 `aria-describedby="[패널 id]"` |
| icon-only 트리거 레이블 | 트리거에 `aria-label` 필수 — 아이콘만으로 용도 식별 불가 |
| 키보드 접근 | hover와 `focus` 양쪽에서 표시 — Tab으로 트리거 포커스 시 자동 노출 |
| 키보드 닫기 | `Escape` 키로 닫기 |
| focus ring | `:focus-visible` 전용. `outline` 사용 — `box-shadow` 대체 금지 |
| 색상만으로 상태 구분 금지 | tooltip 내용은 텍스트로만 전달 |
| pinned dismiss 버튼 | `.tooltip-dismiss` 에 `aria-label="툴팁 닫기"` 필수 |

```js
trigger.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideTooltip(wrapper);
});
```

---

## Do / Don't

> ✅ DO — 트리거에 `aria-describedby`로 패널 연결, 패널에 `id`와 `role="tooltip"` 명시
> `<button aria-describedby="tip-1">` + `<div id="tip-1" role="tooltip">`

> ✅ DO — icon-only 트리거에 `aria-label` 추가
> `<button class="tooltip-trigger" aria-label="도움말" aria-describedby="tip-1">`

> ✅ DO — `.btn` · `.tag` · `.action-btn` 에는 `.tooltip-trigger` 없이 `aria-describedby`만 추가
> `<button class="btn btn--ghost btn--sm" aria-describedby="tip-1">` — 기존 컴포넌트 스타일 그대로 유지

> ✅ DO — 대체 컴포넌트 선택: 인터랙티브 요소가 필요하면 Popover, 중요 정보는 Modal 사용

> ❌ DON'T — `.btn`에 `.tooltip-trigger` 함께 사용
> height·radius·background가 충돌한다. `.tooltip-trigger`는 독립형 icon-only 버튼 전용

> ❌ DON'T — 필수 정보를 Tooltip에만 표시
> 모바일·키보드 사용자가 접근 못할 수 있다. 필수 정보는 항상 노출 상태로 유지

> ❌ DON'T — default 타입 Tooltip 안에 인터랙티브 요소(버튼, 링크) 배치
> pinned 타입의 `.tooltip-dismiss` 는 예외. default 타입은 `pointer-events: none` 이므로 클릭이 동작하지 않는다

> ❌ DON'T — 긴 텍스트(100자 초과)나 복잡한 인터랙션을 Tooltip에 배치
> 간단한 보조 설명 전용. 복잡한 내용은 Popover 또는 Modal 사용. 100자 이내 텍스트는 max-width 내에서 자동 줄바꿈됨

> ❌ DON'T — `<style>` 블록을 preview 안에 직접 작성
> CSS는 `## CSS` 섹션에 작성하면 뷰어가 자동 주입한다

> ❌ DON'T — 패널 gap에 px 하드코딩
> `bottom: calc(100% + 6px)` 대신 `bottom: calc(100% + var(--space-gap-xs))` 사용

> ❌ DON'T — `:focus` 단독 사용
> `tooltip-trigger:focus { outline: ... }` 대신 `:focus-visible` 사용 — 마우스 클릭 시 outline 미표시

> ❌ DON'T — preview 컨테이너 여백에 px 하드코딩
> `padding: 48px 24px` 대신 `padding: var(--space-inset-3xl) var(--space-inset-2xl)` 사용
