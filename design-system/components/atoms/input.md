---
file: components/atoms/input.md
version: 1.5.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/typography.md, tokens/icon.md, components/atoms/icon.md
---

# Input

## 개요

단일 줄 텍스트 입력 필드. 기본은 테두리 있는 box, `input--ghost`를 더하면 기본 테두리가 없는 ghost로 동작한다. icon·지우기 버튼 같은 addon은 `input-wrap` 래퍼로 구성한다. Label·HelpText·에러 메시지를 포함한 완성된 입력 단위는 FormField(Molecule)를 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | md (기본, 클래스 없음) · sm → `input--sm` | md |
| ghost | off (기본, 클래스 없음) · on → `input--ghost` | off |
| state | readonly → `input--readonly` · disabled → `input--disabled` · error → `input--error` · complete → `input--complete` · success → `input--success` | — |
| addon | none (기본) · icon-left · icon-right · clearable | none |

`input--ghost`는 기본 `border-color`만 transparent로 바꾸는 단순 수식자다. hover·focus·error 동작은 box와 동일하다.

addon은 `input-wrap` 래퍼에 수식자 클래스로 제어한다. `input-wrap--icon-right`와 `input-wrap--clearable`은 함께 쓸 수 있다 — 값 없을 때 icon 표시, 값 있을 때 X 표시(JS 제어).

상태는 두 계층으로 나뉜다. **기본 완료** — `input--complete`는 유효성 조건이 없는 필드에서 blur 시 적용한다. **조건부 쌍** — `input--error`·`input--success`는 유효성 조건이 있는 필드 전용이며 항상 쌍으로 설계한다 (조건 실패 → error, 수정 후 통과 → success). 같은 필드에 `input--complete`와 `input--error`/`input--success`를 혼용하지 않는다.

---

## 사용 지침

### 선택 기준

| 상황 | 선택 |
|------|------|
| 일반 폼 (레이블 위) | 기본 (box) |
| 입력 전 상태를 최소화해야 하는 인라인 컨텍스트 | `input--ghost` 추가 |
| 날짜·검색 등 선택 유도 | icon-right (calendar 또는 search) |
| 입력 값 지우기가 필요한 필드 | clearable |

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

### 조건부 필드 (input--error / input--success)

유효성 조건이 있는 필드. error와 success는 항상 쌍으로 설계한다. error 진입은 외부(폼 유효성 로직)에서 제어하고, success는 error 상태에서 조건을 통과한 경우에만 발생한다.

| 이벤트 | 동작 |
|--------|------|
| 유효성 실패 (외부 제어) | `input--error` 추가, icon-warning 표시, `aria-invalid="true"` |
| error 상태에서 `blur` (값 있음) | `input--error` → `input--success` 전환, icon-check 표시 |
| `blur` (값 없음) | 상태 클래스 모두 제거, 아이콘 hidden, clearable hidden |
| `input` (값 생김) | clearable 표시 |
| `input` (값 지워짐) | 상태 클래스 제거, 아이콘 hidden, clearable hidden |
| clear 버튼 클릭 | 값·상태 초기화 |

:::preview
<div style="max-width:360px;width:100%">
  <div class="input-wrap" id="demo-wrap">
    <input class="input" type="text" placeholder="이름을 입력해 주세요" id="demo-input" />
    <button class="input-clear icon-on--badge" type="button" aria-label="지우기" hidden id="demo-clear"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    <span class="input-icon icon icon--badge" aria-hidden="true" hidden id="demo-icon">
      <svg aria-hidden="true"><use href="icons/sprite.svg#icon-check" id="demo-icon-use"/></svg>
    </span>
  </div>
  <div style="display:flex;gap:var(--space-8);margin-top:var(--space-12)">
    <button class="btn btn--secondary btn--sm" type="button" id="demo-err-btn">에러 주입</button>
    <button class="btn btn--ghost btn--sm" type="button" id="demo-reset-btn">초기화</button>
  </div>
</div>
<script>
var input    = stage.querySelector('#demo-input');
var wrap     = stage.querySelector('#demo-wrap');
var clearBtn = stage.querySelector('#demo-clear');
var icon     = stage.querySelector('#demo-icon');
var iconUse  = stage.querySelector('#demo-icon-use');

function getTextWidth(el) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var cs = getComputedStyle(el);
  ctx.font = cs.fontSize + ' ' + cs.fontFamily;
  return ctx.measureText(el.value).width;
}

function positionClearBtn() {
  if (clearBtn.hasAttribute('hidden')) return;
  var cs = getComputedStyle(input);
  var paddingLeft = parseFloat(cs.paddingLeft);
  clearBtn.style.left = (paddingLeft + getTextWidth(input) + 4) + 'px';
  clearBtn.style.right = 'auto';
}

function clearState() {
  input.classList.remove('input--error','input--complete','input--success');
  input.removeAttribute('aria-invalid');
  icon.setAttribute('hidden','');
  clearBtn.setAttribute('hidden','');
  clearBtn.style.left = '';
  clearBtn.style.right = '';
  wrap.classList.remove('input-wrap--icon-right','input-wrap--clearable');
}

function applyState(s) {
  wrap.classList.add('input-wrap--clearable');
  input.classList.remove('input--error','input--complete','input--success');
  input.classList.add('input--' + s);
  if (s === 'complete') {
    wrap.classList.remove('input-wrap--icon-right');
    icon.setAttribute('hidden','');
  } else {
    wrap.classList.add('input-wrap--icon-right');
    input.setAttribute('aria-invalid', s === 'error' ? 'true' : null);
    if (s === 'error') input.setAttribute('aria-invalid','true');
    else input.removeAttribute('aria-invalid');
    iconUse.setAttribute('href', s === 'error' ? 'icons/sprite.svg#icon-warning' : 'icons/sprite.svg#icon-check');
    icon.removeAttribute('hidden');
  }
  if (input.value) { clearBtn.removeAttribute('hidden'); positionClearBtn(); }
}

input.addEventListener('blur', function() {
  if (!input.value) { clearState(); return; }
  if (input.classList.contains('input--error')) {
    applyState('success');
  } else if (!input.classList.contains('input--success') && !input.classList.contains('input--complete')) {
    applyState('complete');
  }
});

input.addEventListener('input', function() {
  if (!input.value) {
    clearState();
  } else {
    clearBtn.removeAttribute('hidden');
    positionClearBtn();
  }
});

clearBtn.addEventListener('click', function() {
  input.value = '';
  clearState();
  input.focus();
});

stage.querySelector('#demo-err-btn').addEventListener('click', function() {
  if (!input.value) input.value = '잘못된 형식';
  applyState('error');
});

stage.querySelector('#demo-reset-btn').addEventListener('click', function() {
  input.value = '';
  clearState();
});
</script>
:::

---

## Anatomy

<!-- AI:
상태 계층 — 필드 설계 시 반드시 구분:
1. 조건 없는 필드: input--complete만 사용. blur + 값 있음 → complete. input--error/success 사용 금지.
2. 조건부 필드: input--error + input--success를 쌍으로 설계. complete 사용 금지.
   - error는 외부 유효성 로직이 주입. success는 error 상태에서 조건 통과 후에만 발생.

기본 인풋 (값 유무와 무관한 독립 상태):
- addon 없는 경우: root = input.input. 크기·ghost·상태 클래스를 root에 조합.
- input--ghost: border-color만 transparent. hover·focus 동작은 box와 동일.
- readonly: border 없음, background subtle. 포커스 가능, tab 순서 유지.
- disabled: pointer-events: none, tabindex="-1", aria-disabled="true" 셋 모두 필수.

상태 마크업 패턴:
- complete: input-wrap--clearable + input--complete. 아이콘 없음.
- error:    input-wrap--icon-right + input-wrap--clearable + input--error + icon-warning(icon--badge) + aria-invalid="true".
- success:  input-wrap--icon-right + input-wrap--clearable + input--success + icon-check(icon--badge).
- 상태 아이콘(input-icon): icon--badge 크기. 항상 표시 — hidden 처리 금지.
- clear 버튼: button.input-clear.icon-on--badge > svg. 값 있을 때만 표시 (JS 제어).

Addon (자유 조합):
- addon 있는 경우: root = div.input-wrap + 수식자(input-wrap--icon-left, input-wrap--icon-right, input-wrap--clearable).
- icon-right + clearable 동시 사용 시 (선택 유도 필드): 값 없으면 icon 표시, 값 있으면 icon hidden + clear 버튼 표시 (JS).
-->

### 기본

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <div class="btn-group">
    <input data-component class="input input--sm" type="text" placeholder="입력해 주세요" />
    <input data-component class="input" type="text" placeholder="입력해 주세요" />
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">default ghost</span>
  <div class="btn-group">
    <input data-component class="input input--sm input--ghost" type="text" placeholder="입력해 주세요" />
    <input data-component class="input input--ghost" type="text" placeholder="입력해 주세요" />
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

:::preview
<div class="anatomy-grid">
<div class="anatomy-row" style="padding-bottom:0">
  <span class="anatomy-label" style="font-weight:600;color:var(--color-text-label)">조건부 필드</span>
</div>
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
<div class="anatomy-row" style="padding-top:var(--space-16);padding-bottom:0">
  <span class="anatomy-label" style="font-weight:600;color:var(--color-text-label)">조건 없는 필드</span>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">complete</span>
  <div class="btn-group">
    <div data-component class="input-wrap input-wrap--clearable">
      <input class="input input--sm input--complete" type="text" value="홍길동" />
      <button class="input-clear icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    </div>
    <div data-component class="input-wrap input-wrap--clearable">
      <input class="input input--complete" type="text" value="홍길동" />
      <button class="input-clear icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    </div>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">success</span>
  <div class="btn-group">
    <div data-component class="input-wrap input-wrap--icon-right input-wrap--clearable">
      <input class="input input--sm input--success" type="text" value="홍길동" />
      <button class="input-clear icon-on--badge" type="button" aria-label="지우기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
      <span class="input-icon icon icon--badge" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
    </div>
    <div data-component class="input-wrap input-wrap--icon-right input-wrap--clearable">
      <input class="input input--success" type="text" value="홍길동" />
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
  var cs = getComputedStyle(input);
  var paddingLeft = parseFloat(cs.paddingLeft);
  clearBtn.style.left = (paddingLeft + getTextWidth(input) + 4) + 'px';
  clearBtn.style.right = 'auto';
});
</script>
:::

### Addon

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">icon-right</span>
  <div data-component class="input-wrap input-wrap--icon-right">
    <input class="input" type="text" placeholder="입력 전 상태" />
    <span class="input-icon icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">icon-left</span>
  <div data-component class="input-wrap input-wrap--icon-left">
    <span class="input-icon icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg></span>
    <input class="input" type="text" placeholder="입력 전 상태" />
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">clearable</span>
  <div data-component class="input-wrap input-wrap--clearable">
    <input class="input" type="text" value="입력된 값" />
    <button class="input-clear" type="button" aria-label="지우기">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
    </button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">icon-right + clearable (값 있음)</span>
  <div data-component class="input-wrap input-wrap--icon-right input-wrap--clearable">
    <input class="input" type="text" value="선택된 값" />
    <button class="input-clear" type="button" aria-label="지우기">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
    </button>
    <span class="input-icon icon icon--md" aria-hidden="true" hidden><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
  </div>
</div>
</div>
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
.input--success { border-color: var(--color-border-success); color: var(--color-text-success); }

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

/* 아이콘/버튼 폭(20px) + 좌우 오프셋(12px) + 텍스트 간격(8px) */
.input-wrap--icon-left  .input { padding-left:  calc(var(--space-12) + var(--icon-md) + var(--space-8)); }
.input-wrap--icon-right .input { padding-right: calc(var(--space-12) + var(--icon-md) + var(--space-8)); }
.input-wrap--clearable  .input { padding-right: calc(var(--space-12) + var(--icon-md) + var(--space-8)); }

/* icon-right + clearable 동시: 우측에 버튼 + 아이콘 공간 확보 */
.input-wrap--icon-right.input-wrap--clearable .input {
  padding-right: calc(var(--space-12) + var(--icon-md) + var(--space-8) + var(--icon-sm) + var(--space-8));
}

/* 상태 아이콘(badge 12px) + clearable JS 위치 제어 — 버튼 공간 예약 불필요 */
.input-wrap--icon-right.input-wrap--clearable:has(.input--error, .input--success) .input {
  padding-right: calc(var(--space-12) + var(--icon-badge) + var(--space-8));
}

.input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-subtle);
  pointer-events: none;
}
.input-wrap--icon-left  .input-icon { left:  var(--space-12); }
.input-wrap--icon-right .input-icon { right: var(--space-12); }

/* ── Addon: clear button ── */
.input-clear {
  position: absolute;
  right: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-text-subtle);
  padding: var(--space-inset-xs);
  border-radius: var(--icon-radius-xs);
}
.input-clear:hover { color: var(--color-text-body); background: var(--color-surface-subtle); }

/* icon-right + clearable: 아이콘 왼쪽에 X 버튼 배치 */
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
| 아이콘 (장식) | `aria-hidden="true"` |

에러 마크업 예시:

```html
<input class="input input--error" aria-invalid="true" aria-describedby="name-error" />
<span id="name-error" role="alert">필수 정보를 입력해 주세요.</span>
```

---

## Do / Don't

> ✅ DO — addon은 input-wrap으로 감쌈
> `<div class="input-wrap input-wrap--icon-right"><input class="input" /><span class="input-icon icon icon--md" aria-hidden="true">...</span></div>`

> ❌ DON'T — placeholder를 label 대용으로 사용
> 입력 시 사라지므로 레이블 역할 불가. 항상 `<label>`과 연결

> ✅ DO — 에러 메시지를 aria-describedby + role="alert"로 연결
> `<input class="input input--error" aria-invalid="true" aria-describedby="name-error" />`

> ❌ DON'T — ghost 상태에서 error 시 border가 보이지 않을 것이라 가정
> `input--ghost.input--error`는 `border-color: var(--color-border-error)`가 그대로 적용되어 테두리가 나타난다

> ❌ DON'T — data-component 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용. 실제 구현 코드에서는 제거한다.
