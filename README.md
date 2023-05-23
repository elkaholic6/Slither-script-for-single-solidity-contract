# Slither Analysis Script
This script allows you to perform static analysis on a Solidity (.sol) file using the Slither tool and filter the analysis results based on a specific contract.

## Prerequisites
Before using this script, make sure you have the following dependencies installed:
- Node.js (version 12 or higher)
- Slither (install instructions: https://github.com/crytic/slither)
## Installation
1. Clone or download the script to your local machine.
2. Open a terminal and navigate to the directory where you saved the script--script must be in root directory of codebase to function properly.
3. Install the required Node.js packages by running the following command:
```
npm install
```
## Usage
1. Open a terminal and navigate to the directory where you saved the script.
2. Run the script using the following command:
```
node slither-analysis-script.js
```
3. The script will prompt you for the following information:

  - Enter the .sol file you want to analyze (must end with .sol):
Provide the relative or absolute path to the Solidity file you want to analyze. Make sure the file extension is .sol.

  - Provide a name for the entire slither output file (must end with .txt):
Choose a name for the file that will contain the complete Slither analysis results. The file extension must be .txt.

  - Provide a name for the filtered output file (must end with .txt):
Choose a name for the file that will contain the filtered lines based on specific keywords. The file extension must be .txt.

4. Once you provide the necessary information, the script will run the Slither analysis on the specified Solidity file. It will generate two output files:

  - The entire slither output file:
This file contains the complete output of the Slither analysis.

  - The filtered output file:
This file contains only the lines from the Slither analysis that match the specific contract.

## Additional Notes
  - The script uses the slither command-line tool and assumes it is installed and available in your system's PATH.
  - The generated output files will be saved in the same directory where the script is located.
  - You can run the script multiple times with different input files and output names without conflicts.
  - If there are any errors or issues during the analysis or filtering process, error messages will be displayed in the terminal.
That's it! You can now use this script to perform Slither analysis on your Solidity files and filter the specific contract to its own text file.
