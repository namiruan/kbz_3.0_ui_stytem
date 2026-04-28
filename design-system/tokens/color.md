---
file: tokens/color.md
version: 0.6.0
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
| `surface` | 컨테이너·배경 | `--color-surface-base`, `--color-surface-subtle`, `--color-surface-disabled`, `--color-surface-inverse`, `--color-surface-brand`, `--color-surface-dim` |
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
