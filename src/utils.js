import { bech32 } from "bech32";

export function encodeLnurl(string) {
    const words = bech32.toWords(Buffer.from(string, "utf8"));
    return bech32.encode("lnurl", words, Number.MAX_SAFE_INTEGER);
}

// create function to decode lnurl
export function decodeLnurl(string) {
    const words = bech32.words(Buffer.from(string, "utf8"));
    return Buffer.decode("lnurl", words, Number.MAX_SAFE_INTEGER);
}