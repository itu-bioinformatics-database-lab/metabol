// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'd3': 'vendor/d3',
  'angular2-notifications': 'vendor/angular2-notifications',
  'lodash': 'vendor/lodash'
};

/** User packages configuration. */
const packages: any = {
  'd3': {
    main: 'd3.js'
  },
  'angular2-notifications': {
    main: 'components.js'
  },
  'lodash': {
    main: 'index.js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  "app/components/documentation",
  "app/components/panel",
  "app/components/panel/profile/change-password",
  "app/components/panel/profile",
  "app",
  "auth/auth-guard-login",
  "auth/auth-guard",
  "auth/components",
  "auth/components/login",
  "auth/components/signup",
  "auth/services",
  "auth/services/login",
  "auth/services/signup",
  "auth/services",
  "auth",
  "common/components/accordion",
  "common/components",
  "common/components/loading",
  "common",
  "common/pipes",
  "common/pipes/keys",
  "common/services/currency-metabolites",
  "common/services",
  "common/services/loading",
  "search-engine/components/details/chemical-equation",
  "search-engine/components/details",
  "search-engine/components/details/metabolite-details",
  "search-engine/components/details/reaction-details",
  "search-engine/components",
  "search-engine/components/search",
  "search-engine/components/search/search-bar",
  "search-engine/components/search/search-page",
  "search-engine/components/search/search-result",
  "search-engine/components/subsystem",
  "search-engine/components/subsystem/subsystem-detail",
  "search-engine",
  "search-engine/models",
  "search-engine/services",
  "search-engine/services/metabolite",
  "search-engine/services/reaction",
  "search-engine/services/search",
  "subsystem-analyze/components/concentration-table",
  "subsystem-analyze/components",
  "subsystem-analyze/components/manual",
  "subsystem-analyze/components/measurement",
  "subsystem-analyze/components/sample",
  "subsystem-analyze/components/subsystem-analyze",
  "subsystem-analyze/components/upload",
  "subsystem-analyze",
  "subsystem-analyze/services/subsystem-analyze",
  "visualizations/components/fullscreenable-svg",
  "visualizations/components",
  "visualizations/components/visualization",
  "visualizations",
  "visualizations/models",
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};

barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
