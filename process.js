document.addEventListener("DOMContentLoaded", function () {
  const decrementButton = document.querySelector(".decrement");
  const incrementButton = document.querySelector(".increment");
  const quantityInput = document.querySelector(".quantity");

  decrementButton.addEventListener("click", decrement);
  incrementButton.addEventListener("click", increment);

  function decrement() {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 0) {
      currentQuantity--;
      quantityInput.value = currentQuantity;
    }
  }

  function increment() {
    let currentQuantity = parseInt(quantityInput.value);
    currentQuantity++;
    quantityInput.value = currentQuantity;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const decrementButtonM = document.getElementById("modalDecreme");
  const incrementButtonM = document.getElementById("modalIncreme");
  const quantityInputM = document.getElementById("modalEspacios");

  decrementButtonM.addEventListener("click", decrement);
  incrementButtonM.addEventListener("click", increment);

  function decrement() {
    let currentQuantityM = parseInt(quantityInputM.value);
    if (currentQuantityM > 0) {
      currentQuantityM--;
      quantityInputM.value = currentQuantityM;
    }
  }

  function increment() {
    let currentQuantityM = parseInt(quantityInputM.value);
    currentQuantityM++;
    quantityInputM.value = currentQuantityM;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const inputFile = document.querySelector("#subirimagen");
  const pictureImage = document.querySelector(".subIMG-content");
  const originalContent = pictureImage.innerHTML;

  inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;

        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("picture__img");

        pictureImage.innerHTML = ""; // Limpiar cualquier contenido anterior
        pictureImage.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      pictureImage.innerHTML = originalContent; // Restaurar el contenido original
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
    var cantespaciosInput = document.getElementById('cantespacios');
    var disponibilidadDiv = document.getElementById('disponibilidad');
    
    cantespaciosInput.addEventListener('input', function () {
      var espaciosDisponibles = parseInt(cantespaciosInput.value);
      if (espaciosDisponibles > 0) {
        disponibilidadDiv.textContent = 'ACTIVO';
        disponibilidadDiv.classList.remove('inactivo');
        disponibilidadDiv.classList.add('activo');
      } else {
        disponibilidadDiv.textContent = 'INACTIVO';
        disponibilidadDiv.classList.remove('activo');
        disponibilidadDiv.classList.add('inactivo');
      }
    });
    
  
});
