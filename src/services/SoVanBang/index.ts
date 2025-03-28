const STORAGE_KEY_DIPLOMAS = "diploma_infos";

export const getDiplomaInfos = (): DiplomaInfo[] => {
    const saved = localStorage.getItem(STORAGE_KEY_DIPLOMAS);
    return saved ? JSON.parse(saved) : [];
};

export const saveDiplomaInfos = (configs: DiplomaInfo[]) => {
    localStorage.setItem(STORAGE_KEY_DIPLOMAS, JSON.stringify(configs));
};

const STORAGE_KEY_CAUHINH = 'CauHinh';

export const getCauHinh = (): CauHinh[] => {
    const saved = localStorage.getItem(STORAGE_KEY_CAUHINH);
    return saved ? JSON.parse(saved) : [];
};

export const saveCauHinh = (configs: CauHinh[]) => {
    localStorage.setItem(STORAGE_KEY_CAUHINH, JSON.stringify(configs));
};

const STORAGE_KEY_QUYETDINHTOTNGHIEP = 'GraduationDecision';

export const getGraduationDecision = (): GraduationDecision[] => {
    const saved = localStorage.getItem(STORAGE_KEY_QUYETDINHTOTNGHIEP);
    if (!saved) return [];

    try {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) return [];

        return parsed.map(decision => ({
            ...decision,
            issueDate: new Date(decision.issueDate),
            searchCount: Number(decision.searchCount) || 0,
        })) as GraduationDecision[];
    } catch (error) {
        console.error("Lỗi khi parse dữ liệu quyết định tốt nghiệp:", error);
        return [];
    }
};

export const saveGraduationDecision = (decisions: GraduationDecision[]) => {
    localStorage.setItem(STORAGE_KEY_QUYETDINHTOTNGHIEP, JSON.stringify(decisions));
};

const STORAGE_KEY_DiplomaSearchParams = 'DiplomaSearchParams';

export const getDiplomaSearchParams = (): Record<string, any> => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_DiplomaSearchParams);
        return saved ? JSON.parse(saved) : {};
    } catch (error) {
        console.error("Lỗi khi đọc thông tin tìm kiếm từ localStorage:", error);
        return {};
    }
};

export const saveDiplomaSearchParams = (params: Record<string, any>) => {
    try {
        localStorage.setItem(STORAGE_KEY_DiplomaSearchParams, JSON.stringify(params));
    } catch (error) {
        console.error("Lỗi khi lưu thông tin tìm kiếm vào localStorage:", error);
    }
};
