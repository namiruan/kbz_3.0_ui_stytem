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
    var spotted = null;

    function screenDoc() {
      var frames = root.querySelectorAll('iframe.proto-frame');
      for (var i = 0; i < frames.length; i++) {
        var d = null;
        try { d = frames[i].contentDocument; } catch (e) { continue; }
        if (!d) continue;
        var inner = PC.screenFrameIn(d);
        if (inner) { try { if (inner.contentDocument) return inner.contentDocument; } catch (e) {} }
        return d;                      /* 끼운 화면이 없으면 틀 안이 곧 화면이다 */
      }
      var own = PC.screenFrameIn(document);   /* 「자유」 — 틀이 없다 */
      if (own) { try { if (own.contentDocument) return own.contentDocument; } catch (e) {} }
      return null;
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
      if (!spotted) return;
      try { spotted.classList.remove('is-proto-spot'); } catch (e) {}
      spotted = null;
    }

    function spotOn(sel) {
      spotOff();
      var d = screenDoc();
      if (!d) return;
      var el;
      try { el = d.querySelector(sel); } catch (e) { return; }   /* 잘못 적은 선택자 */
      if (!el) return;                                            /* 화면이 바뀌어 사라진 자리 */
      ensureSpotStyle(d);
      el.classList.add('is-proto-spot');
      spotted = el;
      try { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) { el.scrollIntoView(); }
    }

    /* 위임해서 **한 번만** 건다. renderBrief 는 시나리오를 옮길 때마다 innerHTML 을 다시
       쓰므로, 항목마다 걸면 걸린 것이 매번 버려지고 새로 걸려야 한다. */
    function bindSpots(el) {
      if (el.dataset.spotsBound) return;
      el.dataset.spotsBound = '1';
      var hit = function (e) {
        var b = e.target.closest ? e.target.closest('.proto-brief__spot') : null;
        return b && el.contains(b) ? b : null;
      };
      el.addEventListener('pointerover', function (e) { var b = hit(e); if (b) spotOn(b.dataset.spot); });
      el.addEventListener('focusin',     function (e) { var b = hit(e); if (b) spotOn(b.dataset.spot); });
      el.addEventListener('pointerout',  function (e) { if (hit(e)) spotOff(); });
      el.addEventListener('focusout',    function (e) { if (hit(e)) spotOff(); });
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
        if (look)  body += '<div><h3>볼 것</h3>' + PC.groupedListHtml(look) + '</div>';
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
