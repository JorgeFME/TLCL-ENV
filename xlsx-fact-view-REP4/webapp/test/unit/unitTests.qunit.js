/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"capeetelcel/xlsx-fact-view/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
