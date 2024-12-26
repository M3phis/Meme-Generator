'use strict'

async function uploadImg(imgData, onSuccess) {
  const CLOUD_NAME = 'maoryad'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const formData = new FormData()
  formData.append('file', imgData)
  formData.append('upload_preset', 'maoryad')
  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    onSuccess(data.secure_url)
  } catch (err) {
    console.log(err)
  }
}

async function uploadImage2() {
  const canvas = document.querySelector('canvas')
  const imageData = canvas.toDataURL('image/jpeg') // Get the image data URL

  const formData = new FormData()
  formData.append('file', imageData)
  formData.append('upload_preset', 'maoryad') // Replace with your preset

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )
    const data = await response.json()
    console.log('Uploaded image URL:', data.secure_url) // Share this URL
    return data.secure_url
  } catch (err) {
    console.error('Image upload failed:', err)
  }
}
