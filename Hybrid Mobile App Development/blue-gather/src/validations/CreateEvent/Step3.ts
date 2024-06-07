import * as yup from 'yup';

export const Step3FormSchema = yup.object().shape({
  startDate: yup
    .date()
    .optional(),
  endDate: yup
    .date()
    .optional()
});
