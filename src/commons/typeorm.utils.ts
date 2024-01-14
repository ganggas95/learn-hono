import { EntitySchema } from "typeorm";

export type EntitySchemaOrFunction = EntitySchema | Function;
export const getRepositoryToken = (entity: EntitySchemaOrFunction) => {
    if (entity instanceof EntitySchema)
        return `Repository<${entity.options.target?.name}>`;
    return `Repository<${entity.name}>`;
}