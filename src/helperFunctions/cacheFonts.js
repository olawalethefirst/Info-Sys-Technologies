import * as Font from 'expo-font'

export default function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font))
}