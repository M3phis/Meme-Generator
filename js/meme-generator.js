'use strict'

function onInit() {
  renderGallery()
  hideEditor()
  hideSaved()
}

function onImgSelect(id) {
  hideGallery()
  renderStickers(getStickers())

  showEditor()
  setImage(id)
  renderMeme(getMeme())
}

function onMemeSelect(memeStr) {
  //   console.log(memeStr)
  const meme = JSON.parse(memeStr)
  console.log(meme)
  setMeme(meme)
  hideSaved()
  renderMeme(meme)
  showEditor()
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
