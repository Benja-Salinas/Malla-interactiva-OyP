document.addEventListener('DOMContentLoaded', function() {
    const mallaData = [
        // Nivel 1
        { nivel: 1, id: "BB", nombre: "BASES BIOLOGICAS Y BIOQUIMICAS", prerequisitos: [] },
        { nivel: 1, id: "AH", nombre: "ANATOMIA E HISTOLOGIA GENERAL Y DEL SISTEMA GENITAL", prerequisitos: [] },
        { nivel: 1, id: "COE1", nombre: "COMUNICACION ORAL Y ESCRITA I", prerequisitos: [] },
        { nivel: 1, id: "Q", nombre: "QUIMICA", prerequisitos: [] },
        { nivel: 1, id: "IP", nombre: "INTRODUCCION A LA PROFESION", prerequisitos: [] },
        { nivel: 1, id: "AC", nombre: "ANTROPOLOGIA CULTURAL", prerequisitos: [] },
        { nivel: 1, id: "SP", nombre: "SALUD PUBLICA", prerequisitos: [] },
        { nivel: 1, id: "IE1", nombre: "IDIOMA EXTRANJERO I", prerequisitos: [] },
        // Nivel 2
        { nivel: 2, id: "COE2", nombre: "COMUNICACION ORAL Y ESCRITA II", prerequisitos: ["COE1"] },
        { nivel: 2, id: "F", nombre: "FISIOLOGIA", prerequisitos: [] },
        { nivel: 2, id: "BD", nombre: "BIOESTADISTICA DESCRIPTIVA", prerequisitos: [] },
        { nivel: 2, id: "PE", nombre: "PSICOLOGIA EVOLUTIVA", prerequisitos: ["AC"] },
        { nivel: 2, id: "IE2", nombre: "IDIOMA EXTRANJERO II", prerequisitos: ["IE1"] },
        // Nivel 3
        { nivel: 3, id: "AA", nombre: "AUTOGESTION DEL APRENDIZAJE", prerequisitos: [] },
        { nivel: 3, id: "FP", nombre: "FISIOPATOLOGIA", prerequisitos: ["F"] },
        { nivel: 3, id: "M", nombre: "MICROBIOLOGIA", prerequisitos: ["BB"] },
        { nivel: 3, id: "E", nombre: "EMBRIOLOGIA", prerequisitos: ["AH", "BB"] },
        { nivel: 3, id: "FMQ", nombre: "FUNDAMENTOS MEDICO QUIRURGICOS", prerequisitos: ["F", "AH"] },
        { nivel: 3, id: "EP", nombre: "EPIDEMIOLOGIA", prerequisitos: ["BD", "SP"] },
        { nivel: 3, id: "IE3", nombre: "IDIOMA EXTRANJERO III", prerequisitos: ["IE2"] },
        { nivel: 3, id: "SM", nombre: "SALUD MENTAL", prerequisitos: ["PE"] },
        // Nivel 4
        { nivel: 4, id: "CMQ", nombre: "CLINICA MEDICO QUIRURGICA", prerequisitos: ["FMQ"] },
        { nivel: 4, id: "SFC", nombre: "SALUD FAMILIAR Y COMUNITARIA", prerequisitos: ["EP", "SP"] },
        { nivel: 4, id: "FAR", nombre: "FARMACOLOGIA", prerequisitos: ["FP", "Q"] },
        { nivel: 4, id: "TE", nombre: "TRABAJO EN EQUIPO Y DESARROLLO DE HABILIDADES SOCIALES", prerequisitos: ["IP", "AA"] },
        { nivel: 4, id: "O1", nombre: "OBSTETRICIA I", prerequisitos: ["M"] },
        { nivel: 4, id: "N1", nombre: "NEONATOLOGIA I", prerequisitos: ["FP", "AH", "E"] },
        { nivel: 4, id: "IE4", nombre: "IDIOMA EXTRANJERO IV", prerequisitos: ["FP", "IE3"] },
        // Nivel 5
        { nivel: 5, id: "G1", nombre: "GINECOLOGIA I", prerequisitos: ["F", "AH"] },
        { nivel: 5, id: "N2", nombre: "NEONATOLOGIA II", prerequisitos: ["N1"] },
        { nivel: 5, id: "O2", nombre: "OBSTETRICIA II", prerequisitos: ["O1"] },
        { nivel: 5, id: "IC1", nombre: "INTEGRACION CLINICA I", prerequisitos: ["N1", "O1", "CMQ"] },
        { nivel: 5, id: "CCS", nombre: "COMPRENSION DE CONTEXTOS SOCIALES", prerequisitos: ["COE2"] },
        { nivel: 5, id: "MI", nombre: "METODOLOGIA DE LA INVESTIGACION", prerequisitos: ["BD"] },
        { nivel: 5, id: "ML", nombre: "MEDICINA LEGAL", prerequisitos: ["IP"] },
        { nivel: 5, id: "B", nombre: "BIOETICA", prerequisitos: ["N1"] },
        { nivel: 5, id: "IE5", nombre: "IDIOMA EXTRANJERO V", prerequisitos: ["O1", "IE4"] },
        // Nivel 6
        { nivel: 6, id: "GS", nombre: "GESTION EN SALUD", prerequisitos: ["SP"] },
        { nivel: 6, id: "MI2", nombre: "MODULO INTEGRADOR", prerequisitos: ["N1", "O1", "F", "AH"] },
        { nivel: 6, id: "BI", nombre: "BIOESTADISTICAS INFERENCIAL", prerequisitos: ["BD", "AH"] },
        { nivel: 6, id: "CCC", nombre: "COMPRENSION DE CONTEXTOS CULTURALES", prerequisitos: ["CCS"] },
        { nivel: 6, id: "IE6", nombre: "IDIOMA EXTRANJERO VI", prerequisitos: ["IE5"] },
        // Nivel 7
        { nivel: 7, id: "IAP", nombre: "INVESTIGACION APLICADA A LA PROFESION", prerequisitos: ["BI", "MI"] },
        { nivel: 7, id: "N3", nombre: "NEONATOLOGIA III", prerequisitos: ["N2", "MI"] },
        { nivel: 7, id: "IC2", nombre: "INTEGRACION CLINICA II", prerequisitos: ["FAR", "B", "ML", "IC1", "O2", "N2", "G1"] },
        { nivel: 7, id: "O3", nombre: "OBSTETRICIA III", prerequisitos: ["O2"] },
        { nivel: 7, id: "ER", nombre: "ETICA Y RESPONSABILIDAD SOCIAL", prerequisitos: ["FAR", "CCC", "TE"] },
        { nivel: 7, id: "G2", nombre: "GINECOLOGIA II", prerequisitos: ["G1"] },
        { nivel: 7, id: "GP", nombre: "GESTION DE LA PROFESION", prerequisitos: ["FAR", "GS"] },
        { nivel: 7, id: "TC", nombre: "TERAPIAS COMPLEMENTARIAS", prerequisitos: ["O2", "N2", "G1"] },
        // Nivel 8
        { nivel: 8, id: "MES", nombre: "MUJER Y ENVEJECIMIENTO SALUDABLE", prerequisitos: ["G2"] },
        { nivel: 8, id: "GSFC", nombre: "GESTION Y SALUD FAMILIAR Y COMUNITARIA", prerequisitos: ["GP", "SFC"] },
        { nivel: 8, id: "RS", nombre: "RESPONSABILIDAD SOCIAL", prerequisitos: ["ER"] },
        // Nivel 9
        { nivel: 9, id: "IPRO", nombre: "INTERNADO PROFESIONAL", prerequisitos: ["MES", "GSFC", "RS"] }
    ];

    const mallaContainer = document.getElementById('malla-curricular');
    let aprobadas = new Set(JSON.parse(localStorage.getItem('aprobadas')) || []);

    function renderizarMalla() {
        mallaContainer.innerHTML = '';
        const maxNivel = Math.max(...mallaData.map(a => a.nivel));

        for (let i = 1; i <= maxNivel; i++) {
            const nivelColumna = document.createElement('div');
            nivelColumna.classList.add('nivel-columna');
            const nivelTitulo = document.createElement('div');
            nivelTitulo.classList.add('nivel-titulo');
            nivelTitulo.textContent = `Nivel ${i}`;
            nivelColumna.appendChild(nivelTitulo);

            const asignaturasNivel = mallaData.filter(a => a.nivel === i);

            asignaturasNivel.forEach(asignatura => {
                const asignaturaDiv = document.createElement('div');
                asignaturaDiv.classList.add('asignatura');
                asignaturaDiv.dataset.id = asignatura.id;

                const nombre = document.createElement('div');
                nombre.classList.add('asignatura-nombre');
                nombre.textContent = asignatura.nombre;
                asignaturaDiv.appendChild(nombre);

                if (asignatura.prerequisitos.length > 0) {
                    const prereq = document.createElement('div');
                    prereq.classList.add('asignatura-prerequisito');
                    prereq.textContent = `Req: ${asignatura.prerequisitos.join(', ')}`;
                    asignaturaDiv.appendChild(prereq);
                }
                
                asignaturaDiv.addEventListener('click', () => toggleAprobada(asignatura.id, asignaturaDiv));
                nivelColumna.appendChild(asignaturaDiv);
            });
            mallaContainer.appendChild(nivelColumna);
        }
        actualizarEstados();
    }

    function actualizarEstados() {
        mallaData.forEach(asignatura => {
            const div = document.querySelector(`.asignatura[data-id='${asignatura.id}']`);
            if (!div) return;

            const prerequisitosCumplidos = asignatura.prerequisitos.every(prereq => aprobadas.has(prereq));
            
            div.classList.remove('aprobada', 'desbloqueada', 'bloqueada', 'desbloqueo-animacion');

            if (aprobadas.has(asignatura.id)) {
                div.classList.add('aprobada');
            } else if (prerequisitosCumplidos) {
                if (!div.classList.contains('desbloqueada')) {
                     div.classList.add('desbloqueo-animacion');
                }
                div.classList.add('desbloqueada');
            } else {
                div.classList.add('bloqueada');
            }
        });
    }

    function toggleAprobada(id, element) {
        const asignatura = mallaData.find(a => a.id === id);
        const prerequisitosCumplidos = asignatura.prerequisitos.every(prereq => aprobadas.has(prereq));

        if (!prerequisitosCumplidos && !aprobadas.has(id)) {
            alert('Debes aprobar los prerrequisitos primero.');
            return;
        }

        if (aprobadas.has(id)) {
            aprobadas.delete(id);
        } else {
            aprobadas.add(id);
        }

        localStorage.setItem('aprobadas', JSON.stringify([...aprobadas]));
        actualizarEstados();
    }
    
    renderizarMalla();
});
