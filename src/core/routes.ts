import { Hono } from "hono";


export type BaseRoutesType = {
    init(): void
}


class BaseRoutes {
    public readonly routes: Hono;

    constructor() {
        this.routes = new Hono();
    }

}

export default BaseRoutes;