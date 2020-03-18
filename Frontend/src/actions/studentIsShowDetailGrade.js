import * as studentIsShowDetailGradeConstants from '../constants/studentIsShowDetailGrade';

export const  actionShowDetailGrade = () => {
    return{
        type : studentIsShowDetailGradeConstants.SHOW_DETAIL_GRADE,
    };
};
export const  actionNotShowDetailGrade = () => {
    return{
        type : studentIsShowDetailGradeConstants.NOT_SHOW_DETAIL_GRADE,
    };
};


