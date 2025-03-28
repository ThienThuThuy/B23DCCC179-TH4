import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useGraduationDecisionModel from '@/models/quyetdinh';
import dayjs from 'dayjs';

const GraduationDecisionPage: React.FC = () => {
    const { graduationDecisions, addGraduationDecision, editGraduationDecision, deleteGraduationDecision } = useGraduationDecisionModel();

    const [modalVisible, setModalVisible] = useState(false);
    const [editingDecision, setEditingDecision] = useState<GraduationDecision | null>(null);

    const [form] = Form.useForm();

    const showModal = (decision?: GraduationDecision) => {
        setModalVisible(true);
        setEditingDecision(decision || null);
        form.resetFields();

        if (decision) {
            form.setFieldsValue({
                ...decision,
                issueDate: dayjs(decision.issueDate), // 🔹 Định dạng ngày cho DatePicker
            });
        }
    };

    const handleAddOrEdit = async () => {
        try {
            const values = await form.validateFields();
            const data = {
                ...values,
                issueDate: values.issueDate.toISOString(), // 🔹 Chuyển đổi ngày về string
            };

            if (editingDecision) {
                editGraduationDecision(editingDecision.id, data);
            } else {
                addGraduationDecision(data);
            }

            message.success(editingDecision ? 'Cập nhật quyết định thành công!' : 'Thêm quyết định thành công!');
            setModalVisible(false);
        } catch (error) {
            message.error('Vui lòng nhập đầy đủ thông tin!');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                Thêm Quyết Định
            </Button>

            <Table
                dataSource={graduationDecisions}
                rowKey="id"
                columns={[
                    { title: 'ID', dataIndex: 'id', key: 'id' },
                    { title: 'Số QĐ', dataIndex: 'decisionNumber', key: 'decisionNumber' },
                    {
                        title: 'Ngày Ban Hành',
                        dataIndex: 'issueDate',
                        key: 'issueDate',
                        render: (date) => dayjs(date).format('DD/MM/YYYY')
                    },
                    { title: 'Trích Yếu', dataIndex: 'summary', key: 'summary' },
                    { title: 'Sổ Văn Bằng Năm', dataIndex: 'registryYear', key: 'registryYear' },
                    {
                        title: 'Hành Động',
                        key: 'actions',
                        render: (_, record) => (
                            <>
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() => showModal(record)}
                                    style={{ marginRight: 8 }}
                                />
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa?"
                                    onConfirm={() => deleteGraduationDecision(record.id)}
                                    okText="Xóa"
                                    cancelText="Hủy"
                                >
                                    <Button icon={<DeleteOutlined />} danger />
                                </Popconfirm>
                            </>
                        )
                    }
                ]}
            />

            {/* Modal thêm/sửa quyết định */}
            <Modal
                title={editingDecision ? 'Chỉnh Sửa Quyết Định' : 'Thêm Quyết Định'}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={handleAddOrEdit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="decisionNumber"
                        label="Số Quyết Định"
                        rules={[{ required: true, message: 'Nhập số quyết định!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="issueDate"
                        label="Ngày Ban Hành"
                        rules={[{ required: true, message: 'Chọn ngày ban hành!' }]}
                    >
                        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="summary"
                        label="Trích Yếu"
                        rules={[{ required: true, message: 'Nhập trích yếu!' }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default GraduationDecisionPage;
