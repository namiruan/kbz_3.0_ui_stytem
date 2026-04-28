---
file: tokens/radius.md
version: 0.4.1
depends-on: tokens/_index.md
---

# Radius 시스템


Primitive는 px값을 이름으로 쓴다. Semantic은 컴포넌트에서 쓰이는 맥락으로 이름 붙인다. 실제 토큰 스케일은 `tokens.css` 참조.

## 컴포넌트 shape와의 관계

Variant 모델의 `shape` 차원이 radius 토큰에 직접 대응한다.

```
shape: round   →  --radius-pill   (1000px)
shape: square  →  --radius-sm     (4px)
```

## Do / Don't

```css
/* ✅ DO */
border-radius: var(--radius-pill);
border-radius: var(--radius-sm);

/* ❌ DON'T */
border-radius: 1000px;
border-radius: 4px;
```

> ⚠️ Figma에 없는 radius 값을 임의로 추가하지 않는다.
> 새 값이 필요하면 Figma에 먼저 정의한 후 추출한다.
