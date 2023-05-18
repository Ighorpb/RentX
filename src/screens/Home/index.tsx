// Importação das Libs.
import React from "react";
import { StatusBar } from "react-native"; // Basicamente ajusta o Notch do celular 
import { RFValue } from "react-native-responsive-fontsize"; // Permite que você defina tamanhos de fonte responsivos usando um valor relativo e fazendo o cálculo com base nas dimensões da tela.

// Importação Utilities.
import Logo from '../../assets/logo.svg'
import { Car } from "../../components/Car";

// "Componentes" para serem estilizados. 
import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList
} from './styles'

export function Home() {
    const carData = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'AO DIA',
            price: 120,
        },
        thumbnail: 'https://cdn.sitewebmotors.com.br/uploads/userGallery/5fcfe53240728.png'
    }

    
    return (
        <Container>
            <StatusBar // Configs do StatusBar
                barStyle='light-content'
                backgroundColor='transparent'
                translucent={true}
            />
            <Header>
                <HeaderContent>
                    <Logo // Tamanhos do Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            <CarList
            data={[1,2,3,4,5,6]} 
            keyExtractor={item => String(item)}
            renderItem={({item}) => <Car data={carData} />}

            />

        </Container>
    )
}