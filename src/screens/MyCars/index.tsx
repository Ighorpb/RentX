import React, { useEffect, useState } from 'react'
import { FlatList, StatusBar } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentTitle,
    AppointmentQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles'

import { Car } from '../../components/Car'
import { CarDTO } from '../../dtos/CarDTO'
import { Load } from '../../components/Load'
import { api } from '../../services/api'
import { BackButton } from '../../components/BackButton'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'

interface CarProps {
    car: CarDTO;
    id: string;
    user_id: string;
    startDate: string,
    endDate: string
}

export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([])
    const [loanding, setLoanding] = useState(true)

    const navigation = useNavigation()
    const theme = useTheme()

    function handleBack() {
        navigation.goBack()
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/schedules_byuser?user_id=1')
                setCars(response.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoanding(false)
            }
        }

        fetchCars()
    }, [])

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton
                    onPress={handleBack}
                    color={theme.colors.shape}
                    
                />
                <Title>
                    Seus agendamentos, {'\n'}
                    estão aqui.
                </Title>

                <SubTitle>
                    Conforto, segurança e praticidade.
                </SubTitle>
            </Header>
            {loanding ? <Load /> :
                <Content>
                    <Appointments>
                        <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
                        <AppointmentQuantity>{cars.length}</AppointmentQuantity>
                    </Appointments>

                    <FlatList
                        data={cars}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign
                                            name='arrowright'
                                            size={20}
                                            color={theme.colors.title}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )}
                    />
                </Content>
            }
        </Container>
    )
}