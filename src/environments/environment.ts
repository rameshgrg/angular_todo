// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
	apiKey: "AIzaSyAkLw5QFxOtZHI0ZKBUj3-RMSUdwyuj7zo1",
    authDomain: "todo-d640e.firebaseapp.com",
    databaseURL: "https://todo-d640e.firebaseio.com",
    projectId: "todo-d640e",
    storageBucket: "todo-d640e.appspot.com",
    messagingSenderId: "147604881981"
  }
};
