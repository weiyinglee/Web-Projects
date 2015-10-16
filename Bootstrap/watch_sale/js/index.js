/* helper functions */
function sliderShow(){

    var $am = $('#ali_mountain_pic');
    var $sm = $('#sun_moon_lake_pic');

    if($am.css('visibility') == 'visible'){
        $am.hide().css('visibility', 'hidden');
        $sm.show().css('visibility', 'visible');
    }else {
        $sm.hide().css('visibility', 'hidden');
        $am.show().css('visibility', 'visible');
    }

}

/* picture slider show */
$(function(){
    setInterval(sliderShow, 3500);
});