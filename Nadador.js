class Nadador {
    constructor(x, y, direcao) {
        this.x = x;
        this.y = y; 
        this.direcao = direcao;
        this.toDelete = false;
        this.colidiu = false;
    }

    render() {
        if(!this.toDelete) {
            if(this.direcao == 'LEFT') {
                image(nadador_left, this.x, this.y);
            } else {
                image(nadador_right, this.x, this.y);
            }
        } 
        if(!this.colidiu) {
            if(this.direcao == 'RIGHT') {
                this.x+=2;
            } else {
              this.x-=2;
            }
        }
    }

    colidir() {
        this.toDelete = true;
        this.x = 700;
    }
}