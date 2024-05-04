import H1 from "./H1"
import H2 from "./H2"
import H3 from "./H3"
import Article from "./Article"
import P from "./P"
import Callout from "./Callout"
import { CopyBlock, atomOneDark } from 'react-code-blocks'
import Highlight from "./Highlight"


export default function UseCallback() {
    return (
        <>
            <H1 text='useCallback()' />
            <Article>
                <div className="pb-12">
                    <P>Usado para pasar <Highlight backgroundColor="bg-sky-600">funciones por parámetro a un componente hijo.</Highlight></P>
                </div>

                <H2 text='Parámetros' />
                <div className="pb-12">
                    <ul className="pl-12">
                        <li><P>función anónima - dentro metes todo el js / ts</P></li>
                        <li><P>array de dependencias</P></li>
                    </ul>
                </div>

                <H2 text='Consideraciones' />
                <div className="pb-12">
                    <P>Siempre que un componente hijo reciba funciones por parámetro, es obligatorio usar en el padre el hook useCallback(), para poder pasarle dicho método.</P>
                    <P>Estas obligado a pasar el array de dependencias, ya sea sin variables sobre las que dependa o con variables.</P>
                </div>

                <H2 text='Diferencias entre no usar y usar useCallback()' />
                <div className="pb-12">
                    <P>La diferencia principal entre usar useCallback y no usarlo radica en cómo se manejan las funciones dentro del ciclo de vida de renderizado de React, y cómo eso afecta el rendimiento de la aplicación.</P>
                </div>

                <H3 text='Sin usar useCallback()' />
                <div className="pb-12">
                    <P>Cada vez que el componente padre se renderiza, las funciones dentro de él se crean nuevamente.
                        Esto significa que, incluso si las funciones son idénticas entre renderizados,
                        React las considerará como funciones diferentes.
                        Por lo tanto, cuando pasas estas <Highlight backgroundColor="bg-sky-600">funciones como props
                            a componentes hijos</Highlight>, esos componentes se
                        <Highlight backgroundColor="bg-sky-600">vuelven a renderizar innecesariamente</Highlight>,
                        incluso si su lógica interna no ha cambiado.</P>
                </div>

                <H3 text='Usando useCallback()' />
                <div className="pb-12">
                    <P>Estás diciendo a React que "memorice" la función y la mantenga igual entre renderizados,
                        a menos que sus dependencias cambien. Esto significa que React solo reevaluará y
                        recreará la función cuando alguna de sus dependencias cambie. En la mayoría de
                        los casos, esto conduce a un <Highlight backgroundColor="bg-sky-600">rendimiento más eficiente</Highlight>,
                        ya que <Highlight backgroundColor="bg-sky-600">evita renderizados innecesarios</Highlight>
                        de componentes hijos que dependen de estas funciones.</P>
                </div>

                <H2 text='Ejemplos' />
                <div className="pb-12">
                    <P>Para ambos casos me he creado dentro de src la carpeta components y dentro de la carpeta components el archivo Saludar.tsx</P>
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
        // Saludar.tsx
        import { useEffect } from "react"

        export default function Saludar({ saludar }) {
            useEffect(() => {
                saludar();
            }, [saludar])
                        
            return (
                <> </>
            )
        }`} />
                </div>

                <H3 text='Sin usar useCallback()' />
                <div className="pb-12">
                    <P>Si abrimos la consola del navegador, nos damos cuenta que cada vez que se actualice el valor de counter, se va volver a ejecutar la función. Esto es ineficiente, ya que al final, los datos de la función son fijos, debido a que Hola no es dinámico, si no un dato estático, fijo.</P>
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
        import "./App.css"
        import { useState } from "react"
        import Saludar from "./components/Saludar"

        export default function App() {
            const [counter, setCounter] = useState(0)

            function sum() {
                setCounter(counter + 1)
            }

            function rest() {
                setCounter(counter - 1)
            }

            return (
                <div>
                    <h1>useCallback()</h1>
                    <small>{counter}</small>

                    <button onClick={sum}>+</button>
                    <button onClick={rest}>-</button>

                    {/* A pesar de que el valor de la función no cambie,
                    se va a voler a ejecutar innecesariamente. */}
                    <Saludar saludar={() => console.log("Hola")} />
                </div>
            )
        }
`} />
                </div>

                <H3 text='Usando useCallback()' />
                <div className="pb-12">
                    <P>Si abrimos la consola del navegador, veremos que cuando cambie el valor del counter, ya no se vuelve a ejecutar Hola. Debido a que en el array de dependencias no se encuentra la variable counter.</P>
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
        import "./App.css"
        import { useState, useCallback } from "react"
        import Saludar from "./components/Saludar"

        export default function App() {
            const [counter, setCounter] = useState(0)

            function sum() {
                setCounter(counter + 1)
            }

            function rest() {
                setCounter(counter - 1)
            }

            return (
                <div>
                    <h1>useCallback()</h1>
                    <small>{counter}</small>

                    <button onClick={sum}>+</button>
                    <button onClick={rest}>-</button>

                    {/* Como no tiene dependecias, se va a ejecutar una vez. */}
                    <Saludar saludar={useCallback(() => console.log("Hola"), [])} />
                </div>
            )
        }
`} />
                </div>
                <Callout text='Si queremos que cada vez que cambie el valor del counter, se vuelva a ejecutar el useCallback. Simplemente añadimos al array de dependencias la variable counter.' />
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
        import "./App.css"
        import { useState, useCallback } from "react"
        import Saludar from "./components/Saludar"

        export default function App() {
            const [counter, setCounter] = useState(0)

            function sum() {
                setCounter(counter + 1)
            }

            function rest() {
                setCounter(counter - 1)
            }

            return (
                <div>
                    <h1>useCallback()</h1>
                    <small>{counter}</small>

                    <button onClick={sum}>+</button>
                    <button onClick={rest}>-</button>

                    {/* Como tiene dependecias de counter, cada vez que se
                    actualize counter, se va a ejecutar el console.log. */}
                    <Saludar saludar={useCallback(() => console.log("Hola"), [counter])} />
                </div>
            )
        }
`} />
            </Article >
        </>
    )
}