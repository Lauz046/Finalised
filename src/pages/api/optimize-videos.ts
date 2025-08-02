import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const inputDir = path.join(process.cwd(), 'public/herosection')
    const outputDir = path.join(process.cwd(), 'public/herosection/optimized')

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Video files to process
    const videoFiles = [
      'StorySaver.to_AQMiiL2ymzY2G0kqVs2OLw37rR5PwqdeSPY4Op1sUmtSQSXL8NwtA7r00YqdE1AEMu0ELk9wQXa60avNhd4e5kt.webm',
      'StorySaver.to_AQNRVdeF2ejk-sqw5JUDMy_23uzXuD2m1jqUBnYxUodDN_38d8AFtBk-n4pjN13bvNcAiNFdx2EsLUHMFYoY3sx.webm',
      'StorySaver.to_AQObCzPuN2j23kjIwDyRbd4rgniYN7kM8ZAn_fO09Q_ZhVpRCGVQya6evieaDdlyqwx0hZOnX1q72VjoW2-PGhw.webm',
      'StorySaver.to_AQP8TheManZYkoMPUGyyyzhRfH5jlRZ8veRzG5zO9o3Jw4Pql8C71K27_MG7DFMr7x1MZ9NxIdYGo8Jd7wS4Hjc.webm',
      'StorySaver.to_AQOKbDbVhs6Jnnb0LVccp3FdKXqVba9a7ps5E53RcALtrDbCosTs8ub03_Gb0-IV7Ju9m0AIAoO-Zl0TCDu9w7i.webm'
    ]

    const results = []

    for (let i = 0; i < videoFiles.length; i++) {
      const filename = videoFiles[i]
      const inputPath = path.join(inputDir, filename)
      const outputFilename = `hero-video-${i + 1}.webm`
      const outputPath = path.join(outputDir, outputFilename)

      if (!fs.existsSync(inputPath)) {
        results.push({ filename, status: 'not_found' })
        continue
      }

      try {
        // For now, we'll copy the original file as a placeholder
        // In a real implementation, you'd use a video processing library
        fs.copyFileSync(inputPath, outputPath)
        
        const stats = fs.statSync(outputPath)
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2)
        
        results.push({ 
          filename: outputFilename, 
          status: 'copied', 
          size: fileSizeInMB,
          note: 'Original file copied (optimization requires FFmpeg)'
        })
      } catch (error) {
        results.push({ filename, status: 'error', error: (error as unknown).message })
      }
    }

    res.status(200).json({ 
      message: 'Video processing complete',
      results 
    })

  } catch (error) {
    res.status(500).json({ 
      message: 'Internal server error',
      error: (error as unknown).message 
    })
  }
} 