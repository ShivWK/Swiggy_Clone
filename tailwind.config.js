// go to tailwindcss docs and  follow each steps then create a file tailwind.config.js in your ap folder to get suggestion of classes while you type. Without this file tailwind intellesence wont work.
// in vite.config.js file only import tailwindcss, and include it in the array.

module.exports = {
    theme: {
        extends: {
            colors: {
                theme : '#ff5200',
            },
        },
    },
}