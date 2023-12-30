import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_800};
  `}
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 32px;
  margin-top: 16px;
`;
