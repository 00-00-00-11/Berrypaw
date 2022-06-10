import colors from 'colors';

const info = (id, title, json) => {
    console.log(`[${id.red}] ${title.green} - ${JSON.stringify(json)}`);
}

const error = (id, title, json) => {
    console.log(`[${id.green}] ${title.red} - ${JSON.stringify(json)}`);
}

export default {
    info,
    error
};