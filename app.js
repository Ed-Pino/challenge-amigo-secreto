// app.js

// Array to store participants' names
let participants = [];

const participantNameInput = document.getElementById('amigo');
const participantList = document.getElementById('listaAmigos');
const resultsList = document.getElementById('resultado');

// Function to add a participant
function agregarAmigo() {
  const name = participantNameInput.value.trim();
  if (name !== "") {
      participants.push(name);
      console.log(`Added participant: ${name}`);
    participantNameInput.value = ""; // Clear the input
    updateParticipantList();
  } else {
    alert("Please enter a valid name.");
  }
}

// Function to update the participants list in the HTML
function updateParticipantList() {
    participantList.innerHTML = ""; // Clear the list
    participants.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        participantList.appendChild(li);
    });
}

// Function to perform the secret santa draw
function sortearAmigo() {
    if (participants.length < 2) {
        alert("You need at least two participants for the draw.");
        return;
    }

    // 1. Create a shuffled copy of the participants array
    const shuffledParticipants = [...participants];
    for (let i = shuffledParticipants.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
    }

  // 2. Create the pairings
    const assignments = {};
    for (let i = 0; i < participants.length; i++) {
       // The person at index i gets paired with the person at index i + 1.  If we're at the end, we wrap around.
        assignments[participants[i]] = shuffledParticipants[(i + 1) % participants.length];
    }


    console.log("Secret Santa Assignments:", assignments);

    displayResults(assignments);
}

// Function to display the results
function displayResults(assignments) {
    resultsList.innerHTML = ""; // Clear previous results
    if(assignments){
         for (const giver in assignments) {
          const receiver = assignments[giver];
          const li = document.createElement('li');
          li.textContent = `${giver} le da regalo a ${receiver}`;
          resultsList.appendChild(li);
        }
    }
}