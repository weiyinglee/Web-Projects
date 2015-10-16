/* nav bar hover affect */
$(function(){

    var $linkBtn = $('.navbar-collapse a');
    var defaultBGColor = $linkBtn.css('background');
    var defaultFontColor = $linkBtn.css('color');
    var defaultFontWt = $linkBtn.css('font-weight');

    $linkBtn.mouseover(function(){
        $(this).css({
            'background': 'rgba(255, 255, 255, 1.0)',
            'color': 'black',
            'font-weight': 'bold'
        });
    }).mouseleave(function(){
        $(this).css({
            'background': defaultBGColor,
            'color': defaultFontColor,
            'font-weight': defaultFontWt
        });
    });
});