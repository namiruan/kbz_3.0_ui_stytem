---
file: components/molecules/carousel.md
version:    0.3.0
status:     draft
updated:    2026-09-07
depends-on: components/_index.md, components/atoms/icon.md, components/atoms/link.md, tokens/color.md, tokens/space.md, tokens/radius.md, tokens/elevation.md, tokens/motion.md, tokens/typography.md, adaptation.md, accessibility.md
---

# Carousel

## 개요

**홈 상단의 공지·이벤트 배너.** 여러 장을 한 자리에 겹쳐 두고 사람이 좌우로 넘겨 본다. 화면에서 가장 먼저 보이는 자리에 놓이므로, 이 컴포넌트의 규칙은 대부분 **"사람이 읽는 것을 방해하지 않는다"**로 수렴한다.

Tab과의 차이 — Tab은 **같은 대상의 다른 면**을 고르는 컨트롤이라 어느 패널을 보고 있는지가 화면의 상태다. Carousel은 **서로 다른 소식들**을 한 자리에 늘어놓은 것이라 어느 장을 보는지는 상태가 아니다. 그래서 주소에 남기지 않고, 뒤로 가기로 되감기지도 않는다.

ContentList와의 차이 — 목록은 훑어서 **고르는** 것이고 배너는 **눈에 띄는** 것이다. 다섯 장을 넘겨 보게 하는 대신 목록으로 만들어야 하는 내용이라면 그건 배너가 아니다(→ 사용 지침).

**자동으로 넘어가지 않는다.** 사람이 누르거나 밀어야 넘어간다(→ 사용 지침 「자동 전환을 넣지 않았다」).

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| 컨트롤 | 화살표 + 점 (기본) · 점만 — `carousel--dots-only` | 화살표 + 점 |
| 슬라이드 수 | **2~5장.** 1장이면 컨트롤이 자동으로 사라진다 | — |
| state | default · 첫 장(이전 비활성) · 끝 장(다음 비활성) | default |

---

## 사용 지침

<!-- AI: Carousel은 홈 상단 공지·이벤트 배너 전용이다. 자동 전환 기능은 없다(구현하지 않는다).
     순환(마지막 → 첫 장)도 없다 — 끝에서 멈추고 화살표가 비활성이 된다.
     슬라이드가 1장이면 컨트롤이 자동으로 숨는다(JS + CSS 양쪽 fail-safe).
     탭·목록·스텝을 캐러셀로 대신하지 않는다. -->

### 2~5장

**한 장이면 캐러셀이 아니다.** 컨트롤이 자동으로 사라지고 배너 하나로 남는다 — 마크업을 바꾸지 않아도 된다.

**여섯 장부터는 뒤가 없는 것과 같다.** 사람은 두세 번 넘기다 멈춘다. 다섯 장을 넘겨야 할 만큼 소식이 많으면 그건 배너가 아니라 **목록**이다(ContentList). 배너는 "지금 이걸 보세요"이고 목록은 "골라 보세요"다.

### 자동 전환을 넣지 않았다

넣을 수 있었지만 넣지 않았다. 이유가 셋이다.

1. **읽는 중에 사라진다.** 업무 화면의 배너는 대개 기한·요율처럼 숫자가 들어간 안내다. 다 읽기 전에 넘어가면 사람은 되돌리는 법을 찾아야 하고, 그때부터 배너는 방해물이 된다.
2. **켜는 순간 요건이 넷 따라온다** (WCAG 2.2.2 — 5초 이상 자동으로 움직이는 콘텐츠). ⓐ 일시정지 수단 ⓑ hover·focus 중 정지 ⓒ 터치 중 정지 ⓓ `prefers-reduced-motion`에서 해제. 넷 중 하나만 빠져도 접근성 기준을 못 넘는다.
3. **일시정지 버튼을 만들 아이콘이 없다.** `icons/categories.json`에 pause·play가 없다. 아이콘을 새로 들이는 것은 별개의 결정이라, 그 결정 없이 자동 전환부터 만들면 ⓐ를 지킬 수 없다.

> **다시 여는 조건** — 자동 전환이 꼭 필요한 화면이 생기면 ① pause·play 아이콘을 먼저 들이고 ② 위 넷을 함께 갖춰 연다. 전환 간격은 **7초 이상**(한글 두 줄을 읽는 시간)으로 잡는다.

### 순환하지 않는다

마지막 장에서 첫 장으로 돌아가지 않는다. 끝에 닿으면 화살표가 비활성이 되고 거기서 멈춘다.

순환은 "끝이 없다"는 신호라 **몇 장인지, 다 봤는지를 알 수 없게** 만든다. 무한 스크롤을 쓰지 않는 것과 같은 이유다(→ `content-list.md`). 점 인디케이터가 전체 장 수를, 화살표의 비활성이 끝을 말한다 — 두 신호가 함께 있어야 사람이 멈출 수 있다.

### 가운데 정렬이다

슬라이드 안의 갈래·제목·설명은 **가로 가운데**에 놓인다. 배너는 읽는 글이 아니라 **한 덩어리의 알림**이라, 본문처럼 왼쪽 시작선을 맞춰 훑을 대상이 아니라 한눈에 통째로 들어와야 한다. 화살표도 글이 비운 양옆 자리에 놓여 다투지 않는다.

**그래서 설명은 두 줄까지다.** 세 줄이 넘어가면 가운데 정렬은 줄 시작점이 매번 달라져 읽기가 나빠진다 — 그만큼 할 말이 많으면 배너가 아니라 글이다(상세로 보낸다).

### 높이는 가장 긴 슬라이드가 정한다

슬라이드는 한 줄(flex)에 나란히 놓이므로 **높이가 저절로 같아진다.** 넘길 때 높이가 튀지 않는 것은 이 덕분이고, 대신 문구 길이가 제각각이면 짧은 쪽에 빈자리가 생긴다 — **장마다 줄 수를 맞춰 쓴다.**

### `sm`에서는 화살표를 숨긴다

좁은 화면에서는 **밀어서** 넘긴다(스크롤 스냅이라 브라우저가 준다). 화살표를 남기면 표적만 둘 늘고, 그 둘이 배너 위를 덮는다 — 좁은 화면에서 필요한 것은 더 많은 표적이 아니라 더 적은 표적이다(→ `adaptation.md`). 점은 남는다: 몇 장인지와 지금 어디인지는 폭과 무관하게 필요하다.

### 배너로 쓰지 않을 것

- **탭 대신** — 같은 대상의 다른 면은 Tab이다. 캐러셀로 만들면 나머지 면이 있는지조차 보이지 않는다.
- **스텝 대신** — 순서가 있는 안내는 `data-step`이다. 캐러셀은 순서를 뜻하지 않는다.
- **목록 대신** — 위 「2~5장」 참조.
- **중요한 액션의 유일한 입구로** — 두 번째 장 뒤에 있는 버튼은 대부분 눌리지 않는다. 화면에 반드시 필요한 액션은 배너 밖에 따로 둔다.

---

## 동작

이전·다음 버튼과 점을 누르면 해당 장으로 이동한다. 좌우로 밀어도(터치·트랙패드) 넘어가고, 어느 쪽으로 넘겼든 점과 화살표 상태가 따라온다. 첫 장·끝 장에서는 그 방향 화살표가 비활성이다.

```js init
function initCarousel(container) {
  var list = container.querySelectorAll('.carousel');
  Array.prototype.forEach.call(list, function(root) {
    if (root.hasAttribute('data-init-carousel')) return;
    root.setAttribute('data-init-carousel', '');

    var viewport = root.querySelector('.carousel__viewport');
    var slides   = root.querySelectorAll('.carousel__slide');
    var prev     = root.querySelector('.carousel__prev');
    var next     = root.querySelector('.carousel__next');
    var nav      = root.querySelector('.carousel__nav');
    if (!viewport || !slides.length) return;

    /* 한 장이면 캐러셀이 아니다 — 컨트롤을 지운다.
       CSS에도 같은 규칙이 있다(:has). JS가 안 붙은 정적 문서에서도 컨트롤이 뜨지 않아야 한다. */
    if (slides.length < 2) {
      if (prev) prev.remove();
      if (next) next.remove();
      if (nav) nav.remove();
      return;
    }

    /* 점은 마크업에 적지 않고 여기서 만든다 — 장 수와 점 수가 어긋날 자리를 없앤다.
       (열 이름과 값의 개수를 손으로 맞추게 두면 반드시 어긋난다 — ContentList에서 겪은 그대로다.) */
    var dots = [];
    if (nav) {
      nav.textContent = '';
      Array.prototype.forEach.call(slides, function(slide, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel__dot';
        dot.setAttribute('aria-label', (i + 1) + '번째 배너로 이동');
        dot.addEventListener('click', function() { go(i); });
        nav.appendChild(dot);
        dots.push(dot);
      });
    }

    var index = 0;

    function go(i) {
      index = Math.max(0, Math.min(slides.length - 1, i));
      viewport.scrollTo({ left: slides[index].offsetLeft - slides[0].offsetLeft, behavior: motion() });
      sync();
    }
    /* 움직임을 줄여 달라고 한 사람에게는 즉시 이동한다 */
    function motion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    }

    function sync() {
      dots.forEach(function(d, i) {
        d.classList.toggle('carousel__dot--current', i === index);
        /* aria-current는 "지금 여기"를 뜻한다. 선택된 탭이 아니라 현재 위치라서 page가 아니라 true다 */
        if (i === index) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
      if (prev) prev.disabled = (index === 0);
      if (next) next.disabled = (index === slides.length - 1);
    }

    /* 밀어서 넘긴 경우에도 점과 화살표가 따라와야 한다 — 스크롤 위치로 현재 장을 다시 읽는다.
       scrollend는 지원이 고르지 않아 rAF로 잦은 호출만 눌러 준다. */
    var ticking = false;
    viewport.addEventListener('scroll', function() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function() {
        ticking = false;
        var base = slides[0].offsetLeft;
        var x = viewport.scrollLeft;
        var nearest = 0, best = Infinity;
        Array.prototype.forEach.call(slides, function(s, i) {
          var d = Math.abs((s.offsetLeft - base) - x);
          if (d < best) { best = d; nearest = i; }
        });
        if (nearest !== index) { index = nearest; sync(); }
      });
    }, { passive: true });

    if (prev) prev.addEventListener('click', function() { go(index - 1); });
    if (next) next.addEventListener('click', function() { go(index + 1); });

    sync();
  });
}

if (window.__componentInits && !window.__componentInits.initCarousel) window.__componentInits.initCarousel = initCarousel;
```

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl)">

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">기본 — 화살표 + 점. 첫 장이라 <strong>이전이 비활성</strong>이다. 밀어서 넘겨도 점이 따라온다</p>
  <div data-component class="carousel" role="group" aria-roledescription="캐러셀" aria-label="공지 배너">
    <div class="carousel__frame">
      <div class="carousel__viewport">
        <div class="carousel__track">
          <div class="carousel__slide" role="group" aria-roledescription="슬라이드" aria-label="1 / 3">
            <span class="carousel__eyebrow">공지</span>
            <a class="carousel__link" href="#">2024년 건설업 보험료 신고 기간 안내</a>
            <p class="carousel__desc">3월 31일까지 제출하세요. 기한을 넘기면 가산세가 부과될 수 있습니다.</p>
          </div>
          <div class="carousel__slide" role="group" aria-roledescription="슬라이드" aria-label="2 / 3">
            <span class="carousel__eyebrow">업데이트</span>
            <a class="carousel__link" href="#">노무제공자 신고 항목이 새로 생겼습니다</a>
            <p class="carousel__desc">이번 신고분부터 적용됩니다. 작성 방법을 확인해 보세요.</p>
          </div>
          <div class="carousel__slide" role="group" aria-roledescription="슬라이드" aria-label="3 / 3">
            <span class="carousel__eyebrow">이벤트</span>
            <a class="carousel__link" href="#">전자신고 첫 이용 사업장 수수료 지원</a>
            <p class="carousel__desc">6월까지 신규 사업장에 한해 지원합니다.</p>
          </div>
        </div>
      </div>
      <button class="carousel__prev" type="button" aria-label="이전 배너">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <button class="carousel__next" type="button" aria-label="다음 배너">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
    </div>
    <div class="carousel__nav" aria-label="배너 선택"></div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)"><code>carousel--dots-only</code> — 화살표 없이 밀어서만 넘긴다. <code>sm</code>에서는 기본형도 이 모습이 된다</p>
  <div data-component class="carousel carousel--dots-only" role="group" aria-roledescription="캐러셀" aria-label="공지 배너">
    <div class="carousel__frame">
      <div class="carousel__viewport">
        <div class="carousel__track">
          <div class="carousel__slide" role="group" aria-roledescription="슬라이드" aria-label="1 / 2">
            <span class="carousel__eyebrow">공지</span>
            <a class="carousel__link" href="#">2024년 건설업 보험료 신고 기간 안내</a>
            <p class="carousel__desc">3월 31일까지 제출하세요.</p>
          </div>
          <div class="carousel__slide" role="group" aria-roledescription="슬라이드" aria-label="2 / 2">
            <span class="carousel__eyebrow">업데이트</span>
            <a class="carousel__link" href="#">노무제공자 신고 항목이 새로 생겼습니다</a>
            <p class="carousel__desc">이번 신고분부터 적용됩니다.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="carousel__nav" aria-label="배너 선택"></div>
  </div>
</div>

<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">한 장 — <strong>컨트롤이 자동으로 사라진다.</strong> 마크업은 위와 같다</p>
  <div data-component class="carousel" role="group" aria-roledescription="캐러셀" aria-label="공지 배너">
    <div class="carousel__frame">
      <div class="carousel__viewport">
        <div class="carousel__track">
          <div class="carousel__slide" role="group" aria-roledescription="슬라이드" aria-label="1 / 1">
            <span class="carousel__eyebrow">공지</span>
            <a class="carousel__link" href="#">2024년 건설업 보험료 신고 기간 안내</a>
            <p class="carousel__desc">3월 31일까지 제출하세요.</p>
          </div>
        </div>
      </div>
      <button class="carousel__prev" type="button" aria-label="이전 배너">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <button class="carousel__next" type="button" aria-label="다음 배너">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
    </div>
    <div class="carousel__nav" aria-label="배너 선택"></div>
  </div>
</div>

</div>
:::

---

## Anatomy

<!-- AI:
레이어 계층: Carousel
  .carousel — div. 루트.
       role="group" aria-roledescription="캐러셀" aria-label="공지 배너" 필수 —
       role="region"을 쓰지 않는다: 랜드마크가 늘어나면 랜드마크 목록이 배너로 채워진다.
       carousel--dots-only를 더하면 화살표가 숨는다(마크업에서 빼도 된다 — JS가 없으면 그대로 없는 것이다).
  ├─ .carousel__frame — div. **화살표의 기준점**(position:relative). 뷰포트와 화살표를 묶는다.
  │    루트를 기준으로 삼으면 아래 점 줄(32px)까지 포함돼 화살표가 **16px 내려간다**(실측).
  │    뷰포트 안에 넣을 수도 없다 — 스크롤 컨테이너라 화살표가 슬라이드를 따라 흘러간다.
  │  ├─ .carousel__viewport — div. 잘리는 창. overflow-x:auto + scroll-snap-type:x mandatory.
  │    스크롤바는 숨긴다 — "더 있다"는 신호는 점과 화살표가 맡는다.
  │  │  └─ .carousel__track — div. display:flex. 슬라이드를 한 줄에 늘어놓는다.
  │         **높이는 가장 긴 슬라이드가 정한다**(flex 한 줄이라 저절로 같아진다).
  │  │       └─ .carousel__slide — div. flex:0 0 100% · scroll-snap-align:start. 높이는 내용과 패딩이 정한다.
  │              role="group" aria-roledescription="슬라이드" aria-label="2 / 3" — 몇 번째인지 읽힌다.
  │  │            ├─ .carousel__eyebrow — span. optional. 「공지」·「이벤트」 같은 갈래 한 마디.
  │  │            │    Badge를 쓰지 않는다 — 배너 안에서 칩은 제목과 경쟁한다.
  │  │            ├─ .carousel__link — a. 제목. ::after가 슬라이드를 덮어 면 전체가 눌린다
  │  │            │    (ContentList의 stretched link와 같은 패턴). 링크명은 제목만 읽힌다.
  │  │            └─ .carousel__desc — p. optional. 한 줄 설명. **두 줄을 넘기지 않는다** —
│                   슬라이드가 가운데 정렬이라 세 줄부터는 줄 시작점이 매번 달라져 읽기가 나빠진다.
  │  └─ .carousel__prev / .carousel__next — button. 좌우 가장자리에 겹친다. **__frame의 자식이다.** aria-label 필수.
  │       첫 장·끝 장에서 disabled — 순환하지 않는다.
  │       └─ .icon.icon--sm > svg > use[href="icons/sprite.svg#icon-chevron-left|right"]
  └─ .carousel__nav — div. 점이 들어갈 **빈 자리**. aria-label="배너 선택".
       **점은 마크업에 적지 않는다** — initCarousel이 슬라이드 수만큼 만든다.
       손으로 적으면 장 수와 점 수가 어긋난다.
       └─ .carousel__dot — button (JS 생성). aria-label="2번째 배너로 이동".
            현재 장에 carousel__dot--current + aria-current="true".

- 자동 전환 속성은 없다. data-autoplay 같은 것을 임의로 만들지 않는다(→ 사용 지침).
- 슬라이드 안에 버튼·체크박스 등 별개의 클릭 대상을 넣지 않는다 — 면 전체가 링크라 겹친다.
- 이미지 배너가 필요하면 .carousel__slide에 background-image를 직접 주지 말고
  화면 쪽 클래스로 덮는다(시스템은 색면 배너만 정의한다).
-->

```html
<div data-component class="carousel" role="group" aria-roledescription="캐러셀" aria-label="공지 배너">
  <div class="carousel__frame">
    <div class="carousel__viewport">
      <div class="carousel__track">
        <div class="carousel__slide" role="group" aria-roledescription="슬라이드" aria-label="1 / 3">
          <span class="carousel__eyebrow">공지</span>
          <a class="carousel__link" href="#">2024년 건설업 보험료 신고 기간 안내</a>
          <p class="carousel__desc">3월 31일까지 제출하세요.</p>
        </div>
        <!-- 슬라이드 2~5 -->
      </div>
    </div>
    <button class="carousel__prev" type="button" aria-label="이전 배너">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
    </button>
    <button class="carousel__next" type="button" aria-label="다음 배너">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
    </button>
  </div>
  <div class="carousel__nav" aria-label="배너 선택"></div>
</div>
```

---

## CSS

```css
/* ── Carousel ── */
.carousel { }

/* 화살표의 기준점. **루트가 아니라 이 상자다** — 루트를 기준으로 삼으면 아래 점 줄(32px)까지
   높이에 포함돼 `top: 50%`가 배너의 가운데가 아니라 배너+점의 가운데가 된다.
   실측: 뷰포트 중심 105 vs 화살표 중심 121 — **16px 내려가 있었다**(점 줄 높이의 절반).
   뷰포트 안에 넣는 방법도 안 된다 — 뷰포트는 스크롤 컨테이너라 그 안의 absolute는
   슬라이드를 따라 흘러간다. 그래서 둘을 감싸는 상자가 하나 필요하다. */
.carousel__frame {
  position: relative;
}

/* 잘리는 창. **스크롤 스냅으로 만든다** — 터치 스와이프·트랙패드·키보드·관성이
   브라우저에서 그냥 따라온다. JS로 transform을 밀면 그 넷을 전부 다시 만들어야 하고,
   그중 하나라도 빠지면 "손가락으로는 안 넘어가는 캐러셀"이 된다. */
.carousel__viewport {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  border-radius: var(--radius-md);
  /* 스크롤바를 숨긴다. 보통은 "굴릴 것이 남았다"는 신호를 지우는 일이라 하지 않지만
     (→ content-list.md), 여기서는 **점과 화살표가 그 신호를 대신 맡는다** —
     몇 장인지·지금 어디인지·다음이 있는지를 셋 다 말한다. */
  scrollbar-width: none;
}
.carousel__viewport::-webkit-scrollbar { display: none; }

/* 움직임을 줄여 달라고 한 사람에게는 즉시 이동한다(JS의 scrollTo도 같은 판정을 쓴다) */
@media (prefers-reduced-motion: no-preference) {
  .carousel__viewport { scroll-behavior: smooth; }
}

.carousel__track {
  display: flex;
}

/* 한 번에 한 장이다. 옆 장을 살짝 보여 주는 「엿보기」는 두지 않는다 —
   배너는 지금 한 장에 집중시키는 자리이고, 잘린 조각이 옆에 있으면 시선이 둘로 갈린다. */
.carousel__slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
  position: relative;                       /* __link::after 오버레이의 기준점 */
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-xs);
  justify-content: center;
  /* **가운데 정렬이다.** 배너는 읽는 글이 아니라 **한 덩어리의 알림**이다 —
     본문처럼 왼쪽 시작선을 맞춰 훑을 대상이 아니라 한눈에 통째로 들어와야 한다.
     왼쪽 정렬로 두면 화살표 자리로 비워 둔 좌우 여백(56px) 때문에 글이 왼쪽에서
     어중간하게 떨어져, 가운데도 왼쪽도 아닌 자리에 놓인다(실측: 제목 왼쪽 여백 56 / 오른쪽 294).
     가운데로 두면 그 여백이 양쪽 숨통이 되고, 화살표는 글이 비운 자리에 놓여 다투지 않는다.
     ⚠️ 그래서 **설명은 두 줄까지**다. 세 줄이 넘어가면 가운데 정렬은 줄 시작점이 매번 달라져
     읽기가 나빠진다 — 그만큼 할 말이 많으면 배너가 아니라 글이다. */
  align-items: center;
  text-align: center;
  /* 좌우 패딩은 **화살표 자리를 비운다**(버튼 폭 + 양쪽 여백). 이걸 안 잡으면 화살표가
     제목 위에 얹힌다 — 실측 1000px: 화살표 오른쪽 끝 84, 제목 왼쪽 64로 **20px 겹쳤다**.
     화살표가 없는 sm에서는 이 여백도 없앤다(아래 sm 블록). */
  padding-inline: calc(var(--height-compact) + var(--space-24));

  /* 높이는 **내용과 패딩이 정한다.** 고정값을 두지 않는 이유는 두 가지다 —
     ① 슬라이드는 flex 한 줄이라 서로 높이가 저절로 같아진다(넘길 때 튀지 않는다)
     ② 높이를 못 박으면 문구가 길어진 날 잘린다. 한 장짜리가 납작해 보이면
        그건 상자를 키울 일이 아니라 **설명 한 줄을 채울 일**이다. */
  padding-block: var(--space-inset-2xl);
  background: var(--color-surface-brand-tint);
}

/* 갈래 한 마디. Badge(칩)를 쓰지 않는다 — 배너 안에서 칩은 제목과 경쟁한다.
   크기와 색만으로 충분히 갈린다. */
.carousel__eyebrow {
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-heading);
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-brand);
}

/* 제목 — 면 전체가 눌린다(stretched link). ContentList의 행 링크와 같은 패턴이라
   링크명은 제목만 읽히고, 오버레이는 슬라이드 안에 갇힌다. */
.carousel__link {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-heading);
  line-height: var(--line-height-heading);
  letter-spacing: var(--letter-spacing-default);
  color: var(--color-text-display);
  text-decoration: none;
}
.carousel__link::after {
  content: '';
  position: absolute;
  inset: 0;
}
.carousel__slide:hover .carousel__link { text-decoration: underline; }
.carousel__link:focus-visible {
  outline: var(--stroke-md) var(--stroke-solid) var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

.carousel__desc {
  margin: 0;
  font-size: var(--font-size-base);
  line-height: var(--line-height-reading);
  color: var(--color-text-subtle);
}

/* ── 화살표 ── */
/* 배너 면 위에 겹치므로 **제 면을 갖는다** — 슬라이드 배경이 무엇이든 읽혀야 한다.
   ghost로 두면 색면 배너 위에서 사라진다. */
.carousel__prev,
.carousel__next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--height-compact);
  height: var(--height-compact);
  border-radius: var(--radius-pill);
  background: var(--color-surface-base);
  box-shadow: var(--shadow-sm);
  color: var(--color-text-label);
  cursor: pointer;
  transition: background var(--duration-fast) var(--easing-base),
              color var(--duration-fast) var(--easing-base);
}
.carousel__prev { left: var(--space-12); }
.carousel__next { right: var(--space-12); }

.carousel__prev:hover,
.carousel__next:hover { background: var(--color-action-neutral-hover); color: var(--color-text-body); }

.carousel__prev:focus-visible,
.carousel__next:focus-visible {
  outline: var(--stroke-md) var(--stroke-solid) var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* 끝에서 멈춘다 — 순환하지 않는다(→ 사용 지침).
   **자리는 지키고 색만 뺀다.** 면을 회색(surface-disabled)으로 바꾸는 안도 렌더해 봤는데,
   색면 배너 위에서 **못 누르는 회색 알약**이 가장 눈에 띄었다 — Pagination에서 겪은 것과
   같은 함정의 다른 형태다(거기는 면을 더해서, 여기는 면을 바꿔서 비활성이 도드라졌다).
   그래서 면은 슬라이드와 대비되는 흰색 그대로 두고, 그림자를 걷고, 아이콘만 한 단계 더 뺀다.

   **숨기지는 않는다.** 사라지면 남은 화살표 하나만 보여 "이쪽으로만 가는 배너"로 읽히고,
   끝에 닿았다는 사실이 점 하나에만 실린다. 나란히 렌더해 보고 고른 값이다. */
.carousel__prev:disabled,
.carousel__next:disabled {
  color: var(--color-text-disabled-faint);
  box-shadow: none;
  cursor: default;
  pointer-events: none;
}

/* ── 점 ── */
.carousel__nav {
  display: flex;
  justify-content: center;
  gap: var(--space-gap-xs);
  margin-top: var(--space-stack-sm);
}

/* 표적은 24×24를 채우고(WCAG 2.5.8) 눈에 보이는 점만 8px이다 —
   점을 8px 버튼으로 만들면 손가락으로 못 누른다. */
.carousel__dot {
  position: relative;
  width: var(--space-24);
  height: var(--space-24);
  border-radius: var(--radius-pill);
  background: transparent;
  cursor: pointer;
}
.carousel__dot::before {
  content: '';
  position: absolute;
  inset: 50% auto auto 50%;
  width: var(--space-8);
  height: var(--space-8);
  transform: translate(-50%, -50%);
  border-radius: var(--radius-pill);
  background: var(--color-border-default);
  transition: background var(--duration-fast) var(--easing-base);
}
.carousel__dot:hover::before { background: var(--color-text-subtle); }
.carousel__dot--current::before { background: var(--color-fill-brand); }
.carousel__dot:focus-visible {
  outline: var(--stroke-md) var(--stroke-solid) var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── 점만 ── */
.carousel--dots-only .carousel__prev,
.carousel--dots-only .carousel__next { display: none; }

/* ── 한 장이면 캐러셀이 아니다 ── */
/* JS도 같은 일을 하지만(컨트롤을 제거) CSS에도 둔다 — JS가 붙지 않은 정적 문서나
   init 전 첫 페인트에서 화살표가 잠깐 떴다 사라지면 안 된다. 실패는 닫히는 쪽으로. */
.carousel:has(.carousel__track > .carousel__slide:only-child) .carousel__prev,
.carousel:has(.carousel__track > .carousel__slide:only-child) .carousel__next,
.carousel:has(.carousel__track > .carousel__slide:only-child) .carousel__nav { display: none; }

/* ── sm (<768px) ── */
/* 화살표를 숨긴다 — 밀어서 넘기면 되고, 좁은 화면에서 필요한 것은 더 적은 표적이다.
   점은 남는다: 몇 장인지와 지금 어디인지는 폭과 무관하게 필요하다.
   제목은 한 단계 내린다(20 → 17) — 목록 제목과 같은 이유로, 폭이 바꾸는 것은 **줄 수**다. */
@media (max-width: 767px) {
  .carousel__prev,
  .carousel__next { display: none; }

  /* 화살표가 없으니 그 자리도 없앤다 — 좁은 화면에서 56px씩 두 번은 큰 돈이다 */
  .carousel__slide {
    padding-block: var(--space-inset-xl);
    padding-inline: var(--space-inset-2xl);
  }
  .carousel__link { font-size: var(--font-size-h4); }
}
```

---

## 접근성

- 루트는 `role="group"` + `aria-roledescription="캐러셀"` + `aria-label`이다. **`role="region"`을 쓰지 않는다** — 랜드마크가 늘어나면 랜드마크 목록이 배너로 채워져, 본문으로 건너뛰려던 사람이 배너를 먼저 만난다.
- 각 슬라이드는 `role="group"` + `aria-roledescription="슬라이드"` + `aria-label="2 / 3"`이다. 몇 번째인지가 낭독에서 사라지지 않는다.
- **라이브 리전을 두지 않는다.** 자동으로 바뀌는 것이 없으므로 알릴 변화도 없다 — 사람이 누른 결과는 스스로 안다.
- 점은 `<button>`이고 현재 장에 `aria-current="true"`를 준다. 탭이 아니라 **위치 표시**라 `role="tab"`을 쓰지 않는다.
- 표적은 24×24다(WCAG 2.5.8). 보이는 점은 8px이지만 버튼 상자가 24×24를 채운다.
- 화살표는 첫 장·끝 장에서 `disabled`다 — 순환하지 않는다는 사실이 시각과 보조기술 양쪽에 같은 값으로 전달된다.
- 슬라이드 면 전체가 링크지만 링크명은 **제목만** 읽힌다(`::after` 오버레이). 설명·갈래는 링크명에 섞이지 않는다.
- `prefers-reduced-motion: reduce`이면 부드러운 스크롤을 끄고 즉시 이동한다 — CSS와 JS 양쪽에서 같은 판정을 쓴다.
- 키보드 — 화살표 버튼과 점이 각각 탭 순서에 들어가고, 뷰포트는 스크롤 컨테이너라 좌우 방향키로도 넘어간다.

---

## Do / Don't

> ✅ DO — 점은 비워 두고 JS가 만들게 한다 (장 수와 점 수가 어긋날 자리를 없앤다)
> `<div class="carousel__nav" aria-label="배너 선택"></div>`

> ❌ DON'T — 점을 손으로 적기
> `<div class="carousel__nav"><button class="carousel__dot"></button>…</div>` — 슬라이드를 하나 더하면 반드시 어긋난다

> ✅ DO — 슬라이드마다 몇 번째인지 라벨을 준다
> `<div class="carousel__slide" role="group" aria-roledescription="슬라이드" aria-label="2 / 3">`

> ❌ DON'T — 자동 전환 붙이기 (일시정지·hover 정지·터치 정지·reduced-motion 해제가 함께 오지 않으면 접근성 기준을 못 넘는다 → 사용 지침)

> ❌ DON'T — 마지막에서 첫 장으로 순환 (몇 장인지·다 봤는지를 알 수 없게 된다. 끝에서 화살표가 비활성이 된다)

> ❌ DON'T — 여섯 장 이상 (뒤는 아무도 보지 않는다. 그만큼 많으면 ContentList로 만든다)

> ❌ DON'T — 슬라이드 안에 버튼 넣기 (면 전체가 링크라 클릭 영역이 겹친다)
