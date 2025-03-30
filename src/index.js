console.log("%c HI", "color: firebrick");

document.addEventListener("DOMContentLoaded", function () {
  function filterBreeds() {
    const letterFilter = document.getElementById("breed-dropdown");
    const breedContainer = document.getElementById("dog-breeds");
    //event listener to filter based on the selected letter

    letterFilter.addEventListener("change", (event) => {
      const selectedLetter = event.target.value; 
      const breeds = Array.from(breedContainer.children);

      //if a letter is selected, filter the list
      const filteredBreeds = breeds.filter((breedItem) =>
        breedItem.textContent.toLowerCase().startsWith(selectedLetter)
      );

      //clear the conntainer and render the filtered breeds
      breedContainer.innerHTML = "";
      filteredBreeds.forEach((breedItem) => {
        breedContainer.appendChild(breedItem);
      });
    });
  }
  filterBreeds();
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
        //check if the breedContainer element exists

        if (!breedContainer) {
          console.error("Breed container not found!");
          return;
        }

        //loop through the object keys (breeds) and add each one to the list

        for (const breedName in data.message) {
          if (data.message.hasOwnProperty(breedName)) {
            const li = document.createElement("li");
            li.textContent = breedName;
            breedContainer.appendChild(li);

            li.addEventListener("click", () => {
              li.style.color = "red";
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  fetchBreeds();
});
