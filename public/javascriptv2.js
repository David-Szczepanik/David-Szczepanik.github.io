const droparea = document.getElementById("droparea");
const fileInput = document.getElementById("fileInput");

droparea.addEventListener("click", () => {
  fileInput.click();
});

droparea.addEventListener("dragover", (e) => {
  e.preventDefault();
  droparea.classList.add("hover");
});

droparea.addEventListener("dragleave", () => {
  droparea.classList.remove("hover");
});

droparea.addEventListener("drop", (e) => {
  e.preventDefault();
  droparea.classList.remove("hover");

  const files = e.dataTransfer.files;

  for (const file of files) {
    uploadFile(file);
  }
});

fileInput.addEventListener("change", (e) => {
  const files = e.target.files;

  for (const file of files) {
    uploadFile(file);
  }
});

// function uploadFile(file) {
//   const reader = new FileReader();
//   const hashAlgorithm = "SHA-1";
//
//   reader.onload = function (event) {
//     const buffer = event.target.result;
//
//     crypto.subtle.digest(hashAlgorithm, buffer).then(function (hashBuffer) {
//       const hashArray = Array.from(new Uint8Array(hashBuffer));
//       const hashHex = hashArray
//         .map((byte) => byte.toString(16).padStart(2, "0"))
//         .join("");
//
//       const fileInfoElement = document.getElementById("fileInfo");
//       fileInfoElement.innerHTML = `
//         <p>File Name: ${file.name}</p>
//         <p>File Size: ${file.size} bytes</p>
//       `;
//
//       const hashInfoElement = document.getElementById("hashInfo");
//       hashInfoElement.innerHTML = `
//         <p>${hashAlgorithm} Hash: ${hashHex}</p>
//       `;
//
//     });
//   };  reader.readAsArrayBuffer(file);
// }
function uploadFile(file) {
  const reader = new FileReader();
  const hashAlgorithm = "SHA-1";

  reader.onload = function (event) {
    const buffer = event.target.result;

    crypto.subtle.digest(hashAlgorithm, buffer).then(function (hashBuffer) {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      const fileInfo = {
        fileName: file.name,
        fileSize: file.size,
        sha1Hash: hashHex,
      };

      // Send file information to the server
      fetch("/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fileInfo),
      })
        .then((response) => response.json())
        .then((createdFile) => {
          console.log("File information saved to the server:", createdFile);
          // Optionally, update the UI or perform other actions
        })
        .catch((error) => {
          console.error("Error saving file information:", error);
          // Handle the error as needed
        });
    });
  };
  reader.readAsArrayBuffer(file);
}

//=> backup.txt
// const fileInfo = `
//   File Name: ${file.name}
//   File Size: ${file.size} bytes
//   SHA-1 Hash: ${hashHex}
// `;

//=> backup.json
// const fileInfo = `
//   File Name: ${file.name}
//   File Size: ${file.size} bytes
//   SHA-1 Hash: ${hashHex}
// `;
      //     fetch('/saveBackup', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify({
      //         fileInfo
      //       })
      //     });
      //   });
      // };


      // fetch('/saveBackup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     fileInfo: {
      //       fileName: file.name,
      //       fileSize: file.size,
      //       sha1Hash: hashHex
      //     }
      //   })
      // })




