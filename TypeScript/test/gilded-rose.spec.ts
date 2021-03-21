import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should return empty if given empty array', () => {
        const rose = new GildedRose();
        const items = rose.updateQuality();
        expect(items.length).equal(0);
    });


    describe('Non-special cases with +5 Dex Vest', () => {
        let rose: GildedRose;
        let items: Array<Item>;
        const stock = [
            new Item("+5 Dexterity Vest", 10, 20),
            new Item("+5 Dexterity Vest", 10, 0),
            new Item("+5 Dexterity Vest", 10, 50),
        ];

        beforeEach(() => {
            rose = new GildedRose(stock);
            items = rose.updateQuality();
        });

        it('at the end of the day lower by 1 Quality and SellIn', () => {
            expect(items[0].quality).equal(19);
            expect(items[0].sellIn).equal(9);
        });

        it('quality of an item is never negative', () => {
            expect(items[1].quality).equal(0);
        });
    });
});
