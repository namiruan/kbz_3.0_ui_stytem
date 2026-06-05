---
file: components/molecules/date-picker.md
version: 1.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, tokens/typography.md, tokens/elevation.md, tokens/icon.md, components/atoms/calendar.md, components/atoms/icon.md
---

# DatePicker

## 개요

입력 필드를 클릭하거나 달력 아이콘 버튼을 눌러 Calendar 패널을 열고 날짜를 선택하는 Molecule.

- **single**: 날짜 하나를 선택해 `YYYY.MM.DD` 형식으로 표시
- **range**: 시작일·종료일을 순서대로 선택, `YYYY.MM.DD ~ YYYY.MM.DD` 형식으로 표시

Calendar Atom이 날짜 그리드를 담당하고, DatePicker는 트리거 필드·패널 컨테이너·월 내비게이션 헤더를 추가한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| mode | single · range | single |
| state | default · open · disabled · error | default |

---

## 동작

단일/범위 모드 전환, 패널 열기·닫기, 월 이동, 날짜 선택을 확인할 수 있다.

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-lg);align-items:flex-start;">
<div role="radiogroup" aria-label="선택 모드" class="segment" id="dp-mode-seg">
  <span class="segment__slider" aria-hidden="true"></span>
  <button class="segment__item segment__item--selected" role="radio" aria-checked="true" data-mode="single">단일</button>
  <button class="segment__item" role="radio" aria-checked="false" data-mode="range">범위</button>
</div>
<div class="dp" id="dp-live" style="width:280px;">
  <!-- 단일 트리거 -->
  <div class="dp__field" id="dp-field-single" role="button" tabindex="0" aria-haspopup="dialog" aria-expanded="false" aria-label="날짜 선택">
    <input class="dp__input" id="dp-input-single" type="text" readonly placeholder="날짜 선택">
    <span class="dp__icon-btn" aria-hidden="true">
      <span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
    </span>
  </div>
  <!-- 범위 트리거 (초기 숨김) -->
  <div class="dp__field dp__field--range" id="dp-field-range" role="button" tabindex="0" aria-haspopup="dialog" aria-expanded="false" aria-label="기간 선택" style="display:none;">
    <input class="dp__input" id="dp-input-start" type="text" readonly placeholder="시작일">
    <span class="dp__range-sep" aria-hidden="true">~</span>
    <input class="dp__input" id="dp-input-end" type="text" readonly placeholder="종료일">
    <span class="dp__icon-btn" aria-hidden="true">
      <span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
    </span>
  </div>
  <!-- 패널 -->
  <div class="dp__panel" id="dp-panel" role="dialog" aria-label="날짜 선택" hidden>
    <div class="dp__header">
      <button class="dp__nav-btn" id="dp-prev" type="button" aria-label="이전 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <span class="dp__month-label" id="dp-month-label" aria-live="polite"></span>
      <button class="dp__nav-btn" id="dp-next" type="button" aria-label="다음 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
    </div>
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
  var today = new Date(); today.setHours(0,0,0,0);
  var mode = 'single';
  var viewYear = today.getFullYear(), viewMonth = today.getMonth();
  var selected = null, rangeStart = null, rangeEnd = null, hoverDate = null;

  var dp        = stage.querySelector('#dp-live');
  var panel     = stage.querySelector('#dp-panel');
  var weeksEl   = stage.querySelector('#dp-weeks');
  var gridEl    = stage.querySelector('#dp-cal-grid');
  var labelEl   = stage.querySelector('#dp-month-label');
  var fieldSingle = stage.querySelector('#dp-field-single');
  var fieldRange  = stage.querySelector('#dp-field-range');
  var inputSingle = stage.querySelector('#dp-input-single');
  var inputStart  = stage.querySelector('#dp-input-start');
  var inputEnd    = stage.querySelector('#dp-input-end');

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function fmt(d) { return d.getFullYear() + '.' + pad(d.getMonth()+1) + '.' + pad(d.getDate()); }
  function isSame(a,b) { return a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
  function isBetween(d,s,e) { if(!s||!e) return false; var lo=s<e?s:e,hi=s<e?e:s; return d>lo&&d<hi; }
  function fromKey(k) { var p=k.split(','); return new Date(+p[0],+p[1],+p[2]); }

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
  function isOpen() { return !panel.hasAttribute('hidden'); }

  function updateInputs() {
    if (mode==='single') {
      inputSingle.value = selected ? fmt(selected) : '';
    } else {
      inputStart.value = rangeStart ? fmt(rangeStart) : '';
      inputEnd.value   = rangeEnd   ? fmt(rangeEnd)   : '';
    }
  }

  function render() {
    weeksEl.innerHTML = '';
    labelEl.textContent = viewYear + '년 ' + (viewMonth+1) + '월';
    gridEl.setAttribute('aria-label', viewYear + '년 ' + (viewMonth+1) + '월');

    var first = new Date(viewYear, viewMonth, 1);
    var last  = new Date(viewYear, viewMonth+1, 0);
    var cur   = new Date(first);
    cur.setDate(cur.getDate() - cur.getDay());

    while (cur <= last || cur.getDay() !== 0) {
      var weekEl = document.createElement('div');
      weekEl.className = 'cal__week'; weekEl.setAttribute('role','row');

      for (var i=0; i<7; i++) {
        var d       = new Date(cur);
        var outside = d.getMonth() !== viewMonth;
        var disabled= !outside && d < today;
        var inactive= outside || disabled;
        var isToday = isSame(d,today);
        var isSel   = mode==='single' && isSame(d,selected);
        var isStart = mode==='range'  && isSame(d,rangeStart);
        var isEnd   = mode==='range'  && isSame(d,rangeEnd);
        var inRange = mode==='range'  && isBetween(d,rangeStart,rangeEnd);
        var effectiveEnd = rangeEnd || hoverDate;
        var goLeft  = effectiveEnd && effectiveEnd < rangeStart;
        var isPreview  = mode==='range' && !rangeEnd && rangeStart && hoverDate && isBetween(d,rangeStart,hoverDate);
        var isHoverEnd = mode==='range' && !rangeEnd && rangeStart && hoverDate && !isStart && isSame(d,hoverDate);

        var btn = document.createElement('button');
        btn.setAttribute('role','gridcell');
        btn.setAttribute('type','button');
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

        btn.setAttribute('tabindex', (!inactive && (isToday||isSel||isStart)) ? '0' : '-1');
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
  }

  function markDisabledRuns() {
    var btns = Array.prototype.slice.call(weeksEl.querySelectorAll('.cal__day'));
    var run = [];
    function flush() {
      if (run.length===1) { run[0].classList.add('cal__day--disabled-solo'); }
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

  /* 클릭 이벤트 */
  weeksEl.addEventListener('click', function(e) {
    var btn = e.target.closest ? e.target.closest('.cal__day') : e.target;
    if (!btn || btn.dataset.inactive) return;
    var date = fromKey(btn.dataset.date);
    if (mode==='single') {
      selected = date;
      updateInputs();
      closePanel();
    } else {
      if (!rangeStart || rangeEnd) {
        rangeStart=date; rangeEnd=null; hoverDate=null;
      } else if (isSame(rangeStart,date)) {
        rangeStart=null; hoverDate=null;
      } else {
        rangeEnd=date;
        if (rangeEnd<rangeStart) { var t=rangeStart; rangeStart=rangeEnd; rangeEnd=t; }
        hoverDate=null;
        updateInputs();
        closePanel();
      }
    }
    render();
  });

  weeksEl.addEventListener('mouseover', function(e) {
    if (mode!=='range') return;
    var btn = e.target.closest ? e.target.closest('.cal__day') : e.target;
    if (!btn||btn.dataset.inactive||!rangeStart||rangeEnd) return;
    var d = fromKey(btn.dataset.date);
    if (!isSame(d,hoverDate)) { hoverDate=d; render(); }
  });

  /* 트리거 클릭 */
  [fieldSingle, fieldRange].forEach(function(f) {
    f.addEventListener('click', function() { isOpen() ? closePanel() : (render(), openPanel()); });
    f.addEventListener('keydown', function(e) {
      if (e.key==='Enter'||e.key===' ') { e.preventDefault(); isOpen() ? closePanel() : (render(), openPanel()); }
      if (e.key==='Escape') closePanel();
    });
  });

  /* 월 이동 */
  stage.querySelector('#dp-prev').addEventListener('click', function() {
    viewMonth--; if(viewMonth<0){viewMonth=11;viewYear--;} render();
  });
  stage.querySelector('#dp-next').addEventListener('click', function() {
    viewMonth++; if(viewMonth>11){viewMonth=0;viewYear++;} render();
  });

  /* 외부 클릭 닫기 */
  document.addEventListener('click', function(e) {
    if (!dp.contains(e.target)) closePanel();
  });

  /* ESC 닫기 */
  document.addEventListener('keydown', function(e) {
    if (e.key==='Escape') closePanel();
  });

  /* Segment 토글 */
  var seg = stage.querySelector('#dp-mode-seg');
  var segSlider = seg.querySelector('.segment__slider');
  function updateSegSlider() {
    var sel = seg.querySelector('.segment__item--selected');
    segSlider.style.width = sel.offsetWidth+'px';
    segSlider.style.transform = 'translateX('+sel.offsetLeft+'px)';
  }
  segSlider.style.transition='none'; updateSegSlider(); seg.offsetWidth; segSlider.style.transition='';
  seg.addEventListener('click', function(e) {
    var item = e.target.closest ? e.target.closest('.segment__item') : e.target;
    if (!item) return;
    seg.querySelectorAll('.segment__item').forEach(function(b){
      b.classList.remove('segment__item--selected'); b.setAttribute('aria-checked','false');
    });
    item.classList.add('segment__item--selected'); item.setAttribute('aria-checked','true');
    updateSegSlider();
    mode = item.dataset.mode;
    selected=null; rangeStart=null; rangeEnd=null; hoverDate=null;
    closePanel();
    fieldSingle.style.display = mode==='single' ? '' : 'none';
    fieldRange.style.display  = mode==='range'  ? '' : 'none';
    updateInputs();
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.dp. position:relative — 패널 기준점.
- dp__field = 트리거 필드. role="button" + aria-haspopup="dialog" + aria-expanded="true|false". 클릭 시 패널 토글.
- dp__field--range = range 모드 필드. input 두 개 + dp__range-sep("~") + dp__icon-btn.
- dp__input = readonly text input. 포커스·클릭 모두 dp__field가 처리 — input 자체 클릭도 패널 열기로 이어짐.
- dp__icon-btn = 달력 아이콘 버튼. 클릭 이벤트는 dp__field에 위임.
- dp__panel = role="dialog" + aria-label. 기본 hidden. 열릴 때 hidden 제거, 닫힐 때 hidden 추가.
- dp__header = 이전 달 버튼 + 월·년 레이블 + 다음 달 버튼. 레이블에 aria-live="polite".
- cal = Calendar Atom 루트 (그리드만, cal__grid 직접 포함).
- 열린 상태: dp에 dp--open 클래스 → 필드 border-color 변경 + 아이콘 색 변경.
- disabled: dp에 dp--disabled → 필드 배경·텍스트·아이콘 전부 disabled 처리.
- error: dp에 dp--error → 필드 border-color error.
-->

### Single

:::preview
<div style="display:flex;gap:var(--space-gap-xl);flex-wrap:wrap;align-items:flex-start;">

<!-- default -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">default</span>
  <div data-component class="dp" style="width:280px;">
    <div class="dp__field" role="button" tabindex="0" aria-haspopup="dialog" aria-expanded="false" aria-label="날짜 선택">
      <input class="dp__input" type="text" readonly placeholder="날짜 선택">
      <span class="dp__icon-btn" aria-hidden="true">
        <span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
      </span>
    </div>
  </div>
</div>

<!-- open + selected -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">open</span>
  <div data-component class="dp dp--open" style="width:280px;">
    <div class="dp__field" role="button" tabindex="0" aria-haspopup="dialog" aria-expanded="true" aria-label="날짜 선택">
      <input class="dp__input" type="text" readonly value="2026.06.10">
      <span class="dp__icon-btn" aria-hidden="true">
        <span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
      </span>
    </div>
    <div class="dp__panel" role="dialog" aria-label="날짜 선택">
      <div class="dp__header">
        <button class="dp__nav-btn" type="button" aria-label="이전 달">
          <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
        </button>
        <span class="dp__month-label">2026년 6월</span>
        <button class="dp__nav-btn" type="button" aria-label="다음 달">
          <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
        </button>
      </div>
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
  <div data-component class="dp dp--disabled" style="width:280px;">
    <div class="dp__field" role="button" tabindex="-1" aria-haspopup="dialog" aria-expanded="false" aria-disabled="true" aria-label="날짜 선택">
      <input class="dp__input" type="text" readonly placeholder="날짜 선택" disabled>
      <span class="dp__icon-btn" aria-hidden="true">
        <span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
      </span>
    </div>
  </div>
</div>

<!-- error -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">error</span>
  <div data-component class="dp dp--error" style="width:280px;">
    <div class="dp__field" role="button" tabindex="0" aria-haspopup="dialog" aria-expanded="false" aria-label="날짜 선택" aria-invalid="true">
      <input class="dp__input" type="text" readonly placeholder="날짜 선택">
      <span class="dp__icon-btn" aria-hidden="true">
        <span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
      </span>
    </div>
  </div>
</div>

</div>
:::

### Range

:::preview
<div style="display:flex;gap:var(--space-gap-xl);flex-wrap:wrap;align-items:flex-start;">

<!-- default -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">default</span>
  <div data-component class="dp" style="width:320px;">
    <div class="dp__field dp__field--range" role="button" tabindex="0" aria-haspopup="dialog" aria-expanded="false" aria-label="기간 선택">
      <input class="dp__input" type="text" readonly placeholder="시작일">
      <span class="dp__range-sep" aria-hidden="true">~</span>
      <input class="dp__input" type="text" readonly placeholder="종료일">
      <span class="dp__icon-btn" aria-hidden="true">
        <span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
      </span>
    </div>
  </div>
</div>

<!-- open + range selected -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">open</span>
  <div data-component class="dp dp--open" style="width:320px;">
    <div class="dp__field dp__field--range" role="button" tabindex="0" aria-haspopup="dialog" aria-expanded="true" aria-label="기간 선택">
      <input class="dp__input" type="text" readonly value="2026.06.09">
      <span class="dp__range-sep" aria-hidden="true">~</span>
      <input class="dp__input" type="text" readonly value="2026.06.16">
      <span class="dp__icon-btn" aria-hidden="true">
        <span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
      </span>
    </div>
    <div class="dp__panel" role="dialog" aria-label="기간 선택" aria-multiselectable="true">
      <div class="dp__header">
        <button class="dp__nav-btn" type="button" aria-label="이전 달">
          <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
        </button>
        <span class="dp__month-label">2026년 6월</span>
        <button class="dp__nav-btn" type="button" aria-label="다음 달">
          <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
        </button>
      </div>
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

/* ── Field (트리거) ── */
.dp__field {
  display: flex;
  align-items: center;
  height: var(--height-base);
  padding: 0 var(--space-inset-sm);
  gap: var(--space-gap-xs);
  border: var(--stroke-sm) solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-surface-base);
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--easing-base);
}
.dp__field:hover { border-color: var(--color-border-strong); }
.dp--open .dp__field { border-color: var(--color-border-focus); }
.dp__field:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Input ── */
.dp__input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: var(--color-text-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  letter-spacing: var(--letter-spacing-normal);
  cursor: pointer;
  outline: none;
  pointer-events: none;
}
.dp__input::placeholder { color: var(--color-text-placeholder); }

/* ── Range separator ── */
.dp__range-sep {
  color: var(--color-text-subtle);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  flex-shrink: 0;
}

/* ── Icon button ── */
.dp__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--height-compact);
  height: var(--height-compact);
  flex-shrink: 0;
  color: var(--color-text-subtle);
  border-radius: var(--radius-xs);
  transition: color var(--duration-fast) var(--easing-base);
}
.dp__field:hover .dp__icon-btn { color: var(--color-text-body); }
.dp--open .dp__icon-btn { color: var(--color-fill-brand); }

/* ── Panel ── */
.dp__panel {
  position: absolute;
  top: calc(100% + var(--space-gap-xs));
  left: 0;
  z-index: var(--z-dropdown);
  padding: var(--space-inset-md);
  background: var(--color-surface-base);
  border: var(--stroke-sm) solid var(--color-border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}
.dp__panel[hidden] { display: none; }

/* ── Panel header ── */
.dp__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-gap-sm);
}

.dp__month-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-display);
  line-height: var(--line-height-ui);
}

.dp__nav-btn {
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
  transition: background var(--duration-fast) var(--easing-base),
              color var(--duration-fast) var(--easing-base);
}
.dp__nav-btn:hover {
  background: var(--color-action-neutral-hover);
  color: var(--color-text-body);
}
.dp__nav-btn:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Disabled ── */
.dp--disabled .dp__field {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  pointer-events: none;
  cursor: default;
}
.dp--disabled .dp__input { color: var(--color-text-disabled); }
.dp--disabled .dp__range-sep { color: var(--color-text-disabled); }
.dp--disabled .dp__icon-btn { color: var(--color-text-disabled); }

/* ── Error ── */
.dp--error .dp__field { border-color: var(--color-border-error); }
.dp--error .dp__field:hover { border-color: var(--color-border-error); }
.dp--open.dp--error .dp__field { border-color: var(--color-border-error); }
```

---

## 접근성

| 요소 | 마크업 |
|------|--------|
| 트리거 필드 | `role="button"` + `aria-haspopup="dialog"` + `aria-expanded="true\|false"` + `aria-label="날짜 선택"` |
| 트리거 필드 (range) | 동일 + `aria-label="기간 선택"` |
| 트리거 필드 (disabled) | `aria-disabled="true"` + `tabindex="-1"` |
| 트리거 필드 (error) | `aria-invalid="true"` |
| 패널 | `role="dialog"` + `aria-label="날짜 선택"` |
| 패널 (range) | `role="dialog"` + `aria-label="기간 선택"` + `aria-multiselectable="true"` |
| 월 레이블 | `aria-live="polite"` — 월 이동 시 스크린 리더에 변경 고지 |
| 이전/다음 달 버튼 | `aria-label="이전 달"` · `aria-label="다음 달"` |
| 캘린더 그리드 | Calendar Atom의 `role="grid"` + `aria-label="YYYY년 M월"` 패턴 그대로 사용 |

패널이 닫힐 때 `hidden` 속성을 추가해 스크린 리더 접근을 차단한다. `display:none` 직접 조작 대신 `hidden` 속성을 토글해 HTML 시맨틱을 유지한다.

### 키보드 내비게이션

| 키 | 동작 |
|----|------|
| `Enter` / `Space` | 트리거 필드에서 패널 열기/닫기 |
| `Esc` | 패널 닫기, 포커스 트리거 필드로 복귀 |
| `Tab` | 패널 내 이전 달 버튼 → 다음 달 버튼 → 캘린더 그리드 순환 |
| 그리드 내 키 | Calendar Atom 문서의 키보드 내비게이션 규칙을 따름 |

---

## Do / Don't

> ✅ DO — 트리거 필드에 `role="button"` + `aria-haspopup="dialog"` + `aria-expanded` 사용
> 네이티브 `<button>` 대신 `<div role="button">`을 써야 할 경우에도 이 세 속성은 필수다

> ❌ DON'T — `<input type="date">` 네이티브 요소를 그대로 사용
> 브라우저마다 UI가 달라 디자인 시스템의 스타일을 적용할 수 없다

> ✅ DO — 패널 토글에 `hidden` 속성 사용
> `panel.hidden = true` / `panel.removeAttribute('hidden')`

> ✅ DO — 월 이동 시 `cal__grid`의 `aria-label`도 함께 업데이트
> `calGrid.setAttribute('aria-label', '2026년 7월')`

> ✅ DO — range 모드에서 두 번째 클릭 후 패널을 자동으로 닫기
> 종료일이 확정되면 즉시 닫아 선택 완료를 명확히 전달한다

> ❌ DON'T — range 모드 중 외부 클릭 시 첫 번째 선택(rangeStart)을 유지
> 외부 클릭은 선택 취소로 처리해 모호한 상태를 방지한다

> ❌ DON'T — `data-component` 속성을 실제 코드에 포함
> `data-component`는 디자인 시스템 문서 뷰어 전용이다
