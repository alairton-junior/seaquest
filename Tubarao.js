class Tubarao {
    constructor(x, y, direcao, estado) {
        this.x = x;
        this.y = y; 
        this.direcao = direcao;
        this.toDelete = false;
        this.colidiu = estado;
        this.powerUp = false;
    }

    render() {
        if(!this.toDelete) {
            if(this.direcao == 'LEFT') {
                image(tubarao_left, this.x, this.y);
            } else {
                image(tubarao_right, this.x, this.y);
            }
        } 
        if(!this.colidiu) {
            if(this.direcao == 'RIGHT') {
                this.x+=3;
            } else {
              this.x-=3;
            }
        }

        if(this.powerUp) {
            if(frameCount % 5 == 0) {
                if(this.direcao == 'LEFT') {
                    image(tubarao_left_effect, this.x, this.y);
                } else {
                    image(tubarao_right_effect, this.x, this.y);
                }
            }  
        }
    }

    delete() {
        this.toDelete = true;
        this.x = 700;
        this.y = 700;
    }

    colidir() {
        this.colidiu = true;
    }

}