import { ThemeProvider } from 'styled-components';
import { useFonts } from 'expo-font';
import { PTSansNarrow_700Bold } from '@expo-google-fonts/pt-sans-narrow';
import { OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import Toast from 'react-native-toast-message';

// Theme import
import theme from '@theme/index';

// Component import
import { Loading } from '@components/Loading';

// Route import
import Routes from '@routes/index';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'PTSansNarrow-Bold': PTSansNarrow_700Bold,
    'OpenSans-Regular': OpenSans_400Regular,
    'OpenSans-Bold': OpenSans_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      {!fontsLoaded ? <Loading /> : <Routes />}
      <Toast />
    </ThemeProvider>
  );
}
