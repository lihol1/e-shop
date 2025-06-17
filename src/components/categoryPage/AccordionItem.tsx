import { Accordion } from "react-bootstrap";
import AccordionElement from "./AccordionElement";
import { useAppSelector } from "../../hooks/hooks";
import { ru } from "../../aliases";
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setFeatureValues } from "../../store/filterSlice";

type AccordionItemProps = {
    feat: string;
    ind: number;
};

const AccordionItem = memo(({ feat, ind }: AccordionItemProps) => {
    const { filteredByCategory } = useAppSelector((state) => state.products);
    const { featureValues } = useAppSelector((state) => state.filter);
    const dispatch = useDispatch();

    const valuesArr: string[] = [];

    const handleFeatureChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.dataset.name) {
                if (e.target.checked) {
                    if (featureValues && e.target.dataset.name in featureValues) {
                        dispatch(
                            setFeatureValues({
                                ...featureValues,
                                [e.target.dataset.name]: featureValues[e.target.dataset.name].concat(e.target.name),
                            })
                        );
                    } else {
                        dispatch(setFeatureValues({ ...featureValues, [e.target.dataset.name]: [e.target.name] }));
                    }
                } else {
                    if (featureValues !== undefined) {
                        dispatch(setFeatureValues({ ...featureValues, [e.target.dataset.name]: featureValues[e.target.dataset.name].filter((el) => el !== e.target.name) }));
                    }
                }
            }
        },
        [dispatch, featureValues]
    );
    return (
        <Accordion.Item eventKey={String(ind)} key={ind} className="sidebar__acc-item">
            <Accordion.Header className="sidebar__acc-header">{ru[feat][0].toUpperCase() + ru[feat].slice(1)}</Accordion.Header>
            <Accordion.Body className="sidebar__acc-body">
                {filteredByCategory.map((product, i) => {
                    if (!valuesArr.includes(product.features[feat])) {
                        valuesArr.push(product.features[feat]);
                        return <AccordionElement key={i} feat={feat} feature={product.features[feat]} handleFeatureChange={handleFeatureChange} />;
                    }
                    return;
                })}
            </Accordion.Body>
        </Accordion.Item>
    );
});

export default AccordionItem;
