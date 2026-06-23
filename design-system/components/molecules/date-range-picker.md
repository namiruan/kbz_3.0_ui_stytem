---
file: components/molecules/date-range-picker.md
version: 1.4.4
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/elevation.md, tokens/motion.md, tokens/typography.md, tokens/icon.md, components/atoms/calendar.md, components/atoms/button.md, components/atoms/icon.md
---

# DateRangePicker

## 개요

단축 탭(좌)과 달력 패널(우)을 조합해 시작일·종료일을 선택하는 기간 선택 컴포넌트.

- **트리거 버튼** 클릭 시 패널이 열린다.
- **단축 탭**: 전체·오늘·이번주·이번달 등 자주 쓰는 기간을 한 번에 선택한다. **전체**는 날짜 제한 없음을 의미하며, 확인 시 트리거에 "전체"를 표시하고 `drp:change` 이벤트의 `{ start: null, end: null, all: true }`를 전달한다.
- **달력 패널**: 기준 달 전후 총 16개 월을 초기화해 수직 스크롤로 탐색하며, 스크롤 끝에 도달하면 자동으로 확장된다. 범위 드래그로 선택한다.
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
- 날짜 제한 없이 전체 기간을 조회할 수 있게 하려면 단축 목록의 **전체** 옵션을 사용한다. `drp:change` 이벤트의 `detail.all === true`로 전체 선택 여부를 확인한다.
- 데이터 조회용으로 미래 날짜를 제한할 때는 `data-max-date="today"` 속성을 추가한다. 특정 날짜까지 제한할 때는 `data-max-date="YYYY-MM-DD"` 형식으로 지정한다.
- 과거 날짜를 제한할 때는 `data-min-date="YYYY-MM-DD"`를 사용한다. 두 속성을 함께 쓸 수 있다.

---

## 동작

트리거 클릭으로 패널 열기·닫기, 단축 탭·달력 범위 선택, 월 이동을 확인할 수 있다. 상단 세그먼트로 과거 기준(`data-max-date="today"`)과 미래 포함(제한 없음) 두 설정을 비교한다.

```js init
function initDRP(container) {
  if (!container.classList.contains('drp')) return;
  if (container.dataset.initDrp) return;
  container.dataset.initDrp = '1';

  var trigger     = container.querySelector('.drp__trigger');
  var panel       = container.querySelector('.drp__panel');
  var shortcuts   = container.querySelectorAll('.drp__shortcut');
  var drpParts    = container.querySelectorAll('.drp__value-part');
  var sYrEl = drpParts[0]; var sMoEl = drpParts[1]; var sDyEl = drpParts[2];
  var eYrEl = drpParts[3]; var eMoEl = drpParts[4]; var eDyEl = drpParts[5];
  var navBtns     = container.querySelectorAll('.drp__nav-btn');
  var scrollInner = container.querySelector('.drp__scroll-inner');
  var scrollBody  = container.querySelector('.drp__scroll-body');
  var cancelBtn   = container.querySelector('.drp__footer .btn--ghost');
  var confirmBtn  = container.querySelector('.drp__footer .btn--primary');

  var today = new Date(); today.setHours(0,0,0,0);
  var rangeStart = null, rangeEnd = null, hoverDate = null;
  var committed  = { start: null, end: null, all: false };
  var allSelected = false; /* 전체 단축 선택 여부 */

  function pad(n)      { return n < 10 ? '0' + n : '' + n; }
  function fmt(d)      { return d.getFullYear() + '.' + pad(d.getMonth()+1) + '.' + pad(d.getDate()); }
  function isSame(a,b) { return a && b && a.toDateString() === b.toDateString(); }
  function isBetween(d,s,e) { if(!s||!e) return false; var lo=s<e?s:e,hi=s<e?e:s; return d>lo&&d<hi; }
  function fromKey(k)  { var p=k.split(','); return new Date(+p[0],+p[1],+p[2]); }

  /* ── Min/Max 날짜 제한 ── */
  /* data-max-date="today"|"YYYY-MM-DD", data-min-date="YYYY-MM-DD" */
  function parseConfigDate(s) {
    if(!s) return null;
    if(s==='today') return new Date(today);
    var p=s.split('-'); if(p.length!==3) return null;
    var d=new Date(+p[0],+p[1]-1,+p[2]); d.setHours(0,0,0,0); return isNaN(d.getTime())?null:d;
  }
  var maxDate=parseConfigDate(container.dataset.maxDate);
  var minDate=parseConfigDate(container.dataset.minDate);
  function isDisabled(d) { return !!(maxDate&&d>maxDate)||!!(minDate&&d<minDate); }
  function isShortcutDisabled(r) { if(!r[0]&&!r[1]) return false; /* 전체: 항상 활성 */ return !!(maxDate&&(r[0]>maxDate||r[1]>maxDate))||!!(minDate&&(r[0]<minDate||r[1]<minDate)); }

  /* ── Section helpers ── */
  function firstSection() { return scrollBody.querySelector('.drp__month-section'); }
  function lastSection()  { var a=scrollBody.querySelectorAll('.drp__month-section'); return a[a.length-1]; }

  function prependMonth() {
    var f=firstSection(), y=+f.dataset.year, m=+f.dataset.month-1;
    if(m<0){m=11;y--;} var prevH=scrollBody.offsetHeight;
    scrollBody.insertBefore(renderSection(y,m), f);
    scrollInner.scrollTop += scrollBody.offsetHeight - prevH;
  }
  function appendMonth() {
    var l=lastSection(), y=+l.dataset.year, m=+l.dataset.month+1;
    if(m>11){m=0;y++;} scrollBody.appendChild(renderSection(y,m));
  }

  /* ── Open / Close ── */
  function open() {
    allSelected = committed.all||false;
    if(allSelected){var _aMin=minDate||new Date(today.getFullYear()-3,0,1);rangeStart=_aMin;rangeEnd=maxDate||new Date(today);}
    else{rangeStart=committed.start;rangeEnd=committed.end;}
    var navTo=allSelected?(rangeEnd||new Date(today)):rangeStart;
    var ay = navTo ? navTo.getFullYear() : today.getFullYear();
    var am = navTo ? navTo.getMonth()    : today.getMonth();
    if (!scrollBody.children.length) {
      for (var i=-3; i<13; i++) {
        var mm=am+i, my=ay;
        while(mm<0){mm+=12;my--;} while(mm>11){mm-=12;my++;}
        scrollBody.appendChild(renderSection(my,mm));
      }
    }
    panel.removeAttribute('hidden');
    container.classList.add('drp--open');
    trigger.setAttribute('aria-expanded','true');
    updateInputs();
    requestAnimationFrame(function() {
      var secs = scrollBody.querySelectorAll('.drp__month-section');
      var cur = null;
      Array.prototype.forEach.call(secs, function(s) {
        if(+s.dataset.year===ay && +s.dataset.month===am) cur=s;
      });
      scrollInner.scrollTop = cur ? cur.offsetTop - scrollInner.offsetTop : 0;
      updateClasses();
      syncShortcuts();
    });
  }
  function close() {
    panel.setAttribute('hidden','');
    container.classList.remove('drp--open');
    trigger.setAttribute('aria-expanded','false');
    hoverDate = null;
  }

  /* ── makeBtn ── */
  function makeBtn(d, vm) {
    var outside = d.getMonth()!==vm;
    var isStart = isSame(d,rangeStart), isEnd = isSame(d,rangeEnd);
    var inRange = isBetween(d,rangeStart,rangeEnd);
    var effEnd  = rangeEnd||hoverDate, goLeft = effEnd&&rangeStart&&effEnd<rangeStart;
    var isPreview  = !rangeEnd&&rangeStart&&hoverDate&&isBetween(d,rangeStart,hoverDate);
    var isHoverEnd = !rangeEnd&&rangeStart&&hoverDate&&isSame(d,hoverDate)&&!isStart;
    var btn = document.createElement('button');
    btn.setAttribute('role','gridcell'); btn.setAttribute('type','button');
    btn.dataset.date = d.getFullYear()+','+d.getMonth()+','+d.getDate();
    if(outside) btn.dataset.outside='true';
    var cls=['cal__day'];
    if(outside) cls.push('cal__day--outside');
    if(!outside&&isSame(d,today)){cls.push('cal__day--today');btn.setAttribute('aria-current','date');}
    if(isStart){
      if(!effEnd)      cls.push('cal__day--range-solo');
      else if(rangeEnd) cls.push(goLeft?'cal__day--range-start-left':'cal__day--range-start');
      else              cls.push(goLeft?'cal__day--range-start-left-pre':'cal__day--range-start-pre');
    }
    if(isEnd)      cls.push('cal__day--range-end');
    if(inRange)    cls.push('cal__day--in-range');
    if(isPreview)  cls.push('cal__day--in-range-preview');
    if(isHoverEnd) cls.push(goLeft?'cal__day--hover-end-left':'cal__day--hover-end');
    var disabled = !outside&&isDisabled(d);
    if(disabled) cls.push('cal__day--disabled');
    if(isStart||isEnd||inRange) btn.setAttribute('aria-selected','true');
    btn.className=cls.join(' ');
    var ariaLbl=d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일';
    if(!outside&&isSame(d,today)) ariaLbl+=', 오늘';
    if(isStart) ariaLbl+=', 시작일';
    else if(isEnd) ariaLbl+=', 종료일';
    if(disabled) ariaLbl+=', 선택 불가';
    btn.setAttribute('aria-label',ariaLbl);
    btn.textContent=d.getDate();
    if(!outside&&isDisabled(d)){btn.classList.add('cal__day--disabled');btn.setAttribute('disabled','');btn.setAttribute('aria-disabled','true');btn.setAttribute('tabindex','-1');}
    return btn;
  }

  /* ── markDisabledRuns — calendar.md의 띠 스타일(solo/start/mid/end)과 동일하게 연속 disabled 구간 감지 ── */
  function markDisabledRuns(section) {
    var allBtns = Array.prototype.slice.call(section.querySelectorAll('.cal__day'));
    var run = [];
    function flush() {
      if (run.length === 1) { run[0].classList.add('cal__day--disabled-solo'); }
      else if (run.length >= 2) {
        run[0].classList.add('cal__day--disabled-start');
        for (var i=1;i<run.length-1;i++) run[i].classList.add('cal__day--disabled-mid');
        run[run.length-1].classList.add('cal__day--disabled-end');
      }
      run = [];
    }
    allBtns.forEach(function(b) { if(b.classList.contains('cal__day--disabled')){run.push(b);}else{flush();} });
    flush();
  }

  /* ── renderSection ── */
  function renderSection(my, mm) {
    var section = document.createElement('div');
    section.className='drp__month-section'; section.dataset.year=my; section.dataset.month=mm;
    var label = document.createElement('div');
    label.className='drp__month-label'; label.textContent=my+'년 '+pad(mm+1)+'월';
    section.appendChild(label);
    var calDiv=document.createElement('div'); calDiv.className='cal cal--range';
    var gridDiv=document.createElement('div');
    gridDiv.className='cal__grid'; gridDiv.setAttribute('role','grid');
    gridDiv.setAttribute('aria-label',my+'년 '+pad(mm+1)+'월');
    gridDiv.setAttribute('aria-multiselectable','true');
    var first=new Date(my,mm,1), last=new Date(my,mm+1,0);
    var cur=new Date(first); cur.setDate(cur.getDate()-cur.getDay());
    while(cur<=last||cur.getDay()!==0){
      var row=document.createElement('div'); row.className='cal__week'; row.setAttribute('role','row');
      for(var i=0;i<7;i++){row.appendChild(makeBtn(new Date(cur),mm)); cur.setDate(cur.getDate()+1);}
      gridDiv.appendChild(row);
      if(cur>last&&cur.getDay()===0) break;
    }
    calDiv.appendChild(gridDiv); section.appendChild(calDiv);
    markDisabledRuns(section);
    return section;
  }

  /* calendar.md markDisabledRuns — 연속 disabled 구간 감지 → disabled-start/mid/end/solo 클래스 부여 */
  function markDisabledRuns(gridDiv) {
    var allBtns = Array.prototype.slice.call(gridDiv.querySelectorAll('.cal__day'));
    var run = [];
    function flush() {
      if(run.length===1){run[0].classList.add('cal__day--disabled-solo');}
      else if(run.length>=2){run[0].classList.add('cal__day--disabled-start');for(var i=1;i<run.length-1;i++)run[i].classList.add('cal__day--disabled-mid');run[run.length-1].classList.add('cal__day--disabled-end');}
      run=[];
    }
    allBtns.forEach(function(b){if(b.classList.contains('cal__day--disabled')){run.push(b);}else{flush();}});
    flush();
  }

  /* ── updateClasses (hover 시 전체 재빌드 없이 class만 갱신) ── */
  var rangeCls = ['cal__day--range-solo','cal__day--range-start','cal__day--range-start-left',
    'cal__day--range-start-pre','cal__day--range-start-left-pre','cal__day--range-end',
    'cal__day--in-range','cal__day--in-range-preview','cal__day--hover-end','cal__day--hover-end-left'];
  function updateClasses() {
    Array.prototype.forEach.call(scrollBody.querySelectorAll('.cal__day'), function(btn) {
      rangeCls.forEach(function(c){btn.classList.remove(c);}); btn.removeAttribute('aria-selected');
      if(btn.dataset.outside||btn.hasAttribute('disabled')) return;
      var d=fromKey(btn.dataset.date);
      var isStart=isSame(d,rangeStart),isEnd=isSame(d,rangeEnd),inRange=isBetween(d,rangeStart,rangeEnd);
      var effEnd=rangeEnd||hoverDate,goLeft=effEnd&&rangeStart&&effEnd<rangeStart;
      var isPreview=!rangeEnd&&rangeStart&&hoverDate&&isBetween(d,rangeStart,hoverDate);
      var isHoverEnd=!rangeEnd&&rangeStart&&hoverDate&&isSame(d,hoverDate)&&!isStart;
      if(isStart){
        if(!effEnd)       btn.classList.add('cal__day--range-solo');
        else if(rangeEnd) btn.classList.add(goLeft?'cal__day--range-start-left':'cal__day--range-start');
        else              btn.classList.add(goLeft?'cal__day--range-start-left-pre':'cal__day--range-start-pre');
      }
      if(isEnd)      btn.classList.add('cal__day--range-end');
      if(inRange)    btn.classList.add('cal__day--in-range');
      if(isPreview)  btn.classList.add('cal__day--in-range-preview');
      if(isHoverEnd) btn.classList.add(goLeft?'cal__day--hover-end-left':'cal__day--hover-end');
      if(isStart||isEnd||inRange) btn.setAttribute('aria-selected','true');
      var ariaLbl=d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일';
      if(isSame(d,today)) ariaLbl+=', 오늘';
      if(isStart) ariaLbl+=', 시작일';
      else if(isEnd) ariaLbl+=', 종료일';
      btn.setAttribute('aria-label',ariaLbl);
    });
  }

  /* ── jumpTo (특정 연·월로 초기화) ── */
  function jumpTo(y, m) {
    scrollBody.innerHTML='';
    for(var i=-3;i<13;i++){
      var mm=m+i,my=y;
      while(mm<0){mm+=12;my--;} while(mm>11){mm-=12;my++;}
      scrollBody.appendChild(renderSection(my,mm));
    }
    requestAnimationFrame(function(){
      var secs=scrollBody.querySelectorAll('.drp__month-section');
      scrollInner.scrollTop=secs[3]?secs[3].offsetTop-scrollInner.offsetTop:0;
      updateClasses();
    });
  }

  /* ── scrollToSection (nav 화살표) ── */
  function activeIdx() {
    var secs=Array.prototype.slice.call(scrollBody.querySelectorAll('.drp__month-section'));
    var idx=0;
    secs.forEach(function(s,i){ if(s.offsetTop-scrollInner.offsetTop<=scrollInner.scrollTop+40) idx=i; });
    return idx;
  }
  function scrollToSection(offset) {
    var secs=Array.prototype.slice.call(scrollBody.querySelectorAll('.drp__month-section'));
    var idx=activeIdx();
    if(offset===-1&&idx===0){prependMonth();secs=Array.prototype.slice.call(scrollBody.querySelectorAll('.drp__month-section'));idx=1;}
    if(offset===1&&idx===secs.length-1){appendMonth();secs=Array.prototype.slice.call(scrollBody.querySelectorAll('.drp__month-section'));}
    var target=secs[idx+offset];
    if(target) scrollInner.scrollTop=target.offsetTop-scrollInner.offsetTop;
  }

  /* ── Inputs ── */
  function updateInputs() {
    if(allSelected){
      if(rangeStart){sYrEl.value=String(rangeStart.getFullYear());sMoEl.value=pad(rangeStart.getMonth()+1);sDyEl.value=pad(rangeStart.getDate());}
      else{sYrEl.value=sMoEl.value=sDyEl.value='';}
      if(rangeEnd){eYrEl.value=String(rangeEnd.getFullYear());eMoEl.value=pad(rangeEnd.getMonth()+1);eDyEl.value=pad(rangeEnd.getDate());}
      else{eYrEl.value=eMoEl.value=eDyEl.value='';}
      return;
    }
    if(rangeStart){sYrEl.value=String(rangeStart.getFullYear());sMoEl.value=pad(rangeStart.getMonth()+1);sDyEl.value=pad(rangeStart.getDate());}
    else{sYrEl.value=sMoEl.value=sDyEl.value='';}
    if(rangeEnd){eYrEl.value=String(rangeEnd.getFullYear());eMoEl.value=pad(rangeEnd.getMonth()+1);eDyEl.value=pad(rangeEnd.getDate());}
    else{eYrEl.value=eMoEl.value=eDyEl.value='';}
  }

  function isValidDate(y,m,d){if(isNaN(y)||isNaN(m)||isNaN(d))return false;var dt=new Date(y,m-1,d);return!isNaN(dt.getTime())&&dt.getMonth()===m-1&&dt.getDate()===d;}
  function applyPartsToRange() { allSelected=false;
    var sy=parseInt(sYrEl.value,10),sm=parseInt(sMoEl.value,10),sd=parseInt(sDyEl.value,10);
    var ey=parseInt(eYrEl.value,10),em=parseInt(eMoEl.value,10),ed=parseInt(eDyEl.value,10);
    var hasS=sYrEl.value||sMoEl.value||sDyEl.value, hasE=eYrEl.value||eMoEl.value||eDyEl.value;
    if(hasS&&isValidDate(sy,sm,sd)){var ds=new Date(sy,sm-1,sd);if(!isDisabled(ds))rangeStart=ds;}else if(!hasS)rangeStart=null;
    if(hasE&&isValidDate(ey,em,ed)){var de=new Date(ey,em-1,ed);if(!isDisabled(de))rangeEnd=de;}  else if(!hasE)rangeEnd=null;
    if(rangeStart&&rangeEnd&&rangeEnd<rangeStart){var t=rangeStart;rangeStart=rangeEnd;rangeEnd=t;}
    if(rangeStart&&sYrEl.value.length===4&&sMoEl.value.length>=1) jumpTo(rangeStart.getFullYear(),rangeStart.getMonth());
    else { hoverDate=null; updateClasses(); syncShortcuts(); }
  }
  function advancePart(el,maxLen,nextEl){
    el.addEventListener('input',function(){el.value=el.value.replace(/\D/g,'').slice(0,maxLen);if(nextEl&&el.value.length===maxLen)nextEl.focus();applyPartsToRange();});
    el.addEventListener('click',function(e){e.stopPropagation();});
    el.addEventListener('keydown',function(e){if(e.key==='Escape')close();if(e.key==='Enter'){e.preventDefault();el.blur();}});
  }
  advancePart(sYrEl,4,sMoEl);advancePart(sMoEl,2,sDyEl);advancePart(sDyEl,2,eYrEl);
  advancePart(eYrEl,4,eMoEl);advancePart(eMoEl,2,eDyEl);advancePart(eDyEl,2,null);

  /* ── 단축 탭 ── */
  var SHORTCUTS = {
    'all':        function(){return[null,null];},
    'today':      function(){var t=new Date(today);return[t,new Date(t)];},
    'yesterday':  function(){var y=new Date(today);y.setDate(y.getDate()-1);return[y,new Date(y)];},
    'this-week':  function(){var s=new Date(today);s.setDate(s.getDate()-((s.getDay()+6)%7));var e=new Date(s);e.setDate(e.getDate()+6);return[s,e];},
    'last-week':  function(){var s=new Date(today);s.setDate(s.getDate()-((s.getDay()+6)%7)-7);var e=new Date(s);e.setDate(e.getDate()+6);return[s,e];},
    'this-month': function(){var s=new Date(today.getFullYear(),today.getMonth(),1);return[s,new Date(today)];},
    'last-month':      function(){var s=new Date(today.getFullYear(),today.getMonth()-1,1);var e=new Date(today.getFullYear(),today.getMonth(),0);return[s,e];},
    'tomorrow':        function(){var t=new Date(today);t.setDate(t.getDate()+1);return[t,new Date(t)];},
    'next-week':       function(){var s=new Date(today);s.setDate(s.getDate()-((s.getDay()+6)%7)+7);var e=new Date(s);e.setDate(e.getDate()+6);return[s,e];},
    'this-month-full': function(){var s=new Date(today.getFullYear(),today.getMonth(),1);var e=new Date(today.getFullYear(),today.getMonth()+1,0);return[s,e];},
    'next-month':      function(){var s=new Date(today.getFullYear(),today.getMonth()+1,1);var e=new Date(today.getFullYear(),today.getMonth()+2,0);return[s,e];}
  };
  function syncShortcuts() {
    var hasSelected=false;
    shortcuts.forEach(function(item){
      var fn=SHORTCUTS[item.dataset.shortcut]; if(!fn) return;
      var r=fn(), dis=isShortcutDisabled(r);
      item.classList.toggle('drp__shortcut--disabled',dis); item.setAttribute('aria-disabled',dis?'true':'false');
      if(dis){item.classList.remove('drp__shortcut--selected');item.setAttribute('aria-selected','false');item.setAttribute('tabindex','-1');return;}
      var on=(!r[0]&&!r[1])?allSelected:!!(rangeStart&&rangeEnd&&isSame(rangeStart,r[0])&&isSame(rangeEnd,r[1]));
      item.classList.toggle('drp__shortcut--selected',on); item.setAttribute('aria-selected',on?'true':'false');
      if(on){item.setAttribute('tabindex','0');hasSelected=true;}else{item.setAttribute('tabindex','-1');}
    });
    if(!hasSelected&&shortcuts[0]) shortcuts[0].setAttribute('tabindex','0');
  }
  shortcuts.forEach(function(item,idx){
    item.addEventListener('click',function(){
      if(item.classList.contains('drp__shortcut--disabled')) return;
      var fn=SHORTCUTS[item.dataset.shortcut]; if(!fn) return;
      var r=fn(); rangeStart=r[0]; rangeEnd=r[1]; hoverDate=null;
      allSelected=(!rangeStart&&!rangeEnd);
      if(allSelected&&minDate){rangeStart=minDate;rangeEnd=maxDate||new Date(today);}
      updateInputs();
      var navTo=allSelected?(rangeEnd||new Date(today)):rangeStart;
      if(navTo) jumpTo(navTo.getFullYear(),navTo.getMonth());
      else { updateClasses(); }
      requestAnimationFrame(function(){syncShortcuts();});
    });
    item.addEventListener('keydown',function(e){
      if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();var n=shortcuts[(idx+1)%shortcuts.length];item.setAttribute('tabindex','-1');n.setAttribute('tabindex','0');n.focus();}
      else if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();var p=shortcuts[(idx-1+shortcuts.length)%shortcuts.length];item.setAttribute('tabindex','-1');p.setAttribute('tabindex','0');p.focus();}
      else if(e.key==='Enter'||e.key===' '){e.preventDefault();item.click();}
    });
  });

  /* ── Nav 화살표 ── */
  navBtns[0].addEventListener('click',function(){scrollToSection(-1);});
  navBtns[1].addEventListener('click',function(){scrollToSection(1);});

  /* ── 달력 클릭·hover ── */
  scrollBody.addEventListener('click',function(e){
    var btn=e.target.closest?e.target.closest('.cal__day'):e.target;
    if(!btn||btn.dataset.outside||btn.hasAttribute('disabled')) return;
    e.stopPropagation();
    var d=fromKey(btn.dataset.date);
    if(!rangeStart||rangeEnd){rangeStart=d;rangeEnd=null;hoverDate=null;}
    else if(isSame(rangeStart,d)){rangeEnd=d;hoverDate=null;} /* 같은 날 재클릭 → 단일 날짜 범위 확정 */
    else{rangeEnd=d;if(rangeEnd<rangeStart){var t=rangeStart;rangeStart=rangeEnd;rangeEnd=t;}hoverDate=null;}
    allSelected=false; updateInputs(); updateClasses(); syncShortcuts();
  });
  scrollBody.addEventListener('mouseover',function(e){
    var btn=e.target.closest?e.target.closest('.cal__day'):e.target;
    if(!btn||btn.dataset.outside||!rangeStart||rangeEnd||btn.hasAttribute('disabled')) return;
    var d=fromKey(btn.dataset.date);
    if(!isSame(d,hoverDate)){hoverDate=d;updateClasses();}
  });
  scrollInner.addEventListener('scroll',function(){
    if(scrollInner.scrollTop<120) prependMonth();
    if(scrollInner.scrollTop+scrollInner.clientHeight>scrollInner.scrollHeight-120) appendMonth();
  });

  /* ── Trigger ── */
  trigger.addEventListener('click',function(e){
    e.stopPropagation();
    container.classList.contains('drp--open')?close():open();
  });

  /* ── 취소 / 확인 ── */
  cancelBtn.addEventListener('click',function(){
    allSelected=committed.all||false;
    if(allSelected){var _aMin=minDate||new Date(today.getFullYear()-3,0,1);rangeStart=_aMin;rangeEnd=maxDate||new Date(today);}
    else{rangeStart=committed.start;rangeEnd=committed.end;}
    hoverDate=null;
    updateInputs();updateClasses();syncShortcuts();close();
  });
  confirmBtn.addEventListener('click',function(){
    var labelEl=trigger.querySelector('.drp__trigger-label');
    if(allSelected){
      committed={start:null,end:null,all:true};
      labelEl.textContent='전체';
      container.classList.add('drp--active');
    } else if(rangeStart&&rangeEnd){
      committed={start:rangeStart,end:rangeEnd,all:false};
      labelEl.textContent=fmt(rangeStart)+' ~ '+fmt(rangeEnd);
      container.classList.add('drp--active');
    } else {
      committed={start:null,end:null,all:false};
      labelEl.textContent=container.dataset.placeholder||'기간 선택';
      container.classList.remove('drp--active');
    }
    container.dispatchEvent(new CustomEvent('drp:change',{bubbles:true,detail:{start:committed.start,end:committed.end,all:committed.all}}));
    close();
  });

  document.addEventListener('click',function(e){if(!container.contains(e.target)&&!panel.contains(e.target))close();});

  /* 외부에서 drp:reset 이벤트를 디스패치하면 선택 초기화 */
  container.addEventListener('drp:reset',function(){
    committed={start:null,end:null,all:false};
    allSelected=false; rangeStart=null; rangeEnd=null; hoverDate=null;
    container.classList.remove('drp--active');
    trigger.querySelector('.drp__trigger-label').textContent=container.dataset.placeholder||'기간 선택';
    container.dispatchEvent(new CustomEvent('drp:change',{bubbles:true,detail:{start:null,end:null,all:false}}));
  });
}
if (typeof window.__componentInits === 'undefined') window.__componentInits = [];
window.__componentInits.push(function(root) { root.querySelectorAll('.drp').forEach(function(el) { initDRP(el); }); });
```

:::preview
<!-- 패널 높이를 수용하기 위한 뷰어 전용 여백 -->
<div style="padding-bottom: 520px;">
<div style="margin-bottom:var(--space-gap-md);">
  <div class="segment" id="drp-mode-seg" role="radiogroup" aria-label="설정 유형">
    <button class="segment__item segment__item--selected" role="radio" aria-checked="true" data-mode="past">과거 기준</button>
    <button class="segment__item" role="radio" aria-checked="false" data-mode="future">미래 포함</button>
    <span class="segment__slider" aria-hidden="true"></span>
  </div>
</div>
<!-- 과거 기준: data-max-date="today" — 이번주·다음주 등 미래 포함 단축 제외 -->
<div data-component class="drp" id="drp-past" data-placeholder="기간 선택" data-max-date="today">
  <button class="drp__trigger" aria-haspopup="dialog" aria-expanded="false" aria-label="기간 선택">
    <span class="drp__trigger-label">기간 선택</span>
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
  </button>
  <div class="drp__panel" role="dialog" aria-label="기간 선택" aria-modal="true" hidden>
    <div class="drp__inputs">
      <button class="drp__nav-btn" type="button" aria-label="이전 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <div class="drp__date-group">
        <input class="drp__value-part drp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="시작 연도" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="시작 월" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="시작 일" autocomplete="off">
      </div>
      <span class="drp__input-sep" aria-hidden="true">~</span>
      <div class="drp__date-group">
        <input class="drp__value-part drp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="종료 연도" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="종료 월" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="종료 일" autocomplete="off">
      </div>
      <button class="drp__nav-btn" type="button" aria-label="다음 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
    </div>
    <div class="drp__body">
      <ul class="drp__shortcuts" role="listbox" aria-label="기간 단축 선택">
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="0" data-shortcut="all">전체</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="today">오늘</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="yesterday">어제</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="last-week">지난주</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="this-month">이번달</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="last-month">지난달</li>
      </ul>
      <div class="drp__cal-area">
        <div class="drp__weekdays" role="row" aria-hidden="true">
          <span role="columnheader" aria-label="일요일">일</span>
          <span role="columnheader" aria-label="월요일">월</span>
          <span role="columnheader" aria-label="화요일">화</span>
          <span role="columnheader" aria-label="수요일">수</span>
          <span role="columnheader" aria-label="목요일">목</span>
          <span role="columnheader" aria-label="금요일">금</span>
          <span role="columnheader" aria-label="토요일">토</span>
        </div>
        <div class="drp__scroll-inner">
          <div class="drp__scroll-body"></div>
        </div>
      </div>
    </div>
    <div class="drp__footer">
      <button class="btn btn--ghost btn--sm" type="button">취소</button>
      <button class="btn btn--primary btn--sm" type="button">확인</button>
    </div>
  </div>
</div>
<!-- 미래 포함: 날짜 제한 없음 — 내일·다음주·다음달 단축 포함, 이번달은 월말까지 -->
<div class="drp" id="drp-future" data-placeholder="기간 선택" style="display:none;">
  <button class="drp__trigger" aria-haspopup="dialog" aria-expanded="false" aria-label="기간 선택">
    <span class="drp__trigger-label">기간 선택</span>
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
  </button>
  <div class="drp__panel" role="dialog" aria-label="기간 선택" aria-modal="true" hidden>
    <div class="drp__inputs">
      <button class="drp__nav-btn" type="button" aria-label="이전 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <div class="drp__date-group">
        <input class="drp__value-part drp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="시작 연도" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="시작 월" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="시작 일" autocomplete="off">
      </div>
      <span class="drp__input-sep" aria-hidden="true">~</span>
      <div class="drp__date-group">
        <input class="drp__value-part drp__value-part--year" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="종료 연도" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="종료 월" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="종료 일" autocomplete="off">
      </div>
      <button class="drp__nav-btn" type="button" aria-label="다음 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
    </div>
    <div class="drp__body">
      <ul class="drp__shortcuts" role="listbox" aria-label="기간 단축 선택">
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="0" data-shortcut="all">전체</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="today">오늘</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="tomorrow">내일</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="this-week">이번주</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="next-week">다음주</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="this-month-full">이번달</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1" data-shortcut="next-month">다음달</li>
      </ul>
      <div class="drp__cal-area">
        <div class="drp__weekdays" role="row" aria-hidden="true">
          <span role="columnheader" aria-label="일요일">일</span>
          <span role="columnheader" aria-label="월요일">월</span>
          <span role="columnheader" aria-label="화요일">화</span>
          <span role="columnheader" aria-label="수요일">수</span>
          <span role="columnheader" aria-label="목요일">목</span>
          <span role="columnheader" aria-label="금요일">금</span>
          <span role="columnheader" aria-label="토요일">토</span>
        </div>
        <div class="drp__scroll-inner">
          <div class="drp__scroll-body"></div>
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
<script>
(function(){
  var pastEl = stage.querySelector('#drp-past');
  var futureEl = stage.querySelector('#drp-future');
  var seg = stage.querySelector('#drp-mode-seg');
  var slider = seg.querySelector('.segment__slider');
  var selItem = seg.querySelector('.segment__item--selected');
  slider.style.transition = 'none';
  slider.style.width = selItem.offsetWidth + 'px';
  slider.style.transform = 'translateX(' + selItem.offsetLeft + 'px)';
  seg.offsetWidth;
  slider.style.transition = '';
  seg.addEventListener('click', function(e) {
    var item = e.target.closest ? e.target.closest('.segment__item') : e.target;
    if (!item || !item.classList.contains('segment__item')) return;
    seg.querySelectorAll('.segment__item').forEach(function(b) {
      b.classList.remove('segment__item--selected');
      b.setAttribute('aria-checked', 'false');
    });
    item.classList.add('segment__item--selected');
    item.setAttribute('aria-checked', 'true');
    slider.style.width = item.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + item.offsetLeft + 'px)';
    if (item.dataset.mode === 'past') {
      if (futureEl.classList.contains('drp--open')) futureEl.querySelector('.drp__trigger').click();
      pastEl.style.display = '';
      futureEl.style.display = 'none';
    } else {
      if (pastEl.classList.contains('drp--open')) pastEl.querySelector('.drp__trigger').click();
      pastEl.style.display = 'none';
      futureEl.style.display = '';
    }
  });
  initDRP(pastEl);
  initDRP(futureEl);
})();
</script>
:::

---

## Anatomy

<!-- AI: .drp(root) > .drp__trigger + .drp__panel.
panel 구조: .drp__inputs + .drp__body(.drp__shortcuts + .drp__cal-area) + .drp__footer.
.drp__inputs: .drp__nav-btn(이전달) + .drp__date-group + .drp__input-sep("~") + .drp__date-group + .drp__nav-btn(다음달).
  - 각 .drp__date-group: .drp__value-part--year(44px) + .drp__value-sep(".") + .drp__value-part--short × 2.
  - 입력 시 달력 즉시 반영, 달력 클릭 시 인풋 자동 채움. 월 이동 화살표도 이 행에 위치.
cal-area: .drp__weekdays(공유 요일 헤더, 고정) + .drp__scroll-inner(스크롤 영역) > .drp__scroll-body.
JS가 .drp__scroll-body 안에 .drp__month-section[data-year][data-month] 을 동적 생성.
각 .drp__month-section: .drp__month-label(divider 스타일, 모든 섹션에 표시) + .cal.cal--range > .cal__grid.
open() 시 기준 달 기준 -3~+12 총 16개 섹션 초기화. 스크롤 상단/하단 접근 시 prependMonth/appendMonth로 무한 확장.
단축 탭: role="listbox"인 .drp__shortcuts > .drp__shortcut[role="option"][data-shortcut="..."].
단축은 전체·오늘·어제·이번주·지난주·이번달·지난달 순서. data-shortcut="all"(전체)은 날짜 제한 없음 의미 — 선택 시 rangeStart/End=null.
drp__shortcut--selected는 JS가 현재 범위가 단축 정의와 일치할 때 자동 부여. 전체는 rangeStart·rangeEnd 모두 null이고 allSelected=true일 때 선택됨.
달력 그리드는 calendar.md의 .cal.cal--range > .cal__grid 구조 참조 — 네이티브 table 금지.
푸터 버튼은 button.md의 btn btn--ghost btn--sm(취소) / btn btn--primary btn--sm(확인) 참조.
아이콘 요소는 icon.md의 .icon.icon--sm 구조 참조. -->

:::preview
<div style="padding-bottom:480px;">
<div data-component class="drp drp--open drp--active" style="position:relative;">
  <button class="drp__trigger" style="margin-bottom:4px;" aria-expanded="true">
    <span class="drp__trigger-label">2026.06.01 ~ 2026.06.30</span>
    <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
  </button>
  <div class="drp__panel" role="dialog" aria-label="기간 선택" style="position:absolute;top:40px;left:0;">
    <div class="drp__inputs">
      <button class="drp__nav-btn" aria-label="이전 달"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>
      <div class="drp__date-group">
        <input class="drp__value-part drp__value-part--year" type="text" value="2026" aria-label="시작 연도" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" value="06" aria-label="시작 월" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" value="01" aria-label="시작 일" autocomplete="off">
      </div>
      <span class="drp__input-sep" aria-hidden="true">~</span>
      <div class="drp__date-group">
        <input class="drp__value-part drp__value-part--year" type="text" value="2026" aria-label="종료 연도" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" value="06" aria-label="종료 월" autocomplete="off">
        <span class="drp__value-sep" aria-hidden="true">.</span>
        <input class="drp__value-part drp__value-part--short" type="text" value="30" aria-label="종료 일" autocomplete="off">
      </div>
      <button class="drp__nav-btn" aria-label="다음 달"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
    </div>
    <div class="drp__body">
      <ul class="drp__shortcuts" role="listbox" aria-label="기간 단축 선택">
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1">전체</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1">오늘</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1">어제</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1">이번주</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1">지난주</li>
        <li class="drp__shortcut drp__shortcut--selected" role="option" aria-selected="true" tabindex="0">이번달</li>
        <li class="drp__shortcut" role="option" aria-selected="false" tabindex="-1">지난달</li>
      </ul>
      <div class="drp__cal-area">
        <div class="drp__weekdays" role="row" aria-hidden="true">
          <span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
        </div>
        <!-- JS가 drp__month-section을 동적 생성. 정적 예시로 구조를 표현. -->
        <div class="drp__scroll-inner">
          <div class="drp__scroll-body">
            <div class="drp__month-section" data-year="2026" data-month="5">
              <div class="drp__month-label">2026년 06월</div>
              <div class="cal cal--range">
                <div class="cal__grid" role="grid" aria-label="2026년 06월" aria-multiselectable="true">
                  <div class="cal__week" role="row">
                    <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 5월 31일" tabindex="-1">31</button>
                    <button class="cal__day cal__day--range-start" role="gridcell" aria-label="2026년 6월 1일, 시작일" aria-selected="true" tabindex="0">1</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 2일" aria-selected="true" tabindex="-1">2</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 3일" aria-selected="true" tabindex="-1">3</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 4일" aria-selected="true" tabindex="-1">4</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 5일" aria-selected="true" tabindex="-1">5</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 6일" aria-selected="true" tabindex="-1">6</button>
                  </div>
                  <div class="cal__week" role="row">
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 7일" aria-selected="true" tabindex="-1">7</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 8일" aria-selected="true" tabindex="-1">8</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 9일" aria-selected="true" tabindex="-1">9</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 10일" aria-selected="true" tabindex="-1">10</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 11일" aria-selected="true" tabindex="-1">11</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 12일" aria-selected="true" tabindex="-1">12</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 13일" aria-selected="true" tabindex="-1">13</button>
                  </div>
                  <div class="cal__week" role="row">
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 14일" aria-selected="true" tabindex="-1">14</button>
                    <button class="cal__day cal__day--today cal__day--in-range" role="gridcell" aria-label="2026년 6월 15일, 오늘" aria-current="date" aria-selected="true" tabindex="-1">15</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 16일" aria-selected="true" tabindex="-1">16</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 17일" aria-selected="true" tabindex="-1">17</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 18일" aria-selected="true" tabindex="-1">18</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 19일" aria-selected="true" tabindex="-1">19</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 20일" aria-selected="true" tabindex="-1">20</button>
                  </div>
                  <div class="cal__week" role="row">
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 21일" aria-selected="true" tabindex="-1">21</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 22일" aria-selected="true" tabindex="-1">22</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 23일" aria-selected="true" tabindex="-1">23</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 24일" aria-selected="true" tabindex="-1">24</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 25일" aria-selected="true" tabindex="-1">25</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 26일" aria-selected="true" tabindex="-1">26</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 27일" aria-selected="true" tabindex="-1">27</button>
                  </div>
                  <div class="cal__week" role="row">
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 28일" aria-selected="true" tabindex="-1">28</button>
                    <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 29일" aria-selected="true" tabindex="-1">29</button>
                    <button class="cal__day cal__day--range-end" role="gridcell" aria-label="2026년 6월 30일, 종료일" aria-selected="true" tabindex="0">30</button>
                    <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 1일" tabindex="-1">1</button>
                    <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 2일" tabindex="-1">2</button>
                    <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 3일" tabindex="-1">3</button>
                    <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 4일" tabindex="-1">4</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="drp__month-section" data-year="2026" data-month="6">
              <div class="drp__month-label">2026년 07월</div>
              <div class="cal cal--range">
                <div class="cal__grid" role="grid" aria-label="2026년 07월" aria-multiselectable="true">
                  <div class="cal__week" role="row">
                    <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 6월 28일" tabindex="-1">28</button>
                    <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 6월 29일" tabindex="-1">29</button>
                    <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 6월 30일" tabindex="-1">30</button>
                    <button class="cal__day" role="gridcell" aria-label="2026년 7월 1일" tabindex="-1">1</button>
                    <button class="cal__day" role="gridcell" aria-label="2026년 7월 2일" tabindex="-1">2</button>
                    <button class="cal__day" role="gridcell" aria-label="2026년 7월 3일" tabindex="-1">3</button>
                    <button class="cal__day" role="gridcell" aria-label="2026년 7월 4일" tabindex="-1">4</button>
                  </div>
                  <div class="cal__week" role="row">
                    <button class="cal__day" role="gridcell" aria-label="2026년 7월 5일" tabindex="-1">5</button>
                    <button class="cal__day" role="gridcell" aria-label="2026년 7월 6일" tabindex="-1">6</button>
                    <button class="cal__day" role="gridcell" aria-label="2026년 7월 7일" tabindex="-1">7</button>
                    <button class="cal__day" role="gridcell" aria-label="2026년 7월 8일" tabindex="-1">8</button>
                    <button class="cal__day" role="gridcell" aria-label="2026년 7월 9일" tabindex="-1">9</button>
                    <button class="cal__day" role="gridcell" aria-label="2026년 7월 10일" tabindex="-1">10</button>
                    <button class="cal__day" role="gridcell" aria-label="2026년 7월 11일" tabindex="-1">11</button>
                  </div>
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
  padding: var(--space-inset-squish-md);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  color: var(--color-text-subtle); /* placeholder 상태 — 날짜 미선택 시 input placeholder와 동일 */
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  cursor: pointer;
  white-space: nowrap;
  transition: border-color var(--duration-fast) var(--easing-base),
              box-shadow var(--duration-fast) var(--easing-base);
}
.drp__trigger:hover {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
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
.drp__trigger:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* FilterBar 삽입 시 ghost variant — border·bg 없이 bar 컨테이너 스타일 수용 */
.drp__trigger--ghost {
  border-color: transparent;
  background: transparent;
  border-radius: 0;
}
.drp__trigger--ghost:hover {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
/* ghost 선택됨 — 색 피드백 없으므로 굵기로 선택 상태 표시 (dropdown--ghost 동일 패턴) */
.drp--active .drp__trigger--ghost {
  border-color: transparent;
}
.drp--active .drp__trigger--ghost .drp__trigger-label {
  font-weight: var(--font-weight-semibold);
}

/* ── Panel ── */
.drp__panel {
  position: absolute;
  top: calc(100% + var(--space-gap-xs));
  left: 0;
  z-index: var(--z-dropdown);
  display: flex;
  flex-direction: column;
  width: max-content; /* 숏컷 + 달력(280px) 너비에 맞춤 */
  max-height: 480px;
  overflow: hidden;
  background: var(--color-surface-base);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

/* ── 날짜 직접 입력 — DatePicker 범위 트리거와 동일 시각 언어 ── */
.drp__inputs {
  display: flex;
  align-items: center;
  gap: var(--space-gap-sm);
  padding: var(--space-inset-md) var(--space-inset-xl);
  border-bottom: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}
/* 시작/종료 날짜 그룹 — 테두리 있는 인풋 컨테이너 */
.drp__date-group {
  display: flex;
  align-items: center;
  height: var(--height-base);
  padding: 0 var(--space-inset-lg);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  transition: border-color var(--duration-fast) var(--easing-base),
              box-shadow var(--duration-fast) var(--easing-base);
}
.drp__date-group:hover {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
.drp__date-group:focus-within {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
  outline: var(--stroke-md) solid var(--color-border-focus); /* 전역 *:focus-visible outline을 컨테이너 레벨에서 적용 — input:focus-visible 동일 패턴 */
  outline-offset: var(--space-offset-focus);
}
/* 분리 인풋 — 연·월·일 각 파트는 outline 개별 표시 억제, 시각 포커스는 부모 :focus-within이 담당 */
.drp__value-part {
  border: none;
  background: transparent;
  padding: 0;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  color: var(--color-text-body);
  line-height: var(--line-height-ui);
  outline: none; /* multi-part input — 개별 part outline 억제 의도적. 포커스 표시는 .drp__date-group:focus-within 의 outline + border + shadow가 담당 */
  cursor: text;
  text-align: center;
}
.drp__value-part--year { width: 40px; }
.drp__value-part--short   { width: 24px; }
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

/* ── 단축 탭 — ul[role="listbox"] + li[role="option"] 패턴 (Dropdown option-list 기준) ── */
ul.drp__shortcuts {
  list-style: none;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: max-content; /* 텍스트 너비에 맞춤 */
  flex-shrink: 0;
  padding: var(--space-inset-sm) 0;
  border-right: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
}
li.drp__shortcut {
  display: flex;
  align-items: center;
  height: var(--height-base);
  padding: 0 var(--space-inset-2xl);
  background: transparent;
  color: var(--color-text-label);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  white-space: nowrap;
  cursor: pointer;
  outline: none; /* panel overflow:hidden으로 outline clip 방지 — focus는 background로 표시 */
}
li.drp__shortcut:hover,
li.drp__shortcut:focus-visible { background: var(--color-action-brand-hover); }
li.drp__shortcut--selected {
  background: var(--color-action-brand-selected);
  color: var(--color-text-brand);
}
li.drp__shortcut--selected:hover,
li.drp__shortcut--selected:focus-visible { background: var(--color-action-brand-hover); }

/* ── 달력 영역 ── */
.drp__cal-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-sm);
  padding: var(--space-inset-md) var(--space-inset-xl) 0;
  min-height: 0;
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
.drp__weekdays > span:first-child { color: var(--color-text-error); }
.drp__weekdays > span:last-child  { color: var(--color-text-brand); }

/* ── 스크롤 컨테이너 ── */
/* flex: 1 + min-height: 0 조합이 필수 — 부모 flex 안에서 남은 높이를 채우고 overflow-y가 동작하려면 명시적 높이가 있어야 한다 */
.drp__scroll-inner {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  min-height: 0;
}
/* JS가 renderSection()으로 동적 생성하는 drp__month-section들을 수직 배치 */
.drp__scroll-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-sm);
  padding-bottom: var(--space-inset-md);
}

/* ── 월 섹션 (JS 동적 생성) ── */
.drp__month-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-xs);
  width: 280px; /* Calendar atom의 .cal과 동일 너비 — 오버라이드 금지 */
}
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
.drp__month-section .cal__weekdays { display: none; }

/* ── 날짜 비활성 (data-max-date / data-min-date 범위 밖) ── */
/* calendar.md .cal__day--disabled 동일 패턴 */
.drp__month-section .cal__day--disabled {
  color: var(--color-text-disabled);
  pointer-events: none;
  cursor: default;
}
/* 연속 disabled 띠 — calendar.md ::before 패턴 동일 적용 */
.drp__month-section .cal__day--disabled-solo::before,
.drp__month-section .cal__day--disabled-start::before,
.drp__month-section .cal__day--disabled-mid::before,
.drp__month-section .cal__day--disabled-end::before {
  content: '';
  position: absolute;
  top: 0;
  height: var(--height-compact);
  background: var(--color-surface-disabled);
  z-index: -1;
}
.drp__month-section .cal__day--disabled-solo::before {
  left: 50%; transform: translateX(-50%);
  width: var(--height-compact);
  border-radius: var(--radius-pill);
}
.drp__month-section .cal__day--disabled-start::before {
  left: 0; right: 0;
  border-radius: var(--height-compact) 0 0 var(--height-compact);
}
.drp__month-section .cal__day--disabled-mid::before {
  left: 0; right: 0;
}
.drp__month-section .cal__day--disabled-end::before {
  left: 0; right: 0;
  border-radius: 0 var(--height-compact) var(--height-compact) 0;
}

/* ── 단축 탭 비활성 ── */
li.drp__shortcut--disabled {
  color: var(--color-text-disabled);
  pointer-events: none;
  cursor: default;
}

/* ── 푸터 ── */
.drp__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-gap-xs);
  padding: var(--space-inset-md) var(--space-inset-xl);
  border-top: var(--stroke-sm) var(--stroke-solid) var(--color-border-subtle);
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
| 키보드 | Enter / Space: 단축 선택. ArrowDown · ArrowRight: 다음 단축. ArrowUp · ArrowLeft: 이전 단축. Escape: 패널 닫기 |

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
> `container.dispatchEvent(new CustomEvent('drp:change', { bubbles: true, detail: { start, end, all } }))`

> ❌ DON'T — `data-component` 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용이다
