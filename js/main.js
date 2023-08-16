//https://tile.openstreetmap.org/{z}/{x}/{y}.png

function CreateIcon(imageNumber) {
	var ic = new L.Icon();
	ic.options.shadowSize = [0, 0];
	ic.options.iconUrl = `/icon/${imageNumber}.png`;
	ic.options.iconRetinaUrl = `/icon/${imageNumber}.png`;
	ic.options.iconSize = [42, 42];
	ic.options.iconAnchor = [21, 40];
	ic.options.popupAnchor = [0, -40];

	return ic;
}

var map;

///OSM Map
osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution: "",
});

////GoogleMap
googleStreets = L.tileLayer(
	"http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
	{
		maxZoom: 20,
		subdomains: ["mt0", "mt1", "mt2", "mt3"],
	}
);

////Google Satlleite Map
googleSat = L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
	maxZoom: 20,
	subdomains: ["mt0", "mt1", "mt2", "mt3"],
});

// Label tile server
citiesLabel = L.tileLayer(
	"https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",
	{
		subdomains: "abcd",
		maxZoom: 20,
	}
);

var baseMaps = {
	"نمای خیابان": osm,
	"تصویر ماهواره": googleSat,
};

var overlayMaps = {
	عناوین: citiesLabel,
};

map = L.map("map", {
	center: [35.724543, 51.411074],
	zoom: 12,
	layers: [osm],
});

L.control.layers(baseMaps, overlayMaps).addTo(map);

for (i = 0; i < brt.length; i++) {
	new L.marker([brt[i].Lat, brt[i].Lng], {
		icon: CreateIcon(brt[i].Line),
	})
		.addTo(map)
		.bindPopup(`<h3>خط ${brt[i].Line}<br/>${brt[i].Title}</h3>`);
}
