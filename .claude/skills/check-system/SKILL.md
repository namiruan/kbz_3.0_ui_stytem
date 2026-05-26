---
name: check-system
description: KBZ 디자인 시스템 전체 일관성 감사. 트리거 키워드 — "전체 점검", "일관성 검토", "시스템 감사", "전체 확인해줘".
---

# Check System Skill

## 0. 시작 전 — 반드시 읽기

| 순서 | 파일 | 용도 |
|------|------|------|
| 1 | `design-system/**/*.md` 전체 | 점검 본문 (CSS 코드 블록 + Anatomy 인라인 style) |
| 2 | `tokens.css` | 실제 존재하는 토큰 목록 및 deprecated 여부 |

## 1. 감사 항목

`design-system/**/*.md`의 CSS 코드 블록(` ```css ` ~ ` ``` `) 및 Anatomy preview 인라인 style을 파일별로 순서대로 검사한다. 항목을 임의로 건너뛰지 않는다.

### 토큰 직접 참조 위반
hex·rgba() 하드코딩, `--color-*-N` / `--space-N` 등 Primitive 토큰 직접 사용 — CSS 블록과 인라인 style 모두 확인

### 토큰 semantic 의미 오용
용도에 맞지 않는 Semantic 토큰 사용  
예: focus 전용 토큰(`--color-border-focus`)을 비-focus 상태(checked·selected 등)에 사용

### BEM 규칙 위반
약어 클래스명, 다른 컴포넌트와 네이밍 패턴 불일치

### 상태 누락
인터랙티브 컴포넌트에 default · hover · pressed · disabled 4상태 미정의

### 접근성 누락
focus ring 없음(전역 `*:focus-visible` 규칙으로 처리 여부 미확인 포함), 키보드 조작 미문서화, 필수 aria 속성 누락

### 컴포넌트 간 패턴 불일치
동일 계열 컴포넌트에서 구조·CSS 패턴이 다르게 처리된 경우  
예: checkbox와 radio의 hover ring 방식, control 크기 토큰 불일치

### deprecated 토큰 참조
`tokens.css`에서 deprecated 처리된 토큰을 아직 참조하는 컴포넌트

## 2. 출력 형식

위반 항목별로 아래 형식으로 보고한다. 위반 없는 항목은 생략한다.

```
[감사 항목] 파일명
문제: 구체적 내용 (해당 토큰명·클래스명·줄 명시)
수정안: 어떻게 바꿔야 하는지
```

전체 위반이 없으면 "이상 없음"으로 종료.

## 3. 수정 여부

감사 결과를 먼저 보고한다. **수정은 사용자 확인 후 진행**한다.  
단, "점검하고 수정해줘"처럼 수정까지 명시적으로 요청한 경우 확인 없이 진행한다.

## 4. 절대 하지 말 것

- 감사 항목 임의 생략
- 파일 일부만 검사하고 전체 완료로 처리
- 수정 전 영향 범위 파악 생략
- 버전 업데이트 누락 (수정 시 `governance.md` 기준 적용)
