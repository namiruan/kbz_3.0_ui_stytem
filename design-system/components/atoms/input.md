---
file: components/atoms/input.md
version: 1.6.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/typography.md, tokens/icon.md, components/atoms/icon.md
---

# Input

## 개요

단일 줄 텍스트 입력 필드. 기본은 테두리 있는 box, `input--ghost`를 더하면 기본 테두리가 없는 ghost로 동작한다. 지우기 버튼 addon은 `input-wrap` 래퍼로 구성한다. Label·HelpText·에러 메시지를 포함한 완성된 입력 단위는 FormField(Molecule)를 사용한다.

날짜 선택·검색 등 기능 트리거가 필요한 경우, 인풋 안에 아이콘을 넣지 않는다. ghost Input + Icon Button(또는 Action Group)을 나란히 배치하는 모듈 패턴을 사용한다 (→ Molecule 정의 예정).

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | md (기본, 클래스 없음) · sm → `input--sm` | md |
| ghost | off (기본, 클래스 없음) · on → `input--ghost` | off |
| state | readonly → `input--readonly` · disabled → `input--disabled` · error → `input--error` · complete → `input--complete` · success → `input--success` | — |
| addon | none (기본) · clearable | none |

`input--ghost`는 기본 `border-color`만 transparent로 바꾸는 단순 수식자다. hover·focus·error 동작은 box와 동일하다.

addon은 `input-wrap` 래퍼에 수식자 클래스로 제어한다. clearable은 값 있을 때만 X 버튼을 표시한다 (JS 제어).

상태는 두 계층으로 나뉜다. **기본 완료** — `input--complete`는 유효성 조건이 없는 필드에서 blur 시 적용한다. **조건부 쌍** — `input--error`·`input--success`는 유효성 조건이 있는 필드 전용이며 항상 쌍으로 설계한다 (조건 실패 → error, 수정 후 통과 → success). 같은 필드에 `input--complete`와 `input--error`/`input--success`를 혼용하지 않는다.

---

## 사용 지침

### 선택 기준

| 상황 | 선택 |
|------|------|
| 일반 폼 (레이블 위) | 기본 (box) |
| 입력 전 상태를 최소화해야 하는 인라인 컨텍스트 | `input--ghost` 추가 |
| 입력 값 지우기가 필요한 필드 | clearable |
| 날짜 선택·검색 등 기능 트리거 | ghost Input + Icon Button 모듈 (Molecule) |

### 상태 완전성

| 상태 | 클래스 · 속성 | 설명 |
|------|-------------|------|
| 기본 | — | 플레이스홀더 표시 |
| 포커스 | `:focus-visible` (CSS) | 브랜드 테두리 + 포커스 링 |
| 입력 중 | — (value 있는 상태) | 별도 클래스 없음 |
| 읽기 전용 | `input--readonly` + `readonly` 속성 | 포커스·복사 가능, 테두리 없음 |
| 비활성 | `input--disabled` + `disabled` + `aria-disabled="true"` + `tabindex="-1"` | 인터랙션 불가 |
| 에러 | `input--error` + `aria-invalid="true"` | 빨간 테두리·텍스트 — 조건부 필드 전용 |
| 입력 완료 | `input--complete` | 회색 테두리 — 조건 없는 필드의 blur 완료 |
| 에러 수정 완료 | `input--success` | 초록 테두리·텍스트 — error 이후 조건 통과 시. error와 쌍으로만 사용 |

---

## 동작

입력 완료·에러·성공 상태는 JS로 클래스를 전환한다.

### 조건 없는 필드 (input--complete)

유효성 검사 없이 값만 받는 필드. blur 시 자동으로 complete 상태가 된다.

| 이벤트 | 동작 |
|--------|------|
| `blur` (값 있음) | `input--complete` 추가, clearable 표시 |
| `blur` (값 없음) | `input--complete` 제거, clearable hidden |
| `input` (값 생김) | clearable 표시 |
| `input` (값 지워짐) | `input--complete` 제거, clearable hidden |
| clear 버튼 클릭 | 값·상태 초기화 |

:::preview
<div style="max-width:360px;width:100%">
  <div class="input-wrap" id="cond-none-wrap">
    <input class="input" type="text" placeholder="이름을 입력해 주세요" id="cond-none-input" />
    <button class="input-clear icon-on--badge" type="button" aria-label="지우기" hidden id="cond-none-clear"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>
<script>
(function() {
  var input    = stage.querySelector('#cond-none-input');
  var wrap     = stage.querySelector('#cond-none-wrap');
  var clearBtn = stage.querySelector('#cond-none-clear');

  function getTextWidth(el) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var cs = getComputedStyle(el);
    ctx.font = cs.fontSize + ' ' + cs.fontFamily;
    return ctx.measureText(el.value).width;
  }
  function positionClear() {
    if (clearBtn.hasAttribute('hidden')) return;
    var cs = getComputedStyle(input);
    var paddingLeft = parseFloat(cs.paddingLeft);
    var paddingRight = parseFloat(cs.paddingRight);
    var maxLeft = input.offsetWidth - paddingRight - (clearBtn.offsetWidth || 20);
    clearBtn.style.left = Math.min(paddingLeft + getTextWidth(input) + 4, maxLeft) + 'px';
    clearBtn.style.right = 'auto';
    input.title = input.value;
  }
  function reset() {
    input.classList.remove('input--complete');
    wrap.classList.remove('input-wrap--clearable');
    clearBtn.setAttribute('hidden', '');
    clearBtn.style.left = '';
    input.title = '';
  }
  function showClear() {
    wrap.classList.add('input-wrap--clearable');
    clearBtn.removeAttribute('hidden');
    positionClear();
  }
  input.addEventListener('blur', function() {
    if (!input.value) { reset(); return; }
    input.classList.add('input--complete');
    showClear();
  });
  input.addEventListener('input', function() {
    if (!input.value) { reset(); }
    else if (wrap.classList.contains('input-wrap--clearable')) { positionClear(); }
    else { showClear(); }
  });
  clearBtn.addEventListener('click', function() {
    input.value = '';
    reset();
    input.focus();
  });
})();
</script>
:::

### 조건부 필드 (input--error / input--success)

유효성 조건이 있는 필드. error와 success는 항상 쌍으로 설계한다. blur 시 조건을 판별해 error/success를 전환한다.

| 이벤트 | 동작 |
|--------|------|
| `blur` (값 있음, 조건 실패) | `input--error` 추가, icon-warning 표시, `aria-invalid="true"` |
| `blur` (값 있음, 조건 통과) | error 상태면 `input--error` → `input--success` 전환, icon-check 표시 |
| `blur` (값 없음) | 상태 클래스 모두 제거, 아이콘 hidden, clearable hidden |
| `input` (값 생김) | clearable 표시 |
| `input` (값 지워짐) | 상태 클래스 제거, 아이콘 hidden, clearable hidden |
| clear 버튼 클릭 | 값·상태 초기화 |

:::preview
<div style="max-width:360px;width:100%">
  <p style="font-family:var(--font-family-base);font-size:var(--font-size-sm);color:var(--color-text-subtle);margin-bottom:var(--space-8)">조건: 숫자 6자리 (blur 시 검증)</p>
  <div class="input-wrap" id="cond-wrap">
    <input class="input" type="text" placeholder="숫자 6자리를 입력해 주세요" id="cond-input" />
    <button class="input-clear icon-on--badge" type="button" aria-label="지우기" hidden id="cond-clear"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    <span class="input-icon icon icon--badge" aria-hidden="true" hidden id="cond-icon">
      <svg aria-hidden="true"><use href="icons/sprite.svg#icon-check" id="cond-icon-use"/></svg>
    </span>
  </div>
</div>
<script>
(function() {
  var input    = stage.querySelector('#cond-input');
  var wrap     = stage.querySelector('#cond-wrap');
  var clearBtn = stage.querySelector('#cond-clear');
  var icon     = stage.querySelector('#cond-icon');
  var iconUse  = stage.querySelector('#cond-icon-use');

  function isValid(v) { return /^\d{6}$/.test(v); }

  function getTextWidth(el) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var cs = getComputedStyle(el);
    ctx.font = cs.fontSize + ' ' + cs.fontFamily;
    return ctx.measureText(el.value).width;
  }
  function positionClear() {
    if (clearBtn.hasAttribute('hidden')) return;
    var cs = getComputedStyle(input);
    var paddingLeft = parseFloat(cs.paddingLeft);
    var paddingRight = parseFloat(cs.paddingRight);
    var maxLeft = input.offsetWidth - paddingRight - (clearBtn.offsetWidth || 20);
    clearBtn.style.left = Math.min(paddingLeft + getTextWidth(input) + 4, maxLeft) + 'px';
    clearBtn.style.right = 'auto';
    input.title = input.value;
  }
  function clearState() {
    input.classList.remove('input--error', 'input--success');
    input.removeAttribute('aria-invalid');
    input.title = '';
    wrap.classList.remove('input-wrap--icon-right', 'input-wrap--clearable');
    icon.setAttribute('hidden', '');
    clearBtn.setAttribute('hidden', '');
    clearBtn.style.left = '';
  }
  function applyState(s) {
    wrap.classList.add('input-wrap--icon-right', 'input-wrap--clearable');
    input.classList.remove('input--error', 'input--success');
    input.classList.add('input--' + s);
    if (s === 'error') {
      input.setAttribute('aria-invalid', 'true');
      iconUse.setAttribute('href', 'icons/sprite.svg#icon-warning');
    } else {
      input.removeAttribute('aria-invalid');
      iconUse.setAttribute('href', 'icons/sprite.svg#icon-check');
    }
    icon.removeAttribute('hidden');
    if (input.value) { clearBtn.removeAttribute('hidden'); positionClear(); }
  }
  input.addEventListener('blur', function() {
    if (!input.value) { clearState(); return; }
    applyState(isValid(input.value) ? 'success' : 'error');
  });
  input.addEventListener('input', function() {
    if (!input.value) {
      clearState();
    } else if (wrap.classList.contains('input-wrap--clearable')) {
      clearBtn.removeAttribute('hidden');
      positionClear();
    }
  });
  clearBtn.addEventListener('click', function() {
    input.value = '';
    clearState();
    input.focus();
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
상태 계층 — 필드 설계 시 반드시 구분:
1. 조건 없는 필드: input--complete만 사용. blur + 값 있음 → complete. input--error/success 사용 금지.
2. 조건부 필드: input--error + input--success를 쌍으로 설계. complete 사용 금지.
   - blur 시 조건 판별 → 실패 시 error, 통과 시 success 전환.

기본 인풋 (값 유무와 무관한 독립 상태):
- addon 없는 경우: root = input.input. 크기·ghost·상태 클래스를 root에 조합.
- input--ghost: border-color만 transparent. hover·focus 동작은 box와 동일.
- readonly: border 없음, background subtle. 포커스 가능, tab 순서 유지.
- disabled: pointer-events: none, tabindex="-1", aria-disabled="true" 셋 모두 필수.

상태 마크업 패턴:
- complete: input-wrap--clearable + input--complete. 아이콘 없음.
- error:    input-wrap--icon-right + input-wrap--clearable + input--error + icon-warning(icon--badge) + aria-invalid="true".
- success:  input-wrap--icon-right + input-wrap--clearable + input--success + icon-check(icon--badge).
- 상태 아이콘(input-icon): icon--badge 크기. 초기에는 hidden 처리. error/success 상태 진입 시 hidden 해제, 상태 해제 시 다시 hidden.
- clear 버튼: button.input-clear.icon-on--badge > svg. 값 있을 때만 표시 (JS 제어).

Addon:
- clearable만 지원. root = div.input-wrap.input-wrap--clearable.
- 날짜·검색 등 기능 트리거는 인풋 addon이 아닌 ghost Input + Icon Button 모듈(Molecule)로 처리한다.
- input-wrap--icon-right는 error·success 상태 아이콘 표시 전용 내부 구현. 일반 addon으로 사용하지 않는다.
-->

### 기본

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <div class="btn-group">
    <input data-component class="input input--sm" type="text" placeholder="기본" />
    <input data-component class="input" type="text" placeholder="기본" />
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">default ghost</span>
  <div class="btn-group">
    <input data-component class="input input--sm input--ghost" type="text" placeholder="고스트" />
    <input data-component class="input input--ghost" type="text" placeholder="고스트" />
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">readonly</span>
  <div class="btn-group">
    <input data-component class="input input--sm input--readonly" type="text" value="읽기 전용" readonly />
    <input data-component class="input input--readonly" type="text" value="읽기 전용" readonly />
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div class="btn-group">
    <input data-component class="input input--sm input--disabled" type="text" value="비활성" disabled aria-disabled="true" tabindex="-1" />
    <input data-component class="input input--disabled" type="text" value="비활성" disabled aria-disabled="true" tabindex="-1" />
  </div>
</div>
</div>
:::

### 상태

> `input-wrap--icon-right`는 error·success 진입 시 JS가 추가하는 내부 클래스다. 초기 마크업에는 없고, 상태 해제 시 제거된다.

:::preview
<div class="anatomy-grid">
<div style="text-align:center;padding-bottom:0;font-weight:600;color:var(--color-text-label);font-family:var(--font-family-base);font-size:var(--font-size-label)">조건 없는 필드</div>
<div class="anatomy-row">
  <span class="anatomy-label">complete</span>
  <div class="btn-group">
    <div data-component class="input-wrap input-wrap--clearable">
      <input class="input input--sm input--complete" type="text" value="입력 완료" />
      <button class="input-clear icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    </div>
    <div data-component class="input-wrap input-wrap--clearable">
      <input class="input input--complete" type="text" value="입력 완료" />
      <button class="input-clear icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">complete ghost</span>
  <div class="btn-group">
    <div data-component class="input-wrap input-wrap--clearable">
      <input class="input input--sm input--ghost input--complete" type="text" value="입력 완료" />
      <button class="input-clear icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    </div>
    <div data-component class="input-wrap input-wrap--clearable">
      <input class="input input--ghost input--complete" type="text" value="입력 완료" />
      <button class="input-clear icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    </div>
  </div>
</div>
<div style="text-align:center;padding-top:var(--space-16);padding-bottom:0;font-weight:600;color:var(--color-text-label);font-family:var(--font-family-base);font-size:var(--font-size-label)">조건부 필드</div>
<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div class="btn-group">
    <div data-component class="input-wrap input-wrap--icon-right input-wrap--clearable">
      <input class="input input--sm input--error" type="text" value="잘못된 형식" aria-invalid="true" />
      <button class="input-clear icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
      <span class="input-icon icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-warning"/></svg></span>
    </div>
    <div data-component class="input-wrap input-wrap--icon-right input-wrap--clearable">
      <input class="input input--error" type="text" value="잘못된 형식" aria-invalid="true" />
      <button class="input-clear icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
      <span class="input-icon icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-warning"/></svg></span>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">success</span>
  <div class="btn-group">
    <div data-component class="input-wrap input-wrap--icon-right input-wrap--clearable">
      <input class="input input--sm input--success" type="text" value="유효한 형식" />
      <button class="input-clear icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
      <span class="input-icon icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
    </div>
    <div data-component class="input-wrap input-wrap--icon-right input-wrap--clearable">
      <input class="input input--success" type="text" value="유효한 형식" />
      <button class="input-clear icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
      <span class="input-icon icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
    </div>
  </div>
</div>
</div>
<script>
function getTextWidth(input) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var cs = getComputedStyle(input);
  ctx.font = cs.fontSize + ' ' + cs.fontFamily;
  return ctx.measureText(input.value).width;
}
stage.querySelectorAll('.input-wrap--clearable').forEach(function(wrap) {
  var input = wrap.querySelector('.input');
  var clearBtn = wrap.querySelector('.input-clear');
  if (!input || !clearBtn) return;
  function positionClear() {
    var cs = getComputedStyle(input);
    var paddingLeft = parseFloat(cs.paddingLeft);
    var paddingRight = parseFloat(cs.paddingRight);
    var maxLeft = input.offsetWidth - paddingRight - (clearBtn.offsetWidth || 20);
    clearBtn.style.left = Math.min(paddingLeft + getTextWidth(input) + 4, maxLeft) + 'px';
    clearBtn.style.right = 'auto';
    input.title = input.value;
  }
  positionClear();
  input.addEventListener('input', positionClear);
});
</script>
:::

### Addon

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">clearable</span>
  <div data-component class="input-wrap input-wrap--clearable">
    <input class="input" type="text" value="지울 수 있는 값" />
    <button class="input-clear icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>
</div>
<script>
function getTextWidth(input) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var cs = getComputedStyle(input);
  ctx.font = cs.fontSize + ' ' + cs.fontFamily;
  return ctx.measureText(input.value).width;
}
stage.querySelectorAll('.input-wrap--clearable').forEach(function(wrap) {
  var input = wrap.querySelector('.input');
  var clearBtn = wrap.querySelector('.input-clear');
  if (!input || !clearBtn) return;
  var paddingLeft = parseFloat(getComputedStyle(input).paddingLeft);
  var paddingRight = parseFloat(getComputedStyle(input).paddingRight);
  var maxLeft = input.offsetWidth - paddingRight - (clearBtn.offsetWidth || 20);
  clearBtn.style.left = Math.min(paddingLeft + getTextWidth(input) + 4, maxLeft) + 'px';
  clearBtn.style.right = 'auto';
});
</script>
:::

---

## CSS

```css
/* ── Base ── */
.input {
  display: block;
  width: 100%;
  height: var(--height-base);
  padding: var(--space-inset-squish-md);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  color: var(--color-text-body);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  text-overflow: ellipsis;
}
.input::placeholder { color: var(--color-text-subtle); }

/* ── Size ── */
.input--sm { height: var(--height-compact); padding: var(--space-inset-squish-md); font-size: var(--font-size-sm); }

/* ── Style: ghost ── */
.input--ghost {
  border-color: transparent;
  background: transparent;
}

/* ── Hover ── */
.input:hover:not(.input--disabled):not(.input--readonly) {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}

/* ── Focus ── */
/* outline·outline-offset은 전역 *:focus-visible에서 일괄 적용 — 재선언 금지 */
/* box-shadow는 outline 대체가 아닌 추가 — 버튼 hover와 동일한 시각 처리 */
.input:focus-visible {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}

/* ── State ── */
.input--readonly {
  background: var(--color-surface-subtle);
  border-color: transparent;
  cursor: default;
}
.input--disabled {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  color: var(--color-text-disabled);
  pointer-events: none;
}
.input--error { border-color: var(--color-border-error); color: var(--color-text-error); }
.input--complete { border-color: var(--color-border-complete); }
.input--ghost.input--complete { border-color: transparent; }
.input--success { border-color: var(--color-border-success); color: var(--color-text-success); }
/* ghost + error·success: 오류·성공 테두리는 ghost 여부와 무관하게 표시한다. complete만 예외(피드백 없음). */

/* ── State: 상태 아이콘 색상 ── */
.input-wrap:has(.input--error)    .input-icon { color: var(--color-text-error); }
.input-wrap:has(.input--complete) .input-icon { color: var(--color-border-complete); }
.input-wrap:has(.input--success)  .input-icon { color: var(--color-text-success); }

/* ── Addon: wrapper ── */
.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

/* clearable: X 버튼 우측 오프셋(space-4) + 버튼 크기(icon-md) + 텍스트 여유(space-8) */
.input-wrap--clearable .input { padding-right: calc(var(--space-12) + var(--icon-md) + var(--space-8)); }

/* ── 상태 아이콘 (유효성 상태 전용, addon 아님) ── */
/* input-wrap--icon-right는 error·success 상태 아이콘 표시에만 사용한다. 장식 아이콘 addon 금지. */
/* 상태 아이콘 + clearable 동시: X 버튼이 아이콘 왼쪽으로 밀려 공간 추가 필요
   right(space-12) + 버튼 오프셋(icon-md) + 버튼 svg(icon-badge) + 버튼 padding(2×space-inset-xs) + 텍스트 여유(space-8) */
.input-wrap--icon-right.input-wrap--clearable:has(.input--error, .input--success) .input {
  padding-right: calc(var(--space-12) + var(--icon-md) + var(--icon-badge) + (2 * var(--space-inset-xs)) + var(--space-8));
}

/* .input-icon: components/atoms/icon.md → icon--badge 크기 Icon
   span 요소 · aria-hidden="true" 필수 · 색상은 부모 컨텍스트에서 상속 */
.input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-subtle);
  pointer-events: none;
}
.input-wrap--icon-right .input-icon { right: var(--space-12); }

/* ── Addon: clear button ── */
/* .input-clear: components/atoms/icon-button.md → icon-on--badge 크기 Icon Button
   button 요소 필수 · hover·disabled 인터랙션은 Icon Button 정의를 따른다 */
.input-clear {
  position: absolute;
  right: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
}
.input-wrap .input-clear { color: var(--color-text-subtle); }

/* 상태 아이콘이 있을 때: X 버튼을 아이콘 왼쪽에 배치 */
.input-wrap--icon-right .input-clear {
  right: calc(var(--space-12) + var(--icon-md));
}
```

---

## 접근성

텍스트 인풋 유형 (`accessibility.md` 텍스트 인풋 행 적용).

| 상황 | 마크업 |
|------|--------|
| 기본 | `<label for="id">` + `<input id="id" class="input">` |
| 에러 | `aria-invalid="true"` + `aria-describedby="[error-id]"`. 에러 span에 `role="alert"` |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| readonly | `readonly` 속성 — 포커스 가능, tab 순서 유지 |
| 지우기 버튼 | `<button type="button" aria-label="지우기">`. 값 없을 때 `hidden` 처리 |
| 상태 아이콘 | `aria-hidden="true"`. 상태는 텍스트(aria-invalid, role="alert")로 별도 전달 |

에러 마크업 예시:

```html
<input class="input input--error" aria-invalid="true" aria-describedby="name-error" />
<span id="name-error" role="alert">필수 정보를 입력해 주세요.</span>
```

---

## Do / Don't

> ✅ DO — clearable addon은 input-wrap으로 감쌈
> `<div class="input-wrap input-wrap--clearable"><input class="input" /><button class="input-clear icon-on--badge" type="button" aria-label="지우기">...</button></div>`

> ❌ DON'T — 날짜·검색 트리거를 input 내부 아이콘으로 처리
> 기능 트리거는 `<button>` 이 맞다. ghost Input + Icon Button 모듈을 사용한다

> ❌ DON'T — placeholder를 label 대용으로 사용
> 입력 시 사라지므로 레이블 역할 불가. 항상 `<label>`과 연결

> ✅ DO — 에러 메시지를 aria-describedby + role="alert"로 연결
> `<input class="input input--error" aria-invalid="true" aria-describedby="name-error" />`

> ❌ DON'T — ghost 상태에서 error 시 border가 보이지 않을 것이라 가정
> `input--ghost.input--error`는 `border-color: var(--color-border-error)`가 그대로 적용되어 테두리가 나타난다

> ❌ DON'T — data-component 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용. 실제 구현 코드에서는 제거한다.
