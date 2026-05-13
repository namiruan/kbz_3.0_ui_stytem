---
file: tokens/icon.md
version: 1.0.0
depends-on: tokens/_index.md
---

# 아이콘 시스템

아이콘 크기는 컴포넌트 height와 매칭한다. 한 화면에서 outlined 또는 filled 중 하나의 스타일만 사용한다.

모든 아이콘은 `viewBox="0 0 24 24"` 기준으로 제작한다. SVG stroke-width는 CSS 토큰이 아닌 SVG 속성으로 직접 지정하며, 단위 없이 작성하면 크기가 달라져도 비율이 자동으로 유지된다.

아이콘 배치는 4px 그리드를 기준으로 하며, 원형·다이아몬드 등 일부 모양은 동일한 시각 무게감을 위해 그리드 경계를 약간 벗어나는 시각 보정을 적용할 수 있다.

stroke-width는 **24px 기준** 으로 지정한다. 요소가 단순할수록 굵게(최대 `3`), 복잡할수록 가늘게(최소 `1.5`) 사용하며, 동일한 값이 렌더 크기에 맞춰 자동 비례 적용된다.

| 렌더 크기 | 복잡 `sw 1.5` | 단순 `sw 3` |
|----------|-------------|-----------|
| 12px | 0.75px | 1.5px |
| 16px | 1px | 2px |
| 20px | 1.25px | 2.5px |
| **24px** | **1.5px** | **3px** |
| 30px | 1.875px | 3.75px |

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

### 컬러

브랜드 아이콘은 아래 변형값을 기준으로 제작한다. 포인트가 필요하거나 특수한 아이콘인 경우 예외 컬러 적용.
아이콘 색상은 `--color-text-*` 토큰을 참조하며, 텍스트와 함께 사용할 때는 `color: inherit`으로 상속한다.

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

margin on 상태에서 아이콘 크기 그룹에 맞는 클래스를 선택한다.

| 그룹 | 클래스 |
|------|--------|
| badge · sm | `.icon-on--xs` |
| md · lg | `.icon-on--sm` |
| xl | `.icon-on--md` |

```html
<button class="icon-on--sm" aria-label="삭제">
  <Icon name="delete" size="var(--icon-md)" />
</button>
```

## Do / Don't

> ✅ DO — 컴포넌트 height에 맞는 크기 토큰 사용
> `<Icon size="var(--icon-md)" />`

> ✅ DO — 아이콘이 직접 버튼 역할을 할 때 margin on + `aria-label`
> `<button class="btn-icon" aria-label="삭제"><Icon name="delete" size="var(--icon-md)" /></button>`

> ✅ DO — 텍스트와 함께 쓸 때 옵티컬 센터 정렬, 간격 `--space-gap-xs`, 색상 상속
> `<button class="btn btn--md"><Icon size="var(--icon-md)" />저장</button>`

> ✅ DO — SVG stroke-width는 단위 없이 작성
> `<path stroke-width="1.5" />`

> ❌ DON'T — outlined와 filled 혼용
> 선택적 강조(active 상태, 알림)에서만 filled 허용. 같은 화면에 두 스타일 공존 금지.

> ❌ DON'T — stroke-width에 px 단위 사용
> `stroke-width="1.5px"` — CSS 픽셀로 고정되어 아이콘 크기 변경 시 획 굵기 비율이 깨진다.

> ❌ DON'T — aria-label 없는 단독 아이콘 버튼
> `<button><Icon name="delete" /></button>` — 스크린 리더가 버튼 용도를 인식하지 못한다.

> ❌ DON'T — 아이콘 색상에 Primitive 컬러 직접 사용
> `color: var(--color-blue-500)` — 반드시 `--color-text-*` 시멘틱 토큰을 통해 참조한다.
