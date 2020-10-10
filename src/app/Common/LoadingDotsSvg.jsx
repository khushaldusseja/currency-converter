import React, { Component } from "react";

class LoadingDotsSvg extends Component {
    
    render() {
        const dotsLoader = (
            <svg id='L4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
                <circle fill='#B5BDCB' cx='37' cy='48' r='4'>
                    <animate attributeName='opacity' dur='2s' values='.4;1;.4' repeatCount='indefinite'
                        begin='0.2' />
                </circle>
                <circle fill='#B5BDCB' cx='50' cy='48' r='4'>
                    <animate attributeName='opacity' dur='2s' values='0.4;1;0.4' repeatCount='indefinite'
                        begin='0.4' />
                </circle>
                <circle fill='#B5BDCB' cx='63' cy='48' r='4'>
                    <animate attributeName='opacity' dur='2s' values='0.4;1;0.4' repeatCount='indefinite'
                        begin='0.6' />
                </circle>
            </svg>
        );
        return dotsLoader;
    }

}

export default LoadingDotsSvg;