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
  PC.groupedListHtml = function (raw) {
    var groups = [];
    raw.split('|').map(function (t) { return t.trim(); }).filter(Boolean).forEach(function (t) {
      var i = t.indexOf(PC.SECTION_MARK);
      var region = i > 0 ? t.slice(0, i).trim() : '';
      var text = i > 0 ? t.slice(i + PC.SECTION_MARK.length).trim() : t;
      var last = groups[groups.length - 1];
      if (last && last.region === region) last.items.push(text);
      else groups.push({ region: region, items: [text] });
    });
    return groups.map(function (g) {
      return (g.region ? '<h4 class="proto-brief__region">' + PC.esc(g.region) + '</h4>' : '') +
             '<ul>' + g.items.map(function (t) { return '<li>' + PC.esc(t) + '</li>'; }).join('') + '</ul>';
    }).join('');
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
