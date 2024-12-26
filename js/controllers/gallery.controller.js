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

  elGallery.innerHTML = strHTML.join('')
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
