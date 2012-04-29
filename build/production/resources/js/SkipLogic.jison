/* description: Parses skip logic */

/* lexical grammar */

%lex
%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b              return 'NUMBER';
((or)|(OR))\b                       return 'or';
((and)|(AND))\b                     return 'and';
((TRUE)|(true)|(FALSE)|(false))\b   return 'BOOL';
[_a-zA-Z]+[_a-zA-Z0-9]*\b  return 'VARIABLE';
"*"                   return '*';
"/"                   return '/';
"-"                   return '-';
"+"                   return '+';
"("                   return '(';
")"                   return ')';

"=="                  return '==';
"!="                  return '!=';
">"                   return '>';
"<"                   return '<';
">="                  return '>=';
"<="                  return '<=';

<<EOF>>               return 'EOF';
/lex

%left 'and'
%left 'or'
%left '=='
%left '!='
%left '>'
%left '>='
%left '<'
%left '<='
%left '+' '-'
%left '*' '/'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
  : e EOF
    { if (typeof console !== 'undefined') {
          console.log($1);
      }else{
          //print($1);
      }  
      return $1; 
    }
    
  ;

e
  : e '+' e
    {$$ = $1 + " + " + $3;}
 
  | e '-' e
    {$$ = $1 + " - " + $3;}

  | e '*' e
    {$$ = $1 + " * " + $3;}

  | e '/' e
    {$$ = $1 + " / " + $3;}
  
  | '-' e %prec UMINUS
    {$$ =  "-" + $2;}

  | e '==' e
    {$$ = $1 + " == " + $3;}

  | e '!=' e
    {$$ = $1 + " != " + $3;}

  | e '>' e
    {$$ = $1 + " > " + $3;}

  | e '<' e
    {$$ = $1 + " < " + $3;}

  | e '>=' e
    {$$ = $1 + " >= " + $3;}

  | e '<=' e
    {$$ = $1 + " <= " + $3;}

  | '(' e ')'
    {$$ = '(' + $2 + ')';}

  | e 'and' e
    {$$ = $1 + " && " + $3;}

  | e 'or' e
    {$$ = $1 + " || " + $3;}

  | 'BOOL'
    {$$ = $1.toLowerCase()}

  | NUMBER
    {$$ = $1;}
  
  | VARIABLE
    {$$ = "__record__.get('" + $1 + "')";}
  
  ;
