---
file: tokens/typography.md
version: 0.4.2
depends-on: tokens/_index.md
---

# 타이포그래피


폰트 크기는 Primitive(px값) → Semantic(용도명) 순으로 참조한다.
폰트 굵기는 descriptive 이름으로 직접 정의해 Semantic 계층이 없다. 실제 토큰 스케일은 `tokens.css` 참조.

## Do / Don't

> ✅ DO — Semantic 사용
> `font-size: var(--font-size-body-md); font-weight: var(--font-weight-medium);`

> ❌ DON'T — Primitive·임의값·숫자 직접 사용
> `font-size: var(--font-size-15); font-size: 15px; font-weight: 500;`

> ⚠️ 한 화면에서 폰트 크기 3종 이하
> ⚠️ 본문 텍스트 크기 최소 13px (가독성)
