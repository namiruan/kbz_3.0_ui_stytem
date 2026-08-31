# Changelog

## [Unreleased]

### Added
- ContentList: 신규 Organism 컴포넌트 — 게시판·자료실처럼 읽을거리를 나열하는 목록. REQ-001 우선순위 1의 첫 구현. 정보 테이블(`table--info`)의 시각 톤(좌우 라인·radius 없이 상하 구분선만, 줄바꿈 허용, `.table` 기본 행 높이)을 채택하고, 컬럼 헤더와 "hover 없음"은 채택하지 않는다 — 행 전체가 링크이고 컬럼이 남으면 `sm`에서 접히지 않기 때문. 링크는 제목만 감싸고 행 전체 클릭은 `::after` 오버레이가 담당한다(스크린리더 링크명에 메타가 섞이지 않도록). layout(row·stack) · header · excerpt · 신규 표시 variant. `sm`에서 세로 스택 reflow. build.py FILE_ORDER 등록. content-list.md v0.1.0
- 컴포넌트 추가 요청 문서 신설 — `components/_requests.md`. 시스템에 없어 프로토타입을 막는 컴포넌트를 접수하는 백로그. 첫 항목으로 REQ-001 콘텐츠(읽을거리) 계열 접수: Card·ContentList·ContentHeader·ContentBody·AttachmentList(우선순위 1), PageHeader·ContentNav(2), ListPage·DetailPage Pattern(3). 모바일 지원 범위·밀도 정책·표/게시판 구분 결정을 반영. _requests.md v0.3.0
- Banner: 신규 Molecule 컴포넌트 — 페이지·섹션 내 고정 노출되는 인라인 상태 메시지 바. Toast의 상태 스타일 체계(info·success·caution·error) 참고, 인라인(그림자·고정위치·자동소멸 없음)으로 적응. title·action(선택) 지원. 닫기 버튼은 두지 않음 — 지속 노출이 목적이므로 닫힘은 Toast의 역할로 분리(조건 해소 시 앱이 제거). 기존 product.md·alert.md가 참조만 하고 구현이 없던 컴포넌트를 정식 추가. build.py FILE_ORDER 등록. banner.md v0.1.0
- Color: `--color-text-inverse-alpha` 추가 (`color-mix(in srgb, var(--color-gray-0) 65%, transparent)`) — 어두운 배경(surface-dark) 위 흰 텍스트 계층 구분용. 툴팁 내 라벨/값처럼 같은 어두운 배경에서 계층이 필요할 때. `text-body-alpha`·`text-brand-alpha`의 inverse 대응. color.md v1.2.0 → v1.3.0 (MINOR)
- Table: 헤더고정(sticky header) 지원 — `<table>`에 `table--sticky-head` 추가 시 세로 스크롤에서 thead가 상단 고정. 스크롤 래퍼에 max-height 필요. 열고정과 조합 시 코너 z-index 자동 처리. data.md v0.6.2 → v0.7.0 (MINOR)
- Badge: `badge--disabled` 상태 variant 추가 — 비활성·비적용을 나타내는 시각 스타일(비인터랙티브 유지). tint·fill·line 전부 대응. 비활성 Tab 내 카운트 badge 등에서 하드코딩하던 disabled 색 처리를 표준화. badge.md v1.0.2 → v1.1.0 (MINOR)
- Tab: 신규 Molecule 컴포넌트 — tablist/tab/tabpanel 패턴. 상태(default·hover·selected·disabled)·badge 카운트·키보드 내비게이션. tab.md v0.1.0

### Fixed
- 뷰어: preview 중화 블록의 명시도 수정 — `.component-preview-stage li`(0,1,1)로 두면 컴포넌트 클래스(0,1,0)까지 눌러 ContentList 행의 좌우 padding이 사라졌다. `:where(.component-preview-stage)`로 감싸 (0,0,1)로 낮추고 문서 규칙 전체보다 뒤에 배치했다. 문서 규칙과 같은 명시도에서 순서로 이기고, 컴포넌트 클래스는 둘 다 이긴다.
- 뷰어: 문서용 마크다운 스타일이 컴포넌트 preview로 새던 문제 수정. `.md`의 엘리먼트 규칙(`p`·`ul`·`ol`·`li`·`code`·`em`·`strong`·`blockquote`)을 h1~h3·a와 동일하게 `:where()`로 감싸 명시도를 낮추고, `.component-preview-stage` 안에서 문서 장식을 명시적으로 되돌리는 중화 블록을 추가. 명시도를 낮추는 것만으로는 부족하다 — `:where(.md) li`(0,0,1)가 components.css의 전역 리셋 `*`(0,0,0)을 여전히 이겨 ContentList 행 아래에 `margin-bottom: 4px`가 남았고, hover 배경과 구분선 사이에 틈이 생겼다. `:where(.md) a`의 `border-bottom`(문서 링크 장식)이 컴포넌트 링크에 남아 제목 아래 가로선이 생기던 문제도 같은 블록에서 차단. ContentList에서 처음 드러났으나 `<ul>`·`<a>`를 쓰는 모든 컴포넌트(Dropdown·Combobox·Table의 `.link` 등)에 해당하던 버그다. preview는 프로토타입(tokens.css + components.css)과 같은 결과가 나와야 하며, 문서 스타일이 남으면 그 차이를 컴포넌트 버그로 오해하게 된다.
- Table: `table__cell--fit` 문서와 구현 불일치 해소 — 문서가 "콘텐츠 폭 수축"으로 설명했으나, base `.table`가 `width:100%`이고 셀에 `overflow:hidden`이 걸려 있어 셀 CSS만으로는 auto 레이아웃에서 안정적 수축이 불가(explicit width는 콘텐츠 클리핑, 무지정은 균등 분배)함을 확인. 구현을 실제 역할(`white-space:nowrap` 줄바꿈 방지)에 맞게 문서를 정정하고, 콘텐츠 폭 고정이 필요하면 `table-layout:fixed` + 명시 width를 쓰도록 안내 추가.
- Table: 헤더 셀에 배경(`surface-neutral`) 명시 — sticky 헤더 지원용(기존 `thead` 배경과 동일 색이라 시각 변화 없음). table-cell.md v0.3.0 → v0.4.0 (MINOR)

### Changed
- ContentList: 한 줄 행 높이를 `.table` 기본 행(36px)과 정확히 일치시킴 — 세로 padding `--space-8` → `--space-6`. 기존 값은 39px라 표와 나란히 놓았을 때 행 높이가 어긋났다. hover 배경을 `--color-action-neutral-hover` → `--color-action-brand-subtle`로 변경 — 데이터 테이블 행 hover와 같은 토큰. "이 행은 누를 수 있다"는 신호를 시스템 전체에서 통일하고, neutral 계열이 `badge--neutral`(surface-neutral)과 겹쳐 hover 시 분야 칩이 사라져 보이던 문제도 해소. content-list.md v0.1.0 → v0.2.0 (MINOR)
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
