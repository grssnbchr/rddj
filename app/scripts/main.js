$(function() {
    var data = null;

    function slugAndHash(string) {
        return '#' + slug(string);
    };

    function slug(string) {
        return string.toLowerCase().replace(/ /g, '-');
    }

    function parseData(json) {
        // extract chapters
        data = d3.nest()
            .key(function(d) {
                return d.chapter;
            })
            .entries(json);
    };

    function writeContent() {
        var sections = d3.select('#content').selectAll('section')
            .data(data, function(d, i) {
                return d.key;
            });
        sections.enter()
            .append('section')
            .attr('id', function(d, i) {
                return slug(d.key);
            })
            .append('h1')
            .append('a')
            .attr('href', function(d, i) {
                return slugAndHash(d.key);
            })
            .attr('aria-hidden', true)
            .attr('class', 'anchor')
            .text('#');
        /*.append('i')
        .attr('class', 'fa fa-link');*/
        sections.select('h1')
            .append('span')
            .text(function(d) {
                return d.key
            });

        var articles = sections.selectAll('article').data(function(d) {
            return d.values;
        }, function(d, i) {
            return d.title;
        });
        var article = articles.enter()
            .append('article');
        article.append('h1')
            .html(function(d) {
                return '<a href="' + d.permalink + '">' + d.title + '</a>';
            });
        article.append('div')
            .attr('class', 'description')
            .html(function(d) {
                return d.description;
            });
        var info = article.append('div')
            .attr('class', 'info');
        var infos = info.selectAll('span').data(function(d) {
            // convert to key / value pairs
            return d3.entries(d.info);
        });
        var info = infos.enter().append('span')
            .attr('class', function(d, i) {
                return d.key;
            })
            .html(function(d, i) {
                var faClass = null;
                switch (d.key) {
                    case 'authors':
                        faClass = 'user';
                        break;
                    case 'type':
                        faClass = 'file-o';
                        break;
                    case 'time':
                        faClass = 'clock-o';
                        break;
                    case 'level':
                        faClass = 'book';
                        break;
                }
                var value = d.value;
                if (d.key === 'authors') {
                    var listOfAuthors = value.map(function(d, i) {
                        return (d.url) ? '<a href="' + d.url + '" target="_blank">' + d.name + '</a>' : d.name;
                    });
                    value = listOfAuthors.join(', ');
                }
                return '<i class="fa fa-' + faClass + '" title="' + d.key + '"></i>' + value;
            });

        // add link to top 
        d3.select('#content').selectAll('section').append('a')
            .attr('href', '#toc')
            .html('<i class="fa fa-angle-up"></i> Back to top.');




    };

    function writeTOC() {
            d3.select('#toc').append('ul');
            var links = d3.select('#toc ul').selectAll('li').data(data.map(function(d) {
                return d.key;
            }));
            links.enter()
                .append('li')
                .append('a')
                .attr('href', function(d, i) {
                    return slugAndHash(d);
                })
                .text(function(d, i) {
                    return d;
                });
        }
        // get the data
    d3.json('content/content.json', function(error, json) {
        if (error) return console.warn(error);
        parseData(json);
        writeContent();
        writeTOC();
    });
});
