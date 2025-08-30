
export default function ParseQrUrl(data: string) {
    const trialId = '47664dab-afd8-4323-b0c1-838103b71a0b';
    try{
        const url = new URL(data)
        const segments = url.pathname.split('/').filter(Boolean);

        if (segments[2] == trialId) {
            return { id: 'QR code already validated.' };
        }else {
            return { id: segments[2] }
        }


    }catch {
        return { id: 'Invalid QR Code.' }
    }
}
