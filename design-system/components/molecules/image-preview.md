---
file: components/molecules/image-preview.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/radius.md, tokens/shadow.md, tokens/motion.md, tokens/z-index.md, components/atoms/icon-button.md
---

# ImagePreview

## 개요

이미지를 원본 비율로 확대하여 보여주는 라이트박스 모달. 스크림 레이어 위에 이미지와 닫기 버튼이 표시된다. FileUpload 파일 카드 썸네일 클릭 시 트리거되며, 독립적으로도 사용 가능하다.

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
- 이미지 최대 너비·높이는 뷰포트의 90%로 제한. 원본 비율은 항상 유지한다.
- 스크림 클릭 또는 `Escape` 키로 닫을 수 있어야 한다.
- 열린 동안 스크롤은 잠근다 (`body` `overflow: hidden`).

---

## 동작

| 이벤트 | 동작 |
|--------|------|
| 썸네일 클릭 | `image-preview--visible` 추가 → 스크림·이미지 등장 |
| 스크림 클릭 | `image-preview--visible` 제거 → 닫힘 |
| 닫기 버튼 클릭 | `image-preview--visible` 제거 → 닫힘 |
| `Escape` | `image-preview--visible` 제거 → 닫힘 |

:::preview
<div style="min-height:200px;background:var(--color-surface-subtle);border-radius:var(--radius-md);padding:var(--space-inset-xl);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:var(--space-gap-md)">

<p class="text-body" style="color:var(--color-text-subtle);margin:0">아래 이미지를 클릭하세요</p>

<img id="demo-thumb" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='120'%3E%3Crect width='160' height='120' fill='%23e8eef8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b8ccc' font-size='12'%3EIMG%3C/text%3E%3C/svg%3E"
  alt="미리보기 이미지"
  style="width:160px;height:120px;object-fit:cover;border-radius:var(--radius-md);cursor:pointer;display:block;">

<div class="image-preview" id="demo-image-preview" role="dialog" aria-modal="true" aria-label="이미지 미리보기">
  <div class="image-preview__scrim" id="demo-scrim"></div>
  <div class="image-preview__container">
    <img class="image-preview__img" id="demo-preview-img" src="" alt="확대 이미지">
    <button class="btn btn--ghost btn--sm btn--icon-only image-preview__close" type="button" aria-label="닫기">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
    </button>
  </div>
</div>

</div>
<script>
(function() {
  var thumb   = stage.querySelector('#demo-thumb');
  var preview = stage.querySelector('#demo-image-preview');
  var img     = stage.querySelector('#demo-preview-img');
  var scrim   = stage.querySelector('#demo-scrim');
  var closeBtn = stage.querySelector('.image-preview__close');

  function open(src) {
    img.src = src;
    preview.classList.add('image-preview--visible');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    preview.classList.remove('image-preview--visible');
    document.body.style.overflow = '';
  }

  thumb.addEventListener('click', function() { open(thumb.src); });
  scrim.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
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
  - scrim = div.image-preview__scrim — 반투명 스크림 레이어. 클릭 시 닫힘.
  - container = div.image-preview__container — 이미지 + 닫기 버튼 래퍼. 스크림 위에 중앙 배치.
    - img.image-preview__img — 원본 비율 유지. max 90vw·90vh.
    - button.btn.btn--ghost.btn--sm.btn--icon-only.image-preview__close[aria-label="닫기"] — 우상단 고정.
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">visible</span>
  <div style="position:relative;height:260px;border-radius:var(--radius-md);overflow:hidden;">
    <div data-component style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">
      <div class="image-preview image-preview--visible" style="position:absolute;inset:0;">
        <div class="image-preview__scrim"></div>
        <div class="image-preview__container">
          <img class="image-preview__img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect width='320' height='240' fill='%23e8eef8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b8ccc' font-size='16'%3EIMG%3C/text%3E%3C/svg%3E" alt="확대 이미지">
          <button class="btn btn--ghost btn--sm btn--icon-only image-preview__close" type="button" aria-label="닫기">
            <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></span>
          </button>
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
  background: var(--color-surface-dim); /* rgba(19,20,22,0.75) */
  cursor: pointer;
}

/* ── Container ── */
/* scrim 위에 이미지+닫기 버튼을 올리기 위해 position:relative + z-index:1 */
.image-preview__container {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Image ── */
.image-preview__img {
  display: block;
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
}

/* ── Close button ── */
/* 이미지 우상단 외부에 고정 */
.image-preview__close {
  position: absolute;
  top: calc(-1 * var(--space-gap-xl));
  right: calc(-1 * var(--space-gap-xl));
  color: var(--color-text-inverse);
}
.image-preview__close:hover {
  background: rgba(255, 255, 255, 0.15);
}
```

---

## FileUpload 연동

FileUpload `__overlay` 영역(`.file-upload-item__preview`) 클릭 시 ImagePreview를 트리거한다.

```js
// file-upload-item__preview 클릭 → ImagePreview 열기
previewEl.addEventListener('click', function() {
  imagePreview.open(thumbEl.src);
});
```

```css
/* __preview 전체를 클릭 가능 영역으로 — pointer-events 복원 */
.file-upload-item__preview {
  cursor: pointer;
}
/* overlay는 pointer-events:none 유지 — 클릭이 preview로 통과됨 */
```

---

## 접근성

| 상황 | 마크업 |
|------|--------|
| 루트 | `role="dialog"` `aria-modal="true"` `aria-label="이미지 미리보기"` |
| 열릴 때 | 닫기 버튼으로 포커스 이동 |
| 닫힐 때 | 트리거(썸네일)로 포커스 복귀 |
| 스크림 | `aria-hidden="true"` — 스크린 리더에게 노출 불필요 |
| 닫기 버튼 | `aria-label="닫기"` 필수 |
| `Escape` | 닫기 동작 필수 |

---

## Do / Don't

> ✅ DO — 스크림 클릭과 Escape 키 모두 닫기 지원
> 키보드·마우스 사용자 모두 직관적으로 닫을 수 있어야 함

> ❌ DON'T — 이미지를 고정 크기로 자르거나 늘리기
> `max-width: 90vw; max-height: 90vh`로 원본 비율을 항상 유지할 것

> ✅ DO — 열릴 때 body 스크롤 잠금
> 스크림 뒤 페이지가 스크롤되지 않도록 `overflow: hidden` 적용

> ❌ DON'T — ImagePreview를 편집 기능에 사용
> 보기 전용 컴포넌트. 편집·크롭이 필요하면 별도 모달을 사용할 것
