import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Toast from 'react-native-toast-message';

// Component import
import {
  WavesContainer,
  Input,
  Button,
  DefaultComponent,
  WrapperPage,
} from '@components/index';

// Type import
import { MainNavigationRoutes } from '@routes/index';

// Validation import
import { SignUpFormSchema } from '@validations/index';


// Style import
import { ScrollableContent, Fieldset } from '@global/styles/index';
import { useAuth } from '@hooks/useAuth';

interface SignUpForm {
  nome: string;
  email: string;
  senha: string;
}

export const SignUp: React.FC<
  NativeStackScreenProps<MainNavigationRoutes, 'SignUp'>
> = ({ navigation }) => {
  // Hook
  const { handleSignUp } = useAuth();
  const {
    control,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(SignUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignUpForm> = async data => {
    try {
      const { email, nome, senha } = data;
      await handleSignUp({ email, nome, senha });
      resetField("email");
      resetField("senha");
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Dados inválidos',
      });
    }
  };

  return (
    <WrapperPage>
      <ScrollableContent>
        <DefaultComponent
          highlightProps={{
            title: 'Cadastre-se',
            subtitle: 'Bem vindo! Preencha seus dados para começar a fazer a diferença na vida marinha.',
          }}
          key="default-component-signup"
        />

        <WavesContainer scrollable>
          <Fieldset>
            <Controller
              control={control}
              name="nome"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  label="Nome"
                  required
                  placeholder="Digite seu nome"
                  error={errors.nome?.message}
                />
              )}
            />
          </Fieldset>

          <Fieldset>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  label="E-mail"
                  keyboardType="email-address"
                  placeholder="Digite seu email"
                  autoCapitalize="none"
                  required
                  error={errors.email?.message}
                />
              )}
            />
          </Fieldset>

          <Fieldset>
            <Controller
              control={control}
              name="senha"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  label="Senha"
                  required
                  placeholder="********"
                  secureTextEntry
                  autoCapitalize="none"
                  error={errors.senha?.message}
                />
              )}
            />
          </Fieldset>

          <Fieldset>
            <Input
              value=""
              label="Imagem de perfil"
              placeholder="Selecione sua imagem de perfil"
              autoCapitalize="none"
            />
          </Fieldset>

          <Button style={{ paddingVertical: 25 }}
            label="Continuar"
            onPress={handleSubmit(onSubmit)}
          />
          
        </WavesContainer>
      </ScrollableContent>


    </WrapperPage>
  );
};
