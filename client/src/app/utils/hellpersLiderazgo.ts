export interface ResultadoItem {
    type: string;
    points: number;
}

export const calculateAccumulatedValues = (resultado: ResultadoItem[]) => {
  const accumulatedValues: { [key: string]: number } = {};

  resultado.forEach((res) => {
    const { type, points } = res;

    if (accumulatedValues[type] === undefined) {
      accumulatedValues[type] = 0;
    }

    accumulatedValues[type] += points;
  });

  return accumulatedValues;
};

export const generaCalculoRenderLiderazgo = (
  resultado: ResultadoItem[],
  setResultRenderGrafica: (data: { name: string; value: number }[]) => void
) => {
  const accumulatedValues = calculateAccumulatedValues(resultado);

  // Calcular el total para normalizar
  const total = Object.values(accumulatedValues).reduce((acc, curr) => acc + Math.abs(curr), 0);

  // Normalizar los valores
  const normalizedValues = Object.entries(accumulatedValues).map(([name, value]) => ({
    name,
    value: (value / total) * 100,
  }));

  setResultRenderGrafica(normalizedValues);
  // console.log("CHART DATA -->", normalizedValues);
};