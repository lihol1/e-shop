import { ru } from "../../aliases";

type FeatureItemProps = {
    arr: string[];
    ind: number
};

export default function FeatureItem({ arr, ind }: FeatureItemProps) {
    return (
        <p className="category__feature" key={ind}>
            {ru[arr[0]][0].toUpperCase() + ru[arr[0]].slice(1)} {arr[1]}
        </p>
    );
}
