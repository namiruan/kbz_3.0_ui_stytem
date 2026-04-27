---
file: tokens/space.md
version: 0.4.0
depends-on: tokens/_index.md
---

# 공간 시스템

> **언제 참조하나:** padding/margin/gap 결정 시 모든 사람

공간을 어디에 쓰는지로 분류해 Semantic 토큰을 사용한다. 실제 토큰 스케일은 `tokens.css` 참조.

| 토큰 | 의미 | 사용처 |
|------|------|--------|
| `inset` | 사방 동일 padding | 카드, 테이블 셀, 컨테이너 |
| `inset-squish` | 좌우가 상하의 2배 | 버튼, pill, 태그 |
| `stack` | 요소 아래 margin | 리스트 항목, 섹션 구분 |
| `gap` | flexbox/grid 자식 간격. 부모에 적용 | 버튼 그룹, 카드 그리드, 폼 필드 |
| `generic` | 위 4가지로 안 되는 예외 | 단방향 margin, 레이아웃 특수 케이스 |

## Do / Don't

```css
/* ✅ DO — 용도에 맞는 토큰 사용 */
padding: var(--space-inset-md);          /* 카드 내부 */
padding: var(--space-inset-squish-md);   /* 버튼 */
margin-bottom: var(--space-stack-sm);    /* 리스트 간격 */
gap: var(--space-gap-sm);               /* 버튼 그룹 */

/* ❌ DON'T — 임의값 직접 사용 */
padding: 16px;
margin-bottom: 8px;
```

> ⚠️ 높이는 padding으로 만들지 않는다. height 토큰 고정 + `align-items: center` 사용.

```css
/* ✅ DO */
.btn { height: var(--height-36); display: flex; align-items: center; }

/* ❌ DON'T */
.btn { padding: 8px 16px; }
```

단방향 margin은 `generic` 토큰으로 값을 가져오고 방향은 CSS 속성으로 직접 지정한다.

```css
/* ✅ DO */
margin-inline-end: var(--space-generic-sm);
```
