---
file: tokens/typography.md
version: 3.0.0
depends-on: tokens/_index.md
---

# 타이포그래피

3-tier 구조. Primitive(원시값) → Semantic(축별 의미) → Utility(컴포넌트 use case 묶음).
컴포넌트는 **`.text-*` 유틸 클래스**로 적용한다.

## Primitive

### Font Family

단일값. Pretendard 로드 실패 시 뒤의 값이 순서대로 대체된다.

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

## Semantic — 4축

각 속성을 독립적인 축으로 분리한다. 유틸 클래스가 이 값을 조합한다.

### Font Size — 역할별

| 토큰 | 값 | 사용처 |
|------|----|--------|
| `--font-size-meta` | 11 | 캡션·정렬번호·뱃지 |
| `--font-size-label` | 12 | 폼 라벨·태그·캡션 |
| `--font-size-sm` | 13 | 소형 버튼·툴팁·헬퍼 |
| `--font-size-base` | 14 | 본문 기본·인풋·테이블 |
| `--font-size-lg` | 15 | 중형 버튼·강조 본문 |
| `--font-size-h4` | 17 | 카드 제목·대형 버튼·탭 |
| `--font-size-h3` | 20 | 섹션 제목·날짜 인풋 |
| `--font-size-h2` | 28 | 모달·서브페이지 제목 |
| `--font-size-h1` | 32 | 페이지 제목 |

### Line Height — 콘텐츠 성질별

| 토큰 | 값 | 사용처 |
|------|----|--------|
| `--line-height-ui` | 1.25 | 한 줄 UI (버튼·인풋·셀·뱃지·헤딩) |
| `--line-height-reading` | 1.5 | 다줄 본문 (문단·설명문) |
| `--line-height-prose` | 1.625 | 긴 글 (문서·릴리스 노트) |

### Letter Spacing — 계층별

| 토큰 | 값 | 사용처 |
|------|----|--------|
| `--letter-spacing-default` | 0em | 기본 (본문·UI·소형 헤딩) |
| `--letter-spacing-display` | -0.02em | 28px 이상 대형 헤딩 |

### Font Weight — 강조별

| 토큰 | 값 | 사용처 |
|------|----|--------|
| `--font-weight-body` | 400 | 본문·읽기·기본 UI |
| `--font-weight-heading` | 600 | 헤딩·UI 강조·테이블 헤더 |
| `--font-weight-display` | 700 | 페이지·모달 타이틀 |

## Utility — Use Case별 묶음 클래스

컴포넌트 use case별로 4축을 묶은 클래스. **컴포넌트는 이 클래스로 적용한다.**

### Buttons

| 클래스 | size | line-height | letter-spacing | weight |
|--------|------|-------------|----------------|--------|
| `.text-button-sm` | sm (13) | ui | default | heading |
| `.text-button-md` | lg (15) | ui | default | heading |
| `.text-button-lg` | h4 (17) | ui | default | heading |

### Form

| 클래스 | size | line-height | letter-spacing | weight |
|--------|------|-------------|----------------|--------|
| `.text-input` | base (14) | ui | default | body |
| `.text-form-label` | label (12) | ui | default | body |
| `.text-helper` | sm (13) | ui | default | body |

### Table

| 클래스 | size | line-height | letter-spacing | weight |
|--------|------|-------------|----------------|--------|
| `.text-table-header` | base (14) | ui | default | heading |
| `.text-table-cell` | base (14) | ui | default | body |

### Navigation

| 클래스 | size | line-height | letter-spacing | weight |
|--------|------|-------------|----------------|--------|
| `.text-tab` | h4 (17) | ui | default | heading |
| `.text-breadcrumb` | sm (13) | ui | default | body |
| `.text-menu-item` | base (14) | ui | default | body |

### Hierarchy

| 클래스 | size | line-height | letter-spacing | weight |
|--------|------|-------------|----------------|--------|
| `.text-page-title` (h1) | h1 (32) | ui | display | display |
| `.text-section-title` (h2) | h2 (28) | ui | display | display |
| `.text-subsection-title` (h3) | h3 (20) | ui | default | heading |
| `.text-card-title` (h4) | h4 (17) | ui | default | heading |

### Modal

| 클래스 | size | line-height | letter-spacing | weight |
|--------|------|-------------|----------------|--------|
| `.text-modal-title` | h2 (28) | ui | display | display |

### Status

| 클래스 | size | line-height | letter-spacing | weight |
|--------|------|-------------|----------------|--------|
| `.text-badge` | meta (11) | ui | default | body |
| `.text-tag` | label (12) | ui | default | body |
| `.text-tooltip` | sm (13) | ui | default | body |

### Body & Meta

| 클래스 | size | line-height | letter-spacing | weight |
|--------|------|-------------|----------------|--------|
| `.text-body` | base (14) | reading | default | body |
| `.text-caption` | label (12) | ui | default | body |
| `.text-meta` | meta (11) | ui | default | body |

## Do / Don't

> ✅ DO — `.text-*` 유틸 클래스 적용
> `<button class="text-button-md">버튼</button>`
> `<p class="text-body">본문</p>`

> ✅ DO — use case 없을 때 Semantic 토큰 직접 참조
> `font-size: var(--font-size-base);`
> `font-weight: var(--font-weight-heading);`

> ❌ DON'T — Primitive 직접 참조
> `font-size: var(--font-size-14);`

> ❌ DON'T — 임의값 직접 사용
> `font-size: 14px; line-height: 1.5;`

> ⚠️ 새 use case가 반복적으로 등장하면 → 새 `.text-*` 클래스 추가
> ⚠️ 본문 최소 13px (가독성)
