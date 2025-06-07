document.addEventListener("DOMContentLoaded", function () {
    GridViewer();
    setInterval(GridViewer, 3000000);
});

function parseHours(horarioStr) {
  return horarioStr.split(' às ').map(hours => {
    const [hoursPart, minutesPart] = hours.split(':').map(Number);
    return hoursPart * 60 + minutesPart;
  });
}

function GridViewer() {
    const class_view = document.getElementById('class');
    const timer_view = document.getElementById('timer');
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

    fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
           
            const todayDate = new Date();

            const weekDays = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
            const todayDay = weekDays[todayDate.getDay()];

            const nowTime = todayDate.getHours();
            
            const nowMinute = todayDate.getMinutes();
            
            const minutesHour = nowTime * 60 + nowMinute;
            let code = jsonData[0].codigo;
            let registered = jsonData[0].matriculados;
            let remainHour = 0;
            let semester = jsonData[0].semestre;
            let nowClass = "Sem aula no momento";
            let departament = jsonData[0].departamento;
            let instructor = "Sem aula no momento";
            let nextClassStart = Infinity;
            let next_class = "Sem aula no momento";
            let classNow = "Sala 08"; 
            let classStartTime = null;
            let classEndTime = null;       

            for (let college of jsonData) {
                
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
                    classNow = college.sala;
                    classStartTime = begin;
                    classEndTime = end;
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
            
            class_view.textContent = classNow;
            next_class_view.textContent = next_class;
            time_now_view.textContent = nowTime + ":" + (nowMinute < 10 ? "0" + nowMinute : nowMinute);
            subject_view.textContent = nowClass;
            instructor_view.textContent = instructor;
            semester_view.textContent = semester;
            classes_view.textContent = nowClass;
            time_view.textContent = remainHour + " Minutos";
            departament_view.textContent = departament;
            registered_view.textContent = registered;
            code_view.textContent = code;

            if (classStartTime !== null && classEndTime !== null) {
              const startHour = Math.floor(classStartTime / 60);
              const startMinute = classStartTime % 60;
              const endHour = Math.floor(classEndTime / 60);
              const endMinute = classEndTime % 60;

              timer_view.textContent = `${startHour}:${startMinute < 10 ? "0" + startMinute : startMinute} -  ${endHour}:${endMinute < 10 ? "0" + endMinute : endMinute}`;
          } else {
              timer_view.textContent = "Sem aula no momento";
          }
        })
        .catch(error => {
            console.error('Erro ao carregar o JSON:', error);
            semester_view.textContent = 'Erro ao carregar o semestre';
          });
}