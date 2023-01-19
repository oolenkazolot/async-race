import { IController, IResponseCreateCar, IAutos } from "src/types";
import Controller from "../utils/controller";

class ControlPanel {
  controller: IController;
  constructor() {
    this.controller = new Controller();
  }
  public createControlPanel(
    drawGarage: (autos: IAutos[]) => void
  ): HTMLElement {
    const controlPanel: HTMLElement = document.createElement("section");
    controlPanel.classList.add("control-panel");
    const title: HTMLElement = this.createTitle();
    const createBlock: HTMLElement = this.createBlockCreateCars(drawGarage);
    const updateBlock: HTMLElement = this.createBlockUpdateCars();
    const buttonsBlock: HTMLElement = this.createButtonsBlock();
    controlPanel.append(title, createBlock, updateBlock, buttonsBlock);
    return controlPanel;
  }

  private createTitle(): HTMLElement {
    const title: HTMLElement = document.createElement("h2");
    title.classList.add("control-panel__title");
    title.textContent = "Control panel cars";
    return title;
  }

  private createBlockCreateCars(
    drawGarage: (autos: IAutos[]) => void
  ): HTMLElement {
    const createBlock: HTMLElement = document.createElement("div");
    createBlock.classList.add("create-cars");
    const inputName: HTMLInputElement = this.createInputName(
      "create-cars__name",
      "text",
      "input"
    );
    const inputColor: HTMLInputElement = this.createInputColor(
      "create-cars__color",
      "color",
      "#f6b73c"
    );
    const btn: HTMLButtonElement = this.createBtn(
      "create-cars__btn",
      "btn",
      "btn--panel",
      "Create"
    );
    btn.addEventListener("click", () => {
      const inputName: HTMLInputElement | null = document.querySelector(
        ".create-cars__name"
      );
      const inputColor: HTMLInputElement | null = document.querySelector(
        ".create-cars__color"
      );
      if (inputName && inputColor) {
        const inputNameValue: string = inputName.value;
        const inputColorValue: string = inputColor.value;
        console.log(inputNameValue, inputColorValue);

        this.createCar(inputNameValue, inputColorValue, drawGarage);
      }
    });
    createBlock.append(inputName, inputColor, btn);
    return createBlock;
  }

  private async createCar(
    inputNameValue: string,
    inputColorValue: string,
    drawGarage: (autos: IAutos[]) => void
  ): Promise<void> {
    const response:
      | IResponseCreateCar
      | undefined = await this.controller.createCar(
      inputNameValue,
      inputColorValue
    );
    console.log(drawGarage);

    if (response) {
      this.controller.getAutos(drawGarage);
    }
  }

  private createBlockUpdateCars(): HTMLElement {
    const updateBlock: HTMLElement = document.createElement("div");
    updateBlock.classList.add("update-cars");
    const inputName: HTMLInputElement = this.createInputName(
      "update-cars__name",
      "text",
      "input"
    );
    const inputColor: HTMLInputElement = this.createInputColor(
      "update-cars__color",
      "color",
      "#f6b73c"
    );
    const btn: HTMLButtonElement = this.createBtn(
      "create-cars__btn",
      "btn",
      "btn--panel",
      "Update"
    );

    updateBlock.append(inputName, inputColor, btn);
    return updateBlock;
  }

  private createButtonsBlock(): HTMLElement {
    const buttonsBlock: HTMLElement = document.createElement("div");
    buttonsBlock.classList.add("control-panel__buttons");
    const btnRace: HTMLButtonElement = this.createBtn(
      "control-panel__race",
      "btn",
      "btn--panel",
      "Race"
    );
    const btnReset: HTMLButtonElement = this.createBtn(
      "control-panel__reset",
      "btn",
      "btn--panel",
      "Reset"
    );
    const btnGenerate: HTMLButtonElement = this.createBtn(
      "control-panel__generate",
      "btn",
      "btn--panel",
      "Generate cars"
    );
    buttonsBlock.append(btnRace, btnReset, btnGenerate);
    return buttonsBlock;
  }

  private createInputName(
    classNameOne: string,
    inputType: string,
    classNameTwo?: string
  ): HTMLInputElement {
    const input: HTMLInputElement = document.createElement("input");
    input.classList.add(classNameOne);
    if (classNameTwo) {
      input.classList.add(classNameTwo);
    }
    input.type = inputType;
    return input;
  }

  private createInputColor(
    classNameOne: string,
    inputType: string,
    color: string
  ): HTMLInputElement {
    const input: HTMLInputElement = document.createElement("input");
    input.classList.add(classNameOne);
    input.type = inputType;
    input.value = color;
    return input;
  }

  private createBtn(
    classNameOne: string,
    classNameTwo: string,
    classNameThree: string,
    content: string
  ): HTMLButtonElement {
    const btn: HTMLButtonElement = document.createElement("button");
    btn.classList.add(classNameOne);
    btn.classList.add(classNameTwo);
    btn.classList.add(classNameThree);
    btn.textContent = content;
    return btn;
  }
}

export default ControlPanel;
