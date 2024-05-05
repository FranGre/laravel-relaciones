import { CopyBlock, atomOneDark } from 'react-code-blocks'
import H1 from './H1'
import H2 from './H2'
import H3 from './H3'
import Article from './Article'
import P from './P'
import Callout from './Callout'
import Highlight from './Highlight'

import roles_users from '../assets/roles_users.png'
import estructure from '../assets/estructure.png'

export default function ManyToMany() {
    return (
        <>
            <H1 text='Many To Many' />
            <Article>
                <div className="pb-12">
                    <P>Pongamos el típico ejemplo de  users y roles.</P>
                    <img src={roles_users} alt="imagen Many To Many" className='my-2 rounded-lg border-4 border-solid border-black' />
                    <P>Para hacer esto posible necesitamos <Highlight backgroundColor='bg-slate-700'>3 tablas.</Highlight></P>
                    <ul>
                        <li>roles</li>
                        <li>users</li>
                        <li>role_user (nombrado de la tabla en orden alfabético)</li>
                    </ul>
                    <Callout text='Se crea la migración de la tabla role_user. No hay que crear ni el modelo, ni el controller.' />
                    <P>La estructura va a ser la siguiente</P>
                    <img src={estructure} alt="imagen Many To Many" className='my-2 rounded-lg border-4 border-solid border-black max-h-96' />
                </div>

                <div className='pb-12'>
                    <H2 text='User' />
                    <H3 text='Saber los roles de un user' />
                    <P>En <strong>modelo</strong> de user</P>
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
        use Illuminate\\Database\\Eloquent\\Relations\\BelongsToMany;
        
        class User extends Model
        {
            /**
             * The roles that belong to the user.
             */
            public function roles(): BelongsToMany
            {
                return $this->belongsToMany(Role::class);
            }
        }
                        `} />
                </div>
                <div className='pb-12'>
                    <H3 text='Como funciona' />
                    <P>Busco el user e itero los roles que tiene</P>
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
        use App\\Models\\User;
        
        $user = User::find(1);
        
        foreach ($user->roles as $role) {
            // ...
        }

`} />
                    <P>También puedo filtrar</P>
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
        use App\\Models\\User;

        $roles = User::find(1)->roles()->orderBy('name')->get();

`} />
                </div>

                <div className='pb-12'>
                    <H2 text='Role' />
                    <H3 text='Saber todos los users de x role' />
                    <P>En <strong>modelo</strong> de Role</P>
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
        use Illuminate\\Database\\Eloquent\\Relations\\BelongsToMany;
                         
        class Role extends Model
        {
            /**
            * The users that belong to the role.
            */
            public function users(): BelongsToMany
            {
                return $this->belongsToMany(User::class);
            }
        }
`} />
                </div>
                <div className='pb-12'>
                    <H3 text='Como funciona' />
                    <P>Busco el rol y saco todos sus users</P>
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
        use App\\Models\\Role;
        
        $admin_users = Role::where('name', 'ADMIN')->users()->get();
        
        foreach ($admin_users as $user) {
            // ...
        }

`} />
                </div>
            </Article >
        </>
    )
} 