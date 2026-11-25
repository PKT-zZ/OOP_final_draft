# Báo cáo rà soát và khắc phục Giai đoạn 1

Ngày 22/11/2026.

## A. Tổng quan

- Workspace `E:\TTSS+OOP\OOP`. Website ở `OOP_Offline_Learning/`, cạnh checkout C# `QLNCKH_OOP_FINAL/`. Checkout C# đang ở nhánh `feature/projects-funding`, HEAD `fb3e20d`, với 10 tệp đã có thay đổi từ trước. Website nằm ngoài checkout Git này.
- Đã tìm `BAO_CAO_DANH_GIA_OOP_OFFLINE_GD1.md` bằng `rg --files -uuu` trong workspace và không thấy tệp. Căn cứ rà soát gồm danh sách 9 vấn đề trong yêu cầu, toàn bộ nội dung bốn bài học và bộ luyện, [kết quả kiểm tra Giai đoạn 1](TEST_REPORT.md), [đặc tả](../QLNCKH_OOP_FINAL/docs/scope.md), [UML hiện hành](../QLNCKH_OOP_FINAL/docs/uml.md), mã C# và bộ kiểm thử liên quan. Các liên kết sang checkout cần workspace đầy đủ.
- Trước và sau đều có 4 bài đã mở (chương 1, 2, 3, 9), 15 chương trong lộ trình, 7 trích đoạn dự án, 12 câu quiz, 12 flashcards, 8 câu vấn đáp và 7 bước mô phỏng. Bộ ví dụ C# tự viết tăng từ 5 lên 8 do chia bài C# thành các chương trình ngắn. Tìm kiếm, sáng/tối, đánh dấu đã học và nhập/xuất tiến độ tiếp tục dùng cùng ID và định dạng v1.

## B. Đánh giá 9 vấn đề

| Mã | Trạng thái | Bằng chứng và ảnh hưởng | Xử lý |
| --- | --- | --- | --- |
| 01 | **PARTIAL** | `FundingService.cs:18–41` thực sự cộng tổng của mọi đề tài với khoản mới trước khi thay đổi dữ liệu. Dòng 25–26 kiểm mã trùng, dòng 30–37 bắt tràn `decimal`. Câu cũ nói có kiểm tổng nhưng thiếu mục đích, dễ bị hiểu thành kiểm hạn mức. Ảnh hưởng cao khi giải thích UC04. | Viết lại thẻ `money` ([practice.js](content/practice.js), dòng 72–75). Làm rõ cùng quy tắc trong bài C# và [CONTENT_MAP.md](CONTENT_MAP.md) ở hàng UC04. |
| 02 | **IMPROVEMENT** | Bài C# có bảng tra cứu chính xác ở mức nhập môn nhưng ví dụ cũ gộp `Dictionary`, `Student`, LINQ và xử lý lỗi trong 35 dòng. Người mới khó theo dấu từng thao tác và kết quả. Ảnh hưởng vừa. | Chia ví dụ thành bốn chương trình 7–12 dòng. Có cú pháp, thao tác, đầu ra và liên hệ code. Làm rõ `private set`, constructor, `static` và nullable. [lessons.js](content/lessons.js), mục `csharp` từ dòng 168. |
| 03 | **PARTIAL** | Bài cũ đã giải thích trạng thái và số tiền trước/sau bằng chú thích. Hai ví dụ mới chỉ khai báo kiểu, chưa có lời gọi chạy được để người học thử. Ảnh hưởng vừa. | Thêm tạo `Lamp`, gọi `Press()` hai lần và in `False / True / False`. Thêm hai lần gọi cùng `Checkout.Total`, đổi đối tượng tính phí và in `100000 / 125000`. Liên hệ `IProjectState` và `IReportStrategy`. [lessons.js](content/lessons.js), dòng 523–600. |
| 04 | **CONFIRMED** | Chrome trước sửa xác nhận nút **Bài tiếp theo** ở chương 3 trỏ thẳng sang chương 9 vì chỉ lấy mục trong danh sách bài đã mở. Người học có thể bỏ qua chương 4–8 mà không biết. Ảnh hưởng vừa. | Chương 3 chỉ rõ chương 4 chưa mở và có nút riêng sang bài đã mở tiếp theo. Chương 9 nhắc kiến thức tiên quyết ở cả đường dẫn trực tiếp. [app.js](scripts/app.js), dòng 327–369. |
| 05 | **CONFIRMED** | Chrome trước sửa xác nhận chọn sai hiện luôn lời giải đầy đủ. Đây là hành vi cũ của tính năng, làm giảm cơ hội tự sửa. Ảnh hưởng vừa. | Tách gợi ý và lời giải. Có thể thử lại, chủ động xem hoặc ẩn lời giải và làm lại quiz. Chọn đúng hiện đáp án kèm giải thích. [app.js](scripts/app.js), dòng 278–325, nhánh thao tác quiz từ dòng 609. |
| 06 | **PARTIAL** | Sơ đồ cũ đã bố trí thành thẻ trực quan, nhưng dữ liệu dạng danh sách chưa thể hiện rõ hai đối tượng cùng kiểu hoặc hai kết quả của UC03. Ảnh hưởng thấp đến vừa. | Nối nhánh bằng HTML/CSS cho sơ đồ `Student` và phê duyệt UC03. [lessons.js](content/lessons.js), dòng 59–66 và 603–611. [study.css](study.css), dòng 345–381. |
| 07 | **IMPROVEMENT** | Chú thích cũ giải thích theo khối. Với ví dụ có nhiều điều kiện hoặc nhiều toán tử nối nhau, phải tự dò lệnh trong đoạn dài. Ảnh hưởng vừa trên màn hình nhỏ. | Hiện số dòng gốc và tô dòng khi mở chú thích cho `ProjectService.ProposeProject` và `FundingBySourceStrategy.BuildRows`. [app.js](scripts/app.js), vùng hiển thị từ dòng 256 và xử lý mở chú thích từ dòng 726. |
| 08 | **CONFIRMED** | `CONTENT_MAP.md` trỏ tới checkout C#, báo cáo, checklist và UML bên ngoài thư mục website. ZIP riêng chỉ có website sẽ không có các tệp này. Ảnh hưởng thấp, liên quan đến việc tra nguồn. | Ghi rõ yêu cầu workspace đầy đủ trong [README.md](README.md), mục Học liệu, và [CONTENT_MAP.md](CONTENT_MAP.md), dòng 5. |
| 09 | **DEFERRED** | Bản cũ giữ lần chọn quiz trong bộ nhớ của trang. `scripts/progress.js` lưu v1 cho bài hoàn thành, giao diện, bài gần nhất, thẻ và câu vấn đáp. Lưu từng câu quiz là một chức năng bổ sung. | Giữ quiz trong phiên để người học đổi bài rồi quay lại hoặc làm lại. Không thêm trường, migration hoặc thay ID v1. |

### Đối chiếu nội dung và nghiệp vụ

- **Chương 1 và 3.** Đối chiếu class với từng object, phân biệt setter riêng, field `readonly` và lớp bọc `AsReadOnly()`. `Department.Rename` kiểm tên trước khi gán. `ResearchProject.AddMember` kiểm `Pending`, mã người chưa có trong đề tài và tối đa một `Leader`. `ProjectParticipation` kiểm giá trị enum hợp lệ. Giữ nguyên quy tắc nghiệp vụ trong học liệu. [People.cs](../QLNCKH_OOP_FINAL/Business/Models/People.cs) · [Projects.cs](../QLNCKH_OOP_FINAL/Business/Models/Projects.cs)
- **Chương 2 và UC02–UC04.** Người thao tác cần vai trò `Researcher` và mã nhà nghiên cứu đã có để đề xuất đề tài. Service kiểm loại, chuẩn hóa mã và tra trùng. Constructor kiểm tên và khoảng ngày, đề tài mới là `Pending`. `Officer` gán, duyệt và cấp kinh phí. Trong `Allocate`, đề tài và nguồn phải tồn tại, mã đợt cấp đã chuẩn hóa phải duy nhất trên toàn bộ đề tài và số tiền phải dương. Ca `A-REVIEW-FUND-RANGE` thử `decimal.MaxValue` ở đề tài thứ nhất rồi thêm 1 ở đề tài thứ hai, kiểm cả hai đối tượng sau khi từ chối. Điều kiện tràn số tách với quy tắc trùng mã. Phương thức cấp tiền hiện không kiểm trạng thái đề tài hoặc một mức ngân sách cấu hình. [ProjectService.cs](../QLNCKH_OOP_FINAL/Business/Services/ProjectService.cs) · [FundingService.cs](../QLNCKH_OOP_FINAL/Business/Services/FundingService.cs) · [Bộ kiểm thử](../QLNCKH_OOP_FINAL/QLNCKH_OOP_FINAL.Tests/Program.cs)
- **Chương 9 và nối A–B.** `PendingState` chỉ duyệt khi có đúng một `Leader`. `ActiveState` là trạng thái cho phép hoàn thành sau khi service kiểm quyền và bằng chứng. `CompletedState` từ chối duyệt hoặc hoàn thành lại. Menu có hai Strategy kinh phí của A. `StateFor` chọn State bằng enum. Factory Method tạo đầu ra và quyền chấm điểm của `CouncilChair` thuộc thiết kế. Ca `A-BRIDGE` dùng bằng chứng giả lập qua `ICompletionEvidence`. [ProjectStates.cs](../QLNCKH_OOP_FINAL/Business/Models/ProjectStates.cs) · [Đặc tả UC05–UC08](../QLNCKH_OOP_FINAL/docs/scope.md)
- **Repository và thiết kế lớp.** Service nhận interface tra cứu và lưu. Menu truyền cùng đối tượng kho JSON cho các hợp đồng kho. `JsonResearchRepository` kế thừa lớp kho bộ nhớ và ghi đè `Save`. Khi ghi snapshot lỗi, menu dừng phiên vì bộ nhớ có thể đã cập nhật. Phần vấn đáp đã làm rõ lớp cơ sở có thể giữ dữ liệu theo từng object, còn interface có thể cung cấp cài đặt mặc định cho thao tác. [ConsoleMenu.cs](../QLNCKH_OOP_FINAL/Presentation/ConsoleMenu.cs) · [JsonResearchRepository.cs](../QLNCKH_OOP_FINAL/Data/JsonResearchRepository.cs)

## C. Tệp thay đổi

- [content/lessons.js](content/lessons.js) chia nhỏ nền tảng C#, bổ sung lời gọi State/Strategy và đầu ra, dữ liệu sơ đồ phân nhánh, gợi ý quiz và khoảng dòng của chú thích.
- [content/practice.js](content/practice.js) làm rõ thẻ kinh phí, cách đọc dấu `:`, câu vấn đáp về interface và trình tự kiểm bằng chứng khi nghiệm thu.
- [scripts/app.js](scripts/app.js) hiển thị lời giải theo yêu cầu, làm lại quiz, hai nút điều hướng khi lộ trình còn khoảng trống, nhắc kiến thức tiên quyết và tô dòng mã liên quan.
- [study.css](study.css) định dạng nhánh sơ đồ, số dòng, kết quả ví dụ và lời giải quiz.
- [README.md](README.md) và [CONTENT_MAP.md](CONTENT_MAP.md) cập nhật hướng dẫn quiz, quy tắc UC04, vai trò và phạm vi các liên kết ngoài ZIP.
- Báo cáo này ghi bằng chứng trước/sau. Kiểm tra đối chiếu bản đầu lượt cho thấy `scripts/progress.js`, ID học liệu và cả 7 trích đoạn giữ nguyên. Trong checkout C#, kết quả `git status --short --branch` và hash của `git diff --no-ext-diff | git hash-object --stdin` trước/sau trùng nhau (`801d01c8e82c2f63812bd373e0aca6dc79d6469c`).

## D. Kết quả kiểm thử

| Kiểm tra | Phương pháp và kết quả |
| --- | --- |
| Cú pháp và cấu trúc | **PASS.** `node --check` thoát mã 0 cho cả 4 tệp JS. Script Node VM kiểm tra 15 ID chương, 4 bài với đủ tab, 12 quiz có gợi ý và đáp án hợp lệ, 12 thẻ, 8 câu vấn đáp, 7 bước, liên kết chương và 6 tài nguyên cục bộ. Kiểm tra bằng Node tìm thấy cả 46 đích liên kết Markdown trong workspace. |
| Mã trích nguyên văn | **PASS.** So sánh trực tiếp nội dung sau chuẩn hóa xuống dòng với 7 phạm vi ở mã C#. Cả 7 khớp từng dòng. Mọi khoảng tô sáng nằm trong trích đoạn được dẫn. |
| Ví dụ tự viết | **PASS.** `dotnet exec …/sdk/8.0.428/Roslyn/bincore/csc.dll` dùng C# 12, assembly tham chiếu .NET 8.0.34 và cảnh báo thành lỗi. Biên dịch rồi chạy từng ví dụ trong thư mục tạm, 8/8 thành công. Sáu kết quả in hiển thị khớp đầu ra thực tế. |
| Bộ kiểm thử C# | **PASS.** Cùng Roslyn và .NET 8.0.34, biên dịch 18 tệp ứng dụng và một tệp kiểm thử hiện hành. `dotnet QLNCKH_OOP_FINAL.Tests.dll` chạy trong thư mục tạm, thoát mã 0, in `Kết quả: 26/26 ca đạt.`. Có `A-ID-FUND-CROSS`, `A-REVIEW-FUND-RANGE` và `A-BRIDGE`. Lệnh build qua MSBuild và chạy ứng dụng với dữ liệu thật **NOT RUN** trong lượt này. |
| Điều hướng và quiz | **PASS.** Chrome 157.0.8103.79 trên Windows build 26200, qua Playwright với `offline: true` và mở trực tiếp `file://`. Đã đi cả 15 chương, chuyển tab ở 4 bài, tìm có và không dấu, so hai đích điều hướng, mở chú thích có tô dòng. Cả 12 câu đã thử sai, mở/ẩn lời giải, thử đúng và đặt lại. |
| Bộ luyện | **PASS.** Lật và chuyển thẻ, lọc cần ôn, giữ đánh dấu của thẻ `money`. Vấn đáp đổi câu ngẫu nhiên, lọc độ khó, bật/tắt giờ, mở gợi ý và tự đánh dấu. Đi đủ 7 bước mô phỏng, kiểm 2 bước bị từ chối, tới `Active` và quay lại đầu. |
| Tiến độ phiên bản 1 | **PASS.** Nạp dữ liệu `localStorage` v1 trước khi tải lại, giữ bài và đánh dấu cũ. Đánh dấu thêm một bài, đổi sang tối rồi tải lại. JSON lỗi giữ nguyên dữ liệu, JSON v1 hợp lệ nhập được. Nhập lại đúng payload đã xuất và so khớp toàn bộ tiến độ sau khi tải lại. |
| Xuất và tải tệp | **PASS.** Nút **Xuất JSON** tạo đúng dữ liệu và tên `oop-studio-tien-do.json` trong lượt hồi quy. Lượt kiểm tra riêng sau đó xác nhận Chrome lưu tệp xuống thư mục tạm, đọc được JSON v1 và nhập lại chính tệp đó, trong cả phiên thường và phiên offline. Lượt hồi quy tổng trước đó gặp `canceled` ở bước ghi tệp. |
| Giao diện và offline | **PASS.** Kiểm tra chín màn hình ở 320, 390 và 1440 CSS px. Sidebar nhỏ mở/đóng được, các tab hiện đủ và mã dài cuộn trong vùng code. Đã xem ảnh chụp sơ đồ UC03 và vùng tô dòng trên màn hình nhỏ. Lượt Chrome offline ghi nhận 0 yêu cầu HTTP(S), 0 lỗi tải tài nguyên và 0 lỗi JavaScript/console. |

## E. Dành cho Giai đoạn 2

- Khi mở chương 4–8, đối chiếu lại thứ tự và nhắc kiến thức tiên quyết ở chương 9. Dùng các ví dụ ngắn hiện có để nối với interface, kế thừa và đa hình.
- Chỉ cân nhắc lưu lịch sử từng câu quiz nếu cần thống kê dài hạn. Khi đó cần giữ khả năng đọc lại bản sao lưu v1.

## F. Kiểm tra thủ công trên Chrome Windows

1. Mở [index.html](index.html) từ File Explorer. Thanh địa chỉ bắt đầu bằng `file://`. Mở chương **Đóng gói**, kéo xuống cuối. Nút theo lộ trình mở chương 4 và báo chưa có bài. Nút bài đã mở tiếp theo dẫn đến chương 9, có nhắc kiến thức nên xem trước.
2. Chọn sai một câu. Trang hiện gợi ý. Chọn **Xem lời giải** hoặc thử đáp án khác. Khi đúng, trang hiện đáp án và giải thích. Bấm **Làm lại quiz** để xóa các lựa chọn của bài hiện tại.
3. Ở chương **Nền tảng C#**, mở **Liên hệ dự án**. Mở chú thích **Dòng 15–18 · Chuẩn hóa trước khi tra**. Bốn dòng được tô sáng, đóng chú thích thì bỏ màu.
4. Ở **Tiến độ của tôi**, chọn **Xuất JSON**. Kiểm tra Chrome đã tải `oop-studio-tien-do.json`. Chọn **Nhập và thay thế tiến độ**, mở lại chính tệp đó rồi tải lại trang. Danh sách bài, đánh dấu ôn và giao diện phải trùng lúc xuất.
