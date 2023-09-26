import { createParamDecorator } from "@nestjs/common";
import { GraphQLExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator((data: any,
    ctx: GraphQLExecutionContext) => {
    try {
        const headers = ctx.getArgs()[2].req.headers;
        if (!headers.user) return null;
        return JSON.parse(headers.user);
    } catch (error) {
        return null;
    }
});