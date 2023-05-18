import React from "react";
import { 
    Container,
    ImageIndexes,
    ImageIndex,
    CarImageWrapper,
    CarImage,
} from "./styles";

interface Props {
    imageUrl: string[];
}

export function ImageSlider({imageUrl}: Props) {
    return (
        <Container>

            <ImageIndexes>
                <ImageIndex active={false} />
                <ImageIndex active={true} />
                <ImageIndex active={false} />
                <ImageIndex active={false} />
            </ImageIndexes>

            <CarImageWrapper>
                <CarImage
                    source={{ uri: 'https://cdn.sitewebmotors.com.br/uploads/userGallery/5fcfe53240728.png' }}
                    resizeMode="contain"
                />
            </CarImageWrapper>

        </Container>
    )
}