/* Jison generated parser */
var SkipLogic = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"e":4,"EOF":5,"QUOTED_STRING":6,"DQUOTE":7,"STRING":8,"+":9,"-":10,"*":11,"/":12,"==":13,"!=":14,">":15,"<":16,">=":17,"<=":18,"(":19,")":20,"and":21,"or":22,"BOOL":23,"NUMBER":24,"VARIABLE":25,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"DQUOTE",8:"STRING",9:"+",10:"-",11:"*",12:"/",13:"==",14:"!=",15:">",16:"<",17:">=",18:"<=",19:"(",20:")",21:"and",22:"or",23:"BOOL",24:"NUMBER",25:"VARIABLE"},
productions_: [0,[3,2],[6,2],[6,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,1],[4,1],[4,1],[4,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: if (typeof console !== 'undefined') {
          console.log($$[$0-1]);
      }else{
          //print($$[$0-1]);
      }  
      return $$[$0-1]; 
    
break;
case 2:this.$ =  "''";
break;
case 3:this.$ =  '"' + $$[$0-1] + '"';
break;
case 4:this.$ = $$[$0-2] + " + " + $$[$0];
break;
case 5:this.$ = $$[$0-2] + " - " + $$[$0];
break;
case 6:this.$ = $$[$0-2] + " * " + $$[$0];
break;
case 7:this.$ = $$[$0-2] + " / " + $$[$0];
break;
case 8:this.$ =  "-" + $$[$0];
break;
case 9:this.$ = $$[$0-2] + " == " + $$[$0];
break;
case 10:this.$ = $$[$0-2] + " != " + $$[$0];
break;
case 11:this.$ = $$[$0-2] + " > " + $$[$0];
break;
case 12:this.$ = $$[$0-2] + " < " + $$[$0];
break;
case 13:this.$ = $$[$0-2] + " >= " + $$[$0];
break;
case 14:this.$ = $$[$0-2] + " <= " + $$[$0];
break;
case 15:this.$ = '(' + $$[$0-1] + ')';
break;
case 16:this.$ = $$[$0-2] + " && " + $$[$0];
break;
case 17:this.$ = $$[$0-2] + " || " + $$[$0];
break;
case 18:this.$ = $$[$0].toLowerCase()
break;
case 19:this.$ = $$[$0];
break;
case 21:this.$ = "__record__.get('" + $$[$0] + "')";
break;
}
},
table: [{3:1,4:2,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{1:[3]},{5:[1,10],9:[1,11],10:[1,12],11:[1,13],12:[1,14],13:[1,15],14:[1,16],15:[1,17],16:[1,18],17:[1,19],18:[1,20],21:[1,21],22:[1,22]},{4:23,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{4:24,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{5:[2,18],9:[2,18],10:[2,18],11:[2,18],12:[2,18],13:[2,18],14:[2,18],15:[2,18],16:[2,18],17:[2,18],18:[2,18],20:[2,18],21:[2,18],22:[2,18]},{5:[2,19],9:[2,19],10:[2,19],11:[2,19],12:[2,19],13:[2,19],14:[2,19],15:[2,19],16:[2,19],17:[2,19],18:[2,19],20:[2,19],21:[2,19],22:[2,19]},{5:[2,20],9:[2,20],10:[2,20],11:[2,20],12:[2,20],13:[2,20],14:[2,20],15:[2,20],16:[2,20],17:[2,20],18:[2,20],20:[2,20],21:[2,20],22:[2,20]},{5:[2,21],9:[2,21],10:[2,21],11:[2,21],12:[2,21],13:[2,21],14:[2,21],15:[2,21],16:[2,21],17:[2,21],18:[2,21],20:[2,21],21:[2,21],22:[2,21]},{7:[1,25],8:[1,26]},{1:[2,1]},{4:27,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{4:28,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{4:29,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{4:30,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{4:31,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{4:32,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{4:33,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{4:34,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{4:35,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{4:36,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{4:37,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{4:38,6:7,7:[1,9],10:[1,3],19:[1,4],23:[1,5],24:[1,6],25:[1,8]},{5:[2,8],9:[2,8],10:[2,8],11:[2,8],12:[2,8],13:[2,8],14:[2,8],15:[2,8],16:[2,8],17:[2,8],18:[2,8],20:[2,8],21:[2,8],22:[2,8]},{9:[1,11],10:[1,12],11:[1,13],12:[1,14],13:[1,15],14:[1,16],15:[1,17],16:[1,18],17:[1,19],18:[1,20],20:[1,39],21:[1,21],22:[1,22]},{5:[2,2],9:[2,2],10:[2,2],11:[2,2],12:[2,2],13:[2,2],14:[2,2],15:[2,2],16:[2,2],17:[2,2],18:[2,2],20:[2,2],21:[2,2],22:[2,2]},{7:[1,40]},{5:[2,4],9:[2,4],10:[2,4],11:[1,13],12:[1,14],13:[2,4],14:[2,4],15:[2,4],16:[2,4],17:[2,4],18:[2,4],20:[2,4],21:[2,4],22:[2,4]},{5:[2,5],9:[2,5],10:[2,5],11:[1,13],12:[1,14],13:[2,5],14:[2,5],15:[2,5],16:[2,5],17:[2,5],18:[2,5],20:[2,5],21:[2,5],22:[2,5]},{5:[2,6],9:[2,6],10:[2,6],11:[2,6],12:[2,6],13:[2,6],14:[2,6],15:[2,6],16:[2,6],17:[2,6],18:[2,6],20:[2,6],21:[2,6],22:[2,6]},{5:[2,7],9:[2,7],10:[2,7],11:[2,7],12:[2,7],13:[2,7],14:[2,7],15:[2,7],16:[2,7],17:[2,7],18:[2,7],20:[2,7],21:[2,7],22:[2,7]},{5:[2,9],9:[1,11],10:[1,12],11:[1,13],12:[1,14],13:[2,9],14:[1,16],15:[1,17],16:[1,18],17:[1,19],18:[1,20],20:[2,9],21:[2,9],22:[2,9]},{5:[2,10],9:[1,11],10:[1,12],11:[1,13],12:[1,14],13:[2,10],14:[2,10],15:[1,17],16:[1,18],17:[1,19],18:[1,20],20:[2,10],21:[2,10],22:[2,10]},{5:[2,11],9:[1,11],10:[1,12],11:[1,13],12:[1,14],13:[2,11],14:[2,11],15:[2,11],16:[1,18],17:[1,19],18:[1,20],20:[2,11],21:[2,11],22:[2,11]},{5:[2,12],9:[1,11],10:[1,12],11:[1,13],12:[1,14],13:[2,12],14:[2,12],15:[2,12],16:[2,12],17:[2,12],18:[1,20],20:[2,12],21:[2,12],22:[2,12]},{5:[2,13],9:[1,11],10:[1,12],11:[1,13],12:[1,14],13:[2,13],14:[2,13],15:[2,13],16:[1,18],17:[2,13],18:[1,20],20:[2,13],21:[2,13],22:[2,13]},{5:[2,14],9:[1,11],10:[1,12],11:[1,13],12:[1,14],13:[2,14],14:[2,14],15:[2,14],16:[2,14],17:[2,14],18:[2,14],20:[2,14],21:[2,14],22:[2,14]},{5:[2,16],9:[1,11],10:[1,12],11:[1,13],12:[1,14],13:[1,15],14:[1,16],15:[1,17],16:[1,18],17:[1,19],18:[1,20],20:[2,16],21:[2,16],22:[1,22]},{5:[2,17],9:[1,11],10:[1,12],11:[1,13],12:[1,14],13:[1,15],14:[1,16],15:[1,17],16:[1,18],17:[1,19],18:[1,20],20:[2,17],21:[2,17],22:[2,17]},{5:[2,15],9:[2,15],10:[2,15],11:[2,15],12:[2,15],13:[2,15],14:[2,15],15:[2,15],16:[2,15],17:[2,15],18:[2,15],20:[2,15],21:[2,15],22:[2,15]},{5:[2,3],9:[2,3],10:[2,3],11:[2,3],12:[2,3],13:[2,3],14:[2,3],15:[2,3],16:[2,3],17:[2,3],18:[2,3],20:[2,3],21:[2,3],22:[2,3]}],
defaultActions: {10:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this._input = this.match.slice(n) + this._input;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/\n.*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
            this.yytext += match[0];
            this.match += match[0];
            this.yyleng = this.yytext.length;
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:this.begin('string'); console.log("qs"); return 7;
break;
case 2:this.popState(); console.log("qe"); return 7;
break;
case 3:console.log("qm"); return 8;
break;
case 4:return 24;
break;
case 5:return 22;
break;
case 6:return 21;
break;
case 7:return 23;
break;
case 8:return 25;
break;
case 9:return 11;
break;
case 10:return 12;
break;
case 11:return 10;
break;
case 12:return 9;
break;
case 13:return 19;
break;
case 14:return 20;
break;
case 15:return 13;
break;
case 16:return 14;
break;
case 17:return 15;
break;
case 18:return 16;
break;
case 19:return 17;
break;
case 20:return 18;
break;
case 21:return 5;
break;
}
};
lexer.rules = [/^\s+/,/^["]/,/^["]/,/^([^"])+/,/^[0-9]+(\.[0-9]+)?\b/,/^((or)|(OR))\b/,/^((and)|(AND))\b/,/^((TRUE)|(true)|(FALSE)|(false))\b/,/^[_a-zA-Z]+[_a-zA-Z0-9]*\b/,/^\*/,/^\//,/^-/,/^\+/,/^\(/,/^\)/,/^==/,/^!=/,/^>/,/^</,/^>=/,/^<=/,/^$/];
lexer.conditions = {"string":{"rules":[2,3],"inclusive":false},"INITIAL":{"rules":[0,1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
return parser;
})();