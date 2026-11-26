import type { Article, ArticleGroupCode } from '../types/journey';

export const ARTICLE_GROUPS: { code: ArticleGroupCode; title: string; short: string }[] = [
  { code: 'A', title: 'Môi trường và vai trò của môi trường', short: 'A · Môi trường' },
  { code: 'B', title: 'Môi trường nước và tầm quan trọng', short: 'B · Nguồn nước' },
  { code: 'C', title: 'Thực trạng và nguyên nhân ô nhiễm', short: 'C · Thực trạng' },
  { code: 'D', title: 'Hậu quả của ô nhiễm nguồn nước', short: 'D · Hậu quả' },
  { code: 'E', title: 'Giải pháp và trách nhiệm cộng đồng', short: 'E · Giải pháp' },
  { code: 'F', title: 'Góc suy ngẫm – Bài luận chiều sâu', short: 'F · Suy ngẫm' },
];

export const ARTICLES: Article[] = [
  {
    id: 'art-a1',
    groupCode: 'A',
    groupTitle: 'Môi trường và vai trò của môi trường',
    title: 'Môi trường không đứng ngoài cánh cửa lớp: Ta đang sống trong cùng một hệ mạch',
    subtitle: 'Nhìn lại khái niệm môi trường vượt ra khỏi định nghĩa sách giáo khoa và giới hạn tự chữa lành của tự nhiên',
    summary:
      'Từ một góc nhìn gần gũi về không khí, đất, nước và hạ tầng đô thị, bài viết lý giải vì sao tự nhiên không phải kho chứa vô tận mà là một hệ thống mong manh có ngưỡng chịu tải rõ ràng.',
    readTimeMinutes: 7,
    imageUrl: '/src/assets/images/editorial_river_watershed_1795690278584.jpg',
    imageCaption: 'Lưu vực sông và thảm thực vật ven bờ cấu thành một hệ sinh thái liên thông.',
    sections: [
      {
        heading: '1. Khi "môi trường" bị đẩy ra khỏi đời sống thường nhật',
        paragraphs: [
          'Hầu hết chúng ta lần đầu nghe chữ "môi trường" qua những tấm áp-phích ở hành lang trường học: một bàn tay nâng niu quả địa cầu xanh biếc hoặc một cánh rừng rậm rạp ở tận đâu đó rất xa. Chính cách hình dung ấy vô tình tạo ra một khoảng cách tâm lý: ta quen nghĩ môi trường là thứ nằm ngoài khu dân cư, ngoài lớp học, ngoài căn bếp nhà mình — một không gian khác mà con người thỉnh thoảng ghé thăm hoặc "làm từ thiện" cho nó bằng vài buổi trồng cây.',
          'Thế nhưng, nếu quan sát kỹ một buổi sáng đi học bình thường, ta sẽ nhận ra mình chưa từng rời khỏi hệ thống đó dù chỉ một giây. Ngụm nước lọc buổi sáng đi qua nhà máy cấp nước lấy từ thượng nguồn con sông cách nhà vài chục cây số; luồng gió mát thổi qua sân trường phụ thuộc vào mật độ cây xanh, mặt hồ điều hòa và lượng nhiệt tỏa ra từ mặt đường nhựa; ngay cả chiếc áo đồng phục ta mặc cũng mang theo dấu vết của hàng nghìn lít nước tưới bông và quy trình nhuộm vải tại một khu công nghiệp nào đó.',
          'Luật Bảo vệ môi trường Việt Nam năm 2020 định nghĩa môi trường là tổng hòa các yếu tố vật chất tự nhiên và nhân tạo quan hệ mật thiết với nhau, bao quanh con người và ảnh hưởng trực tiếp tới đời sống, kinh tế, xã hội. Điểm đắt giá nhất của khái niệm này nằm ở hai chữ "nhân tạo" đặt cạnh "tự nhiên": một con mương bê tông, một bãi giữ xe hay mạng lưới ống thoát nước dưới lòng đường đều là một phần của môi trường sống, chứ không phải cái gì tách rời khỏi thiên nhiên.',
        ],
      },
      {
        heading: '2. Ba vai trò âm thầm và chức năng hay bị lãng quên nhất',
        paragraphs: [
          'Trong sinh học và kinh tế học tài nguyên, môi trường đảm nhận ba chức năng trụ cột: làm không gian sinh tồn, cung cấp nguồn lực vật chất – năng lượng và tiếp nhận, đồng hóa chất thải. Hai chức năng đầu rất dễ thấy: mất đất thì không có chỗ ở, cạn nước thì cây chết, thiếu nguyên liệu thì nhà máy ngừng chạy. Vì dễ thấy nên con người thường đặt giá cho chúng bằng tiền bạc và bảo vệ khá nhanh khi thấy dấu hiệu thiếu hụt.',
          'Chức năng thứ ba — khả năng tự làm sạch và phân hủy chất thải — lại thường xuyên bị xem nhẹ như một phép màu miễn phí. Lá rụng xuống mặt đất có vi sinh vật phân giải thành mùn nuôi lại rễ cây; nước thải hữu cơ loãng chảy qua ghềnh đá, bãi sậy sẽ được oxy hòa tan và vi khuẩn hiếu khí chuyển hóa dần thành chất vô cơ ít độc hại. Suốt hàng nghìn năm dân số thưa thớt, cơ chế tự điều chỉnh này vận hành êm ả đến mức con người tưởng rằng thiên nhiên có thể tiêu hóa mọi thứ ta ném ra.',
          'Vấn đề chỉ bùng phát khi tốc độ xả thải vượt qua tốc độ tự phục hồi, hoặc khi ta đưa vào tự nhiên những hợp chất tổng hợp mà vi sinh vật chưa từng biết cách phân hủy — như nhựa polymer, kim loại nặng, thuốc trừ sâu bền vững hay hóa chất tẩy rửa công nghiệp. Lúc ấy, cái "dạ dày sinh thái" quá tải, chất thải tích tụ lại và quay ngược trở thành độc tố bao vây chính nơi con người sinh sống.',
        ],
        highlight:
          'Thiên nhiên không "nổi giận" hay "trừng phạt" ai cả; mọi biến cố môi trường đều là phản ứng vật lý và sinh học tất yếu khi ngưỡng chịu tải bị vượt qua.',
      },
      {
        heading: '3. Khái niệm "sức tải" và cái bẫy của sự chậm trễ',
        paragraphs: [
          'Mỗi hệ sinh thái đều có một ngưỡng gọi là sức tải môi trường — lượng tác động tối đa mà nó có thể hấp thụ trước khi cấu trúc bị biến đổi không thể đảo ngược. Điều đánh lừa con người là sự suy thoái hiếm khi diễn ra tuyến tính. Một hồ nước nhận thêm chút nước thải sinh hoạt suốt năm năm đầu trông vẫn xanh bình thường; sang năm thứ sáu, chỉ cần một đợt nắng nóng kéo dài làm giảm oxy hòa tan, cả mặt hồ đột ngột nở hoa tảo độc và cá chết nổi trắng chỉ sau một đêm.',
          'Độ trễ sinh thái ấy khiến thói quen "để từ từ tính" trở nên cực kỳ đắt giá. Khi mắt thường đã nhìn thấy dòng kênh chuyển sang màu đen kịt, bốc mùi hôi nồng nặc mỗi lúc triều rút, thì hệ sinh vật đáy — từ giun ít tơ, ốc, cua đến thảm thực vật thủy sinh — thường đã suy kiệt từ nhiều năm trước đó. Khôi phục một hệ sinh thái đã gãy cấu trúc không giống như lau sạch một mặt bàn; nó đòi hỏi nhiều thập kỷ cắt hoàn toàn nguồn thải và tái tạo lại chuỗi thức ăn tự nhiên.',
        ],
      },
      {
        heading: '4. Thay đổi vị trí đứng của người trẻ',
        paragraphs: [
          'Hiểu môi trường theo nghĩa hệ thống giúp ta thoát khỏi tâm thế ban ơn. Ta không "cứu Trái Đất" như một siêu anh hùng đứng ngoài hành tinh; hành tinh này đã tồn tại hàng tỷ năm và sẽ tiếp tục tự cân bằng theo cách của nó ngay cả khi không có loài người. Thứ thực sự mong manh là điều kiện khí hậu ổn định, nguồn nước ngọt sạch và lớp đất màu mỡ đủ để nền văn minh nhân loại tồn tại bình yên.',
          'Với một học sinh trung học, nhận thức ấy biến mọi hành động nhỏ thành một lựa chọn có lý trí: khi biết đường thoát nước sân trường nối thẳng ra con rạch đầu phố, việc không bỏ vỏ hộp sữa xuống miệng cống không còn là chuyện làm theo lời cô giáo nhắc, mà là giữ cho chính hệ mạch sống quanh mình không bị nghẽn lại.',
        ],
      },
    ],
    references: [
      'Luật Bảo vệ môi trường Việt Nam (số 72/2020/QH14), Điều 3.',
      'Chương trình Môi trường Liên Hợp Quốc (UNEP) – Tài liệu giáo dục hệ sinh thái.',
      'Odum, E. P. & Barrett, G. W. – Fundamentals of Ecology (Nguyên lý Sinh thái học).',
    ],
  },
  {
    id: 'art-b1',
    groupCode: 'B',
    groupTitle: 'Môi trường nước và tầm quan trọng',
    title: 'Giọt nước đi qua ba nghìn năm: Từ chu trình thủy văn đến an ninh sinh tồn',
    subtitle: 'Tại sao hành tinh phủ 71% đại dương vẫn đứng trước nguy cơ khát nước sạch đạt chuẩn?',
    summary:
      'Đi sâu vào cấu trúc liên thông giữa nước mặt, nước ngầm và nước mưa, giải thích nghịch lý khan hiếm nước ngọt và cách chất lượng một dòng sông quyết định chất lượng sống của cả vùng.',
    readTimeMinutes: 7,
    imageUrl: '/src/assets/images/intro_ocean_surface_1795690278004.jpg',
    imageCaption: 'Nước đại dương chiếm tỉ trọng áp đảo, trong khi nước ngọt dễ tiếp cận lại rất hữu hạn.',
    sections: [
      {
        heading: '1. Một giọt nước không bao giờ thuộc về riêng một địa phương',
        paragraphs: [
          'Nhìn từ ngoài không gian, Trái Đất rực lên một màu xanh thẫm nhờ nước, nhưng nếu gom toàn bộ lượng nước ngọt lỏng dễ tiếp cận ở sông, suối và hồ nước ngọt trên hành tinh lại, tỉ lệ của chúng chỉ chưa tới 1% tổng lượng nước toàn cầu. Phần lớn nước trên Trái Đất là nước mặn đại dương hoặc bị khóa chặt trong băng hà hai cực và các tầng đất đóng băng vĩnh cửu.',
          'Điều kỳ diệu là lượng nước ít ỏi ấy nuôi sống hàng tỷ sinh vật nhờ không ngừng chuyển động theo chu trình thủy văn. Hơi nước bốc lên từ mặt biển Đông, gặp khối không khí lạnh ngưng tụ thành mây, trút mưa xuống những cánh rừng đầu nguồn Tây Nguyên hay vùng núi phía Bắc, rồi len lỏi qua tầng đất đá tạo thành mạch nước ngầm, hợp lưu thành sông suối chảy qua ruộng đồng và quay trở lại biển.',
          'Chính vòng tuần hoàn khép kín này biến môi trường nước thành một thực thể liên thông tuyệt đối. Không có ranh giới hành chính nào ngăn được dòng chảy: thuốc trừ sâu thấm xuống mạch ngầm ở một xã thượng nguồn có thể xuất hiện trong giếng khoan của khu dân cư cách đó hàng chục cây số; túi ni-lông vứt bên mép mương nội đồng cuối cùng lại trôi ra cửa biển và mắc vào lưới ngư dân.',
        ],
      },
      {
        heading: '2. Đời sống sinh học và nền kinh tế đặt trên mặt nước',
        paragraphs: [
          'Trong cơ thể con người, nước chiếm khoảng 60–70% trọng lượng, đóng vai trò là dung môi cho mọi phản ứng sinh hóa, điều hòa thân nhiệt qua mồ hôi và vận chuyển dưỡng chất tới từng tế bào. Chỉ cần mất 2% lượng nước cơ thể, khả năng tập trung và sức bền đã suy giảm rõ rệt; thiếu nước sạch kéo dài mở đường cho hàng loạt bệnh truyền nhiễm đường tiêu hóa và rối loạn chuyển hóa.',
          'Ở quy mô xã hội, lịch sử Việt Nam gắn chặt với văn minh sông nước: châu thổ sông Hồng và đồng bằng sông Cửu Long được bồi đắp bởi phù sa, nơi cây lúa, con cá và những tuyến giao thương đầu tiên hình thành. Ngày nay, ngay cả trong kỷ nguyên kinh tế số, nước vẫn là huyết mạch thầm lặng: để sản xuất một tấn giấy cần hàng chục mét khối nước; để vận hành các trung tâm dữ liệu AI hiện đại, hệ thống làm mát tiêu thụ lượng nước sạch khổng lồ mỗi ngày.',
          'Tổ chức Y tế Thế giới (WHO) nhiều lần nhấn mạnh rằng mỗi đồng đầu tư vào nước sạch và vệ sinh môi trường giúp tiết kiệm gấp nhiều lần chi phí y tế và ngày công lao động bị mất do bệnh tật. Nước không phải một mặt hàng xa xỉ; nó là hạ tầng nền tảng để mọi quyền con người khác — từ học tập, lao động đến chăm sóc sức khỏe — có thể diễn ra bình thường.',
        ],
        highlight:
          'Ta thường trả tiền cho vài mét khối nước chảy ra từ vòi, nhưng thực chất thứ giữ cho nguồn nước ấy tồn tại là rừng đầu nguồn, đất thấm và lòng sông không bị đầu độc.',
      },
      {
        heading: '3. Sự mong manh của nước ngầm — kho dự trữ thầm lặng',
        paragraphs: [
          'Khi nhắc đến bảo vệ nước, nhiều người chỉ nhìn thấy mặt sông, mặt hồ mà quên mất một nửa câu chuyện nằm sâu dưới lòng đất. Các tầng chứa nước ngầm hình thành qua hàng trăm, thậm chí hàng nghìn năm mưa thấm chậm rãi qua các lớp cát, sỏi và đá thấm nước. Trong mùa khô, chính nước ngầm rỉ ra nuôi giữ mực nước nền cho sông suối không bị cạn trơ đáy.',
          'Thế nhưng đô thị hóa với mật độ bê tông và nhựa đường dày đặc đang bịt kín bề mặt thấm tự nhiên: nước mưa rơi xuống không thấm được xuống đất mà chảy tràn trên mặt đường, cuốn theo bụi dầu xe ra cống rồi thoát tuột ra sông trong vài giờ. Trong khi lượng bổ cập giảm mạnh, giếng khoan lại khai thác ngày càng sâu khiến mực nước ngầm hạ thấp, kéo theo sụt lún nền đất và xâm nhập mặn ở vùng ven biển.',
          'Nguy hiểm hơn nữa là một khi hóa chất độc hại, nước rỉ rác từ bãi chôn lấp không lót đáy hay nitrat từ phân bón thấm được xuống tầng ngậm nước, quá trình xử lý phục hồi gần như bất khả thi về mặt kỹ thuật lẫn chi phí. Khác với sông có dòng chảy đẩy đi và ánh nắng mặt trời hỗ trợ phân hủy, nước ngầm nằm trong bóng tối, vận tốc dịch chuyển chỉ vài mét mỗi năm — chất bẩn đi vào đó có thể nằm lại hàng thế kỷ.',
        ],
      },
      {
        heading: '4. An ninh nguồn nước bắt đầu từ thước đo chất lượng',
        paragraphs: [
          'An ninh nguồn nước không chỉ là chuyện "có đủ lượng nước" để không bị hạn hán, mà còn là "đủ sạch để dùng an toàn" với chi phí hợp lý. Một vùng đất có sông lớn chảy qua nhưng nguồn nước bị nhiễm mặn, nhiễm phèn nặng hoặc ô nhiễm hữu cơ vẫn rơi vào cảnh thiếu nước sạch trầm trọng — đó là hiện tượng "khát ngay bên bờ sông".',
          'Nhận thức đúng về tính hữu hạn và liên thông của môi trường nước giúp chúng ta nhìn khác đi mỗi lần vặn vòi nước hay đi qua một cây cầu. Giữ gìn nước là giữ cho cả ba tầng — nước mưa trên cao, nước mặt quanh ta và nước ngầm dưới chân — đều còn đường sống tự nhiên của chúng.',
        ],
      },
    ],
    references: [
      'UNESCO World Water Assessment Programme (WWAP) – United Nations World Water Development Report.',
      'WHO – Guidelines for Drinking-water Quality (4th edition).',
      'Tổng cục Thủy lợi & Bộ TN&MT – Tài liệu quản lý tổng hợp tài nguyên nước theo lưu vực sông.',
    ],
  },
  {
    id: 'art-c1',
    groupCode: 'C',
    groupTitle: 'Thực trạng và nguyên nhân ô nhiễm',
    title: 'Đọc vị những dòng thải: Ô nhiễm nước bắt đầu từ đâu trước khi ra tới sông lớn?',
    subtitle: 'Giải mã nguồn điểm, nguồn diện và những thói quen vô thức quanh miệng cống khu dân cư',
    summary:
      'Phân tích sâu hai con đường gây ô nhiễm chính — nguồn điểm tập trung và nguồn diện phân tán — cùng cách học sinh tự kiểm chứng thực trạng dòng nước tại chính khu phố hoặc xã mình đang sống.',
    readTimeMinutes: 8,
    imageUrl: '/src/assets/images/editorial_water_pollution_1795690278210.jpg',
    imageCaption: 'Rác thải nhựa và dòng chảy đô thị thường tích tụ tại các điểm thắt nút và miệng cống.',
    sections: [
      {
        heading: '1. Căn bếp, phòng tắm và dòng nước thải không qua xử lý',
        paragraphs: [
          'Nếu hình dung về ô nhiễm nước, tâm trí nhiều người lập tức hiện lên hình ảnh một ống khói nhà máy hay cống xả khổng lồ đổ nước màu đen kịt ra sông. Thực tế tại nhiều đô thị Việt Nam hiện nay, một tỉ trọng rất lớn lượng chất ô nhiễm hữu cơ chảy vào kênh rạch nội đô lại đến từ chính nước thải sinh hoạt của hàng triệu hộ gia đình.',
          'Mỗi ngày, từ bồn rửa bát, máy giặt và nhà vệ sinh, một lượng lớn cặn thức ăn, dầu mỡ động thực vật, chất tẩy rửa chứa phốt phát, amoni và vi khuẩn đường ruột đi vào hệ thống thoát nước. Ở những khu vực chưa có mạng lưới cống tách riêng nước mưa – nước thải và nhà máy xử lý tập trung, toàn bộ dòng nước xám và nước đen ấy chỉ đi qua bể tự hoại thô sơ rồi thoát thẳng ra kênh mương gần nhất.',
          'Khi dầu mỡ gặp nước lạnh trong lòng cống, chúng kết tảng bám chặt vào thành ống như mảng xơ vữa, giữ lại rác nhỏ và gây mùi hôi thối. Khi trôi ra sông hồ, lớp váng dầu mỏng ngăn ánh sáng và oxy từ không khí khuếch tán xuống nước, trong khi vi khuẩn phân hủy chất hữu cơ tiêu thụ cạn kiệt lượng oxy hòa tan còn lại — biến con kênh thành dòng nước chết thiếu khí.',
        ],
      },
      {
        heading: '2. Rác thải nhựa đô thị: Cuộc di cư từ vỉa hè xuống đáy sông',
        paragraphs: [
          'Hãy thử đứng quan sát một góc đường phố quen thuộc trước và sau một cơn mưa rào lớn. Trước mưa, vài chiếc ly trà sữa nhựa, túi ni-lông đựng đồ ăn sáng, đầu lọc thuốc lá và hộp xốp nằm rải rác ven lề đường trông có vẻ vô hại. Khi mưa xuống, dòng nước chảy tràn trên mặt đường nhựa không khác gì một băng chuyền tự nhiên cuốn toàn bộ số rác ấy lao xuống miệng hố ga.',
          'Những mảnh rác lớn mắc kẹt ở song chắn rác gây tắc nghẽn cục bộ, tạo nên cảnh ngập ngang bánh xe sau mỗi trận mưa lớn. Những thứ lọt qua lưới chắn theo đường cống ngầm đổ thẳng ra kênh rạch, rồi dưới tác động của tia cực tím mặt trời, va đập cơ học của dòng chảy và sóng nước, chúng không biến mất mà vỡ vụn thành hàng triệu hạt vi nhựa nhỏ hơn 5 milimét, hòa lẫn vào lớp phù sa và đi vào dạ dày tôm cá.',
        ],
        highlight:
          'Hầu hết rác trên sông không có ai lặn xuống giữa dòng để vứt; chúng đều bắt đầu hành trình từ một cái vẩy tay trên vỉa hè.',
      },
      {
        heading: '3. Ô nhiễm diện từ nông nghiệp và những làng nghề thiếu hạ tầng',
        paragraphs: [
          'Rời khỏi khu đô thị, vùng nông thôn lại đối mặt với một dạng ô nhiễm thầm lặng và khó kiểm soát hơn: ô nhiễm nguồn diện. Khác với một ống xả cố định dễ đo đạc (nguồn điểm), ô nhiễm nguồn diện xảy ra trên cả một cánh đồng rộng lớn. Khi phân đạm, phân lân và thuốc bảo vệ thực vật được bón vượt ngưỡng cây trồng hấp thụ kịp, phần dư thừa theo nước tưới và nước mưa tràn đồng chảy xuống mương thủy lợi và ao hồ.',
          'Bên cạnh đó, nước thải từ chăn nuôi quy mô hộ gia đình không có hầm biogas đạt chuẩn hoặc các cơ sở sản xuất thủ công nhỏ lẻ (tái chế nhựa, dệt nhuộm, chế biến tinh bột, mạ kim loại) xen kẽ trong khu dân cư mang theo nồng độ cao chất hữu cơ, thuốc nhuộm khó phân hủy và kim loại nặng. Chỉ cần một vài cơ sở xả lén vào ban đêm lúc mưa to, cả đoạn sông hạ lưu phải gánh chịu hậu quả kéo dài nhiều tháng.',
        ],
      },
      {
        heading: '4. Cách đọc hiện trường bằng đôi mắt khoa học của học sinh',
        paragraphs: [
          'Khi thực hiện dự án Hoạt động trải nghiệm, sai lầm phổ biến nhất là chép lại vài con số thống kê chung chung trên mạng mà không kiểm chứng nguồn gốc. Thay vào đó, cách làm trung thực và sâu sắc hơn là tự xây dựng hồ sơ quan sát tại chính khu vực quanh trường hoặc nơi mình sống: ghi nhận thời điểm triều cường hay sau cơn mưa, chụp ảnh các điểm miệng cống bị bít kín bởi hộp xốp, quan sát màu nước (xanh rêu sẫm dấu hiệu phú dưỡng, đen kịt mùi trứng thối H2S dấu hiệu thiếu oxy trầm trọng) và trò chuyện với người lớn tuổi sống ven sông để thấy dòng nước đã đổi thay thế nào sau mười, hai mươi năm.',
          'Chính những ghi chép từ thực địa ấy giúp chúng ta hiểu rằng ô nhiễm nước không phải một khái niệm trừu tượng trên bản tin thời sự, mà là câu chuyện có địa chỉ cụ thể ngay sau lưng nhà mình.',
        ],
      },
    ],
    references: [
      'Bộ Tài nguyên và Môi trường – Báo cáo Hiện trạng môi trường quốc gia: Môi trường nước lục địa.',
      'Quy chuẩn kỹ thuật quốc gia về chất lượng nước mặt (QCVN 08:2023/BTNMT).',
      'UNEP – From Pollution to Solution: A Global Assessment of Marine Litter and Plastic Pollution.',
    ],
  },
  {
    id: 'art-d1',
    groupCode: 'D',
    groupTitle: 'Hậu quả của ô nhiễm nguồn nước',
    title: 'Cái giá âm thầm: Khi một dòng nước suy thoái trả lại hóa đơn cho con người',
    subtitle: 'Từ sự biến mất của những loài cá nhỏ đến gánh nặng bệnh tật và bất bình đẳng môi trường',
    summary:
      'Phân tích sâu hiệu ứng dây chuyền của ô nhiễm nước: hiện tượng phú dưỡng làm cá chết ngạt, tích lũy sinh học âm thầm trong chuỗi thức ăn và những tổn thất kinh tế – xã hội mà người yếu thế phải gánh chịu đầu tiên.',
    readTimeMinutes: 7,
    imageUrl: '/src/assets/images/editorial_water_pollution_1795690278210.jpg',
    imageCaption: 'Suy thoái thủy vực làm đứt gãy môi trường sống của sinh vật bản địa và đe dọa sức khỏe dân cư.',
    sections: [
      {
        heading: '1. Khi mặt hồ xanh mướt lại là dấu hiệu của sự ngạt thở',
        paragraphs: [
          'Có một nghịch lý ít người để ý: một hồ nước xanh rì dày đặc tảo nổi trên mặt đôi khi không phải biểu hiện của sự sống dồi dào, mà là triệu chứng của căn bệnh "phú dưỡng". Khi lượng lớn nitơ và phốt pho từ phân bón rửa trôi và bột giặt sinh hoạt đổ vào ao hồ, tảo và bèo sinh sôi bùng nổ chỉ trong vài ngày, tạo thành một tấm thảm xanh che kín ánh nắng chiếu xuống tầng nước sâu.',
          'Khi lớp tảo dày đặc ấy chết đi và chìm xuống đáy, vi khuẩn phân hủy chúng tiêu thụ một lượng oxy hòa tan khổng lồ. Nồng độ oxy trong nước tụt dốc không phanh, đặc biệt vào ban đêm khi thực vật thủy sinh ngừng quang hợp. Những loài cá, tôm nhạy cảm bắt đầu ngoi lên mặt nước đớp không khí rồi chết hàng loạt — một cái chết ngạt diễn ra ngay giữa lòng nước.',
        ],
      },
      {
        heading: '2. Tích lũy sinh học: Đường đi vòng về bữa cơm gia đình',
        paragraphs: [
          'Nếu vi khuẩn gây bệnh tiêu chảy, tả, lỵ hay viêm da cho thấy hậu quả ngay sau vài ngày tiếp xúc với nước bẩn, thì các chất ô nhiễm hóa học lại nguy hiểm theo một cách hoàn toàn khác: im lặng và kéo dài. Kim loại nặng như chì, thủy ngân, cadimi, asen hay các hợp chất hữu cơ khó phân hủy không bị tiêu hóa hay đào thải dễ dàng khỏi cơ thể sinh vật.',
          'Trong chuỗi thức ăn thủy sinh, động vật phù du ăn vi sinh vật mang theo một lượng nhỏ độc tố; cá nhỏ ăn hàng nghìn động vật phù du và giữ lại gần như toàn bộ lượng độc tố đó trong mô mỡ và gan; cá lớn ăn hàng trăm con cá nhỏ khiến nồng độ chất độc nhân lên gấp nhiều lần — cơ chế này gọi là khuếch đại sinh học. Khi con người ăn các loài thủy sản đánh bắt từ vùng nước ô nhiễm, hay dùng nước ấy tưới rau màu, ta đang nhận lại toàn bộ phần hóa chất mình từng thải bỏ.',
          'Những tổn thương do phơi nhiễm liều thấp kéo dài thường âm thầm tích lũy qua nhiều năm, liên quan đến rối loạn nội tiết, suy giảm chức năng gan thận, ảnh hưởng phát triển thần kinh ở trẻ nhỏ và tăng nguy cơ bệnh mạn tính. Đến khi phát hiện ra thì việc truy tìm nguyên nhân ban đầu đã vô cùng khó khăn.',
        ],
        highlight:
          'Chúng ta không bao giờ thực sự "vứt bỏ" được chất độc ra khỏi thế giới này; ta chỉ chuyển chỗ nó từ ống cống sang dòng sông, rồi chờ nó quay lại qua một con đường khác.',
      },
      {
        heading: '3. Gánh nặng kinh tế và câu chuyện công bằng xã hội',
        paragraphs: [
          'Ô nhiễm nước luôn đi kèm một hóa đơn tài chính khổng lồ mà toàn xã hội phải trả. Khi nguồn nước mặt ở hạ lưu sông suy giảm chất lượng, các nhà máy cấp nước sạch buộc phải tăng liều lượng hóa chất keo tụ, khử trùng hoặc đầu tư công nghệ lọc màng đắt đỏ; chi phí xử lý tăng lên cuối cùng phân bổ vào giá nước sinh hoạt của mọi hộ gia đình.',
          'Nhưng người gánh thiệt hại nặng nề nhất hiếm khi là người xả thải nhiều nhất. Những hộ dân sống dọc bờ kênh, nông dân lấy nước tưới tiêu hay người nuôi cá lồng bè ở hạ lưu thường mất trắng mùa vụ chỉ sau một đợt nước xả bẩn từ thượng nguồn. Một gia đình khá giả có thể mua máy lọc nước RO nhiều lõi và nước đóng chai khi nước máy có mùi clo nồng; trong khi một gia đình thu nhập thấp ở khu trọ ven đô vẫn phải nấu ăn và tắm giặt bằng nguồn nước giếng khoan có nguy cơ nhiễm amoni hoặc vi khuẩn.',
        ],
      },
      {
        heading: '4. Đánh mất ký ức văn hóa của một vùng đất',
        paragraphs: [
          'Bên cạnh những con số y tế và kinh tế, còn một mất mát khó đo đếm bằng tiền: mất đi không gian sống chung quanh dòng nước. Thế hệ ông bà chúng ta từng có ký ức về những buổi chiều tắm sông, giặt giũ bên bến nước hay bắt cá đồng mỗi mùa mưa. Ngày nay, ở nhiều khu đô thị, những con kênh được bọc kín bằng hàng rào tôn hoặc người dân phải đóng kín cửa sổ vì mùi hôi.',
          'Khi một dòng sông bị biến thành cống thoát nước lộ thiên, con người mất đi một nơi hít thở tự nhiên giữa phố xá chật chội, và trẻ em lớn lên mà không còn biết thế nào là một mặt nước trong có thể nhìn thấy rong rêu và đàn cá bơi bên dưới.',
        ],
      },
    ],
    references: [
      'Tổ chức Y tế Thế giới (WHO) – Water, Sanitation and Hygiene (WASH) Burden of Disease.',
      'Ngân hàng Thế giới (World Bank) – Quality Unknown: The Invisible Water Crisis.',
      'Chương trình Phát triển Liên Hợp Quốc (UNDP) – Báo cáo Phát triển Con người về An ninh nước.',
    ],
  },
  {
    id: 'art-e1',
    groupCode: 'E',
    groupTitle: 'Giải pháp và trách nhiệm cộng đồng',
    title: 'Bản đồ trách nhiệm: Từ chảo dầu trong bếp đến đường cống thoát nước của thành phố',
    subtitle: 'Vì sao bảo vệ nguồn nước đòi hỏi cả sự thay đổi thói quen cá nhân lẫn hạ tầng công minh bạch',
    summary:
      'Phác họa bốn tầng hành động thiết thực — cá nhân, gia đình, nhà trường và cộng đồng/chính quyền — giúp người trẻ biết rõ việc nào làm được ngay hôm nay và việc nào cần tiếng nói tập thể.',
    readTimeMinutes: 8,
    imageUrl: '/src/assets/images/editorial_clean_water_action_1795690279588.jpg',
    imageCaption: 'Kiểm soát nguồn thải tại gia đình và trường học là tuyến phòng vệ đầu tiên của nguồn nước.',
    sections: [
      {
        heading: '1. Tuyến phòng vệ đầu tiên nằm ngay dưới bồn rửa chén',
        paragraphs: [
          'Nhiều chiến dịch môi trường thất bại vì kêu gọi những hành động quá xa vời khiến người nghe thấy mình bất lực. Thực ra, phần lớn lượng chất hữu cơ và dầu mỡ gây nghẽn cống rãnh khu dân cư hoàn toàn có thể chặn lại ngay trong từng căn bếp nếu có thói quen đúng.',
          'Thay vì trút chảo dầu ăn thừa hoặc nước xốt đặc trực tiếp xuống bồn rửa, ta chỉ cần dùng giấy ăn lau sạch lớp dầu thừa trước khi rửa hoặc đổ dầu nguội vào một chai nhựa riêng để giao cho đơn vị thu gom tái chế làm nhiên liệu sinh học. Chỉ một lít dầu ăn đổ xuống cống có thể tạo thành lớp màng che phủ hàng nghìn mét vuông mặt nước và làm đóng mảng hàng mét đường ống thoát nước.',
          'Tương tự, tuyệt đối không biến bồn cầu hay phễu thoát sàn thành thùng rác cho khăn ướt (vốn làm từ sợi nhựa tổng hợp không phân hủy), tăm bông, tóc rối, thuốc hết hạn hay hóa chất tẩy rửa cực mạnh. Khăn ướt theo đường ống đi ra sông hồ không mục nát như giấy vệ sinh; chúng quấn thành từng búi rác khổng lồ làm hỏng máy bơm ở trạm xử lý nước thải.',
        ],
      },
      {
        heading: '2. Vai trò của học sinh và không gian thực hành xanh trong trường học',
        paragraphs: [
          'Trường học là nơi tập trung hàng nghìn người sử dụng nước mỗi ngày và cũng là nơi hình thành thói quen công dân bền vững nhất. Một dự án học sinh thiết thực không dừng ở bài thuyết trình PowerPoint đẹp mắt, mà bắt đầu từ việc rà soát chính ngôi trường của mình: có bao nhiêu vòi nước trong nhà vệ sinh bị rò rỉ nhỏ giọt suốt đêm? Các thùng rác phân loại ở sân trường có đặt cạnh miệng cống hay để gió thổi bay chai nhựa xuống rãnh thoát nước?',
          'Bên cạnh việc mang bình nước cá nhân để cắt giảm hàng trăm chai nhựa dùng một lần mỗi học kỳ, các câu lạc bộ môi trường trong trường có thể lập bản đồ các điểm ngập nước hoặc điểm tập kết rác gần cổng trường, phối hợp cùng Đoàn thanh niên địa phương khơi thông song chắn rác trước mùa mưa và truyền thông bằng hình ảnh thực tế thay vì những khẩu hiệu khô cứng.',
        ],
        highlight:
          'Khi một thói quen tốt được cả một tập thể lớp cùng làm một cách bình thường, nó không còn là sự gồng mình "sống xanh" nữa, mà trở thành nếp sống tự nhiên.',
      },
      {
        heading: '3. Hạ tầng công, pháp luật và quyền lên tiếng của cộng đồng',
        paragraphs: [
          'Tuy vậy, sẽ thiếu công bằng nếu đẩy toàn bộ trách nhiệm bảo vệ sông hồ lên vai cá nhân trong khi thiếu vắng hạ tầng kỹ thuật. Một đô thị hiện đại buộc phải đầu tư hệ thống thoát nước tách riêng nước mưa và nước thải sinh hoạt, đưa nước thải về nhà máy xử lý đạt quy chuẩn trước khi xả ra môi trường tự nhiên, đồng thời bảo vệ hành lang cây xanh và đất ngập nước ven sông như những "lá phổi lọc nước" tự nhiên.',
          'Song hành với hạ tầng là sự minh bạch và chế tài nghiêm khắc đối với các cơ sở sản xuất xả thải trộm vượt chuẩn. Đây là lúc vai trò giám sát của cộng đồng phát huy tác dụng: người dân — trong đó có thế hệ trẻ am hiểu công nghệ — có thể ghi nhận vị trí, thời điểm và hình ảnh dòng nước đổi màu bất thường gửi tới đường dây nóng môi trường hoặc cổng phản ánh trực tuyến của chính quyền địa phương.',
        ],
      },
      {
        heading: '4. Kết hợp bốn vòng tròn hành động',
        paragraphs: [
          'Cá nhân tiết kiệm từng lít nước và từ chối nhựa dùng một lần; gia đình chặn dầu mỡ, pin cũ và hóa chất độc hại ngay tại bếp; nhà trường biến kiến thức sinh thái thành thực hành hằng ngày; chính quyền đầu tư hạ tầng thu gom xử lý và thực thi luật nghiêm minh. Khi bốn vòng tròn ấy khớp vào nhau, dòng chảy sạch không còn là giấc mơ xa xỉ.',
        ],
      },
    ],
    references: [
      'Liên Hợp Quốc – Mục tiêu Phát triển Bền vững số 6 (SDG 6: Clean Water and Sanitation).',
      'Bộ Giáo dục và Đào tạo – Chương trình Hoạt động trải nghiệm, hướng nghiệp cấp THPT.',
      'Hướng dẫn kỹ thuật phân loại rác thải và kiểm soát dầu mỡ tại nguồn trong khu dân cư đô thị.',
    ],
  },
  {
    id: 'art-f1',
    groupCode: 'F',
    groupTitle: 'Góc suy ngẫm – Bài luận chiều sâu',
    title: 'Khoảng cách giữa biết và làm: Chúng ta thực sự nợ những dòng sông điều gì?',
    subtitle: 'Một cuộc đối thoại thẳng thắn với người trẻ về sự thờ ơ quen mắt và giá trị của việc tự tay chạm vào thực tế',
    summary:
      'Bài luận suy ngẫm về nghịch lý của thời đại thừa thông tin nhưng thiếu hành động: làm thế nào để một trải nghiệm thực địa giúp chúng ta phá vỡ vỏ bọc "khuất mắt trông coi".',
    readTimeMinutes: 7,
    imageUrl: '/src/assets/images/editorial_river_watershed_1795690278584.jpg',
    imageCaption: 'Giữ lại sự trong lành cho một nhánh sông đòi hỏi sự kiên nhẫn qua nhiều thế hệ.',
    sections: [
      {
        heading: '1. Sự quen mắt — kẻ thù lặng lẽ nhất của môi trường',
        paragraphs: [
          'Nếu hỏi bất kỳ học sinh nào rằng bảo vệ nguồn nước có quan trọng không, câu trả lời chắc chắn là có. Chúng ta lớn lên giữa quá nhiều bài giảng, cuộc thi vẽ tranh và những đoạn video cảm động về đại dương đầy rác nhựa. Thế nhưng có một nghịch lý kỳ lạ đang diễn ra mỗi ngày: chúng ta biết rất nhiều, nhưng lại dễ dàng đi ngang qua một con mương bốc mùi hay một bãi rác tự phát ven bờ sông mà lòng không mảy may gợn sóng.',
          'Các nhà tâm lý học môi trường gọi hiện tượng đó là sự thích nghi với cái bất thường. Khi ngày nào đi học cũng nhìn thấy túi ni-lông mắc trên cành bần ven kênh, bộ não tự động xếp hình ảnh ấy vào mục "phông nền bình thường của thành phố" để tiết kiệm năng lượng cảm xúc. Ta không còn thấy sốc nữa; ta chỉ bịt mũi đi nhanh qua cho xong đoạn đường, rồi tin rằng chuyện làm sạch dòng nước kia thuộc về một ai khác có chuyên môn hoặc trách nhiệm hơn mình.',
        ],
      },
      {
        heading: '2. Điều thay đổi sau một buổi sáng lội bùn nhặt rác',
        paragraphs: [
          'Có người từng đặt câu hỏi rất thực tế: một nhóm học sinh mặc áo mưa, đeo găng tay cao su đi dọn rác ở một đoạn bờ kênh chỉ dài vài trăm mét thì giải quyết được gì khi ngày mai nước triều lại đưa rác từ nơi khác tấp vào? Nếu chỉ đo bằng số kilôgam rác thu gom được trong một buổi sáng, câu hỏi ấy nghe có vẻ đúng.',
          'Nhưng giá trị sâu xa nhất của hoạt động trải nghiệm không nằm ở ảo tưởng rằng một buổi ra quân sẽ cứu sạch cả một dòng sông. Điều đổi thay bền bỉ nhất diễn ra bên trong chính người tham gia. Khi bạn phải cúi xuống kéo một chiếc túi ni-lông đã mục nát dính đầy bùn đen, khi bạn trực tiếp ngửi thấy mùi hôi bốc lên từ đống hộp xốp mắc kẹt ở gốc cây và thấy những con cua nhỏ bò vội ra từ đống chai nhựa, thì "ô nhiễm nước" không còn là một khái niệm trên trang chiếu nữa.',
          'Từ khoảnh khắc bàn tay mình chạm vào thực tế ấy, một cơ chế tự kiểm soát vô hình sẽ bật lên: lần sau cầm một chai nước rỗng trên tay mà chưa thấy thùng rác, bạn sẽ nhớ rất rõ cảm giác nặng nhọc lúc đi gỡ từng vỏ chai dưới bùn — và bạn sẽ tự nhiên giữ nó lại trong ba-lô cho đến khi tìm được chỗ bỏ đúng quy định.',
        ],
        highlight:
          'Một buổi hành động thực tế có thể không làm sạch ngay cả một con sông, nhưng nó đủ sức làm sạch sự thờ ơ bên trong người đã cúi xuống nhặt từng mảnh rác.',
      },
      {
        heading: '3. Vượt qua cảm giác nhỏ bé giữa những vấn đề toàn cầu',
        paragraphs: [
          'Nhiều bạn trẻ rơi vào một trạng thái khác gọi là "lo âu sinh thái": đọc quá nhiều tin tức về biến đổi khí hậu, vi nhựa trong máu người hay sông ngòi cạn kiệt, rồi sinh ra cảm giác bất lực — mình chỉ là một học sinh nhỏ bé, làm sao sửa nổi thế giới rộng lớn này? Cảm giác bất lực ấy dễ dẫn đến buông xuôi không kém gì sự thờ ơ.',
          'Nhưng lịch sử của mọi thay đổi xã hội đều cho thấy điều ngược lại: chuẩn mực cộng đồng không thay đổi từ những phép màu đột ngột, mà từ việc hàng triệu người bình thường quyết định không coi cái xấu là bình thường nữa. Khi bạn nhắc nhẹ một người bạn đừng ném vỏ kẹo xuống cống, khi bạn cùng gia đình giữ lại chai dầu ăn thừa, hay khi nhóm bạn ghi lại những bức ảnh trung thực về dòng kênh quê mình để mọi người cùng nhìn thấy, bạn đang dịch chuyển đường biên của điều được chấp nhận trong xã hội.',
        ],
      },
      {
        heading: '4. Sau tiếng vỗ tay của buổi thuyết trình',
        paragraphs: [
          'Mọi dự án môn học rồi cũng sẽ đến lúc nộp bài, chấm điểm và khép lại. Đèn máy chiếu trên lớp sẽ tắt, trang web này có thể không còn được mở thường xuyên nữa, nhưng ngoài kia, những dòng kênh, giếng nước và con sông vẫn lặng lẽ chảy qua cuộc đời chúng ta thêm nhiều thập kỷ.',
          'Điều đáng hỏi nhất không phải là dự án BLUE TRACE hôm nay được đánh giá bao nhiêu điểm, mà là năm năm hay mười năm nữa — khi bạn trở thành kỹ sư, bác sĩ, giáo viên, người làm kinh doanh hay bậc cha mẹ — bạn sẽ nhìn nguồn nước bằng ánh mắt nào. Chúng ta không thừa hưởng nguồn nước từ cha ông như một tài sản tiêu xài cho hết; chúng ta chỉ đang mượn nó từ thiên nhiên và từ chính thế hệ sau mình.',
        ],
        highlight:
          'Mỗi thế hệ đều chỉ mượn nguồn nước từ thiên nhiên và từ thế hệ đi sau. Hãy trả lại nó ít nhất không đục hơn lúc ta nhận.',
      },
    ],
    references: [
      'Bài luận chuyên đề biên soạn cho dự án giáo dục trải nghiệm BLUE TRACE – Nhóm 1, Tổ 3.',
      'Gifford, R. – The Dragons of Inaction: Psychological Barriers That Limit Climate Change Mitigation and Adaptation.',
    ],
  },
];
