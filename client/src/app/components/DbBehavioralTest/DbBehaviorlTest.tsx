import jugadorS from "@/img/influenciaIdealizada2.jpg"
import jugadorK from "@/img/motivacionInspiracional4.jpg"
import jugadorE from "@/img/estimulacionIntelectual3.jpg"
import jugadorT from "@/img/influenciaIdealizada2.jpg"

export interface Option {
  type: string;
  text: string;
  points: number; 
}

export interface Question {
  question: string;
  options: Option[];
}

export interface DbHabilidadesBlandas {
  softSkillsTest: Question[],
  resultados: Resultado[]
}
export interface Resultado {
  type: string;
  name: string;
  description: string;
  imagePath: string;
}

const UseDbHabilidadesBlandas = (): DbHabilidadesBlandas => {
  const softSkillsTest: Question[] = [
    {
      question: "¿Cómo te comunicas con tus compañeros de trabajo o de estudio?",
      options: [
        { type: 'Comunicación', text: 'Les hablo de forma clara y directa, escucho lo que tienen que decir y doy feedback constructivo.  ', points: 5 },
        { type: 'Comunicación', text: 'Les hablo de forma educada y cordial, pero a veces no les presto mucha atención o no doy feedback.  ', points: 3 },
        { type: 'Comunicación', text: 'Les hablo de forma confusa y ambigua, no les escucho ni les doy feedback, o les interrumpo y les juzgo.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te enfrentas a un problema que no sabes cómo resolver?",
      options: [
        { type: 'Creatividad', text: 'Busco soluciones creativas e innovadoras, probando cosas nuevas y experimentando con diferentes opciones.  ', points: 5 },
        { type: 'Creatividad', text: 'Busco soluciones convencionales y tradicionales, siguiendo lo que se ha hecho siempre o lo que hacen los demás.  ', points: 3 },
        { type: 'Creatividad', text: 'Me bloqueo y me rindo, pensando que no hay solución o que no soy capaz de encontrarla.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo reaccionas cuando te equivocas o fracasas en algo?",
      options: [
        { type: 'Resiliencia', text: 'Acepto el error o el fracaso como una oportunidad de aprender y mejorar, y busco formas de superarlo.  ', points: 5 },
        { type: 'Resiliencia', text: 'Me siento mal por el error o el fracaso, pero intento seguir adelante sin darle mucha importancia.  ', points: 3 },
        { type: 'Resiliencia', text: 'Me siento fatal por el error o el fracaso, y me culpo a mí mismo o a los demás, sin aprender nada.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo te comportas cuando tienes que liderar un equipo o un proyecto?",
      options: [
        { type: 'Liderazgo', text: 'Motivo e inspiro a los demás, comunicando la visión y la misión, delegando y empoderando, y reconociendo y recompensando el mérito.  ', points: 5 },
        { type: 'Liderazgo', text: 'Dirijo y superviso a los demás, comunicando las tareas y los plazos, controlando y corrigiendo, y exigiendo y sancionando el rendimiento.  ', points: 3 },
        { type: 'Liderazgo', text: 'Impongo y domino a los demás, comunicando las órdenes y las amenazas, manipulando y coaccionando, y despreciando y castigando el esfuerzo.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo te relacionas con los demás cuando trabajas en equipo?",
      options: [
        { type: 'Colaboración', text: 'Colaboro y comparto información y recursos con los demás, respetando y valorando la diversidad, buscando el consenso y el beneficio mutuo, y asumiendo mi rol y mis funciones.  ', points: 5 },
        { type: 'Colaboración', text: 'Coopero y cumplo con lo que se me pide, sin mostrar mucho interés ni iniciativa, evitando los conflictos y las confrontaciones, y haciendo lo que me toca.  ', points: 3 },
        { type: 'Colaboración', text: 'Compito y me guardo información y recursos para mí, despreciando y criticando a los demás, buscando el beneficio propio y el perjuicio ajeno, y haciendo lo que me da la gana.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te enfrentas a un cambio o a una situación nueva?",
      options: [
        { type: 'Adaptabilidad', text: 'Me adapto al cambio o a la situación nueva con flexibilidad y agilidad, buscando oportunidades de mejora y de crecimiento, y aceptando el feedback y las críticas.  ', points: 5 },
        { type: 'Adaptabilidad', text: 'Me resisto al cambio o a la situación nueva con rigidez y lentitud, buscando mantener el status quo y la comodidad, y rechazando el feedback y las críticas.  ', points: 3 },
        { type: 'Adaptabilidad', text: 'Me opongo al cambio o a la situación nueva con hostilidad y violencia, buscando sabotear el proceso y el resultado, y atacando el feedback y las críticas.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo analizas la información que recibes o que buscas?",
      options: [
        { type: 'Pensamiento crítico', text: 'Analizo la información de forma objetiva y razonada, buscando fuentes fiables y contrastadas, cuestionando las suposiciones y las creencias, comparando y evaluando diferentes alternativas y puntos de vista, y argumentando y defendiendo mis opiniones y decisiones.  ', points: 5 },
        { type: 'Pensamiento crítico', text: 'Analizo la información de forma superficial y sesgada, buscando fuentes poco fiables y no contrastadas, aceptando las suposiciones y las creencias, ignorando o descalificando otras alternativas y puntos de vista, y opinando y decidiendo sin fundamentos.  ', points: 3 },
        { type: 'Pensamiento crítico', text: 'No analizo la información, sino que la acepto o la rechazo sin criterio, buscando fuentes que confirmen mis prejuicios, siguiendo las suposiciones y las creencias, imponiendo o rechazando otras alternativas y puntos de vista, y opinando y decidiendo de forma arbitraria.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces para aprender y actualizarte en tu campo de conocimiento?",
      options: [
        { type: 'Aprendizaje continuo', text: 'Busco y aprovecho las oportunidades de formación y desarrollo que se me ofrecen, aprendo de mis propias experiencias, aprendo de los demás, y aplico lo que aprendo a mi práctica profesional y personal.  ', points: 5 },
        { type: 'Aprendizaje continuo', text: 'Acepto las oportunidades de formación y desarrollo que se me imponen, aprendo de mis éxitos, aprendo de los que me caen bien, y aplico lo que aprendo cuando me conviene.  ', points: 3 },
        { type: 'Aprendizaje continuo', text: 'Rechazo las oportunidades de formación y desarrollo que se me presentan, aprendo de mis errores, aprendo de los que me caen mal, y aplico lo que aprendo cuando me obligan.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo te comportas con los demás cuando te cuentan algo que les pasa o que les preocupa?",
      options: [
        { type: 'Empatía', text: 'Me pongo en su lugar y comprendo sus emociones, necesidades y puntos de vista, y les expreso mi aprecio y reconocimiento, y les ofrezco mi ayuda.  ', points: 5 },
        { type: 'Empatía', text: 'Les escucho y respeto lo que me cuentan, pero no me involucro mucho ni les muestro mucha empatía, y les doy consejos o soluciones.  ', points: 3 },
        { type: 'Empatía', text: 'Les ignoro o les interrumpo, y les digo que no es para tanto o que se dejen de quejar, y les critico o les juzgo.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo organizas y priorizas tus tareas?",
      options: [
        { type: 'Gestión del tiempo', text: 'Establezco objetivos SMART (específicos, medibles, alcanzables, relevantes y temporales) para mis tareas, y uso herramientas y técnicas para planificar y controlar mi tiempo, como agendas, calendarios, listas, etc.  ', points: 5 },
        { type: 'Gestión del tiempo', text: 'Establezco objetivos vagos o poco realistas para mis tareas, y uso herramientas y técnicas para planificar y controlar mi tiempo, pero no las sigo o las modifico constantemente.  ', points: 3 },
        { type: 'Gestión del tiempo', text: 'No establezco objetivos para mis tareas, y no uso herramientas ni técnicas para planificar y controlar mi tiempo, sino que hago las cosas según me van surgiendo o según me apetece.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo manejas el estrés y la presión?",
      options: [
        { type: 'Gestión del estrés', text: 'Identifico las fuentes y los síntomas del estrés, y busco formas de reducirlos o eliminarlos, practicando hábitos saludables, como la alimentación equilibrada, el ejercicio físico, el descanso, la relajación, etc.  ', points: 5 },
        { type: 'Gestión del estrés', text: 'Reconozco los síntomas del estrés, pero no busco formas de reducirlos o eliminarlos, sino que los acepto o los ignoro, y sigo adelante como puedo.  ', points: 3 },
        { type: 'Gestión del estrés', text: 'No identifico ni reconozco los síntomas del estrés, sino que los niego o los minimizo, y no busco ni acepto ayuda para reducirlos o eliminarlos, sino que los tolero o los aguanto.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces para resolver problemas o conflictos?",
      options: [
        { type: 'Resolución de problemas', text: 'Identifico y analizo las causas y las consecuencias del problema o del conflicto, y busco soluciones eficaces y duraderas, aplicando técnicas de resolución de problemas y de gestión de conflictos, como la comunicación asertiva, la negociación colaborativa, la mediación, etc.  ', points: 5 },
        { type: 'Resolución de problemas', text: 'Identifico las causas y las consecuencias del problema o del conflicto, pero no busco soluciones eficaces y duraderas, sino que aplico soluciones superficiales y temporales, evitando la confrontación o imponiendo mi voluntad.  ', points: 3 },
        { type: 'Resolución de problemas', text: 'No identifico ni analizo las causas y las consecuencias del problema o del conflicto, sino que los ignoro o los minimizo, y no busco ni aplico soluciones, sino que evito o niego la realidad.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces para comunicarte efectivamente con los demás?",
      options: [
        { type: 'Comunicación efectiva', text: 'Me expreso con claridad y coherencia, y escucho con atención y respeto, buscando comprender y ser comprendido, y transmitiendo y recibiendo mensajes precisos, concisos y pertinentes, tanto de forma oral como escrita, y tanto en persona como a distancia.  ', points: 5 },
        { type: 'Comunicación efectiva', text: 'Me expreso con ambigüedad o contradicción, y escucho con desinterés o impaciencia, buscando convencer o imponer, y transmitiendo o recibiendo mensajes confusos o irrelevantes, tanto de forma oral como escrita, y tanto en persona como a distancia.  ', points: 3 },
        { type: 'Comunicación efectiva', text: 'No me expreso ni escucho, sino que hablo o escribo sin sentido o sin motivo, y no transmito ni recibo mensajes, sino que emito ruidos o interferencias, tanto de forma oral como escrita, y tanto en persona como a distancia.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo te adaptas a diferentes entornos y situaciones?",
      options: [
        { type: 'Flexibilidad', text: 'Me adapto con facilidad y rapidez a diferentes entornos y situaciones, y cambio de roles y de rutinas, sin perder mi identidad ni mi orientación, y manteniendo mi equilibrio emocional y mi coherencia ética.  ', points: 5 },
        { type: 'Flexibilidad', text: 'Me adapto con dificultad y lentitud a diferentes entornos y situaciones, y resisto el cambio de roles y de rutinas, perdiendo mi identidad o mi orientación, y alterando mi equilibrio emocional o mi coherencia ética.  ', points: 3 },
        { type: 'Flexibilidad', text: 'No me adapto a diferentes entornos ni situaciones, sino que me quedo en mi zona de confort, sin cambiar de roles ni de rutinas, perdiendo mi identidad y mi orientación, y alterando mi equilibrio emocional y mi coherencia ética.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo te relacionas con los demás cuando trabajas en equipo?",
      options: [
        { type: 'Colaboración', text: 'Colaboro y comparto información y recursos con los demás, respetando y valorando la diversidad, buscando el consenso y el beneficio mutuo, y asumiendo mi rol y mis funciones.  ', points: 5 },
        { type: 'Colaboración', text: 'Coopero y cumplo con lo que se me pide, sin mostrar mucho interés ni iniciativa, evitando los conflictos y las confrontaciones, y haciendo lo que me toca.  ', points: 3 },
        { type: 'Colaboración', text: 'Compito y me guardo información y recursos para mí, despreciando y criticando a los demás, buscando el beneficio propio y el perjuicio ajeno, y haciendo lo que me da la gana.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te enfrentas a un cambio o a una situación nueva?",
      options: [
        { type: 'Adaptabilidad', text: 'Me adapto al cambio o a la situación nueva con flexibilidad y agilidad, buscando oportunidades de mejora y de crecimiento, y aceptando el feedback y las críticas.  ', points: 5 },
        { type: 'Adaptabilidad', text: 'Me resisto al cambio o a la situación nueva con rigidez y lentitud, buscando mantener el status quo y la comodidad, y rechazando el feedback y las críticas.  ', points: 3 },
        { type: 'Adaptabilidad', text: 'Me opongo al cambio o a la situación nueva con hostilidad y violencia, buscando sabotear el proceso y el resultado, y atacando el feedback y las críticas.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo analizas la información que recibes o que buscas?",
      options: [
        { type: 'Pensamiento crítico', text: 'Analizo la información de forma objetiva y razonada, buscando fuentes fiables y contrastadas, cuestionando las suposiciones y las creencias, comparando y evaluando diferentes alternativas y puntos de vista, y argumentando y defendiendo mis opiniones y decisiones.  ', points: 5 },
        { type: 'Pensamiento crítico', text: 'Analizo la información de forma superficial y sesgada, buscando fuentes poco fiables y no contrastadas, aceptando las suposiciones y las creencias, ignorando o descalificando otras alternativas y puntos de vista, y opinando y decidiendo sin fundamentos.  ', points: 3 },
        { type: 'Pensamiento crítico', text: 'No analizo la información, sino que la acepto o la rechazo sin criterio, buscando fuentes que confirmen mis prejuicios, siguiendo las suposiciones y las creencias, imponiendo o rechazando otras alternativas y puntos de vista, y opinando y decidiendo de forma arbitraria.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces para aprender y actualizarte en tu campo de conocimiento?",
      options: [
        { type: 'Aprendizaje continuo', text: 'Busco y aprovecho las oportunidades de formación y desarrollo que se me ofrecen, aprendo de mis propias experiencias, aprendo de los demás, y aplico lo que aprendo a mi práctica profesional y personal.  ', points: 5 },
        { type: 'Aprendizaje continuo', text: 'Acepto las oportunidades de formación y desarrollo que se me imponen, aprendo de mis éxitos, aprendo de los que me caen bien, y aplico lo que aprendo cuando me conviene.  ', points: 3 },
        { type: 'Aprendizaje continuo', text: 'Rechazo las oportunidades de formación y desarrollo que se me presentan, aprendo de mis errores, aprendo de los que me caen mal, y aplico lo que aprendo cuando me obligan.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo te comportas con los demás cuando te cuentan algo que les pasa o que les preocupa?",
      options: [
        { type: 'Empatía', text: 'Me pongo en su lugar y comprendo sus emociones, necesidades y puntos de vista, y les expreso mi aprecio y reconocimiento, y les ofrezco mi ayuda.  ', points: 5 },
        { type: 'Empatía', text: 'Les escucho y respeto lo que me cuentan, pero no me involucro mucho ni les muestro mucha empatía, y les doy consejos o soluciones.  ', points: 3 },
        { type: 'Empatía', text: 'Les ignoro o les interrumpo, y les digo que no es para tanto o que se dejen de quejar, y les critico o les juzgo.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo organizas y priorizas tus tareas?",
      options: [
        { type: 'Gestión del tiempo', text: 'Establezco objetivos SMART (específicos, medibles, alcanzables, relevantes y temporales) para mis tareas, y uso herramientas y técnicas para planificar y controlar mi tiempo, como agendas, calendarios, listas, etc.  ', points: 5 },
        { type: 'Gestión del tiempo', text: 'Establezco objetivos vagos o poco realistas para mis tareas, y uso herramientas y técnicas para planificar y controlar mi tiempo, pero no las sigo o las modifico constantemente.  ', points: 3 },
        { type: 'Gestión del tiempo', text: 'No establezco objetivos para mis tareas, y no uso herramientas ni técnicas para planificar y controlar mi tiempo, sino que hago las cosas según me van surgiendo o según me apetece.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo manejas el estrés y la presión?",
      options: [
        { type: 'Gestión del estrés', text: 'Identifico las fuentes y los síntomas del estrés, y busco formas de reducirlos o eliminarlos, practicando hábitos saludables, buscando actividades que me relajen y me diviertan, y buscando apoyo social.  ', points: 5 },
        { type: 'Gestión del estrés', text: 'No identifico las fuentes ni los síntomas del estrés, y no busco formas de reducirlos o eliminarlos, sino que los acepto como parte de la vida, y los ignoro o los reprimo.  ', points: 3 },
        { type: 'Gestión del estrés', text: 'No identifico las fuentes ni los síntomas del estrés, y no busco formas de reducirlos o eliminarlos, sino que los niego o los exagero, y los afronto de forma negativa o destructiva.  ', points: 1 },
      ],
    },
    {
      question: "¿Cómo te valoras y te aceptas a ti mismo?",
      options: [
        { type: 'Autoestima', text: 'Me valoro y me acepto a mí mismo, reconociendo mis fortalezas y mis debilidades, y buscando mejorarlas constantemente, me fijo metas realistas y desafiantes, y celebro mis logros y los de los demás, me trato a mí mismo con respeto y con cariño, y evito las comparaciones y los juicios negativos, y me expreso con confianza y seguridad, y defiendo mis derechos y mis intereses.  ', points: 5 },
        { type: 'Autoestima', text: 'Me valoro y me acepto a mí mismo, pero no reconozco mis fortalezas ni mis debilidades, ni busco mejorarlas, me fijo metas poco claras o poco motivadoras, y no celebro mis logros ni los de los demás, me trato a mí mismo con indiferencia o con resignación, y me comparo y me juzgo negativamente, y me expreso con timidez o con duda, y no defiendo mis derechos ni mis intereses.  ', points: 3 },
        { type: 'Autoestima', text: 'No me valoro ni me acepto a mí mismo, sino que niego o exagero mis fortalezas y mis debilidades, y no busco mejorarlas, no me fijo metas ni celebro mis logros ni los de los demás, me trato a mí mismo con desprecio o con odio, y me comparo y me juzgo negativamente, y me expreso con miedo o con agresividad, y no defiendo mis derechos ni mis intereses.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando tienes que dar una presentación oral o escrita?",
      options: [
        { type: 'Comunicación', text: 'Preparo el contenido y la forma de mi presentación, estructurando mis mensajes, usando un lenguaje adecuado, y usando ejemplos y metáforas.  ', points: 5 },
        { type: 'Comunicación', text: 'Improviso el contenido y la forma de mi presentación, sin estructurar mis mensajes, usando un lenguaje poco claro, y sin usar ejemplos ni metáforas.  ', points: 3 },
        { type: 'Comunicación', text: 'Evito dar una presentación oral o escrita, o la delego en otra persona, porque me da miedo o vergüenza.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando quieres estimular tu creatividad?",
      options: [
        { type: 'Creatividad', text: 'Busco actividades que me diviertan y me relajen, como meditar, leer, escuchar música, etc.  ', points: 5 },
        { type: 'Creatividad', text: 'Busco actividades que me distraigan y me entretengan, como ver la televisión, jugar videojuegos, etc.  ', points: 3 },
        { type: 'Creatividad', text: 'No busco actividades que estimulen mi creatividad, sino que me dedico a hacer lo mismo de siempre.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te sientes triste o deprimido por algo que te ha pasado?",
      options: [
        { type: 'Resiliencia', text: 'Busco actividades que me alegren y me animen, como hacer ejercicio, salir con amigos, etc.  ', points: 5 },
        { type: 'Resiliencia', text: 'Busco actividades que me calmen y me consuelen, como comer, dormir, etc.  ', points: 3 },
        { type: 'Resiliencia', text: 'No busco actividades que me ayuden a superar la tristeza o la depresión, sino que me aíslo y me lamento.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando tienes que tomar una decisión importante que afecta a tu equipo o a tu proyecto?",
      options: [
        { type: 'Liderazgo', text: 'Consulto y escucho las opiniones y las sugerencias de los demás, y tomo la decisión basándome en criterios objetivos y racionales.  ', points: 5 },
        { type: 'Liderazgo', text: 'No consulto ni escucho las opiniones ni las sugerencias de los demás, y tomo la decisión basándome en criterios subjetivos y emocionales.  ', points: 3 },
        { type: 'Liderazgo', text: 'No tomo la decisión, sino que la delego en otra persona, o la dejo al azar o a la suerte.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando tienes que trabajar en equipo con personas que no conoces o que no te caen bien?",
      options: [
        { type: 'Colaboración', text: 'Busco conocer y apreciar a los demás, respetando y valorando sus opiniones, experiencias y habilidades, y colaborando y compartiendo información y recursos con ellos.  ', points: 5 },
        { type: 'Colaboración', text: 'No busco conocer ni apreciar a los demás, sino que me limito a cumplir con lo que se me pide, sin respetar ni valorar sus opiniones, experiencias y habilidades, y sin colaborar ni compartir información ni recursos con ellos.  ', points: 3 },
        { type: 'Colaboración', text: 'No trabajo en equipo con personas que no conozco o que no me caen bien, sino que me aíslo o me enfrento a ellos, sin respetar ni valorar sus opiniones, experiencias y habilidades, y sin colaborar ni compartir información ni recursos con ellos.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te encuentras con una situación nueva o desconocida?",
      options: [
        { type: 'Adaptabilidad', text: 'Me enfrento a la situación nueva o desconocida con curiosidad y entusiasmo, buscando aprender y aprovechar la oportunidad.  ', points: 5 },
        { type: 'Adaptabilidad', text: 'Me enfrento a la situación nueva o desconocida con indiferencia y resignación, buscando salir del paso y evitar la incomodidad.  ', points: 3 },
        { type: 'Adaptabilidad', text: 'No me enfrento a la situación nueva o desconocida, sino que la evito o la rechazo, buscando mantener mi rutina y mi seguridad.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te encuentras con una información que contradice tus creencias o tus opiniones?",
      options: [
        { type: 'Pensamiento crítico', text: 'Analizo la información de forma objetiva y razonada, buscando evidencias que la sustenten o la refuten, y reviso mis creencias o mis opiniones si es necesario.  ', points: 5 },
        { type: 'Pensamiento crítico', text: 'Analizo la información de forma superficial y sesgada, buscando evidencias que confirmen mis creencias o mis opiniones, y mantengo mis creencias o mis opiniones sin cambios.  ', points: 3 },
        { type: 'Pensamiento crítico', text: 'No analizo la información, sino que la acepto o la rechazo sin criterio, buscando evidencias que confirmen mis prejuicios, y defiendo mis creencias o mis opiniones de forma irracional.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te das cuenta de que hay algo que no sabes o que no entiendes?",
      options: [
        { type: 'Aprendizaje continuo', text: 'Busco y aprovecho las oportunidades de formación y desarrollo que se me ofrecen, y busco y consulto fuentes fiables y contrastadas de información.  ', points: 5 },
        { type: 'Aprendizaje continuo', text: 'Acepto las oportunidades de formación y desarrollo que se me imponen, y busco y consulto fuentes poco fiables y no contrastadas de información.  ', points: 3 },
        { type: 'Aprendizaje continuo', text: 'Rechazo las oportunidades de formación y desarrollo que se me presentan, y no busco ni consulto ninguna fuente de información.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te das cuenta de que alguien está sufriendo o necesita ayuda?",
      options: [
        { type: 'Empatía', text: 'Me pongo en su lugar y comprendo sus emociones, necesidades y puntos de vista, y le expreso mi aprecio y reconocimiento, y le ofrezco mi ayuda.  ', points: 5 },
        { type: 'Empatía', text: 'Le escucho y respeto lo que me cuenta, pero no me involucro mucho ni le muestro mucha empatía, y le doy consejos o soluciones.  ', points: 3 },
        { type: 'Empatía', text: 'Le ignoro o le interrumpo, y le digo que no es para tanto o que se deje de quejar, y le critico o le juzgo.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando tienes muchas tareas que hacer y poco tiempo para hacerlas?",
      options: [
        { type: 'Gestión del tiempo', text: 'Organizo y priorizo mis tareas según su importancia y urgencia, y me enfoco en las más relevantes, cumpliendo con los plazos establecidos.  ', points: 5 },
        { type: 'Gestión del tiempo', text: 'Organizo y priorizo mis tareas según mi preferencia y conveniencia, y me enfoco en las más fáciles o agradables, sin cumplir con los plazos establecidos.  ', points: 3 },
        { type: 'Gestión del tiempo', text: 'No organizo ni priorizo mis tareas, sino que las hago al azar o las dejo para el último momento, sin cumplir con los plazos establecidos.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te sientes estresado o presionado por algo que te pasa o que tienes que hacer?",
      options: [
        { type: 'Gestión del estrés', text: 'Identifico las fuentes y los síntomas del estrés, y busco formas de reducirlos o eliminarlos, practicando hábitos saludables, buscando actividades que me relajen y me diviertan, y buscando apoyo social.  ', points: 5 },
        { type: 'Gestión del estrés', text: 'No identifico las fuentes ni los síntomas del estrés, y no busco formas de reducirlos o eliminarlos, sino que los acepto como parte de la vida, y los ignoro o los reprimo.  ', points: 3 },
        { type: 'Gestión del estrés', text: 'No identifico las fuentes ni los síntomas del estrés, y no busco formas de reducirlos o eliminarlos, sino que los niego o los exagero, y los afronto de forma negativa o destructiva.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te sientes inseguro o poco valorado por alguien o por algo que te ha pasado?",
      options: [
        { type: 'Autoestima', text: 'Me valoro y me acepto a mí mismo, reconociendo mis fortalezas y mis debilidades, y buscando mejorarlas constantemente, me fijo metas realistas y desafiantes, y celebro mis logros y los de los demás, me trato a mí mismo con respeto y con cariño, y evito las comparaciones y los juicios negativos, y me expreso con confianza y seguridad, y defiendo mis derechos y mis intereses.  ', points: 5 },
        { type: 'Autoestima', text: 'Me valoro y me acepto a mí mismo, pero no reconozco mis fortalezas ni mis debilidades, ni busco mejorarlas, me fijo metas poco claras o poco motivadoras, y no celebro mis logros ni los de los demás, me trato a mí mismo con indiferencia o con resignación, y me comparo y me juzgo negativamente, y me expreso con timidez o con duda, y no defiendo mis derechos ni mis intereses.  ', points: 3 },
        { type: 'Autoestima', text: 'No me valoro ni me acepto a mí mismo, sino que niego o exagero mis fortalezas y mis debilidades, y no busco mejorarlas, no me fijo metas ni celebro mis logros ni los de los demás, me trato a mí mismo con desprecio o con odio, y me comparo y me juzgo negativamente, y me expreso con miedo o con agresividad, y no defiendo mis derechos ni mis intereses.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando tienes que explicar algo complicado o difícil de entender a alguien?",
      options: [
        { type: 'Comunicación', text: 'Adapto mi forma de explicar a las necesidades y capacidades del otro, usando un lenguaje claro y sencillo, y usando ejemplos y metáforas.  ', points: 5 },
        { type: 'Comunicación', text: 'No adapto mi forma de explicar a las necesidades y capacidades del otro, usando un lenguaje poco claro o técnico, y sin usar ejemplos ni metáforas.  ', points: 3 },
        { type: 'Comunicación', text: 'Evito explicar algo complicado o difícil de entender a alguien, o se lo explico de forma confusa o incompleta, sin adaptar mi forma de explicar a sus necesidades y capacidades.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando necesitas encontrar una solución creativa a un problema?",
      options: [
        { type: 'Creatividad', text: 'Busco diferentes enfoques y soluciones al problema, explorando nuevas ideas y perspectivas, y probando diferentes métodos y técnicas.  ', points: 5 },
        { type: 'Creatividad', text: 'Busco una única solución al problema, basándome en ideas preconcebidas o convencionales, y probando métodos y técnicas conocidos o habituales.  ', points: 3 },
        { type: 'Creatividad', text: 'No busco soluciones al problema, sino que me conformo con la primera idea que se me ocurre, o espero a que alguien más encuentre la solución.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te sientes solo o abandonado por alguien o por algo que te ha pasado?",
      options: [
        { type: 'Resiliencia', text: 'Busco actividades que me conecten con los demás y me den sentido de pertenencia, como pasar tiempo con amigos o familiares, participar en actividades sociales, etc.  ', points: 5 },
        { type: 'Resiliencia', text: 'Busco actividades que me distraigan y me entretengan, como ver la televisión, jugar videojuegos, etc.  ', points: 3 },
        { type: 'Resiliencia', text: 'No busco actividades que me ayuden a superar la soledad o el abandono, sino que me aíslo y me lamento.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando tienes que liderar un proyecto o un equipo?",
      options: [
        { type: 'Liderazgo', text: 'Me comprometo con el proyecto o el equipo, estableciendo una visión clara y compartida, inspirando y motivando a los demás, y facilitando su participación y su desarrollo.  ', points: 5 },
        { type: 'Liderazgo', text: 'Me limito a cumplir con las tareas asignadas, sin comprometerme con el proyecto o el equipo, y sin inspirar ni motivar a los demás.  ', points: 3 },
        { type: 'Liderazgo', text: 'No lidero el proyecto o el equipo, sino que me limito a seguir órdenes o a hacer mi trabajo, sin involucrarme ni comprometerme.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando tienes que colaborar con personas que tienen diferentes opiniones o estilos de trabajo?",
      options: [
        { type: 'Colaboración', text: 'Busco puntos en común con los demás, respetando y valorando sus opiniones y estilos de trabajo, y buscando compromisos y soluciones que beneficien a todos.  ', points: 5 },
        { type: 'Colaboración', text: 'No busco puntos en común con los demás, sino que impongo mi opinión o mi estilo de trabajo, sin respetar ni valorar los de los demás, y sin buscar compromisos ni soluciones.  ', points: 3 },
        { type: 'Colaboración', text: 'No colaboro con personas que tienen diferentes opiniones o estilos de trabajo, sino que me enfrento o me alejo de ellas, sin respetar ni valorar sus opiniones ni sus estilos de trabajo.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te encuentras con una situación difícil o desafiante?",
      options: [
        { type: 'Adaptabilidad', text: 'Me adapto a la situación difícil o desafiante, buscando soluciones creativas y flexibles, y aprendiendo de la experiencia para mejorar en el futuro.  ', points: 5 },
        { type: 'Adaptabilidad', text: 'No me adapto a la situación difícil o desafiante, sino que me resisto o me quejo, buscando culpar a los demás o a las circunstancias, y sin aprender nada de la experiencia.  ', points: 3 },
        { type: 'Adaptabilidad', text: 'No me enfrento a la situación difícil o desafiante, sino que la evito o la niego, buscando mantener mi comodidad y seguridad, sin aprender ni crecer como persona.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te encuentras con una información que contradice tus creencias o tus opiniones?",
      options: [
        { type: 'Pensamiento crítico', text: 'Analizo la información de forma objetiva y razonada, buscando evidencias que la sustenten o la refuten, y reviso mis creencias o mis opiniones si es necesario.  ', points: 5 },
        { type: 'Pensamiento crítico', text: 'Analizo la información de forma superficial y sesgada, buscando evidencias que confirmen mis creencias o mis opiniones, y mantengo mis creencias o mis opiniones sin cambios.  ', points: 3 },
        { type: 'Pensamiento crítico', text: 'No analizo la información, sino que la acepto o la rechazo sin criterio, buscando evidencias que confirmen mis prejuicios, y defiendo mis creencias o mis opiniones de forma irracional.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te das cuenta de que hay algo que no sabes o que no entiendes?",
      options: [
        { type: 'Aprendizaje continuo', text: 'Busco y aprovecho las oportunidades de formación y desarrollo que se me ofrecen, y busco y consulto fuentes fiables y contrastadas de información.  ', points: 5 },
        { type: 'Aprendizaje continuo', text: 'Acepto las oportunidades de formación y desarrollo que se me imponen, y busco y consulto fuentes poco fiables y no contrastadas de información.  ', points: 3 },
        { type: 'Aprendizaje continuo', text: 'Rechazo las oportunidades de formación y desarrollo que se me presentan, y no busco ni consulto ninguna fuente de información.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te das cuenta de que alguien está sufriendo o necesita ayuda?",
      options: [
        { type: 'Empatía', text: 'Me pongo en su lugar y comprendo sus emociones, necesidades y puntos de vista, y le expreso mi aprecio y reconocimiento, y le ofrezco mi ayuda.  ', points: 5 },
        { type: 'Empatía', text: 'Le escucho y respeto lo que me cuenta, pero no me involucro mucho ni le muestro mucha empatía, y le doy consejos o soluciones.  ', points: 3 },
        { type: 'Empatía', text: 'Le ignoro o le interrumpo, y le digo que no es para tanto o que se deje de quejar, y le critico o le juzgo.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando tienes muchas tareas que hacer y poco tiempo para hacerlas?",
      options: [
        { type: 'Gestión del tiempo', text: 'Organizo y priorizo mis tareas según su importancia y urgencia, y me enfoco en las más relevantes, cumpliendo con los plazos establecidos.  ', points: 5 },
        { type: 'Gestión del tiempo', text: 'Organizo y priorizo mis tareas según mi preferencia y conveniencia, y me enfoco en las más fáciles o agradables, sin cumplir con los plazos establecidos.  ', points: 3 },
        { type: 'Gestión del tiempo', text: 'No organizo ni priorizo mis tareas, sino que las hago al azar o las dejo para el último momento, sin cumplir con los plazos establecidos.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te sientes estresado o presionado por algo que te pasa o que tienes que hacer?",
      options: [
        { type: 'Gestión del estrés', text: 'Identifico las fuentes y los síntomas del estrés, y busco formas de reducirlos o eliminarlos, practicando hábitos saludables, buscando actividades que me relajen y me diviertan, y buscando apoyo social.  ', points: 5 },
        { type: 'Gestión del estrés', text: 'No identifico las fuentes ni los síntomas del estrés, y no busco formas de reducirlos o eliminarlos, sino que los acepto como parte de la vida, y los ignoro o los reprimo.  ', points: 3 },
        { type: 'Gestión del estrés', text: 'No identifico las fuentes ni los síntomas del estrés, y no busco formas de reducirlos o eliminarlos, sino que los niego o los exagero, y los afronto de forma negativa o destructiva.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te sientes inseguro o poco valorado por alguien o por algo que te ha pasado?",
      options: [
        { type: 'Autoestima', text: 'Me valoro y me acepto a mí mismo, reconociendo mis fortalezas y mis debilidades, y buscando mejorarlas constantemente, me fijo metas realistas y desafiantes, y celebro mis logros y los de los demás, me trato a mí mismo con respeto y con cariño, y evito las comparaciones y los juicios negativos, y me expreso con confianza y seguridad, y defiendo mis derechos y mis intereses.  ', points: 5 },
        { type: 'Autoestima', text: 'Me valoro y me acepto a mí mismo, pero no reconozco mis fortalezas ni mis debilidades, ni busco mejorarlas, me fijo metas poco claras o poco motivadoras, y no celebro mis logros ni los de los demás, me trato a mí mismo con indiferencia o con resignación, y me comparo y me juzgo negativamente, y me expreso con timidez o con duda, y no defiendo mis derechos ni mis intereses.  ', points: 3 },
        { type: 'Autoestima', text: 'No me valoro ni me acepto a mí mismo, sino que niego o exagero mis fortalezas y mis debilidades, y no busco mejorarlas, no me fijo metas ni celebro mis logros ni los de los demás, me trato a mí mismo con desprecio o con odio, y me comparo y me juzgo negativamente, y me expreso con miedo o con agresividad, y no defiendo mis derechos ni mis intereses.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando tienes que explicar algo complicado o difícil de entender a alguien?",
      options: [
        { type: 'Comunicación', text: 'Adapto mi forma de explicar a las necesidades y capacidades del otro, usando un lenguaje claro y sencillo, y usando ejemplos y metáforas.  ', points: 5 },
        { type: 'Comunicación', text: 'No adapto mi forma de explicar a las necesidades y capacidades del otro, usando un lenguaje poco claro o técnico, y sin usar ejemplos ni metáforas.  ', points: 3 },
        { type: 'Comunicación', text: 'Evito explicar algo complicado o difícil de entender a alguien, o se lo explico de forma confusa o incompleta, sin adaptar mi forma de explicar a sus necesidades y capacidades.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando necesitas encontrar una solución creativa a un problema?",
      options: [
        { type: 'Creatividad', text: 'Busco diferentes enfoques y soluciones al problema, explorando nuevas ideas y perspectivas, y probando diferentes métodos y técnicas.  ', points: 5 },
        { type: 'Creatividad', text: 'Busco una única solución al problema, basándome en ideas preconcebidas o convencionales, y probando métodos y técnicas conocidos o habituales.  ', points: 3 },
        { type: 'Creatividad', text: 'No busco soluciones al problema, sino que me conformo con la primera idea que se me ocurre, o espero a que alguien más encuentre la solución.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando te sientes solo o abandonado por alguien o por algo que te ha pasado?",
      options: [
        { type: 'Resiliencia', text: 'Busco actividades que me conecten con los demás y me den sentido de pertenencia, como pasar tiempo con amigos o familiares, participar en actividades sociales, etc.  ', points: 5 },
        { type: 'Resiliencia', text: 'Busco actividades que me distraigan y me entretengan, como ver la televisión, jugar videojuegos, etc.  ', points: 3 },
        { type: 'Resiliencia', text: 'No busco actividades que me ayuden a superar la soledad o el abandono, sino que me aíslo y me lamento.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando tienes que liderar un proyecto o un equipo?",
      options: [
        { type: 'Liderazgo', text: 'Me comprometo con el proyecto o el equipo, estableciendo una visión clara y compartida, inspirando y motivando a los demás, y facilitando su participación y su desarrollo.  ', points: 5 },
        { type: 'Liderazgo', text: 'Me limito a cumplir con las tareas asignadas, sin comprometerme con el proyecto o el equipo, y sin inspirar ni motivar a los demás.  ', points: 3 },
        { type: 'Liderazgo', text: 'No lidero el proyecto o el equipo, sino que me limito a seguir órdenes o a hacer mi trabajo, sin involucrarme ni comprometerme.  ', points: 1 },
      ],
    },
    {
      question: "¿Qué haces cuando tienes que colaborar con personas que tienen diferentes opiniones o estilos de trabajo?",
      options: [
        { type: 'Colaboración', text: 'Busco puntos en común con los demás, respetando y valorando sus opiniones y estilos de trabajo, y buscando compromisos y soluciones que beneficien a todos.  ', points: 5 },
        { type: 'Colaboración', text: 'No busco puntos en común con los demás, sino que impongo mi opinión o mi estilo de trabajo, sin respetar ni valorar los de los demás, y sin buscar compromisos ni soluciones.  ', points: 3 },
        { type: 'Colaboración', text: 'No colaboro con personas que tienen diferentes opiniones o estilos de trabajo, sino que me enfrento o me alejo de ellas, sin respetar ni valorar sus opiniones ni sus estilos de trabajo.  ', points: 1 },
      ],
    },
    ];
    
  const resultados: Resultado[] = [
    {
      "type": "habilidades personales",
      "name": "habilidades personales",
      "description": "el líder se comporta de manera admirable y ética, y demuestra convicciones que hacen que los seguidores se identifiquen con él y con sus valores",
      "imagePath": jugadorS.src
    },
    {
      "type": "habilidades profesionales",
      "name": "habilidades profesionales",
      "description": "el líder articula una visión de futuro que es compartida y atractiva para los seguidores, y les transmite optimismo y confianza en el logro de los objetivos",
      "imagePath": jugadorT.src
    },
    {
      "type": "habilidades de liderazgo",
      "name": "habilidades de liderazgo",
      "description": "el líder desafía las suposiciones, estimula y alienta la creatividad de los seguidores, y les provee un marco para ver cómo se conectan sus acciones con la misión de la organización.",
      "imagePath": jugadorE.src
    }
  ];

  return {
    softSkillsTest,
    resultados,
  };
};

export default UseDbHabilidadesBlandas;