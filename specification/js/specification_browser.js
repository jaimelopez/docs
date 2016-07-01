var SpecBrowser = {
    specification: [],
    load: function(url) {
        $.getJSON(url, function(specification) {
            SpecBrowser.specification = specification;
            SpecBrowser.jump(document.location.hash.slice(1) || 'services');
        });
    },
    jump: function(to) {
        if (this.isTabName(to)) {
            this.renderTab(to);
        }
    },
    isTabName: function(name) {
        return ['services', 'structures', 'extensions'].indexOf(name) !== false;
    },
    renderTab: function(tab) {
        $(".page-tab-bar a[data-active-tab]").removeClass('active');
        $(".page-tab-bar a[data-active-tab=" + tab.replace( /(:|\.|\[|\]|,)/g, "\\$1" ) +"]").addClass('active');

        this.render(tab + "-navigation", "#navbar");
        this.render(tab + "-page", "#view");
    },
    render: function(view, where) {
        var source   = $("#"+view+"-template").html();
        var template = Handlebars.compile(source);
        $(where).html(template({specification: this.specification}));
    }
};
