# Kiểm tra website · Giai đoạn 1

Ngày 21/11/2026. Môi trường Windows build 26200, Chrome 157.0.8103.79 chạy headless qua Playwright đã có trên máy. Mở trực tiếp `file:///…/OOP_Offline_Learning/index.html` với phiên trình duyệt đặt offline. Khung kiểm tra là 1440 × 900 và 390 × 844. Website không cần Playwright hoặc Node để sử dụng.

## Kết quả website

Lượt kiểm tra tương tác tự động trả mã 0, với 14 nhóm kiểm tra đạt. Trong phiên offline có **0 yêu cầu HTTP(S)**, **0 tài nguyên tải lỗi** và **0 lỗi JavaScript hoặc console**.

| Hạng mục | Kết quả quan sát |
| --- | --- |
| Điều hướng và tìm kiếm | Mở các mục trong cả 15 chương, thu gọn nhóm, tìm không dấu, mở kết quả bằng Enter. Lượt kiểm tra cuối xác nhận tên chương khớp chính xác đứng đầu. Chương chưa viết hiển thị trạng thái lộ trình và liên kết đến bài luyện mẫu khi có. |
| Đọc bài và code | Chuyển bốn tab, thấy tô màu cú pháp, mở chú thích code và dùng liên kết đến nội dung bằng bàn phím. |
| Quiz | Chọn cả đáp án sai và đúng ở cả 12 câu, thấy phản hồi và giải thích tương ứng. |
| Tiến độ và giao diện | Đánh dấu đã học, tiếp tục bài gần nhất, đổi sáng/tối và xác nhận sau khi tải lại trang. |
| Flashcards | Lật thẻ, chuyển thẻ, tự đánh dấu và lọc thẻ cần ôn. |
| Mô phỏng | Đi qua 7 bước, kiểm tra 2 bước bị từ chối và nhánh chuyển từ `Pending` sang `Active`. |
| Luyện bảo vệ | Lọc chủ đề và độ khó, đổi câu ngẫu nhiên, dùng đồng hồ 15 giây, dừng đồng hồ, mở gợi ý và tự đánh dấu. |
| Nhập tiến độ | Nhập được JSON hợp lệ, cập nhật giao diện và tiến độ. JSON lỗi báo lỗi và giữ dữ liệu hiện tại. |
| Xuất tiến độ | Nút tạo đúng payload JSON và phát sự kiện tải với tên `oop-studio-tien-do.json`. |
| Khi bị chặn lưu | Trang hiện thông báo, các thao tác trong phiên và tạo payload xuất vẫn hoạt động. |
| Kích thước màn hình | Kiểm tra sáu màn hình trên desktop và mobile. Cả bốn tab hiện trọn vẹn ở 320, 390 và 1440 px. Không có cuộn ngang ở cấp trang. Đoạn code dài cuộn trong vùng code. |

Đã xem ảnh chụp trang tổng quan và màn hình đọc code trên hai kích thước. Việc ghi tệp tải xuống ra đĩa là **chưa xác minh** vì trình duyệt headless của môi trường này hủy cả lượt tải tệp văn bản đối chứng. Microsoft Edge và các trình duyệt khác chưa có kiểm tra đầy đủ. Để kiểm tra đường tải xuống trên hồ sơ trình duyệt thường, vào **Tiến độ của tôi**, chọn **Xuất JSON**, rồi nhập tệp vừa tải.

## Đối chiếu học liệu

- `node --check` thoát mã 0 trên cả bốn tệp JavaScript. Kiểm tra cấu trúc nội dung bằng Node VM xác nhận 5 phần, 15 chương, 4 bài mẫu, 12 câu quiz, 12 flashcards, 8 câu vấn đáp và 7 bước mô phỏng. Các ID liên kết bài đều hợp lệ.
- So khớp cả 7 trích đoạn với các dòng được dẫn trong cây làm việc `QLNCKH_OOP_FINAL`, bỏ khác biệt kiểu xuống dòng và thụt lề bao quanh. Cả 5 ví dụ C# độc lập được biên dịch riêng bằng Roslyn C# 12 với assembly tham chiếu .NET 8 và chế độ cảnh báo thành lỗi. Cả 5 đều thoát mã 0.

## Bằng chứng từ dự án C#

Trong bản sao tạm, `dotnet build QLNCKH_OOP_FINAL.csproj -m:1 -p:NuGetAudit=false` dừng ở NuGet targets với `Access to the path is denied`; lệnh `dotnet run --project …Tests.csproj` thông thường **NOT RUN**. Để kiểm tra cây mã đang dùng, đã biên dịch trực tiếp 18 tệp ứng dụng và một tệp kiểm thử trong thư mục tạm bằng `dotnet exec …/sdk/8.0.428/Roslyn/bincore/csc.dll`, C# 12, .NET 8.0.34 và các import mặc định của project. Cả hai lệnh biên dịch thoát mã 0, không có chẩn đoán.

Chạy `dotnet .\QLNCKH_OOP_FINAL.Tests.dll` từ thư mục tạm in **`Kết quả: 26/26 ca đạt.`**, mã thoát 0. Ca nối A–B dùng `FakeCompletionEvidence`. Lần chạy này kiểm tra bộ kiểm thử hiện hành của A. Luồng hội đồng và đầu ra dùng dữ liệu thật **NOT RUN**. Ứng dụng console và dữ liệu `data/nckh.json` nằm ngoài lần kiểm tra này.
