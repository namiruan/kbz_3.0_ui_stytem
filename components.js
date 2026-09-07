/*
 * Component Init Functions — Bundled (auto-generated)
 * ─────────────────────────────────────────────────────
 * build.py가 각 컴포넌트 .md 파일의
 * js init 블록을 자동 추출해 생성한다.
 * 직접 수정하지 말고 각 컴포넌트 .md 파일을 편집하라.
 *
 * 사용법 (프로토타입 페이지):
 *   <link rel="stylesheet" href="tokens.css">
 *   <script src="components.js"></script>
 *   <script>
 *     document.querySelectorAll('.dropdown').forEach(function(el) { initDropdown(el.parentElement); });
 *     document.querySelectorAll('.drp').forEach(function(el) { initDRP(el); });
 *   </script>
 */

if (!window.__componentInits) window.__componentInits = {};



/* ── Prototype Chrome ──
   AI: initProtoChrome(document) — 프로토타입 셸의 크롬 동작.
   사이드바 접기 · 뷰포트 미리보기(lg·md·sm) · URL의 scenario 파라미터 적용.
   시나리오 전환 자체는 각 프로토타입 파일의 JS가 맡는다 — 이 함수는 버튼을 클릭할 뿐이라
   기존 파일과 겹치지 않는다. */
function initProtoChrome(root) {
  root = root || document;
  var layout = root.querySelector('.proto-layout');
  if (!layout || layout.dataset.initProtoChrome) return;
  layout.dataset.initProtoChrome = '1';

  var params = new URLSearchParams(location.search);

  /* **틀 안인데 우리가 띄운 것이 아니면 스스로 최상위로 나간다.**
     바깥에서 iframe의 load를 보고 옮기는 규칙과 같은 판단을 안쪽에서 한 번 더 한다 —
     바깥 페이지가 옛 번들을 물고 있으면(프로토타입은 components.js를 고정 쿼리로 부른다)
     그 규칙이 없어서, 넘어간 페이지가 제 크롬을 달고 틀 안에 갇힌다.
     안쪽은 방금 새로 불러온 문서라 항상 최신 규칙을 갖는다. */
  if (window.top !== window.self && params.get('proto-frame') !== '1') {
    /* 보고 있던 폭을 들고 나간다 — sm에서 넘어갔으면 다음 화면도 sm이다.
       모드는 바깥이 iframe에 적어 둔다(frameElement는 같은 출처에서 읽힌다). */
    try {
      /* 폭을 세 곳에서 찾는다 — 하나만 믿으면 바깥이 옛 번들일 때 폭이 사라진다.
         ① 내 주소(틀이 실어 보낸 값) ② 바깥이 iframe에 적어 둔 값 ③ 직전 문서(referrer)의 값.
         ③이 실제 경로다: 틀 안 A(=proto-view를 달고 있다)에서 B로 넘어오면 A가 referrer다. */
      var view = params.get('proto-view') || '';
      if (!view) { try { view = (window.frameElement && window.frameElement.dataset.view) || ''; } catch (e2) {} }
      if (!view && document.referrer) {
        try { view = new URL(document.referrer).searchParams.get('proto-view') || ''; } catch (e3) {}
      }
      if (!view) { try { view = sessionStorage.getItem('protoView') || ''; } catch (e4) {} }   /* file:// */
      var out = new URL(location.href);
      if (view) out.searchParams.set('proto-view', view);
      window.top.location.href = out.toString();
      return;
    } catch (e) {}   /* 다른 출처면 그대로 둔다 */
  }

  /* 틀 안에서 열린 문서 — 크롬을 벗는다. 이 분기에서는 컨트롤을 달지 않는다
     (틀 안에 또 폭 전환이 생기면 무엇을 보고 있는지 알 수 없다). */
  if (params.get('proto-frame') === '1') {
    document.documentElement.classList.add('proto-framed');
    var want = params.get('scenario');
    function applyScenario() {
      if (!want) return;
      var target = root.querySelector('.proto-nav-btn[data-scenario="' + want + '"]');
      if (target) target.click();
    }
    /* 파싱이 끝난 뒤에 누른다. 시나리오 전환 리스너는 프로토타입 파일의 스크립트가
       붙이는데, initProtoChrome이 그보다 먼저 호출될 수 있다(템플릿에서 호출 위치는
       자유다). 지금 누르면 아직 아무도 듣고 있지 않아 조용히 무시된다. */
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyScenario);
    else applyScenario();

    /* ── 안 → 밖 한 줄 보고 ──
       틀 안에서 화면이 바뀌면(탭·스텝·오버레이의 「다음」) 바깥 사이드바는 그걸 모른 채
       이전 시나리오를 켜 두고 있었다 — **지도가 거짓말을 한다.** 보기 모드 세그먼트를
       없앤 것과 같은 종류의 문제이고, 그때 내린 결론도 같다: 지도는 따라와야 한다.

       프로토타입 파일은 건드리지 않는다. 크롬을 벗어도 nav 버튼은 DOM에 남아 있고
       (사이드바만 display:none이다) 프로토타입의 syncNav가 거기 is-active를 계속 옮기므로,
       **그 클래스 변화를 보는 것만으로** 안쪽의 현재 시나리오를 알 수 있다.
       컴포넌트마다 이벤트를 새로 정의할 필요가 없고, 이미 배포된 프로토타입에도 그대로 붙는다.

       targetOrigin은 '*'다 — 프로토타입은 file://로도 열리고(그때 출처는 서로 다른 opaque다)
       GitHub Pages로도 열린다. 실리는 것은 시나리오 이름 하나뿐이라 숨길 것이 없다. */
    var fnav = root.querySelector('.proto-nav');
    if (fnav && window.parent !== window) {
      var lastSc = '';
      var tellParent = function() {
        var a = fnav.querySelector('.proto-nav-btn.is-active');
        var sc = a ? a.dataset.scenario : '';
        if (!sc || sc === lastSc) return;
        lastSc = sc;
        try { window.parent.postMessage({ source: 'proto-chrome', type: 'scenario', scenario: sc }, '*'); } catch (e) {}
      };
      new MutationObserver(tellParent).observe(fnav, { subtree: true, attributes: true, attributeFilter: ['class'] });
    }
    return;
  }

  var sidebar = layout.querySelector('.proto-sidebar');
  var content = layout.querySelector('.proto-content');

  /* ── 접기 ── */
  var toggle = sidebar && sidebar.querySelector('.proto-nav-toggle');
  if (toggle) {
    function setCollapsed(on) {
      layout.classList.toggle('is-nav-collapsed', on);
      toggle.setAttribute('aria-expanded', on ? 'false' : 'true');
      toggle.setAttribute('aria-label', on ? '시나리오 목록 열기' : '시나리오 목록 접기');
      try { sessionStorage.setItem('protoNavCollapsed', on ? '1' : '0'); } catch (e) {}
    }
    var saved = null;
    try { saved = sessionStorage.getItem('protoNavCollapsed'); } catch (e) {}
    /* 저장값이 없으면 폭으로 정한다 — 사이드바(152px)와 실제 화면이 다투기 시작하는 지점 */
    setCollapsed(saved !== null ? saved === '1' : window.innerWidth < 900);
    toggle.addEventListener('click', function() {
      setCollapsed(!layout.classList.contains('is-nav-collapsed'));
    });
  }

  /* ── 뷰포트 미리보기 ── */
  var vp = sidebar && sidebar.querySelector('.proto-viewport');
  if (!vp || !content) return;
  /* 폭 × 높이. 높이는 비교 모드의 세로 비율을 위해 쓴다(기기 느낌이 나야 크기가 읽힌다) */
  var VIEWS = { lg: [1280, 800], md: [768, 1024], sm: [390, 844] };
  var COMPARE = ['lg', 'md', 'sm'];
  var CELL_GAP = 16;   /* .proto-frames의 gap과 같아야 한다 */
  var MIN_W = 320;     /* 이보다 좁은 기기는 없다 */
  var BORDER = 2;      /* 틀 좌우 테두리 — content-box라 폭에 더해지고 배율에는 안 걸린다 */

  var original = null;  /* 자유로 돌아갈 원래 자식들 */
  var frames = [];      /* 지금 살아 있는 iframe들 */
  var mode = 'free';
  var single = null;    /* { frame, readout, width } */
  var cells = [];       /* 비교 모드의 { key, box, frame } */

  /* 현재 시나리오. 인자로 받은 버튼이 있으면 그것을 우선한다 —
     .is-active는 프로토타입 파일의 리스너가 나중에 붙이므로, 클릭 시점에는
     아직 이전 값이다. 리스너 등록 순서에 기대지 않으려면 클릭된 버튼에서 직접 읽는다. */
  function currentScenario(btn) {
    if (btn && btn.dataset.scenario) return btn.dataset.scenario;
    var active = root.querySelector('.proto-nav-btn.is-active');
    return active ? active.dataset.scenario : '';
  }
  function frameSrc(btn) {
    var u = new URL(location.href);
    u.searchParams.set('proto-frame', '1');
    /* 폭도 실어 보낸다 — 틀 안 문서가 **제 주소만 보고도** 어느 폭에서 열렸는지 안다.
       그 문서에서 다른 화면으로 넘어가면 referrer로 남아, 바깥 도움 없이도 폭이 이어진다. */
    u.searchParams.set('proto-view', mode);
    var sc = currentScenario(btn);
    if (sc) u.searchParams.set('scenario', sc); else u.searchParams.delete('scenario');
    return u.toString();
  }
  function syncSrc(btn) {
    var src = frameSrc(btn);
    frames.forEach(function(f) { if (f.dataset.src !== src) { f.dataset.src = src; f.src = src; } });
  }
  function newFrame() {
    var f = document.createElement('iframe');
    f.className = 'proto-frame';
    f.title = '화면 미리보기';
    /* **틀 안에서 다른 페이지로 가면 페이지 자체가 그리로 간다.**
       미리보기는 이 화면이 그 폭에서 어떻게 보이는지를 재는 장치이지 브라우저가 아니다 —
       틀 안에서 목록으로 넘어가면 그 페이지가 제 크롬(사이드바)까지 달고 390px 안에 들어가
       제목이 한 글자씩 세로로 쌓인다. 우리가 띄운 주소(proto-frame=1)가 아니면 최상위를 옮긴다.
       링크(target)만 바꾸면 프로토타입이 JS로 옮기는 경우(location.href = …)를 놓치므로,
       바깥에서 load를 보고 판정한다. */
    f.addEventListener('load', function() {
      var here;
      try { here = f.contentWindow.location.href; } catch (e) {
        /* `file://`로 열면 문서마다 출처가 달라 여기서 막힌다. 조용히 빠져나가면
           "왜 안 되지"를 콘솔에서도 찾을 수 없으므로 한 번만 말한다.
           (틀 안 화면은 스스로 나오고 폭도 sessionStorage로 이어지므로 치명적이지는 않다.) */
        if (!window.__protoFileWarned) {
          window.__protoFileWarned = true;
          console.warn('[proto-chrome] 틀 안 주소를 읽을 수 없다 — file://로 열면 문서마다 출처가 달라 막힌다. ' +
                       '로컬 서버로 열면 전부 정상 동작한다: python3 -m http.server 8000');
        }
        return;
      }
      if (!here || here === 'about:blank') return;
      if (new URL(here).searchParams.get('proto-frame') === '1') return;    /* 우리가 띄운 것 */
      /* 보고 있던 폭을 함께 넘긴다 — sm에서 넘어갔으면 다음 화면도 sm으로 연다 */
      var out = new URL(here);
      out.searchParams.set('proto-view', mode);
      location.href = out.toString();
    });
    f.dataset.view = mode;   /* 안쪽이 틀을 벗어날 때 읽어 간다 */
    frames.push(f);
    return f;
  }
  /* 자리가 모자라면 사이드바를 접는다 — 그 251px이 폭을 먹는 장본인이다.
     접기만 하고 펴지는 않는다: 사람이 다시 펴면 그 선택이 남아야 한다. */
  function makeRoom(need) {
    if (toggle && content.clientWidth < need && !layout.classList.contains('is-nav-collapsed')) toggle.click();
  }
  function takeOver() {
    if (!original) original = Array.prototype.slice.call(content.childNodes);
    frames = []; single = null; cells = [];
  }

  /* ── 단일 폭 — 1:1로 본다 ── */
  /* 폭만 맞추면 화면은 창만큼 길어져 **폰인데 세로가 끝없이 긴 화면**이 된다 —
     "한 화면에 어디까지 들어오는가"가 안 보이므로 접힘·스크롤 판단이 불가능하다.
     그래서 세로도 기기 값을 준다(sm 390×844 · md 768×1024 · lg 1280×800).
     창이 그보다 낮으면 바깥 페이지가 세로로 스크롤된다 — 틀을 줄여 맞추면
     버튼이 844를 말하면서 다른 높이를 보여주게 된다. */
  function buildSingle(w, h) {
    takeOver();
    var wrap = document.createElement('div'); wrap.className = 'proto-frame-wrap';
    var stage = document.createElement('div'); stage.className = 'proto-stage';
    var frame = newFrame();
    var handle = document.createElement('div');
    handle.className = 'proto-frame-handle';
    handle.title = '끌어서 폭 조절';
    stage.append(frame, handle);
    var readout = document.createElement('div'); readout.className = 'proto-readout';
    wrap.append(stage, readout);
    content.replaceChildren(wrap);
    single = { frame: frame, readout: readout, width: w, height: h };
    frame.style.height = h + 'px';
    setWidth(w);

    /* 끌기 — 가운데 정렬이라 폭은 이동거리의 두 배로 변한다(오른쪽 모서리가 손끝을 따라온다) */
    handle.addEventListener('pointerdown', function(e) {
      e.preventDefault();
      handle.setPointerCapture(e.pointerId);
      handle.classList.add('is-dragging');
      var x0 = e.clientX, w0 = single.width;
      function move(ev) { setWidth(w0 + (ev.clientX - x0) * 2); }
      function up() {
        handle.classList.remove('is-dragging');
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
      }
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
    });
  }
  function setWidth(w) {
    if (!single) return;
    w = Math.max(MIN_W, Math.round(w));
    single.width = w;
    /* 폭은 iframe에 직접 준다 — content-box라 이 값이 안쪽 뷰포트의 폭이다 */
    single.frame.style.width = w + 'px';
    var named = Object.keys(VIEWS).filter(function(k) { return VIEWS[k][0] === w && VIEWS[k][1] === single.height; })[0];
    single.readout.innerHTML = '<b>' + w + '</b> × ' + single.height + ' px' + (named ? ' · ' + named : '') + ' — 모서리를 끌어 조절';
    /* 이름 있는 폭에서만 버튼이 켜진다. 끌어서 벗어나면 어느 것도 켜지지 않는다 —
       1042px을 보면서 lg가 눌려 있으면 그 표시가 거짓말이 된다. */
    mark(named || '');
  }

  /* ── 비교 — 셋을 한 화면에 ── */
  function buildCompare() {
    takeOver();
    var wrap = document.createElement('div'); wrap.className = 'proto-frame-wrap';
    var row = document.createElement('div'); row.className = 'proto-frames';
    COMPARE.forEach(function(key) {
      var cell = document.createElement('div'); cell.className = 'proto-cell';
      var box = document.createElement('div'); box.className = 'proto-cell__box';
      var frame = newFrame();
      frame.style.width = VIEWS[key][0] + 'px';
      frame.style.height = VIEWS[key][1] + 'px';
      box.appendChild(frame);
      var label = document.createElement('div'); label.className = 'proto-cell__label';
      label.textContent = key + ' · ' + VIEWS[key][0];
      cell.append(label, box);
      row.appendChild(cell);
      cells.push({ key: key, box: box, frame: frame });
    });
    wrap.appendChild(row);
    content.replaceChildren(wrap);
    layoutCompare();
  }
  function layoutCompare() {
    if (!cells.length) return;
    var sumW = 0, maxH = 0;
    COMPARE.forEach(function(k) { sumW += VIEWS[k][0]; maxH = Math.max(maxH, VIEWS[k][1]); });
    /* 배율은 하나다 — 셋을 각자 맞추면 나란히 놓은 뜻이 사라진다.
       배율이 곱해지지 않는 것들(테두리·gap·레이블 줄)을 먼저 빼고 나눈다.
       이걸 빠뜨리면 셋째 틀이 화면 밖으로 20px쯤 잘려 나간다 — content-box라
       테두리 2px이 폭에 더해지는데 배율에는 걸리지 않기 때문이다. */
    var chrome = CELL_GAP * (COMPARE.length - 1) + BORDER * COMPARE.length;
    var availW = content.clientWidth - chrome;
    var availH = window.innerHeight - 40 - 24 - BORDER;   /* 셸 상하 padding + 레이블 줄 */
    var s = Math.min(availW / sumW, availH / maxH, 1);
    s = Math.floor(s * 1000) / 1000;   /* 올림 오차로 다시 넘치지 않게 내림 */
    cells.forEach(function(c) {
      var w = VIEWS[c.key][0], h = VIEWS[c.key][1];
      c.box.style.width = Math.floor(w * s) + 'px';
      c.box.style.height = Math.floor(h * s) + 'px';
      c.frame.style.transform = 'scale(' + s + ')';
    });
  }

  function mark(active) {
    vp.querySelectorAll('.proto-viewport__btn').forEach(function(b) {
      var on = b.dataset.viewport === active;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  function show(next) {
    mode = next;
    mark(next);
    /* 주소에 남긴다 — 새로고침해도, 다른 화면으로 넘어가도 같은 폭에서 이어진다 */
    try {
      var url = new URL(location.href);
      url.searchParams.set('proto-view', next);
      history.replaceState(null, '', url);
    } catch (e) {}
    /* 탭에도 남긴다. `file://`로 열면 문서마다 출처가 달라 iframe의 주소도, frameElement도
       읽을 수 없고 referrer도 비어 있어 **주소로 넘기는 길이 전부 막힌다.**
       sessionStorage는 그때도 통한다(실측: file:// 두 문서가 같은 탭에서 값을 주고받는다). */
    try { sessionStorage.setItem('protoView', next); } catch (e) {}
    if (next === 'free') {
      if (original) { content.replaceChildren.apply(content, original); original = null; }
      frames = []; single = null; cells = [];
      return;
    }
    if (next === 'compare') { makeRoom(Infinity); buildCompare(); }
    else { makeRoom(VIEWS[next][0]); buildSingle(VIEWS[next][0], VIEWS[next][1]); }
    syncSrc();
  }

  vp.addEventListener('click', function(e) {
    var btn = e.target.closest('.proto-viewport__btn');
    if (btn) show(btn.dataset.viewport);
  });

  /* 창이 바뀌면 비교 배율을 다시 잡는다 — 배율이 굳어 있으면 넘치거나 남는다 */
  window.addEventListener('resize', function() { if (mode === 'compare') layoutCompare(); });

  /* 시나리오를 바꾸면 틀 안도 따라간다 — 틀이 떠 있는 동안 바깥 버튼은 가려지지 않는다 */
  root.querySelectorAll('.proto-nav-btn').forEach(function(b) {
    b.addEventListener('click', function() { syncSrc(b); });
  });

  /* ── 밖 ← 안: 지도를 따라가게 한다 ──
     **단일 폭에서만** 받는다. 틀이 하나면 "안쪽이 곧 진실"이라 어느 쪽이 진짜인지
     정할 필요가 없다. 비교 모드는 셋이 대등해서 그 답이 없으므로 받지 않는다
     (셋이 어긋나는 것과 되돌리는 법은 planner.md에 적어 뒀다).

     주소도 함께 무효로 만든다 — 안쪽이 스스로 움직였으면 **바깥이 아는 주소는 더 이상
     그 틀의 상태가 아니다.** 이걸 비우지 않으면 나중에 원래 시나리오 버튼을 눌렀을 때
     "주소가 같다"는 이유로 다시 싣지 않아, 지도가 다시 거짓말을 시작한다. */
  function markNav(sc) {
    root.querySelectorAll('.proto-nav-btn').forEach(function(b) {
      b.classList.toggle('is-active', b.dataset.scenario === sc);
    });
  }
  window.addEventListener('message', function(e) {
    var d = e.data;
    if (!d || d.source !== 'proto-chrome' || d.type !== 'scenario' || !d.scenario) return;
    if (mode === 'compare' || !single) return;
    if (e.source !== single.frame.contentWindow) return;   /* 우리 틀에서 온 것만 */
    if (!root.querySelector('.proto-nav-btn[data-scenario="' + d.scenario + '"]')) return;
    single.frame.dataset.src = '';
    markNav(d.scenario);
  });

  /* 첫 모드는 **주소가 정한다** — 다른 화면에서 넘어왔으면 그 폭 그대로 이어진다.
     값이 없거나 모르는 값이면 lg. 「자유」는 버튼에서 없앴지만 'free'는 내부 상태로 남는다
     (틀을 만들기 전의 상태이자 되돌릴 자리의 이름이다). */
  var want = params.get('proto-view');
  if (!want) { try { want = sessionStorage.getItem('protoView'); } catch (e) {} }
  show((want && (VIEWS[want] || want === 'compare' || want === 'free')) ? want : 'lg');
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initProtoChrome) window.__componentInits.initProtoChrome = initProtoChrome;


/* ── Input ── */
/* blur 시 input--complete 토글 + clearable X 버튼 위치 자동 처리.
   값 유무에 따른 X 표시/숨김·상태 아이콘 표시는 여기서 처리 않음 — ## 동작 패턴 직접 구현.
   data-validate-delayed: 액션 지연 검증 필드. 에러·성공 상태에서 타이핑 시 complete로 자동 복귀. */
function initInput(el) {
  if (el.readOnly || el.disabled) return;
  var isDelayed = el.hasAttribute('data-validate-delayed');
  /* blur-based 필드: 이미 error·success 상태이면 리스너 불필요 */
  if (!isDelayed && (el.classList.contains('input--error') || el.classList.contains('input--success'))) return;
  /* 초기값 complete — error·success 초기 상태 제외 */
  var hasInitCond = el.classList.contains('input--error') || el.classList.contains('input--success');
  if (el.value && !hasInitCond) el.classList.add('input--complete');
  el.addEventListener('blur', function() {
    var hasCond = el.classList.contains('input--error') || el.classList.contains('input--success');
    el.classList.toggle('input--complete', !!el.value && !hasCond);
  });
  el.addEventListener('input', function() {
    if (isDelayed && (el.classList.contains('input--error') || el.classList.contains('input--success'))) {
      /* 에러·성공 상태에서 타이핑 → 재검증 대기로 복귀 */
      el.classList.remove('input--error', 'input--success');
      el.removeAttribute('aria-invalid');
      el.classList.toggle('input--complete', !!el.value);
    } else if (!el.value) {
      el.classList.remove('input--complete');
    }
  });
}
function initInputContainer(container) {
  container.querySelectorAll('.input').forEach(function(el) {
    if (el.dataset.initInput) return;
    el.dataset.initInput = '1';
    initInput(el);
  });
  /* clearable X 위치 — 입력한 텍스트 바로 뒤에 붙인다(우측 끝을 넘지 않게 clamp).
     재init마다 항상 재측정해, 숨겨진 패널(offsetWidth 0)에서 초기화됐다가 보일 때 복구된다
     — offsetWidth 0이면 건너뛰고, 스캐폴드가 패널을 보인 뒤 재init할 때 잡힌다. 리스너는 한 번만. */
  var _canvas = null;
  function positionClear(wrap) {
    var input = wrap.querySelector('.input');
    var clearBtn = wrap.querySelector('.input-clear');
    if (!input || !clearBtn || clearBtn.hasAttribute('hidden') || !input.offsetWidth) return;
    var cs = getComputedStyle(input);
    _canvas = _canvas || document.createElement('canvas');
    var ctx = _canvas.getContext('2d');
    ctx.font = cs.fontSize + ' ' + cs.fontFamily;
    var textW = ctx.measureText(input.value).width;
    var maxLeft = input.offsetWidth - parseFloat(cs.paddingRight) - (clearBtn.offsetWidth || 20);
    clearBtn.style.left = Math.min(parseFloat(cs.paddingLeft) + textW + 4, maxLeft) + 'px';
    clearBtn.style.right = 'auto';
    input.title = input.value;
  }
  function eachClearable(fn) {
    if (container.matches && container.matches('.input-wrap--clearable')) fn(container);
    container.querySelectorAll('.input-wrap--clearable').forEach(fn);
  }
  eachClearable(function(wrap) {
    positionClear(wrap);
    if (wrap.dataset.initClear) return;
    wrap.dataset.initClear = '1';
    var input = wrap.querySelector('.input');
    if (input) input.addEventListener('input', function() { positionClear(wrap); });
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initInputContainer) window.__componentInits.initInputContainer = initInputContainer;


/* ── Textarea ── */
/* blur 시 textarea--complete 토글. 조건부 필드는 ## 동작 패턴 직접 구현.
   data-validate-delayed: 액션 지연 검증 필드. 에러 상태에서 타이핑 시 complete로 자동 복귀. */
function initTextarea(el) {
  if (el.readOnly || el.disabled) return;
  var isDelayed = el.hasAttribute('data-validate-delayed');
  /* blur-based 필드: 이미 error 상태이면 리스너 불필요 */
  if (!isDelayed && el.classList.contains('textarea--error')) return;
  if (el.value && !el.classList.contains('textarea--error')) el.classList.add('textarea--complete');
  el.addEventListener('blur', function() {
    el.classList.toggle('textarea--complete', !!el.value && !el.classList.contains('textarea--error'));
  });
  el.addEventListener('input', function() {
    if (isDelayed && el.classList.contains('textarea--error')) {
      /* 에러 상태에서 타이핑 → 재검증 대기로 복귀 */
      el.classList.remove('textarea--error');
      el.removeAttribute('aria-invalid');
      el.classList.toggle('textarea--complete', !!el.value);
    } else if (!el.value) {
      el.classList.remove('textarea--complete');
    }
  });
}
function initTextareaContainer(container) {
  container.querySelectorAll('.textarea').forEach(function(el) {
    if (el.dataset.initTextarea) return;
    el.dataset.initTextarea = '1';
    initTextarea(el);
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initTextareaContainer) window.__componentInits.initTextareaContainer = initTextareaContainer;


/* ── Avatar ── */
// 아바타 식별색 배정 — 같은 열쇠는 언제나 같은 색.
// 서버가 렌더하든 브라우저가 렌더하든 같은 값이 나와야 하므로,
// 언어를 가리지 않는 가장 단순한 해시를 쓴다(31진법 누적).
function avatarColorIndex(key) {
  var h = 0;
  for (var i = 0; i < key.length; i++) h = (Math.imul(h, 31) + key.charCodeAt(i)) >>> 0;
  return (h % 8) + 1;
}
window.avatarColorIndex = avatarColorIndex;
// <span class="avatar avatar--c3" role="img" aria-label="익명1234">


/* ── Segment ── */
/* Segment — 클릭/방향키 선택 이동, aria-checked 토글, 슬라이더 위치 갱신 */
/* 패널 전환: 아이템에 data-target="panel-id", 패널 div에 data-panel="panel-id" */
function initSegment(container) {
  function updateSlider(group, animate) {
    var slider = group.querySelector('.segment__slider');
    var selected = group.querySelector('.segment__item--selected');
    if (!slider || !selected) return;
    if (!animate) slider.style.transition = 'none';
    slider.style.width = selected.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + selected.offsetLeft + 'px)';
    if (!animate) { slider.offsetWidth; slider.style.transition = ''; }
  }
  /* data-target이 있는 아이템 선택 시 container 안의 data-panel 전환 */
  function switchPanel(target) {
    if (!target) return;
    container.querySelectorAll('[data-panel]').forEach(function(p) {
      p.style.display = p.getAttribute('data-panel') === target ? '' : 'none';
    });
  }
  container.querySelectorAll('.segment').forEach(function(group) {
    updateSlider(group, false);            /* 항상 재측정·재배치 — 숨겨진 패널(offset 0)에서 초기화됐다가 보일 때 재init되면 슬라이더 복구 */
    if (group.dataset.initSegment) return; /* 가드는 리스너 중복 부착만 막는다 */
    group.dataset.initSegment = '1';
    var items = Array.from(group.querySelectorAll('.segment__item'));
    items.forEach(function(item, idx) {
      item.addEventListener('click', function() {
        if (item.getAttribute('aria-checked') === 'true') return;
        items.forEach(function(i) {
          i.classList.remove('segment__item--selected');
          i.setAttribute('aria-checked', 'false');
        });
        item.classList.add('segment__item--selected');
        item.setAttribute('aria-checked', 'true');
        item.focus();
        updateSlider(group, true);
        switchPanel(item.getAttribute('data-target'));
      });
      item.addEventListener('keydown', function(e) {
        var next = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % items.length;
        if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   next = (idx - 1 + items.length) % items.length;
        if (next < 0) return;
        e.preventDefault();
        items.forEach(function(i) {
          i.classList.remove('segment__item--selected');
          i.setAttribute('aria-checked', 'false');
        });
        items[next].classList.add('segment__item--selected');
        items[next].setAttribute('aria-checked', 'true');
        items[next].focus();
        updateSlider(group, true);
        switchPanel(items[next].getAttribute('data-target'));
      });
    });
  });
}
if (window.__componentInits && !window.__componentInits.initSegment) window.__componentInits.initSegment = initSegment;


/* ── Disclosure ── */
function initDisclosure(container) {
  container.querySelectorAll('.disclosure').forEach(function(disc) {
    if (disc.dataset.initDisclosure) return;
    disc.dataset.initDisclosure = '1';
    var trigger = disc.querySelector('.disclosure__trigger');
    var label = trigger.querySelector('.disclosure__label');
    var expandLabel   = disc.dataset.labelExpand   || '더 보기';
    var collapseLabel = disc.dataset.labelCollapse || '접기';
    function toggle() {
      var expanded = disc.classList.toggle('disclosure--expanded');
      trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      label.textContent = expanded ? collapseLabel : expandLabel;
      // icon-only: 텍스트 레이블이 숨겨지므로 aria-label로 상태 전달
      if (disc.classList.contains('disclosure--icon-only')) {
        trigger.setAttribute('aria-label', expanded ? collapseLabel : expandLabel);
      }
    }
    trigger.addEventListener('click', toggle);
    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggle();
      }
    });
  });
}
if (window.__componentInits && !window.__componentInits.initDisclosure) window.__componentInits.initDisclosure = initDisclosure;


/* ── Calendar ── */
function initCalendar(container) {
  /* 동작 프리뷰 전용: #cal-live + #cal-mode-seg 가 있을 때만 실행 */
  var calLive = container.querySelector('#cal-live');
  var seg = container.querySelector('#cal-mode-seg');
  if (!calLive || !seg) return;
  if (calLive.dataset.initCalendar) return;
  calLive.dataset.initCalendar = '1';

  var today = new Date(); today.setHours(0,0,0,0);
  var viewYear = today.getFullYear();
  var viewMonth = today.getMonth();
  var mode       = 'single';
  var selected   = null;
  var rangeStart = null;
  var rangeEnd   = null;
  var hoverDate  = null;
  var MARKED_DAYS = [3, 8, 14, 20, 25];

  function isSame(a, b) {
    return a && b && a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  function isBetween(d, s, e) {
    if (!s || !e) return false;
    var lo = s < e ? s : e, hi = s < e ? e : s;
    return d > lo && d < hi;
  }
  function fromKey(k) { var p = k.split(','); return new Date(+p[0], +p[1], +p[2]); }

  var weeksEl = container.querySelector('#cal-weeks-live');

  function render() {
    weeksEl.innerHTML = '';

    var firstOfMonth = new Date(viewYear, viewMonth, 1);
    var lastOfMonth  = new Date(viewYear, viewMonth + 1, 0);
    var cursor = new Date(firstOfMonth);
    cursor.setDate(cursor.getDate() - cursor.getDay());

    while (cursor <= lastOfMonth || cursor.getDay() !== 0) {
      var weekEl = document.createElement('div');
      weekEl.className = 'cal__week';
      weekEl.setAttribute('role', 'row');

      for (var i = 0; i < 7; i++) {
        var d        = new Date(cursor);
        var outside  = d.getMonth() !== viewMonth;
        var disabled = !outside && d < today;
        var inactive = outside || disabled;
        var isToday  = isSame(d, today);
        var marked   = !inactive && MARKED_DAYS.indexOf(d.getDate()) !== -1;
        var isSel    = mode === 'single' && isSame(d, selected);
        var isStart  = mode === 'range'  && isSame(d, rangeStart);
        var isEnd    = mode === 'range'  && isSame(d, rangeEnd);
        var inRange  = mode === 'range'  && isBetween(d, rangeStart, rangeEnd);
        var isPreview  = mode === 'range' && !rangeEnd && rangeStart && hoverDate && isBetween(d, rangeStart, hoverDate);
        var isHoverEnd = mode === 'range' && !rangeEnd && rangeStart && hoverDate && !isStart && isSame(d, hoverDate);

        var btn = document.createElement('button');
        btn.setAttribute('role', 'gridcell');
        btn.dataset.date = d.getFullYear() + ',' + d.getMonth() + ',' + d.getDate();
        if (inactive) btn.dataset.inactive = 'true';

        var effectiveEnd = rangeEnd || hoverDate;
        var goLeft = effectiveEnd && effectiveEnd < rangeStart;

        var cls = ['cal__day'];
        if (inactive)            cls.push('cal__day--' + (outside ? 'outside' : 'disabled'));
        if (isToday && !outside) cls.push('cal__day--today');
        if (isSel)               cls.push('cal__day--selected');
        if (isStart) {
          if (!effectiveEnd)     cls.push('cal__day--range-solo');
          else if (rangeEnd)     cls.push(goLeft ? 'cal__day--range-start-left' : 'cal__day--range-start');
          else                   cls.push(goLeft ? 'cal__day--range-start-left-pre' : 'cal__day--range-start-pre');
        }
        if (isEnd)               cls.push('cal__day--range-end');
        if (inRange)             cls.push('cal__day--in-range');
        if (isPreview)           cls.push('cal__day--in-range-preview');
        if (isHoverEnd)          cls.push(goLeft ? 'cal__day--hover-end-left' : 'cal__day--hover-end');
        if (marked)              cls.push('cal__day--marked');
        btn.className = cls.join(' ');

        btn.setAttribute('tabindex', (!inactive && (isToday || isSel || isStart)) ? '0' : '-1');
        if (isToday && !outside) btn.setAttribute('aria-current', 'date');
        if (isSel || isStart || isEnd || inRange) btn.setAttribute('aria-selected', 'true');
        if (disabled) btn.setAttribute('aria-disabled', 'true');
        btn.textContent = d.getDate();

        weekEl.appendChild(btn);
        cursor.setDate(cursor.getDate() + 1);
      }
      weeksEl.appendChild(weekEl);
      if (cursor > lastOfMonth && cursor.getDay() === 0) break;
    }
    markDisabledRuns();
  }

  weeksEl.addEventListener('click', function(e) {
    var btn = e.target.closest ? e.target.closest('.cal__day') : e.target;
    if (!btn || btn.dataset.inactive) return;
    var date = fromKey(btn.dataset.date);
    if (mode === 'single') {
      selected = isSame(date, selected) ? null : date;
    } else {
      if (!rangeStart || rangeEnd) {
        rangeStart = date; rangeEnd = null; hoverDate = null;
      } else if (isSame(rangeStart, date)) {
        rangeStart = null; hoverDate = null;
      } else {
        rangeEnd = date;
        if (rangeEnd < rangeStart) { var t = rangeStart; rangeStart = rangeEnd; rangeEnd = t; }
        hoverDate = null;
      }
    }
    render();
  });

  weeksEl.addEventListener('mouseover', function(e) {
    if (mode !== 'range') return;
    var btn = e.target.closest ? e.target.closest('.cal__day') : e.target;
    if (!btn || btn.dataset.inactive || !rangeStart || rangeEnd) return;
    var d = fromKey(btn.dataset.date);
    if (!isSame(d, hoverDate)) { hoverDate = d; render(); }
  });

  /* Segment 토글 */
  var segSlider = seg.querySelector('.segment__slider');
  function updateSegSlider() {
    var sel = seg.querySelector('.segment__item--selected');
    segSlider.style.width = sel.offsetWidth + 'px';
    segSlider.style.transform = 'translateX(' + sel.offsetLeft + 'px)';
  }
  segSlider.style.transition = 'none';
  updateSegSlider();
  seg.offsetWidth;
  segSlider.style.transition = '';
  seg.addEventListener('click', function(e) {
    var item = e.target.closest ? e.target.closest('.segment__item') : e.target;
    if (!item) return;
    seg.querySelectorAll('.segment__item').forEach(function(b) {
      b.classList.remove('segment__item--selected');
      b.setAttribute('aria-checked', 'false');
    });
    item.classList.add('segment__item--selected');
    item.setAttribute('aria-checked', 'true');
    updateSegSlider();
    mode = item.dataset.mode;
    selected = null; rangeStart = null; rangeEnd = null; hoverDate = null;
    render();
  });

  render();

  /* 연속 disabled 구간 감지 → disabled-start/mid/end 클래스 부여 */
  function markDisabledRuns() {
    var allBtns = Array.prototype.slice.call(weeksEl.querySelectorAll('.cal__day'));
    var run = [];
    function flush() {
      if (run.length === 1) {
        run[0].classList.add('cal__day--disabled-solo');
      } else if (run.length >= 2) {
        run[0].classList.add('cal__day--disabled-start');
        for (var i = 1; i < run.length - 1; i++) run[i].classList.add('cal__day--disabled-mid');
        run[run.length - 1].classList.add('cal__day--disabled-end');
      }
      run = [];
    }
    allBtns.forEach(function(b) {
      if (b.classList.contains('cal__day--disabled')) { run.push(b); }
      else { flush(); }
    });
    flush();
  }
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initCalendar) window.__componentInits.initCalendar = initCalendar;


/* ── Dropdown ── */
function initDropdown(container) {
  container.querySelectorAll('.dropdown').forEach(function(dd) {
    if (dd.dataset.initDropdown) return;
    dd.dataset.initDropdown = '1';

    var isMulti  = dd.classList.contains('dropdown--multi');
    var trig     = dd.querySelector('.dropdown__trigger');
    var val      = dd.querySelector('.dropdown__value');
    var count    = dd.querySelector('.dropdown__count');
    var trigIcon = dd.querySelector('.dropdown__trigger-icon');

    function getOpts() { return Array.from(dd.querySelectorAll('.dropdown__option')); }

    function openDD() {
      var list = dd.querySelector('.dropdown__list');
      if (list) {
        getOpts().sort(function(a, b) {
          return (a.classList.contains('dropdown__option--selected') ? 0 : 1) -
                 (b.classList.contains('dropdown__option--selected') ? 0 : 1);
        }).forEach(function(o) { list.appendChild(o); });
      }
      dd.classList.add('dropdown--open');
      if (trig) trig.setAttribute('aria-expanded', 'true');
    }
    function closeDD() {
      dd.classList.remove('dropdown--open');
      if (trig) trig.setAttribute('aria-expanded', 'false');
    }

    if (trig) {
      trig.addEventListener('click', function() {
        if (dd.classList.contains('dropdown--open')) closeDD(); else openDD();
      });
    }

    /* 옵션 클릭 — 이벤트 위임 */
    dd.addEventListener('click', function(e) {
      var opt = e.target.closest('.dropdown__option');
      if (!opt || opt.classList.contains('dropdown__option--disabled')) return;
      if (isMulti) {
        var s = opt.classList.toggle('dropdown__option--selected');
        opt.setAttribute('aria-selected', String(s));
        if (count) {
          var n = dd.querySelectorAll('.dropdown__option--selected').length;
          count.textContent = n; count.hidden = n === 0;
        }
        if (val) val.classList.toggle('dropdown__value--placeholder', !dd.querySelector('.dropdown__option--selected'));
      } else if (dd.classList.contains('dropdown--action')) {
        /* 액션 메뉴 — 옵션은 액션(모달·알럿·이동 등)을 실행할 뿐 트리거에 값을 남기지 않는다.
           트리거는 버튼 라벨(placeholder)을 유지하고, 실제 처리는 앱의 옵션 클릭 핸들러가 담당한다. */
        closeDD();
      } else {
        getOpts().forEach(function(o) { o.classList.remove('dropdown__option--selected'); o.setAttribute('aria-selected', 'false'); });
        opt.classList.add('dropdown__option--selected');
        opt.setAttribute('aria-selected', 'true');
        if (val) { val.textContent = opt.querySelector('.dropdown__option-label').textContent; val.classList.remove('dropdown__value--placeholder'); }
        var optIcon = opt.querySelector('.dropdown__option-icon');
        if (optIcon && trigIcon) { trigIcon.innerHTML = optIcon.innerHTML; trigIcon.hidden = false; }
        closeDD();
      }
    });

    /* 외부 클릭 닫기 */
    document.addEventListener('click', function(e) { if (!dd.contains(e.target)) closeDD(); });

    /* 키보드 */
    dd.addEventListener('keydown', function(e) {
      if (!dd.classList.contains('dropdown--open')) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (trig) trig.click(); }
        return;
      }
      if (e.key === 'Escape') { e.preventDefault(); closeDD(); if (trig) trig.focus(); }
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var opts = getOpts(), idx = opts.indexOf(document.activeElement);
        idx = e.key === 'ArrowDown' ? Math.min(idx + 1, opts.length - 1) : Math.max(idx - 1, 0);
        if (idx < 0) idx = 0;
        if (opts[idx]) opts[idx].focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        if (document.activeElement.classList.contains('dropdown__option')) { e.preventDefault(); document.activeElement.click(); }
      }
    });
  });
}


/* ── Combobox ── */
/* Combobox — 검색·실시간 필터·선택(단일/복수)·태그·키보드·외부 클릭 닫기.
   container 안 모든 .combobox를 초기화하고, .combobox--multi 유무로 단일/복수를 자동 분기한다.
   옵션 선택은 mousedown preventDefault + click 패턴(blur 전에 선택 처리)으로 동작한다.
   프로토타입에서 직접 구현하지 말고 이 함수에 위임한다. */
function initCombobox(container) {
  if (!container.__comboClosers) container.__comboClosers = [];
  container.querySelectorAll('.combobox').forEach(function(cb) {
    if (cb.dataset.initCombobox) return;
    cb.dataset.initCombobox = '1';
    var trigger = cb.querySelector('.combobox__trigger');
    var input   = cb.querySelector('.combobox__input');
    if (!trigger || !input) return;
    var isMulti = cb.classList.contains('combobox--multi');
    var opts    = Array.from(cb.querySelectorAll('.combobox__option'));
    var empty   = cb.querySelector('.combobox__empty');
    var list    = cb.querySelector('.combobox__list');

    function open()  { cb.classList.add('combobox--open');    input.setAttribute('aria-expanded', 'true'); }
    function close() { cb.classList.remove('combobox--open'); input.setAttribute('aria-expanded', 'false'); }
    function sortOpts() {
      if (!list) return;
      Array.from(list.querySelectorAll('.combobox__option')).sort(function(a, b) {
        return (a.classList.contains('combobox__option--selected') ? 0 : 1) -
               (b.classList.contains('combobox__option--selected') ? 0 : 1);
      }).forEach(function(o) { list.appendChild(o); });
    }
    function filter(q) {
      var any = false;
      opts.forEach(function(o) {
        var show = !q || o.querySelector('.combobox__option-label').textContent.toLowerCase().indexOf(q) !== -1;
        o.hidden = !show;
        if (show) any = true;
      });
      if (empty) empty.hidden = any;
    }
    function navKey(e) {
      e.preventDefault();
      var vis = opts.filter(function(o) { return !o.hidden && !o.classList.contains('combobox__option--disabled'); });
      var idx = vis.indexOf(document.activeElement);
      idx = e.key === 'ArrowDown' ? Math.min(idx + 1, vis.length - 1) : Math.max(idx - 1, 0);
      if (idx < 0) idx = 0;
      if (vis[idx]) vis[idx].focus();
    }

    if (isMulti) {
      var tagsWrap = cb.querySelector('.combobox__tags');
      var addTag = function(label, opt) {
        if (!tagsWrap) return;
        var tag = document.createElement('span');
        tag.className = 'tag tag--removable';
        tag.dataset.value = label;
        tag.innerHTML = label + '<button class="icon-on--badge icon-on--brand" type="button" aria-label="' + label + ' 제거"><svg aria-hidden="true"><use href="#icon-close"/></svg></button>';
        tag.querySelector('button').addEventListener('click', function(e) {
          e.stopPropagation();
          tag.remove();
          opt.classList.remove('combobox__option--selected');
          opt.setAttribute('aria-selected', 'false');
        });
        tagsWrap.appendChild(tag);
      };
      opts.forEach(function(opt) {
        if (opt.classList.contains('combobox__option--selected')) {
          var label = opt.querySelector('.combobox__option-label').textContent;
          if (!tagsWrap || !tagsWrap.querySelector('[data-value="' + label + '"]')) addTag(label, opt);
        }
      });
      var closeRestore = function() { close(); input.value = ''; filter(''); };
      trigger.addEventListener('click', function(e) {
        if (e.target.closest('button')) return;
        if (!cb.classList.contains('combobox--open')) { sortOpts(); open(); filter(''); }
        input.focus();
      });
      input.addEventListener('focus', function() { if (!cb.classList.contains('combobox--open')) { sortOpts(); open(); filter(''); } });
      input.addEventListener('input', function() { if (!cb.classList.contains('combobox--open')) open(); filter(input.value.toLowerCase()); });
      opts.forEach(function(opt) {
        opt.addEventListener('mousedown', function(e) { e.preventDefault(); });
        opt.addEventListener('click', function() {
          if (opt.classList.contains('combobox__option--disabled')) return;
          var sel = opt.classList.toggle('combobox__option--selected');
          opt.setAttribute('aria-selected', sel.toString());
          var label = opt.querySelector('.combobox__option-label').textContent;
          if (sel) addTag(label, opt);
          else { var t = tagsWrap && tagsWrap.querySelector('[data-value="' + label + '"]'); if (t) t.remove(); }
          input.value = ''; filter(''); input.focus();
        });
      });
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && input.value === '' && tagsWrap) {
          var lastTag = tagsWrap.lastElementChild;
          if (lastTag) {
            var val = lastTag.dataset.value;
            lastTag.remove();
            var o = opts.filter(function(x) { return x.querySelector('.combobox__option-label').textContent === val; })[0];
            if (o) { o.classList.remove('combobox__option--selected'); o.setAttribute('aria-selected', 'false'); }
          }
        }
      });
      cb.addEventListener('keydown', function(e) {
        if (!cb.classList.contains('combobox--open')) return;
        if (e.key === 'Escape') { e.preventDefault(); close(); input.value = ''; input.focus(); }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') navKey(e);
        else if (e.key === 'Enter' && document.activeElement.classList.contains('combobox__option')) { e.preventDefault(); document.activeElement.click(); }
      });
      input.addEventListener('blur', function() {
        setTimeout(function() { if (!cb.contains(document.activeElement)) closeRestore(); }, 150);
      });
      container.__comboClosers.push({ cb: cb, close: closeRestore });
    } else {
      var clear = cb.querySelector('.combobox__clear');
      var selectedLabel = null;
      var preSel = opts.filter(function(o) { return o.classList.contains('combobox__option--selected'); })[0];
      if (preSel) { selectedLabel = preSel.querySelector('.combobox__option-label').textContent; input.value = selectedLabel; cb.classList.add('combobox--has-value'); }
      var textWidth = function() {
        var c = document.createElement('canvas'), ctx = c.getContext('2d'), cs = getComputedStyle(input);
        ctx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
        return ctx.measureText(input.value).width;
      };
      var setWidth = function() {
        if (selectedLabel) { input.style.width = Math.ceil(textWidth()) + 'px'; input.style.flex = '0 0 auto'; }
        else { input.style.width = ''; input.style.flex = ''; }
      };
      var closeRestore = function() { close(); input.value = selectedLabel || ''; filter(''); setWidth(); };
      setWidth();
      trigger.addEventListener('click', function(e) {
        if (e.target === input) return;
        if (!cb.classList.contains('combobox--open')) { sortOpts(); open(); input.value = ''; input.style.width = ''; input.style.flex = ''; filter(''); input.focus(); }
      });
      input.addEventListener('focus', function() {
        if (!cb.classList.contains('combobox--open')) { sortOpts(); open(); input.value = ''; input.style.width = ''; input.style.flex = ''; filter(''); }
      });
      input.addEventListener('input', function() { if (!cb.classList.contains('combobox--open')) open(); input.style.width = ''; input.style.flex = ''; filter(input.value.toLowerCase()); });
      opts.forEach(function(opt) {
        opt.addEventListener('mousedown', function(e) { e.preventDefault(); });
        opt.addEventListener('click', function() {
          if (opt.classList.contains('combobox__option--disabled')) return;
          opts.forEach(function(o) { o.classList.remove('combobox__option--selected'); o.setAttribute('aria-selected', 'false'); });
          opt.classList.add('combobox__option--selected'); opt.setAttribute('aria-selected', 'true');
          selectedLabel = opt.querySelector('.combobox__option-label').textContent;
          input.value = selectedLabel; cb.classList.add('combobox--has-value');
          close(); setWidth(); input.focus();
        });
      });
      if (clear) {
        clear.addEventListener('mousedown', function(e) { e.preventDefault(); });
        clear.addEventListener('click', function(e) {
          e.stopPropagation();
          selectedLabel = null; input.value = ''; input.style.width = ''; input.style.flex = '';
          cb.classList.remove('combobox--has-value');
          opts.forEach(function(o) { o.classList.remove('combobox__option--selected'); o.setAttribute('aria-selected', 'false'); });
          filter(''); open(); input.focus();
        });
      }
      input.addEventListener('blur', function() {
        setTimeout(function() { if (!cb.contains(document.activeElement)) closeRestore(); }, 150);
      });
      cb.addEventListener('keydown', function(e) {
        if (!cb.classList.contains('combobox--open')) {
          if (e.key === 'Enter') { e.preventDefault(); sortOpts(); open(); filter(''); input.focus(); }
          return;
        }
        if (e.key === 'Escape') { e.preventDefault(); close(); input.value = selectedLabel || ''; setWidth(); input.focus(); }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') navKey(e);
        else if (e.key === 'Enter' && document.activeElement.classList.contains('combobox__option')) document.activeElement.click();
      });
      container.__comboClosers.push({ cb: cb, close: closeRestore });
    }
  });
  if (!container.__initComboboxDoc) {
    container.__initComboboxDoc = true;
    document.addEventListener('click', function(e) {
      (container.__comboClosers || []).forEach(function(c) {
        if (c.cb.classList.contains('combobox--open') && !c.cb.contains(e.target)) c.close();
      });
    });
  }
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initCombobox) window.__componentInits.initCombobox = initCombobox;


/* ── Tab ── */
/* Tab — slider 위치·키보드 내비게이션·overflow scroller 초기화 */
function initTab(container) {
  function updateSlider(group, animate) {
    var slider = group.querySelector('.tab-group__slider');
    var selected = group.querySelector('.tab--selected');
    if (!slider || !selected) return;
    var isVertical = group.classList.contains('tab-group--vertical');
    if (!animate) slider.style.transition = 'none';
    if (isVertical) {
      slider.style.height = selected.offsetHeight + 'px';
      slider.style.transform = 'translateY(' + selected.offsetTop + 'px)';
    } else {
      slider.style.width = selected.offsetWidth + 'px';
      slider.style.transform = 'translateX(' + selected.offsetLeft + 'px)';
    }
    if (!animate) { slider.offsetWidth; slider.style.transition = ''; }
  }

  /* tab-scroller__track 안에 있을 때 선택·포커스된 탭이 보이도록 track 스크롤 보정 */
  function scrollTabIntoView(tab) {
    var track = tab.closest('.tab-scroller__track');
    if (!track) return;
    var isVertical = tab.closest('.tab-group').classList.contains('tab-group--vertical');
    if (isVertical) {
      if (tab.offsetTop < track.scrollTop) {
        track.scrollTo({ top: tab.offsetTop, behavior: 'smooth' });
      } else if (tab.offsetTop + tab.offsetHeight > track.scrollTop + track.clientHeight) {
        track.scrollTo({ top: tab.offsetTop + tab.offsetHeight - track.clientHeight, behavior: 'smooth' });
      }
    } else {
      if (tab.offsetLeft < track.scrollLeft) {
        track.scrollTo({ left: tab.offsetLeft, behavior: 'smooth' });
      } else if (tab.offsetLeft + tab.offsetWidth > track.scrollLeft + track.clientWidth) {
        track.scrollTo({ left: tab.offsetLeft + tab.offsetWidth - track.clientWidth, behavior: 'smooth' });
      }
    }
  }

  function initTabGroup(group) {
    var tabs = Array.from(group.querySelectorAll('[role="tab"]:not([disabled])'));
    var isVertical = group.classList.contains('tab-group--vertical');

    function selectTab(tab) {
      var allTabs = Array.from(group.querySelectorAll('[role="tab"]'));
      allTabs.forEach(function(t) {
        t.classList.remove('tab--selected');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        var panelId = t.getAttribute('aria-controls');
        if (panelId) {
          var panel = container.querySelector('#' + panelId);
          if (panel) panel.hidden = true;
        }
      });
      tab.classList.add('tab--selected');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      var panelId = tab.getAttribute('aria-controls');
      if (panelId) {
        var panel = container.querySelector('#' + panelId);
        if (panel) panel.hidden = false;
      }
      updateSlider(group, true);
      scrollTabIntoView(tab);
    }

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        selectTab(tab);
      });
      tab.addEventListener('keydown', function(e) {
        var cur = tabs.indexOf(tab);
        var next = -1;
        if (isVertical) {
          if (e.key === 'ArrowDown') next = (cur + 1) % tabs.length;
          if (e.key === 'ArrowUp')   next = (cur - 1 + tabs.length) % tabs.length;
        } else {
          if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
          if (e.key === 'ArrowLeft')  next = (cur - 1 + tabs.length) % tabs.length;
        }
        if (e.key === 'Home') next = 0;
        if (e.key === 'End')  next = tabs.length - 1;
        if (next < 0) return;
        e.preventDefault();
        tabs[next].focus();
        scrollTabIntoView(tabs[next]);
      });
    });
  }

  function initTabScroller(scroller) {
    if (scroller.dataset.initTab) return;
    scroller.dataset.initTab = '1';
    var track = scroller.querySelector('.tab-scroller__track');
    var prevBtn = scroller.querySelector('.tab-scroller__btn--prev');
    var nextBtn = scroller.querySelector('.tab-scroller__btn--next');
    var isVertical = scroller.classList.contains('tab-scroller--vertical');

    function updateArrows() {
      var pos    = isVertical ? track.scrollTop  : track.scrollLeft;
      var maxPos = isVertical
        ? track.scrollHeight - track.clientHeight
        : track.scrollWidth  - track.clientWidth;
      prevBtn.classList.toggle('tab-scroller__btn--hidden', pos <= 0);
      nextBtn.classList.toggle('tab-scroller__btn--hidden', maxPos <= 0 || pos >= maxPos - 1);
    }

    prevBtn.addEventListener('click', function() {
      var amount = (isVertical ? track.clientHeight : track.clientWidth) * 0.5;
      track.scrollBy(isVertical ? { top: -amount, behavior: 'smooth' } : { left: -amount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function() {
      var amount = (isVertical ? track.clientHeight : track.clientWidth) * 0.5;
      track.scrollBy(isVertical ? { top: amount, behavior: 'smooth' } : { left: amount, behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateArrows);
    new ResizeObserver(updateArrows).observe(track);
    updateArrows();
  }

  /* 1) 모든 tab-group의 슬라이더 초기 위치 설정 (static·interactive 공통) */
  container.querySelectorAll('.tab-group').forEach(function(group) {
    updateSlider(group, false);          /* 항상 재측정·재배치 — 숨겨진 패널(offset 0)에서 초기화됐다가 보일 때 재init되면 슬라이더 복구 (dataset.initTab 삭제 불필요) */
    if (group.dataset.initTab) return;
    group.dataset.initTab = '1';
  });
  /* 2) interactive tablist에만 핸들러 부착 */
  container.querySelectorAll('.tab-group[role="tablist"]').forEach(initTabGroup);
  /* 3) overflow scroller 초기화 */
  container.querySelectorAll('.tab-scroller').forEach(initTabScroller);
}
if (window.__componentInits && !window.__componentInits.initTab) window.__componentInits.initTab = initTab;


/* ── Accordion ── */
function initAccordion(container) {
  container.querySelectorAll('.accordion__item').forEach(function(item) {
    if (item.dataset.initAccordion) return;
    item.dataset.initAccordion = '1';
    var header = item.querySelector('.accordion__header');
    if (!header) return;
    header.addEventListener('click', function() {
      var expanded = item.classList.toggle('accordion__item--expanded');
      header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });
}
if (window.__componentInits && !window.__componentInits.initAccordion) window.__componentInits.initAccordion = initAccordion;


/* ── Toast ── */
var ICONS = { info: 'icon-info', success: 'icon-circle-check', caution: 'icon-triangle-alert', error: 'icon-circle-x' };

function makeToast(style, title, message, actionLabel) {
  var cls = 'toast toast--visible' + (style !== 'info' ? ' toast--' + style : '');
  var toast = document.createElement('div');
  toast.className = cls;
  toast.innerHTML =
    '<span class="icon--md toast__icon" aria-hidden="true"><svg aria-hidden="true"><use href="#' + ICONS[style] + '"/></svg></span>' +
    '<div class="text-description toast__body">' +
      (title ? '<p class="toast__title">' + title + '</p>' : '') +
      '<p class="toast__message">' + message + '</p>' +
      (actionLabel ? '<div class="toast__action"><a class="link toast__action-link" href="#">' + actionLabel + '</a></div>' : '') +
    '</div>' +
    '<button class="icon-on--sm toast__close" type="button" aria-label="알림 닫기"><svg aria-hidden="true"><use href="#icon-close"/></svg></button>';
  if (style === 'error') toast.setAttribute('role', 'alert');
  toast.querySelector('.toast__close').addEventListener('click', function() { dismissToast(toast); });
  toast._timer = setTimeout(function() { dismissToast(toast); }, 4000);
  return toast;
}

function dismissToast(toast) {
  clearTimeout(toast._timer);
  toast.classList.remove('toast--visible');
  toast.classList.add('toast--hidden');
  toast.addEventListener('animationend', function() { toast.remove(); }, { once: true });
}


/* ── FileUpload ── */
/* FileUpload — 추가하기(파일 다이얼로그)·드래그&드롭·카드 그리드 생성·다운로드·삭제·용량 표시.
   .file-upload[data-max-mb]로 용량 한도(MB) 지정(없으면 용량 미적용).
   .file-upload[data-image-preview="<id>"]로 연동 라이트박스 지정(없으면 문서 내 첫 .image-preview).
   카드 썸네일 클릭 시 initImagePreview의 previewEl.open(src, name, {trigger, onDelete})을 호출한다.
   프로토타입에서 직접 구현하지 말고 이 함수에 위임한다. */
function initFileUpload(container) {
  container.querySelectorAll('.file-upload').forEach(function(fu) {
    if (fu.dataset.initFileUpload) return;
    fu.dataset.initFileUpload = '1';
    var input  = fu.querySelector('input[type="file"]');
    var addBtn = fu.querySelector('.file-upload__dropzone > .btn');
    var grid   = fu.querySelector('.file-upload__grid');
    var zone   = fu.querySelector('.file-upload__dropzone');
    var usage  = fu.querySelector('.file-upload__usage');
    var maxMb  = parseFloat(fu.dataset.maxMb);
    var hasCap = !isNaN(maxMb);
    var maxBytes = hasCap ? maxMb * 1024 * 1024 : Infinity;
    var total = 0;
    var preview = fu.dataset.imagePreview ? document.getElementById(fu.dataset.imagePreview) : document.querySelector('.image-preview');

    function fmt(b) {
      if (!b) return '0MB';
      if (b < 1024 * 1024) return Math.max(1, Math.round(b / 1024)) + 'KB';   /* 1MB 미만은 KB로 — 작은 파일도 변화가 보이도록 */
      return (b / (1024 * 1024)).toFixed(1) + 'MB';
    }
    function syncUsage() { if (usage) usage.textContent = fmt(total) + (hasCap ? ' / ' + maxMb + 'MB' : ''); }
    function syncCapacity() {
      if (!hasCap) return;
      var full = total >= maxBytes;
      fu.classList.toggle('file-upload--capacity-full', full);
      if (addBtn) {
        addBtn.disabled = full;
        addBtn.classList.toggle('btn--disabled', full);
        if (full) { addBtn.setAttribute('aria-disabled', 'true'); addBtn.setAttribute('tabindex', '-1'); }
        else { addBtn.removeAttribute('aria-disabled'); addBtn.removeAttribute('tabindex'); }
      }
    }
    function removeItem(item, size) { total -= (size || 0); item.remove(); syncUsage(); syncCapacity(); }
    function addCard(file) {
      if (!grid) return;
      var reader = new FileReader();
      reader.onload = function(e) {
        var src = e.target.result;
        /* 이미지만 썸네일이다. 그 외에는 확장자를 글자로 — data URI를 그대로 <img>에 넣으면
           pdf·hwp·xlsx가 깨진 이미지 아이콘으로 나온다. 판정은 MIME(file.type)으로 한다,
           확장자 문자열이 아니라 — 확장자는 사용자가 바꿔 붙일 수 있다. */
        var isImage = file.type.indexOf('image/') === 0;
        var ext = (file.name.indexOf('.') > 0 ? file.name.split('.').pop() : 'FILE').toUpperCase();
        var item = document.createElement('div');
        item.className = 'file-upload-item';
        item.innerHTML =
          '<p class="text-form-label file-upload-item__name" title="' + file.name + '">' + file.name + '</p>' +
          '<div class="file-upload-item__preview"' + (isImage ? ' style="cursor:pointer"' : '') + '>' +
            (isImage
              ? '<img src="' + src + '" class="file-upload-item__thumb" alt="">' +
                '<div class="file-upload-item__overlay" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-search"/></svg></div>'
              : '<span class="file-upload-item__ext" aria-hidden="true">' + ext + '</span>') +
          '</div>' +
          '<div class="file-upload-item__actions">' +
            '<button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="다운로드"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-download"/></svg></span></button>' +
            '<button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="삭제"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-delete"/></svg></span></button>' +
          '</div>';
        var prev = item.querySelector('.file-upload-item__preview');
        /* 라이트박스는 이미지에만 연다 — 열어봐야 볼 것이 없는 파일에 확대 인터랙션을 붙이면
           눌리는데 아무 일도 안 일어난다. 다운로드 버튼은 모든 파일에서 그대로 동작한다. */
        if (isImage) {
          /* 그릴 수 있는 이미지로 판명될 때까지는 열지 않는다 — 아래 error에서 내려간다. */
          var canPreview = true;
          prev.addEventListener('click', function() {
            if (!canPreview) return;
            if (preview && typeof preview.open === 'function') {
              preview.open(src, file.name, { trigger: prev, onDelete: function() { removeItem(item, file.size); } });
            }
          });
          /* MIME은 image/*인데 브라우저가 못 그리는 형식(HEIC 등)이 있다 —
             그때도 깨진 아이콘 대신 확장자로 떨어지고, 라이트박스도 함께 닫는다.
             보이는 것만 바꾸고 리스너를 남기면 눌리는데 빈 라이트박스가 열린다. */
          var thumb = item.querySelector('.file-upload-item__thumb');
          thumb.addEventListener('error', function() {
            canPreview = false;
            prev.removeAttribute('style');
            prev.innerHTML = '<span class="file-upload-item__ext" aria-hidden="true">' + ext + '</span>';
          });
        }
        item.querySelector('[aria-label="다운로드"]').addEventListener('click', function() {
          var a = document.createElement('a'); a.href = src; a.download = file.name; a.click();
        });
        item.querySelector('[aria-label="삭제"]').addEventListener('click', function() { removeItem(item, file.size); });
        grid.appendChild(item);
        total += file.size; syncUsage(); syncCapacity();
      };
      reader.readAsDataURL(file);
    }

    if (addBtn && input) addBtn.addEventListener('click', function() { input.click(); });
    if (input) input.addEventListener('change', function() { Array.from(input.files).forEach(addCard); input.value = ''; });
    if (zone) {
      zone.addEventListener('dragover', function(e) { e.preventDefault(); fu.classList.add('file-upload--drag-over'); });
      zone.addEventListener('dragleave', function(e) { if (!zone.contains(e.relatedTarget)) fu.classList.remove('file-upload--drag-over'); });
      zone.addEventListener('drop', function(e) {
        e.preventDefault();
        fu.classList.remove('file-upload--drag-over');
        if (!fu.classList.contains('file-upload--capacity-full')) Array.from(e.dataTransfer.files).forEach(addCard);
      });
    }
    syncUsage(); syncCapacity();
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initFileUpload) window.__componentInits.initFileUpload = initFileUpload;


/* ── ImagePreview ── */
/* ImagePreview — 라이트박스: 열기/닫기, 줌(50~300%, 25% 단위), 다운로드, 삭제, Escape, 포커스 복귀.
   각 .image-preview에 .open(src, name, opts)·.close()를 부여한다.
   opts = { trigger: 닫을 때 포커스 복귀 대상, onDelete: 삭제 버튼 콜백(예: 파일 카드 제거) }.
   선언적 트리거: [data-image-preview="<preview-id>"] 클릭 시 해당 프리뷰를 그 요소의 <img> src로 연다.
   프로토타입에서 직접 구현하지 말고 이 함수에 위임한다.
   버튼 셀렉터: topbar-actions의 순서(다운로드·삭제·닫기) + toolbar의 aria-label(축소·확대). 마크업 순서를 지킬 것. */
function initImagePreview(container) {
  container.querySelectorAll('.image-preview').forEach(function(el) {
    if (el.dataset.initImagePreview) return;
    el.dataset.initImagePreview = '1';
    var img       = el.querySelector('.image-preview__img');
    var scrim     = el.querySelector('.image-preview__scrim');
    var filename  = el.querySelector('.image-preview__filename');
    var zoomLabel = el.querySelector('.image-preview__zoom-label');
    var topBtns   = el.querySelectorAll('.image-preview__topbar-actions button');
    var download  = topBtns[0], delBtn = topBtns[1], closeBtn = topBtns[2];
    var zoomOut   = el.querySelector('.image-preview__toolbar [aria-label="축소"]');
    var zoomIn    = el.querySelector('.image-preview__toolbar [aria-label="확대"]');
    var scale = 1, baseW = 0, baseH = 0, MIN = 0.5, MAX = 3, STEP = 0.25, GAP = 96;
    var triggerEl = null, onDelete = null;

    function calcBase() {
      if (!img) return;
      var maxW = window.innerWidth * 0.9, maxH = (window.innerHeight - GAP) * 0.9;
      var r = img.naturalWidth / img.naturalHeight;
      if (img.naturalWidth / maxW > img.naturalHeight / maxH) { baseW = Math.min(img.naturalWidth, maxW); baseH = baseW / r; }
      else { baseH = Math.min(img.naturalHeight, maxH); baseW = baseH * r; }
    }
    function setDisabled(btn, off) {
      if (!btn) return;
      btn.disabled = off;
      btn.classList.toggle('btn--disabled', off);
      if (off) { btn.setAttribute('aria-disabled', 'true'); btn.setAttribute('tabindex', '-1'); }
      else { btn.removeAttribute('aria-disabled'); btn.removeAttribute('tabindex'); }
    }
    function updateZoom() {
      if (img) { img.style.width = Math.round(baseW * scale) + 'px'; img.style.height = Math.round(baseH * scale) + 'px'; }
      if (zoomLabel) zoomLabel.textContent = Math.round(scale * 100) + '%';
      setDisabled(zoomIn, scale >= MAX);
      setDisabled(zoomOut, scale <= MIN);
    }
    function close() {
      el.classList.remove('image-preview--visible');
      document.body.style.overflow = '';
      var t = triggerEl; triggerEl = null; onDelete = null;
      if (t) t.focus();
    }
    el.open = function(src, name, opts) {
      opts = opts || {};
      triggerEl = opts.trigger || null;
      onDelete  = opts.onDelete || null;
      if (img) {
        img.src = src; img.style.width = img.style.height = '';
        img.onload = function() { scale = 1; calcBase(); updateZoom(); };
      }
      if (filename) filename.textContent = name || 'image';
      el.classList.add('image-preview--visible');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    };
    el.close = close;

    if (scrim)    scrim.addEventListener('click', close);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (delBtn)   delBtn.addEventListener('click', function() { if (onDelete) onDelete(); close(); });
    if (download) download.addEventListener('click', function() {
      if (!img) return;
      var a = document.createElement('a'); a.href = img.src; a.download = filename ? filename.textContent : 'image'; a.click();
    });
    if (zoomIn)  zoomIn.addEventListener('click', function() { if (scale < MAX) { scale = Math.min(MAX, +(scale + STEP).toFixed(2)); updateZoom(); } });
    if (zoomOut) zoomOut.addEventListener('click', function() { if (scale > MIN) { scale = Math.max(MIN, +(scale - STEP).toFixed(2)); updateZoom(); } });
  });

  /* `[data-image-preview]`는 **트리거**를 뜻한다 — 누르면 라이트박스가 열린다.
     단, `.file-upload`에서는 같은 속성이 **연동할 라이트박스의 id**를 가리키는 설정값이라
     (file-upload.md 참조) 트리거로 잡으면 안 된다. 클릭이 카드에서 위로 올라와
     업로드 영역 전체가 트리거가 되고, **csv·html처럼 볼 것이 없는 카드를 눌러도**
     그 안의 첫 이미지(또는 빈 src)로 라이트박스가 열린다. 실제로 그렇게 열리고 있었다.
     FileUpload는 자기 카드에 직접 리스너를 달아 **이미지 카드에서만** 연다(initFileUpload). */
  container.querySelectorAll('[data-image-preview]:not(.file-upload)').forEach(function(trig) {
    if (trig.dataset.initImagePreviewTrig) return;
    trig.dataset.initImagePreviewTrig = '1';
    trig.addEventListener('click', function() {
      var pv = document.getElementById(trig.dataset.imagePreview);
      if (!pv || typeof pv.open !== 'function') return;
      var im = trig.matches('img') ? trig : trig.querySelector('img');
      pv.open(im ? im.src : (trig.dataset.src || ''), trig.dataset.filename || (im && im.alt) || 'image', { trigger: trig });
    });
  });

  if (!container.__initImagePreviewEsc) {
    container.__initImagePreviewEsc = true;
    document.addEventListener('keydown', function(e) {
      if (e.key !== 'Escape') return;
      container.querySelectorAll('.image-preview--visible').forEach(function(el) { if (typeof el.close === 'function') el.close(); });
    });
  }
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initImagePreview) window.__componentInits.initImagePreview = initImagePreview;


/* ── Breadcrumb ── */
function initBreadcrumb(container) {
  var btn = container.querySelector('#bc-ellipsis');
  if (!btn || btn.hasAttribute('data-init-breadcrumb')) return;
  btn.setAttribute('data-init-breadcrumb', '');
  btn.addEventListener('click', function() {
    btn.setAttribute('aria-expanded', 'true'); /* 스크린리더가 상태 변화 인지 후 제거 */
    var hidden = container.querySelectorAll('.breadcrumb__item--hidden');
    hidden.forEach(function(item) { item.classList.remove('breadcrumb__item--hidden'); });
    /* 버튼 li(ellipsis + sep) 제거 */
    btn.closest('.breadcrumb__item').remove();
  });
}

if (window.__componentInits && !window.__componentInits.initBreadcrumb) window.__componentInits.initBreadcrumb = initBreadcrumb;


/* ── Pagination ── */
function initPagination(container) {
  var nav = container.querySelector('#pg-demo');
  if (!nav || nav.hasAttribute('data-init-pagination')) return;
  nav.setAttribute('data-init-pagination', '');

  var TOTAL = 12;
  var current = 3;
  var prevBtn = container.querySelector('#pg-prev');
  var nextBtn = container.querySelector('#pg-next');

  /* simple */
  var spPrev = container.querySelector('#sp-prev');
  var spNext = container.querySelector('#sp-next');
  var spText = container.querySelector('#sp-text');
  var spCurrent = 1;

  function renderSimple() {
    spText.textContent = spCurrent + ' / ' + TOTAL;
    spPrev.disabled = spCurrent === 1;
    spNext.disabled = spCurrent === TOTAL;
  }

  spPrev.addEventListener('click', function() { if (spCurrent > 1) { spCurrent--; renderSimple(); } });
  spNext.addEventListener('click', function() { if (spCurrent < TOTAL) { spCurrent++; renderSimple(); } });
  renderSimple();

  function pages(cur, total) {
    var show = new Set([1, total, cur - 1, cur, cur + 1].filter(function(p) { return p >= 1 && p <= total; }));
    var sorted = Array.from(show).sort(function(a, b) { return a - b; });
    var result = [];
    sorted.forEach(function(p, i) {
      if (i > 0 && p - sorted[i - 1] > 1) result.push('…');
      result.push(p);
    });
    return result;
  }

  function render() {
    /* 이전·다음 버튼 사이의 페이지 버튼만 제거 */
    nav.querySelectorAll('.pagination__page, .pagination__ellipsis').forEach(function(el) { el.remove(); });
    pages(current, TOTAL).forEach(function(p) {
      var el;
      if (p === '…') {
        el = document.createElement('span');
        el.className = 'pagination__ellipsis';
        el.setAttribute('aria-hidden', 'true');
        el.textContent = '…';
      } else {
        el = document.createElement('button');
        el.className = 'pagination__page';
        el.type = 'button';
        el.textContent = p;
        if (p === current) {
          el.classList.add('pagination__page--current');
          el.setAttribute('aria-current', 'page');
        } else {
          el.addEventListener('click', function() { current = p; render(); });
        }
      }
      nav.insertBefore(el, nextBtn);
    });
    prevBtn.disabled = current === 1;
    nextBtn.disabled = current === TOTAL;
  }

  prevBtn.addEventListener('click', function() { if (current > 1) { current--; render(); } });
  nextBtn.addEventListener('click', function() { if (current < TOTAL) { current++; render(); } });
  render();
}

if (window.__componentInits && !window.__componentInits.initPagination) window.__componentInits.initPagination = initPagination;


/* ── Stepper ── */
/* initStepper(container): container 안의 모든 .stepper 초기화.
   data-min·data-max·data-step으로 범위·증감 폭 지정(생략 시 무제한·step 1).
   data-format="time"이면 내부 값(분)을 HH:MM으로 표시·입력한다.
   경계값 도달 시 해당 방향 버튼 disabled, blur 시 clamp 정규화, ↑/↓ 키 지원. */
function initStepper(container) {
  container.querySelectorAll('.stepper').forEach(function(root) {
    if (root.dataset.initStepper) return;
    root.dataset.initStepper = '1';

    var input = root.querySelector('.stepper__value');
    var minusBtn = root.querySelector('.stepper__btn--minus');
    var plusBtn = root.querySelector('.stepper__btn--plus');
    if (!input || !minusBtn || !plusBtn) return;

    var min = root.dataset.min !== undefined ? Number(root.dataset.min) : -Infinity;
    var max = root.dataset.max !== undefined ? Number(root.dataset.max) : Infinity;
    var step = root.dataset.step !== undefined ? Number(root.dataset.step) : 1;
    var format = root.dataset.format || 'number';
    var fullDisabled = root.classList.contains('stepper--disabled');

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    /* 내부 숫자값 → 표시 문자열 */
    function fmt(v) {
      if (format === 'time') return pad(Math.floor(v / 60)) + ':' + pad(v % 60);
      return String(v);
    }
    /* 표시 문자열 → 내부 숫자값 */
    function parse(str) {
      if (format === 'time') {
        var m = /^(\d{1,2})\s*:\s*(\d{1,2})$/.exec(String(str).trim());
        return m ? Number(m[1]) * 60 + Number(m[2]) : NaN;
      }
      return parseFloat(str);
    }

    if (isFinite(min)) input.setAttribute('aria-valuemin', min);
    if (isFinite(max)) input.setAttribute('aria-valuemax', max);

    function clamp(v) {
      if (isNaN(v)) v = isFinite(min) ? min : 0;
      if (v < min) v = min;
      if (v > max) v = max;
      return v;
    }
    function current() { return clamp(parse(input.value)); }
    function render(v) {
      input.value = fmt(v);
      input.setAttribute('aria-valuenow', v);
      if (format === 'time') input.setAttribute('aria-valuetext', fmt(v));
      if (fullDisabled) return;
      minusBtn.disabled = v <= min;
      plusBtn.disabled = v >= max;
    }

    render(current());
    if (fullDisabled) return;

    minusBtn.addEventListener('click', function() { render(clamp(current() - step)); input.focus(); });
    plusBtn.addEventListener('click', function() { render(clamp(current() + step)); input.focus(); });
    input.addEventListener('blur', function() { render(current()); });
    input.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowUp') { e.preventDefault(); render(clamp(current() + step)); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); render(clamp(current() - step)); }
    });
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initStepper) window.__componentInits.initStepper = initStepper;


/* ── Steps ── */
function initSteps(container) {
  var list = container.querySelector('#st-demo');
  if (!list || list.hasAttribute('data-init-steps')) return;
  list.setAttribute('data-init-steps', '');

  var items = container.querySelectorAll('#st-demo .steps__item');
  var prevBtn = container.querySelector('#st-prev');
  var nextBtn = container.querySelector('#st-next');
  var current = 1;
  var CHECK = '<svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="#icon-check"/></svg>';

  function update() {
    items.forEach(function(item, i) {
      item.classList.remove('steps__item--complete', 'steps__item--current');
      item.removeAttribute('aria-current');
      var node = item.querySelector('.steps__node');
      if (i < current) {
        item.classList.add('steps__item--complete');
        node.innerHTML = CHECK;
      } else if (i === current) {
        item.classList.add('steps__item--current');
        item.setAttribute('aria-current', 'step');
        node.innerHTML = '<span aria-hidden="true">' + (i + 1) + '</span>';
      } else {
        node.innerHTML = '<span aria-hidden="true">' + (i + 1) + '</span>';
      }
    });
    prevBtn.disabled = current === 0;
    nextBtn.textContent = current === items.length - 1 ? '완료' : '다음';
  }

  prevBtn.addEventListener('click', function() { if (current > 0) { current--; update(); } });
  nextBtn.addEventListener('click', function() { if (current < items.length - 1) { current++; update(); } });
  update();
}

if (window.__componentInits && !window.__componentInits.initSteps) window.__componentInits.initSteps = initSteps;


/* ── DatePicker ── */
/* DatePicker 완전 초기화 — single/range 자동 감지, 패널 생성, 달력 렌더링, 날짜 선택 */
function initDP(dp) {
  var isRange = dp.classList.contains('dp--range');
  var today = new Date(); today.setHours(0,0,0,0);
  var trigger = dp.querySelector('.dp__trigger');
  var parts = dp.querySelectorAll('.dp__value-part');
  var dpField = dp.closest ? dp.closest('.form-field') : null;
  var errorInner = dp.querySelector('.form-field__error');
  function pad(n){return n<10?'0'+n:''+n;}
  function isSame(a,b){return a&&b&&a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}
  function fromKey(k){var p=k.split(',');return new Date(+p[0],+p[1],+p[2]);}
  function setInnerError(msg){dp.classList.add('dp--error');if(errorInner)errorInner.textContent=msg;}
  function clearInnerError(){dp.classList.remove('dp--error');if(errorInner)errorInner.textContent='';}
  function setFieldError(show){
    if(dpField){dpField.classList.toggle('form-field--error',show);var outerErr=dpField.querySelector(':scope > .form-field__footer .form-field__error');if(outerErr)outerErr.textContent=show?outerErr.textContent||'입력해 주세요.':'';}
    if(show){trigger.setAttribute('aria-invalid','true');}else{trigger.removeAttribute('aria-invalid');}
  }

  if(isRange){
    var sYrEl=parts[0],sMoEl=parts[1],sDyEl=parts[2],eYrEl=parts[3],eMoEl=parts[4],eDyEl=parts[5];
    var rangeStart=null,rangeEnd=null,hoverDate=null;
    var baseYear=today.getFullYear(),baseMonth=today.getMonth();
    function isValidDate(y,m,d){if(isNaN(y)||isNaN(m)||isNaN(d))return false;var dt=new Date(y,m-1,d);return!isNaN(dt.getTime())&&dt.getMonth()===m-1&&dt.getDate()===d;}
    function isBetween(d,s,e){if(!s||!e)return false;var lo=s<e?s:e,hi=s<e?e:s;return d>lo&&d<hi;}
    /* panel */
    var panel=document.createElement('div');
    panel.className='dp__panel dp__panel--scroll';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','기간 선택');panel.setAttribute('aria-multiselectable','true');panel.setAttribute('hidden','');
    panel.style.position='fixed';panel.style.zIndex='1000';
    panel.innerHTML='<div class="dp__sticky-header"><div class="dp__header">'
      +'<button class="dp__nav-btn" type="button" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-chevron-left"/></svg></span></button>'
      +'<div class="dp__select-group" aria-live="polite" aria-atomic="true"><input class="dp__select-input" type="number" min="1990" max="'+(today.getFullYear()+10)+'" aria-label="연도"><span class="dp__select-label">년</span><input class="dp__select-input dp__select-input--month" type="number" min="1" max="12" aria-label="월"><span class="dp__select-label">월</span><button class="btn btn--secondary btn--solid btn--sm" type="button">오늘</button></div>'
      +'<button class="dp__nav-btn" type="button" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-chevron-right"/></svg></span></button>'
      +'</div><div class="dp__weekday-bar"><span class="cal__weekday" role="columnheader">일</span><span class="cal__weekday" role="columnheader">월</span><span class="cal__weekday" role="columnheader">화</span><span class="cal__weekday" role="columnheader">수</span><span class="cal__weekday" role="columnheader">목</span><span class="cal__weekday" role="columnheader">금</span><span class="cal__weekday" role="columnheader">토</span></div></div>'
      +'<div class="dp__scroll-inner"><div class="dp__scroll-body"></div></div>';
    document.body.appendChild(panel);
    var scrollInner=panel.querySelector('.dp__scroll-inner'),scrollBody=panel.querySelector('.dp__scroll-body');
    var yearInput=panel.querySelector('.dp__select-input:not(.dp__select-input--month)'),monthInput=panel.querySelector('.dp__select-input--month');
    var navBtns=panel.querySelectorAll('.dp__nav-btn'),todayBtn=panel.querySelector('.btn');
    function makeBtn(d,mm){
      var outside=d.getMonth()!==mm,awaitingEnd=rangeStart&&!rangeEnd;
      var disabled=!outside&&awaitingEnd&&!isSame(d,rangeStart)&&d<rangeStart,inactive=outside||disabled;
      var isStart=isSame(d,rangeStart),isEnd=isSame(d,rangeEnd),inRange=isBetween(d,rangeStart,rangeEnd);
      var effectiveEnd=rangeEnd||hoverDate,goLeft=effectiveEnd&&effectiveEnd<rangeStart;
      var isPreview=!rangeEnd&&rangeStart&&hoverDate&&isBetween(d,rangeStart,hoverDate);
      var isHoverEnd=!rangeEnd&&rangeStart&&hoverDate&&!isStart&&isSame(d,hoverDate);
      var btn=document.createElement('button');btn.setAttribute('role','gridcell');btn.setAttribute('type','button');
      btn.dataset.date=d.getFullYear()+','+d.getMonth()+','+d.getDate();
      if(inactive)btn.dataset.inactive='true';
      var cls=['cal__day'];
      if(outside)cls.push('cal__day--outside');if(disabled)cls.push('cal__day--disabled');
      if(!outside&&isSame(d,today)){cls.push('cal__day--today');btn.setAttribute('aria-current','date');}
      if(isStart){if(!effectiveEnd)cls.push('cal__day--range-solo');else if(rangeEnd)cls.push(goLeft?'cal__day--range-start-left':'cal__day--range-start');else cls.push(goLeft?'cal__day--range-start-left-pre':'cal__day--range-start-pre');}
      if(isEnd)cls.push('cal__day--range-end');if(inRange)cls.push('cal__day--in-range');if(isPreview)cls.push('cal__day--in-range-preview');if(isHoverEnd)cls.push(goLeft?'cal__day--hover-end-left':'cal__day--hover-end');
      if(isStart||isEnd||inRange)btn.setAttribute('aria-selected','true');
      btn.className=cls.join(' ');btn.setAttribute('tabindex',(isStart||isEnd)&&!inactive?'0':'-1');btn.textContent=d.getDate();return btn;
    }
    function renderSection(my,mm){
      var section=document.createElement('div');section.className='dp__month-section';section.dataset.year=my;section.dataset.month=mm;
      var hdr=document.createElement('div');hdr.className='dp__month-divider';hdr.textContent=my+'년 '+(mm+1)+'월';section.appendChild(hdr);
      var calDiv=document.createElement('div');calDiv.className='cal';
      var gridDiv=document.createElement('div');gridDiv.className='cal__grid';gridDiv.setAttribute('role','grid');gridDiv.setAttribute('aria-label',my+'년 '+(mm+1)+'월');gridDiv.setAttribute('aria-multiselectable','true');
      var weeksDiv=document.createElement('div');
      var first=new Date(my,mm,1),last=new Date(my,mm+1,0),cur=new Date(first);cur.setDate(cur.getDate()-cur.getDay());
      while(cur<=last||cur.getDay()!==0){var row=document.createElement('div');row.className='cal__week';row.setAttribute('role','row');for(var i=0;i<7;i++){row.appendChild(makeBtn(new Date(cur),mm));cur.setDate(cur.getDate()+1);}weeksDiv.appendChild(row);if(cur>last&&cur.getDay()===0)break;}
      gridDiv.appendChild(weeksDiv);calDiv.appendChild(gridDiv);section.appendChild(calDiv);return section;
    }
    function updateClasses(){
      var btns=Array.prototype.slice.call(scrollBody.querySelectorAll('.cal__day')),awaitingEnd=rangeStart&&!rangeEnd;
      var rangeCls=['cal__day--range-solo','cal__day--range-start','cal__day--range-start-left','cal__day--range-start-pre','cal__day--range-start-left-pre','cal__day--range-end','cal__day--in-range','cal__day--in-range-preview','cal__day--hover-end','cal__day--hover-end-left'];
      btns.forEach(function(btn){
        rangeCls.forEach(function(c){btn.classList.remove(c);});btn.removeAttribute('aria-selected');
        var d=fromKey(btn.dataset.date),outside=btn.classList.contains('cal__day--outside');
        var beforeStart=!outside&&awaitingEnd&&!isSame(d,rangeStart)&&d<rangeStart;
        btn.classList.toggle('cal__day--disabled',!outside&&!!beforeStart);
        if(!outside){if(beforeStart)btn.dataset.inactive='true';else delete btn.dataset.inactive;}
        if(btn.dataset.inactive)return;
        var isStart=isSame(d,rangeStart),isEnd=isSame(d,rangeEnd),inRange=isBetween(d,rangeStart,rangeEnd);
        var effectiveEnd=rangeEnd||hoverDate,goLeft=effectiveEnd&&effectiveEnd<rangeStart;
        var isPreview=!rangeEnd&&rangeStart&&hoverDate&&isBetween(d,rangeStart,hoverDate);
        var isHoverEnd=!rangeEnd&&rangeStart&&hoverDate&&!isStart&&isSame(d,hoverDate);
        if(isStart){if(!effectiveEnd)btn.classList.add('cal__day--range-solo');else if(rangeEnd)btn.classList.add(goLeft?'cal__day--range-start-left':'cal__day--range-start');else btn.classList.add(goLeft?'cal__day--range-start-left-pre':'cal__day--range-start-pre');}
        if(isEnd)btn.classList.add('cal__day--range-end');if(inRange)btn.classList.add('cal__day--in-range');if(isPreview)btn.classList.add('cal__day--in-range-preview');if(isHoverEnd)btn.classList.add(goLeft?'cal__day--hover-end-left':'cal__day--hover-end');
        if(isStart||isEnd||inRange)btn.setAttribute('aria-selected','true');
      });
    }
    function updateValue(){
      if(rangeStart){sYrEl.value=String(rangeStart.getFullYear());sMoEl.value=pad(rangeStart.getMonth()+1);sDyEl.value=pad(rangeStart.getDate());}else{sYrEl.value=sMoEl.value=sDyEl.value='';}
      if(rangeEnd){eYrEl.value=String(rangeEnd.getFullYear());eMoEl.value=pad(rangeEnd.getMonth()+1);eDyEl.value=pad(rangeEnd.getDate());dp.classList.add('dp--has-value');}else{eYrEl.value=eMoEl.value=eDyEl.value='';dp.classList.remove('dp--has-value');}
    }
    function updateActive(){
      var sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section')),active=sections[0];
      sections.forEach(function(s){if(s.offsetTop-scrollInner.offsetTop<=scrollInner.scrollTop+40)active=s;});
      sections.forEach(function(s){s.classList.toggle('dp__month-section--active',s===active);});
      if(active){yearInput.value=active.dataset.year;monthInput.value=+active.dataset.month+1;}
    }
    function jumpTo(y,m){
      scrollBody.innerHTML='';
      for(var i=-3;i<13;i++){var mm=m+i,my=y;while(mm<0){mm+=12;my--;}while(mm>11){mm-=12;my++;}scrollBody.appendChild(renderSection(my,mm));}
      requestAnimationFrame(function(){var secs=scrollBody.querySelectorAll('.dp__month-section');scrollInner.scrollTop=secs[3]?secs[3].offsetTop-scrollInner.offsetTop:0;updateActive();});
    }
    function firstSection(){return scrollBody.querySelector('.dp__month-section');}
    function lastSection(){var all=scrollBody.querySelectorAll('.dp__month-section');return all[all.length-1];}
    function prependMonth(){var f=firstSection(),y=+f.dataset.year,m=+f.dataset.month-1;if(m<0){m=11;y--;}var prevH=scrollBody.offsetHeight;scrollBody.insertBefore(renderSection(y,m),f);scrollInner.scrollTop+=scrollBody.offsetHeight-prevH;}
    function appendMonth(){var l=lastSection(),y=+l.dataset.year,m=+l.dataset.month+1;if(m>11){m=0;y++;}scrollBody.appendChild(renderSection(y,m));}
    function positionPanel(){var r=trigger.getBoundingClientRect(),panelH=panel.offsetHeight,spaceBelow=window.innerHeight-r.bottom;if(panelH>spaceBelow&&r.top>panelH)panel.style.top=(r.top-panelH-4)+'px';else panel.style.top=(r.bottom+4)+'px';panel.style.left=r.left+'px';}
    function applyRangeParts(writeBack){
      var sy=parseInt(sYrEl.value,10),sm=parseInt(sMoEl.value,10),sd=parseInt(sDyEl.value,10);
      var ey=parseInt(eYrEl.value,10),em=parseInt(eMoEl.value,10),ed=parseInt(eDyEl.value,10);
      var hasStart=sYrEl.value||sMoEl.value||sDyEl.value,hasEnd=eYrEl.value||eMoEl.value||eDyEl.value;
      clearInnerError();
      if(hasStart){if(!isValidDate(sy,sm,sd)){if(writeBack)setInnerError('시작 날짜가 유효하지 않습니다.');rangeStart=null;updateClasses();return false;}rangeStart=new Date(sy,sm-1,sd);}else rangeStart=null;
      if(hasEnd){if(!isValidDate(ey,em,ed)){if(writeBack)setInnerError('종료 날짜가 유효하지 않습니다.');rangeEnd=null;updateClasses();return false;}rangeEnd=new Date(ey,em-1,ed);}else rangeEnd=null;
      if(rangeStart&&rangeEnd&&rangeEnd<rangeStart){var t=rangeStart;rangeStart=rangeEnd;rangeEnd=t;}
      if(writeBack)updateValue();updateClasses();return !!(rangeStart&&rangeEnd);
    }
    function pickDate(date){
      if(!rangeStart||rangeEnd){rangeStart=date;rangeEnd=null;hoverDate=null;}
      else if(isSame(rangeStart,date)){rangeStart=null;hoverDate=null;}
      else{rangeEnd=date;if(rangeEnd<rangeStart){var t=rangeStart;rangeStart=rangeEnd;rangeEnd=t;}hoverDate=null;updateValue();updateClasses();setFieldError(false);close();return;}
      updateValue();updateClasses();
    }
    function scrollToSection(offset){
      var sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section')),activeIdx=0;
      sections.forEach(function(s,i){if(s.classList.contains('dp__month-section--active'))activeIdx=i;});
      if(offset===-1&&activeIdx===0){prependMonth();sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section'));activeIdx=1;}
      if(offset===1&&activeIdx===sections.length-1){appendMonth();sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section'));}
      var target=sections[activeIdx+offset];if(target)scrollInner.scrollTop=target.offsetTop-scrollInner.offsetTop;
    }
    function onAnyScroll(){if(isOpen())close();}
    function open(){
      applyRangeParts();var ay=rangeStart?rangeStart.getFullYear():baseYear,am=rangeStart?rangeStart.getMonth():baseMonth;
      if(!scrollBody.children.length){for(var i=-3;i<13;i++){var mm=am+i,my=ay;while(mm<0){mm+=12;my--;}while(mm>11){mm-=12;my++;}scrollBody.appendChild(renderSection(my,mm));}}
      document.addEventListener('scroll',onAnyScroll,true);panel.removeAttribute('hidden');dp.classList.add('dp--open');positionPanel();
      requestAnimationFrame(function(){var secs=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section')),cur=null;secs.forEach(function(s){if(+s.dataset.year===ay&&+s.dataset.month===am)cur=s;});if(cur)scrollInner.scrollTop=cur.offsetTop-scrollInner.offsetTop;else jumpTo(ay,am);updateActive();});
    }
    function close(){document.removeEventListener('scroll',onAnyScroll,true);panel.setAttribute('hidden','');dp.classList.remove('dp--open');hoverDate=null;setFieldError(!dp.classList.contains('dp--has-value'));}
    function isOpen(){return!panel.hasAttribute('hidden');}
    trigger.addEventListener('click',function(){if(!isOpen())open();});
    trigger.querySelector('.dp__chevron').addEventListener('click',function(e){e.stopPropagation();isOpen()?close():open();});
    function makeAdv(el,maxLen,nextEl){el.addEventListener('input',function(){el.value=el.value.replace(/\D/g,'').slice(0,maxLen);if(nextEl&&el.value.length===maxLen)nextEl.focus();});}
    makeAdv(sYrEl,4,sMoEl);makeAdv(sMoEl,2,sDyEl);makeAdv(sDyEl,2,eYrEl);makeAdv(eYrEl,4,eMoEl);makeAdv(eMoEl,2,eDyEl);makeAdv(eDyEl,2,null);
    [sYrEl,sMoEl,sDyEl,eYrEl,eMoEl,eDyEl].forEach(function(el){
      el.addEventListener('input',function(){clearInnerError();if(isOpen()){applyRangeParts();var y=parseInt(sYrEl.value,10),m=parseInt(sMoEl.value,10);if(sYrEl.value.length===4&&!isNaN(y)&&sMoEl.value.length>=1&&!isNaN(m)&&m>=1&&m<=12)jumpTo(y,m-1);}});
      el.addEventListener('blur',function(){setTimeout(function(){if(dp.contains(document.activeElement)||panel.contains(document.activeElement))return;applyRangeParts(true);if(isOpen())close();},0);});
      el.addEventListener('keydown',function(e){if(e.key==='Escape'){close();el.blur();}if(e.key==='Enter'){e.preventDefault();el.blur();}});
    });
    scrollBody.addEventListener('click',function(e){var btn=e.target.closest?e.target.closest('.cal__day'):e.target;if(!btn||btn.dataset.inactive)return;e.stopPropagation();pickDate(fromKey(btn.dataset.date));});
    scrollBody.addEventListener('mouseover',function(e){var btn=e.target.closest?e.target.closest('.cal__day'):e.target;if(!btn||btn.dataset.inactive||!rangeStart||rangeEnd)return;var d=fromKey(btn.dataset.date);if(!isSame(d,hoverDate)){hoverDate=d;updateClasses();}});
    scrollInner.addEventListener('scroll',function(){updateActive();if(scrollInner.scrollTop<120)prependMonth();if(scrollInner.scrollTop+scrollInner.clientHeight>scrollInner.scrollHeight-120)appendMonth();});
    navBtns[0].addEventListener('click',function(e){e.stopPropagation();scrollToSection(-1);});
    navBtns[1].addEventListener('click',function(e){e.stopPropagation();scrollToSection(1);});
    todayBtn.addEventListener('click',function(e){e.stopPropagation();jumpTo(today.getFullYear(),today.getMonth());});
    yearInput.addEventListener('click',function(e){e.stopPropagation();});monthInput.addEventListener('click',function(e){e.stopPropagation();});
    yearInput.addEventListener('blur',function(){var y=parseInt(yearInput.value,10);var active=scrollBody.querySelector('.dp__month-section--active');var curM=active?+active.dataset.month:baseMonth;if(!isNaN(y)&&y>=1990&&y<=today.getFullYear()+10)jumpTo(y,curM);else yearInput.value=active?active.dataset.year:baseYear;});
    monthInput.addEventListener('blur',function(){var m=parseInt(monthInput.value,10);var active=scrollBody.querySelector('.dp__month-section--active');var curY=active?+active.dataset.year:baseYear;if(!isNaN(m)&&m>=1&&m<=12)jumpTo(curY,m-1);else monthInput.value=active?+active.dataset.month+1:baseMonth+1;});
    document.addEventListener('click',function(e){if(!dp.contains(e.target)&&!panel.contains(e.target)){if(isOpen())close();}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(isOpen())close();}});

  } else {
    /* single */
    var yrEl=parts[0],moEl=parts[1],dyEl=parts[2];
    var vy=today.getFullYear(),vm=today.getMonth(),selected=null;
    var panel=document.createElement('div');
    panel.className='dp__panel';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','날짜 선택');panel.setAttribute('hidden','');
    panel.style.position='fixed';panel.style.zIndex='1000';
    panel.innerHTML='<div class="dp__header">'
      +'<button class="dp__nav-btn" type="button" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-chevron-left"/></svg></span></button>'
      +'<div class="dp__select-group" aria-live="polite" aria-atomic="true"><input class="dp__select-input" type="number" min="1990" max="'+(today.getFullYear()+10)+'" aria-label="연도"><span class="dp__select-label">년</span><input class="dp__select-input dp__select-input--month" type="number" min="1" max="12" aria-label="월"><span class="dp__select-label">월</span><button class="btn btn--secondary btn--solid btn--sm" type="button">오늘</button></div>'
      +'<button class="dp__nav-btn" type="button" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="#icon-chevron-right"/></svg></span></button>'
      +'</div>'
      +'<div class="dp__weekday-bar"><span class="cal__weekday" role="columnheader">일</span><span class="cal__weekday" role="columnheader">월</span><span class="cal__weekday" role="columnheader">화</span><span class="cal__weekday" role="columnheader">수</span><span class="cal__weekday" role="columnheader">목</span><span class="cal__weekday" role="columnheader">금</span><span class="cal__weekday" role="columnheader">토</span></div>'
      +'<div class="cal"><div class="cal__grid" role="grid"><div class="dp-weeks"></div></div></div>';
    document.body.appendChild(panel);
    var weeksEl=panel.querySelector('.dp-weeks'),gridEl=panel.querySelector('.cal__grid');
    var yearInput=panel.querySelector('.dp__select-input:not(.dp__select-input--month)'),monthInput=panel.querySelector('.dp__select-input--month');
    var navBtns=panel.querySelectorAll('.dp__nav-btn'),todayBtn=panel.querySelector('.btn');
    function positionPanel(){var r=trigger.getBoundingClientRect(),panelH=panel.offsetHeight,spaceBelow=window.innerHeight-r.bottom;if(panelH>spaceBelow&&r.top>panelH)panel.style.top=(r.top-panelH-4)+'px';else panel.style.top=(r.bottom+4)+'px';panel.style.left=r.left+'px';}
    function render(){
      weeksEl.innerHTML='';yearInput.value=vy;monthInput.value=vm+1;gridEl.setAttribute('aria-label',vy+'년 '+(vm+1)+'월');
      var first=new Date(vy,vm,1),last=new Date(vy,vm+1,0),cur=new Date(first);cur.setDate(cur.getDate()-cur.getDay());
      while(cur<=last||cur.getDay()!==0){
        var row=document.createElement('div');row.className='cal__week';row.setAttribute('role','row');
        for(var i=0;i<7;i++){
          var d=new Date(cur),outside=d.getMonth()!==vm;
          var btn=document.createElement('button');btn.setAttribute('role','gridcell');btn.setAttribute('type','button');
          btn.dataset.date=d.getFullYear()+','+d.getMonth()+','+d.getDate();
          if(outside)btn.dataset.inactive='true';
          var cls=['cal__day'];
          if(outside)cls.push('cal__day--outside');
          if(!outside&&isSame(d,today)){cls.push('cal__day--today');btn.setAttribute('aria-current','date');}
          if(isSame(d,selected)){cls.push('cal__day--selected');btn.setAttribute('aria-selected','true');}
          btn.className=cls.join(' ');btn.setAttribute('tabindex',(isSame(d,selected)||(!selected&&isSame(d,today)))&&!outside?'0':'-1');btn.textContent=d.getDate();
          row.appendChild(btn);cur.setDate(cur.getDate()+1);
        }
        weeksEl.appendChild(row);if(cur>last&&cur.getDay()===0)break;
      }
    }
    function onAnyScroll(){if(isOpen())close();}
    function open(){if(dp.classList.contains('dp--has-value')){var y=parseInt(yrEl.value,10),m=parseInt(moEl.value,10),d=parseInt(dyEl.value,10);if(!isNaN(y)&&!isNaN(m)&&!isNaN(d)){vy=y;vm=m-1;}}document.addEventListener('scroll',onAnyScroll,true);panel.removeAttribute('hidden');dp.classList.add('dp--open');render();positionPanel();}
    function close(){document.removeEventListener('scroll',onAnyScroll,true);panel.setAttribute('hidden','');dp.classList.remove('dp--open');setFieldError(!dp.classList.contains('dp--has-value'));}
    function isOpen(){return!panel.hasAttribute('hidden');}
    function setPartsFromDate(d){yrEl.value=String(d.getFullYear());moEl.value=pad(d.getMonth()+1);dyEl.value=pad(d.getDate());dp.classList.add('dp--has-value');clearInnerError();}
    function applyPartsToDate(writeBack){
      var y=parseInt(yrEl.value,10),m=parseInt(moEl.value,10),d=parseInt(dyEl.value,10);
      if(isNaN(y)||isNaN(m)||isNaN(d)){if(writeBack)setInnerError('유효하지 않은 날짜입니다.');return false;}
      var dt=new Date(y,m-1,d);if(isNaN(dt.getTime())||dt.getMonth()!==m-1||dt.getDate()!==d){if(writeBack)setInnerError('유효하지 않은 날짜입니다.');return false;}
      clearInnerError();selected=dt;vy=y;vm=m-1;if(writeBack)setPartsFromDate(dt);else dp.classList.add('dp--has-value');return true;
    }
    function advancePart(el,maxLen,nextEl){el.addEventListener('input',function(){el.value=el.value.replace(/\D/g,'').slice(0,maxLen);if(nextEl&&el.value.length===maxLen)nextEl.focus();});}
    advancePart(yrEl,4,moEl);advancePart(moEl,2,dyEl);advancePart(dyEl,2,null);
    [yrEl,moEl,dyEl].forEach(function(el){
      el.addEventListener('input',function(){clearInnerError();if(isOpen()){var y=parseInt(yrEl.value,10),m=parseInt(moEl.value,10);if(yrEl.value.length===4&&!isNaN(y))vy=y;if(moEl.value.length>=1&&!isNaN(m)&&m>=1&&m<=12)vm=m-1;if(yrEl.value.length===4&&moEl.value.length>=1&&dyEl.value.length>=1)applyPartsToDate();else render();}});
      el.addEventListener('blur',function(){setTimeout(function(){if(dp.contains(document.activeElement)||panel.contains(document.activeElement))return;var has=yrEl.value||moEl.value||dyEl.value;if(has)applyPartsToDate(true);if(isOpen())close();},0);});
      el.addEventListener('keydown',function(e){if(e.key==='Escape'){close();e.target.blur();}if(e.key==='Enter'){e.preventDefault();e.target.blur();}});
    });
    trigger.addEventListener('click',function(){if(!isOpen())open();});
    trigger.querySelector('.dp__chevron').addEventListener('click',function(e){e.stopPropagation();isOpen()?close():open();});
    weeksEl.addEventListener('click',function(e){var btn=e.target.closest?e.target.closest('.cal__day'):e.target;if(!btn||btn.dataset.inactive)return;e.stopPropagation();selected=fromKey(btn.dataset.date);setPartsFromDate(selected);close();});
    navBtns[0].addEventListener('click',function(){vm--;if(vm<0){vm=11;vy--;}render();});
    navBtns[1].addEventListener('click',function(){vm++;if(vm>11){vm=0;vy++;}render();});
    todayBtn.addEventListener('click',function(){vy=today.getFullYear();vm=today.getMonth();render();positionPanel();});
    yearInput.addEventListener('click',function(e){e.stopPropagation();});monthInput.addEventListener('click',function(e){e.stopPropagation();});
    yearInput.addEventListener('blur',function(){var y=parseInt(yearInput.value,10);if(!isNaN(y)&&y>=1990&&y<=today.getFullYear()+10){vy=y;render();}else yearInput.value=vy;});
    monthInput.addEventListener('blur',function(){var m=parseInt(monthInput.value,10);if(!isNaN(m)&&m>=1&&m<=12){vm=m-1;render();}else monthInput.value=vm+1;});
    document.addEventListener('click',function(e){if(!dp.contains(e.target)&&!panel.contains(e.target)){if(isOpen())close();}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(isOpen())close();}});
  }
}
function initDatePicker(container) {
  container.querySelectorAll('.dp').forEach(function(dp) {
    if (dp.dataset.initDatePicker) return;
    dp.dataset.initDatePicker = '1';
    initDP(dp);
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initDatePicker) window.__componentInits.initDatePicker = initDatePicker;


/* ── DateRangePicker ── */
function initDRP(container) {
  if (!container.classList.contains('drp')) return;
  if (container.dataset.initDrp) return;
  container.dataset.initDrp = '1';

  var trigger     = container.querySelector('.drp__trigger');
  var panel       = container.querySelector('.drp__panel');
  var shortcuts   = container.querySelectorAll('.drp__shortcut');
  var drpParts    = container.querySelectorAll('.drp__value-part');
  var sYrEl = drpParts[0]; var sMoEl = drpParts[1]; var sDyEl = drpParts[2];
  var eYrEl = drpParts[3]; var eMoEl = drpParts[4]; var eDyEl = drpParts[5];
  var navBtns     = container.querySelectorAll('.drp__nav-btn');
  var scrollInner = container.querySelector('.drp__scroll-inner');
  var scrollBody  = container.querySelector('.drp__scroll-body');
  var cancelBtn   = container.querySelector('.drp__footer .btn--ghost');
  var confirmBtn  = container.querySelector('.drp__footer .btn--primary');

  var today = new Date(); today.setHours(0,0,0,0);
  var rangeStart = null, rangeEnd = null, hoverDate = null;
  var committed  = { start: null, end: null, all: false };
  var allSelected = false; /* 전체 단축 선택 여부 */

  function pad(n)      { return n < 10 ? '0' + n : '' + n; }
  function fmt(d)      { return d.getFullYear() + '.' + pad(d.getMonth()+1) + '.' + pad(d.getDate()); }
  function isSame(a,b) { return a && b && a.toDateString() === b.toDateString(); }
  function isBetween(d,s,e) { if(!s||!e) return false; var lo=s<e?s:e,hi=s<e?e:s; return d>lo&&d<hi; }
  function fromKey(k)  { var p=k.split(','); return new Date(+p[0],+p[1],+p[2]); }

  /* ── Min/Max 날짜 제한 ── */
  /* data-max-date="today"|"YYYY-MM-DD", data-min-date="today"|"YYYY-MM-DD" — 양쪽 다 "today"를 받는다 */
  function parseConfigDate(s) {
    if(!s) return null;
    if(s==='today') return new Date(today);
    var p=s.split('-'); if(p.length!==3) return null;
    var d=new Date(+p[0],+p[1]-1,+p[2]); d.setHours(0,0,0,0); return isNaN(d.getTime())?null:d;
  }
  var maxDate=parseConfigDate(container.dataset.maxDate);
  var minDate=parseConfigDate(container.dataset.minDate);
  function isDisabled(d) { return !!(maxDate&&d>maxDate)||!!(minDate&&d<minDate); }
  function isShortcutDisabled(r) { if(!r[0]&&!r[1]) return false; /* 전체: 항상 활성 */ return !!(maxDate&&(r[0]>maxDate||r[1]>maxDate))||!!(minDate&&(r[0]<minDate||r[1]<minDate)); }

  /* ── Section helpers ── */
  function firstSection() { return scrollBody.querySelector('.drp__month-section'); }
  function lastSection()  { var a=scrollBody.querySelectorAll('.drp__month-section'); return a[a.length-1]; }

  function prependMonth() {
    var f=firstSection(), y=+f.dataset.year, m=+f.dataset.month-1;
    if(m<0){m=11;y--;} var prevH=scrollBody.offsetHeight;
    scrollBody.insertBefore(renderSection(y,m), f);
    scrollInner.scrollTop += scrollBody.offsetHeight - prevH;
  }
  function appendMonth() {
    var l=lastSection(), y=+l.dataset.year, m=+l.dataset.month+1;
    if(m>11){m=0;y++;} scrollBody.appendChild(renderSection(y,m));
  }

  /* ── Open / Close ── */
  function open() {
    allSelected = committed.all||false;
    if(allSelected){var _aMin=minDate||new Date(today.getFullYear()-3,0,1);rangeStart=_aMin;rangeEnd=maxDate||new Date(today);}
    else{rangeStart=committed.start;rangeEnd=committed.end;}
    var navTo=allSelected?(rangeEnd||new Date(today)):rangeStart;
    var ay = navTo ? navTo.getFullYear() : today.getFullYear();
    var am = navTo ? navTo.getMonth()    : today.getMonth();
    if (!scrollBody.children.length) {
      for (var i=-3; i<13; i++) {
        var mm=am+i, my=ay;
        while(mm<0){mm+=12;my--;} while(mm>11){mm-=12;my++;}
        scrollBody.appendChild(renderSection(my,mm));
      }
    }
    panel.removeAttribute('hidden');
    container.classList.add('drp--open');
    trigger.setAttribute('aria-expanded','true');
    updateInputs();
    requestAnimationFrame(function() {
      var secs = scrollBody.querySelectorAll('.drp__month-section');
      var cur = null;
      Array.prototype.forEach.call(secs, function(s) {
        if(+s.dataset.year===ay && +s.dataset.month===am) cur=s;
      });
      scrollInner.scrollTop = cur ? cur.offsetTop - scrollInner.offsetTop : 0;
      updateClasses();
      syncShortcuts();
    });
  }
  function close() {
    panel.setAttribute('hidden','');
    container.classList.remove('drp--open');
    trigger.setAttribute('aria-expanded','false');
    hoverDate = null;
  }

  /* ── makeBtn ── */
  function makeBtn(d, vm) {
    var outside = d.getMonth()!==vm;
    var isStart = isSame(d,rangeStart), isEnd = isSame(d,rangeEnd);
    var inRange = isBetween(d,rangeStart,rangeEnd);
    var effEnd  = rangeEnd||hoverDate, goLeft = effEnd&&rangeStart&&effEnd<rangeStart;
    var isPreview  = !rangeEnd&&rangeStart&&hoverDate&&isBetween(d,rangeStart,hoverDate);
    var isHoverEnd = !rangeEnd&&rangeStart&&hoverDate&&isSame(d,hoverDate)&&!isStart;
    var btn = document.createElement('button');
    btn.setAttribute('role','gridcell'); btn.setAttribute('type','button');
    btn.dataset.date = d.getFullYear()+','+d.getMonth()+','+d.getDate();
    if(outside) btn.dataset.outside='true';
    var cls=['cal__day'];
    if(outside) cls.push('cal__day--outside');
    if(!outside&&isSame(d,today)){cls.push('cal__day--today');btn.setAttribute('aria-current','date');}
    if(isStart){
      if(!effEnd)      cls.push('cal__day--range-solo');
      else if(rangeEnd) cls.push(goLeft?'cal__day--range-start-left':'cal__day--range-start');
      else              cls.push(goLeft?'cal__day--range-start-left-pre':'cal__day--range-start-pre');
    }
    if(isEnd)      cls.push('cal__day--range-end');
    if(inRange)    cls.push('cal__day--in-range');
    if(isPreview)  cls.push('cal__day--in-range-preview');
    if(isHoverEnd) cls.push(goLeft?'cal__day--hover-end-left':'cal__day--hover-end');
    var disabled = !outside&&isDisabled(d);
    if(disabled) cls.push('cal__day--disabled');
    if(isStart||isEnd||inRange) btn.setAttribute('aria-selected','true');
    btn.className=cls.join(' ');
    var ariaLbl=d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일';
    if(!outside&&isSame(d,today)) ariaLbl+=', 오늘';
    if(isStart) ariaLbl+=', 시작일';
    else if(isEnd) ariaLbl+=', 종료일';
    if(disabled) ariaLbl+=', 선택 불가';
    btn.setAttribute('aria-label',ariaLbl);
    btn.textContent=d.getDate();
    if(!outside&&isDisabled(d)){btn.classList.add('cal__day--disabled');btn.setAttribute('disabled','');btn.setAttribute('aria-disabled','true');btn.setAttribute('tabindex','-1');}
    return btn;
  }

  /* ── markDisabledRuns — calendar.md의 띠 스타일(solo/start/mid/end)과 동일하게 연속 disabled 구간 감지 ── */
  function markDisabledRuns(section) {
    var allBtns = Array.prototype.slice.call(section.querySelectorAll('.cal__day'));
    var run = [];
    function flush() {
      if (run.length === 1) { run[0].classList.add('cal__day--disabled-solo'); }
      else if (run.length >= 2) {
        run[0].classList.add('cal__day--disabled-start');
        for (var i=1;i<run.length-1;i++) run[i].classList.add('cal__day--disabled-mid');
        run[run.length-1].classList.add('cal__day--disabled-end');
      }
      run = [];
    }
    allBtns.forEach(function(b) { if(b.classList.contains('cal__day--disabled')){run.push(b);}else{flush();} });
    flush();
  }

  /* ── renderSection ── */
  function renderSection(my, mm) {
    var section = document.createElement('div');
    section.className='drp__month-section'; section.dataset.year=my; section.dataset.month=mm;
    var label = document.createElement('div');
    label.className='drp__month-label'; label.textContent=my+'년 '+pad(mm+1)+'월';
    section.appendChild(label);
    var calDiv=document.createElement('div'); calDiv.className='cal cal--range';
    var gridDiv=document.createElement('div');
    gridDiv.className='cal__grid'; gridDiv.setAttribute('role','grid');
    gridDiv.setAttribute('aria-label',my+'년 '+pad(mm+1)+'월');
    gridDiv.setAttribute('aria-multiselectable','true');
    var first=new Date(my,mm,1), last=new Date(my,mm+1,0);
    var cur=new Date(first); cur.setDate(cur.getDate()-cur.getDay());
    while(cur<=last||cur.getDay()!==0){
      var row=document.createElement('div'); row.className='cal__week'; row.setAttribute('role','row');
      for(var i=0;i<7;i++){row.appendChild(makeBtn(new Date(cur),mm)); cur.setDate(cur.getDate()+1);}
      gridDiv.appendChild(row);
      if(cur>last&&cur.getDay()===0) break;
    }
    calDiv.appendChild(gridDiv); section.appendChild(calDiv);
    markDisabledRuns(section);
    return section;
  }

  /* calendar.md markDisabledRuns — 연속 disabled 구간 감지 → disabled-start/mid/end/solo 클래스 부여 */
  function markDisabledRuns(gridDiv) {
    var allBtns = Array.prototype.slice.call(gridDiv.querySelectorAll('.cal__day'));
    var run = [];
    function flush() {
      if(run.length===1){run[0].classList.add('cal__day--disabled-solo');}
      else if(run.length>=2){run[0].classList.add('cal__day--disabled-start');for(var i=1;i<run.length-1;i++)run[i].classList.add('cal__day--disabled-mid');run[run.length-1].classList.add('cal__day--disabled-end');}
      run=[];
    }
    allBtns.forEach(function(b){if(b.classList.contains('cal__day--disabled')){run.push(b);}else{flush();}});
    flush();
  }

  /* ── updateClasses (hover 시 전체 재빌드 없이 class만 갱신) ── */
  var rangeCls = ['cal__day--range-solo','cal__day--range-start','cal__day--range-start-left',
    'cal__day--range-start-pre','cal__day--range-start-left-pre','cal__day--range-end',
    'cal__day--in-range','cal__day--in-range-preview','cal__day--hover-end','cal__day--hover-end-left'];
  function updateClasses() {
    Array.prototype.forEach.call(scrollBody.querySelectorAll('.cal__day'), function(btn) {
      rangeCls.forEach(function(c){btn.classList.remove(c);}); btn.removeAttribute('aria-selected');
      if(btn.dataset.outside||btn.hasAttribute('disabled')) return;
      var d=fromKey(btn.dataset.date);
      var isStart=isSame(d,rangeStart),isEnd=isSame(d,rangeEnd),inRange=isBetween(d,rangeStart,rangeEnd);
      var effEnd=rangeEnd||hoverDate,goLeft=effEnd&&rangeStart&&effEnd<rangeStart;
      var isPreview=!rangeEnd&&rangeStart&&hoverDate&&isBetween(d,rangeStart,hoverDate);
      var isHoverEnd=!rangeEnd&&rangeStart&&hoverDate&&isSame(d,hoverDate)&&!isStart;
      if(isStart){
        if(!effEnd)       btn.classList.add('cal__day--range-solo');
        else if(rangeEnd) btn.classList.add(goLeft?'cal__day--range-start-left':'cal__day--range-start');
        else              btn.classList.add(goLeft?'cal__day--range-start-left-pre':'cal__day--range-start-pre');
      }
      if(isEnd)      btn.classList.add('cal__day--range-end');
      if(inRange)    btn.classList.add('cal__day--in-range');
      if(isPreview)  btn.classList.add('cal__day--in-range-preview');
      if(isHoverEnd) btn.classList.add(goLeft?'cal__day--hover-end-left':'cal__day--hover-end');
      if(isStart||isEnd||inRange) btn.setAttribute('aria-selected','true');
      var ariaLbl=d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일';
      if(isSame(d,today)) ariaLbl+=', 오늘';
      if(isStart) ariaLbl+=', 시작일';
      else if(isEnd) ariaLbl+=', 종료일';
      btn.setAttribute('aria-label',ariaLbl);
    });
  }

  /* ── jumpTo (특정 연·월로 초기화) ── */
  function jumpTo(y, m) {
    scrollBody.innerHTML='';
    for(var i=-3;i<13;i++){
      var mm=m+i,my=y;
      while(mm<0){mm+=12;my--;} while(mm>11){mm-=12;my++;}
      scrollBody.appendChild(renderSection(my,mm));
    }
    requestAnimationFrame(function(){
      var secs=scrollBody.querySelectorAll('.drp__month-section');
      scrollInner.scrollTop=secs[3]?secs[3].offsetTop-scrollInner.offsetTop:0;
      updateClasses();
    });
  }

  /* ── scrollToSection (nav 화살표) ── */
  function activeIdx() {
    var secs=Array.prototype.slice.call(scrollBody.querySelectorAll('.drp__month-section'));
    var idx=0;
    secs.forEach(function(s,i){ if(s.offsetTop-scrollInner.offsetTop<=scrollInner.scrollTop+40) idx=i; });
    return idx;
  }
  function scrollToSection(offset) {
    var secs=Array.prototype.slice.call(scrollBody.querySelectorAll('.drp__month-section'));
    var idx=activeIdx();
    if(offset===-1&&idx===0){prependMonth();secs=Array.prototype.slice.call(scrollBody.querySelectorAll('.drp__month-section'));idx=1;}
    if(offset===1&&idx===secs.length-1){appendMonth();secs=Array.prototype.slice.call(scrollBody.querySelectorAll('.drp__month-section'));}
    var target=secs[idx+offset];
    if(target) scrollInner.scrollTop=target.offsetTop-scrollInner.offsetTop;
  }

  /* ── Inputs ── */
  function updateInputs() {
    if(allSelected){
      if(rangeStart){sYrEl.value=String(rangeStart.getFullYear());sMoEl.value=pad(rangeStart.getMonth()+1);sDyEl.value=pad(rangeStart.getDate());}
      else{sYrEl.value=sMoEl.value=sDyEl.value='';}
      if(rangeEnd){eYrEl.value=String(rangeEnd.getFullYear());eMoEl.value=pad(rangeEnd.getMonth()+1);eDyEl.value=pad(rangeEnd.getDate());}
      else{eYrEl.value=eMoEl.value=eDyEl.value='';}
      return;
    }
    if(rangeStart){sYrEl.value=String(rangeStart.getFullYear());sMoEl.value=pad(rangeStart.getMonth()+1);sDyEl.value=pad(rangeStart.getDate());}
    else{sYrEl.value=sMoEl.value=sDyEl.value='';}
    if(rangeEnd){eYrEl.value=String(rangeEnd.getFullYear());eMoEl.value=pad(rangeEnd.getMonth()+1);eDyEl.value=pad(rangeEnd.getDate());}
    else{eYrEl.value=eMoEl.value=eDyEl.value='';}
  }

  function isValidDate(y,m,d){if(isNaN(y)||isNaN(m)||isNaN(d))return false;var dt=new Date(y,m-1,d);return!isNaN(dt.getTime())&&dt.getMonth()===m-1&&dt.getDate()===d;}
  function applyPartsToRange() { allSelected=false;
    var sy=parseInt(sYrEl.value,10),sm=parseInt(sMoEl.value,10),sd=parseInt(sDyEl.value,10);
    var ey=parseInt(eYrEl.value,10),em=parseInt(eMoEl.value,10),ed=parseInt(eDyEl.value,10);
    var hasS=sYrEl.value||sMoEl.value||sDyEl.value, hasE=eYrEl.value||eMoEl.value||eDyEl.value;
    if(hasS&&isValidDate(sy,sm,sd)){var ds=new Date(sy,sm-1,sd);if(!isDisabled(ds))rangeStart=ds;}else if(!hasS)rangeStart=null;
    if(hasE&&isValidDate(ey,em,ed)){var de=new Date(ey,em-1,ed);if(!isDisabled(de))rangeEnd=de;}  else if(!hasE)rangeEnd=null;
    if(rangeStart&&rangeEnd&&rangeEnd<rangeStart){var t=rangeStart;rangeStart=rangeEnd;rangeEnd=t;}
    if(rangeStart&&sYrEl.value.length===4&&sMoEl.value.length>=1) jumpTo(rangeStart.getFullYear(),rangeStart.getMonth());
    else { hoverDate=null; updateClasses(); syncShortcuts(); }
  }
  function advancePart(el,maxLen,nextEl){
    el.addEventListener('input',function(){el.value=el.value.replace(/\D/g,'').slice(0,maxLen);if(nextEl&&el.value.length===maxLen)nextEl.focus();applyPartsToRange();});
    el.addEventListener('click',function(e){e.stopPropagation();});
    el.addEventListener('keydown',function(e){if(e.key==='Escape')close();if(e.key==='Enter'){e.preventDefault();el.blur();}});
  }
  advancePart(sYrEl,4,sMoEl);advancePart(sMoEl,2,sDyEl);advancePart(sDyEl,2,eYrEl);
  advancePart(eYrEl,4,eMoEl);advancePart(eMoEl,2,eDyEl);advancePart(eDyEl,2,null);

  /* ── 단축 탭 ── */
  var SHORTCUTS = {
    'all':        function(){return[null,null];},
    'today':      function(){var t=new Date(today);return[t,new Date(t)];},
    'yesterday':  function(){var y=new Date(today);y.setDate(y.getDate()-1);return[y,new Date(y)];},
    'this-week':  function(){var s=new Date(today);s.setDate(s.getDate()-((s.getDay()+6)%7));var e=new Date(s);e.setDate(e.getDate()+6);return[s,e];},
    'last-week':  function(){var s=new Date(today);s.setDate(s.getDate()-((s.getDay()+6)%7)-7);var e=new Date(s);e.setDate(e.getDate()+6);return[s,e];},
    'this-month': function(){var s=new Date(today.getFullYear(),today.getMonth(),1);return[s,new Date(today)];},
    'last-month':      function(){var s=new Date(today.getFullYear(),today.getMonth()-1,1);var e=new Date(today.getFullYear(),today.getMonth(),0);return[s,e];},
    'tomorrow':        function(){var t=new Date(today);t.setDate(t.getDate()+1);return[t,new Date(t)];},
    'next-week':       function(){var s=new Date(today);s.setDate(s.getDate()-((s.getDay()+6)%7)+7);var e=new Date(s);e.setDate(e.getDate()+6);return[s,e];},
    'this-month-full': function(){var s=new Date(today.getFullYear(),today.getMonth(),1);var e=new Date(today.getFullYear(),today.getMonth()+1,0);return[s,e];},
    /* 오늘 ~ 이번 달 말일. **오늘 이후만 고를 수 있는 화면(data-min-date="today")의 「이번달」**이다 —
       this-month(1일~오늘)도 this-month-full(1일~말일)도 1일에서 시작하므로, 오늘이 1일이 아닌 한
       둘 다 제한 밖이라 잠긴다(isShortcutDisabled). 셋의 차이는 **어디서 시작하는가** 하나다:
       지난 쪽은 1일에서 시작해 오늘에서 끝나고, 이 키는 오늘에서 시작해 말일에서 끝난다. */
    'this-month-rest': function(){var s=new Date(today);var e=new Date(today.getFullYear(),today.getMonth()+1,0);return[s,e];},
    'next-month':      function(){var s=new Date(today.getFullYear(),today.getMonth()+1,1);var e=new Date(today.getFullYear(),today.getMonth()+2,0);return[s,e];}
  };
  function syncShortcuts() {
    var hasSelected=false;
    shortcuts.forEach(function(item){
      var fn=SHORTCUTS[item.dataset.shortcut]; if(!fn) return;
      var r=fn(), dis=isShortcutDisabled(r);
      item.classList.toggle('drp__shortcut--disabled',dis); item.setAttribute('aria-disabled',dis?'true':'false');
      if(dis){item.classList.remove('drp__shortcut--selected');item.setAttribute('aria-selected','false');item.setAttribute('tabindex','-1');return;}
      var on=(!r[0]&&!r[1])?allSelected:!!(rangeStart&&rangeEnd&&isSame(rangeStart,r[0])&&isSame(rangeEnd,r[1]));
      item.classList.toggle('drp__shortcut--selected',on); item.setAttribute('aria-selected',on?'true':'false');
      if(on){item.setAttribute('tabindex','0');hasSelected=true;}else{item.setAttribute('tabindex','-1');}
    });
    if(!hasSelected&&shortcuts[0]) shortcuts[0].setAttribute('tabindex','0');
  }
  shortcuts.forEach(function(item,idx){
    item.addEventListener('click',function(){
      if(item.classList.contains('drp__shortcut--disabled')) return;
      var fn=SHORTCUTS[item.dataset.shortcut]; if(!fn) return;
      var r=fn(); rangeStart=r[0]; rangeEnd=r[1]; hoverDate=null;
      allSelected=(!rangeStart&&!rangeEnd);
      if(allSelected&&minDate){rangeStart=minDate;rangeEnd=maxDate||new Date(today);}
      updateInputs();
      var navTo=allSelected?(rangeEnd||new Date(today)):rangeStart;
      if(navTo) jumpTo(navTo.getFullYear(),navTo.getMonth());
      else { updateClasses(); }
      requestAnimationFrame(function(){syncShortcuts();});
    });
    item.addEventListener('keydown',function(e){
      if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();var n=shortcuts[(idx+1)%shortcuts.length];item.setAttribute('tabindex','-1');n.setAttribute('tabindex','0');n.focus();}
      else if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();var p=shortcuts[(idx-1+shortcuts.length)%shortcuts.length];item.setAttribute('tabindex','-1');p.setAttribute('tabindex','0');p.focus();}
      else if(e.key==='Enter'||e.key===' '){e.preventDefault();item.click();}
    });
  });

  /* ── Nav 화살표 ── */
  navBtns[0].addEventListener('click',function(){scrollToSection(-1);});
  navBtns[1].addEventListener('click',function(){scrollToSection(1);});

  /* ── 달력 클릭·hover ── */
  scrollBody.addEventListener('click',function(e){
    var btn=e.target.closest?e.target.closest('.cal__day'):e.target;
    if(!btn||btn.dataset.outside||btn.hasAttribute('disabled')) return;
    e.stopPropagation();
    var d=fromKey(btn.dataset.date);
    if(!rangeStart||rangeEnd){rangeStart=d;rangeEnd=null;hoverDate=null;}
    else if(isSame(rangeStart,d)){rangeEnd=d;hoverDate=null;} /* 같은 날 재클릭 → 단일 날짜 범위 확정 */
    else{rangeEnd=d;if(rangeEnd<rangeStart){var t=rangeStart;rangeStart=rangeEnd;rangeEnd=t;}hoverDate=null;}
    allSelected=false; updateInputs(); updateClasses(); syncShortcuts();
  });
  scrollBody.addEventListener('mouseover',function(e){
    var btn=e.target.closest?e.target.closest('.cal__day'):e.target;
    if(!btn||btn.dataset.outside||!rangeStart||rangeEnd||btn.hasAttribute('disabled')) return;
    var d=fromKey(btn.dataset.date);
    if(!isSame(d,hoverDate)){hoverDate=d;updateClasses();}
  });
  scrollInner.addEventListener('scroll',function(){
    if(scrollInner.scrollTop<120) prependMonth();
    if(scrollInner.scrollTop+scrollInner.clientHeight>scrollInner.scrollHeight-120) appendMonth();
  });

  /* ── Trigger ── */
  trigger.addEventListener('click',function(e){
    e.stopPropagation();
    container.classList.contains('drp--open')?close():open();
  });

  /* ── 취소 / 확인 ── */
  cancelBtn.addEventListener('click',function(){
    allSelected=committed.all||false;
    if(allSelected){var _aMin=minDate||new Date(today.getFullYear()-3,0,1);rangeStart=_aMin;rangeEnd=maxDate||new Date(today);}
    else{rangeStart=committed.start;rangeEnd=committed.end;}
    hoverDate=null;
    updateInputs();updateClasses();syncShortcuts();close();
  });
  confirmBtn.addEventListener('click',function(){
    var labelEl=trigger.querySelector('.drp__trigger-label');
    if(allSelected){
      committed={start:null,end:null,all:true};
      labelEl.textContent='전체';
      container.classList.add('drp--active');
    } else if(rangeStart&&rangeEnd){
      committed={start:rangeStart,end:rangeEnd,all:false};
      labelEl.textContent=fmt(rangeStart)+' ~ '+fmt(rangeEnd);
      container.classList.add('drp--active');
    } else {
      committed={start:null,end:null,all:false};
      labelEl.textContent=container.dataset.placeholder||'기간 선택';
      container.classList.remove('drp--active');
    }
    container.dispatchEvent(new CustomEvent('drp:change',{bubbles:true,detail:{start:committed.start,end:committed.end,all:committed.all}}));
    close();
  });

  document.addEventListener('click',function(e){if(!container.contains(e.target)&&!panel.contains(e.target))close();});

  /* 외부에서 drp:reset 이벤트를 디스패치하면 선택 초기화 */
  container.addEventListener('drp:reset',function(){
    committed={start:null,end:null,all:false};
    allSelected=false; rangeStart=null; rangeEnd=null; hoverDate=null;
    container.classList.remove('drp--active');
    trigger.querySelector('.drp__trigger-label').textContent=container.dataset.placeholder||'기간 선택';
    container.dispatchEvent(new CustomEvent('drp:change',{bubbles:true,detail:{start:null,end:null,all:false}}));
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initDRP) window.__componentInits.initDRP = initDRP;


/* ── TableCell ── */
function initTableSort(container) {
  container.querySelectorAll('table').forEach(function(table) {
    if (table.dataset.initTableSort) return;
    table.dataset.initTableSort = '1';

    var sortThs = table.querySelectorAll('.table__head-cell--sort');
    if (!sortThs.length) return;

    // global 기본 sort가 중복 부착하지 않도록 마킹
    sortThs.forEach(function(th) {
      var b = th.querySelector('.table__sort-btn');
      if (b) b.dataset.initSort = '1';
    });

    // toast stack: 없으면 컨테이너에 동적 생성
    var stage = table.closest('.component-preview-stage') || container;
    stage.style.position = 'relative'; // position:absolute 토스트 스택의 컨테이닝 블록 보장
    var toastStack = stage.querySelector('[id$="-toast-stack"]');
    if (!toastStack) {
      toastStack = document.createElement('div');
      toastStack.setAttribute('aria-live', 'polite');
      toastStack.setAttribute('aria-atomic', 'false');
      toastStack.style.cssText = 'position:absolute;bottom:var(--space-16);left:50%;transform:translateX(-50%);pointer-events:none;display:flex;flex-direction:column;gap:var(--space-gap-sm);z-index:100;';
      stage.appendChild(toastStack);
    }

    var activeUndoToast = null;
    var savedChain = null;

    function applySort(th, dir) {
      var btn = th.querySelector('.table__sort-btn');
      th.classList.remove('table__head-cell--sort-asc', 'table__head-cell--sort-desc');
      th.classList.add(dir === 'asc' ? 'table__head-cell--sort-asc' : 'table__head-cell--sort-desc');
      th.setAttribute('aria-sort', dir === 'asc' ? 'ascending' : 'descending');
      var use = btn.querySelector('.icon use');
      if (use) use.setAttribute('href', '#icon-sort-' + dir);
      var iconEl = btn.querySelector('.icon');
      if (iconEl) iconEl.classList.add('icon--brand');
    }

    function clearSort(th) {
      var btn = th.querySelector('.table__sort-btn');
      th.classList.remove('table__head-cell--sort-asc', 'table__head-cell--sort-desc');
      th.setAttribute('aria-sort', 'none');
      var use = btn.querySelector('.icon use');
      if (use) use.setAttribute('href', '#icon-sort-asc');
      var iconEl = btn.querySelector('.icon');
      if (iconEl) iconEl.classList.remove('icon--brand');
      var orderEl = btn.querySelector('.table__sort-order');
      if (orderEl) orderEl.remove();
      var tip = btn.querySelector('.tooltip-panel');
      if (tip) tip.textContent = '오름차순';
    }

    function updateOrderNumbers() {
      var chain = [];
      sortThs.forEach(function(t) {
        if (t.classList.contains('table__head-cell--sort-asc') || t.classList.contains('table__head-cell--sort-desc')) {
          var orderEl = t.querySelector('.table__sort-order');
          if (orderEl) chain.push({ th: t, order: parseInt(orderEl.textContent) });
        }
      });
      chain.sort(function(a, b) { return a.order - b.order; });
      chain.forEach(function(item, i) { item.th.querySelector('.table__sort-order').textContent = i + 1; });
    }

    function getNextOrder() {
      var max = 0;
      sortThs.forEach(function(t) {
        var el = t.querySelector('.table__sort-order');
        if (el) max = Math.max(max, parseInt(el.textContent));
      });
      return max + 1;
    }

    function attachOrderHandler(orderEl, th) {
      orderEl.addEventListener('click', function(e) {
        e.stopPropagation();
        clearSort(th);
        updateOrderNumbers();
      });
    }

    function saveChain() {
      savedChain = [];
      sortThs.forEach(function(t) {
        var isAsc = t.classList.contains('table__head-cell--sort-asc');
        var isDesc = t.classList.contains('table__head-cell--sort-desc');
        if (isAsc || isDesc) {
          var orderEl = t.querySelector('.table__sort-order');
          savedChain.push({ th: t, dir: isAsc ? 'asc' : 'desc', order: orderEl ? parseInt(orderEl.textContent) : null });
        }
      });
      savedChain.sort(function(a, b) { return (a.order || 0) - (b.order || 0); });
    }

    function restoreChain() {
      sortThs.forEach(function(t) { clearSort(t); });
      savedChain.forEach(function(item) {
        var btn = item.th.querySelector('.table__sort-btn');
        applySort(item.th, item.dir);
        if (item.order !== null) {
          var orderEl = document.createElement('span');
          orderEl.className = 'table__sort-order icon--brand';
          orderEl.textContent = item.order;
          orderEl.setAttribute('title', '클릭하여 정렬 해제');
          attachOrderHandler(orderEl, item.th);
          btn.querySelector('.tooltip-wrapper').insertBefore(orderEl, btn.querySelector('.tooltip-wrapper').firstChild);
        }
        var orderText = item.order !== null ? (' · ' + item.order + '번째 기준') : '';
        btn.querySelector('.tooltip-panel').textContent = (item.dir === 'asc' ? '오름차순' : '내림차순') + orderText;
      });
    }

    function showUndoToast() {
      if (activeUndoToast && typeof dismissToast === 'function') { dismissToast(activeUndoToast); activeUndoToast = null; }
      if (typeof makeToast !== 'function') return;
      var t = makeToast('info', '', '다중 정렬이 초기화되었습니다', '되돌리기');
      var actionLink = t.querySelector('.toast__action-link');
      if (actionLink) {
        actionLink.addEventListener('click', function(e) {
          e.preventDefault();
          restoreChain();
          if (typeof dismissToast === 'function') dismissToast(t);
          activeUndoToast = null;
        });
      }
      toastStack.appendChild(t);
      activeUndoToast = t;
    }

    // 기존 HTML의 순서 번호 뱃지 핸들러 초기화
    sortThs.forEach(function(th) {
      var existing = th.querySelector('.table__sort-order');
      if (existing) attachOrderHandler(existing, th);
    });

    sortThs.forEach(function(th) {
      var btn = th.querySelector('.table__sort-btn');
      if (!btn) return;
      btn.addEventListener('click', function(e) {
        var isAsc = th.classList.contains('table__head-cell--sort-asc');
        var isDesc = th.classList.contains('table__head-cell--sort-desc');
        var isMulti = e.shiftKey;

        if (!isMulti) {
          var chainCount = Array.from(sortThs).filter(function(t) {
            return t.classList.contains('table__head-cell--sort-asc') || t.classList.contains('table__head-cell--sort-desc');
          }).length;
          if (chainCount >= 2) { saveChain(); showUndoToast(); }
          sortThs.forEach(function(t) { if (t !== th) clearSort(t); });
          var orderEl = btn.querySelector('.table__sort-order');
          if (orderEl) orderEl.remove();
          if (isDesc) { applySort(th, 'asc'); btn.querySelector('.tooltip-panel').textContent = '오름차순'; }
          else if (isAsc) { applySort(th, 'desc'); btn.querySelector('.tooltip-panel').textContent = '내림차순'; }
          else { applySort(th, 'asc'); btn.querySelector('.tooltip-panel').textContent = '오름차순'; }
        } else {
          sortThs.forEach(function(t) {
            if (t === th) return;
            var sorted = t.classList.contains('table__head-cell--sort-asc') || t.classList.contains('table__head-cell--sort-desc');
            if (sorted && !t.querySelector('.table__sort-order')) {
              var b = t.querySelector('.table__sort-btn');
              var newOrder = document.createElement('span');
              newOrder.className = 'table__sort-order icon--brand';
              newOrder.textContent = getNextOrder();
              newOrder.setAttribute('title', '클릭하여 정렬 해제');
              attachOrderHandler(newOrder, t);
              var w = b.querySelector('.tooltip-wrapper');
              w.insertBefore(newOrder, w.firstChild);
              var dir = t.classList.contains('table__head-cell--sort-asc') ? '오름차순' : '내림차순';
              b.querySelector('.tooltip-panel').textContent = dir + ' · ' + newOrder.textContent + '번째 기준';
            }
          });
          if (!isAsc && !isDesc) {
            var order = getNextOrder();
            var orderEl = document.createElement('span');
            orderEl.className = 'table__sort-order icon--brand';
            orderEl.textContent = order;
            orderEl.setAttribute('title', '클릭하여 정렬 해제');
            attachOrderHandler(orderEl, th);
            btn.querySelector('.tooltip-wrapper').insertBefore(orderEl, btn.querySelector('.tooltip-wrapper').firstChild);
            applySort(th, 'asc');
            btn.querySelector('.tooltip-panel').textContent = '오름차순 · ' + order + '번째 기준';
          } else {
            var currentOrderEl = btn.querySelector('.table__sort-order');
            if (!currentOrderEl) {
              // 단일 정렬(순서 번호 없음) → 체인에 추가, 현재 방향 유지
              var order = getNextOrder();
              var newOrderEl = document.createElement('span');
              newOrderEl.className = 'table__sort-order icon--brand';
              newOrderEl.textContent = order;
              newOrderEl.setAttribute('title', '클릭하여 정렬 해제');
              attachOrderHandler(newOrderEl, th);
              btn.querySelector('.tooltip-wrapper').insertBefore(newOrderEl, btn.querySelector('.tooltip-wrapper').firstChild);
              var dir = isAsc ? '오름차순' : '내림차순';
              btn.querySelector('.tooltip-panel').textContent = dir + ' · ' + order + '번째 기준';
            } else if (isAsc) {
              applySort(th, 'desc');
              btn.querySelector('.tooltip-panel').textContent = '내림차순 · ' + currentOrderEl.textContent + '번째 기준';
            } else {
              clearSort(th);
              updateOrderNumbers();
            }
          }
        }
      });
    });
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initTableSort) window.__componentInits.initTableSort = initTableSort;

/* 행 선택 — 체크박스 change → 행에 table__row--selected + aria-selected 토글.
   전체선택 체크박스 일괄 토글, 부분선택 시 헤더 indeterminate. initTableSort와 동일하게
   container(=<table>을 감싸는 요소)를 받아 내부 모든 <table>에 적용한다.
   선택 동작은 프로토타입에서 직접 구현하지 말고 이 함수에 위임한다(행 하이라이트 누락 방지). */
function initTableSelect(container) {
  container.querySelectorAll('table').forEach(function(table) {
    if (table.dataset.initTableSelect) return;
    table.dataset.initTableSelect = '1';
    var headCb = table.querySelector('.table__head .table__cell--check input[type="checkbox"]');
    function bodyCbs() { return Array.from(table.querySelectorAll('.table__body .table__cell--check input[type="checkbox"]')); }
    function setRow(cb) {
      var row = cb.closest('tr');
      if (!row) return;
      row.classList.toggle('table__row--selected', cb.checked);
      row.setAttribute('aria-selected', cb.checked ? 'true' : 'false');
    }
    function syncHead() {
      if (!headCb) return;
      var cbs = bodyCbs(), n = cbs.filter(function(c) { return c.checked; }).length;
      headCb.checked = cbs.length > 0 && n === cbs.length;
      headCb.indeterminate = n > 0 && n < cbs.length;
    }
    bodyCbs().forEach(function(cb) {
      setRow(cb); /* 초기 checked 행 반영 */
      cb.addEventListener('change', function() { setRow(cb); syncHead(); });
    });
    if (headCb) {
      headCb.addEventListener('change', function() {
        bodyCbs().forEach(function(cb) { cb.checked = headCb.checked; setRow(cb); });
        headCb.indeterminate = false;
      });
    }
    syncHead(); /* 초기 헤더 상태(전체/부분/없음) 반영 */
  });
}
if (!window.__componentInits.initTableSelect) window.__componentInits.initTableSelect = initTableSelect;


/* ── Comment List ── */
/* AI: initCommentList(container) — .comment-list-container 초기화.
   수정 진입·취소, 답글 폼 열고 닫기, 글자 수, 빈 입력 시 전송 버튼 잠금.
   등록·저장·삭제의 전송은 호스트가 맡는다 — 이 함수는 화면 상태만 바꾼다.
   프로토타입에서 직접 구현하지 말고 이 함수에 위임한다. */
function initCommentList(container) {
  container.querySelectorAll('.comment-list-container').forEach(function(root) {
    if (root.dataset.initCommentList) return;
    root.dataset.initCommentList = '1';

    /* 빈 입력이면 전송을 잠근다. trim으로 재는 이유 — 공백만 있는 댓글은 내용이 없다. */
    function syncForm(form) {
      var input = form.querySelector('.comment-form__input');
      var submit = form.querySelector('[type="submit"]');
      var count = form.querySelector('[data-comment-count]');
      if (!input) return;
      if (submit) submit.disabled = input.value.trim().length === 0;
      if (count && input.maxLength > 0) count.textContent = input.value.length + '/' + input.maxLength;
    }

    root.addEventListener('input', function(e) {
      var form = e.target.closest('.comment-form');
      if (form) syncForm(form);
    });

    root.addEventListener('click', function(e) {
      var editBtn = e.target.closest('[data-comment-edit]');
      if (editBtn) {
        var item = editBtn.closest('.comment');
        var body = item.querySelector('.comment__body');
        var area = item.querySelector('.comment__edit .comment-form__input');
        item.classList.add('comment--editing');
        if (area) {
          area.value = body ? body.textContent.trim() : '';
          area.focus();
          /* 커서를 글 끝으로 — 고치려고 연 것이므로 이어 쓰는 자리가 맞다 */
          area.setSelectionRange(area.value.length, area.value.length);
          syncForm(area.closest('.comment-form'));
        }
        return;
      }

      var cancelBtn = e.target.closest('[data-comment-edit-cancel]');
      if (cancelBtn) {
        cancelBtn.closest('.comment').classList.remove('comment--editing');
        return;
      }

      var replyBtn = e.target.closest('[data-comment-reply]');
      if (replyBtn) {
        var target = replyBtn.closest('.comment').querySelector(':scope > .comment__main > .comment__reply-form');
        if (!target) return;
        /* 다른 답글 폼은 닫는다 — 두 곳에 쓰다 만 글이 남으면 어느 쪽이 살아 있는지 모른다 */
        root.querySelectorAll('.comment__reply-form').forEach(function(f) { if (f !== target) f.hidden = true; });
        target.hidden = !target.hidden;
        if (!target.hidden) {
          var ta = target.querySelector('.comment-form__input');
          if (ta) ta.focus();
        }
        return;
      }

      var replyCancel = e.target.closest('[data-comment-reply-cancel]');
      if (replyCancel) replyCancel.closest('.comment__reply-form').hidden = true;
    });

    root.querySelectorAll('.comment-form').forEach(syncForm);
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initCommentList) window.__componentInits.initCommentList = initCommentList;


/* ── FilterBar ── */
function initFilterBar(container) {
  if (!container || container.dataset.initFilterBar) return;
  container.dataset.initFilterBar = '1';

  var resetWrap   = container.querySelector('.filter-bar__reset-wrap');
  var resetBtn    = resetWrap ? resetWrap.querySelector('button') : null;
  var resetTip    = resetWrap ? resetWrap.querySelector('.tooltip-panel') : null;
  var drpEls      = Array.from(container.querySelectorAll('.drp'));
  var searchInput = container.querySelector('.filter-bar__search input[type="search"]');
  var searchWrap  = searchInput ? searchInput.closest('.input-wrap') : null;
  var clearBtn    = container.querySelector('.filter-bar__search .input-clear');
  var searchBtn   = container.querySelector('.filter-bar__search .icon-on--md');

  /* 하위 컴포넌트 초기화 */
  initDropdown(container);
  drpEls.forEach(function(drp) { initDRP(drp); });

  /* 초기화 버튼 가시성 동기화 */
  function syncReset() {
    if (!resetWrap) return;
    var anyFilter = Array.from(container.querySelectorAll('.dropdown')).some(function(dd) {
      return !!dd.querySelector('.dropdown__option--selected');
    });
    var anyDrp    = drpEls.some(function(d) { return d.classList.contains('drp--active'); });
    var anySearch = searchInput ? searchInput.value.trim().length > 0 : false;
    resetWrap.hidden = !(anyFilter || anyDrp || anySearch);
  }

  /* 초기화 버튼 tooltip */
  if (resetBtn && resetTip) {
    resetBtn.addEventListener('mouseenter', function() { resetTip.classList.add('tooltip-panel--visible'); });
    resetBtn.addEventListener('mouseleave', function() { resetTip.classList.remove('tooltip-panel--visible'); });
    resetBtn.addEventListener('focus',      function() { resetTip.classList.add('tooltip-panel--visible'); });
    resetBtn.addEventListener('blur',       function() { resetTip.classList.remove('tooltip-panel--visible'); });
  }

  /* 드롭다운 선택값 요약 업데이트 */
  function updateSummary(dd) {
    var sel   = Array.from(dd.querySelectorAll('.dropdown__option--selected'));
    var val   = dd.querySelector('.dropdown__value');
    var count = dd.querySelector('.dropdown__count');
    var tip   = dd.querySelector('.tooltip-panel');
    if (!val) return;
    if (count) count.hidden = true;
    if (sel.length === 0) {
      val.textContent = dd.dataset.placeholder || '';
      val.classList.add('dropdown__value--placeholder');
      if (tip) tip.textContent = '';
    } else {
      var labels = sel.map(function(o) { return o.querySelector('.dropdown__option-label').textContent; });
      val.textContent = labels.length > 1 ? labels[0] + ' 외 ' + (labels.length - 1) : labels[0];
      val.classList.remove('dropdown__value--placeholder');
      if (tip) tip.textContent = labels.join(', ');
    }
  }

  /* 드롭다운 placeholder 저장 + tooltip hover */
  container.querySelectorAll('.dropdown').forEach(function(dd) {
    var val = dd.querySelector('.dropdown__value');
    if (val) dd.dataset.placeholder = val.textContent.trim();
    var trigger = dd.querySelector('.dropdown__trigger');
    var tip     = dd.querySelector('.tooltip-panel');
    if (!trigger || !tip) return;
    trigger.addEventListener('mouseenter', function() { if (tip.textContent.trim()) tip.classList.add('tooltip-panel--visible'); });
    trigger.addEventListener('mouseleave', function() { tip.classList.remove('tooltip-panel--visible'); });
    trigger.addEventListener('focus',      function() { if (tip.textContent.trim()) tip.classList.add('tooltip-panel--visible'); });
    trigger.addEventListener('blur',       function() { tip.classList.remove('tooltip-panel--visible'); });
  });

  /* 드롭다운 옵션 클릭 → 요약 + reset 동기화 */
  container.querySelectorAll('.dropdown .dropdown__option').forEach(function(opt) {
    opt.addEventListener('click', function() {
      setTimeout(function() {
        var dd = opt.closest('.dropdown');
        if (dd) updateSummary(dd);
        syncReset();
      }, 0);
    });
  });

  /* DRP change 이벤트 → reset 동기화 */
  drpEls.forEach(function(drp) {
    drp.addEventListener('drp:change', function() { syncReset(); });
  });

  /* 검색 clear 버튼 — 텍스트 바로 옆(input.md positionClear 패턴 동일) */
  function getSearchTextWidth() {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var cs = getComputedStyle(searchInput);
    ctx.font = cs.fontSize + ' ' + cs.fontFamily;
    return ctx.measureText(searchInput.value).width;
  }
  function positionClear() {
    if (!clearBtn || clearBtn.hidden) return;
    var cs  = getComputedStyle(searchInput);
    var pl  = parseFloat(cs.paddingLeft);
    var pr  = parseFloat(cs.paddingRight);
    var max = searchInput.offsetWidth - pr - (clearBtn.offsetWidth || 16);
    clearBtn.style.left  = Math.min(pl + getSearchTextWidth() + 4, max) + 'px';
    clearBtn.style.right = 'auto';
  }

  /* 검색 */
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var hasVal = !!searchInput.value;
      if (clearBtn) clearBtn.hidden = !hasVal;
      if (searchWrap) searchWrap.classList.toggle('input-wrap--clearable', hasVal);
      positionClear();
      syncReset();
    });
    searchInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') syncReset(); });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      if (searchInput) searchInput.value = '';
      clearBtn.hidden = true;
      clearBtn.style.left  = '';
      clearBtn.style.right = '';
      if (searchWrap) searchWrap.classList.remove('input-wrap--clearable');
      syncReset();
    });
  }
  if (searchBtn) {
    searchBtn.addEventListener('click', function() { syncReset(); });
  }

  /* 초기화 */
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      container.querySelectorAll('.dropdown').forEach(function(dd) {
        dd.querySelectorAll('.dropdown__option').forEach(function(o) {
          o.classList.remove('dropdown__option--selected');
          o.setAttribute('aria-selected', 'false');
        });
        var val   = dd.querySelector('.dropdown__value');
        var count = dd.querySelector('.dropdown__count');
        var tip   = dd.querySelector('.tooltip-panel');
        if (val)   { val.textContent = dd.dataset.placeholder || ''; val.classList.add('dropdown__value--placeholder'); }
        if (count) count.hidden = true;
        if (tip)   { tip.textContent = ''; tip.classList.remove('tooltip-panel--visible'); }
      });
      drpEls.forEach(function(drp) { drp.dispatchEvent(new CustomEvent('drp:reset')); });
      if (searchInput) searchInput.value = '';
      if (clearBtn)    clearBtn.hidden = true;
      if (searchWrap)  searchWrap.classList.remove('input-wrap--clearable');
      syncReset();
    });
  }

  /* ── 필터 시트 (sm) ── */
  /* sm에서 필터 전부가 「필터」 버튼 하나 뒤로 들어간다. 마크업은 한 벌이고,
     md 이상에서는 CSS가 시트 껍데기를 display:contents로 없앤다.
     그래서 이 JS가 하는 일은 두 가지뿐이다 — 열고 닫기, 그리고 **폭에 따라 dialog 역할을 켜고 끄기.**
     역할을 그대로 두면 md에서 바 안에 열린 dialog가 하나 서 있는 셈이 되어
     스크린리더가 "대화상자"라고 읽는다. 보이는 것과 읽히는 것이 어긋나면 안 된다. */
  var toggle = container.querySelector('.filter-bar__toggle');
  var sheet  = container.querySelector('.filter-bar__sheet');
  var sheetModal = sheet ? sheet.querySelector('.modal') : null;
  var countEl = toggle ? toggle.querySelector('.filter-bar__toggle-count') : null;
  var smQuery = window.matchMedia('(max-width: 767px)');

  function activeFilterCount() {
    var n = Array.from(container.querySelectorAll('.dropdown')).filter(function(dd) {
      return !!dd.querySelector('.dropdown__option--selected');
    }).length;
    n += drpEls.filter(function(d) { return d.classList.contains('drp--active'); }).length;
    return n;
  }
  function syncCount() {
    if (!countEl) return;
    var n = activeFilterCount();
    countEl.textContent = n;
    countEl.hidden = n === 0;
  }
  function openSheet() {
    if (!sheet) return;
    sheet.hidden = false;
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    /* 뒤 목록이 같이 스크롤되면 시트를 닫고 나서 엉뚱한 자리에 있게 된다 */
    document.body.style.overflow = 'hidden';
    var first = sheet.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (first) first.focus();
  }
  function closeSheet(returnFocus) {
    if (!sheet) return;
    sheet.hidden = true;
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (returnFocus && toggle) toggle.focus();
  }
  /* 폭에 따라 dialog 역할을 켜고 끈다. md에서는 시트가 바의 칸일 뿐이라 역할이 없어야 한다. */
  function syncSheetRole() {
    if (!sheet || !sheetModal) return;
    if (smQuery.matches) {
      sheetModal.setAttribute('role', 'dialog');
      sheetModal.setAttribute('aria-modal', 'true');
      if (!sheet.hidden && toggle && toggle.getAttribute('aria-expanded') !== 'true') sheet.hidden = true;
    } else {
      sheetModal.removeAttribute('role');
      sheetModal.removeAttribute('aria-modal');
      closeSheet(false);      /* md로 넓어지면 열려 있던 시트를 닫는다(스크롤 잠금도 함께 풀린다) */
      sheet.hidden = false;   /* md에서는 바의 칸이므로 숨기지 않는다 */
    }
  }

  if (toggle && sheet) {
    toggle.addEventListener('click', function() {
      if (sheet.hidden) openSheet(); else closeSheet(true);
    });
    /* 배경(시트 바깥)을 누르면 닫는다 — 판 자체를 누른 것과 구분한다 */
    sheet.addEventListener('click', function(e) { if (e.target === sheet) closeSheet(true); });
    sheet.querySelectorAll('[data-fb-close], [data-fb-apply]').forEach(function(el) {
      el.addEventListener('click', function() { closeSheet(true); });
    });
    sheet.querySelectorAll('[data-fb-reset]').forEach(function(el) {
      el.addEventListener('click', function() { if (resetBtn) resetBtn.click(); });
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !sheet.hidden && smQuery.matches) closeSheet(true);
    });
    smQuery.addEventListener('change', syncSheetRole);
    syncSheetRole();
  }

  /* 선택이 바뀔 때마다 「필터」 위의 수를 갱신한다 — 시트를 열지 않고도 걸린 것이 보여야 한다 */
  container.addEventListener('click', function() { setTimeout(syncCount, 0); });
  container.addEventListener('drp:change', syncCount);

  /* 초기 상태 동기화 */
  syncReset();
  syncCount();
}


/* ── Table·Data ── */
function initTableCellEdit(container) {
  container.querySelectorAll('[data-cell-edit]').forEach(function (cell) {
    if (cell.dataset.initCellEdit) return;
    cell.dataset.initCellEdit = '1';
    var toggle = cell.querySelector('.table__cell__edit-toggle');
    var view   = cell.querySelector('.table__cell__view');
    var editor = cell.querySelector('.table__cell__editor');
    if (!toggle || !view || !editor) return;
    var useEl = toggle.querySelector('use');

    function setIcon(name) { if (useEl) useEl.setAttribute('href', '#' + name); }
    function control() { return editor.querySelector('.input, .dropdown, .dp'); }
    function readValue() {
      var el = control();
      if (!el) return view.textContent;
      if (el.classList.contains('input')) return el.value;
      if (el.classList.contains('dropdown')) {
        var v = el.querySelector('.dropdown__value');
        return v && !v.classList.contains('dropdown__value--placeholder') ? v.textContent.trim() : '';
      }
      if (el.classList.contains('dp')) {
        var p = el.querySelectorAll('.dp__value-part');
        return p.length === 3 && p[0].value ? (p[0].value + '.' + p[1].value + '.' + p[2].value) : '';
      }
      return view.textContent;
    }
    function focusControl() {
      var el = control(); if (!el) return;
      var f = el.classList.contains('input') ? el : el.querySelector('input, button, .dropdown__trigger, .dp__trigger');
      if (f && f.focus) f.focus();
    }
    function enter() { cell.classList.add('table__cell--editing'); toggle.setAttribute('aria-label', '저장'); setIcon('icon-check'); focusControl(); }
    function save()  { var val = readValue(); view.textContent = val === '' ? '—' : val; cell.classList.remove('table__cell--editing'); toggle.setAttribute('aria-label', '수정'); setIcon('icon-edit'); }
    function cancel(){ cell.classList.remove('table__cell--editing'); toggle.setAttribute('aria-label', '수정'); setIcon('icon-edit'); }

    toggle.addEventListener('click', function () {
      if (cell.classList.contains('table__cell--editing')) save(); else enter();
    });
    cell.addEventListener('keydown', function (e) {
      if (!cell.classList.contains('table__cell--editing')) return;
      /* 드롭다운·데이트피커 패널이 열린 Enter는 옵션·날짜 선택용이므로 저장하지 않는다 */
      if (e.key === 'Enter' && !e.target.closest('.dropdown__panel, .dp__panel')) { e.preventDefault(); save(); }
      else if (e.key === 'Escape') { e.preventDefault(); cancel(); }
    });
  });
}
if (!window.__componentInits.initTableCellEdit) window.__componentInits.initTableCellEdit = initTableCellEdit;
