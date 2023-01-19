import {
  IRouter,
  IController,
  IAutos,
  IGarage,
  IControlPanel,
} from "../types/index";

import Controller from "../utils/controller";
import Garage from "../components/garage";
import ControlPanel from "../components/control-panel";

class MainPage {
  private controller: IController;
  public router?: IRouter;
  private garage: IGarage;
  private controlPanel: IControlPanel;

  constructor() {
    this.controller = new Controller();
    this.garage = new Garage();
    this.controlPanel = new ControlPanel();
  }

  public draw(): void {
    const mainElement: HTMLElement | null = document.querySelector("main");
    if (!mainElement) {
      return;
    }
    mainElement.classList.add("main");
    mainElement.textContent = "";
    const controlPanel: HTMLElement = this.controlPanel.createControlPanel(
      this.drawGarage.bind(this)
    );
    mainElement.append(controlPanel);
    this.controller.getAutos(this.drawGarage.bind(this));

    // mainElement.append(mainPageElement);

    //     this.productsList = new ProductsList();
    //     this.filter = new Filter(
    //       this.productsList.draw.bind(this.productsList, this.router)
    //     );
    //     this.productsView = new ProductsView(this.productsList, this.filter);
    //     mainElement.textContent = "";
    //     const mainPageElement: HTMLElement = document.createElement("div");
    //     mainPageElement.classList.add("main-page");
    //     const filterElement: HTMLElement = this.filter.createFilter(this.router);
    //     if (this.productsView) {
    //       const productsViewBlock: HTMLElement = this.productsView.createProductsViewBlock(
    //         this.router
    //       );
    //       mainPageElement.append(filterElement, productsViewBlock);
    //     }
  }

  private drawGarage(autos: IAutos[]): void {
    const garage: HTMLElement = this.garage.createGarage(
      autos,
      this.draw.bind(this)
    );
    let section: HTMLElement | null = document.querySelector(".garage");
    if (!section) {
      section = document.createElement("section");
      section.classList.add("garage");
    } else {
      section.textContent = "";
    }
    section.append(garage);
    const main: HTMLElement | null = document.querySelector(".main");
    if (!main) {
      return;
    }
    main.append(section);
  }
}

export default MainPage;
