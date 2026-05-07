---
file: tokens/typography.md
version: 1.0.0
depends-on: tokens/_index.md
---

# 타이포그래피

## Primitive

### Font Family

| 토큰 | 값 | 사용처 |
|------|-----|-------|
| `--font-family-base` | Pretendard, Apple SD Gothic Neo, Malgun Gothic | 모든 UI 텍스트 |
| `--font-family-mono` | Fira Code, SF Mono, Consolas | 코드·숫자 표기 |

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

### Line Height

| 토큰 | 값 | 사용처 |
|------|-----|-------|
| `--line-height-tight` | 1.3 | 헤딩, 단행 UI |
| `--line-height-base` | 1.5 | 본문 |
| `--line-height-relaxed` | 1.7 | 장문 콘텐츠 |

## Semantic

font-weight·line-height는 이름이 이미 의미를 담고 있어 Semantic 계층이 없다.
font-size만 Primitive(px값) → Semantic(용도명) 순으로 참조한다.

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
