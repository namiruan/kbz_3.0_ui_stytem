---
file: components/molecules/breadcrumb.md
version: 0.12.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, tokens/radius.md, tokens/height.md, tokens/motion.md, tokens/icon.md, components/atoms/link.md, components/atoms/icon.md
---

# Breadcrumb

## 개요

현재 페이지의 계층 경로를 표시하는 네비게이션 보조 컴포넌트. Link Atom들을 구분자(Chevron)로 연결하고 마지막 항목을 현재 위치로 표시한다.

SidebarNav·TopNav와의 차이 — 전역 위치가 아닌 **현재 페이지의 경로 맥락**을 제공한다. 페이지 제목 바로 위, 또는 TopNav 하단에 배치한다.

---

## Variant

Variant 없음. 항목 수·축약 여부는 사용 지침의 제약 조건으로 관리한다.

---

## 사용 지침

### 제약

- 마지막 항목(현재 페이지)은 링크가 아닌 `span.breadcrumb__current`로 렌더링한다.
- 항목이 너무 많아 공간이 부족하면 중간 항목을 `…` 버튼으로 축약한다 — 첫 항목과 마지막 2개는 항상 표시.
- Breadcrumb 자체에 배경·border를 주지 않는다. 컨테이너의 배경이 적용된다.

---

## 동작

<!-- AI:
- 생략 버튼 클릭: 숨겨진 li.breadcrumb__item--hidden을 모두 표시하고 버튼 자체를 제거한다.
  - aria-expanded="false" → 클릭 시 hidden 항목 display, 버튼 remove
  - 한 번 펼치면 다시 접는 기능은 제공하지 않는다.
-->

```js init
function initBreadcrumb(container) {
  var btn = container.querySelector('#bc-ellipsis');
  if (!btn || btn.hasAttribute('data-init-breadcrumb')) return;
  btn.setAttribute('data-init-breadcrumb', '');
  btn.addEventListener('click', function() {
    btn.setAttribute('aria-expanded', 'true'); /* 스크린리더가 상태 변화 인지 후 제거 */
    var hidden = container.querySelectorAll('.breadcrumb__item--hidden');
    hidden.forEach(function(item) { item.classList.remove('breadcrumb__item--hidden'); });
    /* 버튼 li(ellipsis + sep) 제거 */
    btn.closest('.breadcrumb__item').remove();
  });
}

if (window.__componentInits && !window.__componentInits.initBreadcrumb) window.__componentInits.initBreadcrumb = initBreadcrumb;
```

:::preview
<nav data-component class="breadcrumb" aria-label="경로">
  <ol id="bc-demo" class="breadcrumb__list">
    <li class="breadcrumb__item">
      <a class="breadcrumb__link text-breadcrumb" href="#">홈</a>
      <span class="breadcrumb__sep" aria-hidden="true"><svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
    </li>
    <li class="breadcrumb__item">
      <button id="bc-ellipsis" class="breadcrumb__ellipsis" type="button" aria-label="숨겨진 경로 보기" aria-expanded="false">…</button>
      <span class="breadcrumb__sep" aria-hidden="true"><svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
    </li>
    <li class="breadcrumb__item breadcrumb__item--hidden">
      <a class="breadcrumb__link text-breadcrumb" href="#">조직 관리</a>
      <span class="breadcrumb__sep" aria-hidden="true"><svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
    </li>
    <li class="breadcrumb__item breadcrumb__item--hidden">
      <a class="breadcrumb__link text-breadcrumb" href="#">부서</a>
      <span class="breadcrumb__sep" aria-hidden="true"><svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
    </li>
    <li class="breadcrumb__item">
      <a class="breadcrumb__link text-breadcrumb" href="#">설정</a>
      <span class="breadcrumb__sep" aria-hidden="true"><svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__current text-breadcrumb" aria-current="page">사용자 관리</span>
    </li>
  </ol>
</nav>
<script>
initBreadcrumb(stage);
</script>
:::

---

## Anatomy

<!-- AI:
- root = nav.breadcrumb[aria-label="경로"]. 페이지마다 고유한 aria-label을 줄 수 있다.
- ol.breadcrumb__list: 순서가 있는 경로 목록. display: flex; list-style: none.
- li.breadcrumb__item: 각 경로 항목.
  - 링크 항목: a.breadcrumb__link.text-breadcrumb
  - 현재 항목(마지막): span.breadcrumb__current.text-breadcrumb[aria-current="page"]
  - 구분자: span.breadcrumb__sep[aria-hidden="true"] > svg (icon-chevron-right). 마지막 li에는 포함하지 않는다.
- 항목 축약 시: li.breadcrumb__item > button.breadcrumb__ellipsis[aria-label="경로 더 보기"] + span.breadcrumb__sep.
-->

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl)">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">기본 (3단계)</p>
  <nav data-component class="breadcrumb" aria-label="경로">
    <ol class="breadcrumb__list">
      <li class="breadcrumb__item">
        <a class="breadcrumb__link text-breadcrumb" href="#">홈</a>
        <span class="breadcrumb__sep" aria-hidden="true"><svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </li>
      <li class="breadcrumb__item">
        <a class="breadcrumb__link text-breadcrumb" href="#">설정</a>
        <span class="breadcrumb__sep" aria-hidden="true"><svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </li>
      <li class="breadcrumb__item">
        <span class="breadcrumb__current text-breadcrumb" aria-current="page">사용자 관리</span>
      </li>
    </ol>
  </nav>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">축약 (중간 경로 생략)</p>
  <nav data-component class="breadcrumb" aria-label="경로">
    <ol class="breadcrumb__list">
      <li class="breadcrumb__item">
        <a class="breadcrumb__link text-breadcrumb" href="#">홈</a>
        <span class="breadcrumb__sep" aria-hidden="true"><svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </li>
      <li class="breadcrumb__item">
        <button class="breadcrumb__ellipsis" type="button" aria-label="숨겨진 경로 보기" aria-expanded="false">…</button>
        <span class="breadcrumb__sep" aria-hidden="true"><svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </li>
      <li class="breadcrumb__item">
        <a class="breadcrumb__link text-breadcrumb" href="#">설정</a>
        <span class="breadcrumb__sep" aria-hidden="true"><svg aria-hidden="true" style="width:14px;height:14px"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </li>
      <li class="breadcrumb__item">
        <span class="breadcrumb__current text-breadcrumb" aria-current="page">사용자 관리</span>
      </li>
    </ol>
  </nav>
</div>

</div>
:::

---

## CSS

```css
/* ── Base ── */
.breadcrumb { display: inline-flex; }

.breadcrumb__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-gap-2xs);
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb__item {
  display: flex;
  align-items: center;
  gap: var(--space-gap-2xs);
}

/* ── Link ── */
.breadcrumb__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-gap-xs);
  height: var(--height-compact);
  border: none;
  border-radius: var(--radius-xs);
  background: transparent;
  color: var(--color-text-label);
  text-decoration: none;
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  cursor: pointer;
  transition: background var(--duration-fast) var(--easing-base),
              color var(--duration-fast) var(--easing-base);
}
.breadcrumb__link:hover {
  background: var(--color-action-neutral-hover);
  color: var(--color-text-body);
}
.breadcrumb__link:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: 2px;
}

/* ── Current page ── */
.breadcrumb__current {
  color: var(--color-text-body);
  font-weight: var(--font-weight-heading);
}

/* ── Hidden items (축약 시 JS로 토글) ── */
.breadcrumb__item--hidden { display: none; }

/* ── Separator ── */
.breadcrumb__sep {
  display: flex;
  align-items: center;
  color: var(--color-text-subtle);
  flex-shrink: 0;
}
.breadcrumb__sep svg { display: block; }

/* ── Ellipsis button (축약) ── */
.breadcrumb__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-gap-xs);
  height: var(--height-compact);
  border: none;
  border-radius: var(--radius-xs);
  background: transparent;
  color: var(--color-text-label);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  cursor: pointer;
  transition: background var(--duration-fast) var(--easing-base),
              color var(--duration-fast) var(--easing-base);
}
.breadcrumb__ellipsis:hover {
  background: var(--color-action-neutral-hover);
  color: var(--color-text-body);
}
.breadcrumb__ellipsis:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: 2px;
}
```

---

## 접근성

네비게이션 랜드마크 유형 (`accessibility.md` 네비게이션 행 적용).

| 상황 | 마크업 |
|------|--------|
| 루트 | `<nav aria-label="경로">` — 페이지에 nav가 여러 개일 때 구분하는 레이블 |
| 현재 페이지 | `<span aria-current="page">` — 링크 아닌 span으로 렌더링 |
| 구분자 | `aria-hidden="true"` — 스크린리더에 전달하지 않는다 |
| 축약 버튼 | `<button aria-label="숨겨진 경로 보기" aria-expanded="false">` |
| 키보드 | Tab으로 링크 간 이동. 축약 버튼은 Enter/Space로 확장 |

---

## Do / Don't

> ✅ DO — 마지막 항목은 링크가 아닌 span으로 렌더링
> `<span class="breadcrumb__current" aria-current="page">사용자 관리</span>`

> ❌ DON'T — 현재 페이지를 링크로 처리
> `<a href="/users" aria-current="page">사용자 관리</a>` — 현재 페이지로의 링크는 의미 없음

> ✅ DO — 항목이 5개 이상이면 중간을 축약 버튼으로 생략
> 첫 항목과 마지막 2개는 항상 표시한다

> ❌ DON'T — 항목이 1개(루트만)일 때 표시
> 경로 맥락이 없으면 컴포넌트 자체를 렌더링하지 않는다

> ❌ DON'T — 구분자를 텍스트 콘텐츠로 처리
> `<span>/</span>` — aria-hidden="true" 없이 스크린리더에 읽힘. chevron SVG + aria-hidden 사용

## 플래너 패턴

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<nav class="breadcrumb" aria-label="경로">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item">
      <a class="breadcrumb__link text-breadcrumb" href="{url}">{경로명}</a>
      <span class="breadcrumb__sep" aria-hidden="true">
        <svg aria-hidden="true" style="width:14px;height:14px">
          <use href="icons/sprite.svg#icon-chevron-right"/>
        </svg>
      </span>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__current text-breadcrumb" aria-current="page">{현재 페이지}</span>
    </li>
  </ol>
</nav>
```

변형: 없음 (Variant 없는 컴포넌트)
중간 항목 축약 시: `button.breadcrumb__ellipsis[aria-label="숨겨진 경로 보기"][aria-expanded="false"]` + 숨길 항목에 `breadcrumb__item--hidden`
JS init: `initBreadcrumb(container)` (축약 버튼 사용 시)
