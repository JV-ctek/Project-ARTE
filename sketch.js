const sketches = [
    { id: "-RG47tNtH", code: "CYBER_PATTERNS_VAULT" },
    { id: "6AnsZwZJ8", code: "NEURAL_TOPOGRAPHY" },
    { id: "PBNU51c0S", code: "QUANTUM_STRINGFLOW" },
    { id: "wepyN9PcS", code: "OPTICAL_DECONSTRUCT" },
    { id: "YQgWM25yl", code: "VECTOR_ECOSYSTEM" }
];

let bootCompleted = false;
let typewriterInterval;

function setup() {
    createCanvas(windowWidth, windowHeight).hide();
    terminalBootSequence();
    setInterval(simulateCorruption, 1000);
}

function simulateCorruption() {
    const texts = document.querySelectorAll('.prompt');
    texts.forEach(text => {
        if(Math.random() < 0.15) {
            text.innerHTML = text.innerHTML.replace(/[A-Z0-9]/g, 
                c => Math.random() > 0.8 ? String.fromCharCode(33 + Math.random()*94) : c);
        }
    });
}

function terminalBootSequence() {
    const term = document.getElementById('terminal');
    let lines = [
        "INITIALIZING Mjölnir OS v7.4.3...",
        "MOUNTING /dev/artifacts...",
        "✓ LOADED Tycho AI Module",
        "ACCESS LEVEL: BLACK OPERATIVE",
        `${sketches.length} ARTIFACTS DETECTED IN ARCHIVES:`
    ];

    sketches.forEach((sketch, i) => {
        lines.push(`${i+1}. [${sketch.code}] <-- ${"■".repeat(3+i%3)}-->`);
    });

    lines.push("\nSELECT ARTIFACT >");
    
    typewriterEffect(lines.join('\n'), term, () => {
        sketches.forEach(createPrompt);
        bootCompleted = true;
        document.getElementById('skip').style.display = 'none';
    });
}

function typewriterEffect(text, container, callback) {
    let index = 0;
    typewriterInterval = setInterval(() => {
        container.innerHTML = text.substring(0, index) + (index % 2 ? '_' : '');
        if(index++ >= text.length) {
            clearInterval(typewriterInterval);
            if(callback) callback();
        }
    }, 30);
}

function createPrompt(sketch) {
    const prompt = document.createElement('div');
    prompt.className = 'prompt';
    prompt.innerHTML = `./access --artifact=${sketch.code}`;
    prompt.onclick = () => loadSketch(sketch.id);
    document.getElementById('terminal').appendChild(prompt);
}

function skipBoot() {
    if (!bootCompleted) {
        clearInterval(typewriterInterval);
        const term = document.getElementById('terminal');
        term.innerHTML = '';
        sketches.forEach(createPrompt);
        bootCompleted = true;
        document.getElementById('skip').style.display = 'none';
    }
}

function loadSketch(sketchId) {
    document.body.innerHTML = `
        <div id="crt"></div>
        <div style="position:fixed; top:10px; left:10px; color:#0f0; cursor:pointer; z-index:1000;" 
             onclick="location.reload()">
            [RETURN TO TERMINAL]
        </div>
        <iframe src="https://editor.p5js.org/JVA/embed/${sketchId}?nofooter=true"
                style="width:100vw; height:100vh; border:none; position:fixed; top:0; left:0;">
        </iframe>
    `;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
