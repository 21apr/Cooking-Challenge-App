
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