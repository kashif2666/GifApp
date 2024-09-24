// let apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual Giphy API key

let submitBtn = document.getElementById("submit-btn");

let generateGif = () => {
  let loader = document.querySelector(".loader");
  loader.style.display = "block"; // Show loader
  document.querySelector(".wrapper").style.display = "none"; // Hide GIFs initially

  let q = document.getElementById("search-box").value;
  let gifCount = 10;

  let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;

  document.querySelector(".wrapper").innerHTML = ""; // Clear previous results

  // API call
  fetch(url)
    .then((response) => response.json())
    .then((info) => {
      let gifsData = info.data;

      gifsData.forEach((gif) => {
        let container = document.createElement("div");
        container.classList.add("container");

        let iframe = document.createElement("img");
        iframe.setAttribute("src", gif.images.downsized_medium.url);

        iframe.onload = () => {
          gifCount--;
          if (gifCount === 0) {
            loader.style.display = "none"; // Hide loader when all gifs loaded
            document.querySelector(".wrapper").style.display = "grid"; // Show GIFs
          }
        };

        container.appendChild(iframe);

        // Copy Link Button
        let copyBtn = document.createElement("button");
        copyBtn.innerText = "Copy Link";

        copyBtn.addEventListener("click", () => {
          let copyLink = gif.images.downsized_medium.url; // Use GIF URL

          navigator.clipboard
            .writeText(copyLink)
            .then(() => {
              alert("GIF link copied to clipboard!"); // Should work now
            })
            .catch(() => {
              // Fallback for older browsers
              let hiddenInput = document.createElement("input");
              hiddenInput.setAttribute("type", "text");
              hiddenInput.value = copyLink;
              document.body.appendChild(hiddenInput);
              hiddenInput.select();
              document.execCommand("copy");
              document.body.removeChild(hiddenInput);

              alert("GIF link copied to clipboard (fallback).");
            });
        });

        container.appendChild(copyBtn);
        document.querySelector(".wrapper").appendChild(container);
      });
    });
};

submitBtn.addEventListener("click", generateGif);

window.addEventListener("load", generateGif);
