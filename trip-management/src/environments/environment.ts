// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiRootDsv: 'http://www.church-manager.kinghost.net/api/',
  apiRootDsv: 'https://api-church-manager.herokuapp.com/',
  // apiRootPro: 'https://api-church-manager.herokuapp.com/'

  firebase: {
    apiKey: 'AIzaSyAS590one0DQoL2Og4mssSyNDRJ0d-B19c',
    authDomain: 'trip-management-2fa82.firebaseapp.com',
    projectId: 'trip-management-2fa82',
    storageBucket: 'trip-management-2fa82.appspot.com',
    messagingSenderId: '192597511320',
    appId: '1:192597511320:web:2278c6599015276c4c14ed',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
