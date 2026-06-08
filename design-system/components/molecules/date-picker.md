---
file: components/molecules/date-picker.md
version: 2.1.0
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
| min-date | — (기본, 제한 없음) · `today` · `YYYY.MM.DD` → `data-min-date` 속성 | — |

---

## 사용 지침

- **기간(시작일·종료일)을 함께 입력받을 때는 반드시 `dp--range` variant를 사용한다.** 단일 DatePicker 두 개를 나란히 놓는 것은 오용이다.
- 날짜 하나만 입력받을 때 single을 사용한다.
- 날짜 입력은 반드시 DatePicker를 사용한다. `<input type="date">`를 직접 사용하지 않는다.

---

## 동작

트리거 클릭으로 패널 열기·닫기, 월 이동, 날짜(범위) 선택을 확인할 수 있다.

:::preview
<!-- 패널 최대 높이(440px)를 수용하기 위한 뷰어 전용 여백 — 실제 코드에는 불필요 -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-lg);align-items:flex-start;padding-bottom:340px;">
<div role="radiogroup" aria-label="선택 모드" class="segment" id="dp-mode-seg">
  <span class="segment__slider" aria-hidden="true"></span>
  <button class="segment__item segment__item--selected" role="radio" aria-checked="true" data-mode="single">단일</button>
  <button class="segment__item" role="radio" aria-checked="false" data-mode="range">범위</button>
</div>

<!-- data-min-date="today" 로 오늘 이후만 선택 가능 -->
<!-- single -->
<div class="dp" id="dp-single">
  <div class="dp__trigger" aria-haspopup="dialog" aria-label="날짜 선택">
    <div class="dp__value-group">
      <input class="dp__value-part dp__value-part--year" id="dp-s-yr" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="연도" autocomplete="off">
      <span class="dp__value-sep" aria-hidden="true">.</span>
      <input class="dp__value-part dp__value-part--md" id="dp-s-mo" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="월" autocomplete="off">
      <span class="dp__value-sep" aria-hidden="true">.</span>
      <input class="dp__value-part dp__value-part--md" id="dp-s-dy" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="일" autocomplete="off">
    </div>
    <span class="dp__chevron" aria-hidden="true">
      <span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
    </span>
  </div>
  <div class="form-field__footer"><p class="form-field__error text-helper" role="alert"></p></div>
  <div class="dp__panel" id="dp-s-panel" role="dialog" aria-label="날짜 선택" hidden>
    <div class="dp__header">
      <button class="dp__nav-btn" id="dp-s-prev" type="button" aria-label="이전 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
      </button>
      <div class="dp__select-group" aria-live="polite" aria-atomic="true">
        <input class="dp__select-input" id="dp-s-year-input" type="number" min="1990" aria-label="연도">
        <span class="dp__select-label">년</span>
        <input class="dp__select-input dp__select-input--month" id="dp-s-month-input" type="number" min="1" max="12" aria-label="월">
        <span class="dp__select-label">월</span>
        <button class="btn btn--secondary btn--solid btn--sm" id="dp-s-today" type="button">오늘</button>
      </div>
      <button class="dp__nav-btn" id="dp-s-next" type="button" aria-label="다음 달">
        <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
      </button>
    </div>
    <div class="dp__weekday-bar">
      <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span>
      <span class="cal__weekday" role="columnheader" aria-label="월요일">월</span>
      <span class="cal__weekday" role="columnheader" aria-label="화요일">화</span>
      <span class="cal__weekday" role="columnheader" aria-label="수요일">수</span>
      <span class="cal__weekday" role="columnheader" aria-label="목요일">목</span>
      <span class="cal__weekday" role="columnheader" aria-label="금요일">금</span>
      <span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
    </div>
    <div class="cal"><div class="cal__grid" role="grid" id="dp-s-grid">
      <div id="dp-s-weeks"></div>
    </div></div>
  </div>
</div>

<!-- range -->
<div class="dp dp--range" id="dp-range" style="display:none;">
  <div class="dp__trigger" id="dp-r-btn" aria-haspopup="dialog" aria-label="기간 선택">
    <div class="dp__value-group">
      <input class="dp__value-part dp__value-part--year" id="dp-r-s-yr" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="시작 연도" autocomplete="off">
      <span class="dp__value-sep" aria-hidden="true">.</span>
      <input class="dp__value-part dp__value-part--md" id="dp-r-s-mo" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="시작 월" autocomplete="off">
      <span class="dp__value-sep" aria-hidden="true">.</span>
      <input class="dp__value-part dp__value-part--md" id="dp-r-s-dy" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="시작 일" autocomplete="off">
      <span class="dp__value-sep dp__value-sep--range" aria-hidden="true">~</span>
      <input class="dp__value-part dp__value-part--year" id="dp-r-e-yr" type="text" inputmode="numeric" placeholder="YYYY" maxlength="4" aria-label="종료 연도" autocomplete="off">
      <span class="dp__value-sep" aria-hidden="true">.</span>
      <input class="dp__value-part dp__value-part--md" id="dp-r-e-mo" type="text" inputmode="numeric" placeholder="MM" maxlength="2" aria-label="종료 월" autocomplete="off">
      <span class="dp__value-sep" aria-hidden="true">.</span>
      <input class="dp__value-part dp__value-part--md" id="dp-r-e-dy" type="text" inputmode="numeric" placeholder="DD" maxlength="2" aria-label="종료 일" autocomplete="off">
    </div>
    <span class="dp__chevron" aria-hidden="true">
      <span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span>
    </span>
  </div>
  <div class="form-field__footer"><p class="form-field__error text-helper" role="alert"></p></div>
  <div class="dp__panel dp__panel--scroll" id="dp-r-panel" role="dialog" aria-label="기간 선택" aria-multiselectable="true" hidden>
    <div class="dp__sticky-header">
      <div class="dp__header">
        <button class="dp__nav-btn" id="dp-r-prev" type="button" aria-label="이전 달">
          <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span>
        </button>
        <div class="dp__select-group" aria-live="polite" aria-atomic="true">
          <input class="dp__select-input" id="dp-r-year-input" type="number" min="1990" aria-label="연도">
          <span class="dp__select-label">년</span>
          <input class="dp__select-input dp__select-input--month" id="dp-r-month-input" type="number" min="1" max="12" aria-label="월">
          <span class="dp__select-label">월</span>
          <button class="btn btn--secondary btn--solid btn--sm" id="dp-r-today" type="button">오늘</button>
        </div>
        <button class="dp__nav-btn" id="dp-r-next" type="button" aria-label="다음 달">
          <span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span>
        </button>
      </div>
      <div class="dp__weekday-bar" id="dp-r-weekday-bar">
        <span class="cal__weekday" role="columnheader">일</span><span class="cal__weekday" role="columnheader">월</span><span class="cal__weekday" role="columnheader">화</span><span class="cal__weekday" role="columnheader">수</span><span class="cal__weekday" role="columnheader">목</span><span class="cal__weekday" role="columnheader">금</span><span class="cal__weekday" role="columnheader">토</span>
      </div>
    </div>
    <div class="dp__scroll-inner" id="dp-r-scroll-inner">
      <div class="dp__scroll-body" id="dp-r-scroll-body"></div>
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
  function parseDate(str) {
    var m = (str||'').trim().match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
    if (!m) return null;
    var d = new Date(+m[1], +m[2]-1, +m[3]);
    return isNaN(d.getTime()) ? null : d;
  }

  /* ── Single ── */
  (function() {
    var dp = stage.querySelector('#dp-single');
    var trigger = dp.querySelector('.dp__trigger');
    var panel   = stage.querySelector('#dp-s-panel');
    var yrEl = stage.querySelector('#dp-s-yr');
    var moEl = stage.querySelector('#dp-s-mo');
    var dyEl = stage.querySelector('#dp-s-dy');
    var minDateRaw = dp.dataset.minDate;
    var minDate = minDateRaw === 'today' ? today : (minDateRaw ? parseDate(minDateRaw) : null);
    var vy = today.getFullYear(), vm = today.getMonth();
    var selected = null;
    document.body.appendChild(panel);
    var weeksEl    = panel.querySelector('#dp-s-weeks');
    var yearInput  = panel.querySelector('#dp-s-year-input');
    var monthInput = panel.querySelector('#dp-s-month-input');
    // 연도 범위 동적 설정
    yearInput.min = 1990;
    yearInput.max = today.getFullYear() + 10;
    var gridEl     = panel.querySelector('#dp-s-grid');

    function positionPanel() {
      var r = trigger.getBoundingClientRect();
      var panelH = panel.offsetHeight;
      var spaceBelow = window.innerHeight - r.bottom;
      if (panelH > spaceBelow && r.top > panelH) {
        panel.style.top = (r.top + (window.pageYOffset||0) - panelH - 4) + 'px';
      } else {
        panel.style.top = (r.bottom + (window.pageYOffset||0) + 4) + 'px';
      }
      panel.style.left = (r.left + (window.pageXOffset||0)) + 'px';
    }
    function open()  {
      if (dp.classList.contains('dp--has-value')) applyPartsToDate();
      panel.removeAttribute('hidden'); dp.classList.add('dp--open'); render();
      positionPanel();
    }
    function close() { panel.setAttribute('hidden',''); dp.classList.remove('dp--open'); }
    function isOpen(){ return !panel.hasAttribute('hidden'); }

    function render() {
      weeksEl.innerHTML = '';
      yearInput.value  = vy;
      monthInput.value = vm + 1;
      gridEl.setAttribute('aria-label', vy + '년 ' + (vm+1) + '월');
      var first = new Date(vy, vm, 1), last = new Date(vy, vm+1, 0);
      var cur = new Date(first); cur.setDate(cur.getDate() - cur.getDay());
      while (cur <= last || cur.getDay() !== 0) {
        var row = document.createElement('div'); row.className='cal__week'; row.setAttribute('role','row');
        for (var i=0;i<7;i++) {
          var d=new Date(cur), outside=d.getMonth()!==vm, disabled=minDate&&d<minDate;
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

    trigger.addEventListener('click', function() { if (!isOpen()) open(); });
    var chevronEl = trigger.querySelector('.dp__chevron');
    chevronEl.addEventListener('click', function(e) { e.stopPropagation(); isOpen() ? close() : open(); });
    function advancePart(el, maxLen, nextEl) {
      el.addEventListener('input', function() {
        el.value = el.value.replace(/\D/g,'').slice(0, maxLen);
        if (nextEl && el.value.length === maxLen) nextEl.focus();
      });
    }
    advancePart(yrEl, 4, moEl); advancePart(moEl, 2, dyEl); advancePart(dyEl, 2, null);
    function syncCalendarFromParts() {
      if (!isOpen()) return;
      var y = parseInt(yrEl.value, 10), m = parseInt(moEl.value, 10);
      if (yrEl.value.length === 4 && !isNaN(y) && y >= 1990 && y <= today.getFullYear() + 10) vy = y;
      if (moEl.value.length >= 1 && !isNaN(m) && m >= 1 && m <= 12) vm = m - 1;
      // 날짜 3칸 모두 입력된 경우 선택값도 업데이트
      if (yrEl.value.length === 4 && moEl.value.length >= 1 && dyEl.value.length >= 1) applyPartsToDate();
      else render();
    }
    [yrEl, moEl, dyEl].forEach(function(el) {
      el.addEventListener('input', syncCalendarFromParts);
    });
    function onPartKeydown(e) {
      if (e.key==='Escape') { close(); e.target.blur(); }
      if (e.key==='Enter')  { e.preventDefault(); e.target.blur(); }
    }
    var errorMsg = dp.querySelector('.form-field__error');
    function setError(msg) {
      dp.classList.add('dp--error', 'form-field--error');
      if (errorMsg) errorMsg.textContent = msg;
    }
    function clearError() {
      dp.classList.remove('dp--error', 'form-field--error');
      if (errorMsg) errorMsg.textContent = '';
    }
    function onPartBlur() {
      setTimeout(function() {
        if (dp.contains(document.activeElement) || panel.contains(document.activeElement)) return;
        var hasInput = yrEl.value || moEl.value || dyEl.value;
        if (hasInput) applyPartsToDate(true);
        if (isOpen()) close();
      }, 0);
    }
    [yrEl, moEl, dyEl].forEach(function(el) {
      el.addEventListener('keydown', onPartKeydown);
      el.addEventListener('blur', onPartBlur);
      el.addEventListener('input', clearError);
    });
    function setPartsFromDate(d) {
      yrEl.value = String(d.getFullYear());
      moEl.value = pad(d.getMonth()+1);
      dyEl.value = pad(d.getDate());
      dp.classList.add('dp--has-value');
      clearError();
    }
    function applyPartsToDate(writeBack) {
      var y=parseInt(yrEl.value,10), m=parseInt(moEl.value,10), d=parseInt(dyEl.value,10);
      if (isNaN(y)||isNaN(m)||isNaN(d)) { if (writeBack) setError('유효하지 않은 날짜입니다.'); return false; }
      var dt=new Date(y,m-1,d);
      if (isNaN(dt.getTime())||dt.getMonth()!==m-1||dt.getDate()!==d) { if (writeBack) setError('유효하지 않은 날짜입니다.'); return false; }
      if (minDate && dt < minDate) { if (writeBack) setError('선택할 수 없는 날짜입니다.'); return false; }
      clearError(); selected=dt; vy=y; vm=m-1;
      if (writeBack) setPartsFromDate(dt); else dp.classList.add('dp--has-value');
      return true;
    }
    weeksEl.addEventListener('click', function(e) {
      var btn=e.target.closest?e.target.closest('.cal__day'):e.target;
      if (!btn||btn.dataset.inactive) return;
      e.stopPropagation();
      selected=fromKey(btn.dataset.date);
      setPartsFromDate(selected);
      close();
    });
    function slideRender(dir) {
      panel.classList.remove('dp--slide-next','dp--slide-prev'); void panel.offsetWidth;
      panel.classList.add('dp--slide-' + dir); render();
    }
    panel.querySelector('#dp-s-prev').addEventListener('click', function() { vm--; if(vm<0){vm=11;vy--;} slideRender('prev'); });
    panel.querySelector('#dp-s-next').addEventListener('click', function() { vm++; if(vm>11){vm=0;vy++;} slideRender('next'); });
    panel.querySelector('#dp-s-today').addEventListener('click', function() { vy=today.getFullYear(); vm=today.getMonth(); render(); positionPanel(); });
    yearInput.addEventListener('click', function(e) { e.stopPropagation(); });
    monthInput.addEventListener('click', function(e) { e.stopPropagation(); });
    yearInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') { e.preventDefault(); yearInput.blur(); } });
    monthInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') { e.preventDefault(); monthInput.blur(); } });
    yearInput.addEventListener('blur', function() {
      var y = parseInt(yearInput.value, 10);
      if (!isNaN(y) && y >= 1990 && y <= today.getFullYear() + 10) { vy = y; render(); } else { yearInput.value = vy; }
    });
    monthInput.addEventListener('blur', function() {
      var m = parseInt(monthInput.value, 10);
      if (!isNaN(m) && m >= 1 && m <= 12) { vm = m - 1; render(); } else { monthInput.value = vm + 1; }
    });
    document.addEventListener('click', function(e) { if(!dp.contains(e.target) && !panel.contains(e.target)) close(); });
    document.addEventListener('keydown', function(e) { if(e.key==='Escape') close(); });
    var lastWheel = 0;
    panel.addEventListener('wheel', function(e) {
      e.preventDefault();
      var now = Date.now(); if (now - lastWheel < 350) return; lastWheel = now;
      var dir = e.deltaY < 0 ? 'prev' : 'next';
      if (dir === 'prev') { vm--; if(vm<0){vm=11;vy--;} } else { vm++; if(vm>11){vm=0;vy++;} }
      panel.classList.remove('dp--slide-next','dp--slide-prev');
      void panel.offsetWidth;
      panel.classList.add('dp--slide-' + dir);
      render();
    }, { passive: false });
  })();

  /* ── Range (vertical scroll) ── */
  (function() {
    var dp         = stage.querySelector('#dp-range');
    var trigger    = stage.querySelector('#dp-r-btn');
    var panel      = stage.querySelector('#dp-r-panel');
    var sYrEl = stage.querySelector('#dp-r-s-yr');
    var sMoEl = stage.querySelector('#dp-r-s-mo');
    var sDyEl = stage.querySelector('#dp-r-s-dy');
    var eYrEl = stage.querySelector('#dp-r-e-yr');
    var eMoEl = stage.querySelector('#dp-r-e-mo');
    var eDyEl = stage.querySelector('#dp-r-e-dy');
    var yearInput  = stage.querySelector('#dp-r-year-input');
    var monthInput = stage.querySelector('#dp-r-month-input');
    var prevBtn    = stage.querySelector('#dp-r-prev');
    var nextBtn    = stage.querySelector('#dp-r-next');
    var baseYear   = today.getFullYear(), baseMonth = today.getMonth();
    var rangeStart = null, rangeEnd = null, hoverDate = null;
    var minDateRaw = dp.dataset.minDate;
    var minDate = minDateRaw === 'today' ? today : (minDateRaw ? parseDate(minDateRaw) : null);
    document.body.appendChild(panel);
    var scrollBody  = panel.querySelector('.dp__scroll-body');
    var scrollInner = panel.querySelector('.dp__scroll-inner');
    // 연도 범위 동적 설정
    var rYearInput  = panel.querySelector('#dp-r-year-input');
    var rMonthInput = panel.querySelector('#dp-r-month-input');
    rYearInput.min = 1990;
    rYearInput.max = today.getFullYear() + 10;

    function firstSection() { return scrollBody.querySelector('.dp__month-section'); }
    function lastSection()  { var all = scrollBody.querySelectorAll('.dp__month-section'); return all[all.length - 1]; }

    function prependMonth() {
      var f = firstSection();
      var y = +f.dataset.year, m = +f.dataset.month - 1;
      if (m < 0) { m = 11; y--; }
      var prevH = scrollBody.offsetHeight;
      scrollBody.insertBefore(renderSection(y, m), f);
      scrollInner.scrollTop += scrollBody.offsetHeight - prevH;
    }
    function appendMonth() {
      var l = lastSection();
      var y = +l.dataset.year, m = +l.dataset.month + 1;
      if (m > 11) { m = 0; y++; }
      scrollBody.appendChild(renderSection(y, m));
    }

    function positionPanel() {
      var r = trigger.getBoundingClientRect();
      var panelH = panel.offsetHeight;
      var spaceBelow = window.innerHeight - r.bottom;
      if (panelH > spaceBelow && r.top > panelH) {
        panel.style.top = (r.top + (window.pageYOffset||0) - panelH - 4) + 'px';
      } else {
        panel.style.top = (r.bottom + (window.pageYOffset||0) + 4) + 'px';
      }
      panel.style.left = (r.left + (window.pageXOffset||0)) + 'px';
    }
    function open() {
      applyRangeParts();
      var anchorYear  = rangeStart ? rangeStart.getFullYear()  : baseYear;
      var anchorMonth = rangeStart ? rangeStart.getMonth()     : baseMonth;
      if (!scrollBody.children.length) {
        for (var i = -3; i < 13; i++) {
          var mm = anchorMonth + i, my = anchorYear;
          while (mm < 0)  { mm += 12; my--; }
          while (mm > 11) { mm -= 12; my++; }
          scrollBody.appendChild(renderSection(my, mm));
        }
      }
      panel.removeAttribute('hidden');
      dp.classList.add('dp--open');
      positionPanel();
      requestAnimationFrame(function() {
        var sections = Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section'));
        var cur = null;
        sections.forEach(function(s) { if (+s.dataset.year === anchorYear && +s.dataset.month === anchorMonth) cur = s; });
        if (cur) { scrollInner.scrollTop = cur.offsetTop - scrollInner.offsetTop; } else { jumpTo(anchorYear, anchorMonth); }
        updateActive();
      });
    }
    function close() {
      panel.setAttribute('hidden', '');
      dp.classList.remove('dp--open');
      hoverDate = null;
    }
    function isOpen() { return !panel.hasAttribute('hidden'); }

    function updateValue() {
      if (rangeStart) {
        sYrEl.value=String(rangeStart.getFullYear()); sMoEl.value=pad(rangeStart.getMonth()+1); sDyEl.value=pad(rangeStart.getDate());
      } else { sYrEl.value=sMoEl.value=sDyEl.value=''; }
      if (rangeEnd) {
        eYrEl.value=String(rangeEnd.getFullYear()); eMoEl.value=pad(rangeEnd.getMonth()+1); eDyEl.value=pad(rangeEnd.getDate());
        dp.classList.add('dp--has-value');
      } else { eYrEl.value=eMoEl.value=eDyEl.value=''; dp.classList.remove('dp--has-value'); }
    }

    function makeBtn(d, vm) {
      var outside = d.getMonth() !== vm;
      var awaitingEnd = rangeStart && !rangeEnd;
      var disabled = (minDate && d < minDate) || (!outside && awaitingEnd && !isSame(d, rangeStart) && d < rangeStart);
      var inactive = outside || disabled;
      var isStart = isSame(d, rangeStart), isEnd = isSame(d, rangeEnd);
      var inRange = isBetween(d, rangeStart, rangeEnd);
      var effectiveEnd = rangeEnd || hoverDate, goLeft = effectiveEnd && effectiveEnd < rangeStart;
      var isPreview = !rangeEnd && rangeStart && hoverDate && isBetween(d, rangeStart, hoverDate);
      var isHoverEnd = !rangeEnd && rangeStart && hoverDate && !isStart && isSame(d, hoverDate);
      var btn = document.createElement('button');
      btn.setAttribute('role', 'gridcell'); btn.setAttribute('type', 'button');
      btn.dataset.date = d.getFullYear() + ',' + d.getMonth() + ',' + d.getDate();
      if (inactive) btn.dataset.inactive = 'true';
      var cls = ['cal__day'];
      if (outside) cls.push('cal__day--outside');
      if (disabled) cls.push('cal__day--disabled');
      if (!outside && isSame(d, today)) { cls.push('cal__day--today'); btn.setAttribute('aria-current', 'date'); }
      if (isStart) {
        if (!effectiveEnd) cls.push('cal__day--range-solo');
        else if (rangeEnd) cls.push(goLeft ? 'cal__day--range-start-left' : 'cal__day--range-start');
        else               cls.push(goLeft ? 'cal__day--range-start-left-pre' : 'cal__day--range-start-pre');
      }
      if (isEnd)      cls.push('cal__day--range-end');
      if (inRange)    cls.push('cal__day--in-range');
      if (isPreview)  cls.push('cal__day--in-range-preview');
      if (isHoverEnd) cls.push(goLeft ? 'cal__day--hover-end-left' : 'cal__day--hover-end');
      if (isStart || isEnd || inRange) btn.setAttribute('aria-selected', 'true');
      btn.className = cls.join(' ');
      btn.setAttribute('tabindex', (isStart || isEnd) && !inactive ? '0' : '-1');
      btn.textContent = d.getDate();
      return btn;
    }

    function renderSection(my, mm) {
      var section = document.createElement('div');
      section.className = 'dp__month-section';
      section.dataset.year = my; section.dataset.month = mm;

      var header = document.createElement('div'); header.className = 'dp__month-divider';
      header.textContent = my + '년 ' + (mm + 1) + '월';
      section.appendChild(header);

      var calDiv = document.createElement('div'); calDiv.className = 'cal';
      var gridDiv = document.createElement('div');
      gridDiv.className = 'cal__grid'; gridDiv.setAttribute('role', 'grid');
      gridDiv.setAttribute('aria-label', my + '년 ' + (mm + 1) + '월');
      gridDiv.setAttribute('aria-multiselectable', 'true');


      var weeksDiv = document.createElement('div');
      var first = new Date(my, mm, 1), last = new Date(my, mm + 1, 0);
      var cur = new Date(first); cur.setDate(cur.getDate() - cur.getDay());
      while (cur <= last || cur.getDay() !== 0) {
        var row = document.createElement('div'); row.className = 'cal__week'; row.setAttribute('role', 'row');
        for (var i = 0; i < 7; i++) {
          row.appendChild(makeBtn(new Date(cur), mm));
          cur.setDate(cur.getDate() + 1);
        }
        weeksDiv.appendChild(row);
        if (cur > last && cur.getDay() === 0) break;
      }
      gridDiv.appendChild(weeksDiv);
      calDiv.appendChild(gridDiv);
      section.appendChild(calDiv);
      markDisabled(weeksDiv);
      return section;
    }

    /* 기존 버튼의 클래스만 갱신 (hover 시 전체 재빌드 없이) */
    function updateClasses() {
      var btns = Array.prototype.slice.call(scrollBody.querySelectorAll('.cal__day'));
      var awaitingEnd = rangeStart && !rangeEnd;
      var rangeCls = ['cal__day--range-solo','cal__day--range-start','cal__day--range-start-left',
        'cal__day--range-start-pre','cal__day--range-start-left-pre','cal__day--range-end',
        'cal__day--in-range','cal__day--in-range-preview','cal__day--hover-end','cal__day--hover-end-left'];
      btns.forEach(function(btn) {
        rangeCls.forEach(function(c) { btn.classList.remove(c); });
        btn.removeAttribute('aria-selected');
        var d = fromKey(btn.dataset.date);
        var outside = btn.classList.contains('cal__day--outside');
        var originalDisabled = minDate && d < minDate;
        var beforeStart = !outside && awaitingEnd && !isSame(d, rangeStart) && d < rangeStart;
        var disabled = originalDisabled || beforeStart;
        btn.classList.toggle('cal__day--disabled', !outside && !!disabled);
        if (!outside) { if (disabled) btn.dataset.inactive = 'true'; else delete btn.dataset.inactive; }
        if (btn.dataset.inactive) return;
        var isStart = isSame(d, rangeStart), isEnd = isSame(d, rangeEnd);
        var inRange = isBetween(d, rangeStart, rangeEnd);
        var effectiveEnd = rangeEnd || hoverDate, goLeft = effectiveEnd && effectiveEnd < rangeStart;
        var isPreview = !rangeEnd && rangeStart && hoverDate && isBetween(d, rangeStart, hoverDate);
        var isHoverEnd = !rangeEnd && rangeStart && hoverDate && !isStart && isSame(d, hoverDate);
        if (isStart) {
          if (!effectiveEnd) btn.classList.add('cal__day--range-solo');
          else if (rangeEnd) btn.classList.add(goLeft ? 'cal__day--range-start-left' : 'cal__day--range-start');
          else               btn.classList.add(goLeft ? 'cal__day--range-start-left-pre' : 'cal__day--range-start-pre');
        }
        if (isEnd) btn.classList.add('cal__day--range-end');
        if (inRange) btn.classList.add('cal__day--in-range');
        if (isPreview) btn.classList.add('cal__day--in-range-preview');
        if (isHoverEnd) btn.classList.add(goLeft ? 'cal__day--hover-end-left' : 'cal__day--hover-end');
        if (isStart || isEnd || inRange) btn.setAttribute('aria-selected', 'true');
      });
    }

    function pickDate(date) {
      if (!rangeStart || rangeEnd) {
        rangeStart = date; rangeEnd = null; hoverDate = null;
      } else if (isSame(rangeStart, date)) {
        rangeStart = null; hoverDate = null;
      } else {
        rangeEnd = date;
        if (rangeEnd < rangeStart) { var t = rangeStart; rangeStart = rangeEnd; rangeEnd = t; }
        hoverDate = null; updateValue(); updateClasses(); close(); return;
      }
      updateValue(); updateClasses();
    }

    function updateActive() {
      var sections = Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section'));
      var active = sections[0];
      sections.forEach(function(s) { if (s.offsetTop - scrollInner.offsetTop <= scrollInner.scrollTop + 40) active = s; });
      sections.forEach(function(s) { s.classList.toggle('dp__month-section--active', s === active); });
      if (active) {
        yearInput.value  = active.dataset.year;
        monthInput.value = +active.dataset.month + 1;
      }
    }

    function jumpTo(y, m) {
      scrollBody.innerHTML = '';
      for (var i = -3; i < 13; i++) {
        var mm = m + i, my = y;
        while (mm < 0)  { mm += 12; my--; }
        while (mm > 11) { mm -= 12; my++; }
        scrollBody.appendChild(renderSection(my, mm));
      }
      requestAnimationFrame(function() {
        var secs = scrollBody.querySelectorAll('.dp__month-section');
        scrollInner.scrollTop = secs[3] ? secs[3].offsetTop - scrollInner.offsetTop : 0;
        updateActive();
      });
    }

    function scrollToSection(offset) {
      var sections = Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section'));
      var activeIdx = 0;
      sections.forEach(function(s, i) { if (s.classList.contains('dp__month-section--active')) activeIdx = i; });
      if (offset === -1 && activeIdx === 0) { prependMonth(); sections = Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section')); activeIdx = 1; }
      if (offset === 1 && activeIdx === sections.length - 1) { appendMonth(); sections = Array.prototype.slice.call(scrollBody.querySelectorAll('.dp__month-section')); }
      var target = sections[activeIdx + offset];
      if (target) scrollInner.scrollTop = target.offsetTop - scrollInner.offsetTop;
    }

    prevBtn.addEventListener('click', function(e) { e.stopPropagation(); scrollToSection(-1); });
    nextBtn.addEventListener('click', function(e) { e.stopPropagation(); scrollToSection(1); });
    panel.querySelector('#dp-r-today').addEventListener('click', function(e) { e.stopPropagation(); jumpTo(today.getFullYear(), today.getMonth()); });
    yearInput.addEventListener('click', function(e) { e.stopPropagation(); });
    monthInput.addEventListener('click', function(e) { e.stopPropagation(); });
    yearInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') { e.preventDefault(); yearInput.blur(); } });
    monthInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') { e.preventDefault(); monthInput.blur(); } });
    yearInput.addEventListener('blur', function() {
      var y = parseInt(yearInput.value, 10);
      var active = scrollBody.querySelector('.dp__month-section--active');
      var curM = active ? +active.dataset.month : baseMonth;
      if (!isNaN(y) && y >= 1990 && y <= today.getFullYear() + 10) { jumpTo(y, curM); } else { yearInput.value = active ? active.dataset.year : baseYear; }
    });
    monthInput.addEventListener('blur', function() {
      var m = parseInt(monthInput.value, 10);
      var active = scrollBody.querySelector('.dp__month-section--active');
      var curY = active ? +active.dataset.year : baseYear;
      if (!isNaN(m) && m >= 1 && m <= 12) { jumpTo(curY, m - 1); } else { monthInput.value = active ? +active.dataset.month + 1 : baseMonth + 1; }
    });
    trigger.addEventListener('click', function() { if (!isOpen()) open(); });
    var chevronEl = trigger.querySelector('.dp__chevron');
    chevronEl.addEventListener('click', function(e) { e.stopPropagation(); isOpen() ? close() : open(); });
    function makeAdvance(el, maxLen, nextEl) {
      el.addEventListener('input', function() {
        el.value = el.value.replace(/\D/g,'').slice(0, maxLen);
        if (nextEl && el.value.length === maxLen) nextEl.focus();
      });
    }
    makeAdvance(sYrEl,4,sMoEl); makeAdvance(sMoEl,2,sDyEl); makeAdvance(sDyEl,2,eYrEl);
    makeAdvance(eYrEl,4,eMoEl); makeAdvance(eMoEl,2,eDyEl); makeAdvance(eDyEl,2,null);
    var rErrorMsg = dp.querySelector('.form-field__error');
    function setRangeError(msg) { dp.classList.add('dp--error', 'form-field--error'); if (rErrorMsg) rErrorMsg.textContent = msg; }
    function clearRangeError() { dp.classList.remove('dp--error', 'form-field--error'); if (rErrorMsg) rErrorMsg.textContent = ''; }
    function isValidDate(y,m,d) {
      if (isNaN(y)||isNaN(m)||isNaN(d)) return false;
      var dt=new Date(y,m-1,d);
      return !isNaN(dt.getTime()) && dt.getMonth()===m-1 && dt.getDate()===d;
    }
    function applyRangeParts(writeBack) {
      var sy=parseInt(sYrEl.value,10),sm=parseInt(sMoEl.value,10),sd=parseInt(sDyEl.value,10);
      var ey=parseInt(eYrEl.value,10),em=parseInt(eMoEl.value,10),ed=parseInt(eDyEl.value,10);
      var hasStart = sYrEl.value||sMoEl.value||sDyEl.value;
      var hasEnd   = eYrEl.value||eMoEl.value||eDyEl.value;
      clearRangeError();
      if (hasStart) {
        if (!isValidDate(sy,sm,sd)) { if (writeBack) setRangeError('시작 날짜가 유효하지 않습니다.'); rangeStart=null; updateClasses(); return false; }
        var s = new Date(sy,sm-1,sd);
        if (minDate && s < minDate) { if (writeBack) setRangeError('선택할 수 없는 날짜입니다.'); rangeStart=null; updateClasses(); return false; }
        rangeStart = s;
      } else { rangeStart = null; }
      if (hasEnd) {
        if (!isValidDate(ey,em,ed)) { if (writeBack) setRangeError('종료 날짜가 유효하지 않습니다.'); rangeEnd=null; updateClasses(); return false; }
        var e = new Date(ey,em-1,ed);
        if (minDate && e < minDate) { if (writeBack) setRangeError('선택할 수 없는 날짜입니다.'); rangeEnd=null; updateClasses(); return false; }
        rangeEnd = e;
      } else { rangeEnd = null; }
      if (rangeStart && rangeEnd && rangeEnd < rangeStart) { var t=rangeStart; rangeStart=rangeEnd; rangeEnd=t; }
      if (writeBack) updateValue();
      updateClasses();
      return !!(rangeStart && rangeEnd);
    }
    function onRangePartBlur() {
      setTimeout(function() {
        if (dp.contains(document.activeElement) || panel.contains(document.activeElement)) return;
        applyRangeParts(true);
        if (isOpen()) close();
      }, 0);
    }
    function syncRangeCalendarFromParts() {
      if (!isOpen()) return;
      // 선택값 업데이트
      applyRangeParts();
      // 시작 연·월 기준으로 캘린더 뷰 이동
      var y = parseInt(sYrEl.value, 10), m = parseInt(sMoEl.value, 10);
      var ty = today.getFullYear();
      if (sYrEl.value.length === 4 && !isNaN(y) && y >= 1990 && y <= ty + 10 &&
          sMoEl.value.length >= 1 && !isNaN(m) && m >= 1 && m <= 12) {
        jumpTo(y, m - 1);
      }
    }
    [sYrEl,sMoEl,sDyEl,eYrEl,eMoEl,eDyEl].forEach(function(el) {
      el.addEventListener('blur', onRangePartBlur);
      el.addEventListener('input', clearRangeError);
      el.addEventListener('input', syncRangeCalendarFromParts);
      el.addEventListener('keydown', function(e) {
        if (e.key==='Escape') { close(); el.blur(); }
        if (e.key==='Enter')  { e.preventDefault(); el.blur(); }
      });
    });
    scrollBody.addEventListener('click', function(e) {
      var btn = e.target.closest ? e.target.closest('.cal__day') : e.target;
      if (!btn || btn.dataset.inactive) return;
      e.stopPropagation();
      pickDate(fromKey(btn.dataset.date));
    });
    scrollBody.addEventListener('mouseover', function(e) {
      var btn = e.target.closest ? e.target.closest('.cal__day') : e.target;
      if (!btn || btn.dataset.inactive || !rangeStart || rangeEnd) return;
      var d = fromKey(btn.dataset.date);
      if (!isSame(d, hoverDate)) { hoverDate = d; updateClasses(); }
    });
    scrollInner.addEventListener('scroll', function() {
      updateActive();
      if (scrollInner.scrollTop < 120) prependMonth();
      if (scrollInner.scrollTop + scrollInner.clientHeight > scrollInner.scrollHeight - 120) appendMonth();
    });
    document.addEventListener('click', function(e) { if (!dp.contains(e.target) && !panel.contains(e.target)) close(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });
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
- variant 선택 규칙: 날짜 하나 → single(dp). 시작일·종료일처럼 기간을 입력받는 경우 → range(dp dp--range) 하나. 단일 두 개로 기간을 표현하지 않는다.
- root = div.dp. position:relative.
  - single: div.dp > div.dp__trigger + div.dp__panel[hidden].
  - range:  div.dp.dp--range > div.dp__trigger[시작·종료 input 모두 포함] + div.dp__panel[hidden].
    range 트리거는 버튼 2개가 아니라 div.dp__trigger 1개 안에 시작·종료 input이 함께 들어간다.
- dp__trigger = Dropdown 트리거와 동일 시각 언어: border·background·height. aria-haspopup="dialog" + aria-expanded.
  - 미선택: dp__value-part에 placeholder. dp--has-value 없음.
  - 선택됨: dp.dp--has-value → 트리거 border brand 색, 텍스트 brand 색.
- dp__panel = position:absolute. role="dialog". hidden 속성 토글.
- dp__header = 이전달 버튼 + dp__select-group(aria-live="polite", 연·월 input + 오늘 버튼) + 다음달 버튼.
- dp--open = 열린 상태 (JS 토글). dp--has-value = 날짜 선택 완료 상태 (JS 토글).
-->

### Single

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl);">

<div style="display:flex;gap:var(--space-gap-2xl);flex-wrap:wrap;align-items:flex-start;">

<!-- default -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">default</span>
  <div data-component class="dp" style="width:160px;">
    <div class="dp__trigger" aria-haspopup="dialog" aria-label="날짜 선택">
      <div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" placeholder="YYYY"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" placeholder="MM"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" placeholder="DD"></div>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </div>
  </div>
</div>

<!-- selected -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">선택됨</span>
  <div data-component class="dp dp--has-value" style="width:160px;">
    <div class="dp__trigger" aria-haspopup="dialog" aria-label="날짜 선택">
      <div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" value="2026"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" value="06"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" value="10"></div>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </div>
  </div>
</div>

<!-- disabled -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">disabled</span>
  <div data-component class="dp dp--disabled" style="width:160px;">
    <div class="dp__trigger" aria-haspopup="dialog" aria-label="날짜 선택">
      <div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" placeholder="YYYY"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" placeholder="MM"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" placeholder="DD"></div>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </div>
  </div>
</div>

<!-- error -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">error</span>
  <div data-component class="dp dp--error" style="width:160px;">
    <div class="dp__trigger" aria-haspopup="dialog" aria-label="날짜 선택">
      <div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" placeholder="YYYY"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" placeholder="MM"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" placeholder="DD"></div>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </div>
    <div class="form-field__footer"><p class="form-field__error text-helper" role="alert">유효하지 않은 날짜입니다.</p></div>
  </div>
</div>

</div>

<!-- open — 패널이 position:absolute라 별도 행으로 분리 -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">open</span>
  <div data-component class="dp dp--open dp--has-value" style="width:288px;">
    <div class="dp__trigger" aria-haspopup="dialog" aria-expanded="true" aria-label="날짜 선택">
      <div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" value="2026"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" value="06"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" value="10"></div>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </div>
    <div class="dp__panel" role="dialog" aria-label="날짜 선택" style="position:relative;">
      <div class="dp__header">
        <button class="dp__nav-btn" type="button" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>
        <div class="dp__select-group">
          <input class="dp__select-input" type="number" value="2026" min="1990" aria-label="연도">
          <span class="dp__select-label">년</span>
          <input class="dp__select-input dp__select-input--month" type="number" value="6" min="1" max="12" aria-label="월">
          <span class="dp__select-label">월</span>
          <button class="btn btn--secondary btn--solid btn--sm" type="button">오늘</button>
        </div>
        <button class="dp__nav-btn" type="button" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
      </div>
      <div class="dp__weekday-bar">
        <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span>
        <span class="cal__weekday" role="columnheader" aria-label="월요일">월</span>
        <span class="cal__weekday" role="columnheader" aria-label="화요일">화</span>
        <span class="cal__weekday" role="columnheader" aria-label="수요일">수</span>
        <span class="cal__weekday" role="columnheader" aria-label="목요일">목</span>
        <span class="cal__weekday" role="columnheader" aria-label="금요일">금</span>
        <span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
      </div>
      <div class="cal"><div class="cal__grid" role="grid" aria-label="2026년 6월">
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

</div>
:::

### Range

:::preview
<div style="display:flex;flex-direction:column;gap:var(--space-gap-2xl);align-items:flex-start;">

<!-- default -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">default</span>
  <div data-component class="dp dp--range" style="width:280px;">
    <div class="dp__trigger" aria-haspopup="dialog" aria-expanded="false" aria-label="기간 선택">
      <div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" placeholder="YYYY"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" placeholder="MM"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" placeholder="DD"><span class="dp__value-sep dp__value-sep--range">~</span><input class="dp__value-part dp__value-part--year" type="text" placeholder="YYYY"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" placeholder="MM"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" placeholder="DD"></div>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </div>
  </div>
</div>

<!-- open (범위 선택됨, 세로 스크롤) -->
<div style="display:flex;flex-direction:column;gap:var(--space-gap-xs);">
  <span style="font-size:var(--font-size-label);color:var(--color-text-subtle);">open</span>
  <div data-component class="dp dp--range dp--open dp--has-value" style="width:288px;">
    <button class="dp__trigger" type="button" aria-haspopup="dialog" aria-expanded="true" aria-label="기간 선택">
      <div class="dp__value-group"><input class="dp__value-part dp__value-part--year" type="text" value="2026"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" value="06"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" value="25"><span class="dp__value-sep dp__value-sep--range">~</span><input class="dp__value-part dp__value-part--year" type="text" value="2026"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" value="07"><span class="dp__value-sep">.</span><input class="dp__value-part dp__value-part--md" type="text" value="08"></div>
      <span class="dp__chevron" aria-hidden="true"><span class="icon icon--sm"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-calendar"/></svg></span></span>
    </div>
    <div class="dp__panel dp__panel--scroll" role="dialog" aria-label="기간 선택" aria-multiselectable="true" style="position:relative;max-height:none;overflow:visible;">
      <div class="dp__sticky-header">
        <div class="dp__header">
          <button class="dp__nav-btn" type="button" aria-label="이전 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-left"/></svg></span></button>
          <div class="dp__select-group" aria-live="polite" aria-atomic="true">
            <input class="dp__select-input" type="number" value="2026" min="1990" aria-label="연도">
            <span class="dp__select-label">년</span>
            <input class="dp__select-input dp__select-input--month" type="number" value="6" min="1" max="12" aria-label="월">
            <span class="dp__select-label">월</span>
            <button class="btn btn--secondary btn--solid btn--sm" type="button">오늘</button>
          </div>
          <button class="dp__nav-btn" type="button" aria-label="다음 달"><span class="icon icon--sm" aria-hidden="true"><svg aria-hidden="true"><use href="icons/sprite.svg#icon-chevron-right"/></svg></span></button>
        </div>
        <div class="dp__weekday-bar">
          <span class="cal__weekday" role="columnheader" aria-label="일요일">일</span><span class="cal__weekday" role="columnheader" aria-label="월요일">월</span><span class="cal__weekday" role="columnheader" aria-label="화요일">화</span><span class="cal__weekday" role="columnheader" aria-label="수요일">수</span><span class="cal__weekday" role="columnheader" aria-label="목요일">목</span><span class="cal__weekday" role="columnheader" aria-label="금요일">금</span><span class="cal__weekday" role="columnheader" aria-label="토요일">토</span>
        </div>
      </div>
      <div class="dp__scroll-inner" style="overflow:visible;">
      <div class="dp__scroll-body">
        <!-- 6월 (활성) -->
        <div class="dp__month-section dp__month-section--active">
          <div class="dp__month-divider">2026년 6월</div>
          <div class="cal"><div class="cal__grid" role="grid" aria-label="2026년 6월" aria-multiselectable="true">
            <div class="cal__week" role="row">
              <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">31</button>
              <button class="cal__day cal__day--disabled" role="gridcell" tabindex="-1">1</button>
              <button class="cal__day cal__day--disabled" role="gridcell" tabindex="-1">2</button>
              <button class="cal__day cal__day--disabled" role="gridcell" tabindex="-1">3</button>
              <button class="cal__day cal__day--disabled" role="gridcell" tabindex="-1">4</button>
              <button class="cal__day cal__day--today" role="gridcell" aria-current="date" tabindex="-1">5</button>
              <button class="cal__day" role="gridcell" tabindex="-1">6</button>
            </div>
            <div class="cal__week" role="row">
              <button class="cal__day" role="gridcell" tabindex="-1">7</button><button class="cal__day" role="gridcell" tabindex="-1">8</button><button class="cal__day" role="gridcell" tabindex="-1">9</button><button class="cal__day" role="gridcell" tabindex="-1">10</button><button class="cal__day" role="gridcell" tabindex="-1">11</button><button class="cal__day" role="gridcell" tabindex="-1">12</button><button class="cal__day" role="gridcell" tabindex="-1">13</button>
            </div>
            <div class="cal__week" role="row">
              <button class="cal__day" role="gridcell" tabindex="-1">14</button><button class="cal__day" role="gridcell" tabindex="-1">15</button><button class="cal__day" role="gridcell" tabindex="-1">16</button><button class="cal__day" role="gridcell" tabindex="-1">17</button><button class="cal__day" role="gridcell" tabindex="-1">18</button><button class="cal__day" role="gridcell" tabindex="-1">19</button><button class="cal__day" role="gridcell" tabindex="-1">20</button>
            </div>
            <div class="cal__week" role="row">
              <button class="cal__day" role="gridcell" tabindex="-1">21</button><button class="cal__day" role="gridcell" tabindex="-1">22</button><button class="cal__day" role="gridcell" tabindex="-1">23</button><button class="cal__day" role="gridcell" tabindex="-1">24</button>
              <button class="cal__day cal__day--range-start" role="gridcell" aria-selected="true" tabindex="0">25</button>
              <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">26</button>
              <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">27</button>
            </div>
            <div class="cal__week" role="row">
              <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">28</button>
              <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">29</button>
              <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">30</button>
              <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">1</button><button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">2</button><button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">3</button><button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">4</button>
            </div>
          </div></div>
        </div>
        <!-- 7월 (비활성) -->
        <div class="dp__month-section">
          <div class="dp__month-divider">2026년 7월</div>
          <div class="cal"><div class="cal__grid" role="grid" aria-label="2026년 7월" aria-multiselectable="true">
            <div class="cal__week" role="row">
              <button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">1</button><button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">2</button><button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">3</button><button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">4</button><button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">5</button><button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">6</button><button class="cal__day cal__day--in-range" role="gridcell" aria-selected="true" tabindex="-1">7</button>
            </div>
            <div class="cal__week" role="row">
              <button class="cal__day cal__day--range-end" role="gridcell" aria-selected="true" tabindex="0">8</button>
              <button class="cal__day" role="gridcell" tabindex="-1">9</button><button class="cal__day" role="gridcell" tabindex="-1">10</button><button class="cal__day" role="gridcell" tabindex="-1">11</button><button class="cal__day" role="gridcell" tabindex="-1">12</button><button class="cal__day" role="gridcell" tabindex="-1">13</button><button class="cal__day" role="gridcell" tabindex="-1">14</button>
            </div>
            <div class="cal__week" role="row">
              <button class="cal__day" role="gridcell" tabindex="-1">15</button><button class="cal__day" role="gridcell" tabindex="-1">16</button><button class="cal__day" role="gridcell" tabindex="-1">17</button><button class="cal__day" role="gridcell" tabindex="-1">18</button><button class="cal__day" role="gridcell" tabindex="-1">19</button><button class="cal__day" role="gridcell" tabindex="-1">20</button><button class="cal__day" role="gridcell" tabindex="-1">21</button>
            </div>
            <div class="cal__week" role="row">
              <button class="cal__day" role="gridcell" tabindex="-1">22</button><button class="cal__day" role="gridcell" tabindex="-1">23</button><button class="cal__day" role="gridcell" tabindex="-1">24</button><button class="cal__day" role="gridcell" tabindex="-1">25</button><button class="cal__day" role="gridcell" tabindex="-1">26</button><button class="cal__day" role="gridcell" tabindex="-1">27</button><button class="cal__day" role="gridcell" tabindex="-1">28</button>
            </div>
            <div class="cal__week" role="row">
              <button class="cal__day" role="gridcell" tabindex="-1">29</button><button class="cal__day" role="gridcell" tabindex="-1">30</button><button class="cal__day" role="gridcell" tabindex="-1">31</button>
              <button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">1</button><button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">2</button><button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">3</button><button class="cal__day cal__day--outside" role="gridcell" tabindex="-1">4</button>
            </div>
          </div></div>
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
.dp {
  position: relative;
  display: inline-flex;
  flex-direction: column;
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
  cursor: text;
  white-space: nowrap;
  transition: border-color var(--duration-fast) var(--easing-base),
              background var(--duration-fast) var(--easing-base),
              box-shadow var(--duration-fast) var(--easing-base);
}
.dp__trigger:hover {
  border-color: var(--color-border-brand-subtle);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
.dp__trigger:focus-within {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}

/* ── Value group (분리 입력) ── */
.dp__value-group {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}
.dp__value-part {
  border: none;
  background: transparent;
  padding: 0;
  font: inherit;
  color: var(--color-text-body);
  outline: none; /* 포커스 시각은 부모 .dp__trigger:focus-within의 border-color + box-shadow가 대신 담당 */
  cursor: text;
  text-align: center;
}
.dp__value-part--year { width: 44px; }
.dp__value-part--md   { width: 26px; }
.dp__value-part::placeholder { color: var(--color-text-subtle); }
.dp__value-part:placeholder-shown { color: var(--color-text-subtle); }
.dp__value-sep {
  color: var(--color-text-subtle);
  user-select: none;
  flex-shrink: 0;
}
.dp__value-sep--range { padding: 0 var(--space-gap-xs); }

/* 날짜가 선택된 트리거 — 브랜드 테두리·텍스트 */
.dp--has-value .dp__trigger { border-color: var(--color-border-brand); }
.dp--has-value .dp__value-part:not(:placeholder-shown) { color: var(--color-text-brand); }
.dp--has-value .dp__value-sep { color: var(--color-text-brand); }
.dp--has-value .dp__chevron { color: var(--color-text-brand); }

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
  z-index: var(--z-dropdown);
  padding: var(--space-inset-lg) var(--space-inset-sm) var(--space-inset-sm);
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

/* ── 헤더 연도·월 셀렉트 ── */
.dp__select-group {
  display: flex;
  align-items: center;
  gap: var(--space-gap-sm);
}
/* .input와 동일한 시각 언어 */
.dp__select-input {
  width: 56px;
  height: var(--height-compact);
  padding: var(--space-inset-squish-sm);
  border: var(--stroke-sm) var(--stroke-solid) var(--color-border-default);
  border-radius: var(--radius-xs);
  background: var(--color-surface-base);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--color-text-body);
  line-height: var(--line-height-ui);
  text-align: center;
  -moz-appearance: textfield;
  transition: border-color var(--duration-fast) var(--easing-base),
              box-shadow var(--duration-fast) var(--easing-base);
}
.dp__select-input::-webkit-outer-spin-button,
.dp__select-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.dp__select-input--month { width: 34px; }
.dp__select-input:hover:not(:disabled) {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
.dp__select-input:focus-visible {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 var(--stroke-lg) var(--color-action-brand-hover);
}
.dp__select-input:disabled {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  color: var(--color-text-disabled);
  pointer-events: none;
}
.dp__select-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-display);
  line-height: var(--line-height-ui);
}

/* ── Disabled ── */
.dp--disabled .dp__trigger {
  background: var(--color-surface-disabled);
  border-color: var(--color-border-disabled);
  pointer-events: none;
  cursor: default;
}
.dp--disabled .dp__value-part { color: var(--color-text-disabled); }
.dp--disabled .dp__value-sep { color: var(--color-text-disabled); }
.dp--disabled .dp__chevron { color: var(--color-text-disabled); }
.dp--disabled .dp__range-sep { color: var(--color-text-disabled); }

/* ── Error ── */
.dp--error .dp__trigger { border-color: var(--color-border-error); }
.dp--error .dp__trigger:hover:not(:disabled) { border-color: var(--color-border-error); }
.dp .form-field__error { color: var(--color-text-error); font-size: var(--font-size-label); }

/* ── Scroll panel (range mode) ── */
.dp__panel--scroll {
  max-height: 440px;
  overflow: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
}
/* 상단 고정 헤더 — 내비게이션 + 요일 바 묶음 */
.dp__sticky-header {
  flex-shrink: 0;
  background: var(--color-surface-base);
  padding: var(--space-inset-lg) var(--space-inset-sm) 0;
}
.dp__sticky-header .dp__header {
  margin-bottom: var(--space-gap-sm);
}
/* 고정 요일 바 — 단일·범위 공통 */
.dp__weekday-bar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: var(--space-gap-xs);
}
/* 일·토 색상 */
.dp__weekday-bar > .cal__weekday:first-child { color: var(--color-text-error); }
.dp__weekday-bar > .cal__weekday:last-child  { color: var(--color-text-brand-vivid); }
/* 범위 스크롤 패널 안에서는 좌우 패딩·구분선 추가 */
.dp__panel--scroll .dp__weekday-bar {
  padding: 0 var(--space-inset-sm);
  margin-bottom: 0;
  border-bottom: var(--stroke-sm) solid var(--color-border-default);
}
/* 스크롤 영역 */
.dp__scroll-inner {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.dp__scroll-body {
  padding: var(--space-inset-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-sm);
}

/* 월 구분선 — 스크롤 body 내 각 달 레이블 */
.dp__month-divider {
  display: flex;
  align-items: center;
  gap: var(--space-gap-sm);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-subtle);
  line-height: var(--line-height-ui);
  padding: var(--space-inset-xs) 0 var(--space-gap-sm);
}
.dp__month-divider::before,
.dp__month-divider::after {
  content: '';
  flex: 1;
  height: var(--stroke-sm);
  background: var(--color-border-subtle);
}
/* 활성 월 레이블만 brand 색상 */
.dp__month-section--active .dp__month-divider {
  color: var(--color-text-brand);
}
.dp__month-section--active .dp__month-divider::before,
.dp__month-section--active .dp__month-divider::after {
  background: var(--color-border-brand-subtle);
}
/* 비활성 월 레이블 */
.dp__month-section:not(.dp__month-section--active) .dp__month-divider {
  color: var(--color-text-subtle);
  font-weight: var(--font-weight-semibold);
}

/* ── 월 전환 슬라이드 애니메이션 ── */
@keyframes dp-slide-next {
  from { opacity: 0.2; transform: translateX(10px); }
  to   { opacity: 1;   transform: translateX(0); }
}
@keyframes dp-slide-prev {
  from { opacity: 0.2; transform: translateX(-10px); }
  to   { opacity: 1;   transform: translateX(0); }
}
.dp--slide-next .cal { animation: dp-slide-next var(--duration-base) var(--easing-base) both; }
.dp--slide-prev .cal { animation: dp-slide-prev var(--duration-base) var(--easing-base) both; }
```

```js init
/* DatePicker 초기화 — single/range 자동 감지, 숫자 전용, 자동 이동, dp--has-value */
function initDP(dp) {
  var parts = dp.querySelectorAll('.dp__value-part');
  var isRange = dp.classList.contains('dp--range');
  function advance(el, maxLen, nextEl) {
    el.addEventListener('input', function() {
      el.value = el.value.replace(/\D/g, '').slice(0, maxLen);
      if (nextEl && el.value.length === maxLen) nextEl.focus();
      dp.classList.toggle('dp--has-value', Array.prototype.every.call(parts, function(p) { return p.value.length > 0; }));
    });
  }
  if (isRange) {
    /* range: [s-yr, s-mo, s-dy, e-yr, e-mo, e-dy] */
    advance(parts[0], 4, parts[1]); advance(parts[1], 2, parts[2]);
    advance(parts[2], 2, parts[3]); advance(parts[3], 4, parts[4]);
    advance(parts[4], 2, parts[5]); advance(parts[5], 2, null);
  } else {
    /* single: [yr, mo, dy] */
    advance(parts[0], 4, parts[1]); advance(parts[1], 2, parts[2]); advance(parts[2], 2, null);
  }
  dp.querySelector('.dp__trigger').addEventListener('click', function(e) {
    if (!e.target.closest('.dp__value-part')) parts[0].focus();
  });
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
| 월 레이블 | `aria-live="polite" aria-atomic="true"` — 월 이동 시 스크린 리더에 변경 고지 |
| 이전/다음 달 버튼 | `aria-label="이전 달"` · `"다음 달"` |
| 이전/다음 달 버튼 (비활성) | `aria-disabled="true"` + `tabindex="-1"` — min-date 제한으로 이동 불가 시 적용 |
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

> ❌ DON'T — 기간 입력에 단일 DatePicker 두 개를 나란히 배치
> `dp--range` 하나로 대체한다. 두 개 배치는 시각적으로 분리되어 보이고, 시작·종료 간 유효성 검사를 별도로 처리해야 하는 복잡성이 생긴다

> ❌ DON'T — 패널 내 `dp__header`를 생략
> 트리거에는 월 이동 버튼이 없으므로 패널 헤더가 반드시 필요하다

> ✅ DO — 날짜 선택 완료 시 `.dp`에 `dp--has-value` 클래스 추가, 초기화(값 전체 삭제) 시 제거
> single: 유효한 날짜가 선택됐을 때 / range: 시작·종료 모두 확정됐을 때 추가한다

> ❌ DON'T — `data-component` 속성을 실제 코드에 포함
