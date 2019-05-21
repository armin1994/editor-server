export default function(appString) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <title>Express + HMR + React + SCSS</title>
      </head>
      <body>
        <div id="root">${appString}</div>
        <script type="text/javascript" src="assets/vendor.js"></script>
        <script type="text/javascript" src="assets/app.js"></script>
      </body>
    </html>
  `
}
