/* ── Prototype Chrome · 무대(폭 · 틀 · 비교) ──
   「어떻게 볼까」를 맡는다. `.proto-content`를 iframe으로 갈아끼우는 쪽이라,
   거기 붙어 있던 것(머리글·툴바)은 갈아끼운 뒤 **다시 붙여야 한다** — 그래서
   show()가 끝에서 ctx.renderBrief()·ctx.toolbarEl()을 부른다.

   `.proto-viewport`가 없으면 거짓을 돌려준다. 그 문서에는 폭을 고를 자리가 없고,
   무대가 없으면 그 위에 설 것들(툴바 · 화면설명 · #s해시)도 설 자리가 없다. */
window.ProtoChrome = window.ProtoChrome || {};

(function (PC) {

  PC.stage = function (ctx) {
    var root = ctx.root, layout = ctx.layout, content = ctx.content, toggle = ctx.toggle;

    var vp = ctx.vp = ctx.sidebar && ctx.sidebar.querySelector('.proto-viewport');
    if (!vp || !content) return false;

    var VIEWS = PC.VIEWS, COMPARE = PC.COMPARE;

    /* 화면을 **틀에 끼워** 보여 주는 프로토타입인가 — 틀을 세우기 전에 본다.
       세우고 나면 프로토타입의 원래 자식은 떨어져 나가 더는 물어볼 수 없다.
       크롬이 만든 틀(.proto-frame)이 아닌 iframe이 있으면 그것이 「끼운 화면」이고,
       06-toolbar가 그 주소를 주는 「원본 링크」 버튼을 세운다. */
    ctx.hasScreen = !!content.querySelector('iframe:not(.proto-frame)');

    var original = null;  /* 자유로 돌아갈 원래 자식들 */
    var frames = [];      /* 지금 살아 있는 iframe들 */
    var cells = [];       /* 비교 모드의 { key, box, frame } */
    ctx.mode = 'free';
    ctx.single = null;    /* { frame, readout, width } — 틀 안에서 온 보고(05-nav)가 읽는다 */

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
      u.searchParams.set('proto-view', ctx.mode);
      var sc = currentScenario(btn);
      if (sc) u.searchParams.set('scenario', sc); else u.searchParams.delete('scenario');
      return u.toString();
    }
    function syncSrc(btn) {
      var src = frameSrc(btn);
      frames.forEach(function (f) { if (f.dataset.src !== src) { f.dataset.src = src; f.src = src; } });
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
      f.addEventListener('load', function () {
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
        out.searchParams.set('proto-view', ctx.mode);
        location.href = out.toString();
      });
      f.dataset.view = ctx.mode;   /* 안쪽이 틀을 벗어날 때 읽어 간다 */
      frames.push(f);
      return f;
    }
    /* 무대가 **실제로 쓸 수 있는** 폭. 화면설명이 옆에 서면 그만큼 줄어든다 —
       `.proto-content`를 그대로 재면 패널 몫까지 제 것으로 세어, 비교 배율이 넘치고
       (실측: 1280 창에서 가로로 +401px) 사이드바는 접어야 할 때 접지 않는다. */
    function stageWidth() {
      var w = content.clientWidth;
      var panel = ctx.brief;
      if (panel && !panel.hidden && panel.parentNode === content) w -= panel.offsetWidth;
      return w;
    }
    /* 자리가 모자라면 사이드바를 접는다 — 그 251px이 폭을 먹는 장본인이다.
       접기만 하고 펴지는 않는다: 사람이 다시 펴면 그 선택이 남아야 한다. */
    function makeRoom(need) {
      if (toggle && stageWidth() < need && !layout.classList.contains('is-nav-collapsed')) toggle.click();
    }
    function takeOver() {
      if (!original) original = Array.prototype.slice.call(content.childNodes);
      frames = []; ctx.single = null; cells = [];
      /* 틀을 세운 동안에만 격자가 된다 — 화면설명이 위가 아니라 **옆**에 선다.
         「자유」에서는 이 자리에 프로토타입의 원래 자식이 돌아오므로 격자를 벗는다.
         남의 마크업을 격자 칸에 끼우면 어디로 갈지 우리가 정할 수 없다. */
      content.classList.add('has-proto-stage');
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
      function mkHandle(mod, title) {
        var el = document.createElement('div');
        el.className = 'proto-frame-handle' + (mod ? ' proto-frame-handle--' + mod : '');
        el.title = title;
        return el;
      }
      var handle  = mkHandle('',       '끌어서 폭 조절');
      var handleV = mkHandle('v',      '끌어서 높이 조절');
      var handleC = mkHandle('corner', '끌어서 폭·높이 조절');
      stage.append(frame, handle, handleV, handleC);
      var readout = document.createElement('div'); readout.className = 'proto-readout';
      wrap.append(stage, readout);
      content.replaceChildren(wrap);
      ctx.single = { frame: frame, readout: readout, width: w, height: h };
      setSize(w, h);

      /* 끌기 — 세 손잡이가 같은 절차를 쓴다. 다른 것은 **이동거리를 크기로 옮기는 식**뿐이라
         그것만 넘긴다(셋이 각자 pointer 처리를 복사하면 하나 고칠 때 셋을 고쳐야 한다).
           폭  — 무대가 가운데 정렬이라 오른쪽 모서리가 손끝을 따라오려면 **두 배**로 변해야 한다
           높이 — 틀은 위가 고정이라(무대가 세로로 쌓는다) **그대로** 변한다 */
      function bindDrag(el, apply) {
        el.addEventListener('pointerdown', function (e) {
          e.preventDefault();
          el.setPointerCapture(e.pointerId);
          el.classList.add('is-dragging');
          var x0 = e.clientX, y0 = e.clientY, w0 = ctx.single.width, h0 = ctx.single.height;
          function move(ev) { apply(w0, h0, ev.clientX - x0, ev.clientY - y0); }
          function up() {
            el.classList.remove('is-dragging');
            el.removeEventListener('pointermove', move);
            el.removeEventListener('pointerup', up);
          }
          el.addEventListener('pointermove', move);
          el.addEventListener('pointerup', up);
        });
      }
      bindDrag(handle,  function (w0, h0, dx)     { setSize(w0 + dx * 2, h0); });
      bindDrag(handleV, function (w0, h0, dx, dy) { setSize(w0, h0 + dy); });
      bindDrag(handleC, function (w0, h0, dx, dy) { setSize(w0 + dx * 2, h0 + dy); });
    }
    function setSize(w, h) {
      var single = ctx.single;
      if (!single) return;
      w = Math.max(PC.MIN_W, Math.round(w));
      h = Math.max(PC.MIN_H, Math.round(h));
      single.width = w; single.height = h;
      /* 크기는 iframe에 직접 준다 — content-box라 이 값이 **안쪽 뷰포트**의 크기다.
         높이도 마찬가지라, 줄이면 안쪽에서 `100dvh`·`--fit` 같은 규칙이 실제로 다시 걸린다. */
      single.frame.style.width = w + 'px';
      single.frame.style.height = h + 'px';
      var named = Object.keys(VIEWS).filter(function (k) { return VIEWS[k][0] === w && VIEWS[k][1] === single.height; })[0];
      /* **끌고 있는 동안에도 지금 어느 구간인지 말해 준다.** 전에는 이름난 폭에 정확히
         닿았을 때만 이름이 떴다 — 1042px을 보면서 「그래서 이게 태블릿인가 데스크톱인가」를
         스스로 따져야 했다. 구간은 `adaptation.md`의 정의 그대로다(sm <768 · md 768~1024 · lg 1024~).
         버튼이 켜지는 규칙은 그대로 둔다: 켜짐은 「이 폭 그대로」라는 뜻이라 근처와 같지 않다. */
      single.readout.innerHTML =
        '<b>' + w + '</b> × ' + single.height + ' px · ' + PC.bandOf(w) +
        (named ? '' : ' 구간') + ' — 모서리를 끌어 조절';
      /* 기준 크기(이름난 폭 **그리고** 그 높이)일 때만 평상복이다 */
      single.readout.classList.toggle('proto-readout--off', !named);
      /* 이름 있는 폭에서만 버튼이 켜진다. 끌어서 벗어나면 어느 것도 켜지지 않는다 —
         1042px을 보면서 lg가 눌려 있으면 그 표시가 거짓말이 된다. */
      mark(named || '');
    }

    /* ── 비교 — 셋을 한 화면에 ── */
    function buildCompare() {
      takeOver();
      var wrap = document.createElement('div'); wrap.className = 'proto-frame-wrap';
      var row = document.createElement('div'); row.className = 'proto-frames';
      COMPARE.forEach(function (key) {
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
      COMPARE.forEach(function (k) { sumW += VIEWS[k][0]; maxH = Math.max(maxH, VIEWS[k][1]); });
      /* 배율은 하나다 — 셋을 각자 맞추면 나란히 놓은 뜻이 사라진다.
         배율이 곱해지지 않는 것들(테두리·gap·레이블 줄)을 먼저 빼고 나눈다.
         이걸 빠뜨리면 셋째 틀이 화면 밖으로 20px쯤 잘려 나간다 — content-box라
         테두리 2px이 폭에 더해지는데 배율에는 걸리지 않기 때문이다. */
      var chrome = PC.CELL_GAP * (COMPARE.length - 1) + PC.BORDER * COMPARE.length;
      var availW = stageWidth() - chrome;
      var availH = window.innerHeight - 40 - 24 - PC.BORDER;   /* 셸 상하 padding + 레이블 줄 */
      var s = Math.min(availW / sumW, availH / maxH, 1);
      s = Math.floor(s * 1000) / 1000;   /* 올림 오차로 다시 넘치지 않게 내림 */
      cells.forEach(function (c) {
        var w = VIEWS[c.key][0], h = VIEWS[c.key][1];
        c.box.style.width = Math.floor(w * s) + 'px';
        c.box.style.height = Math.floor(h * s) + 'px';
        c.frame.style.transform = 'scale(' + s + ')';
      });
    }

    function mark(active) {
      vp.querySelectorAll('.proto-viewport__btn').forEach(function (b) {
        var on = b.dataset.viewport === active;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
    function show(next) {
      ctx.mode = next;
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
        content.classList.remove('has-proto-stage');
        if (original) { content.replaceChildren.apply(content, original); original = null; }
        frames = []; ctx.single = null; cells = [];
        ctx.renderBrief(); ctx.toolbarEl();
        return;
      }
      if (next === 'compare') { makeRoom(Infinity); buildCompare(); }
      else { makeRoom(VIEWS[next][0]); buildSingle(VIEWS[next][0], VIEWS[next][1]); }
      syncSrc();
      /* **폭을 바꾸면 `.proto-content`가 새로 지어진다** — 머리글도 그때 다시 붙여야 한다.
         처음엔 목록의 클래스 변화만 보고 그렸는데, 폭만 바꾸면 목록은 그대로라 관찰자가
         깨어나지 않아 머리글이 사라진 채 돌아오지 않았다(실측: 비교 → lg 후 DOM에 없음).
         화면을 다시 짓는 쪽이 다시 그리라고 말하는 것이 맞다. */
      ctx.renderBrief(); ctx.toolbarEl();
      /* 배율은 **패널이 선 뒤에** 다시 잡는다. 첫 그림에서는 renderBrief 가 패널을
         만들기 전이라 stageWidth 가 아직 패널 몫을 모른다 — 그대로 두면 처음 한 번은
         넘친 채로 서고, 창을 건드려야 맞는다. */
      if (next === 'compare') layoutCompare();
    }
    ctx.show = show;

    vp.addEventListener('click', function (e) {
      var btn = e.target.closest('.proto-viewport__btn');
      if (btn) show(btn.dataset.viewport);
    });

    /* 창이 바뀌면 비교 배율을 다시 잡는다 — 배율이 굳어 있으면 넘치거나 남는다 */
    window.addEventListener('resize', function () { if (ctx.mode === 'compare') layoutCompare(); ctx.syncDevice(); });

    /* 시나리오를 바꾸면 틀 안도 따라간다 — 틀이 떠 있는 동안 바깥 버튼은 가려지지 않는다 */
    root.querySelectorAll('.proto-nav-btn').forEach(function (b) {
      b.addEventListener('click', function () { syncSrc(b); });
    });

    return true;
  };

})(window.ProtoChrome);
