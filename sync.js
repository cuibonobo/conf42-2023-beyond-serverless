const execSync = require('child_process').execSync;
const path = require('path');
const diveSync = require('diveSync');

const BUCKET_NAME = 'conf42-2023-static-assets';
const CACHE_DAYS = 30;

const repoDir = __dirname;
const staticDir = path.join(repoDir, 'static');

let remoteArgs = ' --local';
if (process.argv.length > 2 && process.argv[2] === "--remote") {
  remoteArgs = '';
}

const cacheValue = 60 * 60 * 24 * CACHE_DAYS;

const getRelativePath = (filePath, rootPath) => {
  let relativePath = filePath.substring(rootPath.length);
  if (relativePath.startsWith("\\") || relativePath.startsWith("/")) {
    relativePath = relativePath.substring(1);
  }
  relativePath = relativePath.replaceAll("\\", "/")
  return relativePath;
};

console.log(`Syncing ${staticDir} to ${remoteArgs ? 'local' : 'remote'} R2...`);
diveSync(staticDir, {directories: false}, (err, file) => {
  if (err) {
    throw err;
  }

  const relativePath = getRelativePath(file, staticDir);
  console.log(`- ${relativePath}`)
  try {
    execSync(`wrangler r2 object put ${BUCKET_NAME}/${relativePath} --file ${file} --cache-control "public, max-age=${cacheValue}"${remoteArgs}`);
  } catch (e) {
    console.error(`Couldn't sync ${file} to R2: ${e}`);
  }
});
console.log("Sync complete.");
