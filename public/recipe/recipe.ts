
async function setNewRecipe(event: any) {
    try {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const response = await fetch('/recipes/set-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.ok) {
            window.location.href = './../home/home.html';
        } else {
            alert(jsonResponse.error);
        }
    } catch (error) {
        console.error(error);
    }
}

async function uploadImage() {
    const element = document.querySelector('#titlePicture') as HTMLInputElement;
    console.log(element.files[0]);
    const imageFile = element.files[0] as File;
    const formData = new FormData().append('image', imageFile);
    // const data = Object.fromEntries(formData.files);
    const response = await fetch('/fileServer/upload', {
        method: 'POST',
        body: JSON.stringify(formData) })
    // let imageFile = element.files[0] as File;
    // fetch('/file-server/upload', { method: 'POST', body: new FormData().append('image', imageFile) })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error(error));
    const jsonResponse = await response.json();
        console.log(jsonResponse);
}