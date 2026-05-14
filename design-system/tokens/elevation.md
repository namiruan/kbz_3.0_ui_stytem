---
file: tokens/elevation.md
version: 1.0.0
depends-on: tokens/_index.md
---

# Elevation 시스템

z축(깊이)을 shadow와 z-index 두 가지로 표현한다.

## Semantic

### Shadow

크기 기반으로 명명된다 (`sm` → `xl`). 숫자가 클수록 더 높이 떠 있는 느낌.

<!-- AI: :::shadow renders shadow tokens (semantic only, no primitives):
--shadow-sm: 0 1px 2px rgba(#000, 6%)
--shadow-md: 0 2px 8px rgba(#000, 8%) + 0 1px 2px rgba(#000, 6%)
--shadow-lg: 0 4px 16px rgba(#000, 10%) + 0 2px 4px rgba(#000, 6%)
--shadow-xl: 0 8px 32px rgba(#000, 12%) + 0 4px 8px rgba(#000, 6%)
알파값은 color-mix(in srgb, var(--color-gray-1000) N%, transparent)로 표현된다.
-->
:::shadow

| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| `shadow` | 카드·드롭다운·모달·다이얼로그·토스트·툴팁 | `--shadow-sm`<br>`--shadow-md`<br>`--shadow-lg`<br>`--shadow-xl` |

### Z-Index

목적 기반으로 명명된다. z-index 숫자 자체는 임의적이어서 값 기반 명명(`--z-100`)보다 목적 기반 명명(`--z-dropdown`)이 직관적이다. 레이어 맥락별로 100 단위로 점프한다.

backdrop(200)과 modal(210)은 함께 쓰이는 쌍이다. backdrop은 모달 뒷배경(딤 처리)이고 modal은 그 위의 패널이다. 둘이 항상 같이 등장하므로 같은 100 단위 구간 안에서 10 단위 차이로 배치한다.

`--z-auto`는 `z-index: auto`의 토큰화로, stacking context를 새로 만들지 않고 부모 컨텍스트를 그대로 상속할 때 사용한다.

<!-- AI: :::z-index renders z-index tokens (purpose-based, 100-unit jumps):
Modifiers:  --z-above: 1 | --z-below: -1 | --z-auto: auto
Layers:     --z-dropdown: 100 | --z-sticky: 150
            --z-backdrop: 200 | --z-modal: 210  ← backdrop+modal은 항상 쌍으로 사용
            --z-dialog: 250 | --z-toast: 300 | --z-tooltip: 400
-->
:::z-index

| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| `z-index` | 전역 레이어 순서 | `--z-dropdown`<br>`--z-sticky`<br>`--z-backdrop`<br>`--z-modal`<br>`--z-dialog`<br>`--z-toast`<br>`--z-tooltip` |
| `z-index` modifier | stacking context 내부 상대 계층 조정 | `--z-above`<br>`--z-below`<br>`--z-auto` |

## Utility

shadow와 z-index는 서로 다른 CSS 속성이라 하나의 CSS 변수로 묶을 수 없다. 따라서 두 속성을 레이어 계층에 맞게 묶은 유틸리티 클래스를 제공한다.

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

전역 레이어 내부에서 형제 요소 간 순서 조정이 필요할 때 `--z-above` / `--z-below` modifier를 사용한다. 새로운 전역 토큰을 추가하지 않는다.

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

> ⚠️ modifier는 같은 stacking context 내부 형제 요소 간 순서 조정에만 사용한다.

## 서드파티 z-index 거버넌스

외부 라이브러리(채팅 위젯, 지도, 결제 모듈 등)에서 임의로 설정한 z-index는 반드시 우리 레이어 시스템 값으로 오버라이드한다.

```css
.third-party-chat-widget {
  z-index: var(--z-toast) !important;
}
```

## Do / Don't

> ✅ DO — elevation 유틸리티 클래스 사용
> `.modal { box-shadow: var(--shadow-lg); z-index: var(--z-modal); }`
> `.dropdown-menu { box-shadow: var(--shadow-md); z-index: var(--z-dropdown); }`

> ✅ DO — modifier로 stacking context 내부 순서 조정
> `.modal-select { z-index: calc(var(--z-modal) + var(--z-above)); }`

> ✅ DO — 서드파티 z-index를 레이어 시스템으로 오버라이드
> `.third-party-widget { z-index: var(--z-toast) !important; }`

> ❌ DON'T — 임의 정수
> `.modal { z-index: 9999; }`

> ❌ DON'T — shadow와 z-index 계층 불일치
> `.dropdown { box-shadow: var(--shadow-lg); }` ← dropdown에는 `--shadow-md`

> ❌ DON'T — modifier로 전역 레이어 넘기기
> `.dropdown { z-index: calc(var(--z-dropdown) + var(--z-above)); }` ← `--z-sticky`(150) 범위 침범 가능

> ❌ DON'T — 전역 레이어 순서 변경을 modifier로 해결
> modifier로 toast를 tooltip보다 위에 올리려 하지 않는다. 전역 레이어 순서 변경은 시스템 전체에 영향을 주므로 z-index 토큰 값 자체를 수정하고 팀과 합의한다.
