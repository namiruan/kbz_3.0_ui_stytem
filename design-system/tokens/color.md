---
file: tokens/color.md
version: 0.5.2
depends-on: tokens/_index.md
---

# 색상 시스템

Primitive는 밝기 스케일(50–950)로 구성된다. 숫자가 클수록 어둡다.
Semantic은 용도를 이름에 담아 Primitive를 참조한다.

## Primitive

팔레트별 원시값. 컴포넌트에서 직접 참조하지 않는다.

### Brand

| 스케일 | Primary | Secondary |
|--------|---------|-----------|
| 50 | `--color-brand-50` | `--color-secondary-50` |
| 100 | `--color-brand-100` | `--color-secondary-100` |
| 200 | `--color-brand-200` | `--color-secondary-200` |
| 300 | `--color-brand-300` | `--color-secondary-300` |
| 400 | `--color-brand-400` | `--color-secondary-400` |
| 500 | `--color-brand-500` | `--color-secondary-500` |
| 600 | `--color-brand-600` | `--color-secondary-600` |
| 700 | `--color-brand-700` | `--color-secondary-700` |
| 800 | `--color-brand-800` | `--color-secondary-800` |
| 900 | `--color-brand-900` | `--color-secondary-900` |
| 950 | `--color-brand-950` | `--color-secondary-950` |

### Gray

| 스케일 | Gray |
|--------|------|
| 0 | `--color-gray-0` |
| 50 | `--color-gray-50` |
| 100 | `--color-gray-100` |
| 200 | `--color-gray-200` |
| 300 | `--color-gray-300` |
| 400 | `--color-gray-400` |
| 500 | `--color-gray-500` |
| 600 | `--color-gray-600` |
| 700 | `--color-gray-700` |
| 800 | `--color-gray-800` |
| 900 | `--color-gray-900` |
| 950 | `--color-gray-950` |

### 상태 색상

| 스케일 | Success | Warning | Error |
|--------|---------|---------|-------|
| 50 | `--color-success-50` | `--color-warning-50` | `--color-error-50` |
| 100 | `--color-success-100` | `--color-warning-100` | `--color-error-100` |
| 200 | `--color-success-200` | `--color-warning-200` | `--color-error-200` |
| 300 | `--color-success-300` | `--color-warning-300` | `--color-error-300` |
| 400 | `--color-success-400` | `--color-warning-400` | `--color-error-400` |
| 500 | `--color-success-500` | `--color-warning-500` | `--color-error-500` |
| 600 | `--color-success-600` | `--color-warning-600` | `--color-error-600` |
| 700 | `--color-success-700` | `--color-warning-700` | `--color-error-700` |
| 800 | `--color-success-800` | `--color-warning-800` | `--color-error-800` |
| 900 | `--color-success-900` | `--color-warning-900` | `--color-error-900` |
| 950 | `--color-success-950` | `--color-warning-950` | `--color-error-950` |

## Semantic 카테고리

| 그룹 | 사용처 | 예시 |
|------|--------|------|
| `surface` | 컨테이너·배경 | `--color-surface-base`, `--color-surface-sunken`, `--color-surface-overlay` |
| `text` | 텍스트 | `--color-text-primary`, `--color-text-secondary`, `--color-text-brand` |
| `border` | 테두리·구분선 | `--color-border-default`, `--color-border-emphasis`, `--color-border-focus` |
| `action` | hover·selected 상태 배경 | `--color-action-brand-hover`, `--color-action-gray-hover` |

## Do / Don't

> ✅ DO — Semantic 사용
> `color: var(--color-text-primary);`
> `border: 1px solid var(--color-border-default);`

> ❌ DON'T — Primitive 직접 참조
> `color: var(--color-gray-950);`

> ❌ DON'T — hex 직접 사용
> `color: #131416;`

## 인터랙션 상태 패턴 (모든 인터랙티브 컴포넌트 동일)

```
default  →  hover(밝게)  →  pressed(어둡게)  →  disabled
                                               bg:   --color-gray-100
                                               text: --color-gray-400
```

> ⚠️ 색상만으로 상태를 구분하지 않는다. 아이콘·텍스트를 반드시 병행한다.
> 텍스트-배경 대비 최소 **4.5:1** (WCAG AA). 자세한 기준은 `accessibility.md` 참조.
