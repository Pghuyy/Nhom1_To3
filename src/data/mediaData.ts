import type { MediaCategory, MediaItem } from '../types/journey';

export const MEDIA_CATEGORY_LABELS: Record<MediaCategory, string> = {
  'boi-canh': '01. Bối cảnh hoạt động',
  'chuan-bi': '02. Quá trình chuẩn bị',
  'hanh-dong': '03. Những hành động thực tế',
  'thanh-qua': '04. Thành quả và ý nghĩa',
};

export const MEDIA_CATEGORY_SHORT: Record<MediaCategory, string> = {
  'boi-canh': 'Bối cảnh',
  'chuan-bi': 'Chuẩn bị',
  'hanh-dong': 'Hành động',
  'thanh-qua': 'Thành quả',
};

/**
 * Bộ khung tư liệu mẫu ban đầu khi chưa có bản ghi công khai trên Supabase.
 * Quản trị viên đăng nhập trang /admin để upload ảnh/video thực tế lên Supabase Storage
 * cho tất cả người truy cập link công khai cùng xem.
 */
export const DEFAULT_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'sample-01',
    title: 'Khung 01 · Khảo sát điểm nước tại địa phương',
    type: 'image',
    url: '/src/assets/images/editorial_water_pollution_1795690278210.jpg',
    caption:
      '[Khung tư liệu mẫu — Thay thế bằng ảnh khảo sát thực tế qua trang Quản trị] Ghi nhận hiện trạng mặt nước, rác thải nhựa ven bờ và hệ thống thoát nước tại khu vực khảo sát.',
    category: 'boi-canh',
    capturedAt: 'Mẫu · Giai đoạn khảo sát',
    location: 'Khu vực thực địa của nhóm',
    order: 0,
    isPublished: true,
    isCover: true,
    isSample: true,
    storageSource: 'sample',
  },
  {
    id: 'sample-02',
    title: 'Khung 02 · Chuẩn bị dụng cụ và kế hoạch hiện trường',
    type: 'image',
    url: '/src/assets/images/editorial_clean_water_action_1795690279588.jpg',
    caption:
      '[Khung tư liệu mẫu — Thay thế bằng ảnh chuẩn bị thực tế qua trang Quản trị] Phân công nhiệm vụ, chuẩn bị găng tay bảo hộ, kẹp gắp rác, túi phân loại và lọ quan sát mẫu nước.',
    category: 'chuan-bi',
    capturedAt: 'Mẫu · Trước ngày ra quân',
    location: 'Trường THPT / Điểm tập kết',
    order: 1,
    isPublished: true,
    isCover: false,
    isSample: true,
    storageSource: 'sample',
  },
  {
    id: 'sample-03',
    title: 'Khung 03 · Khoảnh khắc hành động tại hiện trường',
    type: 'image',
    url: '/src/assets/images/editorial_river_watershed_1795690278584.jpg',
    caption:
      '[Khung tư liệu mẫu — Thay thế bằng ảnh/video hành động thật qua trang Quản trị] Thành viên nhóm trực tiếp thu gom rác thải, khơi thông dòng chảy và ghi chép hiện trạng nguồn nước.',
    category: 'hanh-dong',
    capturedAt: 'Mẫu · Trong buổi thực hiện',
    location: 'Bờ kênh / Nguồn nước khảo sát',
    order: 2,
    isPublished: true,
    isCover: false,
    isSample: true,
    storageSource: 'sample',
  },
  {
    id: 'sample-04',
    title: 'Khung 04 · Thành quả và bài học rút ra sau hành trình',
    type: 'image',
    url: '/src/assets/images/intro_ocean_surface_1795690278004.jpg',
    caption:
      '[Khung tư liệu mẫu — Thay thế bằng ảnh tổng kết thực tế qua trang Quản trị] So sánh khu vực trước và sau hoạt động, đồng thời chia sẻ thông điệp giữ gìn nguồn nước bền vững.',
    category: 'thanh-qua',
    capturedAt: 'Mẫu · Tổng kết hoạt động',
    location: 'Cộng đồng địa phương',
    order: 3,
    isPublished: true,
    isCover: false,
    isSample: true,
    storageSource: 'sample',
  },
];
