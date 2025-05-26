const apiUrl = "http://44.199.253.0/api/devices";

// Variable global para guardar la IP pública
let ipPublica = "";

// Función para obtener la IP pública
async function obtenerIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (response.ok) {
            const data = await response.json();
            ipPublica = data.ip;
            console.log('IP Pública obtenida:', ipPublica);
        } else {
            console.error('Error al obtener IP pública:', response.statusText);
        }
    } catch (error) {
        console.error('Error de conexión al obtener IP pública:', error);
    }
}

// Función para enviar un comando
async function sendCommand(command) {
    const data = {
        ip: ipPublica || "192.168.100.12", // usa la IP pública si está disponible, si no, una IP de respaldo
        name: "Victor Gabriel Gutierrez Hernandez",
        status: command
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log("Comando enviado exitosamente:", command);
            updateMovement(command);
        } else {
            console.error("Error al enviar comando:", response.statusText);
            updateMovement("Error al enviar");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        updateMovement("Error de conexión");
    }
}

// Función para actualizar la acción mostrada en pantalla
function updateMovement(action) {
    const currentAction = document.getElementById("currentAction");
    currentAction.textContent = action;
}

// Cuando cargue la página, obtener la IP
window.addEventListener('load', obtenerIP);
