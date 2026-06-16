---
file: components/molecules/file-upload.md
version: 0.2.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, tokens/typography.md, tokens/icon.md, components/atoms/button.md, components/molecules/image-preview.md, components/atoms/icon.md
---

# FileUpload

## 개요

파일을 드래그·드롭하거나 버튼으로 직접 업로드하는 영역. 선택된 파일을 카드 그리드로 나열하며, 개별 파일의 미리보기·다운로드·삭제를 지원한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| 상태 | default · drag-over → `file-upload--drag-over` · capacity-full → `file-upload--capacity-full` | default |
| 파일 유무 | empty (파일 없음) · populated (파일 있음) | empty |

`file-upload--drag-over`: 드래그가 컴포넌트 위에 올라왔을 때. 테두리 색을 `--color-border-brand`으로 강조하고 배경을 한 단계 진하게 표시한다.

`file-upload--capacity-full`: 허용 용량이 모두 찼을 때. `__usage` 텍스트가 error 색으로 변하고 추가하기 버튼이 disabled된다. 이 상태에서 drag-over 시 brand 대신 error 톤으로 표시하고 `cursor:no-drop`으로 불가 힌트를 준다.

---

## 사용 지침

| 상황 | 권장 |
|------|------|
| 파일 첨부가 필요한 폼 | FileUpload 사용 |
| 단일 파일만 허용하는 경우 | 카드 그리드 max 1열 또는 `<input type="file">` 인라인 사용 |
| 용량·형식 제한이 있는 경우 | `.file-upload__constraint`로 빨간 텍스트 안내 필수 |

**제약**
- 파일 카드는 `file-upload__grid`에서 `minmax(150px, 1fr)` 기준 `auto-fill` 그리드. 컨테이너 너비에 따라 1·2·3단으로 자동 정렬된다.
- 용량 제한 초과·지원하지 않는 형식은 카드 추가 시 inline 에러 처리로 안내한다 (컴포넌트 외부 로직).

---

## 동작

| 이벤트 | 동작 |
|--------|------|
| 추가하기 버튼 클릭 | 파일 선택 다이얼로그 열기 (`<input type="file" hidden>` trigger) |
| 드래그 진입 (`dragenter` / `dragover`) | `file-upload--drag-over` 클래스 추가. **용량 초과 상태에서는** error 톤 표시 + `cursor:no-drop`. 파일은 받지 않는다 |
| 드래그 이탈 (`dragleave`) | `file-upload--drag-over` 클래스 제거 |
| 드롭 (`drop`) — 정상 | `file-upload--drag-over` 제거 → 파일 카드 추가 |
| 드롭 (`drop`) — 용량 초과 | `file-upload--drag-over` 제거만 수행. 파일 추가하지 않음 |
| 파일 추가 후 용량 초과 | `file-upload--capacity-full` 추가 → `__usage` 오류 색, 추가하기 버튼 `disabled` |
| 파일 삭제 후 용량 복구 | `file-upload--capacity-full` 제거 → 추가하기 버튼 재활성화 |
| 파일 카드 클릭 | ImagePreview 열기 — 원본 이미지 라이트박스 표시 |
| 파일 카드 hover | `.file-upload-item__overlay` 표시 — 어두운 반투명 레이어 + 돋보기 아이콘 중앙 |
| 다운로드 버튼 클릭 | 해당 파일 다운로드 |
| 삭제 버튼 클릭 | 해당 카드 제거 |

```js init
function initFileUpload(container) {
  var upload = container.querySelector('#demo-file-upload');
  if (!upload || upload.dataset.initFileupload) return;
  upload.dataset.initFileupload = '1';

  var input      = container.querySelector('#demo-file-input');
  var grid       = container.querySelector('#demo-grid');
  var addBtn     = container.querySelector('#demo-add-btn');
  var zone       = container.querySelector('#demo-dropzone');
  var usage      = container.querySelector('#demo-usage');
  var ipEl       = container.querySelector('#demo-image-preview');
  var ipImg      = container.querySelector('#demo-ip-img');
  var ipScrim    = container.querySelector('#demo-ip-scrim');
  var ipClose    = container.querySelector('#demo-ip-close');
  var ipDownload = container.querySelector('#demo-ip-download');
  var ipDelete   = container.querySelector('#demo-ip-delete');
  var ipZoomIn   = container.querySelector('#demo-ip-zoom-in');
  var ipZoomOut  = container.querySelector('#demo-ip-zoom-out');
  var ipZoomLabel = container.querySelector('#demo-ip-zoom-label');
  var ipFilename = container.querySelector('#demo-ip-filename');
  var totalBytes = 0;
  var MAX_BYTES = 2 * 1024 * 1024; /* 2MB (데모용) */
  var scale = 1, baseW = 0, baseH = 0;
  var MIN = 0.5, MAX = 3, STEP = 0.25;
  var GAP = 96;
  var currentItem = null;

  function fmt(bytes) { return (bytes / (1024 * 1024)).toFixed(1) + 'MB'; }

  function updateCapacity() {
    var full = totalBytes >= MAX_BYTES;
    upload.classList.toggle('file-upload--capacity-full', full);
    addBtn.disabled = full;
    addBtn.classList.toggle('btn--disabled', full);
    if (full) { addBtn.setAttribute('aria-disabled', 'true'); addBtn.setAttribute('tabindex', '-1'); }
    else { addBtn.removeAttribute('aria-disabled'); addBtn.removeAttribute('tabindex'); }
  }

  function calcBase() {
    var maxW = window.innerWidth  * 0.9;
    var maxH = (window.innerHeight - GAP) * 0.9;
    var r = ipImg.naturalWidth / ipImg.naturalHeight;
    if (ipImg.naturalWidth / maxW > ipImg.naturalHeight / maxH) {
      baseW = Math.min(ipImg.naturalWidth, maxW);
      baseH = baseW / r;
    } else {
      baseH = Math.min(ipImg.naturalHeight, maxH);
      baseW = baseH * r;
    }
  }

  function updateZoom() {
    ipImg.style.width  = Math.round(baseW * scale) + 'px';
    ipImg.style.height = Math.round(baseH * scale) + 'px';
    ipZoomLabel.textContent = Math.round(scale * 100) + '%';
    ipZoomIn.disabled  = scale >= MAX;
    ipZoomOut.disabled = scale <= MIN;
  }

  function openPreview(src, name, item) {
    ipImg.src = src;
    ipFilename.textContent = name;
    currentItem = item;
    ipImg.style.width = ipImg.style.height = '';
    ipImg.onload = function() {
      scale = 1;
      calcBase();
      updateZoom();
    };
    ipEl.classList.add('image-preview--visible');
    document.body.style.overflow = 'hidden';
    ipClose.focus();
  }
  function closePreview() {
    ipEl.classList.remove('image-preview--visible');
    document.body.style.overflow = '';
    currentItem = null;
  }

  ipScrim.addEventListener('click', closePreview);
  ipClose.addEventListener('click', closePreview);
  ipDownload.addEventListener('click', function() {
    var a = document.createElement('a');
    a.href = ipImg.src; a.download = ipFilename.textContent; a.click();
  });
  ipDelete.addEventListener('click', function() {
    if (currentItem) {
      var size = currentItem._fileSize || 0;
      totalBytes -= size;
      usage.textContent = fmt(totalBytes) + ' / 2MB';
      currentItem.remove();
      updateCapacity();
    }
    closePreview();
  });
  ipZoomIn.addEventListener('click', function() {
    if (scale < MAX) { scale = Math.min(MAX, +(scale + STEP).toFixed(2)); updateZoom(); }
  });
  ipZoomOut.addEventListener('click', function() {
    if (scale > MIN) { scale = Math.max(MIN, +(scale - STEP).toFixed(2)); updateZoom(); }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePreview();
  });

  function addCard(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var item = document.createElement('div');
      item.className = 'file-upload-item';
      item._fileSize = file.size;
      item.innerHTML =
        '<p class="text-form-label file-upload-item__name" title="' + file.name + '">' + file.name + '</p>' +
        '<div class="file-upload-item__preview" style="cursor:pointer">' +
          '<img src="' + e.target.result + '" class="file-upload-item__thumb" alt="">' +
          '<div class="file-upload-item__overlay" aria-hidden="true">' +
            '<svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg>' +
          '</div>' +
        '</div>' +
        '<div class="file-upload-item__actions">' +
          '<button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="다운로드"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></span></button>' +
          '<button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="삭제"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span></button>' +
        '</div>';
      item.querySelector('.file-upload-item__preview').addEventListener('click', function() {
        openPreview(e.target.result, file.name, item);
      });
      item.querySelector('[aria-label="삭제"]').addEventListener('click', function() {
        totalBytes -= file.size;
        usage.textContent = fmt(totalBytes) + ' / 2MB';
        item.remove();
        updateCapacity();
      });
      grid.appendChild(item);
      totalBytes += file.size;
      usage.textContent = fmt(totalBytes) + ' / 2MB';
      updateCapacity();
    };
    reader.readAsDataURL(file);
  }

  addBtn.addEventListener('click', function() { input.click(); });
  input.addEventListener('change', function() {
    Array.from(input.files).forEach(addCard);
    input.value = '';
  });

  zone.addEventListener('dragover', function(e) { e.preventDefault(); upload.classList.add('file-upload--drag-over'); });
  zone.addEventListener('dragleave', function(e) { if (!zone.contains(e.relatedTarget)) upload.classList.remove('file-upload--drag-over'); });
  zone.addEventListener('drop', function(e) {
    e.preventDefault();
    upload.classList.remove('file-upload--drag-over');
    if (!upload.classList.contains('file-upload--capacity-full')) {
      Array.from(e.dataTransfer.files).forEach(addCard);
    }
  });
}
if (window.__componentInits && !window.__componentInits.initFileUpload) window.__componentInits.initFileUpload = initFileUpload;
```

:::preview
<div style="min-height:120px;background:var(--color-surface-subtle);border-radius:var(--radius-md);padding:var(--space-inset-xl);">

<div class="file-upload" id="demo-file-upload">
  <input type="file" id="demo-file-input" hidden multiple accept="image/*">
  <div class="file-upload__header">
    <span class="text-form-label file-upload__label" style="font-weight:var(--font-weight-heading)">첨부파일</span>
    <span class="text-form-label file-upload__usage" id="demo-usage">0MB / 2MB</span>
  </div>
  <div class="file-upload__meta">
    <p class="text-body file-upload__description">파일을 끌어다 놓거나, 추가하기 버튼으로 직접 업로드할 수 있어요.</p>
    <p class="text-body file-upload__constraint">*파일당 10MB 이하 업로드 가능</p>
  </div>
  <div class="file-upload__dropzone" id="demo-dropzone">
    <button class="btn btn--secondary btn--sm btn--icon-left" type="button" id="demo-add-btn">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span>추가하기
    </button>
    <div class="file-upload__grid" id="demo-grid"></div>
  </div>
</div>

<div class="image-preview" id="demo-image-preview" role="dialog" aria-modal="true" aria-label="이미지 미리보기">
  <div class="image-preview__scrim" id="demo-ip-scrim" aria-hidden="true"></div>
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
initFileUpload(stage);
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.file-upload — 세로 스택. 드래그 상태: file-upload--drag-over 클래스 추가.
- header = div.file-upload__header — 레이블 + 용량 표시 가로 배치 (space-between).
  - label = span.text-form-label.file-upload__label — 섹션 제목 (예: "첨부파일"). font-weight-heading으로 굵게.
  - usage = span.text-form-label.file-upload__usage — "0MB / 2MB" 용량 현황. color-text-subtle. 용량 초과(file-upload--capacity-full) 시 color-text-error.
- meta = div.file-upload__meta — description + constraint 세로 스택.
  - description = p.text-body.file-upload__description — 업로드 안내 문구.
  - constraint = p.text-body.file-upload__constraint — 제한 안내 (예: "*파일당 10MB 이하"). color-text-error.
- dropzone = div.file-upload__dropzone — 파일 드롭 영역. 배경 없음(transparent), 테두리 `color-border-neutral-subtle` dashed.
  - trigger = button.btn.btn--secondary.btn--sm.btn--icon-left — "추가하기" 버튼. input[type=file][hidden] trigger.
  - grid = div.file-upload__grid — 2열 카드 그리드.
    - item = div.file-upload-item — 파일 카드.
      - name = p.text-form-label.file-upload-item__name — 파일명 (한 줄 말줄임). title 속성에 전체 파일명을 동일하게 지정해 잘렸을 때 네이티브 툴팁으로 표시.
      - preview = div.file-upload-item__preview — 썸네일 컨테이너 (aspect-ratio 유지).
        - thumb = img.file-upload-item__thumb — 이미지 (object-fit: cover).
        - overlay = div.file-upload-item__overlay — hover 시 표시. 어두운 반투명 레이어 + 돋보기 SVG 중앙 배치.
      - actions = div.file-upload-item__actions — 카드(file-upload-item) 기준 우하단 absolute. preview 안에 두지 않음 — overlay stacking context 밖이어야 hover 시에도 항상 앞에 표시됨.
        - button.btn.btn--ghost.btn--sm.btn--icon-only[aria-label="다운로드"] — icon-download
        - button.btn.btn--ghost.btn--sm.btn--icon-only[aria-label="삭제"] — icon-delete
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">empty</span>
  <div data-component class="file-upload">
    <div class="file-upload__header">
      <span class="text-form-label file-upload__label" style="font-weight:var(--font-weight-heading)">첨부파일</span>
      <span class="text-form-label file-upload__usage">0MB / 2MB</span>
    </div>
    <div class="file-upload__meta">
      <p class="text-body file-upload__description">파일을 끌어다 놓거나, 추가하기 버튼으로 직접 업로드할 수 있어요.</p>
      <p class="text-body file-upload__constraint">*파일당 10MB 이하 업로드 가능</p>
    </div>
    <div class="file-upload__dropzone">
      <button class="btn btn--secondary btn--sm btn--icon-left" type="button">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span>추가하기
      </button>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">populated</span>
  <div data-component class="file-upload">
    <div class="file-upload__header">
      <span class="text-form-label file-upload__label" style="font-weight:var(--font-weight-heading)">첨부파일</span>
      <span class="text-form-label file-upload__usage">4.2MB / 2MB</span>
    </div>
    <div class="file-upload__meta">
      <p class="text-body file-upload__description">파일을 끌어다 놓거나, 추가하기 버튼으로 직접 업로드할 수 있어요.</p>
      <p class="text-body file-upload__constraint">*파일당 10MB 이하 업로드 가능</p>
    </div>
    <div class="file-upload__dropzone">
      <button class="btn btn--secondary btn--sm btn--icon-left" type="button">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span>추가하기
      </button>
      <div class="file-upload__grid">
        <div class="file-upload-item">
          <p class="text-form-label file-upload-item__name" title="document_001.jpg">document_001.jpg</p>
          <div class="file-upload-item__preview">
            <img class="file-upload-item__thumb" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='120'%3E%3Crect width='160' height='120' fill='%23e8eef8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b8ccc' font-size='12'%3EIMG%3C/text%3E%3C/svg%3E" alt="">
            <div class="file-upload-item__overlay" aria-hidden="true">
              <svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg>
            </div>
          </div>
          <div class="file-upload-item__actions">
            <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="다운로드"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></span></button>
            <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="삭제"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span></button>
          </div>
        </div>
        <div class="file-upload-item">
          <p class="text-form-label file-upload-item__name" title="document_002.jpg">document_002.jpg</p>
          <div class="file-upload-item__preview">
            <img class="file-upload-item__thumb" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='120'%3E%3Crect width='160' height='120' fill='%23f0e8e8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23cc6b6b' font-size='12'%3EIMG%3C/text%3E%3C/svg%3E" alt="">
            <div class="file-upload-item__overlay" aria-hidden="true">
              <svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg>
            </div>
          </div>
          <div class="file-upload-item__actions">
            <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="다운로드"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></span></button>
            <button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="삭제"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">capacity-full</span>
  <div data-component class="file-upload file-upload--capacity-full">
    <div class="file-upload__header">
      <span class="text-form-label file-upload__label" style="font-weight:var(--font-weight-heading)">첨부파일</span>
      <span class="text-form-label file-upload__usage">2.0MB / 2MB</span>
    </div>
    <div class="file-upload__meta">
      <p class="text-body file-upload__description">파일을 끌어다 놓거나, 추가하기 버튼으로 직접 업로드할 수 있어요.</p>
      <p class="text-body file-upload__constraint">*파일당 10MB 이하 업로드 가능</p>
    </div>
    <div class="file-upload__dropzone">
      <button class="btn btn--secondary btn--sm btn--icon-left btn--disabled" type="button" disabled aria-disabled="true" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span>추가하기
      </button>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">capacity-full + drag-over</span>
  <div data-component class="file-upload file-upload--capacity-full file-upload--drag-over">
    <div class="file-upload__header">
      <span class="text-form-label file-upload__label" style="font-weight:var(--font-weight-heading)">첨부파일</span>
      <span class="text-form-label file-upload__usage">2.0MB / 2MB</span>
    </div>
    <div class="file-upload__meta">
      <p class="text-body file-upload__description">파일을 끌어다 놓거나, 추가하기 버튼으로 직접 업로드할 수 있어요.</p>
      <p class="text-body file-upload__constraint">*파일당 10MB 이하 업로드 가능</p>
    </div>
    <div class="file-upload__dropzone">
      <button class="btn btn--secondary btn--sm btn--icon-left btn--disabled" type="button" disabled aria-disabled="true" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span>추가하기
      </button>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">drag-over</span>
  <div data-component class="file-upload file-upload--drag-over">
    <div class="file-upload__header">
      <span class="text-form-label file-upload__label" style="font-weight:var(--font-weight-heading)">첨부파일</span>
      <span class="text-form-label file-upload__usage">0MB / 2MB</span>
    </div>
    <div class="file-upload__meta">
      <p class="text-body file-upload__description">파일을 끌어다 놓거나, 추가하기 버튼으로 직접 업로드할 수 있어요.</p>
      <p class="text-body file-upload__constraint">*파일당 10MB 이하 업로드 가능</p>
    </div>
    <div class="file-upload__dropzone">
      <button class="btn btn--secondary btn--sm btn--icon-left" type="button">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span>추가하기
      </button>
    </div>
  </div>
</div>

</div>
:::

---

## CSS

```css
/* ── Container ── */
.file-upload {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-sm);
}

/* ── Header ── */
.file-upload__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/* font-weight-heading으로 굵게 표시 — 인라인 style로 적용 */
.file-upload__label {
  color: var(--color-text-body);
}
.file-upload__usage {
  color: var(--color-text-subtle);
}

/* ── Meta ── */
.file-upload__meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-2xs);
}
/* .text-body(font-size-base + line-height-reading + font-weight-body) 베이스 사용 */
.file-upload__description {
  color: var(--color-text-subtle);
  margin: 0;
}
.file-upload__constraint {
  color: var(--color-text-error); /* 제한 안내 — 항상 오류 색으로 표시 */
  margin: 0;
}

/* ── Dropzone ── */
.file-upload__dropzone {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-gap-md);
  background: transparent;
  border: var(--stroke-sm) dashed var(--color-border-neutral-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-inset-2xl);
  transition: background var(--duration-fast) var(--easing-base),
              border-color var(--duration-fast) var(--easing-base);
}

/* drag-over: 테두리 강조 + 배경 진하게 */
.file-upload--drag-over .file-upload__dropzone {
  border-color: var(--color-border-brand);
  background: var(--color-action-brand-hover);
}

/* ── Capacity full ── */
/* 용량 초과 시 usage 텍스트 오류 색 */
.file-upload--capacity-full .file-upload__usage {
  color: var(--color-text-error);
}
/* 용량 초과 상태에서 drag-over: 불가 힌트 (brand 대신 error 톤) */
.file-upload--capacity-full.file-upload--drag-over .file-upload__dropzone {
  border-color: var(--color-border-error);
  background: var(--color-action-error-hover);
  cursor: no-drop;
}

/* ── File card grid ── */
.file-upload__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--space-gap-md);
  width: 100%;
}

/* ── File card ── */
.file-upload-item {
  position: relative; /* __actions absolute 기준점 */
  display: flex;
  flex-direction: column;
  background: var(--color-surface-base);
  border: var(--stroke-sm) solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden; /* 자식 preview가 모서리를 넘지 않도록 */
}

/* .text-form-label 베이스 사용 */
.file-upload-item__name {
  color: var(--color-text-body);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: var(--space-inset-xl);
}

/* ── Thumbnail ── */
/* z-index:0으로 명시적 stacking context 생성 — overlay가 이 context 안에 격리됨.
   __actions(z-index:1)가 preview stacking context 전체보다 위에 그려지도록 보장 */
.file-upload-item__preview {
  position: relative;
  z-index: 0;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--color-surface-neutral);
}
.file-upload-item__thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 흰 이미지에서도 버튼이 보이도록 항상 표시되는 아주 연한 뉴트럴 레이어 */
.file-upload-item__preview::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-surface-scrim);
  pointer-events: none;
  z-index: 0;
}

/* hover overlay: 어두운 반투명 레이어 + 돋보기 아이콘 중앙 */
.file-upload-item__overlay {
  position: absolute;
  inset: 0;
  background: var(--color-action-neutral-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-inverse);
  opacity: 0;
  transition: opacity var(--duration-fast) var(--easing-base);
  pointer-events: none;
}
.file-upload-item__overlay > svg {
  width: var(--icon-lg);
  height: var(--icon-lg);
}
/* 마우스 hover 시 오버레이 표시 */
.file-upload-item:hover .file-upload-item__overlay {
  opacity: 1;
}
/* 액션 버튼 hover 시 미리보기 overlay 억제 */
.file-upload-item:has(.file-upload-item__actions:hover) .file-upload-item__overlay {
  opacity: 0;
}

/* ── Actions (카드 기준 absolute — preview stacking context(z-index:0) 위) ── */
/* z-index:1로 __preview stacking context 전체보다 위에 그려짐 */
.file-upload-item__actions {
  position: absolute;
  bottom: var(--space-gap-xs);
  right: var(--space-gap-xs);
  display: flex;
  gap: var(--space-gap-2xs);
  z-index: 1;
}
```

---

## 접근성

| 상황 | 마크업 |
|------|--------|
| 파일 입력 | `<input type="file" hidden>` — 버튼으로 프로그래매틱 트리거 (`.click()`) |
| 추가하기 버튼 | 버튼 텍스트로 역할 전달. `aria-label` 불필요 |
| 다운로드·삭제 버튼 | 이미지 위에 떠있는 아이콘 전용 버튼 → `aria-label="다운로드"`, `aria-label="삭제"` 필수 |
| 드래그 상태 | `file-upload--drag-over`는 시각 피드백 전용. AT 사용자는 파일 입력 버튼 경로 사용 |
| 용량 초과 | 추가하기 버튼에 `disabled` + `aria-disabled="true"` + `tabindex="-1"`. 드래그 거부는 시각 피드백만 — AT 사용자는 버튼 비활성화로 인지 |
| 파일명 | `alt=""` 빈 alt — 파일명은 `.file-upload-item__name`에 텍스트로 제공 |
| 키보드 — `Tab` | 추가하기 버튼 → 각 파일 카드 버튼 순서로 포커스 이동 |
| 키보드 — `Enter` · `Space` | 포커스된 버튼 활성화 |

---

## Do / Don't

> ✅ DO — 용량 제한을 `.file-upload__constraint`로 항상 표시
> 사용자가 업로드 전에 제한을 인지할 수 있어야 함

> ❌ DON'T — 파일 업로드 진행 상태를 별도 안내 없이 처리
> 업로드 중임을 나타내는 피드백(스피너, 진행률)을 카드 또는 컨테이너에 추가할 것

> ✅ DO — 다운로드·삭제 아이콘 버튼에 `aria-label` 제공
> 아이콘만으로는 스크린 리더가 버튼 역할을 알 수 없음

> ❌ DON'T — 드래그·드롭만 허용하고 버튼 경로 제거
> 키보드·터치 사용자를 위해 `.file-upload__trigger` 버튼 경로는 항상 유지

> ✅ DO — 파일명을 `.file-upload-item__name`에 텍스트로 제공
> 썸네일 `alt`는 빈 값으로 두어 중복 읽힘을 방지하고 파일명 텍스트로 대체

> ❌ DON'T — `file-upload__grid`를 1열로 고정
> auto-fill 그리드가 기본 레이아웃. 단일 파일만 허용하는 특수 케이스 외에는 변경하지 말 것

> ✅ DO — 용량 초과 시 `file-upload--capacity-full` 클래스 추가 + 추가하기 버튼 `disabled`
> 시각·키보드 모두 업로드 불가임을 명확히 전달

> ❌ DON'T — 용량 초과 후 drag-over를 brand 톤으로 유지
> 용량 초과 drag-over는 반드시 error 톤(`color-border-error` + `color-action-error-hover`)으로 교체해 불가임을 알린다

---

## 플래너 패턴

```html
<!-- 클래스 고정 · {중괄호}는 컨텍스트에 맞게 교체 -->
<div class="file-upload" id="{id}">
  <div class="file-upload__header">
    <span class="text-form-label file-upload__label">{레이블}</span>
    <span class="text-form-label file-upload__usage" id="{usage-id}">{0MB} / {2MB}</span>
  </div>
  <div class="file-upload__meta">
    <p class="text-body file-upload__description">{안내 문구}</p>
    <p class="text-body file-upload__constraint">*파일당 {10}MB 이하 업로드 가능</p>
  </div>
  <div class="file-upload__dropzone" id="{dropzone-id}">
    <input type="file" hidden accept="{image/*}" multiple>
    <button class="btn btn--secondary btn--sm btn--icon-left" type="button">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-plus"/></svg></span>추가하기
    </button>
    <div class="file-upload__grid" id="{grid-id}"></div>
  </div>
</div>
```

파일 카드 구조(JS 생성): `div.file-upload-item` > `p.text-form-label.file-upload-item__name` + `div.file-upload-item__preview` > `img.file-upload-item__thumb[alt=""]` + `div.file-upload-item__overlay[aria-hidden]` + `div.file-upload-item__actions` > `btn[aria-label="다운로드"]` + `btn[aria-label="삭제"]`
상태: `file-upload--drag-over` · `file-upload--capacity-full` (추가하기 버튼에 `disabled` 추가)
JS init: `initFileUpload(el)`
