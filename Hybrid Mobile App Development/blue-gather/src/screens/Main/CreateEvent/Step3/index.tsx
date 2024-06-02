import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Switch } from 'react-native';
// Type import
import { MainNavigationRoutes } from '@routes/index';
import { CreateEventRoutes } from '..';

// Validation import
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Step3FormSchema } from '@validations/QuoteDetails';

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
import { Keyboard } from 'react-native';
import { addDays, format } from 'date-fns';
import { Text } from '@screens/Main/Profile/styles';
import { useState } from 'react';
import theme from '@theme/index';

interface Step3Form {
  startDate: Date;
  endDate: Date;
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

  const onSubmit = () => {
    return console.log('** aqui criaria um evento');
  };

  function showDatePicker(dateType: keyof Step3Form) {
    const inputValue = getValues(dateType);

    DateTimePickerAndroid.open({
      value: inputValue,
      onChange: ({ nativeEvent }) => {
        Keyboard.dismiss();
        const selectedDate = new Date(nativeEvent.timestamp);
        return setValue(dateType, selectedDate);
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
          highlightProps={{ title: 'Novo evento', subtitle: 'Passo 1 de 3' }}
        />

        <WavesContainer>
          <Text size="lg">Organizarei o evento</Text>
          <Switch
            trackColor={{
              false: theme.COLORS.GRAY[30],
              true: theme.COLORS.BLUE[20],
            }}
            thumbColor={
              isOrganizer ? theme.COLORS.BLUE[30] : theme.COLORS.GRAY[10]
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
              defaultValue={new Date()}
              render={({ field: { value } }) => (
                <Input
                  value={format(new Date(value), 'dd/MM/yyyy')}
                  required
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
              defaultValue={addDays(new Date(), 15)}
              render={({ field: { value } }) => (
                <Input
                  value={format(new Date(value), 'dd/MM/yyyy')}
                  required
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
