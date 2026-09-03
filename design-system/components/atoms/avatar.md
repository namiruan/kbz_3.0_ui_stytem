---
file: components/atoms/avatar.md
version:    0.1.1
status:     draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/radius.md, tokens/stroke.md, tokens/typography.md, tokens/height.md, components/atoms/skeleton.md
---

# Avatar

## 개요

사람·계정·조직을 한 자리에서 대신하는 작은 그림. 사진이 있으면 사진, 없으면 이니셜, 그것도 없으면 **김반장 로고**를 보여준다.

Icon과의 차이 — Icon은 **뜻**을 전하고(저장·삭제·닫기), Avatar는 **주체**를 가리킨다(이 글을 쓴 사람, 지금 로그인한 계정). 같은 사람 모양이어도 "사용자 관리" 메뉴의 그림은 Icon이고, 작성자 옆의 그림은 Avatar다.

로딩 중 자리는 Skeleton의 circle이 잡는다(`skeleton.md`).

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| shape | round(기본, 클래스 없음) · square → `avatar--square` | round |
| size | xs 24 → `avatar--xs` · 32(기본, 클래스 없음) · lg 40 → `avatar--lg` · xl 48 → `avatar--xl` | 32 |
| content | logo(기본, 자식 없음) · image → 자식 `img.avatar__img` · initials → 자식 `span.avatar__initials` | logo |

content는 클래스가 아니라 **자식으로 결정된다.** 자식이 없으면 로고다 — 기본값을 쓰는 데 마크업이 필요 없다.

---

## 사용 지침

### shape 선택 기준

| 대상 | shape |
|------|-------|
| 사람 — 작성자·담당자·로그인 계정 | round (기본) |
| 사람이 아닌 것 — 회사·현장·팀·장비 | `avatar--square` |

한 목록 안에서 두 shape를 섞지 않는다. 섞이면 형태가 뜻을 잃고 장식이 된다. 사람과 회사가 같은 열에 오는 목록이라면 둘 다 round로 두고 구분은 이름이 맡는다.

### size 선택 기준

| 자리 | size | 높이 | 같은 높이의 Button |
|------|------|---|---|
| 목록 행 안·댓글 작성자 | `xs` | `--height-tight` 24 | `btn--xs` |
| 본문 옆 작성자·드롭다운 항목 | 기본 | `--height-compact` 32 | `btn--sm` |
| 상단바 로그인 계정·상세 화면 작성자 | `lg` | `--height-spacious` 40 | `btn--lg` |
| 프로필 화면 머리 | `xl` | `--height-loose` 48 | — |

**이름은 Button의 이름을 따른다.** 같은 높이는 같은 이름이어야 한다 — `avatar--xs`와 `btn--xs`가 나란히 서면 둘 다 24다. (처음에 24를 `avatar--sm`으로 뒀다가 되돌렸다. `btn--sm`은 32라서, 같은 행에 `avatar--sm`과 `btn--sm`을 쓰면 8px이 어긋난다.) 기본값 32에 이름이 없는 것은 시스템 규칙이다 — 기본값 차원은 클래스를 붙이지 않는다.

이보다 큰 그림이 필요하면 Avatar가 아니라 이미지다.

### 제약

- **여러 명을 겹쳐 쌓는 배치(avatar group)는 아직 정의하지 않았다.** 참여자 목록처럼 겹쳐 쌓아야 하면 임의로 만들지 말고 `components/_requests.md`에 요청을 남긴다.
- **접속 상태 점(온라인 인디케이터)도 정의하지 않았다.** 상태를 표시해야 하면 Avatar 옆에 Badge를 둔다.

---

## Anatomy

<!-- AI:
- root = span.avatar. 자식이 없으면 로고가 배경으로 그려진다(CSS). 로고 자리는 --avatar-logo 커스텀 프로퍼티 하나다.
- image = img.avatar__img. root의 유일한 자식. alt에 이름을 넣으면 root에 aria-label을 쓰지 않는다.
- initials = span.avatar__initials. 한글 1자 · 로마자 2자까지. 3자 이상 넣지 않는다(원 안에서 줄어들어 읽히지 않는다).
- initials를 쓸 때는 root에 role="img" aria-label="[이름]", initials에 aria-hidden="true".
- 이름이 바로 옆 텍스트에 있으면 root에 aria-hidden="true"를 주고 aria-label을 쓰지 않는다(같은 이름을 두 번 읽는다).
- 링크·버튼 안에 넣을 때는 그 링크·버튼이 이름을 갖고 Avatar는 aria-hidden="true"다.
-->

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">logo (기본)</span>
  <span data-component class="avatar" role="img" aria-label="김반장"></span>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">image</span>
  <span data-component class="avatar"><img class="avatar__img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23dce8f9'/%3E%3Ccircle cx='32' cy='25' r='11' fill='%23166dee'/%3E%3Cpath d='M8 64c0-13 11-21 24-21s24 8 24 21z' fill='%23166dee'/%3E%3C/svg%3E" alt="홍길동"></span>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">initials</span>
  <span data-component class="avatar" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">square</span>
  <span data-component class="avatar avatar--square" role="img" aria-label="김반장건설"></span>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">size</span>
  <span style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span data-component class="avatar avatar--xs" role="img" aria-label="김반장"></span>
    <span class="avatar" role="img" aria-label="김반장"></span>
    <span class="avatar avatar--lg" role="img" aria-label="김반장"></span>
    <span class="avatar avatar--xl" role="img" aria-label="김반장"></span>
  </span>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">size — initials</span>
  <span style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span class="avatar avatar--xs" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
    <span class="avatar" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
    <span class="avatar avatar--lg" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
    <span class="avatar avatar--xl" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
  </span>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">이름 옆</span>
  <span style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span class="avatar avatar--xs" aria-hidden="true"></span>
    <span class="text-body">김반장</span>
  </span>
</div>
</div>
:::

---

## CSS

```css
/* ── Base ── */
.avatar {
  /* 김반장 로고. 원본 자산은 logo/ 에 있고 이 값은 거기서 생성된다 —
     자산을 바꾸면 `python3 scripts/embed_logo.py` → `python3 build.py` 순으로 돌린다.
     손으로 고치지 않는다. 경로가 아니라 data URI인 이유는 logo/README.md 참조.
     ⚠️ 지금 값은 자산이 아직 없어서 넣어둔 임시 사람 마크다. */
  --avatar-logo: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23115ac6' d='M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.7-8 6v2h16v-2c0-3.3-3.6-6-8-6Z'/%3E%3C/svg%3E");
  --avatar-size: var(--height-compact);
  --avatar-radius: var(--radius-pill);
  --avatar-initials-size: var(--font-size-label);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;                       /* 목록 행에서 이름이 길어져도 찌그러지지 않는다 */
  width: var(--avatar-size);
  height: var(--avatar-size);
  border-radius: var(--avatar-radius);
  overflow: hidden;                      /* 사진을 형태 안으로 자른다 */
  background-color: var(--color-surface-subtle);
  vertical-align: middle;
  user-select: none;
}

/* 흰 사진·밝은 로고가 흰 배경에 녹지 않도록 안쪽 실선 한 겹.
   바깥 border로 주면 크기가 커져 같은 행의 버튼과 높이가 어긋난다. */
.avatar::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 var(--stroke-sm) var(--color-border-neutral-subtle);
  pointer-events: none;
}

/* ── Content: logo (기본 — 자식이 없을 때) ── */
.avatar:not(:has(.avatar__img, .avatar__initials)) {
  background-color: var(--color-surface-brand-subtle);
  background-image: var(--avatar-logo);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 62%;                 /* 마크가 원에 닿지 않고 여백을 갖는 비율 */
}

/* ── Content: image ── */
.avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;                     /* 비율이 다른 사진도 형태를 채운다 */
  display: block;
}

/* ── Content: initials ── */
.avatar__initials {
  font-family: var(--font-family-base);
  font-size: var(--avatar-initials-size);
  line-height: var(--line-height-ui);
  font-weight: var(--font-weight-heading);
  letter-spacing: var(--letter-spacing-default);
  color: var(--color-text-label);
}

/* ── Shape ── */
.avatar--square { --avatar-radius: var(--radius-sm); }
.avatar--square.avatar--lg,
.avatar--square.avatar--xl { --avatar-radius: var(--radius-md); }

/* ── Size ── */
.avatar--xs {
  --avatar-size: var(--height-tight);
  --avatar-initials-size: var(--font-size-meta);
}
.avatar--lg {
  --avatar-size: var(--height-spacious);
  --avatar-initials-size: var(--font-size-sm);
}
.avatar--xl {
  --avatar-size: var(--height-loose);
  --avatar-initials-size: var(--font-size-lg);
}
```

---

## 접근성

이미지 유형 (`design-system/accessibility.md` 이미지 행 적용). 색상 대비 해당.

**이름을 누가 말하는지가 이 컴포넌트의 전부다.** 세 경우로 갈린다.

| 상황 | 마크업 |
|------|--------|
| Avatar 옆에 이름 텍스트가 있다 | root에 `aria-hidden="true"` — 같은 이름을 두 번 읽지 않는다 |
| Avatar가 단독으로 사람을 가리킨다 (상단바 계정 등) | root에 `role="img" aria-label="[이름]"` |
| Avatar가 링크·버튼 안에 있다 | 링크·버튼이 이름을 갖고 root는 `aria-hidden="true"` |

- `img.avatar__img`의 `alt`에 이름을 넣었다면 root에 `aria-label`을 **중복해서 쓰지 않는다.** 사진이 장식이면 `alt=""`.
- `.avatar__initials`는 root가 `aria-label`을 가질 때 **항상 `aria-hidden="true"`** 다. 없으면 "홍"이라는 한 글자가 그대로 읽힌다.
- 이니셜 대비 — `--color-text-label`(gray-700) on `--color-surface-subtle`(gray-50)로 **7.95:1**, AA(4.5:1) 통과. 이니셜을 임의 색으로 바꾸면 이 값이 깨진다.
- 로고 마크 대비 — blue-600 on `--color-surface-brand-subtle`(blue-50)로 **5.75:1**, 비텍스트 기준(3:1) 통과. 실제 로고로 교체할 때 이 값을 다시 잰다 — 연한 브랜드 면 위에서 마크가 옅으면 형태가 사라진다.
- 안쪽 실선(`::after`)은 장식이다. 형태의 경계를 알리는 용도이므로 대비 기준을 적용하지 않는다 — 경계가 정보인 경우가 없다.

---

## Do / Don't

> ✅ DO — 기본값은 마크업이 없다
> `<span class="avatar" role="img" aria-label="김반장"></span>`

> ✅ DO — 이름이 옆에 있으면 Avatar는 숨긴다
> `<span class="avatar avatar--xs" aria-hidden="true"></span><span class="text-body">김반장</span>`

> ❌ DON'T — 이니셜을 3자 이상
> `<span class="avatar__initials">홍길동</span>` — 원 안에서 줄어들어 읽히지 않는다. 한글 1자·로마자 2자까지

> ❌ DON'T — 크기를 인라인 스타일로 지정
> `<span class="avatar" style="width:56px;height:56px">` — 이니셜 크기와 radius가 따라오지 않는다. size variant를 쓰거나 없으면 추가한다

> ❌ DON'T — 같은 행에서 Avatar와 Button의 size 이름을 다르게 읽기
> `<span class="avatar avatar--xs"></span><button class="btn btn--xs">` — 둘 다 24로 맞는다. `avatar--xs`와 `btn--sm`을 섞으면 8px 어긋난다

> ❌ DON'T — 사람과 사람 아닌 것을 한 목록에서 shape로 섞기
> `/* 한 열에 avatar와 avatar--square가 함께 오면 형태가 뜻을 잃는다 */`

> ❌ DON'T — Icon 자리에 Avatar
> `/* "사용자 관리" 메뉴 아이콘은 Icon이다. Avatar는 특정 주체를 가리킬 때만 쓴다 */`

> ❌ DON'T — `--avatar-logo`를 손으로 고치기
> 원본은 `logo/`에 있고 이 값은 `scripts/embed_logo.py`가 생성한다. 손으로 넣으면 CSS의 값과 폴더의 원본이 갈라진다

> ⚠️ `--avatar-logo`는 **아직 실제 김반장 로고가 아니다** — `logo/`에 자산이 들어오기 전까지 임시 사람 마크가 서 있다.
