import React, {useState, useEffect} from "react";
import { Feather } from '@expo/vector-icons'
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { parseISO, format } from "date-fns";
import { Alert } from "react-native";

import { BackButton } from "../../components/BackButton"
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,

} from "./styles";

interface Params {
    car: CarDTO
    dates: string[]
}

interface RentalPeriod {
    start: string,
    end: string
}

export function SchedulingDetails() {
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

    const route = useRoute()
    const { car, dates } = route.params as Params;
    const navigation = useNavigation<any>()
    const theme = useTheme()

    const rentTotal = Number(dates.length * car.rent.price)

   async function handleScheduleComplete() {
        const response = await api.get(`/schedules_bycars/${car.id}`);

        const unavailable_dates = [
            ...response.data.unavailable_dates,
            ...dates,
        ]

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
            .then(() => navigation.navigate('SchedulingComplete'))
            .catch(()=> Alert.alert('Não foi possível confirmar o agendamento.'))


       
    }


    function handleBack() {
        navigation.goBack()
    }

    const firstDate = Object.values(dates)[0];
    const endDate = Object.values(dates)[Object.keys(dates).length - 1];

    useEffect(()=>{
        setRentalPeriod({
            start: format(parseISO(firstDate), 'dd/MM/yyyy'),
            end: format(parseISO(endDate), 'dd/MM/yyyy'),
        })
    }, [])

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} />
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={car.photos} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))
                    }

                </Accessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>



                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.rent.price} x ${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>




            <Footer>
                <Button title="Alugar agora!" onPress={handleScheduleComplete} color={theme.colors.success} />
            </Footer>
        </Container>
    )
}