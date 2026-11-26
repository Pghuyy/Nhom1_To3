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
    title: 'Môi trường không đứng ngoài con người: Hệ thống nâng đỡ sự sống',
    subtitle: 'Hiểu đúng về khái niệm môi trường và giới hạn tự điều chỉnh của tự nhiên',
    summary:
      'Phân tích mối quan hệ phụ thuộc hai chiều giữa xã hội loài người và các hệ sinh thái tự nhiên, vượt qua cách nhìn xem thiên nhiên chỉ là kho tài nguyên vô tận.',
    readTimeMinutes: 4,
    imageUrl: '/src/assets/images/editorial_river_watershed_1795690278584.jpg',
    imageCaption: 'Lưu vực sông và thảm thực vật ven bờ cấu thành một hệ sinh thái liên thông.',
    sections: [
      {
        heading: '1. Khái niệm môi trường theo góc nhìn hệ thống',
        paragraphs: [
          'Theo Luật Bảo vệ môi trường Việt Nam năm 2020, môi trường bao gồm các yếu tố vật chất tự nhiên và nhân tạo quan hệ mật thiết với nhau, bao quanh con người, có ảnh hưởng đến đời sống, kinh tế, xã hội, sự tồn tại và phát triển của con người, sinh vật và tự nhiên.',
          'Cách định nghĩa này nhấn mạnh một sự thật cốt lõi: môi trường không phải phông nền thụ động đứng bên ngoài lớp học hay khu đô thị. Đất, nước, không khí, sinh vật và hạ tầng do con người tạo ra vận hành như một mạng lưới tương tác liên tục.',
        ],
      },
      {
        heading: '2. Ba chức năng nền tảng đối với sự tồn tại của nhân loại',
        paragraphs: [
          'Trước hết, môi trường là không gian sinh tồn cung cấp không khí để thở, nước để duy trì sự sống và đất đai để cư trú. Thứ hai, đây là nguồn cung cấp tài nguyên và năng lượng cho mọi hoạt động sản xuất, từ nông nghiệp truyền thống đến công nghệ hiện đại.',
          'Thứ ba, và thường bị lãng quên nhất, môi trường đóng vai trò tiếp nhận và phân hủy chất thải thông qua các chu trình sinh địa hóa. Khi tốc độ xả thải vượt quá ngưỡng đồng hóa tự nhiên, hệ thống mất cân bằng và phát sinh ô nhiễm.',
        ],
        highlight:
          'Con người không đứng bên ngoài tự nhiên để "bảo vệ hộ" tự nhiên; bảo vệ môi trường chính là giữ ổn định điều kiện sống của chính chúng ta.',
      },
    ],
    references: [
      'Luật Bảo vệ môi trường Việt Nam (số 72/2020/QH14), Điều 3.',
      'Chương trình Môi trường Liên Hợp Quốc (UNEP) – Tài liệu giáo dục hệ sinh thái.',
    ],
  },
  {
    id: 'art-b1',
    groupCode: 'B',
    groupTitle: 'Môi trường nước và tầm quan trọng',
    title: 'Từ chu trình thủy văn đến an ninh nguồn nước sạch',
    subtitle: 'Vì sao hành tinh xanh vẫn đối mặt với sự khan hiếm nước ngọt đạt chuẩn',
    summary:
      'Làm rõ khái niệm môi trường nước, sự phân bố khắc nghiệt của nước ngọt trên Trái Đất và vai trò không thể thay thế của nguồn nước sạch đối với sức khỏe và phát triển.',
    readTimeMinutes: 5,
    imageUrl: '/src/assets/images/intro_ocean_surface_1795690278004.jpg',
    imageCaption: 'Nước đại dương chiếm tỉ trọng áp đảo, trong khi nước ngọt dễ tiếp cận lại rất hữu hạn.',
    sections: [
      {
        heading: '1. Môi trường nước là một thể liên thông',
        paragraphs: [
          'Môi trường nước bao gồm toàn bộ các thủy vực nước mặt (sông, suối, hồ, kênh rạch, biển), nước dưới đất (tầng chứa nước ngầm), nước mưa và hệ sinh vật thủy sinh gắn liền với chúng.',
          'Nhờ chu trình thủy văn — bốc hơi, ngưng tụ, mưa và dòng chảy — nước liên tục luân chuyển. Cũng chính vì tính liên thông ấy, chất ô nhiễm thải ra ở một đoạn kênh nhỏ hoặc bãi rác không được che chắn có thể di chuyển xuống sông lớn, thấm vào tầng nước ngầm và đi ra cửa biển.',
        ],
      },
      {
        heading: '2. Tầm quan trọng của nguồn nước sạch',
        paragraphs: [
          'Theo Tổ chức Y tế Thế giới (WHO), nước an toàn và vệ sinh môi trường là điều kiện tiên quyết để phòng ngừa các bệnh truyền nhiễm đường tiêu hóa và bảo vệ sức khỏe cộng đồng. Đối với cơ thể người, nước duy trì thân nhiệt, vận chuyển dinh dưỡng và đào thải độc tố.',
          'Trong sản xuất, mọi ngành kinh tế đều phụ thuộc vào nước: từ tưới tiêu cây trồng, thủy sản, làm mát dây chuyền công nghiệp đến phát điện thủy điện. Khi nguồn nước suy thoái, chi phí xử lý nước sạch tăng vọt và sinh kế của hàng triệu hộ gia đình bị đe dọa.',
        ],
        highlight:
          'Nước sạch không chỉ là một tiện ích sinh hoạt mở vòi là có; đó là kết quả của cả một hệ sinh thái lưu vực khỏe mạnh.',
      },
    ],
    references: [
      'UNESCO World Water Assessment Programme (WWAP) – World Water Development Report.',
      'WHO – Guidelines for Drinking-water Quality.',
    ],
  },
  {
    id: 'art-c1',
    groupCode: 'C',
    groupTitle: 'Thực trạng và nguyên nhân ô nhiễm',
    title: 'Đọc vị các dòng thải: Khi sông hồ chịu áp lực từ thói quen hằng ngày',
    subtitle: 'Nhận diện nguồn điểm, nguồn diện và mối liên hệ với kênh rạch địa phương',
    summary:
      'Phân tích các nhóm nguyên nhân gây ô nhiễm nguồn nước tại đô thị và nông thôn, đồng thời gợi ý cách học sinh quan sát và đánh giá thực tế tại địa phương mình.',
    readTimeMinutes: 5,
    imageUrl: '/src/assets/images/editorial_water_pollution_1795690278210.jpg',
    imageCaption: 'Rác thải nhựa và dòng chảy đô thị thường tích tụ tại các điểm thắt nút và miệng cống.',
    sections: [
      {
        heading: '1. Nước thải sinh hoạt và đô thị hóa nhanh',
        paragraphs: [
          'Tại nhiều khu dân cư, nước thải từ nhà bếp, giặt giũ chứa dầu mỡ, chất hoạt động bề mặt và chất hữu cơ dễ phân hủy vẫn đi thẳng vào hệ thống thoát nước chung. Khi chưa được thu gom và xử lý tập trung đạt quy chuẩn, dòng thải này làm tăng nhu cầu oxy sinh hóa (BOD) và gây mùi hôi tại kênh rạch.',
          'Bên cạnh đó, rác thải nhựa dùng một lần bị vứt bừa bãi trên đường phố thường bị nước mưa cuốn thẳng xuống hố ga, vừa gây tắc nghẽn thoát nước gây ngập úng cục bộ, vừa phân mảnh thành vi nhựa theo thời gian.',
        ],
      },
      {
        heading: '2. Ô nhiễm phân tán từ nông nghiệp và sản xuất nhỏ lẻ',
        paragraphs: [
          'Trong sản xuất nông nghiệp, phân bón hóa học và thuốc bảo vệ thực vật sử dụng vượt nhu cầu cây trồng sẽ rửa trôi theo nước mưa xuống ao hồ lân cận. Ở các khu vực sản xuất thủ công hoặc công nghiệp chưa kiểm soát chặt chẽ, kim loại nặng và hóa chất nhuộm có thể tồn lưu rất lâu trong trầm tích đáy.',
        ],
      },
      {
        heading: '3. Liên hệ thực tế tại địa phương',
        paragraphs: [
          'Thay vì trích dẫn những con số chung chung thiếu kiểm chứng, mỗi nhóm học sinh có thể tự khảo sát bằng quan sát thực địa: kiểm tra khu vực quanh trường học hoặc nơi ở sau một cơn mưa, ghi nhận vị trí miệng cống bị rác che lấp, màu nước và thói quen xả thải quanh bờ kênh. Chính dữ liệu quan sát trung thực đó tạo nên giá trị thuyết phục nhất cho dự án.',
        ],
        highlight:
          'Phần lớn rác thải trên sông không tự nhiên xuất hiện giữa lòng sông; chúng bắt đầu từ vỉa hè, miệng cống và sự tiện tay trên bờ.',
      },
    ],
    references: [
      'Bộ Tài nguyên và Môi trường – Báo cáo Hiện trạng môi trường quốc gia về môi trường nước lục địa.',
      'Quy chuẩn kỹ thuật quốc gia về chất lượng nước mặt (QCVN 08:2023/BTNMT).',
    ],
  },
  {
    id: 'art-d1',
    groupCode: 'D',
    groupTitle: 'Hậu quả của ô nhiễm nguồn nước',
    title: 'Cái giá âm thầm: Từ sức khỏe con người đến hệ lụy kinh tế – xã hội',
    subtitle: 'Những tác động dây chuyền mà một dòng nước suy thoái để lại qua nhiều thế hệ',
    summary:
      'Làm rõ tác động đa tầng của ô nhiễm nước: bệnh tật trực tiếp, tích lũy sinh học trong chuỗi thức ăn, suy giảm đa dạng sinh học và gánh nặng chi phí xã hội.',
    readTimeMinutes: 4,
    imageUrl: '/src/assets/images/editorial_water_pollution_1795690278210.jpg',
    imageCaption: 'Suy thoái thủy vực làm đứt gãy môi trường sống của sinh vật bản địa và đe dọa sức khỏe dân cư.',
    sections: [
      {
        heading: '1. Ảnh hưởng trực tiếp đến sức khỏe cộng đồng',
        paragraphs: [
          'Nguồn nước nhiễm vi sinh vật gây bệnh làm gia tăng nguy cơ tiêu chảy, thương hàn, viêm da và các bệnh về mắt. Nguy hiểm hơn, các chất ô nhiễm hóa học như kim loại nặng (chì, thủy ngân, asen) hoặc hóa chất bền vững không gây triệu chứng tức thì mà tích lũy âm thầm trong cơ thể qua nhiều năm.',
        ],
      },
      {
        heading: '2. Đứt gãy hệ sinh thái thủy sinh',
        paragraphs: [
          'Khi nồng độ oxy hòa tan giảm mạnh do phú dưỡng hoặc màng dầu che phủ mặt nước, các loài cá, tôm, động vật thân mềm nhạy cảm sẽ biến mất trước tiên. Hiện tượng tích lũy sinh học khiến độc tố tăng dần nồng độ từ sinh vật phù du lên cá lớn và cuối cùng đi vào bữa ăn của con người.',
        ],
      },
      {
        heading: '3. Hệ lụy kinh tế và công bằng xã hội',
        paragraphs: [
          'Nước ô nhiễm buộc các nhà máy cấp nước phải đầu tư công nghệ xử lý phức tạp hơn, làm tăng chi phí xã hội. Người dân ven sông, người làm nông nghiệp và nuôi trồng thủy sản thường là nhóm chịu thiệt hại sinh kế đầu tiên dù không phải tác nhân gây ô nhiễm chính.',
        ],
        highlight:
          'Chi phí để phục hồi một dòng sông đã chết luôn lớn gấp nhiều lần chi phí giữ cho dòng sông đó không bị ô nhiễm ngay từ đầu.',
      },
    ],
    references: [
      'Tổ chức Y tế Thế giới (WHO) – Water, Sanitation and Hygiene (WASH).',
      'Chương trình Phát triển Liên Hợp Quốc (UNDP) – Báo cáo Phát triển Con người về An ninh nước.',
    ],
  },
  {
    id: 'art-e1',
    groupCode: 'E',
    groupTitle: 'Giải pháp và trách nhiệm cộng đồng',
    title: 'Bản đồ trách nhiệm: Từ một căn bếp nhỏ đến chính sách quản trị lưu vực',
    subtitle: 'Phân định vai trò của cá nhân, gia đình, nhà trường và chính quyền trong bảo vệ nguồn nước',
    summary:
      'Tổng hợp các giải pháp thực tế, phân cấp theo bốn chủ thể trách nhiệm để học sinh thấy rõ mình có thể làm gì ngay hôm nay và cần đồng hành với ai.',
    readTimeMinutes: 5,
    imageUrl: '/src/assets/images/editorial_clean_water_action_1795690279588.jpg',
    imageCaption: 'Kiểm soát nguồn thải tại gia đình và trường học là tuyến phòng vệ đầu tiên của nguồn nước.',
    sections: [
      {
        heading: '1. Trách nhiệm của cá nhân và gia đình',
        paragraphs: [
          'Mỗi gia đình là một điểm phát thải nhỏ. Việc lọc tách dầu ăn thừa vào chai riêng thay vì đổ xuống cống, ưu tiên chất tẩy rửa thân thiện sinh học, không xả rác vào bồn cầu hay hố ga và tiết kiệm nước sinh hoạt giúp giảm trực tiếp tải lượng ô nhiễm đầu nguồn.',
        ],
      },
      {
        heading: '2. Vai trò của nhà trường và cộng đồng',
        paragraphs: [
          'Nhà trường không chỉ giảng dạy lý thuyết mà có thể trở thành không gian thực hành xanh: bảo trì hệ thống vòi nước chống rò rỉ, phân loại rác tại nguồn để nhựa không trôi xuống cống thoát nước, tổ chức các nhóm khảo sát thực địa trong môn Hoạt động trải nghiệm, hướng nghiệp.',
          'Ở quy mô khu dân cư, sự giám sát của cộng đồng giúp phát hiện sớm các điểm tập kết rác sai quy định và duy trì nếp sống văn minh ven kênh rạch.',
        ],
      },
      {
        heading: '3. Vai trò của chính quyền và tổ chức chuyên môn',
        paragraphs: [
          'Giải pháp bền vững đòi hỏi hạ tầng thu gom – xử lý nước thải tách biệt với nước mưa, quy hoạch hành lang bảo vệ nguồn nước và thực thi nghiêm chế tài đối với các cơ sở xả thải vượt chuẩn. Tiếng nói phản ánh có trách nhiệm của người dân trẻ chính là động lực để chính sách đi vào thực chất.',
        ],
        highlight:
          'Hành động cá nhân không thay thế được chính sách công, nhưng không một chính sách nào thành công nếu thiếu ý thức từ từng hộ gia đình.',
      },
    ],
    references: [
      'Mục tiêu Phát triển Bền vững số 6 của Liên Hợp Quốc (SDG 6: Clean Water and Sanitation).',
      'Bộ Giáo dục và Đào tạo – Chương trình Hoạt động trải nghiệm, hướng nghiệp cấp THPT.',
    ],
  },
  {
    id: 'art-f1',
    groupCode: 'F',
    groupTitle: 'Góc suy ngẫm – Bài luận chiều sâu',
    title: 'Khoảng cách giữa biết và làm: Chúng ta nợ những dòng sông điều gì?',
    subtitle: 'Một suy ngẫm dành cho thế hệ trẻ trước câu hỏi trách nhiệm với tương lai nguồn nước',
    summary:
      'Bài luận kết nối nhận thức khoa học với trải nghiệm thực tế của người trẻ: vượt qua cảm giác thờ ơ hay bất lực để biến sự thấu cảm thành kỷ luật hành động.',
    readTimeMinutes: 4,
    imageUrl: '/src/assets/images/editorial_river_watershed_1795690278584.jpg',
    imageCaption: 'Giữ lại sự trong lành cho một nhánh sông đòi hỏi sự kiên nhẫn qua nhiều thế hệ.',
    sections: [
      {
        heading: '1. Căn bệnh quen thuộc: Biết rất nhiều nhưng vẫn đứng nhìn',
        paragraphs: [
          'Hầu hết học sinh ngày nay đều có thể trả lời đúng rằng nước rất quan trọng và không nên xả rác bừa bãi. Nhưng khoảng cách lớn nhất của thời đại thông tin không nằm ở việc thiếu khẩu hiệu, mà ở sự đứt gãy giữa tri thức trên trang giấy và phản xạ trong đời sống thật.',
          'Khi đi ngang một con kênh đen đúa hay một miệng cống đầy túi nhựa, ta dễ tặc lưỡi xem đó là việc của cơ quan môi trường. Sự quen mắt khiến cái bất thường trở thành bình thường.',
        ],
      },
      {
        heading: '2. Ý nghĩa thật sự của một buổi ra quân thực tế',
        paragraphs: [
          'Một nhóm học sinh đi nhặt rác ven bờ hay ghi chép chất lượng nước không thể làm sạch toàn bộ dòng sông chỉ trong một buổi sáng. Nhưng điều thay đổi mạnh mẽ nhất sau hoạt động thực tế chính là góc nhìn của người tham gia: một khi bạn đã tự tay nhặt từng vỏ chai mắc kẹt trong bùn, bạn sẽ không bao giờ còn thản nhiên vứt một chai nhựa xuống đường nữa.',
        ],
      },
      {
        heading: '3. Gửi lại cho chính mình sau buổi thuyết trình',
        paragraphs: [
          'Dự án môn học rồi sẽ khép lại sau tiếng vỗ tay trên lớp, nhưng dòng nước ngoài kia vẫn tiếp tục chảy qua cuộc đời chúng ta mỗi ngày. Câu hỏi quan trọng nhất không phải là bài thuyết trình hôm nay được bao nhiêu điểm, mà là ngày mai ta đối xử thế nào với giọt nước chảy qua tay mình.',
        ],
        highlight:
          'Mỗi thế hệ đều chỉ mượn nguồn nước từ thiên nhiên và từ thế hệ đi sau. Hãy trả lại nó ít nhất không tệ hơn lúc ta nhận.',
      },
    ],
    references: [
      'Bài luận biên soạn cho dự án giáo dục trải nghiệm BLUE TRACE.',
    ],
  },
];
