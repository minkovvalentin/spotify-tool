module.exports = function (api) {
    api.cache(true)
    return {
        presets: ["next/babel"],
        plugins: ["@babel/plugin-proposal-do-expressions", 'macros'],
    }
}