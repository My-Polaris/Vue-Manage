module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // ElementUI按需引入
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
