import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import React from 'react';

const mUiContextsFixMixin = {
  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },
};
export default mUiContextsFixMixin;
