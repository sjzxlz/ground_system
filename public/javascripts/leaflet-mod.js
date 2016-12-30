var icon_box_gray = L.icon({
	iconUrl: '../../symbols/box_gray.png',
	iconSize: [16, 14],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var icon_triangle_yellow = L.icon({
	iconUrl: '../../symbols/tir_y.png',
	shadowUrl: '../../symbols/tir_shadow.png',
	iconSize: [16, 14],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var icon_triangle_red = L.icon({
	iconUrl: '../../symbols/tir_r.png',
	shadowUrl: '../../symbols/tir_shadow.png',
	iconSize: [12, 14],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var icon_triangle_gray = L.icon({
	iconUrl: '../../symbols/tir_g.png',
	shadowUrl: '../../symbols/tir_shadow.png',
	iconSize: [16, 14],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var icon_triangle_green = L.icon({
	iconUrl: '../../symbols/tir_green.png',
	shadowUrl: '../../symbols/tir_shadow.png',
	iconSize: [16, 14],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var icon_flood = L.icon({
	iconUrl: '../../symbols/flood.png',
	iconSize: [20, 20],
	shadowSize: [50, 64],
	iconAnchor: [22, 94],
	shadowAnchor: [4, 62],
	popupAnchor: [-11, -90]
});

var icon_airport_gray = L.icon({
	iconUrl: '../../symbols/airport_gray.png',
	iconSize: [16, 14],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var icon_osm_airport = L.icon({
	iconUrl: '../../symbols/osm/airport.p.16.png',
	iconSize: [16, 16],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]

});

var icon_temple = L.icon({
	iconUrl: '../../symbols/osm/museum.p.16.png',
	iconSize: [16, 16],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var icon_temple_tzj = L.icon({
	iconUrl: '../../symbols/temple/tzj.png',
	iconSize: [16, 16],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var icon_temple_dj = L.icon({
	iconUrl: '../../symbols/temple/dj.png',
	iconSize: [16, 16],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var icon_temple_zcfj = L.icon({
	iconUrl: '../../symbols/temple/zcfj.png',
	iconSize: [16, 16],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var icon_temple_jdj = L.icon({
	iconUrl: '../../symbols/temple/jdj.png',
	iconSize: [16, 16],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var icon_temple_yslj = L.icon({
	iconUrl: '../../symbols/temple/yslj.png',
	iconSize: [16, 16],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var icon_temple_hcfj = L.icon({
	iconUrl: '../../symbols/temple/hcfj.png',
	iconSize: [16, 16],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});

var svg_camera = L.icon({
	iconUrl: '../../symbols/camera.svg',
	iconSize: [16, 16],
	shadowSize: [23, 20],
	iconAnchor: [8, 7],
	popupAnchor: [0, -10]
});


function hightLight_orange(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 2,
		color: 'orange',
		fillOpacity: .7
	})
}
function onClick(e) {
	//alert(this.getLatLng());
	//console.log(e);
	console.log(e.preventDefault());
}
function highlightPoint(e) {

	var layer = e.target;

	$("#show_station").attr("checked", 'checked');
	map.addLayer(over_geojson_observ_point);

	if (arguments.length == 1) {
		map.setView([e.latlng], 18);
	}

	if (arguments.length == 2) {
		//var marker = L.circleMarker([arguments[0], arguments[1]], {
		//	radius: 4,
		//	fillColor: "#f00",
		//	color: "#000",
		//	weight: 1,
		//	opacity: 1,
		//	fillOpacity: 0.8
		//}).addTo(map).bindPopup('http://g214.westgis.ac.cn/lib/leaflet/<button class="trigger">xxx</button>');
		//marker.on('click', onlyFeatureName);
		map.setView([arguments[0], arguments[1]], 18);
	}
}

function gotoPoint(lat, lng, zoom, mark) {

	switch (mark) {
		case "mark":
			L.marker([lat, lng]).addTo(map).bindPopup('<h5>' + lat + ', ' + lng + '</h5>');
			map.setView([lat, lng], zoom);
			break;
		case "":
			map.setView([lat, lng], zoom);
			break;
		default:
			map.setView([lat, lng], zoom);
	}
}

function showGF(lat, lng, zoom, mark) {
	switch (mark) {
		case "mark":
			L.marker([lat, lng]).addTo(map).bindPopup('<h5>' + lat + ', ' + lng + '</h5>');
			map.setView([lat, lng], zoom);
			break;
		case "":
			map.setView([lat, lng], zoom);
			break;
		default:
			map.setView([lat, lng], zoom);
	}
}

function toggleBaseLayer(layer) {

	$.each(overLayers, function (v) {
		map.removeLayer(v);
	})

	map.addLayer(layer);
}

function toggleLayer(layer) {
	if (map.hasLayer(layer)) {
		map.removeLayer(layer);
	}
	else {
		map.addLayer(layer);
	}
}

function toggleLayerArr(layers) {

	if (map.hasLayer(layers)) {
		map.removeLayer(over_geojson_regions_12);
		map.removeLayer(over_geojson_regions_345);
	}
	else {
		map.addLayer(over_geojson_regions_12);
		map.addLayer(over_geojson_regions_345);
	}
}

function eachAllLayer(data) {
	$.each(allLayers, function (v, k) {
	});
}

function gotoAP(z) {

	var cont = '<h5>' + AP_location[z].id + ' ' + AP_location[z].name + '</h5>' +
		'<h5>' + AP_location[z].lat + ', ' + AP_location[z].lon + '</h5>';

	L.marker([AP_location[z].lat, AP_location[z].lon], {
		icon: icon_osm_airport
	}).addTo(allLayers[1]).bindPopup(cont);
	L.marker([AP_location[z].lat, AP_location[z].lon], {
		icon: icon_osm_airport
	}).addTo(allLayers[2]).bindPopup(cont);
	L.marker([AP_location[z].lat, AP_location[z].lon], {
		icon: icon_osm_airport
	}).addTo(allLayers[3]).bindPopup(cont);
	L.marker([AP_location[z].lat, AP_location[z].lon], {
		icon: icon_osm_airport
	}).addTo(allLayers[4]).bindPopup(cont);

	allLayers[1].setView([AP_location[z].lat, AP_location[z].lon], 14);

	displaySourceCont(z);
}

function switchRadius(mag) {
	if (mag <= 4) {
		return 4.5;
	}
	else if (mag > 4 && mag <= 5) {
		return 7;
	}
	else if (mag > 5 && mag < 6) {
		return 10;
	}
	else if (mag > 6 && mag <= 7) {
		return 13;
	}
	else if (mag > 7) {
		return 15;
	}
	else {
		return 6;
	}
}

function switchColor(mag) {
	if (mag < 4) {
		return "#FFB16D";
	}
	else if (mag > 4 && mag < 5) {
		return "#FF8B24";
	}
	else if (mag > 5 && mag < 6) {
		return "#FFC124";
	}
	else if (mag > 5 && mag < 6) {
		return "#FF5F24";
	}
	else if (mag > 8) {
		return "#FF3824";
	}
	else {
		return "#FFB778";
	}
}

function isNull(string) {
	return (string == '' || string == undefined || string == null) ? '暂无数据' : string;
}

function onlyFeatureName(feature, layer) {
	var html = '<h5>机场名称: ' + isNull(feature.properties.NAME) + '</h5>';

	layer.bindPopup(html);
}

function onEachFeature(feature, layer) {
	var out = [];
	if (feature.properties) {
		for (var key in feature.properties) {
			out.push(key + ": " + feature.properties[key]);
		}
	}
	layer.bindPopup(out.join("<br />"), {maxHeight: "400", minWidth: "200"});
}

function onEachRoadFeature(feature, layer) {

	var roadName = feature.properties.name;

	if (roadName == 'gongyu_1') {
		roadName = '共玉高速';
	}

	var html = '<h5>道路类型: ' + roadName + '</h5>';

	layer.bindPopup(html);
}

function onObsPoint(feature, layer) {

	var out = [];
	var obs_s1 = [];
	var obs_s2 = [];
	var obs_214 = [];
	var obs_other = [];
	var lat = layer._latlng.lat;
	var lng = layer._latlng.lng;
	var gid = feature.properties.gid;
	var name = feature.properties.label;
	var road = feature.properties.road;

	$.each(feature.properties, function (key, val) {
		out.push(key + ": " + val);

		if (val == "共玉一期") {
			obs_s1.push(name);
		}
		if (val == "共玉二期") {
			obs_s2.push(name);
		}
		if (val == "G214") {
			obs_214.push(name);
		}
		if (val == "其他") {
			obs_other.push(name);
		}
	});

	$('#obs_s1').append('<li onclick="highlightPoint(' + lat + ',' + lng + ')"><a href="#">' + obs_s1 + '</a></li>');
	$('#obs_s2').append('<li onclick="highlightPoint(' + lat + ',' + lng + ')"><a href="#">' + obs_s2 + '</a></li>');
	$('#obs_g214').append('<li onclick="highlightPoint(' + lat + ',' + lng + ')"><a href="#">' + obs_214 + '</a></li>');
	$('#obs_other').append('<li onclick="highlightPoint(' + lat + ',' + lng + ')"><a href="#">' + obs_other + '</a></li>');

	$('#obs_s1 li:empty').remove();
	$('#obs_s2 li:empty').remove();
	$('#obs_g214 li:empty').remove();
	$('#obs_other li:empty').remove();
	$('#obs_s1 li a:empty').remove();
	$('#obs_s2 li a:empty').remove();
	$('#obs_g214 li a:empty').remove();
	$('#obs_other li a:empty').remove();

	layer.on('click', function (e) {
		$('.road-img').attr("src", '/photo/obs/' + name + '.jpg');
		$('#window-point-info').modal('show');
		$('#window-point-info .modal-title').html(name + '详细信息');
		$('#window-point-info .gid').html(gid);
		$('#window-point-info .name').html(name);
		$('#window-point-info .road').html(road);
		getOneRoad(gid);
	});
}

function getOneRoad(gid) {
	$.getJSON('/map/getroadsection/gid/' + gid, function (data) {
		roadSectionChart(data);
		$('#window-point-info .width').html(data['vaule']['width']);
		$('#window-point-info .height_l').html(data['vaule']['height_l']);
		$('#window-point-info .height_r').html(data['vaule']['height_r']);
		$('#window-point-info .box_l').html(data['vaule']['box_l']);
		$('#window-point-info .box_r').html(data['vaule']['box_r']);
		$('#window-point-info .box_l_num').html(data['vaule']['box_num_l']);
		$('#window-point-info .box_r_num').html(data['vaule']['box_num_r']);
	});
}

function roadSectionChart(data) {
	$('#road_container').highcharts({
		chart: {
			type: 'area'
		},
		title: {
			text: ''
		},
		xAxis: [{
			categories: ''
		}],
		yAxis: {
			title: {
				text: '高度 (米)'
			},
			labels: {
				formatter: function () {
					return this.value;
				}
			}
		},
		tooltip: {
			pointFormat: '{series}'
		},
		plotOptions: {
			area: {
				pointStart: 0,
				marker: {
					enabled: false,
					symbol: 'circle',
					radius: 2,
					states: {
						hover: {
							enabled: false
						}
					}
				}
			}
		},
		series: [{
			name: '道路剖面',
			data: data['chart']
		}]
	});
}

function clearNullInArr(arr) {
	for (var i = 0; i < arr.length; i++) {
		if (!arr[i] || arr[i] == '') {
			arr.splice(i, 1);
		}
	}
}

function onEachPhoto(feature, layer) {
	var html = '<h5>文件名: ' + feature.properties.filename + '</h5>' +
		'<h5>坐　标: ' + feature.properties.latitude + '  ,  ' + feature.properties.longitude + '</h5>' +
		'<img src="/photo/' + feature.properties.filename + '">';

	layer.bindPopup(html, {maxWidth: "none"});
}

function onEachFeatureTemple(feature, layer) {
	var out = [];
	if (feature.properties) {
		out.push('<img id="templePhoto" with="220" height="150" src="/img/temple/' + Math.floor(Math.random() * 10 + 1) + '.jpg">');
		for (var key in feature.properties) {
			out.push("<b>" + key + "</b>: " + feature.properties[key]);
		}
	}
	layer.bindPopup(out.join("<br />"), {maxHeight: "400", minWidth: "500"});
}

function onEachFeatureEQ(feature, layer) {
	var html = '<h3>' + feature.properties.Name + '</h3>' +
		'<h5>时间:' + feature.properties.Description + '</h5>' +
		'<h5>震级:' + feature.properties.Mag + '</h5>' +
		'<h5>坐标:' + feature.geometry.coordinates + '</h5>';

	layer.bindPopup(html, {maxWidth: "none"});
}

function showCoordinates(e) {
	alert(e.latlng);
}

function centerMap(e) {
	map.panTo(e.latlng);
}

function zoomIn(e) {
	map.zoomIn();
}

function zoomOut(e) {
	map.zoomOut();
}

function addPoint(e) {
	$('#point-add')[0].reset();
	$('#inputId').val('');
	$('#window-point-add').modal('show');
	$('#pointLongitude').val(e.latlng['lng']);
	$('#pointLatitude').val(e.latlng['lat']);
}

function panoramaModal(url) {
	$('#window-panorama-viewer').modal('show');
}

function isL8Layer(e) {
	if (map.hasLayer(base_MB_8bit_lac8)) {
		map.addLayer(over_geojson_l8AfArea);
	}
	else {
		map.removeLayer(over_geojson_l8AfArea);
	}
}

function displaySourceCont(z) {
	var html = [];
	if (AP_location[z].name) {
		for (var key in AP_location[z]) {
			html.push("<b>" + key + "</b>: " + AP_location[z][key]);
		}
	}
	$('http://g214.westgis.ac.cn/lib/leaflet/.tools_list .list').html(html.join("<br />"));
}

function sidebarRightCont() {
	var html = [];
	if (AP_location[z].name) {
		for (var key in AP_location[z]) {
			html.push("<b>" + key + "</b>: " + AP_location[z][key]);
		}
	}
	$('#sidebar-right').html(html.join("<br />"));
}

function getTemplePage(page) {
	$.ajax({
		type: 'post',
		url: top.location,
		data: 'page=' + page,
		global: true,
		dataType: 'json',
		beforeSend: '',
		success: function (data) {

			var paginator = data.paginator;

			var html = '<table class="table table-condensed">' +
				'<tr><td></td></tr>' +
				'<tr></tr>' +
				'</table>'
			//
			//$.each(paginator, function (k, v) {
			//
			//});

			//$("#sidebar-right").append(html);
			//console.log(paginator);
		},
		complete: function () {

		},
		error: function () {
			alert('数据加载出现错误');
		}
	})
}

function panoOnMap(latLng, url) {
	L.marker(latLng, {
		icon: L.AwesomeMarkers.icon({
			icon: 'camera',
			prefix: 'glyphicon',
			markerColor: 'darkblue'
		})
	}).addTo(map).on('click', function (e) {
		$('.modal-body .panorama img').attr("src", url);
		panoramaModal(url);
	});
}

function centerModals() {
	$('.modal').each(function (i) {
		var $clone = $(this).clone().css('display', 'block').appendTo('body');
		var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
		top = top > 0 ? top : 0;
		$clone.remove();
		$(this).find('.modal-content').css("margin-top", top - 30);
	});
}

