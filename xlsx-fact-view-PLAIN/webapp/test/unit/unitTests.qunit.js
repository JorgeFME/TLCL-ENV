/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"xlsx-fact-view-plain/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
