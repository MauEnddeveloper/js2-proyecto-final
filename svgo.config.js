module.exports = {
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    removeUselessDefs: false,
                    removeHiddenElems: false,
                    cleanupIds: false,
                },
            },
        },
    ],
};
