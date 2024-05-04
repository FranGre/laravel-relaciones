import H1 from "./H1"
import H2 from "./H2"
import H3 from "./H3"
import Article from "./Article"
import P from "./P"
import Callout from "./Callout"
import { CopyBlock, atomOneDark } from 'react-code-blocks'
import Highlight from "./Highlight"


export default function UseContext() {

    return (
        <>
            <H1 text='useContext()' />

            <Article>
                <div className="pb-12">
                    <P>Usado para crear <Highlight backgroundColor="bg-sky-600">estados globales simples.</Highlight></P>
                    <P>Imagina que tienes datos que quieres que estén disponibles para varios componentes y no quieres pasar esos datos a través de múltiples niveles de componentes, por props. Ahí es donde el contexto entra en juego.</P>
                </div>

                <H2 text='Pasos' />
                <H3 text='1 - Crear el contexto y el provider' />
                <div className="pb-12">
                    <P><Highlight backgroundColor="bg-sky-600">Provider</Highlight> posee toda la <Highlight backgroundColor="bg-sky-600">lógica</Highlight>, es decir, las <strong>variables</strong>, <strong>métodos para guardar, eliminar</strong> etc...</P>
                    <P>Fijaros que también hago uso de useState(), es decir que si queremos complicarlo más, podríamos usar useReducer().</P>
                    <P>En <Highlight backgroundColor="bg-sky-600">value</Highlight> añadimos todas las <Highlight backgroundColor="bg-sky-600">variables, funciones</Highlight> etc... que queramos que <strong>estén disponibles</strong> para el <strong>resto de componentes.</strong></P>
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
        // UserContext.tsx
        import { createContext, useState } from "react"

        {/* Creo el contexto */}
        const UserContext = createContext(undefined)

        {/* El provider tiene la lógica */}
        export const UserProvider = ({ children }) => {
            const [user, setUser] = useState({ id: crypto.randomUUID(), username: 'frangt', age: 22 })

            const incrementAge = () => {
                setUser({ ...user, age: ++user.age })
            }

            {/* En value, ponemos lo que todo el mundo pueda usar */}
            return (
                <UserContext.Provider value={{ user, incrementAge }}>
                    {children}
                </UserContext.Provider>
            )
        }

        export default UserContext

                       `} />
                </div>

                <H3 text='2 - Encapsular el componente superior con UserProvider' />
                <div className="pb-12">
                    <P>En mi caso, quiero que el UserProvider con su value, esté disponible para toda la app.</P>
                    <P>Por lo tanto lo encapsulo en App.tsx.</P>
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
        import './App.css'
        import { UserProvider } from './contexts/UserContext'
        import Profile from './components/Profile'

        function App() {

            return (
                <>
                    <UserProvider>
                        <Profile />
                    </UserProvider>
                </>
            )
        }

        export default App
                       `} />
                </div>

                <H3 text='3 - Usar el contexto' />
                <div className="pb-12">
                    <P>He creado un componente Profile.tsx para usar el UserProvider.</P>
                    <P>Necesito usar el hook useContext() y dentro añadir el UserContext creado en el 1er paso.</P>
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
        // Profile.tsx
        import { useContext } from "react"
        import UserContext from "../contexts/UserContext"
        
        export default function Profile() {
            {/* Me creo un contexto usando UserContext. 
            Y me traigo lo que me interese del value. */}
            const { user, incrementAge } = useContext(UserContext)
        
            return (
                <>
                    <h1>My Profile</h1>
        
                    <h2>username</h2>
                    <small>{user.username}</small>
                    <h2>Age</h2>
                    <small>{user.age}</small>
                    <button onClick={incrementAge}>Increment age</button>
                </>
            )
        }
                       `} />
                </div>

                <Callout text='useContext no es una alternativa a Zustand o Redux. useContext es usado para estados globales sencillos.' />
            </Article >
        </>
    )
}