/*global describe, it */
'use strict';

(function () {
    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
            it('should run here few assertions', function () {
                expect(true).toBe(true);
            });
        });
    });
})();


(function () {
    describe('My Application', function () {
        describe('data structure layout', function () {
            it('should be defined', function () {
                expect(myApp).toBeDefined();
            });
             it('should be have a classes child', function () {
                expect(myApp.classes).toBeDefined();
            });
        });
    });
})();
