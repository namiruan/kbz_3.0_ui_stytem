---
file: tokens/stroke.md
version: 1.2.0
depends-on: tokens/_index.md
---

# 스트로크 시스템

선의 두께(width), 스타일(style), 점선 패턴(pattern)을 정의한다. CSS `border`와 SVG `stroke-width` 양쪽에서 동일한 토큰을 참조한다.

## Primitive

### Width

:::scale stroke-width

### Style

CSS `border-style` 값. SVG에서 단순 실선·점선이 필요할 때도 사용한다.

:::scale stroke-style

### Pattern

SVG `stroke-dasharray` 전용. CSS `border`에는 적용되지 않는다. 값은 `선분 길이 간격` 형식이다.

:::scale stroke-pattern

## 컨텍스트별 적용

CSS와 SVG는 속성 이름이 다르지만 width · style 토큰 값은 공용이다. Pattern은 SVG 전용이다.

```css
/* CSS — border */
border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);

/* CSS — 표 구분선 */
border-bottom: var(--stroke-sm) var(--stroke-dashed) var(--color-border-subtle);

/* SVG — 아이콘 */
stroke-width: var(--stroke-md);

/* SVG — 지도 강조 레이어 */
stroke-width: var(--stroke-lg);
stroke: var(--color-border-selected);

/* SVG — 지도 점 패턴 */
stroke-dasharray: var(--stroke-pattern-dot);
stroke-linecap: round;

/* SVG — 지도 대시 패턴 */
stroke-dasharray: var(--stroke-pattern-dash);
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

## Utility

Pattern 토큰은 선 두께와 함께 써야 의미가 있다. Utility 클래스가 `stroke-width + stroke-dasharray + stroke-linecap` 조합을 단일 이름으로 묶는다. SVG 전용이다.

| 그룹 | 사용처 | 클래스 |
|------|--------|--------|
| `dot` | 지도 점 패턴 (1px 원형 점) | `.stroke-dot` |
| `dash` | 지도 대시 패턴 (5px 균등 대시) | `.stroke-dash` |

```svg
<!-- 점 패턴 -->
<path class="stroke-dot" d="..." />

<!-- 대시 패턴 -->
<path class="stroke-dash" d="..." />
```

## Do / Don't

> ✅ DO — 토큰으로 선 두께 통일
> `stroke-width: var(--stroke-md);`

> ✅ DO — 점 패턴에 `stroke-linecap: round` 함께 사용
> `stroke-dasharray: var(--stroke-pattern-dot); stroke-linecap: round;`

> ✅ DO — border 축약형에서도 토큰 조합 사용
> `border: var(--stroke-sm) var(--stroke-dashed) var(--color-border-subtle);`

> ❌ DON'T — 하드코딩된 수치 사용
> `stroke-width: 1.5;` `stroke-dasharray: 0.3 10;`

> ❌ DON'T — Pattern 토큰을 CSS border에 사용
> `border-style: var(--stroke-pattern-dot);` — CSS border는 dasharray를 지원하지 않는다.

> ❌ DON'T — `--stroke-lg`를 UI 컴포넌트 외곽선에 사용
> 5px는 지도·강조 전용이다. 컴포넌트 border에는 `--stroke-sm` 또는 `--stroke-md`를 사용한다.
