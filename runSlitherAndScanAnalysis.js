const { spawn } = require('child_process');
const fs = require('fs');
const readline = require('readline');
const colors = require('colors');


let stderrLogged = false;

function findFile(dir, filename) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = `${dir}/${file}`;
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const foundFile = findFile(filePath, filename);
      if (foundFile) {
        return foundFile;
      }
    } else if (file === filename) {
      return filePath;
    }
  }

  return null;
}

function runAndScanSingleContractWithSlither(grepArgs, analysisResultsFile, filteredLinesFile) {
  const command = 'slither';
  const args = ['.'];
  const child = spawn(command, args);

  const grepCommand = 'grep';
  const grepChild = spawn(grepCommand, grepArgs);

  const analysisResultsStream = fs.createWriteStream(analysisResultsFile);
  child.stdout.pipe(analysisResultsStream);
  child.stderr.pipe(analysisResultsStream);

  child.stdout.pipe(grepChild.stdin);
  child.stderr.pipe(grepChild.stdin);

  const filteredLinesStream = fs.createWriteStream(filteredLinesFile);
  grepChild.stdout.pipe(filteredLinesStream);
  grepChild.stderr.pipe(filteredLinesStream);

  grepChild.on('exit', (code) => {
    if (code === 0) {
      console.log(`Filtered lines written to ${filteredLinesFile}`.green);
    } else {
      console.error('Error occurred during filtered analysis'.red);
    }
  });


  child.stderr.on('data', () => {
    if (!stderrLogged) {
      console.log('stderr data present--will result in an error during slither and/or filtered analysis. OK to ignore'.yellow);
      stderrLogged = true;
    }
  });

  child.on('exit', (code) => {
    if (code === 0) {
      console.log(`Analysis results written to ${analysisResultsFile}`.green);
    } else {
      console.error('Error occurred during slither analysis'.red);
    }
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const analyzeMultipleContracts = (rootDir, resultsFile) => {
  const solFiles = [];

  const promptSolFile = () => {
    rl.question('What is the .sol file you want to analyze? Must end with .sol (leave empty to proceed): \n'.cyan, (solFile) => {
      if (solFile === '') {
        analyzeContracts(rootDir, solFiles, resultsFile);
        return;
      }

      if (!solFile.endsWith('.sol')) {
        console.error('Invalid file format. Please provide a .sol file.');
        promptSolFile();
        return;
      }

      const foundFilePath = findFile(rootDir, solFile);
      if (!foundFilePath) {
        console.error('File does not exist.');
        promptSolFile();
        return;
      }

      rl.question('Provide name for filtered file. Must end with .txt: \n'.cyan, (filteredFile) => {
        if (!filteredFile.endsWith('.txt')) {
          console.error('Invalid file format. Please provide a .txt file for filtered results.');
          rl.close();
          return;
        }

        const grepArgs = [solFile];
        const analysisResultsFile = `${rootDir}/${resultsFile}`;
        const filteredLinesFile = `${rootDir}/${filteredFile}`;

        solFiles.push({ filePath: foundFilePath, grepArgs, filteredLinesFile });
        promptSolFile();
      });
    });
  };

  promptSolFile();
};

const analyzeContracts = (rootDir, solFiles, resultsFile) => {
  const analysisResultsFile = `${rootDir}/${resultsFile}`;

  solFiles.forEach((solFile) => {
    const { filePath, grepArgs, filteredLinesFile } = solFile;
    process.chdir(rootDir);

    console.log(`Running Slither analysis on ${filePath}...`.cyan);
    runAndScanSingleContractWithSlither(grepArgs, analysisResultsFile, filteredLinesFile);
  });

  rl.close();
};

rl.question('Enter full path of the root directory to analyze: \n'.cyan, (rootDir) => {
  if (!fs.existsSync(rootDir)) {
    console.error('Directory does not exist.');
    rl.close();
    return;
  }

  rl.question('Provide name for entire slither output file. Must end with .txt: \n'.cyan, (resultsFile) => {
    if (!resultsFile.endsWith('.txt')) {
      console.error('Invalid file format. Please provide a .txt file for results.');
      rl.close();
      return;
    }

    analyzeMultipleContracts(rootDir, resultsFile);
  });
});
