'use strict'

const memeTexts = [
  {
    txt1: "When you realize it's Monday again",
    txt2: 'But you already want Friday',
  },
  { txt1: 'Me trying to adult', txt2: 'But life keeps laughing at me' },
  { txt1: 'When your code finally works', txt2: 'But you forgot to save it' },
  {
    txt1: 'That moment you step on Lego',
    txt2: 'And question every life choice',
  },
  { txt1: 'When your crush says hi', txt2: 'And you forget how to human' },
  {
    txt1: 'I came, I saw, I procrastinated',
    txt2: "And now it's due in 5 minutes",
  },
  { txt1: "When mom says 'pause the game'", txt2: 'But it’s an online match' },
  { txt1: 'That face you make', txt2: 'When you see your old cringy posts' },
  { txt1: 'When your dog ignores you', txt2: "But you're their entire world" },
  {
    txt1: 'That awkward moment',
    txt2: 'When you wave at someone not waving at you',
  },
  {
    txt1: 'When you realize',
    txt2: 'You’ve been arguing in your head for an hour',
  },
  {
    txt1: 'When you check your bank account',
    txt2: 'And see a single digit balance',
  },
  { txt1: 'When the WiFi goes down', txt2: 'And you have to face real life' },
  {
    txt1: "When you're watching a horror movie",
    txt2: 'And you hear a noise behind you',
  },
  {
    txt1: 'When you clean your room',
    txt2: "And suddenly can't find anything",
  },
  { txt1: 'When you take a nap', txt2: 'And wake up in the next century' },
  {
    txt1: 'When someone asks for help',
    txt2: 'And you Google the answer for them',
  },
  { txt1: 'When the group project is done', txt2: 'But you did all the work' },
  { txt1: 'When you drop your phone', txt2: 'And it lands face down' },
  {
    txt1: 'When you hear your alarm',
    txt2: 'And it feels like you just fell asleep',
  },
]

const gStickers = ['😜', '😢', '🤮', '🙊', '💀', '🤡']

let gMeme = {
  isDrag: false,
  imgId: 5,
  selectedLineIdx: 1,
  lines: [
    {
      txt: "When you realize it's Monday again",
      size: 30,
      color: 'white',
      lineIndex: 0,
      textAlignment: 'center',
      font: 'Arial',
      x: 240,
      y: 60,
    },
    {
      txt: 'But you already want Friday',
      size: 30,
      color: 'white',
      lineIndex: 1,
      textAlignment: 'center',
      font: 'Verdana',
      x: 240,
      y: 430,
    },
  ],
}

let gMemes = getSavedMemes()

function getMeme() {
  return gMeme
}

function setMeme(meme) {
  gMeme = meme
}

function makeMeme(imgId, selectedLineIdx, lines) {
  const meme = {
    imgId: imgId,
    selectedLineIdx: selectedLineIdx,
    lives: lines,
  }

  return meme
}

function addLine(
  line = {
    txt: 'New Line',
    size: 20,
    color: 'red',
    lineIndex: gMeme.lines.length,
    textAlignment: 'center',
    font: 'Arial',
    x: 240,
    y: 60,
  }
) {
  const newLineIndex = gMeme.lines.length //new line index
  line.lineIndex = newLineIndex
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = newLineIndex
}

function addStickerLine(sticker) {
  let line = {
    txt: sticker,
    size: 40,
    color: 'red',
    lineIndex: gMeme.lines.length,
    textAlignment: 'center',
    font: 'Arial',
    x: 240,
    y: 60,
  }
  {
    const newLineIndex = gMeme.lines.length //new line index
    line.lineIndex = newLineIndex
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = newLineIndex
  }
}

function setImage(id) {
  gMeme.imgId = id
  console.log('setting image with Id: ', id)
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function switchLine() {
  gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
}

function switchToLine(line) {
  gMeme.selectedLineIdx = line.lineIndex
  console.log('switch to clicked line index:', line.lineIndex)
}

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

const elTextInput = document.querySelector('.text-input')
elTextInput.placeholder = `${getMeme().lines[0].txt}`

function reduceFont() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 2
}

function increaseFont() {
  gMeme.lines[gMeme.selectedLineIdx].size += 2
}

function textAlignLeft(line) {
  line.textAlignment = 'end'
}

function textAlignRight(line) {
  line.textAlignment = 'start'
}

function textAlignCenter(line) {
  line.textAlignment = 'center'
}

function setFamilyFont(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font
}

function moveLineDown() {
  console.log(gMeme.lines[gMeme.selectedLineIdx].y)
  gMeme.lines[gMeme.selectedLineIdx].y += 20
  console.log(gMeme.lines[gMeme.selectedLineIdx].y)
}

function moveLineUp() {
  console.log(gMeme.lines[gMeme.selectedLineIdx].y)
  gMeme.lines[gMeme.selectedLineIdx].y -= 20
  console.log(gMeme.lines[gMeme.selectedLineIdx].y)
}

function deleteLine() {
  const newLines = gMeme.lines.filter((line) => {
    return line.lineIndex !== gMeme.selectedLineIdx
  })
  console.log('lines after delete:', newLines)
  gMeme.lines = newLines
  gMeme.selectedLineIdx = gMeme.lines[0].lineIndex
  updateLinesIndex()
}

function updateLinesIndex() {
  for (let i = 0; i < gMeme.lines.length; i++) {
    gMeme.lines[i].lineIndex = i
  }
}

function getRandomMeme() {
  const memeText = memeTexts[getRandomInt(0, memeTexts.length - 1)]

  return {
    imgId: getRandomInt(1, getImgs().length),
    selectedLineIdx: 0,
    lines: [
      {
        txt: memeText.txt1,
        size: 27,
        color: 'white',
        lineIndex: 0,
        textAlignment: 'center',
        font: 'Arial',
        x: 240,
        y: 60,
      },
      {
        txt: memeText.txt2,
        size: 27,
        color: 'white',
        lineIndex: 1,
        textAlignment: 'center',
        font: 'Verdana',
        x: 240,
        y: 430,
      },
    ],
  }
}

function saveMeme() {
  let savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || []

  const memeImage = gElCanvas.toDataURL('image/png')

  const memeToSave = { ...getMeme(), image: memeImage }

  savedMemes.push(memeToSave)

  localStorage.setItem('savedMemes', JSON.stringify(savedMemes))

  console.log('Meme saved to local storage:', memeToSave)
}

function getSavedMemes() {
  const savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || []
  return savedMemes
}

function loadSaveMemes() {
  console.log(gMemes)
}

function getStickers() {
  return gStickers
}

function setLineDrag(isDrag) {
  gMeme.isDrag = isDrag
}

function moveLine(dx, dy, line) {
  if (!line) return
  line.x += dx
  line.y += dy
}

function defaultMeme() {
  gMeme = {
    isDrag: false,
    imgId: 5,
    selectedLineIdx: 1,
    lines: [
      {
        txt: "When you realize it's Monday again",
        size: 30,
        color: 'white',
        lineIndex: 0,
        textAlignment: 'center',
        font: 'Arial',
        x: 240,
        y: 60,
      },
      {
        txt: 'But you already want Friday',
        size: 30,
        color: 'white',
        lineIndex: 1,
        textAlignment: 'center',
        font: 'Verdana',
        x: 240,
        y: 430,
      },
    ],
  }
}
