// Importação das Libs.
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native"; 
import { RFValue } from "react-native-responsive-fontsize"; 
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";


// Importação Utilities.
import Logo from '../../assets/logo.svg'
import { Car } from "../../components/Car";
import { api } from '../../services/api'
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";
import {Ionicons} from '@expo/vector-icons'

// "Componentes" para serem estilizados. 
import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
    MyCarsButton
} from './styles'

export function Home() {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<any>();
    const theme = useTheme();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car })
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars')
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
            <MyCarsButton onPress={handleOpenMyCars}>
            <Ionicons 
            name= "ios-car-sport" 
            size={32}
            color={theme.colors.shape}

            />
        </MyCarsButton>
        </Container>
    )
}