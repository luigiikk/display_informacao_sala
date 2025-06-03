document.addEventListener("DOMContentLoaded", function () {
  GridViewer();
  setInterval(GridViewer, 60000);
});

function parseHours(horarioStr) {
  return horarioStr.split(' às ').map(hours => {
    const [hoursPart, minutesPart] = hours.split(':').map(Number);
    return hoursPart * 60 + minutesPart;
  });
}

function parseCSV(data) {
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    const obj = {};
    headers.forEach((head, i) => {
      obj[head] = values[i];
    });
    return obj;
  })
}

function GridViewer() {
  const next_class_view = document.getElementById('nextClass');
  const instructor_view = document.getElementById('instructor');
  const subject_view = document.getElementById('subject');
  const semester_view = document.getElementById('semester');
  const classes_view = document.getElementById('classes');
  const time_view = document.getElementById('time');
  const departament_view = document.getElementById('departament');
  const registered_view = document.getElementById('registered');
  const code_view = document.getElementById('code');
  const time_now_view = document.getElementById('timeNow');

  fetch('data.csv')
    .then(response => response.text())
    .then(csvData => {
      const data = parseCSV(csvData);

      const todayDate = new Date();

      const weekDays = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
      const todayDay = weekDays[todayDate.getDay()];

      const nowTime = todayDate.getHours();
      const nowMinute = todayDate.getMinutes();

      const minutesHour = nowTime * 60 + nowMinute;
      console.log(minutesHour);
      let code = csvData.codigo;
      let registered = csvData.matriculados;
      let remainHour = 0;
      let semester = csvData.semestre;
      let nowClass = "Sem aula no momento";
      let departament = csvData.departamento;
      let instructor = "Sem aula no momento";
      let nextClassStart = Infinity;
      let next_class = "Sem aula no momento";

      for (let college of data) {

        if (college.dia === todayDay) {
          const [begin, end] = parseHours(college.horario);

          if (minutesHour >= begin && minutesHour <= end) {
            instructor = college.professor;
            code = college.codigo;
            registered = college.matriculados;
            semester = college.semestre;
            nowClass = college.disciplina;
            remainHour = end - minutesHour;
            departament = college.departamento;
          }

          if (begin > minutesHour && begin < nextClassStart) {
            nextClassStart = begin;
            next_class = college.disciplina;
          }
        }
      }
      if (!next_class) {
        next_class = "Sem aula no momento";
      }

      next_class_view.textContent = next_class;
      time_now_view.textContent = nowTime + ":" + nowMinute;
      subject_view.textContent = nowClass;
      instructor_view.textContent = instructor;
      semester_view.textContent = semester;
      classes_view.textContent = nowClass;
      time_view.textContent = remainHour + " Minutos";
      departament_view.textContent = departament;
      registered_view.textContent = registered;
      code_view.textContent = code;
    })
    .catch(error => {
      console.error('Erro ao carregar o CSV:', error);
      semester_view.textContent = 'Erro ao carregar o semestre';
    });
}