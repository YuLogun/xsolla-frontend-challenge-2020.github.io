document.addEventListener("DOMContentLoaded", () => {
  const selectCity = document.querySelector(".select-city");
  const selectMonth = document.querySelector(".select-month");
  const cardFolder = document.querySelector(".card-folder");
  const outerContainer = document.querySelector(".outer-container");
  const noItemsHeading = document.createElement("h1");
  noItemsHeading.innerText = "Sorry, there are no concerts found..";
  outerContainer.appendChild(noItemsHeading);
  noItemsHeading.style.display = "none";

  //get cities
  fetch(
    "https://raw.githubusercontent.com/xsolla/xsolla-frontend-school-2020/master/events.json"
  )
    .then((res) => res.json())
    .then((json) => [...new Set(json.map((it) => it.city))])
    .then((cities) =>
      cities.map((city) => {
        const option = document.createElement("option");
        option.setAttribute("value", city);
        option.innerText = city;
        selectCity.appendChild(option);
      })
    );

  //select a city
  selectCity.addEventListener("input", (e) => {
    const selectedOption = e.target.value;
    let allCards;
    if (selectedOption !== "All") {
      const cards = Array.from(cardFolder.querySelectorAll(".city"))
        .filter((city) => city.textContent === selectedOption)
        .map((city) => city.parentNode);
      allCards = Array.from(cardFolder.querySelectorAll(".card-container"));
      allCards.forEach((item) => {
        if (cards.indexOf(item) === -1) {
          item.style.display = "none";
        } else {
          item.style.display = "";
        }
      });
    } else {
      allCards = Array.from(
        cardFolder.querySelectorAll(".card-container")
      ).forEach((item) => (item.style.display = ""));
    }
  });

  //select month
  selectMonth.addEventListener("input", (e) => {
    const selectedOption = e.target.value;
    const months = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };
    let allCards;
    const cards = Array.from(cardFolder.querySelectorAll(".month"))
      .filter((month) => month.textContent === months[selectedOption])
      .map((month) => month.parentNode);
    allCards = Array.from(cardFolder.querySelectorAll(".card-container"));
    allCards.forEach((item) => {
      if (cards.indexOf(item) === -1) {
        item.style.display = "none";
      } else {
        item.style.display = "";
      }
    });
  });

  //cards
  fetch(
    "https://raw.githubusercontent.com/xsolla/xsolla-frontend-school-2020/master/events.json"
  )
    .then((res) => res.json())
    .then((json) =>
      json.map((it) => {
        //create cardContainer
        const cardContainer = document.createElement("div");
        cardContainer.setAttribute("class", "card-container");

        //create imgContainer
        const imgContainer = document.createElement("div");
        imgContainer.style.backgroundImage = "url(" + it.image + ")";
        imgContainer.setAttribute("class", "img-container");

        //create cardName
        const cardName = document.createElement("span");
        cardName.innerText = it.name;
        cardName.setAttribute("class", "card-name");

        //create dateContainer
        const dateContainer = document.createElement("div");
        dateContainer.innerText = it.date.slice(0, 2);
        dateContainer.setAttribute("class", "date-container");

        //city
        const city = document.createElement("div");
        city.innerText = it.city;
        city.setAttribute("class", "city");

        //month
        const month = document.createElement("div");
        month.innerText = it.date.slice(3, 5);
        month.setAttribute("class", "month");

        cardContainer.appendChild(city);
        cardContainer.appendChild(month);
        cardContainer.appendChild(imgContainer);
        cardContainer.appendChild(dateContainer);
        cardContainer.appendChild(cardName);

        cardFolder.appendChild(cardContainer);
      })
    );
});
