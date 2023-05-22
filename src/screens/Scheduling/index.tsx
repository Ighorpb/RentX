import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from "./styles";
import ArrowSvg from "../../assets/arrow.svg";

import { BackButton } from "../../components/BackButton";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

export function Scheduling() {

    const navigation = useNavigation<any>()

    function handleConfirmRental() {
        navigation.navigate('SchedulingDetails')
    }

    function handleBack() {
        navigation.goBack()
    }
   

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton onPress={handleBack}/>
                <Title>
                    Escolha uma{"\n"}data de início e{"\n"}fim do aluguel
                </Title>
                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={false}></DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={true}>18/05/2023</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>
            <Content>
                <Calendar />
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRental} />
            </Footer>
        </Container>
    );
}