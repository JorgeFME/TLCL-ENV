/*global QUnit*/

sap.ui.define([
	"upload-historico/controller/UploadHistoricoFront.controller"
], function (Controller) {
	"use strict";

	QUnit.module("UploadHistoricoFront Controller");

	QUnit.test("I should test the UploadHistoricoFront controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
