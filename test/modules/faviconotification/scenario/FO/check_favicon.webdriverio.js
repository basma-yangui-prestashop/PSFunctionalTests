'use strict';
var should = require('should');
var common = require('../../../../common/common.webdriverio');
var globals = require('../../../../common/globals.webdriverio.js');


describe('Test Case n°1 : Check the favicon', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });

    after(common.after);

    describe('Log in to the Front Office', function (done) {
        it('should log in successfully', function (done) {
            this.client
                .url('http://' + URL)
                .waitForExist(this.selector.access_loginFO, 90000)
                .click(this.selector.access_loginFO)
                .waitForExist(this.selector.loginFO, 90000)
                .setValue(this.selector.loginFO, 'pub@prestashop.com')
                .setValue(this.selector.passwordFO, '123456789')
                .click(this.selector.login_btnFO)
                .pause(3000)
                .call(done);
        });
    });

    describe('Add product to cart', function (done) {
        it('should get the favicon before adding product', function (done) {
            global.favicon_empty_cart_val = "";
            this.client
                .pause(3000)
                .getAttribute(this.selector.favicon_empty_cart, "href").then(function (img) {
                global.favicon_empty_cart_val = img;
            })
                .pause(3000)
                .call(done);
        });

        it('should go to the product details', function (done) {
            this.client
                .waitForExist(this.selector.logo_home_pageFO, 90000)
                .click(this.selector.logo_home_pageFO)
                .waitForExist(this.selector.first_product_home_page, 90000)
                .click(this.selector.first_product_home_page)
                .pause(2000)
                .call(done);
        });

        it('should click add to cart button', function (done) {
            this.client
                .waitForExist(this.selector.add_to_cart_button, 90000)
                .click(this.selector.add_to_cart_button)
                .waitForExist(this.selector.layer_cart_command_button, 90000)
                .click(this.selector.layer_cart_command_button)
                .pause(3000)
                .call(done);
        });
    });

    describe('Check the favicon notification', function (done) {
        it('should find the notification', function (done) {
            global.favicon_filled_cart = "";
            this.client
                .getAttribute(this.selector.favicon_filled_cart, "href").then(function (img) {
                global.favicon_filled_cart_val = img;
                should(global.favicon_filled_cart_val).not.be.equal(global.favicon_empty_cart_val);
            })
                .pause(3000)
                .call(done);
        });
    });
});