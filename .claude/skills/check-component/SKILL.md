---
name: check-component
description: KBZ 디자인 시스템 컴포넌트 문서(.md) 점검. 트리거 키워드 — "점검해줘", "검토해줘", "이 코드 맞아?", "문서 확인해줘".
---

# Component Review Skill

## 0. 시작 전 — 반드시 읽기

점검 대상의 레이어를 먼저 확인하고, 해당 레이어에 맞는 참조 파일을 모두 읽은 뒤 점검을 시작한다.

| 순서 | 파일 | 해당 레이어 | 용도 |
|------|------|------------|------|
| 1 | `design-system/components/_spec.md` | 전체 | 섹션 순서·필수 여부 기준 |
| 2 | `design-system/components/_index.md` | 전체 | 구조·네이밍 아키텍처 |
| 3 | `design-system/governance.md` | 전체 | 버전 규칙 |
| 4 | `tokens/color.css` · `tokens/space.css` · `tokens/icon.css` · `tokens/stroke.css` · `tokens/typography.css` | 전체 | 실제 존재하는 토큰·유틸 클래스 목록 |
| 5 | 점검 대상 컴포넌트 `.md` | 전체 | 점검 본문 |
| 6 | 유사 계열 컴포넌트 `.md` (있으면) | 전체 | 패턴 일관성 비교 |
| 7 | frontmatter `depends-on`에 나열된 **atoms `.md`** | Molecule · Organism | preview HTML에서 atom 마크업 검증 기준 |
| 8 | frontmatter `depends-on`에 나열된 **molecules `.md`** | Organism | preview HTML에서 molecule 마크업 검증 기준 |

> **레이어별 핵심 원칙**
> - **Atom**: 토큰만 참조. CSS와 preview 모두 토큰 경유, 인라인 하드코딩 없음.
> - **Molecule**: atom 문서를 읽고, preview HTML이 atom 마크업 규칙을 따르는지 검증.
> - **Organism**: atom + molecule 문서를 읽고, preview HTML이 각 컴포넌트 마크업 규칙을 따르는지 검증.
>
> 7·8번을 생략하면 하위 단위 오용을 발견할 수 없다. Molecule·Organism 점검 시 반드시 읽을 것.

---

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
- [ ] **Molecule·Organism** `depends-on`에 preview에서 사용한 하위 컴포넌트 `.md` 파일이 모두 포함되어 있는가 (Molecule → atoms, Organism → atoms + molecules)

### 토큰 사용
- [ ] CSS 블록에 hex·rgba() 하드코딩 없음 (모두 토큰 경유)
- [ ] preview·Anatomy 인라인 `style`에 Primitive 토큰 직접 참조 없음 (`--space-N`, `--color-*-N` 등)
- [ ] 인라인 `style`로 타이포그래피를 지정하지 않음 — `style="font-size:..."` 대신 `tokens/typography.css`의 `.text-*` 유틸 클래스 사용 (모든 레이어 공통)
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

### 하위 단위 검증 — Molecule · Organism
Molecule은 atom 문서, Organism은 atom + molecule 문서를 읽은 뒤 아래를 검증한다.
Atom은 이 섹션을 건너뛴다.

- [ ] preview HTML에서 사용된 각 하위 컴포넌트의 클래스·구조가 해당 컴포넌트 문서와 일치하는가
  - 존재하지 않는 modifier 사용 여부 확인 (예: `input--md`는 없음 — 유효 크기는 xs/sm/기본)
  - 네이티브 요소로 컴포넌트를 대체하지 않았는가 (예: `<select class="input">` 대신 dropdown.md의 `dropdown--button` 구조)
  - 컴포넌트 전용 클래스를 잘못된 맥락에 사용하지 않았는가 (예: `text-button-*`은 btn--[size] 내부 전용 — btn--[size]가 이미 폰트 포함)
- [ ] AI 힌트가 사용될 하위 컴포넌트별 올바른 마크업 패턴을 명시하는가
  - 단순 구조 설명만 있고 "어떤 UI 요소에 어떤 컴포넌트 문서를 따르라"는 지침이 없으면 위반
  - 예: "라벨은 form-field.md의 `form-field__label text-form-label`", "선택 컨트롤은 dropdown.md 구조, 네이티브 `<select>` 금지"

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

---

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
- Molecule·Organism 점검 시 하위 컴포넌트 문서를 읽지 않고 마크업 정합성 판단
- 설계 의도 없이 거짓 양성 통과 처리
- 수정 전 영향 범위 파악 생략
- 버전 업데이트 누락 (수정 시 `governance.md` 기준 적용)
