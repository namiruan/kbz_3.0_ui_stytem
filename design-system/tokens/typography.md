---
file: tokens/typography.md
version: 2.0.0
depends-on: tokens/_index.md
---

# 타이포그래피

font-size·font-weight·line-height·letter-spacing은 Primitive로 두고, 컴포넌트에서는 이 값들을 묶은 **Text Style**(Semantic)을 참조한다. font-family는 단일값이라 직접 사용한다.

## Primitive

### Font Family

단일값이라 Primitive·Semantic 구분 없이 직접 사용한다. Pretendard 로드 실패 시 뒤의 값이 순서대로 대체된다.

| 토큰 | 값 |
|------|----|
| `--font-family-base` | Pretendard, Apple SD Gothic Neo, Malgun Gothic |

### Font Size

소형(11–15px)은 UI 밀도용, 중형(17–20px)은 UI 강조·소제목, 대형(28–32px)은 페이지 구조.

:::scale font-size

### Font Weight

| 토큰 | 값 |
|------|-----|
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |

### Line Height

| 토큰 | 값 |
|------|-----|
| `--line-height-tight` | 1.25 |
| `--line-height-base` | 1.5 |
| `--line-height-relaxed` | 1.625 |

### Letter Spacing

| 토큰 | 값 |
|------|-----|
| `--letter-spacing-tight` | -0.02em |
| `--letter-spacing-normal` | 0em |
| `--letter-spacing-wide` | 0.05em |

## Semantic — Text Style

font-size + line-height + letter-spacing + font-weight를 묶은 합성 토큰.
컴포넌트는 항상 Text Style을 통해 typography를 적용한다.

각 Text Style은 4개의 sub-token으로 구성된다 — `-font-size`, `-line-height`, `-letter-spacing`, `-font-weight`.

| Text Style | 사용처 | font-size | line-height | letter-spacing | font-weight |
|------------|--------|-----------|-------------|----------------|-------------|
| `--text-label-xs` | Sort 숫자 | 11 | tight | normal | regular |
| `--text-label-sm` | 라벨 | 12 | tight | normal | regular |
| `--text-label-md` | 소형 버튼·인풋 | 13 | tight | normal | regular |
| `--text-body-md` | 기본 본문 | 14 | base | normal | regular |
| `--text-body-lg` | 본문 강조·중형 버튼 | 15 | base | normal | regular |
| `--text-heading-xs` | 대형 버튼·셀렉트·탭, h4 | 17 | tight | normal | semibold |
| `--text-heading-sm` | h3, 날짜 인풋 | 20 | tight | normal | semibold |
| `--text-heading-md` | h2, 모달 제목 | 28 | tight | tight | bold |
| `--text-heading-lg` | h1, 페이지 타이틀 | 32 | tight | tight | bold |

## Do / Don't

> ✅ DO — Text Style sub-token으로 모든 속성을 묶어 적용
> `font-size: var(--text-body-md-font-size);`
> `line-height: var(--text-body-md-line-height);`
> `letter-spacing: var(--text-body-md-letter-spacing);`
> `font-weight: var(--text-body-md-font-weight);`

> ❌ DON'T — Primitive 직접 참조
> `font-size: var(--font-size-14);`
> `line-height: var(--line-height-base);`

> ❌ DON'T — 임의값 직접 사용
> `font-size: 14px; line-height: 1.5;`

> ⚠️ 한 화면에서 Text Style 3종 이하 사용
> ⚠️ 본문 최소 13px (가독성)
