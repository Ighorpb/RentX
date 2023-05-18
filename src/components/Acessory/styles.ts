import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 109px;
  height: 92px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_primary};

  padding: 10px;
  margin-bottom: 28px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(13)}px;
`;
