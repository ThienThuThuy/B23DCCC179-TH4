// Interface cho Cấu hình biểu mẫu phụ lục văn bằng
interface CauHinh {
    id: string;
    label: string;
    required: 1 | 0;
    type: 'String' | 'Number' | 'Date';
}

// Interface cho Thông tin văn bằng
interface DiplomaInfo {
    id: number; // Số vào sổ, tự động tăng theo sổ văn bằng
    diplomaNumber: string; // Số hiệu văn bằng
    studentId: string; // Mã sinh viên
    fullName: string; // Họ tên
    dateOfBirth: Date; // Ngày sinh
    registryYear: number; // Năm vào sổ (thuộc sổ văn bằng nào)
    graduationDecisionId: string; // Thuộc quyết định tốt nghiệp nào
    additionalFields: Record<string, string | number | Date>; // Các trường thông tin động theo cấu hình biểu mẫu
}

// Interface cho Quyết định tốt nghiệp
interface GraduationDecision {
    id: string;
    decisionNumber: string; // Số quyết định
    issueDate: Date; // Ngày ban hành
    summary: string; // Trích yếu
    registryYear: string; // Quản lý trong sổ văn bằng nào
    searchCount: number; // Tổng số lượt tra cứu
}

// Interface cho Sổ văn bằng
interface DiplomaRegistry {
    id: string;
    registryYear: number; // Năm học
    diplomas: DiplomaInfo[]; // Danh sách văn bằng
}

// Interface tìm kiếm văn bằng
interface DiplomaSearchParams {
    diplomaNumber?: string;
    registryNumber?: number;
    studentId?: string;
    fullName?: string;
    dateOfBirth?: Date;
}


