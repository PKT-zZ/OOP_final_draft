# Mã nguồn báo cáo BTL OOP

Mở PowerShell ở thư mục chứa main.tex và dùng XeLaTeX. Giữ nguyên thư mục report, gồm hình UML trong report/figures và minh chứng gốc trong report/evidence.

Chạy chuỗi lệnh ở mục Biên dịch với tài liệu tham khảo để tạo PDF và cập nhật mục lục. Nếu PDF đang mở và trình xem khóa tệp, đóng tệp hoặc đổi cùng một giá trị -jobname qua các lượt chạy.

- Tên đề tài trong report/metadata.tex dùng cho nội dung và thông tin PDF. Cấu hình trình bày tập trung trong report/format.tex.
- Sửa lời mở đầu trong report/preface.tex, Chương 1 trong report/introduction.tex, Chương 2–6 trong report/body.tex và Chương 7–8 trong report/delivery.tex, report/conclusion.tex. Nội dung phụ lục nằm trong report/run-guide.tex và report/evidence.tex.
- Với bảng và hình, đặt \caption và \label trước nội dung. Dẫn bằng \ref. Dùng \ReportNote{...} bên dưới để ghi chú hoặc ghi nguồn.
- Dùng tabularx với cột L cho văn bản và r cho số. Dùng longtable nếu bảng cần qua trang, với \endfirsthead và \endhead để lặp tiêu đề cột. Dùng booktabs để tạo các đường kẻ ngang cần thiết.
- Mở thêm phụ lục sau \appendix bằng \ReportAppendix{Tên phụ lục}. Tiêu đề, thứ tự A/B và số mục A.1/B.1 được tạo tự động.

### Phân trang

Nếu có mẫu bìa, dùng \ReportCover{report/cover.tex} trước phần đánh số La Mã. Bìa ẩn số trang và không tính vào phần đầu. Mục lục, trang danh mục hình và bảng, lời mở đầu lần lượt dùng i, ii, iii. Hai danh mục lấy tiêu đề và số trang từ chú thích LaTeX. Chương 1 bắt đầu tại trang 1. Mỗi chương mở trên trang mới và số Ả Rập tiếp tục qua tài liệu tham khảo, phụ lục. Ký hiệu A, B, C chỉ dùng để phân biệt phụ lục. Số trang in ở góc trên bên phải.

### Quy chuẩn chèn hình và sơ đồ

Áp dụng cho UML, lưu đồ, biểu đồ, ảnh giao diện và ảnh minh chứng. Đặt **Hình 1** in đậm và tên hình in nghiêng ở dòng kế tiếp, phía trên và cùng mép trái với hình. Căn giữa cả cụm hình, giữ tỷ lệ, bảo đảm sắc nét và không vượt lề. Ghi chú hoặc nguồn đặt dưới hình. Giữ số, tên, hình và ghi chú trong cùng một figure để LaTeX dời cả cụm cùng nhau. Dùng \label sau \caption và tham chiếu bằng Hình~\ref{...}.

Với hình hẹp, dùng một minipage căn giữa, rộng bằng hình, để chú thích căn đúng mép trái. Ưu tiên UML dạng PDF. Kiểm tra chữ trong PDF và chia sơ đồ quá lớn nếu cần.

### Chèn mã nguồn

    \begin{ReportCode}[numbers=none]{Tên mô tả đoạn mã}{lst:vi-du}
    // Dán đoạn C# cần trình bày.
    \end{ReportCode}
    \ReportCodeSource{\code{Business/Services/TenService.cs}}

Hoặc dùng \ReportCodeFile[firstline=10,lastline=25,firstnumber=10]{Tên mô tả}{lst:vi-du}{duong-dan.cs}. Bỏ tùy chọn numbers=none để đánh số dòng. Dẫn bằng \ReportCodeRef{lst:vi-du}. Khối mã dùng monospace 10 pt và đọc trực tiếp Unicode qua fvextra. Dòng dài ngắt ở khoảng trắng để giữ nguyên định danh. Có thể dùng highlightlines={16} để nhấn dòng cần phân tích bằng nền xám nhạt. Chọn phần mã trực tiếp phục vụ lập luận và ghi rõ đoạn bị lược.

Dùng các môi trường ReportTerminal, ReportJson và ReportOutput cho lệnh, JSON và kết quả chạy. Dùng \code{...} cho tên lớp, phương thức hoặc đường dẫn ngắn. Với một định danh dài hơn cả chiều ngang khối mã, chọn đoạn trích hẹp hơn hoặc định dạng lại có chú thích rõ ở nguồn.

Dòng gốc có số, phần tiếp diễn chỉ thụt thêm. Để bảo vệ một chuỗi dài trong đoạn trích chèn trực tiếp, thêm tùy chọn commandchars=§«» vào ReportCode rồi đặt chuỗi, kể cả dấu ngoặc kép, bên trong §ReportLiteral«…». Ba ký hiệu điều khiển và tên lệnh chỉ dùng trong LaTeX. PDF giữ nguyên chuỗi C# và có thể xuống dòng ngay trước chuỗi nếu cần. Với một chuỗi rộng hơn cả khối mã, chọn đoạn trích khác.

### Biên dịch với tài liệu tham khảo

Khai báo mỗi nguồn APA 7 một lần trong report/references.tex bằng \ReportDeclareSource{mã}{tác giả để dẫn}{năm}{mục danh mục}. Giữ thứ tự chữ cái theo tác giả và dẫn bằng \ReportCite{mã}. Chạy thêm một lượt XeLaTeX nếu log còn yêu cầu cập nhật tham chiếu.

    xelatex --disable-installer -interaction=nonstopmode -halt-on-error -jobname=Bao_cao_QLNCKH_OOP_BIEN_TAP main.tex
    xelatex --disable-installer -interaction=nonstopmode -halt-on-error -jobname=Bao_cao_QLNCKH_OOP_BIEN_TAP main.tex

### Minh chứng của bản tích hợp

Mã nguồn ứng dụng đối chiếu tại commit `28fb531f270ac358725c6c35e261be164b4016f6` của `main`. Thư mục `report/evidence/` giữ minh chứng build, test, publish và demo của bản này. Phụ lục giải thích cách chạy và chỉ tới các tệp đầy đủ. Khi biên dịch, XeLaTeX dùng trực tiếp các hình PDF đi kèm.

Thư mục report/figures chứa 20 sơ đồ PDF vector của bản báo cáo. XeLaTeX dùng các tệp này và kích thước cắt lề trong report/uml-trim.tex khi dựng báo cáo.

Gói nguồn có thư mục uml-source với 20 tệp Mermaid, cấu hình và CSS in trắng đen. Để dựng lại một sơ đồ, chạy Mermaid CLI 12.2.0 từ thư mục đó, ví dụ `mmdc -i mermaid/01-use-case.mmd -o 01-use-case.pdf -c mermaid.config.json -C mermaid-print.css -b white`.

## Quy ước trình bày

Khung dựa trên [hướng dẫn bài viết sinh viên APA 7](https://apastyle.apa.org/instructional-aids/student-paper-setup-guide.pdf) về lựa chọn font Times New Roman 12 pt, lề 2,54 cm, thụt đầu dòng 1,27 cm, số trang ở góc phải trên, chú thích hình và bảng, trích dẫn tác giả và năm và thụt treo danh mục nguồn.

Điều chỉnh cho báo cáo kỹ thuật gồm giấy A4, văn bản căn đều hai bên, giãn dòng 1,5, mục lục tự động, đề mục đánh số tối đa ba cấp và khối mã đơn sắc. Bảng, chú thích và mục lục dùng giãn dòng gọn hơn. PDF mở thẳng ở mục lục. Ưu tiên mẫu của giảng viên nếu có quy định riêng.

## Đối chiếu checklist giảng viên

Tệp đối chiếu trong thư mục báo cáo ghi lại các tiêu chí của sheet **Nhóm 02 người**, dòng 6–25. Số trang đối chiếu là số in trên PDF. Khi cập nhật nguồn, cần biên dịch lại để đồng bộ mục lục, danh mục và các tham chiếu.
