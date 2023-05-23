import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, StatusBar } from "react-native";
import { useState } from "react";
import { format, parseISO } from "date-fns";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar, DayProps, generateInterval, MarkedDateProps } from "../../components/Calendar";
import { CarDTO } from "../../dtos/CarDTO";
import ArrowSvg from "../../assets/arrow.svg";

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


interface RentalPeriod {
    start: string;
    end: string;
}

interface Params {
    car: CarDTO
}

export function Scheduling() {
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

    const route = useRoute()
    const { car } = route.params as Params;
    const navigation = useNavigation<any>()

    function handleConfirmRental() {
        if (!rentalPeriod.start || !rentalPeriod.end){
            Alert.alert('Selecione as datas para alugar!')
        } else {
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates)
            })
        }
    }

    function handleBack() {
        navigation.goBack()
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end)
        const interval = generateInterval(start, end);
        setMarkedDates(interval)

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            start: format(parseISO(firstDate), 'dd/MM/yyyy'),
            end: format(parseISO(endDate), 'dd/MM/yyyy'),
        });
    }


        return (
            <Container>
                <Header>
                    <StatusBar
                        barStyle="light-content"
                        translucent
                        backgroundColor="transparent"
                    />
                    <BackButton onPress={handleBack} />
                    <Title>
                        Escolha uma{"\n"}data de início e{"\n"}fim do aluguel
                    </Title>
                    <RentalPeriod>
                        <DateInfo>
                            <DateTitle>DE</DateTitle>
                            <DateValue selected={!!rentalPeriod.start}>{rentalPeriod.start}</DateValue>
                        </DateInfo>

                        <ArrowSvg />

                        <DateInfo>
                            <DateTitle>ATÉ</DateTitle>
                            <DateValue selected={!!rentalPeriod.end}>{rentalPeriod.end}</DateValue>
                        </DateInfo>
                    </RentalPeriod>
                </Header>
                <Content>
                    <Calendar
                        markedDates={markedDates}
                        onDayPress={handleChangeDate}
                    />
                </Content>

                <Footer>
                    <Button title="Confirmar" onPress={handleConfirmRental} />
                </Footer>
            </Container>
        );
}