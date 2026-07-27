# Changelog

## [Unreleased]

### Added
- Banner: 신규 Molecule 컴포넌트 — 페이지·섹션 내 고정 노출되는 인라인 상태 메시지 바. Toast의 상태 스타일 체계(info·success·caution·error) 참고, 인라인(그림자·고정위치·자동소멸 없음)으로 적응. title·action(선택) 지원. 닫기 버튼은 두지 않음 — 지속 노출이 목적이므로 닫힘은 Toast의 역할로 분리(조건 해소 시 앱이 제거). 기존 product.md·alert.md가 참조만 하고 구현이 없던 컴포넌트를 정식 추가. build.py FILE_ORDER 등록. banner.md v0.1.0
- Color: `--color-text-inverse-alpha` 추가 (`color-mix(in srgb, var(--color-gray-0) 65%, transparent)`) — 어두운 배경(surface-dark) 위 흰 텍스트 계층 구분용. 툴팁 내 라벨/값처럼 같은 어두운 배경에서 계층이 필요할 때. `text-body-alpha`·`text-brand-alpha`의 inverse 대응. color.md v1.2.0 → v1.3.0 (MINOR)
- Table: 헤더고정(sticky header) 지원 — `<table>`에 `table--sticky-head` 추가 시 세로 스크롤에서 thead가 상단 고정. 스크롤 래퍼에 max-height 필요. 열고정과 조합 시 코너 z-index 자동 처리. data.md v0.6.2 → v0.7.0 (MINOR)
- Badge: `badge--disabled` 상태 variant 추가 — 비활성·비적용을 나타내는 시각 스타일(비인터랙티브 유지). tint·fill·line 전부 대응. 비활성 Tab 내 카운트 badge 등에서 하드코딩하던 disabled 색 처리를 표준화. badge.md v1.0.2 → v1.1.0 (MINOR)
- Tab: 신규 Molecule 컴포넌트 — tablist/tab/tabpanel 패턴. 상태(default·hover·selected·disabled)·badge 카운트·키보드 내비게이션. tab.md v0.1.0

### Fixed
- Table: `table__cell--fit` 문서와 구현 불일치 해소 — 문서가 "콘텐츠 폭 수축"으로 설명했으나, base `.table`가 `width:100%`이고 셀에 `overflow:hidden`이 걸려 있어 셀 CSS만으로는 auto 레이아웃에서 안정적 수축이 불가(explicit width는 콘텐츠 클리핑, 무지정은 균등 분배)함을 확인. 구현을 실제 역할(`white-space:nowrap` 줄바꿈 방지)에 맞게 문서를 정정하고, 콘텐츠 폭 고정이 필요하면 `table-layout:fixed` + 명시 width를 쓰도록 안내 추가.
- Table: 헤더 셀에 배경(`surface-neutral`) 명시 — sticky 헤더 지원용(기존 `thead` 배경과 동일 색이라 시각 변화 없음). table-cell.md v0.3.0 → v0.4.0 (MINOR)

### Changed
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
