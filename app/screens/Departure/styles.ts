import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_800};
  `}
  flex: 1;
`;
export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
  padding: 32px;
  margin-top: 16px;
  gap: 16px;
`;

export const Message = styled.Text`
  ${({ theme }) => css`
    font-size: 16px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    text-align: center;
    margin-top: 24px;
  `}
`;
