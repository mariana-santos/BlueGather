import * as yup from 'yup';

export const Step1FormSchema = yup.object().shape({
  title: yup.string().required('O título do evento é obrigatório.'),
  description: yup.string().optional(),
});
