"use strict";$(document).ready(function(){$("pre code").each(function(c,e){hljs.highlightBlock(e)})});
"use strict";$(document).ready(function(){void 0!==Cookies.get("mode")?($("body").addClass("dark-mode"),$("#darkmode").attr("checked",!0),console.log("Cookie: dark mode")):($("body").removeClass("dark-mode"),$("#darkmode").attr("checked",!1),console.log("Cookie: light mode")),$("#darkmode").on("change",function(o){$(this).is(":checked")?($("body").addClass("dark-mode"),Cookies.set("mode","dark-mode",{expires:7})):($("body").removeClass("dark-mode"),Cookies.remove("mode"))})});
"use strict";$(document).ready(function(){$("#contact-form").validate({messages:{name:{required:"Please enter your name"},email:{required:"Please enter your email"},message:{required:"Please enter your message"}}})});
"use strict";$(document).ready(function(){var e=$(".isotope");e.imagesLoaded(function(){$(".isotope").isotope({itemSelector:".isotope-item",layoutMode:"fitRows"})}),$("#filters").on("click",".type",function(){var t=$(this).attr("data-filter");e.isotope({filter:t})}),$(".filters").each(function(t,e){var i=$(e);i.on("click",".type",function(){i.find(".active").removeClass("active"),$(this).addClass("active")})})});
"use strict";$(document).ready(function(){$("#pricing-tabs .pricing-tab").on("click",function(i){i.preventDefault(),$(this).hasClass("active")||$(this).addClass("active").siblings().removeClass("active"),$PricingData=$(this).attr("data-target"),$("#pricing-table").find("."+$PricingData).show().siblings().not(".pricing-0-data").hide()}),$(".card-toggle").on("click",function(){"chevron-down"==$(this).find("svg").attr("data-icon")?$(this).find("svg").attr("data-icon","chevron-up"):$(this).find("svg").attr("data-icon","chevron-down")})});
"use strict";var _tns;function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var slider=tns((_defineProperty(_tns={container:".testimonial-carousel",loop:!0,items:3,responsive:{0:{items:1},768:{items:2},1200:{items:3}},slideBy:"page",nav:!0,autoplay:!0,autoplayButtonOutput:!1,mouseDrag:!0,lazyload:!0,gutter:30,navPosition:"bottom"},"mouseDrag",!0),_defineProperty(_tns,"controls",!1),_defineProperty(_tns,"speed",800),_tns));
"use strict";$(document).ready(function(){$("#config-trigger").click(function(e){e.preventDefault(),$(this).hasClass("config-panel-open")?($("#config-panel").animate({right:"-=190"},500),$(this).removeClass("config-panel-open").addClass("config-panel-hide")):($("#config-panel").animate({right:"+=190"},500),$(this).removeClass("config-panel-hide").addClass("config-panel-open"))}),$("#config-close").on("click",function(e){e.preventDefault(),$("#config-trigger").click()}),$("#color-options a").on("click",function(e){var i=$(this).attr("data-style");$("#theme-style").attr("href",i);var n=$(this).closest("li");n.addClass("active"),n.siblings().removeClass("active"),e.preventDefault()})});