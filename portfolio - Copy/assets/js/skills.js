const skillContainer = document.querySelector('.developer-skills');
const developerContent = document.querySelector('.developer-content');

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
const developerContentText = localStorage.getItem("developerContent");
if (developerContent) {
  developerContent.textContent = developerContentText;
}

const iconMapping = {
  "HTML": "fa-html5",
  "CSS": "fa-css3-alt",
  "SCSS": "fa-sass",
  "JavaScript": "fa-js",
  "React": "fa-react",
  "Bootstrap": "fa-bootstrap",
  "Github": "fa-github"
};

function renderSkills() {
  skillContainer.innerHTML = "";
  skills.forEach(skill => {
    const className = skill.name === "JavaScript" ? "js" : skill.name.toLowerCase();
    const card = document.createElement('div');
    card.className = 'card ' + className;
    card.dataset.percent = skill.percent + '%';

    const iconClass = iconMapping[skill.name] || 'fa-star';

    card.innerHTML = `
      <div class="fill"></div>
      <i class="fab ${iconClass}"></i>
      <h3>${skill.name}</h3>
      <p>${skill.percent}%</p>
    `;
    skillContainer.appendChild(card);
  });
}

renderSkills();
