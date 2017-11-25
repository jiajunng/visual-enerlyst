/**
 * Created by kunsheng on 20/10/2017.
 */

$(function () {
    var $map = $('#map');
    var $left = $('#leftpanel');
    if ($.cookie('offcanvas') == 'hide') {
        $left.addClass('no-transition');
        $map.hide();
        $map.css('right', -($map.outerWidth() + 10));
        $left.removeClass('col-md-5').addClass('col-md-12');
    }
    else if ($.cookie('offcanvas') == 'show') {
        $map.show(50).animate({ right: 0 });
        //  $menu.show();
        $left.removeClass('no-transition');
        $left.removeClass('col-md-12').addClass('col-md-5');
    }

    $('.toggle-button').click(function () {
        $left.removeClass('no-transition');
        if ($map.is(':visible') && $left.hasClass('col-md-5')) {
            // Slide out
            $map.animate({
                right: -($map.outerWidth() + 10)
            }, function () {
                $map.hide(50);
            });
            $left.removeClass('col-md-5').addClass('col-md-12');
            $.cookie('offcanvas', 'hide');
        }
        else {
            // Slide in
            $map.show(50).animate({ right: 0 });
            $left.removeClass('col-md-12').addClass('col-md-5');
            $.cookie('offcanvas', 'show');
        }
        if($left.hasClass('col-md-12') && $map.is(':hidden')) {
            $map.animate({
                right: 0
            }, function () {
                $map.show(50);
            });
            //  $menu.show();
            $left.removeClass('no-transition');
            $left.removeClass('col-md-12').addClass('col-md-5');
        }
    });
    $('.bs-tooltip').tooltip();
    if (!$map.is(':visible') && !$left.hasClass('col-md-5')) {
        $('.toggle-button').click();
    }

});
