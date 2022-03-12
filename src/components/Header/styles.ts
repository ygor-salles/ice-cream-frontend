import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 24px;

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const Image = styled.img`
  height: 72px;
`;
