import type { LocalContextConfig, QuizQuestion } from '../types/journey';

export function buildQuizQuestions(localContext: LocalContextConfig): QuizQuestion[] {
  return [
    {
      id: 'q1-role',
      topicNumber: 1,
      topicLabel: 'Vai trò của môi trường nước',
      question:
        'Vì sao nguồn nước ngọt sạch được xem là nhân tố giới hạn sự ổn định của cả hệ sinh thái và đời sống con người?',
      options: [
        'Vì nước chỉ cần thiết cho sản xuất nông nghiệp, không ảnh hưởng nhiều tới công nghiệp hay khí hậu.',
        'Vì nước tham gia trực tiếp vào quá trình trao đổi chất của sinh vật, điều hòa khí hậu, duy trì chuỗi thức ăn thủy sinh và mọi hoạt động sinh kế.',
        'Vì lượng nước ngọt dễ khai thác trên Trái Đất chiếm phần lớn tổng lượng nước đại dương.',
        'Vì nguồn nước tự nhiên luôn có khả năng tự làm sạch tức thì dù lượng chất thải lớn đến đâu.',
      ],
      correctIndex: 1,
      explanation:
        'Nước là dung môi sinh học thiết yếu cho mọi tế bào sống, điều hòa nhiệt độ bề mặt Trái Đất và là nền tảng của sinh kế, nông nghiệp, sản xuất. Tài nguyên nước ngọt dễ tiếp cận chỉ chiếm một tỉ lệ rất nhỏ và khả năng tự làm sạch của dòng chảy có giới hạn.',
    },
    {
      id: 'q2-local',
      topicNumber: 2,
      topicLabel: 'Thực trạng nguồn nước tại địa phương',
      isLocalEditable: true,
      question: `Khi quan sát thực tế tại ${localContext.locationName} (${localContext.waterBodyName}), dấu hiệu nào phản ánh sớm nhất áp lực ô nhiễm lên dòng nước quanh khu dân cư?`,
      options: [
        'Mặt nước luôn giữ nguyên độ trong suốt và không bao giờ xuất hiện mùi lạ sau mưa lớn.',
        'Rác thải nhựa tích tụ dọc bờ và cửa cống, nước đổi màu đục bất thường, có váng dầu hoặc mùi hôi khi mực nước xuống thấp.',
        'Các loài cá bản địa tự nhiên sinh sôi dày đặc hơn ở những khu vực gần miệng cống xả thải.',
        'Nhiệt độ nước thay đổi theo mùa nắng mưa hoàn toàn tự nhiên, không liên quan đến sinh hoạt.',
      ],
      correctIndex: 1,
      explanation: `Ghi nhận thực địa (${localContext.locationName}): ${localContext.localObservation} Việc quan sát rác tồn đọng, váng dầu, độ đục và mùi tại cửa cống giúp nhận diện sớm nguy cơ suy giảm chất lượng nước.`,
    },
    {
      id: 'q3-causes',
      topicNumber: 3,
      topicLabel: 'Nguyên nhân gây ô nhiễm nguồn nước',
      question:
        'Nhóm nguyên nhân nào từ hoạt động của con người hiện nay gây áp lực kéo dài nhất lên chất lượng sông, kênh rạch và nước ngầm?',
      options: [
        'Nước mưa tự nhiên rơi xuống bề mặt đất trước khi chảy ra biển.',
        'Sự quang hợp của thực vật thủy sinh bản địa vào ban ngày.',
        'Nước thải sinh hoạt và sản xuất chưa xử lý đạt chuẩn, lạm dụng hóa chất nông nghiệp cùng thói quen xả rác nhựa xuống hệ thống thoát nước.',
        'Hiện tượng thủy triều lên xuống định kỳ theo chu kỳ Mặt Trăng.',
      ],
      correctIndex: 2,
      explanation:
        'Nước thải sinh hoạt chứa chất hữu cơ và chất tẩy rửa, nước thải công nghiệp, dư lượng phân bón/thuốc bảo vệ thực vật theo dòng chảy mặt, cùng rác thải nhựa phân rã thành vi nhựa là các nguồn gây ô nhiễm chủ yếu.',
    },
    {
      id: 'q4-consequences',
      topicNumber: 4,
      topicLabel: 'Hậu quả của ô nhiễm nguồn nước',
      question:
        'Hiện tượng phú dưỡng (dư thừa chất dinh dưỡng như nitơ, phốt pho từ nước thải và phân bón) tác động thế nào đến hệ sinh thái nước?',
      options: [
        'Giúp nước trở nên tinh khiết hơn và tăng hàm lượng oxy hòa tan suốt cả ngày lẫn đêm.',
        'Gây tảo nở hoa quá mức, che ánh sáng mặt trời và làm cạn kiệt oxy hòa tan khi tảo phân hủy, dẫn đến cá và sinh vật đáy chết hàng loạt.',
        'Chỉ làm thay đổi màu sắc bề mặt trong vài giờ mà không ảnh hưởng đến chuỗi thức ăn.',
        'Ngăn chặn hoàn toàn sự thấm nước xuống tầng chứa nước ngầm.',
      ],
      correctIndex: 1,
      explanation:
        'Khi tảo phát triển bùng phát rồi chết đi, quá trình phân hủy vi sinh tiêu thụ lượng lớn oxy hòa tan (DO), tạo ra "vùng thiếu oxy" khiến hệ sinh thái thủy sinh suy kiệt và ảnh hưởng trực tiếp tới nguồn nước sinh hoạt.',
    },
    {
      id: 'q5-solutions',
      topicNumber: 5,
      topicLabel: 'Giải pháp bảo vệ nguồn nước',
      question:
        'Với vai trò là học sinh THPT, tổ hợp hành động nào mang lại giá trị thực chất và bền vững nhất để bảo vệ môi trường nước tại nơi mình sống?',
      options: [
        'Chỉ chờ đợi các đợt tổng vệ sinh cấp thành phố mỗi năm một lần.',
        'Tiết kiệm nước hằng ngày, không đổ dầu ăn thừa và hóa chất xuống cống, giảm nhựa dùng một lần, đồng thời khảo sát thực tế và lan tỏa kiến thức đúng đắn trong trường học và gia đình.',
        'Thu gom rác ven kênh rồi đốt trực tiếp ngay sát bờ sông để đỡ công vận chuyển.',
        'Sử dụng thật nhiều hóa chất tẩy rửa mạnh để át mùi hôi của nước thải gia đình.',
      ],
      correctIndex: 1,
      explanation:
        'Bảo vệ nguồn nước hiệu quả cần kết hợp thay đổi hành vi ngay tại nguồn phát thải (dầu thừa, nhựa, hóa chất, tiết kiệm nước) với việc giám sát cộng đồng và truyền thông dựa trên hiểu biết khoa học.',
    },
  ];
}
