# Topic Modelling

Topic modelling execution script using MALLET as its foundation library.

# Pre-requisites
Make sure to have following items downloaded and installed on your system before triggering data collection pipeline.

1. Nodejs 10.0+ and npm 
2. MALLET library (http://mallet.cs.umass.edu/)


# Preparation
First thing first. Perform following steps in the given order:

1. Download this project by cloning it from git.
2. Open the project in your favorite editor (vscode) and open the terminal using Ctrl + `
3. Run `npm install ` commands on the terminal.
4. Install MALLET and add `Mallet\bin` folder to PATH environment variable.
5. Make sure to have `dataset` and `modelling` folder inside the root of your project, if it is not already there. The `dataset` folder contains the all the text files which is going to be read by MALLET for topic modelling. And `modelling` folder will contain the output of topic modelling.

# Scripts
There are two scripts which runs Topic modelling using MALLET in two steps as mentioned below:

## import.js
This step is preprocess the text files dataset and generate a mallet training file at `modelling` folder at the root of the project. This file generated will act as input for next step. As an input in this step, it requires all the text files should be placed inside `dataset` folder at the root of the project.

Use following command:

    node src/import.js --file <filename e.g. repo.mallet>

## train.js
This step is about executing topic modelling on the mallet file produced by the previous step. It takes the input file produced in step 4 and generates output in folders inside `modelling` folder. By default it looks for the given file name in `modelling` directory. And if filename is not provided, then `repositories.mallet` is considered as default.

Use the following command:

    node src/train.js --start 5 --end 20 --increment 1 --file repository.mallet

## License
MIT License
