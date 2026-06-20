let xp = Number(localStorage.getItem("xp") || 0);

const missionList = [
  "Learn one cybersecurity fact",
  "Solve a memory challenge",
  "Practice empathy with someone",
  "Create a new idea",
  "Answer one leadership scenario"
];

const quiz = {
  q: "Strong passwords improve online safety.",
  a: true
};

function update() {
  const xpElement = document.getElementById("xp");
  const levelElement = document.getElementById("level");
  const badgeElement = document.getElementById("badges");

  if (xpElement) xpElement.innerText = "XP: " + xp;
  if (levelElement) levelElement.innerText = "Level: " + (Math.floor(xp / 100) + 1);

  let badges = [];

  if (xp >= 100) badges.push("Explorer");
  if (xp >= 300) badges.push("Thinker");
  if (xp >= 500) badges.push("Skill Master");

  if (badgeElement) {
    badgeElement.innerHTML = badges.map(b => "<li>" + b + "</li>").join("");
  }

  localStorage.setItem("xp", xp);
}

function gainXP(amount) {
  xp += amount;
  update();
}

function saveProfile() {
  const name = document.getElementById("name").value;

  localStorage.setItem("name", name);

  document.getElementById("welcome").innerText =
    "Welcome " + name + "!";
}

function answer(choice) {
  const result = document.getElementById("result");

  if (choice === quiz.a) {
    result.innerText = "Correct! +20 XP";
    xp += 20;
    update();
  } else {
    result.innerText = "Wrong Answer";
  }
}

window.onload = function() {

  const mission = document.getElementById("mission");
  const question = document.getElementById("question");

  if (mission) {
    mission.innerText =
      missionList[new Date().getDate() % missionList.length];
  }

  if (question) {
    question.innerText = quiz.q;
  }

  const savedName = localStorage.getItem("name");

  if (savedName && document.getElementById("welcome")) {
    document.getElementById("welcome").innerText =
      "Welcome " + savedName + "!";
  }

  update();
};
