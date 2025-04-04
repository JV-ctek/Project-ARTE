const sketches = [
    { 
        id: "-RG47tNtH", 
        code: "CYBER_PATTERNS_VAULT",
        sketch: function(p) {
            let len = 50, dir = 1;
            p.setup = function() {
                p.createCanvas(400, 400);
            };
            p.draw = function() {
                p.background(220);
                p.translate(100, 50);
                len += dir;
                if (len > 150 || len < 50) dir *= -1;
                for (let i = 0; i < 5; i++) {
                    p.push();
                    p.translate(i * 60, 0);
                    p.line(0, 0, 0, len + i * 10);
                    p.ellipse(0, len + i * 10, 20);
                    p.pop();
                }
            };
        }
    },
    { 
        id: "6AnsZwZJ8", 
        code: "NEURAL_TOPOGRAPHY",
        sketch: function(p) {
            p.setup = function() {
                p.createCanvas(600, 600);
                p.colorMode(p.HSB, 360, 100, 100);
                p.noFill();
                p.rectMode(p.CENTER);
            };
            p.draw = function() {
                p.background(0);
                p.translate(p.width / 2, p.height / 2);
                for (let i = 0; i < 50; i++) {
                    let size = i * 10 + p.sin(p.frameCount * 0.05) * 30;
                    p.stroke((i * 10 + p.frameCount) % 360, 90, 90);
                    p.strokeWeight(2);
                    p.rotate(p.radians(100));
                    p.rect(0, 0, size, size);
                }
            };
        }
    },
    { 
        id: "PBNU51c0S", 
        code: "QUANTUM_STRINGFLOW",
        sketch: function(p) {
            let colors = [];
            p.setup = function() {
                p.createCanvas(400, 400);
                p.noCursor();
                for (let i = 0; i < 10; i++) {
                    colors.push(p.color(p.random(255), p.random(255), p.random(255)));
                }
            };
            p.draw = function() {
                p.background(0, 50);
                for (let i = 0; i < colors.length; i++) {
                    p.fill(colors[i]);
                    p.ellipse(p.mouseX - i * 10, p.mouseY - i * 10, 20, 20);
                }
                colors.push(colors.shift());
            };
        }
    },
    { 
        id: "wepyN9PcS", 
        code: "OPTICAL_DECONSTRUCT",
        sketch: function(p) {
            let tiles = [];
            p.setup = function() {
                p.createCanvas(600, 600);
                p.colorMode(p.HSB);
                let size = 40;
                for (let x = 0; x < p.width; x += size) {
                    for (let y = 0; y < p.height; y += size) {
                        tiles.push({ x, y, hue: p.random(360), active: false });
                    }
                }
            };
            p.draw = function() {
                p.background(220);
                tiles.forEach(t => {
                    t.active = p.dist(p.mouseX, p.mouseY, t.x+20, t.y+20) < 20;
                    p.fill(t.hue, 80, t.active ? 100 : 60);
                    p.noStroke();
                    p.push();
                    p.translate(t.x+20, t.y+20);
                    t.active ? p.drawStar(0, 0, 15, 8) : p.rect(-10, -10, 20, 20, 5);
                    p.pop();
                });
            };
            p.drawStar = function(x, y, r, points) {
                p.beginShape();
                for (let i = 0; i < points * 2; i++) {
                    let angle = i * p.PI / points;
                    let rad = i % 2 === 0 ? r * 2 : r;
                    p.vertex(x + p.cos(angle) * rad, y + p.sin(angle) * rad);
                }
                p.endShape(p.CLOSE);
            };
        }
    },
    { 
        id: "YQgWM25yl", 
        code: "VECTOR_ECOSYSTEM",
        sketch: function(p) {
            p.setup = function() {
                p.createCanvas(400, 400);
            };
            p.draw = function() {
                p.background(220);
                p.translate(200, 50);
                for (let i = 0; i < 5; i++) {
                    let angle = p.sin(p.frameCount * 0.05 + i) * p.PI/3;
                    p.push();
                    p.rotate(angle);
                    p.drawHexagon(30);
                    p.translate(0, 60);
                    p.rotate(-angle * 2);
                    p.triangle(-15, 0, 15, 0, 0, 30);
                    p.pop();
                }
            };
            p.drawHexagon = function(size) {
                p.beginShape();
                for (let a = 0; a < p.TAU; a += p.TAU/6) {
                    p.vertex(size * p.cos(a), size * p.sin(a));
                }
                p.endShape(p.CLOSE);
            };
        }
    }
];

let currentSketch = null;
let bootCompleted = false;
let typewriterInterval;

function setup() {
    noCanvas(); // Prevent default canvas creation
    terminalBootSequence();
    setInterval(simulateCorruption, 1000);
}

// ... [Keep simulateCorruption, terminalBootSequence, typewriterEffect, createPrompt, skipBoot functions unchanged] ...

function loadSketch(sketchId) {
    if (currentSketch) {
        currentSketch.remove();
        currentSketch = null;
    }

    const sketchData = sketches.find(s => s.id === sketchId);
    if (!sketchData) return;

    document.getElementById('terminal').style.display = 'none';
    document.getElementById('crt').style.display = 'none';

    const sketchContainer = document.createElement('div');
    sketchContainer.id = 'sketch-container';
    document.body.appendChild(sketchContainer);

    const returnLink = document.createElement('div');
    returnLink.textContent = '[RETURN TO TERMINAL]';
    returnLink.style.cssText = 'position:fixed; top:10px; left:10px; color:#0f0; cursor:pointer; z-index:1000;';
    returnLink.onclick = () => location.reload();
    document.body.appendChild(returnLink);

    currentSketch = new p5(sketchData.sketch, sketchContainer);
}

function windowResized() {
    if (currentSketch) currentSketch.resizeCanvas(windowWidth, windowHeight);
}
