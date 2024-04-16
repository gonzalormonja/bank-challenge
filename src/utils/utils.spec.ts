import { processLine } from './process-debtor-line';

describe('processLine', () => {
	it('should return the correct values', () => {
		const value =
			'0000720170611200057178180001 60,6        ,0          7,5         ,0          ,0          ,0          60,6        ,0          ,0          7,5         ,0          0000000   ';

		const result = processLine(value);

		expect(result).toEqual({
			entityId: '00007',
			clientIdentityCode: '20005717818',
			situation: '1',
			totalDebt: 60.6,
		});
	});

	it('should throw error if entityId is null', () => {
		const value =
			'     20170611200057178180001 60,6        ,0          7,5         ,0          ,0          ,0          60,6        ,0          ,0          7,5         ,0          0000000   ';

		expect(() => processLine(value)).toThrow('entityId cannot be empty');
	});

	it('should throw error if clientIdentityCode is null', () => {
		const value =
			'0000720170611           0001 60,6        ,0          7,5         ,0          ,0          ,0          60,6        ,0          ,0          7,5         ,0          0000000   ';

		expect(() => processLine(value)).toThrow(
			'clientIdentityCode cannot be empty',
		);
	});

	it('should throw error if situation is null', () => {
		const value =
			'000072017061120005717818000  60,6        ,0          7,5         ,0          ,0          ,0          60,6        ,0          ,0          7,5         ,0          0000000   ';

		expect(() => processLine(value)).toThrow('situation cannot be empty');
	});

	it('should throw error if totalDebt is null', () => {
		const value =
			'0000720170611200057178180001             ,0          7,5         ,0          ,0          ,0          60,6        ,0          ,0          7,5         ,0          0000000   ';

		expect(() => processLine(value)).toThrow('totalDebt cannot be empty');
	});
});
