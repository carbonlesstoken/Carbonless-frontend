const path = require('path');

module.exports = (config, env, helpers) => {
    config.node.process = true;
    config.node.Buffer = true;

    const rules = helpers.getRules(config);
    // Tricky workaround to support CSS Modules in preact-cli not only inside of "components" and "routes" folders
    // @see https://github.com/preactjs/preact-cli/issues/522#issuecomment-701030663
    const containersPath = path.resolve(__dirname, 'src', 'containers');
    rules[4].rule.include.push(containersPath);
    rules[5].rule.exclude.push(containersPath);
}
