import { useState } from 'react';
import { getDiplomaSearchParams, saveDiplomaSearchParams, getDiplomaInfos } from '@/services/SoVanBang/index';
import { message } from 'antd';

export default function useDiplomaSearchParamsModel() {
    const [searchParams, setSearchParams] = useState<DiplomaSearchParams>(getDiplomaSearchParams());
    const [diplomaInfos, setDiplomaInfos] = useState<DiplomaInfo[]>(getDiplomaInfos());
    const [searchResults, setSearchResults] = useState<DiplomaInfo[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [currentDiploma, setCurrentDiploma] = useState<DiplomaInfo | null>(null);

    const openModal = (record?: DiplomaInfo) => {
        setCurrentDiploma(record || null);
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
        setCurrentDiploma(null);
    };

    /**
     * Kiểm tra người dùng có nhập đủ ít nhất 2 tham số hay không
     */
    const isValidSearch = (params: DiplomaSearchParams): boolean => {
        const filledParams = Object.values(params).filter(value => value !== undefined && value !== '');
        return filledParams.length >= 2;
    };

    /**
     * Thực hiện tìm kiếm văn bằng theo các tham số đã nhập
     */
    const searchDiplomas = (params: DiplomaSearchParams) => {
        if (!isValidSearch(params)) {
            message.error('Vui lòng nhập ít nhất 2 tham số để tra cứu!');
            return;
        }

        const results = diplomaInfos.filter(diploma =>
            (!params.diplomaNumber || diploma.diplomaNumber.includes(params.diplomaNumber)) &&
            (!params.registryNumber || diploma.registryYear === params.registryNumber) &&
            (!params.studentId || diploma.studentId.includes(params.studentId)) &&
            (!params.fullName || diploma.fullName.toLowerCase().includes(params.fullName.toLowerCase())) &&
            (!params.dateOfBirth || new Date(diploma.dateOfBirth).toDateString() === new Date(params.dateOfBirth).toDateString())
        );

        if (results.length === 0) {
            message.warning('Không tìm thấy kết quả nào.');
        }

        setSearchParams(params);
        setSearchResults(results);
        saveDiplomaSearchParams(params);
    };

    return {
        searchParams,
        setSearchParams,
        searchResults,
        setSearchResults,
        searchDiplomas,
        diplomaInfos,
        setDiplomaInfos,
        visible,
        setVisible,
        currentDiploma,
        setCurrentDiploma,
        openModal,
        closeModal
    };
}
