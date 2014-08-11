(function($, UI) {
  
    "use strict";

    UI.component('switcherfilter', {

        defaults: {
          "connect" : false,
          "toggle"  : "[data-toggle]",
          "active"  : 0
        },

        init: function() {

            var $this = this;

            this.on("click", this.options.toggle, function(e) {
                if ($(this).is('a[href="#"]')) e.preventDefault();
                $this.show(this);
            });

            if (this.options.connect) {

                this.connect = $(this.options.connect).find(".uk-active").removeClass(".uk-active").end();

                var toggles = this.find(this.options.toggle),
                    active  = toggles.closest("li").filter(".uk-active"),
                    active_all = toggles.filter(".all").closest("li").filter(".uk-active");

                if (active.length && !active_all.length) {
                    this.show(active);
                } else {
                    active = toggles.eq(this.options.active);
                    this.show(active.length ? active : toggles.eq(0));
                }
            }

        },

        show: function(tab) {

            tab = isNaN(tab) ? $(tab) : this.find(this.options.toggle).eq(tab);

            var active = tab;

            if (active.hasClass("uk-disabled")) return;

            this.find(this.options.toggle).closest("li").filter(".uk-active").removeClass("uk-active");
            active.closest("li").addClass("uk-active");
      
            var filter = "."+active.data("toggle");
            if (this.options.connect && this.connect.length) {
              this.connect.children().removeClass("uk-active uk-animation-fade").addClass();
              this.connect.children(filter).addClass("uk-active uk-animation-fade");
            } 

            this.trigger("uk.switcherfilter.show", [active]);
            $(document).trigger("uk-check-display");
        }
    });

    // init code
    $(document).on("uk-domready", function(e) {
        $("[data-uk-switcher-filter]").each(function() {
            var switcherfilter = $(this);

            if (!switcherfilter.data("switcherfilter")) {
                var obj = UI.switcherfilter(switcherfilter, UI.Utils.options(switcherfilter.attr("data-uk-switcher-filter")));
            }
        });
    });

})(jQuery, jQuery.UIkit);
