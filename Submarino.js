class Submarino {
    constructor(nx, ny, estado) {
        this.x = nx;
        this.y = ny;
        this.direcao = 'RIGHT';
        this.colidiu = estado;

    }

    render() {
        // Movimentação Interativa com Setas 
        if(!this.colidiu) {
            if(keyIsPressed && keyCode === 40 && this.y <= 460) {
                this.y+=3;
            }
            if(keyIsPressed && keyCode === 38 && this.y >= 140) {
                this.y-=3;
            }
            if(keyIsPressed && keyCode === 37 && this.x >= 70) {
                this.x-=3;
                this.direcao = 'LEFT';     
            }
            if(keyIsPressed && keyCode === 39 && this.x <= 530) {
                this.x+=3;
                this.direcao = 'RIGHT';
            }
        }
        fill(0);
        if(this.direcao == 'LEFT') {
            image(submarino_left, this.x, this.y);
        } else {
            image(submarino_right, this.x, this.y);
        }
        
    }

    atirar() {
        if(!this.colidiu) {
            vetorTiros.push(createVector(this.x, this.y+7, this.direcao));
        }
    }

    colidir() {
        this.colidiu = true;
    }
}