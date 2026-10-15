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
