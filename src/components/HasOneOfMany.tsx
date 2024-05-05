import { CopyBlock, atomOneDark } from 'react-code-blocks'
import H1 from './H1'
import H2 from './H2'
import Article from './Article'
import P from './P'

export default function HasOneOfMany() {
    return (
        <>
            <H1 text='Has One of Many' />
            <Article>
                <div className="pb-12">
                    <P>A veces un modelo tiene muchos modelos relacionados. Y quiero fácilmente obtener el último o el primer registro.</P>
                    <P>En este caso, el ejemplo trata sobre user y orders</P>
                    <ul>
                        <li>user es usuario</li>
                        <li>orders son pedidos</li>
                    </ul>
                    <P>Un usuario tiene muchos pedidos y un pedido tiene como máximo un user.</P>
                </div>

                <div className='pb-12'>
                    <H2 text='¿Cúal fue el último pedido de un user?' />
                    <P>En el <strong>modelo user</strong> utilizo <strong>HasOne y lastestOfMany()</strong></P>
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
        /**
        * Get the user's most recent order.
        */
        public function latestOrder(): HasOne
        {
            return $this->hasOne(Order::class)->latestOfMany();
        }

`} />
                </div>

                <div className='pb-12'>
                    <H2 text='¿Cúal fue el primer pedido de un user?' />
                    <P>En el <strong>modelo user</strong> utilizo <strong>HasOne y oldestMany()</strong></P>
                    <CopyBlock
                        customStyle={{
                            marginTop: '25px',
                            marginBottom: '25px',
                            overflowY: 'scroll',
                            borderRadius: '15px',
                        }}
                        codeBlock={true}
                        language='tsx'
                        showLineNumbers={false}
                        theme={atomOneDark}
                        text={`
        /**
         * Get the user's oldest order.
         */
        public function oldestOrder(): HasOne
        {
            return $this->hasOne(Order::class)->oldestOfMany();
        }

`} />
                </div>

            </Article >
        </>
    )
} 