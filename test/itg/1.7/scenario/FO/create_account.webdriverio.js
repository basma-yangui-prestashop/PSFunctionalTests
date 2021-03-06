'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('The Creation of an Account in Front Office', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
    after(common.after);

    describe('Create a customer account in FO', function (done) {
        it('should acces to the account creation interface', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('http://' + URL)
                .waitForExist(this.selector.FO.AccessPage.sign_in_button, 90000)
                .click(this.selector.FO.AccessPage.sign_in_button)
                .waitForExist(this.selector.FO.AddAccountPage.create_button, 90000)
                .click(this.selector.FO.AddAccountPage.create_button)
                .call(done);
        });

        it('should fill the form', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.AddAccountPage.firstname_input, 60000)
                .setValue(this.selector.FO.AddAccountPage.firstname_input, 'my firstname')
                .setValue(this.selector.FO.AddAccountPage.lastname_input, 'my lastname')
                .setValue(this.selector.FO.AddAccountPage.email_input, new_customer_email)
                .setValue(this.selector.FO.AddAccountPage.password_input, '123456789')
                .pause(2000)
                .call(done);
        });

        it('should validate the creation of the account', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.FO.AddAccountPage.save_account_button)
                .waitForExist(this.selector.FO.AccessPage.logo_home_page, 90000)
                .call(done);
        });
    });

    describe('Log out and Log in again', function (done) {
        it('should log out', function (done) {
            global.fctname = this.test.title;
            this.client
                .signoutFO()
                .call(done);
        });

        it('should log in again', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('http://' + URL)
                .waitForExist(this.selector.FO.AccessPage.sign_in_button, 90000)
                .click(this.selector.FO.AccessPage.sign_in_button)
                .waitForExist(this.selector.FO.AccessPage.login_input, 90000)
                .setValue(this.selector.FO.AccessPage.login_input, new_customer_email)
                .setValue(this.selector.FO.AccessPage.password_input, '123456789')
                .click(this.selector.FO.AccessPage.login_button)
                .waitForExist(this.selector.FO.AccessPage.logo_home_page, 90000)
                .call(done);
        });
    });

    describe('Log out in Front Office', function (done) {
        it('should logout successfully in FO', function (done) {
            global.fctname = this.test.title;
            this.client
                .signoutFO()
                .call(done);
        });
    });

});