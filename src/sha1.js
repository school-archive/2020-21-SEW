    /**
     * Liefert ein Promise auf den SHA-1-Hash des Texts als Hex-String.
     *
     * Siehe
     * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Example
     */
    export function sha1(text) {
        var buffer = new TextEncoder("utf-8").encode(text);

        return crypto.subtle
            .digest("SHA-1", buffer)
            .then(hash => {
                return hex(hash);
            });
    }

    /**
     * Siehe
     * https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex#answer-40031979
     */
    export function hex(buffer) {
        return Array.prototype
            .map
            .call(new Uint8Array(buffer), x => ("00" + x.toString(16)).slice(-2))
            .join('')
            .toUpperCase();
    }
