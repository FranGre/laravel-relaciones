import H1 from "./H1"
import H2 from "./H2"
import H3 from "./H3"
import Article from "./Article"
import P from "./P"
import Callout from "./Callout"
import { CopyBlock, atomOneDark } from 'react-code-blocks'
import Highlight from "./Highlight"

export default function Memo() {

    return (
        <>
            <H1 text='memo' />
            <Article>
                <div className="pb-12">
                    <P>Usado para mejorar el rendimiento, ya que evita que un componente se vuelva a
                        renderizar innecesariamente. Básicamente, memoriza el resultado de un
                        componente y lo <Highlight backgroundColor='bg-sky-600'>vuelve a renderizar
                            solo si sus propiedades han cambiado.</Highlight>
                        Esto es útil para componentes funcionales que se están renderizando frecuentemente
                        pero cuyas propiedades no cambian con frecuencia.</P>
                </div>
                <H2 text='Parámetros' />
                <div className="pb-12">
                    <P>() - dentro va todo nuestro componente que recibe los props</P>
                </div>

                <H2 text='Consideraciones' />
                <div className="pb-12">
                    <P>memo optimiza el rendimiento al reducir el número de renderizados.</P>
                </div>

                <H2 text='Ejemplos' />
                <div className="pb-12">
                    <P>Para ambos ejemplos, dentro de src creamos la carpeta components y dentro de components
                        creamos Message.tsx</P>
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
        // Message.tsx
        const Message = ({ text }) => {
            console.log("Message renderizado")

            return <> {text} </>
        };

        export default Message
                        `} />
                </div>

                <H3 text='Sin usar memo' />
                <div className="pb-12">
                    <P>Cada vez que actualicemos el counter, se <Highlight backgroundColor='bg-sky-600'>vuelve a hacer un renderizado del componente</Highlight> App.</P>
                    <P>Aunque el valor de text no haya cambiado, Message se vuelve a renderizar. Esto es <Highlight backgroundColor='bg-sky-600'>ineficiente.</Highlight></P>
                    <Callout text='No tenemos que modificar Message.tsx' />
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
        import Message from "./components/Message"

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
                    <h1>memo</h1>
                    <small>{counter}</small>

                    <button onClick={sum}>+</button>
                    <button onClick={rest}>-</button>

                    <Message text={"Message ineficiente"} />
                </div>
            )
        }
    
                        `} />
                </div>

                <H3 text='Usando memo (estático)' />
                <div className="pb-12">
                    <P>Cada vez que actualicemos el counter, se vuelve a hacer un renderizado del
                        componente App.</P>
                    <P>Sin embargo, como vamos a añadir memo al componente que recibe las props.
                        El Message <Highlight backgroundColor="bg-sky-600">no se va a volver a
                            renderizar</Highlight>, debido a que el valor de la prop <Highlight backgroundColor="bg-sky-600">
                            text</Highlight> que recibe,
                        no ha sido modificado. Es <Highlight backgroundColor="bg-sky-600">estática.</Highlight>
                    </P>

                    <Callout text='Tenemos que modificar Message.tsx' />

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
        // Message.tsx
        import { memo } from "react"

        const Message = memo(({ text }) => {
            console.log("Message renderizado")

            return <> {text} </>
        })

        export default Message
    
                        `} />

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
        import Message from "./components/Message"

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
                    <h1>memo</h1>
                    <small>{counter}</small>

                    <button onClick={sum}>+</button>
                    <button onClick={rest}>-</button>

                    <Message text={"Message eficiente"} />
                </div>
            )
        }
    
                        `} />
                </div>

                <H3 text='Usando memo (dinámico)' />
                <div>
                    <P>Simplemente le pasamos a <Highlight backgroundColor="bg-sky-600">text</Highlight> un
                        dato <Highlight backgroundColor="bg-sky-600">dinámico</Highlight>,
                        en este caso el counter.</P>
                    <P>Por lo tanto, como el valor de counter se va modificando cada vez que + o -,
                        pues Message se irá renderizado a medida que se actualize el valor de counter.</P>

                    <Callout text='Tenemos que modificar App.tsx' /><CopyBlock
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
        import Message from "./components/Message"

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
                    <h1>memo</h1>
                    <small>{counter}</small>

                    <button onClick={sum}>+</button>
                    <button onClick={rest}>-</button>

                    <Message text={counter} />
                </div>
            )
        }
                        `} />

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
        // Message.tsx
        import { memo } from "react"

        const Message = memo(({ text }) => {
            console.log("Message renderizado")

            return <> {text} </>
        })

        export default Message
                        `} />
                </div>
            </Article>
        </>
    )
}