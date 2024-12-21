'use strict'

function onInit() {
  renderGallery()
  hideEditor()
}

function onImgSelect(id) {
  hideGallery()
  showEditor()
  setImage(id)
  renderMeme(getMeme())
}

function onReturnToGallery() {
  hideEditor()
  showGallery()
}
