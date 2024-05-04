import { CopyBlock, atomOneDark } from 'react-code-blocks'
import H1 from './H1'
import H2 from './H2'
import Article from './Article'
import P from './P'
import Highlight from './Highlight'

export default function UseState() {
    return (
        <>
            <H1 text='useState()' />
            <Article>
                <div className="pb-12">
                    <P>Usado para que el cliente que pueda ver los nuevos cambios del estado o variable en tiempo real</P>
                    <P>Cabe destacar que useState es usado para <Highlight backgroundColor='bg-sky-600'>estados / variables simples.</Highlight></P>
                </div>

                <H2 text='Ejemplo' />
                <div>
                    <P>Funciona devolviendo un <Highlight backgroundColor='bg-sky-600'>arreglo con dos elementos:</Highlight> el estado actual y una función para actualizar ese estado.</P>
                    <P>Por ejemplo, puedes usar useState para crear una variable de estado llamada count que comienza en 0.</P>
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
        import { useState } from 'react'

        function App() {

            // Declaramos una variable de estado llamada 'count' con valor inicial 0
            const [count, setCount] = useState(0);

            // 'count' guarda el estado actual
            // 'setCount' es una función para actualizar 'count' y re-renderizar el componente

            return (
                <div>
                    <p>You clicked {count} times</p>
                    {/* Cuando se hace clic en el botón, se actualiza 'count' */}
                    <button onClick={() => setCount(count + 1)}>
                    Click me
                    </button>
                </div>
            )
        }

        export default App
                        `} />
                </div>
            </Article >
        </>
    )
} 