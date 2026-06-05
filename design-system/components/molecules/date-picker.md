---
file: components/molecules/date-picker.md
version: 1.1.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, tokens/typography.md, tokens/elevation.md, tokens/icon.md, components/atoms/calendar.md, components/atoms/icon.md
---

# DatePicker

## 개요

연도·월·일 세그먼트 필드와 월 이동 버튼으로 구성된 트리거 행 + Calendar 패널을 결합한 Molecule. 세그먼트 필드는 Dropdown 트리거 스타일을 따른다.

- **single**: 날짜 하나를 선택. 트리거에 `YYYY . MM . DD 요일` 표시.
- **range**: 시작일·종료일을 순서대로 선택. 트리거에 `YYYY.MM.DD ~ YYYY.MM.DD` 표시.

Calendar Atom이 날짜 그리드를 담당하고, DatePicker는 트리거 필드·패널 컨테이너를 추가한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| mode | single · range | single |
| state | default · open · disabled · error | default |

---

## 동작

날짜 세그먼트 클릭 시 패널 열기·닫기, `«` `<` `>` `»` 로 연·월 이동, 날짜 선택 시 세그먼트 업데이트를 확인할 수 있다.

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-lg);align-items:flex-start;">
<div role="radiogroup" aria-label="선택 모드" class="segment" id="dp-mode-seg">
  <span class="segment__slider" aria-hidden="true"></span>
  <button class="segment__item segment__item--selected" role="radio" aria-checked="true" data-mode="single">단일</button>
  <button class="segment__item" role="radio" aria-checked="false" data-mode="range">범위</button>
</div>
<div class="dp" id="dp-live">
  <!-- 단일 트리거 -->
  <div class="dp__field" id="dp-field-single" tabindex="0" aria-haspopup="dialog" aria-expanded="false" aria-label="날짜 선택">
    <button class="dp__arrow" id="dp-prev-year" type="button" aria-label="1년 이전" tabindex="-1">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-left"/></svg></span>
    </button>
    <button class="dp__arrow" id="dp-prev-month" type="button" aria-label="이전 달" tabindex="-1">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
    </button>
    <div class="dp__date-parts" id="dp-parts-single">
      <button class="dp__part" type="button" data-part="year" aria-label="연도">----</button>
      <span class="dp__sep" aria-hidden="true">.</span>
      <button class="dp__part" type="button" data-part="month" aria-label="월">--</button>
      <span class="dp__sep" aria-hidden="true">.</span>
      <button class="dp__part" type="button" data-part="day" aria-label="일">--</button>
      <span class="dp__dow" id="dp-dow" aria-hidden="true"></span>
    </div>
    <button class="dp__today" id="dp-today" type="button">오늘</button>
    <button class="dp__arrow" id="dp-next-month" type="button" aria-label="다음 달" tabindex="-1">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
    </button>
    <button class="dp__arrow" id="dp-next-year" type="button" aria-label="1년 이후" tabindex="-1">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-right"/></svg></span>
    </button>
  </div>
  <!-- 범위 트리거 (초기 숨김) -->
  <div class="dp__field dp__field--range" id="dp-field-range" tabindex="0" aria-haspopup="dialog" aria-expanded="false" aria-label="기간 선택" style="display:none;">
    <button class="dp__arrow" id="dp-r-prev-year" type="button" aria-label="1년 이전" tabindex="-1">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-left"/></svg></span>
    </button>
    <button class="dp__arrow" id="dp-r-prev-month" type="button" aria-label="이전 달" tabindex="-1">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
    </button>
    <div class="dp__date-parts" id="dp-parts-start">
      <button class="dp__part" type="button" data-part="start-year" aria-label="시작 연도">----</button>
      <span class="dp__sep" aria-hidden="true">.</span>
      <button class="dp__part" type="button" data-part="start-month" aria-label="시작 월">--</button>
      <span class="dp__sep" aria-hidden="true">.</span>
      <button class="dp__part" type="button" data-part="start-day" aria-label="시작 일">--</button>
    </div>
    <span class="dp__range-sep" aria-hidden="true">~</span>
    <div class="dp__date-parts" id="dp-parts-end">
      <button class="dp__part" type="button" data-part="end-year" aria-label="종료 연도">----</button>
      <span class="dp__sep" aria-hidden="true">.</span>
      <button class="dp__part" type="button" data-part="end-month" aria-label="종료 월">--</button>
      <span class="dp__sep" aria-hidden="true">.</span>
      <button class="dp__part" type="button" data-part="end-day" aria-label="종료 일">--</button>
    </div>
    <button class="dp__today" id="dp-r-today" type="button">오늘</button>
    <button class="dp__arrow" id="dp-r-next-month" type="button" aria-label="다음 달" tabindex="-1">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
    </button>
    <button class="dp__arrow" id="dp-r-next-year" type="button" aria-label="1년 이후" tabindex="-1">
      <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-right"/></svg></span>
    </button>
  </div>
  <!-- 패널 -->
  <div class="dp__panel" id="dp-panel" role="dialog" aria-label="날짜 선택" hidden>
    <div class="cal">
      <div class="cal__grid" role="grid" id="dp-cal-grid">
        <div class="cal__weekdays" role="row">
          <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span>
          <span class="cal__weekday" role="columnheader" aria-label="월요일">월</span>
          <span class="cal__weekday" role="columnheader" aria-label="화요일">화</span>
          <span class="cal__weekday" role="columnheader" aria-label="수요일">수</span>
          <span class="cal__weekday" role="columnheader" aria-label="목요일">목</span>
          <span class="cal__weekday" role="columnheader" aria-label="금요일">금</span>
          <span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
        </div>
        <div id="dp-weeks"></div>
      </div>
    </div>
  </div>
</div>
</div>
<script>
(function() {
  var DAYS = ['일','월','화','수','목','금','토'];
  var today = new Date(); today.setHours(0,0,0,0);
  var mode = 'single';
  var viewYear = today.getFullYear(), viewMonth = today.getMonth();
  var selected = null, rangeStart = null, rangeEnd = null, hoverDate = null;

  var dp         = stage.querySelector('#dp-live');
  var panel      = stage.querySelector('#dp-panel');
  var weeksEl    = stage.querySelector('#dp-weeks');
  var gridEl     = stage.querySelector('#dp-cal-grid');
  var fieldSingle = stage.querySelector('#dp-field-single');
  var fieldRange  = stage.querySelector('#dp-field-range');

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function isSame(a,b) { return a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
  function isBetween(d,s,e) { if(!s||!e) return false; var lo=s<e?s:e,hi=s<e?e:s; return d>lo&&d<hi; }
  function fromKey(k) { var p=k.split(','); return new Date(+p[0],+p[1],+p[2]); }
  function isOpen() { return !panel.hasAttribute('hidden'); }

  function openPanel() {
    panel.removeAttribute('hidden');
    dp.classList.add('dp--open');
    var f = mode==='single' ? fieldSingle : fieldRange;
    f.setAttribute('aria-expanded','true');
  }
  function closePanel() {
    panel.setAttribute('hidden','');
    dp.classList.remove('dp--open');
    fieldSingle.setAttribute('aria-expanded','false');
    fieldRange.setAttribute('aria-expanded','false');
    hoverDate = null;
  }

  function updateParts() {
    if (mode === 'single') {
      var yearBtn  = stage.querySelector('[data-part="year"]');
      var monthBtn = stage.querySelector('[data-part="month"]');
      var dayBtn   = stage.querySelector('[data-part="day"]');
      var dowEl    = stage.querySelector('#dp-dow');
      if (selected) {
        yearBtn.textContent  = selected.getFullYear();
        monthBtn.textContent = pad(selected.getMonth()+1);
        dayBtn.textContent   = pad(selected.getDate());
        dowEl.textContent    = DAYS[selected.getDay()];
      } else {
        yearBtn.textContent  = viewYear;
        monthBtn.textContent = pad(viewMonth+1);
        dayBtn.textContent   = '--';
        dowEl.textContent    = '';
      }
    } else {
      var sy = stage.querySelector('[data-part="start-year"]');
      var sm = stage.querySelector('[data-part="start-month"]');
      var sd = stage.querySelector('[data-part="start-day"]');
      var ey = stage.querySelector('[data-part="end-year"]');
      var em = stage.querySelector('[data-part="end-month"]');
      var ed = stage.querySelector('[data-part="end-day"]');
      if (rangeStart) {
        sy.textContent = rangeStart.getFullYear();
        sm.textContent = pad(rangeStart.getMonth()+1);
        sd.textContent = pad(rangeStart.getDate());
      } else {
        sy.textContent = '----'; sm.textContent = '--'; sd.textContent = '--';
      }
      if (rangeEnd) {
        ey.textContent = rangeEnd.getFullYear();
        em.textContent = pad(rangeEnd.getMonth()+1);
        ed.textContent = pad(rangeEnd.getDate());
      } else {
        ey.textContent = '----'; em.textContent = '--'; ed.textContent = '--';
      }
    }
  }

  function render() {
    weeksEl.innerHTML = '';
    gridEl.setAttribute('aria-label', viewYear + '년 ' + (viewMonth+1) + '월');
    var first = new Date(viewYear, viewMonth, 1);
    var last  = new Date(viewYear, viewMonth+1, 0);
    var cur   = new Date(first);
    cur.setDate(cur.getDate() - cur.getDay());

    while (cur <= last || cur.getDay() !== 0) {
      var weekEl = document.createElement('div');
      weekEl.className = 'cal__week'; weekEl.setAttribute('role','row');
      for (var i=0; i<7; i++) {
        var d        = new Date(cur);
        var outside  = d.getMonth() !== viewMonth;
        var disabled = !outside && d < today;
        var inactive = outside || disabled;
        var isToday  = isSame(d,today);
        var isSel    = mode==='single' && isSame(d,selected);
        var isStart  = mode==='range'  && isSame(d,rangeStart);
        var isEnd    = mode==='range'  && isSame(d,rangeEnd);
        var inRange  = mode==='range'  && isBetween(d,rangeStart,rangeEnd);
        var effectiveEnd = rangeEnd || hoverDate;
        var goLeft   = effectiveEnd && effectiveEnd < rangeStart;
        var isPreview  = mode==='range' && !rangeEnd && rangeStart && hoverDate && isBetween(d,rangeStart,hoverDate);
        var isHoverEnd = mode==='range' && !rangeEnd && rangeStart && hoverDate && !isStart && isSame(d,hoverDate);

        var btn = document.createElement('button');
        btn.setAttribute('role','gridcell'); btn.setAttribute('type','button');
        btn.dataset.date = d.getFullYear()+','+d.getMonth()+','+d.getDate();
        if (inactive) btn.dataset.inactive='true';

        var cls = ['cal__day'];
        if (inactive)   cls.push('cal__day--'+(outside?'outside':'disabled'));
        if (isToday && !outside) cls.push('cal__day--today');
        if (isSel)      cls.push('cal__day--selected');
        if (isStart) {
          if (!effectiveEnd)  cls.push('cal__day--range-solo');
          else if (rangeEnd)  cls.push(goLeft?'cal__day--range-start-left':'cal__day--range-start');
          else                cls.push(goLeft?'cal__day--range-start-left-pre':'cal__day--range-start-pre');
        }
        if (isEnd)      cls.push('cal__day--range-end');
        if (inRange)    cls.push('cal__day--in-range');
        if (isPreview)  cls.push('cal__day--in-range-preview');
        if (isHoverEnd) cls.push(goLeft?'cal__day--hover-end-left':'cal__day--hover-end');
        btn.className = cls.join(' ');
        btn.setAttribute('tabindex', (!inactive&&(isToday||isSel||isStart))?'0':'-1');
        if (isToday && !outside) btn.setAttribute('aria-current','date');
        if (isSel||isStart||isEnd||inRange) btn.setAttribute('aria-selected','true');
        if (disabled) btn.setAttribute('aria-disabled','true');
        btn.textContent = d.getDate();
        weekEl.appendChild(btn);
        cur.setDate(cur.getDate()+1);
      }
      weeksEl.appendChild(weekEl);
      if (cur > last && cur.getDay()===0) break;
    }
    markDisabledRuns();
    updateParts();
  }

  function markDisabledRuns() {
    var btns = Array.prototype.slice.call(weeksEl.querySelectorAll('.cal__day'));
    var run = [];
    function flush() {
      if (run.length===1) run[0].classList.add('cal__day--disabled-solo');
      else if (run.length>=2) {
        run[0].classList.add('cal__day--disabled-start');
        for (var i=1;i<run.length-1;i++) run[i].classList.add('cal__day--disabled-mid');
        run[run.length-1].classList.add('cal__day--disabled-end');
      }
      run=[];
    }
    btns.forEach(function(b){ if(b.classList.contains('cal__day--disabled')) run.push(b); else flush(); });
    flush();
  }

  function navigate(deltaYear, deltaMonth) {
    viewMonth += deltaMonth;
    viewYear  += deltaYear;
    if (viewMonth > 11) { viewMonth -= 12; viewYear++; }
    if (viewMonth < 0)  { viewMonth += 12; viewYear--; }
    if (isOpen()) render(); else updateParts();
  }

  /* 날짜 클릭 */
  weeksEl.addEventListener('click', function(e) {
    var btn = e.target.closest ? e.target.closest('.cal__day') : e.target;
    if (!btn || btn.dataset.inactive) return;
    var date = fromKey(btn.dataset.date);
    if (mode==='single') {
      selected = date;
      viewYear = date.getFullYear(); viewMonth = date.getMonth();
      render(); closePanel();
    } else {
      if (!rangeStart || rangeEnd) {
        rangeStart=date; rangeEnd=null; hoverDate=null;
      } else if (isSame(rangeStart,date)) {
        rangeStart=null; hoverDate=null;
      } else {
        rangeEnd=date;
        if (rangeEnd<rangeStart) { var t=rangeStart; rangeStart=rangeEnd; rangeEnd=t; }
        hoverDate=null;
        render(); closePanel(); return;
      }
      render();
    }
  });
  weeksEl.addEventListener('mouseover', function(e) {
    if (mode!=='range') return;
    var btn = e.target.closest ? e.target.closest('.cal__day') : e.target;
    if (!btn||btn.dataset.inactive||!rangeStart||rangeEnd) return;
    var d = fromKey(btn.dataset.date);
    if (!isSame(d,hoverDate)) { hoverDate=d; render(); }
  });

  /* 트리거 클릭 (date-parts 영역) */
  function bindFieldToggle(field) {
    field.addEventListener('click', function(e) {
      var arrow = e.target.closest ? e.target.closest('.dp__arrow') : null;
      var today_btn = e.target.closest ? e.target.closest('.dp__today') : null;
      if (arrow || today_btn) return;
      if (isOpen()) closePanel();
      else { render(); openPanel(); }
    });
    field.addEventListener('keydown', function(e) {
      if (e.key==='Enter'||e.key===' ') { e.preventDefault(); isOpen()?closePanel():(render(),openPanel()); }
      if (e.key==='Escape') closePanel();
    });
  }
  bindFieldToggle(fieldSingle);
  bindFieldToggle(fieldRange);

  /* 네비 버튼 */
  function bindNav(prevYId, prevMId, nextMId, nextYId) {
    var pY = stage.querySelector('#'+prevYId);
    var pM = stage.querySelector('#'+prevMId);
    var nM = stage.querySelector('#'+nextMId);
    var nY = stage.querySelector('#'+nextYId);
    if (pY) pY.addEventListener('click', function(e) { e.stopPropagation(); navigate(-1,0); });
    if (pM) pM.addEventListener('click', function(e) { e.stopPropagation(); navigate(0,-1); });
    if (nM) nM.addEventListener('click', function(e) { e.stopPropagation(); navigate(0,1); });
    if (nY) nY.addEventListener('click', function(e) { e.stopPropagation(); navigate(1,0); });
  }
  bindNav('dp-prev-year','dp-prev-month','dp-next-month','dp-next-year');
  bindNav('dp-r-prev-year','dp-r-prev-month','dp-r-next-month','dp-r-next-year');

  /* 오늘 버튼 */
  function goToday() {
    selected = null; rangeStart = null; rangeEnd = null; hoverDate = null;
    viewYear = today.getFullYear(); viewMonth = today.getMonth();
    if (isOpen()) render(); else updateParts();
  }
  var todayBtn = stage.querySelector('#dp-today');
  var rTodayBtn = stage.querySelector('#dp-r-today');
  if (todayBtn)  todayBtn.addEventListener('click',  function(e){ e.stopPropagation(); goToday(); });
  if (rTodayBtn) rTodayBtn.addEventListener('click', function(e){ e.stopPropagation(); goToday(); });

  /* 외부 클릭 · ESC */
  document.addEventListener('click', function(e) { if(!dp.contains(e.target)) closePanel(); });
  document.addEventListener('keydown', function(e) { if(e.key==='Escape') closePanel(); });

  /* Segment 토글 */
  var seg = stage.querySelector('#dp-mode-seg');
  var segSlider = seg.querySelector('.segment__slider');
  function updateSeg() {
    var sel = seg.querySelector('.segment__item--selected');
    segSlider.style.width = sel.offsetWidth+'px';
    segSlider.style.transform = 'translateX('+sel.offsetLeft+'px)';
  }
  segSlider.style.transition='none'; updateSeg(); seg.offsetWidth; segSlider.style.transition='';
  seg.addEventListener('click', function(e) {
    var item = e.target.closest ? e.target.closest('.segment__item') : e.target;
    if (!item) return;
    seg.querySelectorAll('.segment__item').forEach(function(b){ b.classList.remove('segment__item--selected'); b.setAttribute('aria-checked','false'); });
    item.classList.add('segment__item--selected'); item.setAttribute('aria-checked','true');
    updateSeg();
    mode = item.dataset.mode;
    selected=null; rangeStart=null; rangeEnd=null; hoverDate=null;
    closePanel();
    fieldSingle.style.display = mode==='single' ? '' : 'none';
    fieldRange.style.display  = mode==='range'  ? '' : 'none';
    updateParts();
  });

  /* 초기화 */
  updateParts();
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.dp. position:relative — 패널 기준점.
- dp__field = 트리거 행. tabindex="0" + aria-haspopup="dialog" + aria-expanded. dp__arrow(×4) + dp__date-parts + dp__today.
- dp__arrow = 연·월 이동 아이콘 버튼. tabindex="-1" — 트리거 행 포커스 내에서 개별 포커스 불필요. 클릭 이벤트는 stopPropagation으로 패널 토글과 분리.
- dp__date-parts = 연·월·일 파트 버튼 + dp__sep(".") + dp__dow(요일). 파트 버튼은 Dropdown 트리거 스타일(border + border-radius + padding).
- dp__today = 오늘 버튼. brand 색 pill border. 클릭 시 오늘 날짜로 뷰 이동(패널 닫힌 상태 유지).
- dp__field--range = range 모드. dp__date-parts × 2 + dp__range-sep("~"). 네비·오늘은 동일.
- dp__panel = role="dialog". hidden 속성으로 토글. 패널 내부에 .cal > .cal__grid만 포함(헤더 없음 — 트리거 행이 담당).
- dp--open = 열린 상태 클래스 → dp__part border-color 변경.
- dp--disabled = dp__field pointer-events:none, 텍스트·아이콘 disabled 색상.
- dp--error = dp__field border-color error.
-->

### Single

:::preview
<div style="display:flex;gap:var(--space-gap-2xl);flex-wrap:wrap;align-items:flex-start;">

<!-- default (선택 없음) -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">default</span>
  <div data-component class="dp">
    <div class="dp__field" tabindex="0" aria-haspopup="dialog" aria-expanded="false" aria-label="날짜 선택">
      <button class="dp__arrow" type="button" aria-label="1년 이전" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-left"/></svg></span>
      </button>
      <button class="dp__arrow" type="button" aria-label="이전 달" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <div class="dp__date-parts">
        <button class="dp__part" type="button" aria-label="연도">2026</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part" type="button" aria-label="월">06</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part dp__part--placeholder" type="button" aria-label="일">--</button>
        <span class="dp__dow" aria-hidden="true"></span>
      </div>
      <button class="dp__today" type="button">오늘</button>
      <button class="dp__arrow" type="button" aria-label="다음 달" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
      <button class="dp__arrow" type="button" aria-label="1년 이후" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-right"/></svg></span>
      </button>
    </div>
  </div>
</div>

<!-- open + selected -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">open</span>
  <div data-component class="dp dp--open">
    <div class="dp__field" tabindex="0" aria-haspopup="dialog" aria-expanded="true" aria-label="날짜 선택">
      <button class="dp__arrow" type="button" aria-label="1년 이전" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-left"/></svg></span>
      </button>
      <button class="dp__arrow" type="button" aria-label="이전 달" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <div class="dp__date-parts">
        <button class="dp__part" type="button" aria-label="연도">2026</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part" type="button" aria-label="월">06</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part" type="button" aria-label="일">10</button>
        <span class="dp__dow" aria-hidden="true">수</span>
      </div>
      <button class="dp__today" type="button">오늘</button>
      <button class="dp__arrow" type="button" aria-label="다음 달" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
      <button class="dp__arrow" type="button" aria-label="1년 이후" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-right"/></svg></span>
      </button>
    </div>
    <div class="dp__panel" role="dialog" aria-label="날짜 선택">
      <div class="cal">
        <div class="cal__grid" role="grid" aria-label="2026년 6월">
          <div class="cal__weekdays" role="row">
            <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span>
            <span class="cal__weekday" role="columnheader" aria-label="월요일">월</span>
            <span class="cal__weekday" role="columnheader" aria-label="화요일">화</span>
            <span class="cal__weekday" role="columnheader" aria-label="수요일">수</span>
            <span class="cal__weekday" role="columnheader" aria-label="목요일">목</span>
            <span class="cal__weekday" role="columnheader" aria-label="금요일">금</span>
            <span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 5월 31일" tabindex="-1">31</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 1일" tabindex="-1">1</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 2일" tabindex="-1">2</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 3일" tabindex="-1">3</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 4일" tabindex="-1">4</button>
            <button class="cal__day cal__day--today" role="gridcell" aria-label="2026년 6월 5일, 오늘" aria-current="date" tabindex="-1">5</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 6일" tabindex="-1">6</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 7일" tabindex="-1">7</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 8일" tabindex="-1">8</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 9일" tabindex="-1">9</button>
            <button class="cal__day cal__day--selected" role="gridcell" aria-label="2026년 6월 10일, 선택됨" aria-selected="true" tabindex="0">10</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 11일" tabindex="-1">11</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 12일" tabindex="-1">12</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 13일" tabindex="-1">13</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 14일" tabindex="-1">14</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 15일" tabindex="-1">15</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 16일" tabindex="-1">16</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 17일" tabindex="-1">17</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 18일" tabindex="-1">18</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 19일" tabindex="-1">19</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 20일" tabindex="-1">20</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 21일" tabindex="-1">21</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 22일" tabindex="-1">22</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 23일" tabindex="-1">23</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 24일" tabindex="-1">24</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 25일" tabindex="-1">25</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 26일" tabindex="-1">26</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 27일" tabindex="-1">27</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 28일" tabindex="-1">28</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 29일" tabindex="-1">29</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 30일" tabindex="-1">30</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 1일" tabindex="-1">1</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 2일" tabindex="-1">2</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 3일" tabindex="-1">3</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 4일" tabindex="-1">4</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- disabled -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">disabled</span>
  <div data-component class="dp dp--disabled">
    <div class="dp__field" tabindex="-1" aria-haspopup="dialog" aria-expanded="false" aria-disabled="true" aria-label="날짜 선택">
      <button class="dp__arrow" type="button" aria-label="1년 이전" disabled tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-left"/></svg></span>
      </button>
      <button class="dp__arrow" type="button" aria-label="이전 달" disabled tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <div class="dp__date-parts">
        <button class="dp__part" type="button" aria-label="연도" disabled>2026</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part" type="button" aria-label="월" disabled>06</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part" type="button" aria-label="일" disabled>10</button>
        <span class="dp__dow" aria-hidden="true">수</span>
      </div>
      <button class="dp__today" type="button" disabled>오늘</button>
      <button class="dp__arrow" type="button" aria-label="다음 달" disabled tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
      <button class="dp__arrow" type="button" aria-label="1년 이후" disabled tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-right"/></svg></span>
      </button>
    </div>
  </div>
</div>

<!-- error -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">error</span>
  <div data-component class="dp dp--error">
    <div class="dp__field" tabindex="0" aria-haspopup="dialog" aria-expanded="false" aria-invalid="true" aria-label="날짜 선택">
      <button class="dp__arrow" type="button" aria-label="1년 이전" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-left"/></svg></span>
      </button>
      <button class="dp__arrow" type="button" aria-label="이전 달" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <div class="dp__date-parts">
        <button class="dp__part" type="button" aria-label="연도">2026</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part" type="button" aria-label="월">06</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part dp__part--placeholder" type="button" aria-label="일">--</button>
        <span class="dp__dow" aria-hidden="true"></span>
      </div>
      <button class="dp__today" type="button">오늘</button>
      <button class="dp__arrow" type="button" aria-label="다음 달" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
      <button class="dp__arrow" type="button" aria-label="1년 이후" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-right"/></svg></span>
      </button>
    </div>
  </div>
</div>

</div>
:::

### Range

:::preview
<div style="display:flex;gap:var(--space-gap-2xl);flex-wrap:wrap;align-items:flex-start;">

<!-- default -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">default</span>
  <div data-component class="dp">
    <div class="dp__field dp__field--range" tabindex="0" aria-haspopup="dialog" aria-expanded="false" aria-label="기간 선택">
      <button class="dp__arrow" type="button" aria-label="1년 이전" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-left"/></svg></span>
      </button>
      <button class="dp__arrow" type="button" aria-label="이전 달" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <div class="dp__date-parts">
        <button class="dp__part" type="button" aria-label="시작 연도">2026</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part" type="button" aria-label="시작 월">06</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part dp__part--placeholder" type="button" aria-label="시작 일">--</button>
      </div>
      <span class="dp__range-sep" aria-hidden="true">~</span>
      <div class="dp__date-parts">
        <button class="dp__part dp__part--placeholder" type="button" aria-label="종료 연도">----</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part dp__part--placeholder" type="button" aria-label="종료 월">--</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part dp__part--placeholder" type="button" aria-label="종료 일">--</button>
      </div>
      <button class="dp__today" type="button">오늘</button>
      <button class="dp__arrow" type="button" aria-label="다음 달" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
      <button class="dp__arrow" type="button" aria-label="1년 이후" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-right"/></svg></span>
      </button>
    </div>
  </div>
</div>

<!-- open + selected -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">open</span>
  <div data-component class="dp dp--open">
    <div class="dp__field dp__field--range" tabindex="0" aria-haspopup="dialog" aria-expanded="true" aria-label="기간 선택">
      <button class="dp__arrow" type="button" aria-label="1년 이전" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-left"/></svg></span>
      </button>
      <button class="dp__arrow" type="button" aria-label="이전 달" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <div class="dp__date-parts">
        <button class="dp__part" type="button" aria-label="시작 연도">2026</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part" type="button" aria-label="시작 월">06</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part" type="button" aria-label="시작 일">09</button>
      </div>
      <span class="dp__range-sep" aria-hidden="true">~</span>
      <div class="dp__date-parts">
        <button class="dp__part" type="button" aria-label="종료 연도">2026</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part" type="button" aria-label="종료 월">06</button>
        <span class="dp__sep" aria-hidden="true">.</span>
        <button class="dp__part" type="button" aria-label="종료 일">16</button>
      </div>
      <button class="dp__today" type="button">오늘</button>
      <button class="dp__arrow" type="button" aria-label="다음 달" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
      <button class="dp__arrow" type="button" aria-label="1년 이후" tabindex="-1">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-double-right"/></svg></span>
      </button>
    </div>
    <div class="dp__panel" role="dialog" aria-label="기간 선택" aria-multiselectable="true">
      <div class="cal">
        <div class="cal__grid" role="grid" aria-label="2026년 6월" aria-multiselectable="true">
          <div class="cal__weekdays" role="row">
            <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span>
            <span class="cal__weekday" role="columnheader" aria-label="월요일">월</span>
            <span class="cal__weekday" role="columnheader" aria-label="화요일">화</span>
            <span class="cal__weekday" role="columnheader" aria-label="수요일">수</span>
            <span class="cal__weekday" role="columnheader" aria-label="목요일">목</span>
            <span class="cal__weekday" role="columnheader" aria-label="금요일">금</span>
            <span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 5월 31일" tabindex="-1">31</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 1일" tabindex="-1">1</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 2일" tabindex="-1">2</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 3일" tabindex="-1">3</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 4일" tabindex="-1">4</button>
            <button class="cal__day cal__day--today" role="gridcell" aria-label="2026년 6월 5일, 오늘" aria-current="date" tabindex="-1">5</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 6일" tabindex="-1">6</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 7일" tabindex="-1">7</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 8일" tabindex="-1">8</button>
            <button class="cal__day cal__day--range-start" role="gridcell" aria-label="2026년 6월 9일, 시작일" aria-selected="true" tabindex="0">9</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 10일" aria-selected="true" tabindex="-1">10</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 11일" aria-selected="true" tabindex="-1">11</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 12일" aria-selected="true" tabindex="-1">12</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 13일" aria-selected="true" tabindex="-1">13</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 14일" aria-selected="true" tabindex="-1">14</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 15일" aria-selected="true" tabindex="-1">15</button>
            <button class="cal__day cal__day--range-end" role="gridcell" aria-label="2026년 6월 16일, 종료일" aria-selected="true" tabindex="0">16</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 17일" tabindex="-1">17</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 18일" tabindex="-1">18</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 19일" tabindex="-1">19</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 20일" tabindex="-1">20</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 21일" tabindex="-1">21</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 22일" tabindex="-1">22</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 23일" tabindex="-1">23</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 24일" tabindex="-1">24</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 25일" tabindex="-1">25</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 26일" tabindex="-1">26</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 27일" tabindex="-1">27</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 28일" tabindex="-1">28</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 29일" tabindex="-1">29</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 30일" tabindex="-1">30</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 1일" tabindex="-1">1</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 2일" tabindex="-1">2</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 3일" tabindex="-1">3</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 4일" tabindex="-1">4</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</div>
:::

---

## CSS

```css
/* ── Root ── */
/* position:relative — 패널(absolute)의 기준점 */
.dp {
  position: relative;
  display: inline-flex;
  flex-direction: column;
}

/* ── Field (트리거 행) ── */
.dp__field {
  display: flex;
  align-items: center;
  gap: var(--space-gap-xs);
  height: var(--height-base);
  padding: 0 var(--space-inset-xs);
  cursor: pointer;
}
.dp__field:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
  border-radius: var(--radius-sm);
}

/* ── Date parts wrapper ── */
.dp__date-parts {
  display: flex;
  align-items: center;
  gap: var(--space-gap-2xs);
  flex: 1;
}

/* ── Part button — Dropdown 트리거 스타일 ── */
.dp__part {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--height-compact);
  padding: 0 var(--space-inset-sm);
  border: var(--stroke-sm) solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-surface-base);
  color: var(--color-text-display);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-ui);
  letter-spacing: var(--letter-spacing-normal);
  cursor: pointer;
  white-space: nowrap;
  transition: border-color var(--duration-fast) var(--easing-base);
}
.dp__part:hover { border-color: var(--color-fill-brand); }
.dp__part:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
  border-color: var(--color-border-focus);
}
/* 열린 상태 — 파트 border 강조 */
.dp--open .dp__part { border-color: var(--color-border-focus); }

/* 미선택 파트 — placeholder 색 */
.dp__part--placeholder {
  color: var(--color-text-placeholder);
  font-weight: var(--font-weight-body);
}

/* ── Separator (.) ── */
.dp__sep {
  color: var(--color-text-subtle);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

/* ── Day of week ── */
.dp__dow {
  font-size: var(--font-size-label);
  color: var(--color-text-subtle);
  line-height: var(--line-height-ui);
  flex-shrink: 0;
  min-width: 1em;
}

/* ── Range separator (~) ── */
.dp__range-sep {
  color: var(--color-text-subtle);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  flex-shrink: 0;
}

/* ── Today button ── */
.dp__today {
  display: inline-flex;
  align-items: center;
  height: var(--height-compact);
  padding: 0 var(--space-inset-sm);
  border: var(--stroke-sm) solid var(--color-fill-brand);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-fill-brand);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-body);
  line-height: var(--line-height-ui);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background var(--duration-fast) var(--easing-base);
}
.dp__today:hover { background: var(--color-surface-brand-subtle); }
.dp__today:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Arrow nav buttons ── */
.dp__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--height-compact);
  height: var(--height-compact);
  border: none;
  border-radius: var(--radius-xs);
  background: transparent;
  color: var(--color-text-subtle);
  cursor: pointer;
  flex-shrink: 0;
  transition: background var(--duration-fast) var(--easing-base),
              color var(--duration-fast) var(--easing-base);
}
.dp__arrow:hover {
  background: var(--color-action-neutral-hover);
  color: var(--color-text-body);
}
.dp__arrow:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Panel ── */
/* 트리거 행 바로 아래 absolute 드롭다운 */
.dp__panel {
  position: absolute;
  top: calc(100% + var(--space-gap-xs));
  left: 0;
  z-index: var(--z-dropdown);
  padding: var(--space-inset-sm);
  background: var(--color-surface-base);
  border: var(--stroke-sm) solid var(--color-border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}
.dp__panel[hidden] { display: none; }

/* ── Disabled ── */
.dp--disabled .dp__field {
  pointer-events: none;
  cursor: default;
}
.dp--disabled .dp__part {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  color: var(--color-text-disabled);
}
.dp--disabled .dp__sep,
.dp--disabled .dp__dow,
.dp--disabled .dp__range-sep { color: var(--color-text-disabled); }
.dp--disabled .dp__today {
  border-color: var(--color-border-disabled);
  color: var(--color-text-disabled);
}
.dp--disabled .dp__arrow { color: var(--color-text-disabled); }

/* ── Error ── */
.dp--error .dp__part { border-color: var(--color-border-error); }
.dp--error .dp__part:hover { border-color: var(--color-border-error); }
.dp--open.dp--error .dp__part { border-color: var(--color-border-error); }
```

---

## 접근성

| 요소 | 마크업 |
|------|--------|
| 트리거 필드 | `tabindex="0"` + `aria-haspopup="dialog"` + `aria-expanded="true\|false"` + `aria-label` |
| 연·월·일 파트 버튼 | `aria-label="연도"` · `"월"` · `"일"` (또는 `"시작 연도"` 등 range 맥락에 맞게) |
| 화살표 버튼 | `aria-label="이전 달"` · `"다음 달"` · `"1년 이전"` · `"1년 이후"` · `tabindex="-1"` (트리거 행 포커스 내 처리) |
| 패널 | `role="dialog"` + `aria-label="날짜 선택"` |
| 패널 (range) | `aria-multiselectable="true"` 추가 |
| disabled | 트리거 필드에 `aria-disabled="true"` + `tabindex="-1"`. 각 버튼에 `disabled` 속성 |
| error | 트리거 필드에 `aria-invalid="true"` |

패널 토글은 `hidden` 속성으로 처리한다 (`display:none` 직접 조작 금지).

### 키보드 내비게이션

| 키 | 동작 |
|----|------|
| `Enter` / `Space` | 트리거 필드(date-parts 영역)에서 패널 열기/닫기 |
| `Esc` | 패널 닫기 |
| `Tab` | 패널 내 캘린더 그리드로 포커스 이동 |
| 그리드 내 키 | Calendar Atom 키보드 내비게이션 규칙 적용 |

화살표 버튼(`dp__arrow`)과 오늘 버튼(`dp__today`)은 `tabindex="-1"`로 설정하고 클릭 이벤트에서 `stopPropagation()` 호출해 패널 토글과 분리한다.

---

## Do / Don't

> ✅ DO — 파트 버튼에 Dropdown 트리거와 동일한 border + border-radius 스타일 적용
> 폼 컨텍스트 내 다른 입력 요소와 시각 계층을 통일한다

> ✅ DO — 연도·월·일이 모두 미선택일 때 `dp__part--placeholder` 클래스로 placeholder 색 처리
> `----` · `--` placeholder 텍스트는 `dp__part--placeholder`와 함께 사용한다

> ✅ DO — `«` / `»` 클릭 시 패널이 열려 있으면 캘린더 그리드도 함께 갱신
> 네비 버튼 클릭은 항상 `stopPropagation()`으로 패널 토글과 분리한다

> ✅ DO — range 모드에서 두 번째 날짜 선택 후 패널 자동 닫기

> ❌ DON'T — 네이티브 `<input type="date">` 사용
> 브라우저마다 UI가 달라 디자인 시스템 스타일을 적용할 수 없다

> ❌ DON'T — `dp__arrow`에 `tabindex="0"` 지정
> 화살표 버튼은 트리거 행 내부 보조 조작이므로 포커스 순서에서 제외한다

> ❌ DON'T — `data-component` 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용이다
