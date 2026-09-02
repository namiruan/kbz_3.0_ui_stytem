---
file: components/organisms/content-list.md
version: 0.43.0
status: draft
updated: 2026-09-02
depends-on: components/_index.md, components/organisms/table/info.md, components/atoms/badge.md, components/atoms/icon.md, components/organisms/empty-state.md, tokens/color.md, tokens/space.md, tokens/typography.md, tokens/stroke.md, tokens/icon.md, adaptation.md, product.md, accessibility.md
---

# ContentList

## 개요

게시판·자료실처럼 **읽을거리를 나열하는** 목록. 한 항목이 하나의 콘텐츠이고, 사용자는 그중 하나를 골라 읽는다.

데이터 테이블과의 차이 — 데이터 테이블은 행끼리 **비교**하기 위한 격자다(정렬·선택·엑셀·컬럼 설정이 붙는다). ContentList는 비교 대상이 아니라 **선택 대상**의 나열이라 컬럼 헤더가 없고, 제목만 시각 위계 최상위에 둔다. 좁은 화면에서 데이터 테이블은 가로 스크롤을 유지하지만 ContentList는 세로로 접힌다(→ `adaptation.md`).

정보 테이블과의 차이 — 시각 톤은 정보 테이블에서 가져왔다(좌우 라인·radius 없이 가로 구분선만, 줄바꿈 허용). 갈리는 지점은 두 가지다. 정보 테이블은 클릭 대상이 아니라 hover를 껐지만 ContentList는 **행 전체가 링크**라 hover가 필수다. 그리고 정보 테이블은 `<table>`이라 컬럼 폭이 고정되지만 ContentList는 `<ul>`이라 폭이 좁아져도 구조가 유지된다.

항목은 **번호 거터 + 본문** 두 열이다. 본문은 화면 폭에 따라 방향이 바뀐다 — 데스크톱에서는 제목(좌)과 부가 정보(우)를 한 줄에 나란히, `sm`에서는 제목 아래로 접는다. 번호는 어느 폭에서든 왼쪽 거터에 남아 정렬된 열을 유지한다.

한 줄 배치가 표처럼 읽히지 않게 하는 것은 레이아웃이 아니라 **메타의 처리**다. 분류를 칩으로, 조회수를 아이콘으로 만들면 메타 줄에 세 가지 시각 언어가 섞여 제목과 경쟁하고, 그 순간 컬럼 없는 표가 된다. 메타를 같은 크기·같은 무게의 텍스트로 두면 제목이 위계를 독점한다.

예외는 **상태 한 칸**이다(문의 게시판의 답변). 값은 행마다 다른 문자열이라 칩으로 만들면 목록이 얼룩이 되지만, 상태는 값이 두 종류뿐이라 반복되는 칩이 얼룩이 아니라 **패턴**으로 읽힌다. 그래서 칩은 목록당 한 열까지다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| 번호 | 있음 (기본) — `.content-list__no` 슬롯 · 없음. **`sm`에서는 항상 숨는다** | 있음 |
| 분류 필터 | **`sm`에서 필수** — `.content-list__filter` 슬롯. `md` 이상에서는 숨는다 | 있음 |
| header | 없음 (기본) · 있음 — `.content-list__header` 슬롯 | 없음 |
| 열 이름 | 있음 (기본) — `.content-list__columns` 슬롯 · 없음 — 슬롯을 두지 않는다 | 있음 |
| 고정 | 없음 (기본) · 있음 — `content-list__item--pinned` | 없음 |
| 신규 표시 | 없음 (기본) · 있음 — `.content-list__new` 슬롯 | 없음 |
| 고정 표시 | 고정 항목에 `.content-list__pin` 슬롯 (같은 칸, 신규를 대신한다) | — |
| 읽음 | 안 읽음 (기본, 클래스 없음) · 읽음 → `content-list__item--read` | 안 읽음 |
| 작성자 | 없음 (기본) · 있음 — `.content-list__author` 슬롯 | 없음 |
| 답변 | 없음 (기본) · 있음 — `.content-list__answers` 슬롯 안에 Badge(`badge--neutral` 대기 / `badge--success` 완료) | 없음 |
| 댓글 수 | 없음 (기본) · 있음 — `.content-list__comments` 슬롯. **제목 뒤**, 0이면 마크업에서 뺀다 | 없음 |

- **번호** — 게시물 번호. 기본으로 표시한다. 상담원이 "165번 글 보세요"처럼 항목을 지목하는 창구가 되므로, 목록에 없으면 전화로 글을 특정할 방법이 사라진다. 사내 전용 목록처럼 지목할 일이 없으면 생략한다. 왼쪽 거터에 두고 숫자만 적는다.
- **고정** — 목록 맨 위에 고정해 두는 항목. 거터의 **핀 아이콘**과 **주의색 제목**으로 표시한다. 라벨도 행 배경도 쓰지 않는다.
- **신규 표시** — 등록 후 일정 기간 자동으로 붙는 표시. `icon-new` 아이콘을 쓴다. 거터의 **맨 앞**(번호보다 왼쪽)에 선다. 고정 항목에서는 **핀이 이 자리를 대신한다**(→ 아래).
- **읽음** — 이미 읽은 항목. 제목의 굵기를 낮추고 색을 한 단계 내린다. 남은 항목이 무엇인지 훑는 데 쓰인다.
- **분류 필터** — 분류로 목록을 거르는 가로 스크롤 칩 행. Tag 컴포넌트를 쓴다. **`sm`에서는 필수**다 — 행의 분류를 숨기므로 이 행이 없으면 분류를 다룰 방법이 사라진다. `md` 이상에서는 열 이름(`__columns`)이 그 자리를 대신하므로 숨는다.
- **작성자** — 글쓴이. 문의 게시판처럼 **작성자가 사용자일 때만** 둔다. 전 건이 "관리자"인 자료실에서는 정보량이 0이다.
- **답변** — 답변이 달렸는지. **Badge로 표시한다** — 메타에서 칩을 쓰는 유일한 칸이다(값이 아니라 상태이므로). 이 슬롯이 있으면 분류의 톤 올림이 자동으로 풀린다(→ 사용 지침).
- **댓글 수** — 오간 댓글의 개수. 메타 열이 아니라 **제목 뒤**에 `[3]`으로 붙는다. 답변(처리 상태)과 다른 값이다.
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

메타 줄은 **번호 → 답변 → 분류 → 작성자 → 작성일 → 조회수** 순서로 고정한다. 작성자·답변은 문의 게시판용 슬롯이라 자료실에서는 비어 있다(→ 아래 절). 목록 전체에서 값이 같은 항목은 정보량이 0이므로 넣지 않는다(예: 전 건이 "관리자"인 작성자).

메타는 **같은 크기·같은 무게의 텍스트**로 둔다. 칩이나 아이콘을 섞으면 메타가 제목과 시각적으로 경쟁해 "제목이 유일한 목적지"라는 위계가 무너진다. 구분되어야 하는 것은 분류 하나뿐이고, 그건 톤으로 처리한다 — 메타 안에서 분류만 본문 검정이고 나머지는 한 단계 연하다. 브랜드 색은 쓰지 않는다: 목록에서 파란 글자는 hover와 링크를 뜻하는데 분류는 누를 수 없는 값이다.

- ✅ `4대보험 · 2024.03.20 · 조회 1,011` — 같은 무게, 분류만 진하게
- ❌ 분류를 Badge 칩으로, 조회수를 아이콘+숫자로 — 메타 줄에 세 가지 시각 언어가 섞인다

**칩은 값이 아니라 상태에만, 목록당 한 열까지.** 분류·작성자·날짜·조회수는 **값**이라 행마다 다른 문자열이 나열되고, 칩으로 만들면 목록 전체가 얼룩이 된다. 답변은 **상태**라 값이 두 종류뿐(대기·완료)이고, 두 종류가 반복되는 열은 얼룩이 아니라 패턴으로 읽힌다. 두 열이 칩이면 다시 얼룩이므로 하나까지다.

번호는 메타에 넣지 않고 **왼쪽 거터(`__no`)에 따로 둔다.** 읽을지 판단하는 정보가 아니라 항목을 **지목하는 식별자**라 역할이 다르다. 오른쪽 메타에 섞으면 앞 항목(분류)의 길이에 따라 번호 위치가 행마다 흔들려, 상담 중 번호를 훑는 동작이 불가능해진다. 거터에 두면 자릿수와 무관하게 한 열로 정렬된다.

### 문의 게시판 — 작성자와 답변

자료실과 문의 게시판(장애신고·묻고답하기·서비스개선요청)은 **같은 컴포넌트를 쓰지만 메타가 다르다.**
자료실은 관리자가 올린 자료를 고르는 곳이라 작성자가 전 건 동일하고, 문의 게시판은 사용자가 쓴 글이라
**누가 썼고 답변이 달렸는지**가 곧 목록의 목적이다.

| | 자료실 | 문의 게시판 |
|---|---|---|
| 메타 | 분류 · 작성일 · 조회수 | **답변**(칩) · 분류 · **작성자** · 작성일 |
| 훑는 축 | 분류 | **답변 여부** |
| 조회수 | 둔다 | **뺀다** — 대부분 비밀글이라 값이 판단 근거가 되지 못한다 |

**답변은 상태다. 개수를 세는 칸이 아니다.** 1:1 문의는 답변이 0 아니면 1이라 개수와 상태가 같은 말인데,
숫자로 적으면 "0이 미답변"이라는 규칙을 사용자가 따로 읽어내야 한다. 값은 `완료` / `대기`로 적고,
조회수와 달리 **단위 라벨(`__unit`)을 쓰지 않는다.** 조회수는 `1,011`만 남으면 무엇의 수인지 사라지지만,
칩에 적힌 `대기`·`완료`는 그 자체로 뜻이 선다 — `sm`에서 `답변 대기`로 두면 칩 앞에 라벨이 하나 더 붙어
좁은 메타 줄만 길어진다. 맥락은 칩 안의 `.sr-only`("답변 ")가 스크린리더에 두 폭 모두 전달한다.
답변이 여럿 달릴 수 있는 공개 Q&A라면 값에 개수(`2`)를 적되, 0인 항목은 `대기`로 둔다.

원본 화면은 같은 사실을 세 번 말하고 있었다 — 제목 뒤 `[답변]` 표시 · 제목 뒤 `[0]` 댓글 수 · `답변` 열의 숫자.
**표기는 하나다.** 열이 있으면 제목 뒤 라벨을 두지 않는다.

**답변은 메타의 첫 칸이다 — 제목 바로 옆이다.** 상태는 그 글에 붙는 성질이라 글에 가장 가까이 둔다.
오른쪽 끝에 두면 훑는 축을 보려고 넓은 화면에서 행을 가로질러야 하고, `sm`에서는 메타 줄 맨 뒤로 밀려
제목 아래 첫 값이 분류가 된다. 첫 칸에 두면 두 폭 모두 **제목 → 상태**가 한 덩어리로 읽힌다.

**답변만 Badge다.** 처음에는 텍스트의 톤만 올려 표시했는데, 렌더해 보면 검정과 회색의 차이는 훑을 때 약했다.
답변은 이 목록이 존재하는 이유이고, Badge는 "상태·분류·수량을 나타내는 인라인 레이블"(`badge.md`)이라 상태의 제자리다.

메타의 나머지가 칩이 아닌 것과 모순되지 않는다 — 가르는 기준은 **값이냐 상태냐**다.
분류·작성자·날짜·조회수는 값이라 행마다 다른 문자열이 나열되고 칩으로 만들면 목록이 얼룩이 되지만,
답변은 값이 두 종류뿐이라 반복되는 칩이 패턴으로 읽힌다. 그래서 **칩은 목록당 한 열까지**다.

| 상태 | Badge | 왜 |
|---|---|---|
| 대기 | `badge--neutral` | 아직 아무 일도 일어나지 않았다. 회색은 목록을 얼룩지게 하지 않는다 |
| 완료 | `badge--success` | 처리됐다. **사용자 대면 목록에서 눈에 걸려야 하는 쪽은 완료다** — 자기 글에 답이 왔는지 보러 오기 때문이다. 미답변을 훑는 것은 운영자의 일이고, 그건 필터의 몫이다 |

**주의색(`badge--caution`)은 쓰지 않는다.** 고정(제목)이 이미 쓰는 색이라 한 목록에서 같은 색이 두 가지를 뜻하게 된다.
게다가 고정은 맨 위에 모여 있지만 미답변은 목록 전체에 흩어져 있어, 주황이 흩뿌려지면 얼룩으로 보인다.

**슬롯과 칩은 다른 요소다.** 열 사이 간격을 padding으로 주는데(margin은 트랙 크기 계산을 흔든다),
뱃지에 직접 걸면 그 여백이 칩의 **배경 안쪽**으로 들어가 글자가 오른쪽으로 밀린다(실측: 칩 60px 중 24px이 빈 여백).
슬롯 span이 열과 간격을 맡고, 그 안의 `.badge`가 칩 모양을 맡는다.

```html
<span class="content-list__answers">
  <span class="badge badge--neutral"><span class="sr-only">답변 </span>대기</span>
</span>
```

**댓글 수는 열이 아니라 제목 뒤다.** 답변과 다른 값이다 — 댓글은 오간 이야기의 양이고, 답변은 처리 상태다.
열로 두면 대부분의 행이 0이라 빈 열이 하나 늘고, 0을 찍으면 "댓글이 없다"는 사실을 매 행에 반복하게 된다.
**0이면 마크업에서 뺀다.** 대괄호는 CSS가 넣고, 링크 밖이라 스크린리더에는 숫자만 남으므로 `.sr-only`로 "댓글 "을 붙인다.

> ⚠️ `sm`에서 2줄 말줄임은 제목이 아니라 **제목 줄 전체**(`__headline`)에 걸린다. 제목만 클램프하면 그 상자가 블록이라
> 댓글 수가 2줄 상자의 **첫 줄 옆**에 서고 제목 둘째 줄이 그 아래로 흘러, 제목이 잘린 것처럼 보인다.
> 클램프를 위로 올리면 댓글 수가 제목의 마지막 글자 뒤에 붙는다.

**그래서 답변 슬롯이 있으면 분류의 톤 올림이 풀린다.** 한 행에 진한 값이 둘이면 훑는 축이 둘이 되어
어느 쪽도 걸리지 않는다. 자료실의 축은 분류, 문의 게시판의 축은 답변 여부다 — 목록마다 하나씩이다.
`:has(.content-list__answers)` 한 줄로 CSS가 처리하므로 마크업에서 할 일은 없다.

**작성자는 값이 다양할 때만 둔다.** 전 건이 "관리자"인 목록에서는 정보량이 0이다(→ 메타에 무엇을 넣나).

> ⚠️ 이름 노출 범위는 앱이 정한다(`김*현` 마스킹 등). 컴포넌트는 받은 문자열을 그대로 적는다.
> ⚠️ 비밀글 자물쇠 표시는 아직 정의하지 않았다. 거터 칸은 하나뿐이고 신규·고정이 이미 쓰고 있어, 자리를 새로 정하는 별도 결정이 필요하다.

**열이 늘면 트랙도 늘어난다.** 메타 슬롯은 **최대 5칸**까지 열로 정렬되고, 4·5칸일 때의 기본 트랙 폭은
CSS가 **열 이름 span의 개수**를 보고 정한다(`:has(.content-list__columns > :nth-child(4))`) — 순서가 고정이라 자리마다 다른 최소값을 줄 수 있다. 분류명이 길면
`--content-list-meta-cols`로 덮는다(→ 열 이름 절) — 슬롯 수만큼 트랙을 적어야 한다.

**마지막 열은 오른쪽 정렬이다.** 목록의 오른쪽 끝을 맞추기 위해서고, 라벨과 값에 **같은 규칙**이 걸리므로
열이 몇 개든 어긋나지 않는다. 문의 게시판에서는 작성일이 마지막 칸이 되는데, 날짜는 자릿수가 항상 같아
왼쪽 정렬과 결과가 다르지 않다. 조회수를 함께 두는 목록이라면 조회수를 맨 뒤에 둔다.

### 텍스트 색 위계

한 항목 안에 텍스트가 세 층으로 쌓인다. **색 한 단계씩** 내려가며 역할을 나눈다.

| 요소 | 색 | 역할 |
|------|-----|------|
| 제목 (`__link`) | `--color-text-body` | 목적지. 유일하게 클릭 대상 |
| 번호 (`__no`) | `--color-text-label` | 훑어서 찾는 식별자 |
| 메타 (`__meta`) | `--color-text-subtle` | 읽을지 판단하는 보조 정보 |
| ↳ 분류 (`__cat`) | `--color-text-body` | 메타 안에서 유일한 예외. 목록을 좁히는 축이라 한 단계 올린다 |
| 댓글 수 (`__comments`) | `--color-text-caution` | 제목 옆의 주목 신호. 고정과 같은 색이고, 갈리는 것은 형태다 — 아래 참조 |

**댓글 수는 주의색(`--color-text-caution`, orange-600)이다.** 고정 제목과 **같은 색**이고, 갈리는 것은 형태다 — 고정은 제목 자체의 색(semibold 17px)이고 댓글 수는 제목 뒤의 대괄호 숫자(13px)라, 한 행에 둘 다 있어도 자리로 구분된다. 신규 아이콘은 빨강(`--color-fill-error`)이라 또 갈린다.

같은 계열을 쓰는 것이 우연이 아니다 — 고정·신규·댓글 수는 모두 "이 행을 먼저 봐라"는 **주목** 신호이고, 목록에서 색을 쓰는 자리는 이 세 가지뿐이다. 나머지(분류·작성자·날짜·조회수)는 회색조의 값이다.

> ⚠️ **대비 3.92:1로 WCAG AA 본문 기준(4.5:1)에 미달한다** — 고정 제목과 같은 사정이다. 댓글 수는 대괄호로 감싼 부가 수치이고 그 글의 목적지는 제목이라 정보가 색에만 실리지는 않지만, 기준을 맞춰야 하는 화면에서는 `--color-text-caution-muted`(orange-700, 5.35:1)로 바꾼다 — 토큰 한 줄이다.

답변(`__answers`)은 이 표 밖이다 — 텍스트 톤이 아니라 Badge의 색을 쓴다. **답변 슬롯이 있으면 분류는 톤 올림을 내놓는다**(CSS가 자동 처리). 한 목록에 훑는 축은 하나여야 하고, 문의 게시판의 축은 답변이다.

읽은 항목에서는 분류도 제목과 함께 내려간다. 제목만 내리면 그 행에서 가장 진한 글자가 제목이 아니라 분류가 되어 위계가 뒤집힌다.

분류에 **브랜드 색을 쓰지 않는다.** 목록 안에서 파란 글자는 hover와 "누를 수 있는 것"을 뜻하는데, 분류는 누를 수 없는 값이다(`sm`의 필터 칩이 그 역할을 맡는다). 제목 바로 옆·아래에 파란 텍스트가 있으면 두 번째 링크로 읽힌다. 같은 계열의 검정으로 올리면 "메타 중 하나만 진하다"는 위계는 그대로 남고 링크 오해만 사라진다.

번호가 메타보다 진한 이유는 **훑는 대상**이기 때문이다. 상담 중 "165번"을 눈으로 찾아야 하는데 판단 보조 정보와 같은 명도면 열이 묻힌다.

### 고정 항목과 신규 표시(`__new`)

항목에 붙는 표시는 두 가지뿐이다. **성격이 다르므로 형태도 다르게 둔다.**

| | 신규 표시 (`__new`) | 고정 (`--pinned`) |
|---|---|---|
| 누가 | 시스템이 자동으로 (등록일 기준) | 운영자가 수동으로 |
| 형태 | 아이콘 (`icon-new`, 빨강) | **핀 아이콘 + 주의색 제목** |
| 뜻 | 새로 올라왔다 | 먼저 봐라 |
| 동시 노출 | 거터 칸은 하나 — 고정 항목에서는 핀이 이긴다 | |

**거터 칸은 하나다.** 신규와 고정은 번호 **왼쪽**의 같은 16px 칸을 쓰고, 둘 다 해당하는 항목에서는 **핀이 이긴다.** 고정 항목은 이미 목록 맨 위에 모여 있어 "새로 올라왔다"를 따로 신호할 필요가 적고, 운영자가 손으로 지정한 "먼저 봐라"가 시스템이 날짜로 붙인 표시보다 앞선다. 칸을 둘로 나눠 핀과 N을 함께 세우면, 표시가 하나뿐인 대다수 행에서 빈 칸만큼 제목이 밀린다.

표시는 **핀 아이콘**이 한다. 아이콘에 `aria-label="고정"`을 달면 스크린리더에도 나가고 흑백 출력에서도 남는다 — 색에 기대지 않는다.

**라벨(뱃지)을 두지 않는다.** 운영자가 문서 하나에 내리는 판단은 사실상 "꼭 봐라" 하나뿐인데, 라벨 슬롯을 열어두면 라벨만 늘어난다. 분류·형식은 **속성**이라 분류 열의 몫이고, `접수중`·`마감`은 **상태**라 시간에 따라 바뀌므로 수동 라벨로 감당되지 않으며, `정정`·`개정`은 **내용**이라 제목에 적으면 된다. `신규`는 아이콘이 담당한다. 핀 하나면 라벨이 필요 없고, **오래된 글이 맨 위에 있는 이유**도 함께 설명된다.

색은 **주의(caution) 계열**이다. 브랜드는 못 쓴다 — hover가 브랜드 틴트(`--color-action-brand-subtle`)라 "지금 올려둔 행"과 "고정된 행"이 같은 색이 된다. 중립(gray-50)은 충돌은 없지만 눈에 걸리지 않아 고정의 목적을 못 한다.

**표시는 핀 아이콘과 제목 색 둘이다.** 행 배경도, 블록을 닫는 선도 쓰지 않는다. 제목 색이 행마다 붙는 표시라 블록의 경계를 따로 그을 필요가 없다 — 색이 끝나는 곳이 곧 고정이 끝나는 곳이다. 면과 선을 함께 쓰면 같은 사실을 세 번 말하게 된다.

색은 **주의(caution) 계열**이다. 브랜드는 쓸 수 없다 — 목록에서 파란 글자는 링크를 뜻해 "누를 수 있는 것"과 섞인다.

**읽음과 같은 속성을 쓰지만 충돌하지 않는다.** 제목 색은 읽음 여부(안 읽음 gray-950 / 읽음 gray-500)도 쓰는 자리인데, 고정 규칙이 뒤에 와서 색을 가져간다. 읽음은 **굵기**가 계속 말한다 — 읽음 절에 적힌 대로 읽음은 굵기가 주 신호이고 색은 보조다. 고정은 운영자가 정한 성질이고 읽음은 사용자마다 다른 상태라, 읽었다고 고정이 아니게 되지는 않는다.

> ⚠️ **대비 기준 미달.** 주의색(orange-600)은 흰 배경에서 **3.92:1**로 WCAG AA 본문 기준(4.5:1)에 못 미친다. 제목은 15/17px semibold라 large text 예외에도 해당하지 않는다. 고정이라는 사실은 핀 아이콘이 함께 전달하므로 색 단독 전달(1.4.1)은 아니지만, 글자 자체의 읽기 쉬움(1.4.3)은 기준 아래다. 기준을 맞춰야 하면 `--color-text-caution-muted`(orange-700, 5.35:1)로 바꾼다.

> ⚠️ 고정 항목은 목록 맨 위에 모아 둔다. 중간에 섞이면 주의색 제목이 목록 여기저기 흩어져 얼룩으로 보이고, 날짜 순서를 깬 이유도 설명하지 못한다.
> ⚠️ 목록 전체의 20%를 넘기지 않는다. 절반이 고정이면 아무것도 고정이 아니다.

### sm에서 분류를 어떻게 짚나

`md` 이상에서는 분류가 **열**로 서고 header에 열 이름이 있어, 눈으로 열을 따라 훑으면 된다. `sm`에서는 그 열이 사라진다 — 메타가 인라인으로 접히면서 분류가 날짜·조회수와 같은 줄의 텍스트가 되기 때문이다.

그래서 `sm`에서만 **분류 필터 행**(`.content-list__filter`)을 목록 위에 둔다. 훑어서 찾는 대신 **눌러서 거른다.**

| | `md` 이상 | `sm` |
|---|---|---|
| 분류를 다루는 방법 | 열을 따라 **훑는다** | 칩을 눌러 **거른다** |
| 컴포넌트 | `__columns` (열 이름) | `__filter` (Tag 칩 행) |
| 표시 | md 이상 전용 | sm 전용 |
| 행의 분류(`__cat`) | 열에 표시 | 전체일 때만 표시 |
| 행의 번호(`__no`) | 거터에 표시 | **숨김** |

둘은 **동시에 보이지 않는다.** 같은 정보를 폭에 따라 다른 형태로 내보내는 것이라, 마크업에 둘 다 두어도 CSS가 하나만 보여준다.

- **`sm`에서 필터 행은 필수다.** 행의 번호(`__no`)를 숨기고 분류(`__cat`)도 조건부로 숨기므로, 필터 행이 없으면 분류를 다룰 방법이 사라진다.
- **행의 분류는 "전체"일 때만 보인다.** 특정 분류로 좁히면 모든 행이 같은 분류라 행마다 적는 것이 중복이고, 좁은 메타 줄을 접히게 만든다. 전체일 때는 행마다 분류가 달라 그 값이 실제 정보다. CSS가 첫 칩(`전체`)의 선택 여부로 판정하므로 앱은 `tag--selected`만 옮기면 된다.
- `sm`에서 **번호(`__no`)도 숨는다.** 좁은 화면에서 거터를 상시 차지할 만큼 자주 쓰이는 정보가 아니다.

> ⚠️ 번호는 상담 중 "165번 글 보세요"로 항목을 **지목하는 식별자**다. 안내를 받는 쪽이 모바일이면 목록에서 번호를 찾을 수 없다. 상세 화면에서 번호를 보여주거나 링크로 안내하는 경로를 함께 두어야 한다.
- 첫 칩은 **전체**(`tag--selected` 기본값). 아무것도 선택하지 않은 상태가 곧 전체다. **순서를 고정한다** — 행의 분류를 보일지 말지가 "첫 칩이 선택돼 있는가"로 판정되므로, 전체가 첫 칩이 아니면 그 판정이 깨진다.
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

**메타 슬롯이 4·5칸이면 기본값도 그만큼 늘어난다** — CSS가 `:has(.content-list__columns > :nth-child(4))`로 **열 이름 span의 개수**를 세어 정한다(4칸 `5·8·6·7rem`, 5칸 `5·8·6·7·5rem` — 답변·분류·작성자·작성일·조회수 순). 호스트가 변수를 적지 않아도 라벨과 값이 어긋나지 않는다. 직접 덮을 때는 **슬롯 수만큼** 트랙을 적는다.

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

이미 읽은 항목은 **제목의 굵기를 낮추고 색을 메타 수준까지 내린다.** 굵기와 색을 함께 바꾸므로 색각 이상에서도 구분된다.

색을 한 단계만(`--color-text-label`) 내렸을 때는 안 읽음과의 대비가 **2.12:1**이라 나란히 놓고 봐야 겨우 보였다. `--color-text-subtle`까지 내리면 **4.09:1**로 벌어져 훑는 중에도 걸린다. 읽은 제목이 메타와 같은 값이 되는 것은 의도다 — 이미 읽은 항목은 더 이상 목적지가 아니므로 위계에서 내려온다.

| 후보 | 안 읽음과의 대비 | 흰 배경 대비 |
|---|---|---|
| `--color-text-label` (gray-700) | 2.12:1 — 부족 | 8.68:1 |
| **`--color-text-subtle` (gray-500)** | **4.09:1** | 4.51:1 (AA 통과) |
| gray-400 | 5.98:1 | 3.08:1 — **AA 미달** |

> ⚠️ 행 전체에 `opacity`를 걸어 흐리게 하는 방법은 쓰지 않는다. 메타까지 함께 흐려져 대비가 3:1 아래로 떨어진다.

| | 안 읽음 | 읽음 |
|---|---|---|
| 굵기 | `--font-weight-heading` (600) | `--font-weight-body` (400) |
| 색 | `--color-text-body` (gray-950) | `--color-text-subtle` (gray-500) |

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
  ├─ .content-list__header — div. optional. 목록 소제목.
  │    ├─ .content-list__heading — div. 소제목.
  │    │    heading 태그가 아니라 div (UA 마진으로 레이아웃 깨짐 — table__title과 동일 이유).
  │    └─ .content-list__columns — div. optional. 열 이름 3개(분류·작성일·조회) span.
  │         **기본으로 둔다.** 이 슬롯이 있으면 열 정렬이 켜진다(modifier 클래스 없음).
  │         md 이상에서만 보이고 sm·subgrid 미지원에서는 숨는다(__unit이 정보를 대신한다).
  ├─ .content-list__filter — div. **sm에서 필수**(md 이상에서는 숨는다). 분류 필터 칩 행.
  │    **header 다음, 목록 바로 위**에 둔다 — 소제목은 목록 전체를 이름 붙이고,
  │    필터는 그 목록에 걸리는 조건이라 이름 아래에 와야 한다.
  │    Tag 컴포넌트를 쓴다 — Badge가 아니다(눌러야 하므로).
  │    예: <button type="button" class="tag tag--pill tag--md tag--selected">전체</button>
  │    첫 칩은 "전체"이고 기본 선택. 단일 선택 — 선택된 것 하나만 tag--selected.
  │    **순서 고정**: 첫 칩이 전체다. 행의 분류 표시 여부가 이 위치로 판정된다.
  │    가로 스크롤이라 줄바꿈하지 않는다.
  └─ .content-list — ul. list-style:none.
       └─ .content-list__item — li. **번호 거터 + 본문** 두 열. position:relative (링크 오버레이 기준점).
            읽은 항목에는 content-list__item--read를 추가한다(제목 굵기·색이 내려간다).
            고정 항목에는 content-list__item--pinned를 추가하고(제목이 주의색이 된다),
            거터에 content-list__pin(icon-pin)을 넣는다 — 신규 아이콘과 같은 칸이라 둘을 함께 넣지 않는다.
            뱃지 라벨 슬롯은 두지 않는다 — 표시는 거터 아이콘과 제목 색뿐이다.
            :visited로 대체할 수 있으나 굵기는 바꿀 수 없다 — 사용 지침 참조.
            ├─ .content-list__no — span. optional(기본 표시). "165" 형태. 어느 폭에서든 왼쪽 거터에 남는다.
            ├─ .content-list__new — span. optional. **번호보다 앞에 온다.** icon-new 아이콘. aria-label="신규" 필요.
            │    고정 항목에서는 이 자리에 .content-list__pin(icon-pin, aria-label="고정")을 넣는다.
            │    같은 칸이라 둘을 함께 넣지 않는다.
            │    시스템이 등록일 기준으로 자동 부여. 고정과 동시에 나올 수 있다.
            │    **번호 옆 거터 열**에 둔다. 크기 --icon-sm(16px) + 광학 보정 1px(CSS 주석 참조).
            │    폭이 고정이라 열에 둬도 제목 폭을 뺏지 않고,
            │    번호와 나란히 세로 한 줄로 훑힌다.
            └─ .content-list__body — div. 제목·메타 묶음. flex:1 min-width:0.
                 데스크톱에서는 가로(제목 좌 / 메타 우), sm에서는 세로로 접힌다.
                 ├─ .content-list__headline — div. 제목 줄. 제목 + 댓글 수.
                 │    sm에서는 2줄 말줄임이 **이 요소**에 걸리고 자식들이 인라인으로 흐른다
                 │    (제목만 클램프하면 댓글 수가 2줄 상자 첫 줄 옆에 서서 제목이 잘린 것처럼 보인다).
                 │    ├─ .content-list__link — a. 제목. **제목 텍스트만 감싼다.**
                 │         ::after가 item 전체를 덮어 행 전체가 클릭된다(stretched link 패턴).
                 │         링크명이 제목만으로 읽히므로 스크린리더에서 메타가 링크명에 섞이지 않는다.
                 │    │    데스크톱 가로 배치에서는 한 줄 말줄임, sm에서는 headline이 2줄로 자른다.
                 │    └─ .content-list__comments — span. optional. 댓글 수. "[3]"으로 보인다(대괄호는 CSS).
                 │         **링크 밖**이라 링크명에 섞이지 않는다. 스크린리더에는 숫자만 남으므로
                 │         안에 <span class="sr-only">댓글 </span>를 둔다.
                 │         **0이면 마크업에서 뺀다** — 0을 찍으면 "댓글이 없다"를 매 행에 반복하게 된다.
                 │         답변(__answers)과 다른 값이다: 댓글은 오간 이야기의 양, 답변은 처리 상태.
                 └─ .content-list__meta — div. 부가 정보.
                      **순서 고정: 답변 → 분류 → 작성자 → 작성일 → 조회수.** 최대 5칸까지 열로 정렬된다.
                      슬롯은 자리 순서로 열에 얹히므로(클래스가 아니라 nth-child) 빼면 그 열이 사라진다.
                      ├─ .content-list__answers — span. optional. 답변 **상태**. **메타의 첫 칸 — 제목 바로 옆.**
                      │    상태는 그 글에 붙는 성질이라 글에 가장 가까이 둔다.
                      │    **슬롯 자신은 칩이 아니다.** 슬롯이 열과 간격(padding)을 맡고, 안의 .badge가 칩을 맡는다 —
                      │    뱃지에 열 padding을 걸면 그 여백이 칩 배경 안으로 들어가 글자가 밀린다.
                      │    └─ .badge — span. badge--neutral "대기" / badge--success "완료".
                      │         __unit을 쓰지 않는다 — 칩의 글자가 그 자체로 뜻이 선다.
                      │         대신 칩 안에 <span class="sr-only">답변 </span>를 둔다.
                      │         badge--caution은 쓰지 않는다 — 고정(제목)이 이미 쓰는 색이다.
                      │         개수를 쓰는 공개 Q&A라면 완료 칩의 글자가 "2", 0인 항목만 "대기".
                      ├─ .content-list__cat — span. 분류. 메타 중 유일하게 진한 텍스트(검정).
                      │    단 __answers가 있으면 자동으로 톤이 내려간다 — 훑는 축은 목록당 하나다.
                      ├─ .content-list__author — span. optional. 작성자. **문의 게시판 전용.**
                      │    전 건이 "관리자"인 자료실에는 두지 않는다(정보량 0).
                      │    마스킹 여부는 앱이 정한다 — 컴포넌트는 받은 문자열을 그대로 적는다.
                      ├─ .content-list__date — span. YYYY.MM.DD (product.md 날짜 포맷).
                      └─ .content-list__views — span. "조회 1,011". 아이콘 없이 텍스트.
                           문의 게시판에서는 뺀다 — 비밀글이 대부분이라 판단 근거가 못 된다.
                           └─ .content-list__unit — span. "조회 " 단위 라벨. 항상 마크업에 둔다.
                                열 이름이 있으면 header의 열 이름이 대신하므로 숨겨진다.

- 메타 항목 사이 가운뎃점(·)은 CSS ::before가 자동 삽입한다. 마크업에 구분자를 적지 않는다.
- 분류에 Badge(칩)를 쓰지 않는다. 한 줄에 칩·아이콘이 섞이면 메타가 제목과 시각적으로 경쟁한다.
  메타는 같은 크기·같은 무게의 텍스트로 두고, 분류만 톤을 올려 구분한다.
  예외는 답변 한 칸 — 값이 아니라 상태라 두 종류만 반복된다(사용 지침 참조).
- 조회수에 아이콘을 쓰지 않는다. "조회 1,011"로 적으면 sr-only 보조 텍스트도 필요 없다.
- 답변 여부를 제목 뒤 라벨([답변])로 두지 않는다. 열이 있으면 표기는 하나다. 제목 뒤에 오는 것은 댓글 수뿐이다.
- 칩(Badge)은 **답변 한 열까지**다. 값(분류·작성자·날짜·조회수)을 칩으로 만들면 목록이 얼룩이 된다.
- 메타 슬롯을 늘리면 열 이름(__columns)의 span 개수도 같이 늘린다. 값과 라벨은 같은 트랙을 물려받으므로
  개수가 어긋나면 라벨이 다른 열 위에 선다.
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
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">기본 — md 이상은 열 이름, sm은 분류 필터 칩 행. 둘은 동시에 보이지 않는다. 폭을 줄여보라. 165는 고정(핀), 164는 신규 + 읽음</p>
  <div data-component class="content-list-container">
    <div class="content-list__header">
      <div class="content-list__heading">자료 목록</div>
      <div class="content-list__columns"><span>분류</span><span>작성일</span><span>조회</span></div>
    </div>
    <div class="content-list__filter">
      <button type="button" class="tag tag--pill tag--md tag--selected">전체</button>
      <button type="button" class="tag tag--pill tag--md">4대보험</button>
      <button type="button" class="tag tag--pill tag--md">김반장뉴스레터</button>
      <button type="button" class="tag tag--pill tag--md">고용노동부</button>
      <button type="button" class="tag tag--pill tag--md">건설업교육</button>
    </div>
    <ul class="content-list">
      <li class="content-list__item content-list__item--pinned">
        <span class="content-list__pin"><svg aria-label="고정"><use href="icons/sprite.svg#icon-pin"/></svg></span>
        <span class="content-list__no">165</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">2024년 건설보험료신고_노무제공자신고</a>
          </div>
          <div class="content-list__meta">
            <span class="content-list__cat">4대보험</span>
            <span class="content-list__date">2024.03.20</span>
            <span class="content-list__views"><span class="content-list__unit">조회 </span>1,011</span>
          </div>
        </div>
      </li>
      <li class="content-list__item content-list__item--read">
        <span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span>
        <span class="content-list__no">164</span>
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



<!-- 문의 게시판 변형 — 작성자 + 답변 -->
<div>
  <p class="text-helper" style="color:var(--color-text-subtle);margin:0 0 var(--space-stack-sm)">문의 게시판 변형 — 조회수를 빼고 <strong>작성자</strong>와 <strong>답변</strong>을 둔다. 답변은 <strong>제목 바로 옆 첫 칸</strong>이다. 메타 4칸도 열 이름과 그대로 맞고, 분류는 톤을 내놓아 진한 값은 <strong>미답변</strong> 하나다</p>
  <div data-component class="content-list-container">
    <div class="content-list__header">
      <div class="content-list__heading">장애신고</div>
      <div class="content-list__columns"><span>답변</span><span>분류</span><span>작성자</span><span>작성일</span></div>
    </div>
    <div class="content-list__filter">
      <button type="button" class="tag tag--pill tag--md tag--selected">전체</button>
      <button type="button" class="tag tag--pill tag--md">김반장</button>
      <button type="button" class="tag tag--pill tag--md">이콘</button>
      <button type="button" class="tag tag--pill tag--md">4대보험</button>
    </div>
    <ul class="content-list">
      <li class="content-list__item">
        <span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span>
        <span class="content-list__no">13</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">로그인 후 화면이 흰색으로만 뜹니다</a>
            <span class="content-list__comments"><span class="sr-only">댓글 </span>2</span>
          </div>
          <div class="content-list__meta">
            <span class="content-list__answers"><span class="badge badge--neutral"><span class="sr-only">답변 </span>대기</span></span>
            <span class="content-list__cat">이콘</span>
            <span class="content-list__author">김지현</span>
            <span class="content-list__date">2026.08.31</span>
          </div>
        </div>
      </li>
      <li class="content-list__item">
        <span class="content-list__no">12</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">비즈씨 접속이 안 됩니다 — 오전부터 계속 끊깁니다</a>
          </div>
          <div class="content-list__meta">
            <span class="content-list__answers"><span class="badge badge--neutral"><span class="sr-only">답변 </span>대기</span></span>
            <span class="content-list__cat">김반장</span>
            <span class="content-list__author">심상민</span>
            <span class="content-list__date">2024.10.28</span>
          </div>
        </div>
      </li>
      <li class="content-list__item content-list__item--read">
        <span class="content-list__no">11</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">보험료 신고 화면에서 저장 버튼이 눌리지 않습니다</a>
            <span class="content-list__comments"><span class="sr-only">댓글 </span>5</span>
          </div>
          <div class="content-list__meta">
            <span class="content-list__answers"><span class="badge badge--success"><span class="sr-only">답변 </span>완료</span></span>
            <span class="content-list__cat">김반장</span>
            <span class="content-list__author">홍영미</span>
            <span class="content-list__date">2024.02.25</span>
          </div>
        </div>
      </li>
      <li class="content-list__item">
        <span class="content-list__no">10</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">출력하면 표 오른쪽이 잘려서 나옵니다</a>
          </div>
          <div class="content-list__meta">
            <span class="content-list__answers"><span class="badge badge--success"><span class="sr-only">답변 </span>완료</span></span>
            <span class="content-list__cat">이콘</span>
            <span class="content-list__author">김민정</span>
            <span class="content-list__date">2024.01.08</span>
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

:::preview
<!-- 모바일(sm) 미리보기.
     실제 sm 대응은 @media (max-width: 767px)라 뷰포트가 좁아야 걸린다.
     문서 뷰포트는 넓으므로 iframe으로 **진짜 390px 뷰포트**를 만든다 —
     규칙을 복사해 다시 쓰지 않으므로 컴포넌트를 고치면 이 미리보기도 자동으로 따라온다. -->
<div style="width:390px;max-width:100%;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-default);border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface-base)">
  <iframe data-sm-preview title="모바일 미리보기 (390px)" style="display:block;width:100%;border:0"></iframe>
</div>
<template data-sm-markup>
<div data-component class="content-list-container">
    <div class="content-list__header">
      <div class="content-list__heading">자료 목록</div>
      <div class="content-list__columns"><span>분류</span><span>작성일</span><span>조회</span></div>
    </div>
    <div class="content-list__filter">
      <button type="button" class="tag tag--pill tag--md tag--selected">전체</button>
      <button type="button" class="tag tag--pill tag--md">4대보험</button>
      <button type="button" class="tag tag--pill tag--md">김반장뉴스레터</button>
      <button type="button" class="tag tag--pill tag--md">고용노동부</button>
      <button type="button" class="tag tag--pill tag--md">건설업교육</button>
    </div>
    <ul class="content-list">
      <li class="content-list__item content-list__item--pinned">
        <span class="content-list__pin"><svg aria-label="고정"><use href="icons/sprite.svg#icon-pin"/></svg></span>
        <span class="content-list__no">165</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">2024년 건설보험료신고_노무제공자신고</a>
          </div>
          <div class="content-list__meta">
            <span class="content-list__cat">4대보험</span>
            <span class="content-list__date">2024.03.20</span>
            <span class="content-list__views"><span class="content-list__unit">조회 </span>1,011</span>
          </div>
        </div>
      </li>
      <li class="content-list__item content-list__item--read">
        <span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span>
        <span class="content-list__no">164</span>
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
</template>
<script>
(function () {
  var frame = stage.querySelector('iframe[data-sm-preview]');
  var tpl   = stage.querySelector('template[data-sm-markup]');
  if (!frame || !tpl) return;

  // 페이지에 이미 로드된 토큰·컴포넌트 CSS와 아이콘 스프라이트를 그대로 옮긴다.
  // 규칙을 옮겨 적지 않으므로 컴포넌트가 바뀌면 이 미리보기도 같이 바뀐다.
  var css = Array.prototype.map.call(document.querySelectorAll('style'), function (el) {
    return el.textContent;
  }).join(String.fromCharCode(10));
  var sprite = document.querySelector('svg[data-sprite], body > svg');

  // 높이 맞춤 리스너를 srcdoc **보다 먼저** 건다 — 나중에 걸면 load를 놓친다.
  function fit() {
    var d = frame.contentDocument;
    if (!d || !d.body) return;
    frame.style.height = d.body.scrollHeight + 'px';
  }
  frame.addEventListener('load', function () {
    fit();
    // 웹폰트가 늦게 오면 줄 수가 달라져 높이가 바뀐다 — 폰트 로드 후 한 번 더 맞춘다
    var d = frame.contentDocument;
    if (d && d.fonts && d.fonts.ready) d.fonts.ready.then(fit);
  });

  frame.srcdoc =
    '<!doctype html><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<style>' + css + 'html,body{margin:0;background:var(--color-surface-base)}</style>' +
    (sprite ? sprite.outerHTML : '') +
    tpl.innerHTML;
})();
</script>
:::

:::preview
<!-- 문의 게시판 변형의 모바일(sm) 미리보기.
     열이 사라지면서 메타가 인라인으로 접히지만, 답변 칩은 라벨 없이 그대로 남는다 —
     "대기"·"완료"는 그 자체로 뜻이 서기 때문이다(조회수는 __unit이 다시 붙는다). -->
<div style="width:390px;max-width:100%;border:var(--stroke-sm) var(--stroke-solid) var(--color-border-default);border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface-base)">
  <iframe data-sm-preview title="문의 게시판 모바일 미리보기 (390px)" style="display:block;width:100%;border:0"></iframe>
</div>
<template data-sm-markup>
<div data-component class="content-list-container">
    <div class="content-list__header">
      <div class="content-list__heading">장애신고</div>
      <div class="content-list__columns"><span>답변</span><span>분류</span><span>작성자</span><span>작성일</span></div>
    </div>
    <div class="content-list__filter">
      <button type="button" class="tag tag--pill tag--md tag--selected">전체</button>
      <button type="button" class="tag tag--pill tag--md">김반장</button>
      <button type="button" class="tag tag--pill tag--md">이콘</button>
      <button type="button" class="tag tag--pill tag--md">4대보험</button>
    </div>
    <ul class="content-list">
      <li class="content-list__item">
        <span class="content-list__new"><svg aria-label="신규"><use href="icons/sprite.svg#icon-new"/></svg></span>
        <span class="content-list__no">13</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">로그인 후 화면이 흰색으로만 뜹니다</a>
            <span class="content-list__comments"><span class="sr-only">댓글 </span>2</span>
          </div>
          <div class="content-list__meta">
            <span class="content-list__answers"><span class="badge badge--neutral"><span class="sr-only">답변 </span>대기</span></span>
            <span class="content-list__cat">이콘</span>
            <span class="content-list__author">김지현</span>
            <span class="content-list__date">2026.08.31</span>
          </div>
        </div>
      </li>
      <li class="content-list__item">
        <span class="content-list__no">12</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">비즈씨 접속이 안 됩니다 — 오전부터 계속 끊깁니다</a>
          </div>
          <div class="content-list__meta">
            <span class="content-list__answers"><span class="badge badge--neutral"><span class="sr-only">답변 </span>대기</span></span>
            <span class="content-list__cat">김반장</span>
            <span class="content-list__author">심상민</span>
            <span class="content-list__date">2024.10.28</span>
          </div>
        </div>
      </li>
      <li class="content-list__item content-list__item--read">
        <span class="content-list__no">11</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">보험료 신고 화면에서 저장 버튼이 눌리지 않습니다</a>
            <span class="content-list__comments"><span class="sr-only">댓글 </span>5</span>
          </div>
          <div class="content-list__meta">
            <span class="content-list__answers"><span class="badge badge--success"><span class="sr-only">답변 </span>완료</span></span>
            <span class="content-list__cat">김반장</span>
            <span class="content-list__author">홍영미</span>
            <span class="content-list__date">2024.02.25</span>
          </div>
        </div>
      </li>
      <li class="content-list__item">
        <span class="content-list__no">10</span>
        <div class="content-list__body">
          <div class="content-list__headline">
            <a class="content-list__link" href="#">출력하면 표 오른쪽이 잘려서 나옵니다</a>
          </div>
          <div class="content-list__meta">
            <span class="content-list__answers"><span class="badge badge--success"><span class="sr-only">답변 </span>완료</span></span>
            <span class="content-list__cat">이콘</span>
            <span class="content-list__author">김민정</span>
            <span class="content-list__date">2024.01.08</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
(function () {
  var frame = stage.querySelector('iframe[data-sm-preview]');
  var tpl   = stage.querySelector('template[data-sm-markup]');
  if (!frame || !tpl) return;

  var css = Array.prototype.map.call(document.querySelectorAll('style'), function (el) {
    return el.textContent;
  }).join(String.fromCharCode(10));
  var sprite = document.querySelector('svg[data-sprite], body > svg');

  function fit() {
    var d = frame.contentDocument;
    if (!d || !d.body) return;
    frame.style.height = d.body.scrollHeight + 'px';
  }
  frame.addEventListener('load', function () {
    fit();
    var d = frame.contentDocument;
    if (d && d.fonts && d.fonts.ready) d.fonts.ready.then(fit);
  });

  frame.srcdoc =
    '<!doctype html><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<style>' + css + 'html,body{margin:0;background:var(--color-surface-base)}</style>' +
    (sprite ? sprite.outerHTML : '') +
    tpl.innerHTML;
})();
</script>
:::

---

## Anatomy

:::preview
<div data-component class="content-list-container">
  <ul class="content-list">
    <li class="content-list__item content-list__item--pinned">
      <span class="content-list__pin"><svg aria-label="고정"><use href="icons/sprite.svg#icon-pin"/></svg></span>
      <span class="content-list__no">165</span>
      <div class="content-list__body">
        <div class="content-list__headline">
          <a class="content-list__link" href="#">2024년 건설보험료신고_노무제공자신고</a>
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
  /* 0 1 auto — 남는 폭을 채우지 않는다. min-width:0 + shrink 허용으로
     긴 제목이 줄어들며 말줄임된다. */
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

/* ── Headline (제목 줄) ── */
/* 제목과 댓글 수를 담는 래퍼. 고정·신규 라벨을 거터 아이콘으로 옮기면서 한때 제목만 남았고,
   댓글 수가 다시 들어왔다 — 댓글 수는 메타(열)가 아니라 제목에 딸린 수치이기 때문이다.
   래퍼의 역할: 데스크톱에서 제목(열 3)과 메타(열 4~)를 가르는 경계이고,
   sm에서 제목 줄과 메타 줄을 나누는 단위이며, sm의 2줄 말줄임이 걸리는 상자다. */
.content-list__headline {
  display: flex;
  /* baseline — 제목이 1줄이든 2줄이든 첫 줄 기준선을 유지한다. */
  align-items: baseline;
  gap: var(--space-gap-sm);
  min-width: 0;
}

/* ── New mark (optional) ── */
/* 시간 기반 자동 표시. 번호 옆 **거터 열**에 둔다 — 제목 뒤가 아니다.
   제목 뒤에 두면 제목이 2줄로 접힐 때 아이콘이 첫 줄 끝에 걸려 단어 중간에 낀다.
   아이콘은 폭이 16px로 고정이라 열에 두는 비용이 라벨 뱃지와 다르다 —
   목록 내용과 무관하게 항상 같은 폭이고, 번호와 나란히 세로 한 줄로 훑힌다.

   고정(`__pin`)과 **같은 칸을 쓴다.** 둘은 동시에 나오지 않는다 — 고정 항목에서는
   핀이 신규를 대신한다(→ 사용 지침). 한 행에 표시는 하나뿐이므로 칸도 하나면 된다.
   칸을 둘로 나누면 표시가 하나뿐인 행에서 빈 칸만큼 제목이 밀린다.

   정렬: 아이콘은 글자가 없어 headline의 baseline 정렬이 통하지 않는다.
   align-self:center로 두면 제목이 2줄로 접히는 sm에서 두 줄 한가운데(11.3px 아래)에 뜬다.
   그래서 상단에 붙이되 박스 높이를 제목 첫 줄 높이와 같게 주고 그 안에서 가운데 정렬한다 —
   1줄·2줄, 데스크톱·모바일 모두 오차 0으로 첫 줄에 맞는다. */
.content-list__new,
.content-list__pin {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  height: calc(var(--content-list-title-size) * var(--line-height-reading));
  /* 번호에 바짝 붙인다 — 표시와 번호는 "새 글인가, 몇 번 글인가"라는 한 덩어리다.
     본문과 같은 간격(16px)으로 띄우면 셋이 균등하게 나열돼 덩어리가 풀린다.
     간격을 번호의 왼쪽이 아니라 **표시의 오른쪽**에 둔다 — 표시가 없는 행에서는
     이 여백도 함께 사라져야 번호 열의 시작선이 흔들리지 않는다. */
  margin-inline-end: var(--space-gap-2xs);

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

/* 고정 표시 — 주의 색. 신규(빨강)와 색으로도 갈린다.
   fill 계열은 면과 아이콘에 쓰라고 만든 색이라 여기가 제자리다(선에는 쓰지 않는다).
   icon-pin은 단색 currentColor 아이콘이라 svg의 fill이 아니라 color로 칠한다. */
.content-list__pin {
  color: var(--color-fill-caution);
}

.content-list__pin svg {
  width: var(--icon-sm);
  height: var(--icon-sm);
  fill: currentColor;
}

/* ── Pinned (optional) ── */
/* 목록 위에 고정해 두는 항목. 표시는 **거터의 핀 아이콘 + 제목 색** 둘이다.
   라벨(뱃지)을 두지 않는다 — 운영자가 문서 하나에 내리는 판단은 사실상
   "이건 꼭 봐라" 한 가지뿐이라, 그 하나를 위해 라벨 슬롯을 두면 라벨이
   늘어나기만 한다(서식·인기·NEW…).

   **행 배경도, 블록을 닫는 선도 쓰지 않는다.** 제목 색이 행마다 붙는 표시라
   블록의 경계를 따로 그을 필요가 없다 — 색이 끝나는 곳이 곧 고정이 끝나는 곳이다.
   면과 선을 함께 쓰면 같은 사실을 세 번 말하게 된다.

   실제 규칙은 아래 Read 블록 뒤에 있다 — 명시도가 같아 순서로 갈리기 때문이다. */

/* subgrid 미지원 브라우저에서는 flex 배치가 그대로 남는다 —
   신규 아이콘이 번호에 바로 붙어 열이 흔들릴 뿐 정보는 전부 보인다. */
@supports (grid-template-columns: subgrid) {
  /* 목록이 열을 정의하고, 각 항목이 그 열을 물려받는다(subgrid).
     항목을 display:contents로 풀지 않는 이유: 그러면 li의 상자가 사라져
     hover 배경·고정 배경·구분선·__link::after 오버레이의 기준점이 전부 무너진다. */
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
  /* 표시가 번호보다 앞이다 — 행의 맨 앞에 서야 훑을 때 먼저 걸린다.
     번호는 지목용 식별자라 표시를 찾는 눈길을 가로막지 않는 편이 낫다. */
  .content-list__new,
  .content-list__pin  { grid-column: 1; }
  .content-list__no   { grid-column: 2; }
  .content-list__body { grid-column: 3; }

  /* 목록에 표시(신규·고정)가 하나도 없으면 가운데 열을 아예 없앤다 —
     폭 0인 열이 남으면 column-gap만 16px 더 붙어 번호와 제목이 벌어진다. */
  .content-list:not(:has(.content-list__new, .content-list__pin)) {
    grid-template-columns: auto 1fr;
  }
  .content-list:not(:has(.content-list__new, .content-list__pin)) .content-list__body {
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
    /* 머리(소제목 + 필터)와 본문을 가르는 선. header의 강한 선을 여기로 넘겨받는다 —
       소제목과 필터는 한 덩어리("이 목록의 머리")이고, 그 사이에 선을 그으면
       필터가 목록에 걸리는 조건이 아니라 별개 블록으로 읽힌다. */
    border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-strong);
  }

  /* 필터가 강한 선을 가지므로 header는 선을 내려놓는다 */
  .content-list-container:has(.content-list__filter) .content-list__header {
    border-bottom: 0;
  }

  .content-list__filter::-webkit-scrollbar { display: none; }

  /* 칩은 줄지 않는다 — flex 컨테이너에서 기본 shrink가 걸리면 글자가 잘린다 */
  .content-list__filter > .tag { flex-shrink: 0; }
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
    /* 메타 슬롯이 4·5개인 목록의 기본 트랙. 슬롯 수를 :has로 세어 정한다 —
       열이 하나 늘 때마다 호스트가 변수를 적어야 하면, 안 적었을 때 라벨과 값이
       다른 열에 서는 조용한 오류가 난다. 세어서 기본값을 주면 그 경우가 없어진다.
       :where()로 감싸 **명시도를 0으로** 둔다 — .my-board { --content-list-meta-cols: … }
       한 줄로 덮을 수 있어야 하기 때문이다(감싸지 않으면 (0,3,0)이라 호스트가 진다).
       5칸 규칙이 4칸 뒤에 온다 — 5칸 목록은 둘 다 매칭되고 순서로 갈린다.

       세는 대상은 메타가 아니라 **열 이름(__columns)의 span**이다. empty·loading에는
       행이 없어 __meta가 아예 없고, 메타를 세면 그때만 트랙이 3칸으로 돌아가 마지막 라벨이
       다음 줄로 밀린다(실측: 작성일이 1144px → 952px로 줄바꿈). 열 이름은 두 상태에 모두 있고
       개수가 메타와 같아야 하는 값이라, 세기의 기준으로 삼기에 맞다. */
    /* 값은 **순서가 고정**돼 있으므로(답변 → 분류 → 작성자 → 작성일 → 조회수)
       자리마다 다른 최소값을 준다. 각 칸의 최소값은 라벨 폭과 값 폭 **양쪽**을 넘어야
       empty와 본목록의 열 위치가 같아진다 — 실측 기준(padding 포함): 답변 53 · 분류 61 ·
       작성자 61 · 작성일 97 · 조회 56px. 작성일이 가장 넓다(2026.08.31). */
    :where(.content-list-container:has(.content-list__columns > :nth-child(4))) {
      --content-list-meta-cols:
        minmax(5rem, auto) minmax(8rem, auto) minmax(6rem, auto) minmax(7rem, auto);
    }
    :where(.content-list-container:has(.content-list__columns > :nth-child(5))) {
      --content-list-meta-cols:
        minmax(5rem, auto) minmax(8rem, auto) minmax(6rem, auto) minmax(7rem, auto) minmax(5rem, auto);
    }

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
    /* 메타 슬롯을 **자리 순서**로 열에 얹는다 — 클래스가 아니라 nth-child다.
       클래스마다 열 번호를 박아두면 슬롯이 하나 늘 때마다(작성자·답변) 규칙을 다시 써야 하고,
       슬롯을 빼면 그 자리가 빈 채로 남는다. 순서로 얹으면 마크업 순서가 곧 열 순서가 된다.
       (자동 배치에 맡길 수는 없다 — 거터의 신규·고정이 없는 행에서는 1번 열이 비어 있어
        분류가 거기로 들어간다.) 최대 5칸까지 지원한다 — 그 이상은 게시판이 아니라 표다. */
    .content-list-container:has(.content-list__columns) .content-list__meta > :nth-child(1) { grid-column: 4; }
    .content-list-container:has(.content-list__columns) .content-list__meta > :nth-child(2) { grid-column: 5; }
    .content-list-container:has(.content-list__columns) .content-list__meta > :nth-child(3) { grid-column: 6; }
    .content-list-container:has(.content-list__columns) .content-list__meta > :nth-child(4) { grid-column: 7; }
    .content-list-container:has(.content-list__columns) .content-list__meta > :nth-child(5) { grid-column: 8; }

    /* 열 사이 간격은 header 라벨과 값에 **같은 padding**으로 준다.
       margin이나 column-gap으로 주면 track 크기 계산에 들어가는 값이 달라져
       라벨과 값이 어긋난다. padding은 track 안쪽이라 양쪽에 같이 주면 그대로 맞는다.
       규칙을 열 번호가 아니라 자리(first/last)로 쓴다 — 열이 몇 개든 같은 규칙이 걸린다. */
    .content-list-container:has(.content-list__columns) .content-list__meta > *,
    .content-list-container:has(.content-list__columns) .content-list__columns > * {
      padding-inline-start: var(--space-gap-lg);
    }

    /* 제목과 첫 메타 열 사이만 한 단계 넓다 — 제목 덩어리와 메타 덩어리를 가른다 */
    .content-list-container:has(.content-list__columns) .content-list__meta > :first-child,
    .content-list-container:has(.content-list__columns) .content-list__columns > :first-child {
      padding-inline-start: var(--space-gap-3xl);
    }

    /* 마지막 열만 오른쪽 정렬 — 목록의 오른쪽 끝을 맞춘다.
       라벨과 값에 같은 규칙이 걸리므로 열이 몇 개든 어긋나지 않는다.
       숫자 열(조회수·답변 개수)을 맨 뒤에 두면 자릿수도 함께 맞는다. */
    .content-list-container:has(.content-list__columns) .content-list__meta > :last-child,
    .content-list-container:has(.content-list__columns) .content-list__columns > :last-child {
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
/* 같은 크기·같은 무게의 텍스트로 둔다. 칩·아이콘을 섞으면 메타가 제목과 시각적으로 경쟁한다.
   구분되어야 하는 것은 분류뿐이고, 그건 톤으로 처리한다.
   예외는 답변(__answers) 한 칸 — 값이 아니라 상태라 두 종류만 반복되고, 칩은 목록당 한 열까지다. */
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

/* 분류 — 메타 안에서 유일하게 톤을 올려 구분한다.
   브랜드 색을 쓰지 않는다: 목록 안에서 브랜드 색은 hover와 방문 가능한 것을 뜻하는데
   분류는 누를 수 없는 값이라 파란 글자가 링크로 읽힌다(md 이상에서는 제목 오른쪽,
   sm에서는 제목 바로 아래에 있어 더 그렇다). 같은 계열의 검정으로 두면
   "메타 중 하나만 진하다"는 위계는 남고 링크 오해만 사라진다. */
.content-list__cat {
  color: var(--color-text-body);
}

/* ── 작성자 (optional) ── */
/* 문의 게시판 전용 슬롯. 메타 기본 톤(subtle)을 그대로 쓴다 — 누가 썼는지는
   읽을지 판단하는 보조 정보이지, 훑는 축이 아니다.
   줄바꿈만 막는다: 이름이 두 줄로 접히면 그 행만 높이가 달라져 열이 흔들린다. */
.content-list__author {
  white-space: nowrap;
}

/* ── 답변 (optional) ── */
/* 문의 게시판의 존재 이유. 값은 개수가 아니라 **상태**다("완료"/"대기") —
   1:1 문의는 답변이 0 아니면 1이라 개수와 상태가 같은 말인데, 숫자로 적으면
   "0이 미답변"이라는 규칙을 사용자가 따로 읽어내야 한다.

   조회수와 달리 **단위 라벨(__unit)을 쓰지 않는다.** 조회수는 "1,011"만 남으면 무엇의 수인지
   사라지지만, 칩에 적힌 "대기"·"완료"는 그 자체로 뜻이 선다 — sm에서 "답변 대기"로 두면
   칩 앞에 라벨이 하나 더 붙어 좁은 메타 줄만 길어진다. 대신 칩 안에 .sr-only로 "답변 "을 넣어
   스크린리더에는 두 폭 모두에서 맥락이 남게 한다.

   **이 칸만 Badge를 쓴다.** 메타의 나머지는 값(분류·작성자·날짜·조회수)이라 행마다 다른
   문자열이 나열되고, 칩으로 만들면 목록 전체가 얼룩이 된다. 답변은 상태라 값이 두 종류뿐이고,
   두 종류가 반복되는 열은 얼룩이 아니라 패턴으로 읽힌다. 그래서 칩은 **목록당 한 열**까지다.
   대기는 badge--neutral(아직 아무 일도 일어나지 않았다), 완료는 badge--success(처리됐다).
   주의색은 쓰지 않는다 — 고정(제목)이 이미 쓰는 색이다. */
/* **슬롯과 칩은 다른 요소다.** 열 사이 간격은 padding으로 주는데(margin은 트랙 크기 계산을
   흔든다 — 열 이름 절 참조), 뱃지에 직접 걸면 그 padding이 칩의 **배경 안쪽**으로 들어가
   글자가 오른쪽으로 밀린 이상한 칩이 된다(실측: 칩 폭 60px 중 24px이 빈 여백).
   그래서 슬롯 span이 열과 padding을 맡고, 그 안의 .badge가 칩 모양을 맡는다. */
.content-list__answers {
  white-space: nowrap;
}

/* ── 댓글 수 (optional) ── */
/* 제목 뒤에 붙는다 — 메타 열이 아니다. 열로 두면 대부분의 행이 0이라 빈 열이 하나 늘고,
   0을 찍으면 "댓글이 없다"는 사실을 매 행에 반복하게 된다. 0이면 마크업에서 뺀다.
   답변(공식 답변 여부)과 다른 값이다 — 댓글은 오간 이야기의 양이고, 답변은 처리 상태다.
   대괄호는 CSS가 넣는다. 링크 밖이라 스크린리더에는 숫자만 남으므로 .sr-only로 "댓글 "을 붙인다.

   **색은 주의색(caution, orange-600)이다.** 메타 톤(subtle)으로 두면 제목 옆에서 묻힌다.
   네 후보를 고정·신규가 함께 있는 목록에 나란히 렌더해 골랐다:

   | 후보 | 대비 | |
   |---|---|---|
   | **orange-600 (`text-caution`)** | **3.92:1** | **채택.** 가장 밝고 선명한 주황 |
   | orange-700 (`text-caution-muted`) | 5.35:1 | 갈색기가 돈다 |
   | red-600 (`text-error`) | 5.93:1 | 신규 아이콘과 같은 색이라 "빨강=신규"가 흐려진다 |
   | blue-600 (`text-brand`) | 6.36:1 | 대비는 가장 좋지만 주황 계열이 아니다 |

   목록에서 색을 쓰는 자리는 고정(제목·핀) · 신규(아이콘) · 댓글 수 셋뿐이고, 셋 다
   "이 행을 먼저 봐라"는 **주목** 신호다. 나머지(분류·작성자·날짜·조회수)는 회색조의 값이다.

   ⚠️ **고정 제목과 같은 색이다.** 갈리는 것은 형태다 — 고정은 제목 자체의 색(semibold 17px)이고
   댓글 수는 제목 뒤의 대괄호 숫자(13px)라, 한 행에 둘 다 있어도 어느 쪽이 무엇인지 자리로 구분된다.
   ⚠️ **대비 3.92:1로 WCAG AA 본문 기준(4.5:1)에 미달한다** — 고정 제목과 같은 사정이다.
   댓글 수는 대괄호로 감싼 부가 수치이고 그 글의 목적지는 제목이므로 정보가 색에만 실리지는 않지만,
   기준을 맞춰야 하면 `--color-text-caution-muted`(orange-700, 5.35:1)로 바꾼다 — 토큰 한 줄이다. */
.content-list__comments {
  flex-shrink: 0;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-ui);
  color: var(--color-text-caution);
  font-variant-numeric: tabular-nums;
}

.content-list__comments::before { content: '['; }
.content-list__comments::after  { content: ']'; }

/* 답변 슬롯이 있으면 분류는 축을 내놓는다.
   한 행에 진한 값이 둘이면 훑는 축이 둘이 되어 어느 쪽도 걸리지 않는다 —
   자료실의 축은 분류, 문의 게시판의 축은 답변 여부다. 목록마다 하나씩이다.
   마크업이 아니라 CSS가 판정하므로, 답변 슬롯을 넣는 것만으로 위계가 맞춰진다. */
.content-list-container:has(.content-list__answers) .content-list__cat {
  color: var(--color-text-subtle);
}

/* ── Read (optional) ── */
/* 이미 읽은 항목. 굵기가 주 신호, 색이 보조다 —
   색만 한 단계 내리면 눈에 띄지 않고, 눈에 띌 만큼 내리면 제목이 메타 수준으로 주저앉는다.
   hover는 배경만 바꾸므로 읽은 항목의 색·굵기는 hover 중에도 유지된다. */
.content-list__item--read .content-list__link {
  font-weight: var(--font-weight-body);
  /* --color-text-subtle까지 내린다(메타와 같은 값). 한 단계 위인 label(gray-700)은
     안 읽음(gray-950)과의 대비가 2.12:1뿐이라 나란히 놓고 봐야 겨우 보인다.
     subtle이면 4.09:1로 벌어져 훑는 중에도 걸린다.
     읽은 제목이 메타와 같은 값이 되는 것은 의도다 — 이미 읽은 항목은 더 이상 목적지가
     아니므로 "제목 → 번호 → 메타" 위계에서 내려온다. 크기(15/17px)와 줄 위치가 달라
     메타와 뒤섞이지는 않는다.
     흰 배경 4.51:1로 WCAG AA 본문 기준은 그대로 넘는다 — 더 내리면(gray-400 3.08:1) 미달이다. */
  color: var(--color-text-subtle);
}

/* 분류도 함께 내린다. 분류는 메타 중 유일하게 본문 검정인데, 읽은 항목에서 제목만
   내려가면 그 행에서 가장 진한 글자가 제목이 아니라 분류가 되어 위계가 뒤집힌다.
   읽은 항목은 행 전체가 한 단계 물러나야 한다.
   댓글 수도 같은 이유로 내린다 — 회색 제목 옆에 파란 숫자만 남으면 그 행에서
   가장 눈에 띄는 것이 제목이 아니게 된다. */
.content-list__item--read .content-list__cat,
.content-list__item--read .content-list__comments {
  color: var(--color-text-subtle);
}

/* ── 고정 항목의 제목 색 (Pinned) ──
   **Read 규칙 뒤에 온다.** 둘 다 명시도 (0,2,0)이라 순서로 갈리는데,
   고정은 읽었든 안 읽었든 주의색이어야 한다 — 고정은 운영자가 정한 성질이고
   읽음은 사용자마다 다른 상태라, 읽었다고 고정이 아니게 되지는 않는다.
   읽음 여부는 **굵기**가 계속 말한다(읽음 규칙의 font-weight는 색과 달리
   여기서 덮이지 않는다) — 읽음 절에 적힌 대로 읽음은 굵기가 주 신호다.

   hover는 배경만 바꾸므로 이 색은 hover 중에도 유지된다 — 고정 행에 올렸을 때
   표시가 사라지지 않는다(hover를 브랜드 틴트로 두면 실제로 그렇게 된다).

   ⚠️ 대비: orange-600은 흰 배경에서 3.92:1로 WCAG AA 본문 기준(4.5:1)에 미달한다.
   제목은 15/17px semibold라 large text 예외(18.66px bold 이상)에도 해당하지 않는다.
   고정이라는 사실 자체는 핀 아이콘이 함께 전달하므로 색 단독 전달(1.4.1)은 아니지만,
   글자 자체의 읽기 쉬움(1.4.3)은 기준 아래다. 기준을 맞춰야 하면 한 단계 어두운
   --color-text-caution-muted(orange-700, 5.35:1)로 바꾼다 — 토큰 한 줄이다. */
.content-list__item--pinned .content-list__link {
  color: var(--color-text-caution);
}

/* ── Hover ── */
/* 정보 테이블은 hover가 없다(클릭 대상이 아님). 목록은 행 전체가 링크라 hover가 필수다.

   **중립면이다.** 데이터 테이블 행 hover는 브랜드 틴트인데, 이 목록은 그것을
   따르지 않는다 — 여기서는 제목 색이 이미 두 가지 사실(고정·읽음)을 나르고 있어서
   hover까지 색을 쓰면 서로를 덮는다. 실제로 브랜드 틴트를 쓰면 고정 행에 올린
   순간 주황 제목이 파랑이 되어, **보고 있는 동안 고정 표시가 사라진다.**

   그래서 이 컴포넌트의 규칙은 이렇다: **색은 콘텐츠의 상태를 뜻하고,
   인터랙션은 중립면으로 표시한다.**

   농도는 4%(--color-action-neutral-faint)다. 버튼·아이콘의 중립 hover는 8~10%지만
   그건 면적이 작아서 그렇다 — 행처럼 폭 전체를 덮는 면은 같은 농도로 깔면
   눌린 것(selected)처럼 보인다. 면적이 커질수록 같은 신호에 필요한 농도는 낮아진다.

   제목 색은 hover에서 **건드리지 않는다.** 배경이 바뀌는 것만으로 "이 행은
   누를 수 있다"는 충분히 전달되고(행 전체가 링크라 커서도 함께 바뀐다),
   그 대가로 고정·읽음 표시가 hover 중에도 유지된다. */
.content-list__item:hover {
  background: var(--color-action-neutral-faint);
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

  /* 분류를 **특정 분류로 좁혔을 때만** 숨긴다.
     그때는 모든 행이 같은 분류라 행마다 적는 것이 중복이고, 좁은 메타 줄을 접히게 만든다.
     "전체"를 고른 동안에는 행마다 분류가 달라 그 값이 실제 정보이므로 그대로 둔다.

     선택 판정은 **첫 칩이 "전체"**라는 규칙에 기댄다(사용 지침의 마크업 순서 고정).
     첫 칩이 선택돼 있지 않다 = 특정 분류로 좁혀져 있다. */
  .content-list-container:not(:has(.content-list__filter > .tag:first-child.tag--selected)) .content-list__cat {
    display: none;
  }

  /* 숨긴 분류 **바로 뒤**의 가운뎃점도 지운다.
     구분자는 `> :not(:first-child)::before`로 붙는데, display:none이어도 DOM에는 남아
     날짜가 여전히 first-child가 아니다 — 그대로 두면 메타 줄이 "· 2024.03.20"로 시작한다.
     CSS로 "보이는 것 중 첫 번째"를 고를 수 없으므로 인접 선택자로 짚는다.
     `.content-list__meta >`를 붙여야 한다 — 기본 규칙의 `:not(:first-child)`가
     명시도를 (0,2,0)까지 올려두어, `.content-list__cat + *`(0,1,0)만으로는 이기지 못한다.
     분류를 숨기는 조건과 **같은 조건**에 걸어야 한다 — 분류가 보이는데 구분자만 없으면
     "4대보험 2024.03.20"처럼 붙어 읽힌다.

     **분류가 첫 칸일 때만이다**(`:first-child`). 문의 게시판은 답변이 첫 칸이라 분류가 가운데 있고,
     가운데 칸이 숨으면 그 칸의 구분자도 함께 숨으므로 뒤 칸의 구분자는 그대로 있어야 한다 —
     지우면 "답변 대기 김지현"처럼 붙어 읽힌다. 지울 대상은 "숨어서 첫 칸이 된 뒤 칸"뿐이다. */
  .content-list-container:not(:has(.content-list__filter > .tag:first-child.tag--selected)) .content-list__meta > .content-list__cat:first-child + *::before {
    content: none;
    margin-inline-end: 0;
  }

  /* 번호도 숨긴다. 좁은 화면에서 거터를 상시 차지할 만큼 자주 쓰이는 정보가 아니다.
     ⚠️ 번호는 상담 중 "165번 글 보세요"로 지목하는 식별자다(사용 지침 참조).
        안내를 받는 쪽이 모바일이면 그 지목이 성립하지 않는다 —
        상세 화면에서 번호를 보여주거나 링크로 안내하는 경로가 함께 있어야 한다. */
  .content-list__no { display: none; }

  /* 2줄 말줄임을 제목이 아니라 **제목 줄 전체**(headline)에 건다.
     제목만 -webkit-box로 두면 그 상자가 블록이라, 뒤에 붙는 댓글 수가 flex 형제로서
     2줄 상자의 **첫 줄 옆**에 서고 제목 둘째 줄이 그 아래로 흐른다 —
     실측하면 "…저장 버튼이 눌  [5] / 리지 않습니다"처럼 제목이 잘린 것처럼 보인다.
     클램프를 헤드라인으로 올리고 제목·댓글 수를 인라인으로 흘리면, 댓글 수가
     제목의 **마지막 글자 뒤**에 붙고 두 줄을 넘기면 말줄임과 함께 사라진다.
     ::after 오버레이는 li가 컨테이닝 블록이라 이 overflow:hidden에 잘리지 않는다. */
  .content-list__headline {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .content-list__headline .content-list__link {
    display: inline;
    overflow: visible;
  }

  /* headline이 flex가 아니게 되어 gap이 사라지므로 간격을 margin으로 넘겨받는다 */
  .content-list__comments { margin-inline-start: var(--space-gap-sm); }

  /* 번호가 사라지면 신규 아이콘이 거터에 혼자 남는다.
     번호에 바짝 붙이려던 2px 여백은 붙을 대상이 없어졌으므로 0으로 되돌린다.
     이 규칙들은 반드시 __no·__new 기본 규칙 **뒤**에 와야 한다 — 명시도가 같아 순서로 이긴다. */
  /* 번호가 없으니 번호에 붙일 여백도 없다. */
  .content-list__new,
  .content-list__pin { margin-inline-end: 0; }
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
  단 `sm`에서는 `display: none`이라 접근성 트리에서도 사라진다. 스크린리더 사용자도 목록에서 번호를 얻을 수 없으므로, 번호로 안내하는 경로가 있다면 상세 화면에서 번호를 노출해야 한다.
- 메타는 아이콘 없이 텍스트로 적는다(`조회 1,011`). 아이콘+숫자 조합이 아니므로 `.sr-only` 보조 텍스트가 필요 없다.
- 가운뎃점 구분자는 CSS `::before`로 넣는다. 생성 콘텐츠라 스크린리더가 읽지 않아 "점"이 낭독에 끼어들지 않는다.
- 신규 표시(`__new`)는 아이콘이라 글자가 없다. `aria-label="신규"`를 부여한다(`aria-hidden` 금지) — 장식이 아니라 정보다.
- 고정 항목은 핀 아이콘(`aria-label="고정"`)으로 표시되므로 색에 기대지 않는다 — 배경과 경계선은 훑을 때 걸리게 하는 보조 신호다. 고정 항목을 맨 위에 모아 두는 것 자체가 순서로 주는 신호이기도 하다.
- 읽음 상태는 굵기와 색을 함께 바꾼다. 색만으로 구분하지 않으므로 색각 이상에서도 굵기로 읽힌다.
- 읽음은 보조 정보라 기본적으로 스크린리더에 따로 알리지 않는다. 읽음/안 읽음이 판단에 꼭 필요한 목록이면 링크 안에 `<span class="sr-only">읽음</span>`을 넣는다.
- 텍스트 3층 모두 흰 배경에서 WCAG AA 본문 기준(4.5:1)을 넘는다 — 제목 18.43:1 · 번호 8.68:1 · 메타 4.51:1. 분류는 제목과 같은 18.43:1이다. 읽은 제목도 메타와 같은 4.51:1로 기준을 넘는다. `--color-text-disabled`(3.08:1)는 이 컴포넌트에 쓰지 않는다.
- 분류는 톤으로만 구분한다. 값 자체가 텍스트(`4대보험`)로 적혀 있으므로 명도 차를 못 봐도 정보가 전달된다.
- 답변 Badge는 **글자가 곧 값**(`완료`/`대기`)이다. 칩의 색은 훑기 위한 보조 신호이고, 색각 이상·흑백 출력에서는 단어가 그대로 남는다. 열 이름이 없는 `sm`에서는 화면에 라벨이 붙지 않으므로, 칩 안의 `<span class="sr-only">답변 </span>`이 두 폭 모두에서 "답변 대기"로 읽히게 한다.
- ⚠️ 댓글 수(caution)는 흰 배경 대비 **3.92:1로 AA 본문 기준에 미달한다** — 고정 제목과 같은 사정이다. 대괄호로 감싼 부가 수치이고 그 글의 목적지는 제목이라 정보가 색에만 실리지는 않지만, 기준을 맞춰야 하면 `--color-text-caution-muted`(5.35:1)로 바꾼다. 읽은 항목에서는 4.51:1(subtle)로 내려간다. 대괄호는 CSS `::before`/`::after`라 낭독되지 않는다. 링크 밖이라 숫자만 남으므로 `<span class="sr-only">댓글 </span>`을 안에 두어 "댓글 3"으로 읽히게 한다.
- 작성자는 흰 배경 대비 4.51:1(subtle)이다. Badge의 대비는 `badge.md`가 보증한다.
- 제목 2줄 말줄임은 CSS `-webkit-line-clamp`이므로 텍스트가 DOM에 그대로 남는다. 스크린리더는 전체 제목을 읽는다.

---

## Do / Don't

> ✅ DO — 번호는 거터에, 본문은 __body로 묶고, 링크는 제목만 감싼다
> `<li class="content-list__item"><span class="content-list__no">165</span><div class="content-list__body"><a class="content-list__link" href="…">제목</a><div class="content-list__meta">…</div></div></li>`

> ❌ DON'T — 번호를 메타에 넣기 (앞 항목 길이에 따라 위치가 흔들려 훑기 불가)
> `<div class="content-list__meta"><span class="content-list__no">#165</span><span class="content-list__cat">4대보험</span></div>`

> ✅ DO — 메타의 **값**은 같은 크기·무게의 텍스트. 분류만 톤으로 구분 (칩은 상태 한 열까지)
> `<span class="content-list__cat">4대보험</span><span class="content-list__date">2024.03.20</span><span class="content-list__views"><span class="content-list__unit">조회 </span>1,011</span>`

> ✅ DO — 읽음은 굵기와 색을 함께 내린다
> `.content-list__item--read .content-list__link { font-weight: var(--font-weight-body); color: var(--color-text-label); }`

> ❌ DON'T — 색만 내리기 (한 단계로는 안 보이고, 보일 만큼 내리면 메타 수준으로 주저앉는다)
> `.content-list__item--read .content-list__link { color: var(--color-text-label); }`

> ❌ DON'T — `--read` 클래스와 `:visited`를 같은 목록에서 함께 쓰기 (기준이 둘이 되어 규칙을 읽을 수 없다)

> ✅ DO — 거터 열에는 **폭이 고정된 것**만 (신규 아이콘·번호). 열 폭이 목록 내용에 흔들리지 않는다
> `<li class="content-list__item"><span class="content-list__new">…</span><span class="content-list__no">165</span><div class="content-list__body">…</div></li>`

> ✅ DO — hover는 중립면으로 (색은 콘텐츠 상태의 몫이라, 인터랙션까지 색을 쓰면 서로를 덮는다)
> `.content-list__item:hover { background: var(--color-action-neutral-faint); }`

> ❌ DON'T — hover에서 제목 색 바꾸기 (고정 행에 올린 순간 주황 제목이 파랑이 되어 보고 있는 동안 고정 표시가 사라진다)
> `.content-list__item:hover .content-list__link { color: var(--color-text-brand); }`

> ✅ DO — 고정은 핀 아이콘 + 주의색 제목으로 (행마다 붙는 표시라 블록 경계선이 따로 필요 없다)
> `<li class="content-list__item content-list__item--pinned">`

> ❌ DON'T — 한 행에 핀과 신규를 함께 세우기 (거터 칸이 둘로 늘어 표시가 하나뿐인 행의 제목이 밀린다)
> `<span class="content-list__pin">…</span><span class="content-list__new">…</span>`

> ❌ DON'T — 고정을 뱃지 라벨로 만들기 (라벨 슬롯을 열면 서식·인기·NEW가 따라 붙는다)

> ❌ DON'T — 고정 규칙을 읽음 규칙보다 **앞에** 두기 (명시도가 같아 순서로 갈린다 — 앞에 두면 읽은 고정 글의 제목이 회색으로 돌아간다)
> `/* Pinned 블록에서 .content-list__item--pinned .content-list__link 를 선언 */`

> ❌ DON'T — 고정 블록의 끝을 일반 행 구분선으로 두기 (어디까지가 고정인지 경계가 흐려진다)
> `.content-list__item--pinned + .content-list__item { border-top-color: var(--color-border-faint); }`

> ❌ DON'T — 고정 항목을 목록 중간에 섞기 (배경이 순서를 깬 이유를 설명하지 못하고 얼룩으로 보인다)


> ❌ DON'T — 신규 표시를 Badge로 만들거나 제목 뒤로 옮기기 (자동/수동 구분이 형태에서도 자리에서도 사라짐)
> `<div class="content-list__headline"><a class="content-list__link">제목</a><span class="badge badge--info">NEW</span></div>`



> ✅ DO — sm의 분류 필터는 Tag로 (누를 수 있어야 한다)
> `<div class="content-list__filter"><button type="button" class="tag tag--pill tag--md tag--selected">전체</button>…</div>`

> ❌ DON'T — 분류 필터를 Badge로 만들기 (Badge는 비인터랙티브 상태 표시 전용 — 누를 수 있어 보이지 않는다)
> `<span class="badge badge--brand">4대보험</span>`

> ❌ DON'T — `sm`에서 필터 행 없이 쓰기 (번호가 숨겨지고 분류도 조건부로 숨겨져 다룰 방법이 없어진다)

> ❌ DON'T — "전체" 칩을 첫 번째가 아닌 자리에 두기 (행의 분류 표시 여부가 첫 칩의 선택 여부로 판정된다)

> ❌ DON'T — 필터 칩을 줄바꿈시키기 (분류가 많으면 필터가 목록보다 커진다 — 가로 스크롤로 둔다)
> `.content-list__filter { flex-wrap: wrap; }`

> ✅ DO — header가 있으면 열 이름 슬롯을 둔다 (기본. subgrid가 라벨과 값의 열을 맞춘다)
> `<div class="content-list__header"><div class="content-list__heading">자료 목록</div><div class="content-list__columns"><span>분류</span><span>작성일</span><span>조회</span></div></div>`

> ❌ DON'T — 열 이름만 두고 값의 단위(`__unit`)를 마크업에서 빼기 (sm으로 내려가면 "1,011"이 무엇의 수인지 사라진다)

> ❌ DON'T — 열 폭을 px로 박기 (목록에 실제로 들어온 값에 맞춰 subgrid가 잡는다 — 긴 분류명이 잘리지 않는다)
> `.content-list__meta { grid-template-columns: 120px 84px 64px; }`

> ✅ DO — 답변은 슬롯 안의 Badge로. 라벨은 화면에 두지 않고 sr-only로만 (칩의 글자가 그 자체로 뜻이 선다)
> `<span class="content-list__answers"><span class="badge badge--neutral"><span class="sr-only">답변 </span>대기</span></span>`

> ❌ DON'T — 답변을 두 번 적기 (제목 뒤 [답변] 라벨 + 답변 열). 열이 있으면 표기는 하나다
> `<a class="content-list__link">비밀글 입니다. [답변]</a> … <span class="content-list__answers">…</span>`

> ❌ DON'T — 슬롯 자체를 뱃지로 만들기 (열 padding이 칩 배경 안으로 들어가 글자가 오른쪽으로 밀린다)
> `<span class="content-list__answers badge badge--neutral">대기</span>`

> ❌ DON'T — 답변 칩에 주의색 쓰기 (고정이 쓰는 색이라 한 목록에서 같은 색이 두 가지를 뜻하게 된다)
> `<span class="badge badge--caution">대기</span>`

> ✅ DO — 댓글 수는 제목 뒤에, 0이면 빼고, sr-only로 뜻을 붙인다
> `<a class="content-list__link" href="…">제목</a><span class="content-list__comments"><span class="sr-only">댓글 </span>3</span>`

> ❌ DON'T — 댓글 수를 오류색·브랜드색으로 (빨강은 신규 아이콘이 쓰고 있고, 파랑은 링크 계열이다. 주목 신호는 주황 계열로 묶는다)
> `.content-list__comments { color: var(--color-text-error); }`

> ❌ DON'T — 댓글 수를 0까지 찍기 (대부분의 행이 0이라 "댓글이 없다"를 매 행에 반복하게 된다)
> `<span class="content-list__comments">0</span>`

> ❌ DON'T — 댓글 수를 메타 열로 만들기 (빈 열이 하나 늘고, 제목에 딸린 수치가 열로 떨어져 나간다)

> ❌ DON'T — 문의 게시판에 조회수까지 넣기 (대부분 비밀글이라 판단 근거가 못 되고, 훑을 열만 하나 늘어난다)

> ✅ DO — 답변은 메타의 **첫 칸**에 (제목 바로 옆. 상태는 그 글에 붙는 성질이다)
> `<div class="content-list__meta"><span class="content-list__answers …">…</span><span class="content-list__cat">…</span>…</div>`

> ❌ DON'T — 메타 슬롯을 늘리고 열 이름 span은 그대로 두기 (열 개수를 세는 기준이 열 이름이라, 트랙까지 어긋난다)
> `<div class="content-list__columns"><span>분류</span><span>작성일</span><span>조회</span></div>` + 메타 4칸

> ❌ DON'T — **값**에 칩·아이콘 쓰기 (행마다 다른 문자열이라 목록이 얼룩이 된다. 칩은 상태 한 열까지)
> `<span class="badge badge--neutral">4대보험</span><svg><use href="…#icon-show"/></svg>1,011`

> ❌ DON'T — 마크업에 구분자 직접 삽입 (CSS ::before가 넣는다)
> `<span>#165</span> · <span>4대보험</span>`

> ❌ DON'T — 번호와 총 건수를 함께 표시 (내림차순 게시판에서 중복)
> `<span class="content-list__count">총 165건</span>` + `<span class="content-list__no">165</span>`
