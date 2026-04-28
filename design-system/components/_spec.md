---
file: components/_spec.md
version: 0.2.0
---

# 컴포넌트 정의 문서 작성 규칙

## 문서 헤더

최상단에 아래 필드를 모두 포함한다.

```yaml
---
component: Button
version:   0.1.0
status:    draft | stable | deprecated
figma-node: 606-2968
updated:   2025-06-01
---
```

| 필드 | 작성 기준 | 언제 업데이트 |
|------|----------|-------------|
| `version` | 정의서 변경 범위 | 내용이 바뀔 때마다 |
| `status` | 팀 합의 여부 | 리뷰 통과 시 draft → stable |
| `figma-node` | Figma 원본 컴포넌트 노드 ID | Figma 컴포넌트 구조가 바뀔 때 |

---

## 섹션 순서

> ⚠️ 순서 고정. 변경 금지.

```
## 코드  →  ## 용도  →  ## 규칙  →  ## 스펙  →  ## 접근성 체크리스트
```

---

## 코드 섹션 형식

플래너가 복사해서 바로 사용할 수 있도록 자체 완결 형태로 작성한다.

```html
<button class="btn btn--primary-fill btn--md">라벨</button>
```

```css
/* 이 컴포넌트가 사용하는 Semantic 토큰 실제 값 */
:root {
  --color-button-primary-fill: #115ac6;
  --color-button-primary-text: #ffffff;
}

/* 컴포넌트 CSS */
.btn { display: inline-flex; align-items: center; }
.btn--primary-fill { background: var(--color-button-primary-fill); color: var(--color-button-primary-text); }
.btn--primary-fill:hover { ... }
.btn--primary-fill:focus-visible { ... }
.btn--primary-fill:active { ... }
.btn--primary-fill:disabled { ... }
```

> `:root {}` 값은 `tokens.css`에서 가져온다. 토큰 값이 바뀌면 해당 컴포넌트 파일도 동기화한다.

---

## Deprecation 정책

`status: deprecated` 선언 후 최소 1 MAJOR 버전 동안 유지한다.

| 단계 | 액션 |
|------|------|
| Deprecate | `status: deprecated` 변경, 헤더에 대체 컴포넌트 명시, CHANGELOG 기록 |
| 유지 | 신규 사용 금지. 기존 사용처는 다음 MAJOR까지 마이그레이션 |
| 제거 | 다음 MAJOR 릴리즈에서 제거. 정의서·코드 동시 삭제 |

```yaml
---
component: OldButton
status:        deprecated
deprecated-since: 1.2.0
replaced-by:   Button
remove-at:     2.0.0
---
```

> ⚠️ Deprecate 즉시 제거 금지. 사용처가 마이그레이션할 시간을 보장한다.
