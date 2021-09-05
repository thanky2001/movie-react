import React from 'react';
import { getHeight } from '../../../utils/size';

const height = getHeight();
export default function Index() {
    return (
        <div className='dashboard' style={{ height: `${height}px` }}>
            <div className= 'tab--child p-0 m-0'>
                <img src="../../img/chien-luoc-marketing-cgv.jpg" alt="chien-luoc-marketing" />
            </div>
        </div>
    )
}
