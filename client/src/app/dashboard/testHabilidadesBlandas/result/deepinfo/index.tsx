import { useAnswerScoresStore } from "@/store/TestHabilidadesStore/TestHabilidadesStore"

const DeepInfo= () => {
  const { answerScores } = useAnswerScoresStore();

  return (
    <div>
      {Object.entries(answerScores).map(([type, score]) => (
        <div key={type}>
          <p>{`Type: ${type}, Score: ${score}`}</p>
        </div>
      ))}
    </div>
  );
};