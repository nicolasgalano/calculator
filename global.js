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
                if(active)
                    value = 0;
                    active = false;
                value = parseInt( '' + value + this.getAttribute('data-number') );
                show(value);
            });
        }
        //AC
        bindOnClick($('ac'),function(){
            value = 0;
            preValue = 0;
            active = false;
            func = 'non';
            show(value);
        });
        //+
        bindOnClick($('sum'),function(){
            if(func != 'non')
                resolve();
            func = 'sum';
            preValue = value;
            show(value);
            active = true;
        });
        //-
        bindOnClick($('sub'),function(){
            if(func != 'non')
                resolve();
            func = 'sub';
            preValue = value;
            show(value);
            active = true;
        });
        //*
        bindOnClick($('mul'),function(){
            if(func != 'non')
                resolve();
            func = 'mul';
            preValue = value;
            show(value);
            active = true;
        });
        // /
        bindOnClick($('div'),function(){
            if(func != 'non')
                resolve();
            func = 'div';
            preValue = value;
            show(value);
            active = true;
        });
        // exponential
        bindOnClick($('exp'),function(){
            if(func != 'non')
                resolve();
            func = 'exp';
            preValue = value;
            show(value);
            active = true;
        });
        //=
        bindOnClick($('eq'),function(){
            resolve();
            func = 'non';
            preValue = 0;
            show(value);
        });
    }
    //+
    , suma = function(){
        value = value+preValue;
    }
    //-
    , resta = function(){
        if(preValue<0 && value<0){
            value =  preValue+value;
        }else{
            value =  preValue-value;
        }
    }
    //*
    , mult = function(){
        value = value*preValue;
    }
    // /
    , divi = function(){
        value = preValue/value;
    }
    // exponential
    , expo = function(){
        value = Math.pow(preValue, value);
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
    //SHOW
    , show = function(text){
        $visual.innerHTML = text;
    }
    , $ = function(selector){
        return document.getElementById(selector);
    }
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

    calculator.init();

});
