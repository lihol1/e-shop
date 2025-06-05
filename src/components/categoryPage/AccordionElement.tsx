import { memo } from 'react';

type AccordionElementProps = {   
    feat: string;
    feature: string;
    handleFeatureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default memo(function AccordionElement({ feat, feature, handleFeatureChange }: AccordionElementProps) {
    return (
        <div>
            <input type="checkbox" id={feature} name={feature} data-name={feat} onChange={handleFeatureChange} />

            <label htmlFor={feat} className="sidebar__feat">
                {feature}
            </label>
        </div>
    );
})
