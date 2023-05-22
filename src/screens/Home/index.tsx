// Importação das Libs.
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native"; // Basicamente ajusta o Notch do celular 
import { RFValue } from "react-native-responsive-fontsize"; // Permite que você defina tamanhos de fonte responsivos usando um valor relativo e fazendo o cálculo com base nas dimensões da tela.

// Importação Utilities.
import Logo from '../../assets/logo.svg'
import { Car } from "../../components/Car";
import { api } from '../../services/api'
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";

// "Componentes" para serem estilizados. 
import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList
} from './styles'
import { useNavigation } from "@react-navigation/native";

export function Home() {
    const [cars, setCars] = useState<CarDTO[]>([])
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation<any>()

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car })
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/cars')
                setCars(response.data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchCars()
    }, [])


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
            {loading ? <Load /> :
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <Car data={item} onPress={() => handleCarDetails(item)} />
                    }
                />
            }

        </Container>
    )
}