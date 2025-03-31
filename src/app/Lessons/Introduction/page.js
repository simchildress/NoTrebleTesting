

export default function Fundamentals(){

    return (
        <main style={{ /*backgroundColor: '#455090e2'*/ }} >
            <div style={{ maxWidth: '800px', margin: 'auto', paddingLeft: 40, paddingRight: 40 }} className="lesson-div" >
                    <h2>Basic Notation</h2>
                    <h3>Notes</h3>

                    <p>When written on a staff, a note indicates a pitch and rhythmic value. The notation consists of a <em>notehead</em> (either empty or filled in), and optionally can include a <em>stem</em>, <em>beam</em>, <em>dot</em>, or <em>flag</em>. </p>

                    <img src={ '/LessonImages/noteillustration.png' } style={{ width: '50%' }} alt="illustration of note notation. The notehead is the circular base of the note. The stem is a verticle line that comes up from the side of the note. A beam is a verticle bar that connects two notes from the top of their stems. A flag is a curved line that starts at the top of the stem, and curves down and to the right before curving back towards the stem. A dot is a small dot place next to the notehead."/>

                    <h3>Staff</h3>

                    <p>Notes can't convey their pitch information without being placed on a staff. A staff consists of five horizontal lines, evenly spaced. The plural of staff is <em>staves</em>.</p>

                    <h3>Clefs</h3>

                    <p>Notes <em>still</em> can't convey their pitch information if the staff doesn't include a clef. A clef indicates which pitches are assigned to the lines and spaces on a staff. The two most commonly used clefs are the <em>treble</em> and <em>bass</em> clef; others that you'll see relatively frequently are <em>alto</em> and <em>tenor</em> clef. </p>

                    <p>Here is the pitch C4 placed on the treble, bass, alto, and tenor clefs.</p>

                    <img src={'/LessonImages/clefs.png'} style={{ width: '50%', height: '50%' }}/>

                    <h3>Grand staff</h3>

                    <p>The grand staff consists of two staves, one that uses a treble clef, and one that uses a bass clef. The staves are connected by a curly brace. Grand staves are used frequently for notating piano music and other polyphonic instruments. </p>

                    <h3>Ledger lines</h3>

                    <p>When the music's range exceeds what can be written on the staff, extra lines are drawn so that we can still clearly read the pitch. These extra lines are called *ledger lines.* In the example below, From Haydn's Piano Sonata in G (Hob. XVI: 39), Ab5 occurs just above the treble staff in the right hand, and G3 and B3 occur just below the treble staff in the left hand.</p>

                    <img src ={'/LessonImages/ledgerLines.png'} style={{ width: '80%', height: '80%' }} />

                    <h3>Accidentals</h3>

                    <p>Accidentals are used to indicate when a pitch has been raised or lowered. They are written to the <em>left</em> of the pitch. </p>

                    <p><li>When you lower one of the white notes of the piano by a semitone, you add a flat. </li></p>
                    <p><li>When you raise one of the white notes of the piano by a semitone, you add a sharp.</li></p>
                    <p><li>When you raise a note that is already flat by a semitone, you add a natural.</li></p>
                    <p><li>When you lower a note that is already flat by a semitone, you add a double flat. </li></p>
                    <p><li>When you raise a note that is already sharp by a semitone, you add a double sharp.</li></p>

                    <p>The example below shows the symbols for flat, natural, sharp, double sharp, and double flat, respectively</p>

                    <img src ={'/LessonImages/accidentals.png'} style={{ width: '50%', height: '50%' }}/>
                </div>
        </main>

    );
}