//Importação das Libs
import React from 'react'; // Importação do React
import { ThemeProvider } from 'styled-components'; 
import * as SplashScreen from 'expo-splash-screen'; //  Exibir uma tela de carregamento (splash screen) personalizada ao iniciar um aplicativo Expo.

//Importaçôes Utilities
//import { Home } from './src/screens/Home'; // Importação da Screen/Home
import { CarDetails } from './src/screens/CarDetails';
import theme from './src/global/styles/theme'; // Importação do theme/styles

//Importação das Fontes
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter' // Formatação das Fontes Archivo

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo'; // Formatação das Fontes Archivo

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({ // Carregar as fonts no app
    Inter_400Regular,
    Inter_500Medium,

    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if (!fontsLoaded) {    // se o fontsLoaded não(!) tiver carregado, executar o App loading para segurar a aplicação enquanto as fontes são carregadas 
    return null
  }

  SplashScreen.hideAsync();


  return (
    <ThemeProvider theme={theme}>
      <CarDetails />
    </ThemeProvider>
  )
}

