/*Push the body and nav over by 285px to reveal sidebar when menu element is clicked*/
var main = function() {
    $(".icon-menu").click(function() {
        $("#sidebar").animate({
            left: "0px"
        }, 200), $("body").animate({
            left: "285px"
        }, 200)
    }), 
/*...and then 'hide' sidebar when close element is clicked */ 
    $(".icon-close").click(function() {
        $("#sidebar").animate({
            left: "-285px"
        }, 200), $("body").animate({
            left: "0px"
        }, 200)
    }), 
/*...also hide side bar when link is clicked to reveal 100% of page */ 
    $("#sidebar li").click(function() {
        $("#sidebar").animate({
            left: "-285px"
        }, 200), $("body").animate({
            left: "0px"
        }, 200)
    })
};

$(document).ready(main);

jQuery(function(n) {
    var e = n("#section"),
        t = n("html, body"),
        o = n(document),
        i = e.length,
        c = 0,
        f = !1,
        u = function(n) {
            f = !0, t.animate({
                scrollTop: e.eq(n).offset().top
            }, 750, function() {
                f = !1
            })
        },
        r = function(n) {
            if (f) return !1;
            if ("prev" === n && c > 0) c--;
            else {
                if (!("next" === n && i - 1 > c)) return !1;
                c++
            }
            u(c)
        };
    o.on("click", ".action", function() {
        r(n(this).data("direction"))
    }), o.keyup(function(n) {
        38 === n.keyCode && r("prev"), 40 === n.keyCode && r("next")
    })
});

$(".button2").click(function() {
    $('html, body').animate({
        scrollTop: $("#section browse").offset().top
    }, 3000);
});
