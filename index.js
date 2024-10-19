const categoriesBtn = async () => {
  try {
    const url = "https://openapi.programming-hero.com/api/peddy/categories";
    const res = await fetch(url);
    const datas = await res.json();
    btns(datas.categories);
  } catch (error) {
    console.log(error);
  }
};

const btns = (allBtn) => {
  const daynamicBtn = document.getElementById("daynamicBtn");
  daynamicBtn.innerHTML = "";

  allBtn.forEach((btn) => {
    const { category, category_icon } = btn;
    daynamicBtn.innerHTML += `
     <button class="btn border w-11/12 mx-auto border-black font-bold " onclick="handaleBtnStyle(this , '${category}')">
       <img src=${category_icon} alt="" class="w-8"> ${category}
     </button>
   `;
  });
};

const handaleBtnStyle = async (clickedBtn, petCategories) => {
  try {
    const url = `https://openapi.programming-hero.com/api/peddy/category/${petCategories}`;
    const res = await fetch(url);
    const data = await res.json();
    const loading = document.getElementById("loading");
    loading.classList.remove("hidden");
    const allCards = document.getElementById("daynamicCard");
    allCards.classList.add("hidden");
    const myTimeOut = setTimeout(() => {
      displayCard(data.data);
      loading.classList.add("hidden");
      allCards.classList.remove("hidden");
    }, 2000);
  } catch (error) {
    console.log(error);
  }
  const daynamicBtn = document.querySelectorAll("#daynamicBtn button");
  daynamicBtn.forEach((btn) => {
    btn.style.border = "";
    btn.style.borderRadius = "";
    btn.style.backgroundColor = "";
  });
  clickedBtn.style.border = "2px solid green";
  clickedBtn.style.borderRadius = "18px";
  clickedBtn.style.backgroundColor = "rgba(14, 122, 129, 0.1)";
};

document.getElementById("sort").addEventListener("click", () => {
  fetchCard(true);
});

const fetchCard = async (sortByPrice = false) => {
  const url = "https://openapi.programming-hero.com/api/peddy/pets";
  const res = await fetch(url);
  const data = await res.json();
  let cards = data.pets;

  if (sortByPrice) {
    cards = cards.sort((a, b) => b.price - a.price);
  }

  displayCard(cards);
};

const displayCard = (cards) => {
  const daynamicCard = document.getElementById("daynamicCard");
  const error = document.getElementById("error");
  daynamicCard.innerHTML = "";

  if (cards.length === 0) {
    error.classList.remove("hidden");
    error.innerHTML = `
    <div class="flex flex-col items-center justify-center">
  <img src="./images/error.webp" alt="Error Image" class="mb-4">
  <h2 class="text-xl font-semibold text-gray-700">No Content Available</h2>
  <p class="text-gray-500">Please Try Later!</p>
</div>

    `;
  } else {
    error.classList.add("hidden");
    cards.forEach((card) => {
      const { breed, date_of_birth, price, image, gender, pet_name, petId } =
        card;

      daynamicCard.innerHTML += `
    <div class="card card-compact shadow-xl p-5 border border-gray-300">
      <figure>
        <img src=${image} alt="Pet Image"/>
      </figure>
      <div class="card-body">
        <p class="card-title">${pet_name}</p>
        <p><i class="fa-solid fa-qrcode"></i> Breed: ${
          breed ? breed : "breed not found"
        }</p>
        <p><i class="fa-solid fa-calendar-days"></i> Birth: ${
          date_of_birth ? date_of_birth : "Not Sure"
        }</p>
        <p><i class="fa-solid fa-venus"></i> Gender: ${
          gender ? gender : "gender not defined"
        }</p>
        <p><i class="fa-solid fa-dollar-sign"></i> Price: ${
          price ? price : "price can be negotiable"
        }</p>
        <div class=" border-t pt-4 flex justify-between">
          <button class="md:w-5 btn bg-transparent" onclick="handleImg('${image}')">
            <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <button class="btn bg-transparent text-btnTextColor" onclick="adopt(this)">Adopt</button>
          <button class="btn bg-transparent text-btnTextColor" onclick="allDetails(${petId})">Details</button>
        </div>
      </div>
    </div>
    `;
    });
  }
};

// for Like button
const handleImg = (img) => {
  const daynamicImg = document.getElementById("daynamicImg");
  daynamicImg.innerHTML += `
    <div>
        <img class='rounded-md' src=${img} alt="">
    </div>
    `;
};

// for adopt button
const adopt = (disabledBtn) => {
  // disabledBtn.disabled = true;
  disabledBtn.setAttribute("disabled", true);
  disabledBtn.innerHTML = "Adopted";
  //   disabledBtn.setAttribute("disabled");
  let start = 3;
  let count = 1;
  const countDouwnValue = document.getElementById("countdown");
  const countDown = setInterval(() => {
    if (start >= count) {
      countDouwnValue.innerHTML = start;
      start--;
      my_modal_1.showModal();
    } else {
      clearInterval(countDown);
      countDouwnValue.innerHTML = "";
    }
  }, 1000);
  const myTimeout = setTimeout(() => {
    my_modal_1.close();
  }, 4000);
};

const allDetails = async (id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllDetails(data.petData);
  } catch (error) {
    console.log(error);
  }
};
const displayAllDetails = (data) => {
  const { pet_name, pet_details, gender, image, date_of_birth, breed, price } =
    data;

  document.getElementById("petImage").src = image;
  document.getElementById("petName").innerText = pet_name
    ? pet_name
    : "Unknown";
  document.getElementById("breed").innerText = breed
    ? breed
    : "Breed not found";
  document.getElementById("birthDate").innerText = date_of_birth
    ? date_of_birth
    : "Not Sure";
  document.getElementById("gender").innerText = gender
    ? gender
    : "Gender not defined";
  document.getElementById("price").innerText = price
    ? price
    : "Price can be negotiable";

  // Another way without ternary operator

  document.getElementById("details").innerText =
    pet_details || "No details available";

  my_modal_4.showModal();
};

const loading = document.getElementById("loading");
loading.classList.remove("hidden");

const myTimeOut = setTimeout(() => {
  fetchCard();
  categoriesBtn();
  loading.classList.add("hidden");
}, 2000);
