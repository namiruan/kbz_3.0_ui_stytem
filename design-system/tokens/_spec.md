---
file: tokens/_spec.md
version: 0.1.0
---

# 토큰 정의 문서 작성 규칙

## 문서 헤더

최상단에 아래 필드를 포함한다.

```yaml
---
file: tokens/[name].md
version:    0.1.0
depends-on: tokens/_index.md
---
```

| 필드 | 작성 기준 | 언제 업데이트 |
|------|----------|-------------|
| `version` | 정의서 변경 범위 (Semantic Versioning) | 내용이 바뀔 때마다. 규칙은 `governance.md` |
| `depends-on` | 참조하는 상위 문서 | 의존성이 바뀔 때 |

---

## 섹션 순서

> ⚠️ 순서 고정. 변경 금지. Primitive·Utility는 해당 토큰에 없으면 생략 가능.

```
## Primitive  →  ## Semantic  →  ## Utility  →  ## Do / Don't
```

| 섹션 | 필수 | 비고 |
|------|------|------|
| `## Primitive` | 선택 | 원시값이 존재할 때만 작성. radius·shadow·motion처럼 Semantic만 있는 토큰은 생략 |
| `## Semantic` | 필수 | 모든 토큰 문서에 작성 |
| `## Utility` | 선택 | use case별 묶음 클래스가 있을 때만 작성 (예: typography `.text-*`) |
| `## Do / Don't` | 필수 | 모든 토큰 문서에 작성 |

---

## Primitive 섹션 형식

원시값 카테고리별로 `###`으로 분기. 한 줄 설명 + 디렉티브 또는 인라인 표.

**디렉티브 사용** (HTML 뷰어 렌더링용):

```md
### Blue
주요 브랜드 컬러. CTA 버튼, 링크, 포커스 링.
:::palette blue
```

| 디렉티브 | 사용처 |
|---------|--------|
| `:::palette [이름]` | color (50–950 스케일) |
| `:::scale [속성]` | font-size·font-weight·line-height·letter-spacing·space·height 등 수치 스케일 |

**디렉티브가 없는 경우** — 인라인 표:

```md
| 토큰 | 값 |
|------|-----|
| `--radius-4` | 4px |
```

---

## Semantic 섹션 형식

`| 그룹 | 사용처 | 토큰 |` 3컬럼이 표준.

```md
| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| `surface` | 중립 배경 | `--color-surface-base`, `--color-surface-subtle` |
| `text` | 본문·UI 텍스트 | `--color-text-body`, `--color-text-display` |
```

**컬럼 규칙:**
- `그룹` — 토큰명 중간 키워드 (`surface`, `text`, `inset`, `gap` 등)
- `사용처` — 한 줄 설명. 무엇을 위한 그룹인지 명확히
- `토큰` — 백틱으로 감싸고 쉼표로 나열

> typography처럼 축이 여러 개인 토큰은 첫 컬럼명을 `축`으로 바꿔도 됨.

---

## Utility 섹션 형식

Semantic 토큰을 use case 단위로 묶은 클래스가 있을 때만 작성. 3컬럼 테이블이 표준.

```md
| 그룹 | 사용처 | 클래스 |
|------|--------|--------|
| `button` | 버튼 레이블 — 소·중·대 | `.text-button-sm`, `.text-button-md`, `.text-button-lg` |
```

---

## Do / Don't 형식

각 항목은 `>` 인용 블록. 첫 줄에 의미, 둘째 줄에 코드 예시.

```md
> ✅ DO — 용도 설명
> `code example;`

> ❌ DON'T — 위반 사유
> `bad example;`

> ⚠️ 주의 사항
```

| 기호 | 의미 |
|------|------|
| ✅ DO | 권장 사용법 |
| ❌ DON'T | 금지 사용법 |
| ⚠️ | 주의 사항·경고 |

---

## CSS 파일 동기화 규칙

`tokens/*.css` 주석은 md와 같은 정보 소스다. md를 수정할 때 CSS 주석도 함께 갱신한다.

**1. Semantic 토큰 주석에 사용처 명시**

```css
--font-size-label: var(--font-size-12);  /* 칩·뱃지·헬퍼 */
```

**2. Utility 카테고리 블록 주석은 현행 클래스명 반영**

```css
/* 카테고리:
     Status — badge, chip, tooltip
*/
```

**3. 토큰·클래스 추가·제거·이름 변경 시 CSS 주석을 동시에 수정**

> ⚠️ CSS 주석이 stale되면 AI가 잘못된 사용처를 인용한다. 변경 작업 시 주석 동기화를 워크플로 체크리스트에 포함한다.

---

## Deprecation 정책

토큰·유틸리티 제거 절차는 `workflow/designer.md`의 [토큰 제거] · [유틸리티 제거] 흐름을 따른다.
