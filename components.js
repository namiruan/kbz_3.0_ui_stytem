/*
 * Component Init Functions — Bundled (auto-generated)
 * ─────────────────────────────────────────────────────
 * build.py가 각 컴포넌트 .md 파일의
 * js init 블록을 자동 추출해 생성한다.
 * 직접 수정하지 말고 각 컴포넌트 .md 파일을 편집하라.
 *
 * 사용법 (프로토타입 페이지):
 *   <link rel="stylesheet" href="tokens.css">
 *   <script src="components.js"></script>
 *   <script>
 *     document.querySelectorAll('.dropdown').forEach(function(el) { initDropdown(el.parentElement); });
 *     document.querySelectorAll('.drp').forEach(function(el) { initDRP(el); });
 *   </script>
 */

if (!window.__componentInits) window.__componentInits = {};

/* ── Input ── */
/* 조건 없는 필드 완료 동작 — 초기값 체크 + blur 시 input--complete 토글 */
function initInput(el) {
  /* readonly·disabled는 complete 상태 없음 */
  if (el.value && !el.readOnly && !el.disabled) el.classList.add('input--complete');
  el.addEventListener('blur', function() { el.classList.toggle('input--complete', !!el.value); });
  el.addEventListener('input', function() { if (!el.value) el.classList.remove('input--complete'); });
}
function initInputContainer(container) {
  container.querySelectorAll('.input').forEach(function(el) {
    if (el.dataset.initInput) return;
    el.dataset.initInput = '1';
    initInput(el);
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initInputContainer) window.__componentInits.initInputContainer = initInputContainer;

/* ── Textarea ── */
/* 조건 없는 필드 완료 동작 — blur 시 textarea--complete 토글 */
function initTextarea(el) {
  el.addEventListener('blur', function() { el.classList.toggle('textarea--complete', !!el.value); });
  el.addEventListener('input', function() { if (!el.value) el.classList.remove('textarea--complete'); });
}
function initTextareaContainer(container) {
  container.querySelectorAll('textarea').forEach(function(el) {
    if (el.dataset.initTextarea) return;
    el.dataset.initTextarea = '1';
    initTextarea(el);
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initTextareaContainer) window.__componentInits.initTextareaContainer = initTextareaContainer;

/* ── Tag ── */
function initTag(container) {
  var selected = container.querySelector('#demo-selected');
  var pool = container.querySelector('#demo-pool');
  if (!selected || !pool) return;
  if (pool.dataset.initTag) return;
  pool.dataset.initTag = '1';

  pool.addEventListener('click', function(e) {
    var btn = e.target.closest('button.tag');
    if (!btn) return;
    var label = btn.dataset.label;
    btn.style.display = 'none';

    var removable = document.createElement('span');
    removable.className = 'tag tag--removable';
    removable.dataset.label = label;
    removable.innerHTML = label +
      ' <button class="icon-on--badge icon-on--brand" aria-label="' + label + ' 제거">' +
        '<svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg>' +
      '</button>';
    removable.querySelector('button').addEventListener('click', function() {
      removable.remove();
      btn.style.display = '';
    });
    selected.appendChild(removable);
  });
}
if (window.__componentInits && !window.__componentInits.initTag) window.__componentInits.initTag = initTag;

/* ── Segment ── */
/* Segment — 클릭/방향키 선택 이동, aria-checked 토글, 슬라이더 위치 갱신 */
/* 패널 전환: 아이템에 data-target="panel-id", 패널 div에 data-panel="panel-id" */
function initSegment(container) {
  function updateSlider(group, animate) {
    var slider = group.querySelector('.segment__slider');
    var selected = group.querySelector('.segment__item--selected');
    if (!slider || !selected) return;
    if (!animate) slider.style.transition = 'none';
    slider.style.width = selected.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + selected.offsetLeft + 'px)';
    if (!animate) { slider.offsetWidth; slider.style.transition = ''; }
  }
  /* data-target이 있는 아이템 선택 시 container 안의 data-panel 전환 */
  function switchPanel(target) {
    if (!target) return;
    container.querySelectorAll('[data-panel]').forEach(function(p) {
      p.style.display = p.getAttribute('data-panel') === target ? '' : 'none';
    });
  }
  container.querySelectorAll('.segment').forEach(function(group) {
    if (group.dataset.initSegment) return;
    group.dataset.initSegment = '1';
    updateSlider(group, false);
    var items = Array.from(group.querySelectorAll('.segment__item'));
    items.forEach(function(item, idx) {
      item.addEventListener('click', function() {
        if (item.getAttribute('aria-checked') === 'true') return;
        items.forEach(function(i) {
          i.classList.remove('segment__item--selected');
          i.setAttribute('aria-checked', 'false');
        });
        item.classList.add('segment__item--selected');
        item.setAttribute('aria-checked', 'true');
        item.focus();
        updateSlider(group, true);
        switchPanel(item.getAttribute('data-target'));
      });
      item.addEventListener('keydown', function(e) {
        var next = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % items.length;
        if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   next = (idx - 1 + items.length) % items.length;
        if (next < 0) return;
        e.preventDefault();
        items.forEach(function(i) {
          i.classList.remove('segment__item--selected');
          i.setAttribute('aria-checked', 'false');
        });
        items[next].classList.add('segment__item--selected');
        items[next].setAttribute('aria-checked', 'true');
        items[next].focus();
        updateSlider(group, true);
        switchPanel(items[next].getAttribute('data-target'));
      });
    });
  });
}
if (window.__componentInits && !window.__componentInits.initSegment) window.__componentInits.initSegment = initSegment;

/* ── Tooltip ── */
function initTooltip(container) {
  container.querySelectorAll('.tooltip-wrapper').forEach(function(wrapper) {
    var panel = wrapper.querySelector('.tooltip-panel');
    if (!panel || !panel.classList.contains('tooltip-panel--pinned')) return;
    if (wrapper.dataset.initTooltip) return;
    wrapper.dataset.initTooltip = '1';

    var trigger = wrapper.querySelector('.tooltip-trigger');
    var dismiss = panel.querySelector('.tooltip-dismiss');
    if (!dismiss) return;

    dismiss.addEventListener('click', function() {
      var text = panel.querySelector('.tooltip-panel-text').textContent;
      /* left edge를 px로 고정 → translateX(-50%) 기준점이 width 변화에 흔들리지 않도록 */
      var panelRect = panel.getBoundingClientRect();
      var wrapperRect = wrapper.getBoundingClientRect();
      panel.style.left = (panelRect.left - wrapperRect.left) + 'px';
      panel.style.transform = 'none';
      /* button DOM 제거 + text-only로 reflow */
      panel.textContent = text;
      /* Range API로 가장 넓은 wrapped line 측정 → panel을 그 너비로 shrink.
         long text의 max-content는 300 px를 초과해 항상 cap에 걸리므로,
         textContent 교체만으로는 panel 너비가 변하지 않아 우측에 빈 영역이 남음.
         각 line의 ClientRect 너비 중 최대값 + padding으로 panel 폭을 정확히 맞춤 */
      panel.offsetWidth; /* force layout */
      var range = document.createRange();
      range.selectNodeContents(panel);
      var rects = range.getClientRects();
      var maxLineWidth = 0;
      for (var i = 0; i < rects.length; i++) {
        if (rects[i].width > maxLineWidth) maxLineWidth = rects[i].width;
      }
      var cs = getComputedStyle(panel);
      var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      panel.style.width = Math.ceil(maxLineWidth + paddingX) + 'px';
      panel.classList.remove('tooltip-panel--pinned', 'tooltip-panel--visible');
      setTimeout(function() {
        panel.style.left = '';
        panel.style.transform = '';
        /* width는 유지 — text-only panel이 widest-line 크기로 노출 */
      }, 150);
      wrapper.addEventListener('mouseenter', function() { panel.classList.add('tooltip-panel--visible'); });
      wrapper.addEventListener('mouseleave', function() { panel.classList.remove('tooltip-panel--visible'); });
      trigger.addEventListener('focus', function() { panel.classList.add('tooltip-panel--visible'); });
      trigger.addEventListener('blur', function() { panel.classList.remove('tooltip-panel--visible'); });
    });
  });
}
if (window.__componentInits && !window.__componentInits.initTooltip) window.__componentInits.initTooltip = initTooltip;

/* ── Disclosure ── */
function initDisclosure(container) {
  container.querySelectorAll('.disclosure').forEach(function(disc) {
    if (disc.dataset.initDisclosure) return;
    disc.dataset.initDisclosure = '1';
    var trigger = disc.querySelector('.disclosure__trigger');
    var label = trigger.querySelector('.disclosure__label');
    var expandLabel   = disc.dataset.labelExpand   || '더 보기';
    var collapseLabel = disc.dataset.labelCollapse || '접기';
    function toggle() {
      var expanded = disc.classList.toggle('disclosure--expanded');
      trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      label.textContent = expanded ? collapseLabel : expandLabel;
      // icon-only: 텍스트 레이블이 숨겨지므로 aria-label로 상태 전달
      if (disc.classList.contains('disclosure--icon-only')) {
        trigger.setAttribute('aria-label', expanded ? collapseLabel : expandLabel);
      }
    }
    trigger.addEventListener('click', toggle);
    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggle();
      }
    });
  });
}
if (window.__componentInits && !window.__componentInits.initDisclosure) window.__componentInits.initDisclosure = initDisclosure;

/* ── Calendar ── */
function initCalendar(container) {
  /* 동작 프리뷰 전용: #cal-live + #cal-mode-seg 가 있을 때만 실행 */
  var calLive = container.querySelector('#cal-live');
  var seg = container.querySelector('#cal-mode-seg');
  if (!calLive || !seg) return;
  if (calLive.dataset.initCalendar) return;
  calLive.dataset.initCalendar = '1';

  var today = new Date(); today.setHours(0,0,0,0);
  var viewYear = today.getFullYear();
  var viewMonth = today.getMonth();
  var mode       = 'single';
  var selected   = null;
  var rangeStart = null;
  var rangeEnd   = null;
  var hoverDate  = null;
  var MARKED_DAYS = [3, 8, 14, 20, 25];

  function isSame(a, b) {
    return a && b && a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  function isBetween(d, s, e) {
    if (!s || !e) return false;
    var lo = s < e ? s : e, hi = s < e ? e : s;
    return d > lo && d < hi;
  }
  function fromKey(k) { var p = k.split(','); return new Date(+p[0], +p[1], +p[2]); }

  var weeksEl = container.querySelector('#cal-weeks-live');

  function render() {
    weeksEl.innerHTML = '';

    var firstOfMonth = new Date(viewYear, viewMonth, 1);
    var lastOfMonth  = new Date(viewYear, viewMonth + 1, 0);
    var cursor = new Date(firstOfMonth);
    cursor.setDate(cursor.getDate() - cursor.getDay());

    while (cursor <= lastOfMonth || cursor.getDay() !== 0) {
      var weekEl = document.createElement('div');
      weekEl.className = 'cal__week';
      weekEl.setAttribute('role', 'row');

      for (var i = 0; i < 7; i++) {
        var d        = new Date(cursor);
        var outside  = d.getMonth() !== viewMonth;
        var disabled = !outside && d < today;
        var inactive = outside || disabled;
        var isToday  = isSame(d, today);
        var marked   = !inactive && MARKED_DAYS.indexOf(d.getDate()) !== -1;
        var isSel    = mode === 'single' && isSame(d, selected);
        var isStart  = mode === 'range'  && isSame(d, rangeStart);
        var isEnd    = mode === 'range'  && isSame(d, rangeEnd);
        var inRange  = mode === 'range'  && isBetween(d, rangeStart, rangeEnd);
        var isPreview  = mode === 'range' && !rangeEnd && rangeStart && hoverDate && isBetween(d, rangeStart, hoverDate);
        var isHoverEnd = mode === 'range' && !rangeEnd && rangeStart && hoverDate && !isStart && isSame(d, hoverDate);

        var btn = document.createElement('button');
        btn.setAttribute('role', 'gridcell');
        btn.dataset.date = d.getFullYear() + ',' + d.getMonth() + ',' + d.getDate();
        if (inactive) btn.dataset.inactive = 'true';

        var effectiveEnd = rangeEnd || hoverDate;
        var goLeft = effectiveEnd && effectiveEnd < rangeStart;

        var cls = ['cal__day'];
        if (inactive)            cls.push('cal__day--' + (outside ? 'outside' : 'disabled'));
        if (isToday && !outside) cls.push('cal__day--today');
        if (isSel)               cls.push('cal__day--selected');
        if (isStart) {
          if (!effectiveEnd)     cls.push('cal__day--range-solo');
          else if (rangeEnd)     cls.push(goLeft ? 'cal__day--range-start-left' : 'cal__day--range-start');
          else                   cls.push(goLeft ? 'cal__day--range-start-left-pre' : 'cal__day--range-start-pre');
        }
        if (isEnd)               cls.push('cal__day--range-end');
        if (inRange)             cls.push('cal__day--in-range');
        if (isPreview)           cls.push('cal__day--in-range-preview');
        if (isHoverEnd)          cls.push(goLeft ? 'cal__day--hover-end-left' : 'cal__day--hover-end');
        if (marked)              cls.push('cal__day--marked');
        btn.className = cls.join(' ');

        btn.setAttribute('tabindex', (!inactive && (isToday || isSel || isStart)) ? '0' : '-1');
        if (isToday && !outside) btn.setAttribute('aria-current', 'date');
        if (isSel || isStart || isEnd || inRange) btn.setAttribute('aria-selected', 'true');
        if (disabled) btn.setAttribute('aria-disabled', 'true');
        btn.textContent = d.getDate();

        weekEl.appendChild(btn);
        cursor.setDate(cursor.getDate() + 1);
      }
      weeksEl.appendChild(weekEl);
      if (cursor > lastOfMonth && cursor.getDay() === 0) break;
    }
    markDisabledRuns();
  }

  weeksEl.addEventListener('click', function(e) {
    var btn = e.target.closest ? e.target.closest('.cal__day') : e.target;
    if (!btn || btn.dataset.inactive) return;
    var date = fromKey(btn.dataset.date);
    if (mode === 'single') {
      selected = isSame(date, selected) ? null : date;
    } else {
      if (!rangeStart || rangeEnd) {
        rangeStart = date; rangeEnd = null; hoverDate = null;
      } else if (isSame(rangeStart, date)) {
        rangeStart = null; hoverDate = null;
      } else {
        rangeEnd = date;
        if (rangeEnd < rangeStart) { var t = rangeStart; rangeStart = rangeEnd; rangeEnd = t; }
        hoverDate = null;
      }
    }
    render();
  });

  weeksEl.addEventListener('mouseover', function(e) {
    if (mode !== 'range') return;
    var btn = e.target.closest ? e.target.closest('.cal__day') : e.target;
    if (!btn || btn.dataset.inactive || !rangeStart || rangeEnd) return;
    var d = fromKey(btn.dataset.date);
    if (!isSame(d, hoverDate)) { hoverDate = d; render(); }
  });

  /* Segment 토글 */
  var segSlider = seg.querySelector('.segment__slider');
  function updateSegSlider() {
    var sel = seg.querySelector('.segment__item--selected');
    segSlider.style.width = sel.offsetWidth + 'px';
    segSlider.style.transform = 'translateX(' + sel.offsetLeft + 'px)';
  }
  segSlider.style.transition = 'none';
  updateSegSlider();
  seg.offsetWidth;
  segSlider.style.transition = '';
  seg.addEventListener('click', function(e) {
    var item = e.target.closest ? e.target.closest('.segment__item') : e.target;
    if (!item) return;
    seg.querySelectorAll('.segment__item').forEach(function(b) {
      b.classList.remove('segment__item--selected');
      b.setAttribute('aria-checked', 'false');
    });
    item.classList.add('segment__item--selected');
    item.setAttribute('aria-checked', 'true');
    updateSegSlider();
    mode = item.dataset.mode;
    selected = null; rangeStart = null; rangeEnd = null; hoverDate = null;
    render();
  });

  render();

  /* 연속 disabled 구간 감지 → disabled-start/mid/end 클래스 부여 */
  function markDisabledRuns() {
    var allBtns = Array.prototype.slice.call(weeksEl.querySelectorAll('.cal__day'));
    var run = [];
    function flush() {
      if (run.length === 1) {
        run[0].classList.add('cal__day--disabled-solo');
      } else if (run.length >= 2) {
        run[0].classList.add('cal__day--disabled-start');
        for (var i = 1; i < run.length - 1; i++) run[i].classList.add('cal__day--disabled-mid');
        run[run.length - 1].classList.add('cal__day--disabled-end');
      }
      run = [];
    }
    allBtns.forEach(function(b) {
      if (b.classList.contains('cal__day--disabled')) { run.push(b); }
      else { flush(); }
    });
    flush();
  }
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initCalendar) window.__componentInits.initCalendar = initCalendar;

/* ── DatePicker ── */
/* DatePicker 완전 초기화 — single/range 자동 감지, 패널 생성, 달력 렌더링, 날짜 선택 */
function initDP(dp) {
  var isRange = dp.classList.contains('dp--range');
  var today = new Date(); today.setHours(0,0,0,0);
  var trigger = dp.querySelector('.dp__trigger');
  var parts = dp.querySelectorAll('.dp__value-part');
  var dpField = dp.closest ? dp.closest('.form-field') : null;
  var errorInner = dp.querySelector('.form-field__error');
  function pad(n){return n<10?'0'+n:''+n;}
  function isSame(a,b){return a&&b&&a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}
  function fromKey(k){var p=k.split(',');return new Date(+p[0],+p[1],+p[2]);}
  function setInnerError(msg){dp.classList.add('dp--error');if(errorInner)errorInner.textContent=msg;}
  function clearInnerError(){dp.classList.remove('dp--error');if(errorInner)errorInner.textContent='';}
  function setFieldError(show){
    if(dpField){dpField.classList.toggle('form-field--error',show);var outerErr=dpField.querySelector(':scope > .form-field__footer .form-field__error');if(outerErr)outerErr.textContent=show?outerErr.textContent||'입력해 주세요.':'';}
    if(show){trigger.setAttribute('aria-invalid','true');}else{trigger.removeAttribute('aria-invalid');}
  }

  if(isRange){
    var sYrEl=parts[0],sMoEl=parts[1],sDyEl=parts[2],eYrEl=parts[3],eMoEl=parts[4],eDyEl=parts[5];
    var rangeStart=null,rangeEnd=null,hoverDate=null;
    var baseYear=today.getFullYear(),baseMonth=today.getMonth();
    function isValidDate(y,m,d){if(isNaN(y)||isNaN(m)||isNaN(d))return false;var dt=new Date(y,m-1,d);return!isNaN(dt.getTime())&&dt.getMonth()===m-1&&dt.getDate()===d;}
    function isBetween(d,s,e){if(!s||!e)return false;var lo=s<e?s:e,hi=s<e?e:s;return d>lo&&d<hi;}
    /* panel */
    var panel=document.createElement('div');
    panel.className='dp__panel dp__panel--scroll';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','기간 선택');panel.setAttribute('aria-multiselectable','true');panel.setAttribute('hidden','');
    panel.style.position='absolute';panel.style.zIndex='1000';
    panel.innerHTML='<div class="dp__sticky-header"><div class="dp__header">'
      +'<button class="dp__nav-btn" type="button" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>'
      +'<div class="dp__select-group" aria-live="polite" aria-atomic="true"><input class="dp__select-input" type="number" min="1990" max="'+(today.getFullYear()+10)+'" aria-label="연도"><span class="dp__select-label">년</span><input class="dp__select-input dp__select-input--month" type="number" min="1" max="12" aria-label="월"><span class="dp__select-label">월</span><button class="btn btn--secondary btn--solid btn--sm" type="button">오늘</button></div>'
      +'<button class="dp__nav-btn" type="button" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>'
      +'</div><div class="dp__weekday-bar"><span class="cal__weekday" role="columnheader">일</span><span class="cal__weekday" role="columnheader">월</span><span class="cal__weekday" role="columnheader">화</span><span class="cal__weekday" role="columnheader">수</span><span class="cal__weekday" role="columnheader">목</span><span class="cal__weekday" role="columnheader">금</span><span class="cal__weekday" role="columnheader">토</span></div></div>'
      +'<div class="dp__scroll-inner"><div class="dp__scroll-body"></div></div>';
    document.body.appendChild(panel);
    var scrollInner=panel.querySelector('.dp__scroll-inner'),scrollBody=panel.querySelector('.dp__scroll-body');
    var yearInput=panel.querySelector('.dp__select-input:not(.dp__select-input--month)'),monthInput=panel.querySelector('.dp__select-input--month');
    var navBtns=panel.querySelectorAll('.dp__nav-btn'),todayBtn=panel.querySelector('.btn');
    function makeBtn(d,mm){
      var outside=d.getMonth()!==mm,awaitingEnd=rangeStart&&!rangeEnd;
      var disabled=!outside&&awaitingEnd&&!isSame(d,rangeStart)&&d<rangeStart,inactive=outside||disabled;
      var isStart=isSame(d,rangeStart),isEnd=isSame(d,rangeEnd),inRange=isBetween(d,rangeStart,rangeEnd);
      var effectiveEnd=rangeEnd||hoverDate,goLeft=effectiveEnd&&effectiveEnd<rangeStart;
      var isPreview=!rangeEnd&&rangeStart&&hoverDate&&isBetween(d,rangeStart,hoverDate);
      var isHoverEnd=!rangeEnd&&rangeStart&&hoverDate&&!isStart&&isSame(d,hoverDate);
      var btn=document.createElement('button');btn.setAttribute('role','gridcell');btn.setAttribute('type','button');
      btn.dataset.date=d.getFullYear()+','+d.getMonth()+','+d.getDate();
      if(inactive)btn.dataset.inactive='true';
      var cls=['cal__day'];
      if(outside)cls.push('cal__day--outside');if(disabled)cls.push('cal__day--disabled');
      if(!outside&&isSame(d,today)){cls.push('cal__day--today');btn.setAttribute('aria-current','date');}
      if(isStart){if(!effectiveEnd)cls.push('cal__day--range-solo');else if(rangeEnd)cls.push(goLeft?'cal__day--range-start-left':'cal__day--range-start');else cls.push(goLeft?'cal__day--range-start-left-pre':'cal__day--range-start-pre');}
      if(isEnd)cls.push('cal__day--range-end');if(inRange)cls.push('cal__day--in-range');if(isPreview)cls.push('cal__day--in-range-preview');if(isHoverEnd)cls.push(goLeft?'cal__day--hover-end-left':'cal__day--hover-end');
      if(isStart||isEnd||inRange)btn.setAttribute('aria-selected','true');
      btn.className=cls.join(' ');btn.setAttribute('tabindex',(isStart||isEnd)&&!inactive?'0':'-1');btn.textContent=d.getDate();return btn;
    }
    function renderSection(my,mm){
      var section=document.createElement('div');section.className='dp__month-section';section.dataset.year=my;section.dataset.month=mm;
      var hdr=document.createElement('div');hdr.className='dp__month-divider';hdr.textContent=my+'년 '+(mm+1)+'월';section.appendChild(hdr);
      var calDiv=document.createElement('div');calDiv.className='cal';
      var gridDiv=document.createElement('div');gridDiv.className='cal__grid';gridDiv.setAttribute('role','grid');gridDiv.setAttribute('aria-label',my+'년 '+(mm+1)+'월');gridDiv.setAttribute('aria-multiselectable','true');
      var weeksDiv=document.createElement('div');
      var first=new Date(my,mm,1),last=new Date(my,mm+1,0),cur=new Date(first);cur.setDate(cur.getDate()-cur.getDay());
      while(cur<=last||cur.getDay()!==0){var row=document.createElement('div');row.className='cal__week';row.setAttribute('role','row');for(var i=0;i<7;i++){row.appendChild(makeBtn(new Date(cur),mm));cur.setDate(cur.getDate()+1);}weeksDiv.appendChild(row);if(cur>last&&cur.getDay()===0)break;}
      gridDiv.appendChild(weeksDiv);calDiv.appendChild(gridDiv);section.appendChild(calDiv);return section;
    }
    function updateClasses(){
      var btns=Array.prototype.slice.call(scrollBody.querySelectorAll('.cal__day')),awaitingEnd=rangeStart&&!rangeEnd;
      var rangeCls=['cal__day--range-solo','cal__day--range-start','cal__day--range-start-left','cal__day--range-start-pre','cal__day--range-start-left-pre','cal__day--range-end','cal__day--in-range','cal__day--in-range-preview','cal__day--hover-end','cal__day--hover-end-left'];
      btns.forEach(function(btn){
        rangeCls.forEach(function(c){btn.classList.remove(c);});btn.removeAttribute('aria-selected');
        var d=fromKey(btn.dataset.date),outside=btn.classList.contains('cal__day--outside');
        var beforeStart=!outside&&awaitingEnd&&!isSame(d,rangeStart)&&d<rangeStart;
        btn.classList.toggle('cal__day--disabled',!outside&&!!beforeStart);
        if(!outside){if(beforeStart)btn.dataset.inactive='true';else delete btn.dataset.inactive;}
        if(btn.dataset.inactive)return;
        var isStart=isSame(d,rangeStart),isEnd=isSame(d,rangeEnd),inRange=isBetween(d,rangeStart,rangeEnd);
        var effectiveEnd=rangeEnd||hoverDate,goLeft=effectiveEnd&&effectiveEnd<rangeStart;
        var isPreview=!rangeEnd&&rangeStart&&hoverDate&&isBetween(d,rangeStart,hoverDate);
        var isHoverEnd=!rangeEnd&&rangeStart&&hoverDate&&!isStart&&isSame(d,hoverDate);
        if(isStart){if(!effectiveEnd)btn.classList.add('cal__day--range-solo');else if(rangeEnd)btn.classList.add(goLeft?'cal__day--range-start-left':'cal__day--range-start');else btn.classList.add(goLeft?'cal__day--range-start-left-pre':'cal__day--range-start-pre');}
        if(isEnd)btn.classList.add('cal__day--range-end');if(inRange)btn.classList.add('cal__day--in-range');if(isPreview)btn.classList.add('cal__day--in-range-preview');if(isHoverEnd)btn.classList.add(goLeft?'cal__day--hover-end-left':'cal__day--hover-end');
        if(isStart||isEnd||inRange)btn.setAttribute('aria-selected','true');
      });
    }
    function updateValue(){
      if(rangeStart){sYrEl.value=String(rangeStart.getFullYear());sMoEl.value=pad(rangeStart.getMonth()+1);sDyEl.value=pad(rangeStart.getDate());}else{sYrEl.value=sMoEl.value=sDyEl.value='';}
      if(rangeEnd){eYrEl.value=String(rangeEnd.getFullYear());eMoEl.value=pad(rangeEnd.getMonth()+1);eDyEl.value=pad(rangeEnd.getDate());dp.classList.add('dp--has-value');}else{eYrEl.value=eMoEl.value=eDyEl.value='';dp.classList.remove('dp--has-value');}
    }
    function updateActive(){
      var sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section')),active=sections[0];
      sections.forEach(function(s){if(s.offsetTop-scrollInner.offsetTop<=scrollInner.scrollTop+40)active=s;});
      sections.forEach(function(s){s.classList.toggle('dp__month-section--active',s===active);});
      if(active){yearInput.value=active.dataset.year;monthInput.value=+active.dataset.month+1;}
    }
    function jumpTo(y,m){
      scrollBody.innerHTML='';
      for(var i=-3;i<13;i++){var mm=m+i,my=y;while(mm<0){mm+=12;my--;}while(mm>11){mm-=12;my++;}scrollBody.appendChild(renderSection(my,mm));}
      requestAnimationFrame(function(){var secs=scrollBody.querySelectorAll('.dp__month-section');scrollInner.scrollTop=secs[3]?secs[3].offsetTop-scrollInner.offsetTop:0;updateActive();});
    }
    function firstSection(){return scrollBody.querySelector('.dp__month-section');}
    function lastSection(){var all=scrollBody.querySelectorAll('.dp__month-section');return all[all.length-1];}
    function prependMonth(){var f=firstSection(),y=+f.dataset.year,m=+f.dataset.month-1;if(m<0){m=11;y--;}var prevH=scrollBody.offsetHeight;scrollBody.insertBefore(renderSection(y,m),f);scrollInner.scrollTop+=scrollBody.offsetHeight-prevH;}
    function appendMonth(){var l=lastSection(),y=+l.dataset.year,m=+l.dataset.month+1;if(m>11){m=0;y++;}scrollBody.appendChild(renderSection(y,m));}
    function positionPanel(){var r=trigger.getBoundingClientRect(),panelH=panel.offsetHeight,spaceBelow=window.innerHeight-r.bottom;if(panelH>spaceBelow&&r.top>panelH)panel.style.top=(r.top+(window.pageYOffset||0)-panelH-4)+'px';else panel.style.top=(r.bottom+(window.pageYOffset||0)+4)+'px';panel.style.left=(r.left+(window.pageXOffset||0))+'px';}
    function applyRangeParts(writeBack){
      var sy=parseInt(sYrEl.value,10),sm=parseInt(sMoEl.value,10),sd=parseInt(sDyEl.value,10);
      var ey=parseInt(eYrEl.value,10),em=parseInt(eMoEl.value,10),ed=parseInt(eDyEl.value,10);
      var hasStart=sYrEl.value||sMoEl.value||sDyEl.value,hasEnd=eYrEl.value||eMoEl.value||eDyEl.value;
      clearInnerError();
      if(hasStart){if(!isValidDate(sy,sm,sd)){if(writeBack)setInnerError('시작 날짜가 유효하지 않습니다.');rangeStart=null;updateClasses();return false;}rangeStart=new Date(sy,sm-1,sd);}else rangeStart=null;
      if(hasEnd){if(!isValidDate(ey,em,ed)){if(writeBack)setInnerError('종료 날짜가 유효하지 않습니다.');rangeEnd=null;updateClasses();return false;}rangeEnd=new Date(ey,em-1,ed);}else rangeEnd=null;
      if(rangeStart&&rangeEnd&&rangeEnd<rangeStart){var t=rangeStart;rangeStart=rangeEnd;rangeEnd=t;}
      if(writeBack)updateValue();updateClasses();return !!(rangeStart&&rangeEnd);
    }
    function pickDate(date){
      if(!rangeStart||rangeEnd){rangeStart=date;rangeEnd=null;hoverDate=null;}
      else if(isSame(rangeStart,date)){rangeStart=null;hoverDate=null;}
      else{rangeEnd=date;if(rangeEnd<rangeStart){var t=rangeStart;rangeStart=rangeEnd;rangeEnd=t;}hoverDate=null;updateValue();updateClasses();setFieldError(false);close();return;}
      updateValue();updateClasses();
    }
    function scrollToSection(offset){
      var sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section')),activeIdx=0;
      sections.forEach(function(s,i){if(s.classList.contains('dp__month-section--active'))activeIdx=i;});
      if(offset===-1&&activeIdx===0){prependMonth();sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section'));activeIdx=1;}
      if(offset===1&&activeIdx===sections.length-1){appendMonth();sections=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section'));}
      var target=sections[activeIdx+offset];if(target)scrollInner.scrollTop=target.offsetTop-scrollInner.offsetTop;
    }
    function open(){
      applyRangeParts();var ay=rangeStart?rangeStart.getFullYear():baseYear,am=rangeStart?rangeStart.getMonth():baseMonth;
      if(!scrollBody.children.length){for(var i=-3;i<13;i++){var mm=am+i,my=ay;while(mm<0){mm+=12;my--;}while(mm>11){mm-=12;my++;}scrollBody.appendChild(renderSection(my,mm));}}
      panel.removeAttribute('hidden');dp.classList.add('dp--open');positionPanel();
      requestAnimationFrame(function(){var secs=Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section')),cur=null;secs.forEach(function(s){if(+s.dataset.year===ay&&+s.dataset.month===am)cur=s;});if(cur)scrollInner.scrollTop=cur.offsetTop-scrollInner.offsetTop;else jumpTo(ay,am);updateActive();});
    }
    function close(){panel.setAttribute('hidden','');dp.classList.remove('dp--open');hoverDate=null;setFieldError(!dp.classList.contains('dp--has-value'));}
    function isOpen(){return!panel.hasAttribute('hidden');}
    trigger.addEventListener('click',function(){if(!isOpen())open();});
    trigger.querySelector('.dp__chevron').addEventListener('click',function(e){e.stopPropagation();isOpen()?close():open();});
    function makeAdv(el,maxLen,nextEl){el.addEventListener('input',function(){el.value=el.value.replace(/\D/g,'').slice(0,maxLen);if(nextEl&&el.value.length===maxLen)nextEl.focus();});}
    makeAdv(sYrEl,4,sMoEl);makeAdv(sMoEl,2,sDyEl);makeAdv(sDyEl,2,eYrEl);makeAdv(eYrEl,4,eMoEl);makeAdv(eMoEl,2,eDyEl);makeAdv(eDyEl,2,null);
    [sYrEl,sMoEl,sDyEl,eYrEl,eMoEl,eDyEl].forEach(function(el){
      el.addEventListener('input',function(){clearInnerError();if(isOpen()){applyRangeParts();var y=parseInt(sYrEl.value,10),m=parseInt(sMoEl.value,10);if(sYrEl.value.length===4&&!isNaN(y)&&sMoEl.value.length>=1&&!isNaN(m)&&m>=1&&m<=12)jumpTo(y,m-1);}});
      el.addEventListener('blur',function(){setTimeout(function(){if(dp.contains(document.activeElement)||panel.contains(document.activeElement))return;applyRangeParts(true);if(isOpen())close();},0);});
      el.addEventListener('keydown',function(e){if(e.key==='Escape'){close();el.blur();}if(e.key==='Enter'){e.preventDefault();el.blur();}});
    });
    scrollBody.addEventListener('click',function(e){var btn=e.target.closest?e.target.closest('.cal__day'):e.target;if(!btn||btn.dataset.inactive)return;e.stopPropagation();pickDate(fromKey(btn.dataset.date));});
    scrollBody.addEventListener('mouseover',function(e){var btn=e.target.closest?e.target.closest('.cal__day'):e.target;if(!btn||btn.dataset.inactive||!rangeStart||rangeEnd)return;var d=fromKey(btn.dataset.date);if(!isSame(d,hoverDate)){hoverDate=d;updateClasses();}});
    scrollInner.addEventListener('scroll',function(){updateActive();if(scrollInner.scrollTop<120)prependMonth();if(scrollInner.scrollTop+scrollInner.clientHeight>scrollInner.scrollHeight-120)appendMonth();});
    navBtns[0].addEventListener('click',function(e){e.stopPropagation();scrollToSection(-1);});
    navBtns[1].addEventListener('click',function(e){e.stopPropagation();scrollToSection(1);});
    todayBtn.addEventListener('click',function(e){e.stopPropagation();jumpTo(today.getFullYear(),today.getMonth());});
    yearInput.addEventListener('click',function(e){e.stopPropagation();});monthInput.addEventListener('click',function(e){e.stopPropagation();});
    yearInput.addEventListener('blur',function(){var y=parseInt(yearInput.value,10);var active=scrollBody.querySelector('.dp__month-section--active');var curM=active?+active.dataset.month:baseMonth;if(!isNaN(y)&&y>=1990&&y<=today.getFullYear()+10)jumpTo(y,curM);else yearInput.value=active?active.dataset.year:baseYear;});
    monthInput.addEventListener('blur',function(){var m=parseInt(monthInput.value,10);var active=scrollBody.querySelector('.dp__month-section--active');var curY=active?+active.dataset.year:baseYear;if(!isNaN(m)&&m>=1&&m<=12)jumpTo(curY,m-1);else monthInput.value=active?+active.dataset.month+1:baseMonth+1;});
    document.addEventListener('click',function(e){if(!dp.contains(e.target)&&!panel.contains(e.target)){if(isOpen())close();}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(isOpen())close();}});

  } else {
    /* single */
    var yrEl=parts[0],moEl=parts[1],dyEl=parts[2];
    var vy=today.getFullYear(),vm=today.getMonth(),selected=null;
    var panel=document.createElement('div');
    panel.className='dp__panel';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','날짜 선택');panel.setAttribute('hidden','');
    panel.style.position='absolute';panel.style.zIndex='1000';
    panel.innerHTML='<div class="dp__header">'
      +'<button class="dp__nav-btn" type="button" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>'
      +'<div class="dp__select-group" aria-live="polite" aria-atomic="true"><input class="dp__select-input" type="number" min="1990" max="'+(today.getFullYear()+10)+'" aria-label="연도"><span class="dp__select-label">년</span><input class="dp__select-input dp__select-input--month" type="number" min="1" max="12" aria-label="월"><span class="dp__select-label">월</span><button class="btn btn--secondary btn--solid btn--sm" type="button">오늘</button></div>'
      +'<button class="dp__nav-btn" type="button" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>'
      +'</div>'
      +'<div class="dp__weekday-bar"><span class="cal__weekday" role="columnheader">일</span><span class="cal__weekday" role="columnheader">월</span><span class="cal__weekday" role="columnheader">화</span><span class="cal__weekday" role="columnheader">수</span><span class="cal__weekday" role="columnheader">목</span><span class="cal__weekday" role="columnheader">금</span><span class="cal__weekday" role="columnheader">토</span></div>'
      +'<div class="cal"><div class="cal__grid" role="grid"><div class="dp-weeks"></div></div></div>';
    document.body.appendChild(panel);
    var weeksEl=panel.querySelector('.dp-weeks'),gridEl=panel.querySelector('.cal__grid');
    var yearInput=panel.querySelector('.dp__select-input:not(.dp__select-input--month)'),monthInput=panel.querySelector('.dp__select-input--month');
    var navBtns=panel.querySelectorAll('.dp__nav-btn'),todayBtn=panel.querySelector('.btn');
    function positionPanel(){var r=trigger.getBoundingClientRect(),panelH=panel.offsetHeight,spaceBelow=window.innerHeight-r.bottom;if(panelH>spaceBelow&&r.top>panelH)panel.style.top=(r.top+(window.pageYOffset||0)-panelH-4)+'px';else panel.style.top=(r.bottom+(window.pageYOffset||0)+4)+'px';panel.style.left=(r.left+(window.pageXOffset||0))+'px';}
    function render(){
      weeksEl.innerHTML='';yearInput.value=vy;monthInput.value=vm+1;gridEl.setAttribute('aria-label',vy+'년 '+(vm+1)+'월');
      var first=new Date(vy,vm,1),last=new Date(vy,vm+1,0),cur=new Date(first);cur.setDate(cur.getDate()-cur.getDay());
      while(cur<=last||cur.getDay()!==0){
        var row=document.createElement('div');row.className='cal__week';row.setAttribute('role','row');
        for(var i=0;i<7;i++){
          var d=new Date(cur),outside=d.getMonth()!==vm;
          var btn=document.createElement('button');btn.setAttribute('role','gridcell');btn.setAttribute('type','button');
          btn.dataset.date=d.getFullYear()+','+d.getMonth()+','+d.getDate();
          if(outside)btn.dataset.inactive='true';
          var cls=['cal__day'];
          if(outside)cls.push('cal__day--outside');
          if(!outside&&isSame(d,today)){cls.push('cal__day--today');btn.setAttribute('aria-current','date');}
          if(isSame(d,selected)){cls.push('cal__day--selected');btn.setAttribute('aria-selected','true');}
          btn.className=cls.join(' ');btn.setAttribute('tabindex',(isSame(d,selected)||(!selected&&isSame(d,today)))&&!outside?'0':'-1');btn.textContent=d.getDate();
          row.appendChild(btn);cur.setDate(cur.getDate()+1);
        }
        weeksEl.appendChild(row);if(cur>last&&cur.getDay()===0)break;
      }
    }
    function open(){if(dp.classList.contains('dp--has-value')){var y=parseInt(yrEl.value,10),m=parseInt(moEl.value,10),d=parseInt(dyEl.value,10);if(!isNaN(y)&&!isNaN(m)&&!isNaN(d)){vy=y;vm=m-1;}}panel.removeAttribute('hidden');dp.classList.add('dp--open');render();positionPanel();}
    function close(){panel.setAttribute('hidden','');dp.classList.remove('dp--open');setFieldError(!dp.classList.contains('dp--has-value'));}
    function isOpen(){return!panel.hasAttribute('hidden');}
    function setPartsFromDate(d){yrEl.value=String(d.getFullYear());moEl.value=pad(d.getMonth()+1);dyEl.value=pad(d.getDate());dp.classList.add('dp--has-value');clearInnerError();}
    function applyPartsToDate(writeBack){
      var y=parseInt(yrEl.value,10),m=parseInt(moEl.value,10),d=parseInt(dyEl.value,10);
      if(isNaN(y)||isNaN(m)||isNaN(d)){if(writeBack)setInnerError('유효하지 않은 날짜입니다.');return false;}
      var dt=new Date(y,m-1,d);if(isNaN(dt.getTime())||dt.getMonth()!==m-1||dt.getDate()!==d){if(writeBack)setInnerError('유효하지 않은 날짜입니다.');return false;}
      clearInnerError();selected=dt;vy=y;vm=m-1;if(writeBack)setPartsFromDate(dt);else dp.classList.add('dp--has-value');return true;
    }
    function advancePart(el,maxLen,nextEl){el.addEventListener('input',function(){el.value=el.value.replace(/\D/g,'').slice(0,maxLen);if(nextEl&&el.value.length===maxLen)nextEl.focus();});}
    advancePart(yrEl,4,moEl);advancePart(moEl,2,dyEl);advancePart(dyEl,2,null);
    [yrEl,moEl,dyEl].forEach(function(el){
      el.addEventListener('input',function(){clearInnerError();if(isOpen()){var y=parseInt(yrEl.value,10),m=parseInt(moEl.value,10);if(yrEl.value.length===4&&!isNaN(y))vy=y;if(moEl.value.length>=1&&!isNaN(m)&&m>=1&&m<=12)vm=m-1;if(yrEl.value.length===4&&moEl.value.length>=1&&dyEl.value.length>=1)applyPartsToDate();else render();}});
      el.addEventListener('blur',function(){setTimeout(function(){if(dp.contains(document.activeElement)||panel.contains(document.activeElement))return;var has=yrEl.value||moEl.value||dyEl.value;if(has)applyPartsToDate(true);if(isOpen())close();},0);});
      el.addEventListener('keydown',function(e){if(e.key==='Escape'){close();e.target.blur();}if(e.key==='Enter'){e.preventDefault();e.target.blur();}});
    });
    trigger.addEventListener('click',function(){if(!isOpen())open();});
    trigger.querySelector('.dp__chevron').addEventListener('click',function(e){e.stopPropagation();isOpen()?close():open();});
    weeksEl.addEventListener('click',function(e){var btn=e.target.closest?e.target.closest('.cal__day'):e.target;if(!btn||btn.dataset.inactive)return;e.stopPropagation();selected=fromKey(btn.dataset.date);setPartsFromDate(selected);close();});
    navBtns[0].addEventListener('click',function(){vm--;if(vm<0){vm=11;vy--;}render();});
    navBtns[1].addEventListener('click',function(){vm++;if(vm>11){vm=0;vy++;}render();});
    todayBtn.addEventListener('click',function(){vy=today.getFullYear();vm=today.getMonth();render();positionPanel();});
    yearInput.addEventListener('click',function(e){e.stopPropagation();});monthInput.addEventListener('click',function(e){e.stopPropagation();});
    yearInput.addEventListener('blur',function(){var y=parseInt(yearInput.value,10);if(!isNaN(y)&&y>=1990&&y<=today.getFullYear()+10){vy=y;render();}else yearInput.value=vy;});
    monthInput.addEventListener('blur',function(){var m=parseInt(monthInput.value,10);if(!isNaN(m)&&m>=1&&m<=12){vm=m-1;render();}else monthInput.value=vm+1;});
    document.addEventListener('click',function(e){if(!dp.contains(e.target)&&!panel.contains(e.target)){if(isOpen())close();}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(isOpen())close();}});
  }
}
function initDatePicker(container) {
  container.querySelectorAll('.dp').forEach(function(dp) {
    if (dp.dataset.initDatePicker) return;
    dp.dataset.initDatePicker = '1';
    initDP(dp);
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initDatePicker) window.__componentInits.initDatePicker = initDatePicker;

/* ── Pagination ── */
function initPagination(container) {
  var nav = container.querySelector('#pg-demo');
  if (!nav || nav.hasAttribute('data-init-pagination')) return;
  nav.setAttribute('data-init-pagination', '');

  var TOTAL = 12;
  var current = 3;
  var prevBtn = container.querySelector('#pg-prev');
  var nextBtn = container.querySelector('#pg-next');

  /* simple */
  var spPrev = container.querySelector('#sp-prev');
  var spNext = container.querySelector('#sp-next');
  var spText = container.querySelector('#sp-text');
  var spCurrent = 1;

  function renderSimple() {
    spText.textContent = spCurrent + ' / ' + TOTAL;
    spPrev.disabled = spCurrent === 1;
    spNext.disabled = spCurrent === TOTAL;
  }

  spPrev.addEventListener('click', function() { if (spCurrent > 1) { spCurrent--; renderSimple(); } });
  spNext.addEventListener('click', function() { if (spCurrent < TOTAL) { spCurrent++; renderSimple(); } });
  renderSimple();

  function pages(cur, total) {
    var show = new Set([1, total, cur - 1, cur, cur + 1].filter(function(p) { return p >= 1 && p <= total; }));
    var sorted = Array.from(show).sort(function(a, b) { return a - b; });
    var result = [];
    sorted.forEach(function(p, i) {
      if (i > 0 && p - sorted[i - 1] > 1) result.push('…');
      result.push(p);
    });
    return result;
  }

  function render() {
    /* 이전·다음 버튼 사이의 페이지 버튼만 제거 */
    nav.querySelectorAll('.pagination__page, .pagination__ellipsis').forEach(function(el) { el.remove(); });
    pages(current, TOTAL).forEach(function(p) {
      var el;
      if (p === '…') {
        el = document.createElement('span');
        el.className = 'pagination__ellipsis';
        el.setAttribute('aria-hidden', 'true');
        el.textContent = '…';
      } else {
        el = document.createElement('button');
        el.className = 'pagination__page';
        el.type = 'button';
        el.textContent = p;
        if (p === current) {
          el.classList.add('pagination__page--current');
          el.setAttribute('aria-current', 'page');
        } else {
          el.addEventListener('click', function() { current = p; render(); });
        }
      }
      nav.insertBefore(el, nextBtn);
    });
    prevBtn.disabled = current === 1;
    nextBtn.disabled = current === TOTAL;
  }

  prevBtn.addEventListener('click', function() { if (current > 1) { current--; render(); } });
  nextBtn.addEventListener('click', function() { if (current < TOTAL) { current++; render(); } });
  render();
}

if (window.__componentInits && !window.__componentInits.initPagination) window.__componentInits.initPagination = initPagination;

/* ── Dropdown ── */
function initDropdown(container) {
  function openDD(dd) {
    dd.classList.add('dropdown--open');
    dd.querySelector('button.dropdown__trigger').setAttribute('aria-expanded', 'true');
  }
  function closeDD(dd) {
    dd.classList.remove('dropdown--open');
    dd.querySelector('button.dropdown__trigger').setAttribute('aria-expanded', 'false');
  }
  /* 선택된 옵션을 목록 상단으로 정렬 — 열릴 때 호출 */
  function sortOpts(dd) {
    var list = dd.querySelector('.dropdown__list');
    if (!list) return;
    Array.from(list.querySelectorAll('.dropdown__option'))
      .sort(function(a, b) {
        return (a.classList.contains('dropdown__option--selected') ? 0 : 1) -
               (b.classList.contains('dropdown__option--selected') ? 0 : 1);
      }).forEach(function(o) { list.appendChild(o); });
  }

  container.querySelectorAll('.dropdown').forEach(function(dd) {
    if (dd.dataset.initDropdown) return;
    if (!dd.querySelector('.dropdown__panel')) return;
    dd.dataset.initDropdown = '1';

    var trig = dd.querySelector('.dropdown__trigger');
    var val  = dd.querySelector('.dropdown__value');
    var cnt  = dd.querySelector('.dropdown__count');
    var trigIcon = dd.querySelector('.dropdown__trigger-icon');
    var opts = Array.from(dd.querySelectorAll('.dropdown__option'));
    var isMulti = dd.classList.contains('dropdown--multi');

    function syncMultiVal() {
      var sel = opts.filter(function(o) { return o.classList.contains('dropdown__option--selected'); });
      if (!sel.length) {
        val.classList.add('dropdown__value--placeholder');
        if (cnt) cnt.hidden = true;
        return;
      }
      val.classList.remove('dropdown__value--placeholder');
      if (cnt) { cnt.textContent = sel.length; cnt.hidden = false; }
    }

    trig.addEventListener('click', function() {
      if (dd.classList.contains('dropdown--open')) { closeDD(dd); }
      else { sortOpts(dd); openDD(dd); }
    });

    opts.forEach(function(opt) {
      opt.addEventListener('click', function() {
        if (opt.classList.contains('dropdown__option--disabled')) return;
        if (isMulti) {
          var s = opt.classList.toggle('dropdown__option--selected');
          opt.setAttribute('aria-selected', s.toString());
          syncMultiVal();
          return;
        }
        opts.forEach(function(o) { o.classList.remove('dropdown__option--selected'); o.setAttribute('aria-selected', 'false'); });
        opt.classList.add('dropdown__option--selected');
        opt.setAttribute('aria-selected', 'true');
        val.textContent = opt.querySelector('.dropdown__option-label').textContent;
        val.classList.remove('dropdown__value--placeholder');
        var optIcon = opt.querySelector('.dropdown__option-icon');
        if (optIcon && trigIcon) { trigIcon.innerHTML = optIcon.innerHTML; trigIcon.hidden = false; }
        closeDD(dd);
      });
    });

    dd.addEventListener('keydown', function(e) {
      if (!dd.classList.contains('dropdown--open')) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trig.click(); }
        return;
      }
      if (e.key === 'Escape') { e.preventDefault(); closeDD(dd); trig.focus(); }
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var idx = opts.indexOf(document.activeElement);
        idx = e.key === 'ArrowDown' ? Math.min(idx + 1, opts.length - 1) : Math.max(idx - 1, 0);
        if (idx < 0) idx = 0;
        if (opts[idx]) opts[idx].focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        if (document.activeElement.classList.contains('dropdown__option')) { e.preventDefault(); document.activeElement.click(); }
      }
    });

    /* ── 외부 클릭 닫기 ── */
    document.addEventListener('click', function(e) {
      if (!dd.contains(e.target)) closeDD(dd);
    });
  });
}
if (window.__componentInits && !window.__componentInits.initDropdown) window.__componentInits.initDropdown = initDropdown;

/* ── Combobox ── */
function initCombobox(container) {
  /* 선택된 옵션을 목록 상단으로 정렬 */
  function sortOpts(cb) {
    var list = cb.querySelector('.combobox__list');
    if (!list) return;
    Array.from(list.querySelectorAll('.combobox__option'))
      .sort(function(a, b) {
        return (a.classList.contains('combobox__option--selected') ? 0 : 1) -
               (b.classList.contains('combobox__option--selected') ? 0 : 1);
      }).forEach(function(o) { list.appendChild(o); });
  }
  function openCB(cb) {
    cb.classList.add('combobox--open');
    var input = cb.querySelector('.combobox__input');
    if (input) input.setAttribute('aria-expanded', 'true');
  }
  function closeCB(cb) {
    cb.classList.remove('combobox--open');
    var input = cb.querySelector('.combobox__input');
    if (input) input.setAttribute('aria-expanded', 'false');
  }

  /* ── 단일 선택 + 검색 ── */
  var cbS    = container.querySelector('#demo-cb-single');
  if (cbS && !cbS.dataset.initCombobox) {
    cbS.dataset.initCombobox = '1';
    var trigS  = cbS.querySelector('.combobox__trigger');
    var inputS = cbS.querySelector('.combobox__input');
    var clearS = cbS.querySelector('.combobox__clear');
    var optsS  = Array.from(cbS.querySelectorAll('.combobox__option'));
    var emptyS = cbS.querySelector('.combobox__empty');
    var selectedLabelS = null;

    var filterS = function(q) {
      var any = false;
      optsS.forEach(function(o) {
        var show = !q || o.querySelector('.combobox__option-label').textContent.toLowerCase().includes(q);
        o.hidden = !show;
        if (show) any = true;
      });
      emptyS.hidden = any;
    };

    var getTextWidthS = function() {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var cs = getComputedStyle(inputS);
      ctx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
      return ctx.measureText(inputS.value).width;
    };
    var setInputWidthS = function() {
      if (selectedLabelS) {
        inputS.style.width = Math.ceil(getTextWidthS()) + 'px';
        inputS.style.flex = '0 0 auto';
      } else {
        inputS.style.width = ''; inputS.style.flex = '';
      }
    };

    trigS.addEventListener('click', function(e) {
      if (e.target === inputS) return;
      if (!cbS.classList.contains('combobox--open')) {
        sortOpts(cbS); openCB(cbS);
        inputS.value = ''; inputS.style.width = ''; inputS.style.flex = '';
        filterS(''); inputS.focus();
      }
    });
    inputS.addEventListener('focus', function() {
      if (!cbS.classList.contains('combobox--open')) {
        sortOpts(cbS); openCB(cbS);
        inputS.value = ''; inputS.style.width = ''; inputS.style.flex = '';
        filterS('');
      }
    });
    inputS.addEventListener('input', function() {
      if (!cbS.classList.contains('combobox--open')) openCB(cbS);
      inputS.style.width = ''; inputS.style.flex = '';
      filterS(inputS.value.toLowerCase());
    });

    optsS.forEach(function(opt) {
      opt.addEventListener('mousedown', function(e) { e.preventDefault(); });
      opt.addEventListener('click', function() {
        if (opt.classList.contains('combobox__option--disabled')) return;
        optsS.forEach(function(o) { o.classList.remove('combobox__option--selected'); o.setAttribute('aria-selected', 'false'); });
        opt.classList.add('combobox__option--selected');
        opt.setAttribute('aria-selected', 'true');
        selectedLabelS = opt.querySelector('.combobox__option-label').textContent;
        inputS.value = selectedLabelS;
        cbS.classList.add('combobox--has-value');
        closeCB(cbS);
        setInputWidthS(); inputS.focus();
      });
    });

    clearS.addEventListener('mousedown', function(e) { e.preventDefault(); });
    clearS.addEventListener('click', function(e) {
      e.stopPropagation();
      selectedLabelS = null;
      inputS.value = ''; inputS.style.width = ''; inputS.style.flex = '';
      cbS.classList.remove('combobox--has-value');
      optsS.forEach(function(o) { o.classList.remove('combobox__option--selected'); o.setAttribute('aria-selected', 'false'); });
      filterS(''); openCB(cbS); inputS.focus();
    });

    inputS.addEventListener('blur', function() {
      setTimeout(function() {
        if (!cbS.contains(document.activeElement)) {
          closeCB(cbS);
          inputS.value = selectedLabelS || '';
          filterS(''); setInputWidthS();
        }
      }, 150);
    });

    cbS.addEventListener('keydown', function(e) {
      if (!cbS.classList.contains('combobox--open')) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCB(cbS); filterS(''); inputS.focus(); }
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault(); closeCB(cbS);
        inputS.value = selectedLabelS || ''; setInputWidthS(); inputS.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var vis = optsS.filter(function(o) { return !o.hidden; });
        var idx = vis.indexOf(document.activeElement);
        idx = e.key === 'ArrowDown' ? Math.min(idx + 1, vis.length - 1) : Math.max(idx - 1, 0);
        if (idx < 0) idx = 0;
        if (vis[idx]) vis[idx].focus();
      } else if (e.key === 'Enter') {
        if (document.activeElement.classList.contains('combobox__option')) document.activeElement.click();
      }
    });

    /* ── 외부 클릭 닫기 (single) ── */
    document.addEventListener('click', function(e) {
      if (!cbS.contains(e.target)) { closeCB(cbS); inputS.value = selectedLabelS || ''; setInputWidthS(); filterS(''); }
    });
  }

  /* ── 복수 선택 + 검색 ── */
  var cbM    = container.querySelector('#demo-cb-multi');
  if (cbM && !cbM.dataset.initCombobox) {
    cbM.dataset.initCombobox = '1';
    var trigM  = cbM.querySelector('.combobox__trigger');
    var tagsM  = cbM.querySelector('.combobox__tags');
    var inputM = cbM.querySelector('.combobox__input');
    var optsM  = Array.from(cbM.querySelectorAll('.combobox__option'));
    var emptyM = cbM.querySelector('.combobox__empty');

    var filterM = function(q) {
      var any = false;
      optsM.forEach(function(o) {
        var show = !q || o.querySelector('.combobox__option-label').textContent.toLowerCase().includes(q);
        o.hidden = !show;
        if (show) any = true;
      });
      emptyM.hidden = any;
    };
    var addTagM = function(label, opt) {
      var tag = document.createElement('span');
      tag.className = 'tag tag--removable';
      tag.dataset.value = label;
      tag.innerHTML = label + '<button class="icon-on--badge icon-on--brand" type="button" aria-label="' + label + ' 제거"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>';
      tag.querySelector('button').addEventListener('click', function(e) {
        e.stopPropagation();
        tag.remove();
        opt.classList.remove('combobox__option--selected');
        opt.setAttribute('aria-selected', 'false');
      });
      tagsM.appendChild(tag);
    };

    trigM.addEventListener('click', function(e) {
      if (e.target.closest('button')) return; /* 태그 제거 버튼 클릭 무시 */
      if (!cbM.classList.contains('combobox--open')) {
        sortOpts(cbM); openCB(cbM); filterM('');
      }
      inputM.focus();
    });
    inputM.addEventListener('focus', function() {
      if (!cbM.classList.contains('combobox--open')) { sortOpts(cbM); openCB(cbM); filterM(''); }
    });
    inputM.addEventListener('input', function() {
      if (!cbM.classList.contains('combobox--open')) openCB(cbM);
      filterM(inputM.value.toLowerCase());
    });
    optsM.forEach(function(opt) {
      opt.addEventListener('mousedown', function(e) { e.preventDefault(); });
      opt.addEventListener('click', function() {
        var sel = opt.classList.toggle('combobox__option--selected');
        opt.setAttribute('aria-selected', sel.toString());
        var label = opt.querySelector('.combobox__option-label').textContent;
        if (sel) {
          addTagM(label, opt);
        } else {
          var tag = tagsM.querySelector('[data-value="' + label + '"]');
          if (tag) tag.remove();
        }
        inputM.value = ''; filterM(''); inputM.focus();
      });
    });
    inputM.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && inputM.value === '') {
        var lastTag = tagsM.lastElementChild;
        if (lastTag) {
          var val = lastTag.dataset.value;
          lastTag.remove();
          var opt = optsM.find(function(o) { return o.querySelector('.combobox__option-label').textContent === val; });
          if (opt) { opt.classList.remove('combobox__option--selected'); opt.setAttribute('aria-selected', 'false'); }
        }
      }
    });
    cbM.addEventListener('keydown', function(e) {
      if (!cbM.classList.contains('combobox--open')) return;
      if (e.key === 'Escape') { e.preventDefault(); closeCB(cbM); inputM.value = ''; inputM.focus(); }
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var vis = optsM.filter(function(o) { return !o.hidden; });
        var idx = vis.indexOf(document.activeElement);
        idx = e.key === 'ArrowDown' ? Math.min(idx + 1, vis.length - 1) : Math.max(idx - 1, 0);
        if (idx < 0) idx = 0;
        if (vis[idx]) vis[idx].focus();
      } else if (e.key === 'Enter') {
        if (document.activeElement.classList.contains('combobox__option')) { e.preventDefault(); document.activeElement.click(); }
      }
    });
    inputM.addEventListener('blur', function() {
      setTimeout(function() {
        if (!cbM.contains(document.activeElement)) { closeCB(cbM); inputM.value = ''; filterM(''); }
      }, 150);
    });

    /* ── 외부 클릭 닫기 (multi) ── */
    document.addEventListener('click', function(e) {
      if (!cbM.contains(e.target)) { closeCB(cbM); inputM.value = ''; filterM(''); }
    });
  }
}

if (window.__componentInits && !window.__componentInits.initCombobox) window.__componentInits.initCombobox = initCombobox;

/* ── Tab ── */
/* Tab — slider 위치·키보드 내비게이션·overflow scroller 초기화 */
function initTab(container) {
  function updateSlider(group, animate) {
    var slider = group.querySelector('.tab-group__slider');
    var selected = group.querySelector('.tab--selected');
    if (!slider || !selected) return;
    var isVertical = group.classList.contains('tab-group--vertical');
    if (!animate) slider.style.transition = 'none';
    if (isVertical) {
      slider.style.height = selected.offsetHeight + 'px';
      slider.style.transform = 'translateY(' + selected.offsetTop + 'px)';
    } else {
      slider.style.width = selected.offsetWidth + 'px';
      slider.style.transform = 'translateX(' + selected.offsetLeft + 'px)';
    }
    if (!animate) { slider.offsetWidth; slider.style.transition = ''; }
  }

  /* tab-scroller__track 안에 있을 때 선택·포커스된 탭이 보이도록 track 스크롤 보정 */
  function scrollTabIntoView(tab) {
    var track = tab.closest('.tab-scroller__track');
    if (!track) return;
    var isVertical = tab.closest('.tab-group').classList.contains('tab-group--vertical');
    if (isVertical) {
      if (tab.offsetTop < track.scrollTop) {
        track.scrollTo({ top: tab.offsetTop, behavior: 'smooth' });
      } else if (tab.offsetTop + tab.offsetHeight > track.scrollTop + track.clientHeight) {
        track.scrollTo({ top: tab.offsetTop + tab.offsetHeight - track.clientHeight, behavior: 'smooth' });
      }
    } else {
      if (tab.offsetLeft < track.scrollLeft) {
        track.scrollTo({ left: tab.offsetLeft, behavior: 'smooth' });
      } else if (tab.offsetLeft + tab.offsetWidth > track.scrollLeft + track.clientWidth) {
        track.scrollTo({ left: tab.offsetLeft + tab.offsetWidth - track.clientWidth, behavior: 'smooth' });
      }
    }
  }

  function initTabGroup(group) {
    var tabs = Array.from(group.querySelectorAll('[role="tab"]:not([disabled])'));
    var isVertical = group.classList.contains('tab-group--vertical');

    function selectTab(tab) {
      var allTabs = Array.from(group.querySelectorAll('[role="tab"]'));
      allTabs.forEach(function(t) {
        t.classList.remove('tab--selected');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        var panelId = t.getAttribute('aria-controls');
        if (panelId) {
          var panel = container.querySelector('#' + panelId);
          if (panel) panel.hidden = true;
        }
      });
      tab.classList.add('tab--selected');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      var panelId = tab.getAttribute('aria-controls');
      if (panelId) {
        var panel = container.querySelector('#' + panelId);
        if (panel) panel.hidden = false;
      }
      updateSlider(group, true);
      scrollTabIntoView(tab);
    }

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        selectTab(tab);
      });
      tab.addEventListener('keydown', function(e) {
        var cur = tabs.indexOf(tab);
        var next = -1;
        if (isVertical) {
          if (e.key === 'ArrowDown') next = (cur + 1) % tabs.length;
          if (e.key === 'ArrowUp')   next = (cur - 1 + tabs.length) % tabs.length;
        } else {
          if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
          if (e.key === 'ArrowLeft')  next = (cur - 1 + tabs.length) % tabs.length;
        }
        if (e.key === 'Home') next = 0;
        if (e.key === 'End')  next = tabs.length - 1;
        if (next < 0) return;
        e.preventDefault();
        tabs[next].focus();
        scrollTabIntoView(tabs[next]);
      });
    });
  }

  function initTabScroller(scroller) {
    if (scroller.dataset.initTab) return;
    scroller.dataset.initTab = '1';
    var track = scroller.querySelector('.tab-scroller__track');
    var prevBtn = scroller.querySelector('.tab-scroller__btn--prev');
    var nextBtn = scroller.querySelector('.tab-scroller__btn--next');
    var isVertical = scroller.classList.contains('tab-scroller--vertical');

    function updateArrows() {
      var pos    = isVertical ? track.scrollTop  : track.scrollLeft;
      var maxPos = isVertical
        ? track.scrollHeight - track.clientHeight
        : track.scrollWidth  - track.clientWidth;
      prevBtn.classList.toggle('tab-scroller__btn--hidden', pos <= 0);
      nextBtn.classList.toggle('tab-scroller__btn--hidden', maxPos <= 0 || pos >= maxPos - 1);
    }

    prevBtn.addEventListener('click', function() {
      var amount = (isVertical ? track.clientHeight : track.clientWidth) * 0.5;
      track.scrollBy(isVertical ? { top: -amount, behavior: 'smooth' } : { left: -amount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function() {
      var amount = (isVertical ? track.clientHeight : track.clientWidth) * 0.5;
      track.scrollBy(isVertical ? { top: amount, behavior: 'smooth' } : { left: amount, behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateArrows);
    new ResizeObserver(updateArrows).observe(track);
    updateArrows();
  }

  /* 1) 모든 tab-group의 슬라이더 초기 위치 설정 (static·interactive 공통) */
  container.querySelectorAll('.tab-group').forEach(function(group) {
    if (group.dataset.initTab) return;
    group.dataset.initTab = '1';
    updateSlider(group, false);
  });
  /* 2) interactive tablist에만 핸들러 부착 */
  container.querySelectorAll('.tab-group[role="tablist"]').forEach(initTabGroup);
  /* 3) overflow scroller 초기화 */
  container.querySelectorAll('.tab-scroller').forEach(initTabScroller);
}
if (window.__componentInits && !window.__componentInits.initTab) window.__componentInits.initTab = initTab;

/* ── Accordion ── */
function initAccordion(container) {
  container.querySelectorAll('.accordion__item').forEach(function(item) {
    if (item.dataset.initAccordion) return;
    item.dataset.initAccordion = '1';
    var header = item.querySelector('.accordion__header');
    if (!header) return;
    header.addEventListener('click', function() {
      var expanded = item.classList.toggle('accordion__item--expanded');
      header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });
}
if (window.__componentInits && !window.__componentInits.initAccordion) window.__componentInits.initAccordion = initAccordion;

/* ── Alert ── */
function initAlert(container) {
  function makeAlert(opts) {
    var overlay = document.createElement('div');
    overlay.className = 'alert-overlay';
    overlay.setAttribute('role', 'presentation');

    var alert = document.createElement('div');
    alert.className = 'alert' + (opts.danger ? ' alert--danger' : '');
    alert.setAttribute('role', 'alertdialog');
    alert.setAttribute('aria-modal', 'true');
    alert.setAttribute('aria-labelledby', 'alert-title-' + Date.now());

    var titleId = 'alert-title-' + Date.now();
    var bodyId  = 'alert-body-'  + Date.now();
    alert.querySelector && alert.setAttribute('aria-labelledby', titleId);
    alert.setAttribute('aria-describedby', bodyId);

    function breakSentences(text) {
      return text.replace(/([.?!])\s+/g, '$1<br>');
    }

    var bodyHtml = '';
    if (opts.description) {
      bodyHtml += '<p class="text-description alert__description">' + breakSentences(opts.description) + '</p>';
    }
    if (opts.list) {
      bodyHtml += '<ul class="text-description alert__list">' + opts.list.map(function(i){ return '<li>' + i + '</li>'; }).join('') + '</ul>';
    }
    if (opts.change) {
      bodyHtml += '<div class="text-description alert__change">' +
        opts.change.map(function(row) {
          return '<div class="alert__change-row' + (row.after ? ' alert__change-row--after' : '') + '">' +
            '<span class="badge ' + (row.after ? 'badge--brand' : 'badge--neutral') + '">' + row.label + '</span>' +
            '<span class="alert__change-value">' + row.value + '</span>' +
          '</div>';
        }).join('') +
      '</div>';
    }
    if (opts.option) {
      bodyHtml += '<label class="checkbox alert__option"><input class="checkbox__input" type="checkbox"><span class="checkbox__control" aria-hidden="true"><span class="checkbox__icon-check"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-check"/></svg></span></span><span class="checkbox__label">' + opts.option + '</span></label>';
    }

    alert.innerHTML =
      '<div class="alert__header">' +
        '<p class="text-card-title alert__title" id="' + titleId + '">' + opts.title + '</p>' +
        '<button class="icon-on--sm alert__close" type="button" aria-label="닫기"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-close"/></svg></button>' +
      '</div>' +
      '<div class="alert__body" id="' + bodyId + '">' + bodyHtml + '</div>' +
      '<div class="alert__footer">' +
        '<button class="btn btn--ghost btn--md" type="button">' + (opts.cancelLabel || '취소하기') + '</button>' +
        '<button class="btn ' + (opts.ctaClass || 'btn--secondary') + ' btn--md" type="button">' + (opts.ctaLabel || '확인') + '</button>' +
      '</div>';

    function close() {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') {
        var focusable = alert.querySelectorAll('button, input, a');
        var first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    alert.querySelector('.alert__close').addEventListener('click', close);
    alert.querySelectorAll('.alert__footer .btn')[0].addEventListener('click', close);
    alert.querySelectorAll('.alert__footer .btn')[1].addEventListener('click', close);
    if (!opts.danger) overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onKey);

    overlay.appendChild(alert);
    document.body.appendChild(overlay);
    alert.querySelector('.alert__footer .btn:last-child').focus();
  }

  function bind(id, opts) {
    var btn = container.querySelector(id);
    if (!btn || btn.hasAttribute('data-init-alert')) return;
    btn.setAttribute('data-init-alert', '');
    btn.addEventListener('click', function() { makeAlert(opts); });
  }

  bind('#demo-btn-danger', { title: '선택한 3건의 데이터가 삭제됩니다', description: '한 번 삭제한 데이터는 복구할 수 없어요. 계속 진행할까요?', danger: true, ctaLabel: '삭제하기', ctaClass: 'btn--danger' });
  bind('#demo-btn-default', { title: '선택한 항목이 초기화됩니다', description: '화면을 이동하면 선택한 항목이 해제돼요. 페이지를 이동할까요?', ctaLabel: '이동하기', ctaClass: 'btn--secondary' });
  bind('#demo-btn-brand', { title: '수정한 내용이 있습니다!', description: '이대로 나가면 수정한 내용이 모두 사라져요. 저장하고 나갈까요?', cancelLabel: '저장 안 함', ctaLabel: '저장하기', ctaClass: 'btn--primary' });
  bind('#demo-btn-change', { title: '기계설비공사팀의 부서장이 변경됩니다', change: [{ label: '변경 전', value: '미지정' }, { label: '변경 후', value: '박김영숙 사원(사원)', after: true }], ctaLabel: '변경하기', ctaClass: 'btn--secondary' });
  bind('#demo-btn-option', { title: '검색 결과가 초기화됩니다', description: '화면을 이동하면 검색 결과가 초기화돼요. 페이지를 이동할까요?', option: '다시 묻지 않기', ctaLabel: '이동하기', ctaClass: 'btn--secondary' });
  bind('#demo-btn-list', { title: '근로자 N명이 포함된 조직을 삭제합니다', list: ['하위 조직도 전부 삭제됩니다.', '조직에 포함된 근로자는 무소속으로 변경됩니다.'], danger: true, ctaLabel: '삭제하기', ctaClass: 'btn--danger' });
}
if (window.__componentInits && !window.__componentInits.initAlert) window.__componentInits.initAlert = initAlert;

/* ── FileUpload ── */
function initFileUpload(container) {
  var upload = container.querySelector('#demo-file-upload');
  if (!upload || upload.dataset.initFileupload) return;
  upload.dataset.initFileupload = '1';

  var input      = container.querySelector('#demo-file-input');
  var grid       = container.querySelector('#demo-grid');
  var addBtn     = container.querySelector('#demo-add-btn');
  var zone       = container.querySelector('#demo-dropzone');
  var usage      = container.querySelector('#demo-usage');
  var ipEl       = container.querySelector('#demo-image-preview');
  var ipImg      = container.querySelector('#demo-ip-img');
  var ipScrim    = container.querySelector('#demo-ip-scrim');
  var ipClose    = container.querySelector('#demo-ip-close');
  var ipDownload = container.querySelector('#demo-ip-download');
  var ipDelete   = container.querySelector('#demo-ip-delete');
  var ipZoomIn   = container.querySelector('#demo-ip-zoom-in');
  var ipZoomOut  = container.querySelector('#demo-ip-zoom-out');
  var ipZoomLabel = container.querySelector('#demo-ip-zoom-label');
  var ipFilename = container.querySelector('#demo-ip-filename');
  var totalBytes = 0;
  var MAX_BYTES = 2 * 1024 * 1024; /* 2MB (데모용) */
  var scale = 1, baseW = 0, baseH = 0;
  var MIN = 0.5, MAX = 3, STEP = 0.25;
  var GAP = 96;
  var currentItem = null;

  function fmt(bytes) { return (bytes / (1024 * 1024)).toFixed(1) + 'MB'; }

  function updateCapacity() {
    var full = totalBytes >= MAX_BYTES;
    upload.classList.toggle('file-upload--capacity-full', full);
    addBtn.disabled = full;
    addBtn.classList.toggle('btn--disabled', full);
    if (full) { addBtn.setAttribute('aria-disabled', 'true'); addBtn.setAttribute('tabindex', '-1'); }
    else { addBtn.removeAttribute('aria-disabled'); addBtn.removeAttribute('tabindex'); }
  }

  function calcBase() {
    var maxW = window.innerWidth  * 0.9;
    var maxH = (window.innerHeight - GAP) * 0.9;
    var r = ipImg.naturalWidth / ipImg.naturalHeight;
    if (ipImg.naturalWidth / maxW > ipImg.naturalHeight / maxH) {
      baseW = Math.min(ipImg.naturalWidth, maxW);
      baseH = baseW / r;
    } else {
      baseH = Math.min(ipImg.naturalHeight, maxH);
      baseW = baseH * r;
    }
  }

  function updateZoom() {
    ipImg.style.width  = Math.round(baseW * scale) + 'px';
    ipImg.style.height = Math.round(baseH * scale) + 'px';
    ipZoomLabel.textContent = Math.round(scale * 100) + '%';
    ipZoomIn.disabled  = scale >= MAX;
    ipZoomOut.disabled = scale <= MIN;
  }

  function openPreview(src, name, item) {
    ipImg.src = src;
    ipFilename.textContent = name;
    currentItem = item;
    ipImg.style.width = ipImg.style.height = '';
    ipImg.onload = function() {
      scale = 1;
      calcBase();
      updateZoom();
    };
    ipEl.classList.add('image-preview--visible');
    document.body.style.overflow = 'hidden';
    ipClose.focus();
  }
  function closePreview() {
    ipEl.classList.remove('image-preview--visible');
    document.body.style.overflow = '';
    currentItem = null;
  }

  ipScrim.addEventListener('click', closePreview);
  ipClose.addEventListener('click', closePreview);
  ipDownload.addEventListener('click', function() {
    var a = document.createElement('a');
    a.href = ipImg.src; a.download = ipFilename.textContent; a.click();
  });
  ipDelete.addEventListener('click', function() {
    if (currentItem) {
      var size = currentItem._fileSize || 0;
      totalBytes -= size;
      usage.textContent = fmt(totalBytes) + ' / 2MB';
      currentItem.remove();
      updateCapacity();
    }
    closePreview();
  });
  ipZoomIn.addEventListener('click', function() {
    if (scale < MAX) { scale = Math.min(MAX, +(scale + STEP).toFixed(2)); updateZoom(); }
  });
  ipZoomOut.addEventListener('click', function() {
    if (scale > MIN) { scale = Math.max(MIN, +(scale - STEP).toFixed(2)); updateZoom(); }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePreview();
  });

  function addCard(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var item = document.createElement('div');
      item.className = 'file-upload-item';
      item._fileSize = file.size;
      item.innerHTML =
        '<p class="text-form-label file-upload-item__name" title="' + file.name + '">' + file.name + '</p>' +
        '<div class="file-upload-item__preview" style="cursor:pointer">' +
          '<img src="' + e.target.result + '" class="file-upload-item__thumb" alt="">' +
          '<div class="file-upload-item__overlay" aria-hidden="true">' +
            '<svg aria-hidden="true"><use href="icons/sprite.svg#icon-search"/></svg>' +
          '</div>' +
        '</div>' +
        '<div class="file-upload-item__actions">' +
          '<button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="다운로드"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-download"/></svg></span></button>' +
          '<button class="btn btn--ghost btn--sm btn--icon-only" type="button" aria-label="삭제"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-delete"/></svg></span></button>' +
        '</div>';
      item.querySelector('.file-upload-item__preview').addEventListener('click', function() {
        openPreview(e.target.result, file.name, item);
      });
      item.querySelector('[aria-label="삭제"]').addEventListener('click', function() {
        totalBytes -= file.size;
        usage.textContent = fmt(totalBytes) + ' / 2MB';
        item.remove();
        updateCapacity();
      });
      grid.appendChild(item);
      totalBytes += file.size;
      usage.textContent = fmt(totalBytes) + ' / 2MB';
      updateCapacity();
    };
    reader.readAsDataURL(file);
  }

  addBtn.addEventListener('click', function() { input.click(); });
  input.addEventListener('change', function() {
    Array.from(input.files).forEach(addCard);
    input.value = '';
  });

  zone.addEventListener('dragover', function(e) { e.preventDefault(); upload.classList.add('file-upload--drag-over'); });
  zone.addEventListener('dragleave', function(e) { if (!zone.contains(e.relatedTarget)) upload.classList.remove('file-upload--drag-over'); });
  zone.addEventListener('drop', function(e) {
    e.preventDefault();
    upload.classList.remove('file-upload--drag-over');
    if (!upload.classList.contains('file-upload--capacity-full')) {
      Array.from(e.dataTransfer.files).forEach(addCard);
    }
  });
}
if (window.__componentInits && !window.__componentInits.initFileUpload) window.__componentInits.initFileUpload = initFileUpload;

/* ── ImagePreview ── */
function initImagePreview(container) {
  var root = container.querySelector('#demo-image-preview');
  if (!root || root.dataset.initImagepreview) return;
  root.dataset.initImagepreview = '1';

  var thumb    = container.querySelector('#demo-ip-thumb');
  var preview  = container.querySelector('#demo-image-preview');
  var img      = container.querySelector('#demo-ip-img');
  var scrim    = container.querySelector('#demo-ip-scrim');
  var closeBtn = container.querySelector('#demo-ip-close');
  var dlBtn    = container.querySelector('#demo-ip-download');
  var delBtn   = container.querySelector('#demo-ip-delete');
  var zoomIn   = container.querySelector('#demo-ip-zoom-in');
  var zoomOut  = container.querySelector('#demo-ip-zoom-out');
  var zoomLabel = container.querySelector('#demo-ip-zoom-label');
  var filename = container.querySelector('#demo-ip-filename');
  var scale = 1, baseW = 0, baseH = 0;
  var MIN = 0.5, MAX = 3, STEP = 0.25;
  var GAP = 96; /* topbar + toolbar 높이 합계(각 ~48px) */
  var triggerEl = null;

  function calcBase() {
    var maxW = window.innerWidth  * 0.9;
    var maxH = (window.innerHeight - GAP) * 0.9;
    var r = img.naturalWidth / img.naturalHeight;
    if (img.naturalWidth / maxW > img.naturalHeight / maxH) {
      baseW = Math.min(img.naturalWidth, maxW);
      baseH = baseW / r;
    } else {
      baseH = Math.min(img.naturalHeight, maxH);
      baseW = baseH * r;
    }
  }

  function updateZoom() {
    img.style.width  = Math.round(baseW * scale) + 'px';
    img.style.height = Math.round(baseH * scale) + 'px';
    zoomLabel.textContent = Math.round(scale * 100) + '%';
    zoomIn.disabled  = scale >= MAX;
    zoomOut.disabled = scale <= MIN;
  }

  function open(src, name, trigger) {
    triggerEl = trigger || null;
    img.src = src;
    filename.textContent = name || 'image';
    img.style.width = img.style.height = '';
    img.onload = function() {
      scale = 1;
      calcBase();
      updateZoom();
    };
    preview.classList.add('image-preview--visible');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    preview.classList.remove('image-preview--visible');
    document.body.style.overflow = '';
    if (triggerEl) { triggerEl.focus(); triggerEl = null; }
  }

  thumb.addEventListener('click', function() { open(thumb.src, 'image.jpg', thumb); });
  scrim.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  delBtn.addEventListener('click', close);
  dlBtn.addEventListener('click', function() {
    var a = document.createElement('a');
    a.href = img.src; a.download = filename.textContent; a.click();
  });
  zoomIn.addEventListener('click', function() {
    if (scale < MAX) { scale = Math.min(MAX, scale + STEP); updateZoom(); }
  });
  zoomOut.addEventListener('click', function() {
    if (scale > MIN) { scale = Math.max(MIN, scale - STEP); updateZoom(); }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') close();
  });
}
if (window.__componentInits && !window.__componentInits.initImagePreview) window.__componentInits.initImagePreview = initImagePreview;

/* ── Breadcrumb ── */
function initBreadcrumb(container) {
  var btn = container.querySelector('#bc-ellipsis');
  if (!btn || btn.hasAttribute('data-init-breadcrumb')) return;
  btn.setAttribute('data-init-breadcrumb', '');
  btn.addEventListener('click', function() {
    btn.setAttribute('aria-expanded', 'true'); /* 스크린리더가 상태 변화 인지 후 제거 */
    var hidden = container.querySelectorAll('.breadcrumb__item--hidden');
    hidden.forEach(function(item) { item.classList.remove('breadcrumb__item--hidden'); });
    /* 버튼 li(ellipsis + sep) 제거 */
    btn.closest('.breadcrumb__item').remove();
  });
}

if (window.__componentInits && !window.__componentInits.initBreadcrumb) window.__componentInits.initBreadcrumb = initBreadcrumb;

/* ── Steps ── */
function initSteps(container) {
  var list = container.querySelector('#st-demo');
  if (!list || list.hasAttribute('data-init-steps')) return;
  list.setAttribute('data-init-steps', '');

  var items = container.querySelectorAll('#st-demo .steps__item');
  var prevBtn = container.querySelector('#st-prev');
  var nextBtn = container.querySelector('#st-next');
  var current = 1;
  var CHECK = '<svg aria-hidden="true" style="width:var(--icon-sm);height:var(--icon-sm)"><use href="#icon-check"/></svg>';

  function update() {
    items.forEach(function(item, i) {
      item.classList.remove('steps__item--complete', 'steps__item--current');
      item.removeAttribute('aria-current');
      var node = item.querySelector('.steps__node');
      if (i < current) {
        item.classList.add('steps__item--complete');
        node.innerHTML = CHECK;
      } else if (i === current) {
        item.classList.add('steps__item--current');
        item.setAttribute('aria-current', 'step');
        node.innerHTML = '<span aria-hidden="true">' + (i + 1) + '</span>';
      } else {
        node.innerHTML = '<span aria-hidden="true">' + (i + 1) + '</span>';
      }
    });
    prevBtn.disabled = current === 0;
    nextBtn.textContent = current === items.length - 1 ? '완료' : '다음';
  }

  prevBtn.addEventListener('click', function() { if (current > 0) { current--; update(); } });
  nextBtn.addEventListener('click', function() { if (current < items.length - 1) { current++; update(); } });
  update();
}

if (window.__componentInits && !window.__componentInits.initSteps) window.__componentInits.initSteps = initSteps;

/* ── Table Cell ── */
function initTableSort(container) {
  container.querySelectorAll('table').forEach(function(table) {
    if (table.dataset.initTableSort) return;
    table.dataset.initTableSort = '1';

    var sortThs = table.querySelectorAll('.table__head-cell--sort');
    if (!sortThs.length) return;

    // global 기본 sort가 중복 부착하지 않도록 마킹
    sortThs.forEach(function(th) {
      var b = th.querySelector('.table__sort-btn');
      if (b) b.dataset.initSort = '1';
    });

    // toast stack: 없으면 컨테이너에 동적 생성
    var stage = table.closest('.component-preview-stage') || container;
    var toastStack = stage.querySelector('[id$="-toast-stack"]');
    if (!toastStack) {
      toastStack = document.createElement('div');
      toastStack.setAttribute('aria-live', 'polite');
      toastStack.setAttribute('aria-atomic', 'false');
      toastStack.style.cssText = 'position:absolute;bottom:var(--space-16);left:50%;transform:translateX(-50%);pointer-events:none;display:flex;flex-direction:column;gap:var(--space-gap-sm);z-index:100;';
      stage.style.position = 'relative';
      stage.appendChild(toastStack);
    }

    var activeUndoToast = null;
    var savedChain = null;

    function applySort(th, dir) {
      var btn = th.querySelector('.table__sort-btn');
      th.classList.remove('table__head-cell--sort-asc', 'table__head-cell--sort-desc');
      th.classList.add(dir === 'asc' ? 'table__head-cell--sort-asc' : 'table__head-cell--sort-desc');
      th.setAttribute('aria-sort', dir === 'asc' ? 'ascending' : 'descending');
      var use = btn.querySelector('.icon use');
      if (use) use.setAttribute('href', 'icons/sprite.svg#icon-sort-' + dir);
      var iconEl = btn.querySelector('.icon');
      if (iconEl) iconEl.classList.add('icon--brand');
    }

    function clearSort(th) {
      var btn = th.querySelector('.table__sort-btn');
      th.classList.remove('table__head-cell--sort-asc', 'table__head-cell--sort-desc');
      th.setAttribute('aria-sort', 'none');
      var use = btn.querySelector('.icon use');
      if (use) use.setAttribute('href', 'icons/sprite.svg#icon-sort-asc');
      var iconEl = btn.querySelector('.icon');
      if (iconEl) iconEl.classList.remove('icon--brand');
      var orderEl = btn.querySelector('.table__sort-order');
      if (orderEl) orderEl.remove();
      var tip = btn.querySelector('.tooltip-panel');
      if (tip) tip.textContent = '오름차순';
    }

    function updateOrderNumbers() {
      var chain = [];
      sortThs.forEach(function(t) {
        if (t.classList.contains('table__head-cell--sort-asc') || t.classList.contains('table__head-cell--sort-desc')) {
          var orderEl = t.querySelector('.table__sort-order');
          if (orderEl) chain.push({ th: t, order: parseInt(orderEl.textContent) });
        }
      });
      chain.sort(function(a, b) { return a.order - b.order; });
      chain.forEach(function(item, i) { item.th.querySelector('.table__sort-order').textContent = i + 1; });
    }

    function getNextOrder() {
      var max = 0;
      sortThs.forEach(function(t) {
        var el = t.querySelector('.table__sort-order');
        if (el) max = Math.max(max, parseInt(el.textContent));
      });
      return max + 1;
    }

    function attachOrderHandler(orderEl, th) {
      orderEl.addEventListener('click', function(e) {
        e.stopPropagation();
        clearSort(th);
        updateOrderNumbers();
      });
    }

    function saveChain() {
      savedChain = [];
      sortThs.forEach(function(t) {
        var isAsc = t.classList.contains('table__head-cell--sort-asc');
        var isDesc = t.classList.contains('table__head-cell--sort-desc');
        if (isAsc || isDesc) {
          var orderEl = t.querySelector('.table__sort-order');
          savedChain.push({ th: t, dir: isAsc ? 'asc' : 'desc', order: orderEl ? parseInt(orderEl.textContent) : null });
        }
      });
      savedChain.sort(function(a, b) { return (a.order || 0) - (b.order || 0); });
    }

    function restoreChain() {
      sortThs.forEach(function(t) { clearSort(t); });
      savedChain.forEach(function(item) {
        var btn = item.th.querySelector('.table__sort-btn');
        applySort(item.th, item.dir);
        if (item.order !== null) {
          var orderEl = document.createElement('span');
          orderEl.className = 'table__sort-order icon--brand';
          orderEl.textContent = item.order;
          orderEl.setAttribute('title', '클릭하여 정렬 해제');
          attachOrderHandler(orderEl, item.th);
          btn.querySelector('.tooltip-wrapper').insertBefore(orderEl, btn.querySelector('.tooltip-wrapper').firstChild);
        }
        var orderText = item.order !== null ? (' · ' + item.order + '번째 기준') : '';
        btn.querySelector('.tooltip-panel').textContent = (item.dir === 'asc' ? '오름차순' : '내림차순') + orderText;
      });
    }

    function showUndoToast() {
      if (activeUndoToast && typeof dismissToast === 'function') { dismissToast(activeUndoToast); activeUndoToast = null; }
      if (typeof makeToast !== 'function') return;
      var t = makeToast('info', '', '다중 정렬이 초기화되었습니다', '되돌리기');
      var actionLink = t.querySelector('.toast__action-link');
      if (actionLink) {
        actionLink.addEventListener('click', function(e) {
          e.preventDefault();
          restoreChain();
          if (typeof dismissToast === 'function') dismissToast(t);
          activeUndoToast = null;
        });
      }
      toastStack.appendChild(t);
      activeUndoToast = t;
    }

    // 기존 HTML의 순서 번호 뱃지 핸들러 초기화
    sortThs.forEach(function(th) {
      var existing = th.querySelector('.table__sort-order');
      if (existing) attachOrderHandler(existing, th);
    });

    sortThs.forEach(function(th) {
      var btn = th.querySelector('.table__sort-btn');
      if (!btn) return;
      btn.addEventListener('click', function(e) {
        var isAsc = th.classList.contains('table__head-cell--sort-asc');
        var isDesc = th.classList.contains('table__head-cell--sort-desc');
        var isMulti = e.shiftKey;

        if (!isMulti) {
          var chainCount = Array.from(sortThs).filter(function(t) {
            return t.classList.contains('table__head-cell--sort-asc') || t.classList.contains('table__head-cell--sort-desc');
          }).length;
          if (chainCount >= 2) { saveChain(); showUndoToast(); }
          sortThs.forEach(function(t) { if (t !== th) clearSort(t); });
          var orderEl = btn.querySelector('.table__sort-order');
          if (orderEl) orderEl.remove();
          if (isDesc) { applySort(th, 'asc'); btn.querySelector('.tooltip-panel').textContent = '오름차순'; }
          else if (isAsc) { applySort(th, 'desc'); btn.querySelector('.tooltip-panel').textContent = '내림차순'; }
          else { applySort(th, 'asc'); btn.querySelector('.tooltip-panel').textContent = '오름차순'; }
        } else {
          sortThs.forEach(function(t) {
            if (t === th) return;
            var sorted = t.classList.contains('table__head-cell--sort-asc') || t.classList.contains('table__head-cell--sort-desc');
            if (sorted && !t.querySelector('.table__sort-order')) {
              var b = t.querySelector('.table__sort-btn');
              var newOrder = document.createElement('span');
              newOrder.className = 'table__sort-order icon--brand';
              newOrder.textContent = getNextOrder();
              newOrder.setAttribute('title', '클릭하여 정렬 해제');
              attachOrderHandler(newOrder, t);
              var w = b.querySelector('.tooltip-wrapper');
              w.insertBefore(newOrder, w.firstChild);
              var dir = t.classList.contains('table__head-cell--sort-asc') ? '오름차순' : '내림차순';
              b.querySelector('.tooltip-panel').textContent = dir + ' · ' + newOrder.textContent + '번째 기준';
            }
          });
          if (!isAsc && !isDesc) {
            var order = getNextOrder();
            var orderEl = document.createElement('span');
            orderEl.className = 'table__sort-order icon--brand';
            orderEl.textContent = order;
            orderEl.setAttribute('title', '클릭하여 정렬 해제');
            attachOrderHandler(orderEl, th);
            btn.querySelector('.tooltip-wrapper').insertBefore(orderEl, btn.querySelector('.tooltip-wrapper').firstChild);
            applySort(th, 'asc');
            btn.querySelector('.tooltip-panel').textContent = '오름차순 · ' + order + '번째 기준';
          } else if (isAsc) {
            applySort(th, 'desc');
            var order = btn.querySelector('.table__sort-order') ? btn.querySelector('.table__sort-order').textContent : '';
            btn.querySelector('.tooltip-panel').textContent = '내림차순' + (order ? ' · ' + order + '번째 기준' : '');
          } else {
            clearSort(th);
            updateOrderNumbers();
          }
        }
      });
    });
  });
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initTableSort) window.__componentInits.initTableSort = initTableSort;

/* ── DateRangePicker ── */
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
    if(allSelected&&minDate){rangeStart=minDate;rangeEnd=maxDate||new Date(today);}
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
    if(isStart||isEnd||inRange) btn.setAttribute('aria-selected','true');
    btn.className=cls.join(' ');
    btn.setAttribute('tabindex',(!outside&&(isStart||isEnd||isSame(d,today)))?'0':'-1');
    var ariaLbl=d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일';
    if(!outside&&isSame(d,today)) ariaLbl+=', 오늘';
    if(isStart) ariaLbl+=', 시작일';
    else if(isEnd) ariaLbl+=', 종료일';
    btn.setAttribute('aria-label',ariaLbl);
    btn.textContent=d.getDate();
    if(!outside&&isDisabled(d)){btn.setAttribute('disabled','');btn.setAttribute('aria-disabled','true');btn.setAttribute('tabindex','-1');}
    return btn;
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
    return section;
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
    else if(isSame(rangeStart,d)){rangeStart=null;hoverDate=null;}
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
    if(allSelected&&minDate){rangeStart=minDate;rangeEnd=maxDate||new Date(today);}
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
}
if (!window.__componentInits) window.__componentInits = {};
if (!window.__componentInits.initDRP) window.__componentInits.initDRP = initDRP;

/* ── FilterBar ── */
function initFilterBar(container) {
  if (!container || container.dataset.initFilterBar) return;
  container.dataset.initFilterBar = '1';

  var resetWrap   = container.querySelector('.filter-bar__reset-wrap');
  var resetBtn    = resetWrap ? resetWrap.querySelector('button') : null;
  var resetTip    = resetWrap ? resetWrap.querySelector('.tooltip-panel') : null;
  var drpEls      = Array.from(container.querySelectorAll('.drp'));
  var searchInput = container.querySelector('.filter-bar__search input[type="search"]');
  var searchWrap  = searchInput ? searchInput.closest('.input-wrap') : null;
  var clearBtn    = container.querySelector('.filter-bar__search .input-clear');
  var searchBtn   = container.querySelector('.filter-bar__search .icon-on--md');

  /* 하위 컴포넌트 초기화 */
  initDropdown(container);
  drpEls.forEach(function(drp) { initDRP(drp); });

  /* 초기화 버튼 가시성 동기화 */
  function syncReset() {
    if (!resetWrap) return;
    var anyFilter = Array.from(container.querySelectorAll('.dropdown')).some(function(dd) {
      return !!dd.querySelector('.dropdown__option--selected');
    });
    var anyDrp    = drpEls.some(function(d) { return d.classList.contains('drp--active'); });
    var anySearch = searchInput ? searchInput.value.trim().length > 0 : false;
    resetWrap.hidden = !(anyFilter || anyDrp || anySearch);
  }

  /* 초기화 버튼 tooltip */
  if (resetBtn && resetTip) {
    resetBtn.addEventListener('mouseenter', function() { resetTip.classList.add('tooltip-panel--visible'); });
    resetBtn.addEventListener('mouseleave', function() { resetTip.classList.remove('tooltip-panel--visible'); });
    resetBtn.addEventListener('focus',      function() { resetTip.classList.add('tooltip-panel--visible'); });
    resetBtn.addEventListener('blur',       function() { resetTip.classList.remove('tooltip-panel--visible'); });
  }

  /* 드롭다운 선택값 요약 업데이트 */
  function updateSummary(dd) {
    var sel   = Array.from(dd.querySelectorAll('.dropdown__option--selected'));
    var val   = dd.querySelector('.dropdown__value');
    var count = dd.querySelector('.dropdown__count');
    var tip   = dd.querySelector('.tooltip-panel');
    if (!val) return;
    if (count) count.hidden = true;
    if (sel.length === 0) {
      val.textContent = dd.dataset.placeholder || '';
      val.classList.add('dropdown__value--placeholder');
      if (tip) tip.textContent = '';
    } else {
      var labels = sel.map(function(o) { return o.querySelector('.dropdown__option-label').textContent; });
      val.textContent = labels.length > 1 ? labels[0] + ' 외 ' + (labels.length - 1) : labels[0];
      val.classList.remove('dropdown__value--placeholder');
      if (tip) tip.textContent = labels.join(', ');
    }
  }

  /* 드롭다운 placeholder 저장 + tooltip hover */
  container.querySelectorAll('.dropdown').forEach(function(dd) {
    var val = dd.querySelector('.dropdown__value');
    if (val) dd.dataset.placeholder = val.textContent.trim();
    var trigger = dd.querySelector('.dropdown__trigger');
    var tip     = dd.querySelector('.tooltip-panel');
    if (!trigger || !tip) return;
    trigger.addEventListener('mouseenter', function() { if (tip.textContent.trim()) tip.classList.add('tooltip-panel--visible'); });
    trigger.addEventListener('mouseleave', function() { tip.classList.remove('tooltip-panel--visible'); });
    trigger.addEventListener('focus',      function() { if (tip.textContent.trim()) tip.classList.add('tooltip-panel--visible'); });
    trigger.addEventListener('blur',       function() { tip.classList.remove('tooltip-panel--visible'); });
  });

  /* 드롭다운 옵션 클릭 → 요약 + reset 동기화 */
  container.querySelectorAll('.dropdown .dropdown__option').forEach(function(opt) {
    opt.addEventListener('click', function() {
      setTimeout(function() {
        var dd = opt.closest('.dropdown');
        if (dd) updateSummary(dd);
        syncReset();
      }, 0);
    });
  });

  /* DRP change 이벤트 → reset 동기화 */
  drpEls.forEach(function(drp) {
    drp.addEventListener('drp:change', function() { syncReset(); });
  });

  /* 검색 */
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var hasVal = !!searchInput.value;
      if (clearBtn) clearBtn.hidden = !hasVal;
      if (searchWrap) searchWrap.classList.toggle('input-wrap--clearable', hasVal);
      syncReset();
    });
    searchInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') syncReset(); });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      if (searchInput) searchInput.value = '';
      clearBtn.hidden = true;
      if (searchWrap) searchWrap.classList.remove('input-wrap--clearable');
      syncReset();
    });
  }
  if (searchBtn) {
    searchBtn.addEventListener('click', function() { syncReset(); });
  }

  /* 초기화 */
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      container.querySelectorAll('.dropdown').forEach(function(dd) {
        dd.querySelectorAll('.dropdown__option').forEach(function(o) {
          o.classList.remove('dropdown__option--selected');
          o.setAttribute('aria-selected', 'false');
        });
        var val   = dd.querySelector('.dropdown__value');
        var count = dd.querySelector('.dropdown__count');
        var tip   = dd.querySelector('.tooltip-panel');
        if (val)   { val.textContent = dd.dataset.placeholder || ''; val.classList.add('dropdown__value--placeholder'); }
        if (count) count.hidden = true;
        if (tip)   { tip.textContent = ''; tip.classList.remove('tooltip-panel--visible'); }
      });
      drpEls.forEach(function(drp) { drp.dispatchEvent(new CustomEvent('drp:reset')); });
      if (searchInput) searchInput.value = '';
      if (clearBtn)    clearBtn.hidden = true;
      if (searchWrap)  searchWrap.classList.remove('input-wrap--clearable');
      syncReset();
    });
  }

  /* 초기 상태 동기화 */
  syncReset();
}
