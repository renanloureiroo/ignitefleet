import { FlatList } from "react-native";
import styled, { css } from "styled-components/native";
import { HistoricCardData } from "../../components";

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_800};
  `}
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 32px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};

    margin-bottom: 12px;
  `}
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_400};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};

    margin-top: 32px;
    text-align: center;
  `}
`;

export const List = styled(FlatList as typeof FlatList<HistoricCardData>).attrs(
  {
    showsVerticalScrollIndicator: false,
  }
)`
  flex: 1;
`;
