const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

 const github = async (client, jid, pika, username, reponame) => {
  const owner = username || 'PikaBotz';
  const repo = reponame || 'Anya_v2-MD';
  
    const branchesResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/branches`, {
      headers: { 'User-Agent': 'Node.js' }
    });
    const branches = branchesResponse.data;

    const branchCommits = await Promise.all(branches.map(async (branch) => {
      const commitResponse = await axios.get(branch.commit.url, {
        headers: { 'User-Agent': 'Node.js' }
      });
      return {
        name: branch.name,
        commit: commitResponse.data
      };
    }));

    const latestBranch = branchCommits.sort((a, b) => new Date(b.commit.commit.committer.date) - new Date(a.commit.commit.committer.date))[0];
    const branchName = latestBranch.name;
    const latestCommitSha = latestBranch.commit.sha;
    const commitName = latestBranch.commit.commit.message;
    const zipDownloadUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/${branchName}.zip`;

    const foldername = "folder";
    if (!fs.existsSync(foldername)) {
      fs.mkdirSync(foldername);
    }

    const filename = `${foldername}/${repo}-${branchName}-${latestCommitSha}.zip`;
    const zipPath = path.join(__dirname, filename);

    if (!fs.existsSync(zipPath)) {
      fs.readdirSync(foldername).forEach((file) => {
        fs.unlinkSync(path.join(foldername, file));
      });

      const writer = fs.createWriteStream(zipPath);
      const response = await axios({
        url: zipDownloadUrl,
        method: 'GET',
        responseType: 'stream'
      });

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log('Zip file downloaded successfully');
    } else {
      console.log('File already exists, no need to download.');
    }

    const extractPath = path.join(__dirname, foldername, 'extracted');
    if (fs.existsSync(extractPath)) {
      fs.rmdirSync(extractPath, { recursive: true });
    }
    fs.mkdirSync(extractPath);

    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractPath, true);

    function listFilesRecursively(dir, indent = '') {
      fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const isDirectory = fs.lstatSync(fullPath).isDirectory();
        if (isDirectory) {
          listFilesRecursively(fullPath, `${indent}  `);
        }
      });
    }
    listFilesRecursively(extractPath);

    const targetFolder = path.join(extractPath, 'Anya_v2-MD-master');
    const newZipPath = path.join(__dirname, `${foldername}/${repo}-${branchName}-new.zip`);
    const newZip = new AdmZip();

    if (fs.existsSync(targetFolder)) {
      newZip.addLocalFolder(targetFolder);
      newZip.writeZip(newZipPath);
      console.log('New zip file created successfully');
    } else {
      console.error(`Target folder ${targetFolder} does not exist.`);
    }
    
client.sendMessage(jid, { document: newZipPath, filename: repo, mimetype: 'application/zip' }, { quoted: pika });
};

module.exports = {
  github
};