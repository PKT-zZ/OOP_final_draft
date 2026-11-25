(function () {
  'use strict';

  const heading = text => ({ type: 'heading', text });
  const paragraph = text => ({ type: 'p', text });
  const list = items => ({ type: 'list', items });
  const table = (headers, rows) => ({ type: 'table', headers, rows });
  const note = (title, text) => ({ type: 'note', title, text });
  const links = items => ({ type: 'links', items });
  const quiz = (question, options, answer, hint, explanation) =>
    ({ question, options, answer, hint, explanation });

  Object.assign(window.OOPCourse.lessons, {
    presentation: {
      minutes: 24,
      intro: 'Kể một luồng có thể demo, gắn từng nhận định với phương thức cụ thể và dành thời gian nói rõ phần mình đảm nhiệm.',
      goals: ['Giới thiệu bài toán và phạm vi bằng lời của mình.', 'Chọn mức chi tiết phù hợp với 3, 5 hoặc 10 phút.', 'Demo trên bản chạy riêng, kể cả nhánh nghiệp vụ bị từ chối.'],
      related: ['system', 'architecture', 'use-cases', 'testing', 'patterns', 'defense'],
      tabs: {
        theory: [
          heading('Mở đầu bằng nhu cầu của người dùng'),
          paragraph('Nhà nghiên cứu cần gửi đề xuất. Chuyên viên cần xem hồ sơ, phân công người, duyệt và theo dõi kinh phí. Dữ liệu cần lưu qua các phiên. Em nêu ba nhu cầu này trước khi trình chiếu sơ đồ lớp để người nghe biết mỗi lớp giải quyết việc gì.'),
          heading('Phân bổ thời gian'),
          table(['Thời lượng', 'Mốc nói và demo', 'Dấu hiệu đạt'], [
            ['3 phút', '0:00–0:35 bài toán và phạm vi. 0:35–1:20 ba tầng và lớp chính. 1:20–2:30 một luồng duyệt. 2:30–3:00 kết quả và điểm nối B.', 'Nêu đúng ai thao tác, vì sao lần duyệt đầu bị chặn và State đổi gì.'],
            ['5 phút', '0:00–0:45 giới thiệu. 0:45–1:45 lớp và kiến trúc. 1:45–4:15 demo chọn lọc. 4:15–5:00 bằng chứng và giới hạn.', 'Thêm UC04 và đối chiếu hai góc nhìn báo cáo trên cùng dữ liệu.'],
            ['10 phút', '0:00–1:00 mở đầu. 1:00–3:00 kiến trúc và ba mẫu thiết kế. 3:00–6:00 demo phần A. 6:00–8:30 demo nghiệm thu từ dữ liệu chuẩn bị. 8:30–10:00 bằng chứng kiểm thử và giới hạn.', 'Cho thấy một ca từ chối, điểm nối A–B, các báo cáo và tra cứu sau khi mở lại.']
          ]),
          heading('Chuẩn bị trước khi bấm chạy'),
          list([
            'Dùng bản chạy và dữ liệu riêng khởi tạo từ seed. Kiểm tra đường dẫn cấu hình cạnh bản chạy, quyền ghi và mã mới chưa có. Chuẩn bị ảnh trạng thái trước/sau hoặc kết quả kiểm thử đã có để tiếp tục trình bày nếu môi trường gặp lỗi.',
            'Viết sẵn thứ tự menu và giá trị cần nhập. Ngày dùng yyyy-MM-dd, số tiền demo nhập bằng chữ số không định dạng.',
            'Đặt sẵn vị trí code ProjectService.Approve, PendingState.Approve và FundingService.Allocate. Sau mỗi thao tác, giải thích một quy tắc qua đoạn code ngắn.'
          ]),
          note('Khi demo gặp lỗi', 'Đọc thông báo trước. Với mã đã tồn tại, chuyển sang mã mới trên bản riêng hoặc dùng trạng thái đã chuẩn bị để giải thích. Với lỗi ghi tệp, phiên có thể dừng. Dùng ảnh dự phòng và nói rõ bước nào đang trình bày bằng ảnh.')
        ],
        example: [
          { type: 'explorer', title: 'Tập nói theo thời lượng', intro: 'Chọn một kịch bản và bấm đồng hồ riêng. Thay câu chữ theo cách nói của mình, giữ đúng thứ tự đối tượng, thao tác và kết quả.', items: [
            { label: '3 phút · Luồng duyệt đề tài', relation: 'Bài toán → Lớp chính → Duyệt có điều kiện → Điểm nối nghiệm thu', detail: '0:00 • Giới thiệu ứng dụng console C# .NET 8 và phần mình phụ trách từ hồ sơ đến kinh phí. 0:35 • ResearchProject giữ danh sách tham gia và vòng đời. ConsoleMenu đọc lệnh, ProjectService kiểm quyền rồi gọi model, kho JSON lưu thay đổi. 1:20 • Dùng P003 đang Pending, chỉ lần duyệt thiếu chủ nhiệm bị từ chối. Gán R001 làm Leader rồi duyệt lại để chỉ Pending → Active và lịch sử. 2:30 • Chỉ menu 16 dùng ResultCompletionEvidence để nhận điểm và đầu ra cho lần chuyển Active → Completed.' },
            { label: '5 phút · Thiết kế và kinh phí', relation: 'Vai trò → Đề tài → State → Hai báo cáo', detail: '0:00 • Nêu nhu cầu theo dõi hồ sơ, duyệt và cấp tiền. 0:45 • Chỉ ResearchProject có danh sách ProjectParticipation và lịch sử. Giải thích service nhận interface kho. 1:45 • Dùng P003 đã chuẩn bị. Duyệt thiếu Leader rồi gán R001 và duyệt lại. Cấp hai khoản 100 và 150 triệu. Mở báo cáo 11 để chỉ dòng P003 250 triệu, chuyển 12 để chỉ tiền được gom theo nguồn. 4:15 • State chọn hành vi theo vòng đời, Strategy chọn phép tổng hợp. Giải thích sau khi Completed, FundingService giữ nguyên các khoản đã cấp bằng cách chặn đợt mới.' },
            { label: '10 phút · Bảo vệ đầy đủ', relation: 'Bài toán → Ba mẫu thiết kế → Demo A → Nghiệm thu B → Bằng chứng', detail: '0:00 • Giới thiệu Researcher, Officer và CouncilChair trên console. 1:00 • Chỉ quan hệ ResearchProject–ProjectParticipation, các interface kho và ba mẫu State, Strategy, Factory Method. 3:00 • Trình diễn UC03 với lần duyệt thiếu chủ nhiệm, sau đó gán và duyệt lại. Cho xem khoản cấp và hai báo cáo kinh phí. 6:00 • Dùng dữ liệu đã chuẩn bị. Chỉ menu 13–15 để lập hội đồng và chấm điểm, menu 17–18 để ghi đầu ra. Chọn 16 để hoàn thành, rồi tra cứu bằng 21. Nếu cần, thử một lần cấp thêm để thấy đề tài Completed bị khóa. 8:30 • Trình bày A-BRIDGE dùng dữ liệu giả lập, B-T20 dùng kho bộ nhớ và demo mở lại bản sao JSON. Nêu phần mình thực hiện và giới hạn của những ca đã kiểm.' }
          ] },
          heading('Hai phút luyện đọc kết quả'),
          paragraph('Với seed, P001 có F01 80 triệu và F02 50 triệu, P002 có F02 120 triệu. Sau khi P003 nhận thêm F01 100 triệu và F03 150 triệu, hãy tự tính hai báo cáo trước khi mở. Theo đề tài, P001/P002/P003 lần lượt là 130/120/250 triệu. Theo nguồn, F01/F02/F03 là 180/170/150 triệu. Tổng dòng đều là 500 triệu.'),
          links([{ title: 'Mở mô phỏng nghiệp vụ', href: '#simulation' }, { title: 'Ôn các thuật ngữ thiết kế', href: '#lesson/patterns' }])
        ],
        project: [
          heading('Lời nói gắn với menu'),
          paragraph('Đoạn menu duyệt ngắn vì Presentation chỉ nhận mã, gọi nghiệp vụ và in kết quả sau khi lời gọi trả về. Nếu thiếu Leader, exception đi ra vòng lặp menu. Nhánh thành công không in khi service ném lỗi.'),
          {
            type: 'code', title: 'Lệnh duyệt trong menu',
            source: { path: 'QLNCKH_OOP_FINAL/Presentation/ConsoleMenu.cs', lines: [183, 188], symbol: 'ConsoleMenu.Dispatch' },
            code: `            // UC03: Phê duyệt đề tài
            case "7":
                var approveId = Read("Mã đề tài cần phê duyệt: ");
                _projects.Approve(_user, approveId);
                Console.WriteLine($"Đề tài [{approveId}] đã được phê duyệt và chuyển sang trạng thái Active.");
                break;`,
            notes: [{ label: 'Đọc theo thứ tự', text: 'Dòng 185 đọc mã. Dòng 186 gọi ProjectService. Dòng 187 chỉ chạy khi thao tác đã trả về thành công.' }]
          },
          heading('Checklist thực hành trên dữ liệu mẫu'),
          table(['Bước', 'Thao tác ConsoleMenu', 'Bằng chứng để chỉ'], [
            ['UC01', '10 → D01 khi đang ở Officer', 'R001 xuất hiện trong nhiệm kỳ đang mở của D01.'],
            ['UC02', '2 → 2 → R001. Chọn 5 và nhập P003, C01, tên đề tài cùng ngày bắt đầu hợp lệ', 'Mã P003 xuất hiện ở Pending.'],
            ['UC03', '2 → 1. Chọn 7 trước, rồi 6 → P003 → R001 → 1, sau đó 7 lần nữa', 'Lần đầu bị từ chối. Sau gán, duyệt thành công và chuyển Active.'],
            ['UC04', 'Menu 8 nhập F03, Quỹ hỗ trợ nghiên cứu, Tài trợ ngoài. Menu 9 nhập theo thứ tự mã đợt, mã đề tài, mã nguồn, số tiền, ngày. Lượt 1 nhập A004, P003, F01, 100000000, 2026-02-01. Lượt 2 nhập A005, P003, F03, 150000000, 2026-06-01.', 'Từng lần in tổng mới của P003. Tổng cuối là 250 triệu.'],
            ['UC08 kinh phí', '11 theo đề tài, 12 theo nguồn', 'Đối chiếu dòng tổng 500 triệu với cùng dữ liệu seed và hai khoản mới.'],
            ['UC05', 'Officer chọn 13, nhập HD02, P003, 2026-12-01. Chọn 14, nhập HD02, R003, 1.', 'P003 phải Active và chưa có hội đồng. R003 được gán làm Chủ tịch.'],
            ['UC06 và UC07', 'Đổi sang CouncilChair R003, menu 15 nhập HD02 và 8.5. Đổi sang Researcher R001, dùng 17 ghi bài có R001 là tác giả liên hệ hoặc 18 ghi sản phẩm loại DT01, số lượng 2 cho P003. Đổi về Officer rồi chọn 16 và nhập P003.', 'ResultCompletionEvidence đọc điểm và đầu ra đã ghi. Lần hoàn thành hợp lệ chuyển P003 sang Completed.'],
            ['UC08 đầu ra và tra cứu', 'Chọn 19/20 xem báo cáo đầu ra. Chọn 21, nhập P003 và Completed. Thử tra lại sau khi mở bản demo.', 'Kết quả có trạng thái, 250 triệu, điểm 8.5 và tóm tắt đầu ra.']
          ]),
          note('Chỉ khẳng định điều có thể chỉ ra', 'Dùng README cho kịch bản A, menu 13–21 và kết quả bản sao JSON cho luồng A–B. Nếu gặp chỗ tài liệu còn gắn nhãn thiết kế, đối chiếu lời gọi hiện tại trong ConsoleMenu và service.')
        ],
        defense: [
          heading('Em đã làm phần nào?'),
          paragraph('Em phụ trách hồ sơ đơn vị và người nghiên cứu, tạo đề tài, gán người, duyệt, nguồn và các đợt cấp. Em dùng State để quản lý vòng đời và hai Strategy kinh phí. Phần B cung cấp ResultCompletionEvidence qua ICompletionEvidence để ProjectService.Complete đọc điểm và đầu ra.'),
          heading('Nếu còn 30 giây, em nói gì về chất lượng?'),
          paragraph('Em lấy một quy tắc và ca kiểm chứng cụ thể. Ví dụ, thử duyệt đề tài chưa có chủ nhiệm. Test kiểm nó vẫn Pending và không ghi lịch sử. Sau khi gán đúng một Leader, lần duyệt thành công chuyển Active và ghi một dòng lịch sử.'),
          heading('Câu hỏi nối tiếp'),
          paragraph('Vì sao không làm tất cả trong switch của menu? Vì sao có fake evidence? Khi đổi báo cáo, vì sao tổng không đổi? Hãy trả lời mỗi câu bằng một vị trí code rồi kể hệ quả khi chạy.'),
          links([{ title: 'Bắt đầu bảo vệ thử', href: '#mock-defense' }])
        ]
      },
      quiz: [
        quiz('Nếu chỉ có 3 phút, luồng nào cho thấy trực tiếp State chi phối hành vi?', ['Xem menu rồi đọc tên lớp', 'Duyệt thiếu Leader, gán rồi duyệt lại', 'Chỉ in danh mục nguồn'], 1, 'Cần cùng thao tác với điều kiện trước/sau khác nhau.', 'Lần đầu bị từ chối, lần sau chuyển Active. Người nghe thấy quy tắc của State và hệ quả trên đối tượng.'),
        quiz('Một câu mở đầu tốt nêu điều gì trước?', ['Nhu cầu gửi đề xuất, duyệt và theo dõi tiền', 'Số dòng code trong từng file', 'Danh sách mọi từ khóa C#'], 0, 'Hãy định vị bài toán cho người nghe.', 'Nêu tác nhân và công việc trước để sơ đồ lớp có ngữ cảnh.'),
        quiz('Sau kịch bản seed và hai đợt mới, riêng P003 tổng bao nhiêu?', ['500 triệu', '150 triệu', '250 triệu'], 2, 'Cộng đúng hai khoản 100 và 150 triệu của P003.', 'P003 có hai đợt tổng 250 triệu. 500 triệu là tổng ba đề tài trong kịch bản.'),
        quiz('ConsoleMenu in thông báo duyệt thành công lúc nào?', ['Sau khi ProjectService.Approve trả về', 'Ngay trước kiểm quyền', 'Mọi lần nhập mã'], 0, 'Đọc thứ tự trong nhánh menu 7.', 'Menu gọi service trước. Exception bỏ qua dòng in thành công.'),
        quiz('Bằng chứng nào phù hợp nhất để nói nghiệm thu đã chạy qua kho JSON và đọc lại sau khi mở console?', ['Ảnh menu 11', 'Lượt dùng menu 16 với hội đồng và đầu ra đã lưu, rồi mở lại và tra cứu 21', 'Dòng enum Completed'], 1, 'Phân biệt test trong bộ nhớ với thao tác đọc lại tệp.', 'Kịch bản qua menu chứng minh phần kết nối và đọc lại với dữ liệu được chuẩn bị. A-BRIDGE riêng kiểm service qua dữ liệu giả lập.'),
        quiz('Vì sao dùng bản chạy riêng khi demo?', ['Browser cần mạng', 'Mọi ID phải đổi mỗi phiên', 'Có trạng thái chuẩn từ seed và dễ lặp lại thử nghiệm'], 2, 'Dữ liệu console được lưu qua phiên.', 'Bản riêng giúp kịch bản có mã mới và tránh tác động dữ liệu đang dùng.'),
        quiz('Khi nói về UC04, câu nào có căn cứ?', ['Số tiền dương, mã đợt duy nhất toàn cục, khóa cấp thêm khi Completed và chặn tràn decimal', 'Nhóm đã triển khai hạn mức ngân sách cho từng quỹ', 'Chỉ Active mới cấp tiền ở Allocate'], 0, 'Đọc điều kiện trạng thái và phép kiểm tổng trước AddAllocation.', 'Allocate từ chối Completed. Khoản cấp hợp lệ còn cần số tiền dương, mã chưa dùng và tổng trong phạm vi decimal.'),
        quiz('Khi đổi từ báo cáo theo đề tài sang theo nguồn, điều gì thay đổi?', ['Trạng thái vòng đời', 'Cách nhóm và cấu trúc từng dòng in', 'Danh sách khoản cấp được ghi xuống tệp'], 1, 'Cả hai Strategy đọc cùng các khoản đã lưu.', 'Điều thay đổi là cách tổng hợp. Các khoản cấp vẫn giữ nguyên.')
      ]
    },
    defense: {
      minutes: 24,
      intro: 'Tập trả lời thành tiếng, chỉ bằng chứng trong code, rồi tự chấm dựa trên điều kiện và hệ quả bạn đã nêu.',
      goals: ['Trả lời theo quy tắc, vị trí và kết quả.', 'Đọc code và dự đoán nhánh chạy trước khi mở đáp án.', 'Chuẩn bị phản biện về giới hạn, điểm nối B và cách kiểm chứng.'],
      related: ['presentation', 'use-cases', 'patterns', 'testing', 'architecture'],
      tabs: {
        theory: [
          heading('Cách trả lời một câu hỏi code'),
          paragraph('Nói thẳng kết quả một câu, rồi cho biết điều kiện được kiểm ở đâu. Kết thúc bằng hệ quả nhìn được ở menu, test hoặc snapshot. Nếu câu hỏi nhắc tới phần thiết kế, chỉ rõ bằng chứng cần bổ sung để coi là chức năng tích hợp.'),
          table(['Khi được hỏi', 'Dạng câu trả lời'], [
            ['Thuật ngữ OOP', 'Định nghĩa một câu, chỉ tên lớp hoặc lời gọi, nói lợi ích và một đánh đổi nếu liên quan.'],
            ['Nghiệp vụ', 'Chỉ tác nhân và dữ liệu đầu vào, đi qua các điều kiện, nêu kết quả cùng trạng thái giữ nguyên hoặc thay đổi.'],
            ['Đọc chức năng', 'Theo nhánh từ trên xuống, dừng ở dòng throw đầu tiên, xác định lời gọi Save đã chạy chưa.'],
            ['Tích hợp A–B', 'Chỉ hợp đồng, implementation và vị trí nối trong menu. Nêu phạm vi riêng của A-BRIDGE, B-T20 và lượt đọc lại JSON.']
          ]),
          note('Tự chấm sau khi nói', 'Đánh dấu một câu đạt khi bạn giải thích được kết quả, chỉ đúng nơi thực thi và phân biệt rõ bằng chứng. Nếu nhớ từ khóa mà chưa tìm được điều kiện, đánh dấu Cần ôn lại và mở đúng chương liên quan.'),
          links([{ title: 'Mở ngân hàng câu hỏi', href: '#defense' }, { title: 'Bảo vệ thử theo chủ đề', href: '#mock-defense' }])
        ],
        example: [
          { type: 'explorer', title: 'Tự trả lời rồi đối chiếu', intro: 'Đọc tình huống, tự nói thành tiếng trong khoảng 45 giây, rồi chọn để đối chiếu các ý cần có.', items: [
            { label: 'Chọn một tình huống', relation: 'Nêu kết quả → Chỉ dòng kiểm → Nói vì sao và cách kiểm', detail: 'Tập giữ phần mở đầu dưới 10 giây. Dùng câu thứ hai để chỉ lớp chịu trách nhiệm và câu cuối để nêu hệ quả hoặc ca kiểm thử.' },
            { label: 'Có Leader và đang Active, duyệt lần hai', relation: 'ResearchProject.Approve → ActiveState.Approve', detail: 'Lần duyệt thứ hai bị từ chối ở ActiveState dù có Leader. Quy tắc số Leader áp dụng khi PendingState phê duyệt lần đầu. Code báo đề tài đã được duyệt, không có lần ChangeStatus mới.' },
            { label: 'Đề tài có 1 đợt F01 và 2 đợt F02', relation: 'BuildRows theo đề tài và theo nguồn', detail: 'Báo cáo theo đề tài tạo một dòng cho đề tài và lấy TotalFunding. Báo cáo theo nguồn lấy từng khoản qua SelectMany, group theo SourceId và cho F01 ghi chú 1 đợt, F02 ghi chú 2 đợt. Giá trị dòng còn phụ thuộc vào tiền từng khoản.' },
            { label: 'Đã có đầu ra nhưng hội đồng chưa chấm', relation: 'ProjectService.Complete → từ chối trước State', detail: 'Với Officer và mã hợp lệ, HasScoredCouncil trả false nên điều kiện từ chối đúng ngay, không gọi HasResearchOutput vì || đoản mạch. Không chuyển trạng thái. Chỉ kết luận về điểm nối trong code.' }
          ] },
          links([{ title: 'Luyện đọc các đoạn C#', href: '#defense/reading' }, { title: 'Ôn điều kiện UC01–UC08', href: '#lesson/use-cases' }])
        ],
        project: [
          heading('Bài đọc: bên cung cấp bằng chứng thực hiện phần nào?'),
          paragraph('Hãy dự đoán thứ tự khi Officer gọi Complete với đề tài Active và bằng chứng đầu ra có nhưng điểm chưa có. Tìm dòng kết thúc thao tác. Sau đó thử đổi giả thiết thành có đủ bằng chứng nhưng đề tài đang Pending.'),
          {
  "type": "code",
  "title": "Điểm nối hoàn thành đề tài",
  "source": {
    "path": "QLNCKH_OOP_FINAL/Business/Services/ProjectService.cs",
    "symbol": "ProjectService.Complete",
    "lines": [
      42,
      51
    ]
  },
  "code": "    public void Complete(CurrentUserContext user, string projectId, ICompletionEvidence evidence)\n    {\n        Access.Require(user, UserRole.Officer);\n        ArgumentNullException.ThrowIfNull(evidence);\n        var project = RequiredProject(projectId);\n        if (!evidence.HasScoredCouncil(projectId) || !evidence.HasResearchOutput(projectId))\n            throw new InvalidOperationException(\"Cần điểm nghiệm thu và ít nhất một đầu ra để hoàn thành đề tài.\");\n        project.Complete(\"OFFICER\", DateTimeOffset.Now);\n        projects.Save(project);\n    }",
  "notes": [
    {
      "label": "Điểm dừng thứ nhất",
      "text": "Bằng chứng không đạt ở dòng 47–48. Điều kiện || đoản mạch, nên thiếu điểm đã đủ để từ chối."
    },
    {
      "label": "Điểm dừng thứ hai",
      "text": "Với bằng chứng hợp lệ, dòng 49 gọi model. PendingState từ chối Complete nên dòng 50 vẫn chưa chạy."
    }
  ]
},
          heading('Dùng được khi trả lời phản biện'),
          paragraph('Bộ test dựng fake để chọn trước hai giá trị bằng chứng và gọi ProjectService. Để chứng minh tích hợp, cần luồng thật tạo hội đồng, ghi điểm, tạo đầu ra rồi hoàn thành qua implementation đọc dữ liệu. Menu hiện có phần hồ sơ, đề tài, kinh phí và hai báo cáo kinh phí.'),
          note('Một cách kiểm bằng chứng', 'Mở CompletionBridge trong QLNCKH_OOP_FINAL.Tests/Program.cs và đọc cả giả lập, điều kiện trước thao tác và kiểm tra trạng thái sau khi chạy.')
        ],
        defense: [
          heading('Cách tự tổ chức một lượt bảo vệ thử'),
          list([
            'Lấy một câu về kiến trúc, một câu UC03 hoặc UC04, một câu đọc mã và một câu về ranh giới A–B. Trả lời từng câu trước khi xem gợi ý.',
            'Đối chiếu với các ý cần có. Phát hiện từ ngữ quá mạnh như “đã nghiệm thu thật” khi bằng chứng đang lấy từ fake.',
            'Mở lại các câu cần ôn ở cuối phiên. Viết một ca kiểm chứng mới bằng đầu vào, hành động, trạng thái và ngoại lệ kỳ vọng.'
          ]),
          heading('Ví dụ phản biện đi sâu'),
          paragraph('Nếu thầy hỏi “Tại sao Save lỗi mà phải dừng?”, hãy theo thứ tự base.Save rồi Persist. Bộ nhớ có thể mang thay đổi đã thất bại khi ghi tệp. Sau khi đọc lại dữ liệu trên đĩa, người dùng có căn cứ rõ hơn về trạng thái đã lưu.'),
          links([{ title: 'Bắt đầu bảo vệ thử', href: '#mock-defense' }, { title: 'Mở ôn tập tổng hợp', href: '#quiz' }])
        ]
      },
      quiz: [
        quiz('Một đáp án tốt về lỗi nghiệp vụ cần đi xa hơn tên exception ở điểm nào?', ['Ghi số dòng code mỗi file', 'Nêu guard nào dừng, Save đã chạy chưa và các dữ liệu còn lại', 'Kể mọi ngoại lệ có thể có trong .NET'], 1, 'Cần giải thích hậu quả của nhánh lỗi.', 'Vị trí dừng cho thấy thứ tự kiểm và dữ liệu có thể đã thay đổi hay chưa.'),
        quiz('Nếu HasScoredCouncil trả false, điều gì xảy ra với HasResearchOutput?', ['Được gọi trước khi xác thực', 'Luôn được gọi hai lần', 'Không được gọi trong biểu thức hiện có'], 2, 'Xét dấu ! và phép ||.', 'Toán hạng trái đã đúng, nên || không cần đánh giá toán hạng phải.'),
        quiz('Officer có đủ bằng chứng nhưng đề tài Pending, ai từ chối?', ['PendingState.Complete', 'FundingBySourceStrategy', 'Department.Rename'], 0, 'Bằng chứng qua được thì service gọi model.', 'Model chọn PendingState. Complete ở đó ném lỗi vì đề tài chưa được duyệt.'),
        quiz('Dấu hiệu phân biệt một câu trả lời mô tả code với một nhận định tích hợp là gì?', ['Có nêu số phiên bản .NET', 'Có chứng cứ đường gọi và dữ liệu thật thay vì chỉ dùng fake', 'Có đọc đúng tên branch'], 1, 'Xem dữ liệu thực và các tầng đã được nối chưa.', 'Tích hợp cần bằng chứng luồng liên kết với dữ liệu hội đồng/đầu ra thật. Fake kiểm phần xử lý điều kiện.'),
        quiz('Với hai đợt F02 cùng đề tài, ghi chú theo nguồn đếm gì?', ['Số đợt cấp trong nhóm nguồn', 'Số chủ nhiệm', 'Số đề tài khác nhau'], 0, 'Đọc nguồn dữ liệu của GroupBy và group.Count.', 'Nhóm được tạo từ các khoản cấp. Hai khoản F02 tạo ghi chú hai đợt, kể cả cùng một đề tài.'),
        quiz('Một bài đọc hỏi thử cấp tiền tràn decimal. Bằng chứng sau lỗi nên gồm gì?', ['Ảnh có chữ đỏ', 'Tên của kiểu decimal', 'Các đợt và tổng trước/sau ở cả đề tài liên quan'], 2, 'Điểm cần chứng minh là thao tác bị từ chối trước đột biến.', 'Kiểm danh sách và tổng tiền trước/sau giúp chứng minh nhánh lỗi không để lại phân bổ dở dang.'),
        quiz('Nếu đổi từ JSON sang DB, nhận định nào phù hợp?', ['Service có thể giữ hợp đồng hiện hành nếu implementation mới giữ hành vi', 'Chỉ đổi phần mở rộng tệp', 'Bỏ luôn mọi điều kiện trong model'], 0, 'Chữ ký không đủ, còn ngữ nghĩa tra và lưu.', 'Cần lớp cài mới cùng kiểm định tính tương đương. Quy tắc nghiệp vụ và các caller có thể được tái sử dụng.'),
        quiz('Nếu bằng chứng được tạo ngay trong menu bằng hai cờ true, em chứng minh được gì?', ['Dữ liệu hội đồng đã chấm thật', 'Luồng kiểm nhận hai giá trị, chưa chứng minh dữ liệu nguồn hợp lệ', 'Chiến lược báo cáo đầu ra hoạt động'], 1, 'Xem hai giá trị đến từ đâu.', 'Giá trị dựng sẵn phù hợp cho mô phỏng hoặc test. Implementation đọc từ dữ liệu thật mới là phần tích hợp.')
      ]
    }
  });
}());
