import { useState } from 'react';
import { getGraduationDecision, saveGraduationDecision } from '@/services/SoVanBang/index';
import { message } from 'antd';

export default function useGraduationDecisionModel() {
    const [graduationDecisions, setGraduationDecisions] = useState<GraduationDecision[]>(getGraduationDecision());
    const [modalVisible, setModalVisible] = useState(false);
    const [editingDecision, setEditingDecision] = useState<GraduationDecision | null>(null);
    const [visible, setVisible] = useState<boolean>(false);

    const generateId = (): string => `QD_${Date.now()}`;

    const handleOpenModal = (decision?: GraduationDecision) => {
        setEditingDecision(decision || null);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSaveDecision = (data: Omit<GraduationDecision, 'id'>, isEdit: boolean) => {
        if (isEdit && editingDecision) {
            editGraduationDecision(editingDecision.id, data);
        } else {
            addGraduationDecision(data);
        }
    };

    const addGraduationDecision = (decisionData: Omit<GraduationDecision, 'id' | 'registryYear' | 'searchCount'>): void => {
        setGraduationDecisions(prevDecisions => {
            const issueDate = new Date(decisionData.issueDate);
            const newDecision: GraduationDecision = {
                id: crypto.randomUUID(),
                ...decisionData,
                issueDate,
                registryYear: issueDate.getFullYear().toString(),
                searchCount: 0,
            };
            const updatedDecisions = [...prevDecisions, newDecision];
            saveGraduationDecision(updatedDecisions);
            return updatedDecisions;
        });
    };

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
        modalVisible,
        editingDecision,
        generateId,
        visible,
        setVisible,
        handleOpenModal,
        handleCloseModal,
        handleSaveDecision,
        addGraduationDecision,
        editGraduationDecision,
        deleteGraduationDecision,
    };
}
