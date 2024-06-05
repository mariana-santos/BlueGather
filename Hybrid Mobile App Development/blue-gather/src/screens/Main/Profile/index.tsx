import { useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

// Hook import
import { useAuth } from '@hooks/useAuth';

// Component import
import {
  WavesContainer,
  DefaultComponent,
  UserAvatar,
  WrapperPage,
  FloatingMenu,
  Button,
} from '@components/index';

// Style import
import { AvatarWrapper, Content, MedalsContainer, Text } from './styles';
import { ScrollableContent } from '@global/styles/index';
import { Medal } from './Medal';
import theme from '@theme/index';

interface ProfileForm {
  email: string;
  senha: string;
}

export function Profile() {
  // Hook
  const { user, handleSignOut } = useAuth();

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

          <Text size="lg">Natan Cruz</Text>
        </AvatarWrapper>

        <WavesContainer>
          <Content>
            <Text size="lg">Minhas contribuições</Text>

            <Text size="sm">
              Obrigada por todo o seu apoio na nossa causa de amenizar os
              estragos no oceano! Aqui estão suas medalhas provando que você é
              um herói! :)
            </Text>

            <MedalsContainer>
              <Medal />
              <Medal />
              <Medal />
            </MedalsContainer>

            <Button 
              backgroundColor={theme.COLORS.FEEDBACK.RED}
              style={{ marginTop: 25 }}
              label='Sair' 
              icon={<Icon name='logout' size={theme.FONT_SIZE.LG} color={theme.COLORS.WHITE} />}
              onPress={handleSignOut}
            />
          </Content>
        </WavesContainer>
      </ScrollableContent>

      <FloatingMenu />
    </WrapperPage>
  );
}
