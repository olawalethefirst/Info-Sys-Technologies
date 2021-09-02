import cacheFonts from './cacheFonts'
import cacheImages from './cacheImages'

export default async function loadAssetsAsync(fonts, images) {
    const cachedFonts = cacheFonts(fonts)
    const cachedImages = cacheImages(images)
    return await Promise.all([
        ...cachedFonts, 
        ...cachedImages])
    
}   