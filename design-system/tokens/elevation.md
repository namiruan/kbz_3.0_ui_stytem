---
file: tokens/elevation.md
version: 1.0.0
depends-on: tokens/_index.md
---

# Elevation

z축(깊이)을 shadow와 z-index 두 가지로 표현한다.

## Primitive

### Shadow

크기 기반으로 명명된다 (`sm` → `xl`). 숫자가 클수록 더 높이 떠 있는 느낌.

:::shadow

### Z-Index

목적 기반으로 명명된다. z-index 숫자 자체는 임의적이어서 값 기반 명명(`--z-100`)보다 목적 기반 명명(`--z-dropdown`)이 직관적이다. 레이어 맥락별로 100 단위로 점프한다. backdrop(200)과 modal(210)은 같은 맥락이므로 10 단위 차이로 유지된다.

:::z-index

## Utility

shadow와 z-index는 단일 CSS 변수로 묶을 수 없어 semantic 토큰 레이어가 없다. 대신 두 속성을 레이어 계층에 맞게 묶은 유틸리티 클래스를 제공한다.

| 그룹 | 사용처 | 클래스 |
|------|--------|--------|
| `base` | 카드, hover 강조 | `.elevation-base` |
| `dropdown` | 드롭다운, 팝오버 | `.elevation-dropdown` |
| `modal` | 모달, 사이드 패널 | `.elevation-modal` |
| `dialog` | 확인 다이얼로그 (모달 위) | `.elevation-dialog` |
| `toast` | Toast, 최상위 알림 | `.elevation-toast` |
| `tooltip` | 툴팁 | `.elevation-tooltip` |

> `sticky` · `backdrop`은 shadow 없이 z-index만 사용하므로 elevation 클래스가 없다. `--z-sticky` / `--z-backdrop`을 직접 참조한다.

## Local Layer (Modifier)

전역 레이어 내부에서 요소 간 순서 조정이 필요할 때 `--z-above` / `--z-below` modifier를 사용한다. 새로운 전역 토큰을 추가하지 않는다.

| 용도 | 토큰 |
|------|------|
| stacking context 내부에서 한 단계 위 | `--z-above` |
| stacking context 내부에서 한 단계 아래 | `--z-below` |

**사용 패턴:**

```css
/* 모달 내부 드롭다운이 모달 위에 올라와야 할 때 */
.modal-dropdown {
  z-index: calc(var(--z-modal) + var(--z-above));
}

/* 카드 내부 배지가 이미지 위에 떠야 할 때 */
.card-badge {
  z-index: calc(1 + var(--z-above));
}
```

> ⚠️ modifier는 같은 stacking context 내부에서만 사용한다. 전역 레이어 간 순서를 바꾸려면 semantic 토큰 구조를 재검토한다.

## Pattern Layer (중첩 컨텍스트)

설정 모달처럼 모달 안에 드롭다운·datepicker가 들어가는 경우, 자식 요소가 새로운 stacking context를 만들어 부모의 z-index를 참조할 수 없다. 이때 `:root`에 선언된 패턴 전용 변수(`--kbz-*-layer`)를 사용한다.

| 용도 | 토큰 |
|------|------|
| 모달 내부 요소가 모달 위로 올라와야 할 때 | `--kbz-modal-layer` |
| 드롭다운 내부 서브메뉴 | `--kbz-dropdown-layer` |
| 토스트 내부 액션 버튼 | `--kbz-toast-layer` |
| 툴팁 내부 요소 | `--kbz-tooltip-layer` |

```css
/* 설정 모달 안의 datepicker 달력 레이어 */
.datepicker-calendar.inside-modal {
  z-index: calc(var(--kbz-modal-layer) + var(--z-above));
}
```

> ⚠️ 패턴 전용 변수는 반드시 `:root`에 선언해야 중첩 stacking context에서 참조 가능하다.

## 서드파티 z-index 거버넌스

외부 라이브러리(채팅 위젯, 지도, 결제 모듈 등)에서 임의로 설정한 z-index는 반드시 우리 레이어 시스템 값으로 오버라이드한다.

```css
.third-party-chat-widget {
  z-index: var(--z-toast) !important;
}
```

## Do / Don't

> ✅ DO — elevation 유틸리티 클래스 사용
> `.modal { @apply elevation-modal; }`
> `.dropdown-menu { @apply elevation-dropdown; }`

> ✅ DO — modifier로 stacking context 내부 순서 조정
> `.modal-select { z-index: calc(var(--kbz-modal-layer) + var(--z-above)); }`

> ✅ DO — 서드파티 z-index를 레이어 시스템으로 오버라이드
> `.third-party-widget { z-index: var(--z-toast) !important; }`

> ❌ DON'T — 임의 정수
> `.modal { z-index: 9999; }`

> ❌ DON'T — shadow와 z-index 계층 불일치
> `.dropdown { box-shadow: var(--shadow-lg); }` ← dropdown에는 shadow-md

> ❌ DON'T — modifier로 전역 레이어 넘기기
> `.dropdown { z-index: calc(var(--z-dropdown) + var(--z-above)); }` ← sticky 범위 침범 가능
