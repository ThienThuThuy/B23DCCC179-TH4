import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface CauHinhListProps {
    data: CauHinh[];
    onEdit: (record: CauHinh) => void;
    onDelete: (id: string) => void;
}

const CauHinhList: React.FC<CauHinhListProps> = ({ data, onEdit, onDelete }) => {
    const columns = [
        { title: 'Mã Trường', dataIndex: 'id', key: 'id' },
        { title: 'Nhãn Trường', dataIndex: 'label', key: 'label' },
        { title: 'Kiểu Dữ Liệu', dataIndex: 'type', key: 'type' },
        {
            title: 'Thao Tác',
            key: 'actions',
            render: (_: any, record: CauHinh) => (
                <div>
                    <Button icon={<EditOutlined />} onClick={() => onEdit(record)} type="link">
                        Sửa
                    </Button>
                    <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} type="link" danger>
                        Xóa
                    </Button>
                </div>
            ),
        },
    ];

    return <Table dataSource={data} columns={columns} rowKey="id" />;
};

export default CauHinhList;
