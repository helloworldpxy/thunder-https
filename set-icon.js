const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const exePath = path.join(__dirname, "dist-output", "win-unpacked", "Thunder HTTPS.exe");
const pngPath = path.join(__dirname, "build", "icon.png");
const icoPath = path.join(__dirname, "dist-output", ".icon-ico", "icon.ico");
const buildIcoPath = path.join(__dirname, "build", "icon.ico");
const rceditBin = path.join(__dirname, "node_modules", "rcedit", "bin", "rcedit-x64.exe");
const nsisPath = "C:\\Program Files (x86)\\NSIS\\makensis.exe";

try {
  if (!fs.existsSync(exePath)) { console.error("exe not found"); process.exit(1); }

  // Step 1: Set icon
  var iconFile = fs.existsSync(icoPath) ? icoPath : pngPath;
  if (fs.existsSync(rceditBin)) {
    console.log("Setting icon: " + iconFile);
    execSync('"' + rceditBin + '" "' + exePath + '" --set-icon "' + iconFile + '"', { stdio: "inherit" });
    console.log("Icon set!");
  }

  // Step 2: Copy ico to build folder for NSIS
  if (fs.existsSync(icoPath)) {
    fs.copyFileSync(icoPath, buildIcoPath);
    console.log("ICO copied to build folder");
  }

  // Step 3: Generate NSIS installer
  if (fs.existsSync(nsisPath)) {
    console.log("Generating installer...");
    execSync('"' + nsisPath + '" installer.nsi', { stdio: "inherit", cwd: __dirname });
    console.log("Installer created!");
  } else {
    console.log("NSIS not found, skipping installer");
  }

  // Step 4: Copy portable version
  var srcDir = path.join(__dirname, "dist-output", "win-unpacked");
  var destDir = "C:\\Users\\HelloWorld\\Downloads\\Thunder HTTPS";
  if (fs.existsSync(destDir)) fs.rmSync(destDir, { recursive: true });
  console.log("Copying portable files...");
  fs.cpSync(srcDir, destDir, { recursive: true });

  console.log("Done!");
  console.log("Installer: C:\\Users\\HelloWorld\\Downloads\\Thunder HTTPS Setup 2.0.0.exe");
  console.log("Portable: C:\\Users\\HelloWorld\\Downloads\\Thunder HTTPS");
} catch (e) { console.error("Error:", e.message); process.exit(1); }