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
| 보조 인디케이터 | badge 내부, 메타 정보 | `--icon-badge` |
| sm | sm 컴포넌트 | `--icon-sm` |
| md | md 컴포넌트 (Button, Input) | `--icon-md` |
| lg | lg 컴포넌트, 페이지 헤더 | `--icon-lg` |
| xl | xl 컴포넌트, 네비게이션 (margin on) | `--icon-xl` |

아이콘은 **margin off(기본)** / **margin on(변칙)** 두 상태로 사용한다.

**margin off** — 컴포넌트 내 삽입되는 기본 상태.
- 버튼·인풋 등 컴포넌트 내 삽입되는 요소일 때
- 클릭 영역이 별도로 확보되는 콘텐츠 요소일 때

**margin on** — 아래 상황에서 사용하는 변칙값. 아이콘 주변에 배경이 생기며 크기별 패딩·코너곡률이 적용된다.
- 아이콘이 자체적으로 버튼 역할을 할 때
- 콘텐츠 내 구별을 위해 아이콘 배경이 필요할 때

| 크기 | margin-on 패딩 | margin-on 코너곡률 |
|------|--------------|-----------------|
| badge, sm | `--space-inset-xs` | `--radius-xs` |
| md, lg | `--space-inset-sm` | `--radius-sm` |
| xl | `--space-inset-md` | `--radius-sm` |

### 선 두께

fill 방식에서 선 두께는 외곽·내곽 패스 간격으로 결정된다. **24px 기준 2유닛**을 표준으로 한다.

| 선 두께 (24px 기준) | 16px 렌더 | 20px 렌더 | 24px 렌더 | 용도 |
|-------------------|----------|----------|----------|------|
| 2유닛 (표준) | 1.33px | 1.67px | 2px | 일반 아이콘 |
| 1.5유닛 (세선) | 1px | 1.25px | 1.5px | 복잡한 형태, 세부 요소 |

16px·20px은 비정수 스케일로 인해 엣지 안티얼라이싱이 발생하나, fill 방식은 stroke 방식 대비 서브픽셀 번짐이 없어 실사용에서 허용 범위 내에 있다.

### 컬러

브랜드 아이콘은 아래 변형값을 기준으로 제작한다. 포인트가 필요하거나 특수한 아이콘인 경우 예외 컬러 적용.
아이콘 색상은 `--color-text-*` 토큰을 참조하며, 텍스트와 함께 사용할 때는 `fill: inherit`으로 상속한다.

**Color — 브랜드 아이콘 기본**

단색 아이콘은 `--color-text-brand-vivid`를 기본으로, 중요도가 낮은 경우 `--color-text-brand-muted`를 사용한다.
배색이 있는 경우 아래 조합 내에서 적용한다.

| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| 브랜드 기본 | 단색 아이콘 기본색 | `--color-text-brand-vivid` |
| 브랜드 보조 | 중요도 낮은 브랜드 아이콘 | `--color-text-brand-muted` |
| 중립 dark | 배색 조합 내 어두운 보조색 | `--color-text-body` |
| 중립 fill | 배색 조합 내 밝은 보조색 | `--color-text-inverse` |

**gray — disabled 상태**

단색 아이콘의 경우 `--color-text-disabled`, 배색이 있는 경우 아래 조합 내에서 적용한다.

| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| disabled 기본 | disabled 단색 아이콘 | `--color-text-disabled` |
| disabled 보조 | 배색 아이콘 disabled 내 보조색 | `--color-text-subtle` |

**dark · white — 배경 대비 변형**

삽입 요소에 배경이 있거나, 타 요소 대비 시인성을 낮춰야 할 때 사용하는 변형값.

| 그룹 | 배경 조건 | 사용처 | 토큰 |
|------|----------|--------|------|
| dark | 고명도(밝은) 배경 | 배경 위 어두운 아이콘 | `--color-text-body` |
| white | 저명도(어두운) 배경 | 배경 위 밝은 아이콘 | `--color-text-inverse` |

## Utility

세 종류의 modifier 클래스를 조합해서 사용한다.

**크기 그룹 기본** — 코너 곡률 포함. margin 유무와 관계없이 항상 적용.

| 그룹 | 클래스 | border-radius |
|------|--------|---------------|
| badge · sm | `.icon--badge` `.icon--sm` | `--radius-xs` |
| md · lg · xl | `.icon--md` `.icon--lg` `.icon--xl` | `--radius-sm` |

**margin on** — 아이콘이 버튼 역할이거나 배경 강조가 필요할 때 추가.

| 그룹 | 클래스 | padding |
|------|--------|---------|
| badge · sm | `.icon-on--xs` | `--space-inset-xs` |
| md · lg | `.icon-on--sm` | `--space-inset-sm` |
| xl | `.icon-on--md` | `--space-inset-md` |

**컬러**

| 클래스 | 토큰 |
|--------|------|
| `.icon--brand` | `--color-text-brand-vivid` |
| `.icon--muted` | `--color-text-brand-muted` |
| `.icon--dark` | `--color-text-body` |
| `.icon--white` | `--color-text-inverse` |
| `.icon--disabled` | `--color-text-disabled` |

```html
<!-- margin off -->
<div class="icon--md icon--brand">
  <Icon name="search" size="var(--icon-md)" />
</div>

<!-- margin on -->
<button class="icon--md icon-on--sm icon--brand" aria-label="삭제">
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
