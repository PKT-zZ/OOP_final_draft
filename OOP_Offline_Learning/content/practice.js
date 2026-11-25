"use strict";

window.OOPPractice = {
  flashcards: [
    {
      id: "class-object",
      topic: "Nền tảng OOP",
      front: "Sau ResearchProject alias = project, duyệt qua alias có làm project chuyển trạng thái không?",
      back: "Có, nếu thao tác duyệt hợp lệ. Hai biến cùng tham chiếu một đề tài nên đọc Status qua biến nào cũng thấy kết quả mới. Một lần new ResearchProject khác tạo một đề tài có trạng thái riêng."
    },
    {
      id: "private-set",
      topic: "Cú pháp C#",
      front: "Nếu menu có thể gán Status = Active trực tiếp, nó sẽ bỏ qua điều gì?",
      back: "Nó có thể bỏ qua kiểm tra đúng một chủ nhiệm và ghi lịch sử đổi trạng thái. private set giới hạn nơi gán trong ResearchProject. Đường nghiệp vụ gọi ProjectService.Approve rồi qua State và ChangeStatus."
    },
    {
      id: "member-invariants",
      topic: "Đóng gói",
      front: "Đề tài Pending đã có một Leader. Gán thêm một Leader hoặc gán lại cùng người sẽ thế nào?",
      back: "Members trả về lớp bọc chỉ đọc để xem danh sách. AddMember bảo vệ quy tắc của đề tài trước khi thêm: đang Pending, người này chưa được gán và chưa có chủ nhiệm nếu vai trò mới là Leader. Xem Business/Models/Projects.cs, ResearchProject.AddMember."
    },
    {
      id: "nullable-date",
      topic: "Cú pháp C#",
      front: "Với cùng ngày bắt đầu, ngày kết thúc bằng ngày bắt đầu, sớm hơn một ngày hoặc null cho kết quả gì?",
      back: "Bằng ngày bắt đầu và null đều hợp lệ. Sớm hơn bị từ chối. DateOnly? biểu diễn ngày có thể thiếu, còn Guard.DateRange kiểm thứ tự nếu ngày kết thúc có giá trị."
    },
    {
      id: "canonical-id",
      topic: "Cú pháp C#",
      front: "Mã đề tài đầu vào “ P003 ” được xử lý ra sao nếu kho đã có “p003”?",
      back: "ProposeProject dùng Guard.Required để bỏ khoảng trắng hai đầu trước khi tra. Kho dùng StringComparer.OrdinalIgnoreCase khi so mã, nên phép tra nhận ra mã trùng và service từ chối lưu. Xem Business/Services/ProjectService.cs và Data/InMemoryResearchRepository.cs."
    },
    {
      id: "interfaces",
      topic: "Thiết kế lớp",
      front: "Vì sao cùng ProjectService chạy được với kho JSON lẫn kho bộ nhớ?",
      back: "Service nhận IProjectRepository và IPeopleRepository qua constructor. ConsoleMenu cung cấp kho JSON, còn test cung cấp kho bộ nhớ. Cùng hợp đồng giúp gọi Save và FindProject. Khi thay kho, cần giữ quy tắc tra mã và cách báo lỗi mà service dựa vào."
    },
    {
      id: "inheritance",
      topic: "Thiết kế lớp",
      front: "Khi service gọi Save qua IProjectRepository, kho JSON chạy lớp nào trước khi ghi tệp?",
      back: "Lời gọi vào override của JsonResearchRepository. Nó kiểm khả năng ghi, gọi base.Save để cập nhật kho bộ nhớ rồi Persist. Nếu bước ghi thất bại, bộ nhớ có thể đã đổi và menu dừng phiên."
    },
    {
      id: "state-policy",
      topic: "State & Strategy",
      front: "Vì sao cùng gọi Approve nhưng đề tài Pending và Active có kết quả khác nhau?",
      back: "ResearchProject chọn đối tượng xử lý theo Status. PendingState duyệt khi có đúng một Leader, rồi ghi lịch sử và chuyển Active. ActiveState từ chối duyệt lại. Chọn State theo enum là bước ánh xạ trạng thái sang hành vi."
    },
    {
      id: "strategy-choice",
      topic: "State & Strategy",
      front: "P001 nhận 10 từ F01 và 5 từ F02. P002 nhận 7 từ F01. Hai Strategy trả tổng nào?",
      back: "Theo đề tài, P001 là 15 và P002 là 7. Theo nguồn, F01 là 17 và F02 là 5. Hai lớp cùng triển khai BuildRows trên IReportStrategy. Đổi cách nhóm giữ nguyên các đợt cấp gốc."
    },
    {
      id: "roles",
      topic: "Nghiệp vụ đề tài",
      front: "R001 là Leader của P003. Thông tin này có đủ để R001 phê duyệt P003?",
      back: "Quyền duyệt dựa trên UserRole.Officer trong CurrentUserContext. ProjectRole.Leader là vai trò của R001 trong đề tài và là một điều kiện nghiệp vụ khi duyệt. Xem Business/Services/ProjectService.cs, Approve, và Business/Models/ProjectStates.cs, PendingState.Approve."
    },
    {
      id: "evidence",
      topic: "Điểm nối A–B",
      front: "ProjectService.Complete yêu cầu bên gọi cung cấp hai bằng chứng gì?",
      back: "Cần điểm hội đồng và ít nhất một đầu ra. Menu 16 truyền ResultCompletionEvidence đọc hai điều kiện đó từ kho. ProjectService kiểm quyền Officer trước khi gọi State. Ca A-BRIDGE truyền FakeCompletionEvidence để thử điều kiện riêng."
    },
    {
      id: "money",
      topic: "Nghiệp vụ đề tài",
      front: "Vì sao một đợt cấp có số tiền dương vẫn có thể bị từ chối?",
      back: "FundingService từ chối nếu đề tài đã Completed, mã đợt đã có ở bất kỳ đề tài nào hoặc khoản mới làm tổng kinh phí tràn decimal. Giới hạn decimal là phạm vi kiểu số. Xem FundingService.Allocate."
    }
  ],

  questions: [
    {
      id: "why-oop",
      topic: "Nền tảng OOP",
      difficulty: "Dễ",
      question: "Vì sao nhóm chọn OOP cho bài toán quản lý nghiên cứu?",
      short: "Mỗi đề tài có dữ liệu, trạng thái và quy tắc riêng. Em gom chúng trong ResearchProject để mọi chỗ sửa đề tài dùng cùng một quy tắc.",
      explanation: "Khi phải kiểm tra các điều kiện gán người ở nhiều màn hình, đặt quy tắc trong đối tượng giúp tái sử dụng và dễ tìm nơi kiểm tra. Ví dụ, ResearchProject.AddMember bảo vệ danh sách thành viên. Những điều kiện cần tra nhiều hồ sơ, như kiểm tra nhà nghiên cứu có tồn tại, được ProjectService xử lý qua repository.",
      points: ["Đối tượng có dữ liệu và hành vi", "Model giữ quy tắc cục bộ", "Service điều phối các hồ sơ liên quan"],
      followUp: "Nếu chuyển toàn bộ kiểm tra vào ConsoleMenu, điều gì xảy ra khi viết bộ kiểm thử gọi thẳng service?"
    },
    {
      id: "cs-normalized",
      topic: "Cú pháp C#",
      difficulty: "Trung bình",
      question: "Vì sao cần chuẩn hóa mã đề tài trước khi kiểm tra trùng?",
      short: "Mã dùng để tra phải giống mã được đưa vào đối tượng. Em dùng cùng kết quả Guard.Required để tra trùng và tạo ResearchProject.",
      explanation: "Guard.Required từ chối mã rỗng rồi gọi Trim. Nếu tra mã thô “ P003 ” nhưng khi lưu lại dùng “P003”, phép tra có thể bỏ sót bản ghi cũ. Dictionary của kho so sánh không phân biệt hoa thường, nên sau khi chuẩn hóa khoảng trắng, “p003” và “P003” cùng một khóa. Xem Business/Services/ProjectService.cs, ProposeProject, và Data/InMemoryResearchRepository.cs.",
      points: ["Trim xử lý khoảng trắng hai đầu", "StringComparer.OrdinalIgnoreCase xử lý hoa thường", "Tra và tạo dùng cùng mã"],
      followUp: "Dictionary so sánh không phân biệt hoa thường có tự bỏ khoảng trắng không?"
    },
    {
      id: "interface-abstract",
      topic: "Thiết kế lớp",
      difficulty: "Trung bình",
      question: "Interface và abstract class khác nhau thế nào? Vì sao dự án dùng IProjectRepository?",
      short: "Interface mô tả khả năng mà bên dùng cần. Abstract class còn có thể giữ trạng thái và chia sẻ phần cài đặt. ProjectService cần hợp đồng tra và lưu đề tài, nên nhận IProjectRepository.",
      explanation: "Một lớp C# có thể triển khai nhiều interface và chỉ có một lớp cơ sở trực tiếp. Abstract class có thể giữ field riêng cho từng đối tượng, còn interface mô tả các thành viên chung và có thể cung cấp cài đặt mặc định cho một số thao tác. Service chỉ cần hợp đồng tra và lưu. Ở tầng dữ liệu, JsonResearchRepository kế thừa kho bộ nhớ và ghi đè các phương thức Save.",
      points: ["Hợp đồng thao tác", "Chia sẻ trạng thái và cài đặt qua lớp cơ sở", "Service phụ thuộc vào IProjectRepository"],
      followUp: "Từ một biến kiểu IProjectRepository, lời gọi Save đi đến đâu khi đối tượng thật là JsonResearchRepository?"
    },
    {
      id: "state-vs-strategy",
      topic: "State & Strategy",
      difficulty: "Trung bình",
      question: "State và Strategy đều dùng interface. Em phân biệt chúng bằng cách nào?",
      short: "State chọn hành vi theo trạng thái vòng đời. Strategy chọn cách tính theo kiểu báo cáo được yêu cầu.",
      explanation: "Approve của ResearchProject giao cho lớp điều khiển trạng thái do StateFor chọn. PendingState có thể chuyển đề tài sang Active sau khi thỏa điều kiện. Với báo cáo kinh phí, FundingByProjectStrategy và FundingBySourceStrategy cùng có BuildRows nhưng mỗi lớp tự nhóm số liệu. Đổi báo cáo chỉ đổi cách đọc và tổng hợp dữ liệu.",
      points: ["Ai chọn đối tượng cài đặt", "Khoảnh khắc hành vi thay đổi", "Ví dụ duyệt và tổng hợp tiền"],
      followUp: "StateFor dùng switch để chọn State. Riêng chi tiết đó có đủ để gọi là GoF Factory Method không? Em cần kiểm tra thêm điều gì?"
    },
    {
      id: "service-json",
      topic: "Kiến trúc",
      difficulty: "Dễ",
      question: "Vì sao service gọi repository để lưu, thay vì tự ghi file JSON?",
      short: "Service tập trung kiểm tra quyền và điều kiện nghiệp vụ. Repository phụ trách cách dữ liệu được lưu, nhờ vậy em kiểm thử service với kho trong bộ nhớ.",
      explanation: "ConsoleMenu khởi tạo JsonResearchRepository rồi đưa nó vào ProjectService qua constructor. Khi service gọi IProjectRepository.Save, lớp dữ liệu xử lý cả phần lưu trong bộ nhớ và ghi tệp. Khi kiểm thử, đối tượng triển khai có thể là InMemoryResearchRepository. Xem Presentation/ConsoleMenu.cs, Business/Services/ProjectService.cs và Data/JsonResearchRepository.cs.",
      points: ["Presentation kết nối các đối tượng", "Business gọi interface", "Data quyết định cách lưu"],
      followUp: "Nếu đổi từ JSON sang cơ sở dữ liệu, thành phần nào cần cài đặt lại trước tiên?"
    },
    {
      id: "approve-conditions",
      topic: "UC01–UC04",
      difficulty: "Trung bình",
      question: "Cần những điều kiện nào để duyệt đề tài và từng điều kiện được kiểm tra ở đâu?",
      short: "Service kiểm Officer rồi tìm đề tài. State của đề tài kiểm nó đang Pending và có đúng một Leader trước khi ghi lịch sử, chuyển Active và lưu.",
      explanation: "ProjectService.Approve gọi Access.Require, RequiredProject và ResearchProject.Approve. PendingState.Approve đếm số Leader, sau đó gọi ChangeStatus. ResearchProject.AddMember đã ngăn trùng người và ngăn gán thêm một Leader. Hai bước gán người và duyệt bổ sung cho nhau: trong lúc gán có thể chưa có Leader, nhưng khi duyệt phải có đúng một người.",
      points: ["Quyền và tồn tại ở service", "Trạng thái và số chủ nhiệm ở State", "Một lần đổi trạng thái tạo một dòng lịch sử"],
      followUp: "Vì sao có đúng một chủ nhiệm vẫn chưa đủ khi đề tài đã Active?"
    },
    {
      id: "ab-boundary",
      topic: "Điểm nối A–B",
      difficulty: "Khó",
      question: "Luồng nghiệm thu A–B đã nối qua lớp nào và em chỉ ra bằng chứng ở đâu?",
      short: "Menu 16 truyền ResultCompletionEvidence vào ProjectService.Complete. Lớp này triển khai ICompletionEvidence bằng dữ liệu hội đồng và đầu ra trong IResultRepository.",
      explanation: "Complete kiểm vai Officer rồi hỏi điểm hội đồng và đầu ra. ActiveState đổi vòng đời, sau đó service lưu. A-BRIDGE thử riêng bằng FakeCompletionEvidence. B-T20 dùng hội đồng và đầu ra đã ghi trong kho bộ nhớ. Menu 16 dùng cùng kiểu bằng chứng của B trên kho JSON.",
      points: ["ICompletionEvidence ở phía A", "ResultCompletionEvidence đọc kho kết quả của B", "Phạm vi A-BRIDGE, B-T20 và menu 16"],
      followUp: "Lớp nào chịu trách nhiệm biết đề tài đã có điểm thật, và lớp nào thực hiện bước chuyển sang Completed?"
    },
    {
      id: "json-failure",
      topic: "Tình huống & cải tiến",
      difficulty: "Khó",
      question: "Nếu phép ghi JSON thất bại sau khi kho trong bộ nhớ đã được cập nhật, người dùng nhận biết và xử lý thế nào?",
      short: "Menu bắt DataPersistenceException và dừng phiên. Em kiểm tra đường dẫn hoặc quyền ghi rồi mở lại để đối chiếu dữ liệu đọc từ tệp.",
      explanation: "Các Save thường cập nhật kho cơ sở trước khi Persist thay tệp chính bằng tệp tạm, nên bộ nhớ có thể đã đổi khi ghi thất bại. SavePaperWithLink là ca riêng có hoàn tác bài mới và liên kết nếu Persist ném DataPersistenceException. ConsoleMenu vẫn dừng phiên để đọc lại dữ liệu khi khởi động lại.",
      points: ["Bộ nhớ và tệp có thể lệch", "Ghi tệp tạm rồi thay tệp đích", "Menu kết thúc phiên khi lưu lỗi"],
      followUp: "Em sẽ kiểm thử tình huống ghi lỗi thế nào khi chỉ được dùng dữ liệu bản sao?"
    }
  ],

  simulation: {
    title: "Từ đề xuất đến phê duyệt",
    intro: "Mô phỏng học tập bằng JavaScript với dữ liệu minh họa từ seed. Các bước chỉ cập nhật trạng thái hiển thị trong trang. Theo dõi cách luồng UC02–UC03 đi qua menu, service, model và repository của chương trình C#.",
    steps: [
      {
        title: "Chuẩn bị dữ liệu",
        layer: "Presentation",
        call: "ConsoleMenu · chọn vai Researcher (R001)",
        status: "Chưa có đề tài",
        leader: "Chưa gán",
        feedback: "Kịch bản bắt đầu từ dữ liệu seed có nhà nghiên cứu R001, loại C01 và hai đề tài P001, P002. P003 là mã mới. Vai trò chọn từ menu là vai trò minh họa của phiên.",
        kind: "initial"
      },
      {
        title: "Đề xuất P003",
        layer: "Presentation → Business → Data",
        call: "ConsoleMenu (5) → ProjectService.ProposeProject → ResearchProject → IProjectRepository.Save",
        status: "Pending",
        leader: "Chưa gán",
        feedback: "R001 chọn loại C01, nhập tên hợp lệ và ngày bắt đầu 2026-01-01. Bỏ trống ngày kết thúc là hợp lệ. Service kiểm vai trò, hồ sơ R001, loại và mã. Đề tài mới ở Pending rồi được lưu.",
        kind: "success"
      },
      {
        title: "Chuyển vai Chuyên viên",
        layer: "Presentation",
        call: "ConsoleMenu (2) → CurrentUserContext(UserRole.Officer)",
        status: "Pending",
        leader: "Chưa gán",
        feedback: "Menu đổi vai trò của phiên. Quyền Officer được kiểm ở service khi gọi thao tác tiếp theo. Vai trò mới của phiên và danh sách tham gia P003 là hai dữ liệu khác nhau.",
        kind: "neutral"
      },
      {
        title: "Thử duyệt khi thiếu chủ nhiệm",
        layer: "Presentation → Business",
        call: "ConsoleMenu (7) → ProjectService.Approve → ResearchProject.Approve → PendingState.Approve",
        status: "Pending",
        leader: "Chưa gán",
        feedback: "PendingState phát hiện có 0 Leader và ném InvalidOperationException. Service chưa đến bước Save. Menu hiển thị lỗi, đề tài vẫn Pending và chưa có dòng lịch sử phê duyệt.",
        kind: "error"
      },
      {
        title: "Gán R001 làm chủ nhiệm",
        layer: "Presentation → Business → Data",
        call: "ConsoleMenu (6) → ProjectService.AssignMember → ResearchProject.AddMember → IProjectRepository.Save",
        status: "Pending",
        leader: "R001",
        feedback: "Service tìm R001 và P003. Đề tài đang Pending, R001 chưa xuất hiện trong danh sách và chưa có Leader. AddMember thêm một ProjectParticipation rồi service lưu đề tài.",
        kind: "success"
      },
      {
        title: "Duyệt lại P003",
        layer: "Presentation → Business → Data",
        call: "PendingState.Approve → ResearchProject.ChangeStatus → IProjectRepository.Save",
        status: "Active",
        leader: "R001",
        feedback: "P003 đã có đúng một Leader nên điều kiện phê duyệt được thỏa. Model ghi lịch sử Pending → Active với mã tác nhân OFFICER và thời điểm thực hiện, sau đó service lưu trạng thái mới.",
        kind: "success"
      },
      {
        title: "Thử thêm người sau khi duyệt",
        layer: "Presentation → Business",
        call: "ConsoleMenu (6) → ProjectService.AssignMember → ResearchProject.AddMember",
        status: "Active",
        leader: "R001",
        feedback: "R002 có hồ sơ trong seed, nhưng AddMember từ chối vì P003 đã Active. Điều kiện “chỉ sửa thành viên khi Pending” được đặt trong đối tượng đề tài. Danh sách của P003 vẫn giữ nguyên.",
        kind: "error"
      }
    ]
  }
};

