const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PRO = process.env.NODE_ENV === 'production';
const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
module.exports = {
    IS_DEV,
    IS_PRO,
    FILE_EXTENSIONS
}