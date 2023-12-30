import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  padding: 20px 16px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 6px;
  margin-bottom: 12px;
`;

export const Info = styled.View`
  flex: 1;
`;

export const LicensePlate = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;

export const Departure = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.XS}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}

  margin-bottom: 4px;
`;
