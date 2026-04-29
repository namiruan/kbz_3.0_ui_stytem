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
| `border` | 테두리·구분선 | `--color-border-subtle`, `--color-border-default`, `--color-border-disabled`, `--color-border-selected`, `--color-border-brand`, `--color-border-focus`, `--color-border-error` |
| `action` | 중립 인터랙션 | `--color-action-neutral-hover`, `--color-action-neutral-pressed`, `--color-action-neutral-selected`, `--color-action-neutral-overlay` |
| `action` | 브랜드 인터랙션 | `--color-action-brand-hover`, `--color-action-brand-pressed`, `--color-action-brand-selected`, `--color-action-brand-overlay`, `--color-action-info-hover`, `--color-action-info-pressed`, `--color-action-info-selected`, `--color-action-info-overlay`, `--color-action-info-subtle` |
| `action` | 위험 인터랙션 | `--color-action-error-hover`, `--color-action-error-pressed`, `--color-action-error-selected`, `--color-action-error-overlay` |

## Do / Don't

> ✅ DO — Semantic 사용
> `color: var(--color-text-body);`
> `border: 1px solid var(--color-border-default);`

> ❌ DON'T — Primitive 직접 참조
> `color: var(--color-gray-950);`

> ❌ DON'T — hex 직접 사용
> `color: #131416;`
