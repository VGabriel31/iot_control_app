const apiUrl = "http://3.235.153.247/api/devices";
let ipPublica = "";
let comandos = [];

// Obtener IP al cargar la página
window.addEventListener('load', obtenerIP);

// Función para obtener IP pública
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

// Función para agregar comandos a la lista (máximo 10)
function sendCommand(command) {
    if (comandos.length < 10) {
        comandos.push(command);
        mostrarComandos();
    } else {
        alert("Máximo 10 comandos permitidos.");
    }
}

// Mostrar comandos en pantalla
function mostrarComandos() {
    const div = document.getElementById("currentAction");
    if (comandos.length === 0) {
        div.textContent = "Esperando orden...";
    } else {
        div.innerHTML = "Comandos seleccionados: " + comandos.join(" ➜ ");
    }
}

// Ejecutar comandos uno por uno
function ejecutarComandos() {
    if (comandos.length === 0) {
        alert("No hay comandos para ejecutar.");
        return;
    }

    let i = 0;
    const intervalo = setInterval(async () => {
        if (i >= comandos.length) {
            clearInterval(intervalo);
            comandos = [];
            mostrarComandos();
            return;
        }

        const comando = comandos[i];
        await enviarComando(comando);
        updateMovement(`Ejecutando: ${comando}`);
        i++;
    }, 1000);
}

// Enviar comando a la API (POST)
async function enviarComando(command) {
    const data = {
        ip: ipPublica || "192.168.100.12",
        name: "Mariana Mendoza",
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
        } else {
            console.error("Error al enviar comando:", response.statusText);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}

// Actualizar visualización del comando actual
function updateMovement(action) {
    const currentAction = document.getElementById("currentAction");
    currentAction.textContent = action;
}

// Borrar todos los comandos
function borrarComandos() {
    comandos = [];
    mostrarComandos();
}
