const { addNote, removeNote, listNote } = require('./notes');
const chalk = require('chalk');
const args = process.argv.slice(2);
const command = args[0];

const getArgValue = (flag) => {
    const index = args.indexOf(flag);
    if(index !== -1 && args[index + 1]){
        return args[index + 1].replace(/^["']|["']$/g, '');
    }
    return null;
}

switch (command) {
    case 'add': {
        const title = getArgValue('--title');
        const body = getArgValue('--body');
        if(!title || !body){
            console.log(chalk.yellow('Please provide --title and --body to add a note.'));
        }
        else{
            addNote(title, body);
        }
        break;
    }
    case 'list': {
        listNote();
        break;
    }
    case 'remove': {
        const title = getArgValue('--title');
        if(!title){
            console.log(chalk.red('Please provide --title to remove a note.'));
        }
        else{
            removeNote(title);
        }
        break;
    }
    default: console.log(chalk.red('Unknown command. \nUse: add, list, remove'));
            console.log(chalk.red(`Examples: \nnode notes.js add --title "Meeting" --body "Client call at 4PM" \nnode notes.js list \nnode notes.js remove --title "Meeting"`));
}