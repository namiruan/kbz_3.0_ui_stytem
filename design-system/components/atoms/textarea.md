---
file: components/atoms/textarea.md
version: 2.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/typography.md
---

# Textarea

## 개요

여러 줄 텍스트 입력 필드. 기본은 테두리 있는 box, `textarea--ghost`를 더하면 기본 테두리가 없는 ghost로 동작한다. 줄바꿈이 필요한 긴 텍스트 입력에 사용한다. Label·HelpText·에러 메시지를 포함한 완성된 입력 단위는 FormField(Molecule)를 사용한다.

높이는 `rows` 속성으로 최소 행 수를 지정한다. height 토큰으로 고정하지 않는다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | md (기본, 클래스 없음) · sm → `textarea--sm` | md |
| ghost | off (기본, 클래스 없음) · on → `textarea--ghost` | off |
| state | readonly → `textarea--readonly` · disabled → `textarea--disabled` · error → `textarea--error` · complete → `textarea--complete` · success → `textarea--success` | — |

`textarea--ghost`는 기본 `border-color`만 transparent로 바꾸는 단순 수식자다. hover·focus·error 동작은 box와 동일하다.

상태는 두 계층으로 나뉜다. **기본 완료** — `textarea--complete`는 유효성 조건이 없는 필드에서 blur 시 적용한다. **조건부 쌍** — `textarea--error`·`textarea--success`는 유효성 조건이 있는 필드 전용이며 항상 쌍으로 설계한다 (조건 실패 → error, 수정 후 통과 → success). 같은 필드에 `textarea--complete`와 `textarea--error`/`textarea--success`를 혼용하지 않는다.

---

## 동작

상태는 JS로 클래스를 전환한다. 공통: clear 버튼 없음. blur 기반 상태 전환은 Input과 동일하다.

### 조건 없는 필드 (textarea--complete)

유효성 검사 없이 값만 받는 필드. blur 시 자동으로 complete 상태가 된다.

| 이벤트 | 동작 |
|--------|------|
| `blur` (값 있음) | `textarea--complete` 추가 |
| `blur` (값 없음) | `textarea--complete` 제거 |
| `input` (값 지워짐) | `textarea--complete` 제거 |

:::preview
<div style="max-width:360px;width:100%">
  <textarea class="textarea" rows="3" placeholder="내용을 입력해 주세요" id="ta-none"></textarea>
</div>
<script>
(function() {
  var ta = stage.querySelector('#ta-none');
  ta.addEventListener('blur', function() {
    if (ta.value) { ta.classList.add('textarea--complete'); }
    else { ta.classList.remove('textarea--complete'); }
  });
  ta.addEventListener('input', function() {
    if (!ta.value) { ta.classList.remove('textarea--complete'); }
  });
})();
</script>
:::

### 조건부 필드 (textarea--error / textarea--success)

유효성 조건이 있는 필드. error와 success는 항상 쌍으로 설계한다. blur 시 조건을 판별해 error/success를 전환한다.

| 이벤트 | 동작 |
|--------|------|
| `blur` (값 있음, 조건 실패) | `textarea--error` 추가, `aria-invalid="true"` |
| `blur` (값 있음, 조건 통과) | `textarea--success` 적용 |
| `blur` (값 없음) | 상태 클래스 모두 제거 |
| `input` (값 지워짐) | 상태 클래스 제거 |

:::preview
<div style="max-width:360px;width:100%">
  <p style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);margin-bottom:var(--space-8)">조건: 10자 이상 (blur 시 검증)</p>
  <textarea class="textarea" rows="3" placeholder="10자 이상 입력해 주세요" id="ta-cond"></textarea>
</div>
<script>
(function() {
  var ta = stage.querySelector('#ta-cond');
  function isValid(v) { return v.trim().length >= 10; }
  function clearState() {
    ta.classList.remove('textarea--error', 'textarea--success');
    ta.removeAttribute('aria-invalid');
  }
  ta.addEventListener('blur', function() {
    if (!ta.value) { clearState(); return; }
    clearState();
    if (isValid(ta.value)) {
      ta.classList.add('textarea--success');
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
- root = textarea.textarea. 크기·ghost·상태 클래스를 root에 조합.
- textarea--ghost: border-color만 transparent. hover·focus 동작은 box와 동일.
- readonly: border 없음, background subtle. 포커스 가능, tab 순서 유지.
- disabled: pointer-events: none, tabindex="-1", aria-disabled="true" 셋 모두 필수.

상태 마크업 패턴:
- complete: textarea--complete. 테두리 색 변화만, 아이콘 없음.
- error:    textarea--error + aria-invalid="true".
- success:  textarea--success.
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
  <span class="anatomy-label">default ghost</span>
  <div class="btn-group">
    <textarea data-component class="textarea textarea--sm textarea--ghost" rows="2" placeholder="고스트"></textarea>
    <textarea data-component class="textarea textarea--ghost" rows="2" placeholder="고스트"></textarea>
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
<div style="text-align:center;padding-bottom:0;font-weight:600;color:var(--color-text-label);font-family:var(--font-family-base);font-size:var(--font-size-label)">조건 없는 필드</div>
<div class="anatomy-row">
  <span class="anatomy-label">complete</span>
  <div class="btn-group">
    <textarea data-component class="textarea textarea--sm textarea--complete" rows="2">입력 완료</textarea>
    <textarea data-component class="textarea textarea--complete" rows="2">입력 완료</textarea>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">complete ghost</span>
  <div class="btn-group">
    <textarea data-component class="textarea textarea--sm textarea--ghost textarea--complete" rows="2">입력 완료</textarea>
    <textarea data-component class="textarea textarea--ghost textarea--complete" rows="2">입력 완료</textarea>
  </div>
</div>
<div style="text-align:center;padding-top:var(--space-16);padding-bottom:0;font-weight:600;color:var(--color-text-label);font-family:var(--font-family-base);font-size:var(--font-size-label)">조건부 필드</div>
<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div class="btn-group">
    <textarea data-component class="textarea textarea--sm textarea--error" rows="2" aria-invalid="true">잘못된 형식</textarea>
    <textarea data-component class="textarea textarea--error" rows="2" aria-invalid="true">잘못된 형식</textarea>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">success</span>
  <div class="btn-group">
    <textarea data-component class="textarea textarea--sm textarea--success" rows="2">유효한 형식</textarea>
    <textarea data-component class="textarea textarea--success" rows="2">유효한 형식</textarea>
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
}
.textarea::placeholder { color: var(--color-text-subtle); }

/* ── Size ── */
.textarea--sm { padding: var(--space-inset-squish-sm); font-size: var(--font-size-sm); }

/* ── Style: ghost ── */
.textarea--ghost {
  border-color: transparent;
  background: transparent;
}

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
.textarea--ghost.textarea--complete { border-color: transparent; }
.textarea--success  { border-color: var(--color-border-success);  color: var(--color-text-success); }
/* ghost + error·success: 오류·성공 테두리는 ghost 여부와 무관하게 표시한다. complete만 예외(피드백 없음). */
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

> ✅ DO — 최소 높이를 `rows` 속성으로 지정
> `<textarea class="textarea" rows="4">` — rows로 최소 행 수 설정, 내용에 따라 resize 가능

> ❌ DON'T — height 토큰으로 높이 고정
> Textarea는 멀티라인이므로 height 고정 금지. rows 또는 min-height를 사용한다

> ❌ DON'T — placeholder를 label 대용으로 사용
> 입력 시 사라지므로 레이블 역할 불가. 항상 `<label>`과 연결

> ✅ DO — 에러 메시지를 aria-describedby + role="alert"로 연결
> `<textarea class="textarea textarea--error" aria-invalid="true" aria-describedby="desc-error"></textarea><span id="desc-error" role="alert">내용을 입력해 주세요.</span>`

> ❌ DON'T — ghost 상태에서 error 시 border가 보이지 않을 것이라 가정
> `textarea--ghost.textarea--error`는 `border-color: var(--color-border-error)`가 그대로 적용되어 테두리가 나타난다
