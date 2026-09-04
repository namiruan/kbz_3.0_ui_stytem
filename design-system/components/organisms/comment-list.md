---
file: components/organisms/comment-list.md
version:    0.1.0
status:     draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, components/atoms/avatar.md, components/atoms/button.md, components/atoms/textarea.md, components/atoms/badge.md, components/organisms/empty-state.md, components/molecules/alert.md, product.md
---

# CommentList

## 개요

글 아래에 달리는 댓글의 목록과 작성 폼. 한 덩어리로 다룬다 — 읽는 것과 쓰는 것이 같은 자리에서 이어지고, 댓글 수·빈 상태·작성 폼이 서로를 참조하기 때문이다.

ContentList와의 차이 — ContentList는 **글을 고르는** 목록이라 행이 링크이고 정렬·필터·페이지가 붙는다. CommentList는 **이미 고른 글에 딸린 대화**라 행이 링크가 아니고, 전부 한 화면에 펼쳐진다.

Table과의 차이 — 댓글은 열이 없다. 값을 비교하는 것이 아니라 사람이 쓴 문장을 순서대로 읽는다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| form | 있음(기본) — `.comment-form` 슬롯 · 없음 — 슬롯을 두지 않는다 | 있음 |
| reply | 없음(기본) · 답글 → `li.comment` 안에 `ul.comment-list--replies` | 없음 |
| state | default · 수정 중 → `comment--editing` · 삭제됨 → `comment--deleted` | default |

state는 항목(`.comment`) 단위다. `comment--editing`은 JS가 토글한다(동작 참조).

---

## 사용 지침

### 작성 폼은 목록 **아래**에 둔다

게시판 댓글은 **읽고 나서 쓴다.** 폼을 위에 두면 화면을 연 사람이 가장 먼저 만나는 것이 빈 입력창이 되고, 남이 쓴 말을 읽기 전에 쓰라는 화면이 된다. SNS 타임라인은 쓰는 것이 첫 행동이라 위가 맞지만, 글에 딸린 댓글은 그렇지 않다.

답글 폼은 예외다 — 답할 댓글 **바로 아래**에 연다. 무엇에 답하는지가 자리로 드러나야 한다.

### 답글은 한 단계까지만

`ul.comment-list--replies`는 `li.comment` 안에 **한 번만** 중첩한다. 두 단계를 넘기면 좁은 화면에서 들여쓰기가 본문 폭을 먹고, 답글의 답글이 누구에게 하는 말인지 오히려 흐려진다. 더 깊은 대화가 필요하면 그건 댓글이 아니라 새 글이다.

**답글을 쓸지 말지는 제품이 정한다.** 마크업 자리는 열어 뒀지만 모든 게시판에 답글이 있어야 하는 것은 아니다 — 공지사항처럼 한 방향으로만 알리는 게시판에는 두지 않는다.

### 수정은 인라인, 삭제는 확인

| 동작 | 방식 | 이유 |
|---|---|---|
| 수정 | **그 자리에서** 본문이 textarea로 바뀐다 | 댓글은 짧고, 모달을 띄우면 앞뒤 맥락이 가려진다 |
| 삭제 | Alert로 **확인 한 번** | 비가역 행동은 확인 단계를 둔다(`product.md`) |

**수정·삭제 버튼은 본인 댓글에만 둔다.** 남의 댓글에 비활성 버튼을 남기면 누를 수 있는 것처럼 보이고 자리만 차지한다 — 권한이 없으면 그리지 않는다.

### 삭제된 댓글

답글이 달린 댓글을 지우면 대화의 고리가 끊긴다. 그런 경우 항목을 없애지 않고 `comment--deleted`로 남긴다 — 본문 자리에 "삭제된 댓글입니다"가 서고 아바타·이름·액션은 사라진다. 답글이 없으면 그냥 지운다.

### 제약

- **페이지네이션·정렬을 두지 않는다.** 댓글은 전부 펼쳐 시간순으로 읽는 것이다. 수백 개가 달리는 게시판이라면 그건 댓글이 아니라 다른 화면이고, 필요해지면 `_requests.md`에 남긴다.
- **좋아요·신고 같은 반응은 정의하지 않았다.** 필요해지면 액션 줄에 버튼을 더하기 전에 요청을 남긴다 — 반응은 수를 세고 상태를 저장해야 해서 표시 규칙이 따로 필요하다.

---

## 동작

`initCommentList(container)`가 처리한다 — 수정 진입·취소, 답글 폼 열기·닫기, 글자 수. 등록·저장·삭제의 **전송**은 호스트가 맡는다(이 컴포넌트는 화면 상태만 바꾼다).

| 이벤트 | 동작 |
|--------|------|
| 수정 클릭 | 그 항목에 `comment--editing` 추가. 본문이 숨고 편집 폼이 열리며 textarea에 포커스 + 커서가 글 끝으로 |
| 편집 취소 | `comment--editing` 제거. 값을 원래 본문으로 되돌린다 |
| 답글 클릭 | 그 항목의 답글 폼을 연다(다른 답글 폼은 닫는다 — 두 곳에 쓰다 만 글이 남지 않게) |
| 입력 | `maxlength`가 있으면 `[현재]/[최대]`를 갱신. 초과는 브라우저가 막으므로 색은 바꾸지 않는다 |
| 빈 입력 | 등록·저장 버튼 `disabled`. 공백만 있는 경우도 포함 |

:::preview
<div id="cl-demo" style="max-width:720px">
  <section class="comment-list-container" aria-labelledby="cl-demo-title">
    <h2 class="text-card-title comment-list__title" id="cl-demo-title">댓글 <span class="comment-list__count">2</span></h2>
    <ul class="comment-list">
      <li class="comment">
        <span class="avatar avatar--xs avatar--c1" aria-hidden="true"><span class="avatar__initials" aria-hidden="true">이</span></span>
        <div class="comment__main">
          <p class="comment__meta"><span class="comment__author">이수민</span><time datetime="2024-03-21">2024.03.21</time></p>
          <p class="comment__body">저도 같은 강습회 들었는데 원하도급 사례가 특히 도움이 됐어요. 자료는 어디서 받나요?</p>
          <div class="comment__actions">
            <button class="btn btn--ghost btn--xs text-button-sm" type="button" data-comment-reply>답글</button>
          </div>
        </div>
      </li>
      <li class="comment">
        <span class="avatar avatar--xs avatar--c6" aria-hidden="true"><span class="avatar__initials" aria-hidden="true">박</span></span>
        <div class="comment__main">
          <p class="comment__meta"><span class="comment__author">박지훈</span><span class="badge badge--brand">작성자</span><time datetime="2024-03-23">2024.03.23</time></p>
          <p class="comment__body">자료는 통합자료실에 올라와 있습니다. 「건설업 보험료신고 이론」 찾아보세요.</p>
          <div class="comment__actions">
            <button class="btn btn--ghost btn--xs text-button-sm" type="button" data-comment-reply>답글</button>
            <button class="btn btn--ghost btn--xs text-button-sm" type="button" data-comment-edit>수정</button>
            <button class="btn btn--ghost btn--xs text-button-sm" type="button">삭제</button>
          </div>
        </div>
      </li>
    </ul>
    <form class="comment-form" data-comment-form>
      <span class="avatar avatar--xs avatar--c3" aria-hidden="true"><span class="avatar__initials" aria-hidden="true">김</span></span>
      <div class="comment-form__main">
        <label class="sr-only" for="cl-demo-input">댓글 입력</label>
        <textarea class="textarea comment-form__input" id="cl-demo-input" rows="2" maxlength="300" placeholder="댓글을 입력하세요"></textarea>
        <div class="comment-form__footer">
          <span class="text-helper comment-form__count" data-comment-count>0/300</span>
          <button class="btn btn--primary btn--sm text-button-sm" type="submit" disabled>등록</button>
        </div>
      </div>
    </form>
  </section>
</div>
<script>
initCommentList(stage.querySelector('#cl-demo'));
stage.querySelector('#cl-demo').addEventListener('submit', function(e) { e.preventDefault(); });
</script>
:::

```js init
/* AI: initCommentList(container) — .comment-list-container 초기화.
   수정 진입·취소, 답글 폼 열고 닫기, 글자 수, 빈 입력 시 전송 버튼 잠금.
   등록·저장·삭제의 전송은 호스트가 맡는다 — 이 함수는 화면 상태만 바꾼다.
   프로토타입에서 직접 구현하지 말고 이 함수에 위임한다. */
function initCommentList(container) {
  container.querySelectorAll('.comment-list-container').forEach(function(root) {
    if (root.dataset.initCommentList) return;
    root.dataset.initCommentList = '1';

    /* 빈 입력이면 전송을 잠근다. trim으로 재는 이유 — 공백만 있는 댓글은 내용이 없다. */
    function syncForm(form) {
      var input = form.querySelector('.comment-form__input');
      var submit = form.querySelector('[type="submit"]');
      var count = form.querySelector('[data-comment-count]');
      if (!input) return;
      if (submit) submit.disabled = input.value.trim().length === 0;
      if (count && input.maxLength > 0) count.textContent = input.value.length + '/' + input.maxLength;
    }

    root.addEventListener('input', function(e) {
      var form = e.target.closest('.comment-form');
      if (form) syncForm(form);
    });

    root.addEventListener('click', function(e) {
      var editBtn = e.target.closest('[data-comment-edit]');
      if (editBtn) {
        var item = editBtn.closest('.comment');
        var body = item.querySelector('.comment__body');
        var area = item.querySelector('.comment__edit .comment-form__input');
        item.classList.add('comment--editing');
        if (area) {
          area.value = body ? body.textContent.trim() : '';
          area.focus();
          /* 커서를 글 끝으로 — 고치려고 연 것이므로 이어 쓰는 자리가 맞다 */
          area.setSelectionRange(area.value.length, area.value.length);
          syncForm(area.closest('.comment-form'));
        }
        return;
      }

      var cancelBtn = e.target.closest('[data-comment-edit-cancel]');
      if (cancelBtn) {
        cancelBtn.closest('.comment').classList.remove('comment--editing');
        return;
      }

      var replyBtn = e.target.closest('[data-comment-reply]');
      if (replyBtn) {
        var target = replyBtn.closest('.comment').querySelector(':scope > .comment__main > .comment__reply-form');
        if (!target) return;
        /* 다른 답글 폼은 닫는다 — 두 곳에 쓰다 만 글이 남으면 어느 쪽이 살아 있는지 모른다 */
        root.querySelectorAll('.comment__reply-form').forEach(function(f) { if (f !== target) f.hidden = true; });
        target.hidden = !target.hidden;
        if (!target.hidden) {
          var ta = target.querySelector('.comment-form__input');
          if (ta) ta.focus();
        }
        return;
      }

      var replyCancel = e.target.closest('[data-comment-reply-cancel]');
      if (replyCancel) replyCancel.closest('.comment__reply-form').hidden = true;
    });

    root.querySelectorAll('.comment-form').forEach(syncForm);
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initCommentList) window.__componentInits.initCommentList = initCommentList;
```

---

## Anatomy

<!-- AI:
- root = section.comment-list-container. aria-labelledby로 제목과 묶는다.
- title = h2.comment-list__title — "댓글 N". 수는 span.comment-list__count로 감싼다(JS가 갱신).
- list = ul.comment-list — 항목 나열. 댓글이 없으면 ul 대신 EmptyState를 둔다.
  - item = li.comment
    - avatar = span.avatar.avatar--xs — 항상 xs(avatar.md size 기준표). aria-hidden — 이름이 바로 옆에 있다.
    - main = div.comment__main
      - meta = p.comment__meta — span.comment__author(이름) + (선택)badge + time. 순서 고정.
      - body = p.comment__body — 본문. 줄바꿈은 white-space가 살린다.
      - actions = div.comment__actions — 답글·수정·삭제. btn--ghost btn--xs. **권한 없는 버튼은 그리지 않는다.**
      - edit = form.comment-form.comment__edit — 수정 폼. 항상 마크업에 두고 comment--editing일 때만 보인다.
      - reply-form = form.comment-form.comment__reply-form[hidden] — 답글 폼. JS가 hidden을 토글한다.
    - replies = ul.comment-list.comment-list--replies — 답글. **한 단계까지만.**
- form = form.comment-form[data-comment-form] — 새 댓글. 목록 **아래**.
  - textarea에 maxlength가 있으면 span[data-comment-count]에 "현재/최대"를 쓴다.
- 삭제됨 = li.comment.comment--deleted — 본문만 남기고 아바타·액션을 빼며 body에 "삭제된 댓글입니다".
-->

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">기본</span>
  <section data-component class="comment-list-container" aria-labelledby="cl-a" style="width:100%">
    <h2 class="text-card-title comment-list__title" id="cl-a">댓글 <span class="comment-list__count">3</span></h2>
    <ul class="comment-list">
      <li class="comment">
        <span class="avatar avatar--xs avatar--c1" aria-hidden="true"><span class="avatar__initials" aria-hidden="true">이</span></span>
        <div class="comment__main">
          <p class="comment__meta"><span class="comment__author">이수민</span><time datetime="2024-03-21">2024.03.21</time></p>
          <p class="comment__body">원하도급 사례가 특히 도움이 됐어요. 자료는 어디서 받나요?</p>
          <div class="comment__actions">
            <button class="btn btn--ghost btn--xs text-button-sm" type="button">답글</button>
          </div>
        </div>
        <ul class="comment-list comment-list--replies">
          <li class="comment">
            <span class="avatar avatar--xs" aria-hidden="true"></span>
            <div class="comment__main">
              <p class="comment__meta"><span class="comment__author">관리자</span><time datetime="2024-03-22">2024.03.22</time></p>
              <p class="comment__body">통합자료실에 올라와 있습니다.</p>
            </div>
          </li>
        </ul>
      </li>
      <li class="comment comment--deleted">
        <div class="comment__main">
          <p class="comment__body">삭제된 댓글입니다.</p>
        </div>
      </li>
    </ul>
  </section>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">수정 중</span>
  <section data-component class="comment-list-container" style="width:100%">
    <ul class="comment-list">
      <li class="comment comment--editing">
        <span class="avatar avatar--xs avatar--c6" aria-hidden="true"><span class="avatar__initials" aria-hidden="true">박</span></span>
        <div class="comment__main">
          <p class="comment__meta"><span class="comment__author">박지훈</span><span class="badge badge--brand">작성자</span><time datetime="2024-03-23">2024.03.23</time></p>
          <p class="comment__body">자료는 통합자료실에 올라와 있습니다.</p>
          <form class="comment-form comment__edit">
            <div class="comment-form__main">
              <label class="sr-only" for="cl-edit">댓글 수정</label>
              <textarea class="textarea comment-form__input" id="cl-edit" rows="2">자료는 통합자료실에 올라와 있습니다.</textarea>
              <div class="comment-form__footer">
                <span></span>
                <span class="comment-form__buttons">
                  <button class="btn btn--ghost btn--sm text-button-sm" type="button" data-comment-edit-cancel>취소</button>
                  <button class="btn btn--primary btn--sm text-button-sm" type="submit">저장</button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </li>
    </ul>
  </section>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">댓글 없음</span>
  <section data-component class="comment-list-container" aria-labelledby="cl-b" style="width:100%">
    <h2 class="text-card-title comment-list__title" id="cl-b">댓글 <span class="comment-list__count">0</span></h2>
    <div class="empty-state empty-state--compact">
      <div class="empty-state__body">
        <p class="empty-state__title text-body">아직 댓글이 없어요</p>
        <p class="empty-state__description text-body">첫 댓글을 남겨보세요.</p>
      </div>
    </div>
    <form class="comment-form">
      <span class="avatar avatar--xs avatar--c3" aria-hidden="true"><span class="avatar__initials" aria-hidden="true">김</span></span>
      <div class="comment-form__main">
        <label class="sr-only" for="cl-c">댓글 입력</label>
        <textarea class="textarea comment-form__input" id="cl-c" rows="2" maxlength="300" placeholder="댓글을 입력하세요"></textarea>
        <div class="comment-form__footer">
          <span class="text-helper comment-form__count">0/300</span>
          <button class="btn btn--primary btn--sm text-button-sm" type="submit" disabled>등록</button>
        </div>
      </div>
    </form>
  </section>
</div>
</div>
:::

---

## CSS

```css
/* ── Container ── */
/* 면·radius·그림자를 여기서 깔지 않는다 — 댓글은 글 상세의 한 블록이고,
   상자를 만드는 것은 이 컴포넌트를 담는 화면의 몫이다(ContentList와 같은 규칙).
   화면마다 카드 안에 넣을지 본문에 이어 붙일지가 다르다. */
.comment-list-container {
  display: block;
}

.comment-list__title {
  margin: 0 0 var(--space-stack-lg);
  color: var(--color-text-display);
}

/* 수는 제목과 같은 크기·굵기로 두되 색만 나눈다 — "댓글"과 "4"는 한 덩어리로 읽혀야 한다 */
.comment-list__count {
  color: var(--color-text-brand);
}

/* ── List ── */
.comment-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ── Item ── */
/* flex가 아니라 grid다 — 답글 목록(li의 셋째 자식)이 flex에서는 **아바타·본문 옆**에
   세 번째 칸으로 붙는다. grid로 두면 답글이 본문 아래 둘째 줄에 서고, 그 줄이
   본문과 같은 열(2번)이라 답글의 아바타가 부모 본문의 시작점에 정확히 선다 —
   들여쓰기를 px로 따로 잴 필요가 없다. */
.comment {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: var(--space-gap-md);
  padding: var(--space-stack-lg) 0;
  /* 행 사이 리듬선. ContentList와 같은 --color-border-faint —
     여러 줄이 이어질 때 선의 무게가 누적되지 않는 값이다. */
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-faint);
}
.comment:first-child { border-top: 0; padding-top: 0; }

.comment > .avatar { grid-column: 1; grid-row: 1; }

/* minmax(0, 1fr)로 열을 잡았으므로 긴 단어 하나가 들어와도 본문이 컨테이너를 밀지 않는다
   (URL이 붙는 자리라 실제로 일어난다). */
.comment__main { grid-column: 2; grid-row: 1; }

/* 아바타가 없는 항목(삭제됨)은 본문이 왼쪽 끝에서 시작한다 —
   폭 0인 1번 열이 남아도 column-gap만큼 안으로 밀리는 것을 막는다. */
.comment:not(:has(> .avatar)) .comment__main { grid-column: 1 / -1; }

/* ── Meta ── */
/* 이름 · 뱃지 · 시각. 구분자는 CSS가 넣는다 — 마크업에 「·」를 적으면
   뱃지가 붙고 빠질 때마다 구분자 개수를 손으로 맞춰야 한다. */
.comment__meta {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  flex-wrap: wrap;
  margin: 0 0 var(--space-stack-xs);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-ui);
  color: var(--color-text-subtle);
}

.comment__author {
  font-weight: var(--font-weight-heading);
  color: var(--color-text-body);
}

/* 시각 앞에만 가운뎃점 — 이름과 뱃지 사이에는 넣지 않는다(뱃지가 이미 경계를 만든다) */
.comment__meta > time::before {
  content: '·';
  margin-inline-end: var(--space-gap-xs);
  color: var(--color-text-subtle);
}

/* ── Body ── */
/* 사람이 쓴 문장이라 읽기용 사다리를 쓴다 — 본문(board)보다 한 단계 아래인 15px.
   본문과 같은 17px로 두면 댓글이 글만큼 무거워져 무엇이 글이고 무엇이 반응인지 흐려진다.
   line-height는 reading(1.5) — 여러 줄이 되는 글이다. */
.comment__body {
  margin: 0;
  font-size: var(--font-size-lg);
  line-height: var(--line-height-reading);
  color: var(--color-text-body);
  /* 사용자가 넣은 줄바꿈을 살리고, 긴 URL은 상자 안에서 끊는다 */
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

/* ── Actions ── */
.comment__actions {
  display: flex;
  gap: var(--space-gap-2xs);
  margin-top: var(--space-stack-xs);
  /* 버튼의 좌우 padding만큼 왼쪽으로 당긴다 — 당기지 않으면 본문 시작점보다
     글자가 안쪽으로 들어가 두 줄의 왼쪽 선이 어긋난다. */
  margin-inline-start: calc(-1 * var(--space-8));
}

/* ── Replies ── */
/* 답글은 본문과 **같은 열**(2번)의 둘째 줄에 선다 — 들여쓰기 폭을 px로 적지 않는다.
   아바타 크기나 간격이 바뀌면 따라 움직여야 하는데, 숫자로 박으면 그때 어긋난다. */
.comment-list--replies {
  grid-column: 2;
  grid-row: 2;
  margin-top: var(--space-stack-lg);
}
.comment-list--replies > .comment:first-child {
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-faint);
  padding-top: var(--space-stack-lg);
}

/* ── State: 삭제됨 ── */
/* 답글이 달린 댓글을 지우면 대화의 고리가 끊긴다 — 자리는 남기고 내용만 지운다.
   아바타·액션은 마크업에서 빼고, 남은 본문만 흐리게 둔다. */
.comment--deleted .comment__body {
  color: var(--color-text-subtle);
  font-style: italic;
}

/* ── State: 수정 중 ── */
/* 편집 폼은 항상 마크업에 있고 상태가 보임을 정한다 — JS가 폼을 만들어 넣으면
   그 안의 라벨·id·버튼 문구가 JS 문자열에 갇혀 화면마다 손댈 수 없다. */
.comment__edit { display: none; }
.comment--editing .comment__body,
.comment--editing .comment__actions { display: none; }
.comment--editing .comment__edit { display: flex; }

/* ── Form ── */
.comment-form {
  display: flex;
  gap: var(--space-gap-md);
  margin-top: var(--space-stack-lg);
}
.comment-form > .avatar { flex-shrink: 0; }

.comment-form__main {
  flex: 1;
  min-width: 0;
}

.comment-form__input {
  width: 100%;
  resize: vertical;
}

/* 글자 수는 왼쪽, 버튼은 오른쪽 — 읽는 값과 누르는 것을 양끝으로 가른다.
   글자 수가 없어도 자리가 유지되도록 space-between + 빈 span을 쓴다. */
.comment-form__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-gap-sm);
  margin-top: var(--space-stack-sm);
}

.comment-form__count {
  color: var(--color-text-subtle);
  font-variant-numeric: tabular-nums; /* 숫자가 바뀌어도 폭이 흔들리지 않는다 */
}

.comment-form__buttons {
  display: flex;
  gap: var(--space-gap-xs);
}

/* 수정 폼은 본문 자리를 그대로 쓴다 — 아바타는 항목이 이미 갖고 있다 */
.comment__edit { margin-top: 0; }

/* 답글 폼은 답할 댓글 바로 아래 */
.comment__reply-form[hidden] { display: none; }

/* sm에 따로 줄 것이 없다 — 들여쓰기가 아바타 열 하나(24+12=36px)뿐이라
   390px에서도 본문이 354px 남는다. 한 단계까지만 허용하는 규칙이 여기서 값을 한다. */
```

---

## 접근성

목록 유형 (`accessibility.md` 목록 행 적용). 키보드 접근·focus·색상 대비 해당.

| 상황 | 마크업 |
|------|--------|
| 루트 | `<section aria-labelledby="[제목 id]">` — 제목이 이 영역의 이름이다. 제목이 없으면 `aria-label="댓글"` |
| 목록 | `<ul>` + `<li>` — 개수를 스크린리더가 읽는다. `div`로 쌓으면 "몇 개 중 몇 번째"가 사라진다 |
| 시각 | `<time datetime="2024-03-21">` — 화면에 보이는 표기와 무관하게 기계가 읽는 값을 따로 준다 |
| 아바타 | `aria-hidden="true"` — 이름이 바로 옆에 있어 같은 이름을 두 번 읽지 않는다(`avatar.md`) |
| 작성 폼 | `<label class="sr-only">` 필수 — placeholder는 라벨이 아니다. 입력이 시작되면 사라진다 |
| 글자 수 | `aria-live`를 걸지 않는다 — 한 글자마다 읽으면 입력을 방해한다. 초과는 `maxlength`가 막는다 |
| 수정 중 | 본문을 `display:none`으로 감추므로 스크린리더에서도 사라진다. textarea에 같은 내용이 들어가 있어 정보가 빠지지 않는다 |
| 삭제 | Alert로 확인한다(`alert.md`) — 되돌릴 수 없는 행동이다 |

**수정 진입 시 포커스가 textarea로 이동하고 커서가 글 끝에 선다.** 고치려고 연 것이므로 이어 쓰는 자리가 맞고, 포커스를 옮기지 않으면 키보드 사용자는 편집창이 열린 것을 모른다.

```js example
// 수정 버튼 → textarea 포커스 + 커서 끝
area.focus();
area.setSelectionRange(area.value.length, area.value.length);
```

---

## Do / Don't

> ✅ DO — 권한 있는 동작만 그린다
> `<div class="comment__actions"><button …>수정</button><button …>삭제</button></div>` — 남의 댓글에는 이 줄을 두지 않는다

> ✅ DO — 시각은 `time`으로
> `<time datetime="2024-03-21">2024.03.21</time>`

> ❌ DON'T — 구분자를 마크업에 적기
> `<span>이수민</span> · <time>…</time>` — 뱃지가 붙고 빠질 때마다 「·」 개수를 손으로 맞춰야 한다. CSS가 넣는다

> ❌ DON'T — 남의 댓글에 비활성 버튼
> `<button class="btn btn--disabled" disabled>삭제</button>` — 누를 수 있는 것처럼 보이고 자리만 차지한다

> ❌ DON'T — 답글을 두 단계 이상 중첩
> `/* ul.comment-list--replies 안에 또 ul — 좁은 화면에서 본문 폭이 사라진다 */`

> ❌ DON'T — 작성 폼을 목록 위에
> `/* 게시판 댓글은 읽고 나서 쓴다. 위에 두면 남의 말을 읽기 전에 쓰라는 화면이 된다 */`

> ❌ DON'T — 편집 폼을 JS로 만들어 넣기
> `item.innerHTML += '<textarea>…'` — 라벨·id·버튼 문구가 JS 문자열에 갇혀 화면마다 손댈 수 없다. 마크업에 두고 상태로 보인다

> ⚠️ 등록·저장·삭제의 **전송**은 호스트가 맡는다. `initCommentList`는 화면 상태만 바꾼다
