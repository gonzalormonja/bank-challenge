import Entity from './../models/entity';

export class EntityRepository {
	public async createMany(entities: EntitiesInput[]) {
		await Entity.insertMany(Object.values(entities));
	}
}

interface EntitiesInput {
	entityId: string;
	totalDebt: number;
}
