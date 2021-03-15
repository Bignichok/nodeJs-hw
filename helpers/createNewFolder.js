const fs = require("fs").promises;

const isAccessible = async (path) =>
    fs
        .access(path)
        .then(() => true)
        .catch(() => false);

const createNewFolder = async (folder) => {
    if (!(await isAccessible(folder))) {
        await fs.mkdir(folder);
    }
};

module.exports = createNewFolder;
