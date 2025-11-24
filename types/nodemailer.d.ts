// Temporary module declaration for `nodemailer` to satisfy TypeScript during build.
// Prefer installing `@types/nodemailer` as a proper fix: `npm i -D @types/nodemailer`

declare module 'nodemailer' {
  const content: any;
  export = content;
}
