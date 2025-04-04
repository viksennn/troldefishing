import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    "name": "Trolde Fishing App",
    "short_name": "TroldeFishing",
    "theme_color": "#FFFFFF",
    "background_color": "#FFFFFF",
    "display": "standalone",
    "start_url": "/",
    "icons": [
      {
        "src": "/manifest/images/fishlogo72.png",
        "sizes": "72x72",
        "type": "image/png"
      },
      {
        "src": "/manifest/images/fishlogo96.png",
        "sizes": "96x96",
        "type": "image/png"
      },
      {
        "src": "/manifest/images/fishlogo128.png",
        "sizes": "128x128",
        "type": "image/png"
      },
      {
        "src": "/manifest/images/fishlogo144.png",
        "sizes": "144x144",
        "type": "image/png"
      },
      {
        "src": "/manifest/images/fishlogo152.png",
        "sizes": "152x152",
        "type": "image/png"
      },
      {
        "src": "/manifest/images/fishlogo192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/manifest/images/fishlogo384.png",
        "sizes": "384x384",
        "type": "image/png"
      },
      {
        "src": "/manifest/images/fishlogo512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
  }
}