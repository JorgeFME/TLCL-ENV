/*global QUnit*/

sap.ui.define([
	"xlsx-fact-view-plain/controller/XLSX-Fact-View-Plain.controller"
], function (Controller) {
	"use strict";

	QUnit.module("XLSX-Fact-View-Plain Controller");

	QUnit.test("I should test the XLSX-Fact-View-Plain controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
