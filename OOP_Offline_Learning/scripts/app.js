(function () {
  'use strict';

  const course = window.OOPCourse;
  const practice = window.OOPPractice;
  const progress = window.OOPProgress;
  const main = document.getElementById('main');
  const sidebar = document.getElementById('sidebar');
  const workspace = document.querySelector('.workspace');
  const skipLink = document.querySelector('.skip-link');
  const navigation = document.getElementById('navigation');
  const search = document.getElementById('search');
  const searchResults = document.getElementById('search-results');
  const menu = document.getElementById('menu-toggle');
  const scrim = document.getElementById('scrim');
  const theme = document.getElementById('theme');
  const systemDark = matchMedia('(prefers-color-scheme: dark)');
  const smallScreen = matchMedia('(max-width: 820px)');
  const chapters = course.sections.flatMap(section => section.chapters.map(chapter => ({ ...chapter, section: section.title })));
  const available = chapters.filter(chapter => Object.hasOwn(course.lessons, chapter.id));
  const quizCatalog = available.flatMap(chapter => course.lessons[chapter.id].quiz.map((item, index) => ({
    item, chapter, index, key: chapter.id + ':' + index
  })));
  const tools = [
    { id: 'defense', title: 'Ngân hàng vấn đáp', summary: 'Luyện giải thích khái niệm và truy vết mã', mark: '⌁' },
    { id: 'mock-defense', title: 'Bảo vệ thử', summary: 'Luyện một lượt và tự đối chiếu các ý cần đạt', mark: '◈' },
    { id: 'simulation', title: 'Mô phỏng', summary: 'Thử quy tắc UC01–UC04, State và Strategy', mark: '▱' },
    { id: 'quiz', title: 'Quiz theo chủ đề', summary: 'Tự kiểm tra theo phần hoặc làm bài tổng hợp', mark: '✓' },
    { id: 'flashcards', title: 'Flashcards', summary: '12 tình huống ôn nhanh', mark: '▤' }
  ];
  const tabs = [
    { id: 'theory', label: 'Lý thuyết' }, { id: 'example', label: 'Ví dụ cơ bản' },
    { id: 'project', label: 'Liên hệ dự án' }, { id: 'defense', label: 'Câu hỏi bảo vệ' }
  ];
  const ratings = ['Đã hiểu', 'Cần ôn lại', 'Chưa biết'];
  const chapterMarks = { oop: '◈', csharp: 'C#', encapsulation: '{ }', patterns: '⊞' };
  const openSections = new Set([0]);
  const quizStates = new Map();
  const quizAttempts = new Map();
  const quizSections = course.sections.map(section => section.title);
  let quizSection = '';
  let page = 'home';
  let currentChapter;
  let currentTab = 'theory';
  let mobileOpen = false;
  let toastTimeout;
  let cardIndex = 0;
  let showCardAnswer = false;
  let reviewCards = false;
  let simulationIndex = 0;
  let questionTopic = '';
  let questionDifficulty = '';
  let questionMode = '';
  let questionSeconds = 30;
  let question = practice.questions[0];
  let answerVisible = false;
  let timer;
  let timerEnd = 0;
  let simulatorId = '';
  let unmountMock;

  function escape(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
  }

  function normalize(value) {
    return String(value).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replaceAll('đ', 'd');
  }

  const chapterSearch = chapters.map(chapter => ({
    ...chapter,
    searchTitle: normalize(chapter.title),
    searchText: normalize(JSON.stringify(chapter) + JSON.stringify(course.lessons[chapter.id] ?? ''))
  }));

  function lessonUrl(id) { return '#lesson/' + id; }
  function completed(id) { return progress.data.completed.includes(id); }
  function percent() { return Math.round(progress.data.completed.length / available.length * 100); }

  function heading(title, description, eyebrow) {
    return `<header class="page-header">${eyebrow ? `<p class="eyebrow">${escape(eyebrow)}</p>` : ''}
      <h1>${escape(title)}</h1><p>${escape(description)}</p></header>`;
  }

  function currentAttribute(active) { return active ? ' aria-current="page"' : ''; }
  function button(label, action, modifier = '') {
    return `<button class="button ${modifier}" type="button" data-action="${action}">${label}</button>`;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => { toast.hidden = true; }, 3500);
  }

  function applyTheme() {
    const dark = progress.data.theme === 'dark' || (progress.data.theme === 'system' && systemDark.matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    theme.setAttribute('aria-pressed', String(dark));
    theme.title = dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối';
    theme.firstElementChild.textContent = dark ? '☀' : '☾';
  }

  function updateStorageNotice() {
    const notice = document.getElementById('storage-notice');
    notice.hidden = progress.available && !progress.notice;
    notice.firstChild.textContent = progress.available && progress.notice
      ? progress.notice + ' '
      : 'Trình duyệt đang chặn lưu tiến độ. Bạn có thể xuất tệp JSON trước khi đóng trang. ';
  }

  function save() {
    const priorTheme = progress.data.theme;
    progress.save();
    if (progress.data.theme !== priorTheme) applyTheme();
    updateStorageNotice();
  }

  function updateDrawer(restoreFocus = false) {
    const mobile = smallScreen.matches;
    const drawerOpen = mobile && mobileOpen;
    sidebar.inert = mobile && !mobileOpen;
    workspace.inert = drawerOpen;
    skipLink.inert = drawerOpen;
    document.body.classList.toggle('menu-open', drawerOpen);
    scrim.hidden = !drawerOpen;
    menu.setAttribute('aria-expanded', String(drawerOpen));
    menu.setAttribute('aria-label', mobileOpen ? 'Đóng điều hướng' : 'Mở điều hướng');
    if (restoreFocus && mobile) menu.focus();
  }

  function renderNavigation() {
    navigation.innerHTML = `
      <a class="nav-link nav-home" href="#home"${currentAttribute(page === 'home')}><span aria-hidden="true">⌂</span> Tổng quan</a>
      <h2 class="nav-label">Lộ trình học</h2>
      ${course.sections.map((section, index) => {
        const active = openSections.has(index);
        return `<details class="nav-group" data-section="${index}" ${active ? 'open' : ''}>
          <summary><span>${escape(section.title)}</span><span class="nav-chevron" aria-hidden="true"></span></summary>
          <ul>${section.chapters.map(chapter => {
            const ready = Object.hasOwn(course.lessons, chapter.id);
            const number = chapters.findIndex(item => item.id === chapter.id) + 1;
            const marker = completed(chapter.id) ? '<span class="nav-done" aria-label="Đã học">✓</span>' : '';
            return `<li><a class="nav-lesson ${ready ? '' : 'nav-planned'}" href="${lessonUrl(chapter.id)}"${currentAttribute(currentChapter?.id === chapter.id)}>
              <span class="nav-number">${String(number).padStart(2, '0')}</span><span>${escape(chapter.title)}</span>${marker}
              ${ready ? '' : '<span class="sr-only"> (trong lộ trình)</span>'}</a></li>`;
          }).join('')}</ul></details>`;
      }).join('')}
      <h2 class="nav-label nav-label-practice">Luyện tập</h2>
      ${tools.map(tool => `<a class="nav-link" href="#${tool.id}"${currentAttribute(page === tool.id)}><span aria-hidden="true">${tool.mark}</span> ${tool.title}</a>`).join('')}
      <a class="nav-link" href="#progress"${currentAttribute(page === 'progress')}><span aria-hidden="true">◴</span> Tiến độ của tôi</a>`;
  }

  function renderSearch() {
    const tokens = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    searchResults.hidden = tokens.length === 0;
    navigation.hidden = tokens.length > 0;
    if (tokens.length === 0) return;

    const phrase = tokens.join(' ');
    const titleRank = item => {
      if (item.searchTitle === phrase) return 3;
      if (item.searchTitle.includes(phrase)) return 2;
      return tokens.every(token => item.searchTitle.includes(token)) ? 1 : 0;
    };
    const matches = chapterSearch.filter(item => tokens.every(token => item.searchText.includes(token)))
      .sort((left, right) => titleRank(right) - titleRank(left));
    const toolMatches = tools.filter(tool => tokens.every(token => normalize(tool.title + ' ' + tool.summary).includes(token)));
    const questionMatches = practice.questions.filter(item => tokens.every(token =>
      normalize(item.topic + ' ' + item.question).includes(token))).slice(0, 6);
    const total = matches.length + toolMatches.length + questionMatches.length;
    searchResults.innerHTML = `<p class="search-count" role="status">${total} kết quả hiển thị</p>
      ${matches.map(item => `<a href="${lessonUrl(item.id)}">${escape(item.title)}<small>${Object.hasOwn(course.lessons, item.id) ? escape(item.section) : 'Trong lộ trình'}</small></a>`).join('')}
      ${toolMatches.map(tool => `<a href="#${tool.id}">${tool.title}<small>Luyện tập</small></a>`).join('')}
      ${questionMatches.map(item => `<a href="#defense/${escape(item.id)}">${escape(item.question)}<small>Vấn đáp · ${escape(item.topic)}</small></a>`).join('')}
      ${total === 0 ? '<p>Thử “đóng gói”, “State” hoặc tên lớp C#.</p>' : ''}`;
  }

  function progressRing() {
    return `<div class="progress-ring" style="--progress:${percent()}%" aria-label="Tiến độ ${percent()} phần trăm"><span>${percent()}%</span></div>`;
  }

  function renderHome() {
    const next = available.find(chapter => chapter.id === progress.data.last)
      ?? available.find(chapter => !completed(chapter.id)) ?? available[0];
    main.innerHTML = `
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow hero-kicker">C# / .NET 8 <span></span> Quản lý NCKH</p>
          <h1>Học OOP qua<br>bài tập lớn của bạn</h1>
          <p>Đi từ class và object đến mã nguồn quản lý đề tài. Đọc từng đoạn code, thử các quy tắc nghiệp vụ và luyện giải thích bằng lời của bạn.</p>
          <div class="actions">
            <a class="button hero-primary" href="${lessonUrl(next.id)}">${progress.data.last ? 'Tiếp tục học' : 'Bắt đầu học'}</a>
            <a class="button hero-secondary" href="#simulation">Thử mô phỏng</a>
          </div>
        </div>
        <div class="hero-art" role="img" aria-label="Ví dụ class ResearchProject tạo ra hai object P001 và P003, mỗi object có trạng thái riêng">
          <div class="hero-class"><span class="hero-code-label">CLASS</span><strong>ResearchProject</strong>
            <code><span>string</span> Id<br><span>ProjectStatus</span> Status</code>
          </div>
          <div class="hero-objects">
            <div class="hero-object"><span class="hero-code-label">OBJECT</span><strong>P001</strong><code>Active</code></div>
            <div class="hero-object"><span class="hero-code-label">OBJECT</span><strong>P003</strong><code>Pending</code></div>
          </div>
        </div>
      </section>
      <div class="dashboard-grid">
        <section aria-labelledby="ready-title">
          <div class="section-head"><div><h2 id="ready-title">Bài học</h2><p>Từ kiến thức OOP đến phân tích mã và bảo vệ dự án.</p></div><span class="badge">${available.length} bài sẵn sàng</span></div>
          <div class="lesson-grid">
            ${available.map(chapter => `<a class="lesson-card" href="${lessonUrl(chapter.id)}">
              <span class="lesson-symbol" data-symbol="${chapter.id}" aria-hidden="true">${chapterMarks[chapter.id] ?? '◇'}</span>
              <div class="lesson-meta">Chương ${chapters.indexOf(chapter) + 1} <span>·</span> ${course.lessons[chapter.id].minutes} phút${completed(chapter.id) ? ' · ✓ Đã học' : ''}</div>
              <h3>${escape(chapter.title)}</h3><p>${escape(chapter.summary)}</p>
            </a>`).join('')}
          </div>
        </section>
        <aside class="dashboard-side" aria-label="Tiến độ và công cụ luyện tập">
          <section class="panel progress-panel">
            <h2>Tiến độ của bạn</h2>
            <div class="progress-overview">${progressRing()}<div><strong>${progress.data.completed.length} / ${available.length} bài</strong><p>Đã đánh dấu hoàn thành</p></div></div>
            <p>${quizAttempts.size} câu quiz đã thử trong phiên</p>
            <p>${Object.keys(progress.data.questions).length} câu vấn đáp đã tự đánh giá</p>
            <div class="actions"><a class="text-link" href="#progress">Xem tiến độ</a>
              <a class="text-link" href="#progress/review">Nội dung cần ôn</a></div>
          </section>
          <section class="panel tools-panel"><h2>Luyện tập</h2>
            ${tools.map(tool => `<a href="#${tool.id}" class="tool-link"><span class="tool-mark" aria-hidden="true">${tool.mark}</span><span><strong>${tool.title}</strong><small>${tool.summary}</small></span></a>`).join('')}
          </section>
        </aside>
      </div>
      <section class="roadmap" aria-labelledby="map-title">
        <div class="section-head"><div><h2 id="map-title">Lộ trình khóa học</h2><p>Học theo thứ tự hoặc mở chủ đề cần ôn.</p></div></div>
        <ol class="roadmap-list">${course.sections.map(section => `<li class="panel"><h3>${escape(section.title)}</h3>
          <ul>${section.chapters.map(chapter => `<li><a href="${lessonUrl(chapter.id)}">${escape(chapter.title)}</a>
            ${Object.hasOwn(course.lessons, chapter.id) ? '' : '<small>Trong lộ trình</small>'}</li>`).join('')}</ul></li>`).join('')}</ol>
      </section>
      <section class="scope-grid" aria-label="Phạm vi bài tập lớn">
        <article class="panel"><span class="badge">Mã hiện hành</span><h2>Phần A · UC01–UC04</h2>
          <p>Quản lý đơn vị và nhà nghiên cứu, đề xuất đề tài, gán và duyệt, phân bổ kinh phí. Menu cũng có hai báo cáo kinh phí thuộc UC08.</p></article>
        <article class="panel"><span class="badge">Mã hiện hành</span><h2>Phần B · UC05–UC08</h2>
          <p>Menu 13–21 lập hội đồng, ghi điểm, nghiệm thu, ghi đầu ra, tổng hợp và tra cứu. <code>ResultCompletionEvidence</code> lấy điểm và đầu ra từ kho đang dùng để xác nhận hoàn thành đề tài.</p>
          <a class="text-link" href="#lesson/use-cases">Phạm vi từng ca sử dụng</a></article>
      </section>`;
  }

  function highlightCSharp(code) {
    const tokens = /(\/\*[\s\S]*?\*\/|\/\/[^\r\n]*|\$?"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:abstract|base|bool|catch|class|const|decimal|else|enum|false|foreach|get|if|int|interface|internal|new|null|override|private|protected|public|readonly|record|return|sealed|set|static|string|switch|this|throw|true|try|using|var|virtual|void)\b|\b\d+(?:\.\d+)?[mMdDfF]?\b)/g;
    let result = '';
    let end = 0;
    for (const match of code.matchAll(tokens)) {
      const token = match[0];
      let kind = 'keyword';
      if (token.startsWith('/')) kind = 'comment';
      else if (/^[$"']/.test(token)) kind = 'string';
      else if (/^\d/.test(token)) kind = 'number';
      result += escape(code.slice(end, match.index)) + `<span class="tok-${kind}">${escape(token)}</span>`;
      end = match.index + token.length;
    }
    return result + escape(code.slice(end));
  }

  function renderBlock(block) {
    switch (block.type) {
      case 'heading': return `<h3${block.anchor ? ` id="${block.anchor}" tabindex="-1"` : ''}>${escape(block.text)}</h3>`;
      case 'p': return `<p>${escape(block.text)}</p>`;
      case 'list': return `<ul>${block.items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>`;
      case 'table': return `<div class="table-wrap" tabindex="0" role="region" aria-label="Bảng so sánh"><table>
        <thead><tr>${block.headers.map(header => `<th scope="col">${escape(header)}</th>`).join('')}</tr></thead>
        <tbody>${block.rows.map(row => `<tr>${row.map(cell => `<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      case 'note': return `<aside class="callout"><strong>${escape(block.title)}</strong><p>${escape(block.text)}</p></aside>`;
      case 'links': return `<div class="actions">${block.items.map(item =>
        `<a class="button" href="${escape(item.href)}">${escape(item.title)}</a>`).join('')}</div>`;
      case 'explorer': return `<section class="panel lesson-explorer"><h3>${escape(block.title)}</h3>
        <p>${escape(block.intro)}</p><label>Chọn để khám phá
        <select class="explorer-select">${block.items.map((item, index) => `<option value="${index}">${escape(item.label)}</option>`).join('')}</select></label>
        ${block.items.map((item, index) => `<div class="explorer-result" role="status" ${index ? 'hidden' : ''}>
          <p class="callout"><strong>${escape(item.relation)}</strong></p><p>${escape(item.detail)}</p></div>`).join('')}</section>`;
      case 'diagram': {
        const nodes = steps => steps.map(step => `
          <li class="diagram-step"><strong>${escape(step.title)}</strong><span>${escape(step.text)}</span></li>`).join('');
        return `<figure class="diagram ${block.branches ? 'diagram-fork' : ''}"><figcaption>${escape(block.label)}</figcaption>
          <ol>${nodes(block.steps)}</ol>
          ${block.branches ? `<ul class="diagram-branches">${nodes(block.branches)}</ul>` : ''}</figure>`;
      }
      case 'code': {
        const origin = block.source;
        const range = origin ? origin.lines.join('–') : '';
        const numbered = origin && block.notes?.some(note => note.lines);
        const code = numbered
          ? block.code.split(/\r?\n/).map((line, index) => `<span class="code-line" data-line="${origin.lines[0] + index}">${highlightCSharp(line)}</span>`).join('\n')
          : highlightCSharp(block.code);
        return `<figure class="example-code">
          <div class="code-heading"><figcaption>${escape(block.title)}</figcaption><span>C#</span></div>
          <pre tabindex="0"><code>${code}</code></pre>
          ${origin ? `<p class="code-source">Trích nguyên văn · <strong>${escape(origin.symbol)}</strong><br><code>${escape(origin.path)}:${range}</code></p>`
            : '<p class="code-source">Ví dụ minh họa độc lập</p>'}
          ${block.output ? `<div class="code-output"><strong>Kết quả in ra</strong><pre><code>${escape(block.output)}</code></pre></div>` : ''}
          ${block.notes?.length ? `<div class="code-notes">${block.notes.map(note => `
            <details${note.lines ? ` data-from="${note.lines[0]}" data-to="${note.lines[1]}"` : ''}>
              <summary>${note.lines ? `Dòng ${note.lines.join('–')} · ` : ''}${escape(note.label)}</summary><p>${escape(note.text)}</p></details>`).join('')}</div>` : ''}
        </figure>`;
      }
      default: return '';
    }
  }

  function activeQuiz() {
    if (page === 'lesson') return quizCatalog.filter(entry => entry.chapter.id === currentChapter.id);
    if (quizSection) return quizCatalog.filter(entry => entry.chapter.section === quizSection);
    return quizCatalog.filter(entry => entry.index === 0);
  }

  function quizResult(item, state) {
    const correct = state.selection === item.answer;
    return {
      correct,
      feedback: state.selection === undefined ? '' : (correct ? 'Đúng.' : 'Chưa đúng. Gợi ý: ' + item.hint),
      solution: correct || state.revealed ? 'Đáp án đúng: ' + item.options[item.answer] + ' ' + item.explanation : ''
    };
  }

  function updateQuizQuestion(field, index, state) {
    const { item, key } = activeQuiz()[index];
    quizStates.set(key, state);
    const result = quizResult(item, state);
    const feedback = field.querySelector('.quiz-feedback');
    const solution = field.querySelector('.quiz-solution');
    const reveal = field.querySelector('[data-action="quiz-reveal"]');
    feedback.hidden = !result.feedback;
    feedback.dataset.correct = String(result.correct);
    feedback.textContent = result.feedback;
    solution.hidden = !result.solution;
    solution.textContent = result.solution;
    reveal.hidden = result.correct;
    reveal.setAttribute('aria-expanded', String(Boolean(result.solution)));
    reveal.textContent = result.solution ? 'Ẩn lời giải' : 'Xem lời giải';
  }

  function renderQuiz(entries) {
    return `<section class="quiz panel" id="quiz" aria-labelledby="quiz-title">
      <div class="section-head"><h2 id="quiz-title">Tự kiểm tra</h2>${button('Làm lại quiz', 'quiz-reset')}</div>
      <p>Chọn đáp án. Nếu chưa đúng, đọc gợi ý và thử lại hoặc mở lời giải.</p>
      ${entries.map(({ item, key, chapter }, index) => {
        const state = quizStates.get(key) ?? {};
        const { correct, feedback, solution } = quizResult(item, state);
        return `<fieldset class="quiz-question"><legend>${index + 1}. ${escape(item.question)}</legend>
          ${page === 'quiz' ? `<p class="muted">Chương · <a href="${lessonUrl(chapter.id)}">${escape(chapter.title)}</a></p>` : ''}
          <div class="quiz-options">${item.options.map((option, optionIndex) => `<label>
            <input type="radio" name="quiz-${index}" value="${optionIndex}" data-quiz="${index}" ${state.selection === optionIndex ? 'checked' : ''}>
            <span>${escape(option)}</span></label>`).join('')}</div>
          <div role="status">
            <p class="quiz-feedback" data-correct="${correct}" ${feedback ? '' : 'hidden'}>${escape(feedback)}</p>
            <p class="quiz-solution" id="quiz-solution-${index}" ${solution ? '' : 'hidden'}>${escape(solution)}</p>
          </div>
          <button class="button quiz-reveal" type="button" data-action="quiz-reveal" data-index="${index}"
            aria-controls="quiz-solution-${index}" aria-expanded="${Boolean(solution)}" ${correct ? 'hidden' : ''}>${solution ? 'Ẩn lời giải' : 'Xem lời giải'}</button>
        </fieldset>`;
      }).join('')}
    </section>`;
  }

  function renderLessonPanel(lesson) {
    const blocks = lesson.tabs[currentTab];
    const sections = blocks.flatMap((block, index) => block.type === 'heading' ? [{ text: block.text, index }] : []);
    return `<section id="lesson-panel" class="reading-panel panel" role="tabpanel" aria-labelledby="tab-${currentTab}" tabindex="0">
      ${sections.length > 1 ? `<details class="lesson-toc"><summary>Mục lục trong tab</summary><ul>${sections.map(section =>
        `<li><button class="text-link" type="button" data-lesson-section="${section.index}">${escape(section.text)}</button></li>`).join('')}</ul></details>` : ''}
      ${blocks.map((block, index) => renderBlock({ ...block, anchor: 'lesson-section-' + index })).join('')}</section>`;
  }

  function renderLesson() {
    const chapter = currentChapter;
    const lesson = course.lessons[chapter.id];
    const number = chapters.indexOf(chapter) + 1;
    if (!lesson) {
      const supplement = {
        architecture: ['simulation', 'Xem mô phỏng luồng'],
        'use-cases': ['simulation', 'Xem mô phỏng UC02–UC03'],
        defense: ['defense', 'Luyện với bộ câu hỏi mẫu']
      }[chapter.id];
      main.innerHTML = heading(chapter.title, chapter.summary, `Chương ${number} · Chưa mở`) +
        `<div class="panel empty-panel"><p>Chương này đã có trong lộ trình và chưa có bài học. Bạn có thể xem ${available.length} bài đã mở ở trang tổng quan.</p>
        <div class="actions"><a class="button primary" href="#home">Xem các bài đã mở</a>
        ${supplement ? `<a class="button" href="#${supplement[0]}">${supplement[1]}</a>` : ''}</div></div>`;
      return;
    }
    const next = chapters[number];
    const nextAvailable = available[available.indexOf(chapter) + 1];
    const nextPlanned = next && !Object.hasOwn(course.lessons, next.id);
    const missingPrerequisites = lesson.prerequisites?.filter(id => !Object.hasOwn(course.lessons, id)) ?? [];
    main.innerHTML = `
      <div class="lesson-header">${heading(chapter.title, lesson.intro, `Chương ${number} · ${chapter.section} · ${lesson.minutes} phút`)}</div>
      <div class="lesson-layout">
        <div class="lesson-body">
          ${missingPrerequisites.length ? `<aside class="callout"><strong>Kiến thức nên xem trước</strong>
            <p>${missingPrerequisites.map(id => escape(chapters.find(item => item.id === id).title)).join(', ')} chưa có bài trong phiên bản hiện tại.
            Để theo ví dụ, hãy nhớ interface quy định thao tác nào có thể gọi. Mỗi lớp triển khai có thể xử lý thao tác đó theo cách riêng.</p></aside>` : ''}
          <div class="tabs" role="tablist" aria-label="Nội dung bài học">
            ${tabs.map(tab => `<button type="button" role="tab" id="tab-${tab.id}" aria-controls="lesson-panel" aria-selected="${tab.id === currentTab}" tabindex="${tab.id === currentTab ? 0 : -1}" data-tab="${tab.id}">${tab.label}</button>`).join('')}
          </div>
          ${renderLessonPanel(lesson)}
          ${renderQuiz(activeQuiz())}
          <div class="lesson-bottom"><button class="button primary" type="button" data-action="complete" aria-pressed="${completed(chapter.id)}">${completed(chapter.id) ? '✓ Đã học' : 'Đánh dấu đã học'}</button>
            <div class="actions">
              ${next ? `<a class="button" href="${lessonUrl(next.id)}">Bài tiếp theo trong lộ trình${nextPlanned ? ` · Chương ${number + 1} chưa mở` : ''}</a>` : ''}
              ${nextAvailable && nextAvailable !== next ? `<a class="button" href="${lessonUrl(nextAvailable.id)}">Bài đã mở tiếp theo · ${escape(nextAvailable.title)}</a>` : ''}
              ${nextAvailable ? '' : '<a class="button" href="#defense">Luyện bảo vệ</a>'}
            </div>
          </div>
        </div>
        <aside class="lesson-aside">
          <section class="panel"><h2>Sau bài này</h2><ul>${lesson.goals.map(goal => `<li>${escape(goal)}</li>`).join('')}</ul></section>
          <section class="panel"><h2>Đọc tiếp</h2><ul class="related-links">${lesson.related.map(id => {
            const related = chapters.find(item => item.id === id);
            return related ? `<li><a href="${lessonUrl(id)}">${escape(related.title)}</a>${Object.hasOwn(course.lessons, id) ? '' : '<small>Trong lộ trình</small>'}</li>` : '';
          }).join('')}</ul></section>
        </aside>
      </div>`;
  }

  function ratingButtons(kind, id) {
    const value = progress.data[kind][id];
    return `<div class="rating-row" role="group" aria-label="Mức độ hiểu">
      ${ratings.map((rating, index) => `<button class="button" type="button" data-rating="${index}" data-kind="${kind}" data-id="${escape(id)}" aria-pressed="${rating === value}">${rating}</button>`).join('')}
    </div>`;
  }

  function filteredCards() {
    return practice.flashcards.filter(card => !reviewCards || progress.data.flashcards[card.id] !== 'Đã hiểu');
  }

  function renderFlashcards() {
    const cards = filteredCards();
    const card = cards[cardIndex];
    main.innerHTML = heading('Flashcards', '12 tình huống ngắn về quyết định thiết kế và các quy tắc dễ nhầm trong dự án.', 'Ôn nhanh') +
      `<section class="panel practice-layout" aria-label="Bộ thẻ">
        <div class="filters"><label><input type="checkbox" id="review-cards" ${reviewCards ? 'checked' : ''}> Ẩn thẻ đã hiểu</label>
          <span>${card ? `Thẻ ${cardIndex + 1} / ${cards.length}` : '0 thẻ'}</span></div>
        ${card ? `<button type="button" class="flashcard" data-action="flip" aria-pressed="${showCardAnswer}">
          <span class="badge">${escape(card.topic)}</span>
          <span class="flashcard-text">${escape(showCardAnswer ? card.back : card.front)}</span>
          <span class="flashcard-hint">${showCardAnswer ? 'Xem câu hỏi' : 'Lật thẻ để xem gợi ý'}</span>
        </button>
        ${showCardAnswer ? ratingButtons('flashcards', card.id) : ''}
        <div class="actions"><button class="button" type="button" data-action="card-prev" ${cardIndex === 0 ? 'disabled' : ''}>Thẻ trước</button>
          <button class="button" type="button" data-action="card-next" ${cardIndex + 1 >= cards.length ? 'disabled' : ''}>Thẻ sau</button></div>`
        : '<p>Bạn đã hiểu tất cả các thẻ. Bỏ bộ lọc để xem lại.</p>'}
      </section>`;
  }

  function filteredQuestions() {
    const base = questionMode === 'review'
      ? practice.questions.filter(item => ['Cần ôn lại', 'Chưa biết'].includes(progress.data.questions[item.id]))
      : defensePresets.find(preset => preset.id === questionMode)?.items ?? practice.questions;
    return base.filter(item => (!questionTopic || item.topic === questionTopic)
      && (!questionDifficulty || item.difficulty === questionDifficulty));
  }

  const defensePresets = [
    { id: '', label: 'Toàn bộ dự án', items: practice.questions },
    { id: 'a', label: 'Phần A · UC01–UC04', items: practice.questions.filter(item =>
      item.part === 'A' || item.topic === 'UC01–UC04' || item.id === 'cs-normalized') },
    { id: 'oop', label: 'Lý thuyết OOP và C#', items: practice.questions.filter(item =>
      ['Nền tảng OOP', 'Cú pháp C#', 'Thiết kế lớp'].includes(item.topic)) },
    { id: 'reading', label: 'Đọc mã C#', items: practice.questions.filter(item => item.prompt || item.topic === 'Đọc code') },
    { id: 'design', label: 'Kiến trúc và Design Patterns', items: practice.questions.filter(item =>
      ['Kiến trúc', 'State & Strategy', 'Điểm nối A–B'].includes(item.topic)) },
    { id: 'hard', label: 'Phản biện khó', items: practice.questions.filter(item => item.difficulty === 'Khó') }
  ];

  function stopTimer() {
    clearInterval(timer);
    timer = undefined;
    timerEnd = 0;
  }

  function countdown() {
    const clock = document.getElementById('countdown');
    if (!clock) return;
    const remaining = Math.max(0, Math.ceil((timerEnd - Date.now()) / 1000));
    clock.textContent = remaining > 0 ? remaining + ' giây' : 'Hết giờ suy nghĩ';
    if (remaining === 0) {
      stopTimer();
      const startButton = main.querySelector('[data-action="start-timer"]');
      const endButton = main.querySelector('[data-action="stop-timer"]');
      if (startButton) startButton.disabled = false;
      if (endButton) endButton.hidden = true;
      const status = document.getElementById('timer-status');
      if (status) status.textContent = 'Hết giờ suy nghĩ.';
    }
  }

  function options(values, current, firstLabel) {
    return `<option value="">${firstLabel}</option>` + values.map(value => `<option value="${escape(value)}" ${value === current ? 'selected' : ''}>${escape(value)}</option>`).join('');
  }

  function renderDefense() {
    const topics = [...new Set(practice.questions.map(item => item.topic))];
    const matches = filteredQuestions();
    main.innerHTML = heading(questionMode === 'reading' ? 'Luyện đọc mã C#' : 'Ngân hàng vấn đáp', 'Nói thử thành tiếng rồi đối chiếu các ý cần đạt.', 'Vấn đáp') + `
      <section class="panel practice-layout">
        <div class="filters">
          <label>Phạm vi<select id="question-mode">${[...defensePresets, { id: 'review', label: 'Đã đánh dấu cần ôn' }].map(preset =>
            `<option value="${preset.id}" ${preset.id === questionMode ? 'selected' : ''}>${preset.label}</option>`).join('')}</select></label>
          <label>Chủ đề<select id="question-topic">${options(topics, questionTopic, 'Tất cả chủ đề')}</select></label>
          <label>Độ khó<select id="question-difficulty">${options(['Dễ', 'Trung bình', 'Khó'], questionDifficulty, 'Tất cả độ khó')}</select></label>
          <label>Thời gian suy nghĩ<select id="question-seconds">
            ${[0, 15, 30, 60].map(seconds => `<option value="${seconds}" ${questionSeconds === seconds ? 'selected' : ''}>${seconds ? seconds + ' giây' : 'Không tính giờ'}</option>`).join('')}
          </select></label>
        </div>
        ${matches.length ? `<label class="question-picker">Chọn câu hỏi
          <select id="question-picker">${matches.map(item => `<option value="${escape(item.id)}" ${item === question ? 'selected' : ''}>${escape(item.question)}</option>`).join('')}</select>
        </label>` : ''}
        <div class="actions"><button class="button" type="button" data-action="random" ${matches.length < 2 ? 'disabled' : ''}>Câu ngẫu nhiên</button>
          <span class="muted">${matches.length} câu phù hợp</span></div>
        ${question ? `<div class="question-card">
          ${renderQuestion(question, 'h2')}
          ${answerVisible ? '' : `<div class="actions">
            ${questionSeconds ? `<button class="button" type="button" data-action="start-timer" ${timer ? 'disabled' : ''}>Bắt đầu tính giờ</button>
            <button class="button" type="button" data-action="stop-timer" ${timer ? '' : 'hidden'}>Dừng tính giờ</button><span id="countdown" class="countdown"></span><span id="timer-status" class="sr-only" role="status"></span>` : ''}
            ${button('Xem gợi ý trả lời', 'show-answer', 'primary')}
          </div>`}
          ${answerVisible ? `${renderAnswer(question)}
            ${ratingButtons('questions', question.id)}` : ''}
        </div>` : '<p>Chưa có câu hỏi phù hợp. Chọn chủ đề hoặc độ khó khác.</p>'}
      </section>`;
    if (timer) countdown();
  }

  function renderQuestion(item, headingTag = 'h3') {
    return `<p class="muted">${escape(item.topic)} · ${escape(item.difficulty)} · <code>${escape(item.id)}</code></p>
      <${headingTag}>${escape(item.question)}</${headingTag}>
      ${item.prompt ? renderBlock(item.prompt) : ''}`;
  }

  function renderAnswer(item) {
    return `<div class="answer-panel" tabindex="-1"><h3>Trả lời ngắn</h3><p>${escape(item.short)}</p>
      <h3>Giải thích</h3><p>${escape(item.explanation)}</p>
      <h3>Ý cần đạt</h3><ul>${item.points.map(point => `<li>${escape(point)}</li>`).join('')}</ul>
      ${item.pitfalls?.length ? `<h3>Lỗi thường gặp</h3><ul>${item.pitfalls.map(pitfall => `<li>${escape(pitfall)}</li>`).join('')}</ul>` : ''}
      ${item.evidence?.length ? `<h3>Dẫn chứng</h3><ul>${item.evidence.map(source =>
        `<li>${escape(source.symbol)} · <code>${escape(source.path)}:${source.lines.join('–')}</code></li>`).join('')}</ul>` : ''}
      <h3>Câu hỏi tiếp theo</h3><p>${escape(item.followUp)}</p></div>`;
  }

  function renderMockDefense() {
    main.innerHTML = heading('Bảo vệ thử', 'Chọn 5–10 câu. Tự trả lời, đối chiếu các ý cần đạt và tự đánh giá.', 'Vấn đáp') +
      '<section class="panel practice-layout" id="mock-session"></section>';
    unmountMock = window.OOPMockDefense.mount(main.querySelector('#mock-session'), {
      presets: defensePresets, escape, renderQuestion, renderAnswer,
      rate(id, rating) {
        progress.data.questions[id] = rating;
        save();
      }
    });
  }

  function renderPracticeQuiz() {
    const entries = activeQuiz();
    main.innerHTML = heading('Quiz theo chủ đề', 'Tổng hợp lấy một câu từ mỗi chương. Chọn một phần để luyện toàn bộ câu hỏi trong phần đó.', 'Tự kiểm tra') +
      `<div class="panel filters"><label>Phần kiến thức<select id="quiz-section">${options(quizSections, quizSection, 'Tổng hợp 15 chương')}</select></label>
        <p>${entries.length} câu · <span id="quiz-session-count">${quizAttempts.size}</span> câu đã thử trong phiên</p></div>` + renderQuiz(entries);
  }

  function renderSimulation() {
    const simulators = window.OOPSimulators;
    const chooser = `<nav class="actions simulator-menu" aria-label="Chọn mô phỏng">
      <a class="button" href="#simulation"${currentAttribute(!simulatorId)}>UC02–UC03</a>
      ${simulators.items.map(item => `<a class="button" href="#simulation/${item.id}"${currentAttribute(simulatorId === item.id)}>${escape(item.title)}</a>`).join('')}
    </nav>`;
    const selected = simulators.items.find(item => item.id === simulatorId);
    if (selected) {
      main.innerHTML = heading(selected.title, selected.summary, 'Mô phỏng học tập') + chooser + simulators.render(selected.id);
      simulators.bind(main);
      return;
    }
    const simulation = practice.simulation;
    const step = simulation.steps[simulationIndex];
    main.innerHTML = heading(simulation.title, simulation.intro, 'Mô phỏng UC02–UC03') + chooser + `
      <div class="sim-layout">
        <ol class="sim-steps panel" aria-label="Các bước mô phỏng">
          ${simulation.steps.map((entry, index) => `<li><button class="sim-step" type="button" data-step="${index}" ${index === simulationIndex ? 'aria-current="step"' : ''}><span>${index + 1}</span>${escape(entry.title)}</button></li>`).join('')}
        </ol>
        <section class="panel sim-snapshot" aria-labelledby="step-title">
          <span class="badge">Bước ${simulationIndex + 1} / ${simulation.steps.length}</span>
          <h2 id="step-title">${escape(step.title)}</h2>
          <dl><div><dt>Tầng xử lý</dt><dd>${escape(step.layer)}</dd></div>
            <div><dt>Lời gọi</dt><dd><code>${escape(step.call)}</code></dd></div>
            <div><dt>Trạng thái đề tài</dt><dd>${escape(step.status)}</dd></div>
            <div><dt>Chủ nhiệm</dt><dd>${escape(step.leader)}</dd></div></dl>
          <p class="callout" data-kind="${step.kind}" role="status">${escape(step.feedback)}</p>
          <div class="actions">
            <button class="button" type="button" data-action="sim-prev" ${simulationIndex === 0 ? 'disabled' : ''}>Quay lại</button>
            <button class="button primary" type="button" data-action="sim-next" ${simulationIndex === simulation.steps.length - 1 ? 'disabled' : ''}>Bước tiếp theo</button>
            <button class="button" type="button" data-action="sim-reset" ${simulationIndex === 0 ? 'disabled' : ''}>Về đầu</button>
          </div>
        </section>
      </div>`;
  }

  function renderProgress() {
    const studied = available.filter(chapter => completed(chapter.id));
    const review = [
      ['Flashcards', 'flashcards', practice.flashcards, 'front'],
      ['Câu hỏi bảo vệ', 'questions', practice.questions, 'question']
    ];
    const pendingTopics = [...new Set(practice.questions.filter(question =>
      ['Cần ôn lại', 'Chưa biết'].includes(progress.data.questions[question.id])).map(question => question.topic))];
    const missedChapters = available.filter(chapter => quizCatalog.some(entry =>
      entry.chapter === chapter && quizAttempts.get(entry.key) === false));
    main.innerHTML = heading('Tiến độ của tôi', 'Xem bài đã học và nội dung bạn tự đánh dấu khi luyện tập.', 'Tự học') + `
      <div class="progress-summary">
        <section class="panel"><h2>Bài đã học</h2><div class="progress-overview">${progressRing()}<p>${studied.length} / ${available.length} bài sẵn sàng</p></div>
        ${studied.length ? `<ul>${studied.map(chapter => `<li><a href="${lessonUrl(chapter.id)}">${escape(chapter.title)}</a></li>`).join('')}</ul>` : '<p>Chưa có bài được đánh dấu.</p>'}</section>
        <section class="panel"><h2>Sao lưu tiến độ</h2><p>Tiến độ nằm trong trình duyệt. Khi đổi trình duyệt hoặc chuyển thư mục, hãy dùng tệp JSON đã xuất.</p>
          <div class="actions">${button('Xuất JSON', 'export', 'primary')}${button('Nhập và thay thế tiến độ', 'choose-import')}</div>
          <input id="import-file" type="file" accept=".json,application/json" hidden><p id="import-status" role="status"></p>
        </section>
        <section class="panel" id="review-progress" tabindex="-1"><h2>Nội dung cần ôn</h2>
          <p>${quizAttempts.size} câu quiz đã thử trong phiên.</p>
          ${missedChapters.length ? `<p>Bài có câu vừa trả lời sai</p><ul>${missedChapters.map(chapter =>
            `<li><a href="${lessonUrl(chapter.id)}">${escape(chapter.title)}</a></li>`).join('')}</ul>` : ''}
          ${pendingTopics.length ? `<p>Chủ đề vấn đáp đã đánh dấu</p><ul>${pendingTopics.map(topic => `<li>${escape(topic)}</li>`).join('')}</ul>
          <a class="text-link" href="#defense/review">Luyện lại câu đã đánh dấu</a>` : '<p>Chưa đánh dấu chủ đề vấn đáp cần ôn.</p>'}
        </section>
        ${review.map(([label, kind, items, field]) => {
          const marked = items.filter(item => Object.hasOwn(progress.data[kind], item.id));
          return `<section class="panel"><h2>${label}</h2>
            ${marked.length ? `<ul class="review-summary">${marked.map(item => `<li><span class="badge">${escape(progress.data[kind][item.id])}</span> ${kind === 'questions'
              ? `<a href="#defense/${escape(item.id)}">${escape(item[field])}</a>` : escape(item[field])}</li>`).join('')}</ul>` : '<p>Chưa có mục được đánh dấu.</p>'}</section>`;
        }).join('')}
      </div>`;
  }

  function navigate() {
    const fragment = location.hash.slice(1);
    const [route, id] = fragment.split('/');
    currentChapter = route === 'lesson' ? chapters.find(chapter => chapter.id === id) : undefined;
    page = currentChapter ? 'lesson' : (['progress', ...tools.map(tool => tool.id)].includes(route) ? route : 'home');
    currentTab = 'theory';
    stopTimer();
    unmountMock?.();
    unmountMock = undefined;
    if (currentChapter) {
      openSections.add(course.sections.findIndex(section => section.title === currentChapter.section));
      if (Object.hasOwn(course.lessons, currentChapter.id)) {
        progress.data.last = currentChapter.id;
        save();
      }
    }
    const label = currentChapter?.title ?? tools.find(tool => tool.id === page)?.title ?? (page === 'progress' ? 'Tiến độ của tôi' : 'Tổng quan');
    document.getElementById('breadcrumb').textContent = label;
    document.title = label + ' · OOP Studio';
    renderNavigation();
    renderSearch();
    if (page === 'lesson') renderLesson();
    else if (page === 'flashcards') renderFlashcards();
    else if (page === 'defense') {
      questionMode = id === 'review' || defensePresets.some(preset => preset.id === id) ? id : '';
      questionTopic = '';
      questionDifficulty = '';
      question = practice.questions.find(item => item.id === id) ?? question;
      chooseQuestion(false);
    } else if (page === 'mock-defense') renderMockDefense();
    else if (page === 'quiz') renderPracticeQuiz();
    else if (page === 'simulation') {
      simulatorId = window.OOPSimulators.items.find(item => item.id === id)?.id ?? '';
      renderSimulation();
    }
    else if (page === 'progress') renderProgress();
    else renderHome();
    mobileOpen = false;
    updateDrawer();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
    if (page === 'progress' && id === 'review') main.querySelector('#review-progress').focus();
  }

  function selectTab(id) {
    currentTab = id;
    for (const tab of main.querySelectorAll('[role="tab"]')) {
      const active = tab.dataset.tab === id;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    }
    document.getElementById('lesson-panel').outerHTML = renderLessonPanel(course.lessons[currentChapter.id]);
    document.getElementById('tab-' + id).focus();
  }

  function restoreActionFocus(action, fallback) {
    const button = main.querySelector(`[data-action="${action}"]:not(:disabled)`);
    (button ?? main.querySelector(fallback) ?? main).focus({ preventScroll: true });
  }

  function updateSimulation(index, action) {
    simulationIndex = Math.min(Math.max(index, 0), practice.simulation.steps.length - 1);
    renderSimulation();
    restoreActionFocus(action, '[aria-current="step"]');
  }

  function chooseQuestion(random) {
    const matches = filteredQuestions();
    const alternatives = matches.filter(item => item.id !== question?.id);
    question = random && alternatives.length
      ? alternatives[Math.floor(Math.random() * alternatives.length)]
      : (matches.includes(question) ? question : matches[0]);
    answerVisible = false;
    stopTimer();
    renderDefense();
  }

  main.addEventListener('click', event => {
    const target = event.target.closest('button');
    if (!target) return;
    const { tab, action, step, rating, kind, id } = target.dataset;
    if (tab) return selectTab(tab);
    if (target.dataset.lessonSection !== undefined) {
      document.getElementById('lesson-section-' + target.dataset.lessonSection).focus();
      return;
    }
    if (step !== undefined) return updateSimulation(Number(step), 'sim-selected');
    if (rating !== undefined) {
      const selected = ratings[Number(rating)];
      progress.data[kind][id] = selected;
      save();
      if (kind === 'flashcards' && reviewCards && selected === 'Đã hiểu') {
        cardIndex = Math.min(cardIndex, Math.max(0, filteredCards().length - 1));
        showCardAnswer = false;
        renderFlashcards();
        restoreActionFocus('flip', '#review-cards');
      } else if (kind === 'questions' && questionMode === 'review' && selected === 'Đã hiểu') {
        chooseQuestion(false);
        (main.querySelector('#question-picker') ?? document.getElementById('question-mode')).focus();
      } else {
        target.closest('.rating-row').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button === target)));
      }
      showToast('Đã đánh dấu: ' + selected);
      return;
    }
    switch (action) {
      case 'quiz-reveal': {
        const index = Number(target.dataset.index);
        const state = quizStates.get(activeQuiz()[index].key) ?? {};
        updateQuizQuestion(target.closest('fieldset'), index, { ...state, revealed: !state.revealed });
        break;
      }
      case 'quiz-reset': {
        const entries = activeQuiz();
        entries.forEach(entry => quizStates.delete(entry.key));
        document.getElementById('quiz').outerHTML = renderQuiz(entries);
        restoreActionFocus('quiz-reset');
        showToast('Đã đặt lại các câu đang hiển thị.');
        break;
      }
      case 'complete': {
        const chapterId = currentChapter.id;
        const wasCompleted = completed(chapterId);
        progress.data.completed = wasCompleted
          ? progress.data.completed.filter(item => item !== chapterId) : [...progress.data.completed, chapterId];
        save();
        target.textContent = wasCompleted ? 'Đánh dấu đã học' : '✓ Đã học';
        target.setAttribute('aria-pressed', String(!wasCompleted));
        renderNavigation();
        showToast(wasCompleted ? 'Đã bỏ đánh dấu bài học.' : 'Đã đánh dấu bài học.');
        break;
      }
      case 'flip':
        showCardAnswer = !showCardAnswer;
        renderFlashcards();
        restoreActionFocus('flip');
        break;
      case 'card-prev':
      case 'card-next':
        cardIndex += action === 'card-prev' ? -1 : 1;
        showCardAnswer = false;
        renderFlashcards();
        restoreActionFocus(action, '[data-action="flip"]');
        break;
      case 'sim-prev': updateSimulation(simulationIndex - 1, action); break;
      case 'sim-next': updateSimulation(simulationIndex + 1, action); break;
      case 'sim-reset': updateSimulation(0, action); break;
      case 'random':
        chooseQuestion(true);
        restoreActionFocus('random');
        break;
      case 'start-timer':
        timerEnd = Date.now() + questionSeconds * 1000;
        timer = setInterval(countdown, 200);
        renderDefense();
        restoreActionFocus('stop-timer');
        break;
      case 'stop-timer':
        stopTimer();
        renderDefense();
        restoreActionFocus('start-timer');
        break;
      case 'show-answer':
        answerVisible = true;
        stopTimer();
        renderDefense();
        main.querySelector('.answer-panel').focus();
        break;
      case 'export': {
        save();
        const url = URL.createObjectURL(new Blob([JSON.stringify(progress.data, null, 2)], { type: 'application/json' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'oop-studio-tien-do.json';
        document.body.append(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        break;
      }
      case 'choose-import': document.getElementById('import-file').click(); break;
    }
  });

  main.addEventListener('change', async event => {
    const target = event.target;
    if (target.matches('.explorer-select')) {
      target.closest('.lesson-explorer').querySelectorAll('.explorer-result').forEach((result, index) => {
        result.hidden = index !== Number(target.value);
      });
      return;
    }
    if (target.dataset.quiz !== undefined) {
      const index = Number(target.dataset.quiz);
      const entry = activeQuiz()[index];
      const state = quizStates.get(entry.key);
      const selection = Number(target.value);
      quizAttempts.set(entry.key, selection === entry.item.answer);
      updateQuizQuestion(target.closest('fieldset'), index, { ...state, selection });
      const count = document.getElementById('quiz-session-count');
      if (count) count.textContent = quizAttempts.size;
    } else if (target.id === 'quiz-section') {
      quizSection = target.value;
      renderPracticeQuiz();
      document.getElementById('quiz-section').focus({ preventScroll: true });
    } else if (target.id === 'review-cards') {
      reviewCards = target.checked;
      cardIndex = 0;
      showCardAnswer = false;
      renderFlashcards();
      document.getElementById('review-cards').focus({ preventScroll: true });
    } else if (target.id === 'question-picker') {
      question = practice.questions.find(item => item.id === target.value);
      chooseQuestion(false);
      document.getElementById('question-picker').focus({ preventScroll: true });
    } else if (['question-mode', 'question-topic', 'question-difficulty'].includes(target.id)) {
      questionMode = document.getElementById('question-mode').value;
      questionTopic = target.id === 'question-mode' ? '' : document.getElementById('question-topic').value;
      questionDifficulty = document.getElementById('question-difficulty').value;
      chooseQuestion(false);
      document.getElementById(target.id).focus({ preventScroll: true });
    } else if (target.id === 'question-seconds') {
      questionSeconds = Number(target.value);
      stopTimer();
      renderDefense();
      document.getElementById(target.id).focus({ preventScroll: true });
    } else if (target.id === 'import-file' && target.files[0]) {
      try {
        const file = target.files[0];
        if (file.size > 512 * 1024) throw new Error('Tệp tiến độ vượt quá 512 KB.');
        progress.import(await file.text());
        applyTheme();
        updateStorageNotice();
        renderNavigation();
        if (page === 'progress') renderProgress();
        showToast(progress.available ? 'Đã nhập tiến độ.' : 'Đã nhập tiến độ cho phiên hiện tại.');
      } catch (error) {
        const status = document.getElementById('import-status');
        if (status) status.textContent = 'Không nhập được tệp. ' + (error instanceof SyntaxError ? 'Nội dung JSON không hợp lệ.' : error.message);
        target.value = '';
      }
    }
  });

  main.addEventListener('toggle', event => {
    if (!event.target.matches('.code-notes details[data-from]')) return;
    const figure = event.target.closest('.example-code');
    const openNotes = [...figure.querySelectorAll('details[data-from][open]')];
    for (const line of figure.querySelectorAll('[data-line]')) {
      const number = Number(line.dataset.line);
      line.classList.toggle('is-explained', openNotes.some(note => number >= Number(note.dataset.from)
        && number <= Number(note.dataset.to)));
    }
  }, true);

  main.addEventListener('keydown', event => {
    const selectedTab = event.target.closest('[role="tab"]');
    if (!selectedTab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = tabs.findIndex(tab => tab.id === selectedTab.dataset.tab);
    const target = { Home: 0, End: tabs.length - 1, ArrowLeft: (index + tabs.length - 1) % tabs.length, ArrowRight: (index + 1) % tabs.length };
    selectTab(tabs[target[event.key]].id);
  });

  navigation.addEventListener('toggle', event => {
    if (!event.target.matches('details[data-section]')) return;
    const index = Number(event.target.dataset.section);
    if (event.target.open) openSections.add(index);
    else openSections.delete(index);
  }, true);

  sidebar.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    if (search.value) {
      search.value = '';
      renderSearch();
    }
    if (link.hash === location.hash && mobileOpen) {
      mobileOpen = false;
      updateDrawer();
      main.focus({ preventScroll: true });
    }
  });

  search.addEventListener('input', renderSearch);
  search.addEventListener('keydown', event => {
    if (event.key === 'Escape' && search.value) {
      event.stopPropagation();
      search.value = '';
      renderSearch();
    } else if (event.key === 'Enter') {
      searchResults.querySelector('a')?.click();
    }
  });

  menu.addEventListener('click', () => {
    mobileOpen = !mobileOpen;
    updateDrawer();
    if (mobileOpen) search.focus();
  });
  scrim.addEventListener('click', () => {
    mobileOpen = false;
    updateDrawer(true);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileOpen) scrim.click();
  });
  smallScreen.addEventListener('change', () => {
    mobileOpen = false;
    updateDrawer();
  });
  theme.addEventListener('click', () => {
    progress.data.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    save();
  });
  systemDark.addEventListener('change', applyTheme);
  skipLink.addEventListener('click', event => {
    event.preventDefault();
    main.focus();
  });
  window.addEventListener('hashchange', navigate);

  applyTheme();
  updateStorageNotice();
  navigate();
}());
