---
file: workflow/planner.md
version: 2.10.1
updated: 2026-08-12
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
- `components/_index.md` — 컴포넌트 계층표. **매칭은 `✅ 구현됨` 열에서만 한다.** `⬜ 계획` 열은 이름만 정해져 있고 문서·CSS가 없어 쓸 수 없다 — 표에 이름이 있다고 사용 가능한 것이 아니다. **무엇이 있는지 모르면 매칭 단계를 실행할 수 없다.** 항상 첫 번째로 읽는다.
- 매칭된 컴포넌트의 `.md` — `## CSS` 섹션은 건너뛴다 (`components.css`가 처리하므로 읽을 필요 없음). `## Anatomy` · `## 동작` · `## Variant` · AI 힌트 주석을 읽는다.
- 아이콘이 필요하면 `icons/categories.json` — 사용 가능한 icon ID의 유일한 원본. 컴포넌트 `.md` 어디에도 없다.

**충실도(Fidelity) — 기본은 로우파이**

별도 언급이 없으면 **로우파이**로 만든다. 로우파이는 화면 구성과 **시나리오(조건별 화면 차이)를 확정**하는 단계다 — 여기서 구조가 탄탄해야 하이파이가 그 위에 바르게 얹힌다. 그래서 로우파이의 무게중심은 시나리오 도출에 있다(→ [시나리오 도출 방법](#시나리오-도출-방법)의 **조건 분기 스캔**).

| | 로우파이 (기본) | 하이파이 (명시 요청 시) |
|:---|:---|:---|
| 산출 | **Phase 1**(마크업 + 시나리오)에서 종료 | Phase 1 → 2 → 3 |
| `data-step` 속성 | 패널에 **그대로 부여**(하이파이 승격 대비) | 사용 |
| 필터·정렬·검증 | 컨트롤은 열리되 실제로 걸러지지 않음 | JS로 실제 동작 |

- 사용자가 **"하이파이"·"인터랙션까지"·"실제로 동작하게"** 를 명시할 때만 Phase 2·3을 진행한다. 그 외에는 Phase 1에서 종료한다.
- 로우파이 완료 시: `로우파이(Phase 1) 완료 — 인터랙션·JS가 필요하면 "하이파이로"라고 하세요`로 안내하고 멈춘다.
- 로우파이라도 패널에는 `data-scenario`와 `data-step`을 **함께 부여**한다(마크업 한 벌). 패널 구조를 하이파이와 동일하게 유지해 그대로 승격한다 — 로우파이와 하이파이의 차이는 **JS가 붙었는가**뿐이고, 셸은 같다.

**작업 단계:**

1. **요구사항 분석**
   - 계층 식별 — Atom · Molecule · Organism · Pattern (→ [컴포넌트 계층](#컴포넌트-계층))
   - 필요 시나리오 도출 — 이 페이지에서 사용자가 마주치는 상황을 나열한다. **데이터있음·빈 상태·로딩·오류는 필수**이며, 각 상황은 **독립 scenario-panel + nav 버튼**이 된다 — 하나의 시나리오로 합치지 않는다. **프롬프트가 시나리오를 적게 요청하거나 언급하지 않아도 이 필수 상태는 기본 포함한다.** 사용자가 명시적으로 제외를 요청한 경우(예: "데이터 있음만")에만 생략하고, 그때도 "빈·로딩·오류 시나리오는 생략했습니다"라고 알린다.
     - **로우파이의 무게중심이 여기 있다.** 필수 4상태에 그치지 말고 **[조건 분기 스캔](#시나리오-도출-방법)** 을 돌려 "값 유무·상태값·권한·수량·부분실패"에 따라 화면이 갈리는 경우를 빠짐없이 시나리오로 만든다. 이 단계가 부실하면 하이파이가 잘못된 구조 위에 얹힌다. (→ [시나리오 패턴](#시나리오-패턴))
   - 데이터 종류 파악 — 날짜 · 숫자 · 통화 · 빈값 (→ [데이터 표시 규칙](#데이터-표시-규칙))

2. **컴포넌트 매칭**
   - 각 UI 요소를 `components/*.md`에 있는 컴포넌트에 매핑
   - 각 컴포넌트의 `## 개요` · `## 사용 지침`을 확인해 맥락에 맞는지 검증 (예: 비가역 액션이 아닌데 danger 사용 ✗)
   - **조회·검색·필터 컨트롤은 FilterBar로 통일** → 개별 Dropdown을 나열하지 않는다. 필터가 여러 개든, **검색 하나만이든(필터 없는 단독 검색 포함)** FilterBar의 바 프레임 + `input--ghost`를 쓴다. 단독 검색을 일반 테두리 `input`으로 따로 만들지 않는다(시각 불일치).
     - **폼 안의 단독 조회·룩업 필드도 FilterBar 바로 구성한다** — 주소 검색·우편번호 찾기처럼 필드 값을 채우는 조회도 목록 검색과 같은 바 프레임(`filter-bar__search`: `input--ghost` + 우측 **돋보기 검색 아이콘 버튼** `icon-on--md`)으로 만든다. 일반 테두리 `input` + `주소 검색` 텍스트 버튼으로 만들지 않는다. (검색 제출은 돋보기 아이콘만 — 텍스트 버튼 없음. 상세 → `filter-bar.md`)
   - **다이얼로그 — 입력 없이 메시지+확인/취소만이면 Alert, 작업 공간이 필요하면 Modal**: 삭제·비가역 확인·경고는 `Alert`(molecule, 삭제는 `alert--danger`+`btn--danger`). 폼·테이블·다중 입력·다중 섹션·긴 콘텐츠는 `Modal`(organism). 같은 페이지에서 생성·수정을 Modal로 쓰더라도 **삭제 확인까지 Modal로 묶지 말 것** — 삭제 확인은 Alert다.
   - 시스템에 없는 컴포넌트가 필요하면(`⬜ 계획` 열 포함) → **작업 중단**, 사용자에게 안내:
     "시스템에 없는 컴포넌트입니다. 디자이너에게 컴포넌트 추가를 요청한 후 진행하세요."
     - 비슷한 컴포넌트로 대체하거나 임의 클래스(`kc-*` 등)를 만들어 채우지 않는다. 대체는 용도가 다른 컴포넌트를 끌어다 쓰게 만들어 화면 성격을 흐린다(예: 게시판을 데이터 테이블로).
     - 이미 접수된 요청인지 `components/_requests.md`를 확인하고, 없으면 요청을 남긴다.

3. **HTML 생성 — 3단계로 순서대로 진행**

   > **응답 분리 규칙 (중요)** — 세 Phase를 **한 응답에 몰아 출력하지 않는다.** 전체 HTML을 여러 번 토해내면 한 응답이 최대 출력 길이를 넘겨 "응답을 완료하지 못했습니다"로 중간에 끊긴다(특히 시나리오·mock 행이 많을 때). **각 Phase는 독립된 응답으로 출력하고, Phase 끝에서 멈춰 사용자 확인을 기다린다.** 사용자가 "다음"·"진행"·"Phase N" 등으로 이어가라고 하면 다음 Phase를 시작한다. 한 응답에는 Phase 하나만 담는다. (단계·산출물 자체는 그대로 — 출력을 응답 단위로 나눌 뿐이다.)

   **Phase 1 — 마크업**  
   각 컴포넌트 `.md`의 Anatomy·Variant·AI 힌트 기준으로 HTML 구조·클래스·aria·필수 자식 요소를 생성한다.  
   아래 파일들을 `<head>`에 링크:
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
   <link rel="stylesheet" href="https://namiruan.github.io/kbz_3.0_ui_stytem/tokens.css">
   <link rel="stylesheet" href="https://namiruan.github.io/kbz_3.0_ui_stytem/components.css">
   <script src="https://namiruan.github.io/kbz_3.0_ui_stytem/components.js"></script>
   ```
   `_initComponents` 스캐폴드·아이콘 fetch 주입 포함. **커스텀 JS 작성 금지** — `data-step-next`, `data-overlay-open` 같은 선언적 속성만 붙인다.  
   시나리오 패널을 **단일 DOM**으로 구성 (→ [출력 형식](#출력-형식)) — **각 `<section class="scenario-panel">`에 `data-scenario`(점프)와 `data-step`(순차)을 함께 부여한다. 패널 마크업은 한 벌만 — 인터랙티브용 복사본을 따로 만들지 않는다(출력 길이 2배 방지). blur 이벤트·JS는 Phase 3에서 이 패널에 직접 추가한다.**  
   접근성 속성 포함 (→ [접근성 규칙](#접근성-규칙)).

   생성 후 각 컴포넌트 `.md`와 대조:
   - 클래스명이 `.md` Variant 표·Anatomy와 **정확히** 일치하는가 (추정 클래스 없는가)
   - 필수 자식 요소(SVG · `span.xxx__yyy` 등) 누락 없는가
   - `_initComponents`에 사용한 컴포넌트의 init 호출이 있는가 (→ [JS init 라우팅](#js-init-라우팅) 참조)
   - 아이콘 ID가 `icons/categories.json`에 존재하는가
   - 버튼이 2개 이상이면 **배치 순서**가 `button.md ## 사용 지침`과 일치하는가 (중요도 높을수록 오른쪽 · danger solid는 왼쪽 끝)
   - **시나리오 커버리지 (로우파이는 여기가 완성본이라 특히 중요)** — 필수 4상태(데이터있음·빈·로딩·오류)에 더해 [조건 분기 스캔](#시나리오-도출-방법)의 축(값유무·상태값·권한·수량·부분실패)에서 화면이 갈리는 경우가 **빠짐없이 별도 `scenario-panel` + `proto-nav` 버튼**으로 있는가. 누락이 있으면 패널을 추가한 뒤 응답을 끝낸다

   불일치 항목은 해당 `.md` 기준으로 수정한다. **Phase 2·3에서 마크업 수정 금지.**
   **→ 여기서 응답을 끝낸다.** Phase 1 마크업까지만 출력하고 멈춘다. 같은 응답에 Phase 2를 이어 쓰지 않는다.
   - **로우파이(기본)면 여기가 완성본이다.** `로우파이(Phase 1) 완료 — 인터랙션·JS가 필요하면 "하이파이로"라고 하세요`로 안내하고, 요청이 없으면 Phase 2로 진행하지 않는다.
   - **하이파이가 명시된 경우에만** `Phase 1(마크업) 완료 — 인터랙션 명세를 진행하려면 "다음"이라고 입력하세요`로 안내하고 대기한다.

   **Phase 2 — 인터랙션 명세**  
   Phase 1 HTML을 보고 커스텀 JS가 필요한 인터랙션을 **번호 목록**으로 나열한다.  
   각 항목: `트리거 → 조건 → 결과` 형식.

   > **mock 데이터 기반 필터·정렬도 구현 대상이다.** 실시간 API 연동은 구현하지 않지만, 드롭다운 선택·컬럼 정렬에 따른 행 표시/숨김은 HTML에 미리 작성된 mock 행을 기준으로 Phase 3에서 JS로 구현한다.

   예시:
   1. 이메일 input `blur` → 형식 검증 → 실패: `setFieldError(…, '올바른 이메일 형식이 아닙니다')` / 성공: `setFieldError(…, '')`
   2. 다음 버튼 `click` → 1번 검증 통과 시에만 → `data-step` 전환 (직접 핸들러 — 이 버튼에 `data-step-next` 없음)
   3. 상태 드롭다운 `change` → 선택값 기준으로 테이블 행 필터링 → 해당하지 않는 `<tr>`에 `hidden` 토글

   **완전성 체크 — Phase 3 진입 전 필수**: 페이지에서 데이터(테이블 행·목록·카드)를 필터링하거나 정렬하는 컨트롤 **전체**가 Phase 2 목록에 있는지 확인한다. FilterBar가 있으면 내부 컨트롤 각각(드롭다운 하나하나 · DateRangePicker · 텍스트 검색 · 초기화 버튼)에 독립 항목이 하나씩 필요하다. 누락 항목이 있으면 추가한 뒤 Phase 3으로 넘어간다.

   **Phase 3에서 이 목록 외 인터랙션 추가 금지.**
   **→ 여기서 응답을 끝낸다.** 인터랙션 명세 목록까지만 출력하고, `Phase 2(인터랙션 명세) 완료 — JS 구현을 진행하려면 "다음"이라고 입력하세요`로 안내한 뒤 멈춘다. 같은 응답에 Phase 3을 이어 쓰지 않는다.

   **Phase 3 — JS 구현**  
   Phase 2 번호 목록을 `</body>` 직전 `<script>` 블록에 **항목 번호 주석**과 함께 구현한다.  
   `setFieldError`·`data-step` 패턴은 [인터랙션 패턴](#인터랙션-패턴) 참조.  
   완료 후 아래 항목을 자체 점검한다. 발견 시 즉시 수정 후 재출력. **점검 과정·결과는 출력하지 않는다.**
   - 필수 CDN·sprite 링크 누락 없음 (`tokens.css` · `components.css` · `components.js` · `icons/sprite.svg fetch`)
   - `<use href="…#icon-id">` — `icons/categories.json`에 존재하는 ID만 사용
   - inline style·`<style>` 블록에 hex·rgba() 하드코딩 없음
   - `var(--…)` 참조가 디자인 시스템 토큰(`--color-`, `--space-`, `--height-` 등)에 실제 존재하는 것만 사용
   - **JS 문자열로 생성하는 마크업의 클래스도 정적 HTML과 동일** — 버튼 아이콘은 `span.icon.icon--{size}`(추정 클래스 `btn__icon` 등 금지). 같은 상태의 정적 마크업이 있으면 재사용한다
   - **시나리오 커버리지** — 데이터있음·빈 상태·로딩·오류가 각각 `scenario-panel` + `proto-nav` 버튼으로 존재하는가(하나의 시나리오로 합치지 않았는가). 더해 **[조건 분기 스캔](#시나리오-도출-방법)의 축(값유무·상태값·권한·수량·부분실패)에서 화면이 갈리는 경우가 빠짐없이 별도 패널로** 있는가
   - **패널 간 일관성** — 같은 페이지가 여러 시나리오에 나오면 셸(필터바·정렬·툴바·pagination)이 모든 패널에서 동일하고, 빈/로딩/오류 tbody는 단일 출처에서 나오는가(→ 조회 페이지 상태 원칙). 0건이면 pagination 숨김
   - `submit` 버튼에 `data-step-next` 없음
   - **`@flow` 메타** — 각 화면에 `title`·`scenarios`·`exits`를 임베드했는가(화면 색인 소스). 여러 화면으로 연동되는 프로토타입에 필수
   - **`exits`와 실제 링크가 일치하는가** — 파일 안의 `href="*.html"` 목적지가 전부 `exits`에 있는가. 하나라도 빠지면 그 화면이 색인에서 "들어오는 화면 없음"으로 그려진다. `flow-hub.html`·`index.html`은 예외(모든 화면이 링크할 수 있다). `validate-prototype.py`가 기계로 잡는다

   > 로컬 환경에서 `python3 validate-prototype.py [파일명.html]`로 동일 항목을 기계 검증할 수 있다.
   > `exits` 대조도 포함된다 — 링크는 있는데 `exits`에 없으면 **오류**, `exits`에 적혔는데 폴더에 파일이 없으면 **경고**다.

4. **인계 메타 출력** — 사용된 시스템 버전·컴포넌트 목록·처리 상태·예외 사항을 yaml로
   - 컴포넌트 버전은 각 `.md` frontmatter의 `version:` 필드를 읽어 기재한다. 파일을 열어 확인하기 전에 `v?`로 기재하지 않는다

5. **저장·업로드 안내 (전용 repo)** — 채팅으로 만든 HTML은 사용자가 프로토타입 repo(`kbz-prototypes`)에 올린다. Planner는 결과물과 함께 **어디에·어떤 이름으로 저장하고 어떻게 빌드하는지**를 안내한다:
   - **저장 위치**: `kbz-prototypes/<기능>/<화면>.html`. 기능별 폴더로 묶는다.
   - **파일명 규칙 (규범)** — `<대상>-<화면유형>.html`, kebab-case, **번호를 붙이지 않는다.**
     예: `board-list.html` · `board-detail.html` · `workplace-manage.html` · `report-acquire.html`
     번호는 화면이 추가·통합될 때마다 어긋난다(3번이 다른 파일에 합쳐지면 3이 비고 그 뒤가 전부 밀린다).
     순서는 파일명이 아니라 **색인이 표현한다.** 이름은 그 파일이 무엇인지만 말한다.
   - **`@flow` 메타 임베드**: 각 화면 `<body>` 상단에 `title`·`scenarios`·`exits`를 넣는다 — 화면 색인 생성 소스다(→ [화면 색인](#화면-색인--indexhtml)).
   - **공용 오버레이**: `@include`로 넣었으면 `<화면>.src.html`로 저장 후 `python3 build-prototype.py`로 서빙용 `.html` 생성. include가 없으면 바로 `.html`.
   - **여러 화면**: `python3 build-flow-hub.py <기능> --title "기능명"`로 색인(`index.html`) 생성 후 함께 커밋·push.
   - **시스템 한계 보고**: 작업 중 시스템에 없어서 우회한 것을 색인의 「확인 필요 사항」에 적는다(→ [시스템 한계 보고](#시스템-한계-보고)). 채팅에만 남기면 다음 세션이 같은 것을 다시 발견한다.
   - **중간본·대안본은 삭제한 뒤 커밋한다.** 작업 중 만든 실험본(`*-contentlist.html` 같은)이 폴더에 남으면, 그 뒤로 본편만 고쳐지는 동안 낡은 파일이 같은 폴더에서 최신본 행세를 한다. 어느 것이 최신인지 판단할 방법이 없어진다.
   - 전체 절차·구조 → [프로토타입 저장·관리 (전용 repo)](#appendix-프로토타입-저장관리-전용-repo).

---

### 프로토타입 수정

**시작 전 읽을 파일:** 사용자가 전달한 기존 프로토타입 HTML · 수정에 필요한 `components/*.md`

**작업 단계:**

1. 기존 HTML에서 사용된 컴포넌트 목록 파악
2. **변경 유형 판단:**
   - 시나리오 추가·레이아웃 변경 → 기존 컴포넌트 유지, 필요한 컴포넌트만 추가
   - 시스템에 없는 컴포넌트 요청(`⬜ 계획` 열 포함) → **작업 중단**, 디자이너 검토 안내 (→ `components/_requests.md`)
3. **출력 전 자가 검증** — 추가·변경된 컴포넌트 클래스를 해당 컴포넌트 `.md`와 대조. 불일치 수정 후 출력
4. 수정된 단일 HTML 출력 (전체 파일 출력, 변경 부분 주석으로 표시)
5. **인계 메타 업데이트** — 변경 내용·추가된 컴포넌트·시나리오 반영

---

## Appendix: 컴포넌트 계층

→ `components/_index.md ## 컴포넌트 계층` 참조 (인계 메타 `components-used` 분류 기준).

---

## Appendix: 시나리오 패턴

프로토타입은 추상적인 상태(default/empty/loading/error) 대신 **사용자가 실제로 마주치는 상황**을 시나리오로 나열한다. 시나리오는 페이지 목적에 따라 달라지며, 내부적으로 상태를 포함한다.

### 프로토타입 크롬의 컨트롤

사이드바 맨 위에 모여 있다 — **접기 · 화면 목록 · 화면 폭.** 전부 크롬이지 화면의 일부가 아니다. 동작은 `components.js`의 `initProtoChrome(document)`이 맡으므로 프로토타입이 따로 구현하지 않는다.

`화면 목록`(인덱스로 돌아가기)은 **`.proto-back` 하나만 쓴다 — `btn` 클래스를 붙이지 않는다.** 크롬에서 가장 낮은 계층이라 32px 높이의 버튼으로 서면 바로 아래 시나리오 목록과 무게가 같아진다. 탈출구지 목적지가 아니다.

### 사이드바 접기

시나리오 네비게이션은 152px + 여백을 쓴다. 좁은 폭에서는 그만큼 실제 화면의 자리를 뺏어 "이 화면이 진짜 어떻게 보이는가"를 판단할 수 없다. 토글을 누르면 그 버튼만 남는 **레일**로 접힌다.

**900px 미만이면 자동으로 접힌다** — 사이드바와 화면이 다투기 시작하는 지점이다. 사람이 한 번 접거나 펴면 그 선택을 `sessionStorage`에 기억해 자동 판정보다 우선한다. 완전히 숨기지 않는 이유는 여는 버튼이 화면 위에 떠서 확인하려는 화면을 가리기 때문이다.

접힌 레일에는 **토글과 폭 컨트롤만 남는다**(시나리오 목록·모드 전환은 숨는다). 폭 컨트롤을 남기는 이유 — 접기의 목적이 "좁은 폭에서 실제 화면 보기"인데 접으면서 폭 전환까지 사라지면 재려던 도구를 제 손으로 치우는 셈이다. 시나리오를 바꾸려면 한 번 펴야 한다.

### 화면 폭 미리보기 — `자유 · 비교 · lg · md · sm`

브라우저 크기를 건드리지 않고 데스크톱부터 모바일까지 본다.

| 버튼 | 무엇 |
|:---|:---|
| `자유` | 지금까지의 동작 — 브라우저 폭을 그대로 쓴다 |
| `비교` | **lg · md · sm을 같은 배율로 한 화면에 나란히.** 셋을 동시에 본다 |
| `lg` `md` `sm` | 1280 · 768 · 390을 1:1로. 틀 **모서리를 끌면 그 사이의 임의 폭**으로 바뀐다 |

**비교의 배율은 하나다.** 셋을 각자 화면에 맞춰 키우면 나란히 놓은 뜻이 사라진다 — 모바일이 데스크톱보다 좁다는 사실 자체가 그림에서 없어진다. `transform: scale`은 iframe의 레이아웃 뷰포트를 건드리지 않으므로, 줄여 놓아도 안쪽은 여전히 1280·768·390으로 계산되고 미디어쿼리도 그 값으로 걸린다. 보이는 크기만 작아진다.

**끌어서 조절**은 세 점 사이를 메운다. 레이아웃이 무너지는 폭은 대개 프리셋 사이에 있어서(예: 카드가 2열로 접히는 지점), 세 폭만으로는 어디서 무너지는지 알 수 없다. 끌어서 이름 있는 폭을 벗어나면 **어느 버튼도 켜지지 않고** 아래에 실제 px이 표시된다 — 1042px을 보면서 `lg`가 눌려 있으면 그 표시가 거짓말이 된다.

> ⚠️ **왜 iframe인가 — 폭만 줄이면 안 된다.** 미디어쿼리는 컨테이너가 아니라 **뷰포트**를 본다. `.proto-content`의 폭만 390px로 줄이면 `@media (max-width: 767px)` 규칙이 **걸리지 않아서**, 데스크톱 레이아웃을 좁은 상자에 욱여넣은 그림이 나온다 — 확인하려던 것과 정반대이고, 그걸 보고 판단하면 틀린 결론에 이른다. iframe은 제 뷰포트를 가지므로 그 안에서 미디어쿼리가 실제로 발동한다.

틀 안의 문서는 `?proto-frame=1`로 열리고, 그때는 크롬을 벗어 실제 화면만 남는다. 시나리오는 `?scenario=`로 함께 넘어가며, 바깥에서 시나리오를 바꾸면 틀 안도 따라간다.

**자리가 모자라면 사이드바가 자동으로 접힌다** — 251px을 쥔 채로는 `lg`(1280)가 창에 들어가지 않아, 버튼은 1280을 말하면서 화면은 1095를 보여주게 된다. 재는 도구가 거짓을 말하면 안 재느니만 못하다. 접고도 모자라면 가로로 스크롤한다(폭을 창에 맞춰 줄이지 않는다). 반대로 자동으로 펴지지는 않는다 — 사람이 편 선택은 남아야 한다.

**`md`가 768인 이유** — 시스템의 분기점이 `768px`이라 그 값이 데스크톱 쪽의 **첫 화면**이다. 767 이하를 보려면 `sm`을 쓰거나 모서리를 끌어 내린다.

### 보기 모드(시나리오↔인터랙티브)는 없앴다

전에는 사이드바에 Segment가 있어 **시나리오 보기**(nav로 점프)와 **인터랙티브 보기**(첫 패널부터 `data-step` 순차)를 갈랐다. 실제로 만들어 보니 **가르는 값어치가 없었다.**

- `data-step-next`·오버레이·컴포넌트 init은 처음부터 모드를 보지 않았다. 시나리오 보기에서도 버튼은 눌렸고 화면은 넘어갔다 — **두 모드가 실은 하나였다.**
- 유일한 실제 차이는 "nav를 숨기고 1단계부터 시작"이었는데, 그건 보기 방식이지 다른 프로토타입이 아니다.
- 도리어 버그가 있었다. 시나리오 보기에서 스텝으로 넘어가면 nav의 활성 표시가 따라오지 않아, 화면은 3단계인데 목록은 1단계가 켜져 있었다. **지도가 거짓말을 했다.**

지금은 하나다. **어느 시나리오를 보고 있든 그 화면의 인터랙션이 전부 살아 있고**, 스텝으로 넘어가면 nav의 현재 위치가 따라간다(`syncNav`). nav는 점프 컨트롤이자 "지금 여기" 표시가 됐다.

깨끗한 화면으로 훑고 싶을 때는 **사이드바를 접거나**(레일만 남는다) **폭 미리보기를 켠다**(틀 안은 크롬이 아예 없다). 인터랙티브 보기가 하던 일을 이 둘이 이미, 더 낫게 한다. 로우파이·하이파이가 같은 셸을 쓰게 된 것은 덤이다 — 차이는 **JS가 붙었는가**뿐이다.

## 시나리오 도출 방법

요청받은 페이지에서 사용자가 마주칠 수 있는 상황을 나열한 뒤, 각 시나리오에 맞는 UI 상태를 결정한다.

**도출 절차 — 로우파이의 핵심.** 로우파이의 값어치는 "조건에 따라 화면이 어떻게 갈리는지"를 빠짐없이 드러내는 데 있다. 아래를 순서대로 훑어 시나리오를 뽑는다 — **프롬프트가 언급하지 않아도 기본 수행**하고, 놓친 축이 없는지 확인한다.

1. **필수 상태 4종** — 데이터있음 · 빈(첫 진입) · 로딩 · 오류. 항상 포함한다.
2. **조건 분기 스캔** — 화면에 나오는 각 데이터·필드·상태값·권한에 대해 **"이게 있을 때 vs 없을 때 / A일 때 vs B일 때 화면이 달라지는가?"** 를 묻는다. 달라지면 **각 분기를 독립 `scenario-panel`로** 만든다. 놓치기 쉬운 축:

   | 축 | 물어볼 것 | 예 |
   |:---|:---|:---|
   | 값 유무 | 이 값이 없으면 화면이 다른가 | 첨부 있음/없음 · 메모 있음/없음 · 미선택 |
   | 상태값 | status에 따라 뱃지·액션·안내가 다른가 | 진행중 · 완료 · 반려 · 만료별 화면 |
   | 권한·역할 | 볼 수/할 수 있는 게 다른가 | 편집가능/읽기전용 · 관리자/일반 |
   | 수량·경계 | 개수에 따라 다른가 | 0건 · 1건 · 다건 · 페이지네이션 임계 |
   | 부분 실패·경고 | 일부만 문제인 상태가 있는가 | 일부 항목 오류 · 마감 임박 경고 |

3. **액션 결과 분기** — 저장·삭제·제출 등 액션마다 성공/실패/확인(Alert)이 화면을 바꾸면 각각 시나리오로. (로우파이는 결과 화면을 스냅샷으로 두고, 전환은 하이파이 JS에서)
4. **그룹화** — 한 축에 하위 사례가 여럿이면 `proto-nav-group-label`로 묶는다(→ [시나리오 그룹화](#시나리오-그룹화)).

> **판별 한 줄**: "이 조건에서 사용자가 보는 화면이 다른가?" — 그렇다면 별도 `scenario-panel`이다. 절대 하나로 합치지 않는다.

아래 표는 위 절차로 뽑은 상황을 UI 상태에 매핑하는 참조다.

| 상황 유형 | `data-scenario` 예시 | 내부 UI 상태 |
|-----------|----------------------|-------------|
| 정상 데이터 있음 | `데이터-있음` · `주문-목록` | 데이터 표시 (default) |
| 첫 진입 / 데이터 없음 | `첫-진입` · `항목-없음` | 조회 페이지 → 필터+테이블 유지, tbody에 `empty-state--compact` / 등록 페이지 → 페이지 레벨 `empty-state` |
| 필터·검색 결과 없음 | `검색-결과-없음` | 필터+테이블 유지, tbody에 `empty-state--compact` (필터 초기화 액션 포함) |
| 데이터 조회 중 | `로딩` · `조회-중` | Skeleton / Spinner |
| 액션 처리 중 | `제출-중` · `저장-중` | Spinner (버튼 내) |
| 오류 발생 | `조회-실패` · `저장-실패` | 조회 페이지 → 필터+테이블 유지, tbody에 `empty-state--compact` (오류 메시지) |
| 권한 없음 · 전체 오류 | `권한-없음` · `서버-오류` | 페이지 레벨 `empty-state` (default), 필터·테이블 생략 |

> **조회 페이지 레이아웃 원칙** — 페이지 목적이 조회·검색·필터링이면 필터와 테이블 구조를 항상 표시한다. 데이터 없음·오류는 테이블 `<tbody>` 안에 `empty-state--compact`로 처리한다. 사용자가 어떤 컨트롤을 쓸 수 있는지 즉시 파악하고 재조회 경로를 찾을 수 있다. 페이지 레벨 empty state는 권한 없음·전체 오류처럼 조회 자체가 불가능한 경우에만 사용한다.

> **조회 페이지 상태 — 시나리오는 나열하되, 셸·빈상태는 단일 출처** — 사용자가 마주치는 상황(`첫진입`·`데이터있음`·`검색결과없음`·`로딩`·`오류`·`삭제확인` 등)은 **각각 독립 `scenario-panel`(data-scenario)로 나열**하고 nav 버튼으로 점프하게 한다(→ [시나리오 패턴](#시나리오-패턴), 빈·로딩·오류 **필수 포함**). 단, 같은 페이지가 여러 시나리오에 등장하므로 패널 사이에서 마크업이 갈라지지 않게(divergence 방지) 아래를 지킨다:
> ① **셸(필터바·정렬 헤더·툴바·pagination)은 모든 패널에서 동일**해야 한다 — 패널마다 셸을 손으로 다르게 짜지 말고 같은 마크업을 그대로 쓴다(필터바·정렬·pagination 불일치 금지).
> ② **빈·로딩·오류 tbody는 단일 렌더 출처**(JS 함수 1개 또는 `<template>` 1개)에서 만들어, 정적 스냅샷과 실시간 결과가 같은 마크업을 쓴다 — 「필터 초기화」 등 내부 액션 포함.
> ③ 결과 **0건이면 pagination을 숨긴다**.
> ※ 이 규칙은 **시나리오 수를 줄이라는 뜻이 아니다.** 상황별 시나리오는 그대로 다 나열하고(nav 버튼 여러 개), 다만 패널 간 셸·빈상태 마크업이 어긋나지 않게 단일 출처로 맞추라는 뜻이다.

> **데이터 테이블 툴바 표준 액션** — 조회·목록 데이터 테이블의 툴바 우측(`table__toolbar-actions`)에는 **엑셀 다운로드**(`icon-excel`) → **테이블 설정**(`icon-settings`) 아이콘을 이 순서로 **고정** 배치한다. 둘 다 `button.icon-on--lg`이고 `aria-label`은 각각 `"엑셀 다운로드"`·`"테이블 설정"`. 누락하지 말 것 — 데이터 테이블의 표준 액션이다. **각 아이콘은 hover·focus 시 기능명 tooltip을 띄운다** — `span.tooltip-wrapper`로 감싸고 `tooltip-panel--left`로 연결한다(`table-container`가 `overflow:hidden`이라 위/아래 툴팁은 잘리므로 좌측 배치). 상세는 `table/data.md` 참조.

> **행 내 아이콘 액션** — 행마다 두는 수정·삭제·보기 등 **아이콘 단독 액션은 플레인 `icon-on--sm`**으로 `table__cell--action`에 둔다. **ActionGroup(테두리 박스)으로 묶지 않는다** — 행마다 박스가 반복돼 시각적으로 무겁다. ActionGroup의 행 패턴은 `승인`·`반려` 같은 **묶음 텍스트 퀵 액션** 전용이다. (→ `table/data.md`)

### 시나리오 그룹화

동일 맥락에서 여러 하위 사례가 있으면 `proto-nav-group-label`로 그룹 이름을 표시하고 `proto-nav-sub`로 들여쓴다. 그룹명은 클릭 불가 텍스트이며, 각 하위 사례는 독립적인 `scenario-panel`을 가진다.

**예** — 하위 사례가 여러 개인 그룹의 구조 (내용은 페이지에 맞게 결정):

| 네비게이션 항목 | 역할 | `data-scenario` |
|----------------|------|----------------|
| [시작 상태] | `proto-nav-btn` | `시작` |
| [그룹명] | `proto-nav-group-label` (클릭 불가) | — |
| └ [하위 사례 A] | `proto-nav-btn proto-nav-sub` | `사례-A` |
| └ [하위 사례 B] | `proto-nav-btn proto-nav-sub` | `사례-B` |
| └ [하위 사례 C] | `proto-nav-btn proto-nav-sub` | `사례-C` |
| [처리 중] | `proto-nav-btn` | `처리-중` |
| [완료] | `proto-nav-btn` | `완료` |

### Empty · Loading · Error 표현 기준

→ `product.md` 참조 (Empty State 메시지·Loading 기준·Error Inline/Banner/Page 선택 기준 모두 포함).

---

## Appendix: 화면 분할 기준

하나의 화면 흐름을 **어떤 단위로 나눌지** 결정하는 기준. 스코핑(Phase 0) 단계에서 판단한다.

| 상황 | 형태 | 근거 |
|------|------|------|
| 같은 데이터의 다른 상태 (첫진입·빈·로딩·오류·데이터있음) | **`scenario-panel`** (같은 파일, nav 점프) | 같은 화면의 상태 변주 — 마크업 divergence 방지 위해 단일 DOM 유지 |
| 현재 작업을 유지한 채 보조 작업 (약관 확인, 항목 선택, 검증 Alert) | **오버레이** (`data-overlay`, 같은 파일) | 컨텍스트를 잃지 않아야 함. 겹쳐 열려야 하면 오버레이 스택 사용(→ [오버레이](#3-오버레이--data-overlay-스택-지원)) |
| 독립 메뉴·URL·직접 진입 지점을 갖는 화면 | **별도 파일** | 북마크·딥링크·사이드바 메뉴 대상. 다른 흐름에서도 진입 |
| 같은 화면 타입이 **대상에 따라 구성만** 달라지는 경우 (자료실형 상세 · 문의형 상세) | **한 파일** + `proto-nav-group-label`로 계열 그룹화 | 판별 질문: **"URL 패턴이 같은가?"** — `?docId=` 하나로 열리는 화면이면 같은 화면이다. 나누면 비밀글·로딩·오류 마크업이 계열 수만큼 복제된다 |
| 12개 area 이상 규모의 화면 | **별도 파일** | 한 파일이 최대 출력 길이를 넘겨 응답이 잘림 — 파일로 분리 |

**판단 순서**: 상태 변주면 panel → 컨텍스트 유지 보조작업이면 overlay → **같은 URL 패턴의 계열 변주면 한 파일** → 독립 진입·대규모면 파일. 애매하면 가장 가벼운 쪽(panel)부터 고른다.

> ⚠️ "독립 URL을 갖는다"만 보고 나누면 계열 변주까지 갈라진다. 두 화면이 **같은 쿼리 키 하나로 열린다면**(`?docId=`) 그것은 같은 화면이고, 갈리는 것은 구성뿐이다. 나눈 순간 비밀글·로딩·오류 패널이 계열 수만큼 복제되고, 이 문서가 경계하는 마크업 divergence가 분할 기준 때문에 생긴다.

> 별도 파일로 나뉜 화면끼리 데이터를 넘겨야 하면 URL 쿼리로 최소 정보만 전달하고 복귀 시 위치를 복원한다(→ [파일 간 컨텍스트 전달](#파일-간-컨텍스트-전달--url-쿼리)). 여러 파일이 같은 오버레이(예: 공용 선택 Modal)를 쓰면 복제하지 말고 파셜로 한 벌만 두고 빌드 시 주입한다(→ [공용 오버레이 — 파셜로 한 벌만](#공용-오버레이--파셜로-한-벌만-여러-화면-공유-시)).

### 파일 간 컨텍스트 전달 — URL 쿼리

화면이 별도 파일로 갈리면 서로의 상태를 모른다(어느 행을 눌렀는지, 어디서 왔는지). **URL 쿼리로 최소 정보만** 넘기고, 돌아올 때 위치를 복원한다. 스캐폴드가 선언적 속성으로 처리하므로 커스텀 JS는 쓰지 않는다.

- **넘기기** — 다른 화면으로 가는 링크에 컨텍스트를 쿼리로 싣는다. 목적지 파일 + 최소 키(id 등) + 돌아올 곳(`return`)만.
  ```html
  <!-- 목록 6-1 → 상세 6-2. 어느 근로자인지 + 돌아올 화면 전달 -->
  <a href="6-2-detail.html?worker=1024&return=6-1-list.html">상세 보기</a>
  ```
- **받기** — 목적지에서 스캐폴드가 쿼리를 파싱해 `window._ctx`(객체)로 노출한다. 이 값으로 어떤 mock 시나리오를 보일지 고른다(예: `_ctx.worker`로 해당 근로자 mock 선택). `_ctx`는 프로토타입에서 읽기만 한다.
- **돌아가기** — 뒤로/닫기 링크는 `_ctx.return`으로 이동한다. 선언적으로는 `data-return` 속성을 붙이면 스캐폴드가 `?return` 값으로 이동시킨다.
  ```html
  <button class="btn btn--secondary btn--solid" data-return>목록으로</button>
  ```
- **위치 복원** — 스캐폴드가 파일 경로별로 스크롤 위치를 `sessionStorage`에 저장하고, 그 파일로 돌아오면 복원한다. 필터·정렬 등 화면 고유 상태는 프로토타입이 `_ctx`/저장값을 읽어 재적용한다(복원 대상은 화면마다 다르므로 선언적 범위 밖 — mock 수준에서 처리).

> 프로토타입 목적은 흐름 확인이다. 서버·DB가 없으므로 컨텍스트는 "이 화면이 무엇을 보여줄지 고르는 최소 키"만 넘긴다. 실제 데이터 전달·영속화는 개발 단계(handoff 이후)의 몫이다.

### 화면 색인 — `index.html`

여러 파일로 나뉜 화면들을 한 곳에서 탐색하는 진입 페이지. **폴더의 `index.html`이다** — Pages에서 `.../<기능>/`만 쳐도 열린다. 각 프로토타입이 임베드한 `@flow` 메타를 스캔해 자동 생성하고, **사람이 쓰는 두 절은 재생성해도 보존된다.**

1. **모든 프로토타입에 `@flow` 주석을 임베드한다** (`<body>` 상단 권장). 생성기가 읽는 기계용 선언이다.
   ```html
   <!-- @flow
   title: 취득 대상자 목록
   scenarios: 데이터있음, 빈 상태, 로딩, 오류
   exits: 6-2-detail.html?worker, 6-3-report.html
   -->
   ```
   - `title`: 표의 화면 이름(없으면 파일명).
   - `scenarios`: 그 화면에 담긴 시나리오(쉼표 구분). 색인의 「담기는 시나리오」 칸이 된다 — 없으면 `—`.
   - `exits`: 이 화면에서 이동하는 목적지 파일(쉼표 구분). 쿼리·라벨은 무시하고 파일명만 읽는다 — [파일 간 컨텍스트 전달](#파일-간-컨텍스트-전달--url-쿼리)의 링크 목적지와 일치시킨다(`validate-prototype.py`가 대조한다).
   - **들어오는 화면(entry)은 적지 않는다** — 다른 화면들의 `exits`를 역참조해 색인이 자동 계산한다.
   - `@flow`의 `exits`는 인계 메타(#6)의 `exits-to`와 같은 정보다. 임베드본(`@flow`)이 색인의 소스, 인계 YAML은 사람이 읽는 문서 — 둘을 일치시킨다.
2. **색인을 (재)생성한다** — 프로토타입이 있는 폴더를 대상으로:
   ```
   python3 build-flow-hub.py <prototype-dir> --title "4대보험 신고"
   →  <dir>/index.html
   ```
   나오는 것은 **표**다: `화면 · 파일 · 담기는 시나리오 · ← 들어오는 화면 · → 나가는 화면 · 열기`.
   들어오는 화면이 없는 항목이 있으면 표 아래에 경고가 붙는다 — 시작 화면이 아니라면 어딘가의 `exits`가 빠진 것이다.
   `@flow`가 없는 파일, `index.html`, `flow-hub.html`(구 이름), `_shared/**`, `*.src.html`은 스캔에서 제외된다.
3. **손으로 쓰는 두 절을 채운다.** 표 아래에 빈 채로 생성되며, `@keep` 마커 사이의 내용은 **재생성해도 그대로 옮겨진다.**
   ```html
   <!-- @keep:principles -->  … 구성 원칙 …      <!-- /@keep -->
   <!-- @keep:todo -->        … 확인 필요 사항 … <!-- /@keep -->
   ```
   - **구성 원칙** — 이 프로토타입이 무엇을 확인하려는 것인지, 화면을 왜 이렇게 나눴는지.
   - **확인 필요 사항** — [시스템 한계 보고](#시스템-한계-보고)를 적는 자리다(아래).
   > ⚠️ 마커 **밖**을 손으로 고치면 다음 재생성에서 지워진다. 표는 `@flow`가 소스다 — 표를 손으로 고치지 말고 `@flow`를 고친다.

> 색인은 흐름 확인·인계용 진입점이다. 관계의 단일 소스는 각 프로토타입의 `@flow`이므로, 화면이 늘어도 관계도를 손으로 그리거나 동기화할 필요가 없다. 반대로 판단·미결 사항은 기계가 알 수 없으므로 사람이 쓰고, 그 부분만 보존된다.

### 시스템 한계 보고

작업 중 **시스템에 없어서 우회한 것**을 만나면 색인의 **「확인 필요 사항」에 적는다.** 채팅으로만 보고하면 대화가 끝나는 순간 사라지고, 다음 세션의 Planner가 같은 한계를 처음부터 다시 발견한다.

- 적을 것 — 없어서 우회한 컴포넌트·슬롯, 판단이 필요한 미결 사항, 확인하지 못한 값.
- 적는 형태 — 한 줄씩. "무엇이 없다 + 그래서 무엇을 했다"까지. 예: *"비밀글 표시 슬롯이 ContentList에 없다 — 거터 칸을 신규·고정이 이미 써서 제목 앞 자물쇠로 우회했다."*
- 이 목록이 쌓이면 `components/_requests.md`에 낼 **디자이너 요청서의 초안**이 된다.

> 개발 핸드오프용 메타를 늘리자는 뜻이 아니다. 한계 보고는 **아무도 모르는 채로 남으면 안 되는 정보**라 산출물에 남긴다.

---

## Appendix: 프로토타입 저장·관리 (전용 repo)

프로토타입은 **산출물**이라 계속 늘어난다. 디자인 시스템 repo(`kbz_3.0_ui_stytem`)에 섞지 말고 **전용 repo(`kbz-prototypes`)에 커밋·관리**한다. 로컬에 파일을 쌓아 두지 않는다.

- 프로토타입은 디자인 시스템을 **GitHub Pages 절대 URL**(`https://namiruan.github.io/kbz_3.0_ui_stytem/tokens.css` 등)로 참조하므로, 디자인 시스템 repo의 로컬 파일에 의존하지 않는다 → 전용 repo에서 독립적으로 열리고 빌드된다.
- 전용 repo도 **GitHub Pages를 켜면** `https://namiruan.github.io/kbz-prototypes/<경로>`로 URL 미리보기가 된다. 로컬 파일 관리 불필요.

**repo 구조**
```
kbz-prototypes/
  build-prototype.py        # 공용 파셜 주입(@include)
  build-flow-hub.py         # @flow 스캔 → index.html (화면 색인)
  <기능>/                    # 예: insurance-report/
    _shared/                # 공용 오버레이 파셜 (@include 대상)
    6-1-list.src.html       # 소스(마커 포함)
    6-1-list.html           # 빌드 산출물(서빙용)
    ...
    index.html              # 화면 색인(생성물 + 손으로 쓰는 두 절)
```

**워크플로우**
1. `<기능>/` 폴더에 `.src.html`로 화면 작성(공용 오버레이는 `<!-- @include: _shared/x.html -->`, 각 화면에 `@flow` 메타 임베드).
2. `python3 build-prototype.py <기능>/*.src.html` → 서빙용 `.html` 생성.
3. `python3 build-flow-hub.py <기능> --title "기능명"` → `index.html` 생성. 「구성 원칙」·「확인 필요 사항」을 `@keep` 마커 사이에 채운다.
4. 전용 repo에 커밋·push → Pages가 URL로 서빙.

> 빌드 스크립트(`build-prototype.py`·`build-flow-hub.py`)는 이 디자인 시스템 repo가 원본이며, 전용 repo에도 같은 파일을 두어 프로토타입 repo만으로 빌드가 완결되게 한다(스크립트 갱신 시 두 곳 동기화).

---

## Appendix: 인터랙션 패턴

`data-*` 속성을 버튼·링크에 추가하는 것만으로 동작한다. 별도 JS 작성 불필요.

> **보기 모드는 없다 — 인터랙션은 시나리오 위에서 그대로 돈다.** 패널마다 `data-scenario`(점프)와 `data-step`(순차)을 함께 부여하고, 복사본을 만들지 않는다. 어느 시나리오를 보고 있든 그 화면의 버튼은 동작하고, 스텝으로 넘어가면 사이드바의 현재 위치도 따라간다.

### 1. 스텝 전환 — `data-step`

`#pane-panels` 안에 각 패널을 순서대로 작성한다. 패널은 `<section class="scenario-panel" data-scenario="…" data-step>`이며 첫 패널 외에는 `hidden`을 추가한다. `data-step`이 순차 전환(next/prev) 단위가 된다.

```html
<!-- #pane-panels 안 — 각 패널 = 한 상태/스텝. data-scenario(점프) + data-step(순차) 공유. 첫 패널 외 hidden. -->
<section class="scenario-panel" data-scenario="입력" data-step>
  <div class="page">
    <!-- 1단계: 정보 입력 -->
    <button class="btn btn--primary btn--md" type="button" data-step-next>다음</button>
  </div>
</section>
<section class="scenario-panel" data-scenario="약관" data-step hidden>
  <div class="page">
    <!-- 2단계: 약관 동의 -->
    <button class="btn btn--ghost btn--md" type="button" data-step-prev>이전</button>
    <button class="btn btn--primary btn--md" type="button" data-step-next>다음</button>
  </div>
</section>
<section class="scenario-panel" data-scenario="완료" data-step hidden>
  <div class="page">
    <!-- 3단계: 완료 화면 -->
    <p class="text-body">가입이 완료되었어요.</p>
  </div>
</section>
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

**조건부 필드**(blur 시 error/success 전환이 필요한 필드)를 검증할 때 쓰는 헬퍼. `input--error` ↔ `input--success` 상태 전환과 상태 아이콘 표시를 처리한다.

> ⚠️ **조건 없는 필드 혼용 금지**: `input--complete`만 필요한 필드는 `initInput(el)`이 처리한다. 이 헬퍼는 조건부 필드 전용이다.
>
> **초기 HTML 요건**: 이 헬퍼를 쓰는 `form-field`는 ① 요소에 `id` 필수, ② `.input-wrap` 안에 `input-icon` span 포함(hidden), ③ `.form-field__footer > p.form-field__error[id][role="alert"][hidden]` 포함. 구조는 `input.md ## 동작` — 조건부 필드 참조.

**필수 HTML 구조 (조건부 필드 1개 예시):**

```html
<div class="form-field" id="field-email">
  <label class="form-field__label text-form-label" for="f-email">이메일</label>
  <div class="input-wrap">
    <input class="input" type="email" id="f-email" aria-required="true">
    <button class="input-clear icon-on--badge" type="button" aria-label="지우기" hidden><svg aria-hidden="true"><use href="#icon-close"/></svg></button>
    <span class="input-icon icon icon--badge" aria-hidden="true" hidden><svg aria-hidden="true"><use href="#icon-warning"/></svg></span>
  </div>
  <div class="form-field__footer">
    <p class="text-form-footer form-field__error" id="err-email" role="alert" hidden></p>
  </div>
</div>
```

**blur 이벤트 연결 패턴:**

```javascript
var fEmail = document.getElementById('f-email');
if (fEmail) fEmail.addEventListener('blur', function() {
  if (!this.value.trim()) return; /* 빈 값은 blur에서 에러 표시 안 함 */
  setFieldError('field-email', 'err-email',
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value) ? '' : '이메일 형식을 확인해 주세요');
});
```

**제출 버튼 패턴 (검증 → 로딩 → 스텝 전환):**

```javascript
/* 제출 버튼에는 data-step-next를 붙이지 않는다 — 아래 핸들러가 직접 전환 */
document.getElementById('submit-btn').addEventListener('click', function() {
  var btn = this, ok = true;
  /* 각 필드 검증 — 실패 시 ok = false */
  if (!ok) return;
  setButtonLoading(btn, '처리 중...');
  var step = btn.closest('[data-step]');
  setTimeout(function() {
    clearButtonLoading(btn);
    var sib = step.nextElementSibling;
    while (sib && !sib.hasAttribute('data-step')) sib = sib.nextElementSibling;
    if (sib) { step.hidden = true; sib.hidden = false; _initComponents(sib); }
  }, 1500); /* 프로토타입 연출용 딜레이 */
});
```

> → 함수 정의는 출력 형식 `<script>` 스캐폴드에 포함됨. Claude는 이 함수를 재정의하지 않는다.

### 3. 오버레이 — `data-overlay` (스택 지원)

약관·상세 팝업 등 레이어 위에 표시. 트리거에 `data-overlay-open="[id]"`, 닫기 버튼에 `data-overlay-close`.  
오버레이 본체는 `<body>` 최하단에 배치하고 `data-overlay` 속성을 붙인다 (`hidden` 없음 — CSS가 숨김 처리).

**여러 오버레이를 겹쳐 열 수 있다.** 스캐폴드가 열린 순서로 스택을 관리한다 — 나중에 연 오버레이가 항상 위에 오고(z-index 자동 증가), Escape·backdrop 클릭·닫기 버튼은 **최상위 하나만** 닫으며, 닫히면 직전 포커스로 복귀하고 Tab은 최상위 오버레이 안에 갇힌다. 따라서 **Modal을 유지한 채 그 위에 검증 Alert를 띄우는** 구성이 가능하다(예전엔 Modal을 닫고 Alert를 열어야 했다).

- `data-overlay-open`/`data-overlay-close`만 선언하면 스택·z-index·포커스는 스캐폴드가 처리한다. **직접 z-index나 포커스 JS를 작성하지 않는다.**
- 파괴적 확인 Alert 등 backdrop·Escape로 닫히면 안 되는 오버레이는 본체에 `data-overlay-static`을 붙인다 (닫기는 명시적 `data-overlay-close` 버튼으로만).

```html
<!-- 트리거 -->
<a href="#" data-overlay-open="terms-overlay">이용약관 보기</a>

<!-- 오버레이 본체 — body 최하단 -->
<div id="terms-overlay" data-overlay>
  <!-- 안쪽 컴포넌트 마크업은 해당 컴포넌트 .md의 ## Anatomy를 직접 읽어 사용한다 -->
  <!-- data-overlay-close 속성을 닫기 버튼(modal header 아이콘 버튼)과 footer 확인 버튼에 추가한다 -->
</div>

<!-- Modal 위에 겹쳐 여는 검증 Alert — 트리거는 Modal 안에 둔다 -->
<div id="save-error-alert" data-overlay data-overlay-static>
  <!-- alert.md ## Anatomy 마크업. 닫기는 data-overlay-close 버튼으로만 -->
</div>
```

#### 공용 오버레이 — 파셜로 한 벌만 (여러 화면 공유 시)

같은 오버레이(예: 사업장 선택 Modal)를 여러 프로토타입이 쓰면 **복사하지 않는다.** 파셜 한 벌로 두고 빌드 시 주입한다 — 수정은 파셜만 고치고 재빌드하면 모든 화면에 반영된다.

1. 공용 오버레이 본체를 프로토타입 옆 `_shared/` 폴더에 파셜로 저장한다 (예: `_shared/site-select.html`). 파셜은 `<div id="…" data-overlay>…</div>` 조각만 담는다(전체 HTML 문서 아님).
2. 프로토타입은 **소스 파일(`<name>.src.html`)** 로 작성하고, `<body>` 최하단에서 마커로 include 한다:
   ```html
   <!-- @include: _shared/site-select.html -->
   ```
3. 빌드해서 서빙용 파일을 생성한다:
   ```
   python3 build-prototype.py 6-1-acquire.src.html   →   6-1-acquire.html
   ```
   `@include` 마커가 파셜 내용으로 치환된 `6-1-acquire.html`이 실제로 서버에서 열리는 파일이다.

- include 경로는 **그 파일이 있는 디렉터리 기준 상대**다. 파셜 안에서 같은 `_shared/`의 다른 파셜을 부를 땐 형제 이름(`confirm-row.html`)으로 참조한다.
- 트리거(`data-overlay-open="site-select"`)는 각 화면 안에 두되, id는 파셜의 id와 맞춘다. 여러 진입점이 같은 파셜을 include하면 트리거만 여러 곳, 본체는 한 벌이다.
- 단일 화면 전용 오버레이는 파셜로 뺄 필요 없이 그냥 그 파일 안에 둔다. 공유가 생길 때만 `_shared/`로 승격한다.

### 4. JS init 라우팅

컴포넌트 `.md`를 읽어 마크업을 확인했더라도 **init 함수명과 인자는 아래 표가 단일 원본**이다. `components.js`는 빌드 산출물로 컴포넌트 문서와 별도 관리된다.

| 컴포넌트 | init 함수 | `_initComponents`에서 전달할 인자 |
|---------|---------|--------------------------------|
| Input (단순) | `initInput(el)` | `input` 요소 직접 — `complete` 상태만 필요한 bare input. `_initComponents`가 자동 처리 |
| Input (아이콘·clearable) | `initInputContainer(el)` | `div.input-wrap` 요소 — 에러·성공 아이콘, clearable 버튼이 필요하면 `input-wrap + input-icon` 구조 필수 |
| Textarea | `initTextareaContainer(el)` | textarea를 포함하는 컨테이너 |
| Dropdown | `initDropdown(container)` | `.dropdown`의 **부모** 요소 |
| Combobox | `initCombobox(container)` | `.combobox`를 포함하는 컨테이너. 단일/복수 자동 분기 — 검색·필터·선택·태그·키보드·외부클릭. 선택 동작을 직접 구현하지 말고 위임 |
| DatePicker | `initDatePicker(container)` | `.dp` 요소 |
| DateRangePicker | `initDRP(container)` | `.drp` 요소 |
| Accordion | `initAccordion(container)` | `.accordion` 요소 |
| Segment | `initSegment(container)` | `.segment`의 **부모** 요소 |
| Tab | `initTab(container)` | `.tab-group`의 **부모** 요소 |
| Disclosure | `initDisclosure(container)` | `.disclosure` 요소 |
| FileUpload | `initFileUpload(container)` | `.file-upload`를 포함하는 컨테이너. 추가·드래그&드롭·카드·다운로드·삭제·용량. 용량은 `data-max-mb`, 라이트박스는 `data-image-preview="<id>"`로 설정. `initImagePreview`와 함께 호출. 직접 구현하지 말고 위임 |
| FilterBar | `initFilterBar(container)` | `.filter-bar` 요소 |
| ImagePreview | `initImagePreview(container)` | `.image-preview`를 포함하는 컨테이너. 각 프리뷰에 `.open(src,name,{trigger,onDelete})`·`.close()` 부여 + `[data-image-preview="<id>"]` 선언적 트리거. 직접 구현하지 말고 위임 |
| Tooltip | JS 불필요 — 인라인 `onmouseenter`/`onfocus` 핸들러로 동작 | — |
| Calendar | `initCalendar(container)` | `.calendar` 래퍼 요소 |
| Alert | JS 없음 — 정적 마크업. `data-overlay`로 감싸면 오버레이 스택으로 Modal 위에 겹쳐 열 수 있다. 파괴적 확인은 `data-overlay-static` + `data-overlay-close`(버튼) 사용 | — |
| Pagination | `initPagination(container)` | `.pagination` 요소 |
| Stepper | `initStepper(container)` | `.stepper`를 포함하는 컨테이너 — 내부에서 `querySelectorAll('.stepper')` 실행. 범위·증감은 `.stepper`의 `data-min`·`data-max`·`data-step`으로 지정. 경계값 버튼 비활성·clamp·↑↓ 키를 이 함수에 위임 |
| Breadcrumb | `initBreadcrumb(container)` | `.breadcrumb` 요소 |
| Steps | `initSteps(container)` | `.steps` 요소 |
| TableSort | `initTableSort(container)` | `<table>`을 감싸는 **컨테이너** 요소 (`<table>` 직접 전달 불가 — 내부에서 `querySelectorAll('table')` 실행) |
| TableSelect | `initTableSelect(container)` | `<table>`을 감싸는 **컨테이너** 요소. 체크박스 행 선택 — 행 `table__row--selected`·`aria-selected` 토글, 전체선택, 부분선택 indeterminate. 선택 동작을 직접 구현하지 말고 이 함수에 위임 |

> **부모 요소가 필요한 이유** — `initDropdown` · `initSegment` · `initTab`은 container 안에서 `querySelectorAll('.dropdown')` 등을 실행한다. 컴포넌트 요소 자체를 전달하면 하위에서 자신을 찾지 못해 초기화가 실패한다.

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

**아이콘 마크업 — `href="#icon-{id}"` (로컬 참조, 절대 URL 사용 금지):**

```html
<!-- 단독 아이콘 (장식) -->
<span class="icon icon--md" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-close"/></svg></span>
```

> 아이콘이 포함된 버튼·컴포넌트의 전체 클래스 구조는 해당 컴포넌트 `.md`의 `## Anatomy`·`## Variant`를 직접 읽어 결정한다. `<use href="#icon-{id}">` 로컬 참조 패턴만 유지한다.

---

### 6. 버튼 로딩 상태 — `btn--loading`

`btn--loading` 클래스만 추가하면 **색만 연해진 것처럼 보이는 오류**가 발생한다 — CSS는 opacity를 낮출 뿐, 스피너 요소를 생성하지 않는다. **반드시 innerHTML도 교체해야 한다.**

스피너 마크업(클래스·구조)은 `button.md ## 동작 — loading`을 직접 읽어 사용한다. 아래는 상태 저장·복원의 프레임워크 패턴만 보여준다.

> → 함수 정의는 출력 형식 `<script>` 스캐폴드에 포함됨. Claude는 이 함수를 재정의하지 않는다.

---

**사용 가능한 icon ID 전체 — 이 목록 외 ID는 sprite에 없으므로 사용 금지:**

<!-- ICON-TABLE:START (icons/categories.json에서 build.py가 자동 생성 — 이 영역을 직접 수정하지 말 것) -->

| 카테고리 | ID 목록 |
|---------|---------|
| 탐색 | `icon-chevron-double-left` `icon-chevron-double-right` `icon-chevron-down` `icon-chevron-left` `icon-chevron-right` `icon-chevron-up` `icon-collapse` `icon-home` `icon-menu` `icon-sidebar-collapse` `icon-sidebar-expand` |
| 액션 | `icon-add` `icon-close` `icon-copy` `icon-delete` `icon-download` `icon-edit` `icon-file-drop` `icon-minus` `icon-plus` `icon-print` `icon-refresh` `icon-search` `icon-settings` `icon-upload` |
| 정보·상태 | `icon-calendar` `icon-check` `icon-circle-check` `icon-circle-x` `icon-current-location` `icon-dot` `icon-help` `icon-info` `icon-lock` `icon-new` `icon-pin` `icon-time` `icon-triangle-alert` `icon-unlock` `icon-warning` |
| 뷰·데이터 | `icon-camera` `icon-handle` `icon-hide` `icon-multi-sort` `icon-show` `icon-sort-asc` `icon-sort-desc` |
| 서비스 | `icon-company` `icon-connect` `icon-construction` `icon-daily-worker` `icon-disconnect` `icon-employee` `icon-excel` `icon-helpdesk` `icon-machinery` `icon-manager` `icon-pdf` `icon-remote-support` `icon-seminar` `icon-unit-price` |

<!-- ICON-TABLE:END -->

---

## Appendix: 접근성 규칙

→ `accessibility.md` 참조.

---

## Appendix: 데이터 표시 규칙 · Microcopy

→ `product.md ## 데이터 포맷팅` · `product.md ## Microcopy & Voice` 참조.

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
    /* ⛔ 컴포넌트·프로토타입 크롬 스타일은 여기에 작성하지 않는다 — 링크된 components.css가 처리한다 */
    /*    .page · .proto-* · .scenario-panel · [data-overlay] 전부 components.css에 번들되어 있다 */
    /*    → 디자인 시스템(크롬 포함)이 갱신되면 이 프로토타입에도 자동 반영된다 */
    /* ✅ 이 페이지에만 필요한 고유 레이아웃이 있을 때만 여기에 작성한다 (없으면 비워 둔다) */
  </style>
</head>
<body>

  <div class="proto-layout">

    <!-- ── 사이드바 (sticky) ── -->
    <aside class="proto-sidebar" id="proto-sidebar">

      <!-- 접기 — 좁은 폭에서 네비게이션이 실제 화면의 자리를 먹는다. 900px 미만이면 자동으로 접힌다 -->
      <button class="proto-nav-toggle" type="button" aria-expanded="true" aria-label="시나리오 목록 접기">
        <svg aria-hidden="true"><use href="icons/sprite.svg#icon-sidebar-collapse"/></svg>
      </button>

      <!-- 인덱스로 돌아가기 — 크롬에서 가장 낮은 계층. btn 클래스를 붙이지 않는다 -->
      <a class="proto-back" href="index.html">
        <svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg>
        화면 목록
      </a>

      <!-- 뷰포트 미리보기 — 각 폭을 iframe으로 연다(미디어쿼리가 실제로 걸린다).
           비교 = lg·md·sm을 같은 배율로 한 화면에. 단일 폭은 틀 모서리를 끌어 임의 폭으로 -->
      <div class="proto-viewport" role="group" aria-label="화면 폭">
        <button class="proto-viewport__btn is-active" type="button" data-viewport="free" aria-pressed="true">자유</button>
        <button class="proto-viewport__btn" type="button" data-viewport="compare" aria-pressed="false">비교</button>
        <button class="proto-viewport__btn" type="button" data-viewport="lg" aria-pressed="false">lg</button>
        <button class="proto-viewport__btn" type="button" data-viewport="md" aria-pressed="false">md</button>
        <button class="proto-viewport__btn" type="button" data-viewport="sm" aria-pressed="false">sm</button>
      </div>

      <div class="proto-nav-divider" id="proto-nav-divider"></div>

      <!-- 시나리오 네비게이션 — 점프 + 현재 위치 표시. 스텝으로 넘어가도 여기가 따라간다 -->
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

      <!-- ── 시나리오 패널 (단일 DOM) ── -->
      <!-- 각 패널에 data-scenario(점프)와 data-step(순차)을 함께 부여한다. 마크업은 한 벌만. -->
      <!-- nav 버튼은 data-scenario로 점프하고, data-step-next/prev는 순차 이동한다 — 둘은 항상 함께 살아 있다. blur 검증·상태 전환은 Phase 3에서 이 패널에 직접 추가한다. -->
      <div id="pane-panels">
        <section class="scenario-panel" data-scenario="[시나리오1]" data-step><div class="page">...</div></section>
        <section class="scenario-panel" data-scenario="[시나리오2]" data-step hidden><div class="page">...</div></section>
        <section class="scenario-panel" data-scenario="[서브1]" data-step hidden><div class="page">...</div></section>
        <section class="scenario-panel" data-scenario="[서브2]" data-step hidden><div class="page">...</div></section>
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
      /* input-wrap이 있는 구조: clearable·suffix·아이콘(에러/성공) 포함 — initInputContainer 사용 */
      if (typeof initInputContainer === 'function')    root.querySelectorAll('.input-wrap').forEach(function(el) { initInputContainer(el); });
      /* input-wrap 없는 bare input: complete 상태만 필요한 단순 필드 — initInput 직접 호출. 이 줄 누락 시 bare input은 blur해도 input--complete 미적용 — 생략 금지 */
      if (typeof initInput === 'function') root.querySelectorAll('.input').forEach(function(el) { if (!el.closest('.input-wrap') && !el.dataset.initInput) { el.dataset.initInput = '1'; initInput(el); } });
      if (typeof initTextareaContainer === 'function') root.querySelectorAll('.form-field').forEach(function(el) { initTextareaContainer(el); });
      if (typeof initDropdown === 'function')   root.querySelectorAll('.dropdown').forEach(function(el) { initDropdown(el.parentElement); });
      if (typeof initCombobox === 'function')   initCombobox(root);
      if (typeof initImagePreview === 'function') initImagePreview(root);
      if (typeof initFileUpload === 'function')   initFileUpload(root);
      if (typeof initDRP === 'function')        root.querySelectorAll('.drp').forEach(function(el) { initDRP(el); });
      if (typeof initDatePicker === 'function') root.querySelectorAll('.dp').forEach(function(el) { initDatePicker(el); });
      if (typeof initAccordion === 'function')  root.querySelectorAll('.accordion').forEach(function(el) { initAccordion(el); });
      /* segment·tab·dropdown은 부모 요소를 container로 전달해야 내부 querySelectorAll이 동작한다 */
      if (typeof initSegment === 'function')    root.querySelectorAll('.segment').forEach(function(el) { initSegment(el.parentElement); });
      if (typeof initTab === 'function')        root.querySelectorAll('.tab-group').forEach(function(el) { initTab(el.parentElement); });
      if (typeof initDisclosure === 'function') root.querySelectorAll('.disclosure').forEach(function(el) { initDisclosure(el); });
      if (typeof initFilterBar === 'function')  root.querySelectorAll('.filter-bar').forEach(function(el) { initFilterBar(el); });
      if (typeof initStepper === 'function')    initStepper(root);
      /* 그 외 사용한 컴포넌트의 init 함수 추가 (→ JS init 라우팅 표 참조) */
    }
    _initComponents(); /* 초기 로드 */
    initProtoChrome(document); /* 크롬 — 사이드바 접기 · 뷰포트 미리보기(components.js 제공) */

    /* ── 스캐폴드 헬퍼 — 항상 포함. 폼 검증·버튼 로딩 ── */
    function setFieldError(fieldId, errId, msg) {
      var field = document.getElementById(fieldId), err = document.getElementById(errId);
      if (!field || !err) return;
      var wrap = field.querySelector('.input-wrap'), input = field.querySelector('input,textarea,select');
      var icon = field.querySelector('.input-icon'), iconUse = icon && icon.querySelector('use');
      if (msg) {
        field.classList.add('form-field--error');
        if (wrap) wrap.classList.add('input-wrap--icon-right');
        if (input) { input.classList.remove('input--success','input--complete'); input.classList.add('input--error'); input.setAttribute('aria-invalid','true'); input.setAttribute('aria-describedby',errId); }
        if (iconUse) iconUse.setAttribute('href','#icon-warning');
        if (icon) icon.removeAttribute('hidden');
        err.textContent = msg; err.removeAttribute('hidden');
      } else {
        field.classList.remove('form-field--error');
        if (wrap) wrap.classList.add('input-wrap--icon-right');
        if (input) { input.classList.remove('input--error','input--complete'); input.classList.add('input--success'); input.removeAttribute('aria-invalid'); }
        if (iconUse) iconUse.setAttribute('href','#icon-check');
        if (icon) icon.removeAttribute('hidden');
        err.setAttribute('hidden','');
      }
    }
    function setButtonLoading(btn, label) {
      var orig = btn.dataset.origLabel || btn.textContent.trim();
      btn.dataset.origLabel = orig;
      btn.setAttribute('tabindex','-1');
      btn.setAttribute('aria-label', label || orig + ' 중...');
      btn.classList.add('btn--loading');
      /* fill(primary·secondary·danger) = spinner--inverse. ghost·solid = spinner--sm 만. 출처: button.md ## 동작 loading */
      btn.innerHTML = '<span class="spinner spinner--sm spinner--inverse" aria-hidden="true"><span aria-hidden="true"></span></span>' + (label || orig + ' 중...');
    }
    function clearButtonLoading(btn) {
      btn.classList.remove('btn--loading'); btn.removeAttribute('tabindex'); btn.removeAttribute('aria-label');
      btn.innerHTML = btn.dataset.origLabel || ''; delete btn.dataset.origLabel;
    }

    /* ── blur·submit 핸들러 (폼이 있는 경우 여기에 추가) ── */

    /* ── 패널 목록 (점프·순차가 같은 DOM을 쓴다) ── */
    var protoPanels = Array.prototype.slice.call(document.querySelectorAll('#pane-panels > .scenario-panel'));
    function showOnlyPanel(panel) { protoPanels.forEach(function(p) { p.hidden = (p !== panel); }); }

    /* 지금 보이는 패널을 nav에 표시한다. 스텝으로 넘어갔을 때도 불러야 한다 —
       안 부르면 화면은 3단계인데 목록은 1단계가 켜져 있어, 지도가 거짓말을 한다. */
    function syncNav(panel) {
      var name = panel && panel.dataset.scenario;
      document.querySelectorAll('.proto-nav-btn').forEach(function(b) {
        b.classList.toggle('is-active', !!name && b.dataset.scenario === name);
      });
    }

    /* ── 시나리오 점프 ── */
    document.querySelectorAll('.proto-nav-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        closeAllOverlays();
        var name = this.dataset.scenario;
        var target = protoPanels.filter(function(p) { return p.dataset.scenario === name; })[0];
        if (!target) return;
        showOnlyPanel(target);
        _initComponents(target);
        syncNav(target);
      });
    });

    /* ── 스텝 이동 — 어느 시나리오에 있든 동작한다 ── */
    function step(from, dir) {
      var cur = from.closest('[data-step]'); if (!cur) return;
      var sib = cur[dir];
      while (sib && !sib.hasAttribute('data-step')) sib = sib[dir];
      if (!sib) return;
      closeAllOverlays();
      cur.hidden = true; sib.hidden = false;
      _initComponents(sib);
      syncNav(sib);
    }
    document.querySelectorAll('[data-step-next]').forEach(function(el) {
      el.addEventListener('click', function() { step(this, 'nextElementSibling'); });
    });
    document.querySelectorAll('[data-step-prev]').forEach(function(el) {
      el.addEventListener('click', function() { step(this, 'previousElementSibling'); });
    });

    /* ── 오버레이 스택 (두 모드 공용) ── */
    /* 여러 오버레이가 겹쳐 열릴 수 있다(예: Modal 위 검증 Alert). 열린 순서대로 스택에 쌓아
       z-index를 증가시키고(뒤에 연 것이 항상 위), Escape·backdrop 클릭·닫기 버튼은 최상위 하나만
       닫으며, 닫을 때 직전 포커스로 복귀한다. Tab은 최상위 오버레이 안에 가둔다.
       backdrop/Escape로 닫히면 안 되는 오버레이(파괴적 확인 Alert 등)는 data-overlay-static을 붙인다. */
    var _FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    var _overlayStack = [];
    function _topOverlay() { return _overlayStack[_overlayStack.length - 1]; }
    function _visibleFocusable(ov) {
      return Array.prototype.filter.call(ov.querySelectorAll(_FOCUSABLE), function(el) { return el.offsetParent !== null; });
    }
    function openOverlay(id) {
      var ov = document.getElementById(id);
      if (!ov || ov.classList.contains('is-open')) return;
      ov._returnFocus = document.activeElement;                 /* 복귀 대상 저장 */
      ov.style.zIndex = 'calc(var(--z-backdrop) + ' + (_overlayStack.length + 1) + ')'; /* 스택 순서대로 위로 */
      ov.classList.add('is-open');
      _overlayStack.push(ov);
      var f = _visibleFocusable(ov);
      (ov.querySelector('[autofocus]') || f[0] || ov).focus();  /* 오버레이 안으로 포커스 이동 */
    }
    function closeOverlay(ov) {
      if (!ov || !ov.classList.contains('is-open')) return;
      ov.classList.remove('is-open');
      ov.style.zIndex = '';
      var i = _overlayStack.indexOf(ov);
      if (i > -1) _overlayStack.splice(i, 1);
      if (ov._returnFocus && ov._returnFocus.focus) ov._returnFocus.focus(); /* 직전 포커스 복귀 */
      ov._returnFocus = null;
    }
    function closeAllOverlays() { _overlayStack.slice().reverse().forEach(closeOverlay); }

    document.querySelectorAll('[data-overlay-open]').forEach(function(el) {
      el.addEventListener('click', function(e) { e.preventDefault(); openOverlay(this.dataset.overlayOpen); });
    });
    /* 닫기 버튼 → 그 버튼이 속한 오버레이만 */
    document.addEventListener('click', function(e) {
      if (e.target.closest('[data-overlay-close]')) closeOverlay(e.target.closest('[data-overlay]'));
    });
    /* backdrop(오버레이 여백) 클릭 → 최상위만. static 오버레이는 제외 */
    document.querySelectorAll('[data-overlay]').forEach(function(ov) {
      ov.addEventListener('mousedown', function(e) {
        if (e.target === ov && !ov.hasAttribute('data-overlay-static')) closeOverlay(ov);
      });
    });
    /* Escape → 최상위 하나만(static 제외). Tab → 최상위 오버레이 안에 포커스 가둠 */
    document.addEventListener('keydown', function(e) {
      var top = _topOverlay();
      if (!top) return;
      if (e.key === 'Escape') {
        if (!top.hasAttribute('data-overlay-static')) { e.preventDefault(); closeOverlay(top); }
        return;
      }
      if (e.key === 'Tab') {
        var f = _visibleFocusable(top);
        if (!f.length) { e.preventDefault(); return; }
        var first = f[0], last = f[f.length - 1];
        if (!top.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
        else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    /* ── 파일 간 컨텍스트 (URL 쿼리) ── */
    /* 쿼리를 window._ctx(읽기 전용)로 노출 → 어떤 mock을 보일지 프로토타입이 결정.
       data-return 요소는 ?return 값으로 이동(없으면 history.back). 스크롤 위치는 파일 경로별 복원. */
    (function () {
      var params = {};
      location.search.slice(1).split('&').forEach(function (p) {
        if (!p) return;
        var kv = p.split('=');
        params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
      });
      window._ctx = params;
      document.querySelectorAll('[data-return]').forEach(function (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          if (params.return) location.href = params.return; else history.back();
        });
      });
      try {
        var key = 'proto-scroll:' + location.pathname;
        var y = sessionStorage.getItem(key);
        if (y) window.scrollTo(0, parseInt(y, 10) || 0);
        window.addEventListener('beforeunload', function () { sessionStorage.setItem(key, String(window.scrollY)); });
      } catch (e) {}
    })();
  </script>
</body>
</html>
```

```yaml
# 개발자 인계 메타
prototype: [한 줄 설명]
design-system-version: 0.5.1
# 화면 관계 — 이 프로토타입이 흐름 안에서 어디와 이어지는지 (멀티 화면 연동 시)
entry-from:            # 이 화면으로 들어오는 진입점 (없으면 생략)
  - 6-1-list.html (상세 보기 링크)
exits-to:              # 이 화면에서 나가는 목적지 + 전달 컨텍스트 키
  - 6-1-list.html (data-return)
  - 6-3-report.html?worker (신고 진행)
shared-overlays:       # _shared 파셜로 include한 공용 오버레이 (없으면 생략)
  - _shared/site-select.html
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

> `entry-from`·`exits-to`는 화면 간 관계를 기록해 화면 색인의 소스가 된다. `exits-to`에는 전달하는 쿼리 키(예: `?worker`)를 함께 적어 [파일 간 컨텍스트 전달](#파일-간-컨텍스트-전달--url-쿼리)과 짝을 맞춘다.

---

## 절대 하지 말 것

이곳은 **프로토타입 조립 자체에 대한 규칙**만 담는다. 컴포넌트 마크업·토큰·접근성의 상세 규칙은 각 원본(`components/**/*.md` · `tokens/**`)을 직접 읽어 따른다 — 여기에 중복 기재하지 않는다.

**역할 경계 — 넘으면 작업 중단**
- 역할 범위 외 요청(시스템 토큰·원칙 변경, React/Vue 변환) → "이 모드에서 처리하지 않습니다. 다른 역할 모드가 필요합니다" 안내
- 시스템에 없는 컴포넌트·스타일을 직접 만들거나, 컴포넌트 클래스·토큰 값을 변경 → 디자이너 검토 안내 (디자이너 영역)

**출력 산출물**
- Phase 1·2·3을 한 응답에 몰아 출력 — 전체 HTML이 여러 번 출력돼 응답이 끊긴다. 각 Phase는 별도 응답으로 나누고 Phase 끝에서 멈춰 사용자 확인을 기다린다 (→ [새 프로토타입 만들기](#새-프로토타입-만들기) 응답 분리 규칙)
- 시나리오 패널을 순차 이동용으로 복사해 두 벌 만들기 — 출력이 2배가 돼 응답이 끊긴다. 패널은 한 벌만 두고 `data-scenario`(점프)+`data-step`(순차)을 함께 부여한다
- 보기 모드 세그먼트(시나리오↔인터랙티브) 되살리기 — 없앤 장치다(→ [프로토타입 크롬의 컨트롤](#프로토타입-크롬의-컨트롤))
- 컴포넌트 CSS·JS, 프로토타입 크롬(`.page`·`.proto-*`·`.scenario-panel`·`[data-overlay]`)을 `<style>`·`<script>`에 직접 작성하거나 `components.css`·`components.js`에서 복사 — 링크된 번들이 처리한다 (`<style>`은 이 페이지에만 필요한 고유 레이아웃 한정, 없으면 비워 둠)
- Bootstrap·Tailwind 등 외부 CSS/JS 라이브러리 의존 — 디자인 시스템 번들만 사용
- `<style>`에 z-index 임의 정수(`9999` 등) — `tokens/elevation.md`의 z-index 토큰 사용
- 시스템 버전 주석(`<!-- design-system: -->`) 누락

**필수 포함**
- 시나리오 누락 — 빈 상태·로딩·오류 시나리오를 반드시 포함 (프롬프트가 적게 요청·미언급해도 기본 포함, 명시적 제외 시만 생략하고 그 사실을 고지)
- 접근성 속성 누락 (→ `accessibility.md`)

**아이콘** (→ [아이콘 fetch 주입 패턴](#아이콘--fetch-주입-패턴))
- `<use href>`에 절대 URL 사용 — Safari·`file://`에서 차단된다. fetch 주입 + `<use href="#icon-{id}">` 로컬 참조 사용
- `icons/categories.json`에 없는 icon ID 추정 — ID 목록에서만 선택
- 이모지·유니코드·외부 아이콘 폰트로 UI 아이콘 대체 (텍스트 콘텐츠 안의 이모지·유니코드는 허용)

**추정 금지**
- 클래스명·속성·init 함수를 BEM·일반 지식으로 추정 — 원본 `.md`와 [JS init 라우팅](#js-init-라우팅) 표에서 확인한다
- planner.md의 예시 코드에서 컴포넌트 마크업을 복사 — planner.md 예시는 프레임워크 패턴(`data-*`, `proto-*`)만 설명하며, 모든 컴포넌트 마크업(클래스·속성·자식 요소 구조)은 반드시 해당 컴포넌트 `.md` 파일을 직접 읽어 사용한다
- **JS 문자열로 마크업을 만들 때도 클래스를 추정하지 않는다** — 정적 HTML과 동일한 클래스를 쓴다. 특히 버튼 아이콘 래퍼는 `span.icon.icon--{size}`이며 `btn__icon` 같은 클래스는 존재하지 않는다(사이징 CSS가 없어 SVG가 거대하게 렌더된다). 같은 상태의 정적 마크업이 이미 있으면 새로 작성하지 말고 그 마크업을 재사용(복제)한다
