/*global QUnit*/

sap.ui.define([
	"upload_huawei_counters_view/controller/UploadHuaweiCounters.controller"
], function (Controller) {
	"use strict";

	QUnit.module("UploadHuaweiCounters Controller");

	QUnit.test("I should test the UploadHuaweiCounters controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
