---
file: components/molecules/date-picker.md
version: 2.0.0
status: draft
depends-on: components/_index.md, accessibility.md, tokens/color.md, tokens/space.md, tokens/stroke.md, tokens/radius.md, tokens/motion.md, tokens/typography.md, tokens/elevation.md, tokens/icon.md, components/atoms/calendar.md, components/atoms/icon.md, components/molecules/dropdown.md
---

# DatePicker

## 개요

Dropdown 트리거 스타일 버튼을 클릭해 Calendar 패널을 열고 날짜를 선택하는 Molecule.

- **single**: 트리거 1개 → 날짜 선택 후 `YYYY.MM.DD` 표시
- **range**: 트리거 1개 → 패널에서 시작일·종료일 순서대로 선택, `YYYY.MM.DD ~ YYYY.MM.DD` 표시

트리거 스타일은 Dropdown과 동일한 시각 언어를 사용한다. Calendar Atom이 날짜 그리드를 담당하고, DatePicker는 트리거·패널·월 내비게이션 헤더를 추가한다.

---

## Variant

| 차원 | 허용값 | 기본값 |
|------|--------|--------|
| mode | single · range → `dp--range` | single |
| state | default · open → `dp--open` · disabled → `dp--disabled` · error → `dp--error` | default |

---

## 동작

트리거 클릭으로 패널 열기·닫기, 월 이동, 날짜(범위) 선택을 확인할 수 있다.

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-lg);align-items:flex-start;padding-bottom:340px;">
<div role="radiogroup" aria-label="선택 모드" class="segment" id="dp-mode-seg">
  <span class="segment__slider" aria-hidden="true"></span>
  <button class="segment__item segment__item--selected" role="radio" aria-checked="true" data-mode="single">단일</button>
  <button class="segment__item" role="radio" aria-checked="false" data-mode="range">범위</button>
</div>

<!-- single -->
<div class="dp" id="dp-single">
  <button class="dp__trigger" type="button" aria-haspopup="dialog" aria-expanded="false" aria-label="날짜 선택">
    <span class="dp__value dp__value--placeholder" id="dp-s-value">YYYY.MM.DD</span>
    <span class="dp__chevron" aria-hidden="true">
      <span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
    </span>
  </button>
  <div class="dp__panel" id="dp-s-panel" role="dialog" aria-label="날짜 선택" hidden>
    <div class="dp__header">
      <button class="dp__nav-btn" id="dp-s-prev" type="button" aria-label="이전 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <span class="dp__month-label" id="dp-s-label" aria-live="polite"></span>
      <button class="dp__nav-btn" id="dp-s-next" type="button" aria-label="다음 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
    </div>
    <div class="cal"><div class="cal__grid" role="grid" id="dp-s-grid">
      <div class="cal__weekdays" role="row">
        <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span>
        <span class="cal__weekday" role="columnheader" aria-label="월요일">월</span>
        <span class="cal__weekday" role="columnheader" aria-label="화요일">화</span>
        <span class="cal__weekday" role="columnheader" aria-label="수요일">수</span>
        <span class="cal__weekday" role="columnheader" aria-label="목요일">목</span>
        <span class="cal__weekday" role="columnheader" aria-label="금요일">금</span>
        <span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
      </div>
      <div id="dp-s-weeks"></div>
    </div></div>
  </div>
</div>

<!-- range -->
<div class="dp dp--range" id="dp-range" style="display:none;">
  <button class="dp__trigger" type="button" id="dp-r-btn" aria-haspopup="dialog" aria-expanded="false" aria-label="기간 선택">
    <span class="dp__value dp__value--placeholder" id="dp-r-value">YYYY.MM.DD ~ YYYY.MM.DD</span>
    <span class="dp__chevron" aria-hidden="true">
      <span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
    </span>
  </button>
  <div class="dp__panel dp__panel--dual" id="dp-r-panel" role="dialog" aria-label="기간 선택" aria-multiselectable="true" hidden>
    <!-- 왼쪽 달 -->
    <div class="dp__pane">
      <div class="dp__header">
        <button class="dp__nav-btn" id="dp-r-prev" type="button" aria-label="이전 달">
          <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
        </button>
        <span class="dp__month-label" id="dp-r-label-l" aria-live="polite"></span>
        <span class="dp__nav-btn" aria-hidden="true" style="visibility:hidden;"></span>
      </div>
      <div class="cal"><div class="cal__grid" role="grid" id="dp-r-grid-l" aria-multiselectable="true">
        <div class="cal__weekdays" role="row">
          <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span>
          <span class="cal__weekday" role="columnheader" aria-label="월요일">월</span>
          <span class="cal__weekday" role="columnheader" aria-label="화요일">화</span>
          <span class="cal__weekday" role="columnheader" aria-label="수요일">수</span>
          <span class="cal__weekday" role="columnheader" aria-label="목요일">목</span>
          <span class="cal__weekday" role="columnheader" aria-label="금요일">금</span>
          <span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
        </div>
        <div id="dp-r-weeks-l"></div>
      </div></div>
    </div>
    <!-- 오른쪽 달 -->
    <div class="dp__pane">
      <div class="dp__header">
        <span class="dp__nav-btn" aria-hidden="true" style="visibility:hidden;"></span>
        <span class="dp__month-label" id="dp-r-label-r" aria-live="polite"></span>
        <button class="dp__nav-btn" id="dp-r-next" type="button" aria-label="다음 달">
          <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
        </button>
      </div>
      <div class="cal"><div class="cal__grid" role="grid" id="dp-r-grid-r" aria-multiselectable="true">
        <div class="cal__weekdays" role="row">
          <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span>
          <span class="cal__weekday" role="columnheader" aria-label="월요일">월</span>
          <span class="cal__weekday" role="columnheader" aria-label="화요일">화</span>
          <span class="cal__weekday" role="columnheader" aria-label="수요일">수</span>
          <span class="cal__weekday" role="columnheader" aria-label="목요일">목</span>
          <span class="cal__weekday" role="columnheader" aria-label="금요일">금</span>
          <span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
        </div>
        <div id="dp-r-weeks-r"></div>
      </div></div>
    </div>
  </div>
</div>
</div>

<script>
(function() {
  var today = new Date(); today.setHours(0,0,0,0);
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function fmt(d) { return d.getFullYear() + '.' + pad(d.getMonth()+1) + '.' + pad(d.getDate()); }
  function isSame(a,b) { return a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
  function isBetween(d,s,e) { if(!s||!e) return false; var lo=s<e?s:e,hi=s<e?e:s; return d>lo&&d<hi; }
  function fromKey(k) { var p=k.split(','); return new Date(+p[0],+p[1],+p[2]); }

  /* ── Single ── */
  (function() {
    var dp = stage.querySelector('#dp-single');
    var trigger = dp.querySelector('.dp__trigger');
    var panel   = stage.querySelector('#dp-s-panel');
    var weeksEl = stage.querySelector('#dp-s-weeks');
    var labelEl = stage.querySelector('#dp-s-label');
    var gridEl  = stage.querySelector('#dp-s-grid');
    var valueEl = stage.querySelector('#dp-s-value');
    var vy = today.getFullYear(), vm = today.getMonth();
    var selected = null;

    function open()  { panel.removeAttribute('hidden'); trigger.setAttribute('aria-expanded','true');  dp.classList.add('dp--open'); render(); }
    function close() { panel.setAttribute('hidden',''); trigger.setAttribute('aria-expanded','false'); dp.classList.remove('dp--open'); }
    function isOpen(){ return !panel.hasAttribute('hidden'); }

    function render() {
      weeksEl.innerHTML = '';
      labelEl.textContent = vy + '년 ' + (vm+1) + '월';
      gridEl.setAttribute('aria-label', vy + '년 ' + (vm+1) + '월');
      var first = new Date(vy, vm, 1), last = new Date(vy, vm+1, 0);
      var cur = new Date(first); cur.setDate(cur.getDate() - cur.getDay());
      while (cur <= last || cur.getDay() !== 0) {
        var row = document.createElement('div'); row.className='cal__week'; row.setAttribute('role','row');
        for (var i=0;i<7;i++) {
          var d=new Date(cur), outside=d.getMonth()!==vm, disabled=d<today;
          var btn=document.createElement('button'); btn.setAttribute('role','gridcell'); btn.setAttribute('type','button');
          btn.dataset.date=d.getFullYear()+','+d.getMonth()+','+d.getDate();
          if (outside||disabled) btn.dataset.inactive='true';
          var cls=['cal__day'];
          if (outside)  cls.push('cal__day--outside');
          if (disabled) cls.push('cal__day--disabled');
          if (!outside&&isSame(d,today)) { cls.push('cal__day--today'); btn.setAttribute('aria-current','date'); }
          if (isSame(d,selected)) { cls.push('cal__day--selected'); btn.setAttribute('aria-selected','true'); }
          btn.className=cls.join(' ');
          btn.setAttribute('tabindex',(isSame(d,selected)||(!selected&&isSame(d,today)))&&!outside?'0':'-1');
          btn.textContent=d.getDate();
          row.appendChild(btn); cur.setDate(cur.getDate()+1);
        }
        weeksEl.appendChild(row);
        if (cur>last&&cur.getDay()===0) break;
      }
      markDisabled(weeksEl);
    }

    trigger.addEventListener('click', function() { isOpen() ? close() : open(); });
    trigger.addEventListener('keydown', function(e) {
      if (e.key==='Enter'||e.key===' ') { e.preventDefault(); isOpen()?close():open(); }
      if (e.key==='Escape') close();
    });
    weeksEl.addEventListener('click', function(e) {
      var btn=e.target.closest?e.target.closest('.cal__day'):e.target;
      if (!btn||btn.dataset.inactive) return;
      e.stopPropagation();
      selected=fromKey(btn.dataset.date);
      valueEl.textContent=fmt(selected); valueEl.classList.remove('dp__value--placeholder');
      close();
    });
    stage.querySelector('#dp-s-prev').addEventListener('click', function() { vm--; if(vm<0){vm=11;vy--;} render(); });
    stage.querySelector('#dp-s-next').addEventListener('click', function() { vm++; if(vm>11){vm=0;vy++;} render(); });
    document.addEventListener('click', function(e) { if(!dp.contains(e.target)) close(); });
    document.addEventListener('keydown', function(e) { if(e.key==='Escape') close(); });
  })();

  /* ── Range (dual calendar) ── */
  (function() {
    var dp      = stage.querySelector('#dp-range');
    var trigger = stage.querySelector('#dp-r-btn');
    var panel   = stage.querySelector('#dp-r-panel');
    var weeksL  = stage.querySelector('#dp-r-weeks-l');
    var weeksR  = stage.querySelector('#dp-r-weeks-r');
    var labelL  = stage.querySelector('#dp-r-label-l');
    var labelR  = stage.querySelector('#dp-r-label-r');
    var gridL   = stage.querySelector('#dp-r-grid-l');
    var gridR   = stage.querySelector('#dp-r-grid-r');
    var valueEl = stage.querySelector('#dp-r-value');
    var lvy = today.getFullYear(), lvm = today.getMonth();
    var rangeStart=null, rangeEnd=null, hoverDate=null;

    function rightMonth() {
      var rm=lvm+1, ry=lvy; if(rm>11){rm=0;ry++;} return {ry:ry,rm:rm};
    }

    function open()  { panel.removeAttribute('hidden'); trigger.setAttribute('aria-expanded','true');  dp.classList.add('dp--open'); renderBoth(); }
    function close() { panel.setAttribute('hidden',''); trigger.setAttribute('aria-expanded','false'); dp.classList.remove('dp--open'); hoverDate=null; }
    function isOpen(){ return !panel.hasAttribute('hidden'); }

    function updateValue() {
      if (rangeStart && rangeEnd) {
        valueEl.textContent = fmt(rangeStart) + ' ~ ' + fmt(rangeEnd);
        valueEl.classList.remove('dp__value--placeholder');
      } else if (rangeStart) {
        valueEl.textContent = fmt(rangeStart) + ' ~ YYYY.MM.DD';
        valueEl.classList.remove('dp__value--placeholder');
      } else {
        valueEl.textContent = 'YYYY.MM.DD ~ YYYY.MM.DD';
        valueEl.classList.add('dp__value--placeholder');
      }
    }

    function renderMonth(vy, vm, weeksEl, labelEl, gridEl) {
      weeksEl.innerHTML='';
      labelEl.textContent=vy+'년 '+(vm+1)+'월';
      gridEl.setAttribute('aria-label',vy+'년 '+(vm+1)+'월');
      var first=new Date(vy,vm,1),last=new Date(vy,vm+1,0);
      var cur=new Date(first); cur.setDate(cur.getDate()-cur.getDay());
      while (cur<=last||cur.getDay()!==0) {
        var row=document.createElement('div'); row.className='cal__week'; row.setAttribute('role','row');
        for (var i=0;i<7;i++) {
          var d=new Date(cur),outside=d.getMonth()!==vm,disabled=d<today;
          var inactive=outside||disabled;
          var isStart=isSame(d,rangeStart),isEnd=isSame(d,rangeEnd);
          var inRange=isBetween(d,rangeStart,rangeEnd);
          var effectiveEnd=rangeEnd||hoverDate,goLeft=effectiveEnd&&effectiveEnd<rangeStart;
          var isPreview=!rangeEnd&&rangeStart&&hoverDate&&isBetween(d,rangeStart,hoverDate);
          var isHoverEnd=!rangeEnd&&rangeStart&&hoverDate&&!isStart&&isSame(d,hoverDate);
          var btn=document.createElement('button'); btn.setAttribute('role','gridcell'); btn.setAttribute('type','button');
          btn.dataset.date=d.getFullYear()+','+d.getMonth()+','+d.getDate();
          if (inactive) btn.dataset.inactive='true';
          var cls=['cal__day'];
          if (outside) cls.push('cal__day--outside');
          if (disabled) cls.push('cal__day--disabled');
          if (!outside&&isSame(d,today)) { cls.push('cal__day--today'); btn.setAttribute('aria-current','date'); }
          if (isStart) {
            if (!effectiveEnd)  cls.push('cal__day--range-solo');
            else if (rangeEnd)  cls.push(goLeft?'cal__day--range-start-left':'cal__day--range-start');
            else                cls.push(goLeft?'cal__day--range-start-left-pre':'cal__day--range-start-pre');
          }
          if (isEnd)      cls.push('cal__day--range-end');
          if (inRange)    cls.push('cal__day--in-range');
          if (isPreview)  cls.push('cal__day--in-range-preview');
          if (isHoverEnd) cls.push(goLeft?'cal__day--hover-end-left':'cal__day--hover-end');
          if (isStart||isEnd||inRange) btn.setAttribute('aria-selected','true');
          btn.className=cls.join(' ');
          btn.setAttribute('tabindex',(isStart||isEnd)&&!inactive?'0':'-1');
          btn.textContent=d.getDate();
          row.appendChild(btn); cur.setDate(cur.getDate()+1);
        }
        weeksEl.appendChild(row);
        if (cur>last&&cur.getDay()===0) break;
      }
      markDisabled(weeksEl);
    }

    function renderBoth() {
      var r=rightMonth();
      renderMonth(lvy,lvm,weeksL,labelL,gridL);
      renderMonth(r.ry,r.rm,weeksR,labelR,gridR);
    }

    function pickDate(date) {
      if (!rangeStart || rangeEnd) {
        rangeStart=date; rangeEnd=null; hoverDate=null;
      } else if (isSame(rangeStart,date)) {
        rangeStart=null; hoverDate=null;
      } else {
        rangeEnd=date;
        if (rangeEnd<rangeStart) { var t=rangeStart; rangeStart=rangeEnd; rangeEnd=t; }
        hoverDate=null; updateValue(); close(); return;
      }
      updateValue(); renderBoth();
    }

    function handleClick(e) {
      var btn=e.target.closest?e.target.closest('.cal__day'):e.target;
      if (!btn||btn.dataset.inactive) return;
      e.stopPropagation();
      pickDate(fromKey(btn.dataset.date));
    }
    function handleMouseover(e) {
      var btn=e.target.closest?e.target.closest('.cal__day'):e.target;
      if (!btn||btn.dataset.inactive||!rangeStart||rangeEnd) return;
      var d=fromKey(btn.dataset.date);
      if (!isSame(d,hoverDate)) { hoverDate=d; renderBoth(); }
    }

    trigger.addEventListener('click', function() { isOpen() ? close() : open(); });
    trigger.addEventListener('keydown', function(e) {
      if (e.key==='Enter'||e.key===' ') { e.preventDefault(); isOpen()?close():open(); }
      if (e.key==='Escape') close();
    });
    weeksL.addEventListener('click', handleClick);
    weeksR.addEventListener('click', handleClick);
    weeksL.addEventListener('mouseover', handleMouseover);
    weeksR.addEventListener('mouseover', handleMouseover);
    stage.querySelector('#dp-r-prev').addEventListener('click', function() { lvm--; if(lvm<0){lvm=11;lvy--;} renderBoth(); });
    stage.querySelector('#dp-r-next').addEventListener('click', function() { lvm++; if(lvm>11){lvm=0;lvy++;} renderBoth(); });
    document.addEventListener('click', function(e) { if(!dp.contains(e.target)) close(); });
    document.addEventListener('keydown', function(e) { if(e.key==='Escape') close(); });
  })();

  /* ── 공통: disabled run 처리 ── */
  function markDisabled(weeksEl) {
    var btns=Array.prototype.slice.call(weeksEl.querySelectorAll('.cal__day'));
    var run=[];
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

  /* ── Segment 토글 ── */
  var seg=stage.querySelector('#dp-mode-seg');
  var segSlider=seg.querySelector('.segment__slider');
  function updateSeg(){ var s=seg.querySelector('.segment__item--selected'); segSlider.style.width=s.offsetWidth+'px'; segSlider.style.transform='translateX('+s.offsetLeft+'px)'; }
  segSlider.style.transition='none'; updateSeg(); seg.offsetWidth; segSlider.style.transition='';
  seg.addEventListener('click', function(e) {
    var item=e.target.closest?e.target.closest('.segment__item'):e.target; if(!item) return;
    seg.querySelectorAll('.segment__item').forEach(function(b){ b.classList.remove('segment__item--selected'); b.setAttribute('aria-checked','false'); });
    item.classList.add('segment__item--selected'); item.setAttribute('aria-checked','true'); updateSeg();
    var m=item.dataset.mode;
    stage.querySelector('#dp-single').style.display = m==='single'?'':'none';
    stage.querySelector('#dp-range').style.display  = m==='range' ?'':'none';
  });
})();
</script>
:::

---

## Anatomy

<!-- AI:
- root = div.dp. position:relative.
  - single: div.dp > button.dp__trigger + div.dp__panel[hidden].
  - range:  div.dp.dp--range > button.dp__trigger(시작) + span.dp__range-sep + button.dp__trigger(종료) + div.dp__panel[hidden].
- dp__trigger = Dropdown 트리거와 동일 시각 언어: border·background·height. aria-haspopup="dialog" + aria-expanded.
  - 미선택: dp__value--placeholder (subtle 색).
  - 선택됨: dp__value (brand 색), 트리거 배경 brand-selected.
  - active(range, 패널 열린 쪽): dp__trigger--active → open 스타일.
- dp__panel = position:absolute. role="dialog". hidden 속성 토글.
- dp__header = 이전달 버튼 + 월 레이블(aria-live="polite") + 다음달 버튼.
- dp--open = 열린 상태 (JS 토글).
-->

### Single

:::preview
<div style="display:flex;gap:var(--space-gap-2xl);flex-wrap:wrap;align-items:flex-start;">

<!-- default -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">default</span>
  <div data-component class="dp" style="width:160px;">
    <button class="dp__trigger" type="button" aria-haspopup="dialog" aria-expanded="false" aria-label="날짜 선택">
      <span class="dp__value dp__value--placeholder">YYYY.MM.DD</span>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </button>
  </div>
</div>

<!-- selected -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">선택됨</span>
  <div data-component class="dp" style="width:160px;">
    <button class="dp__trigger" type="button" aria-haspopup="dialog" aria-expanded="false" aria-label="날짜 선택">
      <span class="dp__value">2026.06.10</span>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </button>
  </div>
</div>

<!-- open -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">open</span>
  <div data-component class="dp dp--open" style="width:160px;">
    <button class="dp__trigger" type="button" aria-haspopup="dialog" aria-expanded="true" aria-label="날짜 선택">
      <span class="dp__value">2026.06.10</span>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </button>
    <div class="dp__panel" role="dialog" aria-label="날짜 선택">
      <div class="dp__header">
        <button class="dp__nav-btn" type="button" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>
        <span class="dp__month-label">2026년 6월</span>
        <button class="dp__nav-btn" type="button" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
      </div>
      <div class="cal"><div class="cal__grid" role="grid" aria-label="2026년 6월">
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
      </div></div>
    </div>
  </div>
</div>

<!-- disabled -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">disabled</span>
  <div data-component class="dp dp--disabled" style="width:160px;">
    <button class="dp__trigger" type="button" aria-haspopup="dialog" aria-expanded="false" aria-disabled="true" disabled aria-label="날짜 선택">
      <span class="dp__value dp__value--placeholder">YYYY.MM.DD</span>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </button>
  </div>
</div>

<!-- error -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">error</span>
  <div data-component class="dp dp--error" style="width:160px;">
    <button class="dp__trigger" type="button" aria-haspopup="dialog" aria-expanded="false" aria-invalid="true" aria-label="날짜 선택">
      <span class="dp__value dp__value--placeholder">YYYY.MM.DD</span>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </button>
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
  <div data-component class="dp dp--range" style="width:220px;">
    <button class="dp__trigger" type="button" aria-haspopup="dialog" aria-expanded="false" aria-label="기간 선택">
      <span class="dp__value dp__value--placeholder">YYYY.MM.DD ~ YYYY.MM.DD</span>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </button>
  </div>
</div>

<!-- open (범위 선택됨, 듀얼 캘린더) -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">open</span>
  <div data-component class="dp dp--range dp--open" style="width:220px;">
    <button class="dp__trigger" type="button" aria-haspopup="dialog" aria-expanded="true" aria-label="기간 선택">
      <span class="dp__value">2026.06.25 ~ 2026.07.08</span>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </button>
    <div class="dp__panel dp__panel--dual" role="dialog" aria-label="기간 선택" aria-multiselectable="true">
      <!-- 왼쪽: 6월 -->
      <div class="dp__pane">
        <div class="dp__header">
          <button class="dp__nav-btn" type="button" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>
          <span class="dp__month-label">2026년 6월</span>
          <span class="dp__nav-btn" aria-hidden="true" style="visibility:hidden;"></span>
        </div>
        <div class="cal"><div class="cal__grid" role="grid" aria-label="2026년 6월" aria-multiselectable="true">
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
            <button class="cal__day" role="gridcell" aria-label="2026년 6월 10일" tabindex="-1">10</button>
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
            <button class="cal__day cal__day--range-start" role="gridcell" aria-label="2026년 6월 25일, 시작일" aria-selected="true" tabindex="0">25</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 26일" aria-selected="true" tabindex="-1">26</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 27일" aria-selected="true" tabindex="-1">27</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 28일" aria-selected="true" tabindex="-1">28</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 29일" aria-selected="true" tabindex="-1">29</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 6월 30일" aria-selected="true" tabindex="-1">30</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 1일" tabindex="-1">1</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 2일" tabindex="-1">2</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 3일" tabindex="-1">3</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 7월 4일" tabindex="-1">4</button>
          </div>
        </div></div>
      </div>
      <!-- 오른쪽: 7월 -->
      <div class="dp__pane">
        <div class="dp__header">
          <span class="dp__nav-btn" aria-hidden="true" style="visibility:hidden;"></span>
          <span class="dp__month-label">2026년 7월</span>
          <button class="dp__nav-btn" type="button" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
        </div>
        <div class="cal"><div class="cal__grid" role="grid" aria-label="2026년 7월" aria-multiselectable="true">
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
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 7월 1일" aria-selected="true" tabindex="-1">1</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 7월 2일" aria-selected="true" tabindex="-1">2</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 7월 3일" aria-selected="true" tabindex="-1">3</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 7월 4일" aria-selected="true" tabindex="-1">4</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 7월 5일" aria-selected="true" tabindex="-1">5</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 7월 6일" aria-selected="true" tabindex="-1">6</button>
            <button class="cal__day cal__day--in-range" role="gridcell" aria-label="2026년 7월 7일" aria-selected="true" tabindex="-1">7</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day cal__day--range-end" role="gridcell" aria-label="2026년 7월 8일, 종료일" aria-selected="true" tabindex="0">8</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 9일" tabindex="-1">9</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 10일" tabindex="-1">10</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 11일" tabindex="-1">11</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 12일" tabindex="-1">12</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 13일" tabindex="-1">13</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 14일" tabindex="-1">14</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 15일" tabindex="-1">15</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 16일" tabindex="-1">16</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 17일" tabindex="-1">17</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 18일" tabindex="-1">18</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 19일" tabindex="-1">19</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 20일" tabindex="-1">20</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 21일" tabindex="-1">21</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 22일" tabindex="-1">22</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 23일" tabindex="-1">23</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 24일" tabindex="-1">24</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 25일" tabindex="-1">25</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 26일" tabindex="-1">26</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 27일" tabindex="-1">27</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 28일" tabindex="-1">28</button>
          </div>
          <div class="cal__week" role="row">
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 29일" tabindex="-1">29</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 30일" tabindex="-1">30</button>
            <button class="cal__day" role="gridcell" aria-label="2026년 7월 31일" tabindex="-1">31</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 8월 1일" tabindex="-1">1</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 8월 2일" tabindex="-1">2</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 8월 3일" tabindex="-1">3</button>
            <button class="cal__day cal__day--outside" role="gridcell" aria-label="2026년 8월 4일" tabindex="-1">4</button>
          </div>
        </div></div>
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
.dp {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-xs);
}

/* ── Trigger — Dropdown 트리거와 동일 시각 언어 ── */
.dp__trigger {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--height-base);
  padding: 0 var(--space-inset-lg);
  gap: var(--space-gap-xs);
  border: var(--stroke-sm) solid var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  color: var(--color-text-body);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-ui);
  cursor: pointer;
  white-space: nowrap;
  transition: border-color var(--duration-fast) var(--easing-base),
              background var(--duration-fast) var(--easing-base),
              box-shadow var(--duration-fast) var(--easing-base);
}
.dp__trigger:hover:not(:disabled) {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
.dp__trigger:focus-visible {
  outline: var(--stroke-md) solid var(--color-border-focus);
  outline-offset: var(--space-offset-focus);
}

/* ── Value ── */
.dp__value { flex: 1; text-align: left; }
.dp__value--placeholder { color: var(--color-text-subtle); }

/* 날짜가 선택된 트리거 — 브랜드 테두리·텍스트 */
.dp__trigger:has(.dp__value:not(.dp__value--placeholder)) {
  border-color: var(--color-border-brand);
}
.dp__trigger:has(.dp__value:not(.dp__value--placeholder)) .dp__value {
  color: var(--color-text-brand);
}
.dp__trigger:has(.dp__value:not(.dp__value--placeholder)) .dp__chevron {
  color: var(--color-text-brand);
}

/* ── Chevron ── */
.dp__chevron {
  color: var(--color-text-subtle);
  margin-left: auto;
  flex-shrink: 0;
  transition: transform var(--duration-fast) var(--easing-base);
}

/* ── Open ── */
.dp--open .dp__trigger {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}

/* ── Panel ── */
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
.dp--disabled .dp__trigger {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  pointer-events: none;
  cursor: default;
}
.dp--disabled .dp__value { color: var(--color-text-disabled); }
.dp--disabled .dp__chevron { color: var(--color-text-disabled); }
.dp--disabled .dp__range-sep { color: var(--color-text-disabled); }

/* ── Error ── */
.dp--error .dp__trigger { border-color: var(--color-border-error); }
.dp--error .dp__trigger:hover:not(:disabled) { border-color: var(--color-border-error); }

/* ── Dual panel (range mode) ── */
.dp__panel--dual {
  display: flex;
  gap: var(--space-gap-lg);
}
.dp__panel--dual .dp__pane {
  flex: 1;
  min-width: 0;
}
```

---

## 접근성

| 요소 | 마크업 |
|------|--------|
| 트리거 | `aria-haspopup="dialog"` + `aria-expanded="true\|false"` + `aria-label` |
| 트리거 (disabled) | `disabled` + `aria-disabled="true"` |
| 트리거 (error) | `aria-invalid="true"` |
| 패널 | `role="dialog"` + `aria-label="날짜 선택"` |
| 패널 (range) | `aria-multiselectable="true"` 추가 |
| 월 레이블 | `aria-live="polite"` — 월 이동 시 스크린 리더에 변경 고지 |
| 이전/다음 달 버튼 | `aria-label="이전 달"` · `"다음 달"` |
| 캘린더 그리드 | Calendar Atom의 `role="grid"` + `aria-label` 패턴 그대로 |

패널 토글은 `hidden` 속성으로 처리한다.

### 키보드 내비게이션

| 키 | 동작 |
|----|------|
| `Enter` / `Space` | 트리거에서 패널 열기/닫기 |
| `Esc` | 패널 닫기, 트리거로 포커스 복귀 |
| `Tab` | 패널 내 이전달 버튼 → 다음달 버튼 → 그리드 순환 |
| 그리드 내 키 | Calendar Atom 키보드 내비게이션 규칙 적용 |

---

## Do / Don't

> ✅ DO — 트리거 스타일을 Dropdown과 동일하게 유지
> 폼 내 다른 Dropdown과 시각 계층을 통일한다

> ✅ DO — 날짜 선택 후 트리거에 brand 배경·텍스트 적용 (`:has(.dp__value:not(.dp__value--placeholder))`)
> 선택 상태를 Dropdown과 동일한 방식으로 표현한다

> ✅ DO — range 모드에서 두 번째 날짜 선택 후 패널 자동 닫기

> ✅ DO — 월 이동 시 `cal__grid`의 `aria-label`도 함께 업데이트

> ❌ DON'T — 패널 내 `dp__header`를 생략
> 트리거에는 월 이동 버튼이 없으므로 패널 헤더가 반드시 필요하다

> ❌ DON'T — `data-component` 속성을 실제 코드에 포함
