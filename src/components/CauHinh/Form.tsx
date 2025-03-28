import { useEffect } from 'react';
import { Form, Modal, Input, Select, Checkbox } from 'antd';

interface AddCauHinhModalProps {
    onClose: () => void;
    onSave: (values: any) => void;
    initialValues?: any;
    isEdit?: boolean;
    open: boolean; // Nhận trạng thái modal từ props
}

const FormCauHinh: React.FC<AddCauHinhModalProps> = ({ onClose, onSave, initialValues, isEdit, open }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(initialValues || {});
    }, [initialValues, form]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                onSave(values);
                form.resetFields();
                onClose(); // Gọi onClose để đóng modal từ cha
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title={isEdit ? 'Sửa Trường' : 'Thêm Trường Mới'}
            open={open} // Sử dụng open từ props
            onOk={handleOk}
            onCancel={() => {
                form.resetFields();
                onClose();
            }}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="label"
                    label="Nhãn Trường"
                    rules={[{ required: true, message: 'Vui lòng nhập nhãn trường!' }]}
                >
                    <Input placeholder="Nhập nhãn trường (ví dụ: Điểm TB, Ngày Nhập Học)" />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Kiểu Dữ Liệu"
                    rules={[{ required: true, message: 'Vui lòng chọn kiểu dữ liệu!' }]}
                >
                    <Select placeholder="Chọn kiểu dữ liệu">
                        <Select.Option value="String">Chuỗi</Select.Option>
                        <Select.Option value="Number">Số</Select.Option>
                        <Select.Option value="Date">Ngày</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="required" valuePropName="checked">
                    <Checkbox>Trường này là bắt buộc</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default FormCauHinh;
