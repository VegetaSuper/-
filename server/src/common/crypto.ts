import * as crypto from 'crypto';

export function encryptData(data: string, secretKey: string): string {
    const cipher = crypto.createCipheriv('aes128', secretKey.substring(0, 16), secretKey.substring(0, 16));
    let crypted = cipher.update(data, 'utf8', 'base64');
    crypted += cipher.final('base64');
    return crypted;
}

export function decryptData(data: string, secretKey: string): string {
    const cipher = crypto.createDecipheriv('aes128', secretKey.substring(0, 16), secretKey.substring(0, 16));
    let decrypted = cipher.update(data, 'base64', 'utf8');
    decrypted += cipher.final('utf8');
    return decrypted;
}
