---
file: tokens/typography.md
version: 1.0.0
depends-on: tokens/_index.md
---

# 타이포그래피

## Primitive

### Font Family

Semantic 없이 직접 사용한다. Pretendard 로드 실패 시 뒤의 값이 순서대로 대체된다.

| 토큰 | 값 |
|------|----|
| `--font-family-base` | Pretendard, Apple SD Gothic Neo, Malgun Gothic |

### Font Size

소형(11–15px)은 UI 밀도용, 중형(17–20px)은 UI 강조·소제목, 대형(28–32px)은 페이지 구조.

:::scale font-size

### Font Weight

Semantic 없이 직접 사용한다.

| 토큰 | 값 | 사용처 |
|------|-----|-------|
| `--font-weight-regular` | 400 | 본문, 일반 UI |
| `--font-weight-medium` | 500 | 강조 레이블, 버튼 |
| `--font-weight-semibold` | 600 | 소제목, 강조 UI |
| `--font-weight-bold` | 700 | 페이지 제목, 강조 헤딩 |

### Line Height

Semantic 없이 직접 사용한다.

| 토큰 | 값 | 사용처 |
|------|-----|-------|
| `--line-height-tight` | 1.25 | 헤딩, 단행 UI |
| `--line-height-base` | 1.5 | 본문 |
| `--line-height-relaxed` | 1.625 | 장문 콘텐츠 |

### Letter Spacing

Semantic 없이 직접 사용한다.

| 토큰 | 값 | 사용처 |
|------|-----|-------|
| `--letter-spacing-tight` | -0.02em | 대형 헤딩 |
| `--letter-spacing-normal` | 0em | 본문 |
| `--letter-spacing-wide` | 0.05em | 소형 레이블·캡션 |

## Semantic

font-size만 Primitive(--font-size-[px값]) → Semantic(--font-size-[맥락]-[크기]) 변환을 거친다.

| 그룹 | 사용처 | 예시 |
|------|--------|------|
| `label` | 부가 정보·UI 주석 | `--font-size-label-xs`, `--font-size-label-sm`, `--font-size-label-md` |
| `body` | 본문 콘텐츠 | `--font-size-body-md`, `--font-size-body-lg` |
| `heading` | 페이지·섹션 구조 | `--font-size-heading-xs`, `--font-size-heading-sm`, `--font-size-heading-md`, `--font-size-heading-lg` |

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
