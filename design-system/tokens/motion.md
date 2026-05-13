---
file: tokens/motion.md
version: 1.2.0
depends-on: tokens/_index.md
---

# 모션 시스템

모션은 장식이 아닌 정보 전달 수단이다. 세 가지 목적 외 사용 금지.

| 목적 | 사용처 |
|------|--------|
| 상태 피드백 | hover, pressed, focus 즉각 반응 |
| 공간 관계 | 드롭다운 진입, 모달 등장, 슬라이드 패널 |
| 주의 유도 | 에러 발생, toast 등장 |

## Primitive

### Duration

숫자가 클수록 느리다 (fast 100ms → slow 200ms).

:::scale duration

### Easing

구슬의 가속·감속 패턴이 커브별로 다르다. 등장(enter)은 빠르게 시작해 천천히 정착하고, 퇴장(exit)은 천천히 시작해 빠르게 사라진다.

:::scale easing

## Semantic

| 축 | 사용처 | 토큰 |
|----|--------|------|
| `duration` | hover, focus, 즉각 상태 변화 | `--duration-fast` |
| `duration` | 드롭다운, 팝오버, 일반 전환 | `--duration-base` |
| `duration` | 모달, 사이드 패널, 페이지 전환 | `--duration-slow` |
| `easing` | 요소 등장 (드롭다운 열림, 모달 진입, 툴팁) | `--easing-enter` |
| `easing` | 요소 퇴장 (드롭다운 닫힘, 모달 해제) | `--easing-exit` |
| `easing` | 위치 이동·콘텐츠 전환 (탭, 슬라이드) | `--easing-move` |
| `easing` | 방향 구분 불필요한 즉각 상태 변화 (hover, focus) | `--easing-base` |

## Choreography

여러 요소가 연속으로 전환될 때의 순서 규칙.

| 시나리오 | 순서 |
|---------|------|
| 같은 트리거의 여러 요소 | 동시 전환 |
| 콘텐츠 교체 (탭·스텝) | 새 요소 등장 → 이전 요소 퇴장 |
| 레이어 해제 (모달 닫기) | 레이어 퇴장 → 배경 콘텐츠 복귀 |

> ⚠️ exit duration은 enter보다 짧게. 퇴장이 느리면 전환 전체가 둔하게 느껴진다.
> enter: `--duration-base` + `--easing-enter` / exit: `--duration-fast` + `--easing-exit`

## Do / Don't

> ✅ DO — 등장·퇴장에 방향 easing 명시
> `transition: opacity var(--duration-base) var(--easing-enter);` (드롭다운 열림)
> `transition: opacity var(--duration-fast) var(--easing-exit);` (드롭다운 닫힘)

> ✅ DO — hover·focus는 방향 없으므로 base
> `transition: background var(--duration-fast) var(--easing-base);`

> ❌ DON'T — 임의값, all 사용, 의미 없는 반복
> `transition: all 0.3s ease-in-out;`
> `animation: pulse 2s infinite;`

> ❌ DON'T — 등장에 exit easing, 퇴장에 enter easing
> `transition: opacity var(--duration-base) var(--easing-exit);` (모달 등장 — enter 써야 함)

> ⚠️ 자동 반복 애니메이션, 장식용 모션 금지.
> ⚠️ 사용자가 호출하지 않은 모션은 만들지 않는다(loading 인디케이터 제외).

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
