---
file: components/molecules/alert.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/shadow.md, tokens/z-index.md, tokens/typography.md, components/atoms/button.md, components/atoms/icon-button.md, components/atoms/checkbox.md, components/atoms/link.md
---

# Alert

## 개요

사용자가 현재 작업을 계속하기 전에 확인·취소 선택을 요구하는 확인 다이얼로그. 오버레이 위에 표시되며 포커스를 가두어 배경 콘텐츠와 상호작용을 차단한다.

Toast와의 차이 — Toast는 자동 소멸하는 피드백 알림. Alert는 사용자의 명시적 응답(확인 또는 취소)이 있을 때까지 유지된다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| intent | default (클래스 없음) · danger → `alert--danger` | default |
| body | description · list · change · option (선택, 조합 가능) | description |

`alert--danger`: 되돌릴 수 없는 삭제·해제 동작. 제목 색이 `--color-text-error`로 변경된다.

---

## 사용 지침

| 상황 | 권장 |
|------|------|
| 데이터 삭제·영구 제거 | `alert--danger` + `btn--danger` CTA |
| 위치 이동·변경 확인 | default + `btn--secondary` CTA |
| 저장·게시 확인 | default + `btn--primary` CTA |
| 항상 표시되어야 하는 경고 | Toast 대신 인라인 Banner 사용 |
| 폼·복잡한 콘텐츠 입력 | Modal (Organism) 사용 |

**제약**
- 취소 경로는 항상 제공한다 (`btn--ghost` 또는 X 버튼). 유저가 되돌아갈 방법이 없으면 안 된다.
- 버튼은 최대 2개. 3개 이상은 선택을 과부하 시킨다.
- 메시지는 1–3문장으로 제한한다. 더 긴 설명은 change 슬롯 또는 액션 링크로 처리한다.

---

## 동작

| 이벤트 | 동작 |
|--------|------|
| Alert 열기 | `.alert-overlay` 렌더 → `.alert` 포커스 진입 → 첫 번째 버튼에 포커스 |
| `Tab` / `Shift+Tab` | `.alert` 내부 포커스 순환 (포커스 트랩) |
| `Escape` | 취소 경로 실행 (Alert 닫기) |
| 오버레이 클릭 | 취소 경로 실행 (선택적 — 파괴적 액션에서는 비활성화 권장) |
| CTA 버튼 클릭 | 동작 실행 + Alert 닫기 |
| 취소 버튼 / X 클릭 | 아무 동작 없이 Alert 닫기 |

:::preview
<div style="min-height:320px;background:var(--color-surface-subtle);border-radius:var(--radius-md);padding:var(--space-inset-xl);display:flex;flex-direction:column;justify-content:flex-end">

  <div style="display:flex;flex-direction:column;gap:var(--space-gap-sm);flex-wrap:wrap">
    <p style="font-size:var(--font-size-sm);color:var(--color-text-subtle);margin:0 0 var(--space-gap-xs)">버튼을 눌러 Alert를 확인하세요.</p>
    <div style="display:flex;gap:var(--space-gap-sm);flex-wrap:wrap">
      <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-danger">Danger</button>
      <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-default">Default</button>
      <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-brand">Brand CTA</button>
      <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-change">With change</button>
      <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-option">With option</button>
      <button class="btn btn--primary btn--sm text-button-sm" id="demo-btn-list">With list</button>
    </div>
  </div>

</div>
<script>
(function() {
  function makeAlert(opts) {
    var overlay = document.createElement('div');
    overlay.className = 'alert-overlay';
    overlay.setAttribute('role', 'presentation');

    var alert = document.createElement('div');
    alert.className = 'alert' + (opts.danger ? ' alert--danger' : '');
    alert.setAttribute('role', 'alertdialog');
    alert.setAttribute('aria-modal', 'true');
    alert.setAttribute('aria-labelledby', 'alert-title-' + Date.now());

    var titleId = 'alert-title-' + Date.now();
    alert.querySelector && alert.setAttribute('aria-labelledby', titleId);

    var bodyHtml = '';
    if (opts.description) {
      bodyHtml += '<p class="alert__description">' + opts.description + '</p>';
    }
    if (opts.list) {
      bodyHtml += '<ul class="alert__list">' + opts.list.map(function(i){ return '<li>' + i + '</li>'; }).join('') + '</ul>';
    }
    if (opts.change) {
      bodyHtml += '<div class="alert__change">' +
        opts.change.map(function(row) {
          return '<div class="alert__change-row' + (row.after ? ' alert__change-row--after' : '') + '">' +
            '<span class="alert__change-label">' + row.label + '</span>' +
            '<span class="alert__change-value">' + row.value + '</span>' +
          '</div>';
        }).join('') +
      '</div>';
    }
    if (opts.option) {
      bodyHtml += '<label class="checkbox alert__option"><input class="checkbox__input" type="checkbox"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">' + opts.option + '</span></label>';
    }

    alert.innerHTML =
      '<div class="alert__header">' +
        '<p class="text-card-title alert__title" id="' + titleId + '">' + opts.title + '</p>' +
        '<button class="icon-on--sm alert__close" type="button" aria-label="닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>' +
      '</div>' +
      '<div class="alert__body">' + bodyHtml + '</div>' +
      '<div class="alert__footer">' +
        '<button class="btn btn--ghost btn--md" type="button">' + (opts.cancelLabel || '취소하기') + '</button>' +
        '<button class="btn ' + (opts.ctaClass || 'btn--secondary') + ' btn--md" type="button">' + (opts.ctaLabel || '확인') + '</button>' +
      '</div>';

    function close() {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') {
        var focusable = alert.querySelectorAll('button, input, a');
        var first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    alert.querySelector('.alert__close').addEventListener('click', close);
    alert.querySelectorAll('.alert__footer .btn')[0].addEventListener('click', close);
    alert.querySelectorAll('.alert__footer .btn')[1].addEventListener('click', close);
    if (!opts.danger) overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onKey);

    overlay.appendChild(alert);
    document.body.appendChild(overlay);
    alert.querySelector('.alert__footer .btn:last-child').focus();
  }

  stage.querySelector('#demo-btn-danger').addEventListener('click', function() {
    makeAlert({ title: '선택한 3건의 데이터가 삭제됩니다', description: '한 번 삭제한 데이터는 복구할 수 없어요. 계속 진행할까요?', danger: true, ctaLabel: '삭제하기', ctaClass: 'btn--danger' });
  });
  stage.querySelector('#demo-btn-default').addEventListener('click', function() {
    makeAlert({ title: '선택한 항목이 초기화됩니다', description: '화면을 이동하면 선택한 항목이 해제돼요. 페이지를 이동할까요?', ctaLabel: '이동하기', ctaClass: 'btn--secondary' });
  });
  stage.querySelector('#demo-btn-brand').addEventListener('click', function() {
    makeAlert({ title: '수정한 내용이 있습니다!', description: '이대로 나가면 수정한 내용이 모두 사라져요. 저장하고 나갈까요?', cancelLabel: '저장 안 함', ctaLabel: '저장하기', ctaClass: 'btn--primary' });
  });
  stage.querySelector('#demo-btn-change').addEventListener('click', function() {
    makeAlert({ title: '기계설비공사팀의 부서장이 변경됩니다', change: [{ label: '변경 전', value: '미지정' }, { label: '변경 후', value: '박김영숙 사원(사원)', after: true }], ctaLabel: '변경하기', ctaClass: 'btn--secondary' });
  });
  stage.querySelector('#demo-btn-option').addEventListener('click', function() {
    makeAlert({ title: '검색 결과가 초기화됩니다', description: '화면을 이동하면 검색 결과가 초기화돼요. 페이지를 이동할까요?', option: '다시 묻지 않기', ctaLabel: '이동하기', ctaClass: 'btn--secondary' });
  });
  stage.querySelector('#demo-btn-list').addEventListener('click', function() {
    makeAlert({ title: '근로자 N명이 포함된 조직을 삭제합니다', list: ['하위 조직도 전부 삭제됩니다.', '조직에 포함된 근로자는 무소속으로 변경됩니다.'], danger: true, ctaLabel: '삭제하기', ctaClass: 'btn--danger' });
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- overlay = div.alert-overlay — position:fixed; inset:0. 배경 스크림 + 중앙 정렬 컨테이너.
  파괴적 액션(alert--danger)에서는 오버레이 클릭 닫기를 비활성화한다.
- root = div.alert[role="alertdialog"][aria-modal="true"][aria-labelledby="<title-id>"]
  포커스 트랩 필수 — Tab/Shift+Tab을 alert 내부에서 순환. Escape는 취소 경로 실행.
  intent variant:
  - (기본, 클래스 없음): 제목 --color-text-body
  - alert--danger: 제목 --color-text-error. 되돌릴 수 없는 삭제·해제 전용.
- header = div.alert__header — title + close button 가로 배치.
  - title = p.text-card-title.alert__title[id] — 다이얼로그 제목. aria-labelledby 대상.
  - close = button.icon-on--sm.alert__close[aria-label="닫기"]
- body = div.alert__body — 선택 슬롯 조합:
  - description = p.alert__description — 본문 설명 (대부분 포함)
  - list = ul.alert__list > li — 불릿 목록 (복수 영향 항목 나열)
  - change = div.alert__change — before/after 비교. alert__change-row--after에 brand 색 강조.
  - option = label.checkbox.alert__option — "다시 묻지 않기" 등 체크박스 옵션
- footer = div.alert__footer — 버튼 조합 (오른쪽 정렬):
  - 취소: btn--ghost (흐름 이탈 — 시각적 무게 최소화)
  - CTA: btn--danger (삭제) · btn--secondary (이동·변경) · btn--primary (저장·게시)
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">default</span>
  <div data-component class="alert" role="alertdialog" aria-modal="true" aria-labelledby="anat-title-1">
    <div class="alert__header">
      <p class="text-card-title alert__title" id="anat-title-1">선택한 항목이 초기화됩니다</p>
      <button class="icon-on--sm alert__close" type="button" aria-label="닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    </div>
    <div class="alert__body">
      <p class="alert__description">화면을 이동하면 선택한 항목이 해제돼요. 페이지를 이동할까요?</p>
    </div>
    <div class="alert__footer">
      <button class="btn btn--ghost btn--md" type="button">취소하기</button>
      <button class="btn btn--secondary btn--md" type="button">이동하기</button>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">danger</span>
  <div data-component class="alert alert--danger" role="alertdialog" aria-modal="true" aria-labelledby="anat-title-2">
    <div class="alert__header">
      <p class="text-card-title alert__title" id="anat-title-2">선택한 N건의 데이터가 삭제됩니다</p>
      <button class="icon-on--sm alert__close" type="button" aria-label="닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    </div>
    <div class="alert__body">
      <p class="alert__description">한 번 삭제한 데이터는 복구할 수 없어요. 계속 진행할까요?</p>
    </div>
    <div class="alert__footer">
      <button class="btn btn--ghost btn--md" type="button">취소하기</button>
      <button class="btn btn--danger btn--md" type="button">삭제하기</button>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">with list</span>
  <div data-component class="alert alert--danger" role="alertdialog" aria-modal="true" aria-labelledby="anat-title-3">
    <div class="alert__header">
      <p class="text-card-title alert__title" id="anat-title-3">근로자 N명이 포함된 조직을 삭제합니다</p>
      <button class="icon-on--sm alert__close" type="button" aria-label="닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    </div>
    <div class="alert__body">
      <ul class="alert__list">
        <li>하위 조직도 전부 삭제됩니다.</li>
        <li>조직에 포함된 근로자는 무소속으로 변경됩니다.</li>
      </ul>
    </div>
    <div class="alert__footer">
      <button class="btn btn--ghost btn--md" type="button">취소하기</button>
      <button class="btn btn--danger btn--md" type="button">삭제하기</button>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">with change</span>
  <div data-component class="alert" role="alertdialog" aria-modal="true" aria-labelledby="anat-title-4">
    <div class="alert__header">
      <p class="text-card-title alert__title" id="anat-title-4">기계설비공사팀의 부서장이 변경됩니다</p>
      <button class="icon-on--sm alert__close" type="button" aria-label="닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    </div>
    <div class="alert__body">
      <div class="alert__change">
        <div class="alert__change-row">
          <span class="alert__change-label">변경 전</span>
          <span class="alert__change-value">미지정</span>
        </div>
        <div class="alert__change-row alert__change-row--after">
          <span class="alert__change-label">변경 후</span>
          <span class="alert__change-value">박김영숙 사원(사원)</span>
        </div>
      </div>
    </div>
    <div class="alert__footer">
      <button class="btn btn--ghost btn--md" type="button">취소하기</button>
      <button class="btn btn--secondary btn--md" type="button">변경하기</button>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">with option</span>
  <div data-component class="alert" role="alertdialog" aria-modal="true" aria-labelledby="anat-title-5">
    <div class="alert__header">
      <p class="text-card-title alert__title" id="anat-title-5">검색 결과가 초기화됩니다</p>
      <button class="icon-on--sm alert__close" type="button" aria-label="닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>
    </div>
    <div class="alert__body">
      <p class="alert__description">화면을 이동하면 검색 결과가 초기화돼요. 페이지를 이동할까요?</p>
      <label class="checkbox alert__option">
        <input class="checkbox__input" type="checkbox">
        <span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span>
        <span class="checkbox__label">다시 묻지 않기</span>
      </label>
    </div>
    <div class="alert__footer">
      <button class="btn btn--ghost btn--md" type="button">취소하기</button>
      <button class="btn btn--secondary btn--md" type="button">이동하기</button>
    </div>
  </div>
</div>

</div>
:::

---

## CSS

```css
/* ── Overlay ── */
/* position:fixed 전체 화면 스크림. Alert 카드를 뷰포트 중앙에 배치 */
.alert-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-surface-dim); /* 모달·드로어 뒤 스크림 레이어 */
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-gap-2xl);
}

/* ── Alert card ── */
.alert {
  width: 400px;
  max-width: 100%;
  background: var(--color-surface-base);
  border: var(--stroke-sm) solid var(--color-border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-lg);
  padding: var(--space-inset-3xl);
}

/* ── Header ── */
.alert__header {
  display: flex;
  align-items: flex-start;
  gap: var(--space-gap-sm);
}
/* .text-card-title(font-size-h4 + line-height-ui + font-weight-heading) 베이스 사용 */
.alert__title {
  flex: 1;
  color: var(--color-text-body);
  margin: 0;
}
/* button.icon-on--sm (utilities/icon.css) — hover/active/focus 상태 자동 적용 */
/* margin-top 음수: icon-on--sm의 padding(space-inset-xs=2px)만큼 위로 당겨 타이틀 첫 줄과 시각 정렬 */
.alert__close {
  flex-shrink: 0;
  margin-top: calc(-1 * var(--space-inset-xs));
  color: var(--color-text-subtle);
}
.alert__close:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
  border-radius: var(--icon-radius-xs);
}

/* ── Body ── */
.alert__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-sm);
}
.alert__description {
  font-size: var(--font-size-base);
  line-height: var(--line-height-reading);
  color: var(--color-text-body);
  margin: 0;
}
.alert__list {
  margin: 0;
  padding-left: var(--space-gap-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-2xs);
  font-size: var(--font-size-base);
  line-height: var(--line-height-reading);
  color: var(--color-text-body);
}

/* ── Change (before/after) ── */
.alert__change {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-xs);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
}
.alert__change-row {
  display: flex;
  gap: var(--space-gap-sm);
}
.alert__change-label {
  color: var(--color-text-subtle);
  min-width: 3.5em; /* "변경 전/후" 라벨 폭 고정 — 값 열 정렬용 */
  flex-shrink: 0;
}
.alert__change-value {
  color: var(--color-text-body);
}
.alert__change-row--after .alert__change-value {
  color: var(--color-text-brand); /* 변경 후 값 강조 */
}

/* ── Option ── */
/* label.checkbox(components/atoms/checkbox.md) 베이스 사용 */
.alert__option {
  margin-top: var(--space-gap-xs);
}

/* ── Footer ── */
.alert__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-gap-sm);
}

/* ── Variant: danger ── */
/* 되돌릴 수 없는 파괴적 액션 — 제목만 error 색으로 변경 */
.alert--danger .alert__title {
  color: var(--color-text-error);
}
```

---

## 접근성

포커스 트랩 다이얼로그 패턴.

| 상황 | 마크업 |
|------|--------|
| Alert 카드 | `role="alertdialog"` + `aria-modal="true"` + `aria-labelledby="<title-id>"` |
| 오버레이 배경 | `role="presentation"` — AT가 배경 콘텐츠 읽지 않도록 |
| 닫기 버튼 | `<button aria-label="닫기">` |
| 키보드 — `Tab` / `Shift+Tab` | Alert 내부 포커스 순환 (포커스 트랩) |
| 키보드 — `Enter` · `Space` | 포커스된 버튼 활성화 |
| 키보드 — `Escape` | 취소 경로 실행 |
| Alert 열릴 때 | CTA 버튼(마지막 버튼)에 포커스 — 실수로 Enter 누르지 않도록 |
| Alert 닫힐 때 | Alert를 열었던 트리거 버튼으로 포커스 복귀 |

```js
// 포커스 트랩 패턴
function trapFocus(alertEl) {
  var focusable = alertEl.querySelectorAll('button, input, a[href]');
  var first = focusable[0], last = focusable[focusable.length - 1];

  alertEl.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeAlert(); return; }
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

// Alert 닫힐 때 트리거 버튼으로 포커스 복귀
function closeAlert(triggerEl) {
  overlay.remove();
  if (triggerEl) triggerEl.focus();
}
```

---

## Do / Don't

> ✅ DO — `role="alertdialog"` + `aria-modal="true"` + `aria-labelledby` 3개 세트
> AT가 다이얼로그 제목을 읽고 모달 맥락을 전달함

> ❌ DON'T — 취소 경로 없이 CTA만 제공
> 사용자가 실수로 Alert를 열었을 때 벗어날 방법이 없음 — 항상 취소 버튼 또는 X 버튼 포함

> ✅ DO — 파괴적 액션에서 오버레이 클릭 닫기 비활성화
> 실수로 오버레이를 클릭했을 때 삭제가 취소되어야 함 — 의도적 취소 버튼만 허용

> ❌ DON'T — 모든 Alert에 `alert--danger` 적용
> danger는 되돌릴 수 없는 삭제·해제 전용. 이동·변경·저장은 default 사용

> ✅ DO — CTA 버튼에 포커스 초기 진입
> Alert가 열릴 때 마지막 버튼(CTA)에 포커스 — 실수로 Enter를 눌러 삭제하지 않도록

> ❌ DON'T — Alert 안에 폼·긴 콘텐츠 삽입
> 스크롤이 필요하거나 입력 항목이 3개 이상이면 Modal (Organism) 사용

> ✅ DO — `alert__change` 슬롯으로 변경 전/후 명확히 표시
> `<div class="alert__change"><div class="alert__change-row">변경 전 …</div><div class="alert__change-row alert__change-row--after">변경 후 …</div></div>`

> ❌ DON'T — `btn--danger` CTA를 danger variant 없이 사용
> `alert--danger`(빨간 제목)과 `btn--danger`(빨간 버튼)은 항상 함께 사용. 어느 한쪽만 적용하면 심각도 신호가 일관되지 않음
