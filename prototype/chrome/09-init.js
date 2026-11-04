/* ── Prototype Chrome ──
   AI: initProtoChrome(document) — 프로토타입 셸의 크롬 동작.
   사이드바 접기 · 뷰포트 미리보기(lg·md·sm) · URL의 scenario 파라미터 적용.
   시나리오 전환 자체는 각 프로토타입 파일의 JS가 맡는다 — 이 함수는 버튼을 클릭할 뿐이라
   기존 파일과 겹치지 않는다.

   **부르는 순서가 곧 동작이다.** 모듈은 서로의 함수를 `ctx` 너머로 부르는데, 부르는
   시점은 전부 이 함수가 끝난 뒤(이벤트·부팅)라 정의 순서는 상관없다. 상관있는 것은
   **관문 둘**이다 — 틀 안이면 거기서 멈추고, `.proto-viewport`가 없으면 무대 위에 설
   것들(툴바 · 화면설명 · #s해시)도 서지 않는다. 그 둘을 여기서 지킨다. */
function initProtoChrome(root) {
  var PC = window.ProtoChrome;
  root = root || document;
  var layout = root.querySelector('.proto-layout');
  if (!layout || layout.dataset.initProtoChrome) return;
  layout.dataset.initProtoChrome = '1';

  /* 모듈이 나눠 쓰는 것만 여기 담는다. 한 모듈 안에서 끝나는 상태는 그 모듈이 들고 있다 —
     `ctx`가 커지면 "이 값을 누가 바꾸는가"를 다시 알 수 없게 된다. */
  var ctx = {
    root: root,
    layout: layout,
    params: new URLSearchParams(location.search)
    /* 이 아래는 모듈이 채운다:
         03-sidebar  sidebar · content · toggle
         04-stage    vp · mode · single · show
         06-toolbar  toolbarEl · refreshShare · syncDevice
         07-brief    brief · renderBrief · syncHash · navBtns */
  };

  if (PC.framed(ctx)) return;      /* 틀 안에서 열린 문서 — 크롬을 벗는다 */
  PC.sidebar(ctx);                 /* 접기는 틀과 무관하다 — 관문 앞이다 */
  if (!PC.stage(ctx)) return;      /* 폭을 고를 자리가 없으면 그 위의 것도 없다 */
  PC.navSync(ctx);
  PC.brand(ctx);
  PC.toolbar(ctx);
  PC.brief(ctx);
  PC.boot(ctx);
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initProtoChrome) window.__componentInits.initProtoChrome = initProtoChrome;
