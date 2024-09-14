import { fire } from './ConfettiCanvas';

const ButtonConfetti: React.FC = () => {
  // Llama a la función fire cuando sea necesario
  const handleButtonClick = () => {
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Lanzar confeti</button>
      {/* Otro contenido de tu componente */}
    </div>
  );
};

export default ButtonConfetti;