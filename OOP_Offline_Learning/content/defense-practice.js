(function () {
  'use strict';

  const citation = (relativePath, symbol, start, end) =>
    ({ path: 'QLNCKH_OOP_FINAL/' + relativePath, symbol, lines: [start, end] });
  const references = {
    participation: citation("Business/Models/Projects.cs", "ProjectParticipation", 17, 30),
    projectHistory: citation("Business/Models/Projects.cs", "ProjectStatusHistory", 33, 35),
    projectFields: citation("Business/Models/Projects.cs", "ResearchProject", 38, 55),
    projectInit: citation("Business/Models/Projects.cs", "ResearchProject.ResearchProject", 38, 65),
    addMember: citation("Business/Models/Projects.cs", "ResearchProject.AddMember", 68, 77),
    dispatchApprove: citation("Business/Models/Projects.cs", "ResearchProject.Approve", 79, 80),
    changeStatus: citation("Business/Models/Projects.cs", "ResearchProject.ChangeStatus", 83, 87),
    addAllocation: citation("Business/Models/Projects.cs", "ResearchProject.AddAllocation", 90, 98),
    projectRestore: citation("Business/Models/Projects.cs", "ResearchProject.Restore", 101, 132),
    stateFor: citation("Business/Models/Projects.cs", "ResearchProject.StateFor", 135, 141),
    department: citation("Business/Models/People.cs", "Department", 4, 19),
    guard: citation("Business/Models/Common.cs", "Guard", 4, 12),
    roleEnums: citation("Business/Models/Common.cs", "UserRole, ProjectRole và CurrentUserContext", 14, 20),
    stateInterface: citation("Business/Models/ProjectStates.cs", "IProjectState", 3, 7),
    pendingState: citation("Business/Models/ProjectStates.cs", "PendingState.Approve", 11, 19),
    activeState: citation("Business/Models/ProjectStates.cs", "ActiveState.Complete", 30, 35),
    allocationModel: citation("Business/Models/Funding.cs", "FundingAllocation", 19, 36),
    projectPropose: citation("Business/Services/ProjectService.cs", "ProjectService.ProposeProject", 5, 22),
    assignMember: citation("Business/Services/ProjectService.cs", "ProjectService.AssignMember", 24, 32),
    approve: citation("Business/Services/ProjectService.cs", "ProjectService.Approve", 34, 40),
    complete: citation("Business/Services/ProjectService.cs", "ProjectService.Complete", 42, 51),
    requiredProject: citation("Business/Services/ProjectService.cs", "ProjectService.RequiredProject", 53, 54),
    departmentSave: citation("Business/Services/PeopleService.cs", "PeopleService.SaveDepartment", 8, 17),
    researcherSave: citation("Business/Services/PeopleService.cs", "PeopleService.SaveResearcher", 19, 39),
    fundingSource: citation("Business/Services/FundingService.cs", "FundingService.SaveSource", 6, 16),
    fundingAllocation: citation("Business/Services/FundingService.cs", "FundingService.Allocate", 18, 46),
    strategyProject: citation("Business/Services/FundingByProjectStrategy.cs", "FundingByProjectStrategy.BuildRows", 9, 12),
    strategySource: citation("Business/Services/FundingBySourceStrategy.cs", "FundingBySourceStrategy.BuildRows", 9, 21),
    generate: citation("Business/Services/ReportService.cs", "ReportService.Generate", 10, 17),
    access: citation("Business/Services/Access.cs", "Access.Require", 8, 13),
    repositories: citation("Business/Interfaces/Repositories.cs", "IPeopleRepository và IProjectRepository", 6, 25),
    reportContract: citation("Business/Interfaces/IReportStrategy.cs", "IReportStrategy và ReportRow", 2, 9),
    repoMemory: citation("Data/InMemoryResearchRepository.cs", "InMemoryResearchRepository", 7, 38),
    jsonInitialization: citation("Data/JsonResearchRepository.cs", "JsonResearchRepository.JsonResearchRepository", 20, 47),
    repoInheritance: citation("Data/JsonResearchRepository.cs", "JsonResearchRepository", 8, 12),
    repoOverrides: citation("Data/JsonResearchRepository.cs", "JsonResearchRepository.Save", 49, 79),
    persist: citation("Data/JsonResearchRepository.cs", "JsonResearchRepository.Persist", 225, 254),
    snapshotExtensions: citation("Data/JsonResearchRepository.cs", "JsonResearchRepository.AppSnapshot", 263, 278),
    projectDto: citation("Data/JsonResearchRepository.cs", "JsonResearchRepository.ProjectData", 281, 306),
    composition: citation("Presentation/ConsoleMenu.cs", "ConsoleMenu.ConsoleMenu", 12, 30),
    menuErrors: citation("Presentation/ConsoleMenu.cs", "ConsoleMenu.Run", 33, 60),
    menuProjectList: citation("Presentation/ConsoleMenu.cs", "ConsoleMenu.Dispatch (menu 1)", 101, 111),
    menuReport: citation("Presentation/ConsoleMenu.cs", "ConsoleMenu.Dispatch (menu 11/12)", 217, 225),
    positiveInput: citation("Presentation/ConsoleMenu.cs", "ConsoleMenu.ReadFundingAmount", 344, 355),
    optionalDate: citation("Presentation/ConsoleMenu.cs", "ConsoleMenu.ReadOptionalDate", 376, 380),
    testRunner: citation("QLNCKH_OOP_FINAL.Tests/Program.cs", "ATests.Run", 1, 66),
    testSetup: citation("QLNCKH_OOP_FINAL.Tests/Program.cs", "ATests.Setup", 68, 77),
    testApproval: citation("QLNCKH_OOP_FINAL.Tests/Program.cs", "ATests.MissingLeader và ValidApproval", 120, 144),
    testAuth: citation("QLNCKH_OOP_FINAL.Tests/Program.cs", "ATests.ServiceAuthorization", 193, 207),
    testBridge: citation("QLNCKH_OOP_FINAL.Tests/Program.cs", "ATests.CompletionBridge", 209, 234),
    testOverflow: citation("QLNCKH_OOP_FINAL.Tests/Program.cs", "ATests.RejectFundingOverflow", 400, 428),
    testDirectState: citation("QLNCKH_OOP_FINAL.Tests/Program.cs", "ATests.RejectMismatchedState", 430, 449),
    council: citation("Business/Services/EvaluationService.cs", "EvaluationService.CreateCouncil và AssignMember", 10, 35),
    score: citation("Business/Models/evaluation.cs", "EvaluationCouncil.AddMember và RecordScore", 42, 64),
    outputService: citation("Business/Services/OutputService.cs", "OutputService.AddPaper và RequireParticipatedActiveProject", 12, 64),
    outputReport: citation("Presentation/ConsoleMenu.cs", "ConsoleMenu.Dispatch (menu 19–21)", 287, 310),
    completionAdapter: citation("Business/Services/ResultQueries.cs", "ResultCompletionEvidence", 23, 27),
    paperRelationship: citation("Business/Models/outputs.cs", "Paper.Validate và ProjectPaperLink", 112, 151),
    factory: citation("Business/Services/ResearchOutputCreators.cs", "ResearchOutputCreator.Build và Create", 15, 49),
  };
  const codePrompts = {
    projectPropose: {
      type: 'code', title: "ProjectService.ProposeProject", source: references.projectPropose,
      code: "public sealed class ProjectService(IPeopleRepository people, IProjectRepository projects)\n{\n    public ResearchProject ProposeProject(CurrentUserContext user, string id, string categoryId,\n        string title, DateOnly startDate, DateOnly? endDate)\n    {\n        Access.Require(user, UserRole.Researcher);\n        if (string.IsNullOrWhiteSpace(user.ResearcherId) || people.FindResearcher(user.ResearcherId) is null)\n            throw new UnauthorizedAccessException(\"Hồ sơ nhà nghiên cứu không tồn tại.\");\n        if (projects.FindCategory(categoryId) is null)\n            throw new InvalidOperationException(\"Loại đề tài không tồn tại.\");\n        // Dùng cùng mã đã chuẩn hóa để tra trùng và tạo đề tài.\n        var normalizedId = Guard.Required(id, nameof(id));\n        if (projects.FindProject(normalizedId) is not null)\n            throw new InvalidOperationException(\"Mã đề tài đã tồn tại.\");\n        var project = new ResearchProject(normalizedId, categoryId, title, startDate, endDate);\n        projects.Save(project);\n        return project;\n    }"
    },
    addMember: {
      type: 'code', title: "ResearchProject.AddMember", source: references.addMember,
      code: "    public void AddMember(string researcherId, ProjectRole role)\n    {\n        researcherId = Guard.Required(researcherId, nameof(researcherId));\n        if (Status != ProjectStatus.Pending) throw new InvalidOperationException(\"Chỉ sửa thành viên khi đề tài đang chờ duyệt.\");\n        if (_members.Any(m => m.ResearcherId.Equals(researcherId, StringComparison.OrdinalIgnoreCase)))\n            throw new InvalidOperationException(\"Nhà nghiên cứu đã có trong đề tài.\");\n        if (role == ProjectRole.Leader && _members.Any(m => m.Role == ProjectRole.Leader))\n            throw new InvalidOperationException(\"Đề tài đã có chủ nhiệm.\");\n        _members.Add(new ProjectParticipation(Id, researcherId, role));\n    }"
    },
    pendingState: {
      type: 'code', title: "PendingState.Approve", source: references.pendingState,
      code: "    public void Approve(ResearchProject project, string actorId, DateTimeOffset at)\n    {\n        // State là public, nên lời gọi trực tiếp cũng phải khớp trạng thái hiện tại.\n        if (project.Status != ProjectStatus.Pending)\n            throw new InvalidOperationException(\"Chỉ đề tài đang chờ duyệt mới được phê duyệt.\");\n        if (project.Members.Count(m => m.Role == ProjectRole.Leader) != 1)\n            throw new InvalidOperationException(\"Đề tài cần đúng một chủ nhiệm trước khi duyệt.\");\n        project.ChangeStatus(ProjectStatus.Active, actorId, at);\n    }"
    },
    fundingAllocation: {
      type: 'code', title: "FundingService.Allocate", source: references.fundingAllocation,
      code: "    public FundingAllocation Allocate(CurrentUserContext user, string id, string projectId,\n        string sourceId, decimal amount, DateOnly allocatedAt)\n    {\n        Access.Require(user, UserRole.Officer);\n        var project = projects.FindProject(projectId) ?? throw new InvalidOperationException(\"Đề tài không tồn tại.\");\n        // Sau khi nghiệm thu, giữ nguyên các khoản đã cấp cho đề tài.\n        if (project.Status == ProjectStatus.Completed)\n            throw new InvalidOperationException(\"Không thể phân bổ thêm kinh phí cho đề tài đã hoàn thành.\");\n\n        var source = projects.FindSource(sourceId) ?? throw new InvalidOperationException(\"Nguồn kinh phí không tồn tại.\");\n        // Mã đợt cấp phải duy nhất trên toàn bộ đề tài.\n        var normalizedId = Guard.Required(id, nameof(id));\n        if (projects.Projects.SelectMany(p => p.Allocations).Any(a => a.Id.Equals(normalizedId, StringComparison.OrdinalIgnoreCase)))\n            throw new InvalidOperationException(\"Mã phân bổ đã tồn tại.\");\n        var allocation = new FundingAllocation(normalizedId, project.Id, source.Id, amount, allocatedAt);\n        // Báo cáo cộng chung tất cả đề tài, nên kiểm tra tổng trước khi thay đổi hồ sơ.\n        try\n        {\n            _ = projects.Projects.Sum(item => item.TotalFunding) + allocation.Amount;\n        }\n        catch (OverflowException ex)\n        {\n            throw new InvalidOperationException(\"Khoản cấp làm tổng kinh phí vượt phạm vi decimal.\", ex);\n        }\n\n        project.AddAllocation(allocation);\n        projects.Save(project);\n        return allocation;\n    }"
    },
    strategySource: {
      type: 'code', title: "FundingBySourceStrategy.BuildRows", source: references.strategySource,
      code: "    // Nguồn chưa cấp kinh phí không xuất hiện trong báo cáo.\n    public IReadOnlyList<ReportRow> BuildRows() => projects.Projects\n        .SelectMany(project => project.Allocations)\n        .GroupBy(allocation => allocation.SourceId, StringComparer.OrdinalIgnoreCase)\n        .OrderBy(group => group.Key, StringComparer.OrdinalIgnoreCase)\n        .Select(group =>\n        {\n            var source = projects.FindSource(group.Key)\n                ?? throw new InvalidDataException($\"Nguồn kinh phí {group.Key} không tồn tại.\");\n            return new ReportRow(source.Id, source.Name, group.Sum(item => item.Amount), \"đ\",\n                $\"{group.Count()} đợt cấp\");\n        })\n        .ToList();"
    },
    complete: {
      type: 'code', title: "ProjectService.Complete", source: references.complete,
      code: "    public void Complete(CurrentUserContext user, string projectId, ICompletionEvidence evidence)\n    {\n        Access.Require(user, UserRole.Officer);\n        ArgumentNullException.ThrowIfNull(evidence);\n        var project = RequiredProject(projectId);\n        if (!evidence.HasScoredCouncil(projectId) || !evidence.HasResearchOutput(projectId))\n            throw new InvalidOperationException(\"Cần điểm nghiệm thu và ít nhất một đầu ra để hoàn thành đề tài.\");\n        project.Complete(\"OFFICER\", DateTimeOffset.Now);\n        projects.Save(project);\n    }"
    },
    projectRestore: {
      type: 'code', title: "ResearchProject.Restore", source: references.projectRestore,
      code: "    internal static ResearchProject Restore(string id, string categoryId, string title,\n        DateOnly startDate, DateOnly? endDate, ProjectStatus status,\n        IEnumerable<ProjectParticipation> members, IEnumerable<FundingAllocation> allocations,\n        IEnumerable<ProjectStatusHistory> history)\n    {\n        var project = new ResearchProject(id, categoryId, title, startDate, endDate);\n        foreach (var member in members)\n        {\n            if (!member.ProjectId.Equals(id, StringComparison.OrdinalIgnoreCase))\n                throw new InvalidDataException(\"Thành viên tham chiếu sai đề tài.\");\n            project.AddMember(member.ResearcherId, member.Role);\n        }\n        foreach (var allocation in allocations) project.AddAllocation(allocation);\n\n        var previous = ProjectStatus.Pending;\n        foreach (var change in history)\n        {\n            if (!change.ProjectId.Equals(id, StringComparison.OrdinalIgnoreCase) ||\n                change.FromStatus != previous ||\n                (previous == ProjectStatus.Pending && change.ToStatus != ProjectStatus.Active) ||\n                (previous == ProjectStatus.Active && change.ToStatus != ProjectStatus.Completed) ||\n                previous == ProjectStatus.Completed || string.IsNullOrWhiteSpace(change.ActorId))\n                throw new InvalidDataException(\"Lịch sử trạng thái đề tài không hợp lệ.\");\n            project._history.Add(change);\n            previous = change.ToStatus;\n        }\n        if (status != previous ||\n            (status != ProjectStatus.Pending && project._members.Count(m => m.Role == ProjectRole.Leader) != 1))\n            throw new InvalidDataException(\"Trạng thái đề tài không khớp lịch sử hoặc chủ nhiệm.\");\n        project.Status = status;\n        return project;\n    }"
    },
  };

  const legacyMetadata = {
    "why-oop": { pitfalls: ["Liệt kê bốn đặc trưng mà thiếu một đường gọi thực tế."], evidence: [references.addMember, references.assignMember], part: 'A' },
    "cs-normalized": { pitfalls: ["Cho rằng Trim đồng thời đổi thành chữ hoa."], evidence: [references.projectPropose, references.repoMemory], part: 'A' },
    "interface-abstract": { pitfalls: ["Cho rằng interface không thể có cài đặt mặc định trong C# hiện đại."], evidence: [references.repositories, references.repoInheritance] },
    "state-vs-strategy": { pitfalls: ["Dùng cùng một tiêu chí lựa chọn để giải thích cả State và Strategy."], evidence: [references.dispatchApprove, references.stateFor, references.strategyProject, references.strategySource] },
    "service-json": { pitfalls: ["Vẽ phụ thuộc trực tiếp từ ProjectService sang JsonResearchRepository."], evidence: [references.composition, references.repositories, references.repoOverrides] },
    "approve-conditions": { pitfalls: ["Chỉ kiểm số Leader mà quên quyền Officer và trạng thái Pending."], evidence: [references.approve, references.pendingState, references.changeStatus], part: 'A' },
    "ab-boundary": { pitfalls: ["Dùng riêng A-BRIDGE để kết luận đã thử luồng tích hợp."], evidence: [references.complete, references.testBridge, references.completionAdapter] },
    "json-failure": { pitfalls: ["Suy từ cơ chế hoàn tác riêng của SavePaperWithLink rằng mọi Save đều có hoàn tác."], evidence: [references.repoOverrides, references.persist, references.menuErrors] },
  };
  for (const question of window.OOPPractice.questions) {
    Object.assign(question, legacyMetadata[question.id]);
  }

  window.OOPPractice.questions.push(
    {
      id: "oop-live-model", topic: "Nền tảng OOP", difficulty: "Dễ",
      question: "Hai đề tài có dùng chung danh sách thành viên vì cùng thuộc ResearchProject không?",
      short: "Mỗi đối tượng ResearchProject có danh sách thành viên và lịch sử riêng.",
      explanation: "Các field _members và _history là field của từng instance. Việc thêm người vào P001 chỉ tác động object P001. Khi hai biến cùng giữ P001 thì chúng quan sát cùng object thay đổi.",
      points: ["Field instance","phân biệt lớp và object","phân biệt alias"],
      pitfalls: ["Tưởng mọi thể hiện dùng chung danh sách."],
      followUp: "Khi nào hai biến khác tên lại thấy cùng thay đổi?",
      evidence: [references.projectFields]
    },
    {
      id: "oop-constructor", topic: "Nền tảng OOP", difficulty: "Dễ",
      question: "Constructor ResearchProject giúp gì cho trạng thái ban đầu hợp lệ?",
      short: "Nó kiểm ngày và chuỗi bắt buộc trước khi hoàn thành việc tạo đối tượng.",
      explanation: "Guard.DateRange kiểm khoảng ngày. Guard.Required cắt khoảng trắng và chặn mã, loại hoặc tiêu đề rỗng. Status được khởi tạo là Pending và các danh sách ban đầu rỗng.",
      points: ["Chỉ vị trí kiểm ngày","dữ liệu bắt buộc","trạng thái ban đầu"],
      pitfalls: ["Tưởng tạo đề tài đồng thời gán Leader."],
      followUp: "Vì sao cần ProjectService kiểm loại đã tồn tại ngoài constructor?",
      evidence: [references.projectInit]
    },
    {
      id: "oop-readonly-view", topic: "Nền tảng OOP", difficulty: "Trung bình",
      question: "Members.AsReadOnly() có đóng băng danh sách thành viên không?",
      short: "Nó trả chế độ xem chỉ đọc. Model vẫn thay đổi danh sách nội bộ qua AddMember.",
      explanation: "Read-only wrapper chặn thao tác thêm hay xóa từ phía người gọi, nhưng phản ánh thay đổi của danh sách gốc. ProjectParticipation cũng có property chỉ đọc. Điều này bảo vệ đường ghi mà vẫn cho phía hiển thị quan sát dữ liệu mới.",
      points: ["Wrapper","thay đổi qua model","thành phần chỉ đọc"],
      pitfalls: ["Đồng nhất IReadOnlyList với bản chụp bất biến."],
      followUp: "Nếu cần snapshot tại thời điểm t, nên thay đổi cách xuất dữ liệu thế nào?",
      evidence: [references.projectFields, references.participation]
    },
    {
      id: "oop-domain-behavior", topic: "Nền tảng OOP", difficulty: "Trung bình",
      question: "Tại sao Rename nằm trong Department thay vì public setter Name?",
      short: "Model giữ quy tắc tên hợp lệ và chỉ cho đổi qua phương thức kiểm tra.",
      explanation: "Rename gọi Guard.Required để từ chối rỗng và bỏ khoảng trắng. ID và ngày thành lập chỉ đọc sau khi tạo. Service quyết định khi nào tra và lưu, model quyết định giá trị tên hợp lệ.",
      points: ["Private setter","validate ở model","vai trò service"],
      pitfalls: ["Đặt mọi quy tắc vào setter công khai rồi sửa ID khi cập nhật."],
      followUp: "Nếu người gọi truyền tên trắng, đối tượng đã có đổi tên trước khi ném lỗi không?",
      evidence: [references.department]
    },
    {
      id: "cs-nullable-lifted", topic: "Cú pháp C#", difficulty: "Trung bình",
      question: "Vì sao ngày kết thúc null vẫn qua phép kiểm end < start?",
      short: "So sánh DateOnly? null với start bằng toán tử < cho false, nên không vào nhánh lỗi.",
      explanation: "Guard.DateRange chỉ ném lỗi khi end < start là true. Trong menu, chuỗi ngày kết thúc trống được chuyển thành null. Bằng ngày bắt đầu cũng hợp lệ.",
      points: ["DateOnly?","điều kiện nhỏ hơn","menu chuyển chuỗi rỗng"],
      pitfalls: ["Tưởng null tự đổi thành một ngày mặc định."],
      followUp: "Nếu end = start thì kết quả là gì?",
      evidence: [references.guard, references.optionalDate]
    },
    {
      id: "cs-identity-record", topic: "Cú pháp C#", difficulty: "Trung bình",
      question: "Tại sao ProjectStatusHistory là record trong khi ResearchProject là class?",
      short: "Lịch sử biểu diễn một lần chuyển với dữ liệu cố định. Đề tài có định danh và hành vi thay đổi theo vòng đời.",
      explanation: "Record thuận tiện cho dữ liệu theo giá trị. ResearchProject quản lý tập thành viên, kinh phí, lịch sử và trạng thái. Dùng record cũng không tự làm mọi thuộc tính tham chiếu bất biến sâu.",
      points: ["Dữ liệu sự kiện","logic của aggregate","ngữ nghĩa record"],
      pitfalls: ["Cho rằng record tự ghi lịch sử hoặc tự ghi tệp."],
      followUp: "Lớp nào thực sự thêm lịch sử trước khi cập nhật Status?",
      evidence: [references.projectHistory, references.changeStatus]
    },
    {
      id: "cs-lookup-null", topic: "Cú pháp C#", difficulty: "Dễ",
      question: "FindProject trả null thì RequiredProject xử lý ra sao?",
      short: "RequiredProject dùng ?? throw để dừng với InvalidOperationException.",
      explanation: "Repository trả ResearchProject? vì tra có thể không thấy. Service chuyển trường hợp thiếu thành lỗi nghiệp vụ dễ nhận biết. Chỉ object tìm được mới đi vào bước gán, duyệt hoặc hoàn thành tiếp theo.",
      points: ["Kiểu nullable","?? throw","nhánh dừng"],
      pitfalls: ["Nói rằng ?? tự tạo đề tài rỗng."],
      followUp: "Menu xử lý lỗi nghiệp vụ này ở đâu?",
      evidence: [references.requiredProject, references.menuErrors]
    },
    {
      id: "cs-shared-reference", topic: "Cú pháp C#", difficulty: "Khó",
      question: "ToList trên Projects có tạo bản sao sâu của các đề tài không?",
      short: "Nó sao chép danh sách chứa các tham chiếu. Các ResearchProject bên trong vẫn là các object cũ.",
      explanation: "Thay phần tử trong bản danh sách riêng không sửa Dictionary. Gọi hành vi trên một ResearchProject lấy ra vẫn tác động chính object đã lưu trong bộ nhớ. Đây cũng là lý do cần đường nghiệp vụ rõ để cập nhật rồi gọi Save.",
      points: ["Shallow copy","object identity","phân biệt danh sách với phần tử"],
      pitfalls: ["Đồng nhất ToList với clone từng đề tài."],
      followUp: "Nếu cần tách dữ liệu hiển thị khỏi object sống, em có thể ánh xạ sang kiểu nào?",
      evidence: [references.repoMemory, references.projectFields]
    },
    {
      id: "design-multiplicity", topic: "Thiết kế lớp", difficulty: "Trung bình",
      question: "Số lượng Leader nào hợp lệ lúc lập hồ sơ và lúc phê duyệt?",
      short: "Ở Pending có thể có 0 hoặc 1 Leader. Khi duyệt cần đúng 1.",
      explanation: "AddMember từ chối Leader thứ hai, còn PendingState.Approve đếm đúng một. Danh sách ProjectParticipation có thể có nhiều thành viên, nên multiplicity của danh sách và quy tắc số Leader là hai thông tin riêng.",
      points: ["Tối đa một khi gán","đúng một khi duyệt","multiplicity danh sách"],
      pitfalls: ["Kết luận đề tài Pending luôn có một chủ nhiệm."],
      followUp: "Nếu chỉ có ba Member, lần phê duyệt sẽ ra sao?",
      evidence: [references.addMember, references.pendingState]
    },
    {
      id: "design-relationship-role", topic: "Thiết kế lớp", difficulty: "Dễ",
      question: "Vì sao lưu ProjectRole trong ProjectParticipation thay vì Researcher?",
      short: "Vai trò xác định theo cặp đề tài và người tham gia.",
      explanation: "ProjectParticipation lưu ProjectId, ResearcherId và Role. Cùng một người có thể là Leader ở đề tài này và Member ở đề tài khác. Vai trò thao tác UserRole trong CurrentUserContext là thông tin khác.",
      points: ["Thực thể liên kết","vai trò theo đề tài","phân quyền phiên"],
      pitfalls: ["Gộp UserRole.Officer vào ProjectRole."],
      followUp: "Lớp nào kiểm xem mã Researcher tồn tại trước khi gán?",
      evidence: [references.participation, references.roleEnums, references.assignMember]
    },
    {
      id: "design-realization", topic: "Thiết kế lớp", difficulty: "Trung bình",
      question: "Hai quan hệ của JsonResearchRepository và PendingState trong UML khác nhau ở đâu?",
      short: "Kho JSON kế thừa một lớp, PendingState thực hiện một interface.",
      explanation: "JsonResearchRepository nhận phần cài của kho bộ nhớ và override Save. PendingState đáp ứng hợp đồng IProjectState. Cả hai dùng dấu : trong C#, nhưng UML biểu diễn generalization bằng nét liền và realization bằng nét đứt với tam giác rỗng.",
      points: ["Kế thừa","triển khai","kiểu quan hệ UML"],
      pitfalls: ["Gọi mọi dấu : là kế thừa lớp."],
      followUp: "Repository nhận thêm interface bên cạnh lớp cơ sở trong C# được không?",
      evidence: [references.repoInheritance, references.stateInterface]
    },
    {
      id: "design-isp", topic: "Thiết kế lớp", difficulty: "Khó",
      question: "Tách IPeopleRepository và IProjectRepository thể hiện nguyên lý gì và thấy ở đâu?",
      short: "Interface Segregation. Service nhận hợp đồng theo dữ liệu nó cần.",
      explanation: "PeopleService chỉ cần chức năng hồ sơ nhân sự. FundingService cần đề tài và nguồn. ProjectService cần cả hai vì xác nhận người rồi làm việc với đề tài. ConsoleMenu có thể truyền một kho cung cấp cả hợp đồng.",
      points: ["Hai interface","nhu cầu mỗi service","một implementation"],
      pitfalls: ["Cho rằng hai interface bắt buộc hai cách lưu."],
      followUp: "Lợi ích nào mất đi nếu tất cả service nhận cùng interface lớn?",
      evidence: [references.repositories, references.projectPropose, references.fundingSource]
    },
    {
      id: "state-direct-call", topic: "State & Strategy", difficulty: "Khó",
      question: "Vì sao PendingState.Approve kiểm Status dù ResearchProject dùng StateFor?",
      short: "Lớp State là public nên lời gọi trực tiếp vẫn có thể nhận đề tài sai trạng thái.",
      explanation: "Đường chuẩn chọn State theo Status. Kiểm lại trong lớp State ngăn gọi trực tiếp PendingState với Active rồi ghi lịch sử giả. Ca RejectMismatchedState kiểm loại lỗi này.",
      points: ["Điều phối chuẩn","public","phòng gọi nhầm State"],
      pitfalls: ["Cho rằng constructor của PendingState bắt buộc nhận đề tài Pending."],
      followUp: "ActiveState.Complete có biện pháp tương tự ở đâu?",
      evidence: [references.pendingState, references.activeState, references.testDirectState]
    },
    {
      id: "state-factory-boundary", topic: "State & Strategy", difficulty: "Khó",
      question: "StateFor dùng new. Dựa vào đâu để phân biệt với Factory Method theo GoF?",
      short: "StateFor chọn đối tượng bằng switch. Để xác định Factory Method theo GoF, tìm thao tác tạo được lớp Creator con ghi đè.",
      explanation: "StateFor chọn State theo enum. Trong UC07, ResearchOutputCreator.Build gọi Create(OutputDraft) trừu tượng rồi Validate. PaperCreator và DeliverableCreator ghi đè Create để tạo hai lớp sản phẩm cụ thể.",
      points: ["Switch chọn State","override Create ở Creator","Build kiểm Validate sau tạo"],
      pitfalls: ["Gọi mọi hàm chứa new là Factory Method theo GoF."],
      followUp: "Nếu thêm State mới, phần ánh xạ nào hiện tại cần được mở rộng?",
      evidence: [references.stateFor, references.factory]
    },
    {
      id: "state-history-actor", topic: "State & Strategy", difficulty: "Trung bình",
      question: "Một lần phê duyệt thành công thêm dữ liệu gì ngoài Status?",
      short: "Thêm ProjectStatusHistory ghi đề tài, trạng thái cũ/mới, thời điểm và mã tác nhân.",
      explanation: "ProjectService.Approve truyền OFFICER và thời gian hiện tại. ChangeStatus tạo bản ghi từ Status lúc trước rồi gán giá trị mới. Mã tác nhân dùng cho minh họa vai trò trong phiên hiện hành.",
      points: ["ActorId","trạng thái trước/sau","thứ tự cập nhật"],
      pitfalls: ["Cho rằng lịch sử chứa họ tên người dùng đã xác thực."],
      followUp: "Muốn có audit theo từng tài khoản thật cần thêm dữ liệu nào?",
      evidence: [references.changeStatus, references.approve]
    },
    {
      id: "strategy-contract", topic: "State & Strategy", difficulty: "Trung bình",
      question: "Muốn thêm cách thống kê đầu ra, điểm mở rộng hiện có là gì?",
      short: "Cài một lớp IReportStrategy trả IReadOnlyList<ReportRow>.",
      explanation: "ReportService.Generate kiểm quyền và gọi BuildRows. Lớp cụ thể chịu trách nhiệm gom dữ liệu phù hợp. Phần đầu ra còn cần hợp đồng dữ liệu thật và đường chọn strategy được nối vào giao diện.",
      points: ["IReportStrategy","ReportRow","quyền ở lớp gọi chung"],
      pitfalls: ["Nói thống kê đầu ra đã có vì có interface."],
      followUp: "Khi định dạng kết quả khác tiền, trường Unit hoặc phần in cần xét gì?",
      evidence: [references.reportContract, references.generate, references.outputReport]
    },
    {
      id: "strategy-zero-rows", topic: "State & Strategy", difficulty: "Khó",
      question: "Tại sao đề tài chưa nhận tiền có thể xuất hiện trong một báo cáo, còn nguồn chưa cấp không có dòng?",
      short: "Theo đề tài duyệt toàn bộ Projects. Theo nguồn bắt đầu từ danh sách Allocations.",
      explanation: "Tổng Sum trên danh sách rỗng là 0 nên báo cáo đề tài có thể có dòng 0 đồng. Nguồn chỉ hiện nếu có ít nhất một khoản mang SourceId tương ứng. Hai báo cáo khác đối tượng để duyệt.",
      points: ["Projects","SelectMany","Sum rỗng"],
      pitfalls: ["Cho rằng cả hai đều duyệt danh mục nguồn hoặc cùng số dòng."],
      followUp: "Nếu muốn hiện cả nguồn 0 đồng thì nơi nào cần đổi?",
      evidence: [references.strategyProject, references.strategySource]
    },
    {
      id: "arch-di-vs-dip", topic: "Kiến trúc", difficulty: "Khó",
      question: "DI và DIP được minh họa bằng hai quyết định nào?",
      short: "Menu truyền dependency qua constructor. Business dựa vào interface mà Data triển khai.",
      explanation: "DI là cách cung cấp collaborator, ví dụ new ProjectService(_data, _data). DIP nói về hướng phụ thuộc ở ranh giới Business–Data. Interface ở Business, Data dùng và cài interface đó.",
      points: ["Constructor injection","hướng phụ thuộc","không cần container"],
      pitfalls: ["Gọi DI và DIP là cùng thuật ngữ."],
      followUp: "Nếu constructor nhận thẳng JsonResearchRepository thì còn DI không và DIP thay đổi ra sao?",
      evidence: [references.composition, references.repositories]
    },
    {
      id: "arch-menu-input", topic: "Kiến trúc", difficulty: "Trung bình",
      question: "Vì sao số tiền được kiểm ở menu và trong FundingAllocation?",
      short: "Menu giúp nhập lại số hợp lệ, model giữ điều kiện khi có caller khác.",
      explanation: "ReadFundingAmount nhận các chữ số tạo thành số đồng nguyên dương trong phạm vi decimal. FundingAllocation giữ quy tắc số tiền dương cho cả caller gọi trực tiếp. FundingService còn kiểm quyền, trạng thái, nguồn, mã đợt và phạm vi tổng.",
      points: ["Hai tầng kiểm","parse và bất biến","caller khác"],
      pitfalls: ["Bỏ guard model vì đã lọc UI."],
      followUp: "Quy tắc mã đợt toàn cục nên nằm ở đâu?",
      evidence: [references.positiveInput, references.allocationModel, references.fundingAllocation]
    },
    {
      id: "arch-snapshot", topic: "Kiến trúc", difficulty: "Trung bình",
      question: "ProjectData trong kho JSON và ResearchProject có trách nhiệm gì khác nhau?",
      short: "ProjectData mang dữ liệu đọc ghi. ResearchProject giữ hành vi và quy tắc.",
      explanation: "Kho chuyển model thành DTO khi lưu và dựng lại model qua Restore khi nạp. DTO có setter để phục vụ tuần tự hóa. Restore kiểm dữ liệu lịch sử và quan hệ trước khi trả kết quả.",
      points: ["DTO","chuyển đổi","khôi phục bất biến"],
      pitfalls: ["Cho rằng tính hợp lệ của JSON đảm bảo toàn bộ nghiệp vụ hợp lệ."],
      followUp: "Gán Status khi Restore khác gán để duyệt thế nào?",
      evidence: [references.projectDto, references.projectRestore]
    },
    {
      id: "arch-resume", topic: "Kiến trúc", difficulty: "Trung bình",
      question: "Khi mở ứng dụng lần đầu kho lấy dữ liệu ở đâu và lần sau lấy ở đâu?",
      short: "Nếu chưa có tệp runtime, kho sao chép seed. Sau đó kho đọc tệp runtime.",
      explanation: "Cấu hình được đọc cạnh tệp chạy theo AppContext.BaseDirectory. Lần sau tệp đã lưu tồn tại nên không sao chép đè bằng seed. Kịch bản demo dùng bản chạy riêng để có điểm bắt đầu rõ.",
      points: ["AppContext.BaseDirectory","seed","tệp runtime"],
      pitfalls: ["Sửa seed rồi kỳ vọng tệp runtime đang có tự đổi."],
      followUp: "Nếu chỉnh working directory, chương trình còn đọc cùng cấu hình không?",
      evidence: [references.jsonInitialization]
    },
    {
      id: "uc01-update-created-date", topic: "UC01–UC04", difficulty: "Dễ", part: 'A',
      question: "UC01 đổi tên D01 nhưng nhập ngày thành lập khác, ngày nào được giữ?",
      short: "Ngày thành lập cũ của D01.",
      explanation: "Khi tìm thấy ID đã chuẩn hóa trong kho, SaveDepartment gọi Rename trên đối tượng hiện có. Constructor nhận ngày chỉ chạy khi tạo mới. Không có setter ngày công khai.",
      points: ["Chuẩn hóa ID","nhánh Rename","ngày chỉ đọc"],
      pitfalls: ["Mô tả SaveDepartment là thay toàn bộ hồ sơ đơn vị."],
      followUp: "Mã D01 thêm khoảng trắng hai đầu có tìm được bản cũ không?",
      evidence: [references.departmentSave, references.department]
    },
    {
      id: "uc01-email-update", topic: "UC01–UC04", difficulty: "Khó", part: 'A',
      question: "Vì sao đổi tên hồ sơ và giữ nguyên email không báo email trùng chính nó?",
      short: "Predicate bỏ qua hồ sơ có cùng ID đã chuẩn hóa.",
      explanation: "SaveResearcher so ID để loại hồ sơ đang cập nhật, rồi mới so email của các hồ sơ khác theo OrdinalIgnoreCase. Nếu email trùng hồ sơ khác, service ném lỗi trước Update.",
      points: ["Ngoại lệ chính hồ sơ","hai phép so","trước khi sửa"],
      pitfalls: ["Chỉ nói email unique nên sửa luôn báo trùng."],
      followUp: "Nếu người gọi truyền ID khác, phép kiểm có còn bỏ qua đúng bản ghi cũ không?",
      evidence: [references.researcherSave]
    },
    {
      id: "uc02-guard-placement", topic: "UC01–UC04", difficulty: "Trung bình", part: 'A',
      question: "Tại sao ProposeProject kiểm loại đề tài trong service, còn kiểm ngày trong model?",
      short: "Tra loại cần repository. Khoảng ngày chỉ phụ thuộc các tham số của đề tài.",
      explanation: "ProjectService dùng FindCategory để xác nhận tham chiếu. ResearchProject có thể kiểm title và khoảng ngày ngay khi tạo mà không phải hỏi nơi lưu. Cách chia này giữ bất biến với mọi caller.",
      points: ["Tra tham chiếu","bất biến nội tại","thứ tự tạo/lưu"],
      pitfalls: ["Đưa cả truy vấn kho vào constructor model."],
      followUp: "Trong test, nếu không AddSeed loại thì lời gọi dừng ở bước nào?",
      evidence: [references.projectPropose, references.projectInit]
    },
    {
      id: "uc03-user-project-role", topic: "UC01–UC04", difficulty: "Dễ", part: 'A',
      question: "R001 là Leader của P003. R001 đang ở vai Researcher có duyệt P003 được không?",
      short: "Bị từ chối vì thao tác duyệt yêu cầu UserRole.Officer.",
      explanation: "ProjectRole mô tả vai trò trong một đề tài. ProjectService.Approve kiểm UserRole của phiên trước khi lấy đề tài. Điều kiện Leader lại được kiểm ở PendingState sau khi qua quyền.",
      points: ["UserRole","ProjectRole","thứ tự kiểm"],
      pitfalls: ["Gộp chủ nhiệm với chuyên viên."],
      followUp: "Menu chọn vai trò có chứng minh danh tính tài khoản thật không?",
      evidence: [references.roleEnums, references.approve, references.pendingState]
    },
    {
      id: "uc04-type-limit", topic: "UC01–UC04", difficulty: "Khó", part: 'A',
      question: "Vì sao khoản tiền dương hợp lệ vẫn có thể bị từ chối trước khi được thêm?",
      short: "Tổng toàn hệ thống sau khi cộng khoản có thể tràn phạm vi decimal.",
      explanation: "FundingService thử sum các TotalFunding rồi cộng khoản mới trong try. OverflowException được bọc thành InvalidOperationException. AddAllocation và Save nằm sau phép thử. Quy tắc này là kiểm phạm vi biểu diễn số.",
      points: ["Tổng tất cả đề tài","ngoại lệ","trước mutation"],
      pitfalls: ["Gọi decimal.MaxValue là hạn mức ngân sách."],
      followUp: "Vì sao test thêm 1 vào một đề tài khác sau khi đã cấp decimal.MaxValue?",
      evidence: [references.fundingAllocation, references.testOverflow]
    },
    {
      id: "uc04-duplicate-cross", topic: "UC01–UC04", difficulty: "Trung bình", part: 'A',
      question: "Đã dùng đợt A004 ở P003. Có dùng a004 cho P002 được không?",
      short: "Không. Mã đợt cấp duy nhất trên toàn hệ thống, so không phân biệt hoa thường.",
      explanation: "FundingService chuẩn hóa ID rồi SelectMany khoản cấp của mọi đề tài trước khi Any so khớp. Model có kiểm trùng trong chính đề tài như lớp bảo vệ riêng nhưng quy tắc toàn cục nằm ở service.",
      points: ["SelectMany","OrdinalIgnoreCase","phạm vi toàn cục"],
      pitfalls: ["Chỉ kiểm đợt của P002 hoặc nguồn đang chọn."],
      followUp: "Đổi F01 sang F02 cho khoản thứ hai có giúp dùng lại A004 không?",
      evidence: [references.fundingAllocation, references.addAllocation]
    },
    {
      id: "ab-council-membership", topic: "Điểm nối A–B", difficulty: "Trung bình",
      question: "Khi nào lập được hội đồng, và đến bước nào cần có Chủ tịch?",
      short: "Officer lập tối đa một hội đồng cho đề tài Active. Có thể lập trước rồi gán một Chủ tịch để ghi điểm.",
      explanation: "EvaluationService.CreateCouncil kiểm quyền, trạng thái, mã và hội đồng hiện có. AddMember chặn người trùng hoặc Chủ tịch thứ hai. RecordScore kiểm mã người thao tác khớp Chủ tịch. Khi đã có điểm, kể cả 0, danh sách hội đồng bị khóa.",
      points: ["Active và tối đa một hội đồng","tối đa một Chủ tịch khi gán","có Chủ tịch đúng mã để chấm","khóa danh sách sau chấm"],
      pitfalls: ["Tưởng thao tác tạo hội đồng tự gán Chủ tịch hoặc điểm 0 chưa khóa danh sách."],
      followUp: "UC05 cần tra hai loại hồ sơ nào từ phần A?",
      evidence: [references.council, references.score]
    },
    {
      id: "ab-score-complete", topic: "Điểm nối A–B", difficulty: "Khó",
      question: "Điểm hội đồng 0 có hợp lệ và đã đủ để hoàn thành đề tài chưa?",
      short: "0 nằm trong khoảng hợp lệ. Vẫn cần ít nhất một đầu ra và thao tác hoàn thành đúng quyền khi Active.",
      explanation: "Chủ tịch đúng hội đồng được ghi điểm trong [0,10] khi đề tài Active. Adapter kiểm Score khác null nên 0 là đã chấm. Officer gọi Complete, service còn kiểm HasResearchOutput rồi gọi State.",
      points: ["Biên 0","chưa có điểm","hai bằng chứng"],
      pitfalls: ["Dùng score > 0 để biểu diễn đã chấm hoặc đổi Completed chỉ vì có điểm."],
      followUp: "Nếu lưu điểm nullable, em kiểm đã chấm bằng điều kiện gì?",
      evidence: [references.score, references.completionAdapter, references.complete]
    },
    {
      id: "ab-paper-model", topic: "Điểm nối A–B", difficulty: "Trung bình",
      question: "Trong UC07, khi nào một nhà nghiên cứu được ghi bài báo cho đề tài?",
      short: "Người ghi có vai Researcher, tham gia đề tài Active và có mặt trong danh sách tác giả.",
      explanation: "OutputService kiểm tư cách người ghi, tác giả tồn tại, mã bài và DOI nếu có. PaperCreator.Build gọi Validate để bảo đảm bài có tác giả và đúng một tác giả liên hệ. AddAuthor chặn lặp tác giả hoặc thứ tự. SavePaperWithLink lưu bài và liên kết đề tài trong cùng thao tác.",
      points: ["Tham gia đề tài","tác giả","DOI","sản phẩm"],
      pitfalls: ["Cho rằng mọi Researcher thêm được cho mọi đề tài."],
      followUp: "Quy tắc DOI trùng cần truy cập bao nhiêu hồ sơ và nên nằm ở đâu?",
      evidence: [references.outputService, references.paperRelationship]
    },
    {
      id: "ab-extension-json", topic: "Điểm nối A–B", difficulty: "Khó",
      question: "Bản tích hợp phân biệt dữ liệu B trong AppSnapshot với OtherModules thế nào?",
      short: "Hội đồng, bài báo, liên kết và sản phẩm có danh sách được khai báo. OtherModules giữ các trường JSON mở rộng còn lại.",
      explanation: "LoadResults dựng các thực thể B từ snapshot. Persist ghi các danh sách B và chuyển tiếp OtherModules. Khi cần bằng chứng nghiệm thu, ResultCompletionEvidence truy vấn các thực thể qua IResultRepository.",
      points: ["Trường có kiểu của B","JsonExtensionData giữ trường mở rộng","adapter đọc repository"],
      pitfalls: ["Tưởng điểm và đầu ra được đọc trực tiếp từ OtherModules."],
      followUp: "Khi bổ sung trường có kiểu rõ vào AppSnapshot, em kiểm tương thích tệp cũ thế nào?",
      evidence: [references.snapshotExtensions, references.persist, references.completionAdapter]
    },
    {
      id: "ab-reports-scope", topic: "Điểm nối A–B", difficulty: "Dễ",
      question: "UC08 có những báo cáo nào và tra cứu ở mục nào?",
      short: "11/12 là kinh phí theo đề tài và theo nguồn. 19/20 là đầu ra theo đề tài và theo loại. 21 tra cứu theo mã, trạng thái hoặc cả hai.",
      explanation: "Bốn báo cáo dùng cùng IReportStrategy và ReportService kiểm Officer. Mục 21 đi qua ProjectLookupService, trả trạng thái, kinh phí, điểm và tóm tắt đầu ra. Mục 1 là danh sách tổng quan đơn giản.",
      points: ["Hai Strategy kinh phí","hai Strategy đầu ra","tra cứu qua service riêng"],
      pitfalls: ["Nhầm mục 1 với tra cứu có bộ lọc hoặc cho rằng bộ lọc là một Strategy."],
      followUp: "Một kết quả lọc có thể gồm những thông tin nào ngoài trạng thái?",
      evidence: [references.menuProjectList, references.menuReport, references.outputReport]
    },
    {
      id: "test-arrange", topic: "Kiểm thử", difficulty: "Dễ",
      question: "Trong một ca kiểm thử tạo đề tài, Setup chuẩn bị gì và vì sao dùng kho bộ nhớ?",
      short: "Setup tạo kho mới, danh mục, người và đơn vị cần thiết. Kho bộ nhớ giúp kiểm điều kiện nghiệp vụ với dữ liệu riêng.",
      explanation: "Mỗi test dựng dữ liệu độc lập rồi gọi service trực tiếp. Điều này giúp không phụ thuộc file runtime. Muốn kiểm chức năng ghi/đọc JSON phải thêm thử nghiệm trên bản sao.",
      points: ["Arrange","cô lập","phân biệt persistence"],
      pitfalls: ["Nói test bộ nhớ xác nhận khởi động lại đọc được tệp."],
      followUp: "Bằng chứng nào cần để kết luận Save ghi đúng snapshot?",
      evidence: [references.testSetup, references.repoMemory]
    },
    {
      id: "test-exception-invariant", topic: "Kiểm thử", difficulty: "Khó",
      question: "Vì sao kiểm exception thôi chưa đủ để chứng minh từ chối an toàn?",
      short: "Phương thức có thể đã làm dở một thay đổi rồi mới ném lỗi.",
      explanation: "Một ca negative tốt đọc lại dữ liệu để kiểm trạng thái, số thành viên hoặc tổng tiền sau lỗi. RejectFundingOverflow kiểm cả khoản cũ và đề tài bị từ chối. Nên chỉ ra điều kiện nào ném để tránh ca test thành công vì nhầm lý do.",
      points: ["Ngoại lệ đúng","bất biến sau lỗi","điều kiện đầu vào"],
      pitfalls: ["Khẳng định bất biến được giữ chỉ vì có try/catch."],
      followUp: "Với phê duyệt thất bại, nên kiểm thêm thuộc tính nào ngoài Status?",
      evidence: [references.testOverflow, references.testApproval]
    },
    {
      id: "test-evidence-record", topic: "Kiểm thử", difficulty: "Trung bình",
      question: "Khi bảo vệ, đọc gì để xác nhận số ca thực sự đạt?",
      short: "Lấy kết quả in của lượt chạy và mã thoát, kèm bản mã đã chạy.",
      explanation: "Mảng test cho biết các ca được đăng ký. Harness chạy từng ca, in kết quả và trả mã lỗi khi có ca thất bại. Số ca khai báo khác kết quả đã kiểm chứng. Khi dùng kết quả lịch sử, ghi rõ mốc và cách chạy.",
      points: ["Mảng đăng ký","log thực","mã thoát"],
      pitfalls: ["Đọc số ca đăng ký rồi gọi đó là số pass."],
      followUp: "Build xong chưa chạy test thì được kết luận đến đâu?",
      evidence: [references.testRunner]
    },
    {
      id: "test-auth-case", topic: "Kiểm thử", difficulty: "Trung bình",
      question: "Vì sao test phân quyền phải gọi service ngoài menu?",
      short: "Kiểm chỗ thực thi quyền dù caller không đi qua giao diện.",
      explanation: "ServiceAuthorization gọi trực tiếp các nghiệp vụ với vai trò không hợp lệ. Nếu chỉ ẩn tùy chọn menu, caller khác vẫn có thể thử gọi API nghiệp vụ. Test cần kỳ vọng UnauthorizedAccessException từ đúng bước.",
      points: ["Caller ngoài menu","điều kiện quyền","loại ngoại lệ"],
      pitfalls: ["Chỉ kiểm chữ trên menu mà kết luận service bảo vệ."],
      followUp: "Test nên chuẩn bị mã hợp lệ hay mã thiếu để tránh trượt bởi lỗi khác?",
      evidence: [references.testAuth, references.access]
    },
    {
      id: "read-project-trim", topic: "Đọc code", difficulty: "Trung bình", part: 'A',
      question: "Giả sử đúng quyền, loại hợp lệ và đã có P003. Truyền mã “ p003 ”, đoạn code dừng ở đâu?",
      short: "Dừng ở guard trùng mã trước khi tạo và lưu.",
      explanation: "Guard.Required chuẩn hóa khoảng trắng. FindProject dùng kho so không phân biệt hoa thường. Nhánh InvalidOperationException chạy và không tới new ResearchProject hoặc Save.",
      points: ["Trim","comparer","dòng dừng"],
      pitfalls: ["Đoán mã được lưu thành bản ghi thứ hai."],
      followUp: "Cần giả thiết thêm gì nếu đổi kho sang kiểu so mã khác?",
      evidence: [references.projectPropose, references.repoMemory],
      prompt: codePrompts.projectPropose
    },
    {
      id: "read-model-member", topic: "Đọc code", difficulty: "Trung bình", part: 'A',
      question: "Pending có R001 làm Member. Khi truyền chính R001 với role Leader, nhánh nào chạy?",
      short: "Bị chặn bởi kiểm trùng người trước khi xét số Leader.",
      explanation: "AddMember so ResearcherId với các lần đã tham gia, không phân biệt hoa thường. Phương thức thêm mục mới, không chuyển vai trò người đã có. Kết quả danh sách giữ nguyên.",
      points: ["Thứ tự condition","trùng người","không có nhánh update"],
      pitfalls: ["Đoán R001 được tự thăng làm Leader."],
      followUp: "Em cần đề xuất nghiệp vụ gì nếu nhóm muốn đổi vai trò người đã gán?",
      evidence: [references.addMember],
      prompt: codePrompts.addMember
    },
    {
      id: "read-approve-state", topic: "Đọc code", difficulty: "Dễ", part: 'A',
      question: "Đề tài Pending chỉ có hai Member. Chạy Approve qua đường chuẩn thì điều gì xảy ra?",
      short: "PendingState đếm 0 Leader nên ném InvalidOperationException.",
      explanation: "Kiểm đếm vai trò Leader chứ không đếm toàn bộ danh sách. ChangeStatus ở sau guard. Kết quả vẫn Pending và không thêm lịch sử chuyển mới.",
      points: ["Count có predicate","throw","không đổi"],
      pitfalls: ["Tưởng có nhiều người tham gia là đủ để duyệt."],
      followUp: "Nếu có một Leader và hai Member, phương thức tiếp tục ở dòng nào?",
      evidence: [references.pendingState, references.changeStatus],
      prompt: codePrompts.pendingState
    },
    {
      id: "read-fund-before-mutation", topic: "Đọc code", difficulty: "Khó", part: 'A',
      question: "Nếu phép cộng tổng ném OverflowException, AddAllocation có chạy không và bên gọi nhận lỗi nào?",
      short: "Không tới AddAllocation. Service bọc lỗi thành InvalidOperationException.",
      explanation: "AddAllocation và Save nằm ngoài, sau try/catch. Catch ném lỗi nghiệp vụ kèm nguyên nhân trong inner exception. Hai lớp kiểm tiền dương và trùng mã diễn ra trước phép thử tổng.",
      points: ["Thứ tự","inner exception","không sửa model"],
      pitfalls: ["Cho rằng catch chỉ ghi log rồi tiếp tục lưu."],
      followUp: "Nếu Persistence ném lỗi sau AddAllocation thì cách kết luận về bộ nhớ khác thế nào?",
      evidence: [references.fundingAllocation],
      prompt: codePrompts.fundingAllocation
    },
    {
      id: "read-source-group", topic: "Đọc code", difficulty: "Trung bình", part: 'A',
      question: "Hai khoản cùng SourceId nhưng ở hai đề tài khác nhau tạo mấy dòng trong báo cáo nguồn?",
      short: "Tạo một dòng cho nguồn, có hai đợt và cộng cả hai số tiền.",
      explanation: "SelectMany dàn phẳng các danh sách phân bổ. GroupBy dùng SourceId và comparer không phân biệt hoa thường. group.Count đếm khoản cấp. Tên hiển thị lấy từ nguồn trong repository.",
      points: ["SelectMany","GroupBy","Sum và Count"],
      pitfalls: ["Nhóm theo ProjectId hoặc đếm hai dòng báo cáo."],
      followUp: "Nếu không tìm thấy tên nguồn khi dựng dòng, exception gì được ném?",
      evidence: [references.strategySource],
      prompt: codePrompts.strategySource
    },
    {
      id: "read-evidence-shortcircuit", topic: "Đọc code", difficulty: "Khó", part: 'A',
      question: "Với Officer và mã hợp lệ, evidence báo chưa chấm nhưng có đầu ra. Hàm nào thực sự được gọi?",
      short: "HasScoredCouncil được gọi. HasResearchOutput bị bỏ qua do toán tử || đoản mạch.",
      explanation: "!HasScoredCouncil trở thành true đủ để nhánh throw. Model chưa nhận Complete nên State chưa chạy và Save chưa chạy. Bằng chứng cả hai điều kiện cần true để đi tiếp.",
      points: ["Toán tử phủ định","đoản mạch","trước model và Save"],
      pitfalls: ["Nói luôn chạy cả hai truy vấn, hoặc cứ có đầu ra là hoàn thành."],
      followUp: "Nếu có đủ bằng chứng nhưng Pending thì guard nào chặn tiếp?",
      evidence: [references.complete, references.activeState],
      prompt: codePrompts.complete
    },
    {
      id: "read-restore-chain", topic: "Đọc code", difficulty: "Khó", part: 'A',
      question: "JSON chứa Status Completed nhưng lịch sử chỉ có Pending → Active. Điều gì xảy ra lúc nạp?",
      short: "Restore phát hiện trạng thái cuối không khớp lịch sử và ném InvalidDataException.",
      explanation: "Restore dựng object, kiểm từng chuyển hợp lệ và dùng previous ghi nhận trạng thái cuối. Chỉ sau khi khớp trạng thái và điều kiện Leader mới gán Status. Hành vi khôi phục không tạo bản ghi chuyển mới.",
      points: ["Duyệt chuỗi","trạng thái cuối","không tạo lịch sử mới"],
      pitfalls: ["Xem giá trị Status trong JSON là bằng chứng đủ."],
      followUp: "Một snapshot Active với lịch sử đúng nhưng 0 Leader có tải được không?",
      evidence: [references.projectRestore],
      prompt: codePrompts.projectRestore
    }
  );
}());
