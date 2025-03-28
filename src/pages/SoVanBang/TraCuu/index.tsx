import { useState } from 'react';
import { Input, Button, Table, message, Modal, Form, DatePicker } from 'antd';
import useDiplomaSearchParamsModel from '@/models/tracuu';
import { getGraduationDecision, saveGraduationDecision } from '@/services/SoVanBang/index';
import dayjs from 'dayjs';

export default function SearchDiplomaPage() {
    const { searchParams, setSearchParams, searchResults, searchDiplomas, openModal, visible, closeModal, currentDiploma } = useDiplomaSearchParamsModel();
    const [graduationDecisions, setGraduationDecisions] = useState<GraduationDecision[]>(getGraduationDecision());

    /**
     * Cập nhật tổng số lượt tra cứu theo quyết định tốt nghiệp
     */
    const updateSearchCount = (decisionId: string) => {
        const updatedDecisions = graduationDecisions.map(decision =>
            decision.id === decisionId ? { ...decision, searchCount: (decision.searchCount || 0) + 1 } : decision
        );
        setGraduationDecisions(updatedDecisions);
        saveGraduationDecision(updatedDecisions);
    };

    /**
     * Xử lý tìm kiếm
     */
    const handleSearch = () => {
        if (!searchParams.diplomaNumber && !searchParams.registryNumber && !searchParams.studentId && !searchParams.fullName && !searchParams.dateOfBirth) {
            message.error('Vui lòng nhập ít nhất 2 tham số để tra cứu!');
            return;
        }

        searchDiplomas(searchParams);

        // Cập nhật số lượt tra cứu theo quyết định tốt nghiệp
        searchResults.forEach(diploma => {
            if (diploma.graduationDecisionId) {
                updateSearchCount(diploma.graduationDecisionId);
            }
        });
    };

    const columns = [
        { title: 'Số hiệu VB', dataIndex: 'diplomaNumber', key: 'diplomaNumber' },
        { title: 'Số vào sổ', dataIndex: 'registryNumber', key: 'registryNumber' },
        { title: 'MSV', dataIndex: 'studentId', key: 'studentId' },
        { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_: any, record: DiplomaInfo) => (
                <Button type="link" onClick={() => openModal(record)}>Xem chi tiết</Button>
            ),
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <h2>Tra cứu Văn Bằng & Quyết Định Tốt Nghiệp</h2>

            <Form layout="inline">
                <Form.Item>
                    <Input
                        placeholder="Số hiệu văn bằng"
                        value={searchParams.diplomaNumber}
                        onChange={e => setSearchParams({ ...searchParams, diplomaNumber: e.target.value })}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Số vào sổ"
                        type="number"
                        value={searchParams.registryNumber}
                        onChange={e => setSearchParams({ ...searchParams, registryNumber: Number(e.target.value) })}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="MSV"
                        value={searchParams.studentId}
                        onChange={e => setSearchParams({ ...searchParams, studentId: e.target.value })}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Họ tên"
                        value={searchParams.fullName}
                        onChange={e => setSearchParams({ ...searchParams, fullName: e.target.value })}
                    />
                </Form.Item>
                <Form.Item>
                    <DatePicker
                        placeholder="Ngày sinh"
                        format="DD/MM/YYYY"
                        onChange={(_, dateString) => {
                            if (Array.isArray(dateString)) return; // Tránh lỗi nếu là mảng
                            const dateValue = dateString ? new Date(dateString) : undefined;
                            setSearchParams({ ...searchParams, dateOfBirth: dateValue });
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSearch}>Tìm kiếm</Button>
                </Form.Item>
            </Form>

            <Table
                dataSource={searchResults}
                columns={columns}
                rowKey="diplomaNumber"
                style={{ marginTop: 20 }}
            />

            <Modal open={visible} onCancel={closeModal} footer={null}>
                {currentDiploma && (
                    <div>
                        <h3>Chi tiết Văn Bằng</h3>
                        <p><b>Số hiệu VB:</b> {currentDiploma.diplomaNumber}</p>
                        <p><b>Số vào sổ:</b> {currentDiploma.registryYear}</p>
                        <p><b>MSV:</b> {currentDiploma.studentId}</p>
                        <p><b>Họ tên:</b> {currentDiploma.fullName}</p>
                        <p><b>Ngày sinh:</b> {dayjs(currentDiploma.dateOfBirth).format('DD/MM/YYYY')}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
