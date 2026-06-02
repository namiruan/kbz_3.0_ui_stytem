---
file: components/molecules/toast.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/motion.md, tokens/stroke.md, tokens/radius.md, tokens/icon.md, tokens/elevation.md, tokens/typography.md, components/atoms/icon.md, components/atoms/icon-button.md, components/atoms/link.md
---

# Toast

## 개요

작업 완료·오류·경고 등 일시적 피드백을 화면 우하단에 표시하는 비모달 알림. 기본 4초 후 자동 소멸하거나 수동 닫기로 제거된다. 사용자의 작업 흐름을 중단하지 않으면서 중요한 상태 변화를 전달한다.

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
| JS `showToast()` 호출 | `.toast-stack`에 `.toast` 추가 → `toast--visible` 적용 → 타이머 시작 |
| 타이머 만료 (기본 4000 ms) | `toast--visible` 제거 + `toast--hidden` 적용 → animationend 후 DOM 제거 |
| 닫기 버튼 클릭 | 타이머 취소 + `toast--hidden` 적용 → DOM 제거 |
| 포인터가 `.toast-stack` 진입 | 타이머 일시정지 |
| 포인터가 `.toast-stack` 이탈 | 잔여 시간으로 타이머 재개 |
| `Escape` | 가장 최근 토스트 닫기 |

:::preview
<div style="position:relative;min-height:300px;background:var(--color-surface-subtle);border-radius:var(--radius-md);padding:var(--space-inset-xl)">

  <p style="font-size:var(--font-size-sm);color:var(--color-text-subtle);margin:0 0 var(--space-gap-sm)">버튼을 눌러 토스트를 추가하세요. 4초 후 자동 소멸합니다.</p>

  <div style="display:flex;gap:var(--space-gap-sm);flex-wrap:wrap">
    <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-info">Info</button>
    <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-success">Success</button>
    <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-caution">Caution</button>
    <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-error">Error</button>
    <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-action">With action</button>
    <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-title">With title</button>
  </div>

  <div id="demo-toast-stack" aria-live="polite" aria-atomic="false"
    style="position:absolute;bottom:var(--space-gap-lg);right:var(--space-gap-lg);display:flex;flex-direction:column;gap:var(--space-gap-sm);width:320px;max-width:calc(100% - 32px)">
  </div>

</div>
<script>
(function() {
  var ICONS = { info: 'icon-help', success: 'icon-check', caution: 'icon-warning', error: 'icon-warning' };
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
      '<div class="toast__body">' +
        (title ? '<p class="toast__title">' + title + '</p>' : '') +
        '<p class="toast__message">' + message + '</p>' +
        (actionLabel ? '<div class="toast__action"><a class="toast__action-link" href="#">' + actionLabel + '</a></div>' : '') +
      '</div>' +
      '<button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>';

    if (style === 'error') toast.setAttribute('role', 'alert');

    function dismiss() {
      clearTimeout(toast._timer);
      toast.classList.remove('toast--visible');
      toast.classList.add('toast--hidden');
      toast.addEventListener('animationend', function() { toast.remove(); }, { once: true });
    }
    toast.querySelector('.toast__close').addEventListener('click', dismiss);
    toast._timer = setTimeout(dismiss, 4000);
    return toast;
  }

  function addToast(style, title, message, action) {
    var items = stack.querySelectorAll('.toast');
    if (items.length >= 3) items[0].remove();
    stack.appendChild(makeToast(style, title, message, action));
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
      t._timer = setTimeout(function() {
        t.classList.remove('toast--visible');
        t.classList.add('toast--hidden');
        t.addEventListener('animationend', function() { t.remove(); }, { once: true });
      }, 1500);
    });
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.toast — 개별 알림 카드. elevation-toast 클래스(utilities/elevation.css)를 추가해 shadow·z-index 적용.
  toast--visible / toast--hidden 클래스로 진입·퇴장 animation 제어.
- icon = span.icon--md.toast__icon[aria-hidden="true"] — 상태 아이콘(20px). color CSS로 SVG fill(currentColor) 전달.
  현재 sprite에 전용 상태 아이콘 없음 — icon-help(info), icon-check(success), icon-warning(caution·error) 임시 사용.
  프로덕션에서는 icon-info, icon-circle-check, icon-triangle-alert, icon-circle-x를 sprite에 추가 권장.
- body = div.toast__body — flex column. title + message + action 포함.
  - title = p.toast__title — (선택) 알림 제목. semibold.
  - message = p.toast__message — 본문. subtle color.
  - action = div.toast__action — (선택) Link 또는 버튼. 슬롯 역할.
- close = button.icon-on--sm.toast__close[aria-label="알림 닫기"] — 닫기 버튼. icon-on--sm의 neutral hover 그대로 사용.
- stack = div.toast-stack[aria-live="polite"][aria-atomic="false"] — 전역 컨테이너. position:fixed 우하단.
  개별 toast는 appendChild로 추가, animationend 후 remove.
- style variant:
  - info (기본, 클래스 없음): border-left brand 색, icon brand 색
  - toast--success: border-left success 색, icon success 색
  - toast--caution: border-left caution 색, icon caution 색
  - toast--error: border-left error 색, icon error 색. role="alert" 추가(즉시 음성 안내).
- animation:
  - toast--visible: toast-enter — translateY(space-gap-md) → 0 + fade in (easing-enter)
  - toast--hidden:  toast-exit  — fade out + translateY(space-gap-md) (easing-exit)
  animationend 이벤트에서 DOM remove.
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">info (기본)</span>
  <div data-component class="toast elevation-toast">
    <span class="icon--md toast__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-help"/></svg></span>
    <div class="toast__body">
      <p class="toast__message">시스템 업데이트가 예정되어 있습니다.</p>
    </div>
    <button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">success</span>
  <div data-component class="toast elevation-toast toast--success">
    <span class="icon--md toast__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span>
    <div class="toast__body">
      <p class="toast__message">프로젝트가 성공적으로 저장되었습니다.</p>
    </div>
    <button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">caution</span>
  <div data-component class="toast elevation-toast toast--caution">
    <span class="icon--md toast__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-warning"/></svg></span>
    <div class="toast__body">
      <p class="toast__message">변경 사항을 저장하지 않으면 데이터가 손실됩니다.</p>
    </div>
    <button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div data-component class="toast elevation-toast toast--error" role="alert">
    <span class="icon--md toast__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-warning"/></svg></span>
    <div class="toast__body">
      <p class="toast__message">요청을 처리할 수 없습니다. 다시 시도해 주세요.</p>
    </div>
    <button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">title + action</span>
  <div data-component class="toast elevation-toast toast--error" role="alert">
    <span class="icon--md toast__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-warning"/></svg></span>
    <div class="toast__body">
      <p class="toast__title">저장 실패</p>
      <p class="toast__message">요청을 처리할 수 없습니다. 다시 시도해 주세요.</p>
      <div class="toast__action"><a class="toast__action-link" href="#">오류 내역 보기</a></div>
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
   utilities/elevation.css → .elevation-toast
   box-shadow: var(--shadow-xl); z-index: var(--z-toast)
   .toast-stack에 z-index, .toast에 box-shadow를 분리 적용하므로
   elevation-toast를 직접 클래스로 추가하거나 아래처럼 선언.
─────────────────────────────────────────────── */

/* ── Stack ── */
/* position:fixed 전역 레이어. JS가 .toast를 appendChild / animationend 후 remove */
.toast-stack {
  position: fixed;
  bottom: var(--space-gap-2xl);
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
  border: var(--stroke-sm) solid var(--color-border-brand); /* info default */
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  pointer-events: auto;
}

/* ── Animation ── */
@keyframes toast-enter {
  from { opacity: 0; transform: translateY(var(--space-gap-md)); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes toast-exit {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(var(--space-gap-md)); }
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
.toast__body {
  flex: 1;
  min-width: 0; /* flex 컨테이너 안 텍스트 말줄임 보장 */
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-2xs);
}
.toast__title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-brand); /* info default */
  line-height: var(--line-height-ui);
  margin: 0;
}
.toast__message {
  font-size: var(--font-size-sm);
  color: var(--color-text-brand); /* info default */
  line-height: var(--line-height-reading);
  margin: 0;
}

/* ── Action ── */
.toast__action {
  margin-top: var(--space-gap-xs);
}
.toast__action-link {
  font-size: var(--font-size-sm);
  color: var(--color-text-brand);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.toast__action-link:hover {
  color: var(--color-text-brand-vivid);
}

/* ── Close ── */
/* button.icon-on--sm (utilities/icon.css) — hover: neutral background 자동 적용 */
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
  border-color: var(--color-border-success);
}
.toast--success .toast__icon,
.toast--success .toast__title,
.toast--success .toast__message {
  color: var(--color-text-success);
}

/* --color-border-caution 미정의 — --color-text-caution(orange-600) 임시 참조 */
.toast--caution {
  background: var(--color-surface-caution-subtle);
  border-color: var(--color-text-caution);
}
.toast--caution .toast__icon,
.toast--caution .toast__title,
.toast--caution .toast__message {
  color: var(--color-text-caution);
}

.toast--error {
  background: var(--color-surface-error-subtle);
  border-color: var(--color-border-error);
}
.toast--error .toast__icon,
.toast--error .toast__title,
.toast--error .toast__message {
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

// toast-stack에 toast 추가 → aria-live="polite"가 AT에 내용 알림
function showToast(style, message, title) {
  var toast = makeToast(style, message, title);
  if (style === 'error') toast.setAttribute('role', 'alert'); // assertive
  stack.appendChild(toast);
}
```

**색상만으로 상태를 구분하지 않는다** — info·success·caution·error가 각각 다른 아이콘을 사용해야 한다. 현재 sprite에는 전용 상태 아이콘이 없어 임시 매핑 중이므로, 가능한 한 빨리 `icon-info`, `icon-circle-check`, `icon-triangle-alert`, `icon-circle-x`를 sprite에 추가할 것을 권장한다.

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
> `<div class="toast__action"><a class="toast__action-link" href="#">내역 보기</a></div>`

> ❌ DON'T — Toast에 폼·입력 요소 삽입
> 자동 소멸 타이머가 있어 입력 전 사라질 수 있음 — Modal 사용

> ✅ DO — `.toast-stack`에 `pointer-events: none` 유지
> 스택 영역이 뒤쪽 콘텐츠의 클릭을 막지 않도록 함

> ❌ DON'T — Accordion·Alert 대신 Toast로 지속 메시지 표시
> Toast는 일시적 피드백 전용 — 항상 표시되어야 하는 메시지는 Alert 사용
