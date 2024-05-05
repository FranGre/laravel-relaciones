import { CopyBlock, atomOneDark } from 'react-code-blocks'
import H1 from './H1'
import H2 from './H2'
import H3 from './H3'
import Article from './Article'
import P from './P'
import Highlight from './Highlight'

import padre_hijo from '../assets/padre_hijo.png'

export default function OneToMany() {
    return (
        <>
            <H1 text='One to Many' />
            <Article>
                <div className="pb-12">
                    <P>Pongamos un ejemplo muy sencillo. Padre e Hijo.</P>
                    <img src={padre_hijo} alt="imagen 1:N" className='rounded my-2' />
                    <P>Un padre tiene como mínimo 1 hijo y como máximo N hijos. Y un hijo tiene como mínimo 1 padre y como máximo 1 padre.</P>

                    <P>Como vemos es una relación 1 a muchos.</P>
                    <P><Highlight backgroundColor='bg-slate-700'>La tabla que tenga la N más cerca, tendrá la clave ajena.</Highlight></P>
                    <P>La tabla Hijo tendrá la clave ajena padre_id</P>
                </div>

                <H2 text='Quiero saber del padre X, que hijos tiene' />
                <div className='pb-12'>
                    <P>En el <strong>modelo padre</strong> utilizo <strong>HasMany</strong></P>
                    <CopyBlock
                        customStyle={{
                            marginTop: '25px',
                            overflowY: 'scroll',
                            borderRadius: '15px',
                        }}
                        codeBlock={true}
                        language='php'
                        showLineNumbers={false}
                        theme={atomOneDark}
                        text={`
        <?php
 
        namespace App\\Models;
                         
        use Illuminate\\Database\\Eloquent\\Model;
        use Illuminate\\Database\\Eloquent\\Relations\\HasMany;
                         
        class Padre extends Model
        {
            /**
            * Get the comments for the blog post.
            */
            public function hijos(): HasMany
            {
                return $this->hasMany(Hijo::class);
            }
        }

`} />
                    <div className='py-12'>
                        <H3 text='¿Cómo se usa?' />
                        <P>Gracias al padre, obtengo sus hijos</P>
                        <CopyBlock
                            customStyle={{
                                marginTop: '25px',
                                marginBottom: '25px',
                                overflowY: 'scroll',
                                borderRadius: '15px',
                            }}
                            codeBlock={true}
                            language='php'
                            showLineNumbers={false}
                            theme={atomOneDark}
                            text={`
        use App\\Models\\Padre;
 
        $hijos = Padre::find(1)→hijos;
                         
        foreach ($hijos as $hijo) {
            // …
        }

`} />

                        <P>Otra forma de usarlo:</P>
                        <CopyBlock
                            customStyle={{
                                marginTop: '25px',
                                overflowY: 'scroll',
                                borderRadius: '15px',
                            }}
                            codeBlock={true}
                            language='php'
                            showLineNumbers={false}
                            theme={atomOneDark}
                            text={`
        use App\\Models\\Padre;

        $hijoFran = Padre::find(1)->hijos()
                            ->where('name', 'fran')
                            ->first();

`} />
                    </div>

                    <H2 text='Gracias al hijo, quiero saber cual es su padre' />
                    <div className='pb-12'>
                        <P>En el <strong>modelo hijo</strong> utilizo <strong>BelongsTo</strong></P>
                        <CopyBlock
                            customStyle={{
                                marginTop: '25px',
                                marginBottom: '25px',
                                overflowY: 'scroll',
                                borderRadius: '15px',
                            }}
                            codeBlock={true}
                            language='php'
                            showLineNumbers={false}
                            theme={atomOneDark}
                            text={`
        <?php

        namespace App\\Models;

        use Illuminate\\Database\\Eloquent\\Model;
        use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;

        class Hijo extends Model
        {
            /**
             * Get the video that owns the comment.
             */
            public function padre(): BelongsTo
            {
                return $this->belongsTo(Padre::class)->withDefault(); // withDefault se usa por si no encuentra
            }
        }

`}></CopyBlock>

                        <div className='pb-12'>
                            <H3 text='¿Cómo se usa?' />
                            <P>Gracias al padre, obtengo sus hijos.</P>

                            <CopyBlock
                                customStyle={{
                                    marginTop: '25px',
                                    overflowY: 'scroll',
                                    borderRadius: '15px',
                                }}
                                codeBlock={true}
                                language='php'
                                showLineNumbers={false}
                                theme={atomOneDark}
                                text={`
        use App\Models\Hijo;

        $hijo = Hijo::findOrFail(1);

        return $hijo->padre->name;

`}></CopyBlock>
                        </div>
                    </div>

                </div>
            </Article >
        </>
    )
} 