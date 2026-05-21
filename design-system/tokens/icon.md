---
file: tokens/icon.md
version: 1.4.0
depends-on: tokens/_index.md, tokens/color.md
---

# 아이콘 시스템

아이콘 크기는 컴포넌트 height와 매칭한다. 모든 아이콘은 SVG fill 방식으로 제작하며(stroke 미사용), 크기·색상은 CSS로 제어한다.

## Semantic

### 크기

<!-- AI: :::scale icon renders icon size tokens:
--icon-badge: 12px  (badge 내부, 메타 정보)
--icon-sm:    16px  (sm 컴포넌트)
--icon-md:    20px  (md 컴포넌트 - Button, Input)
--icon-lg:    24px  (lg 컴포넌트, 페이지 헤더)
--icon-xl:    30px  (xl 컴포넌트, 네비게이션)
-->
:::scale icon

| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| badge | badge 내부, 메타 정보 | `--icon-badge` |
| sm | sm 컴포넌트 | `--icon-sm` |
| md | md 컴포넌트 (Button, Input) | `--icon-md` |
| lg | lg 컴포넌트, 페이지 헤더 | `--icon-lg` |
| xl | xl 컴포넌트, 네비게이션 | `--icon-xl` |

아이콘은 **padding off(기본)** / **padding on** 두 상태로 사용한다. padding on은 아이콘 주위에 padding을 추가해 터치·클릭 영역과 배경을 확보한다. 아이콘이 단독 버튼 역할이거나 배경 컨테이너가 필요한 경우 사용한다. padding off/on 클래스는 Utility 섹션을 참조한다.

### 컬러

아이콘 컬러는 SVG 구현 방식으로 두 가지로 구분한다.

**단색형** — 모든 path가 `fill="currentColor"`. CSS `color` 속성으로 일괄 제어하며 유틸리티 컬러 클래스(`.icon--brand` 등)를 적용한다. 텍스트와 함께 쓸 때는 `color: inherit`으로 상속한다.

**조합형** — 각 path에 `fill="var(--icon-[이름]-[부분])"` CSS 변수를 지정한다. CSS `color`로 제어되지 않으므로 유틸리티 컬러 클래스를 적용하지 않는다. 변수 미지정 시 fallback 색상이 적용된다.

hover·active 등 상태 변화는 부모 컴포넌트에서 `color`를 오버라이드해 제어한다. 아이콘 자체는 상태를 갖지 않는다.

단색형의 허용 컬러 상태와 적용 클래스는 아래 Utility 섹션을 참조한다.

### 조합형 CSS 변수

조합형 아이콘의 path별 변수는 `--icon-[아이콘이름]-[부분역할]` 패턴으로 정의하며, 기본적으로 시멘틱 토큰을 참조한다.

| 아이콘 | 부분 | 변수명 | 기본값 |
|--------|------|--------|--------|
| `new` | 배경 원 | `--icon-new-bg` | `--color-text-caution` |
| `new` | N 글자 | `--icon-new-n` | `--color-text-inverse` |
| `file-drop` | 배경 문서 | `--icon-file-drop-bg` | `--color-action-neutral-selected` |

진입 메뉴 아이콘 6종(`icon-machinery`, `icon-employee`, `icon-daily-worker`, `icon-helpdesk`, `icon-company`, `icon-construction`)은 4개의 공통 변수로 입체감을 표현한다. `.icon--{color}` 클래스가 이 변수들을 간접 override하므로 color 클래스 적용이 가능한 조합형이다.

| 변수 | 역할 | 기본값 |
|------|------|--------|
| `--icon-menu-vivid` | 메인 면 | `--color-text-brand-vivid` |
| `--icon-menu-deep` | 깊이·그림자 | `--color-text-brand-muted` |
| `--icon-menu-dark` | 구조·외곽 | `--color-text-body` |
| `--icon-menu-light` | 하이라이트 | `--color-text-inverse` |

`icon-pdf`, `icon-excel`은 제품 고유 브랜드 색상을 표현해야 하므로 예외적으로 변수 fallback에 hex 값을 직접 지정한다.

#### disabled 상태 (조합형 공통)

모든 조합형 아이콘은 disabled 컨텍스트(`.icon--disabled`, `:disabled .icon`, `[disabled] .icon`, `.btn--disabled .icon`)에서 색상 변수가 회색 계열 시멘틱 토큰으로 일괄 override된다.

| 부분 역할 | disabled 값 |
|----------|------------|
| 배경·주요 색상 (`-bg`, `-vivid`) | `--color-text-disabled` |
| 전경·글자·하이라이트 (`-fg`, `-n`, `-light`) | `--color-surface-disabled` |
| 구조·외곽·보조 (`-dark`, `-deep`) | `--color-text-subtle` |

CSS 구현은 `components/atoms/icon.md § CSS` 참조.

## Utility

### 크기

padding off: 아이콘만 표시(배경 없음). padding on: padding 추가로 배경 영역 확보, 단독 버튼 역할 시 사용.

| 그룹 | 사용처 | padding off | padding on | padding on 적용값 |
|------|--------|------------|-----------|-----------------|
| badge | badge 내부, 메타 정보 | `.icon--badge` | `.icon-on--badge` | `--space-inset-xs` |
| sm | sm 컴포넌트 | `.icon--sm` | `.icon-on--sm` | `--space-inset-xs` |
| md | md 컴포넌트 (Button, Input) | `.icon--md` | `.icon-on--md` | `--space-inset-sm` |
| lg | lg 컴포넌트, 페이지 헤더 | `.icon--lg` | `.icon-on--lg` | `--space-inset-sm` |
| xl | xl 컴포넌트, 네비게이션 | `.icon--xl` | `.icon-on--xl` | `--space-inset-md` |

### 컬러

단색형 아이콘에만 적용한다. 조합형은 SVG 레벨에서 직접 시멘틱 컬러 토큰을 참조한다.

| 상태 | 사용처 | 클래스 | 참조 토큰 |
|------|--------|--------|----------|
| 브랜드 기본 | 단색 아이콘 기본 | `.icon--brand` | `--color-text-brand-vivid` |
| 중립 dark | 밝은 배경 위 아이콘 | `.icon--dark` | `--color-text-body` |
| 중립 light | 어두운 배경 위 아이콘 | `.icon--white` | `--color-text-inverse` |
| disabled | disabled 상태 | `.icon--disabled` | `--color-text-disabled` |

## Do / Don't

> ✅ DO — padding off: 텍스트와 함께 쓰거나 장식용
> `<div class="icon--md icon--brand">...</div>`

> ✅ DO — padding on: 단독 버튼 역할
> `<button class="icon-on--md icon--brand" aria-label="삭제">...</button>`

> ❌ DON'T — `icon-on--{size}`와 `icon--{size}` 함께 사용
> `<div class="icon-on--md icon--md">` ← `icon-on--{size}` 단독으로 쓴다. 함께 쓰면 border-radius가 중복 적용된다.

> ❌ DON'T — 클래스를 svg에 직접 적용
> `<svg class="icon--md">` ← 크기·radius가 `> svg` 자식 선택자로 적용되므로 반드시 래퍼에 붙여야 한다.

> ❌ DON'T — 아이콘 색상에 Primitive 컬러 직접 사용
> `fill: var(--color-blue-500)` — 단색형은 `.icon--{color}` 클래스, 조합형은 시멘틱 토큰을 참조한다. Primitive 직접 참조 금지.
