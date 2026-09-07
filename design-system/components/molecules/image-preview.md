---
file: components/molecules/image-preview.md
version: 0.4.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/radius.md, tokens/elevation.md, tokens/motion.md, tokens/typography.md, components/atoms/button.md
---

# ImagePreview

## 개요

이미지를 원본 비율로 확대하여 보여주는 라이트박스 모달. 상단 바에 파일명·다운로드·삭제·닫기가 배치되고, 하단 툴바에 축소·확대 버튼이 제공된다. FileUpload 파일 카드 썸네일 클릭 시 트리거되며, 독립적으로도 사용 가능하다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| 상태 | hidden (기본, 클래스 없음) · visible → `image-preview--visible` | hidden |

`image-preview--visible`: JS로 추가/제거. `opacity`·`pointer-events` 전환으로 등장/퇴장 처리.

---

## 사용 지침

| 상황 | 권장 |
|------|------|
| 썸네일 클릭으로 원본 확인 | ImagePreview 사용 |
| 이미지 편집·크롭이 필요한 경우 | 별도 편집 모달 사용 — ImagePreview는 보기 전용 |
| 여러 이미지 슬라이드 탐색 | 네비게이션 버튼(이전/다음)을 추가 확장하여 사용 |

**FileUpload 연동**

FileUpload `__preview` 클릭 시 파일명과 src를 함께 전달하여 트리거한다.

> ⚠️ **속성 하나가 두 가지를 뜻한다.** 보통 요소에서 `data-image-preview`는 **"이걸 누르면 열린다"**(트리거)이지만, `.file-upload`에서는 **"이 라이트박스와 연동한다"**(설정값)이다. 그래서 트리거 수집에서 `.file-upload`를 제외한다 — 안 그러면 업로드 영역 전체가 트리거가 되어 **csv·html처럼 볼 것이 없는 카드를 눌러도** 라이트박스가 열린다. 여는 판단은 카드마다 `initFileUpload`가 한다(이미지일 때만).

```js
previewEl.addEventListener('click', function() {
  imagePreview.open(thumbEl.src, file.name);
});
```

**제약**
- 모달 최대 너비·높이는 뷰포트의 90%로 제한. 이미지 원본 비율은 항상 유지한다.
- 스크림 클릭 또는 `Escape` 키로 닫을 수 있어야 한다.
- 열린 동안 스크롤은 잠근다 (`body` `overflow: hidden`).
- 확대·축소 범위: 50% ~ 300%.

---

## 동작

| 이벤트 | 동작 |
|--------|------|
| 썸네일 클릭 | `image-preview--visible` 추가 → 모달 등장. 초기 배율 100% |
| 스크림 클릭 | `image-preview--visible` 제거 → 닫힘 |
| 닫기(×) 버튼 클릭 | `image-preview--visible` 제거 → 닫힘 |
| `Escape` | `image-preview--visible` 제거 → 닫힘 |
| 확대(+) 버튼 클릭 | 이미지 배율 25%씩 증가. 최대 300% |
| 축소(−) 버튼 클릭 | 이미지 배율 25%씩 감소. 최소 50% |
| 다운로드 버튼 클릭 | 해당 파일 다운로드 |
| 삭제 버튼 클릭 | 모달 닫힘 + 파일 카드 제거 |

**JS 위임** — 위 동작은 `initImagePreview(container)`가 처리한다. 각 `.image-preview`에 `.open(src, name, opts)`·`.close()`를 부여하고, `[data-image-preview="<preview-id>"]` 요소 클릭으로 선언적으로 열 수 있다. `opts = { trigger, onDelete }` — `trigger`는 닫을 때 포커스 복귀 대상, `onDelete`는 삭제 버튼 콜백(예: FileUpload 카드 제거). 프로토타입에서 직접 구현하지 말고 이 함수에 위임한다.

<!-- AI: initImagePreview(container) — container 안 .image-preview에 .open()/.close() API 부여 + [data-image-preview] 선언적 트리거 연결. FileUpload 등 외부에서 previewEl.open(src, name, {trigger, onDelete})로 호출. -->

```js init
/* ImagePreview — 라이트박스: 열기/닫기, 줌(50~300%, 25% 단위), 다운로드, 삭제, Escape, 포커스 복귀.
   각 .image-preview에 .open(src, name, opts)·.close()를 부여한다.
   opts = { trigger: 닫을 때 포커스 복귀 대상, onDelete: 삭제 버튼 콜백(예: 파일 카드 제거) }.
   선언적 트리거: [data-image-preview="<preview-id>"] 클릭 시 해당 프리뷰를 그 요소의 <img> src로 연다.
   프로토타입에서 직접 구현하지 말고 이 함수에 위임한다.
   버튼 셀렉터: topbar-actions의 순서(다운로드·삭제·닫기) + toolbar의 aria-label(축소·확대). 마크업 순서를 지킬 것. */
function initImagePreview(container) {
  container.querySelectorAll('.image-preview').forEach(function(el) {
    if (el.dataset.initImagePreview) return;
    el.dataset.initImagePreview = '1';
    var img       = el.querySelector('.image-preview__img');
    var scrim     = el.querySelector('.image-preview__scrim');
    var filename  = el.querySelector('.image-preview__filename');
    var zoomLabel = el.querySelector('.image-preview__zoom-label');
    var topBtns   = el.querySelectorAll('.image-preview__topbar-actions button');
    var download  = topBtns[0], delBtn = topBtns[1], closeBtn = topBtns[2];
    var zoomOut   = el.querySelector('.image-preview__toolbar [aria-label="축소"]');
    var zoomIn    = el.querySelector('.image-preview__toolbar [aria-label="확대"]');
    var scale = 1, baseW = 0, baseH = 0, MIN = 0.5, MAX = 3, STEP = 0.25, GAP = 96;
    var triggerEl = null, onDelete = null;

    function calcBase() {
      if (!img) return;
      var maxW = window.innerWidth * 0.9, maxH = (window.innerHeight - GAP) * 0.9;
      var r = img.naturalWidth / img.naturalHeight;
      if (img.naturalWidth / maxW > img.naturalHeight / maxH) { baseW = Math.min(img.naturalWidth, maxW); baseH = baseW / r; }
      else { baseH = Math.min(img.naturalHeight, maxH); baseW = baseH * r; }
    }
    function setDisabled(btn, off) {
      if (!btn) return;
      btn.disabled = off;
      btn.classList.toggle('btn--disabled', off);
      if (off) { btn.setAttribute('aria-disabled', 'true'); btn.setAttribute('tabindex', '-1'); }
      else { btn.removeAttribute('aria-disabled'); btn.removeAttribute('tabindex'); }
    }
    function updateZoom() {
      if (img) { img.style.width = Math.round(baseW * scale) + 'px'; img.style.height = Math.round(baseH * scale) + 'px'; }
      if (zoomLabel) zoomLabel.textContent = Math.round(scale * 100) + '%';
      setDisabled(zoomIn, scale >= MAX);
      setDisabled(zoomOut, scale <= MIN);
    }
    function close() {
      el.classList.remove('image-preview--visible');
      document.body.style.overflow = '';
      var t = triggerEl; triggerEl = null; onDelete = null;
      if (t) t.focus();
    }
    el.open = function(src, name, opts) {
      opts = opts || {};
      triggerEl = opts.trigger || null;
      onDelete  = opts.onDelete || null;
      if (img) {
        img.src = src; img.style.width = img.style.height = '';
        img.onload = function() { scale = 1; calcBase(); updateZoom(); };
      }
      if (filename) filename.textContent = name || 'image';
      el.classList.add('image-preview--visible');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    };
    el.close = close;

    if (scrim)    scrim.addEventListener('click', close);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (delBtn)   delBtn.addEventListener('click', function() { if (onDelete) onDelete(); close(); });
    if (download) download.addEventListener('click', function() {
      if (!img) return;
      var a = document.createElement('a'); a.href = img.src; a.download = filename ? filename.textContent : 'image'; a.click();
    });
    if (zoomIn)  zoomIn.addEventListener('click', function() { if (scale < MAX) { scale = Math.min(MAX, +(scale + STEP).toFixed(2)); updateZoom(); } });
    if (zoomOut) zoomOut.addEventListener('click', function() { if (scale > MIN) { scale = Math.max(MIN, +(scale - STEP).toFixed(2)); updateZoom(); } });
  });

  /* `[data-image-preview]`는 **트리거**를 뜻한다 — 누르면 라이트박스가 열린다.
     단, `.file-upload`에서는 같은 속성이 **연동할 라이트박스의 id**를 가리키는 설정값이라
     (file-upload.md 참조) 트리거로 잡으면 안 된다. 클릭이 카드에서 위로 올라와
     업로드 영역 전체가 트리거가 되고, **csv·html처럼 볼 것이 없는 카드를 눌러도**
     그 안의 첫 이미지(또는 빈 src)로 라이트박스가 열린다. 실제로 그렇게 열리고 있었다.
     FileUpload는 자기 카드에 직접 리스너를 달아 **이미지 카드에서만** 연다(initFileUpload). */
  container.querySelectorAll('[data-image-preview]:not(.file-upload)').forEach(function(trig) {
    if (trig.dataset.initImagePreviewTrig) return;
    trig.dataset.initImagePreviewTrig = '1';
    trig.addEventListener('click', function() {
      var pv = document.getElementById(trig.dataset.imagePreview);
      if (!pv || typeof pv.open !== 'function') return;
      var im = trig.matches('img') ? trig : trig.querySelector('img');
      pv.open(im ? im.src : (trig.dataset.src || ''), trig.dataset.filename || (im && im.alt) || 'image', { trigger: trig });
    });
  });

  if (!container.__initImagePreviewEsc) {
    container.__initImagePreviewEsc = true;
    document.addEventListener('keydown', function(e) {
      if (e.key !== 'Escape') return;
      container.querySelectorAll('.image-preview--visible').forEach(function(el) { if (typeof el.close === 'function') el.close(); });
    });
  }
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initImagePreview) window.__componentInits.initImagePreview = initImagePreview;
```

:::preview
<div style="min-height:160px;background:var(--color-surface-subtle);border-radius:var(--radius-md);padding:var(--space-inset-xl);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:var(--space-gap-md);">

<p class="text-body" style="color:var(--color-text-subtle);margin:0">아래 이미지를 클릭하세요</p>
<img id="demo-ip-thumb" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='120'%3E%3Crect width='160' height='120' fill='%23e8eef8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b8ccc' font-size='12'%3EIMG%3C/text%3E%3C/svg%3E"
  alt="미리보기 이미지" data-image-preview="demo-image-preview" data-filename="image.jpg"
  style="width:160px;height:120px;object-fit:cover;border-radius:var(--radius-md);cursor:pointer;display:block;">

<!-- position:fixed — 브라우저 전체를 덮음 -->
<div class="image-preview" id="demo-image-preview" role="dialog" aria-modal="true" aria-label="이미지 미리보기">
  <div id="demo-ip-scrim" class="image-preview__scrim" aria-hidden="true"></div>
  <div class="image-preview__topbar">
    <span class="text-body image-preview__filename" id="demo-ip-filename"></span>
    <div class="image-preview__topbar-actions">
      <button class="btn btn--secondary btn--sm btn--icon-left" type="button" id="demo-ip-download">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></span>다운로드
      </button>
      <button class="btn btn--secondary btn--sm btn--icon-left" type="button" id="demo-ip-delete">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span>삭제
      </button>
      <button class="btn btn--ghost-inverse btn--sm btn--icon-only" type="button" aria-label="닫기" id="demo-ip-close">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
      </button>
    </div>
  </div>
  <div class="image-preview__card">
    <div class="image-preview__body">
      <img class="image-preview__img" id="demo-ip-img" src="" alt="확대 이미지">
    </div>
  </div>
  <div class="image-preview__toolbar">
    <button class="btn btn--ghost-inverse btn--sm btn--icon-only" type="button" aria-label="축소" id="demo-ip-zoom-out">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg></span>
    </button>
    <span class="text-body image-preview__zoom-label" id="demo-ip-zoom-label">100%</span>
    <button class="btn btn--ghost-inverse btn--sm btn--icon-only" type="button" aria-label="확대" id="demo-ip-zoom-in">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span>
    </button>
  </div>
</div>

</div>
<script>
initImagePreview(stage);
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.image-preview — position:fixed 전체화면. hidden 기본, image-preview--visible로 표시.
  role="dialog" aria-modal="true" aria-label="이미지 미리보기"
  - scrim = div.image-preview__scrim[aria-hidden="true"] — 반투명 스크림. 클릭 시 닫힘.
  - topbar = div.image-preview__topbar — dim 위 상단 고정 바(z-index:1). 파일명(좌) + 버튼(우).
    - span.text-body.image-preview__filename — 파일명. color-text-inverse(CSS에 정의됨, 인라인 style 불필요).
    - topbar-actions = div.image-preview__topbar-actions
      - button.btn.btn--secondary.btn--sm.btn--icon-left — 다운로드·삭제
      - button.btn.btn--ghost-inverse.btn--sm.btn--icon-only[aria-label="닫기"] — × (btn--ghost-inverse: components/atoms/button.md 정의 variant. 어두운 배경 위 흰 아이콘)
  - card = div.image-preview__card — 흰 배경 카드(z-index:1, scrim 위). 이미지만 담음. 화면 중앙.
    - body = div.image-preview__body — flex 컨테이너. 이미지 크기를 감쌈.
      - img.image-preview__img — JS가 width/height를 직접 제어(transform:scale 아님). 배율 변경 시 카드도 함께 늘어남.
  - toolbar = div.image-preview__toolbar — dim 위 하단 고정(z-index:1). 축소·배율·확대.
    - button.btn.btn--ghost-inverse.btn--sm.btn--icon-only[aria-label="축소/확대"] — 최솟값/최댓값 도달 시 btn--disabled + disabled + tabindex="-1"
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">visible</span>
  <!-- position:fixed → position:relative 오버라이드. 나머지 CSS는 image-preview--visible 그대로 적용 -->
  <div data-component class="image-preview image-preview--visible" role="dialog" aria-modal="true" aria-label="이미지 미리보기"
       style="position:relative;width:100%;height:380px;border-radius:var(--radius-md);">
    <div class="image-preview__scrim" aria-hidden="true"></div>
    <div class="image-preview__topbar">
      <span class="text-body image-preview__filename">document_001.jpg</span>
      <div class="image-preview__topbar-actions">
        <button class="btn btn--secondary btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></span>다운로드</button>
        <button class="btn btn--secondary btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span>삭제</button>
        <button class="btn btn--ghost-inverse btn--sm btn--icon-only" type="button" aria-label="닫기"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span></button>
      </div>
    </div>
    <div class="image-preview__card">
      <div class="image-preview__body">
        <img class="image-preview__img" style="width:260px;height:auto;" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23e8eef8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b8ccc' font-size='16'%3EIMG%3C/text%3E%3C/svg%3E" alt="확대 이미지">
      </div>
    </div>
    <div class="image-preview__toolbar">
      <button class="btn btn--ghost-inverse btn--sm btn--icon-only" type="button" aria-label="축소"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg></span></button>
      <span class="text-body image-preview__zoom-label">100%</span>
      <button class="btn btn--ghost-inverse btn--sm btn--icon-only" type="button" aria-label="확대"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
    </div>
  </div>
</div>

</div>
:::

---

## CSS

```css
/* ── Root ── */
.image-preview {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duration-slow) var(--easing-enter);
}
.image-preview--visible {
  opacity: 1;
  pointer-events: auto;
}

/* ── Scrim ── */
.image-preview__scrim {
  position: absolute;
  inset: 0;
  background: var(--color-surface-dim);
  cursor: pointer;
}

/* ── Topbar: 바 형태. 상단 고정 — 파일명(좌) + 버튼(우) ── */
.image-preview__topbar {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-gap-md);
  padding: var(--space-inset-md) var(--space-inset-xl);
  background: var(--color-surface-dark); /* 어두운 바 배경 */
}
.image-preview__filename {
  color: var(--color-text-inverse);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.image-preview__topbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  flex-shrink: 0;
}

/* ── Card: 흰 배경. 이미지만 담음. 화면 중앙 ── */
/* 크기는 __img가 결정 — max 제약 없이 이미지 크기에 따라 자연스럽게 늘어남 */
/* focus ring: btn 전역 :focus-visible 규칙 상속 — 별도 outline 정의 불필요 */
.image-preview__card {
  position: relative;
  z-index: 1; /* scrim(position:absolute, z-index 없음) 위에 카드 표시 */
  background: var(--color-surface-base);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  display: flex;
}

/* ── Body ── */
.image-preview__body {
  display: flex;
}
.image-preview__img {
  display: block;
  /* width는 JS가 baseWidth * scale로 제어 — transform 사용 안 함 */
  transition: width var(--duration-fast) var(--easing-base),
              height var(--duration-fast) var(--easing-base);
}

/* ── Toolbar: dim 위 하단 고정 — 축소·배율·확대 ── */
.image-preview__toolbar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-gap-sm);
  padding: var(--space-inset-sm) var(--space-inset-xl);
}
.image-preview__zoom-label {
  min-width: 3.5em;
  text-align: center;
  color: var(--color-text-inverse);
  font-variant-numeric: tabular-nums;
}
```

---

## 접근성

| 상황 | 마크업 |
|------|--------|
| 루트 | `role="dialog"` `aria-modal="true"` `aria-label="이미지 미리보기"` |
| 열릴 때 | 닫기 버튼으로 포커스 이동 (`closeBtn.focus()`) |
| 닫힐 때 | 트리거(썸네일)로 포커스 복귀 (`triggerEl.focus()`). 삭제 후 카드가 사라진 경우 상위 컨테이너(추가하기 버튼 등)로 복귀 |
| `Tab` / `Shift+Tab` | 모달 내 포커스 순환 — 닫기·다운로드·삭제·축소·확대 버튼 사이만 이동 (포커스 트랩 필수) |
| `Escape` | 닫기 동작 필수 |
| 스크림 | `aria-hidden="true"` |
| 닫기·다운로드·삭제·확대·축소 버튼 | `aria-label` 필수 |
| 확대·축소 버튼 최대·최솟값 | `btn--disabled` + `disabled` + `tabindex="-1"` |

포커스 트랩 구현 예시:

```js
var focusable = 'button:not([disabled]), [tabindex]:not([tabindex="-1"])';

modal.addEventListener('keydown', function(e) {
  if (e.key !== 'Tab') return;
  var els = Array.from(modal.querySelectorAll(focusable));
  var first = els[0], last = els[els.length - 1];
  if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
  else            { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
});
```

---

## Do / Don't

> ✅ DO — 상단 바에 파일명을 표시
> 여러 파일 중 어느 파일을 보고 있는지 맥락을 제공함

> ❌ DON'T — 이미지를 고정 크기로 자르거나 늘리기
> `max-width: 100%; height: auto`로 원본 비율을 항상 유지할 것

> ✅ DO — 열릴 때 body 스크롤 잠금
> 스크림 뒤 페이지가 스크롤되지 않도록 `overflow: hidden` 적용

> ❌ DON'T — ImagePreview를 편집 기능에 사용
> 보기 전용 컴포넌트. 편집·크롭이 필요하면 별도 모달을 사용할 것
