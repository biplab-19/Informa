(function ($) {
    'use strict';
	//==================================================
    // DOCUMENT READY & BootStraping init method for all modules loaded in the page...
    //--------------------------------------------------
    $(function () {
        var components, data, globalComponents = ['Configs', 'Utils'];
        for (components in globalComponents) {
            data = globalComponents[components];
            if (INFORMA[data]) {
                INFORMA[data].init();
            }
		}
		//Page Specific components
        for (components in INFORMA.initUI) {
            data = INFORMA.initUI[components];
            if (INFORMA[data]) {
                INFORMA[data].init(components);
            }
		}
    }());
    //--------------------------------------------------
    // end DOCUMENT READY...
    //==================================================
}($INFORMA));
