import jugadorS from "@/img/socializazdor.png"
import jugadorK from "@/img/killer.png"
import jugadorE from "@/img/explorador.png"
import jugadorT from "@/img/triunfador.png"

export interface Opcion {
  type: string;
  text: string;
}

export interface Resultado {
  type: string;
  name: string;
  description: string;
  imagePath: string;
}
export interface Pregunta {
  question: string;
  options: Opcion[];
}

export interface TipoJugador {
  datos: Pregunta[],
  resultados: Resultado[]
}
const UseDbTipoJugador = (): TipoJugador => {

const datos: Pregunta[] = [
    {
      question: "Are you more comfortable, as a player on a MUD:",
      options: [
        {
          type: "+S",
          text: "Talking with friends in a tavern?"
        },
        {
          type: "+A",
          text: "Out hunting orcs by yourself for experience?"
        },
      ]
    },
    {
      question: "Which is more enjoyable to you?",
      options: [
        {
          type: "+A",
          text: "Killing a big monster"
        },
        {
          type: "+S",
          text: "Bragging about it to your friends?"
        }
      ]
    },
    {
      "question": "You're a player on a mud, and about to go into an unknown dungeon. You have your choice of one more person for your party. Do you bring:",
      "options": [
        {
          "type": "+S",
          "text": "A bard, who's a good friend of yours and who's great for entertaining you and your friends"
        },
        {
          "type": "+E",
          "text": "A wizard, to identify the items that you find there"
        }
      ]
    },
    {
      "question": "Is it better to be:",
      "options": [
        {
          "type": "+K",
          "text": "Feared"
        },
        {
          "type": "+S",
          "text": "Loved"
        }
      ]
    },
    {
      "question": "Someone has PK'ed you. Do you want to:",
      "options": [
        {
          "type": "+S",
          "text": "Find out why, and try to convince them not to do it again"
        },
        {
          "type": "+K",
          "text": "Plot your revenge"
        }
      ]
    },
    {
      "question": "What's worse:",
      "options": [
        {
          "type": "+K",
          "text": "To be without power"
        },
        {
          "type": "+S",
          "text": "To be without friends"
        }
      ]
    },
    {
      "question": "Would you rather:",
      "options": [
        {
          "type": "+S",
          "text": "Hear what someone has to say"
        },
        {
          "type": "+K",
          "text": "Show them the sharp blade of your axe"
        }
      ]
    },
    {
      "question": "On a MUD, a new area opens up. Which do you look forward to more?",
      "options": [
        {
          "type": "+E",
          "text": "Exploring the new area, and finding out its history"
        },
        {
          "type": "+A",
          "text": "Being the first to get the new equipment from the area"
        }
      ]
    },
  ]

const resultados: Resultado[] = [
    {
      "type": "+S",
      "name": "Jugador Social",
      "description": "Eres un jugador social que disfruta interactuar con otros en el juego. Prefieres participar en la historia del juego y valoras las relaciones con otros jugadores. Te gusta compartir historias y experiencias con tus amigos en el juego.",
      "imagePath": jugadorS.src
    },
    {
      "type": "+A",
      "name": "Jugador Logro",
      "description": "Eres un jugador enfocado en logros y desafíos personales. Disfrutas derrotar enemigos poderosos y obtener recompensas significativas. Buscas ser reconocido por tus habilidades y logros en el juego.",
      "imagePath": jugadorT.src
    },
    {
      "type": "+E",
      "name": "Jugador Explorador",
      "description": "Eres un jugador curioso que ama explorar y descubrir nuevas áreas en el juego. Te emociona aprender sobre la historia del mundo virtual y conocer lugares inexplorados. Disfrutas de la variedad de características y mecánicas únicas del juego.",
      "imagePath": jugadorE.src
    },
    {
      "type": "+K",
      "name": "Jugador Asesino",
      "description": "Eres un jugador competitivo que busca el dominio y la victoria sobre otros jugadores. Prefieres la emoción de los combates y la sensación de poder al vencer a oponentes. La notoriedad y el respeto a través del combate son importantes para ti.",
      "imagePath": jugadorK.src
    },
  ]

  return { 
    datos, 
    resultados, 
  }
  

}

export default UseDbTipoJugador;