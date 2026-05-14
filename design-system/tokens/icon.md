---
file: tokens/icon.md
version: 1.1.0
depends-on: tokens/_index.md
---

# 아이콘 시스템

아이콘 크기는 컴포넌트 height와 매칭한다.

모든 아이콘은 SVG fill 방식으로 제작한다(stroke 미사용). 크기는 CSS로 제어한다. 색상 제어 방식은 단색형·조합형에 따라 다르며 아래 Semantic 컬러 섹션을 참조한다.

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

**조합형** — 각 path에 `fill="var(--color-*)"` 시멘틱 토큰을 개별 지정. CSS `color`가 아닌 SVG 속성으로 색상이 고정되므로 유틸리티 컬러 클래스를 적용하지 않는다.
```html
<!-- 조합형 예시: path별로 다른 시멘틱 토큰 직접 지정 -->
<path fill="var(--color-text-brand-vivid)" d="..." />
<path fill="var(--color-text-body)" d="..." />
```

hover·active 등 상태 변화는 부모 컴포넌트에서 `color`를 오버라이드해 제어한다. 아이콘 자체는 상태를 갖지 않는다.

단색형 아이콘의 허용 컬러 상태. 유틸리티 클래스로 적용하며 아래 Utility 섹션을 참조한다.

| 상태 | 사용처 | 토큰 |
|------|--------|------|
| 브랜드 기본 | 단색 아이콘 기본 | `--color-text-brand-vivid` |
| 중립 dark | 밝은 배경 위 아이콘 | `--color-text-body` |
| 중립 light | 어두운 배경 위 아이콘 | `--color-text-inverse` |
| disabled | disabled 단색 아이콘 | `--color-text-disabled` |

## Utility

### 크기

padding off: 아이콘만 표시(배경 없음). padding on: padding 추가로 배경 영역 확보, 단독 버튼 역할 시 사용.

| 그룹 | 사용처 | padding off | padding on |
|------|--------|------------|-----------|
| badge | badge 내부, 메타 정보 | `.icon--badge` | `.icon-on--badge` |
| sm | sm 컴포넌트 | `.icon--sm` | `.icon-on--sm` |
| md | md 컴포넌트 (Button, Input) | `.icon--md` | `.icon-on--md` |
| lg | lg 컴포넌트, 페이지 헤더 | `.icon--lg` | `.icon-on--lg` |
| xl | xl 컴포넌트, 네비게이션 | `.icon--xl` | `.icon-on--xl` |

### 컬러

단색형 아이콘에만 적용한다. 조합형은 SVG 레벨에서 직접 시멘틱 컬러 토큰을 참조한다.

| 상태 | 사용처 | 클래스 |
|------|--------|--------|
| 브랜드 기본 | 단색 아이콘 기본 | `.icon--brand` |
| 중립 dark | 밝은 배경 위 아이콘 | `.icon--dark` |
| 중립 light | 어두운 배경 위 아이콘 | `.icon--white` |
| disabled | disabled 상태 | `.icon--disabled` |

## Do / Don't

> ✅ DO — padding off: 텍스트와 함께 쓰거나 장식용. SVG에 `aria-hidden="true"` 적용
> `<div class="icon--md icon--brand"><Icon name="search" aria-hidden="true" /></div>`

> ✅ DO — padding on: 아이콘이 단독 버튼 역할을 할 때. `aria-label` 필수
> `<button class="icon-on--md icon--brand" aria-label="삭제"><Icon name="delete" aria-hidden="true" /></button>`

> ❌ DON'T — aria-label 없는 단독 아이콘 버튼
> `<button><Icon name="delete" /></button>` — 스크린 리더가 버튼 용도를 인식하지 못한다.

> ❌ DON'T — 아이콘 색상에 Primitive 컬러 직접 사용
> `fill: var(--color-blue-500)` — 단색형은 `--color-text-*`, 조합형은 각 path에 맞는 시멘틱 토큰을 직접 참조한다. Primitive 컬러 직접 참조 금지.
