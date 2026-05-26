---
file: components/atoms/segment.md
version: 1.6.1
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/motion.md, tokens/elevation.md
---

# Segment

## 개요

하나의 컨테이너 안에서 상호 배타적인 옵션을 전환하는 컴팩트 선택 컨트롤. 모드 전환·뷰 전환·단위 선택 등 즉시 반영되는 단일 선택에 사용한다.

ActionGroup과의 차이 — ActionGroup은 독립 버튼 나열로 액션을 트리거하고, Segment는 하나의 컨테이너 안에서 상태를 전환한다.
Tag와의 차이 — Tag는 다중 선택이 가능한 필터 레이블이고, Segment는 항상 하나의 옵션만 선택된다.
Toggle과의 차이 — Toggle은 단일 이진(on/off) 설정이고, Segment는 3개 이상 옵션도 지원한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | sm(기본, 클래스 없음) · md → `segment--md` | sm |
| state | disabled → `segment--disabled` | — |

---

## 사용 지침

### 선택 기준

| 상황 | 사용 |
|------|------|
| 모드 전환 (고정금액/요율, 월/연) | Segment |
| 뷰 전환 (리스트/그리드) | Segment |
| 다중 선택 필터 | Tag |
| 독립 액션 버튼 나열 | ActionGroup |
| 즉시 반영되는 이진 on/off | Toggle |

---

## 동작

항상 하나의 아이템만 선택 상태를 유지한다. 선택된 아이템을 다시 클릭해도 해제되지 않는다. 키보드 방향키로 선택을 이동한다.

| 이벤트 | 동작 |
|--------|------|
| 미선택 아이템 클릭 | 기존 선택 해제 + 클릭 아이템에 `segment__item--selected` + `aria-checked="true"` + 슬라이더 이동 |
| 선택된 아이템 클릭 | 무시 — 선택 해제 없음 |
| `←` · `→` (포커스 중) | 이전·다음 아이템으로 선택 이동 |

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-stack-lg);align-items:flex-start">
  <div id="demo-segment-1" class="segment" role="radiogroup" aria-label="결제 방식">
    <span class="segment__slider" aria-hidden="true"></span>
    <button class="segment__item segment__item--selected" role="radio" aria-checked="true">고정금액</button>
    <button class="segment__item" role="radio" aria-checked="false">요율</button>
  </div>
  <div id="demo-segment-2" class="segment" role="radiogroup" aria-label="뷰 전환">
    <span class="segment__slider" aria-hidden="true"></span>
    <button class="segment__item segment__item--selected" role="radio" aria-checked="true">전체</button>
    <button class="segment__item" role="radio" aria-checked="false">진행 중</button>
    <button class="segment__item" role="radio" aria-checked="false">완료</button>
  </div>
</div>
<script>
(function() {
  function updateSlider(group, animate) {
    var slider = group.querySelector('.segment__slider');
    var selected = group.querySelector('.segment__item--selected');
    if (!slider || !selected) return;
    if (!animate) slider.style.transition = 'none';
    slider.style.width = selected.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + selected.offsetLeft + 'px)';
    if (!animate) { slider.offsetWidth; slider.style.transition = ''; }
  }

  stage.querySelectorAll('.segment[role="radiogroup"]').forEach(function(group) {
    var items = Array.from(group.querySelectorAll('.segment__item'));
    updateSlider(group, false);

    items.forEach(function(item, idx) {
      item.addEventListener('click', function() {
        if (item.getAttribute('aria-checked') === 'true') return;
        items.forEach(function(i) {
          i.classList.remove('segment__item--selected');
          i.setAttribute('aria-checked', 'false');
        });
        item.classList.add('segment__item--selected');
        item.setAttribute('aria-checked', 'true');
        item.focus();
        updateSlider(group, true);
      });
      item.addEventListener('keydown', function(e) {
        var next = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % items.length;
        if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   next = (idx - 1 + items.length) % items.length;
        if (next < 0) return;
        e.preventDefault();
        items.forEach(function(i) {
          i.classList.remove('segment__item--selected');
          i.setAttribute('aria-checked', 'false');
        });
        items[next].classList.add('segment__item--selected');
        items[next].setAttribute('aria-checked', 'true');
        items[next].focus();
        updateSlider(group, true);
      });
    });
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.segment. role="radiogroup" + aria-label 필수. position:relative — slider 기준점.
- slider = span.segment__slider[aria-hidden="true"]. 첫 번째 자식. JS가 width·transform을 갱신. 초기 렌더 시 transition 없이 위치 즉시 설정 후 활성화.
- item = button.segment__item. role="radio" + aria-checked="true/false" 필수. position:relative + z-index:1 — slider 위에 텍스트 렌더.
- 선택된 아이템: segment__item--selected 클래스 + aria-checked="true". 배경·그림자는 slider가 담당 — 아이템은 color 변경만.
- 항상 하나의 아이템만 selected. 초기 상태에서 반드시 하나가 선택되어 있어야 한다.
- disabled: root에 segment--disabled. 개별 아이템 disabled 처리 불가 — 전체 비활성만 지원.
-->

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">sm</span>
  <div data-component class="segment" role="radiogroup" aria-label="예시">
    <span class="segment__slider" aria-hidden="true"></span>
    <button class="segment__item segment__item--selected" role="radio" aria-checked="true">고정금액</button>
    <button class="segment__item" role="radio" aria-checked="false">요율</button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">md</span>
  <div data-component class="segment segment--md" role="radiogroup" aria-label="예시">
    <span class="segment__slider" aria-hidden="true"></span>
    <button class="segment__item segment__item--selected" role="radio" aria-checked="true">고정금액</button>
    <button class="segment__item" role="radio" aria-checked="false">요율</button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">3개 옵션</span>
  <div data-component class="segment" role="radiogroup" aria-label="예시">
    <span class="segment__slider" aria-hidden="true"></span>
    <button class="segment__item segment__item--selected" role="radio" aria-checked="true">전체</button>
    <button class="segment__item" role="radio" aria-checked="false">진행 중</button>
    <button class="segment__item" role="radio" aria-checked="false">완료</button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div data-component class="segment segment--disabled" role="radiogroup" aria-label="예시" aria-disabled="true">
    <span class="segment__slider" aria-hidden="true"></span>
    <button class="segment__item segment__item--selected" role="radio" aria-checked="true" disabled aria-disabled="true" tabindex="-1">고정금액</button>
    <button class="segment__item" role="radio" aria-checked="false" disabled aria-disabled="true" tabindex="-1">요율</button>
  </div>
</div>
</div>
<script>
(function() {
  function updateSlider(group) {
    var slider = group.querySelector('.segment__slider');
    var selected = group.querySelector('.segment__item--selected');
    if (!slider || !selected) return;
    slider.style.transition = 'none';
    slider.style.width = selected.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + selected.offsetLeft + 'px)';
    slider.offsetWidth;
    slider.style.transition = '';
  }
  stage.querySelectorAll('[data-component].segment').forEach(function(g) { updateSlider(g); });
})();
</script>
:::

---

## CSS

```css
/* ── Base ── */
/* 컨테이너 — Toggle track과 동일한 시각 언어: brand-subtle 배경 + inset border */
/* position:relative — slider(absolute) 기준점 */
.segment {
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: var(--space-inset-sm);
  gap: var(--space-gap-2xs);
  background: var(--color-action-brand-subtle);
  border-radius: var(--radius-sm);
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-brand-subtle);
  transition: box-shadow var(--duration-base) var(--easing-base);
}

/* ── Slider ── */
/* 선택 위치를 따라 이동하는 배경 레이어. JS가 width·translateX를 갱신 */
/* top/bottom = 부모 padding(space-inset-xs)과 동일값 — padding 영역 안에 수직 맞춤 */
/* left:0은 JS translateX의 기준점 — 실제 X위치는 선택 아이템의 offsetLeft로 결정 */
.segment__slider {
  position: absolute;
  top: var(--space-inset-sm);
  bottom: var(--space-inset-sm);
  left: 0;
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  box-shadow: var(--shadow-sm),
              inset 0 0 0 var(--stroke-sm) var(--color-border-brand-subtle);
  pointer-events: none;
  transition: transform var(--duration-base) var(--easing-symmetric),
              width var(--duration-base) var(--easing-symmetric);
}

/* ── Item ── */
/* position:relative + z-index:1 — slider 위에 텍스트 렌더 */
.segment__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: var(--space-inset-squish-sm);
  border-radius: var(--radius-xs);
  background: transparent;
  font-family: var(--font-family-base);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-body);
  line-height: var(--line-height-ui);
  color: var(--color-text-brand);
  white-space: nowrap;
  cursor: pointer;
  transition: color var(--duration-base) var(--easing-base);
}

/* ── Selected ── */
/* 배경·그림자는 slider가 담당. 아이템은 색상만 변경 */
.segment__item--selected {
  color: var(--color-text-brand-vivid);
  cursor: default;
}

/* ── Hover ── */
/* 컨테이너 hover 미정의 — 아이템 단위 hover로 충분하고, 컨테이너 전체는 클릭 대상이 아님 */
.segment__item:not(.segment__item--selected):hover {
  color: var(--color-text-brand-vivid);
}

/* ── Focus ── */
/* 포커스 링은 전역 *:focus-visible 규칙으로 처리된다 */

/* ── Size: md ── */
.segment--md .segment__item {
  padding: var(--space-inset-squish-md);
  font-size: var(--font-size-sm);
}

/* ── Disabled ── */
.segment--disabled {
  pointer-events: none;
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-disabled);
  background: var(--color-surface-disabled);
}
.segment--disabled .segment__item {
  color: var(--color-text-disabled);
}
.segment--disabled .segment__slider {
  background: var(--color-surface-base);
  box-shadow: none;
}
```

---

## 접근성

라디오 그룹 유형 (`accessibility.md` 라디오 그룹 행 적용).

| 상황 | 마크업 |
|------|--------|
| 컨테이너 | `role="radiogroup"` + `aria-label="[그룹명]"` 필수 |
| 슬라이더 | `<span class="segment__slider" aria-hidden="true">` — 장식 전용, 스크린리더 제외 |
| 아이템 | `role="radio"` + `aria-checked="true/false"` 필수 |
| disabled | root에 `segment--disabled` + `aria-disabled="true"`, 각 아이템에 `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| 키보드 | `←` · `→` — 선택 이동 (JS 구현 필요). `Tab` — 그룹 단위로 포커스 이동 |

포커스 링은 전역 `*:focus-visible` 규칙으로 처리된다.

---

## Do / Don't

> ✅ DO — 컨테이너에 `role="radiogroup"` + `aria-label` 제공
> `<div class="segment" role="radiogroup" aria-label="결제 방식">`

> ✅ DO — `segment__slider`를 첫 번째 자식으로 배치하고 JS로 초기 위치 즉시 설정
> 초기 렌더 시 transition 없이 위치를 세팅해야 첫 로드에 슬라이드 애니메이션이 발생하지 않는다

> ✅ DO — 페이지 로드 후 반드시 `updateSlider()` 초기화 실행
> JS 초기화 없이는 `segment__slider`가 `left:0` 위치에 고정되어 선택 표시가 잘못 렌더링된다

> ✅ DO — 초기 상태에서 반드시 하나의 아이템이 선택되어 있어야 함
> 선택 없는 초기 상태 금지 — 사용자가 현재 모드를 알 수 없다

> ✅ DO — 즉시 반영되는 단일 선택에만 사용
> 저장 액션이 있는 폼 내 선택지에는 Radio 사용

> ❌ DON'T — 개별 아이템만 비활성화
> 전체 컨테이너 단위(`segment--disabled`)로만 비활성화 가능

> ❌ DON'T — 아이템 2개 미만 사용
> 옵션이 하나뿐이면 Segment가 아닌 Toggle 또는 단일 버튼 사용

> ❌ DON'T — 폼 제출이 필요한 선택지에 사용
> 저장 버튼과 함께 쓰이는 선택지에는 Radio 사용
