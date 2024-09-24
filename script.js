// // API Key
// &bundle=messaging_non_clips
// gif?cid=ef9f9ba15yy39n09i41qm9jx2885lwkqhyiqe7ly4btofg63&ep=v1_gifs_search&rid=giphy.gif&ct=g

// let apiKey="";

let submitBtn = document.getElementById("submit-btn");

let generateGif = () => {
  let loader = document.querySelector(".loader");

  loader.style.display = "none";

  document.querySelector(".wrapper").style.display = "none";

  let q = document.getElementById("search-box").value;

  let gifCount = 10;

  let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;

  document.querySelector(".wrapper").innerHTML = "";

  // api call
  fetch(url)
    .then((response) => response.json())
    .then((info) => {
      console.log(info.data);

      // all gifs
      let gifsData = info.data;

      gifsData.forEach((gif) => {
        let container = document.createElement("div");
        container.classList.add("container");

        let iframe = document.createElement("img");

        console.log(gif);
        iframe.setAttribute("src", gif.images.downsized_medium.url);

        iframe.onload = () => {
          gifCount--;
          if (gifCount == 0) {
            loader.style.display = "none";
            document.querySelector(".wrapper").style.display = "grid";
          }
        };

        container.append(iframe);

        // copyUrl
        let copyBtn = document.createElement("button");

        copyBtn.innerText = "Copy Link";

        copyBtn.onclick = () => {
          let copyLink = `https://media1.giphy.com/media/${gif.id}/giphy.mp4`;

          navigator.clipboard
            .writeText(copyLink)
            .then(() => {
              alert("GIF copied to clipboard");
            })
            .catch(() => {
              // if navigator not supported
              alert("GIF copied to Clipboard.");

              let hiddenInput = document.createElement("input");

              hiddenInput.setAttribute("type", "text");

              document.body.appendChild(hiddenInput);

              hiddenInput.value = copyLink;

              hiddenInput.select();

              document.execCommand("copy");

              document.body.removeChild(hiddenInput);
            });
        };

        container.append(copyBtn);
        document.querySelector(".wrapper").append(container);
      });
    });
};

submitBtn.addEventListener("click", generateGif);

window.addEventListener("load", generateGif);
