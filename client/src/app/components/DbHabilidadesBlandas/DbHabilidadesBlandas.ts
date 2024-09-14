import jugadorK from "@/img/motivacionInspiracional4.jpg";
import jugadorE from "@/img/estimulacionIntelectual3.jpg";
import jugadorT from "@/img/influenciaIdealizada2.jpg";

export interface Option {
  type: string;
  text: string;
  points: number;
}

export interface Question {
  question: string;
  options: Option[];
}

export interface Resultado {
  type: string;
  name: string;
  description: string;
  imagePath: string;
  points: number;
}

export interface DbHabilidadesBlandas {
  softSkillsTest: Question[];
  resultados: Resultado[];
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
        question: "¿Qué haces cuando te enfrentas a un cambio o a una situación nueva?",
        options: [
          { type: 'Adaptabilidad', text: 'Me adapto al cambio o a la situación nueva con flexibilidad y agilidad, buscando oportunidades de mejora y de crecimiento, y aceptando el feedback y las críticas.  ', points: 5 },
          { type: 'Adaptabilidad', text: 'Me resisto al cambio o a la situación nueva con rigidez y lentitud, buscando mantener el status quo y la comodidad, y rechazando el feedback y las críticas.  ', points: 3 },
          { type: 'Adaptabilidad', text: 'Me opongo al cambio o a la situación nueva con hostilidad y violencia, buscando sabotear el proceso y el resultado, y atacando el feedback y las críticas.  ', points: 1 },
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
        question: "¿Qué haces cuando te sientes triste o deprimido por algo que te ha pasado?",
        options: [
          { type: 'Resiliencia', text: 'Busco actividades que me alegren y me animen, como hacer ejercicio, salir con amigos, etc.  ', points: 5 },
          { type: 'Resiliencia', text: 'Busco actividades que me calmen y me consuelen, como comer, dormir, etc.  ', points: 3 },
          { type: 'Resiliencia', text: 'No busco actividades que me ayuden a superar la tristeza o la depresión, sino que me aíslo y me lamento.  ', points: 1 },
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
        question: "¿Qué haces cuando tienes que colaborar con personas que tienen diferentes opiniones o estilos de trabajo?",
        options: [
          { type: 'Colaboración', text: 'Busco puntos en común con los demás, respetando y valorando sus opiniones y estilos de trabajo, y buscando compromisos y soluciones que beneficien a todos.  ', points: 5 },
          { type: 'Colaboración', text: 'No busco puntos en común con los demás, sino que impongo mi opinión o mi estilo de trabajo, sin respetar ni valorar los de los demás, y sin buscar compromisos ni soluciones.  ', points: 3 },
          { type: 'Colaboración', text: 'No colaboro con personas que tienen diferentes opiniones o estilos de trabajo, sino que me enfrento o me alejo de ellas, sin respetar ni valorar sus opiniones ni sus estilos de trabajo.  ', points: 1 },
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
      ];
  const resultados: Resultado[] = [
    {
      type: "Autoestima",
      name: "Autoestima",
      description: "Capacidad de valorarte y aceptarte a ti mismo, reconociendo fortalezas y debilidades.",
      "imagePath": jugadorT.src,
      points: 15,
    },
    {
      type: "Resiliencia",
      name: "Resiliencia",
      description: "Capacidad de afrontar dificultades y fracasos con optimismo, buscando soluciones y lecciones.",
      "imagePath": jugadorE.src,
      points: 15,
    },
    // ... (resto de las habilidades personales)
    {
      type: "Comunicación",
      name: "Comunicación",
      description: "Capacidad de expresar y recibir mensajes de forma clara, asertiva y respetuosa.",
      "imagePath": jugadorK.src,
      points: 15,
    },
    {
      type: "Liderazgo",
      name: "Liderazgo",
      description: "Capacidad de motivar e inspirar a otros para lograr objetivos comunes, usando visión, influencia y ejemplo.",
      "imagePath": jugadorT.src,
      points: 15,
    },
    {
      type: "Creatividad",
      name: "Creatividad",
      description: "Capacidad de generar y aplicar ideas originales e innovadoras a los problemas.",
      "imagePath": jugadorT.src,
      points: 15,
    },
    {
      type: "Colaboración",
      name: "Colaboración",
      description: "Capacidad de trabajar en equipo, cooperando y compartiendo información y recursos.",
      "imagePath": jugadorT.src,
      points: 15,
    },
    {
      type: "Empatía",
      name: "Empatía",
      description: "Capacidad de ponerse en el lugar de los demás y comprender sus emociones y necesidades.",
      "imagePath": jugadorT.src,
      points: 15,
    },
  ];

  return {
    softSkillsTest,
    resultados,
  };
};

export default UseDbHabilidadesBlandas;