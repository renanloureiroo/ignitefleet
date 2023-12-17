import styled, { css } from "styled-components/native";

export const Container = styled.ImageBackground`
  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_600};
  `}
  flex: 1;

  padding: 52px;
`;

export const Wrapper = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.BRAND_LIGHT};
    font-size: ${theme.FONT_SIZE.XXXL}px;
    line-height: 44.8px;
    margin-top: 200px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    text-align: center;
  `}
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    text-align: center;

    margin-bottom: 32px;
  `}
`;
