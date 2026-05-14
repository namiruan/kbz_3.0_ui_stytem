---
file: tokens/icon.md
version: 1.1.0
depends-on: tokens/_index.md
---

# 아이콘 시스템

아이콘 크기는 컴포넌트 height와 매칭한다. 한 화면에서 outlined 또는 filled 중 하나의 스타일만 사용한다.

모든 아이콘은 `viewBox="0 0 24 24"` 기준으로 제작한다. **stroke가 아닌 fill 방식**으로 제작하며, 선은 외곽 패스와 내곽 패스 사이의 채운 영역으로 표현한다. 이는 Windows 1x 디스플레이를 포함한 모든 환경에서 서브픽셀 렌더링 문제를 방지하기 위함이다.

아트워크는 **내부 2px 안전 여백** 안에 배치한다 — viewBox 좌표 기준 x: 2–22, y: 2–22. 원형·다이아몬드 등 일부 모양은 동일한 시각 무게감을 위해 이 경계를 약간 벗어나는 시각 보정을 적용할 수 있다. 선 두께 기준은 외곽·내곽 패스 간격 **2유닛(24px 기준)**이다.

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

아이콘은 **margin off(기본)** / **margin on(변칙)** 두 상태로 사용한다. margin on 클래스 조합은 Utility 섹션을 참조한다.

### 선 두께

fill 방식에서 선 두께는 외곽·내곽 패스 간격으로 결정된다. 16px·20px은 비정수 스케일로 엣지 안티얼라이싱이 발생하나 실사용 허용 범위 내에 있다.

| 두께 (24px 기준) | 16px | 20px | 24px | 용도 |
|----------------|------|------|------|------|
| 2유닛 (표준) | 1.33px | 1.67px | 2px | 일반 아이콘 |
| 1.5유닛 (세선) | 1px | 1.25px | 1.5px | 복잡한 형태, 세부 요소 |

### 컬러

아이콘 색상은 `--color-text-*` 토큰을 참조하며, 텍스트와 함께 쓸 때는 `fill: inherit`으로 상속한다.

아이콘 컬러는 단색형과 조합형으로 구분한다. 단색형은 유틸리티 클래스로 제어하고, 조합형(네비게이션 아이콘 등)은 SVG 내 각 path에 `--color-*` 시멘틱 토큰을 직접 참조한다.

| 상태 | 사용처 | 토큰 |
|------|--------|------|
| 브랜드 기본 | 단색 아이콘 기본 | `--color-text-brand-vivid` |
| 중립 dark | 밝은 배경 위 아이콘 | `--color-text-body` |
| 중립 light | 어두운 배경 위 아이콘 | `--color-text-inverse` |
| disabled | disabled 단색 아이콘 | `--color-text-disabled` |

## Utility

### 크기

크기 그룹별로 기본 클래스(border-radius 적용)와 margin-on 클래스(padding 추가)를 조합한다. 기본 클래스는 항상 적용하고, margin-on은 아이콘이 버튼 역할을 하거나 배경 강조가 필요할 때만 추가한다.

| 그룹 | 사용처 | 클래스 |
|------|--------|--------|
| badge | badge 내부, 메타 정보 | `.icon--badge`, `.icon-on--badge` |
| sm | sm 컴포넌트 | `.icon--sm`, `.icon-on--sm` |
| md | md 컴포넌트 (Button, Input) | `.icon--md`, `.icon-on--md` |
| lg | lg 컴포넌트, 페이지 헤더 | `.icon--lg`, `.icon-on--lg` |
| xl | xl 컴포넌트, 네비게이션 | `.icon--xl`, `.icon-on--xl` |

### 컬러

단색형 아이콘에만 적용한다. 조합형은 SVG 레벨에서 직접 시멘틱 컬러 토큰을 참조한다.

| 상태 | 사용처 | 클래스 |
|------|--------|--------|
| 브랜드 기본 | 단색 아이콘 기본 | `.icon--brand` |
| 중립 dark | 밝은 배경 위 아이콘 | `.icon--dark` |
| 중립 light | 어두운 배경 위 아이콘 | `.icon--white` |
| disabled | disabled 상태 | `.icon--disabled` |

```html
<!-- margin off -->
<div class="icon--md icon--brand">
  <Icon name="search" size="var(--icon-md)" />
</div>

<!-- margin on -->
<button class="icon--md icon-on--md icon--brand" aria-label="삭제">
  <Icon name="delete" size="var(--icon-md)" />
</button>
```

## Do / Don't

> ✅ DO — 컴포넌트 height에 맞는 크기 토큰 사용
> `<Icon size="var(--icon-md)" />`

> ✅ DO — fill 방식으로 제작, SVG에 `fill="currentColor"` 사용
> `<svg fill="currentColor" viewBox="0 0 24 24">...</svg>`

> ✅ DO — 선 두께는 외곽·내곽 패스 간격으로 표현, 24px 기준 2유닛
> `<path fill-rule="evenodd" d="M12 5a7 7 0 1 0 0 14 ..."/>`

> ✅ DO — 아이콘이 직접 버튼 역할을 할 때 margin on + `aria-label`
> `<button class="btn-icon" aria-label="삭제"><Icon name="delete" size="var(--icon-md)" /></button>`

> ✅ DO — 텍스트와 함께 쓸 때 옵티컬 센터 정렬, 간격 `--space-gap-xs`, 색상 상속

> ❌ DON'T — stroke 방식 사용
> `<path stroke="currentColor" stroke-width="1.5" fill="none" />` — Windows 1x 디스플레이에서 서브픽셀 번짐 발생.

> ❌ DON'T — outlined와 filled 혼용
> 선택적 강조(active 상태, 알림)에서만 filled 허용. 같은 화면에 두 스타일 공존 금지.

> ❌ DON'T — aria-label 없는 단독 아이콘 버튼
> `<button><Icon name="delete" /></button>` — 스크린 리더가 버튼 용도를 인식하지 못한다.

> ❌ DON'T — 아이콘 색상에 Primitive 컬러 직접 사용
> `fill: var(--color-blue-500)` — 반드시 `--color-text-*` 시멘틱 토큰을 통해 참조한다.
