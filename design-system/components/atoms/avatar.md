---
file: components/atoms/avatar.md
version:    0.2.3
status:     draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/radius.md, tokens/stroke.md, tokens/typography.md, tokens/height.md, components/atoms/skeleton.md
---

# Avatar

## 개요

사람·계정·조직을 한 자리에서 대신하는 작은 그림. 사진이 있으면 사진, 없으면 이니셜, 그것도 없으면 **김반장 로고**를 보여준다.

Icon과의 차이 — Icon은 **뜻**을 전하고(저장·삭제·닫기), Avatar는 **주체**를 가리킨다(이 글을 쓴 사람, 지금 로그인한 계정). 같은 사람 모양이어도 "사용자 관리" 메뉴의 그림은 Icon이고, 작성자 옆의 그림은 Avatar다.

로딩 중 자리는 Skeleton의 circle이 잡는다(`skeleton.md`).

아래 미리보기의 사진은 **더미**다 — 색조마다 팔레트의 `-100` 자리를 연한 면으로, 같은 색조를 `-600`의 채도로 아이콘에 썼다. 실제로는 사용자 사진이 들어간다.

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
- **사진 없는 사용자에게 시스템이 색을 배정하지 않는다.** 이름을 해시해 색을 고르는 방식(Slack·Google 등)은 사람마다 다른 색이 나와 목록에서 사람을 구분해 주지만, 그러려면 **아바타 전용 색 팔레트**가 있어야 한다 — 지금 팔레트의 red·green·orange는 상태를 뜻하므로 사람에게 쓰면 뜻이 겹친다. 필요해지면 팔레트부터 정의하고 `_requests.md`에 남긴다. 그때까지 사진이 없으면 이니셜, 그것도 없으면 로고다.

---

## Anatomy

<!-- AI:
- root = span.avatar. 자식이 없으면 로고가 배경으로 그려진다(CSS). 로고 자리는 --avatar-logo 커스텀 프로퍼티 하나다.
- image = img.avatar__img. root의 유일한 자식. alt에 이름을 넣으면 root에 aria-label을 쓰지 않는다.
- 미리보기의 image는 **더미다** — 색조마다 팔레트의 `-100` 자리를 면으로, 같은 색조를 `-600`의 채도로 아이콘에 쓴 짝이다. 대비는 시스템에서 가장 연한 tint 짝(caution)과 같은 3.72:1. 실제 구현에서는 사용자 사진 URL이 들어간다. 시스템은 사진 없는 사용자의 색을 정해 주지 않는다(아래 제약).
- initials = span.avatar__initials. 한글 1자 · 로마자 2자까지. 3자 이상 넣지 않는다(원 안에서 줄어들어 읽히지 않는다).
- initials를 쓸 때는 root에 role="img" aria-label="[이름]", initials에 aria-hidden="true".
- 이름이 바로 옆 텍스트에 있으면 root에 aria-hidden="true"를 주고 aria-label을 쓰지 않는다(같은 이름을 두 번 읽는다).
- 링크·버튼 안에 넣을 때는 그 링크·버튼이 이름을 갖고 Avatar는 aria-hidden="true"다.
-->

:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">logo (기본)</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm);flex-wrap:wrap">
    <span data-component class="avatar avatar--xs" role="img" aria-label="김반장"></span>
    <span data-component class="avatar" role="img" aria-label="김반장"></span>
    <span data-component class="avatar avatar--lg" role="img" aria-label="김반장"></span>
    <span data-component class="avatar avatar--xl" role="img" aria-label="김반장"></span>
    <span style="width:var(--space-gap-lg);flex-shrink:0"></span>
    <span data-component class="avatar avatar--square avatar--xs" role="img" aria-label="김반장건설"></span>
    <span data-component class="avatar avatar--square" role="img" aria-label="김반장건설"></span>
    <span data-component class="avatar avatar--square avatar--lg" role="img" aria-label="김반장건설"></span>
    <span data-component class="avatar avatar--square avatar--xl" role="img" aria-label="김반장건설"></span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">image</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm);flex-wrap:wrap">
    <span data-component class="avatar avatar--xs"><img class="avatar__img" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23dcebf9'/><circle cx='32' cy='26' r='11' fill='%231375d8'/><path d='M32 41c-13.3 0-24 8.8-24 19.6V64h48v-3.4C56 49.8 45.3 41 32 41Z' fill='%231375d8'/></svg>" alt="홍길동"></span>
    <span data-component class="avatar"><img class="avatar__img" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23dcf9f0'/><circle cx='32' cy='26' r='11' fill='%230c8d66'/><path d='M32 41c-13.3 0-24 8.8-24 19.6V64h48v-3.4C56 49.8 45.3 41 32 41Z' fill='%230c8d66'/></svg>" alt="김서연"></span>
    <span data-component class="avatar avatar--lg"><img class="avatar__img" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23f9eddc'/><circle cx='32' cy='26' r='11' fill='%23a9690f'/><path d='M32 41c-13.3 0-24 8.8-24 19.6V64h48v-3.4C56 49.8 45.3 41 32 41Z' fill='%23a9690f'/></svg>" alt="박준호"></span>
    <span data-component class="avatar avatar--xl"><img class="avatar__img" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23eedcf9'/><circle cx='32' cy='26' r='11' fill='%23a831ed'/><path d='M32 41c-13.3 0-24 8.8-24 19.6V64h48v-3.4C56 49.8 45.3 41 32 41Z' fill='%23a831ed'/></svg>" alt="이민아"></span>
    <span style="width:var(--space-gap-lg);flex-shrink:0"></span>
    <span data-component class="avatar avatar--square avatar--xs"><img class="avatar__img" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23f9dcef'/><circle cx='32' cy='26' r='11' fill='%23d31293'/><path d='M32 41c-13.3 0-24 8.8-24 19.6V64h48v-3.4C56 49.8 45.3 41 32 41Z' fill='%23d31293'/></svg>" alt="최유진"></span>
    <span data-component class="avatar avatar--square"><img class="avatar__img" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23dcf3f9'/><circle cx='32' cy='26' r='11' fill='%230e82a0'/><path d='M32 41c-13.3 0-24 8.8-24 19.6V64h48v-3.4C56 49.8 45.3 41 32 41Z' fill='%230e82a0'/></svg>" alt="정태윤"></span>
    <span data-component class="avatar avatar--square avatar--lg"><img class="avatar__img" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23e8f9dc'/><circle cx='32' cy='26' r='11' fill='%23428d0c'/><path d='M32 41c-13.3 0-24 8.8-24 19.6V64h48v-3.4C56 49.8 45.3 41 32 41Z' fill='%23428d0c'/></svg>" alt="오세훈"></span>
    <span data-component class="avatar avatar--square avatar--xl"><img class="avatar__img" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23e0dcf9'/><circle cx='32' cy='26' r='11' fill='%236b56f0'/><path d='M32 41c-13.3 0-24 8.8-24 19.6V64h48v-3.4C56 49.8 45.3 41 32 41Z' fill='%236b56f0'/></svg>" alt="한지우"></span>
  </div>
</div>
<div class="anatomy-row">
  <span class="anatomy-label">initials</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm);flex-wrap:wrap">
    <span data-component class="avatar avatar--xs" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
    <span data-component class="avatar" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
    <span data-component class="avatar avatar--lg" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
    <span data-component class="avatar avatar--xl" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
    <span style="width:var(--space-gap-lg);flex-shrink:0"></span>
    <span data-component class="avatar avatar--square avatar--xs" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
    <span data-component class="avatar avatar--square" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
    <span data-component class="avatar avatar--square avatar--lg" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
    <span data-component class="avatar avatar--square avatar--xl" role="img" aria-label="홍길동"><span class="avatar__initials" aria-hidden="true">홍</span></span>
  </div>
</div>
<hr class="anatomy-divider">
<div class="anatomy-row">
  <span class="anatomy-label">이름 옆</span>
  <div style="display:flex;align-items:center;gap:var(--space-gap-sm)">
    <span data-component class="avatar avatar--xs" aria-hidden="true"></span>
    <span class="text-body">김반장</span>
  </div>
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
     심볼만 쓴다 — 이름까지 든 full 로고는 가로로 길어 원 안에서 글자가 뭉갠다. */
  --avatar-logo: url("data:image/svg+xml,<svg width=%2249%22 height=%2237%22 viewBox=%220 0 49 37%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22> <path d=%22M9.4426e-09 15.8582L1.56205e-08 17.7392C1.74286e-08 18.2897 0.290175 18.8096 0.763618 19.1002L24.7412 34.2399C25.7645 34.8822 27.0932 34.7751 27.9942 33.9646L47.2985 16.5769C47.6345 16.2711 47.833 15.8276 47.833 15.3688L47.833 12.9832L25.4132 29.7592L9.4426e-09 15.8582Z%22 fill=%22url(%23paint0_linear_918_632)%22/> <path d=%22M0.687261 16.8216L24.7107 31.6095C25.7034 32.2213 26.971 32.0989 27.8415 31.3343L47.5276 13.6713C47.9399 13.3043 47.8941 12.6314 47.4818 12.2644C47.3749 12.1726 47.2679 12.0961 47.1458 12.0197L23.1376 0.947821C22.1449 0.336115 20.8773 0.458457 20.0068 1.22309L0.320725 15.17C-0.091629 15.5523 -0.091629 16.1487 0.320725 16.531C0.442903 16.6381 0.565082 16.7298 0.702533 16.8216L0.687261 16.8216Z%22 fill=%22url(%23paint1_linear_918_632)%22/> <path d=%22M36.6535 31.7933L36.6535 36.3352C36.6535 36.3352 17.9296 30.2028 18.0824 15.3843C18.0824 15.3843 25.184 27.5878 36.6535 31.778L36.6535 31.7933Z%22 fill=%22url(%23paint2_linear_918_632)%22/> <path d=%22M40.4717 2.93644L40.4717 5.7044C40.4717 5.7044 24.2677 8.16651 22.2976 15.3846L21.6409 11.3933L24.2677 6.5455L28.3149 4.26689L33.9962 2.92114L40.4564 2.92114L40.4717 2.93644Z%22 fill=%22url(%23paint3_linear_918_632)%22/> <path d=%22M40.5024 28.3374L40.5024 32.4205L36.6537 36.3354L36.6537 31.7935L36.6537 30.1266L40.5024 28.3374Z%22 fill=%22url(%23paint4_linear_918_632)%22/> <path d=%22M24.7718 20.4004C23.0765 18.5041 22.2824 16.5619 22.4046 14.6503C22.6184 11.3013 25.7645 8.02863 31.0334 5.68886C33.813 4.45016 37.0049 3.5326 40.4718 2.95148L34.0574 1.05491e-07C24.7565 2.75267 18.4948 7.98275 18.0978 14.3904C17.8992 17.4642 19.1057 20.5533 21.5493 23.2907C24.8176 26.9456 30.1782 29.9124 36.6537 31.8087L40.5023 28.3525C33.6297 26.7468 27.9026 23.9177 24.7565 20.4157L24.7718 20.4004Z%22 fill=%22%23F5D824%22/> <path d=%22M10.8893 3.25748L10.8893 5.84193C10.8893 5.84193 14.0201 11.0414 13.9437 16.2715L16.1582 12.3107L15.4404 8.53344L13.9437 5.68901L10.874 3.24219L10.8893 3.25748Z%22 fill=%22url(%23paint5_linear_918_632)%22/> <path d=%22M11.8974 31.1969C11.8974 31.1969 18.9837 25.1869 17.9605 14.8796L12.0654 23.8258L11.4697 26.0127L11.2101 28.9183L11.8821 31.1969L11.8974 31.1969Z%22 fill=%22url(%23paint6_linear_918_632)%22/> <path d=%22M8.55273 26.6094L8.55273 29.0562L11.8974 31.1971L11.8974 28.6739L11.4698 26.0129L8.55273 26.6094Z%22 fill=%22url(%23paint7_linear_918_632)%22/> <path d=%22M14.7074 2.04907L10.8893 3.25719C12.8136 6.42276 14.3103 11.087 14.1117 14.6655C13.8674 19.2227 11.8209 23.3364 8.55261 26.609L11.8973 28.6735C15.4557 24.8657 17.6702 20.125 17.9604 14.8949C18.2047 10.353 17.212 5.99457 14.7074 2.06437L14.7074 2.04907Z%22 fill=%22url(%23paint8_linear_918_632)%22/> <defs> <linearGradient id=%22paint0_linear_918_632%22 x1=%223.56107e-08%22 y1=%2223.8256%22 x2=%2247.8177%22 y2=%2223.8256%22 gradientUnits=%22userSpaceOnUse%22> <stop stop-color=%22%231A2E57%22/> <stop offset=%221%22 stop-color=%22%2321A2DC%22/> </linearGradient> <linearGradient id=%22paint1_linear_918_632%22 x1=%2222.1755%22 y1=%227.89068%22 x2=%2226.8145%22 y2=%2225.2753%22 gradientUnits=%22userSpaceOnUse%22> <stop stop-color=%22%23064A96%22/> <stop offset=%221%22 stop-color=%22%2321A2DC%22/> </linearGradient> <linearGradient id=%22paint2_linear_918_632%22 x1=%2218.0824%22 y1=%2225.8597%22 x2=%2236.6535%22 y2=%2225.8597%22 gradientUnits=%22userSpaceOnUse%22> <stop stop-color=%22%23CB5620%22/> <stop offset=%221%22 stop-color=%22%23F5D824%22/> </linearGradient> <linearGradient id=%22paint3_linear_918_632%22 x1=%2236.1344%22 y1=%222.06476%22 x2=%2222.5838%22 y2=%2216.6513%22 gradientUnits=%22userSpaceOnUse%22> <stop stop-color=%22%23CB5620%22/> <stop offset=%221%22 stop-color=%22%23F5D824%22/> </linearGradient> <linearGradient id=%22paint4_linear_918_632%22 x1=%2240.2886%22 y1=%2231.7171%22 x2=%2231.1376%22 y2=%2235.0431%22 gradientUnits=%22userSpaceOnUse%22> <stop stop-color=%22%23CB5620%22/> <stop offset=%221%22 stop-color=%22%23F5D824%22/> </linearGradient> <linearGradient id=%22paint5_linear_918_632%22 x1=%2210.8893%22 y1=%229.77214%22 x2=%2216.1582%22 y2=%229.77214%22 gradientUnits=%22userSpaceOnUse%22> <stop stop-color=%22%236D6E70%22/> <stop offset=%221%22 stop-color=%22%23E7E8E9%22/> </linearGradient> <linearGradient id=%22paint6_linear_918_632%22 x1=%2216.8762%22 y1=%2217.1124%22 x2=%2211.5795%22 y2=%2231.6205%22 gradientUnits=%22userSpaceOnUse%22> <stop stop-color=%22%236D6E70%22/> <stop offset=%221%22 stop-color=%22%23E7E8E9%22/> </linearGradient> <linearGradient id=%22paint7_linear_918_632%22 x1=%228.38474%22 y1=%2226.9917%22 x2=%2215.0622%22 y2=%2230.2573%22 gradientUnits=%22userSpaceOnUse%22> <stop stop-color=%22%236D6E70%22/> <stop offset=%221%22 stop-color=%22%23E7E8E9%22/> </linearGradient> <linearGradient id=%22paint8_linear_918_632%22 x1=%2212.89%22 y1=%222.95134%22 x2=%2213.2881%22 y2=%2220.5684%22 gradientUnits=%22userSpaceOnUse%22> <stop stop-color=%22%23DCDCDD%22/> <stop offset=%220.1%22 stop-color=%22%23EAEAEB%22/> <stop offset=%220.24%22 stop-color=%22%23F6F6F6%22/> <stop offset=%220.44%22 stop-color=%22%23FDFDFD%22/> <stop offset=%221%22 stop-color=%22white%22/> </linearGradient> </defs> </svg>");
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
/* 면은 base의 중립(surface-subtle) 그대로 둔다 — 이니셜과 같은 면이다.
   브랜드 색은 마크 자신이 갖고 있어서, 연한 브랜드 면을 깔면 마크의 파랑과 겹쳐 탁해진다.
   82%는 원 밖으로 넘치고 62%는 면 안에서 뜬다 — 62·72·82%를 네 크기에 나란히 렌더해 골랐다. */
.avatar:not(:has(.avatar__img, .avatar__initials)) {
  background-image: var(--avatar-logo);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 72%;
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
- 로고 마크는 **대비 기준의 예외**다(WCAG 1.4.11 — 로고타입·브랜드마크는 대비 요구가 없다). 상태나 정보를 전하지 않고 정체만 가리키며, 이름은 `aria-label`이 따로 말한다. 다만 `xs`(24)에서는 3D 마크가 색 덩어리로 읽힌다 — 로고가 **알아볼 수 있어야** 하는 자리라면 `lg` 이상을 쓴다.
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

> ⚠️ `xs`(24)에서는 3D 마크가 색 덩어리로 읽힌다. 로고가 **알아볼 수 있어야** 하는 자리라면 `lg` 이상을 쓴다.
