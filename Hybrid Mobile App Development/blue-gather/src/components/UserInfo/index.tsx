import { User } from "@dtos/user"
import { UserIcon, UserData, UserDocument, UserName, UserWrapper } from "./styles"
import { ImageSourcePropType } from "react-native";
import { UserAvatar } from "@components/UserAvatar";

interface Props {
  user?: User;
}

export const UserInfo = ({ user }: Props) => {

  const imageSource: ImageSourcePropType = user?.urlImagem
    ? { uri: user?.urlImagem }
    : require('../../assets/default_avatar.png');

  return(
    <UserWrapper>
      <UserIcon>
        <UserAvatar imageSource={imageSource} size="SM" />
      </UserIcon>
      <UserData>
        <UserName numberOfLines={1}>
          {user?.nome ?? 'Usuário não identificado'}
        </UserName>
        <UserDocument>
          {user?.email}
        </UserDocument>
      </UserData>
    </UserWrapper>
  )
}