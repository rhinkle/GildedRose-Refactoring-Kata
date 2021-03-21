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
            new Item("+5 Dexterity Vest", 0, 10),
        ];

        before(() => {
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

        it('quality degrades twice as fast when sell by date has passed, ', () => {
            expect(items[2].quality).equal(8);
        });
    });

    describe('Quality of and item always less than 50',  () => {
        let rose: GildedRose;
        let items: Array<Item>;
        const stock = [
            new Item("Aged Brie", 10, 50),
            new Item("+5 Dexterity Vest", 10, 50),
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50),
            new Item("Sulfuras, Hand of Ragnaros", 10, 80),
            new Item("Elixir of the Mongoose", 10, 50),
        ];

        before(() => {
            rose = new GildedRose(stock);
            items = rose.updateQuality();
        });

        it('Aged Brie should not exceed 50 in value for Quality', () => {
            expect(items[0].quality).equal(50);
        });
        it('+5 Dex vest should not exceed 50 in value for Quality', () => {
            expect(items[1].quality).equal(49);
        });
        it('Backstage passes should not exceed 50 in value for Quality', () => {
            expect(items[2].quality).equal(50);
        });
        it('Sulfuras should not exceed 50 in value for Quality', () => {
            expect(items[3].quality).equal(80);
        });
        it('Elixir should not exceed 50 in value for Quality', () => {
            expect(items[4].quality).equal(49);
        });
    });
    
    describe('Aged Brie', () => {
        let rose: GildedRose;
        let items: Array<Item>;
        const stock = [
            new Item("Aged Brie", 10, 20),
            new Item("Aged Brie", 10, 50),
            new Item("Aged Brie", 0, 10),
        ];

        before(() => {
            rose = new GildedRose(stock);
            items = rose.updateQuality();
        });

        it('should increase in Quality the older it gets', () => {
            expect(items[0].quality).equal(21);
        });

        it('should not exceed 50 in value for Quality', () => {
            expect(items[1].quality).equal(50);
        });
        it('should increase by 2 after sell date pasted', () => {
            expect(items[2].quality).equal(12);
        });
    });

    describe('Sulfuras, Legendary Item', () => {
        let rose: GildedRose;
        let items: Array<Item>;
        const stock = [
            new Item("Sulfuras, Hand of Ragnaros", 10, 80),
        ];

        before(() => {
            rose = new GildedRose(stock);
            items = rose.updateQuality();
        });
        it('should never decreases in Quality or SellIn', function () {
            expect(items[0].quality).equal(80);
            expect(items[0].sellIn).equal(10);
        });
    });

    describe('Backstage passes', () => {
        let rose: GildedRose;
        let items: Array<Item>;
        const stock = [
            new Item("Backstage passes to a TAFKAL80ETC concert", 7, 10),
            new Item("Backstage passes to a TAFKAL80ETC concert", 4, 10),
            new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0),
        ];

        before(() => {
            rose = new GildedRose(stock);
            items = rose.updateQuality();
        });
        it('Quality should increases by 2 when there are 10 days or less', function () {
            expect(items[0].quality).equal(12);
            expect(items[0].sellIn).equal(6);
        });
        it('Quality should increases by by 3 when there are 5 days or less', function () {
            expect(items[1].quality).equal(13);
            expect(items[1].sellIn).equal(3);
        });
        it('Quality drops to 0 after the concert', function () {
            expect(items[2].quality).equal(0);
            expect(items[2].sellIn).equal(-1);
        });
    });
});
