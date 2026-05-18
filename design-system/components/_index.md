---
file: components/_index.md
version: 1.5.2
depends-on: tokens/_index.md
---

# 컴포넌트 아키텍처

시스템 기반(토큰·공간·색상·타이포·elevation·모션·아이콘)이 모두 정의된 후 컴포넌트를 계층 순서로 작업한다.

## 컴포넌트 계층

```
Atom  →  Molecule  →  Organism  →  Pattern
```

| 레이어 | 기준 | 컴포넌트 |
|--------|------|----------|
| **Atom** | 분해 불가, 의존성 없음 | Button · Input · Textarea · Checkbox · Radio · Toggle · Badge · Tag · Icon · Spinner · Tooltip · Divider |
| **Molecule** | Atom 2개+ 결합, 단일 기능 | FormField · SearchBar · Dropdown · DatePicker · DateRangePicker · Pagination · Tabs · Accordion · Toast · Alert · FileUpload |
| **Organism** | 자체 레이아웃 보유 | Table · SidebarNav · Card · TopNav · FilterBar · Form · Modal · EmptyState · Drawer |
| **Pattern** | 페이지 수준 구조 | Dashboard · ListPage · DetailPage · SettingsPage · AuthPage · ErrorPage |

### 사용 규칙

> ✅ DO — 하위 레이어 완성 후 상위 레이어 시작. 상위는 하위만 사용.
> `Atom → Molecule → Organism → Pattern`
> `/* Organism: Atom + Molecule 사용 가능 */`

> ❌ DON'T — 순서 무시하거나 역방향 참조
> `/* Atom 없이 FormField(Molecule) 작성 금지 */`
> `/* Atom에서 Organism 참조 금지 */`

## Variant 모델

모든 컴포넌트는 아래 차원의 조합으로 정의한다.

```
컴포넌트 = style × size × state × icon(optional)
```

| 차원 | 설명 | 예시 |
|------|------|------|
| style | 시각적 변형 | primary, ghost, outline |
| size | 크기 | sm, md, lg |
| state | 인터랙션 상태 (JS 제어 추가 상태) | loading, error |
| icon | 아이콘 위치 (optional) | icon-left, icon-only |

### CSS 조합 방식

각 차원은 독립된 CSS 클래스로 만들고 관련 속성을 묶는다.

```css
.btn--primary {
  background: var(--color-background-primary);
  color: var(--color-text-on-primary);
  border-color: var(--color-border-primary);
}
.btn--primary:hover { background: var(--color-background-primary-hover); }

.btn--md {
  height: var(--height-md);
  padding: var(--space-inset-squish-md);
}
```

HTML에서는 차원 클래스를 조합해서 사용한다.

```html
<button class="btn btn--primary btn--md btn--icon-left">
  <span class="btn__icon" aria-hidden="true">...</span>
  <span class="btn__label">저장</span>
</button>
```

### 상태 완전성

모든 인터랙티브 컴포넌트에 아래 상태를 모두 정의한다.

```
default  ·  hover  ·  pressed(:active)  ·  disabled
```

추가: `focus`(키보드 내비게이션) · `loading`(비동기) · `error`(유효성 검사)

## 네이밍 규칙

### CSS 클래스

| 차원 | 패턴 | 예시 |
|------|------|------|
| Block | `.[컴포넌트]` | `.btn`, `.badge`, `.input` |
| style | `.[컴포넌트]--[style]` | `.btn--primary`, `.btn--ghost` |
| size | `.[컴포넌트]--[size]` | `.btn--sm`, `.btn--lg` |
| state (JS) | `.[컴포넌트]--[state]` | `.btn--loading`, `.btn--error` |
| state (CSS) | `.[컴포넌트]:[의사클래스]` | `.btn:hover`, `.btn:focus-visible`, `.btn:active` |
| icon 위치 | `.[컴포넌트]--icon-[위치]` | `.btn--icon-left`, `.btn--icon-only` |

> ✅ DO — full name 사용
> `<button class="btn btn--primary btn--md">`

> ✅ DO — `disabled`는 클래스와 HTML 속성을 함께 적용
> `<button class="btn btn--disabled" disabled aria-disabled="true" tabindex="-1">`

> ❌ DON'T — 약어 사용
> `<button class="btn btn--pr btn--m">`

> ❌ DON'T — `is-`, `has-` 접두어 사용
> `<button class="btn is-loading has-error">`

> ❌ DON'T — `disabled` 클래스 단독 사용
> `<button class="btn btn--disabled">`

### Component 토큰

복잡한 컴포넌트(Modal, Table 등)의 고유값에만 정의한다. Button·Badge처럼 단순한 컴포넌트는 Semantic 토큰으로 충분하다.

```
--[속성]-[컴포넌트]-[variant]-[역할]
예: --color-button-primary-fill, --color-button-primary-text
```

> ✅ DO — Component 토큰 신규 정의 시 해당 `tokens/*.css` 파일에 동시에 추가하고 사용처 주석을 명시한다.
> `/* 사용처: modal 배경 오버레이 */`
> `--color-modal-overlay: var(--color-surface-overlay);`

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
| `focus` | `outline: var(--stroke-md) solid var(--color-border-focus); outline-offset: 2px` | `:focus` 단독 사용<br>`box-shadow`로 대체 |
| `disabled` | `--color-text-disabled`<br>`--color-border-disabled`<br>`--color-surface-disabled`<br>`pointer-events: none` | `opacity` 단독 처리 |
| `loading` | spinner 또는 skeleton. 컴포넌트 크기 고정 유지 | 레이아웃 변경 |
| `error` | `--color-text-error`<br>`--color-border-error`<br>`--color-background-error`<br>`--color-surface-error-subtle`<br>`--color-action-error-*` (hover·pressed·selected·overlay) | hex 직접 사용 |

---

## 파일 구조

```
design-system/
  components/
    _index.md          — 컴포넌트 아키텍처 (이 문서)
    _spec.md           — 문서 작성 규칙
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
