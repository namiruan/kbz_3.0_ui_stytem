---
file: components/molecules/banner.md
version: 0.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/icon.md, tokens/typography.md, components/atoms/icon.md, components/atoms/link.md
---

# Banner

## 개요

페이지·섹션 안에 고정 삽입되어 지속적으로 노출되는 인라인 상태 메시지 바. 저장 실패·권한 부족처럼 섹션 단위로 계속 보여야 하는 정보·경고·오류를 전달한다.

Toast와의 차이 — Toast는 화면 우상단에 잠깐 떠 있다가 자동 소멸하는(닫을 수 있는) 피드백. Banner는 콘텐츠 흐름 안에 고정되어 **조건이 해소될 때까지** 사라지지 않으며, 사용자가 임의로 닫는 버튼을 두지 않는다 — 닫힘은 Toast의 성격이다. 시각 스타일(상태 색·아이콘)은 Toast와 동일한 체계를 따르되, 그림자 없이 인라인 블록으로 배치된다.

Alert과의 차이 — Alert는 오버레이 위 확인/취소 다이얼로그(포커스 가둠). Banner는 흐름을 막지 않는 인라인 메시지로 확인 응답을 요구하지 않는다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| style | info (기본, 클래스 없음) · success → `banner--success` · caution → `banner--caution` · error → `banner--error` | info |
| title | 없음 (기본) · 있음 — `banner__title` 요소 포함 | 없음 |
| action | 없음 (기본) · 있음 — `banner__action` 슬롯에 Link 또는 버튼 배치 | 없음 |

닫기 버튼은 두지 않는다. Banner는 조건이 해소될 때까지 유지되며, 제거는 조건이 풀렸을 때 앱이 담당한다. 사용자가 닫을 수 있어야 하는 알림은 Toast를 쓴다.

---

## 사용 지침

| 상황 | 권장 |
|------|------|
| 섹션 단위 오류 — 저장 실패, 권한 부족 | `banner--error` |
| 저장·처리 성공을 계속 노출 | `banner--success` |
| 마감 임박·주의 안내 등 지속 경고 | `banner--caution` |
| 시스템 점검 예정, 일반 공지 | info (기본) |
| 잠깐 떴다 사라지는 피드백 | Toast |
| 단일 입력 필드 검증 오류 | Inline 에러 (FormField) |
| 전체 페이지 로드 실패 (404·500) | Page 에러 |
| 확인/취소 응답이 필요한 경우 | Alert |

**제약**
- 메시지는 원인 + 해결 방법 구조로 1–2문장. 더 긴 설명은 `banner__action`으로 상세 페이지를 연결한다(→ `product.md` 메시지 작성 규칙).
- 한 섹션에 배너를 여러 개 쌓지 않는다. 동시에 여러 상태가 있으면 가장 높은 심각도(error > caution > success > info) 하나로 합친다.
- 닫기 버튼을 두지 않는다. 배너 제거는 조건이 해소됐을 때 앱 로직이 처리한다. 사용자가 닫아야 하는 알림은 Toast로 위임한다.

---

## Anatomy

<!-- AI:
- root = div.banner. style 클래스(banner--success 등)를 root에 조합. info는 클래스 없음.
- 오류 배너는 role="alert", 그 외는 role="status" — 라이브 리전으로 AT에 알림.
- icon = span.icon--md.banner__icon[aria-hidden="true"] > svg > use. 상태별 아이콘: info=icon-info, success=icon-circle-check, caution=icon-triangle-alert, error=icon-circle-x. color는 style variant가 상속.
- body = div.text-description.banner__body — flex column. title + message + action 포함. .text-description(font-size-lg + line-height-reading) 베이스.
  - title = p.banner__title (선택) — semibold.
  - message = p.banner__message — 본문.
  - action = div.banner__action (선택) — Link(a.link.banner__action-link) 또는 버튼 슬롯.
- 닫기 버튼 없음 — Banner는 조건이 해소될 때까지 유지된다. 닫을 수 있는 알림은 Toast.
- 그림자 없음(인라인). Toast와 달리 position:fixed·stack·자동 소멸 없음.
- [뷰어 주의] :::preview 정적 마크업의 SVG href는 build.py가 href="icons/sprite.svg#id" → href="#id"로 치환한다.
-->

:::preview
<div class="anatomy-grid">

<div class="anatomy-row">
  <span class="anatomy-label">info (기본)</span>
  <div data-component class="banner" role="status">
    <span class="icon--md banner__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-info"/></svg></span>
    <div class="text-description banner__body">
      <p class="banner__message">2026년 8월 1일 02:00–04:00 시스템 점검이 예정되어 있어요.</p>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">success</span>
  <div data-component class="banner banner--success" role="status">
    <span class="icon--md banner__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-circle-check"/></svg></span>
    <div class="text-description banner__body">
      <p class="banner__message">모든 변경 사항이 저장되었어요.</p>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">caution</span>
  <div data-component class="banner banner--caution" role="status">
    <span class="icon--md banner__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-triangle-alert"/></svg></span>
    <div class="text-description banner__body">
      <p class="banner__message">신고 마감이 3일 남았어요. 미제출 대상자를 확인해주세요.</p>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">error</span>
  <div data-component class="banner banner--error" role="alert">
    <span class="icon--md banner__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-circle-x"/></svg></span>
    <div class="text-description banner__body">
      <p class="banner__message">이 페이지를 볼 권한이 없어요. 관리자에게 권한을 요청해주세요.</p>
    </div>
  </div>
</div>

<div class="anatomy-row">
  <span class="anatomy-label">title + action</span>
  <div data-component class="banner banner--error" role="alert">
    <span class="icon--md banner__icon" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-circle-x"/></svg></span>
    <div class="text-description banner__body">
      <p class="banner__title">저장 실패</p>
      <p class="banner__message">변경 사항을 저장하지 못했어요. 잠시 후 다시 시도해주세요.</p>
      <div class="banner__action"><a class="link banner__action-link" href="#">오류 내역 보기</a></div>
    </div>
  </div>
</div>

</div>
:::

---

## CSS

```css
/* ── Banner ──────────────────────────────────
   시각 스타일은 Toast와 동일 체계(상태별 surface-*-subtle 배경 + border-*-subtle + text-* 색).
   Toast와 달리 인라인 블록 — position/stack/shadow/애니메이션·닫기 버튼 없음.
─────────────────────────────────────────────── */
.banner {
  display: flex;
  align-items: flex-start;
  gap: var(--space-gap-sm);
  padding: var(--space-inset-lg);
  background: var(--color-surface-brand-subtle); /* info default */
  border: var(--stroke-sm) solid var(--color-border-brand-subtle); /* info default */
  border-radius: var(--radius-md);
}

/* ── Icon ── */
/* icon--md(utilities/icon.css) — SVG 20px. color 상속으로 SVG currentColor 전달 */
.banner__icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  color: var(--color-text-brand); /* info default */
}

/* ── Body ── */
/* .text-description(font-size-lg + line-height-reading) 베이스. title·message·action 모두 상속 */
.banner__body {
  flex: 1;
  min-width: 0; /* flex 컨테이너 안 텍스트 말줄임 보장 */
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-2xs);
}
.banner__title {
  font-weight: var(--font-weight-heading);
  color: var(--color-text-brand); /* info default */
  line-height: var(--line-height-ui);
  margin: 0;
}
.banner__message {
  color: var(--color-text-brand); /* info default */
  line-height: var(--line-height-reading);
  margin: 0;
}

/* ── Action ── */
/* .link(components/atoms/link.md) 위에 color만 오버라이드. font-size는 banner__body에서 상속 */
.banner__action {
  margin-top: var(--space-gap-xs);
}
.banner__action-link {
  color: var(--color-text-brand); /* info default — .link 기본값(brand-vivid) 오버라이드 */
}
.banner__action-link:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
  border-radius: var(--radius-xs);
}

/* ── Style variants ── */
.banner--success {
  background: var(--color-surface-success-subtle);
  border-color: var(--color-border-success-subtle);
}
.banner--success .banner__icon,
.banner--success .banner__title,
.banner--success .banner__message,
.banner--success .banner__action-link {
  color: var(--color-text-success);
}

.banner--caution {
  background: var(--color-surface-caution-subtle);
  border-color: var(--color-border-caution-subtle);
}
.banner--caution .banner__icon,
.banner--caution .banner__title,
.banner--caution .banner__message,
.banner--caution .banner__action-link {
  color: var(--color-text-caution);
}

.banner--error {
  background: var(--color-surface-error-subtle);
  border-color: var(--color-border-error-subtle);
}
.banner--error .banner__icon,
.banner--error .banner__title,
.banner--error .banner__message,
.banner--error .banner__action-link {
  color: var(--color-text-error);
}
```

---

## 접근성

인라인 라이브 리전 패턴. 펼침/접힘 없음.

| 상황 | 마크업 |
|------|--------|
| 정보·성공·주의 배너 | `role="status"` — polite로 읽기 |
| 오류 배너 | `role="alert"` — assertive로 즉시 읽기 |
| 상태 아이콘 | `aria-hidden="true"` — 시각 전용 |
| 액션 링크 | 유효한 목적지를 가진 `<a class="link">` — 이동 불가 시 슬롯 제거 |
| 키보드 — `Tab` | 액션 링크로 포커스 이동 |

- 색상만으로 상태를 전달하지 않는다 — 아이콘 + 텍스트를 항상 병행한다.
- 배너를 조건에 따라 동적으로 추가할 때는 이미 존재하는 라이브 리전 안에 삽입하거나 `role`을 부여해 AT가 인지하도록 한다.

---

## Do / Don't

> ✅ DO — 상태 아이콘 + 텍스트 메시지 병행
> `<div class="banner banner--error" role="alert"><span class="icon--md banner__icon" aria-hidden="true">…</span><div class="banner__body"><p class="banner__message">…</p></div></div>`

> ❌ DON'T — Banner에 닫기 버튼 추가
> 사용자가 닫을 수 있는 알림은 Toast다. Banner는 조건이 해소될 때까지 유지하고, 제거는 앱 로직이 담당한다.

> ❌ DON'T — 잠깐 뜨고 사라질 피드백에 Banner 사용
> 자동 소멸 피드백은 Toast를 쓴다.

> ❌ DON'T — 한 섹션에 배너 여러 개 쌓기
> 동시 상태는 최고 심각도 하나로 합친다.

> ❌ DON'T — 그림자·고정 위치 추가
> Banner는 콘텐츠 흐름 안 인라인 블록이다. 떠 있는 알림은 Toast의 역할이다.
