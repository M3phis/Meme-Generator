'use strict'

function renderGallery() {
  const elGallery = document.querySelector('.image-container')
  const imgs = getImgs()
  let strHTML

  strHTML = imgs.map(
    (image) => `
    <img src="${image.url}" alt="image"  onclick="onImgSelect(${image.id})">
    `
  )

  elGallery.innerHTML += strHTML.join('')
}

renderGallery()
