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
