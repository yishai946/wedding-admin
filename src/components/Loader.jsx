import { InfinitySpin } from "react-loader-spinner";

export default function Loader(isVisible) {
    return <InfinitySpin
        visible={isVisible}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
    />
}