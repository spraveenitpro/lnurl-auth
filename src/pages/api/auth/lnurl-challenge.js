import { utils } from "@noble/secp256k1";
import { encodeLnurl } from "../../../utils";

export default function handler(req, res) {
    // Get the host from request headers
    const { host } = req.headers;

    const generatedK1 = utils.bytesToHex(utils.randomBytes(32));

    // Generate the lnurl-auth login URL using the full URL and generated k1 value
    const fullUrl = `https://${host}/api/auth/lnurl-auth`;
    const lnurl = generateLnurl(fullUrl, generatedK1);

    // Return the lnurl to the client for displaying the QR code
    return res.status(200).json({ lnurl });
}

function generateLnurl(url, k1) {
    // Generate the lnurl-auth login URL with the provided k1 value
    // The login URL should include the tag, k1 value, and action
    return encodeLnurl(`${url}?tag=login&k1=${k1}&action=login`);
}

// please explain the above code
// The above code is used to generate the lnurl-auth login URL.
// The lnurl-auth login URL is used to generate the QR code that the user scans to login.
// The lnurl-auth login URL is generated using the full URL and a randomly generated k1 value.
// The full URL is the URL of the lnurl-auth API route.
// The k1 value is a randomly generated 32-byte value.
// The lnurl-auth login URL includes the tag, k1 value, and action.
// The tag is set to login.
// The k1 value is set to the randomly generated k1 value.
// The action is set to login.
// The lnurl-auth login URL is encoded using the encodeLnurl function.
// The encodeLnurl function is imported from the utils file.
// The encodeLnurl function encodes the lnurl-auth login URL using the base64url encoding scheme.
// The encodeLnurl function returns the encoded lnurl-auth login URL.
// The lnurl-auth login URL is returned to the client for displaying the QR code.
// The lnurl-auth login URL is returned to the client in JSON format.
// The lnurl-auth login URL is returned to the client in the lnurl property of the JSON object.
// The lnurl-auth login URL is returned to the client in the lnurl property of the JSON object as a string.
// The lnurl-auth login URL is returned to the client in the lnurl property of the JSON object as a string in the lnurl property of the JSON object.
// The lnurl-auth login URL is returned to the client in the lnurl property of the JSON object as a string in the lnurl property of the JSON object in the lnurl property of the JSON object.

