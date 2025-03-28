import { Modal } from 'antd';
import dayjs from 'dayjs';

interface DiplomaDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    diploma: DiplomaInfo | null;
}

export default function DiplomaDetailModal({ isOpen, onClose, diploma }: DiplomaDetailModalProps) {
    return (
        <Modal title="Chi Tiết Văn Bằng" open={isOpen} onCancel={onClose} footer={null}>
            {diploma && (
                <div>
                    <p><strong>Số Vào Sổ:</strong> {diploma.id}</p>
                    <p><strong>Mã SV:</strong> {diploma.studentId}</p>
                    <p><strong>Họ Tên:</strong> {diploma.fullName}</p>
                    <p><strong>Ngày Sinh:</strong> {dayjs(diploma.dateOfBirth).format('DD/MM/YYYY')}</p>
                    <p><strong>Số Hiệu Văn Bằng:</strong> {diploma.diplomaNumber}</p>
                    <p><strong>Quyết Định Tốt Nghiệp:</strong> {diploma.graduationDecisionId}</p>
                    {diploma.additionalFields && (
                        <div>
                            <h4>Thông Tin Bổ Sung</h4>
                            {Object.entries(diploma.additionalFields).map(([key, value]) => (
                                <p key={key}><strong>{key}:</strong> {String(value)}</p>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </Modal>
    );
}
