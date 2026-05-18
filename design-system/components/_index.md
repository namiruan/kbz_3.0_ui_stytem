---
file: components/_index.md
version: 1.0.4
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
컴포넌트 = type × style × size × state × icon(optional)
```

| 차원 | 설명 | 예시 |
|------|------|------|
| type | 컴포넌트 종류 | button, input |
| style | 시각적 변형 | primary, ghost, outline |
| size | 크기 | sm, md, lg |
| state | 인터랙션 상태 | loading, error, disabled |
| icon | 아이콘 위치 (optional) | icon-left, icon-only |

### CSS 조합 방식

각 차원은 독립된 CSS 클래스로 만들고 HTML에서 조합해서 사용한다.

```html
<button class="btn btn--primary btn--md">
  <span class="btn__label">저장</span>
</button>
```

차원을 합쳐서 만들지 않는 이유 — 조합 수가 폭발한다. style 3개 × size 4개를 합치면 12개, 따로 만들면 7개.

각 차원의 클래스는 관련 속성을 묶는다.

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

### 상태 완전성

모든 인터랙티브 컴포넌트에 필수.

```
default  ·  hover  ·  pressed  ·  disabled
```

추가: `focus`(키보드) · `loading`(비동기)

## 네이밍 규칙

### CSS 클래스

| 차원 | 패턴 | 예시 |
|------|------|------|
| Block | `.[컴포넌트]` | `.btn`, `.badge`, `.input` |
| style | `.[컴포넌트]--[style]` | `.btn--primary`, `.btn--ghost` |
| size | `.[컴포넌트]--[size]` | `.btn--sm`, `.btn--lg` |
| state | `.[컴포넌트]--[state]` | `.btn--loading`, `.btn--error` |
| icon 위치 | `.[컴포넌트]--icon-[위치]` | `.btn--icon-left`, `.btn--icon-only` |

> ⚠️ `is-`, `has-` 접두어 사용 금지. BEM Modifier(`--`)로 통일한다.

> ⚠️ `hover`·`focus`·`pressed`는 CSS 의사 클래스(`:hover`, `:focus-visible`, `:active`)로 구현한다. 별도 클래스 금지. `disabled`·`loading`·`error`처럼 JS로 제어해야 하는 상태만 클래스로 정의한다.

> ✅ DO — full name 사용
> `<button class="btn btn--primary btn--md">`

> ❌ DON'T — 약어 사용
> `<button class="btn btn--pr btn--m">`

### Component 토큰

Semantic 토큰만으로 다크모드·테마 전환을 충분히 제어할 수 없을 때만 정의한다.

```
--[속성]-[컴포넌트]-[variant]-[역할]
예: --color-button-primary-fill, --color-button-primary-text
```

> ⚠️ Component 토큰을 신규 정의하면 해당 `tokens/*.css` 파일에 동시에 추가하고 사용처 주석을 명시한다.
