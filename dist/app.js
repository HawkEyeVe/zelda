"use strict";
class DivCreator {
    _div;
    constructor(id, divType = "div") {
        this._div = document.createElement(divType);
        this._div.id = id;
    }
    appendTo(element) {
        element.appendChild(this._div);
    }
    get div() {
        return this._div;
    }
    applyStyles(styles) {
        for (const [property, value] of Object.entries(styles)) {
            if (value !== undefined) {
                this._div.style.setProperty(property, value);
            }
        }
    }
    randomNumber(size) {
        return Math.floor(Math.random() * size);
    }
    createBox(size, color, positionX = this.randomNumber(350), positionY = this.randomNumber(350)) {
        this.applyStyles({
            width: `${size}px`,
            height: `${size}px`,
            background: color,
            position: "absolute",
            top: `${positionX}px`,
            left: `${positionY}px`,
        });
    }
}
class Player {
    player;
    appendTo;
    position;
    constructor(appendTo) {
        this.appendTo = appendTo;
        this.position = {
            x: 0,
            y: 0,
        };
        this.player = new DivCreator("player", "div");
        this.player.appendTo(this.appendTo);
        this.player.createBox(50, "red");
    }
    moveEvent(collision, object, object2) {
        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.position.y -= 10;
                    this.player.applyStyles({
                        top: `${this.position.y}px`,
                    });
                    break;
                case "ArrowDown":
                    this.position.y += 10;
                    this.player.applyStyles({
                        top: `${this.position.y}px`,
                    });
                    break;
                case "ArrowLeft":
                    this.position.x -= 10;
                    this.player.applyStyles({
                        left: `${this.position.x}px`,
                    });
                    break;
                case "ArrowRight":
                    this.position.x += 10;
                    this.player.applyStyles({
                        left: `${this.position.x}px`,
                    });
                    break;
            }
            collision.borderColision();
            object.objectColision(collision);
            object2.objectColision(collision);
        });
    }
}
class GameBoard {
    playableArea;
    player;
    object;
    constructor() {
        this.playableArea = new DivCreator("box", "div");
        this.playableArea.appendTo(document.body);
        this.playableArea.createBox(400, "green", 20, 20);
        this.object = new ObjectCreator(this.playableArea);
        this.player = new Player(this.playableArea.div);
    }
    borderColision() {
        if (this.player.position.x + 50 >=
            parseInt(this.playableArea.div.style.width)) {
            this.player.position.x = 350;
            this.player.player.applyStyles({
                background: "blue",
            });
        }
        if (this.player.position.x < 0) {
            this.player.position.x = 0;
            this.player.player.applyStyles({
                background: "purple",
            });
        }
        if (this.player.position.y + 50 >=
            parseInt(this.playableArea.div.style.height)) {
            this.player.position.y = 350;
            this.player.player.applyStyles({
                background: "yellow",
            });
        }
        if (this.player.position.y < 0) {
            this.player.position.y = 0;
            this.player.player.applyStyles({
                background: "orange",
            });
        }
    }
}
class ObjectCreator {
    object;
    constructor(div) {
        this.object = new DivCreator("object", "div");
        this.object.appendTo(div.div);
        this.object.applyStyles({
            width: "50px",
            height: "50px",
            background: "black",
            position: "absolute",
            top: `${Math.floor(Math.random() * 350)}px`,
            left: `${Math.floor(Math.random() * 350)}px`,
        });
    }
    objectColision(collision) {
        if (collision.player.position.x + 50 >=
            parseInt(this.object.div.style.left) &&
            collision.player.position.x <=
                parseInt(this.object.div.style.left) + 50 &&
            collision.player.position.y + 50 >= parseInt(this.object.div.style.top) &&
            collision.player.position.y <= parseInt(this.object.div.style.top) + 50) {
            collision.player.player.applyStyles({
                background: "blue",
            });
        }
    }
}
function main() {
    const game = new GameBoard();
    game.player.moveEvent(game, game.object, game.object);
}
main();
