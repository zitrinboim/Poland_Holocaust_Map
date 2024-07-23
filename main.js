import cities from './cityData.js';

function initMap() {
    const poland = { lat: 52.0685, lng: 19.0785 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: poland
    });

    cities.forEach(city => {
        const marker = new google.maps.Marker({
            position: city.position,
            map: map,
            title: city.name
        });

        const infoContent = `
            <div class="info-window">
                <h3>${city.name}</h3>
                ${Object.entries(city.info).map(([key, value]) => `
                    <h4>${translateInfoKey(key)}:</h4>
                    <p>${value}</p>
                `).join('')}
                ${city.links ? `
                    <h4>קישורים נוספים:</h4>
                    <ul>
                        ${city.links.map(link => `<li><a href="${link.url}" target="_blank">${link.text}</a></li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;

        const infowindow = new google.maps.InfoWindow({
            content: infoContent
        });

        marker.addListener('click', () => {
            infowindow.open(map, marker);
        });
    });
}

function translateInfoKey(key) {
    const translations = {
        preWar: 'לפני המלחמה',
        occupation: 'תקופת הכיבוש',
        ghetto: 'הגטו',
        deportation: 'גירושים',
        liquidation: 'חיסול',
        resistance: 'התנגדות',
        aftermath: 'לאחר המלחמה',
        survivors: 'ניצולים',
        laborCamp: 'מחנה עבודה',
        destruction: 'הרס'
    };
    return translations[key] || key;
}

// מאזין לטעינת הדף
window.addEventListener('load', () => {
    // טוען את ה-API של Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCR146QPBRYb35fjmY-08pNBIk8NPNUUBE&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
});

// חושף את initMap לחלון הגלובלי כדי שה-API של Google Maps יוכל לקרוא לו
window.initMap = initMap;