document.addEventListener('DOMContentLoaded', function() {
    const mockApiUrl = 'https://66edc361380821644cddefa5.mockapi.io/celebrations'; 

    const regions = [
        { id: 'region1', name: 'Ash Sharqiyah' },
        { id: 'region2', name: 'Al Hudud ash Shamaliyah' },
        { id: 'region3', name: 'Al Jawf' },
        { id: 'region4', name: 'Najran' },
        { id: 'region5', name: 'Asir' },
        { id: 'region6', name: 'Jizan' },
        { id: 'region7', name: 'Tabuk' },
        { id: 'region8', name: 'Al Madinah' },
        { id: 'region9', name: 'Makkah' },
        { id: 'region10', name: 'Ar Riyad' },
        { id: 'region11', name: 'Al Quassim' },
        { id: 'region12', name: 'Ha’il' },
        { id: 'region13', name: 'Al Bahah' }
    ];

    let currentRegion = null;

    function hideAllRegions() {
        regions.forEach(region => {
            const regionContainer = document.getElementById(`region-container-${region.id}`);
            const celebrationsGallery = document.getElementById(`celebrations-gallery-${region.id}`);
            const shareButton = document.getElementById(`share-celebration-${region.id}`);
            const imageUrlInput = document.getElementById(`image-url-input-${region.id}`);

            if (regionContainer) regionContainer.style.display = 'none';
            if (celebrationsGallery) celebrationsGallery.style.display = 'none'; 
            if (shareButton) shareButton.style.display = 'none';
            if (imageUrlInput) imageUrlInput.style.display = 'none';
        });
    }

    function fetchAndDisplayImages(region) {
        const celebrationsGallery = document.getElementById(`celebrations-gallery-${region.id}`);
        celebrationsGallery.innerHTML = ''; 

        fetch(mockApiUrl)
            .then(response => response.json())
            .then(data => {
                const regionImages = data.filter(item => item.region === region.name);
                regionImages.forEach(imageData => {
                    const imgContainer = document.createElement('div');
                    imgContainer.classList.add('image-container');

                    const imgElement = document.createElement('img');
                    imgElement.src = imageData.url;
                    imgElement.alt = "Celebration Image";
                    imgElement.classList.add('celebration-image');

                    const nameLabel = document.createElement('div');
                    nameLabel.classList.add('name-label');
                    nameLabel.textContent = imageData.name || "Unknown User"; 

                    imgContainer.appendChild(imgElement);
                    imgContainer.appendChild(nameLabel);
                    celebrationsGallery.appendChild(imgContainer);
                });
                celebrationsGallery.style.display = 'block'; 
            })
            .catch(error => console.error('Error fetching images:', error));
    }

    function handleRegionClick(region) {
        currentRegion = region;
        hideAllRegions();

        const regionContainer = document.getElementById(`region-container-${region.id}`);
        const shareButton = document.getElementById(`share-celebration-${region.id}`);
        if (regionContainer) regionContainer.style.display = 'block';
        if (shareButton) shareButton.style.display = 'block';

        fetchAndDisplayImages(region);
    }

    regions.forEach(function(region) {
        const regionElement = document.querySelector(`#${region.id}`);
        if (regionElement) {
            regionElement.addEventListener('click', function() {
                handleRegionClick(region);
            });
        }
    });

    regions.forEach(function(region) {
        const shareButton = document.getElementById(`share-celebration-${region.id}`);
        const imageUrlInput = document.getElementById(`image-url-input-${region.id}`);
        const submitImageButton = document.getElementById(`submit-image-${region.id}`);
        const imageUrlField = document.getElementById(`image-url-${region.id}`);

        if (shareButton && imageUrlInput && submitImageButton && imageUrlField) {
            shareButton.addEventListener('click', function() {
                imageUrlInput.style.display = 'block';
            });

            submitImageButton.addEventListener('click', function() {
                const imageUrl = imageUrlField.value;
                if (imageUrl && currentRegion) {
                    const userName = sessionStorage.getItem('userName') || 'Anonymous';
                    const newImage = { url: imageUrl, region: currentRegion.name, name: userName };

                    fetch(mockApiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newImage)
                    })
                    .then(response => response.json())
                    .then(savedImage => {
                        const celebrationsGallery = document.getElementById(`celebrations-gallery-${currentRegion.id}`);

                        const imgContainer = document.createElement('div');
                        imgContainer.classList.add('image-container');

                        const imgElement = document.createElement('img');
                        imgElement.src = savedImage.url;
                        imgElement.alt = "Celebration Image";
                        imgElement.classList.add('celebration-image');

                        const nameLabel = document.createElement('div');
                        nameLabel.classList.add('name-label');
                        nameLabel.textContent = userName;

                        imgContainer.appendChild(imgElement);
                        imgContainer.appendChild(nameLabel);
                        celebrationsGallery.appendChild(imgContainer);

                        imageUrlField.value = '';
                        imageUrlInput.style.display = 'none';
                    })
                    .catch(error => {
                        console.error('Error saving image:', error);
                        alert('Failed to upload image. Please try again.');
                    });
                } else {
                    alert("Please enter a valid image URL.");
                }
            });
        } else {
            console.error(`Elements for region ${region.id} not found.`);
        }
    });
});
