//reference variable
var $watchPic = $('#watch_face, #watch_belt, #watch_heart');

/* screen smaller special picture function */
if($(window).width() < 768){    //if the screen is small in first place
    $watchPic.mouseover(function () {
        if ($(window).width() < 768) {
            $(this).find('.watch_pic').hide().css('visibility', 'hidden');
            $(this).find('.word_describe').css('visibility', 'visible').show();
        }
    }).mouseleave(function () {
        if ($(window).width() < 768) {
            $(this).find('.watch_pic').css('visibility', 'visible').show();
            $(this).find('.watch_describe').css('visibility', 'hidden').hide();
        }
    });
}else { //screen is big in the first, function when it's resizing
    $(window).resize(function () {
        $watchPic.mouseover(function () {
            if ($(window).width() < 768) {
                $(this).find('.watch_pic').hide().css('visibility', 'hidden');
                $(this).find('.word_describe').css('visibility', 'visible').show();
            }
        }).mouseleave(function () {
            if ($(window).width() < 768) {
                $(this).find('.watch_pic').css('visibility', 'visible').show();
                $(this).find('.watch_describe').css('visibility', 'hidden').hide();
            }
        });
    });
}
