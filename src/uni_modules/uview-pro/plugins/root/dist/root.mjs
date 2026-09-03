function createEmptySourcemap() {
  return {
    version: 3,
    sources: [],
    names: [],
    mappings: ""
  };
}
function registerRootApp(code, fileName = "App.root") {
  const importCode = `import GlobalRootView from "./${fileName}.vue";`;
  const vueUseComponentCode = `app.component("global-root-view", GlobalRootView);`;
  let newCode = importCode + "\n" + code;
  const ssrAppMatch = newCode.match(/(const\s+app\s*=\s*createSSRApp\([^)]+\);)/);
  if (ssrAppMatch) {
    newCode = newCode.replace(/(const\s+app\s*=\s*createSSRApp\([^)]+\);)/, `$1
    ${vueUseComponentCode}`);
  } else {
    newCode = newCode.replace(/(createApp[\s\S]*?)(return\s*\{)/, `$1${vueUseComponentCode}
    $2`);
  }
  return { code: newCode, map: createEmptySourcemap() };
}
function rebuildRootApp(code) {
  return { code, map: createEmptySourcemap() };
}
export {
  rebuildRootApp,
  registerRootApp
};
