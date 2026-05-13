---
file: tokens/stroke.md
version: 1.3.0
depends-on: tokens/_index.md
---

# 스트로크 시스템

선의 두께(width)와 스타일(style)을 정의한다. CSS `border`와 SVG `stroke-width` 양쪽에서 동일한 토큰을 참조한다. 아이콘 stroke는 SVG viewBox 스케일링으로 처리하므로 토큰 대상이 아니다 — `tokens/icon.md` 참조.

## Primitive

### Width

:::scale stroke-width

### Style

CSS `border-style` 값. SVG 단순 선 스타일에도 사용한다.

:::scale stroke-style

## Utility

점·대시 패턴은 `stroke-width + stroke-dasharray + stroke-linecap` 조합이 함께 써야 의미가 있다. SVG 전용이다.

| 그룹 | 사용처 | 클래스 |
|------|--------|--------|
| `dot` | 지도 점 패턴 (5px 원형 점) | `.stroke-dot` |
| `dash` | 데이터테이블 보조 셀 구분선 (1px 균등 대시) | `.stroke-dash` |

```svg
<path class="stroke-dot" d="..." />
<path class="stroke-dash" d="..." />
```

## Do / Don't

> ✅ DO — CSS border에 width + style 토큰 조합
> `border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);`

> ✅ DO — SVG 지도 강조 레이어에 width 토큰
> `stroke-width: var(--stroke-lg); stroke: var(--color-border-selected);`

> ✅ DO — 점·대시 패턴은 Utility 클래스로
> `<path class="stroke-dot" d="..." />`

> ❌ DON'T — 하드코딩된 수치 사용
> `border-width: 1px;` `stroke-width: 5;`

> ❌ DON'T — `--stroke-lg`를 UI 컴포넌트 외곽선에 사용
> 5px는 지도·강조 전용이다. 컴포넌트 border에는 `--stroke-sm` 또는 `--stroke-md`를 사용한다.

> ❌ DON'T — Utility 클래스를 CSS border에 사용
> `.stroke-dot`은 SVG `stroke-*` 속성 조합이다. CSS `border`에는 적용되지 않는다.
