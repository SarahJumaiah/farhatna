document.addEventListener('DOMContentLoaded', function () {
    const userId = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');
    const userEmail = sessionStorage.getItem('userEmail');

    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const imagesContainer = document.getElementById('imagesContainer');
    const mockApiUrl = 'https://66edc361380821644cddefa5.mockapi.io/celebrations'

    profileName.textContent = `الاسم: ${userName}`;
    profileEmail.textContent = `البريد الإلكتروني: ${userEmail}`;

    fetch(mockApiUrl)
        .then(response => response.json())
        .then(images => {
            const userImages = images.filter(image => image.name === userName);

            if (userImages.length > 0) {
                userImages.forEach(image => {
                    const imageCard = document.createElement('div');
                    imageCard.classList.add('image-card');

                    const imgElement = document.createElement('img');
                    imgElement.src = image.url;
                    imgElement.alt = "الصورة المرفوعة";
                    imgElement.classList.add('profile-image');

                    
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'حذف الصورة';
                    deleteButton.classList.add('delete-btn');
                    deleteButton.addEventListener('click', function () {
                        confirmDelete(image.id, imageCard);
                    });

                    
                    imageCard.appendChild(imgElement);
                    imageCard.appendChild(deleteButton);
                    imagesContainer.appendChild(imageCard);
                });
            } else {
                imagesContainer.textContent = 'لم تقم بتحميل صور حتى الآن.';
            }
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            imagesContainer.textContent = 'حدث خطأ في تحميل الصور.';
        });

    
    function confirmDelete(imageId, imageCard) {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "لن تتمكن من استعادة هذه الصورة!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#005f30",
            cancelButtonColor: "#005f30",
            confirmButtonText: "نعم، احذفها!",
            cancelButtonText: "إلغاء"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteImage(imageId, imageCard);
            }
        });
    }

    
    function deleteImage(imageId, imageCard) {
        fetch(`${mockApiUrl}/${imageId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                imageCard.remove();
                Swal.fire({
                    title: "تم الحذف!",
                    text: "تم حذف الصورة بنجاح.",
                    icon: "success",
                    confirmButtonColor: "#005f30", 
                });
            } else {
                Swal.fire({
                    title: "خطأ!",
                    text: "حدث خطأ أثناء حذف الصورة. الرجاء المحاولة لاحقًا.",
                    icon: "error",
                    confirmButtonColor: "#005f30",  
                });
            }
        })
        .catch(error => {
            console.error('Error deleting image:', error);
            Swal.fire({
                title: "خطأ!",
                text: "حدث خطأ أثناء حذف الصورة. الرجاء المحاولة لاحقًا.",
                icon: "error",
                confirmButtonColor: "#005f30", 
            });
        });
    }
});
