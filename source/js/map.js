const mapWrapper = document.querySelector('.contacts__map')

const desktopWidth = 1280;
const desktopMediaQuery = window.matchMedia(`(min-width: ${desktopWidth}px)`);

if (desktopMediaQuery.matches) {
  ymaps3.ready.then(() => {
    const map = new ymaps3.YMap(mapWrapper, {
      location: {
        center: [30.318006, 59.938803],
        zoom: 16
      }
    })

    const mapPin = document.createElement('div');
    mapPin.className = 'contacts__map-pin';

    const mapMarker = new ymaps3.YMapMarker({
      coordinates: [30.323037, 59.938631],
      draggable: false
    }, mapPin);

    map.addChild(new ymaps3.YMapDefaultSchemeLayer());
    map.addChild(new ymaps3.YMapDefaultFeaturesLayer());
    map.addChild(mapMarker);
  })
}
