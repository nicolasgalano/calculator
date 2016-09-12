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
    , $value
    , $active
    , init = function(){

        $calculator = $('calculator');
        $visual = $('visual');
        $keys = $('keys');
        $numbers = $keys.getElementsByClassName('number');
        value = 0;
        preValue = 0;
        active = false;
        //FUNC VALUES: sum, sub, mul, div, exp, non
        func = 'non';
        show(value);

        //NUMBERS ONCLICK
        for (i = 0; i < $numbers.length; i++) {
            bindOnClick($numbers[i],function(){
                numberAction(this.getAttribute('data-number'));
            });
        }
        //AC
        bindOnClick($('ac'),function(){
            value = 0;
            preValue = 0;
            active = false;
            func = 'non';
            show(value);
            $calculator.className = func;
        });
        // addition
        bindOnClick($('sum'),function(){
            action('sum');
        });
        // subtraction
        bindOnClick($('sub'),function(){
            action('sub');
        });
        // multiplication
        bindOnClick($('mul'),function(){
            action('mul');
        });
        // division
        bindOnClick($('div'),function(){
            action('div');
        });
        // exponential
        bindOnClick($('exp'),function(){
            action('exp');
        });
        // equal
        bindOnClick($('eq'),function(){
            equal();
        });
        //KEYPRESS
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
            if(charCode == 13)
                equal();
            if(isNumeric(charStr))
                numberAction(charStr);
        };
    }
    // addition
    , suma = function(){
        value = value+preValue;
    }
    // subtraction
    , resta = function(){
        if(preValue<0 && value<0)
            value =  preValue+value;
        else
            value =  preValue-value;
    }
    // multiplication
    , mult = function(){
        value = value*preValue;
    }
    // division
    , divi = function(){
        value = preValue/value;
    }
    // exponential
    , expo = function(){
        value = Math.pow(preValue, value);
    }
    , equal = function(){
        resolve();
        func = 'non';
        preValue = 0;
        show(value);
        $calculator.className = func;
    }
    //RESOLVE
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
    }
    //NUMERIC??
    , isNumeric = function(num){
        return !isNaN(num)
    }
    //SHOW
    , show = function(text){
        $visual.innerHTML = text;
    }
    //FUNC ACTIONS
    , action = function(f){
        if(func != 'non')
            resolve();
        func = f;
        preValue = value;
        show(value);
        active = true;
        $calculator.className = func;
    }
    //NUMBER FUNC ACTION
    , numberAction = function(number){
        if(active)
            value = 0;
            active = false;
        value = parseInt( '' + value + number );
        show(value);
    }
    //SELECTOR
    , $ = function(selector){
        return document.getElementById(selector);
    }
    //BINDER
    , bindOnClick = function(element,clickHandler){
        if(element.addEventListener)
          element.addEventListener('click', clickHandler, false);
        else if(element.attachEvent)
           element.attachEvent('onclick', function(){ return clickHandler.apply(element, [window.event])});
    }
    return {'init': init};
})();

//WINDOW ONLOAD
document.addEventListener("DOMContentLoaded", function(event) {

    //INIT
    calculator.init();

});
