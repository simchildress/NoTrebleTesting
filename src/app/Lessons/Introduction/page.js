"use client";
import {createRoot} from 'react-dom/client'
import Markdown from 'react-markdown';
import markdown from '!!raw-loader!./basicnotation.md';
import './textbook.css';

export default function Fundamentals(){

    return (
        
        <main style={{ maxWidth: '800px', margin: 'auto', paddingLeft: 20, paddingRight: 20 }} >
            <div style={{ }} className="lessons">
                <Markdown>{markdown}</Markdown>
            </div>

        </main>

    );
}