import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SignIn from ".././SignIn";

const route = "/sign-in"; //Path Route

//render the comp inside memoryRouter
const renderSignInComponent = () => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <SignIn />
    </MemoryRouter>
  );
};

//Nested Test -1
describe("Check Whether All Tags are Rendered in Sign In Components", () => {

  //Test - 1
  test("Render heading", () => {
    renderSignInComponent(); //Render Component
    expect(screen.getByRole("heading", { name: "form-heading" })).toBeInTheDocument();
  });

  //Test - 2
  test("Render Input Box and Submit Button", () => {
    renderSignInComponent();
    expect(screen.getByRole("textbox", { name: "email" })).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });
});

//Nested Test -2
describe("Check Errors while Handling Sign In Forms", () => {
  
  //Test -3 
  test("Render Email and Password Error", async () => {
    const user = userEvent.setup();
    renderSignInComponent();

    const ErrorElement = screen.queryByText(/please enter user's email and password/i); //Query By: Can Have Null
    expect(ErrorElement).not.toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    await user.click(submitButton);
    const ErrorElementAfterClick = screen.queryByText(/please enter user's email and password/i);
    expect(ErrorElementAfterClick).toBeInTheDocument();
  });

  //Test-3
  test("Render Valid Email Error", async () => {
    const user = userEvent.setup();
    renderSignInComponent();

    const emailErrorElement = screen.queryByText("Please Enter Valid Email-Address");
    expect(emailErrorElement).not.toBeInTheDocument();

    const emailInput = screen.getByRole("textbox", { name: "email" });
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "ShakthiTesting");
    await user.click(submitButton);
    const emailErrorAfterClick = screen.getByText(/please enter valid email-address/i);
    expect(emailErrorAfterClick).toBeInTheDocument();
  });

  //Test-4
  test("Render Password Error", async () => {
    const user = userEvent.setup();
   
    renderSignInComponent();

    const errorElement = screen.queryByText("Please Enter User's Password");
    expect(errorElement).not.toBeInTheDocument();

    const emailInput = screen.getByRole("textbox", { name: "email" });
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "shakthi@gm.com");
    await user.click(submitButton);

    const errorElementAfter = screen.getByText("Please Enter User's Password");
    expect(errorElementAfter).toBeInTheDocument();
  });
});
