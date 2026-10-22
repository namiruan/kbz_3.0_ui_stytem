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

/* ── Prototype Chrome · 공통 값과 순수 헬퍼 ──
   바깥 상태를 읽지 않는 것만 여기 둔다. 여기 있는 것은 어느 모듈에서 불러도
   같은 답을 내므로, 어디서 부르는지 따질 필요가 없다.

   전역에 흩어 두지 않고 `ProtoChrome` 한 지붕 아래 모은다 — 번들은 프로토타입
   파일과 같은 전역을 쓰고, 거기엔 이미 그 파일의 이름들이 산다. */
window.ProtoChrome = window.ProtoChrome || {};

(function (PC) {

  /* 폭 × 높이. 높이는 비교 모드의 세로 비율을 위해 쓴다(기기 느낌이 나야 크기가 읽힌다) */
  PC.VIEWS = { lg: [1280, 800], md: [768, 1024], sm: [390, 844] };
  /* 이름은 `adaptation.md`의 표를 그대로 쓴다 — 크롬이 따로 짓지 않는다 */
  PC.VIEW_NAME = { lg: '데스크톱', md: '태블릿', sm: '모바일' };
  PC.COMPARE = ['lg', 'md', 'sm'];
  PC.CELL_GAP = 16;   /* .proto-frames의 gap과 같아야 한다 */
  PC.MIN_W = 320;     /* 이보다 좁은 기기는 없다 */
  PC.MIN_H = 320;     /* 가로로 눕힌 기기도 이보다 낮지 않다 */
  PC.BORDER = 2;      /* 틀 좌우 테두리 — content-box라 폭에 더해지고 배율에는 안 걸린다 */

  /* 구간은 `adaptation.md`의 정의 그대로다(sm <768 · md 768~1024 · lg 1024~) */
  PC.bandOf = function (w) { return w < 768 ? 'sm 모바일' : w < 1024 ? 'md 태블릿' : 'lg 데스크톱'; };
  PC.bandKey = function (w) { return w < 768 ? 'sm' : w < 1024 ? 'md' : 'lg'; };

  PC.esc = function (t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };

  PC.listHtml = function (raw) {
    return raw.split('|').map(function (t) { return t.trim(); }).filter(Boolean)
              .map(function (t) { return '<li>' + PC.esc(t) + '</li>'; }).join('');
  };

  /* 「볼 것」이 길어지면 어느 구역 이야기인지 매번 화면과 글 사이를 오가며 찾아야 한다
     (실측: 한 시나리오에 최대 열두 줄, 셋 중 하나는 40자가 넘는다). 항목 앞에
     `구역 ▸ `를 붙이면 **잇달아 오는 같은 구역끼리 묶어** 소제목을 세운다.
     붙이지 않은 항목은 지금 그대로 나온다 — 282개를 한꺼번에 고치게 하지 않는다.

     가름표가 `:`가 아닌 까닭: 본문에 이미 `00:00`과 `tel:1588-3818`이 있어
     앞머리만 보고 가르면 「타이머가 00」을 구역 이름으로 집는다. `▸`는 지금 한 번도
     쓰이지 않았다. 「볼 것」에만 쓴다 — 「이렇게 하면」은 번호 매긴 차례라
     중간에 소제목이 들어가면 번호가 다시 1부터 시작한다(길어야 세 줄이라 묶을 것도 없다). */
  PC.SECTION_MARK = ' ▸ ';
  /* 항목이 **화면의 어디** 이야기인지 적을 수 있다 — `@{선택자}` 를 앞에 붙이면 그 항목에
     손이 닿을 때 틀 안의 그 요소를 짚어 준다(07-brief). 구역이 「어느 자리인가」를 말로
     답한다면 이것은 **손가락으로 가리킨다.**
       data-look="꼬리표 ▸ @{.es-tag} 일용직·상용직 꼬리표는 …"
     중괄호로 감싸는 것은 선택자에 **띄어쓰기가 들어갈 수 있기 때문**이다(`.a .b`).
     붙이지 않은 항목은 전과 똑같이 글자로만 나온다 — 282개를 한꺼번에 고치게 하지 않는다. */
  PC.SPOT_RE = /^@\{([^}]*)\}\s*/;
  /* **그 폭에서만 보이는 항목.** 앞에 `@sm`·`@md`·`@lg` 를 붙이면 그 폭에서만 나온다.
     좁은 폭에서만 생기는 것(물음표로 접히는 설명 따위)을 「좁은 폭」이라는 따로 만든
     묶음에 몰아넣지 않아도 된다.
     ⚠ 거르지 않고 **뱃지로 알린다.** 한때는 다른 폭에서 아예 숨겼는데 — 「보고 있지도
        않은 폭의 이야기를 읽을 까닭이 없다」 — 그 바람에 넓은 폭만 보던 사람은
        모바일에서 답 바가 떠다닌다는 것을 **있는 줄도 몰랐다.** 말해 주지 않으면 모를
        동작일수록 숨기면 안 된다. 지금 폭에 해당하면 뱃지가 흰 면으로 채워지고,
        아니면 테두리만 남는다. 뱃지는 **글 바로 앞**에 선다(chrome.css 참조).
     ⚠ 둘 이상 붙일 수 있다(`@sm @md`). CSS 중단점은 미리보기 폭과 맞아떨어지지
        않는다 — 820px 에서 갈리는 것은 sm(390)·md(768) 둘 다 해당한다. */
  PC.BAND_RE = /^@(sm|md|lg)\s+/;
  PC.BAND_LABEL = { lg: '데스크톱', md: '태블릿', sm: '모바일' };
  PC.BAND_ORDER = ['lg', 'md', 'sm'];
  /* 폭마다 **따로** 버튼을 낸다 — 「태블릿·모바일」 한 덩이로 묶으면 눌렀을 때 어느
     폭으로 가는지 알 수 없고, 지금 폭이 둘 중 어느 쪽인지도 못 가린다.
     넓은 쪽부터 적는다(데스크톱 → 태블릿 → 모바일 — 툴바의 차례 그대로). */
  PC.bandTagHtml = function (bands, band) {
    if (!bands.length) return '';
    return '<span class="proto-brief__bands">' +
      PC.BAND_ORDER.filter(function (b) { return bands.indexOf(b) >= 0; })
        .map(function (b) {
          var on = b === band;
          return '<button type="button" class="proto-brief__band' + (on ? ' is-on' : '') + '"' +
                 ' data-band="' + b + '" aria-pressed="' + (on ? 'true' : 'false') + '"' +
                 ' title="' + (on ? '지금 이 폭입니다' : PC.BAND_LABEL[b] + ' 폭으로 바꿔서 봅니다') + '">' +
                 PC.esc(PC.BAND_LABEL[b]) + '</button>';
        }).join('') + '</span>';
  };

  PC.groupedListHtml = function (raw, band) {
    var groups = [];
    raw.split('|').map(function (t) { return t.trim(); }).filter(Boolean).forEach(function (t) {
      var i = t.indexOf(PC.SECTION_MARK);
      var region = i > 0 ? t.slice(0, i).trim() : '';
      var text = i > 0 ? t.slice(i + PC.SECTION_MARK.length).trim() : t;
      /* 폭 표시를 먼저 떼고 거른다 — 걸러진 항목은 묶음에도 들지 않으므로,
         그 폭에서만 쓰이는 묶음은 이름까지 통째로 사라진다. */
      var bands = [], bm;
      while ((bm = PC.BAND_RE.exec(text))) {
        bands.push(bm[1]);
        text = text.slice(bm[0].length);
      }
      var spot = '';
      var m = PC.SPOT_RE.exec(text);
      if (m) { spot = m[1].trim(); text = text.slice(m[0].length); }
      var last = groups[groups.length - 1];
      var item = { text: text, spot: spot, bands: bands };
      if (last && last.region === region) last.items.push(item);
      else groups.push({ region: region, items: [item] });
    });
    return groups.map(function (g) {
      return (g.region ? '<h4 class="proto-brief__region">' + PC.esc(g.region) + '</h4>' : '') +
             '<ul>' + g.items.map(function (it) {
               /* 짚을 곳이 있으면 **버튼**이다 — 키보드로도 닿아야 하고, 닿을 수 있다는 것이
                  보여야 한다. 없으면 그냥 글자다(없는 동작을 암시하지 않는다).
                  `title` 은 **손이 닿았을 때만** 「누르면 무슨 일이 나는지」를 말한다 —
                  닿았다고 화면을 움직이지는 않는다(07-brief 참조). */
               return '<li>' + PC.bandTagHtml(it.bands, band) + (it.spot
                 ? '<button type="button" class="proto-brief__spot" aria-pressed="false"' +
                   ' title="화면에서 이 부분 보기" data-spot="' + PC.esc(it.spot) + '">' +
                   PC.esc(it.text) + '</button>'
                 : PC.esc(it.text)) + '</li>';
             }).join('') + '</ul>';
    }).join('');
  };

  /* 「끼운 화면」의 iframe — 크롬이 만든 틀(.proto-frame)이 아닌 것. 06-toolbar 의
     원본 링크와 07-brief 의 짚기가 같은 규칙으로 화면을 찾는다. */
  PC.screenFrameIn = function (doc) {
    try {
      var host = doc && doc.querySelector('.proto-content');
      return (host && host.querySelector('iframe:not(.proto-frame)')) || null;
    } catch (e) { return null; }   /* 다른 출처면 못 들여다본다 */
  };

  /* ── 주소 가져가기 ──
     주소는 이미 「무엇을」(`#s`번호)과 「어떻게」(`proto-view`)를 다 들고 있다. 가져갈 때
     남길 것은 **「무엇을」뿐이다** — 폭은 받는 기기가 정한다. 모바일 미리보기를 보던 주소를
     그대로 보내면 폰 안에 390 틀이 또 생긴다(폰에서 폰을 미리 보는 그림이다).
     크롬이 쓰는 값만 덜어 내고 프로토타입 제 쿼리(`?docId=` 같은)는 남긴다 — 그건
     「어떻게 볼까」가 아니라 「무엇을」의 일부라, 지우면 다른 화면을 보내게 된다. */
  PC.shareUrl = function () {
    var u;
    try { u = new URL(location.href); } catch (e) { return location.href; }
    ['proto-view', 'proto-frame', 'scenario'].forEach(function (k) { u.searchParams.delete(k); });
    return u.toString();
  };

  /* 이 컴퓨터에서만 열리는 주소 — 같은 공유기의 `192.168.x.x`는 **여기 없다.**
     폰에서 실제로 열리기 때문이다(경고할 일이 아니다). */
  PC.localOnly = function () {
    var h = location.hostname;
    return location.protocol === 'file:' ||
           h === 'localhost' || h === '127.0.0.1' || h === '::1' || h === '0.0.0.0';
  };

  /* 복사는 **두 벌**이다. `navigator.clipboard`는 보안 컨텍스트에서만 있는데, 폰에서 보려고
     같은 공유기의 `http://192.168.x.x`로 띄운 순간이 정확히 그 경우다(https도 localhost도 아니다).
     `execCommand`는 낡았지만 그 자리를 메우는 것이 아직 없다. 둘 다 안 되면 주소를 띄워
     손으로 복사하게 한다 — **복사가 안 됐는데 됐다고 말하지 않는다.** */
  PC.execCopy = function (text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:-9999px';
    document.body.appendChild(ta);
    ta.select(); try { ta.setSelectionRange(0, text.length); } catch (e) {}
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    return ok;
  };

  PC.copyText = function (text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(PC.execCopy(text)); });
      return;
    }
    done(PC.execCopy(text));
  };

})(window.ProtoChrome);
/* ── Prototype Chrome · 틀 안에서 열린 문서 ──
   크롬이 할 일을 **하지 않기로** 정하는 자리다. 참을 돌려주면 바깥 초기화가 거기서 멈춘다. */
window.ProtoChrome = window.ProtoChrome || {};

(function (PC) {

  PC.framed = function (ctx) {
    var root = ctx.root, params = ctx.params;

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
        return true;
      } catch (e) {}   /* 다른 출처면 그대로 둔다 */
    }

    /* 틀 안에서 열린 문서 — 크롬을 벗는다. 이 분기에서는 컨트롤을 달지 않는다
       (틀 안에 또 폭 전환이 생기면 무엇을 보고 있는지 알 수 없다). */
    if (params.get('proto-frame') === '1') {
      document.documentElement.classList.add('proto-framed');
      var want = params.get('scenario');
      var applyScenario = function () {
        if (!want) return;
        var target = root.querySelector('.proto-nav-btn[data-scenario="' + want + '"]');
        if (target) target.click();
      };
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
        var tellParent = function () {
          var a = fnav.querySelector('.proto-nav-btn.is-active');
          var sc = a ? a.dataset.scenario : '';
          if (!sc || sc === lastSc) return;
          lastSc = sc;
          try { window.parent.postMessage({ source: 'proto-chrome', type: 'scenario', scenario: sc }, '*'); } catch (e) {}
        };
        new MutationObserver(tellParent).observe(fnav, { subtree: true, attributes: true, attributeFilter: ['class'] });
      }
      return true;
    }

    return false;
  };

})(window.ProtoChrome);
/* ── Prototype Chrome · 사이드바 접기 ──
   `.proto-viewport`가 없는 문서에서도 도는 유일한 모듈이다 — 접기는 틀과 무관하다. */
window.ProtoChrome = window.ProtoChrome || {};

(function (PC) {

  PC.sidebar = function (ctx) {
    var layout = ctx.layout;
    ctx.sidebar = layout.querySelector('.proto-sidebar');
    ctx.content = layout.querySelector('.proto-content');

    var toggle = ctx.toggle = ctx.sidebar && ctx.sidebar.querySelector('.proto-nav-toggle');
    if (!toggle) return;

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
    toggle.addEventListener('click', function () {
      setCollapsed(!layout.classList.contains('is-nav-collapsed'));
    });
  };

})(window.ProtoChrome);
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

    var compareWrap = null;  /* 비교 모드의 .proto-frame-wrap — 배율을 그 안쪽 폭으로 잰다 */
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
      f.className = 'proto-frame is-loading';
      f.title = '화면 미리보기';
      /* **다 뜨면 벗는다.** 틀 안은 문서가 넷(바깥 → 틀 → 화면 → 끼운 화면) 겹으로
         차례차례 서는 자리라, 그동안 아무것도 그려지지 않아 흰 판으로 남는다.
         흰 판은 「다 떴는데 비었다」로 읽혀 고장처럼 보인다 — 기다리는 중임을 적는다. */
      f.addEventListener('load', function () { f.classList.remove('is-loading'); });
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
      if (panel && !panel.hidden && content.contains(panel)) w -= panel.offsetWidth;
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
      /* 화면설명 카드가 설 자리. 단일 폭에서만 생긴다 — 비교는 셋을 견주는 자리라
         설명이 서지 않고, 「자유」에는 판 자체가 없다. */
      ctx.stageRow = null;
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
      /* 판 위에 **나란히 놓인 둘**이다 — 틀(+크기표시) 한 칸, 설명 카드 한 칸.
         전에는 설명을 판 **바깥** 오른쪽에 붙박아 두었더니 「화면에 딸린 카드」가 아니라
         「화면 옆에 붙은 판」으로 읽혔다. 같은 바닥 위에 올려야 둘이 한 짝이 된다. */
      var col = document.createElement('div'); col.className = 'proto-stage-col';
      col.append(stage, readout);
      var row = document.createElement('div'); row.className = 'proto-stage-row';
      row.appendChild(col);
      wrap.appendChild(row);
      content.replaceChildren(wrap);
      ctx.stageRow = row;   /* 07-brief 가 카드를 여기 붙인다 */
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
      compareWrap = wrap;
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
      /* **판의 안쪽 폭**으로 잰다. 바깥 칸의 폭을 그대로 쓰면 판이 두른 여백(좌우 16px씩)을
         빼먹어 셋째 틀이 그만큼 잘려 나간다 — 실측 +28px. 패널을 옆에 세우기 전부터 있던
         흠인데, 그때는 칸과 판의 폭이 같아 눈에 덜 띄었다. */
      var pad = 0;
      if (compareWrap) {
        var wcs = getComputedStyle(compareWrap);
        pad = (parseFloat(wcs.paddingLeft) || 0) + (parseFloat(wcs.paddingRight) || 0);
      }
      var availW = (compareWrap ? compareWrap.clientWidth : stageWidth()) - pad - chrome;
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
        ctx.stageRow = null;
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
    /* 화면설명을 접으면 틀에 폭이 돌아온다 — 비교는 그 폭으로 배율을 다시 잡아야
       돌려받은 자리를 실제로 쓴다. 07-brief 의 여닫기가 이것을 부른다. */
    ctx.relayout = function () { if (ctx.mode === 'compare') layoutCompare(); };

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
/* ── Prototype Chrome · 지도를 따라가게 한다 ──
   틀 안에서 온 보고를 받아 바깥 목록의 켜짐을 옮기고, 사이드바 머리에
   「이게 무슨 화면인가」를 적는다. */
window.ProtoChrome = window.ProtoChrome || {};

(function (PC) {

  /* ── 밖 ← 안: 지도를 따라가게 한다 ──
     **단일 폭에서만** 받는다. 틀이 하나면 "안쪽이 곧 진실"이라 어느 쪽이 진짜인지
     정할 필요가 없다. 비교 모드는 셋이 대등해서 그 답이 없으므로 받지 않는다
     (셋이 어긋나는 것과 되돌리는 법은 planner.md에 적어 뒀다).

     주소도 함께 무효로 만든다 — 안쪽이 스스로 움직였으면 **바깥이 아는 주소는 더 이상
     그 틀의 상태가 아니다.** 이걸 비우지 않으면 나중에 원래 시나리오 버튼을 눌렀을 때
     "주소가 같다"는 이유로 다시 싣지 않아, 지도가 다시 거짓말을 시작한다. */
  PC.navSync = function (ctx) {
    var root = ctx.root;

    function markNav(sc) {
      root.querySelectorAll('.proto-nav-btn').forEach(function (b) {
        b.classList.toggle('is-active', b.dataset.scenario === sc);
      });
    }
    window.addEventListener('message', function (e) {
      var d = e.data;
      if (!d || d.source !== 'proto-chrome' || d.type !== 'scenario' || !d.scenario) return;
      var single = ctx.single;
      if (ctx.mode === 'compare' || !single) return;
      if (e.source !== single.frame.contentWindow) return;   /* 우리 틀에서 온 것만 */
      if (!root.querySelector('.proto-nav-btn[data-scenario="' + d.scenario + '"]')) return;
      single.frame.dataset.src = '';
      markNav(d.scenario);
    });
  };

  /* ── 어떤 화면인가 ──
     이름은 **문서가 이미 알고 있다**(`<title>`). 프로토타입 파일에 또 적게 하면 둘이
     어긋날 수 있고, 어긋나면 어느 쪽이 맞는지 알 방법이 없다 — 화면설명의 제목을
     목록에서 가져오는 것과 같은 판단이다.
     화면이 다른 이름을 쓰고 싶으면 `.proto-layout[data-proto-title]`로 덮는다. */
  PC.brand = function (ctx) {
    var side = ctx.root.querySelector('.proto-sidebar');
    if (!side || side.querySelector('.proto-brand')) return;
    var name = (ctx.layout.dataset.protoTitle || document.title || '').trim();
    if (!name) return;
    var sub = (ctx.layout.dataset.protoSub || '시나리오별로 보기').trim();
    var box = document.createElement('div');
    box.className = 'proto-brand';
    box.innerHTML = '<b class="proto-brand__name"></b><span class="proto-brand__sub"></span>';
    box.querySelector('.proto-brand__name').textContent = name;
    box.querySelector('.proto-brand__sub').textContent = sub;
    /* 접기 손잡이가 툴바로 떠났으므로 맨 위가 비었다 — 그 자리에 놓는다 */
    side.insertBefore(box, side.firstChild);
  };

})(window.ProtoChrome);
/* ── Prototype Chrome · 툴바(폭 컨트롤 · 접기 손잡이 · 링크 복사) ──
   폭 컨트롤을 화면 위로 옮긴다. 마크업에서 이 컨트롤은 사이드바 안에 있다. 거기 두면
   「무엇을 볼지」(시나리오)와 「어떻게 볼지」(폭)가 한 덩어리로 보이는데 둘은 다른 축이다.
   DOM에서 옮기면 **이미 배포된 프로토타입도 그대로** 새 자리에 놓인다 — 파일을 고칠
   필요가 없다. `.proto-content`는 폭을 바꿀 때마다 자식이 갈리므로, 머리글과 같은 이유로
   **붙어 있는지 매번 확인한다.** */
window.ProtoChrome = window.ProtoChrome || {};

(function (PC) {

  PC.toolbar = function (ctx) {
    var root = ctx.root;
    var toolbar = null;
    var toggleNode = root.querySelector('.proto-nav-toggle');
    var share = null, shareTimer = 0, deviceTag = null;

    function shareSay(text, cls) {
      if (!share) return;
      share.firstChild.textContent = text;
      share.classList.toggle('is-done',  cls === 'done');
      share.classList.toggle('is-local', cls === 'local');
      clearTimeout(shareTimer);
      if (cls) shareTimer = setTimeout(function () { shareSay('링크 복사', ''); }, 2400);
    }
    function shareEl() {
      if (share) return share;
      share = document.createElement('button');
      share.type = 'button';
      share.className = 'proto-share';
      var label = document.createElement('span');
      /* 바뀐 글자를 **읽어 준다** — 버튼을 누른 사람이 결과를 눈으로만 확인하지 않게 */
      label.setAttribute('aria-live', 'polite');
      label.textContent = '링크 복사';
      share.appendChild(label);
      share.addEventListener('click', function () {
        var url = PC.shareUrl();
        PC.copyText(url, function (ok) {
          if (!ok) { window.prompt('이 주소를 복사하세요', url); return; }
          if (PC.localOnly()) shareSay('복사됨 · 이 컴퓨터에서만', 'local');
          else shareSay('복사됨', 'done');
        });
      });
      return share;
    }
    /* 무엇이 복사될지는 **누르기 전에** 보여야 한다 — 시나리오를 옮길 때마다 달라지므로
       주소가 바뀌는 자리(syncHash)에서 같이 고쳐 둔다. */
    ctx.refreshShare = function () { if (share) share.title = PC.shareUrl(); };

    /* 「자유」는 세그먼트가 가리키는 것이 없다 — 지금 보고 있는 폭이 곧 **이 기기의 폭**이다 */
    ctx.syncDevice = function () {
      if (!deviceTag) return;
      deviceTag.hidden = (ctx.mode !== 'free');
      if (ctx.mode === 'free') {
        deviceTag.textContent = '이 기기 ';
        var b = document.createElement('b');
        b.textContent = window.innerWidth;
        deviceTag.appendChild(b);
      }
    };

    /* ── 원본 링크 ──
       「링크 복사」가 주는 것은 이 뷰어의 주소다. 폰에서 화면 자체를 만져 보려는
       사람에게는 껍데기 없는 주소가 필요하다 — 틀 안에 또 틀이 생기면 키보드·스크롤
       처럼 「틀 안이냐」에 걸린 것들을 실제 기기에서 못 본다.

       끼운 화면이 어느 문서에 있는지는 폭에 따라 다르다. 「자유」에서는 이 문서의
       `.proto-content` 안에 그대로 있고, 틀을 세운 뒤에는 크롬이 만든 틀 **안쪽**
       문서로 들어간다. 그래서 바깥을 먼저 보고, 없으면 틀을 하나씩 들여다본다.
       같은 출처라 들여다볼 수 있고, 아니면 조용히 비운다. */
    function screenIn(doc) {
      try {
        var host = doc && doc.querySelector('.proto-content');
        var f = host && host.querySelector('iframe:not(.proto-frame)');
        return (f && f.src) || '';
      } catch (e) { return ''; }
    }
    function sourceUrl() {
      var raw = screenIn(root.ownerDocument || root);
      if (!raw) {
        /* 비교 모드에서는 틀이 셋이다 — 셋 다 같은 화면이라 먼저 잡히는 것이면 된다 */
        var fs = root.querySelectorAll('iframe.proto-frame');
        for (var i = 0; i < fs.length && !raw; i++) {
          try { raw = screenIn(fs[i].contentDocument); } catch (e) {}
        }
      }
      if (!raw) return '';
      try {
        var u = new URL(raw, location.href);
        u.searchParams.delete('_t');   /* 캐시 깨려 붙인 값은 사람에게 줄 주소에 남길 것이 아니다 */
        return u.toString();
      } catch (e) { return raw; }
    }

    var source = null, sourceTimer = 0;
    function sourceSay(text, cls) {
      if (!source) return;
      source.firstChild.textContent = text;
      source.classList.toggle('is-done',  cls === 'done');
      source.classList.toggle('is-local', cls === 'local');
      clearTimeout(sourceTimer);
      if (cls) sourceTimer = setTimeout(function () { sourceSay('원본 링크 복사', ''); }, 2400);
    }
    /* 귀띔말은 **읽을 때** 맞춘다. 안쪽 틀은 시나리오를 옮길 때마다 통째로 다시 뜨므로
       어느 한 노드에 load를 걸어 두면 한 번 갈린 뒤로 조용해진다 — 손이 닿는 순간에
       물으면 노드가 몇 번을 갈려도 틀리지 않는다. */
    function refreshSource() { if (source) source.title = sourceUrl() || '화면을 불러오는 중입니다'; }
    function sourceEl() {
      if (source) return source;
      source = document.createElement('button');
      source.type = 'button';
      source.className = 'proto-share';
      var label = document.createElement('span');
      label.setAttribute('aria-live', 'polite');
      label.textContent = '원본 링크 복사';
      source.appendChild(label);
      source.addEventListener('click', function () {
        /* ⚠ 주소로 적히지 않는 시나리오가 있다(체크리스트를 펴거나 폼에 값을 넣는 자리).
           그런 곳에서는 「그 화면의 첫 자리」가 복사된다 — 주소가 들고 갈 수 있는
           상태(?type= 따위)까지는 따라간다. */
        var url = sourceUrl();
        if (!url) return;
        PC.copyText(url, function (ok) {
          if (!ok) { window.prompt('이 주소를 복사하세요', url); return; }
          if (PC.localOnly()) sourceSay('복사됨 · 이 컴퓨터에서만', 'local');
          else sourceSay('복사됨', 'done');
        });
      });
      ['pointerenter', 'focus', 'touchstart'].forEach(function (ev) {
        source.addEventListener(ev, refreshSource, { passive: true });
      });
      refreshSource();
      return source;
    }

    ctx.toolbarEl = function () {
      var host = root.querySelector('.proto-content');
      /* ⚠️ **붙들어 둔 참조(`ctx.vp`)를 쓴다 — 다시 찾지 않는다.** 폭을 바꾸면 `.proto-content`의
         자식이 갈리는데, 그때 옮겨 둔 컨트롤도 함께 문서에서 떨어진다. 떨어진 노드는
         `querySelector`로 찾을 수 없어, 다시 찾는 방식은 **한 번 떨어지면 영영 못 되살린다**
         (실측: 비교 모드로 갔다가 lg로 돌아오니 폭 버튼이 통째로 없었다).
         노드 자체를 들고 있으면 몇 번을 갈아끼워도 도로 붙일 수 있다. */
      var vpEl = ctx.vp;
      if (!host || !vpEl) return null;
      if (!toolbar) { toolbar = document.createElement('div'); toolbar.className = 'proto-toolbar'; }
      if (toolbar.parentNode !== host) {
        /* 머리글 바로 아래다 — 「무엇을 보고 있는가」 다음에 「어떻게 볼까」가 온다 */
        var after = ctx.brief && ctx.brief.parentNode === host ? ctx.brief.nextSibling : host.firstChild;
        host.insertBefore(toolbar, after);
      }
      /* 접기 손잡이도 여기 선다 — 폭 컨트롤 **왼쪽**이다.
         접으면 사이드바가 통째로 사라지므로 손잡이가 거기 있으면 함께 사라진다.
         화면 위에 두면 접힌 상태에서도 되돌릴 자리가 남는다. */
      if (toggleNode && toggleNode.parentNode !== toolbar) toolbar.appendChild(toggleNode);
      /* 버튼 글자를 **이름 + 숫자**로 바꾼다. 마크업에는 `lg`·`md`·`sm`만 적혀 있는데,
         그건 시스템의 이름이지 폭이 아니다 — 무엇을 보고 있는지 알려면 머릿속에서 한 번
         더 옮겨야 했다. 폭은 크롬이 이미 알고 있으므로(VIEWS) 여기서 적어 준다:
         프로토타입 파일을 하나도 고치지 않는다. 「비교」처럼 폭이 없는 버튼은 그대로 둔다. */
      vpEl.querySelectorAll('.proto-viewport__btn').forEach(function (btn) {
        if (btn.dataset.labelled) return;
        var v = btn.dataset.viewport;
        if (!PC.VIEWS[v]) { btn.dataset.labelled = '1'; return; }
        btn.dataset.labelled = '1';
        btn.textContent = '';
        var name = document.createElement('span');
        name.textContent = PC.VIEW_NAME[v] || v;
        var px = document.createElement('span');
        px.className = 'proto-viewport__px';
        px.textContent = PC.VIEWS[v][0];
        btn.append(name, px);
      });
      if (vpEl.parentNode !== toolbar) toolbar.appendChild(vpEl);
      if (!deviceTag) { deviceTag = document.createElement('span'); deviceTag.className = 'proto-device'; }
      if (deviceTag.parentNode !== toolbar) toolbar.appendChild(deviceTag);
      ctx.syncDevice();
      var sh = shareEl();
      if (sh.parentNode !== toolbar) toolbar.appendChild(sh);
      ctx.refreshShare();
      /* 끼운 화면이 없는 프로토타입에는 **세우지 않는다.** 눌러도 아무 일이 없는 버튼은
         「지금은 안 되는 것」과 「원래 없는 것」을 구별해 주지 못한다. */
      if (ctx.hasScreen) {
        var src = sourceEl();
        if (src.parentNode !== toolbar) toolbar.appendChild(src);
        refreshSource();
      }
      return toolbar;
    };
  };

})(window.ProtoChrome);
/* ── Prototype Chrome · 화면설명 + 주소의 #s번호 ──
   **지도는 이름만 말한다.** 「고정 글 없음」이 무엇을 뜻하는지, 그 상태를 어떻게
   만드는지, 무엇을 봐야 하는지는 만든 사람 머릿속에만 있었다. 그 셋을 화면 위에 적는다.

   값은 **목록 버튼이 들고 있다** — 크롬이 목록을 따로 갖지 않는다.
   크롬이 목록을 가지면 시나리오를 더할 때 고칠 곳이 둘이 되고, 둘은 반드시 어긋난다.
     <button class="proto-nav-btn" data-scenario="로딩" type="button"
             data-why="목록이 늦게 올 때. 자리를 미리 잡아 화면이 튀지 않는다."
             data-steps="주소에 ?delay=2 를 붙인다"
             data-look="행 높이가 실제 행과 같다|스켈레톤은 세 줄까지만">로딩 중</button>
   steps·look은 `|`로 나눈다. 없으면 그 열이 빠지고, 셋 다 없으면 머리글이 통째로 숨는다.

   ⚠️ **패널(`scenario-panel`)에 적지 않는다.** 크롬은 어느 폭에서든 `.proto-content`를
   iframe으로 갈아끼우므로 패널은 **바깥 문서에 없다** — 처음에 패널에서 읽게 만들었더니
   값이 통째로 비었다(실측). 목록 버튼은 사이드바에 있어 모든 모드에서 그대로 있다.

   **주소에 #s번호를 남긴다.** 목록의 몇 번째인지가 곧 번호라 사이드바의 번호와 같고,
   그래서 "8번 보세요"가 링크로 통한다. 새로고침해도 그 자리에 머문다. */
window.ProtoChrome = window.ProtoChrome || {};

(function (PC) {

  PC.brief = function (ctx) {
    var root = ctx.root;
    var briefOpen = true;
    try { briefOpen = sessionStorage.getItem('protoBrief') !== '0'; } catch (e) {}

    /* 틀을 만들 때 `.proto-content`의 자식이 통째로 갈리므로 **붙어 있는지 매번 확인한다.**
       한 번 만들어 두고 믿으면, 폭을 바꾼 뒤부터 조용히 아무 데도 안 그린다. */
    function briefEl() {
      /* 틀이 서 있으면 **판 위 틀 옆**이 제자리다(04-stage 가 만든 행). 틀이 없으면
         (「자유」) 판도 없으므로 전처럼 내용 맨 위에 눕는다. */
      var row = ctx.stageRow;
      var host = row || root.querySelector('.proto-content');
      if (!host) return null;
      if (!ctx.brief) {
        ctx.brief = document.createElement('section');
        ctx.brief.className = 'proto-brief';
        ctx.brief.hidden = true;
      }
      /* 카드는 **틀 왼쪽**이다. 오른쪽에 두었더니 틀이 자리보다 넓은 폭(lg)에서
         판이 가로로 넘치며 카드가 화면 밖으로 밀려났다 — 접어서 자리를 만들려는데
         접을 손잡이부터 스크롤해 찾아야 했다(실측: 카드 오른쪽 끝 1674, 판은 1268).
         왼쪽에 두면 넘치는 쪽은 틀이고, 카드는 어느 폭에서든 먼저 보인다.
         읽는 차례와도 맞는다 — 「무엇을 보는가」를 읽고 화면으로 눈이 간다. */
      if (ctx.brief.parentNode !== host) host.insertBefore(ctx.brief, host.firstChild);
      return ctx.brief;
    }

    /* ── 항목에 손이 닿으면 화면의 그 자리를 짚어 준다 ──
       구역 이름은 「어느 자리인가」를 **말로** 답한다. 이것은 **손가락으로 가리킨다** —
       열두 줄을 읽으며 화면과 글 사이를 오가던 일을 없앤다.

       ⚠ 짚을 문서는 **우리 문서가 아니다.** 폭에 따라 한 겹(자유) 또는 두 겹(틀 + 끼운 화면)
       안쪽이고, 그 문서는 크롬의 CSS 를 싣지 않는다(실측: estimate.html 은 components.css 를
       부르지 않는다). 그래서 표시를 **주입**하되, 색은 바깥 문서의 토큰에서 읽어 넘긴다 —
       안쪽에 하드코딩을 남기지 않는다. */
    var spotted = null;   /* 지금 짚어 둔 안쪽 요소 */
    var spotBtn = null;   /* 그것을 켠 버튼 — aria-pressed 를 되돌리려면 들고 있어야 한다 */

    /* 짚을 문서가 **한 겹이 아니다.** 화면 안에 또 화면이 끼워진 자리가 있다 —
       estimate.html 은 견적신청 폼(plan-quote.html)을 제 안의 iframe 으로 들고 있다.
       「가장 안쪽」 하나만 고르면 안 된다: 표(.es-cat)는 바깥 문서에 있고 폼 칸은
       안쪽 문서에 있어, 어느 한쪽만 보면 반드시 다른 쪽을 놓친다.
       그래서 **닿는 문서를 모두 모아** 바깥부터 차례로 찾는다. */
    function screenDocs() {
      var out = [];
      var push = function (d) {
        if (!d || out.indexOf(d) >= 0) return;
        out.push(d);
        var kids;
        try { kids = d.querySelectorAll('iframe:not(.proto-frame)'); } catch (e) { return; }
        for (var k = 0; k < kids.length; k++) {
          try { if (kids[k].contentDocument) push(kids[k].contentDocument); } catch (e) {}
        }
      };
      var frames = root.querySelectorAll('iframe.proto-frame');
      for (var i = 0; i < frames.length; i++) {
        try { push(frames[i].contentDocument); } catch (e) {}
      }
      if (!frames.length) {                     /* 「자유」 — 틀이 없다 */
        var own = PC.screenFrameIn(document);
        if (own) { try { push(own.contentDocument); } catch (e) {} }
      }
      return out;
    }

    function ensureSpotStyle(d) {
      if (d.getElementById('proto-spot-style')) return;
      var ring = getComputedStyle(document.documentElement)
                   .getPropertyValue('--color-border-focus').trim() || 'rgba(22,109,238,.75)';
      var st = d.createElement('style');
      st.id = 'proto-spot-style';
      /* 테두리가 아니라 **outline** 이다 — 테두리는 자리를 차지해 짚는 순간 화면이 밀린다.
         재는 도구가 짚었다고 치수를 바꾸면 안 된다. */
      st.textContent = '.is-proto-spot{outline:2px solid ' + ring + ';outline-offset:2px}';
      (d.head || d.documentElement).appendChild(st);
    }

    function spotOff() {
      if (spotBtn) { spotBtn.setAttribute('aria-pressed', 'false'); spotBtn = null; }
      if (!spotted) return;
      try { spotted.classList.remove('is-proto-spot'); } catch (e) {}
      spotted = null;
    }

    function spotOn(sel) {
      spotOff();
      var docs = screenDocs(), d = null, el = null;
      for (var i = 0; i < docs.length && !el; i++) {
        try { el = docs[i].querySelector(sel); } catch (e) { return; }   /* 잘못 적은 선택자 */
        if (el) d = docs[i];
      }
      if (!el) return;                                            /* 화면이 바뀌어 사라진 자리 */
      ensureSpotStyle(d);
      el.classList.add('is-proto-spot');
      spotted = el;
      try { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) { el.scrollIntoView(); }
    }

    function briefItems() {
      return ctx.brief ? ctx.brief.querySelectorAll('.proto-brief__cols li') : [];
    }
    /* 선택자로 짚고, **그 줄의** 버튼을 눌린 꼴로 돌려 둔다. 폭을 바꾸면 끼운 화면이
       통째로 다시 뜨므로 그 자리에서는 아직 없다 — 뜰 때까지 다시 해 본다.
       ⚠ 버튼을 `data-spot` **값으로 찾으면 안 된다.** 한 시나리오 안에서 두 항목이 같은
          자리를 가리키는 일이 흔하다(실측 6건 — pl-프리미엄의 `.es-pick-out` 둘 등).
          값으로 찾으면 늘 **먼저 나오는 줄**이 켜져, 누른 것과 다른 줄이 선택된다.
          몇 번째 줄인지로 찾는다 — 폭을 바꿔도 항목을 거르지 않으므로 차례는 그대로다. */
    function spotAtItem(idx, sel, tries) {
      if (!sel || idx < 0) return;
      spotOn(sel);
      if (spotted) {
        var li = briefItems()[idx];
        var btn = li && li.querySelector('.proto-brief__spot');
        if (btn) { spotBtn = btn; btn.setAttribute('aria-pressed', 'true'); }
        return;
      }
      if (tries > 0) setTimeout(function () { spotAtItem(idx, sel, tries - 1); }, 120);
    }

    /* **누를 때만 짚는다.** 처음에는 손이 닿기만 해도 짚고 화면을 굴렸는데, 마우스가
       목록 위를 스치는 것만으로 화면이 제멋대로 넘어갔다 — 재는 도구가 읽는 것을 방해했다.
       누름은 뜻이 분명한 신호다. 손이 닿았을 때는 `title` 이 「누르면 무슨 일이 나는지」만
       말하고 화면은 가만히 둔다.

       한 번 더 누르면 끈다 — 켜는 길만 있고 끄는 길이 없으면 표시가 남아 따라다닌다.
       키보드는 따로 걸지 않는다: 버튼이라 Enter·Space 가 그대로 click 이 된다.

       위임해서 **한 번만** 건다. renderBrief 는 시나리오를 옮길 때마다 innerHTML 을 다시
       쓰므로, 항목마다 걸면 걸린 것이 매번 버려지고 새로 걸려야 한다. */
    function bindSpots(el) {
      if (el.dataset.spotsBound) return;
      el.dataset.spotsBound = '1';
      el.addEventListener('click', function (e) {
        if (!e.target.closest) return;
        /* 폭 뱃지 — **폭을 바꾸고 그 자리를 짚는 것까지 한 번에** 한다. 데스크톱에서
           「모바일에서는 이렇게 됩니다」를 읽어도 확인할 길이 없었고, 폭만 바꿔 주면
           이번에는 그 줄을 다시 찾아 눌러야 했다. 그 폭에서만 되는 동작이니 칩 하나가
           「거기로 가서 이것을 보여 달라」는 말이 되는 것이 맞다.
           show() 가 화면설명을 다시 그리고 그때 짚어 둔 것이 꺼지므로, 짚기는 그 뒤다. */
        var bb = e.target.closest('.proto-brief__band');
        if (bb && el.contains(bb)) {
          var li = bb.closest('li');
          var sp = li && li.querySelector('.proto-brief__spot');
          var sel = sp ? sp.dataset.spot : '';
          /* 다시 그린 뒤에는 이 버튼 노드가 사라진다 — 차례를 적어 두고 그것으로 찾는다 */
          var idx = Array.prototype.indexOf.call(briefItems(), li);
          var here = bb.dataset.band === ctx.mode;
          if (here && sp && spotBtn === sp) { spotOff(); return; }   /* 같은 줄을 또 누르면 끈다 */
          if (!here && ctx.show) ctx.show(bb.dataset.band);
          spotAtItem(idx, sel, 25);
          return;
        }
        var b = e.target.closest('.proto-brief__spot');
        if (!b || !el.contains(b)) return;
        if (spotBtn === b) { spotOff(); return; }      /* 같은 것을 또 누르면 끈다 */
        spotOn(b.dataset.spot);
        if (spotted) { spotBtn = b; b.setAttribute('aria-pressed', 'true'); }
      });
      /* 시나리오를 옮기거나 폭을 바꾸면 안쪽 문서가 통째로 갈린다 — 짚어 둔 것도 함께 사라지니
         우리가 들고 있던 참조만 비운다(없어진 노드에 손대면 예외가 난다). */
      el.addEventListener('proto-brief-render', spotOff);
    }

    ctx.navBtns = function () { return Array.prototype.slice.call(root.querySelectorAll('.proto-nav-btn')); };

    ctx.renderBrief = function () {
      var el = briefEl();
      if (!el) return;
      bindSpots(el);
      el.dispatchEvent(new Event('proto-brief-render'));
      var active = null;
      ctx.navBtns().forEach(function (b) { if (b.classList.contains('is-active')) active = b; });

      /* **비교 모드에서는 적지 않는다.**
         한때는 적었다. 그때의 판단은 「설명이 **해당되는가**」였고 그 답은 지금도 그렇다 —
         `syncSrc`가 세 틀에 같은 주소를 넣으므로 비교 모드는 서로 다른 화면 셋이 아니라
         한 시나리오를 세 폭으로 보는 것이고, 머리글은 폭을 말한 적이 없다.

         바뀐 것은 물음이다. 지금 묻는 것은 「**필요한가, 그 폭을 쓸 만한가**」다.
         비교 모드에서 하는 일은 **폭끼리 견주는 것**이지 시나리오를 읽는 것이 아니고,
         거기서는 가로 폭이 곧 자원이다 — 설명이 360px을 가져가면 세 틀이 그만큼
         작아진다(실측: 배율 0.485 → 0.343). 읽고 싶으면 다른 폭에서 읽으면 된다.

         숨기기만 한다 — 값은 그대로 있어서 폭을 되돌리면 그 자리에 다시 선다. */
      if (ctx.mode === 'compare') { el.hidden = true; return; }
      if (!active) { el.hidden = true; return; }

      var why   = active.dataset.why || '';
      var steps = active.dataset.steps || '';
      var look  = active.dataset.look || '';
      if (!why && !steps && !look) { el.hidden = true; return; }

      /* 제목은 **목록이 이미 말한 것**을 그대로 쓴다 — 버튼 글자와 그 앞의 그룹 이름.
         패널에 제목을 또 적게 하면 목록과 어긋날 수 있고, 어긋나면 어느 쪽이 맞는지 모른다. */
      var label = (active.textContent || '').trim();
      /* 그룹이 두 단계면 **둘 다 붙인다.** 가장 가까운 이름표 하나만 쓰면 제목이
         「인증 전 · 사진 없음」이 되어, 무엇의 인증 전인지가 빠진다 — 2단계를 만든
         까닭이 목록에서 앞머리 반복을 걷어낸 것이었으니, 걷어낸 그 말은 제목이 도로 돌려준다. */
      var path = [];
      var haveSub = false;
      for (var n = active.previousElementSibling; n; n = n.previousElementSibling) {
        if (!n.classList) continue;
        if (n.classList.contains('proto-nav-group-label')) {
          if (n.classList.contains('proto-nav-group-label--sub')) {
            /* 하위 이름표는 **가장 가까운 하나만**. 더 거슬러 오르면 앞선 형제 묶음의
               이름표를 제 것인 양 집는다(같은 1단계 아래 2단계가 둘 이상일 때). */
            if (!haveSub) { haveSub = true; path.unshift(n.textContent.trim()); }
            continue;
          }
          path.unshift(n.textContent.trim()); break;
        }
        if (n.classList.contains('proto-nav-btn') && !n.classList.contains('proto-nav-sub')) break;
      }
      var group = path.join(' · ');
      var body = '';
      if (why) body += '<p class="proto-brief__why">' + PC.esc(why) + '</p>';
      if (steps || look) {
        body += '<div class="proto-brief__cols">';
        if (steps) body += '<div><h3>이렇게 하면 그 상태가 됩니다</h3><ol>' + PC.listHtml(steps) + '</ol></div>';
        /* 지금 보고 있는 폭 — 「자유」는 틀이 없으니 창이 곧 폭이다. 폭 표시가 붙은 항목은
           여기에 맞는 것만 남는다(01-util). 폭을 바꾸면 show() 가 다시 그리므로 따라온다. */
        var band = (ctx.mode === 'free' || !ctx.mode) ? PC.bandKey(window.innerWidth) : ctx.mode;
        if (look)  body += '<div><h3>볼 것</h3>' + PC.groupedListHtml(look, band) + '</div>';
        body += '</div>';
      }
      /* 시나리오를 옮겨도 **접어 둔 것은 접힌 채로 둔다.** 다시 그릴 때마다 펴지면
         접는 뜻이 없다 — 접은 이유는 「이 시나리오의 설명이 길어서」가 아니라
         「지금은 화면만 보고 싶어서」다. 탭에 남겨 새로고침도 넘긴다(폭과 같은 방식). */
      el.innerHTML =
        '<details class="proto-brief__details"' + (briefOpen ? ' open' : '') + '>' +
          '<summary class="proto-brief__summary">' +
            '<h2 class="proto-brief__title">' + PC.esc(group ? group + ' · ' + label : label) + '</h2>' +
          '</summary>' + body +
        '</details>';
      el.hidden = false;
      var det = el.querySelector('.proto-brief__details');
      det.addEventListener('toggle', function () {
        briefOpen = det.open;
        try { sessionStorage.setItem('protoBrief', briefOpen ? '1' : '0'); } catch (e) {}
        /* 옆에 서 있을 때 접기는 **틀에 폭을 돌려주는 일**이다 — 돌려받은 자리를
           실제로 쓰려면 비교는 배율을 다시 잡아야 한다. */
        if (ctx.relayout) ctx.relayout();
      });
    };

    /* **해시는 브리프와 다른 일이다.** 처음엔 렌더 안에 뒀는데, 설명이 없는 시나리오는
       일찍 빠져나가느라 주소가 첫 번째에 멈춰 있었다(실측). 주소가 말하는 것은
       「몇 번째 시나리오인가」지 「설명이 있는가」가 아니다 — 따로 둔다. */
    ctx.syncHash = function () {
      var idx = -1;
      ctx.navBtns().forEach(function (b, i) { if (b.classList.contains('is-active')) idx = i; });
      if (idx < 0) return;
      var want = '#s' + (idx + 1);
      if (location.hash === want) return;
      /* replaceState다 — 시나리오를 훑는 것은 방문이 아니다. pushState로 쌓으면
         뒤로 가기가 목록을 되짚느라 화면 밖으로 나가지 못한다. */
      try { history.replaceState(null, '', location.pathname + location.search + want); } catch (e) {}
      ctx.refreshShare();
    };
  };

})(window.ProtoChrome);
/* ── Prototype Chrome · 켜는 순서 ──
   모듈이 다 붙은 뒤에 실제로 무언가를 **하는** 자리다. 여기 전까지는 정의만 있었다. */
window.ProtoChrome = window.ProtoChrome || {};

(function (PC) {

  PC.boot = function (ctx) {
    var navRoot = ctx.root.querySelector('.proto-nav');

    /* **클래스 변화를 본다** — 클릭만 듣지 않는다. 시나리오는 프로토타입 제 JS(syncNav)도
       바꾸고, 틀 안에서 온 message도 바꾼다(markNav). 그 셋을 각각 부르게 하면 하나를
       잊는다. is-active가 움직이는 것은 셋 다 같으므로 그 하나만 본다. */
    if (navRoot) {
      new MutationObserver(function () { ctx.renderBrief(); ctx.syncHash(); }).observe(navRoot, {
        attributes: true, attributeFilter: ['class'], subtree: true
      });
    }

    /* **목록의 단계는 세어서 적는다** — 마크업에 적게 하지 않는다.
       이름표와 항목이 따로 단계를 들고 있으면 어긋날 수 있고, 어긋나면 어느 쪽이 맞는지
       모른다(번호를 카운터가 세는 것과 같은 이유다). 이름표가 나오면 그 단계로 바뀌고,
       묶음에 들지 않은 최상위 항목(`proto-nav-sub` 없는 버튼)이 나오면 묶음이 닫힌다. */
    function levelNav() {
      if (!navRoot) return;
      var lvl = 0;
      Array.prototype.forEach.call(navRoot.children, function (el) {
        if (!el.classList) return;
        if (el.classList.contains('proto-nav-group-label')) {
          lvl = el.classList.contains('proto-nav-group-label--sub') ? 2 : 1;
        } else if (el.classList.contains('proto-nav-btn')) {
          if (!el.classList.contains('proto-nav-sub')) lvl = 0;
        } else return;
        el.dataset.navLevel = lvl;
      });
    }
    levelNav();
    if (navRoot) new MutationObserver(levelNav).observe(navRoot, { childList: true });

    /* 주소의 #s번호로 시작한다 — 목록의 그 번째 버튼을 누른다.
       ?scenario= 와 달리 여기는 바깥(최상위) 문서다. */
    (function () {
      var m = (location.hash || '').match(/^#s(\d+)$/);
      if (!m) return;
      var b = ctx.navBtns()[+m[1] - 1];
      if (!b || b.classList.contains('is-active')) return;
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { b.click(); });
      else b.click();
    })();

    /* 첫 모드는 **주소가 정한다** — 다른 화면에서 넘어왔으면 그 폭 그대로 이어진다.
       값이 없거나 모르는 값이면 lg. 「자유」는 버튼에서 없앴지만 'free'는 내부 상태로 남는다
       (틀을 만들기 전의 상태이자 되돌릴 자리의 이름이다). */
    var want = ctx.params.get('proto-view');
    if (!want) { try { want = sessionStorage.getItem('protoView'); } catch (e) {} }
    /* 주소가 말한 것이 없으면 **기기가 정한다.** 좁은 기기(<900 — 크롬이 「자리가 없다」고
       판단하는 그 폭)에서 lg를 기본으로 잡으면, 링크를 폰에서 열었을 때 390 안에 1280 틀이
       들어와 가로로 스크롤되는 데스크톱 화면이 뜬다 — 기기에서 보려고 연 링크인데
       기기를 안 보여 준다. 그 폭에서는 틀을 만들지 않는 것이 곧 실물 보기다
       (틀은 **다른 폭**을 재는 도구다). 폭 버튼은 그대로 있으니 데스크톱을 보고 싶으면 누른다. */
    ctx.show((want && (PC.VIEWS[want] || want === 'compare' || want === 'free')) ? want
             : (window.innerWidth < 900 ? 'free' : 'lg'));
    /* show()가 `.proto-content`를 새로 짓는다 — 그 뒤에 다시 그려야 머리글이 살아남는다.
       폭을 바꿀 때마다 같은 일이 일어나므로 show() 안이 아니라 **붙어 있는지 확인하는
       briefEl()** 이 실제 방어다. 여기 두 줄은 첫 렌더를 위한 것이다.
       주소도 여기서 처음 맞춘다 — 첫 시나리오도 링크가 되어야 한다(#s1). */
    ctx.renderBrief(); ctx.toolbarEl(); ctx.syncHash();
  };

})(window.ProtoChrome);
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
