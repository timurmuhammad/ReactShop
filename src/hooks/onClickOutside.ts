import { useEffect } from 'react'

export function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void, callback1?: () => void, ref1?: React.RefObject<HTMLElement>): void {

    const handleClick = (e: Event) => {
        if (ref.current) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            } else if (callback1) {
                if (ref1) {
                    if (ref1.current && ref1.current.contains(e.target as Node)) {
                        callback1();
                    }
                } else {
                    callback1();
                }
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    })
}
