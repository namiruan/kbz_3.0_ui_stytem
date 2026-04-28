---
file: tokens/color.md
version: 0.4.2
depends-on: tokens/_index.md
---

# 색상 시스템


Primitive는 밝기 스케일(50–900)로 구성된다. 숫자가 클수록 어둡다.
Semantic은 용도를 이름에 담아 Primitive를 참조한다. 실제 토큰 스케일은 `tokens.css` 참조.

## Do / Don't

> ✅ DO — Semantic 사용
> `color: var(--color-text-primary); border: 1px solid var(--color-border-default);`

> ❌ DON'T — Primitive·hex 직접 참조
> `color: var(--color-gray-900); color: #131416;`

## 인터랙션 상태 패턴 (모든 인터랙티브 컴포넌트 동일)

```
default  →  hover(밝게)  →  pressed(어둡게)  →  disabled
                                               bg:   --color-gray-100
                                               text: --color-gray-400
```

> ⚠️ 색상만으로 상태를 구분하지 않는다. 아이콘·텍스트를 반드시 병행한다.
> 텍스트-배경 대비 최소 **4.5:1** (WCAG AA). 자세한 기준은 `accessibility.md` 참조.
