import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Switch, Keyboard } from 'react-native';
import { format } from 'date-fns';
import { useState } from 'react';

// Type import
import { MainNavigationRoutes } from '@routes/index';
import { CreateEventRoutes } from '..';
import { EventQuery } from '@dtos/event';

// Validation import
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Step3FormSchema } from '@validations/CreateEvent';

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
import { Text } from '@screens/Main/Profile/styles';

// Theme import
import theme from '@theme/index';

// Hook import
import { useCreateEvent } from '@hooks/useCreateEvent';
import { useAuth } from '@hooks/useAuth';

// Util import
import { STATUS_OPTIONS } from '@utils/options';

interface Step3Form {
  startDate?: Date;
  endDate?: Date;
}

export const Step3: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<CreateEventRoutes, 'Step3'>,
    NativeStackScreenProps<MainNavigationRoutes>
  >
> = ({ navigation }) => {
  const [isOrganizer, setIsOrganizer] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Step3Form>({
    resolver: yupResolver(Step3FormSchema),
  });

  const { user } = useAuth();
  const { event, handleNewEvent } = useCreateEvent();

  const onSubmit: SubmitHandler<Step3Form> = data => {
    const { startDate, endDate } = data;

    const dataInicio = startDate ? format(startDate, 'yyyy-MM-dd HH:mm:ss') : null;
    const dataFim = endDate ? format(endDate, 'yyyy-MM-dd HH:mm:ss') : null;

    const finalQuery: EventQuery = {
      ...event,
      dataInicio,
      dataFim,
      idOrganizador: isOrganizer ? Number(user.id) : null,
      idsVoluntarios: isOrganizer ? [Number(user.id)] : [],
      urgencia: 5,
      idTipoEvento: 1,
      idStatus: STATUS_OPTIONS.inProgress
    };

    handleNewEvent(finalQuery);
  };

  function showDatePicker(dateType: keyof Step3Form) {
    const inputValue = getValues(dateType) || new Date();

    DateTimePickerAndroid.open({
      value: inputValue,
      onChange: (event, selectedDate) => {
        Keyboard.dismiss();
        if (selectedDate) {
          setValue(dateType, selectedDate);
        }
      },
      mode: 'date',
      minimumDate: new Date(),
    });
  }

  return (
    <WrapperPage>
      <ScrollableContent>
        <DefaultComponent
          headerProps={{ goBack: () => navigation.goBack() }}
          highlightProps={{ 
            title: 'Organização', 
            subtitle: 'O organizador define detalhes como datas e é responsável por tirar fotos do resultado.' }}
        />

        <WavesContainer>
          <Text size="lg">Organizarei o evento</Text>
          <Switch
            trackColor={{
              false: theme.COLORS.GRAY[10],
              true: theme.COLORS.GRAY[10],
            }}
            thumbColor={
              isOrganizer ? theme.COLORS.BLUE[40] : theme.COLORS.GRAY[40]
            }
            onValueChange={() =>
              setIsOrganizer(previousState => !previousState)
            }
            value={isOrganizer}
            style={{ alignSelf: 'flex-start' }}
          />

          <Fieldset>
            <Controller
              control={control}
              name="startDate"
              render={({ field: { value } }) => (
                <Input
                  value={!value ? value : format(value, 'dd/MM/yyyy')}
                  label="Data de início"
                  label2="Dia em que os voluntários se encontrarão."
                  autoCapitalize="none"
                  placeholder="20/06/2024"
                  error={errors.startDate?.message}
                  onPress={() => showDatePicker('startDate')}
                  editable={isOrganizer}
                />
              )}
            />
          </Fieldset>

          <Fieldset>
            <Controller
              control={control}
              name="endDate"
              render={({ field: { value } }) => (
                <Input
                  value={!value ? value : format(value, 'dd/MM/yyyy')}
                  label="Data de término"
                  label2="Essa data é apenas uma previsão do término do evento."
                  autoCapitalize="none"
                  placeholder="20/06/2024"
                  error={errors.endDate?.message}
                  onPress={() => showDatePicker('endDate')}
                  editable={isOrganizer}
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
