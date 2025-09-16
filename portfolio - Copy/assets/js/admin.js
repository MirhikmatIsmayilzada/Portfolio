document.getElementById("adminForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let oldData = JSON.parse(localStorage.getItem("siteData")) || {};

  const jobVal = document.getElementById("jobInput").value.trim();
  const descVal = document.getElementById("descInput").value.trim();
  const aboutVal = document.getElementById("aboutInput").value.trim();
  const expVal = document.getElementById("expInput").value.trim();
  const projectsVal = document.getElementById("projectsInput").value.trim();
  const companiesVal = document.getElementById("companiesInput").value.trim();

  const data = {
    job: jobVal || oldData.job,
    desc: descVal || oldData.desc,
    about: aboutVal || oldData.about,
    exp: expVal || oldData.exp,
    projects: projectsVal || oldData.projects,
    companies: companiesVal || oldData.companies,
  };

  localStorage.setItem("siteData", JSON.stringify(data));
  alert("Məlumat yadda saxlanıldı");
});

const defaultEdu = [
  { title: "İqtisadiyyat", uni: "UNEC - University", year: "2018 - 2022" },
  {
    title: "Maliyyə Menecmenti",
    uni: "ATMU - University",
    year: "2022 - 2023",
  },
  { title: "Front-End Development", uni: "UDEMY", year: "2024 - 2025" },
  {
    title: "Front-End Development",
    uni: "TEXNOERA ACADEMY",
    year: "2025 - davam edir",
  },
];

if (!localStorage.getItem("eduData")) {
  localStorage.setItem("eduData", JSON.stringify(defaultEdu));
}

function renderEdu() {
  const container = document.getElementById("eduCards");
  container.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("eduData"));

  data.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "edu-card";
    div.innerHTML = `
      <h4>${card.title}</h4>
      <p><strong>Universitet:</strong> ${card.uni}</p>
      <p><strong>İl:</strong> ${card.year}</p>
      <div class="edu-actions">
        <button class="edit-btn" onclick="editEdu(${index})"><i class="fa-solid fa-pen"></i> Dəyiş</button>
        <button class="delete-btn" onclick="deleteEdu(${index})"><i class="fa-solid fa-trash"></i> Sil</button>
      </div>
    `;
    container.appendChild(div);
  });
}

document.getElementById("eduForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("eduTitle").value.trim();
  const uni = document.getElementById("eduUni").value.trim();
  const year = document.getElementById("eduYear").value.trim();

  if (!title || !uni || !year) return alert(" Bütün xanaları doldurun!");

  let data = JSON.parse(localStorage.getItem("eduData"));
  data.push({ title, uni, year });
  localStorage.setItem("eduData", JSON.stringify(data));

  renderEdu();
  e.target.reset();
});

window.editEdu = function (index) {
  const data = JSON.parse(localStorage.getItem("eduData"));

  const newTitle = prompt("Yeni ixtisas:", data[index].title);
  const newUni = prompt("Yeni universitet adı:", data[index].uni);
  const newYear = prompt("Yeni il:", data[index].year);

  if (newTitle) data[index].title = newTitle;
  if (newUni) data[index].uni = newUni;
  if (newYear) data[index].year = newYear;

  localStorage.setItem("eduData", JSON.stringify(data));
  renderEdu();
};

window.deleteEdu = function (index) {
  let data = JSON.parse(localStorage.getItem("eduData"));
  if (confirm("Bu kartı silmək istədiyinizə əminsiniz?")) {
    data.splice(index, 1);
    localStorage.setItem("eduData", JSON.stringify(data));
    renderEdu();
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("siteData"));
  if (savedData) {
    if (savedData.job)
      document.getElementById("jobInput").value = savedData.job;
    if (savedData.desc)
      document.getElementById("descInput").value = savedData.desc;
    if (savedData.about)
      document.getElementById("aboutInput").value = savedData.about;
    if (savedData.exp)
      document.getElementById("expInput").value = savedData.exp;
    if (savedData.projects)
      document.getElementById("projectsInput").value = savedData.projects;
    if (savedData.companies)
      document.getElementById("companiesInput").value = savedData.companies;
  }
  renderEdu();
});
if (!localStorage.getItem("skills")) {
  const defaultSkills = [
    { name: "HTML", percent: "90" },
    { name: "CSS", percent: "80" },
    { name: "SCSS", percent: "80" },
    { name: "JavaScript", percent: "70" },
    { name: "React", percent: "60" },
    { name: "Bootstrap", percent: "90" },
    { name: "Github", percent: "90" },
  ];
  localStorage.setItem("skills", JSON.stringify(defaultSkills));
}

if (!localStorage.getItem("developerContent")) {
  localStorage.setItem("developerContent", "1 ildən az təcrübə");
}

let skills = JSON.parse(localStorage.getItem("skills")) || [];

const skillForm = document.getElementById("skill-form");
const skillList = document.getElementById("skill-list");
const skillName = document.getElementById("skill-name");
const skillPercent = document.getElementById("skill-percent");
const skillIndex = document.getElementById("skill-index");

const developerContentInput = document.getElementById(
  "developer-content-input"
);
const updateDeveloperContentBtn = document.getElementById(
  "update-developer-content"
);

developerContentInput.value = localStorage.getItem("developerContent");

updateDeveloperContentBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newContent = developerContentInput.value.trim();
  localStorage.setItem("developerContent", newContent);
  alert("Developer Content yeniləndi!");
});

function displaySkills() {
  skillList.innerHTML = "";
  skills.forEach((skill, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <strong>${skill.name}</strong> - ${skill.percent}%
            <button onclick="editSkill(${index})">Edit</button>
            <button onclick="deleteSkill(${index})">Delete</button>
        `;
    skillList.appendChild(li);
  });
}

skillForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = skillName.value.trim();
  const percent = skillPercent.value.trim();
  const index = skillIndex.value;

  if (index === "") {
    skills.push({ name, percent });
  } else {
    skills[index] = { name, percent };
  }

  localStorage.setItem("skills", JSON.stringify(skills));
  skillForm.reset();
  skillIndex.value = "";
  displaySkills();
});

function deleteSkill(index) {
  if (confirm("Bu skill-i silmək istədiyinizə əminsiniz?")) {
    skills.splice(index, 1);
    localStorage.setItem("skills", JSON.stringify(skills));
    displaySkills();
  }
}

function editSkill(index) {
  const skill = skills[index];
  skillName.value = skill.name;
  skillPercent.value = skill.percent;
  skillIndex.value = index;
}

displaySkills();

// Services Content
const servicesContentKey = "servicesContent";
const servicesCardsKey = "servicesCards";

const servicesContentForm = document.getElementById("services-content-form");
if (servicesContentForm) {
  servicesContentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const head = document.getElementById("services-head-input").value;
    const desc = document.getElementById("services-desc-input").value;
    localStorage.setItem(servicesContentKey, JSON.stringify({ head, desc }));
    alert("Services content saved!");
  });
}

let cards = JSON.parse(localStorage.getItem(servicesCardsKey)) || [];

const cardForm = document.getElementById("services-card-form");
if (cardForm) {
  cardForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const index = document.getElementById("card-index").value;
    const title = document.getElementById("card-title").value;
    const desc = document.getElementById("card-desc").value;
    const icon = document.getElementById("card-icon").value;
    const color = document.getElementById("card-color").value;

    const cardData = { title, desc, icon, color };

    if (index === "") {
      cards.push(cardData);
    } else {
      cards[index] = cardData;
      document.getElementById("card-index").value = "";
    }

    localStorage.setItem(servicesCardsKey, JSON.stringify(cards));
    renderCardList();
    e.target.reset();
  });
}

function renderCardList() {
  const list = document.getElementById("services-card-list");
  if (!list) return;
  list.innerHTML = "";
  cards.forEach((card, i) => {
    const li = document.createElement("li");
    li.textContent = card.title;
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editCard(i);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteCard(i);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function editCard(i) {
  const card = cards[i];
  document.getElementById("card-index").value = i;
  document.getElementById("card-title").value = card.title;
  document.getElementById("card-desc").value = card.desc;
  document.getElementById("card-icon").value = card.icon;
  document.getElementById("card-color").value = card.color;
}

function deleteCard(i) {
  cards.splice(i, 1);
  localStorage.setItem(servicesCardsKey, JSON.stringify(cards));
  renderCardList();
}

renderCardList();
