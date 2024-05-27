import { CopyBlock, atomOneDark } from 'react-code-blocks'
import H1 from './H1'
import H2 from './H2'
import H3 from './H3'
import Article from './Article'
import P from './P'
import Highlight from './Highlight'
import Callout from './Callout'
import owner_car from '../assets/owner_car.png'

export default function OneToOne() {
    return (
        <>
            <H1 text='One to One' />
            <Article>
                <div className="pb-12">
                    <P>Pongamos un ejemplo, tenemos Owner(Dueño) y Car(Coche).</P>
                    <P>En la vida real, un dueño puede tener muchos coches verdad. Y un coche solo pertenece
                        a un dueño. Sin embargo en este ejemplo, solo vamos a permitir que <strong>un dueño
                            tenga un coche y que un coche solo tenga un dueño.</strong>
                    </P>
                    <img src={owner_car} alt="imagen Many To Many" className='my-2 rounded-lg border-4 border-solid border-black' />
                    <P>Solo <Highlight backgroundColor='bg-slate-700'>uno de los dos tendrá la clave
                        ajena</Highlight>, ya que en <strong>relaciones 1:1</strong> solo uno tiene la foreign key.
                    </P>
                </div>

                <H2 text='Migraciones' />
                <div className='pb-12'>
                    <P>En mi caso la foreign key la tendrá la migración de Owners</P>
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

        use Illuminate\\Database\\Migrations\\Migration;
        use Illuminate\\Database\\Schema\\Blueprint;
        use Illuminate\\Support\\Facades\\Schema;

        return new class extends Migration
        {
            /**
             * Run the migrations.
             */
            public function up(): void
            {
                Schema::create('owners', function (Blueprint $table) {
                    $table->id();
                    $table->string('name');
                    $table->timestamps();
                    $table->unsignedBigInteger('car_id');

                    $table->foreign('car_id')->references('id')->on('cars');
                });
            }

            /**
             * Reverse the migrations.
             */
            public function down(): void
            {
                Schema::dropIfExists('owners');
            }
        };
                        `} />

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

        use Illuminate\\Database\\Migrations\\Migration;
        use Illuminate\\Database\\Schema\\Blueprint;
        use Illuminate\\Support\\Facades\\Schema;

        return new class extends Migration
        {
            /**
             * Run the migrations.
             */
            public function up(): void
            {
                Schema::create('cars', function (Blueprint $table) {
                    $table->id();
                    $table->string('name');
                    $table->timestamps();
                });
            }

            /**
             * Reverse the migrations.
             */
            public function down(): void
            {
                Schema::dropIfExists('cars');
            }
        };
                        `}>
                    </CopyBlock>
                </div>
                <Callout text='Una vez sabemos esto, vamos a tener que añadir un método a cada Modelo' />
                <H2 text='Modelos' />
                <div className="pb-12">
                    <div className='pb-12'>
                        <H3 text='Migración con clave ajena' />
                        <P>¿Que migración tiene la clave ajena? Owner.</P>
                        <P>Entonces en el modelo de Owner uso el <strong>belongsTo</strong></P>
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

        use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
        use Illuminate\\Database\\Eloquent\\Model;
        use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;

        class Owner extends Model
        {
            use HasFactory;

            protected $fillable = ['name'];

            public function car(): BelongsTo
            {
                return $this->belongsTo(Car::class);
            }
        }
                        `}>
                        </CopyBlock>
                    </div>

                    <div className='pb-12'>
                        <H3 text='Migración sin clave ajena' />
                        <P>Uso hasOne</P>
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
                        
        use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
        use Illuminate\\Database\\Eloquent\\Model;
        use Illuminate\\Database\\Eloquent\\Relations\\HasOne;
                        
        class Car extends Model
        {
            use HasFactory;
                        
            protected $fillable = ['name'];
                        
            public function owner(): HasOne
            {
                return $this->hasOne(Owner::class);
            }
        }
        `}>
                        </CopyBlock>
                    </div>
                </div>

                <H2 text='¿Cómo uso esto?' />
                <div className='pb-12'>
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
                        text={`$owner = Car::findOrFail(1)->owner;`}>
                    </CopyBlock>

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
                        text={`$car = Owner::findOrFail(1)->car;`}>
                    </CopyBlock>
                </div>
            </Article >
        </>
    )
} 