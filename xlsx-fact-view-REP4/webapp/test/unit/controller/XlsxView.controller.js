/*global QUnit*/

sap.ui.define([
	"capeetelcel/xlsx-fact-view/controller/XlsxView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("XlsxView Controller");

	QUnit.test("I should test the XlsxView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
