---
file: accessibility.md
version: 0.5.4
---

# 접근성

WCAG 2.1 AA 준수.

---

## 시스템 공통

페이지·레이아웃 수준에서 전역으로 적용한다.

| 영역 | 규칙 |
|------|------|
| 키보드 | focus 순서는 시각적 순서와 일치 |
| 시각 | 색상만으로 의미 전달 금지. 텍스트·아이콘·패턴 병행. 본문 텍스트 최소 13px |
| 모션 | `prefers-reduced-motion: reduce` 대응 필수 (`tokens/motion.md` 참조). 깜빡임 초당 3회 이하 |

---

## 컴포넌트 공통 필수

모든 인터랙티브 컴포넌트에 적용한다.

| 항목 | 구현 규칙 |
|------|----------|
| 키보드 접근 | `Tab`으로 도달 가능 |
| focus 표시 | `:focus-visible`에 `outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px`<br>`:focus` 단독 사용 금지 |
| disabled | 네이티브 요소: `disabled` + `aria-disabled="true"` + `tabindex="-1"`<br>커스텀 요소: `aria-disabled="true"` + `tabindex="-1"` |
| 색상 대비 | 텍스트 4.5:1 이상 (WCAG AA). 대형 텍스트·아이콘 3:1 이상 |
| 아이콘 전용 | `aria-label` 필수. SVG에 `aria-hidden="true"` |
| loading 상태 | `aria-busy="true"` + 스크린리더용 숨김 텍스트(`.sr-only`)<br>문구 규칙은 `product.md` 로딩 메시지 참조. 각 컴포넌트 문서에서 문구 예시 명시 |
| 에러 메시지 | `aria-describedby`로 필드와 연결. 즉각 알림은 `role="alert"` + `aria-invalid="true"`<br>문구 규칙은 `product.md` 에러 메시지 참조 |
| 동적 영역 | `aria-live="polite"` (변경) 또는 `assertive` (긴급) |

---

## 컴포넌트 유형별 ARIA·키보드 패턴

컴포넌트 문서 `## 접근성` 섹션에서 해당 유형 행을 참조한다.

| 컴포넌트 유형 | 필수 ARIA | 키보드 인터랙션 |
|-------------|----------|--------------|
| 버튼 | `<button>` 네이티브 권장. 불가 시 `role="button"` | `Enter`·`Space` 활성화 |
| 텍스트 인풋 | `<label>` 연결 또는 `aria-label` | — |
| 드롭다운 | `aria-expanded`, `aria-haspopup="listbox"` | `Enter` 열기, `Esc` 닫기, `↑↓` 이동 |
| 모달 | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | `Esc` 닫기, FocusTrap 필수 |
| 체크박스·라디오 그룹 | `<fieldset>` + `<legend>` | `Space` 토글 |
| 토스트·알림 | `role="status"` (비긴급) 또는 `role="alert"` (긴급) | — |
| 탭 | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` | `←→` 탭 전환, `Tab`으로 패널 진입 |
| 토글·스위치 | `role="switch"`, `aria-checked` | `Space` 토글 |
