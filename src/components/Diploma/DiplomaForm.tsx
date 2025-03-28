import { useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, message } from 'antd';
import dayjs from 'dayjs';

interface DiplomaFormProps {
    isModalOpen: boolean;
    closeModal: () => void;
    addDiploma: (diploma: any) => void;
    generateNewId: () => string;
    cauhinh: any[];
    graduationDecisions: any[];
    setSelectedYear: (year: number | null) => void;
}

const DiplomaForm: React.FC<DiplomaFormProps> = ({
    isModalOpen,
    closeModal,
    addDiploma,
    generateNewId,
    cauhinh,
    graduationDecisions,
    setSelectedYear,
}) => {
    const [form] = Form.useForm();
    const [selectedYear, setYear] = useState<number | null>(null);

    const registryYearOptions = [...new Set(graduationDecisions.map((gd) => Number(gd.registryYear)))];
    const filteredDecisions = selectedYear ? graduationDecisions.filter((gd) => Number(gd.registryYear) === selectedYear) : [];

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (!values.dateOfBirth) {
                message.error("Vui lòng nhập ngày sinh!");
                return;
            }

            const newDiploma = { ...values, dateOfBirth: values.dateOfBirth.toISOString() };

            addDiploma(newDiploma);
            closeModal();
            form.resetFields();
        } catch (error) {
            message.error('Vui lòng nhập đầy đủ thông tin!');
        }
    };

    return (
        <Modal title="Thêm Văn Bằng" open={isModalOpen} onOk={handleOk} onCancel={closeModal}>
            <Form form={form} layout="vertical">
                <Form.Item name="id" label="Số Vào Sổ">
                    <Input disabled defaultValue={generateNewId()} />
                </Form.Item>
                <Form.Item name="studentId" label="Mã Sinh Viên" rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="fullName" label="Họ Tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="dateOfBirth" label="Ngày Sinh" rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}>
                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item name="diplomaNumber" label="Số Hiệu Văn Bằng" rules={[{ required: true, message: 'Vui lòng nhập số hiệu' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="registryYear" label="Sổ Văn Bằng Năm" rules={[{ required: true, message: 'Vui lòng chọn năm' }]}>
                    <Select placeholder="Chọn năm" onChange={(value) => { setYear(Number(value)); setSelectedYear(Number(value)); }}>
                        {registryYearOptions.map((year) => (
                            <Select.Option key={year} value={year}>{year}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="graduationDecisionId" label="Quyết định tốt nghiệp" rules={[{ required: true, message: 'Vui lòng chọn quyết định' }]}>
                    <Select placeholder="Chọn quyết định">
                        {filteredDecisions.map((decision) => (
                            <Select.Option key={decision.id} value={decision.id}>
                                {decision.decisionNumber} - {dayjs(decision.issueDate).format('DD/MM/YYYY')}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {cauhinh.map((field) => (
                    <Form.Item
                        key={field.id}
                        name={field.id}
                        label={field.label}
                        rules={field.required ? [{ required: true, message: `Vui lòng nhập ${field.label}` }] : []}
                    >
                        {field.type === 'String' && <Input />}
                        {field.type === 'Number' && <Input type="number" />}
                        {field.type === 'Date' && <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />}
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    );
};

export default DiplomaForm;
