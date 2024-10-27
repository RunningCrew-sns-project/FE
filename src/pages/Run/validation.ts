



import * as yup from 'yup';

export const postValidation = yup.object().shape({
    title: yup.string().required('제목은 필수입니다.'),
    description: yup.string().required('소개글은 필수입니다.'),
    area: yup.string().required('지역을 선택하세요.'),
    maxpeople: yup.number().required('최대 인원수를 입력하세요.').positive().integer(),
});