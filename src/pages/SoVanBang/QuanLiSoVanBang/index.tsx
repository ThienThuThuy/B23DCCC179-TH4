import { useState } from 'react';
import { Select, Card } from 'antd';
import useDiplomaModel from '@/models/diploma';
import DiplomaList from '@/components/QuanLiSoVanBang/DiplomaList';
import DiplomaDetailModal from '@/components/QuanLiSoVanBang/DiplomaDetailModal';

export default function DiplomaRegistryPage() {
    const {
        setSelectedYear,
        yearOptions,
        filteredDiplomas,
        showModal,
        isModalOpen,
        setIsModalOpen,
        selectedDiploma,
    } = useDiplomaModel();

    return (
        <Card title="Quản Lý Sổ Văn Bằng" style={{ padding: 20 }}>
            <Select
                style={{ width: 200, marginBottom: 20 }}
                placeholder="Chọn năm"
                onChange={(value) => {
                    console.log("Năm đã chọn:", value);
                    setSelectedYear(value !== undefined ? Number(value) : null);
                }}
                allowClear
            >
                {yearOptions.map((year) => (
                    <Select.Option key={year} value={year}>
                        {year}
                    </Select.Option>
                ))}
            </Select>

            <DiplomaList diplomas={filteredDiplomas} showModal={showModal} />

            <DiplomaDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                diploma={selectedDiploma}
            />
        </Card>
    );
}
