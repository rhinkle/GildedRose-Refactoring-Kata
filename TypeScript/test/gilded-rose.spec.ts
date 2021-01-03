import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should return empty if given empty array', () => {
        const rose = new GildedRose([]);
        const items = rose.updateQuality();
        expect(items.length).equal(0);
    });

    describe('name != Aged Brie && Backstage passes to a TAFKAL80ETC concert', () => {
        let rose: GildedRose;
        let items: Array<Item>;
        const stock = [
            new Item("+5 Dexterity Vest", 10, 20),
            new Item("+5 Dexterity Vest", 10, 0),
            new Item("Sulfuras, Hand of Ragnaros", 47, 18),
        ];

        beforeEach(() => {
            rose = new GildedRose(stock);
            items = rose.updateQuality();
        });
        
        it('should take one; quality > 0', () => {
            expect(items[0].quality).equal(19);
        });
        
        it('should NOT take one; quality is 0 ', () => {
            expect(items[1].quality).equal(stock[1].quality)
        });

        it('should not take one',() => {
            expect(items[2].name).equal('Sulfuras, Hand of Ragnaros');
            expect(items[2].quality).equal(stock[2].quality);
        });
    });
});
