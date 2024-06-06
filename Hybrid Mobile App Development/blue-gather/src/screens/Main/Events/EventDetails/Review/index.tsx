import { Fragment, useState } from "react";
import { Label, StarButton, StarsContainer } from "./styles"
import { Flex } from "@global/styles";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import theme from "@theme/index";
import { ReviewQuery } from "@dtos/review";
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import Toast from "react-native-toast-message";

interface ReviewProps {
  eventId: number;
  toggleReviewModal: () => void;
}

interface IStars {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

interface IStar {
  rating: number;
  value: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

export default function Review({ eventId, toggleReviewModal }: ReviewProps) {
  const [rating, setRating] = useState(5);

  const { user } = useAuth();

  const handleRegisterReview = async () => {
    const finalBodyData: ReviewQuery = {
      idEvento: eventId,
      idAvaliador: Number(user.id),
      nota: rating,
    }

    try {
      const body = finalBodyData;
      const { data } = await api.post('/avaliacao', body);

      if (data.id) {
        Toast.show({
          type: 'success',
          text1: 'Avaliação registrada com sucesso!',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível registrar sua avaliação.',
      });

      throw error;
    } finally {
      toggleReviewModal();
    }

  };

  return(
    <Fragment>
      <Stars 
        rating={rating} 
        setRating={setRating} 
      />

      <Button 
        size='MD' 
        label='Enviar avaliação'
        onPress={() => handleRegisterReview()}
      />
    </Fragment>
  )
}

const Stars = ({ rating, setRating }: IStars) => {
  return(
    <StarsContainer>
      <Flex style={{
        justifyContent: "flex-start"
      }}>
        <Star setRating={setRating} rating={rating} value={1} />
        <Star setRating={setRating} rating={rating} value={2} />
        <Star setRating={setRating} rating={rating} value={3} />
        <Star setRating={setRating} rating={rating} value={4} />
        <Star setRating={setRating} rating={rating} value={5} />
      </Flex>
    </StarsContainer>
  )
}

const Star = ({ rating, value, setRating }: IStar) => {
  const selected = value <= rating;
  const color = selected ? theme.COLORS.FEEDBACK.YELLOW : theme.COLORS.GRAY[20];
  return (
    <StarButton
      onPress={() => setRating(value)}
    >
      <Icon name={"star"} color={color} size={theme.FONT_SIZE.XXL}/>
    </StarButton>
  )
}