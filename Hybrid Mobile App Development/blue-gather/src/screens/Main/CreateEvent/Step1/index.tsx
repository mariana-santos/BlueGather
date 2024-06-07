import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';

// Type import
import { MainNavigationRoutes } from '@routes/index';
import { CreateEventRoutes } from '..';

// Validation import
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Step1FormSchema } from '@validations/CreateEvent';

// Component import
import {
  Button,
  CustomDropdown,
  DefaultComponent,
  Input,
  WavesContainer,
  WrapperPage,
} from '@components/index';

// Style import
import { ScrollableContent, Fieldset } from '@global/styles/index';

// Hook import
import { useCreateEvent } from '@hooks/useCreateEvent';
import { useLayoutEffect } from 'react';
import { TFlatList } from 'react-native-input-select/lib/typescript/types/index.types';

interface Step1Form {
  title: string;
  description?: string;
  eventType: number;
}

export const Step1: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<CreateEventRoutes, 'Step1'>,
    NativeStackScreenProps<MainNavigationRoutes>
  >
> = ({ navigation }) => {
  const { 
    event, 
    setEvent,
    eventTypes, 
    fetchEventTypes 
  } = useCreateEvent();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Form>({
    resolver: yupResolver(Step1FormSchema),
  });

  const onSubmit: SubmitHandler<Step1Form> = data => {
    const { title, description, eventType } = data;
    setEvent(prevEvent => ({
      ...prevEvent,
      titulo: title,
      idTipoEvento: eventType,
      descricao: description ?? null,
    }));

    return navigation.navigate('Step2');
  };

  useLayoutEffect(() => {
    fetchEventTypes();
  }, []);

  const typesOptions: TFlatList =
    eventTypes &&
    eventTypes.map(item => ({
      label: item.nome,
      value: item.id,
    }));

  return (
    <WrapperPage>
      <ScrollableContent>
        <DefaultComponent
          headerProps={{ goBack: () => navigation.goBack() }}
          highlightProps={{
            title: 'Novo evento',
            subtitle:
              'Encontrou um lugar que precisa de voluntários para ajudar na causa do oceano? Nos dê mais detalhes!',
          }}
        />

        <WavesContainer>
          <Fieldset>
            <Input
              value={`${event.latitude}, ${event.longitude}`}
              required
              label="Local"
              label2="Volte para alterar o endereço."
              placeholder="Praia grande"
              editable={false}
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
                  onChangeText={onChange}
                  label="Descrição"
                  placeholder="Adicione informações adicionais"
                  error={errors.description?.message}
                  multiline
                  numberOfLines={3}
                />
              )}
            />
          </Fieldset>

          <Fieldset>
            <Controller
              control={control}
              name="eventType"
              render={({ field: { value, onChange } }) => (
                <CustomDropdown
                  isSearchable
                  label="Tipo"
                  placeholder="Selecione o tipo de evento"
                  options={typesOptions}
                  selectedValue={value}
                  onValueChange={onChange}
                  error={errors.eventType?.message}
                  listControls={{
                    emptyListMessage: 'Nenhum tipo de evento encontrado.',
                  }}
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
