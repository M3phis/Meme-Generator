'use strict'

function renderGallery() {
  const elGallery = document.querySelector('.image-container')
  const imgs = getImgs()
  let strHTML

  strHTML = imgs.map(
    (image) => `
    <img src="${image.url}" alt="image">
    `
  )

  elGallery.innerHTML += strHTML.join('')
  console.log(strHTML)
}

renderGallery()
