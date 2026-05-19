import fs from 'fs'
import path from 'path'

/**
 * Reads a JSON file and parses it
 * @param fileName - relative path to JSON file
 */
export function readJson<T>(fileName: string): T {
    const filePath = path.resolve(__dirname, '../testData', fileName)
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data) as T
}

/**
 * Saves data to a JSON file
 * @param filePath - relative path to save JSON 
 */
export function saveJson(filePath: string, data: any) {
    const fullPath = path.resolve(__dirname, '../testData', filePath)
    const dir = path.dirname(fullPath)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8')
}