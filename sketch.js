var sub, tub, nad;
var vetorTiros = [];
var vetorTubaroes = [];
var vetorNadadores = [];
var pontuacao = 0;
var colisaoTubSub = false;
var play = false;
var gameover = false;
var temporizador = 0;
var button;

function preload() {
  submarino_right = loadImage("assets/submarino.png");
  submarino_left = loadImage("assets/submarino2.png");
  tubarao_right = loadImage("assets/tubarao.png");
  tubarao_left = loadImage("assets/tubarao2.png");
  footer = loadImage("assets/footer.png");
  header = loadImage("assets/header.png");
  pontuacaoFont = loadFont("assets/PressStart2P.ttf");
  nadador_left = loadImage("assets/nadador.png");
  nadador_right = loadImage("assets/nadador2.png");
}

function stop() {
  if (!play) {
    button = createButton("JOGAR");
    button.position(650, 300);
    button.mousePressed(playSeaquest);
    fill(255);
    rect(200, 200, 200, 150);
    fill(0);
    text("Seaquest", 300, 250);
    noLoop();
  }
}

function playSeaquest() {
  play = true;
  loop();
  removeElements();
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  textAlign(CENTER);
  textFont(pontuacaoFont);
  textSize(24);
  noStroke();

  // Instanciando
  sub = new Submarino(200, 200, false);
  nad = new Nadador(200, 300, "LEFT");

  // Renderizando tubarões em um intervalo de tempo
  setInterval(gerarTubarao, 2000);
  setInterval(gerarNadador, 6000);
}

function playAgain() {
  removeElements();
  pontuacao = 0;
  temporizador = 0;
  colisaoTubSub = false;
  gameover = false;
  vetorTiros = [];
  vetorTubaroes = [];
  vetorNadadores = [];
  sub = new Submarino(200, 200, false);
  loop();
}

function gerarTubarao() {
  if (focused && !colisaoTubSub) {
    var direcaoTubarao = Math.floor(random(0, 2));
    if (direcaoTubarao == 0) {
      tub = new Tubarao(0, random(160, 440), "RIGHT", false);
    } else {
      tub = new Tubarao(600, random(160, 440), "LEFT", false);
    }

    vetorTubaroes.push(tub);
  }
}

function gameOver() {
  if (gameover) {
    button = createButton("JOGAR NOVAMENTE");
    button.position(610, 300);
    button.mousePressed(playAgain);
    fill(255);
    rect(200, 200, 200, 150);
    fill(0);

    text("GAMEOVER", 300, 250);
    textSize(16);
    text("Score: " + pontuacao, 300, 275);
    noLoop();
  } else {
  }
}

function gerarNadador() {
  if (focused && !colisaoTubSub) {
    var direcaoNadador = Math.floor(random(0, 2));
    if (direcaoNadador == 0) {
      nad = new Nadador(0, random(160, 440), "RIGHT");
    } else {
      nad = new Nadador(600, random(160, 440), "LEFT");
    }

    vetorNadadores.push(nad);
  }
}

function draw() {
  background(0, 24, 140);
  image(footer, 300, 545);
  image(header, 300, 55);

  //Renderizando Submarino
  sub.render();
  stop();
  tempo();
  colisaoTubaroes();
  colisaoNadador();
  disparosSubmarino();
  gameOver();
  fill(255);
  textSize(20);
  text(pontuacao, 300, 35);
}

function keyPressed() {
  // Atirar -> Chama o método atirar do objeto submarino
  if (key == " ") {
    sub.atirar();
  }
}

function tempo() {
  fill(150, 39, 6);
  rect(150, 555, 300, 20);
  fill(255);
  rect(150, 555, temporizador, 20);

  if (!gameover) {
    if (temporizador < 0) {
      temporizador = 0;
    }

    if (temporizador <= 300) {
      temporizador += 0.2;
    }
  }

  if (temporizador >= 300) {
    gameover = true;
  }
}

function disparosSubmarino() {
  // Renderizar Tiros
  for (let i = 0; i < vetorTiros.length; i++) {
    fill(216, 211, 43);
    rect(vetorTiros[i].x, vetorTiros[i].y, 20, 5);
    //Condicional para definir posicao do tiro
    if (vetorTiros[i].z == "LEFT") {
      vetorTiros[i].x -= 9;
    } else if (vetorTiros[i].z == "RIGHT") {
      vetorTiros[i].x += 9;
    }
  }

  // Colisão Tiro e Tubarão
  for (let i = 0; i < vetorTiros.length; i++) {
    for (let j = 0; j < vetorTubaroes.length; j++) {
      if (
        vetorTubaroes[j].y >= vetorTiros[i].y - tubarao_left.height / 2 &&
        vetorTubaroes[j].y <= vetorTiros[i].y + tubarao_left.height / 2 &&
        vetorTubaroes[j].x >= vetorTiros[i].x - tubarao_left.width / 2 &&
        vetorTubaroes[j].x <= vetorTiros[i].x + tubarao_left.width / 2
      ) {
        vetorTubaroes[j].delete();
        vetorTiros[i].x = 600;
        pontuacao += 50;
        temporizador -= 5;
      }
    }
  }

  // Remover posicao do tiro quando ele sai da tela.
  for (let i = 0; i < vetorTiros.length; i++) {
    if (vetorTiros[i].x >= 600 || vetorTiros[i].x <= 0) {
      vetorTiros.splice(i, 1);
    }
  }
}

function colisaoTubaroes() {
  // Colisao Submarino x Tubarao
  for (let j = 0; j < vetorTubaroes.length; j++) {
    if (
      vetorTubaroes[j].y >= sub.y - submarino_left.height / 2 &&
      vetorTubaroes[j].y <= sub.y + submarino_left.height / 2 &&
      vetorTubaroes[j].x >= sub.x - submarino_left.width / 2 &&
      vetorTubaroes[j].x <= sub.x + submarino_left.width / 2
    ) {
      sub.colidir();
      vetorTubaroes[j].colidir();
      colisaoTubSub = true;
      gameover = true;
    }
  }

  // Rendeziando tubaroes
  for (let i = 0; i < vetorTubaroes.length; i++) {
    vetorTubaroes[i].render();
  }
}

function colisaoNadador() {
  for (let j = 0; j < vetorNadadores.length; j++) {
    if (
      vetorNadadores[j].y >= sub.y - submarino_left.height / 2 &&
      vetorNadadores[j].y <= sub.y + submarino_left.height / 2 &&
      vetorNadadores[j].x >= sub.x - submarino_left.width / 2 &&
      vetorNadadores[j].x <= sub.x + submarino_left.width / 2
    ) {
      vetorNadadores[j].colidir();
      pontuacao += 100;
      temporizador -= 25;
    }
  }
  for (let i = 0; i < vetorNadadores.length; i++) {
    vetorNadadores[i].render();
  }
}
