//reference variable
var $inputText = $('#ali_order_num, #sun_moon_order_num').find('input[type="text"]');
var $enterBtn =

/* the input text area effect */
$(function(){

    var defaultValue = $inputText.val();

    $inputText.click(function(){
        if($(this).attr('value') == defaultValue) {
            $(this).attr('value', '');
        }
    }).blur(function(){
        if($(this).attr('value') == ''){
            $(this).attr('value', defaultValue);
        }
    });
});

/* order panel function */
$(function(){

    $('#ali_order_num, #sun_moon_order_num').find('button').click(function(){

        //use || 0 to prevent NaN
        var aliOrder = parseInt($('#ali_order_num').find('input[type="text"]').val()) || 0;
        var sunMoonOrder = parseInt($('#sun_moon_order_num').find('input[type="text"]').val()) || 0;

        var totalPrice = ( parseInt(aliOrder) + parseInt(sunMoonOrder)) * 300;

        //only 100 left
        if(totalPrice <= 30000) {
            $('#number').text(totalPrice);
        }else{
            alert('There are not enough of items in stock..');
        }
    });


});