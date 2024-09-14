import jugadorS from "@/img/pilar influencia idealizada.png"
import jugadorK from "@/img/pilar inspiracional.png"
import jugadorE from "@/img/pilar intelectual.png"
import jugadorT from "@/img/pilar personal e individual.png"

export interface Option {
  type: string; // Puede ser 'Influencia Idealizada', 'Motivación Inspiracional', 'Estimulación Intelectual', 'Atención Personal e Individual'
  text: string;
  points: number; // Puede ser positivo (suma) o negativo (resta)
}

export interface Question {
  question: string;
  options: Option[];
}

export interface LidTransformacional {
  leadershipTest: Question[],
  resultados: Resultado[]
}
export interface Resultado {
  type: string;
  name: string;
  description: string;
  imagePath: string;
}
const UseDbLidTransformacional = () : LidTransformacional => {

  const leadershipTest: Question[] = [
    {
      question: "Cuando presentas tu visión para la empresa, tú:",
      options: [
        { 
          type: 'motivación inspiracional', 
          text: 'Te centras en objetivos realistas ', 
          points: 1 
        },
        { type: 'motivación inspiracional', text: 'Inspiras con un ideal ambicioso', points: 5 }
      ]
    },
    {
      question: "Cuando te enfrentas a un problema, tú:",
      options: [
        { type: 'estimulación intelectual', text: 'Buscas soluciones convencionales y probadas', points: 1 },
        { type: 'estimulación intelectual', text: 'Exploras nuevas posibilidades y enfoques', points: 5 }
      ]
    },
    {
      question: "Cuando trabajas con tu equipo, tú:",
      options: [
        { type: 'atención personal e individual', text: 'Les asignas tareas específicas y les supervisas', points: 1 },
        { type: 'atención personal e individual', text: 'Les das autonomía y les apoyas en su desarrollo', points: 5 }
      ]
    },
    {
      question: "Cuando construyes tu visión, tú:",
      options: [
        { type: 'motivación inspiracional', text: 'La basas en el análisis del presente', points: 1 },
        { type: 'motivación inspiracional', text: 'La basas en la proyección del futuro', points: 5 }
      ]
    },
    {
      question: "Cuando influyes en tus seguidores, tú:",
      options: [
        { type: 'influencia idealizada', text: 'Les convences con tu autoridad y poder', points: 1 },
        { type: 'influencia idealizada', text: 'Les inspiras con tu ejemplo y carisma', points: 5 }
      ]
    },
    {
      question: "Cuando impulsas la creatividad, tú:",
      options: [
        { type: 'estimulación intelectual', text: 'Valoras la eficiencia y la productividad', points: 1 },
        { type: 'estimulación intelectual', text: 'Valoras la diversidad y la originalidad', points: 5 }
      ]
    },
    {
      question: "Cuando apoyas a tus seguidores, tú:",
      options: [
        { type: 'atención personal e individual', text: 'Les ayudas a resolver sus problemas', points: 1 },
        { type: 'atención personal e individual', text: 'Les ayudas a descubrir sus soluciones', points: 5 }
      ]
    },
    {
      question: "Cuando lideras el cambio, tú:",
      options: [
        { type: 'motivación inspiracional', text: 'Lo gestionas con planes y recursos ', points: 1 },
        { type: 'motivación inspiracional', text: 'Lo lideras con valores y propósitos', points: 5 }
      ]
    },
    {
      question: "Cuando te defines como líder, tú:",
      options: [
        { type: 'influencia idealizada', text: 'Te consideras un jefe o un gerente ', points: 1 },
        { type: 'influencia idealizada', text: 'Te consideras un guía o un mentor ', points: 5 }
      ]
    },
    // ... (resto de las preguntas)
  ];
  const resultados: Resultado[] = [
    {
      "type": "influencia idealizada",
      "name": "influencia idealizada",
      "description": "El líder se comporta de manera admirable y ética, y demuestra convicciones que hacen que los seguidores se identifiquen con él y con sus valores. Un líder con este pilar busca ser admirado y respetado por sus seguidores, y les transmite sus valores y principios. Un jugador con este estilo busca competir y dominar a los demás, y les impone su autoridad y poder. Se podría asociar con el estilo de jugador asesino, ya que ambos implican una actitud de liderazgo, de influencia y de ejemplo para los demás.",
      "imagePath": jugadorS.src
    },
    {
      "type": "motivación inspiracional",
      "name": "motivación inspiracional",
      "description": "El líder articula una visión de futuro que es compartida y atractiva para los seguidores, y les transmite optimismo y confianza en el logro de los objetivos. Un líder con este pilar busca inspirar y movilizar a sus seguidores hacia una meta común. Un jugador con este estilo busca lograr y obtener recompensas y reconocimientos, y se enfoca en el rendimiento y la eficacia. Se puede asociar a: jugador triunfador",
      "imagePath": jugadorT.src
    },
    {
      "type": "estimulación intelectual",
      "name": "estimulación intelectual",
      "description": "El líder desafía las suposiciones, estimula y alienta la creatividad de los seguidores, y les provee un marco para ver cómo se conectan sus acciones con la misión de la organización. Un líder con este pilar busca estimular y alentar a pensar de manera crítica y a innovar, y provee un marco para entender el sentido de sus acciones. Además, busca descubrir y crear nuevas posibilidades y experiencias, y se enfoca en el conocimiento y la diversión. Se puede asociar a: jugador explorador",
      "imagePath": jugadorE.src
    },
    {
      "type": "atención personal e individual",
      "name": "atención personal e individual",
      "description": "El líder asiste a cada seguidor según sus necesidades y actúa como un mentor o coach, y aprecia la contribución de cada individuo al equipo. El líder fomenta el desarrollo y el empoderamiento de los seguidores, y mejora su autoestima y auto-realización. Un líder con este pilar busca asistir y apreciar a cada seguidor según su potencial. Además, busca interactuar y cooperar con los demás, y se enfoca en la relación y el disfrute. Se puede asociar a: jugador socializador",
      "imagePath": jugadorK.src
    },
  ]

  return {
    leadershipTest,
    resultados
  }

}

export default UseDbLidTransformacional;