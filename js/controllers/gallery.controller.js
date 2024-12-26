'use strict'
let gQueryOptions

function renderGallery() {
  const elGallery = document.querySelector('.image-container')
  const imgs = getImgs(gQueryOptions)
  let strHTML

  strHTML = imgs.map(
    (image) => `
    <img src="${image.url}" alt="image"  onclick="onImgSelect(${image.id})">
    `
  )

  elGallery.innerHTML =
    `
   <label for="file-input" class="upload-img">
            <img src="imgs/upoadImg.jpg" alt="Upload" />
          </label>
          <input
            id="file-input"
            type="file"
            class="file-input btn hidden"
            name="image"
            onchange="onClientImgUpload(event)"
          />` + strHTML.join('')

  //   elGallery.innerHTML += `
  //    <label for="file-input" class="upload-img">
  //             <img src="imgs/upoadImg.jpg" alt="Upload" />
  //           </label>
  //           <input
  //             id="file-input"
  //             type="file"
  //             class="file-input btn hidden"
  //             name="image"
  //             onchange="onClientImgUpload(event)"
  //           />`
}

function hideGallery() {
  document.querySelector('.gallery-section').style.display = 'none'
}

function showGallery() {
  document.querySelector('.gallery-section').style.display = 'grid'
}

function onFilterImgs(filterValue) {
  console.log('filtering')
  gQueryOptions = filterValue
  renderGallery()
}

function onClientImgUpload(ev) {
  loadImageFromInput(ev, addImgToGallery)
}

function loadImageFromInput(ev, onImageReady) {
  document.querySelector('.share-container').innerHTML = ''
  const reader = new FileReader()

  reader.onload = function (event) {
    const img = new Image()
    img.onload = () => {
      onImageReady(img)
    }
    img.src = event.target.result
  }
  reader.readAsDataURL(ev.target.files[0])
}

function addImgToGallery(img) {
  //   console.log('this is the image ', img)
  addImg(img)
  renderGallery()
}
