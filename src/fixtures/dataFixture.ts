import { readJson } from '../utils/fileUtils';
import { UserData } from '../types/userInput';

/**
 * Returns user configuration (username, password)
 */
export function getUserData(): UserData {
    return readJson<UserData>('userInput.json');
}