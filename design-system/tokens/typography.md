---
file: tokens/typography.md
version: 1.0.0
depends-on: tokens/_index.md
---

# 타이포그래피

## Primitive

font-size·font-weight만 Primitive를 갖는다. 나머지는 Primitive 없이 직접 사용한다.

### Font Size

소형(11–15px)은 UI 밀도용, 중형(17–20px)은 UI 강조·소제목, 대형(28–32px)은 페이지 구조.

:::scale font-size

### Font Weight

descriptive 이름으로 직접 정의한다. Semantic 계층 없이 바로 참조한다.

| 토큰 | 값 | 사용처 |
|------|-----|-------|
| `--font-weight-regular` | 400 | 본문, 일반 UI |
| `--font-weight-medium` | 500 | 강조 레이블, 버튼 |
| `--font-weight-semibold` | 600 | 소제목, 강조 UI |
| `--font-weight-bold` | 700 | 페이지 제목, 강조 헤딩 |

## Semantic

font-size만 Primitive → Semantic 변환을 거친다.
font-family·line-height·letter-spacing은 Primitive 없이 직접 사용한다.

| 그룹 | 사용처 | 예시 |
|------|--------|------|
| `font-size label` | 부가 정보·UI 주석 | `--font-size-label-xs`, `--font-size-label-sm`, `--font-size-label-md` |
| `font-size body` | 본문 콘텐츠 | `--font-size-body-md`, `--font-size-body-lg` |
| `font-size heading` | 페이지·섹션 구조 | `--font-size-heading-xs`, `--font-size-heading-sm`, `--font-size-heading-md`, `--font-size-heading-lg` |
| `font-family` | 서체 지정 | `--font-family-base`, `--font-family-mono` |
| `line-height` | 행간 | `--line-height-tight`, `--line-height-base`, `--line-height-relaxed` |
| `letter-spacing` | 자간 | `--letter-spacing-tight`, `--letter-spacing-normal`, `--letter-spacing-wide` |

## Do / Don't

> ✅ DO — Semantic 사용
> `font-size: var(--font-size-body-md);`
> `font-weight: var(--font-weight-medium);`
> `line-height: var(--line-height-base);`

> ❌ DON'T — Primitive 직접 참조
> `font-size: var(--font-size-14);`

> ❌ DON'T — 임의값 직접 사용
> `font-size: 14px; font-weight: 500;`

> ⚠️ 한 화면에서 font-size 3종 이하
> ⚠️ 본문 최소 13px (가독성)
