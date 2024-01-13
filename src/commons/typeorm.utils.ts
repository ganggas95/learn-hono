import { EntitySchema } from "typeorm";

export type EntitySchemaOrFunction = EntitySchema | Function;
export const getRepositoryToken = (entity: EntitySchemaOrFunction) => {
    if (entity instanceof EntitySchema)
        return `Repository<${entity.options.target?.name}>`;
    console.log(entity.name)
    return `Repository<${entity.name}>`;
}