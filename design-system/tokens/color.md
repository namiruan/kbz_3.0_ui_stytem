---
file: tokens/color.md
version: 1.0.0
depends-on: tokens/_index.md
---

# 색상 시스템

## Primitive

밝기 스케일(50–950)로 구성된다. 숫자가 클수록 어둡다. gray만 양 끝에 `0`(#ffffff)과 `1000`(#000000)이 추가로 존재한다. 팔레트별 원시값이며 컴포넌트에서 직접 참조하지 않는다.

### Blue

주요 브랜드 컬러. CTA 버튼, 링크, 포커스 링, 선택·활성 상태.

:::palette blue

### Cyan

보조 브랜드 컬러. 정보성 배지, 보조 액션, 데이터 시각화 계열.

:::palette cyan

### Gray

중립 UI. 텍스트, 배경, 구분선, 비활성 상태 전반.

:::palette gray

### Green

성공·긍정 상태. 완료, 승인, 성공 메시지, 유효성 검사 통과.

:::palette green

### Orange

경고·주의 상태. 주의가 필요한 정보, 기한 임박, 권장 사항.

:::palette orange

### Red

오류·위험 상태. 에러 메시지, 삭제 확인, 위험 액션.

:::palette red

## Semantic

| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| `surface` | 중립 배경 | `--color-surface-base`<br>`--color-surface-subtle`<br>`--color-surface-neutral`<br>`--color-surface-disabled`<br>`--color-surface-disabled-strong`<br>`--color-surface-dark`<br>`--color-surface-dim` |
| `surface` | 브랜드 배경 | `--color-surface-brand`<br>`--color-surface-brand-subtle`<br>`--color-surface-brand-tint`<br>`--color-surface-info-subtle`<br>`--color-surface-info-tint` |
| `surface` | 상태 배경 | `--color-surface-success-subtle`<br>`--color-surface-caution-subtle`<br>`--color-surface-error-subtle` |
| `text` | 본문·UI 텍스트 | `--color-text-body`<br>`--color-text-display`<br>`--color-text-label`<br>`--color-text-subtle`<br>`--color-text-body-alpha`<br>`--color-text-disabled`<br>`--color-text-inverse` |
| `text` | 브랜드 텍스트 | `--color-text-brand-vivid`<br>`--color-text-brand`<br>`--color-text-brand-alpha`<br>`--color-text-brand-muted`<br>`--color-text-info`<br>`--color-text-info-muted` |
| `text` | 상태 피드백 | `--color-text-caution`<br>`--color-text-error`<br>`--color-text-success` |
| `border` | 테두리·구분선 | `--color-border-subtle`<br>`--color-border-neutral-subtle`<br>`--color-border-default`<br>`--color-border-disabled`<br>`--color-border-selected`<br>`--color-border-brand`<br>`--color-border-brand-subtle`<br>`--color-border-focus`<br>`--color-border-complete`<br>`--color-border-info-subtle`<br>`--color-border-caution-subtle`<br>`--color-border-error`<br>`--color-border-error-subtle`<br>`--color-border-success`<br>`--color-border-success-subtle` |
| `fill` | 컴포넌트 채움 배경 — 버튼·프로그래스바·폼 컨트롤 등 solid fill 공용 | `--color-fill-brand-vivid`<br>`--color-fill-brand`<br>`--color-fill-neutral`<br>`--color-fill-error` |
| `action` | 중립 인터랙션 | `--color-action-neutral-hover`<br>`--color-action-neutral-pressed`<br>`--color-action-neutral-selected`<br>`--color-action-neutral-overlay` |
| `action` | 브랜드 인터랙션 | `--color-action-brand-hover`<br>`--color-action-brand-pressed`<br>`--color-action-brand-selected`<br>`--color-action-brand-subtle`<br>`--color-action-brand-overlay`<br>`--color-action-info-hover`<br>`--color-action-info-pressed`<br>`--color-action-info-selected`<br>`--color-action-info-overlay`<br>`--color-action-info-subtle` |
| `action` | 위험 인터랙션 | `--color-action-error-hover`<br>`--color-action-error-pressed`<br>`--color-action-error-selected`<br>`--color-action-error-overlay` |
| `action` | 밝은(흰색) 인터랙션 — 어두운 배경 전용 | `--color-action-light-hover`<br>`--color-action-light-pressed`<br>`--color-action-light-selected`<br>`--color-action-light-overlay` |


## Do / Don't

> ✅ DO — Semantic 사용
> `color: var(--color-text-body);`
> `border: 1px solid var(--color-border-default);`

> ❌ DON'T — Primitive 직접 참조
> `color: var(--color-gray-950);`

> ❌ DON'T — hex 직접 사용
> `color: #131416;`

> ✅ DO — 투명도가 필요하면 `color-mix()`로 Semantic 토큰을 정의해 사용
> `color-mix(in srgb, var(--color-gray-950) 8%, transparent)`

> ❌ DON'T — `rgba()` 또는 `opacity` 직접 사용
> `rgba(0, 0, 0, 0.08)` ← 토큰 시스템 밖으로 나가며 다크모드 전환 불가
