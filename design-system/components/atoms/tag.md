---
file: components/atoms/tag.md
version: 3.2.1
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/motion.md, tokens/icon.md, components/atoms/icon-button.md, utilities/icon.css
---

# Tag

## 개요

분류·필터·속성을 표시하는 인라인 레이블. 선택(selectable)·제거(removable) 인터랙션이 가능하다.

Badge와의 차이 — Badge는 비인터랙티브 상태 표시 전용이고, Tag는 사용자가 선택하거나 제거할 수 있는 인터랙티브 레이블이다. 단순 상태·분류 표시에는 Badge를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| shape | rect(기본, 클래스 없음) · pill → `tag--pill` | rect |
| size | sm(기본, 클래스 없음) · md → `tag--md` | sm |
| interaction | selectable · removable | — |
| state | default · selected → `tag--selected` · disabled → `tag--disabled` | default |

state는 selectable에만 적용된다. selectable과 removable은 동시에 사용하지 않는다. removable은 항상 selected 스타일로 표시된다 — 선택된 항목을 제거하는 용도이기 때문이다. removable은 rect 전용이다 — pill 내부 아이콘 버튼의 hover 영역이 rect로 충돌한다.

---

## 사용 지침

### 선택 기준

| 상황 | 사용 |
|------|------|
| 필터 선택·해제 | `selectable` — 전체 태그가 버튼 |
| 선택된 항목 제거 (태그 입력 필드 등) | `removable` — X 버튼으로 개별 제거. selected 스타일 고정 |
| 고정된 선택값 (변경·제거 불가) | `<span class="tag tag--selected">` — 인터랙션 없는 고정값은 span 사용 |
| 비인터랙티브 상태 레이블 | Badge 사용 |

### shape 선택 기준

| 상황 | shape |
|------|-------|
| 일반 필터·분류 태그 | rect (기본) — ActionGroup과 시각 계층 통일 |
| 사람 이름·해시태그 등 소형 인라인 레이블 | pill |

---

## 동작

다중 선택 필터에서 고정 태그(removable 없음)와 사용자가 추가한 태그(removable)가 한 줄에 혼재하는 동작을 보여준다.

| 이벤트 | 동작 |
|--------|------|
| 미선택 태그 클릭 | 선택된 필터 영역에 removable 태그로 추가 |
| removable 태그 × 클릭 | 해당 태그 제거 + 미선택 태그 복원 |
| 고정 태그 | 인터랙션 없음 — removable 버튼 없어 제거 불가 |

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-stack-md);max-width:480px">
  <div>
    <p style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);margin:0 0 var(--space-stack-xs)">선택된 필터</p>
    <div id="demo-selected" style="display:flex;flex-wrap:wrap;gap:var(--space-gap-xs);min-height:28px">
      <span class="tag tag--selected">디자인</span>
    </div>
  </div>
  <div>
    <p style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);margin:0 0 var(--space-stack-xs)">필터 추가</p>
    <div id="demo-pool" style="display:flex;flex-wrap:wrap;gap:var(--space-gap-xs)">
      <button class="tag" aria-pressed="false" data-label="UX 리서치">UX 리서치</button>
      <button class="tag" aria-pressed="false" data-label="UI 디자인">UI 디자인</button>
      <button class="tag" aria-pressed="false" data-label="브랜딩">브랜딩</button>
      <button class="tag" aria-pressed="false" data-label="모션">모션</button>
      <button class="tag" aria-pressed="false" data-label="프로덕트">프로덕트</button>
    </div>
  </div>
</div>
<script>
(function() {
  var selected = stage.querySelector('#demo-selected');
  var pool = stage.querySelector('#demo-pool');

  pool.addEventListener('click', function(e) {
    var btn = e.target.closest('button.tag');
    if (!btn) return;
    var label = btn.dataset.label;
    btn.style.display = 'none';

    var removable = document.createElement('span');
    removable.className = 'tag tag--removable';
    removable.dataset.label = label;
    removable.innerHTML = label +
      ' <button class="icon-on--badge icon-on--brand" aria-label="' + label + ' 제거">' +
        '<svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>' +
      '</button>';
    removable.querySelector('button').addEventListener('click', function() {
      removable.remove();
      btn.style.display = '';
    });
    selected.appendChild(removable);
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = span.tag (removable) 또는 button.tag (selectable).
- shape 기본값 rect(radius-xs). pill → tag--pill.
- size 기본값 sm(height-dense 28px). md → tag--md(height-compact 32px).
- selectable: button.tag. JS가 tag--selected 토글. aria-pressed 필수.
- 고정 선택값(컨텍스트에 의해 변경 불가): span.tag.tag--selected. 인터랙션 없으므로 button 사용 금지.
- disabled: button.tag.tag--disabled + disabled + aria-disabled="true" + tabindex="-1". selected 동시 가능(tag--selected tag--disabled).
- removable: root는 span.tag.tag--removable. rect 전용(tag--pill 금지). selected 스타일 자동 적용(CSS). 자식으로 텍스트 노드 + icon-button. sm → icon-on--badge icon-on--brand, md → icon-on--sm icon-on--brand. icon-button aria-label="[태그명] 제거" 필수.
- selectable과 removable 동시 사용 금지.
- 제거 버튼 색은 부모 .tag의 color를 currentColor로 상속 — 별도 color 클래스 추가 불필요.
-->

### selectable

`<button class="tag">` — 전체 태그가 버튼. JS로 `tag--selected` 토글.

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <button data-component class="tag" aria-pressed="false">미선택</button>
  <button data-component class="tag tag--selected" aria-pressed="true">선택됨</button>
  <button data-component class="tag tag--md" aria-pressed="false">미선택</button>
  <button data-component class="tag tag--selected tag--md" aria-pressed="true">선택됨</button>
  <button data-component class="tag tag--pill" aria-pressed="false" style="margin-inline-start: var(--space-16);">미선택</button>
  <button data-component class="tag tag--selected tag--pill" aria-pressed="true">선택됨</button>
  <button data-component class="tag tag--pill tag--md" aria-pressed="false">미선택</button>
  <button data-component class="tag tag--selected tag--pill tag--md" aria-pressed="true">선택됨</button>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <button data-component class="tag tag--disabled" disabled aria-disabled="true" tabindex="-1">미선택</button>
  <button data-component class="tag tag--selected tag--disabled" disabled aria-disabled="true" tabindex="-1">선택됨</button>
  <button data-component class="tag tag--md tag--disabled" disabled aria-disabled="true" tabindex="-1">미선택</button>
  <button data-component class="tag tag--selected tag--md tag--disabled" disabled aria-disabled="true" tabindex="-1">선택됨</button>
  <button data-component class="tag tag--pill tag--disabled" disabled aria-disabled="true" tabindex="-1" style="margin-inline-start: var(--space-16);">미선택</button>
  <button data-component class="tag tag--selected tag--pill tag--disabled" disabled aria-disabled="true" tabindex="-1">선택됨</button>
  <button data-component class="tag tag--pill tag--md tag--disabled" disabled aria-disabled="true" tabindex="-1">미선택</button>
  <button data-component class="tag tag--selected tag--pill tag--md tag--disabled" disabled aria-disabled="true" tabindex="-1">선택됨</button>
</div>
</div>
:::

### removable

`<span class="tag tag--removable">` + icon-button. rect 전용. selected 스타일 고정. sm → `icon-on--badge icon-on--brand`, md → `icon-on--sm icon-on--brand`.

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">rect sm · md</span>
  <span data-component class="tag tag--removable">
    디자인
    <button class="icon-on--badge icon-on--brand" aria-label="디자인 제거">
      <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
    </button>
  </span>
  <span data-component class="tag tag--md tag--removable">
    디자인
    <button class="icon-on--sm icon-on--brand" aria-label="디자인 제거">
      <svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>
    </button>
  </span>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
  height: var(--height-dense);
  padding: var(--space-inset-squish-sm);
  border-radius: var(--radius-xs);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  background: var(--color-surface-base);
  color: var(--color-text-label);
  font-family: var(--font-family-base);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-body);
  line-height: var(--line-height-ui);
  white-space: nowrap;
  cursor: default;
  transition: background var(--duration-fast) var(--easing-base),
              border-color var(--duration-fast) var(--easing-base),
              color var(--duration-fast) var(--easing-base);
}

/* ── Shape: pill ── */
.tag--pill { border-radius: var(--radius-pill); }

/* ── Size: md ── */
.tag--md {
  height: var(--height-compact);
  padding: var(--space-inset-squish-md);
  font-size: var(--font-size-sm);
}

/* ── Selectable ── */
button.tag { cursor: pointer; }
/* 선택 시 브랜드 색으로 전환되므로 hover도 브랜드로 예고. 이미 선택된 상태는 제외 */
button.tag:not(.tag--selected):hover {
  background: var(--color-action-brand-hover);
  border-color: var(--color-border-brand-subtle);
  color: var(--color-text-brand-vivid);
}

/* ── Selected ── */
.tag--selected {
  background: var(--color-action-brand-subtle);
  border-color: var(--color-border-brand);
  color: var(--color-text-brand-vivid);
}

/* ── Disabled ── */
/* 미선택: 연한 회색 fill + text-disabled(gray-400) */
/* 선택됨: surface-disabled-strong(gray-200) — 배경이 진해지므로 text-subtle(gray-500)로 가독성 확보 */
.tag--disabled {
  pointer-events: none;
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  color: var(--color-text-disabled);
}
.tag--selected.tag--disabled {
  background: var(--color-surface-disabled-strong);
  color: var(--color-text-subtle);
}

/* ── Removable ── */
/* 선택된 항목을 제거하는 용도이므로 selected 스타일 고정 */
.tag--removable {
  background: var(--color-action-brand-subtle);
  border-color: var(--color-border-brand);
  color: var(--color-text-brand-vivid);
  padding-inline-end: var(--space-inset-xs);
}
/* 제거 버튼 색은 부모 color 상속 (icon-on--badge / icon-on--sm 기반 스타일은 utilities/icon.css 참조) */
```

---

## 접근성

버튼 유형 (`accessibility.md` 버튼 행 적용). 인터랙션 유무에 따라 요소를 다르게 사용한다.

| 상황 | 마크업 |
|------|--------|
| selectable | `<button class="tag" aria-pressed="false/true">` |
| disabled | `<button>` + `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| removable 제거 버튼 | `<button class="icon-on--badge" aria-label="[태그명] 제거">` |

포커스 링은 전역 `*:focus-visible` 규칙으로 처리된다.

---

## Do / Don't

> ✅ DO — selectable Tag는 `<button>` 사용, aria-pressed로 상태 표현
> `<button class="tag tag--pill" aria-pressed="true">디자인</button>`

> ✅ DO — removable 제거 버튼에 태그명 포함한 aria-label 제공
> `<button class="icon-on--badge icon-on--brand" aria-label="디자인 제거">…</button>`

> ✅ DO — removable의 root는 `<span>`, selectable의 root는 `<button>`
> `<span class="tag tag--removable">텍스트 <button class="icon-on--badge" …>…</button></span>`

> ✅ DO — 컨텍스트로 고정된 선택값은 `<span>`으로 표현
> `<span class="tag tag--selected">디자인</span>` — 클릭 이벤트가 없는 고정값은 버튼이 아닌 span 사용

> ❌ DON'T — 비인터랙티브 상태 레이블에 Tag 사용
> 색상·아이콘으로 상태를 전달하는 레이블에는 Badge 사용

> ❌ DON'T — pill + removable 조합
> pill 내부 icon-button의 hover 영역(rect)이 pill 형태와 충돌한다 — removable은 rect 전용

> ❌ DON'T — selectable과 removable 동시 사용
> 전체 버튼(selectable)과 내부 버튼(removable 제거)이 충돌 — 두 인터랙션을 하나의 태그에 두지 않는다

> ❌ DON'T — icon-on 크기와 size 불일치
> sm에는 `icon-on--badge icon-on--brand`, md에는 `icon-on--sm icon-on--brand` 사용 — 크기 혼용 금지
