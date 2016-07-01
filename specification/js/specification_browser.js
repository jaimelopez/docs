var SpecBrowser = {
    load: function(url) {
        $.getJSON(url, function(specification) {
            SpecBrowser.render(specification);
            SpecBrowser.jump(document.location.hash.slice(1) || 'services');
        });
    },
    render: function(specification) {
        var source   = $("#specification-template").html();
        var template = Handlebars.compile(source);
        $("#specification").html(template({specification: specification}));
    },
    jump: function(to) {
        if (this.isTabName(to)) {
            this.showTab(to);
        }
    },
    isTabName: function(name) {
        return ['services', 'structures', 'extensions'].indexOf(name) !== false;
    },
    showTab: function(tab) {
        $(".specification .tab").hide();
        $(".specification .tab[data-name="+tab+"]").show();
        $(".page-tab-bar .tab").removeClass('active');
        $(".page-tab-bar .tab[data-name="+tab+"]").addClass('active');
    }
};
