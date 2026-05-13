---
file: tokens/icon.md
version: 0.4.2
depends-on: tokens/_index.md
---

# 아이콘 시스템


아이콘 크기는 컴포넌트 height와 매칭한다. 한 화면에서 스타일은 하나로 통일한다.

| 토큰 | 크기 | 사용처 |
|------|------|--------|
| `--icon-12` | 12px | 보조 인디케이터(badge 내부, 메타 정보) |
| `--icon-16` | 16px | 기본. md size 컴포넌트(Button, Input) |
| `--icon-20` | 20px | lg size, 단독 아이콘 버튼 |
| `--icon-24` | 24px | xl size, 페이지 헤더, 네비게이션 |

## 선 굵기 (Stroke)

아이콘 stroke는 CSS 토큰이 아닌 SVG presentation attribute로 정의한다. viewBox 좌표계 기준 **무단위 값**으로 지정하면 아이콘 크기가 바뀌어도 자동으로 비례 스케일된다.

모든 아이콘은 `viewBox="0 0 24 24"` 기준이다.

| 아이콘 크기 | stroke-width | 비고 |
|------------|-------------|------|
| 12px | `1` | 0.5px 미만 렌더링 방지를 위해 직접 지정 |
| 16px | `1.5` → 렌더 1px | viewBox 스케일 자동 적용 |
| 20px | `1.5` → 렌더 1.25px | viewBox 스케일 자동 적용 |
| 24px | `1.5` | 기본값 (CSS 토큰 `--stroke-md: 2px`와 별개) |

```svg
<!-- 모든 크기에서 동일하게 작성 — 렌더 크기는 viewBox가 처리 -->
<svg viewBox="0 0 24 24" width="16" height="16">
  <path stroke-width="1.5" ... />
</svg>
```

> ⚠️ `stroke-width="1.5px"` 처럼 단위를 붙이면 CSS 픽셀로 고정되어 스케일링이 깨진다. 반드시 단위 없이 작성한다.

> ⚠️ 12px 이하에서는 `1.5` 스케일 결과가 0.75px 미만이 되어 너무 얇아진다. 12px 아이콘은 `stroke-width="1"`로 직접 지정한다.

## 스타일 일관성

한 화면에서 outlined 또는 filled 중 하나만 사용한다. 혼용 금지.
선택적 강조 표현(active 상태, 알림)에서만 filled 허용.

## 정렬

- 텍스트와 함께 쓸 때 옵티컬 센터 정렬 (line-height 기준 중앙)
- 아이콘과 텍스트 사이 간격은 `--space-gap-xs`
- 아이콘 색상은 텍스트 색상 상속 (`color: inherit`)

## Do / Don't

> ✅ DO — 텍스트 + 아이콘
> `<button class="btn btn--md"><Icon name="save" size="16" /> 저장</button>`

> ❌ DON'T — 단독 아이콘 + 라벨 없음
> `<button><Icon name="delete" /></button>`

> ✅ DO — 단독 아이콘 버튼 (aria-label 필수)
> `<button class="btn-icon" aria-label="삭제"><Icon name="delete" size="20" /></button>`

> ❌ DON'T — outlined와 filled 혼용
> `<Icon name="save" variant="outlined" />`
> `<Icon name="delete" variant="filled" />`

> ⚠️ 단독 아이콘 버튼은 반드시 `aria-label` 또는 `aria-labelledby` 제공.
> 자세한 접근성 요구사항은 `accessibility.md` 참조.
