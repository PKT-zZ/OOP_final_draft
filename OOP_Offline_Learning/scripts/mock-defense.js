(function () {
  'use strict';

  function mount(root, { presets, escape, renderQuestion, renderAnswer, rate }) {
    let questions = [];
    let results = [];
    let answer = '';
    let seconds = 0;
    let interval;

    function stopClock() {
      clearInterval(interval);
    }

    function startClock() {
      if (seconds === 0) return;
      const clock = root.querySelector('[data-mock-clock]');
      const end = Date.now() + seconds * 1000;
      function tick() {
        const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
        clock.textContent = left ? left + ' giây' : 'Hết giờ suy nghĩ. Bạn vẫn có thể trả lời.';
        if (!left) stopClock();
      }
      interval = setInterval(tick, 250);
      tick();
    }

    function renderSetup() {
      root.innerHTML = `<form class="mock-setup">
        <div class="filters">
          <label>Phạm vi<select name="preset">${presets.map((preset, index) =>
            `<option value="${index}" ${preset.items.length < 5 ? 'disabled' : ''}>${escape(preset.label)} · ${preset.items.length} câu</option>`).join('')}</select></label>
          <label>Số câu<select name="count"><option>5</option><option>7</option><option>10</option></select></label>
          <label>Thời gian mỗi câu<select name="seconds"><option value="0">Không tính giờ</option>
            <option value="30">30 giây</option><option value="60">60 giây</option><option value="120">120 giây</option></select></label>
        </div>
        <button class="button primary" type="submit">Bắt đầu bảo vệ thử</button>
      </form>`;
    }

    function renderCurrent(revealed) {
      const current = questions[results.length];
      root.innerHTML = `<div class="section-head"><h2>Câu ${results.length + 1} / ${questions.length}</h2>
        ${seconds && !revealed ? '<span class="countdown" data-mock-clock></span>' : ''}</div>
        ${renderQuestion(current)}
        ${revealed ? `
          ${answer.trim() ? `<details class="mock-draft"><summary>Câu trả lời của bạn</summary><p>${escape(answer)}</p></details>` : ''}
          ${renderAnswer(current)}
          <p>Tự đối chiếu với các ý cần đạt, rồi chọn kết quả.</p>
          <div class="actions"><button class="button primary" type="button" data-mock-action="pass">Đạt</button>
            <button class="button" type="button" data-mock-action="review">Cần ôn lại</button></div>`
          : `<label class="mock-response">Ghi câu trả lời nếu muốn<textarea rows="4" name="answer">${escape(answer)}</textarea></label>
            <button class="button primary" type="button" data-mock-action="reveal">Đối chiếu đáp án</button>`}
          <p class="mock-quit"><button class="text-link" type="button" data-mock-action="quit">Kết thúc lượt</button></p>`;
      root.querySelector('h2').tabIndex = -1;
      root.querySelector('h2').focus();
      if (!revealed) startClock();
    }

    function renderSummary() {
      const passed = results.filter(item => item.passed).length;
      const topics = [...new Set(results.filter(item => !item.passed).map(item => item.question.topic))];
      root.innerHTML = `<h2>Tổng kết lượt bảo vệ thử</h2>
        <p>${results.length} / ${questions.length} câu đã tự đánh giá · ${passed} câu đạt</p>
        ${topics.length ? `<p>Chủ đề cần ôn: ${escape(topics.join(', '))}</p>` : ''}
        ${results.length ? `<ul class="review-summary">${results.map(item =>
          `<li><span class="badge">${item.passed ? 'Đạt' : 'Cần ôn lại'}</span> <a href="#defense/${escape(item.question.id)}">${escape(item.question.question)}</a></li>`).join('')}</ul>` : ''}
        <button class="button primary" type="button" data-mock-action="restart">Luyện lượt mới</button>`;
      root.querySelector('h2').tabIndex = -1;
      root.querySelector('h2').focus();
    }

    function adjustCounts(form) {
      const size = presets[Number(form.elements.preset.value)].items.length;
      for (const option of form.elements.count.options) option.disabled = Number(option.value) > size;
      if (form.elements.count.selectedOptions[0].disabled) form.elements.count.value = '5';
    }

    root.addEventListener('change', event => {
      if (event.target.name === 'preset') adjustCounts(event.target.form);
    });
    root.addEventListener('submit', event => {
      event.preventDefault();
      const form = event.target;
      const items = [...presets[Number(form.elements.preset.value)].items];
      for (let index = items.length - 1; index > 0; index--) {
        const other = Math.floor(Math.random() * (index + 1));
        [items[index], items[other]] = [items[other], items[index]];
      }
      seconds = Number(form.elements.seconds.value);
      questions = items.slice(0, Number(form.elements.count.value));
      results = [];
      answer = '';
      renderCurrent(false);
    });
    root.addEventListener('click', event => {
      const action = event.target.closest('button')?.dataset.mockAction;
      if (!action) return;
      stopClock();
      if (action === 'reveal') {
        answer = root.querySelector('textarea').value;
        renderCurrent(true);
      } else if (action === 'pass' || action === 'review') {
        const question = questions[results.length];
        const passed = action === 'pass';
        results.push({ question, passed });
        rate(question.id, passed ? 'Đã hiểu' : 'Cần ôn lại');
        answer = '';
        if (results.length === questions.length) renderSummary();
        else renderCurrent(false);
      } else if (action === 'quit') renderSummary();
      else if (action === 'restart') {
        renderSetup();
        adjustCounts(root.querySelector('form'));
        root.querySelector('select').focus();
      }
    });
    renderSetup();
    adjustCounts(root.querySelector('form'));
    return stopClock;
  }

  window.OOPMockDefense = { mount };
}());
