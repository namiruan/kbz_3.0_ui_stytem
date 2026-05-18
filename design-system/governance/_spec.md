---
file: governance/_spec.md
version: 0.2.0
---

# 문서 공통 작성 규칙

토큰·컴포넌트·워크플로 등 디자인 시스템 내 **모든 `.md` 파일**에 적용되는 표 작성 규칙.

---

## DO / DON'T 작성 형식

모든 DO/DON'T는 아래 형식을 따른다. DO와 DON'T는 빈 줄로 분리하고, 각 항목은 설명과 코드 예시를 한 쌍으로 작성한다.

```
> ✅ DO — [설명]
> `[코드 예시]`

> ❌ DON'T — [설명]
> `[코드 예시]`
```

> ⚠️ 여러 DO 또는 DON'T를 한 블록에 묶지 않는다. 항목마다 빈 줄로 분리한다.

> ⚠️ 코드 예시 없이 설명만 작성 금지. 반드시 한 쌍으로 작성한다.

---

## 표 — 다중값 나열

마크다운 표의 한 셀에 토큰, 클래스, 기타 나열 항목이 2개 이상일 때는 **`<br>`로 줄바꿈해 한 행에 하나씩** 나열한다. 쉼표 나열 금지.

> ❌ DON'T — 쉼표 나열
> `` `--color-text-body`, `--color-text-subtle`, `--color-text-disabled` ``

> ✅ DO — `<br>` 줄바꿈
> `` `--color-text-body`<br>`--color-text-subtle`<br>`--color-text-disabled` ``

같은 규칙이 클래스 열에도 적용된다.

> ❌ DON'T
> `` `.text-button-sm`, `.text-button-md`, `.text-button-lg` ``

> ✅ DO
> `` `.text-button-sm`<br>`.text-button-md`<br>`.text-button-lg` ``

---

## 표 — 토큰·클래스명 표기

토큰명이나 클래스명 뒤에 **px값·설명·주석을 인라인으로 삽입하지 않는다.** 값과 설명은 hover 툴팁으로 제공된다.

> ❌ DON'T — `` `--radius-md`(8px, base) ``
> ✅ DO — `` `--radius-md` ``

---

## 표 — 토큰·클래스 열 위치

토큰명·클래스명은 **표의 오른쪽**에 위치한다. 앞 열에서 맥락(그룹·사용처)을 먼저 제공하고, 토큰·클래스명이 우측에 온다. 열이 여러 개여도 무방하며, 맥락 열보다 오른쪽이면 된다.

> ❌ DON'T — 토큰이 첫 열
> `| 토큰 | 사용처 |`

> ✅ DO — 토큰이 우측
> `| 사용처 | 토큰 |` 또는 `| 그룹 | 사용처 | 토큰 |` 또는 `| 그룹 | 사용처 | 클래스A | 클래스B |`

**예외 — 원시값 key-value 표**: 토큰과 그 원시값만 나열하는 2열 표(`| 토큰 | 값 |`)는 시각화 디렉티브(`:::scale`, `:::palette`)로 대체한다. 디렉티브가 없는 경우 열 순서를 `| 사용처 | 토큰 |`으로 맞추고 값은 hover 툴팁으로 제공한다.

---

## 표 — 동일 그룹 행 구분

그룹 값이 같은 연속 행은 **별도 구분선 없이 바로 이어 작성한다.** 마크다운 렌더러가 행 사이에 기본 구분선을 그리므로 추가 구분은 하지 않는다.

```md
| 그룹 | 사용처 | 토큰 |
|------|--------|------|
| `surface` | 중립 배경 | `--color-surface-base`<br>`--color-surface-subtle` |
| `surface` | 브랜드 배경 | `--color-surface-brand`<br>`--color-surface-brand-subtle` |
| `text` | 본문·UI 텍스트 | `--color-text-body`<br>`--color-text-display` |
```

> ✅ 같은 그룹(`surface`)이 연속으로 이어져도 빈 행이나 구분 기호를 삽입하지 않는다.
