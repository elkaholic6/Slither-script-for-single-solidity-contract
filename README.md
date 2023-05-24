# Slither Analysis Script
This script allows you to perform static analysis on a Solidity codebase using the Slither tool and filter the analysis results based on a specific contract(s).

## Prerequisites
Before using this script, make sure you have the following dependencies installed:
- Node.js (version 12 or higher)
- Slither (install instructions: https://github.com/crytic/slither)
## Installation
1. Clone or download this repo to your local machine, into the root directory of the codebase to be analyzed.
2. Open a terminal and navigate to the directory where you saved the script.
3. Install the required Node.js packages by running the following command:
```
npm install
```
## Usage
1. Run the script using the following command:
```
node runSlitherAndScanAnalysis.js
```
2. The script will prompt you for the following information:

  - Enter full path of the root directory to analyze:
Provide the full path to the root directory of the codebase you want to analyze.

  - Provide a name for the entire slither output file (must end with .txt):
This will be the complete Slither analysis of all the .sol contracts in the codebase. This file's extension must be `.txt`.

  - What is the .sol file you want to analyze? Must end with .sol (leave empty to proceed): :
Provide the name for a particular .sol file to be analyzed. The file extension must be `.sol`. To skip, leave empty.

  - Provide name for filtered file. Must end with .txt:
This will be the Slither analysis associated with the .sol file given in the previous question. This file's extension must be `.txt`.

3. Once you provide the necessary information, the script will run the Slither analysis on the entire codebase, will filter the analysis based on the specified .sol files provided, and will output the results to their respective .txt files.
#### NOTE: Slither may send certain messages or information to stderr instead of stdout if it encounters any issues or errors during the analysis. This script accounts for such instances and will direct both stderr and stdout to the intended text file. This will result in an error being logged to the console. If so, this error may be ignored if the desired results are achieved.

  - Complete Slither analysis results written to the entire slither text file:
This file contains the complete output of the Slither analysis.

  - Filtered Slither analysis results written to the filtered text files:
This file contains only the lines from the Slither analysis that match the specific contract.

## Additional Notes
  - The script uses the slither command-line tool and assumes it is installed and available in your system's PATH.
  - You can run the script multiple times with different input files and output names without conflicts.
  - If there are any errors or issues during the analysis or filtering process, error messages will be displayed in the terminal.
That's it! You can now use this script to perform Slither analysis on your Solidity files and filter the specific contract to its own text file.
