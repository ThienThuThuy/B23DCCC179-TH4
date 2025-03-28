import { useState } from 'react';
import { getDiplomaInfos, saveDiplomaInfos } from '@/services/SoVanBang/index';
import { message } from 'antd';

export default function useDiplomaModel() {
    const [diplomaInfos, setDiplomaInfos] = useState<DiplomaInfo[]>(getDiplomaInfos());
    const [selectedDiploma, setSelectedDiploma] = useState<DiplomaInfo | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const yearOptions = [...new Set(diplomaInfos.map((diploma) => Number(diploma.registryYear)))]
        .sort((a, b) => b - a);

    const filteredDiplomas = selectedYear !== null
        ? diplomaInfos.filter((diploma) => Number(diploma.registryYear) === selectedYear)
        : diplomaInfos;

    const showModal = (diploma: DiplomaInfo) => {
        setSelectedDiploma(diploma);
        setIsModalOpen(true);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    // Hàm tạo ID mới tự tăng
    const generateNewId = (): string => {
        if (!diplomaInfos || diplomaInfos.length === 0) {
            return "1"; // Trả về "1" nếu chưa có văn bằng nào
        }

        const maxId = Math.max(...diplomaInfos.map(d => Number(d.id) || 0));
        return String(maxId + 1);
    };


    // Thêm văn bằng mới
    const addDiploma = (diplomaData: Omit<DiplomaInfo, 'id'>): void => {
        setDiplomaInfos(prevDiplomas => {
            const newId = (prevDiplomas.length > 0 ? Math.max(...prevDiplomas.map(d => d.id)) : 0) + 1;
            const newDiploma: DiplomaInfo = { id: newId, ...diplomaData };
            const updatedDiplomas = [...prevDiplomas, newDiploma];

            saveDiplomaInfos(updatedDiplomas);
            message.success('Thêm văn bằng thành công!');
            return updatedDiplomas;
        });
    };

    return {
        diplomaInfos,
        addDiploma,
        generateNewId,
        isModalOpen,
        setIsModalOpen,
        selectedYear,
        setSelectedYear,
        openModal,
        closeModal,
        selectedDiploma,
        setSelectedDiploma,
        yearOptions,
        filteredDiplomas,
        showModal

    };
}
