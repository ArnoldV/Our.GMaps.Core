﻿angular.module('umbraco.resources').factory('Our.Umbraco.GMaps.Factory', function ($q, $window) {
	'use strict';

	var mapsDefer = $q.defer();
	$window.googleMapsInitialized = mapsDefer.resolve;

	function scriptExists(url) {
		return document.querySelectorAll(`script[src="${url}"]`).length > 0;
	}

	return {
		initialize: function (apiKey) {
			var url = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&libraries=places&callback=googleMapsInitialized';
			if (!scriptExists(url)) {
				var script = document.createElement('script');
				script.async = true;
				script.defer = true;
				script.src = url;
				document.head.appendChild(script);
			}

			return mapsDefer.promise;
		}
	};
}
);
