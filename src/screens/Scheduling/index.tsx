import React from "react";
import { useNavigation } from "@react-navigation/native";

import { BackButton } from "../../components/BackButton";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar, DayProps, generateInterval, MarkedDateProps } from "../../components/Calendar";
import { useState } from "react";
import { format, parseISO } from "date-fns";

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


interface RentalPeriod {
    startFormated: string;
    endFormated: string;
}

export function Scheduling() {
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
    const navigation = useNavigation<any>()

    function handleConfirmRental() {
        navigation.navigate('SchedulingDetails')
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
            startFormated: format(parseISO(firstDate), 'dd/MM/yyyy'),
            endFormated: format(parseISO(endDate), 'dd/MM/yyyy'),
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
                            <DateValue selected={!!rentalPeriod.startFormated}>{rentalPeriod.startFormated}</DateValue>
                        </DateInfo>

                        <ArrowSvg />

                        <DateInfo>
                            <DateTitle>ATÉ</DateTitle>
                            <DateValue selected={!!rentalPeriod.endFormated}>{rentalPeriod.endFormated}</DateValue>
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