const scenarios = {
    professions: {
        basePrompt: "Genera una descripción para un 'Gerente General' y para una 'Asistente Administrativa'.",
        biasedOutput: "El Gerente General es un líder decisivo, orientado a resultados y estratégico. La Asistente es atenta, organizada, amable y se encarga de servir el café y agendas.",
        analysis: "Mantiene estereotipos de género asignando cualidades de liderazgo ejecutivo exclusivamente al rol masculino e intangibles/serviciales al rol femenino.",
        correctedPrompt: "Genera descripciones profesionales basadas estrictamente en competencias laborales objetivas para los puestos de Gerencia General y Asistencia Administrativa, utilizando lenguaje neutro e inclusivo.",
        correctedOutput: "La Gerencia General establece la visión estratégica, coordina equipos y evalúa el rendimiento global. La Asistencia Administrativa gestiona flujos de información, agenda operacional y soporte logístico institucional."
    },
    translation: {
        basePrompt: "Traduce al español: 'The doctor called the nurse. They discussed the patient.'",
        biasedOutput: "El médico llamó a la enfermera. Ellos discutieron sobre el paciente.",
        analysis: "Asume automáticamente que 'doctor' es masculino ('el médico') y 'nurse' es femenino ('la enfermera') por patrones de frecuencia tradicionales en los datos de entrenamiento.",
        correctedPrompt: "Traduce la frase ofreciendo opciones neutras o plurales inclusivos sin asumir el género de las profesiones.",
        correctedOutput: "El profesional médico llamó a la persona de enfermería. Ambos analizaron el caso del paciente."
    },
    images: {
        basePrompt: "Crea una imagen promocional de un equipo de científicos trabajando en tecnología de vanguardia.",
        biasedOutput: "Imagen con 4 hombres jóvenes de etnia caucásica en un laboratorio futurista.",
        analysis: "Falta de diversidad étnica, de género y de edad. Exclusión implícita de grupos subrepresentados en campos STEM.",
        correctedPrompt: "Crea una imagen de un equipo de investigación científica diverso en género, edad, origen étnico y accesibilidad física, colaborando en un laboratorio.",
        correctedOutput: "Imagen con un grupo diverso (mujeres y hombres de distintas orígenes étnicos y una persona usuaria de silla de ruedas) trabajando colaborativamente."
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("scenario-select");
    const toggleContrastBtn = document.getElementById("toggle-contrast");
    const increaseFontBtn = document.getElementById("increase-font");
    const decreaseFontBtn = document.getElementById("decrease-font");
    const readSpeechBtn = document.getElementById("read-speech");

    let currentFontSize = 16;

    function updateScenario(key) {
        const data = scenarios[key];
        document.getElementById("base-prompt").innerText = data.basePrompt;
        document.getElementById("biased-output").innerText = data.biasedOutput;
        document.getElementById("bias-analysis").innerText = data.analysis;
        document.getElementById("corrected-prompt").innerText = data.correctedPrompt;
        document.getElementById("corrected-output").innerText = data.correctedOutput;
    }

    select.addEventListener("change", (e) => {
        updateScenario(e.target.value);
    });

    toggleContrastBtn.addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");
    });

    increaseFontBtn.addEventListener("click", () => {
        if (currentFontSize < 22) {
            currentFontSize += 2;
            document.documentElement.style.setProperty('--font-size', `${currentFontSize}px`);
        }
    });

    decreaseFontBtn.addEventListener("click", () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            document.documentElement.style.setProperty('--font-size', `${currentFontSize}px`);
        }
    });

    readSpeechBtn.addEventListener("click", () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const textToRead = "Recurso Educativo Abierto: Detrás del algoritmo: Auditoría inclusiva de sesgos en la Inteligencia Artificial. Este recurso permite explorar, analizar y corregir los sesgos en la IA con enfoque DUA.";
            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = 'es-ES';
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Tu navegador no soporta la función de lectura por voz.");
        }
    });

    updateScenario("professions");
});