'use strict'

function onInit() {
  renderGallery()
  hideEditor()
  hideSaved()
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
  hideSaved()
}

function onRandomMeme() {
  const meme = getRandomMeme()
  console.log('random meme: ', meme)
  setMeme(meme)
  renderMeme(meme)
  hideGallery()
  hideSaved()
  showEditor()
}

function onGoToSaved() {
  loadSaveMemes()
  console.log('???')
  hideGallery()
  hideEditor()
  showSaved()
}

//
