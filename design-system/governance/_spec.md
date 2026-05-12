---
file: governance/_spec.md
version: 0.1.0
---

# 문서 공통 작성 규칙

토큰·컴포넌트·워크플로 등 디자인 시스템 내 **모든 `.md` 파일**에 적용되는 표 작성 규칙.

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
