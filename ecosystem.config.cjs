module.exports = {
  apps: [
    {
      name: 'front',
      port: '5454',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
