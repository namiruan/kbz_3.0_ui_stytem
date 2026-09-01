# Changelog

## [Unreleased]

### Added
- ContentList: 메타 3열에 **최소 폭**을 두고(`minmax(최소, auto)`), `--content-list-meta-cols`로 재정의할 수 있게 했다. 기본 `8rem · 6rem · 5rem`. 폭이 순수 auto면 그 목록에 실제로 들어온 값이 폭을 정하는데, 행이 없는 상태(empty·loading)에는 정할 값이 없어 라벨 자신의 글자 폭으로 잡혀 본목록과 열 위치가 어긋났다(측정: 분류 열 923.4px → 1021px). 최소값을 두면 값이 그 안에 들어가는 한 두 상태가 같아지고(측정: 라벨 896 / 1024 / 1120px 완전 일치), 최소값을 넘는 긴 분류명은 여전히 잘리지 않고 열이 늘어난다(측정: 228.45px, 잘림 없음) — 고정 폭의 잘림과 auto의 흔들림 중 하나를 고를 필요가 없다. 기본값은 실측 콘텐츠 폭과 empty의 라벨 폭 **양쪽 다** 덮도록 정했다: 조회를 4rem(64px)로 뒀을 때 값(72.5px)과 라벨(66px)이 모두 최소값을 넘어 두 상태가 다시 갈렸고, 5rem으로 올려 해소했다. content-list.md v0.21.2 → v0.22.0 (MINOR)

### Fixed
- ContentList: 열 이름 라벨에 `white-space: nowrap` — `--content-list-meta-cols`로 좁은 폭을 주면 "조회"가 "조 / 회"로 갈라져 머리 줄 높이가 늘어났다(4rem에서 실제 발생).
- ContentList: 열 이름이 있는 목록의 **empty 상태가 번호 거터 칸에 찌그러지던 문제 수정.** 열 이름이 있으면 컨테이너가 grid가 되는데, `.empty-state`는 subgrid 자식이 아니라 auto 배치로 1번 열에만 들어갔다 — 폭이 1200px → **197.7px**. 직계 자식 전부에 `grid-column: 1 / -1`을 주고, 그중 header와 ul만 subgrid로 열을 물려받게 했다. `empty-state` 외에 `skeleton`(loading)·`banner`(error)를 컨테이너 안에 넣는 경우도 같은 규칙으로 덮인다. empty 프리뷰의 header에도 열 이름을 넣었다 — 결과가 돌아왔을 때 목록의 머리가 흔들리지 않아야 하므로 열 이름은 empty에서도 그대로 둔다. 상태 표에 이 규칙을 명시. content-list.md v0.21.0 → v0.21.1 (PATCH)

### Removed
- ContentList: 요약문(`__excerpt`) variant 제거. 열 이름이 기본이 된 이상 둘은 같은 목록에서 성립하지 않는다 — 요약문이 있으면 행이 세로로 길어져 열 정렬이 무너지므로, 남겨두면 "기본을 켜면 꺼지는 variant"가 되어 기본값이 두 개인 셈이 된다. 딸린 규칙도 함께 걷어냈다: `__excerpt` 스타일, `__excerpt + __meta` 간격 규칙, 데스크톱의 `:has(.content-list__excerpt)` 세로 유지 분기, 근접성 지침("덩어리 나누기") 절, 텍스트 색 위계표의 요약문 행, Do/Don't 4항목, 프리뷰 1블록. 열 이름 가드가 `:has(.content-list__columns):not(:has(.content-list__excerpt))`에서 `:has(.content-list__columns)`로 단순해졌다(21곳). `_requests.md`의 REQ-001 구조도에서도 제거. 색 위계는 제목 → 번호 → 메타 3층으로 유지되고 WCAG AA 기준(제목 18.43:1 · 번호 8.68:1 · 메타 4.51:1)도 그대로다. content-list.md v0.20.0 → v0.21.0 (0.x draft — 1.0 이후였다면 MAJOR)

### Added
- ContentList: 분류 필터 슬롯 `.content-list__filter` 추가 — 분류로 목록을 거르는 가로 스크롤 칩 행. **`sm` 전용**이고 `md` 이상에서는 숨는다. `__columns`(열 이름, md 이상 전용)와 정확히 반대로 동작해 둘이 동시에 보이지 않는다. `md` 이상에서는 분류가 열로 서서 눈으로 훑을 수 있지만 `sm`에서는 그 열이 사라진다 — 훑는 대신 **눌러서 거르는** 방식으로 바꾼다. Badge가 아니라 **Tag** 컴포넌트를 쓴다(`tag--pill tag--md`, 첫 칩 "전체"가 `tag--selected`) — 누를 수 있어야 하고 Badge는 비인터랙티브 상태 표시 전용이다. 줄바꿈하지 않고 가로 스크롤한다(분류가 많으면 필터가 목록보다 커진다). flex item의 `min-width` 기본값이 `auto`라 `overflow-x`만으로는 부족했다 — `min-width: 0`을 주지 않으면 칩들이 컨테이너를 밀어 목록 전체가 가로로 넘쳤다(실측). content-list.md v0.22.0 → v0.23.0 (MINOR)

### Changed
- ContentList: 열 이름을 **기본값으로** 전환하고 modifier 클래스를 없앴다. `content-list-container--columns` 대신 `.content-list__columns` 슬롯의 **존재**로 켜진다 — 라벨과 열 정렬은 한 몸이라, 둘 중 하나만 켜진 상태(라벨은 있는데 값이 안 맞거나, 값은 열인데 이름이 없거나)를 만들 수 있으면 안 된다. 요약문이 있는 목록에서는 `:not(:has(.content-list__excerpt))`로 통째로 꺼진다 — 본문이 세로로 길어지면 열 정렬이 성립하지 않는데 라벨만 남으면 값과 어긋난 채로 서기 때문이다. 마크업에 슬롯을 둬도 자동으로 인라인 메타로 돌아간다(측정: 라벨 display none, 컨테이너 flex, `__unit`과 가운뎃점 복귀). content-list.md v0.19.0 → v0.20.0 (MINOR)

### Added
- ContentList: 열 이름 variant `content-list-container--columns` + `.content-list__columns` 슬롯 추가. header에 `분류·작성일·조회`를 두고 메타를 실제 열로 정렬한다. `md` 이상에서만 동작하고 `sm`에서는 기본 디자인(인라인 메타 + 값에 붙은 단위)으로 돌아간다. 기본값이 아니라 variant인 이유: 열 이름은 "누르면 정렬된다"는 신호를 주고 열 폭이 고정되면 좁은 화면에서 접히지 않는다 — ContentList를 만든 이유와 정면으로 부딪힌다. 요약문(`__excerpt`)과는 함께 쓸 수 없다. 열 폭은 px로 박지 않고 **subgrid로 잡는다** — header와 각 행은 서로 다른 요소 안에 있지만 container가 정의한 같은 열을 물려받으므로, 폭이 그 목록에 실제로 들어온 가장 긴 값에 맞춰지고 라벨과 값이 저절로 맞는다(측정: 1200px에서 923.4 / 1046.4 / 1127.5로 header 라벨과 전 행 일치, 뷰어 cascade에서도 재확인). 값의 단위 라벨은 `.content-list__unit`으로 분리해 마크업에 항상 두고, `--columns`에서만 숨긴다 — `sm`으로 돌아가면 다시 나와 정보가 빠지지 않는다. content-list.md v0.18.0 → v0.19.0 (MINOR)
- Color: `--color-border-faint` 추가 (`var(--color-gray-100)`) — 본문형 목록의 항목 구분선용. `--color-border-subtle`(gray-200)과의 차이는 밝기가 아니라 **선이 하는 일**이다. 데이터 표의 행 구분선은 실제로 일을 한다(행을 가로질러 값을 비교하려면 선이 행을 잡아줘야 한다). 본문형 목록은 비교 대상이 아니라 읽을 것을 고르는 나열이라 선은 항목이 바뀌는 지점만 알리면 되는데, 같은 값이라도 20줄 이어지면 무게가 누적돼 제목과 경쟁한다. color.md의 "중립 border 3종 선택 기준"을 4종으로 확장하고, 데이터 표에 faint를 쓰지 말라는 DON'T를 추가. color.md v1.4.0 → v1.5.0 (MINOR)
- ContentList: 읽음 상태 variant `content-list__item--read` 추가 — 이미 본 글의 제목을 **굵기 body + 색 label**로 낮춘다. 게시판은 같은 목록을 반복해서 여는 화면이라, 무엇을 이미 봤는지가 보이지 않으면 매번 처음부터 훑게 된다. 색만 한 단계 내리면 눈에 띄지 않고, 눈에 띌 만큼 내리면 제목이 메타 수준으로 주저앉는다 — **굵기를 주 신호, 색을 보조 신호**로 둔다(6안 렌더 비교 후 선택). 굵기와 색이 함께 바뀌므로 색각 이상에서도 구분된다. hover는 읽음보다 명시도가 높아 읽은 항목도 hover 시 브랜드 색으로 돌아온다. 사용 지침에 `--read` 클래스와 `:visited` 두 방식의 비교표(서버 기록 vs 브라우저 방문 기록 · 기기 간 동기화 · 기록 삭제 영향 · 바꿀 수 있는 속성 · 백엔드 필요 여부)와 둘을 섞지 말라는 경고 추가. content-list.md v0.14.1 → v0.15.0 (MINOR)
- ContentList: `.content-list__new`(icon-new 아이콘) 복원 — v0.12.0에서 `__flag`로 합쳤던 것을 되돌린다. **신규와 플래그는 성격이 다르다** — 신규는 등록일 기준 시스템 자동 표시, 플래그는 운영자 수동 표시이고 **둘은 동시에 나올 수 있다**(새로 올라온 필독 공지). 형태를 아이콘/뱃지로 갈라 둘이 나란히 붙어도 무엇이 자동이고 무엇이 판단인지 읽히게 한다 — 둘 다 Badge면 그 구분이 사라진다. 순서 고정: 제목 → `__new` → `__flag`. `align-self: center` — headline이 baseline 정렬인데 아이콘은 글자가 없어 기준선이 잡히지 않는다. 사용 지침에 두 표시의 비교표와 Do/Don't 추가. content-list.md v0.12.0 → v0.13.0 (MINOR)
- ContentList: 플래그 슬롯 `.content-list__flag` + `.content-list__headline` 래퍼 추가. `필독`·`공지`·`마감임박`처럼 신규 외의 상태 표시를 제목 뒤에 붙인다. Badge 컴포넌트를 그대로 쓰고(`badge--error`·`badge--caution`·`badge--brand`), 색 강도 = 우선순위로 맞춘다. 사용 지침에 라벨·style 매핑 예시와 남용 방지 규칙(항목당 하나, 목록의 20% 이내) 추가.
- Color: `--color-border-strong` 추가 (`var(--color-gray-500)`) — 섹션 경계용 구분선. 행 구분선(`--color-border-subtle`)보다 위계가 높은 선이 필요한데 중립 border 스케일이 subtle(gray-200) / default(gray-300)에서 끊겨 있었다. `--color-border-selected`·`--color-border-complete`가 같은 gray-500이지만 선택·검증 **상태**를 뜻하므로 구획선으로 전용하지 않는다. color.md에 중립 border 3종 선택 기준 표 추가(무엇을 나누는 선인가 — 같은 층위 나열 / 인터랙션 윤곽 / 층위가 다른 구획). color.md v1.3.0 → v1.4.0 (MINOR)
- ContentList: 게시물 번호 슬롯 `.content-list__no` 추가(기본 표시). 상담원이 "165번 글 보세요"처럼 항목을 지목하는 식별자다 — 목록에 없으면 전화로 글을 특정할 방법이 사라진다. 오른쪽 메타가 아니라 **왼쪽 거터**에 둔다: 읽을지 판단하는 정보가 아니라 지목하는 식별자라 역할이 다르고, 메타에 섞으면 분류·날짜와 같은 무게로 읽혀 지목 기능이 묻힌다. `min-width: 4ch` + `tabular-nums`로 자릿수와 무관하게 제목 시작선을 고정. 링크 밖에 두어 스크린리더 링크명은 제목만 유지하고, `aria-hidden`은 붙이지 않는다(실제 식별자). `sm`에서는 세로로 쌓지 않고 `:has()` grid로 왼쪽 거터를 유지 — 좁은 화면일수록 번호를 훑는 동작이 중요하다. content-list.md v0.5.1 → v0.6.0 (MINOR)
- ContentList: 신규 Organism 컴포넌트 — 게시판·자료실처럼 읽을거리를 나열하는 목록. REQ-001 우선순위 1의 첫 구현. 정보 테이블(`table--info`)의 시각 톤(좌우 라인·radius 없이 상하 구분선만, 줄바꿈 허용, `.table` 기본 행 높이)을 채택하고, 컬럼 헤더와 "hover 없음"은 채택하지 않는다 — 행 전체가 링크이고 컬럼이 남으면 `sm`에서 접히지 않기 때문. 링크는 제목만 감싸고 행 전체 클릭은 `::after` 오버레이가 담당한다(스크린리더 링크명에 메타가 섞이지 않도록). layout(row·stack) · header · excerpt · 신규 표시 variant. `sm`에서 세로 스택 reflow. build.py FILE_ORDER 등록. content-list.md v0.1.0
- 컴포넌트 추가 요청 문서 신설 — `components/_requests.md`. 시스템에 없어 프로토타입을 막는 컴포넌트를 접수하는 백로그. 첫 항목으로 REQ-001 콘텐츠(읽을거리) 계열 접수: Card·ContentList·ContentHeader·ContentBody·AttachmentList(우선순위 1), PageHeader·ContentNav(2), ListPage·DetailPage Pattern(3). 모바일 지원 범위·밀도 정책·표/게시판 구분 결정을 반영. _requests.md v0.3.0
- Banner: 신규 Molecule 컴포넌트 — 페이지·섹션 내 고정 노출되는 인라인 상태 메시지 바. Toast의 상태 스타일 체계(info·success·caution·error) 참고, 인라인(그림자·고정위치·자동소멸 없음)으로 적응. title·action(선택) 지원. 닫기 버튼은 두지 않음 — 지속 노출이 목적이므로 닫힘은 Toast의 역할로 분리(조건 해소 시 앱이 제거). 기존 product.md·alert.md가 참조만 하고 구현이 없던 컴포넌트를 정식 추가. build.py FILE_ORDER 등록. banner.md v0.1.0
- Color: `--color-text-inverse-alpha` 추가 (`color-mix(in srgb, var(--color-gray-0) 65%, transparent)`) — 어두운 배경(surface-dark) 위 흰 텍스트 계층 구분용. 툴팁 내 라벨/값처럼 같은 어두운 배경에서 계층이 필요할 때. `text-body-alpha`·`text-brand-alpha`의 inverse 대응. color.md v1.2.0 → v1.3.0 (MINOR)
- Table: 헤더고정(sticky header) 지원 — `<table>`에 `table--sticky-head` 추가 시 세로 스크롤에서 thead가 상단 고정. 스크롤 래퍼에 max-height 필요. 열고정과 조합 시 코너 z-index 자동 처리. data.md v0.6.2 → v0.7.0 (MINOR)
- Badge: `badge--disabled` 상태 variant 추가 — 비활성·비적용을 나타내는 시각 스타일(비인터랙티브 유지). tint·fill·line 전부 대응. 비활성 Tab 내 카운트 badge 등에서 하드코딩하던 disabled 색 처리를 표준화. badge.md v1.0.2 → v1.1.0 (MINOR)
- Tab: 신규 Molecule 컴포넌트 — tablist/tab/tabpanel 패턴. 상태(default·hover·selected·disabled)·badge 카운트·키보드 내비게이션. tab.md v0.1.0

### Fixed
- 뷰어/빌드: 문서용 예시 CSS 누수 전면 정리. 추출된 CSS는 `components.css`로 번들될 뿐 아니라 **뷰어에서 그 문서를 열 때 `<head>`에 주입된다**(build.py 1806행) — 그래서 번들 대상이 아닌 토큰 문서의 예시도 실제로 적용되고 있었다. 전 문서를 감사해 예시·템플릿 11곳을 ` ```css example `로 전환: `components/_index.md`(CSS 조합 방식 예시), `components/_spec.md`×3(템플릿), `tokens/_spec.md`×2, `tokens/elevation.md`×2(z-index 사용 예시), `tokens/motion.md`(`prefers-reduced-motion` 전역 스니펫 — 뷰어에서 이 문서를 열면 `*{transition-duration:0.01ms!important}`가 주입돼 뷰어 전체 애니메이션이 죽고 있었다), `tokens/stroke.md`, `workflow/designer.md`. 컴포넌트 문서의 구현 블록은 건드리지 않았다(`.btn`·`button.icon-on--md:hover`는 button.md·icon-button.md의 실제 구현으로 정상 유지). `build.py`에 플레이스홀더(`{ ... }`·`[클래스명]` 등) 검출 경고를 추가하고 — 되돌려 넣어 경고가 실제로 뜨는 것을 확인했다 — `components/_spec.md`에 펜스 규칙을 명시했다.
- ContentList/뷰어: **문서용 예시 CSS가 실제 구현으로 적용되던 버그 수정.** `build.py`는 문서의 모든 ` ```css ` 펜스를 구현으로 추출해 `components.css`로 번들하는데, 읽음 상태 지침에 대안으로 적어둔 `.content-list__link:visited { color: subtle }` 스니펫이 그대로 실제 규칙이 됐다(`components.css:5299`). 프리뷰 링크는 `href="#"` — 현재 페이지 URL로 해석되어 **항상 방문한 링크**라, 실제 브라우저에서 제목이 전부 회색으로 보였다. 헤드리스 브라우저는 방문 기록이 없어 측정에는 잡히지 않았다. 예시 펜스를 ` ```css example `로 바꿔 추출에서 제외한다 — 추출 정규식이 `css` 뒤 개행을 요구하므로 자동으로 걸러지고, marked는 첫 단어를 언어로 잡아 하이라이팅은 유지된다. `build.py`에 이 규칙과 사고 경위를 주석으로 남겼다. content-list.md v0.17.2 → v0.17.3 (PATCH)
- ContentList: 신규 아이콘이 숫자보다 아래로 처져 보이던 문제 수정 — 크기를 `--icon-sm`(16px) → `--icon-badge`(12px)로 바꿨다. **정렬이 아니라 크기 문제였다**: 상자 중심도, canvas로 잰 숫자 글리프의 실제 잉크 중심도 오차 0이었는데(390/1200px 모두), 16px 원이 숫자 글리프(11px)보다 커서 위아래로 2.5px씩 삐져나오고 있었다. 숫자는 내려긋는 획이 없어 베이스라인이 곧 바닥으로 읽히므로, 아래로 삐져나온 2.5px만 "가라앉은" 것으로 보인다. 1px 밀어 올리는 광학 보정 대신 크기를 역할에 맞췄다 — icon.md의 정의상 `sm`은 "sm 컴포넌트" 크기이고 `badge`는 "보조 인디케이터(badge 내부, **메타 정보**)"인데, 번호 옆 신규 표시는 후자다. 처음부터 토큰 선택이 틀렸던 것이고, 크기가 역할에 맞지 않으면 정렬로 드러난다. 측정: 삐져나오는 양 2.5px → 0.5px. content-list.md v0.17.1 → v0.17.2 (PATCH)
- ContentList: 신규 아이콘을 번호에 바짝 붙였다(간격 16px → `--space-gap-2xs` 2px). 번호와 신규는 "몇 번 글이고 새 글인가"라는 한 덩어리인데, 본문과 같은 간격으로 벌어져 있어 셋이 균등하게 나열됐다. 열 간격을 item의 일괄 `gap`에서 각 열의 `margin-inline-start`로 바꿨다 — gap 하나로는 거터 안(2px)과 거터→본문(16px)의 차이를 낼 수 없고, margin이면 flex 폴백과 grid에서 같은 값이 나온다. 붙이면서 **세로 중심도 맞췄다**: 번호(13px)와 아이콘(16px)이 각자 자기 줄 높이를 쓰고 있어 나란히 두면 3px 어긋났다. 번호도 제목 첫 줄 높이의 상자 안에서 가운데 정렬한다(신규·플래그와 같은 방식). 측정(390/1200px): 번호 오른쪽 끝 44.9/52.9px → 아이콘 왼쪽 46.9/54.9px로 **2px**, 제목 시작선 92.9 → 78.9px(데스크톱 100.9 → 86.9px)로 14px 당겨졌다. 신규가 없는 목록은 번호→제목 16px 그대로. content-list.md v0.17.0 → v0.17.1 (PATCH)
- ContentList: `sm`에서 제목이 2줄로 접힐 때 신규 아이콘이 두 줄 한가운데(11.3px 아래)에 뜨던 문제 수정. 아이콘은 글자가 없어 `__headline`의 baseline 정렬이 통하지 않고, `align-self: center`가 2줄 박스 기준으로 잡혔다. 상단에 붙이되 박스 높이를 제목 첫 줄 높이와 같게 주고 그 안에서 가운데 정렬한다 — 1줄·2줄, 데스크톱·모바일 모두 오차 0. 제목 크기를 `--content-list-title-size` 변수로 빼 아이콘 박스가 자동으로 따라오게 했다(Table의 `--table-row-height`와 같은 cascade 패턴). content-list.md v0.14.0 → v0.14.1 (PATCH)
- ContentList: 문서 프리뷰의 `content-list__headline` div가 중첩돼 있던 것 수정. v0.12.0에서 headline 래퍼를 정규식으로 일괄 삽입할 때 이미 감싼 항목을 한 번 더 감쌌다. 태그 수는 맞아 균형 검사를 통과했지만 구조가 잘못이었다. 프리뷰 마크업 전체를 생성 스크립트로 다시 만들었다.
- ContentList: 요약문이 있는 항목에서 제목과 요약문 사이가 16px로 벌어지던 문제 수정. 데스크톱 가로 배치용 `gap: --space-gap-lg`(16px)가 세로 배치 분기에서 그대로 상속돼, 제목과 메타를 벌리려던 값이 한 덩어리로 읽혀야 할 제목·요약문을 갈라놓고 있었다. `--space-gap-xs`(4px)로 되돌림 — 항목 높이 116px → 92px.
- ContentList: 요약문(`__excerpt`)이 있는 항목에서 제목에 `flex: 1`이 남아 있던 것을 `flex: none`으로 되돌림. `flex: 1`은 가로 배치에서 제목이 남는 **폭**을 채우게 하려는 것인데, 세로 배치에서는 남는 **높이**를 채우게 된다. 현재 마크업에서는 항목 높이가 콘텐츠로 결정돼 증상이 드러나지 않지만, 항목에 고정 높이가 생기면 제목 상자만 늘어나 메타와의 간격이 벌어진다. (제목 글자 크기 자체는 두 경우 모두 17px로 동일 — 렌더 폭 179.45px 일치 확인) content-list.md v0.8.0 → v0.8.1 (PATCH)
- 뷰어: preview 중화 블록의 명시도 수정 — `.component-preview-stage li`(0,1,1)로 두면 컴포넌트 클래스(0,1,0)까지 눌러 ContentList 행의 좌우 padding이 사라졌다. `:where(.component-preview-stage)`로 감싸 (0,0,1)로 낮추고 문서 규칙 전체보다 뒤에 배치했다. 문서 규칙과 같은 명시도에서 순서로 이기고, 컴포넌트 클래스는 둘 다 이긴다.
- 뷰어: 문서용 마크다운 스타일이 컴포넌트 preview로 새던 문제 수정. `.md`의 엘리먼트 규칙(`p`·`ul`·`ol`·`li`·`code`·`em`·`strong`·`blockquote`)을 h1~h3·a와 동일하게 `:where()`로 감싸 명시도를 낮추고, `.component-preview-stage` 안에서 문서 장식을 명시적으로 되돌리는 중화 블록을 추가. 명시도를 낮추는 것만으로는 부족하다 — `:where(.md) li`(0,0,1)가 components.css의 전역 리셋 `*`(0,0,0)을 여전히 이겨 ContentList 행 아래에 `margin-bottom: 4px`가 남았고, hover 배경과 구분선 사이에 틈이 생겼다. `:where(.md) a`의 `border-bottom`(문서 링크 장식)이 컴포넌트 링크에 남아 제목 아래 가로선이 생기던 문제도 같은 블록에서 차단. ContentList에서 처음 드러났으나 `<ul>`·`<a>`를 쓰는 모든 컴포넌트(Dropdown·Combobox·Table의 `.link` 등)에 해당하던 버그다. preview는 프로토타입(tokens.css + components.css)과 같은 결과가 나와야 하며, 문서 스타일이 남으면 그 차이를 컴포넌트 버그로 오해하게 된다.
- Table: `table__cell--fit` 문서와 구현 불일치 해소 — 문서가 "콘텐츠 폭 수축"으로 설명했으나, base `.table`가 `width:100%`이고 셀에 `overflow:hidden`이 걸려 있어 셀 CSS만으로는 auto 레이아웃에서 안정적 수축이 불가(explicit width는 콘텐츠 클리핑, 무지정은 균등 분배)함을 확인. 구현을 실제 역할(`white-space:nowrap` 줄바꿈 방지)에 맞게 문서를 정정하고, 콘텐츠 폭 고정이 필요하면 `table-layout:fixed` + 명시 width를 쓰도록 안내 추가.
- Table: 헤더 셀에 배경(`surface-neutral`) 명시 — sticky 헤더 지원용(기존 `thead` 배경과 동일 색이라 시각 변화 없음). table-cell.md v0.3.0 → v0.4.0 (MINOR)

### Changed
- ContentList: 행 구분선을 `--color-border-subtle`(gray-200) → `--color-border-faint`(gray-100)로. 컨테이너 하단선·첫 항목 상단선·항목 사이 선 3곳. header 하단선(`strong`)과 header 내부 세로 구분자(`subtle`)는 그대로 둔다 — 층위가 다른 선이라 같이 내리면 위계가 무너진다. content-list.md v0.17.3 → v0.18.0 (MINOR)
- ContentList: 신규 아이콘을 `--icon-badge`(12px)에서 `--icon-sm`(16px)으로 되돌리고 광학 보정 1px을 넣었다. 12px은 정렬 문제는 없앴지만 표시가 너무 약했다. 계산상 중심은 이미 맞으므로(상자 중심·글리프 잉크 중심 모두 오차 0) 남은 것은 광학 문제다 — 16px 원이 숫자 글리프(11px)보다 커서 위아래로 2.5px씩 삐져나오는데, 숫자는 내려긋는 획이 없어 베이스라인이 곧 바닥으로 읽혀 아래쪽 2.5px만 "가라앉은" 것으로 보인다. 0·1·1.5·2px를 5배로 렌더해 비교했고 1px이 가장 균형이 좋다(1.5px부터는 반대로 떠 보인다). `transform`이라 열 폭·행 높이에는 영향이 없다.
- ContentList: 거터 열에 들어가는 것을 플래그에서 **신규 아이콘**으로 바꿨다. v0.16.0에서 플래그를 거터로 옮긴 판단이 절반만 맞았다 — 제목 뒤에서 뱃지가 제목 첫 줄을 끊는 문제는 실제였지만, **거터에 둘 수 있는 것은 폭이 고정된 것뿐**이라는 조건을 놓쳤다. 뱃지는 글자 수만큼 폭이 변해서, 열로 두면 목록에서 가장 긴 라벨(`마감임박`)이 뱃지 없는 행까지 포함해 **전 행의 제목 폭**을 깎는다. 신규 아이콘은 언제나 16px이라 그 비용이 없다. 390px·8건 기준 측정: 뱃지가 거터면 제목 시작선 132.9px·목록 높이 652px, 신규 아이콘이 거터면 92.9px·607.8px. 자리가 갈리면서 자동(시스템)/수동(운영자) 구분이 형태(아이콘/뱃지)에 더해 위치로도 남는다. subgrid 열 구성은 그대로 두고 가운데 열의 주인만 교체했다(`:has(.content-list__new)`로 신규가 없는 목록은 열이 사라진다). 측정 검증(390/1200px): 제목 시작선·번호 오른쪽 끝·신규 아이콘 위치 전 행 동일, 신규·플래그 모두 제목 첫 줄 중앙과 오차 0px. content-list.md v0.16.0 → v0.17.0 (MINOR — 마크업 구조 변경, 0.x draft)
- ContentList: 플래그(`__flag`)를 제목 뒤에서 **번호 옆 거터 열**로 옮겼다. 제목 뒤에 두면 제목이 2줄로 접히는 `sm`에서 뱃지가 첫 줄 끝에 걸려 단어 중간에 낀다("… 비즈 [필독] / 씨/세무사랑 …"). 앞에 두는 안은 v0.12.0에서 한 번 물렸는데, 그때 문제는 "앞"이 아니라 **인라인**이었다 — 뱃지 길이가 행마다 달라 제목 시작선이 97/137/161px로 흔들렸다. 열로 두면 폭이 뱃지가 아니라 열에 묶여 시작선이 고정된다(측정: 전 항목 108.9px). 열 폭은 px로 박지 않고 `subgrid`로 목록 전체에서 잡는다 — 그 목록에 실제로 쓰인 가장 넓은 뱃지에 맞춰지므로 뱃지 없는 행이 폭을 뺏기지 않는다. 390px·8건 중 2건 플래그 기준 비교: 고정 56px는 제목 시작선을 132.9px까지 밀어 3개 행이 한 줄 더 접히고 목록 높이가 652px, subgrid는 607px로 **플래그가 없을 때와 동일**. 목록에 플래그가 하나도 없으면 `:has()`로 가운데 열을 없애 `column-gap`이 남지 않게 한다(제목 시작선 60.9px로 복귀). 항목을 `display:contents`로 풀지 않는다 — li 상자가 사라지면 hover 배경·구분선·`__link::after` 오버레이 기준점이 모두 무너진다. subgrid 미지원 브라우저는 `@supports` 밖의 flex 배치가 그대로 남아 시작선만 흔들리고 정보는 전부 보인다. 신규 아이콘(`__new`)은 제목 뒤에 그대로 둔다 — 형태(아이콘/뱃지)에 더해 자리까지 갈라 자동/수동 구분이 이중으로 유지된다. content-list.md v0.15.0 → v0.16.0 (MINOR — 마크업 구조 변경, 0.x draft)
- ContentList: 제목(`__link`)의 `flex: 1` → `flex: 0 1 auto`. 남는 폭을 채우면 플래그가 제목에서 떨어져 행 오른쪽 끝(메타 옆)에 붙는다 — 측정 시 제목 끝에서 **345px** 떨어져 있었다. 플래그는 제목에 딸린 표시이므로 제목 바로 뒤(32px)에 있어야 한다. 요약문이 있는 항목은 `flex: none` 때문에 이미 붙어 있어서 **같은 컴포넌트 안에서 동작이 갈리고 있었다** — base를 `0 1 auto`로 통일하고 요약문 분기의 재지정을 제거했다. 긴 제목은 여전히 줄어들며 말줄임되고 플래그는 남는다. content-list.md v0.13.0 → v0.14.0 (MINOR)
- ContentList: excerpt 프리뷰에도 신규·플래그 예시 추가(162 = 신규 + 필독). 요약문이 있는 항목에서 표시가 어떻게 붙는지 문서에서 바로 확인된다.
- ContentList: 플래그는 링크 **밖**, `__headline`의 형제로 둔다. 링크 안에 넣으면 제목 말줄임에 함께 잘려 정작 읽혀야 할 "필독"이 사라진다. `flex-shrink: 0`으로 제목만 잘리고 플래그는 남게 한다.
- ContentList: 플래그를 제목 **앞이 아니라 뒤**에 둔다. 앞에 두면 뱃지 길이에 따라 제목 시작선이 행마다 달라진다(측정: 97 / 137 / 161px). 뒤에 두면 제목 시작선이 고정된다(측정: 전 항목 89px).
- ContentList: `__headline` 정렬을 `align-items: baseline`으로. `center`면 제목이 2줄로 접히는 `sm`에서 플래그가 두 줄 한가운데(9.2px 아래)에 뜬다. baseline은 1줄·2줄 모두 오차 2px 안쪽이라 breakpoint 분기가 필요 없다. content-list.md v0.11.0 → v0.12.0 (MINOR — 마크업 구조 변경, 0.x draft)
- ContentList: 요약문 다음 메타 앞에 `--space-gap-sm`를 더해 흰 공간을 6px → 14px로. 색 한 단계(v0.10.0)만으로는 부족했다 — **블록 사이 간격이 그 블록의 줄 간격보다 좁으면 다음 블록이 앞 블록의 다음 줄로 읽힌다.** 요약문 줄 사이 흰 공간이 7px인데 요약문↔메타가 6px이라 메타가 요약문의 마지막 줄처럼 붙어 있었다. 줄 간격의 2배를 확보해 끊는다. 제목·요약문은 붙여 한 덩어리(내용), 메타는 떨어뜨려 별개(판단 보조). 사용 지침에 근접성 규칙과 측정치 표 추가. content-list.md v0.10.0 → v0.11.0 (MINOR)
- ContentList: 요약문(`__excerpt`) 색을 `--color-text-subtle`(gray-500) → `--color-text-label`(gray-700)로. 요약문과 메타가 같은 회색이라 두 줄이 한 덩어리로 뭉쳐 어디까지가 내용인지 구분되지 않았다. 칩·아이콘·구분선을 더하지 않고 **색 한 단계**로만 나눈다 — 요약문은 "읽는 내용", 메타는 "읽을지 판단하는 보조 정보"라 역할이 다르다. 사용 지침에 텍스트 3층 색 위계표(body → label → subtle)를 추가하고, 세 층 모두 WCAG AA 본문 기준(4.5:1)을 넘는 것을 접근성 절에 명시 (제목 18.43:1 · 요약문 8.68:1 · 메타 4.51:1). content-list.md v0.9.0 → v0.10.0 (MINOR)
- ContentList: header 하단선 색을 `--color-border-default`(gray-300) → `--color-border-strong`(gray-500)로. 두께는 1px 그대로. 같은 두께에서 색으로만 위계를 만든다 — 머리와 본문은 층위가 다른 구획이고 항목 사이는 같은 층위의 나열이다. 두께로 강조하면 굵은 밑줄 관용구가 된다. content-list.md v0.8.1 → v0.9.0 (MINOR)
- ContentList: 항목을 **번호 거터 + 본문** 두 열로 재구성하고, `md` 이상에서 본문을 가로로 눕힌다 — 제목(좌)과 부가 정보(우)를 한 줄에. `sm`에서는 규칙이 풀려 자연히 세로로 접힌다. `.content-list__body` 래퍼 추가. 한 줄 배치가 표처럼 읽히지 않게 하는 것은 레이아웃이 아니라 메타의 처리라, v0.7.0에서 걷어낸 칩·아이콘은 그대로 두고 배치만 되돌렸다.
- ContentList: 번호를 메타 줄에서 **왼쪽 거터로 이동**(`#165` → `165`). 메타에 두면 앞 항목(분류)의 길이에 따라 번호 위치가 행마다 흔들려 상담 중 번호를 훑는 동작이 불가능하다. 거터에서 `min-width: 4ch` + `tabular-nums`로 자릿수와 무관하게 한 열로 정렬한다. `sm`에서도 거터를 유지.
- ContentList: 데스크톱 가로 배치에서 제목은 한 줄 말줄임, `sm`에서는 2줄 말줄임. 요약문(`__excerpt`)이 있으면 데스크톱에서도 세로 스택을 유지하고 제목도 2줄로 되돌린다(`:has()` 분기). 이때 항목의 세로 가운데 정렬도 해제해 번호가 제목 첫 줄에 맞도록 한다. content-list.md v0.7.0 → v0.8.0 (MINOR)
- ContentList: 항목 구조를 **세로 스택**으로 재설계 — 제목 줄(17px) + 메타 줄. 한 줄에 제목과 메타를 나란히 놓으면 컬럼 없는 표처럼 읽혀 데이터 테이블의 잔상이 남았고, 좁은 화면에서 다시 접어야 했다. 쌓으면 제목이 시각 위계 최상위를 독점하고 `sm`에서 레이아웃을 바꿀 일도 없어진다(좌우 inset만 조정). `:has()` grid 분기와 `layout` variant 제거.
- ContentList: 메타를 **같은 크기·같은 무게의 텍스트 한 줄**로 통일 — 분류 Badge 칩과 조회수 눈 아이콘 제거. `#165 · 4대보험 · 2024.03.20 · 조회 1,011`. 칩·아이콘·텍스트 세 가지 시각 언어가 섞이면 메타가 제목과 경쟁해 위계가 무너진다. 구분이 필요한 분류만 브랜드 색으로 처리. 가운뎃점은 CSS `::before`가 삽입한다(생성 콘텐츠라 스크린리더가 읽지 않는다).
- ContentList: 게시물 번호를 왼쪽 거터에서 메타 줄 맨 앞 `#165`로 이동. 지목 기능은 유지하면서 좌측 번호 컬럼이라는 오래된 게시판 관용구를 걷어낸다. `.content-list__no`의 `min-width: 4ch` 정렬 규칙은 불필요해져 제거.
- ContentList: header 하단선을 2px 브랜드 → `--stroke-sm` `--color-border-default`로, 소제목을 `--font-size-h3` `--color-text-display`로. 굵은 컬러 밑줄은 목록의 머리를 선의 굵기로 강조하는 관용구다. 머리는 선이 아니라 **타이포**로 세운다.
- ContentList: `.content-list__main` 래퍼 제거, `.content-list__cat` 추가. 마크업이 제목·요약·메타 세 슬롯으로 단순해진다. content-list.md v0.6.0 → v0.7.0 (MINOR — 마크업 구조 변경, 0.x draft)
- ContentList: header의 총 건수(`__count`)를 기본 표시에서 제외. 번호와 총 건수는 함께 두지 않는다 — 내림차순 게시판에서는 첫 항목의 번호가 곧 총 건수라 중복이다. `__count`는 필터 결과 수가 판단 근거인 조회 화면용 대안으로 남기고, 어느 쪽을 쓸지 사용 지침에 선택 기준 표를 추가했다.
- ContentList: "게시물 번호는 내부 시퀀스라 읽는 사람에게 의미가 없다"는 기존 지침을 철회. 지식센터처럼 사외 사용자를 상담하는 게시판에서는 번호가 지목 창구로 쓰인다. 메타 지침에서 삭제하고 `__no` 슬롯 설명으로 대체.
- ContentList: 한 줄 행 높이를 `.table` 기본 행(36px)과 정확히 일치시킴 — 세로 padding `--space-8` → `--space-6`. 기존 값은 39px라 표와 나란히 놓았을 때 행 높이가 어긋났다. hover 배경을 `--color-action-neutral-hover` → `--color-action-brand-subtle`로 변경 — 데이터 테이블 행 hover와 같은 토큰. "이 행은 누를 수 있다"는 신호를 시스템 전체에서 통일하고, neutral 계열이 `badge--neutral`(surface-neutral)과 겹쳐 hover 시 분야 칩이 사라져 보이던 문제도 해소. content-list.md v0.1.0 → v0.2.0 (MINOR)
- ContentList: 문서 서술 정정 — "상하 구분선만"은 상단 선 제거 후 사실이 아니다. "가로 구분선만"으로 바꾸고 AI 주석에 header 유무별 상단 경계 규칙을 명시. content-list.md v0.5.0 → v0.5.1 (PATCH)
- ContentList: 컨테이너 상단 선 제거 — header의 2px 브랜드 선이 목록 시작점을 표시하므로 그 위 회색 선은 시작점을 흐린다. header 없이 쓸 때만 `.content-list-container > .content-list:first-child`가 상단 경계를 갖는다. header 높이 `--height-compact`(32px) → `--height-loose`(48px) — 데이터 밀도를 다루는 toolbar가 아니라 섹션 머리이고, 2px 브랜드 선과 짝을 이루려면 그만한 높이가 필요하다. 항목 행 높이(36px)와는 무관하다. content-list.md v0.4.0 → v0.5.0 (MINOR)
- ContentList: header를 색면에서 선으로 변경 — 배경 `--color-surface-neutral`(회색) → `--color-surface-base`(흰색), 하단 border를 `--stroke-md` `--color-border-brand`(2px 브랜드)로. 소제목은 `--color-text-brand-muted`. 정보 테이블에서 가져온 "덜어내는 톤"의 연장이다 — 머리를 색면이 아니라 선으로 표시한다. 색면을 쓰면 hover(브랜드 틴트)와 채색 영역이 둘이 되어 "어디가 누를 수 있는 곳인가"가 흐려지므로, 칠해진 면은 hover 하나로 유지한다. 소제목에 `--color-text-brand`(링크 hover 색)를 쓰지 않은 이유도 같다 — 같은 값이면 바로 아래 목록 제목과 구분이 안 되어 소제목이 클릭 가능한 것처럼 읽힌다. content-list.md v0.3.0 → v0.4.0 (MINOR)
- ContentList: 좌우 inset을 `--space-inset-xl`(12px) → `--space-inset-3xl`(24px)로 확대. `sm`에서는 `--space-inset-2xl`(16px). 데이터 테이블 셀과 같은 12px를 쓰고 있었으나, 테이블은 좌우 테두리 안에 셀이 담기는 반면 ContentList는 좌우 라인이 없어(정보 테이블 톤) 제목이 프레임 없이 가장자리에 바로 붙어 눈에 띄게 좁아 보였다. header도 같은 값으로 맞춰 건수·제목이 항목 제목과 세로 정렬된다. 세로 padding은 그대로라 한 줄 행 높이 36px는 유지. content-list.md v0.2.1 → v0.3.0 (MINOR)
- ContentList: `.content-list__item`에 `margin: 0` 명시 — 행 사이 간격은 border만 담당한다는 것을 컴포넌트 CSS로 못 박는다. 전역 리셋 `*`(0,0,0)에 기대면 호스트 페이지가 `li { margin }`(0,0,1) 하나만 둬도 무너진다. content-list.md v0.2.0 → v0.2.1 (PATCH)
- Components: 계층표에 **구현 상태 표기** 추가 — `✅ 구현됨`(문서+CSS 존재) / `⬜ 계획`(이름만 있음) 두 열로 분리. 표에 누락돼 있던 구현 컴포넌트 6개 추가(Disclosure · Steps · Banner · ImagePreview · Breadcrumb · TableCell). 표에 이름이 있으면 사용 가능한 것으로 읽혀 미구현 컴포넌트를 비슷한 것으로 대체하는 원인이 됐다(게시판 → 데이터 테이블). `_requests.md` 연결 추가. _index.md v1.2.1 → v1.3.0 (MINOR)
- Planner: 컴포넌트 매칭을 `_index.md`의 **`✅ 구현됨` 열로 한정**. 미구현 컴포넌트를 비슷한 것으로 대체하거나 임의 클래스로 채우지 않고 `components/_requests.md`에 요청을 남기도록 지시 추가. planner.md v2.7.1 → v2.8.0 (MINOR)
- Adaptation: 모바일(`sm` < 768px) **정식 지원 범위 포함** — 앱 웹뷰 전환에 따른 결정. Breakpoint 표에 지원 여부 열 추가, `sm` 규칙 신설(Sidebar 기본 숨김·Modal 전체 폭·단독 주요 액션 `--height-loose`). "여러 건을 나열하는 화면 — 표와 목록은 다르게 접힌다" 절 신설 — 데이터 테이블은 `sm`에서도 가로 스크롤(컬럼 reflow 금지), 콘텐츠 목록은 세로 스택 reflow. 판단 기준은 "행끼리 비교하나?". adaptation.md v1.0.0 → v1.1.0 (MINOR)
- Product: B2B 제약이 **화면 종류와 무관하게 동일 적용**됨을 명시 — 게시판·자료실 같은 읽기 화면도 예외 없음. 콘텐츠 계열 밀도 예외 절을 두지 않기로 결정한 데 따른 명확화(스펙 변경 없음). product.md v1.1.0 → v1.1.1 (PATCH)
- Color: `--color-fill-error` 값 `var(--color-red-500)` → `var(--color-red-600)`. color.md v1.1.0 → v1.2.0 (MINOR)
- Dropdown: 폼 필드 DON'T 정책 제거 → 검색 불필요·소수 선택지 컨텍스트에서 FormField Control 허용. `--color-fill-neutral` → `--color-text-subtle` (placeholder·chevron·trigger-icon). `--space-4` → `--space-gap-xs` (count badge·패널 offset). `--color-fill-brand` → `--color-text-brand-vivid` (체크박스 아이콘). `:focus` → `:focus-visible` (옵션). ghost+error hover override 추가. 에러 Anatomy 트리거에 `aria-invalid` 추가. dropdown.md v0.3.0 → v0.4.0 (MINOR)
- Combobox: `--space-4` → `--space-gap-xs` (패널 offset). `--color-fill-brand` → `--color-text-brand-vivid` (체크박스 아이콘). `:focus` → `:focus-visible` (옵션). depends-on 미존재 파일 제거. `aria-live="polite"` empty state 추가. combobox.md v0.2.0 → v0.2.1 (PATCH)
- FormField: depends-on에 tokens/color.md·space.md·typography.md 추가. Primitive 토큰 의도 주석 보강. `div.dropdown` 중복 aria-invalid 제거. AI 주석에 Dropdown/Combobox label 연결 방식 추가. 접근성 유형 선언 업데이트. form-field.md v0.10.0 → v0.10.1 (PATCH)

### Added
- Color: `--color-action-brand-idle` 추가 (`rgba(22,109,238,0.12)`) — toggle off 트랙 배경 전용. color.md v1.0.0 → v1.1.0 (MINOR)
- Toggle: off 트랙 배경 `--color-action-brand-subtle` → `--color-action-brand-idle` 적용

### Changed
- Color: `button` 토큰 그룹 제거, `fill` 그룹으로 통합. `--color-button-brand/neutral/error` → `--color-fill-brand/neutral/error`. color.md v2.12.0 → v3.0.0 (MAJOR)
- Button: fill 토큰 참조 업데이트. button.md v2.0.0 → v2.0.1
- Checkbox / Radio / Toggle / Spinner / Badge / _index: fill 토큰 참조 업데이트 (각 PATCH)
- Progress: fill background `--color-text-brand-vivid` → `--color-fill-brand-vivid`. indeterminate shimmer 주석에 token 사용 의도 명시. AI 주석에 text-helper 출처 추가. progress.md v0.3.8 → v0.3.9
- Segment: 미선택 아이템 텍스트 `color-text-brand-vivid` → `color-text-brand-alpha` (blue-600 50%). segment.md v1.8.0 → v1.9.0
- Badge: brand tint 텍스트 `color-text-brand-vivid` → `color-text-brand` (600). badge.md v4.1.10 → v4.2.0
- Tag: brand 텍스트 `color-text-brand-vivid` → `color-text-brand` (600). tag.md v3.2.2 → v3.3.0
- Tag: shape(rect·pill)·size(sm·md) 차원 추가, ActionGroup과 동일한 rect 스타일 적용, 제거 버튼을 icon-button(icon-on--badge/sm)으로 교체, 사용 지침·AI 주석·Do/Don't 보완. tag.md v1.0.0 → v2.0.0
- Badge: AI 주석에 style 클래스 필수 여부 및 icon--badge 출처(utilities/icon.css) 명시. depends-on에 utilities/icon.css 추가. CSS에 line-height 의도 주석 추가. Do/Don't에 fill+line 동시 사용 금지 항목 추가. badge.md v4.1.9 → v4.1.10

### Added
- Color: `--color-fill-brand-vivid` 추가 — blue-500 범용 브랜드 solid fill 토큰 (버튼·프로그래스바 등). color.md v2.11.0 → v2.12.0
- Color: `--color-text-brand-alpha` 추가 — blue-600 50% 반투명 브랜드 텍스트 토큰. 브랜드 배경 위 미선택·보조 텍스트 계층 구분용 (Segment 미선택 아이템). color.md v2.10.0 → v2.11.0
- Color: `--color-text-body-alpha` 추가 — gray-950 50% 반투명 뉴트럴 텍스트 토큰. color.md v2.9.0 → v2.10.0
- Segment: `lg` 사이즈 추가(`segment--lg`). anatomy 사이즈 가로 정렬. segment.md v1.6.1 → v1.7.0
- Icon: `icon-check`, `icon-warning` 추가 — 입력 상태 표시 아이콘. sprite.svg, categories.json 반영
- Input: `## 동작` 섹션 신설 — 상태 전환 명세표 + 인터랙티브 데모(script). input.md v1.4.0 → v1.5.0
- Input: Anatomy 3분할 — 기본(default·ghost·readonly·disabled) / 상태(error·complete·success + 아이콘 + clearable 조합) / Addon. 상태 아이콘 color :has() CSS 추가
- build.py: `:::preview` 블록 내 `<script>` 지원 추가 — stage 스코프 IIFE로 실행
- Color: `--color-border-complete` 추가 — 에러 없는 입력 완료 테두리 토큰 (gray-500). color.md v2.2.0 → v2.3.0
- Color: `--color-text-success`, `--color-border-success` 추가 — 에러 수정 완료 상태 텍스트·테두리 토큰. color.md v2.1.0 → v2.2.0
- Input: `input--success` state 추가 — 에러 수정 완료, 초록 테두리·텍스트. input.md v1.3.0 → v1.4.0

### Changed
- Input: `input--complete` 색상 수정 — 초록(success) → 회색(`--color-border-complete`), 텍스트 색 오버라이드 제거. complete = 에러 없는 완료, success = 에러 수정 완료로 의미 분리. input.md v1.4.0

### Changed
- Input: style variant `input--line`(언더라인 오판) → `input--ghost`(border-transparent, hover 시 노출)로 교체. v1.1.0 → v1.2.0
- Input: style(box·ghost)·addon(icon-left·icon-right·clearable) variant 추가, 섹션 순서 재정비(개요→Variant→사용 지침→Anatomy→CSS→접근성→Do/Don't), CSS를 별도 섹션으로 분리, preview에서 inline style 제거. v1.0.0 → v1.1.0

### Added
- Icon(tokens): 조합형 CSS 변수 네이밍 규칙(`--icon-[이름]-[부분]`) 및 전체 변수 테이블, 진입 메뉴 아이콘 6종 변수 목록·color 모드 override 표 추가. tokens/icon.md v1.1.0
- Icon(component): `## 단색형 vs 조합형` 섹션 추가 — 유형별 마크업 패턴, 변수 상세는 tokens/icon.md로 위임. components/atoms/icon.md v1.4.1

### Changed
- Icon: 문서 구조 교정 — 섹션 순서 (개요→Variant→사용 지침→Anatomy→CSS→접근성→Do/Don't), `<style>` 블록 제거 후 `## CSS` 섹션 분리, CSS 하드코딩 px → 토큰 var() 교체. icon.md v1.1.0

### Added
- Color: `--color-action-light-hover/pressed/selected/overlay` 추가 — 어두운 배경 위 흰색 인터랙션 상태 토큰. color.md v2.1.0
- Icon: `icon-file-drop` 조합형 — `.icon--brand` 컨텍스트에서 `--icon-file-drop-bg: --color-action-brand-selected`, `.icon--dark` 컨텍스트에서 `--color-action-light-selected` 적용. icon.md v1.2.0
- Icon: badge 사이즈 variant 추가 (Variant 표·CSS)
- Icon: color 차원 추가 (brand · dark · white · disabled) — Variant 표·anatomy·CSS
- Icon: 사용 지침 섹션 추가 (decoration vs standalone vs 버튼 역할 선택 기준)
- Icon: anatomy에 data-component, anatomy-grid/row/label 패턴, 컬러·접근성 패턴 섹션 추가

### Added
- ActionGroup: `.action-group-label` 선택적 그룹 라벨 variant 추가. 텍스트 스타일은 `.text-form-label` 유틸리티 위임, 레이아웃·radius·구분선만 컴포넌트에서 정의. 라벨 있을 때 `aria-labelledby`로 접근성 처리. action-group.md v0.2.0

### Changed
- `--scale-interactive-hover`, `--scale-interactive-press` 제거 → `--translate-interactive-hover: -2px` 추가. scale hover는 GPU 합성 전환 시 폰트 렌더링 불일치 유발. motion.md v2.0.0
- Button: hover 모션 `scale(1.04)` → `translateY(-2px)` 변경

### Changed
- `--line-height-ui`: `var(--line-height-tight)` (1.25) → `1` — 한 줄 UI 세로 중앙 정렬 개선. Pretendard 폰트 메트릭 비대칭으로 인한 시각적 오프셋 해소. typography.md v1.1.0

### Added
- `--space-offset-focus: 2px` — 포커스 링 외곽 간격 토큰 (space.css Semantic)

### Changed
- `--color-background-brand/neutral/error` → `--color-button-brand/neutral/error` 토큰 그룹명 변경 (MAJOR). fill 배경·solid 텍스트·테두리 공용으로 의미 확장. color.md v2.0.0
- `--stroke-lg`: 5px → 4px. 지도 강조 레이어 + 인터랙션 hover/focus 링 공용으로 확장
- Button: hover `box-shadow` 스프레드 값 `4px` 하드코딩 → `var(--stroke-lg)` 토큰 적용

### Added
- Button: `btn--icon-left` · `btn--icon-right` · `btn--icon-only` variant 추가
- Button: `.btn-icon` 내부 아이콘 래퍼 클래스 추가
- `--scale-interactive-hover: 1.04` — 인터랙티브 요소 hover 확대 scale 토큰
- `--scale-interactive-press: 0.97` — 인터랙티브 요소 press 축소 scale 토큰 (예약)
- Button: hover 시 `transform: scale(var(--scale-interactive-hover))` 적용
