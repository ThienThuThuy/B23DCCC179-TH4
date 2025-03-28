import { useState } from 'react';
import useDiplomaModel from '@/models/diploma';
import { Button } from 'antd';
import useCauHinhModel from '@/models/cauhinh';
import useGraduationDecisionModel from '@/models/quyetdinh';
import DiplomaList from '@/components/Diploma/DiplomaList';
import DiplomaForm from '@/components/Diploma/DiplomaForm';

export default function DiplomaInfoPage() {
    const { diplomaInfos, addDiploma, generateNewId, openModal, isModalOpen, closeModal, setSelectedYear } = useDiplomaModel();
    const { cauhinh } = useCauHinhModel();
    const { graduationDecisions } = useGraduationDecisionModel();

    return (
        <div>
            <Button type="primary" onClick={openModal}>Thêm Văn Bằng</Button>

            <DiplomaList diplomaInfos={diplomaInfos} cauhinh={cauhinh} />

            <DiplomaForm
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                addDiploma={addDiploma}
                generateNewId={generateNewId}
                cauhinh={cauhinh}
                graduationDecisions={graduationDecisions}
                setSelectedYear={setSelectedYear}
            />
        </div>
    );
}
