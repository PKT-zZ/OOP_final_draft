# OOP Studio · Học qua bài tập lớn

Website tiếng Việt để học C# và OOP qua bài tập lớn Quản lý nghiên cứu khoa học ở đại học. Bản rà soát 25/11/2026 bám theo mã tích hợp A–B, với 15 chương, 82 câu quiz, 51 câu vấn đáp và 12 flashcards chọn lọc.

## Mở và sử dụng

1. Trên Windows, mở [index.html](index.html) bằng trình duyệt. Giữ các tệp và thư mục con cạnh `index.html` khi sao chép. Website dùng đường dẫn tương đối và chạy trực tiếp với `file://`.
2. Chọn **Bắt đầu học** hoặc dùng ô tìm kiếm ở thanh bên. Có thể gõ không dấu, tên lớp như `ResearchProject` hoặc thuật ngữ như `State`.
3. Mỗi bài có bốn tab. Đọc **Lý thuyết**, thử giải thích **Ví dụ cơ bản**, mở **Liên hệ dự án** để đọc trích đoạn và chú thích, rồi luyện nói với **Câu hỏi bảo vệ**. Quiz cho gợi ý khi chọn sai. Bạn có thể thử lại, mở lời giải hoặc đặt lại quiz. Chọn **Đánh dấu đã học** khi đã tự giải thích được.
4. Dùng **Mô phỏng** để thử từng bước UC02–UC03, đổi vai hay thay bằng chứng giả lập trong State, đổi Strategy và thử các tình huống hồ sơ hoặc cấp tiền. **Quiz theo chủ đề** lấy câu hỏi từ các bài và có một lượt tổng hợp.
5. Mở **Ngân hàng vấn đáp** để chọn phạm vi, chủ đề và độ khó. Chọn **Đọc mã C#** để tự truy vết đoạn mã thật rồi mở các ý cần đạt. **Bảo vệ thử** chọn 5, 7 hoặc 10 câu, có thể tính giờ và ghi câu trả lời. Lượt kết thúc bằng tự đánh giá và liên kết ôn lại.
6. Ở **Tiến độ của tôi**, chọn **Xuất JSON** để sao lưu và **Nhập và thay thế tiến độ** để khôi phục. Bản v1 lưu bài đã học, bài gần nhất, giao diện và đánh dấu thẻ hoặc câu vấn đáp. Số câu quiz đã thử, nội dung tự luận và tổng kết lượt bảo vệ thử chỉ có trong phiên. Nếu thấy cảnh báo lưu, xuất bản sao trước khi đóng trang.

Website chỉ tải HTML, CSS và JavaScript cục bộ. Việc sử dụng không cần cài npm, có máy chủ hoặc chạy project C#. Cơ chế lưu tiến độ của website độc lập với dữ liệu của bài tập lớn.

## Học liệu và cập nhật

- [Bản đồ học liệu](CONTENT_MAP.md) ghi nguồn và tình trạng từng UC. Các liên kết đến tài liệu gốc cần workspace đầy đủ. Các đoạn trích có sẵn khi dùng riêng thư mục website.
- [Kiểm tra bản hoàn thiện](TEST_REPORT_FINAL.md), [tổng kết](FINAL_COMPLETION_REPORT.md) và [cách tự kiểm tra](HUONG_DAN_KIEM_TRA_THU_CONG.md).
- Học liệu chia theo `content/lessons.js`, `core-lessons.js`, `project-lessons.js` và `defense-lessons.js`. Bộ luyện nằm trong `practice.js` và `defense-practice.js`. `scripts/app.js` dựng giao diện, `mock-defense.js` và `simulators.js` chạy tương tác, còn `progress.js` đọc và ghi tiến độ.

### Khi mã bài tập lớn thay đổi

1. Dùng checkout đã được nhóm xác nhận. Đối chiếu đặc tả, lớp/phương thức, đường gọi từ menu và dữ liệu mà kho trả về. Ghi riêng kết quả kiểm tra service, dữ liệu giả lập và luồng tích hợp dùng dữ liệu thật.
2. Kiểm tra đường gọi của `ICompletionEvidence`, `IReportStrategy` và `ResearchOutputCreator` khi cập nhật State, Strategy hay Factory Method. Ghi lại vị trí nguồn và chỗ lệch với tài liệu. [Bản đồ học liệu](CONTENT_MAP.md)
3. Thêm bài vào `OOPCourse.lessons` bằng ID trong lộ trình. Giữ bốn tab, mục tiêu, quiz và liên kết. Với trích đoạn dự án, giữ nguyên code và ghi `source.path`, `source.symbol` và `source.lines` (hai đầu đều tính). Ví dụ tự viết bỏ trường `source`.
4. Giữ ID hiện hữu của bài, thẻ và câu hỏi để dữ liệu tiến độ cũ còn nhận dạng được. Chạy `node --check` trên JS khi có Node, đối chiếu lại trích đoạn, rồi mở `index.html` bằng `file://` để kiểm tra bài, quiz, tìm kiếm và nhập bản sao lưu.
