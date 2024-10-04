import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

export const uploadProfileImage = async (
  image: File,
  onProgress?: (progress: number) => void,
): Promise<string> => {
  if (!image) {
    throw new Error('No image file provided')
  }

  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/profile/${image.name}`)

    const uploadTask = uploadBytesResumable(storageRef, image)

    // Monitor the upload process
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        if (onProgress) {
          onProgress(progress)
        }
      },
      (error) => {
        // console.error("Error uploading file:", error);
        reject(error)
      },
      async () => {
        // Get the download URL once the upload is complete
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

          resolve(downloadURL)
        } catch (error) {
          reject(error)
        }
      },
    )
  })
}

export const uploadCoverImage = async (
  image: File,
  onProgress?: (progress: number) => void,
): Promise<string> => {
  if (!image) {
    throw new Error('No image file provided')
  }

  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/profile/cover/${image.name}`)

    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        if (onProgress) {
          onProgress(progress)
        }
      },
      (error) => {
        reject(error)
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

          resolve(downloadURL)
        } catch (error) {
          reject(error)
        }
      },
    )
  })
}
