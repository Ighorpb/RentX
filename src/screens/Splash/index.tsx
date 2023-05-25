import React, { useEffect } from "react";
import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'
import * as SplashScreen from "expo-splash-screen";


import
Animated,
{
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Extrapolate,
    runOnJS

} from "react-native-reanimated";


import { Container } from "../Splash/styles";
import { useNavigation } from "@react-navigation/native";


export function Splash() {
    const slashAnimation = useSharedValue(0);
    const navigation = useNavigation<any>()

    const brandStyled = useAnimatedStyle(() => {
        return {
            opacity: interpolate(slashAnimation.value, [0, 50], [1, 0],),
            transform: [
                {
                    translateX: interpolate(slashAnimation.value,
                        [0, 50],
                        [0, -50],
                        Extrapolate.CLAMP
                    ),
                }
            ]
        }

    });


    const logoStyled = useAnimatedStyle(() => {
        return {
            opacity: interpolate(slashAnimation.value, [0, 50], [0, 1]),
            transform: [
                {
                    translateX: interpolate(slashAnimation.value,
                        [0, 50],
                        [-50, 0],
                        Extrapolate.CLAMP
                    ),
                }
            ]
        }

    });

    function startApp() {
        navigation.navigate('Home')
    }

    async function hideSplash() {
        await SplashScreen.hideAsync()
    }

    useEffect(() => {
        hideSplash();
        slashAnimation.value = withTiming(
            50,
            { duration: 1000 },
            () => {
                'worklet'
                runOnJS(startApp)()

            }
        );
    }, [])

    return (
        <Container style={{ backgroundColor: 'white' }}>
            <Animated.View style={[brandStyled, { position: 'absolute',  }]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={[logoStyled, { position: 'absolute',  }]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
        </Container>
    )
}

