# Nguồn sơ đồ UML QLNCKH

Các thư mục `mermaid/`, `pdf/` và `svg/` chứa nguồn và bản xuất dùng trong báo cáo chính. Tọa độ điểm neo và nhãn đã hiệu chỉnh dựa trên bố cục Mermaid CLI 12.2.0 và font đang dùng. Kiểm tra lại các vị trí này khi đổi phiên bản trình kết xuất hoặc font.

Bộ hình được phát triển từ `docs/uml.md` và đối chiếu với mã C# tại `28fb531`. Thư mục `pdf/` chứa từng hình vector để chèn vào LaTeX. Thư mục `svg/` chứa ảnh vector nền trắng, nét đen. Mỗi hình có một tệp `.mmd` cùng tên trong `mermaid/`. Kết quả dàn trang hoàn chỉnh nằm trong PDF của báo cáo chính.

## Danh mục

| Hình | Nội dung |
| --- | --- |
| 01 | Tám nhóm ca sử dụng, ba vai trò và hai thao tác trong UC06 |
| 02 | Kiến trúc ba tầng và các giao diện kho dữ liệu |
| 03 | Các lớp nghiệp vụ và quan hệ chính |
| 04 | Nhân sự, đề tài và kinh phí |
| 05 | Hội đồng nghiệm thu |
| 06 | Bài báo, sản phẩm và liên kết đề tài |
| 07 | Gán thành viên đề tài |
| 08 | Phê duyệt đề tài |
| 09 | Phân bổ kinh phí |
| 10 | Lập và phân công hội đồng |
| 11 | Chủ tịch ghi điểm nghiệm thu |
| 12 | Chuyên viên xác nhận hoàn thành đề tài |
| 13 | Ghi bài báo và lưu liên kết với đề tài |
| 14 | Hợp đồng kiểm tra điểm và đầu ra giữa hai phân hệ |
| 15 | Cấu trúc lớp của mẫu State |
| 16 | Strategy trong tổng hợp báo cáo |
| 17 | Factory Method trong khởi tạo kết quả nghiên cứu |
| 18 | Đề xuất đề tài |
| 19 | Tổng hợp báo cáo theo đề tài bằng Strategy |
| 20 | Vòng đời đề tài và các điều kiện chuyển trạng thái |

Hình 03 lược bớt một số quan hệ để có thể đọc tổng thể. Hình 04–06 cho biết các thuộc tính, thao tác và quan hệ được chọn để phân tích theo từng nhóm nghiệp vụ. Các sơ đồ tuần tự ghi các điều kiện nghiệp vụ cạnh thao tác kiểm tra tương ứng. Sơ đồ kiến trúc ở Hình 02 biểu diễn quan hệ giữa các tầng theo cách nhóm tổ chức mã nguồn.

Số trong bảng là mã tệp nguồn. Số hình in theo thứ tự xuất hiện trong báo cáo chính. Dùng PDF từng hình với chú thích và nhãn LaTeX, giữ tỷ lệ hình khi chọn hướng trang. Bội số ở sơ đồ lớp áp dụng cho hồ sơ hợp lệ đã lưu.

Trong sơ đồ lớp, `«record»` ghi kiểu khai báo C# và dấu `~` ở `ChangeStatus` ghi phạm vi `internal`. Sơ đồ tuần tự dùng đầu lifeline ở dòng tạo và nét đứt đầu mở cho thông điệp tạo đối tượng.

## Xuất lại sau khi sửa nguồn

Chạy từ thư mục này với Mermaid CLI `12.2.0` và Chromium tương thích với Puppeteer. Hình 01 dùng cú pháp `usecase-beta`. Giữ `mermaid.config.json` và `mermaid-print.css` để tái tạo kiểu in trắng đen, khung điều kiện và đầu mở của mũi tạo `--)`.

```powershell
mmdc -i mermaid/08-phe-duyet.mmd -o pdf/08-phe-duyet.pdf -c mermaid.config.json -C mermaid-print.css -b white
mmdc -i mermaid/08-phe-duyet.mmd -o svg/08-phe-duyet.svg -c mermaid.config.json -C mermaid-print.css -b white --no-font-embed
```

Tra cứu chú thích đầu tệp `.mmd` khi cần đối chiếu tên lớp, phương thức hoặc điều kiện với mã C#. Các tệp PDF trong `pdf/` dùng trực tiếp với `\includegraphics` khi dàn trang báo cáo.
