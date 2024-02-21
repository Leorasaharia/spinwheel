const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinbutton");
const finalValue = document.getElementById("final-value");

const rotationValues = [
  { minDegree: 0, maxDegree: 25.714, value: 2, message: "You'll be making it to the top!" },
  { minDegree: 25.715, maxDegree: 51.428, value: 1, message: "You are awesome, keep rocking!" },
  { minDegree: 51.429, maxDegree: 77.142, value: 6, message: "Weather is nice today, isn't it?!" },
  { minDegree: 77.143, maxDegree: 102.856, value: 5, message: "You are shining bright!" },
  { minDegree: 102.857, maxDegree: 128.57, value: 4, message: "You got this, keep working towards your goal!" },
  { minDegree: 128.571, maxDegree: 154.284, value: 3, message: "You're amazing, do whatever makes you happy!" },
  { minDegree: 154.285, maxDegree: 179.998, value: 2, message: "You're gonna have a fantastic day!" },
  { minDegree: 179.999, maxDegree: 205.712, value: 7, message: "Opportunities are on the horizon!" },
  { minDegree: 205.713, maxDegree: 231.426, value: 8, message: "Embrace change; it leads to growth!" },
  { minDegree: 231.427, maxDegree: 257.14, value: 9, message: "Your hard work will pay off soon!" },
  { minDegree: 257.141, maxDegree: 282.854, value: 10, message: "Stay focused on your goals; you're almost there!" },
  { minDegree: 282.855, maxDegree: 308.568, value: 11, message: "Your determination will lead to success!" },
  { minDegree: 308.569, maxDegree: 334.282, value: 12, message: "You have the strength to overcome any obstacle!" },
  { minDegree: 334.283, maxDegree: 360, value: 11, message: "You're unstoppable!" },
];

const data = [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16];
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];

let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6,7,8,9,10,11,12],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },

  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>${i.message}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
let count = 0;
let resultValue = 101;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>Good Luck!</p>`;

  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();

    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } 
    else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
