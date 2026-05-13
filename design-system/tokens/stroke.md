---
file: tokens/stroke.md
version: 1.3.0
depends-on: tokens/_index.md
---

# 스트로크 시스템

선의 두께(width)와 스타일(style)을 정의한다.

- **CSS border**: 컴포넌트 외곽선, 표 구분선 등 UI 경계에 사용
- **SVG stroke**: 지도·데이터 시각화 도형의 획에 사용. 같은 토큰 값을 `stroke-width` 속성으로 참조한다
- **아이콘 SVG stroke**: 토큰 미사용 — viewBox 좌표계 기준 고정값으로 직접 작성한다. `tokens/icon.md` 참조

## Primitive

### Width

:::scale stroke-width

Width 토큰은 UI 상태와 매핑해서 사용한다.

| 토큰 | 값 | 주요 상태 / 용도 |
|------|----|----------------|
| `--stroke-sm` | 1px | 기본 divider, 비활성 컴포넌트 외곽선, 표 셀 구분선 |
| `--stroke-md` | 2px | focus 링, selected 상태 외곽선, 강조 외곽선 |
| `--stroke-lg` | 5px | 지도 강조 레이어 전용. UI 컴포넌트에 사용 금지 |

### Style

CSS `border-style` 값. SVG 단순 선(dasharray 없는 실선·점선)에도 동일하게 적용한다.
점·대시 패턴(dasharray 필요)은 Utility 클래스를 사용한다.

:::scale stroke-style

## Utility

| 그룹 | 컨텍스트 | 사용처 | 클래스 |
|------|----------|--------|--------|
| `dot` | SVG | 지도 점 패턴 (5px 원형 점) | `.stroke-dot` |
| `dash` | CSS border | 데이터테이블 보조 셀 구분선 (1px 균등 대시) | `.stroke-dash` |

`.stroke-dot`은 `stroke-width + stroke-dasharray + stroke-linecap` 세 속성을 묶는다. SVG `<path>`에만 동작한다.

```svg
<path class="stroke-dot" d="..." />
```

`.stroke-dash`는 `border-width + border-style` 조합이다. CSS `border` 컨텍스트에서 사용한다.
클래스는 방향을 지정하지 않으므로 4면 모두 적용된다. 특정 방향만 필요하면 컴포넌트에서 `border-top`, `border-bottom` 등으로 직접 지정한다.

```html
<!-- 4면 모두 적용 -->
<td class="stroke-dash">...</td>

<!-- 하단 경계선만 필요한 경우 — 클래스 대신 직접 지정 -->
<td style="border-bottom: var(--stroke-sm) var(--stroke-dashed) var(--color-border-subtle);">...</td>
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

> ❌ DON'T — `.stroke-dot`을 CSS border에 사용
> `.stroke-dot`은 SVG `stroke-*` 속성 조합이다. CSS `border`에는 적용되지 않는다.

> ❌ DON'T — `.stroke-dash`를 SVG `<path>`에 사용
> `.stroke-dash`는 CSS `border-width + border-style` 조합이다. SVG stroke-dasharray가 없으므로 점선 패턴이 렌더링되지 않는다.
