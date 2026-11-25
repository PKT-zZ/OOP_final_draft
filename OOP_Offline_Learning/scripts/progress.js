(function () {
  'use strict';

  const key = 'oop-studio.progress.v1';
  const allowed = {
    lessons: new Set(Object.keys(window.OOPCourse.lessons)),
    flashcards: new Set(window.OOPPractice.flashcards.map(card => card.id)),
    questions: new Set(window.OOPPractice.questions.map(question => question.id))
  };
  const reviewValues = new Set(['Đã hiểu', 'Cần ôn lại', 'Chưa biết']);
  const corruptNotice = 'Tiến độ cũ không đọc được và vẫn được giữ nguyên. Lượt học hiện tại chỉ lưu trong phiên. Có thể nhập bản sao lưu ở trang Tiến độ.';

  function emptyProgress() {
    return { version: 1, theme: 'system', last: null, completed: [], flashcards: {}, questions: {} };
  }

  function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function readRatings(ratings, ids) {
    return Object.fromEntries(Object.entries(ratings)
      .filter(([id, rating]) => ids.has(id) && reviewValues.has(rating)));
  }

  function parse(raw) {
    const data = JSON.parse(raw);
    if (!isRecord(data) || data.version !== 1 || !Array.isArray(data.completed)
      || !isRecord(data.flashcards) || !isRecord(data.questions)
      || !['system', 'light', 'dark'].includes(data.theme)) {
      throw new Error('Tệp chưa đúng định dạng tiến độ OOP Studio (phiên bản 1).');
    }

    return {
      version: 1,
      theme: data.theme,
      last: allowed.lessons.has(data.last) ? data.last : null,
      completed: [...new Set(data.completed.filter(id => allowed.lessons.has(id)))],
      flashcards: readRatings(data.flashcards, allowed.flashcards),
      questions: readRatings(data.questions, allowed.questions)
    };
  }

  let available = true;
  let data = emptyProgress();
  let notice = '';
  let savedValue = null;
  let snapshot = emptyProgress();

  function write(next) {
    const encoded = JSON.stringify(next);
    localStorage.setItem(key, encoded);
    data = next;
    savedValue = encoded;
    snapshot = structuredClone(next);
    available = true;
    notice = '';
  }

  try {
    savedValue = localStorage.getItem(key);
    if (savedValue === null) write(data);
    else {
      try {
        data = parse(savedValue);
        snapshot = structuredClone(data);
      } catch {
        notice = corruptNotice;
      }
    }
  } catch {
    available = false;
  }

  function save() {
    if (notice) return;
    try {
      const stored = localStorage.getItem(key);
      if (stored === savedValue) {
        write(data);
        return;
      }

      let latest;
      try {
        latest = stored === null ? emptyProgress() : parse(stored);
      } catch {
        notice = corruptNotice;
        return;
      }

      // Apply this tab's edits to the latest saved v1 progress.
      if (data.theme !== snapshot.theme) latest.theme = data.theme;
      if (data.last !== snapshot.last) latest.last = data.last;
      const completed = new Set(latest.completed);
      for (const id of snapshot.completed) {
        if (!data.completed.includes(id)) completed.delete(id);
      }
      for (const id of data.completed) {
        if (!snapshot.completed.includes(id)) completed.add(id);
      }
      latest.completed = [...completed];
      for (const kind of ['flashcards', 'questions']) {
        for (const [id, rating] of Object.entries(data[kind])) {
          if (rating !== snapshot[kind][id]) latest[kind][id] = rating;
        }
      }
      write(latest);
    } catch {
      available = false;
    }
  }

  window.OOPProgress = {
    get data() { return data; },
    get available() { return available; },
    get notice() { return notice; },
    save,
    import(raw) {
      data = parse(raw);
      notice = '';
      try {
        write(data);
      } catch {
        available = false;
      }
    }
  };
}());
