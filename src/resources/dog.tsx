import * as React from 'react';
import { SVGProps } from 'react';

const AppLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        xmlSpace="preserve"
        {...props}>
        <path
            d="m12.4 9.9 6.6 2.4V22c0 .4-.3.7-.7.7h-2.8c-.4 0-.7-.3-.7-.7v-5H7.7v5c0 .4-.3.7-.7.7H4.2c-.4 0-.7-.3-.7-.7v-9.5c-1.6-.6-2.8-2.1-2.8-4C.6 7.7 1.3 7 2.1 7s1.4.6 1.4 1.4.6 1.4 1.4 1.4h7.5zm11-5v1.4c0 1.6-1.3 2.8-2.8 2.8h-1.4v1.6l-5.7-2V2.1c0-.6.8-.9 1.2-.5l1.2 1.2h2.4c.5 0 1.1.4 1.3.8l.3.6h2.8c.3 0 .7.3.7.7zm-5 0c0-.4-.3-.7-.7-.7s-.7.3-.7.7c0 .4.3.7.7.7s.7-.3.7-.7z"
            style={{
                fill: '#fff',
            }}
        />
    </svg>
);

export default AppLogo;
