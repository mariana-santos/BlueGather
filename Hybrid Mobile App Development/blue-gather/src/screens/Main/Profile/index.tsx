import { useState } from 'react';
import { ImageSourcePropType } from 'react-native';

// Hook import
import { useAuth } from '@hooks/useAuth';

// Component import
import {
  WavesContainer,
  DefaultComponent,
  UserAvatar,
  WrapperPage,
  FloatingMenu,
} from '@components/index';

// Style import
import { AvatarWrapper, MedalsContainer, Text } from './styles';
import { ScrollableContent } from '@global/styles/index';
import { Medal } from './Medal';

interface ProfileForm {
  email: string;
  senha: string;
}

export function Profile() {
  // Hook
  const { user } = useAuth();

  // State
  const [avatar, setAvatar] = useState<string | undefined>(user?.urlImagem);

  const imageSource: ImageSourcePropType = avatar
    ? { uri: avatar }
    : require('../../../assets/default_avatar.png');

  return (
    <WrapperPage>
      <ScrollableContent>
        <DefaultComponent key="default-component-profile" />

        <AvatarWrapper>
          <UserAvatar
            imageSource={imageSource}
            handleSetAvatar={setAvatar}
            size="MD"
          />
        </AvatarWrapper>

        <WavesContainer>
          <Text large>Minhas contribuições</Text>

          <Text>
            Obrigada por todo o seu apoio na nossa causa de amenizar os estragos
            no oceano! Aqui estão suas medalhas provando que você é um herói! :)
          </Text>

          <MedalsContainer>
            <Medal />
            <Medal />
            <Medal />
          </MedalsContainer>
        </WavesContainer>
      </ScrollableContent>

      <FloatingMenu />
    </WrapperPage>
  );
}
