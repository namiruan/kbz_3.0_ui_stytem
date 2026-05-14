---
file: tokens/_spec.md
version: 0.2.0
depends-on: governance/_spec.md
---

# 토큰 정의 문서 작성 규칙

> 표 작성 공통 규칙(다중값 나열·토큰명 표기·동일 그룹 행 구분)은 `governance/_spec.md`를 따른다.

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
| `version` | 정의서 변경 범위 (Semantic Versioning) | 내용이 바뀔 때마다. 규칙은 `governance/versioning.md` |
| `depends-on` | 참조하는 상위 문서 | 의존성이 바뀔 때 |

---

## 섹션 순서

> ⚠️ 순서 고정. 변경 금지. Primitive(원시 스케일이 없는 경우)·Utility(use case 클래스가 없는 경우)는 생략한다.

```
## Primitive  →  ## Semantic  →  ## Utility  →  ## Do / Don't
```

| 섹션 | 필수 | 비고 |
|------|------|------|
| `## Primitive` | 선택 | 원시값 시각화가 유의미할 때 작성 |
| `## Semantic` | 필수 | Primitive 없이 작성 가능 (icon·stroke·motion·elevation) |
| `## Utility` | 선택 | use case별 묶음 클래스가 있을 때만 작성 |
| `## Do / Don't` | 필수 | — |

---

## Primitive 섹션 형식

원시값 카테고리별로 `###`으로 분기. 디렉티브 또는 인라인 표 앞에 한 줄 설명을 붙일 수 있다.

**설명 작성 기준 — 아래 중 하나라도 해당하면 작성, 없으면 생략한다.**

| 작성 조건 | 예시 |
|----------|------|
| 스케일 구조·단계 규칙이 있다 | "4px 기반 스케일. 소형은 세밀하게, 대형은 8px 이상으로 점프" |
| 숫자 방향·의미가 직관적이지 않다 | "숫자가 클수록 어둡다 (50 = 가장 밝음, 950 = 가장 어두움)" |
| 컴포넌트 직접 참조 금지 등 제약이 있다 | "팔레트 원시값이며 컴포넌트에서 직접 참조하지 않는다" |
| 폴백·의존 관계가 있다 | "로드 실패 시 뒤의 값이 순서대로 대체된다" |

> ❌ 토큰명만 보면 알 수 있는 당연한 설명은 작성하지 않는다.
> `이름은 px값과 동일하다` — radius 토큰명(`--radius-4`)에서 이미 명백. 생략.
> `이름은 숫자다` — space 토큰에 적용했다면 마찬가지로 생략.

**디렉티브 사용** (HTML 뷰어 렌더링용):

Primitive 섹션과 Semantic 섹션 모두에서 사용할 수 있다. Primitive가 없는 토큰(icon, stroke, motion, elevation)은 Semantic 하위 섹션에 포함한다.

```md
### Blue
주요 브랜드 컬러. CTA 버튼, 링크, 포커스 링.
:::palette blue
```

| 디렉티브 | 사용처 |
|---------|--------|
| `:::palette [이름]` | color (50–950 스케일) |
| `:::scale [속성]` | font-size · font-weight · line-height · letter-spacing<br>space · height · radius<br>icon · stroke-width · stroke-style<br>duration · easing |
| `:::shadow` | shadow 토큰 — box-shadow 값을 실제 박스로 렌더링 |
| `:::z-index` | z-index 토큰 — 값에 비례한 막대 높이로 계층 차이를 시각화 |

---

## 시각화 요소 hover 인터랙션 규칙

> ⚠️ 새 디렉티브 또는 시각화 블록을 추가할 때 아래 규칙을 반드시 따른다.

### Primitive 시각화 (palette-chip, scale-unit, height-col, radius-col 등)

- 시각화 박스(칩·바·컬럼)는 **값(value)만** 표시한다. (예: `2px`, `#1A73E8`, `50%`)
- 값이 단순 수치·색상이면 그대로 표시한다. **값이 복합 문자열(box-shadow 등)이라 직접 표시가 불가능한 경우, 토큰 suffix(예: `sm`, `md`)를 식별자로 표시한다.**
- 토큰명(예: `--radius-4`, `--shadow-sm`)은 **hover 시 툴팁**으로만 노출한다.
- 박스 아래 별도 label span으로 토큰의 semantic 용도(예: `드롭다운에 사용`)를 표시하지 않는다.
- 렌더링 요소에는 반드시 `data-token-value="--token-name"` 속성을 부여한다.
- `build.py` 툴팁 셀렉터(mouseover 핸들러)에 해당 클래스를 추가한다.

```javascript
// build.py 툴팁 셀렉터 예시
e.target.closest('.radius-col[data-token-value]')
```

### Semantic 시각화 (typo-sem-cell 등)

- hover 시 테두리 강조(`--color-border-brand`) + 배경 변경(`--color-surface-brand-subtle`) 스타일이 적용된다.
- 툴팁은 해당 Semantic 토큰명을 표시한다.
- `data-token-value="--semantic-token-name"` 속성 부여 후 셀렉터에 추가한다.

**디렉티브가 없는 경우** — 인라인 표:

```md
| 사용처 | 토큰 |
|--------|------|
| 카드·드롭다운 | `--shadow-sm` |
```

---

## Semantic 섹션 형식

`| 그룹 | 사용처 | 토큰 |` 3컬럼이 표준.

```md
| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| `surface` | 중립 배경 | `--color-surface-base`<br>`--color-surface-subtle` |
| `text` | 본문·UI 텍스트 | `--color-text-body`<br>`--color-text-display` |
```

**컬럼 규칙:**
- `그룹` — 토큰명 중간 키워드 (`surface`, `text`, `inset`, `gap` 등)
- `사용처` — 한 줄 설명. 무엇을 위한 그룹인지 명확히
- `토큰` — 다중값 나열·px 주석 금지는 `governance/_spec.md` 표 규칙을 따른다

> ⚠️ **토큰명·클래스명은 항상 마지막 열**에 위치한다. hover 인터랙션이 오른쪽 끝에서 발생하도록 시각적 일관성을 유지하기 위함이다.

> typography처럼 축이 여러 개인 토큰은 첫 컬럼명을 `축`으로 바꿔도 됨.

---

## Utility 섹션 형식

Semantic 토큰을 use case 단위로 묶은 클래스가 있을 때만 작성. 3컬럼 테이블이 표준. 클래스 열 나열은 `governance/_spec.md` 표 규칙을 따른다.

```md
| 그룹 | 사용처 | 클래스 |
|------|--------|--------|
| `button` | 버튼 레이블 — 소·중·대 | `.text-button-sm`<br>`.text-button-md`<br>`.text-button-lg` |
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

토큰·유틸리티 제거 절차는 `workflow/designer.md`의 **토큰 제거** · **유틸리티 제거** 흐름을 따른다.
