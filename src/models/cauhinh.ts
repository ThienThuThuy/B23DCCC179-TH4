import { useState } from 'react';
import { getCauHinh, saveCauHinh } from '@/services/SoVanBang/index';
import { message } from 'antd';

export default function useCauHinhModel() {
    const [cauhinh, setCauHinh] = useState<CauHinh[]>(getCauHinh());
    const [visible, setVisible] = useState<boolean>(false);
    const [currentField, setCurrentField] = useState<any>(null);

    const openModal = (record?: any) => {
        setCurrentField(record || null);
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
        setCurrentField(null);
    };
    // Hàm sinh ID 8 số từ label
    const generateId = (label: string): string => {
        let hash = 0;
        for (let i = 0; i < label.length; i++) {
            hash = (hash << 5) - hash + label.charCodeAt(i);
            hash |= 0;
        }

        return Math.abs(hash).toString().padStart(8, '0').slice(0, 8);
    };

    // Thêm cấu hình mới
    const addCauHinh = (newCauHinhData: Omit<CauHinh, 'id'>): void => {
        const newCauHinh: CauHinh = { id: generateId(newCauHinhData.label), ...newCauHinhData };
        const updatedCauHinh = [...cauhinh, newCauHinh];

        setCauHinh(updatedCauHinh);
        saveCauHinh(updatedCauHinh);
        message.success('Thêm cấu hình thành công!');
    };

    // Chỉnh sửa cấu hình
    const editCauHinh = (updatedCauHinh: CauHinh): void => {
        const updatedCauHinhList = cauhinh.map(ch =>
            ch.id === updatedCauHinh.id ? updatedCauHinh : ch
        );

        setCauHinh(updatedCauHinhList);
        saveCauHinh(updatedCauHinhList);
        message.success('Cập nhật cấu hình thành công!');
    };

    // Xóa cấu hình
    const deleteCauHinh = (id: string): void => {
        const updatedCauHinh = cauhinh.filter(ch => ch.id !== id);

        setCauHinh(updatedCauHinh);
        saveCauHinh(updatedCauHinh);
        message.success('Xóa cấu hình thành công!');
    };

    return { cauhinh, setCauHinh, addCauHinh, editCauHinh, deleteCauHinh, generateId, visible, setVisible, currentField, setCurrentField, openModal, closeModal };
}
