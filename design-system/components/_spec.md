---
file: components/_spec.md
version: 1.2.0
depends-on: governance/_spec.md, components/_index.md, accessibility.md
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
depends-on: components/_index.md, accessibility.md
---
```

| 필드 | 작성 기준 | 언제 업데이트 |
|------|----------|-------------|
| `version` | Semantic Versioning. 규칙은 `governance/versioning.md` | 내용이 바뀔 때마다 |
| `status` | `draft` → `stable` → `deprecated`. 팀 리뷰 후 `stable` 승격 | 상태가 바뀔 때 |
| `depends-on` | 기본은 `components/_index.md`. 특정 토큰 문서에 강하게 의존하면 추가 | 의존성이 바뀔 때 |

---

## 섹션 순서

**Atom · Molecule**
```
## 개요  →  ## Variant  →  ## 사용 지침  →  ## 동작  →  ## Anatomy  →  ## CSS  →  ## 토큰 바인딩(조건부)  →  ## 접근성  →  ## Do / Don't
```

**Organism**
```
## 개요  →  ## Variant  →  ## 사용 지침  →  ## CSS(조건부)  →  ## 접근성  →  ## Do / Don't
```

| 섹션 | 레이어 | 필수 | 비고 |
|------|--------|------|------|
| `## 개요` | 공통 | 필수 | 아래 작성 규칙 참조 |
| `## Variant` | 공통 | 필수 | 아래 작성 규칙 참조 |
| `## 사용 지침` | Atom · Molecule | 조건부 | variant 선택 기준·화면 구성 패턴·제약이 필요한 컴포넌트에 작성 |
| `## 사용 지침` | Organism | 필수 | layout 패턴이 2개 이상이거나 JS 동작이 있으면 인터랙티브 데모(`:::preview`) 포함. JS 동작과 레이어 계층은 `<!-- AI: -->` 주석으로 함께 기술한다. 정적 단일 패턴 Organism은 텍스트 설명과 제약만 작성해도 무방 |
| `## 동작` | Atom · Molecule | 조건부 | JS로 상태를 전환하는 컴포넌트에만 작성. 이벤트별 클래스·속성 변화와 인터랙티브 데모를 포함한다 |
| `## 동작` | Organism | — | **사용하지 않음.** JS 동작은 `## 사용 지침` 데모와 AI 주석으로 대신한다 |
| `## Anatomy` | Atom · Molecule | 필수 | variant별 렌더링 — 아래 작성 규칙 참조 |
| `## CSS` | Atom · Molecule | 필수 | 아래 작성 규칙 참조 |
| `## CSS` | Organism | 조건부 | Organism이 직접 정의한 레이아웃·배치 CSS만 작성. 하위 Atom·Molecule CSS는 depends-on으로 자동 수집되므로 복사 금지. 자체 정의 CSS가 전혀 없을 때만 생략 |
| `## 토큰 바인딩` | 공통 | 조건부 | Component 토큰 신규 정의 시에만 작성 |
| `## 접근성` | 공통 | 필수 | 아래 작성 규칙 참조 |
| `## Do / Don't` | 공통 | 필수 | `governance/_spec.md` DO/DON'T 형식. 구현 패턴에만 집중하고 선택 기준·제약과 중복되는 내용은 작성하지 않는다 |

### 개요

용도·사용 맥락·유사 컴포넌트와의 구별점을 모두 포함한다.

```
## 개요

폼 내 단일 입력 필드. Label + Input + HelpText로 구성한다.
Input 단독과의 차이 — Label·유효성 메시지를 포함한 완성된 입력 단위.
```

### 사용 지침

**Atom · Molecule** — variant 선택이 복잡하거나 배치 규칙이 있는 컴포넌트에 작성한다. 아래 세 가지를 필요에 따라 조합한다.

- **선택 기준 표** — variant × type 조합별 사용 조건
- **화면 내 구성 패턴** — 실제 화면에서의 배치 예시 (코드 블록으로 작성)
- **제약** — 금지 조합, 배치 규칙, 위임 규칙(다른 컴포넌트로 넘겨야 할 케이스)

**Organism** — layout 패턴 탐색기 또는 인터랙티브 데모를 `:::preview`로 작성한다. `## 동작`을 별도로 두지 않으며, JS 동작 로직과 레이어 계층은 preview 위 `<!-- AI: -->` 주석에 기술한다.

```
<!-- AI:
레이어 계층: ...
동작:
- 조건부 표시/숨김: ...
- 제출 시 유효성: ...
-->

:::preview
...
:::
```

`:::preview` 안 `<script>` 블록에서 사용 가능한 뷰어 전역값:

| 이름 | 설명 |
|------|------|
| `stage` | 현재 preview의 `.component-preview-stage` DOM 요소. 내부 요소 탐색의 기준점으로 사용 |
| `initInput(el)` | Input 컴포넌트 초기화 (input.md JS 참조) |
| `initTextarea(el)` | Textarea 초기화 (textarea.md JS 참조) |
| `initDP(el)` | DatePicker 초기화 (date-picker.md JS 참조) |

`data-component`는 코드 패널에 표시할 **최상위 root 요소에 1개**만 붙인다. Organism에서는 Organism root 요소에 붙인다 (예: `<form data-component>`, `<div data-component class="modal">`).

레이아웃 구조나 동작이 다른 패턴을 사용자가 선택해 비교해야 할 때 `.pattern-explorer` 트리를 사용한다 (build.py에 CSS 정의됨). 단순 variant 나열은 `anatomy-grid`로 충분 — 탐색기 불필요.

### Variant

차원별 허용값과 기본값을 표로 작성한다. 기본값으로 동작해 **클래스가 없는 차원은 명시**한다.

```
| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | primary · ghost · outline | primary |
| size | sm · md · lg | md |
```

### Anatomy (Atom · Molecule)

`:::preview` 디렉티브로 variant별 렌더링 결과를 보여준다. 뷰어에서 `## CSS` 블록이 자동 주입되어 실제 토큰 CSS가 적용된 상태로 렌더링된다.

<!-- AI: :::preview는 design-system.html 뷰어 전용 디렉티브. 마크다운 표준 문법 아님. CSS는 ## CSS 섹션에 작성하면 뷰어가 자동으로 주입한다. preview 안에 <style> 블록을 별도로 작성하지 않는다. -->
<!-- AI: 파트 명칭 표는 문서에 노출하지 않는다. 파트 구성은 HTML 예시로 파악한다.
파트 예시: root(컴포넌트 최상위 요소), label(텍스트 콘텐츠), icon(아이콘 span, optional) -->

variant별 렌더링을 `anatomy-grid / anatomy-row` 레이아웃으로 나열한다.

````
:::preview
<div class="anatomy-grid">
<div class="anatomy-row">
  <span class="anatomy-label">fill</span>
  <button data-component class="btn btn--primary btn--md text-button-md">저장</button>
</div>
</div>
:::
````

> ✅ DO — 실제 사용 형태 그대로, data-component 포함
> `<button data-component class="btn btn--primary btn--md text-button-md btn--icon-left">...</button>`

> ❌ DON'T — 간략화하거나 data-component 생략
> `<button class="btn">...</button>`

`data-component` 속성은 뷰어가 코드 패널 HTML을 추출하는 데 사용하는 전용 속성이다. 실제 구현 코드에는 포함하지 않는다.

### CSS

컴포넌트의 전체 CSS를 하나의 ` ```css ``` ` 블록으로 작성한다. 이 블록은 뷰어 렌더링 시 자동으로 주입되어 `:::preview`에 적용된다.

```css
/* ── Base ── */
.btn { ... }

/* ── Size ── */
.btn--sm { ... }

/* ── Style ── */
.btn--primary { ... }

/* ── State ── */
.btn--disabled { ... }
.btn--loading { ... }
```

주석으로 섹션을 구분하고, 각 상태 블록은 독립적으로 복사해도 완전히 동작하도록 필요한 속성을 모두 포함한다.

#### 유틸리티 클래스를 기반으로 쓰는 경우

컴포넌트가 `utilities/*.css`의 클래스를 기반으로 확장할 때는 CSS 블록 상단에 참조 주석을 명시한다. 기반 스타일을 복사하지 않고 출처를 연결하는 것이 원칙이다.

```css
/* ── 기반 스타일 ──────────────────────────────
   [파일경로] → .[클래스명]
   [이 컴포넌트에서 사용하는 속성 목록]
   이 블록은 [추가하는 내용]만 정의한다.
─────────────────────────────────────────────── */
```

<!-- AI: 유틸리티 참조 주석을 발견하면 해당 파일과 클래스를 읽어 기반 스타일을 파악한 뒤 이 블록과 합산해 전체 CSS를 이해한다. -->

예시:

```css
/* ── 기반 스타일 ──────────────────────────────
   utilities/icon.css → .icon-on--{size}
   display · padding · border-radius · SVG 크기 정의
   이 블록은 button 요소에서의 인터랙션 상태만 추가한다.
─────────────────────────────────────────────── */

/* ── 인터랙션 상태 ── */
button.icon-on--md:hover { background: var(--color-action-neutral-hover); }
```

### 토큰 바인딩

Component 토큰 신규 정의 시에만 작성한다. 판단 기준과 네이밍 패턴은 `components/_index.md ## 토큰 바인딩`을 따른다.

```
| 파트 | 속성 | Component 토큰 | Semantic 참조 |
|------|------|----------------|---------------|
| overlay | background | --color-modal-overlay | --color-surface-overlay |
| container | shadow | --shadow-modal | --shadow-xl |
```

### 접근성

컴포넌트 유형을 한 줄로 명시한다. `design-system/accessibility.md` 컴포넌트 공통 필수 항목을 전체 검토해 해당하는 항목만 나열하고, 유형별 패턴에서 벗어나거나 이 컴포넌트에만 해당하는 사항을 추가한다. 공통 필수 항목 전체 복사 금지.

해당 기능·상태를 구현하지 않는 항목은 생략한다. (예: loading 상태가 없으면 loading 행 생략, icon-only 형태가 없으면 아이콘 전용 행 생략)

키보드 인터랙션이 있는 컴포넌트는 JS 키보드 이벤트 예시를 포함한다.

loading 상태가 있는 컴포넌트는 `.sr-only` 문구 예시를 명시한다.

```
드롭다운 유형 (`design-system/accessibility.md` 드롭다운 행 적용).
키보드 접근·focus·disabled·색상 대비 해당

el.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') open();
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowDown') focusNext();
  if (e.key === 'ArrowUp') focusPrev();
});
```

### Do / Don't

`governance/_spec.md`의 DO/DON'T 형식을 따른다.

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
