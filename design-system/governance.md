---
file: governance.md
version: 0.6.2
---

# 문서 규칙 & 버전 관리

## 문서 헤더

최상단에 `file`과 `version`만 포함한다.

```yaml
---
file: tokens/color.md
version: 0.3.0
---
```

---

## 버전 규칙

Semantic Versioning (MAJOR.MINOR.PATCH)

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
