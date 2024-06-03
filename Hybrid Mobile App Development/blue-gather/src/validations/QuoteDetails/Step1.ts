import * as yup from 'yup';

export const Step1FormSchema = yup.object().shape({
  local: yup.string().required('O local é obrigatório.'),
  title: yup.string().required('O título do evento é obrigatório.'),
  description: yup.string().required('A descrição do evento é obrigatória.'),
});
