---
file: tokens/motion.md
version: 0.4.1
depends-on: tokens/_index.md
---

# 모션 시스템


모션은 장식이 아닌 정보 전달 수단이다. 세 가지 목적 외 사용 금지.

| 목적 | 사용처 |
|------|--------|
| 상태 피드백 | hover, pressed, focus 즉각 반응 |
| 공간 관계 | 드롭다운 진입, 모달 등장, 슬라이드 패널 |
| 주의 유도 | 에러 발생, toast 등장 |

## Duration 매칭

| 토큰 | 사용처 |
|------|--------|
| `--duration-fast` (100ms) | hover, focus, 즉각 상태 변화 |
| `--duration-base` (150ms) | 드롭다운, 팝오버, 일반 전환 |
| `--duration-slow` (200ms) | 모달, 사이드 패널, 페이지 전환 |

기본 easing은 `--easing-base` 사용. 세분화는 도입 시점에 토큰 추가한다.

## Do / Don't

```css
/* ✅ DO — 속성 명시 + 토큰 사용 */
transition: background var(--duration-fast) var(--easing-base);
transition: opacity var(--duration-base) var(--easing-base);

/* ❌ DON'T — 임의값, all 사용, 의미 없는 반복 */
transition: all 0.3s ease-in-out;
animation: pulse 2s infinite;
```

## `prefers-reduced-motion` 대응 (필수)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration:  0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

> ⚠️ 자동 반복 애니메이션, 장식용 모션 금지.
> ⚠️ 사용자가 호출하지 않은 모션은 만들지 않는다(loading 인디케이터 제외).
