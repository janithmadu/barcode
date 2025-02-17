"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const BarcodeScanner = () => {
    const router = useRouter();

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            false // <-- Third argument 'verbose' set to false
        );

        scanner.render(
            (decodedText) => {
                console.log("Scanned Barcode:", decodedText);
                if (decodedText) {
                    router.push(`/product/${decodedText}`);
                }
            },
            (errorMessage) => {
                console.error(errorMessage);
            }
        );

        return () => {
            scanner.clear();
        };
    }, [router]);

    return <div id="reader" className="w-full h-auto"></div>;
};

export default BarcodeScanner;
