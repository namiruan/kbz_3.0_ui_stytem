---
file: interaction.md
version: 0.1.0
---

# 인터랙션

## 상태 패턴 (모든 인터랙티브 컴포넌트 동일)

```
default  →  hover(밝게)  →  pressed(어둡게)  →  disabled
                                               bg:   --color-gray-100
                                               text: --color-gray-400
```

> ⚠️ 색상만으로 상태를 구분하지 않는다. 아이콘·텍스트를 반드시 병행한다.
> 텍스트-배경 대비 최소 **4.5:1** (WCAG AA). 자세한 기준은 `accessibility.md` 참조.
