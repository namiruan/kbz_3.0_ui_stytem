---
file: tokens/color.md
version: 1.12.0
depends-on: tokens/_index.md
---

# 색상 시스템

## Primitive

밝기 스케일(50–950)로 구성된다. 숫자가 클수록 어둡다. gray만 양 끝에 `0`(#ffffff)과 `1000`(#000000)이 추가로 존재한다. 팔레트별 원시값이며 컴포넌트에서 직접 참조하지 않는다.

### Blue

주요 브랜드 컬러. CTA 버튼, 링크, 포커스 링, 선택·활성 상태.

:::palette blue

### Cyan

보조 브랜드 컬러. 정보성 배지, 보조 액션, 데이터 시각화 계열.

:::palette cyan

### Gray

중립 UI. 텍스트, 배경, 구분선, 비활성 상태 전반.

:::palette gray

### Green

성공·긍정 상태. 완료, 승인, 성공 메시지, 유효성 검사 통과.

:::palette green

### Orange

경고·주의 상태. 주의가 필요한 정보, 기한 임박, 권장 사항.

:::palette orange

### Red

오류·위험 상태. 에러 메시지, 삭제 확인, 위험 액션.

:::palette red

### Avatar

사진 없는 사람을 서로 구분하는 8색. **상태색(green·orange·red)과 겹치지 않게** 따로 둔다 — 목록에서 빨간 아바타가 "오류"로 읽히면 안 된다.

각 색조는 **두 자리만** 쓴다: `-100`(면) · `-600`(잉크). 다른 팔레트의 같은 자리를 뜻한다(면 `hsl(·, 71%, 92%)` · 잉크 `hsl(·, 84%, ·)`). 50~950 램프는 만들지 않았다 — 쓰는 곳이 아바타 하나뿐이라 중간 단계를 두면 다른 용도로 새어 나간다.

잉크의 **명도는 색조마다 다르다.** 같은 명도를 쓰면 대비가 3.1~6.9로 널뛰어 초록·청록은 흐리고 남보라는 새까맣다. 색조별로 4.5:1에 닿는 **가장 밝은** 값이다.

각 줄이 한 색조다. 위에서부터 아래 표의 1~8 순서와 같다.

:::palette avatar-1

:::palette avatar-2

:::palette avatar-3

:::palette avatar-4

:::palette avatar-5

:::palette avatar-6

:::palette avatar-7

:::palette avatar-8

| 번호 | 색조 | 면 `-100` | 잉크 `-600` | 대비 |
|---|---|---|---|---|
| 1 | 파랑 | `#dcebf9` | `#1169c0` | 4.54:1 |
| 2 | 초록 | `#dcf9f0` | `#0b7a59` | 4.78:1 |
| 3 | 주황 | `#f9eddc` | `#965d0d` | 4.7:1 |
| 4 | 보라 | `#eedcf9` | `#9914e6` | 4.51:1 |
| 5 | 자홍 | `#f9dcef` | `#c01186` | 4.5:1 |
| 6 | 청록 | `#dcf3f9` | `#0c738d` | 4.73:1 |
| 7 | 연두 | `#e8f9dc` | `#397a0b` | 4.8:1 |
| 8 | 남보라 | `#e0dcf9` | `#5a43ef` | 4.53:1 |

## Semantic

| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| `surface` | 중립 배경 | `--color-surface-base`<br>`--color-surface-subtle`<br>`--color-surface-neutral`<br>`--color-surface-disabled`<br>`--color-surface-disabled-strong`<br>`--color-surface-dark`<br>`--color-surface-dim`<br>`--color-surface-scrim` |
| `surface` | 브랜드 배경 | `--color-surface-brand`<br>`--color-surface-brand-subtle`<br>`--color-surface-brand-tint`<br>`--color-surface-info-subtle`<br>`--color-surface-info-tint` |
| `surface` | 상태 배경 | `--color-surface-success-subtle`<br>`--color-surface-caution-subtle`<br>`--color-surface-error-subtle` |
| `surface` | 아바타 식별색 면 — 사진 없는 사람 구분 | `--color-surface-avatar-1` … `--color-surface-avatar-8` |
| `text` | 본문·UI 텍스트 | `--color-text-body`<br>`--color-text-display`<br>`--color-text-label`<br>`--color-text-subtle`<br>`--color-text-body-alpha`<br>`--color-text-disabled`<br>`--color-text-disabled-faint`<br>`--color-text-inverse`<br>`--color-text-inverse-alpha` |
| `text` | 브랜드 텍스트 | `--color-text-brand-vivid`<br>`--color-text-brand`<br>`--color-text-brand-alpha`<br>`--color-text-brand-muted`<br>`--color-text-brand-faint`<br>`--color-text-info`<br>`--color-text-info-muted` |
| `text` | 상태 피드백 | `--color-text-caution`<br>`--color-text-caution-muted`<br>`--color-text-error`<br>`--color-text-success` |
| `text` | 아바타 식별색 잉크 — 이니셜·사람 마크 | `--color-text-avatar-1` … `--color-text-avatar-8` |
| `border` | 테두리·구분선 | `--color-border-faint`<br>`--color-border-subtle`<br>`--color-border-neutral-subtle`<br>`--color-border-default`<br>`--color-border-strong`<br>`--color-border-disabled`<br>`--color-border-selected`<br>`--color-border-brand`<br>`--color-border-brand-subtle`<br>`--color-border-focus`<br>`--color-border-complete`<br>`--color-border-info-subtle`<br>`--color-border-caution-subtle`<br>`--color-border-error`<br>`--color-border-error-subtle`<br>`--color-border-success`<br>`--color-border-success-subtle` |
| `fill` | 컴포넌트 채움 배경 — 버튼·프로그래스바·폼 컨트롤 등 solid fill 공용 | `--color-fill-brand-vivid`<br>`--color-fill-brand`<br>`--color-fill-neutral`<br>`--color-fill-error` |
| `action` | 중립 인터랙션 | `--color-action-neutral-hover`<br>`--color-action-neutral-pressed`<br>`--color-action-neutral-selected`<br>`--color-action-neutral-overlay`<br>`--color-action-neutral-subtle`<br>`--color-action-neutral-faint` |
| `action` | 브랜드 인터랙션 | `--color-action-brand-hover`<br>`--color-action-brand-pressed`<br>`--color-action-brand-selected`<br>`--color-action-brand-subtle`<br>`--color-action-brand-idle`<br>`--color-action-brand-overlay`<br>`--color-action-info-hover`<br>`--color-action-info-pressed`<br>`--color-action-info-selected`<br>`--color-action-info-overlay`<br>`--color-action-info-subtle` |
| `action` | 위험 인터랙션 | `--color-action-error-hover`<br>`--color-action-error-pressed`<br>`--color-action-error-selected`<br>`--color-action-error-overlay` |
| `action` | 밝은(흰색) 인터랙션 — 어두운 배경 전용 | `--color-action-light-hover`<br>`--color-action-light-pressed`<br>`--color-action-light-selected`<br>`--color-action-light-overlay` |


## Do / Don't

> ✅ DO — 아바타 식별색은 같은 번호끼리 짝지어 쓴다
> `background: var(--color-surface-avatar-3); color: var(--color-text-avatar-3);`

> ❌ DON'T — 아바타 식별색을 상태·강조에 전용
> `background: var(--color-surface-avatar-5);` — 이 색들은 **뜻이 없다.** 사람을 가르는 것 외의 용도로 쓰면 읽는 사람이 없는 의미를 찾는다

> ❌ DON'T — 번호를 섞어 쓰기
> `background: var(--color-surface-avatar-3); color: var(--color-text-avatar-7);` — 대비가 보장되지 않는다. 4.5:1은 같은 번호 안에서만 맞춰 뒀다


> ✅ DO — 비활성은 **바탕이 있는지**로 값을 고른다
> 회색 면이 함께 깔리면 `--color-text-disabled`(면이 신호의 절반을 맡는다) · 바탕이 투명한 컨트롤이면 `--color-text-disabled-faint`(색이 신호를 혼자 진다)

> ❌ DON'T — 투명한 컨트롤의 비활성에 `--color-surface-disabled` 면을 더하기
> 없던 상자가 새로 생겨 **한 줄에서 못 누르는 것이 가장 진해진다** (→ `components/molecules/pagination.md`)

> ✅ DO — Semantic 사용
> `color: var(--color-text-body);`
> `border: 1px solid var(--color-border-default);`

> ❌ DON'T — Primitive 직접 참조
> `color: var(--color-gray-950);`

> ❌ DON'T — hex 직접 사용
> `color: #131416;`

> ✅ DO — 투명도가 필요하면 `color-mix()`로 Semantic 토큰을 정의해 사용
> `color-mix(in srgb, var(--color-gray-950) 8%, transparent)`

> ❌ DON'T — `rgba()` 또는 `opacity` 직접 사용
> `rgba(0, 0, 0, 0.08)` ← 토큰 시스템 밖으로 나가며 다크모드 전환 불가

### 중립 border 4종 선택 기준

같은 회색 계열이라 오용하기 쉽다. **선이 무엇을 하는지**로 고른다.

| 토큰 | 하는 일 | 예 |
|------|---------|-----|
| `--color-border-faint` | 읽는 흐름에 리듬만 준다 | 게시판·자료실 등 본문형 목록의 항목 구분선 |
| `--color-border-subtle` | 같은 층위의 항목을 나눈다 | 표 행 구분선, 카드 테두리 |
| `--color-border-default` | 클릭·입력할 수 있는 대상의 윤곽을 그린다 | 버튼·인풋·셀렉트 테두리 |
| `--color-border-strong` | 층위가 다른 구획을 가른다 | 목록 머리와 본문 사이, 섹션 경계 |

**`faint`와 `subtle`은 밝기 차이가 아니라 선이 하는 일의 차이다.** 데이터 표의 행 구분선은 실제로 일을 한다 — 행을 가로질러 값을 비교하려면 어느 값이 어느 행인지 선이 잡아줘야 한다. 본문형 목록의 구분선은 비교 대상이 아니라 **읽을 것을 고르는 나열**이라, 선은 항목이 바뀌는 지점만 알리면 된다. 같은 굵기·같은 색이라도 20줄 이어지면 무게가 누적돼 제목과 경쟁하므로, 반복되는 리듬선은 한 단계 연하게 둔다.

> ❌ DON'T — 데이터 표 행 구분선에 `faint` 쓰기 (행을 가로질러 읽는 동작이 어려워진다)
> ❌ DON'T — 본문형 목록에서 구분선을 굵게·진하게 강조 (선이 제목보다 먼저 읽힌다)

> ❌ DON'T — 상태 토큰을 구획선으로 전용
> `border-bottom: 1px solid var(--color-border-selected);` ← 값이 같아도 의미가 다르다(선택 상태). 구획선은 `--color-border-strong`
