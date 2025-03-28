import { Table, Button } from 'antd';
import dayjs from 'dayjs';

interface DiplomaListProps {
    diplomas: DiplomaInfo[];
    showModal: (record: DiplomaInfo) => void;
}

export default function DiplomaList({ diplomas, showModal }: DiplomaListProps) {
    const columns = [
        { title: 'Số Vào Sổ', dataIndex: 'id', key: 'id' },
        { title: 'Mã SV', dataIndex: 'studentId', key: 'studentId' },
        { title: 'Họ Tên', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Quyết định tốt nghiệp', dataIndex: 'graduationDecisionId', key: 'graduationDecisionId' },
        {
            title: 'Ngày Sinh',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (date: string | Date) => dayjs(date).format('DD/MM/YYYY'),
        },
        { title: 'Số Hiệu Văn Bằng', dataIndex: 'diplomaNumber', key: 'diplomaNumber' },
        {
            title: 'Thao Tác',
            key: 'action',
            render: (_: any, record: DiplomaInfo) => (
                <Button type="link" onClick={() => showModal(record)}>
                    Xem Chi Tiết
                </Button>
            ),
        },
    ];

    return (
        <Table
            dataSource={diplomas}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
        />
    );
}
