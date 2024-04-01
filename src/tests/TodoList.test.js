import { render, screen } from "@testing-library/react"
import TodoList from "../components/TodoList"
import userEvent from "@testing-library/user-event"

describe("Testando TodoList.js", () => {
    test("renderiza título", () =>{
        render(<TodoList/>)
        const title = screen.getByText("Todo List")
        expect(title).toBeInTheDocument()

        const input = screen.getByPlaceholderText(/enter a todo/i)
        expect(input).toBeInTheDocument()
    })

    test("permite digitação no input", async () =>{
        const user = userEvent.setup()

        render(<TodoList/>)

        const input = screen.getByPlaceholderText(/enter a todo/i)
        await user.type(input, "lavar louça")
        expect(input).toHaveValue("lavar louça")
        await user.type(input, "(ENTER)")
        expect(input).toBeInTheDocument("")
    })

    test("permite digitação no input", async () =>{
        const user = userEvent.setup()

        render(<TodoList/>)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "lavar louça{enter}")
        expect(input).toHaveValue("")

        const todo = screen.getByText("lavar louça") 
        expect(todo).toBeInTheDocument("")
    })

    test("permite digitação no input", async () =>{
        const user = userEvent.setup()

        render(<TodoList/>)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "lavar louça{enter}")
        const toggleBnt = screen.getByText(/toggle/i)
        await user.click(toggleBnt)
        const todo = screen.getByText(/lavar louça/i)
        expect(todo).toHaveStyle({
            TextDecoration: "line-through"
        })
    })

    test("permite digitação no input", async () =>{
        const user = userEvent.setup()

        render(<TodoList/>)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "lavar louça{enter}")
        const deleteBtn = screen.getByText(/toggle/i)
        await user.click(deleteBtn)

        const todo = screen.queryByText(/lavar louça/i)
        expect(todo).toBeNull()
    })


    test("não permite dar enter sem nada na barra", async () =>{
        const user = userEvent.setup()

        render(<TodoList/>)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, " {enter}")
        const todo = screen.queryByText(/lavar louça/i)
        expect(todo).toBeNull()
    })
})

//Renderiza
// Seleciona
//interage
//Asserções