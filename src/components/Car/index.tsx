import React from "react";

import GasolineSvg from '../../assets/gasoline.svg'

import {
    Container,
    Details,
    Brand,
    Name,
    Abount,
    Rent,
    Period,
    Price,
    Type,
    CarImage
} from "./styles";

interface CarData {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    },
    thumbnail: string;
}

interface Props {
    data: CarData;
}

export function Car({data} : Props) {
    return (
        <Container>

            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <Abount>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>R$ ${data.rent.price}</Price>
                    </Rent>

                    <Type>
                        <GasolineSvg />
                    </Type>

                </Abount>
            </Details>

            <CarImage source={{ uri: data.thumbnail}} 
            resizeMode="contain"
            />
        </Container>
    )
}