---
name: check-token
description: KBZ 디자인 시스템의 토큰·유틸리티 클래스 추가·변경·제거 시 사용. 트리거 키워드 — "토큰 추가/수정/제거", "유틸리티 클래스 추가/변경/삭제", ".text-*", "색상/공간/타이포 토큰", "tokens/*.css 수정".
---

# Design Token Skill

KBZ 디자인 시스템(`design-system/`)의 토큰·유틸리티 클래스를 다룰 때 사용한다.
**규칙의 단일 정보 소스는 아래 md 파일들이다. 이 스킬은 라우터 역할만 한다.**

## 0. 시작 전 — 항상 읽기

| 순서 | 파일 | 용도 |
|------|------|------|
| 1 | `design-system/workflow/designer.md` § 요청 분류 | 어떤 흐름을 탈지 결정 |
| 2 | `design-system/tokens/_spec.md` | md 문서 작성 형식 (Primitive/Semantic/Utility/Do·Don't 섹션) |
| 3 | `design-system/governance.md` | 버전 규칙 (MAJOR/MINOR/PATCH) |
| 4 | `design-system/tokens/_index.md` | 3-tier 아키텍처 |

## 1. 요청 분류 → 흐름 선택

`designer.md` § 요청 분류 표를 따른다. 토큰·유틸리티 관련 6가지 흐름:

| 요청 | designer.md 섹션 |
|------|------------------|
| 토큰 추가 | `## 토큰 > 새 토큰 추가` |
| 토큰 변경 | `## 토큰 > 기존 토큰 변경` |
| 토큰 제거 | `## 토큰 > 토큰 제거` |
| 유틸리티 추가 | `## 유틸리티 클래스 > 새 유틸리티 클래스 추가` |
| 유틸리티 변경 | `## 유틸리티 클래스 > 기존 유틸리티 변경` |
| 유틸리티 제거 | `## 유틸리티 클래스 > 유틸리티 제거` |

각 흐름의 **작업 단계**를 그대로 수행한다. 단계를 임의로 건너뛰지 않는다.

## 2. 문서 동기화 체크리스트

흐름이 끝나면 아래를 모두 확인한다.

- [ ] `tokens/*.css` 수정 — Semantic/Utility 토큰 추가·변경
- [ ] `tokens/*.css` 주석 동기화 — `_spec.md § CSS 파일 동기화 규칙` 참조
  - Semantic 토큰 주석에 사용처 명시
  - Utility 카테고리 블록 주석에 현행 클래스명 반영
- [ ] `design-system/tokens/*.md` 갱신 — `_spec.md`의 섹션 순서(Primitive → Semantic → Utility → Do/Don't) 준수
- [ ] 해당 md 헤더 `version` 업데이트 — `governance.md` 규칙대로
  - MAJOR: 토큰명·클래스명 변경, variant 제거
  - MINOR: 새 토큰·variant·상태 추가
  - PATCH: 설명·예시·오탈자 수정
- [ ] `CHANGELOG.md [Unreleased]` 기록
- [ ] `build.py` FILE_ORDER 확인 — 새 md 파일을 추가했다면 등록 필요
- [ ] `python3 build.py` 실행 — `design-system.html` 재생성

## 2-1. AI 활용 가능성 체크리스트
토큰 문서를 읽은 AI가 올바른 토큰을 선택할 수 있는지 확인한다.

- [ ] CSS 주석이 "언제 이 토큰을 쓰는가"를 구체적으로 명시 — 사용처가 모호하거나 "스케일 예약" 수준에 그치지 않는가
- [ ] 유사 토큰 간 선택 기준이 명확한가 — 예: `inset` vs `gap` vs `generic` 중 어떤 상황에 무엇을 쓰는지 Do/Don't 또는 주석으로 설명되어 있는가
- [ ] 토큰명이 의미를 충분히 전달하는가 — 약어·맥락 없는 이름으로 인해 오용 가능성이 있는가
- [ ] 금지 사용 패턴이 Do/Don't에 명시되어 있는가 — 예: Primitive 직접 참조, hex 사용, 의미 외 용도 사용

## 3. 절대 하지 말 것

- `_spec.md` 섹션 순서 변경
- 토큰명 직접 사용 (Component CSS에서) — 반드시 var(--token-name)
- 버전 헤더 갱신 누락
- CSS 주석을 stale 상태로 방치
- 한 흐름 안의 단계를 건너뛰기

## 4. 출력 형식

`designer.md § 출력 형식`을 따른다. 변경 인계 시 다음을 포함:
- 변경된 파일 목록
- 버전 변경 (이전 → 이후) 및 사유 (MAJOR/MINOR/PATCH)
- CHANGELOG 엔트리
- 후속 작업 (HTML 재빌드 여부 등)
