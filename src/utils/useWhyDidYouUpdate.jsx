import { useRef, useEffect } from 'react';

export function useWhyDidYouUpdate(componentName, props) {
    const prevPropsRef = useRef();

    useEffect(() => {
        if (prevPropsRef.current) {
        const changedProps = Object.entries(props).reduce((acc, [key, value]) => {
            if (prevPropsRef.current[key] !== value) {
            acc[key] = {
                from: prevPropsRef.current[key],
                to: value,
            };
            }
            return acc;
        }, {});

        if (Object.keys(changedProps).length > 0) {
            console.log(`[${componentName}] Props changed:`, changedProps);
        }
        }

        prevPropsRef.current = props;
    });
}