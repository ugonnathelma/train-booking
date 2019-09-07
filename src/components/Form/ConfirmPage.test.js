import React from "react";
import ConfirmPage from "./ConfirmPage";
import { render, fireEvent } from "@testing-library/react";

describe("ConfirmPage", () => {
  const selectedSeat = 12;
  const selectedClass = 2;
  const firstName = "Tom";
  const lastName = "Riddle";
  const date = new Date("1/2/2019").getDate();
  const time = new Date("1/2/2019").getTime();
  const price = "$12";
  const currentTimeLeft = "3:12";
  const stopTimer = () => {};
  const bookingSuccess = () => {};
  const cancelBooking = () => {};

  it("should render matching the existing snapshot", () => {
    const { asFragment } = render(
      <ConfirmPage
        selectedClass={selectedClass}
        selectedSeat={selectedSeat}
        firstName={firstName}
        lastName={lastName}
        date={date}
        time={time}
        price={price}
        currentTimeLeft={currentTimeLeft}
        stopTimer={stopTimer}
        bookingSuccess={bookingSuccess}
        cancelBooking={cancelBooking}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call cancelBooking when the cancel button is clicked", () => {
    const cancelStub = jest.fn();

    const { getByText, getByTestId } = render(
      <ConfirmPage
        selectedClass={selectedClass}
        selectedSeat={selectedSeat}
        firstName={firstName}
        lastName={lastName}
        date={date}
        time={time}
        price={price}
        currentTimeLeft={currentTimeLeft}
        stopTimer={stopTimer}
        bookingSuccess={bookingSuccess}
        cancelBooking={cancelStub}
      />
    );

    fireEvent.click(getByTestId("cancel"));

    expect(cancelStub).toHaveBeenCalled();
  });

  it("should call stopTimer and bookingSuccess when the pay button is clicked", () => {
    const stopTimerStub = jest.fn();
    const bookingSuccessStub = jest.fn();

    const { getByTestId } = render(
      <ConfirmPage
        selectedClass={selectedClass}
        selectedSeat={selectedSeat}
        firstName={firstName}
        lastName={lastName}
        date={date}
        time={time}
        price={price}
        currentTimeLeft={currentTimeLeft}
        stopTimer={stopTimerStub}
        bookingSuccess={bookingSuccessStub}
        cancelBooking={cancelBooking}
      />
    );

    fireEvent.click(getByTestId("pay"));

    expect(stopTimerStub).toHaveBeenCalled();
    expect(bookingSuccessStub).toHaveBeenCalled();
  });
});
