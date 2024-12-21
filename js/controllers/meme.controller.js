'use strict'

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

async function renderMeme(meme) {
  //paint image on canvas

  await renderImage(meme.imgId)

  const lines = meme.lines

  renderText(lines, meme)
}

function renderImage(imgId) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = getImg(imgId).url // Replace `getImg` with your image retrieval logic
    img.onload = () => {
      gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
      resolve() // Notify that the image has been rendered
    }
    img.onerror = (err) => reject(err) // Handle image loading errors
  })
}

function renderText(lines, meme) {
  lines.forEach((line) => {
    renderLine(line, meme)
  })
}

function renderLine(line, meme) {
  console.log('rendering line')
  gCtx.font = `${line.size}px Arial`
  gCtx.fillStyle = line.color // Set the color

  console.log(line)

  // Calculate text position
  const textWidth = gCtx.measureText(line.txt).width
  const x = gElCanvas.width / 2 - textWidth / 2 // Center the text horizontally
  const y = 80 * (line.lineIndex + 1) // Adjust the y position based on layout

  line.x = x
  line.y = y - line.size // Adjust for top of text
  line.width = textWidth
  line.height = line.size
  // Draw the text
  gCtx.fillText(line.txt, x, y)

  if (getMeme().selectedLineIdx === line.lineIndex) {
    // Draw a frame (rectangle) around the text
    drawLineFrame(x, y, line)
  }
}

function drawLineFrame(x, y, line) {
  const textWidth = gCtx.measureText(line.txt).width
  const padding = 10 // Add some padding around the text
  const frameX = x - padding / 2
  const frameY = y - line.size - padding / 2 // Account for font size and padding
  const frameWidth = textWidth + padding
  const frameHeight = line.size + padding

  gCtx.strokeStyle = 'black' // Frame color
  gCtx.lineWidth = 2 // Frame line width
  gCtx.strokeRect(frameX, frameY, frameWidth, frameHeight)
}

function cleanLine(line) {
  // Calculate text position and dimensions
  const textWidth = gCtx.measureText(line.txt).width
  const x = gElCanvas.width / 2 - textWidth / 2 // Center horizontally
  const y = 80 * (line.lineIndex + 1) // Adjust vertically based on index

  const padding = 10 // Padding around the text
  const clearX = x - padding / 2
  const clearY = y - line.size - padding / 2
  const clearWidth = textWidth + padding
  const clearHeight = line.size + padding

  // Clear the area of the text
  gCtx.clearRect(clearX, clearY, clearWidth, clearHeight)
}

function onSetLineTxt(txt) {
  setLineTxt(txt)

  renderMeme(getMeme())
}

function onDownloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function onSetColor(color) {
  setColor(color)
  renderMeme(getMeme())
}

function onReduceFont() {
  reduceFont()
  renderMeme(getMeme())
}

function onIncreaseFont() {
  increaseFont()
  renderMeme(getMeme())
}

function onAddLine() {
  console.log('adding line')
  addLine()
  renderMeme(getMeme())
  console.log(getMeme())
}

function onSwitchLine() {
  switchLine()
  renderMeme(getMeme())
}

function hideEditor() {
  document.querySelector('.edit-section').style.display = 'none'
}
function showEditor() {
  document.querySelector('.edit-section').style.display = 'flex'
}

function onClickCanvas(event) {
  const { offsetX, offsetY } = event
  console.log('I am in X: ', offsetX, 'And Y: ', offsetY)
  console.log(getClickedLine(offsetX, offsetY))
}

function getClickedLine(x, y) {
  const lines = getMeme().lines

  const clickedLine = lines.filter((line) => {
    return (
      x > line.x &&
      x <= line.x + line.width &&
      y > line.y &&
      y <= line.y + line.height
    )
  })
  return clickedLine[0]
}
