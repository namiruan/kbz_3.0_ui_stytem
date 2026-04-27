---
file: tokens/typography.md
version: 0.4.0
depends-on: tokens/_index.md
---

# 타이포그래피

> **언제 참조하나:** 텍스트 스타일 결정 시 모든 사람

폰트 크기는 Primitive(px값) → Semantic(용도명) 순으로 참조한다.
폰트 굵기는 descriptive 이름으로 직접 정의해 Semantic 계층이 없다. 실제 토큰 스케일은 `tokens.css` 참조.

## Do / Don't

```css
/* ✅ DO */
font-size: var(--font-size-body);
font-weight: var(--font-weight-medium);

/* ❌ DON'T */
font-size: var(--font-size-15);    /* Primitive 직접 참조 */
font-size: 15px;                   /* 임의값 직접 사용 */
font-weight: 500;                  /* 숫자 직접 사용 */
```

> ⚠️ 한 화면에서 폰트 크기 3종 이하
> ⚠️ 본문 텍스트 크기 최소 13px (가독성)
