'use strict';
var should = require('should');
var common = require('../../common/common.webdriverio');

describe('Allscenario', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.client = common.getClient();
        this.client.call(done);
    });

    after(function (done) {
        this.client
            .end()
            .call(done);
    });

    //install and uninstall module
    require('../../common/install_and_uninstall_module.js');
    require('../../common/install_module.js');

    require('./scenario/FO/check_favicon.webdriverio')
    require('../../common/uninstall_module.js');

});
