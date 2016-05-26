/*eslint-disable no-var,no-unused-vars*/
var Promise = require('bluebird'); // Promise polyfill for IE11

import { bootstrap } from 'aurelia-bootstrapper-webpack';
import {I18NConfiguration} from './plugins/i18n.js';
import 'bootstrap';

import '../jspm_packages/npm/materialize-css@0.97.6/dist/css/materialize.min.css'
import '../jspm_packages/npm/materialize-css@0.97.6/dist/js/materialize.min.js'
import '../styles/styles.css';

bootstrap(function(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(I18NConfiguration.getPluginName(), I18NConfiguration.configure);

  aurelia.start().then(() => aurelia.setRoot('app', document.body));
});
