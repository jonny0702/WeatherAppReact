//Heat Stress Formula
let op = 0;
const useTHI = (temp, rh) => {
  op = 0.8 * temp + rh * (temp - 14.4) + 46.4;
  if (72 >= op && op <= 79)
    return `THI= ${parseInt(op)} so the Heat Stress is Mild`;
  if (80 >= op && op <= 89)
    return `THI= ${parseInt(op)} so the Heat Stress is Moderate`;
  if (90 >= op) return `THI= ${parseInt(op)} so the Heat Stress is Severe`;
};

export default useTHI;
