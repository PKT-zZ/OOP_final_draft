# Bản đồ nội dung OOP Studio

Mốc đối chiếu 25/11/2026. Các đường dẫn mã C# trong bảng tính từ checkout đã tích hợp A–B. Trích đoạn lấy từ cây làm việc của nhánh `feature/projects-funding` ở HEAD `8030b34` cùng các sửa đổi sẵn khi rà soát. [QLNCKH_OOP_FINAL](../QLNCKH_OOP_FINAL/)

Các liên kết đi ra ngoài thư mục website, gồm mã nguồn, UML, đặc tả, checklist và báo cáo dự án, cần mở từ workspace đầy đủ. Khi chỉ có ZIP website, dùng các đoạn trích và thông tin tệp, phương thức, số dòng đã kèm trong từng bài.

| Chương | Tình trạng | Vị trí đọc chính |
| --- | --- | --- |
| 1. Tổng quan về OOP | Hoàn chỉnh · 12 phút | `Business/Models/People.cs:4–19`, lớp `Department` |
| 2. Nền tảng C# | Hoàn chỉnh · 16 phút | `Business/Services/ProjectService.cs:7–22`, `ProposeProject`. `Business/Services/PeopleService.cs:41–48`, `GetHeadHistory` |
| 3. Đóng gói | Hoàn chỉnh · 15 phút | `Business/Models/Projects.cs:40–53,68–77`, dữ liệu riêng và `AddMember` |
| 4. Trừu tượng hóa | Hoàn chỉnh · 18 phút · 5 quiz | `Business/Interfaces/Repositories.cs:17–24`, trích `IProjectRepository`. Liên hệ `IPeopleRepository` và `ICompletionEvidence` |
| 5. Kế thừa | Hoàn chỉnh · 18 phút · 5 quiz | `Data/JsonResearchRepository.cs:49–53`, trích các override `Save` |
| 6. Đa hình | Hoàn chỉnh · 17 phút · 5 quiz · chọn đối tượng tương tác | `Business/Models/Projects.cs:135–141`, trích `StateFor` |
| 7. Quan hệ giữa các lớp | Hoàn chỉnh · 18 phút · 5 quiz · UML Explorer | `Business/Models/Projects.cs:17–30`, trích `ProjectParticipation`. [UML](../QLNCKH_OOP_FINAL/docs/uml.md) |
| 8. Tổ chức mã hướng đối tượng | Hoàn chỉnh · 20 phút · 5 quiz | `Presentation/ConsoleMenu.cs:22–30`, constructor truyền kho vào các service A và B |
| 9. Design Patterns | Hoàn chỉnh · 17 phút | `PendingState.Approve`, `FundingBySourceStrategy.BuildRows` và `ResearchOutputCreator.Build/Create` |
| 10. Tổng quan QLNCKH | Hoàn chỉnh · vai trò, thực thể, A–B, giới thiệu 2 phút | `Business/Models/Common.cs:14–20`. [Đặc tả](../QLNCKH_OOP_FINAL/docs/scope.md) |
| 11. Kiến trúc và luồng xử lý | Hoàn chỉnh · Code Flow Explorer | `Program.cs:5–11`, `ConsoleMenu.ReadOptionalDate`, `JsonResearchRepository.Load/Persist` |
| 12. Phân tích Use Case | Hoàn chỉnh · UC01–UC08, tình huống và luồng A | `PeopleService`, `ProjectService`, `FundingService`, đặc tả và UML |
| 13. Kiểm thử, dữ liệu và giới hạn | Hoàn chỉnh · Test Case Explorer | `QLNCKH_OOP_FINAL.Tests/Program.cs`, ca A-T07, bằng chứng giả lập và ca giới hạn |
| 14. Chuẩn bị thuyết trình | Hoàn chỉnh · kịch bản 3/5/10 phút và demo | [Kịch bản demo A](../QLNCKH_OOP_FINAL/README.md#5-kịch-bản-trình-diễn-uc01uc04) và sơ đồ UC03/UC04 |
| 15. Ngân hàng câu hỏi bảo vệ | Hoàn chỉnh · 51 câu, trong đó 7 câu đọc mã | `content/practice.js`, `content/defense-practice.js` và dẫn chứng riêng theo từng câu |

## Khảo sát dự án

Menu dùng `CurrentUserContext` để mô phỏng vai trò người thao tác. `Researcher` đề xuất và ghi đầu ra khi đủ điều kiện. `Officer` quản lý, gán, duyệt, cấp kinh phí, lập hội đồng và xác nhận hoàn thành. `CouncilChair` chỉ được ghi điểm cho hội đồng mình chủ trì. `ProjectRole.Leader` và `ProjectRole.Member` mô tả việc tham gia một đề tài.

| Ca sử dụng | Phạm vi và tình trạng đã đối chiếu | Điểm đọc |
| --- | --- | --- |
| UC01 · A | Chuyên viên lưu hồ sơ đơn vị, nhà nghiên cứu và đọc lịch sử lãnh đạo. | `PeopleService.SaveDepartment/SaveResearcher/GetHeadHistory`. Menu 3, 4, 10. |
| UC02 · A | Nhà nghiên cứu hợp lệ đề xuất. Mã được chuẩn hóa trước khi tra trùng. Hồ sơ mới ở `Pending`. | `ProjectService.ProposeProject`. Menu 5. |
| UC03 · A | Chuyên viên gán người và phê duyệt. Duyệt yêu cầu `Pending` và đúng một chủ nhiệm. | `ProjectService.AssignMember/Approve`, `ResearchProject.AddMember`, `PendingState.Approve`. Menu 6, 7. |
| UC04 · A | Chuyên viên khai nguồn và cấp số tiền dương cho đề tài chưa Completed. Service chặn mã đợt trùng toàn hệ thống và thử cộng tổng để phát hiện tràn `decimal` trước khi sửa dữ liệu. Menu đọc số đồng nguyên dương. | `FundingService.SaveSource/Allocate`, `ConsoleMenu.ReadFundingAmount`. Menu 8, 9. |
| UC05 · B | Officer lập tối đa một hội đồng cho đề tài Active và gán người. Một người tham gia một lần, tối đa một Chủ tịch. Danh sách khóa sau lần ghi điểm đầu tiên. | `EvaluationService.CreateCouncil/AssignMember`, `EvaluationCouncil.AddMember`. Menu 13, 14. |
| UC06 · B và điểm nối A | Chủ tịch đúng hội đồng ghi điểm 0–10 khi đề tài Active. Officer hoàn thành khi có điểm và ít nhất một đầu ra. | `EvaluationService.RecordScore`, `ProjectService.Complete`, `ResultCompletionEvidence`. Menu 15, 16. |
| UC07 · B | Người tham gia đề tài Active ghi sản phẩm hoặc bài báo. Người ghi bài báo phải thuộc danh sách tác giả. Hai lớp Creator ghi đè `Create` để tạo đầu ra phù hợp. | `OutputService.AddPaper/AddDeliverable`, `ResearchOutputCreator.Build/Create`. Menu 17, 18. |
| UC08 · A và B | Menu 1 liệt kê đề tài. Menu 11/12 tổng hợp kinh phí, 19/20 tổng hợp đầu ra. Menu 21 cho Officer tra mã và trạng thái, kèm kinh phí, điểm và đầu ra. | `ReportService.Generate`, `IReportStrategy`, `ProjectLookupService.Search`. |

### Đường đi của dữ liệu

1. `Program.cs` khởi chạy `ConsoleMenu.Run`. Menu đọc và chuyển đổi dữ liệu nhập, chọn service theo tác vụ và bắt lỗi để hiển thị.
2. `ConsoleMenu` truyền cùng một `JsonResearchRepository` vào các service A. Service nhận kiểu interface, kiểm quyền `CurrentUserContext` và tra dữ liệu. Model giữ quy tắc thuộc đối tượng, chẳng hạn `ResearchProject.AddMember` giới hạn chủ nhiệm và State quyết định chuyển trạng thái.
3. Service gọi lưu qua repository. `JsonResearchRepository` kế thừa kho bộ nhớ, khởi tạo từ cấu hình và snapshot, rồi ghi qua `Persist` ở dòng 225–254. Riêng `SavePaperWithLink` ghi bài báo và liên kết cùng lượt và hoàn tác hai đối tượng mới nếu Persist báo lỗi.
4. Mã đề tài và mã nhà nghiên cứu là khóa chung. `ResultCompletionEvidence` triển khai `ICompletionEvidence` để trả lời đề tài đã có điểm và đầu ra chưa. `IReportStrategy` trả các dòng báo cáo có cấu trúc chung. [Hợp đồng A–B](../NckhOop/docs/contracts.md)

### Nguồn và điểm lệch cần nhớ

- Báo cáo sau sửa mã định danh ghi các mốc 14 và 22 ca lịch sử. Đối chiếu kết quả trên cây mã đang dùng trong báo cáo kiểm thử của website. [Báo cáo dự án](../NckhOop/Bao_cao_OOP_Sau_sua_ma_dinh_danh.pdf) · [Gói LaTeX đi kèm](../NckhOop/Bao_cao_OOP_Sau_sua_ma_dinh_danh_LaTeX.zip) · [Kiểm thử hiện hành](TEST_REPORT_FINAL.md)
- Đặc tả và UML trong checkout còn gọi một số chức năng B là dự kiến. README và các nhánh menu 13–21 đã mô tả luồng tích hợp. UML của Creator dùng tên `CreateOutput`. Cài đặt hiện tại gọi `Create(OutputDraft)` qua `Build`. [Đặc tả](../QLNCKH_OOP_FINAL/docs/scope.md) · [UML](../QLNCKH_OOP_FINAL/docs/uml.md) · [Mã Creator](../QLNCKH_OOP_FINAL/Business/Services/ResearchOutputCreators.cs)
- Checklist lịch sử ghi tối đa một tác giả liên hệ. `Paper.Validate` yêu cầu đúng một tác giả liên hệ. [Checklist](../Checklist_Tien_do_BTL_OOP_3_tuan.md) · [Mã Paper](../QLNCKH_OOP_FINAL/Business/Models/outputs.cs)
- Trích đoạn ghi tệp, ký hiệu và phạm vi dòng. Các mô phỏng chạy bằng JavaScript với dữ liệu mẫu. Công cụ State dùng hai cờ giả lập để học quy tắc. Console dùng ResultCompletionEvidence để truy vấn hồ sơ đã ghi.
