export interface PracticalActionItem {
  id: string;
  scope: 'Cá nhân' | 'Gia đình' | 'Nhà trường' | 'Cộng đồng';
  title: string;
  description: string;
}

export const PROJECT_CONTENT = {
  brand: 'BLUE TRACE',
  title: 'HÀNH TRÌNH BẢO VỆ MÔI TRƯỜNG NƯỚC',
  subtitle: 'Dự án hoạt động trải nghiệm của nhóm 1, tổ 3',
  introHeroImage: '/src/assets/images/intro_ocean_surface_1795690278004.jpg',
  introMessage:
    'Mỗi giọt nước đều mang theo dấu vết của những lựa chọn hôm nay. Hãy đi cùng chúng tôi từ hiện trường thực tế đến tri thức khoa học và suy ngẫm hành động.',
  introCta: 'BẮT ĐẦU HÀNH TRÌNH',
  journalTransitionQuote:
    'Bạn đã nhìn thấy những hành động thực tế. Nhưng bạn hiểu được bao nhiêu về việc bảo vệ môi trường nước?',
  journalTransitionSubnote:
    'Hãy tiếp tục bước sang thử thách 5 câu hỏi nhanh để kiểm chứng góc nhìn khoa học và thực tiễn của bạn.',
  journalTransitionCta: 'THỬ THÁCH KIẾN THỨC',
  quizCompleteCta: 'KHÁM PHÁ GÓC TRI THỨC',
  libraryCompleteCta: 'HOÀN THÀNH HÀNH TRÌNH',
  dashboardOverview:
    'BLUE TRACE là hành trình trải nghiệm tương tác kết hợp phóng sự tư liệu thực tế, thử thách nhận thức và tạp chí tri thức về bảo vệ môi trường nước dành cho học sinh THPT.',
  dashboardCoreMessage:
    'Bảo vệ nguồn nước không bắt đầu từ những khẩu hiệu lớn lao, mà từ sự trung thực khi nhìn thẳng vào thực trạng dòng nước quanh mình và sự bền bỉ trong từng thói quen hằng ngày.',
  dashboardClosingQuote:
    'Nước không giữ lại lời hứa; nước chỉ phản chiếu những gì con người để lại. Khi bạn thay đổi một thói quen nhỏ hôm nay, một nhánh sông ngày mai sẽ giữ được sự trong lành.',
};

export const PRACTICAL_ACTIONS: PracticalActionItem[] = [
  {
    id: 'act-oil',
    scope: 'Gia đình',
    title: 'Thu gom dầu ăn thừa, không đổ xuống bồn rửa',
    description:
      'Một lượng nhỏ dầu mỡ đổ vào ống thoát nước có thể gây tắc nghẽn đường ống và làm giảm lượng oxy hòa tan khi chảy ra kênh rạch.',
  },
  {
    id: 'act-plastic',
    scope: 'Cá nhân',
    title: 'Mang bình nước cá nhân, từ chối chai nhựa dùng một lần',
    description:
      'Giảm rác thải nhựa trôi nổi xuống cống rãnh đô thị — nguồn phát sinh trực tiếp các hạt vi nhựa trong hệ sinh thái thủy sinh.',
  },
  {
    id: 'act-chemical',
    scope: 'Gia đình',
    title: 'Phân loại pin cũ, thuốc hết hạn và hóa chất tẩy rửa',
    description:
      'Không thải bỏ chất tẩy rửa đậm đặc hay pin hỏng lẫn vào rác sinh hoạt để ngăn kim loại nặng thấm xuống mạch nước ngầm.',
  },
  {
    id: 'act-school',
    scope: 'Nhà trường',
    title: 'Kiểm tra, khóa vòi nước rò rỉ và báo sửa kịp thời',
    description:
      'Chủ động theo dõi khu vực nhà vệ sinh, vòi rửa tay tại trường học giúp tiết kiệm lượng nước sạch thất thoát mỗi ngày.',
  },
  {
    id: 'act-community',
    scope: 'Cộng đồng',
    title: 'Tham gia dọn rác ven kênh rạch và ghi nhận điểm ô nhiễm',
    description:
      'Đồng hành cùng tổ dân phố, Đoàn trường dọn sạch miệng cống thoát nước trước mùa mưa và báo cáo các điểm xả thải bất thường.',
  },
  {
    id: 'act-detergent',
    scope: 'Gia đình',
    title: 'Ưu tiên sản phẩm tẩy rửa phân hủy sinh học, dùng đúng liều lượng',
    description:
      'Hạn chế lượng phốt phát và chất tẩy hóa học dư thừa đi theo nước giặt rửa ra hệ thống cống rãnh và sông ngòi.',
  },
];
