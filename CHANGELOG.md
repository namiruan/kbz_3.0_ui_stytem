# Changelog

## [Unreleased]

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
