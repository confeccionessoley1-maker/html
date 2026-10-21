
document.addEventListener("DOMContentLoaded", function() {
    const formWhatsApp = document.getElementById('form-whatsapp');

    if(formWhatsApp) {
        formWhatsApp.addEventListener('submit', function(event) {
            event.preventDefault(); 

           
            const nombre = document.getElementById('nombre').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;

            
            const telefono = "573143103466"; 

           
            const textoMensaje = `¡Hola Confecciones Soley! 🪡✨%0A%0ASoy *${nombre}*.%0A%0A*Me interesa:* ${asunto}%0A*Mensaje:* ${mensaje}%0A%0A¡Quedo atent@ a su respuesta!`;

         
            const urlWhatsApp = `https://wa.me/${telefono}?text=${textoMensaje}`;
            window.open(urlWhatsApp, '_blank');
        });
    }
});
/* LÓGICA DEL CARRUSEL */
let indiceCarrusel = 0;

function mostrarCarrusel(n) {
    let slides = document.getElementsByClassName("carrusel-slide");
    if (!slides.length) return;
    
    if (n >= slides.length) { indiceCarrusel = 0; }
    if (n < 0) { indiceCarrusel = slides.length - 1; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("activa");
    }
    slides[indiceCarrusel].classList.add("activa");
}

function moverCarrusel(n) {
    mostrarCarrusel(indiceCarrusel += n);
}

// Auto-play del carrusel cada 4 segundos
setInterval(() => {
    let slides = document.getElementsByClassName("carrusel-slide");
    if (slides.length) {
        moverCarrusel(1);
    }
}, 4000);


/* LÓGICA DEL ASISTENTE AI */
function toggleChat() {
    const body = document.getElementById("ai-body");
    const icon = document.getElementById("ai-toggle-icon");
    if (body.style.display === "none") {
        body.style.display = "flex";
        icon.textContent = "▼";
    } else {
        body.style.display = "none";
        icon.textContent = "▲";
    }
}

function manejarEnterAI(event) {
    if (event.key === "Enter") {
        enviarMensajeAI();
    }
}

function enviarMensajeAI() {
    const input = document.getElementById("ai-input");
    const texto = input.value.trim();
    if (texto === "") return;

    const messages = document.getElementById("ai-messages");

    // Mensaje del usuario
    const msgUser = document.createElement("p");
    msgUser.className = "ai-msg-user";
    msgUser.textContent = texto;
    messages.appendChild(msgUser);
    input.value = "";

    // Scroll al fondo
    messages.scrollTop = messages.scrollHeight;

    // Simulación de respuesta de IA basada en palabras clave
    setTimeout(() => {
        const msgBot = document.createElement("p");
        msgBot.className = "ai-msg-bot";
        
        let respuesta = "Gracias por tu consulta. Si quieres un diseño personalizado o comprar, te recomiendo usar nuestro botón de WhatsApp.";
        const textoMin = texto.toLowerCase();
        
        if (textoMin.includes("precio") || textoMin.includes("valor") || textoMin.includes("cuanto")) {
            respuesta = "Nuestros gorros de satén cuestan $20,000 COP y las toallas de microfibra $16,000 COP. Las confecciones a medida se cotizan por WhatsApp.";
        } else if (textoMin.includes("tiempo") || textoMin.includes("demora")) {
            respuesta = "Los arreglos toman de 2 a 3 días, y las confecciones nuevas entre 7 y 15 días hábiles.";
        } else if (textoMin.includes("pago") || textoMin.includes("pagar")) {
            respuesta = "Aceptamos Nequi, Daviplata, transferencias bancarias y efectivo contra entrega.";
        } else if (textoMin.includes("medida") || textoMin.includes("diseño")) {
            respuesta = "¡Nos encanta crear ropa sobre medida! Escríbenos por WhatsApp con tu idea para hacerte una cotización exacta.";
        }

        msgBot.textContent = respuesta;
        messages.appendChild(msgBot);
        messages.scrollTop = messages.scrollHeight;
    }, 800);
}