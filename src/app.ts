class DivCreator {
  private _div: HTMLElement;
  constructor(id: string, divType: string = "div") {
    this._div = document.createElement(divType);
    this._div.id = id;
  }

  public appendTo(element: HTMLElement) {
    element.appendChild(this._div);
  }

  public get div() {
    return this._div;
  }

  public applyStyles(styles: Record<string, string>): void {
    for (const [property, value] of Object.entries(styles)) {
      if (value !== undefined) {
        this._div.style.setProperty(property, value);
      }
    }
  }
}

class Player {
  player: DivCreator;
  appendTo: HTMLElement;
  position: {
    x: number;
    y: number;
  };

  constructor(appendTo: HTMLElement) {
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

  moveEvent(): void {
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
    });
  }
}

class GameBoard {
  playableArea: DivCreator;
  player: Player;
  constructor() {
    this.playableArea = new DivCreator("box", "div");
    this.playableArea.appendTo(document.body);
    this.playableArea.applyStyles({
      width: "400px",
      height: "400px",
      background: "green",
      position: "relative",
      border: "20px solid black",
    });
    this.player = new Player(this.playableArea.div);
  }
}

function main() {
  const game = new GameBoard();
  game.player.moveEvent();
}

main();
