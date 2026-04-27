---
file: accessibility.md
version: 0.4.0
---

# 접근성

> **언제 참조하나:** 모든 컴포넌트 작업자. 정의서 작성 시 체크리스트로 활용.

WCAG 2.1 AA 준수. 컴포넌트 정의서 마지막 섹션 "접근성 체크리스트"는 아래 항목으로 구성한다.

## 키보드

- 모든 인터랙티브 요소는 Tab으로 도달 가능
- focus 순서는 시각적 순서와 일치
- 모달·드롭다운은 focus trap 적용. ESC로 닫기
- 페이지 시작에 "본문으로 건너뛰기" skip link

## 스크린리더

- 단독 아이콘 버튼: `aria-label` 필수
- 폼 필드: `<label>` 또는 `aria-labelledby`
- 에러 메시지: `aria-describedby`로 필드와 연결, 즉각 알림은 `role="alert"`
- 동적 영역: `aria-live="polite"` (변경) 또는 `assertive` (긴급)
- 장식용 아이콘: `aria-hidden="true"`

## 시각

- 텍스트-배경 대비 최소 **4.5:1** (큰 텍스트 18pt 이상은 3:1)
- focus ring `--color-border-focus` 반드시 가시. `outline: none` 단독 사용 금지
- 색상만으로 의미 전달 금지. 텍스트·아이콘·패턴 병행
- 본문 텍스트 크기 최소 13px

## 모션

- `prefers-reduced-motion: reduce` 대응 필수 (`tokens/motion.md` 참조)
- 깜빡임 초당 3회 이하 (광과민성 발작 예방)

> ⚠️ 접근성은 사후 추가가 아니라 컴포넌트 정의 단계의 기본 요건이다.
> ⚠️ 정의서의 "접근성 체크리스트" 섹션은 위 4영역(키보드·스크린리더·시각·모션)을 모두 커버해야 한다.
