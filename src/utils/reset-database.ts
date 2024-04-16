import Debtor from './../models/debtor';
import Entity from './../models/entity';

export default async () => {
	await Debtor.deleteMany({});
	await Entity.deleteMany({});
};
