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
      return toolbar;
    };
  };

})(window.ProtoChrome);
