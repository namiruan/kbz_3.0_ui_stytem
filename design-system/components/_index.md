---
file: components/_index.md
version: 0.8.0
depends-on: tokens/_index.md
---

# 컴포넌트 아키텍처

## 컴포넌트 계층

시스템 기반(토큰·공간·색상·타이포·elevation·모션·아이콘)이 모두 정의된 후 아래 순서로 작업한다.

```
Atom  →  Molecule  →  Organism  →  Pattern
```

상위 레이어는 하위 레이어가 완성된 후에 시작한다. Atom이 없으면 Molecule을 만들지 않는다.

| 레이어 | 기준 | 컴포넌트 |
|--------|------|----------|
| **Atom** | 분해 불가, 의존성 없음 | Button · Input · Textarea · Checkbox · Radio · Toggle · Badge · Tag · Icon · Spinner · Tooltip · Divider |
| **Molecule** | Atom 2개+ 결합, 단일 기능 | FormField · SearchBar · Dropdown · DatePicker · DateRangePicker · Pagination · Tabs · Accordion · Toast · Alert · FileUpload |
| **Organism** | 자체 레이아웃 보유 | Table · SidebarNav · Card · TopNav · FilterBar · Form · Modal · EmptyState · Drawer |
| **Pattern** | 페이지 수준 구조 | Dashboard · ListPage · DetailPage · SettingsPage · AuthPage · ErrorPage |

> ⚠️ 하위 레이어가 상위를 import 금지. Molecule은 Atom만 포함.

## Variant 모델

모든 컴포넌트는 아래 차원의 조합으로 정의하고, 각 차원은 CSS 클래스로 표현한다.

```
컴포넌트 = type × style × size × state × icon(optional)
```

| 차원 | CSS 패턴 | 예시 |
|------|----------|------|
| Block | `.[컴포넌트]` | `.btn`, `.badge`, `.input` |
| style | `.[컴포넌트]--[style]` | `.btn--primary`, `.btn--ghost` |
| size | `.[컴포넌트]--[size]` | `.btn--sm`, `.btn--lg` |
| state | `.[컴포넌트]--[state]` | `.btn--loading`, `.btn--error` |
| icon 위치 | `.[컴포넌트]--icon-[위치]` | `.btn--icon-left`, `.btn--icon-only` |

> ⚠️ `is-`, `has-` 접두어 사용 금지. BEM Modifier(`--`)로 통일한다.

> ⚠️ `hover`·`focus`·`pressed`는 CSS 의사 클래스(`:hover`, `:focus-visible`, `:active`)로 구현한다. 별도 클래스 금지. `disabled`·`loading`·`error`처럼 JS로 제어해야 하는 상태만 클래스로 정의한다.

> ⚠️ 약어 사용 금지. 차원명은 full name으로 작성한다.
> ✅ `.btn--primary .btn--md`  ❌ `.btn--pr .btn--m`

### 상태 완전성 — 모든 인터랙티브 컴포넌트에 필수

```
default  ·  hover  ·  pressed  ·  disabled
```

추가: `focus`(키보드) · `loading`(비동기)

## 네이밍 규칙

### Component 토큰

Semantic 토큰만으로 다크모드·테마 전환을 충분히 제어할 수 없을 때만 정의한다.

```
--[속성]-[컴포넌트]-[variant]-[역할]
예: --color-button-primary-fill, --color-button-primary-text
```

> ⚠️ Component 토큰을 신규 정의하면 해당 `tokens/*.css` 파일에 동시에 추가하고 사용처 주석을 명시한다.
