
  function fetchimages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        return response.json();
      })
      .then((data) => {
        const imageContainer = document.getElementById("dog-image-container");

        data.message.forEach((imageUrl) => {
          const imgElement = document.createElement("img");
          imgElement.src = imageUrl;
          imageContainer.appendChild(imgElement);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  fetchimages();



document.addEventListener("DOMContentLoaded", function () {
  let allBreeds = []; // Array to store all breeds

  function filterBreeds() {
    const letterFilter = document.getElementById("breed-dropdown");
    const breedContainer = document.getElementById("dog-breeds");

    letterFilter.addEventListener("change", (event) => {
      const selectedLetter = event.target.value;

      if (!selectedLetter) {
        // If no letter is selected, show all breeds again
        displayBreeds(allBreeds); // Display all breeds from the cache
        return;
      }

      // Filter the breeds based on the selected letter
      const filteredBreeds = allBreeds.filter((breedName) =>
        breedName.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );

      // If there are filtered breeds, display them, otherwise show "No breeds found"
      if (filteredBreeds.length > 0) {
        displayBreeds(filteredBreeds);
      } else {
        breedContainer.innerHTML = "<li>No breeds found</li>";
      }
    });
  }

  function displayBreeds(breeds) {
    const breedContainer = document.getElementById("dog-breeds");
    breedContainer.innerHTML = ""; // Clear the container before adding breeds

    breeds.forEach((breedName) => {
      const li = document.createElement("li");
      li.textContent = breedName;
      breedContainer.appendChild(li);
    });
  }

  function fetchBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch breeds");
        }
        return response.json();
      })
      .then((data) => {
        const breedContainer = document.getElementById("dog-breeds");
        if (!breedContainer) {
          console.error("Breed container not found!");
          return;
        }

        allBreeds = Object.keys(data.message); // Store all breed names in the array
        displayBreeds(allBreeds); // Display all breeds initially
      })
      .catch((error) => {
        console.error(error);
      });
  }


  fetchBreeds();
  filterBreeds();
});


  