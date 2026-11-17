const fs = require('fs');
const path = require('path');
const sharp = require('./frontend/node_modules/sharp');

const ASSETS_DIR = path.join(__dirname, 'frontend', 'public', 'assets');
const BACKUP_DIR = path.join(__dirname, 'frontend', 'public', 'assets_backup');

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'assets_backup') {
        getAllFiles(filePath, fileList);
      }
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function optimize() {
  const allFiles = getAllFiles(ASSETS_DIR);
  const imageFiles = allFiles.filter(f => /\.(jpe?g|png)$/i.test(f));

  console.log(`Found ${imageFiles.length} image files to process.`);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  const results = [];

  for (const filePath of imageFiles) {
    const relPath = path.relative(ASSETS_DIR, filePath);
    const ext = path.extname(filePath).toLowerCase();
    const basename = path.basename(filePath, ext);
    const dir = path.dirname(filePath);
    const webpPath = path.join(dir, `${basename}.webp`);

    // Backup original
    const backupSubdir = path.join(BACKUP_DIR, path.dirname(relPath));
    if (!fs.existsSync(backupSubdir)) {
      fs.mkdirSync(backupSubdir, { recursive: true });
    }
    const backupFilePath = path.join(BACKUP_DIR, relPath);
    if (!fs.existsSync(backupFilePath)) {
      fs.copyFileSync(filePath, backupFilePath);
    }

    const origStat = fs.statSync(filePath);
    totalOriginalSize += origStat.size;

    // Determine optimization settings based on asset type
    const isTransparentLogo = basename.includes('transparent') || basename.includes('logo') || ext === '.png';
    const isCertificate = basename.includes('certificate');
    const isHero = basename.includes('hero') || basename.includes('london');

    let pipeline = sharp(filePath);

    if (isTransparentLogo) {
      pipeline = pipeline.webp({
        quality: 95,
        alphaQuality: 100,
        lossless: false,
        effort: 6
      });
    } else if (isCertificate) {
      pipeline = pipeline.webp({
        quality: 92,
        effort: 6
      });
    } else if (isHero) {
      pipeline = pipeline.webp({
        quality: 86,
        effort: 6
      });
    } else {
      pipeline = pipeline.webp({
        quality: 85,
        effort: 6
      });
    }

    await pipeline.toFile(webpPath);
    const newStat = fs.statSync(webpPath);
    totalOptimizedSize += newStat.size;

    const savedPercent = ((1 - newStat.size / origStat.size) * 100).toFixed(1);
    results.push({
      file: relPath,
      originalKB: (origStat.size / 1024).toFixed(1),
      webpKB: (newStat.size / 1024).toFixed(1),
      saved: `${savedPercent}%`
    });
  }

  console.log('\n--- Optimization Results ---');
  console.table(results);
  const totalSavedPercent = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
  console.log(`\nTotal Original Size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Optimized WebP Size: ${(totalOptimizedSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Overall Bandwidth Reduction: ${totalSavedPercent}%\n`);
}

optimize().catch(err => {
  console.error('Optimization error:', err);
  process.exit(1);
});
