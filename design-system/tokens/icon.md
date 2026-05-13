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
| 16px — 24px | `1.5` |

## Primitive

| 크기 | 사용처 | 토큰 |
|------|--------|------|
| 12px | 보조 인디케이터 (badge 내부, 메타 정보) | `--icon-12` |
| 16px | md 컴포넌트 (Button, Input) | `--icon-16` |
| 20px | lg 컴포넌트, 단독 아이콘 버튼 | `--icon-20` |
| 24px | xl 컴포넌트, 페이지 헤더, 네비게이션 | `--icon-24` |

## Do / Don't

> ✅ DO — 컴포넌트 height에 맞는 크기 토큰 사용
> `<Icon size="var(--icon-16)" />`

> ✅ DO — 단독 아이콘 버튼에 `aria-label` 필수
> `<button class="btn-icon" aria-label="삭제"><Icon name="delete" size="var(--icon-20)" /></button>`

> ✅ DO — 텍스트와 함께 쓸 때 옵티컬 센터 정렬, 간격 `--space-gap-xs`, 색상 상속
> `<button class="btn btn--md"><Icon size="var(--icon-16)" />저장</button>`

> ✅ DO — SVG stroke-width는 단위 없이 작성
> `<path stroke-width="1.5" />`

> ❌ DON'T — outlined와 filled 혼용
> 선택적 강조(active 상태, 알림)에서만 filled 허용. 같은 화면에 두 스타일 공존 금지.

> ❌ DON'T — stroke-width에 px 단위 사용
> `stroke-width="1.5px"` — CSS 픽셀로 고정되어 아이콘 크기 변경 시 획 굵기 비율이 깨진다.

> ❌ DON'T — aria-label 없는 단독 아이콘 버튼
> `<button><Icon name="delete" /></button>` — 스크린 리더가 버튼 용도를 인식하지 못한다.
