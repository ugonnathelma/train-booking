import React from "react";
import Form from "./index";
import { render } from "@testing-library/react";

describe("Form", () => {
  it("should render matching the existing snapshot", () => {
    const { asFragment } = render(<Form />);
    expect(asFragment()).toMatchSnapshot();
  });
});
