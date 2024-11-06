async function getUserPets(){
    try {
        const response = await fetch('/users/get-user-pets');
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      
    } catch (error) {
        console.error(error);
    }
}

getUserPets();