---
file: components/organisms/content-list.md
version: 0.24.0
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
| 분류 필터 | 없음 (기본) · 있음 — `.content-list__filter` 슬롯 (`sm` 전용) | 없음 |
| header | 없음 (기본) · 있음 — `.content-list__header` 슬롯 | 없음 |
| 열 이름 | 있음 (기본) — `.content-list__columns` 슬롯 · 없음 — 슬롯을 두지 않는다 | 있음 |
| 플래그 | 없음 (기본) · 있음 — `.content-list__flag` 슬롯(제목 뒤) | 없음 |
| 신규 표시 | 없음 (기본) · 있음 — `.content-list__new` 슬롯 | 없음 |
| 읽음 | 안 읽음 (기본, 클래스 없음) · 읽음 → `content-list__item--read` | 안 읽음 |

- **번호** — 게시물 번호. 기본으로 표시한다. 상담원이 "165번 글 보세요"처럼 항목을 지목하는 창구가 되므로, 목록에 없으면 전화로 글을 특정할 방법이 사라진다. 사내 전용 목록처럼 지목할 일이 없으면 생략한다. 왼쪽 거터에 두고 숫자만 적는다.
- **플래그** — 운영자가 붙이는 상태 표시(`필독`·`공지`·`마감임박`). Badge 컴포넌트를 그대로 쓴다. 한 항목에 **하나만** 붙인다.
- **신규 표시** — 등록 후 일정 기간 자동으로 붙는 표시. `icon-new` 아이콘을 쓴다. 플래그와 **함께 나올 수 있다**(예: 새로 올라온 필독 공지).
- **읽음** — 이미 읽은 항목. 제목의 굵기를 낮추고 색을 한 단계 내린다. 남은 항목이 무엇인지 훑는 데 쓰인다.
- **분류 필터** — 분류로 목록을 거르는 가로 스크롤 칩 행. Tag 컴포넌트를 쓴다. **`sm`에서만 보인다** — `md` 이상에서는 분류가 열로 서므로 필요 없다. 열 이름(`__columns`)과 정확히 반대로 동작한다.
- **열 이름** — header에 `분류·작성일·조회`를 두고 메타를 실제 열로 정렬한다. **기본값**이고, `.content-list__columns` 슬롯을 두면 켜진다(modifier 클래스 없음). `md` 이상에서만 동작하고 `sm`에서는 인라인 메타로 돌아간다.

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
| 번호 (`__no`) | `--color-text-label` | 훑어서 찾는 식별자 |
| 메타 (`__meta`) | `--color-text-subtle` | 읽을지 판단하는 보조 정보 |

번호가 메타보다 진한 이유는 **훑는 대상**이기 때문이다. 상담 중 "165번"을 눈으로 찾아야 하는데 판단 보조 정보와 같은 명도면 열이 묻힌다.

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

### sm에서 분류를 어떻게 짚나

`md` 이상에서는 분류가 **열**로 서고 header에 열 이름이 있어, 눈으로 열을 따라 훑으면 된다. `sm`에서는 그 열이 사라진다 — 메타가 인라인으로 접히면서 분류가 날짜·조회수와 같은 줄의 텍스트가 되기 때문이다.

그래서 `sm`에서만 **분류 필터 행**(`.content-list__filter`)을 목록 위에 둔다. 훑어서 찾는 대신 **눌러서 거른다.**

| | `md` 이상 | `sm` |
|---|---|---|
| 분류를 다루는 방법 | 열을 따라 **훑는다** | 칩을 눌러 **거른다** |
| 컴포넌트 | `__columns` (열 이름) | `__filter` (Tag 칩 행) |
| 표시 | md 이상 전용 | sm 전용 |
| 행의 분류(`__cat`) | 열에 표시 | **숨김** (필터 행이 있을 때) |

둘은 **동시에 보이지 않는다.** 같은 정보를 폭에 따라 다른 형태로 내보내는 것이라, 마크업에 둘 다 두어도 CSS가 하나만 보여준다.

- 필터 행이 있으면 **행마다의 분류(`__cat`)는 `sm`에서 숨는다.** 같은 정보를 목록 위에서 한 번, 행마다 한 번 두 번 말할 이유가 없고, 그 중복이 좁은 메타 줄을 접히게 만든다. 필터 행이 없는 목록에서는 그대로 남는다.
- 첫 칩은 **전체**(`tag--selected` 기본값). 아무것도 선택하지 않은 상태가 곧 전체다. 전체를 고른 동안에는 행의 분류를 알 수 없지만, `sm`에서 한 건을 고르는 기준은 제목이지 분류가 아니다 — 분류로 좁히려면 칩을 누르면 된다.
- 단일 선택이다. 분류를 여러 개 겹쳐 고르는 화면이라면 FilterBar의 다중 선택 드롭다운을 쓴다.
- Badge가 아니라 **Tag**를 쓴다 — 누를 수 있어야 하고, Badge는 비인터랙티브 상태 표시 전용이다(`tag.md`).

### 열 이름 — 기본이고, 언제 빼나

기본은 **열 이름 있음**이다. header에 `분류·작성일·조회`를 두고 메타를 열로 정렬한다. `.content-list__columns` 슬롯을 두면 켜지고, 별도 modifier 클래스는 없다 — 라벨과 열 정렬이 한 몸이라 둘 중 하나만 켜진 상태를 만들 수 없게 했다.

**슬롯을 빼는 경우**

| 상황 | 이유 |
|------|------|
| header가 없는 목록 | 열 이름이 설 자리가 없다 |
| 메타가 한 종류뿐인 목록 | 열이 하나면 이름을 붙일 이유가 없다 |

**폭이 좁아지면 (`sm`)** 열 이름은 숨고 메타가 인라인으로 돌아간다. 값에 붙은 단위(`__unit`)가 다시 나타나 `조회 1,011`로 읽히므로 정보가 빠지지 않는다. 열 폭을 고정한 채로는 좁은 화면에서 접히지 않기 때문에, 접히는 쪽을 `sm`에 남긴다.

**열 폭은 최소값 + 확장이다.** 각 열은 `minmax(최소, auto)`로, 최소 폭 아래로는 줄지 않고 긴 값이 오면 늘어난다. 기본 최소값은 `8rem · 6rem · 5rem`.

순수 auto로 두면 폭이 값에서만 나오는데, 행이 없는 상태(empty·loading)에는 정할 값이 없어 라벨 자신의 글자 폭으로 잡힌다 — 본목록과 열 위치가 어긋난다(측정: 분류 열 923.4px → 1021px). 최소값이 있으면 값이 그 안에 들어가는 한 두 상태가 같아진다.

| | 순수 auto | **minmax (기본)** | 완전 고정 |
|---|---|---|---|
| 긴 분류명 | 잘리지 않는다 | **잘리지 않는다** | 잘린다 |
| empty ↔ 본목록 | 다르다 | **같다** (값이 최소값 안일 때) | 같다 |
| 설정 | — | 없음 | 트랙 3개 지정 |

분류명이 기본 최소값(`8rem`)보다 길면 그 열만 늘어나 empty와 다시 어긋난다. 그럴 때는 최소값을 올린다:

```css example
.my-board {
  --content-list-meta-cols: minmax(10rem, auto) minmax(6rem, auto) minmax(4rem, auto);
}
```

> ⚠️ 열 이름은 사용자에게 **"누르면 정렬된다"**는 신호를 준다. 정렬을 함께 제공하는 것을 권한다. 제공하지 않는다면 그 화면에서는 슬롯을 빼는 것도 방법이다.

### 읽음 상태

이미 읽은 항목은 **제목의 굵기를 낮추고 색을 한 단계 내린다.** 신호 둘 중 **굵기가 주(主)** 다 — 색만 바꾸면 한 단계로는 눈에 띄지 않고, 눈에 띌 만큼 내리면 제목이 메타 수준으로 주저앉는다.

| | 안 읽음 | 읽음 |
|---|---|---|
| 굵기 | `--font-weight-heading` (600) | `--font-weight-body` (400) |
| 색 | `--color-text-body` | `--color-text-label` |

#### 구현 방식 두 가지

| | `content-list__item--read` (권장) | `:visited` |
|---|---|---|
| 근거 | 서버가 아는 읽음 기록 | 브라우저 방문 기록 |
| 기기 간 동기화 | **된다** | 안 된다 — 기기마다 따로 |
| 히스토리 삭제 | 영향 없음 | **초기화된다** |
| 바꿀 수 있는 것 | 제한 없음 (굵기 포함) | **색 계열만** — 개인정보 보호 제약 |
| 백엔드 | 필요 | 불필요 |

`:visited`는 브라우저가 방문 기록 유출을 막으려고 `color`·`background-color`·`border-color` 계열만 적용하고, `getComputedStyle`도 방문 안 한 값을 돌려준다. **굵기를 바꿀 수 없으므로** 이 방식만 쓸 때는 색을 한 단계 더 내려(`--color-text-subtle`) 사라진 신호를 보정한다.

```css example
/* 서버 읽음 기록이 없을 때만. 굵기를 못 쓰므로 색을 한 단계 더 내린다.
   이 컴포넌트의 구현이 아니라 대안 예시다 — 그래서 `css example` 펜스를 쓴다.
   `css` 펜스로 두면 build.py가 구현 CSS로 추출해 실제로 적용된다. */
.content-list__link:visited { color: var(--color-text-subtle); }
```

> ⚠️ 두 방식을 함께 쓰지 않는다. 같은 목록에서 어떤 항목은 서버 기준, 어떤 항목은 브라우저 기준으로 흐려지면 사용자가 규칙을 읽을 수 없다.

### 번호와 총 건수 중 무엇을 쓰나

둘 다 두지 않는다. 내림차순 게시판에서는 첫 항목의 번호가 곧 총 건수라 중복이다.

| 화면 | 표시 |
|------|------|
| 고객·상담원이 글을 지목한다 (지식센터·공지·자료실) | **번호**(`__no`). header에 건수를 두지 않는다 |
| 필터·검색 결과 수가 판단 근거다 (조회 화면) | **총 건수**(`__count`). 번호를 생략한다 |

### 상태 (→ `product.md`)

| 상태 | 처리 |
|------|------|
| empty | `.content-list` 자리에 `empty-state--compact`. header는 열 이름까지 그대로 둔다. 메타 열에 최소 폭이 있어 값이 그 안에 들어가는 한 본목록과 열 위치가 같다. 분류명이 최소값보다 길면 그 열만 늘어나므로 `--content-list-meta-cols`로 최소값을 올린다. 컨테이너는 grid이므로 `empty-state`는 직계 자식 규칙(`grid-column: 1 / -1`)으로 전체 폭을 차지한다 |
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
  ├─ .content-list__filter — div. optional. 분류 필터 칩 행. **sm 전용**(md 이상에서는 숨는다).
  │    Tag 컴포넌트를 쓴다 — Badge가 아니다(눌러야 하므로).
  │    예: <button type="button" class="tag tag--pill tag--md tag--selected">전체</button>
  │    첫 칩은 "전체"이고 기본 선택. 단일 선택 — 선택된 것 하나만 tag--selected.
  │    가로 스크롤이라 줄바꿈하지 않는다.
  ├─ .content-list__header — div. optional. 목록 소제목.
  │    ├─ .content-list__heading — div. 소제목.
  │    │    heading 태그가 아니라 div (UA 마진으로 레이아웃 깨짐 — table__title과 동일 이유).
  │    └─ .content-list__columns — div. optional. 열 이름 3개(분류·작성일·조회) span.
  │         **기본으로 둔다.** 이 슬롯이 있으면 열 정렬이 켜진다(modifier 클래스 없음).
  │         md 이상에서만 보이고 sm·subgrid 미지원에서는 숨는다(__unit이 정보를 대신한다).
  └─ .content-list — ul. list-style:none.
       └─ .content-list__item — li. **번호 거터 + 본문** 두 열. position:relative (링크 오버레이 기준점).
            읽은 항목에는 content-list__item--read를 추가한다(제목 굵기·색이 내려간다).
            :visited로 대체할 수 있으나 굵기는 바꿀 수 없다 — 사용 지침 참조.
            ├─ .content-list__no — span. optional(기본 표시). "165" 형태. 어느 폭에서든 왼쪽 거터에 남는다.
            ├─ .content-list__new — span. optional. icon-new 아이콘. aria-label="신규" 필요.
            │    시스템이 등록일 기준으로 자동 부여. 플래그와 동시에 나올 수 있다.
            │    **번호 옆 거터 열**에 둔다. 크기 --icon-sm(16px) + 광학 보정 1px(CSS 주석 참조).
            │    폭이 고정이라 열에 둬도 제목 폭을 뺏지 않고,
            │    번호와 나란히 세로 한 줄로 훑힌다.
            └─ .content-list__body — div. 제목·메타 묶음. flex:1 min-width:0.
                 데스크톱에서는 가로(제목 좌 / 메타 우), sm에서는 세로로 접힌다.
                 ├─ .content-list__headline — div. 제목 + 플래그를 한 줄에 묶는다.
                 │    ├─ .content-list__link — a. 제목. **제목 텍스트만 감싼다.**
                 │    │    ::after가 item 전체를 덮어 행 전체가 클릭된다(stretched link 패턴).
                 │    │    링크명이 제목만으로 읽히므로 스크린리더에서 메타·플래그가 링크명에 섞이지 않는다.
                 │    │    데스크톱 가로 배치에서는 한 줄 말줄임, sm에서는 2줄 말줄임.
                 │    └─ .content-list__flag — span. optional. Badge 컴포넌트를 함께 쓴다.
                 │         예: <span class="content-list__flag badge badge--error">필독</span>
                 │         운영자가 수동 부여. 텍스트 라벨이므로 aria-label 불필요. 한 항목에 하나만.
                 │         제목 뒤, 링크 밖. 뱃지는 글자 수만큼 폭이 변해 거터 열에 두면
                 │         가장 긴 라벨이 전 행의 제목 폭을 깎는다 — 신규 아이콘과 자리가 다른 이유.
                 └─ .content-list__meta — div. 부가 정보. 순서 고정: 분류 → 날짜 → 조회수.
                      ├─ .content-list__cat — span. 분류. 브랜드 색 텍스트.
                      ├─ .content-list__date — span. YYYY.MM.DD (product.md 날짜 포맷).
                      └─ .content-list__views — span. "조회 1,011". 아이콘 없이 텍스트.
                           └─ .content-list__unit — span. "조회 " 단위 라벨. 항상 마크업에 둔다.
                                열 이름이 있으면 header의 열 이름이 대신하므로 숨겨진다.

- 메타 항목 사이 가운뎃점(·)은 CSS ::before가 자동 삽입한다. 마크업에 구분자를 적지 않는다.
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
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">기본 — md 이상은 열 이름, sm은 분류 필터 칩 행. 둘은 동시에 보이지 않는다. 폭을 줄여보라. 165는 신규+필독, 164는 신규 + 읽음</p>
  <div data-component class="content-list-container">
    <div class="content-list__filter">
      <button type="button" class="tag tag--pill tag--md tag--selected">전체</button>
      <button type="button" class="tag tag--pill tag--md">4대보험</button>
      <button type="button" class="tag tag--pill tag--md">김반장뉴스레터</button>
      <button type="button" class="tag tag--pill tag--md">고용노동부</button>
      <button type="button" class="tag tag--pill tag--md">건설업교육</button>
    </div>
    <div class="content-list__header">
      <div class="content-list__heading">자료 목록</div>
      <div class="content-list__columns"><span>분류</span><span>작성일</span><span>조회</span></div>
    </div>
    <ul class="content-list">
      <li class="content-list__item">
        <span class="content-list__no">165</span>
        <span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">2024년 건설보험료신고_노무제공자신고</a>
            <span class="content-list__flag badge badge--error">필독</span>
          </div>
          <div class="content-list__meta">
            <span class="content-list__cat">4대보험</span>
            <span class="content-list__date">2024.03.20</span>
            <span class="content-list__views"><span class="content-list__unit">조회 </span>1,011</span>
          </div>
        </div>
      </li>
      <li class="content-list__item content-list__item--read">
        <span class="content-list__no">164</span>
        <span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">2021년 귀속 보수총액신고 방법 안내_ 비즈씨/세무사랑 사용자편</a>
          </div>
          <div class="content-list__meta">
            <span class="content-list__cat">4대보험</span>
            <span class="content-list__date">2022.02.21</span>
            <span class="content-list__views"><span class="content-list__unit">조회 </span>918</span>
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
            <span class="content-list__views"><span class="content-list__unit">조회 </span>89</span>
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
            <span class="content-list__views"><span class="content-list__unit">조회 </span>1,685</span>
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
      <div class="content-list__columns"><span>분류</span><span>작성일</span><span>조회</span></div>
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
      <span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span>
      <div class="content-list__body">
        <div class="content-list__headline">
          <a class="content-list__link" href="#">2024년 건설보험료신고_노무제공자신고</a>
          <span class="content-list__flag badge badge--error">필독</span>
        </div>
        <div class="content-list__meta">
          <span class="content-list__cat">4대보험</span>
          <span class="content-list__date">2024.03.20</span>
          <span class="content-list__views"><span class="content-list__unit">조회 </span>1,011</span>
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
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-faint);
}

/* header 없이 목록만 쓸 때는 위쪽 경계가 사라지므로 ul이 직접 갖는다 */
.content-list-container > .content-list:first-child {
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-faint);
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
  /* 행 구분선(--color-border-faint)보다 진한 --color-border-strong.
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
  /* 제목 크기를 변수로 둔다 — 신규 아이콘의 박스 높이가 이 값을 따라가야 하기 때문.
     Table의 --table-row-height와 같은 CSS 변수 cascade 패턴. sm에서 한 번만 바꾸면
     제목과 아이콘 정렬이 함께 따라온다. */
  --content-list-title-size: var(--font-size-h4);

  display: flex;
  align-items: flex-start;
  /* 열 간격은 일괄 gap이 아니라 각 열의 margin으로 준다 — 번호와 신규 아이콘은 붙고(2xs),
     본문만 떨어져야(lg) 하는데 gap 하나로는 그 차이를 낼 수 없다.
     margin이면 flex 폴백과 grid 양쪽에서 같은 값이 나온다. */
  position: relative;
  /* 행 사이 간격은 border만 담당한다 — margin을 명시해 호스트 페이지의 li 스타일에 흔들리지 않게 한다.
     전역 리셋 `*`(명시도 0,0,0)에 기대면 호스트가 `li { margin }`(0,0,1) 하나만 둬도 무너진다. */
  margin: 0;
  padding: var(--space-inset-xl) var(--space-inset-3xl);
}

.content-list__item + .content-list__item {
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-faint);
}

/* ── Body (제목 + 요약 + 메타) ── */
/* 기본(좁은 화면)은 세로. md 이상에서 가로로 눕는다. */
.content-list__body {
  flex: 1;
  /* 거터(번호·신규)와의 간격. item의 일괄 gap 대신 여기서만 준다. */
  margin-inline-start: var(--space-gap-lg);
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
  font-size: var(--content-list-title-size);
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
/* 시간 기반 자동 표시. 번호 옆 **거터 열**에 둔다 — 제목 뒤가 아니다.
   제목 뒤에 두면 제목이 2줄로 접힐 때 아이콘이 첫 줄 끝에 걸려 단어 중간에 낀다.
   아이콘은 폭이 16px로 고정이라 열에 두는 비용이 라벨 뱃지와 다르다 —
   목록 내용과 무관하게 항상 같은 폭이고, 번호와 나란히 세로 한 줄로 훑힌다.

   운영자가 붙이는 플래그와 형태를 다르게 둔다 —
   둘 다 Badge면 나란히 붙었을 때 무엇이 자동이고 무엇이 판단인지 구분되지 않는다.
   자리까지 갈라(신규=거터, 플래그=제목 뒤) 구분이 이중으로 남는다.

   정렬: 아이콘은 글자가 없어 headline의 baseline 정렬이 통하지 않는다.
   align-self:center로 두면 제목이 2줄로 접히는 sm에서 두 줄 한가운데(11.3px 아래)에 뜬다.
   그래서 상단에 붙이되 박스 높이를 제목 첫 줄 높이와 같게 주고 그 안에서 가운데 정렬한다 —
   1줄·2줄, 데스크톱·모바일 모두 오차 0으로 첫 줄에 맞는다. */
.content-list__new {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  height: calc(var(--content-list-title-size) * var(--line-height-reading));
  /* 번호에 바짝 붙인다 — 번호와 신규는 "몇 번 글이고 새 글인가"라는 한 덩어리다.
     본문과 같은 간격(16px)으로 띄우면 셋이 균등하게 나열돼 덩어리가 풀린다. */
  margin-inline-start: var(--space-gap-2xs);

  /* 광학 보정 1px. 계산상 중심은 이미 맞다 — 상자 중심도, canvas로 잰 숫자 글리프의
     실제 잉크 중심도 오차 0이다. 그런데 16px 원이 숫자 글리프(11px)보다 커서 위아래로
     2.5px씩 삐져나오고, 숫자는 내려긋는 획이 없어 베이스라인이 곧 바닥으로 읽힌다.
     그래서 아래로 삐져나온 2.5px만 "가라앉은" 것으로 보인다.
     0·1·1.5·2px를 5배로 렌더해 비교했고 1px이 가장 균형이 좋다 —
     1.5px부터는 반대로 떠 보인다. (12px로 줄이면 이 현상이 사라지지만 표시가 너무 약해진다.)
     transform이라 열 폭·행 높이에는 영향이 없다. */
  transform: translateY(-1px);
}

.content-list__new svg {
  width: var(--icon-sm);
  height: var(--icon-sm);
  fill: var(--color-fill-error);
}

/* ── Flag (optional) ── */
/* 운영자가 붙이는 표시. 제목 뒤, 링크 밖에 둔다.
   링크 안에 넣으면 말줄임에 함께 잘려 정작 읽혀야 할 "필독"이 사라진다.
   flex-shrink:0으로 제목만 줄고 플래그는 남는다.

   거터 열에 두는 안을 v0.16.0에서 시도했다가 되돌렸다 — 뱃지는 **글자 수만큼 폭이 변한다.**
   열로 두면 목록에서 가장 긴 라벨("마감임박")이 전 행의 제목 폭을 깎는다.
   측정(390px, 8건): 뱃지가 거터면 제목 시작선 132.9px·목록 652px,
   제목 뒤면 92.9px·607.8px. 거터는 **폭이 고정된 것**(번호·신규 아이콘)의 자리다.

   높이를 제목 첫 줄과 같게 주고 그 안에서 가운데 정렬한다 —
   제목이 2줄로 접혀도 첫 줄에 맞는다. */
.content-list__flag {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  height: calc(var(--content-list-title-size) * var(--line-height-reading));
}

/* subgrid 미지원 브라우저에서는 flex 배치가 그대로 남는다 —
   신규 아이콘이 번호에 바로 붙어 열이 흔들릴 뿐 정보는 전부 보인다. */
@supports (grid-template-columns: subgrid) {
  /* 목록이 열을 정의하고, 각 항목이 그 열을 물려받는다(subgrid).
     항목을 display:contents로 풀지 않는 이유: 그러면 li의 상자가 사라져
     hover 배경·구분선·__link::after 오버레이의 기준점이 전부 무너진다. */
  .content-list {
    display: grid;
    grid-template-columns: auto auto 1fr;
  }

  .content-list > .content-list__item {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
  }

  /* 열을 명시 배치한다 — 신규 표시가 없는 행에 빈 <span>을 넣지 않아도
     본문이 2열로 밀려나지 않는다. */
  .content-list__no   { grid-column: 1; }
  .content-list__new  { grid-column: 2; }
  .content-list__body { grid-column: 3; }

  /* 목록에 신규 표시가 하나도 없으면 가운데 열을 아예 없앤다 —
     폭 0인 열이 남으면 column-gap만 16px 더 붙어 번호와 제목이 벌어진다. */
  .content-list:not(:has(.content-list__new)) {
    grid-template-columns: auto 1fr;
  }
  .content-list:not(:has(.content-list__new)) .content-list__body {
    grid-column: 2;
  }
}

/* ── 분류 필터 (sm 전용) ── */
/* 분류로 목록을 거르는 가로 스크롤 칩 행. **sm에서만 보인다.**
   md 이상에서는 분류가 열로 서고 header에 열 이름이 있어 훑을 축이 이미 있지만,
   sm에서는 열이 사라져 분류를 짚어줄 것이 없어진다 — 그 자리를 이 행이 대신한다.

   Tag 컴포넌트를 그대로 쓴다(tag.md) — 분류는 "선택해서 거르는" 대상이라 Badge가 아니라 Tag다.
   Badge는 비인터랙티브 상태 표시 전용이고, 여기서는 버튼이어야 한다.

   __columns와 정확히 반대로 동작한다: 열 이름은 md 이상 전용, 필터 행은 sm 전용.
   같은 정보(분류)를 폭에 따라 두 형태로 내보내는 것이고, 둘이 동시에 보이지 않는다. */
.content-list__filter {
  display: none;
}

@media (max-width: 767px) {
  .content-list__filter {
    display: flex;
    gap: var(--space-gap-sm);
    /* 가로 스크롤 — 분류가 많아도 줄바꿈하지 않는다. 접히면 목록보다 필터가 커진다. */
    overflow-x: auto;
    /* flex item의 min-width 기본값은 auto라 내용보다 작아지지 않는다 —
       0으로 낮추지 않으면 칩들이 컨테이너를 밀어 목록 전체가 가로로 넘친다.
       overflow-x만으로는 부족하고, 줄어들 수 있어야 스크롤이 생긴다. */
    min-width: 0;
    /* 스크롤 끝에서 칩이 컨테이너 벽에 닿지 않게 좌우 inset을 padding으로 준다 —
       margin으로 주면 마지막 칩 뒤 여백이 스크롤 영역에서 잘린다. */
    padding: var(--space-stack-sm) var(--space-inset-2xl);
    /* 스크롤바를 감춘다 — 손가락으로 미는 영역이라 스크롤바가 자리를 먹으면 칩이 눌린다 */
    scrollbar-width: none;
    border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-faint);
  }

  .content-list__filter::-webkit-scrollbar { display: none; }

  /* 칩은 줄지 않는다 — flex 컨테이너에서 기본 shrink가 걸리면 글자가 잘린다 */
  .content-list__filter > .tag { flex-shrink: 0; }

  /* 필터 행이 있으면 행마다의 분류는 지운다.
     같은 정보를 목록 위에서 한 번, 행마다 한 번 두 번 말하는 셈이고,
     좁은 화면에서 그 중복이 메타 줄을 접히게 만든다.
     **필터 행이 있을 때만** 지운다 — 필터가 없는 목록에서 지우면 분류를 알 방법이 사라진다. */
  .content-list-container:has(.content-list__filter) .content-list__cat {
    display: none;
  }

  /* 숨긴 분류 **바로 뒤**의 가운뎃점도 지운다.
     구분자는 `> :not(:first-child)::before`로 붙는데, 분류를 display:none 해도
     DOM에는 남아 있어 날짜가 여전히 first-child가 아니다 —
     그대로 두면 메타 줄이 "· 2024.03.20"처럼 가운뎃점으로 시작한다.
     CSS로 "보이는 것 중 첫 번째"를 고를 수 없으므로 인접 선택자로 짚는다. */
  .content-list-container:has(.content-list__filter) .content-list__cat + *::before {
    content: none;
    margin-inline-end: 0;
  }
}

/* ── 열 이름 (기본) ── */
/* header에 열 이름을 두고 메타를 실제 열로 정렬한다. **`__columns` 슬롯이 있으면 켜진다** —
   별도 modifier 클래스를 두지 않는다. 라벨과 열 정렬은 한 몸이라, 둘 중 하나만 켜진 상태
   (라벨은 있는데 값이 안 맞거나, 값은 열인데 이름이 없거나)가 만들어질 수 있으면 안 된다.

   md 이상에서만 동작하고, sm에서는 인라인 메타 + 값에 붙은 단위로 돌아간다 —
   열 폭이 고정되면 좁은 화면에서 접히지 않으므로, 접히는 쪽을 sm에 남긴다.

   header가 없는 목록에는 열 이름이 설 자리가 없으므로 슬롯을 두지 않는다 —
   그러면 이 블록 전체가 걸리지 않고 인라인 메타로 남는다.

   열 폭은 px로 박지 않고 subgrid로 잡는다. header와 각 행은 서로 다른 요소 안에 있지만
   container가 정의한 같은 열을 물려받으므로, 열 폭이 그 목록에 실제로 들어온
   가장 긴 값에 맞춰지고 header 라벨과 값이 저절로 맞는다.
   (측정: header 라벨과 전 행의 값이 596.3 / 687.3 / 752.4로 일치) */

/* 기본은 숨김 — subgrid 미지원이거나 sm이면 라벨이 값과 어긋나므로 아예 내보내지 않는다.
   값에 붙은 단위(__unit)가 그대로 남아 정보는 빠지지 않는다. */
.content-list__columns {
  display: none;
}

@supports (grid-template-columns: subgrid) {
  @media (min-width: 768px) {
    /* 열을 container가 정의한다 — header와 ul이 함께 물려받아야 하기 때문.
       기본 레이아웃은 ul이 열을 정의하지만, 열 이름은 ul 밖(header)에 있다. */
    /* 메타 3열은 **최소 폭 + auto 확장**(minmax)이다. 폭을 순수 auto로 두면 그 목록에
       실제로 들어온 값이 폭을 정하는데, 행이 없는 상태(empty·loading)에는 정할 값이 없어
       라벨 자신의 글자 폭으로 잡힌다 — 본목록과 열 위치가 어긋난다(측정: 분류 열 923.4px → 1021px).

       최소값을 두면 값이 그 안에 들어가는 한 두 상태의 열 위치가 같아지고,
       최소값을 넘는 긴 값은 여전히 잘리지 않고 열이 늘어난다. 고정 폭의 잘림과
       auto의 흔들림 중 하나를 고를 필요가 없다.

       기본값 8rem·6rem·5rem은 실측 콘텐츠 폭을 덮도록 잡았다 —
       값(분류 123px · 날짜 81.1px · 조회 72.5px)과 empty의 라벨 폭(조회 66px) **양쪽 다** 넘어야
       두 상태가 같아진다. 조회를 4rem(64px)로 뒀을 때 양쪽 모두 최소값을 넘어
       72.5px와 66px로 갈렸다.
       분류명이 이보다 긴 게시판은 --content-list-meta-cols로 최소값을 올린다 —
       올리지 않으면 그 열만 늘어나 empty와 어긋난다.
         예: .my-board { --content-list-meta-cols: minmax(10rem, auto) minmax(6rem, auto) minmax(4rem, auto); } */
    .content-list-container:has(.content-list__columns) {
      display: grid;
      grid-template-columns:
        auto auto 1fr
        var(--content-list-meta-cols, minmax(8rem, auto) minmax(6rem, auto) minmax(5rem, auto));
    }

    /* 직계 자식은 전부 전체 폭을 차지한다. header·ul 말고도 들어올 수 있는 것들
       (empty-state, skeleton, banner)이 auto 배치로 1번 열에만 들어가 찌그러지는 것을 막는다 —
       실제로 empty-state가 1200px → 197.7px로 번호 거터 칸에 끼어 있었다. */
    .content-list-container:has(.content-list__columns) > * {
      grid-column: 1 / -1;
    }

    /* 그중 header와 ul만 열을 물려받는다 */
    .content-list-container:has(.content-list__columns) > .content-list__header,
    .content-list-container:has(.content-list__columns) > .content-list,
    .content-list-container:has(.content-list__columns) > .content-list > .content-list__item {
      display: grid;
      grid-template-columns: subgrid;
    }

    .content-list-container:has(.content-list__columns) .content-list__heading { grid-column: 1 / 4; }

    .content-list-container:has(.content-list__columns) .content-list__columns {
      grid-column: 4 / -1;
      display: grid;
      grid-template-columns: subgrid;
      font-size: var(--font-size-sm);
      line-height: var(--line-height-ui);
      color: var(--color-text-subtle);
    }

    /* 라벨은 어떤 폭에서도 접히지 않는다. --content-list-meta-cols로 좁은 폭을 주면
       "조회"가 "조 / 회"로 갈라져 머리 줄 높이가 늘어난다. */
    .content-list-container:has(.content-list__columns) .content-list__columns > span {
      white-space: nowrap;
    }

    /* 한 줄 항목이므로 세로 가운데 정렬한다 */
    .content-list-container:has(.content-list__columns) .content-list__item { align-items: center; }

    /* body·meta는 상자를 풀어 li의 subgrid에 직접 얹는다.
       subgrid를 세 겹(li → body → meta) 쌓으면 li의 좌우 padding이 중간 레벨에서
       track 폭 계산을 흔들어 header 라벨과 값이 8px 어긋났다(실측). 한 겹으로 만들면 맞는다.
       item(li)과 달리 이 둘은 배경·테두리·기준점이 없어 상자를 없애도 잃는 것이 없다 —
       hover 배경과 __link::after 오버레이는 모두 li가 담당한다. */
    .content-list-container:has(.content-list__columns) .content-list__body,
    .content-list-container:has(.content-list__columns) .content-list__meta {
      display: contents;
    }

    .content-list-container:has(.content-list__columns) .content-list__headline {
      grid-column: 3;
      /* 거터와의 간격. body가 display:contents라 body의 margin은 쓸 수 없다. */
      margin-inline-start: var(--space-gap-lg);
    }
    .content-list-container:has(.content-list__columns) .content-list__cat   { grid-column: 4; }
    .content-list-container:has(.content-list__columns) .content-list__date  { grid-column: 5; }
    .content-list-container:has(.content-list__columns) .content-list__views { grid-column: 6; }

    /* 열 사이 간격은 header 라벨과 값에 **같은 padding**으로 준다.
       margin이나 column-gap으로 주면 track 크기 계산에 들어가는 값이 달라져
       라벨과 값이 어긋난다. padding은 track 안쪽이라 양쪽에 같이 주면 그대로 맞는다. */
    .content-list-container:has(.content-list__columns) .content-list__cat,
    .content-list-container:has(.content-list__columns) .content-list__columns > :nth-child(1) {
      padding-inline-start: var(--space-gap-3xl);
    }
    .content-list-container:has(.content-list__columns) .content-list__date,
    .content-list-container:has(.content-list__columns) .content-list__columns > :nth-child(2) {
      padding-inline-start: var(--space-gap-lg);
    }
    .content-list-container:has(.content-list__columns) .content-list__views,
    .content-list-container:has(.content-list__columns) .content-list__columns > :nth-child(3) {
      padding-inline-start: var(--space-gap-lg);
      text-align: right;
    }

    /* 열 이름이 라벨을 대신하므로 값에 붙은 단위는 숨긴다 —
       마크업에는 남겨 sm에서 그대로 다시 쓴다. */
    .content-list-container:has(.content-list__columns) .content-list__unit { display: none; }

    /* 열로 나뉘면 가운뎃점 구분자는 중복이다 */
    .content-list-container:has(.content-list__columns) .content-list__meta > :not(:first-child)::before {
      content: none;
      margin-inline-end: 0;
    }
  }
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
  /* 제목 첫 줄 높이의 상자 안에서 가운데 정렬한다 — 신규 아이콘과 같은 방식.
     번호(13px)와 아이콘(16px)은 글자 크기가 달라, 각자 자기 줄 높이로 두면
     둘이 붙어 있을 때 세로 중심이 3px 어긋난다. 같은 상자에 넣어야 한 덩어리로 읽힌다.
     제목이 2줄로 접혀도 번호는 첫 줄에 남는다. */
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  height: calc(var(--content-list-title-size) * var(--line-height-reading));
  font-size: var(--font-size-sm);
  color: var(--color-text-label);
  font-variant-numeric: tabular-nums;
}

/* 분류 — 메타 안에서 유일하게 색으로 구분한다 */
.content-list__cat {
  color: var(--color-text-brand);
}

/* ── Read (optional) ── */
/* 이미 읽은 항목. 굵기가 주 신호, 색이 보조다 —
   색만 한 단계 내리면 눈에 띄지 않고, 눈에 띌 만큼 내리면 제목이 메타 수준으로 주저앉는다.
   hover(.content-list__item:hover, 명시도 0,3,0)가 이 규칙(0,2,0)을 이기므로
   읽은 항목도 hover 시 브랜드 색으로 바뀐다. 굵기는 그대로 유지된다. */
.content-list__item--read .content-list__link {
  font-weight: var(--font-weight-body);
  color: var(--color-text-label);
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
  .content-list__item { align-items: center; }

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
}

/* ── sm (<768px) ── */
/* 본문이 기본 상태(세로)로 돌아간다. 번호 거터는 유지하고 좌우 inset만 한 단계 줄인다. */
@media (max-width: 767px) {
  .content-list__item,
  .content-list__header { padding-inline: var(--space-inset-2xl); }
  .content-list__item { --content-list-title-size: var(--font-size-lg); }
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
- 읽음 상태는 굵기와 색을 함께 바꾼다. 색만으로 구분하지 않으므로 색각 이상에서도 굵기로 읽힌다.
- 읽음은 보조 정보라 기본적으로 스크린리더에 따로 알리지 않는다. 읽음/안 읽음이 판단에 꼭 필요한 목록이면 링크 안에 `<span class="sr-only">읽음</span>`을 넣는다.
- 플래그는 색과 텍스트를 함께 쓴다. 색만으로 우선순위를 표현하지 않는다 — `필독`이라는 글자가 있어야 색을 못 봐도 전달된다.
- 텍스트 3층 모두 흰 배경에서 WCAG AA 본문 기준(4.5:1)을 넘는다 — 제목 18.43:1 · 번호 8.68:1 · 메타 4.51:1. `--color-text-disabled`(3.08:1)는 이 컴포넌트에 쓰지 않는다.
- 분류는 색으로만 구분한다. 값 자체가 텍스트(`4대보험`)로 적혀 있으므로 색을 못 봐도 정보가 전달된다.
- 제목 2줄 말줄임은 CSS `-webkit-line-clamp`이므로 텍스트가 DOM에 그대로 남는다. 스크린리더는 전체 제목을 읽는다.

---

## Do / Don't

> ✅ DO — 번호는 거터에, 본문은 __body로 묶고, 링크는 제목만 감싼다
> `<li class="content-list__item"><span class="content-list__no">165</span><div class="content-list__body"><a class="content-list__link" href="…">제목</a><div class="content-list__meta">…</div></div></li>`

> ❌ DON'T — 번호를 메타에 넣기 (앞 항목 길이에 따라 위치가 흔들려 훑기 불가)
> `<div class="content-list__meta"><span class="content-list__no">#165</span><span class="content-list__cat">4대보험</span></div>`

> ✅ DO — 메타는 전부 같은 크기·무게의 텍스트. 분류만 색으로 구분
> `<span class="content-list__cat">4대보험</span><span class="content-list__date">2024.03.20</span><span class="content-list__views"><span class="content-list__unit">조회 </span>1,011</span>`

> ✅ DO — 읽음은 굵기와 색을 함께 내린다
> `.content-list__item--read .content-list__link { font-weight: var(--font-weight-body); color: var(--color-text-label); }`

> ❌ DON'T — 색만 내리기 (한 단계로는 안 보이고, 보일 만큼 내리면 메타 수준으로 주저앉는다)
> `.content-list__item--read .content-list__link { color: var(--color-text-label); }`

> ❌ DON'T — `--read` 클래스와 `:visited`를 같은 목록에서 함께 쓰기 (기준이 둘이 되어 규칙을 읽을 수 없다)

> ✅ DO — 거터 열에는 **폭이 고정된 것**만 (번호·신규 아이콘). 열 폭이 목록 내용에 흔들리지 않는다
> `<li class="content-list__item"><span class="content-list__no">165</span><span class="content-list__new">…</span><div class="content-list__body">…</div></li>`

> ✅ DO — 플래그는 제목 뒤, 링크 밖 (말줄임에 잘리지 않는다)
> `<div class="content-list__headline"><a class="content-list__link">제목</a><span class="content-list__flag badge badge--error">필독</span></div>`

> ❌ DON'T — 플래그를 거터 열에 두기 (뱃지는 글자 수만큼 폭이 변해, 가장 긴 라벨이 전 행의 제목 폭을 깎는다 — 측정: 제목 시작선 92.9 → 132.9px)
> `.content-list__flag { grid-column: 2; }`

> ❌ DON'T — 플래그를 제목 앞에 **인라인**으로 두기 (뱃지 길이만큼 제목 시작선이 행마다 밀림)
> `<div class="content-list__headline"><span class="content-list__flag badge">필독</span><a class="content-list__link">제목</a></div>`

> ❌ DON'T — 플래그를 링크 안에 넣기 (긴 제목에서 말줄임에 함께 잘림)
> `<a class="content-list__link" href="…">제목<span class="badge badge--error">필독</span></a>`

> ❌ DON'T — 신규 표시를 Badge로 만들거나 제목 뒤로 옮기기 (자동/수동 구분이 형태에서도 자리에서도 사라짐)
> `<div class="content-list__headline"><a class="content-list__link">제목</a><span class="badge badge--info">NEW</span></div>`



> ✅ DO — sm의 분류 필터는 Tag로 (누를 수 있어야 한다)
> `<div class="content-list__filter"><button type="button" class="tag tag--pill tag--md tag--selected">전체</button>…</div>`

> ❌ DON'T — 분류 필터를 Badge로 만들기 (Badge는 비인터랙티브 상태 표시 전용 — 누를 수 있어 보이지 않는다)
> `<span class="badge badge--brand">4대보험</span>`

> ❌ DON'T — 필터 행과 행마다의 분류를 `sm`에서 함께 보이기 (같은 정보를 두 번 말하고, 메타 줄이 접힌다)

> ❌ DON'T — 필터 칩을 줄바꿈시키기 (분류가 많으면 필터가 목록보다 커진다 — 가로 스크롤로 둔다)
> `.content-list__filter { flex-wrap: wrap; }`

> ✅ DO — header가 있으면 열 이름 슬롯을 둔다 (기본. subgrid가 라벨과 값의 열을 맞춘다)
> `<div class="content-list__header"><div class="content-list__heading">자료 목록</div><div class="content-list__columns"><span>분류</span><span>작성일</span><span>조회</span></div></div>`

> ❌ DON'T — 열 이름만 두고 값의 단위(`__unit`)를 마크업에서 빼기 (sm으로 내려가면 "1,011"이 무엇의 수인지 사라진다)

> ❌ DON'T — 열 폭을 px로 박기 (목록에 실제로 들어온 값에 맞춰 subgrid가 잡는다 — 긴 분류명이 잘리지 않는다)
> `.content-list__meta { grid-template-columns: 120px 84px 64px; }`

> ❌ DON'T — 메타에 칩·아이콘 섞기 (제목과 시각적으로 경쟁)
> `<span class="badge badge--neutral">4대보험</span><svg><use href="…#icon-show"/></svg>1,011`

> ❌ DON'T — 마크업에 구분자 직접 삽입 (CSS ::before가 넣는다)
> `<span>#165</span> · <span>4대보험</span>`

> ❌ DON'T — 번호와 총 건수를 함께 표시 (내림차순 게시판에서 중복)
> `<span class="content-list__count">총 165건</span>` + `<span class="content-list__no">165</span>`
