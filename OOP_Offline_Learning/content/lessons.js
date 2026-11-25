window.OOPCourse = {
  sections: [
    {
      title: "Nhập môn",
      chapters: [
        { id: "oop", title: "Tổng quan về OOP", summary: "Phân biệt lớp, đối tượng, trạng thái và hành vi qua ví dụ sinh viên và đơn vị." },
        { id: "csharp", title: "Nền tảng C# phục vụ OOP", summary: "Đọc chữ ký, constructor, kiểu dữ liệu, collection, LINQ và exception trong mã UC01–UC04." }
      ]
    },
    {
      title: "Cốt lõi OOP",
      chapters: [
        { id: "encapsulation", title: "Đóng gói", summary: "Giữ dữ liệu hợp lệ bằng property, phương thức nghiệp vụ và danh sách chỉ đọc." },
        { id: "abstraction", title: "Trừu tượng hóa", summary: "Chọn chi tiết cần đưa ra ngoài. Đọc hợp đồng repository và so sánh interface với abstract class." },
        { id: "inheritance", title: "Kế thừa", summary: "Hiểu quan hệ is-a và xem kho JSON mở rộng kho trong bộ nhớ." },
        { id: "polymorphism", title: "Đa hình", summary: "Theo dấu cùng một lời gọi qua interface tới các cách thực thi khác nhau." },
        { id: "relationships", title: "Quan hệ giữa các lớp", summary: "Nhận biết association, aggregation, composition và quan hệ phụ thuộc khi đọc UML." }
      ]
    },
    {
      title: "Thiết kế OOP",
      chapters: [
        { id: "organization", title: "Tổ chức mã hướng đối tượng", summary: "Phân chia trách nhiệm, dùng Dependency Injection và liên hệ các nguyên lý SOLID." },
        { id: "patterns", title: "Design Patterns", summary: "Theo dõi State của đề tài, Strategy báo cáo và Factory Method tạo đầu ra trong mã tích hợp." }
      ]
    },
    {
      title: "Hiểu bài tập lớn",
      chapters: [
        { id: "system", title: "Tổng quan hệ thống QLNCKH", summary: "Tác nhân, thực thể, phân công A–B và các mốc trong vòng đời đề tài." },
        { id: "architecture", title: "Kiến trúc và luồng xử lý", summary: "Đi từ ConsoleMenu qua Business tới kho JSON và truy ngược kết quả." },
        { id: "use-cases", title: "Phân tích các Use Case", summary: "Truy vết UC01–UC08, từ hồ sơ và kinh phí đến nghiệm thu, đầu ra và báo cáo." },
        { id: "testing", title: "Kiểm thử, dữ liệu và giới hạn", summary: "Bộ kiểm thử console, kho trong bộ nhớ, hồi quy và bằng chứng nghiệm thu giả lập." }
      ]
    },
    {
      title: "Bảo vệ bài tập lớn",
      chapters: [
        { id: "presentation", title: "Chuẩn bị thuyết trình", summary: "Dàn ý giới thiệu quyết định thiết kế và kịch bản demo phần A." },
        { id: "defense", title: "Ngân hàng câu hỏi bảo vệ", summary: "Luyện diễn đạt và trả lời câu hỏi nối tiếp theo chủ đề và độ khó." }
      ]
    }
  ],
  lessons: {
    oop: {
      minutes: 12,
      intro: "Bắt đầu với một câu hỏi: nếu mỗi đơn vị có một tên riêng và chỉ được đổi sang tên hợp lệ, nên đặt dữ liệu và quy tắc đổi tên ở đâu?",
      goals: [
        "Phân biệt lớp, đối tượng và biến tham chiếu.",
        "Chỉ ra trạng thái và hành vi của một đối tượng quản lý.",
        "Giải thích một lợi ích và một giới hạn khi tổ chức code theo đối tượng."
      ],
      tabs: {
        theory: [
          { type: "heading", text: "Một đối tượng biết điều gì và làm được gì?" },
          { type: "p", text: "Trong cách tổ chức hướng đối tượng, một đối tượng giữ dữ liệu của mình và cung cấp thao tác có ý nghĩa trên dữ liệu đó. Dữ liệu tại một thời điểm tạo thành trạng thái. Thao tác mà đối tượng thực hiện là hành vi." },
          { type: "p", text: "Hãy tưởng tượng hai thẻ thư viện cùng mẫu. Mỗi thẻ có mã và ngày hết hạn riêng. Gia hạn thẻ của Lan chỉ thay đổi ngày trên thẻ của Lan. Lớp là kiểu định nghĩa dữ liệu và thao tác chung. Một đối tượng là một thể hiện cụ thể của kiểu đó." },
          {
            type: "diagram", label: "Một kiểu Student, hai đối tượng độc lập",
            steps: [
              { title: "Lớp Student", text: "Định nghĩa Name, Grade và hành vi Promote(). Mỗi lần new tạo một đối tượng." }
            ],
            branches: [
              { title: "new Student(\"Lan\", 10)", text: "Gọi Promote() trên đối tượng của Lan. Grade đổi từ 10 lên 11." },
              { title: "new Student(\"Minh\", 11)", text: "Grade của Minh vẫn là 11 vì thao tác được gọi trên đối tượng của Lan." }
            ]
          },
          { type: "p", text: "Cách thủ tục có thể truyền một hồ sơ vào hàm đổi tên. Khi có nhiều nơi sửa hồ sơ, nhóm cần thống nhất ai chịu trách nhiệm kiểm tra tên trước khi lưu. Với đối tượng, có thể đặt quy tắc ngay trong Rename() và chỉ mở thao tác đó cho mã gọi. Cả hai cách đều dùng hàm và dữ liệu. Khi chỉ cần vài bước tính toán đơn giản, thêm nhiều lớp có thể khiến chương trình khó đọc." },
          {
            type: "table", headers: ["Tính chất", "Câu hỏi để nhận ra"],
            rows: [
              ["Đóng gói", "Ai được thay đổi dữ liệu và bằng thao tác nào?"],
              ["Trừu tượng hóa", "Bên sử dụng cần biết những gì để gọi được thao tác?"],
              ["Kế thừa", "Kiểu này có phải là một dạng của kiểu kia hay chỉ chứa hoặc sử dụng nó?"],
              ["Đa hình", "Cùng một lời gọi có thể đi vào cách thực thi nào tùy đối tượng cụ thể?"]
            ]
          }
        ],
        example: [
          {
            type: "code", title: "Ví dụ tự xây dựng · Student",
            code: `using System;

var lan = new Student("Lan", 10);
var minh = new Student("Minh", 11);
lan.Promote();
Console.WriteLine($"{lan.Grade} / {minh.Grade}");

public class Student
{
    public string Name { get; }
    public int Grade { get; private set; }

    public Student(string name, int grade)
    {
        Name = name;
        Grade = grade;
    }

    public void Promote() => Grade++;
}`,
            output: "11 / 11",
            notes: [
              { label: "new Student(…)", text: "Mỗi lần new tạo một đối tượng và gọi constructor Student để gán tên và khối lớp ban đầu. Biến lan và minh giữ hai tham chiếu." },
              { label: "Kết quả: 11 / 11", text: "Lan tăng từ 10 lên 11. Minh vốn ở khối 11. Hai giá trị hiện bằng nhau nhưng vẫn thuộc hai đối tượng khác nhau." },
              { label: "Thử dự đoán", text: "Nếu viết var other = lan; rồi gọi other.Promote(), lan.Grade sẽ thành 12. Gán tham chiếu không tạo đối tượng thứ ba." }
            ]
          },
          { type: "links", items: [{ title: "Thử tạo đối tượng và gán alias", href: "#simulation/objects" }] }
        ],
        project: [
          {
            type: "code", title: "UC01 · Đơn vị tự kiểm tra khi đổi tên",
            source: { path: "QLNCKH_OOP_FINAL/Business/Models/People.cs", lines: [4, 19], symbol: "Department" },
            code: `public sealed class Department
{
    public string Id { get; }
    public string Name { get; private set; }
    public DateOnly CreatedAt { get; }

    public Department(string id, string name, DateOnly createdAt)
    {
        Id = Guard.Required(id, nameof(id));
        Name = Guard.Required(name, nameof(name));
        CreatedAt = createdAt;
    }

    //chi doi ten don vi khi da kiem tra ten moi
    public void Rename(string name) => Name = Guard.Required(name, nameof(name));
}`,
            notes: [
              { label: "Trạng thái", text: "Mỗi đơn vị chứa Id, Name và CreatedAt. Mã và ngày thành lập chỉ có getter. Bên ngoài đọc được tên nhưng setter của Name là private." },
              { label: "Hành vi", text: "Rename nhận tên mới. Guard.Required kiểm tra rỗng và cắt khoảng trắng hai đầu ở Common.cs dòng 6. Nếu kiểm tra thất bại, phép gán không diễn ra và tên cũ được giữ." },
              { label: "Phối hợp", text: "PeopleService.SaveDepartment tra mã đã chuẩn hóa. Khi tìm thấy đơn vị, service gọi Rename rồi lưu lại qua kho. Xem Business/Services/PeopleService.cs dòng 8–16 trong QLNCKH_OOP_FINAL." }
            ]
          }
        ],
        defense: [
          { type: "heading", text: "Vì sao nhóm chọn cách tổ chức hướng đối tượng?" },
          { type: "p", text: "Có thể nói: Đề tài và đơn vị đều có dữ liệu đi kèm quy tắc thay đổi. Nhóm đặt từng thao tác gần dữ liệu mà nó quản lý, ví dụ Department.Rename kiểm tra tên mới. Service điều phối quyền và lưu trữ. Khi thêm cách đổi tên, nơi gọi vẫn dùng cùng phương thức." },
          { type: "heading", text: "Nếu hai biến có cùng giá trị Name, chúng có là cùng đối tượng?" },
          { type: "p", text: "Hãy kiểm tra chúng đến từ hai lần new hay một lần new rồi gán tham chiếu. Hai đối tượng khác nhau có thể có cùng tên. Trong nghiệp vụ, dự án dùng mã Id để tra cứu hồ sơ. Id là khóa nghiệp vụ, còn hai biến cùng tham chiếu là câu hỏi về đối tượng trong bộ nhớ." }
        ]
      },
      related: ["csharp", "encapsulation", "relationships"],
      quiz: [
        {
          question: "Trong ví dụ Student, sau var other = lan; và other.Promote(), điều gì xảy ra?",
          options: ["Chỉ biến other có Grade mới.", "lan và other cho cùng Grade mới.", "Minh cũng được tăng Grade."],
          answer: 1,
          hint: "Đếm số lần gọi new và xác định từng biến đang giữ tham chiếu nào.",
          explanation: "lan và other giữ tham chiếu tới cùng một đối tượng, nên đọc biến nào cũng thấy Grade mới. Đối tượng của Minh độc lập."
        },
        {
          question: "Thành phần nào mô tả hành vi của lớp Department?",
          options: ["Id", "CreatedAt", "Rename(string name)"],
          answer: 2,
          hint: "Tìm thành phần mô tả một việc có thể gọi để thực hiện.",
          explanation: "Rename thực hiện một thao tác có kiểm tra trên tên, còn Id và CreatedAt biểu diễn dữ liệu của đơn vị."
        },
        {
          question: "Vì sao hai đơn vị cùng tên vẫn có thể là hai hồ sơ khác nhau?",
          options: ["Tên chỉ là một phần trạng thái. Kho tra hồ sơ theo Id.", "Cùng tên bắt buộc có cùng Id.", "Vì DateOnly luôn có giá trị khác nhau."],
          answer: 0,
          hint: "Khi tra một đơn vị, PeopleService gửi dữ liệu nào cho kho?",
          explanation: "PeopleService gọi FindDepartment bằng mã. Giá trị Name trùng nhau không quyết định hai biến có trỏ cùng đối tượng hay hai hồ sơ có cùng mã."
        }
      ]
    },
    csharp: {
      minutes: 16,
      intro: "Đọc chữ ký phương thức trước, rồi thực hành lần lượt với khởi tạo đối tượng, danh sách, LINQ và cách xử lý lỗi.",
      goals: [
        "Nhận ra phạm vi truy cập, kiểu trả về, tham số và lời gọi phương thức.",
        "Đọc được kiểu dữ liệu, field, property, constructor, enum, List và Dictionary thường gặp trong bài.",
        "Theo dấu LINQ và giải thích sự khác nhau giữa phát hiện lỗi và hiển thị lỗi."
      ],
      tabs: {
        theory: [
          { type: "heading", text: "Đọc chữ ký trước khi đọc thân hàm" },
          { type: "p", text: "Với public ResearchProject ProposeProject(CurrentUserContext user, …), public cho biết phạm vi gọi, ResearchProject là kiểu kết quả, ProposeProject là tên hàm, còn trong ngoặc là kiểu và tên từng tham số. Tại nơi gọi, bạn truyền đối số tương ứng. Với void, lời gọi thực hiện công việc mà không trả về một giá trị." },
          { type: "heading", text: "Đọc một lớp theo ba lượt" },
          { type: "list", items: [
            "Tìm dữ liệu. Field là biến khai báo trực tiếp trong lớp. Property cung cấp thao tác đọc (get) hoặc gán (set). Với public int Grade { get; private set; }, mã gọi đọc được Grade, còn mã trong lớp khai báo mới có thể gán qua setter.",
            "Tìm cách khởi tạo. Khi gọi new Student(10), C# tạo đối tượng và chạy constructor Student(int grade) để đặt khối lớp ban đầu. Constructor trùng tên lớp và không có kiểu trả về.",
            "Tìm hành vi. Method như Promote() thực hiện một thao tác. Biến cục bộ như var normalizedId chỉ dùng được trong phạm vi khai báo và có kiểu do trình biên dịch suy ra."
          ] },
          {
            type: "table", headers: ["Cú pháp", "Đọc nhanh"],
            rows: [
              ["public / private", "public mở truy cập theo phạm vi của kiểu chứa. private giới hạn truy cập trong kiểu khai báo."],
              ["protected / internal", "protected cho phép kiểu dẫn xuất truy cập theo quy tắc kế thừa. internal giới hạn ở cùng assembly, thường là cùng project biên dịch."],
              ["this / static", "this chỉ đối tượng hiện tại. Thành viên static thuộc kiểu và gọi qua tên kiểu, ví dụ Guard.Required."],
              ["readonly / const", "Field readonly có thể gán ở khai báo hoặc trong constructor phù hợp. Một List trong field readonly vẫn có thể thêm phần tử. const là hằng thời điểm biên dịch và phải được gán tại khai báo."],
              ["enum", "Đặt tên cho một tập lựa chọn như Pending, Active, Completed. Một phép ép từ số vẫn có thể tạo giá trị ngoài danh sách, nên code có Enum.IsDefined ở nơi cần kiểm tra."],
              ["string? / DateOnly?", "string? báo cho trình biên dịch rằng tham chiếu có thể là null. DateOnly? là kiểu giá trị có thể mang một ngày hoặc null. Ví dụ, DateOnly? endDate = null biểu diễn chưa có ngày kết thúc."],
              ["decimal / bool", "decimal phù hợp cho số tiền cần biểu diễn theo hệ thập phân trong giới hạn của kiểu. bool giữ true hoặc false."],
              ["List<T> / Dictionary<K,V>", "List chứa dãy phần tử. Dictionary tra giá trị theo khóa, phù hợp khi cần tìm một hồ sơ theo mã."]
            ]
          },
          {
            type: "table", headers: ["LINQ", "Tác dụng"],
            rows: [
              ["Where / Any", "Lọc các phần tử thỏa điều kiện hoặc hỏi có ít nhất một phần tử thỏa điều kiện hay không."],
              ["Select / SelectMany", "Biến mỗi phần tử thành một giá trị hoặc làm phẳng nhiều danh sách con thành một dãy."],
              ["GroupBy / OrderBy", "Gom theo khóa hoặc sắp xếp theo khóa."],
              ["Sum / Count / ToList", "Tính tổng, đếm hoặc duyệt và tạo danh sách kết quả."]
            ]
          },
          { type: "p", text: "throw dừng luồng bình thường và đưa exception lên bên gọi. try/catch cho phép xử lý một loại lỗi phù hợp. Một lớp kiểm tra điều kiện và báo lỗi, còn lớp biên có thể chuyển lỗi đó thành thông báo cho người dùng." }
        ],
        example: [
          {
            type: "code", title: "Tạo đối tượng và đọc property",
            code: `using System;

var lan = new Student(10);
Console.WriteLine(lan.Grade);
Console.WriteLine(Student.IsValidGrade(10));

public class Student
{
    public int Grade { get; private set; }
    public Student(int grade) => this.Grade = grade;
    public static bool IsValidGrade(int grade) => grade >= 10 && grade <= 12;
}`,
            output: "10\nTrue",
            notes: [
              { label: "new Student(10)", text: "10 là đối số, grade là tham số nhận nó. this.Grade là property của đối tượng vừa tạo. Mã ngoài đọc lan.Grade được nhưng gán lan.Grade = 11 sẽ lỗi biên dịch." },
              { label: "lan.Grade và Student.IsValidGrade(10)", text: "Grade thuộc từng Student. IsValidGrade là static vì chỉ dựa vào giá trị truyền vào, nên gọi qua tên lớp, không cần tạo Student. Ví dụ chỉ minh họa cú pháp. Trong dự án, Department cập nhật Name qua Rename và gọi Guard.Required qua tên lớp Guard." }
            ]
          },
          {
            type: "code", title: "Thêm, duyệt và tìm dữ liệu",
            code: `using System;
using System.Collections.Generic;

var names = new List<string> { "Lan" };
names.Add("Minh");
foreach (string name in names)
    Console.WriteLine(name);
Console.WriteLine(names.Contains("Minh"));

var byId = new Dictionary<string, string> { ["S01"] = "Lan" };
Console.WriteLine(byId["S01"]);`,
            output: "Lan\nMinh\nTrue\nLan",
            notes: [
              { label: "List<string>", text: "Danh sách chứa chuỗi. Add thêm Minh, foreach đọc từng tên theo thứ tự và Contains hỏi xem có tên Minh không." },
              { label: "Dictionary<string, string>", text: "Kiểu đầu là kiểu khóa, kiểu sau là kiểu giá trị. Dùng khóa S01 để đọc Lan. Cách đọc bằng ngoặc vuông giả định khóa tồn tại. InMemoryResearchRepository dùng GetValueOrDefault để tìm hồ sơ mà mã có thể không tồn tại." }
            ]
          },
          {
            type: "code", title: "LINQ lọc điểm rồi chuyển sang chuỗi",
            code: `using System;
using System.Linq;

int[] scores = { 4, 8, 9 };
var passed = scores.Where(score => score >= 5);
var labels = passed.Select(score => $"{score}/10").ToList();
Console.WriteLine(string.Join(", ", labels));`,
            output: "8/10, 9/10",
            notes: [
              { label: "Where", text: "score là phần tử đang xét. Biểu thức sau dấu => cho kết quả true hoặc false. Từ 4, 8, 9, điều kiện giữ lại 8 và 9." },
              { label: "Select và ToList", text: "Select đổi mỗi số được giữ thành chuỗi theo mẫu như 8/10. ToList tạo danh sách chuỗi và string.Join nối chúng để in. GetHeadHistory cũng dùng Where, rồi dùng OrderBy để sắp xếp kết quả." }
            ]
          },
          {
            type: "code", title: "Bắt lỗi khi dữ liệu sai định dạng",
            code: `using System;

try
{
    int score = int.Parse("tám");
    Console.WriteLine(score);
}
catch (FormatException)
{
    Console.WriteLine("Hãy nhập điểm bằng chữ số.");
}
Console.WriteLine("Tiếp tục nhập.");`,
            output: "Hãy nhập điểm bằng chữ số.\nTiếp tục nhập.",
            notes: [
              { label: "Dòng nào được chạy?", text: "int.Parse ném FormatException vì chuỗi không đọc được thành số. Lệnh in score bị bỏ qua, catch xử lý đúng kiểu lỗi, rồi chương trình tiếp tục sau khối catch. ConsoleMenu.Run cũng bắt lỗi định dạng từ lúc đọc ngày và hiển thị thông báo." }
            ]
          }
        ],
        project: [
          {
            type: "code", title: "UC02 · Đọc chữ ký và dòng dữ liệu của đề xuất",
            source: { path: "QLNCKH_OOP_FINAL/Business/Services/ProjectService.cs", lines: [7, 22], symbol: "ProjectService.ProposeProject" },
            code: `    public ResearchProject ProposeProject(CurrentUserContext user, string id, string categoryId,
        string title, DateOnly startDate, DateOnly? endDate)
    {
        Access.Require(user, UserRole.Researcher);
        if (string.IsNullOrWhiteSpace(user.ResearcherId) || people.FindResearcher(user.ResearcherId) is null)
            throw new UnauthorizedAccessException("Hồ sơ nhà nghiên cứu không tồn tại.");
        if (projects.FindCategory(categoryId) is null)
            throw new InvalidOperationException("Loại đề tài không tồn tại.");
        // Dùng cùng mã đã chuẩn hóa để tra trùng và tạo đề tài.
        var normalizedId = Guard.Required(id, nameof(id));
        if (projects.FindProject(normalizedId) is not null)
            throw new InvalidOperationException("Mã đề tài đã tồn tại.");
        var project = new ResearchProject(normalizedId, categoryId, title, startDate, endDate);
        projects.Save(project);
        return project;
    }`,
            notes: [
              { label: "Chữ ký", lines: [7, 8], text: "user mô tả vai trò và mã hồ sơ, id và categoryId là chuỗi. startDate bắt buộc có ngày, endDate có thể nhận null." },
              { label: "Quyền và hồ sơ liên quan", lines: [10, 14], text: "Service yêu cầu vai trò Researcher, tìm hồ sơ nhà nghiên cứu và kiểm tra loại đề tài. Khi kiểm tra thất bại, luồng dừng trước khi lưu." },
              { label: "Chuẩn hóa trước khi tra", lines: [15, 18], text: "Guard.Required bỏ khoảng trắng hai đầu. Kho trong bộ nhớ tra mã không phân biệt hoa thường." },
              { label: "Tạo, lưu và trả kết quả", lines: [19, 21], text: "Constructor dùng cùng normalizedId và kiểm tra tên, ngày. Service lưu rồi trả ResearchProject nếu mọi kiểm tra qua." }
            ]
          },
          {
            type: "code", title: "UC01 · Lọc và sắp xếp lịch sử lãnh đạo",
            source: { path: "QLNCKH_OOP_FINAL/Business/Services/PeopleService.cs", lines: [41, 48], symbol: "PeopleService.GetHeadHistory" },
            code: `    public IReadOnlyList<DepartmentHeadTerm> GetHeadHistory(CurrentUserContext user, string departmentId)
    {
        Access.Require(user, UserRole.Officer);
        if (people.FindDepartment(departmentId) is null)
            throw new InvalidOperationException("Đơn vị không tồn tại.");
        return people.HeadTerms.Where(x => x.DepartmentId.Equals(departmentId, StringComparison.OrdinalIgnoreCase))
            .OrderBy(x => x.From).ToList();
    }`,
            notes: [
              { label: "Where", text: "Mỗi x là một nhiệm kỳ. Chỉ giữ nhiệm kỳ của mã yêu cầu, không phân biệt hoa thường." },
              { label: "OrderBy và ToList", text: "Sắp theo ngày bắt đầu From rồi lấy danh sách kết quả. Đơn vị tồn tại nhưng chưa có nhiệm kỳ phù hợp sẽ nhận danh sách rỗng." }
            ]
          },
          { type: "note", title: "Đọc tiếp trong dự án", text: "InMemoryResearchRepository.cs dùng Dictionary với khóa không phân biệt hoa thường và List để chứa quan hệ. FundingAllocation dùng decimal và yêu cầu số tiền dương. FundingService.Allocate kiểm trạng thái Completed, mã đợt cấp trùng và nguy cơ tràn decimal. Menu 9 nhận số đồng nguyên dương." }
        ],
        defense: [
          { type: "heading", text: "Tại sao kiểm tra trùng sau khi chuẩn hóa?" },
          { type: "p", text: "Có thể nói: Kho cần tra đúng mã mà đối tượng sẽ lưu. Nếu tra bằng chuỗi có dấu cách hai đầu rồi constructor mới cắt, mình có thể bỏ sót mã đã tồn tại. ProposeProject dùng normalizedId cho cả hai bước. So sánh không phân biệt hoa thường do kho cung cấp." },
          { type: "heading", text: "Dữ liệu sai được xử lý qua các lớp thế nào?" },
          { type: "p", text: "Menu chuyển dữ liệu nhập sang kiểu C# để gọi service. Service kiểm tra quyền và hồ sơ liên quan, model kiểm tra dữ liệu thuộc trách nhiệm của mình. Nếu thao tác ném một lỗi dự kiến, vòng lặp menu bắt lỗi phù hợp và hiển thị thông báo. Tự nêu ví dụ: ngày đích nhập sai định dạng và ngày đích trước ngày bắt đầu bị phát hiện ở hai nơi khác nhau." }
        ]
      },
      related: ["oop", "encapsulation", "architecture", "use-cases"],
      quiz: [
        {
          question: "Kiểu trả về của ProposeProject là gì?",
          options: ["CurrentUserContext", "ResearchProject", "DateOnly?"],
          answer: 1,
          hint: "Nhìn vào từ chỉ kiểu ngay trước tên phương thức.",
          explanation: "ResearchProject đứng ngay trước tên ProposeProject. CurrentUserContext và DateOnly? là kiểu tham số."
        },
        {
          question: "Có thể viết bỏ hẳn đối số endDate khi gọi ProposeProject vì nó là DateOnly? không?",
          options: ["Có, mọi tham số nullable đều tùy chọn.", "Có, kết quả tự chuyển thành void.", "Không. Chữ ký không có mặc định, nên truyền ngày hoặc null."],
          answer: 2,
          hint: "Phân biệt truyền null với bỏ cả đối số. Tìm xem chữ ký có dấu = sau tên tham số không.",
          explanation: "DateOnly? cho phép truyền null. Tham số chỉ có thể bỏ qua khi lời khai kèm giá trị mặc định phù hợp, ví dụ DateOnly? endDate = null."
        },
        {
          question: "Hồ sơ đơn vị tồn tại nhưng chưa có nhiệm kỳ nào. GetHeadHistory trả gì?",
          options: ["Danh sách rỗng.", "null.", "Lỗi Đơn vị không tồn tại."],
          answer: 0,
          hint: "Theo dấu Where, OrderBy và ToList khi không có phần tử thỏa điều kiện.",
          explanation: "Kiểm tra đơn vị đã qua. Where lọc được dãy rỗng, OrderBy vẫn là dãy rỗng và ToList tạo danh sách rỗng."
        }
      ]
    },
    encapsulation: {
      minutes: 15,
      intro: "Giữ đề tài hợp lệ bằng cách cho phép những thao tác có kiểm tra. Đọc mã để biết điều kiện nào do model giữ và điều kiện nào cần service kiểm tra.",
      goals: [
        "Giải thích đóng gói bằng một quy tắc cần luôn đúng.",
        "Phân biệt private set, readonly và danh sách chỉ đọc.",
        "Theo dấu kiểm tra gán thành viên từ ProjectService tới ResearchProject."
      ],
      tabs: {
        theory: [
          { type: "heading", text: "Giữ quy tắc đúng ở mọi lời gọi" },
          { type: "p", text: "Đóng gói gom dữ liệu cùng hành vi cần thiết và kiểm soát đường đi để đọc hoặc thay đổi dữ liệu. Một quy tắc luôn cần đúng sau một thao tác công khai thành công gọi là bất biến. Ví dụ tài khoản thông thường phải luôn có số dư không âm." },
          { type: "p", text: "Máy bán vé cho người dùng bấm mua và xem số tiền đã nạp. Bộ máy kiểm tra đủ tiền rồi trừ tiền. Nếu bất kỳ nút nào cũng có thể ghi thẳng số tiền, việc giữ quy tắc phụ thuộc vào từng nút. Khi gom kiểm tra vào thao tác mua, bổ sung giao diện thứ hai vẫn dùng được cùng kiểm tra." },
          {
            type: "table", headers: ["Cách biểu diễn", "Mã gọi làm được gì?"],
            rows: [
              ["public decimal Balance { get; set; }", "Đọc và gán số dư trực tiếp. Setter tự động ở đây không áp điều kiện số dư."],
              ["public decimal Balance { get; private set; }", "Đọc số dư. Đổi qua các phương thức mà lớp mở ra."],
              ["private readonly List<T> _items", "Không truy cập field từ bên ngoài. Lớp vẫn có thể sửa nội dung List, dù field không được gán sang List khác sau khởi tạo."],
              ["IReadOnlyList<T> trả về từ AsReadOnly()", "Đọc qua chỉ số, đếm hoặc duyệt. Đây là view của danh sách, nên thao tác hợp lệ bên trong có thể hiện ra khi đọc lại."]
            ]
          },
          { type: "note", title: "Chọn đúng nơi giữ quy tắc", text: "Model giữ quy tắc kiểm được từ dữ liệu của đối tượng. Service kiểm điều kiện cần vai trò người dùng hoặc tra dữ liệu của các đối tượng khác. Điều kiện hợp lệ của dữ liệu và quyền thực hiện thao tác phục vụ hai trách nhiệm khác nhau." }
        ],
        example: [
          {
            type: "code", title: "Ví dụ tự xây dựng · Rút tiền qua thao tác có kiểm tra",
            code: `using System;

var account = new BankAccount();
account.Deposit(100m);
account.Withdraw(30m);
Console.WriteLine(account.Balance);

public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        if (amount > Balance) throw new InvalidOperationException("Không đủ số dư.");
        Balance -= amount;
    }
}`,
            output: "70",
            notes: [
              { label: "Cho đọc số dư", text: "Console đọc Balance và in 70. Hậu tố m cho biết các số như 100m có kiểu decimal." },
              { label: "Giữ đường cập nhật", text: "Nếu gọi Withdraw(80m) tiếp theo, nó ném lỗi và Balance vẫn là 70. Việc gán account.Balance từ bên ngoài không qua biên dịch." },
              { label: "Thử bỏ kiểm tra", text: "Nếu setter vẫn private nhưng Withdraw bỏ kiểm số dư, Balance có thể âm. Từ khóa truy cập chỉ hỗ trợ đóng gói. Hành vi mới quyết định quy tắc có được giữ hay không." }
            ]
          }
        ],
        project: [
          {
            type: "code", title: "UC03 · Danh sách thành viên được bảo vệ",
            source: { path: "QLNCKH_OOP_FINAL/Business/Models/Projects.cs", lines: [40, 53], symbol: "ResearchProject — field và property" },
            code: `    //chi sua qua phuong thuc nghiep vu, ben ngoai chi doc
    private readonly List<ProjectParticipation> _members = [];
    private readonly List<ProjectStatusHistory> _history = [];
    private readonly List<FundingAllocation> _allocations = [];

    public string Id { get; }
    public string CategoryId { get; }
    public string Title { get; }
    public DateOnly StartDate { get; }
    public DateOnly? EndDate { get; }
    public ProjectStatus Status { get; private set; } = ProjectStatus.Pending;
    public IReadOnlyList<ProjectParticipation> Members => _members.AsReadOnly();
    public IReadOnlyList<ProjectStatusHistory> History => _history.AsReadOnly();
    public IReadOnlyList<FundingAllocation> Allocations => _allocations.AsReadOnly();`,
            notes: [
              { label: "Phạm vi ghi", text: "Mã gọi đọc Status và Members. Lớp giữ List riêng và setter trạng thái riêng, nên nơi dùng không thể gọi Add qua Members hoặc gán trực tiếp Status." },
              { label: "AsReadOnly()", text: "Bên gọi nhận lớp bọc chỉ đọc quanh List gốc. Không đồng nghĩa với bản sao bất biến. Nội dung cập nhật qua AddMember có thể nhìn thấy ở view." }
            ]
          },
          {
            type: "code", title: "UC03 · Một lối vào để gán thành viên",
            source: { path: "QLNCKH_OOP_FINAL/Business/Models/Projects.cs", lines: [68, 77], symbol: "ResearchProject.AddMember" },
            code: `    public void AddMember(string researcherId, ProjectRole role)
    {
        researcherId = Guard.Required(researcherId, nameof(researcherId));
        if (Status != ProjectStatus.Pending) throw new InvalidOperationException("Chỉ sửa thành viên khi đề tài đang chờ duyệt.");
        if (_members.Any(m => m.ResearcherId.Equals(researcherId, StringComparison.OrdinalIgnoreCase)))
            throw new InvalidOperationException("Nhà nghiên cứu đã có trong đề tài.");
        if (role == ProjectRole.Leader && _members.Any(m => m.Role == ProjectRole.Leader))
            throw new InvalidOperationException("Đề tài đã có chủ nhiệm.");
        _members.Add(new ProjectParticipation(Id, researcherId, role));
    }`,
            notes: [
              { label: "Đầu vào và điểm ghi", text: "Nhận mã nhà nghiên cứu và vai trò. Chỉ thêm ProjectParticipation sau khi xác nhận Pending, mã chưa tham gia và chưa có Leader nếu đang gán Leader." },
              { label: "Vì sao cần service?", text: "ProjectService.AssignMember ở dòng 24–32 kiểm quyền Chuyên viên, tra người qua IPeopleRepository, rồi tra và lưu đề tài qua IProjectRepository. Model tự kiểm quy tắc của danh sách thành viên. Menu truyền cùng một kho JSON cho hai tham số kiểu interface." },
              { label: "Hai thời điểm kiểm tra chủ nhiệm", text: "AddMember giữ tối đa một Leader khi đang lập danh sách. PendingState.Approve yêu cầu đúng một Leader tại thời điểm duyệt. Đề tài mới tạo được phép có 0 Leader." }
            ]
          }
        ],
        defense: [
          { type: "heading", text: "Đóng gói thể hiện ở đâu khi gán chủ nhiệm?" },
          { type: "p", text: "Có thể nói: ResearchProject giữ _members là List private và công khai Members dạng chỉ đọc. AddMember là thao tác kiểm điều kiện trước khi thêm. Nếu để bên gọi sửa List trực tiếp, nó có thể tạo chủ nhiệm thứ hai dù menu gán đúng." },
          { type: "heading", text: "Đổi Members thành IReadOnlyList đã đủ chưa?" },
          { type: "p", text: "Cần xem giá trị trả về. Nếu trả thẳng List gốc dưới kiểu interface chỉ đọc, mã biết kiểu thực có thể thử ép về List. Code dùng AsReadOnly để trả lớp bọc. Bất biến của từng phần tử còn phụ thuộc vào thiết kế phần tử. ProjectParticipation giữ ba property chỉ có getter." }
        ]
      },
      related: ["oop", "csharp", "patterns", "use-cases"],
      quiz: [
        {
          question: "Field private readonly List<T> có chặn phương thức trong lớp gọi Add() không?",
          options: ["Có, mọi phần tử bị khóa.", "Không. readonly giữ tham chiếu field, List vẫn sửa được.", "Có, trừ khi khai báo cả field là static."],
          answer: 1,
          hint: "So sánh việc gán một List mới vào field với việc gọi một phương thức trên List hiện có.",
          explanation: "readonly giới hạn việc gán lại field sau khởi tạo. Nó không thay đổi hành vi của đối tượng List được trỏ tới."
        },
        {
          question: "Trong UC03, nơi nào kiểm nhà nghiên cứu tồn tại trước khi gán?",
          options: ["ProjectService.AssignMember, qua kho người.", "ResearchProject.Members, vì là danh sách.", "PendingState.Approve, vì luôn chạy trước gán."],
          answer: 0,
          hint: "Thành phần nào có thể truy cập kho hồ sơ nhà nghiên cứu?",
          explanation: "Service có IPeopleRepository để tra hồ sơ. Model tự kiểm điều kiện dựa vào trạng thái và danh sách thành viên mà nó giữ."
        },
        {
          question: "Sau khi gán một Member thường cho đề tài Pending chưa có Leader, lần duyệt đầu tiên sẽ thế nào?",
          options: ["Thành công vì danh sách có một người.", "Thành công vì Member được chuyển tự động thành Leader.", "Thất bại vì chưa có đúng một Leader."],
          answer: 2,
          hint: "Khi duyệt, State xem số người trong danh sách hay số người có một vai trò cụ thể?",
          explanation: "PendingState đếm phần tử có Role là Leader. Một Member thường không đáp ứng điều kiện này. Đề tài giữ Pending."
        }
      ]
    },
    patterns: {
      minutes: 17,
      intro: "Một đề tài chỉ được duyệt trong trạng thái phù hợp. Cùng dữ liệu kinh phí lại có thể tổng hợp theo hai tiêu chí. Hai bài toán dẫn đến hai cách phân chia hành vi.",
      prerequisites: ["abstraction", "inheritance", "polymorphism"],
      goals: [
        "Nhận diện đối tượng điều phối, interface và cách thực thi cụ thể trong State và Strategy.",
        "Theo dấu thao tác duyệt qua PendingState và sự khác nhau giữa hai báo cáo kinh phí.",
        "Giải thích vì sao việc tạo State trong switch khác cấu trúc Factory Method của GoF."
      ],
      tabs: {
        theory: [
          { type: "heading", text: "State tổ chức hành vi theo vòng đời" },
          { type: "p", text: "Cùng bấm công tắc, đèn đang tắt thì bật, đang bật thì tắt. State đưa cách phản ứng của mỗi trạng thái vào lớp riêng. Đối tượng chính giữ hoặc xác định trạng thái hiện tại rồi ủy quyền thao tác qua một hợp đồng chung. Khi quy tắc phân nhánh xuất hiện ở nhiều thao tác, tách theo State giúp đọc các hành vi của từng trạng thái cùng nhau." },
          { type: "heading", text: "Strategy tổ chức các cách làm có thể thay thế" },
          { type: "p", text: "Khi đặt hàng, người mua có thể tự đến nhận hoặc giao tận nhà. Lời gọi tính phí giữ nguyên, quy tắc phí phụ thuộc cách giao đã chọn. Strategy đóng gói mỗi cách làm sau cùng một interface. Nơi dùng nhận strategy cụ thể và gọi nó mà không cần viết lại thuật toán." },
          {
            type: "table", headers: ["Tiêu chí", "State", "Strategy"],
            rows: [
              ["Câu hỏi thiết kế", "Đang ở giai đoạn nào, thao tác này có hợp lệ không?", "Đã chọn cách tính hoặc cách trình bày nào?"],
              ["Điều quyết định cách thực thi", "Trạng thái của đối tượng trong vòng đời.", "Strategy được người gọi hoặc cấu hình lựa chọn."],
              ["Kết quả thường thấy", "Có thể giữ trạng thái, chuyển trạng thái hoặc từ chối thao tác.", "Trả kết quả theo thuật toán đã chọn, ví dụ các dòng tổng hợp."],
              ["Chi phí", "Thêm lớp và hợp đồng để mô tả hành vi từng trạng thái.", "Thêm lớp triển khai và truyền đúng strategy vào nơi dùng."]
            ]
          },
          { type: "note", title: "Factory Method trong UC07", text: "ResearchOutputCreator.Build điều phối việc tạo và gọi Validate. Factory method là Create(OutputDraft), một phương thức abstract được PaperCreator và DeliverableCreator ghi đè để tạo Paper hoặc ProjectDeliverable. OutputService chọn creator theo thao tác. StateFor chọn State theo enum bằng switch, còn Create giao quyết định tạo đối tượng cho lớp dẫn xuất." },
          { type: "links", items: [{ title: "Thử chuyển trạng thái đề tài", href: "#simulation/state" }, { title: "Đổi cách tổng hợp kinh phí", href: "#simulation/strategy" }] }
        ],
        example: [
          {
            type: "code", title: "Ví dụ tự xây dựng · Công tắc theo State",
            code: `using System;

var lamp = new Lamp();
Console.WriteLine(lamp.IsOn);
lamp.Press();
Console.WriteLine(lamp.IsOn);
lamp.Press();
Console.WriteLine(lamp.IsOn);

public interface ILightState
{
    bool IsOn { get; }
    ILightState Press();
}

public class Off : ILightState
{
    public bool IsOn => false;
    public ILightState Press() => new On();
}

public class On : ILightState
{
    public bool IsOn => true;
    public ILightState Press() => new Off();
}

public class Lamp
{
    private ILightState _state = new Off();
    public bool IsOn => _state.IsOn;
    public void Press() => _state = _state.Press();
}`,
            output: "False\nTrue\nFalse",
            notes: [
              { label: "Trước và sau mỗi lần Press()", text: "Lamp mới giữ Off nên in False. Off.Press trả On và lamp lưu On, nên lần in tiếp theo là True. Lần bấm thứ hai gọi On.Press và trở về Off, nên in False." },
              { label: "Vì sao đây là State?", text: "Lamp gọi cùng một thao tác qua ILightState. Trạng thái hiện tại quyết định hành vi và bước tiếp theo, còn người bấm chỉ gọi Press(). ResearchProject cũng gọi hành vi của trạng thái hiện tại qua IProjectState." }
            ]
          },
          {
            type: "code", title: "Ví dụ tự xây dựng · Phí giao theo Strategy",
            code: `using System;

var checkout = new Checkout();
const decimal subtotal = 100000m;
IDeliveryFee delivery = new Pickup();
Console.WriteLine(checkout.Total(subtotal, delivery));
delivery = new HomeDelivery();
Console.WriteLine(checkout.Total(subtotal, delivery));

public interface IDeliveryFee
{
    decimal Fee(decimal subtotal);
}

public class Pickup : IDeliveryFee
{
    public decimal Fee(decimal subtotal) => 0m;
}

public class HomeDelivery : IDeliveryFee
{
    public decimal Fee(decimal subtotal) => subtotal >= 200000m ? 0m : 25000m;
}

public class Checkout
{
    public decimal Total(decimal subtotal, IDeliveryFee delivery)
        => subtotal + delivery.Fee(subtotal);
}`,
            output: "100000\n125000",
            notes: [
              { label: "Trước và sau khi đổi cách giao", text: "Cả hai lần gọi dùng cùng Checkout và tiền hàng 100.000 đồng. Pickup tính phí 0. Khi người gọi truyền HomeDelivery, phí thành 25.000 đồng vì đơn hàng dưới 200.000 đồng." },
              { label: "Vì sao đây là Strategy?", text: "Người gọi chọn cách tính phí qua IDeliveryFee. Checkout nhận và dùng thuật toán được truyền. Trong dự án, các cách tổng hợp kinh phí cũng cung cấp cùng thao tác qua IReportStrategy." }
            ]
          }
        ],
        project: [
          {
            type: "diagram", label: "UC03 · Hai kết quả khi đề tài đang Pending",
            steps: [
              { title: "ProjectService.Approve", text: "Kiểm quyền Chuyên viên, tìm đề tài và gọi ResearchProject.Approve." },
              { title: "PendingState.Approve", text: "ResearchProject dùng StateFor(Status) để chọn State. PendingState kiểm tra trạng thái và đếm số chủ nhiệm." }
            ],
            branches: [
              { title: "Đúng một chủ nhiệm", text: "ChangeStatus ghi lịch sử và chuyển sang Active. Service gọi Save." },
              { title: "Thiếu chủ nhiệm", text: "State ném lỗi. Đề tài vẫn Pending, service chưa gọi Save và menu báo lỗi." }
            ]
          },
          {
            type: "code", title: "UC03 · Quy tắc duyệt của PendingState",
            source: { path: "QLNCKH_OOP_FINAL/Business/Models/ProjectStates.cs", lines: [11, 19], symbol: "PendingState.Approve" },
            code: `    public void Approve(ResearchProject project, string actorId, DateTimeOffset at)
    {
        // State là public, nên lời gọi trực tiếp cũng phải khớp trạng thái hiện tại.
        if (project.Status != ProjectStatus.Pending)
            throw new InvalidOperationException("Chỉ đề tài đang chờ duyệt mới được phê duyệt.");
        if (project.Members.Count(m => m.Role == ProjectRole.Leader) != 1)
            throw new InvalidOperationException("Đề tài cần đúng một chủ nhiệm trước khi duyệt.");
        project.ChangeStatus(ProjectStatus.Active, actorId, at);
    }`,
            notes: [
              { label: "Cách chọn State", text: "ResearchProject.Approve và Complete ở Projects.cs dòng 79–80 dùng StateFor(Status). Hàm chọn ở dòng 135–141 ánh xạ enum sang PendingState, ActiveState hoặc CompletedState." },
              { label: "Đổi trạng thái kèm lịch sử", text: "Nếu thiếu chủ nhiệm, throw xảy ra trước ChangeStatus. Khi hợp lệ, ChangeStatus ở Projects.cs dòng 83–87 ghi trạng thái cũ, trạng thái mới, người thao tác, thời điểm rồi mới gán Status." },
              { label: "Hoàn thành đề tài", text: "Menu 16 truyền ResultCompletionEvidence cho ProjectService.Complete. Service kiểm vai Officer, điểm hội đồng và đầu ra. ActiveState cho phép chuyển Completed. Ca A-BRIDGE dùng bằng chứng giả lập, còn menu truy vấn dữ liệu đã ghi." }
            ]
          },
          {
            type: "code", title: "UC07 · Phương thức tạo trong Creator cơ sở",
            source: { path: "QLNCKH_OOP_FINAL/Business/Services/ResearchOutputCreators.cs", lines: [15, 26], symbol: "ResearchOutputCreator.Build / Create" },
            code: `public abstract class ResearchOutputCreator
{
    protected abstract ResearchOutput Create(OutputDraft draft);

    public ResearchOutput Build(OutputDraft draft)
    {
        ArgumentNullException.ThrowIfNull(draft);
        var output = Create(draft);
        output.Validate();
        return output;
    }
}`,
            notes: [
              { label: "Lời gọi đa hình", text: "Build gọi Create qua Creator hiện tại. Chọn PaperCreator sẽ tạo Paper từ PaperDraft. Chọn DeliverableCreator sẽ tạo ProjectDeliverable từ DeliverableDraft." },
              { label: "Chỗ kiểm quy tắc", text: "Build gọi Validate sau khi tạo và trước khi trả về. OutputService kiểm quyền, trạng thái đề tài, tác giả và các điều kiện cần truy vấn kho." }
            ]
          },
          {
            type: "code", title: "Báo cáo kinh phí · Strategy theo nguồn",
            source: { path: "QLNCKH_OOP_FINAL/Business/Services/FundingBySourceStrategy.cs", lines: [9, 21], symbol: "FundingBySourceStrategy.BuildRows" },
            code: `    // Nguồn chưa cấp kinh phí không xuất hiện trong báo cáo.
    public IReadOnlyList<ReportRow> BuildRows() => projects.Projects
        .SelectMany(project => project.Allocations)
        .GroupBy(allocation => allocation.SourceId, StringComparer.OrdinalIgnoreCase)
        .OrderBy(group => group.Key, StringComparer.OrdinalIgnoreCase)
        .Select(group =>
        {
            var source = projects.FindSource(group.Key)
                ?? throw new InvalidDataException($"Nguồn kinh phí {group.Key} không tồn tại.");
            return new ReportRow(source.Id, source.Name, group.Sum(item => item.Amount), "đ",
                $"{group.Count()} đợt cấp");
        })
        .ToList();`,
            notes: [
              { label: "Lấy các đợt cấp và gom theo nguồn", lines: [11, 13], text: "SelectMany lấy đợt cấp từ mọi đề tài. GroupBy gom theo mã nguồn, rồi OrderBy sắp các nhóm theo mã. Nguồn chưa có đợt cấp không tạo nhóm." },
              { label: "Tạo dòng báo cáo", lines: [14, 21], text: "Tìm nguồn trong kho, cộng tiền và đếm đợt trong mỗi nhóm, rồi tạo danh sách ReportRow." },
              { label: "Đổi sang theo đề tài", text: "FundingByProjectStrategy.BuildRows ở dòng 9–12 lấy mỗi đề tài một dòng và đọc TotalFunding. Cả hai cách cùng triển khai IReportStrategy và trả danh sách ReportRow." }
            ]
          },
          {
            type: "diagram", label: "Hai báo cáo kinh phí · Cùng hợp đồng, khác cách tổng hợp",
            steps: [
              { title: "ConsoleMenu.PrintReport", text: "Menu 11/12 chọn Strategy kinh phí theo đề tài hoặc nguồn. Menu 19/20 chọn Strategy đầu ra theo đề tài hoặc loại." },
              { title: "ReportService.Generate", text: "Xác nhận vai trò Chuyên viên, rồi gọi BuildRows() qua IReportStrategy. Xem ReportService.cs dòng 10–17." },
              { title: "Strategy cụ thể", text: "Tạo danh sách ReportRow theo tiêu chí đã chọn. Menu nhận các dòng cùng cấu trúc để hiển thị." }
            ]
          },
          { type: "note", title: "Thử tính trên một bộ số nhỏ", text: "Giả sử P1 nhận 100 từ F1 và 30 từ F2, P2 nhận 70 từ F1. Theo đề tài, P1 có 130 và P2 có 70. Theo nguồn, F1 cấp 170 và F2 cấp 30. Tổng cộng vẫn là 200." }
        ],
        defense: [
          { type: "heading", text: "Vì sao còn switch nếu đã dùng State?" },
          { type: "p", text: "Có thể nói: switch chỉ chọn đối tượng State tương ứng với enum hiện tại. Các quy tắc của Approve và Complete nằm trong những State cụ thể. Vòng đời được lưu dưới dạng giá trị ProjectStatus, còn hành vi được gọi qua IProjectState. Nếu luồng chỉ có một điều kiện nhỏ, viết điều kiện trực tiếp có thể dễ đọc hơn." },
          { type: "heading", text: "Giảng viên hỏi State và Strategy đều dùng interface, khác gì?" },
          { type: "p", text: "Hãy bắt đầu từ mục đích. State trả lời thao tác được xử lý thế nào trong vòng đời đề tài. Strategy trả lời cách tổng hợp nào đã được người gọi chọn. Thử tự nói tiếp: nếu cùng một đề tài đổi từ Pending sang Active, lần duyệt sau đi vào State nào? Nếu đổi từ báo cáo theo đề tài sang theo nguồn, Status có bị đổi không?" }
        ]
      },
      related: ["encapsulation", "polymorphism", "architecture", "use-cases"],
      quiz: [
        {
          question: "Khi đã có một Leader và chuyên viên duyệt đề tài Pending thành công, phần nào đổi Status?",
          options: ["ConsoleMenu gán trực tiếp.", "PendingState gọi ResearchProject.ChangeStatus.", "FundingByProjectStrategy ghi lại trạng thái."],
          answer: 1,
          hint: "Theo lời gọi từ service qua ResearchProject đến State nào xử lý đề tài Pending.",
          explanation: "Service điều phối và lưu. ResearchProject ủy quyền cho PendingState, State kiểm quy tắc rồi gọi ChangeStatus để cập nhật trạng thái và ghi lịch sử."
        },
        {
          question: "Chọn báo cáo kinh phí theo nguồn thay cho theo đề tài thể hiện cơ chế nào?",
          options: ["Thay Strategy dùng để xây dựng các dòng báo cáo.", "Đổi State từ Active sang Completed.", "Thay đổi kiểu dữ liệu Amount."],
          answer: 0,
          hint: "Báo cáo đổi tiêu chí tổng hợp. Hãy xem dữ liệu và vòng đời của đề tài có đổi không.",
          explanation: "Nơi gọi thay cách tổng hợp qua IReportStrategy. Một cách trả dòng theo đề tài, một cách gom các đợt cấp theo nguồn."
        },
        {
          question: "Điều gì đang xảy ra trong StateFor(Status)?",
          options: ["Một lớp con ghi đè phương thức tạo sản phẩm của lớp cha.", "Dựa vào enum để chọn đối tượng State trong switch.", "Cập nhật trạng thái trước khi chọn đối tượng."],
          answer: 1,
          hint: "Nhìn vai trò của Status làm đầu vào và xem StateFor trả về kiểu đối tượng gì.",
          explanation: "StateFor ánh xạ enum sang một thực thi IProjectState. Factory Method theo GoF yêu cầu cơ chế để lớp dẫn xuất quyết định sản phẩm qua phương thức tạo."
        }
      ]
    }
  }
};
