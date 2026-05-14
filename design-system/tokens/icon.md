---
file: tokens/icon.md
version: 1.1.0
depends-on: tokens/_index.md
---

# 아이콘 시스템

아이콘 크기는 컴포넌트 height와 매칭한다.

모든 아이콘은 fill 방식으로 제작하며 `fill="currentColor"`를 사용한다. 크기·컬러는 CSS로 제어한다.

## Primitive

:::scale icon

## Semantic

### 크기

| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| badge | badge 내부, 메타 정보 | `--icon-badge` |
| sm | sm 컴포넌트 | `--icon-sm` |
| md | md 컴포넌트 (Button, Input) | `--icon-md` |
| lg | lg 컴포넌트, 페이지 헤더 | `--icon-lg` |
| xl | xl 컴포넌트, 네비게이션 | `--icon-xl` |

아이콘은 **margin off(기본)** / **margin on(버튼·배경 강조 시)** 두 상태로 사용한다. margin on 클래스는 Utility 섹션을 참조한다.

### 컬러

아이콘 컬러는 SVG 구현 방식으로 구분한다. `fill="currentColor"`를 사용하면 단색형 — CSS `color`로 제어하며 유틸리티 클래스를 적용한다. 각 path에 `fill="var(--color-*)"` 토큰을 직접 참조하면 조합형 — 유틸리티 컬러 클래스를 적용하지 않는다. 텍스트와 함께 쓸 때는 `color: inherit`으로 상속한다.

| 상태 | 사용처 | 토큰 |
|------|--------|------|
| 브랜드 기본 | 단색 아이콘 기본 | `--color-text-brand-vivid` |
| 중립 dark | 밝은 배경 위 아이콘 | `--color-text-body` |
| 중립 light | 어두운 배경 위 아이콘 | `--color-text-inverse` |
| disabled | disabled 단색 아이콘 | `--color-text-disabled` |

## Utility

### 크기

margin off: 아이콘만 표시(배경 없음). margin on: padding 추가로 배경 영역 확보, 단독 버튼 역할 시 사용.

| 그룹 | 사용처 | margin off | margin on |
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

> ✅ DO — margin off: 텍스트와 함께 쓰거나 장식용. SVG에 `aria-hidden="true"` 적용
> `<div class="icon--md icon--brand"><Icon name="search" aria-hidden="true" /></div>`

> ✅ DO — margin on: 아이콘이 단독 버튼 역할을 할 때. `aria-label` 필수
> `<button class="icon-on--md icon--brand" aria-label="삭제"><Icon name="delete" aria-hidden="true" /></button>`

> ✅ DO — fill 방식으로 제작, SVG에 `fill="currentColor"` 사용
> `<svg fill="currentColor" viewBox="0 0 24 24">...</svg>`

> ✅ DO — 선 두께는 외곽·내곽 패스 간격으로 표현, 24px 기준 2유닛
> `<path fill-rule="evenodd" d="M12 5a7 7 0 1 0 0 14 ..."/>`

> ❌ DON'T — stroke 방식 사용
> `<path stroke="currentColor" stroke-width="1.5" fill="none" />` — Windows 1x 디스플레이에서 서브픽셀 번짐 발생.

> ❌ DON'T — outlined와 filled 혼용
> 선택적 강조(active 상태, 알림)에서만 filled 허용. 같은 화면에 두 스타일 공존 금지.

> ❌ DON'T — aria-label 없는 단독 아이콘 버튼
> `<button><Icon name="delete" /></button>` — 스크린 리더가 버튼 용도를 인식하지 못한다.

> ❌ DON'T — 아이콘 색상에 Primitive 컬러 직접 사용
> `fill: var(--color-blue-500)` — 반드시 `--color-text-*` 시멘틱 토큰을 통해 참조한다.
