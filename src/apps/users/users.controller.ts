import { Context, TypedResponse } from "hono";
import { inject, injectable } from "inversify";
import DI_IDENTIFIER from "../../constants/identifiers";
import BaseController, { BaseControllerType } from "../../core/controller";
import UserService from "./users.services";


@injectable()
class UserController extends BaseController implements BaseControllerType {

    constructor(
        @inject(DI_IDENTIFIER.USER_SERVICE)
        private readonly userService: UserService,
    ) {
        super();
    }
    async findAll(ctx: Context): Promise<TypedResponse> {
        const users = await this.userService.findAll()
        return this.response(ctx, { status: 200, data: users, message: "success" })
    }
    async findById(ctx: Context): Promise<TypedResponse> {
        const userId: string = ctx.req.param("id")
        const user = await this.userService.findById(parseInt(userId));
        return this.response(ctx, { status: 200, data: user, message: "success" })
    }
    async create(ctx: Context): Promise<TypedResponse> {
        const payload = await ctx.req.json();
        const user = await this.userService.create(payload);
        return this.response(ctx, { status: 200, data: user, message: "success" })
    }
    async delete(ctx: Context): Promise<TypedResponse> {
        const userId: string = ctx.req.param("id")
        await this.userService.delete(parseInt(userId));
        return this.response(ctx, { status: 204, data: null, message: "success" })
    }
    async update(ctx: Context): Promise<TypedResponse> {
        const userId: string = ctx.req.param("id")
        const payload = await ctx.req.json();
        const user = await this.userService.update(parseInt(userId), payload);
        return this.response(ctx, { status: 200, data: user, message: "success" })
    }
}

export default UserController;