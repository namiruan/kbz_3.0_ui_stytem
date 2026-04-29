---
file: tokens/color.md
version: 0.8.0
depends-on: tokens/_index.md
---

# 색상 시스템

Primitive는 밝기 스케일(50–950)로 구성된다. 숫자가 클수록 어둡다.
Semantic은 용도를 이름에 담아 Primitive를 참조한다.

## Primitive

팔레트별 원시값. 컴포넌트에서 직접 참조하지 않는다.

**Blue** — 주요 브랜드 컬러. CTA 버튼, 링크, 포커스 링, 선택·활성 상태.

:::palette blue

**Cyan** — 보조 브랜드 컬러. 정보성 배지, 보조 액션, 데이터 시각화 계열.

:::palette cyan

**Gray** — 중립 UI. 텍스트, 배경, 구분선, 비활성 상태 전반.

:::palette gray

**Green** — 성공·긍정 상태. 완료, 승인, 성공 메시지, 유효성 검사 통과.

:::palette green

**Orange** — 경고·주의 상태. 주의가 필요한 정보, 기한 임박, 권장 사항.

:::palette orange

**Red** — 오류·위험 상태. 에러 메시지, 삭제 확인, 위험 액션.

:::palette red

## Semantic

| 그룹 | 사용처 | 예시 |
|------|--------|------|
| `surface` | 중립 배경 | `--color-surface-base`, `--color-surface-subtle`, `--color-surface-neutral`, `--color-surface-disabled`, `--color-surface-dark`, `--color-surface-dim` |
| `surface` | 브랜드 배경 | `--color-surface-brand`, `--color-surface-brand-subtle`, `--color-surface-brand-tint`, `--color-surface-info-subtle`, `--color-surface-info-tint` |
| `surface` | 상태 배경 | `--color-surface-success-subtle`, `--color-surface-caution-subtle`, `--color-surface-error-subtle` |
| `text` | 본문·UI 텍스트 | `--color-text-body`, `--color-text-display`, `--color-text-label`, `--color-text-subtle`, `--color-text-disabled`, `--color-text-inverse` |
| `text` | 브랜드 텍스트 | `--color-text-brand-vivid`, `--color-text-brand`, `--color-text-brand-muted`, `--color-text-info`, `--color-text-info-muted` |
| `text` | 상태 피드백 | `--color-text-caution`, `--color-text-error` |
| `border` | 테두리·구분선 | `--color-border-subtle`, `--color-border-default`, `--color-border-disabled`, `--color-border-selected`, `--color-border-strong`, `--color-border-brand`, `--color-border-focus`, `--color-border-error` |
| `action` | 중립 인터랙션 | `--color-action-neutral-hover`, `--color-action-neutral-pressed`, `--color-action-neutral-selected`, `--color-action-neutral-overlay` |
| `action` | 브랜드 인터랙션 | `--color-action-brand-hover`, `--color-action-brand-pressed`, `--color-action-brand-selected`, `--color-action-brand-overlay`, `--color-action-info-hover`, `--color-action-info-pressed`, `--color-action-info-selected`, `--color-action-info-overlay`, `--color-action-info-subtle` |
| `action` | 위험 인터랙션 | `--color-action-error-hover`, `--color-action-error-pressed`, `--color-action-error-selected`, `--color-action-error-overlay` |

### surface 선택 기준

| 토큰 | 사용 기준 |
|------|-----------|
| `surface-base` | 기본 페이지·컨테이너 배경 |
| `surface-subtle` | 흰색이 아닌 메인 배경이 필요할 때 (사이드바, 교차 행 등) |
| `surface-neutral` | 연한 계열이지만 면이 구분되어야 하는 중립 배경 (뱃지, 테이블 헤더) |
| `surface-disabled` | 비활성(disabled) 컴포넌트 배경 전용 |
| `surface-dark` | 어두운 배경이 필요한 영역 |
| `surface-dim` | 모달·드로어 뒤 스크림 레이어 |
| `surface-brand` | 중립보다 눈에 띄어야 하지만 상태(성공·주의·오류)가 아닐 때 |
| `surface-brand-subtle` | 브랜드 계열 연한 배경 (50단계) |
| `surface-brand-tint` | 면 구분이 필요하지만 연한 브랜드 배경이 필요할 때 (100단계) |
| `surface-info-subtle` | 보조 브랜드(cyan) 연한 배경. 브랜드가 이미 쓰였거나 채도 높은 색으로 명시성을 높일 때 |
| `surface-info-tint` | 보조 브랜드 틴트 배경 (100단계) |
| `surface-*-subtle` | 성공·주의·오류 상태 연한 배경 |

### text 브랜드 선택 기준

| 토큰 | 사용 기준 |
|------|-----------|
| `text-brand` | 브랜드 텍스트의 기본값. body처럼 브랜드 컨텍스트에서 보편적으로 사용 |
| `text-brand-vivid` | brand보다 명시성이 높아야 할 때 (아이콘, 강조 링크) |
| `text-brand-muted` | 본문과 구분은 되어야 하지만 명시성이 낮아도 될 때 (보조 레이블) |
| `text-info` | 보조 브랜드 텍스트의 기본값. 브랜드가 이미 쓰였거나 채도 높은 색으로 명시성을 높일 때 |
| `text-info-muted` | 보조 브랜드 억제 텍스트 |

### action 선택 기준

| 토큰 | 사용 기준 |
|------|-----------|
| `action-neutral-*` | 어떤 배경 위에도 사용 가능한 투명 오버레이. 범용 인터랙션 |
| `action-brand-*` | 밝은 배경 위 브랜드 요소의 인터랙션 |
| `action-info-*` | 보조 브랜드 요소의 인터랙션. `info-subtle`은 정적 연한 배경 |
| `action-error-*` | 위험·삭제 액션 전용 |

## Do / Don't

> ✅ DO — Semantic 사용
> `color: var(--color-text-body);`
> `border: 1px solid var(--color-border-default);`

> ❌ DON'T — Primitive 직접 참조
> `color: var(--color-gray-950);`

> ❌ DON'T — hex 직접 사용
> `color: #131416;`
