const buttons = document.querySelectorAll(".card-profile-options a");
const dashboard = document.querySelector(".dashboard");

selectStatus = (event) => {
  event.preventDefault();
  removeActiveButtons();
  event.target.classList.add("active");
  selectedPeriod(event.target.id);
};

selectedPeriod = (period) => {
  const dailyActivity = document.querySelectorAll(".daily");
  const weeklyActivity = document.querySelectorAll(".weekly");
  const monthlyActivity = document.querySelectorAll(".monthly");
  dailyActivity.forEach((daily) => {
    daily.classList.add("hide");
    daily.classList.remove("active");
  });
  weeklyActivity.forEach((weekly) => {
    weekly.classList.add("hide");
    weekly.classList.remove("active");
  });
  monthlyActivity.forEach((monthly) => {
    monthly.classList.add("hide");
    monthly.classList.remove("active");
  });

  if (period === "daily-button") {
    dailyActivity.forEach((daily) => {
      daily.classList.add("active");
      daily.classList.remove("hide");
    });
  }

  if (period === "weekly-button") {
    weeklyActivity.forEach((weekly) => {
      weekly.classList.add("active");
      weekly.classList.remove("hide");
    });
  }

  if (period === "monthly-button") {
    monthlyActivity.forEach((monthly) => {
      monthly.classList.add("active");
      monthly.classList.remove("hide");
    });
  }
};

removeActiveButtons = (item) => {
  buttons.forEach((item) => {
    item.classList.remove("active");
  });
};

buttons.forEach((item) => {
  item.addEventListener("click", selectStatus);
});

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    json.forEach((item) => {
      dashboard.innerHTML =
        dashboard.innerHTML + populateDashboardActivity(item);
    });
  });

populateDashboardActivity = (item) => {
  let title = item.title.toLowerCase();
  title = title.replace(" ", "-");
  let card = `
  <div class="card ${title}-card">
    <div class="card-header ${title}">
      <img src="./images/icon-${title}.svg" alt="${title}" />
    </div>

    <div class="card-content">
      <h2>${title}</h2>
      <img class="ellipsis" src="./images/icon-ellipsis.svg" alt="" />

      <div class="daily active">
        <div class="activity">${item.timeframes.daily.current}hrs</div>
        <div class="previous">Last Day - ${item.timeframes.daily.previous}hrs</div>
      </div>
      <div class="weekly hide">
        <div class="activity">${item.timeframes.weekly.current}hrs</div>
        <div class="previous">Last Week - ${item.timeframes.weekly.previous}hrs</div>
      </div>
      <div class="monthly hide">
        <div class="activity">${item.timeframes.monthly.current}hrs</div>
        <div class="previous">Last Month - ${item.timeframes.monthly.previous}hrs</div>
      </div>
    </div>
  </div>
  `;
  return card;
};
