import {
  IAutos,
  IResponseCarEngine,
  IResponseEngineDrive,
  IResponseCreateCar,
} from "../types/index";

class Controller {
  public async getAutos(cb: (autos: IAutos[]) => void): Promise<void> {
    try {
      const response = await fetch("http://127.0.0.1:3000/garage");
      const autos: IAutos[] = await response.json();
      cb(autos);
    } catch (e) {
      console.log(e);
    }
  }

  public async createCar(
    name: string,
    color: string
  ): Promise<IResponseCreateCar | undefined> {
    try {
      const response = await fetch("http://127.0.0.1:3000/garage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          color: color,
        }),
      });
      const res: Promise<
        IResponseCreateCar | undefined
      > = await response.json();
      if (res) {
        return res;
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async deleteCar(id: number): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: "DELETE",
      });
      const res = await response.json();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  public async startCarEngine(
    id: number
  ): Promise<IResponseCarEngine | undefined> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine/?id=${id}&status=started`,
        {
          method: "PATCH",
        }
      );
      const res: Promise<
        IResponseCarEngine | undefined
      > = await response.json();
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  public async startEngineDrive(
    id: number
  ): Promise<IResponseEngineDrive | undefined> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine/?id=${id}&status=drive`,
        {
          method: "PATCH",
        }
      );
      if (response.status === 500) {
        throw new Error(
          "Car has been stopped suddenly. It's engine was broken down."
        );
      }

      const res: Promise<
        IResponseEngineDrive | undefined
      > = await response.json();
      if (res) {
        return res;
      }
    } catch (e) {
      this.stopCarEngine(id);
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  public async stopCarEngine(id: number): Promise<void> {
    console.log("hhh");

    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine/?id=${id}&status=stopped`,
        {
          method: "PATCH",
        }
      );
      const res = await response.json();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
}

export default Controller;
