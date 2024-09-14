
export const calculateAccumulatedValues = (resultado: { val: string }[]) => {
  const accumulatedValues: { [key: string]: number } = {
    '+S': 0,
    '+A': 0,
    '+E': 0,
    '+K': 0,
  };

  resultado.forEach((res) => {
    accumulatedValues[res.val.toUpperCase()]++;
  });

  return accumulatedValues;
};


export const generaCalculoRender = (resultado: { val: string }[], setResultRenderGrafica: Function) => {
  const accumulatedValues = calculateAccumulatedValues(resultado);
  const chartData = Object.entries(accumulatedValues).map(([name, value]) => ({ name, value }));
  setResultRenderGrafica(chartData);
  // console.log("CHAR DATA 1.0 -->", chartData);
};