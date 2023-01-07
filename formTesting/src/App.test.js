/* import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
 */

import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";



//Testing the components Render
test("Render Component on Click Link", async () => {
  render(<App />, { wrapper: BrowserRouter }); //Render with Wrapper "Router"

  const user = userEvent.setup(); //setup userEvent
  expect(
    screen.getByRole("heading", { name: "app-heading" })
  ).toBeInTheDocument(); //check the App - Heading
 
  await user.click(screen.getByText(/sign in/i));
  expect(screen.getByText(/sign in form/i)).toBeInTheDocument(); //click sign in link and check the signin form heading

  
  await user.click(screen.getByText(/go home/i));
  expect(screen.getByText(/welcome, user/i)).toBeInTheDocument(); //click go back (home) link and check the home page
});

//Test Error Page Component
test("Render Bad Route Component",()=>{
  const badRoute = "/check/test/this"
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByText("Error 404, Page Not Found !!!"))
  .toBeInTheDocument()
})
