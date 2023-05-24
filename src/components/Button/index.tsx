import React from "react";
import { ActivityIndicator } from "react-native";

import {
    Container,
    Title,

} from "./styles";
import theme from "../../global/styles/theme";

interface Props {
    title: string;
    color?: string;
    onPress: () => void;
    enabled?: boolean;
    loading?: boolean;
}

export function Button({
    title,
    color,
    onPress,
    enabled = true,
    loading = false

}: Props) {
    return (
        <Container
            color={color ? color : theme.colors.main}
            onPress={onPress}
            enabled={enabled}
            style={{ opacity: (enabled === false || loading === true) ? .5 : 1 }}
        >

            {
            loading 
            ? <ActivityIndicator color={theme.colors.shape} />
            : <Title>{title}</Title>
            }
        </Container>
    )
}