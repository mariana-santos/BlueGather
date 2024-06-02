import * as yup from 'yup';

export const Step3FormSchema = yup.object().shape({
  startDate: yup
    .date()
    .required('Data de início é obrigatória.')
    .typeError('Data de início é obrigatória.'),
  endDate: yup
    .date()
    .required('Data final é obrigatória.')
    .typeError('Data final é obrigatória.'),
});
