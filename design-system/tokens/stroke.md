---
file: tokens/stroke.md
version: 1.0.0
depends-on: tokens/_index.md
---

# 스트로크 시스템

선의 두께(width)와 스타일(style)을 정의한다. CSS `border`와 SVG `stroke-width` 양쪽에서 동일한 토큰을 참조한다.

## Primitive

### Width

:::scale stroke-width

| 토큰 | 값 | 사용처 |
|------|----|--------|
| `--stroke-sm` | `1px` | 아이콘 세선, 표 구분선 |
| `--stroke-md` | `1.5px` | 아이콘 기본, 일반 외곽선 |
| `--stroke-lg` | `5px` | 지도 강조 레이어, 굵은 경계선 |

### Style

:::scale stroke-style

| 토큰 | 값 | 사용처 |
|------|----|--------|
| `--stroke-solid` | `solid` | 기본 선 |
| `--stroke-dashed` | `dashed` | 행 구분선, 비활성 경계 |
| `--stroke-dotted` | `dotted` | 보조 구분선 |

## 컨텍스트별 적용

CSS와 SVG는 속성 이름이 다르지만 토큰 값은 공용이다.

```css
/* CSS — border */
border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);

/* CSS — 표 구분선 (dashed) */
border-bottom: var(--stroke-sm) var(--stroke-dashed) var(--color-border-subtle);

/* SVG — 아이콘 */
stroke-width: var(--stroke-md);

/* SVG — 지도 강조 레이어 */
stroke-width: var(--stroke-lg);
stroke: var(--color-border-selected);
```

## 아이콘에서의 사용

아이콘은 `--stroke-md`를 기본으로 사용한다. viewBox는 24×24px 기준이며, 이 크기에서 `1.5px`이 가장 균형 잡힌 선 두께다.

- **세선 아이콘** (정보 밀도가 높은 컨텍스트): `--stroke-sm`
- **기본 아이콘**: `--stroke-md`
- stroke 값은 아이콘 파일 내부에 하드코딩하지 않고 토큰을 참조한다

```svg
<path stroke-width="var(--stroke-md)" ... />
```

> ⚠️ SVG `stroke-width`는 viewBox 좌표계 기준이다. 아이콘을 16px 이하로 축소할 경우 렌더링 시 픽셀 스냅 오류가 생길 수 있으므로 `--stroke-sm`으로 전환을 검토한다.

## Do / Don't

> ✅ DO — 토큰으로 선 두께 통일
> `stroke-width: var(--stroke-md);`

> ✅ DO — border 축약형에서도 토큰 조합 사용
> `border: var(--stroke-sm) var(--stroke-dashed) var(--color-border-subtle);`

> ❌ DON'T — 하드코딩된 수치 사용
> `stroke-width: 1.5;` `border-width: 1px;`

> ❌ DON'T — `--stroke-lg`를 UI 컴포넌트 외곽선에 사용
> 5px는 지도·강조 전용이다. 컴포넌트 border에는 `--stroke-sm` 또는 `--stroke-md`를 사용한다.
