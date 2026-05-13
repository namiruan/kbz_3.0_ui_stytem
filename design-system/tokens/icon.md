---
file: tokens/icon.md
version: 1.0.0
depends-on: tokens/_index.md
---

# 아이콘 시스템

아이콘 크기는 컴포넌트 height와 매칭한다. 한 화면에서 outlined 또는 filled 중 하나의 스타일만 사용한다.

모든 아이콘은 `viewBox="0 0 24 24"` 기준으로 제작한다. SVG stroke-width는 CSS 토큰이 아닌 SVG 속성으로 직접 지정하며, 단위 없이 작성하면 크기가 달라져도 비율이 자동으로 유지된다.

| 아이콘 크기 | SVG stroke-width |
|------------|-----------------|
| 12px | `1` (0.75px 미만 방지) |
| 16px — 40px | `1.5` |

## Primitive

| 크기 | 사용처 | 토큰 |
|------|--------|------|
| 12px | 보조 인디케이터 (badge 내부, 메타 정보) | `--icon-12` |
| 16px | sm 컴포넌트 | `--icon-16` |
| 20px | md 컴포넌트 (Button, Input) | `--icon-20` |
| 24px | lg 컴포넌트, 페이지 헤더 | `--icon-24` |
| 30px | xl 컴포넌트 | `--icon-30` |
| 40px | 네비게이션, 대형 강조 | `--icon-40` |

아이콘은 **margin off(기본)** / **margin on(변칙)** 두 상태로 사용한다.

**margin off** — 아이콘 컴포넌트 적용 기본값.
- 버튼·인풋 등 컴포넌트 내 삽입되는 요소일 때
- 클릭 영역이 별도로 확보되는 콘텐츠 요소일 때

**margin on** — 아래 상황에서 사용하는 변칙값. 아이콘 주변에 배경이 생기며 크기별 패딩·코너곡률이 적용된다.
- 아이콘이 자체적으로 버튼 역할을 할 때
- 콘텐츠 내 구별을 위해 아이콘 배경이 필요할 때

| 크기 | margin-on 패딩 | margin-on 코너곡률 |
|------|--------------|-----------------|
| 24px — 40px | 6px | 4px |
| 12px — 20px | 4px | 2px |

## Do / Don't

> ✅ DO — 컴포넌트 height에 맞는 크기 토큰 사용
> `<Icon size="var(--icon-20)" />`

> ✅ DO — 아이콘이 직접 버튼 역할을 할 때 margin on + `aria-label`
> `<button class="btn-icon" aria-label="삭제"><Icon name="delete" size="var(--icon-20)" /></button>`

> ✅ DO — 텍스트와 함께 쓸 때 옵티컬 센터 정렬, 간격 `--space-gap-xs`, 색상 상속
> `<button class="btn btn--md"><Icon size="var(--icon-20)" />저장</button>`

> ✅ DO — SVG stroke-width는 단위 없이 작성
> `<path stroke-width="1.5" />`

> ❌ DON'T — outlined와 filled 혼용
> 선택적 강조(active 상태, 알림)에서만 filled 허용. 같은 화면에 두 스타일 공존 금지.

> ❌ DON'T — stroke-width에 px 단위 사용
> `stroke-width="1.5px"` — CSS 픽셀로 고정되어 아이콘 크기 변경 시 획 굵기 비율이 깨진다.

> ❌ DON'T — aria-label 없는 단독 아이콘 버튼
> `<button><Icon name="delete" /></button>` — 스크린 리더가 버튼 용도를 인식하지 못한다.
