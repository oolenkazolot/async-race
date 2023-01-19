export interface IRout {
  path: string;
  cb: (param?: string) => void;
}

export interface IRouter {
  navigate: (path: string) => void;
  init: () => void;
}

export interface IController {
  getAutos: (cb: (autos: IAutos[]) => void) => Promise<void>;
  createCar: (
    name: string,
    color: string
  ) => Promise<IResponseCreateCar | undefined>;
  deleteCar: (id: number) => Promise<void>;
  startCarEngine: (id: number) => Promise<IResponseCarEngine | undefined>;
  startEngineDrive: (id: number) => Promise<IResponseEngineDrive | undefined>;
  stopCarEngine: (id: number) => Promise<void>;
}

export interface IMainPage {
  draw: () => void;
  router?: IRouter;
}

export interface IAutos {
  name: string;
  color: string;
  id: number;
}

export interface IGarage {
  createGarage: (autos: IAutos[], draw: () => void) => HTMLElement;
}

export interface IResponseCarEngine {
  velocity: number;
  distance: number;
}

export interface IResponseEngineDrive {
  success: true;
}

export interface IControlPanel {
  createControlPanel: (drawGarage: (autos: IAutos[]) => void) => HTMLElement;
}

export interface IResponseCreateCar {
  name: string;
  color: string;
  id: number;
}

// export interface IErrorPage {
//   draw: () => void;
// }
