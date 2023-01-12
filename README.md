# Testing React Application 🔧
    Below Article Prepared By Shakthi N R

## Library : (Inbuilt with npx create-react-app myapp)
1. RTL - React Testing Library
2. JEST, Jest DOM

```
Unit Testing Each Component:

                  ________ Testing Component ____________
                 | 1. render() //create DOM             |
<Component/> ----> 2. getElement() by Role/LabelText... | ---> Result :  Pass/Fail
    fn()         | 3. expect() //assertion              |
                 |______________________________________|

```
## How to write Test File
```
1. filename.test.jsx (or)
2. filename.setup.jsx
- Note: Keep 1/2 in __test__ folder
```
## What is Test Block ?
```
1. test(name,callback) (or) it(name,callback)
2. We can group test/it using describe(name,callback) block
3. Nested describe is allowed
- Note: Avoid Writing Nested Test block
``` 

## How to Render Component
   - render(<Component>) --> It Creates Virtual Dom
```JavaScript 
1. render(<DisplayUsers />)
2. If react-router-dom V6 
    const route = "/get-users"
    const renderDisplayUsersComp = () => {
        return render(
        <MemoryRouter initialEntries={[route]}>
            <DisplayUsers />
        </MemoryRouter>
        );
    };
renderDisplayUsersComp() //Render Component
```


## How to getElement from Component

``` JavaScript
1. First Preference :- getByRole() / getAllByRole()
   Least Preference :- getByTestId()
2. getAllByRole() // To get element more than one
3. getByRole("button",{name:"submit"}) // To Get Specific Button
   getByRole("button",{name:/submit/i}) // Reg Ex in option
4. Others : getByLabelText(), getByPlaceholder(), getByText()
5. Refer : https://github.com/testing-library/jest-dom#tohavevalue

Note:
 1. getByRole() //can't have null value
 2. queryByRole() //can have null, while using not.toBeInTheDocument() use this
 3. findByRole() //use if await keyword used
```


## Assertion after getElement()

```JavaScript
expect(resultElement).toBe(5)
expect(resultElement).toBeInTheDocument()
expect(resultElement).toHaveLength()
expect(resultElement).toHaveTextContent()
```
Ref : [click_here](https://github.com/testing-library/jest-dom)

## Event Handling
```
- Use userEvent from RTL
- Update with Version 14
- test block's callback should be async
- Add "const user = userEvent.setup()" in first line of test
```
```JavaScript
1. onChange: await user.type(btnElement,value)
2. onClick: await user.click(btnElement)
3. doubleClick: await user.dblClick(btnElement)
```

## For Handling API Request Use
```
1. MSW() - Recommend library by RTL
2. Create mockServer and handler
3. listen,reset,close the server after all the request
```

## How to Run Test

```JavaScript
1. npm start
2. npm run start
```
```
while running,
 - Press - a = To Run all Test Cases
 - Press - i = To Run failed Test Cases