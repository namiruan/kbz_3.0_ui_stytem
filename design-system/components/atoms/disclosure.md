---
file: components/atoms/disclosure.md
version: 0.3.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/motion.md, tokens/stroke.md, tokens/radius.md, tokens/icon.md, components/atoms/icon.md
---

# Disclosure

## 개요

텍스트 흐름 안에 인라인으로 삽입되는 펼침/접힘 토글. 긴 설명을 초기에는 숨기고 사용자가 원할 때 펼칠 수 있도록 한다. 테이블 셀·헬퍼 텍스트·알림 메시지 등 콘텐츠 내부에서 보조 설명을 제어한다.

Accordion과의 차이 — Accordion은 헤더가 있는 독립 섹션 단위 레이아웃 컴포넌트. Disclosure는 텍스트 흐름 안에 삽입되는 설명 토글이며, 별도 섹션 구조 없이 단독으로 동작한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| state | collapsed (기본, 클래스 없음) · expanded → `disclosure--expanded` | collapsed |
| display | default (레이블 + 아이콘) · label-only → `disclosure--label-only` · icon-only → `disclosure--icon-only` | default |

트리거 레이블("더 보기" / "접기")은 JS가 갱신한다. 커스텀 레이블이 필요하면 `data-label-expand` · `data-label-collapse` 속성으로 재정의한다.
`icon-only`는 주변에 타이틀 등 시각적 컨텍스트가 충분한 경우에만 사용하고, 트리거에 `aria-label`을 반드시 지정한다.

---

## 사용 지침

| 상황 | 권장 |
|------|------|
| 테이블 셀·헬퍼 텍스트 안의 보조 설명 | Disclosure |
| 긴 본문 끝의 "더 읽기" 패턴 | Disclosure |
| 섹션 단위 정보 밀도 제어 | Accordion |
| 헤더가 있는 독립 구역 접기 | Accordion |

**제약**
- `disclosure__body` 안에 포커스 가능한 요소를 포함할 수 있다. 접힌 상태(`display: none`)에서는 포커스 도달 불가 — 별도 처리 불필요.
- 레이블이 맥락 없이 "더 보기"만으로 불명확한 경우 `aria-label`로 보충한다.
- `<p>` 안에서 사용할 때는 `span` 태그를 유지한다. `div`를 삽입하면 HTML 유효성 위반.

---

## 동작

| 이벤트 | 동작 |
|--------|------|
| 트리거 클릭 (접힌 상태) | `disclosure--expanded` 추가 + `aria-expanded="true"` + 레이블 → "접기" + body 표시 |
| 트리거 클릭 (펼친 상태) | `disclosure--expanded` 제거 + `aria-expanded="false"` + 레이블 → "더 보기" + body 숨김 |
| `Enter` · `Space` (트리거 포커스 중) | `<button>` 기본 동작으로 자동 처리 |

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xl);max-width:520px">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">접힌 상태</p>
  <p style="font-size:var(--font-size-base);color:var(--color-text-body);line-height:var(--line-height-reading);margin:0">
    이 정책은 조직 전체에 적용됩니다.
    <span data-component class="disclosure" id="disc-demo-1">
      <button class="disclosure__trigger" type="button" aria-expanded="false" aria-controls="disc-demo-1-body">
        <span class="disclosure__label">더 보기</span><span class="icon-on--sm disclosure__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <span class="disclosure__body" id="disc-demo-1-body">관리자 권한이 있는 사용자는 설정 페이지에서 예외 항목을 별도로 지정할 수 있습니다.</span>
    </span>
  </p>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">펼친 상태</p>
  <p style="font-size:var(--font-size-base);color:var(--color-text-body);line-height:var(--line-height-reading);margin:0">
    이 정책은 조직 전체에 적용됩니다.
    <span data-component class="disclosure disclosure--expanded" id="disc-demo-2">
      <button class="disclosure__trigger" type="button" aria-expanded="true" aria-controls="disc-demo-2-body">
        <span class="disclosure__label">접기</span><span class="icon-on--sm disclosure__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <span class="disclosure__body" id="disc-demo-2-body">관리자 권한이 있는 사용자는 설정 페이지에서 예외 항목을 별도로 지정할 수 있습니다.</span>
    </span>
  </p>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">커스텀 레이블</p>
  <p style="font-size:var(--font-size-base);color:var(--color-text-body);line-height:var(--line-height-reading);margin:0">
    김철수 외 3명이 이 항목을 수정했습니다.
    <span data-component class="disclosure" data-label-expand="수정 내역 보기" data-label-collapse="닫기">
      <button class="disclosure__trigger" type="button" aria-expanded="false" aria-controls="disc-demo-3-body" aria-label="수정 내역 더 보기">
        <span class="disclosure__label">수정 내역 보기</span><span class="icon-on--sm disclosure__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <span class="disclosure__body" id="disc-demo-3-body">2026-05-30 김철수, 2026-05-29 이영희, 2026-05-28 박민준</span>
    </span>
  </p>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">label-only — 레이블만, 아이콘 없음</p>
  <p style="font-size:var(--font-size-base);color:var(--color-text-body);line-height:var(--line-height-reading);margin:0">
    이 정책은 조직 전체에 적용됩니다.
    <span data-component class="disclosure disclosure--label-only">
      <button class="disclosure__trigger" type="button" aria-expanded="false" aria-controls="disc-demo-4-body">
        <span class="disclosure__label">더 보기</span><span class="icon-on--sm disclosure__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <span class="disclosure__body" id="disc-demo-4-body">관리자 권한이 있는 사용자는 설정 페이지에서 예외 항목을 별도로 지정할 수 있습니다.</span>
    </span>
  </p>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">icon-only — 타이틀 옆 화살표만</p>
  <p style="font-size:var(--font-size-base);color:var(--color-text-body);line-height:var(--line-height-reading);margin:0;display:flex;align-items:center;gap:var(--space-gap-xs)">
    적용 정책 설명
    <span data-component class="disclosure disclosure--icon-only" data-label-expand="적용 정책 설명 더 보기" data-label-collapse="적용 정책 설명 접기">
      <button class="disclosure__trigger" type="button" aria-expanded="false" aria-controls="disc-demo-5-body" aria-label="적용 정책 설명 더 보기">
        <span class="disclosure__label">더 보기</span><span class="icon-on--sm disclosure__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
      </button>
      <span class="disclosure__body" id="disc-demo-5-body">관리자 권한이 있는 사용자는 설정 페이지에서 예외 항목을 별도로 지정할 수 있습니다.</span>
    </span>
  </p>
</div>

</div>
<script>
(function() {
  stage.querySelectorAll('.disclosure').forEach(function(disc) {
    var trigger = disc.querySelector('.disclosure__trigger');
    var label = trigger.querySelector('.disclosure__label');
    var expandLabel   = disc.dataset.labelExpand   || '더 보기';
    var collapseLabel = disc.dataset.labelCollapse || '접기';
    trigger.addEventListener('click', function() {
      var expanded = disc.classList.toggle('disclosure--expanded');
      trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      label.textContent = expanded ? collapseLabel : expandLabel;
      // icon-only: 텍스트 레이블이 숨겨지므로 aria-label로 상태 전달
      if (disc.classList.contains('disclosure--icon-only')) {
        trigger.setAttribute('aria-label', expanded ? collapseLabel : expandLabel);
      }
    });
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = span.disclosure — 인라인 컨텍스트에서 사용. 텍스트 흐름 안에 삽입. <p> 안에서도 span 유지.
- trigger = button.disclosure__trigger[aria-expanded="false/true"][aria-controls="body-id"] — 인라인 버튼. font-size·line-height를 부모에서 상속해 주변 텍스트와 자연스럽게 맞춰짐.
  - label = span.disclosure__label — 트리거 텍스트. JS가 "더 보기" ↔ "접기" 전환. 커스텀 시 data-label-expand·data-label-collapse 속성.
  - icon = span.icon-on--sm.disclosure__icon[aria-hidden="true"] — 셰브론. icon-on--sm으로 아이콘 버튼 형태(padding + radius). hover 시 neutral 배경. disclosure--expanded 시 180deg 회전.
- body = span.disclosure__body[id="body-id"] — 접힌 상태 display:none, 펼친 상태 display:block. <p> 안에서도 span 사용.
- expanded = disclosure--expanded — JS 토글. aria-expanded="true" + body 표시 + 아이콘 회전.
- display variant:
  - disclosure--label-only: 레이블만 표시, 아이콘 숨김(CSS). 텍스트 맥락이 충분할 때.
  - disclosure--icon-only: 아이콘만 표시, 레이블 숨김(CSS). 타이틀 옆 등 시각 컨텍스트가 있을 때. aria-label 필수. JS가 aria-label도 함께 갱신.
- 커스텀 레이블: data-label-expand · data-label-collapse 속성으로 기본 "더 보기"/"접기" 대체.
- icon-only에서 data-label-expand · data-label-collapse는 aria-label 갱신 값으로도 사용됨.
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">collapsed</span>
  <span data-component class="disclosure">
    <button class="disclosure__trigger" type="button" aria-expanded="false" aria-controls="anat-disc-1">
      <span class="disclosure__label">더 보기</span><span class="icon-on--sm disclosure__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
    </button>
    <span class="disclosure__body" id="anat-disc-1">펼쳐진 설명 텍스트가 여기에 표시됩니다.</span>
  </span>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">expanded</span>
  <span data-component class="disclosure disclosure--expanded">
    <button class="disclosure__trigger" type="button" aria-expanded="true" aria-controls="anat-disc-2">
      <span class="disclosure__label">접기</span><span class="icon-on--sm disclosure__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
    </button>
    <span class="disclosure__body" id="anat-disc-2">펼쳐진 설명 텍스트가 여기에 표시됩니다.</span>
  </span>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">label-only</span>
  <span data-component class="disclosure disclosure--label-only">
    <button class="disclosure__trigger" type="button" aria-expanded="false" aria-controls="anat-disc-3">
      <span class="disclosure__label">더 보기</span><span class="icon-on--sm disclosure__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
    </button>
    <span class="disclosure__body" id="anat-disc-3">펼쳐진 설명 텍스트가 여기에 표시됩니다.</span>
  </span>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">icon-only</span>
  <span data-component class="disclosure disclosure--icon-only" data-label-expand="설명 더 보기" data-label-collapse="설명 접기">
    <button class="disclosure__trigger" type="button" aria-expanded="false" aria-controls="anat-disc-4" aria-label="설명 더 보기">
      <span class="disclosure__label">더 보기</span><span class="icon-on--sm disclosure__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-down"/></svg></span>
    </button>
    <span class="disclosure__body" id="anat-disc-4">펼쳐진 설명 텍스트가 여기에 표시됩니다.</span>
  </span>
</div>

</div>
<script>
(function() {
  stage.querySelectorAll('.disclosure').forEach(function(disc) {
    var trigger = disc.querySelector('.disclosure__trigger');
    var label = trigger.querySelector('.disclosure__label');
    var expandLabel   = disc.dataset.labelExpand   || '더 보기';
    var collapseLabel = disc.dataset.labelCollapse || '접기';
    trigger.addEventListener('click', function() {
      var expanded = disc.classList.toggle('disclosure--expanded');
      trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      label.textContent = expanded ? collapseLabel : expandLabel;
      if (disc.classList.contains('disclosure--icon-only')) {
        trigger.setAttribute('aria-label', expanded ? collapseLabel : expandLabel);
      }
    });
  });
})();
</script>
:::

---

## CSS

```css
/* ── Root ── */
/* 인라인 삽입 — 주변 텍스트 흐름에 자연스럽게 이어짐 */
.disclosure {
  display: inline;
}

/* ── Label ── */
/* 주변 본문보다 한 단계 작은 크기로 "더 보기" 레이블을 표기 */
.disclosure__label {
  font-size: var(--font-size-sm);
}

/* ── Trigger ── */
/* font-size·line-height 상속 — 삽입된 컨텍스트 폰트와 자동으로 맞춰짐 */
.disclosure__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-2xs);
  color: var(--color-text-brand);
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  transition: color var(--duration-fast) var(--easing-base);
}
.disclosure__trigger:hover {
  color: var(--color-text-brand-vivid);
}
.disclosure__trigger:hover .disclosure__icon {
  background: var(--color-action-neutral-hover);
}
.disclosure__trigger:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
  border-radius: var(--radius-xs);
}

/* ── Icon ── */
/* icon-on--sm 유틸리티로 아이콘 버튼 형태(padding + radius) 적용.
   collapsed: 0deg, expanded: 180deg 회전 */
.disclosure__icon {
  background: transparent;
  transition: transform var(--duration-fast) var(--easing-base),
              background var(--duration-fast) var(--easing-base);
}
.disclosure--expanded .disclosure__icon {
  transform: rotate(180deg);
}

/* ── Display variant ── */
/* label-only: 레이블만 표시, 아이콘 숨김 */
.disclosure--label-only .disclosure__icon { display: none; }
/* icon-only: 아이콘만 표시, 레이블 숨김. aria-label 필수 */
.disclosure--icon-only .disclosure__label { display: none; }

/* ── Body ── */
.disclosure__body {
  display: none;
}
.disclosure--expanded .disclosure__body {
  display: block;
  margin-top: var(--space-gap-xs);
  color: var(--color-text-subtle);
}
```

---

## 접근성

disclosure(펼침/접힘) 패턴.

| 상황 | 마크업 |
|------|--------|
| 트리거 버튼 | `<button aria-expanded="false/true" aria-controls="body-id">` |
| 콘텐츠 영역 | `<span id="body-id">` — 짧은 보조 설명은 `role="region"` 생략 가능 |
| 셰브론 아이콘 | `aria-hidden="true"` — 시각 전용 |
| 레이블 불명확 시 | `aria-label="수정 내역 더 보기"` 등 컨텍스트 보충 |
| icon-only | `aria-label` 필수. JS가 펼침/접힘 시 `aria-label`도 갱신 |
| 키보드 — `Tab` · `Shift+Tab` | 트리거 버튼으로 포커스 이동. `<button>` 기본 동작 |
| 키보드 — `Enter` · `Space` | 트리거 활성화. `<button>` 기본 동작으로 자동 지원 |

```js
trigger.addEventListener('click', function() {
  var expanded = disc.classList.toggle('disclosure--expanded');
  trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  label.textContent = expanded ? collapseLabel : expandLabel;
});
```

---

## Do / Don't

> ✅ DO — `<button>`으로 트리거 정의
> 키보드 접근·스크린리더 버튼 역할 자동 지원

> ❌ DON'T — `<span onclick>` 등 비버튼 요소로 트리거 구현
> 키보드 탐색 불가, 스크린리더 인식 불가

> ✅ DO — `<p>` 안에서 root와 body에 `span` 태그 사용
> `<p>` 안에 `div` 삽입 시 HTML 유효성 위반

> ❌ DON'T — 섹션 단위 접기/펼치기에 Disclosure 사용
> 헤더가 있는 독립 섹션은 Accordion 사용

> ✅ DO — 레이블이 불명확하면 `aria-label`로 컨텍스트 보충
> `<button aria-label="정책 설명 더 보기">`

> ✅ DO — 커스텀 레이블은 `data-label-expand` · `data-label-collapse` 속성 사용
> `<span class="disclosure" data-label-expand="자세히" data-label-collapse="닫기">`

> ❌ DON'T — `disclosure--icon-only`에 `aria-label` 생략
> 시각 레이블이 없으므로 스크린리더가 버튼 목적을 인식할 수 없음

> ✅ DO — `icon-only`는 주변에 타이틀 등 시각 컨텍스트가 있을 때만 사용
> 단독으로 쓰면 사용자가 무엇을 펼치는지 알 수 없음 — 이 경우 `default` 또는 `label-only` 사용
