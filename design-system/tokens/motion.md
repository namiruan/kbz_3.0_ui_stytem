---
file: tokens/motion.md
version: 3.0.0
depends-on: tokens/_index.md
---

# 모션 시스템

모션은 장식이 아닌 정보 전달 수단이다. 세 가지 목적 외 사용 금지.

| 목적 | 사용처 |
|------|--------|
| 상태 피드백 | hover, pressed, focus 즉각 반응 |
| 공간 관계 | 드롭다운 진입, 모달 등장, 슬라이드 패널 |
| 주의 유도 | 에러 발생, toast 등장 |

## Semantic

### Duration

숫자가 클수록 느리다 (fast 100ms → slow 200ms).

<!-- AI: :::scale duration renders:
--duration-fast: 100ms  (hover, focus, 즉각 상태 변화)
--duration-base: 150ms  (드롭다운, 팝오버, 일반 전환)
--duration-slow: 200ms  (모달, 사이드 패널, 페이지 전환)
--duration-pulse: 750ms  (반복 강조 애니메이션 주기)
-->
:::scale duration

| 사용처 | 토큰 |
|--------|------|
| hover, focus, 즉각 상태 변화 | `--duration-fast` |
| 드롭다운, 팝오버, 일반 전환 | `--duration-base` |
| 모달, 사이드 패널, 페이지 전환 | `--duration-slow` |
| 반복 강조 애니메이션 주기 | `--duration-pulse` |

### Easing

등장(enter)은 빠르게 시작해 천천히 정착하고, 퇴장(exit)은 천천히 시작해 빠르게 사라진다. 물리적 이동(move)은 양방향이 부드럽고, base(`ease`)는 방향 없는 토글 전환에 사용한다.

<!-- AI: :::scale easing renders:
--easing-enter: ease-out    (요소 등장 — 빠르게 시작해 천천히 정착)
--easing-exit:  ease-in     (요소 퇴장 — 천천히 시작해 빠르게 사라짐)
--easing-symmetric:  ease-in-out (양방향 대칭 전환 — 반복 애니메이션, 위치 이동)
--easing-base:  ease        (방향 없는 즉각 상태 변화 — hover, focus)
-->
:::scale easing

| 사용처 | 토큰 |
|--------|------|
| 요소 등장 (드롭다운 열림, 모달 진입, 툴팁) | `--easing-enter` |
| 요소 퇴장 (드롭다운 닫힘, 모달 해제) | `--easing-exit` |
| 양방향 대칭 전환 (반복 애니메이션, 위치 이동) | `--easing-symmetric` |
| 방향 없는 토글 상태 변화 (hover, focus) | `--easing-base` |

### Translate

인터랙티브 요소의 hover 시 수직 이동 값. `transform: translateY()` 에 사용한다. scale 대신 translate를 사용하는 이유는 텍스트 크기가 변하지 않아 폰트 렌더링이 일관되게 유지되기 때문이다.

| 사용처 | 토큰 |
|--------|------|
| 버튼·칩 등 hover 시 살짝 부상 | `--translate-interactive-hover` |

## Choreography

여러 요소가 연속으로 전환될 때의 순서 규칙.

| 시나리오 | 순서 |
|---------|------|
| 같은 트리거의 여러 요소 | 동시 전환 |
| 콘텐츠 교체 (탭·스텝) | 새 요소 등장 → 이전 요소 퇴장 |
| 레이어 해제 (모달 닫기) | 레이어 퇴장 → 배경 콘텐츠 복귀 |

> ⚠️ exit duration은 enter보다 짧게. 퇴장이 느리면 전환 전체가 둔하게 느껴진다.

duration-easing 기본 조합:

| 시나리오 | duration | easing |
|---------|----------|--------|
| hover, focus | `--duration-fast` | `--easing-base` |
| 드롭다운·팝오버 등장 | `--duration-base` | `--easing-enter` |
| 드롭다운·팝오버 퇴장 | `--duration-fast` | `--easing-exit` |
| 모달·사이드 패널 등장 | `--duration-slow` | `--easing-enter` |
| 모달·사이드 패널 퇴장 | `--duration-base` | `--easing-exit` |
| 캐러셀·슬라이드 이동 | `--duration-base` | `--easing-symmetric` |

## Do / Don't

> ✅ DO — 두 상태 전환은 transition, 반복·복잡한 키프레임은 animation
> `transition: opacity var(--duration-base) var(--easing-enter);` (등장 — 두 상태 전환)
> `animation: spin var(--duration-base) linear infinite;` (로딩 스피너 — 반복 키프레임)

> ✅ DO — 등장·퇴장에 방향 easing 명시
> `transition: opacity var(--duration-base) var(--easing-enter);` (드롭다운 열림)
> `transition: opacity var(--duration-fast) var(--easing-exit);` (드롭다운 닫힘)

> ✅ DO — 물리적 이동에 move
> `transition: transform var(--duration-base) var(--easing-symmetric);` (캐러셀 슬라이드)

> ✅ DO — hover·focus는 방향 없으므로 base
> `transition: background var(--duration-fast) var(--easing-base);`

> ✅ DO — 인터랙티브 요소 hover에 translate 토큰 사용
> `transition: transform var(--duration-fast) var(--easing-base);`
> `.btn:hover { transform: translateY(var(--translate-interactive-hover)); }`

> ❌ DON'T — transition: all 금지 (의도치 않은 속성까지 전환되어 성능 저하·레이아웃 버그 유발)
> `transition: all 0.3s ease-in-out;`

> ❌ DON'T — 의미 없는 반복 animation
> `animation: pulse 2s infinite;`

> ❌ DON'T — 등장에 exit easing, 퇴장에 enter easing
> `transition: opacity var(--duration-base) var(--easing-exit);` (모달 등장 — enter 써야 함)

> ⚠️ 자동 반복 애니메이션, 장식용 모션 금지.
> ⚠️ 사용자가 호출하지 않은 모션은 만들지 않는다(loading 인디케이터 제외).

## `prefers-reduced-motion` 대응 (필수)

전역 스타일시트(`global.css` 또는 `base.css`)에 한 번만 작성한다. 컴포넌트 CSS에 개별 작성하지 않는다.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration:  0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```
