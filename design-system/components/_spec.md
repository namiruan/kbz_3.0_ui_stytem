---
file: components/_spec.md
version: 1.0.0
depends-on: governance/_spec.md
---

# 컴포넌트 문서 작성 규칙

> 표 작성 공통 규칙(다중값 나열·토큰명 표기·동일 그룹 행 구분)은 `governance/_spec.md`를 따른다.  
> 컴포넌트 계층(Atom·Molecule·Organism·Pattern)·Variant 모델은 `components/_index.md`를 따른다.

---

## 문서 헤더

최상단에 아래 필드를 포함한다.

```yaml
---
file: components/[layer]/[name].md
version:    0.1.0
status:     draft
depends-on: components/_index.md
---
```

| 필드 | 작성 기준 | 언제 업데이트 |
|------|----------|-------------|
| `version` | Semantic Versioning. 규칙은 `governance/versioning.md` | 내용이 바뀔 때마다 |
| `status` | `draft` → `stable` → `deprecated`. 팀 리뷰 후 `stable` 승격 | 상태가 바뀔 때 |
| `depends-on` | 기본은 `components/_index.md`. 특정 토큰 문서에 강하게 의존하면 추가 | 의존성이 바뀔 때 |

---

## 파일 구조

```
design-system/
  components/
    _index.md          — 컴포넌트 아키텍처
    _spec.md           — 문서 작성 규칙 (이 문서)
    atoms/
      button.md
      badge.md
      input.md
    molecules/
      form-field.md
      dropdown.md
    organisms/
      table.md
      sidebar-nav.md
```

**파일명 규칙:**

| 규칙 | 예시 |
|------|------|
| kebab-case 소문자 | `form-field.md`, `icon-button.md` |
| 레이어 폴더(`atoms/` `molecules/` `organisms/`) 하위 | `atoms/button.md` |
| 파일이 과도하게 길어질 때만 디렉터리로 분리 | `atoms/button/index.md` + `atoms/button/variants.md` |

---

## 섹션 순서

> ⚠️ 순서 고정. 변경 금지. 내용이 없는 섹션은 생략한다.

```
## 개요  →  ## Anatomy  →  ## Variant  →  ## 토큰 바인딩  →  ## 접근성  →  ## Do / Don't
```

| 섹션 | 필수 | 비고 |
|------|------|------|
| `## 개요` | 필수 | 용도·사용 맥락·유사 컴포넌트와의 구별점 |
| `## Anatomy` | 필수 | 파트 명칭 정의. 이후 섹션이 이 이름을 참조 |
| `## Variant` | 필수 | 차원별 허용값·기본값 |
| `## 토큰 바인딩` | 필수 | 파트 × 상태 토큰 매트릭스 |
| `## 접근성` | 필수 | ARIA·키보드·포커스 요구사항 |
| `## Do / Don't` | 필수 | — |

---

## 차원(Dimension) 정의

모든 컴포넌트는 아래 차원의 조합으로 정의한다. 해당하지 않는 차원은 생략한다.

```
컴포넌트 = type × style × size × state × icon(optional)
```

| 차원 | 설명 | 예시 |
|------|------|------|
| `type` | 기능적 역할 구분. HTML `type` 속성에 대응 | `submit`, `reset`, `link` |
| `style` | 시각적 강조 수준 | `primary`, `secondary`, `ghost`, `danger` |
| `size` | 높이·패딩 스케일 | `sm`, `md`, `lg` |
| `state` | 인터랙션 상태 | `default`, `hover`, `pressed`, `focus`, `disabled`, `loading`, `error` |
| `icon` | 아이콘 유무·위치 | `none`, `icon-left`, `icon-right`, `icon-only` |

---

## 상태(State) 규칙

### 우선순위

동시에 여러 상태가 충돌할 때 아래 순서로 적용한다. 숫자가 낮을수록 우선.

```
1. error  →  2. disabled  →  3. loading  →  4. focus  →  5. pressed  →  6. hover  →  7. default
```

### 불가능한 조합

> ⚠️ 아래 조합은 구현하지 않는다. CSS와 JS 양쪽에서 차단한다.

| 조합 | 차단 방법 |
|------|----------|
| `disabled` + `hover` | `pointer-events: none` |
| `disabled` + `focus` | `tabindex="-1"` |
| `loading` + `hover` | `pointer-events: none` |
| `loading` + `focus` | `tabindex="-1"` |

### 상태별 시각 피드백 패턴

> ⚠️ 아래 패턴을 따른다. 임의로 다른 방식 사용 금지.

| 상태 | 허용 | 금지 |
|------|------|------|
| `hover` | background·border 색상 변경 | opacity 단독 변경 |
| `pressed` | background 한 단계 어둡게. shadow 제거 또는 inset 전환 | — |
| `focus` | `outline: 2px solid var(--color-action-focus); outline-offset: 2px` | `:focus` 단독 사용. `box-shadow`로 대체 |
| `disabled` | `--color-text-disabled` 적용. `pointer-events: none` | `opacity` 단독 처리 |
| `loading` | spinner 또는 skeleton. 컴포넌트 크기 고정 유지 | 레이아웃 변경 |
| `error` | `--color-action-error-*` 토큰 적용 | hex 직접 사용 |

---

## 네이밍 규칙

### CSS 클래스

Block과 Modifier만 사용한다. `__Element`는 내부 구현에만 쓰고 외부 API로 노출하지 않는다.

| 차원 | 패턴 | 예시 |
|------|------|------|
| Block | `.[컴포넌트]` | `.btn`, `.badge`, `.input` |
| style | `.[컴포넌트]--[style]` | `.btn--primary`, `.btn--ghost` |
| size | `.[컴포넌트]--[size]` | `.btn--sm`, `.btn--lg` |
| JS 제어 상태 | `.[컴포넌트]--[state]` | `.btn--loading`, `.btn--error` |
| icon 위치 | `.[컴포넌트]--icon-[위치]` | `.btn--icon-left`, `.btn--icon-only` |

> ⚠️ `is-`, `has-` 접두어 사용 금지. BEM Modifier(`--`)로 통일한다.

> ⚠️ `hover`·`focus`·`pressed`는 CSS 의사 클래스(`:hover`, `:focus-visible`, `:active`)로 구현한다. 별도 클래스 금지. `disabled`·`loading`·`error`처럼 JS로 제어해야 하는 상태만 클래스로 정의한다.

### Component 토큰

Semantic 토큰만으로 다크모드·테마 전환을 충분히 제어할 수 없을 때만 정의한다.  
→ 판단 기준: [토큰 바인딩 결정 트리](#토큰-바인딩-결정-트리)

```
--[속성]-[컴포넌트]-[variant]-[역할]
```

| 예시 | 의미 |
|------|------|
| `--color-button-primary-fill` | Button primary 배경색 |
| `--color-button-primary-text` | Button primary 텍스트색 |

> ⚠️ Component 토큰을 신규 정의하면 해당 `tokens/*.css` 파일에 동시에 추가하고 사용처 주석을 명시한다.

---

## 토큰 바인딩 결정 트리

컴포넌트 CSS 속성에 값을 지정할 때 아래 순서로 판단한다.

```
1. 유틸리티 클래스가 있나?
   ├─ 있다 → 유틸리티 클래스 사용. var() 참조 금지.
   └─ 없다 → 2번으로

2. 2개 이상의 컴포넌트가 같은 의미로 공유하나?
   ├─ 공유한다 → Semantic 토큰 참조
   └─ 이 컴포넌트만 쓴다 → 3번으로

3. 다크모드·테마 전환에서 이 값이 독립적으로 바뀌어야 하나?
   ├─ 독립 전환 필요 → Component 토큰 신규 정의 후 Semantic 참조
   └─ Semantic과 동일하게 바뀐다 → Semantic 토큰 직접 참조
```

> ❌ 어떤 경우에도 hex·px 하드코딩 금지.
> ❌ Primitive 토큰(`--color-blue-600`, `--space-8`) 컴포넌트에서 직접 참조 금지.

**차원별 기본 참조 토큰:**

| 차원 | 기본 참조 |
|------|----------|
| 배경색 (버튼·칩 등 인터랙티브) | `--color-background-*` |
| 배경색 (카드·패널 등 컨테이너) | `--color-surface-*` |
| 텍스트색 | `--color-text-*` |
| 테두리색 | `--color-border-*` |
| 높이 | `--height-*` |
| 내부 패딩 | `--space-inset-*` 또는 `--space-inset-squish-*` |
| 요소 간 간격 | `--space-gap-*` |
| 코너 곡률 | `--radius-*` |
| 그림자·계층 | `--shadow-*`, `--z-*` |
| 타이포그래피 | `.text-*` 유틸리티 클래스 우선 |
| 모션 | `--duration-*` + `--easing-*` 조합 |
| 아이콘 크기 | `--icon-*` |
| 스트로크 두께 | `--stroke-*` |

---

## 컴포넌트 의존성 규칙

| 레이어 | 참조 가능 | 참조 금지 |
|--------|----------|----------|
| Atom | 토큰·유틸리티 클래스만 | 다른 컴포넌트 |
| Molecule | Atom + 토큰·유틸리티 | Organism·Pattern |
| Organism | Atom·Molecule + 토큰·유틸리티 | Pattern |
| Pattern | 전 레이어 | — |

> ⚠️ 하위 레이어가 상위를 import 금지. 순환 의존 금지.

---

## 접근성 요구사항

모든 인터랙티브 컴포넌트는 아래를 충족해야 한다.  
`## 접근성` 섹션에는 이 컴포넌트에 해당하는 항목만 발췌해 명시한다. 전체 목록 복사 금지.

### 공통 필수 항목

| 항목 | 구현 규칙 |
|------|----------|
| 키보드 접근 | 모든 인터랙티브 컴포넌트는 `Tab`으로 도달 가능 |
| focus 표시 | `:focus-visible`에 `outline: 2px solid var(--color-action-focus); outline-offset: 2px`. `:focus` 단독 사용 금지 |
| disabled | `disabled` 속성 또는 `aria-disabled="true"` + `tabindex="-1"` 동시 적용 |
| 색상 대비 | 텍스트 4.5:1 이상 (WCAG AA). 대형 텍스트·아이콘 3:1 이상 |
| 아이콘 전용 버튼 | `aria-label` 필수. SVG에 `aria-hidden="true"` |
| loading 상태 | `aria-busy="true"` + 스크린리더용 숨김 텍스트(`.sr-only`) |

### 컴포넌트 유형별 ARIA·키보드 패턴

| 컴포넌트 유형 | 필수 ARIA | 키보드 인터랙션 |
|-------------|---------|--------------||
| 버튼 | `<button>` 네이티브 권장. 불가 시 `role="button"` | `Enter`·`Space` 활성화 |
| 텍스트 인풋 | `<label>` 연결 또는 `aria-label` | — |
| 드롭다운 | `aria-expanded`, `aria-haspopup="listbox"` | `Enter` 열기, `Esc` 닫기, `↑↓` 이동 |
| 모달 | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | `Esc` 닫기, FocusTrap 필수 |
| 체크박스·라디오 그룹 | `<fieldset>` + `<legend>` | `Space` 토글 |
| 토스트·알림 | `role="status"` (비긴급) 또는 `role="alert"` (긴급) | — |
| 탭 | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` | `←→` 탭 전환, `Tab`으로 패널 진입 |
| 토글·스위치 | `role="switch"`, `aria-checked` | `Space` 토글 |

---

## 섹션별 작성 형식

### ## 개요

용도, 언제 쓰는지, 유사 컴포넌트와의 구별점을 1–3문장으로 기술한다. 구현 방법 설명 금지.

### ## Anatomy

구성 파트(part) 이름을 정의한다. 이 이름은 이후 토큰 바인딩·접근성 섹션에서 그대로 참조한다.

```md
| 파트 | 설명 | 필수 |
|------|------|------|
| `root` | 컴포넌트 최외곽 래퍼 | 필수 |
| `label` | 버튼 텍스트 | 선택 |
| `icon` | 선행·후행 아이콘 | 선택 |
| `spinner` | loading 인디케이터 | 선택 |
```

### ## Variant

각 차원의 허용값을 나열한다. **기본값은 굵게** 표시한다.

```md
| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | `primary` `secondary` `ghost` `danger` | **`secondary`** |
| size | `sm` `md` `lg` | **`md`** |
| icon | `none` `icon-left` `icon-right` `icon-only` | **`none`** |
```

> `state`는 Variant 표에 포함하지 않는다. 상태별 부가 설명이 필요하면 `### 상태` 하위 섹션을 추가한다.

### ## 토큰 바인딩

파트 × CSS 속성 × 상태 매트릭스로 작성한다. 모든 인터랙티브 상태(hover·pressed·focus·disabled)를 빠짐없이 명시한다.

```md
| 파트 | 속성 | default | hover | pressed | focus | disabled |
|------|------|---------|-------|---------|-------|----------|
| `root` | background | `--color-background-brand` | `--color-blue-700` | `--color-blue-800` | `--color-background-brand` | `--color-surface-subtle` |
| `root` | outline | — | — | — | `2px solid --color-action-focus` | — |
| `label` | color | `--color-text-inverse` | `--color-text-inverse` | `--color-text-inverse` | `--color-text-inverse` | `--color-text-disabled` |
| `label` | class | `.text-button-md` | ← | ← | ← | ← |
```

> `←` 는 왼쪽 상태와 동일한 값을 의미한다.
>
> Component 토큰을 신규 정의한 경우 이 표에 명시하고 `tokens/*.css`에 동시에 추가한다.

### ## 접근성

이 컴포넌트에 해당하는 항목만 발췌해 작성한다. `_spec.md` 전체 목록을 복사하지 않는다.

```md
| 항목 | 구현 |
|------|------|
| 키보드 | `Enter`·`Space`로 활성화 |
| focus | `:focus-visible` outline |
| disabled | `disabled` 속성 + `aria-disabled="true"` + `tabindex="-1"` |
| 아이콘 전용(`icon-only`) | `aria-label` 필수 |
```

### ## Do / Don't

형식은 `governance/_spec.md`를 따른다. 예시는 **HTML + CSS 클래스** 기준으로 작성한다. React 예시가 필요하면 `### React` 하위 섹션을 추가한다.

```md
> ✅ DO — secondary: 중립 동작(취소·뒤로가기)에 사용
> `<button class="btn btn--secondary btn--md">취소</button>`

> ❌ DON'T — 화면에 primary를 두 개 이상 나란히 배치
> `<button class="btn btn--primary">저장</button><button class="btn btn--primary">제출</button>`

> ⚠️ disabled 상태는 반드시 이유를 tooltip이나 helper text로 안내한다
```

---

## CSS 구현 형식

컴포넌트 CSS 파일은 아래 순서로 작성한다. 주석 형식 유지.

```css
/* ── [컴포넌트명] ──────────────────────────────────
   사용: <button class="btn btn--primary btn--md">
   레이어: Atom
   의존: tokens — color, space, radius, height, typography
──────────────────────────────────────────────────── */

/* Block */
.btn { ... }

/* Style modifier */
.btn--primary   { ... }  /* 브랜드 강조 — 저장·확인·CTA */
.btn--secondary { ... }  /* 중립 — 취소·뒤로가기 */
.btn--ghost     { ... }  /* 최소 강조 — 보조 동작 */
.btn--danger    { ... }  /* 위험 동작 — 삭제·초기화 */

/* Size modifier */
.btn--sm { ... }
.btn--md { ... }
.btn--lg { ... }

/* JS 제어 상태 */
.btn--loading { ... }
.btn--error   { ... }

/* CSS 의사 클래스 상태 */
.btn:hover         { ... }
.btn:active        { ... }
.btn:focus-visible { ... }
.btn:disabled,
.btn[aria-disabled="true"] { ... }

/* Icon variant */
.btn--icon-only  { ... }
.btn--icon-left  { ... }
.btn--icon-right { ... }
```

> ⚠️ `!important` 사용 금지.
> ⚠️ Primitive 토큰(`--color-blue-600`, `--space-8`) 직접 참조 금지.
> ⚠️ style Modifier는 Block 클래스와 함께 사용해야 한다. `.btn--primary` 단독 적용 불가.
> ⚠️ 문서에 정의되지 않은 조합은 유효하지 않다. 임의로 조합을 추가하지 않는다.

---

## CSS 파일 동기화 규칙

컴포넌트 MD의 토큰 바인딩 표와 CSS 주석은 같은 정보 소스다. MD를 수정할 때 CSS 주석도 함께 갱신한다.

```css
/* 사용처: primary — 브랜드 강조 버튼 (저장·확인·CTA) */
.btn--primary { background: var(--color-background-brand); }
```

> ⚠️ 주석이 오래되면 AI가 잘못된 사용처를 인용한다. 변경 시 CSS 주석 동기화를 작업 체크리스트에 포함한다.

---

## Deprecation 정책

컴포넌트·variant 제거 절차는 `workflow/designer.md`의 흐름을 따른다.  
제거 전 반드시 `version`을 올리고 헤더에 아래 필드를 추가한다.

```yaml
---
file: components/atoms/old-button.md
version:          2.0.0
status:           deprecated
deprecated-since: 1.5.0
replaced-by:      components/atoms/button.md
remove-at:        3.0.0
---
```

| 단계 | 액션 |
|------|------|
| Deprecate | `status: deprecated` 변경. 대체 컴포넌트 명시. CHANGELOG 기록 |
| 유지 | 신규 사용 금지. 기존 사용처는 다음 MAJOR까지 마이그레이션 |
| 제거 | 다음 MAJOR 릴리즈에서 정의서·CSS 동시 삭제 |

> ⚠️ Deprecate 선언 즉시 제거 금지. 사용처가 마이그레이션할 시간을 보장한다.
