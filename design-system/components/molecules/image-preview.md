---
file: components/molecules/image-preview.md
version: 0.2.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/radius.md, tokens/shadow.md, tokens/motion.md, tokens/z-index.md, tokens/typography.md, components/atoms/button.md, components/atoms/icon-button.md
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
<div style="min-height:200px;background:var(--color-surface-subtle);border-radius:var(--radius-md);padding:var(--space-inset-xl);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:var(--space-gap-md)">

<p class="text-body" style="color:var(--color-text-subtle);margin:0">아래 이미지를 클릭하세요</p>

<img id="demo-ip-thumb" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='120'%3E%3Crect width='160' height='120' fill='%23e8eef8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b8ccc' font-size='12'%3EIMG%3C/text%3E%3C/svg%3E"
  alt="미리보기 이미지"
  style="width:160px;height:120px;object-fit:cover;border-radius:var(--radius-md);cursor:pointer;display:block;">

<div class="image-preview" id="demo-image-preview" role="dialog" aria-modal="true" aria-label="이미지 미리보기">
  <div class="image-preview__scrim" id="demo-ip-scrim" aria-hidden="true"></div>
  <div class="image-preview__dialog">
    <div class="image-preview__header">
      <span class="text-body image-preview__filename" id="demo-ip-filename">image.jpg</span>
      <div class="image-preview__header-actions">
        <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="다운로드" id="demo-ip-download">
          <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></span>
        </button>
        <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="삭제" id="demo-ip-delete">
          <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span>
        </button>
        <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="닫기" id="demo-ip-close">
          <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
        </button>
      </div>
    </div>
    <div class="image-preview__body">
      <img class="image-preview__img" id="demo-ip-img" src="" alt="확대 이미지">
    </div>
    <div class="image-preview__toolbar">
      <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="축소" id="demo-ip-zoom-out">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg></span>
      </button>
      <span class="text-body image-preview__zoom-label" id="demo-ip-zoom-label">100%</span>
      <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="확대" id="demo-ip-zoom-in">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span>
      </button>
    </div>
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
  var scale = 1;
  var MIN = 0.5, MAX = 3, STEP = 0.25;

  function updateZoom() {
    img.style.transform = 'scale(' + scale + ')';
    zoomLabel.textContent = Math.round(scale * 100) + '%';
    zoomIn.disabled  = scale >= MAX;
    zoomOut.disabled = scale <= MIN;
  }

  function open(src, name) {
    img.src = src;
    filename.textContent = name || 'image';
    scale = 1;
    updateZoom();
    preview.classList.add('image-preview--visible');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    preview.classList.remove('image-preview--visible');
    document.body.style.overflow = '';
  }

  thumb.addEventListener('click', function() { open(thumb.src, 'image.jpg'); });
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
- root = div.image-preview — fixed 전체화면. hidden 기본, image-preview--visible로 표시.
  role="dialog" aria-modal="true" aria-label="이미지 미리보기"
  - scrim = div.image-preview__scrim[aria-hidden="true"] — 반투명 스크림. 클릭 시 닫힘.
  - dialog = div.image-preview__dialog — 흰 배경 모달 카드. flex column.
    - header = div.image-preview__header — 파일명(좌) + 액션 버튼(우) 가로 배치.
      - filename = span.text-body.image-preview__filename — 파일명 텍스트.
      - header-actions = div.image-preview__header-actions — 다운로드·삭제·닫기 버튼 그룹.
    - body = div.image-preview__body — 이미지 스크롤 영역. overflow:auto.
      - img.image-preview__img — transform:scale()로 확대·축소.
    - toolbar = div.image-preview__toolbar — 축소·배율표시·확대 버튼 가로 배치. 하단 중앙.
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">visible</span>
  <div style="position:relative;height:340px;border-radius:var(--radius-md);overflow:hidden;">
    <div style="position:absolute;inset:0;">
      <div class="image-preview__scrim" style="position:absolute;inset:0;" aria-hidden="true"></div>
      <div data-component style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:var(--space-inset-xl);">
        <div class="image-preview__dialog" style="width:100%;max-width:400px;">
          <div class="image-preview__header">
            <span class="text-body image-preview__filename">document_001.jpg</span>
            <div class="image-preview__header-actions">
              <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="다운로드"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></span></button>
              <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="삭제"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span></button>
              <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="닫기"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span></button>
            </div>
          </div>
          <div class="image-preview__body">
            <img class="image-preview__img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect width='320' height='180' fill='%23e8eef8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b8ccc' font-size='16'%3EIMG%3C/text%3E%3C/svg%3E" alt="확대 이미지">
          </div>
          <div class="image-preview__toolbar">
            <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="축소"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-minus"/></svg></span></button>
            <span class="text-body image-preview__zoom-label">100%</span>
            <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="확대"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span></button>
          </div>
        </div>
      </div>
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

/* ── Dialog ── */
/* 흰 배경 모달 카드 — scrim 위에 flex column으로 배치 */
.image-preview__dialog {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  background: var(--color-surface-base);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  width: 90vw;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
}

/* ── Header ── */
.image-preview__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-gap-md);
  padding: var(--space-inset-md) var(--space-inset-md) var(--space-inset-md) var(--space-inset-xl);
  border-bottom: var(--stroke-sm) solid var(--color-border-subtle);
  flex-shrink: 0;
}
.image-preview__filename {
  color: var(--color-text-body);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.image-preview__header-actions {
  display: flex;
  gap: var(--space-gap-2xs);
  flex-shrink: 0;
}

/* ── Body ── */
/* 이미지 스크롤 영역 — 확대 시 overflow:auto로 탐색 가능 */
.image-preview__body {
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-inset-xl);
  min-height: 0;
}
.image-preview__img {
  display: block;
  max-width: 100%;
  height: auto;
  transform-origin: center center;
  transition: transform var(--duration-fast) var(--easing-base);
}

/* ── Toolbar ── */
.image-preview__toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-gap-sm);
  padding: var(--space-inset-sm) var(--space-inset-xl);
  border-top: var(--stroke-sm) solid var(--color-border-subtle);
  flex-shrink: 0;
}
.image-preview__zoom-label {
  min-width: 3.5em;
  text-align: center;
  color: var(--color-text-subtle);
  font-variant-numeric: tabular-nums;
}
```

---

## FileUpload 연동

FileUpload `__preview` 클릭 시 ImagePreview를 트리거한다. 파일명과 src를 함께 전달한다.

```js
previewEl.addEventListener('click', function() {
  imagePreview.open(thumbEl.src, file.name);
});
```

---

## 접근성

| 상황 | 마크업 |
|------|--------|
| 루트 | `role="dialog"` `aria-modal="true"` `aria-label="이미지 미리보기"` |
| 열릴 때 | 닫기 버튼으로 포커스 이동 |
| 닫힐 때 | 트리거(썸네일)로 포커스 복귀 |
| 스크림 | `aria-hidden="true"` |
| 닫기·다운로드·삭제·확대·축소 버튼 | `aria-label` 필수 |
| `Escape` | 닫기 동작 필수 |

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
