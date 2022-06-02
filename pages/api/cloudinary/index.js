const { cloudinary } = require('../../../utils/cloudinary')

async function handler(req, res) {
  if (req.method == 'POST') {
    try {
      const fileStr = req.body.data
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'kleidarasPhotos'
      })

      res.json({ url: uploadResponse.secure_url })
    } catch (err) {
      console.error(err)
      res.status(500).json({ err: 'Something went wrong' })
    }
  }

  if (req.method == 'GET') {
    const { resources } = await cloudinary.search
      .expression('folder:kleidarasPhotos')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute()

    const publicIds = resources.map((file) => file.public_id)
    res.send(publicIds)
  }
}

export default handler
