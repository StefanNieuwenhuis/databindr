import { DataBindr } from './index';

describe('DataBindr', () => {
    let db = new DataBindr();

    beforeEach(() => {
        db = new DataBindr();
    });

    it('creates', () => {
        expect(db).not.toBeUndefined();
        expect(db.state).toEqual({});
    });

    describe('Setting state', () => {
        it('should generate a binding for primitive values', () => {
            const mockedState = { firstname: 'John', lastname: 'Doe' };
            db.state = mockedState;

            expect(db.state).toEqual({ firstname: 'John', lastname: 'Doe' });
        });

        it('should generate bindings for nested properties', () => {
            const mockedState = { address: { street: '123 Main St', city: 'Anytown', country: 'USA' } };
            db.state = mockedState;

            expect(db.state).toEqual({
                'address.street': '123 Main St',
                'address.city': 'Anytown',
                'address.country': 'USA',
            });
        });
    });
});