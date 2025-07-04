const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const notesFile = path.join(__dirname, 'notes.json');

function loadNotes() {
    try{
        const dataBuffer = fs.readFileSync(notesFile);
        const data = dataBuffer.toString();
        return Array.isArray(JSON.parse(data))? JSON.parse(data) : [];
    }
    catch(e) {
        return [];
    }
}

function saveNotes(notes) {
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
}

function addNote(title, body) {
    const notes = loadNotes();
    const duplicate = notes.find(note => note.title === title);
    if(duplicate){
        console.log(chalk.yellow(`Note with title "${chalk.bold(`${title}`)}" already exists.`));
        return;
    }
    notes.push({title, body});
    saveNotes(notes);
    // console.log(chalk.green(`Note added: ${chalk.bold(title)}`));
    console.log(chalk.green(`Note added: ${chalk.bold(`${title}`)}`));
}

function listNote() {
    const notes = loadNotes();
    if(notes.length === 0){
        console.log(chalk.red("no notes found."));
        return;
    }
    console.log(chalk.cyanBright.bgWhite("Your Notes:"));
    notes.forEach((note, index) => {
        console.log(chalk.blueBright(`${index + 1}. ${note.title}: ${note.body}`));
    });
}

function removeNote(title) {
    const notes = loadNotes();
    const filtered = notes.filter(note => note.title !== title);
    if(notes.length === filtered.length){
        console.log(chalk.red(`No Note found with title "${chalk.bold(`${title}`)}".`));
        return;
    }
    saveNotes(filtered);
    console.log(chalk.green(`Note removed: ${chalk.bold(`${title}`)}`));
}

module.exports = {
    addNote,
    listNote,
    removeNote
};