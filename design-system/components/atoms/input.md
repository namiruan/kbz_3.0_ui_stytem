---
file: components/atoms/input.md
version: 1.2.2
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/typography.md, tokens/icon.md, tokens/height.md, tokens/z-index.md, components/atoms/icon.md
---

# Input

## 개요

단일 줄 텍스트 입력 필드. 기본은 테두리 있는 box, `input--ghost`를 더하면 기본 테두리가 없는 ghost로 동작한다. 지우기 버튼 addon은 `input-wrap` 래퍼로 구성한다. Label·HelpText·에러 메시지를 포함한 완성된 입력 단위는 FormField(Molecule)를 사용한다.

날짜 선택·검색 등 기능 트리거가 필요한 경우, 인풋 안에 아이콘을 넣지 않는다. ghost Input + Icon Button을 나란히 배치하는 모듈 패턴을 사용한다 (→ Molecule 정의 예정).

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | md (기본, 클래스 없음) · sm → `input--sm` · xs → `input--xs` | md |
| ghost | off (기본, 클래스 없음) · on → `input--ghost` | off |
| state | readonly → `input--readonly` · disabled → `input--disabled` · error → `input--error` · complete → `input--complete` · success → `input--success` | — |

`input--ghost`는 기본 `border-color`만 transparent로 바꾸는 단순 수식자다. hover·focus·error 동작은 box와 동일하다.

**clearable addon**: 루트 클래스 조합이 아닌 래퍼 구조를 사용한다. `div.input-wrap.input-wrap--clearable > input.input + button.input-clear`. clearable은 값 있을 때만 X 버튼을 표시한다 (JS 제어).

**suffix addon**: 단위 텍스트(`원`, `%`, `일` 등)를 input 오른쪽에 붙여 표시한다. `div.input-wrap.input-wrap--suffix > input.input + span.input__suffix`. suffix는 항상 표시되며 JS 제어 없음.

상태는 두 계층으로 나뉜다. **기본 완료** — `input--complete`는 유효성 조건이 없는 필드에서 blur 시 적용한다. **조건부 쌍** — `input--error`·`input--success`는 유효성 조건이 있는 필드 전용이며 항상 쌍으로 설계한다 (조건 실패 → error, 수정 후 통과 → success). 같은 필드에 `input--complete`와 `input--error`/`input--success`를 혼용하지 않는다.

---

## 동작

입력 완료·에러·성공 상태는 JS로 클래스를 전환한다. 공통: clear 버튼 클릭 시 값·상태 초기화. 조건 없는 필드는 값 생김 시 즉시 clearable 표시, 조건부 필드는 blur 이후부터 표시.

### 조건 없는 필드 (input--complete)

유효성 검사 없이 값만 받는 필드. blur 시 자동으로 complete 상태가 된다.

| 이벤트 | 동작 |
|--------|------|
| `blur` (값 있음) | `input--complete` 추가, clearable 표시 |
| `blur` (값 없음) | `input--complete` 제거, clearable hidden |
| `input` (값 지워짐) | `input--complete` 제거 |
| clear 클릭 | 값 초기화, `input--complete` 제거 |

### 조건부 필드 (input--error / input--success)

유효성 조건이 있는 필드. 상태 분기는 blur 이후부터 시작한다.

| 이벤트 | 동작 |
|--------|------|
| `blur` (조건 실패) | `input--error` 추가, `input--success` 제거, clearable 표시 |
| `blur` (조건 통과) | `input--success` 추가, `input--error` 제거, clearable 표시 |
| `blur` (값 없음) | 두 상태 모두 제거, clearable hidden |
| `input` (수정 중) | `input--error`·`input--success` 유지 (blur 전까지 갱신 없음) |
| clear 클릭 | 값 초기화, 두 상태 제거, clearable hidden |

---

## Token 매핑

| 항목 | Token |
|------|-------|
| 높이 md | `--height-md` |
| 높이 sm | `--height-sm` |
| 높이 xs | `--height-tight` |
| 가로 padding md | `--space-padding-md` |
| 가로 padding sm/xs | `--space-padding-sm` |
| 테두리 두께 | `--stroke-sm` |
| 테두리 색 기본 | `--color-border-input` |
| 테두리 색 hover | `--color-border-input-hover` |
| 테두리 색 focus | `--color-border-focus` |
| 테두리 색 error | `--color-border-error` |
| 테두리 색 success | `--color-border-success` |
| 테두리 색 disabled | `--color-border-disabled` |
| 배경 기본 | `--color-surface-input` |
| 배경 disabled | `--color-surface-disabled` |
| 텍스트 기본 | `--color-text-body` |
| 텍스트 placeholder | `--color-text-placeholder` |
| 텍스트 disabled | `--color-text-disabled` |
| 텍스트 readonly | `--color-text-secondary` |
| 반지름 | `--radius-sm` |
| 폰트 md | `--font-size-md` / `--line-height-ui` |
| 폰트 sm·xs | `--font-size-sm` / `--line-height-ui` |

---

## HTML 패턴

```html
<!-- Box (기본) -->
<input class="input" type="text" placeholder="입력하세요">

<!-- Ghost -->
<input class="input input--ghost" type="text" placeholder="입력하세요">

<!-- Size -->
<input class="input input--sm" type="text" placeholder="작은 인풋">
<input class="input input--xs" type="text" placeholder="더 작은 인풋">

<!-- State -->
<input class="input input--readonly" type="text" value="읽기 전용" readonly>
<input class="input input--disabled" type="text" placeholder="비활성" disabled>
<input class="input input--error" type="text" value="오류 값">
<input class="input input--complete" type="text" value="완료 값">
<input class="input input--success" type="text" value="성공 값">

<!-- Clearable addon -->
<div class="input-wrap input-wrap--clearable">
  <input class="input" type="text" placeholder="입력하세요">
  <button class="input-clear" type="button" hidden aria-label="지우기">
    <svg class="icon icon--xs" aria-hidden="true"><use href="icons/sprite.svg#close"></use></svg>
  </button>
</div>

<!-- Suffix addon -->
<div class="input-wrap input-wrap--suffix">
  <input class="input" type="text" placeholder="0">
  <span class="input__suffix">원</span>
</div>

<!-- Clearable + Ghost -->
<div class="input-wrap input-wrap--clearable">
  <input class="input input--ghost" type="text" placeholder="입력하세요">
  <button class="input-clear" type="button" hidden aria-label="지우기">
    <svg class="icon icon--xs" aria-hidden="true"><use href="icons/sprite.svg#close"></use></svg>
  </button>
</div>
```

---

## CSS

```css
/* ── Input ── */
/* ── Base ── */
.input {
  display: block;
  width: 100%;
  height: var(--height-md);
  padding: 0 var(--space-padding-md);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-input);
  border-radius: var(--radius-sm);
  background: var(--color-surface-input);
  color: var(--color-text-body);
  font-size: var(--font-size-md);
  line-height: var(--line-height-ui);
  outline: none;
  transition:
    border-color var(--duration-fast) var(--easing-base),
    background   var(--duration-fast) var(--easing-base);
}
.input::placeholder { color: var(--color-text-placeholder); }

/* ── Interactive ── */
.input:hover:not(:disabled):not([readonly]):not(.input--disabled):not(.input--readonly) {
  border-color: var(--color-border-input-hover);
}
.input:focus:not(:disabled):not([readonly]):not(.input--disabled):not(.input--readonly) {
  border-color: var(--color-border-focus);
}

/* ── Size ── */
.input--sm {
  height: var(--height-sm);
  padding: 0 var(--space-padding-sm);
  font-size: var(--font-size-sm);
}
.input--xs {
  height: var(--height-tight);
  padding: 0 var(--space-padding-sm);
  font-size: var(--font-size-sm);
}

/* ── State ── */
.input--readonly,
input[readonly] {
  border-color: var(--color-border-input);
  background: var(--color-surface-input);
  color: var(--color-text-secondary);
  cursor: default;
}
.input--disabled,
input:disabled {
  border-color: var(--color-border-disabled);
  background: var(--color-surface-disabled);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
/* error는 disabled/readonly보다 앞에 선언해 specificity 충돌 방지 */
.input--error {
  border-color: var(--color-border-error) !important;
}
.input--complete {
  border-color: var(--color-border-input);
}
.input--success {
  border-color: var(--color-border-success) !important;
}

/* ── Ghost ── */
.input--ghost {
  border-color: transparent;
  background: transparent;
}
.input--ghost:hover:not(:disabled):not([readonly]):not(.input--disabled):not(.input--readonly) {
  border-color: var(--color-border-input-hover);
}
.input--ghost:focus:not(:disabled):not([readonly]):not(.input--disabled):not(.input--readonly) {
  border-color: var(--color-border-focus);
}
.input--ghost.input--error  { border-color: var(--color-border-error)   !important; }
.input--ghost.input--success { border-color: var(--color-border-success) !important; }

/* ── Wrap ── */
.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.input-wrap .input { flex: 1; min-width: 0; }

/* clearable */
.input-wrap--clearable .input { padding-right: calc(var(--space-padding-md) * 2 + 16px); }
.input-clear {
  position: absolute;
  right: var(--space-padding-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--height-tight);
  height: var(--height-tight);
  color: var(--color-icon-secondary);
}
.input-clear:hover { color: var(--color-icon-body); }

/* suffix */
.input-wrap--suffix .input { padding-right: 0; border-radius: var(--radius-sm) 0 0 var(--radius-sm); }
.input__suffix {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: var(--height-md);
  padding: 0 var(--space-padding-sm);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-input);
  border-left: none;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  background: var(--color-surface-base);
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
  line-height: var(--line-height-ui);
  white-space: nowrap;
}
```

---

## JS

```js
/* 조건 없는 필드 완료 동작 — 초기값 체크 + blur 시 input--complete 토글
   clearable 버튼 추가·위치 계산은 처리하지 않음 — clearable 필요 시 ## 동작 패턴 직접 구현 */
function initInput(el) {
  /* readonly·disabled·error·success는 complete 상태 없음 */
  if (el.classList.contains('input--error') || el.classList.contains('input--success')) return;
  if (el.value && !el.readOnly && !el.disabled) el.classList.add('input--complete');
  el.addEventListener('blur', function() {
    var hasCond = el.classList.contains('input--error') || el.classList.contains('input--success');
    el.classList.toggle('input--complete', !!el.value && !hasCond);
  });
  el.addEventListener('input', function() { if (!el.value) el.classList.remove('input--complete'); });
}
function initInputContainer(container) {
  container.querySelectorAll('.input').forEach(function(el) {
    if (el.dataset.initInput) return;
    el.dataset.initInput = '1';
    initInput(el);
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initInputContainer) window.__componentInits.initInputContainer = initInputContainer;
```

---

## 접근성

- `<input>`에 연결된 `<label>`이 반드시 있어야 한다. `FormField` 내에서 사용하거나 `aria-label`을 직접 지정한다.
- 에러 메시지는 `aria-describedby`로 인풋과 연결한다 (FormField에서 처리).
- `input-clear` 버튼에 `aria-label="지우기"`를 붙인다.
- `placeholder`는 label 대체 수단이 아니다.

---

## 변경 이력

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.2.2 | 2026-06-17 | CSS 순서 수정: error/success를 disabled/readonly 이후에 선언, `!important` 추가로 검은색 border 버그 수정; initInput에 error/success 초기 상태 분기 추가 |
| 1.2.1 | 2026-06-16 | clearable/suffix 문서 통합; suffix 패턴 추가 |
| 1.2.0 | 2026-06-15 | initInput JS 추가 |
| 1.1.0 | 2026-06-14 | ghost 변형 추가 |
| 1.0.0 | 2026-06-13 | 최초 작성 |
