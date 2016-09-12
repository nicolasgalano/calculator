/* ========================================================================
 * CALCULATOR
 * by: Nicolas Emilio Galano
 * September 11, 2016
 * ======================================================================== */

//CALCULATOR
var calculator = (function(){
    var $calculator
    , $visual
    , $keys
    , value
    , preValue
    , active
    , func
    , init = function(){

        $calculator = $('calculator');
        $visual = $('visual');
        $keys = $('keys');
        $numbers = $keys.getElementsByClassName('number');
        value = 0;
        preValue = 0;
        active = false;
        func = 'non';
        show(value);

        // NUMBERS CLICK
        for (var i = 0; i < $numbers.length; i++) {
            bindOnClick($numbers[i],function(){
                numberAction(this.getAttribute('data-number'));
            });
        }
        // ASSIGN CLICK FUNCIONALITIESS
        bindOnClick($('sum'),function(){
            action('sum');
        });
        bindOnClick($('sub'),function(){
            action('sub');
        });
        bindOnClick($('mul'),function(){
            action('mul');
        });
        bindOnClick($('div'),function(){
            action('div');
        });
        bindOnClick($('exp'),function(){
            action('exp');
        });
        bindOnClick($('ac'),function(){
            ac();
        });
        bindOnClick($('eq'),function(){
            equal();
        });
        bindOnClick($('point'),function(){
            point();
        });

        // KEYPRESS
        document.onkeypress = function(evt) {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            var charStr = String.fromCharCode(charCode);
            if(charStr == '*')
                action('mul');
            if(charStr == '/')
                action('div');
            if(charStr == '+')
                action('sum');
            if(charStr == '-')
                action('sub');
            if(charStr == 'e')
                action('exp');
            if(charStr == 'a')
                ac();
            if(charStr == '.')
                point();
            if(charCode == 13)
                equal();
            if(isNumeric(charStr))
                numberAction(charStr);
        };

    }
    // Addition
    , suma = function(){
        value = value+preValue;
    }
    // Subtraction
    , resta = function(){
        if(preValue<0 && value<0)
            value = preValue+value;
        else
            value = preValue-value;
    }
    // Multiplication
    , mult = function(){
        value = value*preValue;
    }
    // Division
    , divi = function(){
        value = preValue/value;
    }
    // Exponential
    , expo = function(){
        value = Math.pow(preValue, value);
    }
    // Equal
    , equal = function(){
        resolve();
        func = 'non';
        preValue = 0;
        show(value);
        $calculator.className = func;
    }
    // Reset
    , ac = function(){
        value = 0;
        preValue = 0;
        active = false;
        func = 'non';
        show(value);
        $calculator.className = func;
    }
    // Point
    , point = function(){
        var str = value.toString();
        if(str.indexOf('.') == -1)
            value = value+'.';
        show(value);
    }
    // RESOLVE
    , resolve = function(){
        switch (func) {
            case "sum":
                suma();
                break;
            case "sub":
                resta();
                break;
            case "mul":
                mult();
                break;
            case "div":
                divi();
                break;
            case "exp":
                expo();
                break;
            case "non":
                break;
        }
        value = parseFloat(value);
    }
    // SHOW
    , show = function(text){
        $visual.innerHTML = text;
    }
    // FUNC ACTIONS
    , action = function(fname){
        if(func != 'non')
            resolve();
        func = fname;
        preValue = value;
        show(value);
        active = true;
        $calculator.className = func;
    }
    // NUMBER FUNC ACTION
    , numberAction = function(number){
        if(active)
            value = 0;
            active = false;
        value = parseFloat( '' + value + '' + number );
        show(value);
    }
    // NUMERIC??
    , isNumeric = function(num){
        return !isNaN(num)
    }
    // SELECTOR
    , $ = function(selector){
        return document.getElementById(selector);
    }
    // BINDER
    , bindOnClick = function(element,clickHandler){
        if(element.addEventListener)
          element.addEventListener('click', clickHandler, false);
        else if(element.attachEvent)
           element.attachEvent('onclick', function(){ return clickHandler.apply(element, [window.event]); });
    };
    return {'init': init};
})();

// WINDOW ONLOAD
document.addEventListener("DOMContentLoaded", function(event) {
    // INIT
    calculator.init();
});
