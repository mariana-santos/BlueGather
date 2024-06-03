import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';

// Type import
import { MainNavigationRoutes } from '@routes/index';
import { CreateEventRoutes } from '..';

// Validation import
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Step1FormSchema } from '@validations/QuoteDetails';

// Component import
import {
  Button,
  DefaultComponent,
  Input,
  WavesContainer,
  WrapperPage,
} from '@components/index';

// Style import
import { ScrollableContent, Fieldset } from '@global/styles/index';

interface Step1Form {
  local: string;
  title: string;
  description: string;
}

export const Step1: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<CreateEventRoutes, 'Step1'>,
    NativeStackScreenProps<MainNavigationRoutes>
  >
> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Form>({
    resolver: yupResolver(Step1FormSchema),
    defaultValues: { local: 'Praia grande' },
  });

  const onSubmit = () => {
    return navigation.navigate('Step2');
  };

  return (
    <WrapperPage>
      <ScrollableContent>
        <DefaultComponent
          headerProps={{ goBack: () => navigation.goBack() }}
          highlightProps={{ title: 'Novo evento', subtitle: 'Passo 1 de 3' }}
        />

        <WavesContainer>
          <Fieldset>
            <Controller
              control={control}
              name="local"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  required
                  onChangeText={onChange}
                  label="Local"
                  label2="Mova o mapa para alterar este endereço."
                  autoCapitalize="none"
                  placeholder="Praia grande"
                  error={errors.local?.message}
                  editable={false}
                />
              )}
            />
          </Fieldset>

          <Fieldset>
            <Controller
              control={control}
              name="title"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  required
                  onChangeText={onChange}
                  label="Título"
                  autoCapitalize="none"
                  placeholder="Descreve o que precisa ser feito"
                  error={errors.title?.message}
                />
              )}
            />
          </Fieldset>

          <Fieldset>
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  required
                  onChangeText={onChange}
                  label="Descrição"
                  placeholder="Adicione informações adicionais"
                  error={errors.description?.message}
                  multiline
                  numberOfLines={4}
                />
              )}
            />
          </Fieldset>
        </WavesContainer>
      </ScrollableContent>

      <Button label="Continuar" size="XL" onPress={handleSubmit(onSubmit)} />
    </WrapperPage>
  );
};
