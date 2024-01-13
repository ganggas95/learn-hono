import { Context } from "hono";
import { TypedResponse } from "hono/dist/types/types";
import { injectable } from "inversify";

export interface BaseResponseType<T> {
    status: number;
    data: T;
    message: string;
}
export type BaseControllerType = {
    findAll(ctx: Context): Promise<TypedResponse>;
    findById(ctx: Context): Promise<TypedResponse>;
    create(ctx: Context): Promise<TypedResponse>;
    delete(ctx: Context): Promise<TypedResponse>;
    update(ctx: Context): Promise<TypedResponse>;
}

@injectable()
abstract class BaseController {
    response<T>(ctx: Context, response: BaseResponseType<T>): TypedResponse {
        return ctx.json(response);
    }
}

export default BaseController