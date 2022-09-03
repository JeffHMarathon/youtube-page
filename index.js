let searchForm = document.querySelector("#search-form");
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
     console.log('madeit', 'wee');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
            let response = JSON.parse(xhttp.responseText);
            let videoData = response.items.map(function(item) {
                return item.snippet;
            });
            let container = document.querySelector('#video-divs');
            container.innerHTML = '';
            videoData.forEach(function(video) {
                let videoDiv = document.createElement('div');
                videoDiv.classList.add('video-div');
                videoDiv.innerHTML = `
                    <img src=${video.thumbnails.high.url}>
                    <h4>${video.title}</h4>
                    <p>${video.channelTitle}</p>
                    <p>${new Date(video.publishTime).toLocaleDateString()}</p>
                `;
                container.appendChild(videoDiv);           
            });

        };
    };
    let textValue = document.querySelector('#search-bar').value;
    xhttp.open("GET", `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${ textValue }&maxResults=9&key=AIzaSyC5eds0CoYqNMTUJGBmYHALJc5GU_j5jSI`, true);
    xhttp.send();

})

