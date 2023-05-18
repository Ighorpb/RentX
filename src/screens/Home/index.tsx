import React from "react";
import { StatusBar } from "react-native"; // Basicamente ajusta o Notch do celular 
import { RFValue } from "react-native-responsive-fontsize"; // Permite que você defina tamanhos de fonte responsivos usando um valor relativo e fazendo o cálculo com base nas dimensões da tela.

import Logo from '../../assets/logo.svg'

import {
    Container,
    Header,
    TotalCars,
    HeaderContent
} from './styles'

export function Home() {
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
        </Container>
    )
}