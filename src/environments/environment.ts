// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: JSON.parse(process.env['FIREBASE_API_DEV'] as string),
  production: false,
  title: 'Code.Build',
  domain: 'code.build',
  description: 'Your most relevant coding resources for the web!',
  site: "https://code.build",
  storage: 'code-build',
  author: 'Jonathan Gamble'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
