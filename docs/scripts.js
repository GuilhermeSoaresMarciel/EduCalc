function func_alert(m_text) {
  const element_alert = document.createElement("p");

  element_alert.textContent = m_text;

  element_alert.className = "element_alert";

  element_alert.style.animation = "an-opacity 2s linear";

  document.body.appendChild(element_alert);

  setTimeout(() => {
    element_alert.remove();
  }, 3000);
}

const articleConfig = document.getElementById("article_config");
const articleData = document.getElementById("article_data");
const articleResults = document.getElementById("article_results");
const notesContainer = document.getElementById("notes-container");
const studentsList = document.getElementById("students-list");

let m_list_config = {
  minGrade: 7,
  numNotes: 3,
  divisor: 3,
};

let students = [];

document.getElementById("btn-next-config").onclick = () => {
  const minGrade = document.getElementById("min-grade").value;
  const numNotes = document.getElementById("num-notes").value;
  const divisor = document.getElementById("divisor").value;

  if (minGrade === "" || numNotes === "" || divisor === "") {
    func_alert("Preencha todos os campos.");
    return;
  }

  m_list_config.minGrade = Number(minGrade);
  m_list_config.numNotes = Number(numNotes);
  m_list_config.divisor = Number(divisor);

  notesContainer.innerHTML = "";

  for (let index = 1; index <= m_list_config.numNotes; index++) {
    const input = document.createElement("input");

    input.id = `input_Notes${index}`;
    input.type = "number";
    input.autocomplete = "off";
    input.placeholder = `Nota ${index}`;
    input.min = "0";
    input.max = "10";
    input.step = "0.1";

    notesContainer.appendChild(input);
  }

  articleConfig.style.display = "none";
  articleData.style.display = "flex";
  articleResults.style.display = "flex";
};

document.getElementById("btn-calculate").onclick = () => {
  const studentName = document.getElementById("student-name").value;
  const studentGrade = document.getElementById("student-grade-level").value;

  if (studentName === "" || studentGrade === "") {
    func_alert("Preencha todos os campos.");
    return;
  }

  let somaNotas = 0;

  const grades = [];

  for (let index = 1; index <= m_list_config.numNotes; index++) {
    const nota = document.getElementById(`input_Notes${index}`).value;

    if (nota === "") {
      func_alert("Preencha todos os campos.");
      return;
    }

    const notaNum = Number(nota);

    grades.push(notaNum);

    somaNotas += notaNum;
  }

  const average = Math.round((somaNotas / m_list_config.divisor) * 10) / 10;

  const passed = average >= m_list_config.minGrade;

  const student = {
    id: Date.now(),
    name: studentName,
    gradeLevel: studentGrade,
    grades: grades,
    average: average,
    passed: passed,
  };

  students.push(student);

  renderStudents();

  document.getElementById("student-name").value = "";
  document.getElementById("student-grade-level").value = "";

  for (let index = 1; index <= m_list_config.numNotes; index++) {
    document.getElementById(`input_Notes${index}`).value = "";
  }

  func_alert(`${studentName} adicionado com sucesso!`);
};

document.getElementById("btn-back-config").onclick = () => {
  articleConfig.style.display = "flex";
  articleData.style.display = "none";
  articleResults.style.display = "none";

  students = [];

  studentsList.innerHTML = "";

  document.getElementById("student-name").value = "";
  document.getElementById("student-grade-level").value = "";

  notesContainer.innerHTML = "";
};

function renderStudents() {
  studentsList.innerHTML = "";

  if (students.length === 0) {
    return;
  }

  students.forEach((student) => {
    const card = document.createElement("div");

    card.className = "student-card";

    const statusClass = student.passed ? "status-approved" : "status-rejected";
    const statusText = student.passed ? "Aprovado" : "Reprovado";

    card.innerHTML = `
      <div class="student-info">
        <div class="student-details">
          <h4>${student.name}</h4>
          <p><strong>Série:</strong> ${student.gradeLevel}</p>
          <p><strong>Notas:</strong> ${student.grades.join(", ")}</p>
        </div>
        <div class="student-result">
          <div class="average-value">${student.average.toFixed(1)}</div>
          <p class="${statusClass}">${statusText}</p>
        </div>
      </div>
    `;

    studentsList.appendChild(card);
  });
}
