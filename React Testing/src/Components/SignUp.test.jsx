import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./SignUp";

const route = "/sign-in";

const renderSignUpComponent = () => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <SignUp />
    </MemoryRouter>
  );
};


//Nested Test -1
describe("Test Whether All Tags are Rendered in Sign Up Components", () => {

  //Test -1
  test("Render Form Heading", () => {
    renderSignUpComponent();
    expect(screen.getByText(/sign - up form/i)).toBeInTheDocument();
  });

  //Test -2
  test("Render Input Boxes and Submit Button", () => {
    renderSignUpComponent();
    expect(screen.getByRole("textbox", { name: "Enter User Email Address" })).toBeInTheDocument();
    expect(screen.getByLabelText("Enter Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Enter Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
  });
});

//Nested Test -2
describe("Test Errors While Handling Forms", () => {

  //Test -3
  test("Render Error When Clicked With Null Values", async () => {
    const user = userEvent.setup();
    renderSignUpComponent();

    const submitButton = screen.getByRole("button", { name: "Sign Up" })
    const emailInput = screen.getByRole("textbox", { name: "Enter User Email Address" })
    const passwordInput = screen.getByLabelText("Enter Password")

    //All Field are empty Values 
    await user.click(submitButton);
    expect(screen.getByText(`Please Enter User's Email Address`)).toBeInTheDocument();

    //Only Email is entered
    await user.type(emailInput,"s@g.in")
    await user.click(submitButton);
    expect(screen.getByText(`Please Enter Password`)).toBeInTheDocument();

    //Only Email,Password is entered
    await user.type(passwordInput,"12345")
    await user.click(submitButton);
    expect(screen.getByText(`Please Enter Confirm Password`)).toBeInTheDocument();
  });

  //Test -4
  test("Render Invalid Email Error", async () => {
    const user = userEvent.setup();
    renderSignUpComponent();

    const errorElement =screen.queryByText(`Please Enter Valid Email Address`)
    expect(errorElement).not.toBeInTheDocument()
    
    const emailInput = screen.getByRole("textbox", { name: "Enter User Email Address" })
    const submitButton = screen.getByRole("button", { name: "Sign Up" })

    await user.type(emailInput, "shakthitest");
    await user.click(submitButton);

    expect(screen.getByText(`Please Enter Valid Email Address`)).toBeInTheDocument()
  });

  //Test -5
  test("Render Password Length Error",async()=>{
    const user = userEvent.setup();
    renderSignUpComponent();
    const submitButton = screen.getByRole("button", { name: "Sign Up" })
    const emailInput = screen.getByRole("textbox", { name: "Enter User Email Address" })
    const passwordInput = screen.getByLabelText("Enter Password")

    await user.type(emailInput,"s@g.in")
    await user.type(passwordInput,"15r")
    await user.click(submitButton);
    expect(screen.getByText(`Please Enter Password with more than 5 Characters`)).toBeInTheDocument();

  })

  //Test -6
  test("Render Password Mismatch Error",async()=>{
    const user = userEvent.setup();
    renderSignUpComponent();
    const submitButton = screen.getByRole("button", { name: "Sign Up" })
    const emailInput = screen.getByRole("textbox", { name: "Enter User Email Address" })
    const passwordInput = screen.getByLabelText("Enter Password")
    const confirmPasswordInput = screen.getByLabelText("Enter Confirm Password")

    await user.type(emailInput,"s@g.in")
    await user.type(passwordInput,"12345")
    await user.type(confirmPasswordInput,"1234")
    await user.click(submitButton)
    expect(screen.getByText(`Passwords are Not Matched!!!`)).toBeInTheDocument();

  })
  
});
