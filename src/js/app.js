import $ from 'jquery';
import {parseCode} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });
    $('#codeParserTable').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        parsedCode = parsedCode.map(x => Object.values(x));
        parsedCode.unshift(['Line', 'Type', 'Name', 'Condition', 'Value']);
        let table = makeTableHTML(parsedCode);
        if(!$('#table').empty()){
            $('#table').remove();
        }
        $('#table').append(table);
    });
});

function makeTableHTML(myArray) {
    let result = '<table border = 1>';
    for(let i = 0; i < myArray.length; i++) {
        result += '<tr>';
        for(let j = 0; j < myArray[i].length; j++){
            result += '<td>' + myArray[i][j] + '</td>';
        }
        result += '</tr>';
    }
    result += '</table>';
    return result;
}