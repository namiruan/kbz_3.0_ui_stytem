---
file: components/organisms/content-list.md
version: 0.14.0
status: draft
updated: 2026-08-31
depends-on: components/_index.md, components/organisms/table/info.md, components/atoms/badge.md, components/atoms/icon.md, components/organisms/empty-state.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, tokens/icon.md, adaptation.md, product.md, accessibility.md
---

# ContentList

## 개요

게시판·자료실처럼 **읽을거리를 나열하는** 목록. 한 항목이 하나의 콘텐츠이고, 사용자는 그중 하나를 골라 읽는다.

데이터 테이블과의 차이 — 데이터 테이블은 행끼리 **비교**하기 위한 격자다(정렬·선택·엑셀·컬럼 설정이 붙는다). ContentList는 비교 대상이 아니라 **선택 대상**의 나열이라 컬럼 헤더가 없고, 제목만 시각 위계 최상위에 둔다. 좁은 화면에서 데이터 테이블은 가로 스크롤을 유지하지만 ContentList는 세로로 접힌다(→ `adaptation.md`).

정보 테이블과의 차이 — 시각 톤은 정보 테이블에서 가져왔다(좌우 라인·radius 없이 가로 구분선만, 줄바꿈 허용). 갈리는 지점은 두 가지다. 정보 테이블은 클릭 대상이 아니라 hover를 껐지만 ContentList는 **행 전체가 링크**라 hover가 필수다. 그리고 정보 테이블은 `<table>`이라 컬럼 폭이 고정되지만 ContentList는 `<ul>`이라 폭이 좁아져도 구조가 유지된다.

항목은 **번호 거터 + 본문** 두 열이다. 본문은 화면 폭에 따라 방향이 바뀐다 — 데스크톱에서는 제목(좌)과 부가 정보(우)를 한 줄에 나란히, `sm`에서는 제목 아래로 접는다. 번호는 어느 폭에서든 왼쪽 거터에 남아 정렬된 열을 유지한다.

한 줄 배치가 표처럼 읽히지 않게 하는 것은 레이아웃이 아니라 **메타의 처리**다. 분류를 칩으로, 조회수를 아이콘으로 만들면 메타 줄에 세 가지 시각 언어가 섞여 제목과 경쟁하고, 그 순간 컬럼 없는 표가 된다. 메타를 전부 같은 크기·같은 무게의 텍스트로 두면 제목이 위계를 독점한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| 번호 | 있음 (기본) — `.content-list__no` 슬롯 · 없음 | 있음 |
| header | 없음 (기본) · 있음 — `.content-list__header` 슬롯 | 없음 |
| excerpt | 없음 (기본) · 있음 — `.content-list__excerpt` 슬롯 | 없음 |
| 플래그 | 없음 (기본) · 있음 — `.content-list__flag` 슬롯 | 없음 |
| 신규 표시 | 없음 (기본) · 있음 — `.content-list__new` 슬롯 | 없음 |

- **번호** — 게시물 번호. 기본으로 표시한다. 상담원이 "165번 글 보세요"처럼 항목을 지목하는 창구가 되므로, 목록에 없으면 전화로 글을 특정할 방법이 사라진다. 사내 전용 목록처럼 지목할 일이 없으면 생략한다. 왼쪽 거터에 두고 숫자만 적는다.
- **플래그** — 운영자가 붙이는 상태 표시(`필독`·`공지`·`마감임박`). Badge 컴포넌트를 그대로 쓴다. 한 항목에 **하나만** 붙인다.
- **신규 표시** — 등록 후 일정 기간 자동으로 붙는 표시. `icon-new` 아이콘을 쓴다. 플래그와 **함께 나올 수 있다**(예: 새로 올라온 필독 공지).
- **excerpt** — 본문 요약 2줄. 제목만으로 내용이 짐작되지 않는 목록(뉴스·아티클)에만 쓴다. 제목이 이미 설명적인 자료실에는 두지 않는다.

layout 차원은 없다. 본문 방향(가로/세로)은 화면 폭이 결정한다 — variant로 노출하지 않는다.

---

## 사용 지침

### 어느 목록에 쓰나

| 판단 | 컴포넌트 |
|------|---------|
| 사용자가 행끼리 **비교**한다 (정렬·선택·일괄 처리·엑셀) | 데이터 테이블 (`table/data.md`) |
| 사용자가 한 건을 **골라 읽는다** (게시판·자료실·공지·뉴스) | **ContentList** |
| 한 건의 **속성**을 나열한다 (계약 정보·상세 항목) | 정보 테이블 (`table/info.md`) |

### 메타에 무엇을 넣나

메타 줄은 **번호 → 분류 → 날짜 → 조회수** 순서로 고정한다. 목록 전체에서 값이 같은 항목은 정보량이 0이므로 넣지 않는다(예: 전 건이 "관리자"인 작성자).

메타는 전부 **같은 크기·같은 무게의 텍스트**로 둔다. 칩이나 아이콘을 섞으면 메타가 제목과 시각적으로 경쟁해 "제목이 유일한 목적지"라는 위계가 무너진다. 구분되어야 하는 것은 분류 하나뿐이고, 그건 색으로 처리한다.

- ✅ `4대보험 · 2024.03.20 · 조회 1,011` — 같은 무게, 분류만 색
- ❌ 분류를 Badge 칩으로, 조회수를 아이콘+숫자로 — 메타 줄에 세 가지 시각 언어가 섞인다

번호는 메타에 넣지 않고 **왼쪽 거터(`__no`)에 따로 둔다.** 읽을지 판단하는 정보가 아니라 항목을 **지목하는 식별자**라 역할이 다르다. 오른쪽 메타에 섞으면 앞 항목(분류)의 길이에 따라 번호 위치가 행마다 흔들려, 상담 중 번호를 훑는 동작이 불가능해진다. 거터에 두면 자릿수와 무관하게 한 열로 정렬된다.

### 텍스트 색 위계

한 항목 안에 텍스트가 세 층으로 쌓인다. **색 한 단계씩** 내려가며 역할을 나눈다.

| 요소 | 색 | 역할 |
|------|-----|------|
| 제목 (`__link`) | `--color-text-body` | 목적지. 유일하게 클릭 대상 |
| 요약문 (`__excerpt`) · 번호 (`__no`) | `--color-text-label` | 읽는 내용 / 훑어서 찾는 식별자 |
| 메타 (`__meta`) | `--color-text-subtle` | 읽을지 판단하는 보조 정보 |

번호가 메타보다 진한 이유는 **훑는 대상**이기 때문이다. 상담 중 "165번"을 눈으로 찾아야 하는데 판단 보조 정보와 같은 명도면 열이 묻힌다. 요약문과 같은 단계지만 왼쪽 거터에 따로 있어 서로 경쟁하지 않는다.

> ⚠️ 요약문과 메타에 같은 색을 쓰지 않는다. 두 줄이 한 덩어리로 뭉쳐 어디까지가 내용인지 구분되지 않는다.

### 플래그(`__flag`)와 신규 표시(`__new`)

제목 뒤에 붙는 표시가 두 종류다. **성격이 다르므로 형태도 다르게 두고, 하나로 합치지 않는다.**

| | 신규 표시 (`__new`) | 플래그 (`__flag`) |
|---|---|---|
| 누가 붙이나 | 시스템이 자동으로 (등록일 기준) | 운영자가 수동으로 |
| 형태 | **아이콘** (`icon-new`) | **Badge** (텍스트) |
| 개수 | 0 또는 1 | 0 또는 1 |
| 동시 노출 | **가능** — 새로 올라온 필독 공지는 둘 다 붙는다 | |

형태를 다르게 두는 것이 핵심이다. 신규까지 Badge로 만들면 뱃지 두 개가 나란히 붙어 **무엇이 자동이고 무엇이 운영자 판단인지 구분되지 않는다.** 아이콘과 텍스트는 형태가 달라 둘이 나란히 있어도 역할이 읽힌다.

순서는 **제목 → 신규 → 플래그**로 고정한다.

#### 플래그 라벨

Badge 컴포넌트를 그대로 쓴다.

| 예 | style | 뜻 |
|-----|-------|-----|
| 필독 | `badge--error` | 반드시 읽어야 함 |
| 마감임박 | `badge--caution` | 기한이 걸려 있음 |
| 공지 | `badge--brand` | 운영 안내 |

라벨은 자유롭게 정하되 **색 강도 = 우선순위**를 지킨다. 목록에서 가장 강한 색이 가장 급한 항목이어야 한다.

**제목 앞이 아니라 뒤에 둔다.** 앞에 두면 뱃지 길이에 따라 제목 시작선이 행마다 달라져(측정: 97 / 137 / 161px) 제목을 훑을 수 없다. 뒤에 두면 제목 시작선이 고정되고, 긴 제목은 제목만 말줄임되고 플래그는 남는다.

> ⚠️ 한 항목에 플래그는 **하나만**. 둘 이상 붙이면 제목 폭을 잠식하고, 무엇이 더 급한지 알 수 없게 된다.
> ⚠️ 목록 전체의 20%를 넘기지 않는다. 절반이 `필독`이면 아무것도 필독이 아니다.

### 덩어리 나누기 — 간격은 줄 간격보다 커야 한다

색만으로는 부족하다. **블록 사이 간격이 그 블록의 줄 간격보다 좁으면, 다음 블록은 앞 블록의 다음 줄로 읽힌다.**

| | 글자 사이 흰 공간 |
|---|---|
| 요약문의 줄과 줄 사이 | 7px |
| 요약문 ↔ 메타 (기본 gap 4px) | 6px ← **줄 간격보다 좁다** |
| 요약문 ↔ 메타 (`--space-gap-sm` 추가) | 14px ← 줄 간격의 2배 |

제목·요약문은 붙여 한 덩어리(내용)로 두고, 메타만 떨어뜨려 별개(판단 보조)로 만든다. 칩·아이콘·구분선을 더하지 않고 **근접성**으로 나눈다.

### 번호와 총 건수 중 무엇을 쓰나

둘 다 두지 않는다. 내림차순 게시판에서는 첫 항목의 번호가 곧 총 건수라 중복이다.

| 화면 | 표시 |
|------|------|
| 고객·상담원이 글을 지목한다 (지식센터·공지·자료실) | **번호**(`__no`). header에 건수를 두지 않는다 |
| 필터·검색 결과 수가 판단 근거다 (조회 화면) | **총 건수**(`__count`). 번호를 생략한다 |

### 상태 (→ `product.md`)

| 상태 | 처리 |
|------|------|
| empty | `.content-list` 자리에 `empty-state--compact`. header(총 건수)와 검색·필터는 그대로 둔다 |
| loading | 항목 자리에 `skeleton`. 행 수와 높이를 유지해 레이아웃이 흔들리지 않게 한다 |
| error | 목록 위에 `banner--error`. 목록 구조는 유지한다 |

### 제약

- 항목 안에 버튼·체크박스 등 **별개의 클릭 대상을 넣지 않는다.** 행 전체가 링크라 클릭 영역이 겹친다. 항목별 액션이 필요하면 데이터 테이블을 쓸 화면이다.
- 페이지 제목·Breadcrumb은 이 컴포넌트가 담당하지 않는다. `__header`는 목록 자체의 건수·소제목만 다룬다.
- 총 건수와 Pagination의 총량을 중복 표기하지 않는다. 총 건수의 정본은 `__header` 한 곳이다.

<!-- AI:
레이어 계층: ContentList
  .content-list-container — div. 루트. 좌우 라인 없이 가로 구분선만 갖는 프레임.
       header가 있으면 상단 선을 두지 않는다 — header의 하단선이 시작점을 표시한다.
       header가 없으면 ul(.content-list:first-child)이 상단 선을 갖는다.
  ├─ .content-list__header — div. optional. 목록 소제목.
  │    └─ .content-list__heading — div. 소제목.
  │         heading 태그가 아니라 div (UA 마진으로 레이아웃 깨짐 — table__title과 동일 이유).
  └─ .content-list — ul. list-style:none.
       └─ .content-list__item — li. **번호 거터 + 본문** 두 열. position:relative (링크 오버레이 기준점).
            ├─ .content-list__no — span. optional(기본 표시). "165" 형태. 어느 폭에서든 왼쪽 거터에 남는다.
            └─ .content-list__body — div. 제목·요약·메타 묶음. flex:1 min-width:0.
                 데스크톱에서는 가로(제목 좌 / 메타 우), sm에서는 세로로 접힌다.
                 요약문이 있으면 데스크톱에서도 세로를 유지한다(:has로 분기).
                 ├─ .content-list__headline — div. 제목 + 플래그를 한 줄에 묶는다.
                 │    │  플래그를 링크 안에 넣으면 말줄임에 함께 잘려 "필독"이 사라진다.
                 │    │  형제로 두고 flex-shrink:0을 줘야 제목만 잘리고 플래그는 남는다.
                 │    ├─ .content-list__link — a. 제목. **제목 텍스트만 감싼다.**
                 │    │    ::after가 item 전체를 덮어 행 전체가 클릭된다(stretched link 패턴).
                 │    │    링크명이 제목만으로 읽히므로 스크린리더에서 메타·플래그가 링크명에 섞이지 않는다.
                 │    │    데스크톱 가로 배치에서는 한 줄 말줄임, sm에서는 2줄 말줄임.
                 │    ├─ .content-list__new — span. optional. icon-new 아이콘. aria-label="신규" 필요.
                 │    │    시스템이 등록일 기준으로 자동 부여. 플래그와 동시에 나올 수 있다.
                 │    └─ .content-list__flag — span. optional. Badge 컴포넌트를 함께 쓴다.
                 │         예: <span class="content-list__flag badge badge--error">필독</span>
                 │         운영자가 수동 부여. 텍스트 라벨이므로 aria-label 불필요. 한 항목에 하나만.
                 │         순서 고정: 제목 → __new → __flag.
                 ├─ .content-list__excerpt — p. optional. 본문 요약 2줄. 색은 --color-text-label(메타보다 한 단계 진함).
                 └─ .content-list__meta — div. 부가 정보. 순서 고정: 분류 → 날짜 → 조회수.
                      ├─ .content-list__cat — span. 분류. 브랜드 색 텍스트.
                      ├─ .content-list__date — span. YYYY.MM.DD (product.md 날짜 포맷).
                      └─ .content-list__views — span. "조회 1,011". 아이콘 없이 텍스트.

- 메타 항목 사이 가운뎃점(·)은 CSS ::before가 자동 삽입한다. 마크업에 구분자를 적지 않는다.
- 요약문이 있으면 __excerpt + __meta 규칙이 메타 앞 간격을 자동으로 넓힌다. 마크업으로 조정하지 않는다.
- 분류에 Badge(칩)를 쓰지 않는다. 한 줄에 칩·아이콘이 섞이면 메타가 제목과 시각적으로 경쟁한다.
  메타는 전부 같은 크기·같은 무게의 텍스트로 두고, 분류만 색으로 구분한다.
- 조회수에 아이콘을 쓰지 않는다. "조회 1,011"로 적으면 sr-only 보조 텍스트도 필요 없다.
- __header는 소제목만 담는다. 총 건수(__count)는 조회 화면용 대안 — __no와 함께 쓰지 않는다(사용 지침 참조).
- 번호는 메타에 넣지 않는다. 메타에 섞으면 앞 항목 길이에 따라 번호 위치가 행마다 흔들려 훑기가 불가능해진다.
- 아이콘은 icons/categories.json의 ID만 사용한다. 신규 표시는 icon-new. sprite 경로는 icons/sprite.svg#[id].
- 외부 클래스 의존: .badge를 쓰지 않는다. empty-state--compact(organisms/empty-state.md) ·
  skeleton(atoms/skeleton.md) · banner--error(molecules/banner.md).
- disabled 상태는 정의하지 않는다. 항목은 콘텐츠로 가는 링크일 뿐이라 비활성 개념이 없다 —
  읽을 수 없는 항목은 목록에서 제외하지, 흐리게 표시하지 않는다.
-->

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-3xl)">

<!-- 기본 — header 있음 -->
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">기본 — header 있음. 165는 신규+필독, 164는 신규만</p>
  <div data-component class="content-list-container">
    <div class="content-list__header">
      <div class="content-list__heading">자료 목록</div>
    </div>
    <ul class="content-list">
      <li class="content-list__item">
        <span class="content-list__no">165</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">2024년 건설보험료신고_노무제공자신고</a>
            <span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span>
            <span class="content-list__flag badge badge--error">필독</span>
          </div>
          <div class="content-list__meta">
            <span class="content-list__cat">4대보험</span>
            <span class="content-list__date">2024.03.20</span>
            <span class="content-list__views">조회 1,011</span>
          </div>
        </div>
      </li>
      <li class="content-list__item">
        <span class="content-list__no">164</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">2021년 귀속 보수총액신고 방법 안내_ 비즈씨/세무사랑 사용자편</a>
            <span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span>
          </div>
          <div class="content-list__meta">
            <span class="content-list__cat">4대보험</span>
            <span class="content-list__date">2022.02.21</span>
            <span class="content-list__views">조회 918</span>
          </div>
        </div>
      </li>
      <li class="content-list__item">
        <span class="content-list__no">163</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">건설업교육 일정 연기에 따른 교육미이수 업체 부담완화 조치방안 안내</a>
            <span class="content-list__flag badge badge--brand">공지</span>
          </div>
          <div class="content-list__meta">
            <span class="content-list__cat">김반장뉴스레터</span>
            <span class="content-list__date">2020.09.22</span>
            <span class="content-list__views">조회 89</span>
          </div>
        </div>
      </li>
      <li class="content-list__item">
        <span class="content-list__no">7</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">건설업 보험료신고 이론</a>
          </div>
          <div class="content-list__meta">
            <span class="content-list__cat">4대보험</span>
            <span class="content-list__date">2021.03.08</span>
            <span class="content-list__views">조회 1,685</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>

<!-- excerpt 있음 -->
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">excerpt 있음 — 데스크톱에서도 세로 유지. 162는 신규+필독</p>
  <div data-component class="content-list-container">
    <ul class="content-list">
      <li class="content-list__item">
        <span class="content-list__no">162</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">건설업 보험료신고 이론</a>
            <span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span>
            <span class="content-list__flag badge badge--error">필독</span>
          </div>
          <p class="content-list__excerpt">건설현장에 투입된 노무제공자(건설기계, 건설화물)의 보수총액 산정 방식을 정리한 강의 자료입니다.</p>
          <div class="content-list__meta">
            <span class="content-list__cat">4대보험</span>
            <span class="content-list__date">2021.03.08</span>
            <span class="content-list__views">조회 1,685</span>
          </div>
        </div>
      </li>
      <li class="content-list__item">
        <span class="content-list__no">161</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">보험료신고안내 — 원도급공사만 진행</a>
          </div>
          <p class="content-list__excerpt">원도급공사만 수행하는 사업장의 고용·산재보험 보험료 신고 절차를 단계별로 안내합니다.</p>
          <div class="content-list__meta">
            <span class="content-list__cat">4대보험</span>
            <span class="content-list__date">2021.03.08</span>
            <span class="content-list__views">조회 220</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>

<!-- empty -->
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">empty — 검색 결과 없음</p>
  <div data-component class="content-list-container">
    <div class="content-list__header">
      <div class="content-list__heading">자료 목록</div>
    </div>
    <div class="empty-state empty-state--compact">
      <p class="empty-state__title text-body">조건에 맞는 자료가 없어요</p>
    </div>
  </div>
</div>

</div>
:::

---

## Anatomy

:::preview
<div data-component class="content-list-container">
  <ul class="content-list">
    <li class="content-list__item">
      <span class="content-list__no">165</span>
      <div class="content-list__body">
        <div class="content-list__headline">
          <a class="content-list__link" href="#">2024년 건설보험료신고_노무제공자신고</a>
          <span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span>
          <span class="content-list__flag badge badge--error">필독</span>
        </div>
        <div class="content-list__meta">
          <span class="content-list__cat">4대보험</span>
          <span class="content-list__date">2024.03.20</span>
          <span class="content-list__views">조회 1,011</span>
        </div>
      </div>
    </li>
  </ul>
</div>
:::

---

## CSS

```css
/* ── Container ── */
/* table--info와 같은 톤 — 좌우 라인·radius 없이 구분선만. 본문 흐름에 얹힌다.
   상단 선은 두지 않는다: header의 하단선이 목록의 시작점을 표시하므로,
   그 위에 선을 하나 더 두면 시작점이 어디인지 흐려진다. */
.content-list-container {
  display: flex;
  flex-direction: column;
  background: var(--color-surface-base);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* header 없이 목록만 쓸 때는 위쪽 경계가 사라지므로 ul이 직접 갖는다 */
.content-list-container > .content-list:first-child {
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* ── Header (optional) ── */
/* 색면을 깔지 않는다. 목록의 머리는 배경이 아니라 타이포와 선으로 표시한다 —
   화면에서 칠해진 면은 hover 하나로 유지해야 "어디가 누를 수 있는 곳인가"가 흐려지지 않는다. */
.content-list__header {
  display: flex;
  align-items: center;
  height: var(--height-loose);
  padding: 0 var(--space-inset-3xl);
  background: var(--color-surface-base);
  /* 행 구분선(--color-border-subtle)보다 진한 --color-border-strong.
     같은 1px이라도 색으로 위계를 만든다 — 머리와 본문은 층위가 다른 구획이고,
     항목 사이는 같은 층위의 나열이다. 두께로 강조하면 굵은 밑줄 관용구가 된다. */
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-strong);
}

.content-list__heading {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-heading);
  letter-spacing: var(--letter-spacing-default);
  color: var(--color-text-display);
}

/* 총 건수 — __no와 함께 쓰지 않는다(사용 지침 참조). 필터 중심 조회 화면 전용. */
.content-list__count {
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
}

.content-list__count-value {
  color: var(--color-text-body);
  font-weight: var(--font-weight-heading);
}

.content-list__count + .content-list__heading {
  margin-left: var(--space-gap-md);
  padding-left: var(--space-gap-md);
  border-left: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* ── List ── */
.content-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ── Item ── */
/* 번호 거터 + 본문 두 열. 번호는 어느 폭에서든 거터에 남아 정렬된 열을 유지한다.
   position:relative — __link::after 오버레이의 기준점. */
.content-list__item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-gap-lg);
  position: relative;
  /* 행 사이 간격은 border만 담당한다 — margin을 명시해 호스트 페이지의 li 스타일에 흔들리지 않게 한다.
     전역 리셋 `*`(명시도 0,0,0)에 기대면 호스트가 `li { margin }`(0,0,1) 하나만 둬도 무너진다. */
  margin: 0;
  padding: var(--space-inset-xl) var(--space-inset-3xl);
}

.content-list__item + .content-list__item {
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}

/* ── Body (제목 + 요약 + 메타) ── */
/* 기본(좁은 화면)은 세로. md 이상에서 가로로 눕는다. */
.content-list__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-xs);
}

/* ── Link (제목) ── */
/* ::after가 item 전체를 덮어 행 전체가 클릭 영역이 된다.
   링크 텍스트는 제목만이라 스크린리더 링크명에 메타가 섞이지 않는다. */
/* -webkit-line-clamp는 display:-webkit-box + -webkit-box-orient:vertical과 함께여야 동작한다.
   세 속성이 한 세트이므로 따로 떼어내지 않는다. 텍스트는 DOM에 그대로 남아 스크린리더는 전문을 읽는다. */
.content-list__link {
  /* 0 1 auto — 남는 폭을 채우지 않는다. 채우면(flex:1) 플래그가 제목에서 떨어져
     행 오른쪽 끝(메타 옆)에 붙어 버린다. 플래그는 제목에 딸린 표시이므로 제목 바로 뒤에 있어야 한다.
     min-width:0 + shrink 허용 — 긴 제목은 줄어들며 말줄임되고, 플래그는 그대로 남는다. */
  flex: 0 1 auto;
  min-width: 0;
  font-size: var(--font-size-h4);
  line-height: var(--line-height-reading);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-body);
  text-decoration: none;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.content-list__link::after {
  content: '';
  position: absolute;
  inset: 0;
}

/* ── Headline (제목 + 플래그) ── */
/* 플래그를 링크 안에 넣으면 말줄임(-webkit-line-clamp / ellipsis)에 함께 잘려
   정작 읽혀야 할 "필독"이 사라진다. 형제로 두고 flex-shrink:0을 줘야
   제목만 잘리고 플래그는 남는다. */
.content-list__headline {
  display: flex;
  /* baseline — 플래그의 글자 기준선을 제목 첫 줄에 맞춘다.
     center로 두면 제목이 2줄로 접히는 sm에서 플래그가 두 줄 한가운데(9px 아래)에 뜬다.
     baseline은 1줄·2줄 모두 오차 2px 안쪽이라 breakpoint 분기가 필요 없다. */
  align-items: baseline;
  gap: var(--space-gap-sm);
  min-width: 0;
}

/* ── New mark (optional) ── */
/* 시간 기반 자동 표시. 운영자가 붙이는 플래그와 형태를 다르게 둔다 —
   둘 다 Badge면 나란히 붙었을 때 무엇이 자동이고 무엇이 판단인지 구분되지 않는다.
   align-self:center — headline이 baseline 정렬인데 아이콘은 글자가 없어 기준선이 잡히지 않는다. */
.content-list__new {
  flex-shrink: 0;
  display: inline-flex;
  align-self: center;
}

.content-list__new svg {
  width: var(--icon-sm);
  height: var(--icon-sm);
  fill: var(--color-fill-error);
}

/* ── Flag (optional) ── */
/* Badge 컴포넌트를 함께 쓴다 — 배경·색·크기는 badge.md가 담당하고
   여기서는 잘리지 않게 하는 것만 정의한다. */
.content-list__flag {
  flex-shrink: 0;
}

/* ── Excerpt (optional) ── */
/* 색은 메타(--color-text-subtle)보다 한 단계 진한 --color-text-label을 쓴다.
   요약문은 "읽는 내용"이고 메타는 "읽을지 판단하는 보조 정보"라 역할이 다르다.
   같은 색이면 두 줄이 한 덩어리로 뭉쳐 어디까지가 내용인지 구분되지 않는다.
   장식(칩·아이콘·구분선)을 더하지 않고 색 한 단계로만 나눈다. */
/* line-clamp 3속성 세트 — __link와 동일 */
.content-list__excerpt {
  font-size: var(--font-size-base);
  line-height: var(--line-height-reading);
  color: var(--color-text-label);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* ── Meta ── */
/* 전부 같은 크기·같은 무게의 텍스트로 둔다. 칩·아이콘을 섞으면 메타가 제목과 시각적으로 경쟁한다.
   구분되어야 하는 것은 분류뿐이고, 그건 색으로 처리한다. */
.content-list__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-gap-xs);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-ui);
  color: var(--color-text-subtle);
  font-variant-numeric: tabular-nums;
}

/* 가운뎃점 구분자를 CSS가 삽입한다 — 마크업에 구분자 요소를 두지 않는다.
   첫 항목 앞에는 붙지 않으므로 슬롯을 빼도 구분자가 남지 않는다. */
.content-list__meta > :not(:first-child)::before {
  content: '·';
  margin-inline-end: var(--space-gap-xs);
  color: var(--color-border-default);
}

/* ── Meta 앞 간격 (요약문이 있을 때) ── */
/* 요약문 줄 간격(14px × 1.5 = 21px → 글자 사이 흰 공간 7px)보다 좁으면
   메타가 요약문의 "다음 줄"로 읽힌다. 기본 gap(4px)일 때 흰 공간이 6px라
   줄 간격보다도 좁았다. 줄 간격의 두 배(약 14px)를 확보해 다른 덩어리로 끊는다.
   제목·요약문은 붙여 한 덩어리(내용), 메타는 떨어뜨려 별개(판단 보조)로 만든다. */
.content-list__excerpt + .content-list__meta {
  margin-top: var(--space-gap-sm);
}

/* ── No (게시물 번호) ── */
/* 상담원이 "165번 글"처럼 항목을 지목하는 식별자. 링크 밖에 두어
   스크린리더 링크명이 제목만으로 읽히는 것을 유지한다.
   메타에 넣지 않고 거터에 두는 이유: 메타에 섞으면 앞 항목(분류)의 길이에 따라
   번호 위치가 행마다 흔들려 훑기가 불가능해진다.
   폭을 글자 수로 고정해 자릿수와 무관하게 한 열로 정렬한다. px가 아니라 ch —
   폰트가 바뀌어도 4자리 기준이 유지되고, 5자리부터는 자연히 넓어진다. */
.content-list__no {
  flex-shrink: 0;
  min-width: 4ch;
  text-align: right;
  /* 제목 첫 줄에 맞춘다 — 제목이 2줄로 접혀도 번호는 위에 남는다 */
  line-height: var(--line-height-reading);
  font-size: var(--font-size-sm);
  color: var(--color-text-label);
  font-variant-numeric: tabular-nums;
}

/* 분류 — 메타 안에서 유일하게 색으로 구분한다 */
.content-list__cat {
  color: var(--color-text-brand);
}

/* ── Hover ── */
/* 정보 테이블은 hover가 없다(클릭 대상이 아님). 목록은 행 전체가 링크라 hover가 필수다.
   배경은 데이터 테이블 행 hover(.table__body .table__row:hover)와 같은 토큰을 쓴다 —
   "이 행은 누를 수 있다"는 신호는 시스템 전체에서 하나여야 한다. */
.content-list__item:hover {
  background: var(--color-action-brand-subtle);
}

.content-list__item:hover .content-list__link {
  color: var(--color-text-brand);
}

/* ── Focus ── */
/* 오버레이(::after)가 아니라 제목 박스에 outline이 걸린다 — 무엇이 포커스됐는지 명확 */
.content-list__link:focus-visible {
  outline: var(--stroke-md) var(--stroke-solid) var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── md 이상 — 본문을 가로로 눕힌다 ── */
/* 제목(좌)과 부가 정보(우)를 한 줄에 나란히 둔다. 데이터 테이블이 가로 스크롤을
   유지하는 것과 달리, 폭이 좁아지면 이 규칙이 풀려 자연히 세로로 접힌다(adaptation.md). */
@media (min-width: 768px) {
  /* 한 줄 항목만 세로 가운데 정렬한다. 요약문이 있으면 본문이 세로로 길어지는데,
     그때 가운데 정렬하면 번호가 제목이 아니라 항목 한가운데에 떠 버린다. */
  .content-list__item:not(:has(.content-list__excerpt)) { align-items: center; }

  .content-list__body {
    flex-direction: row;
    align-items: center;
    gap: var(--space-gap-lg);
  }

  .content-list__headline { flex: 1; min-width: 0; }

  /* 제목은 한 줄로 자른다 — 메타가 오른쪽에 있어 제목이 여러 줄이면 두 열의 축이 어긋난다 */
  .content-list__link {
    display: block;
    -webkit-line-clamp: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .content-list__meta { flex-shrink: 0; }

  /* 요약문이 있으면 가로로 나란히 놓을 수 없다 — 세로 스택을 유지하고 제목도 2줄 말줄임으로 되돌린다 */
  .content-list__body:has(.content-list__excerpt) {
    flex-direction: column;
    align-items: stretch;
    /* gap을 기본값으로 되돌린다. 위 --space-gap-lg(16px)은 가로 배치에서
       제목과 메타를 벌리려는 값인데, 세로 배치에서는 제목과 요약문 사이 간격이 되어
       한 덩어리로 읽혀야 할 둘을 갈라놓는다. */
    gap: var(--space-gap-xs);
  }
  .content-list__body:has(.content-list__excerpt) .content-list__link {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    white-space: normal;
  }
}

/* ── sm (<768px) ── */
/* 본문이 기본 상태(세로)로 돌아간다. 번호 거터는 유지하고 좌우 inset만 한 단계 줄인다. */
@media (max-width: 767px) {
  .content-list__item,
  .content-list__header { padding-inline: var(--space-inset-2xl); }
  .content-list__link { font-size: var(--font-size-lg); }
  .content-list__heading { font-size: var(--font-size-h4); }
}
```

---

## 접근성

목록 유형 (`design-system/accessibility.md` 목록 행 적용).  
키보드 접근·focus·색상 대비 해당. loading·disabled 상태 없음.

| 조작 | 동작 |
|------|------|
| `Tab` | 항목의 제목 링크로 순서대로 이동. 메타는 포커스 대상이 아니다 |
| `Enter` | 포커스된 항목 열기 |

네이티브 `<a>`의 기본 동작이므로 JS 키보드 핸들러를 두지 않는다. 항목을 `<div>` + `onclick`으로 만들면 이 동작이 사라진다.

- 목록은 `<ul>` + `<li>`로 마크업한다. 스크린리더가 "목록, 항목 6개"로 항목 수를 먼저 안내한다.
- 링크는 **제목 텍스트만** 감싼다. 메타까지 `<a>`로 묶으면 링크명이 "제목 4대보험 2024.03.20 조회 1,011"로 읽혀 목록 훑기가 불가능해진다. 행 전체 클릭은 `::after` 오버레이가 담당한다.
- 게시물 번호(`__no`)에 `aria-hidden`을 붙이지 않는다 — 상담 안내에 쓰이는 실제 식별자다.
- 메타는 아이콘 없이 텍스트로 적는다(`조회 1,011`). 아이콘+숫자 조합이 아니므로 `.sr-only` 보조 텍스트가 필요 없다.
- 가운뎃점 구분자는 CSS `::before`로 넣는다. 생성 콘텐츠라 스크린리더가 읽지 않아 "점"이 낭독에 끼어들지 않는다.
- 신규 표시(`__new`)는 아이콘이라 글자가 없다. `aria-label="신규"`를 부여한다(`aria-hidden` 금지) — 장식이 아니라 정보다.
- 플래그(`__flag`)는 텍스트 라벨이라 `aria-label`이 필요 없다. 링크 **밖**에 두어 링크명이 제목만으로 읽히게 하고, 낭독 순서는 "제목 링크 → 필독"이 된다.
- 플래그는 색과 텍스트를 함께 쓴다. 색만으로 우선순위를 표현하지 않는다 — `필독`이라는 글자가 있어야 색을 못 봐도 전달된다.
- 텍스트 3층 모두 흰 배경에서 WCAG AA 본문 기준(4.5:1)을 넘는다 — 제목 18.43:1 · 요약문 8.68:1 · 메타 4.51:1. `--color-text-disabled`(3.08:1)는 이 컴포넌트에 쓰지 않는다.
- 분류는 색으로만 구분한다. 값 자체가 텍스트(`4대보험`)로 적혀 있으므로 색을 못 봐도 정보가 전달된다.
- 제목 2줄 말줄임은 CSS `-webkit-line-clamp`이므로 텍스트가 DOM에 그대로 남는다. 스크린리더는 전체 제목을 읽는다.

---

## Do / Don't

> ✅ DO — 번호는 거터에, 본문은 __body로 묶고, 링크는 제목만 감싼다
> `<li class="content-list__item"><span class="content-list__no">165</span><div class="content-list__body"><a class="content-list__link" href="…">제목</a><div class="content-list__meta">…</div></div></li>`

> ❌ DON'T — 번호를 메타에 넣기 (앞 항목 길이에 따라 위치가 흔들려 훑기 불가)
> `<div class="content-list__meta"><span class="content-list__no">#165</span><span class="content-list__cat">4대보험</span></div>`

> ✅ DO — 메타는 전부 같은 크기·무게의 텍스트. 분류만 색으로 구분
> `<span class="content-list__cat">4대보험</span><span class="content-list__date">2024.03.20</span><span class="content-list__views">조회 1,011</span>`

> ✅ DO — 플래그는 링크 밖, headline의 형제로 (말줄임에 잘리지 않는다)
> `<div class="content-list__headline"><a class="content-list__link" href="…">제목</a><span class="content-list__flag badge badge--error">필독</span></div>`

> ❌ DON'T — 플래그를 링크 안에 넣기 (긴 제목에서 말줄임에 함께 잘림)
> `<a class="content-list__link" href="…">제목<span class="badge badge--error">필독</span></a>`

> ❌ DON'T — 신규 표시를 Badge로 만들기 (플래그와 형태가 같아져 자동/수동 구분이 사라짐)
> `<span class="content-list__flag badge badge--info">NEW</span>`

> ❌ DON'T — 플래그를 제목 앞에 두기 (뱃지 길이만큼 제목 시작선이 밀림)
> `<div class="content-list__headline"><span class="content-list__flag badge">필독</span><a class="content-list__link">제목</a></div>`

> ✅ DO — 요약문 뒤의 메타는 줄 간격보다 넓게 띄운다
> `.content-list__excerpt + .content-list__meta { margin-top: var(--space-gap-sm); }`

> ❌ DON'T — 세 블록을 같은 간격으로 나열 (메타가 요약문의 다음 줄로 읽힘)
> `.content-list__body { gap: var(--space-gap-xs); }` 만으로 끝내기

> ✅ DO — 요약문과 메타를 색 한 단계로 나눈다
> `.content-list__excerpt { color: var(--color-text-label); }` + `.content-list__meta { color: var(--color-text-subtle); }`

> ❌ DON'T — 요약문과 메타에 같은 색 (두 줄이 한 덩어리로 뭉침)
> `.content-list__excerpt { color: var(--color-text-subtle); }`

> ❌ DON'T — 메타에 칩·아이콘 섞기 (제목과 시각적으로 경쟁)
> `<span class="badge badge--neutral">4대보험</span><svg><use href="…#icon-show"/></svg>1,011`

> ❌ DON'T — 마크업에 구분자 직접 삽입 (CSS ::before가 넣는다)
> `<span>#165</span> · <span>4대보험</span>`

> ❌ DON'T — 번호와 총 건수를 함께 표시 (내림차순 게시판에서 중복)
> `<span class="content-list__count">총 165건</span>` + `<span class="content-list__no">165</span>`
