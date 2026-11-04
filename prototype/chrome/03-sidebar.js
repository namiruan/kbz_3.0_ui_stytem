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
