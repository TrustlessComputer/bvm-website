import React, { useEffect } from 'react';

export default function useWhiteBackground() {
    useEffect(() => {
        document.body.classList.add('white-body');
    }, []);
}
