import H1 from "./H1"
import H2 from "./H2"
import H3 from "./H3"
import Article from "./Article"
import P from "./P"
import Callout from "./Callout"
import { CopyBlock, atomOneDark } from 'react-code-blocks'
import Highlight from "./Highlight"


export default function UseReducer() {

    return (
        <>
            <H1 text='useReducer()' />

            <Article >
                <div className="pb-12">
                    <P>Permite manejar estados de una forma más avanzada que useState, es especialmente útil cuando tienes <Highlight backgroundColor="bg-sky-600">estados complejos</Highlight> o cuando necesitas realizar acciones más sofisticadas sobre tu estado.</P>
                </div>

                <H2 text='Parámetros' />
                <div className="pb-12">
                    <P>reducer - <Highlight backgroundColor="bg-sky-600">funciones</Highlight> de nuestro estado</P>
                    <P>initalState - <Highlight backgroundColor="bg-sky-600">datos iniciales</Highlight> de nuestro estado</P>
                </div>

                <H3 text='reducer' />
                <div className="">
                    <P>state - los <strong>datos actuales</strong> del estado</P>
                    <P>action - los <strong>datos que me envian</strong></P>
                </div>

                <div className="pb-12">
                    <Callout text='Usamos dispatch para poder llamar a los métodos de reducer' />
                </div>

                <H2 text='Ejemplo' />
                <div className="pb-12">
                    <P>Es una simple lista de tareas.</P>
                </div>

                <H3 text='Funcionalidades' />
                <div>
                    <P><strong>Añadir</strong> una tarea mediante el formulario.</P>
                    <P><strong>Cambiar el estado</strong> de la tarea al hacer click en ella.</P>
                    <P><strong>Eliminar</strong> la tarea al hacer click en X.</P>

                    <CopyBlock
                        customStyle={{
                            marginTop: '25px',
                            overflowY: 'scroll',
                            borderRadius: '15px',
                        }}
                        codeBlock={true}
                        language='tsx'
                        showLineNumbers={false}
                        theme={atomOneDark}
                        text={`
        // App.tsx
        import { useReducer, useState } from 'react'
        import './App.css'

        function App() {

            {/* En reducer va toda la lógica, save, remove etc...
            Es decir las "funciones", aunque aquí son condiciones.
            Es válido if o switch*/}

            const reducer = (state, action) => {
                if (action.type === 'SAVE') {
                    const todo = action.payload.todo
                    return [...state, todo]
                }

                if (action.type === 'CHANGE_STATUS') {
                    const id = action.payload.id
                    const todos = state.map(todo => {
                        if (todo.id === id) return { ...todo, isDone: !todo.isDone }
                        return todo
                    })

                    return [...todos]
                }

                if (action.type === 'REMOVE') {
                    const id = action.payload.id
                    const todos = state.filter(todo => todo.id !== id)
                    return [...todos]
                }

                return state
            }

            const initialState = [
                { id: crypto.randomUUID(), title: 'Levantarse de la cama', isDone: true },
                { id: crypto.randomUUID(), title: 'Hacer la cama', isDone: false },
                { id: crypto.randomUUID(), title: 'Almorzar', isDone: false },
                { id: crypto.randomUUID(), title: 'Hacer tareas', isDone: true },
            ]

            let [todos, dispatch] = useReducer(reducer, initialState)
            const [title, setTitle] = useState<string>()

            function save() {
                const todo = { id: crypto.randomUUID(), title: title, isDone: false }
                {/* dispatch, es el action del reducer.
                dispatch recibe {} con dos propiedades:
                - type -> if a llamar del reducer 
                - payload -> info a enviar*/}
                dispatch({ type: 'SAVE', payload: { todo } })
            }

            return (
                <>
                    <label htmlFor="name">Name</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} />
                    <button onClick={save}>Save</button>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map(todo =>
                                <tr key={todo.id} onClick={() => dispatch({ 
                                    type: 'CHANGE_STATUS', payload: { id: todo.id } })}>
                                    <td>{todo.id}</td>
                                    <td>{todo.title}</td>
                                    <td>{todo.isDone ? 'done' : 'pending'}</td>
                                    <td>
                                        <button onClick={() => dispatch({ 
                                            type: 'REMOVE', payload: { id: todo.id } })}>X
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )
        }

        export default App
                       `} />
                </div>
            </Article>
        </>
    )
}