---
name: check-component
description: KBZ 디자인 시스템 컴포넌트 문서(.md) 점검. 트리거 키워드 — "점검해줘", "검토해줘", "이 코드 맞아?", "문서 확인해줘".
---

# Component Review Skill

## 0. 시작 전 — 반드시 읽기

| 순서 | 파일 | 용도 |
|------|------|------|
| 1 | `design-system/components/_spec.md` | 섹션 순서·필수 여부 기준 |
| 2 | `design-system/components/_index.md` | 구조·네이밍 아키텍처 |
| 3 | `design-system/governance.md` | 버전 규칙 |
| 4 | `tokens/color.css` · `tokens/space.css` · `tokens/icon.css` · `tokens/stroke.css` | 실제 존재하는 토큰 목록 |
| 5 | 점검 대상 컴포넌트 `.md` | 점검 본문 |
| 6 | 유사 계열 컴포넌트 `.md` (있으면) | 패턴 일관성 비교 |

## 1. 체크리스트

항목을 순서대로 모두 실행한다. 위반 사항만 보고한다.

### 문서 구조
- [ ] 레이어 확인 후 섹션 순서 점검
  - Atom · Molecule: `개요 → Variant → 사용 지침(조건부) → 동작(조건부) → Anatomy → CSS → 토큰 바인딩(조건부) → 접근성 → Do/Don't`
  - Organism: `개요 → Variant → 사용 지침(필수) → CSS(조건부) → 접근성 → Do/Don't`
- [ ] Organism에 `## 동작` · `## Anatomy` 섹션이 있으면 위반 (사용하지 않음)
- [ ] 필수 섹션 누락 없음 (`_spec.md` 필수/조건부 기준으로 판단. Organism `## 사용 지침`은 필수)
- [ ] frontmatter `version` 변경 유형에 맞게 업데이트됨 (`governance.md` 기준)
- [ ] `depends-on`에 실제 사용 토큰 파일 모두 포함

### 토큰 사용
- [ ] CSS 블록에 hex·rgba() 하드코딩 없음 (모두 토큰 경유)
- [ ] Anatomy preview 인라인 style에도 Primitive 토큰 직접 참조 없음 (`--space-N`, `--color-*-N` 등)
- [ ] 토큰 semantic 의미 적합성 — 존재하는 토큰이라도 용도가 맞는지 확인 (예: focus 전용 토큰을 비-focus 상태에 사용하지 않음)
- [ ] `tokens/*.css`에 실제 존재하는 토큰만 참조

### CSS 구조
- [ ] padding으로 height 만들지 않음 (height 토큰 + align-items)
- [ ] 모든 인터랙티브에 3상태 정의 (default · hover · disabled) — pressed는 B2B 웹 마우스 환경에서 순간적이라 생략. form control(radio·checkbox)은 클릭 피드백을 selected 전환으로 대체하므로 동일 기준 적용
- [ ] focus ring 가시 (`outline: none` 단독 사용 금지, 또는 전역 `*:focus-visible` 규칙으로 처리됨을 주석으로 명시)
- [ ] BEM 클래스명 full name 사용 (약어 금지)
- [ ] `position: absolute` 사용 시 부모에 `position: relative` 여부 확인
- [ ] 비직관적 CSS 패턴(currentColor 간접 전달, calc(), z-index 등)에 의도 설명 주석 있음
- [ ] 유사 계열 컴포넌트와 구조·토큰 사용 패턴 일관성 (예: checkbox↔radio)

### 접근성
- [ ] 색상만으로 상태 구분 안 함 (텍스트·아이콘 병행)
- [ ] 단독 아이콘 버튼에 `aria-label`
- [ ] 접근성 표에 키보드 조작 행 있음
- [ ] 접근성 표에 disabled·error·그룹 등 해당 상태의 aria 속성 모두 포함

### AI 주석
- [ ] `<!-- AI: -->` 주석이 root·구조·상태·그룹 패턴을 충분히 설명
- [ ] 비표준 패턴(appearance:none, indeterminate 의도적 미표시 등) 주석으로 근거 명시

### AI 활용 가능성 — 프로토타입 생성 기준
이 문서를 읽은 AI가 올바른 마크업을 생성할 수 있는지 확인한다.
- [ ] 문서만으로 완전한 HTML 생성 가능 — 클래스 조합 방식, 필수 자식 요소, 조건부 속성(aria-* 등)이 명시되어 있는가
- [ ] 금지 조합·대체 컴포넌트가 Do/Don't에 명시되어 있는가 (예: 인터랙티브 용도 → Tag 사용)
- [ ] 조건부 사용이 명확한가 — 특정 variant에서만 유효한 클래스·속성이 조건과 함께 설명되어 있는가 (예: pulse는 fill과만 사용)
- [ ] 외부 의존성이 명시되어 있는가 — sprite 경로, 유틸리티 클래스 출처 등 문서 외부 참조가 필요한 경우 명확히 안내되어 있는가
- [ ] 오용 가능성이 높은 패턴에 주석 또는 Do/Don't가 있는가 (예: fill 배경에 button 토큰 사용 금지)

## 2. 출력 형식

```
[카테고리] 항목명
문제: 구체적 내용
수정안: 어떻게 바꿔야 하는지
```

- 문제 없으면 해당 항목 "이상 없음"
- 확실하지 않으면 "확인 필요"로 표시
- 거짓 양성(설계 의도가 명확한 경우)은 근거와 함께 "의도된 설계"로 표시

## 3. 수정 여부

점검 결과를 먼저 보고한다. **수정은 사용자 확인 후 진행**한다.
단, "점검하고 수정해줘"처럼 수정까지 명시적으로 요청한 경우 확인 없이 진행한다.

## 4. 절대 하지 말 것

- 체크리스트 항목 임의 생략
- 설계 의도 없이 거짓 양성 통과 처리
- 수정 전 영향 범위 파악 생략
- 버전 업데이트 누락 (수정 시 `governance.md` 기준 적용)
