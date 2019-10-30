const fs = jest.genMockFromModule("fs") as any;

fs.existsSync = () => true;

module.exports = fs;
