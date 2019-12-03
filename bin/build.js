const fs = require('fs');

const filterPackage = () => {
    const {
        name,
        version,
        description,
        main,
        module,
        types,
        unpkg,
        repository,
        keywords,
        author,
        license,
        bugs,
        homepage
    } = require('../package.json');

    return ({
        name,
        version,
        description,
        main,
        module,
        types,
        unpkg,
        repository,
        keywords,
        author,
        license,
        bugs,
        homepage
    });
};

fs.writeFile('./dist/package.json', JSON.stringify(filterPackage(), null, 2), (error) => {
    if (error) {
        console.error(error);
    }

    console.log('package.json created successfully');
});