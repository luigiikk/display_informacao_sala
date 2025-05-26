document.addEventListener("DOMContentLoaded", function () {
    GridViewer();
    Subject();
    Professor();
    setInterval(Subject, 60000);
    setInterval(GridViewer, 60000);
    setInterval(Professor, 60000);
});
//função para o grid
function GridViewer() {
    const semester_view = document.getElementById('semester');
    const classes_view = document.getElementById('classes');
    const time_view = document.getElementById('time');
    const departament_view = document.getElementById('departament');
    const registered_view = document.getElementById('registered');
    const code_view = document.getElementById('code');

    fetch('cronograma_aulas_2025.1_todo_pdf.json')
        .then(response => response.json())
        .then(jsonData => {
            //data e horario atual
            const todayDate = new Date();

            const weekDays = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
            const todayDay = weekDays[todayDate.getDay()];

            const nowTime = todayDate.getHours();
            const nowMinute = todayDate.getMinutes();
            const minutesHour = nowTime * 60 + nowMinute;

            let code = '. . .'; 
            let registered = '. . .';
            let ramainHour;
            let semester = '. . .';
            let nowClass = 'Sem aula no momento';
            let departament = '. . .';

            for (let college of jsonData) {
                //coloca o horario em minutos para melhor aproveitamento de dados se o dia da maquina for o mesmo do json
                if (college.dia === todayDay) {
                  const [begin, end] = college.horario.split(' às ').map(hours => {
                    const [hoursPart, minutesPart] = hours.split(':').map(Number);
                    return hoursPart * 60 + minutesPart;
                  });
        
                  if (minutesHour >= begin && minutesHour <= end) {
                    code = college.codigo;
                    registered = college.matriculados;
                    semester = college.semestre;
                    nowClass = "Aula em andamento";
                    remainHour = end - minutesHour;
                    departament = college.departamento;
                    break;
                  }
                
                }
              }

            semester_view.textContent = semester;
            classes_view.textContent = nowClass;
            time_view.textContent = remainHour + " Minutos";
            departament_view.textContent = departament;
            registered_view.textContent = registered;
            code_view.textContent = code;
        })
        .catch(error => {
            console.error('Erro ao carregar o JSON:', error);
            semester_view.textContent = 'Erro ao carregar o semestre';
          });

}
//função para mostrar matéria
function Subject() {
    const subject_view = document.getElementById('subject');
    fetch('cronograma_aulas_2025.1_todo_pdf.json')
        .then(response => response.json())
        .then(jsonData => {
            //data e horario atual
            const todayDate = new Date();

            const weekDays = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
            const todayDay = weekDays[todayDate.getDay()];

            const nowTime = todayDate.getHours();
            const nowMinute = todayDate.getMinutes();
            const minutesHour = nowTime * 60 + nowMinute;

            let subject = '. . .'; 

            for (let college of jsonData) {
                //coloca o horario em minutos para melhor aproveitamento de dados se o dia da maquina for o mesmo do json
                if (college.dia === todayDay) {
                  const [begin, end] = college.horario.split(' às ').map(hours => {
                    const [hoursPart, minutesPart] = hours.split(':').map(Number);
                    return hoursPart * 60 + minutesPart;
                  });
        
                  if (minutesHour >= begin && minutesHour <= end) {
                    subject = college.disciplina;
                    break;
                  }
                
                }
              }
              subject_view.textContent = subject;
        })

}
//função para mostrar professor da matéria
function Professor() {
    const professor_view = document.getElementById('professor');
    fetch('cronograma_aulas_2025.1_todo_pdf.json')
        .then(response => response.json())
        .then(jsonData => {
            //data e horario atual
            const todayDate = new Date();

            const weekDays = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
            const todayDay = weekDays[todayDate.getDay()];

            const nowTime = todayDate.getHours();
            const nowMinute = todayDate.getMinutes();
            const minutesHour = nowTime * 60 + nowMinute;

            let professor = '. . .'; 

            for (let college of jsonData) {
                //coloca o horario em minutos para melhor aproveitamento de dados se o dia da maquina for o mesmo do json
                if (college.dia === todayDay) {
                  const [begin, end] = college.horario.split(' às ').map(hours => {
                    const [hoursPart, minutesPart] = hours.split(':').map(Number);
                    return hoursPart * 60 + minutesPart;
                  });
        
                  if (minutesHour >= begin && minutesHour <= end) {
                    professor = college.professor;
                    break;
                  }
                
                }
              }
              professor_view.textContent = professor;
        })
}


