---
file: components/_spec.md
version: 1.0.0
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

```
## 개요  →  ## Anatomy  →  ## Variant  →  ## 토큰 바인딩(조건부)  →  ## 접근성  →  ## Do / Don't
```

| 섹션 | 필수 | 비고 |
|------|------|------|
| `## 개요` | 필수 | 아래 작성 규칙 참조 |
| `## Anatomy` | 필수 | 아래 작성 규칙 참조 |
| `## Variant` | 필수 | 아래 작성 규칙 참조 |
| `## 토큰 바인딩` | 조건부 | Component 토큰 신규 정의 시에만 작성 |
| `## 접근성` | 필수 | 아래 작성 규칙 참조 |
| `## Do / Don't` | 필수 | `governance/_spec.md` DO/DON'T 형식 |

### 개요

용도·사용 맥락·유사 컴포넌트와의 구별점을 모두 포함한다.

```
## 개요

폼 내 단일 입력 필드. Label + Input + HelpText로 구성한다.
Input 단독과의 차이 — Label·유효성 메시지를 포함한 완성된 입력 단위.
```

### Anatomy

HTML 구조 예시를 작성한다.

<!-- AI: 파트 명칭 표는 문서에 노출하지 않는다. 파트 구성은 아래 HTML 예시로 파악한다.
파트 예시: root(컴포넌트 최상위 요소), label(텍스트 콘텐츠), icon(아이콘, optional) -->

```html
<button class="btn btn--primary btn--md">
  <span aria-hidden="true">...</span>
  <span>저장</span>
</button>
```

> ✅ DO — 실제 사용 형태 그대로 작성
> `<button class="btn btn--primary btn--md btn--icon-left">...</button>`

> ❌ DON'T — 간략화
> `<button class="btn">...</button>`

HTML 예시 아래에 `:::preview` 디렉티브로 렌더링 결과를 함께 보여준다. 뷰어에서 실제 시스템 토큰 CSS가 적용된 상태로 렌더링된다.

<!-- AI: :::preview는 design-system.html 뷰어 전용 디렉티브. 마크다운 표준 문법 아님. <style> 블록에 컴포넌트 CSS를 작성하고 아래에 HTML을 배치한다. -->

````
:::preview
<style>
  .btn { display: inline-flex; align-items: center; gap: var(--space-gap-sm);
         height: var(--height-base); padding: var(--space-inset-squish-md);
         border-radius: var(--radius-md); border: 1px solid transparent;
         font-family: var(--font-family-base); cursor: pointer; }
  .btn--primary { background: var(--color-background-primary);
                  color: var(--color-text-on-primary);
                  border-color: var(--color-border-primary); }
  .btn--md { font-size: var(--font-size-base); }
</style>
<button class="btn btn--primary btn--md">저장</button>
:::
````

### Variant

차원별 허용값과 기본값을 표로 작성한다.

```
| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | primary · ghost · outline | primary |
| size | sm · md · lg | md |
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
