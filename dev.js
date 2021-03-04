import translator from './index.js'

const deeplinkUrl =
  'https://www.tvapp.com/x1?launchpoint=section&lmt=0&us_privacy=1-N-&sectionName=home'

translator(deeplinkUrl).then(console.log)
