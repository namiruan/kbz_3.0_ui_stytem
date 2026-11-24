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
