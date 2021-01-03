import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should return empty if given empty array', () => {
        const rose = new GildedRose();
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
            expect(items[1].quality).equal(0)
        });

        it('should not take one',() => {
            expect(items[2].name).equal('Sulfuras, Hand of Ragnaros');
            expect(items[2].quality).equal(18);
        });
    });

    describe('items.quality is less that 50', () => {
        let rose: GildedRose;
        let items: Array<Item>;

        beforeEach(() => {
            const stock = [
                new Item("Backstage passes to a TAFKAL80ETC concert", 12, 25),
                new Item("Backstage passes to a TAFKAL80ETC concert", 8, 25),
                new Item("Backstage passes to a TAFKAL80ETC concert", 5, 25),
                new Item("Aged Brie", 10, 25),
            ];
            rose = new GildedRose(stock);
            items = rose.updateQuality();
        });

        it('should increment by one', () => {
            expect(items[0].quality).equal(26);
        })

        it('should increment by 2', () => {
            expect(items[1].quality).equal(27);
        })

        it('should increment by 3', () => {
            expect(items[2].quality).equal(28);
        })

        it('item.name = Aged Brie should increment by 1', () => {
            expect(items[3].quality).equal(26);
        });
    });

    describe("item.name can not be Sulfuras, Hand of Ragnaros", () => {
        let rose: GildedRose;
        let items: Array<Item>;

        beforeEach(() => {
            const stock = [
                new Item("Aged Brie", 10, 25),
                new Item('Sulfuras, Hand of Ragnaros', 10, 37),
            ];
            rose = new GildedRose(stock);
            items = rose.updateQuality();
        });

        it('item.name = Aged Brie should minus 1 item.sellIn', function () {
            expect(items[0].sellIn).equal(9);
        });

        it("item.name = 'Sulfuras, Hand of Ragnaros' ", function () {
            expect(items[1].sellIn).equal(10);
        });
    });

    describe('item.sellIn is less than 0', () => {
        let rose: GildedRose;
        let items: Array<Item>;

        beforeEach(() => {
            const stock = [
                new Item("Aged Brie", 0, 10),
                new Item('Sulfuras, Hand of Ragnaros', 0, 10),
                new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10),
                new Item("+5 Dexterity Vest", 0, 10),
            ];
            rose = new GildedRose(stock);
            items = rose.updateQuality();
        });

        it('item.name = Aged Brie should increment +2 item.quality', () => {
            expect(items[0].quality).equal(12);
        });

        it('item.name = Backstage passes to a TAFKAL80ETC concert should change item.quality to 0', function () {
            expect(items[2].quality).equal(0);
        });
    });
});
