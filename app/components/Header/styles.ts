import styled, { css } from "styled-components/native";

import { Image } from "expo-image";

const blurHash = "L184iAoffQof00ayfQay~qj[fQj[";

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 32px;
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Photo = styled(Image).attrs({
  contentFit: "cover",
  placeholder: blurHash,
})`
  width: 54px;
  height: 54px;
  border-radius: 8px;
`;

export const Greeting = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const Message = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
