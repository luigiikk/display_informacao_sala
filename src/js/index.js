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
    const sem = document.getElementById('sem');
    const classes = document.getElementById('classes');
    const tempo = document.getElementById('tempo');
    const departamento = document.getElementById('departamento');
    const matriculados = document.getElementById('matriculado');
    const cod = document.getElementById('codigo');

    fetch('cronograma_aulas_2025.1_todo_pdf.json')
        .then(response => response.json())
        .then(jsonData => {
            //data e horario atual
            const dataAtual = new Date();

            const diasSemana = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
            const diaAtual = diasSemana[dataAtual.getDay()];

            const horaAtual = dataAtual.getHours();
            const minutoAtual = dataAtual.getMinutes();
            const horaMinutos = horaAtual * 60 + minutoAtual;

            let codigo = '. . .'; 
            let matriculado = '. . .';
            let horaRestante;
            let semestre = '. . .';
            let aulaagora = 'Sem aula no momento';
            let depart = '. . .';

            for (let disciplina of jsonData) {
                //coloca o horario em minutos para melhor aproveitamento de dados se o dia da maquina for o mesmo do json
                if (disciplina.dia === diaAtual) {
                  const [inicio, fim] = disciplina.horario.split(' às ').map(h => {
                    const [hPart, mPart] = h.split(':').map(Number);
                    return hPart * 60 + mPart;
                  });
        
                  if (horaMinutos >= inicio && horaMinutos <= fim) {
                    codigo = disciplina.codigo;
                    matriculado = disciplina.matriculados;
                    semestre = disciplina.semestre;
                    aulaagora = "Aula em andamento";
                    horaRestante = fim - horaMinutos;
                    depart = disciplina.departamento;
                    break;
                  }
                
                }
              }

            sem.textContent = semestre;
            classes.textContent = aulaagora;
            tempo.textContent = horaRestante + " Minutos";
            departamento.textContent = depart;
            matriculados.textContent = matriculado;
            cod.textContent = codigo;
        })
        .catch(error => {
            console.error('Erro ao carregar o JSON:', error);
            sem.textContent = 'Erro ao carregar o semestre';
          });

}
//função para mostrar matéria
function Subject() {
    const mat = document.getElementById('materia');
    fetch('cronograma_aulas_2025.1_todo_pdf.json')
        .then(response => response.json())
        .then(jsonData => {
            //data e horario atual
            const dataAtual = new Date();

            const diasSemana = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
            const diaAtual = diasSemana[dataAtual.getDay()];

            const horaAtual = dataAtual.getHours();
            const minutoAtual = dataAtual.getMinutes();
            const horaMinutos = horaAtual * 60 + minutoAtual;

            let materia = '. . .'; 

            for (let disciplina of jsonData) {
                //coloca o horario em minutos para melhor aproveitamento de dados se o dia da maquina for o mesmo do json
                if (disciplina.dia === diaAtual) {
                  const [inicio, fim] = disciplina.horario.split(' às ').map(h => {
                    const [hPart, mPart] = h.split(':').map(Number);
                    return hPart * 60 + mPart;
                  });
        
                  if (horaMinutos >= inicio && horaMinutos <= fim) {
                    materia = disciplina.disciplina;
                    break;
                  }
                
                }
              }
              mat.textContent = materia;
        })

}
//função para mostrar professor da matéria
function Professor() {
    const prof = document.getElementById('prof');
    fetch('cronograma_aulas_2025.1_todo_pdf.json')
        .then(response => response.json())
        .then(jsonData => {
            //data e horario atual
            const dataAtual = new Date();

            const diasSemana = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
            const diaAtual = diasSemana[dataAtual.getDay()];

            const horaAtual = dataAtual.getHours();
            const minutoAtual = dataAtual.getMinutes();
            const horaMinutos = horaAtual * 60 + minutoAtual;

            let professor = '. . .'; 

            for (let disciplina of jsonData) {
                //coloca o horario em minutos para melhor aproveitamento de dados se o dia da maquina for o mesmo do json
                if (disciplina.dia === diaAtual) {
                  const [inicio, fim] = disciplina.horario.split(' às ').map(h => {
                    const [hPart, mPart] = h.split(':').map(Number);
                    return hPart * 60 + mPart;
                  });
        
                  if (horaMinutos >= inicio && horaMinutos <= fim) {
                    professor = disciplina.professor;
                    break;
                  }
                
                }
              }
              prof.textContent = professor;
        })
}


