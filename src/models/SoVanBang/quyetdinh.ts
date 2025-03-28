import { useState } from 'react';
import { getGraduationDecision, saveGraduationDecision } from '@/services/SoVanBang/index';
import { message } from 'antd';

// Hook quản lý quyết định tốt nghiệp
export default function useGraduationDecisionModel() {
    // Lấy dữ liệu quyết định từ localStorage
    const [graduationDecisions, setGraduationDecisions] = useState<GraduationDecision[]>(getGraduationDecision());

    // 🔹 Tạo ID mới dựa trên timestamp (tránh trùng lặp)
    const generateId = (): string => {
        return `QD_${Date.now()}`;
    };

    // ✅ Thêm quyết định mới
    const addGraduationDecision = (decisionData: Omit<GraduationDecision, 'id' | 'registryYear' | 'searchCount'>): void => {
        setGraduationDecisions(prevDecisions => {
            const issueDate = new Date(decisionData.issueDate); // Đảm bảo issueDate là Date hợp lệ
            const newDecision: GraduationDecision = {
                id: crypto.randomUUID(), // 🔹 Tạo ID duy nhất
                ...decisionData,
                issueDate, // 🔹 Chuyển đổi issueDate về kiểu Date chuẩn
                registryYear: issueDate.getFullYear().toString(), // 🔹 Lấy năm làm mã sổ văn bằng
                searchCount: 0, // 🔹 Mặc định số lượt tra cứu là 0
            };
            const updatedDecisions = [...prevDecisions, newDecision];

            saveGraduationDecision(updatedDecisions);
            return updatedDecisions;
        });
    };

    // ✅ Sửa quyết định tốt nghiệp
    const editGraduationDecision = (id: string, updatedData: Partial<GraduationDecision>): void => {
        setGraduationDecisions(prevDecisions => {
            const updatedDecisions = prevDecisions.map(decision =>
                decision.id === id ? { ...decision, ...updatedData, issueDate: new Date(updatedData.issueDate || decision.issueDate) } : decision
            );

            saveGraduationDecision(updatedDecisions);
            message.success('Cập nhật quyết định thành công!');
            return updatedDecisions;
        });
    };

    // ✅ Xóa quyết định tốt nghiệp
    const deleteGraduationDecision = (id: string): void => {
        setGraduationDecisions(prevDecisions => {
            const updatedDecisions = prevDecisions.filter(decision => decision.id !== id);

            saveGraduationDecision(updatedDecisions);
            message.success('Xóa quyết định thành công!');
            return updatedDecisions;
        });
    };

    return {
        graduationDecisions,
        addGraduationDecision,
        editGraduationDecision,
        deleteGraduationDecision,
    };
}
