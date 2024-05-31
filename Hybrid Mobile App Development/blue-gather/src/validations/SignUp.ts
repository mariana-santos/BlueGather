import * as yup from "yup";

export const SignUpFormSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório."),
  email:
    yup.string().email("Informe um email válido").required("Email é obrigatório."),
  senha: yup.string().required("Senha é obrigatória."),
});
