"use client";


export default function Pitches(){

    return (
        
        <main style={{ /*backgroundColor: '#455090e2'*/ }} >
            <div style={{ maxWidth: '800px', margin: 'auto', paddingLeft: 40, paddingRight: 40 }} className="lesson-div" >
                <h2>Pitches and Octave Designations</h2>

                <h3>The Keyboard </h3>

                <p>The keyboard is great for helping you develop a visual, aural, and tactile understanding of music theory. On the illustration below, the <em>pitch-class</em> letter names are written on the keyboard. </p>

                <img src={'/LessonImages/keyboardlayout-small.png'} style={{ width: '50%', height: '50%' }}/>

                <h3>Enharmonic equivalence </h3>

                <p>Notice that some of the keys have two names. When two pitch classes share a key on the keyboard, they are said to have <em>enharmonic equivalence</em>. Theoretically, each key could have several names (the note C could also be considered D&#9837;&#9837;, for instance), but it's usually not necessary to know more than two enharmonic spellings. </p>

                <h3>Octave Designation </h3>

                <p>When specifying a particular pitch precisely, we also need to know the <em>register</em>. In fact, if all you have is C-sharp or B-flat, you do not have a <em>pitch</em>, you have a <em>pitch-class</em>. A pitch-class plus a register together designate a specific pitch. </p>

                <p>We will follow the International Standards Organization (ISO) system for register designations. In that system, middle C (the first ledger line above the bass staff or the first ledger line below the treble staff) is C4. An octave higher than middle C is C5, and an octave lower than middle C is C3. </p>

                <p>The tricky bit about this system is that the octave starts on C and ends on B. So an ascending scale from middle C contains the following pitch designations: </p>

                <img src={'/LessonImages/C4toC5.png'} style={{ width: '80%' }}/>

                <p>And a descending scale from middle C contains the following pitch designations: </p>

                <img src={'/LessonImages/C4toC3.png'} style={{ width: '80%' }}/>

                <p>Pitches on the alto staff are as follows: </p>

                <img src={'/LessonImages/F3toG4-alto.png'} style={{ width: '80%' }}/>

                <p>Pitches on the tenor staff are as follows:</p>

                <a href="/LessonImages/pitchesTenor.png"><img src={'/LessonImages/pitchesTenor.png'} style={{ width: '80%' }}/></a>

                <p>Any accidentals follow the octave designation of the natural pitch with the same generic name. Thus a half step below C4 is C-flat4 (even though it sounds the same as B3), and a half step above C4 is C-sharp4. </p>

                <p>Note that a complete designation contains both the pitch-class name (a letter name plus an optional sharp or flat) and the register (the ISO number indicating the octave in which the pitch is found). Unless both are present, you do not have the full designation of a specific pitch.</p>
            </div>
        </main>

    );
}