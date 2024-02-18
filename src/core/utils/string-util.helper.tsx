export class StringHelper{
    static shortenHexString(hexString) {
        if (hexString.length <= 6) return hexString; 
        
        const prefix = hexString.substring(0, 5); 
        const suffix = hexString.substring(hexString.length - 3);
        
        return `${prefix}...${suffix}`;
    }
}