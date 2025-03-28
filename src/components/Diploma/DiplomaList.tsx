import { Table } from 'antd';
import dayjs from 'dayjs';

interface DiplomaListProps {
    diplomaInfos: any[];
    cauhinh: any[];
}

const DiplomaList: React.FC<DiplomaListProps> = ({ diplomaInfos, cauhinh }) => {
    const columns = [
        { title: 'Số Vào Sổ', dataIndex: 'id', key: 'id' },
        { title: 'Mã SV', dataIndex: 'studentId', key: 'studentId' },
        { title: 'Họ Tên', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Sổ Văn Bằng Năm', dataIndex: 'registryYear', key: 'registryYear' },
        { title: 'Quyết định tốt nghiệp', dataIndex: 'graduationDecisionId', key: 'graduationDecisionId' },
        {
            title: 'Ngày Sinh',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (date: string | Date) => dayjs(date).format('DD/MM/YYYY'),
        },
        ...cauhinh.map(field => ({
            title: field.label,
            dataIndex: field.id,
            key: field.id,
            render: (value: any) => field.type === 'Date' ? dayjs(value).format('DD/MM/YYYY') : value,
        })),
    ];

    return <Table dataSource={diplomaInfos} columns={columns} rowKey="id" />;
};

export default DiplomaList;
