import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import { ConfirmButton } from "../../components/ConfirmButton";
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import { 
    Container,
    Content,
    Title,
    Message,
    Footer

} from "./styles";

interface Props {
    onPress: () => void;
}


export function SchedulingComplete(){
    const {width} = useWindowDimensions()

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <LogoSvg width={width}/>

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>Carro Alugado!</Title>

                <Message>
                    Agora você só precisa ir {'\n'}
                    até a concessionária da RENTX {'\n'}
                    pegar seu automóvel.
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title="OK" onPress={() => console.log('Cliquei')}/>
            </Footer>

        </Container>
    )
}