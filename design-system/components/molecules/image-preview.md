---
file: components/molecules/image-preview.md
version: 0.2.1
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/radius.md, tokens/shadow.md, tokens/motion.md, tokens/z-index.md, tokens/typography.md, components/atoms/button.md
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

:::preview
<div style="min-height:160px;background:var(--color-surface-subtle);border-radius:var(--radius-md);padding:var(--space-inset-xl);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:var(--space-gap-md);">

<p class="text-body" style="color:var(--color-text-subtle);margin:0">아래 이미지를 클릭하세요</p>
<img id="demo-ip-thumb" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='120'%3E%3Crect width='160' height='120' fill='%23e8eef8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b8ccc' font-size='12'%3EIMG%3C/text%3E%3C/svg%3E"
  alt="미리보기 이미지"
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
(function() {
  var thumb    = stage.querySelector('#demo-ip-thumb');
  var preview  = stage.querySelector('#demo-image-preview');
  var img      = stage.querySelector('#demo-ip-img');
  var scrim    = stage.querySelector('#demo-ip-scrim');
  var closeBtn = stage.querySelector('#demo-ip-close');
  var dlBtn    = stage.querySelector('#demo-ip-download');
  var delBtn   = stage.querySelector('#demo-ip-delete');
  var zoomIn   = stage.querySelector('#demo-ip-zoom-in');
  var zoomOut  = stage.querySelector('#demo-ip-zoom-out');
  var zoomLabel = stage.querySelector('#demo-ip-zoom-label');
  var filename = stage.querySelector('#demo-ip-filename');
  var scale = 1, baseW = 0, baseH = 0;
  var MIN = 0.5, MAX = 3, STEP = 0.25;
  var GAP = 96; /* topbar + toolbar 높이 합계(각 ~48px) */
  var triggerEl = null;

  function calcBase() {
    var maxW = window.innerWidth  * 0.9;
    var maxH = (window.innerHeight - GAP) * 0.9;
    var r = img.naturalWidth / img.naturalHeight;
    if (img.naturalWidth / maxW > img.naturalHeight / maxH) {
      baseW = Math.min(img.naturalWidth, maxW);
      baseH = baseW / r;
    } else {
      baseH = Math.min(img.naturalHeight, maxH);
      baseW = baseH * r;
    }
  }

  function updateZoom() {
    img.style.width  = Math.round(baseW * scale) + 'px';
    img.style.height = Math.round(baseH * scale) + 'px';
    zoomLabel.textContent = Math.round(scale * 100) + '%';
    zoomIn.disabled  = scale >= MAX;
    zoomOut.disabled = scale <= MIN;
  }

  function open(src, name, trigger) {
    triggerEl = trigger || null;
    img.src = src;
    filename.textContent = name || 'image';
    img.style.width = img.style.height = '';
    img.onload = function() {
      scale = 1;
      calcBase();
      updateZoom();
    };
    preview.classList.add('image-preview--visible');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    preview.classList.remove('image-preview--visible');
    document.body.style.overflow = '';
    if (triggerEl) { triggerEl.focus(); triggerEl = null; }
  }

  thumb.addEventListener('click', function() { open(thumb.src, 'image.jpg', thumb); });
  scrim.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  delBtn.addEventListener('click', close);
  dlBtn.addEventListener('click', function() {
    var a = document.createElement('a');
    a.href = img.src; a.download = filename.textContent; a.click();
  });
  zoomIn.addEventListener('click', function() {
    if (scale < MAX) { scale = Math.min(MAX, scale + STEP); updateZoom(); }
  });
  zoomOut.addEventListener('click', function() {
    if (scale > MIN) { scale = Math.max(MIN, scale - STEP); updateZoom(); }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') close();
  });
})();
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
  <div data-component style="position:relative;height:380px;border-radius:var(--radius-md);overflow:hidden;">
    <div class="image-preview__scrim" style="position:absolute;inset:0;" aria-hidden="true"></div>
    <!-- topbar -->
    <div class="image-preview__topbar" style="position:absolute;top:0;left:0;right:0;z-index:1;">
      <span class="text-body image-preview__filename">document_001.jpg</span>
      <div class="image-preview__topbar-actions">
        <button class="btn btn--secondary btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></span>다운로드</button>
        <button class="btn btn--secondary btn--sm btn--icon-left" type="button"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span>삭제</button>
        <button class="btn btn--ghost-inverse btn--sm btn--icon-only" type="button" aria-label="닫기"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span></button>
      </div>
    </div>
    <!-- image card -->
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:56px var(--space-inset-xl) 48px;">
      <div class="image-preview__card">
        <div class="image-preview__body">
          <img class="image-preview__img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23e8eef8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b8ccc' font-size='16'%3EIMG%3C/text%3E%3C/svg%3E" alt="확대 이미지">
        </div>
      </div>
    </div>
    <!-- toolbar -->
    <div class="image-preview__toolbar" style="position:absolute;bottom:0;left:0;right:0;z-index:1;">
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
