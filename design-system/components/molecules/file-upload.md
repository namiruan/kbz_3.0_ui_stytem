---
file: components/molecules/file-upload.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/shadow.md, tokens/typography.md, components/atoms/button.md, components/atoms/icon-button.md
---

# FileUpload

## 개요

파일을 드래그·드롭하거나 버튼으로 직접 업로드하는 영역. 선택된 파일을 카드 그리드로 나열하며, 개별 파일의 미리보기·다운로드·삭제를 지원한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| 상태 | default · drag-over → `file-upload--drag-over` | default |
| 파일 유무 | empty (파일 없음) · populated (파일 있음) | empty |

`file-upload--drag-over`: 드래그가 컴포넌트 위에 올라왔을 때. 테두리 색을 `--color-border-brand`으로 강조하고 배경을 한 단계 진하게 표시한다.

---

## 사용 지침

| 상황 | 권장 |
|------|------|
| 파일 첨부가 필요한 폼 | FileUpload 사용 |
| 단일 파일만 허용하는 경우 | 카드 그리드 max 1열 또는 `<input type="file">` 인라인 사용 |
| 용량·형식 제한이 있는 경우 | `.file-upload__constraint`로 빨간 텍스트 안내 필수 |

**제약**
- 파일 카드는 `file-upload__grid`에서 2열 고정. 모바일처럼 좁은 컨테이너에서는 1열로 래핑.
- 용량 제한 초과·지원하지 않는 형식은 카드 추가 시 inline 에러 처리로 안내한다 (컴포넌트 외부 로직).

---

## 동작

| 이벤트 | 동작 |
|--------|------|
| 추가하기 버튼 클릭 | 파일 선택 다이얼로그 열기 (`<input type="file" hidden>` trigger) |
| 드래그 진입 (`dragenter` / `dragover`) | `file-upload--drag-over` 클래스 추가 |
| 드래그 이탈 (`dragleave`) | `file-upload--drag-over` 클래스 제거 |
| 드롭 (`drop`) | `file-upload--drag-over` 제거 → 파일 카드 추가 |
| 파일 카드 hover | `.file-upload-item__overlay` 표시 — 어두운 반투명 레이어 + 돋보기 아이콘 중앙 |
| 다운로드 버튼 클릭 | 해당 파일 다운로드 |
| 삭제 버튼 클릭 | 해당 카드 제거 |

:::preview
<div style="min-height:120px;background:var(--color-surface-subtle);border-radius:var(--radius-md);padding:var(--space-inset-xl);">

<div class="file-upload" id="demo-file-upload">
  <input type="file" id="demo-file-input" hidden multiple accept="image/*">
  <div class="file-upload__header">
    <span class="text-form-label file-upload__label" style="font-weight:var(--font-weight-heading)">첨부파일</span>
    <span class="text-form-label file-upload__usage" id="demo-usage">0MB / 200MB</span>
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

</div>
<script>
(function() {
  var input  = stage.querySelector('#demo-file-input');
  var grid   = stage.querySelector('#demo-grid');
  var addBtn = stage.querySelector('#demo-add-btn');
  var zone   = stage.querySelector('#demo-dropzone');
  var usage  = stage.querySelector('#demo-usage');
  var upload = stage.querySelector('#demo-file-upload');
  var totalBytes = 0;

  function fmt(bytes) {
    return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
  }

  function addCard(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var item = document.createElement('div');
      item.className = 'file-upload-item';
      item.innerHTML =
        '<p class="text-form-label file-upload-item__name">' + file.name + '</p>' +
        '<div class="file-upload-item__preview">' +
          '<img src="' + e.target.result + '" class="file-upload-item__thumb" alt="">' +
          '<div class="file-upload-item__overlay" aria-hidden="true">' +
            '<svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg>' +
          '</div>' +
        '</div>' +
        '<div class="file-upload-item__actions">' +
          '<button class="icon-on--md" type="button" aria-label="다운로드"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></button>' +
          '<button class="icon-on--md" type="button" aria-label="삭제"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></button>' +
        '</div>';
      item.querySelector('[aria-label="삭제"]').addEventListener('click', function() {
        totalBytes -= file.size;
        usage.textContent = fmt(totalBytes) + ' / 200MB';
        item.remove();
      });
      grid.appendChild(item);
      totalBytes += file.size;
      usage.textContent = fmt(totalBytes) + ' / 200MB';
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
    Array.from(e.dataTransfer.files).forEach(addCard);
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.file-upload — 세로 스택. 드래그 상태: file-upload--drag-over 클래스 추가.
- header = div.file-upload__header — 레이블 + 용량 표시 가로 배치 (space-between).
  - label = span.text-form-label.file-upload__label — 섹션 제목 (예: "첨부파일"). font-weight-heading으로 굵게.
  - usage = span.text-form-label.file-upload__usage — "0MB / 200MB" 용량 현황. color-text-subtle.
- meta = div.file-upload__meta — description + constraint 세로 스택.
  - description = p.text-body.file-upload__description — 업로드 안내 문구.
  - constraint = p.text-body.file-upload__constraint — 제한 안내 (예: "*파일당 10MB 이하"). color-text-error.
- dropzone = div.file-upload__dropzone — 파일 드롭 영역. 파란 배경(color-surface-brand-subtle).
  - trigger = button.btn.btn--secondary.btn--sm.btn--icon-left — "추가하기" 버튼. input[type=file][hidden] trigger.
  - grid = div.file-upload__grid — 2열 카드 그리드.
    - item = div.file-upload-item — 파일 카드.
      - name = p.text-form-label.file-upload-item__name — 파일명 (한 줄 말줄임).
      - preview = div.file-upload-item__preview — 썸네일 컨테이너 (aspect-ratio 유지).
        - thumb = img.file-upload-item__thumb — 이미지 (object-fit: cover).
        - overlay = div.file-upload-item__overlay — hover 시 표시. 어두운 반투명 레이어 + 돋보기 SVG 중앙 배치.
      - actions = div.file-upload-item__actions — 카드(file-upload-item) 기준 우하단 absolute. preview 안에 두지 않음 — overlay stacking context 밖이어야 hover 시에도 항상 앞에 표시됨.
        - button.icon-on--md[aria-label="다운로드"] — icon-download
        - button.icon-on--md[aria-label="삭제"] — icon-delete
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">empty</span>
  <div data-component class="file-upload">
    <div class="file-upload__header">
      <span class="text-form-label file-upload__label" style="font-weight:var(--font-weight-heading)">첨부파일</span>
      <span class="text-form-label file-upload__usage">0MB / 200MB</span>
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
      <span class="text-form-label file-upload__usage">4.2MB / 200MB</span>
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
          <p class="text-form-label file-upload-item__name">document_001.jpg</p>
          <div class="file-upload-item__preview">
            <img class="file-upload-item__thumb" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='120'%3E%3Crect width='160' height='120' fill='%23e8eef8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b8ccc' font-size='12'%3EIMG%3C/text%3E%3C/svg%3E" alt="">
            <div class="file-upload-item__overlay" aria-hidden="true">
              <svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg>
            </div>
          </div>
          <div class="file-upload-item__actions">
            <button class="icon-on--md" type="button" aria-label="다운로드"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></button>
            <button class="icon-on--md" type="button" aria-label="삭제"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></button>
          </div>
        </div>
        <div class="file-upload-item">
          <p class="text-form-label file-upload-item__name">document_002.jpg</p>
          <div class="file-upload-item__preview">
            <img class="file-upload-item__thumb" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='120'%3E%3Crect width='160' height='120' fill='%23f0e8e8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23cc6b6b' font-size='12'%3EIMG%3C/text%3E%3C/svg%3E" alt="">
            <div class="file-upload-item__overlay" aria-hidden="true">
              <svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg>
            </div>
            <div class="file-upload-item__actions">
              <button class="icon-on--md" type="button" aria-label="다운로드"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></button>
              <button class="icon-on--md" type="button" aria-label="삭제"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></button>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">drag-over</span>
  <div data-component class="file-upload file-upload--drag-over">
    <div class="file-upload__header">
      <span class="text-form-label file-upload__label" style="font-weight:var(--font-weight-heading)">첨부파일</span>
      <span class="text-form-label file-upload__usage">0MB / 200MB</span>
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
  background: var(--color-surface-brand-subtle); /* 파란 드롭 영역 */
  border: var(--stroke-sm) dashed var(--color-border-brand-subtle);
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

/* ── File card grid ── */
.file-upload__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  padding: var(--space-inset-xl) var(--space-inset-xl) var(--space-gap-xs);
}

/* ── Thumbnail ── */
/* position:relative — overlay·actions 절대 위치 기준점 */
/* padding 없이 카드 가득 채움 — 모서리 클리핑은 부모 overflow:hidden 처리 */
.file-upload-item__preview {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--color-surface-neutral);
}
.file-upload-item__thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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

/* ── Actions (카드 기준 absolute — preview stacking context 밖) ── */
/* .file-upload-item(position:relative)를 기준점으로 우하단에 고정.
   preview 내부 stacking context에 묶이지 않으므로 overlay와 z-index 충돌 없음 */
.file-upload-item__actions {
  position: absolute;
  bottom: var(--space-gap-xs);
  right: var(--space-gap-xs);
  display: flex;
  gap: var(--space-gap-2xs);
  color: var(--color-text-inverse);
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
> 2열 그리드가 기본 레이아웃. 단일 파일만 허용하는 특수 케이스 외에는 변경하지 말 것
