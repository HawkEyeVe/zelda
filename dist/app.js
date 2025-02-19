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
        this.player.applyStyles({
            width: "50px",
            height: "50px",
            background: "red",
            position: "absolute",
            top: `${this.position.y}px`,
            left: `${this.position.x}px`,
        });
    }
    moveEvent(collision) {
        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.position.y -= 10;
                    collision.borderColision();
                    this.player.applyStyles({
                        top: `${this.position.y}px`,
                    });
                    break;
                case "ArrowDown":
                    this.position.y += 10;
                    collision.borderColision();
                    this.player.applyStyles({
                        top: `${this.position.y}px`,
                    });
                    break;
                case "ArrowLeft":
                    this.position.x -= 10;
                    collision.borderColision();
                    this.player.applyStyles({
                        left: `${this.position.x}px`,
                    });
                    break;
                case "ArrowRight":
                    this.position.x += 10;
                    collision.borderColision();
                    this.player.applyStyles({
                        left: `${this.position.x}px`,
                    });
                    break;
            }
        });
    }
}
class GameBoard {
    playableArea;
    player;
    constructor() {
        this.playableArea = new DivCreator("box", "div");
        this.playableArea.appendTo(document.body);
        this.playableArea.applyStyles({
            width: "400px",
            height: "400px",
            background: "green",
            position: "absolute",
            border: "20px solid black",
        });
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
function main() {
    const game = new GameBoard();
    game.player.moveEvent(game);
}
main();
