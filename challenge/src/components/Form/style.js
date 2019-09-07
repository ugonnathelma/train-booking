import styled from "styled-components";
import TrainPic from "../../images/train.jpg";

const theme = {
  primaryColor: "#c44569",
  tintColor: "#cf6a87",
  selectColor: "#2980b9",
  grey: "gainsboro"
};

export const RadioButton = styled.input`
  cursor: pointer;
`;

export const Container = styled.section`
  display: flex;
  ${({ column }) => column && `flex-direction: column`};
  width: 100%;
  height: 100vh;

  * {
    box-sizing: border-box;
  }
`;

export const LeftPanel = styled.section`
  flex: 1;
  padding: 2em;
`;

export const RightPanel = styled.section`
  flex: 1;
  background: url("${TrainPic}");
  background-size:cover;
  background-repeat:no-repeat;
`;

export const FormWrap = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;

  h2 {
    margin: 0;
  }
`;

export const Flex = styled.section`
  display: flex;
  align-items: center;
  ${({ column }) => column && `flex-direction: column`};

  ${({ inputs }) =>
    inputs &&
    `
  @media (max-width: 500px) {
    flex-direction: column !important;
    align-items: flex-start;

    ${FlexChild} {
      flex:1
    }
  }`};
`;

export const FlexChild = styled.section`
  flex: ${({ flex }) => (flex ? flex : 1)};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Space = styled.div`
  ${({ horizontal }) => horizontal && `width: ${horizontal}`};
  ${({ vertical }) => vertical && `height: ${vertical}`}
`;

export const Seat = styled.div`
  background: ${({ available }) =>
    available ? theme.selectColor : theme.grey};
  width: 2em;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1em;
  cursor: pointer;

  ${({ active, small }) =>
    active &&
    !small &&
    `box-shadow:inset 0px 0px 0px 3px ${theme.primaryColor}`};
  ${({ small }) =>
    small &&
    `width: 1em;
  height: 1em;`};

  ${({ available }) => available && "color:white"};
`;

export const SeatSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  background: ${({ disabled }) => (disabled ? theme.grey : theme.primaryColor)};
  color: white;
  padding: 1em;
  outline: none;
  border: none;
  max-width: 20em;
  cursor: pointer;
  ${({ width }) => width && `width:${width}`};

  transition: background 0.3s;

  &:hover {
    background: ${({ disabled }) => (disabled ? theme.grey : theme.tintColor)};
  }
`;

export const TextField = styled.input`
  padding: 0.7em;
  border: 1px solid gainsboro;
  outline: none;
  font-size: 14px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

export const Hr = styled.div`
  border-bottom: 1px solid ${theme.grey};
`;

export const Detail = styled.label`
  font-size: ${({ small }) => (small ? "18px" : "45px")};
  color: ${theme.selectColor};

  ${({ time }) =>
    time &&
    `
  
  `};
`;
