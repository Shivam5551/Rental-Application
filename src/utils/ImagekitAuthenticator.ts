export const ImageKitAuthenticator = async () => {
    try {
        const response = await fetch("/api/upload-auth");
        if (!response.ok) {
            const res = await response.json();
            throw new Error(`Request failed with status ${response.status}: ${res.message}`);
        }

        const data = await response.json();
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        console.error("Authentication error:", error);
        return;
    }
};
