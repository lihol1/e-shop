type AccordionProps = {   
    feat: string;
    feature: string;
    handleFeatureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AccordionItem({ feat, feature, handleFeatureChange }: AccordionProps) {
    return (
        <div>
            <input type="checkbox" id={feature} name={feature} data-name={feat} onChange={handleFeatureChange} />

            <label htmlFor={feat} className="sidebar__feat">
                {feature}
            </label>
        </div>
    );
}
