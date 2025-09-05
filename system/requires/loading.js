
(function() {
   
    function createLoadingLayer() {
    
        const existing = document.getElementById('loadingLayer');
        if (existing) existing.remove();

        const body = document.body;
        if (!body) return;

        const layer = document.createElement('div');
        layer.id = 'loadingLayer';
        layer.style.position = 'fixed';
        layer.style.top = '0';
        layer.style.left = '0';
        layer.style.width = '100%';
        layer.style.height = '100%';
        layer.style.zIndex = '1000';
        layer.style.backgroundColor = '#FFFFFF';
        layer.style.textAlign = 'center';
        layer.style.paddingTop = '50px';

        const messages = [
            'Page Loading...',
            'Sayfa Yükleniyor...',
            'Загрузка страницы...'
        ];

        messages.forEach(msg => {
            const p = document.createElement('p');
            p.style.color = '#FF0000';
            p.style.fontFamily = 'Verdana, Arial, Helvetica, sans-serif';
            p.style.fontSize = '16px';
            p.textContent = msg; 
            layer.appendChild(p);
        });

        const img = document.createElement('img');
        img.src = '/system/assets/img/loading3.gif'; 
        img.alt = 'loading';
        layer.appendChild(img);

        body.appendChild(layer);
    }

    function hideLoadingLayer() {
        const layer = document.getElementById('loadingLayer');
        if (layer) layer.remove();

        const content = document.getElementById('pageContent');
        if (content) content.style.display = '';
    }

    document.addEventListener('DOMContentLoaded', function() {
        const content = document.getElementById('pageContent');
        if (content) content.style.display = 'none';

        createLoadingLayer();
    });

    window.addEventListener('load', function() {
        hideLoadingLayer();
    });
})();
