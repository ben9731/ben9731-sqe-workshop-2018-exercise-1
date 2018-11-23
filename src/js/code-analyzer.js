import * as esprima from 'esprima';

let originalCode;

const parseCode = (codeToParse) => {
    originalCode = codeToParse;
    return parseCodeNew(esprima.parseScript(codeToParse, {loc : true}));
};

const parseCodeNew = (codeToParse) => {
    let arr = [];
    if (codeToParse != null) {
        arr = typeFind(codeToParse.type)(codeToParse);
    }
    return arr;
};

const parseProgram = (codeToParse) => {
    let arr = [];
    codeToParse.body.forEach(function (element) {
        arr = arr.concat(parseCodeNew(element));
    });
    return arr;
};

const parseFunctionDeclaration = (codeToParse) => {
    let arr = [];
    arr.push({Line : codeToParse.loc.start.line, Type : 'function declaration', Name : codeToParse.id.name, Condition : '', Value : ''});
    codeToParse.params.forEach(function (element) {
        arr.push({Line : element.loc.start.line, Type : 'variable declaration', Name : element.name, Condition : '', Value : ''});
    });
    arr = arr.concat(parseCodeNew(codeToParse.body));
    return arr;
};

const parseBlockStatement = (codeToParse) => {
    let arr = [];
    codeToParse.body.forEach(function (element) {
        arr = arr.concat(parseCodeNew(element));
    });
    return arr;
};

const parseVariableDeclaration = (codeToParse) => {
    let arr = [];
    codeToParse.declarations.forEach(function (element) {
        if (element.init != null) {
            arr.push({Line : element.loc.start.line, Type : 'variable declaration', Name : element.id.name, Condition : '', Value : stringifyEquation(element.init)});
        }
        else {
            arr.push({Line : element.loc.start.line, Type : 'variable declaration', Name : element.id.name, Condition : '', Value : ''});
        }
    });
    return arr;
};

const parseExpressionStatement = (codeToParse) => {
    return parseCodeNew(codeToParse.expression);
};

const parseAssignmentExpressionStatement = (codeToParse) => {
    let arr = [];
    arr.push({Line : codeToParse.loc.start.line, Type : 'assignment expression', Name : codeToParse.left.name, Condition : '', Value : stringifyEquation(codeToParse.right)});
    return arr;
};

const parseUpdateExpressionStatement = (codeToParse) => {
    let arr = [];
    let str;
    if (codeToParse.operator === '++') {
        str = codeToParse.argument.name + ' + 1';
        arr.push({Line : codeToParse.loc.start.line, Type : 'update expression', Name : codeToParse.argument.name, Condition : '', Value : str});
    }
    else {
        str = codeToParse.argument.name + ' - 1';
        arr.push({Line : codeToParse.loc.start.line, Type : 'update expression', Name : codeToParse.argument.name, Condition : '', Value : str});
    }
    return arr;
};

const parseSequenceExpressionStatement = (codeToParse) => {
    let arr = [];
    codeToParse.expressions.forEach(function (element) {
        arr = arr.concat(parseCodeNew(element));
    });
    return arr;
};

const stringifyEquation = (right) => {
    let temp = originalCode;
    let start, end, line;
    start = right.loc.start.column;
    end = right.loc.end.column;
    line = right.loc.start.line;
    while (line > 1) {
        temp = temp.substring(temp.indexOf('\n') + 1);
        line--;
    }
    return temp.substring(start, end);
};

const parseWhileStatement = (codeToParse) => {
    let arr = [];
    arr.push({Line : codeToParse.loc.start.line, Type : 'while statement', Name : '', Condition : stringifyEquation(codeToParse.test), Value : ''});
    arr = arr.concat(parseCodeNew(codeToParse.body));
    return arr;
};

const parseIfStatement = (codeToParse) => {
    let arr = [];
    arr.push({Line : codeToParse.loc.start.line, Type : 'if statement', Name : '', Condition : stringifyEquation(codeToParse.test), Value : ''});
    arr = arr.concat(parseCodeNew(codeToParse.consequent));
    if (codeToParse.alternate != null) {
        arr = arr.concat(parseElseStatement(codeToParse.alternate));
    }
    return arr;
};

const parseElseStatement = (codeToParse) => {
    let arr = [];
    if (codeToParse.type === 'IfStatement') {
        arr.push({Line : codeToParse.loc.start.line, Type : 'else if statement', Name : '', Condition : stringifyEquation(codeToParse.test), Value : ''});
        arr = arr.concat(parseCodeNew(codeToParse.consequent));
        if (codeToParse.alternate != null) {
            arr = arr.concat(parseElseStatement(codeToParse.alternate));
        }
    }
    else {
        arr = arr.concat(parseCodeNew(codeToParse));
    }
    return arr;
};

const parseReturnStatement = (codeToParse) => {
    let arr = [];
    arr.push({Line : codeToParse.loc.start.line, Type : 'return statement', Name : '', Condition : '', Value : stringifyEquation(codeToParse.argument)});
    return arr;
};

const parseForStatement = (codeToParse) => {
    let arr = [];
    let str = '';
    if (codeToParse.test !== null) {
        str = stringifyEquation(codeToParse.test);
    }
    arr.push({Line : codeToParse.loc.start.line, Type : 'for statement', Name : '', Condition : str, Value : ''});
    arr = arr.concat(parseCodeNew(codeToParse.init));
    arr = arr.concat(parseCodeNew(codeToParse.update));
    arr = arr.concat(parseCodeNew(codeToParse.body));
    return arr;
};

const typeFind = (type) => {
    let arrayFunction = [];
    arrayFunction['Program'] = parseProgram;
    arrayFunction['FunctionDeclaration'] = parseFunctionDeclaration;
    arrayFunction['BlockStatement'] = parseBlockStatement;
    arrayFunction['VariableDeclaration'] = parseVariableDeclaration;
    arrayFunction['ExpressionStatement'] = parseExpressionStatement;
    arrayFunction['AssignmentExpression'] = parseAssignmentExpressionStatement;
    arrayFunction['UpdateExpression'] = parseUpdateExpressionStatement;
    arrayFunction['SequenceExpression'] = parseSequenceExpressionStatement;
    arrayFunction['WhileStatement'] = parseWhileStatement;
    arrayFunction['IfStatement'] = parseIfStatement;
    arrayFunction['ReturnStatement'] = parseReturnStatement;
    arrayFunction['ForStatement'] = parseForStatement;
    return arrayFunction[type];
};

export {parseCode};
