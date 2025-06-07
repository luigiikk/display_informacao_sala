# UNIVERSIDADE DO ESTADO DA BAHIA – UNEB  
## DEPARTAMENTO DE CIÊNCIAS EXATAS E DA TERRA – DCET  
### CURSO DE ENGENHARIA DE SOFTWARE  

# DOCUMENTAÇÃO DO SISTEMA DE DISPLAY DE INFORMAÇÕES DE SALA

*Autores:*  
Maria Eduarda Pastore, João Cleber, Luigi Matheus, Paulo Matheus, João Filipe, Alessandra, Yude Lima, Leoman Cássio, Cauane Galdino, Leonardo Santos, Pedro Paulo, Natan Luz  

*Professor:*  
Marcos Figueiredo  

*Data:*  
Maio de 2025  

---

## 1. INTRODUÇÃO

Este documento apresenta a documentação técnica do sistema de exibição de informações de salas de aula da Universidade do Estado da Bahia (UNEB). O projeto visa criar uma interface digital para informar, em tempo real, a ocupação, uso e disponibilidade das salas, com base em dados extraídos de um arquivo JSON.

---

## 2. OBJETIVO

Oferecer um painel de informações atualizado em cada sala, utilizando um sistema leve, com dados centralizados em arquivos JSON definidos pela própria universidade, evitando a necessidade de bancos de dados relacionais e garantindo maior segurança e controle local.

---

## 3. REQUISITOS FUNCIONAIS

- *RF01*: Exibir nome da disciplina, professor, curso, departamento e horário da aula.  
- *RF02*: Calcular e mostrar o tempo restante da aula.  
- *RF03*: Indicar a capacidade da sala e número de alunos presentes.  
- *RF04*: Exibir a próxima aula e seu horário.  
- *RF05*: Indicar status da aula (em andamento, finalizada, vaga etc).  
- *RF06*: Obter todas as informações a partir de um arquivo JSON local.

---

## 4. REQUISITOS NÃO FUNCIONAIS

- *RNF01*: Utilizar apenas tecnologias de fácil manutenção, como arquivos JSON e JavaScript/React.  
- *RNF02*: Interface responsiva e otimizada para tela Full HD.  
- *RNF03*: Atualização automática de status e tempo em tempo real com uso de relógio local.

---

## 5. ARQUITETURA DO SISTEMA

A aplicação segue um modelo estático-dinâmico híbrido, com back-end simplificado em forma de arquivo JSON.

| Camada          | Tecnologia                                      |
|-----------------|-------------------------------------------------|
| Interface       | HTML5, Tailwind e/ou CSS, JS                    |
| Fonte de Dados  | Arquivo .json local com os dados da programação da sala |

---

## 6. INTERFACE DO USUÁRIO

### 6.1 Cabeçalho
- Nome da sala  
- Hora atual em tempo real

### 6.2 Aula Atual
- Dados extraídos do JSON: disciplina, professor, curso, horário  
- Status da aula calculado dinamicamente (ex: “Aula em andamento”)

### 6.3 Indicadores
- Capacidade x alunos presentes  
- Tempo restante até o fim da aula (calculado com base no relógio do dispositivo)

### 6.4 Próxima Aula
- Disciplina e horário de início da próxima aula (também vindo do JSON)

---

## 7. FUNCIONAMENTO DO SISTEMA

1. O JSON com a programação da sala é atualizado manual ou automaticamente por responsáveis da universidade.  
2. O sistema lê o JSON ao carregar a página.  
3. Com base na hora local, calcula o status da aula e o tempo restante.  
4. O painel exibe os dados e se atualiza automaticamente sem recarregar a página.

---

## 8. CONCLUSÃO

A adoção de um sistema baseado em arquivo JSON garante maior controle interno à universidade, facilita a manutenção, evita problemas com permissões de banco de dados e fornece uma solução leve e eficaz para exibição de informações em tempo real nas salas de aula.

---

## 9. REFERÊNCIAS

- ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. NBR 14724:2011 – Trabalhos acadêmicos.  
- JSON.org. Introdução ao formato JSON. [https://www.json.org/json-pt.html](https://www.json.org/json-pt.html)
