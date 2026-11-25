(function () {
  'use strict';

  const projects = [
    { id: 'P-A', title: 'Thư viện số', status: 'Active' },
    { id: 'P-B', title: 'Bản đồ phòng thí nghiệm', status: 'Pending' },
    { id: 'P-C', title: 'Kho dữ liệu thực nghiệm', status: 'Pending' }
  ];
  const fundingProjects = [...projects, { id: 'P-D', status: 'Completed' }];
  const sources = [
    { id: 'F01', name: 'Quỹ trường', type: 'Nội bộ' },
    { id: 'F02', name: 'Quỹ đối tác', type: 'Tài trợ ngoài' },
    { id: 'F03', name: 'Quỹ khoa', type: 'Nội bộ' }
  ];
  const allocations = [
    { id: 'A01', projectId: 'P-A', sourceId: 'F01', amount: 10_000_000n },
    { id: 'A02', projectId: 'P-A', sourceId: 'F02', amount: 15_000_000n },
    { id: 'A03', projectId: 'P-B', sourceId: 'F01', amount: 20_000_000n },
    { id: 'A04', projectId: 'P-B', sourceId: 'F01', amount: 5_000_000n }
  ];
  const fundingAllocations = [...allocations,
    { id: 'D-01', projectId: 'P-D', sourceId: 'F02', amount: 3_000_000n }
  ];
  const departments = [
    { id: 'DV01', name: 'Khoa Công nghệ', createdAt: '2010-09-01' },
    { id: 'DV02', name: 'Khoa Toán', createdAt: '2012-09-01' }
  ];
  const researchers = [
    { id: 'R001', departmentId: 'DV01', fullName: 'Lan', email: 'lan@example.test', academicTitle: 'TS', phone: '0900000001', organization: 'Phòng A', isInstructor: true },
    { id: 'R002', departmentId: 'DV01', fullName: 'Minh', email: 'minh@example.test', academicTitle: '', phone: '', organization: '', isInstructor: false }
  ];
  const terms = [
    { departmentId: 'DV01', researcherId: 'R002', from: '2020-09-01', to: '2023-08-31' },
    { departmentId: 'DV01', researcherId: 'R001', from: '2023-09-01', to: null }
  ];
  const decimalMax = 79228162514264337593543950335n;
  const binding = new WeakSet();
  const formatMoney = new Intl.NumberFormat('vi-VN');

  function escape(value) {
    const encoded = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(value).replace(/[&<>"']/g, character => encoded[character]);
  }

  function button(action, label, primary = false) {
    return `<button class="button${primary ? ' primary' : ''}" type="button" data-sim-action="${action}">${label}</button>`;
  }

  function field(name, label, value, type = 'text', extra = '') {
    return `<label>${label}<input name="${name}" type="${type}" value="${escape(value)}" ${extra}></label>`;
  }

  function select(name, label, options) {
    return `<label>${label}<select name="${name}">${options.map(([value, text]) =>
      `<option value="${escape(value)}">${escape(text)}</option>`
    ).join('')}</select></label>`;
  }

  function roleSelect() {
    return select('role', 'Vai trò hiện tại', [
      ['Officer', 'Officer · Chuyên viên'],
      ['Researcher', 'Researcher · Nhà nghiên cứu'],
      ['CouncilChair', 'CouncilChair · Chủ tịch hội đồng']
    ]);
  }

  function fieldValue(widget, name) {
    return widget.querySelector(`[name="${name}"]`).value.trim();
  }

  function table(caption, headers, rows) {
    return `<div class="table-wrap" role="region" aria-label="${escape(caption)}" tabindex="0"><table>
      <caption>${escape(caption)}</caption>
      <thead><tr>${headers.map(name => `<th scope="col">${escape(name)}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(row => `<tr>${row.map(value => `<td>${escape(value)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  }

  function feedback(widget, message, kind = '') {
    const status = widget.querySelector('[data-sim-feedback]');
    status.dataset.kind = kind;
    status.textContent = message;
  }

  function requireOfficer(widget) {
    if (fieldValue(widget, 'role') !== 'Officer') {
      feedback(widget, 'Service từ chối. Thao tác này yêu cầu vai trò Officer.', 'error');
      return false;
    }
    return true;
  }

  function findById(entries, id) {
    return entries.find(entry => entry.id.toUpperCase() === id.toUpperCase());
  }

  function onAction(widget, handler) {
    widget.addEventListener('click', event => {
      const button = event.target.closest('[data-sim-action]');
      if (button) handler(button.dataset.simAction);
    });
  }

  function objectControls() {
    return `<p>Hai lần gọi <code>new Student</code> tạo hai đối tượng. Chọn biến tham chiếu rồi gọi <code>Promote()</code> để tăng <code>Grade</code> của đối tượng đích.</p>
      <div class="filters sim-fields">${select('reference', 'Tham chiếu gọi Promote()', [['lan', 'lan'], ['minh', 'minh'], ['other', 'other']])}</div>
      <div class="actions">
        ${button('promote', 'Gọi Promote()', true)}
        ${button('alias', 'Gán other = lan')}
        ${button('reset', 'Đặt lại')}
      </div>`;
  }

  function bindObjects(widget) {
    const reference = widget.querySelector('[name="reference"]');
    const aliasOption = reference.querySelector('option[value="other"]');
    const output = widget.querySelector('[data-sim-output]');
    let grades;
    let references;

    function show() {
      output.innerHTML = table('Hai đối tượng Student trong bộ nhớ', ['Đối tượng', 'Grade', 'Biến tham chiếu'], [
        ['Lan', grades.Lan, Object.keys(references).filter(name => references[name] === 'Lan').join(', ')],
        ['Minh', grades.Minh, 'minh']
      ]);
    }

    function reset() {
      grades = { Lan: 10, Minh: 11 };
      references = { lan: 'Lan', minh: 'Minh' };
      reference.value = 'lan';
      aliasOption.disabled = true;
      feedback(widget, 'Đã khởi tạo hai đối tượng. Biến other chưa được gán.');
      show();
    }

    onAction(widget, action => {
      if (action === 'reset') return reset();
      if (action === 'alias') {
        references.other = references.lan;
        aliasOption.disabled = false;
        reference.value = 'other';
        feedback(widget, 'other và lan cùng trỏ tới đối tượng Lan. Số đối tượng vẫn là hai.', 'success');
      } else if (action === 'promote') {
        const variable = reference.value;
        const student = references[variable];
        grades[student] += 1;
        feedback(widget, `${variable}.Promote() đổi Grade của ${student} thành ${grades[student]}.`, 'success');
      }
      show();
    });
    reset();
  }

  function stateControls() {
    return `<p>Đề tài mẫu đã tồn tại và đang Pending. Trước hết hãy thử duyệt khi chưa gán chủ nhiệm. Sau khi duyệt, thử hoàn thành khi thiếu bằng chứng.</p>
      <div class="filters sim-fields">
        ${roleSelect()}
        ${select('researcher', 'Nhà nghiên cứu', [['R001', 'R001 · Lan'], ['R002', 'R002 · Minh']])}
        ${select('memberRole', 'Vai trò trong đề tài', [['Leader', 'Leader · Chủ nhiệm'], ['Member', 'Member · Thành viên']])}
      </div>
      <fieldset>
        <legend>Bằng chứng giả lập qua FakeCompletionEvidence</legend>
        <div class="filters sim-fields">
          <label><input name="score" type="checkbox"> Đã có điểm hội đồng</label>
          <label><input name="output" type="checkbox"> Đã có đầu ra nghiên cứu</label>
        </div>
      </fieldset>
      <div class="actions">
        ${button('assign', 'Gán người')}
        ${button('approve', 'Duyệt đề tài', true)}
        ${button('complete', 'Hoàn thành đề tài')}
        ${button('reset', 'Đặt lại')}
      </div>
      <p>Hai dấu chọn trên thay dữ liệu hội đồng và đầu ra bằng bằng chứng giả lập. Khi chạy ứng dụng console, mục 16 dùng <code>ResultCompletionEvidence</code> để đọc điểm và đầu ra từ kho kết quả trước khi chuyển trạng thái.</p>`;
  }

  function bindState(widget) {
    const output = widget.querySelector('[data-sim-output]');
    let status;
    let members;
    let history;

    function show() {
      const memberText = members.map(member => member.id + ' (' + member.role + ')').join(', ');
      output.innerHTML = `<p><strong>Trạng thái ${status}</strong> · ${status}State</p>
        <p>Tham gia đề tài · ${memberText || 'Chưa có'}</p>
        ${history.length ? table('Lịch sử chuyển trạng thái', ['Lần', 'Trước', 'Sau', 'Người thực hiện'],
          history.map(([before, after], index) => [index + 1, before, after, 'OFFICER'])) : '<p>Chưa có chuyển trạng thái.</p>'}`;
    }

    function reset() {
      status = 'Pending';
      members = [];
      history = [];
      widget.querySelector('[name="role"]').value = 'Officer';
      widget.querySelector('[name="researcher"]').value = 'R001';
      widget.querySelector('[name="memberRole"]').value = 'Leader';
      widget.querySelectorAll('input[type="checkbox"]').forEach(input => { input.checked = false; });
      feedback(widget, 'Đề tài đang Pending và chưa có chủ nhiệm.');
      show();
    }

    onAction(widget, action => {
      if (action === 'reset') return reset();
      const before = status;
      let operation;
      let message;
      let error;

      if (action === 'assign') {
        operation = 'ProjectService.AssignMember → ResearchProject.AddMember';
      } else if (action === 'approve') {
        operation = 'ProjectService.Approve → ResearchProject.Approve';
      } else if (action === 'complete') {
        operation = 'ProjectService.Complete';
      } else {
        return;
      }

      if (fieldValue(widget, 'role') !== 'Officer') {
        error = 'Service yêu cầu vai trò Officer trước khi xử lý.';
      } else if (action === 'assign') {
        const id = fieldValue(widget, 'researcher');
        const role = fieldValue(widget, 'memberRole');
        if (status !== 'Pending') error = 'Chỉ sửa thành viên khi đề tài đang chờ duyệt.';
        else if (members.some(member => member.id === id)) error = 'Nhà nghiên cứu đã có trong đề tài.';
        else if (role === 'Leader' && members.some(member => member.role === 'Leader')) error = 'Đề tài đã có chủ nhiệm.';
        else {
          members.push({ id, role });
          message = 'Thêm thành viên và lưu đề tài. Trạng thái giữ nguyên.';
        }
      } else if (action === 'approve') {
        operation += ' → ' + before + 'State.Approve';
        if (status === 'Completed') error = 'Đề tài đã hoàn thành.';
        else if (status === 'Active') error = 'Đề tài đã được duyệt.';
        else if (members.filter(member => member.role === 'Leader').length !== 1) error = 'Cần đúng một chủ nhiệm trước khi duyệt.';
        else {
          status = 'Active';
          message = 'Đã có đúng một chủ nhiệm. State ghi lịch sử và service gọi Save.';
        }
      } else if (!widget.querySelector('[name="score"]').checked || !widget.querySelector('[name="output"]').checked) {
        error = 'Service cần cả điểm nghiệm thu và ít nhất một đầu ra trước khi gọi State.';
      } else {
        operation += ' → ResearchProject.Complete → ' + before + 'State.Complete';
        if (status === 'Pending') error = 'Đề tài chờ duyệt không thể hoàn thành.';
        else if (status === 'Completed') error = 'Đề tài đã hoàn thành.';
        else {
          status = 'Completed';
          message = 'Đủ hai điều kiện bằng chứng giả lập. State ghi lịch sử và service gọi Save.';
        }
      }

      if (before !== status) history.push([before, status]);
      feedback(widget, `${operation}. Trước ${before}, sau ${status}. ${error || message}`, error ? 'error' : 'success');
      show();
    });
    reset();
  }

  function money(amount) {
    return formatMoney.format(amount) + ' đ';
  }

  function sum(entries) {
    return entries.reduce((total, entry) => total + entry.amount, 0n);
  }

  function strategyControls() {
    return `<p>Cùng bộ dữ liệu có ba đề tài, ba nguồn tài trợ và bốn đợt cấp. Dự đoán dòng nào sẽ hiện nếu đổi Strategy.</p>
      <div class="filters sim-fields">
        ${select('strategy', 'Cách tổng hợp', [['project', 'Theo đề tài'], ['source', 'Theo nguồn kinh phí']])}
      </div>
      ${table('Các đợt cấp trong bộ dữ liệu mẫu', ['Đợt', 'Đề tài', 'Nguồn', 'Số tiền'],
        allocations.map(entry => [entry.id, entry.projectId, entry.sourceId, money(entry.amount)]))}
      <p>P-C chưa có đợt cấp. F03 chưa cấp cho đề tài nào.</p>`;
  }

  function bindStrategy(widget) {
    const selector = widget.querySelector('[name="strategy"]');
    const output = widget.querySelector('[data-sim-output]');

    function show() {
      const byProject = selector.value === 'project';
      const rows = byProject
        ? projects.map(project => [
          project.id, project.title, money(sum(allocations.filter(entry => entry.projectId === project.id))), '—'
        ])
        : sources.flatMap(source => {
          const group = allocations.filter(entry => entry.sourceId === source.id);
          return group.length ? [[source.id, source.name, money(sum(group)), group.length + ' đợt cấp']] : [];
        });
      output.innerHTML = table('Dòng báo cáo', ['Mã', 'Tên', 'Tổng kinh phí', 'Chi tiết'], rows);
      const execution = byProject
        ? 'FundingByProjectStrategy.BuildRows trả một dòng mỗi đề tài, kể cả P-C có tổng 0 đ.'
        : 'FundingBySourceStrategy.BuildRows gom các đợt theo nguồn. F03 không có nhóm nên vắng mặt.';
      feedback(widget, `${execution} Tổng cộng ${money(sum(allocations))}.`);
    }

    selector.addEventListener('change', show);
    show();
  }

  function caseControls(actions, forms) {
    return `<div class="filters sim-fields">${roleSelect()}${select('operation', 'Chọn thao tác', actions)}</div>
      ${forms}
      <div class="actions">${button('reset', 'Đặt lại dữ liệu mẫu')}</div>`;
  }

  function form(action, fields, label, hidden = false) {
    return `<form data-sim-form="${action}" ${hidden ? 'hidden' : ''}>
      <div class="filters sim-fields">${fields}</div>
      <div class="actions"><button class="button primary" type="submit">${label}</button></div>
    </form>`;
  }

  function showSelectedForm(widget) {
    const operation = fieldValue(widget, 'operation');
    for (const form of widget.querySelectorAll('[data-sim-form]')) {
      form.hidden = form.dataset.simForm !== operation;
    }
  }

  function bindForms(widget, reset, submit) {
    widget.querySelector('[name="operation"]').addEventListener('change', () => showSelectedForm(widget));
    widget.addEventListener('submit', event => {
      const form = event.target.closest('[data-sim-form]');
      if (!form) return;
      event.preventDefault();
      if (!requireOfficer(widget)) return;
      submit(form.dataset.simForm, form);
    });
    onAction(widget, action => {
      if (action === 'reset') {
        widget.querySelector('[name="role"]').value = 'Officer';
        widget.querySelector('[name="operation"]').selectedIndex = 0;
        widget.querySelectorAll('form').forEach(form => form.reset());
        showSelectedForm(widget);
        reset();
      }
    });
    reset();
  }

  function peopleControls() {
    const dateConstraints = 'min="0001-01-01" max="9999-12-31" required';
    return `<p>Thử cập nhật R001 với mã <code> r001 </code> và email cũ. Sau đó thử dùng email <code>MINH@example.test</code> để quan sát điều kiện trùng giữa hai hồ sơ.</p>
      ${caseControls([['department', 'Lưu đơn vị'], ['researcher', 'Lưu nhà nghiên cứu'], ['history', 'Tra lịch sử lãnh đạo']],
        form('department',
          field('id', 'Mã đơn vị', ' dv01 ') + field('name', 'Tên đơn vị', 'Khoa Công nghệ và Dữ liệu') +
          field('createdAt', 'Ngày thành lập', '2026-01-01', 'date', dateConstraints),
          'Lưu đơn vị') +
        form('researcher',
          field('id', 'Mã nhà nghiên cứu', ' r001 ') + field('departmentId', 'Mã đơn vị', 'DV01') +
          field('fullName', 'Họ và tên', 'Lan Nguyễn') + field('email', 'Email', 'lan@example.test'),
          'Lưu nhà nghiên cứu', true) +
        form('history', field('id', 'Mã đơn vị', 'DV01'), 'Tra lịch sử', true))}
      <p>Dữ liệu mẫu chỉ tồn tại trong trang. Khi lưu thông tin cơ bản, bài tập mô phỏng Menu 4 tra hồ sơ trước rồi truyền lại học vị, điện thoại, tổ chức và cờ giảng viên.</p>`;
  }

  function bindPeople(widget) {
    const output = widget.querySelector('[data-sim-output]');
    let departmentRecords;
    let researcherRecords;
    let activeHistory;

    function show() {
      output.innerHTML = table('Đơn vị', ['Mã', 'Tên', 'Ngày thành lập'],
        departmentRecords.map(item => [item.id, item.name, item.createdAt])) +
        table('Hồ sơ nhà nghiên cứu', ['Mã', 'Đơn vị', 'Họ tên', 'Email', 'Thông tin khác'],
          researcherRecords.map(item => [
            item.id, item.departmentId, item.fullName, item.email,
            [item.academicTitle, item.phone, item.organization, item.isInstructor ? 'Giảng viên' : ''].filter(Boolean).join(' · ') || '—'
          ]));
      if (activeHistory) {
        const entries = terms.filter(term => term.departmentId === activeHistory).sort((a, b) => a.from.localeCompare(b.from));
        output.innerHTML += entries.length
          ? table('Lịch sử lãnh đạo ' + activeHistory, ['Nhà nghiên cứu', 'Từ ngày', 'Đến ngày'],
            entries.map(term => [term.researcherId, term.from, term.to ?? 'nay']))
          : `<p>${escape(activeHistory)} chưa có lịch sử lãnh đạo.</p>`;
      }
    }

    function reset() {
      departmentRecords = departments.map(item => ({ ...item }));
      researcherRecords = researchers.map(item => ({ ...item }));
      activeHistory = null;
      feedback(widget, 'Dùng dữ liệu mẫu để thử đổi tên, cập nhật hồ sơ hoặc tra lịch sử.');
      show();
    }

    bindForms(widget, reset, (action, form) => {
      const id = fieldValue(form, 'id');
      if (action === 'history') {
        activeHistory = findById(departmentRecords, id)?.id ?? null;
        feedback(widget, activeHistory
          ? 'GetHeadHistory chỉ lấy nhiệm kỳ của đơn vị đã chọn và sắp theo ngày bắt đầu.'
          : 'Đơn vị không tồn tại.', activeHistory ? 'success' : 'error');
      } else if (action === 'department') {
        const name = fieldValue(form, 'name');
        if (!id || !name) {
          feedback(widget, 'Mã và tên đơn vị phải khác rỗng.', 'error');
          return;
        }
        const existing = findById(departmentRecords, id);
        if (existing) {
          existing.name = name;
          feedback(widget, `Đã đổi tên ${existing.id} qua Department.Rename. Ngày thành lập vẫn là ${existing.createdAt}.`, 'success');
        } else {
          departmentRecords.push({ id, name, createdAt: fieldValue(form, 'createdAt') });
          feedback(widget, 'Đã tạo đơn vị và lưu ngày thành lập đã nhập.', 'success');
        }
      } else {
        const departmentId = fieldValue(form, 'departmentId');
        const fullName = fieldValue(form, 'fullName');
        const email = fieldValue(form, 'email');
        if (!findById(departmentRecords, departmentId)) {
          feedback(widget, 'Đơn vị tham chiếu không tồn tại.', 'error');
          return;
        }
        if (!id || !email) {
          feedback(widget, 'Mã nhà nghiên cứu và email phải khác rỗng.', 'error');
          return;
        }
        if (researcherRecords.some(person =>
          person.id.toUpperCase() !== id.toUpperCase() && person.email.toUpperCase() === email.toUpperCase())) {
          feedback(widget, 'Email đã được hồ sơ khác sử dụng. Kiểm tra này bỏ qua chính mã đang sửa.', 'error');
          return;
        }
        const at = email.indexOf('@');
        if (!fullName || at <= 0 || email.endsWith('@')) {
          feedback(widget, 'Cần họ tên và email có dấu @ ở giữa chuỗi.', 'error');
          return;
        }
        const existing = findById(researcherRecords, id);
        if (existing) Object.assign(existing, { departmentId, fullName, email });
        else researcherRecords.push({ id, departmentId, fullName, email });
        feedback(widget, existing
          ? 'Đã cập nhật hồ sơ hiện tại. Các trường tùy chọn được giữ qua dữ liệu Menu 4 truyền vào.'
          : 'Đã tạo hồ sơ mới trong đơn vị hợp lệ.', 'success');
      }
      show();
    });
  }

  function fundingControls() {
    return `<p>Thử cấp cho P-B với mã <code> a01 </code>. Đợt A01 đã thuộc P-A. Dùng mã mới để cấp cho P-B đang Pending, rồi thử lại với P-D đang Completed để quan sát quy tắc khóa kinh phí.</p>
      ${caseControls([['source', 'Khai báo nguồn'], ['allocation', 'Cấp kinh phí']],
        form('source', field('id', 'Mã nguồn', 'F04') + field('name', 'Tên nguồn', 'Quỹ nghiên cứu mới') +
          field('type', 'Loại nguồn', 'Tài trợ ngoài'), 'Thêm nguồn') +
        form('allocation', field('id', 'Mã đợt cấp', ' a01 ') + field('projectId', 'Mã đề tài', 'P-B') +
          field('sourceId', 'Mã nguồn', 'F01') +
          field('amount', 'Số tiền nguyên (đồng)', '5000000', 'text', 'inputmode="numeric"'),
          'Cấp kinh phí', true))}
      <div class="actions">${button('decimal-limit', 'Nạp tình huống sát giới hạn decimal')}</div>
      <p>Phòng luyện tập trung vào kiểm tra số tiền và đề tài. Menu C# dùng <code>ReadFundingAmount</code> để đọc số đồng nguyên dương trong phạm vi <code>decimal</code> và còn yêu cầu ngày cấp. Bài thử sát giới hạn kiểm tra tràn kiểu số.</p>`;
  }

  function bindFunding(widget) {
    const output = widget.querySelector('[data-sim-output]');
    let sourceRecords;
    let allocationRecords;

    function show() {
      output.innerHTML = table('Tổng theo đề tài', ['Mã', 'Trạng thái', 'Tổng'], fundingProjects.map(project => [
        project.id, project.status, money(sum(allocationRecords.filter(entry => entry.projectId === project.id)))
      ])) +
      table('Nguồn kinh phí', ['Mã', 'Tên', 'Loại'], sourceRecords.map(source => [source.id, source.name, source.type])) +
      table('Đợt đã cấp', ['Mã', 'Đề tài', 'Nguồn', 'Tiền'], allocationRecords.map(entry => [
        entry.id, entry.projectId, entry.sourceId, money(entry.amount)
      ])) + `<p>Tổng toàn hệ thống · <strong>${money(sum(allocationRecords))}</strong></p>`;
    }

    function reset() {
      sourceRecords = [...sources];
      allocationRecords = [...fundingAllocations];
      feedback(widget, 'Có sẵn nguồn và đề tài mẫu. Chọn Cấp kinh phí để thử kiểm mã đợt cấp.');
      show();
    }

    bindForms(widget, reset, (action, form) => {
      const id = fieldValue(form, 'id');
      if (action === 'source') {
        const name = fieldValue(form, 'name');
        const type = fieldValue(form, 'type');
        if (!id) return feedback(widget, 'Mã nguồn phải khác rỗng.', 'error');
        if (findById(sourceRecords, id)) return feedback(widget, 'Mã nguồn kinh phí đã tồn tại.', 'error');
        if (!name || !type) return feedback(widget, 'Tên và loại nguồn phải khác rỗng.', 'error');
        sourceRecords.push({ id, name, type });
        feedback(widget, 'FundingService.SaveSource đã thêm nguồn mới.', 'success');
      } else {
        const amountText = fieldValue(form, 'amount');
        if (!/^\d+$/.test(amountText)) {
          return feedback(widget, 'Nhập số nguyên dương bằng chữ số trong bài mô phỏng.', 'error');
        }
        const amount = BigInt(amountText);
        if (amount <= 0n || amount > decimalMax) {
          return feedback(widget, 'Số tiền từng đợt phải dương và nằm trong phạm vi decimal.', 'error');
        }
        const project = findById(fundingProjects, fieldValue(form, 'projectId'));
        if (!project) return feedback(widget, 'Đề tài không tồn tại.', 'error');
        if (project.status === 'Completed') {
          return feedback(widget, 'Không thể phân bổ thêm kinh phí cho đề tài đã hoàn thành. Các khoản đã cấp được giữ nguyên.', 'error');
        }
        const source = findById(sourceRecords, fieldValue(form, 'sourceId'));
        if (!source) return feedback(widget, 'Nguồn kinh phí không tồn tại.', 'error');
        if (!id) return feedback(widget, 'Mã đợt cấp phải khác rỗng.', 'error');
        const existing = findById(allocationRecords, id);
        if (existing) {
          return feedback(widget, `Mã đợt ${existing.id} đã xuất hiện ở ${existing.projectId}. Service kiểm cùng mã trên tất cả đề tài.`, 'error');
        }
        if (sum(allocationRecords) + amount > decimalMax) {
          return feedback(widget, 'Khoản cấp làm tổng kinh phí vượt phạm vi decimal. Kho chưa thay đổi.', 'error');
        }
        allocationRecords.push({ id, projectId: project.id, sourceId: source.id, amount });
        feedback(widget, `Đã lưu ${id} cho ${project.id} đang ${project.status}. TotalForProject cộng các đợt của đề tài này.`, 'success');
      }
      show();
    });

    onAction(widget, action => {
      if (action !== 'decimal-limit') return;
      allocationRecords = [{ id: 'A-MAX', projectId: 'P-A', sourceId: 'F01', amount: decimalMax }];
      const form = widget.querySelector('[data-sim-form="allocation"]');
      form.querySelector('[name="id"]').value = 'A-NEW';
      form.querySelector('[name="projectId"]').value = 'P-B';
      form.querySelector('[name="sourceId"]').value = 'F01';
      form.querySelector('[name="amount"]').value = '1';
      widget.querySelector('[name="operation"]').value = 'allocation';
      showSelectedForm(widget);
      feedback(widget, 'P-A đã có khoản decimal.MaxValue. Thử cấp 1 đ cho P-B để kiểm tràn tổng trên mọi đề tài.');
      show();
    });
  }

  const widgets = {
    objects: {
      title: 'Lớp, đối tượng và tham chiếu',
      summary: 'Gọi Promote qua hai biến trỏ tới cùng Student',
      source: 'Học liệu chương 1 · Student.Promote',
      controls: objectControls,
      setup: bindObjects
    },
    state: {
      title: 'Thử quy tắc State',
      summary: 'Gán người, duyệt và hoàn thành với bằng chứng giả lập',
      source: 'Business/Services/ProjectService.cs:24–50 · Business/Models/ProjectStates.cs:9–43 · Business/Services/ResultQueries.cs:23–26 · Presentation/ConsoleMenu.cs:254–259',
      controls: stateControls,
      setup: bindState
    },
    strategy: {
      title: 'So sánh hai Strategy kinh phí',
      summary: 'Đổi giữa tổng theo đề tài và tổng theo nguồn',
      source: 'Business/Services/FundingByProjectStrategy.cs:9–12 · Business/Services/FundingBySourceStrategy.cs:10–21',
      controls: strategyControls,
      setup: bindStrategy
    },
    uc01: {
      title: 'UC01 · Hồ sơ đơn vị và nhà nghiên cứu',
      summary: 'Sửa hồ sơ, thử email trùng và tra lịch sử lãnh đạo',
      source: 'Business/Services/PeopleService.cs:8–48 · Business/Models/People.cs:18,40–55 · Presentation/ConsoleMenu.cs:138–155,208–215',
      controls: peopleControls,
      setup: bindPeople
    },
    uc04: {
      title: 'UC04 · Khai báo nguồn và cấp kinh phí',
      summary: 'Thử cấp kinh phí khi Completed, mã đợt trùng và tổng vượt phạm vi decimal',
      source: 'Business/Services/FundingService.cs:8–49 · Business/Models/Funding.cs:19–36 · Presentation/ConsoleMenu.cs:191–205,344–355',
      controls: fundingControls,
      setup: bindFunding
    }
  };

  function render(id) {
    if (!Object.hasOwn(widgets, id)) return '';
    const widget = widgets[id];
    return `<section class="panel reading-panel simulator" data-simulator="${id}" aria-label="${escape(widget.title)}">
      ${widget.controls()}
      <p class="callout" data-sim-feedback role="status"></p>
      <div data-sim-output></div>
      <p class="muted">Đối chiếu ${escape(widget.source)}</p>
    </section>`;
  }

  function bind(root) {
    for (const widget of root.querySelectorAll('[data-simulator]')) {
      if (binding.has(widget)) continue;
      binding.add(widget);
      widgets[widget.dataset.simulator].setup(widget);
    }
  }

  window.OOPSimulators = {
    items: Object.entries(widgets).map(([id, { title, summary }]) => ({ id, title, summary })),
    render,
    bind
  };
}());
