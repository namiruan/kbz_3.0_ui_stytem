---
file: components/atoms/link.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/stroke.md, tokens/motion.md
---

# Link

## 개요

인라인 텍스트 하이퍼링크. 페이지 내·외부 URL 탐색 전용. 클릭 시 JS 액션만 실행하거나 독립 클릭 영역이 필요한 경우 Button(ghost variant)을 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| external | — | — (`target="_blank"` + `rel="noopener noreferrer"` 추가) |

---

## Anatomy

<!-- AI: root(<a class="link">). 인라인 요소. 부모 font 속성 상속 — 이 컴포넌트는 color·decoration만 정의한다.
disabled: <a>는 HTML disabled 미지원 — aria-disabled="true" + tabindex="-1" 조합으로 처리한다. -->

:::preview
<div style="display:flex; flex-direction:column; gap: var(--space-gap-md);" class="text-body">
  <div>
    <a data-component class="link" href="#">기본 링크</a>
  </div>
  <div>
    <a data-component class="link link--disabled" aria-disabled="true" tabindex="-1">비활성 링크</a>
  </div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
/* 부모의 font 속성을 상속하고 color·decoration만 재정의한다. */
/* text-underline-offset: 3px — 텍스트 baseline과 밑줄 사이 간격. 전용 토큰 없어 px 직접 사용 */
.link {
  color: var(--color-text-brand-vivid);
  text-decoration: underline;
  text-decoration-thickness: var(--stroke-sm);
  text-underline-offset: 3px;
  cursor: pointer;
  transition: color var(--duration-fast) var(--easing-base);
}
.link:hover {
  color: var(--color-text-brand);
}

/* ── Disabled ── */
/* <a>는 disabled 속성 미지원. aria-disabled + pointer-events 조합으로 처리. */
/* text-decoration-color 명시 — color 상속만으로는 브라우저별 렌더링 차이가 있음 */
.link--disabled,
.link[aria-disabled="true"] {
  color: var(--color-text-disabled);
  text-decoration-color: var(--color-text-disabled);
  pointer-events: none;
  cursor: default;
}
```

---

## 접근성

탐색 링크. 키보드 Tab 포커스 해당.

| 항목 | 내용 |
|------|------|
| href 필수 | href 없는 앵커는 키보드 포커스 불가. 탐색 없는 액션은 `<button>` 사용 |
| 외부 링크 | `target="_blank"` 시 `rel="noopener noreferrer"` 필수. 외부 이동을 알리는 아이콘 또는 sr-only 텍스트 권장. `<span class="sr-only">(새 창 열림)</span>` 추가 권장 |
| disabled | `<a>`에 `disabled` 속성 없음 — `aria-disabled="true"` + `tabindex="-1"` + `pointer-events: none` |
| focus ring | 전역 `*:focus-visible` 규칙으로 처리 |

---

## Do / Don't

> ✅ DO — URL 탐색에 Link, 액션 실행에 Button
> `<a class="link" href="/dashboard">대시보드로 이동</a>`

> ❌ DON'T — JS 액션 전용에 Link 사용 (href 없이)
> `<a class="link" onclick="doSomething()">삭제</a>` → `<button class="btn btn--ghost btn--md">삭제</button>`

> ✅ DO — 외부 링크에 rel 명시
> `<a class="link" href="https://..." target="_blank" rel="noopener noreferrer">외부</a>`

> ❌ DON'T — disabled에 HTML disabled 속성 사용 (`<a>` 미지원)
> `<a class="link" disabled>링크</a>`

## 플래너 패턴

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<a class="link" href="{url}">{링크 텍스트}</a>
```

변형: `link--disabled`
상태: disabled — `aria-disabled="true"` + `tabindex="-1"` 추가, `href` 생략
JS init: 없음
