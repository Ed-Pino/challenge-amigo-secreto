// app.js
// Array para almacenar los nombres de los participantes
let participants = [];

const participantNameInput = document.getElementById('amigo');
const participantList = document.getElementById('listaAmigos');
const resultsList = document.getElementById('resultado');

// Función para agregar un participante
function agregarAmigo() {
  const name = participantNameInput.value.trim();
  if (name !== "") {
      participants.push(name);
      console.log(`Added participant: ${name}`);
    participantNameInput.value = ""; //limpiar el input
    updateParticipantList();
  } else {
    alert("Por favor ingrese el nombre del participante.");
  }
}

// funcion para actualizar la lista de participantes en el HTML
function updateParticipantList() {
    participantList.innerHTML = ""; // limpiar la lista
    participants.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        participantList.appendChild(li);
    });
}

// Funccion para realizar el sorteo
function sortearAmigo() {
    if (participants.length < 2) {
        alert("Nesecitas al menos 2 participantes pare jugar.");
        return;
    }

    // 1. cear una copia aleatoria de los participantes
    const shuffledParticipants = [...participants];
    for (let i = shuffledParticipants.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
    }

  // 2. crear las parejas
    const assignments = {};
    for (let i = 0; i < participants.length; i++) {
       // The person at index i gets paired with the person at index i + 1.  If we're at the end, we wrap around.
        assignments[participants[i]] = shuffledParticipants[(i + 1) % participants.length];
    }


    console.log("Secret Santa Assignments:", assignments);

    displayResults(assignments);
}

// Funccion para mostrar los resultados
function displayResults(assignments) {
    resultsList.innerHTML = ""; // limpiar la lista
    if(assignments){
         for (const giver in assignments) {
          const receiver = assignments[giver];
          const li = document.createElement('li');
          li.textContent = `${giver} le da regalo a ${receiver}`;
          resultsList.appendChild(li);
        }
    }
}