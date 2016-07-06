var SpecBrowser = {
    specification: [],
    fetch: function(url) {
        $.getJSON(url, function(specification) {
            SpecBrowser.load(specification);
            SpecBrowser.jump(window.location.hash.slice(1) || 'services');
        });
    },
    load: function(specification) {
        this.specification = specification;
        this.index = {};

        for (var m in specification) {
            if (!specification.hasOwnProperty(m)) {
                continue;
            }

            var module = specification[m].module;
            var services = specification[m].services || [];
            var structures = specification[m].structures || [];
            var extensions = specification[m].extensions || [];

            for (var si = 0; si < services.length; si++) {
                this.index[module + "." + services[si].name] = {
                    module: module,
                    type: 'service',
                    section: 'services',
                    document: services[si]
                };
            }

            for (var ti = 0; ti < structures.length; ti++) {
                this.index[module + "." + structures[ti].name] = {
                    module: module,
                    type: 'structure',
                    section: 'structures',
                    document: structures[ti]
                };
            }

            for (var ei = 0; ei < extensions.length; ei++) {
                this.index[module + "." + extensions[ei].extends + "." + extensions[ei].name] = {
                    module: module,
                    type: 'extension',
                    section: 'extensions',
                    document: extensions[ei]
                };
            }
        }
    },
    jump: function(to) {
        if (this.isSectionName(to)) {
            this.renderIndex(to);
        } else
        if (this.isElementName(to)) {
            this.renderElement(to);
        } else {
            return this.jump('services');
        }

        this.updateBindings();
    },
    isSectionName: function(name) {
        return ['services', 'structures', 'extensions'].indexOf(name) != -1;
    },
    isElementName: function(name) {
        return this.index.hasOwnProperty(name);
    },
    renderLayout: function(layout) {
        $(".page-tab-bar a[data-active-tab]").removeClass('active');
        $(".page-tab-bar a[data-active-tab=" + layout.replace( /(:|\.|\[|\]|,)/g, "\\$1" ) +"]").addClass('active');

        this.render(layout + "-navigation", "#navbar");
    },
    renderIndex: function(section) {
        this.renderLayout(section);
        this.render(section + "-index", "#view");
    },
    renderElement: function(name) {
        var element = this.index[name];

        this.renderLayout(element.section);
        this.render(element.section + "-page", "#view", {
            element: element.document,
            module: element.module
        });
    },
    render: function(view, where, args) {
        var source   = $("#"+view+"-template").html();
        var template = Handlebars.compile(source);
        var context = args || {};

        context.specification = this.specification;

        $(where).html(template(context));
    },
    updateBindings: function() {
        $(".specification .arguments").bonsai();
    }
};
