import "@testing-library/jest-dom/extend-expect";
import { getAllByRole, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import DisplayTasks from "../DisplayTasks";
import { server } from "../Mocks/server"



const route = "/get-tasks";

const renderDisplayTasksComp = () => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <DisplayTasks />
    </MemoryRouter>
  );
};
describe("Test All Tags are Rendered Properly", () => {
  it("Should Display the heading", () => {
    renderDisplayTasksComp();
    const headingEl = screen.getByRole("heading", { name: "task-heading" });
    expect(headingEl).toBeInTheDocument();
  });
});




beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


//Check the render using MSW lib
test("Render List Of Tasks - API Get Call", async () => {
  renderDisplayTasksComp();
  const loadingElm = await screen.findByText(/loading \.\.\.\./i) //check for loading
  expect(loadingElm).toBeInTheDocument();
 
  const tasks = await screen.findAllByRole("listitem") // find single card
  expect(tasks).toHaveLength(3);
  expect(tasks[0]).toHaveTextContent('Id - 1User Id - 1Title - delectus aut autemStatus - False')
  expect(tasks[1]).toHaveTextContent("Id - 2User Id - 1Title - quis ut nam facilis et officia quiStatus - False")
});



//Check the Errors
test('Handles server error', async () => {
  server.use(
    rest.get('https://jsonplaceholder.typicode.com/todos/', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )
  renderDisplayTasksComp();
  const errorElement = await screen.findByText(/something is wrong in server, get back later/i)
  expect(errorElement).toBeInTheDocument()
})