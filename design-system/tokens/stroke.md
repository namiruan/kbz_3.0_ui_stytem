---
file: tokens/stroke.md
version: 1.0.0
depends-on: tokens/_index.md
---

# 스트로크 시스템

선의 두께(width)와 스타일(style)을 정의한다.

- **CSS border**: 컴포넌트 외곽선, 표 구분선 등 UI 경계에 사용
- **SVG stroke**: 지도·데이터 시각화 도형의 획에 사용. 같은 토큰 값을 `stroke-width` 속성으로 참조한다
- **아이콘 SVG stroke**: 해당 없음 — 아이콘은 stroke 없이 fill 방식으로만 제작한다. `tokens/icon.md` 참조

## Primitive

### Width

<!-- AI: :::scale stroke-width renders:
--stroke-sm: 1px  (기본선 — 표 구분선, subtle divider)
--stroke-md: 2px  (강조선 — 주의를 끌어야 할 선)
--stroke-lg: 5px  (지도 강조 레이어 전용)
-->
:::scale stroke-width

### Style

CSS `border-style` 전용. SVG stroke에는 적용되지 않는다.
점·대시가 일정 간격으로 반복되는 패턴(지도 점선, 표 보조 구분선)은 Utility 클래스를 사용한다.

<!-- AI: :::scale stroke-style renders CSS border-style tokens:
--stroke-solid:  solid
--stroke-dashed: dashed
--stroke-dotted: dotted
-->
:::scale stroke-style

## Utility

| 그룹 | 컨텍스트 | 사용처 | 클래스 |
|------|----------|--------|--------|
| `dot` | SVG | 지도 점 패턴 (5px 원형 점) | `.stroke-dot` |
| `dash` | CSS border | 데이터테이블 헤더·셀 하단선을 보조 역할로 표시할 때 | `.stroke-dash` |

`.stroke-dot`은 점 패턴을 만드는 세 가지 SVG 속성(굵기·점 간격·선 끝 처리)을 묶는다. SVG `<path>`에만 동작한다.

```svg
<path class="stroke-dot" d="..." />
```

`.stroke-dash`는 해당 헤더·셀이 보조 역할임을 HTML에 표시하는 마커 클래스다. 데이터테이블 컴포넌트 CSS에서 이 클래스를 셀렉터로 사용해 하단선 방향과 color를 지정한다.

```html
<th class="stroke-dash">보조 헤더</th>
<td class="stroke-dash">보조 셀</td>
```

```css
/* 데이터테이블 컴포넌트에서 방향·color 지정 */
.data-table th.stroke-dash,
.data-table td.stroke-dash {
  border-bottom-width: var(--stroke-sm);
  border-bottom-style: var(--stroke-dashed);
  border-bottom-color: var(--color-border-subtle);
}
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
> SVG `<path>`에는 CSS `border` 속성이 없다. `.stroke-dash`를 적용해도 아무 효과가 없다.
