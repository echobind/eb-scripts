const fs = jest.genMockFromModule<any>("fs");

fs.existsSync = () => true;

module.exports = fs;
