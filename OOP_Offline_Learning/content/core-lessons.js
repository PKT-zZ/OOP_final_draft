(function () {
  'use strict';

  const p = text => ({ type: 'p', text });
  const h = text => ({ type: 'heading', text });
  const note = (title, text) => ({ type: 'note', title, text });
  const table = (headers, rows) => ({ type: 'table', headers, rows });
  const example = (title, code, output, notes) => ({ type: 'code', title, code, output, notes });
  const quiz = (question, options, answer, hint, explanation) => ({ question, options, answer, hint, explanation });

  Object.assign(window.OOPCourse.lessons, {
    abstraction: {
      minutes: 18,
      intro: 'Chọn những thao tác mà bên sử dụng cần biết, rồi quyết định phần nào thuộc hợp đồng và phần nào thuộc cách thực hiện.',
      goals: ['Giải thích trừu tượng hóa và đóng gói bằng hai câu hỏi khác nhau.', 'Đọc interface, abstract class và chọn kiểu phù hợp.', 'Theo dấu một service nhận repository qua constructor.'],
      related: ['encapsulation', 'inheritance', 'polymorphism', 'organization'],
      tabs: {
        theory: [
          h('Chọn điều cần biết'),
          p('Bạn gọi thang máy bằng nút chọn tầng. Thao tác chọn tầng là phần có ý nghĩa với người dùng. Cơ chế điều khiển động cơ là chi tiết bên trong. Trừu tượng hóa chọn những dữ liệu và thao tác cần thiết để làm việc với một đối tượng trong một ngữ cảnh. Một lớp cũng có thể tạo ra sự trừu tượng qua API dễ hiểu.'),
          p('Trong C#, interface khai báo hợp đồng mà một kiểu phải đáp ứng. Một biến IVehicle cho phép gọi những thành viên đã khai báo trong IVehicle. Người gọi có thể sử dụng Car hoặc Bus nếu cả hai đáp ứng hợp đồng. Nhờ đó, nơi gọi tập trung vào công việc cần làm.'),
          table(['Công cụ', 'Thể hiện trong C#', 'Khi phù hợp'], [
            ['Interface', 'class Car : IVehicle. Một lớp có thể triển khai nhiều interface.', 'Các kiểu cùng cung cấp một khả năng, dù có cách lưu trạng thái khác nhau.'],
            ['Abstract class', 'abstract class Vehicle. Có field, constructor, phương thức đã cài và abstract method.', 'Các kiểu cùng một họ cần chia sẻ trạng thái và hành vi. Mỗi lớp chỉ có một lớp cơ sở trực tiếp.'],
            ['Đóng gói', 'Field riêng và thao tác cập nhật có kiểm tra.', 'Kiểm soát đường đọc/ghi để giữ dữ liệu hợp lệ.'],
            ['Trừu tượng hóa', 'Hợp đồng nêu thao tác có ý nghĩa với bên gọi.', 'Giảm số chi tiết mà bên gọi cần hiểu.']
          ]),
          h('Abstract class dùng thế nào?'),
          p('abstract class Shape có thể khai báo public abstract double Area();. Lớp Circle : Shape phải override Area nếu Circle là lớp cụ thể. Shape có thể giữ dữ liệu chung và constructor kiểm tra dữ liệu đó. Bạn tạo Circle rồi dùng qua biến Shape. Một abstract class cũng có thể không khai báo abstract method.'),
          note('Dễ nhầm', 'Interface có thể có cài đặt mặc định trong C# hiện đại. Điều cần xét là hợp đồng bên gọi cần và trạng thái chung giữa các lớp. Thêm interface cho mọi lớp sẽ tăng số tệp và công việc bảo trì, nên cần lý do cụ thể.')
        ],
        example: [
          example('Cùng hợp đồng di chuyển', `using System;
IVehicle vehicle = new Car();
Console.WriteLine(vehicle.Move());
vehicle = new Bus();
Console.WriteLine(vehicle.Move());
public interface IVehicle { string Move(); }
public class Car : IVehicle { public string Move() => "Xe con chạy"; }
public class Bus : IVehicle { public string Move() => "Xe buýt chạy"; }`, 'Xe con chạy\nXe buýt chạy', [
            { label: 'Biến và đối tượng', text: 'vehicle có kiểu IVehicle. new Car() tạo đối tượng thực. Move được gọi qua hợp đồng và chạy phần cài đặt của đối tượng đang được tham chiếu.' },
            { label: 'Tự thử', text: 'Đặt một lớp Bicycle triển khai Move. Lời gọi vehicle.Move() vẫn dùng được sau khi gán một Bicycle.' }
          ])
        ],
        project: [
          p('ProjectService nhận IPeopleRepository và IProjectRepository. Hợp đồng thứ nhất phục vụ tra người, hợp đồng thứ hai phục vụ tra và lưu đề tài. InMemoryResearchRepository triển khai cả hai. Menu cung cấp JsonResearchRepository còn test dùng kho trong bộ nhớ.'),
          note('Điểm nối A–B', 'ICompletionEvidence khai báo HasScoredCouncil và HasResearchOutput. ProjectService.Complete dùng hợp đồng này. Menu 16 truyền ResultCompletionEvidence đọc từ IResultRepository. Ca A-BRIDGE thay bằng FakeCompletionEvidence để chủ động tạo từng điều kiện thử.'),
          p('Khi chuyển sang database, nhóm cần cài lại kho theo các hợp đồng và chọn kho mới ở nơi khởi tạo. Đồng thời phải kiểm tra quy tắc so mã, xử lý thiếu dữ liệu và ý nghĩa Save. Cùng chữ ký là bước đầu để thay thế được hành vi.')
        ],
        defense: [
          h('Vì sao sử dụng interface ở đây?'),
          p('Service chỉ cần tra và lưu hồ sơ. Em truyền kho qua interface để dùng cùng nghiệp vụ với kho JSON khi chạy menu và kho bộ nhớ khi kiểm thử. Nhờ đó test nghiệp vụ có thể chuẩn bị dữ liệu riêng mà không cần ghi tệp.'),
          h('Nếu bỏ interface?'),
          p('Nếu service gọi trực tiếp JsonResearchRepository, việc tạo service phụ thuộc luôn cấu hình và dữ liệu tệp. Khi thử quy tắc đề tài hoặc thay cách lưu, em phải xử lý thêm những phụ thuộc đó.'),
          h('Câu hỏi tiếp theo'),
          p('Hai kho cùng triển khai một interface có bảo đảm cho kết quả giống nhau không? Hãy lấy quy tắc so mã không phân biệt hoa thường làm ví dụ về hành vi phải thống nhất.')
        ]
      },
      quiz: [
        quiz('Trừu tượng hóa giúp bên gọi điều gì?', ['Biết mọi field nội bộ', 'Làm việc qua các thao tác cần thiết', 'Bỏ mọi kiểm tra dữ liệu'], 1, 'Xem người dùng thang máy cần thao tác nào.', 'Bên gọi dùng phần hợp đồng phục vụ công việc. Kiểm tra dữ liệu vẫn cần ở nơi chịu trách nhiệm.'),
        quiz('Một lớp C# có thể triển khai bao nhiêu interface?', ['Tối đa một', 'Đúng hai', 'Nhiều interface'], 2, 'Phân biệt lớp cơ sở trực tiếp với hợp đồng.', 'C# cho phép triển khai nhiều interface và kế thừa một lớp cơ sở trực tiếp.'),
        quiz('Khi cần trạng thái và constructor chung cho một họ lớp, công cụ nào phù hợp?', ['Abstract class', 'Một enum', 'Một biến local'], 0, 'Thành phần nào có thể giữ field theo từng đối tượng?', 'Abstract class giữ dữ liệu và logic chung. Enum biểu diễn tập giá trị, còn biến local không định nghĩa một họ kiểu.'),
        quiz('Đổi kho JSON sang SQL cần kiểm tra thêm gì sau khi khớp chữ ký?', ['Màu chữ console', 'Thứ tự tên file', 'Ý nghĩa Save và quy tắc tra mã'], 2, 'Hợp đồng còn có hành vi mà bên gọi dựa vào.', 'Khớp chữ ký giúp biên dịch. Cách so mã, giá trị null và tác dụng lưu quyết định khả năng thay thế thực tế.'),
        quiz('FakeCompletionEvidence xác nhận điều gì?', ['Phía A xử lý các trường hợp bằng chứng đã chuẩn bị', 'Hội đồng thật đã được ghi vào JSON', 'UC07 đã chạy từ menu'], 0, 'Xem nguồn cung cấp câu trả lời cho service.', 'Đối tượng giả lập kiểm tra phía nhận hợp đồng. Muốn xác nhận tích hợp thật cần dữ liệu và đường gọi của phân hệ B.')
      ]
    },
    inheritance: {
      minutes: 18,
      intro: 'Theo dấu lớp cơ sở và lớp dẫn xuất, từ constructor đến phương thức được ghi đè trong kho dữ liệu.',
      goals: ['Đọc base, virtual, override, abstract và sealed.', 'Phân biệt is-a với has-a.', 'Giải thích lợi ích và giới hạn của kho JSON kế thừa kho bộ nhớ.'],
      related: ['abstraction', 'polymorphism', 'relationships', 'organization'],
      tabs: {
        theory: [
          h('Một dạng cụ thể của kiểu chung'),
          p('Dog là một dạng Animal. Biến Animal có thể tham chiếu một Dog. Quan hệ is-a có ích khi lớp dẫn xuất đáp ứng những điều mà người dùng lớp cơ sở mong đợi. Hai lớp có vài dòng code giống nhau chưa đủ lý do để xây dựng quan hệ này.'),
          table(['Từ khóa', 'Tác dụng'], [
            ['virtual', 'Phương thức lớp cơ sở có thân và cho phép lớp dẫn xuất ghi đè.'],
            ['override', 'Cung cấp cách thực thi mới cho thành viên virtual hoặc abstract được kế thừa.'],
            ['abstract', 'Lớp abstract không tạo trực tiếp bằng new. Phương thức abstract yêu cầu lớp cụ thể cung cấp phần cài đặt.'],
            ['sealed', 'Ngăn tạo lớp dẫn xuất tiếp từ lớp đó.'],
            ['base', 'Gọi constructor hoặc phần cài đặt ở lớp cơ sở.'],
            ['protected', 'Cho phép lớp dẫn xuất truy cập theo quy tắc kế thừa. Field private của lớp cơ sở vẫn do lớp cơ sở quản lý.']
          ]),
          h('Khởi tạo từ phần chung đến phần riêng'),
          p('Constructor không được kế thừa như phương thức thông thường. Dog tự khai báo constructor và dùng : base(name) để truyền dữ liệu cho Animal. Thân constructor cơ sở chạy trước thân constructor dẫn xuất. Nếu cơ sở không có constructor không tham số, lớp con phải chỉ rõ constructor phù hợp.'),
          h('Khi nào dùng một đối tượng cộng tác?'),
          p('Car có Engine là quan hệ has-a. Car có thể giữ một Engine và gọi Start trên nó. Cách kết hợp các đối tượng này giúp thay động cơ mà không biến Car thành Engine. Kế thừa làm lớp con gắn với hành vi cơ sở, còn kết hợp cho phép chọn cộng tác viên theo nhu cầu.'),
          note('Dễ nhầm', 'Dấu : dùng cho cả kế thừa lớp và triển khai interface. Từ khóa new để che phương thức khác với override. Khi muốn hành vi đa hình qua lớp cơ sở, hãy kiểm tra virtual/override.')
        ],
        example: [
          example('Constructor cơ sở và phương thức ghi đè', `using System;
Animal pet = new Dog("Mực");
Console.WriteLine(pet.Speak());
public abstract class Animal
{
    protected string Name { get; }
    protected Animal(string name) => Name = name;
    public virtual string Speak() => Name;
}
public sealed class Dog : Animal
{
    public Dog(string name) : base(name) { }
    public override string Speak() => base.Speak() + " sủa";
}`, 'Mực sủa', [
            { label: 'base(name)', text: 'Animal nhận Mực và lưu Name trước khi hoàn tất Dog. protected cho phép Dog dùng thành viên theo quan hệ kế thừa.' },
            { label: 'override và base.Speak()', text: 'pet.Speak() đi vào Dog.Speak. Bên trong, base.Speak() lấy tên theo cách cơ sở rồi ghép thêm hành vi sủa.' }
          ])
        ],
        project: [
          p('InMemoryResearchRepository giữ Dictionary và các phương thức Save virtual. JsonResearchRepository kế thừa lớp này, dùng dữ liệu đã nạp trong bộ nhớ để tra cứu, rồi bổ sung ghi snapshot sau mỗi lần Save.'),
          p('Mỗi override gọi EnsureWritable, base.Save rồi Persist. Cách này tái dùng thao tác lưu vào Dictionary. Nếu Persist lỗi sau khi base.Save đã chạy, bộ nhớ có thể khác tệp. Kho chặn lần Save tiếp theo và menu dừng phiên.'),
          note('Đánh đổi', 'Kho JSON phụ thuộc thứ tự và hành vi của Save cơ sở. Một thiết kế kết hợp có thể giữ kho bộ nhớ như một đối tượng riêng và điều phối ghi tệp rõ hơn, nhưng cần thêm mã. Khi bảo vệ, trình bày lựa chọn hiện tại cùng tình huống ghi lỗi.')
        ],
        defense: [
          h('Kế thừa xuất hiện ở đâu trong dự án?'),
          p('JsonResearchRepository kế thừa InMemoryResearchRepository và override các Save. Em có thể dùng kho JSON qua các hợp đồng mà kho cơ sở triển khai, đồng thời giữ thêm bước Persist.'),
          h('Tại sao không kế thừa Researcher từ ResearchProject?'),
          p('Nhà nghiên cứu tham gia đề tài qua ProjectParticipation. Hai đối tượng có vai trò nghiệp vụ riêng. Lớp tham gia lưu mã đề tài, mã người và vai trò để biểu diễn quan hệ.'),
          h('Nếu Save cơ sở đổi cách xử lý?'),
          p('Em cần kiểm lại override JSON và các caller. Thứ tự cập nhật bộ nhớ rồi ghi tệp là một giả định hiện tại, nên thay đổi ở lớp cơ sở có thể ảnh hưởng lỗi lưu.')
        ]
      },
      quiz: [
        quiz('Trong Animal pet = new Dog(), đối tượng thực là gì?', ['Animal thuần', 'Dog', 'Một interface'], 1, 'Nhìn toán tử new.', 'new Dog tạo Dog. Animal là kiểu biến dùng để truy cập đối tượng.'),
        quiz('Để ghi đè phương thức cơ sở có sẵn thân, cặp từ khóa nào phù hợp?', ['virtual và override', 'private và const', 'static và readonly'], 0, 'Xem phương thức cơ sở có cho phép thay cách thực thi không.', 'virtual mở khả năng ghi đè. override cung cấp phần thực thi của lớp con.'),
        quiz('Trong ví dụ Dog, thân constructor nào chạy trước?', ['Dog', 'Cả hai cùng lúc', 'Animal'], 2, 'Phần dữ liệu chung phải được khởi tạo trước.', 'Lời gọi base(name) khởi tạo Animal trước thân constructor Dog.'),
        quiz('Điều gì xảy ra nếu Persist lỗi sau base.Save?', ['Bộ nhớ có thể đã cập nhật', 'C# tự hoàn tác Dictionary', 'Dữ liệu chắc chắn đã lên đĩa'], 0, 'Đọc thứ tự các lời gọi trong override.', 'Cập nhật bộ nhớ xảy ra trước ghi snapshot. Cơ chế hiện tại báo lỗi và ngăn lưu tiếp trong phiên.'),
        quiz('Car có Engine gợi ý cách thiết kế nào?', ['Car kế thừa Engine', 'Car giữ và dùng Engine', 'Engine phải là static'], 1, 'Thử đọc câu Car là một Engine.', 'Quan hệ chứa hoặc cộng tác phù hợp với việc Car sử dụng động cơ. Ownership cụ thể cần xem vòng đời và thiết kế.')
      ]
    },
    polymorphism: {
      minutes: 17,
      intro: 'Tách kiểu biến khỏi kiểu đối tượng thực để hiểu vì sao cùng một lời gọi có thể thực thi các phương thức khác nhau.',
      goals: ['Phân biệt overload với override.', 'Theo dấu lời gọi qua interface.', 'Giải thích vai trò đa hình trong State và Strategy.'],
      related: ['abstraction', 'inheritance', 'patterns'],
      tabs: {
        theory: [
          h('Một lời gọi qua nhiều cách thực thi'),
          p('Đa hình cho phép dùng các đối tượng qua một kiểu chung. Với IVoice voice, người gọi dùng voice.Speak(). Nếu đối tượng là Dog thì chạy Dog.Speak. Nếu là Cat thì chạy Cat.Speak. Cơ chế chọn phần thực thi theo đối tượng lúc chạy gọi là dynamic dispatch.'),
          table(['Cơ chế', 'Thời điểm lựa chọn', 'Ví dụ'], [
            ['Overloading', 'Trình biên dịch chọn chữ ký dựa vào đối số và kiểu tĩnh trong lời gọi thông thường.', 'Print(int value) và Print(string value).'],
            ['Overriding', 'Thành viên virtual/abstract được gọi theo đối tượng thực lúc chạy.', 'Animal pet = new Dog(); pet.Speak().'],
            ['Qua interface', 'Gọi phần triển khai hợp đồng trên đối tượng thực.', 'IReportStrategy report = new FundingBySourceStrategy(repo).']
          ]),
          p('Overloading thường được gọi là đa hình lúc biên dịch. Overriding và lời gọi interface thể hiện đa hình lúc chạy. Hai phương thức cùng tên ở hai lớp không liên hệ qua kiểu chung chưa chứng minh caller đang dùng đa hình.'),
          note('Dễ nhầm', 'Kiểu biến giới hạn thành viên có thể gọi tại chỗ viết code. Kiểu đối tượng quyết định phần thực thi của thao tác đa hình. static method không được override như instance virtual method.')
        ],
        example: [
          example('Hai đối tượng qua IVoice', `using System;
IVoice voice = new Dog();
Console.WriteLine(voice.Speak());
voice = new Cat();
Console.WriteLine(voice.Speak());
public interface IVoice { string Speak(); }
public class Dog : IVoice { public string Speak() => "Gâu"; }
public class Cat : IVoice { public string Speak() => "Meo"; }`, 'Gâu\nMeo', [
            { label: 'Sau phép gán thứ hai', text: 'Biến vẫn có kiểu IVoice. Nó đang tham chiếu Cat nên Speak đi vào Cat.Speak. Việc gán biến không sửa đối tượng Dog đã tạo.' }
          ]),
          { type: 'explorer', title: 'Theo dấu lời gọi đa hình', intro: 'Mô phỏng JavaScript. Chọn đối tượng để xem đường gọi của ví dụ C#.', items: [
            { label: 'new Dog()', relation: 'IVoice voice → Dog', detail: 'voice.Speak() gọi Dog.Speak(). Kết quả Gâu. Kiểu tĩnh của biến vẫn là IVoice.' },
            { label: 'new Cat()', relation: 'IVoice voice → Cat', detail: 'voice.Speak() gọi Cat.Speak(). Kết quả Meo. Cùng một chữ ký, đối tượng hiện được tham chiếu quyết định phần thực thi.' }
          ] }
        ],
        project: [
          p('ResearchProject.Approve chọn StateFor(Status) rồi gọi Approve qua IProjectState. PendingState có thể duyệt, còn ActiveState từ chối duyệt lần nữa. Sự khác biệt hành vi có thể là trả kết quả, đổi dữ liệu hoặc ném lỗi.'),
          p('FundingByProjectStrategy và FundingBySourceStrategy cùng triển khai IReportStrategy. BuildRows trả cùng cấu trúc dòng báo cáo nhưng dùng tiêu chí tổng hợp khác nhau. Menu chọn đối tượng chiến lược tương ứng.'),
          note('Repository cũng có đa hình', 'Service gọi Save qua IProjectRepository. Khi menu cung cấp JsonResearchRepository, lời gọi chạy override có Persist. Khi test cung cấp InMemoryResearchRepository, lời gọi cập nhật bộ nhớ.')
        ],
        defense: [
          h('Em chỉ ra một lời gọi đa hình cụ thể'),
          p('Trong ResearchProject.Approve, biểu thức StateFor(Status) trả IProjectState. Lời gọi Approve thực thi PendingState hoặc ActiveState theo trạng thái. Khi đã Active, cùng thao tác duyệt bị từ chối.'),
          h('Overload có chọn theo trạng thái đề tài không?'),
          p('Overload chọn chữ ký phương thức phù hợp với đối số. Trong dự án, việc chọn State dựa vào Status rồi gọi interface là cơ chế khác. Em sẽ chỉ cả kiểu trả về IProjectState và lớp thực được chọn.'),
          h('Chi phí của cách thiết kế'),
          p('Có thêm interface và lớp cụ thể để đọc. Đổi lại, quy tắc của từng State và cách tính của từng Strategy tập trung ở các lớp tương ứng.')
        ]
      },
      quiz: [
        quiz('IVoice v = new Cat(); v.Speak() chạy ở đâu?', ['Dog.Speak', 'Cat.Speak', 'Không thể gọi qua interface'], 1, 'Nhìn đối tượng hiện được tham chiếu.', 'Cat triển khai Speak nên lời gọi qua hợp đồng đi vào phần cài đặt đó.'),
        quiz('Print(int) và Print(string) trong cùng lớp là gì?', ['Override', 'Kế thừa', 'Overload'], 2, 'So các danh sách tham số.', 'Đây là các chữ ký khác nhau cùng tên. Compiler chọn overload phù hợp khi gọi.'),
        quiz('Đề tài Active được gọi Approve lại sẽ thế nào?', ['ActiveState ném lỗi', 'Tự chuyển Completed', 'Tạo chủ nhiệm mới'], 0, 'Xem hành vi của State hiện tại.', 'ActiveState.Approve từ chối vì đề tài đã duyệt.'),
        quiz('Đổi Strategy theo nguồn có làm đổi Status không?', ['Có, luôn sang Active', 'Chỉ thay cách xây dòng báo cáo', 'Có, xóa lịch sử'], 1, 'Xem dữ liệu nào được thuật toán đọc và ghi.', 'Các Strategy kinh phí đọc các khoản cấp và tạo ReportRow. Chúng không chuyển trạng thái.'),
        quiz('Một lời gọi Save qua IProjectRepository chạy Persist khi nào trong menu hiện tại?', ['Khi đối tượng thật là kho JSON', 'Vì tên biến có chữ data', 'Mọi interface tự ghi JSON'], 0, 'Theo kiểu thực được truyền từ ConsoleMenu.', 'JsonResearchRepository override Save và gọi Persist. Interface chỉ khai báo hợp đồng.')
      ]
    },
    relationships: {
      minutes: 18,
      intro: 'Đọc sơ đồ bằng ý nghĩa quan hệ và số lượng đối tượng, rồi kiểm chứng với field, phương thức và vòng đời trong code.',
      goals: ['Đọc các ký hiệu UML thường gặp.', 'Giải thích quan hệ tham gia nhiều–nhiều.', 'Phân biệt sở hữu vòng đời với việc giữ một tham chiếu.'],
      related: ['oop', 'abstraction', 'inheritance', 'organization', 'use-cases'],
      tabs: {
        theory: [
          h('Từ các object đến quan hệ lớp'),
          p('Sơ đồ lớp nói về kiểu và quan hệ có thể có giữa các thể hiện. Sơ đồ object thể hiện các đối tượng cụ thể ở một thời điểm. Một List<Researcher> cho biết cách giữ nhiều tham chiếu, nhưng cần thêm quy tắc để kết luận ai sở hữu vòng đời.'),
          table(['Quan hệ', 'Ký hiệu UML', 'Cách đọc'], [
            ['Association', 'Đường liền', 'Các thể hiện có liên hệ với nhau. Có thể ghi vai trò và số lượng ở đầu đường.'],
            ['Aggregation', 'Hình thoi rỗng ở phía toàn thể', 'Quan hệ toàn thể–bộ phận với ý nghĩa sở hữu yếu. Cần chú giải ngữ cảnh.'],
            ['Composition', 'Hình thoi đặc ở phía toàn thể', 'Bộ phận thuộc tối đa một toàn thể tại một thời điểm và vòng đời được quản lý bởi toàn thể.'],
            ['Dependency', 'Đường đứt, mũi tên về bên được dùng', 'Một lớp sử dụng kiểu khác trong tham số hoặc một thao tác.'],
            ['Inheritance', 'Đường liền, tam giác rỗng về lớp cơ sở', 'Lớp con là một dạng của lớp cơ sở.'],
            ['Realization', 'Đường đứt, tam giác rỗng về interface', 'Lớp thực hiện hợp đồng interface.']
          ]),
          p('Multiplicity 1 nghĩa là đúng một, 0..1 là có thể thiếu, 0..* là từ không đến nhiều. Hãy đọc con số ở đầu bên kia của quan hệ. Với một ResearchProject có 0..* ProjectParticipation, đề tài mới có thể chưa có ai tham gia. Quy tắc đúng một Leader chỉ áp dụng ở thời điểm duyệt.'),
          note('Dễ nhầm', 'Từ khóa private và toán tử new trong một constructor chưa tự chứng minh composition. Cần xét việc chia sẻ bộ phận, chuyển quyền sở hữu, và hành vi khi toàn thể kết thúc vòng đời.')
        ],
        example: [
          example('Hai nhóm dùng cùng một người', `using System;
var person = new Person("Lan");
var first = new Team(person);
var second = new Team(person);
Console.WriteLine(ReferenceEquals(first.Leader, second.Leader));
public record Person(string Name);
public class Team
{
    public Person Leader { get; }
    public Team(Person leader) => Leader = leader;
}`, 'True', [
            { label: 'Chia sẻ tham chiếu', text: 'Hai Team giữ cùng Person. Đoạn code minh họa association với một người làm Leader cho mỗi Team. Chỉ từ thuộc tính này chưa thể kết luận cả vòng đời Person thuộc một Team.' }
          ])
        ],
        project: [
          { type: 'explorer', title: 'UML Explorer · Các quan hệ đã đối chiếu', intro: 'Chọn một quan hệ. Ký hiệu dạng chữ diễn giải sơ đồ lớp rút gọn theo code phần A.', items: [
            { label: 'Đề tài và lần tham gia', relation: 'ResearchProject 1 ◆── 0..* ProjectParticipation', detail: 'Đề tài giữ _members và tạo ProjectParticipation trong AddMember. Mỗi lần tham gia chứa ProjectId, ResearcherId và Role. Dữ liệu tham gia được lưu cùng snapshot đề tài. Đây là cách biểu diễn bộ phận thuộc đề tài trong mô hình hiện hành. Nguồn Projects.cs, ResearchProject.AddMember.' },
            { label: 'Đề tài và nhà nghiên cứu', relation: 'ResearchProject * ── * Researcher, qua ProjectParticipation', detail: 'Một người có thể tham gia nhiều đề tài. Một đề tài có nhiều người. ProjectParticipation mang vai trò theo từng đề tài. Nhà nghiên cứu có hồ sơ riêng trong kho nhân sự. Nguồn Projects.cs:17–30 và People.cs:22–55.' },
            { label: 'Service dùng hợp đồng', relation: 'ProjectService ──> IProjectRepository', detail: 'Service nhận và giữ repository bằng constructor để tra và Save. Mũi tên hướng đến hợp đồng mà service dùng. Nguồn ProjectService.cs:5–22.' },
            { label: 'Kho thực hiện hợp đồng', relation: 'InMemoryResearchRepository - -▷ IProjectRepository', detail: 'Đây là realization. Kho triển khai FindProject, Projects và Save. Cùng lớp này còn triển khai IPeopleRepository và IResultRepository. Xem khai báo lớp trong InMemoryResearchRepository.cs.' },
            { label: 'Kho JSON mở rộng kho bộ nhớ', relation: 'JsonResearchRepository ──▷ InMemoryResearchRepository', detail: 'Tam giác hướng tới lớp cơ sở. Kho JSON kế thừa dữ liệu và thao tác tra cứu, ghi đè Save. Nguồn JsonResearchRepository.cs:8,50–53.' },
            { label: 'Model gọi State', relation: 'ResearchProject - -> IProjectState', detail: 'StateFor tạo đối tượng xử lý theo enum. ResearchProject gọi qua IProjectState trong Approve hoặc Complete. Code hiện tại không giữ một field State xuyên suốt vòng đời. Nguồn Projects.cs:79–80,135–141.' }
          ] },
          p('Các quan hệ trên tập trung vào lớp của phần A. Khi đọc phần đầu ra, kiểm thêm quan hệ kế thừa Paper và ProjectDeliverable từ ResearchOutput, cùng ProjectPaperLink lưu cặp mã bài báo và đề tài. Đối chiếu Business/Models/outputs.cs.')
        ],
        defense: [
          h('Vì sao cần ProjectParticipation?'),
          p('Vai trò Leader hoặc Member phụ thuộc đề tài cụ thể. Nếu đặt một vai trò chung trên Researcher thì không biểu diễn được người làm chủ nhiệm đề tài này nhưng là thành viên đề tài khác.'),
          h('Một đề tài có đúng một chủ nhiệm mọi lúc không?'),
          p('Khi Pending và đang lập danh sách, có thể chưa có chủ nhiệm. AddMember giữ tối đa một. Đến Approve, State yêu cầu đúng một. Em sẽ ghi rõ điều kiện theo trạng thái bên cạnh multiplicity.'),
          h('Thấy List có kết luận composition ngay được không?'),
          p('Em cần xem vòng đời và quyền sở hữu. List chỉ thể hiện cách chứa phần tử. Với _members, AddMember tạo lần tham gia thuộc đề tài và snapshot lưu cùng đề tài, đó là bằng chứng bổ sung.')
        ]
      },
      quiz: [
        quiz('0..* ở phía ProjectParticipation được đọc thế nào?', ['Một đề tài luôn có một người', 'Một đề tài có từ không đến nhiều lần tham gia', 'Mọi người có một đề tài'], 1, 'Đọc từ một đề tài sang phía có con số.', 'Đề tài mới chưa có người vẫn hợp lệ. Khi duyệt mới thêm điều kiện đúng một Leader.'),
        quiz('Tam giác rỗng trong quan hệ kế thừa chỉ về đâu?', ['Lớp cơ sở', 'Lớp con', 'Đối tượng chạy gần nhất'], 0, 'Đầu nào biểu diễn kiểu tổng quát?', 'Đường kế thừa đi từ lớp dẫn xuất về lớp cơ sở.'),
        quiz('Quan hệ lớp triển khai interface gọi là gì?', ['Composition', 'Aggregation', 'Realization'], 2, 'Một lớp thực hiện các thành viên đã cam kết.', 'Realization biểu diễn thực hiện hợp đồng. Hai quan hệ toàn thể–bộ phận nói về ownership.'),
        quiz('Vì sao vai trò đề tài nằm trong ProjectParticipation?', ['Vì mọi Researcher chỉ có một vai trò suốt đời', 'Vì vai trò phụ thuộc cặp người–đề tài', 'Vì JSON không lưu được enum'], 1, 'Một người có thể là chủ nhiệm ở đâu và thành viên ở đâu?', 'Quan hệ tham gia lưu vai trò theo từng đề tài. Enum vẫn có thể được tuần tự hóa trong JSON.'),
        quiz('Một thuộc tính List<T> đủ để chứng minh composition chưa?', ['Chưa, cần xét ownership và vòng đời', 'Đủ, mọi List là composition', 'Chỉ đủ khi List là public'], 0, 'Phân biệt cấu trúc chứa với ý nghĩa sở hữu.', 'Cần xét quy tắc chia sẻ và quản lý vòng đời của bộ phận.')
      ]
    },
    organization: {
      minutes: 20,
      intro: 'Đặt mỗi quy tắc đúng chỗ và theo dấu việc các đối tượng được nối với nhau khi chương trình bắt đầu.',
      goals: ['Phân chia Model, Service, Repository và Presentation.', 'Giải thích DI, DIP và các nguyên lý SOLID ở mức thực dụng.', 'Phân biệt lời gọi runtime với phụ thuộc giữa kiểu.'],
      related: ['abstraction', 'relationships', 'patterns', 'architecture', 'testing'],
      tabs: {
        theory: [
          h('Trách nhiệm của từng phần'),
          p('Separation of Concerns nghĩa là tách những mối quan tâm khác nhau. Menu biết đọc lựa chọn và hiển thị lỗi. Service biết ai được thực hiện nghiệp vụ và các hồ sơ liên quan. Model biết dữ liệu của nó hợp lệ thế nào. Repository biết cách tra cứu và lưu.'),
          p('Cohesion mô tả mức độ các thao tác trong một lớp cùng phục vụ một trách nhiệm. Coupling mô tả mức độ lớp này dựa vào chi tiết lớp khác. Khi model tự ghi JSON, thay đường dẫn hoặc cấu trúc tệp có thể kéo theo sửa model. Khi menu ôm mọi quy tắc, kiểm thử nghiệp vụ phải đi qua nhập xuất console.'),
          table(['Nguyên lý', 'Cách hiểu và giới hạn trong dự án'], [
            ['S · Single Responsibility', 'Một lớp có một nhóm lý do thay đổi rõ ràng. PeopleService quản lý nghiệp vụ hồ sơ, menu lo nhập xuất. Một lớp có nhiều phương thức vẫn có thể tập trung trách nhiệm.'],
            ['O · Open/Closed', 'Mở rộng qua điểm thay thế phù hợp. Thêm Strategy có thể tái dùng nơi nhận IReportStrategy, nhưng menu chọn chiến lược vẫn có thể cần sửa.'],
            ['L · Liskov Substitution', 'Thay đối tượng của kiểu chung phải giữ các cam kết mà caller dựa vào. Cần kiểm quyền, kết quả và lỗi chứ không chỉ chữ ký.'],
            ['I · Interface Segregation', 'Chia hợp đồng theo nhu cầu. PeopleService chỉ cần IPeopleRepository. ProjectService cần cả kho người và kho đề tài.'],
            ['D · Dependency Inversion', 'Nghiệp vụ dùng hợp đồng do Business định nghĩa. Data triển khai hợp đồng đó.']
          ]),
          h('Dependency Injection và Dependency Inversion'),
          p('DI là truyền đối tượng cộng tác từ bên ngoài, thường qua constructor. DIP là nguyên lý tổ chức phụ thuộc vào trừu tượng. Truyền một lớp cụ thể vào constructor vẫn là DI, nhưng chưa tự bảo đảm DIP. Ứng dụng nhỏ có thể nối các đối tượng bằng new trong menu mà không cần framework DI.'),
          note('Dễ nhầm', 'Repository là vai trò truy cập dữ liệu trong kiến trúc này. Ba mẫu chính của bài tập là State cho vòng đời đề tài, Strategy cho báo cáo và Factory Method cho việc tạo đầu ra nghiên cứu.')
        ],
        example: [
          example('Truyền cách gửi thông báo', `using System;
var service = new NoticeService(new ConsoleSender());
service.Notify("Đã nhận hồ sơ");
public interface ISender { void Send(string text); }
public class ConsoleSender : ISender
{
    public void Send(string text) => Console.WriteLine(text);
}
public class NoticeService
{
    private readonly ISender _sender;
    public NoticeService(ISender sender) => _sender = sender;
    public void Notify(string text) => _sender.Send(text);
}`, 'Đã nhận hồ sơ', [
            { label: 'Ai tạo đối tượng?', text: 'Dòng đầu tạo ConsoleSender và truyền vào NoticeService. Service dùng ISender nên có thể nhận cách gửi khác khi kiểm thử.' },
            { label: 'Liên hệ', text: 'Ví dụ chỉ minh họa DI. Trong dự án, Business không gọi Console. Presentation tạo kho rồi truyền vào service.' }
          ])
        ],
        project: [
          { type: 'diagram', label: 'Lời gọi khi phê duyệt', steps: [
            { title: 'ConsoleMenu', text: 'Đọc mã và gọi ProjectService.Approve.' },
            { title: 'ProjectService', text: 'Kiểm quyền và tìm đề tài qua IProjectRepository.' },
            { title: 'Model và State', text: 'ResearchProject ủy quyền cho State kiểm quy tắc và đổi trạng thái.' },
            { title: 'Data', text: 'Service gọi Save. Kho JSON cập nhật bộ nhớ và Persist.' }
          ] },
          p('Sơ đồ trên theo thứ tự gọi lúc chạy. Phụ thuộc kiểu có hướng khác ở biên Business–Data. ProjectService biết IProjectRepository trong Business, JsonResearchRepository trong Data triển khai hợp đồng đó. Presentation biết lớp cụ thể để tạo đối tượng.'),
          note('Thiết kế đang có', 'ConsoleMenu vừa là giao diện vừa là nơi khởi tạo và nối đối tượng. Đây là lựa chọn đơn giản cho một project console. Khi giao diện lớn hơn, có thể tách nơi khởi tạo, nhưng phải giữ việc các service dùng chung kho hiện hành.')
        ],
        defense: [
          h('Vì sao model không tự Save?'),
          p('Model kiểm quy tắc của chính nó. Service biết lúc nào thao tác nghiệp vụ đã thành công để yêu cầu lưu. Nếu model tự quản lý tệp, test quy tắc như số chủ nhiệm sẽ phải xử lý thêm lỗi đường dẫn và quyền ghi.'),
          h('Dự án đã tuân thủ mọi nguyên lý SOLID chưa?'),
          p('Em chỉ ra các quyết định cụ thể. Service nhận interface thể hiện hướng phụ thuộc vào hợp đồng. Strategy là điểm mở rộng cách tổng hợp. Menu vẫn biết các lớp cụ thể và StateFor vẫn có switch phải cập nhật khi thêm trạng thái.'),
          h('Nếu đổi giao diện console?'),
          p('Giao diện mới có thể gọi cùng các service và model. Nó vẫn phải chuyển dữ liệu đầu vào đúng kiểu và hiển thị lỗi. Quyền cần được kiểm trong service để caller mới cũng tuân theo.')
        ]
      },
      quiz: [
        quiz('Nơi phù hợp để kiểm quyền phê duyệt là đâu?', ['Chỉ trong menu', 'Trong service', 'Trong CSS'], 1, 'Một caller khác có thể gọi thẳng nghiệp vụ.', 'Service kiểm quyền để mọi caller dùng cùng điều kiện. Menu có thể hỗ trợ giao diện nhưng không thay kiểm quyền nghiệp vụ.'),
        quiz('DI qua constructor có bắt buộc framework không?', ['Có', 'Chỉ khi dùng interface', 'Có thể truyền bằng new trực tiếp'], 2, 'Xem cách NoticeService được tạo.', 'Constructor injection chỉ cần bên ngoài cung cấp dependency. Framework là lựa chọn quản lý khởi tạo khi quy mô cần.'),
        quiz('Ai định nghĩa IProjectRepository trong kiến trúc hiện tại?', ['Business', 'Một CDN', 'Presentation CSS'], 0, 'Xem namespace và thư mục của hợp đồng.', 'Hợp đồng nằm trong Business/Interfaces. Data triển khai và Presentation nối đối tượng.'),
        quiz('Thêm State mới có thể cần sửa chỗ nào ngoài lớp State?', ['Không thể cần sửa chỗ nào', 'StateFor và enum trạng thái', 'Tên tác giả trong README'], 1, 'Xem ánh xạ trạng thái sang đối tượng.', 'StateFor chọn bằng switch và ProjectStatus chứa tập trạng thái. Đây là giới hạn cần nêu khi nói về mở rộng.'),
        quiz('Cohesion cao có ý nghĩa nào?', ['Lớp gọi mọi lớp khác', 'Lớp chỉ có đúng một phương thức', 'Các thao tác cùng phục vụ trách nhiệm rõ ràng'], 2, 'Xem những lý do khiến lớp cần thay đổi.', 'Số phương thức không quyết định cohesion. Điều quan trọng là chúng liên quan và phục vụ một trách nhiệm nhất quán.')
      ]
    }
  });
  window.OOPCourse.lessons.abstraction.tabs.project.push({
  "type": "code",
  "title": "Hợp đồng truy cập đề tài",
  "source": {
    "path": "QLNCKH_OOP_FINAL/Business/Interfaces/Repositories.cs",
    "lines": [
      17,
      24
    ],
    "symbol": "IProjectRepository"
  },
  "code": "public interface IProjectRepository\n{\n    ProjectCategory? FindCategory(string id);\n    ResearchProject? FindProject(string id);\n    FundingSource? FindSource(string id);\n    IReadOnlyCollection<ResearchProject> Projects { get; }\n    void Save(ResearchProject project);\n    void Save(FundingSource source);",
  "notes": [
    {
      "label": "Đọc và tự giải thích",
      "text": "FindProject có thể trả null, nên caller phải xử lý hồ sơ chưa có. Hai Save là overload theo kiểu tham số. Projects trả tập hợp chỉ đọc để service duyệt."
    }
  ]
});
  window.OOPCourse.lessons.inheritance.tabs.project.push({
  "type": "code",
  "title": "Ghi đè thao tác lưu",
  "source": {
    "path": "QLNCKH_OOP_FINAL/Data/JsonResearchRepository.cs",
    "lines": [
      49,
      53
    ],
    "symbol": "JsonResearchRepository.Save"
  },
  "code": "    // Nếu Persist lỗi, bộ nhớ có thể khác file. Cấm mọi Save tiếp theo trong phiên\n    public override void Save(Department value) { EnsureWritable(); base.Save(value); Persist(); }\n    public override void Save(Researcher value) { EnsureWritable(); base.Save(value); Persist(); }\n    public override void Save(ResearchProject value) { EnsureWritable(); base.Save(value); Persist(); }\n    public override void Save(FundingSource value) { EnsureWritable(); base.Save(value); Persist(); }",
  "notes": [
    {
      "label": "Đọc và tự giải thích",
      "text": "EnsureWritable kiểm phiên còn cho phép lưu. base.Save cập nhật kho bộ nhớ. Persist ghi snapshot. Cả bốn override cùng thứ tự này, nên lỗi ghi cần được xử lý ở biên giao diện."
    }
  ]
});
  window.OOPCourse.lessons.polymorphism.tabs.project.push({
  "type": "code",
  "title": "Chọn đối tượng State",
  "source": {
    "path": "QLNCKH_OOP_FINAL/Business/Models/Projects.cs",
    "lines": [
      135,
      141
    ],
    "symbol": "ResearchProject.StateFor"
  },
  "code": "    private static IProjectState StateFor(ProjectStatus status) => status switch\n    {\n        ProjectStatus.Pending => new PendingState(),\n        ProjectStatus.Active => new ActiveState(),\n        ProjectStatus.Completed => new CompletedState(),\n        _ => throw new InvalidOperationException(\"Trạng thái đề tài không hợp lệ.\")\n    };",
  "notes": [
    {
      "label": "Đọc và tự giải thích",
      "text": "StateFor trả IProjectState. Status quyết định tạo PendingState, ActiveState hay CompletedState. Nhánh mặc định ném lỗi nếu enum không hợp lệ. Approve và Complete gọi phương thức qua đối tượng được chọn."
    }
  ]
});
  window.OOPCourse.lessons.relationships.tabs.project.push({
  "type": "code",
  "title": "Quan hệ người tham gia đề tài",
  "source": {
    "path": "QLNCKH_OOP_FINAL/Business/Models/Projects.cs",
    "lines": [
      17,
      30
    ],
    "symbol": "ProjectParticipation"
  },
  "code": "public sealed class ProjectParticipation\n{\n    public string ProjectId { get; }\n    public string ResearcherId { get; }\n    public ProjectRole Role { get; }\n\n    public ProjectParticipation(string projectId, string researcherId, ProjectRole role)\n    {\n        if (!Enum.IsDefined(role)) throw new ArgumentOutOfRangeException(nameof(role), \"Vai trò đề tài không hợp lệ.\");\n        ProjectId = Guard.Required(projectId, nameof(projectId));\n        ResearcherId = Guard.Required(researcherId, nameof(researcherId));\n        Role = role;\n    }\n}",
  "notes": [
    {
      "label": "Đọc và tự giải thích",
      "text": "Ba property chỉ đọc xác định đề tài, người và vai trò của lần tham gia. Constructor chuẩn hóa mã và từ chối vai trò enum ngoài tập hợp. ResearchProject.AddMember còn kiểm các quy tắc của cả danh sách."
    }
  ]
});
  window.OOPCourse.lessons.organization.tabs.project.push({
  "type": "code",
  "title": "Nối các service với cùng kho",
  "source": {
    "path": "QLNCKH_OOP_FINAL/Presentation/ConsoleMenu.cs",
    "lines": [
      22,
      30
    ],
    "symbol": "ConsoleMenu.ConsoleMenu"
  },
  "code": "    public ConsoleMenu()\n    {\n        _people  = new PeopleService(_data);\n        _projects = new ProjectService(_data, _data);\n        _funding = new FundingService(_data);\n        _evaluation = new EvaluationService(_data, _data, _data);\n        _outputs = new OutputService(_data, _data, _data);\n        _lookup = new ProjectLookupService(_data, _data);\n    }",
  "notes": [
    {
      "label": "Đọc và tự giải thích",
      "text": "Cùng _data được truyền cho các service A và B. ProjectService nhận hai tham số hợp đồng, EvaluationService và OutputService nhận ba. Tất cả đều tham chiếu kho JSON dùng chung."
    }
  ]
});
}());
