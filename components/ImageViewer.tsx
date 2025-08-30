import { Image } from "expo-image";

type Props = {
    imgSource: string;
}

export default function ImgViewer({imgSource}: Props) {
    return (
        <Image 
            source={imgSource}
            contentFit="contain"
            style={{ width: '100%', height: '100%' }}
        />
    );
}



