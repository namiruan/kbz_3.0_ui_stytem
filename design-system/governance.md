---
file: governance.md
version: 0.5.0
---

# 문서 규칙 & 버전 관리

> **언제 참조하나:** 시스템 유지보수자, 기여자 전원

## 문서 유형

이 시스템의 `.md` 파일은 두 가지 유형으로 구분한다.

| 유형 | 해당 파일 | 설명 |
|------|----------|------|
| **시스템 정의 문서** | `README.md` · `governance.md` · `tokens/*.md` · `adaptation.md` · `product.md` · `accessibility.md` · `architecture.md` · `workflow/*.md` | 디자인 원칙·토큰·패턴·워크플로우 정의 |
| **컴포넌트 정의 문서** | `components/*.md` (향후) | 개별 UI 컴포넌트 스펙 정의 |

아래 각 규칙이 어느 유형에 적용되는지 명시한다.

---

## 문서 헤더

### 시스템 정의 문서

최상단에 `file`과 `version`만 포함한다.

```yaml
---
file: tokens/color.md
version: 0.3.0
---
```

### 컴포넌트 정의 문서

최상단에 아래 필드를 모두 포함한다.

```yaml
---
component: Button
version:   0.1.0
status:    draft | stable | deprecated
figma-node: 606-2968
updated:   2025-06-01
---
```

| 필드 | 작성 기준 | 언제 업데이트 |
|------|----------|-------------|
| `version` | 정의서 변경 범위 | 내용이 바뀔 때마다 |
| `status` | 팀 합의 여부 | 리뷰 통과 시 draft → stable |
| `figma-node` | Figma 원본 컴포넌트 노드 ID | Figma 컴포넌트 구조가 바뀔 때 |

---

## 섹션 순서

> ⚠️ **컴포넌트 정의 문서**에만 적용. 순서 고정. 변경 금지.

```
## 용도  →  ## 규칙  →  ## 스펙  →  ## 코드  →  ## 접근성 체크리스트
```

---

## 버전 규칙

> ✅ **모든 문서**에 적용. Semantic Versioning (MAJOR.MINOR.PATCH)

| 버전 | 자리 | 기준 | 해당하는 변경 |
|------|------|------|-------------|
| **MAJOR** | 첫째 | 기존 코드가 깨지는 변경 | 클래스명·토큰명 변경, variant 제거 |
| **MINOR** | 둘째 | 기존 코드 유지 + 기능 추가 | 새 variant·상태·토큰 추가 |
| **PATCH** | 셋째 | 스펙 변경 없는 문서 수정 | 오탈자·설명·예시 수정 |

```
# MAJOR — 기존 코드를 다시 수정해야 함
0.2.0  →  1.0.0   .btn--primary 클래스명이 .btn--brand로 변경됨

# MINOR — 기존 코드는 그대로, 새 기능만 추가됨
0.1.0  →  0.2.0   ghost variant 추가

# PATCH — 코드와 스펙 변경 없음
0.1.0  →  0.1.1   설명 오탈자 수정
```

> 💡 **판단 기준:** "이 변경으로 기존에 만들어진 코드를 다시 수정해야 하는가?"
> YES → MAJOR  /  새 기능 추가 → MINOR  /  문서만 수정 → PATCH

변경 절차: `CHANGELOG.md [Unreleased]` 기록 → 헤더 업데이트 → 릴리즈 시 git tag.

---

## Deprecation 정책

> ✅ **컴포넌트 정의 문서**에만 적용.

`status: deprecated` 선언 후 최소 1 MAJOR 버전 동안 유지한다.

| 단계 | 액션 |
|------|------|
| Deprecate | `status: deprecated` 변경, 헤더에 대체 컴포넌트 명시, CHANGELOG 기록 |
| 유지 | 신규 사용 금지. 기존 사용처는 다음 MAJOR까지 마이그레이션 |
| 제거 | 다음 MAJOR 릴리즈에서 제거. 정의서·코드 동시 삭제 |

```yaml
---
component: OldButton
status:        deprecated
deprecated-since: 1.2.0
replaced-by:   Button
remove-at:     2.0.0
---
```

> ⚠️ Deprecate 즉시 제거 금지. 사용처가 마이그레이션할 시간을 보장한다.
