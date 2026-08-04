---
file: components/molecules/stepper.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, components/atoms/icon.md, components/atoms/input.md
---

# Stepper

## 개요

`−` / 값 / `+` 세 파트로 구성한 숫자 증감 컨트롤. 가운데 값은 직접 입력할 수도 있고, 좌우 버튼으로 `step` 단위만큼 세밀하게 조절할 수도 있다. 수량·인원·근로시간·비율 등 **범위·단위가 정해진 숫자값**을 미세 조정할 때 사용한다.

Input(숫자)과의 차이 — 자유 입력이 아니라 `min`·`max`·`step` 경계 안에서 조절하는 것이 목적이다. 경계에 도달하면 해당 방향 버튼이 자동으로 비활성된다. 단위 라벨(`분`·`개`·`%`)이나 에러 메시지가 필요하면 FormField로 감싼다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | md (기본, 클래스 없음) · sm → `stepper--sm` | md |
| state | disabled → `stepper--disabled` | — |

- **size** — `md`는 Input `md`(40px)와 높이를 맞춘 폼 기본값. `sm`은 밀집 영역·인라인 배치용(32px).
- **disabled** — 컨트롤 전체 비활성. root에 `stepper--disabled`를 더하고 값 input과 두 버튼 모두 `disabled` 처리한다. 개별 버튼이 경계값(min·max)에서 자동 비활성되는 것과는 다른 계층이다.

값 input에는 `data-min`·`data-max`·`data-step` 속성으로 범위와 증감 폭을 지정한다. 생략 시 min·max 무제한, step 1로 동작한다.

---

## 사용 지침

### 선택 기준

| 상황 | 권장 |
|------|------|
| 범위·단위가 정해진 값의 미세 조정 (수량, 인원, 근로시간) | Stepper |
| 범위 제한 없는 자유 숫자 입력 (금액, 코드) | Input (`input-wrap--suffix`) |
| 정해진 후보 중 택1 (2~5개) | Segment |

### 화면 내 구성 패턴

단위·라벨·안내 문구가 필요하면 FormField로 감싼다. 단위는 라벨 오른쪽 `단위: N분` 형태 helper로 표기하고, Stepper 자체는 숫자값만 다룬다.

```html
<div class="form-field">
  <div class="form-field__label-row">
    <label class="text-form-label" for="end-time">종료 시간 <span class="form-field__required">*</span></label>
    <span class="text-helper" style="color:var(--color-text-subtle)">단위: 30분</span>
  </div>
  <div class="stepper" data-min="0" data-max="1440" data-step="30">
    <button class="stepper__btn stepper__btn--minus" type="button" aria-label="30분 감소">…</button>
    <input class="stepper__value" id="end-time" type="text" inputmode="numeric" role="spinbutton" value="1200" />
    <button class="stepper__btn stepper__btn--plus" type="button" aria-label="30분 증가">…</button>
  </div>
  <p class="text-helper" style="color:var(--color-text-subtle)">시간을 직접 선택하거나 +/- 로 세밀하게 조절하세요</p>
</div>
```

### 제약

- 값은 숫자만 다룬다. `20:00` 같은 표시 포맷이 필요하면 FormField 안내 문구로 단위를 전달하고 값은 숫자(분·시)로 관리한다 — Stepper가 포맷 변환을 수행하지 않는다.
- `data-step`은 `data-min`을 기준으로 정렬한다(예: min 0, step 30 → 0·30·60…). 경계값과 step이 맞아떨어지지 않으면 max에 도달하지 못할 수 있다.
- 값 input의 너비는 고정하지 않고 컨테이너 폭에 맞춰 늘어난다. 전체 폭은 root의 `width`로 제어한다.

---

## 동작

<!-- AI:
initStepper(container): container 안의 모든 .stepper를 초기화한다. 각 stepper에서
- data-min / data-max / data-step 을 읽는다(생략 시 -Infinity / Infinity / 1).
- 현재값 = 값 input의 value를 파싱 후 [min, max]로 clamp.
- render(v): value·aria-valuenow 갱신 → v<=min이면 − 버튼 disabled, v>=max이면 + 버튼 disabled. 전체 disabled(stepper--disabled)이면 두 버튼 모두 disabled 유지.
- − 버튼: v-step, + 버튼: v+step (모두 clamp). 조작 후 값 input에 focus.
- 값 input: blur 시 clamp해 정규화. ↑/↓ 키로 step 증감.
초기 로드 시 aria-valuemin/valuemax도 유한값이면 세팅한다.
-->

| 이벤트 | 동작 |
|--------|------|
| `−` 버튼 클릭 | 값 −= step 후 clamp. `aria-valuenow` 갱신. min 도달 시 `−` 버튼 disabled |
| `+` 버튼 클릭 | 값 += step 후 clamp. `aria-valuenow` 갱신. max 도달 시 `+` 버튼 disabled |
| 값 input `blur` | 입력값을 [min, max]로 clamp해 정규화 |
| 값 input `↑` · `↓` | step 단위 증가·감소 (clamp) |
| `stepper--disabled` | 값 input·두 버튼 모두 disabled. 경계값 로직보다 우선 |

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl);max-width:320px">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">기본 — 인원 (min 1, max 20, step 1)</p>
  <div data-component class="stepper" data-min="1" data-max="20" data-step="1">
    <button class="stepper__btn stepper__btn--minus" type="button" aria-label="1 감소"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg></button>
    <input class="stepper__value" type="text" inputmode="numeric" role="spinbutton" aria-label="인원" value="2" />
    <button class="stepper__btn stepper__btn--plus" type="button" aria-label="1 증가"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></button>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">근로시간 (min 0, max 480, step 30)</p>
  <div data-component class="stepper" data-min="0" data-max="480" data-step="30">
    <button class="stepper__btn stepper__btn--minus" type="button" aria-label="30분 감소"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg></button>
    <input class="stepper__value" type="text" inputmode="numeric" role="spinbutton" aria-label="근로시간(분)" value="240" />
    <button class="stepper__btn stepper__btn--plus" type="button" aria-label="30분 증가"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></button>
  </div>
</div>

</div>
<script>
initStepper(stage);
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.stepper. size: md — 클래스 없음(기본). sm — stepper--sm 추가. 전체 비활성 — stepper--disabled 추가.
  - 범위·증감 폭은 root의 data-min·data-max·data-step 속성으로 지정. 생략 시 무제한·step 1.
- button.stepper__btn.stepper__btn--minus: 감소 버튼. svg는 icon-minus.
- input.stepper__value: 가운데 값. type="text" + inputmode="numeric" + role="spinbutton". aria-valuenow는 초기값과 동일하게, 라벨은 aria-label 또는 FormField와 aria-labelledby로 연결.
- button.stepper__btn.stepper__btn--plus: 증가 버튼. svg는 icon-plus.
- 경계값 도달 시: initStepper가 해당 방향 버튼에 disabled 속성을 추가한다(마크업에 미리 넣지 않음).
- disabled 전체: root에 stepper--disabled + input·두 버튼에 disabled + tabindex="-1". 아이콘 svg는 항상 aria-hidden="true".
-->

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">md</span>
  <div data-component class="stepper" style="width:180px">
    <button class="stepper__btn stepper__btn--minus" type="button" aria-label="1 감소"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg></button>
    <input class="stepper__value" type="text" inputmode="numeric" role="spinbutton" aria-label="수량" aria-valuenow="3" value="3" />
    <button class="stepper__btn stepper__btn--plus" type="button" aria-label="1 증가"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">sm</span>
  <div data-component class="stepper stepper--sm" style="width:160px">
    <button class="stepper__btn stepper__btn--minus" type="button" aria-label="1 감소"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg></button>
    <input class="stepper__value" type="text" inputmode="numeric" role="spinbutton" aria-label="수량" aria-valuenow="3" value="3" />
    <button class="stepper__btn stepper__btn--plus" type="button" aria-label="1 증가"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">min 도달</span>
  <div data-component class="stepper" style="width:180px">
    <button class="stepper__btn stepper__btn--minus" type="button" aria-label="1 감소" disabled tabindex="-1"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg></button>
    <input class="stepper__value" type="text" inputmode="numeric" role="spinbutton" aria-label="수량" aria-valuenow="0" value="0" />
    <button class="stepper__btn stepper__btn--plus" type="button" aria-label="1 증가"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></button>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div data-component class="stepper stepper--disabled" style="width:180px">
    <button class="stepper__btn stepper__btn--minus" type="button" aria-label="1 감소" disabled tabindex="-1"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg></button>
    <input class="stepper__value" type="text" inputmode="numeric" role="spinbutton" aria-label="수량" aria-valuenow="3" value="3" disabled tabindex="-1" />
    <button class="stepper__btn stepper__btn--plus" type="button" aria-label="1 증가" disabled tabindex="-1"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></button>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.stepper {
  display: inline-flex;
  align-items: center;
  height: var(--height-base);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
}

/* ── 증감 버튼 (− / +) ── */
/* box-sizing·padding 리셋 — 전역 리셋 없는 환경에서도 정사각 버튼 높이가 어긋나지 않도록 */
.stepper__btn {
  box-sizing: border-box;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--height-base);
  height: 100%;
  padding: 0;
  border: none;
  background: var(--color-surface-subtle);
  color: var(--color-text-label);
  cursor: pointer;
  transition: background var(--duration-fast) var(--easing-base),
              color var(--duration-fast) var(--easing-base);
}
.stepper__btn svg { width: var(--icon-sm); height: var(--icon-sm); }
/* 가운데 값과 버튼을 세로 구분선으로 나눔 + 바깥 모서리는 컨테이너 radius에 맞춤 */
.stepper__btn--minus {
  border-right: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs) 0 0 var(--radius-xs);
}
.stepper__btn--plus {
  border-left: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
}

/* ── Hover ── */
.stepper__btn:hover { background: var(--color-action-neutral-hover); color: var(--color-text-body); }

/* ── Disabled (경계값 도달 — 개별 버튼) ── */
.stepper__btn:disabled {
  background: var(--color-surface-disabled);
  color: var(--color-text-disabled);
  cursor: default;
  pointer-events: none;
}

/* ── 값 표시 (편집 가능) ── */
.stepper__value {
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 100%;
  padding: 0 var(--space-gap-sm);
  border: none;
  background: transparent;
  text-align: center;
  color: var(--color-text-display);
  font-family: var(--font-family-base);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-ui);
  -moz-appearance: textfield;
}
/* number 스피너 제거 — type="text"를 쓰지만 방어적으로 함께 둔다 */
.stepper__value::-webkit-outer-spin-button,
.stepper__value::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
/* 값 input 자체 focus는 전역 *:focus-visible outline으로 표시 — 재선언 금지 */

/* ── Size: sm ── */
.stepper--sm { height: var(--height-compact); }
.stepper--sm .stepper__btn { width: var(--height-compact); }
.stepper--sm .stepper__value { font-size: var(--font-size-base); }

/* ── State: disabled (전체) ── */
.stepper--disabled {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
}
.stepper--disabled .stepper__btn {
  background: var(--color-surface-disabled);
  color: var(--color-text-disabled);
  pointer-events: none;
}
.stepper--disabled .stepper__value { color: var(--color-text-disabled); }
```

```js init
/* initStepper(container): container 안의 모든 .stepper 초기화.
   data-min·data-max·data-step으로 범위·증감 폭 지정(생략 시 무제한·step 1).
   경계값 도달 시 해당 방향 버튼 disabled, blur 시 clamp 정규화, ↑/↓ 키 지원. */
function initStepper(container) {
  container.querySelectorAll('.stepper').forEach(function(root) {
    if (root.dataset.initStepper) return;
    root.dataset.initStepper = '1';

    var input = root.querySelector('.stepper__value');
    var minusBtn = root.querySelector('.stepper__btn--minus');
    var plusBtn = root.querySelector('.stepper__btn--plus');
    if (!input || !minusBtn || !plusBtn) return;

    var min = root.dataset.min !== undefined ? Number(root.dataset.min) : -Infinity;
    var max = root.dataset.max !== undefined ? Number(root.dataset.max) : Infinity;
    var step = root.dataset.step !== undefined ? Number(root.dataset.step) : 1;
    var fullDisabled = root.classList.contains('stepper--disabled');

    if (isFinite(min)) input.setAttribute('aria-valuemin', min);
    if (isFinite(max)) input.setAttribute('aria-valuemax', max);

    function clamp(v) {
      if (isNaN(v)) v = isFinite(min) ? min : 0;
      if (v < min) v = min;
      if (v > max) v = max;
      return v;
    }
    function current() { return clamp(parseFloat(input.value)); }
    function render(v) {
      input.value = v;
      input.setAttribute('aria-valuenow', v);
      if (fullDisabled) return;
      minusBtn.disabled = v <= min;
      plusBtn.disabled = v >= max;
    }

    render(current());
    if (fullDisabled) return;

    minusBtn.addEventListener('click', function() { render(clamp(current() - step)); input.focus(); });
    plusBtn.addEventListener('click', function() { render(clamp(current() + step)); input.focus(); });
    input.addEventListener('blur', function() { render(current()); });
    input.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowUp') { e.preventDefault(); render(clamp(current() + step)); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); render(clamp(current() - step)); }
    });
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initStepper) window.__componentInits.initStepper = initStepper;
```

---

## 접근성

숫자 조절(spinbutton) 유형 — 값 input에 `role="spinbutton"`을 부여한다.

| 상황 | 마크업 |
|------|--------|
| 값 input | `role="spinbutton"` + `aria-valuenow`. 범위가 있으면 `aria-valuemin`·`aria-valuemax`(initStepper가 자동 세팅) |
| 라벨 연결 | `aria-label` 또는 FormField `<label>`과 `aria-labelledby`로 연결. 라벨 없는 값 input 금지 |
| `−` · `+` 버튼 | 아이콘 전용이므로 `aria-label` 필수(`"1 감소"`·`"30분 증가"` 등 실제 증감 폭 포함). svg에 `aria-hidden="true"` |
| 경계값 비활성 | min·max 도달 시 해당 버튼 `disabled` — 스크린리더에 비활성 전달 |
| disabled (전체) | root `stepper--disabled` + 값 input·두 버튼 `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| 키보드 — Tab | `−` → 값 input → `+` 순서로 포커스. 시각 순서와 일치 |
| 키보드 — ↑ · ↓ | 값 input 포커스 상태에서 step 단위 증감. `<button>` Enter·Space는 네이티브 지원 |

키보드 증감 예시:

```js
input.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowUp')   { e.preventDefault(); render(clamp(current() + step)); }
  if (e.key === 'ArrowDown') { e.preventDefault(); render(clamp(current() - step)); }
});
```

---

## Do / Don't

> ✅ DO — 범위·증감 폭은 `data-min`·`data-max`·`data-step`으로 선언
> `<div class="stepper" data-min="0" data-max="480" data-step="30">` → 경계 도달 시 버튼이 자동 비활성된다

> ❌ DON'T — 경계값 disabled를 마크업에 손으로 고정
> `initStepper`가 현재값 기준으로 `−`·`+` 버튼의 `disabled`를 계산한다. 미리 박아두면 값이 바뀌어도 갱신되지 않는다

> ✅ DO — `−`·`+` 버튼에 증감 폭이 드러나는 `aria-label` 부여
> `aria-label="30분 증가"` — 아이콘만으로는 얼마나 조절되는지 스크린리더가 알 수 없다

> ❌ DON'T — 값 input을 라벨 없이 사용
> `role="spinbutton"` input에는 `aria-label` 또는 FormField `aria-labelledby`가 반드시 있어야 한다

> ✅ DO — 단위·안내는 FormField에 위임
> 단위(`단위: 30분`)는 라벨 옆 helper로, 값 input은 숫자만 다룬다

> ❌ DON'T — Stepper에 표시 포맷(`20:00`) 변환을 기대
> Stepper는 숫자값만 관리한다. 포맷이 필요하면 값(분·시)을 별도로 포맷팅해 표시한다
