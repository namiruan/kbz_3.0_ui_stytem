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
