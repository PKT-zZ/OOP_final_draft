(function () {
  'use strict';

  const heading = text => ({ type: 'heading', text });
  const paragraph = text => ({ type: 'p', text });
  const points = (...items) => ({ type: 'list', items });
  const note = (title, text) => ({ type: 'note', title, text });
  const table = (headers, rows) => ({ type: 'table', headers, rows });
  const diagram = (label, steps) => ({
    type: 'diagram', label, steps: steps.map(([title, text]) => ({ title, text }))
  });
  const explorer = (title, intro, rows) => ({
    type: 'explorer', title, intro, items: rows.map(([label, relation, detail]) => ({ label, relation, detail }))
  });
  const links = (...items) => ({ type: 'links', items: items.map(([title, href]) => ({ title, href })) });
  const code = (title, text, output) => ({ type: 'code', title, code: text, output });
  const excerpt = (title, path, lines, symbol, text, notes) => ({
    type: 'code', title, code: text, source: { path: 'QLNCKH_OOP_FINAL/' + path, lines, symbol }, notes
  });
  const quiz = (question, options, answer, hint, explanation) => ({ question, options, answer, hint, explanation });

  Object.assign(window.OOPCourse.lessons, {
    system: {
      minutes: 21,
      intro: 'Dùng một đề tài làm sợi chỉ xuyên suốt từ hồ sơ nhân sự, đề xuất và duyệt đến kinh phí, nghiệm thu và báo cáo.',
      goals: ['Đọc bản đồ 8 ca sử dụng và xác định bằng chứng triển khai của từng nhóm.', 'Phân biệt quyền thao tác, vai trò trong đề tài và trạng thái vòng đời.', 'Giới thiệu bài tập lớn trong khoảng 2 phút.'],
      related: ['architecture', 'use-cases', 'patterns', 'presentation'],
      tabs: {
        theory: [
          heading('Bài toán và dữ liệu đi qua hệ thống'),
          paragraph('Trường cần biết ai tham gia một đề tài, đề tài đã được duyệt chưa, nguồn nào cấp bao nhiêu và khi nào kết quả đủ điều kiện nghiệm thu. Mã đề tài nối các bước thành một hồ sơ có thể xem lại qua các phiên chạy. Bản chạy trong checkout QLNCKH_OOP_FINAL dùng C# .NET 8, menu console và dữ liệu JSON cục bộ. OOP Studio là tài liệu luyện tập chạy riêng trên trình duyệt.'),
          diagram('Từ hồ sơ nhân sự đến báo cáo', [
            ['Nhân sự · UC01', 'Chuyên viên quản lý đơn vị và nhà nghiên cứu. Nhà nghiên cứu đã có hồ sơ mới được đề xuất đề tài.'],
            ['Vòng đời · UC02–UC03', 'Đề tài mới Pending. Chuyên viên gán người và duyệt để chuyển Active.'],
            ['Kinh phí · UC04 và một phần UC08', 'Chuyên viên khai báo nguồn, cấp tiền từng đợt và xem tổng theo đề tài hoặc theo nguồn.'],
            ['Nghiệm thu · UC05–UC07', 'Chuyên viên lập hội đồng và gán người. Chủ tịch ghi điểm, nhà nghiên cứu ghi đầu ra. Chuyên viên xác nhận hoàn thành sau khi đề tài có cả hai bằng chứng.'],
            ['Báo cáo đầu ra · UC08', 'Chuyên viên xem đầu ra theo đề tài, theo loại và tra cứu theo mã hoặc trạng thái.']
          ]),
          table(['Khái niệm', 'Ví dụ', 'Dùng để quyết định'], [
            ['UserRole', 'Researcher, Officer, CouncilChair', 'Ai được gọi thao tác trong phiên. Ghi điểm còn đòi đúng mã Chủ tịch của hội đồng được chọn.'],
            ['ProjectRole', 'Leader, Member', 'Một người tham gia đề tài cụ thể với tư cách gì. Lưu trong ProjectParticipation.'],
            ['ProjectStatus', 'Pending, Active, Completed', 'Một đề tài đang ở giai đoạn nào và State xử lý lời gọi ra sao.']
          ]),
          note('Ranh giới bài tập', 'Menu đổi vai để thử kiểm quyền. Mã nhà nghiên cứu trong phiên là dữ liệu mô phỏng. Đặc tả loại khỏi phạm vi xác thực tài khoản thật, email, SQL, upload báo cáo và quyết toán tài chính.')
        ],
        example: [
          heading('Một người, hai ngữ cảnh vai trò'),
          paragraph('Giả sử R001 là chủ nhiệm P003. Một phiên đang mang quyền Researcher vẫn bị service từ chối khi yêu cầu Approve. Chuyên viên gọi duyệt, còn chủ nhiệm là một điều kiện nằm trong danh sách người tham gia.'),
          code('C# minh họa độc lập · hai enum biểu diễn hai ngữ cảnh', `using System;

UserRole session = UserRole.Researcher;
ProjectRole participation = ProjectRole.Leader;
Console.WriteLine($"Phiên {session} / tham gia {participation}");
Console.WriteLine(session == UserRole.Officer ? "Qua kiểm tra quyền" : "Bị từ chối quyền");

public enum UserRole { Researcher, Officer }
public enum ProjectRole { Leader, Member }`, 'Phiên Researcher / tham gia Leader\nBị từ chối quyền'),
          note('Điều kiện thứ hai', 'Sau khi qua kiểm quyền Officer, đề tài vẫn cần đúng một Leader và đang Pending. Hai kiểm tra nằm ở các tầng khác nhau.')
        ],
        project: [
          heading('Các kiểu nghiệp vụ cần chỉ được trên UML'),
          table(['Nhóm', 'Kiểu chính', 'Mức độ hiện có'], [
            ['Nhân sự', 'Department, Researcher, DepartmentHeadTerm', 'Có model, service và menu UC01. Nhiệm kỳ được nạp để tra cứu.'],
            ['Đề tài', 'ProjectCategory, ResearchProject, ProjectParticipation, ProjectStatusHistory', 'Có model, service và menu UC02–UC03.'],
            ['Kinh phí', 'FundingSource, FundingAllocation', 'Có UC04 và hai Strategy kinh phí ở menu 11–12.'],
            ['Hội đồng', 'EvaluationCouncil, CouncilMembership', 'Có model, EvaluationService và menu 13–15.'],
            ['Đầu ra', 'DeliverableType, ProjectDeliverable, Paper, PaperAuthor, ProjectPaperLink', 'Có model, OutputService và menu 17–18. Paper và ProjectDeliverable kế thừa lớp trừu tượng ResearchOutput.']
          ]),
          note('Cách đếm 16 kiểu', 'Đếm 9 kiểu nghiệp vụ cụ thể của A và 7 kiểu cụ thể của B, gồm hai kiểu hội đồng và năm kiểu đầu ra. ReportRow là dòng báo cáo. ResearchOutput là lớp trừu tượng. Hai kiểu này nằm ngoài phép đếm.'),
          heading('Phân công và đường nối A–B'),
          paragraph('Nguyễn Khánh Toàn phụ trách UC01–UC04, State và hai Strategy kinh phí. Nguyễn Việt Hoàng phụ trách UC05–UC08, gồm hội đồng, nghiệm thu, đầu ra và báo cáo kết quả. Menu 16 đưa ResultCompletionEvidence vào ProjectService.Complete để đọc điểm và đầu ra từ IResultRepository. A-BRIDGE kiểm riêng phía nhận bằng dữ liệu giả lập. B-T20 dùng service và adapter thật với kho trong bộ nhớ.'),
          note('Đối chiếu đặc tả với menu', 'docs/scope.md còn mô tả một số mục UC05–UC08 là dự kiến. Trong checkout này, README và ConsoleMenu.cs:227–312 ghi nhận đường gọi từ menu. Khi trình bày hiện trạng, chỉ đúng mã đang chạy và kết quả kiểm thử tương ứng.'),
          excerpt('Ba enum và ngữ cảnh quyền', 'Business/Models/Common.cs', [14, 20], 'UserRole, ProjectStatus, ProjectRole, CurrentUserContext', `public enum UserRole { Researcher, Officer, CouncilChair }
//vong doi cua de tai
public enum ProjectStatus { Pending, Active, Completed }
//vai tro cua researcher trong de tai
public enum ProjectRole { Leader, Member }
//kiem tra quyen
public sealed record CurrentUserContext(UserRole Role, string? ResearcherId = null);`, [
            { label: 'Quyền của phiên', lines: [14, 14], text: 'Service kiểm UserRole. Chọn CouncilChair trên menu chỉ thiết lập ngữ cảnh phiên.' },
            { label: 'Vai trò của một người trong đề tài', lines: [18, 18], text: 'ProjectRole được lưu trên mỗi ProjectParticipation. Nó không cấp quyền Officer.' }
          ]),
          links(['Phân tích đủ 8 ca sử dụng', '#lesson/use-cases'], ['Mô phỏng đề xuất, gán và duyệt', '#simulation'])
        ],
        defense: [
          heading('Giới thiệu bài tập lớn trong 2 phút'),
          paragraph('0:00–0:30 · Nhóm em mô phỏng việc quản lý đề tài nghiên cứu trong trường. Một nhà nghiên cứu đã có hồ sơ gửi đề xuất, chuyên viên gán người tham gia và duyệt. Mỗi đề tài có mã riêng để theo dõi người tham gia, lịch sử và tiền được cấp. Bản chạy dùng C# .NET 8 trên console và lưu các hồ sơ vào JSON cục bộ.'),
          paragraph('0:30–1:10 · Phần em phụ trách là UC01 đến UC04. Em đặt quy tắc trong Business để khi thay menu hoặc chạy test, thao tác vẫn được kiểm theo cùng điều kiện. Ví dụ, service kiểm quyền chuyên viên, còn đề tài kiểm có đúng một chủ nhiệm khi duyệt. Đề tài dùng State để quyết định hành vi theo Pending, Active hoặc Completed. Hai Strategy đọc cùng dữ liệu kinh phí nhưng gom theo hai chiều, theo đề tài hoặc theo nguồn.'),
          paragraph('1:10–2:00 · Em sẽ tạo một đề tài mới, thử duyệt lúc còn thiếu chủ nhiệm, sau đó gán và duyệt lại. Em cấp hai đợt rồi đọc tổng. Phần bạn em phụ trách là hội đồng, nghiệm thu, đầu ra và báo cáo kết quả. Sau khi Chủ tịch ghi điểm và nhà nghiên cứu ghi một đầu ra, Chuyên viên dùng menu 16. Adapter đọc cả hai bằng chứng rồi service gọi State để chuyển sang Completed.'),
          heading('Câu hỏi bảo vệ'),
          points('Một người có thể là chủ nhiệm đề tài này và thành viên đề tài khác thế nào? Chỉ ProjectParticipation và quan hệ với ResearchProject.', 'Vì sao menu đổi vai chưa phải đăng nhập? Chỉ ra việc tạo CurrentUserContext và bước kiểm quyền ở service.', 'Nếu được hỏi đã kiểm nghiệm thu thế nào, phân biệt A-BRIDGE với B-T20 và nêu kết quả demo trên bản sao nếu đã thực hiện.')
        ]
      },
      quiz: [
        quiz('R001 là Leader của P003. Phiên Researcher có thể duyệt P003 không?', ['Có, vì là Leader', 'Không, Approve yêu cầu Officer', 'Chỉ được duyệt nếu có kinh phí'], 1, 'Xem quyền phiên và vai trò theo đề tài.', 'ProjectRole mô tả sự tham gia. ProjectService.Approve kiểm UserRole.Officer trước khi xử lý trạng thái.'),
        quiz('Một đề tài vừa được đề xuất hợp lệ có trạng thái nào?', ['Completed', 'Active', 'Pending'], 2, 'Phê duyệt là một thao tác tiếp theo.', 'ResearchProject khởi tạo Pending. Chỉ sau khi đủ điều kiện và duyệt thành công mới chuyển Active.'),
        quiz('Một FundingAllocation trả lời câu hỏi nào?', ['Đợt nào cấp bao nhiêu từ nguồn nào cho đề tài nào', 'Ai là chủ nhiệm đề tài', 'Tổng số tác giả của một bài báo'], 0, 'Nhìn các khóa ProjectId và SourceId.', 'Khoản cấp chứa mã đợt, đề tài, nguồn, số tiền và ngày cấp. Tổng kinh phí được tính từ nhiều đợt.'),
        quiz('Menu nào gọi ProjectService.Complete với ResultCompletionEvidence?', ['15, ghi điểm hội đồng', '17, ghi bài báo', '16, hoàn thành đề tài'], 2, 'Đối chiếu các mục nghiệm thu của ConsoleMenu.', 'Menu 16 tạo adapter trên kho đang dùng rồi chuyển cho Complete. Menu 15 và 17 tạo dữ liệu để adapter truy vấn.'),
        quiz('Bảng 16 kiểu nghiệp vụ cụ thể gồm những nhóm nào?', ['9 kiểu A và 7 kiểu B', '9 kiểu A và 7 Strategy', '8 kiểu model và 8 service'], 0, 'Cộng nhóm nhân sự, đề tài, kinh phí, hội đồng và đầu ra.', 'Đếm 9 kiểu cụ thể thuộc A và 7 kiểu cụ thể thuộc B. ReportRow và abstract ResearchOutput ngoài phép đếm.'),
        quiz('B-T20 kiểm thêm gì so với việc đơn thuần gọi Complete với adapter giả?', ['Test giao diện web offline', 'Chỉ chọn CouncilChair trong menu', 'Tạo dữ liệu hội đồng và đầu ra qua service rồi đọc qua adapter thật'], 2, 'Xem dữ liệu đi từ đâu vào ICompletionEvidence.', 'A-BRIDGE dùng dữ liệu giả. B-T20 chạy các service liên thông với kho bộ nhớ và kiểm cả kết quả tổng hợp. Kiểm ghi và nạp JSON cần một phép thử riêng.'),
        quiz('Chi tiết nào thuộc phạm vi vận hành hiện tại?', ['Lưu hồ sơ vào JSON cục bộ', 'Xác thực JWT', 'Quyết toán chứng từ từ ngân hàng'], 0, 'Xem cách repository lưu sau Save.', 'Kho JSON cục bộ duy trì dữ liệu qua các phiên. Xác thực tài khoản và quyết toán chứng từ nằm ngoài phạm vi.')
      ]
    },
    architecture: {
      minutes: 24,
      intro: 'Từ một lựa chọn menu, lần đến lớp thực thi và quay lại điểm hiển thị kết quả, kể cả khi nhập sai hoặc ghi tệp thất bại.',
      goals: ['Giải thích hướng lời gọi và hướng phụ thuộc kiểu.', 'Theo vết thao tác của cả A và B từ menu đến model, kho hoặc Strategy.', 'Mô tả bằng chứng ghi, đọc lại dữ liệu và xử lý lỗi lưu.'],
      related: ['organization', 'system', 'use-cases', 'testing'],
      tabs: {
        theory: [
          heading('Từ tiến trình console đến quy tắc nghiệp vụ'),
          diagram('Một vòng lặp thực thi', [
            ['Program.cs', 'Tạo ConsoleMenu và gọi Run. Nếu khởi tạo dữ liệu thất bại, in lỗi và đặt mã thoát 1.'],
            ['Presentation · ConsoleMenu', 'Tạo một kho JSON, truyền cho các service, đọc lựa chọn và phân nhánh trong Dispatch.'],
            ['Business · Service và model', 'Service tra hồ sơ qua interface, kiểm quyền. Model kiểm quy tắc của đối tượng, State điều khiển vòng đời.'],
            ['Data · Kho thực tế', 'Save của kho JSON cập nhật bộ nhớ rồi ghi snapshot. Tra cứu dùng trạng thái trong bộ nhớ.'],
            ['Presentation · Kết quả', 'In trạng thái, tổng kinh phí, bảng báo cáo hoặc thông báo lỗi.']
          ]),
          paragraph('Khi biên dịch, ProjectService biết IPeopleRepository và IProjectRepository trong Business. Data hiện thực các hợp đồng đó. Presentation biết JsonResearchRepository để tạo đối tượng. Chiều gọi Save lúc chạy từ Business tới kho cụ thể nhờ đa hình qua interface. Điều này giải thích vì sao có thể thử ProjectService với InMemoryResearchRepository mà không cần JSON.'),
          heading('Nạp và lưu snapshot'),
          points('Khi mở, kho đọc config/appsettings.json cạnh tệp chạy. Đường dẫn tương đối được ghép với AppContext.BaseDirectory. Nếu thiếu tệp làm việc, kho sao chép Data/seed.json rồi đọc snapshot.', 'Load kiểm mã trùng và các tham chiếu. Đơn vị được nạp trước nhà nghiên cứu. Loại đề tài và nguồn kinh phí được nạp trước đề tài. ResearchProject.Restore tái dựng lịch sử, sau đó LoadResults xử lý hội đồng và đầu ra.', 'Khi lưu, kho ánh xạ các model sang DTO trong AppSnapshot, ghi tệp .tmp và di chuyển đè vào tệp đích. Dữ liệu mở rộng OtherModules được giữ lại.', 'Menu hiển thị lỗi nhập liệu và vi phạm nghiệp vụ rồi quay lại vòng lặp. DataPersistenceException khiến phiên dừng với mã thoát 1 vì bộ nhớ có thể đã đổi trước khi đĩa ghi thành công.'),
          note('Vì sao lưu bài báo với liên kết cùng lượt?', 'JsonResearchRepository.SavePaperWithLink gọi base.SavePaperWithLink rồi Persist đúng một lần. Nếu Persist báo lỗi, kho gỡ cặp bài báo và liên kết vừa thêm khỏi bộ nhớ, giữ cờ chặn ghi và để menu dừng phiên. Các Save đơn thường có thể để bộ nhớ đã đổi dù tệp chính chưa được thay.')
        ],
        example: [
          code('C# minh họa độc lập · cùng service, hai đối tượng kho', `using System;

var memory = new MemoryStore();
new Workflow(memory).Run("P003");
Console.WriteLine($"Bộ nhớ giữ {memory.LastId}");
new Workflow(new TraceStore()).Run("P003");

public interface IStore { void Save(string id); }
public sealed class MemoryStore : IStore
{
    public string? LastId { get; private set; }
    public void Save(string id) => LastId = id;
}
public sealed class TraceStore : IStore
{
    public void Save(string id) => Console.WriteLine($"Đối tượng ghi vết nhận {id}");
}
public sealed class Workflow(IStore store)
{
    public void Run(string id) => store.Save(id);
}`, 'Bộ nhớ giữ P003\nĐối tượng ghi vết nhận P003'),
          paragraph('Lần theo new Workflow, tham số IStore rồi lệnh store.Save. Trình biên dịch kiểm hợp đồng, lúc chạy đối tượng thực quyết định phần thân. Ví dụ giữ mã trong MemoryStore hoặc in vết bằng TraceStore. Trong QLNCKH, kho JSON ghi đè Save và gọi Persist.')
        ],
        project: [
          explorer('Code Flow Explorer', 'Chọn một thao tác và theo vết từ dữ liệu nhập đến kết quả. Các đường gọi được mô tả theo source hiện hành.', [
            ['UC01 · Cập nhật hồ sơ', 'ConsoleMenu mục 3/4 → PeopleService → Department hoặc Researcher → kho JSON', 'Mục 3 đọc mã, tên và ngày. SaveDepartment kiểm quyền và chuẩn hóa mã, rồi tạo mới hoặc đổi tên. Mục 4 chuyển tiếp các thuộc tính tùy chọn của hồ sơ cũ. SaveResearcher tra đơn vị, so email và cập nhật model. Sau Save, menu in xác nhận. Đọc ConsoleMenu.cs:138–156 và PeopleService.cs:8–38.'],
            ['UC02 · Đề xuất', 'ConsoleMenu mục 5 → ProjectService.ProposeProject → new ResearchProject → Save', 'Menu đọc ngày bắt đầu và ngày kết thúc tùy chọn. Service kiểm Researcher có hồ sơ, loại và mã đề tài. Constructor kiểm tên và ngày. Kho lưu hồ sơ Pending, menu in mã và trạng thái. Đọc ConsoleMenu.cs:159–167 và ProjectService.cs:7–22.'],
            ['UC03 · Gán người', 'ConsoleMenu mục 6 → ProjectService.AssignMember → ResearchProject.AddMember → Save', 'Menu chuyển 1/2 thành Leader/Member. Service kiểm quyền và tra nhà nghiên cứu và đề tài. Model kiểm Pending, một người tham gia một lần và tối đa một Leader trước khi thêm. Một vai trò nhập sai bị menu từ chối trước khi gọi model. Đọc ConsoleMenu.cs:170–181, ProjectService.cs:24–32 và Projects.cs:68–77.'],
            ['UC03 · Phê duyệt', 'ConsoleMenu mục 7 → ProjectService.Approve → ResearchProject.Approve → PendingState → Save', 'Service kiểm Officer. Model chọn State theo Status. PendingState kiểm đúng một Leader rồi đổi Active và ghi một mốc lịch sử. Có lỗi thì không tới Save. Lần duyệt lại bị ActiveState từ chối. Đọc ProjectService.cs:34–40, Projects.cs:79–87, ProjectStates.cs:11–28.'],
            ['UC04 · Phân bổ', 'ConsoleMenu mục 9 → FundingService.Allocate → ResearchProject.AddAllocation → Save → TotalForProject', 'Menu nhận số đồng nguyên dương và ngày. Service chặn Completed, kiểm nguồn, mã đợt và tổng decimal trước khi thêm. Menu hỏi lại tổng để in sau lưu. Đọc ConsoleMenu.cs:197–205,344–355 và FundingService.cs:18–49.'],
            ['UC05 · Lập hội đồng và phân vai', 'Menu 13/14 → EvaluationService → EvaluationCouncil → IResultRepository', 'CreateCouncil chỉ lập khi Active và mỗi đề tài chỉ có một hội đồng. AddMember ngăn trùng người, Chủ tịch thứ hai và khóa danh sách sau lần ghi điểm đầu tiên. Đọc ConsoleMenu.cs:228–245 và EvaluationService.cs:10–35.'],
            ['UC06 · Ghi điểm và hoàn thành', 'Menu 15 → EvaluationService.RecordScore. Menu 16 → ProjectService.Complete → ResultCompletionEvidence → State', 'Chủ tịch đúng hội đồng ghi điểm khi Active. Chuyên viên dùng menu 16. Kho có điểm và ít nhất một đầu ra thì ActiveState chuyển Completed, ghi lịch sử và service lưu. Đọc ConsoleMenu.cs:248–258, ResultQueries.cs:23–27 và ProjectService.cs:42–51.'],
            ['UC07 · Ghi đầu ra', 'Menu 17/18 → OutputService → ResearchOutputCreator.Build → Create và Validate → kho kết quả', 'Nhà nghiên cứu tham gia đề tài Active, và khi ghi bài báo còn là một tác giả của bài. Hai Creator hiện thực Create cho từng kiểu đầu ra. Bài báo và liên kết được SavePaperWithLink ghi cùng lượt. Đọc ConsoleMenu.cs:261–285 và OutputService.cs:12–60.'],
            ['UC08 · Báo cáo và tra cứu', 'Menu 11/12/19/20 → PrintReport → ReportService.Generate → BuildRows. Menu 21 → ProjectLookupService.Search', 'Officer có bốn Strategy và đường lọc đề tài theo mã hoặc trạng thái. PrintReport chỉ in tổng khi mọi dòng cùng đơn vị. Menu 1 liệt kê đề tài trực tiếp. Đọc ConsoleMenu.cs:218–225,288–312,321–335.']
          ]),
          excerpt('Điểm vào và lỗi khởi tạo', 'Program.cs', [5, 11], 'Điểm vào chương trình', `try { new ConsoleMenu().Run(); }
catch (Exception ex) when (ex is IOException or InvalidDataException or System.Text.Json.JsonException
    or UnauthorizedAccessException)
{
    Console.Error.WriteLine($"Không thể mở dữ liệu ứng dụng: {ex.Message}");
    Environment.ExitCode = 1;
}`, [
            { label: 'Tạo menu cũng có thể lỗi', lines: [5, 5], text: 'Kho JSON là field của ConsoleMenu và được khởi tạo trước khi Run bắt đầu. Lỗi cấu hình hoặc nạp dữ liệu có thể dừng tại đây.' }
          ]),
          excerpt('Ngày kết thúc bỏ trống thành null', 'Presentation/ConsoleMenu.cs', [376, 380], 'ConsoleMenu.ReadOptionalDate', `    private static DateOnly? ReadOptionalDate(string prompt)
    {
        var value = Read(prompt);
        return value.Length == 0 ? null : DateOnly.ParseExact(value, "yyyy-MM-dd", CultureInfo.InvariantCulture);
    }`, [
            { label: 'Từ nhập liệu sang kiểu dữ liệu', lines: [378, 379], text: 'Read đã trim dữ liệu. Cuối cùng model so mốc thời gian, còn menu chịu trách nhiệm chuyển chuỗi sang DateOnly?.' }
          ]),
          links(['Luồng đề xuất và duyệt', '#simulation'], ['Thử luồng cấp kinh phí', '#simulation/uc04'])
        ],
        defense: [
          heading('Nếu thêm giao diện khác thì quy tắc ở đâu?'),
          paragraph('Em giữ quy tắc ở service và model. Giao diện mới chịu trách nhiệm lấy dữ liệu và hiển thị lỗi. Ví dụ, giao diện có thể ẩn nút duyệt với Researcher, còn ProjectService.Approve vẫn kiểm quyền Officer cho mọi lời gọi.'),
          heading('Nếu ghi JSON thất bại sau AddAllocation thì sao?'),
          paragraph('Service có thể đã thêm khoản vào đối tượng trong bộ nhớ. Kho báo DataPersistenceException và chặn lần Save sau, menu dừng phiên. Để xác minh dữ liệu đã giữ gì, em đọc lại tệp làm việc trên bản sao sau khi xử lý nguyên nhân lỗi.'),
          heading('Điểm nối nên chỉ trên code'),
          points('ConsoleMenu truyền cùng _data cho các service A, B và tra cứu. Đọc constructor để giải thích DI.', 'ProjectService.Approve kiểm quyền và lưu. ResearchProject chuyển lời gọi đến State dựa trên Status.', 'Kho JSON nạp model đã kiểm tra và dùng ProjectData khi lưu. Phân biệt lịch sử phục hồi với lịch sử được thêm bởi ChangeStatus.')
        ]
      },
      quiz: [
        quiz('Đâu là nơi chuyển chuỗi ngày yyyy-MM-dd sang DateOnly?', ['ResearchProject.StateFor', 'ConsoleMenu.ReadDate hoặc ReadOptionalDate', 'ReportRow'], 1, 'Xem tầng đọc dữ liệu Console.', 'Presentation đổi chuỗi thành kiểu dữ liệu. Model vẫn kiểm thứ tự ngày vì có thể được gọi từ giao diện khác.'),
        quiz('Vì sao service chạy được với kho bộ nhớ?', ['Service biết interface repository', 'Console tự tạo cơ sở dữ liệu', 'Model đọc lại JSON trong mỗi method'], 0, 'Nhìn tham số constructor của ProjectService.', 'Cả hai kho đều thực hiện hợp đồng mà service nhận. Đối tượng thực được cung cấp lúc khởi tạo.'),
        quiz('Khi tải snapshot, vì sao nạp đơn vị trước nhà nghiên cứu?', ['Do thứ tự chữ cái', 'Để kiểm tra đơn vị mà nhà nghiên cứu tham chiếu', 'Để chuyển trạng thái đề tài'], 1, 'Một hồ sơ Researcher chứa DepartmentId.', 'Load tra DepartmentId trước khi lưu researcher vào bộ nhớ. Nạp đơn vị trước giúp kiểm liên kết.'),
        quiz('Lệnh nào xác nhận phê duyệt đã cập nhật tệp?', ['Chỉ nhìn History trên đối tượng trong test InMemory', 'Chỉ xem Console đã in dòng bắt đầu', 'Mở lại bản sao dữ liệu và đối chiếu trạng thái cùng lịch sử'], 2, 'Phân biệt dữ liệu trong bộ nhớ và snapshot trên đĩa.', 'Kiểm lưu trữ cần ghi, đóng và đọc lại dữ liệu. Một test kho bộ nhớ xác nhận phần nghiệp vụ thực thi.'),
        quiz('Menu cần làm gì khi bắt DataPersistenceException?', ['In lỗi và dừng phiên với mã 1', 'Tự tiếp tục lưu lần nữa', 'Bỏ lỗi và báo thành công'], 0, 'Đối tượng bộ nhớ có thể đã thay đổi.', 'Save của kho JSON cập nhật bộ nhớ trước Persist. Tiếp tục phiên có thể khiến kết quả dựa trên dữ liệu chưa được ghi.'),
        quiz('Tệp làm việc mặc định được tạo từ đâu ở lần đầu?', ['Từ bảng ReportRow', 'Từ Data/seed.json theo cấu hình', 'Từ lịch sử trình duyệt'], 1, 'Xem đường dẫn seedFile trong config/appsettings.json.', 'Nếu chưa có tệp làm việc, kho sao chép seed vào đường dẫn dataFile rồi nạp snapshot.'),
        quiz('Vì sao báo cáo theo nguồn không gọi Save?', ['Nó chỉ đọc allocations và tạo ReportRow', 'Save được ẩn trong CSS', 'Mỗi báo cáo hoàn thành một đề tài'], 0, 'Theo Code Flow Explorer mục 12.', 'BuildRows gom và cộng các khoản đã có. Thay cách tổng hợp không làm thay đổi nguồn dữ liệu.')
      ]
    },
    'use-cases': {
      minutes: 33,
      intro: 'Đọc mỗi Use Case theo tác nhân, dữ liệu, đường thành công, nhánh lỗi và bằng chứng hiện có.',
      goals: ['Theo vết cả tám UC từ menu đến nghiệp vụ.', 'Giải thích điều kiện lập hội đồng, ghi điểm, ghi đầu ra và nghiệm thu.', 'Tự bảo vệ các quyết định về State, Factory Method, phân bổ và báo cáo.'],
      related: ['system', 'architecture', 'patterns', 'testing', 'defense'],
      tabs: {
        theory: [
          table(['Use Case', 'Tác nhân', 'Kết quả', 'Bằng chứng hiện hành'], [
            ['UC01 · Đơn vị, nhân sự', 'Officer', 'Lưu hồ sơ hoặc đọc nhiệm kỳ', 'Menu 3, 4, 10.'],
            ['UC02 · Đề xuất', 'Researcher', 'Đề tài mới Pending', 'Menu 5.'],
            ['UC03 · Gán, duyệt', 'Officer', 'Thành viên và chuyển Pending → Active', 'Menu 6, 7.'],
            ['UC04 · Kinh phí', 'Officer', 'Nguồn và từng đợt cấp, tổng theo đề tài', 'Menu 8, 9.'],
            ['UC05 · Hội đồng', 'Officer', 'Hội đồng và danh sách thành viên', 'Menu 13–14, EvaluationService.'],
            ['UC06 · Chấm và nghiệm thu', 'CouncilChair, Officer', 'Điểm và chuyển Active → Completed', 'Menu 15–16, ResultCompletionEvidence đọc kho kết quả.'],
            ['UC07 · Ghi đầu ra', 'Researcher', 'Bài báo hoặc sản phẩm liên kết đề tài', 'Menu 17–18, OutputService và hai Creator.'],
            ['UC08 · Báo cáo, tra cứu', 'Officer', 'Bốn báo cáo và tra cứu mã/trạng thái', 'Menu 11, 12, 19, 20, 21 kiểm quyền. Menu 1 chỉ liệt kê đề tài trực tiếp.']
          ]),
          note('Điểm tinh tế ở UC08', 'ReportService.Generate kiểm Officer cho bốn báo cáo. ProjectLookupService.Search cũng kiểm Officer. Menu 1 liệt kê đề tài trực tiếp cho mọi vai trò. Hãy phân biệt chức năng danh sách cơ bản với chức năng tra cứu và báo cáo.'),
          diagram('UC03 · Gán trước, duyệt sau', [
            ['Kiểm quyền và tìm đối tượng', 'Service tìm người, đề tài và yêu cầu Officer.'],
            ['Gán khi Pending', 'AddMember kiểm người trùng và chủ nhiệm thứ hai.'],
            ['Duyệt với đúng một Leader', 'PendingState chuyển Active, ghi lịch sử. Vi phạm quy tắc khiến thao tác dừng trước Save.']
          ]),
          diagram('UC04 · Một lần cấp kinh phí', [
            ['Đề tài được cấp và nguồn tồn tại', 'Service tìm đề tài, từ chối Completed, rồi tra mã nguồn.'],
            ['Mã đợt và số tiền hợp lệ', 'Chuẩn hóa mã, kiểm trùng trên mọi đề tài, tạo khoản dương và thử tính tổng decimal.'],
            ['Tổng được đọc lại sau khi lưu', 'Model thêm khoản, service Save, menu in TotalForProject.']
          ])
        ],
        example: [
          heading('Một mã đợt cấp xuất hiện ở hai đề tài'),
          paragraph('Giả sử A004 đã cấp cho P003. Người dùng nhập “ a004 ” khi cấp cho P004. Cần chuẩn hóa rồi so với tất cả khoản trong kho. Trong minh họa, danh sách existing chứa mã của nhiều đề tài.'),
          code('C# minh họa độc lập · so mã không phân biệt hoa thường', `using System;
using System.Linq;

string[] existing = ["A001", "A004"];
string incoming = " a004 ".Trim();
bool duplicate = existing.Contains(incoming, StringComparer.OrdinalIgnoreCase);
Console.WriteLine(duplicate ? "Từ chối mã đợt trùng" : "Tiếp tục kiểm tra");`, 'Từ chối mã đợt trùng'),
          note('Dữ liệu hiện hành', 'FundingService.Allocate lấy projects.Projects.SelectMany(p => p.Allocations) trước khi xét mã trùng. Kiểm tràn decimal là bước riêng, sau khi tạo khoản hợp lệ và trước khi thay đổi đề tài.')
        ],
        project: [
          heading('UC01 · Quản lý đơn vị và nhà nghiên cứu'),
          points('Mục tiêu và tác nhân. Officer tạo hoặc cập nhật đơn vị, hồ sơ người và xem lịch sử lãnh đạo đã nạp ở menu 3, 4, 10.', 'Đầu vào và tiền điều kiện. Đơn vị có mã, tên và ngày thành lập. Nhà nghiên cứu có mã, đơn vị đã tồn tại, họ tên, email và trường hồ sơ tùy chọn. Xem lịch sử cần mã đơn vị.', 'Luồng chính và kết quả. PeopleService.SaveDepartment chuẩn hóa mã để tra rồi tạo Department hoặc Rename. SaveResearcher kiểm đơn vị và email trùng giữa người khác rồi tạo hoặc Update. Menu 4 truyền lại trường tùy chọn cũ. GetHeadHistory lọc DepartmentHeadTerm và sắp theo From.', 'Lỗi và quy tắc. Vai sai, tham chiếu đơn vị sai, trường rỗng hoặc email sai dạng đều bị từ chối. Email có dấu @ ở giữa và so không phân biệt hoa thường. Đổi tên giữ ngày thành lập. Caller trực tiếp cần truyền lại trường tùy chọn muốn giữ.'),
          heading('UC02 · Đề xuất đề tài'),
          points('Mục tiêu và tác nhân. Researcher đã có hồ sơ tạo mới đề tài ở menu 5.', 'Đầu vào và tiền điều kiện. Mã đề tài, loại đã có, tên, ngày bắt đầu, ngày kết thúc dự kiến có thể trống. Mã người của phiên phải tra được.', 'Luồng chính và kết quả. ProjectService.ProposeProject kiểm hồ sơ và loại, dùng cùng mã đã trim để tra và tạo ResearchProject. Constructor kiểm tên và khoảng ngày. Save thành công trả đề tài Pending.', 'Lỗi và quy tắc. Sai vai, người hoặc loại không có, mã trùng kể cả đổi hoa thường, tên rỗng, ngày cuối trước ngày đầu bị từ chối. Hai ngày bằng nhau hợp lệ. Loại đề tài lấy từ seed.'),
          heading('UC03 · Gán và phê duyệt'),
          points('Mục tiêu và tác nhân. Officer lập danh sách người tham gia tại menu 6 và duyệt tại menu 7.', 'Đầu vào và tiền điều kiện. Gán cần mã đề tài Pending, mã người tồn tại và Leader hoặc Member. Duyệt cần đề tài Pending ở thời điểm gọi và đúng một Leader.', 'Luồng chính và kết quả. AssignMember gọi ResearchProject.AddMember tạo ProjectParticipation. Approve qua ResearchProject.Approve và PendingState.Approve, ghi ProjectStatusHistory rồi lưu Active.', 'Lỗi và quy tắc. Người đã được gán, Leader thứ hai, gán sau duyệt, duyệt thiếu Leader hoặc duyệt lại đều bị từ chối. Đề tài Pending có thể có 0 Leader khi đang lập danh sách.'),
          heading('UC04 · Khai nguồn và ghi đợt cấp'),
          points('Mục tiêu và tác nhân. Officer khai FundingSource rồi ghi FundingAllocation theo từng đợt ở menu 8–9.', 'Đầu vào và tiền điều kiện. Nguồn mới có mã, tên và loại không rỗng. Đợt cấp có mã, đề tài Pending hoặc Active, nguồn đã tồn tại và ngày đúng định dạng. Menu đọc số đồng nguyên dương chỉ bằng chữ số. Model dùng decimal dương.', 'Luồng chính và kết quả. SaveSource thêm nguồn. Allocate chặn Completed, kiểm mã trùng trên mọi đề tài, thử tính tổng hệ thống, gọi AddAllocation rồi lưu. TotalForProject đọc tổng từ các khoản trong đề tài. Một nguồn được dùng cho nhiều đợt.', 'Lỗi và quy tắc. Mã nguồn và mã đợt được trim trước khi so trùng. Đề tài Completed giữ nguyên các khoản đã lưu. Số tiền 0 hoặc âm bị chặn. Một khoản dương vẫn bị từ chối nếu tổng tràn miền biểu diễn decimal. Code kiểm miền số của kiểu tiền.'),
          excerpt('Kiểm trước khi ghi khoản cấp', 'Business/Services/FundingService.cs', [23, 44], 'FundingService.Allocate', `        // Sau khi nghiệm thu, giữ nguyên các khoản đã cấp cho đề tài.
        if (project.Status == ProjectStatus.Completed)
            throw new InvalidOperationException("Không thể phân bổ thêm kinh phí cho đề tài đã hoàn thành.");

        var source = projects.FindSource(sourceId) ?? throw new InvalidOperationException("Nguồn kinh phí không tồn tại.");
        // Mã đợt cấp phải duy nhất trên toàn bộ đề tài.
        var normalizedId = Guard.Required(id, nameof(id));
        if (projects.Projects.SelectMany(p => p.Allocations).Any(a => a.Id.Equals(normalizedId, StringComparison.OrdinalIgnoreCase)))
            throw new InvalidOperationException("Mã phân bổ đã tồn tại.");
        var allocation = new FundingAllocation(normalizedId, project.Id, source.Id, amount, allocatedAt);
        // Báo cáo cộng chung tất cả đề tài, nên kiểm tra tổng trước khi thay đổi hồ sơ.
        try
        {
            _ = projects.Projects.Sum(item => item.TotalFunding) + allocation.Amount;
        }
        catch (OverflowException ex)
        {
            throw new InvalidOperationException("Khoản cấp làm tổng kinh phí vượt phạm vi decimal.", ex);
        }

        project.AddAllocation(allocation);
        projects.Save(project);`, [
            { label: 'Khóa kinh phí từ khi nghiệm thu', lines: [23, 25], text: 'Guard Completed chạy ngay sau khi tìm đề tài. Khoản mới bị chặn trước khi tra nguồn hay tạo Allocation.' },
            { label: 'Mã trùng trên mọi đề tài', lines: [28, 31], text: 'SelectMany làm phẳng các đợt cấp. Any dừng khi gặp mã đã tồn tại theo so sánh OrdinalIgnoreCase.' },
            { label: 'Biên biểu diễn, kiểm trước khi đổi dữ liệu', lines: [32, 44], text: 'FundingAllocation kiểm số tiền dương. Phép cộng ở dòng 36 có thể tràn decimal. Chỉ sau khi các kiểm tra qua mới thêm và lưu.' }
          ]),
          heading('UC05 · Thành lập và gán thành viên hội đồng'),
          points('Mục tiêu, tác nhân và đầu vào. Officer lập hội đồng ở menu 13 với mã hội đồng, mã đề tài Active và ngày nghiệm thu. Menu 14 gán một nhà nghiên cứu với vai Chủ tịch hoặc ủy viên.', 'EvaluationService.CreateCouncil kiểm trạng thái, mã hội đồng và tối đa một hội đồng mỗi đề tài. AssignMember kiểm nhà nghiên cứu tồn tại rồi gọi EvaluationCouncil.AddMember và lưu qua IResultRepository.', 'EvaluationCouncil ngăn trùng người và ngăn Chủ tịch thứ hai. Hội đồng ban đầu có thể chưa có Chủ tịch. Ghi điểm cần đúng người giữ vai Chủ tịch. Điểm đầu tiên, kể cả 0, khóa danh sách hội đồng.'),
          heading('UC06 · Ghi điểm và nghiệm thu'),
          points('Menu 15 nhận mã hội đồng và điểm [0, 10]. EvaluationService kiểm vai CouncilChair và đề tài Active. EvaluationCouncil kiểm mã người đăng vai có đúng là Chủ tịch hội đồng. Chủ tịch có thể sửa điểm khi đề tài còn Active.', 'Menu 16 gọi ProjectService.Complete với ResultCompletionEvidence trên cùng kho JSON. Officer cần đề tài Active, điểm khác null và ít nhất một đầu ra hiện có. ActiveState chuyển Completed và thêm lịch sử trước khi service lưu.', 'Thiếu một bằng chứng thì service dừng trước khi chuyển trạng thái. Điểm 0 vẫn là đã ghi điểm. Sau Completed, code khóa ghi điểm, thêm đầu ra và cấp thêm kinh phí.'),
          excerpt('Điểm nối phía A kiểm hai điều kiện nghiệm thu', 'Business/Services/ProjectService.cs', [42, 51], 'ProjectService.Complete', `    public void Complete(CurrentUserContext user, string projectId, ICompletionEvidence evidence)
    {
        Access.Require(user, UserRole.Officer);
        ArgumentNullException.ThrowIfNull(evidence);
        var project = RequiredProject(projectId);
        if (!evidence.HasScoredCouncil(projectId) || !evidence.HasResearchOutput(projectId))
            throw new InvalidOperationException("Cần điểm nghiệm thu và ít nhất một đầu ra để hoàn thành đề tài.");
        project.Complete("OFFICER", DateTimeOffset.Now);
        projects.Save(project);
    }`, [
            { label: 'Ai cung cấp bằng chứng?', lines: [45, 48], text: 'Code hỏi interface theo mã đề tài. Menu 16 đưa ResultCompletionEvidence truy vấn IResultRepository. A-BRIDGE dùng FakeCompletionEvidence với giá trị test tạo sẵn.' },
            { label: 'Ai đổi trạng thái?', lines: [49, 50], text: 'ResearchProject ủy quyền cho State. Service chỉ lưu nếu thao tác Complete thành công.' }
          ]),
          excerpt('Adapter đọc dữ liệu hội đồng và đầu ra', 'Business/Services/ResultQueries.cs', [23, 27], 'ResultCompletionEvidence', `public sealed class ResultCompletionEvidence(IResultRepository results) : ICompletionEvidence
{
    public bool HasScoredCouncil(string projectId) => results.FindCouncilByProject(projectId)?.Score is not null;
    public bool HasResearchOutput(string projectId) => results.OutputsOf(projectId).Count > 0;
}`, [
            { label: 'Điểm đã ghi và tập đầu ra', lines: [25, 26], text: 'Score khác null bao gồm 0. OutputsOf gom bài báo liên kết và sản phẩm của đề tài. Adapter chuyển dữ liệu B thành hai câu trả lời cho A.' }
          ]),
          heading('UC07 · Ghi nhận đầu ra'),
          points('Researcher có hồ sơ và tham gia đề tài Active được dùng menu 17–18. Khi ghi bài báo, người thao tác còn phải thuộc danh sách tác giả. Mọi tác giả phải có hồ sơ.', 'OutputService truyền PaperDraft hoặc DeliverableDraft vào Creator tương ứng. Hai lớp con ghi đè Create(OutputDraft). Build gọi Create rồi Validate. Bài báo liên kết qua ProjectPaperLink và ghi cùng lượt với SavePaperWithLink. Sản phẩm mang ProjectId.', 'Bài báo cần ít nhất một tác giả, đúng một tác giả liên hệ, thứ tự dương và duy nhất, mã tác giả duy nhất. Service kiểm mã bài, DOI nếu có và loại sản phẩm trong kho. Sản phẩm cần số lượng nguyên dương.'),
          heading('UC08 · Tổng hợp và tra cứu'),
          points('Officer chọn báo cáo ở menu 11, 12, 19 hoặc 20. PrintReport truyền IReportStrategy vào ReportService.Generate để kiểm quyền. Menu 1 vẫn có danh sách đề tài cơ bản cho mọi vai trò.', '11 cộng kinh phí theo đề tài. 12 nhóm khoản cấp theo nguồn. 19 đếm số bản ghi đầu ra theo đề tài. 20 đếm bài báo và cộng Quantity theo loại sản phẩm bằng decimal. PrintReport chỉ in dòng tổng nếu mọi ReportRow dùng cùng đơn vị.', 'Menu 21 dùng ProjectLookupService.Search cho Officer. Có thể lọc mã và trạng thái, hoặc bỏ trống để xem tất cả. Kết quả gồm tổng kinh phí, điểm có thể null và danh sách đầu ra. Nếu không có kết quả, menu in thông báo tương ứng.'),
          links(['Thử cập nhật đơn vị', '#simulation/uc01'], ['Thử phê duyệt và hoàn thành theo State', '#simulation/state'], ['Thử đổi tiêu chí báo cáo', '#simulation/strategy'])
        ],
        defense: [
          heading('Tự luyện mỗi UC một câu'),
          table(['Use Case', 'Câu phản biện', 'Ý cần trả lời'], [
            ['UC01', 'Vì sao đổi tên đơn vị không đổi ngày thành lập?', 'SaveDepartment tìm đối tượng hiện có rồi Rename. createdAt thuộc dữ liệu khởi tạo, không được gán lại ở nhánh cập nhật.'],
            ['UC02', 'Trim mã diễn ra trước hay sau kiểm trùng?', 'Trước. Dùng normalizedId nhất quán cho FindProject và constructor. Kho dùng khóa không phân biệt hoa thường.'],
            ['UC03', 'Khác nhau giữa tối đa một và đúng một Leader?', 'AddMember có thể cho đề tài tạm thời 0 Leader. Khi Approve, PendingState cần đúng một Leader.'],
            ['UC04', 'A004 của P003 có dùng lại được cho P004 không?', 'Service kiểm mã đợt trên toàn bộ đề tài. Cùng nguồn cấp nhiều lần được nếu mã đợt khác và mỗi đợt hợp lệ.'],
            ['UC05', 'Vì sao giới hạn một hội đồng theo đề tài?', 'Hợp đồng nghiệm thu tra bằng mã đề tài, nên quan hệ tối đa một hội đồng làm rõ hội đồng nào cung cấp điểm. CreateCouncil kiểm trùng mã và tra hội đồng theo đề tài.'],
            ['UC06', 'Có điểm nhưng chưa có đầu ra thì sao?', 'Complete từ chối trước khi gọi State. Vì chưa đổi trạng thái nên không thêm mốc lịch sử hoàn thành.'],
            ['UC07', 'Factory Method đảm nhiệm phần nào?', 'Creator chọn kiểu cụ thể bằng override Create. Build gọi Validate chung. Service kiểm tư cách tham gia và điều kiện cần truy vấn như DOI duy nhất.'],
            ['UC08', 'Hai báo cáo đầu ra trả về số gì?', 'Theo đề tài đếm bản ghi liên kết và sản phẩm. Theo loại đếm bài báo, rồi cộng Quantity theo từng loại sản phẩm.']
          ])
        ]
      },
      quiz: [
        quiz('SaveDepartment gặp mã “ d01 ” với D01 đã có. Ngày thành lập có đổi không?', ['Có, theo ngày nhập ở lần cập nhật', 'Không, nhánh cập nhật chỉ Rename', 'Có, về ngày hôm nay'], 1, 'Theo đối tượng trả về bởi FindDepartment.', 'Mã đã trim tra được bản ghi D01. Department đã có được đổi tên và vẫn giữ CreatedAt.'),
        quiz('Ngày kết thúc đề xuất trùng ngày bắt đầu. Quy tắc nào áp dụng?', ['Hợp lệ, chỉ cấm kết thúc trước thời điểm bắt đầu', 'Luôn từ chối', 'Chỉ chấp nhận nếu có hội đồng'], 0, 'Đặc tả cho phép ngày cuối từ ngày đầu trở đi.', 'Guard.DateRange kiểm end < start khi có ngày kết thúc. Bằng ngày vẫn hợp lệ.'),
        quiz('Lần gán thứ hai dùng r001 sau khi R001 đã tham gia. Điều gì xảy ra?', ['Thành viên thứ hai được thêm', 'Đổi vai trò người cũ', 'AddMember từ chối vì cùng mã'], 2, 'Nhìn phép so sánh mã người.', 'ResearchProject.AddMember so mã không phân biệt hoa thường và chặn mỗi người tham gia trùng.'),
        quiz('Thêm 1m khi tổng các khoản hợp lệ đã là decimal.MaxValue. Code làm gì?', ['Lưu rồi in một số âm', 'Từ chối trước AddAllocation', 'Lưu nếu khoản mới sang đề tài khác'], 1, 'Tổng được cộng trên tất cả đề tài.', 'Thử phép cộng trong FundingService trước khi thêm. OverflowException được chuyển thành lỗi nghiệp vụ.'),
        quiz('Ở UC05, đề tài nào đủ điều kiện lập hội đồng?', ['Pending chưa có Leader', 'Completed đã chấm', 'Active và chưa có hội đồng'], 2, 'Nghiệm thu được chuẩn bị sau duyệt.', 'EvaluationService yêu cầu đề tài Active và mỗi đề tài tối đa một hội đồng.'),
        quiz('Điểm hội đồng bằng 0 và có đầu ra. Điểm 0 bị loại chỉ vì giá trị này không?', ['Không, 0 nằm trong khoảng [0, 10]', 'Có, phải lớn hơn 0 như phân bổ kinh phí', 'Có, Complete luôn đòi điểm 10'], 0, 'Xem ResultCompletionEvidence kiểm Score khác null.', 'Điểm 0 hợp lệ và khóa danh sách hội đồng như các điểm khác. Adapter coi 0 là có điểm. Complete vẫn kiểm Officer, đầu ra và trạng thái.'),
        quiz('Một bài báo có hai tác giả liên hệ có hợp lệ theo UC07?', ['Có, nếu DOI trống', 'Không, model yêu cầu đúng một tác giả liên hệ', 'Có, nếu hai tác giả thuộc hai đơn vị'], 1, 'Xem điều kiện của danh sách tác giả.', 'Cần đúng một tác giả liên hệ và thứ tự tác giả không trùng, độc lập với DOI.'),
        quiz('Trong báo cáo theo nguồn, nguồn chưa có khoản cấp xuất hiện thế nào?', ['Luôn hiện một dòng 0', 'Có một dòng với tên đề tài', 'Không có nhóm để tạo dòng'], 2, 'Strategy nhóm các khoản cấp, không nhóm toàn bộ danh mục nguồn.', 'FundingBySourceStrategy duyệt Allocations, nhóm SourceId rồi sinh mỗi nhóm có phát sinh một ReportRow.')
      ]
    },
    testing: {
      minutes: 23,
      intro: 'Đọc test theo Chuẩn bị → Thao tác → Đối chiếu, rồi nói chính xác mỗi bằng chứng xác nhận điều gì.',
      goals: ['Phân biệt ca hợp lệ, ca sai, ca biên và hồi quy.', 'Theo vết A-T07, A-FUND-COMPLETED, A-BRIDGE và B-T20.', 'Phân biệt kiểm Business, ca liên thông trong bộ nhớ và demo đọc lại JSON.'],
      related: ['architecture', 'use-cases', 'organization', 'defense'],
      tabs: {
        theory: [
          heading('Một kết quả, một phạm vi kiểm chứng'),
          table(['Bằng chứng', 'Xác nhận', 'Cần thêm để mở rộng kết luận'], [
            ['Build thành công', 'Mã biên dịch trên bộ công cụ đã dùng.', 'Chạy test mới biết các điều kiện được kiểm có cho kết quả mong đợi.'],
            ['Test nghiệp vụ với kho bộ nhớ', 'Quy tắc và thay đổi model trong dữ liệu do test kiểm soát.', 'Kiểm ghi tệp cần kho JSON, tệp tạm và đọc lại.'],
            ['Tích hợp trong bộ nhớ', 'B-T20 dùng service và adapter thật với dữ liệu do test tạo.', 'Chạy qua console và nạp lại tệp để kiểm đường nhập liệu và lưu trữ.'],
            ['Demo trên bản sao', 'Chuỗi lệnh, nhập liệu, hiển thị, dữ liệu đã lưu và nạp lại trong kịch bản đã thử.', 'Thử thêm các đầu vào hoặc tình huống lỗi chưa bao phủ.'],
            ['Kiểm tra web offline', 'Lộ trình, quiz, mô phỏng và tiến độ của trang học.', 'Đánh giá C# dựa trên test hoặc chạy C# riêng.']
          ]),
          heading('Phân loại test để chọn dữ liệu'),
          points('Positive kiểm kết quả đúng với dữ liệu hợp lệ. Ví dụ A-T07 thử chuyển Pending sang Active và đếm lịch sử.', 'Negative kiểm dữ liệu sai bị từ chối. Ví dụ A-T05 thử duyệt thiếu chủ nhiệm. Kiểm kiểu ngoại lệ và trạng thái sau lời gọi nếu quy tắc yêu cầu giữ nguyên.', 'Boundary dùng dữ liệu sát giới hạn. Ví dụ A-REVIEW-FUND-RANGE chấp nhận decimal.MaxValue khi tổng trước đó bằng 0, rồi từ chối khoản 1m làm tràn.', 'Regression giữ ca từng phát hiện lỗi. Ví dụ A-ID-FUND-CROSS dùng mã có khoảng trắng trùng ở đề tài khác, xác nhận khoản đầu và cả hai tổng không đổi.', 'Integration chủ động kiểm các thành phần phối hợp. Để kiểm lưu JSON cần đối chiếu cả đối tượng, snapshot sau ghi và nội dung sau mở lại. Dùng bản sao tệp và ngoài thư mục dữ liệu đang làm việc.'),
          note('Kho bộ nhớ và test harness', 'Mỗi lần gọi Setup tạo kho trong bộ nhớ và hồ sơ mẫu riêng. Program gọi ATests.Run và BTests.Run, in kết quả từng ca và trả mã thoát lỗi khi có ca thất bại. Các ca kiểm không cần thư viện kiểm thử ngoài.')
        ],
        example: [
          code('C# minh họa độc lập · kiểm ngoại lệ rồi kiểm dữ liệu giữ nguyên', `using System;

decimal total = 400_000m;
bool rejected = false;
try { Add(-1m); }
catch (ArgumentOutOfRangeException) { rejected = true; }

if (!rejected || total != 400_000m) throw new InvalidOperationException("Sai quy tắc");
Console.WriteLine("PASS: từ chối số âm và giữ tổng");

void Add(decimal amount)
{
    if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
    total += amount;
}`, 'PASS: từ chối số âm và giữ tổng'),
          paragraph('Chuẩn bị total, gọi Add và kiểm hai điều độc lập. Nếu code chỉ bỏ qua số âm mà không báo sai, rejected vẫn false nên test thất bại. Nếu code sửa total rồi mới ném lỗi, điều kiện kiểm total bắt được thay đổi.')
        ],
        project: [
          explorer('Đọc ca kiểm thử hiện hành', 'Số dòng trỏ tới Program.cs hoặc BTests.cs trong QLNCKH_OOP_FINAL.Tests.', [
            ['A-T01 · Email trùng', 'Chuẩn bị hồ sơ → lưu email trùng khác hoa thường → kiểm lỗi', 'Setup đã có R001. DuplicateEmail thử lưu một mã khác với email tương đương. Kỳ vọng InvalidOperationException. Đọc Program.cs:94–99.'],
            ['A-T05 · Thiếu chủ nhiệm', 'Tạo Pending → Approve → InvalidOperationException', 'Setup có Officer, R001 và loại C01. Test tạo đề tài và cố duyệt mà chưa gán Leader. Riêng ca ngắn này chỉ kiểm ngoại lệ. Đọc Program.cs:120–125.'],
            ['A-T07 · Duyệt thành công', 'Tạo Pending → gán Leader R001 → Approve → kiểm trạng thái và history', 'Kỳ vọng Active, lịch sử đúng một mục FromStatus Pending và ToStatus Active. Đọc Program.cs:135–144.'],
            ['A-T10 và A-SOURCE · Cộng kinh phí', 'Cấp nhiều đợt → đọc tổng và ReportRow', 'A-T10 cấp 250.000 rồi 150.000 cho cùng đề tài và kiểm 400.000. A-SOURCE trông đợi F01 400.000 từ 2 đợt, F02 80.000. Đọc Program.cs:163–172,236–254.'],
            ['A-FUND-COMPLETED · Khóa kinh phí', 'Cấp 100m khi Pending → duyệt → cấp 50m khi Active → nghiệm thu → thử thêm 25m', 'Sau Completed, lần cấp thứ ba ném lỗi. Test kiểm vẫn đúng hai đợt và tổng 150m. Đọc Program.cs:174–191.'],
            ['A-BRIDGE · Bằng chứng giả lập', 'Tạo Active → thử thiếu một bằng chứng, sai quyền, đủ bằng chứng và làm lại', 'FakeCompletionEvidence trả hai giá trị do test đặt trước. Thiếu một điều kiện thì vẫn Active. Officer đủ bằng chứng chuyển Completed, lịch sử có hai mốc. Đọc Program.cs:209–234.'],
            ['A-ID-FUND-CROSS · Mã đợt trùng khác đề tài', 'Lưu A004 vào P003 → thử “ A004 ” với P004 → kiểm từ chối và tổng', 'Test xác nhận P003 vẫn giữ đúng khoản 250.000 ban đầu và P004 không có khoản. Đọc Program.cs:38–40,307–331.'],
            ['A-REVIEW-FUND-RANGE · Biên decimal', 'Cấp decimal.MaxValue → thử thêm 1m cùng hoặc khác đề tài', 'Khoản 1m bị từ chối ở cả hai vị trí. Test kiểm tổng và danh sách vẫn giữ. Đọc Program.cs:400–427.'],
            ['A-REVIEW-STATE · Gọi sai State', 'Gọi trực tiếp ActiveState trên Pending → duyệt hợp lệ → gọi PendingState trên Active', 'Lời gọi sai không thay trạng thái hoặc lịch sử. Duyệt hợp lệ vẫn ghi đúng một mốc. Đọc Program.cs:430–449.'],
            ['B-ROSTER-LOCK · Điểm 0 khóa hội đồng', 'Lập hội đồng → ghi 0 → thử thêm thành viên', 'Điểm 0 hợp lệ và khóa danh sách. Test kiểm người thêm bị từ chối và danh sách cũ giữ nguyên. Đọc BTests.cs:156–164.'],
            ['B-T20 · Liên thông qua adapter thật', 'Cấp kinh phí → lập hội đồng → ghi điểm và đầu ra → hoàn thành → báo cáo', 'Dùng ResultCompletionEvidence trên kho bộ nhớ. Test kiểm Completed, tổng 400.000, hai bản ghi đầu ra có tên, và chặn ghi sản phẩm hoặc chỉnh điểm sau hoàn thành. Đọc BTests.cs:264–289.']
          ]),
          excerpt('Ca A-T07 kiểm trạng thái và lịch sử', 'QLNCKH_OOP_FINAL.Tests/Program.cs', [135, 144], 'ATests.ValidApproval', `    private static void ValidApproval()
    {
        var x = Setup();
        var project = NewProject(x.Projects);
        x.Projects.AssignMember(Officer, "P001", "R001", ProjectRole.Leader);
        x.Projects.Approve(Officer, "P001");
        Check(project.Status == ProjectStatus.Active, "Đề tài chưa chuyển sang Active.");
        Check(project.History.Count == 1 && project.History[0].FromStatus == ProjectStatus.Pending &&
              project.History[0].ToStatus == ProjectStatus.Active, "Lịch sử trạng thái không đúng.");
    }`, [
            { label: 'Chuẩn bị và thao tác', lines: [137, 140], text: 'Setup cô lập dữ liệu. Đề tài có một Leader trước khi yêu cầu phê duyệt.' },
            { label: 'Trạng thái và lịch sử', lines: [141, 143], text: 'Đối chiếu cả trạng thái mới và đúng một bước chuyển Pending sang Active. Đây là kiểm Business với kho bộ nhớ.' }
          ]),
          note('Số liệu ngày 25/11/2026', 'Harness biên dịch bằng Roslyn với tham chiếu .NET 8.0.34 và chạy trên bản sao đạt A 27/27, B 24/24, mã thoát 0. Ca console riêng trên seed sao chép đưa P003 tới Completed, giữ 250.000.000 đồng và đọc lại hội đồng, bài báo, sản phẩm, báo cáo và tra cứu khi mở lại. Xem bằng chứng trong TEST_REPORT_FINAL.md.'),
          note('Giới hạn khi trình bày', 'Demo dùng bản sao seed với một chuỗi đầu vào xác định. SaveResearcher ở menu giữ các trường tùy chọn cũ. Caller trực tiếp cần truyền lại các giá trị muốn giữ.'),
          links(['Chuẩn bị kịch bản kiểm tra trên bản sao', '#lesson/presentation'], ['Quay lại đường lỗi trong Code Flow Explorer', '#lesson/architecture'])
        ],
        defense: [
          heading('Em chứng minh quy tắc duyệt bằng gì?'),
          paragraph('Em dùng A-T05 để cho thấy đề tài thiếu chủ nhiệm bị từ chối, A-T06 cho trường hợp gán chủ nhiệm thứ hai và A-T07 cho luồng thành công. A-T07 còn kiểm history vì một lần duyệt phải vừa chuyển Active vừa tạo vết chuyển trạng thái.'),
          heading('Ba mức bằng chứng của luồng nghiệm thu'),
          paragraph('Ca A-BRIDGE kiểm service bằng hai giá trị cho sẵn. B-T20 lập hội đồng, ghi điểm, ghi đầu ra và hoàn thành qua adapter thật trong kho bộ nhớ. Demo trên bản sao dùng menu và mở lại JSON để đối chiếu dữ liệu đã lưu.'),
          heading('Vì sao kiểm cả tràn số trên đề tài khác?'),
          paragraph('Báo cáo còn tính tổng toàn hệ thống. Một đề tài có tổng riêng nhỏ vẫn có thể làm tổng chung vượt biên khi cộng vào dữ liệu đề tài khác. Test kiểm cả hai để bắt lỗi dùng nhầm tổng đơn lẻ.'),
          points('Khi trình bày kết quả, nói rõ phiên bản, lệnh, dữ liệu, kết quả quan sát và giới hạn của ca.', 'Dùng ca biên cho số 0, ngày bằng nhau và decimal.MaxValue. Chọn mỗi ca dựa vào điều kiện thực tế của quy tắc.')
        ]
      },
      quiz: [
        quiz('A-T07 kiểm thêm điều gì ngoài trạng thái Active?', ['Tệp JSON được đổi tên', 'Đúng một mốc lịch sử Pending → Active', 'Đề tài có điểm hội đồng'], 1, 'Đọc các lệnh Check sau Approve.', 'Ca đối chiếu Status và History. Kho đang dùng ở Setup là InMemoryResearchRepository.'),
        quiz('Mỗi ca gọi Setup để làm gì?', ['Tạo kho mới, cô lập dữ liệu từng ca', 'Đọc file runtime của người dùng', 'Ghi kết quả test lên web'], 0, 'Tìm new InMemoryResearchRepository.', 'Dữ liệu theo ca giúp kết quả độc lập với thứ tự chạy và không thay đổi tệp làm việc.'),
        quiz('Test số tiền 0 ở A-T09 thuộc kiểu nào?', ['Kiểm chỉ hiển thị', 'Kiểm dữ liệu hợp lệ', 'Kiểm dữ liệu sai tại biên'], 2, 'Khoản cấp yêu cầu số tiền lớn hơn 0.', '0 nằm ngay ngoài miền hợp lệ và phải ném ArgumentOutOfRangeException khi gọi trực tiếp service.'),
        quiz('A-REVIEW-FUND-RANGE dùng hai đề tài để bắt lỗi gì?', ['Chọn sai ngày tháng', 'Chỉ kiểm tổng từng đề tài mà bỏ tổng toàn hệ thống', 'Chọn nhầm loại nghiên cứu'], 1, 'Khoản 1m ở P002 vẫn đổi tổng chung.', 'Cả hai đường thêm khoản cùng đề tài và khác đề tài đều phải bị từ chối khi tổng decimal đã tới biên.'),
        quiz('Muốn kiểm lưu JSON qua phiên, phép thử phù hợp là gì?', ['Cấp tiền trên bản sao, đóng và mở lại rồi đối chiếu', 'Đổi màu giao diện web', 'Chỉ xem báo cáo sau khi cấp trong cùng tiến trình'], 0, 'Phải buộc chương trình đọc lại từ đĩa.', 'Bản sao giúp kiểm ghi và nạp dữ liệu mà không ảnh hưởng hồ sơ đang làm việc.'),
        quiz('Điều gì xác định việc chạy harness thành công?', ['Cửa sổ mở được', 'Lệnh build không có cảnh báo', 'Kết quả từng ca và mã thoát của harness'], 2, 'Đọc ATests.Run cuối vòng lặp.', 'Harness in số ca đạt và đặt mã thoát 1 nếu có ca lỗi. Build kiểm một tầng khác.'),
        quiz('A-REVIEW-STATE gọi ActiveState.Complete với đề tài Pending để thử gì?', ['Gọi trực tiếp State sai thì model có giữ nguyên không', 'JSON có trùng nguồn không', 'Researcher có thể gán người không'], 0, 'State được public và có thể nhận lời gọi không qua StateFor.', 'Ca kiểm lớp State bảo vệ trạng thái đang có. Lời gọi sai cần ném lỗi và giữ Status, History.')
      ]
    }
  });
}());
