"use client";

export default function Beams(){

    return (
        
        <main style={{ /*backgroundColor: '#455090e2'*/ }} >
            <div style={{ maxWidth: '800px', margin: 'auto', paddingLeft: 40, paddingRight: 40 }} className="lesson-div" >
                
                <h2>Beams and borrowed divisions</h2>

                <h3>Beams </h3>

                <p>It's important to remember that notation is intended to be read by performers. You should always strive to make your notation as easy to interpret as possible. Part of this includes grouping the rhythms such that they convey the beat unit and the beat division. <em>Beams</em> are used to group any notes at the beat division level or shorter that fall within the same beat. </p>

                <p>In this example, the eighth notes are not grouped with beams, making it difficult to interpret the triple meter. </p>

                <a href="/LessonImages/withoutbeams.png"><img src="/LessonImages/withoutbeams.png" width="70%"/></a>

                <p>If we re-notate the above example so that the notes that fall within the same beat are grouped together with a beam, it makes the music much easier to read. </p>

                <a href="/LessonImages/beams.png"><img src="/LessonImages/beams.png" width="70%"/></a>

                <h3>Borrowed divisions </h3>

                <p>Typically, a meter is defined by the presence of a consistent beat division: division by two in simple meter, and by three in compound meter. Occasionally, composers will use a triple division of the beat in a simple meter, or a duple division of the beat in a compound meter. </p>

                <p><em>Triplets</em> are borrowed from compound meter, and may occur at both the beat division and subdivision levels, as seen below.</p>

                <a href="/LessonImages/triplets.png"><img src ="/LessonImages/triplets.png" width="70%"/></a>

                <p>Likewise, <em>duplets</em> can be imported from simple meter into a compound meter.</p>

                <a href="/LessonImages/duplets.png"><img src="/LessonImages/duplets.png" width="70%"/></a>
            </div>
        </main>

    );
}