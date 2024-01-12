import { Context, TypedResponse } from "hono";
import { inject, injectable } from "inversify";
import BaseController, { BaseControllerType } from "../../mixins/controller.mixin";
import UserService from "./users.services";


@injectable()
class UserController extends BaseController implements BaseControllerType {

    constructor(
        @inject(UserService)
        private readonly userService: UserService,
    ) {
        super();
    }
    async findAll(ctx: Context<any, any, {}>): Promise<TypedResponse> {
        const users = this.userService.findAll()
        return await this.response(ctx, { status: 200, data: users, message: "success" })
    }
    async findById(ctx: Context<any, any, {}>): Promise<TypedResponse> {
        const userId: string = ctx.req.param("id")
        const user = this.userService.findById(parseInt(userId));
        return await this.response(ctx, { status: 200, data: user, message: "success" })
    }
    async create(ctx: Context<any, any, {}>): Promise<TypedResponse> {
        const payload = await ctx.req.json();
        const user = this.userService.create(payload.name, payload.email);
        return await this.response(ctx, { status: 200, data: user, message: "success" })
    }
    async delete(ctx: Context<any, any, {}>): Promise<TypedResponse> {
        const userId: string = ctx.req.param("id")
        await this.userService.delete(parseInt(userId));
        return await this.response(ctx, { status: 204, data: null, message: "success" })
    }
    async update(ctx: Context<any, any, {}>): Promise<TypedResponse> {
        const userId: string = ctx.req.param("id")
        const payload = await ctx.req.json();
        const user = this.userService.update(parseInt(userId), payload.name, payload.email);
        return await this.response(ctx, { status: 200, data: user, message: "success" })
    }
}

export default UserController;