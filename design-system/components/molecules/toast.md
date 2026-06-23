---
file: components/molecules/toast.md
version: 0.1.2
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/motion.md, tokens/stroke.md, tokens/radius.md, tokens/icon.md, tokens/elevation.md, tokens/typography.md, components/atoms/icon.md, components/atoms/icon-button.md, components/atoms/link.md
---

# Toast

## 개요

작업 완료·오류·경고 등 일시적 피드백을 화면 우상단에 표시하는 비모달 알림. 기본 4초 후 자동 소멸하거나 수동 닫기로 제거된다. 사용자의 작업 흐름을 중단하지 않으면서 중요한 상태 변화를 전달한다.

Alert과의 차이 — Alert는 페이지 콘텐츠 안에 고정 삽입되어 사라지지 않는 인라인 메시지. Toast는 화면 위에 일시적으로 떠 있다가 자동 소멸한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | info (기본, 클래스 없음) · success → `toast--success` · caution → `toast--caution` · error → `toast--error` | info |
| title | 없음 (기본) · 있음 — `toast__title` 요소 포함 | 없음 |
| action | 없음 (기본) · 있음 — `toast__action` 슬롯에 Link 또는 버튼 배치 | 없음 |

닫기 버튼(`toast__close`)은 항상 포함한다.

---

## 사용 지침

| 상황 | 권장 |
|------|------|
| 저장·삭제 등 작업 성공 피드백 | `toast--success` |
| 폼 제출 오류, 네트워크 요청 실패 | `toast--error` |
| 저장 전 권고 사항, 주의 안내 | `toast--caution` |
| 시스템 알림, 일반 정보 | info (기본) |
| 페이지 안에 항상 노출되어야 하는 메시지 | Alert |
| 확인 동작이 필요한 오류·경고 | Modal |

**제약**
- 동시에 최대 3개까지 쌓는다. 4번째부터는 가장 오래된 토스트를 먼저 제거한다.
- 메시지는 1–2문장으로 제한한다. 더 긴 설명은 `toast__action`으로 상세 페이지를 연결한다.
- 자동 소멸 타이머는 포인터가 `.toast-stack` 위에 올라온 동안 정지한다.

---

## 동작

| 이벤트 | 동작 |
|--------|------|
| JS `showToast()` 호출 | 동일 style의 toast가 이미 있고 1500 ms 이내면 타이머만 리셋(debounce). 없으면 `.toast-stack` 상단에 `.toast` prepend → `toast--visible` 적용 → 타이머 시작 |
| 타이머 만료 (기본 4000 ms) | `toast--visible` 제거 + `toast--hidden` 적용 → animationend 후 DOM 제거 |
| 닫기 버튼 클릭 | 타이머 취소 + `toast--hidden` 적용 → DOM 제거 |
| 포인터가 `.toast-stack` 진입 | 타이머 일시정지 |
| 포인터가 `.toast-stack` 이탈 | 잔여 시간으로 타이머 재개 |
| `Escape` | 가장 최근 토스트 닫기 |
| 스택이 3개를 초과할 때 | 가장 오래된(맨 아래) toast를 즉시 제거 |

:::preview
<div style="min-height:160px;background:var(--color-surface-subtle);border-radius:var(--radius-md);padding:var(--space-inset-xl);display:flex;flex-direction:column;justify-content:flex-end">

  <div id="demo-toast-stack" aria-live="polite" aria-atomic="false"
    style="position:fixed;top:var(--space-gap-2xl);right:var(--space-gap-2xl);display:flex;flex-direction:column;gap:var(--space-gap-sm);width:320px;max-width:calc(100vw - 48px);z-index:var(--z-toast);pointer-events:none">
  </div>

  <div>
    <p style="font-size:var(--font-size-sm);color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">토스트는 브라우저 우상단에 고정됩니다. 버튼을 눌러 확인하세요.</p>
    <div style="display:flex;gap:var(--space-gap-sm);flex-wrap:wrap">
      <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-info">Info</button>
      <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-success">Success</button>
      <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-caution">Caution</button>
      <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-error">Error</button>
      <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-action">With action</button>
      <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-title">With title</button>
    </div>
  </div>

</div>
<script>
(function() {
  var ICONS = { info: 'icon-info', success: 'icon-circle-check', caution: 'icon-triangle-alert', error: 'icon-circle-x' };
  var MSGS = {
    info:    '시스템 업데이트가 예정되어 있습니다.',
    success: '프로젝트가 성공적으로 저장되었습니다.',
    caution: '변경 사항을 저장하지 않으면 데이터가 손실됩니다.',
    error:   '요청을 처리할 수 없습니다. 다시 시도해 주세요.'
  };
  var stack = stage.querySelector('#demo-toast-stack');

  function makeToast(style, title, message, actionLabel) {
    var cls = 'toast toast--visible' + (style !== 'info' ? ' toast--' + style : '');
    var toast = document.createElement('div');
    toast.className = cls;
    toast.innerHTML =
      '<span class="icon--md toast__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#' + ICONS[style] + '"/></svg></span>' +
      '<div class="text-description toast__body">' +
        (title ? '<p class="toast__title">' + title + '</p>' : '') +
        '<p class="toast__message">' + message + '</p>' +
        (actionLabel ? '<div class="toast__action"><a class="link toast__action-link" href="#">' + actionLabel + '</a></div>' : '') +
      '</div>' +
      '<button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>';

    if (style === 'error') toast.setAttribute('role', 'alert');

    toast.querySelector('.toast__close').addEventListener('click', function() { dismiss(toast); });
    toast._timer = setTimeout(function() { dismiss(toast); }, 4000);
    return toast;
  }

  var DEBOUNCE_MS = 1500;

  function addToast(style, title, message, action) {
    // debounce: 동일 style의 toast가 DEBOUNCE_MS 내에 있으면 타이머만 리셋
    var existing = stack.querySelector('.toast--' + (style === 'info' ? 'info-base' : style) + ', .toast[data-style="' + style + '"]');
    if (existing && existing._addedAt && (Date.now() - existing._addedAt) < DEBOUNCE_MS) {
      clearTimeout(existing._timer);
      existing._timer = setTimeout(function() { dismiss(existing); }, 4000);
      existing._addedAt = Date.now();
      return;
    }
    // 최대 3개 — 가장 오래된(맨 아래) 제거
    var items = stack.querySelectorAll('.toast');
    if (items.length >= 3) dismiss(items[items.length - 1]);
    var toast = makeToast(style, title, message, action);
    toast.dataset.style = style;
    toast._addedAt = Date.now();
    // 최신 토스트를 상단에 prepend
    stack.insertBefore(toast, stack.firstChild);
  }

  function dismiss(toast) {
    clearTimeout(toast._timer);
    toast.classList.remove('toast--visible');
    toast.classList.add('toast--hidden');
    toast.addEventListener('animationend', function() { toast.remove(); }, { once: true });
  }

  stage.querySelector('#demo-btn-info').addEventListener('click',    function() { addToast('info',    '',           MSGS.info); });
  stage.querySelector('#demo-btn-success').addEventListener('click', function() { addToast('success', '',           MSGS.success); });
  stage.querySelector('#demo-btn-caution').addEventListener('click', function() { addToast('caution', '',           MSGS.caution); });
  stage.querySelector('#demo-btn-error').addEventListener('click',   function() { addToast('error',   '',           MSGS.error); });
  stage.querySelector('#demo-btn-action').addEventListener('click',  function() { addToast('success', '',           MSGS.success, '내역 보기'); });
  stage.querySelector('#demo-btn-title').addEventListener('click',   function() { addToast('error',   '저장 실패',  MSGS.error); });

  // 포인터가 스택 위에 있으면 타이머 일시정지
  stack.addEventListener('mouseenter', function() {
    stack.querySelectorAll('.toast').forEach(function(t) { clearTimeout(t._timer); });
  });
  stack.addEventListener('mouseleave', function() {
    stack.querySelectorAll('.toast').forEach(function(t) {
      t._timer = setTimeout(function() { dismiss(t); }, 1500);
    });
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.toast — 개별 알림 카드. shadow는 .toast CSS에서 직접 선언. z-index는 .toast-stack이 담당하므로 elevation-toast 클래스 불필요.
  toast--visible / toast--hidden 클래스로 진입·퇴장 animation 제어.
- icon = span.icon--md.toast__icon[aria-hidden="true"] — 상태 아이콘(20px). color CSS로 SVG fill(currentColor) 전달.
  상태별 전용 아이콘: icon-info(info), icon-circle-check(success), icon-triangle-alert(caution), icon-circle-x(error).
- body = div.text-description.toast__body — flex column. .text-description(font-size-lg + line-height-reading) 베이스. title + message + action 포함.
  - title = p.toast__title — (선택) 알림 제목. semibold.
  - message = p.toast__message — 본문. subtle color.
  - action = div.toast__action — (선택) Link 또는 버튼. 슬롯 역할.
- close = button.icon-on--sm.toast__close[aria-label="알림 닫기"] — 닫기 버튼. icon-on--sm의 neutral hover 그대로 사용.
- stack = div.toast-stack[aria-live="polite"][aria-atomic="false"] — 전역 컨테이너. position:fixed 브라우저 우상단.
  top: calc(var(--height-topnav, 0px) + space-gap-2xl) — TopNav가 있으면 :root에서 --height-topnav 오버라이드.
  최신 toast를 insertBefore(firstChild)로 상단 prepend, 이전 toast는 아래로 밀림.
  animationend 이벤트에서 DOM remove.
  pointer-events: none — 스택 영역이 뒤쪽 클릭을 막지 않도록. 개별 .toast에 pointer-events: auto 필요.
- style variant:
  - info (기본, 클래스 없음): border-left brand 색, icon brand 색
  - toast--success: border-left success 색, icon success 색
  - toast--caution: border-left caution 색, icon caution 색
  - toast--error: border-left error 색, icon error 색. role="alert" 추가(즉시 음성 안내).
- animation:
  - toast--visible: toast-enter — translateY(-space-gap-md) → 0 + fade in (easing-enter). 우상단 배치이므로 위에서 아래로 슬라이드.
  - toast--hidden:  toast-exit  — fade out + translateY(-space-gap-md) (easing-exit). 위로 슬라이드 퇴장.
  animationend 이벤트에서 DOM remove.
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">info (기본)</span>
  <div data-component class="toast">
    <span class="icon--md toast__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-info"/></svg></span>
    <div class="text-description toast__body">
      <p class="toast__message">시스템 업데이트가 예정되어 있습니다.</p>
    </div>
    <button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">success</span>
  <div data-component class="toast toast--success">
    <span class="icon--md toast__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-circle-check"/></svg></span>
    <div class="text-description toast__body">
      <p class="toast__message">프로젝트가 성공적으로 저장되었습니다.</p>
    </div>
    <button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">caution</span>
  <div data-component class="toast toast--caution">
    <span class="icon--md toast__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-triangle-alert"/></svg></span>
    <div class="text-description toast__body">
      <p class="toast__message">변경 사항을 저장하지 않으면 데이터가 손실됩니다.</p>
    </div>
    <button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div data-component class="toast toast--error" role="alert">
    <span class="icon--md toast__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-circle-x"/></svg></span>
    <div class="text-description toast__body">
      <p class="toast__message">요청을 처리할 수 없습니다. 다시 시도해 주세요.</p>
    </div>
    <button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">title + action</span>
  <div data-component class="toast toast--error" role="alert">
    <span class="icon--md toast__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-circle-x"/></svg></span>
    <div class="text-description toast__body">
      <p class="toast__title">저장 실패</p>
      <p class="toast__message">요청을 처리할 수 없습니다. 다시 시도해 주세요.</p>
      <div class="toast__action"><a class="link toast__action-link" href="#">오류 내역 보기</a></div>
    </div>
    <button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>

</div>
:::

---

## CSS

```css
/* ── 기반 스타일 ──────────────────────────────
   shadow → .toast에서 직접 선언 (컴포넌트 CSS 자급).
   z-index → .toast-stack에서만 선언. 개별 .toast는 stack의 stacking context 안이므로 z-index 불필요.
   elevation-toast 유틸리티 클래스는 이 컴포넌트에서 사용하지 않는다.
─────────────────────────────────────────────── */

/* ── Stack ── */
/* position:fixed 전역 레이어. JS가 최신 toast를 insertBefore(firstChild)로 상단 prepend / animationend 후 remove */
/* --height-topnav: 디자인 토큰 미정의 — TopNav가 있는 앱에서 :root { --height-topnav: 56px } 로 오버라이드 */
.toast-stack {
  position: fixed;
  top: calc(var(--height-topnav, 0px) + var(--space-gap-2xl));
  right: var(--space-gap-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-sm);
  width: 360px;
  max-width: calc(100vw - var(--space-gap-lg));
  z-index: var(--z-toast);
  pointer-events: none; /* 스택 자체는 클릭 통과 — 개별 toast만 이벤트 수신 */
}

/* ── Toast ── */
.toast {
  display: flex;
  align-items: flex-start;
  gap: var(--space-gap-sm);
  padding: var(--space-inset-xl);
  background: var(--color-surface-brand-subtle); /* info default */
  border: var(--stroke-sm) solid var(--color-border-brand-subtle); /* info default */
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  pointer-events: auto; /* toast-stack의 pointer-events:none을 개별 카드 단위에서 복원 */
}

/* ── Animation ── */
/* 우상단 배치 — 위에서 아래로 슬라이드 진입, 위로 슬라이드 퇴장 */
@keyframes toast-enter {
  from { opacity: 0; transform: translateY(calc(-1 * var(--space-gap-md))); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes toast-exit {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(calc(-1 * var(--space-gap-md))); }
}
.toast--visible {
  animation: toast-enter var(--duration-base) var(--easing-enter) forwards;
}
.toast--hidden {
  animation: toast-exit var(--duration-base) var(--easing-exit) forwards;
}

/* ── Icon ── */
/* icon--md(utilities/icon.css) — SVG 크기 제어(20px). color 상속으로 SVG currentColor 전달 */
.toast__icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  color: var(--color-text-brand); /* info default */
}

/* ── Body ── */
/* .text-description(font-size-lg + line-height-reading) 를 베이스로 사용.
   title·message·action-link 모두 font-size 상속. */
.toast__body {
  flex: 1;
  min-width: 0; /* flex 컨테이너 안 텍스트 말줄임 보장 */
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-2xs);
}
.toast__title {
  font-weight: var(--font-weight-heading);
  color: var(--color-text-brand); /* info default */
  line-height: var(--line-height-ui);
  margin: 0;
}
.toast__message {
  color: var(--color-text-brand); /* info default */
  line-height: var(--line-height-reading);
  margin: 0;
}

/* ── Action ── */
/* .link(components/atoms/link.md) 위에 color만 오버라이드.
   font-size는 toast__body에서 상속. text-decoration·hover는 .link가 담당.
   toast__action-link는 항상 유효한 목적지를 가지므로 disabled 상태 없음 — 이동 불가 시 슬롯 제거. */
.toast__action {
  margin-top: var(--space-gap-xs);
}
.toast__action-link {
  color: var(--color-text-brand); /* info default — .link 기본값(brand-vivid) 오버라이드 */
}
.toast__action-link:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
  border-radius: var(--radius-xs);
}

/* ── Close ── */
/* button.icon-on--sm (utilities/icon.css) — hover/active/disabled 상태 자동 적용.
   focus-visible은 icon.css에 미정의 — 이 블록에서 직접 선언 */
.toast__close {
  flex-shrink: 0;
  align-self: flex-start;
  color: var(--color-text-subtle);
}
.toast__close:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
  border-radius: var(--icon-radius-xs);
}

/* ── Style variants ── */
.toast--success {
  background: var(--color-surface-success-subtle);
  border-color: var(--color-border-success-subtle);
}
.toast--success .toast__icon,
.toast--success .toast__title,
.toast--success .toast__message,
.toast--success .toast__action-link {
  color: var(--color-text-success);
}

.toast--caution {
  background: var(--color-surface-caution-subtle);
  border-color: var(--color-border-caution-subtle);
}
.toast--caution .toast__icon,
.toast--caution .toast__title,
.toast--caution .toast__message,
.toast--caution .toast__action-link {
  color: var(--color-text-caution);
}

.toast--error {
  background: var(--color-surface-error-subtle);
  border-color: var(--color-border-error-subtle);
}
.toast--error .toast__icon,
.toast--error .toast__title,
.toast--error .toast__message,
.toast--error .toast__action-link {
  color: var(--color-text-error);
}
```

---

## 접근성

펼침/접힘 없는 공지형 라이브 리전 패턴.

| 상황 | 마크업 |
|------|--------|
| 스택 컨테이너 | `<div aria-live="polite" aria-atomic="false">` — 개별 toast 추가 시 AT 읽기 |
| 오류 토스트 | `role="alert"` 추가 — assertive로 즉시 읽기 |
| 닫기 버튼 | `<button aria-label="알림 닫기">` |
| 상태 아이콘 | `aria-hidden="true"` — 시각 전용 |
| 키보드 — `Tab` | 닫기 버튼·액션 링크로 포커스 이동 |
| 키보드 — `Enter` · `Space` | 닫기 버튼 활성화 — `<button>` 기본 동작 |
| 키보드 — `Escape` | 최근 토스트 닫기 (JS 처리) |

```js
// 최근 toast Escape 닫기
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Escape') return;
  var toasts = stack.querySelectorAll('.toast--visible');
  if (toasts.length) dismissToast(toasts[toasts.length - 1]);
});

// toast-stack 상단에 prepend → aria-live="polite"가 AT에 내용 알림
// insertBefore(firstChild) 사용 — appendChild는 맨 아래 추가이므로 stacking 방향과 불일치
function showToast(style, message, title) {
  var toast = makeToast(style, message, title);
  if (style === 'error') toast.setAttribute('role', 'alert'); // assertive
  stack.insertBefore(toast, stack.firstChild);
}
```

**색상만으로 상태를 구분하지 않는다** — info(`icon-info` 원+i), success(`icon-circle-check` 원+✓), caution(`icon-triangle-alert` 삼각+!), error(`icon-circle-x` 원+✕) 각각 도형이 달라 색맹 사용자도 모양으로 구별할 수 있다.

---

## Do / Don't

> ✅ DO — `aria-live="polite"` 컨테이너에 toast 추가
> AT가 현재 읽기를 마친 후 내용을 안내함

> ❌ DON'T — 개별 toast에 `aria-live` 직접 선언
> DOM에 이미 있는 요소에 동적으로 `aria-live`를 추가해도 AT가 인식하지 못함

> ✅ DO — 오류 toast에 `role="alert"` 추가
> 즉각적인 AT 읽기 — 작업 실패는 지연 없이 전달해야 함

> ❌ DON'T — 모든 toast에 `role="alert"` 적용
> info·success 알림을 assertive로 설정하면 사용자의 작업 흐름을 방해함

> ✅ DO — 메시지를 1–2문장으로 유지하고 추가 정보는 action 링크로 연결
> `<div class="toast__action"><a class="link toast__action-link" href="#">내역 보기</a></div>`

> ❌ DON'T — Toast에 폼·입력 요소 삽입
> 자동 소멸 타이머가 있어 입력 전 사라질 수 있음 — Modal 사용

> ✅ DO — `.toast-stack`에 `pointer-events: none` 유지
> 스택 영역이 뒤쪽 콘텐츠의 클릭을 막지 않도록 함

> ❌ DON'T — Accordion·Alert 대신 Toast로 지속 메시지 표시
> Toast는 일시적 피드백 전용 — 항상 표시되어야 하는 메시지는 Alert 사용

> ✅ DO — action 링크는 항상 유효한 목적지로만 사용
> 이동 불가 상황에서는 `toast__action` 슬롯 자체를 렌더링하지 않는다

> ❌ DON'T — `toast__action-link`에 `disabled` 속성 사용
> `<a>` 요소의 disabled는 표준이 아님. 비활성화 필요 시 슬롯 제거로 처리한다
