---
file: components/organisms/content-body.md
version: 0.1.0
status: draft
updated: 2026-09-02
depends-on: components/_index.md, components/organisms/table/info.md, components/atoms/link.md, components/atoms/skeleton.md, components/molecules/banner.md, tokens/typography.md, tokens/space.md, tokens/color.md, adaptation.md, product.md, accessibility.md
---

# ContentBody

## 개요

CMS 에디터가 만든 **클래스 없는 HTML**에 시스템 타이포와 간격을 입히는 스코프 컨테이너. 게시판 상세 화면의 본문 자리다(→ `_requests.md` REQ-001).

에디터는 `h2`~`h4` · `p` · `ul/ol` · `table` · `img` · `blockquote` · `a`를 클래스 없이 뱉는다. 시스템은 클래스 기반이라 이 출력을 받을 곳이 없었고, 그래서 지금까지 브라우저 기본 스타일로 렌더됐다 — 본문만 다른 폰트·행간으로 떠 있었다.

다른 컴포넌트와의 구별점 — **이 컴포넌트는 마크업을 정의하지 않는다.** 안에 무엇이 들어올지 정하는 건 에디터고, ContentBody는 그것을 받는 **경계**다. 그래서 클래스가 아니라 태그 선택자로 스타일을 건다. 시스템에서 순수 태그 선택자를 쓰는 **유일한 예외 구간**이다.

읽기 폭 제한(max-width)을 두지 않는다 — `adaptation.md`의 "콘텐츠 영역에 max-width를 두지 않는다"를 그대로 따른다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| 상태 | 기본 · loading(`content-body--loading`) · error | 기본 |

variant가 이것뿐인 이유는 개요의 성격에서 나온다. 본문의 생김새를 결정하는 것은 에디터가 넣은 태그이지 이쪽의 수식자가 아니다. **크기·밀도 variant를 두지 않는다** — 밀도는 업무 화면과 하나이고(→ `product.md`), 읽기 화면이라고 행간·여백을 풀지 않는다.

empty 상태는 두지 않는다. 본문이 빈 게시물은 제목만 있는 글이라 화면에서 본문 영역 자체가 렌더되지 않으면 된다 — 빈 자리에 "내용 없음"을 띄우면 없는 것을 있는 것처럼 보이게 만든다.

---

## 사용 지침

### 안에 무엇을 넣는가

**CMS가 만든 HTML만 넣는다.** 버튼·폼·탭 같은 시스템 컴포넌트를 이 안에 두지 않는다. 태그 선택자는 깊이를 가리지 않으므로, 안에 들어온 컴포넌트의 `<p>`·`<a>`도 본문 스타일을 뒤집어쓴다.

부득이하게 시스템 컴포넌트가 섞이는 경우(본문 안 첨부 목록 등)를 위해, 충돌이 예상되는 세 태그는 **클래스가 붙은 요소를 비켜 간다**:

| 태그 | 비켜 가는 대상 | 이유 |
|---|---|---|
| `table` | `.table` | 본문 표와 시스템 테이블이 같은 태그를 쓴다 |
| `a` | `.link` · `.btn` | 링크 Atom과 버튼이 같은 태그를 쓴다 |
| `img` | `.avatar` 등 크기가 정해진 이미지 | `max-width: 100%`가 고정 크기를 덮어쓴다 |

이건 안전망이지 허가가 아니다. 컴포넌트를 넣어야 하면 ContentBody **밖에** 둔다.

### 표

본문 표는 `table--info`의 시각 톤을 그대로 쓴다(→ `table/info.md`). 새 표 스타일을 만들지 않는다. 다만 에디터 출력에는 클래스가 없으므로 태그 선택자로 같은 결과를 만든다 — 앱이 클래스를 붙일 수 있는 경로라면 `table--info table--dense`를 붙이는 쪽이 낫고, 그때는 위 규칙에 따라 이 컴포넌트가 비켜 간다.

**넓은 표는 자기 상자 안에서 가로 스크롤한다.** 열이 많은 표가 본문 폭을 넘으면 페이지 전체가 가로로 밀린다 — `sm`에서 특히 그렇다. CMS HTML을 넣은 뒤 표를 래퍼로 감싼다:

```js
stage.querySelectorAll('.content-body > table').forEach((t) => {
  const box = document.createElement('div');
  box.className = 'content-body__scroll';
  t.replaceWith(box);
  box.appendChild(t);
});
```

감싸지 못하는 환경이면 본문이 아니라 **표만** 넘치도록 두고, 페이지 컨테이너에서 가로 스크롤을 막지 않는다. 열을 줄이거나 접는 처리는 하지 않는다 — 표는 비교 대상이라 접으면 의미가 사라진다(→ `adaptation.md`).

### 상태

| 상태 | 처리 |
|---|---|
| loading | `content-body--loading` + Skeleton 줄. 본문은 길이를 모르므로 3~5줄로 충분하다 |
| error | 본문 자리에 Banner(`banner--error`)를 놓는다. 빈 본문으로 두지 않는다 — 실패와 "내용이 없음"이 구분되지 않는다 |

### `sm`

| | `md` 이상 | `sm` |
|---|---|---|
| 본문 글자 | `--font-size-base` (14px) | 같음 |
| 좌우 여백 | 페이지 컨테이너가 준다 | 같음 |
| 표 | 폭을 넘으면 래퍼 안에서 가로 스크롤 | 같음 |
| 이미지 | `max-width: 100%` | 같음 |

**`sm`에서 바뀌는 것이 없다.** 본문은 한 덩어리 글이라 접힐 열도, 숨길 부속도 없다 — 폭이 좁아지면 줄이 더 접힐 뿐이다. 이것이 게시판을 테이블로 만들지 않은 이유이기도 하다(→ REQ-001).

---

## Anatomy

:::preview
<p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">기본 — 에디터가 만든 클래스 없는 HTML. 아래 마크업에 클래스가 하나도 없다는 점이 요점이다.</p>
<div data-component class="content-body">
  <h2>보험료 신고 대상</h2>
  <p>건설업 사업주는 매년 3월 31일까지 전년도 확정보험료와 당해연도 개산보험료를 신고·납부해야 한다. 신고 대상은 아래와 같다.</p>
  <ul>
    <li>상시근로자 1인 이상을 사용하는 사업장</li>
    <li>총공사금액 2,000만원 이상인 건설공사
      <ul>
        <li>원도급공사 — 발주자로부터 직접 도급받은 공사</li>
        <li>하도급공사 — 하수급인 사업주 인정승인을 받은 경우</li>
      </ul>
    </li>
  </ul>
  <h3>제출 서류</h3>
  <p>아래 서류를 <a href="#">근로복지공단 토탈서비스</a>에서 전자 제출한다. 종이 신고는 2024년부터 받지 않는다.</p>
  <table>
    <thead>
      <tr><th scope="col">구분</th><th scope="col">서류</th><th scope="col">기한</th></tr>
    </thead>
    <tbody>
      <tr><td>확정</td><td>보수총액신고서</td><td>2024.03.31</td></tr>
      <tr><td>개산</td><td>개산보험료신고서</td><td>2024.03.31</td></tr>
      <tr><td>공통</td><td>공사원가명세서</td><td>수시</td></tr>
    </tbody>
  </table>
  <blockquote>보수총액은 소득세법상 비과세 근로소득을 제외한 금액이다. 식대·차량유지비를 포함해 신고하면 정정 대상이 된다.</blockquote>
  <h3>과태료</h3>
  <p>기한 내 신고하지 않으면 <code>보험료의 10%</code> 범위에서 연체금이 부과된다. 자세한 기준은 아래 표를 참고한다.</p>
  <ol>
    <li>1개월 이내 — 연체금 없음</li>
    <li>1개월 초과 — 매일 0.03% 가산</li>
  </ol>
  <figure>
    <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='200'%3E%3Crect width='640' height='200' fill='%23e6e8ea'/%3E%3Ctext x='320' y='106' font-family='sans-serif' font-size='15' fill='%236d7882' text-anchor='middle'%3E신고 절차 안내도%3C/text%3E%3C/svg%3E" alt="보험료 신고 절차 안내도">
    <figcaption>2024년 기준 신고 절차</figcaption>
  </figure>
  <hr>
  <p>문의: 김반장 고객센터 1588-0000</p>
</div>
:::

:::preview
<p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">넓은 표 — content-body__scroll로 감싸면 표만 가로 스크롤한다. 폭을 줄여보라.</p>
<div data-component class="content-body">
  <div class="content-body__scroll">
    <table>
      <thead>
        <tr><th scope="col">사업장</th><th scope="col">관리번호</th><th scope="col">보수총액</th><th scope="col">확정보험료</th><th scope="col">개산보험료</th><th scope="col">정산액</th><th scope="col">납부기한</th></tr>
      </thead>
      <tbody>
        <tr><td>○○건설 본사</td><td>12345-6-78901</td><td>1,240,000,000</td><td>18,600,000</td><td>17,800,000</td><td>800,000</td><td>2024.03.31</td></tr>
        <tr><td>○○건설 2공구</td><td>12345-6-78902</td><td>860,000,000</td><td>12,900,000</td><td>13,400,000</td><td>-500,000</td><td>2024.03.31</td></tr>
      </tbody>
    </table>
  </div>
</div>
:::

:::preview
<p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">loading — 본문은 길이를 모르므로 3~5줄</p>
<div data-component class="content-body content-body--loading" aria-busy="true">
  <span class="sr-only">본문을 불러오는 중</span>
  <span class="skeleton skeleton--text" style="width:100%"></span>
  <span class="skeleton skeleton--text" style="width:92%"></span>
  <span class="skeleton skeleton--text" style="width:96%"></span>
  <span class="skeleton skeleton--text" style="width:64%"></span>
</div>
:::

---

## CSS

```css
/* ── ContentBody ──────────────────────────────────────────────
   CMS 에디터 출력을 받는 스코프 컨테이너.
   **시스템에서 순수 태그 선택자를 쓰는 유일한 구간이다.** 안에 들어올 마크업을
   이쪽이 정하지 못하기 때문이다 — 클래스를 붙일 수 있으면 컴포넌트를 쓴다.
   그래서 모든 규칙을 .content-body 아래로 가둔다. 밖으로 새면 시스템 전체의
   태그 스타일이 되어버린다.
─────────────────────────────────────────────────────────────── */
.content-body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-reading);
  letter-spacing: var(--letter-spacing-default);
  font-weight: var(--font-weight-body);
  color: var(--color-text-body);
  /* 긴 URL·붙여넣은 코드가 폭을 밀어내지 않게. 본문은 사용자가 쓴 글이라
     한 단어가 컨테이너보다 긴 경우가 실제로 생긴다. */
  overflow-wrap: break-word;
}

/* ── 세로 리듬 ──
   개별 태그마다 margin을 주지 않고 "앞 형제가 있을 때만 위 여백"으로 건다.
   첫 요소의 위 여백과 마지막 요소의 아래 여백이 자동으로 0이 되어,
   본문 상자를 다른 것들과 붙일 때 여백을 상쇄하는 작업이 필요 없다. */
.content-body > * {
  margin: 0;
}
.content-body > * + * {
  margin-top: var(--space-stack-md);
}

/* 제목 위 여백은 아래보다 넓다 — 제목은 뒤따르는 문단의 것이지
   앞 문단의 꼬리가 아니다. 이 비대칭이 없으면 제목이 위아래 중간에 떠서
   어느 덩어리에 속하는지 읽히지 않는다.
   명시도(0,1,1)가 위 일반 규칙(0,1,0)을 이기므로 순서와 무관하게 적용된다. */
.content-body > * + h2 { margin-top: var(--space-stack-2xl); }
.content-body > * + h3 { margin-top: var(--space-stack-xl); }
.content-body > * + h4 { margin-top: var(--space-stack-lg); }
.content-body > h2 + *,
.content-body > h3 + *,
.content-body > h4 + * { margin-top: var(--space-stack-sm); }

/* ── 제목 ──
   에디터의 최상위 제목은 h2다 — h1은 화면의 글 제목(ContentHeader)이 갖는다.
   그래서 h2를 페이지 제목이 아니라 섹션 제목 크기(h3 토큰)에 맞춘다.
   본문 안에서 제목이 글 제목보다 커 보이면 위계가 뒤집힌다. */
.content-body h2,
.content-body h3,
.content-body h4 {
  font-weight: var(--font-weight-heading);
  line-height: var(--line-height-reading);
  color: var(--color-text-body);
}
.content-body h2 { font-size: var(--font-size-h3); }
.content-body h3 { font-size: var(--font-size-h4); }
.content-body h4 { font-size: var(--font-size-lg); }

/* ── 목록 ── */
.content-body ul,
.content-body ol {
  padding-inline-start: var(--space-inset-3xl);
}
.content-body li + li {
  margin-top: var(--space-stack-xs);
}
/* 중첩 목록은 문단 간격이 아니라 항목 간격으로 붙는다 —
   상위 항목과 하위 항목은 한 덩어리다. */
.content-body li > ul,
.content-body li > ol {
  margin-top: var(--space-stack-xs);
}
.content-body li::marker {
  color: var(--color-text-subtle);
}

/* ── 링크 ──
   Link Atom과 같은 값을 쓴다(link.md). 밑줄을 지우지 않는다 —
   본문에서 링크는 색만으로 구분되면 안 된다(색각·흑백 출력).
   .link·.btn이 붙은 요소는 비켜 간다 — 그건 컴포넌트다. */
.content-body a:not(.link):not(.btn) {
  color: var(--color-text-brand-vivid);
  text-decoration: underline;
  text-decoration-thickness: var(--stroke-sm);
  text-underline-offset: 3px;
  transition: color var(--duration-fast) var(--easing-base);
}
.content-body a:not(.link):not(.btn):hover {
  color: var(--color-text-brand);
}

/* ── 강조 ── */
.content-body strong,
.content-body b {
  font-weight: var(--font-weight-heading);
}
/* em을 기울이지 않는다 — 한글은 기울임의 가독성이 나쁘다.
   시스템의 다른 곳(.md em)과 같은 처리로, 무게로만 강조한다. */
.content-body em,
.content-body i {
  font-style: normal;
  font-weight: var(--font-weight-medium);
}

/* ── 인용 ──
   좌측 선 + 들여쓰기. 배경을 깔지 않는다 — 본문 중간의 색 면은
   시스템에서 상태(주의·오류)를 뜻하고, 인용은 상태가 아니다. */
.content-body blockquote {
  padding-inline-start: var(--space-inset-2xl);
  border-inline-start: var(--stroke-md) var(--stroke-solid) var(--color-border-subtle);
  color: var(--color-text-label);
}

/* ── 구분선 ── */
.content-body hr {
  border: 0;
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  margin-block: var(--space-stack-2xl);
}

/* ── 이미지 ──
   폭을 넘지 않게만 한다. 크기·정렬은 에디터가 인라인 style로 넣는 경우가 많아
   여기서 강제하면 작성자의 의도를 덮어쓴다.
   클래스가 붙은 이미지(아바타 등)는 크기가 이미 정해져 있으므로 비켜 간다. */
.content-body img:not([class]) {
  display: block;
  max-width: 100%;
  height: auto;
}
.content-body figure {
  margin-inline: 0;
}
.content-body figcaption {
  margin-top: var(--space-stack-sm);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-reading);
  color: var(--color-text-subtle);
}

/* ── 표 ──
   table--info의 시각 톤을 태그 선택자로 옮긴 것이다(info.md).
   값을 새로 정하지 않았다 — 본문 안이라고 표가 달라 보이면 안 된다.
   .table이 붙어 있으면 시스템 테이블이므로 비켜 간다. */
.content-body table:not(.table) {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-base);
  line-height: var(--line-height-reading);
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-strong);
}
.content-body table:not(.table) th,
.content-body table:not(.table) td {
  padding: var(--space-inset-squish-md);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  text-align: left;
  vertical-align: top;
}
.content-body table:not(.table) th {
  font-weight: var(--font-weight-heading);
  color: var(--color-text-label);
  background: var(--color-surface-subtle);
  white-space: nowrap;
}

/* 넓은 표는 자기 상자 안에서만 가로 스크롤한다 —
   래퍼가 없으면 페이지 전체가 가로로 밀린다. */
.content-body__scroll {
  overflow-x: auto;
  /* 스크롤 컨테이너 안의 표는 폭을 줄이지 않고 자기 폭을 유지해야 한다.
     width:100%만 두면 열이 뭉개져 스크롤이 생기지 않는다. */
  -webkit-overflow-scrolling: touch;
}
.content-body__scroll > table:not(.table) {
  min-width: max-content;
}

/* ── 코드 ── */
.content-body code {
  font-family: var(--font-family-mono);
  font-size: 0.92em;
  padding: var(--space-inset-squish-2xs);
  background: var(--color-surface-subtle);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  border-radius: var(--radius-sm);
}
.content-body pre {
  padding: var(--space-inset-2xl);
  background: var(--color-surface-subtle);
  border-radius: var(--radius-md);
  overflow-x: auto;
}
.content-body pre code {
  padding: 0;
  background: none;
  border: 0;
}

/* ── Loading ──
   Skeleton 줄. 본문은 길이를 알 수 없어 줄 수를 고정하지 않는다.
   줄 간격은 본문 문단 간격이 아니라 줄 간격이다 — 한 문단을 흉내 내는 것이지
   여러 문단을 흉내 내는 것이 아니다. */
.content-body--loading {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-sm);
}
```

---

## 접근성

읽기 콘텐츠 유형 (`design-system/accessibility.md` 색상 대비·링크 항목 적용).

- 제목은 **문서 순서를 지킨다.** 화면의 글 제목이 `h1`이므로 본문 최상위는 `h2`다. 크기가 아니라 순서로 고른다 — 작아 보이게 하려고 `h4`를 쓰면 스크린리더의 목차가 어긋난다.
- 링크는 **밑줄을 유지한다.** 본문 링크는 주변 글자와 색만 다르면 색각 이상 사용자에게 전달되지 않는다(WCAG 1.4.1).
- 이미지의 `alt`는 CMS 작성자가 넣는다. 시스템이 채울 수 없으므로 **에디터에서 필수 입력으로 막는다.** 장식용 이미지는 `alt=""`.
- 표에는 `th scope="col"`(또는 `scope="row"`)를 넣는다. 에디터가 `th`를 만들지 않으면 첫 행이 데이터로 읽힌다.
- 가로 스크롤하는 표는 키보드로도 스크롤되어야 한다 — 래퍼에 `tabindex="0"`과 접근 가능한 이름을 준다.

```html example
<div class="content-body__scroll" tabindex="0" role="region" aria-label="사업장별 정산 내역">
  <table>…</table>
</div>
```

- loading은 컨테이너에 `aria-busy="true"`와 `.sr-only` 문구를 함께 둔다 — Skeleton은 화면에만 존재한다.

```html example
<div class="content-body content-body--loading" aria-busy="true">
  <span class="sr-only">본문을 불러오는 중</span>
  …
</div>
```

- 본문 글자는 흰 배경에서 16.1:1(`--color-text-body`), 인용은 8.68:1(`--color-text-label`), 캡션은 4.51:1(`--color-text-subtle`)로 모두 WCAG AA 본문 기준을 넘는다.

---

## Do / Don't

> ✅ DO — CMS 출력을 그대로 넣는다. 클래스를 붙이지 않는다
> `<div class="content-body"><h2>…</h2><p>…</p></div>`

> ❌ DON'T — 본문 안에 시스템 컴포넌트 넣기 (태그 선택자가 깊이를 가리지 않아 컴포넌트 내부까지 본문 스타일이 얹힌다)
> `<div class="content-body"><div class="filter-bar">…</div></div>`

> ✅ DO — 넓은 표는 래퍼로 감싼다 (표만 스크롤한다)
> `<div class="content-body__scroll" tabindex="0"><table>…</table></div>`

> ❌ DON'T — 표를 접거나 열을 숨기기 (표는 비교 대상이라 접으면 의미가 사라진다)
> `.content-body table td:nth-child(n+4) { display: none; }`

> ❌ DON'T — 읽기 폭 제한 두기 (adaptation.md의 "콘텐츠 영역에 max-width를 두지 않는다"에 어긋난다)
> `.content-body { max-width: 72ch; }`

> ❌ DON'T — 읽기 화면이라고 행간·여백 풀기 (밀도는 업무 화면과 하나다 — product.md)
> `.content-body { line-height: var(--line-height-prose); }`

> ❌ DON'T — 태그 선택자를 .content-body 밖으로 내보내기 (시스템 전체의 태그 스타일이 된다)
> `h2 { font-size: var(--font-size-h3); }`

> ❌ DON'T — 본문 링크의 밑줄 지우기 (색만으로는 링크가 전달되지 않는다)
> `.content-body a { text-decoration: none; }`
