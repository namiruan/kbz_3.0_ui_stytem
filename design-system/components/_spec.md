---
file: components/_spec.md
version: 1.4.1
depends-on: governance/_spec.md
---

# 컴포넌트 문서 작성 규칙

> 표 작성 공통 규칙은 `governance/_spec.md`를 따른다.  
> 컴포넌트 계층·Variant 모델·네이밍 규칙은 `components/_index.md`를 따른다.

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
    molecules/
      form-field.md
    organisms/
      table.md
```

| 규칙 | 예시 |
|------|------|
| kebab-case 소문자 | `form-field.md`, `icon-button.md` |
| 레이어 폴더(`atoms/` `molecules/` `organisms/`) 하위 | `atoms/button.md` |
| 파일이 과도하게 길어질 때만 디렉터리로 분리 | `atoms/button/index.md` + `atoms/button/variants.md` |

---

## 섹션 순서

```
## 개요  →  ## Anatomy  →  ## Variant  →  ## 토큰 바인딩  →  ## 접근성  →  ## Do / Don't
```

| 섹션 | 필수 | 비고 |
|------|------|------|
| `## 개요` | 필수 | 용도·사용 맥락·유사 컴포넌트와의 구별점 |
| `## Anatomy` | 필수 | 파트 명칭 정의 + HTML 구조 예시 필수 포함. 이후 섹션이 이 이름을 참조 |
| `## Variant` | 필수 | 차원별 허용값·기본값 |
| `## 토큰 바인딩` | 필수 | 파트 × 상태 토큰 매트릭스 |
| `## 접근성` | 필수 | ARIA·키보드·포커스 요구사항 |
| `## Do / Don't` | 필수 | — |

### 개요

용도·사용 맥락·유사 컴포넌트와의 구별점을 모두 포함한다.

```
## 개요

폼 내 단일 입력 필드. Label + Input + HelpText로 구성한다.
Input 단독과의 차이 — Label·유효성 메시지를 포함한 완성된 입력 단위.
```

### Anatomy

파트 명칭 표와 HTML 구조 예시를 함께 작성한다.

```
| 파트 | 설명 |
|------|------|
| root | 컴포넌트 최상위 요소 |
| label | 텍스트 콘텐츠 |
| icon | 아이콘 (optional) |
```

```html
<button class="btn btn--primary btn--md">
  <span class="btn__icon" aria-hidden="true">...</span>
  <span class="btn__label">저장</span>
</button>
```

> ✅ DO — 실제 사용 형태 그대로 작성
> `<button class="btn btn--primary btn--md btn--icon-left">...</button>`

> ❌ DON'T — 간략화
> `<button class="btn">...</button>`

### Variant

차원별 허용값과 기본값을 표로 작성한다.

```
| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | primary · ghost · outline | primary |
| size | sm · md · lg | md |
```

### 토큰 바인딩

파트 × 상태 토큰 매트릭스로 작성한다. 토큰 결정 방법은 `## 토큰 바인딩 결정 트리`를 따른다.

```
| 파트 | 상태 | 속성 | 토큰 |
|------|------|------|------|
| root | default | background | --color-background-primary |
| root | hover | background | --color-background-primary-hover |
| label | default | color | --color-text-on-primary |
```

### 접근성

이 컴포넌트에 해당하는 항목만 발췌한다. 전체 목록은 `## 접근성 요구사항` 참조.

### Do / Don't

`governance/_spec.md`의 DO/DON'T 형식을 따른다.

---

## 상태(State) 규칙

### 우선순위

동시에 여러 상태가 충돌할 때 아래 순서로 적용한다. 숫자가 낮을수록 우선.

```
1. error  →  2. disabled  →  3. loading  →  4. focus  →  5. pressed  →  6. hover  →  7. default
```

### 불가능한 조합

아래 조합은 구현하지 않는다. CSS와 JS 양쪽에서 차단한다.

| 조합 | 차단 방법 |
|------|----------|
| `disabled` + `hover` | `pointer-events: none` |
| `disabled` + `focus` | `tabindex="-1"` |
| `loading` + `hover` | `pointer-events: none` |
| `loading` + `focus` | `tabindex="-1"` |

### 상태별 시각 피드백 패턴

| 상태 | 허용 | 금지 |
|------|------|------|
| `hover` | background·border 색상 변경 | opacity 단독 변경 |
| `pressed` | background 한 단계 어둡게. shadow 제거 또는 inset 전환 | — |
| `focus` | `outline: 2px solid var(--color-action-focus); outline-offset: 2px` | `:focus` 단독 사용. `box-shadow`로 대체 |
| `disabled` | `--color-text-disabled` 적용. `pointer-events: none` | `opacity` 단독 처리 |
| `loading` | spinner 또는 skeleton. 컴포넌트 크기 고정 유지 | 레이아웃 변경 |
| `error` | `--color-action-error-*` 토큰 적용 | hex 직접 사용 |

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

> ❌ DON'T — hex·px 하드코딩
> `background: #115ac6; padding: 8px;`

> ❌ DON'T — Primitive 토큰 직접 참조
> `background: var(--color-blue-600);`

| 속성 | 기본 참조 |
|------|----------|
| 배경색 (인터랙티브) | `--color-background-*` |
| 배경색 (컨테이너) | `--color-surface-*` |
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

## 접근성 요구사항

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
|-------------|---------|--------------|
| 버튼 | `<button>` 네이티브 권장. 불가 시 `role="button"` | `Enter`·`Space` 활성화 |
| 텍스트 인풋 | `<label>` 연결 또는 `aria-label` | — |
| 드롭다운 | `aria-expanded`, `aria-haspopup="listbox"` | `Enter` 열기, `Esc` 닫기, `↑↓` 이동 |
| 모달 | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | `Esc` 닫기, FocusTrap 필수 |
| 체크박스·라디오 그룹 | `<fieldset>` + `<legend>` | `Space` 토글 |
| 토스트·알림 | `role="status"` (비긴급) 또는 `role="alert"` (긴급) | — |
| 탭 | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` | `←→` 탭 전환, `Tab`으로 패널 진입 |
| 토글·스위치 | `role="switch"`, `aria-checked` | `Space` 토글 |

---

## Deprecation 정책

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

> ❌ DON'T — Deprecate 선언 즉시 제거
> `/* remove-at 버전 전까지 코드 유지. 절차는 workflow/designer.md 참조 */`
