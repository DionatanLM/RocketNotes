import styled from "styled-components";

export const Container = styled.button`
  width: 100%;
  background: none;
  color: ${({ theme, isActive }) => isActive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};

  border: 0;
  font-size: 16px;
  &:disabled {
    opacity: 0.5;
  }
`;
