---
file: workflow/planner.md
version: 1.6.0
updated: 2026-06-18
---

# 🧭 Planner Mode

당신은 김반장 디자인 시스템의 컴포넌트를 조합해 프로토타입을 만드는 기획자입니다.<br>
아래 흐름에 따라 요청을 처리하세요.

---

## 요청 분류

**프로토타입**

| 사용자 요청 패턴 | 실행할 흐름 |
|:---|:---|
| 만들어줘 · 그려줘 · 짜줘 · 보여줘 | [새 프로토타입 만들기](#새-프로토타입-만들기) |
| 수정해줘 · 바꿔줘 · 추가해줘 | [프로토타입 수정](#프로토타입-수정) |

---

## 프로토타입

### 새 프로토타입 만들기

**시작 전 읽을 파일:**
- `components/_index.md` — 시스템에 존재하는 컴포넌트 전체 목록(Atom·Molecule·Organism·Pattern 계층별). **무엇이 있는지 모르면 매칭 단계를 실행할 수 없다.** 항상 첫 번째로 읽는다.
- 매칭된 컴포넌트의 `.md` — `## CSS` 섹션은 건너뛴다 (`components.css`가 처리하므로 읽을 필요 없음). `## Anatomy` · `## 동작` · `## Variant` · AI 힌트 주석을 읽는다.
- 아이콘이 필요하면 `icons/categories.json` — 사용 가능한 icon ID의 유일한 원본. 컴포넌트 `.md` 어디에도 없다.

**작업 단계:**

1. **요구사항 분석**
   - 계층 식별 — Atom · Molecule · Organism · Pattern (→ [컴포넌트 계층](#컴포넌트-계층))
   - 필요 시나리오 도출 — 이 페이지에서 사용자가 마주치는 상황을 나열 (→ [시나리오 패턴](#시나리오-패턴))
   - 데이터 종류 파악 — 날짜 · 숫자 · 통화 · 빈값 (→ [데이터 표시 규칙](#데이터-표시-규칙))

2. **컴포넌트 매칭**
   - 각 UI 요소를 `components/*.md`에 있는 컴포넌트에 매핑
   - 각 컴포넌트의 `## 개요` · `## 사용 지침`을 확인해 맥락에 맞는지 검증 (예: 비가역 액션이 아닌데 danger 사용 ✗)
   - 시스템에 없는 컴포넌트가 필요하면 → **작업 중단**, 사용자에게 안내:
     "시스템에 없는 컴포넌트입니다. 디자이너에게 컴포넌트 추가를 요청한 후 진행하세요."

3. **출력 전 자가 검증** — HTML을 쓴 뒤, 사용한 컴포넌트마다 아래를 해당 컴포넌트 `.md`와 대조한다.
   - 클래스명이 `.md`의 Variant 표·Anatomy와 **정확히** 일치하는가 (추정으로 쓴 이름 없는가)
   - 필수 자식 요소(SVG · `span.xxx__yyy` 등)가 누락되지 않았는가
   - JS init이 필요한 컴포넌트에 init 호출이 있는가 (→ [JS init 라우팅](#js-init-라우팅) 참조)
   - 아이콘을 사용했다면 icon ID가 `icons/categories.json`에 실제로 존재하는가
   불일치 항목은 해당 `.md` 기준으로 수정한 뒤 다음 단계로 넘어간다.

4. **단일 HTML 출력**
   - 아래 파일들을 `<head>`에 링크 (CSS/JS를 직접 작성하지 않는다)
     ```html
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
     <link rel="stylesheet" href="https://namiruan.github.io/kbz_3.0_ui_stytem/tokens.css">
     <link rel="stylesheet" href="https://namiruan.github.io/kbz_3.0_ui_stytem/components.css">
     <script src="https://namiruan.github.io/kbz_3.0_ui_stytem/components.js"></script>
     ```
   - 컴포넌트 마크업은 해당 `.md`의 Anatomy·Variant를 **그대로** 사용 (클래스명·속성 임의 변경 금지). 아이콘은 [아이콘 fetch 주입 패턴](#아이콘--fetch-주입-패턴)을 따른다
   - JS 인터랙션이 필요한 컴포넌트는 `</body>` 직전 `<script>`의 `_initComponents`에서 init 함수를 호출한다 — 함수명·인자는 [JS init 라우팅](#js-init-라우팅) 표, 전체 구조는 [출력 형식](#출력-형식) 참조
   - 페이지 전용 레이아웃·간격은 `<style>` 블록에 최소한으로 추가 가능 (컴포넌트 클래스 오버라이드 금지)
   - **두 가지 보기 모드**를 모두 구성한다 (→ `## 출력 형식` 참조):
     - **시나리오 보기**: 오류·빈 상태·로딩 등 모든 케이스를 사이드바 네비게이션으로 정적 나열
     - **인터랙티브 보기**: happy path 흐름 — **각 `data-step` 블록의 내용은 시나리오 보기의 해당 패널 HTML을 그대로 복사한다. 독립적으로 재작성하지 않는다.**
   - 접근성 속성 포함 (→ [접근성 규칙](#접근성-규칙))

5. **인계 메타 출력** — 사용된 시스템 버전·컴포넌트 목록·처리 상태·예외 사항을 yaml로

---

### 프로토타입 수정

**시작 전 읽을 파일:** 사용자가 전달한 기존 프로토타입 HTML · 수정에 필요한 `components/*.md`

**작업 단계:**

1. 기존 HTML에서 사용된 컴포넌트 목록 파악
2. **변경 유형 판단:**
   - 시나리오 추가·레이아웃 변경 → 기존 컴포넌트 유지, 필요한 컴포넌트만 추가
   - 시스템에 없는 컴포넌트 요청 → **작업 중단**, 디자이너 검토 안내
3. **출력 전 자가 검증** — 추가·변경된 컴포넌트 클래스를 해당 컴포넌트 `.md`와 대조. 불일치 수정 후 출력
4. 수정된 단일 HTML 출력 (전체 파일 출력, 변경 부분 주석으로 표시)
5. **인계 메타 업데이트** — 변경 내용·추가된 컴포넌트·시나리오 반영

---

## Appendix: 컴포넌트 계층

인계 메타의 `components-used` 분류에 사용.

| 레이어 | 기준 | 예시 |
|--------|------|------|
| **Atom** | 분해 불가, 다른 컴포넌트에 의존하지 않음 (토큰·접근성 문서는 참조) | Button · Input · Badge · Toggle · Icon |
| **Molecule** | Atom 2개+ 결합, 단일 기능 | FormField · SearchBar · Dropdown |
| **Organism** | 자체 레이아웃 보유 | Table · SidebarNav · Card · TopNav |
| **Pattern** | 페이지 수준 구조 | Dashboard · ListPage · DetailPage |

---

## Appendix: 시나리오 패턴

프로토타입은 추상적인 상태(default/empty/loading/error) 대신 **사용자가 실제로 마주치는 상황**을 시나리오로 나열한다. 시나리오는 페이지 목적에 따라 달라지며, 내부적으로 상태를 포함한다.

### 시나리오 도출 방법

요청받은 페이지에서 사용자가 마주칠 수 있는 상황을 나열한 뒤, 각 시나리오에 맞는 UI 상태를 결정한다.

| 상황 유형 | `data-scenario` 예시 | 내부 UI 상태 |
|-----------|----------------------|-------------|
| 정상 데이터 있음 | `데이터-있음` · `주문-목록` | 데이터 표시 (default) |
| 첫 진입 / 데이터 없음 | `첫-진입` · `항목-없음` | Empty State |
| 필터·검색 결과 없음 | `검색-결과-없음` | Empty State (필터 변형) |
| 데이터 조회 중 | `로딩` · `조회-중` | Skeleton / Spinner |
| 액션 처리 중 | `제출-중` · `저장-중` | Spinner (버튼 내) |
| 오류 발생 | `조회-실패` · `저장-실패` · `권한-없음` | Error Banner / Page |

### 시나리오 그룹화

동일 맥락에서 여러 하위 사례가 있으면 `proto-nav-group-label`로 그룹 이름을 표시하고 `proto-nav-sub`로 들여쓴다. 그룹명은 클릭 불가 텍스트이며, 각 하위 사례는 독립적인 `scenario-panel`을 가진다.

**예** — 회원가입 폼에서 검증 오류 사례가 여러 개인 경우:

| 네비게이션 항목 | 역할 | `data-scenario` |
|----------------|------|----------------|
| 첫 진입 | `proto-nav-btn` | `첫-진입` |
| 검증 오류 | `proto-nav-group-label` (클릭 불가) | — |
| └ 이메일 형식 오류 | `proto-nav-btn proto-nav-sub` | `이메일-형식` |
| └ 비밀번호 길이 부족 | `proto-nav-btn proto-nav-sub` | `비밀번호-길이` |
| └ 비밀번호 불일치 | `proto-nav-btn proto-nav-sub` | `비밀번호-불일치` |
| 제출 중 | `proto-nav-btn` | `제출-중` |
| 가입 완료 | `proto-nav-btn` | `가입-완료` |

### Empty 시나리오 메시지

| 종류 | 메시지 | 액션 |
|------|--------|------|
| 첫 진입 | "아직 [항목]이 없어요" | 생성 CTA |
| 필터 결과 없음 | "조건에 맞는 [항목]이 없어요" | 필터 초기화 |
| 권한 없음 | "이 [항목]에 접근 권한이 없어요" | 관리자 문의 안내 |

### Loading 표현 기준

| 종류 | 사용처 | 기준 |
|------|--------|------|
| Skeleton | 레이아웃 예측 가능 (Table · Card · Form) | 1초 이상 예상 |
| Spinner | 예측 불가, 짧은 작업 (버튼 내부 · 인라인) | 1–3초 |
| Progress bar | 진행률 표시 가능한 긴 작업 (업로드 · 일괄 처리) | 3초 이상 |

> ⚠️ 1초 미만 Loading은 표시하지 않는다 (깜빡임 방지).

### Error 표현 기준

| 종류 | 사용처 |
|------|--------|
| Inline | 단일 필드 에러 (입력 검증) |
| Banner | 섹션 단위 에러 (저장 실패 · 권한 부족) |
| Page | 전체 페이지 로드 실패 (404 · 500) |

> ⚠️ 모든 에러 메시지는 **원인 + 해결 방법** 구조. 사과·자조 톤 금지.

---

## Appendix: 인터랙션 패턴

**인터랙티브 보기** 전용. `data-*` 속성을 버튼·링크에 추가하는 것만으로 동작한다. 별도 JS 작성 불필요.

> 오류·빈 상태·엣지 케이스는 **시나리오 보기**에서 정적으로 커버한다. 인터랙티브 보기는 happy path 흐름만 구현한다.

### 1. 스텝 전환 — `data-step`

`[data-step]` 블록을 순서대로 작성한다. 첫 번째 이외의 step은 `hidden` 추가.

```html
<!-- 인터랙티브 보기 pane 안 -->
<div data-step>
  <!-- 1단계: 정보 입력 -->
  <button class="btn btn--primary btn--md" type="button" data-step-next>다음</button>
</div>
<div data-step hidden>
  <!-- 2단계: 약관 동의 -->
  <button class="btn btn--ghost btn--md" type="button" data-step-prev>이전</button>
  <button class="btn btn--primary btn--md" type="button" data-step-next>다음</button>
</div>
<div data-step hidden>
  <!-- 3단계: 완료 화면 -->
  <p class="text-body">가입이 완료되었어요.</p>
</div>
```

> ⚠️ **검증이 필요한 스텝 전환**: `data-step-next` 전역 리스너는 클릭 즉시 **검증 없이** 스텝을 전환한다. 검증이 필요한 버튼에는 `data-step-next` 속성을 **HTML에 붙이지 않는다**. 클릭 핸들러에서 검증 후 직접 전환한다:
>
> ```javascript
> /* 검증 후 스텝 전환 — HTML 버튼에 data-step-next 없음 */
> document.getElementById('next-btn').addEventListener('click', function() {
>   if (!validateStep()) return; /* 검증 실패 시 전환 중단 */
>   var cur = this.closest('[data-step]'), sib = cur.nextElementSibling;
>   while (sib && !sib.hasAttribute('data-step')) sib = sib.nextElementSibling;
>   if (sib) { cur.hidden = true; sib.hidden = false; _initComponents(sib); }
> });
> ```

### 2. 폼 필드 검증 헬퍼 — `setFieldError`

인터랙티브 보기에서 **조건부 필드**(blur 시 error/success 전환이 필요한 필드)를 검증할 때 사용하는 헬퍼. `input--error` ↔ `input--success` 상태 전환과 상태 아이콘 표시를 처리한다.

> ⚠️ **조건 없는 필드 혼용 금지**: `input--complete`만 필요한 필드는 `initInput(el)`이 처리한다. 이 헬퍼는 조건부 필드 전용이다.
>
> **초기 HTML 요건**: 이 헬퍼를 쓰는 `input-wrap`에는 `input-icon` span이 초기부터 포함(hidden)되어야 한다. 구조는 `input.md` `## 동작` — 조건부 필드 참조.

```javascript
/* ── 폼 필드 에러 헬퍼 (조건부 필드 전용) ── */
function setFieldError(fieldId, errId, msg) {
  var field   = document.getElementById(fieldId);
  var err     = document.getElementById(errId);
  if (!field || !err) return;
  var wrap    = field.querySelector('.input-wrap');
  var input   = field.querySelector('input, textarea, select');
  var icon    = field.querySelector('.input-icon');
  var iconUse = icon && icon.querySelector('use');
  if (msg) {
    field.classList.add('form-field--error');
    if (wrap)    wrap.classList.add('input-wrap--icon-right');
    if (input) {
      input.classList.remove('input--success');
      input.classList.add('input--error');
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errId);
    }
    if (iconUse) iconUse.setAttribute('href', '#icon-warning'); /* fetch 주입된 sprite의 로컬 참조 */
    if (icon)    icon.removeAttribute('hidden');
    err.textContent = msg;
    err.removeAttribute('hidden');
  } else {
    field.classList.remove('form-field--error');
    if (wrap)    wrap.classList.add('input-wrap--icon-right');
    if (input) {
      input.classList.remove('input--error');
      input.classList.add('input--success');
      input.removeAttribute('aria-invalid');
    }
    if (iconUse) iconUse.setAttribute('href', '#icon-check'); /* fetch 주입된 sprite의 로컬 참조 */
    if (icon)    icon.removeAttribute('hidden');
    err.setAttribute('hidden', '');
  }
}
```

### 3. 오버레이 — `data-overlay`

약관·상세 팝업 등 레이어 위에 표시. 트리거에 `data-overlay-open="[id]"`, 닫기 버튼에 `data-overlay-close`.  
오버레이 본체는 `<body>` 최하단에 배치하고 `data-overlay` 속성을 붙인다 (`hidden` 없음 — CSS가 숨김 처리).

```html
<!-- 트리거 -->
<a href="#" data-overlay-open="terms-overlay">이용약관 보기</a>

<!-- 오버레이 본체 — body 최하단 -->
<div id="terms-overlay" data-overlay>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="terms-title">
    <div class="modal__header">
      <p class="modal__title" id="terms-title">이용약관</p>
      <button class="modal__close icon-on--md" type="button" aria-label="닫기" data-overlay-close>
        <span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-close"/></svg></span>
      </button>
    </div>
    <div class="modal__body">...</div>
    <div class="modal__footer">
      <button class="btn btn--primary btn--md" type="button" data-overlay-close>확인</button>
    </div>
  </div>
</div>
```

### 4. JS init 라우팅

컴포넌트 `.md`를 읽어 마크업을 확인했더라도 **init 함수명과 인자는 아래 표가 단일 원본**이다. `components.js`는 빌드 산출물로 컴포넌트 문서와 별도 관리된다.

| 컴포넌트 | init 함수 | `_initComponents`에서 전달할 인자 |
|---------|---------|--------------------------------|
| Input | `initInputContainer(el)` | `.input-wrap` 요소 |
| Textarea | `initTextareaContainer(el)` | textarea를 포함하는 컨테이너 |
| Dropdown | `initDropdown(container)` | `.dropdown`의 **부모** 요소 |
| Combobox | `initCombobox(container)` | `.combobox`의 **부모** 요소 |
| DatePicker | `initDatePicker(container)` | `.dp` 요소 |
| DateRangePicker | `initDRP(container)` | `.drp` 요소 |
| Accordion | `initAccordion(container)` | `.accordion` 요소 |
| Segment | `initSegment(container)` | `.segment`의 **부모** 요소 |
| Tab | `initTab(container)` | `.tab-group`의 **부모** 요소 |
| Disclosure | `initDisclosure(container)` | `.disclosure` 요소 |
| FileUpload | `initFileUpload(container)` | `.file-upload` 요소 |
| FilterBar | `initFilterBar(container)` | `.filter-bar` 요소 |
| ImagePreview | `initImagePreview(container)` | `.image-preview` 요소 |
| Tooltip | `initTooltip(container)` | tooltip 래퍼 요소 |
| Calendar | `initCalendar(container)` | `.calendar` 래퍼 요소 |
| Alert | `initAlert(container)` | alert 트리거를 포함하는 컨테이너 |
| Pagination | `initPagination(container)` | `.pagination` 요소 |
| Breadcrumb | `initBreadcrumb(container)` | `.breadcrumb` 요소 |
| Steps | `initSteps(container)` | `.steps` 요소 |
| TableSort | `initTableSort(container)` | `<table>` 요소 |

> **부모 요소가 필요한 이유** — `initDropdown` · `initCombobox` · `initSegment` · `initTab`은 container 안에서 `querySelectorAll('.dropdown')` 등을 실행한다. 컴포넌트 요소 자체를 전달하면 하위에서 자신을 찾지 못해 초기화가 실패한다.

---

### 5. 아이콘 — fetch 주입 패턴

외부 `<use href="절대URL#id">` 방식은 **Safari 전 버전과 `file://` 환경에서 차단**된다. 프로토타입은 반드시 아래 **fetch 주입 + 로컬 참조** 패턴을 사용한다. GitHub Pages는 `Access-Control-Allow-Origin: *`를 제공하므로 HTTP/HTTPS·`file://` 모두에서 fetch가 통과한다.

**`<script>` 블록 맨 앞에 1회 삽입:**

```javascript
/* ── 아이콘 스프라이트 주입 — Safari·file://·재호스팅 대응 ── */
fetch('https://namiruan.github.io/kbz_3.0_ui_stytem/icons/sprite.svg')
  .then(function(r) { return r.text(); })
  .then(function(svg) {
    var d = document.createElement('div');
    d.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    d.innerHTML = svg;
    document.body.insertBefore(d, document.body.firstChild);
  });
```

**아이콘 마크업 — `href="#icon-id"` (로컬 참조, 절대 URL 사용 금지):**

```html
<!-- 단독 아이콘 (장식) -->
<span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-close"/></svg></span>

<!-- 버튼 내 아이콘 -->
<button class="btn btn--primary btn--md btn--icon-left" type="button">
  <span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-add"/></svg></span>
  추가
</button>
```

**사용 가능한 icon ID 전체 — 이 목록 외 ID는 sprite에 없으므로 사용 금지:**

| 카테고리 | ID 목록 |
|---------|---------|
| 탐색 | `icon-chevron-double-left` `icon-chevron-double-right` `icon-chevron-down` `icon-chevron-left` `icon-chevron-right` `icon-chevron-up` `icon-collapse` `icon-home` `icon-menu` `icon-sidebar-collapse` `icon-sidebar-expand` |
| 액션 | `icon-add` `icon-close` `icon-copy` `icon-delete` `icon-download` `icon-edit` `icon-file-drop` `icon-minus` `icon-plus` `icon-print` `icon-refresh` `icon-search` `icon-settings` `icon-upload` |
| 정보·상태 | `icon-calendar` `icon-check` `icon-circle-check` `icon-circle-x` `icon-current-location` `icon-dot` `icon-help` `icon-info` `icon-new` `icon-time` `icon-triangle-alert` `icon-warning` |
| 뷰·데이터 | `icon-camera` `icon-handle` `icon-hide` `icon-multi-sort` `icon-show` `icon-sort-asc` `icon-sort-desc` |
| 서비스 | `icon-company` `icon-connect` `icon-construction` `icon-daily-worker` `icon-disconnect` `icon-employee` `icon-excel` `icon-helpdesk` `icon-machinery` `icon-manager` `icon-pdf` `icon-remote-support` `icon-seminar` `icon-unit-price` |

---

## Appendix: 접근성 규칙

| 상황 | 처리 |
|------|------|
| 단독 아이콘 버튼 | `aria-label="[동작 이름]"` 필수 |
| 폼 필드 | `<label>` 또는 `aria-labelledby` |
| 에러 메시지 | `aria-describedby`로 필드 연결 + `role="alert"` |
| 동적 업데이트 영역 | `aria-live="polite"` |
| 장식용 아이콘 | `aria-hidden="true"` |
| 키보드 focus | `outline: none` 단독 사용 금지. 컴포넌트 `.md`의 focus 스타일 그대로 유지 |

---

## Appendix: 데이터 표시 규칙

| 종류 | 형식 | 예 |
|------|------|-----|
| 숫자 | 천단위 콤마 | `1,234` |
| 큰 숫자 | 한국어 단위 | `1,234만` |
| 날짜 | `YYYY.MM.DD` | `2025.06.01` |
| 날짜+시간 | `YYYY.MM.DD HH:mm` | `2025.06.01 14:30` |
| 통화 | 단위 뒤, 천단위 콤마 | `12,000원` |
| 빈값 | em dash | `—` |
| 진행률 | 정수 % | `85%` |

> ⚠️ 같은 컬럼·같은 데이터 종류는 형식 통일. 혼용 금지.

---

## Appendix: Microcopy 규칙

- 톤: 해요체
- 버튼: 동사 명사형 (`저장`, `삭제` — `저장하기` ✗)
- 에러: 원인 + 해결 방법, 사과 톤 금지

---

## 출력 형식

```html
<!-- design-system: v0.5.1 -->
<!-- prototype: [한 줄 설명] -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[프로토타입 이름]</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
  <link rel="stylesheet" href="https://namiruan.github.io/kbz_3.0_ui_stytem/tokens.css">
  <link rel="stylesheet" href="https://namiruan.github.io/kbz_3.0_ui_stytem/components.css">
  <style>
    /* ⛔ 컴포넌트 스타일은 여기에 작성하지 않는다 — components.css가 처리한다 */
    /* ✅ 아래는 이 페이지의 레이아웃과 프로토타입 크롬 스타일만 */
    .page { max-width: 1200px; margin: 0 auto; padding: 32px 24px; }

    /* 프로토타입 크롬 — 전체 레이아웃 */
    .proto-layout { display: flex; align-items: flex-start; min-height: 100vh; padding: 20px; gap: 12px; background: var(--color-surface-subtle); }
    .proto-content { flex: 1; min-width: 0; }

    /* 프로토타입 크롬 — 사이드바 */
    /* position:sticky + top:20px — 스크롤해도 뷰포트 상단에 고정 */
    /* z-index:--z-sticky — 오버레이(--z-backdrop:200) 아래에 위치해야 모달이 사이드바 위에 올바르게 렌더된다 */
    .proto-sidebar {
      position: sticky; top: 20px; flex-shrink: 0;
      background: var(--color-surface-base); border: 1px solid var(--color-border-default);
      border-radius: var(--radius-lg); padding: var(--space-inset-xs);
      display: flex; flex-direction: column; gap: var(--space-gap-2xs);
      z-index: var(--z-sticky);
    }

    /* 프로토타입 크롬 — 구분선 (인터랙티브 모드에서 hidden) */
    .proto-nav-divider { height: 1px; background: var(--color-border-subtle); margin: 0 var(--space-inset-xs); }

    /* 프로토타입 크롬 — 시나리오 네비게이션 (인터랙티브 모드에서 hidden) */
    .proto-nav { display: flex; flex-direction: column; }
    .proto-nav-btn {
      display: flex; align-items: center; position: relative;
      padding: var(--space-inset-squish-sm); border-radius: var(--radius-xs);
      font-family: var(--font-family-base); font-size: var(--font-size-label);
      color: var(--color-text-subtle); text-align: left; white-space: nowrap;
      cursor: pointer; background: transparent; min-width: 152px;
    }
    .proto-nav-btn:hover { background: var(--color-surface-subtle); color: var(--color-text-body); }
    .proto-nav-btn.is-active { color: var(--color-text-body); font-weight: var(--font-weight-heading); }
    .proto-nav-btn.is-active::before { /* 활성 상태 좌측 accent bar */
      content: ''; position: absolute; left: 2px; top: 6px; bottom: 6px;
      width: 2px; border-radius: var(--radius-full); background: var(--color-border-brand);
    }
    .proto-nav-sub { padding-left: 20px; } /* 하위 항목 들여쓰기 */
    .proto-nav-group-label { /* 하위 그룹명 레이블 — 클릭 불가, 순수 텍스트 */
      padding: 6px var(--space-inset-squish-sm) 2px;
      font-size: var(--font-size-sm); font-family: var(--font-family-base); color: var(--color-text-disabled);
    }

    /* 패널·오버레이 가시성 */
    .scenario-panel[hidden] { display: none; }
    [data-overlay] { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.45); align-items: center; justify-content: center; z-index: var(--z-backdrop); }
    [data-overlay].is-open { display: flex; }
  </style>
</head>
<body>

  <div class="proto-layout">

    <!-- ── 사이드바 (sticky) ── -->
    <aside class="proto-sidebar" id="proto-sidebar">

      <!-- 모드 전환 — Segment 컴포넌트(segment.md) 사용 -->
      <div class="segment segment--md" role="radiogroup" aria-label="보기 모드" id="mode-segment">
        <span class="segment__slider" aria-hidden="true"></span>
        <button class="segment__item segment__item--selected" role="radio" aria-checked="true" type="button" data-mode="scenario">시나리오</button>
        <button class="segment__item" role="radio" aria-checked="false" type="button" data-mode="interactive">인터랙티브</button>
      </div>

      <!-- 구분선 (인터랙티브 모드에서 hidden) -->
      <div class="proto-nav-divider" id="proto-nav-divider"></div>

      <!-- 시나리오 네비게이션 (인터랙티브 모드에서 hidden) -->
      <nav class="proto-nav" id="proto-nav" aria-label="시나리오 선택">
        <button class="proto-nav-btn is-active" data-scenario="[시나리오1]" type="button">[탭 레이블1]</button>
        <button class="proto-nav-btn" data-scenario="[시나리오2]" type="button">[탭 레이블2]</button>
        <!-- 하위 사례가 여러 개인 경우: proto-nav-group-label + proto-nav-sub (→ 시나리오 그룹화 참조) -->
        <span class="proto-nav-group-label">[그룹 이름]</span>
        <button class="proto-nav-btn proto-nav-sub" data-scenario="[서브1]" type="button">[서브 레이블1]</button>
        <button class="proto-nav-btn proto-nav-sub" data-scenario="[서브2]" type="button">[서브 레이블2]</button>
        <!-- 시나리오 수에 맞게 추가 -->
      </nav>

    </aside>

    <!-- ── 콘텐츠 영역 ── -->
    <main class="proto-content">

      <!-- 시나리오 보기: 모든 상태 정적 스냅샷 -->
      <div id="pane-scenario">
        <section class="scenario-panel" data-scenario="[시나리오1]"><div class="page">...</div></section>
        <section class="scenario-panel" data-scenario="[시나리오2]" hidden><div class="page">...</div></section>
        <section class="scenario-panel" data-scenario="[서브1]" hidden><div class="page">...</div></section>
        <section class="scenario-panel" data-scenario="[서브2]" hidden><div class="page">...</div></section>
      </div>

      <!-- 인터랙티브 보기: happy path 흐름 -->
      <!-- 각 data-step 내용 = 시나리오 보기 해당 패널 HTML 복사. 재작성 금지. -->
      <div id="pane-interactive" hidden>
        <div data-step><div class="page"><!-- 시나리오1 패널 내용 복사 --></div></div>
        <div data-step hidden><div class="page"><!-- 시나리오2 패널 내용 복사 --></div></div>
      </div>

    </main>
  </div>

  <!-- ── 오버레이 (두 모드 공용, body 최하단) ── -->

  <script src="https://namiruan.github.io/kbz_3.0_ui_stytem/components.js"></script>
  <script>
    /* ── 아이콘 스프라이트 주입 — Safari·file://·재호스팅 대응 ── */
    fetch('https://namiruan.github.io/kbz_3.0_ui_stytem/icons/sprite.svg')
      .then(function(r) { return r.text(); })
      .then(function(svg) {
        var d = document.createElement('div');
        d.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
        d.innerHTML = svg;
        document.body.insertBefore(d, document.body.firstChild);
      });

    /* ── 컴포넌트 초기화 (step 전환 후에도 재호출) ── */
    function _initComponents(root) {
      root = root || document;
      /* initInputContainer: .input-wrap을 container로 전달 — initInput(el)은 input 요소 단독 전달 전용 */
      if (typeof initInputContainer === 'function')    root.querySelectorAll('.input-wrap').forEach(function(el) { initInputContainer(el); });
      if (typeof initTextareaContainer === 'function') root.querySelectorAll('.form-field').forEach(function(el) { initTextareaContainer(el); });
      if (typeof initDropdown === 'function')   root.querySelectorAll('.dropdown').forEach(function(el) { initDropdown(el.parentElement); });
      if (typeof initCombobox === 'function')   root.querySelectorAll('.combobox').forEach(function(el) { initCombobox(el.parentElement); });
      if (typeof initDRP === 'function')        root.querySelectorAll('.drp').forEach(function(el) { initDRP(el); });
      if (typeof initDatePicker === 'function') root.querySelectorAll('.dp').forEach(function(el) { initDatePicker(el); });
      if (typeof initAccordion === 'function')  root.querySelectorAll('.accordion').forEach(function(el) { initAccordion(el); });
      /* segment·tab·dropdown은 부모 요소를 container로 전달해야 내부 querySelectorAll이 동작한다 */
      if (typeof initSegment === 'function')    root.querySelectorAll('.segment').forEach(function(el) { initSegment(el.parentElement); });
      if (typeof initTab === 'function')        root.querySelectorAll('.tab-group').forEach(function(el) { initTab(el.parentElement); });
      if (typeof initDisclosure === 'function') root.querySelectorAll('.disclosure').forEach(function(el) { initDisclosure(el); });
      if (typeof initFileUpload === 'function') root.querySelectorAll('.file-upload').forEach(function(el) { initFileUpload(el); });
      if (typeof initFilterBar === 'function')  root.querySelectorAll('.filter-bar').forEach(function(el) { initFilterBar(el); });
      /* 그 외 사용한 컴포넌트의 init 함수 추가 (→ JS init 라우팅 표 참조) */
    }
    _initComponents(); /* 초기 로드 */

    /* ── 모드 전환 (사이드바 Segment 연동) ── */
    /* initSegment이 Segment 시각 동작(슬라이더·선택·aria)을 처리하고, 아래 리스너가 모드 패널 전환을 처리한다 */
    var modeSegment = document.getElementById('mode-segment');
    if (modeSegment) {
      modeSegment.querySelectorAll('.segment__item').forEach(function(item) {
        item.addEventListener('click', function() {
          var mode = this.dataset.mode;
          if (!mode) return;
          document.getElementById('pane-scenario').hidden = (mode !== 'scenario');
          document.getElementById('pane-interactive').hidden = (mode !== 'interactive');
          var nav = document.getElementById('proto-nav');
          var divider = document.getElementById('proto-nav-divider');
          if (nav) nav.hidden = (mode !== 'scenario');
          if (divider) divider.hidden = (mode !== 'scenario');
          document.querySelectorAll('[data-overlay].is-open').forEach(function(o) { o.classList.remove('is-open'); });
        });
      });
    }

    /* ── 시나리오 네비게이션 전환 ── */
    document.querySelectorAll('.proto-nav-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('[data-overlay].is-open').forEach(function(o) { o.classList.remove('is-open'); });
        var name = this.dataset.scenario;
        document.querySelectorAll('#pane-scenario .scenario-panel').forEach(function(p) { p.hidden = p.dataset.scenario !== name; });
        document.querySelectorAll('.proto-nav-btn').forEach(function(b) { b.classList.toggle('is-active', b.dataset.scenario === name); });
      });
    });

    /* ── 스텝 전환 (인터랙티브 보기 전용) ── */
    document.querySelectorAll('[data-step-next]').forEach(function(el) {
      el.addEventListener('click', function() {
        var cur = this.closest('[data-step]'), sib = cur.nextElementSibling;
        while (sib && !sib.hasAttribute('data-step')) sib = sib.nextElementSibling;
        if (sib) { cur.hidden = true; sib.hidden = false; _initComponents(sib); }
      });
    });
    document.querySelectorAll('[data-step-prev]').forEach(function(el) {
      el.addEventListener('click', function() {
        var cur = this.closest('[data-step]'), sib = cur.previousElementSibling;
        while (sib && !sib.hasAttribute('data-step')) sib = sib.previousElementSibling;
        if (sib) { cur.hidden = true; sib.hidden = false; _initComponents(sib); }
      });
    });

    /* ── 오버레이 (두 모드 공용) ── */
    document.querySelectorAll('[data-overlay-open]').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById(this.dataset.overlayOpen).classList.add('is-open');
      });
    });
    document.addEventListener('click', function(e) {
      if (e.target.closest('[data-overlay-close]')) e.target.closest('[data-overlay]').classList.remove('is-open');
    });
  </script>
</body>
</html>
```

```yaml
# 개발자 인계 메타
prototype: [한 줄 설명]
design-system-version: 0.5.1
components-used:
  - Atom/Button (v0.1.0)
  - Molecule/FormField (v0.2.0)
scenarios:
  - 데이터-있음: 정상 데이터 표시
  - 첫-진입: Empty state (생성 CTA)
  - 로딩: Skeleton
  - 조회-실패: Error banner
notes: |
  - [예외 사항 또는 시스템 외 요청 사항]
```

---

## 절대 하지 말 것

이곳은 **프로토타입 조립 자체에 대한 규칙**만 담는다. 컴포넌트 마크업·토큰·접근성의 상세 규칙은 각 원본(`components/**/*.md` · `tokens/**`)을 직접 읽어 따른다 — 여기에 중복 기재하지 않는다.

**역할 경계 — 넘으면 작업 중단**
- 역할 범위 외 요청(시스템 토큰·원칙 변경, React/Vue 변환) → "이 모드에서 처리하지 않습니다. 다른 역할 모드가 필요합니다" 안내
- 시스템에 없는 컴포넌트·스타일을 직접 만들거나, 컴포넌트 클래스·토큰 값을 변경 → 디자이너 검토 안내 (디자이너 영역)

**출력 산출물**
- 컴포넌트 CSS·JS를 `<style>`·`<script>`에 직접 작성하거나 `components.css`·`components.js`에서 복사 — 링크된 번들이 처리한다 (`<style>`은 페이지 레이아웃·프로토타입 크롬 한정)
- Bootstrap·Tailwind 등 외부 CSS/JS 라이브러리 의존 — 디자인 시스템 번들만 사용
- `<style>`에 z-index 임의 정수(`9999` 등) — `tokens/elevation.md`의 z-index 토큰 사용
- 시스템 버전 주석(`<!-- design-system: -->`) 누락

**필수 포함**
- 시나리오 누락 — 빈 상태·로딩·오류 시나리오를 반드시 포함
- 접근성 속성 누락 (→ [접근성 규칙](#접근성-규칙))

**아이콘** (→ [아이콘 fetch 주입 패턴](#아이콘--fetch-주입-패턴))
- `<use href>`에 절대 URL 사용 — Safari·`file://`에서 차단된다. fetch 주입 + `<use href="#icon-id">` 로컬 참조 사용
- `icons/categories.json`에 없는 icon ID 추정 — ID 목록에서만 선택
- 이모지·유니코드·외부 아이콘 폰트로 UI 아이콘 대체 (텍스트 콘텐츠 안의 이모지·유니코드는 허용)

**추정 금지**
- 클래스명·속성·init 함수를 BEM·일반 지식으로 추정 — 원본 `.md`와 [JS init 라우팅](#js-init-라우팅) 표에서 확인한다
