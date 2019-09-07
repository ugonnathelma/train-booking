import React from "react";

import {
  Container,
  Space,
  Button,
  Label,
  FormWrap,
  Flex,
  Detail
} from "./style";

const ConfirmPage = ({
  selectedClass,
  selectedSeat,
  firstName,
  lastName,
  date,
  time,
  price,
  currentTimeLeft,
  stopTimer,
  bookingSuccess,
  cancelBooking
}) => {
  return (
    <Container column>
      <FormWrap>
        <Label>Time left to pay:</Label> <Detail time>{currentTimeLeft}</Detail>
        <Space vertical="0.8em" />
        <Label>Class:</Label> <Detail small>{selectedClass}</Detail>
        <Space vertical="0.8em" />
        <Label>Seat:</Label>
        <Detail small>{selectedSeat}</Detail>
        <Space vertical="0.8em" />
        <Label>Passenger Name:</Label>{" "}
        <Detail small>{`${firstName} ${lastName}`}</Detail>
        <Space vertical="0.8em" />
        <Label>Travel Date:</Label> <Detail small>{date}</Detail>
        <Space vertical="0.8em" />
        <Label>Travel Time:</Label> <Detail small>{time}</Detail>
        <Space vertical="0.8em" />
        <Label>Price:</Label> <Detail small>{price}</Detail>
        <Space vertical="1.5em" />
        <Flex>
          <Button
            width="10em"
            onClick={() => {
              stopTimer();
              bookingSuccess(true);
            }}
          >
            Pay
          </Button>
          <Space horizontal="1.5em" />
          <Button width="10em" onClick={() => cancelBooking()}>
            Cancel
          </Button>
        </Flex>
      </FormWrap>
    </Container>
  );
};

export default ConfirmPage;
