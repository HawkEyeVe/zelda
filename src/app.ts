class DivCreator {
  private div: HTMLElement;
  constructor(id: string, divType: string = "div") {
    this.div = document.createElement(divType);
    this.div.id = id;
  }

  public appendTo(element: HTMLElement) {
    element.appendChild(this.div);
  }

  public get Div() {
    return this.div;
  }

  public applyStyles(styles: Record<string, string>): void {
    for (const [property, value] of Object.entries(styles)) {
      if (value !== undefined) {
        this.div.style.setProperty(property, value);
      }
    }
  }
}

class Player {
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
  }

  render(): void {
    const player = new DivCreator("player", "div");
    player.appendTo(this.appendTo);
    player.applyStyles({
      width: "50px",
      height: "50px",
      background: "red",
      position: "relative",
      top: `${this.position.y}px`,
      left: `${this.position.x}px`,
    });
  }

  move(): void {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.position.y -= 2;
          this.render();
          break;
        case "ArrowDown":
          this.position.y += 2;
          this.render();
          break;
        case "ArrowLeft":
          this.position.x -= 2;
          this.render();
          break;
        case "ArrowRight":
          this.position.x += 2;
          this.render();
          break;
      }
    });
  }
}
const playableArea = new DivCreator("box", "div");
playableArea.appendTo(document.body);
playableArea.applyStyles({
  width: "400px",
  height: "400px",
  background: "green",
});

const player = new Player(playableArea.Div);
player.move();
