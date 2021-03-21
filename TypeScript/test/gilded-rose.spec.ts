import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should return empty if given empty array', () => {
        const rose = new GildedRose();
        const items = rose.updateQuality();
        expect(items.length).equal(0);
    });

});
