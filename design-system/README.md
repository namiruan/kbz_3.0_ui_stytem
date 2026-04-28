---
file: README.md
version: 0.5.0
updated: 2026-04-27
---

# 김반장 Design System

김반장 3.0 프로토타입의 디자인 기준. 기획자가 LLM으로 프로토타입을 뽑고, 개발자가 결과를 실제 프레임워크로 변환하는 협업의 single source of truth.

## 3-Actor 협업 모델

actor 카드를 클릭하면 해당 워크플로우 페이지로 이동합니다. <br>
actor 워크플로우는 팀 Claude Project에 GitHub 연동으로 자동 등록되며, 각 역할의 LLM 지시문으로 사용됩니다.

<div class="actor-flow">

  <a class="actor-card-link" href="#workflow--designer">
    <div class="actor-card">
      <div class="actor-card-corner">→</div>
      <div class="actor-emoji">🎨</div>
      <div class="actor-role">Designer</div>
      <div class="actor-label">OWNER</div>
      <div class="actor-action">시스템·HTML/CSS<br>직접 관리</div>
      <div class="actor-output">
        <div class="output-item">tokens.css</div>
        <div class="output-item">component.html / css</div>
      </div>
    </div>
  </a>

  <div class="flow-arrow">
    <div class="arrow-label-top">GitHub<br>자동 동기화</div>
    <div class="arrow-line"></div>
  </div>

  <a class="actor-card-link" href="#workflow--planner">
    <div class="actor-card">
      <div class="actor-card-corner">→</div>
      <div class="actor-emoji">🧭</div>
      <div class="actor-role">Planner</div>
      <div class="actor-label">CONSUMER</div>
      <div class="actor-action">팀 프로젝트 접속 →<br>프로토타입 도출</div>
      <div class="actor-output">
        <div class="output-item">Prototype HTML/CSS</div>
      </div>
    </div>
  </a>

  <div class="flow-arrow flow-arrow--dim">
    <div class="arrow-label-top">프로토타입<br>인계</div>
    <div class="arrow-line"></div>
  </div>

  <div class="actor-card actor-card--disabled">
    <div class="actor-card-corner">—</div>
    <div class="actor-emoji">💻</div>
    <div class="actor-role">Developer</div>
    <div class="actor-label">TRANSLATOR</div>
    <div class="actor-action">실제 프레임워크<br>변환</div>
    <div class="actor-output">
      <div class="output-item">React · Vue</div>
      <div class="output-item">Flutter · SwiftUI</div>
    </div>
    <div class="actor-card-note">개발팀 자체 진행 영역 — 이 시스템에는 포함 안 됨</div>
  </div>

</div>

## 시스템 버전 변경 시

| Actor | MAJOR | MINOR | PATCH |
|-------|-------|-------|-------|
| 🎨 디자이너 | 즉시 (본인이 변경) | 즉시 | 즉시 |
| 🧭 기획자 | 변경 내용 공유 받음. 기존 프로토타입 코드 점검 필요. 컨텍스트는 자동 갱신. | 자동 갱신 | 자동 갱신 |

> 💡 시스템 버전은 우상단 pill에 항상 표시. 프로토타입 인계 시 메타에도 명시.

## 파일 구조

```
design-system/
├── README.md            ← 지금 이 파일
├── workflow/
│   ├── designer.md      ← 🎨 디자이너 모드 LLM 지시문
│   └── planner.md       ← 🧭 기획자 모드 LLM 지시문
├── governance.md        ← 시스템 관리·버전·deprecation
├── tokens/
│   ├── _index.md        ← 토큰 아키텍처 (3-tier)
│   ├── space.md  · radius.md  · color.md
│   ├── typography.md  · elevation.md
│   └── motion.md  · icon.md
├── adaptation.md        ← 반응형 + 다크모드
├── product.md           ← B2B 제약 + 상태 패턴 + 데이터 포맷팅 + Microcopy
├── accessibility.md     ← 접근성 (WCAG 2.1 AA)
└── architecture.md      ← Variant 모델 + 컴포넌트 계층
```

## 토큰 실제 값
실제 CSS 토큰 값은 `tokens.css` 파일을 참조한다. 이 문서는 **사용 원칙**을 정의하고, `tokens.css`는 **실제 값**을 정의한다.
