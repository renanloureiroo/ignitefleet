import styled, { css } from "styled-components/native";

import {
  Container as ContainerComponent,
  Label as LabelComponent,
} from "../LicensePlateInput/styles";
import { TextInput } from "react-native";

export const Container = styled(ContainerComponent)`
  height: 150px;
`;

export const Label = styled(LabelComponent)``;

export const Input = styled(TextInput)`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}

  margin-top: 16px;
  text-align: left;
  vertical-align: top;
`;
