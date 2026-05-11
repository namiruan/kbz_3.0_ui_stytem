---
name: design-token
description: KBZ 디자인 시스템의 토큰·유틸리티 클래스 추가·변경·제거 시 사용. 트리거 키워드 — "토큰 추가/수정/제거", "유틸리티 클래스 추가/변경/삭제", ".text-*", "색상/공간/타이포 토큰", "tokens/*.css 수정". 디자인 시스템 문서(`design-system/workflow/designer.md`)의 표준 흐름과 `design-system/tokens/_spec.md`의 작성 규칙, `design-system/governance.md`의 버전 규칙을 일관되게 적용한다.
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
