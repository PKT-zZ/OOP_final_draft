# Kiểm thử bản hoàn thiện OOP Studio

## Rà soát lại ngày 25/11/2026

Đối chiếu với cây làm việc C# tại HEAD `8030b34`, gồm các thay đổi sẵn có ở thời điểm kiểm tra.

| Kiểm tra | Kết quả thực tế |
| --- | --- |
| Cấu trúc và dẫn chứng | Node kiểm đủ 12 tài nguyên, 15 chương, 60 tab, 82 câu quiz, 51 câu vấn đáp, 12 flashcards và 7 đề đọc mã. 29 đoạn trích khớp dòng nguồn. |
| Ví dụ C# | Biên dịch và chạy đủ 17 ví dụ độc lập. Đầu ra khớp 17 kết quả công bố. |
| Hai bộ ca C# | Biên dịch ứng dụng và harness bằng `dotnet exec …/sdk/8.0.428/Roslyn/bincore/csc.dll @file.rsp` với tham chiếu .NET 8.0.34, C# 12, nullable và cảnh báo là lỗi. Chạy harness bằng `dotnet` trong thư mục tạm. Kết quả `27/27 ca đạt` (A) và `24/24 ca đạt` (B), mã thoát 0. |
| Demo tích hợp | Chạy console với bản sao cấu hình và seed. P003 đi từ Pending qua Active đến Completed. Kết quả gồm điểm 8,5, một bài báo, một sản phẩm số lượng 2 và tổng kinh phí 250.000.000 đồng. Kiểm từ chối cấp thêm sau khi hoàn thành, bốn báo cáo và tra cứu menu 21 sau khi mở lại. |
| Mô phỏng | Chrome offline kiểm cả sáu màn hình. State minh họa điều kiện bằng cờ giả lập. UC04 kiểm mã trùng, giới hạn số và việc khóa cấp cho P-D Completed dù vẫn giữ 3.000.000 đồng đã cấp. |
| Bài học và quiz | Chrome offline mở đủ 15 chương, chọn cả 60 tab, thử đáp án sai, mở lời giải, chọn đáp án đúng cho cả 82 quiz và làm lại ở từng chương. |
| Luồng học và lưu trữ | Chrome offline kiểm việc gộp thay đổi hai tab, bỏ câu vừa **Đã hiểu** khỏi danh sách cần ôn, focus khi mở menu hẹp, đọc v1, JSON lỗi, lưu trữ bị chặn và tệp tải xuống thật. Bảo vệ thử được kiểm với một lượt có đồng hồ, kết thúc sớm và bắt đầu lại. |
| Vấn đáp, bố cục và offline | Playwright mở `index.html` qua `file://` trên Chrome 158.0.8127.88. Mở gợi ý, lỗi thường gặp và dẫn chứng cho cả 51 câu vấn đáp. Kiểm các màn hình ở 320/390/768/1440 CSS px. Không tràn ngang toàn trang, 0 yêu cầu HTTP(S), 0 lỗi tải tài nguyên và 0 lỗi JavaScript ở các lượt này. |

`git diff --no-ext-diff | git hash-object --stdin` trong checkout C# trước và sau cho cùng giá trị `7756db45ed89e5c335bf1ea0718a2bcb972054ac`. Lệnh build MSBuild tiêu chuẩn và Edge là **NOT RUN** cho lượt này. [Bản đồ học liệu](CONTENT_MAP.md)

## Kết quả lưu từ ngày 22/11/2026

Kiểm tra ngày 22/11/2026. Website chạy với Chrome 157.0.8103.79 trên Windows build 26200. Playwright mở trực tiếp `index.html` qua `file://`, đặt phiên offline và dùng hồ sơ tạm.

| Kiểm tra | Kết quả thực tế |
| --- | --- |
| Cấu trúc và tài nguyên | **PASS.** Node VM kiểm 12 tài nguyên cục bộ, 15 ID chương, 60 tab có nội dung, 82 câu quiz có đáp án/gợi ý/giải thích, 12 ID thẻ, 51 ID vấn đáp, liên kết bài học và phạm vi dòng dẫn chứng. |
| Trích đoạn thực | **PASS.** 27 đoạn khớp từng dòng sau chuẩn hóa CRLF/LF. Có 20 đoạn trong bài và 7 đoạn ở câu đọc mã. |
| Ví dụ C# | **PASS.** 17 chương trình độc lập biên dịch với C# 12, bật nullable và chuyển cảnh báo thành lỗi. Đầu ra chạy khớp 17 nhãn kết quả trên website. |
| Bộ kiểm thử C# | **PASS.** Biên dịch ứng dụng và harness hiện hành bằng `dotnet exec …/sdk/8.0.428/Roslyn/bincore/csc.dll @file.rsp`, dùng bộ tham chiếu .NET 8.0.34. Chạy `dotnet QLNCKH_OOP_FINAL.Tests.dll` trong thư mục tạm. Kết quả `26/26 ca đạt`, mã thoát 0. |
| Demo console | **PASS.** Chạy DLL với bản sao cấu hình và seed ở thư mục tạm. Xem lịch sử D01, đề xuất P003, thử duyệt thiếu chủ nhiệm, gán và duyệt lại, tạo F03, ghi hai đợt cấp và mở hai báo cáo. Đọc snapshot và mở lại chương trình, P003 ở Active với tổng 250.000.000 đồng. |
| Các chương và quiz | **PASS.** Mở 15 chương, chuyển 60 tab, kiểm đường sang chương kế tiếp và cả 82 quiz khi chọn sai, mở/ẩn lời giải, thử đúng và đặt lại. Chuyển giữa lượt tổng hợp và phần kiến thức. |
| Tìm kiếm, sơ đồ và truy vết | **PASS.** Tìm không dấu, chọn quan hệ UML, đổi đối tượng chạy qua interface, đổi mục Code Flow Explorer và tô dòng chú thích mã. |
| Luyện tập | **PASS.** Lật và lọc bộ thẻ, mở đủ 7 đề đọc mã cùng đáp án. Kiểm cả sáu phạm vi bảo vệ thử có thể chọn. Hoàn thành một lượt có đồng hồ, ghi bản nháp và tự đánh giá 5 câu, đạt 4 câu và thấy mục cần ôn. |
| Mô phỏng | **PASS.** Kiểm sáu màn hình, gồm luồng UC02–UC03, alias, State từ chối và chuyển hợp lệ, đổi Strategy, đọc lịch sử đơn vị và từ chối mã cấp trùng hoặc tổng quá phạm vi số. |
| Tiến độ | **PASS.** Đọc lại dữ liệu v1 cũ, đổi giao diện và tải lại, giữ tiến độ khi nhập JSON lỗi, giữ dữ liệu cũ khi localStorage lỗi cấu trúc, khôi phục bằng JSON v1. Tệp xuất được lưu thật xuống thư mục tạm và nhập lại, dữ liệu khớp. |
| Bố cục và offline | **PASS.** Thử các màn hình học, quiz, đọc mã, bảo vệ thử, mô phỏng và tiến độ ở 320/390/768/1440 CSS px. Không tràn ngang toàn trang ở các màn hình đã thử. 0 yêu cầu HTTP(S), 0 lỗi tải tài nguyên và 0 lỗi JavaScript hoặc console. Kiểm thêm mở/đóng sidebar ở 320 px, chuyển focus đến mục cần ôn và khởi động lại lượt bảo vệ thử 10 câu. |

### Phát hiện và xử lý ở bản 22/11

- Một đoạn `Common.cs:14–20` đã bỏ ba dòng chú thích. Đã khôi phục đủ dòng từ tệp nguồn.
- Tìm tên chương với vài từ bị lược có thể xếp nội dung thân bài cao hơn tên đúng. Xếp tiêu đề chứa đủ từ khóa lên trên nội dung khớp trong thân bài.
- Tên phương thức và bộ chọn câu đọc mã mở rộng chiều ngang ở 320 px. Giới hạn cột và cho phép ngắt từ trong vùng nội dung. Khối mã vẫn có thanh cuộn riêng.
- Lỗi đọc tiến độ có thể bị lượt mở bài tự ghi đè. Lượt học tiếp theo chỉ lưu trong phiên cho đến khi nhập bản thay thế hợp lệ.

### Phạm vi kiểm tra ở bản 22/11

Lệnh build MSBuild tiêu chuẩn, Edge và luồng tích hợp thật của B là **NOT RUN**. Ca A-BRIDGE kiểm qua `FakeCompletionEvidence`. Demo console chỉ dùng bản sao seed. Hash của `git diff --no-ext-diff | git hash-object --stdin` trong checkout C# trước và sau lượt là `801d01c8e82c2f63812bd373e0aca6dc79d6469c`.

