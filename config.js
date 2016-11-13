// config.js
export default {
  site: {
    title: 'React Universal Blog'
  },
  bucket: {
    slug: process.env.COSMIC_BUCKET || 'react-exdestroyer-blog',
    media_url: 'https://cosmicjs.com/uploads',
    read_key: process.env.COSMIC_READ_KEY || '',
    write_key: process.env.COSMIC_WRITE_KEY || ''
  },
}
