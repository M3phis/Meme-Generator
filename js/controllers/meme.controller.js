'use strict'

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')
let gStartPos
const elStickers = document.querySelector('.stickers')
let currClickedLine
// elStickers.innerHTML = getStickers().join('')

function renderStickers(stickers) {
  const elStickers = document.querySelector('.stickers')

  const strHTML = stickers.map((sticker) => {
    return `
      <div onclick="onAddSticker('${sticker}')">${sticker}</div>
    `
  })
  elStickers.innerHTML = strHTML.join('')
}

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
  //   console.log('rendering text for y: ', gMeme.lines[gMeme.selectedLineIdx].y)

  lines.forEach((line) => {
    renderLine(line, meme)
  })
}

function renderLine(line, meme) {
  //   console.log('rendering line')
  gCtx.font = `${line.size}px ${line.font}`
  gCtx.fillStyle = line.color // Set the color
  gCtx.textAlign = `${line.textAlignment}`
  gCtx.textBaseline = 'middle'

  //   console.log(line)

  // Calculate text position
  const textWidth = gCtx.measureText(line.txt).width
  let x = line.x // Center the text horizontally
  //   if (line.textAlignment === 'center') {
  //     x = gElCanvas.width / 2
  //   } else if (line.textAlignment === 'end') {
  //     x = gElCanvas.width - line.width / 2
  //   }
  const y = line.y // Adjust the y position based on layout

  //   line.x = x
  //   line.y = y - line.size // Adjust for top of text
  line.width = textWidth
  line.height = line.size

  // Draw the text
  gCtx.fillText(line.txt, x, y)

  if (getMeme().selectedLineIdx === line.lineIndex) {
    // Draw a frame (rectangle) around the text
    drawLineFrame(line)
  }
}
function drawLineFrame(line) {
  const padding = 10 // Add some padding around the text
  let frameX = line.x

  // Adjust the starting x-coordinate based on text alignment
  if (line.textAlignment === 'start') {
    frameX = line.x - padding / 2
  } else if (line.textAlignment === 'center') {
    frameX = line.x - line.width / 2 - padding / 2
  } else if (line.textAlignment === 'end') {
    frameX = line.x - line.width - padding / 2
  }

  // Calculate frame dimensions
  const frameY = line.y - line.height / 2 // Account for vertical centering and padding
  const frameWidth = line.width + padding
  const frameHeight = line.height + padding

  // Draw the frame
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

function onTextAlignLeft() {
  console.log('aligning left')
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  textAlignLeft(line)
  renderMeme(meme)
}

function onTextAlignRight() {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  textAlignRight(line)
  renderMeme(meme)
}

function onTextAlignCenter() {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  textAlignCenter(line)
  renderMeme(meme)
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

function onClickCanvas(event) {
  const { offsetX, offsetY } = event
  console.log('I am in X: ', offsetX, 'And Y: ', offsetY)
  const clickedLine = getClickedLine(offsetX, offsetY)
  console.log('clicked on line: ', clickedLine)
  if (clickedLine) {
    switchToLine(clickedLine)
    renderMeme(getMeme())
  } else {
    console.log('no line')
  }
}

function getClickedLine(x, y) {
  const lines = getMeme().lines

  const clickedLine = lines.filter((line) => {
    let startX

    // Adjust starting x-coordinate based on text alignment
    if (line.textAlignment === 'start') {
      startX = line.x
    } else if (line.textAlignment === 'center') {
      startX = line.x - line.width / 2
    } else if (line.textAlignment === 'end') {
      startX = line.x - line.width
    }

    // Check if the click is within the line's bounding box
    return (
      x > startX &&
      x <= startX + line.width &&
      y > line.y - line.height / 2 &&
      y <= line.y + line.height
    )
  })

  return clickedLine[0]
}

function onSetFontFamily(font) {
  setFamilyFont(font)
  renderMeme(getMeme())
}

function onMoveLineDown() {
  console.log('goiung down')
  moveLineDown()
  renderMeme(getMeme())
}

function onMoveLineUp() {
  moveLineUp()
  renderMeme(getMeme())
}

function onDeleteLine() {
  deleteLine()
  renderMeme(getMeme())
}

function onSaveMeme() {
  saveMeme()
  console.log('saved memes: ', getSavedMemes())
}

function hideEditor() {
  document.querySelector('.edit-section').style.display = 'none'
}
function showEditor() {
  document.querySelector('.edit-section').style.display = 'flex'
}

function hideSaved() {
  document.querySelector('.saved-section').style.display = 'none'
}

function showSaved() {
  document.querySelector('.saved-section').style.display = 'flex'
  renderSavedMemes()
}

function renderSavedMemes() {
  const elSavedSection = document.querySelector('.saved-section')

  const savedMemes = getSavedMemes()
  console.log('saved memes let me show you:', savedMemes)

  const strHTML = savedMemes.map((meme) => {
    const memeData = JSON.stringify(meme).replace(/"/g, '&quot;') // Escape quotes for HTML
    return `
      <img src="${meme.image}" alt="Saved meme" onclick="onMemeSelect('${memeData}')">
    `
  })
  elSavedSection.innerHTML = strHTML.join('')
}

function onAddSticker(sticker) {
  addStickerLine(sticker)
  renderMeme(getMeme())
}

///get drag and drop working

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  // Get the ev pos from mouse or touch
  console.log('On down')
  const pos = getEvPos(ev)
  // console.log('pos', pos)
  if (!getClickedLine(pos.x, pos.y)) {
    console.log('no line selected')
    return
  }

  console.log('I am clicking a line')
  setLineDrag(true)
  currClickedLine = getClickedLine(pos.x, pos.y)

  //Save the pos we start from
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const { isDrag } = getMeme()
  if (!isDrag) return
  //   console.log('Moving the Line')

  const pos = getEvPos(ev)
  // Calc the delta, the diff we moved
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveLine(dx, dy, currClickedLine)
  // Save the last pos, we remember where we`ve been and move accordingly
  gStartPos = pos
  // The canvas is render again after every move
  renderMeme(getMeme())
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'default'
}
