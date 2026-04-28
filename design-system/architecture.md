---
file: architecture.md
version: 0.4.1
---

# 컴포넌트 아키텍처

## Variant 모델

모든 컴포넌트는 아래 차원의 조합으로 정의한다.

```
컴포넌트 = type × style × size × state × icon(optional)
```

### Do / Don't

```css
/* ✅ DO — full name 사용 */
.btn--primary-fill  .btn--md  .btn--round

/* ❌ DON'T — 약어 사용 */
.btn--pr-fl  .btn--m  .btn--r
```

### 상태 완전성 — 모든 인터랙티브 컴포넌트에 필수

```
default  ·  hover  ·  pressed  ·  disabled
```

추가: `focus`(키보드) · `loading`(비동기)

## 컴포넌트 계층

시스템 기반(토큰·공간·색상·타이포·elevation·모션·아이콘)이 모두 정의된 후 컴포넌트를 분류한다.

```
Atom  →  Molecule  →  Organism  →  Pattern
```

| 레이어 | 기준 | 예시 |
|--------|------|------|
| **Atom** | 분해 불가, 의존성 없음 | Button · Input · Badge · Toggle · Icon |
| **Molecule** | Atom 2개+ 결합, 단일 기능 | FormField · SearchBar · Dropdown |
| **Organism** | 자체 레이아웃 보유 | Table · SidebarNav · Card · TopNav |
| **Pattern** | 페이지 수준 구조 | Dashboard · ListPage · DetailPage |

> ⚠️ 하위 레이어가 상위를 import 금지. Molecule은 Atom만 포함.
