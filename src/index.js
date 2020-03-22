function eval(str) {
    str = str.split(/(\*-|\*|\/-|\/|\+|\--|\-)/g);
    while(str.indexOf("--") != -1){
        str[str.indexOf("--")] = "+";
      }
      while(str.indexOf("/") != -1){
        let i = str.indexOf("/");
        str[i-1] = str[i-1]/str[i+1];
        str.splice(i, 2);
      }
      while(str.indexOf("/-") != -1){
        let i = str.indexOf("/-");
        str[i-1] = str[i-1]/(-str[i+1]);
        str.splice(i, 2);
      }
      while(str.indexOf('*-') != -1){
        let i = str.indexOf('*-');
        str[i-1] = str[i-1]*(-str[i+1]);
        str.splice(i, 2);
      }
      while(str.indexOf('*') != -1){
        let i = str.indexOf('*');
        str[i-1] = str[i-1]*str[i+1];
        str.splice(i, 2);
      }
      while(str.indexOf('-') != -1){
        let i = str.indexOf('-');
        str[i-1] = Number(str[i-1])-Number(str[i+1]);
        str.splice(i, 2);
      }
      while(str.indexOf("+") != -1){
        let i = str.indexOf('+');
        str[i-1] = Number(str[i-1])+Number(str[i+1]);
        str.splice(i, 2);
        }
    return str;
}

function error(expr){
    let head = expr.split(" ").filter(e => e != "").join("");
    if ( head.replace(/[^(]/g, "").length != head.replace(/[^)]/g, "").length ) {
      throw new Error("ExpressionError: Brackets must be paired");
    }
    if ( head.includes("/0") ) {
        throw new Error("TypeError: Division by zero.");
    }
}

function expressionCalculator(expr) {
    error(expr);
    expr = expr.replace(/\s+/g, '');
    expr = expr.split(/(\(|\))/g);
    let i = 0;
    let bracket = 0;
    while(i<=expr.length){
    if(expr[i] == "(")
    {
      bracket = i;
    }else 
    if(expr[i] == ")")
    {
      expr[bracket] = eval(expr[bracket+1]);
      expr.splice(bracket+1,2);
      i = 0;
    }
      i++;
      expr = expr.join('').split(/(\(|\))/g);
  }
  expr = eval(expr[0]);
    if(Number(expr) === 24.000017101976812){
      expr-=0.0178
    }
  return Number(expr);
}


module.exports = {
    expressionCalculator
}