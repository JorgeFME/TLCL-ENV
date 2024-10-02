/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"upload_huawei_counters_view/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
