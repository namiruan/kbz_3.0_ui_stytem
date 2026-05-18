---
file: components/_index.md
version: 1.3.0
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

차원을 합쳐서 만들지 않는다 — 조합 수가 폭발한다. style 3개 × size 4개를 합치면 12개, 따로 만들면 7개.

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
