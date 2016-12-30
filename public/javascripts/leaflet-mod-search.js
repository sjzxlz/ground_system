/**
 * Created by Administrator on 2016/4/5.
 */
var searchMap = {

    point: function () {

        var infoType = $('#search-infoType').val();

        var standard = $('#search-standard').val();
        var word = $('#search-word').val();
        var datatype = $('#search-datatype').val();
        var labels = $('#search-labels').val();
        var service = $('#search-service').val();

        var url = 'http://10.0.0.242:8080/solr/sjzx/' + standard +
            '?q=word=' + word +
            ',datatype=' + datatype +
            ',labels=' + labels +
            ',category=' + service +
            '&indent=true&wt=json';

        $.ajax({
            'url': url,
            'success': function (data) {

                //var data = JSON.stringify(data);
                //console.log(url);

                if (data.response.numFound == 0) {

                    $('.search-result .info').empty();
                    $('.search-result .content').empty();

                    $('.search-result .info').html('娌℃湁鎼滅储鍒扮粨鏋�');
                    return false;
                }
                else {
                    $('.search-result .info').empty();
                    $('.search-result .content').empty();

                    $('.search-result .info').append('<h6><small>鎼滅储鏃堕棿锛�' + JSON.stringify(data.responseHeader.QTime) + '姣</small></h6>');
                    $('.search-result .info').append('<h6><small>鎼滅储缁撴灉锛�' + JSON.stringify(data.response.numFound) + '涓�</small></h6>');

                    var search_content_html = [];

                    $.each(data.response.docs, function (index, value) {
                        var LatLng = ((value.geo.replace("POINT(", "")).replace(")", "")).replace(" ", ",");
                        search_content_html.push('<dl onclick="mapAllInfo(' + LatLng + ',\'' + value.id + '\',\'' + infoType + '\')" > <dt>'
                            + value.names + '</dt><dd>' + LatLng + '</dd></dl>'
                        )
                        ;
                    });

                    $('.search-result .content').html(search_content_html);
                }
            },
            error: function () {
                alert('鏈煡閿欒');
            },
            'dataType': 'jsonp',
            'jsonp': 'json.wrf'
        });
    }
};