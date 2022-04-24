export const environment = {
  firebase: JSON.parse(process.env['FIREBASE_API_PROD'] as string),
  production: true,
  title: 'Code.Build',
  domain: 'code.build',
  description: 'Your most relevant coding resources for the web!',
  site: "https://code.build",
  storage: 'code-build',
  author: 'Jonathan Gamble'
};
