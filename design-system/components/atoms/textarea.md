---
file: components/atoms/textarea.md
version: 1.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, tokens/typography.md
---

# Textarea

## 개요

여러 줄 텍스트 입력 필드. 줄바꿈이 필요한 긴 텍스트 입력에 사용한다. Label·HelpText·에러 메시지를 포함한 완성된 입력 단위는 FormField(Molecule)를 사용한다.

높이는 `rows` 속성으로 최소 행 수를 지정한다. height 토큰으로 고정하지 않는다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | md (기본, 클래스 없음) · sm → `textarea--sm` | md |
| state | readonly → `textarea--readonly` · disabled → `textarea--disabled` · error → `textarea--error` · complete → `textarea--complete` | — |

input과 달리 `success` 상태가 없다. 아이콘 인프라가 없어 success와 complete를 시각적으로 구분할 수 없기 때문이다.

- **완료** — `textarea--complete`: 조건 없는 필드의 blur 완료, 그리고 조건부 필드의 조건 통과 모두에 사용한다.
- **에러** — `textarea--error`: 글자 수 초과 등 조건 실패 시 적용. `aria-invalid="true"` 함께 사용.

---

## 동작

상태는 JS로 클래스를 전환한다.

### 조건 없는 필드 (textarea--complete)

유효성 검사 없이 값만 받는 필드. blur 시 자동으로 complete 상태가 된다.

| 이벤트 | 동작 |
|--------|------|
| `blur` (값 있음) | `textarea--complete` 추가 |
| `blur` (값 없음) | `textarea--complete` 제거 |
| `input` (값 지워짐) | `textarea--complete` 제거 |

:::preview
<div style="max-width:360px;width:100%">
  <textarea class="textarea" rows="3" placeholder="자유롭게 입력해 주세요" id="ta-none"></textarea>
</div>
<script>
(function() {
  var ta = stage.querySelector('#ta-none');
  ta.addEventListener('blur', function() {
    if (ta.value) { ta.classList.add('textarea--complete'); }
    else { ta.classList.remove('textarea--complete'); }
  });
  ta.addEventListener('input', function() {
    if (!ta.value) ta.classList.remove('textarea--complete');
  });
})();
</script>
:::

### 조건부 필드 (textarea--error / textarea--success)

유효성 조건이 있는 필드. error와 success는 항상 쌍으로 설계한다. blur 시 조건을 판별해 error/success를 전환한다.

| 이벤트 | 동작 |
|--------|------|
| `blur` (값 있음, 조건 실패) | `textarea--error` 추가, `aria-invalid="true"` |
| `blur` (값 있음, 조건 통과) | `textarea--complete` 적용 |
| `blur` (값 없음) | 상태 클래스 모두 제거 |
| `input` (값 지워짐) | 상태 클래스 제거 |

:::preview
<div style="max-width:360px;width:100%">
  <p class="text-helper" style="color:var(--color-text-subtle);margin-bottom:var(--space-gap-sm)">조건: 10자 이상 (blur 시 검증)</p>
  <textarea class="textarea" rows="3" placeholder="10자 이상 입력해 주세요" id="ta-cond"></textarea>
</div>
<script>
(function() {
  var ta = stage.querySelector('#ta-cond');
  function isValid(v) { return v.trim().length >= 10; }
  function clearState() {
    ta.classList.remove('textarea--error', 'textarea--complete');
    ta.removeAttribute('aria-invalid');
  }
  ta.addEventListener('blur', function() {
    if (!ta.value) { clearState(); return; }
    clearState();
    if (isValid(ta.value)) {
      ta.classList.add('textarea--complete');
    } else {
      ta.classList.add('textarea--error');
      ta.setAttribute('aria-invalid', 'true');
    }
  });
  ta.addEventListener('input', function() {
    if (!ta.value) { clearState(); }
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
기본 textarea (값 유무와 무관한 독립 상태):
- root = textarea.textarea. 크기·상태 클래스를 root에 조합.
- readonly: border 없음, background subtle. 포커스 가능, tab 순서 유지.
- disabled: pointer-events: none, tabindex="-1", aria-disabled="true" 셋 모두 필수.

상태 마크업 패턴:
- complete: textarea--complete. 조건 없는 필드의 blur 완료 및 조건부 필드의 조건 통과 모두에 사용. input과 달리 success 상태 없음.
- error:    textarea--error + aria-invalid="true". 조건부 필드의 조건 실패 (글자 수 초과 등).
-->

### 기본

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <div class="btn-group">
    <textarea data-component class="textarea textarea--sm" rows="2" placeholder="기본"></textarea>
    <textarea data-component class="textarea" rows="2" placeholder="기본"></textarea>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">readonly</span>
  <div class="btn-group">
    <textarea data-component class="textarea textarea--sm textarea--readonly" rows="2" readonly>읽기 전용</textarea>
    <textarea data-component class="textarea textarea--readonly" rows="2" readonly>읽기 전용</textarea>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div class="btn-group">
    <textarea data-component class="textarea textarea--sm textarea--disabled" rows="2" disabled aria-disabled="true" tabindex="-1">비활성</textarea>
    <textarea data-component class="textarea textarea--disabled" rows="2" disabled aria-disabled="true" tabindex="-1">비활성</textarea>
  </div>
</div>
</div>
:::

### 상태

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">complete</span>
  <div class="btn-group">
    <textarea data-component class="textarea textarea--sm textarea--complete" rows="2">입력 완료</textarea>
    <textarea data-component class="textarea textarea--complete" rows="2">입력 완료</textarea>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div class="btn-group">
    <textarea data-component class="textarea textarea--sm textarea--error" rows="2" aria-invalid="true">잘못된 형식</textarea>
    <textarea data-component class="textarea textarea--error" rows="2" aria-invalid="true">잘못된 형식</textarea>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.textarea {
  display: block;
  width: 100%;
  padding: var(--space-inset-squish-md);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-surface-base);
  color: var(--color-text-body);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-reading);
  resize: vertical;
  min-height: var(--height-base);
  transition: border-color var(--duration-fast) var(--easing-base), box-shadow var(--duration-fast) var(--easing-base);
}
.textarea::placeholder { color: var(--color-text-subtle); }

/* ── Size ── */
.textarea--sm { padding: var(--space-inset-squish-sm); font-size: var(--font-size-sm); min-height: var(--height-compact); }

/* ── Hover ── */
.textarea:hover:not(.textarea--disabled):not(.textarea--readonly) {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}

/* ── Focus ── */
/* outline·outline-offset은 전역 *:focus-visible에서 일괄 적용 — 재선언 금지 */
.textarea:focus-visible {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}

/* ── State ── */
.textarea--readonly {
  background: var(--color-surface-subtle);
  border-color: transparent;
  cursor: default;
}
.textarea--disabled {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  color: var(--color-text-disabled);
  pointer-events: none;
}
.textarea--error    { border-color: var(--color-border-error);    color: var(--color-text-error); }
.textarea--complete { border-color: var(--color-border-complete); }
```

```js init
/* blur 시 textarea--complete 토글. 조건부 필드는 ## 동작 패턴 직접 구현.
   data-validate-delayed: 액션 지연 검증 필드. 에러 상태에서 타이핑 시 complete로 자동 복귀. */
function initTextarea(el) {
  if (el.readOnly || el.disabled) return;
  var isDelayed = el.hasAttribute('data-validate-delayed');
  /* blur-based 필드: 이미 error 상태이면 리스너 불필요 */
  if (!isDelayed && el.classList.contains('textarea--error')) return;
  if (el.value && !el.classList.contains('textarea--error')) el.classList.add('textarea--complete');
  el.addEventListener('blur', function() {
    el.classList.toggle('textarea--complete', !!el.value && !el.classList.contains('textarea--error'));
  });
  el.addEventListener('input', function() {
    if (isDelayed && el.classList.contains('textarea--error')) {
      /* 에러 상태에서 타이핑 → 재검증 대기로 복귀 */
      el.classList.remove('textarea--error');
      el.removeAttribute('aria-invalid');
      el.classList.toggle('textarea--complete', !!el.value);
    } else if (!el.value) {
      el.classList.remove('textarea--complete');
    }
  });
}
function initTextareaContainer(container) {
  container.querySelectorAll('.textarea').forEach(function(el) {
    if (el.dataset.initTextarea) return;
    el.dataset.initTextarea = '1';
    initTextarea(el);
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initTextareaContainer) window.__componentInits.initTextareaContainer = initTextareaContainer;
```

---

## 접근성

텍스트 인풋 유형 (`accessibility.md` 텍스트 인풋 행 적용).

| 상황 | 마크업 |
|------|--------|
| 기본 | `<label for="id">` + `<textarea id="id" class="textarea">` |
| 에러 | `aria-invalid="true"` + `aria-describedby="[error-id]"`. 에러 span에 `role="alert"` |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| readonly | `readonly` 속성 — 포커스 가능, tab 순서 유지 |

에러 마크업 예시:

```html
<textarea class="textarea textarea--error" aria-invalid="true" aria-describedby="desc-error"></textarea>
<span id="desc-error" role="alert">내용을 입력해 주세요.</span>
```

---

## Do / Don't

> ❌ DON'T — height 토큰으로 높이 고정
> Textarea는 멀티라인이므로 height 고정 금지. rows 속성으로 최소 행 수를 지정한다

> ❌ DON'T — placeholder를 label 대용으로 사용
> 입력 시 사라지므로 레이블 역할 불가. 항상 `<label>`과 연결

> ✅ DO — 에러 메시지를 aria-describedby + role="alert"로 연결

```html
<textarea class="textarea textarea--error" aria-invalid="true" aria-describedby="desc-error"></textarea>
<span id="desc-error" role="alert">내용을 입력해 주세요.</span>
```
