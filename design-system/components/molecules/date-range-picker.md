---
file: components/molecules/date-range-picker.md
version: 0.5.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/shadow.md, tokens/z-index.md, tokens/height.md, tokens/motion.md, tokens/typography.md, tokens/icon.md, components/atoms/calendar.md, components/atoms/button.md, components/atoms/icon.md
---

# DateRangePicker

## 개요

단축 탭(좌)과 달력 패널(우)을 조합해 시작일·종료일을 선택하는 기간 선택 컴포넌트.

- **트리거 버튼** 클릭 시 패널이 열린다.
- **단축 탭**: 오늘·이번주·이번달 등 자주 쓰는 기간을 한 번에 선택한다.
- **달력 패널**: 현재 달과 다음 달 두 개의 그리드를 연속 표시하고, 범위 드래그로 선택한다.
- 선택을 확정하면 트리거에 `YYYY.MM.DD ~ YYYY.MM.DD` 형식으로 반영된다.

DatePicker와의 차이 — DatePicker는 단일·범위 모두 지원하고 수직 스크롤 패널을 사용한다. DateRangePicker는 범위 전용이며 단축 탭 + 2-month 고정 뷰를 제공해 업무 주기 선택이 빠르다. FilterBar의 기간 필터 슬롯에 삽입하거나 독립 폼 필드로 사용한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| state | default · open → `drp--open` · active(범위 선택됨) → `drp--active` · disabled → `drp--disabled` | default |

---

## 사용 지침

<!-- AI: DateRangePicker는 항상 범위 선택 전용이다. 단일 날짜 선택은 DatePicker를 사용한다. FilterBar 내 기간 슬롯에 삽입할 때는 .drp를 바로 배치하고 트리거에 filter-bar용 ghost 스타일을 덮어쓴다. -->

- 단일 날짜만 필요하면 DatePicker를 사용한다.
- FilterBar 내부에서 사용할 때는 `.drp__trigger`에 `drp__trigger--ghost` 수식자를 추가해 경계선 없는 스타일로 전환한다.
- `.drp`는 `display: inline-flex`라 부모 너비를 채우지 않는다. form-field 안에서 `width: 100%`를 추가한다.

---

## 동작

트리거 클릭으로 패널 열기·닫기, 단축 탭·달력 범위 선택, 월 이동을 확인할 수 있다.

```js init
function initDRP(container) {
  if (container.dataset.initDrp) return;
  container.dataset.initDrp = '1';

  var trigger    = container.querySelector('.drp__trigger');
  var panel      = container.querySelector('.drp__panel');
  var shortcuts  = container.querySelectorAll('.drp__shortcut');
  var drpParts   = container.querySelectorAll('.drp__value-part');
  var sYrEl = drpParts[0]; var sMoEl = drpParts[1]; var sDyEl = drpParts[2];
  var eYrEl = drpParts[3]; var eMoEl = drpParts[4]; var eDyEl = drpParts[5];
  var navBtns    = container.querySelectorAll('.drp__nav-btn');
  var monthEls   = container.querySelectorAll('.drp__month');
  var cancelBtn  = container.querySelector('.drp__footer .btn--ghost');
  var confirmBtn = container.querySelector('.drp__footer .btn--primary');
  var monthsEl   = container.querySelector('.drp__months');

  var today = new Date(); today.setHours(0,0,0,0);
  var viewYear  = today.getFullYear();
  var viewMonth = today.getMonth();
  var rangeStart = null, rangeEnd = null, hoverDate = null;
  var committed  = { start: null, end: null };

  function pad(n)     { return n < 10 ? '0' + n : '' + n; }
  function fmt(d)     { return d.getFullYear() + '.' + pad(d.getMonth()+1) + '.' + pad(d.getDate()); }
  function isSame(a,b){ return a && b && a.toDateString() === b.toDateString(); }
  function isBetween(d,s,e) {
    if (!s || !e) return false;
    var lo = s<e ? s : e, hi = s<e ? e : s;
    return d > lo && d < hi;
  }
  function fromKey(k) { var p=k.split(','); return new Date(+p[0],+p[1],+p[2]); }

  /* ── Open / Close ── */
  function open() {
    rangeStart = committed.start; rangeEnd = committed.end;
    if (rangeStart) { viewYear = rangeStart.getFullYear(); viewMonth = rangeStart.getMonth(); }
    else            { viewYear = today.getFullYear();      viewMonth = today.getMonth(); }
    panel.removeAttribute('hidden');
    container.classList.add('drp--open');
    trigger.setAttribute('aria-expanded', 'true');
    render();
  }
  function close() {
    panel.setAttribute('hidden', '');
    container.classList.remove('drp--open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  /* ── Render ── */
  function render() {
    monthEls.forEach(function(m, i) {
      var offset = viewMonth + i;
      var yr = viewYear + Math.floor(offset / 12);
      var mo = ((offset % 12) + 12) % 12;
      m.querySelector('.drp__month-label').textContent = yr + '년 ' + pad(mo+1) + '월';
      renderGrid(m.querySelector('.cal__grid'), yr, mo);
    });
    updateInputs();
    syncShortcuts();
  }

  function renderGrid(grid, yr, mo) {
    grid.innerHTML = '';
    var first  = new Date(yr, mo, 1);
    var last   = new Date(yr, mo+1, 0);
    var cursor = new Date(first);
    cursor.setDate(cursor.getDate() - cursor.getDay()); /* back to Sunday */

    while (cursor <= last || cursor.getDay() !== 0) {
      var weekEl = document.createElement('div');
      weekEl.className = 'cal__week'; weekEl.setAttribute('role','row');

      for (var i=0; i<7; i++) {
        var d       = new Date(cursor);
        var outside = d.getMonth() !== mo;
        var isToday = isSame(d, today);
        var isStart = isSame(d, rangeStart);
        var isEnd   = isSame(d, rangeEnd);
        var inRange = isBetween(d, rangeStart, rangeEnd);
        var effEnd  = rangeEnd || hoverDate;
        var goLeft  = effEnd && rangeStart && effEnd < rangeStart;
        var isPreview  = !rangeEnd && rangeStart && hoverDate && isBetween(d, rangeStart, hoverDate);
        var isHoverEnd = !rangeEnd && rangeStart && hoverDate && isSame(d, hoverDate) && !isStart;

        var btn = document.createElement('button');
        btn.setAttribute('role','gridcell');
        btn.dataset.date = d.getFullYear()+','+d.getMonth()+','+d.getDate();
        if (outside) btn.dataset.outside = 'true';

        var cls = ['cal__day'];
        if (outside) cls.push('cal__day--outside');
        if (isToday && !outside) cls.push('cal__day--today');
        if (isStart) {
          if (!effEnd)     cls.push('cal__day--range-solo');
          else if (rangeEnd) cls.push(goLeft ? 'cal__day--range-start-left' : 'cal__day--range-start');
          else             cls.push(goLeft ? 'cal__day--range-start-left-pre' : 'cal__day--range-start-pre');
        }
        if (isEnd)     cls.push('cal__day--range-end');
        if (inRange)   cls.push('cal__day--in-range');
        if (isPreview) cls.push('cal__day--in-range-preview');
        if (isHoverEnd) cls.push(goLeft ? 'cal__day--hover-end-left' : 'cal__day--hover-end');
        btn.className = cls.join(' ');
        btn.setAttribute('tabindex', (!outside && (isToday || isStart)) ? '0' : '-1');
        if (isToday && !outside) btn.setAttribute('aria-current','date');
        if (isStart || isEnd || inRange) btn.setAttribute('aria-selected','true');
        btn.textContent = d.getDate();

        weekEl.appendChild(btn);
        cursor.setDate(cursor.getDate()+1);
      }
      grid.appendChild(weekEl);
      if (cursor > last && cursor.getDay() === 0) break;
    }
  }

  /* ── 달력 클릭·hover (이벤트 위임) ── */
  monthsEl.addEventListener('click', function(e) {
    var btn = e.target.closest ? e.target.closest('.cal__day') : e.target;
    if (!btn || btn.dataset.outside) return;
    var d = fromKey(btn.dataset.date);
    if (!rangeStart || rangeEnd) { rangeStart=d; rangeEnd=null; hoverDate=null; }
    else if (isSame(rangeStart,d)) { rangeStart=null; hoverDate=null; }
    else { rangeEnd=d; if (rangeEnd<rangeStart){var t=rangeStart;rangeStart=rangeEnd;rangeEnd=t;} hoverDate=null; }
    render();
  });
  monthsEl.addEventListener('mouseover', function(e) {
    var btn = e.target.closest ? e.target.closest('.cal__day') : e.target;
    if (!btn || btn.dataset.outside || !rangeStart || rangeEnd) return;
    var d = fromKey(btn.dataset.date);
    if (!isSame(d,hoverDate)) { hoverDate=d; render(); }
  });

  /* ── 날짜 인풋 → 상태 반영 (입력 중에는 달력·단축만 갱신, 인풋은 건드리지 않음) ── */
  function isValidDate(y,m,d) {
    if (isNaN(y)||isNaN(m)||isNaN(d)) return false;
    var dt = new Date(y,m-1,d);
    return !isNaN(dt.getTime()) && dt.getMonth()===m-1 && dt.getDate()===d;
  }
  function applyPartsToRange() {
    var sy=parseInt(sYrEl.value,10), sm=parseInt(sMoEl.value,10), sd=parseInt(sDyEl.value,10);
    var ey=parseInt(eYrEl.value,10), em=parseInt(eMoEl.value,10), ed=parseInt(eDyEl.value,10);
    var hasS = sYrEl.value||sMoEl.value||sDyEl.value, hasE = eYrEl.value||eMoEl.value||eDyEl.value;
    if (hasS && isValidDate(sy,sm,sd)) rangeStart = new Date(sy,sm-1,sd); else if (!hasS) rangeStart = null;
    if (hasE && isValidDate(ey,em,ed)) rangeEnd   = new Date(ey,em-1,ed); else if (!hasE)  rangeEnd  = null;
    if (rangeStart && rangeEnd && rangeEnd < rangeStart) { var t=rangeStart; rangeStart=rangeEnd; rangeEnd=t; }
    if (rangeStart) { viewYear=rangeStart.getFullYear(); viewMonth=rangeStart.getMonth(); }
    hoverDate = null;
    monthEls.forEach(function(m, i) {
      var off=viewMonth+i, yr=viewYear+Math.floor(off/12), mo=((off%12)+12)%12;
      m.querySelector('.drp__month-label').textContent = yr+'년 '+pad(mo+1)+'월';
      renderGrid(m.querySelector('.cal__grid'), yr, mo);
    });
    syncShortcuts();
  }

  /* ── 상태 → 인풋 반영 (달력 클릭·단축 탭 후 호출) ── */
  function updateInputs() {
    if (rangeStart) { sYrEl.value=String(rangeStart.getFullYear()); sMoEl.value=pad(rangeStart.getMonth()+1); sDyEl.value=pad(rangeStart.getDate()); }
    else { sYrEl.value=sMoEl.value=sDyEl.value=''; }
    if (rangeEnd) { eYrEl.value=String(rangeEnd.getFullYear()); eMoEl.value=pad(rangeEnd.getMonth()+1); eDyEl.value=pad(rangeEnd.getDate()); }
    else { eYrEl.value=eMoEl.value=eDyEl.value=''; }
  }

  function advancePart(el, maxLen, nextEl) {
    el.addEventListener('input', function() {
      el.value = el.value.replace(/\D/g,'').slice(0, maxLen);
      if (nextEl && el.value.length === maxLen) nextEl.focus();
      applyPartsToRange();
    });
    el.addEventListener('click', function(e) { e.stopPropagation(); });
    el.addEventListener('keydown', function(e) { if (e.key==='Escape') close(); if (e.key==='Enter') { e.preventDefault(); el.blur(); } });
  }
  advancePart(sYrEl,4,sMoEl); advancePart(sMoEl,2,sDyEl); advancePart(sDyEl,2,eYrEl);
  advancePart(eYrEl,4,eMoEl); advancePart(eMoEl,2,eDyEl); advancePart(eDyEl,2,null);

  /* ── 단축 탭 ── */
  var SHORTCUTS = {
    'today':         function(){ var t=new Date(today); return [t,new Date(t)]; },
    'yesterday':     function(){ var y=new Date(today); y.setDate(y.getDate()-1); return [y,new Date(y)]; },
    'this-week':     function(){ var s=new Date(today); s.setDate(s.getDate()-((s.getDay()+6)%7)); var e=new Date(s); e.setDate(e.getDate()+6); return [s,e]; },
    'last-week':     function(){ var s=new Date(today); s.setDate(s.getDate()-((s.getDay()+6)%7)-7); var e=new Date(s); e.setDate(e.getDate()+6); return [s,e]; },
    'recent7-incl':  function(){ var s=new Date(today); s.setDate(s.getDate()-6); return [s,new Date(today)]; },
    'recent7-excl':  function(){ var s=new Date(today); s.setDate(s.getDate()-7); var e=new Date(today); e.setDate(e.getDate()-1); return [s,e]; },
    'this-month':    function(){ var s=new Date(today.getFullYear(),today.getMonth(),1); return [s,new Date(today)]; },
    'last-month':    function(){ var s=new Date(today.getFullYear(),today.getMonth()-1,1); var e=new Date(today.getFullYear(),today.getMonth(),0); return [s,e]; },
    'recent30-incl': function(){ var s=new Date(today); s.setDate(s.getDate()-29); return [s,new Date(today)]; },
    'recent30-excl': function(){ var s=new Date(today); s.setDate(s.getDate()-30); var e=new Date(today); e.setDate(e.getDate()-1); return [s,e]; }
  };

  function syncShortcuts() {
    shortcuts.forEach(function(btn){
      var fn = SHORTCUTS[btn.dataset.shortcut];
      if (!fn) return;
      var r  = fn();
      var on = !!(rangeStart && rangeEnd && isSame(rangeStart,r[0]) && isSame(rangeEnd,r[1]));
      btn.classList.toggle('drp__shortcut--selected', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  shortcuts.forEach(function(btn){
    btn.addEventListener('click', function(){
      var fn = SHORTCUTS[btn.dataset.shortcut]; if(!fn) return;
      var r  = fn();
      rangeStart=r[0]; rangeEnd=r[1]; hoverDate=null;
      viewYear=rangeStart.getFullYear(); viewMonth=rangeStart.getMonth();
      render();
    });
  });

  /* ── 월 이동 ── */
  navBtns[0].addEventListener('click', function() {            /* 이전 달 */
    viewMonth--; if(viewMonth<0){viewMonth=11;viewYear--;} render();
  });
  navBtns[1].addEventListener('click', function() {            /* 다음 달 */
    viewMonth++; if(viewMonth>11){viewMonth=0;viewYear++;} render();
  });

  /* ── Trigger ── */
  trigger.addEventListener('click', function(e){
    e.stopPropagation();
    container.classList.contains('drp--open') ? close() : open();
  });

  /* ── 취소 / 확인 ── */
  cancelBtn.addEventListener('click', function(){
    rangeStart=committed.start; rangeEnd=committed.end; close();
  });
  confirmBtn.addEventListener('click', function(){
    committed={start:rangeStart, end:rangeEnd};
    var labelEl = trigger.querySelector('.drp__trigger-label');
    if (rangeStart && rangeEnd) {
      labelEl.textContent = fmt(rangeStart) + ' ~ ' + fmt(rangeEnd);
      container.classList.add('drp--active');
    } else {
      labelEl.textContent = trigger.dataset.placeholder || '기간 선택';
      container.classList.remove('drp--active');
    }
    container.dispatchEvent(new CustomEvent('drp:change',{bubbles:true,detail:{start:committed.start,end:committed.end}}));
    close();
  });

  /* 외부 클릭 시 닫기 */
  document.addEventListener('click', function(e){
    if (!container.contains(e.target)) close();
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initDRP) window.__componentInits.initDRP = initDRP;
```

:::preview
<!-- 패널 높이를 수용하기 위한 뷰어 전용 여백 -->
<div style="padding-bottom: 520px;">
<div data-component class="drp" id="drp-demo" data-placeholder="기간 선택">
  <button class="drp__trigger" aria-haspopup="dialog" aria-expanded="false" aria-label="기간 선택">
    <span class="drp__trigger-label">기간 선택</span>
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
  </button>
  <div class="drp__panel" role="dialog" aria-label="기간 선택" aria-modal="true" hidden>
    <!-- 날짜 직접 입력 + 월 이동 화살표 -->
    <div class="drp__inputs">
      <button class="drp__nav-btn" type="button" aria-label="이전 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <div class="drp__date-group">
        <input class="drp__value-part drp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="시작 연도" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="시작 월" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="시작 일" autocomplete="off">
      </div>
      <span class="drp__input-sep" aria-hidden="true">~</span>
      <div class="drp__date-group">
        <input class="drp__value-part drp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="종료 연도" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--md" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="종료 월" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--md" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="종료 일" autocomplete="off">
      </div>
      <button class="drp__nav-btn" type="button" aria-label="다음 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
    </div>
    <!-- 본문: 단축 탭 + 달력 -->
    <div class="drp__body">
      <!-- 단축 탭 -->
      <div class="drp__shortcuts" role="listbox" aria-label="기간 단축 선택">
        <button class="drp__shortcut" role="option" aria-selected="false" data-shortcut="today">오늘</button>
        <button class="drp__shortcut" role="option" aria-selected="false" data-shortcut="yesterday">어제</button>
        <button class="drp__shortcut" role="option" aria-selected="false" data-shortcut="this-week">이번주</button>
        <button class="drp__shortcut" role="option" aria-selected="false" data-shortcut="last-week">지난주</button>
        <button class="drp__shortcut" role="option" aria-selected="false" data-shortcut="recent7-incl">최근 7일(오늘 포함)</button>
        <button class="drp__shortcut" role="option" aria-selected="false" data-shortcut="recent7-excl">최근 7일(오늘 제외)</button>
        <button class="drp__shortcut" role="option" aria-selected="false" data-shortcut="this-month">이번달</button>
        <button class="drp__shortcut" role="option" aria-selected="false" data-shortcut="last-month">지난달</button>
        <button class="drp__shortcut" role="option" aria-selected="false" data-shortcut="recent30-incl">최근 30일(오늘 포함)</button>
        <button class="drp__shortcut" role="option" aria-selected="false" data-shortcut="recent30-excl">최근 30일(오늘 제외)</button>
      </div>
      <!-- 달력 영역 -->
      <div class="drp__cal-area">
        <!-- 공유 요일 헤더 -->
        <div class="drp__weekdays" role="row" aria-hidden="true">
          <span role="columnheader" aria-label="일요일">일</span>
          <span role="columnheader" aria-label="월요일">월</span>
          <span role="columnheader" aria-label="화요일">화</span>
          <span role="columnheader" aria-label="수요일">수</span>
          <span role="columnheader" aria-label="목요일">목</span>
          <span role="columnheader" aria-label="금요일">금</span>
          <span role="columnheader" aria-label="토요일">토</span>
        </div>
        <!-- 두 달 그리드 -->
        <div class="drp__months">
          <div class="drp__month">
            <div class="drp__month-label"></div>
            <div class="cal cal--range">
              <div class="cal__grid" role="grid" aria-multiselectable="true"></div>
            </div>
          </div>
          <div class="drp__month">
            <div class="drp__month-label"></div>
            <div class="cal cal--range">
              <div class="cal__grid" role="grid" aria-multiselectable="true"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 푸터 -->
    <div class="drp__footer">
      <button class="btn btn--ghost btn--sm" type="button">취소</button>
      <button class="btn btn--primary btn--sm" type="button">확인</button>
    </div>
  </div>
</div>
</div>
<script>
initDRP(stage.querySelector('#drp-demo'));
</script>
:::

---

## Anatomy

<!-- AI: .drp(root) > .drp__trigger + .drp__panel.
panel 구조: .drp__inputs + .drp__body(.drp__shortcuts + .drp__cal-area) + .drp__footer.
.drp__inputs: .drp__nav-btn(이전달) + .drp__date-group + .drp__input-sep("~") + .drp__date-group + .drp__nav-btn(다음달).
  - 각 .drp__date-group: .drp__value-part--year(44px) + .drp__value-sep(".") + .drp__value-part--md × 2.
  - 입력 시 달력 즉시 반영, 달력 클릭 시 인풋 자동 채움. 월 이동 화살표도 이 행에 위치.
cal-area: .drp__weekdays(공유 요일 헤더) + .drp__months(.drp__month × 2).
각 .drp__month: .drp__month-label(첫 번째는 숨김, 두 번째만 dp__month-divider 스타일로 표시) + .cal.cal--range > .cal__grid.
단축 탭: role="listbox"인 .drp__shortcuts > .drp__shortcut[role="option"][data-shortcut="..."].
drp__shortcut--selected는 JS가 현재 범위가 단축 정의와 일치할 때 자동 부여. -->

:::preview
<div style="padding-bottom:480px;">
<div data-component class="drp drp--open" style="position:relative;">
  <button class="drp__trigger drp--active" style="margin-bottom:4px;" aria-expanded="true">
    <span class="drp__trigger-label">2026.06.01 ~ 2026.06.30</span>
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
  </button>
  <div class="drp__panel" role="dialog" aria-label="기간 선택" style="position:absolute;top:40px;left:0;">
    <div class="drp__inputs">
      <button class="drp__nav-btn" aria-label="이전 달"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>
      <div class="drp__date-group">
        <input class="drp__value-part drp__value-part--year" type="text" value="2026" aria-label="시작 연도" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--md" type="text" value="06" aria-label="시작 월" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--md" type="text" value="01" aria-label="시작 일" autocomplete="off">
      </div>
      <span class="drp__input-sep" aria-hidden="true">~</span>
      <div class="drp__date-group">
        <input class="drp__value-part drp__value-part--year" type="text" value="2026" aria-label="종료 연도" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--md" type="text" value="06" aria-label="종료 월" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--md" type="text" value="30" aria-label="종료 일" autocomplete="off">
      </div>
      <button class="drp__nav-btn" aria-label="다음 달"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
    </div>
    <div class="drp__body">
      <div class="drp__shortcuts" role="listbox" aria-label="기간 단축 선택">
        <button class="drp__shortcut" role="option" aria-selected="false">오늘</button>
        <button class="drp__shortcut" role="option" aria-selected="false">어제</button>
        <button class="drp__shortcut" role="option" aria-selected="false">이번주</button>
        <button class="drp__shortcut" role="option" aria-selected="false">지난주</button>
        <button class="drp__shortcut" role="option" aria-selected="false">최근 7일(오늘 포함)</button>
        <button class="drp__shortcut" role="option" aria-selected="false">최근 7일(오늘 제외)</button>
        <button class="drp__shortcut drp__shortcut--selected" role="option" aria-selected="true">이번달</button>
        <button class="drp__shortcut" role="option" aria-selected="false">지난달</button>
        <button class="drp__shortcut" role="option" aria-selected="false">최근 30일(오늘 포함)</button>
        <button class="drp__shortcut" role="option" aria-selected="false">최근 30일(오늘 제외)</button>
      </div>
      <div class="drp__cal-area">
        <div class="drp__weekdays" role="row" aria-hidden="true">
          <span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
        </div>
        <div class="drp__months">
          <div class="drp__month">
            <div class="drp__month-label">2026년 06월</div>
            <div class="cal cal--range">
              <div class="cal__grid" role="grid">
                <div class="cal__week" role="row">
                  <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">31</button>
                  <button class="cal__day cal__day--range-start" role="gridcell" aria-selected="true" tabindex="0">1</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">2</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">3</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">4</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">5</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">6</button>
                </div>
                <div class="cal__week" role="row">
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">7</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">8</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">9</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">10</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">11</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">12</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">13</button>
                </div>
                <div class="cal__week" role="row">
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">14</button>
                  <button class="cal__day cal__day--today cal__day--in-range" role="gridcell" aria-current="date" aria-selected="true" tabindex="-1">15</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">16</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">17</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">18</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">19</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">20</button>
                </div>
                <div class="cal__week" role="row">
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">21</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">22</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">23</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">24</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">25</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">26</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">27</button>
                </div>
                <div class="cal__week" role="row">
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">28</button>
                  <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">29</button>
                  <button class="cal__day cal__day--range-end" role="gridcell" aria-selected="true" tabindex="0">30</button>
                  <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">1</button>
                  <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">2</button>
                  <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">3</button>
                  <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">4</button>
                </div>
              </div>
            </div>
          </div>
          <div class="drp__month">
            <div class="drp__month-label">2026년 07월</div>
            <div class="cal cal--range">
              <div class="cal__grid" role="grid">
                <div class="cal__week" role="row">
                  <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">28</button>
                  <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">29</button>
                  <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">30</button>
                  <button class="cal__day" role="gridcell" tabindex="-1">1</button>
                  <button class="cal__day" role="gridcell" tabindex="-1">2</button>
                  <button class="cal__day" role="gridcell" tabindex="-1">3</button>
                  <button class="cal__day" role="gridcell" tabindex="-1">4</button>
                </div>
                <div class="cal__week" role="row">
                  <button class="cal__day" role="gridcell" tabindex="-1">5</button>
                  <button class="cal__day" role="gridcell" tabindex="-1">6</button>
                  <button class="cal__day" role="gridcell" tabindex="-1">7</button>
                  <button class="cal__day" role="gridcell" tabindex="-1">8</button>
                  <button class="cal__day" role="gridcell" tabindex="-1">9</button>
                  <button class="cal__day" role="gridcell" tabindex="-1">10</button>
                  <button class="cal__day" role="gridcell" tabindex="-1">11</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="drp__footer">
      <button class="btn btn--ghost btn--sm" type="button">취소</button>
      <button class="btn btn--primary btn--sm" type="button">확인</button>
    </div>
  </div>
</div>
</div>
:::

---

## CSS

```css
/* ── Root ── */
.drp {
  position: relative;
  display: inline-flex;
  flex-direction: column;
}

/* ── Trigger ── */
.drp__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
  height: var(--height-base);
  padding: var(--space-inset-squish-lg);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-surface-base);
  color: var(--color-text-label);
  font-size: var(--font-size-base);
  cursor: pointer;
  white-space: nowrap;
}
.drp__trigger:hover { background: var(--color-action-neutral-hover); }
.drp--open .drp__trigger  { border-color: var(--color-border-brand); }
.drp--active .drp__trigger { border-color: var(--color-border-selected); }
.drp--active .drp__trigger .drp__trigger-label { color: var(--color-text-body); }
.drp--disabled .drp__trigger {
  border-color: var(--color-border-disabled);
  background: var(--color-surface-disabled);
  color: var(--color-text-disabled);
  pointer-events: none;
  cursor: default;
}

/* FilterBar 삽입 시 ghost variant — border·bg 없이 bar 컨테이너 스타일 수용 */
.drp__trigger--ghost {
  border-color: transparent;
  background: transparent;
  border-radius: 0;
}
.drp__trigger--ghost:hover { background: var(--color-action-neutral-hover); }

/* ── Panel ── */
.drp__panel {
  position: absolute;
  top: calc(100% + var(--space-gap-xs));
  left: 0;
  z-index: var(--z-dropdown);
  display: flex;
  flex-direction: column;
  width: 460px;
  background: var(--color-surface-base);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

/* ── 날짜 직접 입력 — DatePicker 범위 트리거와 동일 시각 언어 ── */
.drp__inputs {
  display: flex;
  align-items: center;
  gap: var(--space-gap-sm);
  padding: var(--space-inset-md) var(--space-inset-xl);
  border-bottom: 1px solid var(--color-border-subtle);
}
/* 시작/종료 날짜 그룹 — 테두리 있는 인풋 컨테이너 */
.drp__date-group {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  height: var(--height-base);
  padding: 0 var(--space-inset-lg);
  border: var(--stroke-sm) solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-surface-base);
  transition: border-color var(--duration-fast) var(--easing-base),
              box-shadow var(--duration-fast) var(--easing-base);
}
.drp__date-group:hover {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
.drp__date-group:focus-within {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
/* 분리 인풋 — dp__value-part와 동일 패턴 */
.drp__value-part {
  border: none;
  background: transparent;
  padding: 0;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  color: var(--color-text-body);
  line-height: var(--line-height-ui);
  outline: none; /* 포커스는 부모 .drp__date-group:focus-within 의 border + shadow가 담당 */
  cursor: text;
  text-align: center;
}
.drp__value-part--year { width: 44px; }
.drp__value-part--md   { width: 26px; }
.drp__value-part::placeholder { color: var(--color-text-subtle); }
.drp__value-sep {
  color: var(--color-text-subtle);
  user-select: none;
  flex-shrink: 0;
}
/* 시작~종료 구분자 */
.drp__input-sep {
  flex-shrink: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-base);
  padding: 0 var(--space-gap-2xs);
}

/* ── 본문 ── */
.drp__body {
  display: flex;
  flex: 1;
  min-height: 0;
}

/* ── 단축 탭 ── */
.drp__shortcuts {
  display: flex;
  flex-direction: column;
  width: 140px;
  flex-shrink: 0;
  padding: var(--space-inset-sm) 0;
  border-right: 1px solid var(--color-border-subtle);
}
.drp__shortcut {
  display: flex;
  align-items: center;
  height: var(--height-base);
  padding: 0 var(--space-inset-2xl);
  border: none;
  background: transparent;
  color: var(--color-text-label);
  font-size: var(--font-size-base);
  text-align: left;
  cursor: pointer;
  /* 긴 텍스트 말줄임 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.drp__shortcut:hover { background: var(--color-action-neutral-hover); }
.drp__shortcut--selected {
  background: var(--color-action-brand-subtle);
  color: var(--color-text-brand);
  font-weight: var(--font-weight-bold);
}
.drp__shortcut--selected:hover { background: var(--color-action-brand-hover); }

/* ── 달력 영역 ── */
.drp__cal-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-sm);
  padding: var(--space-inset-md) var(--space-inset-xl);
  overflow-y: auto;
}

/* ── 월 이동 버튼 — .drp__inputs 행 안에 위치 ── */
.drp__nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--height-compact);
  height: var(--height-compact);
  flex-shrink: 0;
  border: none;
  border-radius: var(--radius-xs);
  background: transparent;
  color: var(--color-text-subtle);
  cursor: pointer;
  transition: background var(--duration-fast) var(--easing-base),
              color var(--duration-fast) var(--easing-base);
}
.drp__nav-btn:hover {
  background: var(--color-action-neutral-hover);
  color: var(--color-text-body);
}
.drp__nav-btn:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── 공유 요일 헤더 ── */
/* 두 달 그리드에 공통 적용. .cal 내부 cal__weekdays는 사용하지 않으므로 숨김.
   width: 280px — Calendar atom의 고정 너비와 반드시 일치시켜야 셀 열이 정렬된다. */
.drp__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 280px;
}
.drp__weekdays > span {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--height-compact);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-subtle);
}
.drp__weekdays > span:first-child { color: var(--color-fill-error); }
.drp__weekdays > span:last-child  { color: var(--color-fill-brand); }

/* ── 두 달 그리드 ── */
.drp__months {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-md);
}
/* width: 280px — Calendar atom의 .cal과 동일 너비.
   align-items: stretch 기본값이 .cal(280px)을 부모 너비로 늘리는 것을 방지한다. */
.drp__month {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-xs);
  width: 280px;
}
/* 첫 번째 달 레이블 숨김 — 상단 인풋 행이 첫 달 기준을 이미 표시 */
.drp__month:first-child .drp__month-label { display: none; }
/* 월 구분 레이블 — DatePicker dp__month-divider와 동일 시각 언어 */
.drp__month-label {
  display: flex;
  align-items: center;
  gap: var(--space-gap-sm);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-subtle);
  line-height: var(--line-height-ui);
  padding: var(--space-inset-xs) 0 var(--space-gap-sm);
}
.drp__month-label::before,
.drp__month-label::after {
  content: '';
  flex: 1;
  height: var(--stroke-sm);
  background: var(--color-border-subtle);
}
/* .cal { width: 280px } — Calendar atom 기본값 유지. 오버라이드 금지. */
/* cal 내부 weekdays는 .drp__weekdays가 대신하므로 숨김 */
.drp__month .cal__weekdays { display: none; }

/* ── 푸터 ── */
.drp__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-gap-xs);
  padding: var(--space-inset-md) var(--space-inset-xl);
  border-top: 1px solid var(--color-border-subtle);
}
```

---

## 접근성

범위 선택 달력 유형 (`accessibility.md` 달력·드롭다운 행 적용). 키보드 접근·focus·disabled 해당.

| 상황 | 마크업 |
|------|--------|
| 트리거 | `aria-haspopup="dialog"` + `aria-expanded="false/true"` + `aria-label="기간 선택"` |
| 패널 | `role="dialog"` + `aria-label="기간 선택"` + `aria-modal="true"` |
| 날짜 그리드 | `role="grid"` + `aria-multiselectable="true"` |
| 단축 탭 컨테이너 | `role="listbox"` + `aria-label="기간 단축 선택"` |
| 단축 탭 아이템 | `role="option"` + `aria-selected="true/false"` |
| 월 이동 버튼 | `.drp__inputs` 행 안 `.drp__nav-btn` — `aria-label="이전 달"` / `"다음 달"` |
| disabled | 트리거에 `aria-disabled="true"` + `tabindex="-1"` |

```js
/* 트리거 키보드 */
trigger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  if (e.key === 'Escape') close();
});
/* 단축 탭 키보드 */
shortcuts.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') focusNextShortcut();
  if (e.key === 'ArrowUp')   focusPrevShortcut();
  if (e.key === 'Enter' || e.key === ' ') activateShortcut();
});
/* 달력 그리드 내 키보드는 calendar.md 키보드 내비게이션 참조 */
```

---

## Do / Don't

> ✅ DO — 기간 범위 선택에는 DateRangePicker를 사용
> `<div class="drp">...</div>`

> ❌ DON'T — DatePicker 두 개를 나란히 배치해 시작일·종료일을 받음
> 두 필드의 관계가 단절되고 유효성(종료일 > 시작일) 처리가 복잡해진다

> ✅ DO — FilterBar 내 기간 슬롯에 삽입할 때 `drp__trigger--ghost` 수식자 적용
> `<button class="drp__trigger drp__trigger--ghost">...</button>`

> ❌ DON'T — 단일 날짜 선택에 DateRangePicker 사용
> 단일 날짜는 DatePicker를 사용한다

> ✅ DO — 확인 버튼 클릭 시 커스텀 이벤트로 선택 결과 전달
> `container.dispatchEvent(new CustomEvent('drp:change', { detail: { start, end } }))`

> ❌ DON'T — `data-component` 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용이다
