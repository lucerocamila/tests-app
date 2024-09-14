
const UseDbTipoJugador = () => {

  const soloQuestions = [
    {
      "description": "¿Con qué te sientes más cómodo en tu vida diaria?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Qué te divierte más?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Qué disfrutas más en tus actividades diarias?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Por qué te gustaría que te reconocieran?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Preferirías ser:",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Qué te gusta más en tu vida diaria?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Qué preferirías tener?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Qué te gustaría más?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Qué es más importante para ti?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Qué es más importante para ti?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "Estás siendo perseguido por algo peligroso. ¿Haces:",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "Quieres enfrentar un gran desafío. ¿Cómo lo abordas?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "Estás por iniciar una nueva experiencia. ¿A quién eliges para que te acompañe?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Es mejor ser:",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "Alguien te ha hecho daño. ¿Quieres:",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Qué es más emocionante?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Qué te gustaría más?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Prefieres?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Qué es peor?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Prefieres?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "Se presenta una nueva oportunidad. ¿Qué esperas con más entusiasmo?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Preferirías ser conocido como?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Prefieres?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Prefieres?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": ¿Qué prefieres hacer?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Sueles?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "En un grupo, ¿preferirías unirte a?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Preferirías ganar?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    }
    {
      "description": "Si estás solo en una situación, ¿piensas?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Preferirías ser conocido por?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Prefieres?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "Te enterás que alguien está en tu contra. ¿Haces?",
      ""type"": "",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "Conocés a alguien nuevo. ¿Pensás en él como?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": " ¿Preferirías?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Tendrías más tendencia a presumir de?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Preferirías tener?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Preferirías tener?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "¿Preferirías recibir como recompensa?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
    {
      "description": "Cuando jugás a un juego, ¿es más divertido?",
      "testId": "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    },
  ]

  const testEstiloJugador = [
    {
      question: "¿Con qué te sientes más cómodo en tu vida diaria?",
      options: [
        // { "type": "+S", text: "Pasando el rato y hablando con amigos" },
        // { "type": "+A", text: "Alcanzando metas personales por tu cuenta" },
        {
          "description": "Pasando el rato y hablando con amigos",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "d119f01d-049b-4334-9690-6dee4b791de8"
        },
        {
          "description": "Alcanzando metas personales por tu cuenta",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "d119f01d-049b-4334-9690-6dee4b791de8"
        },
      ],
    },
    {
      question: "¿Qué te divierte más?",
      options: [
        // { "type": "+A", text: "Lograr algo grande y difícil" },
        // { "type": "+S", text: "Contárselo a tus amigos" },
        {
          "description": "Lograr algo grande y difícil",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "d88bde26-87eb-4ecb-94bd-0e82f247420c"
        },
        {
          "description": "Contárselo a tus amigos",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "d88bde26-87eb-4ecb-94bd-0e82f247420c"
        },
      ],
    },
    {
      question: "¿Qué disfrutas más en tus actividades diarias?",
      options: [
        // { "type": "+S", text: "Participar en experiencias interesantes" },
        // { "type": "+A", text: "Obtener recompensas al final" },
        {
          "description": "Participar en experiencias interesantes",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "22897d71-8d56-470e-ac09-22a2f21d90c7"
        },
        {
          "description": "Obtener recompensas al final",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "22897d71-8d56-470e-ac09-22a2f21d90c7"
        },
      ],
    },
    {
      question: "¿Por qué te gustaría que te reconocieran?",
      options: [
        // { "type": "+A", text: "Por tus logros" },
        // { "type": "+S", text: "Por tu personalidad" },
        {
          "description": "Por tus logros",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "3263aa26-c47b-4fce-8d90-6f51e91a6bd4"
        },
        {
          "description": "Por tu personalidad",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "3263aa26-c47b-4fce-8d90-6f51e91a6bd4"
        },
      ],
    },
    {
      question: "¿Preferirías ser:",
      options: [
        // { "type": "+S", text: "Popular" },
        // { "type": "+A", text: "Exitoso" },
        {
          "description": "Popular",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "e77d9ccb-4ae5-4b29-a867-e9816ea80c07"
        },
        {
          "description": "Exitoso",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "e77d9ccb-4ae5-4b29-a867-e9816ea80c07"
        },
      ],
    },
    {
      question: "¿Qué te gusta más en tu vida diaria?",
      options: [
        // { "type": "+S", text: "Enterarte de los últimos chismes" },
        // { "type": "+A", text: "Obtener algo nuevo" },
        {
          "description": "Enterarte de los últimos chismes",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "87efb311-a4bf-46a5-8c00-da6f4ac1cb47"
        },
        {
          "description": "Obtener algo nuevo",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "87efb311-a4bf-46a5-8c00-da6f4ac1cb47"
        },
      ],
    },
    {
      question: "¿Qué preferirías tener?",
      options: [
        // { "type": "+S", text: "Un grupo privado para comunicarte con tus amigos" },
        // { "type": "+A", text: "Tu propia casa valorada en millones" },
        {
          "description": "Un grupo privado para comunicarte con tus amigos",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "ed04bce4-1a9b-4305-a969-709ed203fb32"
        },
        {
          "description": "Tu propia casa valorada en millones",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "ed04bce4-1a9b-4305-a969-709ed203fb32"
        },
      ],
    },
    {
      question: "¿Qué te gustaría más?",
      options: [
        // { "type": "+S", text: "Administrar tu propio negocio" },
        // { "type": "+E", text: "Crear tus propios proyectos y venderlos" },
        {
          "description": "Administrar tu propio negocio",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "370c188b-c963-4a20-a179-c2d06633529d"
        },
        {
          "description": "Crear tus propios proyectos y venderlos",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "370c188b-c963-4a20-a179-c2d06633529d"
        },
      ],
    },
    {
      question: "¿Qué es más importante para ti?",
      options: [
        // { "type": "+S", text: "La cantidad de personas en tu vida" },
        // { "type": "+E", text: "La cantidad de cosas nuevas para explorar" },
        {
          "description": "La cantidad de personas en tu vida",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "0a7a2808-8483-476a-b77c-0fad16cbeef2"
        },
        {
          "description": "La cantidad de cosas nuevas para explorar",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "0a7a2808-8483-476a-b77c-0fad16cbeef2"
        },
      ],
    },
    {
      question: "¿Qué es más importante para ti?",
      options: [
        // { "type": "+S", text: "La calidad de tus interacciones sociales" },
        // { "type": "+E", text: "La originalidad de tus experiencias y actividades" },
        {
          "description": "La calidad de tus interacciones sociales",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "71fe7dcc-361f-4710-be2f-5e5993d98bfd"
        },
        {
          "description": "La originalidad de tus experiencias y actividades",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "71fe7dcc-361f-4710-be2f-5e5993d98bfd"
        },
      ],
    },
    {
      question: "Estás siendo perseguido por algo peligroso. ¿Haces:",
      options: [
        // { "type": "+S", text: "Pedir ayuda a un amigo para enfrentarlo" },
        // { "type": "+E", text: "Esconderte en un lugar donde sabes que no te seguirá" },
        {
          "description": "Pedir ayuda a un amigo para enfrentarlo",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "a65e9f53-221b-43d1-9699-d7f14f45e69c"
        },
        {
          "description": "Esconderte en un lugar donde sabes que no te seguirá",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "a65e9f53-221b-43d1-9699-d7f14f45e69c"
        },
      ],
    },
    {
      question: "Quieres enfrentar un gran desafío. ¿Cómo lo abordas?",
      options: [
        // { "type": "+S", text: "Reunir un gran grupo de personas para superarlo juntos." },
        // { "type": "+E", text: "Probar diferentes estrategias hasta encontrar la forma de superarlo." },
        {
          "description": "Reunir un gran grupo de personas para superarlo juntos.",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "8180283e-326b-4876-8d47-2922ff66280f"
        },
        {
          "description": "Probar diferentes estrategias hasta encontrar la forma de superarlo.",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "8180283e-326b-4876-8d47-2922ff66280f"
        },
      ],
    },
    {
      question: "Estás por iniciar una nueva experiencia. ¿A quién eliges para que te acompañe?",
      options: [
        // { "type": "+S", text: "A un buen amigo que te divierta y entretenga" },
        // { "type": "+E", text: "A alguien con conocimientos útiles para explorar lo desconocido" },
        {
          "description": "A un buen amigo que te divierta y entretenga",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "5bfdec7a-901a-432f-9055-065e4a61d44e"
        },
        {
          "description": "A alguien con conocimientos útiles para explorar lo desconocido",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "5bfdec7a-901a-432f-9055-065e4a61d44e"
        },
      ],
    },
    {
      question: "¿Es mejor ser:",
      options: [
        // { "type": "+K", text: "Respetado y temido" },
        // { "type": "+S", text: "Querido y apreciado" },
        {
          "description": "Respetado y temido",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "7e077b6f-ff2e-4204-9fef-e9268e440b36"
        },
        {
          "description": "Querido y apreciado",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "7e077b6f-ff2e-4204-9fef-e9268e440b36"
        },
      ],
    },
    {
      question: "Alguien te ha hecho daño. ¿Quieres:",
      options: [
        // { "type": "+S", text: "Entender por qué y convencerlo de no volver a lastimarte" },
        // { "type": "+K", text: "Planear cómo vengarte" },
        {
          "description": "Entender por qué y convencerlo de no volver a lastimarte",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "4c9628bd-4276-4bd2-86c5-4f5829287337"
        },
        {
          "description": "Planear cómo vengarte",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "4c9628bd-4276-4bd2-86c5-4f5829287337"
        },
      ],
    },
    {
      question: "¿Qué es más emocionante?",
      options: [
        // { "type": "+S", text: "Una historia bien contada e interpretada" },
        // { "type": "+K", text: "Una competencia reñida" },
        {
          "description": "Una historia bien contada e interpretada",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "16b41ff4-0738-4ee8-b01e-4382b4ba9d6d"
        },
        {
          "description": "Una competencia reñida",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "16b41ff4-0738-4ee8-b01e-4382b4ba9d6d"
        },
      ],
    },
    {
      question: "¿Qué te gustaría más?",
      options: [
        // { "type": "+K", text: "Ganar una competencia directa con otro" },
        // { "type": "+S", text: "Ser aceptado por un grupo" },
        {
          "description": "Ganar una competencia directa con otro",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "6db5e330-8e4b-415d-aa34-1b9c44d475fa"
        },
        {
          "description": "Ser aceptado por un grupo",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "6db5e330-8e4b-415d-aa34-1b9c44d475fa"
        },
      ],
    },
    {
      question: "¿Prefieres?",
      options: [
        // { "type": "+K", text: "Derrotar a tus opositores" },
        // { "type": "+S", text: "Convencer a tus opositores de trabajar contigo" },
        {
          "description": "Derrotar a tus opositores",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "7a26d959-a50f-4a9f-a8e4-ec51f43c6189"
        },
        {
          "description": "Convencer a tus opositores de trabajar contigo",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "7a26d959-a50f-4a9f-a8e4-ec51f43c6189"
        },
      ],
    },
    {
      question: "¿Qué es peor?",
      options: [
        // { "type": "+K", text: "Estar sin poder" },
        // { "type": "+S", text: "Estar sin amigos" },
        {
          "description": "Estar sin poder",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "6999be01-4325-4614-ac03-43f581f51f55"
        },
        {
          "description": "Estar sin amigos",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "6999be01-4325-4614-ac03-43f581f51f55"
        },
      ],
    },
    {
      question: "¿Prefieres?",
      options: [
        // { "type": "+S", text: "Escuchar lo que alguien tiene que decir" },
        // { "type": "+K", text: "Mostrarle tu fuerza y poder" },
        {
          "description": "Escuchar lo que alguien tiene que decir",
          "points": 1,
          "type": "+S",
          "isEmpty": true,
          "questionId": "fb543614-b107-47ca-84c9-1455d785b203"
        },
        {
          "description": "Mostrarle tu fuerza y poder",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "fb543614-b107-47ca-84c9-1455d785b203"
        },
      ],
    },
    {
      question: "Se presenta una nueva oportunidad. ¿Qué esperas con más entusiasmo?",
      options: [
        // { "type": "+E", text: "Explorar lo nuevo y descubrir sus secretos" },
        // { "type": "+A", text: "Ser el primero en obtener los beneficios" },
        {
          "description": "Explorar lo nuevo y descubrir sus secretos",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "a589d2c8-0384-4020-b4df-455e17eb9320"
        },
        {
          "description": "Ser el primero en obtener los beneficios",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "a589d2c8-0384-4020-b4df-455e17eb9320"
        },
      ],
    },
    {
      question: "¿Preferirías ser conocido como?",
      options: [
        // { "type": "+E", text: "Alguien que conoce mucho y se orienta bien" },
        // { "type": "+A", text: "La persona con los mejores logros" },
        {
          "description": "Alguien que conoce mucho y se orienta bien",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "9f976a25-6211-464d-8505-d9e518dc83fa"
        },
        {
          "description": "La persona con los mejores logros",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "9f976a25-6211-464d-8505-d9e518dc83fa"
        },
      ],
    },
    {
      question: "¿Prefieres?",
      options: [
        // { "type": "+A", text: "Alcanzar el éxito más rápido que otros" },
        // { "type": "+E", text: "Saber más secretos que otros" },
        {
          "description": "Alcanzar el éxito más rápido que otros",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "00100c1c-aba7-4aeb-ac00-9df1abf8014a"
        },
        {
          "description": "Saber más secretos que otros",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "00100c1c-aba7-4aeb-ac00-9df1abf8014a"
        },
      ],
    },
    {
      question: "¿Prefieres?",
      options: [
        // { "type": "+E", text: "Saber dónde encontrar oportunidades" },
        // { "type": "+A", text: "Saber cómo aprovechar esas oportunidades" },
        {
          "description": "Saber dónde encontrar oportunidades",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "ad449f42-2549-40da-aa35-2f60985bf1e7"
        },
        {
          "description": "Saber cómo aprovechar esas oportunidades",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "ad449f42-2549-40da-aa35-2f60985bf1e7"
        },
      ],
    },
    {
      question: "¿Qué prefieres hacer?",
      options: [
        // { "type": "+E", text: "Resolver un problema que nadie más ha podido" },
        // { "type": "+A", text: "Alcanzar un objetivo rápidamente" },
        {
          "description": "Resolver un problema que nadie más ha podido",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "8cffa58e-2f13-41dd-bcfe-3a94c23ce3cd"
        },
        {
          "description": "Alcanzar un objetivo rápidamente",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "8cffa58e-2f13-41dd-bcfe-3a94c23ce3cd"
        },
      ],
    },
    {
      question: "¿Sueles?",
      options: [
        // { "type": "+E", text: "Saber cosas que otros no" },
        // { "type": "+A", text: "Tener logros que otros no" },
        {
          "description": "Saber cosas que otros no",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "e5d8373a-9510-43a7-9e73-3110d210698b"
        },
        {
          "description": "Tener logros que otros no",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "e5d8373a-9510-43a7-9e73-3110d210698b"
        },
      ],
    },
    {
      question: "En un grupo, ¿preferirías unirte a?",
      options: [
        // { "type": "+E", text: "Los eruditos" },
        // { "type": "+K", text: "Los competidores aguerridos" },
        {
          "description": "Los eruditos",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "94293eba-849b-4242-b9b2-cf56d4376e6b"
        },
        {
          "description": "Los competidores aguerridos",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "94293eba-849b-4242-b9b2-cf56d4376e6b"
        },
      ],
    },
    {
      question: "¿Preferirías ganar?",
      options: [
        // { "type": "+E", text: "Un concurso de conocimientos" },
        // { "type": "+K", text: "Una competencia directa" },
        {
          "description": "Un concurso de conocimientos",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "90a21391-a920-4f9e-8d67-ca07dff806a9"
        },
        {
          "description": "Una competencia directa",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "90a21391-a920-4f9e-8d67-ca07dff806a9"
        },
      ],
    },
    {
      question: "Si estás solo en una situación, ¿piensas?",
      options: [
        // { "type": "+E", text: "Que es una oportunidad para explorar" },
        // { "type": "+K", text: "Que necesitas encontrar un nuevo desafío" },
        {
          "description": "Que es una oportunidad para explorar",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "44dcbd9b-f3bd-4a20-b07a-8b331b02dc52"
        },
        {
          "description": "Que necesitas encontrar un nuevo desafío",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "44dcbd9b-f3bd-4a20-b07a-8b331b02dc52"
        },
      ],
    },
    {
      question: "¿Preferirías ser conocido por?",
      options: [
        // { "type": "+E", text: "Conocimiento" },
        // { "type": "+K", text: "Poder" },
        {
          "description": "Conocimiento",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "cbf12af0-5104-41fc-a72f-cb1a36a8108c"
        },
        {
          "description": "Poder",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "cbf12af0-5104-41fc-a72f-cb1a36a8108c"
        },
      ],
    },
    {
      question: "¿Prefieres?",
      options: [
        // { "type": "+K", text: "Derrotar a un oponente" },
        // { "type": "+E", text: "Explorar territorio desconocido" },
        {
          "description": "Derrotar a un oponente",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "2d8bd727-21e8-4942-aff2-843735905981"
        },
        {
          "description": "Explorar territorio desconocido",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "2d8bd727-21e8-4942-aff2-843735905981"
        },
      ],
    },
    {
      question: "Te enterás que alguien está en tu contra. ¿Haces?",
      options: [
        // { "type": "+E", text: "Prepararte en terreno que tu oponente desconoce" },
        // { "type": "+K", text: "Atacar primero antes de ser atacado" },
        {
          "description": "Prepararte en terreno que tu oponente desconoce",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "eae268b6-7025-4b8f-bcee-97336b34e5a9"
        },
        {
          "description": "Atacar primero antes de ser atacado",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "eae268b6-7025-4b8f-bcee-97336b34e5a9"
        },
      ],
    },
    {
      question: "Conocés a alguien nuevo. ¿Pensás en él como?",
      options: [
        // { "type": "+E", text: "Alguien que puede aprender de vos" },
        // { "type": "+K", text: "Una amenaza potencial" },
        {
          "description": "Alguien que puede aprender de vos",
          "points": 1,
          "type": "+E",
          "isEmpty": true,
          "questionId": "0a5a2cde-17c7-4f1b-98bb-a596e91818c0"
        },
        {
          "description": "Una amenaza potencial",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "0a5a2cde-17c7-4f1b-98bb-a596e91818c0"
        },
      ],
    },
    {
      question: "¿Prefieres?",
      options: [
        // { "type": "+A", text: "Tener el logro más destacado" },
        // { "type": "+K", text: "Ser el más temido" },
        {
          "description": "Tener el logro más destacado",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "49471528-9b33-44b0-83b3-bca02be33ab3"
        },
        {
          "description": "Ser el más temido",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "49471528-9b33-44b0-83b3-bca02be33ab3"
        },
      ],
    },
    {
      question: "¿Tendrías más tendencia a presumir de?",
      options: [
        // { "type": "+K", text: "A quiénes has derrotado" },
        // { "type": "+A", text: "Tus éxitos" },
        {
          "description": "A quiénes has derrotado",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "e1eb1777-0669-4a50-97e7-dd54304773eb"
        },
        {
          "description": "Tus éxitos",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "e1eb1777-0669-4a50-97e7-dd54304773eb"
        },
      ],
    },
    {
      question: "¿Preferirías tener?",
      options: [
        // { "type": "+K", text: "Una ventaja para dañar a otros" },
        // { "type": "+A", text: "Una ventaja para prosperar por tu cuenta" },
        {
          "description": "Una ventaja para dañar a otros",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "d08109a6-907a-49e8-b7f4-6036789fb12a"
        },
        {
          "description": "Una ventaja para prosperar por tu cuenta",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "d08109a6-907a-49e8-b7f4-6036789fb12a"
        },
      ],
    },
    {
      question: "¿Preferirías tener?",
      options: [
        // { "type": "+A", text: "Dos niveles de experiencia" },
        // { "type": "+K", text: "Un amuleto que te da ventaja sobre otros" },
        {
          "description": "Dos niveles de experiencia",
          "points": 1,
          "type": "+a",
          "isEmpty": true,
          "questionId": "ad947a0d-0b49-44c1-a83d-7d1e3db7c9ef"
        },
        {
          "description": "Un amuleto que te da ventaja sobre otros",
          "points": 1,
          "type": "+k",
          "isEmpty": true,
          "questionId": "ad947a0d-0b49-44c1-a83d-7d1e3db7c9ef"
        },
      ],
    },
    {
      question: "¿Preferirías recibir como recompensa?",
      options: [
        // { "type": "+A", text: "Puntos de experiencia" },
        // { "type": "+K", text: "Un objeto que te da poder sobre otros" },
        {
          "description": "Puntos de experiencia",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "bc918eaa-066e-467e-9ff3-442cf5b071b2"
        },
        {
          "description": "Un objeto que te da poder sobre otros",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "bc918eaa-066e-467e-9ff3-442cf5b071b2"
        },
      ],
    },
    {
      question: "Cuando jugás a un juego, ¿es más divertido?",
      options: [
        // { "type": "+A", text: "Tener el puntaje más alto" },
        // { "type": "+K", text: "Vencer a un amigo en una competencia directa" },
        {
          "description": "Tener el puntaje más alto",
          "points": 1,
          "type": "+A",
          "isEmpty": true,
          "questionId": "d48881d9-1943-48d6-b92f-0afa83afb98c"
        },
        {
          "description": "Vencer a un amigo en una competencia directa",
          "points": 1,
          "type": "+K",
          "isEmpty": true,
          "questionId": "d48881d9-1943-48d6-b92f-0afa83afb98c"
        },
      ],
    },
  ];


  const resultados = [
    {
      "type": "+S",
      "name": "Jugador Social",
      "description": "Eres un jugador social que disfruta interactuar con otros en el juego. Prefieres participar en la historia del juego y valoras las relaciones con otros jugadores. Te gusta compartir historias y experiencias con tus amigos en el juego.",
      "imagePath": "/images/social_player.jpg"
    },
    {
      "type": "+A",
      "name": "Jugador Logro",
      "description": "Eres un jugador enfocado en logros y desafíos personales. Disfrutas derrotar enemigos poderosos y obtener recompensas significativas. Buscas ser reconocido por tus habilidades y logros en el juego.",
      "imagePath": "/images/achiever_player.jpg"
    },
    {
      "type": "+E",
      "name": "Jugador Explorador",
      "description": "Eres un jugador curioso que ama explorar y descubrir nuevas áreas en el juego. Te emociona aprender sobre la historia del mundo virtual y conocer lugares inexplorados. Disfrutas de la variedad de características y mecánicas únicas del juego.",
      "imagePath": "/images/explorer_player.jpg"
    },
    {
      "type": "+K",
      "name": "Jugador Asesino",
      "description": "Eres un jugador competitivo que busca el dominio y la victoria sobre otros jugadores. Prefieres la emoción de los combates y la sensación de poder al vencer a oponentes. La notoriedad y el respeto a través del combate son importantes para ti.",
      "imagePath": "/images/killer_player.jpg"
    },
  ];



  return {
    testEstiloJugador,
    resultados,
  }
}