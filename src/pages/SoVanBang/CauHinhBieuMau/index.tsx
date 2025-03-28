import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useCauHinhModel from '@/models/cauhinh';
import CauHinhList from '@/components/CauHinh/List';
import FormCauHinh from '@/components/CauHinh/Form';

const CauHinhBieuMau: React.FC = () => {
    const { cauhinh, addCauHinh, editCauHinh, deleteCauHinh, openModal, currentField, visible, closeModal } = useCauHinhModel();

    return (
        <Card
            title="Cấu Hình Biểu Mẫu Phụ Lục Văn Bằng"
            extra={
                <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
                    Thêm Trường Mới
                </Button>
            }
        >
            <CauHinhList
                data={cauhinh}
                onEdit={openModal}
                onDelete={deleteCauHinh}
            />

            {/* Chỉ hiển thị Modal khi cần */}
            <FormCauHinh
                initialValues={currentField}
                isEdit={!!currentField}
                open={visible} // Truyền trạng thái vào Form
                onClose={closeModal}
                onSave={(values) => {
                    if (currentField) {
                        editCauHinh({ ...currentField, ...values });
                    } else {
                        addCauHinh(values);
                    }
                    closeModal();
                }}
            />
        </Card>
    );
};

export default CauHinhBieuMau;
