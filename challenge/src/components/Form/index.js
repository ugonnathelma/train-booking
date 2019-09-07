import React, { useState } from "react";
import moment from "moment";
import ConfirmPage from "./ConfirmPage";
import {
  RadioButton,
  Container,
  Space,
  FormWrap,
  Flex,
  SeatSection,
  Seat,
  Button,
  TextField,
  Label,
  FlexChild,
  LeftPanel,
  RightPanel,
  Hr
} from "./style";
import { firstClassSeats, secondClassSeats } from "./utils";

let timerRef;

const startTimer = (setTimer, cancelBooking, minutes, seconds) => {
  timerRef = setInterval(() => {
    if (seconds === 0) {
      minutes = minutes - 1;
      seconds = 59;
    } else {
      seconds = seconds - 1;
    }
    if (seconds === 0 && minutes === 0) {
      stopTimer();
      cancelBooking();
    }
    setTimer({ minutes, seconds });
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerRef);
};

const Form = () => {
  const [selectedClass, selectClass] = useState(1);
  const [selectedSeat, selectSeat] = useState(null);
  const [showConfirmPage, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cancelled, setCancel] = useState(false);
  const [timer, setTimer] = useState({
    minutes: 3,
    seconds: 0
  });

  const [passengerDetails, setPassengerDetails] = useState({
    firstName: "",
    lastName: "",
    date: moment().format("YYYY-MM-DD"),
    time: null
  });

  const isFirstClass = selectedClass === 1;

  const seats = isFirstClass ? firstClassSeats : secondClassSeats;

  const { firstName, lastName, date, time } = passengerDetails;

  const checkInButtonDisabled = !(
    selectedClass &&
    selectedSeat &&
    firstName.length &&
    lastName.length &&
    date &&
    time
  );

  const setInput = (value, key) =>
    setPassengerDetails({ ...passengerDetails, [key]: value });

  const cancelBooking = () => {
    setCancel(true);
    setTimer({
      minutes: 3,
      seconds: 0
    });
  };
  const reset = () => {
    setCancel(false);
    setSuccess(false);
    setShowConfirm(false);
    selectSeat(null);
    selectClass(1);
    setTimer({
      minutes: 3,
      seconds: 0
    });

    setPassengerDetails({
      firstName: "",
      lastName: "",
      date: moment().format("YYYY-MM-DD"),
      time: null
    });
  };

  return (
    <Container>
      <LeftPanel slideRight={showConfirmPage}>
        <h2>Train trip booking</h2>
        <Hr></Hr>
        <Space vertical="2em" />
        {!showConfirmPage && (
          <FormWrap>
            <Flex>
              <label>available:</label> <Seat available={true} small></Seat>{" "}
              <label>taken:</label>
              <Seat small></Seat>
            </Flex>
            <Space vertical="2em" />
            <Label>Please choose a class</Label>
            <Space vertical="1em" />
            <Flex>
              <RadioButton
                readOnly
                type="radio"
                name="class"
                value="first"
                checked={isFirstClass}
                onClick={() => selectClass(1)}
              />{" "}
              First Class
              <Space horizontal="2em" />
              <RadioButton
                readOnly
                type="radio"
                name="class"
                value="second"
                checked={!isFirstClass}
                onClick={() => selectClass(2)}
              />{" "}
              Second Class
            </Flex>
            {Object.keys(seats).map(carriage => (
              <div key={carriage}>
                <Space vertical="1em" />
                <Label>Carriage:</Label> {carriage.toUpperCase()}
                <SeatSection>
                  {seats[carriage].map(seat => (
                    <Seat
                      key={seat.number}
                      available={seat.available}
                      active={
                        selectedSeat === carriage.toUpperCase() + seat.number
                      }
                      onClick={() =>
                        seat.available &&
                        selectSeat(carriage.toUpperCase() + seat.number)
                      }
                    >
                      {seat.number}
                    </Seat>
                  ))}
                </SeatSection>
              </div>
            ))}
            <Flex inputs>
              <FlexChild>
                <Label htmlFor="firstName">First Name</Label>{" "}
                <TextField
                  id="firstName"
                  value={firstName}
                  onChange={event => setInput(event.target.value, "firstName")}
                />
              </FlexChild>
              <Space vertical="1em" horizontal="3em" />
              <FlexChild>
                <Label htmlFor="lastName">Last Name</Label>
                <TextField
                  id="lastName"
                  value={lastName}
                  onChange={event => setInput(event.target.value, "lastName")}
                />
              </FlexChild>
            </Flex>
            <Space vertical="1em" />
            <Flex inputs>
              <FlexChild>
                <Label htmlFor="travelDate">Travel Date</Label>
                <TextField
                  id="travelDate"
                  value={date}
                  type="date"
                  onChange={event => setInput(event.target.value, "date")}
                />
              </FlexChild>
              <Space vertical="1em" horizontal="3em" />
              <FlexChild>
                <Label htmlFor="travelTime">Travel Time</Label>
                <TextField
                  id="travelTime"
                  value={time}
                  type="time"
                  onChange={event => setInput(event.target.value, "time")}
                />
              </FlexChild>
            </Flex>
            <Space vertical="1em" />
            <Button
              disabled={checkInButtonDisabled}
              onClick={() => {
                startTimer(
                  setTimer,
                  cancelBooking,
                  timer.minutes,
                  timer.seconds
                );
                !checkInButtonDisabled && setShowConfirm(true);
              }}
            >
              Check in
            </Button>
          </FormWrap>
        )}{" "}
        <div>
          {showConfirmPage && !cancelled && !success ? (
            <ConfirmPage
              selectedClass={selectedClass === 1 ? "First" : "Second"}
              selectedSeat={selectedSeat}
              {...passengerDetails}
              currentTimeLeft={`${timer.minutes}:${(timer.seconds < 10
                ? "0"
                : "") + timer.seconds}`}
              stopTimer={stopTimer}
              bookingSuccess={setSuccess}
              cancelBooking={cancelBooking}
              price={selectedClass === 1 ? "€150" : "€65"}
            />
          ) : (
            success &&
            !cancelled && (
              <div>
                <Label success>Reservation is successful</Label>
                <Space vertical="1em" />
                <Button onClick={() => cancelBooking()}>Cancel</Button>
              </div>
            )
          )}
          {cancelled && (
            <div>
              <Label>Reservation is cancelled</Label>
              <Space vertical="1em" />
              <Button width="7em" onClick={() => reset()}>
                Back
              </Button>
            </div>
          )}
        </div>
      </LeftPanel>
      <RightPanel slideLeft={showConfirmPage}></RightPanel>
    </Container>
  );
};

export default Form;
