---
file:       components/_requests.md
version:    0.7.0
status:     draft
updated:    2026-09-02
depends-on: components/_index.md, adaptation.md, product.md
---

# 컴포넌트 추가 요청

시스템에 없어서 프로토타입 작업을 막는 컴포넌트를 여기에 접수한다.
디자이너가 착수하면 `components/[layer]/[name].md`를 만들고, 이 문서의 해당 항목에 문서 경로를 적어 닫는다.

> 🧭 Planner — 매칭할 컴포넌트가 없을 때 임의 클래스를 만들지 말고 이 문서에 요청을 남긴다.
> 🎨 Designer — 착수 순서는 각 요청의 **우선순위**를 따른다.

---

## REQ-001 — 콘텐츠(읽을거리) 계열

| | |
|---|---|
| **접수** | 2026-08-31 |
| **발단** | 지식센터 > 통합자료실 게시판(목록·상세) 프로토타입 |
| **상태** | 미착수 |

### 배경

지식센터 게시판을 시스템으로 옮기면서 목록을 **데이터 테이블**로 만들었다.
시스템에 콘텐츠용 컴포넌트가 없어 가장 가까운 것을 골랐기 때문인데, 결과적으로
업무 조회 화면(현장 목록·정산 내역 등)과 시각적으로 구분되지 않는 문제가 생겼다.

원인은 컴포넌트 선택 실수가 아니라 **범위**다. 이 시스템은 업무 화면 전용으로 설계됐다
(`product.md` — 정보 밀도 우선·장식 최소화·Table/Form/Filter 최우선). 읽을거리를 다루는
계열이 통째로 없다. `components/_index.md`의 로드맵에 이름만 올라 있고 미구현인 항목이
그 증거다 — **Card**(Organism), **SearchBar**(Molecule), **Pattern 계층 전체**(ListPage · DetailPage 등).

### 문제 정의 — 두 목록은 사용자의 행동이 다르다

| | 데이터 테이블 (현재 시스템) | 콘텐츠 목록 (없음) |
|---|---|---|
| 사용자 행동 | 여러 행을 **비교**하고 처리한다 | 한 건을 **골라 읽는다** |
| 정보 위계 | 모든 셀이 동급. 격자로 스캔 | 제목이 유일한 목적지, 나머지는 판단 보조 |
| 딸려오는 기능 | 정렬 · 선택 · 엑셀 다운로드 · 컬럼 설정 | 검색 · 분류 · 페이지 이동 |
| 좁은 화면 | 가로 스크롤. **컬럼 reflow 금지**(비교 가능성 유지 — `adaptation.md`) | 세로 스택 reflow가 **정답**. 비교 대상이 아니므로 안전 |

마지막 행이 핵심이다. 게시판을 테이블로 만드는 한 태블릿·모바일에서 가로 스크롤을
피할 방법이 없다. 반대로 콘텐츠 목록은 항목이 문단 단위라 좁은 화면에서 자연스럽게 접힌다.
**반응형 문제와 혼동 문제는 같은 원인에서 나오며, 같은 해법으로 함께 풀린다.**

### 요청 컴포넌트

접두어를 `content-`로 통일한다. 클래스명만 보고도 업무 계열이 아님이 드러나게 해,
같은 혼동이 다시 생기지 않도록 하는 장치다.

#### 우선순위 1 — 이게 없으면 화면이 안 나온다

| 컴포넌트 | 계층 | 역할 | 비고 |
|---|---|---|---|
| **Card** | Organism | 콘텐츠 계열 공통 그릇. header · media · body · footer 슬롯 | `_index.md`에 이름만 있고 미구현. `.text-card-title`은 이미 정의돼 있음 |
| ~~**ContentList**~~ | Organism | 게시판 목록 본체. 테이블을 대체한다 | ✅ **완료** — `organisms/content-list.md` v0.1.0 |
| ~~**ContentHeader**~~ | Organism | 상세 화면 제목부 — 제목 · 분류 Tag · 메타(작성자·작성일·조회수) | ❌ **만들지 않는다** — 아래 참조 |
| ~~**ContentBody**~~ | Organism | 본문. CMS가 생성한 자유 HTML에 시스템 타이포를 입히는 스코프 컨테이너 | ❌ **만들지 않는다** — 아래 참조 |
| ~~**AttachmentList**~~ | Molecule | 첨부파일 목록(읽기 전용 다운로드) | ❌ **만들지 않는다** — 아래 참조 |

**ContentList 상세** — 구현 완료. 최종 스펙은 `organisms/content-list.md` 참조.

정보 테이블의 **행** 시각 톤(가로 구분선만, 줄바꿈 허용, 동일 행 높이)을 채택하고,
프레임은 `md` 이상에서 상자로 두기로 했다 — 테두리가 아니라 면 + radius + 가장 얕은 elevation이다.
컬럼 헤더와 "hover 없음"은 채택하지 않기로 결정했다 — 게시판은 행 전체가 링크이고, 컬럼이 남으면 `sm`에서 접히지 않기 때문이다.
아래는 접수 당시 원안이다.

```
.content-list
└ .content-list__item          ← <a> 전체가 링크. 행 단위 hover
  ├ .content-list__thumb       ← optional. 썸네일
  ├ .content-list__title       ← 제목. 시각 위계 최상위
  └ .content-list__meta        ← 분류 Tag · 작성자 · 작성일 · 조회수
```

- Variant: `layout`(row 기본 · grid) × `thumb`(없음 기본 · 있음) × `excerpt`(없음 기본 · 있음)
- 반응형: `lg`·`md` 한 줄 배치(제목 좌 / 메타 우) → `sm` 세로 스택. 컬럼 헤더가 없으므로 접어도 의미가 유지된다.
- 필수 상태 4종(default · empty · loading · error)은 `product.md` 규칙을 따른다. loading은 Skeleton.
- 상단 고정(공지) · 신규 표시(`icon-new`) variant 필요 여부는 착수 시 확정.

**ContentBody — 만들지 않기로 결정 (2026-09-02)**

한 번 만들었다가(v0.1.0) 지웠다. 되풀이하지 않도록 근거를 남긴다.

- **본문은 에디터의 것이다.** 상세 화면에서 시스템이 책임질 부분은 본문 **주위**(제목부·첨부·하단 네비)이고, 본문 안쪽은 에디터가 만들고 에디터가 스타일링한다. 시스템이 태그 선택자로 그 안에 손을 대면 에디터 스타일과 겨루게 된다.
- **본문 밖은 기존 컴포넌트로 충분하다.** 페이지 제목·breadcrumb은 `.text-page-title`+Breadcrumb, 글 제목·메타는 타이포 유틸 조립, 하단 목록 버튼은 Button이다. 새 Organism이 필요한 것이 아니라 **표기 규칙**(메타 순서·구분자)이 필요했고, 그건 ContentHeader의 몫이다.
- 만들었던 문서가 다룬 것 — 태그 선택자 스코프, 세로 리듬, 표 스크롤 래퍼 — 은 전부 **본문 안쪽** 이야기였다. 즉 컴포넌트의 경계를 잘못 그은 것이었다.
- ⚠️ 다시 필요해지는 조건: **조회 화면에 에디터 CSS가 따라오지 않는 경우**. 그때는 본문이 브라우저 기본 스타일로 남으므로 받을 곳이 필요하다. 판별법 — 상세 화면에서 본문 글자가 시스템 폰트(Pretendard)로 나오는지 본다.

**ContentHeader · AttachmentList — 만들지 않기로 결정 (2026-09-02)**

상세 화면을 실제로 조립해 보고 내린 결론이다. **새 CSS 한 줄 없이 기존 컴포넌트만으로 화면이 나온다.**

두 요청은 사실 하나였다. 작성자·작성일·조회수는 **이름-값 쌍**이고, 첨부파일도 "첨부파일: 파일 목록"이라는
같은 모양의 이름-값 쌍이다. 그리고 시스템에는 이름-값 쌍을 세로로 쌓는 컴포넌트가 이미 있다 — **정보 테이블**(`table--info`).
메타를 위한 Organism과 첨부를 위한 Molecule을 따로 만들면, 한 화면 안에서 같은 구조를 두 가지 방식으로 표기하게 된다.

```html
<h1 class="text-modal-title">2024년 건설보험료신고_노무제공자신고</h1>

<div class="table-container">
  <table class="table table--info table--dense" aria-label="글 정보">
    <tbody class="table__body">
      <tr class="table__row">
        <th class="table__head-cell table__row-header" scope="row">작성자</th>
        <td class="table__cell">관리자</td>
        <th class="table__head-cell table__row-header" scope="row">작성일</th>
        <td class="table__cell">2024.03.20</td>
        <th class="table__head-cell table__row-header" scope="row">조회</th>
        <td class="table__cell">1,011</td>
      </tr>
      <tr class="table__row">
        <th class="table__head-cell table__row-header" scope="row">첨부파일</th>
        <td class="table__cell" colspan="5">
          <ul>
            <li>
              <span class="icon icon--sm"><svg><use href="icons/sprite.svg#icon-pdf"/></svg></span>
              <a class="link" href="/download/…" download>2024년_건설보험료신고서.pdf</a>
              <span class="text-helper">2.4MB</span>
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!-- 본문: 에디터 영역 -->

<button type="button" class="btn btn--secondary">목록</button>
```

- **`table--info`가 메타와 첨부를 한 컴포넌트로 덮는다.** 행 헤더(`table__row-header`)가 이름, 셀이 값이다.
  첨부는 `colspan`으로 값 칸을 늘린 같은 구조의 행일 뿐이다. `sm`에서 정보 테이블이 세로로 접히는 동작도 그대로 따라온다 —
  390px에서 가로 스크롤 없이 렌더되는 것을 확인했다.
- **첨부 한 줄은 아이콘 + 링크 + 보조 텍스트다.** `.icon icon--sm` + `.link` + `.text-helper`.
  파일 종류 아이콘은 `icon-pdf`·`icon-excel`, 나머지는 `icon-download`를 쓴다.
- **FileUpload의 `file-card`는 재사용 대상이 아니다.** 그쪽은 썸네일 격자에 **삭제 버튼**이 달린 업로드 중 상태 표시이고,
  여기는 읽기 전용 다운로드다. 목적이 다르므로 겉모습을 맞추려 하지 않는다.
- ⚠️ 다시 필요해지는 조건: **첨부가 문서가 아니라 이미지 위주가 될 때**. 썸네일 격자가 필요해지면 정보 테이블의 한 칸으로는 부족하다.
  그때도 새 Molecule을 만들기 전에 ImagePreview부터 본다.

정리하면 REQ-001 우선순위 1에서 살아남은 신규 컴포넌트는 **Card 하나**다. 나머지는 구현했거나(ContentList),
기존 조합으로 충분하다고 판정됐다(ContentHeader · ContentBody · AttachmentList).

#### 우선순위 2 — 게시판 완성에 필요

| 컴포넌트 | 계층 | 역할 | 비고 |
|---|---|---|---|
| **PageHeader** | Organism | 페이지 제목 + Breadcrumb + 우측 액션 | 게시판 전용이 아님. 현재 프로토타입은 시스템에 없어 `kc-head` 같은 임시 클래스를 만들어 쓰고 있다 |
| **ContentNav** | Molecule | 상세 하단 이전 글 · 다음 글 · 목록 | |

#### 우선순위 3 — 재발 방지

| 컴포넌트 | 계층 | 역할 |
|---|---|---|
| **ListPage** | Pattern | 목록 페이지 골격. **업무형(Table 기반)** 과 **콘텐츠형(ContentList 기반)** 을 variant로 나누고, 어느 쪽을 쓸지 **선택 기준 표**를 문서에 포함한다 |
| **DetailPage** | Pattern | 상세 페이지 골격. 제목 → 정보 테이블(메타·첨부) → 본문(에디터) → ContentNav. 위 조립 패턴을 Pattern으로 고정하는 자리다 |

우선순위 3이 이번 혼선의 진짜 재발 방지책이다. 컴포넌트만 늘리면 다음 사람이 또 같은 자리에서 같은 선택을 한다.

### 확정된 정책 (2026-08-31)

착수 전제가 되는 두 정책이 결정됐다. 해당 문서에 이미 반영돼 있다.

| 결정 | 내용 | 반영 |
|---|---|---|
| **모바일 지원 범위** | 앱 웹뷰 전환에 따라 `sm`(<768px)을 **정식 지원 범위에 포함**한다 | `adaptation.md` v1.1.0 |
| **밀도 정책** | 읽기 화면도 **업무 화면과 동일한 밀도 정책**을 적용한다. 콘텐츠 계열 예외 절은 두지 않는다 | `product.md` v1.1.1 |
| **표 / 게시판 구분** | 컴포넌트와 반응형 동작을 갈라 정의한다 — 데이터 테이블은 `sm`에서도 가로 스크롤(컬럼 reflow 금지), 콘텐츠 목록은 세로 스택 reflow | `adaptation.md` v1.1.0 |

두 번째 결정의 함의: **컴포넌트는 갈리지만 밀도는 하나다.** ContentList·ContentBody를 만들 때
행간·여백을 넉넉하게 푸는 방향으로 가지 않는다. 게시판과 데이터 테이블을 가르는 건 여백이 아니라
**정보 위계와 접히는 방식**이다. 이 원칙이 흔들리면 두 계열이 다시 섞인다.

따라서 앞서 검토했던 `--layout-prose-max-width` 토큰과 `.text-prose` 유틸리티는 **추가하지 않는다.**

### 함께 필요한 것

- **아이콘** — 조회수는 `icon-show` 재사용 가능. 첨부파일은 `icon-pdf`·`icon-excel` 외 일반 파일이 `icon-download`로 충분해 `icon-file` 신규는 보류. 목록 고정 표시용 `icon-pin`은 추가 완료
- **`sm` 스펙** — `adaptation.md` 규칙에 따라 각 컴포넌트 문서의 `## 사용 지침`에 `sm` 동작을 반드시 명시한다. 없으면 미검증으로 간주된다
- ~~**`components/_index.md` 표기**~~ — **완료.** 계층표를 `✅ 구현됨` / `⬜ 계획` 두 열로 분리하고, 누락돼 있던 구현 컴포넌트 6개(Disclosure·Steps·Banner·ImagePreview·Breadcrumb·TableCell)를 추가했다. `planner.md`도 "✅ 열에서만 매칭한다"로 갱신 (_index.md v1.3.0 · planner.md v2.8.0)

### 완료 기준

- [ ] 통합자료실 목록·상세를 `lg`·`md`·`sm` 세 폭에서 가로 스크롤 없이 렌더할 수 있다
- [ ] 콘텐츠 목록이 업무 조회 화면과 한눈에 구분된다 — 여백이 아니라 정보 위계로
- [ ] 콘텐츠 계열이 업무 화면과 같은 밀도 정책 안에 있다
- [ ] Planner가 "게시판 만들어줘"에 임시 클래스 없이 대응할 수 있다
