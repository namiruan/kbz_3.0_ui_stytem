---
file: components/atoms/toggle.md
version: 1.2.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/typography.md, tokens/radius.md, tokens/motion.md, tokens/elevation.md, tokens/icon.md
---

# Toggle

## 개요

즉시 적용되는 이진 설정(on/off)을 전환한다. Checkbox와의 차이 — 저장 액션 없이 변경이 즉시 반영될 때 사용한다. 폼 제출이 필요한 경우 Checkbox를 사용한다.

### 아이콘 thumb는 언제 쓰나

기본 토글은 상태를 **색**(회색↔파랑)과 **위치**(좌↔우) 둘로 말한다. 둘 다 "켜졌다"까지만 말하고 **무엇이 켜졌는지**는 말하지 못한다 — 그건 옆의 라벨이 맡는다.

`toggle--icon`은 그 자리에 아이콘을 넣어 상태를 **형태**로도 전달한다. on/off가 곧 뜻인 설정에서 쓴다.

| 쓴다 | 쓰지 않는다 |
|---|---|
| on/off에 **이름이 있는** 설정 — 비밀글(잠김/열림) · 공개 여부 | 단순 켜짐/꺼짐 — 알림, 다크모드 |
| 라벨을 못 보는 자리에 놓이는 토글 — 표의 셀, 좁은 툴바 | 라벨이 항상 붙어 있고 그것으로 충분한 경우 |

- **아이콘 쌍은 뜻이 반대인 것을 고른다** — `icon-lock`/`icon-unlock`, `icon-show`/`icon-hide`. 같은 아이콘의 색만 바꾸면 형태로 전달한다는 이점이 사라지고, 색 하나에 두 가지 뜻이 실린다.
- **아이콘이 라벨을 대신하지는 않는다.** 라벨을 생략하면 `aria-label`은 여전히 필수다 — 아이콘은 `aria-hidden`이라 낭독되지 않는다.
- 기본 토글보다 크다(track 44×24 / sm 36×20). 밀도가 빡빡한 표 안에서는 `toggle--sm`을 쓴다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| size | md (기본, 클래스 없음) · sm → `toggle--sm` | md |
| thumb | 빈 원 (기본, 클래스 없음) · 아이콘 → `toggle--icon` | 빈 원 |
| state | disabled → `toggle--disabled` | — |

---

## Anatomy

<!-- AI:
- root = label.toggle. 크기·상태 클래스를 root에 조합.
- input: 네이티브 <input type="checkbox" role="switch">. position: absolute; opacity: 0; width: 0; height: 0으로 시각적으로 제거하되 접근성 트리는 유지 — display:none / visibility:hidden 금지.
- track: span.toggle__track. 시각적 트랙(pill 형태). off/disabled 상태는 배경색이 페이지 배경과 동일할 수 있으므로 inset box-shadow로 테두리를 표시 — CSS border 대신 box-shadow를 사용해 box model 변화 없이 thumb 오프셋을 유지. on 상태는 파란 배경이 형태를 자체 정의하므로 inset 제거. focus ring은 input:focus-visible ~ .toggle__track 셀렉터로 track에 표시 — input이 0×0이므로 sibling 셀렉터 활용, input 자체의 focus outline은 나타나지 않는다.
- thumb: span.toggle__thumb. 트랙 내 슬라이딩 원형 핸들. top:50%+translateY(-50%)로 수직 중앙 고정. input:checked 시 translateY(-50%) translateX로 이동 — translateX = track너비 - thumb너비 - left간격 - right간격 (md: 36-12-4-4=16px, sm: 28-10-2-2=14px). md left:--space-4(4px)로 1px inset 테두리와 3px 시각 여백 확보.
- label text: span.toggle__label (optional). 레이블 없는 경우 input에 aria-label 필수.
- 아이콘 thumb(toggle--icon): thumb 안에 **아이콘 두 개를 모두** 둔다 — off용·on용. CSS가 :checked로 하나만 보여준다(Accordion의 expanded/collapsed와 같은 방식). JS로 use href를 바꾸지 않는다.
  래퍼는 span.icon + toggle__icon + toggle__icon--off | --on. **크기 유틸리티(.icon--{size})를 붙이지 않는다** — 토글 크기마다 아이콘 크기가 달라(md 16 / sm 12) 마크업에 한 크기를 박으면 둘 중 하나가 틀린다. 크기는 컴포넌트 CSS가 정한다.
  svg에 aria-hidden="true" 필수 — 상태는 role="switch"가 이미 전한다.
  이 variant만 치수가 다르다: md track 44×24 · thumb 20 · 아이콘 16, sm track 36×20 · thumb 16 · 아이콘 12. 기본(빈 원) 토글의 치수는 그대로다.
  아이콘 쌍은 **뜻이 반대인 것**을 고른다(icon-lock/icon-unlock, icon-show/icon-hide). 같은 아이콘의 색만 바꾸면 형태로 전달하는 이점이 사라진다.
- disabled: input에 disabled + aria-disabled="true" + tabindex="-1". root에 toggle--disabled. opacity 단독 처리 금지 — track/label에 각각 disabled 토큰 적용.
- disabled off/on 구분: input:not(:checked) ~ .toggle__track .toggle__thumb 셀렉터로 disabled-off thumb만 회색 처리 — disabled-on은 흰 thumb 유지해 켜짐을 표현. 단, disabled-on thumb 링은 브랜드 컬러 대신 중립 톤(border-neutral-subtle)을 써 비활성 상태에서 컬러 라인이 남지 않게 한다.
-->

### 기본

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">off</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="toggle toggle--sm">
      <input type="checkbox" role="switch" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">꺼짐</span>
    </label>
    <label data-component class="toggle">
      <input type="checkbox" role="switch" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">꺼짐</span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">on</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="toggle toggle--sm">
      <input type="checkbox" role="switch" checked />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">켜짐</span>
    </label>
    <label data-component class="toggle">
      <input type="checkbox" role="switch" checked />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">켜짐</span>
    </label>
  </div>
</div>
</div>
:::

### 상태

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="toggle toggle--sm toggle--disabled">
      <input type="checkbox" role="switch" disabled aria-disabled="true" tabindex="-1" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">비활성</span>
    </label>
    <label data-component class="toggle toggle--disabled">
      <input type="checkbox" role="switch" disabled aria-disabled="true" tabindex="-1" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">비활성</span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled on</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="toggle toggle--sm toggle--disabled">
      <input type="checkbox" role="switch" checked disabled aria-disabled="true" tabindex="-1" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">비활성 켜짐</span>
    </label>
    <label data-component class="toggle toggle--disabled">
      <input type="checkbox" role="switch" checked disabled aria-disabled="true" tabindex="-1" />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      <span class="toggle__label">비활성 켜짐</span>
    </label>
  </div>
</div>
</div>
:::

---

### 아이콘 thumb

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">off</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="toggle toggle--icon toggle--sm">
      <input type="checkbox" role="switch" />
      <span class="toggle__track"><span class="toggle__thumb">
        <span class="icon toggle__icon toggle__icon--off"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-unlock"/></svg></span>
        <span class="icon toggle__icon toggle__icon--on"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-lock"/></svg></span>
      </span></span>
      <span class="toggle__label">공개</span>
    </label>
    <label data-component class="toggle toggle--icon">
      <input type="checkbox" role="switch" />
      <span class="toggle__track"><span class="toggle__thumb">
        <span class="icon toggle__icon toggle__icon--off"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-unlock"/></svg></span>
        <span class="icon toggle__icon toggle__icon--on"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-lock"/></svg></span>
      </span></span>
      <span class="toggle__label">공개</span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">on</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="toggle toggle--icon toggle--sm">
      <input type="checkbox" role="switch" checked />
      <span class="toggle__track"><span class="toggle__thumb">
        <span class="icon toggle__icon toggle__icon--off"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-unlock"/></svg></span>
        <span class="icon toggle__icon toggle__icon--on"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-lock"/></svg></span>
      </span></span>
      <span class="toggle__label">비밀글</span>
    </label>
    <label data-component class="toggle toggle--icon">
      <input type="checkbox" role="switch" checked />
      <span class="toggle__track"><span class="toggle__thumb">
        <span class="icon toggle__icon toggle__icon--off"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-unlock"/></svg></span>
        <span class="icon toggle__icon toggle__icon--on"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-lock"/></svg></span>
      </span></span>
      <span class="toggle__label">비밀글</span>
    </label>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">disabled</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-md)">
    <label data-component class="toggle toggle--icon toggle--disabled">
      <input type="checkbox" role="switch" disabled aria-disabled="true" tabindex="-1" />
      <span class="toggle__track"><span class="toggle__thumb">
        <span class="icon toggle__icon toggle__icon--off"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-unlock"/></svg></span>
        <span class="icon toggle__icon toggle__icon--on"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-lock"/></svg></span>
      </span></span>
      <span class="toggle__label">공개</span>
    </label>
    <label data-component class="toggle toggle--icon toggle--disabled">
      <input type="checkbox" role="switch" checked disabled aria-disabled="true" tabindex="-1" />
      <span class="toggle__track"><span class="toggle__thumb">
        <span class="icon toggle__icon toggle__icon--off"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-unlock"/></svg></span>
        <span class="icon toggle__icon toggle__icon--on"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-lock"/></svg></span>
      </span></span>
      <span class="toggle__label">비밀글</span>
    </label>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
  cursor: pointer;
  position: relative;
}

/* input: 시각적으로만 제거. focus-visible은 sibling .toggle__track에 표시 */
.toggle input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
}

/* ── Track ── */
/* track 너비(36px/28px)는 space 토큰에 대응값이 없어 px 고정 */
/* inset box-shadow로 테두리 — box model 영향 없어 thumb 오프셋 재계산 불필요 */
.toggle__track {
  position: relative;
  display: inline-block;
  width: 36px;
  height: var(--icon-md);
  background: var(--color-action-brand-idle);
  border-radius: var(--radius-pill);
  flex-shrink: 0;
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-brand-subtle);
  transition: background var(--duration-base) var(--easing-base),
              box-shadow var(--duration-base) var(--easing-base);
}

/* ── Thumb ── */
/* top:50%+translateY(-50%)로 수직 중앙 정렬 — track 높이 변경에 무관 */
.toggle__thumb {
  position: absolute;
  top: 50%;
  left: var(--space-4); /* 대응 Semantic 토큰 없어 Primitive 직접 참조 */
  width: 12px;
  height: 12px;
  background: var(--color-text-inverse);
  border-radius: 50%;
  box-shadow: var(--shadow-sm), 0 0 0 var(--stroke-sm) var(--color-border-brand-subtle);
  transform: translateY(-50%);
  transition: transform var(--duration-base) var(--easing-symmetric);
}

/* ── Label ── */
.toggle__label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  color: var(--color-text-body);
}

/* ── Size: sm ── */
/* sm thumb(10px)·translateX(14px) space 토큰 없어 px 고정 */
.toggle--sm .toggle__track { width: 28px; height: var(--icon-sm); }
.toggle--sm .toggle__thumb { left: var(--space-2); /* 대응 Semantic 토큰 없어 Primitive 직접 참조 */ width: 10px; height: 10px; }
.toggle--sm .toggle__label { font-size: var(--font-size-sm); }

/* ── On ── */
/* 파란 배경이 형태를 자체 정의하므로 inset 불필요 */
.toggle input:checked ~ .toggle__track {
  background: var(--color-fill-brand);
  box-shadow: none;
}
/* translateX: track(36) - thumb(12) - left(4) - right(4) = 16px */
.toggle input:checked ~ .toggle__track .toggle__thumb { transform: translateY(-50%) translateX(var(--space-16)); /* 대응 Semantic 토큰 없어 Primitive 직접 참조 */ }
/* sm translateX: track(28) - thumb(10) - left(2) - right(2) = 14px */
.toggle--sm input:checked ~ .toggle__track .toggle__thumb { transform: translateY(-50%) translateX(14px); }

/* ── Hover ── */
/* hover off: inset 유지 + 외곽 ring */
.toggle:hover:not(.toggle--disabled) .toggle__track {
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-brand-subtle),
              0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
/* hover on: 외곽 ring만 */
.toggle:hover:not(.toggle--disabled) input:checked ~ .toggle__track {
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}

/* ── Focus ── */
.toggle input:focus-visible ~ .toggle__track {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── State: disabled ── */
/* off: surface-disabled(연한 회색) — border-disabled로 비활성 신호 */
/* on: surface-disabled-strong(진한 회색) — off보다 진해 켜짐 상태 구분 유지 */
.toggle--disabled { pointer-events: none; }
.toggle--disabled .toggle__track {
  background: var(--color-surface-disabled);
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-disabled);
}
.toggle--disabled input:checked ~ .toggle__track {
  background: var(--color-surface-disabled-strong);
  /* border-disabled(gray-200)와 배경(gray-200)이 동색이므로 border-default(gray-300)으로 명시 */
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-default);
}
.toggle--disabled input:not(:checked) ~ .toggle__track .toggle__thumb {
  background: var(--color-surface-base);
  box-shadow: none;
}
/* on: thumb 링을 브랜드 컬러 대신 중립 톤으로 — 비활성 상태에서 컬러 라인 제거 */
.toggle--disabled input:checked ~ .toggle__track .toggle__thumb {
  box-shadow: var(--shadow-sm), 0 0 0 var(--stroke-sm) var(--color-border-neutral-subtle);
}
.toggle--disabled .toggle__label { color: var(--color-text-disabled); }

/* ── Variant: 아이콘 thumb ── */
/* on/off가 곧 뜻인 설정(비밀글·공개 여부)에서 상태를 **형태**로도 전달한다.
   기본 토글은 색(회색↔파랑)과 위치(좌↔우) 둘로 상태를 말하는데, 둘 다
   "무엇이 켜졌는가"는 말하지 못한다 — 라벨을 읽어야 안다.
   아이콘을 넣으면 켜짐/꺼짐 자체가 자물쇠의 열림/닫힘으로 읽힌다.

   **이 variant만 thumb를 키운다.** 기본 thumb는 12px이고 담을 수 있는 가장 작은
   아이콘(--icon-badge, 12px)과 같은 크기라 여백이 0이다. thumb를 키우면 track도
   같이 커지므로, 기본 토글의 치수는 건드리지 않고 이 variant에서만 다시 잡는다.

     md  track 44×24 · thumb 20(--icon-md) · 아이콘 16(--icon-sm)    → 여백 2
     sm  track 36×20 · thumb 16(--icon-sm) · 아이콘 12(--icon-badge) → 여백 2

   **아이콘을 thumb에 꽉 채운다.** 12·14·16px을 나란히 렌더해 골랐다 — 작게 두면
   흰 원 안의 점처럼 보여 형태로 전달한다는 목적을 잃는다. 여백 2px이 좁아 보이지만
   아이콘 자신이 24 viewBox 안에서 이미 여백을 갖고 있어(자물쇠 실제 폭 ≈16/24)
   눈에 보이는 간격은 그보다 넓다.
   sm은 12px이 바닥이다 — 그보다 작으면 자물쇠의 열림/닫힘이 갈리지 않는다. */
.toggle--icon .toggle__track { width: 44px; height: var(--height-24); }

.toggle--icon .toggle__thumb {
  left: var(--space-2); /* 대응 Semantic 토큰 없어 Primitive 직접 참조 */
  width: var(--icon-md);
  height: var(--icon-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* translateX: track(44) - thumb(20) - left(2) - right(2) = 20px */
.toggle--icon input:checked ~ .toggle__track .toggle__thumb {
  transform: translateY(-50%) translateX(var(--space-20));
}

.toggle--icon.toggle--sm .toggle__track { width: 36px; height: var(--icon-md); }
.toggle--icon.toggle--sm .toggle__thumb { width: var(--icon-sm); height: var(--icon-sm); }
/* translateX: track(36) - thumb(16) - left(2) - right(2) = 16px */
.toggle--icon.toggle--sm input:checked ~ .toggle__track .toggle__thumb {
  transform: translateY(-50%) translateX(var(--space-16));
}

/* 아이콘 두 개를 **모두 마크업에 두고** CSS가 하나만 보여준다 —
   Accordion의 expanded/collapsed 아이콘과 같은 방식이다. JS로 use href를 바꾸지 않는다:
   상태 전환이 :checked 하나로 끝나고, 두 아이콘이 같은 자리에 있어 서로 어긋날 수 없다.

   **크기 유틸리티(.icon--{size})를 마크업에 붙이지 않는다.** Accordion은 어느 크기에서도
   아이콘이 16px이라 클래스로 박아도 되지만, 여기는 토글 크기마다 아이콘 크기가 다르다
   (md 16 / sm 12). 마크업에 한 크기를 박으면 두 크기 중 하나가 틀리므로,
   크기는 컴포넌트가 variant별로 정한다. */
/* off 아이콘은 **반투명한 브랜드 색**이다 — off 트랙(브랜드 18%)·off 라인(브랜드 30%)과
   같은 계열이라, 꺼진 상태 전체가 한 톤으로 읽힌다. 중립 회색을 쓰면 트랙만 브랜드고
   아이콘만 회색이라 두 색이 한 부품 안에서 따로 논다.
   농도는 50%다(--color-text-brand-faint). off 라인과 같은 30%로 두면 흰 thumb 위에서
   1.52:1이라 형태가 읽히지 않고, 80%면 켜짐과 무게가 같아져 반투명한 느낌이 사라진다
   — 30·50·80·100%를 나란히 렌더해 골랐다.
   ⚠️ 50%도 흰 thumb 위 2.08:1로 텍스트 기준(4.5:1) 아래다. 아이콘이 상태의 **단독 전달자가
   아니라서** 두는 값이다 — 켜짐/꺼짐은 role="switch"의 aria-checked · 트랙 색 · thumb 위치 ·
   라벨이 함께 전한다. 아이콘 하나로만 상태를 전해야 하는 화면이라면 이 variant를 쓰지 않는다.
   disabled에서는 브랜드 계열을 버리고 회색으로 내린다 — 비활성 부품에 브랜드 색이 남으면
   누를 수 있는 것으로 읽힌다. */
.toggle__icon {
  display: none;
  align-items: center;
  justify-content: center;
  color: var(--color-text-brand-faint);
  transition: color var(--duration-base) var(--easing-base);
}

.toggle--icon .toggle__icon > svg { width: var(--icon-sm); height: var(--icon-sm); }
.toggle--icon.toggle--sm .toggle__icon > svg { width: var(--icon-badge); height: var(--icon-badge); }

/* 기본은 off만 보인다 */
.toggle__icon--off { display: inline-flex; }
.toggle input:checked ~ .toggle__track .toggle__icon--off { display: none; }

/* on 아이콘은 브랜드 색 — thumb는 흰 원으로 두고 색은 아이콘이 갖는다.
   thumb를 브랜드 면으로 칠하면 트랙(브랜드)과 붙어 위치가 읽히지 않는다. */
.toggle input:checked ~ .toggle__track .toggle__icon--on {
  display: inline-flex;
  color: var(--color-text-brand);
}

/* disabled — 아이콘도 함께 내린다. 켜짐 여부는 트랙 농도와 thumb 위치가 계속 말한다 */
.toggle--disabled .toggle__icon,
.toggle--disabled input:checked ~ .toggle__track .toggle__icon--on {
  color: var(--color-text-disabled);
}
```

---

## 접근성

토글·스위치 유형 (`accessibility.md` 토글·스위치 행 적용).

| 상황 | 마크업 |
|------|--------|
| on/off 상태 | `role="switch"` + 네이티브 `<input type="checkbox">` 조합으로 `aria-checked` 자동 처리 |
| 레이블 없음 | input에 `aria-label` 필수 — `<input type="checkbox" role="switch" aria-label="다크모드 활성화" />` |
| disabled | `disabled` + `aria-disabled="true"` + `tabindex="-1"` |
| 아이콘 thumb 대비 | off 아이콘은 흰 thumb 위 **2.08:1**로 텍스트 기준 아래다. 상태를 `role="switch"`·트랙 색·thumb 위치·라벨이 함께 전하므로 아이콘은 단독 전달자가 아니다 — 아이콘만으로 상태를 읽어야 하는 화면이라면 이 variant를 쓰지 않는다 |
| 아이콘 thumb | thumb 안의 svg에 `aria-hidden="true"` — 상태는 `role="switch"`의 `aria-checked`가 이미 전한다. 아이콘까지 읽히면 같은 사실이 두 번 낭독된다. **아이콘은 라벨을 대신하지 않는다** — 라벨이 없으면 `aria-label`은 그대로 필수다 |
| 키보드 | `Space`로 on/off 전환. 포커스 링은 `input:focus-visible ~ .toggle__track` 셀렉터로 track에 표시 — 별도 CSS 불필요 |

---

## Do / Don't

> ✅ DO — 즉시 반영되는 설정에만 사용
> 알림 on/off, 테마 전환 등 저장 없이 즉시 적용되는 경우

> ✅ DO — 레이블 없는 Toggle에 `aria-label` 제공
> `<input type="checkbox" role="switch" aria-label="다크모드 활성화" />`

> ❌ DON'T — 폼 내 선택지에 Toggle 사용
> 저장 버튼이 있는 폼에서는 Checkbox 사용

> ❌ DON'T — input에 `display:none` 또는 `visibility:hidden` 적용
> 접근성 트리에서 제거된다. `opacity: 0; width: 0; height: 0`으로 시각적으로만 제거해야 한다

> ✅ DO — 아이콘 thumb에는 뜻이 반대인 아이콘 쌍을 (형태만으로 상태가 갈린다)
> `icon-unlock` ↔ `icon-lock` · `icon-show` ↔ `icon-hide`

> ❌ DON'T — 아이콘 하나만 두고 색으로 on/off 구분 (색 하나에 두 뜻이 실려 형태로 전달하는 이점이 사라진다)
> `<span class="toggle__thumb"><span class="icon toggle__icon"><svg><use href="…#icon-lock"/></svg></span></span>`

> ❌ DON'T — 아이콘 래퍼에 크기 유틸리티 박기 (md 16 / sm 12로 다르다 — 한 크기를 박으면 둘 중 하나가 틀린다)
> `<span class="icon icon--badge toggle__icon toggle__icon--on">`

> ❌ DON'T — JS로 `use href`를 바꿔 아이콘 교체 (전환이 `:checked` 밖으로 나가고, 상태와 아이콘이 어긋날 수 있다)

> ❌ DON'T — 아이콘을 넣었다고 `aria-label` 생략 (svg가 `aria-hidden`이라 낭독되지 않는다)
