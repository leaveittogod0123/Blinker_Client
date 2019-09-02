

class Bird {
    constructor() {
        this.x = 100;
        this.y = height / 2;
        this.d = 30;
        this.a = 0.3;
        this.v = 0.1;
        this.va = 0;
        this.j = false;
    }

    die() {
        // this.y += this.v;
        // this.v += this.a;

        let gameDiv = document.querySelector('#gameContainer');
        gameDiv.style.display = 'block';
        gameDiv.style.zIndex = '1';
    }

    update() {
        let p = this.y + this.d / 2;
        if (p < height - 50 || this.j) {
            if (p != height - 50) {
                this.v += this.a + this.va;
            } else {
                this.v += this.va;
            }
            this.y += this.v;
            this.j = false;
        } else {
            this.y = height - 50 - this.d / 2;
        }
        if (this.va < 0) {
            this.va += 0.3;
        } else {
            this.va = 0;
        }
    }

    jump() {
        this.j = true;
        this.va = -2;
        this.v = 0;
    }

    show() {
        fill(200);
        noStroke();
        circle(this.x, this.y, this.d);
    }
}

class Pipe {
    constructor(x) {
        this.topY = random(height / 4, height / 2);
        this.botY = this.topY + random(130, 180);
        this.x = x;
        this.w = 50;
    }

    update() {
        this.x -= 2.5;
    }

    coll(bird) {
        let dx = bird.d / 2;
        let lw = this.x + this.w;
        if (
            (bird.x + dx >= this.x && bird.x + dx <= lw) ||
            (bird.x - dx <= lw && bird.x + dx >= lw)
        ) {
            if (bird.y - dx <= this.topY || bird.y + dx >= this.botY) {
                return true;
            }
        }

        return false;
    }

    show() {
        if (!death) {
            noStroke();
            fill(27, 201, 18);
            rect(this.x, 0, this.w, this.topY);
            rect(this.x, this.botY, this.w, height - this.botY);
        }
    }
}

class Star {
    constructor(w) {
        this.y = random(0, height - 200);
        this.x = random(w, w + 100);
    }

    update() {
        this.x -= 1.5;
    }

    show() {
        fill(255);
        circle(this.x, this.y, 3);
    }
}

// ---------------------------------

let bird;
let pipes = [];
let stars = [];
let death = false;
let score = 0;
let pas = false;

function setup() {
    createCanvas(700, 500);
    bird = new Bird();
    pipes.push(new Pipe(width));
}


function draw() {
    if (death === false) {
        background(28, 39, 165);
        if (frameCount % 100 == 0) {
            for (let i = 0; i < 10; i++)
                stars.push(new Star(width));
        }
        if (frameCount % 175 == 0) {
            pipes.push(new Pipe(width));
        }
        let sc = 0;
        for (let star of stars) {
            if (!death) star.update();
            if (star.x <= 0) {
                stars.splice(sc, 1);
            }
            sc++;
            star.show();
        }
        for (let c = 0; c < pipes.length; c++) {
            if (!death) pipes[c].update();
            if (pipes[c].x + pipes[c].w < 0) {
                pipes.splice(c, 1);
                pas = false;
            }
            pipes[c].show();
        }
        if (!death && pipes[0].coll(bird)) {
            death = true;
        }
        if (!death) {
            bird.update();
            if (bird.x - bird.d / 2 > pipes[0].x + pipes[0].w && !pas) {
                score++;
                pas = true;
            }
        } else {
            // username, score, gametype(어떤 게임인지)
            let cookie = document.cookie;

            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(getDataFromCookie(cookie)), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => console.log('Success:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));

            bird.die();
        }

        fill(255);
        textSize(36);
        text('' + score, 40, 50);

        bird.show();
        fill(200, 100, 0);

        rect(0, height - 50, width, 50);
    }
}

function keyPressed() {
    if (key === ' ' && !death) {
        bird.jump();
    }
    if (key == 'p') {
        noLoop();
    }
}


function respawn() {
    pipes = [];
    stars = [];
    score = 0;
    bird = new Bird();
    pipes.push(new Pipe(width));
}

// 추가한 코드

const getDataFromCookie = (cookie) => {
    const cookies = data.split(';');
    let obj = {
        username: '',
        score: 0,
        gametype: ''
    };

    for (const item of cookies) {
        const temp = item.split('=');
        switch (temp[0]) {
            case 'username':
                obj.username = temp[1];
                break;
            case 'gametype':
                obj.gametype = temp[1];
                break;
        }
    }

    obj.score = document.queryselector('#flappy-score');

    return obj;
};

