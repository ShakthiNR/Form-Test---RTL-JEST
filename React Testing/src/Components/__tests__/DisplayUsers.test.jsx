import "@testing-library/jest-dom/extend-expect";
import { render,screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import DisplayUsers from "../DisplayUsers"
import { usersServer } from "../Mocks/usersServer";

const route = "/get-users"
const renderDisplayUsersComp = () => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <DisplayUsers />
      </MemoryRouter>
    );
  };
describe("Check All Elements are Rendered Correctly",()=>{
    it("Should Display Heading, Form and Submit Btn",()=>{
        renderDisplayUsersComp();
        expect(screen.getByRole("link",{name:'Go Home'})).toHaveAttribute('href', '/');
        expect(screen.getByText("CRUD - Users")).toBeInTheDocument()
        expect(screen.getByRole("textbox",{name:"Name Of The User"})).toBeInTheDocument()
        expect(screen.getByLabelText("Email Address")).toBeInTheDocument()
        expect(screen.getByRole("button",{name:"Create User"})).toBeInTheDocument()
    })

    it("Should Display Error Message in Form",async()=>{
      const user = userEvent.setup()
      renderDisplayUsersComp();

      expect(screen.queryByText("Please Enter All Input Fields")).not.toBeInTheDocument()
      const createBtn = screen.getByRole("button",{name:"Create User"})
      await user.click(createBtn)
      expect(screen.getByText("Please Enter All Input Fields")).toBeInTheDocument()


    })
})

beforeAll(() => usersServer.listen())
afterEach(() => usersServer.resetHandlers())
afterAll(() => usersServer.close())


test("Render All Users from db",async()=>{
    renderDisplayUsersComp()
    const loadingElm = await screen.findByText("Loading ....") 
    expect(loadingElm).toBeInTheDocument();

    const users = await screen.findAllByRole("listitem") 
    expect(users).toHaveLength(4);
    expect(users[0]).toHaveTextContent("kamal@g.ni")
    expect(screen.getByTestId("delete-btn-1673533980337")).toBeInTheDocument()
    expect(users[2]).toHaveTextContent("ajith@gm.com")
    expect(screen.getByTestId("delete-btn-1673533980339")).toBeInTheDocument()
 
})

test('Handles User Servers Error', async () => {
    usersServer.use(
      rest.get('http://localhost:5000/api/get/users', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )
    renderDisplayUsersComp();
    const loadingElm = await screen.findByText("Loading ....") 
    expect(loadingElm).toBeInTheDocument();
    const errorElement = await screen.findByText("Something is Wrong in Server, Get Back Later")
    expect(errorElement).toBeInTheDocument()
})
 //List of items after delete
 const usersAfterDelete =[
  {
    "username": "Kamal",
    "email": "kamal@g.ni",
    "id": 1673533980337
},
{
    "username": "Rajini",
    "email": "rajini@gmail.com",
    "id": 1673533980338
},
{
    "username": "Ajith",
    "email": "ajith@gm.com",
    "id": 1673533980339
}
]

test("Handle Delete Request",async()=>{

  const user = userEvent.setup();
 
  expect(screen.queryByText("User Deleted Successfully")).not.toBeInTheDocument()

  renderDisplayUsersComp()

  const deleteBtn = await screen.findByTestId("delete-btn-1673533980340") 
  await user.click(deleteBtn);

  const deleteMsg =  await screen.findByText("User Deleted Successfully")
  expect(deleteMsg).toBeInTheDocument()
  const listUsers =  screen.getAllByRole("listitem")
  expect(listUsers).toHaveLength(3);

 
  //Checking the list of items are present on screen
  listUsers.forEach((user,index)=>{
    const { getByText } = within(user)
      const {username,email}=  usersAfterDelete[index]
      expect(getByText(username)).toBeInTheDocument()
      expect(getByText(email)).toBeInTheDocument()
  })

  
})


//Handling Post Request
test("Handle POST Request",async()=>{
  const user = userEvent.setup();
  renderDisplayUsersComp()
  expect(screen.queryByText("User Mail Already exists")).not.toBeInTheDocument()
  expect(screen.queryByText("User Created Successfully!!")).not.toBeInTheDocument()

  
  const usernameInput = screen.getByRole("textbox",{name:"Name Of The User"})
  const emailInput = screen.getByLabelText("Email Address")
  const createUserBtn = screen.getByRole("button",{name:"Create User"})

  await user.type(usernameInput,"shakthi")
  await user.type(emailInput,"s@gmail.com")
  await user.click(createUserBtn)

  //Data after insertion
  usersAfterDelete.push({
      "username": "shakthi",
      "email": "s@gmail.com",
      "id": 4
  })
  const createResult = await screen.findByText("User Created Successfully!!")

  const listUsers =  screen.getAllByRole("listitem")
  expect(listUsers).toHaveLength(4);

  listUsers.forEach((user,index)=>{
    const { getByText } = within(user)
      const {username,email}=  usersAfterDelete[index]
      expect(getByText(username)).toBeInTheDocument()
      expect(getByText(email)).toBeInTheDocument()
  })
  

  expect(createResult).toBeInTheDocument()
  await user.clear(emailInput)
  await user.type(emailInput,"s@gmail.com")
  await user.click(createUserBtn)

  const emailError = await screen.findByText("User Mail Already exists")
  expect(emailError).toBeInTheDocument()

})