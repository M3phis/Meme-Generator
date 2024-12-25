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

function onRandomMeme() {
  const meme = getRandomMeme()
  console.log('random meme: ', meme)
  setMeme(meme)
  renderMeme(meme)
  hideGallery()

  showEditor()
}
