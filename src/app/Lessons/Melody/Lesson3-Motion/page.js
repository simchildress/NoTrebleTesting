

export default function Motion(){

    return (
        
        <main style={{ /*backgroundColor: '#455090e2'*/ }} >
            <div className="lesson-div" >
                <h2>Types of contrapuntal motion</h2>

                <p>There are four types of contrapuntal motion between two musical lines. Differentiating these four types of motion is essential to generating good voice-leading, both strict and free.</p>

                <p>In <em>parallel motion</em>, two voices move in the same direction by the same generic interval. For example, the following two voices both move up by a step. Note also that both dyads form the same generic interval (sixth). This will always be true when two voices move in parallel motion.</p>

                <img src={'/LessonImages/parallel.png'} alt='Example of parallel motion: C–A to D–B.' style={{ }}/>

                <p>In <em>similar motion</em>, also called <em>direct motion</em>, two voices move in the same direction, but by different intervals. For example, the following two voices both move down, but the upper voice moves by step while the lower voice moves by leap. Note also that the two dyads are different generic intervals. This will always be the case with similar or direct motion.</p>

                <img src={'/LessonImages/similar.png'} alt='Example of similar motion: C–G to A–F.' style={{ }}/>

                <p>In <em>contrary motion</em>, two voices move in opposite directions—one up, the other down.</p>

                <img src={'/LessonImages/contrary.png'} alt='Example of contrary motion: C–E to A–F.' style={{ }}/>

                <p>In <em>oblique motion</em>, one voice is stationary, while the other voice moves (in either direction). The stationary tone may or may not be rearticulated.</p>

                <img src={'/LessonImages/oblique1.png'} alt='Example of oblique motion: C–G to B–G.' style={{ }}/>  
                <p>or  </p>
                <img src={'/LessonImages/oblique2.png'} alt='Example of oblique motion: C–G to B–G.' style={{ }}/>

            </div>
        </main>

    );
}